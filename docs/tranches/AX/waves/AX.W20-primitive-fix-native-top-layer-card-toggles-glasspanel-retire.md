# AX.W20 — Primitive fix: native-top-layer + card toggles + GlassPanel retire

**Band** G · PRIMITIVES · **Severity** blocker · **dependsOn** AX.W07, AX.W09 (· AX.W35 is the
cross-repo HARD PREDECESSOR of the GlassPanel-retire PUBLISH, not of the in-repo fix) · **Charter**
AX.md §3 (the `### AX.W20` block, lines 1073-1111) + the §1 summary row (line 128) + §2b band-G precept
row (line 219) + §4 note 12 (PUBLISH-CURRENCY, not code, is the real gap — verify against HEAD, do not
re-fix what is landed; lines 2057-2067) · **Audit** `deep-audit-corpus.json` slice `primitive-broken`
(index 18, findings F0=native-top-layer / F1=card-toggles / F2=GlassPanel, plus the SLICE NOTES — the
Aurora-staging transitive-breakage flag + the L-inv-8 retire verdict + the "NOT a reka v-model bug"
correction) + slice `composables-state` (index 28, F1 — the GlassRenderer detector-vs-imperative-filter
service-boundary split, coordinated with §J W26) + `constellation-analysis-corpus.json` (the keyframes.js
`EasingCurveCanvas` `<GlassPanel variant="wash">` LIVE consumer → W35; the muster+speedtest GlassNativeDrawer
ASK; the fourier `cartoon-card` adoption → W34).

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `eaba94f` on three falsifiable witnesses that do NOT hold today. Each was
re-proven LIVE against HEAD (not trusted from the audit) — the §0 cardinal "re-verify before acting" + the
§4 note 12 "verify against HEAD, then publish" discipline:

- **RED witness 1 (the native `<dialog>` top-layer scrim NEVER PAINTS — invalid nested-hsl()).** The
  `.glass-top-layer` backdrop rule in `src/styles/animations.css` writes
  `background-color: hsl(var(--background) / α)` at **three** lines — `:354` (`/ 0`), `:361`
  (`/ var(--top-layer-backdrop-dim, 0.5)`), `:363` (`/ 0`). But `--background` is ALREADY a complete
  `hsl()` color (`tokens.css` → `--neutral-0` → `hsl(48 12% 98%)`), so each expands to
  `hsl(hsl(48 12% 98%) / 0.5)` — a nested `hsl()` the CSS parser DROPS, so the dim scrim never paints; the
  dialog floats over an undimmed, only-blurred page (the `backdrop-filter: blur(…)` on `:355` is the only
  thing that lands). These are the **ONLY three occurrences** of the `hsl(var(--complete-color) / α)`
  anti-pattern in the entire stylesheet corpus, and `tokens.css:1288` actively BLESSES the form as "the
  legitimate single-token alpha case" — a false claim that froze the bug since birth. The component is also
  an ORPHAN: `src/components/custom/dialog-native/GlassDialogNative.vue` is exported NOWHERE — not the root
  barrel, not `/api`, not `package.json` exports, not `src/subpaths/` (verified: `grep -rn
  "GlassDialogNative\|dialog-native" src/api/index.ts src/index.ts package.json src/subpaths/*.ts` → ZERO)
  — with exactly one consumer (its own demo `demo/stories/containers/native-top-layer.vue`), violating L
  invariant 8 (≥2 consumers or retire). The falsifiable RED: *grep finds `hsl(var(--background) / …)` at
  `animations.css:354,361,363` (RED — the only 3 in the corpus); `tokens.css:1288` blesses the form (RED);
  a live π-lane render of the top-layer dialog shows a BLURRED-but-UNDIMMED page behind (RED). After: ZERO
  `hsl(var(--background) / …)` in the corpus, the false comment corrected, and the scrim DIMS not merely
  blurs (GREEN).*

- **RED witness 2 (the Card story shadow + grain toggles produce NO perceptible change — dead controls).**
  `demo/stories/primitives/card.vue:107-113` wires `<Switch v-model="showShadow">` + `<Switch
  v-model="showGrain">`. The bindings are MECHANICALLY CORRECT (reka-ui 2.9.7 `SwitchRoot` uses
  `modelValue`/`update:modelValue`; the `:shadow`/`:grain` props flip — verified, this is NOT the MEMORY
  binding-verification class). But flipping either switch produces NO perceptible delta: (a) the `shadow`
  toggle only ADDS/removes the redundant additive `shadow-card` (`= --shadow-md = 0 4px 16px @ 8% alpha`,
  `Card.vue:37-38`) ON TOP of the tier's own baked-in `box-shadow` (`glass.css` each `.glass-{tier}` carries
  its own elevation shadow), so OFF never reads as flat; (b) the `grain` toggle runs the `::after` at
  `--glass-grain-opacity: 0.025` (2.5%) with `mix-blend-mode: overlay` — imperceptible, doubly so over busy
  color; (c) BOTH stage over an `<Aurora>` backdrop (`card.vue:17-20` imports `Aurora` +
  `DEFAULT_AURORA_CONFIG` and stages the tier matrix over it) that renders BLACK/broken live until W07 — so
  even the legible tier-alpha steps (0.30→0.95) the story is built to show don't read. The falsifiable RED:
  *a π-lane card-toggle perceptibility probe (ΔE / luminance delta on the card region across each switch
  flip) measures BELOW a perceptible floor (RED); the card story stages over the W07-broken Aurora (RED).
  After: each toggle produces a measured-perceptible delta over a STATIC working backdrop (GREEN).*

