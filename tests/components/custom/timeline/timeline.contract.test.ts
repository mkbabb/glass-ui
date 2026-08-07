// BK row #46 (GF-TIMELINE) — the clip, the motion cap, the roving stop, the
// three doors, and the structural asserts that survive the 5→1 collapse.
//
// The axe/sibling cases carried here are the ones the retired
// `continuous-structural-split.test.ts` existed for: a `role="progressbar"` that
// nests no focusable descendant, and a sibling `role="list"` of marks. The
// popover and segmented cases died with their subjects.

import { readFileSync } from "node:fs";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";

import { Timeline } from "@glass/components/timeline";
import { useLiquidFlex } from "@glass/composables/motion/spring/useLiquidFlex";
import type { TimelineSegment } from "@glass/components/timeline/types";

const SFC = "src/components/timeline/Timeline.vue";
const SCALE_PAPER = "src/styles/tokens/scale-paper.css";
const RESPONSIVE = "src/styles/utilities/responsive.css";

const source = readFileSync(SFC, "utf8");
/** Live bytes only — a rule quoted inside a comment is not a shipped rule. */
const live = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/<!--[\s\S]*?-->/g, "");

const segments: TimelineSegment[] = [
    { key: "ping", label: "Ping", at: 0.3, state: "completed" },
    { key: "download", label: "Download", at: 0.7, state: "active", progress: 0.4 },
    { key: "upload", label: "Upload", at: 1, state: "pending" },
];

/** The same three phases with the active span's progress driven from outside. */
const travelling = (progress: number): TimelineSegment[] => [
    { key: "ping", label: "Ping", at: 0.3, state: "completed" },
    { key: "download", label: "Download", at: 0.7, state: "active", progress },
    { key: "upload", label: "Upload", at: 1, state: "pending" },
];

/**
 * Report `prefers-reduced-motion: reduce` to the spring engine. happy-dom's
 * `MediaQueryList` constructor is private, so the structural contract is
 * satisfied directly (the engine reads `.matches` only) — the same stub
 * `tests/composables/useSpring.test.ts` uses. Returns its own undo.
 */
function stubReducedMotion(): () => void {
    const original = window.matchMedia;
    const mql: MediaQueryList = {
        matches: true,
        media: "(prefers-reduced-motion: reduce)",
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(() => true),
    };
    const stub = vi.fn(() => mql);
    vi.stubGlobal("matchMedia", stub);
    Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: stub,
    });
    return () => {
        vi.stubGlobal("matchMedia", original);
        Object.defineProperty(window, "matchMedia", {
            configurable: true,
            writable: true,
            value: original,
        });
    };
}

/** The live `--stretch` the meniscus is painting, read off its bound style. */
function stretchOf(styleAttr: string | undefined): number {
    return Number(styleAttr?.match(/--stretch:\s*([\d.]+)/)?.[1]);
}

/** The body of an at-rule block, braces balanced (a lazy regex cannot nest). */
function atRuleBody(css: string, head: string): string | null {
    const at = css.indexOf(head);
    if (at < 0) return null;
    const open = css.indexOf("{", at);
    let depth = 0;
    for (let i = open; i < css.length; i += 1) {
        if (css[i] === "{") depth += 1;
        else if (css[i] === "}") {
            depth -= 1;
            if (depth === 0) return css.slice(open + 1, i);
        }
    }
    return null;
}

