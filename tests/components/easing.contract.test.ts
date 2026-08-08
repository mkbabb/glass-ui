import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import EasingCurve from "@glass/components/easing/EasingCurve.vue";
import EasingPicker from "@glass/components/easing/EasingPicker.vue";
import {
    COPY_ATTEMPT_TIMEOUT_MS,
    FRAME_MAX,
    FRAME_MIN,
    HANDLE_HIT_RADIUS_PX,
    HANDLE_HIT_RADIUS_TOUCH_PX,
    STEP_COUNT_MAX,
    VIEW_BOX,
} from "@glass/components/easing/constants";
import type { EasingPickerValue } from "@glass/components/easing/usePicker";
import { bezierPresets } from "@mkbabb/value.js/easing";

const EASING_DIR = resolve(__dirname, "../../src/components/easing");
const source = (file: string): string => readFileSync(resolve(EASING_DIR, file), "utf-8");
const LANE_FILES = readdirSync(EASING_DIR);
const LANE_SOURCE = LANE_FILES.map(source).join("\n");

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");

function setClipboard(value: Pick<Clipboard, "writeText"> | undefined) {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value });
}

function mountPicker() {
    return mount(EasingPicker, { attachTo: document.body });
}

const curve = (overrides: Partial<EasingPickerValue> = {}): EasingPickerValue => ({
    mode: "bezier",
    css: "cubic-bezier(0.2, 0.3, 0.8, 0.9)",
    fn: (t: number) => t,
    points: [0.2, 0.3, 0.8, 0.9] as const,
    steps: 4,
    term: "jump-end",
    ...overrides,
});

/** Every `stroke-width` the lane paints, as authored. */
function strokeWidths(html: string): string[] {
    return [...html.matchAll(/stroke-width="([^"]+)"/g)].map((m) => m[1]!);
}

afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    if (clipboardDescriptor)
        Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
    else Reflect.deleteProperty(navigator, "clipboard");
    document.body.innerHTML = "";
});

