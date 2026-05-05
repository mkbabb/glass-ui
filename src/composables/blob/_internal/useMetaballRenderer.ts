import { ref, type Ref } from "vue";
import fragSource from "../blob.frag.glsl?raw";
import vertSource from "../blob.vert.glsl?raw";
import type {
    BlobColorHsl,
    BlobConfig,
    MetaballSource,
    RendererHandle,
} from "../types";

/**
 * Per-instance WebGL2 renderer for the Blob primitive. Acquires its own
 * context per SPEC.md §11.1 (no singleton compositor); falls back to a
 * Canvas2D port (lazy-imported) when WebGL2 is unavailable.
 *
 * The renderer is a pure draw routine: it owns no rAF subscription. The
 * caller (`useBlob` facade or a host component) drives it via `render(time)`,
 * coalesced through `useRAFLoop`.
 *
 * Uniform contract (SPEC.md §6 + §11.2):
 *   uTime, uResolution, uColor (HSL), uSmoothK, uSourceCount, uSources[8],
 *   uHueRange, uSatShift, uBrightnessShift, uColorNoiseFreq, uColorNoiseSpeed,
 *   uChromaticAberration (sourced from `--blob-chromatic-aberration` CSS var).
 */
const MAX_SOURCES = 8;

interface UniformLocations {
    time: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
    color: WebGLUniformLocation | null;
    smoothK: WebGLUniformLocation | null;
    sourceCount: WebGLUniformLocation | null;
    sources: WebGLUniformLocation | null;
    hueRange: WebGLUniformLocation | null;
    satShift: WebGLUniformLocation | null;
    brightnessShift: WebGLUniformLocation | null;
    colorNoiseFreq: WebGLUniformLocation | null;
    colorNoiseSpeed: WebGLUniformLocation | null;
    chromaticAberration: WebGLUniformLocation | null;
}

interface GLState {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;
    vao: WebGLVertexArrayObject;
    uniforms: UniformLocations;
}

function compileShader(
    gl: WebGL2RenderingContext,
    type: number,
    src: string,
    label: string,
): WebGLShader {
    const sh = gl.createShader(type);
    if (!sh) throw new Error(`useMetaballRenderer: createShader(${label}) returned null`);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh) ?? "(no log)";
        gl.deleteShader(sh);
        throw new Error(`useMetaballRenderer: ${label} compile failed: ${log}`);
    }
    const log = gl.getShaderInfoLog(sh);
    if (log && log.trim()) {
        console.warn(`[useMetaballRenderer:${label}]`, log);
    }
    return sh;
}

function buildProgram(gl: WebGL2RenderingContext): GLState {
    const vs = compileShader(gl, gl.VERTEX_SHADER, vertSource, "vertex");
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSource, "fragment");
    const program = gl.createProgram();
    if (!program) {
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        throw new Error("useMetaballRenderer: createProgram returned null");
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(program) ?? "(no log)";
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        throw new Error(`useMetaballRenderer: program link failed: ${log}`);
    }

    // WebGL2 requires a bound VAO for gl_VertexID-driven draws.
    const vao = gl.createVertexArray();
    if (!vao) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        throw new Error("useMetaballRenderer: createVertexArray returned null");
    }
    gl.bindVertexArray(vao);

    gl.useProgram(program);
    const uniforms: UniformLocations = {
        time: gl.getUniformLocation(program, "uTime"),
        resolution: gl.getUniformLocation(program, "uResolution"),
        color: gl.getUniformLocation(program, "uColor"),
        smoothK: gl.getUniformLocation(program, "uSmoothK"),
        sourceCount: gl.getUniformLocation(program, "uSourceCount"),
        sources: gl.getUniformLocation(program, "uSources[0]"),
        hueRange: gl.getUniformLocation(program, "uHueRange"),
        satShift: gl.getUniformLocation(program, "uSatShift"),
        brightnessShift: gl.getUniformLocation(program, "uBrightnessShift"),
        colorNoiseFreq: gl.getUniformLocation(program, "uColorNoiseFreq"),
        colorNoiseSpeed: gl.getUniformLocation(program, "uColorNoiseSpeed"),
        chromaticAberration: gl.getUniformLocation(
            program,
            "uChromaticAberration",
        ),
    };

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    return { gl, program, vertexShader: vs, fragmentShader: fs, vao, uniforms };
}

function destroyProgram(state: GLState): void {
    const { gl, program, vertexShader, fragmentShader, vao } = state;
    try {
        gl.useProgram(null);
        gl.bindVertexArray(null);
        gl.deleteVertexArray(vao);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
    } catch {
        // Context may already be lost; nothing meaningful to do.
    }
}

