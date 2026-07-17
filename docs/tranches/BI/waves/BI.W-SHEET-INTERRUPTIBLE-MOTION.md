# BI.W-SHEET-INTERRUPTIBLE-MOTION — the sheet spring-mount convergence (V6 FAIL-1 · the jump-to-open snap)

Band B7 (motion). MINTED 2026-07-16 at the sheet-interruptible-motion triumvirate pass (BI-addenda;
RESEARCH → HARDEN, Option-B ADOPTED with five binding amendments R1–R5, two-consecutive-clean) — the
V6 drawer/sheet sweep **FAIL-1** (the placed `<DialogContent>` sheet jumps to fully-open then slides
out on an interrupted enter) had NO owning wave across the BI corpus (grep-verified: no wave mentions
`sheetSlideTransform`, a sheet `present` hold, or the side-placement spring; the only sheet-motion
prose is Q024/Q003 material/register calibration, orthogonal to the interrupt). Provenance: the V6
sweep FAIL-1 (`reports/visual-sweeps/V6-drawer-sheet.md` +
`artifacts/v6-sheet-05-reverse-jump-to-open-FAIL.png`, the handoff §10 reverse contract) + the
liquid-weight universal (user law: all interactive motion carries inertia/velocity/bounce) + GCF-02's
drawer precedent (`useDrawerSnap` interruptible reverse, V6 arm-4/arm-7 PASS). Branch
`codex/bi-p-q-execution` (pinned at `e7da7b5c` when the arms read source; the seam is HEAD-stable).
Sources of record:
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/bi-addenda/reports/sheet-motion/research.md`
(RESEARCH arm) +
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/bi-addenda/reports/sheet-motion/harden.md`
(HARDEN arm, **normative** — R1–R5 supersede the research draft where they conflict). The hardened
contract below is the terminal execution specification; research is lineage, not a broader license.

## §Intent — the defect, root-caused in source, with the quoted trace

The "Sheet" is `<DialogContent placement="top|right|bottom|left">` — the former Sheet folded into
Dialog as a `data-placement` paint axis (reka `DialogRoot` + FocusScope unchanged). Its slide is a
**CSS `@keyframes`** whose exit restarts from the resting-open origin, so an interrupted enter snaps
the whole sheet to fully-open in one frame, then slides out. Two source seams produce it:

- `src/components/dialog/DialogContent.vue:233` — `PLACEMENT_SLIDE` composes tw-animate-css
  `data-[state=open]:slide-in-from-*` / `data-[state=closed]:slide-out-to-*` **keyframes**;
  `sideBaseClasses` (`:242–243`) adds `transition ease-in-out sheet-animate`.
- `src/styles/utilities/btn.css:83` — `sheet-animate` = `animate-in`/`animate-out` +
  `fade-in`/`fade-out` keyframes on `--duration-panel` (open) / `--duration-fast` (close).

A `@keyframes` has **absolute** `from`/`to`. When reka flips `data-state` open→closed mid-enter, the
`slide-out-to-right` implicit `from` is the laid-out resting position (`translate: 0` = fully open),
so the surface jumps from its mid-enter position to open, then slides out. The captured trace:

> `tx=341 (state=open, anim=enter) → tx=2 (state=closed, anim=exit)` — a ~339px one-frame snap to
> fully-open, then a slide-out. Terminal state correct; only the reverse **visual** is broken.
> Scheme-independent, all four placements.

The load-bearing constraint that forbids a pure-CSS transition fix (`reveal.css:179–198`, quoted):

> reka-ui `usePresence` gates the portaled-overlay unmount on
> `getComputedStyle(node).animationName` — it dispatches ANIMATION_OUT + awaits
> `animationstart`/`animationend` and has **NO `transitionend` path**, so a transition-only exit is
> TORN DOWN (~11ms, <1 frame) before it can paint.

So the exit cannot be a bare CSS transition, and a keyframe exit from the resting-open origin *is the
defect*. The cure converges the side sheet onto the **shared spring-mount kernel** (`useSpringMount`
→ `useSpring` → `SpringProgress`) whose `SpringProgress` engine the Drawer already proves
interruptible (via its own `useDrawerSnap`) — velocity-preserving
re-target on the live spring — extended with the Drawer's `present` mount-hold so the spring, not a
keyframe, owns unmount timing. No new engine, no new composable, no public API change; deletes the
keyframe-slide path from the side sheet.

