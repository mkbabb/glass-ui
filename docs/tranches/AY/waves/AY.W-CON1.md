# AY.W-CON1 — Constellation resize re-fit (transpose-UP) + auto-drift target-source + alpha tune

**State:** OPEN · **Repo:** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **Band:** A (perfect+export the lib)
**Unblocks:** L.W-ADOPT (E4/E8 — the slides constellation adoption cannot ship without the re-fit + the wander source landing at the ROOT first).

---

## Goal criterion

The glass-ui `Constellation` engine carries the two field behaviours that today live ONLY in the
slides bespoke `constellation.ts` copy that L.W-ADOPT is slated to DELETE: (1) a resize RE-FIT that
proportionally rescales the lattice on a real RO size-change so the field fills the new canvas WITHIN
one frame (no drift-out lag), and (2) a periodic AUTO-DRIFT target-source on the SAME warp spring (the
second half of the AX.W17 "drift+warp are ONE mechanic" thesis), so the slides wandering anomaly
SURVIVES adoption rather than dying on it. The per-mode `--constellation-alpha` translucency is tuned
in both arms. After this wave, deleting the bespoke copy and consuming `@mkbabb/glass-ui/constellation`
is a behaviour-preserving swap, not a regression — the "fix at the ROOT" precept, no longer inverted.

## Completion criterion

The single hard gate below verifies: a π bbox-coverage readback proving the lattice fills the resized
canvas within ONE post-RO frame (numeric, not a "looks right" screenshot); a π auto-drift cadence
readback proving the focal re-targets on the wander cadence with no click; a `--constellation-alpha`
both-mode π readback; PRM-suppression of the wander; the field-cools invariant after a refit (no
velocity heat-up); and a captured before/after DELTA artefact registered in `AY/PROGRESS.md` so
`proof:live-verified-ledger` passes on this row.

---

## §0 — RE-GROUND (post-Batch-2 as-built; from `audit/hardening/b2/B2-con1.md`)

W-CON1 was EXECUTED at Batch-2 (`tranche/AY` @ `1151899`). The engine logic landed clean and the
gates went green (18/18 unit; the π refit-coverage + auto-drift cadence + PRM-suppression + both-mode
alpha all real device readbacks; the 24px `WARP_SETTLE_BAND` is a TRUE fix, B2 FINDING 5 cleared). But
the as-built is gate-passing, not perfected. Four facets RE-OPEN — they are the refinement debt this
wave still owes, NOT a re-build of the shipped engine. No clause below touches the sound `refitField` /
wander / `warpSettled` / `pickWanderTarget` logic.

**RG1 (line-count, BLOCKER) — the wave self-created a god-module.** §5.5 / risk #5 below still reads
"currently 510, at the cap." The TRUE as-built count is **653** — the refit + the full wander cluster
(`ConstellationWander`, `refitField`, `warpSettled`, `pickWanderTarget`, the in-`stepField` cadence
block, `WARP_SETTLE_BAND` + its comment) pushed `constellationField.ts` 510→653, **153 over** the hard
cap. `proof:no-god-module` (HARD_LIMIT=500) is RED at HEAD. W-GOD1's carve plan still grades this file
at 510 — its target is now 653, shedding 153+ not 10. This is recorded in `AY.W-GOD1.md` §RE-GROUND;
the carve is the remediation and it is DEFERRED to the build phase the user greenlights. Risk #5 below
is superseded by this number.

**RG2 (DELTA-honesty, HIGH) — the captured DELTA is partly evidentiary garbage; it RE-CAPTURES.** The
ledger gate passed on a file-count technicality (`isRealPng` + basename regex + light/dark presence) —
it cannot see that the PNGs demonstrate none of the wave's claims. Two re-capture obligations:
- The four `W-CON1-*-mobile-*.png` are **1280×721 desktop screenshots, not 375×667 mobile**, and they
  show the lattice filling only a left ~342px column (the OPPOSITE of "fills the box"), with NO focal
  ring. The DELTA doc's "mobile 375×667" protocol line is fabricated. RE-CAPTURE at a real 375×667
  mobile viewport, on the deck-cover scene, showing a filled box + the focal mark — or DELETE the
  mobile claim from the DELTA doc and the protocol line (do not register a viewport you did not shoot).
