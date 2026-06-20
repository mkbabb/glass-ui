# BD.W-KF-DRAGSNAP-CONSUME

## (1) Band + goal

**Band 8 — Cross-repo asks + republish-gated consumes (foreign-tree fenced). BOOKED — kf republish-gated.**

On a keyframes.js republish exposing `snap`/`bounds`/`rubberBand` on the PUBLISHED `DragOptions` (not just the local sibling), collapse the ~12-line `commitSnapOnRelease` re-roll in `useDragMorph` onto the native kf `snap` option AND gain the iOS `rubberBand` overscroll for free (pull the END tab PAST the end → it stretches, then snaps back). Until that republish fires, the published-surface interim (`reset` + `decayRest` + `spring.target`) STAYS — it works on `4.3.0` today; the pull + the fling-to-nearest already function, the `rubberBand` overscroll is the deferred-polish leg. glass-ui edits ZERO kf tree (inv-26); the in-repo half is this glass-ui wave, the kf republish is kf's own.

## (2) Starting state — the exact on-disk reality

- **The published `DragOptions` does NOT expose `snap`/`bounds`/`rubberBand` (machine-verified, this read).** `node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts:1530-1560` — the `DragOptions` interface carries ONLY `axis`/`transform`/`spring`/`springOptions`/`velocityWindow`. No `snap`, no `bounds`, no `rubberBand` on the type. The kf installed version is `4.3.0`. The kf SOURCE `Draggable` carries `snap` + `rubberBand` (it projects `decayRest` + re-targets the nearest declared target, and a `rubberBand` overscroll register), but the PUBLISHED dist surface does not — so consuming `snap` today is forbidden.
- **The CONSUME marker is live over a working re-roll (VERIFIED).** `src/composables/motion/useDragMorph.ts:281-300` — `// CONSUME(kf snap): BC.W-LIQUID-TAB — when keyframes.js republishes past 4.3.0 with the snap+bounds+rubberBand DragOptions (booked by name … machine-verified ABSENT on the published 4.3.0 DragOptions), the ~12-line published-surface decayRest+nearestTarget+spring.target re-roll BELOW collapses onto the native kf snap option AND the pull gains the iOS rubberBand overscroll for free. A cheap by-name kf ask — NO peer-spine widen (glass-ui's spine is ^4.0.0); glass-ui edits ZERO kf tree (the foreign-tree fence, inv-26)."
- **The working re-roll is `commitSnapOnRelease` (VERIFIED, the interim).** `useDragMorph.ts:301-311` — `const DECAY_K = 5; function commitSnapOnRelease() { … const projected = decayRest({ initial: spring.value, velocity: spring.velocity, friction: DECAY_K }); const target = nearestTarget(projected); if (target) spring.target = target.center; }`. The kf `Draggable` flings free on its own pointerup (re-seating the spring from `(value, releaseVelocity)`); the interim then PROJECTS the frictional rest (`decayRest`, same `DEFAULT_DECAY_K=5` as kf), picks the nearest snap center, and sets `spring.target` to it (the C¹-continuous published-surface mirror). The single-commit guard (`useDragMorph.ts:318-319` `committed`/`hasGestured`) fires `onSnap` ONCE per gesture.
- **The BC relay names the row BOOKED republish-gated (VERIFIED).** `docs/tranches/BC/coordination/asks-and-consumes.md:20` (the `Draggable snap+bounds+rubberBand DragOptions` row) — 🟡 **BOOKED (republish-gated)**, "the PUBLISHED 4.3.0 dist `DragOptions` does NOT expose `snap`/`bounds`/`rubberBand` (machine-verified ABSENT) … `BC.W-LIQUID-TAB` ships the pull on 4.3.0 TODAY via the published-surface interim … the `rubberBand` overscroll is the deferred-polish leg. CONSUME-AND-DELETE target: on the kf republish past 4.3.0 … the ~12-line `commitSnapOnRelease` re-roll … collapses onto the native `snap` option AND the pull gains the iOS `rubberBand` overscroll … A cheap by-name ask — NO peer-spine widen (glass-ui's spine is `^4.0.0`)."
- The peer spine is `keyframes.js: ^4.0.0` (`package.json` peerDependencies, VERIFIED). NO peer-spine widen is owed for the consume.

**The trigger has NOT fired.** The published `DragOptions` still lacks `snap`/`bounds`/`rubberBand` at the BD authoring. The disposition is BOOKED-with-trigger, NOT a build. The pull WORKS TODAY (the interim); the consume is a cleanup + the free overscroll polish.

## (3) The build — BOOKED, no build this tranche (the republish-gate fence)

**This wave builds NOTHING until kf republishes the `snap`/`bounds`/`rubberBand` `DragOptions` in its DIST.** The interim is correct + shipping on `4.3.0` today (the pull + fling-to-nearest work); consuming a not-in-dist option is the contrivance the apply-the-bar discipline forbids. The wave's BD-authoring product is the re-stamped BOOKED disposition + the carried trigger; the actual consume is the kf-republish-gated successor.

**IF the trigger fires (kf republishes `snap`/`bounds`/`rubberBand` on the published `DragOptions`):**

1. **Verify the dist-presence first.** Re-grep the consumed dist (`grep -E 'snap|bounds|rubberBand' node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts` → present on the `DragOptions` type) so the consume is against a REAL published option, not the local sibling. NO peer-spine widen — the consume rides the existing `^4.0.0` caret.
2. **Collapse the re-roll onto native `snap`.** DELETE the ~12-line `commitSnapOnRelease` re-roll (`useDragMorph.ts:301-311`) + its `DECAY_K`/`decayRest`/`nearestTarget` projection; pass the snap targets to the kf `Draggable` via the native `snap` option (the kf `Draggable` projects + re-targets the nearest declared target itself). The `nearestTarget`/`nearestValue` helpers (`useDragMorph.ts:265-279`) STAY if the `onSnap` callback still resolves the value from the committed center; the single-commit guard (`committed`/`hasGestured`) STAYS (the one-registry discipline — `onSnap` fires ONCE).
3. **Gain the iOS `rubberBand` overscroll (the deferred-polish leg).** Wire the published `rubberBand`/`bounds` so a pull PAST the end tab stretches then snaps back (the iOS overscroll — the deferred-polish leg the interim lacked). The `--tab-indicator-max-stretch` cap (≤1.08, the LOW velocity-squish cap, VERIFIED in the W-DRAG-MORPH register) stays the anti-taffy ceiling; the overscroll is bounded by the same low cap.
4. **Reconcile the relay row.** Flip the BD asks-and-consumes DragSnap row from BOOKED → SATISFIED + the shipping kf version; reconcile the BC relay row in lockstep (the no-silent-drop law).

**Fences honored:** NO kf tree edit (inv-26 — the kf republish is kf's own). NO peer-spine widen (the spine is `^4.0.0`; the `DragOptions` change ships in a caret-compatible `4.x` minor). The W-DRAG-MORPH compositor-only floor (`transform`/`translate`, never a layout property — `proof:no-layout-animation`) is preserved (the consume changes the snap MATH source, not the channel). PRM-safe by construction (the gesture still functions; the squish is off under reduce — the `SpringProgress.respectReducedMotion` policy, UNTOUCHED).

## (4) The gate — born-RED → GREEN (the republish-gate machine-lock)

**The BOOKED disposition is the standing fact; the gate fires only on the consume.**

- **The CONSUME marker + the no-silent-drop relay carry the row TODAY.** The `// CONSUME(kf snap):` marker (`useDragMorph.ts:281`) names the republish trigger + the foreign-tree fence in-source. The BD no-silent-drop gate (`proof:bd-crossrepo-asks`) carries the DragSnap row + its BOOKED disposition + its trigger + the consumer site (`useDragMorph.ts`) — a dropped row reds the completeness arm. Born-RED if the BD relay omits the row.
- **`proof:drag-morph` D1 is the standing anti-fork floor (VERIFIED-class).** It asserts `useDragMorph` COMPOSES the kf substrate + owns no second engine — so a consume that re-forks a snap engine (rather than collapsing onto the native `snap`) reds D1. The consume MUST delegate to the published kf option, not re-implement it.
- **IF the consume lands (post-republish):** a new born-RED clause asserts (a) the consumed dist `DragOptions` carries `snap`/`rubberBand` (the dist-presence floor — never against the local sibling), (b) the native `snap` is passed to the kf `Draggable`, (c) the `commitSnapOnRelease` re-roll is GONE (the consume-and-delete), (d) the `rubberBand` overscroll is wired + bounded by `--tab-indicator-max-stretch` — born-RED on the pre-consume tree (the re-roll present, no native `snap`), GREEN at the consume. **The self-test bite:** a synthetic consume that imports the not-in-dist `snap` option (or that keeps `commitSnapOnRelease` alongside the native `snap` — the dual-path) MUST red.

