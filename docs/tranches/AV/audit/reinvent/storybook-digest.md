# Storybook re-invention + prune synthesis (32-agent)

All facts confirmed. `instrument-chassis` and `instrument-rail` are both root-barrel exports (so removal = src-component removal + migration, not a demo-route-only prune). `instrument-chassis` has a second consumer (`chart-chassis-palette.vue`), `instrument-rail` has zero demo stories. The font canon is clear: Plus Jakarta Sans + Fira Code are the only faces declared in demo.css; Fraunces is shipped in src/fonts but un-declared and the defaults.ts still prescribes Computer Modern Serif + Fraunces (neither declared).

I have enough to synthesize. Here is the deliverable.

---

# Storybook Re-Invention + Prune — Synthesis

## 1. THE NEW SIDEBAR IA

11 categories + 1 reference-collapse. Substrates elevated early, dock consolidated, sliders cut to two, single-story debris dissolved, configurator/hover-popover out of Primitives.

```
Foundations            (Compass)
  intro · colors · typography · radii · shadows · motion
  paper-glass · icons · surface-tints · overlays-scrims
  chart-chassis-palette · paper-backdrop-texture-system
  dock-active-tokens        ← from dock/icon-button-token-ladder (token doc, not a component)
  css-utilities             ← from utilities/scale-on-hover (CSS @utility doc)
  — REMOVED: native-top-layer (relocates to Containers/Dialog as :native opt-in)

Substrates             (Droplet)         ← NEW, sits 2nd (after Foundations)
  aurora                    ← from FLAT_STORIES, shipped /aurora
  goo-blob                  ← from FLAT_STORIES, shipped /goo-blob (+ WatercolorDot)
  glass-panel               ← from Primitives (renderer-tier ladder, a substrate not a UI primitive)
  — REMOVED: blob (demo-only canvas-2D, zero shipped consumer, aurora supersedes)

Primitives             (Shapes)          ← ship-grade core only
  buttons · card · inputs · textarea · checks · slider · number-field
  select · combobox · multi-select · toggle · toggle-chip · label
  badge · separator · section
  metric-badge · metric-pill
  status-dot · pulse · stacked-icons
  glyph-face · disco-glyph
  — OUT: configurator → Compositions ; hover-popover → Containers
  — OUT: glass-panel → Substrates ; paper-backdrop → Foundations (texture story)
  — OUT (relocate): dark-mode-toggle → Controls-reference ; expandable-container → Containers
  — OUT (relocate): form-validation, labeled-field, icon-tooltip → Compositions (recipes)

Containers             (Boxes)
  dialog (+ :native top-layer toggle) · sheet · drawer · popover
  dropdown-menu · context-menu · hover-card · tooltip
  accordion · collapsible
  hover-popover             ← from Primitives (popover-tier floating surface)
  expandable-container      ← from Primitives (Teleport + overflow-lock container)
  — OUT: alert → Feedback ; glass-carousel → Navigation

Navigation             (Navigation)
  tabs (bouncy-tabs merged in as a variant section)
  dock · dock-layers · dock-rail        ← consolidated dock IA (3 subsections)
  carousel · glass-carousel             ← glass-carousel relocated from Containers
  — OUT: command → Tools

Data                   (Database)        ← unchanged, coherent
  table · data-table · tags-input · avatar · sortable-list
  infinite-scroll · timeline · timeline-segmented · timeline-continuous
  search · scrolling-text

Feedback               (Bell)
  alert                     ← from Containers (role="alert" is feedback)
  toast · toaster · notification · progress · skeleton · confirm-dialog

Motion                 (Sparkles)        ← deduped vs Composables
  transitions · springs · typewriter
  — REMOVED: stagger (dup of composables/use-stagger-reveal)
  — REMOVED: scroll-type (dup of composables/use-scroll-progress)

Tools                  (Command)         ← NEW (or fold into Foundations if single)
  command                   ← from Navigation (search/command tool, not nav structure)

Compositions           (LayoutDashboard)
  hero · math-paper · dashboard · auth-shell · settings · empty-states
  dock-with-slider · drawer-live-behind
  configurator              ← from Primitives (studio shell, Aurora is its consumer)
  form-validation · labeled-field · icon-tooltip   ← recipes from Primitives
  — REMOVED: instrument-chassis (see prune ledger — src removal)

Composables            (Cog)             ← reference-only, collapsible below fold
  23 PUBLIC composables retained (all root-barrel/subpath exported)
  — REMOVED: use-story-demo (demo-private, not exported)
```

