# BA.W-HYGIENE — the orphan AX evidence-png cited-vs-scratch LEDGER (scope 7 / P-4)

The 26 un-ignored-but-untracked pngs under `docs/tranches/AX/audit/visual/{W18-W40,W36,W44,W46}/`
resolve on THIS working tree but 404 on a fresh CI checkout (`git ls-files --others --exclude-standard
'docs/tranches/AX/audit/visual/*/*.png'` returns 26). `.gitignore:13,16` UN-ignores these globs
precisely so `proof:live-verified-ledger` can assert cited pngs exist on a fresh clone — so an
un-ignored-yet-untracked png is the exact failure class the exception was built to prevent.

The agent greps every `proof:live-verified-ledger` row + PROGRESS/FINAL/DELTA citation for each path.
**CITED ⇒ commit** (the evidence must resolve on a fresh checkout). **UN-CITED scratch ⇒ delete**
(orphan raw-capture from the AX live-capture passes). The commit/delete are ORCHESTRATOR git steps;
this ledger is the path-by-path disposition the orchestrator executes.

## Method

Per-png basename grep across `docs/**` + `scripts/**` + `src/**` (`.md`/`.json`/`.ts`/`.mjs`/`.js`),
excluding `node_modules/` + `.cache/`. A CITED verdict requires a reference to the png BASENAME in an
audit ledger (`*.json` capture manifest), a PROGRESS/FINAL row, a DELTA doc, a wave spec, or a
component RESEARCH/README. The flat per-wave DELTA evidence (`W18-*-desktop-{dark,light}.png`,
`W36-forced-colors-desktop.png`, `W44-notification-*.png`, `W46-goo-blob-*.png`) is ALREADY git-tracked
and is the load-bearing `proof:live-verified-ledger` evidence — these 26 subdir pngs are a SEPARATE,
parallel raw-capture naming scheme.

## Verdict table

### `W18-W40/` (12 pngs) — CITED ⇒ COMMIT

The W18 storybook-IA capture manifest `docs/tranches/AX/audit/W18-storybook-ia.json` references all 12
by basename (the IA capture set); several are additionally cited in `AY/audit/design/FD-storybook.md`,
`AZ/audit/FLEET-DIGEST.md`, `AZ/audit/FLEET-ACTIONABLE.md`, and `BA/audit/fleet/precepts-conformance.md`.

| png | citations | verdict |
|---|---|---|
| `W18-W40/containers-command.png` | `AX/audit/W18-storybook-ia.json` | COMMIT |
| `W18-W40/display-buttons.png` | `AX/audit/W18-storybook-ia.json`, `AY/audit/design/FD-storybook.md` | COMMIT |
| `W18-W40/dock-layers.png` | `AX/audit/W18-storybook-ia.json`, `AZ/audit/FLEET-DIGEST.md` (+ several F/E runtime-smoke jsons) | COMMIT |
| `W18-W40/dock-overview.png` | `AX/audit/W18-storybook-ia.json`, `AY/audit/design/FD-storybook.md`, `BA/audit/fleet/precepts-conformance.md` | COMMIT |
| `W18-W40/dock-rail.png` | `AX/audit/W18-storybook-ia.json`, `AY/audit/design/FD-storybook.md`, `AZ/audit/FLEET-{ACTIONABLE,DIGEST}.md`, `BA/audit/fleet/precepts-conformance.md` | COMMIT |
| `W18-W40/forms-inputs.png` | `AX/audit/W18-storybook-ia.json`, `AY/audit/design/FD-storybook.md`, `AZ/audit/FLEET-DIGEST.md` | COMMIT |
| `W18-W40/foundations-motion-unified.png` | `AX/audit/W18-storybook-ia.json` | COMMIT |
| `W18-W40/shell-home-1440.png` | `AX/audit/W18-storybook-ia.json`, `BA/audit/fleet/precepts-conformance.md` | COMMIT |
| `W18-W40/shell-home-375.png` | `AX/audit/W18-storybook-ia.json` | COMMIT |
| `W18-W40/shell-mobile-sheet-375.png` | `AX/audit/W18-storybook-ia.json` | COMMIT |
| `W18-W40/substrates-blob.png` | `AX/audit/W18-storybook-ia.json`, `AY/audit/design/FD-storybook.md`, `BA/audit/fleet/precepts-conformance.md` | COMMIT |
| `W18-W40/substrates-fourier-field.png` | `AX/audit/W18-storybook-ia.json` | COMMIT |

### `W46/` (4 pngs) — CITED ⇒ COMMIT