## (5) Paint verification

**Device-free UNTIL the trigger fires.** The BD-authoring product is the re-stamped BOOKED disposition + the carried trigger + the relay row — zero pixels, no `proof:ba-gestalt`.

**IF the consume lands (post-republish):** the `rubberBand` overscroll paint IS the new visual — pull the END tab PAST the end → it STRETCHES (bounded by `--tab-indicator-max-stretch`) then SNAPS BACK (the iOS overscroll), captured both modes at `/navigation/tabs` (the `<SegmentedTabs draggable>` liquid-tab) + the dock pull-to-switch (`<DockLayerGroup draggable>`). The fling-to-nearest snap reads identically (the byte-equivalent snap decision — flick-vs-slow); the click selection path is byte-identical. `proof:ba-gestalt` navigation-band verdict on the fresh capture (the BC anti-disease law). NO terminal-reflect funnel.

## (6) Fences + risks

- **REPUBLISH-GATE (the cardinal fence).** The published `DragOptions` lacks `snap`/`bounds`/`rubberBand` at BD; consuming a not-in-dist option is the contrivance the bar forbids. STAYS BOOKED — the interim (`reset` + `decayRest` + `spring.target`) is correct + shipping on `4.3.0` today.
- **FOREIGN-TREE FENCE (inv-26, absolute).** glass-ui edits ZERO kf tree — the `DragOptions` republish is kf's own; the by-name ask is the only channel. A consume wave's File Bounds touch ZERO `../keyframes.js` path.
- **NO peer-spine widen.** The spine is `keyframes.js: ^4.0.0`; the `DragOptions` change ships in a caret-compatible `4.x` minor. The consume does not move the spine.
- **NO dual-path on consume.** The consume DELETES the `commitSnapOnRelease` re-roll (the consume-and-delete cadence). A consume that keeps the re-roll alongside the native `snap` is the dual-path the self-test bite reds.
- **NO re-fork the engine.** `proof:drag-morph` D1 binds — the consume DELEGATES to the published kf `snap`, never re-implements a parallel snap engine. The anti-slop `--tab-indicator-max-stretch` cap bounds the new overscroll.
- **The interim KEEPS the pull working.** The pull + fling-to-nearest are SHIPPING TODAY on the interim — the consume is a cleanup + the free `rubberBand` polish, not a fix for a broken pull. NO regression of the working gesture.
