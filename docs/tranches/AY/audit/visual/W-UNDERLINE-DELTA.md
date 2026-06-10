# AY.W-UNDERLINE — DELTA (the GlassUnderline draw-on, own-surface live capture)

**Wave:** AY.W-UNDERLINE — `GlassUnderline`, the sci-report HandUnderline pen draw-on transposed UP
as a first-class `/underline` component.
**Route captured:** `/motion/underline` (the net-new demo story this wave ships).
**Viewports:** mobile390 (390×844) + desktop1280 (1280×800), each × {light, dark} (the cardinal floor).
**Verdict:** PASS — the underline ANIMATES IN (the load clock sweeps `stroke-dashoffset` len→0,
monotonic, no retract); the rest→mid-draw→drawn frames show the pen laying ink under the word; the
dark arm re-resolves via the token cascade (no `.dark` block — DEC-4); filter-free.

## Own-surface screenshots (rest → mid-draw → drawn — the draw animates in)

- `W-UNDERLINE-rest-desktop1280-light.png`
- `W-UNDERLINE-rest-desktop1280-dark.png`
- `W-UNDERLINE-rest-mobile390-light.png`
- `W-UNDERLINE-rest-mobile390-dark.png`
- `W-UNDERLINE-mid-draw-desktop1280-light.png`
- `W-UNDERLINE-mid-draw-desktop1280-dark.png`
- `W-UNDERLINE-mid-draw-mobile390-light.png`
- `W-UNDERLINE-mid-draw-mobile390-dark.png`
- `W-UNDERLINE-drawn-desktop1280-light.png`
- `W-UNDERLINE-drawn-desktop1280-dark.png`
- `W-UNDERLINE-drawn-mobile390-light.png`
- `W-UNDERLINE-drawn-mobile390-dark.png`

The rest frame shows "The future is here" with NO underline (the load clock seeds undrawn); the
mid-draw frame (~250ms into the 700ms sweep) shows the wavering pen stroke + the faint ghost overdraw
laid under "future" (the "hand never lays one clean line" read, filter-free); the drawn frame shows
the settled stroke. The dark frames re-resolve the `--primary` ink light-on-dark via the token
cascade — NO `.dark` block in the package source (DEC-4 witness, unit-locked).

## The DRAW-ANIMATES π readback (gate 1 — the user's verbatim requirement)

`tests-visual/underline-draw-animates.spec.ts` (3/3 pass) — the binding live proof:

- **`play()` sweeps `stroke-dashoffset` len→0 monotonically** — sampled per rAF frame over ~80
  frames: a monotonic non-increasing sweep (max frame-to-frame rise ≤ 0.5px — no retract, the
  easeOutCubic additive-reveal register, DEC-6), reaching ≤1px (fully drawn) by the end, traversing
  ≥5 distinct values (a multi-frame sweep, not a 1-frame snap). Live rAF sample of the imperative
  draw: 120 → 7.95 (400ms) → 0 (1000ms).
- **The `active` overlay (DEC-2)**: rising edge sweeps to drawn, falling edge resets to undrawn
  (offset back to len so a re-rise REPLAYS), live-verified.
- **PRM emulation**: the offset is ≤1 (drawn) on first paint and never animates — set-not-drawn,
  information parity.

## The unit suite (22/22)

`tests/components/custom/underline/`:
- `GlassUnderline.test.ts` (17) — clock seeding (load=undrawn, static/scroll=drawn, PRM=drawn),
  `play()` resolves + lands at 0, PRM `play()` snaps, the `active` rising/falling/mount-active/PRM
  edges, the `color` prop rides the SAME v-bind seam (wins both grounds — DEC-4), the NO-`.dark`-block
  witness, the FILTER-FREE invariant (prose-stripped — no real `filter:`/`<feTurbulence>`), the
  `paths` tuple re-derives the dash model (viewBox + len).
- `consumer-fidelity.test.ts` (5 — gate 4 CONSUMER-FIDELITY) — `GU_LEN`=120, `STROKE_D`, `GHOST_D`,
  the viewBox, and the dasharray model byte-locked to the sci-report HandUnderline.vue:78-83 source
  (verified geometry-identical against the live source this date).

## The component (the transposition)

- `src/components/custom/underline/GlassUnderline.vue` — the transposed component: the two-clock API
  (`load`/`scroll`/`static`) + the `active` declarative overlay (DEC-2) + `play()`/`snap()` expose +
  the pen+ghost dual-path filter-free render + the `variant` headroom seam + `drawMs` + `easing`.
- `src/components/custom/underline/types.ts` — the public types (`GlassUnderlineProps`, the clock/
  variant unions, the `paths` tuple, the expose handle).
- `src/components/custom/underline/index.ts` — the package barrel.
- `src/subpaths/underline.ts` — the one-line mirror (batch-resolved by vite; `dist/underline.js`
  3217B + `dist/underline.d.ts` emit on `npm run build`).
- `src/api/index.ts` — the `/underline` api types (the discovery layer).
- `src/components/custom/underline/README.md` — use-cases, the two-clock + `active` model, the PRM
  contract, the filter-free invariant, the `--gu-*` token table, the DEC-8 `/underline`-vs-`/handmark`
  ruling.
- `demo/stories/motion/underline.vue` + the manifest row — the demo story (load imperative + active +
  scroll + static + the `--gu-*` bold register + a color preset).

## The DEC rulings honoured (all ten)

DEC-1 (the slides ×2 count is the L-side concern, not this wave); DEC-2 (the `active` overlay — built,
edge-tested); DEC-3 (the `--gu-stroke-width`/`--gu-ink-height`/`--gu-ink-offset` tokens, ghost derives
`+1`); DEC-4 (the dark arm DELETES — no `.dark` block, unit-witnessed); DEC-5 (the timeline prop via
`animation-timeline: var(--gu-timeline, view())`, the `@media`/`@supports` fences transposed as-is);
DEC-6 (`easeOutCubic` default + `easing?` prop); DEC-7 (the `paths` full-geometry tuple); DEC-8 (the
`/underline`-mints-now ruling recorded in the README); DEC-9 (the module-local one-shot
`prefersReducedMotion()` read, not a leaf); DEC-10 (the fixed over-long `GU_LEN` 120 KEPT, byte-locked
by gate 4).

## Gates green

- DRAW-ANIMATES π readback (gate 1): 3/3 — the monotonic len→0 sweep + the `active` overlay + the PRM
  hold, live on `/motion/underline`.
- FILTER-FREE (gate 2): the prose-stripped source carries no real `filter:`/`<feTurbulence>` (unit).
- CONSUMER-FIDELITY (gate 4): the canonical geometry byte-locked to the source (5/5 unit).
- Export surface (gate 3): `dist/underline.js` + `dist/underline.d.ts` emit on build; the api types
  ship. The package.json `/underline` exports + typesVersions entry is a SHARED-file delta (reported,
  orchestrator-integrated); once registered, `verify-export-types` probes the emitted dts.
- `vue-tsc --noEmit` exit 0; the full library build green (60 subpath .d.ts flattened, incl. underline).
