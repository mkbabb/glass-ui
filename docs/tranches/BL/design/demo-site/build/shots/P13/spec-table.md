| spec | old route | new route, or deleted, or listed | why (one short clause) |
|---|---|---|---|
| _capture_css.spec.ts | /data/search | deleted (list entry) | its receiver /containers/command is already in the list |
| _capture_css.spec.ts | /data/tags-input | deleted (list entry) | TagsInput is gone from src |
| _cohere-capture.spec.ts | /dock/overview | /dock/chrome | captures `.glass-dock`, which chrome mounts |
| _egg-capture.spec.ts | /foundations/intro | deleted (E3, E1, E2, E5/E6 tests; E4 kept) | cmd+K palette, f-redraw, konami and `.demo-sidebar-dark-toggle` exist nowhere |
| _r4-shell-config-capture.spec.ts | /foundations/intro | / | reads the shell gear and configurator |
| _sb1-capture.spec.ts | /foundations/intro | / | front-door card `a[href="/substrates"]` is on `/` |
| _sb1-capture.spec.ts | /compositions/hero | deleted (2 tests) | route cut, `.story-hero-bg` gone |
| _wdelta0-capture.spec.ts | /dock/overview | deleted (W56 big-dock test; bigdock and pill block of W56 readback) | the `shape="card"` dock is gone |
| _wdelta0-capture.spec.ts | /foundations/intro | / | only reads `CSS.supports` |
| _wdelta0-capture.spec.ts | /substrates/glass-material | /foundations/paper-glass (W52 capture); listed (W52 readback) | capture is a screenshot; readback's `.glass-card/.glass-btn/[data-slot=card]/.glass-material` are not on paper-glass |
| adaptive-glass-live.spec.ts | /dock/overview | /dock/chrome | `.glass-dock` in situ |
| adaptive-glass-live.spec.ts | /dock/layers | deleted (list entry) | same receiver, /dock/chrome already enrolled |
| adaptive-glass-live.spec.ts | /data/metric-cell | deleted (list entry) | /data/metric mounts no glass tier |
| adaptive-glass-live.spec.ts | /substrates/glass-material | /foundations/paper-glass (continuous-track); deleted (ROUTES entry, busy set emptied) | tiers on the plates; ROUTES already holds paper-glass |
| atlas-flip.spec.ts | /display/dark-mode-toggle | /display/atoms | atoms mounts DarkModeToggle (`.toggle-sun`) |
| aurora-entrance.spec.ts | /foundations/intro | / | the shell Aurora (`.aurora-placeholder`) is on `/` |
| ba-animate.spec.ts | /data/metric-cell | deleted ((a), (c), metric block of captures) | `.fade-slide-*` route transition and `[data-countup]` exist nowhere |
| customizability.spec.ts | /containers/hover-card | /containers/popover | hover card is a popover mode; `[role=dialog]` content |
| dark-material.spec.ts | /dock/overview | /dock/chrome | host route for injected fixtures |
| demo-affordances.spec.ts | /motion/curve-gallery | deleted (curve-picker, play-control, narrow-floor tests) | `.curve-chip-rack`, "play family", `.curve-family-picker` exist nowhere |
| demo-affordances.spec.ts | /feedback/toaster | deleted (lone-trigger test) | "Fire a toast" trigger exists nowhere |
| demo-affordances.spec.ts | /feedback/notification | deleted (capture test) | screenshot of a page that is gone |
| demo-design.spec.ts | /feedback/notification | deleted (P5) | `.feedback-tone` rendered by no component |
| dialog-glass.spec.ts | /feedback/confirm-dialog | deleted (test 4) | ConfirmDialog is gone from src |
| dock-animation-live.spec.ts | /dock/overview (via PI_TARGETS.dock) | /dock/chrome | collapsed `.glass-dock` fallback and `.dock-layer--full` exist |
| dock-animation-live.spec.ts | /navigation/dock (comment) | comment rewritten | history note only |
| pi-manifest.ts | /dock/overview (`resolveScene("dock","overview")`) | /dock/chrome | the real collapsible dock |
| dock-cockpit.spec.ts | /dock/overview | /dock/chrome | host for injected probe docks |
| dock-items-lag-capture.spec.ts | /dock/overview | deleted (file) | `dock-capture` testid exists nowhere |
| fixtures/dock-entering-child-lag.html | /dock/overview (comments) | /dock/chrome | unreferenced synthetic fixture |
| dock-luma-share.spec.ts | /dock/overview | deleted (file) | every test reads `.dock-stage`, gone |
| dock-morph-family.spec.ts | /dock/overview | /dock/chrome | `.glass-dock`, `.dock-layers` |
| dock-morph-family.spec.ts | /dock/layers | deleted (test d) | DockLayerGroup is mounted by no page |
| dock-morph-insitu.spec.ts | /foundations/intro | deleted (file) | `shell-dock-morph-*`, `sidebar-dock-rail`, `__shellDockMorph` gone |
| dock-morph-insitu.spec.ts | /dock/layers | deleted (file) | `dock-nested-collapsible` gone |
| dock-plate-clearance.spec.ts | /dock/overview | /dock/chrome | reads only the shell docks |
| dock-rail-cohesion.spec.ts | /dock/layers (and /dock/overview in a comment) | deleted (file) | DockLayerGroup rail on no page |
| dock-with-slider-live.spec.ts | /compositions/dock-with-slider | deleted (file) | route and `dock-slider-hold-root` gone |
| dockmorph-cta.spec.ts | /dock/cta-receive (via resolveScene) | deleted (file) | route CUT, `.cta-receive-*` gone |
| drag-morph.spec.ts | /dock/layers | deleted (consumer #2 test) | `.dock-layer-rail` on no page |
| easing-primitive.spec.ts | /motion/curve-gallery | listed | EasingPicker is in src but no page mounts it |
| eyebrow-union.spec.ts | /display/metric-badge | listed | MetricBadge gone; eyebrow classes live on, a new host is a new test |
| forced-colors-skin.spec.ts | /substrates/glass-material (via resolveScene) | /foundations/paper-glass | host for synthetic `.glass-*` fixtures; the tier ladder's home |
| glass-accent.spec.ts | /substrates/glass-material | deleted (swatch test) | `[data-accent-swatch]` exists nowhere |
| glass-cal.spec.ts | /dock/overview | /dock/chrome | `.glass-dock` |
| glass-identity.spec.ts | /dock/overview | /dock/chrome | glass surfaces in situ |
| glass-identity.spec.ts | /substrates/glass-material | deleted (dock-over-page-aurora test) | page aurora backgrounds are gone |
| glass-legibility.spec.ts | /dock/overview | /dock/chrome | glass surfaces in situ |
| glass-legibility.spec.ts | /substrates/glass-material | /foundations/paper-glass | the tier plates |
| glass-material-demo.spec.ts | /substrates/glass-material | deleted (file) | `data-specular-plate`, `data-tint-plate`, live `data-glass-sample` gone |
| goo-dot.spec.ts | /substrates/goo-dot | deleted (file) | route and `goo-dot-matrix-canvas` gone |
| hierarchy.spec.ts | /dock/overview | /dock/chrome | `article h2` sweep |
| hierarchy.spec.ts | /dock/layers | deleted (list entry) | same receiver |
| hierarchy.spec.ts | /substrates/glass-material | /foundations/paper-glass (H2-GUTTER); deleted (H2-ORDER, H2-GRAVITY, H2-PRM) | gutter reads the shell scroller; `.story-header-cluster` gone |
| liquid-hover.spec.ts | /dock/overview | /dock/chrome | `.dock-icon-button` (DockControl) |
| liquid-reveal.spec.ts | /dock/overview | /dock/chrome | `.glass-dock` |
| metal-shimmer.spec.ts | /substrates/glass-material | deleted (file) | `[data-metal*]` exists nowhere |
| motion-demo.spec.ts | /motion/curve-gallery | deleted (family-gallery and purple-stroke tests, gallery capture block); /motion/springs (purple-readback JSON) | the `svg polyline` gallery is gone; the JSON reads a root token |
| motion-one-clock.spec.ts | /dock/overview | /dock/chrome | root `--spring-dock-duration` |
| motion2.spec.ts | /motion/curve-gallery | deleted (file) | polyline gallery and `.curve-family-picker` gone |
| nested-backdrop-budget.spec.ts | /substrates/glass-material (via resolveScene) | listed | it needs a field-free route; paper-glass runs an aurora field |
| no-shadcn-default.spec.ts | /data/tags-input | deleted (test) | TagsInput gone |
| page-chassis.spec.ts | /substrates/glass-panel | deleted (SAMPLE entry) | subpath chip and `h1.story-hero-title` not on component pages |
| page-chassis.spec.ts | /forms/label | deleted (SAMPLE, PC-5 entries; PC-3 test) | D3 depth tier no longer exists |
| page-chassis.spec.ts | /foundations/intro | deleted (SAMPLE entry) | its subpath chip is gone |
| page-chassis.spec.ts | /data/avatar | deleted (SAMPLE, CONTENT_ROUTES, PC-5 entries) | same chassis markup gone |
| page-hierarchy.spec.ts | /dock/overview | deleted (list entry) | the multi-section page is gone |
| paper-grid.spec.ts | /compositions/math-paper (comment) | comment trimmed | history note only |
| perf-producer.spec.ts | /dock/layers | listed (A′-4) | it drives the morph through `.dock-layer-tab`, on no page |
| perf-producer.spec.ts | /foundations/intro | / | route-away target |
| perf-producer.spec.ts | /dock/overview | /dock/chrome (A′-6) | `.glass-dock` density probe |
| press-unify.spec.ts | /containers/card-pressable | deleted (test) | Card has no `pressable`/`data-pressable` |
| register-ios.spec.ts | /dock/overview | /dock/transport | the transport's `.dock-icon-button` |
| safari-webgl.spec.ts | /dock/overview | /dock/chrome | dock over the stage's live field |
| scroll-motion.spec.ts | /motion/scroll-choreography (comment) | comment trimmed | route was already /motion/scroll |
| search.spec.ts | /data/search | listed | placeholder and `card-title` results gone; ranking now lives in Command |
| shell-config.spec.ts | /foundations/intro | / (G1, G2, G4, G-CLOSE); listed (G3) | shell; G3's aria-label "Open the glass-ui demo configurator" is now "Open the configurator" |
| shell-hold.spec.ts | /dock/overview | /dock/chrome | reads only `location.pathname` |
| shell-hold.spec.ts | /motion/curve-gallery | /motion/springs | reads only `location.pathname` |
| specular-coalesce.spec.ts | /substrates/glass-material (via resolveScene; /dock/overview in a comment) | listed | paper-glass plates are not specular-wired |
| spring-ease.spec.ts | /feedback/notification | deleted (notification block of test 5) | screenshot of a page that is gone |
| stage-field-clamp.spec.ts | /dock/overview | deleted (file) | `.dock-stage` gone |
| stage.spec.ts | /data/metric-cell | deleted (test b); /data/metric (gestalt capture) | `.story-bg-grid` gone; capture is a screenshot |
| stage.spec.ts | /substrates/glass-material | deleted (test c); /foundations/paper-glass (gestalt capture) | ShowcaseFrame host gone |
| stage.spec.ts | /dock/overview | deleted (test d); /dock/chrome (gestalt capture) | `.dock-stage` gone |
| stage.spec.ts | /dock/morph-showcase (comment) | deleted with test d | history note only |
| storybook-meta.spec.ts | /foundations/css-utilities | deleted (M7) | route CUT |
| storybook-meta.spec.ts | /foundations/intro | deleted (M9, M9d) | shell morph testids gone; preview card has no Chip or subpath chip |
| suffuse.spec.ts | /motion/curve-gallery | /motion/springs (S2) | root `--motion-accent`; the polyline read is already guarded |
| suffuse.spec.ts | /data/metric-cell | deleted (S3) | `text-display-mega/audacious` rendered nowhere |
| suffuse2.spec.ts | /motion/countup | /motion/text-motion | Countup lives there; root token |
| tunable-anim.spec.ts | /motion/curve-gallery | deleted (P1, P2, P3, P4, P6, P7; P5 kept) | `easing-picker`/`easing-readout`/`easing-steps-n` testids exist nowhere |
| viz-configurator-suite.spec.ts | /substrates/liquid-grid (comment) | comment trimmed | deletion note only |
| viz-paint-records.spec.ts | /substrates/liquid-grid (comment) | comment trimmed | deletion note only |
| w1-radius-redress.spec.ts | /data/search | deleted (test) | `.input-bar` rendered by no component |
| w1-radius-redress.spec.ts | /data/tags-input | deleted (2 tests) | TagsInput gone |
| w2-blur-redress.spec.ts | /containers/drawer | /containers/sheet (3 host gotos); deleted (Drawer immersive test) | global-CSS host; no Drawer, no "open immersive drawer" |