- The `W-CON1-refit-before-*.png` (360×241) depict no defect — a small lattice captured at small size
  cannot show "small lattice inside a LARGE box." The binding before-number (0.259 coverage) is REAL
  (the π engine readback), but the PNG pair is decorative. RE-SHOOT the "before" as the actual
  drift-out frame: seed at small, resize to large, capture the FIRST post-resize frame of the
  control (no-refit) instance — that frame SHOWS the sparse lattice in the big box. The picture and
  the number must depict the same fact.

**RG3 (gate-bite, MEDIUM) — "refit-fills-box ≥ 0.92" is a uniform-scale tautology; add the shear arm.**
`refitField` scales every coord by `sx = w/prevW` uniformly, so bbox-coverage is INVARIANT under the
resize (`bbox_new/canvas_new = bbox_old/canvas_old`) — the 0.92 "after" is just the seed's intrinsic
coverage of any box, structurally pinned, identical before and after. The gate verifies "refitField
multiplies" (which the unit test already proves) and CANNOT distort, so it answers "does the lattice
look right after resize" trivially-green. The case that MATTERS — a NON-UNIFORM (sheared) refit, the
portrait→landscape transpose that is the actual deck slide-enter scenario the whole wave exists to fix
— is captured nowhere (all 12 shots are the mild 360×240→1280×720, sx 3.55/sy 3.0). §6 gate clause 1
gains a SHEAR arm: drive a portrait→landscape `resizeTo` (e.g. 360×720 → 1280×360, `sx≠sy`), capture
the post-resize frame, and assert the sheared lattice still COVERS both axes ≥ 0.9 AND reads as a
pleasing field (the DELTA shows the transpose, not just the mild grow). The coverage-tautology arm
stays as the cool-down check; the shear arm is the one that binds the aesthetic claim.

**RG4 — scope fence unchanged.** RG1–RG3 are refinement of THIS wave's own artefacts (line count,
DELTA capture, one gate arm). They do NOT re-open the engine logic (sound), the alpha plumbing
(ratified), or the PRM model (correct). The god-module carve (RG1) is W-GOD1's; the honest re-capture
(RG2) and the shear arm (RG3) execute when the user greenlights the build phase — pure spec debt until
then.

---

## §1 — The verified defect (file:line)

### D1 (BLOCKER-class) — the RO resize RE-FIT lives ONLY in the slides bespoke copy; adopting the lib REGRESSES it.

The slides bespoke engine rescales every node proportionally on a real RO size-change, ON THE SAME
FRAME, then re-anchors its pinned anomaly:

> `slides/src/decks/til-briefing/constellation.ts:144-162`
> ```ts
> if (!this.nodes.length) {
>     this.seed();
> } else if (ow > 0 && oh > 0 && (ow !== w || oh !== h)) {
>     // RE-FIT the existing lattice to the new dimensions on the SAME frame.
>     // Without this the nodes ... drift out to fill the larger canvas at
>     // `speed` px/frame — the visible "takes a while to expand out" lag.
>     const sx = w / ow;
>     const sy = h / oh;
>     for (const p of this.nodes) { p.x *= sx; p.y *= sy; }
>     this.nodes[0].x = this.anchor.x * w;
>     this.nodes[0].y = this.anchor.y * h;
> }
> ```

glass-ui has NO such rescale. The render-loop size-change branch only updates `field.w/h/k` and seeds
nodes ONCE:

> `src/components/custom/constellation/Constellation.vue:149-162`
> ```ts
> if (field.w !== w || field.h !== h) {
>     field.w = w;
>     field.h = h;
>     field.k = k;
>     if (!field.nodes.length) {                 // ← seeds ONCE; never rescales
>         field.nodes = seedField(rng.value, count, w, h, speed);
>         field.warp.x = w / 2;
>         field.warp.y = h / 2;
>     }
>     palette = readPalette(canvas);
> }
> ```

`useCanvas2D.resizeTo` (`src/composables/glass/canvas2d.ts`) resizes the BACKING STORE only — it never
touches the field nodes (it cannot; the field is the consumer-closure state). So when the canvas
measures mid responsive-scale (the deck slide-enter case) the nodes keep their small-canvas positions
and then drift out at `speed` px/frame — the EXACT "takes a while to expand out" lag the bespoke copy
fixed. **The re-fit must land in glass-ui FIRST.** This is the chronic "the intelligence lives in the
consumer and must be transposed UP, not deleted" inversion.

