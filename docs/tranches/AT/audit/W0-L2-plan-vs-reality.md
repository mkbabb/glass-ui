# AT.W0 — Lens 2: the AS PLAN vs the SHIPPED 3.2.0 REALITY + the honest AT-owned state

Read-only audit, tranche-DEV only. Ground truth = the published artifact
(`audit/W6-postpublish-verify.md`: 13-agent sweep against the registry tarball,
all five adversarial probes `refuted:false`) + glass-ui HEAD on `master`
(version `3.2.0`, `package.json:3`). Cross-repo facts are read-only from the
fourier hub + value.js; every cross-repo item is NAME-FORWARD under inv-16 — AT
records, does not execute.

The question this lens answers: **what did AS claim vs what 3.2.0 actually
contains, and what is the honest remaining glass-ui-owned state AT must own?**

---

## 0 — One-line verdict

AS shipped EXACTLY what its own waves promised — the gate-integrity substrate
(inv-θ), the modern-web leverage (G4/G1/G2), the AS-GU folds, the visual/design
correctness (W7), and the 3.2.0 publish with provenance — and the post-publish
sweep verified the artifact sound. **The AS plan is honest about its scope.** The
gap is not a slipped AS commitment; it is a **cross-repo expectation gap**: the
value.js-K cohort spec (`value.js/docs/tranches/K/`) assigned the **blob-primitive
lift** to glass-ui "AS.W5→3.2.0", but glass-ui's own AS ledger consistently
NAMED-FORWARD it (P3, post-v1.0.0). That lift is the AT headline. Around it sit
four smaller true-state items AS deliberately left to a successor: the
`supportsPostTask` thin witness, the DataTable vueuse root-barrel reachability
(+ the missing gate), the GlassDock `overflow`-vs-`wrap` prop ambiguity, and the
P5 ruling (now OUTER-ONLY canonical — glass-ui is already consistent, the work is
on fourier's side).

---

## 1 — AS plan vs shipped reality: the wave-by-wave reconcile

Every AS wave is `DONE` in `PROGRESS.md`; the post-publish sweep is the
independent ground-truth check. The reconcile:

| AS wave | Claimed (AS.md / FINAL.md) | Shipped reality (3.2.0, verified) | Honest delta |
|---|---|---|---|
| W2 inv-θ | `constellation.mjs` + `gates.mjs` + pure-output + `proof:lockfile` + `proof:vt-names` hardened | `d2d1d0b`; W6-close confirms `git status` clean post-run, `gates:verify-ci` 14-gate match, vt-names 10-fixture spec | **MATCH.** Scripts not even shipped in the tarball (P5 probe) — no consumer surface |
| W3 G4 postTask | `usePrioritizedTask`/`postTaskSafe` on `/motion-core` + `platformSupport.ts` consolidation | `8c0cced`; `usePrioritizedTask.ts` ships; `supportsPostTask` on root barrel | **MATCH + 1 residue** — `supportsPostTask` is a thin witness (§3) |
| W4 G1/G2 | `@container style(--density)` + `@container scroll-state(scrollable)` retiring the overflow-fade listener | `8c0cced`; overfitting audit witnesses ConfiguratorRow + GlassCarousel | **MATCH** |
| W5 AS-GU | dock floor on the button + `deriveAurora` ONLY-IF live ≥2 + no double-mint | `8c0cced`; `deriveAurora` SHIPPED (W7 D10b is the witness) | **MATCH** — `deriveAurora` graduated BOOKED→SHIPPED via W7, `aurora/index.ts:28` |
| W7 visual | 13 defects fixed; aurora overhaul; GlassDock `overflow="scroll"` prop | `96858c8`/`00bd5f9`; the silent-no-op `scroll-on-overflow` kebab bug caught | **MATCH + the overflow prop is the seed of §4's ambiguity** |
| W2b floor | R1 externalize value.js (47.7→16.8 KiB) + R2 strip 68 `development` + R3 `--spacing`/`proof:components-css` + R7 keyframes peer | `8114bba`/`fef1b8e`/`5e2f055`; W6-close gate table all green | **MATCH** — R1 confirmed in tarball (`aurora.js` imports `@mkbabb/value.js`, oklab=2 not 40) |
| W6 close | overfitting clean (18/18) + 3.2.0 publish + provenance | `9031972` → tag `v3.2.0` (`8903d9d`) → release run `26964913257` SLSA `provenance/v1` | **MATCH** — published `dist/` sha256-identical to local (post-publish verify) |

**Conclusion: there is no AS over-claim.** AS.FINAL's success criteria are each
backed by a commit + a gate result, and the registry artifact is byte-verified.
This is the inverse of the AR→AS lineage (where AS.W0-L2 found the #177 "one
node-pin bump" was a 3-fault iceberg). AS shipped clean; the AT-owned state is
NOT a remediation of AS but the **forward work AS correctly named-forward**.

---

## 2 — The blob-primitives lift: the true ≥2-consumer status NOW (the AT headline)

This is the single load-bearing reconcile. Two records disagree on who owns the
blob lift and when:

- **value.js's cohort spec OWES it to glass-ui at 3.2.0.** `value.js/docs/tranches/K/K.md:26`
  (K.W3): "`goo-blob/` and `watercolor-dot/` are **deleted** and imported from
  `@mkbabb/glass-ui`." The K.W3-respec doc
  (`K.W3-respec-glassui-first-consummation.md`) is a *complete work-order* — it
  already specs the lift down to the seam (see §2.3). K.W3 is RE-SPECCED for
  "published-dist consumption" — i.e. it now waits on a glass-ui PUBLISH of the
  blob subpaths, which does not exist at 3.2.0.
- **glass-ui's own AS ledger consistently NAMED-FORWARD it.** `W0b-path-forward.md:106`:
  "P3 Metaballs+BlobDot post-v1.0.0 (the watercolor medium is the live blob
  surface; the net-new primitive stays named-forward)."
  `W6-postpublish-verify.md:64-69`: "glass-ui's own AS.W0b deferred ledger named
  them P3, NAMED-FORWARD, post-v1.0.0 … Lifting them is a real wave (a WebGL
  Metaballs renderer + GLSL + an injected color-resolver seam, inv-K-3) that
  warrants a proper tranche plan + a confirmed 2nd distinct consumer — NOT a
  reactive patch."

**This is a cross-repo expectation gap, not a slipped glass-ui commitment.** AS
was right to defer; the cohort spec is the work-order; AT is the proper tranche.

### 2.1 — The ≥2-DISTINCT-CONSUMER status NOW (the binary-substrate gate)

The overfitting bar is **≥2 distinct consumer CONTEXTS**, not call-sites in one
demo. Measured at HEAD:

- **WatercolorDot** — 9 call-sites, ALL inside value.js's ONE demo:
  `MixResultDisplay.vue:38/58`, `MixSourceSelector.vue:126/180`,
  `ImageEyedropper.vue:13`, `SpectrumCanvas.vue:21`, `EditDrawer.vue:7/13`,
  `SwatchHoverMenu.vue:14/28`, `CurrentPaletteEditor.vue:59/61`,
  `PaletteDialogHeader.vue:16`, `dock/Dock.vue:97/99/198`. **= 1 consumer
  context** (value.js demo). The "9 consumers" the post-publish sweep cited
  (`W6-postpublish-verify.md:64`) are all THIS one demo's sites.
- **GooBlob** — 1 call-site: `color-picker/visual/HeroBlob.vue:5`. **= 1 consumer
  context** (value.js demo).

**So the binary-substrate invariant (J inv 10 / L inv 8) is NOT yet met by
in-tree consumers alone.** value.js's demo is the 1st distinct context. A glass-ui
**demo story** is the canonical 2nd (a private demo helper clears the bar — same
shape `deriveAurora` used at W7, where the demo Derive-UI was the 2nd witness).
This is the precondition AT must book explicitly: the lift ships WITH a glass-ui
demo story so the ≥2-distinct-context bar is met at AT close, NOT on the promise
of value.js consumption alone.

### 2.2 — The injected color-resolver seam (inv-K-3) — the load-bearing design constraint

The user's headline ask names the seam exactly: "a REQUIRED injected
color-resolver seam (inv-K-3 — no value.js default baked in)." Located at HEAD:

- **The value.js default to NOT bake in:** `useMetaballRenderer.ts:44-70` — a
  1×1-canvas `getImageData` resolver (`resolverCtx` + `cssColorToRgb` + a
  256-entry `cssColorCache`), consumed at `:184` (`const rgb =
  cssColorToRgb(color.value)`). This is the value.js-side default.
- **The seam shape (already specced by the cohort):**
  `K.W3-respec-glassui-first-consummation.md:78` — DELETE the canvas resolver;
  `UseMetaballRendererOptions` gains a **required** `resolveColor: (css: string)
  => [number, number, number]`; the memoisation moves demo-side into the injected
  resolver. The glass-ui blob ships NO value.js default — a close-time grep of the
  glass-ui blob source for `parseCSSColor` / `getImageData` /
  `createElement("canvas")` → zero (`K.W3-respec...:208`).
- **Why the seam matters (the latent-dep trap):** `K.md:58` — "the primitive only
  ever needs RGB, so baking `parseCSSColor` as its default would make value.js a
  hard runtime dep of the glass-ui blob for *every* external consumer." Contrast
  aurora's *derive* path which genuinely needs OKLab (consumes value.js by design
  under inv-K-2). **The blob does NOT** — so the seam is what keeps the blob
  value.js-free. This is THE design point AT.W1 must encode as a gate.

