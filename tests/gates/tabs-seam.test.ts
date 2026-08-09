// BK #32 W-TABS — the `G-TABS-SEAM` seat, made executable.
//
// THE INVARIANT: the tabs family has ONE selected-state seam, ONE indicator engine,
// ONE indicator node, and ONE deform law. Every arm below was RED at the row's base
// commit — none of them is a description of what already shipped.
//
// WHY EACH ARM EXISTS, in the words of the defect it convicts:
//   (a) STATE. The strip painted off `[aria-pressed]` and `[aria-selected]`, which are
//       two spellings of one fact. Every rule had to pick one, and the drag bootstrap
//       picked `aria-pressed` — so on all three `role="tablist"` mounts the liquid tab
//       was simply dead while the toggle mounts worked, silently, for as long as it
//       shipped. One presence-gated `[data-active]`, and the two semantics lose the
//       ability to disagree.
//   (b) THE SAME FACT, from the sheets' side: no styles partial may key either ARIA
//       attribute as a state selector again.
//   (c) NODE COUNT. The underline rendered ZERO indicator elements (`v-if="!isUnderline"`)
//       and drew a `::before` instead — two engines, one of which produced no indicator
//       at all under `semantics="toggle"`. Exactly one node, always, with the
//       responsive collapse CARVED because zero is correct there: that branch renders a
//       `<Select>` and no strip at all.
//   (d) NO ANCHOR PATH. The second engine was CSS anchor positioning behind an
//       `@supports not` arm that substituted a static border — a fallback hiding a dead
//       primary, and the reason the underline never had an engine-independent paint.
//   (e) THE EYEGLASS, born-RED at zero: `rg -i 'eyeglass|loupe' src demo` returned
//       nothing at the base commit, for a default the owner ruled standing.
//
// BOTH SOURCE-SCANNING ARMS STRIP COMMENTS FIRST, and that is not hygiene — it is the
// difference between a gate that can go green and one that cannot. Simulate the
// prescribed deletion without stripping and the banned substrings survive in PROSE at
// three sites in the file the arm scans. A gate that can never pass is worth exactly
// what one that self-certifies is worth.

import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import SegmentedTabs from "../../src/components/tabs/SegmentedTabs.vue";
import {
    EYEGLASS_SPAN_MAX,
    EYEGLASS_SWELL_MAX,
    EYEGLASS_EDGE_RATIO,
    EYEGLASS_ORIGIN_FRACTION,
    EYEGLASS_OVERFLOW_LICENSE,
    CASCADE_RANKS,
    CASCADE_RANK_MS,
    cascadeRankMs,
    eyeglassSpan,
    eyeglassSwell,
    eyeglassOriginPercent,
} from "../../src/composables/motion/morph/eyeglass";

const TABS_STYLES = join(process.cwd(), "src/components/tabs/styles");
const SEGMENTED = join(TABS_STYLES, "segmented.css");

