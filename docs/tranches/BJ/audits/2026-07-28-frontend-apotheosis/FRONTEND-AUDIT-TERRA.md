# Frontend apotheosis audit — independent Terra seat

**Date:** 2026-07-28
**Seat:** independent frontend/design audit, `gpt-5.6-terra` at x-high
**Requested role substitution:** this seat is the closest available mechanical/design challenger to the requested GPT Luna x-high. It is **not** Luna and does not claim to be.
**Scope:** current `src/components/**`, demo chassis/landing architecture, published surface, active BJ/BK terminal plans, and prior frontend audit findings. This seat changed no source, package, test, wave, or tranche file other than this report.

## 0. Executive verdict

The terminal programme has correctly discovered most of the frontend's important defects, but it has not yet converted those discoveries into the component tree. The current `src`/`demo` tree's latest committed change is still `abb1eba2` (2026-07-22), while subsequent work is overwhelmingly planning and documentation. The result is a dangerous inversion:

- the intended library is increasingly small, coherent, measured, and un-shadcn;
- the shipped library remains 62 component directories, 72 export-map entries, several duplicated authorities, stock shadcn recipe residue, and a demo schema that spends more machinery describing previews than most components spend implementing themselves;
- the plans now contain enough repeated law, wave rows, gate rows, and historical restatement to recreate the very contrivance they are trying to remove.

The right continuation is **not another discovery tranche**. It is a small number of source-owning cuts that:

1. establish one current design/API canon;
2. repair the shared dependency spine;
3. remove shadcn styling residue family by family;
4. fold or delete the long tail;
5. simplify the demo into a truthful component workbench;
6. close against real consumers and browser evidence.

Keep the 90-row BK roster as an evidence/dependency index. Do **not** execute it as 90 branches, 90 conceptual redesigns, or 90 isolated commits.

## 1. Evidence posture and browser disclosure

I read both the `frontend-design` and in-app `browser` skill instructions before auditing. The Browser app was unavailable to this seat (`agent.browsers.list()` returned `[]`; the named `iab` browser did not exist). Per the browser skill, I did not silently substitute Playwright, Chrome, Computer Use, or screenshots.

The coordinating root seat supplied its own in-app Browser measurements from `http://localhost:5261` at 1280×720:

- the document is an intentional fixed shell (`document.scrollHeight === 720`);
- `main.demo-main-scroller` is the real scroll owner (`clientHeight 652`, `scrollHeight 1862`, and a successful `scrollTop 0 → 558`);
- 11 category links/buttons and 30 focusable elements are present on the front door;
- the identity fallback paints each category/story title in its preview and then repeats the title below it;
- the fixed bottom dock occupies roughly the lower 68 px, while the main layout reserves a corresponding row. Endpoint reach/occlusion still needs a final Browser capture.

Therefore this report does **not** call the first fold inaccessible or the document clipped. It does call the root information architecture dense and the identity-tile repetition real.

## 2. What the prior audits teach

The archaeology contains three especially useful lessons.

### 2.1 A symptom was patched without resolving the design job

`GESTALT-1-B-visual.md` V-INC-3 (2026-07-21) found that blank section-preview panels read as half-loaded placeholders. The current code replaced the blank floor with the story title:

```text
preview: "Forms"
title:   "Forms"
```

That makes the preview non-blank but not more informative. The lesson is not “author 120 tiny showcase components.” It is: define the preview's job before filling the rectangle. A preview should demonstrate a visual/behavioral property, show an honest still, or disappear; it should not duplicate the label.

### 2.2 “Optimal” was time-bound evidence, not eternal canon

The same visual audit ratified the SVG goo pager as felt and optimal. The current terminal canon correctly moves toward a filter-free translate/scale worm. That is not a failure of the earlier capture; it is evidence that a local felt-quality verdict cannot overrule later portability, compositing, and mechanism-reduction constraints. Historical verdicts remain receipts, not current authority.

### 2.3 Formation-time censuses decay quickly

`GESTALT-1-A-tranche.md` proved that a same-day pulse merge turned a supposedly shared feedback abstraction into a one-consumer split only 52 minutes before a colocation wave enshrined it under `_shared`. The same failure mode is still possible throughout BK: a row formed from an old import count must not authorize a keep/delete decision without a fresh consumer census at execution.

