/**
 * F-ε-3 — Configurator recursion methodical reproduction fixture (M.W2 Lane A).
 *
 * Lighthouse reproducibly surfaces "Maximum recursive updates exceeded in
 * component <Configurator>" at /motion/metaballs (cf. L-audit-ε-performance.md
 * § 4, L.W6 § 5). Playwright does not. The recursion is load-timing-dependent
 * — driven by the watcher-graph / computed-side-effect ordering Vue's
 * scheduler exercises under stricter cold-load discipline.
 *
 * The fixture below mirrors the metaballs story shape (configurator state
 * with commit-on-write clone-mode, BouncyToggle-driven motionMode computed
 * derived from cfg.speed, color-stop v-for binding directly to cfg.colors[i])
 * and exercises:
 *
 *   - N=8 preset swaps across 3 presets (sunset / cool / mono)
 *   - M=12 color-stop mutations interleaved with preset swaps
 *   - 6 setMotionMode toggles (still / drift / orbit) — exercises the
 *     motionMode computed write-back path
 *
 * Vue's scheduler emits "Maximum recursive updates exceeded" via console.warn
 * (NOT throw); the fixture hooks console.warn and asserts zero hits.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
    computed,
    createApp,
    defineComponent,
    h,
    nextTick,
    ref,
    watch,
    type App,
    type ComponentPublicInstance,
} from "vue";
import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
    useConfiguratorState,
    type ConfiguratorPreset,
} from "../src/components/custom/configurator";
import {
    DEFAULT_METABALL_CONFIG,
    type MetaballConfig,
} from "../src/components/custom/metaballs";
import { BouncyToggle } from "../src/components/custom/tabs";

// ─── Presets (mirrors demo/stories/motion/metaballs.vue) ──────────────────

const SUNSET: Required<MetaballConfig> = {
    ...DEFAULT_METABALL_CONFIG,
    blobCount: 10,
    speed: 0.1,
    threshold: 0.92,
    baseRadius: 0.15,
    orbitAmplitude: 0.24,
    colors: ["#E31937", "#FF8A3D", "#FFD166", "#4ECDC4", "#5C7AEA"],
    bgAlpha: 0.04,
    edgeSoftness: 0.38,
};

const COOL: Required<MetaballConfig> = {
    ...DEFAULT_METABALL_CONFIG,
    blobCount: 7,
    speed: 0.16,
    threshold: 0.86,
    baseRadius: 0.17,
    orbitAmplitude: 0.28,
    colors: ["#2DD4BF", "#38BDF8", "#A78BFA", "#F472B6"],
    bgAlpha: 0.12,
    edgeSoftness: 0.42,
};

const MONO: Required<MetaballConfig> = {
    ...DEFAULT_METABALL_CONFIG,
    blobCount: 12,
    speed: 0.06,
    threshold: 1.05,
    baseRadius: 0.10,
    orbitAmplitude: 0.32,
    colors: ["#0F172A", "#1E293B", "#334155", "#475569"],
    bgAlpha: 0.08,
    edgeSoftness: 0.22,
};

const PRESETS: ConfiguratorPreset<Required<MetaballConfig>>[] = [
    { key: "sunset", label: "Sunset", sub: "warm · 10 blobs", config: SUNSET },
    { key: "cool", label: "Cool", sub: "pastel · 7 blobs", config: COOL },
    { key: "mono", label: "Mono", sub: "slate · 12 blobs", config: MONO },
];

// ─── Test host mirroring demo/stories/motion/metaballs.vue ────────────────

/**
 * Mirrors the metaballs story's reactive shape *exactly* up to the
 * MetaballCanvas (we drop the WebGL substrate — happy-dom has no real
 * gl context, but the recursion is in the Configurator/Vue reactivity
 * graph above MetaballCanvas, not inside it).
 */
