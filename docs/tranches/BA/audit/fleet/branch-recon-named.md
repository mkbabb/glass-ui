# BA branch-recon — the named letter-era + release-era fleet (14)

Read-only reconciliation against `master @ 3c70fb5f` (BA-authoring tree, above the v3.13.0 cut). The d6 fork (`feat/d6-library-3.10`) is OUT of scope — already reconciled via the atlas-letter waves.

THE FINDING — **every ahead>0 branch is SUPERSEDED or STALE; ZERO AT-RISK.** The AX/AW-era hand-integration re-landed every cap-preserved capability under master SHAs, and the AY/AZ redesigns either absorbed or obsoleted the rest. The 4 ahead-0 branches (af-w1, v.w234, w.w2.1, the two remotes) are fully-merged ancestors / corpses.

## Verdict table

| branch | ahead | unique capabilities | master state (cites) | verdict | disposition |
|---|---|---|---|---|---|
| **ak-w3-sub-barrel-publishing** | 1 | 17 per-package sub-barrels (`src/badge.ts`…`src/tooltip.ts`) + their `package.json`/`vite.library.ts` wiring; 6 absorbed speedtest tokens (`--meter-progress-{gap,inset}`, `--progress-stack-gap`, `--celebration-row-rhythm`, `--text-celebration-headline-size`, `--complete-headline-size`) | All 17 barrels relocated to `src/subpaths/{badge,button,…,tooltip}.ts` (AV.W5.A) + exported in `package.json` (`./badge`…`./tooltip` present; 221 export lines). 5/6 tokens live (`scale-paper.css:247 --meter-progress-inset`, `--progress-stack-gap`, `--celebration-row-rhythm`, `--text-celebration-headline-size`, `--complete-headline-size`). `--meter-progress-gap` ABSENT — speedtest-consumer-local (presets-in-consumers), not a lib surface | **SUPERSEDED** | archive-tag + delete |
| **ak-w6-alpha-aurora-ceiling** | 1 | Aurora `opacityCeiling?: number` prop — per-route saturation clamp [0,1] | `Aurora.vue:83 opacityCeiling?: number`, default `1` (`:86`), clamped `Math.max(0, Math.min(1, …))` (`:104`); now the canonical recession vocabulary fourier/constellation cite (`FourierField.vue:59`, `constellationField.ts:323`) | **SUPERSEDED** | archive-tag + delete |
| **al-w3-lane-e-cosmetic-refinements** | 1 | `tokens.css` spring-`smooth` overshoot-prose note; `.tap-squish` comment reword | `--spring-smooth`/`-snappy` `linear()` values BYTE-IDENTICAL on both sides — diff is PURE comment-prose (first-person reword + a sub-perceptual-0.5%-peak note); `.tap-squish` body unchanged. No code delta to land | **SUPERSEDED** (no-op) | archive-tag + delete |
| **al-w4-sub-barrel-phase2** | 1 | 6 phase-2 sub-barrels (Popover/Select/DataTable/DropdownMenu/ContextMenu/Command) + exports + `public-surface.spec.ts` | All 6 relocated to `src/subpaths/{popover,select,data-table,dropdown-menu,context-menu,command}.ts` + exported (`./popover`/`./select`/`./command`/`./data-table` present) | **SUPERSEDED** | archive-tag + delete |
| **al-w9-delta-rename** | 1 | `useSpringOrchestrator`→`useNumericTransition` rename + one-minor re-export shim | `useNumericTransition.ts:70` is the shipped fn; barrel `motion/index.ts:21 export * from "./useNumericTransition"`; the AW.W15 `Use<Name>Return` shape adopted. The shim correctly retired (no-backwards-compat) | **SUPERSEDED** | archive-tag + delete |
| **al-w10-slim-canon** | 1 | `.tap-squish` universal press utility; `--scale-press` canon 0.96; iOS under-shadow recipe; `--progress-stack-gap` tier-b | `.tap-squish` live (`utilities/base.css`, `glass/surfaces.css:68/132` cite it as THE one scale register); `--scale-press: 0.96` (`scale-paper.css:26`, dock/btn aliases off it `:39/:41`); under-shadow wired (`glass/ladder.css:44`) | **SUPERSEDED** | archive-tag + delete |
| **al-w11-glass-ui-design-md** | 1 | DESIGN.md §L1-L5 iOS Liquid Glass precept canon (6-layer composite, spring physics, tap choreography, motion tiers) | `DESIGN.md:19` "Liquid Glass design language", `:25 §L1`, `:87 §L3` — full §L1-L5 present verbatim incl. the squash/exaggeration motion-tier table | **SUPERSEDED** | archive-tag + delete |
| **t.w2** | 4 | `MetricPill` primitive; MetricBadge `labelPosition="stacked"`; GlassDock `containerName` prop | `metric-pill/{MetricPill.vue,index.ts}` ship (CLAUDE.md:49); `MetricBadge.vue:7 MetricBadgeLabelPosition='inline'\|'stacked'` (`:28` prop); `GlassDock.vue:337 :data-container-name` + the always-expanded-only contract (`:51`, CLAUDE.md §F1) | **SUPERSEDED** | archive-tag + delete |
| **t.w6** | 4 | `useTokenColor`, `useStagger`, `useAnimatedNumberMap` composable promotions | `dom/useTokenColor.ts`, `motion/useStagger.ts`, `motion/useAnimatedNumberMap.ts` all ship + barrelled (CLAUDE.md motion/dom subtrees) | **SUPERSEDED** | archive-tag + delete |
| **u.w1** | 13 | v0.8.6 patch bundle: `--opacity-disabled` theme bridge (12-cmpt sweep); cartoon-shadow collapse; badge success/warning/info; dark-mode-toggle focus ring; GlassPanel 5-rung migration; useAnimatedNumber progress-clamp; useStagger PRM | `--opacity-disabled` live across `theme/literals.css` + consumed (`TabsTrigger`/`AccordionTrigger`/`ToastAction`); cartoon-shadow chain in `tokens/shadow.css:9`; badge `success/warning/info` (`badge/index.ts:36-41`); DarkModeToggle `focus-ring` (`:106`); `GlassPanel.vue` ships (restored AZ B5); useAnimatedNumber `clampProgress` (`:63`); useStagger PRM (`:43`) | **SUPERSEDED** | archive-tag + delete |
| **z-w2** | 5 | GlassTimeline `variant="segmented"` (per-segment gradient + hover/click); `--shadow-uniform` offset-0 token; dock overflow tightening | `GlassTimeline.vue:36 variant?: 'scrubber'\|'segmented'\|'continuous'`, render arm `:113 v-else-if="variant==='segmented'"`; `tokens/shadow.css:42 --shadow-uniform`; demo `timeline-segmented.vue` + manifest:435 | **SUPERSEDED** | archive-tag + delete |
| **aw-glass-atoms-band** | 2 | `.glass-material` unified moving-specular+edge-rim mixin (AW.W22); 4 Baseline-2025 SOTA glass folds (AW.W23) | `.glass-material` carved to `styles/glass/material.css` (+ `glass-refract.css`, `glass-specular-track.css`); gates `proof:glass-material-unified`/`-demo`/`proof:liquid-glass-material` in `package.json:701/724` + `gates.mjs:808/1015` | **SUPERSEDED** | archive-tag + delete |
| **ax-w13-vangogh-oilpastel-mediums** | 1 | first-class van-Gogh + oil-pastel aurora mediums + pigment-true stroke compositing + 4 painterly proof gates | Fully REBUILT-and-superseded on master: `mediums.glsl.ts:138 #define MEDIUM_VANGOGH 5` / `:139 MEDIUM_OILPASTEL 6` + dedicated `vangogh-medium.glsl.ts` (the post-branch W-AUR-VANGOGH-REBUILD atomic-dab body, `:272`); presets `medium:"vangogh"`/`"oil-pastel"` (`presets.ts:293/335`); all 4 gates present (`proof-aurora-{vangogh-preset,stroke-composite,painterly-statistics,oilpastel-medium}`) | **SUPERSEDED** (the AX-branch content moot under the AY-era painterly rebuild; capability re-landed + superseded) | archive-tag + delete |
| **af-w1-glass-ui** | 0 | — | `merge-base(master, af-w1) == af-w1 HEAD` → af-w1 is an ANCESTOR of master (fully merged; master 545 ahead) | **SUPERSEDED** (merged ancestor) | delete (no tag needed) |

