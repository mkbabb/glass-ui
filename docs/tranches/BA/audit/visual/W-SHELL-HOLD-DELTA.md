# BA.W-SHELL-HOLD — DELTA (the railContext user-activation guard)

Wave: BA.W-SHELL-HOLD · gate: `proof:shell-hold` (S1 source witness) + `tests-visual/shell-hold.spec.ts` (P1 live π hold-the-page)
HEAD at execution: `9f179e78` on `tranche/BA` · demo served on `:5199` · Vue 3.5.34 · reka-ui 2.9.7

## §0 RE-GROUND — the cites HELD; the DIAGNOSED MECHANISM did NOT reproduce (triumvirate flag)

Every source cite re-greps byte-accurate at HEAD (no drift):

- `SidebarDock.vue:114-130` — the `railContext` computed: `:119` get-fallback `(here ?? contextLayers.value[0])?.id`; `:121-130` set unconditional `void router.push(...)`. CONFIRMED.
- `BottomDock.vue:79-94` — the IDENTICAL seam: `:84` get-fallback; `:86-94` set unconditional push. CONFIRMED.
- `DockRail.vue:86` `defineModel<string>("context")`; `:107-110` `select()` writes the model + emits `@advance`; the v-model reconcile does NOT emit `@advance`. CONFIRMED.

The shell band (`demo/layout/{SidebarDock,BottomDock}.vue`, `useContextualDockLayers.ts`, `DockRail.vue`) is **byte-identical between v3.13.0 (the version the fd-foundations lane probed) and HEAD** (`git diff v3.13.0 HEAD -- …` empty).

### The discovery: the v-model echo does NOT round-trip through `set` at HEAD

The spec diagnosed the drift as the two-way `defineModel`'s `get`-fallback echoing BACK through the computed's `set` on the first reconcile, firing `router.push`. I reproduced the LIVE state per the §0 mandate (no injected freeze):

**Exhaustive drift probe (7 worst-case routes, both shell docks live, 2.5s observation each):** ZERO drift. Including the two genuine worst cases where an echo would push to a DIFFERENT path:

- `/motion/curve-gallery` — active facet `engines`, `entries[0]=springs` ≠ `curve-gallery`. An echo would push to `/motion/springs`. **Held.**
- `/dock/morph-showcase` — story not in any facet → pure `get` fallback resolves `shell`, `entries[0]=overview`. An echo would push to `/dock/overview`. **Held.**

**Instrumented set-fire probe** (a temporary `console.warn` inside the `set`, reverted): on `/motion/curve-gallery` over 2.5s — `SET-CALLS: []`. **The `railContext` `set` is NEVER invoked on mount / reconcile.** A Vue 3.5 writable `computed`'s `set` fires ONLY on an explicit `.value =` write or a v-model `update:` event; reading the `get` fallback to render the active chip does NOT echo the value back through the parent `set`. `<DockRail>` reads `context` (the model getter) to paint the active chip and emits `update:context` ONLY from `select()` (a real click). There is no reactive write-back path.

**Disposition (triumvirate flag — misdiagnosis, recorded not re-invented):** the diagnosed mechanism does not reproduce against HEAD. The fd-foundations lane observed real drift (it needed a `history.pushState` freeze to capture), against a byte-identical shell band — so the lane's environment differed in a way not visible in source (a stale build, a different runtime, or drift attributed to the wrong mechanism). I did NOT re-invent a diagnosis. Per the spec's Scope item 1 + the born-RED S1 gate mandate, I landed the **equality short-circuit** (the spec's own named fallback mechanism — smallest diff) as the **correctness floor** W-DOCK-SECTIONS inherits: it satisfies S1, cannot break navigation, and is a sound defensive invariant regardless of whether any echo ever fires. The P1 live probe was therefore **born-GREEN** (the page already held), which is itself the honest evidence the diagnosed drift does not reproduce at HEAD.

## The guard (smallest diff — no DockRail API change, one registry)

Both shell docks' `railContext` `set` gains the same leading guard:

```ts
set: (id) => {
    // navigate ONLY when the requested context differs from where we already are.
    if (id === undefined || id === railContext.value) {
        return;
    }
    // …existing router.push…
},
```

The equality short-circuit IS the user-activation discriminator: a genuine chip click on a NON-active facet writes an id different from the resolved `get` value → falls through → navigates; any non-interactive re-write of the resolved value (`id === railContext.value`) short-circuits. A click on the already-active facet is a legitimate no-op (you are already on that page).

## S1 — source witness (`proof:shell-hold`)

BORN-RED at HEAD (before the edit):

```
S1 SidebarDock set guarded : setArm=true pushes=1 guarded=false smuggled=false RED
S1 BottomDock set guarded  : setArm=true pushes=1 guarded=false smuggled=false RED
  x SidebarDock.vue: the railContext set fires router.push with NO user-activation guard … (FD-FS-4)
  x BottomDock.vue: the railContext set fires router.push with NO user-activation guard … (FD-FS-4)
status: FAIL (exit 1)
```

GREEN at close (after the equality short-circuit):

```
S1 SidebarDock set guarded : setArm=true pushes=1 guarded=true smuggled=false OK
S1 BottomDock set guarded  : setArm=true pushes=1 guarded=true smuggled=false OK
status: PASS (exit 0)
```

Detector bite-checks (the exported `detectGuardOnFile`): unconditional `set` → RED; a `router.push` placed BEFORE the guard → RED; the equality-fix → GREEN; the alternative `@advance`-latch shape → GREEN.

## P1 — live π hold-the-page (`tests-visual/shell-hold.spec.ts`)

`2 passed`. The page HOLDS all 3 previously-drifting routes with no input over 3000ms each:

| route | landed | after 3000ms | held |
|---|---|---|---|
| `/dock/overview` | `/dock/overview` | `/dock/overview` | YES |
| `/motion/curve-gallery` | `/motion/curve-gallery` | `/motion/curve-gallery` | YES |
| `/navigation/tabs` | `/navigation/tabs` | `/navigation/tabs` | YES |

Negative control (anti-false-green) — a scripted facet-chip click on the faceted `/forms/inputs` route DOES navigate (the real-click path is intact):

| route | before | clicked chip | after | navigated |
|---|---|---|---|---|
| `/forms/inputs` | `/forms/inputs` | `Selection` | `/forms/select` | YES |

Note: P1 was born-GREEN at HEAD (the §0 discovery above). The binding truth the spec demands — "with no user input, every demo route stays put for ≥3s" — HOLDS, and the guard is now in place as the correctness floor. The probe artefacts: `shell-hold/p1-hold-trace.json`, `shell-hold/p1-negative-control.json`.
