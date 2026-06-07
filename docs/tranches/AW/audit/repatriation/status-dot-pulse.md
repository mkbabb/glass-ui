# status-dot (StatusDot) + pulse (Pulse) — KEEP-SHARED verdict (both)

Two generic UI primitives, censused together. **StatusDot** = active/paused/idle/error/custom status indicator (`src/components/custom/status-dot/StatusDot.vue`; subpath `/status-dot`). **Pulse** = dots/ring loading spinner + `aura` ambient halo (`src/components/custom/pulse/Pulse.vue`; subpath `/pulse`). Neither names "speedtest" anywhere in its source — both are generic by KIND. The census confirms each has a GENUINE non-speedtest app consumer, so neither is overfit substrate even under the user's specificity lens.

All glob excludes node_modules/dist/.git. Comment/JSDoc/doc-string mentions of `<StatusDot>`/`<Pulse>` are catalogued as class (d)-noise and excluded from render counts; only real `import` + `<Tag>` render pairs count.

## Consumer census — StatusDot

| repo | file:line (import + render) | symbol | render-count | class |
|------|------|------|------|------|
| muster | import `src/components/voter/VoterRow.vue:15`; render `:77` | StatusDot | 1 | (b) generic app |
| muster | import `src/components/instrument/OriginsLayer.vue:44`; render `:110` | StatusDot | 1 | (b) generic app |
| muster | import `src/components/verdict/RankedVerdict.vue:41`; render `:241`, `:258` | StatusDot | 2 | (b) generic app |
| muster | import `src/components/verdict/TravelMatrix.vue:28`; render `:78` | StatusDot | 1 | (b) generic app |
| muster | import `src/components/verdict/WhyThisWonSheet.vue:36`; render `:291` | StatusDot | 1 | (b) generic app |
| muster | import `src/components/dock/CommandDock.vue:41`; render `:152` | StatusDot | 1 | (b) generic app |
| keyframes.js | import `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:169`; render `:56` | StatusDot | 1 | (b) generic app (demo of keyframes.js, not glass-ui) |
| keyframes.js | import `demo/@/components/custom/dock/TopDock.vue:20`; render `:156`,`:182`,`:196` | StatusDot | 3 | (b) generic app |
| speedtest | — (grep: NONE in `speedtest/src`) | — | 0 | — not a consumer |
| fourier-analysis / value.js / words | — (no matches) | — | 0 | — |
| glass-ui internal | none (only `Skeleton.vue:88` + `MetricRow.vue:23` JSDoc mentions of `<Pulse aura>`, not StatusDot renders) | — | 0 | (d) |
| glass-ui demo | `demo/stories/primitives/status-dot.vue` | StatusDot | story | (d) demo only |

StatusDot real-render total: **9 render sites across 8 files in 2 non-speedtest apps (muster + keyframes.js)**. Zero speedtest consumers.

## Consumer census — Pulse

| repo | file:line (import + render) | symbol | render-count | class |
|------|------|------|------|------|
| speedtest | import `src/components/speedtest/SpeedtestResults.vue:324`; render `:154`,`:232` | Pulse | 2 | (a) speedtest |
| speedtest | import `src/components/speedtest/CompleteBadge.vue:46`; render `:18` | Pulse | 1 | (a) speedtest |
| speedtest | import `src/components/speedtest/ResultStack.vue:117`; render `:48`,`:100` | Pulse | 2 | (a) speedtest |
| speedtest | import `src/components/survey/FlowSelector.vue:82`; render `:39` | Pulse | 1 | (a) speedtest |
| speedtest | import `src/views/AdminLoginView.vue:117`; render `:36` | Pulse | 1 | (a) speedtest |
| muster | import `src/components/dock/CommandDock.vue:43`; render `:148` (`variant="dots"`) | Pulse | 1 | (b) generic app |
| fourier-analysis / value.js / keyframes.js / words | — | — | 0 | — |
| keyframes.js | `demo/playground/usePlaygroundAnimations.ts:31` `pulse.name = "pulse"` — local animation var, NOT the component | — | 0 | not a consumer |
| words | `TimeMachineTimeline.vue:30` "Pulse on selected" = hand-rolled `animate-ping` div, NOT glass-ui `<Pulse>` | — | 0 | not a consumer |
| glass-ui internal | `Skeleton.vue:88` + `MetricRow.vue:23` — JSDoc references to `<Pulse aura>`, no render | — | 0 | (d) comment |
| glass-ui demo | `demo/stories/primitives/pulse.vue` | Pulse | story | (d) demo only |

