# AY.W-CON3 — Constellation `?freeze` deterministic-capture seam + the anomaly/resolved `drawOverlay` recipe; export VERIFY

**State:** OPEN · **Repo:** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **Band:** A (perfect+export the lib)
**Depends on:** AY.W-CON1 (the auto-DRIFT target-source — the recipe pins its anomaly skin to the W-CON1 drift focal; without the wander source the recipe is a static pin).
**Unblocks:** L.W-ADOPT (E5 — the slides pptx + shoot deploy capture; E6 — the slides decl-model port). This wave is the glass-ui PRE-REQ for the slides constellation adoption: the bespoke `slides/src/decks/til-briefing/constellation.ts` cannot be deleted and `@mkbabb/glass-ui/constellation` consumed until the deterministic-capture seam + the anomaly recipe land at the ROOT.

---

## Goal criterion

The glass-ui `Constellation` component is CONSUMABLE by the slides deploy pipeline without regressing
the two seams that today live ONLY in the bespoke `constellation.ts` copy L.W-ADOPT is slated to
DELETE: (1) a `?freeze` URL-driven deterministic-capture hook that lays out a REPRODUCIBLE STATIC
frame (seeded layout + zero stepping + a frozen `now` to the overlay), so the slides pptx export +
visual shoot render an identical constellation frame-over-frame, and (2) the anomaly/resolved/callout
SKIN expressed as a documented `drawOverlay` recipe pinned to the W-CON1 auto-drift focal node — so the
slides `data-anomaly`/`data-resolved`/`data-anomaly-label` decl-model has a clean re-authoring target
in the consumer, NOT a domain-specific prop bolted onto the library. After this wave, deleting the
bespoke copy and consuming the lib component is a behaviour-preserving swap for the deploy capture and
the anomaly mark, and the slides-side `proof:no-bespoke-constellation` gate has an AUTHORED spec whose
RED→GREEN is L.W-ADOPT's close condition.

## Completion criterion

The single hard gate below verifies: a NEW `proof:constellation-freeze-live` π readback proving two
back-to-back `?freeze` mounts produce a BYTE-IDENTICAL static frame (the determinism truth — a
node-position + overlay-phase hash match across runs, not a "looks frozen" screenshot); a frozen frame
that does NOT advance (a second observation at a later `now` hashes identically — no drift, no ripple,
no warp advance, a frozen overlay phase); the `?freeze` hook auto-derives from `location.search`
matching `export|print|freeze` AND is overridable by an explicit `:freeze` prop; the anomaly `drawOverlay`
RECIPE is shipped in the README (a copy-pasteable consumer skin pinned to `field.warp.{x,y}`) and
exercised by a demo route; the export surface VERIFY (`proof:constellation-substrate-single` +
`verify-export-types` resolve `@mkbabb/glass-ui/constellation` with the `freeze` prop in the dts); the
slides-side `proof-no-bespoke-constellation.mjs` gate spec is AUTHORED in this doc (§5, copy-in-ready for
L.W-ADOPT); and a captured before/after DELTA artefact (the slides cover slide under `?freeze`, bespoke
vs lib, identical) registered in `AY/PROGRESS.md` so `proof:live-verified-ledger` passes on this row.

---

## §0 — RE-GROUND (pre-implement; from `audit/hardening/b2/B2-readiness.md` §2)

W-CON3 was authored at the PRE-Batch-2 base. The `?freeze` seam, the anomaly `drawOverlay` recipe
(no domain props), and the export VERIFY are all gestalt-correct — the wave is RE-GROUND (refresh
the cites), NOT re-design. Step-0 re-grep mandated.

**RG-A (stale cites, +143 lines).** At HEAD `constellationField.ts` is **653** (not the cited 510)
and `Constellation.vue` is **353** — W-CON1 inserted the `wander` cadence (the `field.wander` block,
the `now`/`rng` `stepField` params, the new demo refit+auto-drift section). The render-loop guards
W-CON3 folds its `freeze` predicate INTO have shifted: the `!handle.reducedMotion` step block is now
~`Constellation.vue:216-218`, the warp listener ~`:290`, `readPalette` ~`:202` (the spec cites
`:172-185`/`:149-185`/`:161`/`:78`). The demo handle the freeze π gate mirrors (`__constellationWarp`)
is now at `demo/stories/substrates/constellation.vue:112`, and W-CON1 added `__constellationRefit` at
`:128` — the W-CON3 `__constellationFreeze` handle lands ALONGSIDE these two (the cite is stale, the
pattern intact). Re-grep every cite before editing.

