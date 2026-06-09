# AX soundness-reconcile — the PROGRESS↔JSON↔live-tree status reconciliation + the `proof:live-verified-ledger` close gate

**Lane** soundness-reconcile · **Mode** read-only inventory / tranche-planning (PLANNING — the
orchestrator APPLIES the reconcile; this doc authors no `src`, edits no PROGRESS row) · **HEAD**
`6569b7a` (3.8.0 + convergence-1 W44-W52 + convergence-2 W53-W59 + the dock band) · **Captured**
2026-06-09

> The AX cardinal lesson is the governing precept: a wave is `complete`/`live-verified` ONLY when
> audited GREEN against the LIVE product — "complete" never collapses to headless-green. This lane
> reconciles the three-layer record (the PROGRESS.md status column ↔ each wave's audit JSON `status`
> field ↔ the live source tree) and finds the status was **inflated a THIRD time** (the R-path-synthesis
> flag). It lists EVERY row whose PROGRESS status disagrees with its JSON or the source truth, proposes
> the corrected status per row, and authors `proof:live-verified-ledger` — the close gate that makes
> "live-verified" structurally mean something so the inflation cannot recur a fourth time.

---

## TL;DR — the soundness state (the third inflation, source-confirmed)

The cardinal lesson was violated at the **PROGRESS.md aggregation layer, three times over**. S-cardinal
(`inventory/S-cardinal.md`) caught rounds 1 + 2; this lane re-confirms them at HEAD `6569b7a` and adds the
W19 finding the prior passes under-stated:

1. **Round 1** (S-cardinal §1) — W09 + W05 marked flat `complete` in PROGRESS while their JSONs recorded
   `…live-pending` / "still bounces." The user's live pass re-found the un-run close criteria as "new"
   defects (D11, D3). The JSONs were HONEST; the roll-up lied.
2. **Round 2** (S-cardinal §2) — W45/W52/W53/W56/W57/W59 relabeled **`live-verified (DEVELOPED)`** via
   COMMIT-MESSAGE claims of "playwright MCP," while their JSONs STILL say
   `dev-complete-headless-green-live-pending` / `handed-to-orchestrator` / `source-green-pi-pending`, and
   **no paired-π `DELTA.md` or screenshot exists for any of them** (only W01 + W02 have a `DELTA.md`; the
   `audit/visual/` dir holds ONLY `CAPTURE-PROTOCOL.md`, zero screenshots).
