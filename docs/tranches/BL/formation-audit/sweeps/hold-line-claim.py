"""Class sweep: a static gate whose pattern catches fewer spellings than the claim it states, or that forbids the
cure its own spec writes (pass 11 FK-01; pass 12 FL-01, FL-02, FL-03; pass 13 FM-01 to FM-05).

A static gate that forbids something holds its cure once its wave lands: a born-RED row goes green and becomes the
line that keeps the cure in place, exactly as a labelled hold line does today. Its bite is the regression its claim
names, and it must bite on a CURED tree, not only at HEAD, where the live defect makes the gate red whatever is
planted (pass 12 FL-01: W-0.8 G19's recorded bite read exit 1 at HEAD through the live `layers.css:349` and exit 0
on a cured tree). Fix-12's version of this sweep read only the gates that are hold lines today (FL-03); this one
reads every static gate that forbids something, hold line or born RED.

In scope: every unstruck §5 row whose first span is static (`!`, `test`, `grep`, `git grep`, `rg`, `sed`, `awk`; no
build, browser, network, `node` or placeholder) and forbids something: a negated clause, `test -z`, a zero or
bounded count (`-eq 0`, `= 0`, `-le n`, `-eq 1`, `= 1`), an `awk` exit, `test ! -e`, a value that must name one
file, or a printed count whose pass value is 0. Out of scope, by rule: a row whose static spans assert presence
only (`test -f`, a positive `grep -q`, `-ge n`, a version string), which fails closed on a spelling it does not
know, so its cure cannot slip past it; and a row whose first span is a test file or harness (its static spans
are fragments of a measured reading).

Each in-scope row needs a CLAIMS entry; a row without one is OPEN UNREAD. The entry is this seat's reading of the
row's claim (pass cell, title, and the §3 text it holds), in one of three kinds:

  S  a shape: red plants are the other spellings of the regression, green plants the forms the cure writes
  L  a literal: the claim is the symbol, file, phrase or docket row the gate names, and the gate's own bite (the
     stripped line, re-planted) is its spelling; the note says why
  H  held in paint: a measured gate of the same wave (named, and checked to exist and to carry no static span)
     reads the claim in every spelling; this row is its static shadow and is held to its own bite only

For each entry the sweep, in a checkout of HEAD:

  1. builds a CURED base: the entry's cure ops, then, for each absence clause it can read, the lines its own
     search reports are deleted (the search re-run with `-n`, `-q`/`-c`/`-l` dropped), and a `test ! -e` path is
     removed; this repeats until the gate passes or nothing is left to strip. Text a cure op wrote must survive
     the strip: a gate whose own search deletes the spec's cure is open CURE (pass 13 FM-04);
  2. re-plants the first stripped line (the row's own bite, on the cured base; not for a bounded count, whose bite
     is a red plant) and each red plant: each must fail the gate; each green plant must pass it;
  3. restores every file byte for byte and removes every file it created.

  UNREAD  an in-scope row with no CLAIMS entry
  CURE    the cured base does not pass (the gate cannot pass, or the entry's cure is wrong or stale)
  HEAD    a labelled hold line that does not pass at HEAD
  NOBITE  the re-planted line passes the gate on the cured base (the recorded bite does not bite once cured), or
          the row has no bite at all
  NARROW  a red plant passes the gate on the cured base
  WIDE    a green plant fails the gate on the cured base
  HELD    an H entry whose named gate is not a measured row of the same wave
  STALE   a CLAIMS entry that matches no in-scope row
  NOSPEC  an S entry with no quote of its cure from the wave spec (outside §5), or a quote the spec does not hold
  NOCURE  an S entry with no C plant (the spec's cure form, which must pass) and no `deletion` mark
  NOUN    a class, custom property or dotted or called name that the gate's title, pass cell or the spec quote
          names in backticks, and that no plant of the entry carries

The last three are pass 13 FM-05's cure: an entry's plants were this seat's guesses, so a spelling no seat thought
of passed both gate and sweep, and a gate that forbade the spec's own cure passed, because the cured base was the
gate's hits deleted, never the spec's form. SPEC (after CLAIMS) carries each S entry's quote, cure form and the
plants its nouns require.

A gate that reads the index (`git ls-files`) is planted through its listing: the span is run with each
`git ls-files <args>` replaced by that listing less the entry's `ls_cure` names, plus the planted path. Plants go
into tracked files, so a `git grep` span reads them. Usage: hold-line-claim.py <root>, where <root> is a checkout
of HEAD (a worktree). Exit 1 while any row is open. BL_ROOT reads another copy of the plan.
"""
import os
import re
import shlex
import shutil
import subprocess
import sys

from gates import gates
from plan_dag import text

STATIC = re.compile(r"^\s*(?:!\s*)?(?:test|grep|git grep|rg|sed|awk)\b")
HEAVY = re.compile(r"\b(npx|npm|vitest|playwright|vite|gh|curl|node|plutil)\b|\$H\b|\$D3_OUT|\bdist/|dist-demo/|\.cache/|<(?!/?style\b)[A-Za-z][^<>]*>|…")  # a `<placeholder>`; an awk `/<style/` or a regex `[<>]` is not one
FORBIDS = re.compile(r"^\s*!|&&\s*!|-eq 0|\B= 0\b|-le \d|-eq 1\b|\" = 1\b|test -z|test ! -e|^\s*awk\b|^\s*rg -c\b|\)\" = (?:src|demo|tests|scripts)/")
BOUNDED = re.compile(r"-le [1-9]|-eq [1-9]|\" = [1-9]|\)\" = (?:src|demo|tests|scripts)/")

GL = "src/styles/glass/material.css"
LY = "src/components/dock/styles/layers.css"
T6 = ".x::after { %s }"


def S(*plants, cure=(), only=None, printed=False, ls_cure=None, spec=None, deletion=None):
    return {"kind": "S", "plants": list(plants), "cure": list(cure), "only": only, "printed": printed, "ls_cure": ls_cure,
            "spec": spec, "deletion": deletion}


def L(why, *plants, cure=(), only=None, ls_cure=None):
    return {"kind": "L", "why": why, "plants": list(plants), "cure": list(cure), "only": only, "printed": False, "ls_cure": ls_cure}


def H(gid, why, *plants, cure=(), only=None):
    return {"kind": "H", "held": gid, "why": why, "plants": list(plants), "cure": list(cure), "only": only, "printed": False, "ls_cure": None}


def R(f, text, what):
    return (f, text, "red", what)


def G(f, text, what):
    return (f, text, "green", what)


def C(f, text, what):
    """A green plant that is the spec's own cure form, written as the spec writes it (pass 13 FM-05)."""
    return (f, text, "cure", what)


DOCKET = L("PLAN §1 fixes the docket template and LEDGER §4 writes the answer cell as a bare `pending`; fail-open-gates.py arm DOCKET holds the cell's form")
GONE = "the claim is that this named symbol, token, file or phrase is gone; it has no second spelling a cure or a regression would write"