**Dissolved categories:** `custom` (header-ribbon removed), `dock` (token-ladder → Foundations), `utilities` (scale-on-hover → Foundations), `sliders` (glass-scrubber → primitives/slider). FLAT_STORIES retired — aurora/goo-blob become Substrates rows; blob removed.

**The two sliders** (per slider lanes): `primitives/slider` shows exactly **standard** (the promoted glass-scrubber tall-track + rounded iOS knob, continuous track no offset) and **spectrum**. Variants `timeline`, `glass-pill`, `glass-cartoon` cut from the CVA. The standalone `sliders` category is gone.

**Disputed-call resolution (lanes disagreed):**
- **glyph-face** — KEEP visible. Two lanes flagged remove; `sec-primitives-1`/`ia-restructure` keep it (shipped root-barrel primitive, DiscoGlyph cooperates via provide/inject). The "demo-only" claim is wrong: it's a public primitive with a clear story. Kept in Primitives.
- **status-dot** — KEEP. `sec-primitives-3` flagged remove; `sec-navigation` + `ia-restructure` show it shipped + multi-consumer. Kept.
- **header-ribbon** — REMOVE story (demo-route-only); component stays shipped. Six of seven lanes agree.
- **configurator** — RELOCATE to Compositions, not remove. It's Aurora's real studio shell; deleting the story orphans a shipped chassis. Majority (`sec-primitives-2/3`, `prune-ledger`) say relocate.

---

## 2. THE PRUNE LEDGER

Disposition rule: **demo-route-only** = delete the `.vue` story + manifest row, component stays shipped. **src-removal** = component is unshipped/orphan (<2 consumers, no real binding) → delete dir + subpath + migration note.

### REMOVE — demo-route-only (component stays on public surface)
| Item | Why | Action |
|---|---|---|
| `custom/header-ribbon.vue` | Shipped (root barrel + /header-ribbon) but zero app consumer; demo-orphan | Delete story + dissolve `custom` category |
| `dock/icon-button-token-ladder.vue` | CSS-token doc (`--dock-active-*`), not a component | Move to `foundations/dock-active-tokens` |
| `utilities/scale-on-hover.vue` | `@utility` doc, not a component | Move to `foundations/css-utilities` |
| `motion/stagger.vue` | Dup of `composables/use-stagger-reveal` | Delete row |
| `motion/scroll-type.vue` | Dup of `composables/use-scroll-progress` | Delete row |
| `composables/use-story-demo.vue` | `useStoryDemo` is demo-private (not in src barrel) | Delete row |
| `blob` (FLAT_STORY) | demo-only canvas-2D substrate, no shipped component | Delete flat story + `demo/stories/blob.vue` |

### REMOVE — src-component removal + migration (orphans, <2 consumers)
| Item | Consumer audit | Action + migration |
|---|---|---|
| `metric-cell` | 0 demo, 0 src consumer, 0 public-surface.spec entry; only `src/metric-cell.ts` subpath exists | Delete `src/components/custom/metric-cell/` + `src/metric-cell.ts` + `api/index.ts` entry. MIGRATION.md: subpath retired, 0 external consumers. |
| `metric-stack` | 0 demo, 0 src consumer (only own test); subpath `src/metric-stack.ts` | Delete dir + subpath + api entry. MIGRATION.md note. |
| `instrument-rail` | Root-barrel exported (line 134) but **zero demo story**; consumed only inside `InstrumentChassis.vue` | If InstrumentChassis is also removed (below), retire instrument-rail with it — it's substrate-without-consumer. Drop root-barrel line 134 + `src/instrument-rail.ts` + dir. MIGRATION.md. |
| `instrument-chassis` (story + maybe component) | Story in Compositions; component has **2 consumers** (composition story + `foundations/chart-chassis-palette.vue`). Per user directive "instrument items removed" + 2-consumer rule | **Two-stage:** (a) remove `compositions/instrument-chassis.vue` story. (b) If `chart-chassis-palette` is also dropping its chassis demo, the component falls below 2 consumers → remove src dir + root-barrel line 133 + subpath. If chart-chassis-palette keeps it, component STAYS shipped, only the story is pruned (demo-route-only). **Gate decision needed at wave time** — see AV.W2 Lane D. |