3. **Round 3 (THIS lane's escalation)** — **W19 is the worst single row**: marked `live-verified
   (DEVELOPED)`, but **its own spec's RED witness 1 is STILL RED at HEAD**. `src/components/custom/header-ribbon/`
   EXISTS, `src/api/index.ts:207` imports it, `package.json:312` exports the `./header-ribbon` subpath,
   `typesVersions['*']['header-ribbon']` (`:121`) lists it, `demo/stories/navigation/header-ribbon.vue`
   ships. W19 is not even DEV-COMPLETE — only its glyph-face + disco-glyph + glass-carousel arms landed;
   the headline header-ribbon excision NEVER did. "live-verified (DEVELOPED)" is doubly false here.

**The unfalsifiable-without-captures meta-fact:** the ONLY two waves that satisfy the W00 binding-close
protocol (paired-π BEFORE/AFTER + DELTA, ≥2 viewports × {light,dark}, ≥5 timing frames for motion,
contrast-measured) are **W01 and W02**. Every other "live-verified"/"complete" visual row is a prose
assertion with no captured artefact — structurally unfalsifiable, which is exactly how the inflation
keeps recurring. The fix is a GATE (`proof:live-verified-ledger`), not another manual pass.

---

## 1. The reconcile table — every row whose PROGRESS status disagrees with its JSON or the live tree

Legend for **Corrected status** (the qualifier-bearing vocabulary PROGRESS must carry, per the
A-session-soundness discipline — a wave's PROGRESS row inherits its JSON qualifier, never collapses it):
`live-verified` = JSON unconditionally complete AND a paired-π `DELTA.md` exists · `live-pending` =
source/headless GREEN, binding live arm OWED (no DELTA) · `dev-incomplete` = a born-RED witness is STILL
RED at HEAD (source not landed).

### 1a. The Round-2 relabels — source landed, DELTA OWED → revert `live-verified (DEVELOPED)` → `live-pending`

| Wave | PROGRESS now | JSON `status` (source-confirmed) | Live tree | DELTA? | **Corrected** | Why it disagrees |
|---|---|---|---|---|---|---|
| **W45** | `live-verified (DEVELOPED) — region-model + DK1/2/4/5/7/8` | `DEV-COMPLETE (headless self-gated; live π-lane visual-truth + timing TUNE owned by the orchestrator — DK1/DK7 the headline live checks)` (`W45-…json`) | region-model + `#persistent` + `calc(1-−-dock-morph-t)` PRESENT | **none** | **`live-pending`** | JSON's own `liveArmOwed.owner = orchestrator`; the "live-verified" rests on `proof:dock-animation-live` (a FRAME-COUNT gate) — DK2 hover / DK8 rail / DK4 big-dock are GATE-GREEN but VISUAL-UNVERIFIED (S-cardinal §3c) |
| **W52** | `live-verified (DEVELOPED)` | `dev-complete-headless-green-live-pending` (`W52-…json:4`) | bounded gleam + plus-lighter + reduced cohort PRESENT in glass.css/tokens.css | **none** | **`live-pending`** | JSON status literally says `live-pending`; **Q3 (pass-3) CONTRADICTS the live mark** — "hover effect for dock + buttons NOT noticeable, only on CLICK" — the binding live arm was never run (the cardinal W52 risk: W09 shipped headless-green over a still-blooming surface, the precise reason D19 re-opened it) |
| **W53** | `live-verified (DEVELOPED)` | per-assertion `"pass"` (source gates); no overall live `status`; `liveArmNotes` present | Bouncy/Underline/Responsive DELETED, `SegmentedTabs.vue` PRESENT (clean break confirmed) | **none** | **`live-pending`** | source genuinely landed (clean break verified), but D3 "is the squish no longer jarring" is a frontend-design judgment needing a captured read; commit "spring glide" is an assertion |
| **W56** | `live-verified (DEVELOPED)` | `dev-complete-headless-green-live-pending` (`W56-…json`) | `corner-shape`/`superellipse` tokens in theme.css/glass.css/dock.css PRESENT | **none** | **`live-pending`** | JSON: `cornerShape readback = orchestrator-driven` — the JSON ITSELF declares the live arm owed; **also a scope gap**: user-decided squircle extends to dialogs/sheets/panels, but `grep superellipse src/components/ui/dialog src/components/ui/sheet` = NONE (the W56 amend / W60 reach is unlanded — route to the squircle-amend, NOT a status flip) |
| **W57** | `live-verified (DEVELOPED)` | `handed-to-orchestrator` + `dev-complete-source-green-pi-pending` (`W57-…json`) | pulse-aura re-baseline + aurora-hero helper PRESENT (source) | **none** | **`live-pending`** | JSON `piLiveArm.status = handed-to-orchestrator`, `:99` "does NOT close on the SOURCE gate alone — the executed live chrome-devtools-mcp audit is the binding close criterion." Only P6 was live-read (`orchestrator-mcp-live-pass2.md`); P7 heros NOT live-verified |
| **W59** | `live-verified (DEVELOPED)` | `dev-complete-headless-green-live-pending` (`W59-…json`) | slider spectrum + integrated-cylinder PRESENT in Slider.vue/utilities.css | **none** | **`live-pending`** | JSON status says `live-pending`; commit "integrated-cylinder + squircle-thumb" is an assertion with no paired-π |

### 1b. The Round-3 escalation — a born-RED witness STILL RED → revert to `dev-incomplete` (worse than live-pending)

| Wave | PROGRESS now | Spec witness state at HEAD | **Corrected** | Why it disagrees |
|---|---|---|---|---|
| **W19** | `live-verified (DEVELOPED)` | **RED witness 1 STILL RED**: `src/components/custom/header-ribbon/` EXISTS (HeaderRibbon.vue + index.ts + types.ts); `src/api/index.ts:207` imports it; `package.json:312` exports `./header-ribbon`; `typesVersions['*']['header-ribbon']` `:121`; `demo/stories/navigation/header-ribbon.vue` ships. glyph-face + disco-glyph + glass-carousel ARE excised (those arms landed). | **`partial — dev-incomplete (header-ribbon arm UNLANDED)`** | The headline F0 header-ribbon excision NEVER landed; only F1/F2/P4 did. "DEVELOPED" is FALSE for the header-ribbon arm and "live-verified" is doubly false (no DELTA, and the source witness is RED). The PROGRESS prompt's "header-ribbon/glass-panel/useTokenColor still in tree" is CONFIRMED — with the nuance that glass-panel is **W20**-owned (planned, correct) and useTokenColor's COMPOSABLE is a deliberate **KEEP** (MASTER-PLAN P1 + the 2nd consumer constellation.vue; only the DEMO story + the vertical-dock icon are the prune, routed to W18/W21 — NOT a W19 defect). |

### 1c. The Round-1 rows — already corrected in PROGRESS, recorded here for ledger completeness

| Wave | PROGRESS now | State | **Corrected** | Note |
|---|---|---|---|---|
| **W09** | `live-pending → D11 radials absorbed by W52 (developed)` | JSON `dev-complete-headless-green-live-pending`; D11 radials shipped at source via W52 but UN-live-verified | **`live-pending` (carry: D11 fix rides W52's owed DELTA)** | Already qualifier-bearing in PROGRESS (good). The D11 fix's live truth is GATED on W52's owed DELTA — do not flip to complete until W52's DELTA lands. Also confirm the `--glass-curvature-overlay` dead `-dark` orphan + triple-definition collapse in the W52/W33 sweep (S-cardinal §1). |
| **W05** | `complete` | JSON `:104` "BouncyToggle still bounces"; D3 shape-defect was OUT of W05's register-only bounds | **`complete` (register-scope) — carry: D3 shape RESOLVED-by-W53** | W05's bezier-excision scope is genuinely done; the SHAPE defect was never W05's. Add the carry note that W53 deleted BouncyToggle (so the record reads true); W53's own live-pending then covers D3. |

### 1d. The flat-`complete` suspect rows — JSON honest, PROGRESS under-qualified

| Wave(s) | PROGRESS now | Live-truth risk | **Corrected** | Owner of the live re-verify |
|---|---|---|---|---|
| **W15 / W16** | both `complete` | **The single largest open live-truth gap.** W15 JSON = `REDRESS dev-complete` ("Could NOT run a real browser" `:21` — the re-derive is REASONED, not browser-run); W16 touched NO geometry constant. D4/D5/D7 (skeuomorphic lighting / broken hover / broken moods) UN-FIXED at source — `types.ts` still `lit:true iridescence:0.18 coreGlow:0.1 rimStrength:0.5 pointerStrength:0.45`. | **`live-pending` (carry: D4/D5/D7 → W46, un-started)** | W46 is `planned`, NO audit JSON, NOT started. The blob is `complete` at PROGRESS, live-broken, AND un-worked — the most-unresolved suspect-complete (S-cardinal §3a / §4.1). |
| **W23** | `complete` | contrast/affordance fix is HONESTLY done (dots ≥3:1, real elongation pip); the P5 Apple-liquid-pill is NOT reached (gated on W42). | **`complete` (defect-fix scope) — carry: P5 → W42/W23b**; annotate the JSON `F5_carouselChromeGlassAtoms` SUPERSEDED-by-W19/P4 (the dir W23 glass-atomized was then deleted by W19 — S-cardinal §3b/G4) | W42 + W23b, both `planned`. Do NOT fold P5 into W23's `complete`. |
| **W37** | `complete` | JSON `GREEN`; binding-verification re-point (FourierField as 2nd /canvas consumer) landed; no user defect targets it. | **`complete` (confirmatory live read at close suffices)** | low risk — no flip; record only that no captured DELTA exists (confirmatory, not blocking). |
| **W17** | `complete` | audit verdict "constellation — fine"; no user defect. | **`complete` (confirmatory live read at close)** | lowest-priority suspect; a close-time live read suffices. |
| **W58** | `dev-complete (proof:story-language born-RED→GREEN; 49 SFCs swept)` | JSON `dev-complete-source-green-no-live-arm`; pure-FS gate, NO live arm by nature (a meta-language scan, not a visual surface). | **`complete` (no live arm warranted — device-free by nature)** | W58 is correctly device-free; the ledger gate must EXEMPT pure-FS waves (the §3 gate spec carries the exemption list). |

### 1e. The plan-record divergences (not status flips — record-truth fixes the ledger gate must surface)

| # | Divergence (S-cardinal §5) | Fix |
|---|---|---|
| G3 | **W01 is flatly `complete` but its DK1/DK7 arms were re-opened + closed INSIDE W45.** The morph-stagger DIRECTION (DK1) + the leaving-pane OPACITY clock (DK7) were re-authored in W45; `W01-DELTA.md` predates them. | Note in PROGRESS: "W01 morph-stagger re-authored by W45 (DK1/DK7)"; W45's owed DELTA covers them (do not back-date W01-DELTA). |
| G4 | **W23's superseded `custom/glass-carousel` glass-atom restyle is un-annotated** — W19 (P4) deleted the dir W23 had just restyled. | Annotate `W23-carousel-indicator.json` F5/postFix `superseded-by-W19/P4`. |
| G5 | **W46's blob suspect-complete has NO live re-diagnosis artefact** — W15's redress was REASONED, not browser-run. | The ledger gate flags W15/W16 `complete`-without-DELTA as a born-RED row until W46 lands its DELTA. |

---

## 2. The corrected PROGRESS status column (the orchestrator applies this)

```
W19  live-verified (DEVELOPED)        → partial — dev-incomplete (header-ribbon F0 UNLANDED; glyph/disco/glass-carousel done)
W45  live-verified (DEVELOPED)        → live-pending (DELTA owed: DK2 hover / DK8 rail / DK4 big-dock visual-unverified)
W52  live-verified (DEVELOPED)        → live-pending (DELTA owed; Q3 hover CONTRADICTS — re-verify)
W53  live-verified (DEVELOPED)        → live-pending (DELTA owed; D3 squish read)
W56  live-verified (DEVELOPED)        → live-pending (DELTA owed; squircle dialog/sheet/panel reach UNLANDED → W56-amend/W60)
W57  live-verified (DEVELOPED)        → live-pending (DELTA owed; P7 heros un-read, only P6 live-confirmed)
W59  live-verified (DEVELOPED)        → live-pending (DELTA owed)
W15  complete                         → live-pending (carry: D4/D5/D7 → W46 un-started)
W16  complete                         → live-pending (carry: D4/D5/D7 → W46 un-started)
W23  complete                         → complete (defect-scope) + carry: P5 → W42/W23b; annotate F5 superseded-by-W19
W09  live-pending → …W52 (developed)  → KEEP (qualifier-bearing; D11 rides W52's DELTA)
W05  complete                         → complete (register-scope) + carry: D3 RESOLVED-by-W53
W17  complete                         → complete (confirmatory live read at close)
W37  complete                         → complete (confirmatory live read at close)
W58  dev-complete                     → complete (device-free by nature — no live arm warranted)
W01  complete                         → complete + note: DK1/DK7 morph-stagger re-authored by W45
```

Net: SEVEN `live-verified (DEVELOPED)` rows revert to `live-pending` (six) or `dev-incomplete` (W19);
TWO `complete` rows (W15/W16) revert to `live-pending`; the rest carry qualifier/annotation notes. **Zero
new implementation is implied for the live-pending rows** — the source landed; the gap is the binding live
audit each JSON already names as OWED (one orchestrator MCP sweep + a DELTA-per-wave discharges them).
W19's header-ribbon arm + W15/W16→W46 are the only rows needing actual SOURCE work.

---

## 3. The close gate — `proof:live-verified-ledger` (device-free arm + fail-CLOSED π live arm)

The structural forcing function so the inflation cannot recur a fourth time. Owned by **W33 (close)**;
authored born-RED here. Per SPEC.md §Hard Gates the precept-valid form is a SOURCE/FS gate for the
ledger CONTRACT (device-free) + a π live arm for the captured-render TRUTH (the cardinal lesson — a green
ledger over an un-captured surface is NOT done). Born-RED today: the current seven relabeled rows lack
DELTAs.

### 3a. The device-free SOURCE arm — `scripts/proof-live-verified-ledger.mjs` (pure FS, the ledger-contract gate)

Mirrors `proof-story-language.mjs`'s pure-FS shape (`readFileSync` + parse, no browser, befitting-silent
device-absence). It enforces the PROGRESS↔JSON↔DELTA tri-consistency:

1. **PARSE the PROGRESS.md status table** (`docs/tranches/AX/PROGRESS.md`) into `{wave → status-string}`.
2. **PARSE each wave's audit JSON** (`docs/tranches/AX/audit/W<NN>-*.json`) for its `status` field.
3. **For every PROGRESS row whose status contains `live-verified` or bare `complete`** (the
   binding-close claims), ASSERT:
   - **(a) DELTA-artefact existence** — a paired-π capture exists at
     `docs/tranches/AX/audit/visual/W<NN>-DELTA.md` OR `docs/tranches/AX/audit/W<NN>-DELTA.md` (the W01/W02
     location), carrying the W00 protocol fields (the route(s) + ≥2 viewports × {light,dark} headers, the
     BEFORE/AFTER paired-π readback block, ≥1 screenshot reference `W<NN>-<route>-<vp>-<scheme>.png`, and
     — for a motion wave — ≥5 rAF frames, — for a contrast wave — the measured WCAG ratio). The gate
     greps the DELTA for these REQUIRED section markers; a stub DELTA with no readback block REDs.
   - **(b) JSON-qualifier consistency** — the wave's JSON `status` is unconditionally complete
     (`GREEN` / `pass` / `complete` / `live-verified`), OR the PROGRESS row CARRIES the JSON's qualifier
     (`live-pending` / `handed-to-orchestrator` / `pi-pending` / `dev-complete` must appear in the PROGRESS
     cell if it appears in the JSON `status`). A PROGRESS `live-verified` over a JSON
     `…live-pending`/`handed-to-orchestrator` REDs (the EXACT round-2 inflation — the gate's primary bite).
   - **(c) born-RED-witness clearance** — for a wave whose spec declares falsifiable RED witnesses, the
     gate runs the wave's OWN `proof:*` (if registered) and asserts it's GREEN; a PROGRESS `live-verified`
     while the wave's witness gate REDs is the W19 class (header-ribbon resolves in `package.json` /
     `src/api/index.ts` → the W19 resolution-witness REDs → ledger REDs).
4. **The EXEMPTION list** (device-free-by-nature waves carry no live arm): pure-FS / meta-language /
   gate-infra waves — W58 (`proof:story-language`), W00 (the π-lane stand-up itself), W27a/b (commentary
   sweeps), W33 (close) — declared in a `DEVICE_FREE_WAVES` const with a one-line rationale each. An
   exempt wave needs JSON-qualifier consistency (3b) but NOT a DELTA (3a). The exemption is EXPLICIT +
   auditable, never a silent skip.
5. **RED witness (the gate's own falsifiability — the §HardGate bite):** re-inject a PROGRESS
   `live-verified` cell on a wave with no DELTA + a JSON `live-pending` (i.e. revert any one of the seven
   to the inflated label) → the gate REDs naming the row, the missing DELTA path, and the JSON qualifier
   it contradicts. Conversely, with the seven corrected to `live-pending` (the §2 column) and the DELTAs
   captured for any genuinely-closed wave → GREEN. **Born-RED at HEAD** (the seven inflated rows + zero
   DELTAs under `audit/visual/`).

Register `proof:live-verified-ledger` in `package.json` + the W00 `proof:gate-script-parity` meta-gate
bijection (so the registration cannot silently drift). NOT in the per-wave CI aggregate — it's a
CLOSE/band gate (runs at W33 + on a PROGRESS edit), to avoid REDding the whole CI on a mid-tranche
in-flight wave.

### 3b. The fail-CLOSED π live arm — the captured-render truth (the cardinal lesson, NON-NEGOTIABLE)

The SOURCE arm proves the LEDGER is consistent (a DELTA file exists + the qualifiers match). It does NOT
prove the DELTA's pixels are real. The π live arm (the W00 protocol, ORCHESTRATOR-run via
chrome-devtools-mcp @ `localhost:5173`) is the binding close criterion the ledger gate POINTS AT but
cannot itself execute (the agent sandbox has no browser binary — fail-CLOSED, befitting-silent
device-absence, exit non-zero ONLY when a browser IS present and the capture is missing/stale):

- **For each `live-pending` → `live-verified` transition** the orchestrator captures the owed paired-π:
  navigate the wave's route(s) at ≥2 viewports (desktop ≥1280 + mobile 375×667) × {light, dark},
  `getComputedStyle`-read the EXACT numbers the wave changed (the BEFORE/AFTER), screenshot each
  `W<NN>-<route>-<vp>-<scheme>.png` into `audit/visual/`, and write the `W<NN>-DELTA.md`. The π arm
  asserts the captured screenshots are NEWER than the source files the wave touched (a stale capture
  REDs — no claiming an old screenshot proves a new edit).
- **The fail-CLOSED contract:** when a browser IS reachable, the π arm asserts every `live-verified` row's
  DELTA screenshots exist + are fresh; a missing/stale capture exits non-zero (RED). When no browser is
  present (the agent lane), it exits 0 with a `SKIP (no browser — orchestrator owns the π arm)` befitting
  message — NEVER a false-GREEN (the AW false-GREEN class the W00 lane closed).
- **Per the cardinal re-verify list (S-cardinal §4)** the owed captures in severity order: (1) BLOB
  W46 (un-started — the largest gap), (2) W52 (absorbs D11/W09; Q3 hover the live contradiction to
  re-prove), (3) W53 (D3 squish), (4) W45 (DK2 hover / DK8 rail / DK4 big-dock — beyond the frame gate),
  (5) W56/W59/W57 (each JSON self-names the owed arm), (6) W23/P5 (gated on W42), (7) W17/W37
  (confirmatory).

---

## 4. FileBounds (this lane's read-set + what the orchestrator applies — no `src` edits here)

| File | Action |
|------|--------|
| `docs/tranches/AX/audit/inventory/soundness-reconcile.md` | **THIS doc** (the reconcile + the gate spec). PLANNING artefact; writes no `src`. |
| `docs/tranches/AX/PROGRESS.md` | the orchestrator APPLIES the §2 corrected status column (the reconcile target). NOT edited by this lane. |
| `docs/tranches/AX/audit/W*.json` | READ for the `status` field (the JSON-truth half of the reconcile). |
| `docs/tranches/AX/audit/visual/CAPTURE-PROTOCOL.md` | READ — the DELTA-artefact contract the gate enforces (already names the W45/W52/W53/W56/W57/W59 backfill). |
| `docs/tranches/AX/audit/inventory/S-cardinal.md` | READ — the prior-pass inventory this lane consolidates + escalates (W19). |
| `scripts/proof-live-verified-ledger.mjs` | **the W33 implement lane** authors this (the device-free SOURCE arm); spec in §3a. Born-RED at HEAD. NOT written here. |
| `package.json` | the W33 lane registers `proof:live-verified-ledger` + the W00 parity. NOT edited here. |
| `src/components/custom/header-ribbon/`, `src/api/index.ts`, `package.json` `./header-ribbon` | READ-ONLY here — the W19 header-ribbon-still-present evidence. The EXCISION is W19's unlanded arm (the orchestrator re-dispatches W19's F0). |

