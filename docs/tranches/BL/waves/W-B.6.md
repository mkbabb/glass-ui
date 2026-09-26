# W-B.6 · HandMark decided: the two colour windows retired into the composite invariant; π-SCROLL kept by its own criterion · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree |
| ships in | 11.0.0 |
| families | F-13, the #51 split: C-5, C-6, C-7 (members L04-F07, L04-F23; `audit/REGISTRY.md:312-320`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| ruler | seat for C-5 and C-6; the owner for C-7 (OW-4), with the seat default below |

## 1 · What it closes

| id | item |
|---|---|
| C-5 | the dark band paints ≈ 0.485 L against a `[0.42, 0.48]` window; the card's `paper-grain-overlay` lifts it ≈ +0.045 L (BK EP:6224-6229) |
| C-6 | the light arm's chroma floor 0.08 at `oklch(0.86 0.16 270)`, which gamut-maps to C 0.07256 |
| C-7 | π-SCROLL: the 0.36 px ink lag against the 1.5 px cap, owner-reserved with no default (OW-4) |
| #51's other items | the atlas hold → W-L.7 (F-68); the evidence doc's dead grep path and lapsed re-audit date → W-C.3 (F-63); the second draw on `fonts.ready` → W-K.7 (F-43) (`census-register-a.md:58`) |

## 2 · The defect at HEAD

- **The band is authored out of gamut and gated in sRGB.** `src/components/handmark/HandMark.vue:421`: `--hm-band: light-dark(oklch(0.86 0.16 var(--hm-h)), oklch(0.44 0.16 var(--hm-h)))`, `--hm-h: 78` by default. Computed at this seat (OKLab → linear sRGB, bisection on C): the sRGB chroma ceiling is **0.12795** at L 0.86 h 78, **0.09172** at L 0.44 h 78, **0.06847** at L 0.86 h 270 (the census figure), 0.28836 at L 0.44 h 270. The authored C 0.16 exceeds the sRGB ceiling in three of those four cells, so on an sRGB display the engine maps it; a C ≥ 0.08 floor at h 270 cannot be met by any light-arm band. The floor is a spec defect, and BK recorded that it contaminated its own detector (`chromaGE08 = 0` on a band plainly painted, EP:6224-6231).
- **The dark window was set on the token ground**, while the eye reads the band over the card's grain. That is F-23's mechanism: ink calibrated to the token ground, not the painted composite.
- **π-SCROLL has a criterion and no ruler.** `HandMark.vue:312-325`: `lag = sign(Δ)·min(1.5, |0.06·Δ|)`, released to 0 after 90 ms of quiet. The kill criterion recorded at BK EP:5502: "if ink-lag reads as a made mark DETACHING from its word, the resolution is DELETION, not tuning". The measured lag is 0.36 px. No test holds the lag to its cap: `test -f tests/components/custom/handmark/ink-lag.test.ts` exits 1, and no file under `tests/` mentions the lag.

## 3 · The cure

1. **C-6: RETIRE the 0.08 floor.** A chroma floor stated in sRGB terms cannot judge a colour authored for wide gamut; the authored value stays (E-2: modern CSS on target engines, which map it). No owner words stand behind the floor.
2. **C-5: RETIRE the token-ground window; FOLD the band into W-H.1.** The band is one of W-H.1's surfaces: its rendered contrast is measured on the painted composite (grain included) in both themes, and W-H.1's invariant carries a HandMark cell. The window numbers leave the records.
3. **C-7: KEEP, owner to confirm (OW-4).** 0.36 px is a quarter of the 1.5 px cap; the lag reads as ink settling, which is D-1's liquid weight. The owner docket asks: "HandMark's ink trails its word by up to 1.5 px while scrolling and settles 90 ms after. Keep or delete?" with the scroll strip capture (§6). Default on silence: KEEP. A DELETE ruling removes `onScroll`'s lag and the settle class in one edit.
4. **The kept behaviour gets a test.** `tests/components/custom/handmark/ink-lag.test.ts` mounts HandMark, fires scroll steps with known rect deltas, and asserts |lag| ≤ 1.5 px at every step, 0.06·Δ below the cap, and 0 after 90 ms with no event (fake timers). Its bite: the cap raised to 3.0.

## 4 · Files it touches

- New: `tests/components/custom/handmark/ink-lag.test.ts`, its bite patch.
- Edited: `docs/tranches/BL/LEDGER.md` (C-5, C-6, C-7, OW-4, the #51 split rows); `docs/tranches/BL/waves/W-H.1.md` when written (the HandMark cell).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B6-G1 · the kept lag is held | `npx vitest run tests/components/custom/handmark/ink-lag.test.ts` | exit 0 | **exit 1**: no such file |
| B6-G2 · the test bites | apply the cap-3.0 patch, run B6-G1 | exit 1 | absent |
| B6-G3 · the owner has ruled π-SCROLL | `! grep -qE '^\\| OW-4 \\|.*\\| pending \\|' docs/tranches/BL/LEDGER.md` | exit 0 | **exit 1** (LEDGER:324, OW-4 `pending`; fix-2) |

B6-G4 (`grep -qi handmark W-H.1.md`) is struck: a grep of a plan file is not a gate on the tree. The band's dark window is held in paint by W-H.1 G18 (HandMark `shape="highlight"` ink on band: 10.86 light, 6.37 dark in both engines at `183e021a`). C-5, C-6, C-7 and #51a-c's terminals are LEDGER:227-229 and :128-130.

## 6 · π and DELTA obligations

| surface | themes | engines | π |
|---|---|---|---|
| π-SCROLL owner strip: a HandMark on its story route, 12 frames across a 400 px wheel scroll and the 90 ms settle | light, dark | Chromium; Playwright WebKit labelled; real Safari UNMEASURED (OW-3) | per frame, the mark's `translateY` and the word's rect top |
| the band over the card grain (the composite W-H.1 measures) | light, dark | the same | the painted band's OKLCH at the crop, and the token value, side by side |

## 7 · MIGRATION rows

None: no published surface changes. A DELETE ruling on C-7 removes behaviour, not API; its CHANGELOG line is written then.

## 8 · Ledger rows

C-5 (RETIRE; FOLD → W-H.1), C-6 (RETIRE), C-7 (KEEP, OW-4), #51's decide items; the conditional census gap ("if C-6 is BUILD, an out-of-gamut value has no family", `CENSUS.md:264`) closes, since C-6 is RETIRE.
