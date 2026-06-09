# DOCK-morph — adversarial hardening challenge (red-team the dock morph to perfection)

**Lane:** the dock MORPH — `--dock-morph-t` single scalar, collapse/expand timing,
`--spring-dock` / JS `DOCK_SPRING`, the press-squish, Q1 collapsed-pill size.
**Verdict:** WEAK. The morph is architecturally sound (W01 single-scalar thesis +
W01-redress deferred-measure) but carries a SNAP-class regression history, a
DEAD-WITNESS proof gate that cannot catch a JS spring retune, an over-long
`isTransitioning` suppression window, the still-broken Q1 collapsed pill, and ZERO
captured live-DELTA evidence for any of the three "live-verified" dock waves.

---

## What the morph IS (rAF-traced from source)

The box morph is ONE JS `SpringProgress` per dock instance
(`dockMorphContext.ts:137` `let spring`, `:212` `new SpringProgress`), constant
`DOCK_SPRING = { response: 0.32, dampingFraction: 0.7 }` (`:39`). Per frame it writes
the normalized scalar `--dock-morph-t` (0→1) to the `.glass-dock` root
(`:223` `rr.style.setProperty("--dock-morph-t", …)`). Every animated axis is a pure
`calc()` read off that scalar in `dock.css`: box `inline-size`/`block-size`
(`:875-890`), root padding (`:524-539`), bg/border color (`:504-517`), shape-card
radius (`:618-624`), leaving-pane opacity (`:1011-1014`), child stagger
(`:1072-1089`). The from→to px span is a ONE-TIME FLIP measurement deferred ONE rAF
past the Vue flush (`onSwap` `:268`, the `requestAnimationFrame` at `:324`), because
`.dock-layers` is a CSS grid whose track shrink-wraps whichever pane is in-flow, and
the target pane only becomes in-flow AFTER the `.collapsed`/`.expanded` class flush.
This is correct and elegant. The findings below are where it is NOT yet perfect.

---

## CHALLENGE 1 — the proof gate is a DEAD WITNESS: it cannot catch a JS spring retune (BROKEN gate coherence)

`proof-dock-animation-live.mjs`'s flake-free token-peak secondary
(`detectTokenPeak`, `:322`; `parseSpringDockPeak`, `:310`) parses ONLY the CSS
string `--spring-dock: linear(…)` from `tokens.css` and asserts its peak ≤ 1.051. But
the ACTUAL box morph runs on the JS `SpringProgress(DOCK_SPRING)` literal at
`dockMorphContext.ts:39`. **Nothing links the two.** They are two independent copies
of `{response:0.32, dampingFraction:0.7}`:

- the CSS token is emitted by `regen-spring-tokens.mjs` from the `dock` preset
  (`:78-81` `response:0.32, dampingFraction:0.7`);
- the JS constant is a hand-typed literal in `dockMorphContext.ts:39`.

A retune of `DOCK_SPRING` (e.g. to a bouncier `dampingFraction:0.5` — the EXACT
register the gate purports to guard against) changes the real morph overshoot but
leaves the CSS token, and therefore the gate, GREEN. The gate's own banner claims it
"catches a spring retune to a bouncier register even on a runner with no browser"
(`:303-305`) — FALSE for the register that actually ships the morph. The CSS
`--spring-dock` / `--dock-resize-spring` token is now consumed ONLY by decorative
non-morph transitions (the vertical-rail `transform`/`scale` at `dock.css:582-583`
and the rail-tab `width/height/transform` at `:1525-1527`); the box morph does NOT
read it. So the gate guards a token the morph doesn't use, against a constant the
gate doesn't read.

**Falsifiable:** `grep -n "DOCK_SPRING\|dampingFraction" scripts/proof-dock-animation-live.mjs`
= 0 hits (only CSS-string parsing). `dockMorphContext.ts:39` is the sole morph-spring
authority and is referenced by no gate.

## CHALLENGE 2 — the SNAP regression IS the cardinal recurrence, and the repair was NEVER live-captured

`W01-redress.md` records that W01 SHIPPED a dock morph that **did not animate**: on
the real Metal GPU the box snapped collapsed→expanded in ONE frame, `--dock-morph-t`
stayed 0 the whole time, the `SpringProgress` never ran (`:17-22`). Root cause: the
synchronous `to`-size read returned `from` (the OLD active pane, pre-flush), tripping
the `Math.abs(toSize − fromSize) < 0.5` early-return (`dockMorphContext.ts:254`,
`armTarget`) so the spring early-settled. The W01 self-gates were GREEN — they "feed
synthetic frame arrays to pure detectors and so could not witness the real-layout
freeze" (`W01-redress.md:47`). **This is the AX cardinal lesson firing on the
single most foundational dock wave**: headless-green over a frozen morph.

