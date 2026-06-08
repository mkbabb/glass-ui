import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
    detectOrchestrator,
    detectStructure,
    onsetTimeMs,
    risingFrames,
} from "../../../../scripts/proof-dock-orchestrator-single.mjs";

// ── COUNT live SpringProgress engines (the one-engine RUNTIME proof) ──────────
// Mock the keyframes spring so we can COUNT how many morph engines a mounted dock
// constructs — the headline runtime assertion (a nested DockLayerGroup must NOT
// mint a second engine; it defers to the dock's one). A jsdom mount cannot run the
// real rAF spring, but it CAN prove the deferral BINDING fires (the
// silently-dropped-inject class build/typecheck miss).
const springCtor = vi.fn();
vi.mock("@mkbabb/keyframes.js", () => {
    class SpringProgress {
        target = 0;
        velocity = 0;
        settled = false;
        constructor(opts: unknown) {
            springCtor(opts);
        }
        reset() {}
        play() {}
        dispose() {}
    }
    return { SpringProgress };
});

const FRAME_MS = 1000 / 60;

// ── STRUCTURE fixtures ────────────────────────────────────────────────────────
// A GREEN GlassDock: one orchestrator, one provide, NO own useLayerTransition.
const GREEN_GLASSDOCK = `
const { context: dockMorphContext, onOuterTransitionEnd } = useDockMorphOrchestrator({ rootEl: dockEl });
provideDockMorphContext(dockMorphContext);
`;
// A GREEN DockLayerGroup: injects the optional context, registers on the nested
// path, and the SINGLE useLayerTransition is the standalone fall-through.
const GREEN_GROUP = `
const morphHost = useOptionalDockMorphContext();
if (morphHost) {
    const handle = morphHost.registerGroup({ containerEl, activeLayer, axis });
} else {
    const self = useLayerTransition({ containerEl, activeLayer, axis });
}
`;

// A born-RED DockLayerGroup: an UNCONDITIONAL useLayerTransition (the second
// engine) PLUS the standalone one = two engine-mints, no defer.
const RED_GROUP_TWO_ENGINES = `
const { currentLayer } = useLayerTransition({ containerEl, activeLayer, axis });
function maybeDefer() {
    const self = useLayerTransition({ containerEl, activeLayer, axis });
}
`;

describe("detectStructure — the single-orchestrator wiring", () => {
    it("passes the GREEN folded wiring with zero violations", () => {
        const { facts, violations } = detectStructure({
            glassDock: GREEN_GLASSDOCK,
            dockLayerGroup: GREEN_GROUP,
        });
        expect(facts.glassDockOrchestratorCount).toBe(1);
        expect(facts.glassDockProvideCount).toBe(1);
        expect(facts.glassDockUseLayerTransitionCalls).toBe(0);
        expect(facts.dockLayerGroupInjects).toBe(1);
        expect(facts.dockLayerGroupRegisters).toBe(1);
        expect(facts.dockLayerGroupUseLayerTransitionCalls).toBe(1);
        expect(violations).toHaveLength(0);
    });

    it("flags a DockLayerGroup that mints a SECOND engine (the born-RED defect)", () => {
        const { facts, violations } = detectStructure({
            glassDock: GREEN_GLASSDOCK,
            dockLayerGroup: RED_GROUP_TWO_ENGINES,
        });
        expect(facts.dockLayerGroupUseLayerTransitionCalls).toBe(2);
        expect(violations.some((v) => /useLayerTransition\(\) 2/.test(v))).toBe(true);
    });

    it("flags a GlassDock missing the morph provide", () => {
        const { violations } = detectStructure({
            glassDock: "const { context } = useDockMorphOrchestrator({});",
            dockLayerGroup: GREEN_GROUP,
        });
        expect(violations.some((v) => /provideDockMorphContext/.test(v))).toBe(true);
    });

    it("flags a GlassDock that still mints its own useLayerTransition", () => {
        const { violations } = detectStructure({
            glassDock:
                GREEN_GLASSDOCK + "\nconst x = useLayerTransition({ containerEl: layersEl });",
            dockLayerGroup: GREEN_GROUP,
        });
        expect(violations.some((v) => /GlassDock.*useLayerTransition/.test(v))).toBe(true);
    });

    it("flags a DockLayerGroup that does not inject the optional morph context", () => {
        const { violations } = detectStructure({
            glassDock: GREEN_GLASSDOCK,
            dockLayerGroup: "const self = useLayerTransition({ containerEl });",
        });
        expect(violations.some((v) => /useOptionalDockMorphContext/.test(v))).toBe(true);
    });
});