### D2 (GAPS-FOUND) — the auto-DRIFT target-source (the 2nd half of the AX.W17 thesis) is asserted but NEVER built.

The AX.W17 design thesis (recorded at `constellationField.ts:274-283`) is "drift and warp are THE SAME
mechanic — spring the focal node toward a target NODE — differing only in what PICKS the target (a
click for warp, a periodic auto-pick for drift)." Only the CLICK source (`warpTo`) was built. There is
NO periodic auto-pick: `grep wander|nextAt|auto.*target src/components/custom/constellation/` → 0 hits.
The README asserts "the slides drift becomes 'warp to a periodically-chosen random node' — the same
seam," but no code picks a target on a cadence. The slides bespoke `drift()`
(`slides/src/decks/til-briefing/constellation.ts:209-231` — easeInOutQuad over 2.6s, ±0.14 jitter
around the seeded anchor, every 6–16s) is a REAL behaviour that VANISHES the moment slides adopts the
lib. The auto-drift source is the lowest-risk addition AND the unblocker for L.W-ADOPT — it lands FIRST.

### D3 (PARTIAL→tune) — `--constellation-alpha` per-mode tune.

The token exists and is per-mode (`tokens.css:512` light `0.80` / `:2071` dark `0.88` — the recessive
midpoints from AX.W17). The AY ledger row carries a both-mode tune+capture residue. The numeric values
may be confirmed-or-adjusted, but the token's PLUMBING is shipped: `readPalette`
(`constellationField.ts:178`) reads `--constellation-alpha` via `parseFloat`, and `drawEdges:410` /
`drawPointerWeb:463` scale by it. The work here is a π readback CONFIRMING both arms resolve their
declared value into the live field, not a re-architecture of the alpha plumbing.

---

## §2 — Objective (the gestalt, root-not-consumer)

1. Add a `refitField(field, prevW, prevH)` free-function to `constellationField.ts` — a proportional
   node rescale conserving the warp/focal seam — and CALL it from the render-loop size-change branch
   BEFORE the first post-resize `stepField`.
2. Add a periodic auto-DRIFT target-source on the SAME warp spring: a `field.wander` state object
   stepped inside `stepField` (NO new rAF, NO second mechanic) that, when no click-warp is in flight,
   re-points `setWarpTarget` to a periodically-chosen node on a jittered cadence. Surfaced as a
   `wander?: boolean | { minIdle, jitter }` prop. PRM-gated by the WARP precedent (the cadence never
   advances under reduced-motion — the focal mark stays at its seed; NOT fire-but-freeze).
3. Confirm/tune `--constellation-alpha` both arms with a π readback proving the declared value reaches
   the live `palette.alpha`.

