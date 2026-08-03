# MATERIAL W1 `31c01d2a` — visual, interaction, and consumer critic

**Critic seat:** independent Sol x-high visual/consumer judgment  
**Mode:** read-only exact-commit/source/test/build inspection plus supported Browser attempt; no
product, test, band, receipt, or other normative-document edit  
**Scope:** `BJ.W-RADIUS-ROLE`, exact commit
`31c01d2ab941597abfe283261ce05c042e1b7d25`  
**Verdict:** **DEFECT / ROLE-CANON RED / CONSUMER-VISUAL RED / INTERACTION-EVIDENCE
HOLD / SAFARI RED / FREEZE RED**

The commit contains a useful, mostly byte-identical cleanup: the misleading
`--radius-input` name is removed without an alias, the two zero-consumer k-rungs are deleted,
the SortableList insertion bar reads `--radius-pill`, and the InfiniteScroll story dogfoods the
library Button. Those bytes should be banked.

They do not constitute the Wave-1 contract. The exact wave still requires the two SegmentedTabs
raw-radius repoints and the F17 floating-search square cure; both remain born-RED in the commit.
The new “single authoritative” table is not authoritative over the live token system, contradicts
its own TagsInput ruling, classifies a real combobox input as media, and has no candidate-resident
role-correctness gate. The generic Skeleton consumer also demonstrates a concrete cascade defect:
its unlayered scoped `--radius-media` rule outranks caller `rounded-full` / `rounded-card` utilities,
despite the component test claiming geometry is left to the caller. Finally, the wave's own
Chrome+Safari, 390+1440, light+dark, focus/coarse/PRM paint matrix has no retained candidate
evidence. The supported Browser connection reported zero browser backends during this seat, so no
visual claim has been inferred from source or an unrelated automation surface.

This is a partial source candidate, not a converged W1 and not freeze input.

## 0. Reproducibility pins

At **2026-07-22 01:55:37 EDT**:

- commit: `31c01d2ab941597abfe283261ce05c042e1b7d25`
- tree: `60aa0d81a925b56280ff17d23a1aa9638a2a0fdd`
- parent: `8786d2c8c91f289abd3dc7290a4e0b869416b4f0`
- authored: `2026-07-22T01:44:11-04:00`
- ordered commit-patch SHA-256:
  `76b1d2fcac96540a1863bdaa5a6aeb82408b5b547847fd242f6b104a78a7b3f2`

Exact commit-object artifact hashes:

| Artifact | SHA-256 |
| --- | --- |
| `src/styles/theme/radius.css` | `a4c50852061d6b8a2c51f43c9eab317911172f9464f7b48d0f858cb18f5eb56d` |
| `src/components/avatar/styles.css` | `99815763aaf299110305e7f3f2ea0e1ec39e9bac2d85fccbfa6cfa6829f68d5b` |
| `src/components/command/styles.css` | `0da029dcc3638887dc3b4bef3c8ef891a6445822372a5da5f386a576c5b79084` |
| `src/components/skeleton/Skeleton.vue` | `018e7cf0454336f7ed3efeac9ea013c2a41a7580c165ca19edde5bb04c8a22f8` |
| `src/components/sortable-list/SortableList.vue` | `02736d77012472c4d77bd723689dc3abde35bd844abdbcc94714982c4381c179` |
| `demo/stories/data/infinite-scroll.vue` | `44c46ac992ebac0fd4e092d4988013d6bb4d306ed3c1946e13b99460dad28459` |
| `src/styles/tokens/manifest.ts` | `a88bfe8176750aeff468812fb567728f4b36d04d87f44f33fdbe5e70c23d2eb6` |
| `tests/gates/token-hygiene.test.ts` | `51985cad36950fe31760fa51429fafa9c7c115057dc077eaae5bfc3624ab4113` |
| `docs/tranches/BJ/waves/BAND-MATERIAL.md` | `4ae2bffdbc1ce3d24b32c6413e1b4a0029dfa020012b2159389da9b2bdc82178` |

The live worktree had the exact commit at `HEAD` but was materially dirty from later workflow work.
Its observation-only identity at the start of this critic was:

- porcelain-status SHA-256:
  `272339eb5785a87e8ac1f52c5062f92ebe5ccf1f546d73840dbc27a8596e547f`
- unstaged-diff SHA-256:
  `185a8a6f9ffdc9b5d82cf7dfb5ec5eddeead9322d4069d1405d3e73142656fac`
