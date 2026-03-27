import { ref, onMounted, onBeforeUnmount, watch, type Ref, type ShallowRef } from "vue";
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
    const cfg = { ...DEFAULT_METABALL_CONFIG, ...config };
    const isSupported = ref(true);

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let rafId: number | null = null;
    let startTime = 0;
    let observer: ResizeObserver | null = null;

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
        observer = new ResizeObserver(resize);
        observer.observe(canvas);

        startTime = performance.now();
        rafId = requestAnimationFrame(render);
    }

    function resize() {
        const canvas = canvasRef.value;
        if (!canvas || !gl) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (uResolution) gl.uniform2f(uResolution, canvas.width, canvas.height);
    }

    function render(now: number) {
        if (!gl || !program) return;
        const t = (now - startTime) * 0.001 * cfg.speed;

        for (let i = 0; i < cfg.blobCount; i++) {
            const phase = i * ((Math.PI * 2) / cfg.blobCount);
            const fx = 0.4 + i * 0.12;
            const fy = 0.35 + i * 0.1;
            posData[i * 3] = 0.5
                + Math.sin(t * fx + phase) * cfg.orbitAmplitude
                + Math.cos(t * 0.2 + i) * cfg.orbitAmplitude * 0.4;
            posData[i * 3 + 1] = 0.5
                + Math.cos(t * fy + phase) * cfg.orbitAmplitude
                + Math.sin(t * 0.3 + i * 0.7) * cfg.orbitAmplitude * 0.3;
            posData[i * 3 + 2] = cfg.baseRadius + i * 0.008;
        }

        gl.uniform3fv(uPositions, posData);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        rafId = requestAnimationFrame(render);
    }

    function dispose() {
        if (rafId !== null) cancelAnimationFrame(rafId);
        observer?.disconnect();
        if (gl && program) gl.deleteProgram(program);
        program = null;
        gl = null;
    }

    onMounted(init);
    onBeforeUnmount(dispose);
    watch(canvasRef, (el) => { if (el) { dispose(); init(); } });

    return { isSupported };
}