This is the ROOT fix: the behaviour the consumer had is transposed UP into the shared engine so the
≥2-consumer abstraction is sound (the engine is consumer #1's deck-cover + the storybook demo;
L.W-ADOPT makes slides consumer #2). The slides `drift()` and `resize()`-rescale then collapse onto the
engine and DELETE without behaviour loss.

---

## §3 — Edit-sites (exact)

### E1 — `src/components/custom/constellation/constellationField.ts`

**E1a. `refitField` free-function (new export).** Proportional rescale of every node and the live warp
spring position from `(prevW, prevH)` to `(field.w, field.h)`. Guards: no-op when either prev extent is
≤ 0 (first layout — the seed path owns it) or when the dims are unchanged. Rescale `node.{x,y}` and
`field.warp.{x,y}` by `sx = field.w / prevW`, `sy = field.h / prevH`. CRITICAL — do NOT touch
`node.{vx,vy}` (the velocities are direction+speed in BASE-WIDTH units, already `k`-scaled at step time;
scaling them would heat the field — the §5 cool-down invariant). Recipe:

```ts
/**
 * Re-fit the existing lattice to a NEW canvas size, proportionally, ON the
 * size-change frame. Without it a field seeded at a transitional size (the
 * canvas measures mid responsive-scale) keeps its small-canvas positions and
 * DRIFTS out to fill the larger box at `speed` px/frame — the visible
 * "takes a while to expand out" lag. Scales node + warp positions by the
 * dimension ratio; velocities are UNTOUCHED (they are base-width direction
 * vectors `k`-scaled at step time — scaling them would heat the field).
 * No-op on first layout (prev ≤ 0; the seed path owns it) or unchanged dims.
 */
export function refitField(field: ConstellationField, prevW: number, prevH: number): void {
    if (!(prevW > 0) || !(prevH > 0)) return;
    if (prevW === field.w && prevH === field.h) return;
    const sx = field.w / prevW;
    const sy = field.h / prevH;
    for (const p of field.nodes) { p.x *= sx; p.y *= sy; }
    field.warp.x *= sx;
    field.warp.y *= sy;
}
```

**E1b. The `ConstellationWander` state + the auto-drift source.** Add the interface to the engine
types, a field-member `wander?`, and step it inside `stepField` AFTER `warpStep` (so a click-warp
already in flight pre-empts the cadence). The wander re-points `setWarpTarget` to a picked node only
when the spring has SETTLED (no active in-flight warp gap) and the cadence has elapsed. PRM is enforced
by the CALLER (the component does not advance `wander.nextAt` under reduce — §4), so `stepField` reads a
`now` it can trust. Recipe (a `now` param threads the clock; default `0` preserves existing callers):

```ts
export interface ConstellationWander {
    /** ms timestamp of the next auto re-target; -1 until armed on the first stepped frame. */
    nextAt: number;
    /** the minimum idle (ms) between auto re-targets. */
    minIdle: number;
    /** the random extra idle (ms) added per cadence (so the rhythm is not metronomic). */
    jitter: number;
}

// stepField gains a trailing `now = 0` param; AFTER warpStep(field, dt):
if (field.wander && now > 0) {
    const wd = field.wander;
    if (wd.nextAt < 0) {
        wd.nextAt = now + wd.minIdle + rngOrMath() * wd.jitter; // armed, no immediate jump
    } else if (now >= wd.nextAt && warpSettled(field)) {
        setWarpTarget(field, pickWanderTarget(field, rngOrMath));
        wd.nextAt = now + wd.minIdle + rngOrMath() * wd.jitter;
    }
}
```

Plus the two helpers (exported for the unit suite):
- `warpSettled(field): boolean` — the warp spring is at rest: `|warp.{x,y} − node[targetIdx].{x,y}| <
  EPS && |warp.{vx,vy}| < EPS` (or `targetIdx < 0`). A click-warp in flight reports NOT settled, so a
  user click always pre-empts the cadence.
- `pickWanderTarget(field, rng): number` — a node index ≠ the current `focalIndex` (so the focal
  actually MOVES). Pick a random eligible node (degenerate single-node field returns the current focal,
  which `setWarpTarget` no-ops cleanly).

The RNG seam: `stepField` cannot own a seeded `rng` (it is stateless over the field); thread the picker
RNG through `field.wander` is wrong (it is cadence state, not entropy). Resolve by passing the picker as
part of the wander step — the component holds the seeded `rng` and supplies it. CLEANEST shape: add a
`rng` param to `stepField` ALONGSIDE `now` (`stepField(field, k, speed, pointer, dt, now, rng)`) with
defaults preserving every existing caller (`now = 0, rng = Math.random`). Decide this signature in
implementation against the existing 1 in-repo caller (`Constellation.vue:174`) + the unit-suite callers;
the default-param form keeps all green.

**E1c. Wire `warpSettled`/the wander into `index.ts`.** Re-export `refitField`, `ConstellationWander`,
`warpSettled`, `pickWanderTarget` from `constellationField.ts` through the package barrel
(`src/components/custom/constellation/index.ts`) so the unit suite + the api types reach them. The
`stepField`/`warpStep`/`setWarpTarget` public symbols must stay byte-identical in NAME (callers + the
W-GOD1 carve depend on them).

### E2 — `src/components/custom/constellation/Constellation.vue`

**E2a. Call `refitField` BEFORE the first post-resize step.** In the render loop's size-change branch
(`:149-162`), capture the prior extent and, on a real change with prior nodes, call `refitField` before
`palette = readPalette`. The seed-once path stays the first-layout owner:

```ts
const prevW = field.w, prevH = field.h;       // capture BEFORE overwrite
if (field.w !== w || field.h !== h) {
    field.w = w; field.h = h; field.k = k;
    if (!field.nodes.length) {
        field.nodes = seedField(rng.value, count, w, h, speed);
        field.warp.x = w / 2; field.warp.y = h / 2;
    } else {
        refitField(field, prevW, prevH);       // ← rescale on the SAME frame
    }
    palette = readPalette(canvas);
}
```

`refitField` is called BEFORE the `stepField` line (`:174`) downstream in the same render pass, so the
first post-resize draw already shows the re-fit lattice (no drift-out frame).

**E2b. The `wander` prop + state + PRM-gated cadence advance.** Add `wander?: boolean | { minIdle?:
number; jitter?: number }` to `defineProps`. Initialise `field.wander` from it (default OFF — `wander`
absent leaves `field.wander` undefined and `stepField` skips the block, byte-identical to HEAD; `wander:
true` uses the default cadence `{ minIdle: 8000, jitter: 8000 }` matching the slides 8–16s rhythm).
Thread `now` + `rng.value` into the `stepField` call. PRM: the wander cadence advance is GATED by the
EXISTING `if (!handle.reducedMotion)` block around `stepField` (`:172-175`) — under reduce, `stepField`
is not called at all, so `wander.nextAt` never advances and the focal mark stays at its seed (the WARP
precedent — the behaviour is simply not advanced, not fire-but-freeze). On the PRM-true edge,
`field.wander.nextAt` is left as-is (the focal stays where it settled); on un-reduce the substrate
re-arms the rAF and the cadence resumes from `now` — no half-state to reset (the wander carries no
ramped force, unlike the W-CON2 gravity-well; the AX.W17 PRM-edge-reset concern does not apply to the
cadence-only wander).

**E2c. The demo test seam.** Extend the `demo/stories/substrates/constellation.vue` `__constellationWarp`
expose (the `onMounted` hook at `:97-110`, the window-handle object literal at `:105-108`) to ALSO expose
the refit + wander observables the π specs read: keep `field` + `warpTo`, and add a `wander` example
instance + a `resizeTo(w, h)` test hook that drives a programmatic RO size-change (so the π spec can
resize WITHOUT racing the real layout). Mint a sibling `__constellationRefit` handle on a dedicated demo
`<Constellation>` whose container the test resizes. The handle MUST expose `field` (so the π spec reads
`field.nodes` bbox + `field.warp` per frame) and the imperative `resizeTo(w, h)` hook (which sets the
demo container's inline `width`/`height` and forces a layout flush so the substrate's ResizeObserver
fires synchronously — the spec asserts the post-RO frame WITHOUT racing a real responsive-scale). The
demo story is DEMO-PRIVATE (never shipped — the `window.__constellation*` handles are story test seams,
mirroring the existing `__constellationWarp` rationale comment at `:93-96`).

### E3 — `src/styles/tokens.css`

Confirm/tune `--constellation-alpha` (light `:512`, dark `:2071`). If the recessive midpoint holds,
NO edit (the π readback ratifies the shipped value); if the both-mode capture shows the field too
loud/faint over cream/ink, adjust within the bounded recessive band and RE-CAPTURE. The π readback is
the binding truth, not a hand-set number. Touch ONLY the `--constellation-alpha` line per arm — the
node/line/edge tokens are out of scope (AX.W17 owns them).

### E4 — `tests/components/custom/constellation/constellationField.test.ts`

Add unit cases (the CPU-oracle layer beneath the π gate):
- **refit-fills-box:** seed at `(640, 360)`, set `field.{w,h} = (1280, 720)`, call `refitField(field,
  640, 360)`; assert every node's `(x, y)` doubled (within ε) and `warp.{x,y}` doubled.
- **refit-conserves-velocity (cool-down):** assert `node.{vx,vy}` UNCHANGED by `refitField` (the
  field-cools invariant — a refit must not heat the lattice).
- **refit-noop-first-layout:** `refitField(field, 0, 0)` and `refitField(field, w, h)` (unchanged dims)
  both leave positions byte-identical.
- **wander-arms-then-fires:** with `field.wander` set, step with rising `now`; assert `nextAt` arms on
  the first stepped frame, and after `nextAt` elapses (with a settled spring) `field.focalIndex` changes
  to a DIFFERENT node.
- **wander-yields-to-click (pre-empt):** an active in-flight warp (`warpSettled` false) blocks the
  cadence re-target on that frame.
- **wander-picks-different-node:** `pickWanderTarget` never returns the current `focalIndex` on a
  multi-node field.

---

## §4 — PRM gating model (STATE it — the WARP precedent)

The auto-drift cadence follows the AX.W17 warp PRM precedent exactly: the behaviour is NOT ADVANCED
under reduced-motion (the `stepField` call is already inside `if (!handle.reducedMotion)` at
`Constellation.vue:172-175`), so `wander.nextAt` never advances and the focal mark stays at its seed.
This is NOT fire-but-freeze. The `useCanvas2D` substrate LIVE-MONITORS PRM, so a user toggling PRM
mid-session resumes the cadence on the next stepped frame. The wander carries NO ramped force (it is
cadence + a `setWarpTarget` re-point), so there is no half-state to reset on the PRM edge — distinct
from the W-CON2 gravity-well, which DOES reset its ramp.

---

## §5 — Risk ledger

1. **Velocity heat-up.** `refitField` must NOT scale `node.{vx,vy}` (positions only) — scaling
   velocities would accelerate the lattice and it never re-settles. Locked by the
   refit-conserves-velocity unit case + the π post-refit drift-speed readback (mean |v| unchanged).
2. **Aspect-ratio shear.** A non-uniform resize (`sx ≠ sy`) shears node spacing — ACCEPTABLE and
   matches the bespoke copy (the slides re-fit also rescales per-axis); the field re-relaxes via drift.
   The π gate asserts bbox-COVERAGE (corners reached), not isotropy.
3. **Default-OFF byte-identity.** `wander` absent must leave `field.wander` undefined and
   `stepField`'s block skipped — byte-identical to HEAD. Locked by a default-path canary: a
   `wander`-absent `<Constellation>` produces an identical first-N-frame node trace to HEAD (a unit
   snapshot over a seeded field with a fixed `now` sequence).
4. **`stepField` signature churn.** Adding `now`/`rng` params risks breaking the 1 in-repo caller + the
   unit callers. The default-param form (`now = 0, rng = Math.random`) keeps every existing call green;
   verified by `npm run typecheck` + `proof:constellation-field`.
5. **W-GOD1 ordering.** `refitField` + the wander LAND in `constellationField.ts`, moving the line count
   (currently 510, at the cap). The AY.W-GOD1 carve runs AFTER W-CON1/2 (per AY §3 Band E last) so it
   carves a settled target — noted here so the carve does not race this content.
6. **Stale-ledger churn.** The warp itself is SHIPPED (AX.W17). This wave does NOT re-build warp,
   `warpTo`, `nearestNode`, or the spring — it ADDS `refitField` + the wander source ON the shipped
   spring. Re-implementing the warp is the forbidden churn-and-regress on a green gate.
7. **WRITE-SCOPE OVERLAP with W-CON2 — SERIALIZE, do NOT run in parallel.** W-CON1 and W-CON2 edit the
   SAME five files: `constellationField.ts`, `Constellation.vue`, `tokens.css`
   (the `--constellation-*` numeric-token cohort), the unit suite
   `tests/components/custom/constellation/constellationField.test.ts`, and the demo story
   `demo/stories/substrates/constellation.vue`. This is the W-GLASS↔W-MOTION same-file class: the two
   waves are NOT independent (a wave is "a set of independent tasks whose write scopes do not overlap" —
   `TRANCHE-AND-WAVE-SPEC.md §Wave`). They MUST serialize: W-CON1 lands FIRST (it owns the `stepField`
   `now`/`rng` signature thread + the numeric-token cohort declaration start in `tokens.css`); W-CON2
   then ADDS the well force + the spring config + the ω-reconcile ON the settled engine. W-CON2's
   `Depends-on` already states this — the overlap is FLAGGED here so the orchestrator does not dispatch
   them concurrently. The numeric-token cohort (`--constellation-warp-*`/`-well-*`/`-wander-*`) is
   declared ONCE — W-CON1 mints the `-wander-idle`/`-wander-jitter` members it owns; W-CON2 adds the
   warp/well members to the SAME block.

---

## §6 — HARD GATE (evidence-backed)

**Gate name:** `proof:live-verified-ledger` (the cardinal-lesson forcing function — the AY-path gate,
`scripts/proof-live-verified-ledger.mjs`, invoked `--tranche=AY` via the shipped
`proof:live-verified-ledger:ay` script entry at `package.json:683`). The gate reads
`docs/tranches/AY/PROGRESS.md`, recognises the AY named wave-id form (`/^W(\d|-[A-Z])/` — `W-CON1`
matches; `proof-live-verified-ledger.mjs:88`), and RED's the `W-CON1` row when its STATUS cell is
`live-verified` (or `complete` AND on the allowlist) unless a matching DELTA doc references a real
on-disk PNG. **The exact mechanics this gate enforces (NOT a prose "looks right"):**

- The DELTA doc lives at `docs/tranches/AY/audit/visual/W-CON1-DELTA.md` (the `<wave>-DELTA.md`
  convention — `deltaSatisfied` at `proof-live-verified-ledger.mjs:166` resolves exactly this path).
- It must reference ≥1 PNG of THIS wave's OWN surface — basenames matching `^W-CON1-` (the
  `ownSurfaceVerdict` regex at `:135`), saved beside the doc as
  `W-CON1-<route>-<viewport>-<scheme>.png`, and the own-surface set MUST carry a `…-light.png` AND a
  `…-dark.png` (the ≥2-viewport × {light,dark} protocol floor; `ownSurfaceVerdict:147-152`). A PNG
  must be a real ≥1024-byte file with the `\x89PNG` magic (`isRealPng:104`) — a placeholder/text stub
  REDs.
