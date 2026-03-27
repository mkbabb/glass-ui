import { ref } from "vue";

export type GlassTier = "css" | "webgl" | "webgpu" | "fallback";

export interface GlassRendererOptions {
    preferredTier?: GlassTier;
}

export function useGlassRenderer(options?: GlassRendererOptions) {
    const tier = ref<GlassTier>(options?.preferredTier ?? "css");
    function register(_el: HTMLElement): number { return 0; }
    function unregister(_id: number): void {}
    return { tier, register, unregister };
}