## §Design — the hardened contract (normative; R1–R5 binding)

**Verdict (harden §0): Option B ADOPTED.** The mechanism is sound on the load-bearing axis —
`useSpring` (`useSpring.ts:150–157`) re-seats `SpringProgress.target` on every target change and
keeps the live `(value, velocity)`, the same kernel the drawer's interruptible reverse (V6 PASS,
`ty=589→583→…→900`, ~6px momentum) rides. The `tx=341→2` snap dies. Ship it with the five
amendments below.

### D1 · `useSpringMount` gains a `present` mount-hold — the two guards are load-bearing (verbatim)

`src/composables/motion/spring/useSpringMount.ts`:

- `const present = ref(options.open.value);`
- In the **open watch** (`useSpringMount.ts:141`): on `open` flip, set `present.value = true`
  **before** the `isDragging` early-return (`:145`) — moot for the sheet, correct-by-construction.
  Do **not** clear it here; the settle owns unmount.
- Add a **new, independent** settle branch (do NOT fold into the existing `pendingDismiss`/`onDismiss`
  branch — the sheet never drags, so `pendingDismiss` never arms):

  ```ts
  if (spring.isSettled.value && target.value >= 1 && !options.open.value) present.value = false;
  ```

- Return `present: readonly(present)`; add `present: Readonly<Ref<boolean>>` to `SpringMountRef`.
  ~+12 lines. Additive — no change to `position`, `isDragging`, `dragHandlers`, or PRM; the existing
  center consumer is untouched.

Race audit (harden §3, each ruled **safe**): the spring is one persistent instance on
DialogContent's scope; `SpringProgress.play` is idempotent and target re-seats auto-resume the one
rAF loop — **no per-open rAF accumulation**; `onScopeDispose` stops it on unmount. The two guards
that carry the machine, written exactly (not paraphrased):

1. the settle branch above — `!options.open.value` keeps re-open-mid-exit mounted (the settle never
   fires the unmount while `open` is true);
2. `forceMount = present || open` — a settle firing the same tick `open` re-flips true stays mounted
   because `open` is now true.

Reverse-mid-enter (the FAIL-1 case): entrance is `position 1→0`; interrupt at `p≈0.11`, velocity
negative; close flips `target→1`; the spring continues from `(0.11, −v)` — preserved velocity carries
it slightly *further open* for ~1–2 frames, then rides to 1. For a right sheet: `translate 11% → ~9%
→ … → 100%`. **No jump to 0.** Re-open-mid-exit: `open→true` while `present` is already true → target
re-seats from current `(value, velocity)` → slides back in; the settle never unmounts.

### D2 · Arm the side spring — placement-alone, reuse the existing inject (harden §9)

`src/components/dialog/DialogContent.vue`:

- **Arm on `placement !== "center"` ALONE** (placement is static per instance) — NOT gated on
  `!== "off"`. `off` is handled *inside* the armed path (render at rest, no translate), which removes
  the `off↔non-off` setup-flip trap the research draft carried. `centerSpringActive` = the existing
  rule unchanged; `sideSpringActive = placement !== "center"`; `springActive = center || side`.
- **Reuse the existing `dialogRoot`** (`DialogContent.vue:108` already holds
  `injectDialogRootContext()`) — drop the re-inject the research draft added at the spring-arm site.
  Net-negative.
- `springMount = springActive ? useSpringMount({ open: dialogRoot.open, preset: props.springPreset ??
  "smooth" }) : null` — **no `dragHandlers`** (the N3 fence reserves drag-dismiss + detents to the
  Drawer), **no `onDismiss`** (reka owns open state).

### D3 · `sheetSlideTransform` — the `translate` LONGHAND helper (RULING R1, ship-blocking)

The research draft's `§4.3` is **wrong as written**: it emits `translateX(calc(var(p)*100%))` as the
`translate` *longhand* value while also setting `transform:none`. `translateX()`/`translateY()` are
`transform` *functions*; the `translate` longhand takes `<length-percentage>` **pairs** and silently
drops `translateX(...)` → it paints nothing. The center path already models the correct discipline
(`DialogContent.vue:307`, `translate: "-50% -50%"`). The helper is a pure JS string fn (also resolves
the draft's §4.3-CSS-var vs §6-pure-fn inconsistency — do **not** introduce a `--p` CSS var; compute
the percentage in JS). `p`: 0 = mounted, 1 = dismissed:

```ts
// pure, unit-pinnable; returns a CSS `translate` LONGHAND value ("<lp> <lp>")
function sheetSlideTransform(placement: SidePlacement, p: number): string {
    switch (placement) {
        case "right":  return `${p * 100}% 0`;   // p=1 → "100% 0"   off right
        case "left":   return `${-p * 100}% 0`;  // p=1 → "-100% 0"  off left
        case "bottom": return `0 ${p * 100}%`;   // p=1 → "0 100%"   off bottom
        case "top":    return `0 ${-p * 100}%`;  // p=1 → "0 -100%"  off top
    }
}
```

Applied in `springStyle` (side branch) as `{ translate: sheetSlideTransform(placement, position),
transform: "none", animation: "none", transition: "none" }` so the inline `translate` longhand is the
sole source (the center-branch discipline). Verified against `placement.css` geometry: right/left are
inline-edge-anchored at `width:75%`; top/bottom are block-edge-anchored — a 100% translate along the
anchored axis takes the sheet exactly one own-dimension offscreen. Correct all four.

**Do NOT clamp `p` to [0,1].** The ~1.52% overshoot (p transiently < 0) is the liquid settle and the
reverse momentum — clamping kills the very momentum that is the point. Stated honestly (RULING R4,
correcting the research §3 reason #3): the entrance overshoot is a **~5.8px gap at the anchored edge**
at peak (right sheet: `translate:−1.5% 0` pulls left off the anchored right edge) — **identical in
magnitude to the drawer's V6-PASSED accepted settle** (same ζ=0.8, 5.8px @384px), not "into the
screen." Research reason #3 is **struck** from the C/D rejection (it defeats B equally and it is the
drawer's accepted behavior); the valid C/D defeaters are #1 (reka tears down a transition-only exit),
#2 (a CSS transition restarts from velocity 0 — no momentum, a liquid-weight violation), #4 (no shared
live scalar for scrim sync).

### D4 · Mount-hold + inert + focus handoff — Portal **and** Content (harden §11)

- **`forceMount`** = `springActive ? (springMount.present.value || dialogRoot.open.value) :
  props.forceMount`, applied to **both** `RekaDialogPortal` **and** `RekaDialogContent`. The Portal
  binding is new (DialogContent currently spreads only onto the content node); without it the portal
  subtree unmounts on logical close and the exit never paints. Byte-identical to the drawer
  (`DrawerContent.vue:108–110`, proven).
- **`:inert`** on the side content while closing: `sideSpringActive && !open ? '' : undefined` — the
  closing sheet is non-interactive/untabbable during exit, and drops out of the a11y tree (SR does not
  announce a closing sheet).
- **Focus handoff** (mirror `DrawerContent.vue:97–106`, V6 arm-7 PASS): on `dialogRoot.open → false`,
  if `document.activeElement` is inside the resolved content, `dialogRoot.triggerElement.value?.focus({
  preventScroll: true })` at the **logical** close (not the spring settle) — focus is never stranded in
  the animating-out sheet. The inert-applies → browser-bounces-to-body → sync-watch-pulls-to-trigger
  order is the drawer's proven order.

### D5 · Scrim opacity synced to the surface — `ModalOverlay.vue` + `scrimOpacity` helper (harden §8)

DialogContent renders `<ModalOverlay>` in the same template as the content, so pass the live scalar
directly — no context plumbing:

- Add props `slideT?: number | null` and `forceMount?: boolean` to `ModalOverlay`.
- DialogContent binds `:slide-t="sideSpringActive ? springMount.position.value : null"` and
  `:force-mount="sideSpringActive ? (springMount.present.value || open) : undefined"`.
- In `ModalOverlay`, when `slideT != null`: **drop `sheet-animate`**, bind
  `:style="{ opacity: scrimOpacity(slideT) }"`, forward `forceMount` to the reka `DialogOverlay`
  (load-bearing — without it the scrim unmounts on logical close while the forceMounted content keeps
  sliding → scrim vanishes, content slides out bare). When `slideT == null` (center dialog + the `off`
  side path): unchanged — keep the `sheet-animate` fade keyframe.
- The second pure, pinnable helper: `scrimOpacity(p) = Math.min(1, Math.max(0, 1 − p))` — 1 at open,
  0 at dismissed, clamped so the overshoot (p<0) does not push opacity past 1. It reads the same live
  scalar as the surface → no desync through an interrupt.

