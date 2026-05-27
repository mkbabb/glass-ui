# Tranche AM — PROGRESS

Execution log for tranche AM (consumer-gap root-redress). Updated at wave boundaries. Plan basis — `docs/tranches/AM/AM.md`; per-wave specs at `docs/tranches/AM/waves/W<N>.md`.

Status vocabulary — PENDING / MET / MISS / ARCHIVED (2-consumer-gated, named realisation) / CLOSED (already-shipped, ledger-confirmed).

---

## AM.W0 — Packaging + token-AA + forms-a11y root fixes

- **Opens:** TBD
- **Closes:** TBD
- **Agents:** 2 disjoint (W0.1 packaging+token / W0.2 forms+dock a11y)

### Events

- _(none yet)_

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | PENDING |—|
| 2 | `tw-animate-css` in `peerDependencies` (+ optionalPeerDependencies hint); fresh-consumer Tailwind-v4 build clean | PENDING |—|
| 3 | `--muted-foreground` light rung ≥ 4.5:1 vs `--neutral-0`; dark companion clears its plate | PENDING |—|
| 4 | `<NumberFieldInput>` forwards `aria-label`/`aria-labelledby` from a `NumberField` prop (`inheritAttrs:false` + explicit forward) | PENDING |—|
| 5 | GlassDock trigger-aria contract exposed + documented (Slider unchanged) | PENDING |—|
| 6 | `audit/W0-token-contrast.md` + `audit/W0-forms-a11y.md` authored | PENDING |—|

---

## AM.W1 — Aurora ergonomics + adaptive render-mode

- **Opens:** TBD
- **Closes:** TBD
- **Agents:** 1

### Events

- _(none yet)_

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `npm run typecheck` + `npm run build` clean | PENDING |—|
| 2 | `<Aurora>` `config` optional, defaults to `DEFAULT_AURORA_CONFIG` (omit config → canonical look) | PENDING |—|
| 3 | `renderMode: "webgl" \| "css" \| "auto"` prop, default `"auto"`; `"css"` never arms WebGL yet paints the palette | PENDING |—|
| 4 | `"auto"` gates on device tier (`hardwareConcurrency ≤ 4` / `prefers-reduced-motion` / `saveData` → `"css"`) | PENDING |—|
| 5 | warm wash composites under every branch; `initStrategy:"deferred"` lazy path intact (Aurora never retired) | PENDING |—|
| 6 | `audit/W1-aurora-rendermode.md` authored (runtime probe) | PENDING |—|

---

## AM.W2 — Chunk-strategy confirmation + size disclosure + consumer-wiring docs

- **Opens:** TBD
- **Closes:** TBD
- **Agents:** 1

### Events

- _(none yet)_

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `profile-bundle.mjs` emits a per-subpath gzipped-size table | PENDING |—|
| 2 | `profile:budget --enforce` green | PENDING |—|
| 3 | `dist/glass-ui.js` does not transitively reach Aurora's standalone chunk (root-barrel shake proof) | PENDING |—|
| 4 | CLAUDE.md §Consumer wiring — Vite 8 `manualChunks` recipe added | PENDING |—|
| 5 | CLAUDE.md — subpath-import discipline note + Tabs-vs-ToggleGroup decision matrix added | PENDING |—|
| 6 | `audit/W2-bundle-disclosure.md` authored | PENDING |—|

---

## AM.W3 — Close — disposition ledger + overfitting audit + proof gates + FINAL

- **Opens:** TBD
- **Closes:** TBD
- **Agents:** 1

### Events

- _(none yet)_

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | §5 disposition ledger confirmed against HEAD — gaps 2/5 already-closed verified | PENDING |—|
| 2 | gaps 7/8/9/12 archived with named realisation conditions; gap 10 consumer-side recorded | PENDING |—|
| 3 | overfitting audit clean — every AM artefact ≥ 2 sites or exported or demo-private | PENDING |—|
| 4 | `proof:all` + `proof:resolution` + `verify-export-types` green | PENDING |—|
| 5 | `dist/` rebuilt (contract-v2 seam — muster picks up fixes) | PENDING |—|
| 6 | AM.FINAL.md authored with gate table + muster E.W8 handoff | PENDING |—|