### DEDUP
| Pair | Verdict | Action |
|---|---|---|
| `metric-badge` ↔ `metric-pill` | **NOT a dedup — keep both.** MetricPill is a clean composition over MetricBadge (`size=lg` + `labelPosition=stacked` + `density=spacious` baked). Majority of lanes (`sec-primitives-1`, `sec-navigation`, `ia-restructure`) say keep. | No src change. Optional W4: clarify blurbs so the composition relationship reads in the sidebar. Both stories stay in Primitives. |
| `bouncy-tabs` ↔ `tabs` | Variant, not standalone | Merge `bouncy-tabs` into `tabs` story as a variant section; drop the row |
| Slider variants | 6 → 2 | Delete `timeline`, `glass-pill`, `glass-cartoon` from `Slider.vue` CVA + `index.ts`; promote glass-scrubber track to the standard knob recipe |

### FIX — broken, routed to component waves
| Item | Symptom | Route |
|---|---|---|
| `native-top-layer` | AQ.W6 pilot — capability-probe wiring unverified | → Containers wave: fold into `dialog` as a `:native` opt-in toggle; verify `commandfor`/`interestfor`/`.glass-top-layer` probe live |
| `card` shadow/grain toggles | "toggles don't work" — Switch v-model bound but state not reflecting on surface | → Primitives/card wave: verify Switch `v-model` → CSS state class application live |
| `carousel` progress | "progress bar broken" — only dots + counter pill exist, no continuous bar | → Navigation/carousel wave: confirm dots+pager state sync at runtime; rename pager to "counter" or add an explicit progress section. **Not a binding bug — a missing abstraction.** |
| fonts | defaults.ts prescribes un-shipped faces | → see §3 |
| `glass-panel` | renderer-tier detection (svg-filter→css→fallback) accuracy unconfirmed | → Substrates wave: verify `useGlassRenderer` tier detection + manual override live |

---

## 3. THE FONT DIAGNOSIS

**Font loading is NOT broken.** `demo.css` declares `@font-face` for **Plus Jakarta Sans** + **Fira Code** with correct `../src/fonts/*` relative paths that resolve in Vite dev/preview. Both faces ship in `src/fonts/`. That half is healthy.

**The real defect is stale defaults prescribing faces that are never loaded.** `demo/configurator/preset-editor/defaults.ts` still hard-codes the un-shipped, un-declared legacy canon:
- `FONT_OPTIONS` offers `cm-serif` (Computer Modern Serif), `fraunces`, `general-sans`, `inter` — **none of these have an `@font-face` in demo.css.**
- `DEFAULT_CONFIG.font` sets `serif`/`sans` → Computer Modern Serif and `display` → Fraunces.

So any text bound to `--font-display`/`--font-serif` falls all the way through to the Georgia/serif fallback — the configurator advertises faces the browser can never paint. (`fraunces` woff2 even exists in `src/fonts/fraunces/` but is deliberately un-declared — the comment in `demo/fonts.ts:12` calls it the "legacy Fraunces option," off-brand and retired.)

