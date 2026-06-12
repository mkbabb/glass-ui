# BA.W-SHELL-HOLD — the demo shell holds its page (the railContext auto-navigation kill)

**Name**: W-SHELL-HOLD - the railContext self-navigation guard
**Opens after**: BA Batch 0 open (runs ‖ W-GESTALT-GATE ‖ W-HYGIENE ‖ W-CARVE2 — disjoint file bounds; lands FIRST in priority — every later wave's live verification depends on the page holding)
**Agents**: 1
**Hard gate**: `proof:shell-hold` (born-RED) — a source witness on the guard (the `railContext` `set` pushes ONLY on a genuine user chip activation, never from a mount/normalization v-model echo) + a hold-the-page live probe (navigate to 3 previously-drifting routes, wait 3s each, assert `location.pathname` unchanged).
**Status**: SPEC

## Goal criterion

The demo shell HOLDS whatever page a user (or a live-verification pass) lands on — no automatic route change on mount, on normalization, or on any non-interactive reactive re-evaluation of the shell docks' `railContext`. A visitor who stops interacting stays on their story; a chip click still navigates. This wave succeeds if, with no user input, every demo route stays put for ≥3s.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the fleet's ONE root cause, not a blind re-diagnose (BA invariant 3 — re-opened ≠ rebuilt-blind). Before touching a byte, the impl agent re-greps each anchor below at HEAD, reproduces the drift LIVE on `:5199` (load `/dock/overview`, do nothing, confirm the route drifts within ~1s), and confirms the mechanism still holds. If a cite has moved, the agent records the drift in PROGRESS and re-locates the mechanism — it does NOT re-invent the diagnosis.

Grounding finding (fd-foundations-substrates.md): **FD-FS-4** [the "Tooling note" — a real DEFECT, not a probe artefact]. The lane could not capture ANY page without injecting a `history.pushState` route-freeze; the drift degrades EVERY page in the demo. Cross-references R8-1/R8-9 (the dock-rail findings — the same `railContext`/`DockRail` seam W-RAIL3 introduced). Capture path for the RED evidence: `docs/tranches/BA/audit/fleet/evidence-fd-foundations/` (the lane's pngs were captured ONLY behind the pushState freeze — the un-frozen drift is the RED state this wave clears).

The root cause (confirmed at HEAD this authoring — both shell docks carry the IDENTICAL seam):

**The `railContext` writable-computed's `get` fallback round-trips through `set` as a v-model echo, firing `router.push` with no user input.** `<DockRail v-model:context="railContext">` binds the chip-strip's `defineModel<string>("context")` (`DockRail.vue:86`) to the shell dock's `railContext` computed. On a page whose current story is NOT inside any facet's `entries` (the common case — most stories sit OUTSIDE the >1-facet contextual sets), the `get` falls back to `contextLayers.value[0]?.id` (`SidebarDock.vue:119`, `BottomDock.vue:84` — the `here ?? contextLayers.value[0]` arm). `DockRail` paints the active chip off that value (`DockRail.vue:132` `'is-active': context === chip.id`) and — because the model is a two-way `defineModel` — the reactive system writes the resolved fallback value BACK through the computed's `set` on the first reconcile. The `set` (`SidebarDock.vue:121-130`, `BottomDock.vue:86-94`) reads `facet.entries[0]` + `route.meta.categoryId` and unconditionally fires `void router.push('/${categoryId}/${first.storyId}')`. So the shell auto-navigates to the active facet's first story within ~1s of EVERY load — the lane watched it drift to `/dock/overview`, `/motion/curve-gallery`, `/navigation/tabs`, `/data/table`, `/containers/dialog`.

The `set` cannot tell a genuine user chip click apart from the mount/normalization echo: both arrive as a `context.value = id` write inside `DockRail.select()` (`DockRail.vue:108`) OR as the v-model reconcile of the fallback `get`. The guard must distinguish the two: a `router.push` fires ONLY when the write originates from a user activation (a real chip click `@advance` / `select()` call), never from the computed re-evaluating its own `get` fallback.

RE-GROUND command set (run all; confirm each mechanism at HEAD):

```
sed -n '110,131p' demo/layout/SidebarDock.vue      # the railContext get-fallback + set-push
sed -n '76,95p'   demo/layout/BottomDock.vue        # the IDENTICAL seam (second consumer)
sed -n '104,112p' src/components/custom/dock/DockRail.vue   # select() → context.value = id → emit('advance')
sed -n '79,90p'   src/components/custom/dock/DockRail.vue   # defineModel('context') + the @advance emit
grep -n 'router.push\|contextLayers.value\[0\]' demo/layout/SidebarDock.vue demo/layout/BottomDock.vue
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | FD-FS-4 sidebar self-nav | `demo/layout/SidebarDock.vue:114-130` (the `railContext` computed: `:119` get-fallback `here ?? contextLayers.value[0]`; `:121-130` set unconditional `router.push`) | the `get` fallback echoes back through the two-way `defineModel` `set` on mount/normalization → `router.push` with no user input |
| 2 | FD-FS-4 bottom self-nav | `demo/layout/BottomDock.vue:79-94` (the IDENTICAL `railContext` computed: `:84` get-fallback; `:86-94` set unconditional `router.push`) | the same v-model-echo seam on the horizontal shell dock — the second consumer; both must be guarded or the bottom dock still drifts |
| 3 | FD-FS-4 model round-trip | `src/components/custom/dock/DockRail.vue:86` (`defineModel<string>("context")`), `:108` (`select()`: `context.value = id`), `:109` (`emit("advance", id)`) | `DockRail` writes the model in BOTH the user-click path (`select`) and the reconcile path; the consumer's `set` cannot today tell them apart — the guard lives in the consumer, keyed off the `@advance` user-activation signal |

The drift is LIVE-CONFIRMED as the RED state: load any non-faceted-story route on `:5199` with no injected freeze → `location.pathname` changes within ~1s. The fd-foundations lane could only capture by injecting `history.pushState` (its Tooling note) — that workaround is the proof the defect is real, not a probe artefact.

## Scope

1. Guard the `railContext` `set` on BOTH shell docks so `router.push` fires ONLY on a genuine USER chip activation — never from the mount/normalization v-model echo of the `get` fallback. The smallest-diff mechanism: the `set` short-circuits unless the write was initiated by `DockRail`'s `@advance` user-activation signal (a `userActivated` latch the `@advance` handler raises for the duration of the click-initiated `set`, cleared synchronously after). The `@advance` emit (`DockRail.vue:109`) already fires ONLY from `select()` (`DockRail.vue:104-110`), the genuine click path — it is the existing, idiomatic user-intent signal; the v-model reconcile does NOT emit `@advance`. NO new prop on `DockRail`, NO change to the `get` fallback (the active-chip highlight tracking stays correct), NO parallel state store (BA invariant 1 — one registry).
2. Apply the IDENTICAL guard to `SidebarDock.vue:114-130` and `BottomDock.vue:79-94` (the two consumers carry byte-for-byte the same seam) — the guard is a per-consumer edit, not a `DockRail`-internal change, because the route-push is consumer-owned (`DockRail` writes only the model; the consumer owns navigation — the W-RAIL3 one-registry contract). Both edits land in this wave; guarding one leaves the other drifting.
3. The active-chip highlight (`DockRail.vue:132`) and the `get` fallback that drives it are PRESERVED — the chip still shows the active facet, a chip click still navigates. The guard suppresses ONLY the non-interactive `set`, never the legitimate user navigation.

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if the user-activation latch CANNOT be expressed in the consumer's `set` without a `DockRail` API change (a new `:on-user-advance` prop, a `@advance`-vs-model-write disambiguation the model shape does not afford) — that is a scope-reveal; triumvirate (research the model-vs-event ordering + plan-augment the bound to `DockRail.vue` + redress), do NOT widen unilaterally. The smallest-diff mandate (FD-FS-4 "Smallest possible diff") is the binding constraint; a `DockRail` API expansion is a last resort, not a first reach.
- **Hard-gate failures not local-edit-recoverable**: if the live hold-the-page probe still drifts after the guard lands (the `set` fires from a path other than the diagnosed v-model echo — e.g. a `watch` elsewhere, or a router redirect in the manifest), that is a misdiagnosis, not a token tweak — triumvirate, re-root-cause before re-editing.
- **Diagnostic loop halt**: if the latch suppresses the echo but ALSO suppresses a genuine chip click (the click navigation breaks), and three iterations have not isolated the model-write-vs-event ordering (whether `@advance` fires before or after the model reconcile within the same tick), halt and triumvirate — the Vue `defineModel` write/emit ordering is the suspect.

## File Bounds

| File | Access |
|---|---|
| `demo/layout/SidebarDock.vue` | modify-carve (the `railContext` `set` guard ONLY — the `:121-130` set arm) |
| `demo/layout/BottomDock.vue` | modify-carve (the `railContext` `set` guard ONLY — the `:86-94` set arm) |
| `tests-visual/shell-hold.spec.ts` | create (the born-RED π hold-the-page probe) |
| `scripts/proof-shell-hold.mjs` | create (the born-RED source witness on the guard) |
| `package.json` | modify (register `proof:shell-hold` + add to the local set / parity) |
| `scripts/gates.mjs` | modify (register the `proof:shell-hold` row in the gate registry) |

Do NOT touch:
- `src/components/custom/dock/DockRail.vue` — the model/`@advance` contract is the existing user-intent signal the guard CONSUMES; editing it (a new prop/event) fires the triumvirate above (smallest-diff fence). The `defineModel`/`select`/`emit("advance")` shape is read-only for this wave.
- `demo/composables/useContextualDockLayers.ts` — the route→facet RESOLVER is correct (W-RAIL3 kept it); the bug is the v-model echo in the consumer `set`, not the resolver.
- `demo/stories/dock-layer-contexts.ts` / the `CONTEXT_LAYER_MAP` — the facet map is correct; the drift is the push, not the mapping.
- **DAG coordination seam — the shell docks (declared in EXECUTION-DAG §3)**: W-DOCK-GEOMETRY (Batch 2) touches ONLY the `overflow` prop on these same two files; W-DOCK-SECTIONS (Batch 3) supersedes both surfaces with the section rebuild. This wave owns the `railContext` `set` guard ALONE and lands FIRST (Batch 0) — it writes neither the `overflow` prop nor any geometry/section markup. The Batch-3 rebuild inherits this guard as a correctness floor (the section model must not re-introduce a self-navigating `set`); the guard is named in W-DOCK-SECTIONS's §0 as a preserved invariant.
- The standing fences: the GL shader internals (aurora.frag / metaball.frag — untouched, no GL surface here); ppmycota purple (no library token edit); the slides `docs/tranches/M/` docs (foreign, untouched).

### Disjointness

Single agent; no intra-wave path contention. Across Batch 0: W-GESTALT-GATE writes `scripts/proof-ba-gestalt.mjs` + the gate manifest port-defaults (NOT these files); W-HYGIENE writes `MIGRATION.md` + `CLAUDE.md` + the docs submodule (NOT these files); W-CARVE2 writes `src/styles/typography.css` + `constellationField.ts` + `Constellation.vue` (NOT these files). The two consumer SFCs (`SidebarDock.vue`, `BottomDock.vue`) and the two new gate files are touched by NO other Batch-0 wave. `package.json` + `scripts/gates.mjs` are also touched by W-GESTALT-GATE (its gate registration) — these are append-only registry edits to DISTINCT rows (a new `proof:shell-hold` entry vs a new `proof:ba-gestalt` entry); the orchestrator sequences the two registry appends at integration (no line overlap, distinct keys), OR each wave's registration lands in its own integration commit — declared here so the append is not raced.

## Agent Units

### BA.W-SHELL-HOLD.1 the railContext user-activation guard (both shell docks)

- Goal: the `railContext` `set` on both shell docks fires `router.push` ONLY on a genuine user chip activation, never on the mount/normalization v-model echo — with the active-chip highlight and the real chip-click navigation both preserved.
- Mechanism: a `userActivated` latch in each consumer SFC. `<DockRail>`'s `@advance` (the existing user-click-only signal, emitted from `select()` at `DockRail.vue:109`) sets the latch true for the duration of the click-initiated write; the `railContext` `set` early-returns (no `router.push`) unless the latch is set, then clears it synchronously. The v-model reconcile of the `get` fallback does NOT emit `@advance`, so it never raises the latch — the echo is suppressed. Identical edit in `SidebarDock.vue` and `BottomDock.vue`. NO `DockRail` API change, NO new prop, NO parallel store. (If the `@advance`/model-write tick ordering makes a same-tick latch unreliable, the fallback mechanism — also smallest-diff — is to compare the incoming `set` `id` against the `get`'s current resolved value and short-circuit when they are EQUAL, since the echo always writes the value `get` already returned; the agent picks the one the live probe proves holds, recording the choice in PROGRESS.)
- Files: `demo/layout/SidebarDock.vue` (the `:121-130` set arm + the `@advance` handler), `demo/layout/BottomDock.vue` (the `:86-94` set arm + the `@advance` handler).
- Sub-gate: the gate's S1 source witness — the `railContext` `set` on BOTH files contains a guard that gates `router.push` behind a user-activation signal (the `@advance` latch or the equality short-circuit), asserted positively (the `set` body is no longer an unconditional push), on BOTH consumers; AND the π hold-the-page probe (P1) shows zero route change on the three previously-drifting routes.

## Hard Gate

`proof:shell-hold` (born-RED at HEAD, driven GREEN by the wave) + the binding π hold-the-page probe. Both halves must hold for a clean close — a source-green/still-drifting gap is the FD-FS-4 failure class (the lane could not even capture without the pushState workaround).

1. **S1 — the guard exists on BOTH consumers (source witness, born-RED).** A pure source-scan (the comment-strip + detector house pattern, mirroring `proof-dock-unify.mjs`) asserts the POSITIVE: the `railContext` `set` arm in `SidebarDock.vue` AND in `BottomDock.vue` gates its `router.push` behind a user-activation condition — it is NO LONGER an unconditional `if (first && categoryId) { router.push(…) }` with no user-intent guard. RED at HEAD: both `set` arms push unconditionally (`SidebarDock.vue:125-128`, `BottomDock.vue:90-93`). **Bite-tightening (anti-evasion)**: the assert is the POSITIVE — the `set` body references a user-activation gate (an `@advance`-fed latch ref, or an equality short-circuit against the `get`'s resolved value) AND a `router.push` reachable ONLY through it; it does NOT merely grep for the literal string `userActivated` (a guard renamed/expressed differently must still gate the push), and it FAILS if a `set` arm pushes on a path NOT reachable through the guard (a smuggled second push). The witness asserts BOTH files (guarding one leaves the other drifting — defect #2).
2. **P1 — the page HOLDS (the binding π readback, born-RED, captured own-surface).** `tests-visual/shell-hold.spec.ts` on `:5199`: navigate to 3 previously-drifting routes — `/dock/overview`, `/motion/curve-gallery`, `/navigation/tabs` (the lane's own drift list) — and for EACH: record `location.pathname` after the route settles, wait 3000ms with NO user input (no click, no keyboard, no programmatic nav), then assert `location.pathname` is UNCHANGED (strict equality against the recorded path). RED at HEAD: each route drifts within ~1s (the `pathname` differs after the wait). The probe also asserts (negative-control / anti-false-green) that a SCRIPTED chip click on a faceted route DOES navigate (the `@advance` path still works) — so the guard suppresses the echo without breaking real navigation. Captured to `docs/tranches/BA/audit/visual/W-SHELL-HOLD-DELTA.md` with the before (drift log) / after (held log) route traces. **The π half is the binding truth — if the source half passes but a route still drifts in the live probe, the wave does NOT close.**

S1 is the device-free CI half (`proof:shell-hold`); P1 is the binding live truth (a source-green/still-drifting gap is the exact FD-FS-4 failure class). This is a SHELL-DEMO correctness wave, not a visual-register wave — it does NOT carry a whole-page gestalt verdict (BA invariant 4 binds VISUAL waves at W-REFLECT2; this wave's "gestalt" is simply that the page exists to be judged at all, which is precisely why it lands first). The route-hold probe IS its completion truth.

## Format And Lint Cadence

`npm run typecheck` after the two SFC `set`-guard edits (the `@advance` handler + latch are typed); `npx playwright test tests-visual/shell-hold.spec.ts` born-RED against HEAD (proof the un-guarded shell drifts), GREEN at close; `node scripts/proof-shell-hold.mjs` born-RED before the source edits, GREEN at close; `npm run proof:gate-script-parity` after the `package.json`/`scripts/gates.mjs` registration; `git diff --check` before close. Docs-only siblings' checks do not apply (this wave touches source); no formatter is skipped.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-SHELL-HOLD-DELTA.md` — the before (HEAD drift route-trace per route) / after (held route-trace per route) logs from the π probe, plus the negative-control chip-click-still-navigates trace.
- The `proof:shell-hold` JSON artefact (born-RED log at HEAD + GREEN-at-close log).
- The `proof:gate-script-parity` output post-registration.
- The `tests-visual/shell-hold.spec.ts` run log (RED at HEAD, GREEN at close).

## Commit Plan

- impl commit: `fix(demo): shell docks hold the page — railContext set guarded behind user activation (BA.W-SHELL-HOLD)` — body names the v-model-echo root cause + the per-consumer guard on both shell docks.
- gate commit: `test(demo): proof:shell-hold born-RED→GREEN (source witness + hold-the-page π probe) + parity registration`.
- doc/status commit: the W-SHELL-HOLD-DELTA doc + the PROGRESS row.

## Dependencies

- **Depends on**: nothing structurally (Batch 0, disjoint bounds). Reads the existing `DockRail` `@advance`/model contract and the `useContextualDockLayers` resolver, edits neither.
- **Blocks**: EVERY later wave's live verification (the highest-priority diff in the tranche per EXECUTION-DAG §1) — every π readback and every gestalt capture from Batch 1 onward silently races this bug until it lands; this wave is the precondition for trustworthy live capture across BA. W-DOCK-GEOMETRY (Batch 2, touches the same files' `overflow` prop only) and W-DOCK-SECTIONS (Batch 3, the section rebuild that supersedes these surfaces) inherit the guard as a correctness floor — W-DOCK-SECTIONS's §0 carries the preserved-invariant note (no self-navigating `set` re-introduced by the section model).

## Archaeology

No prior attempt — this seam was introduced by W-RAIL3 (AZ) when the contextual facets moved OUT of the dock body and re-homed as the `DockRail` floating carousel, binding `v-model:context` to the `railContext` writable-computed. The fd-foundations lane is the FIRST to root-cause the auto-navigation to the v-model-echo round-trip (the lane had to inject a `history.pushState` freeze to capture any page at all). The guardrail this wave installs: the `set` distinguishes a genuine `@advance` user activation from the reconcile echo, so the one-registry W-RAIL3 contract (the chip writes the same navigation state) holds for REAL clicks while the demo holds its page for everyone else.