This is the durable rule to repeat, once:

> The plan records why a decision was considered. The execution-time census decides whether its premise still exists.

## 3. Current frontend census

These are current working-tree facts, not remembered tranche figures:

| Measure | Current result | Consequence |
|---|---:|---|
| Component directories under `src/components` (excluding `_shared`) | 62 | The public/product taxonomy is still broad. |
| Package export-map keys | 72 | Deletion must update exports, types, docs, migration, and consumers atomically. |
| Raw non-tile story SFCs under `demo/stories` | 120 | BK's bare “124” needs a pinned detector and scope definition. |
| Authored `.tile.vue` files | 4 | A mandate to hand-author a tile for every story would create a second component library. |
| Root category links/buttons observed in Browser | 11 | Front-door category count is concrete and testable. |
| Root focusables observed in Browser | 30 | The persistent navigation surface needs deliberate focus-budget review. |

The largest component families by raw source/test/doc LOC are also the clearest complexity concentrations:

| Component | Raw LOC | Other local `src` consumers | Demo consumers | Audit implication |
|---|---:|---:|---:|---|
| Aurora | 9,003 | 4 | 23 | Keep as a flagship, but move shared constants/budgets downward; it currently exports upward into Blob/Fourier. |
| Dock | 8,018 | 5 | 18 | Keep as a flagship; its context is already consumed by menu/popover/select/slider surfaces, so refactor by dependency seam, not by wholesale rewrite. |
| Blob | 5,573 | 0 | 2 | No local product consumer. Require external-consumer evidence or sever to the procedural/demo tier. |
| FourierField | 2,897 | 0 | 2 | Same; preserve only if the renderer contract earns public status. |
| Constellation | 2,452 | 0 | 2 | Same. |
| Timeline | 2,263 | 0 | 4 | Keep only the semantic timeline contract; visual/editor machinery must earn itself. |
| Handmark | 2,242 | 0 | 1 | High cost, nearly demo-only. Demand external proof. |
| Drawer | 1,625 | 1 | 1 | Fold into the dialog/detent substrate; avoid a parallel modal system. |
| Configurator | 1,534 | 2 | 9 | Demo tooling has leaked into the library shape. Sever or delete from the public surface. |
| Tabs | 1,427 | 1 | 6 | Keep SegmentedTabs, repair the shared-engine layering inversion, and delete stale substrate prose. |
| Typewriter | 1,418 | 0 | 1 | Demote unless external usage justifies it; its random behavior is not a library-quality default. |
| SortableList | 1,140 | 0 | 2 | Keep only if live reorder/accessibility behavior is a real consumer need; reduced-motion support is absent. |

“Other local `src` consumers” is intentionally narrow: it means another source component/composable imports the family. It does not replace the multi-repository consumer census already scheduled by the terminal plan.

## 4. Target design: one living instrument, not a cabinet of effects

### 4.1 Product and audience

The demo is a **component evaluation workbench** for application authors. Its primary jobs are:

- reveal what a component does and when it should be used;
- prove keyboard, focus, motion, transparency, and narrow-width behavior;
- expose the minimal API and a copyable example;
- distinguish library defaults from consumer-tunable identity.

It is not a brand microsite on every route and not a gallery of one-off animated postcards.

### 4.2 Visual direction

Retain the house identity already present in source:

- warm paper: `hsl(40 30% 98%)`;
- warm ink: `hsl(24 10% 10%)`;
- glass plate: `hsl(30 85% 96%)`;
- legendre violet: `oklch(0.532 0.180 317.5)` (mode-adjusted by existing tokens);
- gold: `oklch(0.751 0.147 84.2)`;
- Plus Jakarta Sans for text/display and Fira Code for code/measurement.

Do not invent another font, another rainbow, another surface hierarchy, or another brand-metal subsystem during the reduction. Character should come from composition and one signature interaction, not a new token family.

The signature should be **one active lens**:

- one transmissive specimen surface over one chromatic field where substrate proof matters;
- one motion owner for the interaction being demonstrated;
- all adjacent cards and controls quiet enough that the specimen reads first.

