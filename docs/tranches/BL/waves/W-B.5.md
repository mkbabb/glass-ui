# W-B.5 · V-A95 decided: RETIRE, with a tracked drag e2e that re-opens it on any reproduction · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree, `dist-demo/` built there (`vite build --config demo/vite.demo-dist.config.ts`, 3 s) |
| ships in | 11.0.0 |
| families | F-13, the C-4 split (member L04-F06; `audit/REGISTRY.md:312-320`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| ruler | seat. The rider was ported as "RETIRE-OR-CONFIRM, never a cure hunt" (`BK/PORT.md:70`); the evidence rules it |

## 1 · What it closes

C-4 (`census-carries-recap.md:29`), L04-F06: the V-A95 retire-or-confirm rider rode BK after six non-reproductions and was never decided. A chronic that rode two or more closes: its own wave (CH:23).

## 2 · The defect at HEAD: not reproduced, a seventh time, through the browser's input path

The six BK readings dispatched synthetic `PointerEvent`s into the stage host (`BK/execution/2026-08-25-pi-band/gamma-aurora-blob/PI-BATTERY-gamma-aurora-blob.md:274-299`, which states that limit). This seat drove the drag through Chromium's input pipeline instead: `page.mouse` → CDP `Input.dispatchMouseEvent`, so hit testing and pointer-event generation run as for a device. Probe `scratchpad/formation/band-B/probes/v-a95-trusted-drag.mjs`, `/substrates/aurora`, 1440×900, dark, nucleus 1, stage 830 × 241.875 CSS px after scrolling it into view, 20 moves per leg:

| leg (px) | ring moved (dleft %, dtop %) | pointer implies | match |
|---|---|---|---|
| +260, −60 (forward) | +31.325, −24.806 | +31.325, −24.806 | yes |
| −260, +60 (the exact reverse) | −31.325, +24.806 | −31.325, +24.806 | yes |
| −120, −40 (a reverse-quadrant leg) | −14.458, −16.537 | −14.458, −16.537 | yes |

The other four rings did not move. Evidence: `evidence/W-B.5/{before.png,after.png,v-a95.json}`, sha256 `308c6dac…`, `cf05f803…`, `ab9de330…`. `getContext()` was not called. `useCursorInteraction.ts` and `NucleiOverlay.vue` are unchanged since the BK capture (`census-carries-recap.md:29`).

**The instrument can fail.** With one plant, `useCursorInteraction.ts:41` `(e.clientX - r.left)` → `(r.right - e.clientX)` (a mirrored x, the reverse-drag defect's shape), rebuilt, the same probe reads ring `−31.325` against pointer `+31.325` on the forward leg, `+31.325` against `−31.325` on the reverse, `+14.458` against `−14.458` on the third: 3 of 3 legs mismatch (`evidence/W-B.5-plant/v-a95.json`). The file was restored and the demo rebuilt at HEAD before any other probe.

What is still not exercised: an OS-level or human pointer. That is the re-trigger.

## 3 · The cure

1. **RETIRE** C-4, re-trigger: any reproduction by a real pointer (a person, or OS-level input) with a capture. The rider leaves #49's scope, so W-G.4 carries no V-A95 item.
2. **A tracked drag e2e** replaces the rider: `tests-visual/aurora/nucleus-drag.spec.ts`, the probe above as a Playwright spec on W-A.1's harness and route manifest, three legs, asserting ring delta equals pointer delta to 0.01 % on both axes and the other rings still. It joins W-A.3's wired set in both engines (Chromium; Playwright WebKit labelled so). Its bite is the mirrored-x patch above, filed as a roster bite (`tests/_support/bites/`).
3. Record in the ledger: C-4 RETIRE, ruler seat, the seven readings, the re-trigger.

## 4 · Files it touches

- New: `tests-visual/aurora/nucleus-drag.spec.ts`, `tests/_support/bites/nucleus-drag.patch`.
- Edited: `tests/gates/roster.json` (one entry, bound), `docs/tranches/BL/LEDGER.md`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B5-G1 · the e2e exists and passes | `test -f tests-visual/aurora/nucleus-drag.spec.ts && npx playwright test -c tests-visual aurora/nucleus-drag` | exit 0 | **exit 1**: the spec is absent. The defect it guards is not live: 3 of 3 legs match (§2) |
| B5-G2 · the e2e can fail | apply `nucleus-drag.patch`, rebuild the demo, run B5-G1 | exit 1 | measured with the probe: 3 of 3 legs mismatch under the plant |

C-4's terminal (RETIRE with its re-trigger) is LEDGER `C-4`. B5-G1 and B5-G2 enact it; no gate re-reads the ledger (PLAN §1, decide waves).

B5-G1 is RED only by absence, because the defect is not live; the seat says so with the evidence above. B5-G2 is what shows the gate can fail.

## 6 · π and DELTA obligations

The retirement rests on a paint-adjacent claim (the ring follows the pointer). Captured: the before and after screenshots and the probe JSON above (Chromium, dark, 1440). The wave re-captures in light and dark on the tracked spec, and in Playwright WebKit (labelled). Real Safari UNMEASURED (OW-3); a Safari reproduction is a re-trigger.

## 7 · MIGRATION rows

None.

## 8 · Ledger rows

C-4 (RETIRE, re-trigger named); L04-F06; the V-A95 rider on #49 (BK `PORT.md:70,103`).
