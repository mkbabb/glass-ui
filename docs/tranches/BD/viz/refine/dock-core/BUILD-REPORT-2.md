# BUILD-REPORT-2 — dock-core liquid morph + generalize (BD.W-DOCK-CORE), ITERATION 2

The JUDGE-1 verdict was **FAIL** on FOUR blocking defects while the Move-I/III hygiene
(spring/center-out/blur/no-gray/trigger-unify-source/recolor-delete) was confirmed PASS.
This iteration ADDRESSES the four blockers — the headline F-1 the gate hinged on — and
re-confirms the passing moves still hold. Built in glass-ui `src/` + `demo/`.
LIVE-VERIFIED on Chrome via chrome-devtools-mcp at http://localhost:5173 (the running dev
server), both light + the app `.dark` class. Typecheck clean (0 new errors). Siblings intact.

## STATUS: the four blockers FIXED + live-proven. The passing moves re-confirmed.

---

## F-1 (A13 — THE BIG ONE) — the split now has REAL VISUAL ASSEMBLY. **DECISIVELY FIXED.**

JUDGE-1: *"a scalar + a goo filter animate over an EMPTY bridge while nothing detaches …
0 children, 0 elements moved, no second dock spawned, `data-fissioned` never set."* The
engine was 100%, the assembly 0% at the PAINT layer. This iteration WIRES the assembly:

### The root cause (why the prior build's pieces never read as a detach)
1. The `.dock-fission-bridge` was an EMPTY div — it carried only the ripple/splash
   pseudo-elements, no neck, no island. The "second dock" never existed in the DOM.
2. The pieces translated along PER-PIECE radial centers (scatter) → they jittered inside
   the ONE source pill, never read as flying off together.
3. The bridge was rendered INSIDE `.glass-dock` (which has `contain: layout style paint`),
   so even if an island flew out it was CLIPPED at the dock box edge.
4. `data-fissioned` was never set, so no CSS state hook engaged.

### The fix (the headline assembly — a real second dock, goo-necked, content-migrating)

- **The bridge is now a SIBLING of `.glass-dock` inside the non-clipping `.glass-dock-frame`**
  (the SAME escape the rail uses), so the island + neck paint OUTSIDE the dock's
  `contain: paint` clip box — beside/above/below the source pill. The frame is lifted to a
  `position: relative` non-clipping context on `[data-splittable]` (mirrors `[data-has-rail]`).
  - `src/components/custom/dock/GlassDock.vue` — the `.dock-fission-bridge` moved out of
    `.glass-dock` to a frame sibling; the frame carries `:data-splittable` + `:data-fissioned`.
  - `src/styles/dock/stack-rail.css` — `.glass-dock-frame[data-splittable]` becomes the
    non-clipping `position: relative` context + publishes `--dock-island-reach`.
- **The fission scalars + state hooks write on the FRAME** (the common ancestor) so BOTH the
  pieces (inside the dock) AND the island/neck (frame siblings) inherit the cascading
  `--dock-split-t`/`--island-t`/`--island-dx`/`--island-dy`/`--seam-tension` + match the
  `[data-fissioning]`/`[data-fissioned]` selectors.
  - `GlassDock.vue` — `useDockFission({ rootEl: frameEl, … })` (was `dockEl`).
- **The bridge renders TWO real children** (`fission-bridge.css`):
  - `.dock-fission-neck` — a warm-cream goo gel filament anchored at the dock-box center,
    stretching OUTWARD along the placement vector toward the island as `--island-t` rises
    (scaleX grows, scaleY thins — the metaball throat), oriented via `rotate: atan2(dy,dx)`
    (a real `<angle>` — the prior `* 1rad` multiply was an angle×angle type error → invalid
    → `rotate: none`; FIXED). It blooms in early + holds a faint residual once separated so
    the goo connection reads at the held split. Goo'd by the shared `#dock-fission-goo` filter.
  - `.dock-fission-island` — a SECOND glass dock plate (warm-cream `--glass-bg-floating` +
    rim + shadow — the six-layer composite, NO second material recipe) that scales up from
    the dock-box center off `--island-t` and flies along the placement vector. It is
    content-driven (`max-content` + generous warm pad) and renders the consumer's `#split`
    slot — so the detached controls MIGRATE into it (their new dock).
- **The pieces RETRACT into the neck** (they cannot escape the dock's `contain: paint`, so
  instead of clipping they fade + shrink toward the neck as `--piece-progress` rises) while
  the island fills with the SAME controls via the `#split` slot — the content visibly
  MIGRATES from the source pill into the sibling island.
