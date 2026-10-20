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
  "e2-literalflash": { why: "CK-02 arm iii: the commit's light rises and decays on 300 ms, a clock no ENGAGE_ENVELOPES row carries", witnesses: ["E-2"], cell: /pop commit·keyboard/ },
  "e2-geompop": { why: "CK-02 arm ii unadmitted: the commit is a geometric pop alone (1.08 crest), which the default arms (i, iii) do not admit", witnesses: ["E-2"], cell: /pop commit·keyboard/ },
  "e2-bigpop": { why: "CONTROL, must PASS with arm ii admitted (--commit-arms i,ii,iii): the 1.08 geometric pop clears 0.8 px on the face with a bounce", witnesses: ["E-2"], expect: "pass", args: ["--commit-arms", "i,ii,iii"] },
  "e2-smallpop": { why: "CK-02 arm ii admitted: a 1.004 crest moves the painted face 0.4 px (C-A r26's pop), under the 0.8 px floor", witnesses: ["E-2"], cell: /pop commit·keyboard/, args: ["--commit-arms", "i,ii,iii"] },
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
  "e4-flaky": { why: "CK-05: the same drive lands on another detent on another run (C-B §1: 130 or 255 px)", witnesses: ["E-4"], cell: /vsheet repeat landing/ },
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
  "e10-snap": { why: "CK-20: Tab from slider A to slider B drops A to rest in one frame (C-E r32)", witnesses: ["E-10"], cell: /hand-off drop/ },
  "e10-veildip": { why: "CK-20: the shared veil is torn down at A's release and re-ramps from 0 for B (C-E r32)", witnesses: ["E-10"], cell: /hand-off veil/ },
  "e10-escsnap": { why: "CK-20: Escape releases the keyboard engagement in one frame", witnesses: ["E-10"], cell: /escape release/ },
  "e10-rerender": { why: "CK-20: the held slider is pinned out of flow; a sibling inserted during the hold makes the release land in its new slot in one frame (P-E/rerender-probe.md)", witnesses: ["E-10"], cell: /re-render landing/ },
  // ── H3 (pass 3): a plant per new cell (REGISTRY §P2-7 items 1-7) ──
  "e1-ownhandler": { why: "CK-01 (H3 handler rule): the static card (delta) carries a click handler its member binds, with no role and no tabindex: the library-internal exemption must not swallow it", witnesses: ["E-1"], cell: /static-inert delta/ },
  "e1-libhandler": { why: "CONTROL, must PASS (H3 handler rule): the static card carries only a handler a third-party component binds inside it (reka-ui's Label mousedown, C-A2 CK-01); pass 2's census counted it live", witnesses: ["E-1"], expect: "pass" },
  "e1-unrendered": { why: "CK-01 (H3 gallery): a member the scene app's error boundary caught leaves [data-t=unrendered]; the census names it", witnesses: ["E-1"], cell: /gallery rendered/ },
  "e2-arrival": { why: "CK-03 (H3): no one-frame arming: a model set in the mount's own task lights the commit (B's lesson, F-7)", witnesses: ["E-2"], cell: /pop arrival·own (light|dark)/ },
  "e2-arrivalflush": { why: "CK-03 (H3, the style-read control): the commit light is a CSS transition and the only arming is the absence of a before-change style, so a model set in the mount's own task is quiet until something reads style during the mount, then lights (A's defect, C-CP §0 item 5)", witnesses: ["E-2"], cell: /pop arrival·ownflush/ },
  "e2-arrivalmute": { why: "CK-03 (H3): the arming never arms on a deferred mount: a model set after first paint commits with no light", witnesses: ["E-2"], cell: /pop arrival·late/ },
  "e2-statelessclick": { why: "CK-02 (H3 stateless ruling): the stateless control lights from its pointerup and keydown handlers only, so element.click() (its programmatic commit) activates it with no light", witnesses: ["E-2"], cell: /act commit·programmatic/ },
  "e2-noground": { why: "CK-02 (H3 ground ruling): the page paints no ground behind the face; the light read must refuse to grade it rather than composite on an assumed white (CP §3.5)", witnesses: ["E-2"], cell: /pop commit·keyboard/ },
  "e2-dither": { why: "CONTROL, must PASS (H3 resolution): the committed face is near-white (#eef0f4) and rests on a one-quantum 8-bit dither; one quantum there is ≈ 0.008 of luminance, above pass 2's flat 0.004 rest bound", witnesses: ["E-2"], expect: "pass" },
  "e2-shimmer": { why: "CK-02 (H3 resolution): after the commit the face's fill keeps flickering by four 8-bit steps (≈ 0.013 on the accent): a light that never rests, above one quantum", witnesses: ["E-2"], cell: /pop commit·keyboard/ },
  "e9-fillonly": { why: "CK-10 (H3): under reduced motion the commit keeps only the committed state's fill change, its light transient zeroed (A2's light under the library's PRM fallback, C-CP CK-10)", witnesses: ["E-9"], cell: /pop commit-light/ },
  "e10-teleport": { why: "CK-20 (H3 position): on the hand-off the OUTGOING slider jumps onto the incoming one's place for 300 ms, then jumps home; its scale releases smoothly (C-E2 §0.1's 68 px teleport)", witnesses: ["E-10"], cell: /hand-off drop/ },
  "e10-teleportin": { why: "CK-20 (H3 position): the INCOMING slider appears on the outgoing one's place for 200 ms, then jumps home (C-E2 §0.1, Shift+Tab B → A)", witnesses: ["E-10"], cell: /hand-off rev/ },
  "cap-nocommit": { why: "CK-25 (H3 capture): a touch tap does not commit the control: the coarse 'committed' frame must say NOT COMMITTED, never show a frame as a commit", witnesses: ["CAP"], cell: /coarse.*committed/ },
  // ── H4 (pass 4): a plant per new cell (REGISTRY §P3-8.3 wave 1) ──
  "e10-twoengaged": { why: "CK-15 (H4): on the hand-off the outgoing slider keeps its engagement for 250 ms after the incoming one takes it: two engaged controls on the same frames (its scale and position stay lawful)", witnesses: ["E-10"], cell: /hand-off singleton fwd/ },
  "e1-ambientlimit": { why: "CONTROL, must read UNMEASURED (H4, CK-19): the ambient field states that it resolved a static ground in this engine (the Aurora's software-raster guard) and does not follow the pointer; the cell is the engine's limit, never a pass and never a fail", witnesses: ["E-1"], cell: /runtime ambient \(theta\) ·/, expect: "unmeasured" },
  "e5-flaky": { why: "CK-06 (H4 three-read rule): the held press light sags back toward rest on one touch hold in three (every third page load of the scene); a one-read rule passes it two times in three", witnesses: ["E-5"], cell: /pop sustain/ },
  "e12-fcslop": { why: "CK-14 (H4): the forced-colours arm hides every ::after, the coarse trigger's 44 px hit-slop included (C-A3 §0.2: engage.css:225-230 on the dock triggers)", witnesses: ["E-12"], cell: /slop fcslop/ },
  "e12-fcreach": { why: "CK-27 (H4): the control's ::after is a 6 px hit ring around it, and the forced-colours arm removes it: the arm reaches a pseudo-element beyond the slop scene (the widened cell must find it on every scene)", witnesses: ["E-12"], cell: /pop fc-reach/ },
  "e12-restloop": { why: "CK-16 (H4): the rest loop keeps running off-screen (C-A3 §0.4: Skeleton and StatusDot 3000-4346 px off-screen)", witnesses: ["E-12"], cell: /restloop rest-running off-screen/ },
  "e12-restlayout": { why: "CK-16 (H4): the rest loop animates width, a layout every frame at rest (W-F.6's 0 layouts/s)", witnesses: ["E-12"], cell: /restloop rest layouts/, engines: ["chromium"] },
  "e12-wheelchain": { why: "CK-22 (H4): the keyboard-engaged slider is promoted to the top layer, so a wheel over it inside a scroller scrolls the page and not the box (C-E3 §0.3: +30 page, +0 box)", witnesses: ["E-12"], cell: /wheel over engaged control/ },
  "e12-wheelrow": { why: "CONTROL, must PASS (H4): the same promotion with the route's MIGRATION row cited (--migration wheel): the wheel cell REPORTs and the critic scores the row", witnesses: ["E-12"], expect: "pass", args: ["--migration", "wheel"] },
  "e12-anchorlost": { why: "CK-22 (H4): the engagement writes its own position-anchor on the root and removes the property on release, so a consumer's anchor is gone after the release (C-E3 §0.3, E-M1)", witnesses: ["E-12"], cell: /consumer anchor · escape/ },
  "e11-silent": { why: "CK-21: the engagement reads --fx-scale-engage at runtime and, when it is unreadable, degrades to no grow with no console.error", witnesses: ["E-11"], cell: /fail-loud/ },
  "e11-unread": { why: "CONTROL: the grow spells its figure in place and reads no token, so an unreadable token degrades nothing: UNMEASURED, not a pass", witnesses: ["E-11"], cell: /fail-loud/, expect: "unmeasured" },
  "e11-noise": { why: "CONTROL (H2 §2.3): the grow spells its figure in place, reads no token, and varies run to run (1.060, 1.061, 1.066, 1.054, 1.060 on successive slider loads); one planted read outside a two-run spread is noise, not a degradation: UNMEASURED, never FAIL", witnesses: ["E-11"], cell: /fail-loud/, expect: "unmeasured" },
};