const MetaballConfiguratorHost = defineComponent({
    name: "MetaballConfiguratorHost",
    setup(_, { expose }) {
        const studio = useConfiguratorState<Required<MetaballConfig>>({
            presets: PRESETS,
            initialPreset: "sunset",
        });

        const cfg = studio.config;
        const activePresetKey = computed(() => studio.activePreset.value ?? "");
        const isDirtyConfig = computed(() => studio.isDirty.value);

        function commitColor(index: number, value: string) {
            if (index < 0 || index >= cfg.colors.length) return;
            cfg.colors[index] = value;
        }

        function addColor() {
            cfg.colors.push("#cccccc");
        }

        function removeColor(index: number) {
            if (cfg.colors.length <= 1) return;
            cfg.colors.splice(index, 1);
        }

        function commitSlider(field: keyof Required<MetaballConfig>, value: number) {
            (cfg as unknown as Record<string, unknown>)[field as string] = value;
        }

        const motionMode = computed<string>(() => {
            if (cfg.speed < 0.04) return "still";
            if (cfg.speed < 0.12) return "drift";
            return "orbit";
        });

        const motionOptions = [
            { label: "Still", value: "still" },
            { label: "Drift", value: "drift" },
            { label: "Orbit", value: "orbit" },
        ];

        function setMotionMode(value: string | string[]) {
            const v = Array.isArray(value) ? value[0] : value;
            switch (v) {
                case "still":
                    cfg.speed = 0.02;
                    cfg.orbitAmplitude = 0.12;
                    break;
                case "drift":
                    cfg.speed = 0.08;
                    cfg.orbitAmplitude = 0.24;
                    break;
                case "orbit":
                    cfg.speed = 0.18;
                    cfg.orbitAmplitude = 0.34;
                    break;
            }
        }

        expose({
            studio,
            cfg,
            activePresetKey,
            isDirtyConfig,
            motionMode,
            commitColor,
            addColor,
            removeColor,
            commitSlider,
            setMotionMode,
        });

        return () =>
            h(
                Configurator,
                {
                    presets: PRESETS,
                    activePreset: activePresetKey.value,
                    scrollMode: "auto",
                    onSelectPreset: studio.selectPreset,
                    onReset: studio.resetCurrent,
                },
                {
                    stage: () =>
                        h("div", { "data-testid": "stage" }, [
                            h("span", `${activePresetKey.value} · ${motionMode.value}`),
                        ]),
                    footer: () =>
                        h("div", isDirtyConfig.value ? "modified" : "preset"),
                    default: () => [
                        h(
                            ConfiguratorLayer,
                            { label: "Falloff", sub: "edgeSoftness" },
                            () =>
                                h(
                                    ConfiguratorRow,
                                    { label: "Edge softness", name: "edgeSoftness" },
                                    () => h("span", String(cfg.edgeSoftness)),
                                ),
                        ),
                        h(
                            ConfiguratorLayer,
                            { label: "Color", sub: "colors[]" },
                            () =>
                                h(
                                    ConfiguratorRow,
                                    { label: "Color stops", name: "colors[]" },
                                    () =>
                                        h(
                                            "div",
                                            { class: "flex w-full flex-col gap-2" },
                                            cfg.colors.map((color, index) =>
                                                h(
                                                    "div",
                                                    {
                                                        key: index,
                                                        class: "flex items-center gap-2",
                                                    },
                                                    [
                                                        h("input", {
                                                            type: "color",
                                                            value: color,
                                                            "aria-label": `Color stop ${index + 1}`,
                                                            onInput: (
                                                                e: Event,
                                                            ) =>
                                                                commitColor(
                                                                    index,
                                                                    (
                                                                        e.target as HTMLInputElement
                                                                    ).value,
                                                                ),
                                                        }),
                                                        h("span", color),
                                                    ],
                                                ),
                                            ),
                                        ),
                                ),
                        ),
                        h(
                            ConfiguratorLayer,
                            { label: "Motion", sub: "speed · orbitAmplitude" },
                            () =>
                                h(
                                    ConfiguratorRow,
                                    { label: "Mode", name: "motionMode" },
                                    () =>
                                        h(BouncyToggle, {
                                            options: motionOptions,
                                            modelValue: motionMode.value,
                                            "onUpdate:modelValue": setMotionMode,
                                        }),
                                ),
                        ),
                    ],
                },
            );
    },
});

// ─── Recursion capture utility ────────────────────────────────────────────

/**
 * Vue 3 emits "Maximum recursive updates exceeded" via
 * `handleError(<msg>, null, 10)` from the scheduler's `checkRecursiveUpdates`.
 * Because `instance` is `null`, `handleError` SKIPS the
 * `app.config.errorHandler` consultation entirely (runtime-core.esm-bundler.js
 * line 228-253: errorHandler is only read from `instance.appContext.config`).
 * It falls through to `logError`, which:
 *   - emits `[Vue warn]: Unhandled error during execution of app warnHandler`
 *     via `console.warn`
 *   - then **throws the message string** in dev (`throwInDev=true`)
 *
 * That async throw is what Vitest's runner reports as "Unknown Error" and
 * what fails tests under default conditions.
 *
 * The probe therefore captures via TWO channels:
 *   (a) `console.warn` interception — captures the Vue-warn preamble that
 *       fires immediately before the throw.
 *   (b) `process.on('uncaughtException')` — swallows the async throw so the
 *       test harness doesn't die, AND captures the message as a secondary
 *       confirmation signal.
 *
 * Both channels match the same regex; we de-dup by index but ANY hit is
 * considered a recursion event.
 */
