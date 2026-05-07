# K — Research Rγ — J FINAL residuals to wave-spec candidates

**Authored**: 2026-05-06.
**Lane**: γ — convert J FINAL residuals into K wave-spec scope.
**Mode**: READ-ONLY on src/+demo/+tests/+docs/ (write only on this file).
**Inputs**: J/FINAL.md, J/J.md cross-tranche debt, J/audit/J-audit-{α,β,γ,δ,ε,π}-*.md, CLAUDE.md, DESIGN.md, README.md.

---

## §A — J residuals re-verification table

Each residual independently re-verified at HEAD `c5f196c`. Citations are file:line; rg / Read evidence anchors every "still present" verdict.

| # | Residual (verbatim from J FINAL / J.md) | Verified at HEAD? | Evidence |
|---|---|---|---|
| R1 | CLAUDE.md major refresh — file-tree + subpath + Design Axes (11 drift items per γ) | **YES** | On-disk `CLAUDE.md` is 204 lines; ends at consumer-wiring example; no Design-Axes section. claudeMd context shows the canonical post-J + Q-tranche text (axes + 13 composable groups + Q HoverPopover instrument-cluster citation). γ doc-drift audit line 40-59 enumerates 11 items |
| R2 | README.md drift (7 items per γ) | **YES** | `README.md` 180 lines; says "32 shadcn-vue components" (HEAD ships 39 ui dirs + 1 barrel); `:38-39` shows retired `--glass-opacity-subtle` token override; `:74-76` lists only 3 custom packages (HEAD ships 29). γ §3 enumerates 7 drift items |
| R3 | Bundle-budget gate re-land (I invariant 8 — `npm run profile:budget` + GitHub workflow + BUDGETS table) | **YES** | `package.json` scripts: `profile:budget` MISSING (only `profile:bundle` + `profile:aurora`); `scripts/profile-bundle.mjs` is the F.W1 version with no `BUDGETS` table; ε P1-A. Would PASS with ~30% headroom (`glass-ui.js` raw 142 966 / budget 200 000) |
| R4 | 5 demo stories raw `focus-visible:shadow-[var(--focus-ring-shadow)]` | **YES** (5 sites) | `rg "focus-visible:shadow-\[var\(--focus-ring-shadow\)\]" demo/`: `combobox.vue:48`, `foundations/shadows.vue:61` (foundations demo — acceptable), `foundations/intro.vue:69`, `layout/CategoryRail.vue:33`, `navigation/dock-layers.vue:49`. Per δ §3 — PresetEditor.vue + PresetEditorField.vue raw shadow recipes additional MEDIUM-severity bypasses |
| R5 | 3 demo `--surface-tint` bypasses | **PARTIAL** (1 raw `--foreground` site + others out-of-scope) | `rg "color-mix\(in srgb, var\(--foreground\) "`: `demo/stories/aurora/NucleiOverlay.vue:68` (22% → should be `--surface-tint-22`), `demo/stories/foundations/paper-glass.vue:184` (8% → `--surface-tint-8`). δ §2 also flags `ProgressiveSidebar.vue:209` (40% — library survivor, between rungs) |
| R6 | `motion/stagger.vue:59` `transition-all` survivor | **YES** | `rg "transition-all" demo/`: `demo/stories/motion/stagger.vue:59` exact match. Plus 1 library survivor `src/components/ui/carousel/CarouselDots.vue:62` (W6.C.2 bypass — separate finding) |
| R7 | `--{success,warning,info}-foreground` 0 consumers | **YES** | `rg "(success\|warning\|info)-foreground" src/ demo/` — only `theme.css:89-91` bridges + `tokens.css:254-256, 658-660` defs. 0 production consumers in src/ or demo/ |
| R8 | `cssVar()` ≥ 2 consumer bar (1 consumer at HEAD: BouncyToggle) | **YES** | `rg "\bcssVar\(" src/ demo/` returns 4 hits: 3 in `BouncyToggle.vue:130-132`, 1 in `cssVar.ts:21` (def). 1 distinct consumer file |
| R9 | `.overlay-scrim` @utility shadowed by canonical `bg-overlay-scrim` Tailwind utility | **YES** | `utilities.css:432` `@utility overlay-scrim {…}` block exists; canonical consumers all use the `bg-overlay-scrim` Tailwind utility from the `@theme` color bridge (5 sites: ConfirmDialog, SheetContent, DialogContent, DialogScrollContent, DrawerOverlay). 0 sites consume the named `@utility` block |
| R10 | Top story-pager dock 4px overflow at 375 viewport | **YES** (visual probe, not source-grep) | π audit §7 P1; `demo/layout/StoryPager.vue:39` consumes `GlassDock orientation="horizontal" always-expanded fit-content class="story-pager-dock"`; render at 375×667 is x=79 + width=300 → 379 px (4px overflow). No CSS guard on narrow viewport |
| R11 | GlassCarousel audacious pager chevrons unreachable on mobile | **YES** | π audit §7 P2; `demo/stories/containers/glass-carousel.vue:120` `<GlassCarouselPager>`; pager x=1050 at 375-viewport (cropped invisible). No `flex-wrap` / `@container` guard at HEAD |
| R12 | Stress harness retire decision (ε P2) | **YES** (absent) | `package.json` script `profile:stress` MISSING; `scripts/stress/` directory absent (per ε §8). I.W6 retired the harness; J inadvertently kept it absent |
| R13 | `ay-close` reappearance (ε P2) | **YES** | `package.json:269` `"ay-close": "scripts/ay-close.sh"`; `scripts/ay-close.sh` exists (76 lines, executable). Per ε F-3, I.W6 retired and v0.8.0 consolidation reverted it |
| R14 | Audacious primary-CTA variant (formally K-deferred) | **YES** | `dock.css:687-744` houses the disco-grain + sparkle-sweep + specular-highlight composite under `.dock-tab-button[data-tier="primary"]`. Per J.md cross-tranche debt §1 explicitly K-deferred. Reusable as `<Button variant="primary-audacious">` once extracted |
| R15 | drag-keep-open story-fidelity gap (no Slider-in-GlassDock demo) | **YES** | `rg -ln "<Slider" demo/stories/`: 4 stories; `rg "GlassDock" demo/stories/primitives/slider.vue` returns 0. β V10 / F4 caveat: implementation present + CSS-rule-verified at runtime, but no story binds a Slider inside a GlassDock to demonstrate the substrate response |
| R16 | Card pane variant glass-subtle bypass (W2 picked Option B per W6.A) | **CLEARED** | `rg "glass-subtle" src/ demo/` returns 0 hits. The retire is complete; no further action needed |
| R17 | Paper rung literal hsl in paper.css | **CLEARED** | `rg "hsl\(48" src/styles/paper.css` returns 0. Already absorbed pre-J per W0-reconciliation §F-9 |
| R18 | `<Tooltip>` rounded-lg vs rounded-tooltip (W1 shipped `--radius-tooltip` — verify Tooltip consumes) | **CLEARED** | `TooltipContent.vue:27` uses `rounded-tooltip`; `--radius-tooltip` defined at `tokens.css:137`. Both ends wired |
| R19 | WAAPI `cssVar()` extensibility | folds into R8 | (duplicate of R8) |
| R20 | Drag-keep-open API extensibility (NumberField keep-dock-open consumer) | **YES (no NumberField consumer)** | `rg "keepDockOpen\|keep-dock-open" src/components/ui/number-field/` returns 0. NumberField does not consume the API; current consumers are Slider + dock substrate (HoverPopover keepDockOpen). Folds with R15 (visual demo) |
| R21 | `prefers-reduced-motion` runtime gate for WAAPI consumers | **CLEARED** | `BouncyToggle.vue:130` consumes `cssVar("--ease-apple-spring")`; PRM gate verified per W2-B-interactive-proof.md `:65`. Gate present |

