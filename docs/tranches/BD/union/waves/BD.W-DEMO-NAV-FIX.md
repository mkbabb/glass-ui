# BD.W-DEMO-NAV-FIX — the demo-shell route bounce: the corrupted dock-facet map + the direct-URL-wins precedence

**Band 16 (DEMO-CHASSIS) · BUG · depends: none (a self-contained demo-shell repair; reads the manifest + the two shell docks at HEAD). Sibling of W-PAGE-CHASSIS / W-HEADER-SCALE / W-PAGE-BACKGROUND (the shared-chassis demo waves) — but this is a pure BUG fix, not a chassis refactor.**

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build repairs `demo/stories/dock-layer-contexts.ts` (the facet map) + the `railContext` precedence in `demo/layout/BottomDock.vue` + `demo/layout/SidebarDock.vue` + authors `scripts/proof-demo-nav.mjs` + `tests-visual/demo-nav.spec.ts`; zero `src/` library paint (the bug is wholly in the `demo/` shell). User-gated. Every file:line below is grep-confirmed at HEAD.

## The defect / the ask (live-observed, code-grounded)

A **direct-URL story navigation BOUNCES.** Loading a story route directly (a deep link, a page reload, an audit agent's `goto`) settles on the requested page for ~400ms–1s, then **redirects away** — `/feedback/*` → `/data/*`, `/motion/springs` → `/motion/handmark`, sometimes back to `:5199` root. Reproduced by EVERY page-audit agent across batches 2/3/4 (`docs/tranches/BD/viz/page-audit/{forms,containers,navigation,dock,data,feedback,motion}.md`) — the audit fleet had to fall back to isolated browser contexts + immediate-`evaluate` capture or `router.push` to work around it. The user hits it too: direct-linking a story re-navigates away, and a reload abandons the current page. It is a real, load-bearing demo-shell bug.

### ROOT CAUSE — the corrupted `motion:` facet map feeds the precedence inversion (`motion.md` §"MOTION-SPECIFIC NEW BUG")

The page-audit fleet found the root in two coupled places:

**(A) The dock-facet map is corrupted — `demo/stories/dock-layer-contexts.ts:299-326` (`CONTEXT_LAYER_MAP.motion`).** Grep-confirmed at HEAD:

- **A DEAD storyId (`:316`):** `{ storyId: "underline", label: "Underline" }` inside the `text-fx` facet. There is **no `motion/underline` route** — `GlassUnderline` was RETIRED onto `<HandMark shape="underline">` per DEC-8 (CLAUDE.md §HandMark), so `/motion/underline` is a **404** (the catch-all `not-found` egg, `router.ts:62`). The `text-fx` facet's `entries[0]` (`countup`) is live, but the facet carries a dead member, and a future first-entry resolution off this facet can target the 404.
- **INCOMPLETE — 6 of the 12 motion stories are ABSENT from the map.** Motion ships **12** stories (`manifest.ts:1046-1131`: `springs · curve-gallery · scroll-vt · scroll-system · scroll-choreography · countup · reveal · deck · typewriter · handmark · animated-digit · split-chars`); the facet map enumerates only **6 live** ones (`springs · curve-gallery · countup · typewriter · animated-digit · reveal`) plus the dead `underline`. The **6 missing**: `scroll-vt · scroll-system · scroll-choreography · deck · split-chars · handmark`.

**(B) The precedence inversion — the stale facet echo OVERRIDES the direct URL (`BottomDock.vue:121-148` + `SidebarDock.vue:147-173`, the IDENTICAL `railContext` computed).** When the active story is **not found in any facet** of its category (the 6 missing motion stories — and the same hole exists for every category whose map is incomplete), the `railContext` `get` cannot match `activeStoryId` against any facet's `entries`, so it FALLS BACK to `contextLayers.value[0]?.id` (the FIRST facet — "engines" for motion):

```ts
// BottomDock.vue:122-128 / SidebarDock.vue:148-153 (identical)
get: () => {
    const here = contextLayers.value.find((l) =>
        l.entries.some((e) => e.storyId === activeStoryId.value),
    );
    return (here ?? contextLayers.value[0])?.id;   // ← the stale fallback
},
```

This fallback id has **nothing to do with the route the user loaded** — it is the page-context's *default* facet, derived from the (incomplete) map, not from the URL. The `set` then navigates on any `id` that differs from `railContext.value` (the user-activation discriminator, `:138`/`:164`): `router.push('/${categoryId}/${facet.entries[0].storyId}')`. The directly-observed bounce `/motion/springs → /motion/handmark` is this echo firing — the stale facet-default resolution writes a `selected` id whose `entries[0]` is a DIFFERENT story than the loaded one, the short-circuit fails, and the push redirects the deep-linked page away. **The URL is supposed to be the source of truth on a direct/reload load; here the stale in-app facet state wins.** That is the precedence inversion.

(There is no `localStorage`/`sessionStorage` route store — `router.ts` is a clean manifest-derived map. The "persisted route" the addendum names is this **reactive in-app facet echo**, persisted in the `railContext` computed's fallback, not in storage. The fix is the same: the URL must win.)

## The mechanism — the two-fold fix (repair the map + invert the precedence back)

KISS/DRY. Two arms, both in the `demo/` shell, both single-writer:

### Arm 1 — repair the facet map + make it COMPLETE-BY-CONSTRUCTION

1. **Delete the dead `underline` entry** (`dock-layer-contexts.ts:316`) — clean break, no alias (DEC-8 retired the route).
2. **Add the 6 missing motion stories** to the `motion:` map so every motion story resolves to a facet: fold `scroll-vt · scroll-system · scroll-choreography` into a new `scroll` facet (or the existing topology — author's choice, but every storyId must land), `deck` + `split-chars` into the `text-fx`/`entrance` facets where they read, and `handmark` into `text-fx` (its DEC-8 home). The EXACT facet topology is the author's design call; the BINDING requirement is that **every one of the 12 motion storyIds appears in the map and resolves to a real route.**
3. **Repair every OTHER category's map to the same completeness bar** (the gate enumerates ALL 11 categories — motion is the confirmed-corrupt one, but the hole is structural: any incomplete map produces the same fallback). The gate makes incompleteness IMPOSSIBLE to re-introduce: a manifest story missing from its category's facet map REDs the build.

The map's own header comment already states the discipline ("adding a story is a row here, mirroring the story manifest's own 'adding a story is a row'") — this wave makes that discipline GATE-ENFORCED instead of prose.

### Arm 2 — the direct-URL-wins precedence (the URL is the source of truth on a non-interactive load)

The `railContext` `get`/`set` is the precedence seam. The fix preserves the W-SHELL-HOLD user-activation discriminator (a real chip click still navigates) but **removes the inverted echo for an unmapped story**:

- **The `get` no longer fabricates a navigable default.** When `activeStoryId` is not found in any facet, `get` returns `undefined` (or a non-navigable sentinel that the `set` short-circuits) instead of `contextLayers.value[0]?.id`. A facet chip strip with no active match shows NO active facet — it does NOT silently adopt the first facet's identity and echo it into a navigation. (With Arm 1 the map is complete, so this fallback path becomes unreachable for the mapped categories — but the `get`-returns-undefined guard is the structural floor that keeps a future incomplete row from re-inverting the precedence; the two arms are belt-and-suspenders.)
- **The `set` is GUARDED against a non-interactive write that would leave the current route.** The existing equality short-circuit (`id === railContext.value`) is KEPT, plus the `set` navigates ONLY when the target facet's `entries[0].storyId` resolves to a real route AND is NOT the active story (no self-redirect, no 404-push). A `set` whose resolved target is the page you are already on, or a dead storyId, is a no-op — never a `router.push`.
- **The URL is read as the source of truth on load.** On a direct/reload load the route's own `storyId` (`route.meta.storyId`) is authoritative; the facet strip REFLECTS it (highlights the matching facet if one exists, else shows none) and NEVER pushes to change it. The only `router.push` is a genuine user chip activation (the pointer `select()` in `DockStack.vue:159`).

The fix lands IDENTICALLY in both shell docks (`BottomDock.vue` + `SidebarDock.vue` carry byte-identical `railContext` computeds) — ONE precedence rule, two co-edited sites (or, KISS, the `railContext` computed factored into a tiny shared `demo/composables/useRailContext.ts` seam so the two never drift again; author's call — the gate asserts both docks carry the fixed shape).

## The gate — `proof:demo-nav` (born-RED → GREEN)

`scripts/proof-demo-nav.mjs`, registered in `package.json` (`"proof:demo-nav": "node scripts/proof-demo-nav.mjs"`) + `scripts/gates.mjs` `GATES` (`{ id: "proof:demo-nav", cmd: "proof:demo-nav", tags: [...] }`). **The gate is REAL — it RESOLVES routes against the live `CATEGORIES` array and the live router, and it LOADS a real demo route and asserts the URL persists. It is NEVER a presence-regex over the map source.** Two arms:

### The SOURCE arm (`tags: ["local","ci"]`) — map soundness + completeness, resolved-not-grepped

The gate **imports the real `CONTEXT_LAYER_MAP` + `CATEGORIES`** (a tiny esbuild/tsx transpile-and-import of `demo/stories/dock-layer-contexts.ts` + `demo/stories/manifest.ts`, the `proof:*` import-the-real-module precedent — `proof:lineage-probe` imports the real `constellation.mjs`, never a regex). All clauses are RESOLUTION facts over the live data structures:

- **N1 — every facet `storyId` RESOLVES to a real manifest route (no 404 / no dead entry).** For every category key `k` in `CONTEXT_LAYER_MAP`, for every facet, for every `entries[].storyId`, assert `findStory(k, storyId)` returns a real `{category, story}` (the live manifest helper, `manifest.ts:1221`). The dead `motion/underline` (and any other dead entry) REDs this clause — born-RED at HEAD (`underline` resolves to `undefined`). This is the anti-404 floor: a facet can never carry a storyId the router would 404 on.
- **N2 — every facet category key is a real category, and the map is COMPLETE vs the manifest.** Assert (a) every key in `CONTEXT_LAYER_MAP` is a real `CATEGORIES[].id`; (b) for every category, EVERY one of its manifest stories (`category.stories[].id`) appears in `CONTEXT_LAYER_MAP[category.id]`'s flattened `entries[].storyId` set. A manifest story absent from its category's facet map REDs (born-RED at HEAD: motion is missing 6 of 12). This is the completeness floor — it makes the precedence-inverting fallback path UNREACHABLE for every mapped category by construction.
- **N3 — `entries[0]` of every facet is navigable (the first-entry resolution is safe).** For every facet, `findStory(categoryKey, entries[0].storyId)` resolves (no facet whose default jump-target is a 404). A facet with an empty `entries` array OR a dead `entries[0]` REDs.
- **N4 — the precedence guard is wired in BOTH shell docks (the get/set shape).** A SOURCE assert over `BottomDock.vue` + `SidebarDock.vue` (or the factored `useRailContext.ts`): the `get` does NOT fabricate a navigable `contextLayers.value[0]?.id` fallback for an unmatched story (it returns undefined/sentinel), AND the `set` navigates ONLY on a resolved-real, not-self, target. This is asserted as the absence of the inverted-fallback expression `?? ... [0]) ?.id` in the `get` AND the presence of the resolve-and-not-self guard in the `set` — confirmed on the parsed SFC `<script>` body, NOT a loose grep (the self-test plants the inverted fallback and asserts it REDs).

### The LIVE/RUNTIME arm (`tags: ["local"]`) — the direct-URL-does-NOT-redirect proof (the binding bounce-kill)

The gate's load-bearing truth: **a direct-URL load does NOT redirect.** Served-app-sentinel against the `:5199` demo origin (`GLASS_UI_DEMO_URL ?? "http://…:5199"`, the live-gate default; fail-CLOSED if the demo is not served — never a false-GREEN). For a representative set of routes spanning the previously-broken cases — **at minimum** `/motion/handmark`, `/motion/scroll-vt`, `/motion/split-chars` (the formerly-missing motion stories), `/feedback/toaster`, `/data/metric-cell` (the cross-category bounce cases the audit observed) — the gate:

1. `goto(route)` (a real headless Chromium nav).
2. Waits the **settle window** (≥1200ms — strictly past the ~400ms–1s observed bounce horizon; the gate reads the actual observed-bounce upper bound from the audit, not an arbitrary number).
3. Asserts `page.url()` STILL ENDS WITH the requested route path — **no redirect occurred**. A bounce (the URL changed to a different story/category/root within the settle window) REDs.
4. Asserts the rendered `route.meta.storyId` (read via `evaluate`) MATCHES the requested storyId (the page that's actually painted is the one asked for — catches a silent in-app swap that keeps the URL but re-renders a different story).

Born-RED on the pre-fix tree (the deep-link bounces — `page.url()` after settle ≠ the requested route, and/or the painted storyId desyncs). GREEN only after Arm 1 + Arm 2 land. The LIVE arm is `local`-tagged (a real browser + demo); the SOURCE arm is the `ci` backstop (the map soundness/completeness is device-free, so CI proves the map can never re-corrupt; the local close proves the bounce is dead — the `proof:live-verified-ledger` SOURCE-on-CI / PAINT-on-local split).

### Self-test (`--self-test`, born-RED→GREEN, ≥5 bites)

Each plants a synthetic corruption and asserts the gate FLAGS it; the repaired tree MUST be clean:

1. A facet entry with a `storyId` that resolves to no route → **N1 REDs** (the dead-entry bite — the synthetic `underline`-class).
2. A category whose facet map omits one of its manifest stories → **N2 REDs** (the incompleteness bite — the synthetic missing-6 class).
3. A facet whose `entries[0]` is dead/empty → **N3 REDs**.
4. A `railContext` `get` re-introducing the inverted `?? contextLayers.value[0])?.id` navigable fallback → **N4 REDs** (the precedence-inversion bite).
5. A LIVE-arm route that redirects within the settle window (a synthetic stubbed bounce) → the runtime arm REDs (the bounce-kill bite — proving the runtime assertion actually catches a redirect, not a vacuous pass).

**What REDs on the pre-fix tree:** N1 (the dead `motion/underline`), N2 (motion missing 6 of 12 — and any other incomplete category), N4 (both docks carry the inverted fallback), and the LIVE arm (the deep-link bounce). Born-RED by construction; GREEN only after the map is repaired-and-complete and the precedence is inverted back so the URL wins.

## The binding π — `tests-visual/demo-nav.spec.ts`

NET-NEW, auto-enrolled in the visual-π runner (the non-private glob, `pi-runner-manifest.mjs`). The painted-truth readback that the bounce is DEAD and the URL is authoritative:

- **Surface — the demo shell at `:5199`**, both shell-dock orientations (BottomDock + SidebarDock).
- **Measured assertions:** (a) `goto('/motion/handmark')` (a formerly-missing, formerly-bouncing route) → after a ≥1200ms settle, `page.url()` ends with `/motion/handmark` AND the painted page is handmark (the hand-mark SVG marks render — a real readback, not a URL-only check); (b) the same for `/motion/scroll-vt` and `/feedback/toaster` (the cross-category case); (c) a RELOAD on a deep route holds the route (`page.reload()` → URL unchanged, the same story painted); (d) the facet strip on a mapped story HIGHLIGHTS the matching facet (the URL→facet reflection) and a story whose facet match is absent shows NO spuriously-active facet (no fabricated default); (e) a GENUINE user chip activation STILL navigates (click a facet chip → the URL changes to that facet's `entries[0]` — the W-SHELL-HOLD user-activation path is preserved, not broken by the fix). Both modes. Born-RED on HEAD (the deep links bounce; the facet strip adopts a fabricated default). NO source-green close.

## The gestalt row

**No `proof:ba-gestalt` row of its own.** This is a NAVIGATION-correctness BUG fix in the demo shell — it changes ZERO library paint (BD inv: the gestalt bar binds VISUAL src/ waves; this is a demo-shell route/data repair). The visual confirmation is the π above (the deep-linked page paints + holds); the gestalt rosters that capture motion/feedback surfaces (W-REFLECT) are now CAPTURABLE without the isolated-context workaround the audit fleet needed — this fix is the PREREQUISITE that lets the page-audit/gestalt captures land on the real route instead of bouncing away (a process unblock recorded in the wave, not a gestalt verdict owned here).

## Fences

- **Zero `src/` paint.** The bug is wholly in `demo/` (the facet map + the two shell docks). The library's `<DockStack>`/`<GlassDock>`/`useContextualDockLayers` are byte-untouched — `useContextualDockLayers` is correct (it reads the map; the map was the corruption). No library re-architecture.
- **No-legacy / clean break.** The dead `underline` entry is DELETED, not aliased (DEC-8 is the retirement; no `underline → handmark` redirect-alias smuggled in).
- **The URL is the source of truth on a non-interactive load (the precept).** A direct/reload load NEVER triggers an in-app navigation away from the loaded route; the only navigation is a genuine user activation. This is the W-SHELL-HOLD discipline, restored — the page must HOLD.
- **Completeness-by-construction, not by vigilance.** The N2 manifest-completeness clause makes the facet map IMPOSSIBLE to leave incomplete — a new manifest story missing from its facet map REDs the build. The map's prose discipline ("adding a story is a row") becomes machine-enforced; a future agent cannot silently re-corrupt it.
- **DRY / single-writer.** The precedence fix lands IDENTICALLY in both shell docks (or via the factored `useRailContext.ts` seam) — the two `railContext` computeds never drift again.
- **Real gate, not presence.** `proof:demo-nav` RESOLVES every storyId against the live manifest router AND loads a real route to prove no-redirect — never a regex over the map text (the self-test's planted-corruption bites prove the resolution + the runtime no-redirect assertions actually bite).

## Disposition links

Closes **W-DEMO-NAV-FIX** (the addendum roster's "the demo-shell route bug" — `ADDENDUM-DEMO-CHASSIS.md` §"Page-audit fleet batch 2" + §"batch 4 ROOT CAUSE FOUND"; reproduced by every page-audit agent across batches 2/3/4). Root-caused by `motion.md` §"MOTION-SPECIFIC NEW BUG" (the corrupted `motion:` facet map at `dock-layer-contexts.ts:316,299`). **Unblocks the page-audit/gestalt capture fleet** (the audit agents' isolated-context workaround is no longer needed — direct `goto` to a story route holds). Sibling of the shared-chassis demo waves (W-PAGE-CHASSIS / W-HEADER-SCALE / W-PAGE-BACKGROUND), but DISTINCT — those are chassis refactors; this is a pure navigation BUG with a runtime-proving gate. The `useContextualDockLayers` seam (AZ.W-DOCK-CONTEXT) is the consumed-correct facility; this repairs the DATA it reads + the precedence the consuming docks apply.
