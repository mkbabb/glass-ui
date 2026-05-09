# K Pre-Close Orchestrator Pass

**Date**: 2026-05-09
**Tree state**: clean; 6 commits ahead of origin/master (post-master push above this commit).
**Branch**: master
**Tag**: v0.9.3 pushed to origin.

## Wave-by-wave commit ledger

| Wave | Commit | Subject |
|---|---|---|
| W0  | `f5cdd53` | feat(tranche-k/w0): reconciliation + hardened dispatch precept |
| WV  | `14266b5` | docs(tranche-k/wv): V-tranche post-hoc plan-folder write-up against 0666be6..23ce73c |
| W1  | `563b200` | feat(tranche-k/w1): rename HoverPopover.openDelay → hoverOpenDelay (silent-miss closeout) |
| W4 Lane B | `8a04a2b` | feat(tranche-k/w4-b): bundle-budget gate restoration + tooling cohort |
| W6 (HEADLINE) | `154d1d2` | feat(tranche-k/w6): Button variant=primary-audacious gestalt extraction + dock consumer migration |
| W3 Lane A | `76fff65` | feat(tranche-k/w3-a): src vocab.γ second-pass + W2 residuals (cssVar retire, overlay-scrim delete) |
| W3 Lane B | `11a30d3` | feat(tranche-k/w3-b): demo vocab.γ second-pass — focus-ring + surface-tint + transition-all decomposition |
| W5  | `12abb09` | fix(tranche-k/w5): mobile-viewport fitness — story-pager + glass-carousel pager wrap |
| W7  | `2197596` | feat(tranche-k/w7): Configurator P0 absorb + dock-with-slider story + Slider-only keep-dock-open |
| WP  | `8ec320b` | fix(tranche-k/wp): Lighthouse perf + a11y cohort — viz contrast + label-name + skeleton compositor + font async |
| WS  | `a598b90` | feat(tranche-k/ws): vueuse subpath split (v0.9.3) — additive Phase 1; SCC trap stays open |
| W4 Lane A | `36305da` | docs(tranche-k/w4-a): doc cohort walk — CLAUDE/README/DESIGN aligned with HEAD |
| W2  | RETIRED at 2026-05-08 reconciliation | 4/5 absorbed by V-tranche; residuals folded into W3.A |

11 active waves committed; W2 retired with V-attribution. WV adds V-tranche post-hoc plan folder. K invariant 5 (HEADLINE) closed by W6.

## Cross-repo deliverable

Speedtest commit `6f412d89` annotates `docs/tranches/W/artefacts/W3/b1/disposition.md` with K.WS Phase 1 outcome. Uncommitted/unpushed at orchestrator's hand; user can push speedtest-side independently.

## Precept submodule

Precept submodule `docs/precepts` advanced from `6b8437a` (J W7 close) to `fdc020c`:
- ORCHESTRATION.md — `## Worktree Isolation` section.
- AGENT_DISPATCH_TEMPLATE.md — `## Hardened agent git clause (binding non-negotiable)` section.
- LESSONS-LEARNED.md — 4 × 2026-05-06 entries (3 J-derived + 1 V-derived no-shadow-execution).

Submodule remains 3 ahead / 15 behind on origin/main (separate divergence; out of K scope).

## Build / Test / Budget gates

| Gate | Status | Evidence |
|---|---|---|
| typecheck | ✅ green | `vue-tsc --noEmit` exit 0 |
| build | ✅ green | `NODE_OPTIONS=--max-old-space-size=8192 npm run build` — `✓ built in 27.81s` |
| test | ✅ green | 27 files / 340 tests pass |
| profile:budget | ✅ PASS | `dist/glass-ui.js` raw 138_454 / 190_000 (72.9%); gz 25_399 / 33_700 (75.4%). `dist/glass-ui.css` raw 22_589 / 29_000 (77.9%); gz 4_446 / 5_750 (77.3%). All under 30%-headroom envelope. |
| dist subpath emission | ✅ verified | `dist/forms.{js,d.ts}`, `dist/composables/{dark,keyboard}.{js,d.ts}` all emit. |