**Scrim-mechanism divergence, ruled acceptable with one gate (harden §8):** `opacity: 1−p` composites
**everything including the `backdrop-filter` blur**, so this wave *fades the blur with position* — a
divergence from the drawer's `--stage-t` tint-ramp-with-blur-floor, not a mirror. Directionally
correct; keep it for the common `stage:"none"` case. **Gate against `stage` stacking:** on a side
sheet with `stage ∈ {dim,scale,immersive}`, `DialogContent.syncStage` already writes `--stage-t` to
the scrim and the `[data-stage-scrim]` recipe ramps its tint α → the new `opacity:1−p` would **stack**
(opacity × stage-α) → a dimmer-than-intended scrim mid-slide. Both monotonic in `p` → no
reversal/desync, only a compounding; `stage!=none` on a *side* sheet is rare (stage is a center-recede
affordance). Acceptable this wave; recorded as native debt (§π/DELTA). If the stacking reads wrong,
gate the opacity binding to `stage === "none"` and drive the existing `--stage-t` scalar per-frame
from `springMount.position` for the `stage!=none` side case (reuse, no new prop).

### D6 · Delete the keyframe-slide path from the side sheet

- `PLACEMENT_SLIDE` (`DialogContent.vue:233`): strip `slide-in-from-*` / `slide-out-to-*` from all
  four arms; **KEEP** the `rounded-*` + `border-*` decoration.
- `sideBaseClasses` (`:242–243`): strip `transition ease-in-out sheet-animate` (the JS spring owns
  motion; the overlay padding ladder stays).
- `sheet-animate` (`btn.css:83`) **RETAINED** — the center scrim and the `off` side path still
  reference it. Only the side-sheet surface stops. `placement.css` **untouched** (Q023's geometry +
  graded-edge live there).

### D7 · Take the center unification NOW (RULING R2 — changes the design, census-proven invisible)

Bind `present` + `forceMount` on the **center path too**. Leaving center on instant-teardown while the
side springs-out is a **dual exit path inside one composable** — the no-legacy law forbids it. The
consumer census (D8-adjacent, harden §5) proves it invisible: **no consumer arms the center spring**
(`springPreset` has zero hits repo-wide across consumers), so this changes only the demo. One
composable, one exit, both placements; the center dialog's latent instant-exit is fixed for free. This
resolves the research open-question #1 decisively: **unify.** (Convergence, harden §4: sheet-local was
argued and ruled B — a sheet-local composable would mint a *third* "spring a portaled surface in/out"
vocabulary the KISS law forbids; the "exit unproven" objection is discharged by the byte-identical
drawer `present`-hold + `forceMount` handoff **and** the unit pins in §Work.)

### D8 · Preset — `smooth` stands, rationale CORRECTED (RULING R3); `snappy` is a gap trap; NO `gentle`

Computed overshoot (`exp(−πζ/√(1−ζ²))`), px on a 384px sheet:

| preset | response | ζ | overshoot | px @384 |
|---|---|---|---|---|
| **DRAWER_SNAP** | 0.32 | 0.80 | **1.52%** | **5.8** |
| **smooth** | 0.58 | 0.80 | **1.52%** | **5.8** |
| snappy | 0.48 | 0.74 | 3.15% | 12.1 |
| gentle | 0.82 | 1.00 | 0.00% | 0.0 |

- **Keep `smooth`** — but NOT because it "matches the Drawer." Its overshoot is *identical* to the
  drawer's (5.8px, same ζ), yet its response 0.58 is **~1.8× SLOWER** than the drawer's 0.32; `smooth`
  is *more patient*, not drawer-paced. It stands because (a) it is the Dialog family's **existing
  default** (`DialogContent.vue:289`, `props.springPreset ?? "smooth"`) — the side sheet defaulting to
  it unifies the Dialog family under one register; (b) the token authority designates it the
  modal-surface register; (c) ζ=0.8 keeps the 1.52% bounce flavor. A modal sheet being more patient
  than a finger-flingable drawer is correct product feel.
- **`snappy` is a gap trap** — 3.15% *doubles* the anchored-edge overshoot to **12.1px**, the exact
  "~12px" the research's own (now-struck) reason #3 warned against. Only take it if the sweep confirms
  12px is imperceptible at the real widths (390 + 1440 CSS px). Prefer reporting `smooth` sluggishness
  as acceptable-for-a-modal.