CLAIMS = {
    # ---------------------------------------------------------------- band 0
    ("W-0.10", "G3"): S(  # "no anchor part is published anywhere in the library, beside the `reference` prop"
        R("src/components/popover/index.ts", 'export { PopoverAnchor } from "reka-ui";', "the part re-exported from the popover barrel"),
        R("src/index.ts", 'export { PopoverAnchor } from "reka-ui";', "the part re-exported from the root barrel"),
        R("src/components/tooltip/index.ts", 'export { PopperAnchor as TooltipAnchor } from "reka-ui";', "the anchor published under the tooltip"),
    ),
    ("W-0.2", "G3"): S(  # "every read falls back to a token, or to `transparent`; no colour literal"
        R("src/components/toggle-group/styles.css", ".x { color: var(--toggle-tint, #888); }", "a hex fallback"),
        R("src/components/toggle-group/styles.css", ".x { color: var(--toggle-tint,#888); }", "a hex fallback, unspaced"),
        R("src/components/toggle-group/styles.css", ".x { color: var(--toggle-tint, oklch(0.5 0 0)); }", "a colour function fallback"),
        R("src/components/toggle-group/styles.css", ".x { color: var(--toggle-tint, color-mix(in oklab, var(--foreground) 40%, white)); }", "a mix of a token and a literal"),
        R("src/components/toggle-group/styles.css", ".x { color: var(--toggle-tint, var(--foreground, #888)); }", "a token with a literal fallback of its own"),
        G("src/components/toggle-group/styles.css", ".x { --control-edge-ring: 0 0 0 1px color-mix(in oklab, var(--toggle-tint, transparent) 40%, transparent); background-color: color-mix(in oklab, var(--toggle-tint, var(--foreground)) 12%, transparent); color: color-mix(in oklab, var(--toggle-tint, var(--foreground)) 90%, var(--foreground)); }", "§3's template lines"),
    ),
    ("W-0.3", "G4"): H("G1", "a truncation in any spelling (class order, `text-ellipsis`, a stylesheet `text-overflow`) reads as `scrollWidth > clientWidth` in G1's nine rows"),
    ("W-0.3", "G9"): H("G7", "G7 reads the computed `text-overflow` and `scrollWidth` at both sites",
        R("src/components/easing/EasingPicker.vue", '<code ref="readoutEl" class="truncate">x</code>', "the readout truncated again (the row's bite)"),
        cure=[("sub", "src/components/easing/EasingPicker.vue", 'class="min-w-0 truncate text-micro select-text"', 'class="min-w-0 text-micro select-text"'),
              ("sub", "src/components/configurator/ConfiguratorRow.vue", 'class="truncate text-micro font-mono text-muted-foreground"', 'class="text-micro font-mono text-muted-foreground"')]),
    ("W-0.4", "G3"): S(  # "no bare `data-reveal` left in the overlay register" (§3 item 2's writers and readers, §4's files)
        R("src/components/_shared/overlay/content.ts", 'el.dataset.reveal = "menu";', "a writer through `dataset`"),
        R("demo/stories/foundations/motion.vue", "<!-- rides the register bound by data-reveal -->", "a reader §3 item 2 lists in the demo (`foundations/motion.vue:42`)"),
        R("demo/capture/capture.css", "html[data-capture] [data-reveal] { opacity: 1; }", "the capture reader §4 lists (`demo/capture/capture.css:60`)"),
        G("src/components/_shared/overlay/content.ts", '"data-glass-reveal": "menu",', "the namespaced attribute"),
        G("src/composables/motion/reveal/vReveal.ts", 'el.setAttribute("data-reveal", "");', "the vReveal directive's hook, which §3 decision 3 keeps in the minor"),
    ),
    ("W-0.4", "G4"): S(  # "one z site": the role's z lives in the content seam's table, never on a component
        R("src/components/popover/PopoverContent.vue", "        class: ['z-popover', props.class],", "a single-quoted class string"),
        R("src/components/tooltip/TooltipContent.vue", '<div class="rounded z-tooltip">x</div>', "the rung inside a template class list"),
        G("src/components/popover/PopoverContent.vue", "        class: [props.class],", "the class list without a rung"),
        cure=[("append", "src/components/_shared/overlay/content.ts", 'const ROLE_Z = { popover: "z-popover", tooltip: "z-tooltip" };'),
              ("striphits", "git grep -n 'z-tooltip' -- src/components/tooltip")]),
    ("W-0.7", "G2"): S(  # "the records" carry no tranche meta (E-10's grammar: wave ids, dated brackets, row refs, finding and inbound ids, strikes, record cites)
        R("CHANGELOG.md@## 10.2.0", "- the dock collapses as one morph (W-0.8)", "a wave id"),
        R("CHANGELOG.md@## 10.2.0", "- the dock collapses as one morph [2026-10-06]", "a dated bracket"),
        R("CHANGELOG.md@## 10.2.0", "- closes BK #48", "a row ref"),
        R("CHANGELOG.md@## 10.2.0", "- answers O-88", "an inbound id"),
        R("CHANGELOG.md@## 10.2.0", "- ~~the old cap~~", "a strike"),
        R("CHANGELOG.md@## 10.2.0", "- see docs/tranches/BL/PLAN.md", "a record cite"),
        G("CHANGELOG.md@## 10.2.0", "- `GlassDock` takes `scroll: { source, compact?, rim? }`", "a plain entry"),
        cure=[("section", "CHANGELOG.md", "## 10.2.0"), ("section", "MIGRATION.md", "## 10.2.0")]),
    ("W-0.8", "G4"): H("G1", "every used corner circular and the rest half the plate's cross size, in both axes, fails any percentage rest however it is written"),
    ("W-0.8", "G10"): L(GONE),
    ("W-0.8", "G14"): H("G12", "`overrunPx` ≤ 0.5 reads the summary holding its content whatever declaration locks it square",
        R("src/components/dock/styles/morph.css", ".glass-dock .dock-layer--summary {\n    aspect-ratio: 1;\n}", "the square lock put back (the row's bite)"),
        cure=[("sub", "src/components/dock/styles/morph.css", "        aspect-ratio: 1;\n        justify-content: center;", "        justify-content: center;"),
              ("sub", "src/components/dock/styles/morph.css", "        block-size: var(\n            --dock-collapsed-summary-min-size,\n            var(--dock-layer-height, 2.5rem)\n        );\n        height: var(\n            --dock-collapsed-summary-min-size,\n            var(--dock-layer-height, 2.5rem)\n        );\n", "")]),
    ("W-0.8", "G15"): H("G13", "the value-to-unit ink gap at 1, 2 and 3 digits reads the join whatever box rule detaches it"),
    ("W-0.8", "G16"): S(  # "one scroll source": §3.6 removes `collapseOnScroll`, `scrollContainer`, `chromeRef` and `scrollChrome`
        R("src/components/dock/composables/useDockSearch.ts", "    scrollContainer?: Ref<HTMLElement | null>;", "the second removed option"),
        R("src/components/dock/composables/useDockSearch.ts", "    chromeRef?: Ref<HTMLElement | null>;", "the third removed option"),
        R("src/components/dock/composables/useDockSearch.ts", "    return { scrollChrome };", "the removed return"),
        R("src/components/dock/index.ts", 'export type { CollapseOnScrollOptions } from "./composables/useDockSearch";', "the option re-published from the dock barrel"),
        cure=[("striphits", "git grep -nE 'collapseOnScroll|CollapseOnScroll|scrollContainer|chromeRef|scrollChrome' -- src/components/dock/composables/useDockSearch.ts src/components/dock/index.ts"),
              ("append", "src/components/dock/GlassDock.vue", "    scroll?: { source: HTMLElement };")]),
    ("W-0.8", "G18"): DOCKET,
    ("W-0.12", "G1"): S(  # "no rule ... sizes a layer (`.dock-layers`, `.dock-layer--*` as the subject) from a dock state without the morph gate"
        R(LY, ".glass-dock.collapsed .dock-layer--summary { inline-size: 0 }", "a one-line rule (the row's recorded bite)"),
        R(LY, ".glass-dock.expanded .dock-layer--full {\n    width: 0; /* collapse */\n}", "a trailing comment on the declaration line"),
        R(LY, ".glass-dock.expanded .dock-layer--full.is-active {\n    width: 0;\n}", "a compound subject (a second class)"),
        R(LY, ".glass-dock.expanded .dock-layer--full[data-x] {\n    width: 0;\n}", "a compound subject (an attribute)"),
        R(LY, ".glass-dock.expanded .dock-layer--full {\n    max-width: 0;\n}", "max-width"),
        R(LY, ".glass-dock.expanded .dock-layer--full { max-inline-size: 0 }", "max-inline-size"),
        R(LY, ".glass-dock.expanded .dock-layer--full {\n    width:\n    0;\n}", "the value on the next line"),
        R(LY, ".glass-dock.expanded .dock-layer--full { WIDTH: 0 }", "an upper-case property"),
        R(LY, ".glass-dock.collapsed.vertical .dock-layer--summary { block-size: 0 }", "the vertical dock's block size"),
        R(LY, ".glass-dock.collapsed .dock-layer--summary { flex-basis: 0 }", "a flex basis"),
        R(LY, ".glass-dock .x,\n.glass-dock.collapsed .dock-layer--summary { width: 0 }", "the layer as the second item of a selector list"),
        R(LY, '.glass-dock[data-dock-state="collapsed"] .dock-layer--full { width: 0 }', "the state as `data-dock-state`"),
        R(LY, ".glass-dock.compact .dock-layers { width: 0 }", "the chart's fifth state class"),
        R(LY, ".glass-dock.always-expanded .dock-layers { width: 0 }", "the always-expanded state"),
        R(LY, ".glass-dock.collapsed { & .dock-layer--summary { width: 0 } }", "a nested rule"),
        R(LY, ".dock-layer--summary { .glass-dock.collapsed & { width: 0 } }", "a nested rule with the state on the parent side of `&`"),
        R(LY, ".glass-dock.collapsed .dock-layer--summary { @media (min-width: 1px) { width: 0 } }", "a declaration inside a nested at-rule"),
        R(LY, ".glass-dock.collapsed :is(.dock-layer--summary) { width: 0 }", "the layer inside `:is()`"),
        R(LY, ".glass-dock.expanded .dock-layer--full:not([data-morphing]) { width: 0 }", "the morph gate on the layer, which never carries it"),
        R("src/components/dock/GlassDock.vue", "<style>\n.glass-dock.collapsed :deep(.dock-layer--summary) { width: 0 }\n</style>", "a component <style> block"),
        R(LY, ".glass-dock.collapsed .dock-layer { width: 0 }", "the base class both layers carry (`GlassDock.vue:464,478`; pass 13 FM-01)"),
        R(LY, ".glass-dock.collapsed .dock-layer.is-active { inline-size: 0 }", "the base class with a state of its own"),
        R(LY, ".glass-dock.collapsed .dock-layers > * { width: 0 }", "any child of the group"),
        R(LY, ".glass-dock.collapsed .dock-layers > .dock-layer { width: 0 }", "the base class as a child of the group"),
        R(LY, ".glass-dock.collapsed { --x: 0px }\n.dock-layer--full { width: var(--x) }", "a width laundered through a state-set custom property"),
        R(LY, ".glass-dock.collapsed { --x: 0px }\n.glass-dock { --y: calc(var(--x) * 2) }\n.dock-layer { min-height: var(--y) }", "the same through a second custom property"),
        C(LY, ".glass-dock.expanded:not(.fit-content):not([data-morphing]) .dock-layer--full { width: 100% }", "§3 item 1: the rule takes the gate its sibling `:344-346` carries"),
        G(LY, ".glass-dock.collapsed { --x: 0px }\n.glass-dock:not([data-morphing]) .dock-layer--full { width: var(--x) }", "a state-set property read by a gated layer rule"),
        G(LY, ".glass-dock.collapsed:not([data-morphing]) { --x: 0px }\n.dock-layer--full { width: var(--x) }", "a property set under the morph gate"),
        G(LY, ".glass-dock[data-morphing] .dock-layer--full { width: 0 }", "the carrier's own sizing while morphing (no state class)"),
        G(LY, ".glass-dock.collapsed .dock-layer--summary svg { width: 1em }", "a glyph inside a layer (the subject is the svg)"),
        G(LY, ".dock-layer-group.collapsed .dock-layer-switcher { width: 0 }", "the layer group, which is not a layer"),
        G(LY, "/* .glass-dock.collapsed .dock-layer--summary { width: 0 } */", "a comment naming the rule"),
        cure=[("sub", LY, ".glass-dock.expanded:not(.fit-content) .dock-layer--full {", ".glass-dock.expanded:not(.fit-content):not([data-morphing]) .dock-layer--full {")]),
    ("W-0.9", "G1"): S(  # "no anonymous rung": the title reads the named token, never a multiple of the body size
        R("src/components/card/styles.css", ".x { font-size: calc(1.272 * var(--type-body)); }", "the factor written first"),
        R("src/components/card/styles.css", ".x { font-size: calc(var(--type-body)*1.272); }", "unspaced"),
        G("src/components/card/styles.css", ".card-title { font-size: var(--type-card-title); }", "the named rung"),
        G("src/components/card/styles.css", "/* one seed multiplied by 1.272 / 1.618 */", "the HEAD comment's form (`styles.css:24`)"),
    ),
    # ---------------------------------------------------------------- band A
    ("W-A.1", "A1-G3"): S(  # "no literal navigation": no `goto` to a literal path
        R("tests-visual/motion2.spec.ts", "await page.goto('/dock/overview');", "single quotes"),
        R("tests-visual/motion2.spec.ts", "await page.goto(`/dock/overview`);", "a template literal"),
        R("tests-visual/motion2.spec.ts", 'await page.goto("/dock/overview");', "double quotes"),
        G("tests-visual/motion2.spec.ts", "await page.goto(routeOf(\"dock-overview\"));", "a manifest read"),
    ),
    ("W-A.1", "A1-G5"): S(  # "absence fails": no spec skips or parks itself
        R("tests-visual/motion2.spec.ts", 'test.skip("x", async () => {});', "the stated bite"),
        R("tests-visual/motion2.spec.ts", 'it.skip("x", async () => {});', "`it.skip`"),
        R("tests-visual/motion2.spec.ts", 'test.describe.fixme("x", () => {});', "a parked describe"),
        R("tests-visual/motion2.spec.ts", 'describe.fixme("x", () => {});', "`describe.fixme`"),
        G("tests-visual/motion2.spec.ts", "// a test that skips nothing", "a comment"),
    ),
    ("W-A.1", "A1-G9"): S(  # "one OKLab": the matrix lives in one file
        R("tests-visual/motion2.spec.ts", "    const l = .4122214708 * R + 0.5363325363 * G;", "the coefficient without its leading zero"),
        R("tests-visual/motion2.spec.ts", "    const l = 0.4122214708 * R + 0.5363325363 * G;", "a second copy (the row's bite)"),
        cure=[("striphits", "git grep -nE '\\.412221470' -- tests-visual scripts", "tests-visual/aurora-vibrancy.spec.ts")]),
    ("W-A.1", "A1-G10"): S(  # "no output into records": no visual spec or helper writes under `docs/`
        R("tests-visual/motion2.spec.ts", 'const out = "docs/archive/x.png";', "the archive"),
        R("tests-visual/motion2.spec.ts", 'const out = path.join(ROOT, "docs", "tranches", "x.png");', "a joined path"),
        R("tests-visual/pi-gate-verify.mjs", 'const out = "docs/tranches/x.png";', "an `.mjs` helper"),
        G("tests-visual/motion2.spec.ts", 'const out = ".cache/visual/x.png";', "the scratch root"),
    ),
    ("W-A.1", "A1-G12"): L(GONE),
    ("W-A.2", "A2-G3"): L(GONE),
    ("W-A.2", "A2-G6"): L("the F-06 invariant as REG states it, `grep -rE \"#10\\b.*(owed|OWED|π)|π battery\" src tests`; the span is that invariant", only=1),
    ("W-A.2", "A2-G7"): S(  # "no latch"
        R("tests/gates/comment-ratio.test.ts", 'test.fails("x", () => {});', "`test.fails`"),
        R("tests/gates/comment-ratio.test.ts", 'it.fails.each([1])("x", () => {});', "`it.fails.each`"),
        G("tests/gates/comment-ratio.test.ts", '// a latch is a born-RED, never `fails`', "prose"),
    ),
    ("W-A.3", "A3-G2"): L("the job name the release checklist reads", cure=[("write", ".github/workflows/visual.yml", "run: node scripts/wired-list.mjs\n")]),
    ("W-A.3", "A3-G4"): L("the capture tools are named by their leading underscore; W-A.3 moves them, and a capture written without it is a spec, which A3-G3's wired list reads",
        R("tests-visual/_plant-capture.spec.ts", "// a capture tool", "a capture tool put back (the row's bite)"),
        cure=[("rmglob", "tests-visual", r"^_.*\.spec\.ts$")]),
    ("W-A.3", "A3-G6"): L(GONE),
    ("W-A.4", "A4-G2"): S(  # "no forcing remains": no spec forces the WebGL floor or hides WebGPU
        R("tests-visual/no-gray.spec.ts", 'Object.defineProperty(navigator,"gpu",{value:undefined});', "unspaced"),
        R("tests-visual/no-gray.spec.ts", "Object.defineProperty(navigator, 'gpu', { value: undefined });", "single quotes"),
        R("tests-visual/no-gray.spec.ts", "delete (navigator as any).gpu;", "a delete"),
        G("tests-visual/no-gray.spec.ts", "const hasGpu = 'gpu' in navigator;", "a read of the adapter"),
    ),
    ("W-A.4", "A4-G7"): S(  # "no preset literal"
        R("tests-visual/no-gray.spec.ts", "expect(presetKeys).toHaveLength(14);", "`toHaveLength`"),
        R("tests-visual/no-gray.spec.ts", "expect(presetKeys.length).toEqual(14);", "`toEqual`"),
        G("tests-visual/no-gray.spec.ts", "expect(presetKeys.length).toBe(PRESETS.length);", "the count read from the source"),
    ),
    ("W-A.4", "A4-G8"): S(  # "no software substrate leg"
        R(".github/workflows/ci.yml", "      - run: npx playwright test --use-angle=SwiftShader", "mixed case"),
        R(".github/workflows/ci.yml", "      LIBGL_ALWAYS_SOFTWARE: 1 # llvmpipe", "llvmpipe"),
    ),
    ("W-A.5", "A5-G6"): L(GONE),
    ("W-A.6", "A6-G5"): L(GONE),
    ("W-A.6", "A6-G6"): S(  # "no deferral prose"
        R("tests/plant.ts", "// known-live, not gated", "lower case"),
    ),
    # ---------------------------------------------------------------- band B
    ("W-B.1", "B1-G3"): S(  # "no in-tree route to a dead row"
        R("src/index.ts", "// routed to W-DOCK-COLLAPSE", "a route arrow in words"),
        R("src/index.ts", "// rides BK.W-DOCK-COLLAPSE", "a tranche-qualified route"),
        G("src/index.ts", "// the dock collapses as one morph", "plain prose"),
    ),
    ("W-B.10", "B10-G2"): DOCKET,
    ("W-B.13", "B13-G2"): L(GONE),
    ("W-B.13", "B13-G4"): S(R(".github/workflows/release.yml", "# Trusted Publishing (interim)", "title case")),
    ("W-B.14", "B14-G1"): DOCKET,
    ("W-B.15", "B15-G2"): DOCKET,
    ("W-B.15", "B15-G3"): S(  # "the page scroller stays native": no non-passive wheel or touchmove listener in `src`
        R("src/composables/sidebar/useSidebarFollow.ts", 'window.addEventListener("wheel", () => {});', "one-line addEventListener (the stated bite)"),
        R("src/composables/sidebar/useSidebarFollow.ts", 'window.addEventListener(\n    "wheel",\n    () => {},\n);', "addEventListener over several lines (the tree's prettier form, `useDockState.ts:394`)"),
        R("src/composables/sidebar/useSidebarFollow.ts", 'useEventListener(window, "touchmove", () => {});', "vueuse useEventListener"),
        R("src/components/dock/GlassDock.vue", '<div @wheel="() => {}"></div>', "a template @wheel handler"),
        R("src/composables/sidebar/useSidebarFollow.ts", 'h("div", { onWheel: () => {} });', "a render-function onWheel"),
        G("src/composables/sidebar/useSidebarFollow.ts", 'window.addEventListener(\n    "wheel",\n    () => {},\n    { passive: true },\n);', "a passive listener over several lines"),
        G("src/components/dock/GlassDock.vue", '<div @wheel.passive="() => {}"></div>', "a passive template handler"),
    ),
    ("W-B.4", "B4-G3"): DOCKET,
    ("W-B.6", "B6-G3"): DOCKET,
    ("W-B.7", "B7-G1"): L("the deleted component's two names, case-blind (`-i`), cover its kebab, Pascal and camel spellings"),
    ("W-B.9", "B9-G1"): S(  # "off Canvas2D": the constellation draws on the shared WebGPU device
        R("src/components/constellation/constellationField.ts", 'const ctx = canvas.getContext("2d");', "a direct 2D context"),
        R("src/components/constellation/constellationField.ts", "const ctx = canvas.getContext('2d');", "single quotes"),
    ),
    ("W-B.9", "B9-G3"): S(  # "no 2D skin seam"
        R("demo/stories/substrates/constellation.vue", '<GlassConstellation @draw-overlay="paint" />', "the seam as a kebab-case template event"),
    ),
    # ---------------------------------------------------------------- band C
    ("W-C.1", "C1-G1"): S(  # "no tooling under `docs/`"
        R("LS", "docs/x/run.mts", "a TypeScript module"), R("LS", "docs/x/run.cts", "a CommonJS TypeScript module"),
        R("LS", "docs/x/run.tsx", "TSX"), R("LS", "docs/x/run.bash", "a bash script"), R("LS", "docs/x/run.zsh", "a zsh script"),
        G("LS", "docs/x/notes.md", "a record"),
        ls_cure=r"\.(mjs|js|ts|cjs|sh|py|mts|cts|tsx|jsx|bash|zsh)$"),
    ("W-C.1", "C1-G2"): S(  # "no media under `docs/`"
        R("LS", "docs/x/shot.avif", "AVIF"), R("LS", "docs/x/clip.mkv", "MKV"), R("LS", "docs/x/frame.PNG", "upper-case extension"),
        G("LS", "docs/x/notes.md", "a record"),
        ls_cure=r"(?i)\.(png|jpe?g|gif|webp|webm|mp4|mov|ndjson|avif|mkv|bmp|tiff?)$"),
    ("W-C.1", "C1-G3"): L("the two ignore lines the wave strikes (a negated `docs` path and a `docs/` path)"),
    ("W-C.1", "C1-G4"): S(  # "no code reads a record"
        R("scripts/plant.mjs", 'const f = path.join(ROOT, "docs", "tranches", "x.md");', "a joined path"),
        R("scripts/plant.mjs", "const f = '../docs/tranches/x.md';", "a relative path in single quotes"),
        G("scripts/plant.mjs", "// see docs/tranches/BL/PLAN.md", "a comment"),
    ),
    ("W-C.1", "C1-G5"): S(  # "one-commit clones"
        R(".github/workflows/ci.yml", '          fetch-depth: "0"', "a quoted zero"),
        R(".github/workflows/ci.yml", "          fetch-depth:0", "unspaced"),
        G(".github/workflows/ci.yml", "          fetch-depth: 1", "the one-commit clone"),
    ),
    ("W-C.2", "C2-G7"): L("`shadcn`, case-blind, is the residue's one name"),
    ("W-C.3", "C3-G4"): L("the four precepts copies are named by path"),
    ("W-C.3", "C3-G5"): L(GONE),
    ("W-C.3", "C3-G8"): L(GONE),
    ("W-C.4", "C4-G7"): S(  # "utilities are `@utility`": no plain class rule in `src/styles/utilities`
        R("src/styles/utilities/a11y-overrides.css", ".plant:hover {\n  color: red;\n}", "a class rule with a pseudo-class"),
        R("src/styles/utilities/a11y-overrides.css", ".plant,\n.other {\n  color: red;\n}", "a selector list"),
        R("src/styles/utilities/a11y-overrides.css", ".plant{color:red}", "unspaced"),
        G("src/styles/utilities/a11y-overrides.css", "@utility plant {\n  color: red;\n}", "the `@utility` form"),
        printed=True, cure=[("striphits", "rg -n -H --no-heading --pcre2 '^\\s*\\.[a-z][\\w-]*[^{;]*\\{' src/styles/utilities")]),
    ("W-C.4", "C4-G8"): L("the shadcn token names, each matched with its `:` declaration"),
    ("W-C.4", "C4-G9"): L(GONE),
    ("W-C.5", "C5-G7"): S(  # "one randomness source": the seeded PRNG
        R("src/components/typewriter/plant.ts", "const r = crypto.getRandomValues(new Uint32Array(1))[0];", "the platform's other random source"),
        R("src/composables/glass/procedural/prng.ts", "const extra = crypto.getRandomValues(new Uint32Array(2));", "a second `crypto.getRandomValues` read in `prng.ts`"),
        R("src/composables/glass/procedural/prng.ts", "const r = Math.random();", "`Math.random` inside `prng.ts`"),
        R("src/components/typewriter/plant.ts", "const id = crypto.randomUUID();", "`randomUUID`"),
        C("src/components/typewriter/utils/timing.ts", "const rand = mulberry32(seed ?? freshSeed());", "§3 item 7: a caller with no seed takes `freshSeed()` through `mulberry32`; the cure op writes `freshSeed()`, the one read, into `prng.ts` (pass 13 FM-04)"),
        cure=[("striphits", "rg -n 'Math\\.random|getRandomValues|randomUUID' src"),
              ("append", "src/composables/glass/procedural/prng.ts", "export function freshSeed(): number { return crypto.getRandomValues(new Uint32Array(1))[0]; }")]),
    ("W-C.5", "C5-G9"): L(GONE),
    ("W-D.1", "D1-G8"): L(GONE),
    # ---------------------------------------------------------------- band E
    ("W-E.1", "E1-G6"): S(  # "one reader" of the safe-area insets
        R("src/components/sheet/styles.css", ".x { padding-bottom: env( safe-area-inset-bottom ); }", "a spaced `env(`"),
        R("src/components/sheet/styles.css", ".x { padding-bottom: ENV(safe-area-inset-bottom); }", "upper case"),
        G("src/components/sheet/styles.css", ".x { padding-bottom: var(--safe-block-end); }", "the token"),
    ),
    ("W-E.10", "E10-G8"): L(GONE, cure=[("append", "src/components/configurator/Configurator.vue", '<slot name="transport" />')]),
    ("W-E.10", "E10-G9"): L("the one HEAD class string that stacks the row (`ConfiguratorRow.vue:119`); the row's inline mode is read in paint by E10's preview rows"),
    ("W-E.11", "E11-G5"): L("the ruling's one other value, `font-display: optional`"),
    ("W-E.11", "E11-G6"): S(  # "one face per fallback name"
        R("src/styles/typography/scale.css", '@font-face {\n    font-family: "Plus Jakarta Sans Fallback";\n}', "a second face (the row's bite)"),
        R("src/styles/typography/scale.css", "@font-face {\n    font-family: 'Plus Jakarta Sans Fallback';\n}", "a second face, single quotes"),
        R("src/styles/typography/scale.css", '@font-face {\n    font-family:"Plus Jakarta Sans Fallback"\n}', "a second face, unspaced with no semicolon"),
        R("src/styles/typography/scale.css", '@font-face {\n    font-family: "Plus Jakarta Sans Fallback SF";\n}\n@font-face {\n    FONT-FAMILY: \'plus jakarta sans fallback sf\';\n}', "one platform name declared twice, quotes and case changed"),
        C("src/styles/typography/scale.css", '@font-face {\n    font-family: "Plus Jakarta Sans Fallback SF";\n}\n@font-face {\n    font-family: "Plus Jakarta Sans Fallback Segoe";\n}\n@font-face {\n    font-family: "Plus Jakarta Sans Fallback Roboto";\n}\n@font-face {\n    font-family: "Plus Jakarta Sans Fallback Arial";\n}', "§3 item 4's four platform faces, each its own name"),
        cure=[("striphits", "grep -nH 'Plus Jakarta Sans Fallback' src/styles/typography/scale.css", None, 1)]),
    ("W-E.12", "E12-G2"): S(  # "no string-parsed dot"
        R("src/components/pager-dots/worm.ts", "const d = parseFloat(cs.getPropertyValue('--pager-dot-size'));", "single quotes"),
        R("src/components/pager-dots/worm.ts", "const d = parseFloat(cs.getPropertyValue(`--pager-dot-size`));", "a template literal"),
    ),
    ("W-E.13", "E13-G6"): S(  # "one print arm" in the library
        R("src/styles/glass/material.css", "@media screen, print { .x { color: black; } }", "print in a media list"),
        G("src/styles/print.css", "@media print { .x { color: black; } }", "the one arm"),
    ),
    ("W-E.14", "E14-S"): L("the one HEAD token the envelope reads (`configurator-stage-min`); E14-G1 to E14-G3 read the envelope in paint"),
    ("W-E.2", "E2-G9"): L("the static half reads the one HEAD rule; the measured half of the same row (a toast animation ≥ 100 ms under reduce) reads the claim in paint"),
    ("W-E.2", "E2-G11"): L("the static half reads the one HEAD variant; the measured half of the same row (the chevron's computed `none`) reads the claim in paint"),
    ("W-E.2", "E2-G12"): L("the one HEAD side utility the reveal register replaces"),
    ("W-E.3", "E3-G9"): S(  # "one floor authority": the detent floor is one rule and one viewport read
        R("src/components/sheet/detents/use.ts", "const h = innerHeight;", "a bare `innerHeight`"),
        R("src/components/sheet/detents/use.ts", "const h = globalThis.innerHeight;", "`globalThis`"),
        R("src/components/sheet/styles.css", ".x { min-block-size:calc(50vh - 1rem); }", "an unspaced `calc(`"),
        R("src/components/sheet/styles.css", ".x { min-block-size: var(--sheet-floor); }", "the floor read back from `--sheet-floor` (pass 13 FM-03)"),
        R("src/components/sheet/styles.css", ".x { min-height: calc(50vh - 1rem); }", "`min-height`"),
        R("src/components/sheet/styles.css", ".x { min-block-size: max(12rem, 30dvh); }", "`max()`"),
        R("src/components/sheet/styles.css", ".x {\n  MIN-BLOCK-SIZE:\n    12rem;\n}", "upper case, the value on the next line"),
        R("src/components/sheet/SheetContent.vue", '<div class="min-h-[50vh]">x</div>', "a Tailwind floor"),
        R("src/components/sheet/detents/use.ts", "el.style.minHeight = `${floor}px`;", "a script-written floor"),
        R("src/components/sheet/detents/use.ts", "const h = document.documentElement.clientHeight;", "the root's client height"),
        G("src/components/sheet/styles.css", ".x { min-block-size: 0; }", "HEAD's zero floors (`styles.css:118`)"),
        G("src/components/sheet/styles.css", ".x { min-block-size: var(--touch-target); }", "HEAD's grip floor (`styles.css:259`)"),
        C("src/components/sheet/detents/use.ts", "const span = window.visualViewport?.height ?? 0;\nel.style.setProperty(\"--sheet-floor\", `${floor}px`);", "§3 item 3: the span from `visualViewport`, the floor published as `--sheet-floor`"),
    ),
    ("W-E.4", "E4-G15"): L(GONE),
    ("W-E.4", "E4-G19"): S(  # "no off-scale z and no literal offsets"
        R("src/styles/tokens/scheme-motion.css", ":root { --z-toggle:999; }", "unspaced"),
        R("src/components/popover/PopoverContent.vue", '<PopperContent :side-offset="4" />', "a kebab-case template prop"),
        R("src/components/popover/PopoverContent.vue", "const p = { sideOffset:8 };", "unspaced"),
        G("src/components/popover/PopoverContent.vue", "const p = { sideOffset: offsetFor(role) };", "an offset read from the scale"),
    ),
    ("W-E.5", "E5-G9"): S(  # "no slice": the queue keeps every toast
        R("src/components/toast/use-toast.ts", "state.toasts = state.toasts.slice(0,TOAST_LIMIT);", "unspaced"),
        R("src/components/toast/use-toast.ts", "state.toasts.splice(TOAST_LIMIT);", "a splice"),
        R("src/components/toast/use-toast.ts", "state.toasts = state.toasts.slice(-TOAST_LIMIT);", "a slice from the end"),
        G("src/components/toast/use-toast.ts", "const visible = computed(() => window(state.toasts, TOAST_LIMIT));", "a window over the queue"),
    ),
    ("W-E.5", "E5-G10"): S(  # "one title weight"
        R("src/components/toast/ToastTitle.vue", '<div class="font-semibold text-small">x</div>', "the class order swapped"),
    ),
    ("W-E.5", "E5-G13"): L("the one HEAD arbitrary variant that re-inks the close glyph"),
    ("W-E.5", "E5-G14"): S(  # "one stack order"
        R("src/components/toast/styles.css", ".x { flex-direction: column-reverse; }", "the stylesheet form"),
        R("src/components/toast/Toaster.vue", '<ol class="flex flex-col-reverse">', "the stated bite"),
    ),
    ("W-E.6", "E6-G11"): L("X-G8's prop and type names"),
    ("W-E.7", "E7-G9"): S(  # "one width query": the four controls fold on container size
        R("src/components/progress/Progress.vue", "<style>\n@media (width < 40rem) { .x { display: none; } }\n</style>", "range syntax"),
        R("src/components/progress/Progress.vue", "<style>\n@media screen and (max-width: 40rem) { .x { display: none; } }\n</style>", "a media type before the feature"),
        G("src/components/progress/Progress.vue", "<style>\n@container (width < 40rem) { .x { display: none; } }\n</style>", "a container query"),
    ),
    ("W-E.8", "E8-G2"): L("the three off-role radius names, as token and as utility"),
    ("W-E.8", "E8-G4"): S(  # "Metric reads the context radius"
        R("src/components/metric/styles.css", ".x { border-radius: var(--radius-card, 0.75rem); }", "the token with a fallback"),
        G("src/components/metric/styles.css", ".x { border-radius: var(--radius-ctx); }", "the context radius"),
    ),
    ("W-E.9", "E9-G7"): S(  # "no viewport keys in the fold"
        R("src/components/tabs/composables/useTabResponsive.ts", 'const narrow = useMediaQuery("(max-width: 36rem)");', "vueuse `useMediaQuery`"),
        R("src/components/tabs/composables/useTabResponsive.ts", "const narrow = window.innerWidth < 576;", "the window width"),
        R("src/components/labeled-field/LabeledField.vue", "<style>\n@media (max-width:36rem) { .x { display: block; } }\n</style>", "unspaced"),
        R("src/components/labeled-field/LabeledField.vue", "<style>\n@media (width < 36rem) { .x { display: block; } }\n</style>", "range syntax (pass 13 FM-03)"),
        R("src/components/labeled-field/LabeledField.vue", "<style>\n@media (width <= 36rem) { .x { display: block; } }\n</style>", "range syntax, inclusive"),
        R("src/components/labeled-field/LabeledField.vue", "<style>\n@media (max-inline-size: 36rem) { .x { display: block; } }\n</style>", "the logical feature"),
        R("src/components/labeled-field/LabeledField.vue", "<style>\n@media (max-width: 576px) { .x { display: block; } }\n</style>", "the bound in px"),
        R("src/components/labeled-field/LabeledField.vue", "<style>\n@media screen and\n  (MAX-WIDTH: 36rem) { .x { display: block; } }\n</style>", "across lines, upper case"),
        R("src/components/tabs/composables/useTabResponsive.ts", "const { width } = useWindowSize();", "vueuse `useWindowSize`"),
        R("src/components/tabs/composables/useTabResponsive.ts", "const w = window.visualViewport?.width ?? 0;", "the visual viewport"),
        R("src/components/tabs/composables/useTabResponsive.ts", "const w = screen.width;", "the screen"),
        R("src/components/tabs/composables/useTabResponsive.ts", "const w = document.documentElement.clientWidth;", "the root's client width"),
        C("src/components/labeled-field/LabeledField.vue", "<style>\n.labeled-field { container: field / inline-size; }\n@container field (max-width: 36rem) { .x { display: block; } }\n</style>", "§3 item 5's container form"),
        C("src/components/tabs/composables/useTabResponsive.ts", "const ro = new ResizeObserver(([e]) => { fits.value = e.contentRect.width >= strip.value!.scrollWidth; });", "§3 item 4's observer on the strip's own box"),
    ),
    # ---------------------------------------------------------------- band G
    ("W-G.1", "G1-G1"): L("the register's own words (`webgl`, `glsl`, `setupGL`), case-blind, over `src`"),
    ("W-G.1", "G1-G2"): S(  # "no GLSL module"
        R("LS", "src/components/blob/shaders/metaball.glsl", "a raw `.glsl` file"),
        R("LS", "src/components/blob/shaders/metaball.frag", "a raw `.frag` file"),
        G("LS", "src/components/blob/shaders/metaball.wgsl.ts", "a WGSL module"),
        ls_cure=r"\.(glsl|frag|vert)(\.ts)?$"),
    ("W-G.1", "G1-G3"): S(  # "no Canvas2D engine"
        R("src/components/blob/composables/easing.ts", "const ctx = canvas.getContext('2d');", "single quotes"),
        R("src/components/blob/composables/easing.ts", "const ctx = canvas.getContext(`2d`);", "a template literal"),
    ),
    ("W-G.2", "G2-G4"): S(  # "the library never destroys the shared device"
        R("src/composables/glass/webgpu/useWebGPUCanvas.ts", "device.destroy();", "the stated bite"),
        R("src/composables/glass/webgpu/useWebGPUCanvas.ts", "device?.destroy();", "an optional call (W-G.2 §2's own reading uses `device\\??`)"),
        R("src/composables/glass/webgpu/useWebGPUCanvas.ts", "gpuDevice.destroy();", "a prefixed device name"),
        R("src/composables/glass/webgl/visibility.ts", "sharedDevice.destroy();", "a destroy outside `webgpu/` (the claim is the library's)"),
        G("src/composables/glass/webgpu/useWebGPUCanvas.ts", "texture.destroy();", "a resource of the device, not the device"),
    ),
    ("W-G.3", "G3-G7"): S(  # "the sampler is canvas-free"
        R("src/composables/glass/backdropLuminanceSample.ts", "const ctx = c.getContext('2d');", "single quotes"),
    ),
    ("W-G.3", "G3-G8"): S(  # "the prop is gone"
        R("demo/stories/substrates/aurora.vue", '<GlassAurora :background-canvas="c" />', "the prop in kebab case in a template"),
        R("src/components/aurora/Aurora.vue", '<GlassField :background-canvas="c" />', "the prop in kebab case in the library"),
    ),
    ("W-G.4", "G4-G4"): L("the dead config layer's and axis's names"),
    ("W-G.5", "G5-G4"): L("the retired physics' names and the one HEAD formula"),
    ("W-G.5", "G5-G8"): L("the stamp's token prefix"),
    ("W-G.6", "G6-G5"): L("a synchronous pipeline is `create(Render|Compute)Pipeline(`; the async form ends in `Async(`"),
    ("W-G.6", "G6-G7"): S(  # "no per-item label scan"
        R("src/components/sortable-list/useSortable.ts", "const i = items.value.findIndex((x) => x.id === id);", "`findIndex`"),
        R("src/components/toggle-group/ToggleGroup.vue", "const i = ordered.value.findIndex((x) => x === v);", "`findIndex`"),
    ),
    ("W-G.7", "G7-G4"): S(  # "one door": `./aurora` no longer exports the derive bindings
        R("src/components/aurora/index.ts", 'export * from "./derive";', "a star re-export of the derive module"),
        R("src/components/aurora/index.ts", 'export { deriveAurora as derive } from "./derive";', "a renamed re-export (the stated bite)"),
    ),
    # ---------------------------------------------------------------- band H
    ("W-H.1", "G5"): L("`contrast-color(` is the binary ink's one CSS function"),
    ("W-H.1", "G15"): S(  # "the Close ring is the rung"
        R("src/components/dialog/styles.css", ".x { box-shadow: 0 0 0 2px color-mix(in oklab, var(--foreground)48%, transparent); }", "unspaced"),
        R("src/components/dialog/styles.css", ".x { box-shadow: 0 0 0 2px color-mix(in oklab, var(--foreground) 40%, transparent); }", "another literal mix"),
        G("src/components/dialog/styles.css", ".x { box-shadow: 0 0 0 2px var(--ring-rung); }", "the rung"),
    ),
    ("W-H.2", "G9"): L(GONE),
    ("W-H.2", "G10"): DOCKET,
    ("W-H.3", "G1"): DOCKET,
    ("W-H.5", "H5-G2"): L("the static half; the row's measured half (`H2/WELL-INERT` reads `missing`) reads the claim in paint"),
    ("W-H.5", "H5-G3"): L(GONE),
    ("W-H.6", "H6-G3"): S(  # "the overshoot is computed from the rung's radius token (`--glass-blur-<rung>-radius`), never a second value"
        R(GL, T6 % "inset: -32px;", "the stated bite"),
        R(GL, T6 % "inset: -2rem;", "another unit"),
        R(GL, T6 % "inset:-2rem;", "another unit, unspaced"),
        R(GL, T6 % "inset: 0 -32px;", "after a first value"),
        R(GL, T6 % "inset: calc(-1 * 32px);", "a literal in calc()"),
        R(GL, T6 % "inset: calc(0px - 32px);", "a literal difference in calc()"),
        R(GL, T6 % "top: -10%;", "a percentage"),
        R(GL, T6 % "inset-inline-start: -8px;", "a logical side"),
        R(GL, ".x { --glass-overshoot: -32px; }\n.x::after { inset: var(--glass-overshoot); }", "a literal laundered through a custom property"),
        R(GL, T6 % "inset: var(--glass-overshoot);", "a read of a custom property that is not the rung's blur radius"),
        R(GL, ".x { --glass-overshoot: -32px; }", "a negative literal length declared as a custom property (a reader may sit in any stylesheet)"),
        R(GL, T6 % "margin: -32px;", "a negative margin"),
        R(GL, T6 % "margin-block-start: -1rem;", "a negative logical margin"),
        R(GL, ".x::after {\n  inset:\n  -32px;\n}", "the value on the line after its property"),
        R(GL, T6 % "inset: -32PX;", "an upper-case unit"),
        R(GL, T6 % "INSET: -2rem;", "an upper-case property"),
        R(GL, T6 % "inset: calc(var(--radius-ctx) * -1 - 32px);", "a literal beside a token in calc()"),
        R(GL, ".x { --glass-blur-pad: 32px; }\n.x::after { inset: calc(var(--glass-blur-pad) * -1); }", "a positive literal laundered through a `--glass-blur-` name (pass 13 FM-02)"),
        R(GL, ".x { --glass-blur-resting-radius: 32px; }\n.x::after { inset: calc(var(--glass-blur-resting-radius) * -2); }", "the rung's own token re-declared beside the overshoot"),
        R(GL, ".x {\n  color: red;\n  --GLASS-BLUR-quiet-radius:\n    3px;\n}", "a rung token re-declared, upper case, across lines"),
        R(GL, ".x { --glass-level: 4; }", "the level re-declared in a seat file"),
        R(GL, T6 % "inset: calc(var(--glass-blur-resting-radius, 32px) * -2);", "a literal as the token's fallback"),
        R(GL, T6 % "inset: calc(var(--glass-blur-tier-radius) * -2);", "a token that is not one of the five rung radii"),
        R(GL, T6 % "inset: calc(var(--glass-blur-resting) * -2);", "the composed filter token, not the radius"),
        C(GL, T6 % "inset: calc(var(--glass-blur-resting-radius) * var(--glass-level) * -2);", "§3 item 1: two radii of the rung's own token at the element's `--glass-level`"),
        G(GL, T6 % "inset: calc(var(--glass-blur-resting-radius) * -2);", "two blur radii from the rung's own token"),
        G(GL, T6 % "inset: 0;", "HEAD's own `inset: 0` (`material.css:146`)"),
        G(GL, ".x { padding-top: 4px; scroll-margin: -2px; }", "a padding side and a scroll margin (not an inset, side or margin property)"),
    ),
    # ---------------------------------------------------------------- band I
    ("W-I.1", "G11"): L("the cut cap's names and the scroll-timeline properties, each by name"),
    ("W-I.1", "G13"): L(GONE),
    ("W-I.1", "G15"): L(GONE),
    ("W-I.1", "G18"): S(  # "one pointer model"
        R("src/components/dock/styles/run.css", "@media (pointer:coarse) { .x { inline-size: 3rem; } }", "unspaced"),
        R("src/components/dock/styles/run.css", "@media (any-pointer: coarse) { .x { inline-size: 3rem; } }", "`any-pointer`"),
    ),
    ("W-I.2", "G1"): S(  # "no member set read from element children"
        R("src/components/carousel/useCarousel.ts", "const members = [...el.children];", "a spread"),
        R("src/components/deck/composables/useDeckSnap.ts", "const members = Array.from(host.children);", "another element name"),
    ),
    ("W-I.2", "G10"): S(  # "no snap rule targets the run's children"
        R("src/components/dock/styles/run.css", ".dock-run > * {\n    scroll-snap-align: start;\n}", "the stated bite"),
        R("src/components/dock/styles/run.css", ".dock-run>* {\n    scroll-snap-align: start;\n}", "unspaced"),
        R("src/components/dock/styles/run.css", ".dock-run > * {\n    color: red;\n    scroll-snap-align: start;\n}", "the snap two lines into the rule"),
        G("src/components/dock/styles/run.css", ".dock-run[data-overflowing] [data-dock-seat] {\n    scroll-snap-align: start;\n}", "the declared targets"),
        cure=[("striphits", "git grep -n 'scroll-snap-align' -- src/components/dock/styles")]),
    ("W-I.3", "G4"): L(GONE),
    ("W-I.4", "G1"): DOCKET,
    ("W-I.5", "I5-G1"): L("the two retired facilities' names, case-blind"),
    ("W-I.6", "I6-G4"): DOCKET,
    ("W-I.7", "I7-G1"): S(  # "seat transition": the seat's width transition appends to the control's own list
        R("src/components/dock/styles/run.css", ".x { color: red; transition: inline-size 200ms; }", "mid-line"),
        R("src/components/dock/styles/run.css", ".x {\n    transition-property: inline-size;\n}", "`transition-property`"),
        G("src/components/dock/styles/run.css", ".x {\n    transition: var(--icon-button-transition), inline-size var(--spring-dock-duration) var(--spring-dock);\n}", "§3 item 1's appended form"),
    ),
    ("W-I.7", "I7-G2"): S(  # "C-8": no content-box in `src`
        R("src/components/dock/GlassDock.vue", '<div class="box-content">x</div>', "the Tailwind utility"),
        R("src/components/dock/styles/run.css", ".x { box-sizing:content-box; }", "unspaced (the stated bite's other form)"),
    ),
    ("W-I.7", "I7-G3"): S(  # "ring reserve": out of padding
        R("src/components/dock/styles/run.css", ".x { padding: var(--dock-ring-reserve) 0; }", "the shorthand"),
        R("src/components/dock/styles/run.css", ".x { padding-inline: var(--dock-ring-reserve); }", "the inline axis"),
        G("src/components/dock/styles/run.css", ".x { outline-offset: var(--dock-ring-reserve); }", "§3 item 2's outline offset"),
    ),
    # ---------------------------------------------------------------- band J
    ("W-J.1", "G11"): S(  # "Card is not an option"
        R("src/components/card/Card.vue", "    selected?: Boolean;", "a capitalised type"),
        R("src/components/card/Card.vue", "    selected: boolean;", "a required prop"),
    ),
    ("W-J.1", "G12"): S(  # "no Chip cell"
        R("src/components/chip/chipVariants.ts", "    shape: { pill: '', cell: '' },", "the stated bite"),
        R("src/components/chip/Chip.vue", "const shape = props.shape === 'cell';", "single quotes"),
    ),
    ("W-J.1", "G13"): S(  # "one ARIA answer"
        R("src/components/tabs/SegmentedTabs.vue", '<button :aria-pressed="on">x</button>', "a template binding"),
        R("src/components/tabs/SegmentedTabs.vue", 'const a = { "aria-pressed": on };', "double quotes"),
    ),
    ("W-J.2", "G2"): S(  # "one writer", the register's owner
        R("src/components/card/Card.vue", '<div :data-engaged="on">x</div>', "a second Vue writer"),
        R("src/composables/color/index.ts", "el.dataset.engaged = 'true';", "a writer in a composable"),
        cure=[("striphits", "git grep -nE 'data-engaged|dataset\\.engaged' -- src", "src/components/dialog/ModalOverlay.vue")]),
    # ---------------------------------------------------------------- band K
    ("W-K.1", "K1-S"): S(  # "root-relative": no read of the document's active element
        R("src/components/menu/plant.ts", "const a = el.ownerDocument.activeElement;", "through `ownerDocument`"),
        cure=[("append", "src/styles/index.css", ":host { --plant: 1; }")]),
    ("W-K.10", "K10-S"): L("the duplicate text copy's class and the chip's `select-none` string, each the one HEAD site"),
    ("W-K.11", "K11-S"): L("the inverted pin's one literal"),
    ("W-K.2", "K2-S"): L("the modal root's two part names"),
    ("W-K.4", "K4-S"): L("the two ring tokens by name", cure=[("append", "src/components/tabs/SegmentedTabs.vue", "<!-- focus-visible -->")]),
    ("W-K.6", "K6-S"): L("the smooth-scroll literal the deck snap writes", cure=[("append", "src/composables/keyboard/useShortcut.ts", "// isComposing")]),
    ("W-K.7", "K7-S"): L("the swallowed `ready` promise's one HEAD form"),
    ("W-K.9", "K9-S"): L(GONE, cure=[("append", "src/components/collapsible/CollapsibleContent.vue", "<!-- until-found -->")]),
    # ---------------------------------------------------------------- band L
    ("W-L.1", "G-L1-5"): S(  # "`DarkModeGlyph.vue` is the one file in the directory that draws, and the one file in `src` that carries the glyph's geometry"
        R("src/components/dark-mode-toggle/index.ts", "// <svg viewBox=\"0 0 472.39 472.39\">", "a second drawing in the directory (the stated bite)"),
        R("src/components/menu/DropdownMenuItem.vue", '<svg viewBox="0 0 472.39 472.39" aria-hidden="true"></svg>', "the glyph re-drawn by a menu row outside the directory"),
        cure=[("write", "src/components/dark-mode-toggle/DarkModeGlyph.vue", '<template><svg viewBox="0 0 472.39 472.39" aria-hidden="true"></svg></template>\n'),
              ("svgout", "src/components/dark-mode-toggle")]),
    ("W-L.2", "G-L2-11"): L("the one HEAD expression that names a seeded preset custom"),
    ("W-L.3", "G-L3-8"): L("the retired script's name", R(".github/workflows/ci.yml", "      - run: npm run verify:package", "the retired script run again (the row's bite)"), cure=[("append", ".github/workflows/ci.yml", "  consumer-matrix:"), ("write", "scripts/consumer-matrix.mjs", "// declaration-floor\n"),
                                                                 ("striphits", "grep -rn 'verify:package' package.json .github/workflows")]),
    ("W-L.3", "G-L3-9"): S(  # "no static `text-sm`/`text-xs` in its sources (templates and class strings)"
        R("src/components/dock/GlassDock.vue", '<p class="text-sm">x</p>', "a template class (the stated bite)"),
        R("src/components/dock/constants.ts", 'export const PLANT = "md:text-xs";', "a variant class string"),
        R("src/styles/glass/material.css", ".x { @apply text-sm; }", "an @apply in a stylesheet"),
        G("src/components/dock/GlassDock.vue", "<!-- --control-text-sm -->", "the library's own control token"),
        G("src/styles/glass/material.css", "/* a CSS comment that names text-sm */", "a CSS comment naming the rung"),
    ),
    ("W-L.3", "G-L3-10"): L("the deleted utility family's prefix"),
    ("W-L.4", "G-L4-3"): S(  # "one closer": the snap commits once, through the gesture-end helper
        R("src/composables/motion/morph/useDragMorph.ts", "    params.onSnap(target);", "a second commit (the row's bite)"),
        R("src/composables/motion/morph/useDragMorph.ts", "    params.onSnap?.(target);", "an optional call"),
        R("src/composables/motion/morph/useDragMorph.ts", "    const { onSnap } = params; onSnap(target);", "a destructured call"),
        cure=[("striphits", "grep -nHE 'onSnap\\??\\.?\\(' src/composables/motion/morph/useDragMorph.ts", None, 1),
              ("append", "src/composables/motion/morph/useDragMorph.ts", "// useGestureEnd")]),
    ("W-L.6", "G-L6-3"): L("the four named rows, each by its symbol or path"),
    ("W-L.8", "G-L8-2"): S(  # "records": the 11.0.0 sections carry no tranche meta (E-10's grammar)
        R("CHANGELOG.md@## 11.0.0", "- the dock is one plate (W-I.1)", "a wave id"),
        R("CHANGELOG.md@## 11.0.0", "- the dock is one plate [2026-11-01]", "a dated bracket"),
        R("CHANGELOG.md@## 11.0.0", "- closes BK #48", "a row ref"),
        R("CHANGELOG.md@## 11.0.0", "- answers O-85", "an inbound id"),
        R("MIGRATION.md@## 11.0.0", "- ~~`--dock-cap-rest`~~", "a strike"),
        R("MIGRATION.md@## 11.0.0", "- see docs/tranches/BL/FINAL.md", "a record cite"),
        G("CHANGELOG.md@## 11.0.0", "- `GlassDock`'s plate is a stadium at every rest", "a plain entry"),
        cure=[("section", "CHANGELOG.md", "## 11.0.0"), ("section", "MIGRATION.md", "## 11.0.0"),
              ("subre", "MIGRATION.md", r"^## 10\.0\.0 .*$", "## 10.0.0")]),  # W-C.2 (before W-L.8 through W-L.6) strips the heading's meta
    ("W-L.8", "G-L8-14"): S(  # "no loop tooling is tracked at the close"
        R("LS", "scripts/loops/dock/run.mts", "a TypeScript module"), R("LS", "docs/tranches/BL/design/dock/harness/x.bash", "a bash script"),
        ls_cure=r"\.(mjs|js|ts|cjs|sh|py|mts|cts|tsx|jsx|bash|zsh)$"),
    ("W-L.8", "G-L8-15"): L("the retired items, each by its own name, case-blind", R("docs/tranches/BL/FINAL.md", "- W-ATLAS carried", "a retired item re-booked (the row's bite)"), cure=[("write", "docs/tranches/BL/FINAL.md", "# BL close\n")]),
}