## Vocabulary residue rg counts (post-W3 A+B)

```
rg "color-mix.*--foreground" src/   # 9 hits — all documented residuals/exceptions per W3-A proof
rg "color-mix.*--foreground" demo/  # 0 hits
rg "transition-all" src/components/ src/styles/  # 0 hits
rg "transition-all" demo/stories/composables/ demo/stories/motion/  # 0 hits in W3.B targets
rg "@utility overlay-scrim" src/styles/utilities.css  # 0 hits
rg "cssVar\(" src/  # 0 hits (retired)
rg "openDelay" src/components/custom/hover-popover/  # 0 hits (renamed)
rg "DockPopover|danger-subtle|cssVar\(" CLAUDE.md README.md DESIGN.md  # 0 hits
```

## Substrate-without-consumer ledger (K invariant 8)

- `--{success,warning,info}-foreground` triple — wired by V `221d783` + `5dfe6fb` (≥ 2 consumers).
- `cssVar()` — RETIRED (W3.A, supersession by `useTokenColor` + inline `readToken()` in BouncyToggle).
- `.overlay-scrim` @utility — DELETED (W3.A; `bg-overlay-scrim*` Tailwind bridges from theme.css are the canonical surface).
- paper.css literal hsl rungs — ABSORBED by V (verified at HEAD).
- `<Tooltip>` `rounded-tooltip` consume — ABSORBED by V at `TooltipContent.vue:27`.
- `Button variant="primary-audacious"` — shipped in W6 with ≥ 3 consumers (dock primary tier + buttons.vue gallery cell + hero.vue feature CTA).

## Known residuals (carry-forward to L)

- 4 `--surface-tint-{35,40,40,70}` rung gaps surfaced by W3.A (Slider, GlassTimeline, UnderlineTabs).
- WS Phase 2 (root-barrel removal of vueuse-bearing symbols) → L tranche / v1.0.
- `scripts/ay-close.sh` file-on-disk (W4 Lane B retired the npm script entry; file remains; flagged for K W8 cleanup pass).
- 3 unused public composables (Rε B5: useRAFLoop, useIntersectionPause, useDarkModeSync) — L cross-repo audit.
- `<DiscoGlyph>` / `<DockGroup>` / `<InstrumentChassis>` 1-consumer at HEAD — L cross-repo audit.
- Production demo build configuration → L (Lighthouse-deferred).
- `robots.txt` → L (publicly-deployed-demo prerequisite).
- Vue runtime upstream `uses-passive-event-listeners` → L (not glass-ui scope).
- `<DockShowcaseFrame>` second-consumer audit → L.

## Brittleness window

- W6 declared `breaking_changes_during_wave: yes` with `suspended_gates: dock-primary-tier-visual-fidelity` and `restoration_wave: W8 close ceremony π lane visual probe`. The π lane verifies retraction.

## Process incidents

- **W3 Lane A git stash incident** (1 violation): agent ran `git stash --keep-index` once for state-probe; recovered fully via Edit tool re-application; stash@{0} dropped by orchestrator. ι integrity-sweep absorbs; precept may need a follow-on lessons-learned entry tightening the no-mutating-git clause for state-probe contexts.
- **W3 Lane B mid-run revert** (harness-level): files reverted then re-applied; final on-disk state confirmed.
- **W6 worktree isolation** (orchestration anomaly): `Agent isolation: "worktree"` parameter passed; agents wrote to absolute paths (main tree). Worktree was nominally created but circumvented by absolute-path edits. Lesson: if worktree isolation is required, agent prompts must use relative paths, not absolute paths.

## Authority

K closes with all 11 active waves committed; HEADLINE shipped; v0.9.3 tagged + pushed; precept submodule advanced; cross-repo annotation in place; build/test/budget gates green.

7-agent strengthened audit (α/β/γ/δ/ε/π/ι) is the next gate. FINAL.md authors after audit findings absorbed.
