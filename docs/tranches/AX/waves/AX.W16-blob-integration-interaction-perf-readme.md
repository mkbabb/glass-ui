# AX.W16 — Blob integration + interaction + performance + README

**Band** D · BLOB · **Severity** major · **dependsOn** AX.W08, AX.W15 · **Charter** AX.md §3
(the `### AX.W16` block, lines 881-921) + §2b band-D precept row (line 216) + §4 note 13 (the POS_SCALE
disposition W16 inherits — W16 touches NO length constant) · **Audit** `deep-audit-corpus.json` slice
`blob-integration-perf` (index 13, findings F0-F6) + slice `blob-interaction-visual` F5 (index 12, the
oversize-canvas fragment-cost trim) + slice `god-modules` F4 (index 25, the `useMetaballRenderer` split —
COORDINATE-ONLY, owned by W26) + `constellation-analysis-corpus.json` slices `leverage:value.js` F5 /
`idiom:value.js` (the value.js goo-blob fork + WatercolorDot+`<SvgFilters>` global-singleton repatriation,
gated behind this wave, routed to W34) + the KF-4 demand-park/PRM corroboration (speedtest meter rAF).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on a **runtime-integration** witness that does NOT exist at HEAD `eaba94f`. The blob's
PRIMARY glass-ui integration contract — the documented WCAG-2.2.2 `DockBackgroundToggle` pause/resume seam —
is a **runtime no-op**, the demand gate is **defeated for the onscreen-idle hot path**, and the README
documents a surface that does not match the code. This is the canonical AW headless-green/visually-broken
class: typecheck is green, every static gate is green, and the cross-component integration is dead.

- **RED witness 1 (the headline — the pause/resume seam is dead; blocker).** `GooBlob.vue:148`
  `defineExpose({ nudge, setMood, pulse, currentMood })` OMITS `pause`/`resume`. The renderer DOES return
  them (`useMetaballRenderer.ts:558-567` returns `{ pause, resume }`), but `GooBlob.vue:94` calls
  `useMetaballRenderer({...})` and **DISCARDS the return value** (no assignment). So `blob.value.pause()` is
  `undefined` at every consumer call site — the `DockBackgroundToggle` JSDoc seam (`DockBackgroundToggle.vue:22-24`),
  the README "Exposed via defineExpose" table (`README.md:120`), and the README worked example
  (`README.md:341` `blob.value?.pause()`) ALL document a seam that does not exist. The README's optional-chain
  `?.` silently swallows the `undefined`, so a consumer following the docs gets a pause button that does
  nothing **with zero error**. *Falsifiable RED:* mount `<GooBlob>`, wire a `DockBackgroundToggle`, click
  pause, and assert the rAF loop parks — at HEAD the loop keeps running (the call no-ops) and a
  `'pause' in blob.value` probe is **false**. After the wave: pause parks the loop (or a `v-model:paused`
  prop owns it) and the README table matches the exposed surface (GREEN).

- **RED witness 2 (the demand gate is a no-op onscreen; major).** `useMetaballRenderer.ts:511-520`
  `shouldContinue() { return !paused }` — so unless MANUALLY paused, the rAF reschedules forever
  (`createCanvasLifecycle.ts:106-109` keeps requesting frames while `shouldContinue()` is true); the renderer
  comment (`:512`) literally says *"the blob is perpetually animated."* A small idle ambient accent blob (the
  README's #1 use case — *"≈7rem ambient brand mark, slow, calm"*) burns a full 60fps rAF — FBM×3 octaves
  twice per pixel + a full OKLCh round-trip per fragment — **indefinitely, onscreen, at rest**. The substrate
  built an entire demand gate (`shouldContinue`) the blob deliberately defeats; the README's *"park
  aggressively"* claim covers ONLY offscreen/hidden/PRM, never the onscreen-idle hot path. The never-shipped
  `quality:'full'|'half'` axis (`README.md:275`, marked *"Planned — AW"*) was never wired. *Falsifiable RED:*
  mount an idle blob onscreen, settle the mood/pointer/trail, count rAF callbacks over a 2s window — at HEAD
  the count is unbounded (~120 frames); after the wave a quiesced blob parks (count → ~0 between satellite
  phase transitions, waking on the scheduler).

- **RED witness 3 (multi-instance context-cap; major).** Each `<GooBlob>` grabs its OWN webgl2 context
  (`useWebGLCanvas.ts:110`, one `getContext` per canvas). The `goo-blob` story mounts 3 live `<GooBlob>`,
  `blob-mood` 2, `blob-interaction` 1, and the demo navigates between them; Chromium caps ~8-16 live WebGL
  contexts/page (`useWebGLCanvas.ts:124` names *"~8 in Chromium"* + forces `WEBGL_lose_context` on teardown).
  The `IntersectionPause` park stops the rAF but does NOT release the context — an offscreen-but-mounted blob
  still holds a context slot. Git archaeology: commit `9427536` *"fix(blob): lazy-mount via
  IntersectionObserver — Chrome MCP audit caught WebGL context-cap exhaustion"* — this exact failure class
  was hit live before. *Falsifiable RED:* mount N decorative blobs on one page and assert the live
  GL-context count stays bounded — at HEAD it grows linearly per instance and the (N>cap)th creation silently
  fails/evicts.

- **RED witness 4 (the duplicated `var()`-unwrap leaks DOM into the renderer; minor + DRY).**
  `GooBlob.vue:75-88` `resolveColorString` and `useMetaballRenderer.ts:159-173` `resolveRimColor` BOTH do
  `el.style.color + getComputedStyle` to un-wrap `var(--token)` — the renderer reaches BACK into the canvas
  element to do a `getComputedStyle`, coupling the pure-fn `ColorResolver` contract (the AT.W0 inv-K-3 seam,
  designed to keep the renderer DOM-free) to a DOM read it was specifically built to avoid. *Falsifiable RED:*
  `grep "getComputedStyle"` finds it in BOTH `GooBlob.vue` AND `useMetaballRenderer.ts`; the renderer is NOT
  DOM-free. After the wave: ONE `resolveTokenColor` leaf, the SFC un-wraps every string before handing it to
  the renderer, the renderer's `resolveRimColor` + `rimCache` are gone, and `getComputedStyle` appears
  exactly ONCE.

- **RED witness 5 (README planned↔landed drift, both directions; minor).** `README.md:120` lists
  `pause`/`resume` in the "Exposed" table but they are NOT in `GooBlob.vue:148`; conversely `README.md:255-258`
  marks `deriveBlobPalette`/iridescence/SSS/composed-rest-pose as *"Planned — AW"* but they SHIPPED (commits
  `953fdf4`/`365a2e5`/`useBlobPointer.rest()`). The README drifted into describing unshipped features as
  shipped AND shipped features as planned because no live audit gates the README against the code. *Falsifiable
  RED:* a README-vs-code consistency probe — every method in the "Exposed" table must appear in the
  `defineExpose` list — FAILS at HEAD on `pause`/`resume`.

The wave is RED at HEAD on all five; the HardGate drives the integration/perf witnesses to GREEN.
**Method caveat (inherited from W08, audit-cited):** WebGL `readPixels`/`drawImage` returns 0 against this
substrate (`preserveDrawingBuffer: false` clears post-composite + the demand-loop parks) — the rAF-park
assertion is observed via the lifecycle's frame-callback count / `isRunning()` seam (NOT a pixel readback),
and any pixel-truth in the live audit uses the W00 `preserveDrawingBuffer: true` test context.

---

## Goal

The blob's glass-ui integration is REAL — the `DockBackgroundToggle` pause/resume seam actually parks the
loop, an onscreen-idle blob quiesces instead of burning full fps, a multi-instance grid stays under the
WebGL-context cap, the renderer is DOM-free behind ONE `resolveTokenColor` leaf, and the README matches the
shipped surface — locked by a live π-lane gate that asserts the loop parks on pause.

---

## Scope (the gestalt fix — restore the real integration contract; no workaround, no parallel pause path)

W08 un-floods the SDF and W15 perfects the contained lit droplet; W16 makes the droplet a real, integrated,
performant glass-ui citizen. Six cohesive arms, all on the `goo-blob/` tree (plus the perf trim and the README
sweep). **W16 touches NO length constant** — the geometry/POS_SCALE regime is W08/W15's atomic job (§4 note
13); W16 inherits it untouched.