# Each S entry's cure, read from its wave spec (pass 13 FM-05). `spec` is a quote from the wave spec outside §5 (or
# "W-x.n: quote" when the cure is stated in another wave); every class, custom property and dotted or called name in
# it, or in the gate's title and pass cell, must appear in some plant. The cure form is a C plant, planted on the
# cured base and required to pass; `deletion` says the cure writes nothing in the gate's files, so the cured base,
# which must pass, is the cure.
DEL = True
SPEC = {
    ("W-0.10", "G3"): dict(spec="No `PopoverAnchor` part is added: one door for the anchor (E-1).",
        plants=[C("src/components/popover/PopoverContent.vue", "    reference?: ReferenceElement;", "the declared `reference` prop")]),
    ("W-0.12", "G1"): dict(spec="the `.dock-layer--full` rule takes the same `:not([data-morphing])` gate its sibling carries"),
    ("W-0.2", "G3"): dict(spec="The pressed rule reads one optional per-item input, `--toggle-tint`, through the three channels the ask names.",
        plants=[C("src/components/toggle-group/styles.css", '.toggle-group__item[data-state="on"]:hover:not(:disabled) {\n    background-color: color-mix(in oklab, var(--toggle-tint, var(--foreground)) 16%, transparent);\n}', "§3's hover line")]),
    ("W-0.4", "G3"): dict(spec="The overlay register moves to `data-glass-reveal`.",
        plants=[C("src/components/_shared/overlay/content.ts", '    "data-glass-reveal": "menu",', "the namespaced attribute")]),
    ("W-0.4", "G4"): dict(spec="const ROLE_Z: Record<OverlayRole, string>",
        plants=[C("src/components/_shared/overlay/content.ts", 'const ROLE_Z: Record<OverlayRole, string> = { hint: "z-tooltip", menu: "z-popover", panel: "z-popover" };', "§3 item 1's table")]),
    ("W-0.7", "G2"): dict(spec="Neither record carries tranche ids, wave ids or dated brackets (E-10).",
        plants=[C("CHANGELOG.md@## 10.2.0", "- The light glass plates read lighter over paper.", "a bullet in the record's own words")]),
    ("W-0.8", "G16"): dict(spec="is the one scroll source",
        plants=[C("src/components/dock/GlassDock.vue", "    scroll?: { source: HTMLElement; compact?: boolean; rim?: boolean };", "the grouped `scroll` prop")]),
    ("W-0.9", "G1"): dict(spec="reads `font-size: var(--type-card-title)`",
        plants=[C("src/components/card/styles.css", ".card-title { font-size: var(--type-card-title); }", "the named rung")]),
    ("W-A.1", "A1-G3"): dict(spec="`gotoScene` resolves through the manifest and throws on a miss.",
        plants=[C("tests-visual/motion2.spec.ts", 'await gotoScene(page, "forms", "select-family-member");', "a manifest navigation")]),
    ("W-A.1", "A1-G5"): dict(spec="After the wave `tests-visual/` holds no `test.skip`, `test.fixme` or `describe.skip`.",
        plants=[R("tests-visual/motion2.spec.ts", 'test.fixme("x", async () => {});', "`test.fixme`"),
                R("tests-visual/motion2.spec.ts", 'describe.skip("x", () => {});', "`describe.skip`"),
                C("tests-visual/motion2.spec.ts", 'await expect(page.locator("[data-slot=dock]")).toHaveCount(1);', "§3 item 3's presence assertion")]),
    ("W-A.1", "A1-G9"): dict(spec="import the one module",
        plants=[C("tests-visual/motion2.spec.ts", 'import { oklab } from "./_support/color";', "a reader of the one module")]),
    ("W-A.1", "A1-G10"): dict(spec="exports `PI_OUT`, which is",
        plants=[C("tests-visual/motion2.spec.ts", 'const out = path.join(PI_OUT, "x.png");', "the one output root")]),
    ("W-A.2", "A2-G7"): dict(spec="Each `it.fails` is replaced by (a) an `owed` roster entry",
        plants=[C("tests/gates/comment-ratio.test.ts", 'it("the share stays under the bound", () => {});', "the latch as a plain `it`")]),
    ("W-A.4", "A4-G2"): dict(spec="no `navigator.gpu` removal",
        plants=[R("tests-visual/no-gray.spec.ts", "delete navigator.gpu;", "a bare delete"),
                C("tests-visual/no-gray.spec.ts", "const adapter = await navigator.gpu.requestAdapter();", "§3 item 1's adapter assertion")]),
    ("W-A.4", "A4-G7"): dict(spec="The literal at `:593` goes; the tile count must equal the sourced key count",
        plants=[C("tests-visual/no-gray.spec.ts", "expect(tiles).toHaveLength(presetKeys.length);", "the sourced count")]),
    ("W-A.4", "A4-G8"): dict(spec="no job runs a substrate floor on SwiftShader, and no job retries", deletion=DEL),
    ("W-A.6", "A6-G6"): dict(spec="`resolvedNested` fence and its", deletion=DEL),
    ("W-B.1", "B1-G3"): dict(spec="never a comment", deletion=DEL),
    ("W-B.13", "B13-G4"): dict(spec="drops the `env:` pair at `:65-66` and the paragraph at `:13-20`", deletion=DEL),
    ("W-B.15", "B15-G3"): dict(spec="native scrolling on the target engines already carries the platform's inertia and overscroll", deletion=DEL),
    ("W-B.9", "B9-G1"): dict(spec="moves off `useCanvas2D` onto the shared WebGPU device",
        plants=[C("src/components/constellation/constellationField.ts", 'import { acquireSharedDevice } from "../../composables/glass/webgpu/webgpuDevice";', "the shared device")]),
    ("W-B.9", "B9-G3"): dict(spec="the consumer stacks its own layer over the host and reads the exposed `field`",
        plants=[C("demo/stories/substrates/constellation.vue", '<div class="story-skin" :style="skinFor(field)" />', "the story's own layer over the exposed field")]),
    ("W-C.1", "C1-G1"): dict(spec="`git rm` every executable file under `docs/`", deletion=DEL),
    ("W-C.1", "C1-G2"): dict(spec="`git rm` every media file under `docs/`", deletion=DEL),
    ("W-C.1", "C1-G4"): dict(spec="Code never reads a record.", deletion=DEL),
    ("W-C.1", "C1-G5"): dict(spec="drop `fetch-depth: 0`", deletion=DEL),
    ("W-C.4", "C4-G7"): dict(spec="The 20 raw rules become `@utility` or are deleted when Tailwind already ships them",
        plants=[C("src/styles/utilities/a11y-overrides.css", "@utility preserve-3d-plant {\n  transform-style: preserve-3d;\n}", "the `@utility` form")]),
    ("W-C.5", "C5-G7"): dict(spec="`prng.ts` gains `freshSeed()` (one `crypto.getRandomValues` read), used where a caller gives no seed."),
    ("W-E.1", "E1-G6"): dict(spec="This file is the only reader of `env(safe-area-inset-*)` in `src` and `demo`.",
        plants=[C("src/components/sheet/styles.css", ".x { padding-block-end: max(var(--space-family), var(--safe-block-end)); }", "§3 item 2's pad")]),
    ("W-E.11", "E11-G6"): dict(spec="Each platform fallback gets its own family name"),
    ("W-E.12", "E12-G2"): dict(spec="takes `geometry.dot` from the first bed dot's",
        plants=[C("src/components/pager-dots/worm.ts", "geometry.dot = beds[0].getBoundingClientRect().width;", "the measured dot")]),
    ("W-E.13", "E13-G6"): dict(spec="is the only `@media print` block in `src/styles`",
        plants=[C("src/styles/print.css", "@media print { :root { color-scheme: light; } }", "the one arm")]),
    ("W-E.3", "E3-G9"): dict(spec="published as `--sheet-floor`"),
    ("W-E.4", "E4-G19"): dict(spec="no component passes a literal `sideOffset`",
        plants=[C("src/components/_shared/overlay/content.ts", "const sideOffset = readOffsetToken(el);", "the seam's one offset, read from a token"),
                C("src/styles/tokens/scheme-motion.css", ":root { --z-toggle: var(--z-raised); }", "a rung of the z scale")]),
    ("W-E.5", "E5-G9"): dict(spec="The viewport renders the first `TOAST_VISIBLE = 5`, oldest first.",
        plants=[C("src/components/toast/use-toast.ts", "const visible = computed(() => state.toasts.slice(0, TOAST_VISIBLE));", "the visible window over the queue")]),
    ("W-E.5", "E5-G10"): dict(spec="`font-semibold` leaves `ToastTitle.vue:14`",
        plants=[C("src/components/toast/ToastTitle.vue", '<div class="toast-title">x</div>', "the title on its one type role")]),
    ("W-E.5", "E5-G14"): dict(spec="`flex-col-reverse` and the `sm:flex-col` override leave `Toaster.vue`.",
        plants=[C("src/components/toast/Toaster.vue", '<ol class="flex flex-col">', "one direction at every width")]),
    ("W-E.7", "E7-G9"): dict(spec="re-keyed to a container query by W-E.9 (LabeledField, SegmentedTabs)",
        plants=[C("src/components/progress/Progress.vue", "<style>\n@container (width < 40rem) { .x { display: none; } }\n</style>", "a container query")]),
    ("W-E.8", "E8-G4"): dict(spec="read `--radius-ctx` in place of `--radius-sm` and `--radius-card`",
        plants=[R("src/components/metric/styles.css", ".x { border-radius: var(--radius-sm); }", "`--radius-sm`"),
                C("src/components/metric/styles.css", ".x { border-radius: var(--radius-ctx); }", "the context radius")]),
    ("W-E.9", "E9-G7"): dict(spec="becomes `@container field (max-width: 36rem)`"),
    ("W-G.1", "G1-G2"): dict(spec="`webgl/` is deleted",
        plants=[C("LS", "src/composables/glass/webgpu/shaders/flow.wgsl.ts", "the WGSL module")]),
    ("W-G.1", "G1-G3"): dict(spec="and so is `canvas2d/useCanvas2D.ts` with its directory", deletion=DEL),
    ("W-G.2", "G2-G4"): dict(spec="the library never calls `destroy()` on the shared device",
        plants=[C("src/composables/glass/webgpu/useWebGPUCanvas.ts", "const off = onDeviceLoss(rebuild);", "§3 item 2's removable handle")]),
    ("W-G.3", "G3-G7"): dict(spec="no `drawImage`, no `getImageData`, no 2D canvas and no `FIELD_ALPHA_FLOOR`", deletion=DEL),
    ("W-G.3", "G3-G8"): dict(spec="`backgroundCanvas` prop is deleted", deletion=DEL),
    ("W-G.6", "G6-G7"): dict(spec="`useSortable` keeps a `Map<SortableId, Item>` computed once per `items` change",
        plants=[C("src/components/sortable-list/useSortable.ts", "const byId = computed(() => new Map(items.value.map((x) => [x.id, x])));", "the membership index")]),
    ("W-G.7", "G7-G4"): dict(spec="a new subpath with a shader-free graph",
        plants=[C("src/components/aurora-palette/index.ts", 'export { deriveAurora, paletteToCssGradient } from "../aurora/derive";', "the bindings through `./aurora-palette`")]),
    ("W-H.1", "G15"): dict(spec="read the ring token; no hand literal remains (S-12)",
        plants=[C("src/components/dialog/styles.css", ".x { box-shadow: 0 0 0 2px var(--ink-perimeter); }", "the perimeter rung")]),
    ("W-H.6", "H6-G3"): dict(spec="The radius it reads is the rung's own token (`--glass-blur-<rung>-radius` at the element's `--glass-level`), never a second value."),
    ("W-I.1", "G18"): dict(spec="are replaced by the tokens W-E.7's coarse-pointer type model publishes",
        plants=[C("src/components/dock/styles/run.css", ".x { font-size: var(--control-text); }", "the shared coarse model's token")]),
    ("W-I.2", "G1"): dict(spec="A single helper, `membersOf(container, marker)`",
        plants=[C("src/components/carousel/useCarousel.ts", 'const members = membersOf(el, "[data-carousel-item]");', "the one member query")]),
    ("W-I.2", "G10"): dict(spec="the snap rule is `.dock-run [data-dock-seat]`",
        plants=[C("src/components/dock/styles/run.css", ".dock-run [data-dock-seat] {\n    scroll-snap-align: start;\n}", "the marker's snap rule")]),
    ("W-I.7", "I7-G1"): dict(spec="The seat's width transition appends to the control's own list",
        plants=[C("src/components/dock/styles/run.css", ".x {\n    transition: var(--icon-button-transition), inline-size var(--spring-dock-duration) var(--spring-dock);\n}", "the appended form")]),
    ("W-I.7", "I7-G2"): dict(spec="The run's box is `border-box` like every other box in the layer contract.",
        plants=[C("src/components/dock/styles/run.css", ".x { box-sizing: border-box; }", "the border box")]),
    ("W-I.7", "I7-G3"): dict(spec="The ring reserve moves out of padding into `outline-offset` on the seats",
        plants=[C("src/components/dock/styles/run.css", ".x { outline-offset: var(--dock-ring-reserve); }", "the outline offset")]),
    ("W-J.1", "G11"): dict(spec="Card's `selected` arm goes", deletion=DEL),
    ("W-J.1", "G12"): dict(spec='Chip `shape="cell"` goes', deletion=DEL),
    ("W-J.1", "G13"): dict(spec="becomes `radiogroup` / `radio` / `aria-checked`",
        plants=[C("src/components/tabs/SegmentedTabs.vue", '<button role="radio" :aria-checked="on">x</button>', "the radio answer")]),
    ("W-J.2", "G2"): dict(spec="a modal's veil keys on the overlay's open state through its own attribute or class",
        plants=[C("src/components/dialog/DialogContent.vue", "<div class=\"focus-veil\" :data-state=\"open ? 'open' : 'closed'\" />", "the veil on the overlay's own state")]),
    ("W-K.1", "K1-S"): dict(spec="Each site reads `deepActiveElement()` or `activeWithin(el)`.",
        plants=[C("src/components/menu/plant.ts", "const a = deepActiveElement();", "the root module's read")]),
    ("W-L.1", "G-L1-5"): dict(spec="It is the one drawing of the glyph",
        plants=[C("src/components/dark-mode-toggle/DarkModeToggle.vue", "<template><DarkModeGlyph /></template>", "the toggle rendering the one glyph")]),
    ("W-L.3", "G-L3-9"): dict(spec="The library's own rule (no static `text-sm`/`text-xs` in its sources)", deletion=DEL),
    ("W-L.4", "G-L4-3"): dict(spec="release path, not through the spring's frame stream",
        plants=[C("src/composables/motion/morph/useDragMorph.ts", "const end = useGestureEnd(el, { onRelease: settle });", "the end-of-gesture closer")]),
    ("W-L.8", "G-L8-2"): dict(spec="with no wave ids, tranche ids or dated brackets (E-10)",
        plants=[C("CHANGELOG.md@## 11.0.0", "- `GlassDock`'s plate is a stadium at every rest", "a plain entry")]),
    ("W-L.8", "G-L8-14"): dict(spec="W-C.1: the last of a loop's waves to land deletes", deletion=DEL),
}
for _k, _v in SPEC.items():
    if _k not in CLAIMS or CLAIMS[_k]["kind"] != "S":
        raise SystemExit(f"SPEC entry {_k} names no S entry of CLAIMS")
    CLAIMS[_k]["spec"] = _v["spec"]
    CLAIMS[_k]["deletion"] = _v.get("deletion")
    CLAIMS[_k]["plants"] += _v.get("plants", [])