The W46 blob-live-truth-tune capture manifest `docs/tranches/AX/audit/W46-blob-live-truth-tune.json`
references all 4 by basename; the AFTER-calm/mobile pair is additionally cited in the AY blob hardening
docs + wave specs + the goo-blob component RESEARCH.md.

| png | citations | verdict |
|---|---|---|
| `W46/blob-default-AFTER-calm.png` | `AX/audit/W46-blob-live-truth-tune.json`, `AY/audit/hardening/{H-gaps-master,H-blob}.md`, `AY/audit/visual/W-BLOB2-DELTA.md`, `AY/waves/AY.W-BLOB{1,2}.md`, `src/components/custom/goo-blob/RESEARCH.md` | COMMIT |
| `W46/blob-default-AFTER-dark.png` | `AX/audit/W46-blob-live-truth-tune.json` | COMMIT |
| `W46/blob-default-AFTER-mobile.png` | `AX/audit/W46-blob-live-truth-tune.json`, `AY/audit/hardening/H-blob.md`, `AY/waves/AY.W-BLOB1.md`, `src/components/custom/goo-blob/RESEARCH.md` | COMMIT |
| `W46/blob-default-BEFORE-overbright.png` | `AX/audit/W46-blob-live-truth-tune.json` | COMMIT |

### `W36/` (8 pngs) — ORPHAN SCRATCH ⇒ DELETE

ZERO basename citations anywhere. The W36 forced-colors evidence that IS cited is the tracked flat
`W36-forced-colors-desktop.png` (referenced by `W36-DELTA.md`); the `W36-forced-colors-skin.json`
audit-ledger references no png at all (it is a verdict json, 0 `.png` mentions of these basenames).
These 8 are raw before/after/dots forced-colors-emulation scratch from the W36 live pass — never wired
into a ledger row.

| png | citations | verdict |
|---|---|---|
| `W36/after-whc-1280x800.png` | none | DELETE |
| `W36/after-whc-1440x900.png` | none | DELETE |
| `W36/after-whc-375x667.png` | none | DELETE |
| `W36/before-normal-1280x800.png` | none | DELETE |
| `W36/before-normal-1440x900.png` | none | DELETE |
| `W36/before-normal-375x667.png` | none | DELETE |
| `W36/dots-after-whc.png` | none | DELETE |
| `W36/dots-before-normal.png` | none | DELETE |

### `W44/` (2 pngs) — ORPHAN SCRATCH ⇒ DELETE

ZERO basename citations anywhere. The W44 dark-contrast evidence that IS cited is the tracked flat
`W44-notification-desktop-{dark,light}.png` (referenced by `W44-DELTA.md`); the
`W44-dark-mode-semantic-token-contrast.json` audit-ledger references 0 pngs. These 2 are raw
before/after dark-destructive-alert scratch from the W44 live pass.

| png | citations | verdict |
|---|---|---|
| `W44/after-dark-destructive-alert.png` | none | DELETE |
| `W44/before-dark-destructive-alert.png` | none | DELETE |

## Summary

| dir | count | verdict |
|---|---|---|
| `W18-W40/` | 12 | COMMIT (all cited — the W18 IA capture set) |
| `W46/` | 4 | COMMIT (all cited — the W46 blob-truth capture set) |
| `W36/` | 8 | DELETE (orphan forced-colors scratch — 0 citations) |
| `W44/` | 2 | DELETE (orphan dark-contrast scratch — 0 citations) |
| **total** | **26** | **16 COMMIT · 10 DELETE** |

## Orchestrator git sequence (the disposition — agent NEVER stages/commits)

```sh
# COMMIT the 16 cited pngs (the evidence must resolve on a fresh clone)
git add docs/tranches/AX/audit/visual/W18-W40/*.png \
        docs/tranches/AX/audit/visual/W46/*.png

# DELETE the 10 orphan-scratch pngs (untracked → plain rm, nothing to unstage)
rm docs/tranches/AX/audit/visual/W36/*.png \
   docs/tranches/AX/audit/visual/W44/*.png
# (the now-empty W36/ + W44/ dirs are git-immaterial — git tracks no empty dirs;
#  rmdir them if a clean working tree is wanted)
rmdir docs/tranches/AX/audit/visual/W36 docs/tranches/AX/audit/visual/W44 2>/dev/null || true
```

After this disposition: `git ls-files --others --exclude-standard
'docs/tranches/AX/audit/visual/*.png' 'docs/tranches/AX/audit/visual/*/*.png'` returns ZERO, and the
`proof:claude-structure-sync` png-integrity assert (every on-disk un-ignored visual png is
`git ls-files`-tracked) flips GREEN — closing the on-disk-but-untracked class mechanically.