1. **Restore the WCAG-2.2.2 pause/resume seam (F0 — blocker root). RATIFY-BEFORE-IMPL: declarative
   `v-model:paused` is the recommended path.** The audit gestalt offers two shapes: (a) the minimal capture —
   `const { pause, resume } = useMetaballRenderer({...})` then add them to `defineExpose`; or (b) the
   **collapse-the-seam** — `<GooBlob>` accepts a `v-model:paused` prop and OWNS the pause itself, so the
   consumer never reaches into a `ref` and the seam becomes declarative + impossible to leave unexposed.
   **RECOMMENDED PATH: (b) `v-model:paused`** — it is the same shape `DockBackgroundToggle` already wears
   (`v-model:paused` host reflecting `aria-pressed`, CLAUDE.md §DockBackgroundToggle), it makes the seam
   STRUCTURALLY un-droppable (a discarded return cannot recur), and it matches the AW.W7 G2
   `@update:paused → renderer.pause()/resume()` contract the toggle was built against (Aurora's `useAurora`
   already exposes `pause()`/`resume()` — the blob reaches PARITY). The two-step capture (a) is the FALLBACK
   if a consumer survey shows imperative `blob.value.pause()` call sites that must keep working — in which
   case BOTH are exposed (the prop owns the default, the imperative handles stay re-exposed). **This decision
   is RATIFIED in the §Archaeology + the audit ledger before impl** (it changes the GooBlob public surface —
   a `paused` prop + emit vs a `defineExpose` extension). Either way: NO parallel pause path is added — the
   seam binds the EXISTING renderer `pause()`/`resume()` (the same KISS contract `DockBackgroundToggle` holds
   for Aurora).

2. **Give the blob a genuine quiescence signal feeding `shouldContinue` (F1 — major).** Replace
   `shouldContinue() { return !paused }` with a real at-rest predicate: park when **mood is settled** (not
   transitioning) **AND** the pointer spring is at rest (`|v| < eps`) **AND** the trail is collapsed **AND**
   the click pulse is 0 **AND** no satellite is mid-merge — and `wake()` from the satellite scheduler when the
   next orbit/merge phase is due (the satellite system already knows its phase timers). This converts the
   perpetual loop into an **event-scheduled** one: the blob renders when something is actually changing. This
   is the single biggest fill/battery lever after the offscreen-park, and it closes the same demand-gate class
   speedtest's KF-4 measured the meter rAF loop violating (ran HIGHEST under PRM, V6). Wire the never-shipped
   `quality:'full'|'half'` axis (`README.md:275`) — half-res metaball pass + bilinear upsample, ~4× fragment
   savings for weak GPUs.

3. **Solve the multi-instance WebGL-context cap (F2 — major).** Two-tier, per the audit:
   (1) the static/ambient register routes to **`WatercolorDot`** (the explicit CSS/SVG sibling — the README
   already frames them as *"deliberate siblings"*) where no per-pixel GL is needed; a decorative thumbnail
   does not need its own GL context. (2) For a genuine multi-instance interactive grid, render every blob in
   ONE shared context+canvas via per-instance viewport scissoring. **Reserve `GooBlob` for the ONE
   interactive hero**; the blob-grid story becomes WatercolorDots. The demo stories (`goo-blob.vue` 3 mounts,
   `blob-mood.vue` 2) are re-cast accordingly so the canonical demo does not itself exhaust the cap.

