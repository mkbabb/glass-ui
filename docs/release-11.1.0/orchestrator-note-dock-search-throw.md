# Orchestrator note: the dock search page throws at mount (BINDING for the next fix or close seat)

Glass's own audit read this branch at acd8db1eb: the demo route `/dock/dock-search` throws `TypeError: e.addEventListener is not a function` on every visit at 390 with touch (Chromium). Suspected place: `src/components/dock/composables/useDockState.ts:403-415`, where the `rootEl` watcher calls `addEventListener` on a value that is not an element (a component instance or a ref's wrapper), so the dock's press listeners never attach on that composition. Evidence: master's `docs/tranches/BL/audit/last-ten/FINDINGS.md` LT-1 and `logs/shell/11.1.0.chromium.p390.json`.

Read it first: reproduce on the tip and on v11.0.1. If it is a regression of this branch, cure it at the watcher (resolve the element before listening) with a unit cell and one browser cell that the page logs no error and a press on the collapsed dock expands it. If v11.0.1 throws the same, record that and leave it for 11.1.1.
