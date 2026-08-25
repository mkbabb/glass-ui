# REDUCTION — the terminal table, authored defect-first

Two adversarial critics were run independently against the first reduction proposal. **Both rejected it**, on
disjoint grounds, and both were right. This document is the re-authored table. It records what the critics
killed so it cannot be re-raised, and it re-ranks the work against the only ordering that survives scrutiny.

Evidence base: `ROUND-1-FINDINGS.md` (136 findings, 30 blockers). Every census below was re-run by the lead
against HEAD; where a figure disagrees with an earlier draft, the figure here is the one measured last.

---

## 1. WHAT THE CRITICS KILLED

Recorded so a later round cannot re-mint it. Each row is refuted by a command, not by an opinion.

| killed claim | why it is dead |
|---|---|
| **The −6,000 LOC procedural restructure** — "four parallel uniform-bridge/wgpu stacks" | `src/composables/glass/webgpu/` **already exists at 1,228 LOC**, inside a 4,740-LOC shared substrate, and **all four fields already compose it** (verified: aurora, blob, constellation, fourier-field each import `composables/glass/webgpu`). The proposal proposed to build what is built. The residue on top is 1,921 LOC of per-shader uniform packing whose whole purpose is that the WGSL struct and the JS offsets are one declaration. Realistic ceiling ≈ **−800**, not −6,000. This was 46% of the headline. |
| Constellation belongs in that restructure | It has **no GPU stack**. `find src/components/constellation -path '*shader*'` → 0. It already composes `useCanvas2D`. Its own README says it owns no WebGPU/WebGL setup. |
| `expandable-container` → `dialog placement="fullscreen"` | Closed, it renders **in host flow**; open, the **same DOM subtree** teleports to body. Dialog mounts content only when open. The fold remounts every stateful child on expand — canvases, GL/GPU contexts, scroll position, uncontrolled inputs. That is the exact case the component exists for. |
| `scroll-progress-rim` → `progress variant="rim"` | Four hard incompatibilities: rim is an absolutely-positioned overlay, progress is an in-flow block; rim paints a **multi-stop gradient**, progress's typed input is documented "a valid CSS `<color>` ONLY — never a gradient"; rim fills by `clip-path` reveal, progress by `translateX` (which would drag the gradient with it); rim's marks carry a live opacity swallow. The source already records this divergence as adjudicated, not forked. |
| `search` → `<Input type="search">` | `Input.vue`'s root **is** the `<input>` — a void element cannot take an icon slot. Also moves search behind the heavy-peer fence: SearchBar is vueuse-free and root-barrel-eligible; Input is not. |
| `table` → `data-table` | `DataTable.vue:13,344,451` **imports and renders** Table. The "fold" merges a dependency into its dependent. Δ ≈ 0, not −127. |
| `alert` → a Surface recipe | Alert maps `announce` → `role="status"\|"alert"` + matching `aria-live`. Surface has no live-region axis. Deleting it externalises a correctness-bearing a11y contract to per-consumer hand-rolling. |
| `infinite-scroll` fold | 178 library lines become N copies in the world, each with its own root-margin bug. Line-count arbitrage across the repo boundary. |
| pager-dots / toggle-group adopt the shared selection engine "internal only" | pager-dots is a **virtualized numeric window** — it navigates to off-window indices, re-focuses after remount, and stops propagation to arbitrate against an ancestor embla. toggle-group has **no indicator at all** (`rg 'indicator\|slider\|--stretch' src/components/toggle-group/` → no output) and is a slot-projected reka compound; adoption is a public API break, not an internal change. |
| `useEdgeIndicator` subsumes `useSelectionIndicator` | `useLeadTrail` returns **1-D scalars** and measures nothing. `useSelectionIndicator` emits the selected item's **full two-axis border box** from a ResizeObserver, plus two squish channels. Opposite write paradigms. |
| `deck` deleted because "its keyboard paging is the selection engine's arrow contract" | `useDeckKeyboard` is a **global document listener** with PageUp/PageDown, Home/End, digit jumps and a focus guard, deliberately vueuse-free. The roving-focus machine is element-scoped over enumerated buttons. Delete deck if desired — but not for this reason. |
| `chip mode="static"` → badge, "breaks: internal only" | `tags-input/TagsInputItem.vue:23` renders `<Chip mode="static" size="sm">`. tags-input is a KEEP component, in src, and it breaks. Badge has no size axis and a closed 5-member tone enum against chip's open accent register. |
| dialog's placement axis becomes `{centered, fullscreen}` | One value is a position, the other is a size. An incoherent enum minted to avoid keeping a component. |

