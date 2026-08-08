import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// BK #87 W-MARKS — THE INERT-MARK REGISTER's close battery (CWT-3 §LANE
// display-atoms §5, source arms).
//
// WHAT THIS IS AND IS NOT. §5 specifies four gates, three of them π (measured in
// a real engine at real paint). Those stay π rows — a computed `backdropFilter`,
// a measured rect, a frame-sampled animation are not things a source scanner can
// honestly claim. What a source scanner CAN own is the MECHANISM: whether the
// declaration that produced the defect is still in the tree. Every row below is
// therefore a mechanism assertion with its detector stated verbatim, and every one
// of them was RED at `HEAD` before this wave — the HEAD reading is quoted on each.
//
// ZERO SEATS MINTED. This suite is not a §B.5 gate seat and enrolls in no roster;
// the register receipt (`node scripts/gate-register.mjs`) is byte-identical across
// this wave. It is a CSS-source suite in a directory of CSS-source suites.

const REPO_ROOT = process.cwd();

/**
 * EVERY ROW BELOW SCANS CODE, NEVER PROSE. This wave's own comments name the
 * declarations it deleted — `wrap-anywhere`, `50%`, `block-size: 100%`,
 * `badge-atom--glass` — because a strike that does not say what it struck is a
 * strike nobody can audit later. A detector that greps the raw file therefore
 * fires on the explanation of the cure and calls it the defect. Comments are
 * stripped first, and this is the one place that is true for all of them.
 */
const stripComments = (text: string): string =>
    text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

const read = (rel: string): string =>
    stripComments(readFileSync(join(REPO_ROOT, rel), "utf8"));

const MARK_CSS = "src/styles/glass/mark.css";
const GLASS_CSS = "src/styles/glass.css";
const GLASS_ATOM = "src/styles/glass/glass-atom.css";
const SEPARATOR = "src/components/separator/Separator.vue";
const SKELETON = "src/components/skeleton/Skeleton.vue";
const STATUS_DOT = "src/components/status-dot/StatusDot.vue";
const AVATAR_CSS = "src/components/avatar/styles.css";
const BADGE_INDEX = "src/components/badge/index.ts";
const LABEL = "src/components/label/Label.vue";
const COLOR_RADIUS = "src/styles/tokens/color-radius.css";

/** The six members of the register, by the root class each one paints on. */
const MEMBER_ROOTS = [
    ".badge-atom",
    ".separator",
    ".label",
    ".avatar",
    ".skeleton",
    ".status-dot",
] as const;

/** Every file that carries a member's own declarations. */
const MEMBER_SOURCES = [
    GLASS_ATOM,
    SEPARATOR,
    LABEL,
    AVATAR_CSS,
    SKELETON,
    STATUS_DOT,
] as const;