**RG-B (the core defect HOLDS).** D1's `grep location.search src/components/custom/constellation/` →
**0 hits** is STILL TRUE at HEAD (verified) — the `?freeze` seam genuinely does not exist; the wave's
reason-to-exist is intact.

**RG-C (the W-CON1 dependency is SATISFIED).** W-CON3's anomaly recipe pins to `field.warp.{x,y}`; W-CON1
landed `wander` re-pointing the warp to a drifting node, so the anomaly can pin to a LIVE-wandering
focal as designed. Good — no dependency hole.

**RG-D — serialization unchanged.** W-CON1 (landed) → W-CON2 → W-CON3 serial (all edit
`Constellation.vue` render-loop + `constellationField.ts` + the demo story). Re-base the cites first.

---

## §1 — The verified defect (file:line)

### D1 (DEPLOY-CHAIN REGRESSION) — glass-ui `Constellation` has NO `?freeze` deterministic-capture seam; it freezes ONLY under `prefers-reduced-motion`. Adopting the lib without porting the seam REGRESSES the pptx + shoot capture.

The slides bespoke engine reads `location.search` for `export|print|freeze` and lays out a
REPRODUCIBLE STATIC frame (seeded PRNG, no live RAF) so the deck's visual snapshots are stable
frame-over-frame:

> `slides/src/decks/til-briefing/constellation.ts:447-462`
> ```ts
> // a deterministic capture (?export / ?print / ?freeze) lays out a reproducible,
> // STATIC web — seeded PRNG, no live RAF — so the deck's visual snapshots are
> // stable frame-over-frame (the fix for masking the whole full-bleed canvas).
> const deterministic = /[?&](export|print|freeze)/.test(location.search);
> const reduceMotion =
>     deterministic || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
> // ...
> canvases.forEach((c, i) =>
>     instances.push(new Constellation(c, reduceMotion,
>         deterministic ? mulberry32(0x1f2e3d ^ Math.imul(i + 1, 2654435761)) : Math.random)));
> ```

The deploy chain DEPENDS on this: `slides/scripts/pages-deploy.sh` step 3b → `export-pptx.mjs` and
`slides/scripts/shoot.mjs` render the deck under these flags and rely on a frozen, deterministic
constellation (a non-deterministic field defeats the perceptual-diff specs + the `?export` static
render).

glass-ui's `Constellation.vue` freezes ONLY under reduced-motion, and EVEN THEN it still ADVANCES the
overlay phase via the live `now`:

> `src/components/custom/constellation/Constellation.vue:172-185`
> ```ts
> // Step the field unless the substrate is frozen (reduced-motion paints one
> // static frame, no drift, no warp advance).
> if (!handle.reducedMotion) {
>     const livePointer = pointerReactive ? pointer : null;
>     stepField(field, k, speed, livePointer, dt);
> }
> c.clearRect(0, 0, w, h);
> drawEdges(c, field, link, palette);
> drawNodes(c, field, palette);
> // ...
> // The consumer skin runs LAST with the live field.
> drawOverlay?.(c, field, now);   // ← `now` keeps advancing even under PRM
> ```

There is no URL-driven `?freeze` hook (`grep location.search src/components/custom/constellation/` →
0 hits, confirmed). Two regressions follow on adoption:

1. **Node layout determinism is NOT URL-driven.** The lib has a `seed` prop, but a consumer that wants
   a frozen capture must KNOW to set `seed` AND that the pipeline is in capture mode — the slides
   pipeline drives this off `location.search`, a contract the lib does not honour. A bare
   `<Constellation>` in the deck under `?freeze` lays out a FRESH `Math.random` field each load — the
   capture is non-reproducible.
2. **The overlay phase ADVANCES even when frozen.** The slides anomaly pulse phase is
   `reduceMotion ? 0.5 : (now % 2600) / 2600` (`constellation.ts:331`). glass-ui passes the live `now`
   to `drawOverlay` UNCONDITIONALLY — even under PRM (`Constellation.vue:185`). So a consumer skin's
   `now`-derived phase varies every frame even when the field is frozen; two captures of the "static"
   frame differ in the pulse-ring radius. The freeze must clamp the `now` HANDED TO THE OVERLAY, not
   just stop the field step.