That gives the three edicts executable meanings:

- **GOLDEN GLASS:** a surface claims glass only when a real substrate and the canonical material stack make the transmission visible; no stock white-specular garnish and no extra material axes.
- **BREATH OF LIFE:** state, focus, and consequence are visibly alive; static atoms do not receive ambient animation merely to satisfy an animation quota.
- **MOVEMENT OF MOMENTUM:** every travel interaction has one owner, a legible departure/arrival, and a reduced-motion state that preserves feedback while zeroing travel.

### 4.3 Page structure

```text
┌──────── rail: categories ────────┬──────────────────────────────────────┐
│                                  │ title + one-sentence contract        │
│ compact, stable, keyboardable    │                                      │
│                                  │ LIVE SPECIMEN                         │
│                                  │ one meaningful state at a time        │
│                                  │                                      │
│                                  │ behavior / a11y / tokens / code       │
│                                  │ consumer notes + migration            │
├──────────────────────────────────┴──────────────────────────────────────┤
│ previous · current story · next     (full story list behind one menu)   │
└─────────────────────────────────────────────────────────────────────────┘
```

The persistent shell should not render every story as a permanently visible dock tab. Keep previous/current/next and one discoverable full-story chooser. This is a source- and Browser-backed information-architecture recommendation: the root already has 30 focusables before the user enters a specimen.

### 4.4 Self-critique of the target

This direction risks becoming too quiet and losing the library's painterly identity. The corrective is not more simultaneous effects. It is to let the active specimen own the chromatic field and momentum while the shell remains a calibrated warm instrument. One vivid subject beats a substrate, blob, preview treatment, and dock all competing for signature status.

## 5. Component and structure decisions

### 5.1 Keep and clarify

| Family | Decision | Required refinement |
|---|---|---|
| Button, Input/forms subpath, Label, Checkbox, Switch, Slider, RadioGroup, Select | **KEEP** | One control geometry, focus, disabled, invalid, density, and motion contract. Remove stock recipes; retain Reka only where it earns behavior/accessibility. |
| Dialog/Popover/Tooltip/Dropdown/Command | **KEEP** | One overlay/material/escape/focus substrate. Menu rows and overlay headers must use library semantic classes, not shadcn strings. |
| Card + Surface | **KEEP, THIN** | Surface becomes the small material/rung primitive already specified by W-SURFACE-MATERIAL. Card owns card semantics, not a combinatorial visual DSL. |
| SegmentedTabs | **KEEP** | Shared selection/indicator/roving-focus engine below components; delete obsolete `useTabIndicator` and Reka-Tabs claims. |
| Carousel | **KEEP/RATIFY** | Current terminal decision wins over stale delete prose; do not reopen without a fresh consumer failure. |
| Aurora + Dock | **KEEP FLAGSHIPS** | Protect their behavior, but reduce shared-constant inversions and component-specific duplicate engines. |
| PagerDots | **KEEP CONTRACT, REPLACE IMPLEMENTATION** | Preserve roving focus/windowing; remove SVG `filter:url()` goo and use the terminal filter-free worm. |
| Easing | **KEEP-THIN + SEVER** | Keep the useful curve contract; move the editor/picker surface to demo tooling unless consumers prove it belongs publicly. |

### 5.2 Merge or fold

| Current split | Decision |
|---|---|
| Drawer beside Dialog | Fold onto one dialog/detent substrate; preserve drawer direction and modal semantics as configuration, not a second overlay stack. |
| ToggleGroup beside SegmentedTabs/Dock selection machinery | Rebuild on the shared selection engine; remove Reka for this family if no behavior remains that the shared engine cannot provide. |
| `useTabRovingFocus` under `components/tabs` imported by `src/composables/motion/morph/useSelectionGroup.ts` | Move the roving machine below both consumers. A generic composable must never import upward from a leaf component. |
| FeedbackMark + StatusDot | Complete the prior audit's colocation cure: if StatusDot is still its sole semantic consumer at cut time, inline or colocate it. |
| NumberField step parts, Select scroll buttons, menu row recipes | Keep public parts only when consumer composition needs them; otherwise fold implementation-only leaves behind the owning root. |
| Surface grain/specular/material axes + Card cartoon/grid/deep/shadow combinations | Collapse to the terminal 3-prop Surface direction; keep only a measured Card-owned shadow choice where consumers need it. |

