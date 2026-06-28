# BG-WS12 · Coherence · Congruence (the CAPSTONE) — SPEC pass-3

> Status: SYNTHESIS pass-3. **ADVANCES** `SPEC-pass2-converged.md` on the three-item
> unconverged frontier the brief names; it does NOT restart. Pass-2's §1 GESTALT, the
> census C1–C21 routing table, the §4 calibration-of-the-exceptional, the four-task frontier
> shape, and the R1 cap all STAND. Pass-3 converges the residual on FOUR axes the prior
> passes left open:
>
> 1. **The census is a THIN leaf-COMPOSING orchestrator, not a re-walking 344th aggregate
>    (the central architectural reconcile).** The corpus-heavy detection lives ONCE per axis
>    in a shared leaf (`hue-at-l.mjs` for colour, `spring-table.mjs` for springs); the census
>    AND the owning gate import the SAME predicate — the DRY answer to "don't build a parallel
>    walker that duplicates four owning gates."
> 2. **The DEFECTS are LEGACY to DELETE, not allowlist (the no-legacy law).** WS12 FOLDS the
>    three rogue springs onto the live table, re-spells HandMark onto its token, deletes the
>    A5 double-blur, and DELETES the dead allowlist entries — the census/A9 are the LOCKS that
>    prevent regression, the clean-break src edits are the FIX.
> 3. **The A5 PAINT corrected to fill+rim-only is the C20 build (item 1).** Re-painted across
>    the dark→bright envelope on both engines, with the per-register depth check + the
>    scope-completeness re-verify the prior pass owed.
> 4. **Commit hygiene + the §2.4 instrument flatten-faithfulness (item 2/3).** The persist
>    lands in coherent per-WS slices over a clean tree; the capture instrument proves the
>    flatten decodes a faithful glass composite before any decoded-pixel π is trusted.
>
> The binding harmonized-whole 120-route × 2-engine × 2-mode capture **rides WS1–WS11 landing**
> (R1 — `git diff master..HEAD -- src/ demo/` is EMPTY at HEAD `5ddb2e94`; HEAD src ==
> BD-4.2.0 == the broken surface). Pass-3 ships the persisted gates + the corrected A5 paint +
> the wired instrument; the whole-system verdict is post-integration.
>
> **HONEST CAP (the convergence gate, stated up front).** Two items run NOW on broken HEAD
> (the gate persist + the A5 re-paint + the instrument wiring); item 3 (the whole-system
> capture) is structurally post-integration. WS12 is develop-ready; "system congruence" is NOT
> claimed on faith — the gate's GREEN-on-corrected ≠ system convergence (the F1–F5
> headless-green trap shipped 3×).

---

## 0 · CONVERGENCE DELTA over pass-2 (the pass-3 resolutions)

