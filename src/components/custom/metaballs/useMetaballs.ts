import { ref, reactive, isReactive, onMounted, onBeforeUnmount, watch, type Ref, type ShallowRef } from "vue";
import { useResizeObserver } from "../../../composables/useResizeObserver";
import { VERTEX_SHADER, FRAGMENT_SHADER } from "./shaders";
import { DEFAULT_METABALL_CONFIG, type MetaballConfig } from "./types";

function hexToRgb(hex: string): [number, number, number] {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function cssColorToRgb(css: string): [number, number, number] {
    if (css.startsWith("#")) return hexToRgb(css);
    if (typeof document === "undefined") return [128, 128, 128];
    const c = document.createElement("canvas");
    c.width = c.height = 1;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return [d[0], d[1], d[2]];
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function linkProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link:", gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

const MAX_BLOBS = 16;

/**
 * WebGL metaball composable.
 *
 * Uses uniform3fv with pre-allocated Float32Arrays for zero-allocation
 * per-frame updates. Single uniform location per array (not per-element).
 */
export function useMetaballs(
    canvasRef: Ref<HTMLCanvasElement | null> | ShallowRef<HTMLCanvasElement | null>,
    config?: MetaballConfig,
) {
    // Use passed reactive directly if available, otherwise create new
    const cfg = (config && isReactive(config))
        ? config as Required<MetaballConfig>
        : reactive({ ...DEFAULT_METABALL_CONFIG, ...config }) as Required<MetaballConfig>;
    const isSupported = ref(true);

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let rafId: number | null = null;
    let startTime = 0;

    // Single location per uniform array
    let uResolution: WebGLUniformLocation | null = null;
    let uBlobCount: WebGLUniformLocation | null = null;
    let uPositions: WebGLUniformLocation | null = null;
    let uColors: WebGLUniformLocation | null = null;
    let uThreshold: WebGLUniformLocation | null = null;
    let uEdgeSoftness: WebGLUniformLocation | null = null;
    let uBgAlpha: WebGLUniformLocation | null = null;

    // Pre-allocated typed arrays (zero allocation in render loop)
    const posData = new Float32Array(MAX_BLOBS * 3);
    const colData = new Float32Array(MAX_BLOBS * 3);

    function init() {
        const canvas = canvasRef.value;
        if (!canvas) return;

        gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
        if (!gl) { isSupported.value = false; return; }

        const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
        const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
        if (!vs || !fs) { isSupported.value = false; return; }

        program = linkProgram(gl, vs, fs);
        if (!program) { isSupported.value = false; return; }

        gl.useProgram(program);

        // Full-screen quad
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
        ]), gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        // Uniform locations — one per array, uses uniform3fv
        uResolution = gl.getUniformLocation(program, "u_resolution");
        uBlobCount = gl.getUniformLocation(program, "u_blobCount");
        uPositions = gl.getUniformLocation(program, "u_positions");
        uColors = gl.getUniformLocation(program, "u_colors");
        uThreshold = gl.getUniformLocation(program, "u_threshold");
        uEdgeSoftness = gl.getUniformLocation(program, "u_edgeSoftness");
        uBgAlpha = gl.getUniformLocation(program, "u_bgAlpha");

        gl.uniform1i(uBlobCount, cfg.blobCount);
        gl.uniform1f(uThreshold, cfg.threshold);
        gl.uniform1f(uEdgeSoftness, cfg.edgeSoftness);
        gl.uniform1f(uBgAlpha, cfg.bgAlpha);

        // Fill colors array
        for (let i = 0; i < MAX_BLOBS; i++) {
            const [r, g, b] = i < cfg.blobCount
                ? cssColorToRgb(cfg.colors[i % cfg.colors.length])
                : [0, 0, 0];
            colData[i * 3] = r / 255;
            colData[i * 3 + 1] = g / 255;
            colData[i * 3 + 2] = b / 255;
        }
        gl.uniform3fv(uColors, colData);

        // Init positions off-screen
        for (let i = 0; i < MAX_BLOBS; i++) {
            posData[i * 3] = -10;
            posData[i * 3 + 1] = -10;
            posData[i * 3 + 2] = 0.001;
        }
        gl.uniform3fv(uPositions, posData);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        resize();

        startTime = performance.now();
        rafId = requestAnimationFrame(render);
    }

    function resize() {
        const canvas = canvasRef.value;
        if (!canvas || !gl) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (uResolution) gl.uniform2f(uResolution, canvas.width, canvas.height);
    }

    // Golden ratio and irrational constants for non-repeating paths
    const PHI = 1.618033988749;
    const SQRT2 = 1.4142135623731;
    const SQRT3 = 1.7320508075689;

    // Per-blob random-ish seeds (deterministic from index)
    const blobSeeds: number[][] = [];
    for (let i = 0; i < MAX_BLOBS; i++) {
        blobSeeds.push([
            (i + 1) * PHI % 1,           // phase offset
            0.15 + (i * 0.37 % 0.4),     // primary freq x
            0.12 + (i * 0.29 % 0.35),    // primary freq y
            0.07 + (i * 0.19 % 0.15),    // secondary freq x
            0.05 + (i * 0.23 % 0.12),    // secondary freq y
            0.03 + (i * 0.13 % 0.08),    // tertiary freq
        ]);
    }

    function render(now: number) {
        if (!gl || !program) return;
        const t = (now - startTime) * 0.001 * cfg.speed;
        const amp = cfg.orbitAmplitude;

        for (let i = 0; i < cfg.blobCount; i++) {
            const s = blobSeeds[i];
            const p = s[0] * Math.PI * 2; // phase

            // Multi-frequency oscillation with irrational ratios (non-repeating)
            const x = 0.5
                + Math.sin(t * s[1] + p) * amp * 0.6
                + Math.sin(t * s[3] * SQRT2 + p * PHI) * amp * 0.3
                + Math.cos(t * s[5] * SQRT3 + i) * amp * 0.15;
            const y = 0.5
                + Math.cos(t * s[2] + p * PHI) * amp * 0.6
                + Math.cos(t * s[4] * PHI + p * SQRT2) * amp * 0.3
                + Math.sin(t * s[5] * PHI + i * SQRT2) * amp * 0.15;

            // Size variation: each blob has a unique base size (0.6x to 1.4x)
            // plus gentle breathing pulse
            const sizeScale = 0.6 + (s[0] * 0.8); // deterministic per-blob scale
            const r = cfg.baseRadius * sizeScale
                + Math.sin(t * 0.4 + i * PHI) * cfg.baseRadius * 0.2;

            posData[i * 3] = x;
            posData[i * 3 + 1] = y;
            posData[i * 3 + 2] = r;
        }

        // Re-upload config uniforms every frame (cheap, enables live config changes)
        gl.uniform1i(uBlobCount, cfg.blobCount);
        gl.uniform1f(uThreshold, cfg.threshold);
        gl.uniform1f(uEdgeSoftness, cfg.edgeSoftness);
        gl.uniform1f(uBgAlpha, cfg.bgAlpha);

        // Re-upload colors (handles live color picker changes)
        for (let i = 0; i < MAX_BLOBS; i++) {
            const [r, g, b] = i < cfg.blobCount
                ? cssColorToRgb(cfg.colors[i % cfg.colors.length])
                : [0, 0, 0];
            colData[i * 3] = r / 255;
            colData[i * 3 + 1] = g / 255;
            colData[i * 3 + 2] = b / 255;
        }
        gl.uniform3fv(uColors, colData);

        gl.uniform3fv(uPositions, posData);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        rafId = requestAnimationFrame(render);
    }

    function dispose() {
        if (rafId !== null) cancelAnimationFrame(rafId);
        // ResizeObserver auto-disposes via useResizeObserver's onScopeDispose.
        if (gl && program) gl.deleteProgram(program);
        program = null;
        gl = null;
    }

    // Canvas DPR-resync needs every entry — rafBatch:false / threshold:0
    // preserves the original "every observer tick triggers resize" behavior.
    useResizeObserver(canvasRef, () => resize(), {
        rafBatch: false,
        threshold: 0,
    });

    onMounted(init);
    onBeforeUnmount(dispose);
    watch(canvasRef, (el) => { if (el) { dispose(); init(); } });

    return { isSupported };
}
