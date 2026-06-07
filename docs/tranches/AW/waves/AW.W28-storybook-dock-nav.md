# AW.W28 - storybook completeness + demo dock-nav (sidebar + bottom-bar)

## State

**Name**: W28 - storybook completeness + demo dock-nav (sidebar + bottom-bar)
**Opens after**: Band-F close (W22-W26 — the glass-atoms band) AND W20 (styling-assay) AND W27-close's gate-set registration; the demo shell dogfoods the glass-atoms material/affordance vocabulary those waves land, so it sequences strictly LAST in the band-G slot
**Agents**: 2 parallel (a — storybook-complete audit + the missing-story close; b — demo dock-nav shell refactor) — disjoint file bounds, see §4a
**Hard gate** (`proof:storybook-complete` + `proof:demo-dock-nav`): (1) every component exported from `src/index.ts` and every flat subpath barrel resolves to ≥1 live manifest story row (the exported-symbol→story map is total — no exported surface without a demonstration); (2) the demo shell renders TWO `GlassDock` instances — a vertical SIDEBAR dock (replacing `CategoryRail`) and a horizontal BOTTOM-bar dock (replacing the in-flow `StoryPager`) — and a Playwright probe drives a click through EVERY manifest category route, asserting each lands a live story page (zero `MissingStory` render-fallback, zero dangling route) and that the sidebar collapse↔expand morph + the bottom-bar active-story affordance paint across 3 viewports (375×667 · 768×1024 · 1440×900).
**Status**: planned

## 2a. Goal criterion

This wave succeeds if, when work ends, (1) the storybook is provably COMPLETE — no glass-ui component reachable from the public surface lacks a story, the 11-category IA stays balanced (no degenerate bin), and the completeness is machine-locked so a future export drift fails RED; and (2) the demo's core page navigation is rebuilt as a DOGFOOD of `GlassDock` + the W22-W26 glass atoms + the iOS-26 Liquid-Glass idiom — a vertical sidebar dock and a bottom-bar dock that together carry category + story navigation, render correctly at mobile/tablet/desktop, and route to every manifest entry. This is a DEMO-SHELL refactor and an existing-surface restyle: `GlassDock` is an already-shipped primitive with real consumers (it ships at the `/dock` subpath; the demo, slides, and instrument chassis consume it). This wave dogfoods and restyles it — it mints NO new library primitive, adds NO new public API, and names NO fake second consumer. The deliverable is demo-internal chrome plus a completeness audit.

## 3. Scope

