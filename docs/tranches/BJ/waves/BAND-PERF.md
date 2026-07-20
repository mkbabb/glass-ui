# BJ BAND-PERF — demo/story load performance (Family E)

**Verified model: `claude-fable-5`** (this run, RU-03-PERF; system context reads "The exact model
ID is claude-fable-5"). **Union provenance:** the opus-begat draft re-derived ANEW from the
corrected formation corpus + the repo at HEAD (485891a2), then scrutinized claim-by-claim and
UNIONED in place 2026-07-18 per the REFABLE protocol. Verdict sidecar:
`../formation/refable/REFABLE-RU-03-PERF.md`. The opus draft survived unusually well — every
build-graph number re-measured EXACT — with one substantive refutation (the W3 shared-filter-def
arm, seed-distinctness) and six binding routings landed (N8 read-hygiene, the law-6 fence, the
aurora-chain first-cut facts, the idle-breath adjacency, the PRM sharpening, the seed-status
truth-up).

Registry **Family E** — demo/story performance, A17 (`docs/tranches/BJ/formation/REGISTRY.md:108-120`).
Sources: `round-1/story-demo-load-performance--static-analysis---no-browser-.md` (all five mechanisms,
each with file:line) confirmed on disk by
`round-2b-confirm/adversarial-on-disk-verification-of-the-8-remaining-round-1.md:49-55`
(73 modulepreloads / 285 chunks / 3.3M dist-demo). Ledger rows: **F01** (preview cards + all story pages
"partially load, then stutter"), **F02** ("most of the cards are blank white"), **F06** (dock-page
transitions "broken, slow, and flash the screen"), **F46** ("slow to load"), **A17** (perf as a first-class
lens) — `FEEDBACK-LEDGER.md:13,14,18,58,84`. Row coverage per `REFABLE-RF-5.md:26`: F01/F02/F06/F46
perf halves + F07 (W4 owns) + A17 (whole band).

This band writes NO source: the fix flips (the async boundaries, the field-governance heuristic, the
above-fold exemption, the route-pending affordance) are named as build obligations discharged by the
EXECUTION waves. This spec authors the **static born-RED detectors** now; the live-trace RED baselines
for W1/W2/W4 are **SEEDED by the R3b capture** (`round-3-live/R3B-DIGEST.md`, DEV-server numbers) and
the remaining live obligations are the GREEN-side DELTA captures, re-measured on a production build for
any product gate. W3's intrinsic-size measurement was NOT in R3b's capture set and remains OWED.

## §Band framing — static now, R3b-seeded, build-re-measured

The census verdict is high-confidence on **mechanism** (`REGISTRY.md:109`); R3b supplied the live RED
baselines for boot/idle/transition. The band's gates split three ways:

- **Static, born-RED NOW** (verified probes over the source tree + the built `dist-demo/`): the
  async-boundary asserts, the modulepreload-count / eager-KB ceilings, the per-instance turbulence
  cost decision (re-scoped, see W3), the route-pending-affordance-absent assert, the
  shell-field-governance-absent assert. Each reds at HEAD today; each has a verified probe below.
- **R3b-SEEDED live baselines** (DEV-server, unminified — product gates re-measure on a build): W1
  LCP root 391ms / foundations 405ms / blob 488ms (render-delay ~99%; the lever is boot JS, not
  network) + 2 boot long-tasks 208-283ms TBT; W2 idle churn ~40k RunTasks / ~1.56-1.71s task-time
  per ~5.3s window on light pages, ~52k / ~3.11s on `/substrates/blob` + the ForcedReflow insight;
  W4 119ms warm route freeze + CLS 0.04 + ~186ms cold-nav stall (R3a). The GREEN-side delta capture
  is each wave's remaining live obligation (MEMORY `live_verify_capture`).
- **Still-OWED live measure:** W3's rendered `SectionPreviewCard` height vs the 19rem placeholder
  (not in R3b's capture set) — the §Band R3 recipe applies at execution.

Four waves:

| Wave | Name | Motion | Static born-RED at HEAD | Live baseline |
|------|------|--------|--------------------------|---------------|
| 1 | `BJ.W-BOOT-DIET` | Async PresetEditor/Aurora + split `shellAuroraConfig` off the barrel | Yes — 4 static imports; 73 modulepreloads + entry = 74 files / 789,398 B ≈ 770KB eager JS | R3b-SEEDED (LCP + long-tasks) |
| 2 | `BJ.W-SHELL-FIELD-GOVERN` | Idle/visibility governance (or static wash) for the always-on shell field + the blob forced-reflow fix + per-frame read hygiene | Yes — `fixed inset-0`; tab-hidden is the ONLY reachable pause, for every user class | R3b-SEEDED (idle churn + ForcedReflow) |
| 3 | `BJ.W-DEFERRED-PAINT` | Intrinsic-size truth (handoff) + the turbulence-cost ruling + live-trace deferred-paint gate (above-fold cv EDIT + static gate CEDED to STORY W5) | Yes — 13 per-instance filter hosts (cost arm re-scoped: seeds are designed) | intrinsic-size measure OWED |
| 4 | `BJ.W-ROUTE-PENDING` | Pending affordance (liquid-weight) instead of the frozen atomic swap; OWNS F07 choreography | Yes — no Suspense/aria-busy/skeleton in the swap | R3b-SEEDED (119ms / CLS 0.04 / 186ms) |

**Gate substrate (band-wide decision, `OPEN-P0` — RULED, adjudication ruling 9).** Per the sibling
`BAND-GATES` `OPEN-1` ruling, the tree has **no** `scripts/gates.mjs` / `scripts/proof-*.mjs`; the single
CI enforcement is `npm test` = `vitest run` (`package.json:532`). The static detectors below are authored
as **vitest tests that read the source tree AND the built `dist-demo/` via `fs` + grep**, landing in
`tests/gates/` under the existing `npm test` step with **zero new CI wiring**. The modulepreload/eager-KB
ceiling reads a **built** `dist-demo/`: **build `dist-demo/` in the test job** (a demo-build step), NOT a
committed build-manifest snapshot — a committed snapshot goes stale silently and greens over a regressed
build. (The committed `dist-demo/` at HEAD is a 2026-07-16 artifact; five commits postdate it
(58fba6e6..55f5170d, dialog/halo/token work), none touching the import graph — the RED numbers below
re-measure on the in-job build.)

---

## Wave 1 — `BJ.W-BOOT-DIET` — the eager boot-graph diet

### §Mandate

Discharges `perf:eager-boot-graph-bloat` (`REGISTRY.md:110-111`; round-1 finding 1). The user-visible defect
(F01/F46): the always-mounted `AppShell` drags the WebGL Aurora, the full configurator (PresetEditor + its
reka dropdown/select/tooltip/floating subtree), Dialog, and both docks into the **eager** boot graph, and
`app.mount()` is gated behind all of it plus the first route chunk (`main.ts:72`
`void router.isReady().then(() => app.mount("#app"))`) — so `#app` is blank white until ~1.1MB resolves.

**The named first cut (the aurora-chain composition facts, per `REFABLE-RU-17b.md:113-116` routing 6):**
the `aurora-hero` chunk is 284,409 B = **36.0% of the entire eager graph in ONE chunk**; it carries BOTH
shader sets (WGSL + GLSL) eager; and there is **no dynamic-import seam anywhere in the chain** from
`AppShell` to the shader source strings. Cutting this one chain is most of the diet.

### §Design — the RED baseline (verified on disk, re-measured this union) and the four cuts

**RED baseline, measured on the committed `dist-demo/` build (2026-07-16; re-verified exact 2026-07-18):**
- `dist-demo/index.html` = **73 `modulepreload` links + 1 entry `<script type=module>` = 74 eager JS files**,
  summing **789,398 bytes ≈ 770 KB uncompressed** (measured: sum of every `.js` referenced in `index.html`).
- Render-blocking CSS: `dist-demo/assets/index-C8_UmRWR.css` = **317 KB** (325,528 B; the other eager CSS
  files are <1KB). Total eager boot graph ≈ **770 KB JS + 317 KB CSS ≈ 1.09 MB** (matches round-1's "~1.1MB").
- `dist-demo/assets/` holds **285 JS chunks / 3.3M** total (round-2b confirmed; re-verified) — most are lazy
  route chunks and are FINE to be numerous; the gate targets the **eager** subset, not 285.
- Top eager chunks (measured): `aurora-hero 277KB` (284,409 B — the Aurora component + BOTH shader sets),
  `index 103KB`, `class-names 86KB`, `DropdownMenuTrigger 40KB`, `SelectItem 30KB`, `floating 25KB`
  (the three reka chunks = the configurator's floating stack ≈ 95KB), `routeTransition 25KB`, `value 24KB`
  (the value.js color core).

**The four static imports that create the eager drag (verified at HEAD):**
- `demo/shell/AppShell.vue:11` `import { Aurora } from "@glass/components/aurora"` — top-level, eager. Pulls
  `aurora-hero 277KB`. The barrel re-exports the component: `src/components/aurora/index.ts:1`
  `export { default as Aurora } from "./Aurora.vue"`.
- `demo/shell/AppShell.vue:26` `import { PresetEditor } from "./configurator"` — top-level, eager. Pulls the
  reka `DropdownMenuTrigger/SelectItem/floating` ≈ 95KB. **The configurator is a hidden right-side Sheet
  opened ONLY by the SidebarDock gear or the `,` shortcut** (`AppShell.vue:125-128` registers the
  `glass-ui-demo:toggle-configurator` shortcut; `AppShell.vue:222` `<PresetEditor />` mounts it at the shell
  root) — it is never visible at first paint, yet fully eager. The purest cut.
- `demo/shell/AppShell.vue:27-28` `import SidebarDock from "./SidebarDock.vue"` + `import BottomDock from
  "./BottomDock.vue"` — top-level, eager (the always-visible nav chrome).
- `demo/chassis/hero/aurora-hero.ts:15` `import { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora"` +
  `:16` `import { cssToOklch } from "@glass/composables/color"`. `shellAuroraConfig` (`aurora-hero.ts:274`;
  dark twin `:318`) needs only the plain-object default + a color fn, but imports them **through the aurora
  barrel**, which statically re-exports `Aurora.vue`. So even after the Aurora *component* is made async,
  the config path re-drags the barrel (and `value 24KB`) into the eager graph unless the config imports from
  a leaf.

**The cuts:**
1. **PresetEditor/configurator async** (`defineAsyncComponent(() => import("./configurator"))`) — the reka
   dropdown/select/tooltip/floating stack leaves the boot graph; the Sheet lazy-loads on first gear/`,` open.
   The cleanest, lowest-risk win (~95KB + the ConfiguratorLayer CSS).
2. **Aurora component async** — `aurora-hero 277KB` leaves the eager graph. The shell field is already
   deferred *at runtime* past first paint (`useAurora.ts:293` `scheduleAfterFirstPaint`, def `:77`), but the
   277KB **chunk** is still eager; making the component async pulls the chunk out too. (`OPEN-P1`: async
   Aurora means the shell field paints its GL layer a tick later; the CSS-gradient placeholder
   (`paletteToCssGradient`, named in the `renderMode="auto"` comment at `aurora-hero.ts:10`) covers the gap —
   confirm the placeholder is not itself in the async chunk, else the wash flashes empty.)
3. **Split `shellAuroraConfig` off the aurora barrel** — repoint `aurora-hero.ts:15` from
   `@glass/components/aurora` to the leaf (where `DEFAULT_AURORA_CONFIG` is actually defined,
   `constants/presets.ts:391`), so the config factory no longer statically re-imports `Aurora.vue`.
   (`OPEN-P2`, narrowed this union: the demo resolves `@glass/*` → `src/*` source-side
   (`vite.config.ts:23`, `tsconfig.json:18`), so NO package export-map change is needed for the demo build —
   the deep-leaf import just works. The residual question is only colocation canon: whether Family H blesses
   deep-leaf imports or prefers a named `aurora/config` leaf module.)
4. **Docks (`OPEN-P3`, the weakest cut):** SidebarDock/BottomDock are always-visible chrome, so making them
   async trades eager KB for a flash-of-missing-nav at first paint. Draft leans **keep the docks eager**
   (their bytes are small next to Aurora+configurator, and async nav chrome degrades the first frame) and take
   the two headline cuts (1+2) plus the barrel split (3). Fable rules whether the docks are worth deferring.

**Adjacency (informational, `REFABLE-RU-07.md` RT6):** GF-AURORA's W4 REAUTHOR-LEAN arm retires the ~38KB
GLSL oil monolith on BOTH backends, which independently serves this wave's chunk goal; the module-size
budget GF-AURORA declares at its W0 is the shared referent — do not double-budget the aurora chunk.

### §Work (EXECUTION-wave obligations, not authored here)

- `demo/shell/AppShell.vue` — `PresetEditor` (and Aurora, per `OPEN-P1`) → `defineAsyncComponent`.
- `demo/chassis/hero/aurora-hero.ts:15` — repoint the `DEFAULT_AURORA_CONFIG` import to the leaf.
- `tests/gates/boot-graph.test.ts` (this band authors the detector, born-RED):
  - **source arm:** assert `AppShell.vue` does NOT top-level-`import` PresetEditor/Aurora (they must be
    `defineAsyncComponent`); assert `aurora-hero.ts` does NOT import from the `@glass/components/aurora` barrel.
  - **build arm:** assert `dist-demo/index.html` has **≤ a modulepreload ceiling** and the summed eager JS is
    **≤ an eager-KB ceiling** (`OPEN-P4`: set the ceilings post-diet — e.g. ≤ 45 modulepreloads / ≤ 450KB — so
    the gate reds at the HEAD 73/770 and greens only after the cuts land; the exact ceiling is Fable's call).

### §Acceptance — born-RED (static)

- **async-boundary arm RED at HEAD:** `grep -c 'defineAsyncComponent' demo/shell/AppShell.vue` = **0**
  (re-verified this union); the four imports at `AppShell.vue:11,26,27,28` are all top-level static. GREEN
  when PresetEditor (+ Aurora) become async.
- **barrel-split arm RED at HEAD:** `aurora-hero.ts:15` imports `DEFAULT_AURORA_CONFIG` from
  `@glass/components/aurora` (the barrel that re-exports `Aurora.vue`) — verified. GREEN when repointed to
  the leaf.
- **build-ceiling arm RED at HEAD:** `grep -c modulepreload dist-demo/index.html` = **73**; eager JS sum
  = **789,398 B** — both over any post-diet ceiling. GREEN when the async cuts shrink the eager set.
  Re-measured on the in-job build (OPEN-P0), never the committed artifact.
- Each arm ships a self-test bite (a planted top-level `import { Aurora }` reds the source arm; a planted
  oversized manifest reds the build arm) so the gate proves it can fail.

### §Evidence — banked, not carried in prose

`docs/tranches/BJ/evidence/W-BOOT-DIET/` holds the verbatim record: `boot-graph-BORN-RED.txt` (the shipped
gate run against HEAD source over a HEAD build — 6 of 14 blocks RED with file:line),
`eager-graph-PRE.txt` / `eager-graph-POST.txt` (both `index.html` manifests plus the per-file eager sets, so
the sums recompute from the artifact), `freshness-BITE.txt` (the stale-`dist-demo` mutation proof),
`boot-graph-POST-GREEN.txt`, `shell-field-STEADY-post-cure.png`, and `VERDICTS.txt`.

Close-time re-measure, on disk: **PRE 74 modulepreloads + 1 entry / 791,615 B → POST 56 + 1 / 483,862 B**
(−18 / −307,753 B). The §Acceptance baseline above (73 / 789,398 B) was measured at an earlier HEAD; the
band figure is left pinned as authored and the drift is recorded here rather than silently rewritten.

`VERDICTS.txt` §7 carries the one finding this wave does **not** cure: `main.ts` mounts on
`router.isReady()`, `router.ts`'s `beforeResolve` awaits every lazy route chunk, and `StoryHero.vue:3`
statically imports `Aurora` from the barrel — so the route chunk re-requests the same Aurora chunk and mount
waits on it (measured: `#app` has zero children at t=1.5s with the chunk held). The eager-graph diet is real
and gated regardless; the async boundary alone does not move Aurora off the first-paint critical path.

### §π/DELTA + live baseline (R3b-SEEDED)

The boot diet has **no** intended pixel change — the shell renders identically, only sooner. The RED
baseline of the *symptom* (F01/F46 slow-load/stutter) is SEEDED: R3b DEV LCP root 391ms / foundations
405ms / blob 488ms, **render-delay-dominated (~99%)** — the lever is boot JS, not network — plus the
two-boot-long-task signature (208-210ms TBT light pages, 283ms blob). The remaining live obligation is the
GREEN-side delta: the same capture (§Band R3 recipe) after the diet, thresholds set against a
**production build**, never the DEV numbers.

### §KISS / parsimony

Three surgical edits (two `defineAsyncComponent` wraps + one import repoint), net near-zero LOC, no new
abstraction. Gestalt not patchwork: the eager graph shrinks because the hidden/deferred surfaces leave it, not
because chunks are hand-split. No masking fallback — the placeholder wash is the *primary* first-paint, not a
fallback that hides a dead Aurora (MEMORY `no_masking_fallback`).

### §Non-goals

- NOT the shell-field runtime governance (Wave 2 owns the always-on loop).
- NOT hand-authoring manualChunks / vite splitConfig — the diet is import-boundary work, not bundler tuning.
- NOT touching the route chunks themselves (Blob 94KB, StoryHero 63KB, aurora 59KB are correctly lazy
  already, `router.ts` route `component: () => import()`).

---

## Wave 2 — `BJ.W-SHELL-FIELD-GOVERN` — govern the always-on shell field

### §Mandate

Discharges `perf:persistent-webgl-shell-loop` (`REGISTRY.md:113`; round-1 finding 3) and owns the R3b
headline: **idle main-thread churn is the dominant perf cost, not LCP** (~40k RunTasks / ~1.56-1.71s
task-time per ~5.3s idle window on light pages; ~52k / ~3.11s on `/substrates/blob`;
`R3B-DIGEST.md` perf-main-thread-churn, MAJOR). The mechanism: `AppShell` mounts a `fixed inset-0`
`<Aurora>` on every non-focal route, and because a full-viewport canvas is **always** intersecting the
viewport, every pause arm short of tab-hidden is structurally unreachable — a continuous WebGL rAF
composite runs behind every content page, sustaining CPU/GPU load that compounds per-page live vizzes and
reads as the F01 stutter. This wave also owns the **blob forced-reflow fix** and the band's **per-frame
read hygiene** clause (both below).

### §Design — the pause-guard-unreachable fact (verified, sharpened) and the governance

**The pause-guard-unreachable fact (verified at HEAD, sharpened this union):**
- `demo/shell/AppShell.vue:146-154` mounts `<Aurora v-if="shellFieldActive" :config="shellAuroraConfig"
  ... class="shell-aurora fixed inset-0 -z-10">` (`v-if` at :147, `fixed inset-0` class at :151) on every
  route whose `meta.suppressesShellField` is falsy (`demo/router.ts:115-117` `shellFieldActive` computed).
- The full suspend-reason census (`runtime.ts:43-52`): `"tab-hidden"` (document visibility),
  `"off-screen"` (the shared content-visibility owner), `"off-screen-io"` (the deferred pre-arm
  intersection owner), `"manual"` (the public API). For a viewport-filling `fixed inset-0` node: the
  intersection arms can never fire (`useAurora.ts:270-277` arms `useIntersectionPause` with
  `{ pauseWhenHidden: false }` whose only reason is `off-screen-io`; `useIntersectionPause.ts:61`
  `const isIntersecting = ref(true)` — default-intersecting, and a fixed full-viewport canvas stays so);
  the shell field sits in no content-visibility container (`"off-screen"` unreachable); nothing calls
  `"manual"` on the shell mount. **And reduced-motion does NOT suspend the loop**: there is no PRM suspend
  reason — `frameLoop.ts:136-147` `masterTempo()` returns 0 under PRM, freezing the *interactive
  integration* while the rAF keeps ticking and the clock keeps marching. So the effective pause is
  **tab-hidden only, for every user class.** The `shellAuroraConfig` computed (`AppShell.vue:92`)
  re-derives the config per navigation (route hue), so the loop persists across every content-route swap.

**The governance (the field earns its cost only where it is seen):**
- Gate the shell field behind a **visibility/idle heuristic** (pause when the field is fully occluded by opaque
  page content, or after an idle interval on a content route), OR substitute a **cheaper static wash** on the
  dense content categories that already declare grid/paper defaults (forms/data/display) so the live GL field
  runs only on the hero/substrate bands where it is the actual subject.
- **The breath-of-life fence:** the substrate/section fields are the edict's idle-breath EXEMPLARS
  (R3b engagement table). Governance targets the **main-thread churn budget**, not the field's life —
  a governed field still breathes where it is seen; the anti-goal is a dead backdrop dressed as governance.
- `OPEN-P5` (the design fork Fable must settle): (a) an **occlusion/idle pause** keeps the live field
  everywhere but stops the rAF when it is not contributing pixels — most faithful, but "is it occluded?" is a
  real heuristic (a translucent page still composites the field); vs (b) a **static wash on dense categories**
  — dead-simple and cheap, but drops the ambient live field on those routes (a deliberate design downgrade the
  user may or may not accept). Draft leans (b) for forms/data/display (they already read as paper/grid) and
  keeping the live field on foundations/substrate — but this is a design ruling, not a perf mechanic.
- `OPEN-P6`: does the `fixed inset-0` field even need to be live *between* hero moments at all, or should
  `shellFieldActive` be narrowed at the router level (more routes set `suppressesShellField`) so the field is
  a hero-band affordance, not a global backdrop? This overlaps Family D's transition-choreography and Family G's
  substrate work — coordinate before widening the suppress set.

**Deliverable (b) — the blob forced-reflow fix (R3b; STAB1 MAJOR-2 cure, folded into the body this
union):** `/substrates/blob` nearly DOUBLES the idle churn (52,225 RunTasks / 3,115ms per 5.3s window)
AND trips a **ForcedReflow insight** on its cold mount path (~142ms window). Locate and cure the
blob-mount forced reflow (batch the layout reads; prime suspects at HEAD: `useMetaballRenderer.ts:153`
gBCR sizing + `useBlobPointer.ts:106,116` gBCR reads — trace-guided pinning owed at execution).
Gate: the ForcedReflow insight ABSENT from a fresh blob cold-mount trace. The route-swap CLS 0.04 is
W4's (`BJ.W-ROUTE-PENDING` owns the transition) — no double gate.

**Deliverable (c) — per-frame read hygiene (landed this union; `REFABLE-RU-21.md:77` N8, ownership
confirmed `REFABLE-RU-03-FEEDBACK-MOTION.md:80` R6):** `usePagerWorm.ts:133-134` calls `readPx` →
`getComputedStyle` **twice per rAF frame** inside `paintWorm` (wired per-frame at `:167`
`useLeadTrail({ onFrame: paintWorm })`) — a per-frame style-read/write interleave on the exact
rAF-budget axis this wave gates. Cure: cache the `--pager-dot-size`/`--pager-dot-elongated` token reads
per seat/resize (re-read on ResizeObserver/theme flip, never per frame). PERF owns this row;
`BAND-FEEDBACK-MOTION` W6 (`BJ.W-PAGER-DOT-MORPH`) carries only a do-not-worsen fence. Note-grade
next to the shell field, but it is the band's read-hygiene exemplar: the gate class is "no
getComputedStyle inside an onFrame path", asserted source-level on the pager worm.

**Adjacency (PLAN §1 law / JUDGE J1):** `BJ.W-IDLE-BREATH` (FEEDBACK-MOTION W5) is compositor-only by
construction — pure CSS animation, **rAF-count delta 0** is its gate — precisely so it cannot re-inflate
the idle budget THIS wave establishes. W2's budget number is the referent that gate reads against.

### §Work (EXECUTION-wave obligations)

- `demo/shell/AppShell.vue` / `src/components/aurora/composables/useAurora.ts` — add the visibility/idle pause
  arm (per `OPEN-P5`), OR narrow `shellFieldActive` + swap a static wash on dense categories.
- blob mount path (`useMetaballRenderer.ts` / `useBlobPointer.ts`) — batch the layout reads (deliverable b).
- `src/components/pager-dots/composables/usePagerWorm.ts:133-134` — hoist the token reads out of the
  per-frame path (deliverable c).
- `tests/gates/shell-field-governance.test.ts` (this band authors the detector, born-RED, source-level):
  assert the shell field mount is governed by MORE than the `tab-hidden`/`v-if=shellFieldActive` pair — i.e.
  either an idle/occlusion pause hook is wired, or the dense-category routes resolve a static wash. The precise
  assertion shape depends on `OPEN-P5`'s resolution (`OPEN-P7`). Plus the read-hygiene arm: no
  `getComputedStyle` inside `usePagerWorm`'s frame path.

### §Acceptance

- **Static born-RED at HEAD (structural):** the shell Aurora at `AppShell.vue:146-154` has NO reachable
  idle/occlusion pause governance — the suspend-reason census above proves tab-hidden is the only arm that
  can fire, for every user class (PRM included). The detector reds at HEAD; GREEN when governance lands.
- **Read-hygiene arm RED at HEAD:** `usePagerWorm.ts:133-134` reads computed style per frame (verified).
  GREEN when the reads are cached per seat/resize.
- **Live RED baseline (R3b-SEEDED):** idle churn ~40k RunTasks / ~1.56-1.71s task-time per ~5.3s window
  (root/foundations), ~52k / ~3.11s on blob, ForcedReflow insight on blob cold. The GREEN-side delta trace
  (governed field: sustained rAF → paused/reduced during idle; ForcedReflow absent) is the remaining live
  obligation, re-measured on a build.

### §π/DELTA

If governance downgrades dense routes to a static wash (`OPEN-P5`b), that IS a visible change — capture a
before/after paired screenshot on `/forms` + `/data` (the field-live vs static-wash read) so the design
downgrade is an explicit, reviewed DELTA, not a silent removal. If governance is pure occlusion/idle pause
(`OPEN-P5`a), there is no intended pixel change (the field looks identical, only idles when unseen) and the
proof is the trace delta (sustained rAF → paused).

### §KISS / parsimony

Prefer the fewest-lines governance that is honest: an idle/occlusion pause is a small hook on the existing
`useIntersectionPause`; a static wash is a CSS class swap on dense categories. No new WebGL machinery. The
field is not "fixed" with a fallback — it is either live-and-governed or static-by-design, never a dead loop
masked as motion.

### §Non-goals

- NOT re-architecting `useAurora`'s deferred-arm scheduler (it correctly defers *arming* past first paint;
  the defect is the *never-pausing* while visible, not the arm timing).
- NOT the aurora preset/medium reduction (Family G, F08).
- NOT the per-page live-viz budget (each story owns its own field; this wave governs the SHELL field only —
  the blob fix is a mount-path reflow cure, not a blob-field redesign).
- NOT the pager worm's motion design (`BAND-FEEDBACK-MOTION` W6 owns the goo-morph refinement; this wave
  owns only the read-hygiene mechanics).

---

## Wave 3 — `BJ.W-DEFERRED-PAINT` — intrinsic-size truth + the turbulence-cost ruling

### §Mandate

Discharges `perf:content-visibility-deferred-paint` (`REGISTRY.md:112`; round-1 finding 2, F02's "most of the
cards are blank white") + `perf:svg-turbulence-paint-cost` (`REGISTRY.md:114`; round-1 finding 4). The
mechanism: every landing preview card sets `content-visibility:auto` with `contain-intrinsic-size:auto 19rem`,
so below-fold cards are unrendered blank 19rem boxes until scrolled near; while the ~1.1MB boot saturates the
main thread the *above-fold* cards paint late too — the reported "foundations cards render blank white". The
primary cure is Wave 1 (cut the boot-thread saturation so deferred paints land promptly); this wave removes the
remaining structural sharp edges.

### §Design — three targeted arms

**(A) Above-fold content-visibility exemption — CEDED to `BAND-STORY` W5 (adjudication ruling 9).**
`demo/chassis/landing/SectionPreviewCard.vue:63-65` applies `content-visibility: auto; contain: content;
contain-intrinsic-size: auto 19rem;` unconditionally to every card (`SectionLanding.vue:35-38` renders one
`<SectionPreviewCard v-for>`; `/foundations` renders 13; no `IntersectionObserver` drives them — `grep -rn
IntersectionObserver demo/` = **0**, re-verified). **`BAND-STORY` W5 (`BJ.W-PREVIEW-CARD`) rewrites this file
wholesale** — masonry + the tile-ladder authorship (the live-miniature line is STRUCK per PLAN §2 / the 0-GL
contract + R3b idle-rAF) — and therefore owns the above-fold EDIT and its STATIC source gate (G-PRV-3,
`BAND-STORY.md:394`) — one owning wave per file (`BAND-STORY.md:22-24`). PERF W3 does NOT author a static
above-fold gate here (it would double-own the file and double-gate the exemption). PERF's remaining
contribution to the above-fold cure is the **live-trace deferred-paint gate** (below — the "perf trace gate"
`BAND-STORY` W5 already delegates to family E) and the **intrinsic-size number handed to `BAND-STORY`** to
apply AFTER the masonry rewrite settles the true card height. `OPEN-P8` (the exact above-fold N / grid-cols
keying) moves with the edit to `BAND-STORY` W5.

**(B) Intrinsic-size truth (live measure OWED — not in R3b's capture set).** `contain-intrinsic-size: auto
19rem` is the placeholder height that reserves layout before a below-fold card paints; if 19rem ≠ the real
rendered card height, each card **shifts** when it paints (CLS). The `auto` keyword means the browser
remembers the *last* rendered size, so the mismatch bites only on the FIRST paint of each card — but that
first-paint shift is exactly the "stutter" read. Whether 19rem matches reality is **not statically
knowable** — it needs a browser measurement of the rendered `SectionPreviewCard` height at each breakpoint
(§Band R3 recipe, `getBoundingClientRect().height` on `/foundations`). Do NOT assert a shift RED without the
measured height. **Handoff:** the retuned number is MEASURED here and HANDED to `BAND-STORY` W5 to apply on
its rewritten card — PERF supplies the measured truth, W5 applies it after the masonry height settles (PERF
does not edit `:65` directly, since W5 rewrites the file).

**(C) The turbulence-cost ruling (CORRECTED this union — the shared-filter-def arm is REFUTED).**
`foundations/colors` renders 13 animated `WatercolorDot` swatches (`colors.vue:47`
`rainbow = Array.from({length:13})`, `:91-100` `v-for` with `animate` — verified 13). Each dot mounts its
OWN namespaced `<filter>` hosting `feTurbulence numOctaves="5"` + `feDisplacementMap`
(`WatercolorDot.vue:157-179`). Two component-design facts bound this arm:
1. **Once-and-cache:** the component doc (`WatercolorDot.vue:17-19`) states the SVG filter "rasterizes ONCE
   + caches … and NEVER re-rasterizes per frame"; the `animate` liveness rides a seeded COMPOSITOR transform
   wobble that never touches the filter graph. So the cost is **13 one-time mount raster ops + 13 filter-def
   DOM subtrees**, NOT 13 per-frame live turbulence. Round-1's "13 live feTurbulence" framing
   (`REGISTRY.md:114`) overstates the steady-state cost.
2. **Seed distinctness is DESIGNED (the refutation):** the filter `seed` is per-instance —
   `WatercolorDot.vue:86` `filterSeed = hashString(props.color + props.seed) % 256`, and `colors.vue:98`
   passes a distinct `seed="section-ramp-${i}"` per dot — the doc names the property in so many words:
   "each dot's wet edge is uniquely displaced (**no twelve-clones**)" (`WatercolorDot.vue:21-23`). **One
   hoisted shared `<filter>` def cannot carry 13 distinct seeds** — the prior draft's shared-def
   optimization would collapse every dot onto one displacement map and ship the exact clone regression the
   component was designed against. The shared-def arm and its "no N>1 identical filter defs" gate are
   STRUCK.
The honest residue (`OPEN-P9`, re-scoped): the 13 per-instance defs are the DESIGN; the only defensible
perf lever is **measured mount cost** — if (and only if) the execution-time trace shows the 13 one-time
rasterizations materially hit the `/foundations/colors` mount, the levers are an octave diet
(`numOctaves 5 → 3-4` at equal read, judged by π) or capping concurrent `animate` dots — never a shared
def. Draft leans: ACCEPT the cost as designed (once-and-cache bounds it), pin the once-and-cache property
with a source-level regression assert (the filter graph stays out of the per-frame path), and drop the
duplication gate entirely.

### §Work (EXECUTION-wave obligations)

- `demo/chassis/landing/SectionPreviewCard.vue` above-fold exemption EDIT → **CEDED to `BAND-STORY` W5**
  (it rewrites the file); PERF hands over the intrinsic-size TRUTH, not the edit.
- `src/components/watercolor-dot/WatercolorDot.vue` — NO shared-def change (struck). If `OPEN-P9`'s
  measured arm fires: the octave/cap levers above, π-judged.
- `tests/gates/deferred-paint.test.ts` (this band authors the detectors):
  - **~~above-fold arm~~ — CEDED:** the STATIC above-fold source gate lands in `BAND-STORY` W5 (G-PRV-3),
    not here (one gate asserts the exemption, on the wave that owns the file).
  - **live-trace deferred-paint gate:** the "perf trace gate" family E owns — capture the
    first-paint / deferred-paint trace on `/foundations` proving the above-fold cards paint (not blank) once
    the boot thread is freed. This is PERF's above-fold contribution.
  - **once-and-cache regression arm (replaces the struck duplication arm):** source-level assert that the
    `animate` path drives a compositor transform only and the `<filter>` graph carries no per-frame
    binding — the property that keeps the 13-def design cheap. GREEN at HEAD by design intent; ships with a
    mutation bite (a planted per-frame `baseFrequency` binding reds it), honestly labeled a
    REGRESSION-FENCE, not born-RED.

### §Acceptance — born-RED (static) + live measure OWED

- **above-fold static arm — CEDED to `BAND-STORY` W5 (G-PRV-3):** the static source gate that asserts the
  above-fold exemption on `SectionPreviewCard.vue:63` lands on the wave that rewrites the file, not here.
  PERF's above-fold proof is the live-trace deferred-paint gate.
- **turbulence arm:** the duplication gate is STRUCK (seed distinctness is designed); the once-and-cache
  REGRESSION-FENCE stands in with its mutation bite; any octave/cap change is contingent on the measured
  mount-cost trace (`OPEN-P9`).
- **intrinsic-size truth (live measure OWED):** the measured `SectionPreviewCard` height vs the 19rem
  placeholder — a layout-shift check on `/foundations`, captured per §Band R3 recipe. NOT born-RED (needs
  the measurement; R3b did not capture it).

### §π/DELTA + live-trace

The above-fold exemption's first-paint screenshot π (F02 "blank white cards") rides `BAND-STORY` W5 with the
EDIT. PERF W3's live-trace obligation is the **deferred-paint trace** on `/foundations` (the first row paints,
not blank, once Wave 1 frees the boot thread) plus the **CLS/layout-shift trace delta** for the intrinsic-size
truth (§Band R3 recipe). No intended change to the below-fold deferral (it is correct browser behavior once
the boot thread is freed by Wave 1).

### §KISS / parsimony

The intrinsic-size fix is one number retuned to truth; the turbulence ruling REMOVES planned work (the
shared-def plumbing is struck, the design accepted); the once-and-cache fence is a few lines of source
assert. No IntersectionObserver is added — the native `content-visibility` is kept, only its above-fold
sharp edge is filed off (by STORY W5). Gestalt: the real cure is Wave 1; this wave removes the structural
flashes Wave 1 alone leaves.

### §Non-goals

- NOT replacing `content-visibility` with a JS IntersectionObserver reveal system (that would ADD boot cost —
  the native primitive is correct once the thread is free).
- NOT the preview-card redesign (masonry + tile-ladder authorship) NOR the above-fold `content-visibility`
  EXEMPTION EDIT + its static source gate — both are `BAND-STORY` W5's (`BJ.W-PREVIEW-CARD`), which rewrites
  the file (ruling 9). PERF W3 owns only the boot-diet cure (Wave 1), the live-trace deferred-paint gate, and
  the intrinsic-size number handed to W5.
- NOT a shared feTurbulence filter def — REFUTED this union (seed distinctness is the design); the
  WatercolorDot per-instance filter architecture stands.

---

## Wave 4 — `BJ.W-ROUTE-PENDING` — a liquid-weight pending affordance; OWNS F07

### §Mandate

Discharges `perf:blocking-nav-no-feedback` (`REGISTRY.md:115-116`; round-1 finding 5), owns the perf half of
**F06** ("transitions between the dock pages are broken, slow, and flash the screen",
`FEEDBACK-LEDGER.md:18`), and — per the lead seam ruling (ASSEMBLY, 2026-07-17) — **OWNS F07's
story-transition choreography OUTRIGHT: Family D is consulted, not co-owner; `OPEN-P10`'s fork is decided
inside this wave.** The mechanism: `router.beforeResolve` awaits the target route's lazy chunk before the
navigation commits, and the shell's atomic keyed `<component>` swap renders no skeleton/aria-busy — so a cold
route click leaves the old page frozen with zero loading feedback until the chunk downloads+parses, which reads
as unresponsiveness (and, combined with the full unmount/remount + shell-field re-upload, as the "flash").

### §Design — the blocking-nav fact (verified) and the liquid-weight affordance

**The blocking-nav fact (verified at HEAD):**
- `demo/router.ts:122-130` `router.beforeResolve(async (to) => { ... await Promise.all(comps.map((c) =>
  c().catch(() => undefined))); return true; })` — the navigation does not commit until every matched lazy
  chunk resolves. The await runs INSIDE the View Transition window: `routeTransition.ts:5-13` `pushRoute`
  wraps `router.push` in `startViewTransition` (types `["route"]`); consumers `useStoryNavigation.ts:9`,
  `TransitionRouteLink.vue:4`, `useShellNavDock.ts:6`.
- `demo/shell/AppShell.vue:201-203` `<RouterView v-slot="{ Component }"> <component :is="Component"
  :key="route.path" /> </RouterView>` — the `:key="route.path"` forces a full unmount+remount (atomic swap),
  no `<Suspense>`, no fallback.
- The code comments state the defect in the first person: `AppShell.vue:59` "has no skeleton `aria-busy`, so
  the live region is the only route-change signal" and `:192` "atomic keyed swap has no skeleton `aria-busy`".
  `grep -n 'Suspense\|aria-busy\|skeleton' demo/shell/AppShell.vue` = only these comment lines + the live
  region; **no pending UI** (verified). `main.ts:72` `void router.isReady().then(() => app.mount("#app"))`
  shows the same blocking pattern at boot.

**R3b seeds (the gate baselines):** 119ms warm route freeze into `/substrates/blob` (one 83ms long-task,
frames settle immediately after: 5-12ms gaps) + **CLS 0.04 injected at the swap** (the transition must
reserve space — this CLS is W4's gate, not W2's) + ~186ms cold-nav stall as the pending-affordance floor
case (R3a; settling 32-52ms warm).

**The affordance (liquid-weight, per MEMORY `liquid_weight_universal` + `breath_of_life`):**
- Add a lightweight **route-pending affordance** that shows *motion* during the `beforeResolve` await instead
  of a frozen frame: a top progress bar (nprogress-idiom) and/or a Suspense/keyed fallback that carries the
  liquid-glass inertia the edict mandates — the transition itself must have weight/bounce, not a hard cut. The
  chunk-load latency is unchanged; the *feedback* is the fix.
- `OPEN-P10` (the design fork, decided inside THIS wave; Family D + the dock greenfield consulted):
  (a) a **route-progress bar** (cheapest, universal, reads on every cold nav) vs (b) a **`<Suspense>` fallback
  with an origin-anchored goo-morph** (the iOS-27 `goo-morph nav` law — `IOS27-CODEX` law 6 — richer,
  on-brand, but heavier and couples to the swap architecture) vs (c) both. Draft leans a progress bar as the
  always-on floor PLUS the goo-morph as the between-page transition. **The law-6 fence
  (`REFABLE-RU-16.md:47` R6, landed this union): WITHIN one nav body, goo — continuous deformation — is the
  iOS-attested form; gooing INDEPENDENT bodies (page-into-page as two peers) is glass-ui's DECLARED
  divergence, taken deliberately or not at all.** The transition physics ride the codex law-14/15 spring
  presets. The "flash" half of F06 is partly the atomic unmount/remount + per-nav shell-field re-upload —
  narrowing when the shell field re-uploads (Wave 2 `OPEN-P6`) reduces the flash independent of the pending
  UI.
- **Liquid-weight applies to the transition, not just the spinner** (`liquid_weight_universal`): the
  pager/page swap must carry inertia; a hard `:key` cut is the anti-pattern the edict names. This wave OWNS
  that motion; Family D is consulted so the choreography lands once. The concrete choreography (progress
  floor + origin-anchored morph) is an in-wave DESIGN-ITERATION obligation.
- **Dock-page boundary:** GF-DOCK W6 `G-PAGE-NOFLASH` owns the dock-page half of F06 (persistent dock
  chrome; incoming page paints under the outgoing on the crossfade opacity floor, no blank frame). This wave
  owns the story-route pending affordance + transition; the two coordinate, neither double-builds.

### §Work (EXECUTION-wave obligations)

- `demo/router.ts` / `demo/shell/AppShell.vue` — the pending affordance (progress bar and/or Suspense
  fallback + weighted transition, per `OPEN-P10`), wired to the `beforeResolve` pending window.
- `tests/gates/route-pending.test.ts` (this band authors the detector, born-RED, source-level): assert the
  shell renders a pending affordance during navigation — i.e. a `Suspense` fallback OR an `aria-busy`/progress
  element bound to a router-pending state exists in the swap path. Born-RED: none today.

### §Acceptance — born-RED (static) + R3b-SEEDED

- **Static born-RED at HEAD:** no route-pending affordance in the swap — `grep 'Suspense\|aria-busy\|
  nprogress\|route.*pending' demo/shell/AppShell.vue demo/router.ts` finds only the two comment lines
  documenting its ABSENCE (`AppShell.vue:59,192`) and the live region; the `RouterView` at `:201-203` has a
  bare keyed `<component>`. GREEN when the affordance is wired.
- **Live RED baseline (R3b-SEEDED):** 119ms warm freeze / CLS 0.04 at swap / ~186ms cold floor (above).
  The GREEN-side obligation: the same capture after the affordance + space reservation land — swap CLS
  ≤0.01, no feedback-free freeze window, thresholds finalized on a production build. Plus the cold
  `/dock/rail` trace (F06's named route) for the dock-boundary coordination record.

### §π/DELTA + liquid-weight

**This wave's proof IS a motion DELTA.** Capture the cold navigation before (frozen frame → hard
swap) and after (pending motion → weighted transition) as a paired trace + screenshot sequence, per MEMORY
`live_verify_capture`. The transition must demonstrably carry inertia/weight (`liquid_weight_universal`), not a
hard cut — the DELTA artefact is the evidence, verified live, not a commit-message claim.

### §KISS / parsimony

A progress bar is a handful of lines on the router's pending state; the Suspense fallback reuses the existing
swap. No new state machine — the `beforeResolve` await window already exists; this wave only renders it. The
weighted transition lands once (this wave owns it; Family D consulted). No masking fallback: the affordance
shows real pending state, it does not fake progress the router isn't making.

### §Non-goals

- NOT eliminating the `beforeResolve` chunk await (it is correct — it prevents an empty `<RouterView>` flash;
  the fix is feedback DURING it, not removing it — see the `main.ts:70-72` boot comment rationale).
- NOT the dock greenfield (Family G, F47/F27 occlusion + interior scroll) — this wave owns the transition
  FEEDBACK + story choreography; the dock's own re-architecture and the dock-page no-flash are Family G's
  (GF-DOCK W6).

---

## §Band-level obligations & OPEN roll-up

**Coordination handoffs (authored as detectors/specs here → discharged by EXECUTION + sibling waves):**
- W1 boot-diet leaf import (`OPEN-P2`, narrowed) → no export-map change needed (the `@glass`→`src` alias);
  only the Family H deep-leaf-vs-named-leaf canon call remains.
- W1 aurora chunk ↔ GF-AURORA W0 module-size budget: the shared referent (RU-07 RT6); GF-AURORA W4
  REAUTHOR-LEAN independently retires the ~38KB GLSL oil monolith.
- W2 shell-field narrowing (`OPEN-P6`) → the `suppressesShellField` route-meta set overlaps Family D
  transition-choreography + Family G substrate.
- W2 idle budget ↔ `BJ.W-IDLE-BREATH` (F-M W5): compositor-only, rAF-count-delta-0 (J1); W2's budget is
  the referent. W2 read-hygiene ↔ `BJ.W-PAGER-DOT-MORPH` (F-M W6): PERF owns the N8 cache fix; W6 carries
  the do-not-worsen fence.
- W3 above-fold exemption EDIT + static gate + first-paint π → CEDED to `BAND-STORY` W5 (`BJ.W-PREVIEW-CARD`,
  which rewrites the file, ruling 9); PERF keeps the boot-diet cure (W1), the live-trace deferred-paint gate,
  and the intrinsic-size number handed to W5.
- W4 weighted transition / goo-morph nav → OWNED here (lead seam ruling); Family D consulted; GF-DOCK W6
  owns the dock-page no-flash half.

**Live-baseline status (truth-up this union):** W1/W2/W4 RED baselines are R3b-SEEDED (DEV numbers,
`R3B-DIGEST.md`; raw traces local-only per the gitignore rule). W3's intrinsic-size measure is OWED. Every
GREEN-side claim is a captured DELTA artefact (MEMORY `live_verify_capture`); product-gate thresholds are
set against a production build, never the DEV numbers; read the machine report, never a piped exit code.

### §Band R3 recipe — the capture recipe (Chrome-DevTools MCP, one browser seat)

Serialize on the single browser seat (MEMORY `browser_seat_singleton`); serve on localhost; never
`getContext` on a live canvas (observe via screenshot + computed style only). Build + serve the demo, then
per target route:

1. `npm run build` the demo → serve `dist-demo/` on a local port (throttle to a mid-tier profile: 4× CPU
   slowdown + Fast-3G to surface the boot-thread saturation the census predicts).
2. `performance_start_trace(reload=true, autoStop=true)` → navigate to the cold target (`/`, `/foundations`,
   `/forms`, `/dock/rail`, `/substrates/blob`) → `performance_stop_trace`.
3. Read the baseline/delta: `performance_analyze_insight` for **LCP** (W1: `/`, `/foundations`) and the
   **long-tasks / total-blocking-time** during boot; inspect the **frame/rAF track** for a sustained composite
   with no input (W2: `/forms`, `/data`) + the **ForcedReflow insight** on the blob cold mount (W2b); measure
   `SectionPreviewCard` `getBoundingClientRect().height` via `evaluate_script` for the **intrinsic-size
   truth** (W3, `/foundations`); trace the **click→commit interval + swap flash + CLS + duration** on the
   cold `/dock/rail` nav and the warm `/substrates/blob` push (W4).
4. Bank each as a captured DELTA artefact (trace JSON + screenshot) under the wave's evidence root — the
   R3b RED baseline stands; the after lands once the fix does. The trace IS the proof; the commit message is
   not.

**OPEN markers (post-union state):**
- `OPEN-P0` — **RULED (ruling 9):** build `dist-demo/` in the test job (a demo-build step); do NOT read a
  committed build-manifest snapshot (it goes stale silently and greens over a regressed build). [band-wide]
- `OPEN-P1` — async Aurora placeholder: confirm the CSS-gradient wash placeholder (`aurora-hero.ts:10`
  comment) is not itself in the async chunk (else the field flashes empty on first paint). [W1]
- `OPEN-P2` — **narrowed:** the `@glass`→`src` alias makes the deep-leaf import work with no export-map
  change; only the Family H canon call (deep-leaf vs a named `aurora/config` leaf) remains. [W1]
- `OPEN-P3` — defer the docks or keep them eager (draft: keep — small bytes, async nav chrome flashes). [W1]
- `OPEN-P4` — the modulepreload-count + eager-KB ceilings (draft: ≤45 / ≤450KB, reds at HEAD 73/789,398B). [W1]
- `OPEN-P5` — shell-field governance form: occlusion/idle pause (faithful) vs static wash on dense categories
  (cheap, a design downgrade). The breath-of-life fence binds either way. **The OPEN-FM-3 user
  ruling (breath-of-life edict vs the suffusion idle law, `BAND-FEEDBACK-MOTION` W5's HARD
  precondition) is the GOVERNING REFERENT for arm (b): the static-wash design downgrade consumes
  its outcome — the lean does not pre-decide idle life OFF while the user ruling pends
  (APOTHEOSIS D-06).** [W2, substantive]
- `OPEN-P6` — narrow `shellFieldActive` at the router so the field is a hero-band affordance not a global
  backdrop (overlaps Family D/G). [W2]
- `OPEN-P7` — the shell-field detector's exact assertion shape (depends on P5). [W2]
- `OPEN-P8` — the above-fold exemption count N (first grid row; responsive by breakpoint cols) — moves with
  the ceded edit to `BAND-STORY` W5. [W3→STORY]
- `OPEN-P9` — **re-scoped:** the shared-def arm is STRUCK (seed distinctness is designed,
  `WatercolorDot.vue:21-23,:86`); the residue is measurement-contingent — octave diet / animate cap ONLY if
  the mount-cost trace shows the 13 one-time rasterizations matter; default ACCEPT-as-designed + the
  once-and-cache regression fence. [W3]
- `OPEN-P10` — route-pending form: progress bar (floor) vs `<Suspense>` goo-morph (law 6, WITH the fence) vs
  both — decided INSIDE this wave (the lead seam ruling). **The in-wave decision CONSUMES
  `BAND-STORY` W7's four-type grammar: ONE mechanism per nav class (descend/ascend ride W7's
  shared-element VT; the pending floor + any goo-morph land per this ruling on the classes W7's
  types name), recorded in BOTH files — two chartered mechanisms never land unassigned on one nav
  class (APOTHEOSIS D-18).** [W4]

**In-scope born-RED-at-HEAD count:** 4 static detectors reddable NOW (boot-graph async+ceiling, shell-field
governance-absent + read-hygiene, route-pending-absent, plus W3's once-and-cache fence stated honestly as a
REGRESSION-FENCE not born-RED), each with a verified probe and a self-test bite. Live baselines: W1/W2/W4
R3b-SEEDED; W3's intrinsic-size measure OWED at execution with the recipe above — the honest split the
census's "live-trace confirmation owed" verdict demands.

**Provenance note:** the former bottom-of-file "Lead seam ruling" and "W2 addendum" blocks (the STAB1
MAJOR-2 cure + the R3b seed) are FOLDED into the W4 and W2 bodies above as of this union — readers arriving
from `STAB1-COMPLETENESS.md` / `STAB2-COHERENCE.md` / `ASSEMBLY-CROSSWALK.md` anchors near the old
`:505-520` find that content in `## Wave 2 §Design` (deliverable b) and `## Wave 4 §Mandate/§Design`.

---

## APOTHEOSIS amendments (RU-04 third judge, 2026-07-18)

Applied per `../formation/refable/REFABLE-RU-04-JUDGE.md`; the capstone is `APOTHEOSIS.md`.

- **D-06:** OPEN-P5 gains the governing-referent clause — the (b) static-wash design downgrade
  consumes the OPEN-FM-3 user ruling; the seat-level lean does not pre-decide the idle axis.
- **D-18:** OPEN-P10 gains the one-mechanism-per-nav-class clause consuming `BAND-STORY` W7's
  four-type grammar, recorded in both files.
- **MECH-06/D-08 (recorded, no PERF edit needed):** this band's FOUR standing `tests/gates/`
  vitest gates are now enumerated in `BAND-GATES` W1's inbound-newcomer census and count-guard
  arithmetic — PERF's own posture declaration was already honest.
