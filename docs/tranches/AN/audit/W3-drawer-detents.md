# AN.W3 — Detented Drawer variant

Closes F.W10.md §Scope item 2 and disposition-ledger gap 3 (detented + non-modal + live-behind Drawer). The variant ships under the existing root-barrel `Drawer` export with new props — no new subpath, no breaking default flip.

## Shape decision — Shape 2 + Shape 3

The spec offered three shapes for the `shouldScaleBackground` default. The landed shape is **Shape 2 + additive Shape 3**:

- **Shape 2 (no break)** — the `shouldScaleBackground` default stays `true` (the iOS scale-down look). A consumer that wants live-behind passes `:should-scale-background="false"` explicitly, OR uses the mode shorthand below. No existing consumer behaviour changes.
- **Shape 3 (additive `mode` shorthand)** — `<Drawer>` gains a `mode?: "modal" | "live-behind"` prop (default `"modal"`). `mode="live-behind"` bundles the three live-behind defaults at once — `modal: false` + `shouldScaleBackground: false` + `snapPoints: [0.12, 0.5, 1]` — so the F-side mobile co-location pattern is a single-prop opt-in rather than three props the consumer has to remember. Every prop the mode sets is still overridable by an explicit prop (the mode only supplies defaults via `props.x ?? modeDefault`).

Shape 1 (flip the default to `false`) was rejected — it breaks any consumer relying on the iOS scale-down default; reserved for a v3.0 break.

### Wiring note (why not `useForwardPropsEmits`)

`Drawer.vue` does NOT route through reka-ui's `useForwardPropsEmits`. That helper reflects only the props the parent vnode actually passed (plus declared defaults), so the values the `mode`-derived `forwarded` computed supplies for keys the consumer did NOT pass (e.g. `modal:false` under `mode="live-behind"`) would be dropped. Binding the `forwarded` computed directly + merging `useEmitAsProps(emits)` is the correct shape for a computed-default wrapper. The probe in §A.props confirms the derived values reach vaul's `DrawerRoot`.

`DrawerContent.vue` gains `showOverlay?: boolean` (default `true`). The live-behind pattern passes `:show-overlay="false"` — `modal:false` already drops `disableOutsidePointerEvents`, but a painted scrim would still visually occlude the live verdict, so the overlay is opt-out at the content level.

## `/drawer` subpath question — CLOSED (root-barrel)

Decision: **keep root-barrel, no new subpath.** The W3 additions are prop/type-only (`mode`, `showOverlay`, the `DrawerMode` type) — they do not introduce a vueuse dependency or a heavy isolated chunk, so the per-package-subpath rationale (substrate isolation) does not apply. `Drawer*` stays on the root barrel where it already lives. The `DrawerMode` type is co-exported from `src/components/ui/drawer/index.ts`.

## Detent grammar approach

vaul-vue owns the snap MATH (the spring transform between snap-points on drag-release, the drag-resistance overshoot, the `data-vaul-*` state attributes, `transition: transform .5s cubic-bezier(.32,.72,0,1)`). glass-ui owns the LOOK, authored in `src/styles/drawer.css` (cascade rung 17, imported by `src/styles/index.css` so `/styles` ships it):

- `.glass-drawer` — the glass sheet surface (replaces the prior inline-Tailwind triplet on `DrawerContent.vue`): fixed/inset/`z-modal`, panel-radius top corners, `1px` border, `--shadow-2xl`. `[data-vaul-snap-points="true"]` fills viewport height + drops the `margin-top` so a snap fraction reads as that fraction OF THE VIEWPORT (vaul translates the sheet down by `innerHeight − fraction·innerHeight`). Direction variants ride the same surface via `[data-vaul-drawer-direction]`.
- `.glass-drawer-handle` + `.glass-drawer-grip` — the rounded peek handle (the drag affordance to cycle peek → half → full). Token-driven width/height/colour/opacity; intensifies on `:active` + hover. PRM suppresses only the grip's affordance animation (never vaul's transform transition).
- `.glass-drawer-snap-rule` — opt-in hairline class a consumer adds to a separator inside the sheet to mark a detent-boundary section break. The detents themselves are positional (owned by vaul); this is the visual rule.

Every visual axis reads a `--drawer-*` custom property (token-first); consumers retune by overriding the rungs, never by editing the file.

## Probe method

The repo carries no `@axe-core` dep and no standalone Playwright config; the Playwright MCP browser was held by a sibling agent for the duration. Per the spec's fallback clause, the runtime probes were driven via a headless Chromium driven by `playwright-core` (installed in a throwaway `/tmp` dir, pointed at the ms-playwright `chrome-headless-shell-1224` binary — zero glass-ui dev deps added) against `npm run dev` (Vite 8, `:5174`) at route `/compositions/drawer-live-behind`. Viewport `420 × 900` (mobile). DOM rects read via `getBoundingClientRect()`; the visible fraction is `(viewportH − max(0, rect.top)) / viewportH`.

## §A — Detent probe (peek 12% / half 50% / full 100%)

Each detent is captured by opening the sheet fresh at that initial detent (the demo sets `activeSnapPoint` BEFORE `open`, so vaul mounts the sheet at the chosen snap). Viewport height 900px.

| Detent | `rect.top` | visible px | visible fraction | expected |
|---|---|---|---|---|
| peek | 792 | 108 | **0.12** | 0.12 |
| half | 450 | 450 | **0.50** | 0.50 |
| full | 0 | 900 | **1.00** | 1.00 |

