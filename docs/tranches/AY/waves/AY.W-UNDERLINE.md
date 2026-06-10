# AY.W-UNDERLINE — HandUnderline transposed UP: the first-class animated draw-on underline

**State:** OPEN · **Repo:** glass-ui · **Band:** A (component perfection — net-new, user-directed 2026-06-09)
**Provenance:** the user's round-2 refinement directive — "for the underline elements, look to
our developing project in the sci report repo — abstract this component into a first-class
glass-ui component from that research and development and have the underlines be animated in."
**Depends on:** none hard (the source R&D is shipped in sci-report; keyframes.js + value.js are
already glass-ui peers). Coordinates with W-PUB1 (the slides consumer re-point rides the next
publish) + L round-2 (slides adopt).
**Unblocks:** the slides underline unification (SlideIntro/SlideCloser drop their bespoke
s1-draw/cta-draw recipes — ×2 sites; SlideSovereignty is bare BY DESIGN, see §1) + the
sci-report re-point (its own tranche).
**Hardened:** 2026-06-09 hc2 spec-hardening (HC-underline-spec) — the ten build refinements
folded in; the recorded decisions live in §6 (DEC-1…DEC-10).

---

## §1 — The verified source (the R&D to transpose, file:line)

`sci-report/usf/web/src/platform/charts/HandUnderline.vue` (241 lines, mature, in production
across 4 mastheads) — the pen draw-on underline:

- **The mark:** an inline-SVG wavering cubic (`STROKE_D` + a faint GHOST overdraw `:82-83`) that
  DRAWS itself via `stroke-dashoffset: len → 0`. The wobble lives in authored control points —
  **FILTER-FREE** (no `feTurbulence`; the compositor-only invariant, `:9-14`).
- **Two clocks, one vocabulary (`:16-24`):** `clock="load"` — a keyframes.js `NumericAnimation`
  over the `--hu-off` scalar, exposed via `play(): Promise` so a load Sequence chains it;
  `clock="scroll"` — native `@keyframes` on the `view()` timeline (bidirectional, zero JS);
  `static` — rests drawn.
- **PRM — one fence (`:26-31`):** under reduce both clocks collapse to *set, not drawn*
  (`stroke-dashoffset: 0`, full emphasis, no draw). Information parity total.
- **Dark-aware stroke (`:208-210`):** the red lifts on dark (`--ncsu-red` → `--ncsu-red-bright`);
  an explicit `color` prop wins both grounds.
- **The variant continuum (`:33-39`):** `pen` is the only PROVEN render; pencil/crayon/boil are
  the API seam for future headroom, NOT shipped paths.

**The duplication this closes (the constellation.ts-class inversion, again — DEC-1):** the
slides deck hand-rolls the SAME draw-on idea **twice** — `s1-draw` (`SlideIntro.vue:130-131`)
and `cta-draw` (`SlideCloser.vue:127-128`) — as per-slide scoped CSS; sci-report ships the real
component. **NOT a third site:** `SlideSovereignty.vue:159-161` deliberately carries NO glyph
("the calm register; the draw-on glyphs belong to the cover + the closer") — the prior ×3 count
inherited from `r-slides-til-pen.md` §1, which documented an EARLIER deck revision
(Slide01/Slide10/SlideConclusion). Intelligence in the consumers, absent from the library.
≥2 real consumer repos (sci-report ×4 mastheads, slides ×2 sites = 6 sites) — the abstraction
bar still clears with margin; the L-side `no-bespoke-underline` grep (§5) targets **2** sites.

## §2 — Objective (root, not consumer)

Mint `<GlassUnderline>` (package `src/components/custom/underline/`, subpath
`@mkbabb/glass-ui/underline` — packaging ruling DEC-8, §6) as the faithful transposition of
HandUnderline:

1. **The component**, generalized off sci-report's local seams. The sci-report-local
   `useReducedMotion` import (`HandUnderline.vue:43,85`) → a module-local ONE-SHOT
   `prefersReducedMotion()` read, the `useCountup.ts:56-64` idiom (DEC-9 — every animation
   channel is already structurally fenced; no live listener needed). The default stroke
   re-anchors to glass-ui's token vocabulary (`var(--primary)` as the default, a `color` prop
   for the NCSU-red consumers — presets-in-consumers; the library default is its own identity).
   Keep: the two-clock API (`clock: "load" | "scroll" | "static"`), `play()/snap()` expose,
   the pen+ghost dual-path render, the filter-free invariant, the `variant` headroom seam,
   `drawMs`. **The dark arm DELETES rather than transposes (DEC-4):** the source's
   `:where(.dark)` NCSU lift (`HandUnderline.vue:208-210`) does NOT cross — `var(--primary)`
   re-resolves under `.dark` via the token cascade, so the transposed component carries NO
   `.dark` block; the NCSU lift becomes the sci-report consumer's `color` prop (itself a
   re-resolving token, `var(--ncsu-red)`); an explicit `color` wins both grounds via `v-bind`,
   exactly as the source.
2. **Stroke metrics are custom properties, not constants (DEC-3).** The source hardcodes
   stroke-width 2.4/3.4 (`HandUnderline.vue:193,202`) and the ink box (offset `-0.18em`,
   height `0.5em`, `:174-182`); the slides register is BOLDER (width 6, height `0.3em`,
   offsets `-0.16em`/`-0.14em` — `SlideIntro.vue:122-129`, `SlideCloser.vue:118-126`). The
   component reads **`--gu-stroke-width`** (default `2.4`), **`--gu-ink-height`** (default
   `0.5em`), **`--gu-ink-offset`** (default `-0.18em`); the ghost width DERIVES from the one
   knob (`calc(var(--gu-stroke-width) + 1)` — the source pair is a +1 user-unit delta) so the
   bolder slides register is a three-token consumer override, not a geometry fork (the
   token-first axis). Defaults byte-match the source (gate 4).
3. **The path geometry** stays authored-once (the wavering cubic + ghost). The `paths` escape
   prop carries the FULL geometry tuple (DEC-7) —
   `{ stroke: string; ghost?: string; viewBox?: string; len?: number }` — because a bare
   `d`-string escape silently breaks the dash model when the consumer geometry's
   viewBox/length differ (slides run `0 0 100 12` + dasharray 260/340 vs the canonical
   `0 0 100 10` + `HU_LEN` 120; `SlideIntro.vue:57,128`). **The slides re-point does NOT use
   the escape:** SlideIntro/SlideCloser ADOPT the canonical geometry + ghost (an upgrade —
   they currently ship single-path, no "hand never lays one clean line" overdraw); their
   bolder register comes from the §2.2 tokens. NO third fork.
4. **The scroll clock's timeline name** becomes a prop (`timeline?: string`, default the
   element's own `view()`), implemented via custom-property indirection (DEC-5):
   `animation-timeline: var(--gu-timeline, view())`, the prop binding `--gu-timeline` as an
   inline style. The source's structural fences transpose AS-IS — the outer
   `@media (prefers-reduced-motion: no-preference)` + the inner
   `@supports ((animation-timeline: view()) and (animation-range: entry))`
   (`HandUnderline.vue:219-240`). sci-report binds `--beat-tl`, slides bind their own; the
   library hardcodes no consumer timeline. The `var()`-indirection quirk surface is covered
   by the gate-1 π readback, not by speculation.
5. **The third clock shape — a declarative `active?: boolean` prop (DEC-2).** The slides twins
   run an attribute-gated CSS clock (`[data-state="active"] … animation … forwards`,
   `SlideIntro.vue:130`, `SlideCloser.vue:127`) — neither `load`-via-`play()` nor `scroll`.
   The component absorbs it as a thin declarative overlay ON the load clock: `undefined`
   (default) = source parity (seeds undrawn, the parent fires `play()` imperatively —
   sci-report's `Sequence` chaining unchanged); bound: rising edge → `play()` (replay from
   undrawn; under PRM → `snap()`, set-not-drawn), falling edge → reset to undrawn so
   re-activation REPLAYS (parity with the slides' CSS semantics — removing
   `[data-state="active"]` drops the animation rule and the dashoffset reverts), mount with
   `active: true` → plays. Only meaningful with `clock="load"` (the other clocks rest drawn —
   binding there is a no-op). Delay stays consumer-owned (slides flip `active` on their own
   reveal beat — the existing 0.7 s lives in their sequencing, per the `play()`-chaining
   doctrine; NO `delayMs` prop).
