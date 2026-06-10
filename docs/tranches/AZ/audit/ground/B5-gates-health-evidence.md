# B5-gates-health — evidence capture (read-only audit, branch tranche/AY @ 86591cea)

## F1 — MALFORMED gate row (no id, no cmd) crashes `proof:all` local
scripts/gates.mjs:689-691 is `{ tags: ["local"] }` — no `id`, no `cmd`.
- gatesFor("local") INCLUDES it (index 107 of 142), between proof:carousel-glass-atoms and proof:squircle-language.
- runMode("local") → execSync("npm run undefined") → `npm error Missing script: "undefined"` → exit 1 → catch → "[gates] FAIL at 'undefined'". So `proof:all` (the local aggregate) DIES at this row.
- `npm run undefined` real exit code: 1 (confirmed).
- BLIND SPOT: proof:gate-script-parity regex-parses `cmd:\s*"([^"]+)"` (proof-gate-script-parity.mjs:188) — a row with NO cmd key is invisible → "gates.mjs ghost cmds: 0". proof:tag-parity also skips it (scriptFor() falsy → continue at proof-tag-parity.mjs:148). NEITHER parity meta-gate catches a cmd-less/id-less row.
- ci/release UNAFFECTED (tags=["local"] only).

## F2 — :5173-defaulting live-gate proof scripts (R3 convention-sweep, owed)
proof-*.mjs that DEFAULT to :5173 (should be :5199 per AY convention):
  proof-dock-animation-live.mjs:598      [GATE ROW, ci]
  proof-nested-backdrop-budget.mjs:22    [GATE ROW, ci]
  proof-touch-target.mjs:24              [GATE ROW, ci]
  proof-dock-orchestrator-single.mjs:425 [GATE ROW, local]
  proof-tabs-unified.mjs:293             [GATE ROW, local]
  proof-demo-dock-nav-runtime.mjs:176    [helper, NOT a gate row]
  proof-dock-items-lag-capture.mjs:424   [helper, NOT a gate row]
Already on :5199 (correct): proof-dock-wrap-content-driven.mjs:396, proof-squircle-language.mjs:395.
- CI-tagged ones grace-SKIP in CI (playwright-presence probe → exit 0 before reaching the URL), so harmless in CI.
- The bite is LOCAL: a dev with the demo on :5199 who forgets GLASS_UI_DEMO_URL hits :5173 (FOREIGN app) → false RED / wrong-app capture.
- tests-visual/playwright.config.ts:22 ALSO standardizes on 5173 (DEMO_PORT ?? 5173) — the config-level default is the root cause.

## F3 — STALE ROUTE: proof:dock-orchestrator-single navigates to a DEAD route
proof-dock-orchestrator-single.mjs:51 `DOCK_ROUTE = "/navigation/dock-layers"`.
- demo router builds `/<category>/<story>` (demo/router.ts:6-8). The dock category produces /dock/overview, /dock/layers, /dock/rail (demo/stories/manifest.ts:237-239). The `navigation` category only has tabs+carousel (manifest.ts:222-227). There is NO /navigation/dock-layers.
- The π-runtime arm fails to reach a dock → "could not reach the demo dock-layers route" (proof-dock-orchestrator-single.mjs:490).
- The gate NOTE (gates.mjs:663) ALSO references the dead "/navigation/dock-layers nested showcase".
- local-only → grace-skips in CI, broken locally. R3 (line 47) explicitly BOOKED this re-point → /dock/layers.

## F4 — Treadmill: the 3 graced freshness NOTEs (W-DOCK1/W-CON1/W-DOCK2)
All three DELTAs declare `capture-commit: 83e1e3b2` (frozen) + `superseded-by: <wave>`:
  W-DOCK1-DELTA.md:3-5  surface-paths: dock/layers.css, dock/shell.css, dockMorphContext.ts  superseded-by: W-DOCK-NAV
  W-DOCK2-DELTA.md:3-5  surface-paths: dock/layers.css, dock/shell.css, dock/morph.css, DockLayerGroup.vue  superseded-by: W-DOCK-NAV
  W-CON1-DELTA.md:3-5   surface-paths: constellation*  superseded-by: W-SB-REVERIFY
- VERIFIED STALE NOW: the dock surface last-touched at a8cfd644 (the AY CLOSE commit, 2026-06-10), which is AFTER frozen capture-commit 83e1e3b2. `git merge-base --is-ancestor a8cfd644 83e1e3b2` → FALSE → STALE. The grace path (proof-live-verified-ledger.mjs:395-404, the superseded-by branch) is ACTIVE.
- THE TREADMILL: freshnessVerdict (proof-live-verified-ledger.mjs:203-250) does git-ancestry of a FROZEN capture-commit vs the surface's MOVING last-touch. Every NEW commit touching any surface-path re-stales the DELTA — the capture-commit never advances on its own. The only escape is (a) re-capture + bump the frozen SHA, or (b) keep adding superseded-by markers. Both are manual treadmill steps re-triggered by every dock-file commit.

## F5 — registered-but-unused proof:* scripts (dangling-by-disuse)
proof:blob-interaction-prm + proof:blob-tempo-suppression: package.json keys exist, proof-*.mjs files exist, but NEITHER is a gates.mjs row NOR in KNOWN_ORPHANS NOR referenced by any other script. proof:gate-script-parity reports "0 orphans" (they have keys, so not file-orphans) — but they run in NO aggregate. Dead weight the parity gate's file↔key bijection cannot see (it never checks key↔gate-row usage).
- Internal stale text: proof-blob-interaction-prm.mjs:54 STORY correctly points at demo/stories/substrates/blob.vue (consolidated), but the violation message at :213 still says "blob-interaction.vue is absent" (dead branch text the :51-52 comment claims was fixed).

## Cross-checks (HEALTHY)
- verify-ci: ci.yml matches manifest ci set (113 gates). GREEN.
- proof:tag-parity: 0 mis-tagged static, 0 header drift, 96 static-scan / 26 live-detected / 15 justified-local. GREEN.
- proof:gate-script-parity: 0 new orphans, 0 dangling, 0 ghost cmds (modulo the F1 blind spot). PASS.
- KNOWN_DANGLING is empty (proof:styling-hygiene retired AX.W62); the :54-55 comment referencing it as "a gates.mjs ci row" is dead-but-harmless commentary.
- proof:dock-animation-live correctly uses /dock/overview + data-testid=dock-capture (both exist: demo/stories/dock/overview.vue:305).
