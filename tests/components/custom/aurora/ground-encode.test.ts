import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref, type Ref } from "vue";

/* atlas U/B7 F6 (O-16, R-INTERACT §5, §7): the fallback ground is encoded once per
   palette and preset, with the substrate forced to WebGL.

   Atlas fed the scroll fraction into the aurora config, so the nuclei moved on every
   scroll step. On 10.1.1, Aurora.vue recomputed `auroraFallbackGround(config)` on every
   config change and swapped `--aurora-ground-image` on `.aurora-placeholder`: 30 to
   2,183 ground rewrites per route pass, and on the WebGL substrate a PNG encode on the
   main thread per step. Here twelve nucleus moves must cost no encode and no write,
   while the GPU path still receives every move. */

const gpu = vi.hoisted(() => ({ configGetter: null as null | (() => unknown) }));

vi.mock("@glass/components/aurora/composables/useAurora", async () => {
    const { ref: vueRef } = await vi.importActual<typeof import("vue")>("vue");
    return {
        useAurora: (_canvas: unknown, config: () => unknown) => {
            gpu.configGetter = config;
            return {
                setCursor: () => undefined,
                clearCursor: () => undefined,
                setCursorRadius: () => undefined,
                renderAt: () => undefined,
                pause: () => undefined,
                resume: () => undefined,
                isArmed: vueRef(false),
                isSettled: vueRef(false),
                rendererStatus: vueRef({ phase: "pending", engine: "webgl2" }),
            };
        },
    };
});

const encodes = vi.hoisted(() => ({ count: 0 }));
vi.mock("@glass/components/aurora/composables/auroraFallbackGround", async () => {
    const actual = await vi.importActual<
        typeof import("@glass/components/aurora/composables/auroraFallbackGround")
    >("@glass/components/aurora/composables/auroraFallbackGround");
    return {
        ...actual,
        auroraFallbackGround: (...args: Parameters<typeof actual.auroraFallbackGround>) => {
            encodes.count += 1;
            const ground = actual.auroraFallbackGround(...args);
            // a distinct image per encode, so a write is visible on the element
            return { ...ground, backgroundImage: `url("data:ground-${encodes.count}")` };
        },
    };
});

import Aurora from "@glass/components/aurora/Aurora.vue";
import { DEFAULT_AURORA_CONFIG, type AuroraConfig } from "@glass/components/aurora";

const wrappers: ReturnType<typeof mount>[] = [];
afterEach(() => {
    for (const w of wrappers.splice(0)) w.unmount();
    encodes.count = 0;
});

function leaned(base: AuroraConfig, step: number): AuroraConfig {
    return {
        ...base,
        nuclei: base.nuclei.map((n, i) => ({ ...n, y: n.y + 0.01 * step * (i % 2 ? 1 : -1) })),
    };
}

function groundWrites(el: Element): Ref<number> {
    const writes = ref(0);
    const observer = new MutationObserver((records) => {
        writes.value += records.filter((r) => r.attributeName === "style").length;
    });
    for (const layer of el.querySelectorAll(".aurora-placeholder")) {
        observer.observe(layer, { attributes: true, attributeFilter: ["style"] });
    }
    return writes;
}

describe("Aurora ground, WebGL substrate forced", () => {
    it("encodes the ground once across twelve nucleus moves and writes nothing", async () => {
        const config = ref<AuroraConfig>(DEFAULT_AURORA_CONFIG);
        const wrapper = mount(Aurora, {
            props: {
                renderMode: "webgl",
                runtimeOptions: { forceWebGLUnderSoftwareRaster: true },
                config: config.value,
            },
        });
        wrappers.push(wrapper);
        const root = wrapper.get(".aurora-root").element as HTMLElement;
        expect(root.dataset.auroraSubstrate).toBe("webgl");
        expect(encodes.count).toBe(1);
        const writes = groundWrites(root);

        for (let step = 1; step <= 12; step++) {
            await wrapper.setProps({ config: leaned(DEFAULT_AURORA_CONFIG, step) });
            await nextTick();
        }

        expect(encodes.count).toBe(1);
        expect(writes.value).toBe(0);
        // the GPU path still receives the moved nuclei
        const last = gpu.configGetter?.() as AuroraConfig;
        expect(last.nuclei[0]!.y).toBeCloseTo(DEFAULT_AURORA_CONFIG.nuclei[0]!.y - 0.12, 6);
    });

    it("crossfades a palette change on the second layer and keeps the first ground", async () => {
        const wrapper = mount(Aurora, {
            props: { renderMode: "webgl", config: DEFAULT_AURORA_CONFIG },
        });
        wrappers.push(wrapper);
        const layers = () => wrapper.findAll(".aurora-placeholder").map((w) => w.element as HTMLElement);
        expect(layers()).toHaveLength(2);
        expect(layers()[0]!.style.getPropertyValue("--aurora-ground-image")).toBe('url("data:ground-1")');
        expect(layers()[0]!.dataset.auroraGroundActive).toBe("");
        expect(layers()[0]!.dataset.auroraGroundFade).toBeUndefined();

        const repainted: AuroraConfig = {
            ...DEFAULT_AURORA_CONFIG,
            palette: DEFAULT_AURORA_CONFIG.palette.map((s) => ({ ...s, h: (s.h + 40) % 360 })),
        };
        await wrapper.setProps({ config: repainted });
        await nextTick();

        expect(encodes.count).toBe(2);
        const [first, second] = layers();
        // the outgoing ground is untouched underneath; the new one fades in on top
        expect(first!.style.getPropertyValue("--aurora-ground-image")).toBe('url("data:ground-1")');
        expect(first!.dataset.auroraGroundActive).toBeUndefined();
        expect(second!.style.getPropertyValue("--aurora-ground-image")).toBe('url("data:ground-2")');
        expect(second!.dataset.auroraGroundActive).toBe("");
        expect(second!.dataset.auroraGroundFade).toBe("");
    });
});
