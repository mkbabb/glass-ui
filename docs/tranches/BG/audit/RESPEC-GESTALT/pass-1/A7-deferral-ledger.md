# A7 — the DEFERRAL LEDGER (RESPEC-GESTALT pass-1)

**Lens:** A7, the deferral-ledger lens — "Delineate any chronically deferred items and fold them into this
new tranche." **Branch:** `tranche/BG` · **HEAD:** `976dc890` · verified on disk 2026-07-01.

## Verdict

The no-silent-drop MACHINE is built and honest — this is the single biggest delta since `P-chronic-deferred.md`
(which was written before the machine landed and whose headline "the fold-ledger gate was never built / D11" is
now STALE). At HEAD: `docs/tranches/BG/FOLD-LEDGER.{json,md}` carries **135 DECIDED rows** (RETIRE 12 · MET 12 ·
COORDINATED 74 · DEFER-with-trigger 34 · SUPERSEDED 3), gate-locked by `scripts/proof-bg-deferred-ledger.mjs`
(9-bite, DONE at cursor row 0.4, commit `3fce612a`); `proof-ba-gestalt.mjs` is re-pointed off BC onto BG
(`REFLECT_DIR/WAVES_DIR/TRANCHE_DIR = docs/tranches/BG/...`, lines 77-80, DONE row 0.2, `84de6592`); and
`DISPOSITION-RESTAMP` re-stamped 31 AX rows to BG with 6 `resolved:true` and **0 phantom destinations** (DONE row
0.6, `002e9d32`). I cross-checked all **30 unique COORDINATED dest-waves against the cursor: every one exists** —
the "COORDINATED→phantom" recurrence of the D11 disease did NOT happen. D6 (close oracle blind past BC) and D11
(machine never built) — the two CRITICAL rows of the prior census — are both genuinely closed.

So the deferral posture is *inventoried*. What it is not yet is *paid*: the three resolution waves that actually
DELETE the deferred debt (`BG.W-SPIKE-DELETE` 12.1, `BG.W-JUBILANCE-DECIDE` 12.2, `BG.W-DEAD-GATE-SWEEP` 12.3,
`BG.W-DEAD-TOKEN-SWEEP` 10.20) are ALL still **PENDING**, so **2573 lines of dead/orphan fork remain on disk**
(`useLiquidMorph.ts` 462 · `liquid-morph.css` 850 · `useBloomUp.ts` 449 · `useCelebrationBurst.ts` 261 ·
`useDockContextSilhouette.ts` 551) and `useCelebrationBurst`/`useDockContextSilhouette` still have **zero real
src call-sites** (only barrel/type re-exports: `motion/index.ts`, `jubilance.css`, `api/types-extra.ts`). That is
expected mid-tranche, not a finding — the finding-grade issues are three quality gaps in the *machine itself*: a
label-scoped in-src detector that under-counts, ~6 speculative registers parked as "DEFER" when the honest verb is
RETIRE, and one genuinely chronic 5-tranche item (deep-glass 20px) deferred on a number nobody has measured.

---

## Findings (severity-ranked, file:line)

### F1 [MAJOR] — the in-src booked-marker detector is label-scoped and under-counts; the census-completeness claim is disk-false

`proof-bg-deferred-ledger.mjs:132-139` derives the in-`src` corpus by matching only two literal forms —
`/\bCONSUME\(([^)]+)\)/` and `/\bBOOKED:\s*(\S+)/` (the colon-label form) — over `.ts`/`.vue`. The FOLD-LEDGER
declares this corpus as exactly **2** rows (`FOLD-LEDGER.md:173`, "In-`src` CONSUME/BOOKED markers (2 — .ts/.vue
only)"). But a bare grep for `CONSUME(|BOOKED` over `src` returns **8 marker lines**; the 6 the detector misses
all use `BOOKED` as a bare WORD, not the `BOOKED:` label:

- `src/components/ui/button/Button.vue:94` — "…is BOOKED in the `press` SPRING_PRESETS row that BC.W-SPRING-EASE
  owns…OUT of this wave's footprint" (a cross-wave spring re-point, un-verified as landed).