const CONTROL_GATES = ["E-2", "E-8", "E-9"];
export const FIXTURE_INDEX = {
  pop: { gates: [...CONTROL_GATES, "E-5"], key: "Space", target: ".ctl" },
  travel: { gates: CONTROL_GATES, key: "ArrowRight", target: '.seg[data-v="b"]' },
  rest: { gates: CONTROL_GATES, key: "Space", target: ".ctl" },
  // H3: a stateless control (a counter, no model): E-2 drives its programmatic commit as element.click()
  act: { gates: CONTROL_GATES, key: "Space", target: ".ctl", stateless: true },
  slider: { gates: ["E-3", "E-4", "E-7", "E-9", "E-10", "E-11", "E-12"], key: "ArrowRight", veil: ".fx-veil", engaged: "[data-held], [data-kbd]", floor: ["wheel", "anchor"], failLoud: [{ token: "--fx-scale-engage", value: "nonsense", act: "kbd" }] },
  // H4: the fixture slider marks its engagement as data-held (the hand) or data-kbd (the keyboard)
  slider2: { gates: ["E-10"], veil: ".fx-veil", engaged: "[data-held], [data-kbd]", pair: ['.fx-slider[data-n="A"]', '.fx-slider[data-n="B"]'] },
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
export function fixturePage(params, fault = "") {
  const scene = params.get("scene") ?? "__index";
  const noise = fault === "e11-noise" && scene === "slider" ? E11_NOISE[e11n++ % E11_NOISE.length] : null;
  const dark = params.get("theme") === "dark";
  const on = params.get("on") === "1";
  const defer = params.get("defer") === "1";
  const phone = params.get("phone") === "1";
  const run = +(params.get("run") ?? 0);
  const F = (id) => fault === id;
  const nopress = F("e1-dead") || F("e5-hover");
  const sag = fault === "e5-flaky" && scene === "pop" && e5n++ % 3 === 2;

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
.engage-pressed { --rung-class: pressed; } .engage-chosen { --rung-class: chosen; } .engage-held { --rung-class: held; }
.engage-static { --rung-class: static; } .engage-field { --rung-class: field; } .engage-ambient { --rung-class: ambient; }
:root { --spring-press-duration: 350ms; --spring-press: ${SPRING};
  --engage-press-drain-attack: ${F("e8-drift") ? 56 : 55}ms; --engage-press-drain-release: 120ms;
  --engage-control-engage-attack: 60ms; --engage-control-engage-release: ${F("e8-units") ? ".18s" : "180ms"};
  --fx-scale-engage: 1.06;
  --bg: #f4f4f6; --ink: #111; --ctl: #d8dbe2; --ctl-hover: #cfd3dc; --ctl-press: #b9bfcc; --accent: #3b6cf0; }
.dark { --bg: #15161a; --ink: #eee; --ctl: #33363f; --ctl-hover: #3b3f49; --ctl-press: #4b505c; }
body { margin: 0; background: ${F("e2-noground") ? "transparent" : "var(--bg)"}; color: var(--ink); font: 15px system-ui; }
main { min-height: 100vh; padding: ${phone ? "48px 16px" : "48px"}; box-sizing: border-box; }
.ctl, .seg { display: inline-flex; align-items: center; justify-content: center; height: 40px; padding: 0 18px; border-radius: 20px;
  background-color: var(--ctl); user-select: none; cursor: pointer; position: relative;
  transition: scale ${F("e8-literal") ? "230ms" : "var(--spring-press-duration)"} var(--spring-press), background-color var(--engage-press-drain-attack) linear; }
.ctl:hover, .seg:hover { background-color: var(--ctl-hover); }
${nopress ? "" : `.ctl:active, .seg:active { scale: 0.96; background-color: var(--ctl-press); }`}
${F("e5-decay") || sag ? `.ctl:active { animation: fx-sag 500ms linear forwards; } @keyframes fx-sag { to { background-color: var(--ctl); } }` : ""}
.ctl[data-state="on"] { color: #fff; background-color: var(--accent); }
.rest .ctl[data-state="on"] { scale: 1.05; }
.flash { position: absolute; inset: 0; border-radius: inherit; background: #fff; opacity: 0; pointer-events: none; }
button.ctl { border: 0; font: inherit; color: inherit; }
/* H3: the one-frame arming covers the controls' own transitions too (F-7: A's seat transitions gated until a frame after
   mount): a model that arrives during the mount lands on its committed rest (the rest scene's 1.05) without a glide */
#stage:not(.armed) :is(.ctl, .seg) { transition: none !important; }
${F("e2-arrivalflush") ? `.flash { transition: opacity var(--engage-control-engage-release) linear; } .flash.lit { opacity: 0.35; transition-duration: var(--engage-control-engage-attack); }` : ""}
${F("e2-dither") ? `.ctl[data-state="on"] { background-color: #eef0f4; color: #111; } .ctl { transition: scale var(--spring-press-duration) var(--spring-press); }` : ""}
${F("e2-shimmer") ? `.ctl { transition: scale var(--spring-press-duration) var(--spring-press); }` : ""}
/* H3: the library's PRM fallback, modelled (a11y-overrides.css: every transition zeroed under reduce by a * rule with
   !important), and the reduce arm's light kept by an AUTHORIZATION row, a class rule that outranks it (CP's
   css-prm-over-css.patch). E-8's PRM arm must read the authorized clock as a token (pass 2 read it minted) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0s !important; }
  ${F("e9-scale") ? "" : `.ctl:active, .seg:active, .rest .ctl[data-state="on"]:active { scale: 1; }`}
  .ctl, .seg { transition: background-color var(--engage-press-drain-attack) linear; transition-duration: ${F("e8-prmliteral") ? "100ms" : "var(--engage-press-drain-attack)"} !important; }
  ${F("e9-dark") ? `.ctl:active, .seg:active { background-color: var(--ctl-hover); }` : ""}
}
.segs { position: relative; display: inline-flex; gap: 0; padding: 4px; border-radius: 24px; background: var(--ctl); }
.seg { background-color: transparent; position: relative; z-index: 1; width: 78px; padding: 0; }
.ind { position: absolute; left: 4px; top: 4px; width: 78px; height: 40px; border-radius: 20px; background: #fff8; z-index: 0; }
.fx-slider { position: relative; height: 20px; width: ${phone ? (F("e3-gutter") ? "100%" : "300px") : "360px"}; ${phone ? "margin: 0 auto;" : ""} border-radius: 10px; background: var(--ctl);
  transition: scale var(--spring-press-duration) var(--spring-press); }
.fx-slider + .fx-slider { margin-top: 40px; }
.fx-slider${F("e3-still") ? ".never" : F("e3-kbd") ? ":where(:active, [data-held])" : ":where(:active, [data-held], [data-kbd])"} { scale: ${noise ? String(noise) : F("e11-unread") ? "1.06" : F("e3-blockgrow") && phone ? "1 1.06" : "var(--fx-scale-engage)"}; }
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
.fx-amb { width: 320px; height: 160px; border-radius: 16px; background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), #3b6cf0 0, #3b6cf000 60%), var(--ctl); }
`;

  const ctl = (extra = "") => `<div class="ctl ${ctlClass}" role="switch" tabindex="0" aria-checked="${on}" data-state="${on ? "on" : "off"}" data-member="alpha" data-e="target"${extra}>Probe<span class="flash"></span></div>`;
  const slider = (n = "") => `<div class="fx-slider${F("e1-nullhost") ? "" : " engage-held"}" data-member="beta" data-e="${n ? "" : "root target"}" data-n="${n}"><div class="fx-thumb" role="slider" tabindex="0" aria-label="Probe${n}" aria-valuenow="40" data-e="${n ? "" : "thumb body"}"></div></div>`;
  let body = "";
  if (scene === "pop" || scene === "rest") body = F("e1-absent") && scene === "pop" ? `<div class="${scene}"><div class="ctl ${ctlClass}" data-member="alpha">Probe</div></div>` : `<div class="${scene}">${ctl()}</div>`;
  else if (scene === "act") body = `<button class="ctl ${ctlClass}" type="button" data-member="alpha" data-e="target" data-handler>Act<span class="flash"></span></button>`;
  else if (scene === "travel") body = `<div class="segs" role="radiogroup" aria-label="Probe" data-member="alpha"><span class="ind" data-e="body"></span>${["a", "b", "c"].map((v) => `<div class="seg ${ctlClass}" role="radio" data-v="${v}" aria-checked="${v === (on ? "b" : "a")}" tabindex="${v === (on ? "b" : "a") ? 0 : -1}"${v === "b" ? ' data-e="target"' : ""}>${v.toUpperCase()}<span class="flash"></span></div>`).join("")}</div>`;
  else if (scene === "slider") body = `<div id="slot"></div>${slider()}`;
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

  const script = `
const FAULT = ${JSON.stringify(fault)}; const SCENE = ${JSON.stringify(scene)}; const DEFER = ${defer}; const ON = ${on}; const RUN = ${run}; const PHONE = ${phone};
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
const ms = (n) => { const m = getComputedStyle(document.documentElement).getPropertyValue(n).trim().match(/^([\\d.]+)(m?s)$/); return m ? +m[1] * (m[2] === "s" ? 1000 : 1) : NaN; };
const SPRING = ${JSON.stringify(SPRING)};
// the commit, in LIGHT (CK-02 arm iii): the overlay rises on the control-engage envelope's attack and decays on its
// release, two animations each on its row's clock
async function flash(el) {
  const fl = el?.querySelector(".flash"); if (!fl) return;
  const lit = FAULT === "e2-literalflash";
  const up = fl.animate([{ opacity: 0 }, { opacity: 0.35 }], { duration: lit ? 300 : ms("--engage-control-engage-attack"), fill: "forwards" });
  await up.finished; fl.animate([{ opacity: 0.35 }, { opacity: 0 }], { duration: lit ? 300 : ms("--engage-control-engage-release"), fill: "forwards" }); up.cancel();
}
function geom(el, crest) { if (!el || prm()) return; el.animate([{ transform: "scale(1)" }, { transform: "scale(" + crest + ")", offset: 0.35 }, { transform: "scale(" + (2 - crest - (crest - 1) * 0.75) + ")", offset: 0.6 }, { transform: "scale(1.0005)", offset: 0.8 }, { transform: "scale(1)" }], { duration: tok("--spring-press-duration") }); }
// e2-arrivalflush: the light is a CSS transition armed only by a before-change style. Reading the animations flushes
// style: a seat styled before (a paint, or any style read) starts its transition and lights; a seat styled for the
// first time now has no before-change style, starts none, and is put back dark with no transition
function flashCss(el) {
  const fl = el?.querySelector(".flash"); if (!fl) return;
  fl.classList.add("lit");
  if (!fl.getAnimations().length) { fl.style.transition = "none"; fl.classList.remove("lit"); fl.getAnimations(); fl.style.transition = ""; return; }
  setTimeout(() => fl.classList.remove("lit"), ms("--engage-control-engage-attack"));
}
// H3: a face that never rests after its commit (e2-shimmer: four 8-bit steps on the accent) or rests on a one-quantum
// dither (e2-dither, near-white); started by the commit, every frame for the page's life
function flicker(el, a, b) { let k = 0; const go = () => { el.style.backgroundColor = k++ % 2 ? b : a; requestAnimationFrame(go); }; requestAnimationFrame(go); }
// H3: the one-frame arming (F-7, B's): the commit light is armed two frames after the mount, so a model set during the
// mount (before or in its own task) commits nothing; e2-arrival never waits for it, e2-arrivalmute never arms a
// deferred mount
let armed = false;
const arm = () => requestAnimationFrame(() => requestAnimationFrame(() => { if (!(FAULT === "e2-arrivalmute" && DEFER)) { armed = true; document.getElementById("stage").classList.add("armed"); } }));
const quietSet = () => !armed && FAULT !== "e2-arrival" && FAULT !== "e2-arrivalflush";
function pop(el) {
  if (!el) return;
  if (FAULT === "e2-fillonly") return;
  if (FAULT === "e9-fillonly" && prm()) return;
  if (FAULT === "e2-arrivalflush") return flashCss(el);
  if (FAULT === "e2-fade") { if (!prm()) el.animate([{ opacity: 0.6 }, { opacity: 1 }], { duration: 120, easing: "linear" }); return; }
  if (FAULT === "e2-geompop" || FAULT === "e2-bigpop") return geom(el, 1.08);
  if (FAULT === "e2-smallpop") return geom(el, 1.004);
  flash(el);
}
// ── the fixture slider: held by the pointer (data-held, the hand's register) or engaged by the keyboard (data-kbd):
// Tab focus or an acting key, never a lone modifier, an unacted character or a script focus (CK-04). One shared veil
// while any slider is engaged, settled in a frame so a hand-off keeps it (CK-20).
const ACTING = new Set(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"]);
const MODS = new Set(["Shift", "Meta", "Control", "Alt"]);
let lastKey = { key: "", t: -1e9 };
addEventListener("keydown", (e) => { lastKey = { key: e.key, t: performance.now() }; }, true);
let veil = null; let veilRaf = 0;
function engagedAny() { return [...document.querySelectorAll(".fx-slider")].some((r) => r.dataset.held !== undefined || r.dataset.kbd !== undefined); }
function settleVeil(now) {
  const want = engagedAny();
  if (FAULT === "e10-veildip" || now) { applyVeil(want); return; }
  cancelAnimationFrame(veilRaf); veilRaf = requestAnimationFrame(() => applyVeil(engagedAny()));
}
function applyVeil(want) {
  if (want && !veil) { veil = document.createElement("span"); veil.className = "fx-veil"; veil.setAttribute("data-e", "veil"); if (!(FAULT === "e7-prm" && prm())) veil.setAttribute("data-engaged", ""); document.body.appendChild(veil); veil.getBoundingClientRect(); veil.classList.add("on"); }
  else if (!want && veil) { const v = veil; veil = null; v.remove(); }
}
function checkToken(root) {
  if (FAULT === "e11-silent" || FAULT === "e11-unread" || FAULT === "e11-noise") return;
  const raw = getComputedStyle(root).getPropertyValue("--fx-scale-engage").trim();
  if (!(parseFloat(raw) > 1) || !/^[\\d.]+$/.test(raw)) console.error("[fixture] --fx-scale-engage is unreadable (" + JSON.stringify(raw) + "): the engagement cannot size its grow");
}
// H4 plants: e12-wheelchain promotes the engaged root into the top layer where it painted (a wheel over it chains to
// the viewport); e12-anchorlost writes the engagement's own position-anchor and removes the property on release
function promote(root, on) {
  if (on && !root.matches(":popover-open")) { const b = root.getBoundingClientRect(); root.popover = "manual"; root.style.cssText += ";position:fixed;inset:auto;left:" + b.left + "px;top:" + b.top + "px;margin:0;padding:0;border:0;overflow:visible;width:" + b.width + "px;height:" + b.height + "px;background:var(--ctl)"; root.showPopover(); }
  else if (!on && root.matches(":popover-open")) { root.hidePopover(); root.removeAttribute("popover"); for (const k of ["position", "inset", "left", "top", "margin", "padding", "border", "overflow", "width", "height", "background"]) root.style.removeProperty(k); }
}
function kbd(root, on) {
  if (on) { if (root.dataset.kbd === undefined) checkToken(root); root.dataset.kbd = ""; if (FAULT === "e3-tabhand") root.dataset.held = "key"; }
  else { delete root.dataset.kbd; if (FAULT === "e3-tabhand") delete root.dataset.held; }
  if (FAULT === "e12-wheelchain" || FAULT === "e12-wheelrow") promote(root, on);
  if (FAULT === "e12-anchorlost") { if (on) root.style.setProperty("position-anchor", "--fx-footprint"); else root.style.removeProperty("position-anchor"); }
  settleVeil();
}
function wireSlider(root) {
  const th = root.querySelector(".fx-thumb");
  const W = () => root.offsetWidth; let x = 0.4 * W(); const put = () => { th.style.left = x + "px"; th.setAttribute("aria-valuenow", String(Math.round(100 * x / W()))); }; put();
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
  th.addEventListener("pointerdown", (e) => { cancelAnimationFrame(raf); th.setPointerCapture(e.pointerId); delete root.dataset.kbd; root.dataset.held = "pointer";
    if (FAULT === "e10-rerender") { const r = root.getBoundingClientRect(); root.style.left = r.left + "px"; root.style.top = r.top + "px"; root.classList.add("pinned"); }
    settleVeil(true); drag = { x0: x, cx: e.clientX, hist: [{ t: performance.now(), x }] }; });
  th.addEventListener("pointermove", (e) => { if (!drag) return; x = Math.max(0, Math.min(W(), drag.x0 + e.clientX - drag.cx)); put(); drag.hist.push({ t: performance.now(), x }); if (drag.hist.length > 6) drag.hist.shift(); });
  const release = () => { if (!drag) return; delete root.dataset.held; if (FAULT === "e3-latch") root.dataset.kbd = "";
    if (FAULT === "e10-rerender") { root.classList.remove("pinned"); root.style.left = root.style.top = ""; }
    settleVeil(true);
    // the release velocity over the last three samples, zero when the hand stopped (stale(): the release long after the last move by the drive's own cadence):
    // a window keyed on the release time alone reads 0 when a loaded main thread delivers the release late
    const now = performance.now(), H = drag.hist, h = H.slice(-3); drag = null;
    let v = h.length > 1 && !stale(H, now) ? (h.at(-1).x - h[0].x) / Math.max(1, h.at(-1).t - h[0].t) * 1000 : 0; // px/s
    if (FAULT === "e4-drop" || (prm() && FAULT !== "e4-prmbounce")) v = 0;
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
    const k = 322, c = 2 * 0.75 * Math.sqrt(k); let t0 = performance.now();
    const step = (t) => { const dt = Math.min(0.032, (t - t0) / 1000); t0 = t; v += (-k * (x - target) - c * v) * dt; x += v * dt; put();
      if (Math.abs(v) > 1 || Math.abs(x - target) > 0.2) raf = requestAnimationFrame(step); else { x = target; put(); } };
    raf = requestAnimationFrame(step); };
  th.addEventListener("pointerup", release); th.addEventListener("pointercancel", release);
  return () => x;
}
function mountScene() {
  const stage = document.getElementById("stage"); stage.innerHTML = ${JSON.stringify(body)};
  arm();
  if (SCENE === "pop" || SCENE === "rest") {
    const el = stage.querySelector(".ctl");
    const set = (v, how) => { model = v; el.dataset.state = v ? "on" : "off"; el.setAttribute("aria-checked", String(v));
      if (v && FAULT === "e2-dither") flicker(el, "#eef0f4", "#eff1f5");
      if (v && FAULT === "e2-shimmer") flicker(el, "#3b6cf0", "#3f70f4");
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
  }
  if (SCENE === "passive" || SCENE === "field") E.state = () => null;
  if (SCENE === "ambient") {
    const a = stage.querySelector(".fx-amb");
    if (FAULT !== "e1-ambientdead" && FAULT !== "e1-ambientlimit") a.addEventListener("pointermove", (e) => { const r = a.getBoundingClientRect(); a.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%"); a.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%"); });
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
      // the detent: a release faster than 50 px/s picks the next detent in its direction (a still release reads 0: its
      // hand stopped 600 ms before; 50, not 300: a loaded harness paces the three 40 px moves ~150 ms apart, 270 px/s) (the velocity chooses, and
      // the same drive chooses the same one on every run); a slower one the nearest
      const Dp = D.map((d) => d * VH());
      let ti = Dp.reduce((a, b, i, arr) => (Math.abs(b - h) < Math.abs(arr[a] - h) ? i : a), 0);
      if (v > 50) ti = Dp.findIndex((d) => d > h + 1); else if (v < -50) ti = Dp.map((d, i) => [d, i]).filter(([d]) => d < h - 1).pop()?.[1] ?? 0;
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
