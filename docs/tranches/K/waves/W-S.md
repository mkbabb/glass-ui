# K.W-S — Speedtest-W feedback: vueuse SCC trap fix (v0.9.3 candidate)

**Opens after**: K W1 close (and ideally after K W6 lands the audacious primary-CTA so the headline is in place before this consumer-facing surface change).
**Agents**: 1 (sequential — surface inventory → barrel split → consumer re-validation).
**Hard gate**: speedtest's `dist/index.html` carries zero `<link rel="modulepreload">` AFTER applying a vueuse manualChunk in its `vite.config.ts`; speedtest entry chunk gzip drops by ≥ 15 KB net (eager critical path, including the new vueuse leaf chunk); zero substantive PNG diff in the speedtest 9-cell visual-regression matrix.
**Status**: planned.

## Cross-repo provenance

This wave absorbs the speedtest tranche W finding **W3.b.1 vueuse manualChunk DEFERRED** at speedtest commit `aade571` (`docs(W/W3/b1): vueuse manualChunk disposition — DEFERRED (V.W1.T7 SCC trap)`). The disposition document at `/Users/mkbabb/Programming/speedtest/docs/tranches/W/artefacts/W3/b1/disposition.md` is the load-bearing input — agent should read it first.

Speedtest's symptom (verbatim):

> Adding `"vueuse": ["@vueuse/core", "@vueuse/shared"]` to the `manualChunks` block at `vite.config.ts:133-137` (per A5 §3 Split 5) regresses the V.W1.T7 SCC class:
> - Pre-edit: `dist/index.html` carries 0 `<link rel="modulepreload">` directives.
> - Post-edit: 1 modulepreload directive appears (`/assets/vueuse-OmBmlbLo.js`).
>
> Inspection of the emitted `vueuse-*.js` chunk confirms Rollup hoisted `@vue/shared` + `@vue/reactivity` + `@vue/runtime-core` v3.5.11 into the vueuse chunk to satisfy both consumers (entry + vueuse leaf) sharing Vue.

Per `feedback_library_gaps.md`: the gestalt fix lives upstream in glass-ui, not in the consumer's `vite.config.ts`. K.W-S delivers the upstream half.

## Root cause (speedtest-side analysis, glass-ui-side mechanism)

Speedtest's worker (`src/utils/speedtest/{download,upload}.ts`) imports `useInterval` + `useTimer` from `@mkbabb/glass-ui` (root barrel). Those composables are themselves vueuse-free (`src/composables/{useInterval,useTimer}.ts` use raw `setTimeout` + `requestAnimationFrame`). But the root barrel `src/index.ts` re-exports the entire consumer surface, including 14 files that DO import from `@vueuse/{core,shared}` — chiefly `useGlobalDark`, `useKeyboardShortcuts`, and the Combobox / Input / Textarea components that use `createInjectionState` / `reactiveOmit` / `useVModel`.

Rollup's tree-shaker should drop unused re-exports, but the SCC analysis pulls vueuse + `@vue/runtime-core` into a shared chunk because:

1. The consumer's entry chunk depends on `vue` (App.vue, router, pinia, glass-ui composables that DO export from `vue`).
2. `@vueuse/core` 14.x depends on `vue` directly (imports `ref`, `computed`, `watch`).
3. When a manualChunk forces vueuse to a leaf, Rollup hoists the shared `vue` runtime into the deeper bucket (vueuse), making vueuse the new home for `@vue/shared` + `@vue/reactivity` + `@vue/runtime-core`.
4. The entry chunk's eager critical path then imports from vueuse to access Vue, and Vite emits `<link rel="modulepreload">` to satisfy the eager dependency.

Identical mechanism to V.W1.T7's `vue-echarts` trap; different package; same fix pattern: prevent the consumer from reaching vueuse-bearing surfaces via the root barrel unless they explicitly opt in.

## Scope (4 steps)

### Step 1 — Audit + inventory glass-ui's vueuse surface

Walk `src/**` and produce three inventory tables saved to `docs/tranches/K/audit/W-S-vueuse-inventory.md`:

1. **Direct vueuse-importing files** — currently 14 files at HEAD (cc30e74):
   - `src/composables/useGlobalDark.ts` (uses `createGlobalState`, `useDark`, `useToggle`)
   - `src/composables/useKeyboardShortcuts.ts` (uses `createGlobalState`, `useEventListener`)
   - `src/components/ui/input/Input.vue` (uses `useVModel`)
   - `src/components/ui/textarea/Textarea.vue` (uses `useVModel`)
   - `src/components/ui/carousel/useCarousel.ts` (TBD — read first)
   - `src/components/ui/combobox/Combobox*.vue` (8 files; use `createInjectionState`, `reactiveOmit`)

2. **Root-barrel re-export chain** — every line in `src/index.ts` that ultimately routes to a vueuse-importing file. Build the closure transitively. This is the surface speedtest-style consumers see.

3. **vueuse-free composables** — `useInterval`, `useTimer`, and any others. These are speedtest's actual workload at the root barrel.

### Step 2 — Carve the root barrel into vueuse-bearing vs vueuse-free zones

Strategy A (preferred, KISS): **subpath split for vueuse-bearing components**.

- Keep `src/index.ts` re-exporting the vueuse-FREE composables + the bulk of UI primitives that don't use vueuse.
- Move vueuse-bearing components to subpath barrels: `@mkbabb/glass-ui/forms` (Input, Textarea, Combobox*), `@mkbabb/glass-ui/composables/dark` (useGlobalDark), `@mkbabb/glass-ui/composables/keyboard` (useKeyboardShortcuts).
- Add the matching `package.json` `exports["./forms"]` + `typesVersions` entries.
- Storybook + tests update to consume the new subpaths.

Strategy B (alternative, rejected): convert vueuse-bearing composables to dynamic-imports. Each call-site pays an async-resolve hop on every use. UX cost is significant; rejected.

Strategy C (rejected): pin vueuse to a specific Vue-runtime-free fork. Out of scope; introduces fork maintenance.

**Land Strategy A.** The break-the-API risk is real — speedtest currently uses `Input`, `Textarea`, `Combobox` from root barrel. The migration shape:

1. **Phase 1 (this wave)**: ADD subpath exports without removing root re-exports. Both shapes resolve. Document the recommended shape in CHANGELOG.md + DESIGN.md. Speedtest re-link is a no-op.

2. **Phase 2 (deferred — v1.0)**: REMOVE root re-exports. This is a breaking change; bump major. Schedule with the v1.0 audacious-CTA cohort.

This wave only ships Phase 1 — the additive subpath exports. Phase 2 is K.W-S follow-up tranche material (likely L.W*).

### Step 3 — Speedtest consumer re-validation

After v0.9.3 publishes (or fast-forwards into glass-ui master), verify the SCC trap is actually broken:

1. In speedtest worktree, edit `vite.config.ts` to add the vueuse manualChunk that previously failed:
   ```ts
   manualChunks: {
     "maplibre": ["maplibre-gl"],
     "echarts": ["echarts"],
     "h3": ["h3-js"],
     "vueuse": ["@vueuse/core", "@vueuse/shared"],
   }
   ```
2. Edit speedtest's worker source (`src/utils/speedtest/download.ts` + `upload.ts`) to import `useInterval`/`useTimer` from `@mkbabb/glass-ui` (already true). Optional: explicitly verify the worker's import graph doesn't touch any `@mkbabb/glass-ui/forms` or `@mkbabb/glass-ui/composables/*` subpath.
3. `npm run build` and verify `grep "modulepreload" dist/index.html` returns nothing — the regression-guard probe.
4. Measure entry chunk gzip pre/post. Target: ≥ 15 KB net drop (vueuse leaf + Vue runtime separated cleanly).
5. Run the speedtest 9-cell Playwright visual-regression matrix. Target: 0 substantive PNG diffs.

If the SCC trap STILL fires (modulepreload reappears), the upstream fix is incomplete — research lane required. Halt + dispatch K triumvirate.

### Step 4 — Release v0.9.3 + speedtest re-link

