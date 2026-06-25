# JUDGE-1 — Nav-Dock Fix (W-NAV-DOCK-FIX / W-DOCK-HUB-API)

**Verdict: PASS (meetsBar = true).** Every one of the seven verbatim defects is DECISIVELY fixed and live-verified on `http://localhost:5173` (chrome-devtools-mcp, both light + dark). The fix wires the SHIPPED dock prototypes (no re-fork); the gray-glass optical floor is met (warm-cream luminous in both modes); the box-INVIOLATE rail holds.

---

## Live evidence (computed, on :5173)

### Defect 7 — FOUC ("Pick a story" flash on reload) — FIXED
- Reloaded `/motion/deck` with `ignoreCache:true` + a MutationObserver FOUC sentinel:
  `window.__fouc === 0`, `__foucTexts === []`, `currentTitle === "Deck"`, `hasPickAStoryNow === false`.
- ZERO placeholder frames across the async-resolve window. The page painted directly. The `fade-slide` page-enter is kept.

### Defects 1, 6 — dead category nav (vertical dock) — FIXED
- `totalCategories: 10, deadCount: 0`. Every `.demo-sidebar-item` resolves `pointerEvents:"auto", visibility:"visible", opacity:"1"` from frame 0 (always-expanded; no inert dead-click).
- Click "Forms" on `/motion/deck` → navigated `/forms/inputs`. Live category switch works.

### Defect 2 — flaky nav buttons ("half the time") — FIXED
- prev/next/category buttons are PERSISTENT in the DOM (`aria-label`: Previous story / Next story / Previous category / Next category / Open category navigation), never `v-if`-absent.
- 4 consecutive rapid Next clicks (160ms apart): `["/forms/textarea","/forms/checks","/forms/slider","/forms/number-field","/forms/select"]`, `allChanged: true` — no dropped/raced navigation.
- Boundary honesty: at `/display/buttons` (first story) `prevDisabled:true, aria-disabled:"true", pointer-events:none` — honest four-state, never DOM-absent.

### Defects 3, 6 — the rail is the SHIPPED `<DockStack mode="facets">` — FIXED
- Both shell docks render `data-mode="facets"` `dock-stack` (one `vertical at-end`, one `horizontal at-end`). The real shipped prototype, not a demo-local capsule.
- Facet chips carry DISTINCT per-instance `--glass-accent` (`oklch(0.484 0.163 265.5)` violet-blue, `oklch(0.542 0.089 222.8)` cyan) — the BB.W-GLASS-ACCENT chromatic-rim axis, not a flat fill. Chips have an `is-active` state.
- **Box INVIOLATE:** sidebar dock `59×631` BEFORE and AFTER the hover-fan (`deltaW=0, deltaH=0`). The carousel fans into the gutter, feeds zero size into the dock box.
- Rail chip click on `/display/buttons` ("Surfaces") → navigated `/display/card`. Context switch wired through the ONE registry.

### Defect 5 — bottom-dock category-page tab strip — FIXED
- `.demo-bottom-dock__tabs` present, `display:flex`, `overflow-x:auto`.
- Forms category: **12 tabs** (every Forms page), active "Inputs" with `aria-current="page"`. `scrollWidth 1460 > clientWidth 672` → overflows + scrolls internally. FadingScroll mask live (`--fade-end: 16px`).
- DYNAMIC per category: substrates/aurora page → **11 tabs**, active "Aurora". Tab click `/forms/inputs` → `/forms/textarea` navigates.
- Persistent prev/next coexist in the one row.

### Defect 4 — "none of this works" — FIXED (all of the above demonstrably works)

---

## Gray-glass optical floor — WARM-CREAM LUMINOUS, both modes — PASS

The dock was the only light tier with a bare `blur(9px)` and no `saturate()` companion (the gray-pull). Now:

- **Light** (`/display/card`): `backdrop-filter: blur(9px) saturate(1.4) brightness(1.02)`; plate fill srgb `0.903/0.871/0.840` → OKLab **L 0.906 · C 0.014 · H 67.2°** (warm-amber band [45,85], above the near-white plate chroma floor, no gray cast). Border ink **H 56°** warm.
- **Dark** (aurora): `backdrop-filter: blur(9px) saturate(1.3) brightness(1.12)`; plate → OKLab **L 0.449 · C 0.0178 · H 59.9°** (warm luminous-dark transmissive — the aurora glows through it, not a charcoal void). Screenshot confirms the field reads through the plate; tab labels legible.
- Text readable in both modes; warm-ink rim carves the silhouette.

Screenshots on disk: `judge-1-light-shell.png` (warm-cream shell, all nav surfaces), `judge-1-dark-aurora.png` (luminous-dark transmissive docks over the live field).

---

## Fences / hygiene
- NO console errors (`list_console_messages types:error` → none).
- SHIPPED prototypes wired: `<DockStack mode="facets">`, per-facet `--glass-accent`, `<FadingScroll axis="x">`, `useStoryNavigation` ONE registry. No re-fork, no second store, no Lenis/GSAP.
- Box-INVIOLATE proven (deltaW=deltaH=0). Compositor-only (rail feeds no size; saturate is a backdrop-filter paint op). PRM-carved per the shipped engines.
- BUILD-REPORT claims (FOUC 0, 12 tabs, deltaW=0, OKLab L0.906/H67.2 light + L0.449/H59.9 dark, proof:no-gray 39/39) independently reproduced live.

## Verdict
DECISIVELY meets the directive. The nav dock is the working central hub: category nav live, nav buttons reliable, the real shipped rail in the gutter (box-inviolate), the bottom-dock persistent controls + scrolling category-tab strip, the vertical dock working, the FOUC killed — warm-cream luminous glass in both modes. PASS.
