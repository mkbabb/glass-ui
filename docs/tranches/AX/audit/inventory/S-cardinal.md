# S-cardinal — the cardinal-lesson re-verify list (step-back inventory)

**Lane** S-cardinal · **Mode** read-only inventory / tranche-planning · **HEAD** `c72d2ac`
(3.8.0 + convergence-1 W44-W52 + convergence-2 W53-W59) · **Captured** 2026-06-08

> The AX cardinal lesson: a wave is `complete` ONLY when audited GREEN on the LIVE
> product — "complete" never collapses to headless-green. This lane inventories WHICH
> "complete" waves the live audits CONTRADICTED, WHICH remain suspect, and WHAT still
> needs a binding live re-audit before AX close.

---

## TL;DR — the soundness state

The cardinal lesson was **violated at the PROGRESS.md aggregation layer, twice over**:

1. **Round 1 (the headline, `A-session-soundness` S1/S3):** W09 + W05 were marked flat
   `complete` in PROGRESS while their own JSONs recorded `dev-complete-headless-green-
   live-pending` / "still bounces." The user's live pass re-discovered the un-run close
   criteria as "new" defects (D11 specular, D3 BouncyTabs). The individual wave JSONs were
   HONEST; the PROGRESS roll-up lied.

2. **Round 2 (this inventory's NEW finding):** the convergence-1/-2 waves
   (W45/W52/W53/W56/W57/W59) are now marked **`live-verified (DEVELOPED)`** in PROGRESS via
   commit-message claims of "playwright MCP" — but their underlying audit JSONs STILL say
   `dev-complete-headless-green-live-pending` / `handed-to-orchestrator`, and **no paired-π
   `DELTA.md` or screenshot artefact exists for any of them** (only W01 + W02 have a
   `DELTA.md`). The W00 binding close protocol (paired-π BEFORE/AFTER + DELTA, ≥3 viewports,
   ≥5 timing frames, contrast-measured) was NOT satisfied. The "live-verified" label is a
   thinner repeat of the same S1 inflation: a commit message is not a captured live audit.

**The blob (D4/D5/D7) and the carousel Apple-glass (P5) suspect-completes are still
UN-FIXED at source** — W46 and W42/W23b are `planned`, never started. The dock band re-opens
(DK1/DK7) DID land via W45, but their live verification is a frame-count gate, not a
frontend-design visual audit of the actual DK2/DK8 surfaces the user flagged.

---

## 1. The Round-1 cardinal contradictions (the headline — `A-session-soundness`)

### W09 — specular tune-to-subtle (the load-bearing soundness defect)

| Axis | State |
|---|---|
| PROGRESS (3.8.0) | `complete` |
| JSON `status` | `dev-complete-headless-green-live-pending` (`W09-specular-tune.json:4`) |
| Binding close | `liveVerifyHandoff.binding` (`:82-83`) — live π VISUAL-TRUTH audit; `orchestratorMustRun` (`:93`) the agent sandbox cannot run |
| Contradiction | D11 "specular egregious — thought fixed by W09" (screenshot 15.03.25) IS the finding from the live audit W09 closed WITHOUT running |
| Gate blindness | `proof:glass-material-unified` asserts ONLY `.glass-material::before` + the rim group; it NEVER parses `--glass-curvature-overlay` or the `ellipse at 30% 30%` corner radials → GREEN-for-what-it-measures, FALSE-for-what-the-user-saw |

**Source-confirmed surviving radials (`A-session-soundness` S2, all at HEAD):**
- `tokens.css:789-793` `--glass-curvature-overlay` = `radial-gradient(ellipse at 50% -20%,
  hsl(0 0% 100% / 0.06) …)` — **pure white L=100%**, the exact anti-pattern W09 fixed at
  `::before`. Defined THREE times (light `:789`, dead `-dark` orphan `:794` no consumer,
  byte-identical `.dark` override `:1698` unsoftened).
- `dock-controls.css:304` + `:330` — `ellipse at 30% 30%, --phase-color 18%` corner bloom on
  the dock's most-prominent control.
- `utilities.css:783` — `btn-audacious` hover `ellipse at 30% 30%, --primary 18%`.
- `glyph-face.css:47` — a fourth `ellipse at 30% 30%` D11 did not enumerate.

**Disposition:** routed to **W52** (the D19 liquid-glass overhaul ABSORBED the D11 radial
sweep — PROGRESS W09 row now reads "live-pending → D11 radials absorbed by W52 (developed)").
W52's JSON owns `--glass-curvature-overlay` re-tune (`laneScope.owned`). **BUT W52 itself is
`dev-complete-headless-green-live-pending`** (see §2) — so the D11 fix is shipped at source
but UN-LIVE-VERIFIED. `glyph-face.css` is now DELETED by W19 (glyph-face pruned), so that
fourth site is moot. The curvature-overlay dead `-dark` orphan + triple-definition collapse
should be confirmed in the W52/W33 sweep.

### W05 — one iOS-spring vocabulary (consciously-shipped jarring motion)

| Axis | State |
|---|---|
| PROGRESS (3.8.0) | `complete` (no carry-forward note) |
| JSON evidence | `:104` "BouncyToggle still bounces (PLAYFUL — overshoot survives the map)" — W05 KNEW and shipped anyway |
| Root cause | `BouncyToggle.vue:143-151` double-spring: `scale(1)→0.96@0.25→1.08@0.7→scale(1)` keyframe × `--spring-bouncy` easing over 200ms; `--scale-hover` (1.08) mis-recruited as the press rebound PEAK |
| Contradiction | D3 "BouncyTabs egregious/jarring" IS the un-run other half of W05's own VISUAL-TRUTH clause |

**Disposition — RESOLVED by W53 (the cleanest outcome).** W05's register-only scope was
correct (it excised the bezier); the SHAPE defect was out of its bounds. W53 (tabs-unify)
DELETED BouncyToggle entirely and shipped `SegmentedTabs.vue` whose `animatePress` (`:220`)
rides the CONTROL `--spring-snappy` register with the `1.08` bouncy keyframe RETIRED
(`:216-218` "former --spring-bouncy 1.08 keyframe is retired"), `--scale-press-btn` 0.97 single
overshoot, PRM-gated. **So D3 is fixed at source.** The residual risk: W53 itself is not
live-DELTA-verified (§2) — the new squish needs a live read to confirm it is no longer jarring.

---

## 2. The Round-2 contradiction (THIS inventory's NEW finding): the "live-verified (DEVELOPED)" relabel is the same inflation, thinner

PROGRESS marks SIX convergence waves **`live-verified (DEVELOPED)`**:
W45, W52, W53, W56, W57, W59. The label is asserted in their commit messages ("Live-verified
via playwright MCP …"). The reality at the artefact level:

| Wave | PROGRESS label | JSON `status` | DELTA.md? | Live evidence quality |
|---|---|---|---|---|
| W45 | live-verified (DEVELOPED) | `DEV-COMPLETE (headless self-gated; live π-lane visual-truth + timing TUNE owned by the orchestrator)` | **none** | commit cites `proof:dock-animation-live` frame-count (0ms onset) — a GATE, not a frontend-design audit of DK2 hover-state / DK8 rail-bg |
| W52 | live-verified (DEVELOPED) | `dev-complete-headless-green-live-pending` | **none** | commit "bloom gone, buttons glassy+smooth" — assertion, no paired-π capture |
| W53 | live-verified (DEVELOPED) | (no status field; `liveArmNotes` present) | **none** | commit "SegmentedTabs spring glide" — assertion |
| W56 | live-verified (DEVELOPED) | `dev-complete-headless-green-live-pending` | **none** | `cornerShape readback = orchestrator-driven` (the JSON itself says the live arm is owed) |
| W57 | live-verified (DEVELOPED) | `handed-to-orchestrator` | **none** | JSON `:99-100` "does NOT close on the SOURCE gate alone — the executed live chrome-devtools-mcp audit is the binding close criterion" |
| W59 | live-verified (DEVELOPED) | `dev-complete-headless-green-live-pending` | **none** | commit "integrated-cylinder + squircle-thumb" — assertion |

**The meta-finding:** PROGRESS again collapses `…live-pending` / `handed-to-orchestrator`
into a `(DEVELOPED) + live-verified` claim. This is the S1 pattern at one remove — the JSONs
remain honest (they record the binding live arm as owed), the PROGRESS roll-up over-states.
The ONLY waves that satisfy the W00 paired-π DELTA protocol are **W01 and W02** (`W01-DELTA.md`,
`W02-DELTA.md` exist). Every other "live-verified" wave asserts MCP verification in prose with
NO captured BEFORE/AFTER, NO screenshot under `audit/visual/`, NO ≥3-viewport / ≥5-frame /
contrast-measured record.

**Note on `orchestrator-mcp-live-pass2.md`:** a REAL orchestrator MCP pass exists but covers
ONLY P6 (`/primitives/pulse` radial, confirmed) and explicitly defers the dock-layers-lag DK7,
rail DK8, tabs T1, use-token-color P1, glass-material P9 reads to "when the research agents'
browser usage settles" (`:15-16`). So even the genuine live pass is partial and self-flags the
suspect surfaces as NOT-yet-read.

---

## 3. The suspect-complete inventory (the lane's core deliverable)

### 3a. W15 / W16 — blob (D4/D5/D7) — STILL LIVE-PENDING, fix NOT started

| Axis | State |
|---|---|
| PROGRESS | W15 `complete`, W16 `complete` |
| W15 JSON | `REDRESS dev-complete` — "the orchestrator's live Metal-GPU π-lane FAILED two of three assertions; re-derived … orchestrator re-runs proof:blob-render" (`:4`) — the re-derive is REASONED, not browser-run ("Could NOT run a real browser", `:21`) |
| W16 JSON | `GREEN` — but it touched NO geometry/lighting constant ("W16 touched NO length/geometry constant", `:8`); it owns integration/perf/README only |
| Contradiction | D4 "too skeuomorphic — lighting/shading must be toned down", D5 "hover effect totally broken + far too dramatic", D7 "blob-mood totally broken — none of the moods work" |
| Source state at HEAD | `types.ts`: `lit:true`, `iridescence:0.18`, `sssScale:0.2`, `coreGlow:0.1`, `rimStrength:0.5`, `pointerStrength:0.45` — the W15/W16 magnitudes the user reads as over-bright + lunging |
| Owner | **W46** (blob live-truth tune — floors→bands, lighting/hover DOWN, mood latch) — **`planned`, NO audit JSON, NOT STARTED** |

**This is the most-unresolved suspect-complete.** W15/W16 are `complete` at PROGRESS; W46 is
the convergence re-open that converts the gate FLOORS → BANDS (so "louder" stops passing),
tunes the lighting/pointer cohort DOWN to a calm wet bead, and generalizes `excitedHoldMs` →
a manual-mood latch (D7). It has a wave doc (`waves/AX.W46-blob-live-truth-tune.md`) but no
implementation and no audit. The blob is live-broken AND un-worked.

### 3b. W23 — carousel (P5 Apple-glassy) — PARTIAL: contrast fixed, Apple-liquid NOT reached

| Axis | State |
|---|---|
| PROGRESS | `complete` |
| What W23 FIXED | the BLOCKER: dark/light-invisible dots → `color-mix(in srgb, --foreground 52%)` (4.788 dark / 3.525 light, both ≥3:1), dead `scale-[var(--scale-hover)]` excised, real `[data-active]::before` elongation pip on `--spring-dock`, `.tap-squish` + `.focus-ring`. Solid dot rail. |
| What P5 wants (NOT reached) | the iOS-26 **liquid-pill** indicator (a single morphing glass body, NOT N discrete dots) + `.interactiveSpring` drag-follow (response 0.15s ζ 0.86) + elastic overscroll squish (`A-prune-carousel` §P5) |
| Owner | a W42 CONSUMER — recommended **W23b** (or W23 re-open), dependsOn **W42** + W52. Both `planned`. |
| Contradiction wrinkle (now RESOLVED) | W23 spent a fold glass-atomizing `custom/glass-carousel`; **W19 then DELETED that whole dir** (commit 509aed8, P4). The W23 `F5_carouselChromeGlassAtoms` effort is SUPERSEDED — `W23-carousel-indicator.json:53-54` should be annotated superseded-by-W19/P4 for documentation honesty (currently NOT annotated). |

**Net:** W23's defect-fix half is genuinely done; the P5 Apple-glass aesthetic upgrade is a
distinct un-started wave gated on the W42 substrate. PROGRESS `complete` is HONEST for the
contrast/affordance scope but the user's P5 "not Apple-glassy" stands until W42/W23b land.

### 3c. The dock band (W01-W04, W45) — re-opens LANDED via W45, live-audit is THIN

| Defect | Live-confirmed root cause | Owner per audit | Actually landed in | Source-verified at HEAD |
|---|---|---|---|---|
| DK1 collapse-icon fade-OUT (inverted summary stagger 1.0→0.0; pill arrives blank ~0.5s) | `A-dock-collapse-timing` — `dock.css:908-925` keys the INCOMING summary pane off the OUTGOING `--dock-expand-t` | "W01 re-open" (audit said W45 OUT of bounds) | **W45** (`#persistent` region front-loads the glyph + DK1 stagger narrowed 0.55→0.4) | yes — persistent region + stagger present |
| DK7 layer-switch lag (leaving-pane opacity = a SECOND fixed-duration CSS clock that ghosts past spring settle) | `A-dock-layers-anim` — `dock.css:805-810` + `:839-844` | "W01 re-open" (audit said W45 OUT of bounds) | **W45** (`dock.css:1013` `opacity: calc(1 - var(--dock-morph-t))`, the second clock DELETED) | yes — confirmed at `dock.css:1004-1013` |
| DK2 hover/select state "not right at all" | select/dropdown hover≡active both `--muted` | W45 (DK2 four-state mint) | W45 (`--dock-control-hover-bg` / `-active-bg`) | landed |
| DK8 rail bg mis-aligned + DK9 vertical-vs-rail identity | bare bordered gutter; TabsIndicator X-only pinned at top | W45 (DK8 rail plate + axis-aware indicator) | W45 | landed |

**Ownership note (a recorded plan divergence, not a bug):** the convergence-2 lanes
(`A-dock-collapse-timing`, `A-dock-layers-anim`) ROUTED DK1/DK7 to a **W01 re-open**, arguing
W45's FileBounds explicitly EXCLUDE the morph transition. W45 nonetheless absorbed both arms
(the `#persistent` front-load for DK1, the `calc(1 - --dock-morph-t)` for DK7). The pragmatic
outcome is fine (one wave, the fix landed), but **PROGRESS does not record that W01 was
effectively re-opened-and-closed-inside-W45** — and W01 is still flatly `complete`. The
W01-DELTA.md (which DOES exist) predates these DK arms, so W01's DELTA does not cover them.

**The thin-live-audit risk:** W45's "live-verified" rests on `proof:dock-animation-live`
(frame-count: 0ms onset, fade on the scalar). That gate proves the CLOCK is unified; it does
NOT prove DK2 hover reads "right" or DK8 rail aligns — those are frontend-design judgments the
W00 protocol mandates a captured visual audit for. No such capture exists. **DK2/DK8/DK4 are
GATE-GREEN but VISUAL-UNVERIFIED.**

### 3d. W17 — constellation — audit verdict "fine" (low risk)

`A-tranche-wave-audit:21` flags W17 as re-verify but parenthesizes "(constellation — fine)".
No user defect targets the constellation render. Lowest-priority of the suspect set; a
confirmatory live read at close suffices.

---

## 4. The binding live re-audit list (what MUST go GREEN-on-LIVE before AX close)

Ordered by severity / un-resolvedness:

1. **BLOB (W15/W16 → W46)** — un-started. Implement W46 (lighting/hover DOWN, gate
   floors→bands, mood latch for D7), then a paired-π DELTA on `/substrates/goo-blob` +
   `/substrates/blob-mood` (light/dark, hover-flick centroid, dome-luma BAND not floor).
   **The single largest open live-truth gap.**
2. **W52 liquid-glass (absorbs D11/W09)** — shipped at source, NEVER live-DELTA-verified.
   Paired-π on a speedtest-card / dock / glass-Card-over-aurora in light+dark: confirm the
   central bloom is gone AND the `--glass-curvature-overlay` corner radials read calm.
   Confirm the dead `-dark` orphan + triple-definition collapse.
3. **W53 SegmentedTabs (absorbs D3/W05)** — confirm the new `--spring-snappy` press squish is
   no longer jarring (D3), and verify T4 "two tab story pages flagged BROKEN" are now sound.
4. **W45 dock band (DK1/DK2/DK4/DK7/DK8)** — captured-visual audit of the HOVER/SELECT state
   (DK2) + RAIL alignment (DK8) + big-dock icon alignment (DK4), beyond the frame-count gate.
5. **W56 squircle / W59 slider / W57 demo-radial** — each JSON self-declares the live arm
   owed (`cornerShape readback orchestrator-driven`, `handed-to-orchestrator`). Capture the
   paired-π DELTA each names.
6. **W23/P5 (→ W42/W23b)** — un-started Apple-liquid-pill upgrade; gated on the W42 substrate.
7. **W17 constellation** — confirmatory live read only (low risk).

---

## 5. Gaps / plan divergences this lane surfaces

- **G1 — the PROGRESS-ledger discipline is STILL broken (the meta-gap).** `A-session-soundness`
  prescribed: a wave whose JSON status is not unconditionally `complete` MUST carry its
  qualifier into PROGRESS. The convergence waves relabel `…live-pending` → `live-verified
  (DEVELOPED)` via commit prose, re-breaking the discipline. **W33 (close) must reconcile the
  PROGRESS status column against each JSON `status` field + require a `DELTA.md` artefact for
  every "live-verified" claim** (only W01/W02 currently have one). This should be a CLOSE GATE,
  not a manual pass.
- **G2 — no `audit/visual/` capture discipline.** The W00 DELTA template mandates a screenshot
  + named-region baseline (3×). Zero screenshots exist in the AX tree. The "MCP live-verified"
  claims are unfalsifiable without the captures. A close gate should require the paired-π
  artefact set per visual wave.
- **G3 — W01 is `complete` but its DK1/DK7 arms landed in W45 unrecorded.** The dependency DAG
  reads W01 as a settled morph authority; in fact the morph-stagger DIRECTION (DK1) and the
  leaving-pane OPACITY CLOCK (DK7) were re-opened and fixed inside W45. PROGRESS should note
  the W01 morph-stagger was re-authored by W45 (or W01's DELTA extended) so the record is true.
- **G4 — W23's superseded `custom/glass-carousel` restyle is un-annotated.** W19 deleted the
  dir W23 had just glass-atomized; `W23-carousel-indicator.json` F5/postFix should be marked
  superseded-by-W19/P4 (documentation honesty per `A-prune-carousel` §"contradiction to record").
- **G5 — the blob suspect-complete has NO live re-diagnosis artefact.** W15's redress was
  REASONED ("Could NOT run a real browser"); W46 (the actual live tune) is un-started. The
  blob is the one suspect-complete with BOTH a `complete` PROGRESS row AND zero live-pixel
  confirmation AND an un-started owner wave.

---

## 6. The gestalt path forward (planning, NOT implementation)

1. **Make "live-verified" mean something — at the gate layer.** W33 mints a close gate
   (`proof:live-verified-ledger` or fold into the existing carry-closure gate) that, for every
   PROGRESS row tagged `complete`/`live-verified`, asserts (a) the JSON `status` is
   unconditionally complete OR a paired-π `DELTA.md` exists under `audit/`, and (b) the qualifier
   (live-pending / handed-to-orchestrator) is carried into the PROGRESS row if not. This
   structurally prevents the S1 inflation from recurring a third time. Born-RED against the
   current six relabeled waves.
2. **Execute W46 (blob) as the top live-truth priority** — it is the only suspect-complete with
   an un-started fix AND a live-broken surface. Floors→bands, lighting/pointer DOWN, mood latch;
   close on a captured paired-π DELTA over goo-blob + blob-mood (light/dark, hover centroid).
3. **Capture the owed paired-π DELTAs for the source-shipped-but-unverified waves**
   (W52, W53, W56, W57, W59, W45 visual axes) on the real device. These are NOT re-implementations
   — the source landed; the gap is the binding live audit each JSON already names as owed.
   One orchestrator MCP sweep over the named routes + a DELTA per wave discharges them.
4. **Land W42 (liquid-morph substrate) → W23b (carousel Apple-liquid-pill)** as the P5 path. P5
   is correctly a W42 consumer, not a per-component hack; it stays gated on the substrate. Do
   NOT fold P5 into W23's `complete` status — record it as the distinct W42-consumer upgrade.
5. **Reconcile the PROGRESS/JSON/W01 records at close** (G3/G4): note W45 absorbed the W01
   DK1/DK7 arms; annotate W23's superseded glass-carousel restyle; collapse the
   `--glass-curvature-overlay` dead `-dark` orphan + triple-definition in the W52/W33 sweep.

**Precept alignment:** every item is GESTALT (W46 re-derives the lighting cohort as bands, not
a magic-number nudge; the live-verified gate is a structural forcing function, not a manual
checklist), no-legacy (W23 superseded-restyle is deleted, not preserved), no-backwards-compat
(W53 clean-broke BouncyToggle), and token-first (the blob/glass magnitudes are tokenized
cohorts). The cardinal lesson is the governing precept: NONE of these waves close until a
captured live audit is GREEN.
