# AZ.W-DOCK-FLICKER — the collapse-onset scale pop killed at the paint-order seam

**Name**: W-DOCK-FLICKER - the morph-flicker root-cause fix
**Opens after**: AZ Batch 1 (the S1 quartet; runs ‖ W-DOCK-RAIL ‖ W-ADAPTIVE-AUTO ‖ W-REGISTER-IOS — disjoint file bounds)
**Agents**: 1
**Hard gate**: `proof:dock-no-scale-pop` (born-RED) — source witnesses (the `.collapsed:hover` scale gates on `:not([data-morphing])`, mirroring the existing `--dock-expand-t` precedent; a wired hover-hysteresis seam in `useDockState`) PLUS TWO frame-sampled live asserts binding BOTH user phenomena: (W3) a collapse-onset trace shows ZERO ≥10px right-edge pop (the "flashing"; the C2 ±24-34px jump eliminated), AND (W4) a sustained cursor-at-collapsing-edge trace shows ZERO repeated expand↔collapse state flips (the "flickering"; the FLIP enter/leave thrash eliminated). A fix that kills only the scale-pop leaves the flicker alive and does NOT close the wave.
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the fleet's ONE precise mechanism (C2), not a blind re-diagnose
(AZ invariant 3). The defect is a PAINT-ORDER seam, not a state-machine thrash — and one
verification lane (F2-R3-3) did NOT reproduce it because it measured the WRONG observable.
Both readings are binding and reconciled below; the impl agent re-greps each anchor at HEAD
and confirms the mechanism before editing.

Grounding findings (FLEET-DIGEST.md): **C2-1/C2-2** [the mechanism, S2],
**C2-7** [the fix space], **D5-7** [S1 — no hysteresis in useDockState],
**F2-R3-3** [REFUTED-as-literal — the wrong-observable note, binding]. Captures:
`docs/tranches/AZ/audit/ground/{C2-morph-flicker-trace.json (561 frames),
C2-morph-flicker-EVIDENCE.md, C2-collapse-onset-pop.png, F2-r3-3-morph-trace.json}`.

**THE mechanism (C2-2 — root cause, confirmed at HEAD this authoring).** The flash is a
ONE-to-TWO-frame GEOMETRIC SCALE POP at collapse-onset. The `.collapsed` class flips on
synchronously when collapse begins, but the box is still painted at EXPANDED width for the
morph's leading frames — because `onSwap` (dockMorphContext.ts:281-330) PINS the box at
`from`-size, then defers the to-size measurement ONE rAF (the synchronous-tick reads the
old active pane → from≈to → frozen; the pin defers it safely). During those leading frames
the box is ~535px wide while `.collapsed` is already true. The UNGUARDED rule

```
.glass-dock.collapsed:hover { scale: var(--dock-collapsed-hover-scale); }   /* morph.css:232-237 */
```

(where `--dock-collapsed-hover-scale: var(--scale-hover-dock)` = `1.1`,
shell.css:25 / scale-paper.css:25) — designed to lift the RESTING 54px collapsed pill —
multiplies the still-535px box, painting a ±24-34px right-edge jump. Frame trace
(`C2-morph-flicker-trace.json`): `t=4149.1 width=535.7 scale=1.1 right=948.8` (collapsed
class on, `--dock-morph-t` still 0), then `t=4194.8 width=467.3 scale=1 right=914.7`
(−34.1px the next frame). The pointer is still inside the box (hover stays true) and the
`@mouseenter`/`@mouseleave` listeners are bound to the MORPHING `.glass-dock` root
(GlassDock.vue:247-248) with NO hysteresis (D5-7), so the moving edge re-crosses the
stationary pointer — the classic FLIP hover-thrash substrate.

**The precedent guard already exists.** `--dock-expand-t` (morph.css:46-53) IS gated by
`[data-morphing]` — the exact guard pattern the `.collapsed:hover` rule lacks. The
`[data-morphing]` attribute is set/removed by dockMorphContext.ts (:264/:319 set, :194
remove) + useLayerTransition.ts (:161/:228 set, :129 remove) for the morph duration. The
fix MIRRORS this shipped precedent, it does not invent a new guard.