**OUT of bounds:** any `src` edit (this is PLANNING); the actual PROGRESS row flip (the orchestrator
applies §2); the W19 header-ribbon excision (W19's own re-dispatch); the W46 blob fix (W46); writing the
proof script (W33). This lane RECONCILES + SPECS; it does not implement.

---

## 5. DEDUP — how this folds without duplicating an existing wave

- **vs `inventory/S-cardinal.md` (the prior cardinal inventory) — CONSOLIDATES + ESCALATES, no overlap.**
  S-cardinal inventoried rounds 1+2 and PROPOSED the `proof:live-verified-ledger` gate in prose (§6.1).
  This lane (a) re-confirms every claim at HEAD `6569b7a` (S-cardinal was at `c72d2ac`), (b) ESCALATES the
  W19 finding S-cardinal under-stated (it's `dev-incomplete`, not merely DELTA-less — a born-RED witness
  is still RED), (c) produces the EXACT per-row corrected-status COLUMN (§2) S-cardinal left as prose, and
  (d) authors the gate's full device-free + fail-CLOSED-π SPEC (§3) S-cardinal only sketched. S-cardinal
  is the inventory; this is the reconcile + gate-spec. No duplicate row.
- **vs `audit/visual/CAPTURE-PROTOCOL.md` — this lane SPECS the GATE that enforces the protocol.**
  CAPTURE-PROTOCOL.md defines the DELTA ARTEFACT (what a DELTA.md must carry) + names the backfill list.
  This lane authors `proof:live-verified-ledger` — the executable gate that ASSERTS the protocol's
  artefact exists + the PROGRESS/JSON qualifiers agree. The protocol is the contract; the gate is the
  enforcement. Complementary, not duplicative.
- **vs W33 (close — gate fleet, readmes, overfitting, inheritance, final) — this lane AUTHORS one of
  W33's gates.** `proof:live-verified-ledger` is a W33 close-gate (S-cardinal §6.1 routes it there). This
  lane writes its born-RED spec so W33's implement lane lands it; the registration + the proof script are
  W33's. No new wave is minted — the gate folds INTO W33's existing close-gate-fleet scope.
- **vs the per-wave waves (W45/W52/W53/W56/W57/W59/W19/W46) — this lane RECONCILES their STATUS, does
  not re-author them.** The owed DELTAs are captured by those waves' own live arms (the orchestrator's MCP
  sweep); W19's header-ribbon excision is W19's re-dispatch; W46 is the blob fix. This lane only corrects
  the LEDGER + specs the gate that keeps it honest — it touches none of their source or scope.
- **vs the MASTER-PLAN Batch-0 row.** MASTER-PLAN §Batch-0 already lists "Reconcile PROGRESS↔JSON; the
  `proof:live-verified-ledger` close gate; the MCP re-verify sweep." THIS doc IS that Batch-0 deliverable
  — it fills the row, it doesn't duplicate it.