def sh(span, root, timeout=120):
    try:
        p = subprocess.run(["bash", "-c", span], cwd=root, capture_output=True, text=True, timeout=timeout)
        return p.returncode, p.stdout
    except subprocess.TimeoutExpired:
        return 124, ""


def runner(entry, root):
    def ok(spans):
        for s in spans:
            if entry.get("ls_cure"):
                s = re.sub(r"git ls-files ((?:[^|)\"]|\"[^\"]*\")*)",
                           lambda m: "{ git ls-files " + m.group(1).strip() + " | grep -vE " + shlex.quote(entry["ls_cure"]) + "; cat .plant-ls 2>/dev/null; } ", s)
            code, out = sh(s, root)
            if entry.get("printed"):
                if any(not re.fullmatch(r"(?:\S+:)?0", x.strip()) for x in out.splitlines() if x.strip()):
                    return 1
            elif code != 0:
                return 1
        return 0
    return ok


def split_top(s, sep):
    """Split on `sep` outside quotes and parentheses."""
    out, cur, q, depth, i = [], "", None, 0, 0
    while i < len(s):
        c = s[i]
        if q:
            cur += c
            if c == "\\" and q == '"' and i + 1 < len(s):
                cur += s[i + 1]
                i += 1
            elif c == q:
                q = None
        elif c in "'\"":
            q, cur = c, cur + c
        elif c == "(":
            depth, cur = depth + 1, cur + c
        elif c == ")":
            depth, cur = depth - 1, cur + c
        elif depth == 0 and s.startswith(sep, i) and not (sep == "|" and s.startswith("||", i)):
            out.append(cur)
            cur, i = "", i + len(sep)
            continue
        else:
            cur += c
        i += 1
    out.append(cur)
    return [x.strip() for x in out]


