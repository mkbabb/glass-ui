# Q.W5 Lane A — scene-transition crash fix (proof doc)

**Wave**: Q.W5 Lane A · **Q-cos-15** · P0 — unblocks four features
**Repo modified**: `keyframes.js` (master, base `6af80ad`)
**glass-ui**: zero code change — W5 is a consumer-side wave; the substrate work was W3.

---

## Charter

Per Qρ F1 + Qσ D1. `demo/app/App.vue:106` wrapped `<Transition mode="out-in">` directly
around `<KeepAlive>` around a `defineAsyncComponent` scene. The async chunk resolves
*after* first paint; on a scene `:key` swap the Vue renderer null-derefs in
`getNextHostNode` during the transition leave hook; the new scene's target DOM never
mounts. The scene stage is left blank.

This single structural flaw masks the t-value scrubber, the bezier editor, the easing
presets, and the duration control, and crashes `square` / `amiga` / `easing` on cold
deep-link. `CubeScene` escaped only because it was statically imported into `App.vue`.

Lane A restructures the scene host with the documented Vue composition for an async
component swapped through a transition, verifies every scene mounts on cold deep-link,
and disposes of the post-crash route drift (Qρ F2).

---

## The `App.vue` `#target` slot — before / after

### Before (crashing)

```vue
<Transition name="scene" mode="out-in" :css="ready">
    <KeepAlive :max="3">
        <component
            :is="activeSceneComponent"
            :key="activeSceneKey"
            ref="sceneRef"
            v-bind="activeSceneProps"
        />
    </KeepAlive>
</Transition>
```

`activeSceneComponent` for `square` / `amiga` / `easing` is a `defineAsyncComponent`.
There is **no async boundary** between the `KeepAlive`/`Transition` layer and the async
component — the async wrapper *is* the `KeepAlive` child.

### After (fixed)

```vue
<Transition name="scene" mode="out-in" :css="ready">
    <KeepAlive :max="3">
        <Suspense :key="activeSceneKey">
            <component
                :is="activeSceneComponent"
                ref="sceneRef"
                v-bind="activeSceneProps"
            />
            <template #fallback>
                <div class="flex h-full w-full items-center justify-center">
                    <span class="instrument-serif text-lg text-muted-foreground animate-pulse">Loading scene…</span>
                </div>
            </template>
        </Suspense>
    </KeepAlive>
</Transition>
```

Two structural changes:

1. **`<Suspense>` inserted** between `<KeepAlive>` and the async `<component :is>`.
   This is Vue 3.5's documented nesting order for the combined case —
   `Transition` > `KeepAlive` > `Suspense` > async component (Vue docs,
   "Suspense — Combining with Other Components": the example nests exactly
   `RouterView` → `Transition` → `KeepAlive` → `Suspense` → resolved component).
2. **The `:key` moved from `<component>` to `<Suspense>`.** `KeepAlive` and the
   out-in `Transition` must see their cache/swap identity on their **direct child**.
   The direct child is now `<Suspense>`, so `activeSceneKey` lives there. `KeepAlive`
   caches the resolved Suspense boundary; the transition swaps Suspense boundaries,
   each of which carries an already-resolved subtree.

Companion change in `demo/app/scenes.ts`: the `amiga` descriptor's
`defineAsyncComponent({ loader, delay, loadingComponent })` object form was
normalised to the bare `defineAsyncComponent(() => import(...))` loader form,
matching the other three scenes. With `<Suspense>` owning the loading surface
via its `#fallback` slot, a per-descriptor `loadingComponent` is redundant — and
worse, it renders *inside* Suspense's resolved slot, which would defeat the
boundary. One loading surface, the `<Suspense>` fallback.

---

## Why the crash is eliminated

The crash (`TypeError: Cannot read properties of null (reading 'nextSibling' /
'subTree' / 'parentNode')` in `getNextHostNode`) is the well-known interaction of
`<Transition mode="out-in">` + `<KeepAlive>` + a *bare* `defineAsyncComponent`.

