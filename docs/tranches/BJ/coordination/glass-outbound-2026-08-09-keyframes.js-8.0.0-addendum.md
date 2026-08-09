# glass-ui → keyframes.js — the 8.0.0 consumer addendum (BK #76 W-CONSUMER-BAND)

**From** glass-ui BK Φ6/7 row #76 (W-CONSUMER-BAND) · **date** 2026-08-09 · **spec of
record** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:226` (row 76)
+ `:399` §C — full per-repo ledger **CWT-3 §4** (cited, never restated) · **precedent**
the #85 outbound form at `glass-outbound-2026-08-08-easing-consumer-addenda.md`.

Under the consumer-updates ruling, **consumer dependence never preserves an obsolete
API**: glass-ui 8.0.0 is cut and published (tag `v8.0.0` at `17a11bc5`); each consumer
updates via a marked addendum in ITS OWN tranche. This file is that addendum's inbound
half. **No edits were made in keyframes.js** — every row below executes there, on their
schedule.

Repo state at the census (2026-08-09, read-only):

| checkout | branch | dirty | live tranche | glass-ui manifest |
|---|---|---|---|---|
| `/Users/mkbabb/Programming/keyframes.js` | `master` | 252 | V | **UNDECLARED** (0 entries in `package.json`, 0 in `package-lock.json`; installed `node_modules/@mkbabb/glass-ui` = **7.0.0**, a real directory, mtime Jul 16) |
| `/Users/mkbabb/Programming/keyframes-v-exec` (mirror; the ledger also names a `keyframes-working-mirror` declared-6.0.0 root, TR row 76 D-1) | `master` | 0 | V | `package.json:77` `"@mkbabb/glass-ui": "7.0.0"` (devDependencies) |

---

## Row 1 — **THE S1 CURE, FIRST, per the §C cell**

`@mkbabb/glass-ui` is an **undeclared dependency** on the primary checkout: 7.0.0
installed on disk, **zero** manifest and **zero** lockfile entries — a clean `npm ci`
installs nothing and every import below dies. Six BK lanes confirmed this independently
(CWT-3 §4, `:134`); the #85 easing addendum already carries the same order at its §3.
The 2026-08-09 walk adds the finding's edge: **the mirror declares it**
(`keyframes-v-exec/package.json:77`) while the primary does not — the divergence is
itself the defect. **Declare `@mkbabb/glass-ui` (now `^8.0.0`) in `package.json` + lock
before adopting anything below.**

## Row 2 — `./forms` → `./input` (10 edges, 5 per checkout)

`./forms` is retired at 8.0.0 (`MIGRATION.md:21`): it was a hand-curated union, and the
rule is now one subpath per public component — the four doors are `./input` ·
`./textarea` · `./checkbox` · `./radio-group`. Every keyframes edge imports `Input`
only, so the whole migration is `/forms` → `/input` at:

keyframes.js (master):
- `demo/scenes/cube/matrix-editor/MatrixEditor.vue:98` — `import { Input } from "@mkbabb/glass-ui/forms";`
- `demo/components/instrument/transport/channel-controls/LayerConfigPanel.vue:75` — `import { Input } from "@mkbabb/glass-ui/forms";`
- `demo/components/instrument/shell/SharePopover.vue:53` — `import { Input } from "@mkbabb/glass-ui/forms";`
- `demo/components/instrument/keyframes/KeyframeCard.vue:58` — `import { Input } from "@mkbabb/glass-ui/forms";`
- `demo/components/instrument/timeline/KeyframeTimeline.vue:171` — `import { Input } from "@mkbabb/glass-ui/forms";`

keyframes-v-exec (mirror) — the identical file:line set:
- `demo/scenes/cube/matrix-editor/MatrixEditor.vue:98`
- `demo/components/instrument/transport/channel-controls/LayerConfigPanel.vue:75`
- `demo/components/instrument/shell/SharePopover.vue:53`
- `demo/components/instrument/keyframes/KeyframeCard.vue:58`
- `demo/components/instrument/timeline/KeyframeTimeline.vue:171`

Sum check (cluster D, quoted): "5 = pinned 5 ✓" per checkout.

## Row 3 — the new peer

8.0.0's `peerDependencies` add **`vue-component-type-helpers: ^3.0.3`** — it lands on
every consuming project at the adopt.

## String-literal class

**Zero** in this repo. The five constellation blind-spot edges (atlas-active vi.mock ×2,
words vite ×2, speedtest vite ×1) all live elsewhere — enumerated at
`docs/tranches/BK/execution/2026-08-09-row66-close/RECORD.md` §A1 and carried in those
repos' addenda.

## Not restated here

The rest of keyframes.js's ledger — cartoon → `.cartoon-surface`, `hideIndicator` KEEP
(REFUSED deletion; PR-07 unblocked by #81's F1 gutter cure), easing ×5 (the #85
addendum is that inbound half), track tokens, header-ribbon inline, the ✦³
metric-family migration (`SequenceTarget.vue:138` → the family API at `./metric`,
ON-7.x BLOCKING class), ⊕⁴ U-14's `Oscillator`/`waveformValue` booking — is **CWT-3 §4
+ TERMINAL-ROSTER.md:405**'s cell, cited whole.

## Owed back to glass-ui

Nothing blocking. A selector or symbol this cut broke that is not listed above replies
on this thread and enters #76's routed table, never a silent consumer-side fix.