**Two structural errors the critics also caught, which corrupt any LOC-ranked plan:**

1. **The component count was wrong.** `ls -d src/components/*/ | wc -l` → 63 (**62 components** + `_shared`), not 60.
2. **The frontier was ranked by a metric that is one-third prose.** See §2 — this is the finding that reorders everything.

---

## 2. THE MEASUREMENT THAT REORDERS THE WORK

Lead census at HEAD, counting `.ts`/`.vue`/`.css`/`.mjs`, comments including block continuations:

| directory | files | non-blank | comment | code | comment share |
|---|---|---|---|---|---|
| `src/` | 660 | 80,117 | **31,539** | 48,578 | **39.4%** |
| `src/components/` | 479 | 52,932 | **18,018** | 34,914 | **34.0%** |
| `src/components/dock/` | 44 | 7,424 | **3,838** | 3,586 | **51.7%** |
| `src/components/aurora/` | 35 | 8,306 | 3,232 | 5,074 | 38.9% |
| `src/components/blob/` | 27 | 5,104 | 2,005 | 3,099 | 39.3% |
| `src/styles/` | 76 | 11,953 | **7,433** | 4,520 | **62.2%** |
| `src/styles/tokens/` | 20 | 4,172 | **3,039** | 1,133 | **72.8%** |
| `src/composables/` | 102 | 14,876 | 5,874 | 9,002 | 39.5% |

> **The comment stock in components alone (18,018 lines) is larger than the entire proposed reduction, and
> ~5× larger than its banked portion. `src/styles/tokens/` is 72.8% prose — the tokens are outnumbered
> three-to-one by commentary about the tokens. The dock is 51.7% prose.**

Three consequences, all load-bearing:

1. **No LOC-ranked frontier is valid until this is normalised.** "dock 7,974" is 3,838 lines of comment;
   "aurora 8,968" is 3,232. Ranking components by a number that is one-third prose is how a 74-line
   `budget.ts` leak got scored as a 21,000-line restructure.
2. **The prose pass beats the whole reduction plan** on lines, at zero API risk, zero consumer churn, no
   primitives, no fold order, and no greenfields.
3. **The prose is also where the lies live.** `DOC-1`…`DOC-14` and `G-3`, `G-4` are all failures of a corpus
   that describes code it no longer matches — including two gates that count commented-out CSS as live.
   Deleting stale prose and fixing gate detectors are the same wave.

---

## 3. THE CONSUMER CENSUS

62 components, 56,676 LOC. "src consumers" counts files outside the component's own directory that import
from it, **excluding the root barrel and `src/components/index.ts`** — a barrel re-export is not a consumer.

**42 of 62 components — 38,204 LOC, 67% of the component tree — have zero `src/` consumers.**

The giants, with the verdict each actually earns:

| component | LOC | src | demo | verdict |
|---|---|---|---|---|
| aurora | 8,968 | 0 | 23 | **KEEP, FIX THE PRIMARY.** 23 demo consumers is real use. Its defect is `F1`/`S0`, not its size. |
| dock | 7,974 | 0† | 18 | **REPLACE.** Owner ruling. †The 7 hits are *leaks inward*, not consumers — see below. |
| blob | 5,546 | 0 | 2 | **KEEP-THIN.** 2 demo stories for 5,546 LOC is the weakest ratio among the giants. |
| fourier-field | 2,885 | 0 | 2 | **EARN OR CUT.** |
| constellation | 2,442 | 0 | 2 | **EARN OR CUT.** |
| timeline | 2,254 | 0 | 4 | Owner-marked greenfield. |
| handmark | 2,231 | 0 | 1 | Owner-marked greenfield. ~~2,231 LOC for one story.~~ **[2026-08-25 · #51 W5 — STRUCK, not footnoted.]** The two columns are honestly labelled (`src` and `demo` are both in-repo by definition), but the verdict prose turned them into "one story" — an inference that silently treats the repo as the world. handmark also served **3 live call sites in atlas** (`AnimatedRule.vue:34`, `charts/glyph/HandMark.vue:26`, `useMarkMorphology.ts:40` type-only), which no column here can show. The reduction still stands on its merits (2,306 → **675 measured**, and the cut shipped — detector verbatim, `wc -l src/components/handmark/{HandMark.vue,stroke.ts,index.ts}` = 375 + 280 + 20 = 675; **435 was the charter *estimate* at `GREENFIELD-TERMINAL:912`, never a reading**, and it is corrected here rather than repeated), but it stood on a ground that was **incomplete rather than wrong**, and the difference showed up as four breaking deltas owed to a consumer this row implied did not exist. A LOC-per-consumer verdict needs a column for consumers it cannot see, or it must not name a count at all. |
| typewriter | 1,409 | 0 | 1 | **EARN OR CUT.** Never examined by any prior tranche. |
| easing | 983 | 0 | 1 | **DEMOTE.** |

> `constellation + fourier-field = 5,327 LOC serving four demo stories and zero src consumers.` No prior
> tranche asked whether they earn their keep. Ask it.

**The dock's 7 "src consumers" are the pathology, not a defence.** All seven are files reaching *into* the
flagship:

```
5 × from "../dock/composables/dockContext"   ← dropdown-menu, select, popover ×2, slider
1 × from "../dock/composables/useDockHold"   ← slider
2 × stylesheet imports                        ← styles/glass.css, styles/index.css
```

Five components depend on the component the owner condemned. **This is why the dock replacement must precede
the `useDockAwareSurface` extraction** — both critics reached this independently. Extracting the shared
surface first cements the contrived API into the shared layer before anyone replaces it.

---

## 4. THE ORDERED WORK

Defect-first. Each rung is justified by evidence, not by line count.

**0 — THE THINGS THAT ARE BROKEN FOR CONSUMERS RIGHT NOW.**
`CT-1` the root barrel hard-requires the peer it declares optional, so a README-conformant install throws.
`CT-2` the entire published type surface is empty under `node16`/`nodenext`. `BJ-1` `npm test` is RED at
HEAD and `release.yml` runs it immediately before `npm publish`. These ship broken today. Nothing else
matters until they are green.

**1 — THE ENGINE WE CLAIM AS FIRST-CLASS.** WebKit crashes 5/5 on every route, dev and bundled, blocked by
disabling CSS, one 318 KB stylesheet. Bisect it. Until this lands, every Safari verdict in `MOTION-CANON.md`
§8 is a prediction and no new primitive should ship. The largest single CSS contributor is the dock —
4,207 lines across 25 partials — which is also the thing being replaced, so the two waves inform each other.

**2 — THE DEAD PRIMARY.** `aurora-mediums.wgsl.ts:387-403`: mediums 3/5/6/7 all return `mediumKuwahara()`,
so four named mediums are one medium on the live WebGPU primary while the WebGL2 *fallback* carries the full
cascade. A primary that paints worse than its own fallback is the exact shape "no masking fallback" forbids.
This is also the empirical rebuttal to the killed restructure: **the library has already demonstrated, one
file over, what happens when you consolidate four field programs into one call.**

**3 — THE PROSE PASS.** 18,018 comment lines in components, 3,039 of 4,172 in tokens, 3,838 in the dock.
Strip to load-bearing. This precedes any LOC-ranked decision because it is the decision's input. It also
closes `DOC-1`…`DOC-14` (shipped documentation that lies about HEAD) and forces `G-3`/`G-4` (detectors that
read commented-out code as live).

**4 — THE DEMO IS THE PRODUCT SURFACE.** 88 of 98 landing cards resolve to the title-only `identity` floor
because only 4 of 120 `.tile.vue` files were ever authored. The ladder is correct and complete; the content
was never written. Cheap, and it is the first thing anyone sees.

**5 — REPLACE THE DOCK API.** The owner ruling, standing and unexecuted. 7,974 LOC, 51.7% prose, 14 props
of which four are object bags, 25 CSS partials, zero legitimate src consumers, five components leaking into
it. The primitive set is specified in `MOTION-CANON.md` §6 — five primitives, built on FLIP machinery the
library already owns, with `filter: url()` prohibited.

**6 — FROST THE GLASS.** Tabs and slider, the only two components the owner named for being aesthetically
wrong. Specular-led → blur-led: drop rim opacity, raise plate alpha, keep the 11px band. `MOTION-CANON.md`
§9 item 10.

**7 — THE MOTION CORRECTIONS.** Eight spring rows → six, `settleBand` per amplitude, the lead/lag rank
system, the material split law, exit asymmetry. `MOTION-CANON.md` §1–§7.

**8 — ONLY NOW, THE REDUCTION.** Re-derive the isomorphism classes **against `src/composables/glass/`
(4,740 LOC) as the starting state**, against comment-normalised line counts, and re-litigate whether
constellation, fourier-field and typewriter survive the consumer bar at all.

---

## 5. WHAT SURVIVES FROM THE ORIGINAL PROPOSAL

Both critics independently converged on this same short list. Take it; discard the frontier.

| item | evidence | Δ |
|---|---|---|
| `useDockAwareSurface` — the real leak set | 5 components import `dockContext`; slider imports `useDockHold` | — (**after** the dock replacement, not before) |
| `useTabRovingFocus` out of `components/tabs/` | `useSelectionGroup.ts:13` imports from a *component* tree — a verified layering inversion | pure move |
| `aurora/constants/budget.ts` → `composables/glass/budget` | 74 lines, 4 external importers | one commit |
| `_shared/feedback` tone consolidation | the file already exists; unify badge/chip/status-dot onto it | modest |
| sortable-list reduced-motion arm | `rg 'prefers-reduced-motion' src/components/sortable-list/` → **zero hits** across 1,128 LOC | small, real |
| delete `paper-backdrop` (20), `header-ribbon` (113), `animated-digit` (92) | zero src consumers, one demo each, trivial recipes | ~−225, subject to export-map surgery |

**Export-map surgery is owed and was never accounted.** `package.json` declares 72 subpaths. Every delete or
demote removes a published entry point plus its `typesVersions` row; `configurator` is additionally a
root-barrel export. No prior "what breaks" column named this.

---

## 6. THE STANDING EDICTS THE ORIGINAL PROPOSAL NEVER TOUCHED

Recorded because their absence is itself the finding.

- **BREATH OF LIFE** — no column, no rubric, no verdict anywhere on whether a component displays engagement.
  The frontier was ranked by size. Under this edict the first question of every KEEP row is *does this thing
  live?*, and it was asked zero times.
- **MOVEMENT OF MOMENTUM** — four of eight springs ship monotone while `springPresets.ts` promises every
  overshoot in a "touch of overshoot" band. `MOTION-CANON.md` §0 proves this is not a tuning bug but the
  table honestly refusing to ship a curve that cannot exist — and then fixes it properly by deleting the
  false claims and re-cutting six rows.
- **GOAL OF GLASS** — the owner named exactly three components as wrong: dock, tabs, slider. In the original
  table all three landed in KEEP rows with cosmetic deltas (−80, −40, −20). **Every explicit owner ruling
  landed in a KEEP row.** That is the single most damning line in either critique.
- **Safari and mobile first-class** — the reduction table had no CSS column at all, while the library does
  not render in a first-class engine.
