# BI.W-P061 — Scenario runner

**Status:** DECLINED / SUPERSEDED
**Product slice:** none

## Owner ruling

Do not implement a local scenario runner, browser-result schema, source-binding layer, trace classifier, screenshot ledger, or generated visual enrollment system. These mechanisms are disproportionate to the product work and conflict with the native-browser-only direction.

## Superseding practice

- Implement and unit-test concrete product behavior in its owning slice.
- Use the native in-app browser after a major set of changes, not after every small edit.
- Inspect the actual rendered route, keyboard behavior, responsive layout, reduced motion, console output, and visible failure states.
- Record concise human findings in the implementation handoff when they affect release judgment.
- Never substitute Playwright for unavailable native-browser access.

## Acceptance

This wave is complete by disposition when:

- none of its proposed runner files are created;
- no Playwright configuration or visual test is added for P055–P062;
- native-browser review is performed at the two major boundaries defined by P055/P056 and P057–P062 when browser access is available;
- lack of browser access is reported honestly rather than replaced with another automation stack.

## Product checks retained

The following observations remain worthwhile during native review:

- first live subject visibility;
- footer and mobile action reachability;
- direct route and 404 behavior;
- live state, reset, and failure causality;
- copy success/failure feedback;
- warning-free ordinary interaction.

No repository files are owned by this wave.