- `src/components/custom/constellation/constants.ts:114` + `constellationField.ts:259` — "the GPU spatial-hash
  compute neighbor-bin is the BOOKED dense-register successor — overfit substrate at the default count=64" (a
  genuine honest KEEP-BOOKED).
- `src/components/custom/dot-flow-field/composables/flowField.ts:39` — "the BOOKED #3 consumer that satisfies its
  ≥3-consumer bar" (a SATISFIED consumer-note, not a live deferral).

None of the 4 uncaptured distinct items is a dropped BUILD deferral, so the no-silent-drop floor holds *in fact*
today. But the detector cannot see a bare-word `BOOKED` — so a future `// BOOKED a real feature to a later wave`
comment (the natural English form an author reaches for) rides completely invisible to the census, and the gate
greens on `EXPECTED_COUNT` (`:228`) because it never counted the marker in the first place. The completeness
claim is only as strong as the convention discipline, and the convention is undocumented in `src`. This is a
latent hole in the exact mechanism the tranche built to guarantee no-silent-drop.

### F2 [MAJOR] — ~6 DEFER-with-trigger rows are speculative substrate parked as "defer"; the honest verb is RETIRE (the user's "over-contrivance" critique, machine-visible)

Of the 34 `DEFER-with-trigger` rows, ~28 are genuinely un-buildable here (foreign-tree republish: `D27`/kf-snap,
Oscillator, value.js `/color`, `keyframes-prune-migration-dag`; hardware: `D8`/`D24`/`D25`/Metal-Safari p50;
Baseline-gated CSS features: `cross-document-vt`, `css-scope-state`, `css-text-box-trim`, `css-interpolate-size`,
`interestfor-previews`, `directional-view-transition`; honest ≥2-consumer holds: `glass-dialog-native-pilot`,
`inline-edit-primitive`, `labeled-slider-readout`). Those are correct — the trigger is external and objective.

But ~6 rows defer a NET-NEW SPECULATIVE VISUAL REGISTER on the trigger "a consumer wants it someday", which is a
hope, not a trigger — and each has already ridden ≥2 tranches with zero consumer in sight (`FOLD-LEDGER.md`):

| id (line) | deferred register | trigger text | ride |
|---|---|---|---|
| `BE.W-AUR-SATIN` (:103) / `BF.W-AUR-SATIN` (:143) | aurora satin medium | "an aurora-medium breadth consumer wants the satin register" | BE→BF→BG |
| `BE.W-AUR-PRISM` (:101) / `BF.W-AUR-PRISM` (:141) | aurora prism medium | "…wants the prism register" | BE→BF→BG |
| `BE.W-AUR-REACTIVE` (:102) / `BF.W-AUR-REACTIVE` (:142) | album-hue re-seed + `uShimmer` | "an album-hue re-seed consumer + the `uShimmer` term lands" | BE→BF→BG |
| `BE.W-TAB-IOS-CAPSULE` (:133) / `BF.W-TAB-IOS-CAPSULE` (:170) | DockTabBar capsule arm | "a DockTabBar consumer wants the dock-tab capsule arm" | BE→BF→BG |
| `BE.W-ALIVE-IDLE` (:97) | breathing-pill idle | "a real surface wants the breathing-pill idle register" | BE→BF→BG |
| `BE.W-ANTICIPATE-FOLLOW` (:99) / `BE.W-CONCENTRIC-RADIUS` (:108) | anticipation pre-dip / concentric-radius | "a real surface/2-consumer … need lands" | BE→BF→BG |

These are the J-inv-10 (`≥2-consumer bar`) / "presets-in-consumers" test failing in the other direction: the
library holds SPEC-DEBT for a feature no consumer has ever asked for, and re-books it every tranche behind a
subjective "wants it" gate. `KEEP-BOOKED` here is not honest holding — it is the over-contrivance the user named,
re-badged as prudence. The honest disposition is `RETIRE-with-rationale` (the idea is recorded in the BE/BF
wave-spec; a real future consumer re-enters through a fresh ≥2-consumer trigger, exactly as `BB.W-NDA-DECIDE`
retired the founding native-drawer chronic). This does not lose the idea — it stops the library carrying dead
spec.