- When the `W-CON1` PROGRESS row closes `complete` (rather than `live-verified`), the wave-id is ADDED
  to `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` (today `["W-DOCK1"]`) — the curation that
  binds an allowlisted-`complete` row to the SAME deepened own-surface bar (the cardinal lesson now
  covers `complete`, not just `live-verified`). The `(DEVELOPED)` modifier is gate-REJECTED in any
  status cell; if the live capture was unreachable the only legal status is `live-pending`.

The DELTA's numeric readbacks (the bbox-coverage before/after pair) are produced by a NET-NEW π spec
`tests-visual/constellation-refit-live.spec.ts` (mirroring the shipped
`constellation-warp-live.spec.ts` shape — a REAL device render + per-frame engine-state readback off the
demo `__constellationRefit`/`__constellationWarp` handles), driven by a NET-NEW
`proof:constellation-refit-live` script (a byte-for-byte structural mirror of
`scripts/proof-constellation-warp-live.mjs`: it INVOKES the spec via the `tests-visual` Playwright
runner across BOTH the hoisted-root and workspace `node_modules/.bin/playwright` layouts, parses the
JSON report, writes a `gateArtifactPath` artefact, exits NON-ZERO on any spec failure when the workspace
is present, and SKIPs-with-exit-0 ONLY on genuine device-absence — `proof-constellation-warp-live.mjs:30-45,80-95`).
The spec resolves the scene via `resolveScene("substrates", "constellation")` (the shipped pi-manifest
seam at `tests-visual/pi-manifest.ts:57` — do NOT edit `PI_TARGETS` at `:70`). A new
`proof:constellation-refit-live` script entry lands in `package.json` next to
`proof:constellation-warp-live` (`:644`).