1. **Storybook completeness audit + close any gap** (`demo/stories/manifest.ts`, `demo/stories/<category>/<id>.vue`) — enumerate every symbol exported from `src/index.ts` + the flat subpath barrels (the `/dock`, `/aurora`, `/configurator`, `/sidebar`, `/header-ribbon`, … families that never reach the root barrel), map each component-bearing export to ≥1 manifest story row, and CREATE a story SFC for any exported component with zero demonstration. The audit's verdict (cogency-audit Lane 23) is that the manifest is currently complete — so the EXPECTED delta is small (close any drift the audit's enumeration surfaces, not a bulk write). Composables/types/constants/CVA-fn exports are excluded from the component-story requirement (they live on the reference Composables shelf or are pure-type surfaces); the gate enumerates COMPONENT exports only.
2. **SidebarDock — the vertical category dock** (`demo/layout/SidebarDock.vue` create; replaces `CategoryRail.vue`) — a `GlassDock variant="rail" orientation="vertical"` instance carrying the brand wordmark + the primary category icon-buttons + the reference-shelf divider + Composables, composing the W22 unified `.glass-material` rim/specular and the iOS-26 Liquid-Glass substrate. It carries an EXPLICIT collapse↔expand affordance (icon-rail ⇄ icon+label), the active-category affordance moves from the bare `.is-active` color shift onto the NCSU-red accent + W25 `tap-squish` press feedback, and it auto-collapses to an off-canvas drawer trigger below the mobile breakpoint (see §Visual spec).
3. **BottomDock — the bottom-bar story dock** (`demo/layout/BottomDock.vue` create; replaces `StoryPager.vue`) — a `GlassDock orientation="horizontal" always-expanded fit-content overflow="scroll"` instance pinned to the viewport bottom, carrying the in-category story tabs (the `DockTabButton` set the pager carries today) PLUS the prev/next + prev/next-category controls that today live only as keyboard shortcuts. Active-story affordance is the NCSU-red underline/pill + `tap-squish` on press; it composes the W24 card-spacing geometry + the W26 `data-slot` idiom on its button set.
4. **AppShell rewire** (`demo/layout/AppShell.vue` modify) — swap the `CategoryRail` + in-flow `StoryPager` imports/renders for `SidebarDock` + `BottomDock`; restructure the flex shell so the sidebar is a fixed-rail column and the bottom dock is a viewport-anchored bar (the `<main>` route scroll-region sits between them). AppShell is the SOLE shell-layer edit this wave (and no other wave touches it — see cogency-audit Lane 24 §2).
5. **Delete the superseded nav chrome** (`demo/layout/CategoryRail.vue` delete · `demo/layout/StoryPager.vue` delete) — remove both once `SidebarDock`/`BottomDock` carry their roles; a grep post-edit confirms zero residual import of either component outside the deletion. NO legacy alias, NO re-export shim (house precept: clean break).
6. **Demo-local nav styles** (`demo/layout/dock-nav.css` create, imported by the two shell components) — the demo-internal layout rules (sidebar fixed-rail occupancy, bottom-bar viewport anchoring, collapse-morph transition, mobile off-canvas drawer geometry, the NCSU-red active accent binding). Every visual axis reads a `--dock-*`/`--glass-*` library token or a demo-local `--demo-nav-*` custom property — NO brittle magic literal where a token resolves (the W20 styling-assay discipline). This file is DEMO-PRIVATE; it does NOT touch `src/styles/`.
7. **Active-state + a11y contract** — the sidebar emits `aria-current="page"` on the active category button and the bottom dock emits it on the active story tab (preserving today's CategoryRail/StoryPager semantics); the sidebar root carries `aria-label="Category navigation"`, the bottom dock `aria-label="Stories in category"`; the collapse trigger carries `aria-expanded` bound to the dock's exposed `expanded` state (the GlassDock aria contract — `aria-expanded` on the TRIGGER, never the presentational dock root). The keyboard shortcuts (`[`/`]`/`{`/`}`) registered in AppShell stay wired to `useStoryNavigation`.
8. **Reuse `useStoryNavigation` as-is** — both docks consume the EXISTING `demo/composables/useStoryNavigation.ts` (`current`/`next`/`prev`/`nextCategory`/`prevCategory`/`firstOfCategory`). The composable is NOT modified — the manifest `meta.categoryId`/`meta.storyId` data shape is UNCHANGED, no new search/filter/grouping data layer is introduced (the cogency-audit Lane 24 §4 scope-creep guard).

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) when:

- the completeness enumeration reveals NOT a small drift but a structurally-missing FAMILY of stories (≥3 exported components with zero demonstration) — the file bounds expand from "close a gap" into a bulk-authoring sub-wave that must be re-planned, not absorbed;
- the sidebar/bottom-dock refactor requires a `src/components/custom/dock/` or `src/styles/dock.css` EDIT to render correctly (a missing dock prop, a collapse-morph bug, a glass-material seam the dock can't express) — this is a LIBRARY-primitive change, out of this wave's demo-only bounds, and must escalate to a dock-primitive wave (the demo consumes the dock AS-IS; a needed library edit invalidates the wave's framing);
- the Playwright route-walk's third red iteration is RED for a reason OTHER than a real nav defect (a headless-render flake mounting a WebGL substrate story, a portal-surface timing race) — halt and re-derive the probe's wait/mount strategy rather than weaken the route-reachability assertion to a grep-only check (a grep-only runtime gate is prohibited);
- the mobile off-canvas drawer fallback cannot be expressed with `GlassDock` + a reka/glass-ui overlay primitive without a new demo component family — re-derive the mobile pattern (a `<Sheet>`/`<Drawer>` host over the sidebar dock) rather than minting a speculative `MobileNav` primitive.

## 4. File Bounds

| File | Access |
|---|---|
| `demo/stories/manifest.ts` | modify (append any missing-story row only — small expected delta) |
| `demo/stories/<category>/<id>.vue` | create (a story SFC ONLY for an exported component the audit finds undemonstrated) |
| `demo/layout/SidebarDock.vue` | create |
| `demo/layout/BottomDock.vue` | create |
| `demo/layout/dock-nav.css` | create |
| `demo/layout/AppShell.vue` | modify (swap rail/pager for SidebarDock/BottomDock + shell restructure) |
| `demo/layout/CategoryRail.vue` | delete |
| `demo/layout/StoryPager.vue` | delete |
| `scripts/proof-storybook-complete.mjs` | create (the exported-symbol→story totality gate) |
| `scripts/proof-demo-dock-nav.mjs` | create (the structural half — two-dock shell + route-set) |
| `tests/demo/demo-dock-nav.spec.ts` | create (the Playwright route-walk + 3-viewport render probe) |
| `package.json` | modify-carve (the `proof:storybook-complete` + `proof:demo-dock-nav` script entries only) |

Do NOT touch: `src/` (ANY library source — the dock + Configurator + carousel are consumed AS-IS; a needed src edit is a §3a triumvirate trigger), `src/styles/dock.css` (the dock surface is composed, not edited — demo styles live in `demo/layout/dock-nav.css`), `demo/composables/useStoryNavigation.ts` (consumed unchanged — no new data layer), `demo/router.ts` (the manifest-derived routes are unchanged; the nav rebuild rewires the SHELL, not the route table), `scripts/proof-storybook-ia.mjs` + `scripts/proof-no-orphan-demo-route.mjs` (the existing IA/orphan gates — `proof:storybook-complete` is the DISTINCT totality gate over the public EXPORT surface, not the manifest-tree freeze; do not edit them), `docs/precepts/` (NEVER).

## 4a. Disjointness

Two parallel agent units write disjoint paths:

- **a (storybook-complete)** owns `demo/stories/manifest.ts`, any new `demo/stories/<category>/<id>.vue`, and `scripts/proof-storybook-complete.mjs`. It does NOT touch `demo/layout/`.
- **b (demo-dock-nav)** owns all of `demo/layout/` (SidebarDock/BottomDock/dock-nav.css create, AppShell modify, CategoryRail/StoryPager delete), `scripts/proof-demo-dock-nav.mjs`, and `tests/demo/demo-dock-nav.spec.ts`. It does NOT touch `demo/stories/`.
- Both append a `package.json` script entry — the two entries are line-disjoint additive lines; sequence the two `package.json` writes serially (b after a) or have the orchestrator apply both script entries in one integration edit. No two units share a `modify`/`modify-carve`/`create`/`delete` path otherwise.

No other AW wave writes any `demo/layout/` path — AppShell is singular and demo-system-critical (cogency-audit Lane 24 §2); W28.b is its sole permitted editor.

## 4b. Worktree Plan

| Agent unit | Sibling worktree absolute path | CARGO_TARGET_DIR |
|---|---|---|
| AW.W28.a | `/Users/mkbabb/Programming/glass-ui-aw-w28-a` | n/a (JS/Vue — no Rust target) |
| AW.W28.b | `/Users/mkbabb/Programming/glass-ui-aw-w28-b` | n/a |

The orchestrator runs `git worktree list` + `git worktree add` before dispatch, or commits W28.a's `manifest.ts`/story writes before dispatching W28.b so both share clean main (the `package.json` script-entry serialization is the only cross-unit ordering constraint).

## Visual + interaction spec (3 viewports)

The design language is warm-cream glass field + iOS-26 Liquid Glass (W22-W23 rim/specular/refract) + the W24-W26 atoms + NCSU-red active accent.

**Desktop (1440×900) — fixed sidebar + bottom bar.**
- Sidebar: a `variant="rail" orientation="vertical"` `GlassDock` pinned as the left column. Collapsed (default) = icon-rail at `--dock-collapsed-inline-size` (~72-80px); expanded = icon+label rail (~220px) on the collapse-trigger toggle. The brand wordmark caps the top; primary category icon-buttons fill the rail; a hairline divider then the reference Composables shelf. Active category = NCSU-red icon + a left-edge accent rule, `aria-current="page"`.
- Bottom dock: a horizontal `always-expanded fit-content overflow="scroll"` `GlassDock` anchored to the viewport bottom (NOT in document flow — it floats over the `<main>` scroll-region's bottom inset, so route scroll never displaces it). It carries the in-category story tabs + prev/next + prev/next-category controls. Active story = NCSU-red underline/pill, `aria-current="page"`, `tap-squish` on press.

**Tablet (768×1024) — sidebar collapses to icon-rail, bottom bar persists.**
- Sidebar stays a fixed icon-rail (collapsed, no expand by default; the expand toggle still available). Bottom dock keeps its full story-tab + control set, scrolling horizontally when the tab row overflows.

**Mobile (375×667) — off-canvas sidebar, bottom bar primary.**
- The sidebar dock moves OFF-CANVAS behind a single dock-icon trigger in the bottom dock (a `<Sheet>`/`<Drawer>` host over the `GlassDock` rail — reusing a shipped glass-ui overlay primitive, NOT a new component). The bottom dock is the primary nav surface: category trigger + story tabs + prev/next, horizontally scrolling, pinned bottom with a safe-area inset. The active-story affordance and `tap-squish` are unchanged across viewports.

Collapse/expand morph: the sidebar width transition rides the EXISTING `GlassDock` collapse machinery (the W1/W2 single-timeline lockstep + W3 spring physics) — the demo does NOT re-roll the morph; it sets the dock prop and lets the dock animate. The active affordance, the NCSU-red accent, and the bottom-bar anchoring are the demo-local additions in `dock-nav.css`.

## 5. Agent Units

### AW.W28.a Storybook-completeness audit + missing-story close

- Goal: prove the storybook demonstrates EVERY publicly-exported component, and close any gap the enumeration surfaces.
- Mechanism: `scripts/proof-storybook-complete.mjs` parses `src/index.ts` + each flat subpath barrel for component-bearing exports, parses `demo/stories/manifest.ts` for the story→component mapping (the manifest `sourceFiles`/blurb + the story SFC import graph), and asserts the export→story map is TOTAL over component exports. For any undemonstrated component, author its story SFC under the correct category folder + append the manifest row. Composables/types/constants are excluded by an explicit allowlist documented in the gate.
- Files: `scripts/proof-storybook-complete.mjs` (create), `demo/stories/manifest.ts` (modify), `demo/stories/<category>/<id>.vue` (create as needed).
- Sub-gate: `npm run proof:storybook-complete` is GREEN — every component export resolves to ≥1 live story; born-RED is demonstrable by temporarily exporting a dummy component with no story (the gate RED) or, if the audit confirms zero gaps at HEAD, the gate is born-RED against a synthetic missing-export fixture committed-then-reverted in the gate's own self-test block.

### AW.W28.b Demo dock-nav shell refactor

- Goal: rebuild the demo core nav onto a vertical sidebar `GlassDock` + a bottom-bar `GlassDock`, dogfooding the dock + glass atoms + iOS-26 across 3 viewports, routing to every manifest entry.
- Mechanism: create `SidebarDock.vue` + `BottomDock.vue` + `dock-nav.css`; rewire `AppShell.vue` to render them; delete `CategoryRail.vue` + `StoryPager.vue`. `scripts/proof-demo-dock-nav.mjs` asserts the structural shape (AppShell renders both docks; CategoryRail/StoryPager are deleted with zero residual import; both docks consume `useStoryNavigation`). `tests/demo/demo-dock-nav.spec.ts` (Playwright) boots the demo, walks a click through every manifest category route asserting a live story lands (zero MissingStory), and screenshots the sidebar collapse/expand + bottom-bar active affordance at 375×667 · 768×1024 · 1440×900.
- Files: `demo/layout/{SidebarDock,BottomDock}.vue` (create), `demo/layout/dock-nav.css` (create), `demo/layout/AppShell.vue` (modify), `demo/layout/{CategoryRail,StoryPager}.vue` (delete), `scripts/proof-demo-dock-nav.mjs` (create), `tests/demo/demo-dock-nav.spec.ts` (create).
- Sub-gate: `npm run proof:demo-dock-nav` is GREEN — the structural probe sees two `GlassDock` shell instances + zero `CategoryRail`/`StoryPager` residue, and the Playwright route-walk reaches every category route with a live story render across the 3 viewports; born-RED on HEAD because `CategoryRail.vue`/`StoryPager.vue` exist and no `SidebarDock`/`BottomDock` is present, so the structural probe fails immediately.

## 6. Hard Gate

1. **`proof:storybook-complete` — exported-component→story totality.** `node scripts/proof-storybook-complete.mjs` parses `src/index.ts` + the flat subpath barrels for component exports, parses the manifest, and asserts every component export maps to ≥1 live story SFC that resolves on disk. RED if any component export has zero demonstration. Distinct from `proof:storybook-ia` (the manifest-tree freeze) and `proof:no-orphan-demo-route` (the file↔row bijection): those freeze the EXISTING tree; this one closes the EXPORT-surface→story loop. Born-RED is provable against a synthetic dummy export with no story.
2. **`proof:demo-dock-nav` (structural) — the two-dock shell + clean delete.** `node scripts/proof-demo-dock-nav.mjs` asserts: `AppShell.vue` imports + renders `SidebarDock` AND `BottomDock`; `CategoryRail.vue` + `StoryPager.vue` are DELETED and grep finds zero residual import of either anywhere in `demo/`; both new docks render a `GlassDock` and consume `useStoryNavigation`. Born-RED on HEAD (CategoryRail/StoryPager exist; SidebarDock/BottomDock absent).
3. **`proof:demo-dock-nav` (runtime) — the Playwright route-walk + 3-viewport render.** `tests/demo/demo-dock-nav.spec.ts` boots the demo dev/preview server, drives a click through EVERY manifest category route via the sidebar dock, and asserts each lands a live story page with NO `MissingStory` fallback and NO dangling route; then captures the sidebar collapse↔expand morph (≥5 frames) and the bottom-bar active-story affordance (the NCSU-red accent + `tap-squish` scale on press) at 375×667, 768×1024, 1440×900 in light + dark. Screenshots saved to `docs/tranches/AW/audit/` (see §8). A grep-only check is NOT sufficient — the runtime render is the falsifier.
4. **A11y/contrast floor.** The Playwright probe asserts the sidebar icon + bottom-bar text clear WCAG-AA contrast on the cream-glass surface (≥4.5:1) and the NCSU-red active state clears ≥4.5:1 on every surface (light + dark); the collapse trigger carries `aria-expanded`, the active category/story buttons carry `aria-current="page"`, and the dock roots carry their `aria-label`. RED on any contrast or aria-contract violation.
5. **No-src-edit proof.** `git diff --name-only` over the wave's commits touches ONLY `demo/`, `scripts/`, `tests/demo/`, `package.json`, and `docs/tranches/AW/` — zero `src/` path. A `src/` edit fails the wave (the demo consumes the dock/Configurator/carousel as already-shipped primitives).

## 7. Format And Lint Cadence

This is a docs-authoring wave for the spec FILE; the IMPLEMENTATION it specifies runs the repo's standard cadence at each integration batch and at close: `npm run typecheck` (vue-tsc over demo + src), `npm run lint` (eslint/prettier over the new `demo/layout/*.vue` + `scripts/*.mjs` + `tests/demo/*.spec.ts`), and `git diff --check` for whitespace. For THIS spec doc: `git diff --check` + the repo's markdown/doc checks. No formatter is skipped.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/aw-w28-storybook-complete.txt` — the `proof:storybook-complete` gate output (the export→story totality table + GREEN stamp).
- `docs/tranches/AW/audit/aw-w28-dock-nav-structural.txt` — the `proof:demo-dock-nav` structural-probe output (two-dock shell + zero-residue grep).
- `docs/tranches/AW/audit/aw-w28-nav-1440.png`, `aw-w28-nav-768.png`, `aw-w28-nav-375.png` (+ `-dark` companions) — the 3-viewport sidebar-collapse + bottom-bar-active-affordance screenshots from the Playwright probe.
- The Playwright route-walk log (every category route → live-story assertion) saved alongside the screenshots.
- The wave-close commit hash recorded in `AW.W27-close.md` (the close-fold renumber notwithstanding — see §10).

## 9. Commit Plan

- `feat(demo-aw-w28): storybook-completeness gate + close any undemonstrated component` (W28.a — manifest row(s) + any new story SFC + `proof:storybook-complete` script).
- `feat(demo-aw-w28): rebuild demo nav on GlassDock sidebar + bottom-bar docks` (W28.b — SidebarDock/BottomDock/dock-nav.css create, AppShell rewire, CategoryRail/StoryPager delete; commit body required — a deletion + shell-refactor change naming the dogfooded primitive + the deleted chrome).
- `test(demo-aw-w28): Playwright route-walk + 3-viewport dock-nav probe` (the runtime gate spec + the `proof:demo-dock-nav` script + the `package.json` entries).
- `docs(tranche-aw): W28 close — storybook complete + demo dock-nav landed` (status + verification artefacts).

## 10. Dependencies

- **Depends on**: W22-W26 (Band-F glass-atoms — the `.glass-material` rim/specular, `tap-squish`, `data-slot`, card-spacing the docks compose), W20 (styling-assay — the token-first/no-brittle-literal discipline `dock-nav.css` inherits), W1-W3 (dock-motion — the collapse-morph machinery the sidebar rides), W27-close (gate-set registration — `proof:storybook-complete` + `proof:demo-dock-nav` register in `scripts/gates.mjs` at/after the close fold).
- **Blocks**: the AW close (the demo shell is the headline dogfooding surface; the close report cites the W28 artefacts). This wave is band-G, sequenced LAST.

## Archaeology

The demo nav already rides `GlassDock` today (`CategoryRail` = `variant="rail"`; `StoryPager` = horizontal `always-expanded`) — this wave is NOT a from-scratch nav invention but a RESTYLE + completion: it lifts the sidebar onto an explicit collapse affordance + the W22-W26 atoms, promotes the in-flow pager to a viewport-anchored bottom-bar dock, and moves the active-state affordance from the bare `.is-active` color shift onto the NCSU-red accent + `tap-squish`. The cogency-audit (Lane 23, Lane 24) flagged this as the deferred-but-unseeded scope item; its PATH-B verdict (re-scope as a demo-internal refactor, NOT a new ≥2-consumer primitive) is the framing adopted here — `GlassDock` is the already-shipped, multi-consumer primitive; this wave dogfoods it, it does not mint a new one.

## Band-G note (for the reconciler)

This wave opens the new band G (W28-W32: storybook-dock-nav, configurator-redesign, carousel-redesign, perf-a11y, naming-consistency per the cogency-audit fold list). The AW close renumbers W27-close → W33 at reconciliation; the reconciler owns that renumber. This file stays `AW.W28-storybook-dock-nav.md` until the reconciler retitles the close.