The redress fixed it (deferred rAF `to`-measure). But the binding live confirmation
was explicitly deferred to "the orchestrator" (`W01-redress.md:3,114-123`;
`W01-DELTA.md:111-115` "Pixel evidence — _Pending the orchestrator's live
captures_"). **Those captures do not exist.** `docs/tranches/AX/audit/visual/`
contains ONLY `CAPTURE-PROTOCOL.md` — zero PNGs, zero W01-DELTA backfill. So the wave
whose self-gates already proved unable to catch its own freeze has STILL never been
live-verified after the repair. The same early-return at `:254` is live in the
shipped code and is the exact trap that froze the morph once; without a live rAF
capture, a future grid-topology or flush-order change can re-freeze it and every
headless gate stays GREEN.

## CHALLENGE 3 — `isTransitioning` stays armed ~370ms past visual settle (over-long click-away dead-zone)

`GlassDock.vue` `morphWindowMs` (`:339-344`) floors the `isTransitioning` settle at
`max(--duration-normal * 2, 600)` = **600ms** (`--duration-normal` is 0.3s,
`tokens.css:76`). The actual `(0.32, 0.7)` spring settles its meaningful travel by
~0.18-0.23s (the gate's own comment: "rings 0→~1.05→1.0 over ~23 rAF frames"
≈ 0.38s to full rest at 60Hz; visual settle far earlier). The fallback timer adds
another +50ms (`markTransitioning` `:372`). On a Chrome morph the real
`transitionend` does NOT fire for the box anymore (the size axis is spring-driven, no
CSS transition — `dock.css:871`), so `onDockTransitionDone` (`:375`) rarely resolves
the flag early; the 600ms+50ms **timer is the dominant resolver**. During that whole
window `useDockState.onPointerDownOutside` early-returns (`useDockState.ts:277`
`if (isTransitioning?.value) return;`), so **a click outside the dock in the
~350-400ms after the morph has visually finished does nothing** — the user clicks
away, the dock ignores it, they click again. This is a softer cousin of the very
double-tap class W3's touch-gate fixed. The window was sized to "the morph's settle
ENVELOPE" (`:338`) but the envelope was estimated, not measured against the spring,
and floored conservatively high.

**Falsifiable:** rAF-sample `getComputedStyle(root)["--dock-morph-t"]` to find the
real settle frame, then measure `isTransitioning` (via `defineExpose`) — it stays
true well past the scalar reaching 1.0.

## CHALLENGE 4 — Q1 collapsed pill is STILL mis-sized (the floor tokens are undefined; width-only, no aspect lock)

The W61 spec correctly RED-witnesses it (`W61:49-66`) but it is unfixed at HEAD and
the morph lane inherits the consequence: the collapse morph's `to`-size is MEASURED
from the summary pane's shrink-wrap (`dockMorphContext.ts:337` `max-content` measure),
and that pane is sized by `dock.css:717-723`
`min-width: var(--dock-collapsed-summary-min-size, var(--dock-layer-height, 2.5rem))`
— `--dock-collapsed-summary-min-size` is **undefined in all of `src/`**, so it falls
to the full control height (2.5rem comfortable). The collapsed padding floor
`--dock-collapsed-padding` (`dock.css:525`) is **also undefined**, falling to the
EXPANDED `--dock-padding-block`. Net: the spring faithfully animates TO an over-wide,
loosely-padded box — the morph is correct, the TARGET is wrong. Worse, the constraint
is `min-WIDTH` only with no symmetric `min-block-size`/aspect lock, so a collapsed
pill is not even guaranteed circular. The morph cannot be "perfect" while its
collapsed endpoint is a mis-proportioned box.

## CHALLENGE 5 — the "0-frame lead/lag, co-temporal by construction" claim is over-stated

`W01-DELTA.md:62,78` asserts box and content are "co-temporal by construction
(lead/lag ≡ 0 frames)." The redress trace (`W01-redress.md:81-98`) reveals the real
sequence: frame 0 PINS the box at `from` (held, no motion), the rAF callback at
frame 1 measures `to` and STARTS the spring, frames 2…N ramp. So there is an inherent
ONE held frame before any motion, and the leaving-pane opacity fade is armed at the
frame-0 class flip while the box first moves at frame 1 — the redress itself calls
this "a single-frame lead within tolerance" (`:98`). The children DO ride the same
`--dock-morph-t`, so box↔children are genuinely locked; but the absolute "≡ 0 frames"
in the DELTA is marketing, not the measured behavior, and there is no captured frame
series to adjudicate it either way.

## CHALLENGE 6 — `morphWindowMs` reads `--duration-normal` but the morph no longer has a duration

`morphWindowMs` derives the settle envelope from a CSS DURATION token
(`--duration-normal`, `:340-343`). But the morph is a SPRING with no duration — its
settle time is a function of `response`/`dampingFraction`, not `--duration-normal`. A
consumer who retunes `DOCK_SPRING` to a slower `response:0.6` gets a morph that
visually runs ~2× longer while `isTransitioning` still clears at the same 600ms floor
— so a slower morph can clear `isTransitioning` BEFORE it visually settles, re-opening
the mid-morph click-away collapse the flag exists to prevent. The envelope is keyed to
the wrong quantity. It should be derived from the spring's own settle estimate (which
the JS owns and can expose), not a CSS duration the morph stopped using at W01.