The gate is GREEN only when ALL hold:

1. **REFIT-FILLS-BOX-IN-ONE-FRAME (the BLOCKER fix, numeric, the cardinal DELTA).** Mount the demo
   constellation at a SMALL extent; let it seed; drive a programmatic RO resize to a LARGE extent via
   the `resizeTo` test hook; sample the node bounding box on the VERY NEXT rendered frame. Assert the
   node-bbox covers ≥ 90% of each axis of the new canvas (`bboxW / canvasW ≥ 0.9` AND `bboxH / canvasH ≥
   0.9`) within ONE frame — AND assert the WITHOUT-refit baseline (the HEAD seed-once path, captured by
   a control instance) covers < 60% on that same first frame (the drift-out lag the fix removes). The
   DELTA is the before/after coverage pair + paired screenshots, registered in `AY/PROGRESS.md`.

2. **AUTO-DRIFT-CADENCE (the wander π readback).** Mount a `wander`-on instance with a SHORT test
   cadence; sample `field.focalIndex` per frame over ≥ 2 cadence windows with NO click. Assert
   `focalIndex` re-targets to a DIFFERENT node ≥ 2 times on the cadence (the wander fires), each
   transition is spring-EASED (≥ 5 closing frames, not a snap — reuse the warp spec's closing-frames
   metric), and a synthetic click DURING a wander pre-empts it (the click target wins on the next frame).