// ── RUNTIME timeline fixtures ─────────────────────────────────────────────────
// ONE engine, one clock: box, stack, and scalar onset in the SAME frame and ramp
// together (the W02 fold).
const ONE_CLOCK = {
    engineCount: 1,
    timeline: {
        boxWidths: [58, 80, 120, 165, 198, 211, 211, 211],
        stackSizes: [40, 60, 95, 138, 170, 182, 182, 182],
        morphTs: [0, 0.18, 0.45, 0.72, 0.95, 1.05, 1.0, 1.0],
        times: [0, 16.7, 33.4, 50.1, 66.8, 83.5, 100.2, 116.9],
    },
};

// TWO engines / two clocks: the box rides the scalar, but the nested stack is
// driven by a SECOND spring that onsets TWO frames later (the double-animation
// born-RED).
const TWO_CLOCK = {
    engineCount: 2,
    timeline: {
        boxWidths: [58, 80, 120, 165, 198, 211, 211, 211],
        // stack stays put for two frames then ramps on its own clock
        stackSizes: [40, 40, 40, 95, 138, 170, 182, 182],
        morphTs: [0, 0.18, 0.45, 0.72, 0.95, 1.05, 1.0, 1.0],
        times: [0, 16.7, 33.4, 50.1, 66.8, 83.5, 100.2, 116.9],
    },
};

describe("risingFrames / onsetTimeMs", () => {
    it("counts a healthy scalar ramp as ≥5 rising frames", () => {
        expect(risingFrames(ONE_CLOCK.timeline.morphTs, 1e-4)).toBeGreaterThanOrEqual(5);
    });
    it("returns the final timestamp for a flat series", () => {
        const flat = [0, 0, 0, 0];
        const times = [0, 16, 33, 50];
        expect(onsetTimeMs(flat, times, 1e-4)).toBe(50);
    });
});

describe("detectOrchestrator — the single-clock bites", () => {
    it("passes a ONE-engine, one-clock collapse-while-switching with zero violations", () => {
        const { facts, violations } = detectOrchestrator(ONE_CLOCK);
        expect(facts.engineCount).toBe(1);
        expect(facts.morphTRisingFrames).toBeGreaterThanOrEqual(5);
        expect(facts.boxScalarDeltaMs).toBeLessThanOrEqual(FRAME_MS + 1e-3);
        expect(facts.stackScalarDeltaMs).toBeLessThanOrEqual(FRAME_MS + 1e-3);
        expect(violations).toHaveLength(0);
    });

    it("flags a TWO-engine count", () => {
        const { facts, violations } = detectOrchestrator(TWO_CLOCK);
        expect(facts.engineCount).toBe(2);
        expect(violations.some((v) => /2 morph engine/.test(v))).toBe(true);
    });

    it("flags the nested stack on a SECOND clock (onset > 1 frame from the scalar)", () => {
        const { facts, violations } = detectOrchestrator(TWO_CLOCK);
        expect(facts.stackScalarDeltaMs).toBeGreaterThan(FRAME_MS);
        expect(violations.some((v) => /SECOND clock|two-engine/.test(v))).toBe(true);
    });

    it("flags a probe error", () => {
        const { violations } = detectOrchestrator({ error: "no collapsed dock" });
        expect(violations.length).toBeGreaterThan(0);
    });

    it("flags a missing timeline", () => {
        const { violations } = detectOrchestrator({ engineCount: 1 });
        expect(violations.some((v) => /timeline is missing/.test(v))).toBe(true);
    });
});

