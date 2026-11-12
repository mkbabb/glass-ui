# Orchestrator note (2026-11-11 22:40 EST) — a regression 11.0.1 inherits from the 10.1.5 merge. BINDING for every later seat.

The 10.1.5 release close (release-10.1.5 worktree, `docs/release-10.1.5/close/close.md`, commit 1ae63cde5) found one 10.1.5-only regression that no critic gate covered, in `tests-visual/release-10-1-2.spec.ts`: **the O-101 reversal family.** On a dock whose run overflows at one width and fits at the other, a collapse reversed into an expand across a viewport change has one morph frame that reserves 7 px over the endpoint it settles at (983 vs 976 and kin), in Chromium, coarse-touch and WebKit. v10.1.4 passes it; v11.0.0 is expected to pass it; this branch merged ada7d8a8b, so it carries the defect.

A fix seat is curing it at the root on release/10.1.5 now (driver `glass-10.1.5d.js`), as ONE source-and-tests commit. The orchestrator cherry-picks that commit onto release/11.0.1 when it lands.

- A critic or close seat on 11.0.1 that sees the O-101 reversal titles of release-10-1-2.spec.ts fail records them as THIS known item, with its own count, and does not start a second cure.
- The close does not return ready_to_tag while those titles fail on the branch and pass on v11.0.0, unless a later orchestrator note here rules them a stated bound for this release.
- Also from that close: `release-10-1-2.spec.ts` D-1 on coarse-touch fails at a stale precondition (it expects a hover fill from a touch pointer, which the patch removed on purpose). Ruled: where the pointer cannot hover the witness asserts no hover fill on the enabled trigger and still reads the disabled arm. The same test commit is cherry-picked here.

## Carried (orchestrator, 2026-11-11 23:15 EST)

The cure is on this branch: 9bd02b5f3 (cherry-pick of release/10.1.5's 314ce60fc; the conflict in dockMorphMeasure.ts resolved by hand, 11.0.0's rest read kept, the chrome and restSize on the layers box) and 7e72f7796 (the D-1 witness). Correction to the note above: on v11.0.0 all eight `O-101 ·` cells of release-10-1-2.spec.ts ALREADY fail in all three projects (see baseline-v11.0.0); only the O-101a cells pass there. So the close compares against the v11.0.0 title sets as for any other spec: a title failing on the branch that is in the v11.0.0 set is not a regression. A fallback tarball was packed from bc30490cc before this carry.
