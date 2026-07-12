# BI.W-MATH-PAPER-REMOVE — delete the overfit /compositions/math-paper demo

Band B8 (prunes + consumer-truth). PRUNE. Demo-only. Born-nothing (a clean deletion).

## §Mandate

Discharges:
- **UF-K3** — "/compositions/math-paper is overfit and needs to be removed." (PRUNE; user + audit agree,
  FAM-10).

## §Design

Decided (UF-K3, FAM-10 "math-paper remove — user + audit agree"). math-paper is a single-idiom specimen
(the fira-code math block + section-accent rail on a paper grain) that earns no category slot — it demonstrates
a CSS idiom already covered by the paper/grid vocabulary, not a composed scene. Clean break: delete the story +
its manifest row + its route; the fira-code/section-rail idiom survives as the documented recipe (design-idioms
`.paper-ink-mark` + the math-paper CSS), not a standalone demo page.

## §Work

- DELETE `demo/stories/compositions/math-paper.vue`.
- `demo/stories/manifest.ts:1273-1275` — remove the `s("compositions", "math-paper", …)` row + the
  `FOLDED_STORY_IDS`/route entry (`:358`).
- Confirm no other story links to `/compositions/math-paper` (the nav is manifest-derived; the deep-link
  redirect for any bookmarked path is W-FOLDED-REDIRECTS's — a math-paper id resolves to the compositions
  landing, not a 404).

## §Acceptance

Gate: **`proof:demo`** (the compositions-census arm — the manifest row count matches disk).
- **BORN-RED at HEAD**: `math-paper.vue` + its manifest row exist (the overfit-single clause reds until deleted).
- MP1 — `math-paper.vue` DEFINITION-ABSENT; no manifest row / route references `compositions/math-paper`.
- MP2 — no dangling import of the deleted story (the census + the differential-close read the pruned demo).
- Self-test bite: a re-added `math-paper` manifest row with no backing SFC reds the census.

## §π/DELTA

No standalone π (a deleted demo paints nowhere). The census RED→GREEN differential + the W-FOLDED-REDIRECTS
deep-link resolution are the evidence.

## §Obligations

- No cross-repo ask (demo-only; zero `src/` surface — math-paper composes no exported component uniquely).
- Feeds **W-STRUCTURE-RESEQUENCE** (STRUCT-12: the pruned demo story must be gone BEFORE the structure census
  reads demo/ for G1).

## §Dispositions

- Terminalizes **UF-K3**: DELETED. Liveness probe: a re-added `math-paper` story with no backing SFC REDs the
  demo census.
