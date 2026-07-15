export type RendererEngine = "webgpu" | "webgl2" | "canvas2d" | "css";

export interface RendererStatus {
    phase: "initializing" | "ready" | "error";
    engine: RendererEngine;
    adapter: string;
    error?: string;
}

export const pendingRenderer = (engine: RendererEngine): RendererStatus => ({
    phase: "initializing",
    engine,
    adapter: engine === "webgpu" ? "Acquiring adapter" : "Acquiring context",
});

export const canvas2DRenderer = (): RendererStatus => ({
    phase: "ready",
    engine: "canvas2d",
    adapter: "CPU raster",
});

export const cssRenderer = (): RendererStatus => ({
    phase: "ready",
    engine: "css",
    adapter: "Static paint",
});

export function describeWebGPUAdapter(info?: GPUAdapterInfo): string {
    if (!info) return "Hardware adapter";
    const parts = [info.vendor, info.architecture, info.description]
        .filter((part): part is string => Boolean(part?.trim()))
        .filter((part, index, all) => all.indexOf(part) === index);
    return parts.join(" · ") || "Hardware adapter";
}

export function describeWebGL2Adapter(gl: WebGL2RenderingContext | null): string {
    if (!gl) return "WebGL 2 context";
    try {
        const debug = gl.getExtension("WEBGL_debug_renderer_info");
        const renderer = debug
            ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL)
            : gl.getParameter(gl.RENDERER);
        return String(renderer || "WebGL 2 context");
    } catch {
        return "WebGL 2 context";
    }
}

export function rendererFailure(
    engine: RendererEngine,
    adapter: string,
    error: unknown,
): RendererStatus {
    return {
        phase: "error",
        engine,
        adapter,
        error: error instanceof Error ? error.message : String(error),
    };
}
