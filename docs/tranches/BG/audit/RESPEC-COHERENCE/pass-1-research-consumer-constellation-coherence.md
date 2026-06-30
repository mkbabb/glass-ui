# PASS 1 — Consumer-constellation coherence (broad sweep, baseline)

**Lens:** CONSUMER-CONSTELLATION COHERENCE · **Pass:** 1 (baseline) · **Date:** 2026-06-30
**Branch:** `tranche/BG` · **HEAD:** `4c761b64` (re-spec FOLD; UN-BUILT) · **pkg:** 4.2.0 → cut 5.0.0
**Siblings-intact tripwire:** `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (run at start). FENCE honored: zero writes/moves outside glass-ui; all sibling access read-only grep.

## Verdict

**The recorded consumer asks are ~95% accurate, but the 7 gap-waves introduce ONE genuine NEW unrecorded break and the roster has ONE completeness miss + ONE doc-staleness drift.**

Answering the focus question directly:
- **`BG.W-GLASS-REFRACT-WEBGL` changes NO token a consumer reads directly.** `--glass-edge-dispersion`/`uChromatic` are internal shader uniforms — **0 source reads** across all 6 consumers. ✓
- **BUT the sibling gap-wave G4 (`BG.W-CLOSEFIX-9SITE`) DOES** — it fully retires `--glass-blur-dock`, which **bbnf-buddy reads as a deliberate live override** (`preset.css:230`). This is a NEW unrecorded break, the exact inv-11 / [[feedback_glass_ui_binding_verification]] pattern the project supposedly internalized (the `--ring` twin).
- **The roster also misses speedtest's `.glass-refract` class binding** (a 4.1.0-origin stale-no-op that G1 `W-GLASS-SOTA-LADDER` finalizes by deleting `glass-refract.css`).

The `/api` (muster + speedtest) and `--ring` (atlas 12 bare) asks are **verified exact**. The viz-subpath demigrate is **key-preserving as recorded**. No `/api`-fold or `--input`/`--accent-ai`/`detectTier` delete reaches any consumer.

## Method note (load-bearing — a near-miss false-clean)

The first grep sweep used `for d in $CONS` with `CONS="…space-list…"`. **zsh does NOT word-split unquoted scalars** (unlike bash), so the loop ran ONCE against a single non-existent concatenated path → every grep returned empty → a false "no consumers read anything" clean. Corrected to a zsh array `CONS=(…)`. Then a SECOND false-positive trap: raw `grep -r` matched glass-ui's own minified CSS bundled into consumer `dist/`, `test-results/`, and `.playwright-artifacts/` (2.7MB hits). Corrected with `--exclude-dir` for all build/trace output. **Every count below is source-only, properly iterated.** Future passes: use arrays + artifact excludes from the start.

---

## The re-verified consumer-impact table (the deliverable)

Pins: muster `^3.1.0`→3.1.0 · speedtest `^4.0.1` · atlas `4.1.0` exact · slides `3.13.0` exact · slides-K `^3.2.0`→3.2.0 · bbnf-buddy `^3.9.0`→3.9.0.

| Consumer | `/api` (drop) | `--ring`→`--focus-ring-color` | viz-demigrate | **G4 `--glass-blur-dock` retire (NEW)** | **G1 `.glass-refract` delete** | Other 5.0.0 surface | Roster accurate? |
|---|---|---|---|---|---|---|---|
| **muster** | **BREAK** ×1 (`useAuroraConfig.ts:47` → `/aurora`) — recorded `migrate-api-to-aurora` | degrade-safe ×5 (all `var(--ring, currentColor\|primary)`) | n/a | clean (0 reads) | clean (0) | + 4.0.0 BA reshape (2-major) | ✓ exact |
| **speedtest** | **BREAK** ×1 (`PhaseTimeline.vue:52` → `/timeline`) + dead `vite.config.mjs:1033` — recorded `migrate-api-to-timeline` | self-immune (defines own `--focus-ring-color` ×7; the 2 live sites are inner fallbacks) | n/a | clean (0 reads) | **⚠ MISS — `.glass-refract` class ×1 (`CompleteBadge.vue:16`) silently no-ops** | + dock tokens survive | **⚠ misses `.glass-refract`** |
| **atlas** (sci-report/atlas) | clean (0 `/api`) | **BREAK** ×12 bare + 9 fallback-degrade + vft self-immune — recorded `migrate-ring-to-focus-ring-color` | re-baseline `/constellation`+`/dot-flow-field` (keys preserved) | clean (0 source reads; the dock-blur consume is via `--dock-surface-blur` peer) | clean (only a comment `AuroraVeilStage.vue:26`) | + WS2 dock-decompose Q3/Q4 invariants; GU-1/GU-3 | ✓ exact (12 bare confirmed) |
| **slides** | clean (0) | clean (0) | re-baseline `/fourier-field`+`/constellation` (keys preserved) | clean (0) | clean (0) | + 4.0.0 BA reshape (2-major) | ✓ exact |
| **slides-K** | clean (0) | clean (0) | n/a | clean (0) | clean (0) | + 4.0.0 Dialog `variant`→`surface` (`DeckGate.vue:41`) — recorded | ✓ exact |
| **bbnf-buddy** | clean (0) | self-immune (12 bare, own `--ring`) | n/a | **⚠ NEW BREAK — `--glass-blur-dock` ×1 (`preset.css:230`) silent partial no-op** | clean (0) | + 4.0.0 BA reshape (2-major, dock-band) | **⚠ misses `--glass-blur-dock`** |

**Net:** 2 `/api` re-points (muster, speedtest) + atlas 12 `--ring` + key-preserving viz re-baselines = **recorded asks UNCHANGED and exact**. **+2 unrecorded items** the gap-waves/SOTA-ladder introduce (bbnf `--glass-blur-dock`, speedtest `.glass-refract`).

---

## Findings

### F1 — NEW unrecorded break: bbnf-buddy's `--glass-blur-dock` dock-theme override silently no-ops (gap-wave G4) · MEDIUM

`bbnf-buddy/src/styles/preset.css:222-233` deliberately routes the GlassDock to its cartoon theme:
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

`BG.W-CLOSEFIX-9SITE` (G4, one of the 7 gap-waves, LANDS FIRST) **fully retires the `--glass-blur-dock` chain** ("R2 FULL RETIREMENT … the dock still paints blur via `--dock-surface-blur: var(--glass-blur-resting)` … **verified 0 orphan readers**"). The "0 orphan readers" verification was **glass-ui-internal only**. bbnf is an EXTERNAL re-declarer invisible to the internal census — the precise consumer-truth-#2 / inv-11 registry-consumer-probe blind spot.

**Failure mode (asymmetric/insidious):** I confirmed on disk that the OTHER three bbnf dock overrides SURVIVE G4 — `--glass-bg-dock` (`glass.css:283`), `--glass-border-dock` (`glass.css:351`), `--shadow-dock-override` (`shadow.css`) are all still live tokens the dock reads. Only `--glass-blur-dock` retires. So bbnf's cartoon dock keeps its bg + border + shadow but **silently loses its blur** (`blur(22px) saturate(1.6)` → glass-ui default `--glass-blur-resting` 8px, no saturate). A single-token no-op buried in a 4-token block — the dock "looks mostly right," which is exactly the kind of regression a human re-baseline can miss.

**Why it matters now:** this is the SAME class as the `--ring` break the GU-3 triage caught and recorded as a B7 migration row. The roster recorded bbnf's break-surface as ONLY "`--ring` self-immune + the 4.0.0 BA reshape." It does NOT flag `--glass-blur-dock`. bbnf is `^3.9.0` (stays in 3.x — the override works TODAY and breaks at the manual 5.0.0 jump). It would PLAUSIBLY be swept up in bbnf's owed "4.0.0+5.0.0 dock-band re-baseline" (12 `/dock` imports), but it is not RECORDED, so nothing guarantees the catch — the friction-history's whole point is that silent token no-ops survive every device-free gate.

**Recommended disposition (PASS-2/develop):** add a B7-style row — `bbnf-glass-blur-dock-retune-no-op` — to the consumer constellation + `asks-and-consumes.md`, recording that the cartoon-blur override silently reverts and bbnf must re-route onto the surviving dock-blur surface (or accept the default) at its 5.0.0 bump. This is the inv-11 "named fold/migration line, never a silent prune" discipline the project already runs for `--ring`.

### F2 — Roster completeness miss: speedtest's `.glass-refract` class binding (G1 SOTA-LADDER finalizes a 4.1.0 stale) · LOW-MEDIUM

`speedtest/src/features/speedtest/ui/CompleteBadge.vue:16` paints `class="complete-badge glass-material glass-refract"`, with comments (97-101) explicitly relying on `glass-refract.css` / `@supports (backdrop-filter: url(#glass-refract))`.

Two layers:
1. **The class was already renamed `.glass-refract`→`.glass-lens` at BB.W-LENSING (4.1.0, clean break, MIGRATION row).** glass-ui HEAD confirms: `glass-refract.css:82,107-108` paint `.glass-lens`/`.glass-material.glass-lens` — `.glass-refract` matches no rule. speedtest pins `^4.0.1` (caret → next install resolves 4.1.0+), so the `.glass-refract` garnish **already silently no-ops** (or will on the next install) — a [[feedback_glass_ui_binding_verification]] stale binding, pre-existing, 4.1.0-origin.
2. **G1 `BG.W-GLASS-SOTA-LADDER` then DELETES `glass-refract.css` outright** (incl. the `.glass-lens` rule + the `#glass-refract` SVG filter). For speedtest this is downstream-irrelevant (its `.glass-refract` element already gets no rule), so it is **not a NEW BG break** — but it is the moment the underlying asset disappears.

**Why flag it:** the roster's speedtest "5.0.0 break impact" lists only `/api` + `--ring`. It does not mention `.glass-refract`. Since speedtest IS a roster consumer and the user explicitly flagged the silent-no-op binding class as recurring, the roster should record that `CompleteBadge.vue`'s refract garnish no-ops on the 4.1.0 crossing (the same way slides-K's `DialogContent variant="opaque"` 4.0.0-no-op WAS recorded). Low severity (cosmetic completion garnish), but a roster-completeness gap.

### F3 — Coherence note (doc-staleness, NOT a consumer break): SiriIsland `/api` + new `/siri-island` key drift vs BH B7's frozen counts · LOW

`BG.W-SIRI-ISLAND` (WS6) lists `api/index.ts` + `src/subpaths/siri-island.ts` as touched files — it ADDS SiriIsland symbols to `/api` AND mints a new `/siri-island` published subpath key. BH B7's `asks-and-consumes.md` hard-codes the export-break math: **"203 symbols … regen reproduces 96/96 keys."** That snapshot predates WS6. After WS6 lands it is 203+N symbols / **97 keys**.

This is the friction-class "hand-authored count that drifts" in mild form — but it is SELF-CORRECTING and consumer-harmless:
- The B2.2 `/api`-fold regen is derive-from-source (runs at BH after all WS land), so SiriIsland's symbols re-home to `/siri-island` automatically; D-G7's post-WS12 `subpath-enumeration` re-pin catches the new key count.
- No consumer imports SiriIsland (brand-new component) → zero consumer break.
- G7 Lock-2 already pre-derived `siri-island = PUBLISH` (lists the subpath file), consistent with the build map.

**Recommended:** at develop, soften B7's "203 symbols / 96/96 keys" to "203+ symbols (WS6 adds the SiriIsland set) / 96→97 keys (the new `/siri-island`), regen reproduces all preserved keys" — so the frozen number does not read as a drifted hand-count at the cut.

---

## Verified-accurate (no action — the recorded asks hold exactly)

| Claim (roster) | On-disk verification | Status |
|---|---|---|
| `/api` consumers = EXACTLY muster + speedtest | 3 source sites: `muster/useAuroraConfig.ts:47`, `speedtest/vite.config.mjs:1033`, `speedtest/PhaseTimeline.vue:52`. Zero in atlas/slides/slides-K/bbnf | ✓ exact |
| atlas `--ring` = 12 bare + 8 fallback + vft self-immune | 12 bare `var(--ring)` (exact), 9 `var(--ring,…)`, own `--ring` in `vft-tokens.css:56,125` | ✓ headline 12 exact |
| muster `--ring` degrade-safe ×5 | all 5 are `var(--ring, currentColor)`/`var(--ring, var(--primary))` | ✓ exact |
| speedtest `--ring` inner-fallback only | `SurveyStep.vue:177,180` = `var(--phase-color, var(--ring))`; `tokens.css:821` is a comment; defines own `--focus-ring-color` ×7 | ✓ exact + self-immune |
| bbnf `--ring` self-immune | 12 bare, but bbnf defines its own `--ring` (preset.css) | ✓ exact |
| slides/slides-K `--ring` = 0 | 0 | ✓ |
| viz keys (`/fourier-field`,`/constellation`,`/dot-flow-field`) PRESERVED | demigrate is internal substrate; no key drop; WS5 `W5-viz-subpath-disposition` clause asserts it | ✓ |
| **G1 `--glass-edge-dispersion`/`uChromatic`** | **0 consumer reads** — internal shader uniform | ✓ NO consumer-token change |
| WS10 `--input` delete | 0 consumer reads | ✓ safe |
| WS10 `--accent-ai` mint | 0 consumer reads | ✓ safe |
| G1 `detectTier`/`useSpecularPointer`/`useGlassRenderer` retire | 0 consumer reads | ✓ safe |
| WS10 `--ring`→`--focus-ring-color` | speedtest already self-defines `--focus-ring-color`; atlas is the sole real break (recorded) | ✓ |

---

## Friction-history linkage

- **inv-11 registry-consumer-probe / "named fold, never a silent prune" → REPEATING (F1).** The G4 `--glass-blur-dock` retirement ran the EXACT "0 internal readers ⇒ safe to retire" reasoning that WS10's `--ring` "one consumer" premise ran — and the GU-3 triage caught `--ring` only because the atlas scout was run. No equivalent constellation-grep gated the `--glass-blur-dock` retirement, so bbnf's external override slipped through. The class is live; the discipline was applied to `--ring` but not to the OTHER token-retiring gap-wave (G4).
- **[[feedback_glass_ui_binding_verification]] silent-no-op → REPEATING (F1 + F2).** Both findings are stale/orphaned consumer bindings (`--glass-blur-dock` override, `.glass-refract` class) that pass every device-free gate and would only surface in a real e2e render — bbnf's dock blur and speedtest's badge garnish both silently degrade.
- **"hand-authored count drifts" → mild (F3).** B7's frozen "203 / 96/96" predates the WS6 SiriIsland additions; self-correcting via regen but reads stale.

## PASS-2 hand-off (the items to challenge/confirm)

1. **Confirm F1 is in-scope for a B7 migration row** — is bbnf's `--glass-blur-dock` override a "named fold owed" (inv-11), or accept-residual under bbnf's owed dock-band re-baseline? (My read: owed a row — it is the `--ring` twin.)
2. **Confirm F2** — should the roster record speedtest's `.glass-refract` 4.1.0-no-op alongside slides-K's recorded Dialog-variant no-op?
3. **Re-grep the OTHER G4-retired sub-tokens** I did not exhaustively sweep beyond the headline `--glass-blur-dock`: the G4 spec also retires "composite + saturate + radius + the `--blur-dock` bridge." Confirm none of `--glass-blur-dock-radius`/`--blur-dock`/the saturate companion is independently read by a consumer (I checked `blur-dock` substring = 0 source, but a PASS-2 deep grep of each exact sub-token name is owed).
4. **Verify F3 wording** lands in develop's B7 reconciliation.
