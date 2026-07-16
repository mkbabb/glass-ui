# Motion + Dock deep audit — iOS-27 curve fidelity, wave archaeology, dock ledger

**Auditor:** Fable motion fork (BI-addenda). **Tree:** codex agent's live working tree (7.0.0 in-flight),
READ-ONLY. **Reference corpus:** `docs/tranches/BI/design/ios27-reference/{DOCK-LADDER,MOTION-LADDER}.md`
(measured frame-by-frame from the 60/120fps iOS-27 videos). **Live paint:** BLOCKED (see §0).

---

## §0 Live-measurement status — BLOCKED (shared demo-server breakage)

`:5199` serves the shell HTML (HTTP 200) but Vue never mounts: `bodyLen 0`, 0 canvases, console
`504 (Outdated Optimize Dep)`. Reload + 8s poll did not recover; I did not touch their server (fence).
This is the SAME vite optimize-deps invalidation the design + proportion forks hit — a dev-server
transient from the in-flight peer-dep churn (CVA/clsx drop, value→^4/kf→^6 bump), fixable by a server
restart the codex agent owns. **Consequence:** the rAF-sampled overshoot/settle/interruption traces
could not be captured. This audit is therefore STATIC (curve code + emitted tokens) + the measured
REFERENCE numbers. **The live π discharge over the dock/motion surfaces remains OWED** — it is a
first-class addenda obligation, not a completed check. Evidence of the block:
`reports/motion-shots/` (blank-mount state).

The good news: the decisive motion findings are code-level (emitted `linear()` stops, `(response,ζ)`
pairs, consumer wiring) and ARE verifiable statically. The live pass will CONFIRM, not discover.

---

## §1 Curve census — every named spring vs its measured iOS-27 band

Source: `src/composables/motion/springPresets.ts` (8 rows) + emitted `src/styles/tokens/scheme-spring.css`.
Measured bands: MOTION-LADDER §2 / DOCK-LADDER §2.

| preset | (response, ζ) | overshoot | JS consumers | CSS token consumers | iOS-27 band | verdict |
|---|---|---|---|---|---|---|
| smooth | 0.58, 0.80 | +1.5% | 0 (CSS-driven) | default `--transition-liquid-spatial`; hover/press | enter-settle; no measured direct analog | **PASS** — settle register, time-faithful now |
| snappy | 0.48, 0.74 | +3.2% | 2 | tab-indicator, progress, reveal | control/detent-ish; measured detent is 0.31/0.80 | **PASS-with-note** — drives the tab lens (see §4 eyeglass) |
| bouncy | 0.60, 0.60 | +9.5% | 0 | dialog/success one-shots | no measured surface >1.7%; playful is off-corpus | **PASS** (deliberate playful pole; not reference-bound) |
| gentle | 0.82, 1.00 | 0% | 0 | patient settles | critically-damped calm | **PASS** |
| **dock** | **0.30, 0.82** | **~1.2%** | 2 (DOCK_SPRING) | dock morph/crossfade/resize | **measured 0.25–0.32 / ζ0.80–0.90, 1.1–1.4%** | **PASS — RETUNED, now matches the measured band exactly** |
| press | 0.20, 0.80 | +1.5% | 2 | tap-press | sub-200ms control | **PASS** |
| transient | 0.62, 0.90 | ~+0.15% | 0 | `--enter-transient-*` (Toast center-seed) | measured bloom 0.6–0.8/ζ0.85–1.0, t90 300–375ms, 0% | **PASS — NEW row, matches the measured capsule bloom** |
| **eyeglass** | **0.36, 0.64** | **~7.3%** | **0** | **0 — token emitted, nothing reads it** | tab-lens 0.32–0.40/ζ0.65–0.85; system overshoot ceiling **1.7%** | **DEFECT** — unconsumed AND 7.3% overshoot is ~4× the measured 1.7% ceiling |