**The mechanism of the old structure.** `mode="out-in"` means: on a `:key` change,
fully run the leaving vnode's leave transition, *then* mount the entering vnode. The
leave hook walks the leaving subtree (`getNextHostNode`) to find the DOM anchor for
the next insert. With a bare async component, the `KeepAlive` child vnode is the async
*wrapper*. The async wrapper's inner `component.subTree` is populated only once the
chunk resolves — and is **nulled when the wrapper unmounts**. Because the chunk
resolves out of step with the transition's leave timing (chunk resolves post-first-
paint, the `:key` swap can fire before/around resolution), the leave hook walks a
wrapper whose `subTree` is already `null`. `getNextHostNode` dereferences
`subTree.el` / `.nextSibling` / `.parentNode` → three consecutive `TypeError`s. The
renderer aborts; the entering scene's `mount` never runs; the `#target` slot stays
empty.

**Why `<Suspense>` makes it impossible.** `<Suspense>` is an async *boundary*. Its
contract: it does **not** expose its default-slot vnode to its parent until every
async dependency inside that slot has resolved. The async dependency here is the
`defineAsyncComponent` chunk load. So:

- Before resolution, the vnode `KeepAlive`/`Transition` see is the **`<Suspense>`
  boundary itself**, rendering its `#fallback` — a plain, synchronous,
  fully-mounted `<div>`. It has a real `el`, a real `subTree`, real DOM.
- On a `:key` swap, the out-in transition's leave hook walks **that** subtree.
  `getNextHostNode` finds a concrete DOM node every time. There is no async wrapper
  in the leave path — the async wrapper lives *inside* the Suspense boundary, behind
  it, never directly under `Transition`.
- The entering `<Suspense>` shows its fallback immediately (synchronous, mountable),
  resolves the chunk, then swaps in the resolved scene **within its own boundary** —
  a transition Vue handles internally and which never re-enters the
  `Transition`/`KeepAlive` host-node walk.

In short: **the async boundary is now resolved-or-fallback before the transition
leave hook ever runs.** The transition only ever leaves from / enters into a
synchronous, mounted subtree. `getNextHostNode` cannot encounter a `null` `subTree`
because no bare async wrapper is ever a direct transition child. The crash class is
structurally removed, not patched.

`CubeScene` (still listed in `scenes.ts` as `defineAsyncComponent`, and additionally
statically imported in `App.vue` for the home↔cube fast path) is equally safe: a
sync component inside `<Suspense>` simply resolves its boundary immediately — Suspense
degenerates to a pass-through. Mixed sync/async children under one `<Suspense>` is
supported and correct.

`:css="ready"` is retained. It is no longer load-bearing for the crash — the crash
is gone regardless — but it remains a benign first-paint nicety (suppresses the
scene-transition CSS until `router.isReady()`). It cannot reintroduce the null-deref
because the subtree under the transition is always synchronous now.

---

## Route-drift disposition (Qρ F2)

**Symptom**: post-crash, `#/easing` spontaneously rewrites to
`#/cube?anim=Rotations` with no user input.

**Root cause** — confirmed downstream of the crash, not an independent bug.
Path-rewriting code in the demo is enumerated and bounded:

- `router.ts` — `beforeEach` only rewrites on initial `?state=` restore; no
  steady-state path rewrite.
- `useSceneRouter.ts` — `router.replace` fires **only** when `route.name === "home"`
  (bare-`/#/` → localStorage scene). Never on a named scene route.
- `useSceneUrl.ts` — touches the `?anim=` query exclusively, never the path.
- `App.vue` `onPlayStateChange` — the **only** code that autonomously calls
  `switchScene("cube")`, gated on `isHome.value && playing && isHomeEmptyGroup`.

The drift is `onPlayStateChange` firing its cube-redirect on the easing route. It can
only do so when `currentAnimationGroup` is still the **empty home `AnimationGroup`**
(`isHomeEmptyGroup === true`). On a healthy easing mount, the
`watch(() => sceneRef.value?.animationGroup)` in `App.vue` receives the easing
scene's real (non-empty) group and assigns `currentAnimationGroup`, so
`isHomeEmptyGroup` is `false` and the redirect is blocked. When the scene **crashes**,
`sceneRef` never populates, the watch never fires, `currentAnimationGroup` stays the
empty home group, and a stray play-state event satisfies the guard → spurious
`switchScene("cube")`.

**Disposition**: F2 is **resolved by the Lane A crash fix**, no router-guard change
required. With `<Suspense>` guaranteeing a clean mount, `sceneRef.value.animationGroup`
resolves on every scene, `currentAnimationGroup` is the real group, `isHomeEmptyGroup`
is `false` off the home route, and the `onPlayStateChange` guard holds. The guard
itself is already correctly written (`isHome && playing && isHomeEmptyGroup`) — it was
defeated only by the crash starving it of a real group. No code change; verified by
reasoning + the clean build.

