# KS-PAPER — adversarial critique

**Critic:** opus (KS-B adversarial arm) · **Date:** 2026-07-01 · **HEAD:** `29f280c8` (spec pins `fa6ed40a`;
src/ unchanged since — KS-A was docs-only, line-cites re-verified valid at HEAD).
**Verdict:** strong draft, no CRITICAL. Genuine greenfield loop, deep + accurate corpus grounding, honest KISS
on the enhancement, two-sided warm gate is the right D-2 cure. **Convergence 87%** — binding-spec-ready once the
arm-8 tile-decode method, the utility-scope provenance, and two source ambiguities are pinned.

## Disk re-verification (every load-bearing claim checked; prompt: "assume nothing")

CONFIRMED true on disk: `paper.css:44` grey `saturate=0` tooth + `:45` `140px` tile; `scale-paper.css:131/132`
clean/aged (`saturate=0`, α 0.04/0.06); `glass-fx.css` paper-grain `0.21` / glass-grain `0.025`; `dark-arm.css`
paper `0.16` / glass `0.045`; **`--glass-key-direction` genuinely ABSENT** (only `--glass-key-{lit,shade}-{x,y}`
present); `paper.css` DEFERRED + `scale-paper.css` CRITICAL (`critical-partition.mjs:57-67` — CRITICAL_PARTIALS
carries `tokens.css` which `@import`s scale-paper; paper.css in DEFERRED_PARTIALS); clean-texture live var
consumers = exactly `cards.css:127`, `glass/ladder.css:485`, `dock/shell.css:267` + 3 dead-prose
(`tab-button.css:100`, `btn.css:101`, `ladder.css:467`); a11y-fallback carries only `--glass-grain-opacity`, NOT
paper (spec's §4.1.E "genuinely absent" is TRUE); `typography.vue` ShowcaseFrame calls carry NO `:grain` (the
"paper HOME wears zero grain" claim is disk-true); Card grain default `true` (`Card.vue:178`); math-paper
composes `paper-grain-overlay paper-grid` (`:21`). **The §4.1.D atlas consume is REAL** — `sci-report/atlas`
consumes `--paper-aged-texture` by name (`.../design/recipes.css:373,424,444,456,474`, "the SHIPPED token",
pin `>=4.2.0`, no local re-def), so the KEEP-aged-name / re-author-value call is correct and load-bearing. No
self-inserted rows; 14.1/17.5/14.3/LX.2 all exist in the cursor.

## Findings (severity-ordered)

### MAJOR

**M1 — gate arm 8 (tile-decode hemisphere-bias ±1° + anisotropy-energy-ratio ≤1.4×) has no specified decode
method and likely sits below the measurable signal floor.** The tooth is a SUBTLE bounded-amplitude field whose
DIRECTIONAL component is capped at "≤ ~35% of total tooth amplitude" (§3.Q2) over a LOW-α deployment. Decoding a
committed PNG's hemisphere bias to **±1°** (arm 8 / §4.2 arm 3) demands a structure-tensor/directional-FFT on a
weak anisotropy embedded in near-isotropic noise — the ±1° tolerance is almost certainly finer than the decode
noise floor at that amplitude, so the gate will either fail-flaky or, if tuned loose to pass, go effectively
vacuous. This is not a cosmetic arm: arm 8 IS 17.5's differentiated "one light, machine-PROVEN not asserted"
witness on the PAPER side (§4.2, `PAPER-sota.md §5`). As written it risks reducing the paper witness to nothing.
**Fix:** (a) SPECIFY the decode (which statistic, patch size, how the baker's recorded `hemisphere bias` sidecar
value is the assertion target — assert the *baker's declared* bias against the token sign, not a re-derived FFT
on the shipped pixels, which sidesteps the noise floor); (b) widen the pixel-decode tolerance to something
achievable (e.g. ±8–10° on the coarse band, or sign-of-projection only) and let the ±1° live ONLY on the
enhancement azimuth LITERAL (a cleanly checkable string, not a decode); (c) drop or method-specify the
"anisotropy energy ratio ≤ 1.4×" — same un-specified-decode problem.

