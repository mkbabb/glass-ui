# JUDGE-1 — dock-core liquid morph + generalize (BD.W-DOCK-CORE)

VERDICT: **FAIL — meetsBar: false.** The surface/tint/blur/spring hygiene moves (Moves I.3,
III.*) are real and live-verified. But the HEADLINE directive — A13 "GENERALIZE … SPLITTABLE
into ARBITRARY parts … one icon splits OFF, MORPHS+GOOS into another dock beside/above/below"
— is **NOT visually realized**: the split scalar animates invisibly, nothing detaches, no second
dock materializes. The "engine 100% / assembly 0% — wire it" mandate is still ~0% assembled at
the PAINT layer.

Verified live on Chrome via chrome-devtools-mcp at http://localhost:5173 (the running dev server;
the report's :5173 is correct — NOT the :5199 default). Light + dark (app `.dark` class, not the
OS colorScheme — the DevTools `emulate dark` does NOT flip this app).

---

## WHAT PASSES (decisive, live)

| ID | Live evidence |
|---|---|
| **No-gray, both modes** | Dock plate fill OKLab — LIGHT **L 0.931, C 0.0175, H 65.1°**; DARK **L 0.425, C 0.0266, H 62.2°**. Warm-amber (H∈[45,85]), real chroma, no gray. `--glass-tint-ink-dock: oklch(from var(--foreground) 0.42 0.05 h)` resolves live. |
| **A4 blur dial-back** | `--dock-reveal-blur: 1.25px` (was 3px), front-loaded decay `clamp(0,(0.5-expand-t)/0.5,1)` → holds 0 the back half; rest self-blur 0px; 9px backdrop material untouched. Source + token confirmed. |
| **A7 dropdown recolor** | `.glass-dock:has([data-state="open"])` recolor rule DELETED. Live: inject `[data-state=open]` descendant → plate bg `color(srgb .944 .903 .865 / .52)` BEFORE === AFTER. Invariant. |
| **A11 pill padding** | Live padInline **12px** / padBlock **8px**, radius 9999px — generous warm capsule incl. the vertical pill. |
| **A1 broken rail** | Both shell docks: `.dock-hairline-slot` 0, `[data-testid$="-dock-rail"]` 0, `.dock-facet-chip` 0. Rail gone. |
| **M1 weighty spring** | `--spring-dock-duration` **0.6s** (was 0.28s); `--spring-dock` `linear()` overshoots to **1.10262** at 14.2%. The fission split overshot live to **1.10361** then settled. Audacious/inertial register is real. |
| **A3 center-out (source)** | `transform-origin: center center` both axes (layers.css L92/164/176); root re-center `translate: (to-live)/2` (L122-142). Edge-anchor gone. |
| **A10/G3 one-dock+tabs** | TabBar = ONE `<GlassDock>` whose content is a real `<SegmentedTabs variant="pill">` (`role="group"`+aria-pressed — correct, NOT tablist). Old `.tb-dock`/`.tb-sheet` facsimile: 0. Labels `Tab 1-4`/`Action A-C`/`Compose` — generic. |
| **A8 select≡dropdown** | select + dropdown triggers byte-identical: padding `4px 8px`, radius `9999px`, gap `4px`, both `.dock-trigger`. |

---

## WHAT FAILS (blocking)

### F-1 (A13 — THE BIG ONE): the split has NO visual assembly. **DECISIVE FAIL.**
Clicked "Compose" on the TabBar GlassDock (`split-context="search"`). The scalar fired beautifully
— `--dock-split-t` 0 → **1.10361** (overshoot) → 1.0, the goo `filter` swapped `none` → `url(#dock-fission-goo)`.
But at split-PEAK and at the held split state:
- `.dock-fission-bridge` has **0 children** (`<div class="dock-fission-bridge" aria-hidden="true"></div>` — empty).
- **0 elements moved** inside the dock (every `[data-dock-splittable]` piece transform = `none` throughout).
- **No second dock spawned** (`.glass-dock` count stayed 3).
- `data-fissioned` is **never set** on the dock (stays null even at split-t=1).