3. **PRM-SUPPRESSES-WANDER.** Re-run the wander instance under `prefers-reduced-motion: reduce` (the
   Playwright `colorScheme`/media emulation seam the substrate live-monitors); assert `field.focalIndex`
   NEVER changes over ≥ 2 cadence windows (the cadence does not advance; the focal stays at seed).

4. **FIELD-COOLS-AFTER-REFIT (the heat-up invariant).** Sample mean node |v| before the resize and ≥ 30
   frames after; assert the post-refit mean speed is within ±5% of the pre-refit mean (the refit scales
   positions only — velocities are conserved, the field does not accelerate).

5. **`--constellation-alpha` BOTH-MODE π READBACK.** In light AND dark, read the live `palette.alpha`
   off the mounted engine (via the `__constellationWarp.field` or a `readPalette` re-probe on the demo
   canvas) and assert it equals the declared token value per arm (light → `0.80`±0.01, dark →
   `0.88`±0.01, or the tuned values if E3 adjusts them — the spec reads the token AND the live palette
   and asserts they MATCH, ratifying the plumbing reaches the field).

6. **UNIT FLOOR (`proof:constellation-field`).** The E4 unit cases pass — `refitField` doubles
   positions, conserves velocity, no-ops first-layout; the wander arms/fires/yields-to-click/picks-
   different-node. (The CPU-oracle layer beneath the π gate.)

