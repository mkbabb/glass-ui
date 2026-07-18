# REFABLE RU-28 — sheet interruptible enter/exit motion (redo)

- **Unit**: RU-28 SHEET-MOTION — the BI.W-SHEET-INTERRUPTIBLE-MOTION triumvirate (research → harden → wave-spec), its two-challenge gate, and the fresh confirm, retrospectively adjudicated against the shipped 7.0.0 sheet family.
- **Original edict**: cure the V6 FAIL-1 jump-to-open snap by converging the side sheet onto the interruptible spring — enter/exit/interrupt as one velocity-preserving machine, scrim synced to the same scalar, challenge gate + fresh confirm before commit.
- **modelId**: `claude-fable-5` (verified-model: this adjudication ran on claude-fable-5; every seat of the original unit — research `a12f1f40…`, harden `afbf58d0…`, wave-spec `ab1ff11e…`, both critics, and the fresh confirm `a5cb5750…` — ran `claude-opus-4-8` per the census, wf_c386b911-c1d).
- **ANEW scope**: the shipped sheet family at HEAD `117b7f12` — `src/components/dialog/{sheet-motion.ts, DialogContent.vue, ModalOverlay.vue, placement.css}`, `src/composables/motion/spring/{useSpringMount,useSpring,springPresets}.ts`, the four test files, `demo/stories/containers/sheet.vue` — judged against codex law 17 (continuity of state), law 7 (detent-sheet physics, the measured interrupt corpus `sr-0621-0128` §1-§4 + `sr-0622-2359` §3), and the liquid-weight universal. Focused suites re-run this seat: 4 files / 31 tests green.
- **Step-2 boundary moment**: ANEW closed on primary sources only — src, tests, demo, canon docs, and git history (commit `6950cfd4` message included; it is history, not a wave doc). The opus-era layer (`docs/tranches/BI/waves/BI.W-SHEET-INTERRUPTIBLE-MOTION.md`, `bi-addenda/reports/sheet-motion/{research,harden,c1-feature-r1,c2-gestalt-r1}.md`, the `wf_c386b911-c1d` EXEC-STATE journal entries, `V8b-sheet.md`, the repo DELTA doc) was opened only after — 2026-07-18, this session. Post-read disk checks ran solely to settle those docs' own pins (DRAWER_SNAP constants, DELTA path, demo springPreset census, test re-run).
- **Union**: sidecar only. No src/, band, or shipped-wave edits; corrections route as PROPOSED rows below.
- **Fences honored**: sibling repos untouched (read none), no browser (paint claims adjudicated against the V8b frozen traces, LIVE-DEFER where no trace exists).

## ANEW — the shipped surface judged blind

The machine, as read from source with the opus layer unread:

1. **Interrupt continuity is real at the mechanism level.** The side sheet's slide is an inline `translate` LONGHAND from `sheetSlideTransform(placement, p)` driven by `useSpringMount` → `useSpring` → `SpringProgress`; an open-flip re-seats the target on the live `(value, velocity)`. The `present` mount-hold releases on the COMPOSED condition `isSettled && position ≥ 1 && !open` — position, not target, and condition, not edge — which is exactly what survives both the close-tick stale-settled window and the edge-less PRM snap (`useSpringMount.ts:177-196`). Re-open-mid-exit stays mounted (`!open` in the guard). The FAIL-1 trace class is unit-pinned (`useSpringMount.test.ts:286` entrance-interrupt; `:269` re-open-mid-exit).
2. **Scrim law-conformance.** `scrimOpacity(p) = clamp(1−p)` reads the SAME live scalar as the surface — position-mapped material, scrub-reversible by construction (codex law 7(d)); clamped so overshoot never leaks past [0,1].
3. **Law 17 (continuity of state)**: motion state continuous through every interrupt; content rides the slab rigidly with no per-element entrance choreography (law 7(e) — the rigidity sells the weight); focus hands off to the trigger at the LOGICAL close; the closing surface is inert. Coherent.
4. **The open-edge overshoot** (default `smooth` ζ=0.8 → 1.52%, ~5.8px @384px) is a declared divergence from the measured edge-critically-damped arrival (law 7(b)) — the commit itself declares "overshoot unclamped per the liquid-weight law," and the test pins unclamped p. Deliberate, not accidental.
5. Blind-pass frictions found (carried to the verdict table as FABLE-NEW): the single-clock exit, the setup-frozen arming, the motion=off scrim incoherence, and the unwitnessed shipped paths.

