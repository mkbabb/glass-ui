// fixtures.mjs · the minimal fixture: one hand-made page (no library, no build) that honours the scene DOM
// contract (HARNESS.md §1.3) and satisfies every witness, plus the planted violations. It proves each witness can
// PASS and can FAIL; it says nothing about the library.
//
//   --fixture               the compliant page: a declared register (six directories, five classes, a rung per
//                           class and a reason for the static one) whose members each compose their class's recipe
//                           (the registered `--rung-class` stamp, CK-01) and render in some scene; a press rung on every
//                           control (scale plus a light answer, PRM keeps the light and drops the scale) that SUSTAINS
//                           while held (CK-06); a commit read in LIGHT (CK-02 arm iii: an overlay rises on the
//                           control-engage envelope's attack and decays on its release) from the MODEL (keyboard,
//                           pointer, tap and programmatic alike, none on Tab entry, none on a mount already committed);
//                           a selection body that springs with an overshoot (arm i); a control that rests scaled and
//                           commits around that settle; a field that answers hover and an ambient cell that answers a
//                           pointer move (CK-19); a slider that grows while held, or while keyboard-engaged by Tab or an
//                           acting key (never by a modifier, an unacted character or a script focus, and never in the
//                           hand's register: CK-04), returns to rest after a drag, grows inside the phone gutter, and
//                           carries its release velocity into the settle on its visible thumb with no one-frame jump
//                           (CK-05); two sliders that hand the engagement over without a snap and share one veil, an
//                           Escape release and a re-render landing without a jump (CK-20); a token the engagement reads
//                           at runtime that fails loud when unreadable (CK-21); a modal whose scrim keys on its open
//                           state while `data-engaged` means held; a breathing idle rung on the S6 subject (scale
//                           1 → 1.012, 4 s, compositor-only, retired under PRM); every duration a token, every token
//                           equal to its table row
//   --fixture --fault <id>  the same page with one planted violation (FAULTS below)
//
// E-7's static arm reads a source tree, so its fixture is four trees under fixtures/e7/ (clean, two-writers, spread,
// held-two).

/**
 * Each fault names the witnesses it plants against and the cell that must be among the failing lines (`cell`, a
 * regex over the printed line). A fault with `expect: "pass"` is a control: the witness must still PASS. A fault with
 * `expect: "unmeasured"` must leave its planted cell UNMEASURED (a precondition the witness refuses to grade) and no
 * cell failing. `args` are passed to the witness; `engines` names the engines with an input for the planted cell.
 */
