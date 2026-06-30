# PASS 1 — Consumer-constellation coherence (broad sweep, baseline — re-verified)

**Lens:** CONSUMER-CONSTELLATION COHERENCE · **Pass:** 1 (baseline) · **Date:** 2026-06-30
**Branch:** `tranche/BG` · **HEAD/plan-anchor:** `4c761b64` (re-spec FOLD; UN-BUILT — zero new src/demo since the fold) · **pkg:** 4.2.0 → cut 5.0.0
**Siblings-intact tripwire:** `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (run at start). FENCE honored: zero writes/moves outside glass-ui; all sibling access read-only grep.
**This pass:** independently RE-VERIFIED the prior baseline's findings on disk (F1/F2 confirmed in live source; the asymmetry confirmed; `--input`, `/api`, atlas-`--ring` re-counted). All prior findings HOLD.

## Verdict

**The recorded consumer asks are exact, BUT the 7 gap-waves introduce ONE genuine NEW unrecorded break (MEDIUM) + the roster has ONE completeness miss (LOW-MED) + ONE doc-staleness count-drift (LOW).**

Answering the focus question directly:
- **`BG.W-GLASS-REFRACT-WEBGL` (G1) changes NO token a consumer reads directly.** Its fence operator `uChromatic` and the `--glass-edge-dispersion`→`uChromatic` map are INTERNAL shader uniforms — **0 source reads** across all 6 consumers (re-grepped). The whole WS8 refraction stack (`glass-refract.glsl.ts`, `createBackdropSource.ts`, `useGlassRefraction.ts`) is internal. ✓ No consumer-facing token change.
- **BUT a SIBLING gap-wave — G4 `BG.W-CLOSEFIX-9SITE` — DOES introduce a new break.** It FULLY RETIRES the `--glass-blur-dock` chain, which **bbnf-buddy reads as a deliberate live override** (`src/styles/preset.css:230`). This is a NEW unrecorded break — the exact inv-11 / [[feedback_glass_ui_binding_verification]] "0-internal-readers ⇒ safe to retire" blind spot the project supposedly internalized for `--ring`, run again on a DIFFERENT token-retiring gap-wave without the constellation-grep that caught `--ring`.
- **The roster also misses speedtest's `.glass-refract` class binding** (a 4.1.0-origin stale-no-op that G1 `W-GLASS-SOTA-LADDER` then finalizes by deleting `glass-refract.css`).

The `/api` (muster + speedtest) and `--ring` (atlas 12 bare) asks are **verified exact on disk this pass**. The viz-subpath demigrate (G7) is **key-preserving as recorded** (WS5's `W5-viz-subpath-disposition` clause asserts it). No `/api`-fold, no `--input`/`--accent-ai`/`detectTier` delete reaches any consumer.

## Method note (load-bearing — the false-clean traps the grep MUST avoid)

1. **zsh scalar non-splitting** — `for d in $CONS` with a space-string scalar runs ONCE against a concatenated non-path → false empty. Use a zsh ARRAY (`CONS=(…)`).
2. **bundled-dist false positives** — raw `grep -r` matches glass-ui's own minified CSS shipped into consumer `node_modules/@mkbabb/glass-ui/dist/`, `test-results/`, `.playwright-artifacts/`. Exclude all build/trace dirs AND `node_modules` AND `docs/` (the speedtest AL-design-amend audit docs alone produced 160KB of `--glass-blur-dock` doc-noise that is NOT a live read).
3. **Live-source only** — scope to `$d/src` (+ `frontend/src`, `vite.config.mjs`) and source extensions. **Every count below is source-only, properly iterated.**

---

## The re-verified consumer-impact table (the deliverable)

Pins (installed): muster `^3.1.0`→3.1.0 · speedtest `^4.0.1` · atlas `4.1.0` exact · slides `3.13.0` exact · slides-K `^3.2.0`→3.2.0 · bbnf-buddy `^3.9.0`→3.9.0.

| Consumer | `/api` (drop) | `--ring`→`--focus-ring-color` | viz-demigrate | **G4 `--glass-blur-dock` retire (NEW)** | **G1 `.glass-refract` delete** | Other 5.0.0 surface | Roster accurate? |
|---|---|---|---|---|---|---|---|
| **muster** | **BREAK** ×1 (`useAuroraConfig.ts:47` → `/aurora`) — recorded `migrate-api-to-aurora` | degrade-safe ×5 (`var(--ring, currentColor\|primary)`) | n/a | clean (0 reads) | clean (0) | + 4.0.0 BA reshape (2-major) | ✓ exact |
| **speedtest** | **BREAK** ×1 (`PhaseTimeline.vue:52` → `/timeline`) + dead `vite.config.mjs:1033` — recorded `migrate-api-to-timeline` | self-immune (own `--focus-ring-color` ×7; the 2 live `--ring` sites are inner fallbacks) | n/a | clean (0 reads) | **⚠ MISS — `.glass-refract` class ×1 (`CompleteBadge.vue:16`) silently no-ops** | + dock tokens survive | **⚠ misses `.glass-refract`** |
| **atlas** | clean (0 `/api`) | **BREAK** ×12 bare / 11 files + 9 fallback-degrade + vft self-immune — recorded `migrate-ring-to-focus-ring-color` | re-baseline `/constellation`+`/dot-flow-field` (keys preserved) | clean (0 source reads; dock-blur consume is via `--dock-surface-blur` peer) | clean (only a comment) | + WS2 dock-decompose Q3/Q4 invariants; GU-1/GU-3 | ✓ exact (12 bare confirmed) |
| **slides** | clean (0) | clean (0) | re-baseline `/fourier-field`+`/constellation` (keys preserved) | clean (0) | clean (0) | + 4.0.0 BA reshape (2-major) | ✓ exact |
| **slides-K** | clean (0) | clean (0) | n/a | clean (0) | clean (0) | + 4.0.0 Dialog `variant`→`surface` (`DeckGate.vue:41`) — recorded | ✓ exact |
| **bbnf-buddy** | clean (0) | self-immune (12 bare, own `--ring`) | n/a | **⚠ NEW BREAK — `--glass-blur-dock` ×1 (`preset.css:230`) silent partial no-op** | clean (0) | + 4.0.0 BA reshape (2-major, dock-band) | **⚠ misses `--glass-blur-dock`** |

**Net:** 2 `/api` re-points (muster, speedtest) + atlas 12 `--ring` + key-preserving viz re-baselines (slides, atlas) = **recorded asks UNCHANGED and exact**. **+2 unrecorded items** the gap-waves/SOTA-ladder introduce (bbnf `--glass-blur-dock`, speedtest `.glass-refract`) + **1 doc count-drift** (SiriIsland vs B7 frozen 203/96).

---

## Findings

### F1 — NEW unrecorded break: bbnf-buddy's `--glass-blur-dock` dock-theme override silently no-ops (gap-wave G4) · MEDIUM · CONFIRMED on disk

`bbnf-buddy/src/styles/preset.css:222-233` deliberately routes the GlassDock to its cartoon theme (verbatim, re-read this pass):
```css
--glass-bg-cartoon:   color-mix(in srgb, var(--card) 52%, transparent);
--glass-blur-cartoon: blur(22px) saturate(1.6);
--glass-border-cartoon: color-mix(in srgb, var(--border) 55%, transparent);
/* Route the GlassDock variables to the cartoon theme — both the
   horizontal BottomDock and the vertical LeftToolsDock pick this up
   automatically via GlassDock.vue's var() lookups. */
