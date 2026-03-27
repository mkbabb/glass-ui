import {
    ref,
    shallowRef,
    onMounted,
    onBeforeUnmount,
    type Ref,
} from "vue";
import {
    VERTEX_SHADER,
    FRAGMENT_SHADER,
    createFrostProgram,
    getFrostUniforms,
    type FrostUniforms,
} from "./webgl/frostShader";

export type GlassTier = "webgpu" | "webgl" | "css" | "fallback";

export interface GlassRendererOptions {
    preferredTier?: GlassTier;
}

export interface WebGLGlassState {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    uniforms: FrostUniforms;
    vao: WebGLVertexArrayObject;
    backgroundTexture: WebGLTexture;
    animId: number;
    panelEl: HTMLElement;
    observer: ResizeObserver | null;
}

/**
 * Detect available rendering tier.
 */
function detectTier(): GlassTier {
    // Try WebGL2
    try {
        const c = document.createElement("canvas");
        if (c.getContext("webgl2")) return "webgl";
    } catch { /* fallthrough */ }

    // CSS backdrop-filter
    if (
        CSS.supports("backdrop-filter", "blur(1px)") ||
        CSS.supports("-webkit-backdrop-filter", "blur(1px)")
    ) {
        return "css";
    }

    return "fallback";
}

/**
 * Capture the area behind a panel element as an ImageData by drawing
 * the page background. Uses a temporary canvas to sample the region.
 */
function captureBackground(
    panelEl: HTMLElement,
    bgTexCanvas: HTMLCanvasElement,
    bgTexCtx: CanvasRenderingContext2D,
): void {
    const rect = panelEl.getBoundingClientRect();
    const w = Math.ceil(rect.width);
    const h = Math.ceil(rect.height);
    if (w === 0 || h === 0) return;

    bgTexCanvas.width = w;
    bgTexCanvas.height = h;

    // Draw the page background at the panel's position.
    // We look for an AuroraBlobs canvas or any positioned canvas behind the panel.
    const bgCanvas = document.querySelector<HTMLCanvasElement>(
        "canvas.aurora-blobs, canvas[aria-hidden='true']",
    );

    if (bgCanvas) {
        // Sample the region from the background canvas
        bgTexCtx.drawImage(
            bgCanvas,
            rect.left * window.devicePixelRatio,
            rect.top * window.devicePixelRatio,
            w * window.devicePixelRatio,
            h * window.devicePixelRatio,
            0, 0, w, h,
        );
    } else {
        // Fallback: sample the computed background color
        const bgColor = getComputedStyle(document.documentElement).backgroundColor;
        bgTexCtx.fillStyle = bgColor || "#ffffff";
        bgTexCtx.fillRect(0, 0, w, h);
    }
}

/**
 * Set up the full-screen quad VAO for the frost shader.
 */
function createQuadVAO(gl: WebGL2RenderingContext, program: WebGLProgram): WebGLVertexArrayObject {
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);

    // Full-screen quad (2 triangles)
    const positions = new Float32Array([
        -1, -1, 1, -1, -1, 1,
        -1, 1, 1, -1, 1, 1,
    ]);
    const texCoords = new Float32Array([
        0, 1, 1, 1, 0, 0,
        0, 0, 1, 1, 1, 0,
    ]);

    const posBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    if (posLoc >= 0) {
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    }

    const texBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    const texLoc = gl.getAttribLocation(program, "a_texCoord");
    if (texLoc >= 0) {
        gl.enableVertexAttribArray(texLoc);
        gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);
    }

    gl.bindVertexArray(null);
    return vao;
}

/**
 * Composable for GPU-accelerated glass rendering.
 *
 * In WebGL mode, creates a per-panel canvas overlay that applies
 * the frost fragment shader (variable blur, Snell's law refraction,
 * Fresnel specular, chromatic aberration) to the captured background.
 *
 * Falls back to CSS `backdrop-filter` or solid background.
 */
