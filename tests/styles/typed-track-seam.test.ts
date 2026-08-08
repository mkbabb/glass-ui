import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Progress } from "@glass/components/progress";
import { ScrollProgressRim } from "@glass/components/scroll-progress-rim";
import { Slider } from "@glass/components/slider";

// vitest runs from the repo root; resolve source/dist/package paths from there.
const ROOT = process.cwd();

/* BJ.W4-TYPEDSEAM — the typed-seam census gates, plus the BK #86+#88 joint-cut
   close battery folded in beside them (§5, four gates + five unit cases, zero
   new gate files).

   THE COLLISION LEDGER, executed at the same cut that lands the strikes — a
   spec that lands its strikes without co-landing these lands RED on arrival:
     · `:42`'s verbatim `--muted-medium` well match  — RETIRED (the well's
       background IS the strike; the ground moved to the consumer)
     · `:82-84`'s verbatim `--glass-progress-track-color` read — RETIRED (the
       `<color>`-only grammar died at birth: 0 writers in 7 repos)
     · `:90-95`'s gradient-into-color case — RETIRED with the grammar
     · the `track-well-fold.test.ts:19,29` string pins — RE-PINNED to
       `.track-well` (C-1: the eviction+rename wins)
     · the manifest order — RE-PINNED (the register left `styles/glass/`)

   The surviving originals below were each watched going RED against the
   rejected f9b9d16e bytes before the W4 cut landed. */

const src = (rel: string) => readFileSync(resolve(ROOT, "src", rel), "utf8");
const stripComments = (css: string) =>
    css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

const W4_STYLE_SOURCES = [
    "styles/track-well.css",
    "styles/glass/value-marks.css",
    "components/slider/Slider.vue",
    "components/progress/Progress.vue",
];

/** Every `.css` file under `src/styles`, recursively — the seam gate's census scope. */
function cssFiles(dir: string): string[] {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = resolve(dir, entry.name);
        if (entry.isDirectory()) return cssFiles(path);
        return entry.name.endsWith(".css") ? [path] : [];
    });
}
const STYLE_FILES = cssFiles(resolve(ROOT, "src/styles"));

const PROGRESS = src("components/progress/Progress.vue");
const RIM_STYLES = src("components/scroll-progress-rim/styles.css");
const WELL = src("styles/track-well.css");
const FLOW = src("styles/glass/track-flow.css");

describe("W4 typed-seam — generic `--track-bg` is absent (§3.1)", () => {
    it.each(W4_STYLE_SOURCES)("has no `--track-bg` token in %s", (rel) => {
        expect(src(rel)).not.toMatch(/--track-bg/);
    });

    it("the well register declares SHAPE and RECESS INK, never a ground", () => {
        const body = stripComments(WELL);
        /* The groove's own paint is ONE top-only inset edge, composed off the ink
           register's EDGE rung rather than typed as a literal — and its zero-alpha
           arm is `oklch(0 0 0 / 0)`, never bare `transparent` (the WebKit
           black-premultiply hole). Mutation: spell the alpha as a literal, or open
           the inset to all four sides, and this reds. */
        expect(body).toMatch(/box-shadow:\s*inset 0 1px 0\b/);
        expect(body).toMatch(/var\(--ink-edge\)/);
        expect(body).toMatch(/oklch\(0 0 0 \/ 0\)/);
        expect(body).not.toMatch(/,\s*transparent\s*\)/);
        // and NO background: the ground is the consuming surface's, read from the
        // one host-relative derivation. A `background:` here re-mints the shared
        // paint axis the typed split exists to prevent.
        expect(body).not.toMatch(/\bbackground(-color|-image)?\s*:/);
        expect(body).not.toMatch(/--glass-track-well-bg/);
    });
});

