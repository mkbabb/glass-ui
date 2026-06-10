# HC-cardinal — the deepened cardinal lane (hc2 · Verify)

**Date** 2026-06-09 · **Branch** `at-dock-convergence` (tranche/AY, Batch-2 at HEAD) ·
**Method** IHDR-decoded every PNG under `docs/tranches/AY/audit/visual/` (109 PNGs), md5-grouped
for renamed-copy detection, spot-viewed the three motion frame series, dumped all 16
`.cache/gates/AY-*.json` + the AX/AV live-gate artefacts, graded the 9 `live-verified`
PROGRESS rows against the trends rubric §7 (A–G).

**Verdict: GAPS-FOUND.** The W-CON1 fabricated-mobile vector is confirmed at exactly 4 PNGs
(no other instance of the hard fabrication class), but the SEMANTIC depth the matrix §4
demanded is still ungated: 10 more PNGs carry viewport claims no machine can check, one
5-frame series is non-demonstrative, TWO live gates sit at persisted RED at HEAD (one stale
vs landed source, one synthetic-born-RED with the real-surface GREEN still owed), the
glass-cohesion π arm has NO persisted artefact, the ledger gate has NO dimension assert
(R1 unbuilt at its named insertion site), the allowlist curation contract is breached by
six pixel-changing closes, and two waves with on-disk "live-verified" DELTAs sit at
`planned` in PROGRESS — invisible to the ledger gate by construction.

---

## §1 — PNG inventory: IHDR dimensions vs filename claim (109 PNGs)

Protocol floor (`CAPTURE-PROTOCOL.md:13`): desktop ≥1280, mobile 375×667 (W-CON3 extended
the de-facto mobile to 390×844@2× = 780×1688 / 628×842 element-at-2×).

### 1a — FABRICATED-MOBILE (filename claims mobile; pixels are a desktop viewport) — 4 PNGs

| PNG | IHDR | claim |
|---|---|---|
| `W-CON1-autodrift-mobile-light.png` | **1280×721** | 375×667 (`W-CON1-DELTA.md:11`) |
| `W-CON1-autodrift-mobile-dark.png` | **1280×721** | 375×667 |
| `W-CON1-refit-mobile-light.png` | **1280×721** | 375×667 |
| `W-CON1-refit-mobile-dark.png` | **1280×721** | 375×667 |

These are NOT renamed copies (distinct md5 from their desktop twins — separate captures at a
desktop viewport, the constellation in a sparse left column, no focal ring; viewed and
confirmed). This is the full extent of the hard class: **no other PNG in the dir claims a
mobile viewport while carrying desktop pixels.** The RG note on the PROGRESS row
(`PROGRESS.md:62`) is honest; the re-capture is owed and NOTHING machine-forces it (§5).

### 1b — UNVERIFIABLE viewport claims (element captures whose dims cannot witness the claim) — 10 PNGs

| set | IHDR | issue |
|---|---|---|
| `W-CON1-refit-before-{desktop,mobile}-{light,dark}.png` (4) | **360×241** | the "desktop"/"mobile" split is nominal — all four are the same shrunken-canvas element state (the 360×240 pre-refit fixture per `W-CON1-DELTA.md:43`); a 360px image labeled `-desktop-` satisfies no floor and witnesses no viewport |
| `W-BLOB2-goo-blob-desktop-{light,dark}.png` (2) | 448×450 | element crop; "1280" claim (`W-BLOB2-DELTA.md:75`) unwitnessable |
| `W-BLOB2-goo-blob-mobile-{light,dark}.png` (2) | **450×450** | "375" claim (`W-BLOB2-DELTA.md:78`) — a 450px-wide element cannot fit a 375 CSS-px viewport at 1×; only coherent at @2× (225 CSS px), which nothing records |
| `W-SLD1-{spectrum,standard-resolved}-{light,dark}.png` (4) | 1068×55 / 1068×69 | element strips; W-SLD1 DECLARES a single 1280×800 viewport (`W-SLD1-DELTA.md:18`) — the protocol ≥2-viewport floor is breached openly, ungated |

