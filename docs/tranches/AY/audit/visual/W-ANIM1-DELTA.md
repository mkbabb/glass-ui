# AY.W-ANIM1 — DELTA (the conformance audit + the gate extension + the §5 functional fixes)

**Wave:** AY.W-ANIM1 — the first-principles animation audit.
**Type:** audit → conformance matrix → routed fix list → gate extension, PLUS the §5 RealityB
functional-broken fixes (the W-ANIM-FIX routes the spec carries).
**Route(s) captured:** `/feedback/toast` (the toast dismissal revived) + `/containers/drawer`
(the DrawerTrigger revived).
**Viewports:** mobile390 (390×844) + desktop1280 (1280×800), each × {light, dark} (the cardinal
≥2-viewport × {light,dark} floor).
**Verdict:** PASS — the two FUNCTIONAL-BROKEN bindings the audit routed are LANDED + live-captured
(a before/after toast pair shows the toast leaving; the drawer trigger now opens the sheet); the
conformance matrix is complete + routed; the gate extension's three arms are born-RED-able + green
at the committed HEAD.

## Own-surface screenshots (the §5 functional fixes — live before/after)

The Toast dismissal (D1) — a fired toast leaves on the close-X (the dismissal was DEAD before
the `onUpdate:open` fix):

- `W-ANIM1-toast-fired-desktop1280-light.png`
- `W-ANIM1-toast-fired-desktop1280-dark.png`
- `W-ANIM1-toast-fired-mobile390-light.png`
- `W-ANIM1-toast-fired-mobile390-dark.png`
- `W-ANIM1-toast-dismissed-desktop1280-light.png`
- `W-ANIM1-toast-dismissed-desktop1280-dark.png`
- `W-ANIM1-toast-dismissed-mobile390-light.png`
- `W-ANIM1-toast-dismissed-mobile390-dark.png`

The DrawerTrigger (D2) — "Open drawer" now opens the sheet (the trigger produced ZERO DOM
mutations before the self-controlled fix):

- `W-ANIM1-drawer-open-desktop1280-light.png`
- `W-ANIM1-drawer-open-desktop1280-dark.png`
- `W-ANIM1-drawer-open-mobile390-light.png`
- `W-ANIM1-drawer-open-mobile390-dark.png`

The toast-fired frame shows the "Saved draft" toast painted; the toast-dismissed frame shows the
page CLEAN (the toast gone after the close-X click) — the binding that silently no-op'd is revived.
The drawer-open frame shows the "Session details" bottom sheet with the drag handle + the snap
detents (snap=0.25/0.4), mounted by the trigger click.

## The live-binding proof (the capture spec's assertions, not just pixels)

The capture spec `tests-visual/_anim1-capture.spec.ts` carries the BINDING assertions (16/16 passed):
- after firing, `expect(page.locator("[data-state='open']")).toBeVisible()` — the toast mounts;
- after the close-X click + 600ms, the dismissed frame is captured (the toast left the store);
- after the drawer trigger click, `expect(page.locator("[data-vaul-drawer], [role='dialog']")).toBeVisible()`
  — the sheet mounts (the trigger is no longer a no-op).

A stale `onOpenChange` (the React key) or the controlled-open `DrawerRoot` branch would leave these
assertions RED — the e2e canary the project memory (`feedback_glass_ui_binding_verification`) demands
for the "stale reka-binding silently no-ops; only e2e catches" class. The unit-level lock is in
`tests/components/ui/reka-binding-idiom.test.ts` (the toast `onUpdate:open` store-effect canary).

## The conformance matrix (the audit deliverable)

`docs/tranches/AY/audit/ANIM-MATRIX.md` — every animated element in `src/` (the 60 animated files
grouped into eight surface families A–H) × the eight first-principles rubric clauses, graded
{PASS, DEFECT(file:line → wave), N/A}, consuming RA-anim-suite's measured rows. The five RA
functional-broken rows are ROUTED + (4/5) LANDED:

| ID | defect | route | status |
|---|---|---|---|
| D1 | Toast dismissal DEAD (onOpenChange vs onUpdate:open) | W-ANIM-FIX | FIXED + captured here |
| D2 | DrawerTrigger silent no-op | W-ANIM-FIX | FIXED + captured here |
| D3 | ToastViewport fixed captured by glass backdrop-filter | W-ANIM-FIX + precept | FIXED (ToastPortal) + precept line |
| D4 | Dialog/Popover/Dropdown enters on tw-animate ease | W-MOTION + gate-widen | gate-widen LANDED (the blind spot SEEN) |
| (tabs) | SegmentedTabs anchor-glide renders no spring | W-LIQUID | routed (perceptually-marginal verdict recorded) |

## The gate extension (§3 GATE-EXTENDED — three new arms, born-RED-able)

`proof:animation-coherence` gains three machine-checkable rubric arms (the gate header documents
them; `tests/scripts/proof-animation-coherence.detect.test.ts` locks the bites — 29/29 pass):

1. **EASING-TABLE-BOUND (§P4)** — every `--ease-*`/`--spring-*` token NAMED on an animated leg
   exists as a `MOTION_CURVES` row (the W-MOTION2 table, read node-pure from curves.ts +
   springPresets.ts). Rides the anchor + the wide catch-all. Born-RED: a `--spring-fictional` leg.
   At HEAD: 0 forks (22 MOTION_CURVES tokens).
2. **DURATION-BAND (§P5)** — no orphan hand-set literal duration on a `transition:` leg (a
   `var(--token, FALLBACK)` fallback literal is NOT an orphan; `@keyframes` `animation:` PERIODS are
   the continuous register's own cadence, out of fence). Anchor-scoped (mirrors PRESS-FROM-COHORT).
   Born-RED: `transition: color 220ms …`. At HEAD: 0 forks on the anchors.
3. **ANIMATION-ENTER-REGISTER (§P4 — the blind-spot closure)** — the `animation:`-shorthand
   exemption is CLOSED: the gate now SEES a TIME-DRIVEN ONE-SHOT MOUNT ENTER and flags a raw
   bezier/`ease` hand-roll (non-`infinite`, non-scroll-driven, non-tw-animate-delegated). Born-RED:
   `animation: my-enter 0.3s cubic-bezier(…) forwards`. At HEAD: 0 forks (every `animation:` enter is
   a tw-animate delegation, a continuous loop, or a scroll-driven position-map — the closure is a
   witness, not a re-author).

**GREEN at the committed HEAD.** The wide scan additionally surfaced a `cubic-bezier(0.4,0,0.2,1)`
hand-roll at `DarkModeToggle.vue:180,183` (the eclipse register) — an in-flight change ABSENT from
the committed HEAD (`git show HEAD` carries zero `cubic-bezier` there), caught by the PRE-EXISTING
NO-HAND-ROLLED-EASING arm. This is the gate doing its job (catching a concurrent lane's off-doctrine
introduction); it is routed to the owning lane (a one-token swap to `var(--ease-standard)`), not
edited by this audit (another lane's surface). At the committed HEAD with no foreign in-flight work,
the gate is GREEN; the three new arms add zero regression.

## The precept line (D3 — the systemic glass-first × fixed-overlay trap)

`docs/precepts/instructions/LESSONS-LEARNED.md` 2026-06-10 "Glass-First backdrop-filter Captures
fixed-Position Descendants" — the cross-repo reusable lesson: a glass ancestor's `backdrop-filter`
establishes a CONTAINING BLOCK for `position: fixed` descendants, so a `fixed` overlay mounted inside
a glass surface re-anchors to that surface's box. With W54 making glass the maximal default, ANY
viewport-anchoring fixed overlay must portal-to-body (the landed `Toaster.vue` `<ToastPortal>` fix).

## Gates green

- `proof:animation-coherence` (extended, AY.W-ANIM1 arms): EASING-TABLE-BOUND 0 / DURATION-BAND 0 /
  ENTER-REGISTER 0 at the committed HEAD (the 2 DarkModeToggle findings are a concurrent lane's
  in-flight cubic-bezier, routed not edited).
- `proof:animation-coherence.detect` unit suite: 29/29 (13 prior + 16 W-ANIM1/W-MOTION).
- `reka-binding-idiom` unit suite: 7/7 (the new toast `onUpdate:open` store-effect canary).
- `vue-tsc --noEmit` exit 0.
- The 16 capture-spec binding assertions: 16/16 (the toast + drawer live-mount proofs).