--glass-bg-dock:     var(--glass-bg-cartoon);
--glass-blur-dock:   var(--glass-blur-cartoon);   /* ← line 230 */
--glass-border-dock: var(--glass-border-cartoon);
--shadow-dock-override: var(--shadow-cartoon);
```

`BG.W-CLOSEFIX-9SITE` (G4 — one of the 7 gap-waves, **LANDS FIRST**) **fully retires the `--glass-blur-dock` chain** (`bg-build-map.md:448-450`: "R2 FULL RETIREMENT of the `--glass-blur-dock` chain … the dock still paints blur via `--dock-surface-blur: var(--glass-blur-resting)` (8px peer, **verified 0 orphan readers**)"). The "0 orphan readers" check was **glass-ui-INTERNAL only** — bbnf is an EXTERNAL re-declarer invisible to the internal census (consumer-truth #2 / inv-11 registry-consumer-probe blind spot).

**The failure is asymmetric/insidious — re-verified exactly this pass:** of bbnf's 4 cartoon-dock overrides, glass-ui HEAD keeps THREE live (so they survive G4) and retires ONLY the blur:
- `--glass-bg-dock` → **SURVIVES** (`glass.css:283`, the dock reads it)
- `--glass-border-dock` → **SURVIVES** (`glass.css:351`)
- `--shadow-dock-override` → **SURVIVES** (consumed at `dock/overflow.css:140`, documented `shadow.css:44,69`)
- `--glass-blur-dock` → **RETIRED** (HEAD: `glass.css:166-167`, `dark-arm.css:286`, `bridges.css:334`; post-G4 the dock reads `--dock-surface-blur: var(--glass-blur-resting)` at `dock/shell.css:29,159`, which bbnf does NOT override)

So bbnf's cartoon dock keeps its bg + border + shadow but **silently loses its blur** (`blur(22px) saturate(1.6)` → glass-ui default 8px, no saturate). A single dead-token declaration buried in a 4-token block — the dock "looks mostly right," exactly the regression a human re-baseline misses and every device-free gate passes.

**Why it matters now:** this is the SAME class as the `--ring` break the GU-3 triage caught and recorded as a B7 migration row. The roster records bbnf's break-surface as ONLY "`--ring` self-immune + the 4.0.0 BA reshape" — it does NOT flag `--glass-blur-dock`. bbnf is `^3.9.0` (stays in 3.x; the override works TODAY and breaks at the manual 5.0.0 jump). It would PLAUSIBLY be swept up in bbnf's owed "4.0.0+5.0.0 dock-band re-baseline" (12 `/dock` imports), but it is not RECORDED, so nothing GUARANTEES the catch.

**Recommended disposition (PASS-2/develop):** add a B7-style row — `bbnf-glass-blur-dock-retune-no-op` — to the consumer constellation + `asks-and-consumes.md`, recording that the cartoon-blur override silently reverts and bbnf must re-route onto the surviving dock-blur surface (override `--dock-surface-blur` or `--glass-blur-resting`, or accept the default) at its 5.0.0 bump. The inv-11 "named fold/migration line, never a silent prune" discipline already run for `--ring`.

### F2 — Roster completeness miss: speedtest's `.glass-refract` class binding (G1 SOTA-LADDER finalizes a 4.1.0 stale) · LOW-MEDIUM · CONFIRMED on disk

`speedtest/src/features/speedtest/ui/CompleteBadge.vue:16` paints `class="complete-badge glass-material glass-refract"`, with comments (97-101) explicitly relying on `glass-refract.css` / `@supports (backdrop-filter: url(#glass-refract))` from the publisher.

Two layers:
1. **The class was already renamed `.glass-refract`→`.glass-lens` at BB.W-LENSING (4.1.0, clean break, MIGRATION row).** glass-ui HEAD: `glass-refract.css` paints `.glass-lens`/`.glass-material.glass-lens` — `.glass-refract` matches NO rule. speedtest pins `^4.0.1` (caret → next install resolves 4.1.0+), so the `.glass-refract` garnish **already silently no-ops** (or will on the next install) — a [[feedback_glass_ui_binding_verification]] stale binding, pre-existing, 4.1.0-origin.
2. **G1 `BG.W-GLASS-SOTA-LADDER` then DELETES `glass-refract.css` outright** (`bg-build-map.md:678-681` — incl. the `.glass-lens` rule + the `#glass-refract` SVG filter). For speedtest this is downstream-irrelevant (its `.glass-refract` element already gets no rule), so it is **NOT a NEW BG break** — but it is the moment the underlying asset disappears.

**Why flag it:** the roster's speedtest "5.0.0 break impact" lists only `/api` + `--ring`. It does NOT mention `.glass-refract`. Since speedtest IS a roster consumer and the user explicitly flagged silent-no-op bindings as recurring, the roster should record that `CompleteBadge.vue`'s refract garnish no-ops on the 4.1.0 crossing — the same way slides-K's `DialogContent variant="opaque"` 4.0.0-no-op WAS recorded. Low severity (cosmetic completion garnish), but a roster-completeness gap.

### F3 — Coherence note (doc-staleness, NOT a consumer break): SiriIsland `/api` + new `/siri-island` key drift vs BH B7's frozen counts · LOW

`BG.W-SIRI-ISLAND` (WS6, `bg-build-map.md:309`) lists `api/index.ts` + `src/subpaths/siri-island.ts` among its touched files — it ADDS SiriIsland symbols to `/api` (pre-fold) AND mints a new `/siri-island` published subpath key. BH B7's `asks-and-consumes.md` hard-codes the export-break math: **"203 symbols … regen reproduces 96/96 keys."** That snapshot predates WS6. After WS6 lands it is 203+N symbols / **97 keys**.

This is the friction-class "hand-authored count that drifts" in MILD form — SELF-CORRECTING and consumer-harmless:
- The B2.2 `/api`-fold regen is derive-from-source (runs at BH after all WS land), so SiriIsland's symbols re-home to `/siri-island` automatically; D-G7's post-WS12 `subpath-enumeration` re-pin catches the new key count.
- No consumer imports SiriIsland (brand-new component) → zero consumer break.
- G7 Lock-2 (`proof:subpath-classify`) already pre-derived `siri-island = PUBLISH` (lists the subpath file), consistent with the build map.

**Recommended:** at develop, soften B7's "203 symbols / 96/96 keys" to "203+ symbols (WS6 adds the SiriIsland set) / 96→97 keys (the new `/siri-island`), regen reproduces all PRESERVED keys" — so the frozen number does not read as a drifted hand-count at the cut.

---

## Verified-accurate (no action — the recorded asks hold exactly; re-grepped this pass)

| Claim (roster) | On-disk verification (this pass) | Status |
|---|---|---|
| `/api` consumers = EXACTLY muster + speedtest | 3 SOURCE sites: `muster/frontend/src/composables/useAuroraConfig.ts:47`, `speedtest/src/features/speedtest/ui/PhaseTimeline.vue:52`, `speedtest/vite.config.mjs:1033`. Zero source in atlas/slides/slides-K/bbnf (the muster `node_modules/.../README.md` + `.vite/deps` hits are installed dist, excluded) | ✓ exact |
| atlas `--ring` = 12 bare across 11 files | `grep -E "var\(--ring\)"` → **12 hits / 11 files** (exact) | ✓ exact |
| atlas `--ring` fallback-degrade sites | `var(--ring,…)` → **9** (roster says "8 fallback"; trivial **+1 delta**, degrade-safe regardless of exact count) | ✓ headline OK, minor count note |
| muster `--ring` degrade-safe ×5 | all 5 are `var(--ring, currentColor)`/`var(--ring, var(--primary))` | ✓ exact |
| speedtest `--ring` inner-fallback only + self-immune | the 2 live sites are inner fallbacks of `var(--phase-color, var(--ring))`; speedtest defines own `--focus-ring-color` ×7 | ✓ exact + self-immune |
| bbnf `--ring` self-immune | 12 bare, but bbnf defines its own `--ring` (`preset.css`) | ✓ exact |
| slides / slides-K `--ring` source reads = 0 | 0 | ✓ |
| viz keys (`/fourier-field`,`/constellation`,`/dot-flow-field`) PRESERVED | demigrate is internal substrate (WS5 `bg-build-map.md:275`); no key drop; `W5-viz-subpath-disposition` clause asserts it | ✓ |
| **G1 `BG.W-GLASS-REFRACT-WEBGL` token surface** | `--glass-edge-dispersion`/`uChromatic` = **0 consumer source reads** — internal shader uniform | ✓ NO consumer-token change |
| WS10 `--input` delete | **0 consumer source reads** (`var(--input)`/`border-input`/`bg-input` all 0 across 6 consumers) | ✓ safe |
| WS10 `--accent-ai` mint / `--focus-ring-color` fix | 0 consumer reads of the new internal tokens | ✓ safe |
| G1 `detectTier`/`useSpecularPointer`/`useGlassRenderer` retire | 0 consumer source reads | ✓ safe |
| WS10 `--ring`→`--focus-ring-color` | atlas the sole REAL break (12 bare, recorded); speedtest self-defines, bbnf self-immune, muster degrades | ✓ |

---

## Friction-history linkage

- **inv-11 registry-consumer-probe / "named fold, never a silent prune" → REPEATING (F1).** The G4 `--glass-blur-dock` retirement ran the EXACT "0 internal readers ⇒ safe to retire" reasoning that WS10's `--ring` "one consumer" premise ran. GU-3 caught `--ring` ONLY because the atlas scout was run; no equivalent constellation-grep gated the `--glass-blur-dock` retirement, so bbnf's external override slipped through. The discipline was applied to `--ring` (the recorded gap-wave) but NOT to G4 (the OTHER token-retiring gap-wave). **The gap-wave set is exactly where the discipline lapsed.**
- **[[feedback_glass_ui_binding_verification]] silent-no-op → REPEATING (F1 + F2).** Both findings are stale/orphaned consumer bindings (`--glass-blur-dock` override, `.glass-refract` class) that pass every device-free gate and surface only in a real e2e render — bbnf's dock blur and speedtest's badge garnish both silently degrade.
- **"hand-authored count drifts" → MILD (F3).** B7's frozen "203 / 96/96" predates the WS6 SiriIsland additions; self-correcting via regen but reads stale at the cut.

## PASS-2 hand-off (the items to challenge/confirm)

1. **Confirm F1 is in-scope for a B7 migration row** — is bbnf's `--glass-blur-dock` override a "named fold owed" (inv-11), or accept-residual under bbnf's owed dock-band re-baseline? (My read: owed a row — it is the `--ring` twin, MEDIUM, and the friction-history's whole point is that silent token no-ops survive every gate.)
2. **Confirm F2** — should the roster record speedtest's `.glass-refract` 4.1.0-no-op alongside slides-K's recorded Dialog-variant 4.0.0-no-op? (Low severity, but a roster-completeness gap on a flagged recurring class.)
3. **Deep-grep the OTHER G4-retired sub-tokens beyond the headline `--glass-blur-dock`** — the G4 spec also retires "composite + saturate + radius + the `--blur-dock` bridge." I confirmed the headline `--glass-blur-dock` (bbnf only). PASS-2 owes an exact-name sweep of each retired sub-token (`--glass-blur-dock-radius`, `--blur-dock`, `--glass-saturate-dock`) for any independent external read — note speedtest's AL-design audit DOCS reference `--glass-blur-dock-radius` (doc-only, not a live `src/` read), so the live-source sweep is the binding one.
4. **Reconcile the atlas fallback count** — roster says "8 fallback `--ring` sites," I count 9 `var(--ring,…)`. Trivial (all degrade-safe), but the roster's `Dock.vue:889/957/1017`+5 enumeration should be re-counted at develop so the migration row's site-list is complete.
5. **Verify F3 wording** lands in develop's B7 reconciliation (203→203+, 96→97).