**inv-K-3 is value.js-tranche-local, NOT a glass-ui precept** (confirmed: zero
hits for `inv-K-3` under `glass-ui/docs/precepts`). AT must NAME-FORWARD it
correctly: glass-ui honors the seam SHAPE (a required resolver param, no baked
default) because the binary-substrate + token-first invariants demand it
independently — not because glass-ui adopts a value.js invariant. The glass-ui
gate is: the blob subpath imports nothing from `@mkbabb/value.js` and has no
embedded CSS-color resolver.

### 2.3 — The full lift inventory (what AT actually moves)

The K.W3-respec is the ground-truth work-order. The lift is NOT one component —
it is a primitive FAMILY with three additional seams the K.md prose omitted:

1. **GooBlob** (Metaballs WebGL) — `GooBlob.vue` shell + `useMetaballRenderer.ts`
   (343 LoC) + `metaball.frag.glsl`/`metaball.vert.glsl` + `useBlobSatellites.ts`
   + `useBlobPointer.ts` + `useBlobMood.ts` + `types.ts` (`BlobConfig`).
   - **Seam A (color):** the required `resolveColor` param (§2.2).
   - **Seam B (mood):** `moodTargets?: Record<BlobMood, MoodParams>` defaulting to
     `DEFAULT_BLOB_MOODS` (`K.W3-respec...:82`) — the affective FSM (`HeroBlob.vue`)
     STAYS demo-side; the primitive ships color-+config-agnostic.