**M2 — the clean-rename consumer-constellation was under-surveyed; "zero atlas consume, verified" is narrower
than the inv-11 corollary requires.** The spec verified the atlas for AGED but asserts CLEAN is safe on "zero
atlas consume" alone (§4.1.C, §4.1.D). Disk: **`words/frontend` self-hosts `--paper-clean-texture`
(`theme.css:168`, its own 60px/0.9-freq value) AND consumes it (`card-base.css:27`, `hovercard.css:25`) AND
imports `@mkbabb/glass-ui/styles` (pin `^3.0.0`).** words's own `var()` reads survive the glass-ui rename (local
def), but glass-ui's ladder `.glass-*::after` will read the new `--glass-grain-fine` and stop honoring words's
local `--paper-clean-texture` override of glass surfaces — a silent whisper-customization break. It DEGRADES
gracefully (words is 2 majors behind; the §4.1.J MIGRATION row is the sanctioned clean-break disclosure), so
this is not fatal — but the spec reached the right outcome by luck, not diligence. CLAUDE.md inv-11 corollary:
"before retiring any public symbol/subpath, the prune census probes… the known-consumer constellation." A token
shipped in `/styles` and overridable IS that surface. **Fix:** record the constellation probe result (words
self-hosts → degrades to its own local; atlas doesn't consume clean; the MIGRATION row is the disclosure) rather
than the atlas-only assertion.

### MEDIUM

**M3 — new CSS surfaces added as PRIMARY deliverables without frozen-row scope provenance.** `.paper-deboss`
utility, the grain-on-headline `@supports (background-clip:text)` utility, and (secondarily) `--paper-grain-relief`
are net-new surfaces in §4.1.B. The frozen row 14.1 (`EXECUTION-PROGRESS:81`) names only: raster tooth PRIMARY ·
feTurbulence/feDiffuseLighting DEMOTED to `@supports` · retire clean/aged (6 migrate). Deboss + headline-clip come
from WS9 `SPEC-pass2.md:72,99` and the row's fold note "`F4.1+14.1+14.2`" — plausibly in-scope via the folded
14.2, but the spec never cites that provenance, so as written they read as scope expansion past "perfect the
CONTENT, do not restructure" (SEED §"What a KEYSTONE SPEC is"). The relief enhancement IS correctly flagged as a
fold-candidate; deboss + headline are not. **Fix:** cite the folded-row/WS9 mandate that puts deboss + grain-on-
headline inside 14.1/14.2, OR record them as fold-candidate notes like the relief.

**M4 — committed-asset-FILE vs inline-base64-data-URI is left ambiguous, and it bears on the hash anchor, the
payload budget, and `image-set()`.** §4.1.B says "committed asset + base64 into `--paper-grain-tooth`" and §Q1
final says "base64 in the SAME `--paper-grain-tooth` token." A data-URI in the custom property gives engine-
invariant pixels + a stable born-RED hash + the byte-identical-token-name migration — but forgoes HTTP caching,
inflates `paper.css` text, and makes `image-set()` 1×/2× awkward (two base64 blobs). A committed `url(./asset.png)`
is cacheable + smaller-in-CSS but the hash anchor + "same token, no consumer edit" shift. **Fix:** pick one
explicitly (the determinism + same-token argument favors the data-URI; then state the ≤32 KiB ceiling is on the
base64 length and `image-set()` is dropped-by-default).

**M5 — coverage wiring risks a DOUBLE tooth on math-paper.** §4.1.F wires `Card :grain` on math-paper's worksheet
card, "already composes `paper-grain-overlay paper-grid` (`math-paper.vue:21`)." Card's `grain` default is already
`true` (`Card.vue:178`) and applies the `paper-grain-overlay` `::after`; if the same worksheet node also carries
the explicit `paper-grain-overlay` class, the tooth `::after` stacks twice (2× α → out of the painted band). **Fix:**
specify the exact node and confirm the overlay is applied ONCE (either the Card's `grain` OR the explicit class,
not both).

**M6 — protected-set disambiguation for `--paper-grain-opacity` is missing.** SYNTHESIS-PASS1 §4 protects "the warm
HSL identity values, **alpha ladders**…" (`SYNTHESIS-PASS1.md:111`), and `dark-arm.css:245-246` explicitly frames
the paper light/dark grain pair as a √φ "opacity ladder." The spec moves it (0.21→~0.16 light, 0.16→~0.12 dark,
§3.Q2) and defends it only as "the paper-register's own token." That is defensible (the grain deployment α is a
calibration knob the whole corpus expects to re-derive; presets-in-consumers = the library's identity evolves at
home), but the spec never distinguishes it from the PROTECTED "alpha ladders" (the glass-tier / surface-tint
identity registers). Given the KS-A critics caught protected-set issues, make this explicit. **Fix:** one sentence
in §5/§4.4: `--paper-grain-opacity` is the grain DEPLOYMENT calibration knob, NOT the protected glass-tier/
surface-tint identity ladder; its re-derivation is the sanctioned in-home evolution.

### MINOR

**m7 — citation drifts (all non-fatal, fix for executability):** (a) the atlas path is `sci-report/atlas/src/
platform/design/recipes.css`, not `atlas/src/…` (spec §4.1.D + both research reports drop the `sci-report/`
prefix). (b) §4.1.B "atlas… `recipes.css:507` masthead fork" — the actual masthead-grain recipe is `~424-449`
and it clips **`--paper-aged-texture`**, not `--paper-grain-tooth`; so the "consume-and-delete onto the glass-ui
headline utility" only works if that utility reads aged (or atlas re-points) — state which. (c) the cursor has NO
row **14.0**; 17.5's precond names "14.0 GU-1 token" but no such row exists — the spec silently folds GU-1 into
14.1 §0 (reasonable), but should note the orphaned 14.0 reference as an orchestrator note so the fold is explicit.
(d) `--paper-grain-tile` readers are `paper.css:56,82` (spec cites 45/55/80 — the def line + ~1px drift); and no
sibling-consumer check was run on the tile-PERIOD token (low risk, but the tooth token IS externally consumed, so
say the tile period is internal-only after a grep).

## What is RIGHT (holds under challenge)

- **The five critique axes** applied to the spec pass: not contrived (hybrid tile+baker rides the real
  `regen-spring-tokens` precedent); the enhancement default-DROP is genuine KISS, not gilding; subtle-first
  throughout; the two-sided floor+ceiling gate is the exact D-2 structural cure (warmth baked AT SOURCE severs the
  substrate-dependency that recurred three times). The one over-engineering pocket is M1 (arm-8 decode).
- **Greenfield loop genuinely run** — Q1 (a/b/b2/c), Q2 (a/b/c), Q3 (a/b/c), each with GOLDEN + real self-challenge
  + final form. Not theater.
- **SOTA cited + current** — tactile-maximalism 2026, Apple Liquid Glass HIG, letterpress ink-coverage law, film-
  grain-is-structured; all named + linked; the raster-primary decision is SOTA-correct on five independent grounds.
- **Precepts conformance** — motion-canon (static register, the only animated channel is the existing engage
  cross-fade), design-idioms §12 grain pop-kill byte-preserved, three-underline fence untouched, clean-break no-
  alias, ≥2-consumer, token-first, compositor-only+PRM, foreign-tree fence (atlas via F8 ledger, never edited) —
  all honored. The `--paper-grain-relief` "if it ships it is a gated layered token, else it does not exist"
  correctly obeys W-PRUNE-CONSOLIDATE no-dual-path.
- **Protected set** — DOCK_SPRING/4.10/glass-level/SPRING_PRESETS untouched; GU-1 under-shadow X derivation is
  value-only and correctly scoped as GU-1's precondition, not KS-PAPER's invention.

## Bottom line

No disk-false load-bearing claim (M2/M3/M4/M5 are diligence/precision gaps, not falsehoods; the one external claim
I most doubted — the atlas aged consume — verified TRUE). The design is sound and the gate family is the right
shape. Close M1 (the paper single-light witness must be measurable or honestly demoted), pin M3–M4 (scope + source
form), and record M2/M5/M6 — then it is binding-spec-ready.