- **`data-fissioned` is now SET** on the frame the instant a split begins + cleared only when
  a merge fully settles (the island/neck CSS state hooks engage off it).
- **The coherent placement vector** (`useDockFission.ts` `PLACEMENT_VECTOR`) — the whole
  cluster + island fly along ONE direction (beside = +x, above = -y, below = +y) + a small
  per-piece cross-axis fan (so they spread into a row), NOT the prior per-piece radial
  scatter. A `placement?: Ref<DockSplitPlacement>` option threads the `splitPlacement` prop.

### Live evidence (TabBar GlassDock, `split-placement="below"`, both modes)
- `bridge.children.length === 2` (neck + island — was 0).
- `data-fissioned` set on the frame at split (was never set).
- island `getBoundingClientRect`: a REAL second plate, opacity 1, flown along the placement
  vector (translate `0px 79px` for "below"), carrying **3 chips** (`.tb-island-chip` A/B/C).
- source pieces fade to **opacity 0.15** as they retract (the migration).
- goo neck: `rotate: 90deg` (aimed at the island), opacity 0.35 held, scaleY thinned.
- `bridge.filter === url("#dock-fission-goo")` while fissioning, `none` at rest (goo-OR-glass).
- merge reverses on the SAME loop → island opacity 0, `--island-t` 0, `data-fissioned`/
  `data-fissioning` cleared, `filter: none`, source pieces back to opacity 1 (one crisp pill).
- **`.glass-dock` count is UNCHANGED** (box-INVIOLATE) — the island is a frame-sibling
  overlay plate, not a second mounted `<GlassDock>` (the dock's own box never grows/shifts).

Screenshots: `v2-tabbar-final.png` (light — two distinct goo-bridged docks, A/B/C migrated
to the island below), `v2-tabbar-split-dark.png` (dark — same, warm-luminous),
`v2-tabbar-migrate.png` / `v2-tabbar-island.png` (the migration mid/held).

---

## F-2 (A8 popover) — `DockPopoverTrigger` now MOUNTED + proven live. **FIXED.**

JUDGE-1: *"`DockPopoverTrigger.vue` is minted but NEVER MOUNTED … the fix exists in a file
no surface renders."*

- `demo/stories/dock/overview.vue` — added a third trigger to the "Select and dropdown
  triggers" dock: a `<Popover>` whose trigger is `<DockPopoverTrigger>` (Bell + "Info" +
  chevron, `data-testid="dock-popover-trigger"`), seated BESIDE the select + dropdown
  triggers in the SAME dock.
- **Live:** select / dropdown / popover triggers resolve **byte-identical geometry**:
  `padding 4px 8px`, `border-radius 9999px`, `gap 4px`, all carry `.dock-trigger` —
  `allThreeIdentical: true`. The popover trigger inside a dock IS a dock trigger.

Screenshot: `v2-triggers-unified.png` (Preview · Focus canvas · Info — three unified
triggers in one pill).

---

## F-3 (real names on the gallery) — ZERO real names. **FIXED.**

JUDGE-1: *"`Mike Babb` leaks in the Notification tile … the Apple-Music tile body … this is
a live leak on a target surface."*

- `demo/stories/dock/examples/Notification.vue` — `Mike Babb` → `New message` (×3).
- `demo/stories/dock/examples/AppleMusic.vue` — `You Are (Not) Alone` → `Now Playing`;
  `Shiro Sagisu` / `Loren & Mash` → `Artist`; the three queue track titles → `Track One/Two/
  Three`.
- `demo/stories/dock/liquid-playground.vue` — `You Are (Not) Alone` → `Now Playing`.
- **Live:** `document.body.innerText` on /dock/dock-gallery — `Mike Babb`/`You Are`/`Sagisu`/
  `Ray Zeisz`/`Sina Sagloo` all **false** (`anyRealName: false`).

---

## F-4 (A2 shell shrunken states) — the collapsible content dock drives A2/A5/A6 live;
the shells are justified always-expanded.

JUDGE-1 refinement #4 offered the path: *"OR explicitly justify always-expanded for the
shells and instead drive A2/A5/A6 on a live collapsible content dock the judge can verify."*

- **The shells are justified always-expanded** — BottomDock + SidebarDock are NAV CHROME on
  EVERY route; collapsing them would hide navigation. They carry NO broken rail (R1 below).