- **RED witness 3 (GlassPanel is built on a broken + obsolete JS glass renderer that STOMPS the per-rung
  CSS — and has ZERO production consumers).** `src/composables/glass/useGlassRenderer.ts:147-230`
  `createGlassFilter` HARD-OVERWRITES inline styles on the element — `el.style.backdropFilter` (`:203`),
  `el.style.border = "1px solid rgba(255,255,255,0.25)"` (`:207`), `el.style.boxShadow = …rgba(…)` (`:208`)
  — hardcoded WHITE, NON-dark-adaptive, STOMPING the per-rung `[data-variant]` CSS, so all five rungs
  collapse to ONE uniform look; the Chromium `feImage`-in-`backdrop-filter` technique loads the dataURL
  ASYNC so first paint shows no displacement; `detectTier()` sniffs `(window as any).chrome` (`:21-23`) — a
  fragile UA proxy. GlassPanel (`src/components/custom/glass-panel/GlassPanel.vue`) is its SOLE non-demo
  consumer (`grep -rln useGlassRenderer src/` → only `useGlassRenderer.ts` + `index.ts` +
  `GlassPanel.vue`); GlassPanel itself has ZERO production consumers (only two demo stories —
  `substrates/glass-panel.vue` + `foundations/paper-glass.vue` — its own `/api` type re-exports
  `GlassPanelVariant`@`:95`/`GlassPanelProps`@`:154`, and `manifest.ts:99` labels it "a substrate, not a UI
  primitive"). The repo ALREADY ships the modern CSS-native answer: the `.glass-material` grammar
  (`glass.css` §AW.W22/23 + `glass-refract.css` + `glass-specular-track.css`) — `@supports`-gated,
  dark-adaptive, fallback-bearing, no async canvas, no UA sniff. The falsifiable RED: *`createGlassFilter`
  writes `el.style.border = "1px solid rgba(255,255,255,0.25)"` non-dark-adaptive (RED); GlassPanel's five
  rungs render identical in the svg-filter tier (RED); `grep -rln useGlassRenderer src/` shows GlassPanel as
  the sole `src/` consumer (RED, substrate-with-one — L inv 8). After: `useGlassRenderer.ts`'s imperative
  filter DELETED, GlassPanel + its subpath/api/package.json/demo GONE, the surviving glass-substrate story
  points at `<Card surface="glass">`/a `.glass-material` div over a static backdrop (GREEN).*

The wave is RED at HEAD on all three witnesses (live invalid scrim / dead toggles / a stomping JS renderer
on an unconsumed primitive); the HardGate drives each to GREEN. Per §4 note 12, NONE of the three is a
publish-currency mirage — all three are present at HEAD source and re-proven live, NOT fixes already landed
upstream.

---

## Goal

The native `<dialog>` top-layer scrim DIMS correctly (the invalid nested-hsl() rooted-out, the capability
FOLDED into reka-ui `<Dialog>` as a `:native` opt-in and `GlassDialogNative` retired); the Card story's
shadow + grain toggles produce a MEASURED-PERCEPTIBLE change over a static working backdrop; and GlassPanel
+ the JS `createGlassFilter` SVG-displacement path are RETIRED entirely onto the CSS-native `.glass-material`
grammar — leaving a green build, vue-tsc, the re-run no-nested-hsl/card-toggle/consumers gates, and a live
π-lane audit confirming each surface paints correctly.

---

## Scope (the gestalt fix — no workaround, no legacy alias, no rehome)

The slice's three findings share ONE meta-class the slice NOTES itself names: **a working/legible surface
made broken by a defective dependency** (the invalid scrim, the broken JS renderer, the Aurora-staging
transitive breakage) — compounded by **substrate-without-consumer** on two of the three (GlassDialogNative:
1 consumer, exported nowhere; GlassPanel: 0 production consumers). The gestalt fix leans RETIRE/FOLD for the
two unconsumed primitives and a genuine redesign only for Card's toggle semantics — per §0 "excise or fail
explicitly" + the no-backwards-compat memory. Three folds; the GlassPanel retire (3) is the only PUBLISH-
gated one (W35 migrates its keyframes consumer first):

**(1) FIX-OR-FOLD the native top-layer scrim (F0) — root-fix the CSS, then resolve the orphan.** TWO
sub-steps, ordered:
- **(1a) ROOT-FIX the invalid scrim (the always-do half, regardless of the fold decision).** Re-express the
  three `animations.css` backdrop lines onto the house alpha pattern:
  `background-color: color-mix(in srgb, var(--background) calc(var(--top-layer-backdrop-dim) * 100%),
  transparent)` for the `[open]::backdrop` rule (`:361`), and `… transparent` (or `… 0%`) for the
  `@starting-style`/exit `/ 0` cases (`:354`, `:363`). CORRECT the false `tokens.css:1288` "legitimate
  single-token alpha case" comment so the anti-pattern is not re-legitimized (a doc-truth fix — the comment
  is what froze the bug since birth). The `.glass-top-layer` `@starting-style`/`overlay`/`allow-discrete`
  entry grammar itself is SOUND and modern — KEEP it; only the scrim color FORM is broken.
- **(1b) FOLD the native-`<dialog>` capability into reka-ui `<Dialog>` as a `:native` opt-in (the manifest's
  STATED fix-route — `manifest.ts:141` "Folds into Dialog as a `:native` opt-in (FIX-ROUTE)"), and RETIRE
  `GlassDialogNative` + the standalone story.** reka `<Dialog>` already ships a working dark-mode-adaptive
  glass scrim via `_shared/ModalOverlay.vue` (`scrim="glass"`), so the native pilot duplicates a working
  primitive. A `:native` opt-in on `<Dialog>` renders the reka content into a native `<dialog>`/top-layer
  element (`showModal()` + the `.glass-top-layer` entry grammar) for the cases that want the platform
  top-layer, gated as a PROGRESSIVE ENHANCEMENT over the working JS-open default. DELETE the LIMITED
  `commandfor`/`command`/`interestfor` declarative path from the demo (Baseline-LIMITED, off in most
  engines — inert today) or feature-detect it as a pure enhancement. **RATIFY-BEFORE-IMPL** the fold-vs-keep
  decision (see Open Questions) — the charter's recommended path is FOLD (matching the manifest fix-route +
  L inv 8: a 1-consumer orphan should retire, not merely be fixed); a "keep standalone" path requires
  bringing the component to ≥2 consumers, which no surface supplies.
- **(1c) EVALUATE the GlassNativeDrawer / `Drawer :native` ASK as an explicit scope arm (RATIFY-BEFORE-IMPL
  + ROUTE-DECISION).** The muster+speedtest cross-repo ask (a `popover="manual"` + scroll-snap-detents +
  scroll-driven `@property` backdrop native drawer / a `Drawer :native` opt-in to sidestep the vaul-vue
  `activeSnapPoint` re-snap bug, AN.W3) shares the dialog-native fix-or-fold seam. Decide: (a) IN-SCOPE —
  the `:native` opt-in pattern generalizes from Dialog to Drawer (≥2-consumer-gated muster+speedtest); or
  (b) OUT-OF-SCOPE → route to a NAMED destination (a new AX wave), do NOT drop it (real cross-repo debt with
  two named consumers and no current home). The charter recommends evaluating it here and routing if it
  exceeds W20's dialog scope — record the disposition either way.

**(2) MAKE THE CARD TOGGLES MEANINGFUL + decouple from the broken Aurora (F1).** This is the only genuine
redesign (not a retire). Three repairs:
- **(2a) shadow toggle.** Resolve the additive-`shadow-card`-over-baked-in-tier-shadow double-shadow:
  EITHER drop the redundant additive `shadow-card` and let the toggle gate the tier's OWN
  `--glass-shadow-{tier}` (so OFF = genuinely flat) OR remove the shadow toggle as a non-feature.
  **RATIFY-BEFORE-IMPL** which (see Open Questions) — gate-the-tier-shadow is the more honest "flat↔elevated"
  control; remove-the-toggle is the minimal collapse of an over-parameterized knob. Recommendation: gate the
  tier's own shadow so the control is real.
- **(2b) grain toggle.** Raise grain to a perceptible level when ON, or cut the toggle — a 2.5% delta is not
  a demoable control. Recommendation: raise (the grain IS a real surface feature; make it visibly so) over
  cut, unless the tier already implies grain.
- **(2c) decouple from Aurora.** Stage the card tier matrix over a STATIC, working high-frequency backdrop
  (a CSS gradient / image), NOT the W07-broken `<Aurora>` — a primitive's story must not depend on a
  known-broken substrate to be legible. This makes the card story INDEPENDENTLY verifiable (removing the
  W07 visual-closure gating the slice NOTES flag). The deeper truth the slice names — Card's surface is
  over-parameterized (tier × surface × shadow × grain × hover where tier already implies
  elevation+grain) — is noted as an Open Question for the W21 ledger (do NOT re-architect the Card surface
  here; the W20 scope is making the SHIPPED toggles real, not collapsing the prop set).