## SCRUTINY — the opus layer, read assume-incorrect

The wave doc's load-bearing physics claims were re-derived, not trusted: the overshoot table recomputes exactly (`exp(−πζ/√(1−ζ²))` → 1.52% @ζ0.8, 3.15% @ζ0.74, 0% @ζ1.0; `DRAWER_SNAP = {0.32, 0.8}` confirmed at `drawer/constants.ts:11`). The provenance chain resolves end-to-end: V6 FAIL-1 (`bi-addenda/reports/visual-sweeps/V6-drawer-sheet.md`) → wave mint → implementation `6950cfd4` → c1/c2 CLEAN → 7-item repair delta (journal :861-865) → V8b discharge (`V8b-sheet.md`, 16/16) → repo DELTA doc committed `47c49f8b` → tag. One scrutiny hazard worth recording: this seat initially mis-read the DELTA doc as MISSING because a `grep|head` truncated at the W-CONFIG-IN-SHEET png rows — the file exists at the exact promised path. The near-false-positive is itself evidence for the assume-incorrect + re-verify discipline.

Where the docs and the tree disagree, the TREE is right and the DOCS still carry the defect — the wave doc presents its settle guard as "written exactly (not paraphrased)" and was never amended after both critics ruled that formula buggy.

## Verdict table

### OPUS-WRONG (correction stated)

| # | Claim | Correction |
|---|---|---|
| W1 | Wave §D1 (normative, "the two guards that carry the machine, written exactly"): settle branch `if (spring.isSettled && target.value >= 1 && !options.open.value) present.value = false` | Buggy as written: on close, `target` flips to 1 synchronously while `isSettled` is still the stale at-rest `true` — the guard passes for one tick and unmounts BEFORE the exit paints, re-introducing the instant-vanish the wave exists to kill. Shipped code gates on the spring POSITION (`spring.value.value >= 1`, `useSpringMount.ts:188-196`). c1 D-B caught it ("a real bug in the wave formula"); c2 re-derived it independently; the wave doc §D1 was never amended and still presents the defective formula as the verbatim load-bearing contract. |
| W2 | Wave §D9 + harden.md:345: PRM close path — "`isSettled` fires → settle branch clears `present` → unmount" (an edge-fired model; the §Work unit notes prescribe edge-timing workarounds) | Under PRM there IS no `isSettled` edge — the snap keeps it `true` across the target flip. An edge-fired branch never fires; PRM unmount would hang. Shipped code watches the composed condition precisely because of this (source comment names it; PRM unit pins `present→false`). Same never-amended status as W1 — the two errors compound: an implementer following §D1+§D9 literally ships a double-broken machine. |
| W3 | Wave §Work manifest (ModalOverlay row): "gate opacity against `stage` per D5" | Contradicts D5's own ruling, which is the opposite: stacking "acceptable this wave; recorded as native debt," gate ONLY IF the sweep reads it wrong. Shipped follows the D5 prose (no gate; V8b item 4 left it honest debt). A manifest instruction that inverts its cited ruling is a live trap for any literal re-implementation. |

### FABLE-NEW (absent from the opus layer)