**Verified-still-present count**: 13 of 21 residuals (R1–R15 minus the 2 cleared = R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R20). **Cleared at HEAD**: 5 (R16 Card pane, R17 paper rung, R18 Tooltip rounded, R19 = R8, R21 PRM gate). **K wave-spec scope**: 16 active residuals (15 distinct + R20 visual fold).

---

## §B — Per-residual K wave-spec candidate rows

| Residual | Severity | Origin | Substrate at HEAD | Proposed K wave / lane | Files / LOC | Hard gate | Prerequisites | Brittleness risk |
|---|---|---|---|---|---|---|---|---|
| **R1 — CLAUDE.md major refresh** | P1 | γ doc-drift §2 | 204-line pre-v0.8.0 file; missing axes section, missing 4 ui packages, missing configurator subpath, lists DockPopover + retired `glass-{subtle..elevated}` ladder | **W-A.1** doc-only | `CLAUDE.md` (modify; ~250 LOC rewrite) | `diff CLAUDE.md` matches claudeMd canonical text; rg confirms zero stale refs (DockPopover, glass-subtle ladder); list of 11 drift items each ticked | none | none (doc-only) |
| **R2 — README.md drift** | P1 | γ doc-drift §3 | 180-line pre-v0.8.0; "32 components" → 39 ui; retired token override example; 3 custom packages → 29 | **W-A.2** doc-only | `README.md` (modify; ~200 LOC rewrite) | rg confirms zero retired-token references; component-count line matches `ls src/components/ui/ \| wc -l` minus `index.ts`; dependency table matches CLAUDE.md ## Dependencies | none | none |
| **R3 — Bundle-budget gate re-land** | P0 | ε P1-A | `package.json` lacks `profile:budget`; `scripts/profile-bundle.mjs` is F.W1 version (no BUDGETS); workflow absent | **W-D.1** tooling | `scripts/profile-bundle.mjs` (modify; +80 LOC for BUDGETS + budgetReport); `package.json` (modify; +1 script line); `.github/workflows/lint.yml` (modify; +20 LOC budget job); `docs/tranches/K/audit/W-D-budget-baseline.md` (create) | `npm run profile:budget` exits 0 with `glass-ui.js` raw < 200 000 + gzip < 38 000; CI workflow runs the command; baseline doc cites measured numbers vs budgets | none | low — re-lands a previously-shipped gate; risk is the v0.8.0 revert recurring (mitigation: same commit lands BUDGETS + workflow together) |
| **R4 — 5 demo `focus-visible:shadow` bypasses** | P1 | δ §3, γ residue | 5 sites bypass `.focus-ring` utility; `--focus-ring-shadow` token canonical at HEAD | **W-B.1** vocab residue | `demo/stories/primitives/combobox.vue`, `demo/stories/foundations/intro.vue`, `demo/layout/CategoryRail.vue`, `demo/stories/navigation/dock-layers.vue`, `demo/configurator/PresetEditor.vue`, `demo/configurator/PresetEditorField.vue` (modify ×6; ~5 LOC each) | `rg "focus-visible:shadow-\[var\(--focus-ring-shadow\)\]" demo/` returns ≤ 1 (foundations/shadows.vue is the canonical-demo exception) | W1 substrate already shipped (`.focus-ring` utility) | low — pure utility-class swap |
| **R5 — 3 demo `--surface-tint` bypasses** | P2 | δ §2, γ residue | 1 src/ + 2 demo `color-mix(--foreground) N%` raw recipes; `--surface-tint-{4..25}` 9-rung family available | **W-B.2** vocab residue | `demo/stories/aurora/NucleiOverlay.vue:68`, `demo/stories/foundations/paper-glass.vue:184` (×2 inline), `src/components/custom/sidebar/ProgressiveSidebar.vue:209` (the library survivor — 40% rung between soft/medium); per K-decision either round to `--surface-tint-22` / `-8` or admit the rung gap (modify ×3; ≤ 5 LOC each) | rg confirms raw `color-mix(--foreground) N%` count drops to N where N matches the agreed canonical-demo budget (likely 0 in scope) | W1 substrate shipped | low |
| **R6 — `motion/stagger.vue:59` `transition-all`** | P2 | δ §3 #14, γ residue | Single demo site + 1 library survivor in `CarouselDots.vue:62` (W6 bypass — separate but cohort) | **W-B.3** vocab residue | `demo/stories/motion/stagger.vue:59` (modify; 1 LOC); `src/components/ui/carousel/CarouselDots.vue:62` (modify; 1 LOC — fold the library survivor in if scope agrees) | `rg "transition-all" demo/ src/components/` returns 0 | none | low |
| **R7 — `{success,warning,info}-foreground` 0 consumers** | P1 | β F7, δ §2, ε orphan | Token defined (light + dark mirrors) + `@theme` bridges; 0 consumers | **W-C.1** substrate retire-OR-wire | **OPTION A**: retire — `tokens.css:254-256, 658-660`, `theme.css:89-91` (delete; -12 LOC). **OPTION B**: wire — `Notification.vue` (modify; add `tone={success,warning,info}` variant + `text-success-foreground` etc.; ~30 LOC) plus story consumer | rg returns 0 hits AFTER retire OR ≥ 2 consumers AFTER wire | none — but K plan must pick one before scope-reveal | medium — wire-path adds public surface (Notification tone variant) and needs design review per design-axes |
| **R8 — `cssVar()` ≥ 2 consumer bar** | P1 | β V20, δ §2, J cross-tranche debt | `cssVar.ts` shipped W1; 1 consumer (BouncyToggle ×3 calls) | **W-C.2** consumer wire | **Path A**: extract `<Slider>` thumb halo timing to `cssVar("--ease-apple-spring")` consumer (modify `Slider.vue` ~5 LOC). **Path B**: doc-as-WAAPI-only; relax bar via library-orphan exception in `feedback_overfitting_audit` | `rg "\bcssVar\(" src/components/ \| awk -F: '{print $1}' \| sort -u \| wc -l` returns ≥ 2 | none | low |
| **R9 — `.overlay-scrim` @utility shadow** | P0 | β F9, ε cohort | `utilities.css:432` `@utility overlay-scrim { ... }` block; 0 consumers; canonical path is the Tailwind `bg-overlay-scrim` color utility | **W-C.3** substrate retire | `src/styles/utilities.css` (modify-carve; delete `@utility overlay-scrim` block; -8 LOC) | `rg "@utility overlay-scrim" src/styles/" returns 0; `rg "bg-overlay-scrim" src/components/" still returns 5 (the canonical consumers unchanged) | none | low — pure dead-code retire |
| **R10 — Story-pager dock 4px overflow at 375 viewport** | P1 | π §7 P1 | `demo/layout/StoryPager.vue:39` GlassDock at narrow viewport overflows by 4px; right-edge story names truncate ("Dock L...") | **W-E.1** mobile-viewport refinement | `demo/layout/StoryPager.vue` (modify ~10 LOC; add `@container` query OR `clamp(--dock-max-inline-size, ...)` rule); possibly `src/styles/dock.css` (modify; lower `--dock-max-inline-size` default for narrow) | Playwright probe at 375×667 confirms `getBoundingClientRect().right ≤ 375 - 4` margin OR `overflow: hidden` clean | none | low — purely CSS guard |
| **R11 — GlassCarousel pager mobile chevrons** | P2 | π §7 P2 | `<GlassCarouselPager>` audacious pager renders at x=1050 at 375-viewport (off-screen) | **W-E.2** mobile-viewport refinement | `src/components/custom/glass-carousel/GlassCarousel.vue` OR `src/components/ui/carousel/GlassCarouselPager.vue` (modify; ~15 LOC for `flex-wrap` / `@container` query stacking chevron+counter+collapse below title at narrow widths) | Playwright probe at 375×667: pager controls visible (`getBoundingClientRect().right ≤ 375`) | none | low — CSS-only |
| **R12 — Stress harness retire decision** | P2 | ε §8, F-2 | `scripts/stress/` absent; `profile:stress` script absent. I.W6 retired one-shot capture | **W-D.2** tooling decision (formal-retire-or-restore) | If retire: `docs/tranches/K/W-D-stress-decision.md` (create; cite I.W5 R2 capture as the canonical baseline; rationale = one-shot, not per-tranche). If restore: `scripts/stress/blob-stress-capture.mjs` (create; ~150 LOC); `package.json` `+1 script line` | Decision document lands AND either matches the retired state OR wires the script + new baseline artefact | folds with R3 (W-D.1) — same commit cohort | low — decision doc is fast; restore is medium |
| **R13 — `ay-close` reappearance** | P2 | ε F-3, γ cross-ref | `scripts/ay-close.sh` (76 LOC) + `package.json:269` script entry. I.W6 retired both; v0.8.0 consolidation reverted | **W-D.3** tooling cleanup retire | `scripts/ay-close.sh` (delete); `package.json` (modify-carve; remove `:269` line) | `ls scripts/ay-close.sh` returns no-such-file; `rg "ay-close" package.json` returns 0 | folds with R3+R12 (W-D cohort) | low — script is unused |
| **R14 — Audacious primary-CTA variant** | P1 | J.md cross-tranche debt §1, R5 row 8 (gap row 8) | `dock.css:687-744` houses the disco-grain + sparkle-sweep + specular-highlight composite under `.dock-tab-button[data-tier="primary"]`; usable as `<Button variant="primary-audacious">` | **W-F** architectural transposition (own wave) | `src/components/ui/button/index.ts` (modify; +CVA variant `primary-audacious` + size compatibility; ~40 LOC); `src/styles/utilities.css` OR new `button-audacious.css` (create or modify; ~80 LOC for the disco/sparkle/specular composite); `demo/stories/primitives/button.vue` (modify; +variant story; ~20 LOC); audit-time consumer survey | (a) CVA variant lands + dts emits; (b) story renders the variant on cream + cartoon-card surfaces with at-rest + hover + focus-visible probes; (c) `rg "<Button variant=\"primary-audacious\"" demo/` ≥ 2 consumer-stories OR formally retire to next-tranche | W-A doc absorption (axes section names primary-audacious as instrument/design-language axis); design-axes ownership decision | medium — the composite uses dock substrate (`--phase-color`); extracting it requires axis-agnostic substrate (un-couple phase-color tinting from dock context) |
| **R15 + R20 — drag-keep-open story-fidelity gap + NumberField consumer** | P1 | β V10/F4, J cross-tranche debt §6 | Slider keepDockOpen + GlassDock data-held implementation present; no demo binds them; NumberField doesn't consume API | **W-G** contract-WIRE | `demo/stories/navigation/dock-keep-open.vue` (create; ~120 LOC; media-transport-style dock embedding `<Slider>` and `<NumberField keep-dock-open>` to visually demonstrate the substrate response); `src/components/ui/number-field/NumberField.vue` (modify; thread `keepDockOpen` prop + dockKeepOpenSink injection per Slider precedent; ~20 LOC) | (a) Playwright drag-probe captures Slider thumb halo at idle + held + GlassDock background lift at the same `data-held` cycle (≥ 5 frames over the named duration); (b) `rg "keepDockOpen\|keep-dock-open" src/components/ui/" returns ≥ 2 distinct consumer files (Slider + NumberField); (c) story-page mounts in 0-error sweep at 3 viewports | none | low |