**(3) RETIRE GlassPanel + the JS `createGlassFilter`/`useGlassRenderer` SVG-displacement path onto
`.glass-material` (F2) — the PUBLISH-gated fold.** The glass-substrate surface IS the CSS-native
`.glass-material` grammar (already shipped, `@supports`-gated, dark-adaptive, fallback-bearing) composed on
the `.glass-{tier}` ladder — there is no second renderer worth keeping. Excise:
- the dir `src/components/custom/glass-panel/`; `src/subpaths/glass-panel.ts`; the `./glass-panel`
  `package.json` `exports` block (`:352-355`) + `typesVersions['*']['glass-panel']` (`:82-83`); the
  `GlassPanelVariant` (`api/index.ts:90-95`) + `GlassPanelProps` (`:147-154`) re-export blocks from `/api`
  (0 consumers).
- the IMPERATIVE filter half of `useGlassRenderer.ts` — `createGlassFilter` (`:147-230`),
  `destroyGlassFilter` (`:235`), `GlassFilterState` (`:127`), and the `useGlassRenderer()` factory's filter
  wiring. **COORDINATE with §J W26's `useGlassRenderer` detector-vs-filter split (slice 28 F1):** W26 owns
  splitting the file along its service boundary (the pure reactive `detectTier()`/`tier` DETECTOR stays; the
  imperative filter DIES with GlassPanel). W20 RETIRES the GlassPanel consumer (which is what makes the
  filter dead); W26 carves the file. **RATIFY-BEFORE-IMPL** the ownership boundary (see Disjointness + Open
  Questions): the recommended path is W20 deletes the GlassPanel-dependent filter EXPORTS (so the build
  greens with GlassPanel gone) and W26 finalizes the detector-only file shape + the `(window as any).chrome`
  → capability-probe cleanup. If W26 lands first, W20 just removes the consumer.
- the demo stories: re-point or retire `substrates/glass-panel.vue` + `foundations/paper-glass.vue`
  (+ `composables/use-glass-renderer.vue`, the imperative-filter demo) onto a static-backdrop story showing
  the `@supports`-gated `.glass-material` SOTA folds (refract / squircle / chromatic / adaptive-tint) on
  `<Card surface="glass">` / a `.glass-material` div. Update `manifest.ts:99`/`:79` rows + the
  `proof-storybook-ia.mjs` substrates slug set (`glass-panel` drops; `glass-material` already present at
  `:40`).