| # | Finding |
|---|---|
| N1 | **Single-clock exit — the dismiss-asymmetry question was never asked.** The retired CSS grammar encoded direction asymmetry (`sheet-animate`: open `--duration-panel`, close `--duration-fast` — "dismiss feels snappy," btn.css:82) and the measured corpus agrees (flick-dismiss ~250ms ballistic vs patient presents, `sr-0622-2359` §3). The spring fold flattened both directions onto ONE `smooth` clock (response 0.58): the exit is now as patient as the enter. Research, harden, both critics, and V8b all judged the enter overshoot; none engaged exit pacing. Design-debt, not defect — the exit reads acceptable because p>0.9 is near-offscreen — but it is an unexamined flattening of both the library's own prior grammar and the reference physics. |
| N2 | **Setup-frozen arming.** `springMount` and its preset are captured once at setup (`DialogContent.vue:313-318`; preset row resolved at construction in `useSpringMount.ts:110`). A reactively-bound `springPreset` (a configurator knob) silently no-ops until remount; a placement flip center↔side leaves the gate stale. The constraint is real and even bit the V8b sweep itself ("the setup-time `springActive.value` gate precludes a runtime retrofit" — item 7), yet it is documented nowhere on the public prop surface. Companion micro-waste (c1 N4, still true at HEAD): an `off` side sheet constructs and integrates a spring nothing reads. |
| N3 | **`motion="off"` scrim incoherence.** An off side sheet snaps its surface (no mount-hold, instant Presence unmount) while its scrim KEEPS the clocked `sheet-animate` fade (`slideT` null → keyframe, ~`--duration-fast`×tempo). §D9 records the routing ("scrim keeps sheet-animate") without ever judging the incoherence: motion off should silence both channels. Low severity; visible as a ghost-fade after an instant dismiss. |
| N4 | **Unwitnessed shipped surfaces carried into the tag.** Three V8b PENDING-HONEST rows were published as-is and remain unconverted at HEAD: (a) the R2 center spring-exit + center `closingInert` paint NOWHERE — no demo story arms a center `springPreset` (re-censused this seat: zero hits), and the demo-coverage knob queued behind Q041 (journal :906-908) never landed; (b) `motion="off"` sheet likewise demo-unreachable; (c) Safari — zero WebKit verification of the whole machine. Plus the D5 stage-stacking debt (a `stage!=none` side sheet) has no probe. R2 is public API (`springPreset` is a public prop), so (a) is a latent-but-reachable consumer path shipped with no paint witness anywhere. |

### RATIFIED (verified at HEAD this seat)