1. **The census is leaf-COMPOSED, the "344th gate" critique RESOLVED.** The convergence-loop
   risk was a monolithic `proof-coherence-census.mjs` that re-walks `src/` and re-parses
   `{response,ζ}` with a NEW parser, duplicating four owning gates (`proof:no-gray`
   `relativeOklchFrom`, `proof:motion-one-clock`'s walker + allowlist, `proof:animation-
   coherence`'s easing scan, `proof:nested-backdrop-budget`). RESOLUTION: every corpus-heavy
   DETECTION predicate lives ONCE in a shared leaf, and BOTH the census AND the owning gate
   import it — the `hue-at-l.mjs` model generalized to the spring axis. The census's job is to
   RUN the shared predicates as ONE cross-SURFACE coherence verdict (the capstone artifact the
   per-surface π cannot replace), NOT to re-implement detection. Two genuinely-new leaves:
   `scripts/lib/hue-at-l.mjs` (A1) and `scripts/lib/spring-table.mjs` (A2/A9). A3 (cross-tier
   blur-peer) + A4 (cross-file easing-token discipline) stay in the census because NO single
   owning gate asserts them today (`proof:animation-coherence` is `<style>`-block-only — it
   misses `HandMark.vue:87`'s bezier-in-a-JS-string; the census is the cross-file home, the
   bound recorded).

2. **The four DEFECTS are FOLDED/DELETED, not allowlisted (no-legacy).** The seed-audit lists
   `DECK_SPRING + Card-press re-derive` and `HandMark easing` as WS12-OWNED builds; the A5
   double-blur is WS12-owned. The clean-break src edits (each verified at HEAD):
   - `deck/constants.ts:12` `DECK_SPRING = {response:0.5, dampingFraction:0.85}` (off-table;
     live smooth is `{0.58,0.8}`) → **`DECK_SPRING = springPreset("smooth")`** (the exact
     pattern `dock/constants.ts:85` `DOCK_SPRING` already uses; CLAUDE.md declares
     `--spring-deck: var(--spring-smooth)`, so the value IS smooth).
   - `Card.vue:227-228` `useLiquidPress({response:0.28, dampingFraction:0.78, …})` (off-table;
     live press `{0.2,0.8}`) → **`useLiquidPress({...springPreset("press"), shrinkDepth, …})`**
     — the spring CLOCK folds onto the table; `shrinkDepth`/`maxStretch` stay the only
     legitimately card-specific knobs. (π-confirmed, not census-confirmed — the press FEEL.)
   - `HandMark.vue:87` `const ease = "cubic-bezier(.16,1,.3,1)"` re-spells `--ease-out-expo`
     → **`const ease = "var(--ease-out-expo)"`** (valid in the inline `transition` string at
     `:89`).
   - `glass-capsule.css:64` the nested `.glass-capsule { backdrop-filter: var(--glass-blur-
     floating) }` inside `.glass-capsule-track` (`:85`, `var(--glass-blur-quiet)`) → the
     scoped **`.glass-capsule-track .glass-capsule { backdrop-filter: none; -webkit-backdrop-
     filter: none }`** override (item 1, the C20 build).
   - The `SPRING_DEFAULTS_ALLOWLIST` DEAD entries: `useSpringPress[0.25,0.7]` + `DOCK_SPRING
     [0.32,0.7]` exempt literals that **no longer exist in source** (both consts read
     `springPreset(...)`) → **DELETE** them; correct `DRAWER_SNAP[0.4,0.82]` → `[0.5,0.74]`
     (the one genuine own-clock hand-literal, `drawer/constants.ts:27`); keep `useSpring
     [0.5,0.86]` (it MATCHES `useSpring.ts:107`, not stale).

3. **The pass-1 §4 vibrancy-sanctioned note is RETIRED (the lingering contradiction).** Pass-1
   §4 still says "selected-reads-as-glass at FILL+VIBRANCY (dock-control active tier) is the
   SANCTIONED nesting." Pass-2 §0#9 FALSIFIED the vibrancy `filter` (it tints child text), and
   the dock active register `--dock-control-active-bg: var(--glass-bg-floating)` is consumed
   as `background:` ONLY (fill, no 2nd backdrop-filter — the allowlist MODEL). Pass-3
   SUPERSEDES the pass-1 note IN PLACE in `WS12-CENSUS.md`: the SANCTIONED selected-glass model
   is FILL+RIM, no 2nd blur, no `filter:`. (Leaving both converged specs contradictory invites
   a future agent to re-propose the falsified filter.)

4. **A1 is the GENERIC over-correction catcher, warm-base-SCOPED (folded + hardened).** The
   prototype census (`227-30:100-103`) still HARDCODES `INK_REGISTRY` to 2 entries while the
   docstring claims "auto-discover." The persist replaces it with `discoverChromaFlooredInk
   ("src/styles")` — a grep-walk for `--<name>: oklch(from var(--<warm-base>) …(max(c,N)|
   clamp(lo,c,hi))…)`. At HEAD it yields EXACTLY `--cartoon-ink` × 2 (`shadow.css:107` light +
   `dark-arm.css:177` dark, the `calc(1-l)` L-channel the `evalExpr` handles). It SKIPS
   `shadow.css` `--cartoon-ink: var(--cartoon-ink-fallback)` (a `var()`, not a `c`-floor) and
   the 18 unfloored `oklch(from … c …)` surface-tint sources (no chroma floor). **The
   warm-base filter is LOAD-BEARING** (risk-folded): the walk scopes to warm-base tokens
   (`--foreground` family) so a FUTURE cool-base floored token (e.g. `oklch(from var(--primary)
   … max(c,N))`, `--primary` is dark-mode violet) does NOT false-RED via the INTENDED-warm-hue
   leg. The docstring reconciles to the genuine walk.

5. **A2 brace-balanced parse via the shared `spring-table.mjs` leaf (DRY, folded).** The
   prototype's 160-char proximity regex (`227-30:149-161`) mis-pairs across neighbouring
   objects. The persist factors the brace-balanced `{response,ζ}` object-literal extractor +
   the live-`SPRING_PRESETS` `isNamedRow` predicate into `scripts/lib/spring-table.mjs`; the
   census A2 imports it; `proof-motion-one-clock`'s `≥2-cluster` walker RE-POINTS onto the SAME
   `extractSpringPairs` (closing the kiss-dry "duplicate parser" fully). The
   `SANCTIONED_SPRING_FILES` by-file exemption STAYS. The census A2 owns the SINGULAR-off-table
   born-RED home (`DECK_SPRING`/`Card.vue` are 1-row-per-file → they sail
   `proof-motion-one-clock`'s ≥2-threshold; the census catches them, the fold greens them) —
   the census is born-RED by design, so this does NOT escalate a release gate.

6. **A9 lives IN `proof-motion-one-clock` + reconciles the doc-rot at its source.** A9
   value-checks each `SPRING_DEFAULTS_ALLOWLIST` literal against its live source (`useSpringPress`
   → `springPreset("press")` `{0.2,0.8}`; `DOCK_SPRING` → `springPreset("dock")` `{0.68,0.64}`;
   `DRAWER_SNAP` → `drawer/constants.ts:27` `{0.5,0.74}`) — all 3 RED on HEAD, GREEN when the
   allowlist is corrected per §0#2. PLUS the `scheme-spring.css:24-36` header comment block
   (stale on all 6 rows — `smooth (0.50,0.86)→(0.58,0.80)`, &c.; the generated `linear()`
   tokens below are correct) is reconciled. **+ the CLAUDE.md spring-prose doc-rot** (4 stale
   literals: `:475 useSpringPress 0.25/0.7`, `:569 snappy 0.35/0.65`, `:679 DOCK_SPRING
   0.32/0.7`, `:803 DRAWER_SNAP 0.4/0.82`) is reconciled in LOCKSTEP with the spring fold (the
   `BG.W-ANIMATION-CONGRUENCE` wave that folds the spring fixes the prose that describes it —
   the `proof:precept-current` doc-freshness discipline applied to springs). A9 reds if any
   `scheme-spring.css` header row ≠ the live `springPresets.ts` row.

7. **A3/A4 coverage WIDENED + robustness guards (folded + risk-hardened).**
   - **A3** keeps the WS3 blur-PEER token assertion (base-chrome `{quiet8,resting10,dock9}` =
     3 dialects → RED; elevated `{floating13,overlay13}` peer-OK) AND adds the inline raw
     `backdrop-filter|filter: blur(Npx)`-off-the-`--glass-blur-*`-primitive scan over
     `src/**/*.{vue,css}`. The GREEN target COORDINATES with WS3's landed peer (the WS3-M4
     `~quiet8/resting8/dock-RETIRED/floating10/overlay10` shape), NOT a literal == . **+ the
     fail-loud-on-zero-members guard** (risk-folded): if a WS3 token-retire nulls all
     tier members the peer check must RED (not vacuously GREEN — the positional-coupling
     vacuous-green class).
   - **A4** keeps the re-spell detector (`HandMark.vue:87` → RED) AND adds the NOVEL off-token
     `cubic-bezier()/steps()/linear()` scan in `transition`/`animation` timing positions naming
     no `--ease-*`/`--spring-*` token (excludes `custom/easing/` + `var(--x, cubic-bezier(…))`
     fallbacks). **The A4 scan reads raw file text** (strips comments only, NEVER string
     literals — the `HandMark.vue:87` bezier lives INSIDE a JS string; a strip that eats string
     contents misses it — risk-folded). A4 is the census's cross-file home; `proof:animation-
     coherence` stays `<style>`-only by design (ONE home, the bound recorded in `WS12-CENSUS.md`).

8. **A5 corrected to fill+rim ONLY + the per-register depth check (item 1, folded).** The
   scoped filter-free override (§0#2). **The binding depth assert is PER-REGISTER, not the
   global max** (risk-folded): `proof:nested-backdrop-budget` measures the GLOBAL max depth,
   which may stay ≥2 from another register and hide the capsule's 2→1 drop — the A5 source arm
   asserts the `.glass-capsule-track .glass-capsule` register SPECIFICALLY drops from a nested
   double-blur to a single sample. **Scope-completeness re-verified at SOURCE** (folded): the
   pill-in-track is the ONLY by-construction static double-blur — `menu.css` `.glass-menu-row`
   is fill-only (oklab-tint, ZERO backdrop-filter), `stack-rail.css:192` chip is box-INVIOLATE
   outside the dock clip (`.glass-dock-frame` non-clipping escape samples the PAGE not the dock
   plate). The dock active register is fill-only (no edit, the MODEL).

9. **The §2.4 instrument flatten-faithfulness check is the trust gate (item 3, folded).**
   Before any decoded-pixel coherence assertion is trusted, the instrument decodes the SAME
   glass-over-backdrop surface FLATTENED-vs-SCROLLED and proves ΔL within tolerance; if sticky
   `.scroll-pin` stages / `position:fixed` StoryHero backdrops corrupt the flatten (57
   scroll-entrance sites across 22 flatten-hostile files), it falls back to per-viewport
   scroll-and-stitch. The flatten corrupts `backdrop-filter` SAMPLING — an unfaithful flatten
   makes the decoded L garbage (the headless-trap recurring at the CAPTURE layer).

10. **The A1 band ⊥ WS3 dark-arm coordination snag is RECORDED + resolved.** The A1 band lower
    bound is `proof:no-gray` `STRONG_FLOOR` 0.02. WS3-M1's dark-arm DEFAULT (A) DRY-collapses
    the dark `--cartoon-ink` (deletes `dark-arm.css:177`, the dark inherits the `:root` light
    pin → in band, GREEN). WS3's FALLBACK (B) `clamp(0.018,c,0.025)` has chroma floor `0.018 <
    0.02` → A1 would FALSE-RED. RESOLUTION (recorded in `WS12-CENSUS.md` + coordinated with
    WS3-M1): the shared `hue-at-l.mjs` band lower bound is pinned to `min(0.018, STRONG_FLOOR)`
    ONLY for the relative-color ink band (so WS3's (B) greens), OR WS3 hard-commits to (A)/a
    dark floor ≥ 0.02 — the decision lands in `WS12-CENSUS.md` BEFORE the leaf's band constant
    is frozen. (The intended-chroma-over-FLOOR leg's binding job is the over-floor CEILING
    catch — `0.11 ≫ 0.06` — which is independent of the 0.018-vs-0.02 lower nuance.)

11. **Commit hygiene — coherent per-WS slices over a clean tree (item 2).** The tree carries
    cross-WS accretion that BLOCKS `proof:gate-manifest-sound` CLEAN-TREE (allowlist =
    `docs/precepts` only): `M scripts/lib/critical-path-walk.mjs` + `M scripts/proof-ba-
    gestalt.mjs` + `?? scripts/lib/surface-closure.mjs` (the WS7 paint-walk DRY consolidation —
    `proof-ba-gestalt` imports `deriveSurfaceClosure`; `critical-path-walk` exports the shared
    `EDGE_RE`), `?? scripts/proof-de-shadcn.mjs` (WS10, unwired), and `D .retired-classes.txt`
    (a STRAY deletion that reds `proof:phantom-classes` — its only reader). RESOLUTION: (a)
    **REVERT the `.retired-classes.txt` deletion** before any WS12 commit (not WS12's; restores
    the gate); (b) the WS7 surface-closure consolidation + the WS10 de-shadcn commit under
    THEIR slices (WS12 depends on `surface-closure.mjs` being ON-TREE for the spec.ts freshness
    — a dependency, not WS12's commit); (c) WS12 persists its OWN four scaffolds + the leaf in
    dependency order. The "persisted + proven RED" claim is FALSE until on-tree AND CLEAN-TREE
    clears.

---

## 1 · GESTALT GOAL (unchanged — see pass-1 §1 / pass-2 §1)

WS12 harmonizes WS1–WS11 into ONE warm/weighty/liquid iOS-27 system. Governing principle:
**visual regression detects change from a baseline; it does NOT detect deviation from the
SYSTEM SPEC** — the ~156 per-surface π + `proof:ba-gestalt` see LOCAL coherence; none sees a
stray spring/blur/easing/tint/hue that coheres locally but breaks the SYSTEM. WS12 builds the
cross-SURFACE system-spec gate BESIDE the regression π. It is HARMONIZATION, not MINT: its
un-owned BUILDS are the gate leaves, the A5 anti-stacking, the hue-at-L predicate, the clock-
fence discharge, the demo-backdrop congruence; everything else is VERIFY routed to its owning
WS (the C1–C21 routing table stands). **Coherence ≠ uniformity** — the gate encodes TIER
discipline (the Apple `.regular`/`.clear` model transposed: a content-tier surface never paints
a floating/overlay blur; the dock/overlay band self-darkens; no surface stacks two translucent
panes), NOT a single register everywhere.

---

## 2 · THE CENSUS — leaf-COMPOSED, the cross-surface system-spec lock

### 2.1 · The shared predicate leaves (the single sources)

**`scripts/lib/hue-at-l.mjs` (A1 — the colour predicate; lands FIRST, R6).** The
`clamp/calc/max(c,…)` relative-color evaluator + `inkBandVerdict`, reusing `oklabFromRgb` from
`reflect-capture-verify.mjs` (the ONE forward decompose). Exports `resolveRelativeColor`
(`map:"clip"|"css"`), `evalExpr` (handles the dark `calc(1-l)` L-channel), `inkBandVerdict`,
`hslToRgb`. **Two+ importers (the DRY bar MET):** `proof-coherence-census` (A1) +
`proof-hue-at-l` (standalone). The third (`proof-no-gray.mjs:195 relativeOklchFrom`
re-points onto `resolveRelativeColor(map:"clip")`) lands under **WS3-M1**, NOT this wave — the
leaf lands FIRST so WS3-M1 has it. NO third inline resolver.

```js
// inkBandVerdict — the ONLY device-free RED is the AUTHORED signal (engine-independent):
//   INTENDED chroma in [cLo,cHi] (floor catches grey; CEILING catches max(c,0.11) oxblood),
//   AND INTENDED hue in warm-amber. The painted (worst-case-clip) hue + the gamut-clip
//   hue-SHIFT are ADVISORY (printed, NEVER a CI fail — a chroma-reducing engine MAY preserve
//   hue ~55°). The band lower bound coordinates with WS3-M1's dark-arm choice (§0#10).
export function inkBandVerdict(resolved, band) { /* prototype 227-30 base, unchanged */ }
```

**`scripts/lib/spring-table.mjs` (A2/A9 — the spring predicate; the NEW DRY leaf).** Exports
`extractSpringPairs(src)` (brace-balanced `{ … response: N … dampingFraction: N … }`
object-literal parse — locate each `{…}` carrying both keys at ONE brace depth, extract the
pair; NOT the 160-char proximity regex), `liveRows()` (imports `SPRING_PRESETS` LIVE), and
`isNamedRow(r,z,eps=0.001)`. **Two importers:** `proof-coherence-census` (A2, singular
off-table detection) + `proof-motion-one-clock` (its `≥2-cluster` walker re-points onto
`extractSpringPairs`; A9's value-check reads `liveRows`). The kiss-dry "duplicate parser"
critique RESOLVED — ONE extractor, two callers.

### 2.2 · The census arms (the cross-surface roll-up)

`scripts/proof-coherence-census.mjs` (`["ci"]`) — born-RED on the broken HEAD, GREEN as the WS
harmonizations land. Each arm + a per-arm self-test bite; a synthetic defect MUST flag, a
synthetic clean MUST pass.

- **A1** — `discoverChromaFlooredInk("src/styles")` warm-base grep-walk (§0#4) → resolve each
  via the leaf, `inkBandVerdict` against `INK_BAND = { chroma: [<lo §0#10>, 0.06], warmHue:
  [45,88], hueShiftTol: 12 }`. HEAD: `--cartoon-ink` × 2 RED (`0.11 ≫ 0.06`). Self-test: live
  `max(c,0.11)` reds; `max(c,0.03)` + WS3 `clamp(0.030,c,0.050)` green (band-checked, not
  literal); synthetic over-floor / achromatic / authored-cool all red.
- **A2** — `extractSpringPairs` over `codeFiles` minus `SANCTIONED_SPRING_FILES`; each pair
  `isNamedRow` OR RED. HEAD: `DECK_SPRING {0.5,0.85}` + `Card.vue {0.28,0.78}` RED. Self-test:
  synthetic off-table `{0.99,0.99}` reds; the LIVE `press {0.2,0.8}` (read at runtime) passes.
- **A3** — the WS3 blur-PEER tier assert + the inline-raw-blur scan + the fail-loud-on-zero
  guard (§0#7). HEAD: base-chrome `{8,10,9}` 3 dialects RED. Self-test: divergent `{9,10,8}`
  flags; peer `{8,8,8}` passes; zero-members REDS (not vacuous green).
- **A4** — the re-spell detector + the novel-off-token scan, raw-text (§0#7). HEAD:
  `HandMark.vue:87` re-spell RED. Self-test: `.16,1,.3,1` re-spell of `out-expo` detected;
  bespoke `0.34,1.56,0.64,1` NOT a re-spell.
- **A5** (source arm, sits-BESIDE `proof:nested-backdrop-budget`) — the `.glass-capsule-track
  .glass-capsule` override PRESENT + the PER-REGISTER depth drop + the dock active register
  stays fill-only (§0#8). HEAD: override absent → RED.

### 2.3 · The proof-hue-at-l standalone gate

`scripts/proof-hue-at-l.mjs` (`["local","ci"]`) — the standalone A1 gate: RED on HEAD via the
intended-chroma-over-floor leg, GREEN on the band, the clip-hue advisory printed, the self-test
bites. The standalone + the census A1 + (later) `proof-no-gray` all import the ONE leaf.

### 2.4 · A9 in proof-motion-one-clock

`scripts/proof-motion-one-clock.mjs` — (a) the `≥2-cluster` walker re-points onto
`spring-table.mjs` `extractSpringPairs` (DRY, brace-balanced upgrade, ≥2-threshold UNCHANGED so
no release-gate born-RED escalation); (b) **A9 value-checks each `SPRING_DEFAULTS_ALLOWLIST`
literal** against `liveRows()` / the constant source (§0#6) — `useSpringPress`/`DOCK_SPRING`
DEAD entries flagged, `DRAWER_SNAP` stale flagged; (c) the `scheme-spring.css` header rows
value-checked. Born-RED on HEAD (3 stale literals + 6 stale header rows); GREEN when the
allowlist + header are corrected to live values per §0#2/§0#6.

---

## 3 · THE CLEAN-BREAK FIXES (no-legacy — the DEFECTS deleted, not allowlisted)

These are the WS12-owned src edits the gates LOCK (the gate is downstream of the fix). Each
greens its census arm by REMOVAL, not exemption.

| Defect | File:line | Fix | π/verify |
|---|---|---|---|
| `DECK_SPRING {0.5,0.85}` off-table | `deck/constants.ts:12` | `= springPreset("smooth")` | device-free (greens A2) + deck-spring read unchanged (`--spring-deck = var(--spring-smooth)`) |
| Card press `{0.28,0.78}` off-table | `Card.vue:227` | `{ ...springPreset("press"), shrinkDepth, maxStretch }` | π — the `:pressable` card press FEEL on `press-unify.spec.ts`/`button-glass.spec.ts` (a feel change, not a census green) |
| HandMark raw bezier re-spell | `HandMark.vue:87` | `const ease = "var(--ease-out-expo)"` | device-free (greens A4) + the draw-on π unchanged |
| `.glass-capsule` double-blur | `glass-capsule.css:64` | scoped `.glass-capsule-track .glass-capsule { backdrop-filter: none; -webkit-backdrop-filter: none }` | §4 (item 1, the C20 build) |
| DEAD allowlist entries | `proof-motion-one-clock.mjs:127-148` | DELETE `useSpringPress`/`DOCK_SPRING` (read the table now); `DRAWER_SNAP → [0.5,0.74]`; keep `useSpring [0.5,0.86]` | A9 greens |
| `scheme-spring.css` header rot | `scheme-spring.css:24-36` | reconcile all 6 rows to live | A9 greens |
| CLAUDE.md spring prose rot | `:475/:569/:679/:803` | reconcile to live | the spring-fold wave fixes the prose in lockstep |
| stray `.retired-classes.txt` deletion | working tree `D` | **REVERT** (not WS12's; restores `proof:phantom-classes`) | clean-tree precondition |

**NOT folded in WS12 (flagged, NOT silently dropped):** `useSpring.ts:107` default `{0.5,0.86}`
is OFF-table but by-file EXEMPT (sanctioned base-primitive seam, the allowlist matches source).
Folding it to `springPreset("smooth")` is a runtime-behavior change for every defaulting spring
(a coherence improvement — "one spring family" wants the base floor to BE smooth) and needs a
π-confirm, so it is BOOKED to `BG.W-ANIMATION-CONGRUENCE` with the explicit behavior-change
caveat, NOT mandated here. Recorded in the residual ledger.

---

## 4 · ITEM 1 — the A5 fill+rim RE-PAINT (the C20 build)

**The edit (the ONLY A5 change).** `src/styles/glass/glass-capsule.css` gains the specificity-0
scoped override; NO vibrancy `filter:` (it filters the whole subtree → tints child label/glyph
of every content-wrapping capsule). The forward-ness = fill (`--glass-capsule-fill` 0.84/0.91 vs
track 0.50) + rim + lift (the file's own header comment: "FORWARD-ness comes from the rim +
lift, NOT from cranking the same-hue alpha"). The dock active register is fill-only (NO edit,
the MODEL). This is the CSS transposition of Apple's `GlassEffectContainer` "one shared sampling
region / glass cannot sample glass" rule (W3C Filter-Effects-L2: a non-`none` `backdrop-filter`
establishes a backdrop root, so the nested pill samples ONLY the track's already-filtered fill)
— a canonical merge-not-nest, NOT a perf hack; the depth drop is a net-positive side effect.

**The paint proof (the binding REFINE that caps A5).** In a worktree: apply the override, real
`vite build` `/styles` (NO `!important` injection), serve the demo, capture chromium + webkit
both modes ACROSS the dark→bright bright-bucket envelope on `/navigation/tabs` (the warm
paper-grain tabs route) + a busy-aurora route. Assert the THREE binding decodes:
1. **pill-vs-track FORWARD differential** via decoded pixel (`pngRegionStats` → composited L /
   rim), measured WITH the 2nd blur removed — the prototype LEG-2 target `+0.037/+0.044` ΔL ≈
   HEAD's accepted read; if it reads FLAT (< ~+0.02) A5 RE-OPENS;
2. **the pill's child label/glyph UN-tinted** (the filter-bleed falsification — a tinted glyph
   RE-OPENS A5);
3. **a standalone glass Button on a separate route byte-untouched** (its `backdrop-filter`
   intact — the scope-leak falsification).
Gate battery GREEN on the real in-file edit: `proof:nested-backdrop-budget` PER-REGISTER depth
DROPS (§0#8); `proof:touch-target` / `proof:glass-cohesion` / `proof:no-gray` GREEN. The W55
bright-bucket darkens the plate over a busy field — confirm the pill does NOT over-brighten into
a too-hot read across the envelope. Internal-consistency: the override uses real classes
`.glass-capsule-track .glass-capsule` (specificity 0,2,0 — the robust choice; `glass-capsule.css:64`
is the ONLY `.glass-capsule { backdrop-filter }` declaration so a `:where()` form would also win
on source-order, but the real-class form is unambiguous).

---

## 5 · ITEM 2/3 — the §2.4 capture instrument (wired, flatten-faithful)

`tests-visual/coherence-congruence.spec.ts` over the EXISTING `playwright.config.ts` (webkit
`testMatch` widen at `:119`) — NO standalone `.mjs`, NO `bt.launch`. The build closes the seams:

1. **Hard-load + FULL clip-chain neutralize.** Per route `page.goto(route,{waitUntil:"load"})`
   (corpse-free) → `waitForSelector(expectedSurface)` → release the WHOLE app-shell chain
   (`html/body/#app/#app>div/.demo-main-scroller` `height:auto; overflow:visible` — NOT the
   scroller alone; `AppShell.vue:370` `h-screen overflow-hidden` pins to 100vh) AND snap every
   ENTRANCE timeline to terminal (`animation-timeline:none` + `transform:none; opacity:1` SCOPED
   to `.scroll-cascade > *`/`[data-scroll-reveal]`/`.scroll-build` — NOT a blanket `animation:
   none` that kills metal-shimmer/handmark-boil steady-state). `waitForFunction(stuck===0)`.
2. **Flatten-faithfulness check (the trust gate — §0#9).** Decode the SAME glass-over-backdrop
   surface flattened-vs-scrolled; ΔL within tolerance → trust the flatten; else fall back to
   per-viewport scroll-and-stitch (NOT a flatten that unsticks `.scroll-pin` / tiles `position:
   fixed`).
3. **Real decode + a DECODED-PIXEL coherence assertion.** `fullPage:true` Buffer to disk →
   `isRealPng` + `pngDimensions` + `pngRegionStats`; ≥1 end-to-end π binds a real two-surface
   composited-L differential (NOT `getComputedStyle` — the §0#1 demoted authority echoes the raw
   `oklch` verbatim). Surface-hash freshness rides `scripts/lib/surface-closure.mjs`
   `deriveSurfaceClosure` (on-tree under the WS7 slice — §0#11).
4. **The A1 cast arm + the A5 nested-vs-standalone arm + both modes.** The A1 `#__cartoon_cast`
   swatch screenshot → `pngRegionStats` decode RECORDED per engine/mode (diagnostic, NEVER a CI
   RED); the A5 nested-pill-vs-standalone-button decode; over `{light, dark}` in
   `{chromium-headless-new, webkit}`.
5. **Budget + scope cap.** The binding run is the LIVE 120 `s()` routes × 2 engines × 2 modes =
   **480 fullPage captures** + real decode, `workers:1 fullyParallel:false`, ~20-40min serial,
   **`local`-tagged** (never CI). Playwright-webkit = **ACQUIRABILITY ONLY** (reports
   `startViewTransition`/`backdrop-filter:url()`/`animation-timeline` ALL `true` while real
   Safari drops them) — the C19/SVG-lens/`-webkit-backdrop-filter` fidelity + on-device gamut
   cast need **real Safari.app / Chrome.app on AS-Tahoe**, the NAMED device-paint pass-3 cannot
   reach headless. The harmonized-whole verdict (R1) is post-integration.

---

## 6 · FILES TOUCHED (pass-3)

**New on tree (the persist, in dependency order):**
- `scripts/lib/hue-at-l.mjs` (FIRST — the A1 leaf; from `227-30`).
- `scripts/lib/spring-table.mjs` (the A2/A9 leaf — NEW; brace-balanced extractor + `liveRows` +
  `isNamedRow`).
- `scripts/proof-hue-at-l.mjs` (the standalone A1 gate; from `227-30`).
- `scripts/proof-coherence-census.mjs` (DRY-fixed: generic-walk A1, leaf-imported brace-balanced
  A2, widened A3/A4, the A5 source arm; from `227-30` + the develop-out).
- `tests-visual/coherence-congruence.spec.ts` (the §2.4 instrument; from `227-33` + the
  develop-out — the A1 cast arm, the A5 arm, both modes, the flatten-faithfulness check,
  `deriveSurfaceClosure` freshness).
- `docs/tranches/BG/audit/coherence/W-CARTOON-INK-CAST-DELTA.md` (the A1 painted-cast record).
- `docs/tranches/BG/converge/BG-WS12-coherence-congruence/WS12-CENSUS.md` (the C1–C21 census +
  the 4 HEAD defects + the A2/A3/A4 coverage bounds + the §0#3 vibrancy reconcile + the §0#10
  band coordination decision).

**Edited:**
- `scripts/gates.mjs` + `package.json` (register `proof:coherence-census [ci]` + `proof:hue-at-l
  [local,ci]` — with `gatesFor()` manifest rows or they red as manifest dark matter).
- `tests-visual/playwright.config.ts:119` (webkit `testMatch` widen).
- `scripts/proof-motion-one-clock.mjs` (re-point the cluster walker onto the leaf; A9
  value-check; `scheme-spring.css` header check).
- `src/styles/glass/glass-capsule.css` (the scoped filter-free A5 override — item 1, the C20
  build post-paint-confirm).
- `src/components/custom/deck/constants.ts` · `src/components/ui/card/Card.vue` ·
  `src/components/custom/handmark/HandMark.vue` (the clean-break spring/easing folds — §3).
- `src/styles/tokens/scheme-spring.css` + `CLAUDE.md` (the spring doc-rot reconcile — §3).

**Reverted (precondition):** `.retired-classes.txt` (the stray `D` — §0#11).

**Under their OWN WS slice (a dependency, not WS12's commit):** `scripts/lib/surface-closure.mjs`
+ `scripts/lib/critical-path-walk.mjs` (`EDGE_RE`) + `scripts/proof-ba-gestalt.mjs` re-point
(WS7); `scripts/proof-de-shadcn.mjs` (WS10).

---

## 7 · WAVE BREAKDOWN (pass-3 — the same BG.W-* waves, advanced)

- **BG.W-COHERENCE-CENSUS** (zero-pixel) — produces `WS12-CENSUS.md` (the 4 HEAD defects + the
  A2/A3/A4 coverage bounds + the §0#3 vibrancy reconcile + the §0#10 band coordination + the
  §4 calibration).
- **BG.W-COHERENCE-GATE** — land `hue-at-l.mjs` FIRST, then `spring-table.mjs`, then the
  standalone + census gates (DRY-fixed: generic A1-walk, leaf-imported brace-balanced A2,
  widened A3/A4 + the zero-members + no-strip guards). Wire `gates.mjs` + `package.json` +
  manifest rows. A9 + cluster-re-point in `proof-motion-one-clock`. PROVE born-RED on HEAD (the
  4 defects + every self-test bite) IN THIS CHECKOUT before trust; GREEN on the synthetic
  corrected tree; `proof:gate-manifest-sound` CLEAN-TREE clears after the persist. Coordinate
  the A1 band lower bound with WS3-M1 (§0#10).
- **BG.W-DESIGN-LANGUAGE-UNIFY** — the A5 fill+rim C20 build (item 1, §4), post-paint-confirm.
- **BG.W-ANIMATION-CONGRUENCE** — the clean-break spring/easing folds (§3) + the doc-rot
  reconcile (scheme-spring.css header + CLAUDE.md prose) in lockstep; the `useSpring` base-default
  fold BOOKED with the behavior-change caveat. The 8-leg clock-fence discharge stands (R5:
  coordinate the 3 layer-group legs with WS2 or record a no-op).
- **BG.W-GLASS-PAPER-CONGRUENCE** — unchanged (Regular/Clear tier map, key-light spine).
- **BG.W-PAGE-COMPONENT-AUDIT** — the §2.4 instrument wired end-to-end (item 2/3, §5) with the
  flatten-faithfulness trust gate; the full-matrix paint run is post-integration.

**Sequencing (hard).** Item 2 (persist + the §3 folds + the instrument wiring) + item 1 (the A5
re-paint) run NOW on broken HEAD. WS3-M1 lands its `hue-at-l.mjs` re-point + the cartoon-ink fix
FIRST (so A1 greens its arm; the leaf lands under WS12). The harmonized-whole 480-capture verdict
rides WS1→WS4→WS3/WS8→WS9 landing, THEN the PAGE-COMPONENT-AUDIT paint run.

---

## 8 · ACCEPTANCE / REAL-PAINT-π BAR (pass-3)

1. **`proof:coherence-census` born-RED on 4.2.0** — RED on A1 (`--cartoon-ink max(c,0.11)` via
   intended-chroma-over-ceiling), A2 (`DECK_SPRING`/`Card.vue` via the live-imported table), A3
   (`{8,10,9}` 3-dialect), A4 (`HandMark cubic-bezier`) + every self-test bite firing; GREEN on
   the synthetic corrected tree. A GREEN on HEAD DISQUALIFIES. The leaf-DRY holds (one
   `hue-at-l`, one `spring-table` `extractSpringPairs`; no duplicate parser). `proof:gate-
   manifest-sound` CLEAN-TREE clears after the persist + the `.retired-classes.txt` revert.
2. **`proof:motion-one-clock` A9 born-RED** — the 3 stale allowlist literals + the 6 stale
   `scheme-spring.css` header rows RED on HEAD; GREEN when the allowlist + header are corrected.
3. **The §3 folds land + green their arms by REMOVAL** — A2/A4 GREEN because `DECK_SPRING`/`Card`/
   `HandMark` no longer carry off-table/re-spelled literals (not because they're allowlisted);
   the deck-spring read + the draw-on π unchanged; the `:pressable` card press FEEL π-confirmed.
4. **A5** source arm RED on HEAD (override absent, the register double-blurs); the paint
   prototype confirms forward (fill+rim, ΔL ≈ +0.037/+0.044) + child-glyph UN-tinted +
   standalone byte-untouched, both engines both modes across dark→bright; `proof:nested-
   backdrop-budget` PER-REGISTER depth DROPS; the gate battery GREEN on the real `vite build`.
5. **The §2.4 instrument** captures a NAMED below-the-fold surface on real `:5199` routes both
   engines both modes, scroll-cascade routes SETTLED (full clip chain released, entrances
   snapped, steady-state motion NOT killed), real `pngRegionStats` + a decoded-pixel coherence
   assertion + the flatten-faithfulness trust gate + surface-hash freshness. The full-matrix
   dual-engine both-modes capture (the binding congruence verdict) rides post-integration;
   webkit = acquirability-only.
6. **No regression** — `proof:no-layout-animation`, `proof:glass-cohesion`, `proof:nested-
   backdrop-budget`, `proof:touch-target`, `proof:no-gray`, `proof:phantom-classes`,
   `proof:animation-coherence`, `proof:precept-current` GREEN after every WS12 swap.

---

## 9 · FOLDED DEFERRED + PASS-3 RECONCILES (no silent drop)

- **The vibrancy `filter` FALSIFIED** — fill+rim ONLY; the optional childless-indicator
  `--glass-capsule-vibrancy` is a SEPARATE booked decision. The pass-1 §4 "fill+vibrancy
  sanctioned nesting" note is SUPERSEDED in `WS12-CENSUS.md` (§0#3).
- **A5 scope = `.glass-capsule-track .glass-capsule`** — re-verified the ONLY static double-blur
  (menu-row fill-only, stack-rail box-inviolate); the dock active register fill-only, no edit.
- **A1 is the GENERIC warm-base-scoped over-correction catcher** (§0#4); the docstring reconciled.
- **A2 brace-balanced via the shared `spring-table.mjs` leaf** (§0#5) — ONE extractor, two callers.
- **A3/A4 coverage widened + the zero-members + no-strip-of-JS-strings robustness guards** (§0#7);
  the bounds recorded in `WS12-CENSUS.md` (A2 is `{response,ζ}`-object-only; a positional `new
  SpringProgress(r,ζ)` is a named down-scope; A4's JS-string scan is the census home, not a
  `proof:animation-coherence` widen).
- **A9 deletes the DEAD allowlist entries + reconciles the doc-rot at SOURCE** (§0#6) — the
  scheme-spring.css header + the 4 CLAUDE.md spring literals, in lockstep with the spring fold.
- **The `useSpring` base-default fold BOOKED** (a behavior change, π-confirm; §3 residual).
- **The on-device gamut cast** is the named headless-unreachable device-paint (R2); the
  device-free intended-chroma-over-floor leg is the SOLE binding RED, the painted-clip hue
  ADVISORY.
- **The A1 band ⊥ WS3 dark-arm (B) coordination snag** RESOLVED in `WS12-CENSUS.md` (§0#10).
- **All pass-1/pass-2 §7/§6 folds STAND** (the BF 32-row deferred-census fold-ledger, the
  CLOCK_FENCE_PENDING discharge, the CATEGORY_DEFAULT_BG decision, the ℱ-slot/scroll-hairline
  verify, the full-clip-chain + entrance-only settle + decoded-pixel assertion).

---

## 10 · OPEN RISKS (pass-3)

- **R1 · No evidence surface at HEAD (highest, unchanged).** `git diff master..HEAD -- src/
  demo/` is EMPTY; the binding congruence capture rides WS1–WS11 landing. Pass-3 delivers the
  persisted leaf-DRY gates + the corrected A5 paint + the wired flatten-faithful instrument; the
  whole-system verdict is post-integration. Do NOT self-report congruence on faith.
- **R2 · The on-device gamut question is genuinely OPEN.** CI proxies per-channel-clip
  `oklch(0.18 0.11 56)` to oxblood h29; real Chrome.app/Safari.app MAY chroma-reduce + preserve
  hue ~56°. The device-free intended-chroma-over-floor leg sidesteps it (the binding RED); a
  painted-pixel RED would FALSE-fail, so it is diagnostic/device-tagged ONLY.
- **R3 · A5 is a REFINE, not converged (the cap).** The fill+rim form needs a fresh
  paint-confirm (forward ΔL + child-glyph un-tint + standalone-untouched + dark→bright envelope)
  + a real `vite build` battery BEFORE the C20 build lands. The LEG-2 differential was likely
  measured WITH the 2nd blur present — removing it could collapse the differential; if it reads
  FLAT, A5 re-opens.
- **R4 · Playwright-webkit is a FALSE Safari proxy** (acquirability only). The C19/SVG-lens
  fidelity + on-device gamut need real Safari.app on AS-Tahoe — stated, not hidden.
- **R5 · Clock-fence ↔ WS2 dock-engine collision.** The 3 layer-group legs are WS2's box-morph
  register; discharge under WS2 or record a no-op.
- **R6 · The DRY-coordination race with WS3-M1.** `hue-at-l.mjs` lands FIRST (WS12); WS3-M1
  re-points `proof-no-gray.mjs:195` onto it + lands the cartoon-ink fix; the A1 band lower bound
  is pinned BEFORE the leaf constant freezes (§0#10).
- **R7 · The persist is multi-WS commit-disentangle, not a copy.** The 4 scaffolds live only in
  worktrees (`227-10/11/30/33`, DIVERGED — `227-30` is canonical for the census/leaf, `227-33`
  for the spec.ts; no single worktree has all 4); the four develop-out widenings (generic A1,
  leaf brace-balanced A2, A3/A4 widen, A9) are NEW code. The WS7 (surface-closure) + WS10
  (de-shadcn) artifacts commit under THEIR slices; the `.retired-classes.txt` deletion REVERTS;
  "persisted + proven RED" is FALSE until on-tree AND CLEAN-TREE clears.
- **R8 · The Card-press fold is a JUDGMENT call.** `{0.28,0.78} → springPreset("press")`
  `{0.2,0.8}` changes the press feel; if `BG.W-ANIMATION-CONGRUENCE` rules `{0.28,0.78}` a
  legitimate own-register, the census A2 would false-red — coordinate the disposition explicitly
  (the seed-audit lists it as a WS12 fold, so the default is FOLD with the π-confirm).

---

*Pass-3 synthesis. The census is leaf-COMPOSED (the 344th-gate critique resolved via the shared
`hue-at-l.mjs` + `spring-table.mjs` predicates); the four defects are FOLDED/DELETED clean-break
(no-legacy), the gates the LOCK; the A5 paint is corrected to fill+rim with the per-register
depth + scope-completeness re-verify; the instrument is flatten-faithful before any decoded-pixel
trust; the persist is coherent per-WS slices over a clean tree. The binding congruence verdict
rides WS1–WS11 landing (R1); A5's paint is a genuine REFINE (R3). The honest cap is the spec.*
