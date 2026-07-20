# REFABLE-RU-29 — VSWEEP redo (the V1-V8b visual judgment sweeps)

- **Unit:** RU-29 (P2). Members redone: `a665a58f40a8b9c28` (V1), `aa083f4dad82124e2` (V2),
  `a55f2755e8c768e11` (V3), `a271176f8e2d6810d` (V4), `ad8141f397cea16e6` (V5),
  `a8e9434e4cfc0e851` + `ac4d8216520eb97a1` (V6), `a72cf955ba9632ead` (V7),
  `a57ece1cf10f6724e` (V8a), `a81ecaff68a54a53b` (V8b). Artifacts: the nine session-journal
  reports at `~/.claude/projects/-Users-mkbabb-Programming-glass-ui/bi-addenda/reports/visual-sweeps/V*.md`
  (+ their `artifacts/` captures, which stay valid as instrument evidence per the charter ruling).
- **Edicts (verbatim intent, recovered from each transcript's first message only):** V1 type/zoom
  (P019 1/√φ pair + P122 chassis, 1440/390/320/400%, both schemes); V2 procedural (P046 aurora
  engine/pointer/PRM/park + P047 blob DPR footprint); V3 marks+rim (P075/P093 domain model,
  RTL/inverted/vertical, boundaries, ScrollProgressRim); V4 ribbon/springs/clipboard; V5 dock
  matrix + interaction axis + GU-4; V6 drawer/sheet + the V5-8g flip rider; V7 tabs one-fill +
  Q010 table topology + Q020/Q024; V8a the eight unprovables (P017/P018/P020/P021/P022/P042/
  P029/P107); V8b sheet-interruption FAIL-1 red→green + overshoot + scrim sync.
- **Verified model:** `claude-fable-5` (system-context line read verbatim: "The exact model ID is
  claude-fable-5").
- **Step-2 boundary:** 2026-07-20 — the ANEW pass (A1-A9 below) ran against current committed
  HEAD (`e75b493f`, src/demo clean vs HEAD) with all nine reports UNREAD; only each seat's opening
  edict was extracted first. The reports were then read assume-incorrect and every checkable claim
  re-proven by targeted probe or replicated figure.
- **Instrument:** Chrome via chrome-devtools MCP, dev server `127.0.0.1:5199` (vite), 1440×900 +
  emulated 768/390/320, host dark (localStorage `auto` → OS dark; light arms via colorScheme
  emulation), live WebGPU (`WebGPU · apple · metal-3`). Browser-seat singleton honored — sole
  browser seat. No `getContext` ever issued on a live canvas (context-steal law). WebKit arms:
  none claimed (no driver) — every backdrop/blur judgment here is Chrome-only, matching the
  sweeps' own scope.
- **Captures** (session scratchpad, cited by path, never in the repo):
  `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/e79fce3f-d24e-4654-8b27-d029653fedbe/scratchpad/ru29/`
  — A1-typography-{1440-light,320-light,320-dark}.png, A1-chassis-{1440-light,390-light}.png,
  A2-aurora-{boot,stage-baseline,after-strokes,resume,prm}.png, A2-blob-{dpr1,dpr2}.png,
  A3-progress-rim-section.png, A3-slider-marks.png, A4-ribbon-firstpaint.png,
  A4-springs-{fullpage,authoring}.png, A5-dock-{layers,overflow,390-safeinset}.png,
  S2-aurora-webgl2-replication.png. Numeric traces inline below.

## The ANEW layer (current HEAD, reports unread)

1. **A1 (V1):** kicker/headline ratio at 1440/768/390/320 = 0.7861505…/0.7861502…/0.7861516…
   (fs+lh both), max Δ 0.00005 CSS px vs 1/√φ — five orders inside the 0.5px tolerance; no
   overflow at 320; serif/mono family split live. Chassis: 7 instances, 0 `data-phase`/`data-variant`,
   0 nested landmarks, no overflow at 390; grid ratios 750.3/463.7=1.618 and 809.3/404.7=2.000.
2. **A2 (V2):** aurora stage paints (buffer 1077×712 @ CSS 718×475), 5 forward/reverse stroke
   pairs + 2 rapid reverse pairs recompose the field — no black slab ever (Q003/V-A95 class not
   reproduced); park/resume returns the painted composition; PRM shim keeps the canvas armed;
   console 0 errors. Blob CSS footprint 768×768 invariant at DPR 1 and 2, buffer exactly ×DPR
   (768/1536).
3. **A3 (V3):** progress marks land at exact domain fractions (20/40/60/80 → .2/.4/.6/.8; max=1
   domain exact; RTL x-mirrored .75/.5/.25; vertical y-transposed .75/.5/.25); slider mark mirror
   laws pairwise exact (0.14↔0.86 etc, sums 1.000) across RTL/inverted/vertical; keyboard End→100
   then ArrowRight holds (no overshoot); rim value→fill exact on all 11 instances (0/50/100%,
   segments 2.07/4).
4. **A4 (V4):** both ribbons expanded at first probe (opacity 1, transform none, 182×86); springs
   custom authoring reseats live (ζ 0.86→0.2 recomputes overshoot 0.0%→52.6% + new stops); copy
   flips aria-label to "Copied" and clears back.
5. **A5 (V5 + V6 rider):** manual dock hover-suppression holds (102→112px is the pill hover
   affordance; posture stays collapsed); reducer reaches both poles (102↔221); the compressed
   in-page flip trace (11 samples over 5.5s) shows NO ghost collapse after flip-to-manual while
   expanded; flip to auto preserves the pole; focus-visible focus on the 56px overview dock
   expands to 221; layers/overflow stories: crowded dock scrolls internally (530>328) with no page
   h-scroll; 390 safe-inset: dock 374px, 12px bottom gutter, no overflow.
6. **A6 (V6 + V8b headline):** sheet interrupt-mid-enter at p=0.416 → smooth deceleration to a
   bounded apex p=0.320 (excursion 0.096), fluid reversal, exit settles ~100%; max post-interrupt
   frame step ≤0.039; whole-trace max 19px (the V6 red was ~339px in one frame). Rapid
   open-close-open: terminal open, 1 dialog, no doubles; after full settle 0 dialogs, 0 scrims,
   page content hittable where the sheet was, focus restored to the trigger; wheel inside the open
   sheet leaves the page scroller at 0 (body scroll locked). Drawer: opens, Escape closes,
   unmounts, focus restores. Settle overshoot observed in flight at translate −1.47% (the ~1.5%
   class).
7. **A7 (V7):** every lens-bearing group has exactly ONE childless `.glass-lens` hugging the
   selected tab at 0.0px; long-jump morph glides (travel 236px, max frame step 13.8px, no
   teleport), final hug 0.0/0.0; RTL after a selection change re-hugs 0.0/0.0/0.0. Table:
   thead/tbody topology, 5 columnheaders; data-table 8 rows semantic.
8. **A8 (V8a spot):** P029 tempo co-scale — panel 0.308s→0.572s, scrim 0.385s→0.715s at
   tempo 0.7→1.3, both exactly ×13/7 (scrim not pinned); P107 — detented drawer carries
   handle+grip, fixed drawer zero drag affordance; P018 — naive concentricity probe found no
   qualifying corner-nested violations (thin; V8a's corner-filtered method is the stronger probe
   and its invariant re-verified via the ladder reads below).
9. **A9 (scrutiny re-proofs):** springs preset overshoot table byte-identical at HEAD
   (smooth 0.0 / snappy 3.2 / bouncy 9.5 / gentle 0.0 / press 0.0 / transient 0.0 — all ∈[0,10]);
   V2's WebGL2 arm replicated via `navigator.gpu` deletion (badge `WebGL 2 · ANGLE Metal
   (Apple M5 Max)`, `data-aurora-substrate="webgl"`, identical 1077×712 footprint); glass tier
   ladder at HEAD monotonic (blur 1/7/7/11/17, alpha .454→.965 dark); shadow blur ladder monotonic
   (8<16<20<24<50); `springPreset` still unarmed on any demo DialogContent (V8b G2 gap persists).

## Verdict table

### OPUS-WRONG (1 — minor, method-scope, no verdict impact)

| # | claim | correction |
|---|---|---|
| W1 | V1/V4/V5/V8a state as a general fact that the demo "ignores OS `prefers-color-scheme`" (theme only via `vueuse-color-scheme` localStorage) | Imprecise as stated: with the default `auto` value the demo FOLLOWS the media query — emulating `colorScheme: dark` flips `.dark` live (observed A1). The claim is true only once an explicit stored value exists, which their sessions had; their scheme arms remain valid. Correction is to the generalization, not to any verdict. |

### RATIFIED (the nine reports, ~95 verdict rows)

| batch | rows | second-instrument proof |
|---|---|---|
| V1 | 16 PASS + 1 PENDING-HONEST | Ratio figures replicate byte-identically (53.28/41.8861, Δ0.000045px; floor 32.928/25.8864, Δ0.0000074px; 500px incidental 35/Δ0.0000018 — all three matched to the last digit). Chassis 1.618/2.000 grid ratios re-measured at HEAD to a tenth of a px. The 400%-zoom PENDING-HONEST + 360px-reflow-equivalence reasoning is sound and stands. |
| V2 | 14 PASS + 2 PENDING | Aurora stage/buffer figures byte-identical (718×475/1077×712); strokes/park-resume/PRM replicated; Q003 not reproduced here either (4th independent non-reproduction, with RU-20). Blob 768×768/×DPR replicated exactly. The navigator.gpu-delete WebGL2 method re-executed at HEAD: real WebGL2 render, identical footprint — their equivalence claim twice-instrumented. Forced-failure PENDING honest (no knob — re-confirmed via renderMode.ts read). |
| V3 | 27 PASS + 1 PENDING-HONEST | Mark fractions byte-matching on both components (incl. the .86/.63/.32/.11 mirror set); keyboard boundary hold replicated; rim value→fill law replicated on all 11 instances; the "no scroll-bound rim host" PENDING re-verified — the component is pure value-driven at HEAD (`ScrollProgressRim.vue` props read). |
| V4 | 24 PASS + 3 PENDING-HONEST | Ribbon first-paint 182×86 replicated exactly; preset overshoot table replicated byte-identically at HEAD despite the story's redesign into Spring Orchestrator; reseat + copy feedback cycle replicated; clipboard-failure PENDINGs honest (no CDP permission denial). |
| V5 | 16 PASS + 1 PENDING-HONEST | Manual-mode suppression figures byte-identical (102→112 hover pill scale); both poles 102/221 replicated; focus-expand 56→221 replicated under focus-visible; overflow scroller (530>328 then, 1082>672 now — story crowd grew) still page-clean; 390 safe-inset gutter present; the 8g PENDING was honest (story hardcoded manual then) and its later closure is independently re-proven here (A5 trace). Idle delay ~3600ms corroborated behaviorally. |
| V6 | 14 PASS + FAIL-1 + 1 PENDING | The rider's 3 flip arms replicated in one compressed trace; their 5.4s-MCP-latency-vs-3600ms-idle method note is confirmed lived experience (my first naive run reproduced exactly that artifact — the collapse that fired was the legitimate auto idle-collapse landing during tool latency). FAIL-1 stands as the born-red witness; its red signature (Δp≈0.49 one-frame snap) is dead at HEAD (A6). Drawer/sheet arms replicated (interruption, ghost-hit, scroll-lock, Escape, focus restore). |
| V7 | 22 PASS + 1 PENDING-HONEST | One-fill law replicated (1 childless lens, 0.0px hug, LTR + RTL-after-selection); morph glide no-teleport replicated; table/data-table topology replicated; curve-gallery/springs route pair unchanged at HEAD (Spring Orchestrator + Motion Lab). Stretch-cap row: see N2 — their 1.11 measurement real, the universal phrasing overstates. |
| V8a | 8 PASS rows + honest PENDINGs | P029 co-scale table replicated BYTE-IDENTICALLY (0.308/0.572, 0.385/0.715, ×1.857); P107 grip/fixed-no-affordance replicated; P017/P018 ladder invariants re-verified at HEAD (constants drifted, order preserved — N3); P021 no-overflow-at-390 consistent with every 390 probe this seat ran; P022 mode-matrix PENDING remains the true instrument state. |
| V8b | 10 PASS arms + 3 PENDING-HONEST | Arm A replicated at HEAD on this instrument: same cure class (bounded excursion, ≤0.039 post-interrupt steps, momentum carry, clean unmount). Arm C's ~1.5% settle corroborated independently (translate −1.47% caught in flight). G2's "R2 observable nowhere" re-verified by grep at HEAD (still unarmed). F′/J PENDINGs remain honest. |

### FABLE-NEW

| # | finding | routing |
|---|---|---|
| N1 | **Dock controls story posture-display staleness:** the consumer "Posture is:" readout tracks only its own reducer — an auto-mode idle collapse paints the pill collapsed while the text still says "expanded" (observed live). Misleading exactly in the window the story invites you to watch. | Demo/story polish note — BJ story band (dock controls story): subscribe the readout to the FSM state, or label it "last reducer intent". |
| N2 | **The lens stretch cap binds the spring target, not every painted frame:** all groups carry `--tab-indicator-max-stretch: 1.11`, but a shorter jump painted a transient 1.128 (88.8/78.7) — ~1.6% width-channel spring overshoot past the cap. V7's "bounded exactly at 1.11" held for their long jump; it is not a per-frame paint ceiling. | Numeric nuance for any future indicator gate: assert cap+ε or assert the target, not the per-frame max. |
| N3 | **Era-drift in material constants, invariants preserved:** glass tier blur ladder 1/8/8/13/20 (sweep era) → 1/7/7/11/17 (HEAD); shadow blur ladder re-tuned. Monotonic ordering — the actual P017/P018 law — holds in both eras. The sweeps' figures are era-true; any gate distilled from them must pin the ORDER, not the constants. | BAND-GATES / BAND-MATERIAL note; also the standing reason V-sweep figures must never be copy-pinned into gates. |
| N4 | **Surface reshapes since the sweeps** (all verdict-neutral, enumerations only): springs story → Spring Orchestrator + custom authoring; drawer story → 3 triggers (drawer/fixed/instrument-sheet); data-table story no longer exposes selection/virtual arms in place (virtual-section is its own story); sheet placements unchanged (4 sides). V6/V7's era enumerations no longer describe HEAD. | Ledger note (surface truth): conflicts routed here, no band file edited by this seat. |
| N5 | **G2 latent-unification gap persists into BJ:** no demo (or consumer) story arms `springPreset` on a center DialogContent at HEAD — the R2 center spring-exit + closingInert remain observable nowhere. V8b flagged it; still true. | BJ demo-coverage/story band: either arm one center dialog with springPreset or strike the latent branch per the no-masking-fallback edict. |
| N6 | **ScrollProgressRim scroll-binding still has no exemplar:** the component is pure value-driven at HEAD; no scroll-bound host story exists. V3's PENDING is a standing coverage gap, not a closed item. | BJ story band, same class as N5. |
| N7 | **The V2 WebGL2 method is the canonical honest engine arm:** navigator.gpu deletion via initScript reaches the real shipped WebGL2 net (re-proven at HEAD, ANGLE Metal badge + identical footprint). Superior to a PENDING; should be the standing recipe for dual-engine acceptance arms. | Method note for BAND-GATES / future procedural acceptance runs. |

## Disposition

- **All nine sweeps are sound.** ~95 verdict rows scrutinized; zero material errors. Every
  replicated figure matched — many byte-identically (type ratios, 182×86 ribbon, 102→112 pill,
  0.308/0.572+0.385/0.715 tempo pairs, the overshoot table, mark fractions, blob footprints,
  aurora buffers). The one OPUS-WRONG is a scope-imprecise generalization about theme resolution
  that affected no verdict. PENDING-HONEST discipline was genuinely honored throughout — every
  PENDING re-checked here was either still-true (G2, rim host, forced-colors, Safari) or since
  closed by a real affordance and re-proven (V5-8g flip).
- **The 7.0.0 visual acceptance these sweeps carried is re-affirmed at current HEAD** on the
  surfaces that still exist, including the two headline motion cures (sheet FAIL-1 red→green,
  dock flip-watch) — both now twice-instrumented. The known-defect classes the census row names
  (V-A95, chip-CSS) were NOT passed by these sweeps: V-A95's subject (Q003 slab) was actively
  probed and honestly not reproduced (four independent non-reproductions now, consistent with the
  context-steal-artifact disposition), and chip CSS was never in the V1-V8b scope — RU-20 owns
  that thread. No re-opened ruling results from this unit.
- **Routings:** N1/N5/N6 → the BJ story/demo-coverage band via the ledger; N2/N3/N7 → gate-method
  notes (BAND-GATES); N4 → LEAD-AMENDMENT-LEDGER surface-truth note. No band file edited by this
  seat (charter: conflicts to the ledger).