/** The house idiom — `orphan-css-partial.test.ts:68`, `radius-role-canon.test.ts:29`. */
const stripComments = (text: string): string => text.replace(/\/\*[\s\S]*?\*\//g, "");

const styleSheets = (): { name: string; code: string }[] =>
    readdirSync(TABS_STYLES)
        .filter((f) => f.endsWith(".css"))
        .map((f) => ({
            name: f,
            code: stripComments(readFileSync(join(TABS_STYLES, f), "utf8")),
        }));

const OPTIONS = [
    { label: "One", value: "one" },
    { label: "Two", value: "two" },
    { label: "Three", value: "three" },
];

const COMBINATIONS = [
    { variant: "pill", semantics: "toggle" },
    { variant: "pill", semantics: "tabs" },
    { variant: "underline", semantics: "toggle" },
    { variant: "underline", semantics: "tabs" },
] as const;

describe("gate:G-TABS-SEAM — one selected-state seam, one indicator, one deform law", () => {
    // ── (a) ──────────────────────────────────────────────────────────────────
    describe("G-TABS-SEAM arm (a) — `[data-active]` is the state, on all four combinations", () => {
        it.each(COMBINATIONS)(
            "variant=$variant semantics=$semantics marks exactly the selected tab, by PRESENCE",
            ({ variant, semantics }) => {
                const wrapper = mount(SegmentedTabs, {
                    props: { options: OPTIONS, modelValue: "two", variant, semantics },
                });
                const tabs = wrapper.findAll(".segmented-tab");
                expect(tabs).toHaveLength(3);
                // PRESENCE, not value: `data-active="false"` on the unselected half
                // would make `[data-active]` match every tab in the strip.
                expect(tabs.map((t) => t.attributes("data-active"))).toEqual([
                    undefined,
                    "",
                    undefined,
                ]);
                expect(wrapper.findAll(".segmented-tab[data-active]")).toHaveLength(1);
            },
        );

        it("the ARIA attributes are untouched by the seam — both spellings still ship", () => {
            const toggle = mount(SegmentedTabs, {
                props: { options: OPTIONS, modelValue: "two", variant: "pill" },
            });
            const tabs = mount(SegmentedTabs, {
                props: { options: OPTIONS, modelValue: "two", variant: "underline" },
            });
            expect(
                toggle.findAll(".segmented-tab").map((t) => t.attributes("aria-pressed")),
            ).toEqual(["false", "true", "false"]);
            expect(
                tabs.findAll(".segmented-tab").map((t) => t.attributes("aria-selected")),
            ).toEqual(["false", "true", "false"]);
        });
    });

    // ── (b) ──────────────────────────────────────────────────────────────────
    it("G-TABS-SEAM arm (b) — no styles partial keys an ARIA attribute as a state selector", () => {
        const offenders = styleSheets().flatMap(({ name, code }) =>
            [...code.matchAll(/\.segmented-tab\[aria-(pressed|selected)/g)].map(
                (m) => `${name} :: ${m[0]}`,
            ),
        );
        expect(
            offenders,
            "ARIA is the accessibility contract, not the paint hook: a rule that keys " +
                "one spelling is dead on the other semantics.\n  " +
                offenders.join("\n  "),
        ).toEqual([]);
    });

    // ── (c) ──────────────────────────────────────────────────────────────────
    describe("G-TABS-SEAM arm (c) — exactly ONE indicator node, every variant", () => {
        it.each(COMBINATIONS)(
            "variant=$variant semantics=$semantics renders one `.segmented-indicator`",
            ({ variant, semantics }) => {
                const wrapper = mount(SegmentedTabs, {
                    props: { options: OPTIONS, modelValue: "one", variant, semantics },
                });
                expect(wrapper.findAll(".segmented-indicator")).toHaveLength(1);
            },
        );

        it("the material composes onto that one node — glass fills it, paper draws its edge", () => {
            const pill = mount(SegmentedTabs, {
                props: { options: OPTIONS, modelValue: "one", variant: "pill" },
            });
            const paper = mount(SegmentedTabs, {
                props: { options: OPTIONS, modelValue: "one", variant: "underline" },
            });
            expect(pill.get(".segmented-indicator").classes()).toContain("glass-capsule");
            // The mark register's FIRST real class consumer. It spent its whole life
            // asserting "≥2 consumers at birth" with zero.
            expect(paper.get(".segmented-indicator").classes()).toContain(
                "paper-ink-mark",
            );
            expect(paper.get(".segmented-indicator").classes()).not.toContain(
                "glass-capsule",
            );
        });

        it("the indicator is decoration, so it is hidden from the tablist it lives in", () => {
            const wrapper = mount(SegmentedTabs, {
                props: { options: OPTIONS, modelValue: "one", variant: "underline" },
            });
            expect(wrapper.get(".segmented-indicator").attributes("aria-hidden")).toBe(
                "true",
            );
        });

        it("CARVED: the responsive collapse renders zero, because it renders a Select instead", () => {
            const wrapper = mount(SegmentedTabs, {
                props: { options: OPTIONS, modelValue: "one", responsive: true },
            });
            // jsdom `matchMedia` reports no match, so the strip branch renders; the
            // carve is asserted as a STRUCTURAL fact about the two branches rather
            // than by faking a viewport: the mobile branch has no indicator in it.
            const source = readFileSync(
                join(process.cwd(), "src/components/tabs/SegmentedTabs.vue"),
                "utf8",
            );
            const mobile = source.slice(
                source.indexOf("v-if=\"showMobileSelect\""),
                source.indexOf("v-else"),
            );
            expect(mobile).not.toContain("segmented-indicator");
            expect(wrapper.findAll(".segmented-indicator").length).toBeLessThanOrEqual(1);
        });
    });

    // ── (d) ──────────────────────────────────────────────────────────────────
    it("G-TABS-SEAM arm (d) — no anchor-positioning engine survives in the tabs sheets", () => {
        const banned = ["position-anchor", "anchor-name", "anchor("];
        const offenders = styleSheets().flatMap(({ name, code }) =>
            banned.filter((needle) => code.includes(needle)).map((n) => `${name} :: ${n}`),
        );
        expect(
            offenders,
            "The anchor path was the second engine, and its `@supports not` arm " +
                "substituted a static border for a dead primary.\n  " + offenders.join("\n  "),
        ).toEqual([]);
        // The arm is written AROUND the comment strip; prove the strip is load-bearing
        // rather than decorative, so nobody "simplifies" it away and reds the gate.
        const raw = readFileSync(SEGMENTED, "utf8");
        expect(raw.length).toBeGreaterThan(stripComments(raw).length);
    });

    // ── (e) ──────────────────────────────────────────────────────────────────
    describe("G-TABS-SEAM arm (e) — the EYEGLASS is the default, and it is one law", () => {
        const css = stripComments(readFileSync(SEGMENTED, "utf8"));

        it("the pill arms the organ, ONCE, and the paper strip does not", () => {
            // Exactly one declaration in the family, and it is the pill-only rule —
            // a second site is a second authority over the ceiling.
            expect([...css.matchAll(/--eyeglass-span-max\s*:/g)]).toHaveLength(1);
            expect(css).toMatch(
                /\.segmented-tabs:not\(\.segmented-tabs--underline\)\s*\{[^}]*--eyeglass-span-max:\s*1\.6/,
            );
        });

        it("the declared ceiling IS the measured one — no second authority", () => {
            const declared = css.match(/--eyeglass-span-max:\s*([\d.]+)/);
            expect(declared).not.toBeNull();
            expect(Number(declared![1])).toBe(EYEGLASS_SPAN_MAX);
            const clamp = css.match(
                /\[data-eyeglass-clamped\]\s*\{[^}]*--eyeglass-swell:\s*([\d.]+)/,
            );
            expect(clamp).not.toBeNull();
            expect(Number(clamp![1])).toBe(EYEGLASS_SWELL_MAX);
        });

        it("the track may not clip the organ — the swell's own overflow licence", () => {
            expect(css).toMatch(/\.segmented-tabs\s*\{[^}]*overflow:\s*visible/);
            // The licence is DERIVED from the swell, and the two measurements agree:
            // a symmetric 1.22 swell hangs 11% per side against the seat's own ~10%.
            expect(EYEGLASS_OVERFLOW_LICENSE).toBeCloseTo(0.11, 5);
            expect(EYEGLASS_OVERFLOW_LICENSE).toBeGreaterThan(0.09);
            expect(EYEGLASS_OVERFLOW_LICENSE).toBeLessThan(0.13);
        });

        it("the 2:1 lead falls out of ONE transform-origin, and the algebra closes", () => {
            expect(css).toMatch(/transform-origin:\s*var\(--eyeglass-origin/);
            // Scaling by k about f-from-the-leading-edge: leading travels (1−f)(k−1)w,
            // trailing f(k−1)w. The ratio must be the measured one, exactly.
            const f = EYEGLASS_ORIGIN_FRACTION;
            expect((1 - f) / f).toBeCloseTo(EYEGLASS_EDGE_RATIO, 12);
            expect(eyeglassOriginPercent(1)).toBeCloseTo(100 - f * 100, 12);
            expect(eyeglassOriginPercent(-1)).toBeCloseTo(f * 100, 12);
            expect(eyeglassOriginPercent(0)).toBe(50);
        });

        it("the span is the UNION of origin and destination, capped, never a fraction pump", () => {
            // Two 100-wide tabs, 100 apart: the union is 300 wide, so the geometric
            // span is 3× — well past the ceiling, which is what the ceiling is for.
            const far = eyeglassSpan({
                from: { start: 0, end: 100 },
                to: { start: 200, end: 300 },
            });
            expect(far.span).toBe(EYEGLASS_SPAN_MAX);
            expect(far.clamped).toBe(true);
            expect(far.direction).toBe(1);
            // A short hop spans its REAL distance and stops there — the law is
            // geometry-true first and capped second, never a fixed inflation.
            const near = eyeglassSpan({
                from: { start: 0, end: 100 },
                to: { start: 40, end: 140 },
            });
            expect(near.span).toBeCloseTo(1.4, 12);
            expect(near.clamped).toBe(false);
            // No travel is no span — a same-tab commit may not lean or stretch.
            const still = eyeglassSpan({
                from: { start: 0, end: 100 },
                to: { start: 0, end: 100 },
            });
            expect(still).toEqual({ span: 1, clamped: false, direction: 0 });
        });

        it("the boundary CLAMPS rather than spanning through the bar's inner edge", () => {
            // Destination flush against the track's end. The leading edge has ZERO
            // headroom and a scale is symmetric about its origin, so any growth at all
            // would put that edge through the wall: the longitudinal channel goes to
            // nothing and the clamp is REPORTED, which is what routes the whole deform
            // into the cross-axis pile-up the paint answers with.
            const wall = eyeglassSpan({
                from: { start: 0, end: 100 },
                to: { start: 100, end: 200 },
                track: { start: 0, end: 200 },
            });
            expect(wall).toEqual({ span: 1, clamped: true, direction: 1 });
            // With headroom the same hop spans partially — the clamp is a boundary,
            // not a switch that kills the organ near the ends.
            const roomy = eyeglassSpan({
                from: { start: 0, end: 100 },
                to: { start: 100, end: 200 },
                track: { start: 0, end: 220 },
            });
            expect(roomy.clamped).toBe(true);
            expect(roomy.span).toBeGreaterThan(1);
            expect(roomy.span).toBeLessThan(2);
            // Unfenced, the same hop would have spanned its full geometric union.
            expect(
                eyeglassSpan({
                    from: { start: 0, end: 100 },
                    to: { start: 100, end: 200 },
                    spanMax: 4,
                }).span,
            ).toBeCloseTo(2, 12);
        });

        it("the swell is largest at travel extremes and absent at rest", () => {
            expect(eyeglassSwell(0)).toBe(1);
            expect(eyeglassSwell(1)).toBeCloseTo(EYEGLASS_SWELL_MAX, 12);
            expect(eyeglassSwell(0.5)).toBeCloseTo(1 + (EYEGLASS_SWELL_MAX - 1) / 2, 12);
            // Out-of-band input clamps rather than extrapolating into taffy.
            expect(eyeglassSwell(4)).toBeCloseTo(EYEGLASS_SWELL_MAX, 12);
        });

        it("the wake and the well ride the ENVELOPE clock, never the travel spring", () => {
            expect(css).toMatch(
                /--eyeglass-light-clock:\s*var\(--engage-control-engage-release\)/,
            );
            expect(css).toMatch(
                /\[data-eyeglass-wake\][^{]*\{[^}]*--eyeglass-light-clock:\s*var\(--engage-control-engage-attack\)/,
            );
        });

        it("the cascade delay is DERIVED from the rank ladder, not remembered", () => {
            const declared = css.match(/--eyeglass-cascade-annotation:\s*(\d+)ms/);
            expect(declared).not.toBeNull();
            expect(Number(declared![1])).toBe(
                Math.round(cascadeRankMs(CASCADE_RANKS.annotation)),
            );
            // The frame is the unit that reconciles the ladder with the milliseconds
            // the same seat measured — all three of them, or the unit is wrong.
            expect(CASCADE_RANK_MS).toBeCloseTo(1000 / 60, 12);
            expect(cascadeRankMs(CASCADE_RANKS.annotation)).toBeGreaterThanOrEqual(80);
            expect(cascadeRankMs(CASCADE_RANKS.annotation)).toBeLessThanOrEqual(160);
            expect(cascadeRankMs(CASCADE_RANKS.content)).toBeCloseTo(250, 0);
            expect(cascadeRankMs(CASCADE_RANKS.light)).toBeCloseTo(500, 0);
            expect(css).toMatch(
                /transition-delay:\s*var\(--eyeglass-cascade-annotation/,
            );
        });

        it("the organ actually writes itself onto the node on a real commit", async () => {
            const wrapper = mount(SegmentedTabs, {
                props: { options: OPTIONS, modelValue: "one", variant: "pill" },
                attachTo: document.body,
            });
            const indicator = wrapper.get(".segmented-indicator")
                .element as HTMLElement;
            const buttons = wrapper.findAll(".segmented-tab");
            // jsdom reports zero rects, so the span law resolves to no travel; what is
            // asserted here is that the writer REACHES the node under the default
            // policy — the geometry itself is a paint obligation, measured live.
            await buttons[2]!.trigger("click");
            await nextTick();
            expect(indicator.style.getPropertyValue("--stretch")).not.toBe("");
            wrapper.unmount();
        });

        it("the paper strip has no body to swell — `mark` deforms in length only", () => {
            expect(
                readFileSync(
                    join(process.cwd(), "src/components/tabs/SegmentedTabs.vue"),
                    "utf8",
                ),
            ).toMatch(/deform:\s*computed\(\(\)\s*=>\s*\(isUnderline\.value\s*\?\s*"mark"/);
            expect(css).toMatch(
                /\.segmented-tabs--underline\s+\.segmented-indicator\s*\{[^}]*scale:\s*var\(--stretch\)\s*1/,
            );
        });
    });

    // ── the deleted surface ──────────────────────────────────────────────────
    it("G-TABS-SEAM — the tooltip fork is gone, so nine attributes cannot diverge", () => {
        const sfc = readFileSync(
            join(process.cwd(), "src/components/tabs/SegmentedTabs.vue"),
            "utf8",
        );
        expect(sfc).not.toContain("TooltipProvider");
        expect(sfc).not.toMatch(/tooltip\?:/);
        expect([...sfc.matchAll(/class="segmented-tab"/g)]).toHaveLength(1);
    });
});
