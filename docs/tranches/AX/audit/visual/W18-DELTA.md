# AX.W18 / W40 / Q5 / Q2 — demo IA + shell + defects · live-capture DELTA

The storybook IA reinvention (12 categories) + the shell-dock nav coherence + the
motion-union + the aurora black-bar fix. Captured 2026-06-09 on chromium.

## Captures (desktop, light + dark)

| route | what | files |
|-------|------|-------|
| `/substrates/aurora` | the aurora studio — NO black bar (Q2) | `W18-aurora-desktop-light.png`, `W18-aurora-desktop-dark.png` |
| `/dock/overview` | the first-class Dock category | `W18-dock-overview-desktop-light.png`, `W18-dock-overview-desktop-dark.png` |
| `/foundations/motion` | the unioned motion page (Q5) | `W18-motion-union-desktop-light.png`, `W18-motion-union-desktop-dark.png` |
| `/substrates/fourier-field` | the new fourier substrate | `W18-fourier-field-desktop-light.png`, `W18-fourier-field-desktop-dark.png` |

## Verdict

**PASS.** W18 — the 12-category IA renders (Substrates as render-backgrounds with
the blob-trio folded to one + a new fourier-field; Forms+Display split; a first-class
Dock category overview→layers→rail). Q2 — the aurora previews + the main preview
paint full-bleed with NO black bar at the top (root fix: resize() reads the laid-out
border-box via getBoundingClientRect() instead of the content-visibility-skip-degenerate
clientWidth/Height that sized a 1px sliver buffer; `proof:aurora-fill-resize` locks it).
Q5 — the two motion routes are unioned into one motion-vocabulary page. W40 — the demo
shell docks (SidebarDock/BottomDock) adopt the unified nav-pattern (home-left
#persistent + DockSeparator), discharging the W61 shell-docks pendingW40 (2→0). The
use-token-color dock control replaced by the darkmode toggle. proof:storybook-ia /
no-orphan-demo-route / storybook-complete / demo-dock-nav / dock-unify all green.