- **Do NOT fall back to `gentle`** (strike the research §8.2/§6 fallback) — ζ=1.0 → 0% overshoot → no
  bounce → a liquid-weight-law regression, and unnecessary (smooth's gap already equals the drawer's
  accepted gap; nothing to rescue).
- `springPreset` stays the consumer escape (already public — **no API change**).

### D9 · PRM · `off` · a11y (harden §10)

- **PRM (OS `prefers-reduced-motion:reduce`):** `useSpring.respectReducedMotion` defaults true →
  `SpringProgress` snaps `position` to target in one frame. Open → `p=0` in place; close → `p=1`,
  `isSettled` fires → settle branch clears `present` → unmount. Scrim opacity snaps 0↔1. **No
  transform frames.** (Unit note: the settle watch fires on the *next flush* after the synchronous
  snap — the PRM units must `await nextTick` between the `open` flip and the `present` assertion.)
- **`off`** (`motionAxis.resolved === "off"`): armed path renders at rest, no translate; keyframe gone
  → plain reka Presence unmounts in <1 frame. Instant; scrim keeps `sheet-animate` (`slideT` null).
- **`motion="reduced"` (prop-down) does NOT snap the slide** — `useSpring.respectReducedMotion` keys
  on the OS media query only, not the resolved `reduced` rung. So `motion="reduced"` gives a full
  spring slide; only OS PRM snaps it. This is **consistent with the existing center behavior**, not a
  regression. Recorded as inherited debt (a future unification could pass a reactive snap signal into
  `useSpringMount` when `resolved !== "full"` — not this wave).
- **`prefers-reduced-transparency` / `forced-colors`:** `placement.css:134–138` hides the graded-edge;
  motion is untouched (a slide under forced-colors is fine, and snaps under PRM). No new a11y surface.

## §Work — the manifest (exact files; supersedes research §7)

**Glass-ui source (the seam):**
- `src/composables/motion/spring/useSpringMount.ts` — `+ present = ref(open.value)`; set
  `present=true` in the open watch (before the drag guard); **new independent** settle branch
  `if (isSettled && target>=1 && !open) present=false`; `return present: readonly(present)`; add
  `present` to `SpringMountRef`. ~+12 lines. **No collision.**
- `src/components/dialog/DialogContent.vue` — `sideSpringActive` armed on **placement alone** (`off`
  handled inside, D2/D9); reuse existing `dialogRoot` (drop the re-inject); `useSpringMount({ open:
  dialogRoot.open, preset: springPreset ?? "smooth" })`; **`sheetSlideTransform` longhand helper (R1)**
  + placement-branched side `springStyle` (`translate` longhand + `transform/animation/transition:
  none`); `:force-mount = present||open` on **Portal + Content**; `:inert` while `!open`; focus-handoff
  watch (mirror Drawer); pass `:slide-t`/`:force-mount` to `<ModalOverlay>`; strip `slide-*` from
  `PLACEMENT_SLIDE` (keep `rounded-*`/`border-*`) and `transition ease-in-out sheet-animate` from
  `sideBaseClasses`; **bind `present`+`forceMount` on the CENTER path too (R2)**. **Collision: Q023**
  (graded-edge span, same file, different region).
- `src/components/dialog/ModalOverlay.vue` — `+ slideT?: number|null` + `forceMount?: boolean`; when
  `slideT!=null`: drop `sheet-animate`, `:style="{opacity: scrimOpacity(slideT)}"`, forward
  `forceMount` to `DialogOverlay`; else unchanged; gate opacity against `stage` per D5. `scrimOpacity`
  pure helper. **Collision: Q030** (the structure wave relocates this file + adds its test).
