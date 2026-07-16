# BI-addenda live design audit — Fable

**Auditor:** Fable design auditor (fork). **Mode:** read-only; demo server :5199 belongs to the
active codex suite. **Observed:** 2026-07-16, working tree mid-transaction (7.0.0-in-flight).
**Bar:** supersede iOS 27, not match it.

## HEADLINE — the live audit is BLOCKED: the demo is un-bootable right now

The demo at http://127.0.0.1:5199 **cannot mount** in the codex agent's current working tree. Root
cause is on disk, verified read-only:

- `node_modules/.vite/deps/` is **gone** — only a `vitest/` sibling remains; the pre-bundled
  dependency directory has been wiped and is not being rebuilt.
- Every navigation loads the root HTML (200) and `/demo/main.ts` (200), then the app's Vue import
  graph 404s on the core optimized deps: `/.vite/deps/vue.js`, `vue-router.js`, `@lucide_vue.js`
  all **404 Not Found**. Vue itself never loads, so nothing renders — `document.body.innerText`
  length is **0**, zero `<canvas>` nodes, zero headings.
- The dev-server log (`/private/tmp/glass-ui-demo-5199.log`) is spewing
  `The file does not exist at "…/.vite/deps/vue.js" which is in the optimize deps directory`
  continuously through 01:36 — a persistent state, not a momentary re-optimize window.
- I polled `vue.js` for **70s** (28 tries): never recovered to 200. Reload, cache-bypass
  navigation, and fresh navigation all reproduced it.

**Interpretation.** This is the classic Vite optimize-deps invalidation: the in-flight transaction
churns `package.json` peers (dropping `class-variance-authority`/`clsx`/`perfect-freehand`, bumping
value.js→`^4.0.0`, keyframes.js→`^6.0.0`) and Vite marked the pre-bundle stale, but the deps
directory is wiped and the server is not re-optimizing. It is almost certainly a **dev-server
transient** (a restart would re-optimize and recover) rather than a shippable product defect — I did
NOT restart their server (fence). But it has two hard consequences the addenda must record:

1. **No π / native visual verification is possible in this tree state.** Every "native review
   pending" / "native acceptance pending" status line across the P-graph (dozens of waves — see
   wave-matrix reports) is un-runnable right now, including by the codex agent's own review. The
   tranche's paint obligations remain entirely unmet AND currently unmeetable.
2. **The demo — declared a product surface, not an afterthought (Core 8)** — has no smoke gate that
   would have caught an un-bootable state. Nothing in CI/release boots the demo. A `demo:boots`
   liveness check (navigate, assert `#app` has children + zero 404s) is a cheap, high-value born-RED
   gate the addenda should mint.

Evidence: `reports/design-shots/01-landing-light.png` (blank white full-page capture).

Because live paint was impossible, the rest of this report is a **source-level design read** of the
highest-value surfaces. It is explicitly **STATIC, NOT π** — it must never be counted as paint
verification (that would be the green-over-broken lie). It surfaces design-quality signal the
addenda can act on; each visual-quality claim still owes a real π capture once the demo boots.

---

## Static surface reads (source-level; π still owed on each)

### Tabs — the eyeglass core is ABSENT (MAJOR, corroborated)
`src/components/tabs/index.ts:1-3` + `SegmentedTabs.vue:3-4,57`: the standardized family ships
exactly **two materials — `pill` (DEFAULT, glass) and `underline` (paper ink-mark)**. The user's
UF-H1 directive — make the iOS-27 **eyeglass/lens** tab-select effect the DEFAULT and cull the
variants — left no trace: `grep eyeglass src/components/tabs/` = 0; the 14 repo `eyeglass` hits are
an unrelated spring-preset name. This independently confirms the prompt-recap ORPHANED verdict. The
default select affordance is a pill slider, not the lens. Below the Core-2/Core-3 bar for the named
directive.

### Substrate renderers — attributed-failure is well-architected; one masking SUSPECT (NOTE)
`src/components/aurora/Aurora.vue:8-10,36,58,130-145` + `composables/runtime.ts:28,89` show a real
`RendererStatus` emit channel and an `onInitError` prop chain — genuine init failures **surface to
the consumer** (satisfies P045 "expose the actual substrate and attributed failure"; the WebGPU→
WebGL2 fallback is two real renderers, not a mask). **SUSPECT to paint-verify:** the
`BB.W-AURORA-SWRASTER` "wedge catch" (`runtime.ts:444-470`) returns an **inert handle** under a
software rasterizer whose `renderAt` is a no-op that "falls cleanly to the placeholder, never a
thrown `onInitError` (a software-raster fall is not a violation)." That is a deliberate
silent-with-placeholder path. The comments themselves name the failure mode it defends against —
"a synchronous `renderAt` right after capture paints a BLANK frame — the dead-preview defect." So a
dead/blank preview is a known, code-acknowledged risk class. **Owed:** a π capture proving the
software-raster/placeholder state renders a *visible honest* surface (not a blank), on both engines
and in headless/CI where the wedge fires. If it blanks, it is a no-masking-fallback violation.