interface RecursionProbe {
    readonly hits: string[];
    mount<Setup extends () => unknown>(
        component: ReturnType<typeof defineComponent>,
    ): {
        app: App;
        vm: ComponentPublicInstance & ReturnType<Setup>;
        root: HTMLDivElement;
        unmount(): void;
    };
    teardown(): void;
}

function installRecursionProbe(): RecursionProbe {
    const hits: string[] = [];
    const matcher = /Maximum recursive updates exceeded/i;
    const mounted: Array<{ app: App; root: HTMLDivElement }> = [];

    // (a) console.warn channel — Vue's logError fires "[Vue warn]: Unhandled
    //     error during execution of app warnHandler" right before throwing.
    const warnSpy = vi.spyOn(console, "warn").mockImplementation((...args) => {
        const msg = args.map((a) => String(a)).join(" ");
        if (matcher.test(msg)) hits.push(msg);
        // Squelch the noisy [Vue warn] preamble so test stderr stays readable.
    });

    // (b) unhandledRejection channel — swallows the async throw from
    //     scheduler.checkRecursiveUpdates → logError → throw err. Vue's
    //     scheduler flushes inside `Promise.resolve().then(...)`, so the
    //     throw escapes as an unhandledRejection, not an uncaughtException.
    const rejectionListener = (err: Error | string) => {
        const msg =
            typeof err === "string"
                ? err
                : (err && (err as Error).message) || String(err);
        if (matcher.test(msg)) {
            hits.push(msg);
            return; // swallow
        }
        // Re-throw genuine unhandled rejections so they're not silently
        // masked. Vitest's own listener will see this on the next tick.
        throw err;
    };
    process.prependListener("unhandledRejection", rejectionListener);
    process.prependListener("uncaughtException", rejectionListener);

    function mount<Setup extends () => unknown>(
        component: ReturnType<typeof defineComponent>,
    ) {
        const app = createApp(component);
        const root = document.createElement("div");
        document.body.appendChild(root);
        const vm = app.mount(root) as ComponentPublicInstance &
            ReturnType<Setup>;
        mounted.push({ app, root });
        return {
            app,
            vm,
            root,
            unmount: () => {
                app.unmount();
                if (root.parentNode) root.parentNode.removeChild(root);
            },
        };
    }

    function teardown() {
        process.removeListener("unhandledRejection", rejectionListener);
        process.removeListener("uncaughtException", rejectionListener);
        warnSpy.mockRestore();
        for (const { app, root } of mounted) {
            try {
                app.unmount();
            } catch {
                // ignore — may already be unmounted by the test
            }
            if (root.parentNode) root.parentNode.removeChild(root);
        }
        mounted.length = 0;
    }

    return { hits, mount, teardown };
}

/**
 * Awaits a Vue nextTick while inline-catching scheduler-thrown recursion
 * messages. The throw inside `Promise.resolve().then(flush)` surfaces on
 * the same currentFlushPromise that nextTick() returns, so awaiting it
 * inline lets us absorb the throw deterministically and feed it back into
 * `probe.hits`. Without this, a real regression would die on Vitest's
 * "Unknown Error" runner reporting instead of producing a clean
 * `expect(probe.hits).toEqual([])` failure.
 */
async function safeNextTick(probe: RecursionProbe): Promise<void> {
    try {
        await nextTick();
    } catch (err) {
        const msg =
            typeof err === "string"
                ? err
                : (err as Error)?.message ?? String(err);
        if (/Maximum recursive updates exceeded/i.test(msg)) {
            probe.hits.push(msg);
            return;
        }
        throw err;
    }
}

// ─── Tests ────────────────────────────────────────────────────────────────

type HostExpose = {
    studio: ReturnType<typeof useConfiguratorState<Required<MetaballConfig>>>;
    cfg: Required<MetaballConfig>;
    activePresetKey: { value: string };
    isDirtyConfig: { value: boolean };
    motionMode: { value: string };
    commitColor: (i: number, v: string) => void;
    addColor: () => void;
    removeColor: (i: number) => void;
    commitSlider: (
        field: keyof Required<MetaballConfig>,
        value: number,
    ) => void;
    setMotionMode: (v: string | string[]) => void;
};

