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
//   (e) THE GLIDE (U/B7, the owner's order of 2026-10-19: "The tabs animations on the
//       filter on the homepage is flashy and too gaudy--more glass-ui and subtle").
//       The eyeglass organ, the `--stretch` deform, the press squish, the capsule hover
//       and the label delay are deleted; this arm asserts their absence.
//
// BOTH SOURCE-SCANNING ARMS STRIP COMMENTS FIRST, and that is not hygiene — it is the
// difference between a gate that can go green and one that cannot. Simulate the
// prescribed deletion without stripping and the banned substrings survive in PROSE at
// three sites in the file the arm scans. A gate that can never pass is worth exactly
// what one that self-certifies is worth.

import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import SegmentedTabs from "../../src/components/tabs/SegmentedTabs.vue";

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

describe("gate:G-TABS-SEAM — one selected-state seam, one indicator, one glide", () => {
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
    describe("G-TABS-SEAM arm (e) — the indicator glides; nothing else moves", () => {
        const css = stripComments(readFileSync(SEGMENTED, "utf8"));
        const sfc = readFileSync(
            join(process.cwd(), "src/components/tabs/SegmentedTabs.vue"),
            "utf8",
        );

        it("no eyeglass survives anywhere in src", () => {
            const hits: string[] = [];
            const walk = (dir: string): void => {
                for (const entry of readdirSync(dir, { withFileTypes: true })) {
                    const path = join(dir, entry.name);
                    if (entry.isDirectory()) walk(path);
                    else if (/eyeglass/i.test(readFileSync(path, "utf8"))) hits.push(path);
                }
            };
            walk(join(process.cwd(), "src"));
            expect(hits).toEqual([]);
            expect(existsSync(join(process.cwd(), "src/composables/motion/morph/eyeglass.ts"))).toBe(
                false,
            );
        });

        it("the indicator transition is translate/width/height on the dock spring, plus opacity", () => {
            const block = css.match(/\.segmented-indicator--js\s*\{[^}]*transition:([^;]*);/);
            expect(block).not.toBeNull();
            const legs = block![1]!
                .split(/,(?![^(]*\))/)
                .map((leg) => leg.trim().split(/\s+/)[0]);
            expect(legs).toEqual(["translate", "width", "height", "opacity"]);
            expect(block![1]).not.toMatch(/cartoon-punch/);
            for (const leg of ["translate", "width", "height"]) {
                expect(block![1]).toMatch(
                    new RegExp(`${leg} var\\(--tab-indicator-duration\\) var\\(--spring-dock\\)`),
                );
            }
        });

        it("no scale, deform channel or label delay in the tabs sheet", () => {
            expect(css).not.toMatch(/\bscale\s*:/);
            expect(css).not.toMatch(/transform-origin/);
            expect(css).not.toMatch(/--stretch/);
            expect(css).not.toMatch(/transition-delay/);
        });

        it("the SFC carries no press animation and no capsule hover, and deforms nothing", () => {
            expect(sfc).not.toMatch(/animate\(/);
            expect(sfc).not.toContain("glass-capsule-hover");
            expect(sfc).not.toContain("animatePress");
            expect(sfc).not.toContain("onSelect");
            expect(sfc).not.toMatch(/deform:/);
        });

        it("hover on an inactive pill tab is colour only, on the shared hover weight", () => {
            expect(css).toMatch(
                /\.segmented-tab:not\(\[data-active\]\):hover\s*\{\s*color:\s*color-mix\(in oklab, var\(--muted-foreground\), var\(--foreground\) var\(--hover-ink-mix\)\);\s*\}/,
            );
            const tokens = readFileSync(
                join(process.cwd(), "src/styles/tokens/color-radius.css"),
                "utf8",
            );
            expect(tokens).toMatch(/--hover-ink-mix:\s*45%/);
        });

        it("a real commit writes geometry and no deform onto the node", async () => {
            const wrapper = mount(SegmentedTabs, {
                props: { options: OPTIONS, modelValue: "one", variant: "pill" },
                attachTo: document.body,
            });
            const indicator = wrapper.get(".segmented-indicator").element as HTMLElement;
            const buttons = wrapper.findAll(".segmented-tab");
            await buttons[2]!.trigger("click");
            await nextTick();
            await nextTick();
            expect(indicator.style.getPropertyValue("--stretch")).toBe("");
            expect(indicator.style.getPropertyValue("--motion-weight")).toBe("");
            expect(wrapper.element.hasAttribute("data-eyeglass-wake")).toBe(false);
            wrapper.unmount();
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