| # | Claim | Witness |
|---|---|---|
| R-a | The FAIL-1 cure mechanism: keyframe-slide deleted, spring-owned translate longhand, velocity-preserving re-target, `present` mount-hold, re-open-mid-exit held | Source read + 4 files/31 tests re-run green this seat + V8b 16/16 matrix (maxΔp 0.037 vs RED Δp 0.49), frozen witnesses v8b-sheet-01/02 |
| R-b | R1 longhand ruling — `translateX()` as a `translate` value paints nothing; longhand pairs shipped | `sheet-motion.ts:17-28`; test's NOT-translateX guard; V8b parsed live percentages off the longhand |
| R-c | Scrim single-scalar sync, clamped | `scrimOpacity` + `ModalOverlay.vue:89-91`; V8b scrimSyncMaxErr = 0 every frame, same-frame unmount |
| R-d | R3/R4 preset ruling — `smooth` stands, overshoot unclamped; table math exact | Recomputed ζ-overshoot identities; `DRAWER_SNAP {0.32, 0.8}` at `drawer/constants.ts:11`; the boundary ruling is on record (journal :860-862 — codex is reference-not-canon, liquid-weight is USER LAW) and V8b arm C judged 1.516% liquid in paint. The law-7(b) tension is ADJUDICATED, not latent — no reopen proposed. |
| R-e | R2 center unification wiring (forceMount + closingInert + scale/opacity exit on the center-spring path) | `DialogContent.vue:362-374`; V8b G1 regression floor GREEN — but see N4(a) for the missing paint witness |
| R-f | The challenge gate ran and bit: c1 CLEAN (caught the wave's guard bug D-B + extraction D-A + N1-N4), c2 CLEAN (independent SpringProgress-internals spot-check of the same guard; 2 shouldFix) | Both files on disk under `bi-addenda/reports/sheet-motion/`; zero mustFix |
| R-g | The 7-item repair delta + fresh confirm landed materially: center inert symmetry (N1), spy-witnessed preset routing (N2), entrance-interrupt unit (N3), placement.css:28 prose, SpringProgress lineage wording, MIGRATION ×3, slideT typecheck | Each verified present at HEAD; confirm seat exists in the census (`a5cb5750…`); no standalone confirm doc, but the repairs-on-disk are the material witness |
| R-h | §π/DELTA was not empty ceremony: the debt ledger was FILED at the promised path and DISCHARGED pre-tag with honest PENDING-HONEST rows | `docs/tranches/BI/audit/visual/W-SHEET-INTERRUPTIBLE-MOTION-DELTA.md` (committed `47c49f8b`, pre-7.0.0) |
| R-i | Consumer exposure zero at ship (census claim) | Consistent with the R2-unreachable finding and MIGRATION's no-break stance; not re-censused against siblings this seat (read-only fence, low stakes) |
| R-j | Codex law 17 + law 7(d)/(e) conformance of the shipped machine | ANEW §1-§3 |
| R-k | Model-split truth: the unit's "Fable thinks" declarations ran on opus end-to-end | `model-census.json`: 6/6 wf_c386b911-c1d seats `claude-opus-4-8` — the REFABLE premise, confirmed for this unit. Notably, the opus-run challenge ring still caught the wave's own formula bug: the process held even where the model declaration did not. |

## ROUTING (PROPOSE only)

| route | row |
|---|---|
| BJ design-debt (motion band / sheet family) | **SHEET-EXIT-CLOCK**: adjudicate direction-asymmetric dismiss — a brisker exit register (snappy-class response or a per-direction preset seam in `useSpringMount`) vs the shipped single `smooth` clock; ground in `sr-0622-2359` §3 (flick-dismiss ~250ms) + the retired panel/fast asymmetry. Deliberate ruling either way; N1. |
| BJ defect row (low) | **SPRING-ARM-FROZEN**: `springPreset`/`placement` are setup-frozen on a public prop surface — either document static-per-instance at the prop or make the arming/preset reactive; kill the dead spring on `off` side sheets while there. N2 + c1 N4. |
| BJ design-debt (low) | **OFF-SCRIM-COHERENCE**: `motion="off"` side sheet should silence the scrim's `sheet-animate` clock along with the surface (drop the keyframe when resolved-off, mirroring `slideT`'s live-path drop). N3. |
| BJ coverage row | **SHEET-PAINT-HOLES**: arm a center-`springPreset` demo story + a `motion="off"` sheet story (converts V8b items 6/7 PENDING-HONEST — the queued-behind-Q041 knob that never landed); add a `stage!=none` side-sheet stacking probe (D5 debt); schedule the Safari pass. N4. |
| BJ doc-hygiene row | **WAVE-DOC-TRUE-UP**: amend `BI.W-SHEET-INTERRUPTIBLE-MOTION.md` §D1/§D9 + the §Work ModalOverlay manifest line (or stamp SUPERSEDED-BY-SRC): the "verbatim load-bearing" guard is the shipped code's inverse (W1/W2) and the manifest inverts D5's stacking ruling (W3). The doc is the normative record a future re-implementation would follow into a double-broken machine. |

## Bottom line

The shipped sheet motion is RATIFIED at the mechanism level — the strongest artifact this unit produced is in the tree, not the docs: the implementer (and the challenge ring) corrected the normative contract's genuinely broken settle guard, and the V8b discharge is honest, numeric, and pre-tag. The opus layer's failures are documentary (a never-amended wrong formula presented as verbatim canon, a manifest line inverting its own ruling) plus four blind spots no seat engaged: exit pacing, frozen arming, off-scrim coherence, and the three PENDING-HONEST paint holes that rode into 7.0.0. Nothing here reopens the boundary ruling on overshoot — that call was made with the right precedence and re-judged in paint.

verified-model: claude-fable-5