describe("F-ε-3 — Configurator recursion (metaballs cold-start)", () => {
    let probe: RecursionProbe;

    beforeEach(() => {
        probe = installRecursionProbe();
    });

    afterEach(() => {
        probe.teardown();
    });

    it("does not recurse on mount (cold-start with watcher graph live)", async () => {
        const { unmount } = probe.mount(MetaballConfiguratorHost);
        await safeNextTick(probe);
        await safeNextTick(probe);
        await safeNextTick(probe);

        expect(probe.hits).toEqual([]);
        unmount();
    });

    it("does not recurse across N=8 preset swaps", async () => {
        const { vm, unmount } = probe.mount(MetaballConfiguratorHost);
        await safeNextTick(probe);

        const keys = ["cool", "mono", "sunset", "cool", "mono", "sunset", "cool", "mono"];
        for (const k of keys) {
            (vm as unknown as HostExpose).studio.selectPreset(k);
            await safeNextTick(probe);
        }

        expect(probe.hits).toEqual([]);
        unmount();
    });

    it("does not recurse across M=12 color mutations interleaved with preset swaps", async () => {
        const { vm, unmount } = probe.mount(MetaballConfiguratorHost);
        await safeNextTick(probe);
        const h = vm as unknown as HostExpose;

        const colorOps: Array<() => void> = [
            () => h.commitColor(0, "#abcdef"),
            () => h.commitColor(1, "#fedcba"),
            () => h.addColor(),
            () => h.commitColor(2, "#123456"),
            () => h.studio.selectPreset("cool"),
            () => h.commitColor(0, "#000000"),
            () => h.removeColor(0),
            () => h.studio.selectPreset("mono"),
            () => h.commitColor(3, "#ffffff"),
            () => h.addColor(),
            () => h.commitColor(4, "#deadbe"),
            () => h.studio.selectPreset("sunset"),
        ];

        for (const op of colorOps) {
            op();
            await safeNextTick(probe);
        }

        expect(probe.hits).toEqual([]);
        unmount();
    });

    it("does not recurse across setMotionMode toggles (computed write-back path)", async () => {
        const { vm, unmount } = probe.mount(MetaballConfiguratorHost);
        await safeNextTick(probe);
        const h = vm as unknown as HostExpose;

        const modes = ["still", "drift", "orbit", "still", "drift", "orbit"];
        for (const m of modes) {
            h.setMotionMode(m);
            await safeNextTick(probe);
        }

        expect(probe.hits).toEqual([]);
        unmount();
    });

    it("does not recurse under a flush-stress cold-start (synchronous burst + microtask drain)", async () => {
        // Lighthouse-shaped: mount and immediately drive a burst of mutations
        // BEFORE the scheduler has a chance to drain its initial flush. This
        // forces Vue's scheduler to interleave the watcher graph with new
        // mutations — the precise condition Lighthouse's network-idle gate
        // exposes that Playwright's first-paint exit does not.
        const { vm, unmount } = probe.mount(MetaballConfiguratorHost);
        const h = vm as unknown as HostExpose;

        // Burst before any flush — no `await nextTick()` between ops.
        h.studio.selectPreset("cool");
        h.studio.selectPreset("mono");
        h.commitColor(0, "#deadbe");
        h.setMotionMode("orbit");
        h.studio.selectPreset("sunset");
        h.setMotionMode("still");
        h.commitColor(1, "#cafe00");
        h.studio.selectPreset("cool");

        // Drain the scheduler.
        await safeNextTick(probe);
        await safeNextTick(probe);
        await safeNextTick(probe);

        expect(probe.hits).toEqual([]);
        unmount();
    });
});

// ─── Sanity: the probe itself fires on a known-recursive component ───────

/**
 * Meta-check: the probe must actually trip when a true recursion is wired.
 * Without this, a passing test set above could be a silent false negative.
 */
describe("F-ε-3 probe self-test", () => {
    let probe: RecursionProbe;

    beforeEach(() => {
        probe = installRecursionProbe();
    });

    afterEach(() => {
        probe.teardown();
    });

    it("captures a known watcher write-feedback recursion", async () => {
        const Bumper = defineComponent({
            name: "Bumper",
            setup(_, { expose }) {
                const a = ref(0);
                const b = ref(0);
                watch(a, () => {
                    b.value = b.value + 1;
                });
                watch(b, () => {
                    a.value = a.value + 1;
                });
                expose({ kick: () => (a.value = a.value + 1) });
                return () => h("div", `${a.value}/${b.value}`);
            },
        });

        const { vm, unmount } = probe.mount(Bumper);
        (vm as unknown as { kick: () => void }).kick();
        await safeNextTick(probe);

        expect(probe.hits.length).toBeGreaterThan(0);
        unmount();
    });
});
