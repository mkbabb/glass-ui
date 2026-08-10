// GF-AURORA W0 — THE PROBE HARNESS (BK #49, lane γ unit 2).
//
// The harness wave is the one that has to land before anything with a pixel, because
// three separate instruments in this lane were measuring the wrong thing:
//
//   1. the ENTRANCE WINDOW — the ground→field crossfade means an early capture reads a
//      medium-INDEPENDENT picture with perfect confidence. The cure is a settle BEACON
//      (`data-aurora-settled`), never a longer wall-clock sleep.
//   2. the NucleiOverlay `:dimmed` MEDIUM COUPLING — an overlay whose opacity stepped
//      35→70 with `medium === "smooth"`, i.e. the measured surface changed with the
//      variable under test. Struck as a design act, not suppressed under a flag.
//   3. the STALE COMBOBOX — `?aurmedium=` reached the shader but not the atoms door,
//      so the control read "Smooth" over a live crayon field. Cured by ORDER: the forced
//      medium lands during the story's `setup`, before the dock seeds its atoms.
//
// Plus the two demand-side rulings this wave carries:
//   - the DRIFT DEMAND GATE is ONE predicate over the four axes, consumed by all three
//     render loops. It was triplicated, and the image-pipeline copy silently omitted
//     `breathDepth` — an image-source aurora with breath and no drift parked its loop
//     and never rendered the breath.
//   - AURORA INTERACTIVITY DEFAULTS ON, PRM-guarded. A capability behind an opt-out flag
//     had not landed the directive; the opt-out stays.
//
// ORDINARY unit cases — this file mints NO gate seat (the register stays at 60).

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { flushPromises, mount, shallowMount, type VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";

import type { RendererStatus } from "@glass/composables/glass/webgpu/rendererStatus";

// ── THE ARM DOOR ────────────────────────────────────────────────────────────────────
// The beacon's POSITIVE arm needs a runtime that actually arms, and a GPU device is the
// one thing the DOM test environment cannot supply. So `createAurora` — and only it — is
// stubbed; everything the beacon is made of stays the real library code under test:
// `useAurora`'s arm sequence, its config application, the rAF settle chain, and the
// renderer-status seam. Stubbing `useAurora` itself (the door
// `Aurora.opacity-ceiling.test.ts` uses) cannot witness the beacon at all — that mock
// REPLACES the very state under test, which is how a never-stamp regression could sit
// green under a suite that only ever asserted the beacon's ABSENCE.
const auroraRuntime = vi.hoisted(() => ({
    /** Every stub runtime constructed in this file, newest last. */
    instances: [] as Array<{
        /** Every config `useAurora` applied to the runtime, in order. */
        configs: unknown[];
        /** Drive the renderer-status seam the way `createGpuSubstrate` drives it. */
        publish: (status: RendererStatus) => void;
    }>,
}));

vi.mock("@glass/components/aurora/composables/runtime", async () => {
    const actual = await vi.importActual<
        typeof import("@glass/components/aurora/composables/runtime")
    >("@glass/components/aurora/composables/runtime");
    const createAurora = ((_canvas, _initial, options = {}) => {
        const configs: unknown[] = [];
        const publish = (status: RendererStatus): void =>
            options.onRendererStatus?.(status);
        auroraRuntime.instances.push({ configs, publish });
        // Construction publishes the pending status, exactly as the substrate does.
        publish({
            phase: "initializing",
            engine: "webgl2",
            adapter: "Acquiring context",
        });
        const noop = (): void => undefined;
        return {
            armAsync: async (): Promise<void> => {
                publish({ phase: "ready", engine: "webgl2", adapter: "Stub device" });
            },
            update: (cfg: unknown): void => {
                configs.push(cfg);
            },
            setScrollProgress: noop,
            setCursor: noop,
            clearCursor: noop,
            setCursorRadius: noop,
            renderAt: noop,
            pause: noop,
            resume: noop,
            wake: noop,
            presize: noop,
            dispose: noop,
        } as unknown as ReturnType<typeof actual.createAurora>;
    }) as typeof actual.createAurora;
    return { ...actual, createAurora };
});

import { Aurora } from "@glass/components/aurora";
import {
    AURORA_DRIFT_FLOOR,
    DEFAULT_AURORA_CONFIG,
    isAuroraDriftLive,
    type AuroraConfig,
} from "@glass/components/aurora/constants/presets";
import { isAuroraPointerEnabled } from "@glass/components/aurora/composables/runtime";
import { AURORA_SETTLE_MS } from "@glass/components/aurora/composables/useAurora";

import AuroraStage from "../../../../demo/stories/substrates/aurora/AuroraStage.vue";
import NucleiOverlay from "../../../../demo/stories/substrates/aurora/NucleiOverlay.vue";

const repoFile = (rel: string): string =>
    readFileSync(join(process.cwd(), rel), "utf8");

/** The three render loops that own a demand gate — the WebGL2 loop and both WGSL ones. */
const DEMAND_GATE_SOURCES = [
    "src/components/aurora/composables/frameLoop.ts",
    "src/components/aurora/composables/wgpuSetup.ts",
];

const stillConfig = (): AuroraConfig => ({
    ...DEFAULT_AURORA_CONFIG,
    nucleiDrift: 0,
    paletteDrift: 0,
    breathDepth: 0,
    warpDrift: 0,
});

describe("GF-AURORA W0 · the drift demand gate is ONE amplitude-shaped predicate", () => {
    it("reads a fully-still config as parked and the shipped default as live", () => {
        expect(isAuroraDriftLive(stillConfig())).toBe(false);
        expect(isAuroraDriftLive(DEFAULT_AURORA_CONFIG)).toBe(true);
    });

    it("keeps a breath-only config LIVE — the image-pipeline divergence", () => {
        // `wgpuSetup`'s image-pipeline copy tested nucleiDrift/warpDrift/paletteDrift and
        // OMITTED breathDepth, so this exact config parked its loop and the breath never
        // rendered. One predicate, one answer, on every loop.
        const breathOnly: AuroraConfig = { ...stillConfig(), breathDepth: 0.05 };
        expect(isAuroraDriftLive(breathOnly)).toBe(true);
    });

    it("answers per axis against that axis's own authored domain", () => {
        // The four axes do NOT share a domain (nuclei 0..0.05 · palette 0..0.04 ·
        // breath 0..0.15 · warp 0..0.015), so a single flat epsilon over raw values
        // would silently retire whole axes. Each axis carries its own floor.
        const axes = ["nucleiDrift", "paletteDrift", "breathDepth", "warpDrift"] as const;
        for (const axis of axes) {
            const floor = AURORA_DRIFT_FLOOR[axis];
            expect(floor).toBeGreaterThan(0);
            expect(isAuroraDriftLive({ ...stillConfig(), [axis]: floor })).toBe(true);
            expect(isAuroraDriftLive({ ...stillConfig(), [axis]: floor / 2 })).toBe(false);
        }
    });

    it("leaves no second copy of the ladder in any render loop", () => {
        for (const rel of DEMAND_GATE_SOURCES) {
            const src = repoFile(rel);
            expect(src).toContain("isAuroraDriftLive");
            // The retired zero-aware ladder, in every one of its four spellings —
            // `breathDepth` included, since ITS omission from the image pipeline's copy
            // is the exact bug the one-predicate fold cured.
            expect(src).not.toMatch(/nucleiDrift !== 0/);
            expect(src).not.toMatch(/paletteDrift !== 0/);
            expect(src).not.toMatch(/breathDepth !== 0/);
            expect(src).not.toMatch(/warpDrift !== 0/);
        }
    });
});

describe("GF-AURORA W0 · aurora interactivity defaults ON, PRM-guarded", () => {
    it("enables pointer shaping on a config that names no interactivity at all", () => {
        expect(isAuroraPointerEnabled({ ...DEFAULT_AURORA_CONFIG })).toBe(true);
        expect(
            isAuroraPointerEnabled({ ...DEFAULT_AURORA_CONFIG, interactivity: {} }),
        ).toBe(true);
    });

    it("keeps the explicit opt-out — and keeps `light` medium-aware under it", () => {
        const optedOut = (medium: AuroraConfig["medium"]): AuroraConfig => ({
            ...DEFAULT_AURORA_CONFIG,
            medium,
            interactivity: { swirl: false, light: true },
        });
        // swirl off + smooth: `light` drives the impasto direction, and smooth has no
        // impasto — nothing to shape, so the pointer stays off.
        expect(isAuroraPointerEnabled(optedOut("smooth"))).toBe(false);
        // swirl off + a painterly body: `light` reaches real paint, so the pointer lives.
        expect(isAuroraPointerEnabled(optedOut("oil"))).toBe(true);
        expect(
            isAuroraPointerEnabled({
                ...DEFAULT_AURORA_CONFIG,
                interactivity: { swirl: false },
            }),
        ).toBe(false);
    });
});

// ── THE FRAME CLOCK ─────────────────────────────────────────────────────────────────
// The beacon advances on `requestAnimationFrame` and reads `performance.now()`, so the
// test owns both: frames are delivered by hand against a clock the test moves. A
// wall-clock wait would be the very instrument the beacon replaces.
const frames = {
    now: 0,
    pending: new Map<number, FrameRequestCallback>(),
    nextId: 1,
};

function installFrameClock(): void {
    frames.now = 0;
    frames.pending.clear();
    frames.nextId = 1;
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback): number => {
        const id = frames.nextId++;
        frames.pending.set(id, cb);
        return id;
    });
    vi.stubGlobal("cancelAnimationFrame", (id: number): void => {
        frames.pending.delete(id);
    });
    vi.spyOn(performance, "now").mockImplementation(() => frames.now);
}

