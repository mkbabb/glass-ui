# Q G-6 click-integrity correction C2

Date: 2026-07-22  
Disposition: formation-only correction to existing `R-COMPACT-HIT-FLOOR`; no new row, primitive, or product edit  
Independent critic: `DOCK-CLICK-INTEGRITY-RECEIVER-CRIT-C2.md`  
Critic SHA-256: `17cf6d90aca5e0d54999554a61cc5eb5ed0bd18f11a9878957b47451f253908d`

## Binding state law

At Glass source `da7415b58cb3591d75092bbcf1e2d20d53deab12`, `useDockClickIntegrity`
does not reject every action in the 840ms envelope:

1. at true rest, after live `data-morphing` and the deadline have both ended, pointer clicks pass;
2. when a witnessed `pointerdown` begins during live `data-morphing`, its later click is prevented
   even when the interactive ancestor and its icon/label lineage remain the same;
3. after live morph ends but before the 840ms deadline, a same-lineage action passes and a
   different-lineage action remains suppressed; and
4. an activation with no witnessed pointerdown passes, including keyboard/AT synthesis and the
   current click-only touch helper.

The guard is root-wide and origin-blind. It has no native/injected allowlist. The existing 35/35
narrow suites therefore prove useful branches, but do not exercise a genuine browser
`pointerdown → pointerup → click` phase/lineage matrix.

## Ownership correction

Glass owns the contradiction between immediate hit-test exposure and same-control suppression during
live morph. A valid producer cure either keeps not-yet-actionable content out of hit testing or accepts
one genuine same-control action once the target is exposed. It must preserve the original different-
target Home/Next/gear safety case.

Atlas owns approach-triggered readiness, portaled-descendant hold and focus return, phone sheet/filter
modal exclusivity, and the exact installed consume edge. Q adds no retry, synthetic forwarding,
fixed delay, private selector, or event shim. Programmatic `.click()` remains diagnostic only.

## Atomic close

Close binds one immutable source→dist→pack→install→served Glass artifact and an exactly pinned Atlas/
SCI receiver. It exercises live-morph, deadline-tail, and rest states with same/different targets;
fresh dynamic intended-versus-realized geometry at every event; coarse and fine pointer; keyboard and
AT; independent PRM; Chromium, Firefox, and actual Safari with VoiceOver. Required mutations restore
same-control live-morph suppression, remove the pointer witness, substitute `.click()`, change target
lineage, delete the cross-target guard, reuse stale geometry, contaminate animation restoration, break
portal hold/focus return, reintroduce dual phone modals, or substitute package bytes without changing
the labels. Each must fail for its named reason.

The compact 44px hit-envelope arm, collapsed hidden-zone reach arm, and click-integrity arm remain
separate detectors inside the same existing G-6 contract. No rectangle, stable paint, Playwright
WebKit run, or unsealed E23 log earns readiness, Safari, VoiceOver, package, or acceptance credit.

## Frozen E24 export-trigger sequencing deepening

Frozen Sol x-high authority `E24-UX-A11Y-CRIT-C2.md` (359 lines, SHA-256
`fb7940cee2ca712469aa654a235b84900ed14b5eeb4349ad2567a823dc4c3cab`) traces a fourth
sequencing case through the exact installed 7.0 receiver and rules it DEFECT / CONSUMER-MODEL
PARTIAL / PRODUCER-RED / ACCEPTANCE-RED:

- Atlas uses `DockTrigger(for=dropdown)`;
- installed `dock.js:1235-1237` forces `action:'pointerdown'`;
- installed `DropdownMenuTrigger` chunk
  `9e125d3511a4c173d9cf7fd45fa990a4bdac6cd45488461a91d5dae2ab2f51e6` calls
  `root.onOpenToggle()` during pointerdown;
- installed GlassDock click-integrity chunk
  `5780afd5aae1557583135748e1bf576a5ef3772983b2e055604b3b29cb0dcb7c` decides or
  suppresses only at the later click
  (`dock.js:587-600`).

Therefore a genuine press begun during `data-morphing` may open the export menu on pointerdown before
the click guard can act. The earlier live-morph/cross-target proof cannot receive safety credit for
this receiver. This deepens the same G-6 contract; it does not mint a primitive or Atlas cure.

The born-RED receiver arm begins pointerdown during morph on the actual export trigger and requires
the controlled menu to remain `open=false` for an unsafe lineage. True rest and no-pointer activation
remain GREEN, and the different-target race protection remains intact. No Atlas retry, delay,
forwarding, event shim, or new Q source ask is allowed. This is final formation authority for the
existing row only; it grants no compact 44px, repin, package, browser, or acceptance credit.

## Final E24 three-seat synthesis receipt

The binding Q board synthesis is `E24-TRIUMVIRATE-ADJUDICATION-C2.md` (192 lines, SHA-256
`6746149ca9c82a07d6ca3c21643cdaffacf016a19bec61acd1f7323ca698d549`), over independent Sol seats
`cfa01a0b…`, `3b3da5bd…`, and `1c71953c…`. Its verdict is MIXED implementation partial /
consumer-model RED / producer G6 RED / acceptance RED. It ratifies the U11 disposition above without
changing any producer contract or product byte:

- unsafe morph-time pointerdown on the actual export receiver leaves controlled `open=false` or an
  equivalent transaction that cannot expose the unsafe menu state before the later click decision;
- true-rest/no-pointer activation and different-target protection remain GREEN obligations;
- compact coarse ≥44px ownership remains an independent G6 arm; and
- Q/Atlas retains registry, lifecycle, portal/focus, phone and ARIA ownership with no retry, delay,
  forwarding, event, size or selector shim.

B6 remains OPEN/RED and B7 remains held. The synthesis mints no row, primitive, repin or additional
Glass ask.
