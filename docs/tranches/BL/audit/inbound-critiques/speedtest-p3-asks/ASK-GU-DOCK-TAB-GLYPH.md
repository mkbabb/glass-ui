# ASK-GU-DOCK-TAB-GLYPH: the dock tab owns its icon gap and glyph size

**From**: speedtest AX pass 3, audit round 1 repair seat (2026-11-12). **To**: glass-ui. **Law**: glass-ui first (no consumer layout on a glass control).

**What I see.** `.dock-icon-button > svg` reads `--dock-icon-glyph`, but `.dock-tab-button` has no glyph rule and no icon gap. So `Dock.vue` stamps `gap-[var(--dock-layer-gap)]` on four tab `DockControl`s and sizes `.dock-glyph` itself (glass-canon r1 item 10). The result is correct (20 / 20 px), but it is consumer layout on a glass control.

**What I ask.** `.dock-tab-button` sets its icon gap and sizes a direct `svg` child to `--dock-icon-glyph`, as the icon button does.

**What I will delete when it ships.** The `gap-[var(--dock-layer-gap)]` classes and `.dock-glyph` in `src/components/Dock.vue`.