def quote(x):
    return x if re.fullmatch(r"[\w./*{}@:=,+-]+", x) and ("/" in x or not re.search(r"[*{}]", x)) else shlex.quote(x)


def listing(stage):
    """A search command re-written to print file:line:text for every hit."""
    try:
        t = shlex.split(stage)
    except ValueError:
        return None
    if not t:
        return None
    tool = "git grep" if t[:2] == ["git", "grep"] else t[0]
    if tool not in ("git grep", "grep", "rg"):
        return None
    head, rest = (t[:2], t[2:]) if tool == "git grep" else (t[:1], t[1:])
    keep, files_only = [], False
    for x in rest:
        if re.fullmatch(r"-[A-Za-z]+", x):
            if "l" in x:
                files_only = True
            x = "-" + re.sub(r"[qclLo]", "", x[1:])
            if x == "-":
                continue
        if x in ("--count", "--files-with-matches", "--quiet"):
            continue
        keep.append(x)
    add = {"git grep": ["-n"], "grep": ["-n", "-H"], "rg": ["-n", "-H", "--no-heading"]}[tool]
    return " ".join(quote(x) for x in head + add + keep), files_only


def strip_cmd(cmd, root):
    """file:line:text hits of a shell command whose output is a listing."""
    _, out = sh(cmd, root)
    got = []
    for x in out.splitlines():
        mm = re.match(r"^([^:]+):(\d+):(.*)$", x)
        if mm and os.path.isfile(os.path.join(root, mm.group(1))):
            got.append((mm.group(1), int(mm.group(2)), mm.group(3)))
    return got


