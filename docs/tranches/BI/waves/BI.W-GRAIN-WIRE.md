# BI.W-GRAIN-WIRE — the grain switch no-op fix + the story dead-ref audit

Band B8 (prunes + consumer-truth / mechanism-local repair). Born-RED at HEAD.

## §Mandate

Discharges:
- **UF-J2** — "this seems to do nothing." (ss-11; the grain Switch on the paper/glass config demo).
- **FAM-2 / bld:demo-control-wire** (CHRONIC §2) — `settings.vue:31,37` `grain`/`paperGrain` refs bound to a
  slider + a Switch with ZERO downstream consumer; the audit generalizes: sweep ALL story controls for
  dead refs (a control whose model is written but never read).

## §Design

Decided mechanism (ROUND-1 FAM-2, source-verified — a decidable wiring fix, no design loop):

- **`grain` → a real surface effect.** `settings.vue:31 const grain = ref(3.5)` drives the slider
  (`:176 v-model="grain"`) but nothing reads it. Bind it to the live grain token — write
  `--glass-grain-opacity` (the tier-root grain channel the `.glass-material::after` recipe reads) on the demo
  surface via a `:style` derived from `grain`, so moving the slider visibly changes the grain density.
- **`paperGrain` → toggle the real overlay.** `settings.vue:37 const paperGrain = ref(true)` drives the Switch
  (`:190 :checked` / `:193 @update:checked`) but nothing reads it. Bind it to the `.paper-grain-overlay`
  utility class (`:class="{ 'paper-grain-overlay': paperGrain }"`) on the demo body, so the switch toggles the
  paper grain that the page is literally ABOUT (the `:268` self-comment names the irony).
- **The dead-ref audit (the never-again floor).** A demo control model that is WRITTEN (v-model / @update)
  but never READ by the template or a derived binding is a dead control — the exact UF-J2 class. Sweep every
  `demo/stories/**/*.vue` control ref and either wire it to a real effect or delete the dead control (clean
  break — an unwired control is a lie the demo tells the user).

## §Work

- `demo/stories/compositions/settings.vue` — derive `--glass-grain-opacity` from `grain` (`:style`) on the demo
  surface; add `:class="{ 'paper-grain-overlay': paperGrain }"` on the paper section body; the `cartoonShadow`
  / `reducedMotion` peers (`:34,:38`) are audited in the same pass (wire-or-delete).
- Dead-ref sweep across `demo/stories/**/*.vue`: enumerate every control-bound `ref`/model and confirm a
  template/derived read; wire the live ones, delete the dead ones.

## §Acceptance

Gate: **`proof:demo-control-live`** (NEW, `["local","ci"]`) — the story dead-ref detector.
- **BORN-RED at HEAD**: `settings.vue` `grain`/`paperGrain` are written by a control but never read (the
  no-downstream-consumer clause reds).
- DCL1 — every `v-model`/`@update:*`-bound control ref in the enrolled story set is READ by the template or a
  derived binding (no write-only control model).
- DCL2 — `settings.vue` `grain` writes `--glass-grain-opacity` and `paperGrain` toggles `.paper-grain-overlay`
  (the two named UF-J2 controls resolve to real effects).
- Self-test bite: a synthetic write-only control ref (bound to a Switch, read nowhere) reds DCL1.

## §π/DELTA

`tests-visual/demo-control-live.spec.ts` (NEW, LOCAL-only, rides the B-close gestalt ceremony (W-GESTALT-LEDGER-FILE oracle + the close battery)):
- flip the grain Switch on `/compositions/settings` → the `.paper-grain-overlay` grain visibly appears/
  disappears (a per-region luminance/texture delta); drag the grain slider → the surface grain density changes
  (getComputedStyle `--glass-grain-opacity` tracks the slider). BOTH modes.

## §Obligations

- No cross-repo ask (demo-only wiring; zero `src/` paint change — the grain/paper tokens + `.paper-grain-overlay`
  utility already ship).

## §Dispositions

- Terminalizes **bld:demo-control-wire** (CHRONIC §2): BUILT (grain/paperGrain wired + the story-wide dead-ref
  audit). Liveness probe: a demo control model written-but-never-read REDs (the write-only-control detector is
  the never-again floor — the UF-J2 class cannot silently return).