**This is the "fix at the ROOT" precept**: the deterministic-capture intelligence lives in the
consumer and must be transposed UP into the library, not deleted. The `?freeze` seam is NOT
deck-domain content — every consumer with a pptx/print/screenshot pipeline needs a deterministic
static frame, so it clears the ≥2-consumer bar as a generic capability (it generalizes the existing
PRM one-static-frame path that ALL consumers already inherit from `useCanvas2D`).

### D2 (GAPS-FOUND) — glass-ui has NO anomaly/resolved/callout skin and the README ASSERTS the slides decl-model "stays a consumer skin" without shipping the recipe. The migration target is unspecced.

The slides decl-model is a `<canvas data-constellation data-anomaly data-resolved data-anomaly-label
data-count>` markup contract read by the bespoke engine, with the anomaly SKIN painted by `drawAnomaly`:

> `slides/src/decks/til-briefing/slides/SlideTitle.vue:14-15`
> ```html
> <canvas class="scatter" data-constellation data-anomaly="0.60,0.36"
>         data-anomaly-label="anomaly" data-count="70" aria-hidden="true"></canvas>
> ```
> (`SlideHandoff.vue:14-15` `data-anomaly="0.46,0.30" data-anomaly-label="resolved"`;
> `SlideAsk.vue:39-40` adds the `data-resolved` flag.)

The skin (`constellation.ts:327-399`, `drawAnomaly`) paints: a pulse ring (`(now % 2600)/2600` phase),
an inner ring, a soft halo, a core dot, an optional resolved-checkmark, and a dashed monospace callout
label pinned to the anomaly node. The anomaly is the PINNED node (`nodes[0]`) seeded at the fractional
`data-anomaly` anchor and wandering ±0.14 of it (`constellation.ts:209-231`, `drift`).