---

## §C — Wave-spec theme clusters

After clustering by file-bounds + thematic affinity:

### W-A — Doc refresh (single agent, doc-only)

- **Scope**: R1 (CLAUDE.md), R2 (README.md). Same author surface; no source touches.
- **Agents**: 1
- **LOC envelope**: ~450 (CLAUDE.md ~250 + README.md ~200)
- **Hard gate**: rg confirms zero stale refs (DockPopover, retired glass-ladder, `--glass-opacity-subtle`); component / package counts match `ls src/components/{ui,custom}/`; dependency tables match.
- **Brittleness risk**: none — doc only.
- **Wave-spec doc**: not required (single-agent, ≤ 4 lanes per `tranche/SPEC.md`); fits in `K.md` plan inline.

### W-B — Vocab.γ residue sweep (single agent or 2 sub-lanes)

- **Scope**: R4 (5 focus-visible bypasses), R5 (surface-tint bypasses), R6 (transition-all survivor).
- **Agents**: 1 (sequenced) OR 2 (focus-ring lane + surface-tint+transition lane)
- **LOC envelope**: ~50 across ~10 files
- **Hard gate**: rg invariants — `focus-visible:shadow-[var(--focus-ring-shadow)]` ≤ 1 (foundations canonical demo); `color-mix(--foreground) N%` raw count ≤ documented; `transition-all` 0 in demo + 0 in src/components/.
- **Brittleness risk**: low — utility-class swaps + token rounding decisions.
- **Wave-spec doc**: not required.