**The parity break (MOTION-LADDER §5.1, "the single biggest finding") is FIXED.** The prior tree emitted
each `linear()` over a `4×response` horizon (~1.9s) while pairing it with a ~0.4s duration clock — a ~4.8×
mismatch that front-loaded the whole trajectory into the first 10–16% of the clock ("~50ms pop then a
300ms dead-flat tail"). The codex tree's `regen-spring-tokens.mjs generateBlock()` now feeds the numeric
2%-settle seconds as `springProjection`'s `maxDuration`, so `CSS_t90 == JS_t90` (<1ms all presets). Proof
in the emitted stops: `--spring-smooth` reaches **0.655 at 51.0% of clock** (was ~0.9 by ~12%). The
curve⟂clock split is real: `--spring-<name>-settle` (internal numeric 2%-settle) × `--motion-tempo` →
`--spring-<name>-duration` (public reader), tempo default 1.0 identity (no-op at rest).

## §2 The judgment batch (a/c/g) — ALL LANDED in the codex tree

The PLAN §0 judgment items the ledgers list as "capture-owed, rides #92" are already resolved in code:

| item | plan said (shipped→proposed) | codex tree NOW | verdict |
|---|---|---|---|
| **(a) dock spring** | 0.68/ζ0.64 (+7.3%) → measured 0.28±0.04/ζ0.82±0.06 | `springPreset("dock")` = **0.30/0.82** (springPresets.ts:88) | **LANDED to the measured band** |
| **(c) motion tempo** | 0.88 tighten vs 1.0 identity | `--motion-tempo` default **1.0**; the `-settle`×tempo→`-duration` round-trip (M11) | **LANDED as 1.0 identity + shape-preserving axis** |
| **(g) DRAWER_SNAP** | {0.5,0.74} → measured ≈{0.32,0.80} | `DRAWER_SNAP = {0.32, 0.80}` (drawer/constants.ts:30) | **LANDED to the measured detent** |

These were the three biggest reference deltas in the ladders. They are done. The A/B capture pairs the
PLAN reserved are moot on the value axis (the measured value won) — but the **live paint confirmation** of
the retuned feel is still owed (blocked, §0).

## §3 The DOCK ledger — working / challenged / changed / broken / publishable

**Architecture (verified):** the dock runs **ONE** `SpringProgress` — `useDockSpring`, consumed by
`dockMorphContext.ts` (the sole `new SpringProgress`) + `DockCrossfade.vue`, both reading `DOCK_SPRING`
(=`springPreset("dock")`). The P028 "single FLIP/morph engine" consolidation is real.

### WORKING (code-sound; live-confirm owed)
- ONE dock spring authority at the measured iOS band (0.30/0.82); DRY-consolidated in `constants.ts`.
- Crossfade layer engine (`<DockCrossfade>`) drives the V↔H flip via `--dock-t` off the one spring.
- `DOCK_MORPH_MAX_STRETCH = 1.14` squish cap (BD.W-MOTION-WEIGHT drift-fix from a stale 1.08) — weight
  lives in the deformation channel, exactly as DOCK-LADDER §8 prescribes ("weight in deformation, not the
  clock").
- Overflow fit, hold-intent, search, touch-gate, click-integrity all present as discrete composables.

### CHALLENGED (formation critique, verified in the retirement record)
- **Fission/goo spectacle** — the BD-era `useDockFission` + `DOCK_SPLIT_SIGNATURES` + fission-bridge/island
  CSS. Formation verdict: demo-only, zero-binary-consumer, AND the **prime UF-C3 Safari suspect** (the only
  dock mechanism stacking goo `filter:url()` over `backdrop-filter`).
- **V↔H orientation morph** (`useDockOrientationMorph`) — folded into the crossfade.
- **Siri island** (`useSiriDock`, `SIRI_FORMS`/`siriFormOf`) — demo-only, retired.
- **DOCK_SPRING 0.68/ζ0.64** — DOCK-LADDER C7: "moved AWAY from the reference it cited," 4× the measured
  overshoot ceiling.

### CHANGED (what landed)
- Fission, orientation-morph, Siri island → **DEFINITION-ABSENT** (BI.W-DOCK-RETIRES, clean break, no
  alias; GlassDock.vue:10,465; index.ts:95; composables/index.ts:48). The V↔H flip is now the crossfade.
- DOCK_SPRING retuned 0.68/0.64 → **0.30/0.82** (judgment-a).
- Morph stretch cap 1.08 → 1.14.

### BROKEN / AT-RISK (needs the live pass to confirm/deny)
- **Live paint unverified** — the retuned dock morph, crossfade V↔H, overflow, collapse@390 have NO
  captured evidence at HEAD (the whole dock-paint chronic: TAIL reg#7 8+hops, reg#13 AY reshoot,
  reg#16 Safari/Metal — all orphaned when #92 never ran). Overshoot/settle/interruption UNMEASURED live.
- `shell.css` 505 LOC (only dock file >500); GlassDock.vue 468, useDockState 421 — borderline, judge cohesion.

### PUBLISHABLE (ready as addenda rows)
1. **RATIFY the fission retirement** OR **REBUILD it cleanly** — a genuine open decision (§5).
2. **The dock-morph π discharge** — a born-RED live-paint obligation (dual-engine, both modes, real Safari):
   overshoot ≤~2%, settle ≤~420ms, interruption re-seats with velocity carry (DOCK-LADDER §2 numbers).
3. **eyeglass preset disposition** (§4) — wire it or retire it.

## §4 The eyeglass finding (unconsumed preset + overshoot vs ceiling)

- `eyeglass` (0.36/ζ0.64, ~7.3% overshoot) is in `SpringPresetName` + emits `--spring-eyeglass` +
  `--spring-eyeglass-duration`, but **nothing consumes it** — the only reference is its own `-duration`
  reader (scheme-spring.css:162). The tab loupe indicator is wired to `--spring-snappy-duration`
  (scale-paper.css:63); `.glass-lens` (SegmentedTabs.vue:385) is the VISUAL loupe material only.
- So UF-H1's loupe MATERIAL shipped as the tabs default (R2 correctly refuted "eyeglass absent"), but the
  loupe's dedicated MOTION register is dead-wired. Either: (a) wire `--tab-indicator-duration` →
  eyeglass (the intended register), or (b) retire the preset as a dead curve. This is a real defect either
  way — an emitted-but-unconsumed spring is the synonym/dead-curve disease the C6 apotheosis lens hunts.
- If wired, **7.3% overshoot exceeds the measured 1.7% system ceiling ~4×** (DOCK-LADDER §4: the lens
  "swells proud" in SIZE ~1.21×, it does not positionally overshoot 7%). The preset's own fence permits
  [0%,10%], but the reference says the loupe travel is a 1.7%-class settle with a size-swell, not a bouncy
  position spring. This owes the A/B the judgment batch reserved (now a live-paint row).

## §5 The dock design tension the addenda must decide

The iOS-27 reference IS the fission/merge dock (two capsules ⇄ minimized triad, the 1–2-frame goo waist,
the traveling clear lens). glass-ui **deliberately retired fission** as a Safari `filter:url()` risk. So
the shipped dock is a DIFFERENT, simpler artifact: expand/collapse + crossfade layers, no scroll-minimize
fission. The user order is "perfect the dock … its utility." The DECISION (a real user-gated row, not a
defect): **(A) ratify the simplified dock as terminal** (the fission spectacle was demo-only and Safari-
risky; the honest goo per DOCK-LADDER §3 is only a ≤2-frame waist anyway, so a clean CSS/canvas
re-implementation without stacked `filter:url()` is possible), or **(B) rebuild fission cleanly** — the
DOCK-LADDER §3/§8 spec gives the exact honest goo bounds (lobe-bulge → ≤2-frame waist → clean separation;
dual-glyph crossfade; the traveling clear-on-frost lens with rim-gated ink; PRM = instant topology swap)
and explicitly warns against the persistent-strand fan-fiction. The addenda should carry this as a
brainstorm→golden→challenge decision wave, defaulting to (A) ratify unless the user wants the spectacle.

## §6 Defect rows (ranked)

| id | sev | surface | mechanism | claim | evidence |
|----|-----|---------|-----------|-------|----------|
| MD-1 | major (π-owed) | dock + all motion | live-paint-orphan | Retuned dock/drawer/tempo have ZERO captured paint evidence at HEAD; overshoot/settle/interruption unmeasured; the dock-paint chronic (#92) never ran | :5199 504-blocked; TAIL reg#7/13/16; no evidence/BI.W-P0XX captures |
| MD-2 | major | tabs / motion | dead-curve / under-wired | `eyeglass` spring (0.36/ζ0.64) unconsumed — tab lens wired to snappy; wire-or-retire | scheme-spring.css:162 sole ref; scale-paper.css:63 = snappy; SegmentedTabs.vue:385 |
| MD-3 | major (decision) | dock | scope-tension | Fission/orientation-morph/Siri retired → dock is not the iOS-27 fission dock; ratify-or-rebuild | GlassDock.vue:10,465; index.ts:95; composables/index.ts:48 |
| MD-4 | minor | tabs / motion | ceiling-exceed | IF eyeglass wired, 7.3% overshoot ~4× the measured 1.7% system ceiling; reference loupe is size-swell not position-bounce | DOCK-LADDER §4; springPresets.ts:120 |
| MD-5 | minor | dock | god-module | `shell.css` 505 LOC (only dock file >500); GlassDock.vue 468/useDockState 421 borderline | wc -l |
| MD-6 | note (verify-live) | motion global | parity-fix-unconfirmed | The CSS/JS parity fix + judgment retunes are code-correct but unconfirmed in paint | scheme-spring.css emitted stops; needs §0 unblock |

## §7 What already SUPERSEDES the reference (do NOT re-litigate)
- The CSS/JS spring parity fix (curve⟂clock split, settle-seconds horizon) — a genuine engineering
  correction the reference doc itself only PROPOSED; the codex tree BUILT it.
- Dock spring, DRAWER_SNAP, motion tempo — all retuned to the measured iOS bands (judgment a/c/g).
- The `transient` center-seed bloom register — matches the measured capsule bloom (0.6–0.8/0%-overshoot).
- ONE dock spring engine; weight-in-deformation discipline (stretch cap, not a slow clock).
- `.glass-lens` loupe material as the tabs default (UF-H1 delivered).