- **PUBLISH-GATE:** keyframes.js's `EasingCurveCanvas.vue` mounts `<GlassPanel variant="wash">` as the
  curve-editor surface (constellation analysis) — the retire BREAKS it. **W35** migrates EasingCurveCanvas →
  `<Card surface="glass">` / a `.glass-material` div (W20's own retire-target) with a born-RED
  `proof:off-glasspanel` cross-repo gate that greens BEFORE the glass-ui prune PUBLISHES. W20 may LAND its
  in-repo retire independently; the PUBLISH hinges on W35 (the W28→W29 native-first / migrate-before-prune
  class).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/animations.css` | FIX the three `.glass-top-layer::backdrop` lines (`:354`, `:361`, `:363`) from `hsl(var(--background) / α)` → `color-mix(in srgb, var(--background) calc(…), transparent)` (F0/1a). Possibly add the `<Dialog :native>` top-layer host hook if the fold needs a non-`.glass-top-layer` selector (coordinate with the Dialog SFC). |
| `src/styles/tokens.css` | CORRECT the false `:1288` "legitimate single-token alpha case" comment (F0/1a — doc-truth). |
| `src/components/ui/dialog/` (Dialog SFC + index.ts) | ADD the `:native` opt-in prop + the native-`<dialog>`/top-layer render path (F0/1b — the FOLD target). Co-export the `:native`-related type if any. |
| `src/components/custom/dialog-native/` (whole dir — `GlassDialogNative.vue` + `index.ts`) | **DELETE** (F0/1b — retire the orphan; it is exported nowhere, so no barrel/subpath/package.json/api edit is needed for it). |
| `demo/stories/containers/native-top-layer.vue` | RE-POINT onto `<Dialog :native>` (showing the fixed dimming scrim + the entry grammar) OR delete + fold into the Dialog story; delete the LIMITED `commandfor`/`interestfor` declarative path. |
| `demo/stories/primitives/card.vue` | FIX the shadow + grain toggles to produce a perceptible delta (F1/2a/2b); REPLACE the `<Aurora>` staging (`:17-20`) with a STATIC high-frequency backdrop (F1/2c). |
| `src/components/ui/card/Card.vue` | IF the shadow-toggle repair gates the tier's own `--glass-shadow-{tier}`: adjust the additive-`shadow-card` logic (`:37-38,54-55`) so `shadow=false` reads flat (F1/2a). (Minimal — do NOT re-architect the surface prop set.) |
| `src/components/custom/glass-panel/` (whole dir) | **DELETE** (F2). |
| `src/subpaths/glass-panel.ts` | **DELETE** (the `vite.library.ts` subpaths glob auto-drops the chunk). |
| `package.json` | DELETE the `./glass-panel` `exports` block (`:352-355`) + `typesVersions['*']['glass-panel']` (`:82-83`). |
| `src/api/index.ts` | DELETE the `GlassPanelVariant` (`:90-95`) + `GlassPanelProps` (`:147-154`) re-export blocks + their header comments. |
| `src/composables/glass/useGlassRenderer.ts` | DELETE the imperative-filter half — `createGlassFilter` (`:147-230`), `destroyGlassFilter` (`:235`), `GlassFilterState` (`:127`), and the filter wiring in `useGlassRenderer()` (F2). **COORDINATE the detector-only file shape with W26** (see Disjointness). |
| `src/composables/glass/index.ts` | DROP the `createGlassFilter`/`destroyGlassFilter`/`GlassFilterState` re-exports. |
| `demo/stories/substrates/glass-panel.vue` · `demo/stories/foundations/paper-glass.vue` · `demo/stories/composables/use-glass-renderer.vue` | RE-POINT onto `<Card surface="glass">`/`.glass-material` over a static backdrop OR delete + fold into a `.glass-material` substrate story. |
| `demo/stories/manifest.ts` | UPDATE/DELETE the `glass-panel` (`:99`) + `paper-glass` (`:79`) + `use-glass-renderer` rows per the re-point/retire decision. |
| `scripts/proof-storybook-ia.mjs` | DROP the `glass-panel` slug from the substrates cohort (`:40`) per the re-point (`glass-material` already present). |
| `scripts/proof-composable-return-types.mjs` | DROP the `createGlassFilter`/filter-return entry if it references the deleted exports. |
| `docs/tranches/AX/audit/W20-primitive-fix.json` | **NEW** — the born-RED→GREEN audit artefact (the three witnesses + per-finding F0/F1/F2 disposition + the paired-π BEFORE/AFTER + DELTA + the GlassNativeDrawer route-decision + the W35 publish-gate handoff). |

**OUT of bounds:** the keyframes.js `EasingCurveCanvas.vue` sibling source (**W35** migrates it off
GlassPanel — this wave writes NO sibling source; it carries the consumer-migration NOTE and routes it); the
fourier `cartoon-card`→`<Card surface="cartoon">` adoption (**W34**'s ledger — W20 only confirms
`<Card surface="cartoon">` is the documented migration target); the FULL `useGlassRenderer.ts`
detector-only refactor + the `(window as any).chrome`→capability-probe cleanup (**W26** owns the
service-boundary split; W20 removes only the GlassPanel-dependent filter exports); the broader Card
surface-prop COLLAPSE (over-parameterization — noted to **W21**'s recategorize ledger, not re-architected
here); the W07 Aurora black-canvas FIX (W20 DECOUPLES the card story from Aurora; it does not fix Aurora);
`MIGRATION.md` (the GlassPanel-RETIRED honesty entry rides **W21**'s `proof:no-retired-survivor` authoring
+ the W29 prune-survivor reconcile); the W27a `var-in-arbitrary` non-emit guard gate (a SEPARATE gate W27a
owns — W20's card-toggle repair is a symptom, not the gate-authorship).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W19 (primitive prune A: header-ribbon + glyph-face + disco-glyph).** Sibling G-band prune/fix wave;
  **disjoint by primitive set** — W19 prunes header-ribbon/glyph-face/disco-glyph; W20 fixes dialog-native +
  Card toggles + retires GlassPanel. Both share `package.json` (exports) + `src/api/index.ts` as files but
  touch DIFFERENT entries (W19: the three pruned; W20: glass-panel). The ONE arithmetic collision: W19 owns
  the "cherry-picked custom/ packages" COUNT comment in `proof-consumers-static.mjs` (7→5, dropping
  glyph-face+disco-glyph); GlassPanel is NOT a cherry-pick (it reaches consumers via subpath, not the
  root-barrel cherry-pick set), so W20 does NOT touch that count line. Coordinate the disjoint ownership so
  the count comment is mutated by exactly one wave.
- **vs W26 (TS god-module + state encapsulation: the `useGlassRenderer` split).** This is the ACTIVE shared
  file — `src/composables/glass/useGlassRenderer.ts`. W26's charter (line 1362) "Split `useGlassRenderer`
  into the pure reactive detector vs the imperative filter (coordinate with W20's GlassPanel retire — the
  filter dies with it)"; W26 dependsOn W20 (line 1353). **Disjoint by sub-concern + sequence:** W20 deletes
  the GlassPanel-DEPENDENT filter exports (`createGlassFilter`/`destroyGlassFilter`/`GlassFilterState` +
  their barrel re-exports) so the build greens with GlassPanel gone; W26 finalizes the DETECTOR-ONLY file
  shape (`detectTier()`/`tier` only) + the `(window as any).chrome`→capability-probe cleanup + the file
  split. If W26 lands first, W20 just removes the GlassPanel consumer (no filter-delete needed). RATIFY the
  exact delete-vs-keep boundary at the wave-open (Open Question 4) so the file is not double-edited in one
  merge window.
- **vs W21 (recategorize-ledger + barrel coherence + metric-pill).** W21 closes the recategorization ledger
  (configurator root-barrel contradiction, drawer live-behind disambiguate, use-token-color justify,
  metric-pill subpath) + authors `proof:no-retired-survivor` + the MIGRATION.md honesty repair.
  **Disjoint by primitive** — W21 does NOT touch dialog-native/Card/GlassPanel. BUT the GlassPanel-RETIRED
  MIGRATION.md entry rides W21's `proof:no-retired-survivor` (every "RETIRED" claim resolves to zero
  surviving dir/subpath/export) — W20 RETIRES GlassPanel; W21 owns the MIGRATION.md ledger truth (it must
  read "GlassPanel RETIRED → `<Card surface="glass">`/`.glass-material`" with zero survivors). The
  over-parameterized Card surface-prop collapse is ALSO routed to W21's ledger (not re-architected in W20).
  Coordinate: W20 RETIRES; W21 RECORDS the retire in MIGRATION.md + gates it.
- **vs W27a (legacy gate-hardening: the `var-in-arbitrary` non-emit guard).** W27a authors the
  var-in-arbitrary content-scan-non-emit ROOT-CAUSE sweep + guard gate (the card-lift snag CLASS — a dead
  arbitrary class like `scale-[var(--scale-hover)]` emitting no CSS; the carousel W23 + card W20 instances
  are symptoms). **Disjoint by ownership:** W20 fixes the card-toggle PERCEPTIBILITY (the shadow/grain
  semantics); W27a owns the var-in-arbitrary GATE class. If W20's card repair touches a
  `scale-[var(--…)]`-style dead arbitrary, NOTE it to W27a — do not author the guard gate here.
- **vs W35 (cross-repo consumer-migration DAG — the PUBLISH predecessor).** W35 migrates keyframes.js's
  `EasingCurveCanvas.vue` off `<GlassPanel variant="wash">` (→ `<Card surface="glass">`/a `.glass-material`
  div) with a born-RED `proof:off-glasspanel` cross-repo gate that greens BEFORE the glass-ui retire
  PUBLISHES. **W20 is the in-repo retire; W35 is the consumer migration.** W20 may LAND in-repo (the audit
  json born-RED→GREEN) independent of W35, but the PUBLISH of the retire is gated on W35's keyframes-side
  green (charter lines 145, 1706, 1714-1720). W20 writes NO sibling source — it carries the GlassPanel
  consumer-migration NOTE and routes it to W35. File-disjoint (W20: glass-ui src; W35: keyframes.js src +
  glass-ui pin-management coordination).
- **vs W34 (cross-constellation idiom-census receiver).** The fourier `cartoon-card`→`<Card
  surface="cartoon">` adoption (14 files via a resurrected dead `.cartoon-card` shim) routes to W34's ledger.
  W20 only CONFIRMS `<Card surface="cartoon">` is the documented migration target (a Card-touching confirm,
  not an adoption-execution). The muster+speedtest GlassNativeDrawer adoption (if W20 routes it OUT-of-scope)
  routes to its named destination, not W34. Disjoint: W20 fixes/confirms the glass-ui surface; W34 censuses +
  routes the consumer adoptions.
- **vs W07 (aurora core unblock).** W20 dependsOn W07 for the card-story VISUAL CLOSURE only — but the
  gestalt fix DECOUPLES the card + glass-panel stories FROM Aurora (static backdrop), so W20's in-repo land
  is NOT hard-blocked on W07. The slice NOTES flag: visual closure "may gate behind W07" ONLY if a story
  keeps an Aurora variant — the decouple removes that gating. Disjoint: W07 fixes the WGSL black canvas; W20
  removes the card/glass-panel stories' DEPENDENCY on it.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤3 agents — file-disjoint arms; the GlassPanel retire is the largest).** Arm A
  (native-top-layer — F0): fix the three `animations.css` backdrop lines → `color-mix`, correct the
  `tokens.css:1288` comment, ADD the `<Dialog :native>` opt-in (per the ratified fold), DELETE
  `dialog-native/`, re-point/retire the `native-top-layer.vue` story (drop the LIMITED declarative path),
  evaluate+route the GlassNativeDrawer ASK. Arm B (card toggles — F1): fix the shadow toggle (gate the
  tier's own shadow, per the ratified path), raise/cut the grain toggle, REPLACE the Aurora staging with a
  static backdrop, NOTE the over-parameterization to W21. Arm C (GlassPanel retire — F2): delete the dir +
  subpath + package.json export/typesVersions + the `/api` `GlassPanel*` blocks + the imperative-filter
  exports from `useGlassRenderer.ts`/`index.ts`, re-point/retire the three glass-panel/paper-glass/
  use-glass-renderer demo stories onto `.glass-material`, update the manifest + IA slug; carry the W26
  detector-only coordination + the W35 keyframes publish-gate NOTE. `vue-tsc` + `npm run build` at every
  interval (the build greens only when GlassPanel's exports + the filter-dependent paths are fully removed).
- **Adversarially-verify (≤1 read-only lane).** Re-runs the three RED witnesses against the patched tree:
  asserts ZERO `hsl(var(--background) / …)` (and the broader `hsl(var(--complete-color) / α)`) in the
  stylesheet corpus + the `tokens.css:1288` comment no longer blesses it; asserts the `dialog-native/` dir is
  GONE + `<Dialog :native>` renders a top-layer with a DIMMING scrim (not just blur); asserts each card
  toggle produces a measured-perceptible delta over the static backdrop (and that the card story no longer
  imports `Aurora`); asserts `glass-panel/` dir + subpath + package.json export + `/api` `GlassPanel*` GONE,
  `node -e 'import("@mkbabb/glass-ui/glass-panel")'` 404s at resolution, `createGlassFilter`/
  `destroyGlassFilter`/`GlassFilterState` no longer exported, and `grep -rln useGlassRenderer src/` shows NO
  GlassPanel consumer. ADVERSARIAL twists: (a) tries to "pass" the native-top-layer fix with the scrim color
  fixed but `GlassDialogNative` merely demoted-not-deleted (confirms the orphan retire is required, not just
  the CSS fix); (b) tries to "pass" the card-toggle fix with the toggles producing a delta ONLY because the
  Aurora is still staged (confirms the static-backdrop decouple is the real fix — the delta must hold over a
  STABLE backdrop); (c) confirms the W26-owned detector half (`detectTier()`/`tier`) is UNTOUCHED by W20's
  filter-exports delete (the do-not-over-reach guardrail); (d) confirms the surviving `.glass-material` story
  is NOT itself a manufactured fake consumer (it reads the shipped grammar, no new primitive).
- **Gate-author (≤1 agent — net-new perceptibility + sweep gates + re-baseline).** Authors
  `proof:no-nested-hsl` (the corpus sweep — fail on any `hsl(var(--<complete-color-token>) / …)` form, born-
  RED at the 3 `animations.css` lines); authors the card-toggle perceptibility ASSERTION (a π-lane
  ΔE/luminance delta on the card region across each switch flip, asserting > a perceptible floor, born-RED
  at HEAD's 8%-alpha-additive / 2.5%-grain deltas); confirms `proof:consumers-static` / `verify-export-types`
  GREEN with GlassPanel's exports gone; re-baselines `proof:storybook-ia` for the substrates-cohort slug
  shrink; records the born-RED W35 `proof:off-glasspanel` cross-repo handoff (publish-gating). Confirms each
  assertion FAILS at `eaba94f` and PASSES on the patched tree.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 5: 3 implement +
1 verify + 1 gate.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN.**

1. **`proof:no-nested-hsl` (net-new corpus sweep) GREEN** — a stylesheet sweep that FAILS on any
   `hsl(var(--<token-that-is-a-complete-color>) / α)` form (the exact CLAUDE.md anti-pattern). **Born-RED**
   at HEAD on `animations.css:354,361,363` (the only 3 occurrences) — and ALSO asserts the `tokens.css:1288`
   comment no longer blesses the form; GREEN after the `color-mix` re-expression + comment correction. A
   build/diff artefact (the precept-valid form), not a runtime grep — it asserts the SOURCE CSS form, which
   IS the defect (the parser drops it at build, so the form itself is the falsifiable fact).
2. **`proof:card-toggle-perceptible` (net-new π-lane assertion) GREEN** — renders the card story, flips each
   of the shadow + grain Switches, reads back the card region pixels, and asserts a ΔE/luminance delta ABOVE
   a perceptible floor over the STATIC backdrop (and asserts the card story imports NO `Aurora`). **Born-RED**
   at HEAD (the 8%-alpha additive shadow over a baked-in tier shadow + the 2.5% grain over busy Aurora color
   both fall below the floor); GREEN after the shadow/grain repair + the static-backdrop decouple. A runtime/
   readback artefact in the W00 π-lane — NOT a headless source grep.
3. **`vue-tsc --noEmit` GREEN** (the dangling-export canary): after the GlassPanel dir + the imperative-filter
   exports are deleted, there is NO unresolved `GlassPanel`/`GlassPanelVariant`/`GlassPanelProps`/
   `createGlassFilter`/`destroyGlassFilter`/`GlassFilterState` import in the typegraph. **Born-RED** if a
   re-export survives the dir delete; GREEN after the barrel + `/api` trims. A build artefact.
4. **`npm run build` + `verify-export-types` GREEN** — the `vite.library.ts` subpaths glob auto-drops the
   `dist/glass-panel.js`/`.d.ts` chunk once `src/subpaths/glass-panel.ts` is gone; the `./glass-panel`
   package.json export block is removed so `verify-export-types` does not probe an absent dist file.
   **Born-RED** if the export block points at a now-absent chunk; GREEN after the export + typesVersions
   trim. A build/deletion artefact.
5. **`proof:consumers-static` GREEN** — the root-contract ledger no longer lists `glass-panel` / the
   `GlassPanel*` `/api` types; the cherry-pick COUNT is UNCHANGED (GlassPanel is a subpath, not a cherry-pick
   — W19 owns the 7→5 count). A structural artefact.
6. **`proof:storybook-ia` re-baselined** — the substrates cohort slug set drops `glass-panel` (the
   `.glass-material` story already carries `glass-material` at `:40`); the manifest rows reconcile.
   **Born-RED** if the slug survives; GREEN after the re-baseline.
7. A **deletion-PROOF** (valid artefact form, NOT a runtime grep): `test -d
   src/components/custom/{glass-panel,dialog-native}` → both absent; `node -e
   'import("@mkbabb/glass-ui/glass-panel").then(()=>process.exit(1)).catch(()=>process.exit(0))'` →
   resolution 404 (exit 0); `grep -rc "GlassPanel\|createGlassFilter\|dialog-native\|GlassDialogNative"
   package.json src/api/index.ts src/composables/glass/index.ts` → 0 across the surface.
8. A **cross-repo born-RED handoff PROOF (PUBLISH-gating, owned by W35)**: the keyframes-side
   `proof:off-glasspanel` assertion (keyframes.js `EasingCurveCanvas.vue` off `<GlassPanel variant="wash">`)
   greens BEFORE this retire PUBLISHES (charter lines 145, 1714-1720). W20's in-repo retire may LAND green
   independently; the PUBLISH is gated on W35. (This wave records the gate as a routed handoff, not a
   re-implementation.)

These are build / structural / deletion / readback artefacts (the precept-valid forms per SPEC.md §Hard
Gates) — NOT grep-for-source-string-as-runtime-behaviour gates (the `proof:no-nested-hsl` sweep asserts the
SOURCE CSS form that the parser provably drops, which IS the build-level defect).

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass, in **light AND dark** at **≥ 3 viewports** (375×667 / 1280×800 / 1440×900), on the
APPEARANCE/INTERACTION axis (NOT a headless proof alone):

- **The native top-layer scrim DIMS, not just blurs:** open the `<Dialog :native>` top-layer; the page
  behind is BOTH blurred AND visibly dimmed (the `color-mix` scrim paints); the `@starting-style` entry +
  exit grammar reads as a clean enter/leave; in dark mode the scrim re-tints via the token (no hardcoded
  white). The slice's named close criterion: "a LIVE Playwright audit confirming the scrim actually DIMS,
  not just blurs."
- **Each card toggle produces a VISIBLE change over a working backdrop:** flip the shadow Switch — the card
  reads flat↔elevated (a genuine shadow delta, not a near-invisible 8%-alpha layer); flip the grain Switch —
  the grain reads perceptibly on↔off; both over the STATIC high-frequency backdrop (no broken-Aurora
  dependency); affordance/hierarchy/spacing/padding hold; no visual occlusion. The slice's named close
  criterion: "a live audit, not headless — each toggle produces a visible change over a working backdrop."
- **The surviving glass-substrate story reads on `.glass-material`:** the re-pointed substrate story renders
  `<Card surface="glass">`/a `.glass-material` div over a static backdrop, showing the `@supports`-gated
  SOTA folds (refract / squircle / chromatic / adaptive-tint) — dark-adaptive, no all-five-rungs-identical
  collapse, no async first-paint blank; no dangling `glass-panel` route in the storybook nav.

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`) is the binding close criterion. The
BEFORE/AFTER pair is uniquely load-bearing here: the BEFORE state (undimmed-blurred scrim / dead toggles /
five-identical-rung GlassPanel) IS the AW cardinal failure this tranche corrects — the DELTA is the proof.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the three RED witnesses against HEAD `eaba94f`
   live: the `animations.css` backdrop renders blurred-but-undimmed (the nested-hsl drop); the card toggles
   produce no perceptible delta (and stage over the W07-broken Aurora); GlassPanel's five rungs render
   identical + `grep` confirms it is the sole `useGlassRenderer` consumer + `GlassDialogNative` is exported
   nowhere. Record them in `audit/W20-…json` as the born-RED baseline. Per §4 note 12, confirm NONE is a
   publish-currency mirage (all three are HEAD-source defects). Do NOT proceed on the audit's word — re-prove.