### 1c — Single-viewport / protocol-floor breaches (no false claim, floor unmet)

- **W-AUR-PAINTERLY**: all 18 PNGs are **932×701** — one viewport, no mobile arm, and 932 <
  the 1280 desktop floor. Additionally **6 of the 18 are byte-duplicates** (md5-identical
  `*-after.png` == unsuffixed `*.png` for all 6 medium×scheme pairs) — the "18 own-surface
  PNGs" PROGRESS claim (`PROGRESS.md:66`) is 12 distinct captures + 6 ledger aliases. Not
  fraud (the DELTA names them "own-surface ledger" copies at `W-AUR-PAINTERLY-DELTA.md:59`),
  but the count is inflated by aliasing and the ≥2-viewport floor is unmet.

### 1d — CLEAN (dims machine-verify the claim)

- **W-DOCK1** (12): 2880×1800 = 1440×900@2× desktop, **780×1688 = 390×844@2×** mobile. ✓
- **W-DOCK3** (8): same protocol. ✓
- **W-CON3** (4): 2132×842 / **628×842 = 314×421@2×**, with the dimension arithmetic stated
  IN the DELTA (`W-CON3-DELTA.md:16-17`) — the model citizen for rubric-E.
- **W-BLOB3** (14): desktop 1280×800 full-viewport, mobile **375×667 full-viewport** — the
  only mobile set in the dir at the exact protocol viewport at 1×. ✓