describe("W4 typed-seam — generic mark selectors are renamed (§2.1)", () => {
    it("value-marks register emits ONLY the glass-namespaced selectors", () => {
        const css = src("styles/glass/value-marks.css");
        expect(css).toMatch(/\.glass-value-marks\b/);
        expect(css).toMatch(/\.glass-value-mark\b/);
        // no un-namespaced generic selector survives (word-boundary excludes the glass- form)
        expect(css).not.toMatch(/(?<!glass-)\bvalue-marks?\s*[.,{[]/);
    });

    it("Slider + Progress templates emit ONLY the glass-namespaced mark classes", () => {
        for (const rel of ["components/slider/Slider.vue", "components/progress/Progress.vue"]) {
            const vue = src(rel);
            expect(vue).toMatch(/class="glass-value-marks"/);
            expect(vue).toMatch(/class="glass-value-mark"/);
            expect(vue).not.toMatch(/class="value-marks?"/);
        }
    });
});

describe("W4 typed-seam — the two typed public inputs, split by grammar (§3.2)", () => {
    it("Slider `.slider-track` reads --glass-slider-track-background (standard + spectrum)", () => {
        const vue = src("components/slider/Slider.vue");
        expect(vue).toMatch(
            /background:\s*var\(--glass-slider-track-background,\s*var\(--muted-medium\)\)/,
        );
        expect(vue).toMatch(
            /background:\s*var\(--glass-slider-track-background,\s*var\(--secondary\)\)/,
        );
        expect(vue).not.toMatch(/--glass-progress-track-background/);
    });

    it("Progress reads --glass-progress-track-background and never assigns it locally", () => {
        // ONE grammar, the sibling's name shape, still a distinct property. The
        // `<color>`-only predecessor is gone with no alias.
        // The detector strips comments: this wave's own prose NAMES what it struck,
        // so a raw grep fires on the explanation of the cure.
        const body = stripComments(PROGRESS);
        expect(body).toMatch(
            /background:\s*var\(--glass-progress-track-background,\s*var\(--track-well-recess\)\)/,
        );
        // NO local declaration masking an inherited ancestor override (a `:` assignment)
        expect(body).not.toMatch(/--glass-progress-track-background\s*:/);
        expect(body).not.toMatch(/--glass-slider-track-background/);
        expect(body).not.toMatch(/--glass-progress-track-color/);
    });
});

describe("W4 typed-seam — the component-only export is completed (§4.1)", () => {
    const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));

    it("`./styles.css` points at the generated component manifest, not the bare SFC bundle", () => {
        expect(pkg.exports["./styles.css"]).toBe("./dist/component-styles.css");
        expect(pkg.exports["./styles.css"]).not.toBe("./dist/glass-ui.css");
    });

    it("canonical `./styles` is unchanged and non-duplicated", () => {
        expect(pkg.exports["./styles"]).toBe("./dist/styles/index.css");
    });

    it("the generated manifest folds both register partials BEFORE the SFC bundle", () => {
        const manifest = resolve(ROOT, "dist/component-styles.css");
        const generator = resolve(ROOT, "scripts/gen-component-styles.mjs");
        if (!existsSync(manifest) || statSync(manifest).mtimeMs < statSync(generator).mtimeMs) {
            /* dist is a build artifact, and it is only evidence when it is NEWER than
               the generator that writes it — a stale manifest describes a tree that no
               longer exists and would false-RED (or, worse, false-GREEN) this row. The
               generator itself is fail-closed on missing targets, and the
               installed-tarball fixture is the routed §4.2 arm. */
            return;
        }
        const body = readFileSync(manifest, "utf8");
        const order = [...body.matchAll(/@import\s+"([^"]+)"/g)].map((m) => m[1]);
        /* The load-bearing invariant is the PARTITION, not the order WITHIN the
           partials: the three registers declare disjoint selectors, so their relative
           order is a build artifact — what must hold is that ALL of them are folded
           and that the SFC bundle is LAST. Mutation: drop any partial, or emit the
           bundle first, and this reds. (Amended at BK #86+#88: the groove register
           left `styles/glass/` for `styles/` with the `glass-` prefix that promised
           a material it never declared; and the CURE round added `track-flow.css` —
           the generator's predicate never named it, so `.track-flow` shipped as an
           emitted class with zero rules on the component-only entry.) */
        expect(order).toContain("./styles/track-well.css");
        expect(order).toContain("./styles/glass/track-flow.css");
        expect(order).toContain("./styles/glass/value-marks.css");
        expect(order.at(-1)).toBe("./glass-ui.css");
        expect(order).toHaveLength(4);
    });
});

describe("W4 typed-seam — runtime DOM census (mounted components)", () => {
    it("mounted Slider emits glass-namespaced marks and no generic ones", () => {
        const wrapper = mount(Slider, {
            props: { modelValue: [40], max: 100, marks: [25, 50, 75], "aria-label": "L" },
        });
        expect(wrapper.findAll(".glass-value-mark")).toHaveLength(3);
        expect(wrapper.find(".value-mark").exists()).toBe(false);
        expect(wrapper.find(".value-marks").exists()).toBe(false);
    });

    it("mounted Progress rail carries no inline --track-bg (no local paint knob)", () => {
        const wrapper = mount(Progress, {
            props: { modelValue: 40, marks: [25, 50, 75] },
        });
        const rail = wrapper.get(".progress-rail");
        expect(rail.attributes("style") ?? "").not.toMatch(/--track-bg/);
        expect(wrapper.findAll(".glass-value-mark")).toHaveLength(3);
    });
});