2. **FIX-OR-FOLD the native top-layer (F0).** (1a) Re-express the three `animations.css` backdrop lines →
   `color-mix`; correct the `tokens.css:1288` comment. (1b) [post-RATIFY] ADD the `<Dialog :native>` opt-in,
   DELETE `dialog-native/`, re-point/retire the `native-top-layer.vue` story (drop the LIMITED declarative
   path). (1c) [RATIFY + ROUTE] evaluate the GlassNativeDrawer ASK; record IN/OUT-of-scope + the named
   destination. `vue-tsc` + `npm run build`.
3. **MAKE THE CARD TOGGLES MEANINGFUL (F1).** [post-RATIFY] fix the shadow toggle (gate the tier's own
   shadow); raise/cut the grain toggle; REPLACE the Aurora staging with a static high-frequency backdrop;
   NOTE the over-parameterization to W21. `vue-tsc` + `npm run build`.
4. **RETIRE GlassPanel onto `.glass-material` (F2).** Delete the dir + subpath + package.json
   export/typesVersions + the `/api` `GlassPanel*` blocks + the imperative-filter exports from
   `useGlassRenderer.ts`/`index.ts` [coordinate the detector-only shape with W26]; re-point/retire the three
   glass-panel/paper-glass/use-glass-renderer demo stories onto `.glass-material` over a static backdrop;
   update the manifest + IA slug. `vue-tsc` + `npm run build`.