glass-ui's `Constellation.vue` props are `count/link/speed/seed/pointerReactive/warpOnClick/
drawOverlay/class` (`Constellation.vue:55-92`) — **there is NO `anomaly` position prop, NO `resolved`
prop, NO `label` prop**. The README (`README.md`) + the file header (`Constellation.vue:30-44`) assert
the branded skin "is the consumer's `drawOverlay(ctx, field, now)` pass" and "zero deck-domain content
lives in the component" — CORRECT as a principle, but the recipe a slides skin needs (how to pin the
anomaly to a real node, how to read the resolved/label state, how to express the pulse phase against a
freeze-clamped `now`) is NOT documented. L.W-ADOPT must RE-AUTHOR `drawAnomaly` as a `drawOverlay` fn,
and today it has no reference recipe.

**The decision (per the ≥2-consumer bar + the canon already in the file header):** glass-ui does NOT
grow `anomaly`/`resolved`/`label` props. They are deck-domain content (one consumer, a pinned red dot
with a monospace callout) and would VIOLATE the "zero deck-domain content lives in the component"
canon the file header already states. Instead the wave ships (a) the GENERIC `freeze` seam (D1) and
(b) the anomaly SKIN as a documented, copy-pasteable `drawOverlay` RECIPE in the README pinned to the
W-CON1 auto-drift focal (`field.warp.{x,y}`) + a demo route exercising it. This keeps the library
neutral and gives L.W-ADOPT an exact re-authoring target — the gestalt-correct call, not a domain
prop bolted on for one slide.

### D3 (NOT-COHESIVE) — the AY.W-CON3 hard gate names `proof:no-bespoke-constellation`, a gate that DOES NOT EXIST and is MIS-HOMED.

`ls scripts/ | grep bespoke` → NONE (both repos: `grep no-bespoke glass-ui/package.json
glass-ui/scripts/ slides/package.json slides/scripts/` → 0 real hits, only the workflow-script prose
that spawned this audit). The prior AY plan placed the gate in glass-ui (AY.W-CON3, this repo) — WRONG
REPO: a gate asserting the SLIDES bespoke copy is gone must inspect `slides/src/`, so it MUST live in
the slides repo. This wave AUTHORS the gate SPEC (§5, copy-in-ready) but the gate's HOME and its
RED→GREEN are L.W-ADOPT (slides). A grep-for-deletion alone is insufficient per the hard-gate
discipline — the slides gate pairs the deletion-proof with a `vite build` resolving the lib import + a
3-slide capture (the behaviour-delta proof).

---

## §2 — Objective

GROW the `?freeze` deterministic-capture seam in glass-ui, SHIP the anomaly `drawOverlay` recipe (NOT
a domain prop), VERIFY the export surface carries the new prop, and AUTHOR the slides-side
`proof:no-bespoke-constellation` gate spec. The library stays neutral; the deck-domain content stays
in the consumer with a clean recipe to re-author against.

Four units:

- **W-CON3.1 — the `?freeze` deterministic-capture seam.** Add a `freeze?: boolean` prop that, when
  `true` (or auto-derived from `location.search`), lays out a STATIC reproducible frame: seed the
  field deterministically, do NOT advance `stepField`, and hand the overlay a FROZEN `now` so a
  phase-driven skin resolves to a fixed value. Unifies with the existing PRM static-frame path.
- **W-CON3.2 — the anomaly `drawOverlay` recipe.** Document a copy-pasteable consumer skin (pulse
  ring + resolved-check + dashed callout) pinned to `field.warp.{x,y}` (the W-CON1 auto-drift focal),
  reading a freeze-clamped `now` for the phase. Add a demo route that mounts it (the ≥2nd consumer +
  the W-DOC1 README example). NO `anomaly`/`resolved`/`label` props on the component.
- **W-CON3.3 — the export VERIFY.** Confirm `@mkbabb/glass-ui/constellation` resolves with the new
  `freeze` prop in the emitted dts; the `ConstellationProps` api type carries it.
- **W-CON3.4 — the slides-side gate spec.** Author `proof-no-bespoke-constellation.mjs`'s spec (§5):
  deletion-proof + no-`createConstellations`-survivor + lib-import-resolves + 3-slide both-mode
  capture. Homed in slides; its RED→GREEN is L.W-ADOPT.

**Goal:** after this wave the slides deploy capture and the anomaly mark survive adoption unchanged,
and L.W-ADOPT has the exact `drawOverlay` recipe + the gate spec it needs.

---

## §3 — The exact edit-sites

### W-CON3.1 — `src/components/custom/constellation/Constellation.vue`

**Add the `freeze` prop** to the `defineProps` block (after `warpOnClick`, `:78`):

```ts
/**
 * Deterministic-capture freeze. When `true`, the lattice lays out ONE
 * reproducible STATIC frame and does NOT advance — seeded layout (requires
 * `seed` for a stable field; an unseeded freeze still freezes but lays out a
 * one-shot Math.random frame), no `stepField`, no ripple/warp advance, and a
 * FROZEN `now` handed to `drawOverlay` so a phase-driven skin resolves to a
 * fixed value (the pulse-ring radius is identical frame-over-frame). Omit to
 * AUTO-DERIVE from `location.search` matching `export|print|freeze` (the deploy
 * pipeline contract — a consumer's pptx / print / screenshot capture gets a
 * stable frame with zero per-consumer wiring). An explicit `:freeze="false"`
 * forces live even under a capture URL. Unifies with the reduced-motion
 * one-static-frame path — `freeze || reducedMotion` is the single static-frame
 * predicate.
 */
freeze?: boolean;
```

**Resolve the freeze predicate** (in `<script setup>`, before `onMounted` or at the top of the render
closure — a `computed`/const reading `props.freeze ?? urlFreeze`):

```ts
// The deterministic-capture predicate. An explicit `freeze` prop wins; omitted,
// it AUTO-DERIVES from the capture URL (?export / ?print / ?freeze) — the
// deploy-pipeline contract. SSR-safe (no `location` off-window).
const urlFreeze =
    typeof window !== "undefined" &&
    /[?&](export|print|freeze)\b/.test(window.location.search);
