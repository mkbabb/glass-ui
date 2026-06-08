# AX.W48 — glass-material demo reauthor: bind the shipped specular/tint seams the story narrates

**Band** F · DEMO-REAUTHOR · **Severity** blocker · **dependsOn** AX.W09 (the specular
tune-to-subtle cohort — the `--glass-specular-intensity-rest: 0` dormancy + the shipped
`useSpecularTracking` seam this wave BINDS) · AX.W00 (the π visual-runtime lane this wave's live
arm closes on) · SEQUENCE-AFTER AX.W18 (the storybook IA reinvention — W18 may RELOCATE the SFC;
W18 moves/renames only, this wave rewrites the body; they must not race the same file) · **Charter**
the convergence ledger row W48 (`docs/tranches/AX/audit/convergence/CONVERGENCE-PLAN.md:26`) +
§"Demo reauthor" cohort (`:61` — W48/W49/W50) · **Audit**
`docs/tranches/AX/audit/convergence/D8.md` (D8 USER-DEFECTS-2026-06-08 — `/substrates/glass-material`
*totally broken*, blocker; verdict → net-new demo-side reauthor, library grammar SOUND).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on FOUR falsifiable witnesses at HEAD `002bda5`. The library `.glass-material`
grammar is sound and settled (W09/W20/W25b own + freeze it); the breakage is entirely in
`demo/stories/substrates/glass-material.vue`, last touched at AW `8554e33` (W22/W23) and NEVER
rewired through the AX tranche — so it stages a showcase for behaviours the demo itself fails to
enable, against a recipe W09 (`93696b3`) deliberately made dormant-at-rest. Each witness is a
source-true line probe the new gate inverts.