5. **Gates GREEN.** Author `proof:no-nested-hsl` (corpus sweep) + `proof:card-toggle-perceptible` (π-lane);
   confirm `proof:consumers-static` + `verify-export-types` + `proof:storybook-ia` (re-baselined) GREEN; run
   the deletion/resolution-404 proofs; run the VISUAL-TRUTH live audit (scrim dims / toggles read /
   `.glass-material` story reads); route the keyframes GlassPanel consumer-migration NOTE to W35 + the
   fourier cartoon-card adoption to W34 + the GlassNativeDrawer route-decision; capture the paired-π
   BEFORE/AFTER + DELTA; write `audit/W20-…json` to GREEN (with the "PUBLISH gated on W35" annotation).

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W20-primitive-fix.json` — the born-RED→GREEN ledger: the three RED witnesses (the
  nested-hsl scrim + the orphan dialog-native; the dead card toggles + the Aurora-staging transitive
  breakage; the stomping JS renderer + the unconsumed GlassPanel), the per-finding (F0/F1/F2) disposition,
  the post-wave GREEN measurements (zero nested-hsl in the corpus, the `<Dialog :native>` fold, the
  perceptible toggle deltas, the GlassPanel dir/subpath/export/api GONE + the `.glass-material` re-point),
  the GlassNativeDrawer route-decision record, and the §4-note-12 verified-against-HEAD confirmation.
- The post-build `dist/` proof: `dist/glass-panel.js` / `dist/glass-panel.d.ts` ARE NO LONGER EMITTED (the
  subpaths-glob auto-drop evidence) + `verify-export-types` no longer probes a `./glass-panel` entry.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the native-top-layer scrim
  (blurred-undimmed → blurred-AND-dimmed), the card toggles (no-delta → perceptible flat↔elevated /
  grain-on↔off), the GlassPanel substrate (five-identical-rungs/stomped-CSS → `.glass-material` SOTA folds),
  at ≥ 3 viewports × light/dark — the DELTA is the binding proof the AW cardinal failure is corrected.
- A consumer-migration NOTE annex (routed to W35, NOT executed here): keyframes.js `EasingCurveCanvas.vue`
  off `<GlassPanel variant="wash">` (→ `<Card surface="glass">`/a `.glass-material` div), born-RED
  `proof:off-glasspanel`, gated BEFORE the retire publishes; + the fourier `cartoon-card`→`<Card
  surface="cartoon">` adoption NOTE routed to W34; + the GlassNativeDrawer route-decision (IN/OUT-of-scope +
  destination).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(primitive): W20 born-RED baseline — nested-hsl scrim + dead card toggles + the stomping GlassPanel renderer (AX.W20)`
2. `fix(styles): root-fix the native top-layer scrim — color-mix over the dropped nested-hsl + correct the false tokens comment + fold into <Dialog :native>, retire GlassDialogNative (AX.W20 F0)`
3. `fix(card): make the shadow + grain toggles perceptible — gate the tier shadow, raise grain, decouple the story from the broken Aurora (AX.W20 F1)`
4. `refactor(glass): retire GlassPanel onto .glass-material — dir + subpath + exports + api types + the imperative createGlassFilter path; re-point the substrate stories (AX.W20 F2)`
5. `chore(AX.W20): no-nested-hsl + card-toggle-perceptible gates GREEN + storybook-ia re-baseline + paired-π BEFORE/AFTER capture + W35/W34 route notes`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash
per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W07 (aurora core unblock) — the card-story VISUAL-CLOSURE dependency, NOT a hard in-repo blocker.**
  The card + glass-panel stories STAGE over the W07-broken Aurora at HEAD, so their "broken" appearance is
  partly TRANSITIVE (the slice NOTES: "a working primitive made illegible by a broken substrate
  dependency"). W20's gestalt fix DECOUPLES the stories from Aurora (static backdrop), so the in-repo land is
  NOT hard-blocked on W07 — but if a story retains an Aurora VARIANT, that variant's visual closure gates
  behind W07. (Charter `### AX.W20` dependsOn AX.W07, line 1074; slice NOTES the "may gate behind W07" flag.)
- **AX.W09 (specular tune-to-subtle) — the Card-surface specular co-dependency.** W09 tunes the moving
  specular to warm-cream low-alpha + tokenizes the intensity ladder (the AW.W24 pointer-wiring is ALREADY at
  HEAD — §4 note 12 — so W09 is TUNE+opt-in+tokenize, NOT wire). The Card surface W20 touches (the
  `surface="glass"` specular-bearing card the GlassPanel retire points at) reads the W09-tuned specular, so
  the card-story visual closure composes with W09's softened default. (Charter `### AX.W20` dependsOn AX.W09,
  line 1074.)