4. **Hoist ONE `resolveTokenColor(css, el): concreteCss` leaf (F4 — minor + DRY + leak).** A tiny `dom/`
   composable that un-wraps `var(--token)` via a single cached cascade read. The SFC does ALL un-wrapping
   (base + rim + every palette stop) BEFORE handing strings to the renderer, so the renderer's `colorResolver`
   only ever sees CONCRETE strings and stays DOM-free as the inv-K-3 seam designed. The renderer's
   `resolveRimColor` + its `rimCache` DELETE entirely. One un-wrap path, one cache, the seam boundary
   restored. (value.js's `parseCSSColor` cannot parse `var(--token)` and threw once/frame — the AW.W13
   `374b98e` throw-fix — so a DOM-cascade un-wrap IS genuinely needed; it just belongs in ONE leaf.)

5. **Fold the oversize-canvas fragment-cost trim (slice 12 F5 — perf).** Now that W15 contains the field,
   trim the canvas oversize toward the measured-minimal orbit envelope; add the cheap **pre-FBM bounding
   discard** (`length(uv) > maxReach → return transparent` BEFORE the two FBM calls); gate the `surfaceNormal`
   4-tap `sceneDist` behind the lit/iridescence/SSS path ONLY (it quadruples the field cost per pixel). This
   is the perf companion to W15's geometry — it shares the contained-footprint W15 lands.

6. **Tighten the offscreen-park one-writer-per-reason invariant (F6 — minor; PRESERVE the substrate).** The
   substrate is the MODEL — do NOT rebuild it. The ONE latent concern: both the content-visibility path
   (substrate, `contentvisibilityautostatechange`) and the IntersectionObserver path (consumer, `rootMargin:200px`)
   write the SAME `'off-screen'` reason key, so an IO resume can lift a legitimately-skipped CV suspend. Give
   the IO fallback its OWN reason key (`'off-screen-io'`) distinct from CV's `'off-screen'`, so the loop runs
   only when BOTH agree the surface is visible (the `Set<reason>` is empty) — the "one writer per reason"
   invariant becomes literally true.

7. **Run the README planned→landed sweep + fix the defineExpose table (F5, F3-doc, slice 11 F2 — README
   close).** Flip the `deriveBlobPalette`/iridescence/SSS/composed-rest-pose sections from *"Planned — AW"* to
   shipped; fix the "Exposed" table to match the actual `defineExpose` surface (after arm 1, `pause`/`resume`
   or `v-model:paused` is true); document the quiescence/quality axes + the contained-droplet default
   (inheriting W08/W15's distance-regime note). Author the README in the **canonical README shape**
   (`docs/precepts/canonical-readme-shape.md`). Add the README-vs-code consistency check to the gate set
   (every "Exposed" table method appears in `defineExpose`) so it cannot drift again — this is the blob band's
   §13 W33-class README close, executed HERE rather than chronically deferred.

### value.js consumer-fork repatriation (named blob-band close-criterion — routed to W34)

Per `leverage:value.js` F5 + `idiom:value.js`: value.js carries a divergent LOCAL goo-blob fork
(`demo/@/components/custom/goo-blob/` — GooBlob.vue + 4 composables incl. a 343-line `useMetaballRenderer`
with its own `cssColorToRgb` value.js-parse path) in 3 mounts (HeroBlob, BlobPane, color-picker App),
self-flagged in value.js's own `demo/CLAUDE.md` as *"consumes glass-ui pending — extirpation routes to a
successor tranche."* It ALSO carries a local `WatercolorDot` coupled to a global `<SvgFilters>` singleton
(`filter: url(#watercolor-filter)`) in 9 sites — the exact fragile global-plumbing the `/watercolor-dot`
AU.W7 lift killed. **Once W08/W15/W16 land the contained lit droplet,** value.js DELETES its goo-blob fork →
`@mkbabb/glass-ui/goo-blob` (wiring value.js color through the injected `ColorResolver` seam — value.js IS the
color source, a clean seam) AND its WatercolorDot + `<SvgFilters>` mount → `@mkbabb/glass-ui/watercolor-dot`.
This is the **named close-criterion** of the blob band so the fork does NOT linger as permanent debt. The
value.js BlobDot/Metaballs family home-coordination + post-v1.0.0 public-surface gate + the consumer-injected
ColorResolver contract (AS-P3) FOLD into W16's surface decisions (the `/goo-blob` public surface W16 hardens
is what value.js resolves through). **W16 writes NO value.js source** — the adoption edit is W34; W16 records
the close-criterion + verifies the `/goo-blob` surface is consumer-ready.

### NOT in scope (routed elsewhere — no scope-creep)

- **The smin distance regime / POS_SCALE** — W08 (the un-flood) + §4 note 13 (the disposition). W16 touches
  NO length constant.
- **Contained-droplet geometry, the lit warm-cream default, the living-membrane edge, the interaction-magnitude
  re-balance** — W15. W16 makes the ALREADY-contained-and-lit droplet integrated/performant; it does NOT
  re-solve the geometry or re-balance interaction magnitudes.
- **The `useMetaballRenderer.ts` god-module split** (569 lines, RED at HEAD on `proof:no-god-module`) — slice
  25 F4, owned by **W26** (which `dependsOn AX.W16`). W16 COORDINATES (it leaves the renderer in a clean,
  split-ready shape — arm 4 already removes `resolveRimColor`+`rimCache`, shrinking it), but does NOT carve
  `metaball-program.ts` / `uploadMetaballUniforms.ts`. The split lands AFTER W16 so it carves the FINAL model
  (the pause-capture + DOM-free-renderer shape), not mid-churn.