- **RED witness 1 (the headline — the moving-specular seam is NEVER composed; the story reads as
  dead plates).** `useSpecularTracking` is the shipped DRY pointer-write seam built for exactly this
  (`src/composables/glass/useSpecularTracking.ts`, exported off the root barrel via
  `src/index.ts:152` `export * from "./composables/glass"`): on `@pointermove` it writes
  `--mouse-x`/`--mouse-y` onto the host, which the unified `.glass-material::before` recipe maps onto
  its typed `--specular-x`/`--specular-y` channel (`glass.css:96-101`). The story's headline section
  blurb (`glass-material.vue:40`) promises "Every rung + card reads the same **pointer-anchored**
  catch-light" — but the SFC composes **no** `useSpecularTracking` and writes **no** `--mouse-x`
  (`grep -E "useSpecularTracking|mouse-x|onPointerMove|pointermove" demo/stories/substrates/glass-material.vue`
  → only doc-comment/blurb prose, zero binding). With `--glass-specular-intensity-rest: 0`
  (`tokens.css:1825`, W09's correct dormancy) the `::before` `opacity` is `0` at rest, so a static
  frame (and the screenshot the user saw) reads as flat dead plates — the headline feature is
  structurally unfulfillable. **Falsifiable RED:** *parse the SFC `<script setup>` — at HEAD it
  neither imports nor calls `useSpecularTracking` and binds no `@pointermove`/`:style` specular write
  on any plate (RED). After the wave each rung/card plate composes the seam and binds
  `:style="specularStyle" @pointermove="onPointerMove"` (GREEN).*

- **RED witness 2 (the adaptive-tint buttons are DEAD — a concrete wiring bug).**
  `glass-material.vue:124-126` sets only `--glass-tint-source` inline; it NEVER sets
  `--glass-tint-strength`, which stays at its default `0%` (`tokens.css:772`). The rung background is
  `color-mix(in oklab, <bg>, var(--glass-tint-source) var(--glass-tint-strength))` (`glass.css:212`)
  — at `0%` strength the mix is a no-op, so clicking "aurora rose"/"aurora teal" changes nothing; the
  tint demo demonstrates the OPPOSITE of working (`grep -- --glass-tint-strength
  demo/stories/substrates/glass-material.vue` → none). **Falsifiable RED:** *the tint section writes
  `--glass-tint-source` with no companion `--glass-tint-strength` write (RED — the mix is inert).
  After the wave the tint control sets BOTH, with a non-zero strength inside the ≤30% house ceiling,
  so the `color-mix` actually biases the surface (GREEN).*

- **RED witness 3 (the `glass-btn` is ABUSED into a wide bar).** `glass-material.vue:92-94` writes
  `class="glass-btn !h-12 !w-44"`, and the tint controls (`:114`) write `class="glass-btn px-3
  text-xs"`. `.glass-btn` (`glass.css:394`) is a `display:flex` CIRCULAR icon button fixed at
  `--size-icon-btn` (2.5rem) with `border-radius: var(--radius-pill)`; coercing it to a 11rem × 3rem
  bar via two `!important` overrides is non-idiomatic and reads as a broken/misshapen control.
  **Falsifiable RED:** *the SFC carries `glass-btn` with `!h-`/`!w-`/`px-` override coercion on a
  non-icon-button surface (RED). After the wave the squircle fold shows on `.glass-card` and, where a
  button is wanted, a real `<Button variant="glass">` — zero `glass-btn` (GREEN).*

- **RED witness 4 (the subtle rim has NO contrast device — its claim is unverifiable on screen).**
  `--glass-edge-light: inset 0 0 0 0.75px hsl(0 0% 100% / 0.18)` (`tokens.css:757`) is a deliberately
  sub-perceptual 0.75px 18%-α white inset ring (W09 "subtle by design"). The headline section claims
  "the `--glass-edge-light` rim across the band" (`:40`) but ships NO contrast device — no rim-on/
  rim-off pairing, no dark-plate sample — so the rim is invisible and the claim reads as a missing
  feature, contradicting the W09 deliberate-subtle intent. **Falsifiable RED:** *the SFC stages no
  rim-on/rim-off (or dark-plate) side-by-side that makes the 0.75px ring legible (RED). After the
  wave a rim on/off contrast device renders the ring as a deliberate-subtle feature (GREEN).*

The wave is RED at HEAD on all four; the HardGate below drives each to GREEN. **CRITICAL — the
existing glass-material gates are LIBRARY-grammar gates, not demo-route gates.**
`proof:glass-material-unified` + `proof:glass-material-sota` assert the `glass.css`/`tokens.css`
RECIPE (the unified `::before`, the four SOTA folds, the `@supports`/token gating) and PASS green
over exactly this broken demo — they never scan `glass-material.vue`. That is the live witness that
"a sound library grammar and a demo that fails to bind it both pass the current gates." The NEW
`proof:glass-material-demo` is the demo-route falsifier this wave authors.

---

## Goal

`/substrates/glass-material` DEMONSTRATES the grammar it documents — the headline pointer-anchored
catch-light is LIVE (composed off `useSpecularTracking`), the adaptive tint actually bites (a
non-zero `--glass-tint-strength`), the squircle fold reads on idiomatic surfaces (`.glass-card` + a
real glass `<Button>`, zero abused `glass-btn`), and the deliberately-subtle rim is legible against a
contrast device — all by BINDING the already-shipped seams, with ZERO library edits.

---

## Scope (the gestalt fix — bind the shipped seams, narrate nothing absent)

D8's four root causes are the SAME pathology — a demo authored against the pre-W09 louder specular
and never rewired after the library moved underneath it. ONE cohesive demo-content reauthor on the
EXISTING library grammar (zero `src/` edits, zero new primitives, zero new tokens):

1. **Wire the moving specular via the shipped seam (RED witness 1 — the headline).** Compose
   `useSpecularTracking()` in the SFC `<script setup>` (imported off the root barrel,
   `import { useSpecularTracking, Button } from "../../../src/index"` — the demo idiom
   `glass-panel.vue:10` already uses for `useGlassRenderer`) and bind
   `:style="specularStyle" @pointermove="onPointerMove"` on EACH rung/card plate of the headline
   section, so the "pointer-anchored catch-light" is actually live on hover. This is the DRY,
   library-blessed path — NO hand-rolled `--mouse-x` math, NO per-plate copy. PRM-safe by
   construction (the seam skips the write under `prefers-reduced-motion: reduce`; the recipe pins the
   centred `50%` fallback). One `useSpecularTracking()` instance can drive all sibling plates (a
   single shared `specularStyle`/`onPointerMove` bound across the `v-for`), or one per plate — the
   gate asserts the seam is composed + bound, not the cardinality.

2. **Make the tint demo real (RED witness 2).** The tint control must set BOTH `--glass-tint-source`
   AND a non-zero `--glass-tint-strength` (the ≤30% house ceiling per the `glass.css:204` comment) on
   the demo plate, so the `color-mix(in oklab, …)` actually biases the surface. Without strength the
   source is inert by definition. The "none (warm-white)" sample resolves to strength `0%` (the
   genuine zero-delta default); the "aurora rose"/"aurora teal" samples resolve to a non-zero strength
   so the bias is visible.

3. **Drop the `glass-btn` abuse (RED witness 3).** Show the squircle fold on `.glass-card`
   (the idiomatic squircle surface — `glass.css` `corner-shape` rides the `.glass-material` group) and,
   where a button is wanted (the tint sample selector), a real `<Button variant="glass">` (the root-
   barrel `glass` variant, `buttonVariants:53` — it composes the `glass-wash` rung and inherits the
   unified `.glass-material` specular + rim). NEVER an icon-button coerced wide with `!important`.

4. **Give the subtle rim a contrast device (RED witness 4).** Stage a rim-on / rim-off side-by-side
   (a plate with the `.glass-material` rim vs a bare-blur plate with the rim suppressed, or a dark-
   plate sample) so the 0.75px 18%-α ring is legible AS a deliberate-subtle feature — matching the W09
   "subtle by design" intent instead of contradicting it. The device is a demo-content arrangement
   (two plates, a label), not a token override.

### Out of scope (the meta-class is RECORDED here, not solved here)

D8 is the SAME meta-class as **D7** (blob-mood "totally broken") and the **W20 card-story** finding:
*a demo authored against a prior behaviour and never rewired after the library moved underneath it.*
The cardinal-lesson class-fix — a `proof`-style guard that EVERY substrate story exercises (writes)
the tokens/seams it claims — would catch the whole class, NOT just this one file. This wave keeps
itself demo-scoped (one SFC + its one demo-route gate) and RECORDS the meta-class for the W33 close /
overfitting pass; it does NOT author the cross-story class-guard (that is a W33-altitude decision, not
a single-demo wave's reach). The per-story `proof:glass-material-demo` this wave ships is the template
the W33 class-guard generalizes from.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `demo/stories/substrates/glass-material.vue` | **REAUTHOR the body** (zero library edits): compose `useSpecularTracking` + bind `:style="specularStyle" @pointermove="onPointerMove"` on each headline rung/card plate (RW1); set BOTH `--glass-tint-source` AND a non-zero `--glass-tint-strength` on the tint plate, and replace the abused `glass-btn` tint-sample buttons with `<Button variant="glass">` (RW2/RW3); replace the `glass-btn !h-12 !w-44` squircle bar with `.glass-card` + a real `<Button variant="glass">` (RW3); add the rim on/off contrast device (RW4). Import `{ useSpecularTracking, Button } from "../../../src/index"` (root-barrel idiom). |
| `scripts/proof-glass-material-demo.mjs` | **NEW** — the device-free demo-route gate: parse `glass-material.vue` and assert (a) it imports + calls `useSpecularTracking` and binds `@pointermove`/`:style` specular on a plate, (b) it writes a non-zero `--glass-tint-strength` companion to `--glass-tint-source`, (c) ZERO `glass-btn` token (a deletion-proof) + ≥1 `<Button variant="glass">`, (d) a rim on/off (or dark-plate) contrast device is present. Born-RED at HEAD (the SFC has none of the four). |
| `tests-visual/glass-material-demo.spec.ts` | **NEW** — the π-lane fail-CLOSED live arm (the W00 `tests-visual/` workspace member): drive the demo route `/substrates/glass-material`, `page.hover` a headline plate, read back the `::before` specular paint and assert the catch-light MOVES with the pointer (non-zero `--mouse-x` write + a non-flat readback that tracks position); click an "aurora rose"/"aurora teal" tint sample and assert the plate background measurably shifts. |
| `package.json` | Register `proof:glass-material-demo` (the new `proof:*` entry + the W00 meta-gate / `gates.mjs` parity match — `proof:gate-script-parity` bijection). |
| `docs/tranches/AX/audit/W48-glass-material-demo.json` | **NEW** — the born-RED→GREEN audit artefact + the paired-π BEFORE/AFTER + DELTA reference (dead-plates HEAD render vs live-specular/biting-tint AFTER). |

**OUT of bounds (the library grammar — settled + owned, ZERO edit here):** `src/styles/glass.css` (the
`.glass-material` `::before` catch-light + the `--glass-material-rim` ring + the tint `color-mix` + the
`.glass-chromatic` fringe — **W09 owns the specular write; W20 frames the survivor; W25b documents
NOT-carved**); `src/styles/glass-refract.css` (the `#glass-refract` filter); `src/styles/tokens.css`
(the `--glass-specular-intensity-*` + `--glass-tint-*` + `--glass-edge-light` cohort — **W09 owns**);
`src/composables/glass/useSpecularTracking.ts` (the shipped seam — this wave CONSUMES it, does NOT
re-author it); any `src/components/**` (the `Button` `glass` variant is consumed as-shipped). The
`tests-visual/` workspace SCAFFOLD (`package.json` member + `playwright.config.ts`) is **W00's** — this
wave ADDS one `.spec.ts` sibling, never edits the harness.

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W09 (specular tune-to-subtle) — HARD PREDECESSOR, file-disjoint.** W09 is the LIBRARY CAUSE of
  dormant-at-rest (correctly) — it owns `glass.css`/`tokens.css`/the `useSpecularTracking` seam and is
  COMPLETE. It touches NO demo and never wires pointer-tracking INTO the glass-material story; its
  `proof:glass-material-unified` asserts the RECIPE, not the demo route. W48 dependsOn W09 so the seam +
  the dormant-at-rest tokens it binds are settled. **No shared file** (W09: `src/styles/` + the seam SFC;
  W48: the demo SFC + the demo-route gate).

- **vs W20 (primitive-fix / GlassPanel-retire) — file-disjoint.** W20 retires GlassPanel ONTO
  `.glass-material` and re-points the `glass-panel`/`paper-glass`/`use-glass-renderer` OTHER stories; it
  explicitly "touches no glass.css" and frames `glass-material.vue` as "the surviving substrate story
  [that] reads on `.glass-material`" — its retire-TARGET, NOT its repair-subject. W20 §Scope even warns
  the surviving story "MUST NOT manufacture a NEW fake consumer" — it ASSUMES the route already reads,
  which D8 proves false. **W20 never audits or repairs `glass-material.vue`'s own specular/tint/glass-btn
  wiring.** W48 owns exactly that body repair. (Convergence D8 §DEDUP row "W20".)

- **vs W18 (storybook IA reinvention) — SHARED-FILE, SEQUENCED.** W18 authors the category tree and
  keeps `glass-material` as a Substrates render-background row; it is explicitly "moves/renames only; NO
  component-internal edits" — it frames the row, never edits the SFC body, and ASSUMES each row "resolves
  to a live SFC validated through the π lane." D8 is precisely a row that MOUNTS but renders broken, which
  W18 by charter does not fix. **They both reference `glass-material.vue` but W18 RELOCATES/renames it while
  W48 REWRITES its body — they must not race the same file.** SEQUENCE: W48 lands the body rewrite either
  BEFORE W18 frames the tree (W18 then carries the rewritten body forward through any relocation) or AFTER
  W18 settles the path (W48 rewrites at the new path). Recorded as a sequencing note, not a concurrent edit.

- **vs W25b (CSS monolith carves) — file-disjoint.** W25b renames `glass-specular-track.css` →
  `glass-material.css`, fixes stale doc pointers, and documents glass.css NOT-carved — file-rename + doc-
  truth only, no demo edit. **No shared file** with W48.

- **vs W40 (demo-shell dock-nav coherence reaudit) — wrong altitude, file-disjoint.** W40 owns the demo
  SHELL (nav/dock), not individual substrate story BODIES. W48 owns one story body. No overlap.

- **vs W49/W50 (the sibling demo-reauthor cohort).** W49 (D16) + W50 (D17) reauthor OTHER broken demo
  stories. W48 owns ONLY `glass-material.vue` + its one gate; the three are file-disjoint per-story
  reauthors sharing the same META-CLASS (recorded for W33), never the same SFC.

---

## DEDUP (why no OTHER wave owns this — the convergence finding proved it)

D8 (`docs/tranches/AX/audit/convergence/D8.md`) ran the cross-reference against EVERY existing AX wave
and proved the exclusion at source:

- **W09** is the library CAUSE of dormant-at-rest (`--glass-specular-intensity-rest: 0`) and is COMPLETE
  + library-only; it does NOT touch the demo or wire pointer-tracking into the glass-material story (its
  gate asserts the recipe, not the route). D8 §DEDUP row "W09": *"No — W09 is the cause … library-only …
  does NOT touch the demo."*
- **W20** re-points OTHER stories ONTO `.glass-material` and frames glass-material as the SURVIVING
  substrate row, but "does NOT audit or repair `glass-material.vue`'s own content (the specular/tint/
  glass-btn wiring)" — it ASSUMES the route already reads, which D8 falsifies. D8 §DEDUP row "W20".
- **W18** frames the row in the IA tree but "moves/renames only; NO component-internal edits" — it never
  edits the SFC body. D8 §DEDUP row "W18".
- **W25b** is a file-rename + doc-truth carve, "no demo edit." D8 §DEDUP row "W25b".
- **W40** is the demo SHELL altitude, "not individual substrate story bodies." D8 §DEDUP row "W40".

**Conclusion (D8 verdict, restated):** *"No existing wave owns repairing the glass-material DEMO. W09
(cause), W20/W18 (frame it as a survivor row but never edit its body), W25b (file rename) all leave the
demo's broken internal wiring untouched → net-new-wave (a small demo-reauthor wave), with a hard dependsOn
on W09 and a SEQUENCING note with W18."* This wave IS that net-new demo-reauthor wave. It is NOT an
augment of any existing wave: it writes a NET-NEW SFC body + a NET-NEW demo-route gate + a NET-NEW π spec.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gate — born-RED→GREEN.**

- **`proof:glass-material-demo` (NEW, born-RED — the demo-route SOURCE-STRUCTURE falsifier).** A
  source-parse of `demo/stories/substrates/glass-material.vue` asserting the four bindings the story
  narrates are actually present: **(a)** the SFC imports + calls `useSpecularTracking` AND binds a
  `@pointermove`/`:style` specular write on a headline plate (the seam is composed, not narrated);
  **(b)** the tint control writes a non-zero `--glass-tint-strength` companion wherever it writes
  `--glass-tint-source` (the `color-mix` is no longer a `0%` no-op); **(c)** ZERO `glass-btn` token in
  the SFC (a DELETION-PROOF — the abused icon-button is gone) AND ≥1 `<Button variant="glass">`
  (the idiomatic replacement); **(d)** a rim on/off (or dark-plate) contrast device is staged. **Born-RED
  at HEAD** (the SFC composes no `useSpecularTracking`, writes no `--glass-tint-strength`, carries
  `glass-btn !h-12 !w-44`, and stages no rim contrast device). This is a **source-structure** gate (the
  SFC text is the artefact — a Vue SFC binding is a source-structure assertion, the precept-valid form
  per SPEC.md §Hard Gates; the RUNTIME paint is proven by the π arm below, NOT this text gate). **bite-
  check:** strip the `useSpecularTracking` binding → RED; zero the `--glass-tint-strength` write → RED;
  re-introduce `glass-btn` → RED.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion; the cardinal lesson
made machinery — a green source gate over a dead-plates render is the exact AW failure class).** A live
Playwright + frontend-design pass in the W00 `tests-visual/` π workspace, driving the real demo route
`/substrates/glass-material` over the live Aurora backdrop:

- **`tests-visual/glass-material-demo.spec.ts` (NEW, fail-CLOSED).** Drive the route; `page.hover` a
  headline rung/card plate and move the pointer across it; read back the host's `--mouse-x` write AND the
  `::before` catch-light paint, asserting the specular glow MOVES with the pointer (non-flat, position-
  tracking — the passthrough/unwired state has zero `--mouse-x` and a flat `0`-opacity `::before`). Click
  an "aurora rose"/"aurora teal" tint sample and assert the plate's computed background MEASURABLY shifts
  (the `color-mix` now bites; the `0%`-strength HEAD state shifts zero). **Born-RED at HEAD** (no
  `--mouse-x` write ever appears; the tint click shifts nothing). Exit non-zero — never SKIP-with-EXIT=0
  — when the harness is present (the W00 fail-CLOSED contract).

- **The frontend-design judgement (the human ENRICHMENT side):** the headline section reads as LIVE glass
  — the catch-light follows the cursor across every rung + card, NOT dead flat plates; the tint samples
  visibly bias the surface toward the sampled hue; the squircle fold reads on a clean `.glass-card` + a
  real glass `<Button>` (no misshapen coerced bar); the subtle rim is legible against its on/off contrast
  device. Affordance / hierarchy / NO visual occlusion / no regression on the surrounding sections per the
  AX cardinal gate.