### 5.3 Delete, demote, or force an earn-back

The terminal delete/fold directions for `PaperBackdrop`, `HeaderRibbon`, `AnimatedDigit`, `CompletionSeal`, `InstrumentChassis`, `Metric`, and public `Configurator` are coherent with the current local-consumer evidence. Execute them only with the scheduled external relay and package-map closure.

Apply an explicit **earn-back gate** to the following:

- `Typewriter`: zero other local source consumers, one demo consumer, and at least 18 direct `Math.random()` sites. If retained, inject one seeded PRNG, make typo simulation opt-in, and publish a deterministic state machine rather than “humanized” nondeterminism by default.
- `SortableList`: zero other local source consumers and no component-level `prefers-reduced-motion` branch. Retain only if keyboard/live-region reorder behavior is a demonstrated consumer contract; then implement PRM and one FLIP owner.
- `Blob`, `FourierField`, `Constellation`, `Handmark`: keep public only where the multi-repo census proves a renderer primitive rather than a demo composition.
- `Deck`: preserve the terminal re-hearing. Do not mechanically delete it while an atlas/consumer role remains unresolved.

Deletion is not a quality judgment. It is refusal to make every attractive experiment a permanent package obligation.

## 6. Full shadcn abrogation: what remains

The repository has already removed the usual `components/ui` folder and CVA dependency, but shadcn styling and API residue remains visibly encoded:

| Family | Current residue |
|---|---|
| Alert | `rounded-lg border px-4 py-3`, stock grid recipe, and `line-clamp-1` on the title. |
| Badge | `bg-primary`, `bg-secondary`, `bg-destructive`, and `wrap-anywhere`. |
| Toast | stock action button utilities and destructive `group-*` variants; `DESIGN.md` promises shadcn-vue drop-in parity. |
| Dialog / Drawer | `leading-none tracking-tight text-muted-foreground`; dialog close retains stock `rounded-sm data-state:bg-accent` styling. |
| Table | stock wrapper/head/cell utility recipes and neutral-muted presentation. |
| Select | stock helper padding/scroll-button recipes and trigger truncation conventions. |
| Shared menu rows | `_shared/menu/menuRowClass.ts` remains a raw template-style utility recipe. |

Abrogation must mean:

1. no copied shadcn visual recipe or parity promise remains;
2. each surviving component uses the library's semantic geometry, typography, glass, state, and feedback contracts;
3. public APIs are kept for demonstrated consumer value, not migration nostalgia.

It must **not** mean:

- deleting every `data-slot` attribute (these are now useful internal structural selectors);
- deleting Tailwind;
- deleting Reka where it supplies tested focus, keyboard, collection, portal, or ARIA behavior.

Shadcn is the skin/template inheritance being removed. Reka is a headless dependency to justify component by component.

Add one explicit residual ledger to BK row 64/its successor, grouped by the seven families above, with exact removal criteria. Do not scatter “full abrogation” across another dozen prose-only rows.

## 7. Concrete source contradictions to close

These are high-confidence, cheap, and should be pulled forward:

1. `src/components/tabs/README.md` repeatedly documents nonexistent `useTabIndicator.ts` and nonexistent `proof:*` scripts. The implementation uses shared `useSelectionIndicator`.
2. `src/components/index.ts` says a retired Reka Tabs substrate remains internal for Dock. The actual Reka Tabs files are gone; Dock uses `useSelectionGroup`.
3. `src/components/dock/styles/layer-group.css` still calls the writer “reka-ui Tabs” / “TabsIndicator.”
4. `src/forms.ts` says Input/Textarea remain re-exported by the root barrel; `src/index.ts` explicitly excludes them in favor of the forms subpath.
5. motion and tabs comments still name dead `useTabIndicator`.
6. the generic `useSelectionGroup` composable imports `useTabRovingFocus` upward from `components/tabs`, reversing the intended dependency direction.
7. `DESIGN.md` preserves shadcn toast parity and several obsolete component/API descriptions.