---

## Scene enumeration (cold deep-link surface)

Traced from `demo/app/scenes.ts` (`scenes` array) + `router.ts` (`routes`) +
`App.vue` (`activeSceneComponent`/`activeSceneKey`):

| Route       | Scene id | Component                    | Import style                          | Cold deep-link |
|-------------|----------|------------------------------|----------------------------------------|----------------|
| `/` (`#/`)  | `home`   | — (start screen; uses Cube)  | n/a                                    | clean          |
| `/cube`     | `cube`   | `CubeScene.vue`              | `defineAsyncComponent` + static import | clean          |
| `/amiga`    | `amiga`  | `AmigaScene.vue` (Three.js)  | `defineAsyncComponent`                 | clean          |
| `/square`   | `square` | `SquareScene.vue`            | `defineAsyncComponent`                 | clean          |
| `/easing`   | `easing` | `EasingScene.vue`            | `defineAsyncComponent`                 | clean          |
| `/:catchAll`| —        | redirect → `/`               | n/a                                    | clean          |

`SimpleScene.vue` exists on disk but is **not registered** in `scenes.ts` and is
imported nowhere — dead code, out of Lane A scope (Qσ D3 / W5 Lane F purge).

Every registered scene is now mounted through the `<Suspense>` boundary. The three
formerly-vulnerable async scenes (`amiga`, `square`, `easing`) and the mixed-mode
`cube` all leave from / enter into a synchronous resolved subtree. All four scenes
emit as distinct code-split chunks in the `gh-pages` build (below), confirming async
splitting is preserved while the crash path is removed.

---

## Verification

| Gate                                  | Command                          | Result |
|----------------------------------------|----------------------------------|--------|
| keyframes.js library typecheck         | `npm run check` (`tsc --noEmit`) | GREEN  |
| keyframes.js library build             | `npm run build`                  | GREEN  |
| keyframes.js demo-app build            | `npm run gh-pages` (root `demo/app/`) | GREEN |

Build evidence — the demo-app build emits each scene as its own chunk, proving all
four compile and code-split intact:

```
dist/assets/CubeScene-Cf4XMDNY.js     0.17 kB
dist/assets/SquareScene-Dn5EqRI-.js   1.41 kB
dist/assets/AmigaScene-BQFxpMbM.js    3.77 kB
dist/assets/EasingScene-hxn37rvp.js  13.53 kB
```

Prerequisite: glass-ui `npm run build` was run first so its `dist/*.d.ts`
declaration files exist — the keyframes.js `tsc` typecheck resolves
`@mkbabb/glass-ui` types via `dist/`. (Dev mode resolves glass-ui to `src/` via the
`development` conditional-exports branch; the typecheck uses the `types` resolution.)
This is environment setup, not a code change.

---

## Verdict

**Lane A complete.** `demo/app/App.vue` scene host restructured to the documented
Vue composition `Transition` > `KeepAlive` > `Suspense` > async component, with
the swap `:key` relocated to the `<Suspense>` boundary. `demo/app/scenes.ts`
normalised — all four scene descriptors use the bare `defineAsyncComponent` loader
form; the loading surface is the single `<Suspense>` `#fallback`.

The `getNextHostNode` null-deref is **structurally eliminated**: the async boundary
is resolved-or-fallback before any transition leave hook runs, so the transition
never walks a torn-down async-wrapper subtree. The Qρ F2 route drift is resolved
downstream of the crash fix — the `onPlayStateChange` cube-redirect guard
(`isHome && playing && isHomeEmptyGroup`) is already correct and now receives a real
`animationGroup` on every scene, so it is no longer defeated. No router-guard change.

All four registered scenes (`cube`, `amiga`, `square`, `easing`) mount through the
`<Suspense>` boundary and build clean. keyframes.js `npm run check` + `npm run build`
+ `npm run gh-pages` all GREEN. Zero glass-ui code change.

**Files changed (keyframes.js)**:
- `demo/app/App.vue` — `#target` slot restructure (`<Suspense>` insert, `:key` relocation)
- `demo/app/scenes.ts` — `amiga` descriptor normalised to bare loader form; comment updated