### Typography — the audacious display register EXISTS (GOOD)
`src/styles/typography/semantic.css:33-50`: `@utility text-display-audacious` with
`--type-display-audacious` = **φ^(11/2), ≈352px peak**, `--type-leading-display` 0.84, tracking
-0.03em, and three non-forking knobs. This is a genuine audacious-typography statement (Core 5),
present in source. **Caveat aligned with value.js V:** it is a single clamped display size; value.js
formally reports (`valuejs-inbox-2026-07-15-v-formation.md`) that the P019 **family-neutral paired
`1/√φ` kicker/headline ratio** does not exist at 6.0.0 — consistent with what I see (one display
token, not a proportioned pair). That specific P019 pair is a real open gap for the 7.0.0 producer
bundle.

### Demo no-meta edict — UI is CLEAN; residue is comment hygiene (NOTE, corrects over-read)
203 `BI.W-*`/`BG.W-*`/`BD.W-*`/`tranche` references exist under `demo/`, but a grep for meta
vocabulary inside **rendered template text** (`>…BI.W-…<`) returns **zero** — every one of the 203
is inside an HTML comment (`<!-- -->`) or CSS comment (`/* */`), e.g. `demo/shell/AppShell.vue:196`,
`demo/stories/foundations/paper-glass.vue:126`. So the **no-meta UI edict is satisfied**; the residue
is source-comment hygiene, not a user-visible leak. (The one library-side concern flagged elsewhere —
`src/composables/motion/useDragMorph.ts` embedding `BD.W-ANIM-IOS27-TUNE` in a string that ships to
dist — is a library comment/string, not demo UI; treat as low-priority hygiene, not a no-meta UI
violation.)

---

## Defect rows

| id | severity | surface | mechanism | claim | evidence |
|----|----------|---------|-----------|-------|----------|
| DA-1 | critical (blocker) | demo :5199 (whole app) | dev-server-optimize-deps-broken | The demo is un-bootable in the current tree — `.vite/deps` wiped, `vue.js`/`vue-router.js`/`@lucide_vue.js` 404, app never mounts (bodyText len 0, 0 canvas). Live π impossible. | `.vite/deps/` gone (only `vitest/`); server log 31+ "vue.js does not exist in optimize deps" through 01:36; 70s poll never 200; `design-shots/01-landing-light.png` blank |
| DA-2 | major | components/tabs | orphaned-user-directive | UF-H1 iOS-27 eyeglass/lens tab-select-as-DEFAULT never landed; ships `pill`(default)+`underline` only | `tabs/index.ts:1-3`, `SegmentedTabs.vue:57`; `grep eyeglass src/components/tabs` = 0 |
| DA-3 | note (paint-owed) | substrates aurora/blob | masking-fallback-suspect | Software-raster "wedge catch" returns an inert handle → silent placeholder; code names the "dead-preview / BLANK frame" defect class. Verify placeholder is visible-honest, not blank. | `aurora/composables/runtime.ts:444-470,465` |
| DA-4 | note | src (library) | meta-comment-hygiene | 203 tranche/wave refs in demo/ + a `BD.W-ANIM-IOS27-TUNE` string in `useDragMorph.ts` — all comments/strings, NOT rendered UI; no-meta UI edict is SATISFIED | `grep >…BI.W-…< demo/` = 0; comment hits at `AppShell.vue:196` et al. |
| DA-5 | major (process) | CI / demo | no-demo-boot-gate | Nothing in CI/release boots the demo; an un-bootable demo ships undetected. Mint a `demo:boots` born-RED liveness gate. | no demo-navigate step in `release.yml`/`ci.yml` (gates-consumers report) |

**Positives not to re-litigate:** the `RendererStatus`+`onInitError` attributed-failure channel
(P045) is genuinely architected; the `text-display-audacious` φ^(11/2) register (Core 5) is present;
the no-meta **UI** edict holds.