- **AX.W35 (cross-repo consumer-migration DAG) — HARD PREDECESSOR of the GlassPanel-retire PUBLISH (not of
  the in-repo fix).** keyframes.js's `EasingCurveCanvas.vue` mounts `<GlassPanel variant="wash">` — the
  "0 production consumers" premise was glass-ui-INTERNAL only and is FALSIFIED cross-repo (constellation
  analysis). Per the W28→W29 native-first / migrate-before-prune class (§4 note 8 / line 1732), the keyframes
  migration is sequenced in W35 with a born-RED `proof:off-glasspanel` gate that greens BEFORE this retire
  PUBLISHES, so HEAD never breaks the optional consumer. W20 may LAND its in-repo retire independently; the
  PUBLISH hinges on W35. (Charter lines 145, 1706, 1714-1720.)
- **AX.W00 (π visual-runtime lane) — the close machinery (implicit band precondition).** Every G-band
  visual wave closes on the π-lane live audit, not the headless gates alone (the cardinal AX precept). The
  card-toggle-perceptibility readback + the scrim-dims live render + the paired-π BEFORE/AFTER all run in the
  W00 workspace. W20 cannot close on the structural gates alone (a green `proof:no-nested-hsl` over a
  still-undimmed live scrim would be exactly the AW cardinal failure).
- **Downstream:** **AX.W26** dependsOn W20 (the `useGlassRenderer` detector-vs-filter split — the imperative
  filter "dies with" the GlassPanel retire; charter line 1353/1362). **AX.W21** records the GlassPanel-RETIRED
  MIGRATION.md entry + gates it via `proof:no-retired-survivor` + receives the Card over-parameterization
  ledger note. **AX.W34** receives the keyframes GlassPanel-adoption + the fourier cartoon-card-adoption
  censuses. **AX.W35** is the PUBLISH-gating cross-repo migration.
