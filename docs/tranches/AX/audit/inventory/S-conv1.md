# S-conv1 — Convergence-1 outcomes inventory (W44-W52)

Read-only source/doc-level inventory of the AX convergence-1 round at HEAD `c72d2ac`. The
17-defect live-product ledger (`USER-DEFECTS-2026-06-08.md`, D1-D19 — note: D1-D15 in the
header but D16-D19 added; 19 total) was mapped by the 23-lane WF1 audit
(`audit/convergence/CONVERGENCE-PLAN.md`) into **7 net-new waves (W44-W50)** + the
**W51 `--ui-scale` umbrella** + **2 cardinal-lesson re-opens (W09, W05)** + augments. This
lane reconciles the PLAN status against what is actually applied in `src/`.

---

## Bottom line

Of the convergence-1 wave set, **only W45 and W52 are DEVELOPED + live-verified**. The D11
specular radials (a W09 re-open) are **absorbed by W52 and applied**. The D3 BouncyTabs
motion-shape (a W05 re-open) is **resolved inside W53** (the unification — not W05). Every
other convergence-1 wave (W44, W46, W47, W48, W49, W50) is **NOT-STARTED at source** —
wave docs authored, no audit JSON, no `src/` edits, no gate registered. **W51 has no wave
doc at all** — it lives only as a CONVERGENCE-PLAN row.

| Wave | Defect | Plan doc | Audit JSON | Source applied | Gate | Status |
|---|---|---|---|---|---|---|
| W44 | D10 dark `--destructive` AA | ✓ | ✗ | ✗ (still `hsl(0 62.8% 30.6%)`) | ✗ missing | **NOT-STARTED** |
| W45 | D13+D15 dock region/scale | ✓ | ✓ | ✓ (`--dock-scale`, `<DockSeparator>`) | ✓ | **DONE (live-verified)** |
| W46 | D4+D5+D7 blob | ✓ | ✗ | ✗ (floors not bands; cohort hot) | ✗ | **NOT-STARTED** |
| W47 | D2 aurora preset names | ✓ | ✗ | ✗ (`OIL_VANGOGH`="Oil Swirl"/`medium:"oil"`) | n/a | **NOT-STARTED** |
| W48 | D8 glass-material demo | ✓ | ✗ | ✗ (still abuses `glass-btn`, no `useSpecularTracking`) | n/a | **NOT-STARTED** |
| W49 | D16 math-paper × latex-paper | ✓ | ✗ | ✗ (no latex-paper/katex import) | n/a | **NOT-STARTED** |
| W50 | D17 dropdown type-scale | ✓ | ✗ | ✗ (`menuItemVariants` still bare `text-sm`) | ✗ | **NOT-STARTED** |
| W51 | D18 `--ui-scale` umbrella | **✗ no doc** | ✗ | ✗ (no `--ui-scale` token) | ✗ | **NOT-STARTED + UNAUTHORED** |
| W52 | D19 liquid-glass material | ✓ | ✓ | ✓ (bounded gleam, plus-lighter) | ✓ `proof:liquid-glass-material` | **DONE (live-verified)** |
| W09 re-open | D11 fixed-anchor radials | (W52) | (W52) | ✓ ABSORBED by W52 | ✓ | **DONE (via W52)** |
| W05 re-open | D3 BouncyTabs motion | (W53) | (W53) | ✓ RESOLVED by W53 | ✓ | **DONE (via W53)** |

---

## DONE (developed + live-verified on the real device)

### W52 — liquid-glass material overhaul (D19, the loudest defect) — DONE
Source-confirmed applied:
- `src/styles/glass.css` — `.glass-material::before` is now a **bounded** `circle
  var(--glass-specular-size, 36%)` gleam (was an unbounded whole-surface disc reaching
  55%/75%); blend is **`mix-blend-mode: plus-lighter`** (3× in source, **0× `screen`**).
- `src/styles/tokens.css:859` — `--glass-specular-size: 36%` minted (the single overridable
  bound). `--glass-curvature-overlay` re-derived onto **warm-cream `hsl(40 30% 96%)`** at
  `--glass-curvature-intensity: 0.02` (light) / `0.012` (`.dark` @ `:1849`), ellipse tightened
  to `transparent 38%` (was pure-white `hsl(0 0% 100% / 0.06)` reaching 60%).
- `src/styles/dock-controls.css` — the dock primary phase radial demoted **18%→8%**, the hard
  `30% 30%` corner shifted to a softer top-biased `40% 25%` ellipse, falloff `70%→55%`.