**The wave does NOT close on the headless gate alone** — the executed live π audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, per the W00 protocol) is the binding close
criterion. The BEFORE capture pins the HEAD dead-plates render (no moving specular, inert tint, misshapen
glass-btn) the reauthored story must visibly beat.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the four RED witnesses against HEAD `002bda5`
   on the live demo route `/substrates/glass-material`: the absent `useSpecularTracking`/`--mouse-x`, the
   `--glass-tint-strength`-less tint, the `glass-btn !h-12 !w-44` abuse, the device-less rim. Capture the
   BEFORE π render (dead flat plates, inert tint click) as the born-RED baseline in
   `audit/W48-glass-material-demo.json`. Do NOT proceed on the audit's word — re-prove.
2. **Author the born-RED gates.** Author `scripts/proof-glass-material-demo.mjs` (the four source-structure
   assertions) + `tests-visual/glass-material-demo.spec.ts` (the live moving-specular + biting-tint π arm);
   register `proof:glass-material-demo` in `package.json` + `gates.mjs`; confirm BOTH FAIL at HEAD.
3. **Reauthor the SFC body.** Compose `useSpecularTracking` + bind `:style`/`@pointermove` on each headline
   plate; set BOTH `--glass-tint-source` + a non-zero `--glass-tint-strength` on the tint plate; replace the
   `glass-btn` squircle bar + tint-sample buttons with `.glass-card` + `<Button variant="glass">`; stage the
   rim on/off contrast device. Lint + typecheck.
