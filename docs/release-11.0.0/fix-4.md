# glass-ui 11.0.0 — fix 4 (before critic 4)

The fix seat on `release/11.0.0`, run by claude-opus-5-5. It read every record in this
folder and cured both critique-3 defects at their root. Every build, test and browser run
went through `~/.claude/guard/guarded`, and the WebKit run used `--exclusive webkit`. The
guard refused nothing. The one WebKit run (the shell-identity spec) queued for the
machine-wide lock behind other sessions for about 98 minutes and never started; I stopped
it, so it did not run (see the gates table). The chain script, logs and JSON reports are in `fix-4/`.

## Commits

| commit | what |
| --- | --- |
| `866575cc4` | D1 and D2: MIGRATION.md and README.md lose every internal id; two design docs and one spec comment stop describing deleted tokens as current; the witness `tests/docs/consumer-prose.test.ts` |
| `a2e39ef7d` | one MIGRATION sentence (the 10.0.0 intro) says why its one paint row counts as a break |
| `67671f974` | `.bundle-ratchet` rebind 2963459 → 2897947 (−65,512 B), from the committed-tree build of `a2e39ef7d` |

## D1 · internal ids shipped in MIGRATION.md and README.md (moderate)

**The cause.** MIGRATION.md had grown as a working record: amendment brackets dated and
tagged with change ids, wave and band names in headings and lead-ins, gate names, record
paths and sibling-repo bookkeeping. It ships in the tarball, so all of it reached
consumers. README.md carried one such bracket.

**The cure.** The whole file, not only the preamble and 11.0.0, which the round-3 note
puts in scope ("anywhere in MIGRATION.md"):

- every `[YYYY-MM-DD · …]` and `[CORRECTION YYYY-…]` bracket is gone. Where a bracket
  carried a fact a consumer needs (a successor that later left, an option that went
  inert at 9.0.0, a peer that stopped being a peer), the fact stays as a plain sentence;
  where it only recorded when or by whom something was written, it is deleted;
- the "UNRELEASED → LIVE" status blocks of 10.0.0, 9.0.0 and 8.1.0 are replaced by one
  plain line each (8.1.0 says it never published and shipped inside 9.0.0);
- the sections that were record prose throughout are rewritten as what a consumer sees
  and changes: 5.0.0's retirements and folds (the vizzes, `/virtual`, `/border-progress`,
  `/scrolling-text`, the dock fold, Popover, ContextMenu, MultiSelect, Chip, `CardTier`,
  `surface="clear"`, the Sheet fold, `Button` tone, the synonym renames, `GlassPanel`, the
  transition and weight tokens), 4.1.0 through 3.10.0, the 4.0.0 reconciliation and break
  list, and the v1/v2/v3 guide. The MultiSelect entry now says plainly that no
  `Combobox` component exists, instead of a struck block naming one; the two demo-only
  storybook entries (no consumer API) are dropped;
- headings lose their wave ids (`## 2.0.0 (AI.W1 R3)` → `## 2.0.0 — motion subpath
  surgery`, `## BA → 4.0.0 …` → `## 4.0.0 — the rebuilt dark register`, `## BG — …` →
  `## 5.0.0 — the glass standardization`);
- every removal-table row keeps its backticked first cell, so `verify:package`'s
  published-roster check still finds each removal (291/291).

The file is 4,401 lines, down from 5,048. README.md:171 keeps its corrected sentence and
drops the bracket.

**The witness.** `tests/docs/consumer-prose.test.ts`, "shipped prose carries no internal
ids", scans MIGRATION.md, README.md and the CHANGELOG 11.0.0 entry for seven families
(change ids, work-item ids, line and band ids, release-line codes, dated record brackets,
record paths, record vocabulary) and prints file, line and text on a hit. A self-check
arm plants one line per family and asserts each is found, and that plain prose that
shares letters with an id ("hidden from AT", "every AA contrast ratio", "the dock seat")
is not. Red at the parent tree (`fix-4/prose-red.log`: MIGRATION.md 607 hits, README.md
1); green on the cure (`fix-4/prose-green.log`, 7/7).