export function useMetaballRenderer(
    canvasRef: Ref<HTMLCanvasElement | null>,
    sources: Ref<MetaballSource[]>,
    color: Ref<BlobColorHsl>,
    config: Ref<Required<BlobConfig>>,
): RendererHandle {
    const isWebGL = ref(false);

    const canvas = canvasRef.value;
    if (!canvas) {
        return {
            render: () => {},
            dispose: () => {},
            isWebGL,
        };
    }

    const gl = canvas.getContext("webgl2", {
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        preserveDrawingBuffer: false,
    }) as WebGL2RenderingContext | null;

    if (!gl) {
        // Lazy-import the Canvas2D port so its source weight only lands on
        // browsers that need it.
        let inner: RendererHandle | null = null;
        let disposed = false;
        const queued: number[] = [];

        void import("../canvas2d-fallback").then(({ createCanvas2DRenderer }) => {
            if (disposed) return;
            inner = createCanvas2DRenderer(canvas, sources, color, config, isWebGL);
            // Drain any frames the caller fired before the import resolved.
            for (const t of queued) inner.render(t);
            queued.length = 0;
        });

        return {
            render(time: number): void {
                if (disposed) return;
                if (inner) inner.render(time);
                else queued.push(time);
            },
            dispose(): void {
                disposed = true;
                queued.length = 0;
                inner?.dispose();
                inner = null;
            },
            isWebGL,
        };
    }

    isWebGL.value = true;

    let state: GLState | null = buildProgram(gl);

    const sourceBuf = new Float32Array(MAX_SOURCES * 4);

    function uploadSources(list: MetaballSource[]): void {
        const count = Math.min(list.length, MAX_SOURCES);
        for (let i = 0; i < count; i++) {
            const s = list[i];
            sourceBuf[i * 4 + 0] = s.x;
            sourceBuf[i * 4 + 1] = s.y;
            sourceBuf[i * 4 + 2] = s.radius;
            sourceBuf[i * 4 + 3] = s.opacity;
        }
        // Zero out unused slots so a stale tail does not leak past sourceCount.
        for (let i = count; i < MAX_SOURCES; i++) {
            sourceBuf[i * 4 + 0] = 0;
            sourceBuf[i * 4 + 1] = 0;
            sourceBuf[i * 4 + 2] = 0;
            sourceBuf[i * 4 + 3] = 0;
        }
        if (state) {
            state.gl.uniform1i(state.uniforms.sourceCount, count);
            state.gl.uniform4fv(state.uniforms.sources, sourceBuf);
        }
    }

    function readChromaticAberration(): number {
        const fallback = config.value.chromaticAberration;
        if (typeof window === "undefined") return fallback;
        const raw = window
            .getComputedStyle(canvas!)
            .getPropertyValue("--blob-chromatic-aberration")
            .trim();
        if (!raw) return fallback;
        const parsed = parseFloat(raw);
        return Number.isFinite(parsed) ? parsed : fallback;
    }

    function render(time: number): void {
        if (!state) return;
        const { gl: ctx, uniforms } = state;
        const cfg = config.value;
        const col = color.value;

        ctx.viewport(0, 0, canvas!.width, canvas!.height);

        ctx.useProgram(state.program);
        ctx.bindVertexArray(state.vao);

        ctx.uniform1f(uniforms.time, time * 0.001);
        ctx.uniform2f(uniforms.resolution, canvas!.width, canvas!.height);
        ctx.uniform3f(uniforms.color, col.h, col.s, col.l);
        ctx.uniform1f(uniforms.smoothK, cfg.smoothK);
        ctx.uniform1f(uniforms.hueRange, cfg.hueRange);
        ctx.uniform1f(uniforms.satShift, cfg.satShift);
        ctx.uniform1f(uniforms.brightnessShift, cfg.brightnessShift);
        ctx.uniform1f(uniforms.colorNoiseFreq, cfg.colorNoiseFreq);
        ctx.uniform1f(uniforms.colorNoiseSpeed, cfg.colorNoiseSpeed);
        ctx.uniform1f(uniforms.chromaticAberration, readChromaticAberration());

        uploadSources(sources.value);

        ctx.clearColor(0, 0, 0, 0);
        ctx.clear(ctx.COLOR_BUFFER_BIT);
        ctx.drawArrays(ctx.TRIANGLES, 0, 3);
    }

    function onContextLost(event: Event): void {
        event.preventDefault();
        if (state) {
            destroyProgram(state);
            state = null;
        }
        isWebGL.value = false;
    }

    function onContextRestored(): void {
        if (!canvas) return;
        const restored = canvas.getContext("webgl2", {
            alpha: true,
            premultipliedAlpha: true,
            antialias: false,
            preserveDrawingBuffer: false,
        }) as WebGL2RenderingContext | null;
        if (!restored) return;
        try {
            state = buildProgram(restored);
            isWebGL.value = true;
        } catch (err) {
            console.warn("useMetaballRenderer: context restore failed", err);
            state = null;
        }
    }

    canvas.addEventListener("webglcontextlost", onContextLost as EventListener, false);
    canvas.addEventListener(
        "webglcontextrestored",
        onContextRestored as EventListener,
        false,
    );

    /* ResizeObserver — keeps the WebGL drawing buffer in sync with the
       canvas's rendered CSS size × devicePixelRatio. Without this, a
       responsive `<Blob>` renders at its initial buffer resolution and
       blurs as the viewport scales. uResolution self-corrects on the next
       render() call. */
    const resizeObserver =
        typeof ResizeObserver === "function"
            ? new ResizeObserver((entries) => {
                  for (const entry of entries) {
                      const target = entry.target as HTMLCanvasElement;
                      const dpr = window.devicePixelRatio ?? 1;
                      const cssW = entry.contentRect.width;
                      const cssH = entry.contentRect.height;
                      const w = Math.max(1, Math.round(cssW * dpr));
                      const h = Math.max(1, Math.round(cssH * dpr));
                      if (target.width !== w) target.width = w;
                      if (target.height !== h) target.height = h;
                  }
              })
            : null;
    resizeObserver?.observe(canvas);

    function dispose(): void {
        resizeObserver?.disconnect();
        canvas?.removeEventListener(
            "webglcontextlost",
            onContextLost as EventListener,
        );
        canvas?.removeEventListener(
            "webglcontextrestored",
            onContextRestored as EventListener,
        );
        if (state) {
            destroyProgram(state);
            state = null;
        }
        isWebGL.value = false;
    }

    return { render, dispose, isWebGL };
}