6. **The load-clock easing** defaults to `easeOutCubic` (the source, `HandUnderline.vue:117-120`)
   — doctrine-compliant (DEC-6, §6): ink is an irreversible additive reveal; an overshooting
   spring would lay ink past the end then retract it, the same "never overshoot past gone"
   logic the AX.W52 §6 easing doctrine applies to exits. An `easing?: TimingFunction` prop (the
   value.js type — already a peer) serves the slides' `--ease-out-expo` register so the
   re-point is no-regression.
7. **api/ types + README** (use-cases: masthead pick-out, CTA ring, figure-item emphasis; the
   two-clock model + the `active` overlay; the PRM contract; the filter-free invariant; the
   `--gu-*` token table; the DEC-8 `/underline`-vs-`/handmark` ruling).
8. **Demo story** (`demo/stories/primitives/underline.vue` or per the storybook IA): load-clock
   (imperative `play()` + `active`-bound) + scroll-clock + static, light/dark, PRM toggle,
   a `--gu-*` bold-register override row.
9. **Consumers:** slides' TWO sites re-point on the next publish (an L round-2 edit — the
   bespoke s1-draw/cta-draw recipes DELETE; both adopt canonical geometry + ghost + the token
   register + `:active`); sci-report re-points in its own tranche (recorded, not forced
   cross-repo here).

## §3 — Edit-sites

- `src/components/custom/underline/GlassUnderline.vue` (NEW — the transposed component)
- `src/components/custom/underline/index.ts` (NEW — package barrel)
- `src/subpaths/underline.ts` (NEW — the one-line mirror barrel; batch-resolved by vite)
- `package.json` exports + typesVersions (the `/underline` subpath; SHARED — orchestrator-integrated)
- `src/api/index.ts` (the `GlassUnderlineProps`/clock/variant types)
- `README` at the package + the demo story
- `tests/components/custom/underline/` (unit: clock seeding, play() resolves, PRM snap,
  prop-color wins both grounds, `active` edge semantics — rising plays / falling resets to
  undrawn / mount-active plays / PRM rising snaps, the `paths` tuple re-derives the dash model,
  NO `.dark` block in the package source — DEC-4 witness) + a π spec (the draw animates:
  dashoffset readback sweeps len→0 on play(); PRM holds 0; the `--gu-*` override retunes
  stroke-width/ink box live)

## §4 — HARD GATE

1. **DRAW-ANIMATES π readback (born-RED — the component does not exist):** mount the demo story,
   fire `play()`, sample `stroke-dashoffset` per frame — asserts a monotonic sweep len→0 over
   ~drawMs (the underline ANIMATES IN, the user's verbatim requirement); under PRM emulation the
   offset is 0 on first paint and never animates. The same readback exercises the `active`
   overlay (DEC-2): rising edge sweeps, falling edge resets to undrawn, re-rise replays.
2. **FILTER-FREE invariant:** a source-witness — no `filter:`/`feTurbulence` anywhere in the
   package (the Δ4 invariant transposed).
3. **Export surface:** `verify-export-types` resolves `/underline` with the dts; the api types
   ship.
4. **Consumer-fidelity canary:** the transposed render is geometry-identical to the sci-report
   source for the canonical path (same STROKE_D/GHOST_D, same dasharray model — the fixed
   over-long `HU_LEN` 120 is KEPT per DEC-10 and this gate locks it) — a unit byte-compare of
   the path constants against a recorded fixture, so the transposition is faithful, not a
   re-invention.
5. **DELTA:** captured light+dark of the demo story (rest → mid-draw → drawn frames) registered
   per the cardinal protocol; `proof:live-verified-ledger:ay` green on the W-UNDERLINE row.

## §5 — Scope fence

- NOT shipped here: the pencil/crayon/boil renders (the variant prop is headroom, exactly as the
  source documents); the sci-report repo re-point (its tranche); the slides re-point (L round-2,
  after publish).
- NOT shipped here: the handmark FAMILY (`/handmark`, the pencil-boil peer, circle/strike/
  highlight, the boil clock) — per the DEC-8 ruling (§6) it lands, if ever, in its own wave
  AFTER the atlas S1 production proof, and arrives to the recorded fold-forward relationship.
- NOT shipped here: a shared `usePrefersReducedMotion` leaf. The wave uses the module-local
  one-shot (DEC-9); the leaf convergence over the existing duplication
  (`useRAFLoop.ts:108,234-247` per-instance listener + `useCountup.ts:56-64` one-shot + this
  read) is a motion-cohesion move routed to the W-COHERE/W-MOTION2 territory as a disposition
  row — not BOOK prose, not smuggled into a net-new component wave.
- No `delayMs` prop — delay stays consumer-owned (the `play()`-chaining / `active`-flip
  doctrine, §2.5).
- The slides' bespoke deletion is the L-side gate (`no-bespoke-underline` grep — **2** sites,
  per DEC-1), not this wave's.