This is a useful test of session durability: `COMPONENT-WAVES-TERMINAL.md` already recorded the tabs mismatch, but it remains unimplemented. Do not rediscover it in another tranche; land it in the first shared-spine/doc-truth cut.

## 8. The design canon must be re-authored, not patched

`DESIGN.md` cannot be treated as present authority. It currently:

- calls a six-layer composite mandatory on every glass surface, including mandatory grain, while the terminal Surface direction removes grain/specular/material axes;
- describes “seven tiers,” mixes a component (`InstrumentChassis`) into a material-tier table, and later asserts a five-rung canon;
- preserves a `blur(0)` dock floor that later material work has superseded;
- names Playwright-MCP visual contrast as canonical verification;
- sanctions inline SVG `filter:url()` goo while the current design canon forbids it;
- describes obsolete `ScrollPane`, `CartoonCard`, old Card props, Drawer/Sheet vocabulary, and shadcn toast parity.

BK row 78 is correct to re-author it from the measured survivor corpus. The rewrite should be short enough to read before implementation:

1. philosophy and three edicts;
2. material/rung contract;
3. typography and color;
4. control geometry/state;
5. motion ownership and PRM;
6. overlay/focus behavior;
7. component inclusion test;
8. demo/browser proof matrix.

Historical rationale belongs in tranche records, not duplicated inside the live design canon.

## 9. Demo audit and amendments

### 9.1 Retain the fixed-shell scroller

The Browser evidence proves the inner scroller works. Keep the fixed-shell pattern if endpoint captures pass at narrow, standard, and wide widths. Add a deterministic Browser assertion for:

- the last story/control being reachable;
- no focus target hidden behind the bottom row;
- current-story focus transfer after route change;
- coarse-pointer and 200% zoom behavior.

### 9.2 Remove the identity-title tile floor

Current `storyTile.ts` says the title is an “honest” terminal preview. It is honest but redundant. Replace the floor with one of:

- an honest frozen still for renderer stories;
- a small semantic CSS specimen owned by a **family**, not every story;
- no preview region at all.

Do not require 120 bespoke `.tile.vue` files. Author tiles only for marquee components or reusable family specimens. A 120-file tile mandate would turn demo remediation into a permanent maintenance tranche.

### 9.3 Reduce manifest schema

The manifest currently combines navigation, content descriptors, hero policy, depth tier, hero scale, tile loading, and background behavior. Split it into:

- route/content identity;
- optional demo-presentation metadata used only by the owning chassis feature.

Delete presentation keys that merely restate component defaults. The route manifest should not be a second design system.

### 9.4 Reduce persistent navigation

The bottom dock should communicate current location and adjacent navigation. Put the full story list behind one menu/command surface. This preserves discoverability while reducing root and per-story focus density.

## 10. Motion and accessibility corrections

- Delete PagerDots' `filter:url()` path, including its `@supports not (filter:url())` alternate mechanism. One filter-free writer is simpler than a primary mechanism plus degrade floor.
- Give SortableList a PRM contract before calling it a survivor.
- Make Typewriter deterministic and typo behavior opt-in if it survives.
- Strike AlertTitle's `line-clamp-1`; critical/live feedback must not silently truncate.
- Replace Badge `wrap-anywhere` with a status-safe nowrap/controlled-overflow contract.
- Preserve the good current work: root route focus transfer and live announcement, Chip's required remove label, Pager's ARIA/roving focus contract, and DarkModeToggle's action label/pressed state.
- Audit every ad hoc `requestAnimationFrame`, `setTimeout`, and `will-change` as an ownership question, not as a blanket ban. One owner may legitimately use them; two owners for one interaction may not.

## 11. BK wave addenda: add, amend, and prune

### Add