## D2 · live docs and one spec comment described deleted tokens as current (minor)

**The cure.**

- `docs/design/tunable-anim.md`: the `--tab-indicator-max-stretch` row is gone.
- `docs/design/affordance-map.md`: DRAG-MORPH says `useLiquidFlex` is capped by
  `useDragMorph`'s `maxStretch` getter (default 1.08, as the source has it), and that the
  tab pill and the DockLayerGroup rail follow at their own size with no squish
  (`useTabDragMorph` writes none); the SegmentedTabs pill row reads "glides at its own
  size; no squish on travel or drag".
- `tests-visual/shell-identity.spec.ts`: the comment now says a hover changes fill and
  gleam and no dock control scales on hover. No assertion changed.

**The witness.** The same test file, "the live design docs describe 11.0.0's tunables":
for each of the three files, no line outside a `~~strike~~` names
`--tab-indicator-max-stretch`, `--scale-hover-dock` or `squish-on-travel`. Red at the
parent (all three fail, `fix-4/prose-red.log`), green on the cure.

## Gates (committed tree)

The chain (`fix-4/chain.sh`, log `fix-4/chain.log`) ran on the committed tree of
`a2e39ef7d`. Only `verify:package` was re-run after the rebind, since `67671f974`
changes `.bundle-ratchet` alone.

| gate | result | exit |
| --- | --- | --- |
| `npm run build` | built | 0 |
| `npm run typecheck` | clean | 0 |
| `npm run demo:dist:build` | built | 0 |
| `vitest run --maxWorkers=2` (after the demo build) | 270 files; 2511 passed (seven more: the new file), 10 expected fail, 1 skipped | 0 |
| `npm run verify:package` before the rebind | `G-BUNDLE-RATCHET` shrink 2897947 < 2963459 (`verify-package.log`) | 1 |
| `npm run verify:package` at `67671f974` | CLEAN; ratchet 2897947, `equal: true`; roster 291/291; keyframes.js 6.3.0 under `^6.0.0` (`verify-package-2.log`) | 0 |
| atlas pack-and-import smoke (fresh pack) | ATLAS SMOKE GREEN; `--radius-circle: 50%`, `--radius-bar: var(--radius-panel)` | 0 |
| `shell-identity.spec.ts`, Chromium (`chromium-headless-new`) | 3 failed: "the ℱ home control must be present" | 1 |
| `shell-identity.spec.ts`, WebKit 2287 (`fix-4/shell-identity-webkit.config.ts`) | not run: queued behind other sessions' WebKit runs from 01:55 to 03:33, then stopped by this seat; not refused | — |

**The shell-identity spec is dead, and was before this release.** It looks for
`a[aria-label="glass-ui home"]`, the ℱ home control on the demo docks. That control left
the demo long before 10.1.x (`git log -S` finds its removal at `8bf41d0bc`), and
`git grep 'glass-ui home'` over `demo` and `src` finds nothing at `v10.1.4`, at master
`0d987344c` or at the U line's `373ed8aba`. No release spec set includes it (the 10.1.3
and 10.1.4 sets, the U line's `u-b7.spec.ts` and the B7 shape set do not). This pass
changed only a comment in it. I ran it in Chromium, where it fails on the missing control,
as it does at every parent. The WebKit run never got the lock, and its result would show
the same missing control, because the control is absent from the demo source. Retiring or rewriting the
spec is outside these two defects; I name it for the orchestrator.

Not re-run, since no file they read changed (this pass touched prose, docs, one spec
comment and one new unit test): the 10.1.3 and 10.1.4 release specs, the U line's
`u-b7.spec.ts` and the B7 shape set. Critique 3's runs at `b7b27fce6` stand: 83 passed in
Chromium; 73 passed and 10 skipped in WebKit 2287; 21 + 56 passed in Chromium for the U
line; 76 passed and 2 skipped in WebKit.