- **The value.js goo-blob/WatercolorDot fork DELETIONS** — W34 (cross-repo consumer adoption). W16 records the
  named close-criterion + readies the `/goo-blob` + `/watercolor-dot` surfaces; it writes no sibling source.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/components/custom/goo-blob/GooBlob.vue` | Add the `v-model:paused` prop + emit (RATIFIED path) OR capture `const { pause, resume }`; extend/realign `defineExpose` (`:148`); REMOVE the local `resolveColorString` (`:75-88`) → un-wrap every color via the new `resolveTokenColor` leaf BEFORE handing to the renderer; re-cast the canvas-oversize toward the trimmed envelope (`:203-213`) in concert with the perf trim. |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | Replace `shouldContinue()` (`:511-520`) with the quiescence predicate + `wake()` from the satellite scheduler; wire `quality:'full'|'half'`; DELETE `resolveRimColor` + `rimCache` (`:159-173`) — the renderer receives concrete strings only (DOM-free); gate the `surfaceNormal` 4-tap behind the lit path. (NO uniform-upload length edits — POS_SCALE/geometry are W08/W15.) |
| `src/components/custom/goo-blob/composables/useBlobMood.ts` | Expose the "mood settled / not transitioning" predicate the quiescence signal reads (read-only seam; NO smoothK edit — W08 owns the mood lerp). |
| `src/components/custom/goo-blob/composables/useBlobPointer.ts` | Expose the "pointer spring at rest (`|v|<eps`) + trail collapsed + pulse 0" predicate the quiescence signal reads. |
| `src/components/custom/goo-blob/types.ts` | Add the `quality` axis type + the `paused` prop/emit types (NO `BLOB_CONFIG_DEFAULTS` length/smoothK edit — W08/W15). |
| `src/composables/dom/useResolveTokenColor.ts` (or `resolveTokenColor.ts`) | **NEW** — the single `resolveTokenColor(css, el): concreteCss` leaf (one cached `getComputedStyle` cascade read) on the `dom/` subtree. |
| `src/composables/dom/index.ts` | Re-export the new leaf from the `dom/` barrel. |
| `src/composables/glass/webgl/createCanvasLifecycle.ts` | Give the IO fallback its OWN `'off-screen-io'` reason key distinct from CV's `'off-screen'` (`:83-150`) — the one-writer-per-reason tightening (F6). |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` (IO write) | Write `'off-screen-io'` (not `'off-screen'`) at the IO seam (`:185-192`), pairing the F6 tightening. |
| `demo/stories/substrates/goo-blob.vue` · `demo/stories/substrates/blob-mood.vue` | Re-cast the multi-mount blob grids → WatercolorDots for the static register; reserve ONE `<GooBlob>` interactive hero; add a `DockBackgroundToggle`-wired pause-seam demo section. |
| `demo/stories/substrates/blob-interaction.vue` | Wire the `DockBackgroundToggle` pause seam into the interactive-hero story (the live π-lane fixture). |
| `src/components/custom/goo-blob/README.md` | The planned→landed sweep + the defineExpose-table fix + the quiescence/quality/contained-default doc, authored in the canonical README shape. |
| `tests-visual/blob-pause-seam.spec.ts` | **NEW** — the born-RED π-lane spec: wire `DockBackgroundToggle` to a mounted `<GooBlob>`, assert the rAF parks on pause; assert a multi-instance context-count bound; assert README-vs-code defineExpose consistency. |
| `scripts/proof-blob-integration.mjs` | **NEW** — the `proof:blob-integration` gate driver (invokes the π-workspace spec + the context-count bound + the README consistency check). |
| `package.json` | ADD `proof:blob-integration` (+ the W00 `proof:gate-script-parity` meta-gate match). |
| `docs/tranches/AX/audit/W16-blob-integration.json` | **NEW** — the born-RED→GREEN ledger + the `v-model:paused` RATIFY record + the value.js repatriation close-criterion. |

**OUT of bounds:** every length/geometry/POS_SCALE constant (`types.ts` `BLOB_CONFIG_DEFAULTS.smoothK`,
`bodyRadius`/`orbitRadius`/satellite radii, the `useBlobMood` smoothK lerp, the `* POS_SCALE` uploads) — W08
+ W15 own the distance regime atomically (§4 note 13); W16 touches NO length. The shaders
(`sdf-body.glsl.ts`, `metaball.frag.ts`) — except the gated `surfaceNormal` 4-tap branch + the pre-FBM
bounding discard, both pure perf trims that do NOT alter the field shape. The `useMetaballRenderer` god-module
CARVE (`metaball-program.ts` / `uploadMetaballUniforms.ts`) — W26. The value.js fork source — W34. The aurora
WGSL / `WEBGPU_PARITY` surface — W07/W14 (disjoint sibling graphics). The W00 `tests-visual/` harness +
`proof:substrate-paints-color` — W00 owns the floor; W16 composes it in its OWN spec.

---

## Disjointness (sibling waves it must NOT overlap; shared files + collision-avoidance)

W16 is the THIRD and final wave of the **D · BLOB** band and is **sequential** behind its two predecessors —
it is NOT a concurrent lane:

- **vs W08 (blob core unblock).** W08 owns the smin distance regime, the POS_SCALE restore, the
  `BLOB_CONFIG_DEFAULTS.smoothK` re-derivation, the mood smoothK lerp. **W16 touches NO length constant** — the
  shared files (`types.ts`, `useMetaballRenderer.ts`, `useBlobMood.ts`) are touched on DISJOINT axes: W08
  edits the length/smoothK/POS_SCALE lines; W16 edits the pause/quiescence/DOM-free/quality lines and only
  READS the mood predicate. Sequential (W16 `dependsOn` W08) — no concurrent collision because they run in
  series, but the FileBounds table above is explicit about which lines each owns so the W08→W15→W16
  three-way diff over `useMetaballRenderer.ts` is clean.