All three land exactly on the named viewport-height fraction. PASS.

### §A.props — props reach vaul's `DrawerRoot`

Reading the live Vue instance chain from the trigger button (a direct `DrawerRoot` descendant):

```
DrawerRoot  { activeSnapPoint: 0.5, snapPoints: [0.12,0.5,1], modal: false }
Drawer      { activeSnapPoint: 0.5, mode: "live-behind" }
```

The `mode`-derived defaults (`modal:false`, `snapPoints`) and the `v-model:active-snap-point` value reach vaul's `DrawerRoot` correctly. PASS.

### §A.drag — drag-release snap (the binding contract)

A slow (low-velocity) pointer-drag of `.glass-drawer-handle` snaps cleanly across all three detents on release:

```
peek 0.12  →  (drag up)  →  0.50  →  (drag up)  →  1.00
```

A fast drag flies to the terminal detent (1.0) — correct vaul momentum behaviour. The drag-release snap is the binding contract ("three detents spring-snapped on drag release") and it passes at every detent.

### §A.limitation — vaul-vue programmatic re-snap (scope note, NOT a glass-ui bug)

vaul-vue does **not** reliably re-snap an ALREADY-OPEN sheet from an external `activeSnapPoint` write. The §A.props probe proves the new value (0.5) reaches `DrawerRoot`, yet vaul leaves the inline transform at the prior detent's offset (it wrote `translate3d(0, 792px, 0)` — the peek offset — for an `activeSnapPoint` of 0.5). Root cause is in vaul-vue's source: its `activeSnapPoint` controllable (`useVModel(props, "activeSnapPoint", emit, { passive })`, `dist/index.js:648`) shadows external prop writes once the gesture machinery has run; the snap watcher (`dist/index.js:180`) re-fires but the controllable ref's value is stale.

This is NOT in the AN.W3 contract — the contract is drag-release snapping (passes) + `modal:false` + `scaleBackground:false`. The programmatic jump is a demo convenience only. The demo was adjusted to set the OPENING detent (which works — §A above) rather than claim a live external re-snap vaul cannot do. No glass-ui workaround was authored (per the spec's scope-reveal discipline: the limitation is documented, not patched around). If a future consumer needs programmatic detent jumping on an open sheet, that is a vaul-vue upstream fix.

## §B — Focus-trap probe (`modal:false`)

Sheet open at full; focus the verdict CTA behind it:

```
{ ctaFocusable: true, ctaInsideSheet: false, activeId: "verdict-cta" }
```

The page-behind CTA takes focus and becomes `document.activeElement` — focus is NOT captured inside the drawer. The rendered dialog impl is reka-ui's `DialogContentNonModal` + a non-trapping `FocusScope` (confirmed in the instance chain). PASS — no focus trap under `modal:false`.

## §C — `aria-hidden` probe (`modal:false`)

Sheet open; walk the verdict-surface ancestors + body:

```
{ bodyAriaHidden: null, pageAriaHiddenOffenders: [] }
```

No `aria-hidden` reaches the page root or any verdict ancestor. The verdict stays in the a11y tree. PASS.

## §D — `shouldScaleBackground:false` probe

Sheet open; read the page-behind transform:

```
{ wrapperPresent: false,
  wrapperTransform: "(no wrapper el — vaul only adds it under scaleBackground:true)",
  verdictTransform: "none" }
```

The verdict surface stays at `transform: none` (native size, not scaled). Under `scaleBackground:false` vaul does not create/scale the `[data-vaul-drawer-wrapper]`. PASS.

## §E — Modal contrast (proof the mode is the whole difference)

Opening the default `mode="modal"` sheet for contrast:

```
{ pageAriaHiddenPresent: true, sheetAriaModal: ... }
```

Under the default modal sheet the page-behind DOES receive `aria-hidden` (and focus is trapped). The live-behind mode (§B–§D) is the entire difference — the same primitive, flipped by three props the `mode` shorthand bundles. PASS.

## Gate summary

| Gate | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run build` | deferred to AN.W7 integrated 8 GB build (sibling-agent concurrency) |
| Detents peek/half/full at 12/50/100% | PASS (§A) |
| Drag-release snap (binding contract) | PASS (§A.drag) |
| Focus-trap absent under `modal:false` | PASS (§B) |
| No page `aria-hidden` under `modal:false` | PASS (§C) |
| Page-behind `transform: none` under `scaleBackground:false` | PASS (§D) |
| `/drawer` subpath question closed | CLOSED — root-barrel + documented |
| Demo proof mounts + composes live-behind | PASS — `demo/stories/compositions/drawer-live-behind.vue` |

## Files

- `src/components/ui/drawer/Drawer.vue` — `mode` shorthand + `forwarded` computed (computed-default wrapper, not `useForwardPropsEmits`).
- `src/components/ui/drawer/DrawerContent.vue` — `showOverlay` prop; `.glass-drawer` surface + peek handle markup (replaces inline-Tailwind triplet).
- `src/components/ui/drawer/index.ts` — `DrawerMode` type export.
- `src/styles/drawer.css` (new) — detent grammar; imported at `src/styles/index.css` cascade rung 17.
- `demo/stories/compositions/drawer-live-behind.vue` (new) — live-behind proof over a verdict-shape surface + modal contrast.
- `docs/tranches/AN/audit/W3-drawer-detents.md` (this file).
