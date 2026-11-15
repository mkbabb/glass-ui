# Orchestrator note — O-282, the dock shifts when a seat is hovered (owner, 2026-11-12)

The owner: "on hover, the dock shifts up and down on many apps because of hover states of icons therein--ensure the dock doesn't shift like this, ensure glass-ui robustness."

This joins 11.0.2. The build seat for group C takes it after O-271; if group C has closed, the next fix seat takes it, and the critics hold the release to it.

1. Reproduce first, in this worktree's demo and in a consumer shape (read the dock mounts in ~/Programming/daraksha, ~/Programming/keyframes.js, ~/Programming/value.js/demo and ~/Programming/fourier-analysis read-only, by explicit path; mount the same seats in a harness). Hover each seat and sample the dock root's getBoundingClientRect every frame through the hover in and out.
2. Rule out, by measurement: a hover state that changes a seat's border, padding, font weight or line box; a hover plate that is in flow; the focus-ring room added in 11.0.1 changing a row's height when a state applies; a scale transform with a layout effect; fit-content or the morph measure re-reading on hover (a ResizeObserver or pointerenter path writing `--dock-expanded-px`); a tooltip or label mounting in flow.
3. Cure the cause in glass. No guard that pins the height over a moving cause.
4. Add a spec: every seat type (DockControl, DockTrigger, DockBackgroundToggle, a slotted button, a slotted link, a seat with a label), both orientations, every shape, collapsed and expanded; assert the dock's bounding box is unchanged to 0 px at every sampled frame of the hover in and out; Chromium and WebKit.
5. If a cause is local to a site (a style on a seat), record the file and line in your report for the orchestrator to pass on.
6. Say in your report whether the cause exists on the 10.x line (compare `release/10.1.6`), so it can be ported.