**The fix (no-legacy, KISS):** strip `FONT_OPTIONS` and `DEFAULT_CONFIG.font` down to the published canon only — **Plus Jakarta Sans** (sans/display), **Fira Code** (mono), plus system fallbacks. Delete the `cm-serif`, `fraunces`, `general-sans`, `inter`, `jetbrains-mono` options. Keep demo.css untouched (it's correct). Verify at runtime: computed `font-family` on heading/body/mono resolves to the loaded faces, no 404 on `../src/fonts/*.woff2`.

---

## 4. THE AV WAVE SPECS

### AV.W1 — Storybook Re-Invention (IA + demo restructure)
**Scope:** Rewrite `demo/stories/manifest.ts` to the 11-category IA in §1. Move stories between folders, retire `custom`/`dock`/`utilities`/`sliders` categories, convert `aurora`/`goo-blob` from FLAT_STORIES into a `Substrates` category, drop `blob`. Recategorize configurator → Compositions, hover-popover + expandable-container → Containers, alert → Feedback, command → Tools, glass-carousel → Navigation, glass-panel → Substrates, paper-backdrop → Foundations. Merge bouncy-tabs into tabs. Collapse Composables below-fold. Update `router.ts` + `AppShell.vue` + `CategoryRail.vue` for the new tree and the reference-collapse.

**Agent-units:**
- Lane A — manifest rewrite (categories, ordering, FLAT_STORIES → Substrates, dissolve debris)
- Lane B — physically move/rename the `.vue` story files to their new folders so `import.meta.glob` keys match
- Lane C — `CategoryRail.vue` / `AppShell.vue` / `router.ts` rail + collapse rendering + icon reassignment (Substrates=Droplet, Tools=Command; resolve Boxes collision between Containers and old Dock)

**Gate:**
- `proof:storybook-ia` — every CATEGORIES row resolves to a real SFC; no `MissingStory:*` render fallback fires; category/story id set matches the §1 tree exactly.
- `proof:no-orphan-demo-route` — every `demo/stories/**/*.vue` is referenced by exactly one manifest row, and every manifest row resolves to a file (no dangling rows, no orphan files).

### AV.W2 — Prune (removals + dedups, each with migration)
**Scope:** Execute the prune ledger. Demo-route removals (header-ribbon, token-ladder→relocate, scale-on-hover→relocate, motion dups, use-story-demo, blob). Src-removals with migration (metric-cell, metric-stack, instrument-rail, conditional instrument-chassis). Slider CVA cull (6→2). bouncy-tabs merge.

**Agent-units:**
- Lane A — demo-route prunes + relocations (delete stories, move token/utility docs into Foundations)
- Lane B — src-removal: `metric-cell` + `metric-stack` (dirs + `src/*.ts` subpaths + `api/index.ts` entries + `package.json` exports); MIGRATION.md notes (0 external consumers)
- Lane C — Slider variant cull (`Slider.vue` CVA + `index.ts`): delete timeline/glass-pill/glass-cartoon, promote glass-scrubber to standard; restructure `primitives/slider.vue` to the 2×3 matrix; update `dock-with-slider.vue` to drop glass-pill demo
- Lane D — **instrument-chassis/rail gated removal**: first determine whether `chart-chassis-palette.vue` keeps its InstrumentChassis demo. If yes → demo-route prune only (story gone, component stays, ≥2-consumer rule still met via chart-chassis-palette... actually re-count: only 1 consumer remains → src-removal). Resolve the count, then remove `instrument-chassis` + `instrument-rail` src dirs + root-barrel lines 133-134 + subpaths if below threshold. MIGRATION.md.

**Gate:**
- `proof:no-orphan-export` — every `src/*.ts` subpath + root-barrel re-export + `api/index.ts` symbol resolves to an existing dir; no dangling subpath after metric-cell/stack/instrument-rail removal.
- `proof:overfitting-audit` (existing canned prompt) — every remaining `src/` artefact has ≥2 sites OR is exported OR is a private demo helper. Run at wave close.
- `proof:resolution` (existing) — `package.json` exports stay fail-closed after subpath deletions.
- `npm run typecheck` + `npm run build` green.

### AV.W3 — Broken-Fixes (routed to component waves)
**Scope:** The five FIX items, each landed in its component's lane, verified live at `localhost:5175` via the browser tools.

**Agent-units:**
- Lane A — **fonts**: strip `defaults.ts` `FONT_OPTIONS` + `DEFAULT_CONFIG.font` to Plus Jakarta Sans + Fira Code + system; verify computed font-family + zero woff2 404s
- Lane B — **native-top-layer**: fold into Containers/dialog as `:native` toggle; verify capability probe (`anchor-positioning`, `commandfor`, `interestfor`, `.glass-top-layer`) live
- Lane C — **card toggles**: verify Switch `v-model` → surface state-class reflection (shadow/grain) renders live
- Lane D — **carousel progress**: confirm dots+pager state sync; add explicit progress abstraction or rename pager to counter
- Lane E — **glass-panel**: verify `useGlassRenderer` tier cascade + manual override live

**Gate:**
- `proof:fonts-canon` — no `font-family` in `defaults.ts` references a face without a matching `@font-face` in `demo.css`.
- Live verification per lane (browser screenshot + computed-style / console check); no console errors, no 404s.
- `proof:storybook-ia` + `proof:no-orphan-demo-route` re-run green (W1 invariants hold after fixes).

---

## HEADLINE

**16 messy categories collapse to 11 coherent ones: Substrates rise to the top (aurora + goo-blob + glass-panel), dock unifies into Navigation, sliders cut from six variants to two, and the single-story debris bins (custom/dock/utilities/sliders) dissolve into Foundations — while a 3-wave AV plan prunes 7 demo-route orphans + 2-to-4 src orphans (metric-cell/stack always, instrument-rail/chassis on a consumer recount), keeps the metric-badge/pill composition intact, and fixes the one real font bug — not a loading failure, but a defaults table still prescribing Computer Modern Serif + Fraunces that demo.css never loads.**
