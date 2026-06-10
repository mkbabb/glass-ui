# AZ.W-ADAPTIVE-AUTO — fix the dock self-engage no-op, ship the sampled-luminance observer, sweep ALL glass views for readability with π contrast as the binding truth

- **Tranche:** AZ (glass-ui)
- **Track:** Band R — the register
- **Type:** impl (CSS self-engage fix + a JS observer composable + AA-floor recalibration + π readability sweep)
- **Depends on:** W-GATES (Batch 0 — `proof:all` runnable). Runs Batch 1, parallel with W-DOCK-RAIL ‖ W-DOCK-FLICKER ‖ W-REGISTER-IOS (the S1 quartet).
- **Blocks:** nothing hard. Coordinates with W-REGISTER-IOS (shared `.glass-dock` surface, DISJOINT axis — this wave owns `--glass-tint-source`/`--glass-tint-strength`, W-REGISTER-IOS owns the selected-accent register) and W-BLOB-STUDIO / aurora studio (the dock-over-live-aurora case the sampled observer's Move-2 refines).
- **Status:** SPEC

---

## §0 RE-GROUND (mandatory step-0 before any edit)

This wave starts from C5-adaptive-legibility (C5-2 through C5-10), B3-1 + B3-2, E3G-4, and the
live-reproduced F2 finding — NOT a fresh diagnosis. The W55 `--glass-backdrop` bucket WORKS; the
dock's WIRING of it cannot (a self-engage NO-OP). RE-GREP every cite at HEAD before editing:

1. `grep -n 'glass-backdrop' src/styles/dock/shell.css` — confirm the dock self-DECLARES
   `--glass-backdrop: light` on its OWN root (shell.css:73) and the misleading comment
   (shell.css:67-73) claiming "the SELF-engage rule in dock/morph.css darkens the dock's OWN plate
   unconditionally" — that rule DOES NOT EXIST (it is the ancestor-querying `@container` block).
2. `grep -n ':where(.glass-dock)' src/styles/dock/*.css` — MUST return EMPTY (confirms C5-3: there
   is no `.glass-dock` self-engage rule; only the ancestor-only `@container` block at
   `morph.css:295-301` exists, which can never self-match).
3. `grep -n ':where(.glass-floating, .glass-overlay)' src/styles/glass/ladder.css` — confirm the
   genuine self-engage precedent the dock + content tiers MIRROR (`ladder.css:169-172`).
4. `grep -n 'glass-backdrop-luma\|glass-tint-strength-aa' src/styles/tokens/glass.css` — confirm
   `--glass-backdrop-luma:` is minted EMPTY (`:248`) with ZERO cascade consumers + NO JS setter
   (the reserved hook), and `--glass-tint-strength-aa: 18%` (`:250`) is the AA floor.
5. `grep -rln 'glass-backdrop' src/composables/ src/components/` — MUST return EMPTY (confirms no
   JS observer ships today — B3-1/E3G-4).
6. Confirm the gate blind spot: `scripts/proof-adaptive-glass.mjs:153-157` STRUCTURE-parses the
   `@container` block's presence (never asserts it FIRES), and `tests-visual/adaptive-glass.spec.ts:193`
   INJECTS `--glass-backdrop` on a synthetic ANCESTOR (so the dock query matches IN TEST but never
   in-situ) — the exact "green gate over a still-broken render" the gate header (`:11-14`) warns
   against (C5-4).

If any cite has moved, the scope-reveal trigger fires — re-derive the edit-site table.

---

## Goal criterion

The glass-first MAXIMAL default register (W54) is LEGIBLE over light/bright content with ZERO
consumer opt-in: the dock AND the plain content-glass tiers self-darken over light backdrops the
way the overlay band already does, and a sampled-luminance JS observer DERIVES the bright signal
for the animated-backdrop case (dock over a live aurora) where a static `light`/`dark` bucket is
too coarse. The dock-over-light G2 collapse the user named (R3-7, "darken DYNAMICALLY like iOS 27
so we can actually see these elements") is closed: every audited glass view clears WCAG 4.5:1 body
contrast against the worst-case backdrop, measured by a π readback that reads the surfaces IN-SITU
(no injected ancestor bucket), so the C5-4 gate blind spot cannot recur.

## Completion criterion

The born-RED gate `proof:adaptive-glass-live` (G1) flips GREEN over the IN-SITU dock + content
tiers, the observer composable lands with its π-proven write, and the wave closes on a captured
DELTA (`proof:live-verified-ledger`). Specifically:

1. `npm run proof:adaptive-glass-live` (born-RED, NEW — the in-situ arm) — the π readback walks the
   dock routes (`/dock/overview`, `/dock/layers`, `/dock/rail`, `/compositions/settings`,
   `/foundations/colors`, `/data/metric-cell`) + the content-glass routes (`/display/card`,
   `/foundations/paper-glass`, `/substrates/glass-material`) WITHOUT injecting any ancestor bucket,
   and asserts every glass surface over a light page clears 4.5:1 body (the `--muted-foreground`
   tier, not just `--foreground`) AND the surface silhouette ΔL clears a visibility threshold
   (the plate is distinguishable from the page behind, the G2 surface-silhouette truth — C5-6's
   ΔL≈0.01 collapse is the RED baseline).
2. `npm run proof:adaptive-observer` (NEW) — asserts the `useGlassBackdropLuminance` composable
   exists, writes a numeric `--glass-backdrop-luma` (0..1) AND the discrete `--glass-backdrop:
   light|dark` bucket on its target, is rAF-throttled (≤4Hz) + IntersectionObserver-gated, and has
   ≥2 consumers (the dock + a content-glass demo mount) OR is demo-private with the booked
   2nd-consumer trigger — the no-overfitting bar.
3. `vue-tsc --noEmit` + `npm run build` green; `proof:adaptive-glass` (the existing STRUCTURE arm,
   re-pointed to also assert the new self-engage rule's presence) stays green; `proof:glass-cohesion`
   green (the self-darken is a tint re-point, not a solid surface — no cohesion regression).

The π in-situ readback (G1) is the BINDING 4.5:1 truth; the source/structure gates ratify shape only.

---

## H3 fork — the automatic luma observer default (the spec arm + the recorded alternative)

R3-7 names the iOS-27 "just works" dynamic darkening. H3 in `AZ.md` recommends arm (a). Both arms
specced; the orchestrator confirms at Batch 1.

### Arm (a) — SPEC ARM (recommended): observer DEFAULT-ON for the dock family

`useGlassBackdropLuminance` is wired ON by default for the dock (the surface the user reported, and
the one most often over a live/bright backdrop): a downsampled element-under sample, rAF-throttled
≤4Hz, IntersectionObserver-gated, writing `--glass-backdrop-luma` + deriving the `--glass-backdrop`
bucket on the dock root. The declarative bucket + the unconditional self-engage rule (Move 1) STAY
the floor + the override — the observer REFINES, never replaces. This is the iOS-27 behavior the
user named; a dark-substrate consumer opts out via a prop / `--glass-tint-strength: 0%`.

### Arm (b) — RECORDED ALTERNATIVE: observer OPT-IN (a prop)

The observer ships but is OFF by default — a consumer opts a surface in via `data-glass-sample="live"`
or a `:auto-luma` prop. Rejected as the spec arm because R3-7 names the AUTOMATIC ("just works")
behavior, and the dock-over-light case is the live default the user sees broken — an opt-in leaves
the default register broken until a consumer remembers the prop. Recorded: opt-in is the SAFER perf
profile if the default-on sample budget (C5-9: <2ms/settle, zero steady-state) cannot be held on
the dock-over-live-aurora case under the G-PERF measurement; the orchestrator falls to arm (b) only
if the default-on sample blows the frame budget on the animated-backdrop case.

---

## Three arms of the work (all three land under arm (a); arm (b) drops only the default-on flag)

### Arm 1 — the MECHANISM FIX (the C5-2/C5-3 self-engage no-op; cheap, ships now, no JS)

The single elegant gestalt move (C5-10 Move 1): add an UNCONDITIONAL self-engage `:where()` default
to the over-light-COMMON surfaces — the dock (`.glass-dock`) AND the plain content tiers
(`.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash`) — mirroring the overlay band's
`ladder.css:169-172`, so the library's glass-first MAXIMAL default (W54) is legible over light
WITHOUT consumer opt-in. The dock rule lives in a dock partial (`dock/shell.css` or `dock/morph.css`,
NOT the ancestor-only `@container` block — a `:where(.glass-dock)` self-engage rule); the content
tiers' rule extends `ladder.css`. Over a dark page the darken is sub-perceptual; a dark-substrate
consumer opts out via `--glass-tint-strength: 0%`. FIX the factually-wrong `shell.css:67-73` comment
(C5-3) to describe the real self-engage rule. RECALIBRATE `--glass-tint-strength-aa` (C5-5) so the
MUTED-ink tier (`--muted-foreground`, the common body register — 3.42:1 over the 18% floor today)
clears 4.5:1, not just `--foreground` (11:1) — bounded ≤24% (the iOS clamp, "let content through").

### Arm 2 — the SAMPLED OBSERVER (the C5-8/C5-9 reserved facility; the iOS-27 dynamic refinement)

`useGlassBackdropLuminance(targetEl)` — a composable that (1) snapshots the region behind the
element WITHOUT reading backdrop-filter output (impossible — no web API): for the common static-page
case via an `elementsFromPoint` stack-walk composite of the painted background layer, and for the
animated WebGL/Canvas backdrop case via a downsampled (16×16/32×32) offscreen-canvas `drawImage` +
`getImageData` of the known background-layer canvas; (2) computes WCAG relative luminance; (3) writes
`--glass-backdrop-luma` (0..1) + derives `--glass-backdrop: light|dark` (threshold ~0.6) on the host;
(4) rAF-THROTTLED ≤4Hz (250ms) on scroll/resize-settle + IntersectionObserver-gated (visible
surfaces only) + IDLE between — the offscreen-pause precedent (`useWebGLCanvas`). It COMPOSES the
existing substrates: `useResizeObserver` + `useIntersectionPause` + `useRAFLoop` + `useResolveTokenColor`.
The declarative bucket + Arm-1 self-engage stay the FLOOR (progressive enhancement over them, the
`contrast-color()` doctrine). The static surface samples ONCE on mount + layout-settle; the animated
case (gated behind `data-glass-sample="live"`) periodically re-samples. The `--glass-backdrop-luma`
empty mint (glass.css:248) becomes its first real consumer — the named spec delta (B3-1/E3G-4).

### Arm 3 — the ALL-GLASS-VIEWS READABILITY SWEEP (the binding π gate)

The audited matrix (C5-6/C5-7, 12 routes π-readback): the dock, the plain content-glass tiers, the
overlay band, the aurora-tinted cards. Every glass view that paints body text over a potentially-light
backdrop is enrolled in the `proof:adaptive-glass-live` π readback. The WORST offenders enumerated:
`/display/card` inner wash 1.61:1, `/foundations/paper-glass` muted-ink 3.42:1, `/substrates/glass-material`
1.64:1, the dock plate ΔL≈0.01 silhouette collapse. The sweep is NOT a per-page hand-tune; it is the
Arm-1 self-engage default + the Arm-2 observer REFINEMENT proven to clear 4.5:1 IN-SITU on every
enrolled route. The 1:1 swatch/label artefacts (ink==bg decorative tone swatches, C5-6) are
discounted by the readback's text-walker. The G2 surface-silhouette truth (ΔL) is asserted ALONGSIDE
the text-contrast truth — R3-7 is primarily a silhouette failure (the plate vanishes), not a text
failure on the dock glyph (4.83:1 today).

---

## The defect (file:line-grounded — RE-GREP at HEAD per §0)

| id | surface | mechanism | evidence (file:line at digest time) |
|---|---|---|---|
| C5-2 (S1) | dock over light | The dock sets `--glass-backdrop: light` on its OWN root but CSS style queries never self-match; NO `.glass-dock` self-engage rule. The only re-point is the ancestor-querying `@container` block — never fires in-situ. LIVE-PROVEN: 6 routes, tint=0%, plate L=0.88 over page L=0.89 (ΔL≈0.01). | `src/styles/dock/shell.css:73` + `:99-111`; `src/styles/dock/morph.css:295-301`; `ground/C5-dock-probe.json`, `C5-asymmetry.json`, `C5-dock-over-light-overview.png` |
| C5-3 (S1) | shell.css comment | FACTUALLY WRONG + self-contradicts morph.css: claims a self-engage rule that does not exist; grep `:where(.glass-dock)` = no match. | `src/styles/dock/shell.css:67-73` vs `src/styles/dock/morph.css:279-301` (the genuine pattern: `ladder.css:169-172`) |
| F2-R3-7 | live repro | The dock-over-light defect re-confirmed live on HEAD by the F2 verify lane. | `ground/C5-dock-probe.json` (the in-situ tint=0% readback) |
| C5-4 (gate blind spot) | gate + π | `proof:adaptive-glass` STRUCTURE-parses the block (never asserts it fires); the π arm INJECTS the bucket on a synthetic ancestor; G1 covers only floating/overlay, not the dock — the dock's default has NO live coverage. | `scripts/proof-adaptive-glass.mjs:11-14,153-157`; `tests-visual/adaptive-glass.spec.ts:193,367-431` |
| C5-5 (S2) | AA floor | The 18% `--glass-tint-strength-aa` floor is under-calibrated for the muted-ink tier: `--muted-foreground` over the engaged plate = 3.42:1, FAILING 4.5:1. | `ground/C5-readback.json`; `src/styles/tokens/glass.css:250` |
| C5-7 (S2) | content tiers | `.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash` have NEITHER self-engage NOR an ancestor bucket — paint near-invisible over light on every route. Same root gap as the dock. | `ground/C5-asymmetry.json`; `src/styles/glass/ladder.css:169` |
| B3-1 / E3G-4 (S1) | observer | The iOS-27 DYNAMIC sampled-luminance observer was NOT shipped by W55 + ships nowhere today. `--glass-backdrop-luma` minted EMPTY, zero consumers, no JS setter. The named spec delta. | `src/styles/tokens/glass.css:226-227,248`; grep `glass-backdrop` in `src/composables/`+`src/components/` = EMPTY |

---

## Scope (numbered — arm (a))

1. Add a `:where(.glass-dock) { --glass-tint-source: var(--glass-tint-ink); --glass-tint-strength:
   var(--glass-tint-strength-aa); --dock-fg-on-aurora: var(--glass-tint-ink); }` unconditional
   self-engage rule to a dock partial (the ONE reconciled path — the `--dock-fg-on-aurora`
   foreground twin folds in, matching the morph.css `@container` block's reach), mirroring
   `ladder.css:169-172`.
2. Add the analogous `:where(.glass-card, .glass-resting, .glass-quiet, .glass-wash)` self-engage
   default to `src/styles/glass/ladder.css` (the over-light-common content tiers).
3. RECALIBRATE `--glass-tint-strength-aa` in `src/styles/tokens/glass.css` so the MUTED-ink tier
   clears 4.5:1 over synthetic white (bounded ≤24%) — the live π readback ratifies the exact value.
4. FIX the factually-wrong `dock/shell.css:67-73` comment to describe the real `:where(.glass-dock)`
   self-engage rule (not the non-existent one).
5. Author `src/composables/glass/useGlassBackdropLuminance.ts` (Arm 2) — the sampled observer
   composing `useResizeObserver`/`useIntersectionPause`/`useRAFLoop`/`useResolveTokenColor`; export
   it from the glass barrel (or keep demo-private with the booked 2nd-consumer trigger, per H3 arm).
6. Wire the observer ON for the dock (arm a) at the dock root / a dock composable; mount it on a
   content-glass demo (the 2nd consumer) at `data-glass-sample="live"`.
7. Author `scripts/proof-adaptive-glass-live.mjs` (G1, born-RED — the in-situ π arm) + register in
   `gates.mjs`/`ci.yml`; author `scripts/proof-adaptive-observer.mjs` (G2).
8. Extend `tests-visual/adaptive-glass.spec.ts` (or a new `adaptive-glass-live.spec.ts`) to read
   the dock + content tiers IN-SITU (NO injected ancestor bucket — close the C5-4 blind spot).
9. Update `CLAUDE.md` (the adaptive-glass legibility section — the dock + content-tier self-engage
   default + the shipped observer) + `MIGRATION.md` (the observer opt-out for dark-substrate consumers).

## §3a Triumvirate Dispatch

- **File-bounds expansion**: if the observer requires a behind-the-backdrop-filter pixel API (it
  cannot — no such API; the design is `elementsFromPoint`/canvas-downsample), or the in-situ π gate
  reveals the self-engage must touch a surface outside the dock partials + `ladder.css` + `glass.css`
  (a third illegible surface family), the scope-reveal trigger fires.
- **Hard-gate failure** not local-recoverable: if the default-on observer (arm a) blows the
  <2ms/settle perf budget on the dock-over-live-aurora case (C5-9), fall to H3 arm (b) opt-in —
  this is a NAMED fork, not a blind retry; record the measured frame-time.
- **Diagnostic loop**: three iterations where the π readback stays sub-4.5:1 after the self-engage +
  floor recalibration without isolating WHY (a cascade-order bake, a substitution-vs-inheritance
  trap like the dock shell's `--glass-bg-dock`) → triumvirate.

## File Bounds

| File | Access |
|---|---|
| `src/styles/dock/shell.css` (or `dock/morph.css`) | modify (add `:where(.glass-dock)` self-engage + fix comment) |
| `src/styles/glass/ladder.css` | modify (content-tier self-engage) |
| `src/styles/tokens/glass.css` | modify (recalibrate `--glass-tint-strength-aa`; `--glass-backdrop-luma` gains its first consumer) |
| `src/composables/glass/useGlassBackdropLuminance.ts` | create |
| `src/composables/glass/index.ts` | modify (barrel export, if public) |
| `src/components/custom/dock/**` (a composable wire-point) | modify (observer wire, arm a) |
| `demo/stories/**` (the 2nd observer consumer) | modify |
| `scripts/proof-adaptive-glass-live.mjs` | create |
| `scripts/proof-adaptive-observer.mjs` | create |
| `scripts/proof-adaptive-glass.mjs` | modify (re-point to assert the new self-engage rule's presence) |
| `scripts/gates.mjs` / `ci.yml` | modify (gate rows) |
| `tests-visual/adaptive-glass.spec.ts` (or new `-live` spec) | modify/create (in-situ readback) |
| `CLAUDE.md` / `MIGRATION.md` | modify |

**Do NOT touch:** the `in srgb` `--surface-tint-*` family (W55 edits only the `in oklab` glass
tint axis — the surface-tint identity is the AW.W26 deliberate keep), the dock SELECTED-accent
register (`--dock-selected-accent`/the rail accent — W-REGISTER-IOS's disjoint surface), the morph
interp endpoint (`color-mix(in srgb …)` for the transition — the adaptive darken rides the resting
endpoint only).

### §4a Disjointness

The CSS self-engage (Arm 1) and the observer composable (Arm 2) touch disjoint files; if dispatched
as two agent units, the unit boundary is CSS-only vs JS-only (the gates each read their own surface).
Cross-wave: shares `.glass-dock` SURFACE with W-REGISTER-IOS but DISJOINT axis (`--glass-tint-*` vs
`--dock-selected-accent`); shares `gates.mjs`/`ci.yml` — sequence the gate-row registrations into the
Batch-1 re-byte-lock, not a parallel write.

## §5 Agent Units

### AZ.W-ADAPTIVE-AUTO.1 The CSS self-engage mechanism fix + AA-floor recalibration (Arm 1 + Arm 3 floor)

- **Goal:** the dock + plain content-glass tiers self-darken over light backdrops unconditionally,
  and the AA floor clears the muted-ink tier — no JS, ships now.
- **Mechanism:** add the `:where(.glass-dock)` + `:where(.glass-card,…)` self-engage rules; recalibrate
  `--glass-tint-strength-aa`; fix the wrong shell.css comment.
- **Files:** the dock partial, `ladder.css`, `glass.css`, `shell.css` comment.
- **Sub-gate:** `proof:adaptive-glass-live` (in-situ π) clears 4.5:1 + ΔL silhouette on the dock +
  content routes WITHOUT an injected ancestor; `proof:adaptive-glass` structure arm green.

### AZ.W-ADAPTIVE-AUTO.2 The sampled-luminance observer (Arm 2)

- **Goal:** the iOS-27 dynamic refinement — a rAF-throttled sampled-luminance observer writes
  `--glass-backdrop-luma` + the bucket on its target, default-on for the dock (arm a).
- **Mechanism:** `useGlassBackdropLuminance` composing the existing throttle/gate substrates;
  `elementsFromPoint` composite for static pages, downsampled-canvas for the animated-backdrop case.
- **Files:** the composable, the barrel, the dock wire-point, the 2nd demo consumer.
- **Sub-gate:** `proof:adaptive-observer` proves the write + the throttle/gate + the ≥2-consumer bar;
  the observer's `--glass-backdrop-luma` write moves the dock plate over a live-aurora demo (π DELTA).

## §6 Hard Gate

1. **G1 — `npm run proof:adaptive-glass-live` (born-RED, in-situ π).** The BINDING truth: every
   enrolled glass surface over a light page clears 4.5:1 body (the `--muted-foreground` tier) AND a
   ΔL silhouette threshold, read IN-SITU with NO injected ancestor bucket. Born-RED: FAILS on the
   pre-edit tree (dock ΔL≈0.01, content wash 1.61:1) and passes after Arm 1 + Arm 2.
2. **G2 — `npm run proof:adaptive-observer`.** Asserts `useGlassBackdropLuminance` writes a numeric
   `--glass-backdrop-luma` + the discrete bucket, is rAF-throttled ≤4Hz + IntersectionObserver-gated,
   composes the existing substrates (no new throttle path), and meets the ≥2-consumer bar (or is
   demo-private with the booked trigger).
3. `proof:adaptive-glass` (existing structure arm, re-pointed to assert the new self-engage rules) +
   `proof:glass-cohesion` + `vue-tsc --noEmit` + `npm run build` green.

## §7 Format And Lint Cadence

`npm run typecheck` after each arm; `npm run build` to confirm `/styles` re-emits + the observer
chunk emits; `git diff --check`. Prettier/stylelint on touched CSS; ESLint on the new composable.
The π specs run against a quiet `:5199` server.

## §8 Verification Artefacts

- `proof:adaptive-glass-live` in-situ π JSON (the 4.5:1 + ΔL readback per enrolled route, born-RED→GREEN).
- `proof:adaptive-observer` transcript + a π DELTA of the dock plate over a live-aurora demo with the
  observer ON vs OFF (the `--glass-backdrop-luma` write moving the tint), saved under
  `docs/tranches/AZ/audit/visual/W-ADAPTIVE-AUTO-DELTA.md`.
- The recalibrated `--glass-tint-strength-aa` value + the muted-ink π proof it clears 4.5:1.

## §9 Commit Plan

- Arm-1 commit: `fix(AZ): unconditional glass self-engage for dock + content tiers, recalibrate the
  AA floor for muted ink (W-ADAPTIVE-AUTO Arm 1) — closes the dock-over-light self-engage no-op`.
- Arm-2 commit: `feat(AZ): useGlassBackdropLuminance sampled observer writes --glass-backdrop-luma
  (W-ADAPTIVE-AUTO Arm 2; H3 arm a default-on for the dock)`. Body required (the observer design +
  the perf budget held + the H3 arm).
- Gate-row commit folds into the Batch-1 re-byte-lock.
- Doc/status commit at close.

## §10 Dependencies

- **Depends on:** W-GATES (`proof:all` runnable; the `:5199` convention for the π server).
- **Blocks:** nothing hard. Coordinates with W-REGISTER-IOS (shared `.glass-dock` surface, disjoint
  axis) and the aurora/blob studios (the observer's animated-backdrop Move-2 refines the
  dock-over-live-aurora case).

## §11 Archaeology

Prior attempt: W55 (AX) shipped the DECLARATIVE bucket; AY.W-A11Y-PERF O-1 bolted an UNCONDITIONAL
always-darken onto the dock's OWN root via `--glass-backdrop: light` on `shell.css:73` — but it does
NOT self-engage (the `@container style()` query reads an ANCESTOR; the self-declaration can never
self-match), so it is a NO-OP. The misleading shell.css comment CLAIMS the morph.css rule
"unconditionally darkens the dock's own plate" — but morph.css's block is ancestor-querying. The new
guardrail: the `proof:adaptive-glass-live` IN-SITU π arm (no injected ancestor) — the C5-4 blind spot
(the gate that passed over a still-broken render) cannot recur because the readback reads the surface
as it actually paints, not as a synthetic-ancestor test fixture paints it.

## Successor for any deferral

If H3 falls to arm (b) opt-in (the default-on sample blows the frame budget on the
dock-over-live-aurora case), the default-on flag defers — but the observer STILL ships (opt-in); the
named successor for the default-on flag is W-BLOB-STUDIO / the aurora studio's G-PERF measurement
batch, which proves the per-frame sample budget over a live substrate. If the muted-ink floor
recalibration (Arm 1 step 3) reveals the 24% iOS clamp cannot clear 4.5:1 for the muted tier without
breaking the translucent-floor identity, the `contrast-color()` progressive-enhancement refinement is
NAMED as the binding legibility path on supporting engines, with the declarative floor as the
all-engine guarantee — recorded, not dropped.