- No new animation engine — the load clock rides keyframes.js `NumericAnimation` exactly as the
  source does (one orchestration seam; the `active` prop is a thin watch OVER `play()/snap()`,
  not a third animation path).

## §6 — Recorded decisions (hc2 spec-hardening, 2026-06-09)

The ten build refinements from the research-necessity audit
(`docs/tranches/AY/audit/research-necessity/underline.md` + `NECESSITY-MATRIX.md §2
W-UNDERLINE`), each DECIDED here so the build agent arrives to rulings, not options. All facts
re-verified against the live sources this date.

- **DEC-1 — consumer count is ×2, not ×3.** `SlideSovereignty.vue:159-161` is bare BY DESIGN
  ("the calm register"). Recorded in §1; the L-side grep targets 2 sites. Abstraction bar:
  sci-report ×4 mastheads + slides ×2 = 6 sites, 2 repos — clears with margin.
- **DEC-2 — third clock = the declarative `active?: boolean` prop** (over bare
  play()-on-slide-activation). WHY: (i) the imperative path makes each consumer hold a template
  ref + watcher — re-creating in the consumer the exact bespoke glue this wave exists to delete,
  ×2 slides sites today and every future activation-gated host; (ii) `:active` is the Vue-grammar
  transposition of the slides' existing `[data-state="active"]` CSS gate, so the adopt diff is a
  template binding; (iii) it generalizes to any activation-gated host (deck slides, tab panels,
  carousel slides) with no per-host API; (iv) it stays a thin watch over the EXISTING
  `play()/snap()` seam — the scope-fence's "one orchestration seam" holds; (v) ≥2 sites at adopt.
  Full edge contract in §2.5.
- **DEC-3 — stroke metrics tokenized**: `--gu-stroke-width` / `--gu-ink-height` /
  `--gu-ink-offset`, ghost derived (`+1` user-unit). The slides' bolder register becomes a token
  override, not a fork. §2.2.
- **DEC-4 — the dark arm DELETES.** No `:where(.dark)` block crosses; `var(--primary)`
  re-resolves under `.dark` by cascade; the NCSU lift is the sci-report consumer's `color` prop.
  Witnessed by a unit test (§3). §2.1.
- **DEC-5 — timeline prop via `animation-timeline: var(--gu-timeline, view())`**, the source's
  `@media`/`@supports` fences transposed as-is; gate-1 π readback owns the quirk surface. §2.4.
- **DEC-6 — easeOutCubic default stands, doctrine-noted.** The AX.W52 §6 easing doctrine's
  spring-enter register is for transform pops; an ink draw is an irreversible additive reveal — overshoot
  would lay ink then retract it (the "never overshoot past gone" logic). Decelerating
  no-overshoot bezier is the doctrine fit; `easing?: TimingFunction` prop serves the slides'
  expo register. §2.6.