def hits(span, root, printed=False):
    """(file, line, text) for every line an absence clause of the span reports, and the paths a `test ! -e` names."""
    lines, paths = [], []
    for c in split_top(span, "&&"):
        m = re.match(r"^!\s*test\s+-[efd]\s+(\S+)$", c) or re.match(r"^test\s+!\s+-[efd]\s+(\S+)$", c)
        if m:
            paths.append(m.group(1))
            continue
        cmd = None
        m = re.match(r"^!\s*(.*)$", c, re.S)
        if m:
            cmd = m.group(1)
        m = re.match(r'^test\s+(?:-z\s+)?"\$\((.*)\)"(?:\s+(?:-eq|=|-le)\s+\S+)?$', c, re.S) or re.match(r"^test\s+\$\((.*)\)\s+(?:-eq|=|-le)\s+\S+$", c, re.S)
        if m:
            cmd = m.group(1)
        if not cmd and printed and re.match(r"^(git grep|grep|rg)\b", c):
            cmd = c  # a printed count
        if not cmd:
            continue
        stages = split_top(cmd, "|")
        lst = listing(stages[0])
        if not lst:
            continue
        first, files_only = lst
        filters = [s for s in stages[1:] if re.match(r"grep\s+-v", s)]
        if files_only and filters:
            _, out = sh(" | ".join([stages[0]] + filters), root)
            keepf = set(out.split())
            got = [h for h in strip_cmd(first, root) if h[0] in keepf]
        else:
            got = strip_cmd(" | ".join([first] + ([] if files_only else filters)), root)
        lines += got
    return lines, paths