### F3 [MAJOR] — deep-glass full-20px is the chronic linchpin: 5 tranches ridden, deferred on a number nobody has measured

`src/styles/tokens/glass-deep.css:2` — the deep tier is `BB.W-DEEP-GLASS`; the full Apple `saturate(1.8) blur(20px)`
ceiling has been a "BOOKED successor with the recorded throttle number" since then (`:25-39`), landing at a
budget-clearing **16px/saturate 1.5** instead. It has ridden **BB→BC→BD→BE→BF→BG = 5 tranches**
(`FOLD-LEDGER.md:110` `BE.W-DEEP-CEILING`, `:147` `BF.W-DEEP-GLASS-WIRE`, both `DEFER-with-trigger` "the perf
budget clears"). The trigger is a `profile:budget` clearance that, on the evidence, has never been RUN at 20px —
it is deferred on an un-measured number. This is the textbook chronic: a ONE-TOKEN change (`--glass-blur-deep`
16px→20px, `--glass-deep-saturate` 1.5→1.8) gated for five tranches on a measurement that costs one gate
invocation. It is also directly a design-identity gap — the design language is "iOS-26/27 liquid-glass
transmissive material" and the library deliberately sits below the Apple-measured ceiling for a reason nobody has
re-checked since BB.

### F4 [MINOR] — the in-src detector is `.ts`/`.vue`-only, so `.css` BOOKED markers are invisible to it (covered today only by luck of a matching wave-spec)

`proof-bg-deferred-ledger.mjs:122` scopes the in-src scan to `.ts`/`.vue` (README excluded by comment). The
substantive `.css` booked markers — deep-glass 20px (`glass-deep.css:5,25,38`) and the chromatic-aberration
lens-chroma rim (`glass-refract.css`, per prior census Class 3) — are captured ONLY because a matching BE/BF
wave-spec row happens to exist (`BE.W-DEEP-CEILING`, `BE.W-LENS-PRISM→BG.W-GLASS-REFRACT-WEBGL`). A `.css`-only
`BOOKED:` marker with NO paired wave-spec would ride invisible. The `.css` cascade is a first-class source of
deferred behaviour (tokens booked to a perf clearance); excluding it from the no-silent-drop scan is an
unrationalized gap.

### F5 [POSITIVE / verify-note] — the foundation deferral machinery is correctly DONE; record it so the stale P-chronic-deferred headline is not re-acted-on

`P-chronic-deferred.md:13-30` leads with "the fold-ledger gate was never built (D11) … `proof:be-fold-ledger` is
ABSENT" and "`proof:ba-gestalt` still points at BC (D6, CRITICAL)". Both are FALSE at HEAD: `proof-be-fold-ledger`
is correctly ABSENT because it was SUPERSEDED by the built `proof-bg-deferred-ledger.mjs` (BE.W-FOLD-LEDGER /
BF.W-FOLD-LEDGER both `MET → BG.W-DEFERRED-LEDGER` in the ledger), and `proof-ba-gestalt.mjs:77-80` reads the BG
tree. Any downstream synthesis must build on the CURRENT state (machine built, debt inventoried, resolution waves
pending) — not re-open D6/D11 as live.

---

## The CHRONIC table (≥2 tranches ridden) — machine-foldable, with my disposition delta vs the built ledger

The built `FOLD-LEDGER.json` is the 135-row source of truth; this table is the CHRONIC subset (the A7 headline
deliverable) with the rows where I RECOMMEND A DIFFERENT DISPOSITION than the built ledger, plus the honest
chronics it got right. `A7-verdict` is my recommendation; `ledger` is the current built disposition.

| id | first deferred | ride | built ledger | A7 verdict | gestalt rationale |
|---|---|---|---|---|---|
| deep-glass full-20px (`glass-deep.css:25`) | BB | 5 | DEFER-with-trigger (BE/BF DEEP-CEILING) | **BUILD-fold** → new micro-wave `BG.W-DEEP-GLASS-DECIDE` | ONE token, gated 5 tranches on an un-run `profile:budget`. RUN it at 20px/sat-1.8; build-or-honest-retire. Ends the chronic + closes the Apple-ceiling identity gap. |
| `BE.W-AUR-SATIN`/`-PRISM`/`-REACTIVE` | BE | 2 | DEFER-with-trigger | **RETIRE-with-rationale** → fold into a `BG.W-SPECULATIVE-RETIRE` (or an arm of `BG.W-JUBILANCE-DECIDE`) | speculative aurora mediums, 0 consumer, "wants it someday" trigger = over-contrivance. Record in BE/BF spec; re-enter via a fresh ≥2-consumer trigger. |
| `BE.W-TAB-IOS-CAPSULE` (D=BF too) | BE | 2 | DEFER-with-trigger | **RETIRE-with-rationale** → same wave | dock-tab capsule arm, 0 DockTabBar consumer. Same speculative pattern. |
| `BE.W-ALIVE-IDLE` / `BE.W-ANTICIPATE-FOLLOW` / `BE.W-CONCENTRIC-RADIUS` | BE | 2 | DEFER-with-trigger | **RETIRE-with-rationale** → same wave | net-new motion/geometry registers, 0 consumer. Liquid-weight is UNIVERSAL already; a bespoke idle-breathe register with no surface is dead spec. |
| `useLiquidMorph.ts` (462L) + `liquid-morph.css` (850L) (D2/D30) | BE | 2 | RETIRE → `BG.W-SPIKE-DELETE` | **BUILD-fold (agree)** — flag PENDING at HEAD | correct disposition; the debt (1312L) is still on disk because 12.1 hasn't run. |
| `useCelebrationBurst`(261L)/`useDockContextSilhouette`(551L) 0-call-site (D9/D12/D13/D31) | BE | 2 | COORDINATED/RETIRE → `BG.W-JUBILANCE-DECIDE` | **BUILD-fold (agree)** — flag PENDING | correct; confirmed 0 real src call-sites at HEAD (barrel re-exports only). Wire-to-≥2 or delete, no third re-book. |
| in-src bare-word BOOKED ×4 (Button/constellation×2/dot-flow) | — | — | UN-INVENTORIED (detector blind) | **plan-doc-edit + amend-gate** | F1: not dropped today, but the detector can't see them. Harden or convention-lint. |
| Baseline CSS feature books ×6 (text-box-trim, interpolate-size, scope-state, cross-doc-vt, interestfor, directional-vt) | AX | ≥3 | DEFER-with-trigger | **KEEP-BOOKED (agree) — re-check 2026-07 Baseline** | genuine external trigger; but interpolate-size/`calc-size()` + text-box-trim reached Baseline in 2025 — the RESTAMP wave (DONE) should have re-checked; verify it did, graduate any now-Baseline. |
| Metal/Safari real-box perf ×5 (D8/D24/D25/GOO-SPLIT-PERF/VIZ-PARITY-METAL) | BD | 3 | DEFER-with-trigger | **KEEP-BOOKED (agree)** | genuinely un-automatable (no Metal box); the Safari CORRECTNESS gate `BG.W-SAFARI-PARITY-GATE` IS a BUILD wave — only the p50 NUMBER defers. Honest. |
| kf/value.js republish ×4 (kf-snap D27, Oscillator, prune-dag, value.js /color) | BB/BC | ≥3 | DEFER-with-trigger | **KEEP-BOOKED (agree)** | foreign-tree fence; by-name coordination, no build. Note BH.B2.1 bumps kf `^5.1.0` which lands `DragOptions.snap` — verify D27 flips MET at that bump. |

---

## Fold candidates (concrete, for the AMENDED-GESTALT-PLAN)

### FC1 — `BG.W-SPECULATIVE-RETIRE` (NEW-WAVE, Band-0/gate-only) — RETIRE the ~6 "wants-it-someday" registers

**Gestalt approach (not a patch):** the over-contrivance the user named is spec-debt held on a subjective
trigger. Transpose the `BB.W-NDA-DECIDE` discipline (the founding-chronic terminal-RETIRE) onto the aurora
satin/prism/reactive + tab-ios-capsule + alive-idle + anticipate-follow + concentric-radius rows: flip each
`DEFER-with-trigger → RETIRE` IN PLACE in `FOLD-LEDGER.json` (no delete, the no-delete fence), with a `rationale`
+ `successor: "a fresh ≥2-consumer trigger re-enters the idea"`. Zero pixels, zero new mechanism — a
register-disposition flip + a `proof:bg-deferred-ledger` re-count. This is the honest end of ~6 chronic rides and
the single most direct answer to "over-contrivance" in the deferral surface.

### FC2 — `BG.W-DEEP-GLASS-DECIDE` (NEW micro-wave, or arm of `BG.W-DEAD-TOKEN-SWEEP`) — end the 5-tranche deep-glass ride

**Gestalt approach:** RUN `profile:budget` with `--glass-blur-deep` at the Apple-measured 20px / `saturate(1.8)`
ceiling on the deep tier's real per-frame cost. If it clears → land the two-token bump (the deep tier reaches its
design-language ceiling; `BB.W-DEEP-GLASS`'s own booking is discharged). If it does NOT clear → convert the
DEFER-with-trigger to a `RETIRE-with-recorded-number` (16px IS the ceiling for this substrate, stated as
identity, not as debt). Either way the chronic ends with a measured number instead of a fifth re-book.

### FC3 — AMEND `proof:bg-deferred-ledger` in-src detector (AMEND-WAVE on `BG.W-DEAD-GATE-SWEEP` or `BG.W-DEFERRED-LEDGER`)

**Gestalt approach:** the detector greps `BOOKED:` (colon-label) but the natural authorial form is bare-word
`BOOKED`. Two idiomatic closes, pick one: (a) widen the regex to bare-word `\bBOOKED\b` over `.ts`/`.vue`/`.css`
and re-derive `EXPECTED_COUNT` (the corpus grows from 2 to ~8, each new row DECIDED — the 4 bare-word items are
2×overfit-KEEP + 1×satisfied-MET + 1×cross-wave-COORDINATED-to-BC.W-SPRING-EASE); OR (b) add a source-lint bite
that a bare-word `BOOKED` in `src` is FORBIDDEN — every real booking MUST use the `BOOKED:` label form the
detector reads (a clean convention, self-enforcing). Option (b) is the more elegant — it makes the census
complete by construction rather than by an ever-widening grep. Also add the `.css` arm (F4).

### FC4 — PLAN-DOC-EDIT `FOLD-LEDGER.md:173` — reconcile the "in-src 2" claim to the disk reality

**Change:** the header "In-`src` CONSUME/BOOKED markers (2 — .ts/.vue only)" should read "(2 `BOOKED:`-label /
`CONSUME()` markers; bare-word `BOOKED` is excluded by convention — see FC3)" so the exclusion is
acknowledged-explicit, not silently-missed. A one-line doc edit that turns a latent hole into a documented
scoping decision.

