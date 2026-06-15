# BA.W-SHELL-RAIL-RESEAT — the SidebarDock floating-carousel re-seat (the W-REFLECT2 desktop title-collision miss)

**Name**: W-SHELL-RAIL-RESEAT — re-seat the desktop SidebarDock facet-chip carousel off the page-title band
**Opens after**: W-REFLECT2 (the gestalt reflection FAIL on the `dock` + `shell` surfaces) — the in-wave triumvirate successor the reflection loop names. Sequenced BEFORE W-CLOSE (W-CLOSE inherits a GREEN `proof:ba-gestalt`; this wave flips the last two FAILs).
**Agents**: 1 research lane (root-cause + the topology candidates, no fixes) → 1 wave-spec lane (this spec, refined) → 1 redress lane (the build, full discipline) → the W-REFLECT2 RE-REFLECTION of `dock` + `shell`.
**Hard gate**: the `dock` + `shell` reflection records gain a RE-REFLECTION verdict that supersedes the FAIL (the `operativeVerdict()` last-line semantics); the `ba-gestalt-roster.md` flips dock + shell FAIL→PASS on fresh post-redress captures (content-hash-fresh against the re-seated bytes); `node scripts/proof-ba-gestalt.mjs` exits 0 (8/8 PASS); `proof:dock-sections` + `proof:rail3` + `proof:rail-extend` STAY GREEN; typecheck + build green.
**Status**: SPEC (the named successor — born from the W-REFLECT2 FAIL, NOT yet executed)

## The miss (W-REFLECT2, 2026-06-15 — the binding evidence)

The W-REFLECT2 gestalt walk found, on a real whole-page render at `:5199`, that the demo-shell **SidebarDock's W-RAIL3 floating-carousel facet chips** (the "Shell/Panes" · "Text/Selection/Toggles" · "Status/Progress" strip) **overflow into the `<main>` top band and paint OVER the page `<h1>`** on every DESKTOP StoryPage-chrome route:

- `/forms/inputs`: the "Selection"+"Toggles" chips sit ON the title "Inputs" (85px horizontal occlusion).
- `/feedback/notification`: the "Progress" chip sits ON "Notification" (65px).
- `/dock/overview`: the "Panes" chip sits ON "Overview" (43px).
- the mono breadcrumb (`FORMS · INPUTS`) is clipped at the very top of these routes too.

Captures: `docs/tranches/BA/audit/reflect/{dock,shell}-{light,dark}-desktop-full.png` (the title-clip visible) vs `{dock,shell}-{light,dark}-mobile-full.png` (the BottomDock — CLEAN, no collision).

**Mechanism (re-grep at HEAD before any edit):** `.dock-hairline-slot.vertical` (`src/styles/dock/rail-extend.css` `.glass-dock-frame[data-has-rail].vertical .dock-hairline-slot`) anchors at the binding ℱ-home separator seam near the TOP of the fixed 82px vertical rail and overflows right by `--dock-rail-extend-length` into `<main>` (which starts at x=82); the StoryPage chrome `<h1>` + breadcrumb sit in that same top band (`demo/layout/AppShell.vue` `<main>` `pt-6/md:pt-10` → `<h1>` at y≈58). Measured live: slot at `y=78`, `x=[-28,110]`; chips reach `x=[70,228]` over the `<h1>` at `y=58` (`overlapsH1: true`).

**Why it's NOT a token nudge (the structural fence):** W-DOCK-SECTIONS recorded the `inset-block-start:50%` midline seat that AVOIDS this collision as the FORBIDDEN workaround #4 (the 4th rail attempt). The seam-anchored re-seat is the binding topology; relocating the chips off the title band must NOT regress to the midline decoy. W-DOCK-SECTIONS booked the collision as an accepted *breadcrumb* graze — the W-REFLECT2 whole-page render shows a full *title* occlusion, the per-mechanism DELTA understating the gestalt severity (the exact P-1 mechanism-green/page-wrong gap the gestalt gate exists to catch).

## §0 — RE-GROUND (mandatory; re-grep at HEAD)

```
test -f docs/tranches/BA/audit/reflect/dock.md && grep -i 'VERDICT: FAIL' docs/tranches/BA/audit/reflect/dock.md
node scripts/proof-ba-gestalt.mjs; echo "exit=$?"     # 6/8 PASS, dock+shell FAIL pre-wave
sed -n '95,125p' src/styles/dock/rail-extend.css      # the .dock-hairline-slot.vertical seat
grep -n 'demo-sidebar-rail\|pt-6\|pt-10\|<main' demo/layout/AppShell.vue
grep -n 'DockRail\|DockSection\|railItems\|sections' demo/layout/SidebarDock.vue
```

## Scope (the research lane refines; candidate directions, NOT prescriptions)

The redress re-seats the desktop SidebarDock facet carousel so it does NOT collide with the page-title band, WITHOUT the midline workaround #4, keeping the box-inviolate + escape-architecture + ≥2-shell-consumer R-arms GREEN. Candidate directions for the research lane:

1. **(a) Trailing-gutter / below-title seat.** Seat the sidebar facet carousel at the rail's TRAILING gutter (lower on the column, below the page-title band's vertical extent) rather than the top ℱ-home seam — the chips fan beside the rail clear of `<main>`'s top.
2. **(b) Desktop in-pane / BottomDock-only.** On the always-expanded DESKTOP sidebar render the route facets via the in-pane switcher (the `.dock-layer-rail`), keeping the floating carousel on the BottomDock only — re-checking `proof:rail3` R6 (≥2-SHELL-consumer: the BottomDock + the `dock/rail` story would need to hold the carousel census).
3. **(c) Clear the `<main>` title band of the chip reach.** Constrain the sidebar's beyond-dock horizontal overflow (or push the StoryPage chrome's title band clear of the sidebar chip reach) so the chips never reach the `<h1>` — the geometry-clearance arm.

The research lane root-causes + picks the SOTA-correct direction; the wave-spec lane authors the born-RED gate clause + the scope fence; the redress lane builds under full discipline (gates, captures, typecheck, build); then W-REFLECT2 RE-REFLECTS `dock` + `shell` and stamps the superseding PASS.

## File Bounds (the redress lane; the research/spec lanes are read-only)

| File | Access |
|---|---|
| `demo/layout/SidebarDock.vue` | modify (the facet-carousel render condition / seat) |
| `demo/layout/AppShell.vue` | modify (if the `<main>` title-band clearance is the chosen arm) |
| `demo/layout/dock-nav.css` | modify (the demo-shell sidebar rail positioning) |
| `src/styles/dock/rail-extend.css` | modify-IF (only if the library hairline-slot vertical seat is the chosen arm — re-check `proof:rail-extend`/`proof:rail3`) |
| `docs/tranches/BA/audit/reflect/{dock,shell}.md` | the W-REFLECT2 RE-REFLECTION stamp (W-REFLECT2's edit, not the redress lane's) |
| `docs/tranches/BA/audit/reflect/ba-gestalt-roster.md` | the dock+shell FAIL→PASS flip on the re-reflection (W-REFLECT2's edit) |

Do NOT regress to the `inset-block-start:50%` midline workaround #4. Keep `proof:dock-sections` / `proof:rail3` / `proof:rail-extend` GREEN.

## Dependencies

- **Depends on**: W-REFLECT2 (the FAIL that named this successor).
- **Blocks**: W-CLOSE (the `proof:ba-gestalt` gate is now `["release"]` and RED on dock+shell — W-CLOSE's full battery + release.sh cannot pass until this wave flips both to PASS).
