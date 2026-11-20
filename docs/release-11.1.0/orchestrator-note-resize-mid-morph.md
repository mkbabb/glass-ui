# Orchestrator note: the resize-mid-morph cure rides 11.1.0 (BINDING for the release-close seat)

v11.0.2 shipped a regression (its commit 5afae24e9, the collapse arm keeping the last expanded size): when a viewport resize or a breakpoint crossing interrupts a dock morph, the dock's morph observer writes a size from inside its own ResizeObserver delivery and the browser raises "ResizeObserver loop completed with undelivered notifications". v11.0.1 does not raise it. A consumer's spec caught it; it also arises on a device rotation or a window resize during a morph.

The cure is proven on branch `bl/ro-loop` (based on v11.0.2): commit fca26fdbb, 43 lines in `src/components/dock/composables/dockMorphMeasure.ts`, with its witness `tests-visual/ro-loop.spec.ts` (config `tests-visual/ro-loop.config.ts`, harness under `tests-visual/ro-loop/`). The witness is RED on v11.0.2 and GREEN on the cure in Chromium (8 of 8) and WebKit 2287 (4 of 4); the dock unit specs, release-11-0-2 and release-10-1-2 stayed green on the cured tree in Chromium. Record: master's `docs/tranches/BL/audit/ro-loop/RECORD.md`.

Do, right after merging master and before the battery:
1. `git merge --no-ff bl/ro-loop` into release/11.1.0. Expect a conflict in dockMorphMeasure.ts if 11.1.0 touched the same lines: keep 11.1.0's behaviour and the cure's rule (through a morph, nothing writes a size from inside an observer delivery; a delivery that is not just the morph's own boxes, and the host-style watcher, schedule one capture for the next animation frame; a pane patched mid-morph is captured on its mutation record).
2. Run the witness on the merged tree in Chromium and WebKit 2287: all cells GREEN. Run fix 9's probe11 and probe10 and lane L6 again in both engines (the gliding plate and the dock postures share this file's neighbourhood).
3. Add one CHANGELOG line to 11.1.0, in consumer voice, no internal ids: a dock no longer raises a ResizeObserver loop error when the window is resized or rotated while it is opening or closing (new in 11.0.2).
4. The ratchet is rebound last, as already ruled.

If the merged tree cannot hold both the witness and fix 9's probes green, STOP and return ready_to_tag=false naming the cell; do not drop either.