### W-C — Substrate retire-or-wire (single agent, sequenced)

- **Scope**: R7 (success/warning/info-foreground retire-or-wire), R8 (cssVar() ≥ 2 consumer bar), R9 (`.overlay-scrim` @utility duplicate retire).
- **Agents**: 1 (sequenced — wire decision MUST land before retire)
- **LOC envelope**: ~50 (retire) or ~150 (wire path on Notification + Slider second consumer)
- **Hard gate**: per residual — rg counts post-action match the chosen path.
- **Brittleness risk**: medium — Notification tone variant adds public surface; needs design-axes review.
- **Wave-spec doc**: required per `tranche/SPEC.md` ("broad scope, four or more agents, or file bounds that would clutter the parent plan") only if Notification wire path chosen — that touches multiple files + axes.

### W-D — Tooling cohort (single agent, sequenced)

- **Scope**: R3 (bundle-budget gate re-land), R12 (stress harness retire-or-restore decision), R13 (`ay-close` retire).
- **Agents**: 1
- **LOC envelope**: ~100 (R3 ~80 + R13 ~80 retire + R12 doc ~30)
- **Hard gate**: `npm run profile:budget` exits 0 with measured headroom; `ls scripts/ay-close.sh` no-such-file; stress decision doc lands.
- **Brittleness risk**: low — re-lands previously-shipped gates; risk is recurrence of the v0.8.0 revert (mitigation: K invariant — "tooling regressions caught by ε lane at every close").
- **Wave-spec doc**: not required.