/** Deliver ~60fps frames until the clock has moved `ms`, flushing Vue between them. */
async function advanceFrames(ms: number): Promise<void> {
    const target = frames.now + ms;
    while (frames.now < target) {
        frames.now = Math.min(target, frames.now + 16);
        const due = [...frames.pending.values()];
        frames.pending.clear();
        for (const cb of due) cb(frames.now);
        await nextTick();
    }
}

/** Mount the real `Aurora` on the eager path so the arm runs at mount, and await it. */
async function mountArmedAurora(config: AuroraConfig): Promise<VueWrapper> {
    const wrapper = mount(Aurora, {
        props: {
            config,
            renderMode: "webgl",
            // `initStrategy: "eager"` takes the arm off the idle/intersection defer;
            // the software-raster escape keeps `resolveRenderMode` on the GPU substrate.
            runtimeOptions: {
                initStrategy: "eager",
                forceWebGLUnderSoftwareRaster: true,
            },
        },
    });
    await flushPromises();
    return wrapper;
}

const beaconOf = (wrapper: VueWrapper): string | undefined =>
    wrapper.get(".aurora-root").attributes("data-aurora-settled");

const lastRuntime = (): (typeof auroraRuntime.instances)[number] => {
    const runtime = auroraRuntime.instances.at(-1);
    if (!runtime) throw new Error("no aurora runtime was constructed");
    return runtime;
};