7. **DEFAULT-OFF BYTE-IDENTITY.** A `wander`-absent seeded field produces a first-N-frame node trace
   byte-identical to HEAD (the default-path canary — adding the wander seam must not perturb the
   existing default render).

8. **DELTA REGISTERED + LEDGER GREEN.** `docs/tranches/AY/audit/visual/W-CON1-DELTA.md` exists and
   references the own-surface `W-CON1-refit-<viewport>-light.png` AND `W-CON1-refit-<viewport>-dark.png`
   (the REFIT-FILLS-BOX before/after pair) + the AUTO-DRIFT-CADENCE capture, both real on-disk PNGs; the
   `W-CON1` `AY/PROGRESS.md` row status flips `planned → live-verified` (and `W-CON1` is added to
   `VISUAL-ALLOWLIST.json` IF it instead closes `complete`); `npm run proof:live-verified-ledger:ay`
   passes (the row is gate-defined by the own-surface light/dark DELTA, not author-asserted). The
   DELTA doc ALSO carries the BEFORE/AFTER paired-π getComputedStyle/`field`-readback NUMBERS (the
   bbox-coverage % pair from clause 1, the focalIndex transition trace from clause 2, the both-mode
   `palette.alpha` from clause 5) per the CAPTURE-PROTOCOL.md artefact shape.

**Born-RED at HEAD:** `refitField` does not exist (assert 1 cannot pass — the seed-once path drifts
out); `field.wander` does not exist (asserts 2/3 cannot run — no cadence to observe); the
`proof:constellation-refit-live` script + spec do not exist (must be authored); the `AY/PROGRESS.md`
DELTA row is absent (assert 8 REDs). The wave is complete only when all eight verify GREEN with the
DELTA on disk.

---

## §7 — Cross-references

- Hardening findings: `AY/audit/hardening/H-constellation.md` (FINDING 1 — the re-fit BLOCKER + FINDING
  2 — the drift-source), `AY/audit/hardening/H-proto-constellation-warp.md` (PART A.3 + B.0 — the
  auto-drift recipe), `AY/audit/hardening/H-slides-adopt-deploy.md` (F3/F9 — the adoption is gated on
  this landing first).
- Sibling waves: AY.W-CON2 (warp VERIFY + decided-scope eggs + the spring tokenisation), AY.W-CON3 (the
  `?freeze` deterministic-capture seam + anomaly props — slides pre-reqs), AY.W-GOD1 (the
  `constellationField.ts` carve — runs AFTER this content), AY.W-DOC1 (README provenance strip),
  AY.W-COHERE (the set-cohesion convergence — it adds the per-instance `opacityCeiling` RECESSION
  envelope constellation lacks, the B2-gestalt F4 3-of-4 parity gap; that prop is W-COHERE's, NOT
  this wave — W-CON1 owns refit+wander+alpha, the recession envelope is the cross-cutting set wave).
- Downstream: L.W-ADOPT (slides DELETEs `constellation.ts`, re-authors `drawAnomaly` as a `drawOverlay`,
  mounts `<Constellation wander>` — depends on this wave + W-PUB1 publish).
- Precepts: `docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md` §"Hard gate" (artefact-backed, not
  grep); the "fix at the ROOT" precept; the ≥2-consumer bar (J inv 10 / L inv 8); the cardinal-lesson
  DELTA (`proof:live-verified-ledger`).
