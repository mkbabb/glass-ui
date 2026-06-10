# AY.W-ANIM1 — the first-principles animation audit: every element, one motion grammar

**State:** OPEN (user-directed 2026-06-09: "an animation audit, such that for all of our elements
we adhere to the first principles of animations") · **Repo:** glass-ui · **Band:** B
**Type:** audit → conformance matrix → fix list (the audit arm runs in the hardening
hand-challenge; the fixes route to named waves, never ad-hoc).
**Depends on:** W-MOTION (doctrine landed), W-MOTION2 (the curve table the audit grades against).
**Feeds:** W-LIQUID (squash/stretch findings), W-COHERE (set-level motion cohesion), the per-
component fix waves.

## §1 — The grading rubric (first principles, made falsifiable)

The classical principles mapped onto the shipped doctrine — each a CHECKABLE clause, not a vibe:

| Principle | The falsifiable check |
|---|---|
| **Squash & stretch** | deforming elements preserve volume (`sx·sy≈1` — the W53/W-LIQUID invariant); rigid elements NEVER deform |
| **Anticipation** | press states lead with the scale-down (`--scale-press-*`) BEFORE the action commits; no zero-lead-in state jumps on interactive elements |
| **Follow-through & overlap** | spring settles are visible (ζ<1 where the doctrine says bouncy/snappy) and children do not hard-sync when the doctrine says stagger (the dock cascade) — nor stagger when it says lockstep |
| **Ease in/out discipline** | the §6 easing-doctrine table: surface props on `--ease-standard`, transform interactions on `--spring-smooth`, enters bouncy/snappy, exits NEVER overshoot — swept per element via computed-style + the curve table (W-MOTION2's `MOTION_CURVES`) |
| **Timing & weight** | durations within the token bands (`--duration-*`); no orphan hand-set ms values off the scale |
| **Secondary action** | decorative motion (specular sweep, grain, shimmer) never competes with the primary action's read (opt-in, idle-quiet — the W-GLASS specular finding generalized) |
| **Staging** | one focal motion per interaction; simultaneous competing animations on one surface = a defect |
| **Appeal/PRM parity** | every animated element has a coherent reduced state (information parity; no fire-but-freeze) |

## §2 — Objective

1. **The conformance MATRIX:** every animated element in `src/` (the transition/animation
   declarations + the JS-driven springs) × the rubric — graded by a sweep that reads tokens.css,
   transitions.css, animations.css, the component scoped styles, and the live computed styles on
   the demo (a π pass over the storybook routes). Output:
   `docs/tranches/AY/audit/ANIM-MATRIX.md` — element × principle × {PASS, DEFECT(file:line), N/A}.
2. **The fix list, routed:** every DEFECT lands in a named wave (existing where one owns the
   surface; a new `W-ANIM-FIX<N>` batch otherwise). No fix is applied inside the audit.
3. **The gate extension:** `proof:animation-coherence` gains the machine-checkable rubric arms
   (the easing-table sweep + the duration-band sweep + the exit-never-overshoots witness) so the
   principles HOLD after the fixes, not just on audit day.

## §3 — HARD GATE

1. **MATRIX-COMPLETE:** every element with a transition/animation/spring in `src/` appears in the
   matrix (a coverage sweep — the matrix row count ≥ the swept declaration count; an unswept
   element REDs).
2. **GATE-EXTENDED (born-RED-able):** the extended `proof:animation-coherence` REDs on a planted
   off-doctrine fixture (a transform interaction on a bezier; an exit with overshoot; an orphan
   duration) and GREENs at the post-fix HEAD.
3. **FIX-ROUTED:** zero unrouted DEFECT rows at close (each cites its owning wave).

## §4 — Scope fence

- The AUDIT ships the matrix + the routed list + the gate; the FIXES ship in their owning waves
  (no ad-hoc edits inside the audit — the no-quick-fix precept).
- The doctrine itself (§6 table) is SETTLED — the audit grades against it; re-litigating the
  doctrine is out of scope (a doctrine change would be its own decided wave).

## §5 — RealityB feed (the live-audit grounding the matrix consumes)

`docs/tranches/AY/audit/reality/RA-anim-suite.md` is the live-driven motion-suite audit (RealityB; every claim a rAF/CDP-strip capture). Its findings are the conformance-matrix's GROUNDING — the matrix's §2.1 sweep CONSUMES RA-anim-suite's measured rows and ROUTES each. In particular the FUNCTIONAL-BROKEN bindings RA-anim-suite caught (the project-memory "stale reka-binding silently no-ops; only e2e catches" class — MEMORY `feedback_glass_ui_binding_verification`) MUST appear in the matrix as DEFECT rows routed to a named fix wave (an existing owner where one exists, a `W-ANIM-FIX<N>` batch otherwise):

- **Toast dismissal DEAD** (RA-anim-suite §6): a fired toast can NEVER leave — no auto-dismiss, dead close-X, dead swipe. Root: `use-toast.ts` hands `onOpenChange` (the React shadcn key) but reka-ui `ToastRoot` emits `update:open` (the Vue key would be `onUpdate:open`); the close request never reaches the store while the spread `open: true` keeps the root controlled-open. The MOTION register decision is W-MOTION D4; the FUNCTIONAL dismissal-dead binding is a `W-ANIM-FIX` route (one renamed key, whole surface dead — fails the matrix's Appeal/PRM parity AND Staging clauses).
- **DrawerTrigger silent no-op** (RA-anim-suite §4): the basic Drawer story's "Open drawer" produces ZERO DOM mutations, zero console errors, `aria-expanded`/`data-state` never flip (the live-behind composition works only because it bypasses the trigger via `v-model:open`). A reka/vaul binding no-op — a `W-ANIM-FIX` route (the animation never fires → fails the matrix's coverage + Staging).
- **ToastViewport `fixed` captured by a glass-card `backdrop-filter` containing block** (RA-anim-suite §6, the systemic glass-first × fixed-overlay trap): with W54 making `backdrop-filter` ubiquitous, ANY `fixed`-position overlay mounted inside a glass surface silently re-anchors to the glass box. This "deserves its own precept line; it will bite again" — route to a PRECEPT line (the cross-repo-dev-resolution-adjacent precept set) + a `W-ANIM-FIX`/W-MOTION guard.
- **Tabs anchor-path glide renders no spring** (RA-anim-suite §5): the SegmentedTabs indicator transitions `inset … var(--spring-snappy)` but the rendered `anchor()`-inset interpolation is a fast ~100ms settle with ≤0.1px positional overshoot — the declared +6.8% snappy overshoot NEVER paints; the squish is perceptually marginal on adjacent hops. Doctrine-vs-render gap — route to the tabs-indicator owner (W-LIQUID's `useLiquidFlex` consumers list the tabs-indicator) or a `W-ANIM-FIX`, with the honest "mathematically present, perceptually marginal" verdict recorded (NOT a re-claim of the iOS spring register).
- **Dialog/Popover/Dropdown enters ride tw-animate `ease`, not the §6 spring register** (RA-anim-suite §1/§2): the spring-entrance prop (`spring` → `useSpringMount`) exists but NO demo story mounts it; `proof:animation-coherence` EXEMPTS `animation:` shorthands so the gate cannot see these enters are NOT springs. Route to W-MOTION (the register) + the gate-widen (§3 — the `animation:`-shorthand exemption is the blind spot the extended gate must close).

The matrix MUST route these; an unrouted RA-anim-suite functional-broken row REDs the §3 FIX-ROUTED clause.