1. Bump `package.json` 0.9.2 → 0.9.3.
2. Write CHANGELOG.md v0.9.3 entry covering subpath additions + the SCC analysis.
3. `npm run build` exit 0 (with `NODE_OPTIONS=--max-old-space-size=8192` per the v0.9.2 known-knob).
4. `git tag v0.9.3 && git push origin v0.9.3`.
5. Fast-forward glass-ui master to v0.9.3 (mirroring W2's pattern).
6. Speedtest re-links via `npm install` in a sibling consumer worktree. Commit speedtest-side: `chore(deps): bump @mkbabb/glass-ui to ^0.9.3 — vueuse subpath split unblocks Split 5` + the actual `vite.config.ts` vueuse manualChunk + the bundle-size evidence.
7. Speedtest commit lands as a follow-on patch on speedtest's master, reopening the speedtest tranche W's W3.b.1 disposition with a `LANDED` annotation pointing at the K.W-S commit hash + the speedtest re-link commit.

## File bounds

| File | Access |
|---|---|
| `src/index.ts` | modify (audit re-exports; mark which surfaces stay; do NOT remove anything in Phase 1) |
| `src/forms.ts` | create (subpath barrel for Input + Textarea + Combobox*) |
| `src/composables/dark.ts` | create (subpath barrel for useGlobalDark) |
| `src/composables/keyboard.ts` | create (subpath barrel for useKeyboardShortcuts) |
| `package.json` | modify (`exports["./forms"]` + `exports["./composables/dark"]` + `exports["./composables/keyboard"]` + matching `typesVersions` + version bump 0.9.2 → 0.9.3) |
| `CHANGELOG.md` | modify (v0.9.3 entry) |
| `vite.library.ts` | modify (if `libraryExternal` or rollup input config needs the new entry points) |
| `DESIGN.md` | modify (document the subpath shape + the migration recommendation) |
| `docs/tranches/K/audit/W-S-vueuse-inventory.md` | create (Step 1 deliverable) |
| `docs/tranches/K/audit/W-S-bundle-evidence.md` | create (Step 3 evidence) |

Speedtest-side (cross-repo, single follow-on commit):

| File | Access |
|---|---|
| `/Users/mkbabb/Programming/speedtest/package.json` | modify (`@mkbabb/glass-ui` peer-pin already `file:../glass-ui`; lockfile churn only) |
| `/Users/mkbabb/Programming/speedtest/vite.config.ts` | modify (add vueuse manualChunk) |
| `/Users/mkbabb/Programming/speedtest/docs/tranches/W/artefacts/W3/b1/disposition.md` | modify (annotate LANDED + K.W-S commit hash) |

Do NOT touch:
- Any source under `src/components/custom/**` (the lifted ScrollingText + the v0.9.1 surface — W2 owns that line). Phase 2's root-barrel removals belong here but are explicitly OUT OF SCOPE.
- `src/lib/cn.ts` (W3.b.2's tailwind-merge swap shipped at v0.9.2; do NOT regress).
- `src/freshness.ts` + the freshness root-barrel concern (W3.b.2's fix at v0.9.2; do NOT regress).
- `demo/**` storybook (orthogonal; if any storybook entry consumes a moved component, update its import path — but no template / behaviour churn).

## Hard gate

1. `glass-ui/dist/forms.{js,d.ts}` exist; `dist/composables/{dark,keyboard}.{js,d.ts}` exist. `ls -la dist/forms.* dist/composables/{dark,keyboard}.*`.
2. `node -e 'console.log(require.resolve("@mkbabb/glass-ui/forms"))'` resolves from a sibling consumer (use `import()` for ESM-only resolve probe).
3. `glass-ui` `npm test` ≥ 340/340 (post-v0.9.2 baseline preserved); no new test required for additive subpath if existing component tests cover the moved files via their existing import paths.
4. `glass-ui` `npm run build` exit 0 (with the standard 8 GB heap knob).
5. `git tag --list 'v0.9.3'` returns the tag; `git push origin v0.9.3` succeeds.
6. **Speedtest SCC trap broken**: speedtest worktree with vueuse manualChunk applied + v0.9.3 link → `grep "modulepreload" dist/index.html` returns nothing. Evidence transcript at `docs/tranches/K/audit/W-S-bundle-evidence.md`.
7. **Speedtest entry-chunk gzip net drop ≥ 15 KB**: pre-state at speedtest master without vueuse manualChunk vs post-state with v0.9.3 + manualChunk. Capture via `BUNDLE_VIZ=1 npm run build` (or rollup-plugin-visualizer direct). Same evidence document.
8. **Zero substantive PNG diffs** in the speedtest 9-cell Playwright visual-regression matrix. The subpath split is additive (Phase 1); existing root-barrel imports still work; visual rendering should be byte-identical.
9. CHANGELOG.md v0.9.3 entry documents the subpath additions + the SCC analysis + the migration recommendation.
10. DESIGN.md carries a "Subpath surface" section documenting the shape (forms, composables/dark, composables/keyboard) + the rationale (vueuse SCC trap; consumer-side bundling concern).

## Risks

- **Phase 1 doesn't actually fix speedtest's SCC trap**: if Rollup's tree-shaker still pulls vueuse-bearing surfaces into the entry chunk because the root barrel re-exports them, the trap persists. Mitigation: the bundle-evidence step verifies the modulepreload-free state. If the trap persists, this becomes a Phase 2 work item — root-barrel removal — and the wave's hard gate degrades to "v0.9.3 ships the additive subpath, with explicit MISS-DOC on the SCC trap and a route to L.W* for the breaking-change phase".
- **Storybook consumes moved components via root barrel**: if storybook entries `import { Input } from "@mkbabb/glass-ui"` and the root barrel still re-exports Input (Phase 1 keeps both shapes), no churn. If the root barrel is REMOVED in this wave (Phase 2 scope creep), storybook breaks — keep this wave additive only.
- **`useCarousel` is internal-only**: per Step 1 inventory, `useCarousel` may be a private composable consumed only by Carousel components. If so, no subpath needed; just keep it under `src/components/ui/carousel/` and ensure the root barrel doesn't re-export it.
- **`createInjectionState`** + **`reactiveOmit`** + **`useVModel`** in 12 component files: these are tiny vueuse functions. Tree-shaking SHOULD drop them when unused, but the SCC trap evidence shows it doesn't always. Phase 1 strategy doesn't move these (they're inside Combobox* etc.); Phase 2 might convert them to vue-only equivalents.

## Required artifacts

- `docs/tranches/K/audit/W-S-vueuse-inventory.md` — Step 1 inventory (3 tables).
- `docs/tranches/K/audit/W-S-bundle-evidence.md` — Step 3 evidence (modulepreload grep + entry-gz pre/post + visual-regression diff log).
- glass-ui CHANGELOG.md v0.9.3 entry.
- glass-ui v0.9.3 tag pushed to origin.
- Speedtest follow-on commit hash (annotated in `docs/tranches/W/artefacts/W3/b1/disposition.md`).

## Dependencies

- **Depends on**: K W1 close (the `hoverOpenDelay` decision is small but it's the minimum gate before any release work). Ideally K W6 (audacious primary-CTA HEADLINE) lands first so v0.9.3 ships behind the headline; but W-S can dispatch in parallel with W6 if the file bounds stay disjoint (W6 is `src/components/custom/cta/**`; W-S is `src/index.ts` + `src/forms.ts` + composables — disjoint).
- **Blocks**: any speedtest-side perf re-measurement that wants the eager-bundle ≤ 140 KB target (W3's W3.c summary.md routed this miss to "glass-ui v0.9.3 follow-up" explicitly).

## Anchor

- Speedtest disposition: `/Users/mkbabb/Programming/speedtest/docs/tranches/W/artefacts/W3/b1/disposition.md`
- Speedtest commit: `aade571` (the W3.b.1 deferral)
- Speedtest commit: `7285d38` (W3.a — value.js inline + the master-side build-blocker note)
- Speedtest commit: `dcdd4ce` (the speedtest re-link to v0.9.2 — confirms the v0.9.2 freshness root-barrel fix line of work)
- Glass-ui commit: `cc30e74` (v0.9.2 — the precedent for a root-barrel surgical fix)
- V.W1.T7 retrospective: `/Users/mkbabb/Programming/speedtest/docs/tranches/V/V.md` (the original SCC trap retirement of vue-echarts; the same mechanism this wave addresses for vueuse)
- A5 §3 Split 5: `/Users/mkbabb/Programming/speedtest/docs/audits/2026-05-08-pre-W/A5-perf-route-split.md`