2. **WatercolorDot** — `WatercolorDot.vue` + `useWatercolorBlob.ts`.
   - **Seam C (SVG filter):** `WatercolorDot.vue:65` applies `filter:
     url(#watercolor-filter)`, the `<filter>` defined in the demo's
     `SvgFilters.vue:5`. The lifted component cannot assume `#watercolor-filter`
     exists in the consumer DOM. It takes an optional `filterId?: string` (default
     `undefined` → falls back to the border-radius morph + box-shadow alone, which
     reads organic). `K.W3-respec...:90`.
3. **The shared deps both pull (the orphan trap):**
   - **`prng.ts`** — `useBlobSatellites.ts:1` + `useWatercolorBlob.ts:2` both
     import `@composables/prng` (a *demo* path: `demo/@/composables/prng.ts`,
     Mulberry32). The lifted primitives cannot import a demo path; `prng.ts`
     (`mulberry32`/`hashString`/`randomRadii`/`radiiToCSS`) lifts to glass-ui as a
     generic deterministic-PRNG (`K.W3-respec...:94`). **glass-ui has no PRNG util
     today** — net-new generic leaf, ≥2-able (blob + watercolor + any future
     deterministic-shape primitive).
   - **The WebGL bootstrap** — `useMetaballRenderer.ts:2` imports
     `compileShader`/`linkProgram`/`createQuadVAO`/`getUniforms` from value.js's
     `@lib/animation/webgl-utils.ts`. glass-ui's aurora runtime already has its
     OWN inline bootstrap (`aurora/composables/runtime.ts:122-137`:
     `createShader`/`compileShader`/`createProgram`/`attachShader`/`linkProgram`).
     **The lift is the trigger to extract ONE shared glass-ui WebGL helper**
     consumed by aurora + goo-blob (the triple-dup retired, `K.md:26`). This is the
     elegance/performance transposition — aurora + blob share one bootstrap.