- **vs W15 (blob contained-droplet geometry).** W15 owns the geometry constants (body/orbit/satellite radii),
  the lit warm-cream DEFAULT (`BLOB_CONFIG_DEFAULTS` lit/iridescence/SSS turn-on), the living-membrane edge,
  the interaction-magnitude re-balance, and (per §4 note 13) the OPTIONAL atomic length re-derivation. **W16
  touches NONE of those.** W16's perf trim (arm 5) operates on the contained footprint W15 LANDS — it reads
  W15's measured-minimal envelope, never re-solves it. Sequential (W16 `dependsOn` W15). The shared
  `proof:blob-render` gate (W08-authored, W15-retuned) is INHERITED by W16's live audit, never re-authored —
  W16 adds the SEPARATE `proof:blob-integration` gate (pause-seam + context-count + README consistency), a
  disjoint axis from W08/W15's rendered-pixel `proof:blob-render`.
- **vs W26 (TS god-module split).** **W26 `dependsOn` W16** and runs AFTER it. W16 leaves
  `useMetaballRenderer.ts` in a clean, smaller, split-ready shape (arm 4 deletes `resolveRimColor`+`rimCache`);
  W26 carves `metaball-program.ts` + `uploadMetaballUniforms.ts`. NO overlap (W16 does not carve; W26 does not
  re-wire integration). The collision risk is the shared file — avoided by sequence (W16 first, W26 after) +
  the FileBounds discipline (W16's edits are integration-surface, W26's are structural-extraction).
- **vs W00 (π lane).** W00 owns `tests-visual/` + `proof:substrate-paints-color` + the rAF-park observation
  seam. W16 COMPOSES the park-observation primitive in its OWN `blob-pause-seam.spec.ts` with the
  pause-seam-specific assertions. Shared file `package.json` — W16 adds ONE `proof:blob-integration` key (+
  the meta-gate match); coordinate the `scripts` hunk (distinct key, no semantic overlap with W00/W08/W15's
  entries).
- **vs W34 (cross-repo consumer adoption).** W16 authors NO value.js source — the goo-blob/WatercolorDot fork
  DELETIONS are W34. W16 records the named close-criterion + readies the `/goo-blob` + `/watercolor-dot`
  surfaces; W34 lands the consumer edit AFTER the AX cut publishes.
- **Shared demo files.** `demo/stories/substrates/goo-blob.vue` / `blob-mood.vue` / `blob-interaction.vue` are
  ALSO touched by W08/W15 (the rendered-pixel A/B fixtures). W16's edits are ADDITIVE on a disjoint axis (the
  WatercolorDot re-cast + the `DockBackgroundToggle` pause-seam section) and land LAST in the band — after the
  W08 un-flood + W15 droplet stabilize the visual baseline, so the demo re-cast does not churn against the
  still-changing render.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — two cohesive cohorts on the disjoint `goo-blob/` surface).**
  *Lane 1 (integration + DRY):* the `v-model:paused` seam (arm 1, RATIFIED), the `resolveTokenColor` leaf +
  the renderer DOM-free conversion (arm 4), the demo `DockBackgroundToggle` wiring + WatercolorDot re-cast
  (arms 1/3-demo). *Lane 2 (performance):* the quiescence signal + `quality` axis (arm 2), the oversize trim +
  pre-FBM discard + gated 4-tap (arm 5), the `'off-screen-io'` reason-key tightening (arm 6). Both lanes
  share `useMetaballRenderer.ts` on DISJOINT line ranges (lane 1: color-resolve/expose; lane 2:
  shouldContinue/quality/4-tap) — coordinate the single-file diff or serialize the two hunks. README sweep
  (arm 7) lands after both. Lint + typecheck at every interval.
- **Adversarially-verify (≤1 read-only lane).** PROVES the integration is REAL and the gate is load-bearing:
  wires a live `DockBackgroundToggle` to a mounted `<GooBlob>`, clicks pause, confirms the rAF loop PARKS
  (frame-callback count → 0) and resume restarts it; settles an idle blob and confirms the quiescence signal
  parks the onscreen loop (count drops between satellite phases) — and confirms the satellite scheduler WAKES
  it on the next phase (no frozen blob); mounts N blobs and confirms the GL-context count stays bounded;
  confirms `getComputedStyle` appears EXACTLY ONCE (the renderer is DOM-free). **ADVERSARIAL twist:** tries to
  make `proof:blob-integration` pass with the pause seam STILL unexposed (revert arm 1) and confirms it goes
  RED — i.e. proves the gate catches the very no-op that shipped green under the static cohort. Also confirms
  the quiescence signal does NOT freeze a blob that SHOULD be animating (mid-merge, active pointer, mood
  transition) — no false-park.
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors `tests-visual/blob-pause-seam.spec.ts` +
  `scripts/proof-blob-integration.mjs` + the `package.json` entry + the W00 `proof:gate-script-parity` match.
  Confirms `proof:blob-integration` FAILS at `eaba94f` (the pause no-op + the README table mismatch) and
  PASSES on the patched tree (pause parks, table matches, context bounded), using the W00 park-observation
  seam (NOT a pixel readback — the substrate-clear caveat).

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN.** `proof:blob-integration` (NEW, π-lane, fail-CLOSED, in the W00
visual-runtime workspace, DEFAULT WebGL2 engine):

- **Pause-seam parks the loop.** Mounts `<GooBlob>` + wires a `DockBackgroundToggle` (or sets
  `v-model:paused`), drives N frames, asserts the rAF loop is running; toggles pause, asserts the lifecycle's
  frame-callback count STOPS advancing (`isRunning()` → false / no further scheduled frames); toggles resume,
  asserts it restarts. **Born-RED at HEAD** (pause is `undefined`/discarded → the loop never parks). This is a
  **real-DOM/Playwright rAF-park observation**, NOT a `defineExpose`-string regex (the AX gate-philosophy
  lesson — the audit explicitly demands a runtime gate here).
