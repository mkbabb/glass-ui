# ASK-GU-SEGMENTED-NAV-LINKS: SegmentedTabs as route navigation (links with aria-current)

**From**: speedtest AX pass 3, audit round 2 repair seat (2026-11-13). **To**: glass-ui. **Law**: WCAG 2.2 (4.1.2 name, role, value); the APG navigation pattern.

**What I see on 11.0.1** (contrast-a11y r2). The dashboard's Map / Charts switch and the admin's Overview / Data / Charts / Map / Settings switch change the route. `SegmentedTabs` renders them as a tablist of buttons. The repair seat has named both strips (`ariaLabel`) and pointed each tab's `controls` at the routed region, which is now a `role="tabpanel"`, so there is no longer a tablist without a panel. But route navigation is properly a `nav` of links with `aria-current="page"`: middle-click, open in a new tab and the browser's link affordances all need a real `<a href>`.

**What I ask.** A `semantics="nav"` (or `as-link`) mode for `SegmentedTabs`: each option renders an anchor with an `href` (or a slot for `RouterLink`), and the active one carries `aria-current="page"`, with the same underline material and indicator.

**What I will not do locally.** I will not hand-build a second tab strip from links in speedtest.