describe("BK #87 · the inert-mark register", () => {
    // DETECTOR: `src/styles/glass/mark.css` declares `backdrop-filter: none` in a
    // selector naming all six member roots, and glass.css @imports it.
    // HEAD: `git show HEAD:src/styles/glass/mark.css` → "exists on disk, but not
    // in 'HEAD'". The register had no file. RED.
    it("states the one engine-invariant glass claim as a rule, for all six members", () => {
        const css = read(MARK_CSS);
        const law = /:where\(([^)]*)\)\s*\{[^}]*backdrop-filter:\s*none/.exec(css);

        expect(law).not.toBeNull();
        for (const root of MEMBER_ROOTS) expect(law![1]).toContain(root);
        expect(read(GLASS_CSS)).toContain('@import "./glass/mark.css";');
    });

    // DETECTOR: zero `:hover` / `:active` / `:focus` rules across the six member
    // sources. This one was GREEN at HEAD BY OMISSION — six components that
    // happened never to author one — and that is exactly the state the register
    // exists to convert into law: it is a REGRESSION fence, stated as such rather
    // than dressed up as a cure. K13's falsifier is the ground: a hover
    // affordance on a non-interactive mark sticks after a tap on touch.
    it("authors no hover, press or focus affordance on any member", () => {
        const offenders = MEMBER_SOURCES.filter((rel) =>
            /:(?:hover|active|focus(?:-visible)?)\b/.test(read(rel)),
        );

        expect(offenders).toEqual([]);
    });

    // DETECTOR: `--separator-ink` has zero references anywhere in `src/`.
    // HEAD: `git grep -c -- "--separator-ink" HEAD -- src` → Separator.vue:2,
    // color-radius.css:2 (a declaration plus its prose, and two reads). Five
    // divider implementations wore five inks, none on the ladder. RED.
    it("retires the fifth divider ink onto the one-ink ladder", () => {
        expect(read(COLOR_RADIUS)).not.toMatch(/^\s*--separator-ink:/m);
        expect(read(SEPARATOR)).not.toContain("var(--separator-ink)");
        expect(read(SEPARATOR)).toContain("var(--ink-seam)");
    });

    // DETECTOR: the vertical separator declares `align-self: stretch` and no
    // `block-size: 100%`; the labelled host un-clamps its own block-size at a
    // selector carrying BOTH the class and the orientation attribute — (0,2,0),
    // the same specificity as the hairline clamp it must beat.
    // HEAD: `block-size: 100%` present ×1 (D3, measured 1.00 × 0.00 in both
    // engines) and no labelled un-clamp at all (D2, a 1246 × 1.00 host with its
    // 18.70px label hanging 8.84px outside it). RED on both arms.
    it("gives both separator arms a box that exists", () => {
        const css = read(SEPARATOR);

        expect(css).not.toContain("block-size: 100%");
        expect(css).toMatch(
            /\.separator\[data-orientation="vertical"\]\s*\{[^}]*align-self:\s*stretch/,
        );
        expect(css).toMatch(
            /\.separator-labelled\[data-orientation="horizontal"\]\s*\{[^}]*block-size:\s*auto/,
        );
    });

    // DETECTOR: the skeleton carries ONE animation; its cycle is `alternate`; its
    // timing is a canon ease and never `linear`; and no property it animates has
    // travel that scales with the box's own inline-size (no transform/translate,
    // no `will-change`, no band `::after`).
    // HEAD: `skeleton-scan|will-change|translate3d` → 5 hits; the animation read
    // `skeleton-scan var(--duration-shimmer-fast) ease-in-out infinite` — an ease
    // on a ONE-WAY loop (71.3% of the cycle parked off-box, zero-velocity seam
    // stall) travelling 220% of its own width in a fixed clock (157 vs 914 px/s,
    // 5.8× on one route). RED.
    //
    // THE MUTATION THAT BITES: retune the clock and keep the ±110% translate —
    // still RED, because the travel term is what this row measures, not the
    // duration. That is the point of it.
    it("closes F24 at the mechanism, not at the clock", () => {
        const css = read(SKELETON);
        const animations = css.match(/^\s*animation:\s*([^;]+);/gm) ?? [];
        const running = animations.filter((line) => !/animation:\s*none/.test(line));

        expect(running).toHaveLength(1);
        expect(running[0]).toContain("alternate");
        expect(running[0]).toContain("var(--ease-standard)");
        expect(running[0]).not.toMatch(/\blinear\b/);
        expect(css).not.toMatch(/translate3d|will-change|skeleton-scan/);
        expect(css).toContain("@keyframes skeleton-breathe");
    });

    // DETECTOR: every member of `STATUS_DOT_STATES` matches an EXPLICIT
    // `[data-state="<state>"]` rule in the SFC; `active` additionally carries a
    // resting `::after`; and the file spells zero `50%` radii.
    // HEAD: `data-state="active"` → 0 occurrences (D9 — the README-headline state
    // had no rule at all and fell through to a default that painted the live
    // `--info` blue, so an 8th state would ship as live), and `border-radius: 50%`
    // → 4, in a file that reads `--radius-pill` correctly elsewhere. RED on both.
    it("gives every status state an explicit rule, and `active` a resting silhouette", () => {
        const css = read(STATUS_DOT);
        const states = [
            "active",
            "idle",
            "online",
            "success",
            "warning",
            "error",
            "unknown",
        ];

        for (const state of states) {
            expect(css).toContain(`.feedback-mark[data-state="${state}"]`);
        }
        expect(css).toMatch(
            /\.feedback-mark\[data-state="active"\]::after\s*\{[^}]*opacity:\s*0\.28/,
        );
        expect(css).not.toMatch(/border-radius:\s*50%/);
        // The unhandled default paints the UNKNOWN mark, never a live one.
        expect(css).toMatch(
            /\.feedback-mark\s*\{[^}]*--feedback-state-color:\s*var\(--muted-foreground\)/,
        );
    });

    // DETECTOR: no `.badge-atom*` rule declares a `border` shorthand or
    // `border-width`; the outline and contrast arms both paint an inset ring; and
    // the `surface="glass"` register (its class, its strength knob and its
    // seven-rule tint map) is gone.
    // HEAD: two `border: 1px solid …` declarations under `.badge-atom` — one on
    // the outline variant, one inside the `prefers-contrast: more` arm — each
    // adding +2.00px of layout box at every rung beside a comment claiming the
    // edge "adds zero layout box" (D7, self-concealed by the contrast arm). RED.
    it("gives the badge one edge mechanism and no glass register", () => {
        const css = read(GLASS_ATOM);
        const badgeRules = css.match(/\.badge-atom[^{]*\{[^}]*\}/g) ?? [];

        expect(badgeRules.length).toBeGreaterThan(0);
        for (const rule of badgeRules) {
            expect(rule).not.toMatch(/^\s*border(?:-width)?:/m);
        }
        expect(css).toContain("inset 0 0 0 1px");
        expect(css).not.toContain("badge-atom--glass");
        expect(css).not.toContain("--badge-glass-strength");
        expect(read(BADGE_INDEX)).not.toContain("surface");
    });

    // DETECTOR: `avatar/styles.css` layers ONLY the shape seam — every
    // `@layer components` block in the file declares `border-radius` and nothing
    // else — which is the split Skeleton documents at its own `:38-47`.
    // HEAD: the file opened with `@layer components {` on line 1 and closed on the
    // last line: EVERY rule, including the type ladder, sat in the low-priority
    // layer, so an unlayered demo rule outranked the md fallback and one page
    // painted two different md type sizes (14.384 ×4 and 20.352 ×1). RED.
    it("layers the avatar's shape seam only", () => {
        const css = read(AVATAR_CSS);
        const layers = css.match(/@layer components\s*\{([\s\S]*?)\n\}/g) ?? [];

        expect(layers).toHaveLength(1);
        const properties =
            layers[0]!.match(/^\s{8}([a-z-]+):/gm)?.map((m) => m.trim().slice(0, -1)) ?? [];
        expect([...new Set(properties)]).toEqual(["border-radius"]);
        // The φ ladder: `sm` IS the control rung, `md`/`lg` are φ and φ² of it.
        expect(css).toContain("--avatar-size: var(--control-h-md)");
        expect(css).toContain("calc(var(--control-h-md) * 1.618)");
        expect(css).toContain("calc(var(--control-h-md) * 2.618)");
        expect(css).not.toContain("8rem");
        // The status slot's em seam (S15/D34) — a font-size, because the mark's own
        // `--feedback-mark-size` declaration beats any inherited value.
        expect(css).toMatch(
            /\.avatar__status\s*\{[^}]*font-size:\s*calc\(var\(--avatar-size\)\s*\/\s*2\)/,
        );
    });

    // DETECTOR: the badge base authors neither `wrap-anywhere` nor a frozen glyph
    // size, and the label reads the budgeted `--control-label` rung.
    // HEAD: `wrap-anywhere|ui-glyph-sm` → 1 line carrying both, applied to 39/39
    // badges ("Paid" breaking as P/ai/d), with the glyph frozen at every rung
    // (D23/D24). Label read `--type-small`, the same source `--control-text`
    // derives from, so a label and the value it annotates rendered at ratio 1.000
    // desktop / 0.667 coarse against the ruled 0.887 (D12). RED on both.
    it("puts the annotation type register on the budgeted rungs", () => {
        const badge = read(BADGE_INDEX);

        expect(badge).not.toContain("wrap-anywhere");
        expect(badge).toContain("whitespace-nowrap");
        expect(badge).not.toContain("--ui-glyph-sm");
        expect(badge).toContain("size-[1em]");
        expect(badge).toContain("var(--control-label)");

        const label = read(LABEL);
        expect(label).toMatch(/\.label\s*\{[^}]*font-size:\s*var\(--control-label\)/);
        expect(label).not.toContain("var(--type-small)");
        // D13 — a pristine required field no longer wears the exact error red.
        expect(label).not.toContain("var(--destructive)");
    });
});