- **Multi-instance context bound.** Mounts N decorative blobs (the re-cast grid), asserts the live
  GL-context count stays ≤ a bound (the WatercolorDot/shared-context routing holds). **Born-RED at HEAD**
  (linear per-instance contexts hit the cap — commit `9427536`'s incident class).
- **README-vs-code defineExpose consistency.** Asserts every method in the README "Exposed" table appears in
  `GooBlob.vue`'s `defineExpose` (or the prop/emit surface). **Born-RED at HEAD** (`pause`/`resume` in the
  table, not in the expose list).
- Composes the W00 rAF-park-observation seam; the blob-specific assertions (the pause-park, the context
  bound, the README consistency) are W16's parity assertions in its OWN spec file.

This is a **runtime-observation** gate (the precept-valid artefact form per SPEC.md §Hard Gates — a live
real-DOM rAF-park observation + a context-count probe + a doc-vs-code consistency assert), the structural
antidote to the static `defineExpose`-string class that let a dead seam ship green. It is NOT a
grep-for-method-name-as-runtime gate — the pause assertion observes the ACTUAL loop parking, not the
presence of a `pause` string.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on the blob stories (`/substrates/blob-interaction` interactive hero + the re-cast
`/substrates/goo-blob` WatercolorDot grid) at **≥ 3 viewports** (375×667 / 1280×800 / 1440×900) in **light
AND dark**:

- **Pause control STOPS the surface.** Clicking the `DockBackgroundToggle` visibly FREEZES the blob (the
  membrane stops warping, satellites stop orbiting); the glyph/label swaps Pause↔Play; resume restarts it.
  The control is reachable by ALL users (not gated behind PRM — the WCAG 2.2.2 Level-A obligation).
- **Idle blob throttles.** An onscreen idle ambient blob visibly quiesces (no perpetual full-fps churn — the
  frame cadence drops at rest, confirmed via the live frame-trace), and wakes legibly on interaction /
  satellite phase (no frozen-then-jerk artefact).
- **Multi-instance grid does not exhaust the cap.** The re-cast grid renders all instances (no
  silently-blank Nth blob from a lost context); the interactive hero remains the ONE live GL surface.
- **Affordance / hierarchy / spacing / NO visual occlusion** per the AX cardinal gate — the pause control is
  discoverable, the WatercolorDot static register reads identically to the GL blobs at decorative scale, and
  nothing occludes the surfaces behind.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, the W00 protocol: pause-does-nothing-before vs
pause-freezes-after + the idle-fps trace delta) is the binding close criterion. The cardinal AX lesson: every
static blob gate shipped GREEN over a DEAD pause seam — only the live rAF-park observation + the live audit
catch the class.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the RED witnesses against HEAD `eaba94f` on the
   live demo: wire a `DockBackgroundToggle`, click pause, confirm the loop does NOT park (`'pause' in
   blob.value` is false); count rAF callbacks over a 2s idle window (unbounded); mount N blobs, confirm the
   GL-context count grows per instance; `grep getComputedStyle` in both `GooBlob.vue` + `useMetaballRenderer.ts`;
   diff the README "Exposed" table vs `defineExpose`. Record the born-RED baseline in
   `audit/W16-blob-integration.json`. Do NOT proceed on the audit's word — re-prove the no-op live (§4 note 12
   "verify against HEAD").
2. **RATIFY the pause seam shape.** Decide `v-model:paused` (RECOMMENDED) vs the two-step capture (FALLBACK),
   surveying consumer call sites; record the decision + rationale in the audit ledger BEFORE impl (it changes
   the GooBlob public surface).
3. **Author the born-RED gate.** `tests-visual/blob-pause-seam.spec.ts` + `scripts/proof-blob-integration.mjs`
   + `package.json` entry (+ W00 meta-gate match); confirm it FAILS at HEAD (pause no-op + table mismatch).
4. **Restore the pause/resume seam (arm 1, RATIFIED path).** Land `v-model:paused` (or capture + re-expose);
   confirm pause parks the loop on the live render. Lint + typecheck.
5. **Hoist the `resolveTokenColor` leaf + convert the renderer DOM-free (arm 4).** Add the `dom/` leaf, move
   ALL un-wrapping to the SFC, DELETE `resolveRimColor`+`rimCache`; confirm `getComputedStyle` appears once.
6. **Wire the quiescence signal + quality axis (arm 2).** Replace `shouldContinue`; wake from the satellite
   scheduler; wire `quality:'full'|'half'`; confirm idle-park + correct wake + no false-park on the live render.
7. **Solve the multi-instance context cap (arm 3) + the demo re-cast.** Route the static register to
   WatercolorDot / shared-context scissoring; re-cast the grid stories; confirm the context-count bound.
8. **Fold the perf trim (arm 5) + the off-screen-io reason-key tightening (arm 6).** Oversize trim + pre-FBM
   discard + gated 4-tap; the `'off-screen-io'` distinct reason key.
9. **README planned→landed sweep + defineExpose-table fix (arm 7).** Flip the shipped sections, fix the table,
   document the integration/perf axes in the canonical README shape; the README-vs-code consistency check green.