- Cohort hover→0.10/active→0.16 (dark 0.08/0.12); Card `specular="full"` re-derived down.
- Gate `proof:liquid-glass-material` registered (`package.json:647` + script present + bijection).
- Commits `31d716e` (core), `97551ca` (button-hover unify + glass-btn blur + gold canon),
  `5cf2980` (DEVELOPED + live-verified docs). PROGRESS marks **live-verified (DEVELOPED)**.
- The W52 audit JSON status string is literally `dev-complete-headless-green-live-pending`
  but PROGRESS + commit `5cf2980` ("bloom gone, buttons glassy+smooth") upgrade it to
  live-verified. **The JSON status string is stale relative to PROGRESS** — minor doc-drift.

### W45 — dock region-model + DockSeparator + `--dock-scale` (D13+D15) — DONE
`src/components/custom/dock/DockSeparator.vue` exists; `--dock-scale` threads `dock.css`/
`dock-controls.css` (the coarse-pointer `--dock-mobile-scale` multiplier; the 44px floors
subsumed via `max(…,44px)`); glyph ownership (`.dock-icon-button > svg` reads
`--dock-icon-glyph`). Commits `56db9e0` + `88a2ec5`; PROGRESS **live-verified (DEVELOPED) —
region-model + DK1/2/4/5/7/8**. (Convergence-2's dock-band augments — DK1 collapse-timing,
DK6/DK7 layer-anim lag, rail identity — fold around it; the layer-animation-lag is flagged in
`A-tranche-wave-audit` as a **GAP needing a net-new dock-layer-animation wave**, NOT a W45
bloat — that is a convergence-2 concern, outside this lane.)

### W09 re-open (D11) — DONE via W52 absorption
The 3 sibling FIXED-ANCHOR specular radials W09's moving-specular pass missed are the
`--glass-curvature-overlay` (+ the dock-corner radials) — all re-tuned inside W52 above.
PROGRESS row W09: `live-pending → D11 radials absorbed by W52 (developed)`. No separate W09
re-author landed; the absorption is the correct gestalt (one material pass, not two). The
W09 audit JSON itself (`W09-specular-tune.json`) was NOT re-marked — its own close said
live-pending; the live truth is now carried by W52. **Acceptable** per the soundness
discipline (the qualifier moved to PROGRESS).

### W05 re-open (D3) — DONE via W53 (NOT W05)
The defect ledger + CONVERGENCE-PLAN routed D3 ("BouncyTabs egregious / jarring") to a W05
"MOTION-SHAPE arm" re-open. **It was instead resolved inside W53 (tabs-unify, DEVELOPED).**
`SegmentedTabs.vue:206-265` — `animatePress` now rides `--spring-snappy` (the CONTROL
register), a single settle-into squish `scale(1)→--scale-press-btn→scale(1)` (the prior
`--spring-bouncy` 1.08 keyframe overshoot RETIRED), `prefers-reduced-motion`-gated. The
BouncyToggle/BouncyTabs/UnderlineTabs trio is gone (clean break). **This is a PLAN
DIVERGENCE that resolved BETTER than planned** — D3 folded into the unification rather than a
W05 patch on a component about to be deleted. The W05 "carry-row" in CONVERGENCE-PLAN is
therefore DISCHARGED by W53, not by W05. Worth recording so the carry-row is not chased twice.

---

## NOT-STARTED (plan authored, zero source applied)

### W44 — dark-mode `--destructive` AA floor (D10) — NOT-STARTED
- `src/styles/tokens.css` STILL ships the unmodified shadcn dark value at BOTH arms:
  `:1605` `light-dark(hsl(0 72% 50%), hsl(0 62.8% 30.6%))` and `:1727` `.dark` floor
  `hsl(0 62.8% 30.6%)`. The wave's GREEN target `hsl(0 80% 60%)` is **not applied**.
- The "Session expired" Alert in dark mode is **still illegible** (1.75:1 text/card).
- `scripts/proof-dark-semantic-contrast.mjs` **MISSING**; not in `package.json`/`gates.mjs`;
  `tests-visual/dark-semantic-contrast.spec.ts` absent. No audit JSON.
- Note: line numbers in the wave doc (`:1460`/`:1582`) are stale vs current `:1605`/`:1727`
  (the file grew since `002bda5`) — the *values* are unchanged, so the wave is fully valid;
  the executor must re-resolve line numbers (CLAUDE.md confirms tokens.css grew 1728→1835).
- **Sequencing constraint preserved:** BEFORE W39 (W39 must measure the corrected token).

### W46 — blob live-truth tune (D4+D5+D7) — NOT-STARTED
- The blob lighting cohort is unchanged (`BLOB_CONFIG_DEFAULTS` still `specStrength: 0.9` etc.
  — the ~3.8× over-unity glint the wave RED-witness-2 identifies); `excitedHoldMs = 900` in
  `useBlobMood.ts:157` is the AUTO latch — no manual-mood latch / imperative `setMood`-survives
  arc added (D7). The hover falloff `smoothstep(0.65,0.0)` + `pointerStrength: 0.45` unchanged
  (D5 lunging hover). The `blob-render.spec.ts` floor→band conversion is NOT done.