- sorted-untracked-path-list SHA-256:
  `fd23079ef166479d246ef157b2742c837e0074245c2c477a4b0e6f7cb7f65671`

All candidate claims below come from `git show <commit>:<path>`. Later dirty bytes receive no
candidate credit.

### Read-only checks

1. `npm run iter-check` — **PASS** on the observed live tree. This is compatibility evidence only;
   later dirty files mean it is not an isolated exact-candidate build.
2. Eight tracked component/gate suites — **42 PASS, 1 expected-fail, 1 FAIL**. The one failure is
   the exact W1 token-hygiene residue latch expecting the Drawer blur that later dirty W2 work has
   already removed. It is moving-tree contamination, neither an exact-W1 regression nor W1
   acceptance. Avatar, Command, Skeleton, SortableList, InfiniteScroll, drag-radius, and existing
   dialog-radius contracts passed their non-paint assertions.
3. The later untracked `tests/styles/radius-role-canon.test.ts` (SHA-256
   `f8d62aa9bd0b4a396fa77b8667c18a56303a82fe175caa5a1b5eec4b9f4af26d`) — **9/9 PASS**, but it is
   not in `31c01d2a` and is a false-green oracle described in §4. It earns zero candidate credit.
4. `git diff --check` — **PASS** on the observed tree.
5. Supported Browser setup succeeded, `getForUrl("http://localhost:5199/")` returned **“No browser
   is available”**, and the required troubleshooting/list step returned `[]`. No Playwright,
   Computer Use, or other browser fallback was used. Consequently there is **zero new UI acceptance**
   from this critic.

## 1. Verdict matrix

| ID | Status | Independent finding | Consequence |
| --- | --- | --- | --- |
| W1-V-01 | **PASS, narrow** | `--radius-input` is clean-renamed to `--radius-media`; exact source has no live old-token consumer and no compatibility alias. The terminal value remains `var(--radius)` (10px). | Bank the semantic rename and its byte-identical paint. |
| W1-V-02 | **PASS, narrow** | `--corner-k-soft` and `--corner-k-sharp` are removed; `--corner-k-squircle: 2` remains the live k-vocabulary. | Bank the net-negative cleanup. No visual delta is claimed. |
| W1-V-03 | **PASS, narrow** | SortableList's 5px insertion bar changes `999px` to `var(--radius-pill)` (9999px), which clamps to the same capsule. InfiniteScroll swaps its raw Reset button for `<Button size="sm">`. | Bank tokenization and dogfood; paint/interaction remain unproved. |
| W1-V-04 | **DEFECT / incomplete wave** | Exact `searchVariants.ts` still gives `floating` `rounded-none`; exact `segmented.css` still contains `0.3125rem` and `0.25rem`. These are explicit W1 Work and born-RED Acceptance items, not external niceties. | The commit's “land W1” posture is false. F17 and OPEN-1c remain within the W1 closure. |
| W1-V-05 | **DEFECT / canon truth** | The table calls itself the single authoritative role canon but omits live `--radius-button`, `--radius-strip`, `--radius-badge`, `--radius-dock`, `--radius-tab`, `--radius-dock-card`, and `--radius-tooltip`. It says action/control is a pill while a live ExpandableContainer action reads the omitted 10px `--radius-button`. | There is no single role authority; consumers and prose can disagree while all gates pass. |
| W1-V-06 | **DEFECT / internal contradiction** | The canon says “a pill never nests in a near-rect,” while the same wave accepts a `--radius-field` near-rect TagsInput containing pill `<Chip>` children as coherent. | F12 has no executable truth condition. A future implementation can satisfy either sentence and violate the other. |
| W1-V-07 | **DEFECT / consumer semantics** | `.command__input` is a real `RekaComboboxInput`, transparent and borderless, yet it is called a media/tile consumer and reads `--radius-media`. | The rename replaces one misnomer with a false role assignment; the declaration is presently paint-dead and becomes a latent coupling if the input gains a plate/clip. |
| W1-V-08 | **DEFECT / concrete visual cascade** | Skeleton's scoped style is unlayered and writes `border-radius: var(--radius-media)`. The demo supplies `rounded-full` for the avatar skeleton and `rounded-card` for the card skeleton from Tailwind's utilities layer. Normal unlayered author declarations outrank layered ones, so the consumer classes cannot own the computed radius. | The 48px avatar placeholder resolves to 10px corners rather than a 24px circle; the card request resolves to 10px rather than `--radius-card` (16px). The existing test checks only forwarded class strings and falsely says geometry is caller-owned. |
| W1-V-09 | **DEFECT / gate weakness** | Candidate token-hygiene detects only raw length literals in `src/`. It does not validate role choice, table completeness, demo dogfood, nested geometry, or computed cascade. Its `it.fails` arm intentionally keeps CI green while the two segmented violations survive. | Mutating Avatar to `--radius-pill`, Command to `--radius-dock`, Sortable to `--radius-card`, or restoring the raw demo Reset button does not red the W1 candidate gate. |
| W1-V-10 | **HOLD / Avatar** | The square Avatar keeps a fixed 10px radius at every size while circle and status geometry are separate. The rename is byte-identical, but no 390/1440 or light/dark capture proves that 10px remains proportionate at sm/md/lg or that the offset status plate composes cleanly at the square corner. | Do not infer proportion or concentric quality from the token name. |
| W1-V-11 | **HOLD / Command** | Existing tests prove keyboard selection/dismissal semantics, not focus paint or corner composition. The inline and Dialog forms need real focus-visible, empty/disabled, and nested plate checks. | Interaction semantics are useful credit; visual focus and nested corner harmony remain unproved. |
| W1-V-12 | **HOLD / Sortable** | Existing transaction and drag-radius helper tests pass. They do not paint the insertion capsule, ghost ring, touch handle, keyboard reorder, cross-list edge, or PRM posture at 390/1440. The global PRM tail statically shortens the shimmer, but no real receiver proves the static cue remains visible. | Bank logic, not visual/motion acceptance. |
| W1-V-13 | **HOLD / InfiniteScroll** | The library Button brings the correct pill, liquid press, focus, disabled, coarse scale, and glass material in source, but no mobile header-wrap, first activation, focus-ring, PRM, or reset-state capture exists. | The dogfood choice is directionally correct and still owes receiver proof. |
| W1-V-14 | **RED / Browser and Safari** | The band requires Chrome+Safari paint truth. The commit changes no retained evidence artifact, and this supported Browser attempt had no backend. | All 390/1440 × light/dark × rest/focus/coarse/PRM visual cells stay open; Safari fallback is not passed. |
| W1-V-15 | **DEFECT / GOAL OF GLASS** | The cleanup strengthens restraint, but the two surfaces most implicated by the user's glass judgment—SegmentedTabs and floating search—are exactly the deferred W1 defects. | The commit cannot claim the GOAL OF GLASS or “breath of life” outcome for Wave 1 while leaving the named visible failures untouched. |