export const FAULTS = {
  "e1-undeclared": { why: "a component directory (delta) has no class row", witnesses: ["E-1"], cell: /denominator/ },
  "e1-norung": { why: "the static class names no rung and gives no reason", witnesses: ["E-1"], cell: /carries a rung/ },
  "e1-dead": { why: "the pressed class's exemplar (alpha → pop) answers a press with nothing: the declaration holds on paper only", witnesses: ["E-1"], cell: /runtime pressed/ },
  "e1-stale": { why: "CONTROL, must PASS: the declaration lists the directories in another order and carries a comment field; order and extra fields are not the census", witnesses: ["E-1"], expect: "pass" },
  "e1-unadopted": { why: "CK-01: alpha's control composes no recipe (its engage-pressed class deleted, C-A r26): declared, classified, not adopted", witnesses: ["E-1"], cell: /adoption alpha/ },
  "e1-nullhost": { why: "CK-01: beta's recipe is stamped through a host getter that resolves to null (C-B r26): the slider renders unclassed", witnesses: ["E-1"], cell: /adoption beta/ },
  "e1-wrongclass": { why: "CK-01: alpha's control composes engage-chosen against its declared pressed (C-A r1's drift)", witnesses: ["E-1"], cell: /adoption alpha/ },
  "e1-double": { why: "CK-01: alpha's control composes two engage-* classes (a computed read sees only the later one)", witnesses: ["E-1"], cell: /single/ },
  "e1-staticfocus": { why: "CK-01: the static card (delta) renders role=\"option\" tabindex=\"0\" and a click handler (Card.vue:66-67 at HEAD)", witnesses: ["E-1"], cell: /static-inert delta/ },
  "e1-latch": { why: "CK-01's RED latch: a declared member (epsilon) is rendered by no scene, so its adoption is unproven", witnesses: ["E-1"], cell: /adoption latch/ },
  "e1-absent": { why: "CK-01: the pressed class's exemplar scene renders no target; E-1 must FAIL that cell, never throw", witnesses: ["E-1"], cell: /runtime pressed \(alpha\) ·.*no target/ },
  "e1-fielddead": { why: "CK-19: the field's exemplar (eta) answers hover with nothing", witnesses: ["E-1"], cell: /runtime field/ },
  "e1-ambientdead": { why: "CK-19: the ambient cell's exemplar (theta) does not follow the pointer", witnesses: ["E-1"], cell: /runtime ambient/ },
  "e2-fade": { why: "the commit is a 120 ms linear fade-in (light that rises TO its rest, not above it); the selection body jumps: no arm", witnesses: ["E-2"], cell: /pop commit·keyboard/ },
  "e2-tabpop": { why: "the commit's light also fires when Tab enters the control", witnesses: ["E-2"], cell: /Tab-entry/ },
  "e2-prog": { why: "the commit fires from pointer and key handlers only: a programmatic model change commits with none", witnesses: ["E-2"], cell: /commit·programmatic/ },
  "e2-glide": { why: "the selection body glides on a linear path and lands without overshoot (travel with no weight)", witnesses: ["E-2"], cell: /travel commit/ },
  "e2-mountpop": { why: "a control that mounts already committed fires its commit light on mount (H-8)", witnesses: ["E-2"], cell: /mount/ },
  "e2-nocoarse": { why: "the commit is keyed on mouse events: a touch tap commits with none", witnesses: ["E-2"], cell: /commit·tap/ },
  "e2-notdriven": { why: "CK-02 precondition: the scene's key does not change the state (X-5); the cell must read NOT DRIVEN, never PASS", witnesses: ["E-2"], cell: /pop commit·keyboard.*NOT DRIVEN/ },
  "e2-fillonly": { why: "CK-02 arm iii: the commit is the committed state's own fill change and nothing else", witnesses: ["E-2"], cell: /pop commit·keyboard/ },
  "e2-smallpop": { why: "CK-02 arm ii (O-103d (1), the default arms since H14): a 1.004 crest moves the painted face 0.4 px (C-A r26's pop), under the 0.8 px floor", witnesses: ["E-2"], cell: /pop commit·keyboard/ },
  // H14 (class 6 (a)): RETIRED with route B (O-103d (1)): e2-literalflash, e2-geompop, e2-bigpop, e2-noground, e2-shimmer, e2-paintless,
  // e2-paintonly, e2-dither (each planted or controlled arm iii alone; under arms i,ii the clean fixture's pop carries the commit)
  "e3-still": { why: "the slider never grows", witnesses: ["E-3"], cell: /pointer-held/ },
  "e3-kbd": { why: "the slider grows under the pointer only; keyboard engagement leaves it at rest", witnesses: ["E-3"], cell: /keyboard-focused/ },
  "e3-gutter": { why: "the phone slider is full width and grows ×1.06 in place, past the 16 px gutter", witnesses: ["E-3"], cell: /gutter/ },
  "e3-tabhand": { why: "CK-04: Tab paints the hand's register: data-held and cursor grabbing on keyboard focus (C-B §0 item 1)", witnesses: ["E-3"], cell: /keyboard register/ },
  "e3-latch": { why: "CK-04 (X-1): after a pointer drag and release the slider stays engaged (the S-8 :has(:focus-visible) latch)", witnesses: ["E-3"], cell: /afterdrag/ },
  "e3-modifier": { why: "CK-04: any keydown engages, a lone modifier included (C-B §0 item 2)", witnesses: ["E-3"], cell: /modifier/ },
  "e3-charkey": { why: "CK-04: a character key the slider does not act on engages (useEngage.ts:108's leading `.`, C-E r33)", witnesses: ["E-3"], cell: /unacted key/ },
  "e3-scriptfocus": { why: "CK-04: a script focus() with no key event engages (C-E §0 item 3)", witnesses: ["E-3"], cell: /script focus/ },
  "e3-blockgrow": { why: "CONTROL, must PASS: the phone slider grows ×1.06 on the block axis only, inside the gutter (CK-04's block reading, R-E's)", witnesses: ["E-3"], expect: "pass" },
  "e3-prmdark": { why: "CK-04: under reduced motion the touch-held phone slider paints nothing (the light leg dropped with the grow)", witnesses: ["E-3"], cell: /phone touch-held PRM/ },
  "e3-prmgrow": { why: "under reduced motion the slider still grows, on its spring (H-9)", witnesses: ["E-3"], cell: /PRM/ },
  "e4-drop": { why: "the release drops the drag velocity: the thumb stops where the pointer let go", witnesses: ["E-4"], cell: /slider fling/ },
  "e4-hold": { why: "the release holds in place (750 ms after a fling, 600 ms after a still release), then springs to the SAME nearest detent: the velocity picks nothing", witnesses: ["E-4"], cell: /slider fling/ },
  "e4-snap": { why: "CONTROL, must PASS: the release snaps to a detent and the release velocity picks the detent", witnesses: ["E-4"], expect: "pass" },
  "e4-vdrop": { why: "the vertical detent sheet resolves its release by position alone: a fling lands on the detent a still release lands on (H-7)", witnesses: ["E-4"], cell: /vsheet fling/ },
  "e4-stripstop": { why: "the scroll-snap strip kills the platform fling at touchend and snaps to the nearest member (H-7)", witnesses: ["E-4"], cell: /strip fling/, engines: ["chromium"] },
  "e4-prmbounce": { why: "under reduced motion the slider's release keeps its velocity spring and overshoots its rest (H-9)", witnesses: ["E-4"], cell: /slider release PRM/ },
  "e4-ghostbody": { why: "CK-05: the body the witness reads is invisible (opacity 0, the reka thumb C-B r24 carried)", witnesses: ["E-4"], cell: /slider fling.*INVISIBLE/ },
  "e4-teleport": { why: "CK-05: the release holds, then lands on its projected point in one frame (the sortable and tabs teleports)", witnesses: ["E-4"], cell: /slider release continuity/ },
  "e4-flaky": { why: "CK-05: the same drive lands on another detent on another run (C-B §1: 130 or 255 px). H7: read over 8 runs, odd runs a detent short at the drive's own velocity, so equal velocities land on different detents, or a faster run lands short of a slower one", witnesses: ["E-4"], cell: /vsheet repeat landing · .*(EQUAL VELOCITIES ON DIFFERENT DETENTS|ORDER INVERTED)/, args: ["--repeat", "8"] },
  "e4-inflow": { why: "CK-05: the sheet paints in flow (the P1-7 .glass-floating row); its cell must read UNMEASURED until its owner cures it", witnesses: ["E-4"], cell: /vsheet fling/, expect: "unmeasured" },
  "e5-hover": { why: "a held touch answers only through the hover background, leaked by sticky touch hover (the accordion trigger at HEAD)", witnesses: ["E-5"], cell: /pop press/ },
  "e5-decay": { why: "CK-06: the held press light decays back toward rest within 500 ms while the touch is still held", witnesses: ["E-5"], cell: /sustain/ },
  "e6-absent": { why: "no idle rung", witnesses: ["E-6"], cell: /present/ },
  "e6-dim": { why: "the round-0 plant: the host's opacity breathes to .9 over 4 s, dimming the control's own ink (H-5)", witnesses: ["E-6"], cell: /channel/ },
  "e6-layout": { why: "the idle rung animates width (a layout channel)", witnesses: ["E-6"], cell: /channel/ },
  "e6-prm": { why: "the breathing keeps its scale under reduced motion", witnesses: ["E-6"], cell: /PRM/ },
  "e6-fast": { why: "the breathing runs a 600 ms period (a flicker, not a breath)", witnesses: ["E-6"], cell: /period/ },
  "e6-spin": { why: "the idle rung is a spinner: rotate 360° every 4 s, linear (a loop, not a breath; H-5)", witnesses: ["E-6"], cell: /channel/ },
  "e6-saw": { why: "the idle rung ramps scale 1 → 1.012 linearly and jumps back at the seam (a sawtooth on a legal channel, amplitude and period; H-5)", witnesses: ["E-6"], cell: /shape/ },
  "e7-veil": { why: "the modal's scrim carries a bare data-engaged (presence) beside the held meaning", witnesses: ["E-7"], cell: /modal/ },
  "e7-two": { why: "two source files write data-engaged, one outside the register's owner", witnesses: ["E-7"], cell: /writers data-engaged/ },
  "e7-spread": { why: "CK-08 (X-6): a second writer of data-engaged hides in a v-bind object spread", witnesses: ["E-7"], cell: /writers data-engaged/ },
  "e7-held": { why: "CK-08: a component writes data-held outside the register's owner (GlassDock.vue:346 at HEAD)", witnesses: ["E-7"], cell: /writers data-held/ },
  "e7-prm": { why: "under reduced motion the held slider writes no data-engaged: held is gated on motion (H-9)", witnesses: ["E-7"], cell: /held PRM/ },
  "e8-drift": { why: "the emitted --engage-press-drain-attack is 56ms against its row's 55", witnesses: ["E-8"], cell: /mirror/ },
  "e8-units": { why: "CONTROL, must PASS: a token spelled .18s (a minifier's respelling of 180ms, as the HEAD build does) equals its 180 ms row", witnesses: ["E-8"], expect: "pass" },
  "e8-literal": { why: "the control's press transition spells 230ms, a literal no token carries", witnesses: ["E-8"], cell: /literal pop/ },
  "e8-prmliteral": { why: "the reduce arm's authorization row (the class rule that outranks the PRM fallback) spells its press transition 100ms, a literal no token carries (H-9; H3: an authorized row is graded, not exempt)", witnesses: ["E-8"], cell: /literal pop PRM/ },
  "e9-scale": { why: "under reduced motion the press still squishes", witnesses: ["E-9"], cell: /press-spatial/ },
  "e9-dark": { why: "under reduced motion the press retires its scale and keeps no light answer (its press paints the hover value): E-9's press, E-1's exemplar under reduce and E-5's held touch under reduce all read it (H-9)", witnesses: ["E-9", "E-1", "E-5"], cell: /press-light/ },
  "e9-glide": { why: "under reduced motion the selection body still glides", witnesses: ["E-9"], cell: /commit-spatial/ },
  "e10-snap": { why: "CK-20: Tab from slider A to slider B drops A to rest in one frame (C-E r32)", witnesses: ["E-10"], cell: /hand-off drop/, args: ["--part", "old"] },
  "e10-veildip": { why: "CK-20: the shared veil is torn down at A's release and re-ramps from 0 for B (C-E r32)", witnesses: ["E-10"], cell: /hand-off veil/, args: ["--part", "old"] },
  "e10-escsnap": { why: "CK-20: Escape releases the keyboard engagement in one frame", witnesses: ["E-10"], cell: /escape release/, args: ["--part", "old"] },
  "e10-rerender": { why: "CK-20: the held slider is pinned out of flow; a sibling inserted during the hold makes the release land in its new slot in one frame (P-E/rerender-probe.md)", witnesses: ["E-10"], cell: /re-render landing/, args: ["--part", "old"] },
  // ── H3 (pass 3): a plant per new cell (REGISTRY §P2-7 items 1-7) ──
  "e1-ownhandler": { why: "CK-01 (H3 handler rule): the static card (delta) carries a click handler its member binds, with no role and no tabindex: the library-internal exemption must not swallow it", witnesses: ["E-1"], cell: /static-inert delta/ },
  "e1-libhandler": { why: "CONTROL, must PASS (H3 handler rule): the static card carries only a handler a third-party component binds inside it (reka-ui's Label mousedown, C-A2 CK-01); pass 2's census counted it live", witnesses: ["E-1"], expect: "pass" },
  "e1-unrendered": { why: "CK-01 (H3 gallery): a member the scene app's error boundary caught leaves [data-t=unrendered]; the census names it", witnesses: ["E-1"], cell: /gallery rendered/ },
  "e2-arrival": { why: "CK-03 (H3): no one-frame arming: a model set in the mount's own task lights the commit (B's lesson, F-7)", witnesses: ["E-2"], cell: /pop arrival·own (light|dark)/ },
  "e2-arrivalflush": { why: "CK-03 (H3, the style-read control): the commit light is a CSS transition and the only arming is the absence of a before-change style, so a model set in the mount's own task is quiet until something reads style during the mount, then lights (A's defect, C-CP §0 item 5)", witnesses: ["E-2"], cell: /pop arrival·ownflush/ },
  "e2-arrivalmute": { why: "CK-03 (H3): the arming never arms on a deferred mount: a model set after first paint commits with no light", witnesses: ["E-2"], cell: /pop arrival·late/ },
  "e2-statelessclick": { why: "CK-02 (H3 stateless ruling): the stateless control lights from its pointerup and keydown handlers only, so element.click() (its programmatic commit) activates it with no light", witnesses: ["E-2"], cell: /act commit·programmatic/ },
  "e10-teleport": { why: "CK-20 (H3 position): on the hand-off the OUTGOING slider jumps onto the incoming one's place for 300 ms, then jumps home; its scale releases smoothly (C-E2 §0.1's 68 px teleport)", witnesses: ["E-10"], cell: /hand-off drop/, args: ["--part", "old"] },
  "e10-teleportin": { why: "CK-20 (H3 position): the INCOMING slider appears on the outgoing one's place for 200 ms, then jumps home (C-E2 §0.1, Shift+Tab B → A)", witnesses: ["E-10"], cell: /hand-off rev/, args: ["--part", "old"] },
  "cap-nocommit": { why: "CK-25 (H3 capture): a touch tap does not commit the control: the coarse 'committed' frame must say NOT COMMITTED, never show a frame as a commit", witnesses: ["CAP"], cell: /coarse.*committed/ },
  // ── H4 (pass 4): a plant per new cell (REGISTRY §P3-8.3 wave 1) ──
  "e10-twoengaged": { why: "CK-15 (H4): on the hand-off the outgoing slider keeps its engagement for 250 ms after the incoming one takes it: two engaged controls on the same frames (its scale and position stay lawful)", witnesses: ["E-10"], cell: /hand-off singleton fwd/, args: ["--part", "old"] },
  "e1-ambientlimit": { why: "CONTROL, must read UNMEASURED (H4, CK-19): the ambient field states that it resolved a static ground in this engine (the Aurora's software-raster guard) and does not follow the pointer; the cell is the engine's limit, never a pass and never a fail", witnesses: ["E-1"], cell: /runtime ambient \(theta\) ·/, expect: "unmeasured" },
  "e5-flaky": { why: "CK-06 (H4 three-read rule): the held press light sags back toward rest on one touch hold in three (every third page load of the scene); a one-read rule passes it two times in three", witnesses: ["E-5"], cell: /pop sustain/ },
  "e12-fcslop": { why: "CK-14 (H4): the forced-colours arm hides every ::after, the coarse trigger's 44 px hit-slop included (C-A3 §0.2: engage.css:225-230 on the dock triggers)", witnesses: ["E-12"], cell: /slop fcslop/ },
  "e12-fcreach": { why: "CK-27 (H4): the control's ::after is a 6 px hit ring around it, and the forced-colours arm removes it: the arm reaches a pseudo-element beyond the slop scene (the widened cell must find it on every scene)", witnesses: ["E-12"], cell: /pop fc-reach/ },
  "e12-restloop": { why: "CK-16 (H4): the rest loop keeps running off-screen (C-A3 §0.4: Skeleton and StatusDot 3000-4346 px off-screen)", witnesses: ["E-12"], cell: /restloop rest-running off-screen/ },
  "e12-restlayout": { why: "CK-16 (H4): the rest loop animates width, a layout every frame at rest (W-F.6's 0 layouts/s)", witnesses: ["E-12"], cell: /restloop rest layouts/, engines: ["chromium"] },
  "e12-wheelchain": { why: "CK-22 (H4): the keyboard-engaged slider is promoted to the top layer, so a wheel over it inside a scroller scrolls the page and not the box (C-E3 §0.3: +30 page, +0 box)", witnesses: ["E-12"], cell: /wheel over engaged control/ },
  "e12-wheelrow": { why: "CONTROL, must PASS (H4): the same promotion with the route's MIGRATION row cited (--migration wheel): the wheel cell REPORTs and the critic scores the row", witnesses: ["E-12"], expect: "pass", args: ["--migration", "wheel"] },
  "e12-anchorlost": { why: "CK-22 (H4): the engagement writes its own position-anchor on the root and removes the property on release, so a consumer's anchor is gone after the release (C-E3 §0.3, E-M1)", witnesses: ["E-12"], cell: /consumer anchor · escape/ },
  // ── H5 (pass 5): a plant per new cell (REGISTRY §P4-8.3 wave 1) ──
  "e5-late": { why: "CK-06 (H5 onset): the press mark is written 190 ms after the touch begins, so the press lands after its +200 ms reference and its light still rises at +1200 ms (a one-reference sustain passes it, C-A4's P7 class)", witnesses: ["E-5"], cell: /pop sustain/ },
  "e5-active": { why: "CK-06 (H5 onset): the press keys on :active alone (C-A4's plant P7); Chromium's long-tap sets :active 175-200 ms after touch-down. WebKit's raw touch sets :active at touchStart, so the plant has no input there", witnesses: ["E-5"], cell: /pop sustain/, engines: ["chromium"] },
  "e10-relayout": { why: "CK-20 (H5): the held slider is pinned over a placeholder that re-reads its place on a childList mutation only; a layout-only move during the hold makes the release land in its new slot in one frame (the insert landing passes it)", witnesses: ["E-10"], cell: /re-render landing \(layout-only\)/, args: ["--part", "old"] },
  "e10-stale": { why: "CK-20 (H5, C-E4 §0.1): the engaged slider's last-read place refreshes on a childList mutation only, and an unrelated append glides it from that stale place (a one-frame snap, then a slide back)", witnesses: ["E-10"], cell: /restale stale place · keyboard/, args: ["--part", "old"] },
  "e10-staleresize": { why: "CK-20 (H5): the place also refreshes on the spacer's style write, but not on a viewport resize: the resize cell alone must fail", witnesses: ["E-10"], cell: /stale place \(viewport resize\)/, args: ["--part", "old"] },
  "cap-ladder": { why: "CK-25 (H5, C-A4's ca4-ladder): on a fine pointer the press paints lighter than the hover it follows (the press wash under the hover rung, C-A4 §0.3)", witnesses: ["CAP"], cell: /ladder fine/ },
  "e1-gpuambient": { why: "CONTROL, must PASS (H5, CK-19): the clean fixture under the named GPU arm (--gpu metal): the arm launches, states a hardware renderer, and the ambient cell is graded", witnesses: ["E-1"], expect: "pass", args: ["--gpu", "metal"], engines: ["chromium"] },
  "e1-gpuambientdead": { why: "CK-19 (H5): under the named GPU arm the ambient exemplar does not follow the pointer: the GPU-backed cell must FAIL, never pass", witnesses: ["E-1"], cell: /runtime ambient/, args: ["--gpu", "metal"], engines: ["chromium"] },
  "e11-silent": { why: "CK-21: the engagement reads --fx-scale-engage at runtime and, when it is unreadable, degrades to no grow with no console.error", witnesses: ["E-11"], cell: /fail-loud/, args: ["--part", "old"] },
  "e11-unread": { why: "CONTROL: the grow spells its figure in place and reads no token, so an unreadable token degrades nothing: UNMEASURED, not a pass", witnesses: ["E-11"], cell: /fail-loud/, expect: "unmeasured", args: ["--part", "old"] },
  "e11-noise": { why: "CONTROL (H2 §2.3): the grow spells its figure in place, reads no token, and varies run to run (1.060, 1.061, 1.066, 1.054, 1.060 on successive slider loads); one planted read outside a two-run spread is noise, not a degradation: UNMEASURED, never FAIL", witnesses: ["E-11"], cell: /fail-loud/, expect: "unmeasured", args: ["--part", "old"] },
  // ── H6 (pass 6): a plant per new cell (REGISTRY §P5-8.3 wave 1) ──
  "e10-ratio1": { why: "CK-20 (H6, C-A5 §0.1, REGISTRY §P5-7 item 1): the engaged slider's place is watched by an observer armed at ratio 1 (the box cut to its own rect): a move whose new rect lies inside the old one never changes the ratio, so the next unrelated append glides it from the stale place (the inward move and the centred shrink)", witnesses: ["E-10"], cell: /restale stale place \(inset\) · keyboard/, args: ["--part", "old"] },
  "e10-clipratio": { why: "CK-20 (H6, C-E5 §0.1): the same observer inside a clipping scroller, armed at the clipped ratio: a move toward the visible side keeps that ratio, so the next unrelated append glides the slider from the stale place", witnesses: ["E-10"], cell: /clipstale clipped stale place · keyboard · (top|bottom) · reveal/, args: ["--part", "old"] },
  "e11-rename": { why: "CK-21 (H6, C-E5 §0.2, REGISTRY §P5-7 item 4): the fixture's loud clock read follows a hand-kept list that a rename left behind: it no longer names --engage-control-engage-*, which the stylesheet still transitions on, so planting it degrades the veil's and the dialog's fades with no console.error", witnesses: ["E-11"], cell: /clock --engage-control-engage-release/, args: ["--part", "old"] },
  "e12-capsulelift": { why: "CK-11/CK-14/CK-27 (H6, C-A5 §0.2): the capsule composer keeps its hover lift (scale 1.015 on :hover, outside any (hover: hover) guard), so a hover writes geometry and a coarse tap latches it", witnesses: ["E-12"], cell: /capsule kappa hover fine/ },
  "e12-capsulesnap": { why: "CK-11 (H6): the capsule composer keeps its :active press snap (scale 0.97) with no door press mark: a class rung writes the press's geometry", witnesses: ["E-12"], cell: /capsule kappa press fine/ },
  "e12-capsulelatch": { why: "CK-14 (H6): after a touch the capsule composer holds scale 1.015 for 2 s (a hover latch written by script on touchend): the coarse tap does not settle at 1", witnesses: ["E-12"], cell: /capsule kappa tap coarse/ },
  "e12-capsuleunrendered": { why: "CK-27 (H6, REGISTRY §P5-7 item 2): the source tree has a second composer of .glass-capsule-hover (lambda) that the capsule scene does not render, so no cell can see it (the source-comment closure class)", witnesses: ["E-12"], cell: /capsule composers rendered/ },
  "e9-fadecut": { why: "CK-10 (H6, O-100 R-1 placed by O-103): under reduce the presented dialog's opacity fade is zeroed by the PRM fallback (no authorization row), so it cuts on open and on close", witnesses: ["E-9"], cell: /presented fade \(PRM\) open/ },
  "e9-fadespatial": { why: "CK-10 (H6): under reduce the presented dialog keeps its fade AND its 0.95 → 1 scale, a spatial leg the reduce arm must retire", witnesses: ["E-9"], cell: /presented fade \(PRM\) open/ },
  "e4-carryflaky": { why: "CK-05 (H6, REGISTRY §P5-7 item 8): the slider drops its release velocity on one fling in five (the third), so its carry is bimodal; a one-read rule passes it four times in five. H8: the dropped fling is released at the drive's own velocity (≥ 100 px/s) and carries 0.00 px, so it must fail BY NAME", witnesses: ["E-4"], cell: /slider fling carries velocity · .*ZERO-CARRY FLING/ },
  // ── H7 (pass 7): a plant per new cell (REGISTRY §P6-8.3 wave 1) ──
  "e4-zerofling": { why: "CK-05 (H7, C-E6 s1): the third repeat run's release drops its velocity (the sheet lands where the hand let go): a fling that carries 0.00 px must fail by name", witnesses: ["E-4"], cell: /vsheet repeat landing · .*ZERO-CARRY FLING/ },
  "e4-velsplit": { why: "CONTROL, must PASS (H7): the sheet takes the next detent only above 500 px/s, and the witness paces every other repeat run's moves 250 ms apart (--repeat-gaps 16,250): unequal velocities on different detents are the drive's spread, not the rule's", witnesses: ["E-4"], expect: "pass", args: ["--repeat", "6", "--repeat-gaps", "16,250"] },
  "e9-prmpop": { why: "CK-02/CK-10 (H7, O-103d (1)): under reduce the commit still pops geometrically (1.08): not an instant state change", witnesses: ["E-9"], cell: /pop commit-instant (light|dark)/ },
  "e9-illegible": { why: "CK-02/CK-10 (H7, O-103d (1)): under reduce the committed state paints nothing on the face (its fill held at rest): the commit is instant and illegible", witnesses: ["E-9"], cell: /pop commit-instant (light|dark)/ },
  "e9-prmplant": { why: "CK-27 (H7, REGISTRY §P6-7 item 6): the witness removes the page's reduce arm (lib.mjs PRM_PLANT): the travelling face (the tabs' class) must fail its commit-instant cell", witnesses: ["E-9"], cell: /travel commit-instant (light|dark)/, args: ["--prm-plant"] },
  "e10-noref": { why: "CK-20 (H7, P-E6 §6 item 4): the hand-off read without its reference scene (--scenes slider2) must FAIL LOUD, never print a NaN bound", witnesses: ["E-10"], cell: /slider2 hand-off drop · NO REFERENCE/, args: ["--scenes", "slider2"] },
  "e10-clipratioptr": { why: "CK-20 (H7, C-E6 §0.1): the clipped-ratio observer, read on the POINTER path inside the scroller (C-E6's clip-pointer driver): the reveal glides from the stale place", witnesses: ["E-10"], cell: /clipstale clipped stale place · pointer · (top|bottom) · reveal/, args: ["--part", "old"] },
  "e10-clipvanish": { why: "CK-20 (H7, C-E6 §0.2): the keyboard-engaged slider is promoted into the top layer over its scroller's clip and hidden whole when its place leaves the scroller: it paints outside the card, then vanishes in one step", witnesses: ["E-10"], cell: /clipstale clip-vanish/, args: ["--part", "vanish"] },
  "e10-prmrebound": { why: "CK-02/CK-10 (H7, O-103d (1)): under reduce the commit and its reverse pop geometrically: not an instant state change", witnesses: ["E-10"], cell: /pop rebound reverse \(PRM\)/, args: ["--part", "old"] },
  "e12-openpop": { why: "CONTROL, must PASS (H7, C-E6 §5.2): the composer opens on pointerdown and pops ×1.02 as it opens (the commit's geometry, the SelectTrigger's class); its press is read with pointerdown withheld (the row's quiet), so the open's pop is not read as a press", witnesses: ["E-12"], expect: "pass" },
  // ── H8 (pass 8): a plant per new cell (REGISTRY §P7-8.3 wave 1) ──
  "e4-slowdrive": { why: "CONTROL, must PASS (H8, REGISTRY §P7-7 item 12): the slider's first fling page hides its drive from the page's capture listeners (the release rule reads 0 px/s, as a drive the event clock delivers late under load does) and carries 0.00 px: the read must be RE-DRIVEN inside the stage and reported, never graded as the rule's", witnesses: ["E-4"], cell: /slider fling carries velocity/, expect: "pass", args: ["--scenes", "slider"] },
  "e10-clipouter": { why: "CK-20 (H8, C-E7's clipOnly): the engaged slider is promoted into the top layer, follows its place and is never clipped or hidden: it paints over its card (the two-bound cell's painted-outside clause), keyboard and touch", witnesses: ["E-10"], cell: /clipstale clip-vanish · (keyboard|touch)/, args: ["--part", "vanish"] },
  "e10-rectclip-feather": { why: "CK-20 (H8, the pass-7 construction): promoted into the top layer and clipped to its scroller's overflow RECTANGLE, the clip written late (three frames; pass-7's was one): the library's feather (a mask on the scroller) never reaches it", witnesses: ["E-10"], cell: /clipstale clip feather · (keyboard|touch)/, args: ["--part", "feather"] },
  "e10-rectclip-radius": { why: "CK-20 (H8, the pass-7 construction): the same rectangle clip paints the control into a rounded scroller's corners", witnesses: ["E-10"], cell: /clipstale clip radius · (keyboard|touch)/, args: ["--part", "radius"] },
  "e10-rectclip-scale": { why: "CK-20 (H8, the pass-7 construction): the promoted control takes its layout width under a scaled ancestor, so it paints wider than its place", witnesses: ["E-10"], cell: /clipstale clip place · scale · (keyboard|touch)/, args: ["--part", "place"] },
  "e10-rectclip-film": { why: "CK-20 (H8, the pass-7 construction): the place follows the scroll in its frame and the clip three frames late (pass-7's one-frame lag is not resolved by WebKit's film), so a moving scroller leaks the control above the card", witnesses: ["E-10"], cell: /clipstale clip film · (wheel|smooth) · engaged/, args: ["--part", "film"] },
  "e10-layoutplace": { why: "CK-20 (H8): the promoted control is placed from layout offsets, which no ancestor transform moves: under a translated ancestor it paints off its place", witnesses: ["E-10"], cell: /clipstale clip place · translate · (keyboard|touch)/, args: ["--part", "place"] },
  "e11-crestsilent": { why: "CK-21 (H8, C-A7's crestinput): the commit's crest input (--fx-commit-crest) planted unreadable on <html> before the first script degrades the commit to no light with no console.error", witnesses: ["E-11"], cell: /pop fail-loud --fx-commit-crest/, args: ["--part", "old"] },
  "e12-chipfaint": { why: "CK-27 (H8, C-A7's chipfaint): the chip's hover changes its background-color by a fraction of a level (a property changes, no pixel an eye sees): the hover clause must read paint", witnesses: ["E-12"], cell: /fx chip answers/ },
  "e13-loupecut": { why: "CK-25 (H8, C-A7's cliploupe): the loupe rides inside the control's box, so its scroller clips it: at the scroller's top edge the lens is cut", witnesses: ["E-13"], cell: /clipstale loupe whole · edge/ },
  "e13-loupemark": { why: "CK-25 (H8, P-E7's loupe6): a 2 px mark drawn across the window's centre and no end fade: a seam, a line over glass, a band that ends on the window's pill end", witnesses: ["E-13"], cell: /slider loupe k max/ },
  // ── H9 (pass 9): a plant per new cell (REGISTRY §P8-8.3 wave 1, §P8-7 items 1, 2, 3, 5, 8) ──
  "e10-featherunder": { why: "CK-20 (H9, REGISTRY §P8-7 item 1; P-E8's WebKit keyboard feather ×0.58): the engaged slider under its scroller's feather paints at about half strength (a second mask on its own box): the two-sided feather cell must fail from below", witnesses: ["E-10"], cell: /clipstale clip feather · (keyboard|touch)/, args: ["--part", "feather"] },
  "e10-ancpromote": { why: "CK-20 (H9, REGISTRY §P8-7 item 3; the pass-8 construction): the engaged slider (keyboard or touch) is promoted into the top layer over its place and clipped to its scroller's padding box each frame, copying no other ancestor paint: an ancestor's opacity, filter, clip-path and rotation never reach it", witnesses: ["E-10"], cell: /clipstale anc (opacity|clippath|rotate|filter) · (keyboard|touch)/, args: ["--part", "anc"] },
  "e10-dlgpromote": { why: "CK-20 (H9, C-A8's dlg): the keyboard-engaged slider in the presented plate is promoted into the top layer and kept there 400 ms past its release (an exit clock): dismissed, the plate fades under a body at opacity 1, which then leaves with the plate in one frame", witnesses: ["E-10"], cell: /presented dlg · (esc2|scrim)/, args: ["--part", "dlg"] },
  "e10-traillate": { why: "CK-20 (H9, REGISTRY §P8-7 item 2): the keyboard-engaged slider is promoted and placed over its place one animation frame late (no scroll listener), so on a scroll it trails its place by a frame. Chromium's film resolves one frame; WebKit's trail cell is REPORT by declaration", witnesses: ["E-10"], cell: /clipstale trail · (wheel-over|wheel-away|page) · engaged/, args: ["--part", "trail"], engines: ["chromium"] },
  "e10-glidescale": { why: "CK-20 (H9, C-A8's glidescale, REGISTRY §P8-7 item 8): the re-render glide's translate is written in painted px, not in the root's parent's units, so under a scale 0.8 scroller the glide starts 20 % short of where the control was painted", witnesses: ["E-10"], cell: /clipstale glidescale · scale/, args: ["--part", "glide"] },
  "e13-loupeplace": { why: "CK-25 (H9, C-E8's loupe place, REGISTRY §P8-7 item 5): the lens leaves its place without its ancestors' scale: under a scale 0.8 card the band magnifies ×2.0, not k max", witnesses: ["E-13"], cell: /clipstale loupe place · scale/ },
  "e13-loupeviewport": { why: "CK-25 (H9, C-E8's loupe viewport, REGISTRY §P8-7 item 5): the lens hangs above its track with no fallback, so with the card at the viewport's top it is drawn above the viewport, unpainted", witnesses: ["E-13"], cell: /clipstale loupe viewport/ },
  // H10 (pass 10; REGISTRY §P9-7 items 1-6, §P9-8.3 wave 1): the lens's clocks, its side change, its exit under a scroll, its film
  "e13-loupeclock": { why: "CK-25 (H10, REGISTRY §P9-7 item 3; C-E9 §1.3): the lens's placement correction sits inside its `transform`, so the raise's and the exit's own `scale` property multiplies it. WebKit's anchor already carries the ancestors' transform, so its correction is 0 and the plant would have nothing to multiply; the plant's anchor leaves a 40 px gap the correction closes, the gap Chromium's leaves under a scaled card, so the pinned edge leaves its track on both clocks in both engines", witnesses: ["E-13"], cell: /clipstale loupe clock · (enter|exit) · scale/ },
  "e13-exitfrozen": { why: "CK-25 (H10, REGISTRY §P9-7 item 5): the lens is not laid once the hold ends, so a scroll inside its exit leaves it behind. The cell is REPORT, so this is a control: it must not fail, and the line prints the separation H10.md cites", witnesses: ["E-13"], cell: /clipstale loupe exit scroll/, expect: "pass" },
  "e10-lensswap": { why: "CK-20 (H10, REGISTRY §P9-7 item 1; the pass-9 candidate's shape): the side is a boolean on the track's position each frame, with no travel and no hysteresis: the lens moves its whole span against the track in one frame and flips on any wobble at the line", witnesses: ["E-10"], cell: /loupe (side · (page|carry) · (none|scale)|wobble)/, args: ["--part", "lensside"] },
  "e10-lenszero": { why: "CK-20 (H10, REGISTRY §P9-7 item 2): the side travels on its row, but the correction is zeroed on the change's frame: one frame off. Its anchor leaves a 40 px gap the correction closes, so the zero reads in both engines", witnesses: ["E-10"], cell: /loupe side · (page|carry) · scale/, args: ["--part", "lensside"] },
  "e10-lensfast": { why: "CK-20 (H10): the side travels on the row's curve at a third of its clock, so its one-frame move passes what the row allows", witnesses: ["E-10"], cell: /loupe side · (page|carry) · (none|scale)/, args: ["--part", "lensside"] },
  "e10-lensnohyst": { why: "CK-20 (H10, REGISTRY §P9-7 item 1): the side travels on its row with no hysteresis: a ±3 px wobble about the line changes side on every crossing", witnesses: ["E-10"], cell: /loupe wobble/, args: ["--part", "lensside"] },
  "e10-lensfixed": { why: "CK-20 (H10, REGISTRY §P9-8.1): the side is fixed at the press: a hold that reaches the line mid-hold carries the lens out of the viewport", witnesses: ["E-10"], cell: /loupe side · (page|carry) · (none|scale)/, args: ["--part", "lensside"] },
  "e10-lensreducetravel": { why: "CK-10 × CK-20 (H10, REGISTRY §P9-8.1): under reduce the side change still travels", witnesses: ["E-10"], cell: /loupe side · reduce/, args: ["--part", "lensside"] },
  // H11 (pass 11; REGISTRY §P10-7 items 1, 2, 4, 5; §P10-8.3 wave 1): the lens under an ancestor zoom; the travel's tokens by parse
  "e10-lenszoom": { why: "CK-20 (H11, REGISTRY §P10-7 item 1; the pass-10 candidate's shape): the lens inherits its card's zoom, but its writes (the correction, the travel's span) are painted px written into its own zoomed CSS px, and its side test reads its unzoomed height against painted px; its anchor leaves a 40 painted px gap the correction closes, so the correction exists in both engines. Under zoom the travel moves span × zoom and the pinned edge lands 40 × (zoom − 1) px off", witnesses: ["E-10"], cell: /loupe side · (page|carry) · zoom/, args: ["--part", "lensside", "--cards", "zoom08,zoom125,zoom2"] },
  "e13-loupeclockzoom": { why: "CK-25 (H11, REGISTRY §P10-7 item 1): the same lens as e10-lenszoom on its own clocks: its correction written in painted px into its zoomed CSS px, so under a zoomed card the pinned edge sits 40 × (zoom − 1) px off its track on the raise and the exit", witnesses: ["E-13"], cell: /loupe clock · (enter|exit) · zoom/, args: ["--part", "clock"] },
  "e11-travelthrow": { why: "CK-21 (H11, REGISTRY §P10-7 items 2, 5; C-A10 §0.6): the travel (the lens's side change and the host's re-render glide) checks its easing token for presence, not parse, and hands any string to animate(): `nonsense` throws an uncaught TypeError out of the observer callback with no error naming the token", witnesses: ["E-11"], cell: /travel loud · --spring-press nonsense · (side|rerender)/, args: ["--part", "travel"] },
  // H12 (pass 12; REGISTRY §P11-7 items 1-5; §P11-8.3 wave 1): the travel's value family (CK-21) and the host glide's frame family (CK-20)
  "e11-travellist": { why: "CK-21 (H12, REGISTRY §P11-7 item 1; the pass-11 candidate's check): the travel asks CSS.supports on animation-timing-function, a list-valued property, so an easing list passes the check and animate(), which takes one easing, throws an uncaught TypeError with no error naming the token, on the lens's side change and on the host's re-render glide", witnesses: ["E-11"], cell: /travel loud · --spring-press (ease, linear|linear\(0, 1\), ease-in) · (side|rerender)/, args: ["--part", "travel"] },
  "e11-travelunit": { why: "CK-21 (H12, REGISTRY §P11-7 item 3; the pass-11 candidate's rowClockMs): the settle token is read as parseFloat × 1000 whatever its unit, so 210ms is read as 210 000 ms, silently, on the lens's travel, the host's glide and the release carry, while CSS reads it as 210 ms", witnesses: ["E-11"], cell: /travel loud · --spring-press-settle 210ms · (side|rerender|carry)/, args: ["--part", "travel"] },
  "e10-hostglideratio": { why: "CK-20 (H12, REGISTRY §P11-7 item 2; the pass-11 candidate's flowBox): the re-render glide brings each offset into the root's px through the zoom ratio alone, never through the transforms between the box and the root: a move outside a scaled ancestor lands (1 − scale) of the move off where the root was painted", witnesses: ["E-10"], cell: /hostglide · (outside|nested) · (scale 0\.8|zoom 1\.25 \+ scale 0\.8)/, args: ["--part", "hostglide"] },
  "e10-hostglideone": { why: "CK-20 (H12, REGISTRY §P11-7 item 5; C-A11's flowone, C-E11's hostzoom): the re-render glide sums the offsets with no ratio at all, so a positioned box in the offset chain outside a zoomed box carries its offset in the wrong px: the glide lands 40 × (zoom − 1) px off", witnesses: ["E-10"], cell: /hostglide · chain · zoom/, args: ["--part", "hostglide"] },
  "e10-hostglideframe": { why: "CK-20 (H12, REGISTRY §P11-7 item 2, P-E11 §1's risk; C-A11's glideframe as written): the glide reads the accumulated flow through each box's whole frame every frame, so an ancestor's running scale animation reads as a moved place and an unrelated mutation glides it", witnesses: ["E-10"], cell: /hostglide · animating/, args: ["--part", "hostglide"] },
  "e10-reachframe": { why: "CK-20 (H12, REGISTRY §P11-7 item 5; C-E11's roomframe): the reach's room is read as the pass-10 stage read it, the painted centre against the unzoomed width and not over the frame, so under a scale or a zoom the inline grow is not the gutter-capped figure", witnesses: ["E-10"], cell: /reach · (scale 0\.8|zoom 0\.8|zoom 1\.25|zoom 2|zoom 1\.25 \+ scale 0\.8)/, args: ["--part", "reach"] },
  // ── H13 (pass 13; REGISTRY §P12-7 items 1-6, §P12-8.3 wave 1): one or more per new cell, each a shape a candidate has had ──
  "e10-hostglidelayout": { why: "CK-20 (H13, REGISTRY §P12-7 items 2, 4; the pass-12 shape): the re-render glide from a layout model, each offset change through its box's frame (H12's clean fixture): a size-dependent paint map (a percent translate, a centred origin, the Dialog's -50% -50%), the engine's scroll anchoring and the scroll clamp are not in it", witnesses: ["E-10"], cell: /xf · (inside|below) · (translate|rotate 10deg centre)|dialog ·|scroll · (anchor|clamp)/, args: ["--part", "hg13", "--hg13", "xf,scroll,dialog"] },
  "e10-hostglidelevel": { why: "CK-20 (H13, REGISTRY §P12-7 item 2; the pass-12 ownScale): the map from a translate to its paint read as its axis lengths alone, so under a rotation, a skew or a rotating matrix the glide is laid level and starts off where the root was painted", witnesses: ["E-10"], cell: /xf · (outside|nested) · (rotate 10deg|skewX 15deg|matrix rotate)/, args: ["--part", "hg13", "--hg13", "xf"] },
  "e10-hostglidechild": { why: "CK-20 (H13, REGISTRY §P12-7 item 3; the pass-12 watchWorld): the glide hears childList records only, so a v-show, a class, a hidden attribute or a text node moving the host is an unglided cut", witnesses: ["E-10"], cell: /kind · (style|class|hidden|text)/, args: ["--part", "hg13", "--hg13", "kind"] },
  "e10-hostglidestale": { why: "CK-20 (H13; C-A11's glideframe class on the painted read): the place the glide starts from is read a frame behind, so an ancestor's running animation reads as a move and an unrelated mutation glides it", witnesses: ["E-10"], cell: /anim · (css-transition scale|waapi translate)/, args: ["--part", "hg13", "--hg13", "anim"] },
  "e10-reenter": { why: "CK-20 (H13, REGISTRY §P12-8.1: the stage's own writes never re-enter its observer; C-A12's allkinds, read as a cure, delivers its own style writes): the glide's observer hears every kind and is handed the fixture's own writes (the lens laid each frame, the reach, the engagement attributes)", witnesses: ["E-10"], cell: /reentry ·/, args: ["--part", "hg13", "--hg13", "reentry"] },
  "e11-narrowread": { why: "CK-21 (H13, REGISTRY §P12-7 item 1; H12's own fixture readers): every loud read takes only a plain dimension (a regex), narrower than its consumer's grammar: a math function, a case, an exponent, a sign or a comment CSS takes is refused by name, on default tokens too (the fixture's own calc() defaults)", witnesses: ["E-11"], cell: /travel loud · --spring-press-settle (calc|min|max|clamp|round|abs|2\.1e2ms|\+0\.21s|210MS)|census ·|token forms ·/, args: ["--part", "forms,census,tokens"] },
  "e11-typedom": { why: "CK-21 (H13, REGISTRY §P12-7 item 1; the pass-12 tokenOf): every loud read asks the Typed OM (CSSNumericValue.parse of the computed text), which WebKit 26.5 implements without math functions and Chromium 149 without round() and abs(): a form CSS takes is refused by name", witnesses: ["E-11"], cell: /travel loud · --spring-press-settle (calc|min|max|clamp|round|abs)|census ·|token forms ·/, args: ["--part", "forms,census,tokens"] },
  "e11-reachzero": { why: "CK-21 (H13, REGISTRY §P12-7 item 6; the pass-12 registered reach): a refused reach input leaves the registered reach at its initial 0, so the held slider paints inline ×0 while its message says the engagement paints nothing", witnesses: ["E-11"], cell: /reach input · .* nonsense/, args: ["--part", "reachin"] },
  "e10-lenslate": { why: "CK-20 (H10, REGISTRY §P9-7 item 6): the lens is placed one frame late, from the place read in the frame before, so on a scroll it trails its track by a tick. A film cell, graded in Chromium; WebKit's is REPORT (the plain anchored lens reads the same 8 px)", witnesses: ["E-10"], cell: /clipstale lensfilm · (none|scale)/, args: ["--part", "lensfilm"], engines: ["chromium"] },
  "e12-chipmute": { why: "CK-27 (H7, C-A6 §0): the chip that left the capsule answers neither hover nor press (0.0 % / 0.0 %): the elegant-reduction trap", witnesses: ["E-12"], cell: /fx chip answers/ },
  "e12-chipundeclared": { why: "CK-27 (H7): the chip paints its hover and press through literal rules and composes no declared engage-* class", witnesses: ["E-12"], cell: /fx chip answers/ },
  // H14 (D5 pass 14; P-E14 §S14-c, §S14-i): E-14's plants, each the rule a member's cell must catch, on the S14 stage (s14Stage)
  "e14-recorddriven": { why: "CK-20 (H14, finding 3; cand13's construction): the record-driven glide (a MutationObserver on every record kind, painted − now at the record) glides a script-animated card's every style write: the held root comes apart from what carries it", witnesses: ["E-14"], cell: /M5 script-animated ancestor · (ramp|sine)/, args: ["--only", "M5"] },
  "e14-chordstep": { why: "CK-20 (H14, M2; cand13's translateFor): the step solved on paint with the map read once, at 0 (a chord step), not re-asked at each iterate: outside a strong projective card it lands off where the root was painted", witnesses: ["E-14"], cell: /M2 perspective outside/, args: ["--only", "M2"] },
  "e14-rawsum": { why: "CK-20 (H14, Ch-F2/Y1): the place read as the raw offset sum, without each offsetParent's client edge: a link joining the chain moves it by the card's border and the onset is glided", witnesses: ["E-14"], cell: /M10 a link joins the chain · (an instant scale|an offset-path|will-change|contain|filter|perspective)/, args: ["--only", "M10"] },
  "e14-nosticky": { why: "CK-20 (H14, Ch-F3/Y3): a sticky link's offset change under a scroll read as layout: the stick is glided against the scroll", witnesses: ["E-14"], cell: /M23 G sticky top 0/, args: ["--only", "M23"] },
  "e14-norange": { why: "CK-20 (H14, Ch-F6/Y4; WebKit re-snaps): the scroll rule as written before the fold (an engine scroll only when the range shrank with the offset at its end): a re-snap on a growing range is carried, a cut", witnesses: ["E-14"], cell: /M24 .*align (center|end)/, args: ["--only", "M24"], engines: ["webkit"] },
  "e14-nozoom": { why: "CK-20 (H14, Ch-F9/Y2): a zoom change on an ancestor read through Q, whose units change with the zoom: the glide is the wrong size", witnesses: ["E-14"], cell: /M22 .*G's zoom/, args: ["--only", "M22"] },
  "e14-velnone": { why: "CK-20 (H14, b.6): no carried velocity, every step glided: a constant layout animation glides every frame and resists itself", witnesses: ["E-14"], cell: /M18 a constant margin ramp|M27 a train .*every frame/, args: ["--only", "M18,M27"] },
  "e14-velreset": { why: "CK-20 (H14, Ch-F7 (ii)/Y8): b.6 as written before the fold: every still frame resets the carried velocity and the chain's step is glided above 0.5 px, not its 1 px resolution, so a ramp slower than one layout px a frame restarts at each integer step", witnesses: ["E-14"], cell: /M27 a slow margin ramp/, args: ["--only", "M27"] },
  "e14-noimportant": { why: "CK-21/E-2 (H14, Ch-F5/X5): no check at the hold: an !important translate blocks every glide silently", witnesses: ["E-14"], cell: /M26 (sheet|inline|translate: none)/, args: ["--only", "M26"] },
  "e14-subtreewait": { why: "CK-16 (H14, Ch-F10/X11; cand13's leave()): the released host waits on every finite subtree animation, so a paused or view()-timelined one keeps the stage's loop running at rest", witnesses: ["E-14"], cell: /M29 .*(paused finite|view\(\) timeline|10 s finite)/, args: ["--only", "M29"] },
  "cap-ladderhit": { why: "CK-25 (H6, REGISTRY §P5-7 item 10): a transparent layer sits over the control, so the ladder's pointer never reaches it; a hit test that misses must FAIL the ladder as unread, never pass it as a hover that paints no rung", witnesses: ["CAP"], cell: /pop ladder fine/ },
};

const LENS_PLANT_GAP = 40; // e13-loupeclock, e10-lenszero: the gap their anchor leaves, so a correction exists in WebKit too (its anchor carries the ancestors' transform)
const CONTROL_GATES = ["E-2", "E-8", "E-9"];
// H8 (CK-25): the fixture slider's loupe, shown while held (data-held): a housing, its window, the magnified band (the
// track at k max, its ends dissolving), the fill to the window's centre
const FX_LOUPE = { lens: ".fx-loupe", window: ".fx-loupe-window", clone: ".fx-loupe-clone", fill: ".fx-loupe-fill", track: ".fx-slider" };
export const FIXTURE_INDEX = {
  // H5: pop carries C-A4's rebound (E-10, its light seat the .flash) and the ladder (CAP)
  // H8: CK-21's crest input, planted on <html> before the first script (C-A7's crestinput)
  pop: { gates: [...CONTROL_GATES, "E-5", "E-10", "E-11"], key: "Space", target: ".ctl", rebound: true, light: ".flash", ladder: true, failLoud: [{ token: "--fx-commit-crest", value: "nonsense", act: "commit", html: true }], forms: [{ token: "--engage-control-engage-release", kind: "time", act: "commit" }, { token: "--engage-control-engage-attack", kind: "time", act: "commit" }] },
  // H6: travel carries the ladder too (capture.mjs reads it as a ladder-only scene: the path the library's collapsible
  // and menu take)
  travel: { gates: CONTROL_GATES, key: "ArrowRight", target: '.seg[data-v="b"]', ladder: true },
  rest: { gates: CONTROL_GATES, key: "Space", target: ".ctl" },
  // H3: a stateless control (a counter, no model): E-2 drives its programmatic commit as element.click()
  act: { gates: CONTROL_GATES, key: "Space", target: ".ctl", stateless: true },
  // H6: `reads: 5` (CK-05: E-4's fling read five times, every read must pass)
  // H12: `gutter` (E-10's reach cell: the token the reach's gutter is read from; the library's is --space-section, the default)
  slider: { gates: ["E-3", "E-4", "E-7", "E-9", "E-10", "E-11", "E-12", "E-13"], loupe: FX_LOUPE, gutter: "--fx-gutter", key: "ArrowRight", veil: ".fx-veil", engaged: "[data-held], [data-kbd]", floor: ["wheel", "anchor"], reads: 5, failLoud: [{ token: "--fx-scale-engage", value: "nonsense", act: "kbd" }], grow: "--fx-scale-engage", forms: [{ token: "--fx-scale-engage", kind: "number", act: "hold" }, { token: "--fx-gutter", kind: "length", act: "hold" }] },
  // H4: the fixture slider marks its engagement as data-held (the hand) or data-kbd (the keyboard)
  slider2: { gates: ["E-10"], veil: ".fx-veil", engaged: "[data-held], [data-kbd]", pair: ['.fx-slider[data-n="A"]', '.fx-slider[data-n="B"]'] },
  // H5: C-E4's stale place (a paragraph that rewraps, a spacer, the slider, a ticker below)
  restale: { gates: ["E-10"], stale: true, engaged: "[data-held], [data-kbd]" },
  // H6 (CK-20): C-E5's clipped stale place: the slider inside a 120 px clipping scroller
  // H8: the loupe (E-13's edge cell; E-10's touch clip cells hide it) and the feather (a mask on the scroller)
  clipstale: { gates: ["E-10", "E-13"], veil: ".fx-veil", loupe: FX_LOUPE, feather: { cls: ["fx-feather"], attrs: [] }, clip: { box: '[data-t="box"]', rest: '[data-t="slider-a"]', spacer: 60 }, engaged: "[data-held], [data-kbd]" },
  // H6 (CK-10, O-100 R-1): a presented dialog whose opacity fade is its light leg
  // H9 (CK-20, C-A8's dlg): `&slider=1` puts a fixture slider in the plate (E-10's dlg cells); dismissed by Escape when no
  // slider was engaged at the key, or by a click outside the plate: the plate fades on the release clock, then leaves
  presented: { gates: [], fade: { plate: ".fx-pdialog", scrim: ".fx-pscrim" }, dlg: { q: { slider: "1" }, plate: ".fx-pdialog", from: '[data-t="dlg-from"]', root: '[data-t="dlg-slider"] .fx-slider', thumb: '[data-t="dlg-slider"] .fx-thumb', engaged: "[data-held], [data-kbd]" } },
  // H6 (CK-11, CK-14, CK-27): every composer of the capsule class the source tree names, by directory
  // H7: quiet (kappa's press read with pointerdown withheld, the select's class); answers (the chip a capsule left)
  capsule: { gates: ["E-12"], floor: ["capsule"], caps: { kappa: '[data-t="cap-kappa"]' }, quiet: ["kappa"], answers: { "fx chip": '[data-t="cap-chipx"]' } },
  vsheet: { gates: ["E-4"], axis: "y", dir: -1, detents: true, fixed: ".fx-sheet" },
  strip: { gates: ["E-4"], input: "touch", dir: -1, platform: true },
  modal: { gates: ["E-7"] },
  s6: { gates: ["E-6"], subject: "the fixture's switch track" },
  passive: { gates: [] },
  field: { gates: [] },
  ambient: { gates: [] },
  // H4, E-12: a coarse trigger with a transparent ::after hit-slop beside a paint-only ::after seat the forced-colours
  // arm may remove (CK-14, CK-27); the rest loop that pauses off-screen (CK-16)
  slop: { gates: ["E-12"], floor: ["slop"], census: false, slop: ".trig" },
  restloop: { gates: ["E-12"], floor: ["rest"] },
};

// e11-noise: the slider's grow figure on successive slider loads of one server (E-11 loads clean, clean, planted, then
// to confirm clean, planted): the first planted read leaves the clean pair's spread, the confirming one does not
const E11_NOISE = [1.060, 1.061, 1.066, 1.054, 1.060]; let e11n = 0;
// e5-flaky (H4): every third page load of the press scene sags its held light (E-5 takes three holds on three loads)
let e5n = 0;
// e4-carryflaky (H6): E-4 loads the slider fling, still, fling, still, … (five reads, then PRM); the fifth load is the
// third fling, which drops its velocity
let e4n = 0;
// e4-slowdrive (H8): the first slider page only
let e4s = 0;
export function fixturePage(params, fault = "") {
  const scene = params.get("scene") ?? "__index";
  const noise = fault === "e11-noise" && scene === "slider" ? E11_NOISE[e11n++ % E11_NOISE.length] : null;
  const carryDrop = fault === "e4-carryflaky" && scene === "slider" && e4n++ === 4;
  // H8 e4-slowdrive: the first slider page (read 1's fling) hides its drive from the page's capture listeners and carries 0
  const slowDrive = fault === "e4-slowdrive" && scene === "slider" && e4s++ === 0;
  const dark = params.get("theme") === "dark";
  const on = params.get("on") === "1";
  const defer = params.get("defer") === "1";
  const phone = params.get("phone") === "1";
  const dlgSlider = params.get("slider") === "1";
  const run = +(params.get("run") ?? 0);
  const F = (id) => fault === id;
  const nopress = F("e1-dead") || F("e5-hover");
  const sag = fault === "e5-flaky" && scene === "pop" && e5n++ % 3 === 2;
  // H5: the press keys on the door's press mark alone (written on pointerdown/touchstart, cleared on the press's end), as
  // P-A4 keys the library's presses; e5-active keys it on :active alone (C-A4's P7: Chromium sets a touch's :active 175-200
  // ms late and holds it ~150 ms past a tap, so a commit light on a near-white face rides the press fill back up and is
  // absorbed in paint), e5-late on a mark written 190 ms late
  const PRESS = F("e5-active") ? ":active" : "[data-press]";

  const members = { alpha: "pressed", beta: "held", gamma: "static", delta: "static", eta: "field", theta: "ambient" };
  if (F("e1-undeclared")) delete members.delta;
  if (F("e1-latch")) members.epsilon = "static";
  const classes = {
    pressed: { rung: "press", exemplar: "alpha" }, held: { rung: "engaged", exemplar: "beta" },
    field: { rung: "hover", exemplar: "eta" }, ambient: { rung: "rest", exemplar: "theta" },
    static: { rung: null, reason: F("e1-norung") ? "" : "no input of its own: its engagement is the host surface's" },
  };
  const decl = F("e1-stale") ? { note: "order differs", members: Object.fromEntries(Object.entries(members).reverse()), classes } : { members, classes };
  const dirs = ["alpha", "beta", "delta", "eta", "gamma", "theta", ...(F("e1-latch") ? ["epsilon"] : [])];
  const E = {
    kind: "fixture", scene, index: FIXTURE_INDEX, dirs, decl,
    sceneOfDir: { alpha: "pop", beta: "slider", eta: "field", theta: "ambient" }, rungs: ["rest", "hover", "press", "engaged", "modal"],
    envelopes: [{ role: "press-drain", attackMs: 55, releaseMs: 120 }, { role: "control-engage", attackMs: 60, releaseMs: 180 }],
  };
  const ctlClass = F("e1-unadopted") ? "" : F("e1-wrongclass") ? "engage-chosen" : F("e1-double") ? "engage-pressed engage-chosen" : "engage-pressed";

  const SPRING = "linear(0, 0.57 18%, 0.94 32%, 1.06 45%, 1.03 60%, 0.99 75%, 1)";
  const css = `
@property --rung-class { syntax: "<custom-ident>"; inherits: false; initial-value: unclassed; }
${F("e11-reachzero") ? '@property --fx-reach { syntax: "<number>"; inherits: false; initial-value: 0; }' : ""}
.engage-pressed { --rung-class: pressed; } .engage-chosen { --rung-class: chosen; } .engage-held { --rung-class: held; }
.engage-static { --rung-class: static; } .engage-field { --rung-class: field; } .engage-ambient { --rung-class: ambient; }
:root { --spring-press-duration: 350ms; --spring-press: ${SPRING}; --spring-press-settle: calc(0.175s * 2);
  --engage-press-drain-attack: ${F("e8-drift") ? 56 : 55}ms; --engage-press-drain-release: 120ms;
  --engage-control-engage-attack: 60ms; --engage-control-engage-release: ${F("e8-units") ? ".18s" : "calc(90ms * 2)"};
  --fx-scale-engage: 1.06; --fx-commit-crest: 0.35; --fx-gutter: 16px;
  --bg: #f4f4f6; --ink: #111; --ctl: #d8dbe2; --ctl-hover: #cfd3dc; --ctl-press: #b9bfcc; --accent: #3b6cf0; }
.dark { --bg: #15161a; --ink: #eee; --ctl: #33363f; --ctl-hover: #3b3f49; --ctl-press: #4b505c; }
body { margin: 0; background: var(--bg); color: var(--ink); font: 15px system-ui; }
main { min-height: 100vh; padding: ${phone ? "48px 16px" : "48px"}; box-sizing: border-box; }
.ctl, .seg { display: inline-flex; align-items: center; justify-content: center; height: 40px; padding: 0 18px; border-radius: 20px;
  background-color: var(--ctl); user-select: none; cursor: pointer; position: relative;
  transition: scale ${F("e8-literal") ? "230ms" : "var(--spring-press-duration)"} var(--spring-press), background-color var(--engage-press-drain-attack) linear; }
.ctl:hover, .seg:hover { background-color: var(--ctl-hover); }
${nopress ? "" : `.ctl${PRESS}, .seg${PRESS} { scale: 0.96; background-color: var(--ctl-press); }`}
${F("cap-ladder") ? `.ctl${PRESS} { background-color: ${dark ? "#2e3139" : "#e6e8ee"}; }` : ""}
${F("e5-decay") || sag ? `.ctl${PRESS} { animation: fx-sag 500ms linear forwards; } @keyframes fx-sag { to { background-color: var(--ctl); } }` : ""}
.ctl[data-state="on"] { color: #fff; background-color: var(--accent); }
.rest .ctl[data-state="on"] { scale: 1.05; }
.flash { position: absolute; inset: 0; border-radius: inherit; background: #fff; opacity: 0; pointer-events: none; }
button.ctl { border: 0; font: inherit; color: inherit; }
/* H3: the one-frame arming covers the controls' own transitions too (F-7: A's seat transitions gated until a frame after
   mount): a model that arrives during the mount lands on its committed rest (the rest scene's 1.05) without a glide */
#stage:not(.armed) :is(.ctl, .seg) { transition: none !important; }
${F("e2-arrivalflush") ? `.flash { transition: opacity var(--engage-control-engage-release) linear; } .flash.lit { opacity: 0.35; transition-duration: var(--engage-control-engage-attack); }` : ""}
/* H3: the library's PRM fallback, modelled (a11y-overrides.css: every transition zeroed under reduce by a * rule with
   !important), and the reduce arm's light kept by an AUTHORIZATION row, a class rule that outranks it (CP's
   css-prm-over-css.patch). E-8's PRM arm must read the authorized clock as a token (pass 2 read it minted) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0s !important; }
  ${F("e9-scale") ? "" : `.ctl${PRESS}, .seg${PRESS}, .rest .ctl[data-state="on"]${PRESS} { scale: 1; }`}
  .ctl, .seg { transition: background-color var(--engage-press-drain-attack) linear; transition-duration: ${F("e8-prmliteral") ? "100ms" : "var(--engage-press-drain-attack)"} !important; }
  ${F("e9-dark") ? `.ctl${PRESS}, .seg${PRESS} { background-color: var(--ctl-hover); }` : ""}
  ${F("e9-illegible") ? `.ctl[data-state="on"] { background-color: var(--ctl); color: var(--ink); }` : ""}
}
.segs { position: relative; display: inline-flex; gap: 0; padding: 4px; border-radius: 24px; background: var(--ctl); }
.seg { background-color: transparent; position: relative; z-index: 1; width: 78px; padding: 0; }
.ind { position: absolute; left: 4px; top: 4px; width: 78px; height: 40px; border-radius: 20px; background: #fff8; z-index: 0; }
.fx-slider { position: relative; height: 20px; width: ${phone ? (F("e3-gutter") ? "100%" : "300px") : "360px"}; ${phone ? "margin: 0 auto;" : ""} border-radius: 10px; background: var(--ctl);
  transition: scale var(--spring-press-duration) var(--spring-press); }
.fx-slider + .fx-slider { margin-top: 40px; }
.fx-slider${F("e3-still") ? ".never" : F("e3-kbd") ? ":where(:active, [data-held])" : ":where(:active, [data-held], [data-kbd])"} { scale: ${noise ? String(noise) : F("e11-unread") ? "1.06" : F("e3-blockgrow") && phone ? "1 1.06" : F("e11-reachzero") ? "min(var(--fx-scale-engage), var(--fx-reach)) var(--fx-scale-engage)" : "min(var(--fx-scale-engage), var(--fx-reach, 99)) var(--fx-scale-engage)"}; }
.fx-slider[data-held] { cursor: grabbing; }
.fx-slider.snap { transition: none; }
.fx-slider.pinned { position: fixed; }
.fx-thumb { position: absolute; top: -4px; left: 0; width: 28px; height: 28px; margin-left: -14px; border-radius: 14px; background: #fff; box-shadow: 0 1px 3px #0005; touch-action: none; ${F("e4-ghostbody") ? "opacity: 0;" : ""} }
.fx-thumb:active { box-shadow: 0 0 0 6px #3b6cf055; }
${F("e3-prmgrow") ? "" : "@media (prefers-reduced-motion: reduce) { .fx-slider:where(:active, [data-held], [data-kbd]) { scale: 1; } .fx-slider { transition: none; } }"}
${F("e3-prmdark") ? "@media (prefers-reduced-motion: reduce) { .fx-thumb:active { box-shadow: 0 1px 3px #0005; } }" : ""}
.fx-veil { position: fixed; inset: 0; pointer-events: none; background: #0001; opacity: 0; transition: opacity var(--engage-control-engage-release) linear; }
.fx-veil.on { opacity: 1; }
.fx-scrim { position: fixed; inset: 0; background: #0006; }
.fx-dialog { position: fixed; left: 50%; top: 50%; translate: -50% -50%; width: 280px; padding: 24px; border-radius: 20px; background: var(--bg); }
.fx-switch { display: inline-block; width: 52px; height: 32px; border-radius: 16px; background: var(--ctl); position: relative; }
.fx-switch::after { content: ""; position: absolute; left: 3px; top: 3px; width: 26px; height: 26px; border-radius: 13px; background: #fff; }
@keyframes fx-breathe { 50% { scale: 1.012; } }
@keyframes fx-dim { 50% { opacity: 0.9; } }
@keyframes fx-wide { 50% { width: 54px; } }
@keyframes fx-spin { to { rotate: 360deg; } }
@keyframes fx-saw { from { scale: 1; } to { scale: 1.012; } }
.fx-vroot { position: fixed; inset: 0; pointer-events: none; }
.fx-sheet { position: ${F("e4-inflow") ? "relative" : "fixed"}; bottom: 0; left: 50%; width: 300px; margin-left: -150px; border-radius: 20px 20px 0 0; background: var(--ctl); }
.fx-grip { width: 120px; height: 28px; margin: 0 auto; border-radius: 14px; background: #fff8; touch-action: none; }
.fx-strip { width: 600px; height: 160px; display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
.fx-cell { flex: 0 0 100%; height: 160px; scroll-snap-align: start; scroll-snap-stop: always; background: var(--ctl); }
.fx-cell + .fx-cell { background: var(--ctl-press); }
.fx-switch { animation: ${F("e6-absent") ? "none" : F("e6-dim") ? "fx-dim 4s ease-in-out infinite" : F("e6-layout") ? "fx-wide 4s ease-in-out infinite" : F("e6-fast") ? "fx-breathe 600ms ease-in-out infinite" : F("e6-spin") ? "fx-spin 4s linear infinite" : F("e6-saw") ? "fx-saw 4s linear infinite" : "fx-breathe 4s ease-in-out infinite"}; }
${F("e6-prm") ? "" : "@media (prefers-reduced-motion: reduce) { .fx-switch { animation: none; } }"}
.card { display: block; width: 240px; padding: 16px; border-radius: 16px; background: var(--ctl); }
.fx-field { width: 240px; height: 36px; border-radius: 10px; border: 1px solid #8884; background: var(--bg); color: var(--ink); padding: 0 10px; }
${F("e1-fielddead") ? "" : ".fx-field:hover { border-color: var(--accent); background: var(--ctl-hover); }"}
/* H4: CK-14/CK-27, the coarse trigger's transparent hit-slop and a paint-only seat the forced-colours arm removes */
.trig { position: relative; inline-size: 32px; block-size: 24px; padding: 0; border: 0; border-radius: 8px; background: var(--ctl); font: inherit; color: inherit; }
@media (pointer: coarse) { .trig::after { content: ""; position: absolute; left: 50%; top: 50%; inline-size: max(100%, 44px); block-size: max(100%, 44px); transform: translate(-50%, -50%); } }
.seatdemo { position: relative; display: inline-block; margin-left: 48px; padding: 4px 10px; border-radius: 8px; background: var(--ctl); }
.seatdemo::after { content: ""; position: absolute; inset: 0; border-radius: inherit; background: #fff4; pointer-events: none; }
${F("e12-fcreach") ? `.ctl::after { content: ""; position: absolute; inset: -6px; border-radius: inherit; }` : ""}
@media (forced-colors: active) { .seatdemo::after { display: none; } ${F("e12-fcslop") ? ".trig::after { display: none; }" : ""} ${F("e12-fcreach") ? ".ctl::after { display: none; }" : ""} }
/* H4: CK-16, a loop that runs at rest on a compositor property and pauses off-screen */
.loop { width: 120px; height: 16px; border-radius: 8px; background: var(--ctl); animation: ${F("e12-restlayout") ? "fx-shimw" : "fx-shim"} 1.2s ease-in-out infinite; }
@keyframes fx-shim { 50% { opacity: 0.5; } }
@keyframes fx-shimw { 50% { width: 140px; } }
.fx-ticker { height: 20px; overflow: hidden; }
.fx-para { margin: 12px 0; max-width: 600px; }
.fx-amb { width: 320px; height: 160px; border-radius: 16px; background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), #3b6cf0 0, #3b6cf000 60%), var(--ctl); }
/* H6: the stale cells' wrapper (the slider follows its width), the clipping scroller, the presented dialog, the capsule
   composer, and cap-ladderhit's layer over the control */
[data-t="wrap"] { width: 360px; } [data-t="wrap"] .fx-slider { width: 100%; }
.fx-box { width: 400px; height: 120px; overflow: auto; overflow-anchor: none; border: 1px solid #8884; }
/* H8: the feather (a mask on the scroller, FadingScroll's class); the loupe (fixed: it leaves its place, so no scroller
   clips it; e13-loupecut rides inside the control's box) */
.fx-feather { mask-image: linear-gradient(to bottom, transparent 0, #000 40px, #000 calc(100% - 40px), transparent 100%); }
.fx-loupe { position: ${F("e13-loupecut") ? "absolute" : "fixed"}; z-index: 10; width: 120px; height: 60px; box-sizing: border-box; border-radius: 30px; border: 1px solid #9aa0ac; background: #fdfdfe; pointer-events: none; --loupe-k-max: 1.6;
  scale: 0.13; opacity: 0; transition: scale var(--spring-press-duration) var(--spring-press), opacity var(--engage-press-drain-release) linear; }
.fx-loupe.anch { position-anchor: --fx-lens; left: anchor(center); margin-left: -60px; bottom: anchor(top); }
.fx-loupe.anch.below { bottom: auto; top: anchor(bottom); }
${F("e13-loupeclock") || F("e10-lenszero") ? ".fx-loupe.anch { margin-bottom: " + LENS_PLANT_GAP + "px; } .fx-loupe.anch.below { margin-bottom: 0; margin-top: " + LENS_PLANT_GAP + "px; }" : ""}
.fx-lensprobe { position: fixed; width: 0; height: 0; pointer-events: none; position-anchor: --fx-lens; left: anchor(center); top: anchor(top); }
.fx-lensprobe.b { top: anchor(bottom); }
.fx-loupe.on { scale: 1; opacity: 1; }
.fx-loupe.exit { scale: 0.13; opacity: 0; transition: scale var(--engage-control-engage-release) linear, opacity var(--engage-control-engage-release) linear; }
@media (prefers-reduced-motion: reduce) { .fx-loupe, .fx-loupe.exit { transition: none; } }
.dark .fx-loupe { background: #24262c; border-color: #5a5f6b; }
.fx-loupe-window { position: absolute; left: 6px; top: 6px; width: 106px; height: 46px; border-radius: 23px; overflow: hidden; }
.fx-loupe-clone { position: absolute; left: 0; right: 0; top: 50%; translate: 0 -50%; background: var(--ctl);${F("e13-loupemark") ? "" : " mask-image: linear-gradient(to right, transparent 0, #000 36px, #000 calc(100% - 36px), transparent 100%);"} }
.fx-loupe-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: var(--accent); }
${F("e13-loupemark") ? ".fx-loupe-mark { position: absolute; left: calc(50% - 1px); top: 0; bottom: 0; width: 2px; background: #000; }" : ""}
.fx-pscrim { position: fixed; inset: 0; background: #0003; pointer-events: none; }
.fx-pdialog { position: fixed; left: 50%; top: 50%; translate: -50% -50%; width: 280px; padding: 24px; border-radius: 20px; background: var(--bg); opacity: 0; scale: 0.95;
  transition: opacity var(--engage-control-engage-release) linear, scale var(--spring-press-duration) var(--spring-press); }
.fx-pdialog.open { opacity: 1; scale: 1; }
/* H9: the slider in the presented plate (E-10 dlg); e10-featherunder's second mask on the engaged body under the feather */
[data-t="dlg-slider"] .fx-slider { width: 220px; }
${F("e10-featherunder") ? ".fx-feather .fx-slider:is([data-held], [data-kbd]) { mask-image: linear-gradient(#0007, #0007); }" : ""}
@media (prefers-reduced-motion: reduce) {
  ${F("e9-fadespatial") ? "" : ".fx-pdialog { scale: 1; }"}
  ${F("e9-fadecut") ? "" : `.fx-pdialog { transition: opacity var(--engage-control-engage-release) linear${F("e9-fadespatial") ? ", scale var(--spring-press-duration) linear" : ""}; transition-duration: var(--engage-control-engage-release)${F("e9-fadespatial") ? ", var(--spring-press-duration)" : ""} !important; }`}
}
.capx { display: inline-flex; align-items: center; height: 32px; padding: 0 14px; border: 0; border-radius: 16px; background-color: var(--ctl); font: inherit; color: inherit; }
.capx:hover { background-color: var(--ctl-hover); }
${F("e12-capsulelift") ? ".capx:hover { scale: 1.015; }" : ""}
.fxchip { display: inline-flex; align-items: center; height: 32px; padding: 0 14px; border: 0; border-radius: 16px; background-color: var(--ctl); font: inherit; color: inherit; }
${F("e12-chipmute") ? "" : `.fxchip:hover { background-color: ${F("e12-chipfaint") ? "color-mix(in srgb, var(--ctl) 99.8%, #000)" : "var(--ctl-hover)"}; } .fxchip[data-press] { background-color: var(--ctl-press); }`}
${F("e12-capsulesnap") ? ".capx:active { scale: 0.97; }" : ""}
.capx.lat { scale: 1.015; }
${F("cap-ladderhit") ? ".fx-cover { position: absolute; inset: -8px; z-index: 5; }" : ""}
`;

  const ctl = (extra = "") => `<div class="ctl ${ctlClass}" role="switch" tabindex="0" aria-checked="${on}" data-state="${on ? "on" : "off"}" data-member="alpha" data-e="target"${extra}>Probe<span class="flash"></span></div>`;
  const slider = (n = "") => `<div class="fx-slider${F("e1-nullhost") ? "" : " engage-held"}" data-member="beta" data-e="${n ? "" : "root target"}" data-n="${n}"><div class="fx-thumb" role="slider" tabindex="0" aria-label="Probe${n}" aria-valuenow="40" data-e="${n ? "" : "thumb body"}"></div></div>`;
  let body = "";
  if (scene === "pop" || scene === "rest") body = F("e1-absent") && scene === "pop" ? `<div class="${scene}"><div class="ctl ${ctlClass}" data-member="alpha">Probe</div></div>` : F("cap-ladderhit") && scene === "pop" ? `<div class="${scene}" style="position:relative;display:inline-block">${ctl()}<span class="fx-cover" data-t="cover"></span></div>` : `<div class="${scene}">${ctl()}</div>`;
  else if (scene === "act") body = `<button class="ctl ${ctlClass}" type="button" data-member="alpha" data-e="target" data-handler>Act<span class="flash"></span></button>`;
  else if (scene === "travel") body = `<div class="segs" role="radiogroup" aria-label="Probe" data-member="alpha"><span class="ind" data-e="body"></span>${["a", "b", "c"].map((v) => `<div class="seg ${ctlClass}" role="radio" data-v="${v}" aria-checked="${v === (on ? "b" : "a")}" tabindex="${v === (on ? "b" : "a") ? 0 : -1}"${v === "b" ? ' data-e="target"' : ""}>${v.toUpperCase()}<span class="flash"></span></div>`).join("")}</div>`;
  else if (scene === "slider") body = `<div id="spacer"></div><div id="slot"></div>${slider()}`;
  else if (scene === "restale") body = `<p class="fx-para">The world above the engaged control: a paragraph long enough to rewrap when the viewport narrows, so that a resize moves the control below it with no mutation of the document at all.</p><div id="spacer"></div><div data-t="wrap">${slider()}</div><div class="fx-ticker" id="ticker"></div>`;
  else if (scene === "clipstale") body = `<p class="fx-para">A scrolling card holds the control; the card's edge clips it.</p><div class="fx-box" data-t="box"><div style="height:200px"></div><div id="spacer" data-t="spacer" style="height:60px"></div><div data-t="slider-a" style="padding:0 20px">${slider()}</div><div style="height:400px"></div></div><div class="fx-ticker" id="ticker"></div>`;
  else if (scene === "presented") body = `<div class="fx-pscrim" data-t="scrim"></div><div class="fx-pdialog open" role="dialog" aria-label="Probe" data-e="target">Body${dlgSlider ? `<button type="button" data-t="dlg-from">Act</button><p data-t="dlg-para" style="margin:8px 0;font:14px/20px system-ui">A paragraph above the slider, inside the plate.</p><div data-t="dlg-slider" style="padding:16px 0">${slider("D")}</div>` : ""}</div>`;
  else if (scene === "capsule") body = `<div role="group" aria-label="Presets" style="display:flex;gap:12px"><button class="capx glass-capsule-hover" type="button" data-t="cap-kappa" aria-pressed="false"${F("e12-openpop") ? ' data-state="closed" aria-expanded="false"' : ""}>Kappa</button><button class="fxchip${F("e12-chipundeclared") ? "" : " engage-chosen"}" type="button" data-t="cap-chipx" aria-pressed="false">Chip</button></div>`;
  else if (scene === "slider2") body = `${slider("A")}${slider("B")}`;
  else if (scene === "modal") body = `<div class="fx-scrim" data-state="open" data-e="veil"${F("e7-veil") ? " data-engaged" : ""}></div><div class="fx-dialog" role="dialog" aria-label="Probe" data-e="modal">Body</div>`;
  else if (scene === "s6") body = `<span class="fx-switch" role="switch" aria-checked="false" aria-label="Probe" data-e="target"></span>`;
  else if (scene === "passive") body = `<hr class="engage-static" data-member="gamma" data-e="target"><div class="card engage-static" data-member="delta"${F("e1-staticfocus") ? ' role="option" tabindex="0" data-handler' : F("e1-ownhandler") ? " data-handler" : F("e1-libhandler") ? ' data-handler="lib"' : ""}>Card</div>${F("e1-unrendered") ? '<i data-t="unrendered" title="Error: the member threw in setup"></i>' : ""}`;
  else if (scene === "field") body = `<input class="fx-field engage-field" data-member="eta" data-e="target" aria-label="Probe" data-handler>`;
  else if (scene === "ambient") body = `<div class="fx-amb engage-ambient" data-member="theta" data-e="target"></div>`;
  else if (scene === "slop") body = `<button class="trig" type="button" data-t="trig" aria-label="Menu">⋯</button><span class="seatdemo" data-t="seat">seat</span>`;
  else if (scene === "restloop") body = `<div class="loop" data-t="loop"></div>`;
  else if (scene === "vsheet") body = `<div class="fx-vroot" data-e="root"></div><div class="fx-sheet"><div class="fx-grip" role="slider" aria-label="Probe" aria-valuenow="25" tabindex="0" data-e="thumb"></div></div>`;
  else if (scene === "strip") body = `<div class="fx-strip" data-e="root">${[0, 1, 2, 3].map((i) => `<div class="fx-cell"${i ? "" : ' data-e="thumb"'}></div>`).join("")}</div>`;

  // H6 (CK-21): the fixture's loud clock read covers every --engage-* clock its own stylesheet transitions on, read from
  // the stylesheet text (no hand-kept list); e11-rename's list is the one a rename left behind (the control-engage pair
  // dropped, C-E5 §0.2's class)
  const CLOCKS = [...new Set([...css.matchAll(/(?:transition|animation)[\w-]*\s*:[^;{}]*/g)].flatMap((m) => [...m[0].matchAll(/var\((--engage-[\w-]+)\)/g)].map((x) => x[1])))].filter((t) => !(F("e11-rename") && t.startsWith("--engage-control-engage-")));
  const script = `
let OWN = () => {}; const FAULT = ${JSON.stringify(fault)}; const SCENE = ${JSON.stringify(scene)}; const DLGS = ${dlgSlider}; const DEFER = ${defer}; const ON = ${on}; const RUN = ${run}; const PHONE = ${phone};
const DROP = ${carryDrop || slowDrive}; const SLOWDRIVE = ${slowDrive}; const CLOCKS = ${JSON.stringify(CLOCKS)};
// H6 (CK-21): every clock the stylesheet transitions on is read loudly at mount and on every act
// H13 (REGISTRY §P12-7 item 1; §P12-8.1 (b)): every token is read as its consumer computes it. Its computed text is checked against the
// consumer property's own grammar (CSS.supports of the property on calc((text) * 1) for a single <time> or <number>, of the property
// itself for a <length>) and its value is read from a probe that computes that property: one <time> (a list, a word, a bare number refused),
// math functions, case, exponent, sign and comments taken exactly as CSS takes them. Plants: e11-narrowread (a plain dimension only:
// H12's regexes), e11-typedom (CSSNumericValue.parse of the computed text: the pass-12 tokenOf)
function probeOf(el) { if (!el._fxProbe) { const p = document.createElement("span"); p.setAttribute("data-fx-own", ""); p.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;visibility:hidden;pointer-events:none"; el.appendChild(p); el._fxProbe = p; OWN(); } return el._fxProbe; }
const PROP = { time: "transition-duration", number: "scale", length: "padding-left" }; // the probe writes !important: the reduce arm's * { transition-duration: 0s !important } would read every clock as 0 (the H13 self-test, e10-lensreducetravel)
function readTok(el, token, kind) {
  const raw = getComputedStyle(el).getPropertyValue(token).trim();
  if (FAULT === "e11-narrowread") { const m = kind === "number" ? /^(\\d*\\.?\\d+)$/.exec(raw) : kind === "length" ? /^(\\d*\\.?\\d+)px$/.exec(raw) : /^(\\d*\\.?\\d+)(ms|s)$/.exec(raw); return m ? Number.parseFloat(m[1]) * (m[2] === "s" ? 1000 : 1) : NaN; }
  if (FAULT === "e11-typedom") { try { return CSSNumericValue.parse(raw).to(kind === "time" ? "ms" : kind === "length" ? "px" : "number").value; } catch { return NaN; } }
  const prop = PROP[kind]; const text = kind === "length" ? raw : "calc((" + raw + ") * 1)";
  if (raw === "" || !CSS.supports(prop, text)) return NaN;
  const p = el === document.documentElement ? probeOf(document.body) : probeOf(el); p.style.setProperty(prop, kind === "length" ? "var(" + token + ")" : "calc((var(" + token + ")) * 1)", "important"); const v = getComputedStyle(p).getPropertyValue(prop).trim(); p.style.removeProperty(prop); OWN();
  return kind === "time" ? Number.parseFloat(v) * (/ms$/.test(v) ? 1 : 1000) : Number.parseFloat(v);
}
function checkClocks() {
  for (const t of CLOCKS) { const v = readTok(document.documentElement, t, "time"); if (!(v >= 0) || !Number.isFinite(v)) console.error("[fixture] " + t + " is unreadable (" + JSON.stringify(getComputedStyle(document.documentElement).getPropertyValue(t).trim()) + "): the clock it times cannot run"); }
}
const E = ${JSON.stringify(E)};
const prm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
// the hand stopped before the release: the release came more than 700 ms after the last move. E-4's still release
// waits 1000 ms; a fling's release follows its last move by the harness's latency, which stayed under 700 ms at every
// load read here. Fixed cutoffs of 200 and 400 ms misread loaded flings as still (load 171-492), and a cutoff scaled to
// the move cadence misread WebKit, which can deliver the three moves within 1 ms (pass-2/H2.md §2.1)
const stale = (hist, now) => now - hist.at(-1).t > 700;
// the scene's model, readable before the deferred mount renders (CK-03's arrival reads the state across it)
let model = ON, selIdx = ON ? 1 : 0, count = 0;
const tok = (n) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(n));
const ms = (n) => readTok(document.documentElement, n, "time");
const SPRING = ${JSON.stringify(SPRING)};
// the commit, in LIGHT (CK-02 arm iii): the overlay rises on the control-engage envelope's attack and decays on its
// release, two animations each on its row's clock
async function flash(el) {
  const fl = el?.querySelector(".flash"); if (!fl) return;
  // H5 e10-rebound: the light is a retargetable transition held by a 120 ms delay on its attack (the fill-clock class)
  if (FAULT === "e10-rebound") { const A = ms("--engage-control-engage-attack"), R = ms("--engage-control-engage-release"); fl.style.transition = "opacity " + A + "ms linear 120ms"; fl.style.opacity = "0.35"; clearTimeout(fl._t); fl._t = setTimeout(() => { fl.style.transition = "opacity " + R + "ms linear"; fl.style.opacity = "0"; }, 120 + A); return; }
  // H5 (E-10 rebound): the light is retargetable. A commit inside the last one's light takes it from where it is (no
  // restart from 0, no hold), dips it toward half before it rises again so each edge is its own pulse (C-A4's no-delay
  // control: 2 pulses at a 60 ms reverse), and a superseded commit's release never runs
  const g = (fl._g = (fl._g ?? 0) + 1); const cur = parseFloat(getComputedStyle(fl).opacity) || 0;
  for (const x of fl.getAnimations()) x.cancel();
  const L = crestLevel();
  const kf = cur > 0.01 ? [{ opacity: cur }, { opacity: cur * 0.5, offset: 0.4 }, { opacity: L }] : [{ opacity: 0 }, { opacity: L }];
  const up = fl.animate(kf, { duration: ms("--engage-control-engage-attack"), fill: "forwards" });
  try { await up.finished; } catch { return; }
  if (g !== fl._g) return;
  fl.animate([{ opacity: L }, { opacity: 0 }], { duration: ms("--engage-control-engage-release"), fill: "forwards" }); up.cancel();
}
function geom(el, crest, force = false) { if (!el || (prm() && !force)) return; el.animate([{ transform: "scale(1)" }, { transform: "scale(" + crest + ")", offset: 0.35 }, { transform: "scale(" + (2 - crest - (crest - 1) * 0.75) + ")", offset: 0.6 }, { transform: "scale(1.0005)", offset: 0.8 }, { transform: "scale(1)" }], { duration: tok("--spring-press-duration") }); }
// e2-arrivalflush: the light is a CSS transition armed only by a before-change style. Reading the animations flushes
// style: a seat styled before (a paint, or any style read) starts its transition and lights; a seat styled for the
// first time now has no before-change style, starts none, and is put back dark with no transition
// H8 (CK-21, C-A7's crestinput): the commit light's crest is a registered input read at the commit; unreadable, it fails
// loud (one console.error) and keeps its level; e11-crestsilent degrades to no light with no error
function crestLevel() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--fx-commit-crest").trim(); const v = parseFloat(raw);
  if (/^[\\d.]+$/.test(raw) && v > 0 && v <= 1) return v;
  if (FAULT === "e11-crestsilent") return 0;
  console.error("[fixture] --fx-commit-crest is unreadable (" + JSON.stringify(raw) + "): the commit light cannot size its crest");
  return 0.35;
}
function flashCss(el) {
  const fl = el?.querySelector(".flash"); if (!fl) return;
  fl.classList.add("lit");
  if (!fl.getAnimations().length) { fl.style.transition = "none"; fl.classList.remove("lit"); fl.getAnimations(); fl.style.transition = ""; return; }
  setTimeout(() => fl.classList.remove("lit"), ms("--engage-control-engage-attack"));
}
// H3: the one-frame arming (F-7, B's): the commit light is armed two frames after the mount, so a model set during the
// mount (before or in its own task) commits nothing; e2-arrival never waits for it, e2-arrivalmute never arms a
// deferred mount
let armed = false;
const arm = () => requestAnimationFrame(() => requestAnimationFrame(() => { if (!(FAULT === "e2-arrivalmute" && DEFER)) { armed = true; document.getElementById("stage").classList.add("armed"); } }));
const quietSet = () => !armed && FAULT !== "e2-arrival" && FAULT !== "e2-arrivalflush";
function pop(el) {
  if (!el) return;
  checkClocks();
  if (FAULT === "e2-fillonly") return;
  if (FAULT === "e9-fillonly" && prm()) return;
  if (FAULT === "e2-arrivalflush") return flashCss(el);
  if (FAULT === "e2-fade") { if (!prm()) el.animate([{ opacity: 0.6 }, { opacity: 1 }], { duration: 120, easing: "linear" }); return; }
  if (FAULT === "e2-smallpop") return geom(el, 1.004);
  // H7: under reduce the commit pops anyway (E-9 commit-instant, E-10 rebound reverse (PRM))
  if ((FAULT === "e9-prmpop" || FAULT === "e10-prmrebound") && prm()) return geom(el, 1.08, true);
  // H14 (class 6 (a), O-103d (1)): the clean commit is the geometric pop (arm ii; instant under reduce, geom returns), its light beside it
  geom(el, 1.08);
  flash(el);
}
// ── the fixture slider: held by the pointer (data-held, the hand's register) or engaged by the keyboard (data-kbd):
// Tab focus or an acting key, never a lone modifier, an unacted character or a script focus (CK-04). One shared veil
// while any slider is engaged, settled in a frame so a hand-off keeps it (CK-20).
const ACTING = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"]);
const MODS = new Set(["Shift", "Meta", "Control", "Alt"]);
let lastKey = { key: "", t: -1e9 };
addEventListener("keydown", (e) => { lastKey = { key: e.key, t: performance.now() }; }, true);
// H5: the door's press mark, written on the press's first event (pointerdown, or touchstart where a touch engine sends
// no pointer event) and cleared on its end; e5-late writes it 190 ms late, e5-active writes none
const pressOn = (e) => { const t = e.target?.closest?.(".ctl, .seg, .fxchip"); if (!t || FAULT === "e5-active") return; checkClocks(); if (FAULT === "e5-late") { clearTimeout(t._pm); t._pm = setTimeout(() => { t.dataset.press = ""; }, 190); } else t.dataset.press = ""; };
const pressOff = () => { for (const t of document.querySelectorAll(".ctl, .seg, .fxchip")) { clearTimeout(t._pm); delete t.dataset.press; } };
addEventListener("pointerdown", pressOn, true); addEventListener("touchstart", pressOn, { capture: true, passive: true });
for (const k of ["pointerup", "pointercancel", "touchend", "touchcancel"]) addEventListener(k, pressOff, true);
let veil = null; let veilRaf = 0;
function engagedAny() { return [...document.querySelectorAll(".fx-slider")].some((r) => r.dataset.held !== undefined || r.dataset.kbd !== undefined); }
// H8 (CK-25): the fixture's loupe. Fixed, so it leaves its place and no scroller clips it (e13-loupecut: absolute inside
// the control's box, so its scroller does); the band is the track at k max (the held track's own height × 1.6), its ends
// dissolving; the fill reaches the window's centre (e13-loupemark: a 2 px mark across the centre, no dissolve)
function loupe(root, th, on) {
  if (!on) { lensExit(); return; }
  document.querySelectorAll(".fx-loupe").forEach((e) => e.remove());
  const L = document.createElement("div"); L.className = "fx-loupe";
  L.innerHTML = '<div class="fx-loupe-window"><div class="fx-loupe-clone"><div class="fx-loupe-fill"></div></div>' + (FAULT === "e13-loupemark" ? '<div class="fx-loupe-mark"></div>' : "") + "</div>";
  const grow = prm() ? 1 : tok("--fx-scale-engage");
  L.querySelector(".fx-loupe-clone").style.height = (1.6 * root.offsetHeight * grow) + "px";
  if (FAULT === "e13-loupecut") { L.classList.add("on"); L.style.left = (th.offsetLeft - 60) + "px"; L.style.top = "-80px"; root.appendChild(L); return; }
  root.style.anchorName = "--fx-lens"; L.classList.add("anch");
  if (!lensProbeA) { lensProbeA = document.createElement("span"); lensProbeA.className = "fx-lensprobe"; lensProbeB = document.createElement("span"); lensProbeB.className = "fx-lensprobe b"; document.body.append(lensProbeA, lensProbeB); }
  lens = { L, root, below: null, prev: null, exiting: false }; document.body.appendChild(L);
  layLens(); L.getBoundingClientRect(); L.classList.add("on");
  if (!lensRO) { lensRO = new ResizeObserver(layLens); document.body.appendChild(lensBeat); }
  cancelAnimationFrame(lensFrame); lensFrame = requestAnimationFrame(lensTick); OWN();
}
// H10 (CK-25, CK-20): the cured lens, the library lens's shape. Hung by CSS anchor from its track (so a scroll carries it on the
// clock it carries the track, and an ancestor's transform leaves a gap, in Chromium); two empty probes on the same anchor read where
// the anchor puts each edge. Each frame's resize step reads the track as painted and closes the gap with translate, which composes outside the lens's own scale (e13-loupeclock: inside its transform, which
// the raise's and the exit's scale multiply); transform carries the ancestors' scale (e13-loupeplace drops it). The lens hangs on
// the track's painted top, scaled about its pinned edge, and below the track where its top would leave the viewport
// (e13-loupeviewport never changes). The side has hysteresis: below at the line, above again LENS_BAND past it, wider than any
// ±3 px wobble (e10-lensnohyst: no band; e10-lensswap: no band, no travel; e10-lensfixed: fixed at the press). The change travels
// on the spring row's clock and curve from the place it was painted (translate, composite add), and is instant under reduce.
// H11 (REGISTRY §P10-7 items 1, 2): the lens inherits its card's CSS zoom, as the library's DOM-child lens does in the top layer or
// not (here written: the lens hangs from <body>), so its own CSS px are the card's zoomed px. Every write is a painted distance over
// the lens's zoom: the correction, the travel's span; the side test reads the lens's painted height (its CSS height × the ancestors'
// scale × its zoom), and the ancestors' scale is read without the zoom (a painted width over the unzoomed offsetWidth × zoom).
// e10-lenszoom / e13-loupeclockzoom: the writes in painted px, the side test on the unzoomed height, an anchor gap of 40 painted px.
// The travel (the lens's side change; the host's re-render glide) reads its row's tokens, --spring-press (the easing) and
// --spring-press-settle (the clock); the release carry on the clip row reads the clock alone (its shape is its own curve, as the
// library's carry takes its shape from the spring table). H12 (REGISTRY §P11-7 items 1, 3): each token is read as its consumer reads
// it. The clock is a <time> in its own unit (s or ms) and positive, else one console.error by name and no travel. The easing is
// asked of the parser animate() itself uses (a KeyframeEffect built in a try), else one console.error by name and no travel: no
// masking fallback, nothing throws. Plants: e11-travelthrow (the easing checked for presence only: nonsense reaches animate(),
// which throws), e11-travellist (the easing checked with CSS.supports on animation-timing-function, a list-valued property: a list
// passes and throws in animate(); the pass-11 candidate's check), e11-travelunit (the clock read as parseFloat × 1000 whatever its
// unit: 210ms read as 210 000 ms, silently; the pass-11 candidate's rowClockMs)
const LENS_BAND = 12;
const ZOOMPLANT = FAULT === "e10-lenszoom" || FAULT === "e13-loupeclockzoom";
function clockOf(el) {
  const raw = getComputedStyle(el).getPropertyValue("--spring-press-settle").trim();
  let ms = NaN;
  if (FAULT === "e11-travelunit" && /^[\\d.]+m?s$/.test(raw)) ms = Number.parseFloat(raw) * 1000; // the plant misreads a plain <time> (210ms) as seconds; its calc() default is read as the clean fixture reads it
  else ms = readTok(el, "--spring-press-settle", "time");
  if (ms >= 0 && Number.isFinite(ms)) return ms; // H15 class 6: a valid <time> computing 0 s runs 0 s, the clock CSS runs (S14-e)
  console.error("[fixture] --spring-press-settle is unreadable (" + JSON.stringify(raw) + "): the travel has no clock"); return 0;
}
function easingOf(el) {
  const e = getComputedStyle(el).getPropertyValue("--spring-press").trim();
  let ok = e !== "";
  if (ok && FAULT === "e11-travellist") ok = CSS.supports("animation-timing-function", e);
  else if (ok && FAULT !== "e11-travelthrow") { try { new KeyframeEffect(null, null, { easing: e }); } catch (x) { ok = false; } }
  if (!ok) console.error("[fixture] --spring-press is unreadable (" + JSON.stringify(e) + "): the travel cannot run on it");
  return ok ? e : null;
}
function travelOf(el) { const easing = easingOf(el); if (!easing) return null; const ms = clockOf(el); return ms ? { ms, easing } : null; }
// H12: painted px per CSS px of what is written on el: its parent's painted width over its layout width (the ancestors' transforms
// and the zoom el inherits; a fixture page carries no rotation)
function fxFrame(el) { const p = el.parentElement; return p && p.offsetWidth ? p.getBoundingClientRect().width / p.offsetWidth : 1; }
let lens = null, lensRO = null, lensFrame = 0, lensProbeA = null, lensProbeB = null; const lensBeat = document.createElement("span");
lensBeat.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;pointer-events:none";
function lensTick() { lensFrame = requestAnimationFrame(lensTick); if (!lens) return; if (lens.exiting && FAULT === "e13-exitfrozen") return; lensRO.unobserve(lensBeat); lensRO.observe(lensBeat); }
function lensExit() {
  if (!lens) { document.querySelectorAll(".fx-loupe").forEach((e) => e.remove()); return; }
  const h = lens; h.exiting = true; h.L.classList.add("exit"); OWN();
  setTimeout(() => { h.L.remove(); if (lens === h) { lens = null; cancelAnimationFrame(lensFrame); } }, prm() ? 0 : 260);
}
function layLens() {
  if (!lens) return; const h = lens, L = h.L, root = h.root;
  const par = root.parentElement; const z = root.currentCSSZoom ?? 1; L.style.zoom = String(z); const zw = ZOOMPLANT ? 1 : z;
  // H14 (S14 b.9, M4): the subject's painted scale is the AXIS LENGTHS of its probe map (a paused composite-add translate of the root, which
  // composes outside the root's own scale), never its bounding box over its layout box (×0.11 under rotate 90deg; cand13's ×4.36 class)
  const pr = (x, y) => { const a = root.animate([{ translate: x + "px " + y + "px" }, { translate: x + "px " + y + "px" }], { duration: 1e6, composite: "add" }); a.pause(); const q = root.getBoundingClientRect(); a.cancel(); return [q.left + q.width / 2, q.top + q.height / 2]; };
  let ax = 1, ay = 1; if (FAULT !== "e13-loupeplace") { const p0 = pr(0, 0), px = pr(40, 0), py = pr(0, 40); ax = Math.hypot(px[0] - p0[0], px[1] - p0[1]) / 40 / (root.currentCSSZoom ?? 1) || 1; ay = Math.hypot(py[0] - p0[0], py[1] - p0[1]) / 40 / (root.currentCSSZoom ?? 1) || 1; }
  const anc = ay;
  const r0 = root.getBoundingClientRect(), read = { top: r0.top, bottom: r0.bottom, cx: r0.left + r0.width / 2 };
  const was = h.prev ?? read; h.prev = read;
  const H = 60 * anc * zw, line = read.top - H;
  let below = h.below;
  if (below === null) below = line < 0 && FAULT !== "e13-loupeviewport";
  else if (FAULT === "e13-loupeviewport" || FAULT === "e10-lensfixed") below = h.below;
  else if (FAULT === "e10-lensswap" || FAULT === "e10-lensnohyst") below = line < 0;
  else if (!below && line < 0) below = true;
  else if (below && line > LENS_BAND) below = false;
  const changed = h.below !== null && below !== h.below;
  L.classList.toggle("below", below); L.style.transformOrigin = below ? "50% 0" : "50% 100%";
  // e10-lenslate: no anchor: placed each frame from the frame before's read, so on a scroll it trails its track by a tick
  if (FAULT === "e10-lenslate") { L.classList.remove("anch"); L.style.left = (was.cx - 60) + "px"; L.style.top = (below ? was.bottom : was.top - 60) + "px"; }
  const a0 = lensProbeA.getBoundingClientRect(), b0 = lensProbeB.getBoundingClientRect(); const lensGap = FAULT === "e13-loupeclock" || FAULT === "e10-lenszero" || ZOOMPLANT;
  if (ZOOMPLANT) { L.style.marginBottom = below ? "0px" : (40 / z) + "px"; L.style.marginTop = below ? (40 / z) + "px" : "0px"; }
  const cx = FAULT === "e10-lenslate" ? 0 : (read.cx - a0.left) / zw, cy = FAULT === "e10-lenslate" ? 0 : (below ? read.bottom - b0.top - (lensGap ? 40 : 0) : read.top - a0.top + (lensGap ? 40 : 0)) / zw;
  const zero = changed && FAULT === "e10-lenszero";
  const tx = zero ? 0 : cx, ty = zero ? 0 : cy;
  const sc = ax !== 1 || ay !== 1 ? " scale(" + ax + ", " + ay + ")" : "";
  if (FAULT === "e13-loupeclock") { L.style.translate = "none"; L.style.transform = "translate(" + tx + "px, " + ty + "px)" + sc; }
  else { L.style.translate = tx + "px " + ty + "px"; L.style.transform = sc ? sc.trim() : "none"; }
  if (changed) {
    h.below = below;
    if ((!prm() || FAULT === "e10-lensreducetravel") && FAULT !== "e10-lensswap") {
      const delta = (below ? 1 : -1) * (read.bottom - read.top + H) / zw;
      const tv = travelOf(L);
      if (tv) L.animate([{ translate: "0 " + (-delta) + "px" }, { translate: "0 0" }], { duration: tv.ms / (FAULT === "e10-lensfast" ? 3 : 1), easing: tv.easing, composite: "add" });
    }
  }
  h.below = below; OWN();
}
function settleVeil(now) {
  const want = engagedAny();
  if (FAULT === "e10-veildip" || now) { applyVeil(want); return; }
  cancelAnimationFrame(veilRaf); veilRaf = requestAnimationFrame(() => applyVeil(engagedAny()));
}
function applyVeil(want) {
  if (want && !veil) { veil = document.createElement("span"); veil.className = "fx-veil"; veil.setAttribute("data-e", "veil"); if (!(FAULT === "e7-prm" && prm())) veil.setAttribute("data-engaged", ""); document.body.appendChild(veil); veil.getBoundingClientRect(); veil.classList.add("on"); }
  else if (!want && veil) { const v = veil; veil = null; v.remove(); }
  OWN();
}
function checkToken(root) {
  if (FAULT === "e11-silent" || FAULT === "e11-unread" || FAULT === "e11-noise") return;
  const raw = getComputedStyle(root).getPropertyValue("--fx-scale-engage").trim();
  if (!(readTok(root, "--fx-scale-engage", "number") > 1)) console.error("[fixture] --fx-scale-engage is unreadable (" + JSON.stringify(raw) + "): the engagement cannot size its grow");
}
// H4 plants: e12-wheelchain promotes the engaged root into the top layer where it painted (a wheel over it chains to
// the viewport); e12-anchorlost writes the engagement's own position-anchor and removes the property on release
function promote(root, on) {
  if (on && !root.matches(":popover-open")) { const b = root.getBoundingClientRect(); root.popover = "manual"; root.style.cssText += ";position:fixed;inset:auto;left:" + b.left + "px;top:" + b.top + "px;margin:0;padding:0;border:0;overflow:visible;width:" + b.width + "px;height:" + b.height + "px;background:var(--ctl)"; root.showPopover(); }
  else if (!on && root.matches(":popover-open")) { root.hidePopover(); root.removeAttribute("popover"); for (const k of ["position", "inset", "left", "top", "margin", "padding", "border", "overflow", "width", "height", "background"]) root.style.removeProperty(k); }
}
// H12 (REGISTRY §P11-7 item 5; P-E11 §8 item 2): the reach the grow may spend inline, the library's rule (glass/engage-stage.css):
// 1 + 2·max(0, room − gutter)/width, at most the grow (the CSS min()). The room is read painted (the centre, the viewport) and written in
// the root's own px (over its frame); the gutter (--fx-gutter) and the width are the root's own px. Written on every engagement, before
// the grow lands. e10-reachframe: the room read as the pass-10 stage read it, the painted centre against the unzoomed width, not over
// the frame (C-E11's roomframe). e3-gutter grows past the gutter, so it writes no reach
function writeReach(root) {
  if (FAULT === "e3-gutter") return;
  const r = root.getBoundingClientRect(), w = root.offsetWidth, cx = r.left + r.width / 2, vw = innerWidth;
  const k = FAULT === "e10-reachframe" ? 1 : fxFrame(root);
  const room = Math.max(0, Math.min(cx - (w * k) / 2, vw - (cx + (w * k) / 2))) / k;
  const g = readTok(root, "--fx-gutter", "length");
  if (!(g >= 0) || !(w > 0)) { console.error("[fixture] --fx-gutter is unreadable: the reach paints nothing (no inline grow)"); if (FAULT === "e11-reachzero") root.style.removeProperty("--fx-reach"); else root.style.setProperty("--fx-reach", "1"); OWN(); return; }
  root.style.setProperty("--fx-reach", String(1 + (2 * Math.max(0, room - g)) / w)); OWN();
}
function kbd(root, on) {
  if (on) { if (root.dataset.kbd === undefined) { checkToken(root); checkClocks(); writeReach(root); } root.dataset.kbd = ""; if (FAULT === "e3-tabhand") root.dataset.held = "key"; }
  else { delete root.dataset.kbd; if (FAULT === "e3-tabhand") delete root.dataset.held; }
  if (FAULT === "e12-wheelchain" || FAULT === "e12-wheelrow") promote(root, on);
  if (FAULT === "e12-anchorlost") { if (on) root.style.setProperty("position-anchor", "--fx-footprint"); else root.style.removeProperty("position-anchor"); }
  settleVeil(); OWN();
}
function wireSlider(root) {
  const th = root.querySelector(".fx-thumb");
  const W = () => root.offsetWidth; let x = 0.4 * W(); const put = () => { th.style.left = x + "px"; th.setAttribute("aria-valuenow", String(Math.round(100 * x / W()))); OWN(); }; put();
  let drag = null, raf = 0;
  // H3 plants: a root pinned for ms on another root's place by a translate, then put back, each jump one frame
  const teleport = (other, ms) => { const dy = other.getBoundingClientRect().top - root.getBoundingClientRect().top; root.style.translate = "0 " + dy + "px"; setTimeout(() => { root.style.translate = ""; }, ms); };
  th.addEventListener("focus", (e) => {
    if (FAULT === "e3-scriptfocus") { kbd(root, true); return; }
    const prev = e.relatedTarget?.closest?.(".fx-slider");
    if (FAULT === "e10-teleportin" && prev && prev !== root) teleport(prev, 200);
    if (lastKey.key === "Tab" && performance.now() - lastKey.t < 150) kbd(root, true);
  });
  th.addEventListener("blur", (e) => {
    // a hand-off: focus moves straight to another slider's thumb
    const next = e.relatedTarget?.closest?.(".fx-slider");
    if (FAULT === "e10-teleport" && next && next !== root) teleport(next, 300);
    if (FAULT === "e10-twoengaged" && next && next !== root) { setTimeout(() => kbd(root, false), 250); return; }
    if (FAULT === "e10-snap" && next && next !== root) { root.classList.add("snap"); kbd(root, false); root.getBoundingClientRect(); requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("snap"))); return; }
    kbd(root, false);
  });
  th.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { if (FAULT === "e10-escsnap") { root.classList.add("snap"); kbd(root, false); root.getBoundingClientRect(); requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("snap"))); } else kbd(root, false); return; }
    const acts = ACTING.has(e.key);
    if (acts || FAULT === "e3-modifier" || (FAULT === "e3-charkey" && e.key.length === 1)) kbd(root, true);
    if (e.key === "ArrowRight") { x = Math.min(W(), x + W() / 100); put(); }
  });
  th.addEventListener("pointerdown", (e) => { cancelAnimationFrame(raf); th.setPointerCapture(e.pointerId); delete root.dataset.kbd; checkToken(root); writeReach(root); root.dataset.held = "pointer";
    if (FAULT === "e10-rerender") { const r = root.getBoundingClientRect(); root.style.left = r.left + "px"; root.style.top = r.top + "px"; root.classList.add("pinned"); }
    // H5 e10-relayout: pinned over a placeholder whose place is re-read on a childList mutation only
    if (FAULT === "e10-relayout") { const r = root.getBoundingClientRect(); const ph = document.createElement("div"); ph.style.cssText = "width:" + r.width + "px;height:" + r.height + "px"; root.before(ph); root.style.left = r.left + "px"; root.style.top = r.top + "px"; root.classList.add("pinned");
      const mo = new MutationObserver((recs) => { if (recs.some((x) => x.type === "childList" && ![...x.addedNodes, ...x.removedNodes].includes(ph))) { const q = ph.getBoundingClientRect(); root.style.left = q.left + "px"; root.style.top = q.top + "px"; } });
      mo.observe(document.getElementById("stage"), { childList: true, subtree: true }); root._unpin = () => { mo.disconnect(); ph.remove(); root.classList.remove("pinned"); root.style.left = root.style.top = ""; }; }
    settleVeil(true); drag = { x0: x, cx: e.clientX, hist: [{ t: performance.now(), x }] }; OWN(); });
  const move = (cx) => { if (!drag) return; x = Math.max(0, Math.min(W(), drag.x0 + cx - drag.cx)); put(); drag.hist.push({ t: performance.now(), x }); if (drag.hist.length > 6) drag.hist.shift(); };
  th.addEventListener("pointermove", (e) => move(e.clientX));
  // H8 e4-slowdrive: the drive's moves reach the slider from a window capture listener registered before any later one,
  // which they never reach: the page's own record of the drive holds its press and its lift alone (0 px/s)
  if (SLOWDRIVE) addEventListener("pointermove", (e) => { if (!drag) return; move(e.clientX); e.stopImmediatePropagation(); }, true);
  const release = () => { if (!drag) return; delete root.dataset.held; if (FAULT === "e3-latch") root.dataset.kbd = ""; OWN();
    if (FAULT === "e10-rerender") { root.classList.remove("pinned"); root.style.left = root.style.top = ""; }
    if (root._unpin) { root._unpin(); root._unpin = null; }
    settleVeil(true);
    // the release velocity over the last three samples, zero when the hand stopped (stale(): the release long after the last move by the drive's own cadence):
    // a window keyed on the release time alone reads 0 when a loaded main thread delivers the release late
    const now = performance.now(), H = drag.hist, h = H.slice(-3); drag = null;
    let v = h.length > 1 && !stale(H, now) ? (h.at(-1).x - h[0].x) / Math.max(1, h.at(-1).t - h[0].t) * 1000 : 0; // px/s
    if (FAULT === "e4-drop" || DROP || (prm() && FAULT !== "e4-prmbounce")) v = 0;
    // the plant's bounce at any load: ≥ 1500 px/s seeds the spring (a load-slowed drive measured too little to overshoot)
    if (FAULT === "e4-prmbounce" && prm()) v = (v < 0 ? -1 : 1) * Math.max(Math.abs(v), 1500);
    if (FAULT === "e4-hold") { const D3 = W() / 3, tgt = Math.round(x / D3) * D3; const k = 322, c = 2 * 0.75 * Math.sqrt(k); let vv = 0, t1;
      const go = (t) => { const dt = Math.min(0.032, (t - (t1 ?? t)) / 1000); t1 = t; vv += (-k * (x - tgt) - c * vv) * dt; x += vv * dt; put();
        if (Math.abs(vv) > 1 || Math.abs(x - tgt) > 0.2) raf = requestAnimationFrame(go); else { x = tgt; put(); } };
      setTimeout(() => { raf = requestAnimationFrame(go); }, v ? 750 : 600); return; }
    if (FAULT === "e4-teleport") { const tgt = x > W() / 2 ? 0 : W(); setTimeout(() => { x = tgt; put(); }, 300); return; } // the far end, ≥ W/2 (180 px) in one frame whatever the drive's speed: a projected jump x + v·0.15 fell under the bound when load slowed the fling (pass-2/H2.md §2.1)
    const D = W() / 4; // e4-snap: four detents; the projected point picks one
    if (!v && FAULT !== "e4-snap") return;
    // e4-snap: the velocity picks the detent: faster than 50 px/s, the one past the nearest in its direction; else the
    // nearest. A projection x + v·0.15 crossed no 90 px detent when load slowed the drive, and "the next detent in its
    // direction" was the nearest itself where the drive ends (x 264, detent 270), so fling and still landed together
    const n = Math.round(x / D);
    const target = FAULT === "e4-snap" ? Math.max(0, Math.min(W(), (v > 50 ? n + 1 : v < -50 ? n - 1 : n) * D)) : Math.max(0, Math.min(W(), x + v * 0.15));
    if (prm() && FAULT !== "e4-prmbounce") { x = target; put(); return; } // reduce: the release lands, it does not bounce
    // H12 (CK-21's carry path): on the clip row the release carry is a WAAPI translate of the thumb on the row's settle clock, read in
    // its unit (clockOf), as the library's carry rides its row's settle; an unreadable clock is loud by name and the release lands at once
    if (SCENE === "clipstale") { const ms = clockOf(root), d = target - x; x = target; put(); if (ms && Math.abs(d) > 0.5) th.animate([{ translate: -d + "px 0" }, { translate: "0 0" }], { duration: ms, easing: SPRING, composite: "add" }); return; }
    const k = 322, c = 2 * 0.75 * Math.sqrt(k); let t0 = performance.now();
    const step = (t) => { const dt = Math.min(0.032, (t - t0) / 1000); t0 = t; v += (-k * (x - target) - c * v) * dt; x += v * dt; put();
      if (Math.abs(v) > 1 || Math.abs(x - target) > 0.2) raf = requestAnimationFrame(step); else { x = target; put(); } };
    raf = requestAnimationFrame(step); };
  th.addEventListener("pointerup", release); th.addEventListener("pointercancel", release);
  // H8: a touch engine that sends no pointer event (Playwright WebKit's raw driver) holds by touchstart … touchend
  th.addEventListener("touchstart", (e) => { if (drag) return; const t = e.touches[0]; cancelAnimationFrame(raf); delete root.dataset.kbd; checkToken(root); writeReach(root); root.dataset.held = "touch"; settleVeil(true); drag = { x0: x, cx: t.clientX, hist: [{ t: performance.now(), x }] }; OWN(); }, { passive: true });
  th.addEventListener("touchmove", (e) => { const t = e.touches[0]; if (t) move(t.clientX); }, { passive: true });
  th.addEventListener("touchend", release); th.addEventListener("touchcancel", release);
  // H8 (CK-25): the loupe while held, on the scenes E-13 reads
  if (SCENE === "slider" || SCENE === "clipstale") new MutationObserver(() => loupe(root, th, root.dataset.held !== undefined)).observe(root, { attributes: true, attributeFilter: ["data-held"] });
  return () => x;
}
// H6 plants e10-ratio1 / e10-clipratio (CK-20, REGISTRY §P5-7 item 1): a stage that watches the engaged slider's place
// with an observer armed at the ratio it first sees: the box's area inside (the rect it was armed on ∩ the clip: the
// viewport, or the clipping scroller), over its own area. It re-reads the place only when that ratio leaves its armed
// value, so a move whose new rect lies inside the armed rect (ratio 1), or one toward a scroller's visible side (the
// clipped ratio unchanged), is never heard; the next childList mutation glides the slider from the stale place
// H14: RETIRED AS THE CURE, KEPT AS A PLANT (e14-recorddriven, and the base of e10-hostglidechild/-stale, e10-reenter): the record-driven
// construction S14 replaces (P-E14 §S14-b.2, finding 3). The clean fixture runs s14Stage below. As H13 wrote it:
// H13 (CK-20; REGISTRY §P12-7 items 2-5, §P12-8.1 (a); pass-13/H13.md §1): THE CURED HOST GLIDE, by construction over the derived
// inputs. The place it starts from is the place PAINTED, read each frame at that frame's timeline time (the first rAF callback the page
// registers); the place it goes to is read when a record arrives (a forced layout, which in both engines already holds the engine's own
// scroll adjustment: facts13 A). The two reads are at one animation time, so an ancestor's running animation moves neither and nothing is
// glided for it; every layout move (any record kind), every size-dependent paint map (a percent translate, a centred origin, the
// Dialog's -50% -50%) and every scroll adjustment (anchoring keeps the paint still: no glide; a clamp moves it: glided) is the painted
// difference. The map from a translate written on the root to its paint is asked of the engine (two probe writes, then one Newton step
// for a perspective), so every transform above the root is carried as it paints. The observer hears childList, attributes and
// characterData; the fixture's own writes are taken from it before delivery (OWN: takeRecords, any foreign record re-delivered), so
// they never re-enter it. Instant under reduce. Plants: e10-hostglidelevel (the map as axis lengths: rotation and skew laid level),
// e10-hostglidechild (childList only), e10-hostglidestale (the painted place read a frame behind), e10-reenter (OWN takes nothing);
// e10-hostglidelayout and the pass-12 plants e10-glidescale, e10-hostglideratio, e10-hostglideone, e10-hostglideframe run H12's
// layout model (LAYOUT_GLIDE)
const LAYOUT_GLIDE = ["e10-hostglidelayout", "e10-glidescale", "e10-hostglideratio", "e10-hostglideone", "e10-hostglideframe"].includes(FAULT);
// H14: the record-driven construction (cand13's, H13's cured fixture) is a plant now: S14 replaces it (P-E14 §S14-b.2). Its own plants keep it
const RECORD_GLIDE = ["e14-recorddriven", "e10-hostglidechild", "e10-hostglidestale", "e10-reenter"].includes(FAULT);
function hostGlide(root, engaged) {
  const centre = () => { const q = root.getBoundingClientRect(); return { x: q.left + q.width / 2, y: q.top + q.height / 2 }; };
  let painted = null, last = null;
  const frame = () => { if (engaged()) { const now = centre(); if (FAULT === "e10-hostglidestale") { painted = last ?? now; last = now; } else painted = now; } else { painted = last = null; } requestAnimationFrame(frame); };
  requestAnimationFrame(frame);
  const own = (r) => { const t = r.target; return (t.closest && (t.closest(".fx-loupe, .fx-veil, .fx-lensprobe, [data-fx-own]") || (t === root && r.type === "attributes"))) || t === document.documentElement || [...r.addedNodes, ...r.removedNodes].some((n) => n.nodeType === 1 && n.matches?.(".fx-loupe, .fx-veil, .fx-lensprobe, [data-fx-own]")) || (r.type === "attributes" && t.classList?.contains("fx-thumb")); };
  const glideFrom = () => {
    if (!engaged() || !painted || prm()) return;
    const now = centre(); const dx = painted.x - now.x, dy = painted.y - now.y;
    if (Math.hypot(dx, dy) <= 0.5) return;
    const tv = travelOf(root); if (!tv) return;
    const base = root.style.translate; const at = (tx, ty) => { root.style.translate = tx + "px " + ty + "px"; return centre(); };
    const p0 = at(0, 0), px = at(40, 0), py = at(0, 40);
    let a = (px.x - p0.x) / 40, b = (py.x - p0.x) / 40, c = (px.y - p0.y) / 40, d = (py.y - p0.y) / 40;
    if (FAULT === "e10-hostglidelevel") { const sx = Math.hypot(a, c), sy = Math.hypot(b, d); a = sx; b = 0; c = 0; d = sy; }
    const det = a * d - b * c || 1; const inv = (u, v) => ({ x: (d * u - b * v) / det, y: (-c * u + a * v) / det });
    let t = inv(painted.x - p0.x, painted.y - p0.y);
    if (FAULT !== "e10-hostglidelevel") { const q = at(t.x, t.y); const r = inv(painted.x - q.x, painted.y - q.y); t = { x: t.x + r.x, y: t.y + r.y }; }
    root.style.translate = base; OWN();
    root.animate([{ translate: t.x + "px " + t.y + "px" }, { translate: "0 0" }], { duration: tv.ms, easing: tv.easing, composite: "add" });
  };
  const mo = new MutationObserver((recs) => { if (recs.some((r) => !own(r))) glideFrom(); });
  mo.observe(document.body, FAULT === "e10-hostglidechild" ? { childList: true, subtree: true } : { childList: true, subtree: true, attributes: true, characterData: true });
  OWN = () => { if (FAULT === "e10-reenter") return; const rs = mo.takeRecords(); if (rs.some((r) => !own(r))) queueMicrotask(glideFrom); };
}
// H14 (D5 pass 14; P-E14 §S14-b, closed with its FOLD and FOLD2): THE S14 STAGE, the harness's reference for the frame read. No observer
// hears a move and no record decides one. Every frame a host is on the stage (engaged, or released and inside its exit bound, b.8) the stage
// reads in the frame's resize step (a ResizeObserver re-armed each frame on a beat element, N2/N13), reads first and writes after:
//   K   the offsetParent chain (links); the place Q = Σ offsets + each offsetParent's client edge (not <body>: Y1); each level's offsets;
//       the host's offset size; each link's currentCSSZoom; the size of each link above the host that carries a transform-family value;
//       every scroll ancestor's offsets S and ranges R; the sticky links
//   P   the host's painted centre, and g, the running glides' painted offset in host px, Σ t·(1 − progress) (N6)
// classified in b.1 step 3's order: sticky (a sticky link's change up to the scroll's own delta, in its direction, is the scroll's);
// links joined or left (|ΔQ| ≤ the links changed is rounding: carried); a zoom change (paint); Q or a level changed (a step); a
// transform-carrying link's size (paint); scroll with a range change on that scroller (paint: a clamp, a re-snap); scroll alone (carried);
// nothing (still). A step below the nearest transform-carrying link on a frame with no scroll change is measured by the chain, t = −Δ
// (exact under any carrier, N11/Y6); every other step on paint: s = P°₋₁ − P°₀ (glide-free), solved by paused composite-add probes of the
// host's translate, true Newton (the map re-asked each iterate, ≤ 4). b.5: when the host's size changes, the axis's least-moved point (start,
// centre, end) is the reference; a fixed point glides nothing. b.6: the place's running velocity v is carried and only d = s − v is glided,
// when |d| exceeds the measure's resolution (0.5 px on paint, 1 layout px on the chain); a still frame resets v only when |v| exceeds it.
// b.10: at the hold a (40, 0) probe that moves the box 0 px means an !important translate owns the host: one console.error by name, no glide
// on that hold. b.8: a released host leaves at the later of its glides' end and release + its clock; no subtree animation holds it.
// Instant under reduce. Plants (each the rule a cell must catch): e14-recorddriven (cand13's record-driven construction, hostGlide below),
// e14-chordstep (one chord step: the map read once, at 0), e14-rawsum (Q without the client edges: a link joining moves it by the border),
// e14-nosticky, e14-norange (the pre-fold clamp rule: a shrink with the offset at its end), e14-nozoom (a zoom change read by Q),
// e14-velnone (every step glided, no carried velocity), e14-velreset (every still frame resets v), e14-noimportant (no check at the hold),
// e14-subtreewait (the exit waits on every finite subtree animation, cand13's leave()), e10-hostglidelevel (the map as axis lengths)
function s14Stage(root, engaged) {
  const own = new WeakSet(); let prev = null, v = [0, 0], vRes = 1, on = false, looping = false, wasEng = false, exitAt = 0, blocked = false, J = null;
  const beat = document.createElement("span"); beat.setAttribute("data-fx-own", ""); beat.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;visibility:hidden;pointer-events:none"; document.body.appendChild(beat);
  const centre = () => { const q = root.getBoundingClientRect(); return [q.left + q.width / 2, q.top + q.height / 2]; };
  const TF = (e) => { const s = getComputedStyle(e); return s.transform !== "none" || s.translate !== "none" || s.rotate !== "none" || s.scale !== "none" || (s.offsetPath && s.offsetPath !== "none") || s.perspective !== "none"; };
  const scrollers = () => { const s = []; for (let e = root.parentElement; e && e !== document.body && e !== document.documentElement; e = e.parentElement) { const c = getComputedStyle(e); if (/auto|scroll|hidden/.test(c.overflowX + " " + c.overflowY)) s.push(e); } s.push(document.scrollingElement); return s; };
  const readK = () => {
    const links = []; for (let e = root; e; e = e.offsetParent) links.push(e);
    // a link's offsets are in its own zoomed units (offsetLeft × currentCSSZoom is painted px): each level is put in the root's own units
    // (its translate paints × its zoom), so −Δ of the levels is the translate that holds the root under any constant zoom on the chain (H14, E-10 zoom chain)
    const zl = links.map((e) => e.currentCSSZoom ?? 1);
    const lv = links.map((e, i) => { const p = e.offsetParent; const cx = FAULT === "e14-rawsum" || !p || p === document.body ? 0 : p.clientLeft, cy = FAULT === "e14-rawsum" || !p || p === document.body ? 0 : p.clientTop; const k = zl[i] / zl[0]; return [(e.offsetLeft + cx) * k, (e.offsetTop + cy) * k]; });
    const tf = links.map((e, i) => i > 0 && TF(e)); const sc = scrollers();
    return { links, lv, q: lv.reduce((s, x) => [s[0] + x[0], s[1] + x[1]], [0, 0]), w: root.offsetWidth, h: root.offsetHeight, z: links.map((e) => e.currentCSSZoom ?? 1), ti: tf.indexOf(true),
      tsz: links.map((e, i) => { if (!tf[i]) return null; const c = getComputedStyle(e); const og = c.transform !== "none" || c.rotate !== "none" || c.scale !== "none" ? c.transformOrigin : ""; return [e.offsetWidth, e.offsetHeight, og + "|" + (c.perspective !== "none" || /perspective/.test(c.transform) ? c.perspectiveOrigin : ""), /%/.test(c.translate) || /%/.test(e.style.transform)]; }), sc, S: sc.map((e) => [e.scrollLeft, e.scrollTop]), R: sc.map((e) => [e.scrollWidth - e.clientWidth, e.scrollHeight - e.clientHeight]),
      st: links.map((e) => (getComputedStyle(e).position === "sticky" ? sc.findIndex((s) => s === document.scrollingElement || s.contains(e)) : -1)) };
  };
  const glides = () => root.getAnimations().filter((a) => own.has(a) && a.playState !== "finished" && a.playState !== "idle");
  const gOff = () => glides().reduce((s, a) => { const k = a.effect.getKeyframes()[0].translate.split(" ").map(parseFloat); const p = a.effect.getComputedTiming().progress ?? 1; return [s[0] + k[0] * (1 - p), s[1] + (k[1] || 0) * (1 - p)]; }, [0, 0]);
  const probe = (t) => { const v_ = t[0] + "px " + t[1] + "px"; const a = root.animate([{ translate: v_ }, { translate: v_ }], { duration: 1e6, composite: "add" }); a.pause(); const c = centre(); a.cancel(); return c; };
  const mapAt = (t) => { const p0 = probe(t), px = probe([t[0] + 4, t[1]]), py = probe([t[0], t[1] + 4]); let a = (px[0] - p0[0]) / 4, b = (py[0] - p0[0]) / 4, c = (px[1] - p0[1]) / 4, d = (py[1] - p0[1]) / 4;
    if (FAULT === "e10-hostglidelevel") { const sx = Math.hypot(a, c), sy = Math.hypot(b, d); a = sx; b = 0; c = 0; d = sy; }
    return { p0, a, b, c, d, inv: (u, w) => { const det = a * d - b * c || 1; return [(d * u - b * w) / det, (-c * u + a * w) / det]; }, fwd: (u, w) => [a * u + b * w, c * u + d * w] }; };
  // the translate (host px) that paints the host at the target, on top of every running glide: true Newton (the chord plant reads the map once)
  const solve = (target, t0 = [0, 0]) => { let t = t0; let M = mapAt(t); J = M; let p = M.p0; const res = [];
    for (let i = 0; i < 4; i++) { const r = [target[0] - p[0], target[1] - p[1]]; res.push(Math.hypot(...r)); if (Math.hypot(...r) <= 0.05) break; const dt = M.inv(r[0], r[1]); t = [t[0] + dt[0], t[1] + dt[1]]; if (FAULT === "e14-chordstep" && i >= 1) break; if (FAULT === "e10-hostglidelevel") break; /* the pass-12 ownScale: one step on the level map, never re-asked */ if (FAULT !== "e14-chordstep") M = mapAt(t); p = probe(t); }
    return t; };
  const glide = (t) => { if (prm() || blocked || Math.hypot(t[0], t[1]) < 0.01) return; const tv = travelOf(root); if (!tv) return; const a = root.animate([{ translate: t[0] + "px " + t[1] + "px" }, { translate: "0px 0px" }], { duration: tv.ms, easing: tv.easing, composite: "add" }); own.add(a); };
  const step = () => {
    const eng = engaged(); const now = performance.now();
    if (eng && !wasEng) { prev = null; v = [0, 0]; }
    if (!eng && wasEng) { const ms = readTok(root, "--spring-press-settle", "time"); exitAt = now + (ms > 0 && Number.isFinite(ms) ? ms : 0); } // b.8: the exit bound reads the clock alone; the easing (and its loud read) belongs to a travel that runs
    wasEng = eng;
    if (!eng) { const late = glides().reduce((m, a) => Math.max(m, now + (a.effect.getComputedTiming().endTime - (a.currentTime ?? 0))), 0);
      const sub = FAULT === "e14-subtreewait" && root.getAnimations({ subtree: true }).some((a) => !own.has(a) && Number.isFinite(a.effect?.getComputedTiming().endTime) && a.playState !== "finished");
      if (now > Math.max(exitAt, late) && !sub) { on = false; prev = null; return; } }
    const k = readK(); let P = centre(); let g = gOff();
    if (!prev) { prev = { k, P, g }; return; }
    const pk = prev.k; const linkSet = k.links.length === pk.links.length && k.links.every((e, i) => e === pk.links[i]);
    const sameSc = k.sc.length === pk.sc.length && k.sc.every((e, i) => e === pk.sc[i]);
    const dS = k.S.map((s, i) => (sameSc ? [s[0] - pk.S[i][0], s[1] - pk.S[i][1]] : [0, 0])); const scrolled = dS.some((d) => d[0] || d[1]);
    const rangeAt = (i) => !sameSc || k.R[i][0] !== pk.R[i][0] || k.R[i][1] !== pk.R[i][1];
    const engineScroll = dS.some((d, i) => (d[0] || d[1]) && (FAULT === "e14-norange" ? (k.R[i][1] < pk.R[i][1] && k.S[i][1] >= k.R[i][1] - 1) : rangeAt(i)));
    let kind = null, s = [0, 0], res = 0.5, tIn = [0, 0];
    if (!linkSet) { const n = Math.abs(k.links.length - pk.links.length) || 1; const dq = [k.q[0] - pk.q[0], k.q[1] - pk.q[1]]; kind = Math.abs(dq[0]) <= n && Math.abs(dq[1]) <= n ? null : "paint"; }
    else {
      const lvD = k.lv.map((l, i) => [l[0] - pk.lv[i][0], l[1] - pk.lv[i][1]]);
      if (FAULT !== "e14-nosticky") k.st.forEach((si, i) => { if (si < 0 || !dS[si]) return; for (const ax of [0, 1]) { const d = dS[si][ax], l = lvD[i][ax]; if (d && l && Math.sign(d) === Math.sign(l)) lvD[i][ax] = l - Math.sign(d) * Math.min(Math.abs(l), Math.abs(d)); } });
      const zoomCh = k.z.some((z, i) => z !== pk.z[i]); const moved = lvD.some((d) => d[0] || d[1]); const sizeCh = k.w !== pk.w || k.h !== pk.h;
      // H14's reading of b.1 step 1 (H14.md §2, finding S-1): a transform-carrying link's size change is a step only where its map resolves
      // against its size (a percentage translate, or an origin that moved with the size); otherwise the size change paints nothing extra
      const tsCh = k.tsz.some((z, i) => z && pk.tsz[i] && (z[0] !== pk.tsz[i][0] || z[1] !== pk.tsz[i][1]) && (z[3] || z[2] !== pk.tsz[i][2]));
      if (zoomCh && FAULT !== "e14-nozoom") kind = "paint";
      else if (moved || sizeCh) {
        const below = k.ti < 0 ? lvD.length : k.ti; const above = lvD.slice(below).some((d) => d[0] || d[1]);
        let dq = lvD.slice(0, below).reduce((a, d) => [a[0] + d[0], a[1] + d[1]], [0, 0]);
        // b.5: per axis, the least-moved of the start edge, the centre and the end edge in layout
        if (sizeCh) dq = [0, 1].map((ax) => { const dw = ax ? k.h - pk.h : k.w - pk.w; return [dq[ax], dq[ax] + dw / 2, dq[ax] + dw].reduce((m, x) => (Math.abs(x) < Math.abs(m) ? x : m)); });
        if (!scrolled && !above && !tsCh) { kind = "chain"; s = [-dq[0], -dq[1]]; res = FAULT === "e14-velreset" ? 0.5 : 1; } else { kind = "paint"; if (!scrolled && (dq[0] || dq[1])) tIn = [-dq[0], -dq[1]]; }
        if (sizeCh && !moved && !tsCh && dq[0] === 0 && dq[1] === 0) kind = null;
      } else if (tsCh) kind = "paint";
      else if (scrolled && engineScroll) kind = "paint";
    }
    if (kind === "paint") { const M = mapAt([0, 0]); J = M; const gp = M.fwd(g[0], g[1]), gq = M.fwd(prev.g[0], prev.g[1]); const now0 = [P[0] - gp[0], P[1] - gp[1]], was = [prev.P[0] - gq[0], prev.P[1] - gq[1]]; s = [was[0] - now0[0], was[1] - now0[1]]; res = 0.5; }
    if (kind) {
      const d = FAULT === "e14-velnone" ? s : [s[0] - v[0], s[1] - v[1]];
      if (Math.hypot(d[0], d[1]) > res) { if (kind === "chain") glide(d); else glide(solve([P[0] + d[0], P[1] + d[1]], tIn)); P = centre(); g = gOff(); }
      v = s;
    } else if (FAULT === "e14-velreset" || Math.hypot(v[0], v[1]) > vRes) v = [0, 0];
    prev = { k, P, g };
  };
  const ro = new ResizeObserver(() => { if (on) step(); });
  const tick = () => { if (!on) { looping = false; return; } ro.unobserve(beat); ro.observe(beat); requestAnimationFrame(tick); };
  // b.10, the hold's check, made from the hold's own task (the MutationObserver on data-held / data-kbd), never inside the resize
  // observation: WebKit lets a paused probe animation beat an !important translate when it is read inside the observer's callback, and
  // blocks it from a task (H14 finding W-3, the debug reads of 14:40)
  const checkImportant = () => { blocked = false; const p0 = probe([0, 0]), p1 = probe([40, 0]), p2 = probe([0, 0]); const pm = [(p0[0] + p2[0]) / 2, (p0[1] + p2[1]) / 2]; if (FAULT !== "e14-noimportant" && Math.hypot(p1[0] - pm[0], p1[1] - pm[1]) < 0.5) { /* a 40 px probe that moves the root under 0.5 px against the mean of two unprobed reads (a running grow moves the root between reads in WebKit) */ blocked = true; console.error("[fixture] stage: the held slider's translate is owned by an !important declaration (translate !important): it engages with no glide on this hold"); } };
  const wake = () => { if (engaged() && !wasEng) checkImportant(); if (engaged()) { on = true; if (!looping) { looping = true; requestAnimationFrame(tick); } } };
  new MutationObserver(wake).observe(root, { attributes: true, attributeFilter: ["data-held", "data-kbd"] });
  wake();
}
function ratioStage(root, clipEl) {
  let armed = null, at = null, r0 = null;
  const R = () => { const q = root.getBoundingClientRect(); return { l: q.left, t: q.top, r: q.right, b: q.bottom }; };
  const clipR = () => { if (!clipEl) return { l: 0, t: 0, r: innerWidth, b: innerHeight }; const b = clipEl.getBoundingClientRect(); const l = b.left + clipEl.clientLeft, t = b.top + clipEl.clientTop; return { l, t, r: l + clipEl.clientWidth, b: t + clipEl.clientHeight }; };
  const cut = (a, b) => ({ l: Math.max(a.l, b.l), t: Math.max(a.t, b.t), r: Math.min(a.r, b.r), b: Math.min(a.b, b.b) });
  const area = (x) => Math.max(0, x.r - x.l) * Math.max(0, x.b - x.t);
  const ratio = (q) => area(cut(cut(q, armed), clipR())) / Math.max(1, area(q));
  const arm = () => { armed = R(); at = { x: armed.l, y: armed.t }; r0 = ratio(armed); };
  const engaged = () => root.dataset.held !== undefined || root.dataset.kbd !== undefined;
  const tick = () => { if (!engaged()) armed = null; else if (!armed) arm(); else if (Math.abs(ratio(R()) - r0) > 1e-3) arm(); requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  new MutationObserver((recs) => {
    if (!engaged() || !armed || !recs.some((x) => x.type === "childList")) return;
    const q = R(); const dx = at.x - q.l, dy = at.y - q.t; arm();
    if (Math.hypot(dx, dy) > 0.5) root.animate([{ translate: dx + "px " + dy + "px" }, { translate: "0 0" }], { duration: 300, easing: SPRING });
  }).observe(document.getElementById("stage"), { childList: true, subtree: true });
}
function mountScene() {
  const stage = document.getElementById("stage"); stage.innerHTML = ${JSON.stringify(body)};
  arm(); checkClocks();
  if (SCENE === "pop" || SCENE === "rest") {
    const el = stage.querySelector(".ctl");
    // H5: the committed fill lands at once (the state's own paint; its transition is held off for the flip's frames) and
    // the commit's light is the transient over it, so the light rises from below IN PAINT (a light that rides a fill
    // moving the other way is absorbed in paint: the Radio dark's class, P-A4 §0.4; the composite could not see that)
    // H7: under reduce nothing transitions across the flip (the resting scale of the rest scene lands at once too: holding
    // only "scale" routed it through the reduce arm's 55 ms !important clock, 2 frames in flight on WebKit's 10 ms frames)
    const set = (v, how) => { model = v; el.style.transitionProperty = prm() ? "none" : "scale"; requestAnimationFrame(() => requestAnimationFrame(() => { el.style.transitionProperty = ""; })); el.dataset.state = v ? "on" : "off"; el.setAttribute("aria-checked", String(v));
      if (quietSet()) return;
      if (FAULT === "e2-prog" && how === "model") return; pop(el); };
    E.commit = () => set(!model, "model");
    let lastTouch = -1e9; el.addEventListener("touchstart", () => { lastTouch = performance.now(); }, { passive: true });
    el.addEventListener("click", (e) => {
      if (FAULT === "cap-nocommit" && (e.pointerType === "touch" || performance.now() - lastTouch < 1000)) return;
      if (FAULT === "e2-nocoarse" && (e.pointerType === "touch" || performance.now() - lastTouch < 1000)) { model = !model; el.dataset.state = model ? "on" : "off"; return; } set(!model, "event"); });
    el.addEventListener("keydown", (e) => { if ((e.key === " " || e.key === "Enter") && FAULT !== "e2-notdriven") { e.preventDefault(); set(!model, "event"); } });
    if (FAULT === "e2-tabpop") el.addEventListener("focus", () => pop(el));
    if (FAULT === "e2-mountpop" && ON) requestAnimationFrame(() => pop(el));
  }
  if (SCENE === "act") {
    // a stateless control: activation counts; the clean control lights on its click, the plant only on pointerup and
    // keydown (so a script click() counts with no light)
    const el = stage.querySelector(".ctl");
    el.addEventListener("click", () => { count++; if (FAULT !== "e2-statelessclick") pop(el); });
    if (FAULT === "e2-statelessclick") { el.addEventListener("pointerup", () => pop(el)); el.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") pop(el); }); }
  }
  if (SCENE === "travel") {
    const segs = [...stage.querySelectorAll(".seg")]; const ind = stage.querySelector(".ind");
    const xOf = (s) => s.offsetLeft - 4;
    ind.style.translate = xOf(segs.find((s) => s.getAttribute("aria-checked") === "true")) + "px 0";
    const select = (s, how) => {
      const from = parseFloat(ind.style.translate) || 0; const to = xOf(s);
      segs.forEach((x) => { const c = x === s; x.setAttribute("aria-checked", String(c)); x.tabIndex = c ? 0 : -1; });
      selIdx = segs.indexOf(s);
      ind.style.translate = to + "px 0";
      if (from === to || quietSet()) return;
      // reduce: the body lands (no travel) and the commit keeps its light leg on the chosen segment (CK-10)
      if (prm() && FAULT !== "e9-glide") { pop(s); return; }
      if (FAULT === "e2-fade") { s.animate([{ opacity: 0.6 }, { opacity: 1 }], { duration: 120, easing: "linear" }); return; }
      const lin = FAULT === "e2-glide" || (FAULT === "e2-prog" && how === "model");
      ind.animate([{ translate: from + "px 0" }, { translate: to + "px 0" }], { duration: tok("--spring-press-duration"), easing: lin ? "linear" : SPRING });
    };
    E.commit = () => select(segs[1], "model");
    segs.forEach((s, i) => { s.addEventListener("click", () => { select(s, "event"); s.focus(); });
      s.addEventListener("keydown", (e) => { const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0; if (!d) return; e.preventDefault(); const n = segs[(i + d + 3) % 3]; select(n, "event"); n.focus(); }); });
  }
  if (SCENE === "slider" || SCENE === "slider2") {
    const vals = [...stage.querySelectorAll(".fx-slider")].map(wireSlider);
    E.state = () => vals.map((v) => Math.round(v()));
    E.commit = () => { const th = stage.querySelector(".fx-thumb"); th.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })); };
    // CK-20: a sibling inserted before the slider during a hold (a parent re-render)
    E.insertSibling = () => { const s = document.getElementById("slot"); if (s) s.innerHTML = '<div style="height:40px"></div>'; };
    // H5: a layout-only move (a style write on a spacer before the slider; no childList mutation)
    E.grow = (px) => { const s = document.getElementById("spacer"); if (s) s.style.height = px + "px"; };
  }
  if (SCENE === "restale") {
    const root = stage.querySelector(".fx-slider"); const val = wireSlider(root);
    E.state = () => Math.round(val());
    E.grow = (px) => { document.getElementById("spacer").style.height = px + "px"; };
    E.tick = () => { const s = document.createElement("span"); s.textContent = "·"; document.getElementById("ticker").appendChild(s); };
    // H5 plants: a stage that glides the engaged slider from its last-read place on a childList mutation (C-E4 §0.1);
    // e10-staleresize also re-reads the place on the spacer's style write (a viewport resize stays unread)
    if (FAULT === "e10-stale" || FAULT === "e10-staleresize") {
      let at = null; const place = () => root.getBoundingClientRect().top + scrollY;
      const engaged = () => root.dataset.held !== undefined || root.dataset.kbd !== undefined;
      new MutationObserver(() => { if (engaged()) { if (at == null) at = place(); } else at = null; }).observe(root, { attributes: true, attributeFilter: ["data-held", "data-kbd"] });
      new MutationObserver((recs) => {
        if (!engaged() || at == null) return;
        if (recs.some((r) => r.type === "childList")) { const now = place(); const d = at - now; at = now; if (Math.abs(d) > 0.5) root.animate([{ translate: "0 " + d + "px" }, { translate: "0 0" }], { duration: 300, easing: SPRING }); }
        else at = place();
      }).observe(stage, { childList: true, subtree: true, ...(FAULT === "e10-staleresize" ? { attributes: true, attributeFilter: ["style"] } : {}) });
    }
    if (FAULT === "e10-ratio1") ratioStage(root, null);
  }
  if (SCENE === "clipstale") {
    const root = stage.querySelector(".fx-slider"); const val = wireSlider(root);
    E.state = () => Math.round(val());
    E.grow = (px) => { document.getElementById("spacer").style.height = px + "px"; };
    E.tick = () => { const s = document.createElement("span"); s.textContent = "·"; document.getElementById("ticker").appendChild(s); };
    if (FAULT === "e10-clipratio" || FAULT === "e10-clipratioptr") ratioStage(root, stage.querySelector('[data-t="box"]'));
    // H7 plant e10-clipvanish (C-E6 §0.2): the keyboard engagement promotes the slider into the top layer, where the
    // scroller cannot clip it; it follows its place on scroll and is hidden whole when that place leaves the scroller
    if (FAULT === "e10-clipvanish") {
      const box = stage.querySelector('[data-t="box"]'), wrap = stage.querySelector('[data-t="slider-a"]'); let up = false;
      const place = () => { if (!up) return; const r = wrap.getBoundingClientRect(), b = box.getBoundingClientRect(); const t = b.top + box.clientTop, bt = t + box.clientHeight; const vis = Math.min(r.bottom, bt) - Math.max(r.top, t);
        root.style.top = r.top + (r.height - root.offsetHeight) / 2 + "px"; root.style.left = r.left + 20 + "px"; root.style.visibility = vis > 0 ? "" : "hidden"; };
      new MutationObserver(() => { const k = root.dataset.kbd !== undefined;
        if (k && !up) { up = true; wrap.style.height = wrap.offsetHeight + "px"; const w = root.offsetWidth, hh = root.offsetHeight; root.popover = "manual"; root.style.cssText += ";position:fixed;inset:auto;margin:0;padding:0;border:0;overflow:visible;width:" + w + "px;height:" + hh + "px;background:var(--ctl)"; root.showPopover(); place(); }
        else if (!k && up) { up = false; root.hidePopover(); root.removeAttribute("popover"); for (const q of ["position", "inset", "margin", "padding", "border", "overflow", "width", "height", "background", "top", "left", "visibility"]) root.style.removeProperty(q); wrap.style.height = ""; }
      }).observe(root, { attributes: true, attributeFilter: ["data-kbd"] });
      box.addEventListener("scroll", place);
    }
    // H8 plants (CK-20, the place-paint invariant; REGISTRY §P7-8.1): the engaged slider (keyboard or touch) promoted into
    // the top layer and placed over its place. e10-clipouter: never clipped, never hidden (C-E7's clipOnly). e10-rectclip-*:
    // the pass-7 construction: clipped to its scroller's overflow RECTANGLE (no radius, no mask), the place written in the
    // scroll's frame and the clip LAG frames late, the width its layout width (no ancestor scale). e10-layoutplace: placed
    // from layout offsets, which no ancestor transform moves. LAG 3: a clip one frame late (pass-7's lag) is resolved by
    // Chromium's film but not by WebKit's (H8 §2, the first WebKit self-test), so the plant writes it three frames late
    // (≈ 50 ms, two of WebKit's 25 fps video frames) to show the film cell can fail in both engines
    // H9: e10-ancpromote is the pass-8 copy (the place's rect, its overflow clip written each frame, nothing else);
    // e10-traillate places it one frame late from the frame loop alone (no scroll listener) and writes no clip
    if (/^e10-(clipouter|rectclip|layoutplace|ancpromote|traillate)/.test(FAULT)) {
      const box = stage.querySelector('[data-t="box"]'), wrap = stage.querySelector('[data-t="slider-a"]'); let up = false, lag = [], raf = 0; const LAG = 3;
      const rect = FAULT.startsWith("e10-rectclip"), layout = FAULT === "e10-layoutplace", late = FAULT === "e10-traillate"; let prev = null;
      const at = () => {
        if (layout) { let x = 0, y = 0; for (let e = wrap; e; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; } return { left: x - box.scrollLeft - scrollX + 20, top: y - box.scrollTop - scrollY + (wrap.offsetHeight - root.offsetHeight) / 2 }; }
        const r = wrap.getBoundingClientRect(), k = r.width / wrap.offsetWidth;
        return { left: r.left + 20 * k, top: r.top + (r.height - root.offsetHeight * (rect ? 1 : k)) / 2 };
      };
      const clipNow = () => { if (FAULT === "e10-clipouter") return ""; const b = box.getBoundingClientRect(), e = root.getBoundingClientRect();
        const t = b.top + box.clientTop, l = b.left + box.clientLeft, bt = t + box.clientHeight, br = l + box.clientWidth, sx = e.width / root.offsetWidth || 1;
        return "inset(" + [Math.max(0, t - e.top), Math.max(0, e.right - br), Math.max(0, e.bottom - bt), Math.max(0, l - e.left)].map((v) => (v / sx).toFixed(2) + "px").join(" ") + ")"; };
      const place = () => { if (!up || late) return; const p = at(); root.style.left = p.left + "px"; root.style.top = p.top + "px"; if (!rect) root.style.clipPath = clipNow(); };
      const loop = () => { if (!up) return; if (late) { const p = at(); if (prev) { root.style.left = prev.left + "px"; root.style.top = prev.top + "px"; } prev = p; } else place(); if (rect) { lag.push(clipNow()); if (lag.length > LAG) root.style.clipPath = lag.shift(); } raf = requestAnimationFrame(loop); };
      const engagedNow = () => root.dataset.kbd !== undefined || root.dataset.held !== undefined;
      new MutationObserver(() => { const k = engagedNow();
        if (k && !up) { up = true; lag = []; prev = null; wrap.style.height = wrap.offsetHeight + "px"; const w = root.offsetWidth, hh = root.offsetHeight; root.popover = "manual"; root.style.cssText += ";position:fixed;inset:auto;margin:0;padding:0;border:0;overflow:visible;width:" + w + "px;height:" + hh + "px;background:var(--ctl)"; root.showPopover(); if (late) { const p = at(); root.style.left = p.left + "px"; root.style.top = p.top + "px"; } place(); if (rect) root.style.clipPath = clipNow(); raf = requestAnimationFrame(loop); }
        else if (!k && up) { up = false; cancelAnimationFrame(raf); root.hidePopover(); root.removeAttribute("popover"); for (const q of ["position", "inset", "margin", "padding", "border", "overflow", "width", "height", "background", "top", "left", "clip-path"]) root.style.removeProperty(q); wrap.style.height = ""; }
      }).observe(root, { attributes: true, attributeFilter: ["data-kbd", "data-held"] });
      box.addEventListener("scroll", place);
      // e10-traillate forwards a wheel over the promoted body to its scroller, as the library's stage does
      if (late) root.addEventListener("wheel", (e) => { if (!up) return; e.preventDefault(); box.scrollTop += e.deltaY; }, { passive: false });
    }
  }
  if (SCENE === "slider" || SCENE === "clipstale" || (SCENE === "presented" && DLGS)) {
    const root = SCENE === "presented" ? stage.querySelector('[data-t="dlg-slider"] .fx-slider') : stage.querySelector(".fx-slider");
    const engaged = () => root.dataset.held !== undefined || root.dataset.kbd !== undefined;
    if (LAYOUT_GLIDE) {
    // H9 (CK-20, glidescale): the re-render glide. H12 (REGISTRY §P11-7 items 2, 5; §P11-8.1, CK-20's frame family): while engaged,
    // a childList change anywhere in the document glides the slider from where it was painted to its new place, on the travel's row
    // (travelOf), instant under reduce. Its offset chain is read every frame while engaged, so a layout move with no mutation is never
    // glided by a later one (H5's stale place). On a mutation each box's offset change is brought into painted px through that box's
    // own frame read NOW (its ancestors' transforms and its zoom: an offset is in its box's own CSS px), and the sum over the root's
    // frame is the translate, in the root's own px: a move inside, outside or nested outside a transformed or zoomed ancestor, or
    // across a positioned box in the chain, starts where the root was painted. An ancestor's running scale moves no offset, so an
    // unrelated mutation glides nothing. Plants: e10-glidescale (the translate in painted px, not over the root's frame: 20 % short
    // under 0.8), e10-hostglideratio (each offset over the zoom ratio alone, no transform: the pass-11 candidate's flowBox),
    // e10-hostglideone (no ratio at all: C-A11's flowone, C-E11's hostzoom), e10-hostglideframe (the accumulated flow, each
    // box's offset through its whole painted frame, its own transform with it, cached a frame behind the read: C-A11's glideframe as
    // written, which reads an ancestor's running scale as a move)
    let chain = null, flowWas = null;
    const read = () => { const c = []; for (let e = root; e; e = e.offsetParent) c.push({ e, x: e.offsetLeft, y: e.offsetTop }); return c; };
    const weight = (e) => { if (FAULT === "e10-hostglideone") return 1; if (FAULT === "e10-hostglideratio") return e.currentCSSZoom; if (FAULT === "e10-hostglideframe") return e.offsetWidth ? e.getBoundingClientRect().width / e.offsetWidth : 1; const p = e.parentElement; return fxFrame(e) * e.currentCSSZoom / (p ? p.currentCSSZoom : 1); };
    const unit = () => (FAULT === "e10-hostglideone" || FAULT === "e10-glidescale" ? 1 : FAULT === "e10-hostglideratio" ? root.currentCSSZoom : fxFrame(root));
    const flow = (c) => c.reduce((s, b) => { const w = weight(b.e); return { x: s.x + b.x * w, y: s.y + b.y * w }; }, { x: 0, y: 0 });
    let flowCur = null; const loop = () => { chain = engaged() ? read() : null; if (FAULT === "e10-hostglideframe") { flowWas = flowCur; flowCur = chain ? flow(chain) : null; } requestAnimationFrame(loop); }; requestAnimationFrame(loop);
    new MutationObserver((recs) => {
      if (!engaged() || !chain || !recs.some((x) => x.type === "childList")) return;
      const now = read(); const was = FAULT === "e10-hostglideframe" ? (flowWas ?? flow(chain)) : flow(chain); const is = flow(now); chain = now; if (FAULT === "e10-hostglideframe") flowWas = is;
      const u = unit(); const dx = (was.x - is.x) / u, dy = (was.y - is.y) / u;
      if (Math.hypot(dx, dy) > 0.5 && !prm()) { const tv = travelOf(root); if (tv) root.animate([{ translate: dx + "px " + dy + "px" }, { translate: "0 0" }], { duration: tv.ms, easing: tv.easing, composite: "add" }); }
    }).observe(document.body, { childList: true, subtree: true });
    } else if (RECORD_GLIDE) hostGlide(root, engaged);
    else s14Stage(root, engaged);
  }
  if (SCENE === "presented") {
    // H6 (CK-10): the dialog presents and dismisses on its class; its clock is read loudly like every act's
    const d = stage.querySelector(".fx-pdialog");
    E.open = (v) => { checkClocks(); d.classList.toggle("open", !!v); };
    // H9 (CK-20, dlg): the slider in the plate; Escape dismisses when no slider was engaged at the key (the first Escape
    // releases the slider, the second closes), a click outside the plate dismisses; the plate fades on the release clock and
    // leaves 40 ms after it. e10-dlgpromote promotes the engaged slider and keeps it promoted 400 ms past its release
    if (DLGS) {
      const root = stage.querySelector('[data-t="dlg-slider"] .fx-slider'); const val = wireSlider(root); E.state = () => Math.round(val());
      let closing = false, wasEng = false;
      const close = () => { if (closing) return; closing = true; checkClocks(); d.classList.remove("open"); setTimeout(() => d.remove(), ms("--engage-control-engage-release") + 40); };
      addEventListener("keydown", (e) => { if (e.key === "Escape") wasEng = engagedAny(); }, true);
      addEventListener("keydown", (e) => { if (e.key === "Escape" && !wasEng) close(); });
      addEventListener("click", (e) => { if (!d.contains(e.target)) close(); });
      if (FAULT === "e10-dlgpromote") new MutationObserver(() => { if (root.dataset.kbd !== undefined) { clearTimeout(root._dt); promote(root, true); } else { clearTimeout(root._dt); root._dt = setTimeout(() => promote(root, false), 400); } }).observe(root, { attributes: true, attributeFilter: ["data-kbd"] });
    }
  }
  if (SCENE === "capsule") {
    const c = stage.querySelector(".capx");
    c.addEventListener("click", () => c.setAttribute("aria-pressed", String(c.getAttribute("aria-pressed") !== "true")));
    // H7 control e12-openpop: the composer opens on pointerdown (the SelectTrigger's class) and pops ×1.02 as it opens
    if (FAULT === "e12-openpop") c.addEventListener("pointerdown", () => { const o = c.getAttribute("data-state") !== "open"; c.setAttribute("data-state", o ? "open" : "closed"); c.setAttribute("aria-expanded", String(o)); if (o) c.animate([{ scale: "1" }, { scale: "1.02", offset: 0.4 }, { scale: "0.997", offset: 0.7 }, { scale: "1" }], { duration: 600 }); });
    const ch = stage.querySelector(".fxchip"); ch.addEventListener("click", () => ch.setAttribute("aria-pressed", String(ch.getAttribute("aria-pressed") !== "true")));
    // the latch on a coarse pointer's activation (the tap's click: both engines deliver it)
    if (FAULT === "e12-capsulelatch") c.addEventListener("click", () => { if (!matchMedia("(pointer: coarse)").matches) return; c.classList.add("lat"); setTimeout(() => c.classList.remove("lat"), 2000); });
  }
  if (SCENE === "passive" || SCENE === "field") E.state = () => null;
  if (SCENE === "ambient") {
    const a = stage.querySelector(".fx-amb");
    if (FAULT !== "e1-ambientdead" && FAULT !== "e1-gpuambientdead" && FAULT !== "e1-ambientlimit") a.addEventListener("pointermove", (e) => { const r = a.getBoundingClientRect(); a.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%"); a.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%"); });
  }
  if (SCENE === "restloop" && FAULT !== "e12-restloop") {
    // the clean loop pauses while it is off-screen (CK-16)
    const l = stage.querySelector(".loop");
    new IntersectionObserver(([en]) => { l.style.animationPlayState = en.isIntersecting ? "running" : "paused"; }).observe(l);
  }
  if (SCENE === "vsheet") {
    // a bottom sheet sized by its rung; the grip drags it; the release velocity picks the detent
    const sheet = stage.querySelector(".fx-sheet"), grip = stage.querySelector(".fx-grip");
    // detents 0.25/0.45/0.75/1: E-4's 120 px drive from 0.25 ends past the 0.45 detent's midpoint toward 0.75, so a still
    // release settles back to 0.45 and a fling goes on to 0.75. At 0.25/0.5 the drive ended 5 px under the 0.5 detent,
    // fling and still chose it alike, and the fixture passed only on the spring's velocity overshoot, which load shrank
    // below 4 px (pass-2/H2.md §2.1)
    const VH = () => innerHeight, D = [0.25, 0.45, 0.75, 1]; let h = 0.25 * VH(), drag = null, raf = 0;
    const put = () => { sheet.style.height = h + "px"; }; put();
    grip.addEventListener("pointerdown", (e) => { cancelAnimationFrame(raf); grip.setPointerCapture(e.pointerId); drag = { h0: h, cy: e.clientY, hist: [{ t: performance.now(), h }] }; });
    grip.addEventListener("pointermove", (e) => { if (!drag) return; h = Math.max(0, Math.min(VH(), drag.h0 - (e.clientY - drag.cy))); put(); drag.hist.push({ t: performance.now(), h }); if (drag.hist.length > 6) drag.hist.shift(); });
    const release = () => { if (!drag) return; const now = performance.now(), H = drag.hist, hs = H.slice(-3); drag = null;
      let v = hs.length > 1 && !stale(H, now) ? (hs.at(-1).h - hs[0].h) / Math.max(1, hs.at(-1).t - hs[0].t) * 1000 : 0;
      if (FAULT === "e4-vdrop") v = 0; // the plant: the release forgets its velocity (no projection, no seeded spring)
      if (FAULT === "e4-zerofling" && RUN === 2) v = 0; // H7: one repeat run drops its velocity (a 0.00 px fling)
      const VT = FAULT === "e4-velsplit" ? 500 : 50; // H7 control: the next detent only above 500 px/s
      // the detent: a release faster than 50 px/s picks the next detent in its direction (a still release reads 0: its
      // hand stopped 600 ms before; 50, not 300: a loaded harness paces the three 40 px moves ~150 ms apart, 270 px/s) (the velocity chooses, and
      // the same drive chooses the same one on every run); a slower one the nearest
      const Dp = D.map((d) => d * VH());
      let ti = Dp.reduce((a, b, i, arr) => (Math.abs(b - h) < Math.abs(arr[a] - h) ? i : a), 0);
      if (v > VT) ti = Dp.findIndex((d) => d > h + 1); else if (v < -VT) ti = Dp.map((d, i) => [d, i]).filter(([d]) => d < h - 1).pop()?.[1] ?? 0;
      if (ti < 0) ti = Dp.length - 1;
      if (FAULT === "e4-flaky" && v && RUN % 2 === 1) ti = Math.max(0, ti - 1); // the plant: another run, another detent
      const target = D[ti] * VH();
      if (prm()) { h = target; put(); return; }
      const k = 322, c = 2 * 0.75 * Math.sqrt(k); let t0 = performance.now();
      const step = (t) => { const dt = Math.min(0.032, (t - t0) / 1000); t0 = t; v += (-k * (h - target) - c * v) * dt; h += v * dt; put();
        if (Math.abs(v) > 1 || Math.abs(h - target) > 0.2) raf = requestAnimationFrame(step); else { h = target; put(); } };
      raf = requestAnimationFrame(step); };
    grip.addEventListener("pointerup", release); grip.addEventListener("pointercancel", release);
  }
  if (SCENE === "strip" && FAULT === "e4-stripstop") {
    const s = stage.querySelector(".fx-strip"); s.style.touchAction = "none"; let sx = 0, s0 = 0;
    s.addEventListener("touchstart", (e) => { s.style.scrollSnapType = "none"; sx = e.touches[0].clientX; s0 = s.scrollLeft; }, { passive: true });
    s.addEventListener("touchmove", (e) => { s.scrollLeft = s0 - (e.touches[0].clientX - sx); }, { passive: true });
    s.addEventListener("touchend", () => { s.scrollLeft = Math.round(s.scrollLeft / s.clientWidth) * s.clientWidth; s.style.scrollSnapType = ""; });
  }
}
// CK-01: the rendered members. Each [data-member] root and its own elements (a nested member's subtree is its own);
// handlers are the elements marked data-handler (the build reads its vnodes' on* props instead); data-handler="lib" is
// one a third-party component binds inside the member (H3: library-internal, not counted)
E.members = () => [...document.querySelectorAll("[data-member]")].map((root) => {
  const own = [root, ...root.querySelectorAll("*")].filter((e) => e.closest("[data-member]") === root);
  return { dir: root.dataset.member, root, els: own, handlers: own.filter((e) => e.getAttribute("data-handler") === ""), libHandlers: own.filter((e) => e.getAttribute("data-handler") === "lib") };
});
E.state = () => null;
// H4 (CK-19): the scene states when its subject cannot paint its rung's input in this engine (the scene app reads the
// Aurora's resolved substrate); the fixture's ambient field states it under e1-ambientlimit
E.limit = () => (SCENE === "ambient" && FAULT === "e1-ambientlimit" ? "the fixture's ambient field resolved a static ground in this engine (plant e1-ambientlimit)" : null);
if (SCENE === "pop" || SCENE === "rest") E.state = () => (model ? "on" : "off");
if (SCENE === "travel") E.state = () => selIdx;
if (SCENE === "act") E.state = () => count;
if (SCENE === "capsule") E.state = () => document.querySelector(".capx")?.getAttribute("aria-pressed") ?? null;
// H3: the deferred mount renders in the caller's task (await __e.mount() resolves in a microtask), as the scene app's
// does: CK-03's "own" arrival is the mount's own task
E.mount = async () => { mountScene(); };
if (!DEFER) mountScene();
// ready once the commit is armed (a mounted page) or at once (a deferred one): a loaded machine can hold rAF past 150 ms
const ready = () => { if (!DEFER && !armed) return setTimeout(ready, 30); E.ready = true; window.__e = E; };
setTimeout(ready, 150);
`;
  return `<!doctype html><html${dark ? ' class="dark"' : ""}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>D5 fixture</title><style>${css}</style></head>
<body><main data-scene="${scene}"><button data-sentinel="before">before</button><div id="stage" style="padding:24px 0"></div><button data-sentinel="after">after</button></main>
<script>${script}</script></body></html>`;
}