4. **The demand-driven RAF gate (D4) — port, don't re-invent.** K.W3 wants the
   blob to "park at steady state" (`K.W3-respec...` D4). glass-ui's aurora runtime
   ALREADY implements exactly this: `runtime.ts:507` `needsAnimation()` +
   `:546` `wake()` + `:533` `raf = needsAnimation() ? requestAnimationFrame(tick)
   : 0`. The blob's `useMetaballRenderer.ts` runs an unconditional RAF
   (`:252` `rafId = requestAnimationFrame(render)`). **The port is "mirror aurora's
   demand-gate"** — a within-library pattern, not a new invention.

### 2.4 — Sizing precedent

`/aurora` is a standalone 16.2 KiB-gzip WebGL chunk (`K/audit/W4-subpath-sizes.md:10`).
The blob family is a comparable WebGL+GLSL payload. It MUST ship as its own
subpath(s) (`@mkbabb/glass-ui/goo-blob`, `/watercolor-dot`) — NOT on the root
barrel (the root barrel is vueuse-/keyframes-FREE and must stay payload-lean; a
WebGL Metaballs chunk on the root barrel would be the exact anti-pattern the
76-entry split exists to prevent). The cohort spec already names the subpaths
(`K.W3-respec...:74` `@mkbabb/glass-ui/goo-blob`, `/watercolor-dot`).

---

## 3 — `supportsPostTask` — the wire-or-drop (a true AS residue)

AS.FINAL (`FINAL.md:174-176`) and the overfitting audit both flag it explicitly:
`supportsPostTask` is an exported public predicate with **0 in-repo call sites**.

Verified at HEAD:
- Defined `platformSupport.ts:23-27`, re-exported `utils/index.ts:9`, on the root
  barrel via `src/index.ts → ./utils`.
- `usePrioritizedTask.ts` does NOT call it — it uses `getSchedulerPostTask()`
  directly (`:38`, `:104`), a *local* function that duplicates the same
  `scheduler?.postTask` typeof check.

So there are TWO copies of the same feature-detect: the exported
`supportsPostTask` (0 callers) and the private `getSchedulerPostTask` (the real
one). The overfitting audit kept it as "exported public API" (passes the bar on
the export technicality), but AS.FINAL named the honest disposition:

> "AT should either wire it into `usePrioritizedTask` (DRY) or drop it."

**AT disposition:** WIRE — make `getSchedulerPostTask()` gate on
`supportsPostTask()` (one feature-detect, DRY), so the exported predicate has a
real in-repo consumer AND the duplication collapses. This is a clean ≤5-LOC
transposition, not a redesign. (Dropping is the alternative if no consumer wants
the predicate — but speedtest's AU-W0 `/motion-core` adoption is a named
candidate caller, `W6-postpublish-verify.md:36`, so WIRE is the lean choice.)

---

## 4 — GlassDock `overflow`-vs-`wrap` prop ambiguity (a true AS-introduced residue)

AS.W7 added the `overflow?: "grow" | "scroll"` prop (`GlassDock.vue:70`,
`8c0cced`/`00bd5f9` — the D2/D12 fix, plus the silent-no-op kebab catch). But
the dock ALSO already carries `wrap?: boolean` (`:18`) AND `containerName?:
string` (`:83`). The post-publish audit flagged the resulting ambiguity
(`W6-postpublish-verify.md:84`): "GlassDock `overflow` (3.2.0) vs the existing
`wrap` prop — clarify supersede-vs-additive so the bbnf-lang playground (`:wrap`)
migrates cleanly."

The HEAD reality (`GlassDock.vue:10-128`):
- `wrap` (`:18`) → adds `dock-wrap` class (`:323`) — "expanded content wraps to
  multiple lines."