- **W-CON2** (21): 1066×420/421 desktop element + 314×421 mobile element (390−2×38 = 314,
  consistent with the claimed 390 viewport; the matrix's counter-datum). Plausible, though
  element captures are not machine-checkable against the viewport claim.
- **W-FF2** (4): 1068×423 desktop element + 356×602 mobile element — plausible, same caveat.
- md5 sweep: **zero cross-viewport or cross-scheme renamed copies anywhere** — the only
  duplicate pairs are the 6 benign W-AUR-PAINTERLY ledger aliases.

---

## §2 — Motion/frame-series demonstrativeness (spot-viewed)

| series | claim | viewed verdict |
|---|---|---|
| `W-BLOB2-blob-mood-hover-frame{1..5}` (720×720) | "the seed-derived lit bead **leaning toward the pointer** across five rAF-sampled hover frames" (`W-BLOB2-DELTA.md:83-87`) | **NON-DEMONSTRATIVE** — frames 1 and 5 show a static red/coral bead, sub-perceptual membrane wobble only, NO readable lean, NO pointer evidence, and the cream default never appears on the mood surface. Confirms B2-blob F2/F3 at HEAD; the RG2/RG3 re-capture is owed and unforced (§5). |
| `W-BLOB3-goo-blob-hover-frame{1..5}` (1280×800) | "the cream bead leans on hover" | **DEMONSTRATIVE** — frame 1: horizontal cream lozenge at rest; frame 5: bead deformed with a pseudopod reaching toward the pointer travel. The claimed register reads from the stills. |
| `W-CON2-well-frame{1..5}` (1066×420) | rest → held → **peak (nodes pulled in)** → release → cooled | **DISTINCT but WEAKLY demonstrative** — node positions differ frame-to-frame (real samples, not copies) but the claimed "pulled in" contraction is not readable from stills; the perturbation is a mean-|v| (velocity) quantity the π numbers carry. The frames decorate the proof rather than demonstrate the claim. Acceptable; note for the protocol: velocity-domain claims need a displacement-overlay or trail render to be still-demonstrative. |
| `W-DOCK1` 3-condition series | onset timelines | **DEMONSTRATIVE numerically** — the full rAF timelines (29–110 samples per capture) are persisted INSIDE `.cache/gates/AY-dock-items-lag-capture.json`, condition×viewport×scheme; the PNGs are end-state anchors. The strongest evidence shape in the tranche. |

---

## §3 — Live gates: persisted GREEN against the REAL surface?

### 3a — Persisted RED at HEAD (the headline)

1. **`proof:dock-rail-cohesion` — persisted FAIL, stale vs landed source.**
   `.cache/gates/AY-dock-rail-cohesion.json` (Jun 9 16:40:38) is `status:"fail"`,
   `indicatorFalse:false`, violation: the rail TabsList lacks `:indicator="false"`. The fix
   IS in source (`src/components/custom/dock/DockLayerGroup.vue:221`, file mtime 16:40:38 —
   the same second the gate REDded) but the gate was **never re-run**: the persisted
   artefact contradicts both the PROGRESS W-DOCK2 claim "HG5 … LANDED" (`PROGRESS.md:71`)
   and the PASS transcript quoted in `W-DOCK2-DELTA.md:196-202`. Exactly the R6 class: a
   claim of GREEN with a persisted RED on disk. **Re-run + persist owed** (also the quoted
   `DockLayerGroup.vue:202` line-cite drifted; actual 221).
2. **`proof:dock-animation-live` — persisted FAIL; the only persisted run is the SYNTHETIC
   born-RED.** `.cache/gates/AX-dock-animation-live.json` (Jun 9 16:02) is `status:"fail"`
   with the 700.9ms entering-child violation — this is the W-DOCK2 HG1 live born-RED run
   against `tests-visual/fixtures/dock-entering-child-lag.html` (`W-DOCK2-DELTA.md:67-81`),
   NOT the real `/dock/overview` surface. **No GREEN on the real surface has ever been
   persisted for this gate** — B2-dock F2 confirmed OPEN at HEAD; W-DOCK2 RG2 (matrix dock
   §5.1) stands. (`AV-dock-animation-live.json`, Jun 8, is also FAIL — the pre-W-DOCK2
   4-violation freeze-era run; superseded but still the newest non-synthetic artefact.)

### 3b — GREEN persisted but NOT against the binding surface

3. **`proof:glass-cohesion` — source arm only.** `.cache/gates/AY-glass-cohesion.json`
   (PASS, 18 checks) self-declares "SOURCE arm only — the painted backdrop-filter blur …
   is proven by `tests-visual/glass-cohesion.spec.ts` (the π arm), **never this gate
   alone**". The π spec exists (`tests-visual/glass-cohesion.spec.ts`, real route via
   `PI_TARGETS.dock.path` at `:177`) and `W-GLASS-DELTA.md:118-119` claims "8/8 π GREEN" —
   but **no persisted artefact of the π run exists anywhere in `.cache/gates/`**, and the
   8 PNGs the DELTA enumerates (`W-GLASS-idle-tracks-*`, `W-GLASS-drawer-glass-*`,
   `W-GLASS-notification-floating-*`) **do not exist on disk** (0 `W-GLASS-*.png` files).
   The DELTA's "Verdict: PASS … live-verified" (`W-GLASS-DELTA.md:114`) overstates against
   its own hard gate — matrix glass §4.2 confirmed, deepened by the missing π artefact.

### 3c — GREEN persisted against the real surface (the clean set)