const isFrozen = computed(() => props.freeze ?? urlFreeze);
```

**Clamp the render loop** (the size-change / step / overlay-`now` branches, `:149-185`):

1. The static-frame predicate becomes `isFrozen.value || handle.reducedMotion` — gate `stepField`,
   `drawPointerWeb`, `drawRipples` on its NEGATION (a frozen frame paints edges + nodes + the overlay,
   no live passes), folding the freeze into the EXISTING `!handle.reducedMotion` guards (ONE predicate,
   not a parallel branch).
2. Hand the overlay a FROZEN `now` when static: pass `drawOverlay?.(c, field, frozenNow)` where
   `frozenNow` is a STABLE constant (`0`, or a fixed sentinel) under freeze, the live `now` otherwise.
   This is the load-bearing fix — a phase-driven skin (`(now % T)/T`) must resolve to a fixed phase
   under freeze, exactly as the slides skin's `reduceMotion ? 0.5` clamp does.
3. The PRM-listener-not-registered policy EXTENDS to freeze: pointer/warp listeners are NOT registered
   when `isFrozen.value` (a frozen capture takes no input) — fold into the existing
   `&& !handle.reducedMotion` guards at `:214` and `:246`.

**Seed under freeze:** when `isFrozen.value && seed === undefined`, the field still lays out ONE
Math.random frame (frozen at mount — reproducible WITHIN a run, the determinism gate seeds explicitly
to assert ACROSS runs). The recipe + the slides skin set `seed` for cross-run determinism; the prop
docstring states this.

### W-CON3.2 — the anomaly recipe (README + demo route)

- **`src/components/custom/constellation/README.md`** — add a "## Anomaly skin recipe" section: a
  copy-pasteable `drawOverlay` fn that pins a pulse-ring + core + optional resolved-check + dashed
  callout to `field.warp.{x,y}` (the W-CON1 auto-drift focal), reading the freeze-clamped `now` for
  the phase (`const phase = (now % 2600) / 2600`). The recipe IS the transposed slides `drawAnomaly`
  (`slides/src/decks/til-briefing/constellation.ts:327-399` — the fn opens at `:327`, the pulse phase
  `reduceMotion ? 0.5 : (now % 2600)/2600` at `:331`, verified at slides HEAD), neutralized of
  deck-domain wording. The fractional anchor + label + resolved are CONSUMER state closed over the fn
  (NOT lib props) — the recipe shows the closure shape.
- **`demo/stories/substrates/constellation.vue`** (extend the EXISTING constellation story — it already
  ships the `drawFocal`/`drawWarpFocal` overlays + the `__constellationWarp` handle at `:97-110`; do NOT
  spawn a parallel story file) — add an anomaly-recipe section that mounts
  `<Constellation :freeze :seed warpOnClick :drawOverlay>` with the recipe overlay, on a dedicated demo
  canvas. This is the ≥2nd consumer (alongside slides post-adopt) AND the W-DOC1 README live example.
  **Mint a `window.__constellationFreeze` test handle** (mirroring the `__constellationWarp` window
  expose at `:105-108`) exposing the frozen instance's `field` + the painted overlay observables (the
  pulse-ring radius), so Leg 1's π spec can read the node-position + overlay-phase hash per run WITHOUT
  a grep. Verify by `npm run dev` + the demo route renders the anomaly mark.

### W-CON3.3 — export VERIFY (no source edit beyond the type flow-through)

- **`src/components/custom/constellation/constellationField.ts:114-139`** — the `ConstellationProps`
  type adds `freeze?: boolean` (kept in sync with the SFC `defineProps`). `api/index.ts:209-221`
  already re-exports `ConstellationProps`, so the new prop flows to `@mkbabb/glass-ui/api` for free.
- VERIFY: `npm run build && npm run verify-export-types` resolves `@mkbabb/glass-ui/constellation` and
  the emitted `dist/constellation.d.ts` carries `freeze?: boolean` on the component prop type
  (a dts grep on the BUILT artefact, not the src).

### W-CON3.4 — the slides-side gate spec (authored here, copy-in-ready for L.W-ADOPT)

See §5. The gate file is `slides/scripts/proof-no-bespoke-constellation.mjs`; the `proof:no-bespoke-
constellation` script entry lands in `slides/package.json`. NO glass-ui edit — the spec is authored in
this doc and L.W-ADOPT copies it in.

---

## §4 — The HARD GATE (evidence-backed)

A single binding condition with five artefact-verifiable legs. ALL must hold.

### Leg 1 — `?freeze` produces a deterministic static frame (the determinism truth, π readback)

NEW gate `proof:constellation-freeze-live` (`scripts/proof-constellation-freeze-live.mjs` + the π spec
`tests-visual/constellation-freeze-live.spec.ts`), a byte-for-byte structural mirror of the shipped
`proof:constellation-warp-live` driver (`scripts/proof-constellation-warp-live.mjs`): it resolves the
Playwright runner across BOTH the hoisted-root and `tests-visual/node_modules/.bin/playwright` layouts
(`:30-39`), INVOKES the spec via `spawnSync(PW_BIN, ["test", "constellation-freeze-live.spec.ts", …])`,
parses the JSON report, writes a `gateArtifactPath` artefact, EXITS NON-ZERO on any spec failure when the
π workspace is present (`workspacePresent()` true → fail-closed, `:80-95,128-136`), and SKIPs-with-exit-0
ONLY on genuine device-absence (no installed `@playwright/test`). The spec resolves the scene via
`resolveScene("substrates", "constellation")` (`tests-visual/pi-manifest.ts:57` — do NOT edit `PI_TARGETS`
at `:70`). A new `proof:constellation-freeze-live` script entry lands in `package.json` next to
`proof:constellation-warp-live` (`:644`). The π spec:

1. Mounts the REAL `<Constellation :freeze="true" :seed="'ay-w-con3'" :drawOverlay="pulseRecipe">`
   on a real device (the recipe overlay paints a `now`-phased pulse ring).
2. **Cross-run determinism:** mounts the SAME component TWICE (two page loads / two instances), reads
   back — off the `window.__constellationFreeze.field` handle (W-CON3.2) — a hash of `field.nodes`
   positions + the painted overlay pulse radius after first paint, asserts the two hashes are
   **BYTE-IDENTICAL**. A non-seeded-determinism / live-`now` leak REDs here.
3. **Frame-stillness:** on ONE frozen instance, samples the `__constellationFreeze` node-position +
   overlay-phase hash at frame 1 AND at a later `now` (after a `requestAnimationFrame` advance / a
   forced re-render), asserts the two hashes are IDENTICAL — no drift, no ripple, no warp advance, a
   FROZEN overlay phase. A live-`now` handed to the overlay (D1.2) REDs here even if node layout is
   frozen.
4. **Auto-derive:** mounts `<Constellation :drawOverlay>` (freeze prop OMITTED) under a `?freeze` URL,
   asserts the frame is static (the URL hook fires); mounts under no capture URL, asserts the field
   advances (the live path). Born-RED at HEAD: with no `freeze` seam the static-frame assert REDs (the
   field always advances).

FAIL-CLOSED: when Playwright resolves, a non-deterministic / advancing frozen frame exits NON-ZERO —
never SKIP-with-EXIT=0 (the cardinal AX precept; the genuine device-absence SKIP stays only on a
zero-dep runner).

### Leg 2 — the anomaly `drawOverlay` recipe is shipped + exercised

- `src/components/custom/constellation/README.md` carries a "## Anomaly skin recipe" section with a
  complete, copy-pasteable `drawOverlay` fn pinned to `field.warp.{x,y}`, reading a freeze-clamped
  `now`. Verified by document presence + the recipe compiling in the demo route.
- A demo route (`demo/stories/.../constellation-anomaly.vue` or the extended existing story) mounts
  `<Constellation :freeze :seed warpOnClick :drawOverlay>` with the recipe. Verified by `npm run dev`
  rendering the anomaly mark (a captured screenshot in `AY/PROGRESS.md`).
- NO `anomaly`/`resolved`/`label` props exist on the component (a grep on the SFC `defineProps` block
  asserts the neutral surface is preserved — the ≥2-consumer / zero-deck-domain canon held).

### Leg 3 — the export surface VERIFY (built-artefact, not src)

`npm run build && npm run verify-export-types` GREEN, AND the BUILT `dist/constellation.d.ts` carries
`freeze?: boolean` on the component prop type (a dts grep on the emitted artefact). `proof:constellation-
substrate-single` stays GREEN (the freeze fold does not spawn a second rAF / a second substrate). The
`@mkbabb/glass-ui/api` `ConstellationProps` carries `freeze` (api dts grep).

### Leg 4 — the slides-side `proof:no-bespoke-constellation` gate SPEC is authored (this doc, §5)

§5 below carries the complete, copy-in-ready spec for `slides/scripts/proof-no-bespoke-
constellation.mjs` + its `package.json` entry: the deletion-proof + no-`createConstellations`-survivor
+ lib-import-resolves assertions. Its RED→GREEN lands in L.W-ADOPT (slides repo). Leg 4 is satisfied by
the SPEC's presence in this doc (the gate's HOME is slides, named explicitly — the wrong-repo defect
D3 corrected).

### Leg 5 — the captured DELTA (cardinal lesson, gate-machinery-pinned)

A before/after DELTA at `docs/tranches/AY/audit/visual/W-CON3-DELTA.md` referencing the own-surface
PNGs of THIS wave's surface — the glass-ui DEMO anomaly route (the W-CON3.2 demo story) rendered under
`?freeze` with the LIB `<Constellation :freeze :seed :drawOverlay>` + the recipe overlay, captured as
`W-CON3-freeze-anomaly-<viewport>-light.png` AND `…-dark.png` (the `^W-CON3-` own-surface prefix + the
{light,dark} floor `proof:live-verified-ledger:ay` enforces — `ownSurfaceVerdict:135,147-152`). The DELTA
doc carries the determinism NUMBERS from Leg 1 (the two cross-run node+overlay hashes are EQUAL; the
frame-1-vs-later-`now` hashes are EQUAL) — the deterministic-frame proof. The bespoke-vs-lib
perceptual-identity capture (the slides cover under `?freeze`, bespoke vs lib) is the L.W-ADOPT close
artefact (it needs the slides repo + the adopted lib); THIS wave's DELTA is the glass-ui-side
demo-route freeze capture (the surface this wave actually changes). The `W-CON3` `AY/PROGRESS.md` row
status flips `planned → live-verified` (or `complete` + add `W-CON3` to `VISUAL-ALLOWLIST.json`);
`npm run proof:live-verified-ledger:ay` passes on the W-CON3 row (gate-defined by the own-surface
{light,dark} DELTA, not author-asserted).

**The gate is the conjunction:** Leg 1 (π determinism + stillness + auto-derive, born-RED→GREEN) ∧
Leg 2 (recipe + demo, no domain props) ∧ Leg 3 (built-dts `freeze` + export resolve) ∧ Leg 4 (slides
gate spec authored) ∧ Leg 5 (captured DELTA in PROGRESS). Any leg RED blocks the close.

---

## §5 — The slides-side `proof:no-bespoke-constellation` gate (authored spec, copy-in-ready for L.W-ADOPT)

**Home:** `slides` repo (`/Users/mkbabb/Programming/slides`). **NOT glass-ui** (D3 — it inspects
slides `src/`). **RED→GREEN:** L.W-ADOPT (RED at HEAD — the bespoke copy + the scanner exist; GREEN
once L.W-ADOPT deletes them and adopts the lib).

**File:** `slides/scripts/proof-no-bespoke-constellation.mjs`
**`package.json` entry:** `"proof:no-bespoke-constellation": "node scripts/proof-no-bespoke-constellation.mjs"`

**Assertions (fail-closed, exit NON-ZERO on any miss):**

1. **Deletion-proof.** `slides/src/decks/til-briefing/constellation.ts` does NOT exist
   (`fs.existsSync` → false). The bespoke engine (547 lines at slides HEAD — `wc -l` verified, NOT the
   510 of glass-ui's `constellationField.ts`) is gone.
2. **No `createConstellations` survivor.** A repo grep over `slides/src/` for `createConstellations`
   AND `ConstellationController` AND `data-constellation` returns ZERO hits — the imperative DOM-scan
   controller + its markup contract are fully removed (no orphan import, no dead canvas attribute).
3. **Lib import resolves.** `slides/src/decks/til-briefing/` (the deck + the three slides) imports
   `Constellation` from `@mkbabb/glass-ui/constellation` (a grep asserts the import is PRESENT), AND
   `node -e 'import("@mkbabb/glass-ui/constellation")'` resolves against the slides `node_modules` (the
   pin advanced to the AY publish — the substrate is consumable, not a phantom import).
4. **Freeze-seam consumed.** At least one slide mounts `<Constellation>` reading the `freeze` seam
   (an explicit `:freeze` bind OR relying on the auto-`location.search` derive — a grep + a comment
   asserts the deploy capture path is wired), so the pptx/shoot determinism is preserved post-adopt.

**Paired artefact (NOT grep-only — the hard-gate discipline):** the slides `vite build` GREEN (the lib
import resolves at build time) + a 3-slide both-mode capture (Title/Handoff/Ask, light+dark, under
`?freeze`) registered in the L.W-ADOPT close — the behaviour-delta proof the deletion did not regress
the anomaly mark, the resolved-check, or the deploy capture.

**Born-RED at HEAD (slides repo, verified):** `slides/src/decks/til-briefing/constellation.ts` exists
(547 lines — assertion 1 REDs); `createConstellations` is IMPORTED at `slides/src/decks/til-briefing/deck.ts:3`
and CALLED at `deck.ts:39` (`const c = createConstellations(root)` — assertion 2 REDs); the freeze seam
lives bespoke at `constellation.ts:447-462` (`/[?&](export|print|freeze)/.test(location.search)`); the
three slides carry the `data-constellation data-anomaly`/`data-resolved`/`data-anomaly-label` markup
(`SlideTitle.vue:14-15`, `SlideHandoff.vue:14-15`, `SlideAsk.vue:39-40`). The gate cannot pass until
L.W-ADOPT deletes the engine + the scanner and adopts the lib — exactly the RED→GREEN a hard gate
requires.

---

## §6 — Non-goals (explicit, to bound the wave)

- **NO `anomaly`/`resolved`/`label`/`count`-anchor props on the component.** They are deck-domain
  content (D2 decision); the `drawOverlay` recipe is the migration target. Adding them would violate
  the ≥2-consumer bar + the "zero deck-domain content" canon already in the file header.
- **NO multi-instance scanner / `createConstellations` equivalent in glass-ui.** The slides DOM-scan
  controller is deck-orchestration, not field-engine (H-constellation F2). It stays slides-local glue
  (or the deck mounts N `<Constellation>` SFCs) — that decision is L.W-ADOPT's, not this wave's. glass-ui
  ships the per-instance SFC; the scanner does not clear the ≥2-consumer bar as a library concept.
- **NO `refitField` / auto-drift / egg work here** — that is W-CON1 (re-fit + drift-source) and W-CON2
  (eggs). This wave DEPENDS on W-CON1's auto-drift focal (the recipe pins to `field.warp.{x,y}`) but
  does not build it.
- **NO god-module carve.** `constellationField.ts` adds only the `freeze`-flow-through type (the prop
  lives in the SFC); the carve is W-GOD1, ordered AFTER the W-CON content per AY §3.

---

## §7 — Dependency + sequencing notes

- **W-CON1 → W-CON3.** The anomaly recipe pins to `field.warp.{x,y}`, the auto-drift focal W-CON1
  builds. If W-CON1's drift-source slips, the recipe degrades to a STATIC pin (the anomaly does not
  wander) — still correct under `?freeze` (a capture wants a static anomaly), but the live wander
  needs W-CON1. The recipe is authored against `field.warp.{x,y}` regardless.
- **W-CON3 → L.W-ADOPT.** This wave is the glass-ui PRE-REQ. L.W-ADOPT (slides) consumes the `freeze`
  seam + the recipe, deletes the bespoke copy, and flips `proof:no-bespoke-constellation` RED→GREEN.
  The cross-repo order is: AY publishes (**W-PUB1**, the user-domain publish hinge) → slides re-pins to
  the exact AY version (the caret `^3.9.0` → the exact AY cut `3.10.0`) → L.W-ADOPT adopts → L.W5
  deploys. This wave does NOT publish (that is **W-PUB1**) and does NOT touch slides.
- **WRITE-SCOPE OVERLAP with W-CON1 AND W-CON2 — SERIALIZE the constellation lane.** W-CON3 edits
  `Constellation.vue` (the `freeze` prop + the render-loop static-frame clamp + the listener guards),
  `constellationField.ts:114-139` (the `ConstellationProps` `freeze` flow-through), and
  `demo/stories/substrates/constellation.vue` (the anomaly-recipe section + the `__constellationFreeze`
  handle). W-CON1 and W-CON2 edit the SAME `Constellation.vue` render-loop + the SAME
  `constellationField.ts` + the SAME demo story. This is the W-GLASS↔W-MOTION same-file class — the
  three W-CON waves are NOT independent and CANNOT run in parallel. The constellation lane SERIALIZES
  W-CON1 → W-CON2 → W-CON3 (the AY plan critical path `W-CON1 → W-CON2 → W-CON3`, AY.md `:219`). W-CON3's
  render-loop clamp folds the `freeze` predicate into the EXISTING `!handle.reducedMotion` guards that
  W-CON1 (the `stepField` call) and W-CON2 (the well listener) also touch — so W-CON3 lands LAST, on
  the settled render-loop, to avoid clobbering the W-CON1/2 guard edits. (Prior text claimed "no
  write-scope overlap" — that was WRONG: all three share `Constellation.vue` + `constellationField.ts` +
  the demo story.)
