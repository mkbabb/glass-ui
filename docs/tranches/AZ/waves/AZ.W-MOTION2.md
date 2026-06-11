# AZ.W-MOTION2 - the curve gallery redress: the vivid register, the THICK stroke, the rebuilt picker, the 1:1 keyframes isomorphism

**Name**: W-MOTION2 - the curve gallery REDRESS (R7 — register / stroke / picker / isomorphism)
**Opens after**: AZ Batch 5 (ad-hoc; the W-MOTION-SUITE all-families buildout already LANDED — this is its REDRESS, not a re-build)
**Track**: Band M (motion) · **Type**: implementation (demo redress — the substrate + the data table are READY) · **Depends on**: W-MOTION-SUITE (the all-families gallery it refines), W-GATES.
**Hard gate**: born-RED `proof:motion2` (the device-free source arm) + `tests-visual/motion2.spec.ts` (the π readback arm) — the curve plots read THICK (`stroke-width ≥ 3` apparent on every thumbnail, `non-scaling-stroke` + round caps/joins); the pane reads VIVID (the dead `--surface-tint-1/-2` reads re-pointed to DEFINED rungs, load-bearing copy lifted off `--muted-foreground`, a calm rich substrate so the glass POPs — no grey-on-grey); the family picker is the canonical `<SegmentedTabs variant="underline">` panel-nav register at the section-heading scale (`:responsive`→`<Select>` on narrow), the families the primary IA; and the canon is 1:1 ISOMORPHIC to keyframes.js's easing inventory (the §1 dossier 42-item set — the 4 CSS Standard keywords + `smooth-step-3` + the `linear()` multi-stop form ADDED, the springs MOVED to their own family, the names in the canon HYPHEN register).
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0 before any edit)

RE-GREP every cite at HEAD; the digest compresses line numbers. The headline grounding: the /motion section's all-families gallery ALREADY shipped at W-MOTION-SUITE (the 10-family `CURVE_FAMILIES` table, the real-twin plots, the bezier editor, the spring playground, the `--motion-accent` purple). **R7 is a REDRESS of that surface, NOT a re-build.** The user, live on `:5199/motion/curve-gallery`: *"this page sucks, the curves and pane is too dark and muted? the curves are not thick enough, the curve picker UI is awful. And it's not at all comprehensive and isomorphic to keyframes.js's easing items."* Every read is confirmed by the orchestrator capture (`ground/R7-curve-gallery-before.png`) and the live chrome-devtools probe in the dossier.

The BINDING dossier is `docs/tranches/AZ/audit/R7-MOTION2-RESEARCH.md` (read it in full — it is the canon inventory + the file:line root causes + the presentation idiom). The BINDING audit is `docs/tranches/AZ/audit/USER-AUDIT-2026-06-11-R7.md`. The four R7 rows, verbatim:

| id | defect (user, verbatim-derived) |
|---|---|
| R7-1 | THE REGISTER: grey muted cards on a grey page — the whole pane reads dark/washed; the plots have no presence (the motion-purple accent barely registers at the thin stroke). |
| R7-2 | THE STROKE: the curve plots are ~1.5px hairlines — the curves ARE the content and must read THICK (the keyframes demo's plots are bold strokes with presence). |
| R7-3 | THE PICKER: the 10-family selector is a cramped row of tiny chips — "awful." It needs the house register at a proper scale (and the families are the IA, not an afterthought). |
| R7-4 | THE ISOMORPHISM: the canon is NOT comprehensive/isomorphic to keyframes.js's easing items — the binding source is `~/Programming/keyframes.js/src/animation/easing.ts` + `springTimingFunction.ts` (+ its demo's presentation idiom). Enumerate THAT inventory; the gallery carries it 1:1 (named, grouped, plotted as keyframes presents them), re-expressed in the glass idiom (tailwind-first). |

### The dossier gap matrix (R7-4 — the isomorphism target, §3 of the dossier)

The canon authority chain (dossier §0): `easing.ts` is a resolver SHIM; the named catalogue lives in `@mkbabb/value.js`'s `timingFunctions` + `bezierPresets` + the step factories + `springTimingFunction`. The keyframes DEMO presents exactly this set grouped by `EASING_GROUPS` (`~/Programming/keyframes.js/demo/easing/easingGroups.ts:28`). **The canon is 42 distinct items** (dossier §1: Standard 5 + Sine 3 + Quad 3 + Cubic 4 + Expo 3 + Circ 3 + Back 3 + Bounce 6 + Steps 3 + Custom 1 + `linear()` 1 + Springs 5). The dual-key camel/hyphen registrations are aliases of ONE curve; the canon display name is the keyframes-demo HYPHEN form.