So: a scalar + a goo filter animate over an EMPTY bridge while nothing detaches. The user's A13 ("one
icon splits OFF, MORPHS+GOOS, into another dock that sits BESIDE/ABOVE/BELOW it — the ios demos")
and "assembly 0% — wire it" is **still ~0% at the visible layer**. Screenshot `judge-tabbar-split-held.png`:
the TabBar pill just shows its action chips inline (★ □ 🔔 + ×) in ONE pill — no separate dock, no goo neck,
no detach. This is the headline defect and it does not move.

### F-2 (A8 popover): `DockPopoverTrigger.vue` is minted but **NEVER MOUNTED**.
`grep` confirms zero demo/story consumers. The live popover-in-dock element (bottom dock) is a plain
`.dock-icon-button` (padding 4px, NO `.dock-trigger`) — it does NOT carry the unified recipe. So the
select/dropdown unify is proven, but the POPOVER arm the user actually complained about ("misaligned +
differs from the dropdown") is unproven live — the fix exists in a file no surface renders.

### F-3 (real names on the explicit verify target): "**Mike Babb**" leaks in the
/dock/dock-gallery Notification tile (and the Apple-Music tile body). The report de-named TabBar +
DynamicIslandCall only. A10's "NO real names" + the dock-gallery being a named verification page →
this is a live leak on a target surface.

### F-4 (A2 shell shrunken states): both shell docks are `always-expanded pinned` and never collapse.
The user's "BOTH docks need proper SHRUNKEN STATES with a LONGER hover window" is unaddressed for the
shells — they have NO shrunken state at all. (The collapse-delay 3600ms + center-out + synced stagger
were verified at SOURCE only — the always-expanded shells + virtualized content docks behind a 3600ms
hysteresis state machine could not be driven to a live collapse to confirm A5/A6 visually.)

---

## CONCRETE REFINEMENTS (to pass next iteration)

1. **WIRE THE SPLIT ASSEMBLY (F-1, the gate).** The `--dock-split-t` scalar + goo filter are not
   enough — they drive nothing visible. The fission must RENDER: on split, the chosen
   `[data-dock-splittable]` piece(s) must (a) get a real compositor `transform: translate(vector)`
   that grows with `--dock-split-t`, (b) the `.dock-fission-bridge` must render a goo NECK element
   (a stretching pill between the source dock edge and the detached piece) so the `#dock-fission-goo`
   filter has actual geometry to merge, and (c) a SECOND dock surface must materialize beside/above/below
   carrying the detached piece. Set `data-fissioned` so CSS state hooks engage. Verify live:
   at split-peak `bridge.children.length ≥ 1` AND ≥1 piece transform ≠ none AND `.glass-dock` count
   increments (or a `.dock-fission-island` appears). Screenshot must show two distinct goo-bridged docks.
2. **MOUNT `DockPopoverTrigger` in a story (F-2)** beside the select/dropdown triggers on /dock/overview
   (or wherever the user's misaligned popover lived), and confirm live it resolves the same `4px 8px /
   9999px / gap 4px / .dock-trigger` geometry as the other two.
3. **De-name the gallery tiles (F-3):** `Mike Babb` → generic ("New message"/"●"), `Sina Sagloo` /
   `You Are (Not) Alone` → generic ("Now Playing"/"Track"). The /dock/dock-gallery page must show ZERO
   real names.
4. **Give the shell docks a real shrunken state (F-4)** OR explicitly justify always-expanded for the
   shells and instead drive A2/A5/A6 on a live collapsible content dock the judge can verify (the
   3600ms delay + center-out stagger need a captured frame-series on a dock that actually collapses,
   not a source read).

---

## LIVE ARTIFACTS
- `judge-overview-light.png` — warm-cream shell docks, no broken rails (light)
- `judge-morph-dark.png` — warm-luminous dark glass docks (dark, not charcoal)
- `judge-tabbar-fissioned.png` / `judge-tabbar-split-held.png` / `judge-split-peak.png` — the split:
  scalar fires, goo filter engages, but NO visible detach / no second dock / empty bridge
- `judge-morph-after-click.png` — morph-showcase (VT crossfade default)

## CONSOLE
Clean — only 2 benign warns (`<Transition>` non-element root on Rail; aurora deferred-init handler hint).
No errors.