10. **Gate GREEN + record the value.js repatriation close-criterion.** Confirm `proof:blob-integration`
    passes; run the VISUAL-TRUTH live audit (pause-freezes + idle-throttle + grid-renders) across ≥3 viewports
    × light/dark; capture the paired-π BEFORE/AFTER + DELTA; write `audit/W16-blob-integration.json` to GREEN
    with the value.js goo-blob/WatercolorDot repatriation note (routed to W34) + the W26 split coordination note.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W16-blob-integration.json` — the born-RED→GREEN ledger: the live RED witnesses (the
  pause-no-op reproduction, the unbounded idle-rAF count, the per-instance context growth, the
  `getComputedStyle`-in-both grep, the README-table mismatch), the per-finding (F0-F6 + slice-12 F5)
  disposition, the **`v-model:paused` RATIFY record** (recommended vs fallback + rationale), the quiescence
  predicate definition, the context-bound achieved, and the value.js repatriation + W26-split coordination
  notes.
- `scripts/proof-blob-integration.mjs` + `tests-visual/blob-pause-seam.spec.ts` — the new fail-CLOSED π-lane
  integration gate (pause-park observation + context-count bound + README consistency).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): pause-does-nothing (HEAD) vs
  pause-freezes-the-surface (after); the idle-fps trace delta (full-fps churn → quiesced); the multi-instance
  grid (lost-Nth-context → all-render) — across the interactive hero + grid stories × ≥3 viewports × light/dark.
- `src/components/custom/goo-blob/README.md` — the canonical-shape research-backed README, planned→landed
  swept, defineExpose-table true (the blob band's W33-class README close, executed here).
- A value.js-fork repatriation close-criterion note (echoed into W34) + a W26-split coordination note (the
  renderer left in split-ready shape).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(blob): proof:blob-integration born-RED — live rAF-park + context-bound + README-consistency gate (AX.W16)`
2. `feat(blob): v-model:paused declarative pause seam — restore the WCAG-2.2.2 DockBackgroundToggle integration (AX.W16 F0)`
3. `refactor(blob): hoist resolveTokenColor leaf + delete resolveRimColor/rimCache — renderer stays DOM-free (AX.W16 F4)`
4. `perf(blob): quiescence signal feeds shouldContinue + wire quality:full|half — park the onscreen-idle loop (AX.W16 F1)`
5. `perf(blob): route the static blob register to WatercolorDot/shared-context — bound the multi-instance WebGL cap (AX.W16 F2)`
6. `perf(blob): oversize-canvas trim + pre-FBM bounding discard + gate surfaceNormal 4-tap behind the lit path (AX.W16 slice12-F5)`
7. `fix(blob): off-screen-io distinct reason key — one-writer-per-reason for the offscreen park (AX.W16 F6)`
8. `docs(blob): canonical-shape README planned→landed sweep + defineExpose-table fix + consistency check (AX.W16 F5)`
9. `chore(AX.W16): audit ledger GREEN + paired-π pause/idle BEFORE/AFTER + DELTA + value.js repatriation note`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause (K W0). These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W08 (blob core unblock) — HARD.** W08 un-floods the SDF (restores POS_SCALE on `uSmoothK`, re-derives
  the smin band). W16 integrates/performs on the un-flooded field — a pause seam, quiescence signal, and demo
  re-cast over a FLOODED slab would be meaningless (the pause-park audit needs a visible droplet to confirm
  freezing). W16 inherits W08's POS_SCALE MINIMAL-un-flood regime untouched (§4 note 13).
- **AX.W15 (blob contained-droplet geometry) — HARD.** W15 perfects the contained, lit, warm-cream droplet
  and re-balances interaction magnitudes. W16's perf trim (arm 5) reads W15's measured-minimal orbit envelope
  (the oversize trim only makes sense once the field is contained); the VISUAL-TRUTH pause/idle audit closes
  on W15's device-true lit droplet (the "PENDING" W9 browserVerify, closed by W15). W16 touches NONE of W15's
  geometry/lit-default/interaction constants.
- **AX.W00 (π visual-runtime lane) — TRANSITIVE (via W08/W15).** The fail-CLOSED π workspace
  (`tests-visual/`) is the home of `proof:blob-integration` + the rAF-park observation seam + the binding
  live-audit close criterion. W00 enumerates the blob W9/W10/W11 browserVerify items as named re-probe
  obligations; W16's README close + pause-seam audit discharge the integration arm of that obligation. (W16's
  charter dependsOn lists W08+W15; W00 is the lane those depend on and W16 closes on.)