- **Coordination (not a blocker):** **AX.W19** owns the cherry-pick COUNT comment (GlassPanel is a subpath,
  not a cherry-pick — W20 does not touch it). **AX.W27a** owns the var-in-arbitrary non-emit guard gate
  (W20's card repair may surface a symptom — note, don't author).

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`728b1c6`** (AQ.W6, "native `<dialog>` + `commandfor` + `.glass-top-layer` pilots") — the ONLY commit
  that ever touched `dialog-native` (the slice's git evidence: "git: only one commit ever touched
  dialog-native, never revisited"). The native-top-layer pilot + the `.glass-top-layer` `@starting-style`/
  `allow-discrete` entry grammar were minted here; the invalid `hsl(var(--background) / α)` scrim has been
  broken SINCE BIRTH (the `tokens.css:1288` "legitimate single-token alpha case" comment was written at the
  same time, falsely blessing the form). The component was exported nowhere from minting — an orphan from
  day one (L inv 8 violated at birth).
- **AQ.W2** (the `color-mix` migration) — the `tokens.css:1288` comment claims "AQ.W2's color-mix migration
  is orthogonal" to the top-layer scrim; in fact the top-layer scrim is the ONE site AQ.W2's migration MISSED
  (the false-orthogonality claim is what froze the nested-hsl bug). W20 completes AQ.W2's migration on the
  three top-layer lines.
- **AW.W22/W23** — the `.glass-material` grammar (`glass.css` §AW.W22/23 + `glass-refract.css` +
  `glass-specular-track.css`) landing: the modern CSS-native, `@supports`-gated, dark-adaptive glass
  substrate that SUPERSEDES the GlassPanel JS renderer. Its arrival is what made the JS `createGlassFilter`
  path obsolete — GlassPanel survived only because the audit (this slice) is the first to re-census it
  against the shipped CSS answer.
- **AW.W24** (the Card specular pointer-wiring — §4 note 12) — at HEAD the Card tracks the pointer; the
  published 3.4.0 the consumers measured pins `--specular-x` at 50% (a dead-centered bloom). W20's card-story
  fix composes with the HEAD-correct specular (do NOT re-wire — verify against HEAD), and the W09 softened
  default tunes it. (The publish-currency gap, not a code gap.)
- **L.W1 Lane B / O.W6 / the `/api` promotions** — `GlassPanelVariant` (`api/index.ts:90-95`) +
  `GlassPanelProps` (`:147-154`) were promoted to the `/api` discovery layer on the substrate-promotion bar
  ("has a type sibling," not "≥2 binary consumers") — the same substrate-without-consumer minting class as
  the W19 primitives. W20 drops both `/api` re-exports (0 consumers).
- **keyframes.js `EasingCurveCanvas.vue`** (constellation analysis) — the LIVE cross-repo GlassPanel
  consumer the glass-ui-internal census missed: `<GlassPanel variant="wash">` as the bezier curve-editor
  surface. keyframes.js pins `@mkbabb/glass-ui ^3.4.0` so a minor bump pulls the retire — the W35-sequenced
  migration (→ `<Card surface="glass">`/`.glass-material`) is the publish-safety predecessor.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline: the three `animations.css`
  nested-hsl lines ship; the card story stages over the broken Aurora; the GlassPanel JS renderer
  hard-overwrites inline styles; `GlassDialogNative` is exported nowhere. Per §4 note 12, all three are
  HEAD-source defects (NOT publish-currency mirages) — re-prove live, then fix.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-G binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **one-path / no-legacy-code (no backwards-compat memory; SPEC.md §"Execute the plan … no shadow APIs or
  temporary compatibility layers").** The native-top-layer scrim is ROOT-FIXED (the invalid nested-hsl
  re-expressed onto the ONE house alpha pattern — `color-mix` — not a second alpha mechanism); the
  capability is FOLDED into the existing reka `<Dialog>` (one dialog path, not a parallel `GlassDialogNative`
  shadow); GlassPanel + its JS renderer are EXCISED onto the ONE shipped glass substrate (`.glass-material`)
  — there is no second renderer worth keeping. MUST NOT ship a legacy alias / `@deprecated` re-export of
  `GlassPanel`/`GlassDialogNative`, nor a "fix the scrim but keep the orphan standalone" half-measure.
- **substrate-with-consumer / wire-before-retire (precepts/README.md "Substrate and consumer land together.
  A primitive that is not consumed is unfinished work."; SPEC.md §"Every wave lands substrate with its
  consumer or deletes the substrate," line 86).** `GlassDialogNative` (1 consumer, exported nowhere) +
  GlassPanel (0 production consumers) FAIL the bar (L inv 8) — the wave DELETES the unconsumed substrate (the
  precept-valid disposition). The ONE live cross-repo GlassPanel consumer (keyframes.js EasingCurveCanvas) is
  migrated-before-prune-publish via W35 (the wire-before-retire sequencing, the W28→W29 class). MUST NOT
  leave a demoted-but-surviving dir/subpath (a demote is not a delete). The `<Dialog :native>` fold + the
  `.glass-material` re-point are the retire-TARGETS (the surviving consumed paths).
- **no-overfitting (precepts/README.md "No overfitting. A public surface, helper … needs a current consumer
  and evidence. Otherwise delete it."; precepts/audits/overfitting-audit.md).** The `GlassPanelVariant`/
  `GlassPanelProps` `/api` re-exports + the `createGlassFilter` imperative factory are overfit substrate (0
  consumers; the filter survives only because GlassPanel calls it). The wave DROPS the `/api` types + DELETES
  the imperative filter. The surviving `.glass-material` substrate story MUST NOT manufacture a NEW fake
  consumer (it reads the shipped grammar on `<Card>`/a `.glass-material` div — no new primitive, no new
  seam). The Card surface over-parameterization (tier × surface × shadow × grain × hover) is FLAGGED to W21,
  not re-architected here (W20 makes the SHIPPED toggles real — the minimal honest fix).
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation (the two are
  never collapsed; §0).** The invalid nested-hsl scrim is a LIBRARY-INTERNAL violation (a CSS form the
  parser silently drops) — it is fixed at root + the false comment that legitimized it is corrected (fail-
  explicit, not silently tolerated). The `<Dialog :native>` top-layer's BROWSER-API degradation (a
  `commandfor`/`interestfor` Baseline-LIMITED path, or a native-`<dialog>` unsupported engine) stays
  BEFITTING-SILENT — feature-detected as a pure progressive enhancement over a working JS-open default. MUST
  NOT collapse the two: the library-internal CSS bug fails explicitly; the platform-capability gap degrades
  silently.
- **Gates close on evidence (precepts/README.md line 13; SPEC.md §Hard Gates lines 94-109 — build/test/
  runtime/diff/deletion, NOT "grep found a source string for runtime behaviour" line 108).** The gates are
  the `proof:no-nested-hsl` corpus SWEEP (a build/diff artefact — it asserts the source CSS form the parser
  provably drops, which IS the build-level defect), the `proof:card-toggle-perceptible` π-lane READBACK (a
  runtime artefact — pixel ΔE across a real switch flip), the `vue-tsc`/`npm run build`/`verify-export-types`
  BUILD canaries, the `proof:consumers-static`/`proof:storybook-ia` STRUCTURAL artefacts, and the DELETION
  proofs (dir absent / subpath 404). The close is the executed live π-lane Playwright pass (scrim dims /
  toggles read / `.glass-material` reads), never a headless proof alone — the cardinal AX precept.
- **no-silent-deferrals (precepts/instructions/tranche/SPEC.md §"consumer will be wired later" is NOT a valid
  gate, line 109; the §16.4 zero-loss).** The keyframes.js GlassPanel consumer-migration is NOT silently
  dropped — it is ROUTED to W35 with a named born-RED `proof:off-glasspanel` gate sequenced BEFORE the
  publish. The GlassNativeDrawer ASK is NOT dropped — it is EVALUATED in-scope or ROUTED to a named
  destination (real cross-repo debt with two named consumers). The fourier cartoon-card adoption is ROUTED to
  W34. The Card over-parameterization is ROUTED to W21. Every deferred item carries a named destination — no
  "deferred to next tranche."
- **documentation-is-part-of-the-change (precepts/README.md line 16; SPEC.md line 158 — wave close updates
  docs).** The false `tokens.css:1288` "legitimate single-token alpha case" comment is CORRECTED (the
  doc-truth that froze the bug); the `manifest.ts:141` native-top-layer description is reconciled to the
  fold; the GlassPanel-RETIRED MIGRATION.md entry is authored (via W21's `proof:no-retired-survivor`) so the
  binding doc never claims a survivor. MUST NOT leave the false alpha-case comment standing (it would
  re-legitimize the anti-pattern for the next dev).

---

## Open questions / RATIFY-BEFORE-IMPL

1. **FOLD vs KEEP the native-`<dialog>` pilot (F0/1b — RATIFY-BEFORE-IMPL).** The manifest's stated
   fix-route + L inv 8 (a 1-consumer orphan retires) + the duplication of reka `<Dialog>`'s working
   `ModalOverlay scrim="glass"` all point to FOLD (add `<Dialog :native>`, retire `GlassDialogNative`).
   **Recommendation: FOLD.** A "keep standalone" path requires bringing `GlassDialogNative` to ≥2 consumers,
   which no surface supplies — RATIFY FOLD so the orphan is retired, not merely scrim-fixed. (The CSS
   root-fix at 1a happens REGARDLESS of this decision.)
2. **The card shadow-toggle repair shape (F1/2a — RATIFY-BEFORE-IMPL).** EITHER gate the tier's own
   `--glass-shadow-{tier}` so `shadow=false` reads genuinely flat, OR remove the shadow toggle as a
   non-feature (collapse the over-parameterized knob). **Recommendation: gate the tier's own shadow** (a real
   flat↔elevated control is more demoable than removing a knob, and matches the story's intent). RATIFY
   before touching `Card.vue` so the additive-`shadow-card` logic is edited once. (The grain toggle: raise to
   perceptible over cut, unless the tier already implies grain — RATIFY the grain floor.)
3. **The GlassNativeDrawer / `Drawer :native` ASK — IN-SCOPE vs ROUTE-OUT (F0/1c — RATIFY + ROUTE-DECISION).**
   The muster+speedtest cross-repo ask (`popover="manual"` + scroll-snap-detents + scroll-driven `@property`
   backdrop / a `Drawer :native` opt-in to sidestep the vaul-vue `activeSnapPoint` re-snap bug) shares the
   dialog-native fix-or-fold seam. **Recommendation: evaluate the `:native` opt-in pattern's generalization
   from Dialog to Drawer here; if it fits within W20's dialog scope (the `:native` pattern is the same),
   take it IN-SCOPE (≥2-consumer-gated muster+speedtest); if it exceeds W20 (the scroll-snap-detent +
   `@property` backdrop is a larger surface), route to a NAMED new AX wave.** Do NOT drop it — record the
   disposition in the audit json either way (real cross-repo debt, two named consumers, no current home).
4. **The `useGlassRenderer.ts` delete-vs-keep boundary with W26 (F2 — RATIFY-BEFORE-IMPL).** W26 owns the
   detector-vs-filter service-boundary split (slice 28 F1) + dependsOn W20. **Recommendation: W20 deletes the
   GlassPanel-DEPENDENT filter EXPORTS (`createGlassFilter`/`destroyGlassFilter`/`GlassFilterState` + their
   barrel re-exports) so the build greens with GlassPanel gone; W26 finalizes the DETECTOR-ONLY file shape
   (`detectTier()`/`tier`) + the `(window as any).chrome`→capability-probe cleanup.** RATIFY the exact
   delete boundary at the wave-open so the file is not double-edited in one merge window (if W26 lands first,
   W20 just removes the consumer).
5. **PUBLISH-CURRENCY verification (§4 note 12 — RATIFY the don't-re-fix guardrail).** Per §4 note 12 a CLASS
   of "still broken" findings is a publish-currency gap (the fix is at HEAD; the consumers measured stale
   3.4.0–3.6.0). **Recommendation: the wave-open live re-diagnosis MUST confirm each of the three W20
   witnesses is a HEAD-SOURCE defect** (re-proven against `eaba94f` source, not assumed from the audit) —
   the three ARE source defects (the nested-hsl lines, the additive-shadow Card logic, the JS renderer all
   present at HEAD source). RATIFY that W20 fixes only the HEAD-source defects and does NOT re-fix anything
   already landed (e.g. the AW.W24 specular pointer-wiring is at HEAD — W20 verifies, does not re-wire); the
   PUBLISH of the retire is the W33/W35 pin-bump hinge.
