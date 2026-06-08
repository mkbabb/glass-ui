# AX.W18 - Storybook IA ground-up reinvention + gate re-baseline

**Band** F · STORYBOOK IA · **Severity** major · **Mode** tranche-development (this doc is the wave SPEC; no `src`/`demo` edits, no impl, no commit, no git in this session)

> Glosses (first-use, per precepts README §Core-Rules / glossary/meta-terms.md):
> *IA* = the storybook information architecture — the demo `manifest.ts` category tree (category order + per-category story-id set + each row's SFC file).
> *gate* = a `proof:*` script registered in `scripts/gates.mjs` that closes on machine evidence.
> *born-RED* = the gate must FAIL at HEAD before the wave, proving the defect is real, then go GREEN at close.
> *π lane* = the AX.W00 fail-CLOSED visual-runtime workspace (live Playwright + frontend-design audit) every visual wave closes on.
> *debris bin* = an IA category that holds exactly one story (`tools` = `command`), or an overloaded dumping-ground category (`primitives` = 24 stories).

---

## State

**Born-RED — the gate must fail at HEAD before this wave runs.** The three IA gates are a regression-LOCK against the ground-up reinvention §6.1 demands, not a guard for it. Falsifiable RED witnesses, all reproducible at HEAD `eaba94f`:

1. **`proof:storybook-ia` freezes the WRONG tree.** `scripts/proof-storybook-ia.mjs:33-88` hardcodes `EXPECTED_TREE` as a verbatim copy of the current 12-category `manifest.ts` (asserting category ORDER as an exact sequence + each category's story-id SET exactly). The moment the new tree is authored in `manifest.ts` (add a first-class `dock` category, dissolve the single-story `tools` bin, split the 24-story `primitives` overload, reframe Substrates), `proof:storybook-ia` turns RED — by construction. RED witness today: run the gate, then re-order one category or move one story id → it reds with an order/set mismatch. The gate is tautological with the frozen snapshot; it offers ZERO room to converge.

2. **The gate header LIES about the tree it locks.** `proof-storybook-ia.mjs:5,9` claims an "11-category" IA and that "the single-story debris bins dissolve." The live tree is **12 categories** and a single-story `tools` bin **survives** (`manifest.ts:218-225` → exactly one story, `command`). RED witness: `node -e` count of `EXPECTED_TREE.length` returns 12 while the header prose says 11; grep the `tools` category → one row. The gate asserts a falsehood about its own fixture.

3. **`proof:storybook-complete` is the totality gate that NEVER RUNS.** `scripts/proof-storybook-complete.mjs` exists (272 lines, born-RED via `--selftest`, added at `04ba0dd`) and enforces export→story totality, but `grep storybook-complete scripts/gates.mjs` returns NOTHING — it is NOT in the registered fleet (unlike `proof:storybook-ia` at `gates.mjs:360` + `proof:no-orphan-demo-route` at `:366`). RED witness: the export→story totality never executes in CI/release; a "gate exists, gate not wired" gap.

The wave is born-RED on (1)+(2)+(3) and closes GREEN only after the new tree is authored, validated LIVE through the π lane, the three gates re-baselined to it, and `proof:storybook-complete` registered — re-baseline LAST, never as a constraint during.

---

## Goal

**This wave succeeds if, when work ends, the storybook IA is a coherent ground-up category tree (no single-story `tools` debris bin, no 24-story `primitives` overload, a first-class `dock` home, Substrates reframed as render-backgrounds with `glass-panel` split out), every row resolves to a live SFC validated through the π lane, and the three IA gates (`proof:storybook-ia` + `proof:no-orphan-demo-route` + `proof:storybook-complete`) run as a registered coherent triad re-baselined to the NEW tree** — the fixture-freeze that AV.W10 calcified is reopened, the reinvention lands, and the gate's value (no silent drift / no `MissingStory` fallback / no orphan SFC) is preserved while only its frozen snapshot moves.

---

## Scope (the gestalt fix — author the tree first, re-baseline the fixture last)

The architectural root (slice 15 F2): AV.W10 did a one-pass "16→11" collapse and FROZE it in three gates the SAME instant, so the residue calcified (single-story `tools` bin, 12-vs-11 header lie, 24-story `primitives` overload, scattered dock across 4 categories) and the gate now LOCKS AGAINST the §6.1 ground-up reinvention. The gestalt fix treats the three IA gates as the THING BEING REINVENTED, not a constraint:

1. **Author the NEW category tree from first principles in `manifest.ts`** — the canonical grouping (RATIFY-BEFORE-IMPL, see below): **Foundations · Substrates/Backgrounds · Primitives (split into Forms + Display/atoms) · Containers/Overlays · Navigation · Dock · Data · Feedback · Motion · Compositions · Composables-reference**. This is a coherent logical grouping with no contrivance.

2. **Dissolve the `tools` debris bin.** `tools` holds exactly ONE story — `command` (Command Palette, `manifest.ts:218-225`). Fold Command into Navigation (or a new "Overlays/Tools" group beside dropdown/context-menu/command-surface). After the fold, NO category is single-story.

3. **Split the 24-story `primitives` overload** (`manifest.ts:108-133`) into coherent sub-groups: form-controls vs display-atoms (Forms + Display). No category is a dumping ground.

4. **Reframe Substrates as "render backgrounds" and split `glass-panel` OUT.** Confirm aurora + the blob trio (`substrates/aurora`, `goo-blob`, `blob-interaction`, `blob-mood`) STAY in Substrates — they are CORRECTLY filed; the §6.2 "misfiled?" suspicion is STALE (slice 15 F0; no move). Reframe the category canonically as render-backgrounds (aurora · goo-blob · blob-interaction · blob-mood · constellation · glass-material). Split `glass-panel` out: it is a glass-tier renderer-cascade DETECTION primitive (`manifest.ts:99`), NOT a mountable background canvas — relocate it adjacent to `glass-material` under a Glass/Material framing or demote it to a Foundations/Composables reference. W20 retires `glass-panel` onto `.glass-material` anyway (the row drop coordinates with that verdict).

5. **Consolidate the scattered dock family into ONE first-class `dock` home** (slice 15 F1, §6.4/§1.5) — gather the dock surfaces currently spread across FOUR categories (`navigation/dock`, `navigation/dock-layers`, `navigation/rail` at `manifest.ts:162-164`; `compositions/dock-with-slider` at `:237`; `foundations/dock-active-tokens` at `:86`), plus `DockBackgroundToggle` and the new `overflow="wrap"` demo (W04). `dock-active-tokens` leaves Foundations (a token cohort lives WITH its component, not in the token-tour bin). **Coordinate with W06** — W06 establishes the dock STORY HOME (the "Slider in dock" / wrap sections, the dock-active-tokens DELETION, the rail-variant hoist); W18 owns the IA CATEGORY that frames it. `instrument-chassis` + `instrument-rail` STAY in Compositions (they HOST a dock, they are not dock primitives) with a cross-link to the dock home — and DISSOLVE if W28/W29 retire the instrument families.

6. **Delete the manifest rows for the component-pruned families — SEQUENCED AFTER the component slices rule each verdict.** The IA slice owns the manifest-row DELETIONS, never the component removal itself. When `header-ribbon` (`:165`, W19), `glyph-face` (`:131`, W19), `disco-glyph` (`:132`, W19), `native-top-layer` (`:141`, W20 fold into Dialog `:native`), and `glass-panel` (`:99`, W20) are removed/folded by their component waves, W18 (a) deletes the manifest rows, (b) clears the now-orphan SFCs so `proof:no-orphan-demo-route` stays green, (c) updates the `proof:storybook-complete` export-allowlist so the deleted exports no longer demand a story. Likewise delete the W28/W29-removed instrument-family rows (`instrument-chassis`/`instrument-rail`/`metric-pill`) once those waves rule. Collapse `metric-badge`/`metric-pill` (`:125-126`) to one row IF the component slice collapses the components.

7. **Mark the stale §7 directives ALREADY-RESOLVED (no work, confirm-and-close).** Per slice 15 F3/F4 + §4 note 9: `/dock/icon-button-token-ladder` is ALREADY pruned (zero refs in repo — verify, do NOT re-open); `configurator` + `hover-popover` ALREADY left Primitives in AV.W10 (`configurator`→compositions `:239`, `hover-popover`→containers `:151`) — those §7 "why a primitive" lines are stale. The W06 `foundations/dock-active-tokens` deletion is the real residual token-ladder debris (the byte-for-byte renamed token-ladder). Do NOT touch the live `TokenLadder.vue` + `ToneSwatch.vue` chassis primitives (used by the legit foundations token-tour stories).

8. **Register `proof:storybook-complete` in `scripts/gates.mjs`** next to its two IA siblings (`:360` ia, `:366` no-orphan) so the export→story totality gate finally runs in CI/release — closing the "gate exists, gate not wired" gap (slice 15 F5).

9. **Re-baseline the three IA gates to the NEW tree AS THE FINAL STEP** (slice 15 F6, §6.1): re-write `EXPECTED_TREE` in `proof-storybook-ia.mjs:33-88` to the AX-reinvented tree; fix the 12-vs-11 header lie + the false "single-story debris bins dissolve" claim; re-green `proof:no-orphan-demo-route` (bidirectional set-equality) against the moved/deleted SFCs; add a one-line gate-header note that the fixture is the AX-reinvented tree SUPERSEDING the AV.W10 snapshot (so the next auditor does not read it as immutable). Process order is load-bearing: branch the new IA in `manifest.ts` → move/rename/delete SFCs → validate LIVE → update `EXPECTED_TREE` → re-run the triad to green. The gate's frozen snapshot moves; its VALUE is preserved.

**NO workaround / NO legacy.** No `MissingStory` fallback row, no dual-IA alias, no "deprecated category" tombstone. The single-pass AV.W10 freeze is excised at the fixture, not patched around it.

### RATIFY-BEFORE-IMPL decisions (the charter flagged these for the wave to ratify)

W18 is NOT named in the four global RATIFY hinges (font register = W22, WEBGPU_PARITY = W07/W14, glass-scrubber-rename = W23, POS_SCALE = W08/W15). But the IA reinvention carries three structural decisions the wave must RATIFY against the live tree BEFORE authoring `manifest.ts`:

- **RATIFY-BEFORE-IMPL — the 11/12-category target shape.** RECOMMENDED PATH: the canonical grouping in Scope-1 (Foundations · Substrates/Backgrounds · Primitives→Forms+Display · Containers/Overlays · Navigation · Dock · Data · Feedback · Motion · Compositions · Composables-reference). Ratify the FINAL category count + names live before re-baselining `EXPECTED_TREE` (the prior header miscounted 11 vs an actual 12 — the new count is whatever the authored tree resolves to, asserted truthfully).
- **RATIFY-BEFORE-IMPL — the `tools`/Command landing.** RECOMMENDED PATH: fold Command into Navigation OR a new "Overlays/Tools" group beside dropdown/context-menu. Ratify which, live, so no single-story category survives.
- **RATIFY-BEFORE-IMPL — the `glass-panel` destination.** RECOMMENDED PATH: relocate adjacent to `glass-material` under a Glass/Material framing (coordinated with W20's `glass-panel`→`.glass-material` retire). Ratify whether the row drops entirely (W20 retires it) or relocates as a renderer-cascade reference.

---

## FileBounds

| File | Access | Note |
|---|---|---|
| `demo/stories/manifest.ts` | modify | author the new category tree (order + story sets + row metadata); delete the component-pruned + instrument rows AFTER the component slices rule |
| `scripts/proof-storybook-ia.mjs` | modify | re-baseline `EXPECTED_TREE` (`:33-88`) to the AX tree LAST; fix the 11-vs-12 header lie + the false "debris bins dissolve" claim; add the supersedes-AV.W10 header note |
| `scripts/proof-no-orphan-demo-route.mjs` | modify | re-green bidirectional set-equality against the moved/deleted SFCs; preserve the `demo/stories/aurora/` helper-dir exclusion header |
| `scripts/proof-storybook-complete.mjs` | modify | update the export→story allowlist for the deleted exports |
| `scripts/gates.mjs` | modify | REGISTER `proof:storybook-complete` next to `:360` ia + `:366` no-orphan (the third triad member) |
| `demo/stories/<category>/*.vue` | modify (move/rename), delete | relocate SFCs to the new category folders; delete the orphan SFCs of pruned components (rows the component waves removed) — **moves/renames only; NO component-internal edits** |
| `docs/tranches/AX/audit/W18-storybook-ia.json` | create | the IA-reinvention audit evidence artefact (before/after tree, row-delta ledger, π-lane navigation capture refs) |
| `docs/tranches/AX/PROGRESS.md` | modify | wave-close status row |

**Do NOT touch:** any `src/` file (component removals are W19/W20/W28/W29 — W18 only deletes the resulting manifest rows + orphan SFCs); `demo/layout/{SidebarDock.vue,BottomDock.vue,AppShell.vue,dock-nav.css}` (the demo nav SHELL is W40); `src/styles/dock*.css` (the dock-story HOME + dock.css split are W06); `demo/stories/TokenLadder.vue` + `demo/stories/ToneSwatch.vue` (live chassis primitives — slice 15 F2); `demo/stories/aurora/` (the 8-file PascalCase helper dir, correctly excluded from manifest+gates BY CONSTRUCTION — slice 15 F0 note); the `proof:demo-dock-nav` / `proof:animation-coherence` / `proof:design-md-current` / `proof:naming-consistency` gates (W40).

---

## Disjointness

W18 is an F-band sibling of W40 and a dependent of the component-prune waves. The shared-file collision risks + the avoidance protocol:

- **vs AX.W40 (demo-shell dock-nav + coherence re-audit).** Cleanest cut in the band: **W18 authors the IA CATEGORY TREE (`manifest.ts` rows/order/sets + the three IA gates); W40 rebuilds the nav SHELL ON it (`demo/layout/SidebarDock.vue` + `BottomDock.vue` + `dock-nav.css` + `AppShell.vue` + the `proof:demo-dock-nav`/coherence gates).** No shared file — W18 never touches `demo/layout/`; W40 never touches `manifest.ts` ordering nor the IA gates. W40 `dependsOn` W18 (it consumes the reinvented tree). The prior charter CONFLATED these (the AW.W28/W31 residue); the split is the disjointness contract. W18 adds W40 to its Blocks list.

- **vs AX.W06 (dock storybook consolidation + dock.css split).** Both touch the dock STORY surface — but on different axes. W06 owns the dock STORY HOME content (the "Slider in dock" section, the `overflow="wrap"` section, the `foundations/dock-active-tokens` DELETION, the rail-variant type-narrow + chrome hoist) + the `src/styles/dock/` partial carve. W18 owns the IA CATEGORY that FRAMES the dock home (the `dock`-category creation + the cross-category row consolidation in `manifest.ts`). Shared file: `manifest.ts` dock rows. AVOID COLLISION by SEQUENCE — W18 `dependsOn` W06 (W06 lands first, settling the dock story set + deleting `dock-active-tokens`), then W18 frames the settled set into the `dock` category. No `manifest.ts` write overlaps a W06 write because W06's dock-story edits land before W18 opens.

- **vs AX.W19 / W20 / W28 / W29 (component prune + repatriation-prune).** These DELETE `src/` component dirs + subpaths + barrels + CSS. W18 deletes the resulting `manifest.ts` ROWS + the orphan demo SFCs ONLY — it never edits `src/`. Shared concern: `manifest.ts` rows for the pruned families + `proof:storybook-complete` export-allowlist. AVOID COLLISION by SEQUENCE — W18 `dependsOn` W19/W20/W22/W23 (and informally trails W28/W29 for the instrument/metric rows) so each component verdict is RULED before W18 drops the row; the export→row coupling (deleting a row without deleting the export trips `proof:storybook-complete`) is exactly why the sequence is mandatory (slice 15 F4).

- **vs AX.W21 (primitive recategorize-ledger).** W21 `dependsOn` W18 (it places the recategorized primitives INTO the W18 tree). No reverse overlap — W21 opens after W18 closes.

No two W18 agent units share a `modify` or `modify-carve` path (the tree-author unit, the SFC-relocate unit, and the gate-rebaseline unit are sequenced, not parallel — see Cadence). No parallel sibling wave writes `manifest.ts` or the three IA gate scripts while W18 holds them (W06 precedes, W40 follows, the prune waves precede).

---

## Triumvirate

The three-role split (implement / adversarially-verify / gate-author) per the AX dual-ceiling (≤6 impl, ≤7 read-only audit). W18 is small + sequenced — 1 implement unit (serial sub-steps), 1 adversarial-verify lane, 1 gate-author lane:

- **Implement — `AX.W18.IA` (the tree author + row deleter + SFC relocator).** Authors the new `manifest.ts` category tree (order + sets + metadata), relocates/renames the demo SFCs into the new category folders, deletes the component-pruned + instrument manifest rows + orphan SFCs (after the component slices rule), folds Command out of `tools`, splits `primitives`, splits `glass-panel` out of Substrates, frames the `dock` category. Serial sub-steps (Cadence), not parallel.

- **Adversarially-verify — the π-lane live-navigation auditor (read-only).** Drives the live demo through EVERY reinvented section via the AX.W00 π lane (Playwright + frontend-design audit): confirms every row resolves to a real mounted SFC (NO `MissingStory` fallback fires), no orphan route 404s, the dock home reads as one coherent surface, the `primitives` split reads as Forms-vs-Display without contrivance, and Substrates renders aurora/blob/constellation/glass-material as live backgrounds. Captures the before/after navigation evidence + the DELTA. This lane is the close-criterion machinery — the wave does NOT close on the headless gate triad alone (per AX.W00, non-negotiable).

- **Gate-author — the IA-triad re-baseliner (the FINAL step).** Re-writes `EXPECTED_TREE` to the validated new tree, fixes the 11-vs-12 + "debris bins dissolve" header lies, adds the supersedes-AV.W10 header note, re-greens `proof:no-orphan-demo-route`, updates the `proof:storybook-complete` allowlist, and REGISTERS `proof:storybook-complete` in `gates.mjs`. Runs the triad to coherent green LAST — never as a constraint during authoring.

**Triumvirate auto-triggers (per WAVE_SPEC §3a — mandatory, the orchestrator may not redispatch the failing unit alone):**
- FileBounds expansion: if relocating an SFC requires a component-internal `src/` edit (it must NOT — that is W19/W20/W28/W29 scope) → triumvirate.
- Non-local gate failure: if `proof:storybook-complete` reds on an export with NO owning component-prune verdict (an export→story totality gap with no upstream wave) → triumvirate (the export survives but the story was dropped, or vice versa).
- Third-iteration diagnostic loop: if the π-lane live-navigation audit fails to settle (a row resolves headless-green but renders `MissingStory`/blank live) for a third re-author pass → halt + triumvirate.

---

## HardGate

**The gate triad — born-RED → GREEN, run as a coherent set:**

1. **`proof:storybook-ia`** — re-baselined `EXPECTED_TREE` to the AX-reinvented tree; asserts (a) category ORDER as an exact sequence, (b) each category's story-id SET exactly, (c) every `<category>/<id>` row resolves to an existing `demo/stories/<category>/<id>.vue` (the `lazy()` `MissingStory` render-fallback never fires), (d) the header category-count is TRUTHFUL (no 11-vs-12 lie), (e) NO single-story category survives (the `tools`-dissolution assertion). Born-RED: at HEAD it freezes the OLD 12-category tree with the surviving `tools` bin + the 11-count header lie.

2. **`proof:no-orphan-demo-route`** — bidirectional set-equality between `manifest.ts` rows and the category-folder SFCs; GREEN after the SFC moves/renames/deletes (no orphan SFC, no dangling row). Preserves the `demo/stories/aurora/` helper-dir exclusion. Born-RED: any recat moves an SFC out from under its old row.

3. **`proof:storybook-complete`** — the export→story totality gate, REGISTERED in `gates.mjs` (the headline fix) + its allowlist updated for the deleted exports. Born-RED: today it is unregistered (`grep storybook-complete scripts/gates.mjs` → empty), so the totality never runs in CI/release.

4. **Meta-assertion** — every `scripts/proof-storybook-*.mjs` has a matching registered `proof:*` entry in `gates.mjs` (closes the "gate exists, gate not wired" class for the triad; folds the §13/W33 gate-fleet-registration concern at the IA scope).

**MANDATORY VISUAL-TRUTH gate (the AX.W00 cardinal clause — non-negotiable, NOT a headless proof alone).** A **live π-lane Playwright navigation audit of EVERY reinvented IA section**, paired with a frontend-design appearance/interaction pass: navigate each category + each story route on a real device, assert the route mounts a real SFC (NO `MissingStory` fallback, NO blank/404), and live-audit the reinvented surface for affordance / hierarchy / spacing / padding / no visual occlusion (the dock home reads as one coherent surface; the Forms-vs-Display primitives split reads without contrivance; Substrates renders aurora/blob/constellation/glass-material as live backgrounds). Capture the paired-π BEFORE/AFTER + `DELTA` per the AX.W00 compare-at-close protocol. **The wave closes on this live audit, never on the headless gate triad alone** — a fleet of green IA gates over a route that renders `MissingStory` live is exactly the headless-green/visually-broken class AX exists to close.

> **Visual-truth one-liner:** a live π-lane Playwright + frontend-design navigation audit of every reinvented IA section confirms each route mounts a real SFC (no `MissingStory`/blank/404) and the dock-home / primitives-split / Substrates surfaces read coherently — the close criterion, never the headless triad alone.

---

## Cadence (sub-steps, in order — load-bearing: author first, re-baseline LAST)

1. **RATIFY** the three structural decisions live (category target shape, `tools`/Command landing, `glass-panel` destination) against the HEAD tree — confirm aurora/blob STAY in Substrates (slice 15 F0), confirm `icon-button-token-ladder` is already pruned + `configurator`/`hover-popover` already recategorized (mark stale §7 items resolved, no work).
2. **AUTHOR** the new category tree in `manifest.ts` (order + story sets + metadata): create the `dock` category, dissolve `tools` (fold Command), split `primitives` into Forms+Display, reframe Substrates + split `glass-panel` out, move `dock-active-tokens` out of Foundations.
3. **RELOCATE** the demo SFCs into the new category folders (move/rename only — no component-internal edits).
4. **DELETE** the component-pruned + instrument + metric manifest rows + their orphan SFCs — ONLY after the W19/W20/W22/W23 (and trailing W28/W29) component verdicts have ruled (the export→row coupling forbids dropping a row whose export still ships).
5. **VALIDATE LIVE** through the π lane: navigate every section, assert no `MissingStory`/blank/404, run the frontend-design appearance/interaction audit, capture BEFORE/AFTER + DELTA.
6. **RE-BASELINE** the gate triad LAST: re-write `EXPECTED_TREE`, fix the header lies, add the supersedes-note, re-green no-orphan, update the storybook-complete allowlist, REGISTER `proof:storybook-complete` in `gates.mjs`, run the triad to coherent green.
7. **Format/lint cadence** (per WAVE_SPEC §7, docs+demo wave): `npm run typecheck` (the relocated SFC imports + manifest types), the three IA `proof:*` gates, `git diff --check`. Run after the relocate batch (step 3-4) and before close (step 6). No formatter is intentionally skipped.

---

## Artefacts

- **`docs/tranches/AX/audit/W18-storybook-ia.json`** — the IA-reinvention evidence: the BEFORE tree (12-category, `tools` bin, 24-story primitives, scattered dock), the AFTER tree (the ratified grouping), the per-row DELTA ledger (moved / renamed / deleted / created, each tagged with its owning component-prune wave for the deletions), the stale-§7 confirm-and-close list (icon-button-token-ladder / configurator / hover-popover), the gate-triad re-baseline diff refs, and the π-lane navigation capture refs.
- **π-lane BEFORE/AFTER navigation captures + `DELTA`** (per AX.W00 compare-at-close) — the live route-by-route screenshots + the frontend-design audit notes per section, saved under the π workspace and referenced from the W18 audit json.
- **Gate output artefacts** — `proof:storybook-ia` + `proof:no-orphan-demo-route` + `proof:storybook-complete` green-run snapshots (via `gate-output.mjs` `writeGateArtifact`), confirming the registered triad runs coherently.
- **`docs/tranches/AX/PROGRESS.md`** — wave-close status row (`complete` only if the goal criterion holds; `complete_with_misses` if a gate passes but the live audit flags a section).

---

## CommitPlan (one conventional-commit per sub-step — authored here; NO commit in this session)

1. `refactor(demo-ia): author the AX storybook category tree — dock home, dissolve tools bin, split primitives Forms+Display, reframe Substrates` (body: the ratified grouping + the `glass-panel` split-out + the `dock-active-tokens` relocation out of Foundations).
2. `refactor(demo-ia): relocate demo story SFCs into the reinvented category folders` (body: move/rename ledger; no component-internal edits).
3. `refactor(demo-ia): delete the pruned + instrument + metric manifest rows and orphan SFCs` (body: per-row → owning component-prune wave (W19/W20/W28/W29) tag; the export→row coupling rationale).
4. `test(demo-ia): re-baseline EXPECTED_TREE + fix the 11-vs-12 header lie + register proof:storybook-complete` (body: the gate-triad re-baseline, the supersedes-AV.W10 header note, the gates.mjs registration of the unwired totality gate, the meta-assert).
5. `docs(tranche-AX): W18 IA-reinvention audit json + π-lane navigation captures + PROGRESS close` (body: the BEFORE/AFTER tree + row-delta ledger + live-audit DELTA references).

---

## Dependencies

- **Depends on:** **AX.W06** (the dock STORY HOME + the `foundations/dock-active-tokens` deletion settle the dock story set BEFORE W18 frames the `dock` category); **AX.W19** (header-ribbon + glyph-face + disco-glyph removals rule before W18 drops their rows); **AX.W20** (native-top-layer fold-into-Dialog + glass-panel retire rule before W18 drops/relocates those rows); **AX.W22** (font reconciliation settles before the Foundations typography stories are re-framed); **AX.W23** (the carousel/slider re-author settles the slider story set). Informally TRAILS **AX.W28 / W29** for the instrument-chassis/instrument-rail/metric-pill row deletions (those rows drop once the repatriation-prune rules). Charter `dependsOn` line (AX.md:1004): `AX.W06, AX.W19, AX.W20, AX.W22, AX.W23`. **WHY**: the export→story totality coupling (slice 15 F4) — deleting a manifest row whose component export still ships trips `proof:storybook-complete`; so EVERY component verdict must RULE before the IA slice drops the row. And the dock category cannot be framed coherently until W06 settles the dock story set + deletes the renamed token-ladder debris.
- **Blocks:** **AX.W21** (primitive recategorize-ledger — places the recategorized primitives INTO the W18 tree); **AX.W40** (demo-shell dock-nav rebuild — rebuilds the nav SHELL ON the W18 category tree; `dependsOn` W18 + the dock band); **AX.W33** (close — the gate-fleet registration the W18 `proof:storybook-complete` registration feeds); **AX.W39** (Lighthouse demo audit — walks the W18-reinvented route matrix, sequenced after W18 IA per digest line 123).

---

## Archaeology

The prior-tranche lineage the audit cited as evidence (slice 15 + digest):

- **AV.W10 — the one-pass "16→11" IA collapse, frozen the instant it landed.** The reinvention lifted Substrates to 2nd position + consolidated aurora/blob there, then FROZE the tree in three gates the SAME instant — so the residue calcified (single-story `tools` bin, 12-vs-11 header miscount, 24-story `primitives` overload, dock scattered across 4 categories). The fixture `proof-storybook-ia.mjs:33-88` is a literal copy of that one-pass manifest → tautological with the current tree → a regression-LOCK AGAINST the §6.1 ground-up reinvention. New guardrail: re-baseline `EXPECTED_TREE` as the FINAL step (after live validation), never as a constraint during; add a header note that the AX tree SUPERSEDES the AV.W10 snapshot so the next auditor does not read it as immutable.
- **Commit `04ba0dd` (AW.W28) — `proof:storybook-complete` added WITHOUT registration.** The 272-line export→story totality gate (born-RED via `--selftest`) was added in the same commit that added the SFCs to make it pass, but the `gates.mjs` registration step was MISSED — a classic "gate exists, gate not wired" gap (`grep storybook-complete scripts/gates.mjs` → empty; `:360`+`:366` register only ia + no-orphan). New guardrail: register it as the third triad member + a meta-assert that every `proof-storybook-*.mjs` has a registered `proof:*` entry.
- **Commits `85f0de0` / `c02ada3` / `04ba0dd` (AW.W28 batch-1 merge) — demo dock-nav SHELL merged headless-green-only.** `demo/layout/dock-nav.css` + `SidebarDock.vue` + `BottomDock.vue` are at HEAD but never re-audited for visual truth ("audit, do not trust the green claims" — the §14 untrusted-merge class). W18 does NOT silently trust them; the SHELL rebuild + reconcile-against-the-reinvented-IA moves to the sibling **W40** (digest lines 312-314) — W18 authors the CATEGORY TREE, W40 rebuilds the nav SHELL on it. The prior charter conflated the two.
- **The §7/§1.7 stale-directive class (§4 note 9 / slice 15 F3-F4).** `/dock/icon-button-token-ladder` was pruned in an earlier wave (zero repo refs); `configurator` + `hover-popover` left Primitives in AV.W10 — yet the REQUIREMENTS ledger recapitulates the verbatim user directive without re-verifying against HEAD. New guardrail: re-verify each §7 item against HEAD before acting (lesson generalized from §4 note 9: the ledger is a directive distillation, not live state).
- **Digest CONVERGE fold (line 30-32 / line 1030-1032).** The muster WC design slices catalogue the under-adopted glass-ui idioms (ToggleChip, vertical DockLayerGroup, the editorial type pairing, the 5-rung glass ladder, useStaggerReveal/scroll-driven.css) — recorded here as INPUT to the §16.3 idiom census (W34), not W18 scope; noted so the IA authoring does not re-derive a worse grouping than the consumer idiom evidence already maps.

---

## PreceptAlignment

W18 is pursuant to `docs/precepts/` (pinned `63240e6`); the F-band binding precepts it PURSUES and MUST NOT VIOLATE (per §2b — *no-overfitting (dissolve debris bins); substrate-with-consumer (dock-nav dogfoods the AX-rebuilt dock); documentation-is-part-of-the-change (re-baseline fixtures LAST)*):

- **No overfitting** (README §Core-Rules:10-12; `audits/overfitting-audit.md`) — "A public surface, helper, prompt, token, component, parser branch, or process rule needs a current consumer and evidence. Otherwise delete it." W18 PURSUES it by DISSOLVING the single-story `tools` debris bin and the 24-story `primitives` dumping-ground — both are IA over-fits (a category with one story, a category with no internal grouping discipline). MUST NOT VIOLATE by inventing a contrived category with no member rationale; the Forms-vs-Display split + the Glass/Material framing are coherent groupings with member evidence, not contrivance.

- **Substrate and consumer land together / substrate-with-consumer** (README §Core-Rules:8) — "A primitive that is not consumed is unfinished work." W18 DELETES the manifest rows of the component-pruned families (header-ribbon/glyph-face/disco-glyph/native-top-layer/glass-panel) — a row whose component has no consumer (and is excised by W19/W20) is an unfinished-work IA artefact. MUST NOT VIOLATE the coupling: the row drop SEQUENCES AFTER the component verdict rules (deleting a row whose export still ships trips `proof:storybook-complete` — the export→story totality is the substrate-with-consumer invariant enforced at the IA seam). The reinvented `dock` category is the AX-rebuilt dock's dogfood surface (W40 consumes it as the nav shell).

- **Wave close updates docs before the next wave opens / documentation-is-part-of-the-change** (README §Core-Rules:16; `tranche/DOC_UPDATE_WAVE.md`) — the IA gate fixture + the gate-header prose ARE documentation of the tree's shape. W18 PURSUES it by re-baselining `EXPECTED_TREE` + fixing the 11-vs-12 + "debris bins dissolve" header lies as part of the SAME change that authors the tree (the doc is not deferred). MUST NOT VIOLATE the ordering: re-baseline LAST, after live validation — a fixture re-baselined DURING authoring would re-freeze a mid-reinvention tree (the exact AV.W10 failure).

- **Gates close on evidence; no grep-only runtime gate** (README §Core-Rules:13-14; `tranche/SPEC.md §Hard Gates`; WAVE_SPEC §Prohibitions) — the three IA gates close on a parsed `manifest.ts` tree + a glob file-existence check + a live π-lane navigation render (NOT a grep over story names). The VISUAL-TRUTH live audit supplies the runtime evidence the headless tree-parse cannot (the route mounts a real SFC, not `MissingStory`) — a precept-valid runtime artefact, not a static bake.

- **π visual-runtime lane** (AX.W00; the §0 cardinal gate; keyframes' "Runtime Truth Beats Source Claims" 2026-04-29) — W18 closes on the live π-lane navigation audit, NOT the headless gate triad alone. This is the governing AX precept: NOTHING is "done" until audited GREEN against the live product. A reinvented IA whose routes render `MissingStory` live under a green headless triad is precisely the headless-green/visually-broken class W18 must close.

- **Wave items carry explication** (README §Core-Rules:18-20; `STYLE.md §Wave-item-explication`) — every Scope bullet names both WHAT (the IA change) and WHY (the slice-15 root-cause it folds). MUST NOT VIOLATE the meta-term gloss discipline (README:21-25): IA / gate / born-RED / π-lane / debris-bin are glossed at first use above.