## 2. The exact wave closure remains born-RED

`BAND-MATERIAL.md` is unambiguous:

- the W1 table names “fix the F17 floating-variant square” in the wave row;
- §Work includes the two SegmentedTabs literals and F17;
- §Acceptance requires the literals repointed and the floating field wearing its role radius;
- §π/DELTA requires before/after capture at the repoint sites, F15, F17, and F09/F12 in Safari and
  Chrome.

The exact commit instead routes both visible defects to a later design tier:

```text
src/components/search/searchVariants.ts:10
floating: "border-none bg-transparent p-0 rounded-none"

src/components/tabs/styles/segmented.css:169
border-radius: 0.3125rem;

src/components/tabs/styles/segmented.css:306
border-radius: 0.25rem;
```

That is not an acceptable split of a complete wave because these rows already have a design owner
and born-RED predicates. OPEN-1c is a decision gate, not authority to call the containing wave
landed. F17 is even sharper: the band explicitly removed it from the screenshot-drift class and
called it statically proven.

The token-hygiene latch records the incompleteness but masks it as an expected failure. At exact W1,
the expected residue is Drawer blur plus two SegmentedTabs radius entries. The suite can therefore
be green while the W1 radius gate remains deliberately RED. That is valid during execution and
invalid as terminal W1 evidence.

## 3. The “single authoritative” table is neither complete nor internally executable

The new table covers icon, control, field, card, dialog, panel, sheet, slider, and media. The same
file then declares several semantic rungs that the table never adjudicates:

```text
--radius-button:    var(--radius);       # 10px
--radius-strip:     0.75rem;             # 12px
--radius-badge:     var(--radius-pill);
--radius-dock:      var(--radius-pill);
--radius-tab:       var(--radius-pill);
--radius-dock-card: var(--radius-3xl);   # 24px
--radius-tooltip:   var(--radius-lg);    # 10px
```

