# AZ.W-CARVE — the central-CSS carve: dock-controls.css + theme.css drain the god-module ratchet

**Track:** Z (hygiene) · **Type:** structure (style carve, behavior-isomorphic) · **Repo:** glass-ui
**Depends on:** Batch 0 (AZ.W-GATES — the manifest repair lands first so the re-pointed gates run on a sound runner) · coordinates with AZ.W-REGISTER-IOS + AZ.W-DOCK-RAIL (both edit dock-controls.css content — this wave moves ONLY file boundaries; sequence AFTER their batch lands or run in a sibling worktree with a structure-only diff).
**STATUS: SPEC**

The two surviving over-bound CENTRAL stylesheets drain their `RATCHET_BASELINES` rows
(`scripts/proof-no-god-module.mjs:48-57`): `styles/dock-controls.css` frozen at **636** (raised
621→636 at the AY close for the user-audit dock-chrome growth — the re-freeze note in the baseline
says "the carve target is unchanged") and `styles/theme.css` frozen at **530**. The carve is the
booked successor those BOOK(AY.W-CSS1) rows name. The precedent is shipped twice over: `dock.css` is
a thin `@import` root over `dock/{shell,morph,density,layers,layer-group,overflow}.css` (AX.W06) and
`glass.css` over its carved partials (AY.W-CSS1) — cascade-order-safe partials, each < 500 lines,
the root keeping ONLY the `@import` lines + the cascade-order header.

## §0 — RE-GROUND (step-0, mandatory)

Re-grep before any edit — the dock band batches 1–2 will have edited dock-controls.css content:

```
wc -l src/styles/dock-controls.css src/styles/theme.css
grep -n "RATCHET_BASELINES" -A 14 scripts/proof-no-god-module.mjs
grep -ln "dock-controls" scripts/proof-*.mjs        # the composed-read re-point set
grep -n "@import" src/styles/index.css               # the cascade order the carve must preserve
```

The gate list reading `dock-controls.css` at authoring HEAD (re-confirm; each needs the
composed-read re-point — the same carve-aware pattern as `proof:blob-config`'s
`RENDERER_FILES = [...]` joined read):

| gate script | why it reads the file |
|---|---|
| `proof-dock-controls-split.mjs` | LANDED clause — each control family's base rule lives in dock-controls.css |
| `proof-dock-css-carve.mjs` | the dock.css carve contract names it |
| `proof-dock-perfection.mjs` | hover-register witnesses |
| `proof-dock-region-model.mjs` | region rules |
| `proof-adaptive-glass.mjs` | the W55 tint-seam witnesses |
| `proof-animation-coherence.mjs` | easing-register witnesses |
| `proof-glass-material-unified.mjs` / `proof-liquid-glass-material.mjs` | material witnesses |
| `proof-no-god-module.mjs` | the ratchet rows themselves |
| `proof-gate-script-parity.mjs` | indirect (manifest bijection — no re-point needed) |

## §1 — The defect

D1 — `src/styles/dock-controls.css` is 636 lines (> the 500 hard bound), grandfathered. Five
control families share one monolith: `.dock-icon-button`, `.dark-mode-toggle-button`,
`.dock-tab-button` (+ tiers), `.dock-select-trigger`/`.dock-dropdown-trigger`, + the coarse-pointer
touch floor.
D2 — `src/styles/theme.css` is 530 lines (> 500), grandfathered: the `@theme` bridge block + the
dark-variant arm + the bridge aliases accreted into one sheet.

## §2 — Goal criterion

Both ratchet rows DELETED from `RATCHET_BASELINES` (the monotonic drain — empty is the close
state); every carved partial < 500 lines; the rendered CSS byte-isomorphic (the carve moves rules
across files in the SAME cascade position, never reorders within a layer).

## §3 — The carve

- `dock-controls.css` → a thin `@import` root over `dock-controls/{icon-button,dark-mode-toggle,tab-button,triggers,touch-floor}.css`
  (five families → five partials, the shared cross-control comma-groups staying at the root exactly
  as the dock.css carve kept the shared `:where()` four-state contract at ITS root).
- `theme.css` → `theme.css` (the `@theme` block root) + `theme/{bridges,dark}.css` partials, split
  at the existing section seams — ONLY if a cohesive seam exists; if the `@theme` block is one
  indivisible Tailwind construct (likely — `@theme` cannot span files), the theme arm instead
  documents the indivisibility inline and the row stays BOOK'd with that recorded reason (the
  honest fallback, not a forced mechanical split).
- The §0 gate set re-points to a COMPOSED read (`[root, ...partials].map(read).join("\n")`).
- `src/styles/index.css` cascade order unchanged (the root keeps its one import line).

## §4 — Completion criterion + the hard gate

`proof:no-god-module` GREEN with zero `styles/` ratchet rows (or theme.css alone, BOOK'd with the
indivisibility note); the full re-pointed gate set GREEN; `npm run build` emits byte-identical
`dist/glass-ui.css` (the isomorphism witness — diff the built CSS before/after); the visual fleet
(`proof:dock-perfection`, `proof:adaptive-glass`) green.

**Gate (extension, not new):** `proof:no-god-module`'s existing ratchet IS the gate — the carve
drains it. Bite: re-grow any partial past 500 → RED; re-add a ratchet row → the BOOK-marker assert
fires.

## §5 — Scope fence

File boundaries ONLY — zero rule edits, zero selector changes, zero token changes. The register
changes live in W-REGISTER-IOS/W-DOCK-RAIL; running this wave after theirs avoids cross-wave
conflicts on the same lines.

## §6 — Named successor

None — this wave closes the chronic. If theme.css proves indivisible, the BOOK note names no
successor (an indivisible `@theme` block is a terminal disposition, re-audited only if Tailwind
ships multi-file `@theme`).