/* ══════════════════════════════════════════════════════════════════════════
   BK #86+#88 — the joint close battery. Four gates + five unit cases, each
   with the mutation that bites, all born-RED at the pre-cut bytes.
   ══════════════════════════════════════════════════════════════════════════ */

describe("G-PR-INDET-ONE — one indeterminate law, one clock, one carrier", () => {
    it("neither carrier defines its own indeterminate keyframes", () => {
        /* RED at HEAD: `progress-indeterminate-sweep` + `-rise` both live in
           Progress.vue. Mutation: restore either family.

           `flow` is in the alternation because the first cut left Timeline's own
           `@keyframes tl-flow` + band standing while claiming ONE law — the three
           original words simply never named it (verified: the pre-cure Timeline
           bytes match `(…|flow)` at `@keyframes tl-flow` and do NOT match
           `(indeterminate|sweep|rise)`). Timeline now COMPOSES `.track-flow`. */
        const timeline = stripComments(src("components/timeline/Timeline.vue"));
        for (const body of [stripComments(PROGRESS), timeline]) {
            expect(body).not.toMatch(
                /@keyframes\s+[\w-]*(indeterminate|sweep|rise|flow)/i,
            );
        }
        // and the composition is real, not merely absent
        expect(timeline).toContain("track-flow");
    });

    it("track-flow.css is the SOLE flow definition and rides the one shimmer clock", () => {
        const body = stripComments(FLOW);
        expect(body).toMatch(/@keyframes\s+track-flow\b/);
        expect(body).toMatch(/var\(--duration-shimmer-fast\)/);
        // the retired fourth clock has zero declarations left in the token layer
        const motion = src("styles/tokens/scheme-motion.css");
        expect(motion).not.toMatch(/--motion-duration-progress-\w+\s*:/);
    });

    it("mounted null differs from mounted 0 by the flow carrier alone", () => {
        // Mutation: delete the `track-flow` class binding and the two become
        // pixel-identical — the inherited falsifier, executable in node.
        const indeterminate = mount(Progress, { props: { modelValue: null } });
        const zero = mount(Progress, { props: { modelValue: 0 } });
        expect(indeterminate.get(".progress-rail").classes()).toContain("track-flow");
        expect(zero.get(".progress-rail").classes()).not.toContain("track-flow");
        expect(indeterminate.get(".progress-rail").attributes("data-indeterminate")).toBe(
            "true",
        );
    });
});

describe("G-PR-PRM-HONEST — reduced motion never paints a determinate lie", () => {
    it("no indeterminate rail resolves a multi-stop background-image, either orientation", () => {
        // RED twice at HEAD: `:275-278` pinned a static centred ramp horizontally and
        // `:183`'s (0,3,0) held `100% 200%` vertically — a permanent half-tinted
        // column. Mutation: restore either gradient arm.
        const body = stripComments(PROGRESS);
        expect(body).not.toMatch(/\[data-indeterminate\][\s\S]{0,400}?linear-gradient/);
        expect(body).not.toMatch(/background-size:\s*100% 200%/);
        expect(body).not.toMatch(/background-size:\s*200% 100%/);
    });

    it("the flow band keeps non-zero alpha under PRM — it parks, it does not vanish", () => {
        const body = stripComments(FLOW);
        const prm = body.slice(body.indexOf("prefers-reduced-motion"));
        expect(prm).toMatch(/animation:\s*none/);
        expect(prm).toMatch(/opacity:\s*var\(--track-flow-floor\)/);
        expect(prm).not.toMatch(/opacity:\s*0\b/);
    });
});

describe("G-PR-TRAVEL-DOCK — every value-travel leg names the dock spring", () => {
    it("the fill transform and the rim clip-path both ride --spring-dock", () => {
        // RED at HEAD: `:140` was a 0.3s cubic. Mutation: put the cubic back.
        expect(stripComments(PROGRESS)).toMatch(
            /transition:\s*transform var\(--spring-dock-duration\) var\(--spring-dock\)/,
        );
        expect(stripComments(RIM_STYLES)).toMatch(
            /transition:\s*clip-path var\(--spring-dock-duration\) var\(--spring-dock\)/,
        );
    });

    it("neither directory names --spring-snappy nor a literal spring fallback", () => {
        for (const body of [stripComments(PROGRESS), stripComments(RIM_STYLES)]) {
            expect(body).not.toMatch(/--spring-snappy/);
            expect(body).not.toMatch(/var\(--spring-[\w-]+,\s*[^)]/);
        }
    });

    it("EFFECTS legs stay lawful — the discharge glow rides --ease-standard", () => {
        // The directory-wide ban would outlaw the canon's own grammar: `--ease-standard`
        // belongs on effects legs by name. Travel legs only.
        const body = stripComments(PROGRESS);
        expect(body).toMatch(
            /animation:\s*progress-discharge var\(--duration-normal\) var\(--ease-standard\)/,
        );
        expect(body).not.toMatch(/transition:\s*transform[^;]*--ease-standard/);
    });
});

