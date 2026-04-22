import { onBeforeUnmount, onMounted, reactive, isReactive, watch, type Ref } from "vue";
import { VERT_SRC } from "../shaders/aurora.vert";
import { FRAG_SRC } from "../shaders/aurora.frag";
import { DEFAULT_AURORA_CONFIG, MAX_PALETTE_STOPS, type AuroraConfig, type FlowPattern } from "../presets";
import { bakePalette } from "./color";

function isDarkMode(): boolean {
    return document.documentElement.classList.contains("dark");
}

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh) ?? "unknown";
        gl.deleteShader(sh);
        throw new Error(`[Aurora] shader compile failed:\n${log}`);
    }
    return sh;
}

function link(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram {
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(prog) ?? "unknown";
        gl.deleteProgram(prog);
        throw new Error(`[Aurora] program link failed:\n${log}`);
    }
    return prog;
}

const FLOW_PATTERN_IDX: Record<FlowPattern, number> = {
    radial: 0, swirl: 1, diagonal: 2, linear: 3,
};

export function useAurora(
    canvasRef: Ref<HTMLCanvasElement | null>,
    userConfig?: Partial<AuroraConfig> | AuroraConfig,
) {
    const cfg: AuroraConfig = isReactive(userConfig)
        ? (userConfig as AuroraConfig)
        : reactive<AuroraConfig>({ ...DEFAULT_AURORA_CONFIG, ...userConfig });

    let gl: WebGL2RenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let vao: WebGLVertexArrayObject | null = null;
    let animId = 0;
    let dpr = 1;
    let dark = false;
    let themeObserver: MutationObserver | null = null;
    const uLoc = new Map<string, WebGLUniformLocation | null>();
    let tFrozen: number | null = null;
    const startTime = typeof performance !== "undefined" ? performance.now() : 0;

    function loc(name: string): WebGLUniformLocation | null {
        if (!uLoc.has(name)) uLoc.set(name, gl!.getUniformLocation(program!, name));
        return uLoc.get(name) ?? null;
    }

    function uploadStaticUniforms() {
        if (!gl || !program) return;
        gl.useProgram(program);

        gl.uniform1f(loc("uAlpha"), dark ? cfg.alphaDark : cfg.alphaLight);
        gl.uniform1f(loc("uDark"), dark ? 1 : 0);
        gl.uniform1f(loc("uDarkDesaturate"), cfg.darkDesaturate);

        // Palette LUT
        const paletteCount = Math.min(cfg.palette.length, MAX_PALETTE_STOPS);
        gl.uniform3fv(loc("uPalette"), bakePalette(cfg.palette));
        gl.uniform1i(loc("uPaletteCount"), paletteCount);

        // Flow
        gl.uniform1i(loc("uFlowPattern"), FLOW_PATTERN_IDX[cfg.flowPattern]);
        gl.uniform2f(loc("uFocal"), cfg.focalX, cfg.focalY);
        gl.uniform1f(loc("uFlowAngle"), (cfg.flowAngle * Math.PI) / 180);
        gl.uniform1f(loc("uFlowCurl"), cfg.flowCurl);
        gl.uniform1f(loc("uFlowStrength"), cfg.flowStrength);

        // Color field
        gl.uniform1f(loc("uColorScale"), cfg.colorScale);
        gl.uniform1f(loc("uWarpAmount"), cfg.warpAmount);
        gl.uniform1f(loc("uWarpScale"), cfg.warpScale);
        gl.uniform1f(loc("uValueVariance"), cfg.valueVariance);

        // Texture
        gl.uniform1f(loc("uBrushAmount"), cfg.brushAmount);
        gl.uniform1f(loc("uBrushScale"), cfg.brushScale);
        gl.uniform1f(loc("uBrushAnisotropy"), cfg.brushAnisotropy);
        gl.uniform1f(loc("uPaperGrain"), cfg.paperGrain);

        // Motion
        gl.uniform1f(loc("uFlowDrift"), cfg.flowDrift);
        gl.uniform1f(loc("uPaletteDrift"), cfg.paletteDrift);
        gl.uniform1f(loc("uBreathDepth"), cfg.breathDepth);
        gl.uniform1f(loc("uBreathPeriod"), cfg.breathPeriod);

        // Output
        gl.uniform1i(loc("uNoiseOctaves"), cfg.noiseOctaves);
        gl.uniform1f(loc("uSaturation"), cfg.saturation);
        gl.uniform1f(loc("uSoftness"), cfg.softness);
    }

    function resize() {
        const canvas = canvasRef.value;
        if (!canvas || !gl) return;
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        if (vw === 0 || vh === 0) return;
        dpr = Math.min(window.devicePixelRatio, 1.5);
        canvas.width = Math.ceil(vw * dpr);
        canvas.height = Math.ceil(vh * dpr);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(program);
        gl.uniform2f(loc("uResolution"), canvas.width, canvas.height);
    }

    function draw(nowMs: number) {
        if (!gl || !program) return;
        const t = tFrozen ?? (nowMs - startTime) * 0.001;

        gl.useProgram(program);
        gl.bindVertexArray(vao);
        gl.uniform1f(loc("uTime"), t);
        gl.uniform1f(loc("uScrollY"), window.scrollY);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        animId = requestAnimationFrame(draw);
    }

    function onThemeChange() {
        const nextDark = isDarkMode();
        if (nextDark === dark) return;
        dark = nextDark;
        uploadStaticUniforms();
    }

    onMounted(() => {
        const canvas = canvasRef.value;
        if (!canvas) return;

        const ctx = canvas.getContext("webgl2", { premultipliedAlpha: true, alpha: true });
        if (!ctx) {
            console.warn("[Aurora] WebGL2 unavailable — canvas will render empty.");
            return;
        }
        gl = ctx;

        const vs = compile(gl, gl.VERTEX_SHADER, VERT_SRC);
        const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
        program = link(gl, vs, fs);
        gl.deleteShader(vs);
        gl.deleteShader(fs);

        vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        dark = isDarkMode();
        themeObserver = new MutationObserver(onThemeChange);
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        resize();
        uploadStaticUniforms();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            tFrozen = 12.0;
        }

        window.addEventListener("resize", resize);
        animId = requestAnimationFrame(draw);
    });

    onBeforeUnmount(() => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", resize);
        themeObserver?.disconnect();
        if (gl && program) gl.deleteProgram(program);
        if (gl && vao) gl.deleteVertexArray(vao);
        gl = null;
        program = null;
        vao = null;
    });

    watch(
        () => cfg,
        () => uploadStaticUniforms(),
        { deep: true },
    );

    return { config: cfg };
}