- **DEC-7 — the `paths` escape carries the full geometry tuple**
  (`{ stroke, ghost?, viewBox?, len? }`) so an escaped geometry stays dash-coherent; AND the
  slides re-point does NOT use it — they adopt canonical + ghost (no third fork). §2.3.
- **DEC-8 — packaging: `/underline` mints NOW; the handmark family reconciles AT its landing.**
  The sci-report plan (`sci-report/usf/docs/tranches/C/handmark/glassui-upstream.md` §0-1, §5)
  stages `custom/handmark/` + `/handmark` (`HandMark` + `useHandMark` + presets, pencil-boil as
  optional PEER) — but S1 lands atlas-LOCAL first, S2 (the glass-ui abstraction) is explicitly
  downstream of atlas production proof + a pencil-boil 0.4.0 publish, on another tranche's
  clock; and the two components differ in implementation model (authored-path, keyframes-only,
  ZERO new peers here vs pencil-boil-generated geometry + boil there). RULING: (a) this wave
  mints `custom/underline/` + `/underline`, named for the SHIPPED surface (6 proven sites) —
  naming a one-component package for unshipped family headroom would be speculative substrate
  (visual-load-bearing-ness: circle/strike/highlight have ZERO glass-ui consumers today);
  (b) when/if the family lands, the S2 reconcile picks ONE of two sanctioned outcomes, recorded
  now: `GlassUnderline` FOLDS INTO the family as its pen-underline render and `/underline`
  RETIRES in the same publish (clean break per no-backwards-compat — one-rename re-point, no
  alias), OR the family lands as a sibling `/handmark` CONSUMING GlassUnderline's pen render
  (only if both surfaces independently clear the consumer bar); (c) FORBIDDEN either way: a
  second parallel underline implementation under `/handmark` (the H5 "one idea, N loci" defect
  both repos' docs indict); (d) the final component NAME (`GlassUnderline` vs the plan's
  `HandMark`) is owned by that reconcile — until then `GlassUnderline` is canonical in glass-ui.
  The package README records this ruling so the sci-report tranche arrives to it (§2.7).
- **DEC-9 — PRM seam = the module-local ONE-SHOT read** (the `useCountup.ts:56-64` idiom), not
  an extracted leaf in this wave. WHY: every animation channel is ALREADY structurally fenced —
  the scroll clock by the outer CSS `@media` (instant under a live flip), the load clock by the
  engine's `respectReducedMotion: true`; the read serves only the initial `off` seeding
  (`HandUnderline.vue:100`) + the `data-gu-clock` attr honesty, neither of which needs a live
  listener for information parity, and gate 1's PRM-emulation arm is fully satisfiable by it.
  The shared-leaf extraction (≥2-sites bar already met by `useRAFLoop` + `useCountup`) is
  routed OUT as a motion-cohesion disposition row (§5). KNOWN nuance, recorded: a mid-session
  PRM flip leaves the data attr one read stale (cosmetic — the CSS fence and the engine flag
  govern the actual motion).
- **DEC-10 — KEEP the fixed over-long dasharray (`HU_LEN` 120)**; no `getTotalLength()`. The
  time-domain math, recorded so the tail is a known property: with path length ≈100 the draw is
  visually complete at offset ≤ 20, which under easeOutCubic (`offset(t) = 120·(1−t)³`) lands
  at t ≈ 0.45 of `drawMs` — the trailing ~55% of the clock animates invisible offset and reads
  as the held settle beat the four mastheads already ship (production-proven rhythm; `play()`
  resolves at full `drawMs`). WHY NOT measure: (i) STROKE_D and GHOST_D have different true
  lengths — per-path exactness forks the SINGLE shared `--hu-off`/`--hu-len` scalar pair the
  dual-path render rides; (ii) `getTotalLength()` is a mount-time layout read with an SSR
  hazard; (iii) gate 4 byte-locks the dasharray model to the source. The named exactness
  escape, recorded NOT shipped (zero consumers need it): `pathLength` attribute normalization
  on both paths, which would keep the single scalar — only if a future consumer needs
  `play()`-resolution ≈ visual completion.