### W-E — Mobile-viewport refinements (single agent, parallel-safe lanes)

- **Scope**: R10 (story-pager dock 4px overflow), R11 (GlassCarousel pager mobile chevrons).
- **Agents**: 1 (or 2 if other waves are running parallel)
- **LOC envelope**: ~25
- **Hard gate**: Playwright at 375×667 — `getBoundingClientRect().right ≤ 375` for both surfaces; π re-probe across 3 viewports.
- **Brittleness risk**: low — CSS-only.
- **Wave-spec doc**: not required.

### W-F — Audacious primary-CTA extraction (own wave with story)

- **Scope**: R14.
- **Agents**: 1 dedicated
- **LOC envelope**: ~140 (~40 CVA + ~80 CSS + ~20 story)
- **Hard gate**: CVA variant + dts emit + story renders + 2-consumer rule satisfied OR formal next-tranche defer.
- **Brittleness risk**: medium — composite couples to dock `--phase-color` cascade; extraction needs axis-agnostic substrate.
- **Wave-spec doc**: REQUIRED — broad scope (architecture + axis ownership + visual review).

### W-G — drag-keep-open story + NumberField consumer (contract-WIRE)

- **Scope**: R15 + R20 (visual demo + API extensibility).
- **Agents**: 1
- **LOC envelope**: ~140 (~120 demo + ~20 NumberField wire)
- **Hard gate**: 2-consumer rule via Slider + NumberField; Playwright drag-probe captures cross-substrate halo + dock-bg-lift coupling.
- **Brittleness risk**: low.
- **Wave-spec doc**: not required (well-scoped single agent).

