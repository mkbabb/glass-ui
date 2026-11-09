# Inbound O-186 and O-187: Gregg's WebKit hover lens and nested runs (sci-report-ef, 2026-11-08)

## O-186: WebKit hover turns the plate into a lens

In a fit-content GlassDock (`backdrop-mode="static"`, `:collapse="false"`), hovering any control in Playwright WebKit at 1440 makes `.dock-plate` compute `border-radius: 50% calc(45% + 1.6px) calc(45% + 1.6px) 50%`, at both 150 ms and 850 ms of hover. A wide pill becomes a lens, and the selected tab's pill is clipped at the left end. Chromium keeps the pill. Gregg pins `border-radius: 9999px !important` on its plates as a stopgap.

This is the r1 law (a percentage radius resolves per axis) in the cap or clip keyframes, reached on a path the branch has not yet witnessed.

## O-187: a nested `.dock-run` clips the hover scale and adds a second timeline

A `<div class="dock-run">` of DockControl tabs inside a GlassDock is made a scroll container by the run styles:
- **The hover scale is clipped.** The last tab's 1.1 hover scale is cut flat at the group's edge: it reads 1109.6–1204.7 against an edge at 1200.4.
- **A second timeline drives the plate.** The nested run names a second `--dock-run` scroll timeline, which the plate then reads. Gregg suspects this is O-186's trigger.

Gregg resets the nested run in a commented rule:

```css
.glass-dock .dock-run .dock-run {
  overflow: visible;
  scroll-snap-type: none;
  scroll-timeline: none;
  padding: 0;
  margin: 0;
}
```

## The cure

The run's scroll container, its reserve and its timeline belong only to the dock's own run, never to a nested `.dock-run`. The plate reads exactly one timeline, from the active run, by construction. No percentage radius reaches any plate keyframe. It is one law, not a patch on the nested selector.

## Gates

In Chromium and WebKit, at 1440 and 390:
1. A fit-content static dock under hover on every control keeps a uniform rest corner equal to half its cross extent. No computed radius contains a `%`.
2. A nested `.dock-run` group keeps each hovered control's full 1.1 ink.
3. The plate has exactly one scroll timeline in scope.

Each gate must be RED on v10.1.4 for the paths that reproduce there.
