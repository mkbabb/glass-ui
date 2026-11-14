# ASK-GU-RADIUS-FAMILY: one radius family per pane (dock tabs, Select triggers, small Buttons)

**From**: speedtest AX pass 3, audit round 1 repair seat (2026-11-12). **To**: glass-ui. **Law**: GLASS-RULING item 2 (no hand radii; each component takes its own token); OI-1 C2. **Folds in**: p2 ask 4 (the dock tab radius), seat-e ASK-GU-LADDER-ADDENDUM.

**What I see on 11.0.1** (owner-eye r1 H-C2a and H-C2b; glass-canon r1 item 4):
- **Dock tabs.** Next, New Test and the Dashboard tab are 16 px corners on 44.5 px seats inside the 30 px stadium dock: rounded rectangles in a pill. Root: `tab-button.css` `border-radius: var(--dock-control-radius, var(--radius-pill))`, which is 1 rem. 11.0.1 fixed the dock root and plate, not the tab.
- **Select triggers at 390.** The `SegmentedTabs` responsive Select ("Overview", "Charts", "Map") is a near-square 16 px tile on a 60 px trigger beside 27 px pill chips and round icon buttons.
- **Small Buttons.** The thank-you "Edit response" is 12 px inside a 16 px card beside a 30 px dock.

**What I ask.** Every control in the dock and every control-row trigger is a stadium (`--radius-pill` resolving to half the block size), and a Button's radius is a stadium at every size; cards keep `--radius-card`.

**What I will not do locally.** I write no radius in speedtest.