- **Untouched (retained):** `src/styles/utilities/btn.css` (`sheet-animate` for center scrim + `off`);
  `src/components/dialog/placement.css` (Q023's geometry + graded-edge).

**Focused tests** (ordinary vitest; jsdom; `matchMedia` mock where a synchronous PRM settle is needed;
new file at the post-relocation dialog test path — sequence with Q030, §Two-challenge). Each asserts a
**derivation/state outcome**, never "the guard returned early":
1. **`sheetSlideTransform(placement, p)`** — `("right",1)→"100% 0"`, `("left",1)→"-100% 0"`,
   `("bottom",1)→"0 100%"`, `("top",1)→"0 -100%"`, `(*,0)→"0 0"`; **assert it is NOT `translateX(...)`**
   (guards R1).
2. **`scrimOpacity(p)`** — `1→0`, `0→1`, `−0.02→1` (overshoot clamp), `1.02→0`.
3. **`useSpringMount` present state machine** (PRM synchronous settle, `await nextTick`): `open=true`→
   `present` true; `open→false`→`present` true until settled-dismissed→then false; a `false→true` flip
   **before** settle keeps `present` true throughout (re-open-mid-exit never unmounts). Assert the
   settle branch is independent of `pendingDismiss`.
4. **`useSpringMount.position` under PRM:** open→0, close→1 (one frame).
5. **`ModalOverlay` derivation:** `slideT` set → `sheet-animate` absent, opacity clamped, `forceMount`
   forwarded; `slideT=null` → `sheet-animate` present (center path intact).
6. **`DialogContent` arming gate:** `placement="center"`+no preset → no side spring, `glass-reveal`
   present; `placement="right"` → side spring, `translate` longhand present, `slide-*`/`sheet-animate`
   **absent** on the side surface, `forceMount` on Portal + Content; **center+preset → `present`/
   `forceMount` now bound (R2 regression)**.
7. **Preset routing:** `springPreset="snappy"` on a side sheet selects that register — the only literal
   reaching the spring is `springPreset()`'s row, no hand number.

**Native / browser debt** → rides the V8 sweep; recorded in §π/DELTA, **not** counted done this seat.

## §Acceptance

**Gate ruling (user, 2026-07-16 — binding): NO minted proof/gate script, no census tool, no CI line.**
Standing checks = the dev toolchain only. A one-time RED→GREEN differential inside the wave commit
replaces any permanent gate.

- **`vue-tsc`** — `present: Readonly<Ref<boolean>>` on `SpringMountRef`; `slideT`/`forceMount` typed on
  `ModalOverlay`; `sheetSlideTransform`/`scrimOpacity` typed. Green.
- **Focused `vitest`** — the seven units above. **BORN-RED at HEAD** (no `present` field, no
  `sheetSlideTransform`/`scrimOpacity`, no side spring — units 1/2/3/5/6/7 cannot pass), **GREEN** after
  the seam lands. The differential is quoted in the wave commit; nothing standing is minted.
- **`npm run build`** — the subpath-export policy rides the build (fail-closed); the dialog/spring
  `.d.ts` emit the additive `present` field. Green.
- Regression floor: `placement="center"` + no preset still routes `glass-reveal` (no side spring);
  `off` still instant; the existing center `springPreset` bloom entrance is byte-identical (the R2
  change touches only its **exit**).

## §π/DELTA — native-verification debt (rides the V8 visual-sweep phase; NO browser this seat)

The interruption trace, momentum, scrim/blur, focus, PRM, and the R2 center-exit are not
unit-provable. Recorded as debt on the V8 sweep (the born-RED-then-green witness = the V6 sheet-reverse
arm re-run), NOT counted done. DELTA filed at `docs/tranches/BI/audit/visual/W-SHEET-INTERRUPTIBLE-MOTION-DELTA.md`:

1. **FAIL-1 RED→GREEN:** reverse-mid-enter and re-open-mid-exit **positionally continuous from the
   current position** (no `tx=341→2` snap), all 4 placements, both schemes, 390 + 1440 CSS px — the
   direct RED→GREEN of FAIL-1.
2. **Early-interrupt bound:** interrupt the entrance at `p≈0.85` (high velocity) → the toward-open
   momentum excursion is bounded and reads liquid, **not** a mini-jump-to-open.
3. The ~5.8px reverse momentum reads as a settle; the ~5.8px anchored-edge entrance overshoot is
   imperceptible-as-a-gap (equal to the drawer's accepted gap — do **not** pre-emptively switch to
   `gentle`; a gap that truly offends is a sweep finding, not a design default). If briskness is
   wanted, `snappy` = a 12.1px gap — take only if the sweep rules 12px imperceptible.
4. Scrim opacity tracks the surface through an interrupt; **blur-fade** (opacity composites
   backdrop-filter) reads clean at the extremes; **stage-coupling stacking** on a `stage!=none` side
   sheet is acceptable (D5).
5. Focus returns to the trigger on interrupted close; Escape + scrim-click + Save/Cancel all
   interruptible; the Configurator right-sheet (fixed header/close + body scroll) composition intact.
6. PRM instant/in-place, no transform frames; `off` instant; `motion="reduced"`-prop keeps the full
   slide (consistent-with-center, D9).
7. **Center unification (R2):** the center `springPreset` dialog now spring-**exits** (scale/opacity
   over `smooth`) instead of vanishing — verify it reads correct (demo-only per census).
8. Graded-edge (Q023) rides the content `translate` and re-samples the backdrop each frame; no material
   regression during the slide.

- Chrome + Safari, both schemes. Parity-WebKit never answers a stable-Safari question.

## §Obligations

- **Consumer exposure: ZERO** (harden §5, read-only census). atlas's 9 `placement=` hits are all
  charts/viz — no glass-ui `DialogContent` Sheet. slides' only `DialogContent` (`DeckGate.vue:44`) is a
  center dialog with **no `placement`, no `springPreset`, no `motion`** — the default `glass-reveal`
  path, `springActive` false. sci-report / keyframes.js: none. **No consumer addendum needed.** The R2
  center unification changes only the demo (no consumer arms the center spring).
- **MIGRATION.md:** no public API change (no prop added/removed/renamed; `useSpringMount` gains one
  additive `present` return field). No `## 7.0.0` row is owed beyond the internal note that the side
  sheet's slide is now spring-driven (motion, not surface). If the close's MIGRATION true-up wants a
  motion line, it is additive-behavioral, not a break.
- A fresh `npm run build` before any dialog/spring `.d.ts` surface claim.

## §Dispositions

- The side-sheet spring convergence (D1–D6): **BUILD** — one `present` hold on the shared kernel +
  the longhand helper + the scrim scalar; deletes the keyframe-slide path.
- **Center unification (R2): BUILD** — `present`+`forceMount` on the center path; kills the dual exit;
  census-proven demo-only.
- `sheetSlideTransform` **longhand** (R1): **BUILD** — the `translateX()`-as-longhand bug fixed; the
  research draft's syntax painted nothing.
- `smooth` default (R3): **KEEP** — Dialog-family default, drawer-identical overshoot; `snappy` a
  documented gap trap; `gentle` fallback **STRUCK** (liquid-weight regression).
- Overshoot / do-not-clamp (R4): **KEEP** — the ~5.8px anchored-edge gap is the drawer's V6-PASSED
  accepted settle; research reason #3 struck from the C/D rejection.
- `sheet-animate` (`btn.css`) + `placement.css`: **UNTOUCHED** (center scrim + `off` retain the
  keyframe; Q023 owns the geometry).
- Consumer addenda: **NONE** (zero exposure).

## §Two-challenge gate note

Converged **two-consecutive-clean** under the triumvirate dispatch (PROCESS-CODEX §5): RESEARCH
(unknown grade → source root-cause of the keyframe snap, the reka-Presence constraint, the options
matrix, the drawer contrast) → HARDEN (suspicious grade → refute-default; attacked B as wrong).
HARDEN **ADOPTED B** on the load-bearing axis (the velocity-preserving re-target is the drawer's proven
kernel) and returned **five binding amendments**: **R1** caught a ship-blocking bug (the
`translateX()`-as-`translate`-longhand paints nothing — corrected to longhand pairs); **R2** took the
center unification (census-proven invisible; the dual-exit-path the no-legacy law forbids); **R3**
corrected the `smooth` rationale (patient-not-drawer-paced but drawer-identical overshoot; killed the
`gentle` fallback, flagged `snappy` as a 12px gap trap); **R4** struck the self-defeating overshoot-gap
argument from the C/D rejection; **R5** named the two **file-level collisions** the research "no
collision" framing hid — `DialogContent.vue` (Q023's graded-edge span) and `ModalOverlay.vue` (Q030's
relocation + new test) — and mandates **sequence, do not parallelize**: land one, rebase the other; the
new unit lands at Q030's post-move dialog test path. HARDEN **CONFIRMED** the mechanism (race audit
enumerated, the two guards named load-bearing; the scrim divergence ruled acceptable with the
`stage!=none` stacking gate; consumer census zero exposure). No third challenge is owed — the second
pass refuted, corrected, and confirmed with source-line evidence; the wave is clean. **Implementation
is a separate arm; this seat does not implement.**