This is not editorial harmlessness. The table says `control / field / mode / cta` resolves through
the stadium `--radius-control`, yet the live ExpandableContainer trigger is a control/action and
resolves through the omitted `--radius-button` at 10px. Button itself uses `--radius-pill` directly.
Tabs use `--radius-tab`; the vertical strip uses `--radius-strip`; Dock has two distinct shell
roles. A consumer cannot determine from the “single source” whether `--radius-button` is an allowed
exception, obsolete debt, or a conflicting authority.

The manifest does not repair this. Its radius list contains only a subset of the live semantic
rungs. The candidate gate also cannot repair it: token-hygiene answers only “is there a `var()`?” It
does not answer “is this the right role?” The prior one-to-one `proof:geometry-grammar` executable
identity was abrogated; no candidate-resident ordinary test replaces the role-selection and nesting
parts.

The minimum redress is not another prose paragraph. One canonical mapping must enumerate every
public/live semantic rung or explicitly retire/fold it, and an ordinary test must prove that each
named consumer selects its adjudicated role. A tokenized wrong answer must fail.

## 4. F12 is a direct contradiction, and the later untracked test preserves it

The new canon states:

> a card never nests inside a pill; a pill never nests in a near-rect

The same W1 wave calls this shipped pair coherent:

```text
.tags-input                     -> --radius-field (16px near-rect)
  <Chip>                        -> --radius-control / pill
```

That is literally a pill nested in a near-rect. The later untracked test makes the contradiction
machine-visible: its describe title is “a pill never nests in a near-rect,” then it passes by
asserting the near-rect TagsInput container and the nested pill Chip.

This is a false green, not a wording quibble. The owner must choose one coherent law:

- allow pill children inside a non-pill field and define the actual rule in terms of containment,
  inset, clipping, and role; or
- keep the prohibition and change the TagsInput outer/inner geometry.

Until that ruling exists, F12 cannot be accepted or mutation-tested. The untracked test must not be
promoted unchanged.

## 5. Skeleton proves that a token rename is not consumer geometry

`Skeleton.vue` is a generic reserved-shape primitive. The story exercises at least three distinct
roles:

```vue
<Skeleton class="h-4 w-full" />
<Skeleton class="size-12 shrink-0 rounded-full" />
<Skeleton class="aspect-[16/9] w-full rounded-card" />
```

The component's scoped CSS is not inside a cascade layer:

```css
.skeleton {
    border-radius: var(--radius-media);
}
```

The two caller radius classes are Tailwind utilities in `@layer utilities`. For normal author
declarations, unlayered rules outrank layered rules. The scoped selector also carries the generated
attribute, so it is not weaker on specificity. Thus forwarding `rounded-full` and `rounded-card`
does not make those classes the computed geometry owner.

The existing Skeleton test checks only that `wrapper.classes()` contains the strings. It never
loads the real CSS or reads `borderTopLeftRadius`. Its test name—“leaves geometry and composition
classes to the caller”—is therefore false at the paint boundary.

This matters to the role canon at every viewport:

- a 48×48 avatar placeholder wants a 24px/circle corner but receives 10px;
- a 16:9 card placeholder asks for the card rung (16px) but receives 10px;
- text bars inherit the same 10px, which can become a stadium only when their height is ≤20px.

One generic “media” default cannot be called complete while explicit consumer role overrides are
silenced. The final API may use a data-shape/prop, a component seam, or correct layer placement; the
acceptance truth is simply that the caller's public shape selection wins in computed paint without
private selectors.

## 6. Command is not a media tile

The third renamed consumer is `.command__input`, rendered by `RekaComboboxInput`. It is a real
single-line interactive field. It has `border: 0`, `background: transparent`, and no clipping, so
its border radius currently paints no visible plate. Calling it a “media/tile” consumer makes the
role name false while preserving a declaration with no present visual work.

That latent coupling is hazardous: a future focus fill, error plate, overflow clip, or consumer
background would suddenly pick up the Avatar/Skeleton media retune. It is the same silent-coupling
class the rename claims to eliminate. The final ruling should either remove the paint-dead radius
from the input or route the painted owner through a genuine field/control role. A role-canon test
must reject `--radius-media` on an interactive combobox input unless the owner explicitly ratifies
that exception.