---

## §D — Wave dependency DAG

```
            (open K)
               │
      ┌────────┴────────┬─────────┬─────────┐
      │                 │         │         │
     W-A             W-B         W-D       W-E
   (doc refresh)  (vocab.γ)   (tooling)  (mobile)
      │                 │         │         │
      └────┬────────────┘         │         │
           │                      │         │
          W-C                     │         │
   (substrate retire/wire)        │         │
           │                      │         │
           ├──────────────────────┘         │
           │                                │
          W-F                               │
   (audacious primary-CTA)                  │
           │                                │
           └────────────┬───────────────────┘
                        │
                       W-G
              (drag-keep-open + NumberField)
                        │
                  (close K — π/β/γ/δ/ε/α audit)
```

**Edge rationale**:

- **W-A blocks W-F**: design-axes section in CLAUDE.md must declare where `Button variant="primary-audacious"` lives (instrument-cluster axis vs design-language axis vs glass-tier) before extraction.
- **W-B blocks W-C**: vocab residue sweep should land before substrate-retire-or-wire decisions, so the retire candidate set is final (an unswept transition-all could turn into a "wire" candidate via cssVar).
- **W-D parallel-safe**: tooling lane has no source overlap with W-A/B/C/E.
- **W-E parallel-safe**: mobile-viewport lane touches `demo/layout/` + `src/styles/dock.css` — disjoint from W-A/B/C bounds; can fire after W1 OR alongside W-A.
- **W-F blocks W-G**: if the audacious-primary-CTA wave runs first, the new variant might be a dock-internal consumer of `keepDockOpen` (a third consumer for R20).
- **W-G blocks close**: the Slider-in-GlassDock visual proof gates β audit's V10 caveat resolution.

