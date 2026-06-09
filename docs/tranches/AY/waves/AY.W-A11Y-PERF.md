# AY.W-A11Y-PERF — engage W55 by default · ship the webkit prefix · rAF-coalesce specular · bound nested-backdrop cost · re-derive the translucent-plate contrast oracle

- **Tranche:** AY (glass-ui)
- **State:** NET-NEW (impl) — **NOT yet implemented** (unlike its Batch-1 siblings
  W-GLASS/W-MOTION, which landed source this session). All five defects re-verified
  LIVE at HEAD: the W55 bucket is dormant (no `--glass-backdrop` setter in
  src/demo/slides); `dist/styles/glass.css` ships 1 webkit / 15 backdrop-filter;
  `useSpecularTracking.ts:54` still calls `getBoundingClientRect()` per pointermove
  with no rAF; no `proof:webkit-backdrop`/`proof:nested-backdrop-budget` exists (0
  matches); `proof:dark-semantic-contrast.mjs:242` still computes vs solid `--card`.
- **Repo:** `/Users/mkbabb/Programming/glass-ui`
- **Sequencing:** lands AFTER W-GLASS+W-MOTION (both done) so its `glass.css` O-1/O-2/O-4
  edits rebase onto the post-W-GLASS line numbers (the CORRECTED edit-site table) and
  its `gates.mjs`/`ci.yml` gate-rows fold into ONE re-byte-lock with the sibling gates.
- **Hardening inputs:** `docs/tranches/AY/audit/hardening/H-a11y-perf.md` (H-1…H-6),
  `docs/tranches/AY/audit/hardening/H-glass-cohesion.md` (F1 cross-ref), `docs/tranches/AY/audit/hardening/H-touch-scale.md` (gate-harness precedent)
- **Sibling waves:** W-GLASS (the `--glass-level` flatten + specular opt-in — F1/F3 land THERE; this wave touches the W55 tint axis + the prefix + the JS write seam + the oracle; shares the SAME `glass.css` + `gates.mjs`/`ci.yml` files — disjoint REGIONS, coordinated by sequencing, see the overlap caution under the edit-sites table), W-CARDINAL-INFRA (`proof:live-verified-ledger` — this wave names it as the close-DELTA gate)

---

## Goal criterion

The W55 adaptive-glass legibility floor is LIVE by default — glass-ui's own shipping
surfaces over a light/rich backdrop clear WCAG 4.5:1 with NO per-consumer opt-in;
the `-webkit-backdrop-filter` prefix is GUARANTEED present in the shipped `dist/`
CSS so Safari ≤17 paints the blur (and falls back to an opaque plate when it
cannot) with zero dependence on a consumer autoprefixer; the pointer-anchored
specular write is rAF-coalesced against a cached PRM ref so a 1000 Hz pointer
sweep over a blurred surface costs at most one forced layout per frame; the
maximal-glass nested-`backdrop-filter` stack carries a measured frame-budget
gate; and the dark-destructive contrast oracle models the post-W54 TRANSLUCENT
glass plate instead of the stale solid `--card`.

## Completion criterion

The FIVE hard-gate artefacts below (G1–G5) all produce a green verdict, AND the
wave closes on a captured DELTA via `proof:live-verified-ledger` (W-CARDINAL-INFRA):

1. `tests-visual/adaptive-glass.spec.ts` (extended) — a π `getComputedStyle` WCAG
   recompute over the ACTUAL shipping surface (the default-engaged path, NOT a
   synthetic `--glass-backdrop:light` opt-in) clears 4.5:1 body / 3:1 large.
2. `npm run proof:webkit-backdrop` — asserts every `backdrop-filter:` rule in
   the SHIPPED `dist/styles/glass.css` is immediately preceded by a
   `-webkit-backdrop-filter:` pair, and the `@supports not` opaque fallback no
   longer hostage to the webkit-supported-but-unprefixed Safari-17 trap.