The existing Command tests are useful but orthogonal: they prove selection, disabled behavior,
Escape, and focus restoration. They do not prove a visible focus indicator on the inline input or
the concentric relationship of the 12px Command panel inside the 16px centered Dialog plate.

## 7. Required born-RED proof and mutations

### A. Role-canon ordinary gate

The final candidate must carry an ordinary, non-expected-fail test that:

1. enumerates every live semantic radius rung and binds it to one adjudicated role;
2. inventories all live `var(--radius-*)` consumers and either maps or explicitly exempts each;
3. proves F12's chosen nesting law rather than asserting both sides;
4. rejects a correct token from the wrong role.

Required mutations:

- Avatar square `--radius-media` → `--radius-pill`;
- Command input's adjudicated field/no-radius form → `--radius-media` or `--radius-dock`;
- Sortable insertion bar `--radius-pill` → `--radius-card`;
- ExpandableContainer trigger `--radius-button` ↔ `--radius-control` against the final ruling;
- delete one table row while leaving its token/consumer live;
- restore `--radius-input` as an alias;
- restore either dead k-token.

Each mutation must turn the gate RED. Token presence alone is non-probative.

### B. Exact W1 completion

- F17: first render of `/data/search` with `variant="floating"` must show the owner-authorized
  rounded chrome in Chrome and Safari. Mutation restoring `rounded-none` must RED source and paint
  oracles.
- SegmentedTabs: both `0.3125rem` and `0.25rem` must be replaced according to the owner ruling.
  Mutation restoring either literal must RED an ordinary gate, not merely satisfy an expected-red
  residue latch.
- F15: a story contract must prove the reset is the public Button and first trusted pointer,
  keyboard Enter/Space, disabled/loading if applicable, and focus-visible behavior remain correct.
  Mutation restoring the raw button must RED.

### C. Real consumer paint matrix

Retain exact-source + installed-artifact identity and test these actual routes:

| Route | Required states |
| --- | --- |
| `/display/atoms` | Avatar circle/square, image/fallback/decorative/status, sm/md/lg |
| `/feedback/skeleton` | text, `rounded-full` avatar, `rounded-card` media, motion/PRM |
| `/containers/command` | inline/Dialog, rest/focus, empty/disabled/selected, open/close |
| `/data/sortable-list` | pointer/keyboard/touch drag, above/below, ghost, cross-list, PRM |
| `/data/infinite-scroll` | reset rest/hover/press/focus, first activation, mobile header fit |
| `/data/search` | floating field rest/focus/results/open/close |
| `/navigation/tabs` | pill/underline, horizontal/vertical, rest/mid/settle, focus/coarse/PRM |

For each relevant cell: 390×844 and 1440×900, light and dark, Chrome and Safari; record computed
radius, corner shape where supported, bounding boxes, clipping ancestor, focus ring, and the exact
source/build identity. Coarse-pointer and PRM are interaction modes, not width synonyms. Mutation
must restore the old/wrong radius and make the same route detector RED.

Skeleton has a specific born-RED minimum: on the real built page, the avatar specimen must resolve
to a circular radius and the card specimen to `--radius-card`; a mutation that reinstates an
unlayered hard owner at `--radius-media` must fail both computed-style assertions.

## 8. Credit and disposition

Keep these exact bytes unless a later unified redress provides a simpler equivalent:

- clean `--radius-input` → `--radius-media` rename with no alias;
- delete `--corner-k-soft` / `--corner-k-sharp`;
- SortableList `999px` → `var(--radius-pill)`;
- InfiniteScroll Reset → public `<Button size="sm">`;
- manifest rename.

Do **not** credit:

- the “single authoritative canon” claim;
- F12 coherence;
- Command as a media/tile role;
- Skeleton caller-owned geometry;
- complete W1 status;
- Chrome, Safari, 390, 1440, light, dark, focus, coarse, PRM, or GOAL OF GLASS acceptance;
- the later untracked radius test as candidate or consumer evidence.

The bounded implementation path is: preserve the valid cleanup, obtain the exact Segmented/F17 and
F12 owner rulings, repair the role table/gate and Skeleton/Command consumer truth, then land the
source + ordinary born-RED tests + dual-engine receiver evidence as one exact candidate. Only that
candidate receives fresh Sol x-high visual and mechanism challenges. `31c01d2a` remains **DEFECT**.
