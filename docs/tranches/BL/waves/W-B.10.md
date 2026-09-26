# W-B.10 · GF-TIMELINE decided: the Σwidth denominator kept; `useAnisotropicExtent` handed to the dock loop · 11.0.0

| field | value |
|---|---|
| seat | band-B wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `19bf6569` in a scratch worktree |
| ships in | 11.0.0 |
| families | F-13, the #46 split (`audit/REGISTRY.md:312-320`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| ruler | the owner for Σwidth (OW-6), with the seat default below; seat for `useAnisotropicExtent` |

## 1 · What it closes

#46's decide items (`census-register-a.md:53`): "the Σwidth owner ruling and `useAnisotropicExtent` (#67 W-2)". Its Safari and coarse cells are W-A.6's.

## 2 · The defect at HEAD

- **Σwidth.** `src/components/timeline/geometry.ts:133-135`: the aggregate is `Σ(width·eff) / Σwidth`, "not 1 — a process scoped to 94% of the axis would then stall at 0.94 forever". `tests/components/custom/timeline/timeline.partition.test.ts` T-PART-2 pins it (green). BK recorded "one OWNER ruling owed, pinned by T-PART-2" (EP:6704); no owner line exists.
- **`useAnisotropicExtent`.** Minted "once at #67 W-2, never re-mint", 0 on disk; the timeline's clip-path clause was "unexecutable as written" and routed to #67 W-2's consumer walk (EP:6704). #67 is the dock hallmarks (F-54 split, W-I.1, loop D2). `grep -c useAnisotropicExtent docs/tranches/BL/design/dock/REGISTRY.md` → **0**: the loop that owns the subject has not been told.

## 3 · The cure

1. **Σwidth: KEEP (default), OW-6 to confirm.** The aggregate reports progress over the phases the dataset owns; with a denominator of 1, a dataset ending at 0.94 can never read complete. The owner docket asks: "Timeline progress: complete when every phase completes (Σwidth), or when the axis is full (1)?" Default on silence: Σwidth. A ruling for 1 flips `geometry.ts:135` and T-PART-2's first case in one edit.
2. **`useAnisotropicExtent`: FOLD into W-I.1.** The timeline does not adopt it: its fill travels `translateX` inside two clip boxes, landed at `9bc8d25f`, and needs no extent composable. Whether the dock-to-card squish (#67) is built on an anisotropic extent is D2's to converge; this wave adds the question to D2's pass checklist as one item, so the loop, not this wave, decides the mechanism.

## 4 · Files it touches

`docs/tranches/BL/LEDGER.md` (#46a Σwidth, #46b anisotropic extent, OW-6); `docs/tranches/BL/design/dock/REGISTRY.md` (one checklist item appended to the next pass's list).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| B10-G1 · the dock loop carries the question | `test "$(grep -c useAnisotropicExtent docs/tranches/BL/design/dock/REGISTRY.md)" -ge 1` | exit 0 | **exit 1**: 0 |
| B10-G2 · the owner has ruled the denominator | `! grep -qE '^\\| OW-6 \\|.*\\| pending \\|' docs/tranches/BL/LEDGER.md` | exit 0 | **exit 1** (LEDGER:326, OW-6 `pending`; fix-2) |
| B10-G3 · the kept denominator stays pinned | `npx vitest run tests/components/custom/timeline/timeline.partition.test.ts` | exit 0 | exit 0 at HEAD: the kept behaviour, not a defect. Its bite (divide by 1) turns it red, as its own comment states (`:66-68`) |

## 6 · π and DELTA obligations

The owner question carries one capture: the timeline story with a 0.94-tail dataset fully complete, Chromium, light and dark, with the aggregate readout (1.0 under Σwidth, 0.94 under 1) beside it.

## 7 · MIGRATION rows

None unless the owner rules 1: then a behaviour row in 11.0.0 ("Timeline's aggregate is normalized over the full axis").

## 8 · Ledger rows

#46's decide items; OW-6.