// ── RUNTIME: the binding-verification proof (one engine, deferral fires) ───────
// The W01 lesson: build + typecheck + the static structure arm all pass while a
// silently-dropped inject reads `undefined` and the nested group spins a second
// engine. This mounts the REAL components and COUNTS the live SpringProgress
// engines, so the deferral binding is verified at runtime — the class headless
// gates miss.
describe("runtime — ONE morph engine per dock (the deferral binding)", () => {
    let GlassDock: typeof import("../../../../src/components/custom/dock/GlassDock.vue").default;
    let DockLayerGroup: typeof import("../../../../src/components/custom/dock/DockLayerGroup.vue").default;
    let DockLayer: typeof import("../../../../src/components/custom/dock/DockLayer.vue").default;

    beforeEach(async () => {
        springCtor.mockClear();
        GlassDock = (await import("../../../../src/components/custom/dock/GlassDock.vue")).default;
        DockLayerGroup = (
            await import("../../../../src/components/custom/dock/DockLayerGroup.vue")
        ).default;
        DockLayer = (await import("../../../../src/components/custom/dock/DockLayer.vue")).default;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    function nestedDock(active = "a") {
        return defineComponent({
            data: () => ({ active }),
            render() {
                return h(GlassDock, { alwaysExpanded: true, fitContent: true }, () => [
                    h(
                        DockLayerGroup,
                        {
                            active: this.active,
                            "onUpdate:active": (v: string) => (this.active = v),
                            showRail: false,
                        },
                        () => [
                            h(DockLayer, { id: "a", label: "A" }, () => h("button", "a1")),
                            h(DockLayer, { id: "b", label: "B" }, () => h("button", "b1")),
                        ],
                    ),
                ]);
            },
        });
    }

    it("a nested DockLayerGroup REGISTERS with the dock orchestrator (the deferral binding fires)", async () => {
        // The discriminating runtime proof: stub the dock's morph context over the
        // REAL provide key and assert the nested group calls `registerGroup` — the
        // inject fired (not silently dropped → undefined → a second engine). A
        // born-RED group that minted its own engine would never call registerGroup.
        const { DOCK_MORPH_KEY } = await import(
            "../../../../src/components/custom/dock/composables/dockMorphContext"
        );
        const registerGroup = vi.fn(() => ({
            currentLayer: { value: "a" },
            leavingLayer: { value: null },
            release: () => {},
        }));
        const Host = defineComponent({
            provide: { [DOCK_MORPH_KEY as symbol]: { registerGroup } },
            render() {
                return h(
                    DockLayerGroup,
                    { active: "a", showRail: false },
                    () => [
                        h(DockLayer, { id: "a", label: "A" }, () => h("button", "a1")),
                        h(DockLayer, { id: "b", label: "B" }, () => h("button", "b1")),
                    ],
                );
            },
        });
        const wrapper = mount(Host);
        await nextTick();
        // The nested group injected the morph context and deferred — it registered
        // its pane-stack instead of minting a second engine.
        expect(registerGroup).toHaveBeenCalledTimes(1);
        // And it minted ZERO SpringProgress of its own (the stub owns the morph).
        expect(springCtor.mock.calls.length).toBe(0);
        wrapper.unmount();
    });

    it("a nested DockLayerGroup mints no engine while deferring (≤1 spring across the whole dock)", async () => {
        const wrapper = mount(nestedDock());
        await nextTick();
        (wrapper.vm as { active: string }).active = "b";
        await nextTick();
        // At most ONE SpringProgress across the whole nested dock (the dock
        // orchestrator's). The nested group minted ZERO of its own.
        expect(springCtor.mock.calls.length).toBeLessThanOrEqual(1);
        wrapper.unmount();
    });

    it("a standalone DockLayerGroup (no GlassDock ancestor) self-orchestrates", async () => {
        // No dock provider → useOptionalDockMorphContext() reads null → the group
        // keeps its OWN useLayerTransition engine (the befitting-silent fall-through).
        const Standalone = defineComponent({
            data: () => ({ active: "a" }),
            render() {
                return h(
                    DockLayerGroup,
                    {
                        active: this.active,
                        "onUpdate:active": (v: string) => (this.active = v),
                        showRail: false,
                    },
                    () => [
                        h(DockLayer, { id: "a", label: "A" }, () => h("button", "a1")),
                        h(DockLayer, { id: "b", label: "B" }, () => h("button", "b1")),
                    ],
                );
            },
        });
        const wrapper = mount(Standalone);
        await nextTick();
        // The group renders bare (no throw) and owns its own stack — the
        // optional-context fall-through fired. The pane swap is handled by its own
        // useLayerTransition (no second-engine error, no dropped inject).
        expect(wrapper.find(".dock-layer-stack").exists()).toBe(true);
        (wrapper.vm as { active: string }).active = "b";
        await nextTick();
        expect(wrapper.find(".dock-layer-item-host.is-active").exists()).toBe(true);
        wrapper.unmount();
    });
});
