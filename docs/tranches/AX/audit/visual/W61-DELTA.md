# AX.W61 — dock-unify-root · live-capture DELTA

The user's pass-3 ask: "all docks should leverage the same root component, with a
home button on the left, navs, and dividing lines." Captured 2026-06-09 against
`localhost:5173/navigation/rail` + `/navigation/dock` on chromium.

## Captures

| dock | light | dark |
|------|-------|------|
| rail (migrated) | `W61-rail-desktop-light.png` | `W61-rail-desktop-dark.png` |
| showcase dock | `W61-dock-unified-desktop-light.png` | `W61-dock-unified-desktop-dark.png` |

## Verdict

**PASS.** The vertical `<GlassDock variant="rail">` composes the SAME nav pattern
every dock follows: a **home control in the leading `#persistent` slot** (home-left,
top for the vertical rail), a `<DockSeparator>` divider after the anchor, then the
nav items — and the selected item reads as a **glass tier over the dock substrate
via `aria-pressed`** (the keyframes-dock "selected = glass" model, `--glass-bg-floating`),
NOT a hand-rolled `bg-foreground/10` active class. The Q1 collapsed-floor tokens
now both ride `--dock-scale` (the collapsed pad scales at the coarse 1.5× too).
`proof:dock-unify` F1–F5 green (the showcase docks unified; the demo-layout shell
docks BottomDock/SidebarDock are tracked pendingW40). One root, one nav pattern.