describe("GF-AURORA W0 · the settle beacon", () => {
    beforeEach(() => {
        auroraRuntime.instances.length = 0;
        installFrameClock();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it("waits out the ground→field entrance crossfade", () => {
        // `.aurora-canvas-layer` cross-fades over `--duration-slow` (0.45s, the
        // scheme-motion token). A beacon that fires inside that window republishes the
        // very entrance-window trap it exists to close.
        expect(AURORA_SETTLE_MS).toBeGreaterThanOrEqual(450);
        expect(repoFile("src/styles/tokens/scheme-motion.css")).toContain(
            "--duration-slow: 0.45s",
        );
    });

    it("never stamps on a surface that has not armed", () => {
        const aurora = shallowMount(Aurora, { props: { renderMode: "css" } });
        const root = aurora.get(".aurora-root");
        // The `"css"` substrate never arms a GPU path — there is no live field to settle,
        // so the beacon must stay absent rather than certify a static ground as the field.
        expect(root.attributes("data-aurora-settled")).toBeUndefined();
    });

    it("is stamped by the library, so every consumer capture can gate on it", () => {
        // The beacon belongs on `.aurora-root` — the surface itself — not on the demo
        // studio's stage wrapper, or only the studio route could be captured admissibly.
        expect(repoFile("src/components/aurora/Aurora.vue")).toContain(
            "data-aurora-settled",
        );
    });

    it("STAMPS one entrance after the arm seats the current config", async () => {
        const config: AuroraConfig = { ...DEFAULT_AURORA_CONFIG };
        const wrapper = await mountArmedAurora(config);

        // The entrance starts at the ARM, with the config applied — not at mount.
        expect(lastRuntime().configs).toEqual([config]);
        expect(beaconOf(wrapper)).toBeUndefined();

        // Inside the window the field paints medium-independently: still no beacon.
        await advanceFrames(AURORA_SETTLE_MS - 100);
        expect(beaconOf(wrapper)).toBeUndefined();

        // Past it, the surface is admissible and the beacon says so.
        await advanceFrames(200);
        expect(beaconOf(wrapper)).toBe("");
    });

    it("RE-OPENS on a config change and re-stamps one entrance later", async () => {
        const wrapper = await mountArmedAurora({ ...DEFAULT_AURORA_CONFIG });
        await advanceFrames(AURORA_SETTLE_MS + 100);
        expect(beaconOf(wrapper)).toBe("");

        // A preset switch has its OWN entrance — the beacon closes with the old field.
        await wrapper.setProps({
            config: { ...DEFAULT_AURORA_CONFIG, medium: "oil" },
        });
        await nextTick();
        expect(beaconOf(wrapper)).toBeUndefined();
        expect(lastRuntime().configs).toHaveLength(2);

        await advanceFrames(AURORA_SETTLE_MS - 100);
        expect(beaconOf(wrapper)).toBeUndefined();
        await advanceFrames(200);
        expect(beaconOf(wrapper)).toBe("");
    });

    it("never carries a stamp across a loss→restore replay of the entrance", async () => {
        const wrapper = await mountArmedAurora({ ...DEFAULT_AURORA_CONFIG });
        await advanceFrames(AURORA_SETTLE_MS + 100);
        expect(beaconOf(wrapper)).toBe("");

        // Context LOSS: `createGpuSubstrate` publishes the pending status
        // (`emitRendererContextState("lost")`). The field it witnessed is gone.
        lastRuntime().publish({
            phase: "initializing",
            engine: "webgpu",
            adapter: "Acquiring adapter",
        });
        await nextTick();
        expect(beaconOf(wrapper)).toBeUndefined();

        // RESTORE replays the entrance — `isArmed` re-arms and the crossfade re-runs —
        // so the beacon must stay absent THROUGH the replay, not resume its old stamp.
        lastRuntime().publish({
            phase: "ready",
            engine: "webgpu",
            adapter: "Hardware adapter",
        });
        await nextTick();
        expect(beaconOf(wrapper)).toBeUndefined();
        await advanceFrames(AURORA_SETTLE_MS - 100);
        expect(beaconOf(wrapper)).toBeUndefined();

        await advanceFrames(200);
        expect(beaconOf(wrapper)).toBe("");
    });
});

describe("GF-AURORA W0 · the probe surface", () => {
    it("strikes the NucleiOverlay medium coupling outright", () => {
        // The overlay stepped opacity 35→70 on `medium === "smooth"`, so the measured
        // surface moved with the variable under test. There is no affordance ground for
        // it: the rings label the composition, and the composition does not change with
        // the deposition body. The prop is GONE, not defaulted.
        expect(NucleiOverlay.props ?? {}).not.toHaveProperty("dimmed");
        const stageSrc = repoFile("demo/stories/substrates/aurora/AuroraStage.vue");
        expect(stageSrc).not.toContain("dimmed");
    });

    it("clears every chrome layer painted OVER the stage under ?probe=1", async () => {
        const wrapper = shallowMount(AuroraStage, {
            props: { config: DEFAULT_AURORA_CONFIG },
        });
        const overStage = () => [
            wrapper.findComponent(NucleiOverlay).exists(),
            wrapper.findComponent({ name: "RendererStatusView" }).exists(),
        ];

        expect(overStage()).toEqual([true, true]);

        await wrapper.setProps({ probe: true });

        expect(overStage()).toEqual([false, false]);
        expect(wrapper.text()).not.toContain("move to shape the field");
        // The canvas itself is untouched — the probe removes observers, never the subject.
        expect(wrapper.findComponent(Aurora).exists()).toBe(true);
    });

    it("forces the WebGL2 arm in-app rather than pretending with a flag", async () => {
        const wrapper = shallowMount(AuroraStage, {
            props: { config: DEFAULT_AURORA_CONFIG, engine: "webgl2" },
        });
        expect(wrapper.findComponent(Aurora).props("runtimeOptions")).toMatchObject({
            forceBackend: "webgl2",
        });
        await wrapper.setProps({ engine: undefined });
        expect(
            wrapper.findComponent(Aurora).props("runtimeOptions")?.forceBackend,
        ).toBeUndefined();
    });

    it("seats the forced medium BEFORE the config dock seeds its atoms", () => {
        // The stale-combobox defect was pure ORDER: the story wrote the medium in
        // `onMounted`, which runs AFTER the child's `setup` has already frozen
        // `reactive(configToAtoms(props.config))`. Reading the param during the parent's
        // own setup makes combobox, config and shader agree by construction — no reseed
        // watcher, no second source of truth.
        const storySrc = repoFile("demo/stories/substrates/aurora.vue");
        const forcedAt = storySrc.indexOf("studio.config.medium =");
        const mountedAt = storySrc.indexOf("onMounted(");
        expect(forcedAt).toBeGreaterThan(-1);
        expect(mountedAt).toBeGreaterThan(-1);
        expect(forcedAt).toBeLessThan(mountedAt);
    });
});