- **Downstream:** **AX.W26** `dependsOn` W16 (the `useMetaballRenderer` god-module split carves the
  W16-stabilized integration shape). **AX.W34** receives the value.js goo-blob + WatercolorDot fork
  consumer-adoption notes (gated behind W08/W15/W16 landing the contained, integrated, performant droplet +
  the AX cut publishing). **AX.W33** folds the blob README into the §13 README live-currency close (W16
  executes the sweep so W33 verifies, not re-authors).

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **The pause-seam discard.** `GooBlob.vue:94` calls `useMetaballRenderer({...})` and DISCARDS the return;
  `:148` `defineExpose({ nudge, setMood, pulse, currentMood })` omits `pause`/`resume` though the renderer
  returns them (`useMetaballRenderer.ts:558-567`). The seam was DOCUMENTED live (`DockBackgroundToggle.vue:22-24`,
  `README.md:120,341`) but never wired — a typecheck-green / runtime-dead gap (the methods exist on the
  discarded return type). The `DockBackgroundToggle` WCAG-2.2.2 control is AV.W7 G2's Level-A obligation; the
  blob never met it. **RATIFY:** the `v-model:paused` shape matches AV.W7 G2's `@update:paused →
  pause()/resume()` contract + Aurora's `useAurora` pause/resume parity (CLAUDE.md §DockBackgroundToggle).
- **`shouldContinue` perpetual loop.** `useMetaballRenderer.ts:511-520` `return !paused` + the `:512` comment
  *"the blob is perpetually animated"* — the demand gate the substrate built (`createCanvasLifecycle.ts:106-109`)
  is deliberately defeated for the onscreen-idle case. `README.md:275` `quality:half` marked *"Planned — AW"*,
  never shipped. The KF-4 corroboration: speedtest measured the SAME demand-gate-violation class on the meter
  rAF loop (ran HIGHEST under PRM, V6).
- **`9427536`** *"fix(blob): lazy-mount via IntersectionObserver — Chrome MCP audit caught WebGL context-cap
  exhaustion"* — the prior LIVE context-cap incident; the IntersectionPause it added stops the rAF but does
  NOT release the context (`useWebGLCanvas.ts:110,124-125` — one `getContext`/canvas, `lose_context` only on
  teardown). The audit's multi-mount stories (`goo-blob.vue` 3, `blob-mood.vue` 2, `blob-interaction.vue` 1)
  are the reproduction surface.
- **`374b98e`** (AW.W13 var()-throw fix) — value.js's `parseCSSColor` cannot parse `var(--token)` and threw
  once/frame, so a DOM-cascade un-wrap is genuinely needed; it was bolted on TWICE (`GooBlob.vue:75-88`
  `resolveColorString` + `useMetaballRenderer.ts:159-173` `resolveRimColor`) instead of extracted to one
  leaf — the DRY + DOM-leak the AT.W0 inv-K-3 seam (renderer DOM-free at the color boundary) was meant to
  prevent.
- **`953fdf4`/`365a2e5`** (W11 palette/iridescence/SSS ship) + `useBlobPointer.rest()` (composed rest pose) —
  shipped features the README still marks *"Planned — AW"* (`README.md:255-258,296`); conversely the
  defineExpose table claims `pause`/`resume` it does not expose. The README planned→landed sweep is the §13
  W33-class chronically-deferred close, executed in W16.
- **`0b27f01`** — `useMetaballRenderer.ts` was 351 lines (UNDER the 500-line limit) at the W13 split commit;
  feature accretion (W9 spec/rim, W10 pointer/trail, W11 iridescence/SSS/palette/tempo) grew it to 569 at
  HEAD `eaba94f` with no gate pressure (the gate was local-only). The split is W26; W16's arm-4 deletion of
  `resolveRimColor`+`rimCache` shrinks it toward the carve.
- **The well-architected substrate (PRESERVE).** `createCanvasLifecycle.ts:83-150` `Set<reason>` owner model +
  the content-visibility / IntersectionObserver offscreen-park + the live PRM freeze — the F6 finding's
  rootCause is literally *"N/A — this is the well-designed substrate"*; W16's ONLY substrate edit is the
  `'off-screen-io'` distinct reason key. The substrate is the model; W16 does not rebuild it.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; the dead pause seam + the
  perpetual idle loop + the per-instance context growth are live-proven here.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-D binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **one-path / no-legacy-code / no-workaround.** The pause seam binds the EXISTING renderer `pause()`/`resume()`
  via a SINGLE declarative `v-model:paused` (or the single capture) — NO parallel pause path, no side-channel
  token, no graceful-degrade swallow. The `var()`-unwrap collapses to ONE `resolveTokenColor` leaf — the
  duplicate `resolveRimColor`+`rimCache` DELETE entirely (one un-wrap path, one cache). The quiescence signal
  REPLACES the `return !paused` no-op (not a second loop) and the off-screen ownership becomes literally
  one-writer-per-reason. MUST NOT add a fallback pause path "just in case" the prop is unset (the
  `?.`-swallow that hid the dead seam is the exact anti-pattern).
- **substrate-with-consumer / wire-before-retire.** The `DockBackgroundToggle` pause seam is the blob's
  PRIMARY glass-ui integration contract (a real consumer); W16 makes it WORK before anything is retired. The
  value.js goo-blob + WatercolorDot fork retirement is NOT silently dropped — it is the NAMED blob-band
  close-criterion (the `/goo-blob` + `/watercolor-dot` surfaces W16 readies, value.js adopts in W34 AFTER the
  droplet is device-true). The library fix lands FIRST; the consumer adopts after — never a retire-before-wire.
- **fail-explicit (vs befitting-silent browser-API degradation).** A dead pause seam that silently no-ops
  (the `?.`-swallowed `undefined`) is a LIBRARY-INTERNAL violation — it is FIXED at its root + LOCKED by a
  live rAF-park gate that goes RED on a re-discard, NOT papered over. The PRM freeze + the
  content-visibility/IntersectionObserver offscreen-park stay BEFITTING-SILENT (browser-API degradation —
  PRESERVE the substrate, do not make it throw); the two are never collapsed. The static
  `defineExpose`-string-green-while-the-seam-is-dead is the silent-failure class W16 converts to a loud
  runtime RED.
- **no-overfitting.** The quiescence signal reads the EXISTING mood/pointer/satellite at-rest state (no
  speculative new config); the `quality` axis was already specced (`README.md` Planned) and is WIRED, not
  invented; the WatercolorDot routing reuses the EXISTING sibling primitive (not a new context-pool
  substrate). The `useMetaballRenderer` split is NOT done here (it is W26's job — W16 does not pre-empt it).
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates + §π).** The close is a live
  real-DOM rAF-park observation + a context-count probe + a doc-vs-code consistency assert (precept-valid
  artefact forms — runtime-observation, NOT grep-for-method-name) + the executed live Playwright +
  frontend-design audit (pause-freezes + idle-throttle) across ≥3 viewports × light/dark — NEVER a headless
  proof alone ("Runtime Truth Beats Source Claims"). The π visual-load-bearing-ness bar: the pause control was
  a shipped-but-dead integration; W16 makes it actually stop the surface and proves it live.
- **canonical-readme-shape.** The blob README is authored in the canonical README shape
  (`docs/precepts/canonical-readme-shape.md`) — the planned→landed sweep + the true defineExpose table + the
  integration/perf documentation, with a README-vs-code consistency gate so it cannot drift again. This is the
  §13 W33-class chronically-deferred README close, executed in-wave (no defer-to-next-tranche).
- **no-silent-deferrals / goal+completion-criterion paired (P-inv-28).** The W16 goal (a real integration) is
  paired with the `proof:blob-integration` completion criterion at the wave unit; the `useMetaballRenderer`
  split is explicitly ROUTED to W26 (not deferred), the value.js fork repatriation is ROUTED to W34 (a named
  close-criterion, not dropped), and the W08/W15 POS_SCALE/geometry boundary is RESPECTED (W16 touches no
  length — it inherits a decision, never re-litigates it).
