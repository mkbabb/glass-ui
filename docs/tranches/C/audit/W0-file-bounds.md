# C.W0.D — Plan Critical-Files Audit

Verifies every file in `C.md` §"Critical files" exists at the cited path and that wave-internal allow-lists are disjoint.

## Critical-files existence

All 11 source-tree files cited in §"Critical files" verified at master:

| Path | Exists | Notes |
|---|---|---|
| `src/components/custom/icon-tooltip/IconTooltip.vue` | ✓ | C.W1.A target |
| `demo/stories/StoryPage.vue` | ✓ | C.W1.B target; has WIP changes (kind discriminator for flat routes) |
| `src/styles/typography.css` | ✓ | C.W1.C target |
| `src/styles/theme.css` | ✓ | C.W1.D target |
| `src/styles/dock.css` | ✓ | C.W2.A target |
| `demo/layout/StoryPager.vue` | ✓ | C.W2.A target; has WIP changes (categoryLoc gating) |
| `demo/stories/compositions/dashboard.vue` | ✓ | C.W2.B target |
| `src/components/custom/rail/Rail.vue` | ✓ | C.W2.C target |
| `demo/stories/compositions/math-paper.vue` | ✓ | C.W3.A target |
| `demo/configurator/Configurator.vue` | ✓ | C.W3.C target |
| `index.html` | ✓ | C.W3.D target |

The aurora-playground rename in WIP shifted `demo/stories/compositions/aurora-playground.vue` → `demo/stories/aurora.vue`. C.W3.B/D targets need to point at the new path. Updating C.md.

## Cited line numbers

`theme.css:191-197` self-referencing block confirmed at exact lines. tokens.css primitives at `tokens.css:78-94`:
- `--radius: 0.625rem` (line 78)
- `--radius-xs/sm`: 4px
- `--radius-md`: 6px (NOT used in semantic mappings)
- `--radius-lg`: var(--radius)
- `--radius-xl`: 12px
- `--radius-2xl`: 1rem
- `--radius-pill`: 9999px
- Semantic primitive mapping (lines 88-94) — the canonical truth theme.css must match

C.md's W1.D originally proposed `--radius-md`/`--radius-full` — neither exists in tokens.css. Corrected mapping written into C.md to match tokens.css's actual primitive names (`--radius` and `--radius-pill`).

`Configurator.vue:150` — exact preset binding line confirmed (will re-read at C.W3.C dispatch time).

`math-paper.vue:37-40` — `.fourier-f` inside inline prose confirmed.

## Allow-list disjointness (per wave)

### W0 — read-only
All four sub-phases write to disjoint audit-doc paths. No source-tree writes.

### W1 — 4 parallel
| Sub-phase | Allow-list |
|---|---|
| W1.A | `src/components/custom/icon-tooltip/IconTooltip.vue` |
| W1.B | `demo/stories/StoryPage.vue` |
| W1.C | `src/styles/typography.css` |
| W1.D | `src/styles/theme.css` |

Disjoint ✓.

### W2 — 3 parallel
| Sub-phase | Allow-list |
|---|---|
| W2.A | `demo/layout/StoryPager.vue`, `src/styles/dock.css` |
| W2.B | `demo/stories/compositions/dashboard.vue` |
| W2.C | `src/components/custom/rail/Rail.vue` |

Disjoint ✓.

### W3 — 4 parallel
| Sub-phase | Allow-list |
|---|---|
| W3.A | `demo/stories/compositions/math-paper.vue` |
| W3.B | `demo/stories/aurora.vue` (post-rename) |
| W3.C | `demo/configurator/Configurator.vue` |
| W3.D | `index.html` + 5 aurora WIP files (commit) |

W3.B and W3.D both touch aurora-tree paths. Sequencing required: W3.D follows W3.B (W3.D commits after W3.B's mask edit lands). Document in PROGRESS.md at W3 dispatch.

### W4 — 1 sequential
Allow-list: `demo/.qa/` only. No source writes.

## Cross-wave overlap

`demo/layout/StoryPager.vue` is in WIP (modified content). C.W2.A rewrites the file. The WIP adds `categoryLoc` gating for flat routes (aurora). The W2.A rewrite must preserve the flat-route hide behaviour. Document in W2.A briefing.

`demo/stories/StoryPage.vue` is in WIP (kind discriminator in eyebrow). C.W1.B wraps article body in TooltipProvider — non-overlapping with the WIP edit. Layer cleanly.

## Gate phrasings — runtime evidence

All hard-gate phrasings in §"Hard gates summary" cite Playwright DOM evals, getComputedStyle, screenshot diffs, build exit codes, or file existence. No grep-only gates. ✓

## Verdict

Plan is internally consistent after the W1.D radius mapping correction. Aurora WIP paths confirmed. W2.A and W3.B/D need WIP-aware briefing notes. W3 sequencing needs documentation at dispatch.

W0 hard gate: PASSING after this audit lands and the radius mapping correction commits.
