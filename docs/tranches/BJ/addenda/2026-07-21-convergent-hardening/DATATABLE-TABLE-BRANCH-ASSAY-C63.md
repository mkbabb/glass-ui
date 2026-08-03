# DataTable versus Table branch assay — C63

Date: 2026-07-22 EDT

Phase: **Browser formation comparison only**

Execution authority: **none**

Verdict: **ASK-8 RESOLVED TO KEEP / THIN DATATABLE · RESPONSIVE QUALITY RED**

## Purpose

C62 systems critic A correctly rejected import presence as sufficient evidence
for DataTable survival. This bounded comparison asks the frozen ASK-8 question:
does DataTable own distinct semantic work that a plain Table composition cannot
replace at lower total complexity, or should it fold into Table?

The comparison uses the live canonical Table and DataTable stories in two
independent in-app Browser tabs. It does not use a route-inventory script and
does not award source-to-served, package, Safari/VoiceOver, or acceptance
credit.

## Frozen source cursor

Glass commit: `0371836dfeeb3b7982250d612f93b5347a1d29d4`

Tree: `97b386172a899ef43b686ffbe43263395b3a7744`

| File | SHA-256 |
|---|---|
| `demo/stories/data/data-table.vue` | `a4bbcb9f3b7ea2036e3448131ba49f0dd993155f31779c3338adecab4294ef17` |
| `demo/stories/data/table.vue` | `d2ee4f0f9af83457db8dabf4af11c223e334c908af5d99439cb837e14ff79283` |
| `src/components/data-table/DataTable.vue` | `b801596f81fce24f2e324a82f9c9a4378852560650c6a9651d47109d032f4cce` |
| `src/components/table/Table.vue` | `268c7f8075dd314b1cdcd1a43f23b214567e6d7f0aa01a447da866e0d9fcbcad` |
| `src/components/data-table/index.ts` | `adc72c49ea8e175c192d1df52b84fe97e88a88dd5114c2ed05d54ad68f91e110` |
| `src/components/table/index.ts` | `204bffa2213ed550551689393ce93e2bdfe8ba536402e5935197683aea3b4e94` |

The live page remains a mutable source-aliased dev-server observation. The
source hashes identify the inspected mechanism; they do not prove served-byte
equality.

## Retained Browser frames

| Assay / state | Actual MIME and dimensions | SHA-256 |
|---|---|---|
| A, Table desktop full page | JPEG, 1440×900 | `1524e59ee23fecd8efc81008cd147550e8b92977686e0763abd3617be3dd5697` |
| B, DataTable desktop full page | JPEG, 1440×900 | `0a00ee96bafbe1eb84aaf30cdd9d34b9e6272627274acbc5531d2d2caab3c6f1` |
| A, DataTable data+narrow, true mobile | JPEG, 390×844, DPR-3 emulation | `d4d4e4a024b50d866116d4babcf27f5efbb548a3d0c8075fb8b99842df2377a9` |
| B, Table mobile | JPEG, 390×844, DPR-1 coarse/no-hover | `8355b38a64d194aa0fdec20e4c218a04adf859c8f2494e646d99eac93bd649cb` |
| B, DataTable virtual+narrow mobile | JPEG, 390×844, DPR-1 coarse/no-hover | `c9c3165ed40d9583eb7ccd5afcc0e0691c97feb5910443ec7a6074a154ce97f3` |
| A, DataTable loading mobile | JPEG, 390×844, DPR-3 emulation | `3be900160cf74a9f18b6c56b41dc9505cd27b224dbccdb9e0f9f73dd69864d31` |

Artifacts are retained under
`evidence/browser-data-table-c63/`. Earlier 416px visible-pane crops and a
mislabelled 390px file are excluded from credit; only the exact full-page and
mobile identities above govern.

## Distinct jobs proven in the natural stories

Plain Table exposes a semantic HTML table, caption, header/body rows, status
cells, totals, overflow, and an empty row. Its natural mobile frame preserves
the table but wraps status chips letter-by-letter and clips the amount column.
It owns structural table semantics, not an interaction model.

DataTable exposes a controlled interactive grid/list model with:

- sortable column-header buttons;
- selected row identity and Arrow/Enter/Space instructions;
- per-row Inspect actions;
- caller-controlled filter state;
- explicit data, virtual, loading, empty, and error states;
- disabled input during non-data states;
- an alert in the error state;
- wide versus narrow projection controls; and
- a virtual narrow projection that changes from grid rows to listbox options
  with term/definition card anatomy while preserving row/action identity.

The second Browser tab independently reached the virtual listbox/card state and
the empty state. The first independently reached loading and error. This is
semantic work beyond Table markup. Folding it into Table would either burden
Table with a grid state machine or make each consumer recreate selection,
sorting, status, keyboard, responsive projection, and row identity. Both have
higher total ownership cost than a bounded DataTable shell over Table-grade
primitives.

The exact Atlas `SourceDataBrowser` receiver therefore corroborates a distinct
job; it does not, by itself, decide it.

## Quality failures and thinning boundary

Survival is not acceptance. Both families fail the current mobile
edge-efficiency law:

- plain Table wraps compact status labels vertically and clips the terminal
  amount column;
- DataTable's ordinary data+narrow state remains a squeezed grid whose Issues
  and action edge are clipped;
- the virtual card projection is semantically stronger, but its Inspect action
  is cut at the right edge and the fixed demo Dock covers the lower card; and
- loading produces an empty status seat in the semantic snapshot, while empty
  is a generic message and still needs its intended status/announcement policy.

The final formation decision is therefore:

> **KEEP / THIN DataTable.** Preserve one controlled interactive-grid/list
> shell, stable row identity, sorting/selection/action/status model, and a
> single responsive projection owner. Reuse Table-grade structural primitives
> where semantics are table-like. Remove duplicate presentation branches,
> callback/ref churn, or story-only options that do not survive the exact Atlas
> receiver and Browser matrix. Do not make Table a data-grid engine.

## Born-RED branch detector

The later execution must turn RED when any mutation:

1. removes DataTable and forces the Atlas receiver to rebuild its state machine;
2. pushes sort/selection/virtual/status/responsive behavior into Table;
3. changes projection while losing row key, selection, focused nested action,
   name/value, or reading order;
4. clips the terminal field/action or hides it under the Dock at 390×844;
5. keeps the same behavior in two responsive render loops; or
6. claims survival from import presence or rest frames without the state matrix.

Closure still requires desktop/mobile data, virtual, loading, empty, error,
sort, select, Inspect, keyboard, AT, zoom/RTL, focus across projection, stable
row identity, package, installed consumer, actual Safari/VoiceOver, and
immutable served-byte proof.

No product, source, test, gate, package, lock, consumer, repin, release, or
acceptance change is authorized by this receipt.