---

## CHRONIC (slip history)

- **Headless-green-over-broken on the dock morph.** W01 shipped a FROZEN morph green
  (`W01-redress.md:47`). This is the named AX cardinal lesson (PROGRESS.md:9-12) and
  the inventory's S-cardinal lane (`CAPTURE-PROTOCOL.md:3`). It has now recurred at
  least: W04+W12 band (two headless-green/visually-broken defects, PROGRESS.md:107),
  W09 + W05 marked complete on headless-green while their JSONs said live-pending
  (PROGRESS.md:182-186), and W01 itself. The dock morph is the REPEAT offender.
- **The owed live-DELTA capture, deferred every wave.** W01-DELTA "pixel evidence
  pending" (`:111`), W01-redress live "the orchestrator's hinge" (`:3`), W45
  liveArmOwed "owner: orchestrator" (`W45.json:69`). `CAPTURE-PROTOCOL.md:23-28`
  lists W45/W52/W53/W56/W57/W59 ALL `live-verified` WITHOUT a DELTA.md. The
  `audit/visual/` dir is empty but for the protocol. The capture has been owed since
  W00 and slipped through every dock wave (W01→W45→pass3). `proof:live-verified-ledger`
  (the gate that would force it) is itself only "planned (W33)".
- **Two unsynced copies of the dock spring constant.** `dockMorphContext.ts:39` and
  the `regen-spring-tokens.mjs` `dock` preset both hardcode `0.32/0.7`. Neither
  imports the other; the gate reads only the CSS side. A token-vs-impl divergence
  class that recurs (cf. the W04 invalid-CSS silent-drop, the
  `var(--dock-morph-t, 1)` dead-fallback bug at PROGRESS.md:116-126).

---

## HARDENING ACTIONS (to PERFECT the morph)

1. **W45-TUNE / W61: mint the collapsed-floor tokens AND make the gate read the JS
   spring.** Define `--dock-collapsed-summary-min-size` + `--dock-collapsed-padding`
   as proportioned collapsed-floor tokens (a tight glyph-wrapping pill), add a
   symmetric `min-block-size`/aspect lock so the collapsed endpoint is circular, and
   re-author `proof-dock-animation-live` to parse `DOCK_SPRING` out of
   `dockMorphContext.ts` (or import it) and assert IT — or, better, derive the CSS
   token AND the JS constant from ONE shared `springs.ts` source so the regen script
   and the runtime cannot diverge (kill the second copy, then the gate guards the one
   truth).

2. **Run the owed live rAF capture for the dock morph NOW (prototype).** Drive a real
   hover→expand and expand→collapse on `/navigation/dock` #1 at ≥2 viewports ×
   light/dark; rAF-sample `--dock-morph-t` + `root.getBoundingClientRect().width` +
   a child opacity; confirm ≥5 rising frames, the ~+4.6% overshoot-then-settle, and
   the velocity-continuity retarget (un-hover mid-expand). Write the FIRST real
   `audit/visual/W01-DELTA.md` with the frame series + PNGs. This both discharges the
   chronic capture debt and is the only thing that can prove the redress actually
   un-froze the morph on a real GPU.

3. **Re-derive `isTransitioning`'s settle window from the spring, not a CSS duration.**
   Expose the `SpringProgress` settle estimate from the orchestrator and feed it (plus
   a small margin) to `markTransitioning`, replacing the `--duration-normal * 2 / 600ms`
   floor. This collapses the ~370ms post-settle click-away dead-zone AND keeps the
   suppression window correct under a `DOCK_SPRING` retune (Challenge 6). Add a live
   check: click-away within 1 frame of `--dock-morph-t` reaching 1.0 must collapse.

4. **Correct the W01-DELTA "0-frame" claim to the measured "1 held frame + lockstep
   thereafter"** once the capture exists — the DELTA should state the real frame-0
   pin, not "co-temporal by construction," so the artefact is honest (the writing-style
   + cardinal-lesson precepts).

5. **Add a `proof:dock-spring-single-source` meta-gate** asserting the dock spring's
   `(response, dampingFraction)` appears in exactly ONE authority and the CSS token +
   JS constant both resolve from it — closing the dead-witness class permanently.