1. **Forward-only model law.** Future orchestration/adjudication = GPT Sol x-high; future bounded/mechanical work = GPT Luna x-high; frontend design = independent Sol + Luna passes using frontend-design and in-app Browser, then final Sol adjudication.
2. **Shared-spine prerequisite.** Move roving selection below components before Tabs/ToggleGroup/Dock refinements.
3. **Single shadcn residual ledger.** Alert, Badge, Toast, Dialog/Drawer, Table, Select, shared menu.
4. **Earn-back evidence.** Typewriter, SortableList, procedural renderers, Handmark, and Deck require current external-consumer/function evidence.
5. **Demo focus/endpoint proof.** Fixed-shell endpoint, 200% zoom, narrow/coarse pointer, route focus transfer.
6. **Detector truth.** Define whether “story count” means raw story SFCs, manifest-routable stories, authored tiles, or category landings; pin the script in the row that uses the number.

### Amend

1. **Row 58 / story tiles:** remove any implication that every story needs a bespoke tile. Remove the duplicate-title identity floor; require authored tiles only where a family/marquee specimen earns one.
2. **Row 61 / doc truth:** include the exact Tabs, Dock, forms-barrel, and dead-composable-comment contradictions in §7.
3. **Row 64 / residuals:** make shadcn abrogation a finite family ledger, not an abstract oath.
4. **Surface/Card rows:** retain the three-prop Surface and Card-owned minimal shadow direction; explicitly kill the material-role shadow clobber and combinatorial axes in one cut.
5. **Pager row:** preserve ARIA/windowing, replace the SVG filter implementation; do not replay the old aesthetic ratification as authority.
6. **DESIGN row:** re-author from survivors after the first source reductions, not before them.

### Prune

1. No 90 branches or one-commit-per-roster-row convention.
2. No exact gate-count growth for its own sake. Close into existing gate families; retire ephemeral acceptance probes.
3. No global Fable→Sol or Opus→Luna search/replace in historical receipts. Preserve `modelId`, old seat labels, and evidence provenance; supersede them once, prospectively.
4. No second taxonomy for tiles, surface tiers, motion styles, or “special” components.
5. No new visual mechanism merely to avoid deleting an old one.
6. No copied restatement of laws in every wave. Link the one authority and record only local deltas.

## 12. Execute BK as coherent cuts

Keep the detailed roster for traceability, but land the frontend through roughly these ownership-aligned cuts:

| Cut | Source ownership | Terminal rows it may discharge |
|---|---|---|
| 1. Canon + truth | current design/API docs, model-law supersession, detectors | canon, doc-truth, roster-count, model-role rows |
| 2. Shared dependency spine | selection/roving/indicator, shared overlay/menu/control contracts | Tabs, ToggleGroup, Dock sharing, colocation rows |
| 3. Material primitive | Surface, Card, material-role tokens/styles | Golden Glass/Surface/Card rows |
| 4. Primitive skin abrogation | Alert/Badge/Toast/Dialog/Drawer/Table/Select/Menu | shadcn and semantic-atom rows |
| 5. Portfolio reduction | deletion/fold targets and package exports | reduction, package-map, migration rows |
| 6. Flagship/mechanics | Pager, Dock, Aurora and surviving procedural seams | motion/filter/substrate rows |
| 7. Demo workbench | manifest, landing tiles, shell navigation, story layout | demo/tile/layout/perf rows |
| 8. Consumer + release close | external relays, typecheck/build/browser matrix, migration | consumer, gate, release rows |

The detailed dependency graph still governs ordering inside a cut. The cut table governs human/session friction: one owner per overlapping file family, one coherent review unit, one recoverable handoff.

## 13. Session-durable handoff

Before Claude resumes:

1. read this report as a challenge to the terminal plan, not a replacement for its evidence;
2. add the forward-only model supersession without rewriting historical provenance;
3. convert the exact addenda in §11 into the BK plan-of-record;
4. begin with the shared-spine and doc-truth source cut, because it is small, already specified, and removes dependency inversion before later component work;
5. run a fresh external-consumer census at every delete/earn-back cut;
6. use the in-app Browser for every frontend acceptance claim and bank endpoint/focus evidence, not merely a screenshot of the first fold;
7. stop reopening decisions already supported by current evidence unless the execution-time census falsifies their premise.

The apotheosis is not a more elaborate glass-ui. It is the smallest coherent library in which the remaining glass, motion, and accessibility work is unmistakably intentional.