- Plan present, no audit JSON. This **discharges the deferred W15/W16 live-π** — it is the
  cardinal-lesson receiver for the blob (W15/W16 closed headless-green with an UNMET
  `liveVerifyNeeded`). D5+D7 are **BLOCKER** severity in the ledger — high-priority.

### W47 — aurora preset-roster reconcile (D2) — NOT-STARTED
- `demo/stories/aurora/presets.ts:257` still defines `OIL_VANGOGH` and `:499` labels it
  **"Oil Swirl"** with `medium:"oil"` — the W13 van-Gogh medium is NOT surfaced/named
  (the user's "Where are the van-Gogh items?"). The clean-break key rename
  (`OIL_VANGOGH`→`medium:"vangogh"` + `strokeOrient:"tensor"`, label "Van Gogh") + naming
  oil-pastel in the CRAYON_* labels is unauthored. Demo-only; no library edit; no gate.

### W48 — glass-material demo reauthor (D8) — NOT-STARTED
- `demo/stories/substrates/glass-material.vue:93,114` still uses the **abused `glass-btn`**
  class; no `useSpecularTracking`/`specularStyle`/`onPointerMove` binding; no non-zero
  `--glass-tint-strength`. The "totally broken" demo is unrewired. **Now post-W52** — the
  reauthor must compose the SHIPPED W52 seams (the bounded gleam), so W48 is correctly
  sequenced AFTER W52 (which is done). Demo-only; zero library edits.

### W49 — math-paper composes latex-paper (D16) — NOT-STARTED
- `demo/stories/compositions/math-paper.vue` has **no `latex-paper`/`katex`/`useKatex`/
  `MathBlock` import** anywhere in `demo/`. The hand-rolled Unicode/`<sub>`/`<sup>` salad
  persists. Requires adding `@mkbabb/latex-paper` + `katex` as DEV/demo deps (contract-v2
  sibling path like keyframes.js) — a cross-repo dep step, the heaviest NOT-STARTED here.
  Token-bridge constraint recorded (do NOT raw-import latex-paper's `theme.css` —
  `hsl(var(--token))` double-wrap legacy).

### W50 — uniform dropdown/select/menu type-scale (D17) — NOT-STARTED
- `src/components/ui/_shared/menuItemVariants.ts:33` still ships bare `"text-sm outline-none"`
  — no shared type-scale token; the Select/DropdownMenu/Combobox/ContextMenu family carries
  the inconsistent shadcn defaults. No `--menu-item-text`/shared scale token; no gate.
- **D17 was orchestrator-added AFTER WF1** (CONVERGENCE-PLAN row 28 notes "WF3 lane must
  first audit D17 at source") — the source audit may still be owed.

### W51 — library-wide `--ui-scale` (D18 UMBRELLA) — NOT-STARTED + UNAUTHORED
- **No wave doc exists** (`docs/tranches/AX/waves/AX.W51-*.md` absent) — W51 lives ONLY as
  CONVERGENCE-PLAN row 29 + the PROGRESS table row. No `--ui-scale` token in `tokens.css`/
  `theme.css`; no `proof:ui-scale` gate. This is the **biggest structural gap in the lane**:
  the umbrella that W45 (`--dock-scale`) + W50 (dropdown scale) are meant to SPECIALIZE.
- **Sequencing tension:** CONVERGENCE-PLAN row 29 says "sequence W51 BEFORE W45/W50 so they
  specialize the global axis." But **W45 already shipped with its own `--dock-scale`** before
  W51 exists. So when W51 lands, it must **RECONCILE `--dock-scale` onto `--ui-scale`** (the
  dock scale becomes a local override on the global axis) rather than the two being parallel
  systems — the "ONE scale system, not three" mandate. This is now a **retro-reconcile**, not
  a clean pre-sequence. Must fold into this tranche.

---

## DEFERRED items that must FOLD INTO this tranche

1. **W51 must be AUTHORED as a wave doc** (it is only a plan row) AND then implemented —
   and must **retro-reconcile the already-shipped `--dock-scale` (W45)** onto the global
   `--ui-scale` axis. The "W45/W50 specialize W51" sequencing is now inverted (W45 shipped
   first); the reconcile cannot be skipped or there will be two parallel scale systems.
2. **W50 (D17) source audit** — orchestrator-added post-WF1; CONVERGENCE-PLAN flags a WF3
   lane must audit D17 at source first. Confirm whether that audit ran before authoring W50's
   gate, else it must.
3. **W46 floor→band gate conversion** — the blob `blob-render.spec.ts` one-sided floors are
   the structural root that let "louder" pass forever (the cardinal-lesson failure that let
   W15/W16 ship). The band conversion must land WITH the tune, not after.
4. **W44 line-number resync** — the wave doc cites `:1460`/`:1582`; the live values are at
   `:1605`/`:1727`. The executor re-resolves (values unchanged; wave fully valid).
5. **The W05 carry-row is DISCHARGED by W53** — record this so it is not chased as an open
   W05 item. The CONVERGENCE-PLAN "RE-OPENS" table W05 row is satisfied by the unification.

---

## GAPS / plan divergences

- **W52 audit JSON status string `dev-complete-headless-green-live-pending` is STALE** vs
  PROGRESS `live-verified (DEVELOPED)` + commit `5cf2980`. Reconcile the JSON status (minor).
- **W09 audit JSON not re-marked** — its live-pending qualifier is carried only in PROGRESS;
  acceptable per the soundness discipline, but the JSON reads as if W09 is still open.
- **D3 routed to W05 in the plan, resolved in W53.** A clean win, but the CONVERGENCE-PLAN
  RE-OPENS table (line 36) still names W05 as the owner. The ledger should note the actual
  resolver to avoid double-work.
- **No audit JSONs for W44/W46/W47/W48/W49/W50/W51** — consistent with NOT-STARTED (the JSON
  is the born-RED→GREEN close artefact, written at development). Not a defect, just confirms
  status.
- **`--ui-scale` (W51) ordering hazard** (the headline gap) — see DEFERRED #1.
- **`A-tranche-wave-audit` flags an UNDER-COVERED dock GAP** (layer-animation-lag + rail
  identity) that W45/W06 do NOT own → a net-new dock-layer-animation wave. That is a
  **convergence-2 concern** (W45 augment / new wave), outside this S-conv1 lane but adjacent —
  noted so the convergence-1 W45 "DONE" is not over-read as "the whole dock is done."

---

## Gestalt path forward (planning, not code)

1. **Author W51 FIRST as a real wave doc, with the `--dock-scale` retro-reconcile as a
   first-class clause.** Mint ONE `--ui-scale` `@property` scalar (default 1.0 desktop / 1.5
   coarse-pointer via the existing coarse-pointer `@media`/`@container`), threaded through the
   CVA base sizing + typography ladder so height/pad/gap/font/glyph grow in lockstep. **Then
   re-home `--dock-scale` as `calc(var(--ui-scale) * <dock-local>)`** and make W50's dropdown
   scale a specialization reading the same axis — ONE scale system. Author `proof:ui-scale`
   (device-free: no stray h-9/text-sm/size-4 literal in the CVA bases; coarse-pointer
   amplifies; π arm verifies 1.5× growth). This is the keystone — W45 already shipped its
   piece, so the reconcile is non-optional.
2. **Land the BLOCKER-severity live-truth fixes next** (the user's loudest): W44 (D10 dark
   contrast — token-first, dark-arm-only, before W39) + W46 (D4/D5/D7 blob — floor→band gate
   conversion WITH the calm-bead lighting/hover/mood-latch tune, discharging the deferred
   W15/W16 live-π). Both close on the live π device audit, not the headless gate.
3. **Then the demo-idiom reauthors** (W47 aurora preset names, W48 glass-material onto the
   shipped W52 seams, W49 math-paper × latex-paper). These are demo-only / zero-library-edit
   except W49's dep add. W48 is correctly gated AFTER W52 (done) — it composes the bounded
   gleam, so it can proceed.
4. **W50 dropdown type-scale** specializes W51's `--ui-scale` (do AFTER W51 so it reads the
   global axis, not a third parallel scale). Run the owed D17 source audit first.
5. **Each closes on LIVE real-device chrome-devtools-mcp audit** (the AX cardinal lesson) —
   "complete" never collapses to a headless gate. W44/W46 especially: their headless gates
   are the floor, the painted truth (legible Alert; calm wet bead) is the close criterion.

**Precept compliance check (binding):** every fix is GESTALT + token-first + clean-break.
W44 (single-token lift, no `--destructive-legacy` alias). W46 (floor→band, re-derive against
`energyNorm` — a transposition, not a patch). W51 (ONE `--ui-scale` axis — the no-three-scales
mandate; W45/W50 specialize, not duplicate). W47 (clean key rename, no alias). W48/W49 (demo
reauthor onto shipped seams; no library edits / token-bridge latex-paper, no raw `hsl(var())`
double-wrap). Overfitting bar: `--ui-scale`/`--menu-item-text`/`--destructive-text` (if the
two-token fallback ratifies) all clear ≥2 consumers by construction. No quick fixes, no
workarounds, no legacy.