describe("EasingPicker product contract", () => {
    it("hydrates and replaces the complete authored value without remounting or echo churn", async () => {
        const updates: EasingPickerValue[] = [];
        const wrapper = mount(EasingPicker, {
            attachTo: document.body,
            props: {
                modelValue: curve(),
                "onUpdate:modelValue": (value) => {
                    if (value) updates.push(value);
                },
            },
        });

        expect(wrapper.get("code").text()).toBe("cubic-bezier(0.2, 0.3, 0.8, 0.9)");
        expect(updates).toHaveLength(1);
        const canonical = updates[0]!;
        await wrapper.setProps({ modelValue: canonical });
        expect(updates).toHaveLength(1);

        await wrapper.setProps({
            modelValue: curve({
                mode: "steps",
                css: "steps(7, jump-start)",
                steps: 7,
                term: "jump-start",
            }),
        });
        expect(wrapper.attributes("data-mode")).toBe("steps");
        expect(wrapper.get("code").text()).toBe("steps(7, jump-start)");
        expect(updates).toHaveLength(2);

        await wrapper.setProps({
            modelValue: curve({
                points: [0.1, -0.2, 0.9, 1.2],
                css: "cubic-bezier(0.1, -0.2, 0.9, 1.2)",
            }),
        });
        expect(wrapper.attributes("data-mode")).toBe("bezier");
        expect(wrapper.get("code").text()).toBe("cubic-bezier(0.1, -0.2, 0.9, 1.2)");
        expect(updates).toHaveLength(3);
        wrapper.unmount();
    });

    it("normalizes externally supplied authoring bounds before writing them back", () => {
        const updates: EasingPickerValue[] = [];
        const wrapper = mount(EasingPicker, {
            attachTo: document.body,
            props: {
                modelValue: curve({
                    points: [-2, 10, 2, -10] as const,
                    steps: 99,
                    term: "unknown" as EasingPickerValue["term"],
                }),
                "onUpdate:modelValue": (value) => {
                    if (value) updates.push(value);
                },
            },
        });

        expect(wrapper.get("code").text()).toBe("cubic-bezier(0, 1.6, 1, -0.6)");
        expect(updates).toHaveLength(1);
        expect(updates[0]).toMatchObject({
            points: [0, 1.6, 1, -0.6],
            steps: 12,
            term: "jump-end",
        });
        wrapper.unmount();
    });

    it("normalizes an out-of-band `initial` through the same clamp the pointer uses", () => {
        const wrapper = mount(EasingPicker, {
            attachTo: document.body,
            props: { initial: { points: [-2, 10, 2, -10] } },
        });
        expect(wrapper.get("code").text()).toBe("cubic-bezier(0, 1.6, 1, -0.6)");
        wrapper.unmount();
    });

    it("exposes two named keyboard sliders on the y band that update the authored literal", async () => {
        const wrapper = mountPicker();

        const handles = wrapper.findAll('[role="slider"]');
        expect(handles).toHaveLength(2);
        expect(handles[0]!.attributes("aria-label")).toBe("Bezier control point 1");
        // The control is two-dimensional; `aria-valuenow` keys the Y band the
        // instructions already speak (-0.6 … 1.6), not a bare 0…1 x reading.
        expect(handles[0]!.attributes("aria-valuemin")).toBe("-0.6");
        expect(handles[0]!.attributes("aria-valuemax")).toBe("1.6");
        expect(handles[0]!.attributes("aria-valuetext")).toMatch(/^x .* y /);

        const before = wrapper.get("code").text();
        await handles[0]!.trigger("keydown", { key: "ArrowRight" });
        expect(wrapper.get("code").text()).not.toBe(before);
        expect(handles[0]!.attributes("aria-valuetext")).toContain("x 0.185");

        await handles[0]!.trigger("keydown", { key: "Home" });
        expect(handles[0]!.attributes("aria-valuetext")).toContain("x 0.000");
        await handles[1]!.trigger("keydown", { key: "End" });
        expect(handles[1]!.attributes("aria-valuetext")).toContain("x 1.000");

        // PageUp/PageDown are the coarse step on the value axis.
        const y = Number(handles[0]!.attributes("aria-valuenow"));
        await handles[0]!.trigger("keydown", { key: "PageUp" });
        expect(Number(handles[0]!.attributes("aria-valuenow"))).toBeCloseTo(y + 0.25, 3);
        wrapper.unmount();
    });

    it("shows pending and copied states, then cancels the reset timer on unmount", async () => {
        vi.useFakeTimers();
        let resolveCopy!: () => void;
        const writeText = vi.fn(
            () =>
                new Promise<void>((resolve) => {
                    resolveCopy = resolve;
                }),
        );
        setClipboard({ writeText });
        const wrapper = mountPicker();

        await wrapper.get('[data-slot="easing-picker"] code').trigger("click");
        expect(wrapper.attributes("data-copy-state")).toBe("pending");
        expect(wrapper.get('[data-slot="easing-copy-status"]').text()).toContain(
            "Copying",
        );
        resolveCopy();
        await flushPromises();
        expect(writeText).toHaveBeenCalledWith(wrapper.get("code").text());
        expect(wrapper.attributes("data-copy-state")).toBe("copied");
        expect(wrapper.get('[data-slot="easing-copy-status"]').text()).toContain(
            "Copied",
        );

        wrapper.unmount();
        expect(vi.getTimerCount()).toBe(0);
    });

    it("turns missing Clipboard into visible failure with the full manual-selection path", async () => {
        setClipboard(undefined);
        const wrapper = mountPicker();
        await wrapper.get('[data-slot="easing-picker"] code').trigger("click");
        await flushPromises();

        expect(wrapper.attributes("data-copy-state")).toBe("failed");
        expect(wrapper.get('[data-slot="easing-copy-status"]').text()).toContain(
            "Clipboard unavailable",
        );
        const manual = wrapper
            .findAll("button")
            .find((b) => b.text().includes("Select literal"));
        expect(manual).toBeDefined();
        await manual!.trigger("click");
        expect(window.getSelection()?.toString()).toBe(wrapper.get("code").text());
        wrapper.unmount();
    });

    it("turns Clipboard denial into failure and lets the same action retry", async () => {
        const denied = vi
            .fn()
            .mockRejectedValue(new DOMException("Denied", "NotAllowedError"));
        setClipboard({ writeText: denied });
        const wrapper = mountPicker();
        const chip = wrapper.get('[data-slot="easing-picker"] code');
        await chip.trigger("click");
        await flushPromises();
        expect(wrapper.attributes("data-copy-state")).toBe("failed");
        expect(
            wrapper
                .findAll("button")
                .some((b) => (b.attributes("aria-label") || "").includes("Retry")),
        ).toBe(true);

        const allowed = vi.fn().mockResolvedValue(undefined);
        setClipboard({ writeText: allowed });
        await chip.trigger("click");
        await flushPromises();
        expect(wrapper.attributes("data-copy-state")).toBe("copied");
        expect(allowed).toHaveBeenCalledOnce();
        wrapper.unmount();
    });

    it("times out a stalled Clipboard write and keeps retry and unmount timer-safe", async () => {
        vi.useFakeTimers();
        let resolveStalled!: () => void;
        const writeText = vi
            .fn()
            .mockImplementationOnce(
                () =>
                    new Promise<void>((resolve) => {
                        resolveStalled = resolve;
                    }),
            )
            .mockResolvedValueOnce(undefined);
        setClipboard({ writeText });
        const wrapper = mountPicker();
        const chip = wrapper.get('[data-slot="easing-picker"] code');

        await chip.trigger("click");
        expect(wrapper.attributes("data-copy-state")).toBe("pending");
        await vi.advanceTimersByTimeAsync(COPY_ATTEMPT_TIMEOUT_MS);
        expect(wrapper.attributes("data-copy-state")).toBe("failed");

        await chip.trigger("click");
        await flushPromises();
        expect(wrapper.attributes("data-copy-state")).toBe("copied");
        resolveStalled();
        await flushPromises();
        expect(wrapper.attributes("data-copy-state")).toBe("copied");

        wrapper.unmount();
        expect(vi.getTimerCount()).toBe(0);
    });

    it("owns truthful transport state and completes immediately when PRM flips on", async () => {
        const reducedMotionListeners: Array<(event: { matches: boolean }) => void> = [];
        const mediaQuery = {
            matches: false,
            addEventListener: vi.fn(
                (_type: string, listener: (event: { matches: boolean }) => void) => {
                    reducedMotionListeners.push(listener);
                },
            ),
            removeEventListener: vi.fn(),
        };
        vi.stubGlobal(
            "matchMedia",
            vi.fn(() => mediaQuery),
        );

        let nextFrame = 0;
        const frames = new Map<number, FrameRequestCallback>();
        vi.stubGlobal(
            "requestAnimationFrame",
            vi.fn((callback: FrameRequestCallback) => {
                const id = ++nextFrame;
                frames.set(id, callback);
                return id;
            }),
        );
        vi.stubGlobal(
            "cancelAnimationFrame",
            vi.fn((id: number) => frames.delete(id)),
        );
        vi.spyOn(performance, "now").mockReturnValue(0);

        const wrapper = mountPicker();
        const transport = () =>
            wrapper.findAll("button").find((b) => /Preview|Cancel|Replay/.test(b.text()))!;

        expect(transport().text()).toContain("Preview");
        await transport().trigger("click");
        expect(wrapper.attributes("data-playback-state")).toBe("playing");
        expect(transport().text()).toContain("Cancel");

        // The SAME control cancels; a stale frame after it may not resurrect the run.
        const staleFrame = [...frames.values()][0]!;
        await transport().trigger("click");
        expect(wrapper.attributes("data-playback-state")).toBe("idle");
        staleFrame(600);
        expect(frames.size).toBe(0);

        await transport().trigger("click");
        const [finalId, finalFrame] = [...frames.entries()][0]!;
        frames.delete(finalId);
        finalFrame(1200);
        await wrapper.vm.$nextTick();
        expect(wrapper.attributes("data-playback-state")).toBe("complete");
        expect(transport().text()).toContain("Replay");

        await transport().trigger("click");
        for (const listener of reducedMotionListeners) listener({ matches: true });
        await wrapper.vm.$nextTick();
        expect(wrapper.attributes("data-playback-state")).toBe("complete");
        expect(wrapper.attributes("data-reduced-motion")).toBe("");
        expect(frames.size).toBe(0);
        expect(transport().text()).toContain("Replay");

        wrapper.unmount();
        expect(mediaQuery.removeEventListener).not.toHaveBeenCalled();
    });

    it("stays idle under initial PRM and completes only after a requested preview", async () => {
        const mediaQuery = {
            matches: true,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        };
        vi.stubGlobal(
            "matchMedia",
            vi.fn(() => mediaQuery),
        );
        const requestFrame = vi.fn();
        vi.stubGlobal("requestAnimationFrame", requestFrame);

        const wrapper = mountPicker();
        expect(wrapper.attributes("data-playback-state")).toBe("idle");
        expect(wrapper.find('[data-slot="easing-curve-travel"]').exists()).toBe(false);

        const transport = wrapper
            .findAll("button")
            .find((b) => b.text().includes("Preview"))!;
        await transport.trigger("click");
        expect(wrapper.attributes("data-playback-state")).toBe("complete");
        expect(wrapper.find('[data-slot="easing-curve-travel"]').exists()).toBe(true);
        expect(requestFrame).not.toHaveBeenCalled();
        wrapper.unmount();
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// BK #85 W-EASING — the lane's close battery.
//
// CWT-3 §LANE easing §5 minted ELEVEN and TERMINAL-ROSTER #85 folds them to ≤7:
// G-E2 into G-E1 (frame and geometry are one invariant), G-E3+G-E4 into one
// VOID+CEL row, and — to reach the ruled count rather than the spec's own
// arithmetic, which stops at eight — G-E7+G-E8 into G-E6, all three being halves of
// the ONE disposition (§1 "KEEP + SPLIT ON ADDRESSABILITY"). No clause was dropped
// to hit the number; each still fails on its own.
//
// These are close-battery rows per CWT-3 §5's ruling (per-lane born-RED gates are
// acceptance rows, not standing roster seats), so the 60-seat register is untouched.
// ─────────────────────────────────────────────────────────────────────────────

describe("G-E1 FRAME — the frame is a constant, and nothing scales with it", () => {
    it("holds one viewBox across mode, value, and a full drag to the overshoot ceiling", async () => {
        const wrapper = mountPicker();
        const read = () => wrapper.get('[data-slot="easing-curve"] svg').attributes("viewBox");

        const atRest = read();
        expect(atRest).toBe(VIEW_BOX);
        expect(atRest).toBe("-0.1 -0.1 1.2 1.2");

        await wrapper.setProps({
            modelValue: curve({ mode: "steps", css: "steps(9, jump-both)", steps: 9, term: "jump-both" }),
        });
        expect(read()).toBe(atRest);

        await wrapper.setProps({
            modelValue: curve({ points: [0, 1.6, 1, 1.6], css: "cubic-bezier(0, 1.6, 1, 1.6)" }),
        });
        expect(read()).toBe(atRest);
        wrapper.unmount();
    });

    it("keeps no fitted-viewBox machinery and no frame-scaled chrome anywhere in the lane", () => {
        // The fit solved a bounds box per edit and every chrome dimension was
        // expressed in the units it moved.
        expect(LANE_SOURCE).not.toContain("VIEWBOX_FIT_SAMPLES");
        expect(LANE_SOURCE).not.toContain("canvasViewBox");
        expect(source("usePicker.ts")).not.toMatch(/const viewBox = computed/);
        // SVG-space type is gone with it.
        expect(LANE_SOURCE).not.toMatch(/font-size:\s*0\.0/);
    });

    it("reports the excursion instead of cropping it, and moves no dimension doing so", async () => {
        const wrapper = mountPicker();
        const box = () => wrapper.get('[data-slot="easing-curve"] svg').attributes("viewBox");
        const restBox = box();
        expect(wrapper.attributes("data-curve-clipped")).toBeUndefined();

        // Both handles at 1.6: the exact interior maximum is 1.3692 at t = 0.6202,
        // past the frame's 1.1 top.
        await wrapper.setProps({
            modelValue: curve({ points: [0, 1.6, 1, 1.6], css: "cubic-bezier(0, 1.6, 1, 1.6)" }),
        });
        expect(wrapper.attributes("data-curve-clipped")).toBe("");
        expect(wrapper.get('[data-slot="easing-curve"]').attributes("data-clipped")).toBe("");
        expect(box()).toBe(restBox);

        // ONE handle at 1.6 never leaves the frame — its interior maximum is 0.756,
        // under the endpoint's 1.0. A threshold that fired here would be a lie.
        await wrapper.setProps({
            modelValue: curve({ points: [0, 1.6, 1, 0], css: "cubic-bezier(0, 1.6, 1, 0)" }),
        });
        expect(wrapper.attributes("data-curve-clipped")).toBeUndefined();

        // At exactly y = 1.2 the maximum is 1.099 — inside. The threshold is solved,
        // not guessed at 1.15.
        await wrapper.setProps({
            modelValue: curve({ points: [0, 1.2, 1, 1.2], css: "cubic-bezier(0, 1.2, 1, 1.2)" }),
        });
        expect(wrapper.attributes("data-curve-clipped")).toBeUndefined();
        wrapper.unmount();
    });

    it("pins only the handles that genuinely cross the frame, across the whole catalogue", async () => {
        const wrapper = mountPicker();
        const pinned = (): boolean[] =>
            wrapper
                .findAll('[data-slot="easing-handles"] [role="slider"]')
                .map((handle) => handle.attributes("data-pinned") !== undefined);

        // The frame is square and SVG-Y is the flip of curve-Y, so one predicate
        // serves both handles: a control point is OUT when either axis leaves
        // [FRAME_MIN, FRAME_MAX] after the flip.
        const outside = (x: number, y: number): boolean =>
            x < FRAME_MIN || x > FRAME_MAX || 1 - y < FRAME_MIN || 1 - y > FRAME_MAX;

        // `pinToFrame` used to RECONSTRUCT an unpinned handle as
        // `anchor + (handle − anchor) × 1` — the identity in exact arithmetic and NOT
        // the identity in binary floating point. `data-pinned` compares the two for
        // equality, so a 5.55e-17 residue painted the pinned state on EIGHT of
        // value.js's thirty presets, every one of them strictly inside the frame
        // (ease-out-quad, -quart, -quint, -expo, -circ; ease-in-out-quart, -quint,
        // -circ). A marker that fires on curves that cross nothing marks nothing.
        for (const [name, preset] of Object.entries(bezierPresets)) {
            const [x1, y1, x2, y2] = preset as unknown as [number, number, number, number];
            await wrapper.setProps({
                modelValue: curve({
                    points: [x1, y1, x2, y2],
                    css: `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`,
                }),
            });
            expect(
                pinned(),
                `${name} → cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`,
            ).toEqual([outside(x1, y1), outside(x2, y2)]);
        }

        // The control: a quad authored genuinely past the frame in BOTH handles still
        // reports it, so the clause above is an absence with a positive twin.
        await wrapper.setProps({
            modelValue: curve({
                points: [0.2, 1.6, 0.8, -0.6],
                css: "cubic-bezier(0.2, 1.6, 0.8, -0.6)",
            }),
        });
        expect(pinned()).toEqual([true, true]);
        wrapper.unmount();
    });
});

describe("G-E3 VOID+CEL — one column, one plot, a canvas that tracks its container", () => {
    it("mounts one grid track and no fixed canvas box", () => {
        const picker = source("EasingPicker.vue");
        const display = source("EasingCurve.vue");
        // The two-panel `lg:` fork and the inert container query died together.
        expect(picker).not.toContain("lg:grid-cols-");
        expect(LANE_SOURCE).not.toContain("38cqi");
        expect(LANE_SOURCE).not.toMatch(/block-size:\s*clamp/);
        // Sizing is overridable CSS, never an inline style with a 1000-specificity tax.
        expect(display).not.toMatch(/style="[^"]*aspect-ratio/);
        expect(display).toContain("aspect-square");
        expect(display).toContain("w-full");
        // `aspect-ratio: 1` is true only because the block axis is no longer
        // definite AND nothing reads a container unit. A `container-type` with zero
        // queries against it would be the same dead declaration `38cqi` already was.
        expect(LANE_SOURCE).not.toContain("container-type");
        expect(LANE_SOURCE).not.toContain("@container");
        // The plot carries no definite block axis of its own — the unit rect
        // inside the frame is geometry, not a box the element is sized by.
        expect(display).not.toContain("block-size");
        expect(display).not.toMatch(/<svg[^>]*height=/);
    });

    it("renders exactly one plot and one editor on the consumer route", () => {
        const wrapper = mountPicker();
        expect(wrapper.findAll('[data-slot="easing-curve"]')).toHaveLength(1);
        wrapper.unmount();

        const story = readFileSync(
            resolve(__dirname, "../../demo/stories/motion/curve-gallery.vue"),
            "utf-8",
        );
        expect([...story.matchAll(/<EasingPicker[\s/>]/g)]).toHaveLength(1);
    });
});

describe("G-E5 TOUCH — the hit target is in pixels and clears the coarse floor", () => {
    it("floors every handle at a 44px diameter and keeps no user-unit radius", () => {
        expect(HANDLE_HIT_RADIUS_PX * 2).toBeGreaterThanOrEqual(44);
        expect(HANDLE_HIT_RADIUS_TOUCH_PX * 2).toBeGreaterThanOrEqual(44);
        // A user-unit radius is a function of the frame: 0.15 user units measured
        // 40.7px at the small clamp, under the 44px floor, and nothing said so.
        expect(LANE_SOURCE).not.toMatch(/HANDLE_HIT_RADIUS(_TOUCH)?\s*=\s*0\./);
        // The test happens in client pixels against the painted pin.
        expect(source("EasingPicker.vue")).toContain("ev.clientX");
    });
});

describe("G-E6 SPLIT — the display unit is addressable and the vacuous register is gone", () => {
    it("publishes EasingCurve on the subpath", () => {
        expect(source("index.ts")).toContain("EasingCurve");
        expect(existsSync(resolve(EASING_DIR, "EasingCurve.vue"))).toBe(true);
    });

    it("constructs the staircase instead of sampling it, at every count", async () => {
        // THE REASON THE STROKE CARRIES `d` AND NOT `fn`. A display unit handed a
        // callable can only SAMPLE it, and the sampled staircase is the defect this
        // split exists to retire: 241 `L` commands that still could not draw a crisp
        // riser, because a riser is a discontinuity and sampling has no way to say so.
        // Three clauses, and the 241-command polyline fails all three.
        const wrapper = mountPicker();
        const inkD = (): string =>
            wrapper
                .get('[data-slot="easing-curve-stroke"][data-tone="ink"]')
                .attributes("d")!;

        for (const n of [1, 2, 5, STEP_COUNT_MAX]) {
            await wrapper.setProps({
                modelValue: curve({
                    mode: "steps",
                    css: `steps(${n}, jump-end)`,
                    steps: n,
                }),
            });
            const d = inkD();
            const commands = d.match(/[A-Za-z]/g) ?? [];

            // (1) A move, treads and risers — nothing else, and no curve segment.
            for (const command of commands)
                expect(["M", "H", "V"], `steps(${n}) draws "${command}" in "${d}"`)
                    .toContain(command);

            // (2) The budget is 2n+1 — 25 at the shipped maximum of 12.
            expect(
                commands.length,
                `steps(${n}) costs ${commands.length} commands, budget ${2 * n + 1}`,
            ).toBeLessThanOrEqual(2 * n + 1);

            // (3) The tread edges ARE the sequence i/n, exactly, at the path's own
            // four-decimal plot precision — the claim a sampled path cannot make at
            // any density, which is the whole argument.
            const treads = [...d.matchAll(/H\s+([-\d.]+)/g)].map((m) => Number(m[1]));
            expect(treads, `steps(${n}) risers sit on i/${n}, in order`).toEqual(
                Array.from({ length: n }, (_, i) => +((i + 1) / n).toFixed(4)),
            );
        }

        expect(
            (inkD().match(/[A-Za-z]/g) ?? []).length,
            "the shipped ceiling is 25 commands at STEP_COUNT_MAX",
        ).toBeLessThanOrEqual(25);
        wrapper.unmount();
    });

    it("mounts the display unit with zero interactive descendants and zero composables", () => {
        const wrapper = mount(EasingCurve, {
            attachTo: document.body,
            props: { strokes: [{ d: "M 0 1 C 0.2 0.9, 0.8 0.1, 1 0", tone: "ink" }] },
        });
        expect(wrapper.find("svg[role='img']").exists()).toBe(true);
        expect(wrapper.findAll("button, input, select, textarea, a[href]")).toHaveLength(0);
        expect(wrapper.findAll("[tabindex], [role='slider']")).toHaveLength(0);
        expect(source("EasingCurve.vue")).not.toMatch(/\buse[A-Z]\w*\(/);
        wrapper.unmount();
    });

    it("leaves no configurator on disk, in the barrel, or in any importer", () => {
        expect(existsSync(resolve(EASING_DIR, "EasingConfigurator.vue"))).toBe(false);
        expect(existsSync(resolve(EASING_DIR, "composables"))).toBe(false);
        expect(source("index.ts")).not.toContain("EasingConfigurator");
        for (const dir of ["src", "demo"]) {
            const hits = grepTree(resolve(__dirname, "../..", dir), "EasingConfigurator");
            expect(hits, `${dir}/ still names the deleted register: ${hits.join(", ")}`)
                .toHaveLength(0);
        }
    });

    it("prints the literal exactly once in the rendered editor", () => {
        const wrapper = mountPicker();
        const literal = wrapper.get("code").text();
        const printed = wrapper.html().split(literal).length - 1;
        expect(printed, `the literal "${literal}" is printed ${printed}×`).toBe(1);
        wrapper.unmount();
    });

    it("never leaves the preset control without an entry to render", async () => {
        const wrapper = mountPicker();
        expect(wrapper.attributes("data-preset")).toBe("ease-out-back");
        expect(Object.keys(bezierPresets)).toContain("ease-out-back");

        // Every edit writes `custom`, which is NOT one of value.js's catalogue keys —
        // so without a locally minted entry the control renders its placeholder while
        // a curve is loaded, which is the whole defect.
        await wrapper.get('[role="slider"]').trigger("keydown", { key: "ArrowRight" });
        expect(wrapper.attributes("data-preset")).toBe("custom");
        expect(Object.keys(bezierPresets)).not.toContain("custom");
        expect(source("EasingPicker.vue")).toMatch(
            /<SelectItem\s+v-if="preset === CUSTOM_PRESET"/,
        );
        wrapper.unmount();
    });
});

describe("G-E9 STROKE+FOCUS — whole-pixel ink, and an indicator on every focusable", () => {
    it("draws every stroke on the {1,2,3} px ladder with non-scaling ink", () => {
        const wrapper = mountPicker();
        const html = wrapper.html();
        const widths = strokeWidths(html);
        expect(widths.length).toBeGreaterThan(0);
        for (const w of widths) expect(["1", "2", "3"]).toContain(w);
        // Every stroked node opts out of the frame's scale.
        const stroked = [...html.matchAll(/<(?:path|line|rect|circle)\b[^>]*stroke-width="[^"]*"[^>]*>/g)];
        for (const [tag] of stroked) expect(tag).toContain("non-scaling-stroke");
        wrapper.unmount();
    });

    it("authors no raw focusable, and rings the ones it does author", () => {
        const wrapper = mountPicker();
        // The lane's OWN focusables are the two handles; everything else is a library
        // control that ships its own indicator and is not this lane's to re-decorate.
        const own = wrapper.findAll('[data-slot="easing-handles"] [tabindex="0"]');
        expect(own.length).toBe(2);
        for (const el of own) {
            expect(
                el.classes().includes("focus-ring"),
                `a lane-authored focusable carries no indicator: ${el.html().slice(0, 120)}`,
            ).toBe(true);
        }
        wrapper.unmount();
        // The raw ringless copy button is gone with the three focus grammars.
        expect(LANE_SOURCE).not.toContain("focus:outline-none");
        expect(LANE_SOURCE).not.toMatch(/<button[\s>]/);
    });

    it("inks a new curve ON, and never arms the sweep under reduced motion", async () => {
        const frames: FrameRequestCallback[] = [];
        vi.stubGlobal(
            "requestAnimationFrame",
            vi.fn((callback: FrameRequestCallback) => frames.push(callback)),
        );
        vi.stubGlobal("cancelAnimationFrame", vi.fn());

        const wrapper = mountPicker();
        const ink = () =>
            wrapper.get('[data-slot="easing-curve-stroke"][data-tone="ink"]');
        // A plot merely SHOWN is shown finished — the sweep answers an arrival.
        expect(wrapper.attributes("data-drawing")).toBeUndefined();
        expect(ink().classes()).toContain("[clip-path:inset(-60%_-2%_-60%_-2%)]");

        await wrapper.setProps({
            modelValue: curve({ mode: "steps", css: "steps(6, jump-end)", steps: 6 }),
        });
        expect(wrapper.attributes("data-drawing")).toBe("");
        expect(ink().classes()).toContain("[clip-path:inset(-60%_104%_-60%_-2%)]");
        // The UN-draw is instant; only the DRAW carries the clock.
        expect(ink().classes()).toContain("duration-0");
        // The GHOST is the other reading held back; a ghost that swept itself in
        // would be announcing something it is deliberately not saying.
        const ghost = wrapper
            .get('[data-slot="easing-curve-stroke"][data-tone="ghost"]')
            .classes()
            .join(" ");
        expect(ghost).not.toContain("[clip-path:");
        // …and it carries no CLOCK either: a transition-property on an element with
        // nothing to interpolate is the dead declaration this lane refused a
        // `container-type` for.
        expect(ghost).not.toContain("transition-");
        // The dashoffset arm is REFUSED on measurement, not on taste: every stroke in
        // this lane carries `vector-effect`, and Chrome does not gate the paint by
        // `stroke-dashoffset` under it (§11). A dead mechanism is worse than none.
        expect(source("EasingCurve.vue")).not.toMatch(/\[stroke-dashoffset:/);
        expect(source("EasingCurve.vue")).not.toMatch(/^\s*pathLength=/m);

        // The un-drawn state must survive a PAINT before the drawn one replaces it —
        // two frames, and the second one is the mechanism, not padding.
        const first = frames.splice(0);
        expect(first, "the sweep is armed on the frame the curve changes").toHaveLength(1);
        first[0]!(0);
        expect(
            wrapper.attributes("data-drawing"),
            "one frame in, the plot is still UN-drawn — a transition needs a committed state to sweep from",
        ).toBe("");

        for (const frame of frames.splice(0)) frame(0);
        await wrapper.vm.$nextTick();
        expect(wrapper.attributes("data-drawing")).toBeUndefined();
        expect(ink().classes()).toContain("[clip-path:inset(-60%_-2%_-60%_-2%)]");
        expect(ink().classes()).toContain("duration-slow");
        wrapper.unmount();

        // PRM is ONE FRAME, not a fast sweep: nothing is armed, so no un-drawn state
        // is ever rendered and no travel frame is ever requested for it.
        vi.stubGlobal(
            "matchMedia",
            vi.fn(() => ({
                matches: true,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            })),
        );
        const reduced = mountPicker();
        const requested = frames.length;
        await reduced.setProps({
            modelValue: curve({ mode: "steps", css: "steps(6, jump-end)", steps: 6 }),
        });
        expect(reduced.attributes("data-drawing")).toBeUndefined();
        expect(frames.length, "no sweep frame is requested under reduce").toBe(requested);
        reduced.unmount();
    });

    it("answers a press on the house register rather than a minted rung", () => {
        const wrapper = mountPicker();
        const handle = wrapper.get('[data-slot="easing-handles"] [role="slider"]');
        // The register is COMPOSED: `--scale-press` on the `--spring-press` clock and
        // the transform-origin all arrive from `.tap-squish`.
        expect(handle.classes()).toContain("tap-squish");
        // An SVG element transforms about the VIEW BOX by default, so `.tap-squish`'s
        // `center center` would squish the handle toward the middle of the plot.
        expect(handle.classes()).toContain("[transform-box:fill-box]");
        // A pointer-captured drag suppresses `:active`, so the house's "JS owns the
        // scale" marker is stamped and the drag state is the press truth.
        expect(handle.attributes("data-press-armed")).toBe("");
        expect(handle.classes()).toContain("cursor-grab");
        wrapper.unmount();

        const picker = source("EasingPicker.vue");
        expect(picker).toContain("scale-(--scale-press)");
        expect(picker).toContain("cursor-grabbing");
        // No lane-local press depth: the rung is reached by name or not at all.
        expect(picker).not.toMatch(/scale-\[[\d.]+\]/);
    });
});

describe("G-E10 SEAM+NO-META — one published seam, and no tranche archaeology", () => {
    it("publishes data-slot and no data-testid", () => {
        expect(LANE_SOURCE).not.toContain("data-testid");
        const wrapper = mountPicker();
        expect(wrapper.attributes("data-slot")).toBe("easing-picker");
        wrapper.unmount();
    });

    it("keeps the plot's role='img' — the selector value.js reads", () => {
        // The 7.0.0 `role="img"` → `role="group"` change is live at HEAD in value.js's
        // Law-3 CSS and its `syncVbRatio()`, both of which select `svg[role='img']`.
        // The consumer relay is a MARKED ADDENDUM, not an implication of this line:
        // docs/tranches/BJ/coordination/glass-outbound-2026-08-08-easing-consumer-addenda.md
        const wrapper = mountPicker();
        expect(wrapper.get('[data-slot="easing-curve"] svg').attributes("role")).toBe("img");
        wrapper.unmount();
        expect(
            existsSync(
                resolve(
                    __dirname,
                    "../../docs/tranches/BJ/coordination/glass-outbound-2026-08-08-easing-consumer-addenda.md",
                ),
            ),
            "the consumer addendum this assertion cites must exist",
        ).toBe(true);
    });

    it("carries no dead donor name and no tranche bookkeeping", () => {
        for (const ghost of [
            "BezierEditor",
            "StepsEditor",
            "EasingEditor",
            "EasingCurveCanvas",
            "C-3 fold",
            "ppmycota",
            "R→S→T",
            "proof:",
        ]) {
            expect(LANE_SOURCE, `\`${ghost}\` still haunts src/components/easing/`)
                .not.toContain(ghost);
        }
    });

    it("leaves the lane's π spec pointing at selectors and a port that exist", () => {
        const spec = readFileSync(
            resolve(__dirname, "../../tests-visual/easing-primitive.spec.ts"),
            "utf-8",
        );
        expect(spec).not.toContain("data-testid");
        expect(spec).not.toContain("selectFamily");
        expect(spec).toContain('data-slot="easing-picker"');
        // The spec navigates RELATIVE to the suite's own baseURL. A hardcoded origin
        // would answer a question about whatever happened to be on that port —
        // which is the defect the retired clause here misdiagnosed: it forbade the
        // string "5199", the suite's OWN webServer default
        // (`tests-visual/playwright.config.ts:25`), named by every sibling spec.
        expect(spec).not.toMatch(/page\.goto\(\s*["'`]https?:/);
    });
});

describe("G-E11 SPEAK — one transport vocabulary, one source", () => {
    it("renders exactly one of Preview/Replay/Cancel, and says the same word", async () => {
        const wrapper = mountPicker();
        // `find`, not `get`: `get` THROWS on absence, so `.exists()` after it can only
        // ever read true — the assertion below asserted nothing (and `get`'s return
        // type omits `exists`, which is how the release typecheck said so first).
        const status = () => wrapper.find('[data-slot="easing-transport-status"]');
        // Mounted at idle: a live region that appears with its first message
        // announces nothing.
        expect(status().exists()).toBe(true);
        expect(status().text()).toBe("Preview");

        const transport = () =>
            wrapper.findAll("button").find((b) => /Preview|Cancel|Replay/.test(b.text()))!;
        expect(transport().text().trim()).toBe("Preview");
        await transport().trigger("click");
        expect(transport().text().trim()).toBe("Cancel");
        expect(status().text()).toBe("Cancel");
        wrapper.unmount();
    });

    it("keeps the four retired verbs out of the lane", () => {
        for (const retired of [
            "Trace the curve",
            "Climb the staircase",
            "Restart",
            "Preview idle",
            "Preview playing",
            "Preview complete",
        ]) {
            expect(LANE_SOURCE, `the retired transport phrase "${retired}" is back`)
                .not.toContain(retired);
        }
    });
});

/** A dependency-free recursive grep over a source tree, files only. */
function grepTree(root: string, needle: string): string[] {
    const hits: string[] = [];
    const walk = (dir: string): void => {
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
            const path = resolve(dir, entry.name);
            if (entry.isDirectory()) walk(path);
            else if (/\.(ts|vue|css|md)$/.test(entry.name)) {
                if (readFileSync(path, "utf-8").includes(needle)) hits.push(path);
            }
        }
    };
    walk(root);
    return hits;
}