4. **Gates GREEN + VISUAL-TRUTH.** Confirm `proof:glass-material-demo` passes; run the fail-CLOSED π live
   audit (moving specular tracks the pointer, tint click biases the surface, squircle on idiomatic surfaces,
   rim legible against its device) + the frontend-design judgement; capture the paired-π BEFORE/AFTER +
   DELTA; write `audit/W48-glass-material-demo.json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W48-glass-material-demo.json` — the born-RED→GREEN ledger: the four RED witnesses
  (the absent seam, the inert tint, the abused glass-btn, the device-less rim), the zero-library-edit
  confirmation, the W09-seam-consumed + W18-sequence notes, and the post-wave GREEN structure + π-readback
  measurements.
- `scripts/proof-glass-material-demo.mjs` — the NEW demo-route source-structure gate.
- `tests-visual/glass-material-demo.spec.ts` — the NEW fail-CLOSED π live arm (moving specular + biting tint).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the `/substrates/glass-material` route
  BEFORE (dead flat plates, inert tint click, misshapen glass-btn) vs AFTER (pointer-tracked catch-light,
  surface-biasing tint, idiomatic squircle + legible rim).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(demo): proof:glass-material-demo born-RED + glass-material π spec — assert the story binds the shipped seams (AX.W48 D8)`
2. `fix(demo): reauthor glass-material — compose useSpecularTracking, bite the adaptive tint, retire the abused glass-btn, add a rim contrast device (AX.W48 D8)`
3. `chore(AX.W48): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA (dead-plates → live specular)`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash
per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn + why)

- **AX.W09 (specular tune-to-subtle) — HARD.** W09 owns the `--glass-specular-intensity-rest: 0` dormancy
  + ships the `useSpecularTracking` seam this wave BINDS. W48 must run AFTER W09 so the seam + the dormant-
  at-rest token cohort it composes against are settled (binding the seam against a pre-W09 louder recipe
  would mis-tune the demo). W09 is COMPLETE.
- **AX.W00 (π visual-runtime lane) — the close machinery.** The live moving-specular + biting-tint VISUAL-
  TRUTH audit rides the W00 `tests-visual/` fail-CLOSED workspace; W48 adds one `.spec.ts` sibling. W48
  cannot close on the headless source gate alone — W00 stands up the lane it closes on.
- **SEQUENCE-AFTER AX.W18 (storybook IA) — shared-file, not a dependsOn.** W18 may RELOCATE/rename the SFC
  (moves/renames only); W48 rewrites its body. They must not race the same file — W48 lands the body rewrite
  before W18 frames the tree, or rewrites at W18's settled path. A sequencing note, not a blocking dep.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

- **GESTALT over patch / no-workaround.** The story is REAUTHORED to bind the shipped seams idiomatically,
  not patched to narrate absent ones. The `useSpecularTracking` seam is the DRY library-blessed path — NO
  hand-rolled `--mouse-x` math, NO per-plate copy (that would re-introduce the exact duplication W09's seam
  killed).
- **Component-over-class.** The squircle fold + tint selector use the real `<Button variant="glass">`
  component (the four-state interactive contract), not a static `.glass-btn` class coerced into a control
  shape it is not.
- **Token-first / never `hsl(var(--token))` / alpha via `color-mix` in srgb.** The wave writes NO new token
  and NO library token override — it sets the SHIPPED `--glass-tint-source` + `--glass-tint-strength` demo
  knobs the grammar reads (the consumer-facing tint dial), inside the ≤30% house ceiling. Zero library edit.
- **no-overfitting (substrate-with-consumer; the demo-helper bar).** The seam this wave binds
  (`useSpecularTracking`) is already a ≥2-consumer DRY home (Card + DockIconButton per its header); this
  wave makes the glass-material demo a THIRD, intended consumer — wiring an EXISTING seam to its showcase,
  not minting a new one. The reauthored SFC is a private demo story (the demo-helper bar).
- **π visual-runtime lane / Gates-close-on-evidence (the cardinal lesson).** `proof:glass-material-demo` is
  a SOURCE-STRUCTURE gate (the SFC binding is the artefact); the RUNTIME truth (the painted moving specular,
  the biting tint) is proven by the fail-CLOSED π `.spec.ts` readback, NEVER the text gate alone. The wave's
  close is the executed live audit — a green source gate over a dead-plates render is the exact AW failure
  class this lane exists to close.
- **binding-verification (glass-ui MEMORY — stale/absent bindings silently no-op).** An unbound
  `useSpecularTracking` and a `--glass-tint-strength`-less tint are precisely the silent-no-op class (the
  `var()` resolves to the dormant/zero default with no error; vue-tsc + units miss it). The π live arm is
  the e2e falsifier this class demands.