| gate | artefact | surface |
|---|---|---|
| `proof:aurora-arresting` | `AY-aurora-arresting.json` PASS | `/substrates/aurora`, real Metal GPU, bands hard-asserted |
| `proof:blob-warm-default` | `AY-blob-warm-default.json` PASS 2/2 | `/substrates/blob` π readback |
| `proof:blob3-strip` | `AY-blob3-strip.json` PASS | source + dts (structural; render-identity by construction) |
| `proof:blob-live-truth` | `AX-blob-live-truth.json` PASS 4/0 | real route π |
| `proof:constellation-{refit,egg,freeze}-live` | 3 × PASS | `/substrates/constellation` via demo-private seams (real surface, synthetic DRIVERS — acceptable) |
| `proof:constellation-warp-live` | `AX-constellation-warp-live.json` PASS 1/1 | real route |
| `proof:fourier-field-visibility-live` | `AY-fourier-field-visibility-live.json` PASS 2/2 | the REAL `/substrates/fourier-field` story (`tests-visual/fourier-field-visibility.spec.ts:9,43,128`) |
| `proof:dock-items-lag-capture` | `AY-dock-items-lag-capture.json` PASS, 12 captures + full timelines | `/dock/overview`, `data-testid="dock-capture"` |
| `proof:fourier-field-intensity`, `proof:blob-config-atoms`, `proof:aur2-residue`, `proof:ay-w0-reground` | 4 × PASS | source/static arms (correctly scoped) |
| `proof:live-verified-ledger` (AY) | `AY-live-verified-ledger.json` PASS | see §5 — GREEN but semantically blind |

Stale-note residue: the `AY-dock-items-lag-capture.json` `staggerBudget.note` quotes the
`layers.css:235` **0.55** fallback as "default"; the SHIPPED value is `shell.css:51` **0.4**
(reconciled in `W-DOCK2-DELTA.md:110-115`) — and at HEAD `src/styles/dock/layers.css:235`
STILL carries the 0.55 fallback literal (matrix RG5a open: a latent divergence if the shell
declaration is ever dropped).

### 3d — Persisted FAIL that is CORRECT (the born-RED backlog witness)

- `AX-live-verified-ledger.json` FAIL with 6 violations (W05/W08/W15/W16/W17/W23 owed AX
  DELTAs) — the W-DELTA0 backlog, accurately born-RED. W-DELTA0 is `planned`
  (`PROGRESS.md:54`); the RED is doing its job.

---

## §4 — A–G grades for the 9 `live-verified` PROGRESS rows (trends rubric §7)

| wave | A (capture proves claim) | E (mobile machine-checkable) | G (close-promise gated) | other | grade |
|---|---|---|---|---|---|
| W-DOCK1 | ✅ timelines persisted in-gate | ✅ 780×1688 | ⚠ stale 0.55 note in artefact | D: GlassDock.vue 624 BOOKED→W-GOD1 ✅ | **A−** |
| W-CON1 | ❌ 4 fabricated-mobile PNGs (engine π real) | ❌ the rubric-E exemplar | ❌ re-capture promised in-row, NO machine row forces it (R1 unbuilt) | honest RG annotation post-catch | **E-RELAPSE** |
| W-CON2 | ✅ π numbers binding; frames weakly demonstrative (§2) | ⚠ element dims plausible (314=390−76), not machine-checkable | ✅ egg/freeze gates wired (`package.json:652-653`) | mobile cool-err 13.1% > ±6% recorded openly, gate samples desktop | **B+** |
| W-CON3 | ✅ byte-identical determinism π | ✅ dims explained in-DELTA | ✅ | | **A** |
| W-AUR-PAINTERLY | ✅ bands persisted on real GPU | ⚠ no mobile arm; single 932×701 viewport < protocol floor; 6/18 PNGs byte-aliases | ❌ the T5 residual's named successor (W-AUR-WEBGPU-DECIDE) already CLOSED on the RETIRE branch — the oil/oil-pastel A/β residual now DANGLES with no live owner and no register row | honest DONE_WITH_MISSES framing | **B** |
| W-BLOB2 | ⚠ warm-default π real; mood frame series NON-demonstrative (§2) | ❌ 450px "mobile" element unverifiable | ❌ RG2/RG3 re-captures owed, unforced (W-BLOB3 records them still owed) | | **D / E-relapse** |
| W-BLOB3 | ✅ demonstrative series (viewed); strip gate persisted | ✅ 375×667 full-viewport | ✅ residue recorded; B: consumer-#2 BOOK-demo-only awaits the W-CARRY register (unbuilt) | | **A−** |
| W-DOCK3 | ✅ real `page.mouse.*` drag; readback table | ✅ 780×1688 | ⚠ no persisted artefact of the live drag spec itself (PNGs+DELTA carry it) | | **A−** |
| W-SLD1 | ✅ inverted gate + π; F: user decision EXPLICIT (PROMPT-CORPUS:51) — model rubric-F behaviour | ❌ no mobile arm; single declared viewport | ✅ | element-strip captures only | **B+** |