describe("T-CLIP-1 — every span is its own clip box", () => {
    it("`.tl__span` declares `overflow: hidden`", () => {
        // THE MOST LOAD-BEARING DECLARATION IN THE DESIGN, and π cannot see it:
        // whenever every span is filled the escape is invisible. `.glass-track-well`
        // clips the TRACK's ends only, so without this the fill translates
        // straight into its neighbours and TL-1's whole claim is void.
        //
        // MUTATION THAT REDS THIS: delete the one declaration.
        const rule = live.match(/\.tl__span\s*\{([\s\S]*?)\}/);
        expect(rule, `${SFC} declares a .tl__span rule`).not.toBeNull();
        expect(rule![1]).toMatch(/overflow:\s*hidden/);
    });

    it("renders one `.tl__span` per segment for that rule to bite on", () => {
        const wrapper = mount(Timeline, { props: { segments } });
        expect(wrapper.findAll(".tl__span")).toHaveLength(segments.length);
    });

    it("the fill travels on `transform`, never on `width`", () => {
        // The dead `width` transition + its unconditional `will-change: width`
        // are what made the old rail animate off the compositor forever.
        expect(live).toMatch(/transform:\s*translateX\(calc\(\(var\(--tl-f\)\s*-\s*1\)/);
        expect(live).not.toMatch(/will-change:\s*width/);
    });
});

describe("T-FLEX-1 — one cap for all three expressions, read from the token", () => {
    it("the cap is READ from `--scale-hover`, never typed beside it", () => {
        // MUTATION THAT REDS THIS: re-mint a literal (1.12 was both arms' own
        // unlawful scalar) in place of the cascade read.
        expect(live).toMatch(/getPropertyValue\(\s*["']--scale-hover["']\s*\)/);
        expect(live).not.toMatch(/maxStretch:\s*[\d.]/);
        expect(live).not.toMatch(/1\.12/);
    });

    it("the no-token floor is in LOCKSTEP with the token's declared value", () => {
        const declared = readFileSync(SCALE_PAPER, "utf8").match(
            /--scale-hover:\s*([\d.]+)\s*;/,
        );
        expect(declared, `${SCALE_PAPER} declares --scale-hover`).not.toBeNull();
        const floor = live.match(/NO_TOKEN_CAP\s*=\s*([\d.]+)/);
        expect(floor, `${SFC} declares NO_TOKEN_CAP`).not.toBeNull();
        expect(Number(floor![1])).toBe(Number(declared![1]));
        expect(Number(declared![1])).toBe(1.08);
    });

    it("the stretch is ≥1 across any drive sequence and never exceeds the cap", () => {
        // MUTATION THAT REDS THIS: reintroduce a sub-1 undershoot. The absorption
        // is a SWELL, not a squash — `--scale-press` has no business on this axis.
        const flex = useLiquidFlex({
            from: 0,
            to: 1,
            axis: "width",
            squishLaw: "tanh",
            maxStretch: () => 1.08,
        });
        for (const t of [0, 0.9, 0.05, 1, 0.5, 0.5, 0]) {
            flex.drive(t);
            expect(flex.stretch.value).toBeGreaterThanOrEqual(1);
            expect(flex.stretch.value).toBeLessThanOrEqual(1.08);
        }
    });
});

describe("T-FLEX-2 — the settle RELEASES the cap", () => {
    it("`squish(0)` returns the stretch to exactly 1", () => {
        const flex = useLiquidFlex({
            from: 0,
            to: 1,
            axis: "width",
            squishLaw: "tanh",
            maxStretch: () => 1.08,
        });
        flex.drive(1);
        expect(flex.stretch.value).toBeGreaterThan(1);
        flex.squish(0);
        expect(flex.stretch.value).toBe(1);
    });

    it("a re-target under `prefers-reduced-motion` leaves NO stretch and NO crossing", async () => {
        // THE BEHAVIOURAL ASSERT, not a source read. Under `prefers-reduced-
        // motion` the spring SNAPS inside the target setter: the subscriber
        // fires with `settled` ALREADY true, so a release watched on the CHANGE
        // of `isSettled` sees true-over-true and never runs — while the same
        // subscription's `onValue` has already stretched the meniscus and
        // latched the crossing. The cap then parks stretched and `data-crossing`
        // never clears, which is verbatim the failure the release exists to
        // prevent. Watching the settled STATE (value AND flag) is the cure.
        //
        // MUTATION THAT REDS THIS: watch the `isSettled` EDGE instead of the
        // settled state — i.e. `watch(() => travel.isSettled.value, …)`.
        const restore = stubReducedMotion();
        try {
            const wrapper = mount(Timeline, { props: { segments: travelling(0) } });
            await nextTick();

            await wrapper.setProps({ segments: travelling(1) });
            await nextTick();
            await nextTick();

            const cap = wrapper.find(".tl__cap");
            expect(cap.exists(), "the active span paints a meniscus cap").toBe(true);
            expect(stretchOf(cap.attributes("style"))).toBe(1);
            expect(wrapper.findAll("[data-crossing]")).toHaveLength(0);
        } finally {
            restore();
        }
    });

    it("the release is watched on the settled STATE, never on the flag's edge", () => {
        // The structural twin of the case above: the watch must take BOTH the
        // travelling value and the settled flag as sources, because the PRM path
        // never moves the flag.
        //
        // MUTATION THAT REDS THIS: drop the value from the watch sources.
        expect(live).toMatch(
            /watch\(\s*\[\s*travel\.value\s*,\s*travel\.isSettled\s*\][\s\S]{0,300}?flex\.squish\(0\)/,
        );
    });
});

describe("T-A11Y-1 — one roving tab stop over the mark list", () => {
    it("exactly one mark carries `tabindex=0`", () => {
        // MUTATION THAT REDS THIS: remove the roving (7 focusables at HEAD).
        const wrapper = mount(Timeline, { props: { segments, current: "download" } });
        const marks = wrapper.findAll(".tl__mark");
        expect(marks).toHaveLength(segments.length);
        expect(marks.filter((m) => m.attributes("tabindex") === "0")).toHaveLength(1);
        // The stop seeds onto the current phase, not blindly onto index 0.
        expect(marks[1]?.attributes("tabindex")).toBe("0");
    });

    it("←/→, Home and End walk the marks and consume the key", async () => {
        const wrapper = mount(Timeline, {
            props: { segments },
            attachTo: document.body,
        });
        const marks = wrapper.findAll(".tl__mark");
        await marks[0]!.trigger("keydown", { key: "ArrowRight" });
        expect(document.activeElement).toBe(marks[1]!.element);
        await marks[1]!.trigger("keydown", { key: "End" });
        expect(document.activeElement).toBe(marks[2]!.element);
        await marks[2]!.trigger("keydown", { key: "Home" });
        expect(document.activeElement).toBe(marks[0]!.element);
        wrapper.unmount();
    });

    it("leaves Enter and Space activation to the native button", async () => {
        const wrapper = mount(Timeline, { props: { segments } });
        const mark = wrapper.findAll(".tl__mark")[1]!;
        await mark.trigger("keydown", { key: "Enter" });
        await mark.trigger("keydown", { key: " " });
        expect(wrapper.emitted("select")).toBeUndefined();
        await mark.trigger("click");
        expect(wrapper.emitted("select")).toHaveLength(1);
        expect(wrapper.emitted("select")?.[0]?.[0]).toMatchObject({ key: "download" });
    });
});

describe("T-TARGET-1 — the coarse floor actually reaches the mark", () => {
    it("the shared `[data-control-target]` rule is OUT-SPECIFIED by the scoped mark", () => {
        // The shared rule is a bare attribute selector — (0,1,0). Vue suffixes
        // every scoped selector with `[data-v-*]`, so `.tl__mark` ships as
        // (0,2,0) and wins on the very two properties the shared rule sets. The
        // attribute alone therefore cannot lift this mark to 44px, whatever the
        // markup says.
        const shared = readFileSync(RESPONSIVE, "utf8");
        expect(shared).toMatch(
            /@media\s*\(pointer:\s*coarse\)[\s\S]*?\[data-control-target\]\s*\{/,
        );
        expect(shared).not.toMatch(/[.#][\w-]+\[data-control-target\]/);

        const mark = live.match(/\.tl__mark\s*\{([\s\S]*?)\}/);
        expect(mark, `${SFC} declares a .tl__mark rule`).not.toBeNull();
        expect(mark![1]).toMatch(/min-inline-size:\s*1\.5rem/);
        expect(mark![1]).toMatch(/min-block-size:\s*1\.5rem/);
    });

    it("so the SFC re-declares the floor at its own specificity, off `--touch-target`", () => {
        // MUTATION THAT REDS THIS: delete the coarse arm and lean on the shared
        // attribute rule — which never bit. WCAG 2.5.5's 44px is the intent the
        // markup's `data-control-target` declares; this is where it lands.
        const coarse = atRuleBody(live, "@media (pointer: coarse)");
        expect(coarse, `${SFC} declares a (pointer: coarse) arm`).not.toBeNull();
        expect(coarse!).toMatch(/\.tl__mark\s*\{[^}]*min-inline-size:\s*var\(--touch-target/);
        expect(coarse!).toMatch(/\.tl__mark\s*\{[^}]*min-block-size:\s*var\(--touch-target/);
        // The row reserves the inflated box, or a 44px mark overhangs a 24px
        // list by 10px on both edges.
        expect(coarse!).toMatch(/\.tl__marks\s*\{[^}]*min-block-size:\s*var\(--touch-target/);
        // One value, two declaration sites — never a re-typed 2.75rem.
        expect(coarse!).not.toMatch(/2\.75rem/);
    });
});

describe("T-EXPOSE-1 — one number, three doors", () => {
    it("the template ref, the CSS var and the slot scope agree", () => {
        // MUTATION THAT REDS THIS: drop any of the three. A slot prop alone is
        // unreachable from a consumer's script; a CSS var alone is reachable only
        // by polling `getComputedStyle`.
        let slotValue: number | null = null;
        const wrapper = mount(Timeline, {
            props: { segments },
            slots: {
                detail: (scope: { value: number }) => {
                    slotValue = scope.value;
                    return "";
                },
            },
        });

        const exposed = (wrapper.vm as unknown as { value: number }).value;
        const style = wrapper.find(".tl").attributes("style") ?? "";
        const fromCss = Number(style.match(/--timeline-value:\s*([\d.]+)/)?.[1]);

        // 0.3 completed + 0.4·0.4 active = 0.46 of an axis the set owns entirely.
        expect(exposed).toBeCloseTo(0.46, 10);
        expect(fromCss).toBeCloseTo(exposed, 10);
        expect(slotValue).toBeCloseTo(exposed, 10);
    });
});

describe("the reporting axis — role, names, and the axe closure", () => {
    it("is a progressbar and never a slider", () => {
        const wrapper = mount(Timeline, { props: { segments } });
        expect(wrapper.find('[role="progressbar"]').exists()).toBe(true);
        expect(wrapper.find('[role="slider"]').exists()).toBe(false);
    });

    it("the progressbar nests no focusable descendant", () => {
        // The axe `nested-interactive` closure, kept BY CONSTRUCTION: the marks
        // are a sibling list, not children of the rail.
        const wrapper = mount(Timeline, { props: { segments } });
        const track = wrapper.find(".tl__track");
        const marks = wrapper.find(".tl__marks");
        expect(track.exists()).toBe(true);
        expect(marks.exists()).toBe(true);
        expect(track.element.contains(marks.element)).toBe(false);
        expect(
            track.findAll("button, [href], [tabindex]:not([tabindex='-1']), [role='button']"),
        ).toHaveLength(0);
        expect(marks.attributes("role")).toBe("list");
    });

    it("names the aggregate, and says so in prose when it is indeterminate", () => {
        const determinate = mount(Timeline, { props: { segments } });
        const bar = determinate.find('[role="progressbar"]');
        expect(bar.attributes("aria-valuemin")).toBe("0");
        expect(bar.attributes("aria-valuemax")).toBe("1");
        expect(bar.attributes("aria-valuetext")).toBe("46%");

        const running: TimelineSegment[] = [
            { key: "ping", label: "Ping", at: 0.5, state: "completed" },
            { key: "download", label: "Download", at: 1, state: "active" },
        ];
        const indeterminate = mount(Timeline, { props: { segments: running } });
        expect(indeterminate.find('[role="progressbar"]').attributes("aria-valuetext")).toBe(
            "50% — Download underway",
        );
    });

    it("`label` names the progressbar itself, not the surrounding group", () => {
        // axe `aria-progressbar-name` (serious): `role="progressbar"` owns no
        // text content, so nothing names it unless a prop does. A fallthrough
        // `aria-label` lands on the ROOT — which is `role="group"` — and leaves
        // the bar nameless, so the name has to be a PROP that binds on the
        // track.
        //
        // MUTATION THAT REDS THIS: bind `label` anywhere but the track.
        const wrapper = mount(Timeline, {
            props: { segments, label: "Release timeline" },
        });
        const bar = wrapper.find('[role="progressbar"]');
        expect(bar.attributes("aria-label")).toBe("Release timeline");
        expect(wrapper.find('[role="group"]').attributes("aria-label")).toBeUndefined();

        // Unnamed stays unnamed — no invented name, which would be a lie.
        const bare = mount(Timeline, { props: { segments } });
        expect(bare.find('[role="progressbar"]').attributes("aria-label")).toBeUndefined();
    });

    it("an indeterminate span renders NO fill node — the flow is its sole carrier", () => {
        const running: TimelineSegment[] = [
            { key: "a", label: "A", at: 0.5, state: "completed" },
            { key: "b", label: "B", at: 1, state: "active" },
        ];
        const wrapper = mount(Timeline, { props: { segments: running } });
        const spans = wrapper.findAll(".tl__span");
        expect(spans[0]?.find(".tl__fill").exists()).toBe(true);
        expect(spans[1]?.attributes("data-indeterminate")).toBe("true");
        expect(spans[1]?.find(".tl__fill").exists()).toBe(false);
    });

    it("marks carry their label, their state, and the current step", () => {
        const wrapper = mount(Timeline, { props: { segments, current: "download" } });
        const marks = wrapper.findAll(".tl__mark");
        expect(marks.map((m) => m.attributes("aria-label"))).toEqual([
            "Ping: completed",
            "Download: active",
            "Upload: pending",
        ]);
        expect(marks.map((m) => m.attributes("aria-current"))).toEqual([
            undefined,
            "step",
            undefined,
        ]);
    });

    it("composes the shared well register and authors no backdrop-filter", () => {
        const wrapper = mount(Timeline, { props: { segments } });
        expect(wrapper.find(".tl__track").classes()).toContain("glass-track-well");
        // Not as a value, and not as a reset: the S0 prefix trap cannot reach a
        // directory that never writes the property. (Live bytes — the header
        // comment says the word in order to explain why it is absent.)
        expect(live).not.toMatch(/backdrop-filter/);
    });
});