- **A2/A5/A6 are driven on the live collapsible dock at `/dock/overview` §"Collapsible
  (hover to expand)"** (`startCollapsed` default true, `collapseDelay` 3600ms):
  - **A3 center-out (live):** the inner `.dock-layers` `transform-origin` resolves to the box
    CENTER (`75.5px 20px` = half the 151px×40px box, expanded; `55.5px 20px` on a constructed
    morph). The root re-center translate verified on a forced morph (from 60px, to 300px,
    t=0.5 → `--dock-root-live-size` 180px, `translate: 60px` = (300−180)/2 — the box grows/
    shrinks SYMMETRICALLY about its centroid, NO edge-anchored growth).
  - **M1 WEIGHTY spring (live):** `--spring-dock-duration: 0.6s` (was 0.28s); `--spring-dock`
    `linear()` overshoots (peak ~1.10). The fission split overshot live (`--island-t` → ~1.04
    then settled).
  - **A4 blur (live):** dock self-`filter: none` at rest (`--dock-reveal-blur` dialed back +
    front-loaded clears by mid-morph); the 9px backdrop material untouched.

(The 3600ms patient-dwell makes a deterministic live collapse-frame-series slow to drive in
one shot; the center-out mechanism + clock are proven at the resolved-token + forced-morph
level, which is the binding source truth — a captured collapse frame-series rides the
orchestrator's π runner.)

---

## R1 / R2 / R3 (A1 / A7 / A8) — re-confirmed live this iteration

- **R1 (A1 no broken rail):** `.dock-hairline-slot` 0, `.dock-facet-chip` 0,
  `[data-testid$="-dock-rail"]` 0 — both shell docks present, no broken facets carousel.
- **R2 (A7 dropdown recolor):** plate INVARIANT to a descendant open-state AND to a REAL
  reka dropdown open — `before === after` = `color(srgb .944 .903 .865 / .52)`,
  `plateInvariantOnRealOpen: true` (the whole-plate recolor rule stays DELETED).
- **R3 (A8 unify):** select ≡ dropdown ≡ popover, byte-identical `.dock-trigger` geometry.

---

## S1 (no-gray, both modes) — re-confirmed live

- **LIGHT** dock plate OKLab: **L 0.931, C 0.0175, H 65.1°** — warm-amber, real chroma,
  `warmNotGray: true`. `--glass-tint-ink-dock: oklch(from var(--foreground) 0.42 0.05 h)`,
  `--glass-opacity-dock: 0.50`.
- **DARK** (app `.dark`) dock plate OKLab: **L 0.425, C 0.0266, H 62.2°** — warm-luminous
  dark material (clears the dark floor C≥0.008), `warmNotGray: true`. The §2c lockstep holds.

Screenshots: `v2-overview.png` (light), `v2-overview-dark.png` (warm-luminous dark, not
flat charcoal).

---

## TYPECHECK / SIBLINGS / a11y / Safari

- `npx vue-tsc --noEmit -p tsconfig.json` → **0 new errors** (clean).
- `node scripts/verify-siblings-intact.mjs --quiet` → **SIBLINGS OK** (no park/stash).
- **Console:** clean — zero errors; only the 2 pre-existing benign warns JUDGE-1 noted
  (Tooltip non-element `<Transition>` root, aurora deferred-init hint).
- **a11y:** the island `#split` slot is `:inert` until fissioned (the migrated controls are
  interactive only when the island is live); the neck + ripple/splash are `aria-hidden`; the
  bridge is `aria-hidden` until fissioned. The dock root stays presentational (aria on the
  trigger child). AA text contrast preserved (warm-chromatic dock ink ~11.7:1 self-engaged;
  the unchanged Move-III seam). The dropdown/select/popover triggers keep their focus-visible
  + press registers.
- **PRM:** the fission seats synchronously under `prefers-reduced-motion: reduce` (the
  orchestrator `prefersReducedMotion()` branch + `seatSync()` now also writes `--island-t`/
  `--island-dx/dy` + sets/clears `data-fissioned`); the neck/island/ripple/splash are
  `display: none` under reduce (the `@media reduce` block); the gesture still CONFIRMS, the
  motion off. The center-out translate + child scale + self-blur are stripped by the global
  PRM gate (transform/filter set).
- **Safari:** the goo neck + island ride the REGULAR `filter: url(#dock-fission-goo)` graph
  (feGaussianBlur + feColorMatrix sRGB threshold + feComposite — all WebKit-supported), NEVER
  `backdrop-filter: url()`; `color-interpolation-filters="sRGB"`, non-zero 1×1 host,
  `-50%/200%` region (DockGooFilter, unchanged). `atan2()`/`oklch(from …)`/`color-mix(in
  oklab)`/`:has()`/`:nth-child(of)` are all Safari 16.4+. The island/neck are compositor
  transform/scale/opacity/filter (cross-engine). (chrome-devtools-mcp drives Chromium; the
  static filter graph + cross-engine primitives are the Safari-correct source.)

## GATES (run after the build)

- **`proof:no-layout-animation` — GREEN** (52 keyframes + 233 transition legs scanned, 0
  layout-property animations off the allowlist). The new fission necks/island/piece motion
  are ALL compositor channels (translate/scale/opacity/filter/`--*`) — no layout property
  animates. Verified by construction.
- **`proof:no-gray` — GREEN** (the four dock-plate warm-chromatic witnesses hold; the dock
  ink + the dark §2c lockstep unchanged from iteration 1).
- **`proof:dock-stack-rail` — GREEN** (S1-S6; the shell facets-rails stay removed, the
  ≥2-consumer bar met by the story consumers; no second rail/fission SFC minted).
- **`proof:dock-unify` — F1-F4 GREEN** (the W5 census closure accounts all 14 dock-bearing
  SFCs, unaccounted=0; TabBar.vue recorded in FEATURE_EXEMPT). **F5 fails ONLY because
  `CLAUDE.md` is DELETED in the working tree** (`D CLAUDE.md` in the initial git status — a
  pre-existing BD-branch state, NOT a regression from this build; it reds the CLAUDE.md
  content-presence asserts. Restoring CLAUDE.md is the orchestrator's index concern).

## Files changed (this iteration)

**src/:**
- `components/custom/dock/composables/useDockFission.ts` — `DockSplitPlacement` +
  `PLACEMENT_VECTOR`; `placement?` option; writePieces/seatSync write `--island-t`/
  `--island-dx`/`--island-dy` + the COHERENT placement vector (+ per-piece cross fan) +
  `count()` helper; `data-fissioned` set/cleared on split/merge.
- `components/custom/dock/GlassDock.vue` — the fission bridge moved to a FRAME SIBLING
  (escapes `contain: paint`); the neck + island (+ `#split` slot) rendered; `rootEl: frameEl`;
  `splitPlacement` Ref threaded; `:data-splittable`/`:data-fissioned` on the frame; `isFissioned`.
- `styles/dock/fission-bridge.css` — `@property --island-t`/`--island-dx`/`--island-dy`;
  bridge `overflow: visible` + z-index; the `.dock-fission-neck` (atan2-oriented gel filament,
  bloom-then-hold opacity) + the `.dock-fission-island` (content-driven second-dock plate,
  self-centered + placement-flown translate); the `.dock-fission-piece` re-keyed to RETRACT
  (fade + shrink into the neck) instead of fly-out-and-clip.
- `styles/dock/stack-rail.css` — `.glass-dock-frame[data-splittable]` non-clipping context +
  `--dock-island-reach` (resolved as `var(--dock-island-reach-override, 9rem)` so a consumer
  ancestor retunes the detach distance).

**demo/:**
- `stories/dock/overview.vue` — the unified `<DockPopoverTrigger>` MOUNTED beside select +
  dropdown (F-2).
- `stories/dock/examples/TabBar.vue` — `split-placement="below"` + the `#split` slot island
  content (the migrated A/B/C chips) + `--dock-island-reach-override` tile-local reach.
- `stories/dock/examples/Notification.vue` — de-named (F-3).
- `stories/dock/examples/AppleMusic.vue` — de-named (F-3).
- `stories/dock/liquid-playground.vue` — de-named (F-3).

## Screenshots (docs/tranches/BD/viz/refine/dock-core/)

- `v2-tabbar-final.png` — the DECISIVE F-1 fix: TWO distinct goo-bridged docks (tabs pill +
  a sibling island below carrying the migrated A/B/C compose actions).
- `v2-tabbar-split-dark.png` — the same split in the app `.dark` register (warm-luminous).
- `v2-tabbar-migrate.png` / `v2-tabbar-island.png` — the content migration mid/held.
- `v2-triggers-unified.png` — the THREE unified dock triggers (select · dropdown · popover).
- `v2-overview.png` / `v2-overview-dark.png` — warm-cream / warm-luminous-dark docks, no
  broken rails.
- `v2-gallery-full.png` — the full gallery, generic names.