class Tree:
    def __init__(self, root):
        self.root, self.saved = root, {}

    def save(self, rel):
        f = os.path.join(self.root, rel)
        if rel not in self.saved:
            self.saved[rel] = open(f, "rb").read() if os.path.exists(f) else None

    def read(self, rel):
        return open(os.path.join(self.root, rel), encoding="utf-8").read()

    def write(self, rel, text):
        self.save(rel)
        os.makedirs(os.path.dirname(os.path.join(self.root, rel)) or self.root, exist_ok=True)
        open(os.path.join(self.root, rel), "w", encoding="utf-8").write(text)

    def remove(self, rel):
        f = os.path.join(self.root, rel)
        if os.path.isdir(f):
            for d, _, fs in os.walk(f):
                for x in fs:
                    self.save(os.path.relpath(os.path.join(d, x), self.root))
            shutil.rmtree(f, ignore_errors=True)
            return
        self.save(rel)
        if os.path.isfile(f):
            os.remove(f)

    def put(self, snap):
        for k, v in snap.items():
            f = os.path.join(self.root, k)
            if v is None:
                if os.path.exists(f):
                    os.remove(f)
            else:
                os.makedirs(os.path.dirname(f), exist_ok=True)
                open(f, "wb").write(v)

    def restore(self):
        self.put(self.saved)
        for k, v in self.saved.items():  # drop directories a plant created
            d = os.path.dirname(os.path.join(self.root, k))
            while v is None and d != self.root and os.path.isdir(d) and not os.listdir(d):
                os.rmdir(d)
                d = os.path.dirname(d)
        self.saved = {}