## The ahead-0 corpses (verified one rev-list each)

| branch | `rev-list master..<b>` | disposition |
|---|---|---|
| **v.w234** | 0 | delete |
| **w.w2.1** (local + `origin/w.w2.1`) | 0 | delete (+ delete remote) |
| **origin/release/0.7.x** | 0 | delete remote |
| **origin/v0.9.2** | 0 | delete remote |

## AT-RISK calls

**NONE.** Adversarial check held on every branch — each SUPERSEDED verdict is a FOUND master equivalent (file:line cited above), not absence-of-evidence. The single absent symbol — ak-w3's `--meter-progress-gap` — is a speedtest-consumer-local token (its sibling `--meter-progress-inset` survives as the lib token; the `-gap` variant is consumer-owned under presets-in-consumers), so it is not a library loss and does not raise an AT-RISK.

## Notes for the BA close (fork-close protocol per INVARIANT 11)

- All 14 branches are dispositioned **archive-tag → delete** (ahead>0) or **delete** (ahead-0 ancestors/corpses); none folds into a BA wave.
- ax-w13 is the only branch whose capability was re-landed AND THEN superseded again (the AY painterly rebuild rewrote the medium it introduced) — record it as SUPERSEDED, not STALE-RETIRE, because the named capability (van-Gogh/oil-pastel mediums) IS present on master, just via a later authorship.
- al-w3 is a recorded no-op (pure comment prose); tag it for provenance but expect zero content delta.