**The wrong-observable note (F2-R3-3 — binding, NOT a refutation of the user).** F2's
real-mouse edge probe measured WIDTH oscillation and found `flickerBlocks:0, maxRev:0` —
because the visible pop is a `scale`/right-EDGE-position pop, not a `width` reversal. A
wave grounded on F2's literal "no flicker" framing would be wrong: the user's report is
correct, F2 simply instrumented the wrong axis (and could not stage the cursor-at-collapsing-edge
case in headless). This wave's gate samples the RIGHT-EDGE POSITION (not width) at
collapse-onset — the observable the C2 trace already proved carries the defect.

RE-GROUND command set (run all; confirm the mechanism + the precedent):

```
sed -n '226,240p' src/styles/dock/morph.css                                  # the unguarded rule
sed -n '42,55p'   src/styles/dock/morph.css                                  # the [data-morphing] precedent
grep -n 'data-morphing' src/components/custom/dock/composables/*.ts          # the attribute lifecycle
sed -n '255,330p' src/components/custom/dock/composables/dockMorphContext.ts # onSwap pin + 1-rAF defer
sed -n '128,210p' src/components/custom/dock/composables/useDockState.ts     # no hysteresis
sed -n '244,250p' src/components/custom/dock/GlassDock.vue                    # listeners on morphing root
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | C2-2 root cause [S2] | `src/styles/dock/morph.css:232-237` | `.glass-dock.collapsed:hover { scale: 1.1 }` is UNGUARDED by `:not([data-morphing])`; multiplies the still-535px box during the leading collapse frames |
| 2 | C2-2 the measure-defer | `dockMorphContext.ts:281-330` (onSwap pins from=to=fromSize, measures one rAF later) | the leading frames stay expanded-width while `.collapsed` is already true — the paint-order seam |
| 3 | the precedent guard | `src/styles/dock/morph.css:46-53` (`--dock-expand-t` gated by `[data-morphing]`) | the shipped pattern to mirror |
| 4 | C2-3 the scale magnitude | `tokens/scale-paper.css:25` (`--scale-hover-dock: 1.1`); `dock/shell.css:25` | matches the measured `scale=1.1` exactly |
| 5 | D5-7 no hysteresis [S1] | `useDockState.ts:130-138` (pure timer), `:178-207` (instant enter, no geometry recheck); GlassDock.vue:247-248 (listeners on the morphing root) | no dwell/geometry guard; the moving edge re-fires enter/leave off the static cursor |
| 6 | F2-R3-3 wrong-observable | `ground/F2-r3-3-morph-trace.json` (width:0 reversals) vs `C2-morph-flicker-trace.json` (right-edge ±24-34px) | the pop is a right-EDGE/scale pop, not a width reversal — instrument the edge, not the width |

## Goal criterion

A hovered, collapsing dock never paints a geometric pop — the collapse-onset right edge
settles monotonically with no ≥10px jump, and the cursor-at-collapsing-edge case does not
re-thrash enter/leave. The user's "flashing and flickering when at the edge" (R3-3) is
resolved totally, on the collapsible docks where it lives (`/dock/overview`, `/dock/layers`).

## Scope

1. Gate the collapsed-hover scale on morph settle (the PRIMARY one-line locus, C2-7 A):
   scope `.glass-dock.collapsed:hover { scale: … }` to
   `.glass-dock.collapsed:hover:not([data-morphing])` so the +1.1 hover lift applies ONLY
   at REST (the box is the 54px circle then), never multiplying the transient 535px box.
   This mirrors the shipped `--dock-expand-t` `[data-morphing]` precedent at morph.css:46-53.
2. Make the hover-scale eligibility read the morph state, not the raw boolean class (the
   DEEPER half, C2-7 B): the chrome eligibility for the hover lift keys off whether the
   morph scalar is settled (`:not([data-morphing])`) rather than the synchronously-flipped
   `.collapsed` class alone — so a collapse-in-flight never qualifies for the resting-pill
   hover scale even one frame.
3. Add hover hysteresis to `useDockState` (the FLIP-thrash hardening, C2-7 C + D5-7): an
   intent-dwell on `onMouseEnter` (a small debounce before the collapsed→hover expand
   fires) AND/OR a post-morph geometry recheck — so the moving box edge re-crossing the
   static cursor cannot re-fire the enter/leave oscillation. The collapseDelay timer is NOT
   the fix (it only masks slow exits); the hysteresis is the structural guard the
   listener-on-morphing-root design lacks.
4. Author `proof:dock-no-scale-pop` (born-RED): SOURCE witnesses (the scale rule is guarded;
   `useDockState` carries a hysteresis seam REFERENCED on the enter/leave path) + TWO
   FRAME-SAMPLED live witnesses — W3: a collapse-onset trace shows zero ≥10px right-edge pop
   (the "flashing"); W4: a sustained cursor-at-collapsing-edge trace shows zero repeated
   expand↔collapse state flips (the "flickering"). Both phenomena the user named must clear.

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if the `:not([data-morphing])`
  scale-gate alone does NOT eliminate the pop (the box still paints expanded-width while
  hover-scaled because the class flip and the `[data-morphing]` arm are not co-timed) and
  the fix requires re-sequencing the `onSwap` class-flip vs `data-morphing`-arm ordering in
  `dockMorphContext.ts` (a shared morph-orchestrator surface), that is a scope-reveal —
  triumvirate (research the class-flip/morph-arm co-timing + plan-augment the bound +
  redress).
- **Hard-gate failures not local-edit-recoverable**: if the frame-sampled trace still
  shows a ≥10px edge pop after the scale-gate + hysteresis land, that is a non-local
  mechanism miss — triumvirate; do not loop on the timer value.
- **Diagnostic loop halt**: if after three iterations the headless harness cannot reliably
  STAGE the collapse-onset (the F2 note: `/dock/overview` would not collapse on mouse-leave
  in headless without swiftshader GPU args / a park-first step) the harness setup is the
  blocker — halt and triumvirate on the capture rig (the C2 trace proves the defect is
  real and stageable; the rig must replay it, see Archaeology).

## File Bounds

| File | Access |
|---|---|
| `src/styles/dock/morph.css` | modify (gate the `.collapsed:hover` scale on `:not([data-morphing])`) |
| `src/components/custom/dock/composables/useDockState.ts` | modify (add hover hysteresis / intent-dwell + geometry recheck) |
| `src/components/custom/dock/GlassDock.vue` | modify (only if the hysteresis seam needs a listener-binding change) |
| `scripts/proof-dock-no-scale-pop.mjs` | create (the born-RED gate; the frame-sampled arm) |
| `package.json` | modify (register `proof:dock-no-scale-pop` + parity) |
| `scripts/gates.mjs` | modify (register the gate row in the gate registry) |
| `CLAUDE.md` | modify (record the collapse-onset scale-pop fix in the dock contract) |

Do NOT touch: `dock/layer-group.css` / `DockLayerGroup.vue` (W-DOCK-RAIL owns those);
`dock/shell.css` W55 tint block (W-ADAPTIVE-AUTO owns that); the root active-register
tokens (W-REGISTER-IOS); `dockMorphContext.ts` (read-only here UNLESS the triumvirate
above fires — the class-flip/morph-arm co-timing is the booked escalation, not a default
edit).

### Disjointness

Single agent. Across Batch 1: this wave's `morph.css` edit is the `.collapsed:hover` scale
rule ONLY (a distinct rule from W-ADAPTIVE-AUTO's `@container style(--glass-backdrop)`
block at morph.css:295-301 — different rules, but BOTH waves touch `morph.css`). **Conflict
note**: `morph.css` is written by BOTH W-DOCK-FLICKER (the `.collapsed:hover` rule) and
W-ADAPTIVE-AUTO (the W55 `@container` block). These two waves MUST either sequence (one
opens after the other) OR run in sibling worktrees with a clean integration merge — the
orchestrator resolves at dispatch (the rules are non-overlapping line-ranges, a clean
3-way merge, but they may NOT both hold an uncommitted `morph.css` in the same worktree).
`useDockState.ts` + `GlassDock.vue` are touched by NO other Batch-1 wave.

## Agent Units

### AZ.W-DOCK-FLICKER.1 the scale-gate on morph settle

- Goal: the collapsed-hover scale never multiplies a transient large box — the +1.1 lift
  applies only when the dock is settled at the 54px circle.
- Mechanism: scope `.glass-dock.collapsed:hover` to `…:not([data-morphing])`
  (morph.css:232-237), mirroring the `--dock-expand-t` `[data-morphing]` precedent
  (morph.css:46-53). During `[data-morphing]` the hover scale is inert; it engages at rest.
- Files: `src/styles/dock/morph.css:232-237`.
- Sub-gate: the gate's W1 source witness — the `.glass-dock.collapsed:hover` selector
  carries `:not([data-morphing])` (asserted against the comment-stripped CSS); RED at HEAD
  (the bare `.glass-dock.collapsed:hover`).

### AZ.W-DOCK-FLICKER.2 the hover hysteresis

- Goal: the moving box edge re-crossing the static cursor cannot re-fire the enter/leave
  oscillation.
- Mechanism: add an intent-dwell debounce on `onMouseEnter` (useDockState.ts:178-186)
  before the collapsed→hover expand, and/or a post-morph "is the cursor still inside the
  settled-geometry box" recheck — the structural hysteresis the pure collapseDelay timer
  (useDockState.ts:130-138) lacks. The listeners stay on the dock root; the GUARD is the
  dwell + geometry recheck, not a listener re-binding (unless a sentinel rect is the chosen
  shape, which touches GlassDock.vue).
- Files: `useDockState.ts:130-207`, optionally `GlassDock.vue:247-248`.
- Sub-gate: the gate's W2 source witness — `useDockState.ts` carries a hysteresis seam
  (an intent-dwell timer distinct from `collapseDelay`, or a `getBoundingClientRect`
  geometry recheck); RED at HEAD (the file has no `getBoundingClientRect`/dwell — pure
  timer only).

## Hard Gate

`proof:dock-no-scale-pop` (born-RED at HEAD, driven GREEN by the wave):

1. **W1 — the scale rule is guarded.** The comment-stripped `dock/morph.css` shows
   `.glass-dock.collapsed:hover` scoped with `:not([data-morphing])`. RED at HEAD: the bare
   selector multiplies the transient box.
2. **W2 — the hysteresis seam exists AND is wired.** `useDockState.ts` carries an
   intent-dwell / geometry-recheck distinct from the `collapseDelay` timer, AND that seam is
   ON the enter/leave path — not dead code that satisfies the grep. RED at HEAD: pure timer,
   no `getBoundingClientRect`, no dwell. **Bite-tightening (anti-evasion)**: the source half
   asserts the recheck is REFERENCED by `onMouseEnter`/`onMouseLeave` (a `getBoundingClientRect`
   that never gates the state flip is a no-op decoy that passes a bare grep); W4 below is the
   binding behavioral proof the seam actually suppresses the re-fire.
3. **W3 — the frame-sampled no-SCALE-POP assert (the "flashing" observable).** A collapse-onset
   trace over the collapsible dock (`/dock/overview`, hover→collapse), sampling the
   RIGHT-EDGE POSITION (not width — the F2 wrong-observable lesson), shows ZERO ≥10px
   single-frame jump across the collapse-onset window. RED at HEAD: the C2 baseline trace
   carries `right 924.5→948.8 +24.3px` then `→914.7 −34.1px` (the visible flash). The gate
   replays the C2 capture methodology (the trace shape is proven in
   `ground/C2-morph-flicker-trace.json`).
4. **W4 — the no-FLIP-THRASH assert (the "flickering" observable — DISTINCT from W3).** The
   user named TWO phenomena: "flashing AND flickering." W3 binds the scale-pop ("flashing");
   W4 binds the FLIP enter/leave OSCILLATION ("flickering") the hysteresis fixes. A SUSTAINED
   cursor-at-collapsing-edge trace (the cursor held at the settling right edge across the
   collapse window, the case D5-7 describes — the moving box edge re-crossing the static
   cursor) shows ZERO repeated expand↔collapse state flips (no enter/leave re-fire
   oscillation: the dock settles to ONE state and stays). A fix that lands ONLY the
   `:not([data-morphing])` scale-gate (scope 1) and stubs the W2 seam passes W1+W3 while this
   thrash survives — W4 is the bite that forbids that partial close. RED at HEAD: with the
   listeners on the morphing root and no hysteresis, the cursor-at-edge case re-fires
   enter/leave as the edge sweeps past the cursor.
5. **The π binding DELTA** (cardinal-lesson, own-surface): a captured before/after to
   `docs/tranches/AZ/audit/visual/W-DOCK-FLICKER-DELTA.md` — the after-trace showing BOTH the
   collapse-onset monotone settle (no ≥10px pop, W3) AND the sustained cursor-at-edge no-flip
   record (W4), paired against the `ground/C2-collapse-onset-pop.png` baseline.

W1+W2 are the device-free CI half; W3 + W4 + the π DELTA are the binding frame-sampled truth
(the wrong-observable lesson is encoded — the gate measures edge position + state-flip count,
never width). BOTH user phenomena ("flashing" via W3, "flickering" via W4) must clear for the
clean close; the user-condition live re-verify (the cursor-at-edge replay) is the completion
criterion, not the source-witness pair alone.

## Format And Lint Cadence

`npm run typecheck` after the `useDockState` edit; `npm run build` to confirm `morph.css`
compiles; `node scripts/proof-dock-no-scale-pop.mjs` born-RED before the source edits,
GREEN at close; `npm run proof:gate-script-parity` after registration; `git diff --check`
before close.

## Verification Artefacts

- `docs/tranches/AZ/audit/visual/W-DOCK-FLICKER-DELTA.md` — the collapse-onset right-edge
  trace before/after (monotone settle, no ≥10px pop, W3) + the sustained cursor-at-edge
  no-flip record (W4) + the π readback.
- The `proof:dock-no-scale-pop` JSON artefact (born-RED + GREEN logs, incl. both frame traces).
- The frame-trace JSON captures (the W3 collapse-onset after-state + the W4 cursor-at-edge
  sustained trace, mirroring `C2-morph-flicker-trace.json`).

## Commit Plan

- impl commit: `fix(dock): kill the collapse-onset scale pop — gate .collapsed:hover on morph settle + hover hysteresis (AZ.W-DOCK-FLICKER)` — names the paint-order mechanism in the body.
- gate commit: `test(dock): proof:dock-no-scale-pop born-RED→GREEN (frame-sampled edge assert) + parity`.
- doc/status commit: the CLAUDE.md record + the DELTA doc + PROGRESS row.

## Dependencies

- **Depends on**: nothing structurally. **Coordination with W-ADAPTIVE-AUTO**: both write
  `morph.css` (non-overlapping rules — the `.collapsed:hover` scale vs the
  `@container style(--glass-backdrop)` block). Sequence them OR sibling-worktree + clean
  merge; the orchestrator picks at dispatch (see Disjointness).
- **Blocks**: W-DOCK-TAXONOMY (Batch 2) — when the taxonomy gives the vertical dock a
  collapse path, the hysteresis + scale-gate must already hold so the new collapse surface
  inherits the fix.

## Archaeology

Prior attempts: W-DOCK1 verdict "lag captured-ABSENT (box-scalar onset delta=0ms)" and
W-DOCK2 "lockstep" hold in SOURCE (DOCK_SPRING single clock, one `--dock-morph-t` scalar)
— but they instrumented the box-scalar LAG, never the hover scale-pop. F2-R3-3 then
measured WIDTH oscillation and found none — the wrong observable. The new guardrail: this
wave's gate samples the RIGHT-EDGE POSITION at collapse-onset (the observable the C2 trace
proved carries the defect), not the box-scalar lag or the width, so a "lockstep-clean,
visually-popping" close cannot recur. The C2 trace (`ground/C2-morph-flicker-trace.json`,
561 frames, the ±24-34px jump at t=4149/4194) is the binding reproduction the after-trace
must clear.