### FC5 — VERIFY-note on `BG.W-DISPOSITION-RESTAMP` (DONE) — Baseline re-check + kf-snap flip

**No new wave**, but the AMENDED plan should record the two verify-obligations the RESTAMP wave's "n:2 re-eval"
must have covered: (a) the 2025-Baseline CSS features (`css-interpolate-size`/`calc-size()`, `css-text-box-trim`)
may now be graduatable — confirm the re-eval checked live Baseline, not just re-stamped; (b) `D27`/kf-snap flips
its trigger MET when `BH.B2.1-swap` bumps kf `^5.1.0` (cursor row 18.1) — the ledger's DEFER should become a
RESOLVED at that bump, not ride into 5.0.1.

---

## No-silent-drop attestation (A7)

Every chronically-deferred item is accounted for by the BUILT `FOLD-LEDGER.json` (135 rows, all 30 COORDINATED
dest-waves verified in-cursor, 0 phantom). This lens ADDS: 4 in-src bare-word `BOOKED` markers the detector does
not see (F1 — none a live BUILD drop, but a latent hole → FC3/FC4); ~6 speculative registers whose honest
disposition is RETIRE not DEFER (F2 → FC1); one 5-tranche chronic (deep-glass 20px) that should be DECIDED with a
measurement not re-booked (F3 → FC2); and a `.css`-scope gap in the detector (F4). The foundation machinery
(ledger/restamp/gestalt-repoint) is correctly DONE and the prior census's D6/D11 CRITICAL rows are genuinely
closed (F5) — downstream synthesis must not re-open them.