**Critical path**: W-A → W-B → W-C → W-F → W-G → close. Estimated 5 sequential gates; W-D + W-E run in parallel slots.

---

## §E — Architectural transposition opportunities

For residuals where the gestalt move is "collapse and retire" rather than "wire and forget":

### E1 — `.overlay-scrim` @utility (R9)

**Move**: pure retire. The Tailwind v4 `@theme` color-bridge → `bg-overlay-scrim*` utility shadows the named `@utility`. Per `feedback_no_backwards_compat`, the duplicate path is dead code. **W-C.3** retires it.

### E2 — `--{success,warning,info}-foreground` (R7)

**Move**: choice between (A) retire and (B) gestalt-wire to a new `<Notification tone>` variant axis. Path B unlocks tone-aware notifications + alerts (the `<Alert>` component currently leans on its own variant table; this could converge alert+notification tone vocabulary). The K plan must pick one — sub-bar substrate cannot survive a third tranche close.

### E3 — Audacious primary-CTA (R14) — the largest transposition

**Move**: extract dock's `[data-tier="primary"]` composite to a Button variant. The composite is reusable substrate; extraction frees consumers (any audacious primary-CTA story without a dock context). Two architectural sub-decisions:

1. **Axis ownership**: instrument-cluster (consumes `--phase-color`) vs design-language (composes with cartoon-card + Fraunces) vs glass-tier (refines on `glass-floating`). Resolution names the new axis OR opens K's only new axis.
2. **Phase-color decoupling**: `dock.css:706-714` reads `--phase-color` from `<InstrumentChassis>` cascade. Pulling the recipe out of dock means the variant either declares its own phase-color provider OR drops the phase-tinted hover and ships the disco+sparkle+specular composite alone. **Recommendation**: drop phase tinting in the canonical Button variant; phase-tinting stays a dock-internal flourish.

### E4 — `cssVar()` consumer convergence (R8)

**Move**: gestalt — find a second consumer organically rather than pad. Slider thumb halo timing currently uses CSS-side `--ease-apple-spring`; lifting it to WAAPI via `cssVar()` would be a real second consumer (the JS-side spring controller would consume the token at runtime, satisfying the ≥ 2 bar with a non-bypassed canonical path). **Caveat**: only do this if the JS-side path is genuinely cleaner — otherwise document `cssVar()` as a single-substrate WAAPI helper.