- `overflow: "grow" | "scroll"` (`:70`, default `"grow"`) → `"scroll"` makes the
  dock a scroll port (`scrollClass` `:124-127`).
- `containerName` (`:83`) → establishes a container-query subject AND lifts the
  `overflow:hidden` clip to `overflow:visible` (`:105`).

These THREE props all touch "what happens when expanded content exceeds the dock
cap," with overlapping and partly-contradictory effects (`wrap` lets content
flow to multiple lines; `overflow:scroll` keeps one line and scrolls;
`containerName` lifts the clip entirely). There is no single coherent overflow
MODEL — there are three props that accreted across tranches (`wrap` is oldest,
`overflow` is AS.W7, `containerName` is the T-cluster container-query work).

**AT disposition (gestalt over patch):** collapse to ONE overflow model. A single
`overflow?: "grow" | "wrap" | "scroll" | "visible"` enum supersedes the boolean
`wrap` (no backwards-compat alias — clean break per inv 47) and folds the clip-lift
that `containerName` does as a side effect into the `"visible"` member.
`containerName` keeps ONLY its container-query-subject role. This needs a real
design slice (it restyles every dock consumer's overflow behaviour) + a migration
note for the one external consumer (bbnf-lang playground `:wrap`). It is a
DEV-then-IMPL item, NOT a reactive patch — exactly the "gestalt redesign over
incremental patch" the architectural-approach precept demands.

---

## 5 — The P5 ruling: now OUTER-ONLY canonical — glass-ui is already consistent

The user RULED P5 = OUTER-ONLY rounding is canonical (AS.W7 was right). The
reconcile: **is anything in glass-ui inconsistent with that?**

Checked at HEAD — glass-ui is ALREADY OUTER-ONLY and self-documents it:
- `Configurator.vue:130` — `rounded-panel ... overflow-hidden` on the container
  root (the clip owns rounding).
- `ConfiguratorLayer.vue:98` — an explicit comment: "No per-section radius:
  rounding is owned at the container root clip … flush sections keep straight
  border-b dividers — a per-section radius only deforms the hairline."
- `:100` — `border-b border-border/40 last:border-b-0` (straight dividers, no
  inner radius).

This is the `779fed7` revert of the per-section `rounded-panel` (`b6d6cf4`) after
W7 adversarial verification found it geometrically inert + divider-deforming
(`W6-close.md` / `FINAL.md:114-119`).

**Verdict: glass-ui owns NOTHING inconsistent with the OUTER-ONLY ruling.** The
fourier ADOPTION-ASK that wanted INNER section rounding
(`W6-postpublish-verify.md:51-58`) is a **misdiagnosis** — FINAL.md:117 already
calls it so ("The fourier ledger's 'not satisfied until inner sections round' is a
misdiagnosis; the user CANON … IS satisfied"). The user's ruling confirms this.
**AT owns no P5 work.** The only action is name-forward: record that fourier
adjusts ON ITS SIDE (its ledger row retires), NOT a glass-ui change. This is a
CLOSED item for glass-ui — AT states it terminally and moves on.

---

## 6 — The DataTable vueuse root-barrel reachability (a true AS-surfaced finding)

The post-publish audit surfaced this as "AT, not 3.2.1"
(`W6-postpublish-verify.md` / `FINAL.md:159-173`). Verified at HEAD:
- `src/index.ts:104` — `export * from "./components/ui/data-table"` (root barrel
  re-exports data-table).
- `DataTable.vue:3` — `import { useElementSize } from "@vueuse/core"`, consumed at
  `:78`.

So a vueuse symbol is reachable through the SOURCE root barrel — a Design-Axis-6
(vueuse-FREE root barrel) nuance. Pre-existing since `1c6c3e5` (v1.8.x), NOT an AS
regression. Build-split mitigates the common case (`dist/glass-ui.js` has 0
`useElementSize` static refs — DataTable is a lazy chunk), so it is not a bundle
defect for a tree-shaking consumer.

**The gate gap is the real finding:** no proof enforces vueuse-free-root-barrel.
`proof:package` is a resolution/type probe, not an `@vueuse`-reachability
import-graph trace. **AT disposition:** add a static-import-graph gate that fails
closed on `@vueuse/core` reachability from `dist/glass-ui.js` (and pick the fix —
make `data-table` subpath-only, OR swap `useElementSize` → the in-house
`useResizeObserver` at `composables/dom/`). This composes with inv-θ (a pure gate)
and closes a genuine Design-Axis-6 hole.

---

## 7 — The honest remaining glass-ui-owned state AT must own

Synthesizing §2-§6, the AT-owned ledger (what glass-ui actually owns, vs
name-forward):

| Item | Owner | Status NOW | AT disposition |
|---|---|---|---|
| Blob-primitive lift (GooBlob + WatercolorDot + prng + WebGL helper) | **glass-ui** | 1 in-tree consumer (value.js demo); ≥2 needs a glass-ui demo story | **AT headline** — DEV (audit+design) then IMPL; ships WITH a demo story for the 2nd context |
| The injected color-resolver seam (inv-K-3 shape) | **glass-ui** | specced by cohort, not built | **AT.W1 gate** — required `resolveColor` param, zero value.js default, zero embedded CSS-color resolver |
| `supportsPostTask` wire-or-drop | **glass-ui** | exported, 0 callers; dup of `getSchedulerPostTask` | **AT** — WIRE (DRY the two feature-detects) |
| GlassDock overflow/wrap/containerName ambiguity | **glass-ui** | 3 accreted props, no coherent model | **AT** — DEV+IMPL; collapse to one `overflow` enum, retire boolean `wrap` (clean break) |
| DataTable vueuse reachability + the missing gate | **glass-ui** | source root-barrel reaches vueuse; no gate | **AT** — add import-graph gate (fails on `@vueuse` from `dist/glass-ui.js`) + fix the leak |
| P5 OUTER-ONLY consistency | **glass-ui (CLOSED)** | already OUTER-ONLY + self-documented | **NONE** — terminal; fourier adjusts on its side (name-forward) |
| keyframes 3.0.0 peer / cohort consumption | **name-forward** | R7 shipped (`^2.2.0 \|\| ^3.0.0`) | name-forward (fourier/value.js own their bumps) |
| The control-pane polish (A-1 groove divider, A-2 typography ladder) | **glass-ui** | named-forward to AT at FINAL.md:140 | **AT candidate** — both single-component P2 polish; gate on ≥2 + the index.css 99.5% budget rebase |

---

## 8 — The AT wave-sequence skeleton (which waves, what order, DEV/IMPL boundary)

The blob lift is the headline; it warrants the full DEV→IMPL arc (a WebGL
renderer + GLSL + the seam + a new generic PRNG leaf + a shared WebGL helper
extraction is NOT a patch). The residues (§3/§4/§6) ride alongside. Proposed
skeleton — mirrors the AS shape (2 DEV waves, then IMPL, dev/impl boundary at
W1|W2):

| Wave | Disposition | Contents | Gate |
|---|---|---|---|
| **AT.W0** | DEV — audit | This 6-lens deep audit. Re-derive the blob lift inventory against value.js HEAD; confirm the ≥2-distinct-context status (demo story is the 2nd); enumerate the seams (color/mood/SVG-filter/prng/WebGL-bootstrap); locate every value.js-default to NOT bake in; rule the GlassDock overflow model; rule DataTable. | audit complete |
| **AT.W1** | DEV — design (**END OF DEV BOUNDARY**) | Design slices: (1) the blob-family subpath shape (`/goo-blob`, `/watercolor-dot`) + the required-`resolveColor` seam + `filterId`/`moodTargets` seams + the demo-story-as-2nd-context plan; (2) the shared glass-ui WebGL bootstrap helper extraction (aurora + blob dedup) + the demand-RAF-gate port mirroring `runtime.ts:507/546`; (3) the generic `prng` leaf; (4) the GlassDock overflow-model collapse (one enum, retire boolean `wrap`, migration note); (5) the `supportsPostTask` wire; (6) the vueuse-reachability gate + the DataTable fix. The seam-gate spec (blob source → zero `@mkbabb/value.js`, zero CSS-color resolver). | every slice file:line-verified |
| **AT.W2** | IMPL — the blob lift (the headline) | Lift GooBlob + WatercolorDot + `prng` + the shared WebGL helper into glass-ui; the required `resolveColor` seam (NO value.js default); `filterId`/`moodTargets` seams; the demand-RAF gate ported; the glass-ui demo story (the 2nd context). New subpaths `/goo-blob` + `/watercolor-dot`. | seam-gate green (zero value.js dep in blob); demo story renders; ≥2-context bar met; subpath sizes published |
| **AT.W3** | IMPL — the gate + the leaks | The vueuse-reachability import-graph gate (fails on `@vueuse` from `dist/glass-ui.js`) + the DataTable fix (subpath-only OR `useResizeObserver`); the `supportsPostTask` wire (DRY the two feature-detects). | the new gate green; DataTable no longer reaches vueuse from the root; `supportsPostTask` has a real caller |
| **AT.W4** | IMPL — the GlassDock overflow-model collapse | One `overflow` enum supersedes boolean `wrap`; the `containerName` clip-lift folds into `"visible"`; clean break (no alias); migration note for bbnf-lang playground. (Optionally fold the A-1/A-2 control-pane polish IF the index.css budget rebase + ≥2 land here.) | overflow VR; dock consumers re-verified; no silent-no-op kebab regression (the W7 lesson) |
| **AT.W5** | IMPL — close | Overfitting audit (every AT artefact ≥2 OR demo OR exported); the gates.mjs matrix; AT.FINAL; the **3.3.0** minor (the blob subpaths are additive net-new surface) published through the repaired CI. | matrix green; 3.3.0 published; cohort unblocked (value.js K.W3 consumes the published blob subpaths) |

**Wave count: 6 (AT.W0-AT.W5)** — 2 DEVELOPMENT (W0 audit + W1 design) + 4
IMPLEMENTATION. Dev/impl boundary at W1|W2.

**DAG:** W0 first; W1 after W0; W2 (blob lift) is the headline and lands first of
the impl set (the cohort's K.W3 waits on the PUBLISHED blob subpaths — the
constellation unlock). W3 (gate + leaks) ‖ W4 (dock overflow) are file-disjoint
and parallelize atop W2. W5 closes + publishes **3.3.0** (the blob subpaths are
net-new additive surface → a minor, not a patch; mirrors AS's 3.2.0 fold). The
seam (inv-K-3 shape) is the binding gate of W2 — the blob is value.js-free or it
does not ship.

**SemVer note:** AT ships 3.3.0 (additive subpaths) — distinct from AS's 3.2.0.
The blob lift unblocks value.js K.W3 (which is RE-SPECCED to consume the published
dist, NOT live src). That publish IS the AT constellation unlock, mirroring how
3.2.0 was AS's.

---

## 9 — What AT does NOT own (name-forward, terminal, or watched)

- **P5 inner-section rounding** — TERMINAL for glass-ui (§5). OUTER-ONLY is
  canonical + already shipped; fourier adjusts its ledger row on its side.
- **value.js K.W3 consumption** — name-forward (inv-16). value.js deletes its demo
  blob dirs and imports the published glass-ui subpaths; glass-ui's arm is to
  PUBLISH them, not to wire value.js.
- **keyframes 3.0.0 / cohort bumps** — name-forward; R7 already widened the peer.
- **The deck subpath (slides), Fraunces @font-face (words)** — separate
  future-tranche / consumer-convergence-gated (`constellation-ordering-2026-06-04.md`);
  NOT AT.
- **inv-K-3 as a precept** — NOT adopted into glass-ui's precepts (it is
  value.js-tranche-local). glass-ui honors the seam SHAPE because token-first +
  binary-substrate demand it; AT records the name-forward.

---

## 10 — The single most load-bearing AT finding

The blob lift's ≥2-distinct-consumer bar is **NOT met by value.js's demo alone**
(9 call-sites, 1 context — §2.1). The entire AT headline rests on shipping a
**glass-ui demo story as the 2nd context** at AT close — exactly the move
`deriveAurora` used at AS.W7 (the demo Derive-UI was its 2nd witness, graduating
it BOOKED→SHIPPED). If AT ships the blob primitive WITHOUT the demo story, it
ships substrate-without-≥2 on a promise, violating the binary-substrate invariant.
The demo story is not optional polish — it is the gate that makes the lift legal.