Pulse real-render total: **7 speedtest render sites + 1 muster render site**. Speedtest is the heaviest consumer, but muster (CommandDock.vue:148) is a genuine non-speedtest app consumer.

## Verdict + rationale

**StatusDot → KEEP-SHARED.** It has ZERO speedtest consumers and 9 genuine render sites across two non-speedtest apps (muster's voter/verdict/origins/dock surfaces drive it as their universal per-row identity-hue dot; keyframes.js demo's menu-bar + dock). It is a fully generic status-indicator primitive (active/paused/idle/error/custom variants, no domain vocabulary). Repatriating it to speedtest would be exactly backwards — speedtest does not even use it.

**Pulse → KEEP-SHARED.** Although speedtest is the dominant consumer (7 sites; dots + aura), muster's CommandDock.vue:148 is a genuine generic-app consumer (`<Pulse variant="dots">` as the solving-phase spinner). That single non-speedtest consumer plus the primitive's generic KIND (a loading spinner + ambient halo with no speed-test vocabulary in its props or source) clears the >=2-genuine-generic-use bar and blocks a clean repatriation. Pulse is a generic loading indicator the same way `<Skeleton>` is; it is not bespoke to the network-speed-test instrument domain.

Both pass the user's specificity test: neither hard-references speedtest by name (contrast metric-stack/MetricStack.vue's literal speedtest reference). They are generic by kind, and each in fact has a live non-speedtest app render today.

## Move plan

None. Both families stay in glass-ui. No dir move, no subpath retirement, no `api/`/`package.json` export change, no speedtest import rewrite. (For completeness: `package.json` exports `./status-dot` → `dist/status-dot.{d.ts,js}` at lines 329-331 and `./pulse` → `dist/pulse.{d.ts,js}` at lines 333-335; both stay. Neither symbol is on the root barrel `src/api/index.ts` type list — they are subpath-only and remain so. Neither is re-exported from `src/components/custom/index.ts`.)

## Blocking coordination

- **StatusDot:** muster is the SOLE production app consumer (8 files, 9 renders) and would break if the family moved — but it is not moving, so no coordination needed. Speedtest is unaffected (does not consume StatusDot).
- **Pulse:** muster/CommandDock.vue:148 is the non-speedtest consumer that, on its own, blocks any repatriation-to-speedtest of Pulse. Keeping the family shared is zero-cost for both speedtest and muster. No coordination required.

## Summary

1. StatusDot and Pulse are GENERIC primitives (status dot; loading spinner + ambient halo) — neither names speedtest in source.
2. Verdict: **both KEEP-SHARED.**
3. StatusDot has ZERO speedtest consumers and 9 render sites across muster (6 files) + keyframes.js demo (2 files) — fully generic, repatriation would be backwards.
4. Pulse is consumed by speedtest (7 sites) AND muster (CommandDock.vue:148, `variant="dots"`) — one genuine non-speedtest app consumer clears the bar.
5. Pulse is generic by KIND (a `<Skeleton>`-class loading indicator), not bespoke to the speed-test instrument domain.
6. words `TimeMachineTimeline.vue:30` "Pulse on selected" is a hand-rolled `animate-ping` div, NOT the glass-ui `<Pulse>` — not a consumer.
7. keyframes.js `usePlaygroundAnimations.ts:31` `pulse.name = "pulse"` is a local var, not the component — not a consumer.
8. fourier-analysis, value.js have zero usage of either family.
9. No move: dirs, subpaths (`/status-dot`, `/pulse`), and `package.json` exports all stay; no speedtest import rewrites.
10. Blocking coordination: muster blocks any Pulse repatriation and is the sole StatusDot app consumer — both moot since neither family moves.