export function useGlassRenderer(options?: GlassRendererOptions) {
    const tier = ref<GlassTier>(options?.preferredTier ?? "css");
    const glState = shallowRef<WebGLGlassState | null>(null);

    // Background capture canvas (shared, reused)
    let bgTexCanvas: HTMLCanvasElement | null = null;
    let bgTexCtx: CanvasRenderingContext2D | null = null;
    let startTime = 0;
    let captureInterval: ReturnType<typeof setInterval> | null = null;

    onMounted(() => {
        if (!options?.preferredTier) {
            tier.value = detectTier();
        }
    });

    onBeforeUnmount(() => {
        destroy();
    });

    /**
     * Initialize WebGL rendering for a specific panel element.
     * Creates a canvas overlay sized to the panel and compiles the frost shader.
     */
    function initWebGL(panelEl: HTMLElement): WebGLGlassState | null {
        const canvas = document.createElement("canvas");
        canvas.style.cssText =
            "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;border-radius:inherit;z-index:0;";

        const gl = canvas.getContext("webgl2", {
            alpha: true,
            premultipliedAlpha: false,
            antialias: false,
        });
        if (!gl) return null;

        const program = createFrostProgram(gl);
        if (!program) return null;

        const uniforms = getFrostUniforms(gl, program);
        const vao = createQuadVAO(gl, program);

        // Background texture
        const backgroundTexture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, backgroundTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        // Init bg capture canvas
        if (!bgTexCanvas) {
            bgTexCanvas = document.createElement("canvas");
            bgTexCtx = bgTexCanvas.getContext("2d")!;
        }

        // Insert canvas into panel
        panelEl.style.position = "relative";
        panelEl.insertBefore(canvas, panelEl.firstChild);

        const state: WebGLGlassState = {
            canvas,
            gl,
            program,
            uniforms,
            vao,
            backgroundTexture,
            animId: 0,
            panelEl,
            observer: null,
        };

        // Resize handler
        const resizeCanvas = () => {
            const rect = panelEl.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio, 1.5);
            canvas.width = Math.ceil(rect.width * dpr);
            canvas.height = Math.ceil(rect.height * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        state.observer = new ResizeObserver(resizeCanvas);
        state.observer.observe(panelEl);
        resizeCanvas();

        startTime = performance.now();

        // Capture background periodically (debounced)
        captureInterval = setInterval(() => {
            if (bgTexCanvas && bgTexCtx) {
                captureBackground(panelEl, bgTexCanvas, bgTexCtx);
                uploadTexture(state);
            }
        }, 200);

        // Initial capture
        requestAnimationFrame(() => {
            if (bgTexCanvas && bgTexCtx) {
                captureBackground(panelEl, bgTexCanvas, bgTexCtx);
                uploadTexture(state);
            }
        });

        return state;
    }

    function uploadTexture(state: WebGLGlassState) {
        if (!bgTexCanvas) return;
        const { gl, backgroundTexture } = state;
        gl.bindTexture(gl.TEXTURE_2D, backgroundTexture);
        gl.texImage2D(
            gl.TEXTURE_2D, 0, gl.RGBA,
            gl.RGBA, gl.UNSIGNED_BYTE, bgTexCanvas,
        );
    }

    /**
     * Render one frame of the frost shader.
     */
    function renderFrame(
        state: WebGLGlassState,
        blurRadius: number,
        refractionStrength: number,
        chromaticAberration: number,
        lightPos: [number, number],
    ) {
        const { gl, program, uniforms, vao, canvas } = state;

        gl.useProgram(program);
        gl.bindVertexArray(vao);

        // Bind background texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, state.backgroundTexture);
        gl.uniform1i(uniforms.u_background, 0);

        // Set uniforms
        gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
        gl.uniform4f(uniforms.u_glassBounds, 0, 0, 1, 1); // full panel
        gl.uniform1f(uniforms.u_blurRadius, blurRadius);
        gl.uniform1f(uniforms.u_refractionStrength, refractionStrength);
        gl.uniform1f(uniforms.u_chromaticAberration, chromaticAberration);
        gl.uniform2f(uniforms.u_lightPos, lightPos[0], lightPos[1]);
        gl.uniform1f(uniforms.u_time, (performance.now() - startTime) / 1000);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindVertexArray(null);
    }

    /**
     * Start the render loop for a WebGL glass panel.
     */
    function startRenderLoop(
        state: WebGLGlassState,
        opts: {
            blur?: number;
            refraction?: number;
            chromaticAberration?: number;
        } = {},
    ) {
        const blur = opts.blur ?? 20;
        const refraction = opts.refraction ?? 0.3;
        const chromatic = opts.chromaticAberration ?? 0.5;

        function loop() {
            renderFrame(state, blur, refraction, chromatic, [0.3, 0.3]);
            state.animId = requestAnimationFrame(loop);
        }
        state.animId = requestAnimationFrame(loop);
    }

    /**
     * Register a DOM element as a glass panel.
     * In WebGL mode, initializes the shader pipeline and starts rendering.
     */
    function register(
        el: HTMLElement,
        opts?: { blur?: number; refraction?: number; chromaticAberration?: number },
    ): number {
        if (tier.value === "webgl") {
            const state = initWebGL(el);
            if (state) {
                glState.value = state;
                startRenderLoop(state, opts);
                return 1;
            }
            // WebGL init failed, fall back to CSS
            tier.value = "css";
        }
        return 0;
    }

    function unregister(_id: number) {
        destroy();
    }

    function destroy() {
        const state = glState.value;
        if (state) {
            cancelAnimationFrame(state.animId);
            state.observer?.disconnect();
            state.canvas.remove();
            state.gl.deleteProgram(state.program);
            state.gl.deleteTexture(state.backgroundTexture);
            glState.value = null;
        }
        if (captureInterval) {
            clearInterval(captureInterval);
            captureInterval = null;
        }
    }

    return { tier, register, unregister };
}