def strip_lines(tree, root, found):
    by = {}
    for f, n, _ in found:
        by.setdefault(f, set()).add(n)
    for f, ns in by.items():
        if not os.path.isfile(os.path.join(root, f)):
            continue
        ls = tree.read(f).split("\n")
        tree.write(f, "\n".join(x for i, x in enumerate(ls, 1) if i not in ns))


def apply_op(tree, op, root):
    kind = op[0]
    if kind == "sub":
        _, rel, old, new = op
        t = tree.read(rel)
        if old not in t:
            return f"cure op `sub` on {rel}: the text it replaces is not there"
        tree.write(rel, t.replace(old, new, 1))
    elif kind == "subre":
        _, rel, pat, new = op
        tx = tree.read(rel)
        n = re.sub(pat, new, tx, count=1, flags=re.M)
        if n == tx:
            return f"cure op `subre` on {rel}: /{pat}/ matches nothing"
        tree.write(rel, n)
    elif kind == "write":
        tree.write(op[1], op[2])
    elif kind == "append":
        f = os.path.join(root, op[1])
        tree.write(op[1], (tree.read(op[1]) if os.path.exists(f) else "") + "\n" + op[2] + "\n")
    elif kind == "section":  # a new release section above the first `## ` heading, as a release writes it
        body = tree.read(op[1])
        m = re.search(r"^## ", body, re.M)
        at = m.start() if m else len(body)
        tree.write(op[1], body[:at] + op[2] + "\n\n" + body[at:])
    elif kind == "rmglob":
        d = os.path.join(root, op[1])
        for name in sorted(os.listdir(d)):
            if re.search(op[2], name):
                tree.remove(f"{op[1]}/{name}")
    elif kind == "striphits":  # ("striphits", cmd, keep_file=None, keep_count=0)
        keep = op[2] if len(op) > 2 else None
        keep_n = op[3] if len(op) > 3 else 0
        found = [h for h in strip_cmd(op[1], root) if h[0] != keep]
        strip_lines(tree, root, found[keep_n:])
    elif kind == "svgout":  # every <svg> element outside DarkModeGlyph.vue in a directory
        d = os.path.join(root, op[1])
        for name in sorted(os.listdir(d)):
            rel = f"{op[1]}/{name}"
            if name == "DarkModeGlyph.vue" or not os.path.isfile(os.path.join(root, rel)):
                continue
            t = tree.read(rel)
            n = re.sub(r"h\(.svg.*", "", re.sub(r"<svg\b.*?</svg>", "", t, flags=re.S))
            if n != t:
                tree.write(rel, n)
    return None


def cure(tree, spans, entry, root, ok):
    """Apply the entry's ops, then strip what the gate's own searches report until it passes. Returns (exit, bite, err)."""
    for op in entry["cure"]:
        err = apply_op(tree, op, root)
        if err:
            return 1, None, err
    bite = None
    for _ in range(4):
        if ok(spans) == 0:
            break
        found, paths = [], []
        for s in spans:
            a, b = hits(s, root, entry["printed"])
            found += a
            paths += b
        paths = [p for p in paths if os.path.exists(os.path.join(root, p))]
        if not found and not paths:
            break
        for p in paths:
            if bite is None and os.path.isfile(os.path.join(root, p)):
                bite = ("path", p, tree.read(p) if p.endswith((".ts", ".mjs", ".js", ".md", ".css", ".vue", ".sh", ".py", ".json", ".yml")) else "x\n")
            tree.remove(p)
        if bite is None and found:
            bite = ("line",) + found[0][::2]
        strip_lines(tree, root, found)
    code = ok(spans)
    for op in entry["cure"]:  # the gate's own searches may not strip what a cure op wrote: that text is the spec's cure
        if op[0] in ("append", "write") and code == 0:
            body = tree.read(op[1]) if os.path.exists(os.path.join(root, op[1])) else ""
            if any(x.strip() and x not in body for x in op[2].split("\n")):
                return 1, bite, f"the gate's own search strips the cure op's text from {op[1]}: {op[2][:60]!r}"
    return code, bite, None


def plant(tree, rel, text):
    """Append text to rel, or insert it after the line `anchor` for `rel@anchor`; return the bytes to put back."""
    rel, _, anchor = rel.partition("@")
    f = os.path.join(tree.root, rel)
    prior = open(f, "rb").read() if os.path.exists(f) else None
    body = (prior or b"").decode("utf-8")
    if anchor and ("\n" + anchor + "\n") in "\n" + body:
        i = ("\n" + body).index("\n" + anchor + "\n") + len(anchor) + 1
        tree.write(rel, body[:i] + text + "\n" + body[i:])
    else:
        tree.write(rel, body + "\n" + text + "\n")
    return {rel: prior}


def norm(s):
    return re.sub(r"\s+", " ", s).strip()


def spec_prose(w):
    """The wave spec less its §5 table, so a quote of the gate itself never counts as the spec's cure."""
    t = text(w)
    m = re.search(r"^## 5 · .*?(?=^## (?:\d+ · |Appendix)|\Z)", t, re.M | re.S)
    return norm(t[: m.start()] + t[m.end():] if m else t)


FILEISH = re.compile(r"\.(?:ts|js|mjs|cjs|mts|cts|tsx|css|vue|md|json|ya?ml|sh|py|html|svg|png)$")


def nouns(*cells):
    """The classes, custom properties and dotted or called identifiers a cell names in backticks."""
    out = []
    for c in cells:
        for s in re.findall(r"`([^`]+)`", c):
            s = s.strip()
            if FILEISH.search(s) or "/" in s:
                continue
            if (re.fullmatch(r"\.[a-z][\w<>*-]*", s) or re.fullmatch(r"--[a-z][\w<>*-]*", s)
                    or re.fullmatch(r"[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)+(?:\(\))?", s)
                    or re.fullmatch(r"[A-Za-z_$][\w$]*\(\)", s)):
                out.append(s)
    return list(dict.fromkeys(out))


def noun_re(s):
    s = re.sub(r"\(\)$", "", s)
    r = re.escape(s)
    r = re.sub(r"\\<[^>]*\\>|<[^>]*>", r"[\\w-]+", r)
    return r.replace(r"\*", r"[\w-]*")


def spec_arms(g, entry, where):
    """S entries: the spec's cure form is planted green, quoted from the spec, and every noun the pass cell or the
    quote names is planted (pass 13 FM-05)."""
    out = []
    q = entry.get("spec")
    m = re.match(r"(W-[0-9A-L]\.\d+): (.*)$", q or "", re.S)
    sw, q = (m.group(1), m.group(2)) if m else (g.wave, q)
    if not q:
        out.append(f"OPEN NOSPEC  {where}: the entry quotes no cure text from the wave spec")
    elif norm(q) not in spec_prose(sw):
        out.append(f"OPEN NOSPEC  {where}: the quoted cure text is not in {sw} outside §5: {q[:70]!r}")
    if not entry.get("deletion") and not any(p[2] == "cure" for p in entry["plants"]):
        out.append(f"OPEN NOCURE  {where}: no green plant of the spec's cure form, and the entry does not say the cure is a deletion")
    texts = [p[1] for p in entry["plants"]]
    for nn in nouns(g.gid, g.passes, q or ""):
        if not any(re.search(noun_re(nn), x) for x in texts):
            out.append(f"OPEN NOUN    {where}: `{nn}`, named by the pass cell or the spec quote, is in no plant")
    return out


def main():
    if len(sys.argv) != 2 or not os.path.isdir(sys.argv[1]):
        print("usage: hold-line-claim.py <root: a checkout of HEAD>")
        return 2
    root = sys.argv[1]
    rows = gates()
    measured = {(g.wave, g.gid.split(" ")[0].rstrip(",")) for g in rows if not g.struck and not any(STATIC.match(s) for s in g.spans)}
    out, seen = [], set()
    n = n_plants = n_hold = 0
    kinds = {"S": 0, "L": 0, "H": 0}
    for g in rows:
        if g.struck or not g.spans or not STATIC.match(g.spans[0]) or HEAVY.search(g.spans[0]):
            continue
        spans = [s for s in g.spans if STATIC.match(s) and not HEAVY.search(s)]
        if not any(FORBIDS.search(s) for s in spans):
            continue
        n += 1
        where = f"waves/{g.wave}.md:{g.line} {g.gid[:44]}"
        key = next((k for k in CLAIMS if k[0] == g.wave and (g.gid == k[1] or g.gid.startswith(k[1] + " "))), None)
        if not key:
            out.append(f"OPEN UNREAD  {where}: an in-scope static gate with no CLAIMS entry")
            continue
        seen.add(key)
        entry = CLAIMS[key]
        kinds[entry["kind"]] += 1
        if entry["only"]:
            spans = spans[: entry["only"]]
        if entry["kind"] == "S":
            out += spec_arms(g, entry, where)
        if entry["kind"] == "H" and (g.wave, entry["held"]) not in measured:
            out.append(f"OPEN HELD    {where}: the entry names {entry['held']}, which is no measured row of {g.wave}")
        ok = runner(entry, root)
        tree = Tree(root)
        lsf = os.path.join(root, ".plant-ls")
        try:
            if g.hold:
                n_hold += 1
                if ok(spans) != 0:
                    out.append(f"OPEN HEAD    {where}: a hold line that does not pass at HEAD")
                    continue
            code, bite, err = cure(tree, spans, entry, root, ok)
            if err or code != 0:
                out.append(f"OPEN CURE    {where}: the cured base does not pass" + (f" ({err})" if err else ""))
                continue
            reds = [p for p in entry["plants"] if p[2] == "red"]
            if bite and not any(BOUNDED.search(s) for s in spans):
                n_plants += 1
                if bite[0] == "line":
                    back = plant(tree, bite[1], bite[2])
                else:
                    back = {bite[1]: None}
                    tree.write(bite[1], bite[2])
                if ok(spans) == 0:
                    out.append(f"OPEN NOBITE  {where}: the stripped line, re-planted on the cured base, passes: {bite[1]}: {bite[2][:60]!r}")
                tree.put(back)
            elif not reds:
                out.append(f"OPEN NOBITE  {where}: no stripped line to re-plant and no red plant")
            for rel, text, want, what in entry["plants"]:
                n_plants += 1
                if rel == "LS":
                    open(lsf, "w").write(text + "\n")
                    code = ok(spans)
                    os.remove(lsf)
                else:
                    back = plant(tree, rel, text)
                    code = ok(spans)
                    tree.put(back)
                if want == "red" and code == 0:
                    out.append(f"OPEN NARROW  {where}: passes with {what} planted in {rel}: {text[:70]!r}")
                if want == "green" and code != 0:
                    out.append(f"OPEN WIDE    {where}: fails with {what} planted in {rel}: {text[:70]!r}")
                if want == "cure" and code != 0:
                    out.append(f"OPEN WIDE    {where}: fails on the spec's own cure form, {what}, planted in {rel}: {text[:70]!r}")
        finally:
            tree.restore()
            if os.path.exists(lsf):
                os.remove(lsf)
    for k in CLAIMS:
        if k not in seen:
            out.append(f"OPEN STALE   CLAIMS entry {k} matches no in-scope row")
    for r in out:
        print(r)
    print(f"in-scope static gates {n} (hold lines {n_hold}; S {kinds['S']}, L {kinds['L']}, H {kinds['H']}), plants {n_plants}, open {len(out)}")
    return 1 if out else 0


if __name__ == "__main__":
    sys.exit(main())