describe("G-PR-SEAM-CLOSED — every knob the seam reads is declared", () => {
    const TOKENS = ["styles/tokens/on-glass-fg.css", "styles/tokens/scheme-motion.css"]
        .map((rel) => src(rel))
        .join("\n");

    it("the three undeclared knobs and the born-dead grammar are gone repo-wide", () => {
        // RED at HEAD: `--progress-size`, `--progress-vertical-size` and
        // `--glass-progress-track-color` were read behind literal fallbacks with
        // ZERO declarations anywhere in src/styles. Mutation: reintroduce any.
        const body = stripComments(PROGRESS) + stripComments(RIM_STYLES);
        for (const dead of [
            "--progress-size",
            "--progress-vertical-size",
            "--glass-progress-track-color",
            "--progress-track-on-glass",
        ]) {
            expect(body).not.toContain(dead);
        }
    });

    it("--track-well-recess is declared ON THE COMPOSING ELEMENT, exactly once in src/styles", () => {
        /* THE LAW IS ELEMENT-SCOPED, NOT ROOT-SCOPED. An unregistered custom
           property substitutes its `var()` references at the element it is
           DECLARED on, so a `:root` declaration bakes the PAGE's `--background`
           into the token every host then inherits — every groove painting the
           same page-derived colour whatever `--background` its own host sets.
           Measured before the cure: a nested host with `--background: hsl(210
           60% 30%)` still painted L* 93.77, and the dock-crest rim painted
           L* 93.77 over an L* 89.96 crest — a recess reading RAISED.

           Two mutations bite: (a) move the declaration back to any `:root`-ish
           token partial and the selector match below fails; (b) add a per-mode
           arm anywhere else under src/styles (a `.dark` re-fork is the standing
           temptation) and the repo-wide count leaves 1. */
        expect(WELL).toMatch(
            /\.track-well,\s*\n\s*\.track-ground\s*\{[^}]*--track-well-recess:\s*oklch\(from var\(--background\)/,
        );
        const declarations = STYLE_FILES.flatMap((file) =>
            [...readFileSync(file, "utf8").matchAll(/--track-well-recess\s*:/g)].map(
                () => file,
            ),
        );
        expect(declarations).toHaveLength(1);
        expect(declarations[0]).toBe(resolve(ROOT, "src/styles/track-well.css"));
        // the token layer keeps the prose and none of the law (comments stripped, so
        // an explanation can never satisfy the clause the way a declaration would)
        expect(stripComments(TOKENS)).not.toMatch(/--track-well-recess/);
        expect(PROGRESS).toContain("var(--track-well-recess)");
        expect(RIM_STYLES).toContain("var(--track-well-recess)");
        // the rim cannot take the groove's clip, so it composes the GROUND class
        expect(src("components/scroll-progress-rim/ScrollProgressRim.vue")).toContain(
            "scroll-progress-rim__track track-ground",
        );
    });

    it("J-9 — the rim spectrum is the rainbow REGISTER and the band is under 4px", () => {
        /* #74's scoped gate, discharged inside #88's cut. RED at HEAD: the rim
           hard-coded six `--section-color-*` indices (the DEMO's per-route identity
           scale — zero `--rainbow-*` consumers) on a 4px band. Mutation: put a
           `--section-color-*` stop back, or take the width to 4px. */
        const rim = stripComments(src("components/scroll-progress-rim/ScrollProgressRim.vue"));
        const rungs = [...rim.matchAll(/var\(--rainbow-[a-z]+\)/g)].map((m) => m[0]);
        expect(rungs.length).toBeGreaterThanOrEqual(1);
        expect(rim).not.toMatch(/--section-color-/);
        expect(stripComments(RIM_STYLES)).not.toMatch(/--section-color-/);
        const width = /--scroll-progress-rim-width:\s*([\d.]+)px/.exec(
            stripComments(RIM_STYLES),
        );
        expect(width).not.toBeNull();
        expect(Number(width![1])).toBeLessThan(4);
    });
});

describe("the five unit cases — each with the mutation that bites", () => {
    it("T-SIZE-1 — three size rungs resolve 8/12/20 and the story binds the prop", () => {
        // Mutation: re-add `h-6` to the story, or collapse two rungs to one value.
        const body = stripComments(PROGRESS);
        expect(body).toMatch(/\[data-size="sm"\][\s\S]{0,80}?--progress-rung:\s*0\.5rem/);
        expect(body).toMatch(/\[data-size="md"\][\s\S]{0,80}?--progress-rung:\s*0\.75rem/);
        expect(body).toMatch(/\[data-size="lg"\][\s\S]{0,80}?--progress-rung:\s*1\.25rem/);

        const story = readFileSync(
            resolve(ROOT, "demo/stories/feedback/progress.vue"),
            "utf8",
        );
        expect(story).not.toMatch(/<Progress[^>]*class="h-[\d.]+/);
        expect(story).toMatch(/:size="size"/);

        for (const size of ["sm", "md", "lg"] as const) {
            const wrapper = mount(Progress, { props: { modelValue: 62, size } });
            expect(wrapper.get(".progress-rail").attributes("data-size")).toBe(size);
        }
    });

    it("T-PRM-1 — the vertical indeterminate arm has no orientation-specific ramp", () => {
        // Mutation: restore `:183`'s (0,3,0) vertical gradient — it beat the PRM arm
        // on `background-size`, so S3's vertical half re-lands invisibly without this.
        const body = stripComments(PROGRESS);
        expect(body).not.toMatch(
            /\[data-orientation="vertical"\]\[data-indeterminate\]/,
        );
        const vertical = mount(Progress, {
            props: { modelValue: null, orientation: "vertical" },
        });
        expect(vertical.get(".progress-rail").classes()).toContain("track-flow");
        expect(vertical.get(".progress-rail").attributes("data-orientation")).toBe(
            "vertical",
        );
    });

    it("T-VT-1 — aria-valuetext is non-null on every mount and valuenow is ≤2dp", () => {
        // Mutation: drop the rounding, or drop `:get-value-text`.
        const determinate = mount(Progress, { props: { modelValue: 40 } });
        expect(determinate.get('[role="progressbar"]').attributes("aria-valuetext")).toBe(
            "40%",
        );

        const raw = mount(Progress, { props: { modelValue: 1 / 3, max: 1 } });
        expect(raw.get('[role="progressbar"]').attributes("aria-valuenow")).toBe("0.33");

        const indeterminate = mount(Progress, { props: { modelValue: null } });
        expect(
            indeterminate.get('[role="progressbar"]').attributes("aria-valuetext"),
        ).toBe("in progress");

        const failed = mount(Progress, {
            props: { modelValue: 63, status: "error" },
        });
        expect(failed.get('[role="progressbar"]').attributes("aria-valuetext")).toBe(
            "failed at 63%",
        );
    });

    it("T-NAME-1 — the NAME channel never carries the value", () => {
        // reka's `getValueLabel` default writes `aria-label="N%"` — the value wearing
        // the name's cargo. Mutation: drop the `:get-value-label` override.
        const unnamed = mount(Progress, { props: { modelValue: 40 } });
        expect(unnamed.get('[role="progressbar"]').attributes("aria-label")).toBeUndefined();

        const named = mount(Progress, {
            props: { modelValue: 40 },
            attrs: { "aria-label": "Upload" },
        });
        expect(named.get('[role="progressbar"]').attributes("aria-label")).toBe("Upload");
    });

    it("T-MARK-1 — the rim composes the shared marks and declares no local dot recipe", () => {
        // Mutation: re-fork the dots (`.scroll-progress-rim__dot`).
        expect(stripComments(RIM_STYLES)).not.toMatch(/scroll-progress-rim__dot/);
        // and the rim's track must NOT compose the well: its 6px dots on a 4px band
        // overflow by 1px per cross edge and `overflow: hidden` would clip them.
        expect(stripComments(RIM_STYLES)).not.toMatch(/__track[^{]*\{[^}]*overflow/);

        const wrapper = mount(ScrollProgressRim, {
            props: { value: 2.07, max: 4, segments: [1, 0.72, 0.35, 0] },
        });
        const marks = wrapper.findAll(".glass-value-mark");
        expect(marks).toHaveLength(4);
        // centres 12.5 / 37.5 / 62.5 / 87.5% against a 51.75% fill
        expect(
            marks.map((mark) => mark.attributes("data-consumed") !== undefined),
        ).toEqual([true, true, false, false]);
    });
});