3. `tests-visual/specular-coalesce.spec.ts` — a bounded forced-layout count over
   a synthetic 200-event pointer sweep (≤ 1 `getBoundingClientRect` per animation
   frame; matchMedia minted ONCE for the seam's lifetime, not per event).
4. `npm run proof:nested-backdrop-budget` — a nested-`backdrop-filter`-depth +
   frame-time gate over the glass-Button-in-glass-Card-in-glass-Dialog stack on
   the live demo, with a measured ceiling.
5. `scripts/proof-dark-semantic-contrast.mjs` (re-derived) — the ink/plate
   contrast computed against the WORST-CASE backdrop the translucent glass plate
   admits (the page bleeding through at the rung alpha), not the solid `--card`.

`vue-tsc --noEmit` + `npm run build` green; `proof:glass-cohesion` (the W-GLASS
inventory gate that SUPERSEDED `proof:glass-one-model` — that key is removed) +
`proof:adaptive-glass` (the structure arms) stay green.

---

## The defect (file:line-grounded)

### H-1 — W55 adaptive-glass darken is DORMANT (CHRONIC)

`src/styles/glass.css:371-382` gates the AA-floor tint lift behind
`@container style(--glass-backdrop: light)` (the W55 section header is at
`glass.css:352`; the `@container` block at `:371`; the `contrast-color()` flip the
bucket refines at `:384-419`). [LINE-CORRECTED vs the original authoring's
`333-344`/`314-369` — those shifted when W-GLASS landed its `glass.css` specular +
WHC edits this session; the bucket now lives at `:352-419`, and `:333-344` is now
the floating/overlay RUNGS, not the bucket.] It fires ONLY when an ancestor sets
`--glass-backdrop: light`. Confirmed nobody does:

```
grep -rn glass-backdrop /Users/mkbabb/Programming/slides/src/  → EMPTY
grep -rn glass-backdrop /Users/mkbabb/Programming/glass-ui/demo/ → EMPTY
```

After AX.W54 made glass the MAXIMAL default for every band (`tokens.css` "Glass is
the DEFAULT surface register for EVERY band") and W60 lands rich per-page
backgrounds, glass-over-bright-backdrop is the COMMON case — yet the G2 legibility
floor ("Glass dock over VERY LIGHT materials is unreadable") is opt-in and
un-opted. WCAG 1.4.3 is a per-consumer gamble, not a library guarantee. The fix
exists (`glass.css:352-419`) but is decorative.

### H-2 — glass-ui ships UNPREFIXED `backdrop-filter`; Safari paint is consumer-autoprefixer-hostage (Safari)

The five rungs author the unprefixed form only (`glass.css:289,309,320,336,347` —
the wash/quiet/resting/floating/overlay rung `backdrop-filter:` decls), by
deliberate policy (`glass.css:271-275`). [LINE-CORRECTED vs the original
`251,271,282,298,309`/`233-240`; the rungs shifted when W-GLASS landed the Drawer
re-author + specular scope this session.] Measured on the SHIPPED artefact at HEAD:

```
dist/styles/glass.css: 1 -webkit-backdrop-filter / 15 backdrop-filter   (re-verified this session)
```

(the lone webkit is inside the `@supports not` at `glass.css:1079`). The webkit
form materialises ONLY if the consumer re-runs an autoprefixer over node_modules
CSS with a Safari-bearing target — an UNDECLARED, UNVERIFIED dependency.

The WebKit trap is specific: `@supports not ((backdrop-filter: blur(1px)) or
(-webkit-backdrop-filter: blur(1px)))` (`glass.css:1079`) fires only when the
engine supports NEITHER form. Safari ≤17 SUPPORTS the `-webkit-` form, so (1) the
`@supports` query is TRUE → the opaque fallback does NOT fire; (2) the painted
rule is the UNPREFIXED property → Safari 17 ignores it → no blur; (3) net result
is a TRANSPARENT glass surface with floating text and NO opaque plate — strictly
worse than no-backdrop-filter-at-all. Verified the slides bundle survives ONLY
because Tailwind v4's default browserslist still includes a prefix-needing Safari
(`slides/dist/assets/index-CyPZZFYn.css`: 38 webkit / 77); a consumer declaring
`browserslist: ["last 2 Safari versions"]` (Safari 18+) would correctly DROP the
prefix and break Safari 17 with no fallback. Inconsistency tell:
`Slider.vue:206,295` + `ContinuousRail.vue:89` + `useGlassRenderer.ts` DO
hand-author the prefix — the policy isn't even uniform in source. (Note the
W-GLASS Drawer re-author ALSO hand-authored the pair at `drawer.css:53`, widening
the inconsistency — one more argument for the build-pass single-source O-2a.)

### H-3 — `useSpecularTracking` forces layout + mints a fresh matchMedia per pointermove (PERF)

`src/composables/glass/useSpecularTracking.ts` (65 lines at HEAD), the shared
pointer-anchored write seam (consumed by `Card.vue:134` + `DockIconButton.vue:70`),
on EVERY `pointermove`:

1. `prefersReducedMotion()` (`:35-43`, called at `:51`) →
   `window.matchMedia("(prefers-reduced-motion: reduce)").matches` (`:42`) — mints a
   fresh `MediaQueryList` per event, synchronous, every tick.
2. `target.getBoundingClientRect()` (`:54`, inside `onPointerMove` at `:48`) — forces
   a synchronous layout read per pointer sample, unbatched, uncached.
3. Writes `--mouse-x/--mouse-y` inline (`:58-62`, the `specularStyle` reactive),
   driving the `.glass-material::before` radial-gradient catch-light
   (`glass.css:134-145`) that sits ON a `backdrop-filter` glass surface — each write
   repaints a blurred layer.

NO `requestAnimationFrame` coalescing: a 120–1000 Hz pointer drives 120–1000 forced
layouts + blurred-surface repaints/s, multiplied under W54 maximal-glass. The
docstring (`:25` — "style-only — no reflow, no re-render") claims "no reflow" — the
`getBoundingClientRect()` read at `:54` contradicts it.

### H-4 — Maximal-glass nested-`backdrop-filter` cost is UNGATED (PERF)

AX.W54 made the default `<Button>` variant `glass-wash btn-glass`
(`button/index.ts:34-35`); `.btn-glass` (`glass.css:660`) paints a real 10px
`backdrop-filter: var(--glass-blur-btn)` (`glass.css:661`). [LINE-CORRECTED vs the
original `:623` — the block shifted to `:660-661` after the W-GLASS edits.] The
common composition — default glass Buttons in a `.glass-card` in a glass Dialog over
a glass/aurora page — stacks 3–4 INDEPENDENT `backdrop-filter` layers and NESTS them.
WebKit re-samples the already-blurred buffer at each nested level (non-linear cost),
recomputed every frame of any ancestor animation. There is NO paint-containment on
`.glass-dock` (`dock/shell.css:16`, no `contain`) / `.glass-btn` (`glass.css:540`,
`:660`, no `contain`) — only `.glass-card` carries `contain: layout style` at
`glass.css:523` (was `:485`), and that OMITS `paint`, so the backdrop sample still
escapes the box — and NO `proof:*` frame-budget gate exists (`grep
frame|fps|perf|repaint package.json` → only the unrelated `proof:dock-perfection`;
re-verified at HEAD `proof:webkit-backdrop`/`proof:nested-backdrop-budget` do NOT
exist → 0 matches in package.json).

### H-6 — `proof:dark-semantic-contrast` computes over SOLID `--card`; W54 made the surface TRANSLUCENT (a11y, stale oracle)

`scripts/proof-dark-semantic-contrast.mjs:234-272` (the "Compute + assert the
contrast floors" block; the ink-vs-`--card` `contrastRatio` at `:242-243`; the
floors at `:47-49`, `INK_FLOOR = 4.6`/`PLATE_FLOOR = 5.0`) resolves contrast of the
destructive ink "vs `--card`" (the solid token). After AX.W54 the Alert/Toast
surface is a TRANSLUCENT glass plate (`color-mix(in oklab, var(--glass-bg-*), …)`,
`glass.css:319` for the resting rung; every rung composes this adaptive-tint recipe
per the `glass.css:279` header) that lets the page show through, so the REAL rendered contrast is
LOWER than the oracle asserts. The gate's number is an upper bound, not the truth —
it can PASS (≥4.6 vs opaque `--card`) while the user sees <4.5 (bright page bleeding
through the translucent plate). The oracle was authored (AX.W44) against the pre-W54
opaque-card model and never re-derived.

> The `contrast-color()` flip (`glass.css:384-419`) is recorded SOLID in
> H-a11y-perf (correct + Safari-safe). This wave does NOT churn it; it engages the
> declarative bucket the flip refines (H-1). [LINE-CORRECTED vs `:357-369`.]

---

## The objective (root-not-consumer, gestalt, no-workaround)

Five disjoint root-fixes:

### O-1 — Engage W55 by default (root, not per-consumer opt-in)

The chosen mechanism is **(a) glass-ui's own surfaces carry `--glass-backdrop:
light`** at the canonical light/rich-backdrop site, NOT a heavier default (option
(b) would have to invert the `--glass-backdrop: dark` zero-delta default, breaking
the `tests-visual/adaptive-glass.spec.ts` default-path byte-identity canary
`:332-356` and the `tokens.css:867-868` `--glass-tint-strength: 0%` rest state —
rejected: it churns the whole token ladder's hand-set α and trips the existing
structure gate). Instead the LIBRARY itself opts the overlay-band glass in at its
own root, so the floor is live with zero consumer discipline AND the zero-delta
canary stays green for the dark-substrate case.

Concrete: the overlay band (Dialog / Sheet / Popover / DropdownMenu / HoverCard /
Command / Tooltip / Toast / Select-content) is glass-over-the-page-behind by
construction (a modal floats over whatever the consumer painted — frequently a
light/near-white app surface, the canonical G2 case). The dock shell + the
`.glass-card` register likewise sit over arbitrary page content. The fix sets
`--glass-backdrop: light` as the DEFAULT for these library-owned surfaces, with
`dark` the explicit per-surface override a dark-substrate consumer dials in.

This is NOT the synthetic-fixture opt-in the current spec exercises — it is the
shipped surface carrying the bucket itself, so a π readback over the LIVE demo's
Dialog/dock (no test-injected `--glass-backdrop`) clears AA.

### O-2 — Ship the `-webkit-backdrop-filter` prefix in `dist/` itself + rework the `@supports not` so a webkit-only engine still gets the plate

Two root-fixes:

- **Build-time prefix injection** in `vite.style-assets.ts publishStyleAssets()
  `closeBundle()`` (the hook opens at `:294`; the `cpSync(srcStyles → distStyles)` at
  `:303-305` already lands the raw CSS; the existing `dist/styles/index.css` SFC-fold
  pass at `:328-340` is the precedent walk) — ADD a pass that, for every
  `dist/styles/*.css` file (via `readdirSync(distStyles)`), rewrites each
  `backdrop-filter: <v>;` declaration NOT already preceded by a
  `-webkit-backdrop-filter:`, injecting the prefixed pair. This guarantees the prefix
  reaches `dist/` regardless of the consumer's autoprefixer (the library owns its
  shipped artefact; the policy comment at `glass.css:271-275` is corrected: the
  single-source-of-truth authorship now emits the prefix at BUILD, not delegated to
  the consumer pipeline — the Lightning-CSS dedup concern it cites is moot because
  the source stays unprefixed and the build adds the pair last). The pass runs AFTER
  the cpSync + the SFC-fold so it covers the complete shipped cascade. The `@property
  --tw-*` / utilities / font-inline passes are untouched. [LINE-CORRECTED vs the
  original `:359-377` — the `closeBundle` hook is at `:294`, the file is 380 lines.]
- **Rework the `@supports not` fallback** (`glass.css:1079` — the block was at
  `:1037` pre-W-GLASS) to ALSO catch the Safari-17 trap: split into TWO guards — the
  existing `@supports not ((backdrop-filter…) or (-webkit-backdrop-filter…))` for the
  no-blur-at-all engine, PLUS a `@supports ((-webkit-backdrop-filter: blur(1px))
  and (not (backdrop-filter: blur(1px))))` guard that, for the webkit-only engine,
  confirms the now-shipped prefix DOES paint (the build pass guarantees the prefixed
  rule is present, so the webkit-only engine renders the blur — the trap closes at
  the SOURCE of the prefix, not at the fallback). The fallback exists as the floor
  for the theoretical webkit-only-AND-prefix-stripped case; with O-2's build pass
  that case cannot arise from a glass-ui artefact.

### O-3 — rAF-coalesce the specular write + cache the PRM ref

`useSpecularTracking.ts:35-65` is reworked to the AV.W7 substrate pattern:

- The PRM check becomes a SINGLE cached `matchMedia` listener minted once at
  composable setup (a module-or-instance `MediaQueryList` with a `change` listener
  feeding a cached `boolean` ref), NOT a fresh `matchMedia` per event.
- `onPointerMove` (`:48`) stores the raw `event` and schedules ONE
  `requestAnimationFrame`; the rAF callback does the single `getBoundingClientRect()`
  (`:54`) + writes `--mouse-x/--mouse-y` (`:58-62`) — so a 1000 Hz pointer collapses
  to ≤ 1 layout read + 1 style write per frame. A pending-frame guard coalesces
  bursts. The composable cancels the rAF + removes the matchMedia listener on unmount
  (cleanup discipline; the composable currently returns only
  `{ specularStyle, onPointerMove }` at `:64` — add an unmount hook or expose a
  teardown the host wires).
- The docstring's "no reflow" claim (`:25`) is corrected to "one batched layout read
  per animation frame".
- The AV.W7 `useWebGLCanvas` substrate is the cached-PRM-listener precedent (a single
  `matchMedia` `change` listener feeding a cached ref, gated by `proof:offscreen-pause`)
  — reuse that pattern, do NOT mint a parallel PRM path.

### O-4 — A nested-backdrop frame-budget gate + paint containment

- Land `contain: paint` (or `layout style paint`) on the glass stacking surfaces
  (`.glass-card` `glass.css:485` upgrade from `layout style`; `.glass-dock`
  shell; `.glass-btn` `glass.css:618-624`) so the backdrop sample does not escape
  the box — the standard nested-backdrop-cost mitigation.
- Mint `proof:nested-backdrop-budget` — a π Playwright gate that mounts the
  glass-Button-in-glass-Card-in-glass-Dialog stack on the live demo, measures the
  nested-`backdrop-filter` DEPTH (asserts ≤ a documented ceiling — the stacks do not
  grow unbounded) AND a paint/frame-time readback under a scroll/resize jiggle
  (asserts the median frame stays under a budget). Born-RED if the containment is
  absent or the depth exceeds the ceiling.

### O-5 — Re-derive the dark-contrast oracle for the translucent plate

`scripts/proof-dark-semantic-contrast.mjs` is re-derived: the ink/plate contrast
is computed against the EFFECTIVE backdrop the translucent glass plate admits, not
the solid `--card`. The oracle resolves the rung alpha (`--glass-bg-*` opacity at
`--glass-level: 1`) and composites the WORST-CASE page bleed through it (the dark
page for the dark-mode arm; and — tied to O-1 — the bright-bucket-darkened plate
over a light page for the light arm), then asserts the floor against THAT effective
background. The number becomes the truth, not an upper bound. The §2c lockstep +
sibling-red sweep are preserved.

---

## Edit-sites (exact)

> **ALL LINES RE-VERIFIED vs LIVE HEAD this session.** The original authoring's line
> numbers were stale — `glass.css` shifted ~30-50 lines when W-GLASS landed the Drawer
> re-author + the specular-transition scope + the WHC additions. The table below
> carries the CORRECTED lines; the [was: …] annotation records the original stale ref.

| # | File | Lines (CORRECTED) | Edit |
|---|------|-------|------|
| O-1 | `src/styles/glass.css` | `.glass-floating` `:333`, `.glass-overlay` `:344`, `.glass-card` `:511` [was: 295-312/481-485] | set `--glass-backdrop: light` as the library default on the overlay-band tiers + `.glass-card`; `dark` (the `:root` default at `tokens.css:906`) stays the explicit dark-substrate override |
| O-1 | `src/styles/dock/shell.css` | `.glass-dock` block `:16`; the bg already composes the element-level oklab tint at `:95-100` [was: 97-100] | set `--glass-backdrop: light` on `.glass-dock`; the W55 bucket reach already exists (the `@container style(--glass-backdrop: light)` block is in `dock/morph.css:219,238`) — this just engages it by default |
| O-2a | `vite.style-assets.ts` | `closeBundle` hook `:294`; add the pass after the SFC-fold `:328-340`; walk `dist/styles/*.css` via `readdirSync(distStyles)` [was: 359-377] | add the `-webkit-backdrop-filter` injection pass over the shipped CSS (the build owns the prefix; the source stays unprefixed) |
| O-2a | `src/styles/glass.css` | `:271-275` [was: 233-240] | correct the unprefixed-only policy comment → "build emits the prefixed pair into dist/" |
| O-2b | `src/styles/glass.css` | `:1079` (the `@supports not` block) [was: 1035-1057] | split the `@supports` fallback to close the Safari-17 webkit-only trap |
| O-3 | `src/composables/glass/useSpecularTracking.ts` | `:35-64` (the whole seam; `onPointerMove` `:48`, `getBoundingClientRect` `:54`, write `:58-62`, return `:64`) [was: 35-65] | cached-PRM listener (AV.W7 substrate pattern) + rAF-coalesced single-rect write + unmount cleanup; correct the docstring `:25` |
| O-4 | `src/styles/glass.css` | `.glass-card` `contain:` `:523` [was: 485]; `.glass-btn` `:540`/`:660` [was: 618-624] | `contain` upgrade to include `paint` on `.glass-card` + `.glass-btn` |
| O-4 | `src/styles/dock/shell.css` | `.glass-dock` `:16-100` | add `contain: paint` to the dock shell glass surface |
| O-4 | `tests-visual/nested-backdrop-budget.spec.ts` | NEW | the π depth + frame-time gate |
| O-4 | `package.json` | scripts block (beside `proof:adaptive-glass` `:664`) [was: ~624+] | `"proof:nested-backdrop-budget"` + `"proof:webkit-backdrop"` (verified ABSENT at HEAD: 0 matches) |
| O-2 | `scripts/proof-webkit-backdrop.mjs` | NEW | assert every `backdrop-filter` in `dist/styles/*.css` is webkit-paired (count parity) + the `@supports` trap closed; runs AFTER `npm run build` |
| O-5 | `scripts/proof-dark-semantic-contrast.mjs` | floors `:47-49` (`INK_FLOOR`/`PLATE_FLOOR`); resolve `:210-234`; compute `:234-272` [was: 47-48/210-267] | composite the rung-alpha page-bleed into the effective backdrop before the contrast compute (the `cardRgb`/`pageRgb` → `effectiveBg` blend) |
| O-2/O-4 | `scripts/gates.mjs` | beside `proof:adaptive-glass` `:704` | REGISTER `proof:webkit-backdrop` (tags `local`,`ci`,`release`; needs `build` first) + `proof:nested-backdrop-budget` (tags `local`,`ci`; π/Playwright) as GATES rows so they run in CI |
| O-2/O-4 | `.github/workflows/ci.yml` | GENERATED via `gates:emit-ci` + `proof:gen-ci-fresh` re-byte-lock (NOT hand-edited) | the two new gates appear as CI steps [SHARED generated artefact with W-GLASS/W-MOTION — byte-lock arbitrates; see overlap note below] |
| GATE | `tests-visual/adaptive-glass.spec.ts` | the live-surface arm in the `getComputedStyle` readback `:171-326`; the byte-identity canary `:327-356` STAYS [was: 244-356] | add a LIVE-surface arm: read the demo's actual Dialog/dock (no injected bucket) and assert AA — the default-engaged proof |

> The W-GLASS sibling owns `.glass-drawer`/`.glass-slider`/Notification + the
> specular-`::before` OPT-IN (F1/F3/F4/F5). This wave does NOT touch those files; it
> touches the W55 tint axis (O-1), the build prefix (O-2), the JS write seam (O-3),
> the containment + budget gate (O-4), and the oracle (O-5) — disjoint write scope,
> so the two waves run in parallel.
>
> **OVERLAP CAUTION — `glass.css` + `gates.mjs`/`ci.yml`.** This wave EDITS
> `glass.css` (O-1 the overlay/card rung `--glass-backdrop`, O-2 the policy comment +
> `@supports`, O-4 the `.glass-card`/`.glass-btn` `contain`). W-GLASS ALSO edits
> `glass.css` (the specular `::before` group `:97-99`/`:175-190` + the WHC group). The
> regions are DISJOINT (W-A11Y-PERF: rung-level `--glass-backdrop`/`contain`/the
> `:271-275` policy + `:1079` `@supports`; W-GLASS: the `::before` specular scope + WHC
> selector groups) but the SAME FILE — so these two waves canNOT both edit `glass.css`
> in parallel uncoordinated. As-built W-GLASS has ALREADY landed its `glass.css` edits
> this session; W-A11Y-PERF rebases its O-1/O-2/O-4 onto the post-W-GLASS line numbers
> (the CORRECTED table above). The `gates.mjs`/`ci.yml` writes are the SAME overlap
> class as W-GLASS↔W-MOTION — disjoint append-only GATES rows, the generated `ci.yml`
> byte-locked by `proof:gen-ci-fresh` and regenerated last. W-A11Y-PERF lands AFTER
> W-GLASS+W-MOTION so the manifest carries all the new gate rows on one re-byte-lock.

---

## Hard gate (evidence-backed, artefact per clause)

The wave closes ONLY when ALL of the following produce a green artefact. Named
`proof:live-verified-ledger` is the close-DELTA gate (W-CARDINAL-INFRA) over the
captured π readback PNG.

### G1 — π contrast over the ACTUAL shipping glass-over-bright surface clears 4.5:1 (H-1)

`tests-visual/adaptive-glass.spec.ts` (extended) drives the LIVE demo, reads back
(via `getComputedStyle` + the in-test WCAG recompute) the resolved background +
ink of a REAL library surface that ships the bucket by default — the overlay-band
Dialog and the `.glass-dock` shell — over a synthetic-white plate, WITHOUT
injecting `--glass-backdrop` on a test ancestor. ASSERT: the foreground clears
**4.5:1 (body) / 3:1 (large dock glyph)** AND the surface stays translucent
(resolved bg alpha < 1 — AA cleared by going opaque is a goal-MISS). The existing
synthetic-opt-in arm + the default-path byte-identity canary (`:327-356`) stay
green for the dark-substrate case. Born-RED before O-1 (the live surface carries
no bucket today → fails AA over white). Captured DELTA: the before/after π
screenshot pair (filename `^W-A11Y-PERF-*` per the ledger clause) + the paired
ratio readout.

### G2 — the `-webkit-backdrop-filter` prefix is present in the SHIPPED CSS (H-2) [a real build-DIFF gate]

`npm run proof:webkit-backdrop` (NEW, runs `scripts/proof-webkit-backdrop.mjs`
AFTER `npm run build` — the gate reads the SHIPPED `dist/`, the build-output
artefact, NOT the source). The gate:
1. **Walks every `dist/styles/*.css`** (not just `glass.css` — the Slider/timeline
   SFC CSS folds in too) and tokenizes each rule.
2. **Count-parity ASSERT:** every `backdrop-filter: <v>;` declaration is immediately
   preceded by a `-webkit-backdrop-filter: <v2>;` whose value `<v2>` equals `<v>`
   (the SAME blur radius — a webkit pair that paints a different value is a defect).
   The witness on RED: `dist/styles/glass.css: <N> backdrop-filter / <M> webkit
   (parity broken at line <L>: '<decl>' has no preceding webkit pair)`.
3. **`@supports`-trap ASSERT:** the fallback block (`glass.css:1079` in source →
   the dist copy) carries BOTH guards — the existing no-blur `@supports not (… or
   …)` AND the new webkit-only `@supports ((-webkit-backdrop-filter: blur(1px)) and
   (not (backdrop-filter: blur(1px))))` — so a Safari-≤17 engine that gets the
   shipped prefix paints the blur (the trap closes).
4. **Born-RED at HEAD:** the live measure is `dist/styles/glass.css: 1 webkit / 15
   backdrop-filter` (re-verified this session) → parity broken → exit 1. After O-2a
   the build-pass makes it 16/16 (parity) → exit 0.
5. **Bite-check (the deletion-proof):** remove the build-injection pass → the gate
   reddens (parity breaks back to 1/15). This is a build-DIFF artefact (the shipped
   dist file the consumer actually receives), NOT a source grep — the gate proves the
   RENDERED CSS carries the prefix, which is the load-bearing truth H-2 names.

### G3 — bounded forced-layout count over a synthetic pointer sweep (H-3)

`tests-visual/specular-coalesce.spec.ts` (NEW): mounts a `.glass-material` host
with `useSpecularTracking` wired, instruments `Element.prototype.getBoundingClientRect`
+ `window.matchMedia` (counter wrappers), dispatches a synthetic 200-event
`pointermove` sweep within a small number of animation frames, and ASSERTS
`getBoundingClientRect` call count **≤ frames + 1** (one rect read per rAF, NOT per
event) AND `matchMedia` minted **exactly once** for the seam's lifetime (not 200×).
Born-RED before O-3 (200 events → ~200 rect reads + ~200 matchMedia). Captured
DELTA: the before/after call-count readout.

### G4 — nested-backdrop-depth + frame-budget gate (H-4) [a real measured-π gate]

`npm run proof:nested-backdrop-budget` (NEW; `tests-visual/nested-backdrop-budget.spec.ts`
+ the package.json key): the π gate mounts the glass-Button-in-glass-Card-in-glass-Dialog
stack on the live demo (Chromium, the resident π engine) and produces a MEASURED
artefact (a frame-time series + a DOM-walk depth count), NOT a "looks-right" check:

1. **Nested-depth ASSERT (the structure half).** Walk the mounted stack's computed
   styles; count the maximum chain of ancestor→descendant elements EACH carrying a
   non-`none` `backdrop-filter`. ASSERT depth ≤ a **DOCUMENTED ceiling** (the
   Button-in-Card-in-Dialog stack is depth 3; set the ceiling at the measured live
   depth + 0 headroom and RECORD it in the spec/DELTA so a regression that nests a
   4th blur layer reds). The ceiling is a recorded NUMBER from the live measure, not
   a guessed constant.
2. **Frame-budget ASSERT (the perf half).** Drive a scroll/resize jiggle over the
   stack while sampling `requestAnimationFrame` deltas (or the CDP
   `Performance.metrics` / a `PerformanceObserver` long-task feed); ASSERT the MEDIAN
   frame time stays under a **measured budget** recorded from the post-containment
   baseline (e.g. ≤ the p50 of the contained stack + a tolerance band — the number is
   captured on the green run and pinned, so a future regression that drops `contain:
   paint` reds against the recorded baseline). RECORD the measured p50/p95 in the
   DELTA.
3. **Containment ASSERT (the source half).** `getComputedStyle` confirms `contain`
   includes `paint` on `.glass-card` / `.glass-btn` / `.glass-dock` (the sample does
   not escape the box — the standard nested-backdrop mitigation).
4. **Born-RED before O-4:** no `paint` containment → the depth/frame-budget readout
   exceeds the baseline AND the containment ASSERT fails → exit 1. After O-4 →
   GREEN. **Bite-check:** revert one `contain: paint` → the containment ASSERT reds.
   Captured DELTA: the frame-time p50/p95 + the depth count + the containment readout
   (a measured number per clause, the artefact the gate exists to produce).

### G5 — the dark-contrast oracle models the translucent plate (H-6)

`npm run proof:dark-semantic-contrast` (re-derived): the ink/plate contrast is
computed against the EFFECTIVE backdrop (the rung-alpha page-bleed composited
through the translucent plate), not the solid `--card`. ASSERT the ink clears the
floor against THAT effective background. Born-RED if the destructive ink that
passes over solid `--card` fails over the translucent plate (the false-assurance
case the gate exists to catch). bite-check: revert the compositing step → the gate
reverts to the stale upper-bound number. The `tests-visual/dark-semantic-contrast.spec.ts`
π arm (already present) is the runtime cross-check.

### G-CLOSE — captured DELTA (the cardinal lesson)

`proof:live-verified-ledger` (W-CARDINAL-INFRA) is GREEN over this wave's row: the
AY ledger row for W-A11Y-PERF carries an own-surface DELTA artefact (the G1
before/after π PNG pair, filename matched to `^W` per the gate's filename clause),
NOT a prose "capture" claim. No row marks the W55 floor live without the PNG.

`vue-tsc --noEmit` + `npm run build` green; `proof:glass-cohesion` (the W-GLASS
inventory gate — SUPERSEDED `proof:glass-one-model`) + `proof:adaptive-glass` (the
structure arms) stay green (O-1 lifts the tint on the library surfaces but the
`--glass-tint-strength: 0%` rest token + the dark-bucket byte-identity are
preserved for the dark-substrate path).

---

## Non-goals / boundaries

- `.glass-drawer` / `.glass-slider` / Notification re-author + the specular-`::before`
  OPT-IN (F1/F3/F4/F5) → **W-GLASS** (disjoint files).
- The touch-target / type-scale system → **W-SCALE1/W-SCALE2** (disjoint).
- The `contrast-color()` flip is recorded SOLID — NOT churned here.
- Option (b) "heavier W55 default" (invert `--glass-backdrop: dark`) is REJECTED
  (breaks the zero-delta token ladder + the byte-identity canary); the library-owns-
  its-own-opt-in path (O-1a) is the chosen gestalt.

## Named successor (if a gate misses at CI-low)

- G1 miss → W-GLASS (the cohesion wave already touches the glass surfaces) carries
  the residual surface; record the exact surface + measured ratio.
- G2 miss → the build-pass is the root; a miss is a build bug, fixed in-wave (no
  successor — the artefact is deterministic).
- G3/G4 miss → a successor `AY.W-PERF2` named with the exact unbounded site.
- G5 miss → the destructive token lift lands in the same oracle wave; name the
  measured deficit.