| # | canon item | gallery status at HEAD | gap class | redress |
|---|---|---|---|---|
| G1 | `ease` / `ease-in` / `ease-out` / `ease-in-out` (the 4 CSS Standard bezier keywords, `[.25,.1,.25,1]`/`[.42,0,1,1]`/`[0,0,.58,1]`/`[.42,0,.58,1]`) | **MISSING** — gallery "Standard" carries the glass-ui `--motion-ease-*` Material tokens (`[.4,0,.2,1]`…), DIFFERENT curves | MISSING (4) | ADD as `CSSCubicBezier(...)` rows in a `Standard` family (the keyframes-canon Standard = linear + the 4 CSS keywords) |
| G2 | `smooth-step-3` (keyframes groups under Cubic) | **MISSING** | MISSING (1) | ADD to Cubic — the Hermite `smoothStep3` from value.js |
| G3 | `linear()` multi-stop (CSS Easing L2 piecewise; the form `springTimingFunction` EMITS) | **MISSING** — no row demonstrates the `cssLinear` form | MISSING (1) | ADD a `linear()` demonstration row (the spring's emitted artifact, distinct from the `linear` keyword) |
| G4 | Standard family naming | **MISGROUPED** — the 5 SPRING presets live under "Standard" (`curve-families.ts:121-126`); keyframes has NO springs in `EASING_GROUPS` (springs are a SEPARATE `demo/spring/*` surface) | MISGROUPED (5) | MOVE the 5 springs to their own `Springs` family (own section/blurb), name them by FEEL (`smooth`/`snappy`/`bouncy`/`gentle`/`dock`) with the glass-ui token in the sublabel |
| G5 | Back `ease-in-back` etc. | PRESENT + correctly sourced (bezierPresets) | OK | KEEP |
| G6 | Bounce `ease-in-bounce` | MISNAMED (`easeInBounce` camel vs canon-hyphen) | MISNAMED (1) | RE-NAME to the hyphen display register |
| G7 | Steps `steps(n, term)` | PARTIAL — hard-codes `steps(4, end)` only; canon is a GENERATOR over n + 7 jump-terms | PARTIAL (1) | EXPOSE a live n/term control (the `steppedEase(n, term)` generator), OR keep `steps(4, end)` + `step-start`/`step-end` and NAME the live-n control as the W-MOTION3 successor — DECIDE in §3 |
| G8 | analytic families named camelCase | MISNAMED (~24) — gallery uses `easeInSine`; keyframes displays `ease-in-sine` | MISNAMED (~24) | RE-NAME every analytic row to the canon HYPHEN display register (the `jsName` sublabel keeps the camel source) |
| G9 | spring naming token-vs-feel | NOTE — gallery names by token (`--spring-smooth`); keyframes names by feel (`smooth`) | NOTE | reconcile at G4 (feel-name display, token sublabel) |

**Present-and-correct (KEEP, do not re-source):** the 15 analytic `ease*` (Sine/Quad/Cubic/Expo/Circ minus `smoothStep3`), the 3 Back, the 6 Bounce, the 3 Steps keywords, the live Custom bezier, the 5 springs (curves present, placement aside). The TWIN SOURCING is correct + binding (`curve-families.ts:1-55`) — springs via `MOTION_CURVES`, analytic via `curves.ts`, Back via `bezierPresets`, Bounce/Steps direct from value.js — the REAL twins, no hand-rolled sampler. **The redress is REGISTER / IA / STROKE / COMPLETENESS, NOT a twin re-source.**

## §1 — Verified defect table (file:line at HEAD — RE-GREP)

| # | defect | evidence (file:line) | root cause (dossier §4) |
|---|---|---|---|
| D1 | THE BUG — dead-token reads paint NOTHING (transparent). The gallery reads `--surface-tint-1` + `--surface-tint-2`, but the ladder STARTS at `--surface-tint-4` (`src/styles/tokens/color-radius.css:112`); `-1`/`-2` are UNDEFINED → `rgba(0,0,0,0)` (live-probed). Every backplate keyed off them paints nothing: the kind-pill tints (`curve-gallery.vue:90-95` `KIND_TINT`, all 4 read `-1`/`-2`), the dot-rail bg (`:172`), the doctrine table header (`:191`). BezierEditor's copy-hover also reads dead `-1` (`BezierEditor.vue:222`). | `curve-gallery.vue:90-95,172,191`, `BezierEditor.vue:222` | RC-1a |
| D2 | grey-on-grey by construction — the curve-gallery manifest row declares NO `background:` (unlike `springs` → `"constellation"`, `manifest.ts:501-503`), so the page substrate is bare (`main` bg `rgba(0,0,0,0)`); the `.glass-card` is a 60%-opacity warm-grey over `blur(10px)` with NOTHING rich behind → the glass blur is imperceptible (the W54/W60 split — glass needs a rich substrate to POP). | `manifest.ts:505-510` (no `background:` key on `curve-gallery`) | RC-1b |
| D3 | the muted body register — most load-bearing copy is `text-muted-foreground` (L40, low-contrast over a translucent plate): `jsName` + `note` (`curve-gallery.vue:155-156`), the bezier/analytic kind pills (`:92-93`), the family blurb (`:122`), the doctrine easing cells (`:199`). The whole pane reads muted because most ink IS muted. | `curve-gallery.vue:92-93,122,155-156,199` | RC-1c |
| D4 | THE STROKE — the thumbnail polyline is `stroke-width="1.75"` in a `0 0 120 64` PX viewBox (`curve-gallery.vue:166`), no `vector-effect:non-scaling-stroke` → ~1.5px hairline (live-probed `1.75px`). The keyframes ghost is `3px non-scaling` (`EasingHeroStage.vue:147`), the bezier canvas `0.035` unit ≈10px apparent (`BezierEditor.vue:187`). SECONDARY: the plot is vertically FLAT — `plotPoints` maps y over only `PLOT_H-20 = 44px` of a 64px box (`:42-53`), the axis lines eat top/bottom, so the shape barely articulates even before the thin stroke. | `curve-gallery.vue:42-53,159-168` | R7-2 / IDIOM-2 |
| D5 | THE PICKER — the family selector is `<SegmentedTabs variant="pill">` with 11 options crammed into ONE strip (`curve-gallery.vue:114-119`); live-probe: 14px font, `4px 12px` padding, 28px tall — a cramped 11-pill row. `pill` is the wrong register (it is the solid-foreground compact TOGGLE register, not 11-way PRIMARY panel-nav IA). | `curve-gallery.vue:113-120` | R7-3 / IDIOM-6 |
| D6 | THE ISOMORPHISM GAP — the §0 gap matrix: 6 MISSING items (4 CSS Standard keywords + `smooth-step-3` + `linear()`), 5 misgrouped springs, ~25 misnamed (camel vs canon-hyphen, incl. `easeInBounce`), Steps partial. The canon is NOT 1:1 to the keyframes inventory. | `curve-families.ts:117-208` | R7-4 / dossier §1+§3 |

## §2 — Goal criterion + completion criterion

**Goal criterion.** The /motion curve gallery is a VIVID, confident, comprehensive demonstration of the keyframes easing language expressed in the glass idiom. The curves are the protagonists — THICK confident strokes (`non-scaling-stroke`, round caps) that read at a glance, over a pane that POPs (a calm rich substrate, load-bearing copy at full ink, the dead-token backplates re-pointed to defined rungs so the chips/rails/headers actually paint). The family picker is first-class IA — the canonical underline panel-nav register at the section-heading scale, the families the navigation, not a cramped chip afterthought. And the canon is 1:1 ISOMORPHIC to keyframes.js's easing inventory (the dossier §1 42-item set, in the canon HYPHEN names, grouped + presented as keyframes presents them) — the user can no longer point at a keyframes easing item the gallery does not carry. The motion-PURPLE stays the band's ONE color event; the THICK stroke in it IS the point.

**Completion criterion.** `proof:motion2` GREEN (the §6 device-free source arm: the stroke floor, the dead-token re-point, the picker register, the canon isomorphism census vs the keyframes exports, the substrate + muted-lift witnesses) AND `tests-visual/motion2.spec.ts` GREEN (the §6 π readback arm: the painted `stroke-width ≥ 3` apparent, the picker NOT a cramped pill row, the substrate present, the purple-still-violet, the canon families rendered) AND the §8 light+dark before/after DELTA pair on disk AND `npm run typecheck` clean. `proof:motion-demo` (the W-MOTION-SUITE predecessor gate) stays GREEN — this redress refines, never regresses, the all-families buildout.

## §3 — Scope

This is ONE coupled agent unit (the gallery + its data table + the BezierEditor dead-token + the manifest background row are one redress). Six scope items.

### §3.1 — THE STROKE: the curves read THICK (D4 → R7-2)

Re-express the thumbnail plot in the keyframes stroke idiom (IDIOM-2):
- The polyline stroke is a CONFIDENT line. Two equivalent expressions — PICK ONE and be consistent: (a) keep the PX viewBox but set `stroke-width="3"` (or higher) + `vector-effect="non-scaling-stroke"` so it is pinned regardless of the render box; OR (b) move to a unit-ish viewBox + a unit width matching the BezierEditor's `0.035` register (≈10px apparent). The bezier canvas ALREADY does (b) right — the thumbnail is the regression. Add `stroke-linecap="round"` + `stroke-linejoin="round"` (the plot today has linejoin only).
- FIX the vertical-flatness secondary: give the plot a cleaner box where the curve uses the FULL vertical range (drop the `PLOT_H-20` cramp + the axis lines eating top/bottom), and carry a real 0/1 coordinate frame (IDIOM-7 — gridlines at 0.25/0.5/0.75 + a t-axis baseline in the `--border` hairline, the BezierEditor's `:175-176` model) so a curve plots AGAINST its frame instead of floating. Springs/back-curves overshoot past the frame — the viewBox keeps allowing it (`curve-gallery.vue:38-39` already notes this; preserve it).
- The driven dot reads `--motion-accent` at presence (KEEP — `:175`).

### §3.2 — THE REGISTER: the pane reads VIVID, not grey-on-grey (D1+D2+D3 → R7-1)

Three root causes, three fixes:
- **D1 (the BUG).** Re-point EVERY `--surface-tint-1` / `--surface-tint-2` read to a DEFINED rung. The ladder is `4/6/8/10/12/15/18/22/25/35/40/70` (`color-radius.css:112-127`). The dossier RC-1a directs `--surface-tint-6`/`-8`/`-10`/`-12` OR the glass-tier tokens. The kind-pill `KIND_TINT` map (4 entries), the dot-rail bg (`:172`), the doctrine header (`:191`), and the BezierEditor copy-hover (`BezierEditor.vue:222`) all re-point. A spring/step pill (today `-2`, the "presence" tier) reads a stronger rung (`-10`/`-12`); a bezier/analytic pill (today `-1`) reads a quieter defined rung (`-6`/`-8`). NO dead-token read survives.
- **D2 (grey-on-grey).** Give the curve-gallery page a calm rich substrate so the glass POPs (the W-SUFFUSE calm idiom, the `math-paper.vue` gold standard) — set a `background:` on the `curve-gallery` manifest row (`manifest.ts:505-510`). Use a CALM non-GL substrate (`"paper"` or `"grid"`, the `StoryBackground` union at `aurora-hero.ts:69-73`) — NOT `"aurora"`/`"constellation"`/`"fourier"` (the one-GL-context-per-route fence; `springs` already spends the constellation budget in the band). The `<StoryHero>` `variant="page"` thin-tier card then reads the wash through (the W-SUFFUSE lever). This is the load-bearing kill of grey-on-grey — the glass has something to pop against.
- **D3 (muted ink).** Lift the LOAD-BEARING copy off `--muted-foreground` to `--foreground`: the `jsName` source label, the `note` register doc, and the kind pills' TEXT. Reserve `--muted-foreground` for genuine captions (the family blurb may stay muted as supporting chrome — it is a caption; the per-row metadata is load-bearing). The doctrine table's easing cells (`:199`) lift to `--foreground`. Let `--motion-accent` carry the ONE color event with presence (the thick stroke + the active-family accent + the driven dot).

### §3.3 — THE PICKER: the canonical underline panel-nav register at scale (D5 → R7-3)

Rebuild the family picker on the house register the dossier directs (IDIOM-6 + RC-R7-3):
- Swap `variant="pill"` → **`variant="underline"`** (the canonical `role="tablist"` PANEL-NAV register — CLAUDE.md: underline = the mutually-exclusive PANEL case; picking a family swaps the visible curve set, EXACTLY this). The underline strip at a PROPER scale (the section-heading rung — generous padding, the `text-subheading` 20.4px/600 register the W-HIERARCHY canon mints) reads as navigation, not a chip afterthought. The families are the PRIMARY IA of the page.
- Add `:responsive` (`true` or `{ breakpoint, ariaLabel }`) so the 11-way strip COLLAPSES to a `<Select>` below the breakpoint (the SegmentedTabs `:responsive` facility — the keyframes idiom's glass `<SelectTrigger>` exactly, IDIOM-6). The strip is wide (11 options); the responsive collapse is the narrow-width affordance.
- The active family's NAME sits at the heading rung with the family blurb at body rung beneath it — the families AS IA, the W-HIERARCHY three-register cascade (section heading → body → mono caption), not flat muted text. Reach for `<StorySection heading>` (the canonical `text-subheading` `<h2>`) for the active-family heading rather than a hand-rolled `text-sm`.

### §3.4 — THE ISOMORPHISM: the canon is 1:1 to keyframes.js (D6 → R7-4)

Make `curve-families.ts` carry the dossier §1 42-item canon, in the keyframes-demo presentation register (the named, grouped, hyphen-cased set). The ADDS + MOVES + RENAMES:
- **ADD G1 — the 4 CSS Standard keywords.** `ease`/`ease-in`/`ease-out`/`ease-in-out` as `CSSCubicBezier(...)` rows from the canon control points (`[.25,.1,.25,1]`/`[.42,0,1,1]`/`[0,0,.58,1]`/`[.42,0,.58,1]`, dossier §1A) in a `Standard` family. The keyframes-canon Standard = `linear` + these 4 (the glass-ui `--motion-ease-*` Material tokens are a DIFFERENT set — see the disposition note below).
- **ADD G2 — `smooth-step-3`.** The value.js Hermite `smoothStep3` (dossier §1D), grouped under Cubic per `easingGroups.ts:61`. Source it from the value.js export (the sanctioned direct twin import, like Back/Bounce/Steps).
- **ADD G3 — the `linear()` multi-stop row.** A demonstration row for the CSS Easing L2 piecewise form (`cssLinear`, dossier §1K) — the form `springTimingFunction` EMITS, distinct from the `linear` keyword. Drive it from the value.js `cssLinear` twin (or the spring's emitted `springLinearStops` round-trip). This is the form that ties the spring family back to the easing surface.
- **MOVE G4 — springs to their own family.** Lift the 5 spring presets OUT of `Standard` into a dedicated `Springs` family (own blurb), DISPLAY-NAMED by feel (`smooth`/`snappy`/`bouncy`/`gentle`/`dock`) with the glass-ui token (`--spring-smooth`) in the `jsName`/sublabel. keyframes presents springs on a SEPARATE surface (`demo/spring/*`); the gallery's `Springs` family is the in-gallery analog. The 5th spring `--spring-dock` is the glass-ui addition the gallery legitimately carries (the canon-count note: 42 with dock, 41 strict-keyframes).
- **RENAME G6+G8 — the canon HYPHEN display register.** Every analytic row's `name` becomes the keyframes-demo hyphen form (`ease-in-sine`, `ease-out-quad`, …, `ease-in-bounce`); the `jsName` sublabel keeps the camel source (`easeInSine`) — the source stays visible, the DISPLAY matches the canon. (Cosmetic but a binding isomorphism miss — the canon names ARE the hyphen keys per dossier §0/IDIOM-9.)
- **G7 — Steps disposition.** Keep `steps(4, end)` + `step-start` + `step-end`. The live `steppedEase(n, term)` generator control (n + the 7 jump-terms) is a NICE-TO-HAVE that exceeds a thumbnail row — NAME it the W-MOTION3 successor (the live-parameterized steps control) rather than fold a sub-editor into the gallery card. If the implementing agent finds it lands clean within the gallery's existing card register without a sub-editor, it MAY add it; else it defers cleanly.

**Resulting family taxonomy (the canon presentation order, the gate's `REQUIRED_FAMILIES`):** `Standard` (linear + the 4 CSS keywords) · `Sine` · `Quad` · `Cubic` (+ `smooth-step-3`) · `Expo` · `Circ` · `Back` · `Bounce` · `Steps` · `Linear()` (the multi-stop demonstration) · `Springs` · `Custom` (the live bezier). The gate asserts this set 1:1 against `EASING_GROUPS` + the spring + `linear()` additions (§6.4).

**The `--motion-ease-*` disposition (NOT a drop).** The glass-ui `--motion-ease-standard`/`-out`/`-in` Material bezier cores are the LIBRARY's OWN motion tokens (the house easing the recipes actually consume) — they are NOT in the keyframes canon, but they are not noise either. KEEP them as a small `House cores` aside/footnote within or beneath the `Standard` family (clearly distinguished from the keyframes-canon CSS keywords), OR fold them into the easing-doctrine §6 legend (which already names them). DO NOT silently delete them (visual-load-bearing — they are the tokens the doctrine table cites). The DECISION is the implementing agent's; the gate requires the keyframes-canon Standard keywords PRESENT and does not forbid the house cores.

### §3.5 — BezierEditor + doctrine table carry the redress

The Custom-family `BezierEditor.vue` is ALREADY the stroke gold standard (`0.035` unit ≈10px) — KEEP its curve register. Apply only the dead-token fix (`:222` `--surface-tint-1` → a defined rung) and verify its muted-ink reads are genuine captions (the axis labels, the handle-line hints are legitimately muted — those stay). The §6 easing-doctrine table (`curve-gallery.vue:184-203`) lifts its easing cells off muted (D3) and re-points its header bg off the dead `-1` (D1).

### §3.6 — The hard fences (binding — §5) + the born-RED gate (§6).

### §3a — Triumvirate Dispatch

- **Scope-reveal**: if the `linear()` multi-stop row (§3.4 G3) cannot be driven by a SHIPPED value.js twin (`cssLinear` is not directly importable as a `(t)=>number`, only as a stop-parser) without a hand-rolled sampler — the scope-reveal trigger fires; the research lane resolves the correct shipped twin (the `springLinearStops` → `cssLinear` round-trip is the candidate). The §6 NO-HAND-ROLLED-SAMPLER fence forbids a hand-written piecewise approximation, NOT a direct value.js import; if no direct twin exists, the `linear()` row defers to W-MOTION3 with a recorded rationale (the gate's `linear()`-row bite then becomes a successor-named miss, not a fabricated row).
- **Hard-gate failure**: if the underline picker at 11-way + section scale OVERFLOWS the strip on desktop (the responsive collapse fires too eagerly, or the strip wraps) — the diagnostic-loop trigger fires on the third tuning iteration; the research lane is the SegmentedTabs `:responsive` breakpoint + the strip's overflow behavior at 11 options.
- **Disjointness**: this wave owns the `demo/stories/motion/` curve-gallery surfaces + the `curve-gallery` manifest ROW (the `background:` key) + the `proof:motion2` gate trio. It must NOT touch `springPresets.ts`/`curves.ts` VALUES, the `--motion-accent` token site (it stays `var(--viz-legendre)`, demo-local — read-only), `scripts/proof-motion-demo.mjs` (the predecessor gate — read-only, stays GREEN), or `tests-visual/motion-demo.spec.ts`. The `curves.ts` re-export MAY gain `smoothStep3`/`cssLinear` IF the gallery wants them via the /motion re-export instead of a direct value.js import — but the direct value.js import (the W-MOTION-SUITE precedent for Back/Bounce/Steps) suffices, so `curves.ts` stays UNTOUCHED unless that re-export is chosen (not a no-op edit either way).

## §4 — File Bounds

| File | Access |
|---|---|
| `demo/stories/motion/curve-gallery.vue` | modify (the thick stroke + the dead-token re-point + the muted-lift + the underline picker + the family-heading rung — D1/D3/D4/D5) |
| `demo/stories/motion/curve-families.ts` | modify (the canon isomorphism — ADD the 4 CSS Standard keywords + `smooth-step-3` + the `linear()` row; MOVE the 5 springs to a `Springs` family; RENAME analytic rows to the hyphen register — D6) |
| `demo/stories/motion/BezierEditor.vue` | modify (the dead-token fix at `:222` only — keep the curve register; D1) |
| `demo/stories/manifest.ts` | modify (the ONE `curve-gallery` row's `background:` key — the calm substrate; D2. Disjoint from any other wave's manifest region — a single key on `:505-510`) |
| `scripts/proof-motion2.mjs` | create (the born-RED device-free source arm) |
| `tests-visual/motion2.spec.ts` | create (the born-RED π readback arm; takes NO manifest row — runs under the local-only π harness) |
| `scripts/gates.mjs` + `package.json` | the gate-script-parity TRIO (coordinate with W-GATES): add the `package.json` `proof:motion2` key; register the `proof:motion2` row (`tags: ["local","ci","release"]` — a device-free src-scan gate carries `ci`; omitting `ci` REDs `proof:tag-parity`). `proof:gen-ci-fresh` re-lock `ci.yml`. `proof:gate-script-parity` + `proof:tag-parity` GREEN post-registration. |

**Do NOT touch:** `src/composables/motion/springPresets.ts` + `curves.ts` VALUES (the single-source registers — read-only; this wave CONSUMES them). The `src/styles/` token cascade (`--motion-accent` is DEMO-LOCAL on `demo/demo.css:101` — read-only; ppmycota never enters library tokens — the hard fence). `scripts/proof-motion-demo.mjs` + `tests-visual/motion-demo.spec.ts` (the W-MOTION-SUITE predecessor gate — read-only, stays GREEN). `scripts/proof-motion-suite.mjs` (the substrate parity gate — distinct, stays GREEN). The keyframes.js repo (READ-ONLY isomorphism authority — NEVER edit `~/Programming/keyframes.js/**`).

### §4a — Disjointness

ONE agent unit (the curve-gallery redress is a coupled IA — the stroke, register, picker, and canon are one surface). The `manifest.ts` edit is a SINGLE `background:` key on the `curve-gallery` row (`:505-510`), disjoint from every other wave's manifest region by line. `curves.ts` is read-mostly (untouched unless the optional `smoothStep3`/`cssLinear` re-export is chosen — then it APPENDS, disjoint from the W-MOTION-SUITE `ease*` re-export block). `gates.mjs`/`package.json` appended after W-GATES.

## §5 — Hard fences (binding constraints — §5 of the dossier)

- `--motion-accent` (= `--viz-legendre` violet) stays **DEMO-LOCAL** (`demo/demo.css:101`); NEVER a library token. The purple is the band's ONE color event; the THICK stroke in it IS the point (the audit's fence). The redress lifts muted→foreground for PRESENCE but adds NO second hue.
- The **one-color-event rule** holds: body ink untinted (the redress lifts to `--foreground`, not a second tint), chip ≤ icon scale, ≤1 tinted family per surface. The `--motion-accent` purple is the ONE event.
- **Tailwind-first**: any keyframes reference re-expresses via `@theme`/`@utility` + token custom-properties — never pasted raw (`BezierEditor.vue` is the model port). The thick-stroke + underline-picker redress is Tailwind utilities + the `--motion-accent` / `--surface-tint-*` / `--border` token vars.
- **PRM-gate every animation**: the `play`/`playAll` rAF (KEEP the existing gate); any new motion is PRM-aware (the demo's `@container style(--demo-reduce-motion)` bucket + system PRM).
- **Port discipline**: `:5199` is the gate demo (restart with `npm run dev -- --port 5199 --strictPort` if down; NEVER `:5173`). The user audits `:5210` — leave it.
- **The REAL-twin sourcing is binding + correct** (`curve-families.ts:1-55`) — the ADDS (CSS keywords via `CSSCubicBezier`, `smoothStep3` + `cssLinear` direct from value.js) drive REAL twins; the redress is COMPLETENESS, NOT a twin re-source. The `smooth-step-3`/`linear()` adds import their twins DIRECTLY from `@mkbabb/value.js` (the sanctioned peer demo dep, the W-MOTION-SUITE Back/Bounce/Steps precedent) — never a hand-rolled Hermite/piecewise approximation.
- **keyframes.js is READ-ONLY** — the isomorphism authority; never edit `~/Programming/keyframes.js/**`.

## §6 — Hard Gate (born-RED `proof:motion2` + `tests-visual/motion2.spec.ts`)

THE SPLIT (the W-REGISTER-IOS / W-MOTION-SUITE precedent): a DEVICE-FREE `.mjs` source arm (the dead-token re-point, the stroke-floor source-witness, the picker register, the canon isomorphism census, the substrate/muted-lift witnesses — run on EVERY runner, `ci`-tagged) + a `.spec.ts` π arm (the PAINTED truth — the computed `stroke-width`, the picker NOT-cramped, the substrate present, the purple-still-violet — local-only). Both hold to close.

### §6.A — `scripts/proof-motion2.mjs` (the device-free source arm, born-RED)

Authored born-RED against HEAD. Bites:

1. **STROKE-THICK (source-witness).** The curve-gallery thumbnail polyline carries a THICK stroke — `stroke-width` ≥ 3 (PX-viewBox path) WITH `vector-effect="non-scaling-stroke"`, OR a unit-width ≥ ~0.03 (unit viewBox) — AND `stroke-linecap="round"` + `stroke-linejoin="round"`. RED today (`stroke-width="1.75"`, no `non-scaling-stroke`, linejoin-only — `curve-gallery.vue:166-167`). The bite reads the gallery's `<polyline>` attrs (not the BezierEditor, which already passes).
2. **NO-DEAD-TINT (source-witness — the BUG guard).** NO `--surface-tint-1` or `--surface-tint-2` read survives in `curve-gallery.vue` OR `BezierEditor.vue` (the ladder starts at `-4`; `-1`/`-2` are dead). A grep for `surface-tint-1\b`/`surface-tint-2\b` returns ZERO. RED today (`curve-gallery.vue:91-94,172,191`, `BezierEditor.vue:222`). NEGATIVE-PREDICATE: a future agent re-introducing a `-1`/`-2` read REDs this.
3. **PICKER-UNDERLINE (source-witness).** The family picker is `<SegmentedTabs variant="underline">` (NOT `variant="pill"`) and carries `:responsive` (the narrow-width `<Select>` collapse). RED today (`variant="pill"`, no `:responsive` — `curve-gallery.vue:114-119`).
4. **CANON-ISOMORPHIC (source-witness — the R7-4 census).** The `curve-families.ts` taxonomy is 1:1 with the keyframes canon: (a) the `Standard` family carries the 4 CSS keyword rows (`ease`/`ease-in`/`ease-out`/`ease-in-out` — assert each name literal present); (b) `smooth-step-3` is present (in Cubic); (c) a `Springs` family exists DISTINCT from `Standard` (the springs MOVED — `Standard` no longer carries `--spring-*` rows); (d) the analytic rows display the HYPHEN register (assert `ease-in-sine`/`ease-out-quad`/`ease-in-bounce` name literals present, the camel `easeInSine` NOT the display `name`); (e) the `linear()` multi-stop row is present OR a recorded W-MOTION3 successor-miss is in the FINAL (the §3.4 G3 disposition). **The census is against the keyframes EXPORTS** — the bite reads `~/Programming/keyframes.js/demo/easing/easingGroups.ts` `EASING_GROUPS` (READ-ONLY) and asserts every keyframes Standard/Cubic-`smooth-step-3`/hyphen-named item appears in `curve-families.ts` (the isomorphism is checked against the live authority, not a hard-coded list — so the gate tracks the authority). RED today (no CSS keywords, no `smooth-step-3`, springs in Standard, camel names).
5. **MUTED-LIFTED (source-witness).** The load-bearing per-row metadata is NOT `text-muted-foreground` — the `jsName`/`note`/kind-pill-text + the doctrine easing cells read `text-foreground` (or the accent). Assert the gallery's row-metadata + doctrine-cell sites do not carry `text-muted-foreground` (the family blurb caption MAY stay muted — scope the assert to the row-metadata + doctrine-cell regions, not a blanket grep). RED today (`:155-156,199` muted).
6. **SUBSTRATE-DECLARED (source-witness).** The `curve-gallery` manifest row carries a `background:` key with a CALM kind (`"paper"` or `"grid"` — NOT `"aurora"`/`"constellation"`/`"fourier"`, the one-GL-per-route fence). RED today (no `background:` on `:505-510`).
7. **PURPLE-PRESERVED (source-witness).** `--motion-accent: var(--viz-legendre)` still minted demo-local (`demo/demo.css`); the gallery plots/dots still read `var(--motion-accent)`; ppmycota does NOT appear in `src/styles/`. (The redress must not regress the W-MOTION-SUITE purple identity.)
8. **PARITY-PRESERVED.** `proof:motion-demo` (the W-MOTION-SUITE predecessor) stays GREEN — a subprocess run (`node scripts/proof-motion-demo.mjs`). The redress refines, never regresses, the all-families buildout. RED-if the redress broke a predecessor bite (e.g. dropped a family, un-minted the purple).
9. **PI-SPEC.** `tests-visual/motion2.spec.ts` exists (the binding π half).

### §6.B — `tests-visual/motion2.spec.ts` (the π readback arm, born-RED)

Reads back off the LIVE painted `:5199` DOM (the cardinal lesson — a green CPU gate over a still-wrong render is the gap), light+dark:

- **STROKE-THICK-π.** The painted gallery `<polyline>` computed `stroke-width` is ≥ 3px apparent (`getComputedStyle(polyline).strokeWidth`, OR the bounding stroke at the device scale for a `non-scaling-stroke` unit path). RED today (`1.75px`).
- **PICKER-NOT-CRAMPED-π.** The family picker is the underline register at scale — assert the picker host carries the underline variant class (`segmented-tabs--underline`) and the tab height is NOT the cramped 28px pill (≥ the section rung — a measured height floor, e.g. ≥ 36px), and the strip reads as a tablist (`role="tablist"`). RED today (28px pill row).
- **SUBSTRATE-PRESENT-π.** The page paints a calm substrate behind the glass card — the `<StoryHero>`/page background is NOT bare `rgba(0,0,0,0)` (a paper/grid wash element is attached/painted). RED today (bare ground).
- **PURPLE-STILL-VIOLET-π.** `--motion-accent` resolves to the violet `--viz-legendre` family (oklch ~317.5°, the 290-350° hue band — reuse the `motion-demo.spec.ts` oklab plumbing) and the painted plot stroke reads the same violet. (Regression guard — the redress keeps the ONE color event.)
- **CANON-FAMILIES-RENDER-π.** The expanded picker renders the full family set (the §3.4 taxonomy labels present in the DOM — `Standard`/`Sine`/…/`Springs`/`Custom`), and the active family plots a grid of real-twin polylines (≥ 3 `<polyline>`).
- **G-CLOSE.** Capture the before/after DELTA pair (curve gallery light+dark, the Custom/bezier editor, the picker close-up) to `docs/tranches/AZ/audit/visual/W-MOTION2-*`; write the `W-MOTION2-stroke-readback.json` (the computed stroke-width + the picker height + the substrate-present verdict, the numbers the DELTA cites).

**Runner-truth disposition.** The device-free `.mjs` (bites 1-9) is the falsifiable-on-every-runner arm (`tags: ["local","ci","release"]`, carries `ci` — `proof:tag-parity` REDs it otherwise); the `.spec.ts` π captures are the binding visual truth (`tags: ["local"]`, auto-detected `LIVE_VERIFIED_LOCAL_ONLY`, captured to the DELTA under `proof:live-verified-ledger`; takes NO manifest row). The §4 trio: the `package.json` `proof:motion2` key + the `gates.mjs` row + `proof:gate-script-parity`/`proof:tag-parity` GREEN. The STROKE-THICK + NO-DEAD-TINT + CANON-ISOMORPHIC source-witnesses are the durable drift-guards; the π captures are the painted truth backstopped by the ledger.

## §7 — Format And Lint Cadence

`npm run typecheck` after each demo edit and at close; `git diff --check` before close (the orchestrator owns the index — the agent runs read-only git only). The tailwind-first re-expression is checked by the §5 grep-witness (no raw pasted keyframes CSS). Gate defaults `:5199` (restart `npm run dev -- --port 5199 --strictPort` if down).

## §8 — Verification Artefacts

- `docs/tranches/AZ/audit/visual/W-MOTION2-curve-gallery-{before,after}-{light,dark}.png` (the headline before/after pair)
- `docs/tranches/AZ/audit/visual/W-MOTION2-picker-{before,after}.png` (the picker register close-up)
- `docs/tranches/AZ/audit/visual/W-MOTION2-bezier-editor-{light,dark}.png` (the Custom family, dead-token fix)
- `docs/tranches/AZ/audit/visual/W-MOTION2-stroke-readback.json` (the computed stroke-width + picker height + substrate verdict)
- the before-state ground capture already on disk: `docs/tranches/AZ/audit/ground/R7-curve-gallery-before.png`
- `scripts/proof-motion2.mjs` (the gate, GREEN) + the `proof:motion2` PASS log
- `tests-visual/motion2.spec.ts` (the π arm, GREEN)

## §9 — Commit Plan

- one implementation commit: `feat(AZ): motion2 — curve gallery REDRESS (R7): thick non-scaling strokes + vivid register (dead-tint re-point + muted-lift + calm substrate) + underline panel-nav picker at scale + the 1:1 keyframes isomorphism (CSS Standard keywords + smooth-step-3 + linear() + springs-own-family + hyphen names)` (body: names the dead-`--surface-tint-1/-2` BUG fix as the load-bearing register kill, the keyframes-canon isomorphism additions cited against the dossier §1, the ppmycota-demo-local discipline preserved, and the W-MOTION3 named successor for the live-parameterized steps generator [+ the `linear()` row IF it defers]).
- the gate-registration line + a status commit at close.

## §10 — Dependencies

- **Depends on**: W-MOTION-SUITE (the all-families gallery this redresses), W-GATES.
- **Blocks**: nothing hard. The §3.4 G7 live-`steppedEase(n, term)` generator control + (conditionally) the `linear()` row defer to **W-MOTION3** (the named successor — the live-parameterized steps editor + any isomorphism remainder). Reads `manifest.ts` disjoint (one `background:` key).

## §11 — Named successors

- **W-MOTION3 — the live-parameterized steps generator** (§3.4 G7): a live `steppedEase(n, term)` control exposing n + the 7 jump-terms (`jump-start`/`jump-end`/`jump-none`/`jump-both`/`start`/`end`/`both`, dossier §1I) as a Custom-family-style sub-editor. Out of THIS wave's scope (it exceeds a thumbnail row; folding a sub-editor into every Steps card would bloat the gallery register). If §3.4 G3's `linear()` row cannot be driven by a shipped value.js twin without a hand-rolled sampler (the §3a scope-reveal), the `linear()` demonstration ALSO defers here with the §6.A-4(e) recorded-miss disposition.
- **The `--motion-ease-*` house-cores aside** (§3.4 disposition): if the implementing agent cannot place the house Material cores cleanly within `Standard` without muddying the keyframes-canon read, the cores fold into the §6 easing-doctrine legend (which already names them) — a clean in-wave resolution, not a successor.

## §12 — Archaeology

Prior: AZ.W-MOTION-SUITE landed the all-families gallery (the 10-family `CURVE_FAMILIES` table, real-twin plots, the bezier editor, the spring playground, the `--motion-accent` purple) and its `proof:motion-demo` gate — a genuine completeness lift. R7 is the USER finding that the LANDED surface is still grey-on-grey (the dead-`--surface-tint-1/-2` reads were never live-probed at W-MOTION-SUITE close — the gate witnessed the data table, not the painted register), the strokes are hairlines (the gallery thumbnail regressed off the BezierEditor's correct `0.035` register), the picker is a cramped pill row (`variant="pill"` was the wrong register for 11-way IA), and the canon is NOT 1:1 to keyframes (the 4 CSS Standard keywords + `smooth-step-3` + `linear()` were never added, springs were misgrouped into Standard, names diverged camel-vs-hyphen). The new guardrail: `proof:motion2`'s NO-DEAD-TINT negative-predicate + the π STROKE-THICK/PICKER-NOT-CRAMPED/SUBSTRATE-PRESENT painted readbacks are the durable kills the data-table gate could not carry — the painted register is now machine-witnessed, closing the "canon-on-paper / muddy-in-render" gap the W-MOTION-SUITE gate left open.