Non-visual rows sanity: W-MOTION / W-SLD2 / W-AUR2 / W-AUR-WEBGPU-DECIDE `dev-complete`/
`complete` with born-RED transcripts in their DELTAs — consistent. W-DOCK2 `live-pending`
is the honest state EXCEPT the HG5 "LANDED" sub-claim vs the persisted RED (§3a.1).

---

## §5 — Mechanism residue (what lets every §1–§4 gap recur)

1. **R1 dimension assert UNBUILT — confirmed at the insertion site.**
   `scripts/proof-live-verified-ledger.mjs:103-141` checks PNG magic + `>1024` bytes only
   (`isRealPng`, `ownSurfaceVerdict`) — no IHDR read, no viewport-token↔dimension compare.
   The gate ran GREEN (`AY-live-verified-ledger.json`, 19:46) over the four 1280×721
   "mobile" PNGs. The matrix R1 eight-line fix remains the single highest-leverage unbuilt
   mechanism in this lane's scope.
2. **The ≥2-viewport floor is entirely ungated.** The gate checks `-light.png` + `-dark.png`
   presence only (`:140-141`); W-SLD1 (one declared viewport) and W-AUR-PAINTERLY (932×701
   single canvas) pass untouched. R1's dimension read enables this clause for free.
3. **Allowlist curation breached ×6.** `VISUAL-ALLOWLIST.json` = `["W-DOCK1","W-CON1",
   "W-DOCK2","W-BLOB2"]`; the pixel-changing closes W-CON2, W-CON3, W-AUR-PAINTERLY,
   W-BLOB3, W-DOCK3, W-SLD1 never added themselves (`CAPTURE-PROTOCOL.md:36-37` "the
   curation is the contract"). Consequence: the deepened bar can never bind them, and
   nothing audits the curation itself (a one-clause gate arm: every `live-verified` row
   whose DELTA names a source-pixels edit must appear in the allowlist).
4. **Row-status blindness: two "live-verified" DELTAs at `planned`.** `W-FF2-DELTA.md:76`
   ("Status: live-verified", 4 real own-surface PNGs, persisted GREEN gates) and
   `W-GLASS-DELTA.md:114` ("Verdict: PASS … live-verified", ZERO PNGs, no persisted π
   artefact) both sit at `planned` in `PROGRESS.md:60,70`. The ledger gate only evaluates
   rows whose STATUS cell carries the token — a wave can hold an arbitrarily inflated
   on-disk DELTA invisibly. W-FF2's flip is owed-and-earned; W-GLASS's flip is owed-and-
   UNEARNED (capture run first). The finisher-settle restamp (matrix R7) plus a gate arm
   that scans `audit/visual/W*-DELTA.md` files for status claims exceeding their PROGRESS
   row would close the class.
5. **R6 GREEN-on-real-surface clause UNBUILT — two live instances** (§3a): the rail-
   cohesion stale RED and the dock-animation-live synthetic-only persisted run. Nothing
   machine-rejects "claim GREEN in prose, persist RED/synthetic on disk".
6. **The dangling T5 successor** (§4 W-AUR-PAINTERLY): the residual's routing target closed
   on the opposite branch; absent the W-CARRY register (matrix Class B/F mechanisms, both
   unbuilt) the oil/oil-pastel anisotropy/slope residual has no born-RED carrier.
