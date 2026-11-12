# Instrumentation and plants (applied over spec-graft/prototype.patch at master 2fec9b726; src equals 0778c4090)

Instrumentation (every build): one read-only line after `let morphingChildren = 0;` in DockCluster.vue:

    (window as unknown as { __clusterNow?: () => number[] }).__clusterNow = () => [...now];

Plant P3 (the `goo` build): in `paint()`, `if (plate) {` becomes

    if (plate) { plate.style.filter = "url(#cluster-goo)";

The probe appends `<svg><filter id="cluster-goo"><feGaussianBlur stdDeviation=6/><feColorMatrix … 22 -9/></filter></svg>` to the body.

Grep plants (G5/G8) are listed verbatim in challenge.md §1-§2; each was made in the scratch worktree and reverted.
