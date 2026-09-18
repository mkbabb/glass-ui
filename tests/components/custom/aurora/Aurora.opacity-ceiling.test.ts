import { readFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, type Ref } from "vue";

const auroraState = vi.hoisted(() => ({
    isArmed: undefined as Ref<boolean> | undefined,
    isSettled: undefined as Ref<boolean> | undefined,
}));

vi.mock("@glass/components/aurora/composables/useAurora", async () => {
    const { ref } = await vi.importActual<typeof import("vue")>("vue");
    const isArmed = ref(false);
    // The settle beacon rides the same mocked door as the arm flag — `Aurora.vue`
    // publishes it as `data-aurora-settled`, so a mock that omits it renders a template
    // that cannot mount.
    const isSettled = ref(false);
    const rendererStatus = ref({
        phase: "ready" as const,
        engine: "css" as const,
        adapter: "Static paint",
    });
    auroraState.isArmed = isArmed;
    auroraState.isSettled = isSettled;

    return {
        useAurora: () => ({
            setCursor: () => undefined,
            clearCursor: () => undefined,
            setCursorRadius: () => undefined,
            renderAt: () => undefined,
            pause: () => undefined,
            resume: () => undefined,
            isArmed,
            isSettled,
            rendererStatus,
        }),
    };
});

vi.mock(
    "@glass/components/aurora/composables/auroraFallbackGround",
    () => ({
        auroraFallbackGround: () => ({
            backgroundImage: "linear-gradient(#123, #456)",
            backgroundColor: "#123",
        }),
    }),
);

import Aurora from "@glass/components/aurora/Aurora.vue";

const wrappers: ReturnType<typeof mount>[] = [];

describe("Aurora opacity ceiling", () => {
    beforeEach(() => {
        auroraState.isArmed!.value = false;
    });

    afterEach(() => {
        for (const wrapper of wrappers.splice(0)) wrapper.unmount();
    });

    it("applies the route ceiling once around the CSS fallback field", () => {
        const wrapper = mount(Aurora, {
            props: { renderMode: "css", opacityCeiling: 0.55 },
        });
        wrappers.push(wrapper);

        const root = wrapper.get(".aurora-root").element as HTMLElement;
        const placeholder = wrapper.get(".aurora-placeholder").element as HTMLElement;
        const canvasLayer = wrapper.get(".aurora-canvas-layer").element as HTMLElement;

        expect(root.dataset.auroraSubstrate).toBe("css");
        // The ceiling rides a CUSTOM PROPERTY, not an inline `opacity`: an inline
        // paint value outranks an author media arm, so the a11y arms below could
        // never win against one. Same element, same single application.
        expect(root.style.getPropertyValue("--aurora-ceiling")).toBe("0.55");
        expect(root.style.opacity).toBe("");
        // The ground's two paint values move the same way.
        expect(placeholder.style.getPropertyValue("--aurora-ground-image")).toBe(
            "linear-gradient(#123, #456)",
        );
        expect(placeholder.style.getPropertyValue("--aurora-ground-color")).toBe("#123");
        expect(placeholder.style.backgroundImage).toBe("");
        expect(placeholder.style.backgroundColor).toBe("");
        expect(placeholder.style.opacity).toBe("");
        expect(canvasLayer.style.opacity).toBe("");
    });

    it("keeps the armed canvas handoff at one inside the total envelope", async () => {
        const wrapper = mount(Aurora, {
            props: {
                renderMode: "webgl",
                opacityCeiling: 0.55,
                runtimeOptions: { forceWebGLUnderSoftwareRaster: true },
            },
        });
        wrappers.push(wrapper);

        const canvasLayer = wrapper.get(".aurora-canvas-layer");
        expect(canvasLayer.classes()).not.toContain("aurora-canvas-layer--armed");
        expect((canvasLayer.element as HTMLElement).style.opacity).toBe("");

        auroraState.isArmed!.value = true;
        await nextTick();

        expect(canvasLayer.classes()).toContain("aurora-canvas-layer--armed");
        expect((canvasLayer.element as HTMLElement).style.opacity).toBe("");
    });
});

// O-26 R-5 — aurora was in NEITHER a11y sweep: a forced-colors reader got
// system-colour text over an unforced full-chroma animation, and a
// reduced-transparency reader got the consumer's `opacityCeiling` unchanged. The arms
// live in `Aurora.vue`'s OWN scoped block (no new file, no JS media read); happy-dom
// applies no stylesheet, so the arms are read from the emitted block itself.
describe("O-26 R-5 — the aurora a11y arms in the scoped block", () => {
    const SFC = readFileSync("src/components/aurora/Aurora.vue", "utf8");
    const scoped = SFC.slice(SFC.indexOf("<style scoped>"));
    // Comments out, whitespace flattened — the arms are read as declarations, not as
    // the prose that explains them.
    const squashed = scoped.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\s+/g, " ");

    it("routes both paint values through custom properties the media arms can reach", () => {
        expect(squashed).toContain(
            ".aurora-root { opacity: var(--aurora-ceiling-a11y, var(--aurora-ceiling, 1));",
        );
        expect(squashed).toContain(
            ".aurora-placeholder { background-image: var(--aurora-ground-image, none); background-color: var(--aurora-ground-color, transparent); }",
        );
    });

    it("carries the reduced-transparency arm", () => {
        expect(squashed).toContain(
            "@media (prefers-reduced-transparency: reduce) { .aurora-root { --aurora-ceiling-a11y: 1; } }",
        );
    });

    it("carries the forced-colors arm", () => {
        // Chromium forced-colors forces `background-color` but keeps
        // `background-image`, so the image half is the load-bearing one.
        expect(squashed).toContain(
            "@media (forced-colors: active) { .aurora-root > .aurora-canvas-layer { display: none; } .aurora-placeholder { background-image: none; background-color: Canvas; } }",
        );
    });

    it("leaves the default computed ceiling at opacityCeiling", () => {
        // `--aurora-ceiling-a11y` is written by the media arm ALONE — nothing sets it
        // inline or at rest — so the default cascade resolves the root's opacity
        // through the fallback to `--aurora-ceiling`, i.e. to the prop's clamped value.
        // Exactly ONE write of the a11y override exists, and the arm test above
        // pins it inside the reduced-transparency media block.
        expect(squashed.match(/--aurora-ceiling-a11y\s*:/g)).toHaveLength(1);
        expect(SFC).toContain("'--aurora-ceiling': ceilingVar");
    });
});