### E5 — drag-keep-open visual contract (R15 + R20)

**Move**: the gap is *demo*, not library. The architectural transposition is to add `keepDockOpen` to `<NumberField>` (per Slider precedent — a 5-LOC threading) AND to ship a story that visually proves the cross-substrate coupling. The substrate is right; the visual proof was missed. K closes the loop.

---

## §F — Estimated K wave count + agent budget

### Wave count: **7 waves** (W-A through W-G)

- W-A — doc refresh — 1 agent
- W-B — vocab.γ residue sweep — 1 agent (or 2 sub-lanes)
- W-C — substrate retire-or-wire — 1 agent (sequenced; possibly 2 if Notification wire path chosen)
- W-D — tooling cohort — 1 agent
- W-E — mobile-viewport refinements — 1 agent
- W-F — audacious primary-CTA — 1 agent + wave-spec doc
- W-G — drag-keep-open story + NumberField — 1 agent

### Agent-budget envelope: **7 sequential dispatches** + close ceremony (6 audit lanes + orchestrator close)

Total agent dispatches across K: 7 (waves) + 6 (close audits) = **13 agents** end-to-end. Within the per-wave parallel ceiling (max 10), every K wave is below limit; W-C may dispatch 2 if the Notification wire-path is taken (still within 10).

### LOC envelope across K: **≈900 LOC** modified, **≈350 LOC** created, **≈150 LOC** deleted (net +1100 / -150 = +950 across waves)

- W-A: ~450 modified
- W-B: ~50 modified
- W-C: ~150 modified (wire path) OR ~50 deleted (retire path)
- W-D: ~100 modified + ~80 deleted (R13 retire)
- W-E: ~25 modified
- W-F: ~140 created
- W-G: ~140 created + ~5 modified

### Hard-gate cohort

- typecheck + build + test green at every wave close (12 waves total over J + K = 12 clean closes is the regression-budget headroom).
- π lane multi-viewport (3+) at W-E + W-G + close ceremony.
- ε lane bundle-budget gate active from W-D close onwards (every subsequent wave passes the gate).
- δ lane per-story consumption sweep at every close + at W-A (since CLAUDE.md ships the canonical reference).

### Brittleness window

**None planned**. K opens against a green tree (J FINAL clean); every wave closes green.

If W-F's audacious-primary-CTA extraction reveals deeper phase-color-cascade coupling than estimated, the wave declares a `breaking_changes_during_wave: yes` window with restoration in W-G or in a follow-up tranche close per `tranche/SPEC.md` Brittleness Window protocol.

### Out-of-scope (formally deferred)

- New glass-tier ladder rungs — K refines on existing tokens, doesn't extend.
- New custom packages — K composes existing primitives.
- Cross-repo (speedtest) consumer migrations — consumer-territory per `feedback_presets_in_consumer`.
- Plugin extraction — permanent retirement per I.

---

## §G — Notes on waves NOT proposed

- **No W-H "comprehensive vocabulary audit"**: J's vocab.α/β/γ converged; the residues here are sweep-class, not architectural.
- **No "Card pane variant" wave**: R16 cleared — `glass-subtle` 0 hits at HEAD.
- **No "paper rung" wave**: R17 cleared.
- **No "Tooltip rounded-lg" wave**: R18 cleared.
- **No "PRM gate" wave**: R21 cleared.

These four cleared residuals are evidence J FINAL's cross-tranche debt list was over-generous; γ re-verification trims K scope by ~20%.

---

## §H — Cross-references

- J FINAL.md `## Cross-tranche debt + named residuals` — the input list.
- J/J.md `## Cross-tranche debt + explicit deferrals` — supplementary residual cohort.
- J/audit/J-audit-{α,β,γ,δ,ε,π}-*.md — per-lane evidence anchoring each residual.
- `docs/precepts/instructions/tranche/{SPEC,WAVE_SPEC}.md` — wave-spec format + close criteria.
- claudeMd context (canonical post-J + Q-tranche reference) — drives R1 + the design-axes citation in W-F.
