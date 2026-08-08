# BK #86 W-SURFACE-MATERIAL + #88 W-PROGRESS-SEAM — THE JOINT C-1 CUT

**Seat:** joint implement · **modelId: `claude-opus-5[1m]`** (Opus lane, asserted first)
**Date:** 2026-08-08 · **Tree HEAD at open:** `7d9abe08` · **Mode:** shared dirty tree, driver commits

---

## §0 · THE STEP-0 BASELINE (banked BEFORE any byte)

| item | value |
|---|---|
| baseline diff | `/tmp/bk-row-baseline-1786211905.diff` (6,630 lines, sha256 `45ef2afd62b1aeee…1b506f136`) |
| `git status --porcelain \| wc -l` at open | **102** |
| epoch | `1786211905` |
| tracked files dirty at §0 | **69** |

**Known blind spot honoured (⊕⁶²):** a `-U0` baseline cannot see UNTRACKED files. The five
uncommitted foreign lanes' untracked news (`carousel/*`, `deck/*`, `pager-dots/worm.ts`,
`slider/styles.css`, `eyeglass.ts`, `useLeadTrail.ts`, `tests/components/{carousel,pager-dots}/`,
`tests/gates/{feedback-tint-seam,tabs-seam}.test.ts`) is NOT this row's. §9 discloses the one
untracked foreign file this cut necessarily touched, by line.

---

## §1 · THE JOINT WORK ORDER

C-1 (`COMPONENT-WAVES-TERMINAL-3.md:1808`) makes these ONE cut, verbatim:

> **C-1 · THE TRACK SEAM — progress vs surface-material, direct contradiction, RULED: eviction +
> rename WINS (surface-material).** … Owners: surface-material = the file move; progress = the
> paint/grammar edits; ONE joint cut. G-SM3's law gains two enumerated carve-outs: light-channel
> registers (`track-flow`'s plus-lighter specular) and the pending-rename value-marks pair.

Executed in three phases so no `track-well` half-state exists between the rows:

**A · the joint register (C-1).** `src/styles/glass/track-well.css` → `src/styles/track-well.css`,
`.glass-track-well` → `.track-well`, the `background` strike, the recess ink, the
`--track-well-recess` derivation, all seven consumers, both pinning gates, the manifest generator.

**B · #88's paint + grammar** on the renamed register.
**C · #86's file move, prop cut and register collapse**, including #89's `resolve.ts` relocation.

---

## §2 · PRECONDITIONS VERIFIED ON DISK (each with its evidence)

### 2.1 Both rows UNSTARTED, ⊕⁶³ the tail

| claim | detector | result |
|---|---|---|
| #86 UNSTARTED | `grep -n "^\| 86 " EXECUTION-PROGRESS.md` | `:3405` → `\| 86 \| W-SURFACE-MATERIAL \| Φ5 \| UNSTARTED \|` |
| #88 UNSTARTED | `grep -n "^\| 88 "` | `:3407` → `\| 88 \| W-PROGRESS-SEAM \| Φ5 \| UNSTARTED \|` |
| ⊕⁶³ is the tail | `grep -n "⊕⁶³"` | `:3048` `#87 W-MARKS LANDS (2026-08-08, 74dfab18)` — no ⊕⁶⁴ |
| #89 seated, joint with #86's move | roster `:89` | `⊕² SEATED … joint with #86's resolve.ts move` |

### 2.2 SUSTAINED — the specs' premises that hold

| premise | detector | on disk |
|---|---|---|
| `track-well.css` a groove with no filter | `cat src/styles/glass/track-well.css` | 44 ln; `position/overflow/border-radius/background: var(--muted-medium)`; **0** `backdrop-filter` |
| `.glass-track-well` 7 consumer files | `grep -rl` src/demo/tests | Progress · Slider(×2) · Timeline(×3) · rim(comment) · glass.css · 3 test files |
| `resolveSurfaceClass` 7 call sites / 6 files | `grep -rn` | Tooltip:48 · Toast:91 · DropdownMenu:78 · Dialog:174 · Sheet:105 · Surface:94 (+decl) — **exact** |
| `material-roles.css` 23 ln, double-gated | `cat` | 4 role rules + `[data-material][data-shadow] { box-shadow: … }` at `:20-22` |
| `Surface.vue` 102 ln, 7 props, 8 attrs | `wc -l` + read | exact |
| no rung declares `border-radius` | `grep -c border-radius src/styles/glass/ladder.css` | **0** |
| `--radius-ctx` ships | `grep -n radius-ctx src/styles/theme/radius.css` | `:190 --radius-ctx: var(--radius-card);` |
| deep bridge is floating-only | `src/styles/glass/deep.css` | one line: `--glass-blur-floating: var(--glass-blur-deep);` |
| `--glass-key-direction: 0`, comment names `-0.375` | `glass-fx.css:136` + `:123-135` | exact, 4 consumers |
| `.glass-material` dead positions | `grep -rn '^\s*\.\(dark \)\?\.\?glass-material[:,]'` | **16** selector lines / 5 stylesheets, **0** applications |
| 3 undeclared Progress knobs | `grep -rn` src/styles | `--progress-size`, `--progress-vertical-size`, `--glass-progress-track-color` → **0 declarations** |
| two indeterminate keyframe families + PRM ramps | `Progress.vue:245-279` | `-sweep` + `-rise`; `:275-278` horizontal ramp; `:183` (0,3,0) vertical |
| the `throw` watchEffect | `Progress.vue:35-41` | present, `import.meta.env.DEV` throws |
| rim `SWALLOW_BAND` fractional opacity | `ScrollProgressRim.vue:21,78` | present |
| `--progress-track-on-glass` two literal arms | `on-glass-fg.css:38` / `dark-arm.css:292` | `hsl(34 24% 84%)` / `hsl(28 14% 26%)` |
| the 8-row collision ledger | the 5 named test files | all present at the cited lines |

### 2.3 REFUTED ON DISK — precondition drift, recorded not executed

| spec claim | detector | disk | disposition |
|---|---|---|---|
| `glass-specular-track.css` is a DUPLICATE specular body (§3.4 DELETE, R-D/R-J) | `cat src/styles/glass-specular-track.css` | its own header: *"There is NO duplicate `::before` body here"* — the file carries ONLY the PRM + reduced-transparency brackets | **REFUSED WITH GROUNDS.** Deleting it deletes two a11y guards. The `.glass-specular-track` class is now load-bearing on **5** components (#80 made it the Button's ONE gleam seat: `Button.vue:119`; + Slider thumb `:364`, dock ×2, Card). P9's byte-parity premise is void. → ROUTED |
| K2 strikes `material.css:134-146` (the `::before` ring) once W-BUTTON's edge lands (C-8) | `Button.vue:119` | #80 LANDED (`70dc0f06`) by **composing** `.glass-specular-track` — i.e. it took a dependency ON the ring rather than replacing it | **REFUSED WITH GROUNDS** — C-8's precondition inverted at execution. → ROUTED |
| `button/styles.css:43` reads `--glass-blur-deep` (D-9 half) | `grep -- "--glass-blur-deep" src/components/button/` | **0 hits** | ALREADY CURED by #80 |
| `.timeline-rail.is-deep` never paints (D-9 half) | `grep -n "is-deep" src/components/timeline/Timeline.vue` | **0 hits** | subject gone |
| rim `:59-60,:94-95` ride `--spring-snappy` with `0.44s`/`ease-out` literals (S4 half) | `sed -n '51,95p' rim/styles.css` | already `var(--spring-dock-duration) var(--spring-dock)`, **no** literal fallback | ALREADY CURED |
| §3.6 hoists `--glass-blur-deep-active-radius` to `:root` | `deep.css:40-52` records the FREEZE-FIX | a `:root` declaration eager-substitutes `--glass-depth` at its **initial value 1**, freezing every deep surface at the ceiling | **SUBSTITUTED** — the arm moves to `.dark .glass-deep` (where its inputs live) instead. Same defect cured, opposite direction |
| `springPreset("dock")` ≈ {0.35, ζ0.82} (spec §3.7 / R-7) | `sed -n '78,90p' springPresets.ts` | **{response 0.30, dampingFraction 0.88}** | figure CORRECTED at its one citation site. Never trust a remembered literal |
| `styles/glass/` = 22 files | `ls -1 \| wc -l` | **30** (rows #81/#82/#83/#87 added `overlay-plate`, `control-{edge,bit,surfaces}`, `mark`) | the "22 → 17" headline is arithmetic against a tree that no longer exists; the FILE-COUNT folds are routed (§8) |
| `styles/glass-refract.css` needs re-homing (D-19) | `find src -name "*refract*"` | **absent** — already gone | moot |

---

## §3 · THE TRACK-WELL JOINT STORY, EXPLICITLY

One register, one cut, no half-state.

1. **The file moves.** `src/styles/glass/track-well.css` → **`src/styles/track-well.css`**, and the
   `glass-` prefix leaves with it. The ground: DAG-RULINGS §3c puts genuine cross-component CSS
   registers up in `styles/`, and the prefix promises a material this file never declared — 0
   `backdrop-filter`, 0 blur, 0 saturate, across 39 census rows. It is a **shape**.
2. **The class renames.** `.glass-track-well` → **`.track-well`**, at all seven consumers in the
   same cut: `Progress.vue:70`, `Slider.vue:305`, `Timeline.vue:295` (+3 comment citations),
   `slider/styles.css:96`, `rim/styles.css:13`, `glass.css`, and the three test files.
3. **The import rung moves** from `glass.css` to `styles/index.css`, immediately after `glass.css`
   (`4a` in the cascade doc block). The consuming slider/progress/timeline recipes stay UNLAYERED,
   so their sizing + state legs still win at equal specificity — unchanged by the move.
4. **#88 paints the renamed class.** `background: var(--muted-medium)` **strikes** — the register's
   only paint declaration, dead in every consumer anyway (`@layer components` vs unlayered scoped
   CSS). What replaces it is the groove's own physics: **one top-only inset ink edge**, α
   `--ink-edge` 0.16 (a recess has no top light).
5. **The ground moves to the consumer, under ONE law.** `--track-well-recess` is declared ONCE
   ~~(`tokens/on-glass-fg.css`)~~ **[CORRECTED 2026-08-08 — cure round: on `.track-well, .track-ground`
   in `styles/track-well.css`, the COMPOSING element. A `:root` declaration substitutes
   `var(--background)` at `:root` and freezes the page's colour into every host — the law shipped
   BACKWARDS. See §CURE ROUND CURE-1.]** and its value IS the derivation — `oklch(from
   var(--background) calc(l * ~~0.96~~ **0.90**) c h)`. An unregistered custom property substitutes
   at THE DECLARING ELEMENT, so declared on the groove `var(--background)` resolves against the
   consuming host's inherited value: the token is host-relative by construction. Both literal arms
   retire (light `hsl(34 24% 84%)`, dark `hsl(28 14% 26%)` — the dark arm derives free).
   ~~Measured before the rename: page L\* 90.30, shipped rail 86.66, derivation predicts 86.69. The
   law was already there by accident.~~ **[STRUCK 2026-08-08 — cure round. The "predicts 86.69"
   was a CROSS-SPACE arithmetic error: 0.96 scales the OKLCH `l` (0.9865 → 0.9471), not CIE L\*,
   and the derivation actually painted L\* 93.77 — 2.78 ABOVE the route's composited surround
   (L\* 90.99), a recess reading RAISED. The retired light literal `hsl(34 24% 84%)` measures
   L\* 86.66 against `--background`'s L\* 98.30; the factor that reproduces that depth is 0.90
   (L\* 87.08), which is what ships. All figures measured this seat on `/feedback/progress`.]**
6. **THE THIRD COPY OF THE RECESS LAW DIES.** `Timeline.vue:418-425` authored the identical
   top-only inset edge in a better spelling than the spec's — off `--ink-edge` and `--cartoon-ink`
   (warm near-black in BOTH modes, `l` clamped, so no per-mode fork), with the zero-alpha arm as
   `oklch(0 0 0 / 0)` rather than bare `transparent` (the WebKit black-premultiply hole). That
   spelling is **promoted verbatim** into the register and the local copy strikes. One law, one
   place, in the better hand.
7. **The grammar unifies.** `--glass-progress-track-color` (a `<color>`-only grammar enforced by a
   source grep that cannot see a consumer; **0 writers in 7 repos**) dies at birth with no alias.
   `--glass-progress-track-background` takes its place — the sibling's name shape, still a distinct
   property, so a Slider background image and a Progress ground never collide on one inheriting knob.
8. **Both pinned gates amend in the same cut**, per progress's own §4.0 discipline:
   `typed-track-seam.test.ts:42`'s verbatim `--muted-medium` match **retires** (the background IS
   the strike); `track-well-fold.test.ts:19,29` **re-pin** to `.track-well`;
   `timeline.contract.test.ts:404` follows its subject; `gen-component-styles.mjs`'s closure
   predicate re-keys `/\.glass-(?:track-well|value-marks)\b/` → `/\.(?:track-well|glass-value-marks)\b/`.
9. **The FLOW band stays in `glass/`** as the C-1 carve-out: a `plus-lighter` specular sweep IS a
   light channel. It is named `.track-flow` (no prefix) because it *composes* a material rather
   than declaring one — so G-SM3's `.glass-*` clause never fires on it.

---

## §4 · PER-ITEM LEDGER — #86 W-SURFACE-MATERIAL

| id | defect | act | trace |
|---|---|---|---|
| D-1 | `material`/`SurfaceMaterial` re-mints `tier` | `material`, `SurfaceMaterial`, `MATERIAL_TIERS` **deleted, not aliased** | `Surface.vue` 102→60 ln; `surface/index.ts` −2 exports |
| D-2 | 0 external consumers of the axis | 17 demo `material="content"` sites → `tier="quiet"` | 7 demo SFCs |
| D-3 | 8 emitted attributes, ~1.5 readers, `data-tier` collides with the dock's | emitted set → **`{class, style, data-slot, data-surface}`** | `Surface.vue` template; gate G-SM1 asserts the SET |
| D-4 | `deep` clobbers an explicit `tier` **and** the bridge is floating-only | ternary + literal deleted; bridge widened to **all five** `--glass-blur-{tier}` | `resolve.ts`; `deep.css:90-94` |
| D-5 | 3 props silently no-op on a 4th's value | `specularArmed`/`shadowArmed`/`specularStyle` deleted with the props | `Surface.vue` |
| D-6 | `material-roles.css` — a 2nd shadow grammar, 1 completing consumer | **file DELETED** + import struck (C-2) | −23 ln; `card/styles.css` already composes `--card-cast` (#79) |
| D-7 | `data-grain="false"` on every default mount + unscoped `::after` kill | the unscoped rule struck; `grain-overlay.css` **DELETED** (K1) | −88 ln; `--glass-grain-opacity` KEPT (paper.css + dock.css read it directly) |
| D-8 | **no rung declares a radius under `contain: paint`** | five rungs gain `border-radius: var(--radius-ctx)` — zero mint, the LAW-A relay | `ladder.css`; the law stated ONCE above the ladder, not five times |
| D-9 | the dark deep arm has never painted, in either direction | arm moves from bare `.dark` to **`.dark .glass-deep`** | `dark-arm-glass.css` rewritten |
| D-13 | `.glass-material` 18 positions / 0 applications | **16 selector lines struck** across 5 stylesheets + 13 dead citations re-pointed | `material.css` ×9 · `ladder.css` ×2 · `a11y-fallback.css` ×2 · `rim.css` ×1 · `glass-specular-track.css` ×2 |
| D-16 | `--glass-key-direction: 0` while the file's own comment names `-0.375` | **the identity ships**: `0 → -0.375` | `glass-fx.css`; 4 consumers move in lockstep |
| D-17 | the route's prose map is hand-typed against the deleted axis; `interCount: 0` | route re-authored: 5-rung ladder off the ONE axis, the **tier scrubber**, a depth matrix | `demo/stories/display/surface.vue` |
| R-A | resolver shape | **plain function, no composable** — `_shared/surface/resolve.ts`, `surfaceClass()`; 6 importers re-pointed; `resolveSurfaceClass.ts` deleted | #89's move, carried here |
| R-K | the clock | five rungs gain the house **pair** `var(--spring-press-duration) var(--spring-press)` | `--spring-transient` is a phantom; a bare `--spring-press` in a duration slot is invalid |
| C-3 | `shadow` survives as CARD's | `Card.vue` stamps its own `data-shadow`; `grain`/`specular` forwards die | `Card.vue` |

## §5 · PER-ITEM LEDGER — #88 W-PROGRESS-SEAM

| id | defect | act | trace |
|---|---|---|---|
| S1 | size axis inert in five places; 3 undeclared knobs behind literal fallbacks; 16/16/16 under a `SIZES` heading | `size?: "sm"\|"md"\|"lg"` → `data-size` → **8/12/20** on `--progress-rung`, one rung down ≤768px; the three knobs die | `Progress.vue`; story binds the prop, `h-1.5`/`h-6` die |
| S2 | two indeterminate laws, 4s linear, children `display:none`, marks behind a `throw` | ONE law: **`styles/glass/track-flow.css`** — envelope on `--duration-shimmer-fast`, `plus-lighter`, peak α 0.12, floor 0.30·peak. Both gradient arms, both keyframe families, the `> * {display:none}` and the `throw` all strike | new file 107 ln; `Progress.vue` −114 ln of gradient machinery |
| S3 | PRM paints indeterminate as a determinate lie, **twice** (horizontal ramp + `(0,3,0)` vertical half-column) | S3 dies with its cause; PRM now **parks the band mid-sweep at floor alpha** | `track-flow.css` PRM bracket; gate G-PR-PRM-HONEST covers both orientations |
| S4 | travel contradicts canon on both carriers | fill → `transform var(--spring-dock-duration) var(--spring-dock)` (dock peaks 0.97712, monotone — `snappy` peaks 1.03153 and would paint >100% of an asserted quantity). Rim half found ALREADY CURED (§2.3) | `Progress.vue`; gate G-PR-TRAVEL-DOCK |
| S5 | both typed W4 inputs born-dead | `--glass-progress-track-color` dies, no alias; `--glass-progress-track-background` replaces it | §3.7 |
| S6 | the register's only paint declaration is dead in every consumer; two fallback grounds | the background strikes; ONE ground, `--track-well-recess` | §3.4-3.6 |
| S8 | value unnamed/unrounded; `aria-label` defaults to the VALUE | `valueText` via reka's own `:get-value-text`; `modelValue` rounded ≤2dp; `getValueLabel` returns `undefined` so **the name channel never carries the value**; `aria-orientation` deleted (not permitted on the role) | `Progress.vue`; T-VT-1 + T-NAME-1 |
| S9 | lifecycle variant-gated; crescendo reaches 95-100% white | completion is **variant-independent**, one discharge capped at the **0.12** specular ceiling, on `--duration-normal var(--ease-standard)` (an EFFECTS leg — lawful); PRM drops it | `variant` narrows `3 → 2` |
| S10 | the mark register copied a **third** time; two stadium spellings | rim's 31-line local dot recipe **deleted**; rim composes `.glass-value-marks` | `rim/styles.css` |
| ruling 9 | "passed" semantics never painted (a z-index accident) | ONE declared law: `.glass-value-mark[data-consumed] { opacity: 0 }` + one crossfade on the dock pair, set by every composer at `position <= fraction` | `value-marks.css`; rim's `SWALLOW_BAND` + fractional opacity math die |
| ruling 10 | rim composes the well? | **NO** — 6px dots on a 4px band overflow by 1px per cross edge; the register's `overflow: hidden` would clip them. The D-16 record's stated ground (sizing) was FALSE in the file it cited; the ground is restated to the true one | `rim/styles.css` header |
| ruling 2 | the indeterminate door | `indeterminate` prop **deleted**; `modelValue: number \| null`, default `0` | reka types `[Number, null]` and derives `progressState` from nullish; `:69` already translated the boolean INTO null |
| ruling 14 | the demo loop read | re-pointed to `--duration-shimmer-fast`; the **4000ms literal fallback dies with it** | a literal minted BY a strike is a masking fallback the strike created |
| S11 | route lies | `rounded-full` ×2 → `rounded-pill`; the `--viz-fourier` red on a route where red means failure → `--viz-legendre`; steppers 35×40 → `min-h-11 min-w-11` + named | `demo/stories/feedback/progress.vue` |
| types | rim types split across two homes + a duplicate `Orientation` + a zero-content alias | `rim/types.ts` becomes the ONE home; `Orientation` imports from `_shared/axes`; `ScrollProgressRimSegments` inlines | **public-surface break: 1 type export drops** (`ScrollProgressRimSegments`) |

---

## §6 · GATES — SEATS +0, receipt byte-identical

**Nothing minted.** Both lanes' born-RED batteries are component **close-battery** rows (§B.5's
tier-3 acceptance class), folded into files that already exist:

* **#88** — 4 gates + 5 unit cases folded into `tests/styles/typed-track-seam.test.ts`
  (G-PR-INDET-ONE · G-PR-PRM-HONEST · G-PR-TRAVEL-DOCK · G-PR-SEAM-CLOSED; T-SIZE-1 · T-PRM-1 ·
  T-VT-1 · T-NAME-1 · T-MARK-1). **17 landed cases retired/amended** per §4.0, zero new gate files.
* **#86** — 5 gates folded into `tests/components/ui/surface/Surface.test.ts`
  (G-SM1 ONE-AXIS · G-SM2 CLIP-HAS-CORNER · G-SM3 NAMESPACE-HONEST · G-SM4 TIER-ORTHOGONAL ·
  G-SM5 TOKEN-SCOPE-REACHABLE), each with its killing mutation stated in the file.

**THE DETECTOR LESSON, taken twice.** (a) The `--glass-progress-track-color` absence clause fired
on this cut's own PROSE explaining the strike — a source detector must strip comments; it now does,
in every source-reading clause of both batteries. (b) `glass-subtlety.test.ts:599`'s
component-plate hop keyed on the literal `resolveSurfaceClass(`; the relocation would have silently
turned the whole depth walk decorative (over-counting can only make it RED, so a broken hop goes
GREEN). **Re-keyed to follow its moved subject** (⊕²⁵), with the two hop-pins intact.

**T-LIQ-1 deliberately NOT minted** (ruling 1): `variant="liquid"` is alive in paint on this route
(`StorySection.vue:45` is `flex flex-col`, no glass ancestor, so `material.css:66`'s subtree `none`
cannot reach it). A born-RED gate this lane cannot discharge gates the wrong wave.

---

## §7 · VERIFY GATE (verbatim)

```
$ npx vue-tsc --noEmit
(no output) — exit 0

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  7 failed | 154 passed (161)
      Tests  12 failed | 1527 passed | 5 expected fail (1544)

$ node scripts/gate-register.mjs receipt
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
  — BYTE-IDENTICAL to the required receipt. violations:1 is #40's pager sourcePath,
    drift:1 is #65's — the standing foreign state, not this row's to green.

$ npm run demo:dist:build
✓ built in 1.17s   — GREEN

$ node scripts/regen-exports.mjs
REGEN (PUBLISH-driven): exportKeys 66/66  jsSubpaths=60  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none)
  >>> EXACT REPRODUCTION: YES
EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.
```

**12 failed, not 11 — one is this row's, and it is stated rather than greened.**

**The 11 FOREIGN, matching the stated baseline exactly (#40 ×10 + #7 ×1):**
`gate-register` ×3 · `pager-dots/contract` ×4 · `pager-dots/morph` ×1 · `carousel/contract` ×1 ·
`overfit-structure` ×1 (its untracked `useLeadTrail.ts` — offenders `LEAD_TRAIL_TAU_E_S`,
`trailOffset`) = **10 (#40)**; `stacked-url-filter` ×1 = **1 (#7)**.

**The 12th is MINE, MEASURED, and NOT greened — `gate:boot-graph` modulepreload ceiling.**

| step | figure |
|---|---|
| detector | `npx vitest run tests/gates/boot-graph.test.ts` → `eager graph: 61 modulepreloads + 1 entry = 62 files / 476621 B: expected 61 to be less than or equal to 60` |
| rebuild first (per the verify protocol) | `npm run demo:dist:build` ran; the row does **not** clear — it is not staleness |
| baseline measured, not assumed | working-tree copy with **only this row's `src/` + `demo/` files restored to HEAD content**, rebuilt: **60 modulepreloads / 476,289 B** |
| after | **61 / 476,657 B** — **+1 chunk, +368 B** |
| bisected to the file | applying this row's surface group alone → 61; reverting `Surface.vue` alone → **60**. The split chunk is reka's **`Primitive.js`**, hoisted to its own shared chunk once `Surface.vue` stops importing `composables/glass` (the `vSpecular` edge that died with the `specular` prop) |
| cure attempted and rejected | dropping reka `Primitive` from `Surface.vue` as well → still 61. The only way back to 60 is to keep importing a directive the deleted prop no longer uses — the masking-fallback class. **REFUSED** |
| why the ceiling has no room | its own provenance (`boot-graph.test.ts:74-79`) sets it from a MEASURED 56 + headroom; four tier-3 rows have since consumed all four. **Bytes are 476,289 B — 7,573 B BELOW the 483,862 B the ceiling was measured from, and 35,343 B below the byte ceiling.** The binding constraint is a chunk-COUNT proxy on a byte budget that improved |
| act | **the ceiling is NOT moved.** A ratchet datum is never moved by the seat it inconveniences. ROUTED → **#66** (owns the ratchet class, RT-19E precedent), with `BAND-PERF.md §Wave 1 OPEN-P3/P4` named by the gate's own comment as the further cut |

**A pristine `git archive HEAD` build is IMPOSSIBLE in this tree** and that is itself a foreign
finding: HEAD imports `@glass/components/watercolor-dot`, which exists neither on disk nor in git
(`git ls-files src/components/watercolor-dot` → empty) — an uncommitted foreign lane removed the
import from the working tree only. The baseline above is therefore a **restore-my-files-only**
reconstruction, stated as such.

---

## §8 · REFUSED WITH GROUNDS / ROUTED

| item | ground | owner |
|---|---|---|
| delete `styles/glass-specular-track.css` (§3.4) | its premise ("a duplicate `::before` body") is **false on disk** — the file is the PRM + reduced-transparency bracket pair, and the class it guards is now the Button's ONE gleam seat (#80) | **W-GLASS-DEDUP** — re-scope to the brackets' home, not a deletion |
| K2 strike of `material.css:134-146` | C-8 gated it on W-BUTTON's edge landing first; #80 landed by **composing** the ring instead | **W-GLASS-DEDUP / GF-DOCK** |
| `.glass-card` → `.glass-resting` fold ×21 (C-4 material half) | C-4's OTHER half already landed at #79 keyed on `.card`; folding the material half now, mid-band, would re-open a sealed row's paint with no gate between them | **#68 / W-GLASS-DEDUP**, after the band |
| the file-count folds (squircle → ladder, ladder-undershadow → ladder, deep+defined → decorations) and the module-name strips (`glass/glass-{atom,capsule,chip}.css`) | pure file-count cosmetics with **zero defect behind them**; the "22 → 17" arithmetic is against a 22-file tree that is now **30** files | **DIRECTORY-SHAPE** |
| P0-P12 (#86) and π0-π13 (#88) | browser rows — Chromium 150 **and** real `safari-app` 26.4, cells never cross-inferred. `evidence_state=owed` | **#10** |
| π10 DockCrest before/after | **BLOCKS the 8.0.0 adopt**; atlas runs 6.0.0's conic ring today | **atlas tranche** |
| the 6 `--slider-track-bg` writes + `--slider-range-bg`'s 1 (`PlaybackRibbon.vue:232`) | consumer-updates ruling: existence sets the relay, nothing is owed here | **value.js + keyframes.js**, via **#76** |
| slider's `--muted-medium` groove fallback → `--track-well-recess` | a tier-1 terminal is not amendable from this lane | **banked slider terminal** |
| a library-identity fill token clearing ≥3:1 vs `--track-well-recess` | the de-shadcn is the token lane's; the default stays `--primary` (CR 12.52 vs capsule-warm's **1.03** — invisible) | **token lane / PROPORTION** |
| `material.css:66` subtree `none` (~188 dead-glass surfaces) | proven unreachable on `/feedback/progress` (ruling 1) | **W-GLASS-CELL** |
| Tailwind `--radius-full: calc(infinity*1px)` → alias onto `--radius-pill` | Tailwind-first | **W-RADIUS-ROLE** |
| the boot-graph modulepreload ceiling | §7 | **#66** |
| PROPORTION errata: census 61.6% → **56.0%** (39/188 rows are the groove) → 44.0% residual; K23's progress row struck; §5e engine qualifier | disk-verified here | **PROPORTION's owner** |
| `MIGRATION.md` rows for the 8.0.0 breaks | 6 deleted props (`material`/`shadow`/`grain`/`specular` on Surface, `indeterminate` on Progress), 3 deleted type exports (`SurfaceMaterial`, `SurfaceSpecular`, `ScrollProgressRimSegments`), 1 deleted variant (`gradient`), 2 renamed customs. **[AMENDED 2026-08-08 — cure round: the enumerated in-file sites are STRUCK IN PLACE with dated brackets this pass (`MIGRATION.md:143/154/155/159/170/177/602`), so what routes to #76 is the REMAINDER:** (a) **the emitted-class rename** `.glass-track-well` → `.track-well` as a consumer-facing DOM-hook break, plus the net-new `.track-flow`; (b) **`--glass-progress-track-color` DIES AT BIRTH** — it must appear in the 8.0.0 notes as *never usable*, not as a removal, since it shipped with 0 writers in 7 repos and no alias replaces it; (c) **the `DESIGN.md:1189-1330` rows**, which still document the deleted `material` axis, the `gradient` variant and the `.glass-track-well` class against the 7.x tree.]** | **#76 / the publish close** |

---

## §9 · THE FENCE — FINAL MINUS BASELINE

Derived per the ⊕⁶¹ protocol: every file's final hunk-set compared against its §0 baseline
hunk-set; identical ⇒ foreign, not counted. Shared-dirty files reconstructed to their §0 content
(`git archive HEAD` + `git apply --unidiff-zero --include=<file>`) and diffed from there.

| class | files | +/− |
|---|---|---|
| tracked, CLEAN at §0 (this row's in full) | **56** | **+913 / −753** |
| tracked, SHARED-DIRTY at §0 (per-hunk split) | **8** | ~~+282 / −108~~ **+282 / −109** |
| **tracked total** | **64** | ~~+1,195 / −861~~ **+1,195 / −862** |
| new files (untracked, this row's) | **3** | `styles/track-well.css` 61 · `styles/glass/track-flow.css` 107 · `_shared/surface/resolve.ts` 20 = **188** |

Per-hunk split on the eight shared-dirty files:

| file | this row's delta |
|---|---|
| `src/components/slider/Slider.vue` | +1 / −1 (the one class token) |
| `src/styles/glass/rim.css` | +0 / −1 |
| `src/styles/glass/surface-axis.css` | +5 / −3 |
| `src/styles/index.css` | +8 / −1 |
| `src/styles/tokens/property-regs.css` | +4 / −12 |
| `tests/styles/glass-subtlety.test.ts` | +6 / −4 |
| `tests/styles/typed-track-seam.test.ts` | +258 / −43 |
| `src/styles/glass/track-well.css` | DELETED (−44 at §0) |

**TWO FOREIGN-TREE DISCLOSURES, both necessary to the rename and both stated by line:**

1. **`src/styles/glass/track-well.css` was BASELINE-DIRTY and this cut DELETES it.** The foreign §0
   edit it carried is **comment-only**: a consumer list widened from two entries to name Timeline
   as consumer #3. Its semantic content is **preserved verbatim** in the new
   `src/styles/track-well.css` header, which names all three consumers. Nothing of that lane's work
   is lost; the diff is recorded above.
2. **`src/components/slider/styles.css` is an UNTRACKED FOREIGN file** (#40's lane, the ⊕⁶² blind
   spot) and this cut changed **exactly one comment word** in it — `:96`, `.glass-track-well` →
   `.track-well`. Leaving it would have published a citation that is false the moment the register
   renames. `:6` already read `track-well.css` and is untouched. No rule, no declaration, no
   selector in that file was touched.

Files **NOT** this row's, still dirty in the tree at close: **72**.

---

## §10 · SUBSTITUTIONS AND DIVERGENCES, RECORDED NOT AVERAGED

1. **`springPreset("dock")` is {0.30, 0.88}, not {0.35, 0.82}.** Read off
   `springPresets.ts:84-87` this seat. Both the spec's figure and the remembered one are stale; the
   one citation site states the disk value with its provenance.
2. **The §3.6 deep-token hoist is SUBSTITUTED, not executed.** Hoisting to `:root` re-creates the
   documented freeze bug (`--glass-depth` eager-substitutes at its declaring element, so at `:root`
   it computes the `initial-value` 1 and every deep surface paints the ceiling). The same defect —
   the dark arm has never painted — is cured by declaring the arm at `.dark .glass-deep`, a plain
   `.dark` ancestor, where its inputs live.
3. **The recess-ink spelling is the Timeline's, not the spec's.** The spec named α 0.16; the
   Timeline already spelled that same law off `--ink-edge` with the WebKit-safe zero-alpha arm.
   The better hand won and the third copy died.
4. **`aria-label` becomes absent rather than fabricated.** reka's `getValueLabel` default writes
   `"N%"` — the value in the name channel, announced twice. The library now names nothing and the
   consumer names its bar; the demo names all of its own. An unnamed progressbar is honestly
   unnamed.
5. **`variant="liquid"` is ALIVE on this route** and S5 dies as a lane defect (ruling 1, re-verified
   this seat: `StorySection.vue:45` carries no glass class).
6. **The 12th verify failure is stated, not absorbed.** §7.

---

## §11 · CURE ROUND (2026-08-08)

**Seat:** cure · **modelId: `claude-opus-5[1m]`** (asserted first) · shared dirty tree, driver commits.
All eight driver-ratified cures executed. Per-cure: the detector, the before, the after.

### CURE-8688-1 (CRITICAL, A-D1) — the recess law shipped BACKWARDS

**The defect, measured before any byte.** An unregistered custom property substitutes its `var()`
references **at the element it is DECLARED on**; the resulting token stream is what inherits. The
`:root` declaration therefore resolved `var(--background)` once, against the page, and froze that
one colour into every host.

| probe (`/feedback/progress`, Chromium 150, dev server, light) | BEFORE | AFTER |
|---|---|---|
| `:root` computed `--track-well-recess` | `oklch(from light-dark(hsl(40 30% 98%), hsl(24 9% 4%)) calc(l * 0.96) c h)` | **absent** (not declared there) |
| `.progress-rail` computed | *byte-identical to `:root`'s* | `oklch(from light-dark(…) calc(l * 0.9) c h)` |
| nested host with `--background: hsl(210 60% 30%)`, its `.track-well` child | *still the page string* → painted `oklch(0.947071 …)` **L\* 93.77** | `oklch(from hsl(210 60% 30%) calc(l * 0.9) c h)` → painted `oklch(0.369573 0.0919798 251.094)` — **a dark blue, the host's own** |
| same host, the rim's `__track` | *still the page string* | same host-derived value (via `.track-ground`) |
| rail groove vs its composited surround | **93.77 vs 90.99 → +2.78 ABOVE — reads RAISED** | **87.08 vs 91.09 → −4.01 BELOW — reads RECESSED** |
| **π10 DockCrest** (rim on a `GlassDock`, the 8.0.0 adopt blocker) | rim **L\* 93.77** on a crest of **L\* 89.96** → **+3.81 ABOVE its own surround** | rim **L\* 87.08** on the same **L\* 89.96** crest → **−2.88 BELOW** |
| dark rail vs its composited surround | 2.51 vs 8.66 → −6.15 | 1.98 vs 7.91 → −5.93 (dark was never the defect; it still derives free from the ONE factor) |

Pixels sampled off viewport screenshots (`node` + `pngjs`, sRGB → CIE L\*); computed values off
`getComputedStyle`. Light `--background` = `hsl(40 30% 98%)` = L\* 98.30, OKLCH `l` 0.986532.

**The cure.**
* `src/styles/track-well.css:37-70` — the declaration moves ONTO the composing element:
  `.track-well, .track-ground { --track-well-recess: oklch(from var(--background) calc(l * 0.9) c h); }`
  `.track-ground` is the ground WITHOUT the groove shape — the seam for a groove-adjacent surface
  that cannot take `overflow: hidden`. It exists because the rim's stadium track is exactly that
  case (ruling 10) and the alternative was a SECOND copy of the derivation in the rim, which is the
  sin §3.6 exists to have killed. ONE declaration, two selectors, two shapes.
* **The factor RE-TUNED 0.96 → 0.90.** `0.96` scales OKLCH `l`, and `0.9865 × 0.96 = 0.9471`
  paints **L\* 93.77** — above the composited surround on both the page (L\* 90.99) and the dock
  crest (L\* 89.96). `0.90` paints **L\* 87.08**, which is the depth the retired light literal
  `hsl(34 24% 84%)` (L\* 86.66) already had against `--background`. Dark lands L\* 1.98 against an
  L\* 7.91 surround, so ONE factor serves both modes and no per-mode fork returns.
* `src/components/scroll-progress-rim/ScrollProgressRim.vue:80` — `__track` composes `track-ground`.
* **Three false-law comment sites corrected**: `tokens/on-glass-fg.css:38-48` (the whole
  "substitutes at point of USE" paragraph + the declaration, struck — the file now states WHY it
  cannot live there), `styles/track-well.css:19-25`, `tokens/dark-arm.css:292-293`.
* **G-PR-SEAM-CLOSED re-pointed** (`tests/styles/typed-track-seam.test.ts:317-349`): it now matches
  the `.track-well, .track-ground` SELECTOR, walks **every `.css` under `src/styles` recursively**
  and asserts the `--track-well-recess\s*:` count is **1** and that the one file is
  `src/styles/track-well.css` — so a dark-arm re-fork REDs — plus that the token layer carries the
  prose and none of the law (comments stripped), and that the rim composes the ground class.
* `RECORD §3.5`'s "derivation predicts 86.69" **struck with a dated bracket** (cross-space
  arithmetic: 0.96 scaled OKLCH `l`, not CIE L\*; the derivation actually painted 93.77).

### CURE-8688-2 (HIGH, B-1) — the export seam

| site | before | after |
|---|---|---|
| `scripts/gen-component-styles.mjs:12` | `/\.(?:track-well\|glass-value-marks)\b/` | `/\.(?:track-well\|track-flow\|glass-value-marks)\b/` |
| `tests/styles/typed-track-seam.test.ts:157-162` | `toContain` ×2, `toHaveLength(3)` | `+ toContain('./styles/glass/track-flow.css')`, `toHaveLength(4)` |
| `scripts/lib/subpath-policy.mjs:172-182` | named `.glass-track-well`; claimed "in that exact order" | names all three emitted classes; states the **PARTITION** invariant (every partial folded, SFC bundle LAST; relative order among disjoint-selector partials is a build artifact) |

Predicate proof (comments stripped, as the generator does): `styles/track-well.css` **true** ·
`styles/glass/track-flow.css` **true** · `styles/glass/value-marks.css` **true** ·
`styles/glass/ladder.css` **false** · `tokens/on-glass-fg.css` **false**.

**DIST STALENESS, RECORDED.** `dist/component-styles.css` (mtime **Aug 6 11:50**, pre-cut) still
reads `@import "./styles/glass/track-well.css";` — the **deleted** path — and folds only two
partials. It masks the regression, and the manifest gate SELF-SKIPS on it by its own staleness
guard (`manifest.mtimeMs < generator.mtimeMs`), so the arm is honestly unproven at this cut. The
library build that would refresh it is **#40-blocked**.

### CURE-8688-3 (B-2) — Timeline COMPOSES (driver ruling taken)

**Born-RED transcript, widened regex against the PRE-CURE Timeline bytes** (scratch copy
`Timeline.precure.vue`, comments stripped exactly as the gate does):

```
PRE-CURE Timeline.vue bytes:
  OLD regex (indeterminate|sweep|rise)      match: null                 → gate GREEN (blind)
  NEW regex (indeterminate|sweep|rise|flow) match: "@keyframes tl-flow" → gate RED (born-RED, bites)
```

| site | act |
|---|---|
| `Timeline.vue:307-317` | the indeterminate span binds `track-flow`; the active span's `.tl__fill` binds it on its own box |
| `Timeline.vue:513-550` (pre-cure) | the local band + `@keyframes tl-flow` + `--tl-flow-peak`/`--tl-flow-floor` **deleted** — 38 lines |
| `Timeline.vue:513-534` (post-cure) | the ONE local override survives: `.tl .track-flow { --track-flow-peak: var(--fill-selected); }`; the floor is the register's and is not restated |
| `Timeline.vue:708-716` | the PRM arm for the band **deleted** — the register's own bracket parks it |
| `typed-track-seam.test.ts:189-207` | G-PR-INDET-ONE regex widened to `(indeterminate\|sweep\|rise\|flow)` + `toContain("track-flow")` so absence alone cannot satisfy it |

Live on `/data/timeline`: `.tl__fill.track-flow` → `animation-name: track-flow`, `3s`,
`mix-blend-mode: plus-lighter`, `background-size: 45% 100%`. Override proven live — writing
`--fill-selected: 0.42` on `.tl` moved the resolved peak `0.12 → 0.42` and the painted gradient
with it, so the unlayered scoped rule beats the register's `@layer components` default.

### CURE-8688-4 (A-D2) — deep must THICKEN

`--glass-blur-floating-radius` is **20px** and the old depth-1 endpoint `--glass-blur-deep-radius`
was **16px**, so the LERP ran DOWNWARD. Resolved, all five rungs (measured live on
`/display/surface` after; before figures are the retired formula `20 + (16−20)·depth` evaluated at
the shipped grades content 0.35 / popover 0.7 / menu 1):

| rung | plain | deep BEFORE | deep AFTER |
|---|---|---|---|
| wash | 10px | 18.6px | **11.75px** |
| quiet | 14px | 18.6px | **15.75px** |
| resting | 16px | 18.6px | **17.75px** |
| floating | 20px | **17.2px — THINNER than plain** | **23.5px** |
| overlay | 22px | **16.0px — THINNER than plain** | **27px** |

Before: DECREASING with prominence (18.6 ≥ 18.6 ≥ 18.6 > 17.2 > 16.0). After: strictly increasing,
and `deep > plain` on every rung. `.glass-card.glass-deep` → 17.75px (the resting default it
paints). Live cells on the route: `glass-quiet glass-deep` 15.75 · `glass-floating glass-deep` 23.5
· `glass-overlay glass-deep` 27, saturate 1.605 / 1.71 / 1.8.

* `tokens/glass-deep.css:66` — `--glass-blur-deep-radius: 16px` **RETIRED, no alias**, replaced by
  `--glass-blur-deep-boost: 5px` — the +5px delta the family always encoded (16 vs the 11px calm
  floating rung it was written against). An absolute endpoint cannot say "thicker than this rung";
  a boost can, and it survives any calm-ladder retune.
* `glass/deep.css:80-87` — `calc((var(--glass-blur-tier-radius) + var(--glass-blur-deep-boost) * var(--glass-depth)) * var(--glass-level))`.
* `glass/deep.css:36-45` — `:where(.glass-deep) { --glass-blur-tier-radius: var(--glass-blur-resting-radius); }`,
  source-ordered BEFORE the tier map so any rung wins, and so `.glass-card` (which paints
  `--glass-blur-resting`) lands right without being enumerated, and so a `.glass-deep` on a non-rung
  host cannot compute an invalid radius and take the whole bridge down.
* `glass/deep.css:113-155` — the tier map splits 3 rules → 6, each rung publishing its OWN
  `--glass-blur-tier-radius` beside its depth grade. **This was the missing half**: the recipe read
  ONE hard-coded rung's radius, so four of five rungs graded a depth and then painted a blur derived
  from somebody else's base.
* `deep.css:97-105`'s **impossible arithmetic fixed** — it claimed "popover ~14px, content ~13px, a
  deep overlay reaches the full 16px ceiling, thickness tracks prominence": every figure was wrong
  and the ordering was inverted (16px was the LERP's FLOOR, reached at depth 1). Same for
  `glass-deep.css`'s header verdict block and its three grade comments.
* **G-SM4 extended to a NUMERIC deep ≥ tier assertion**
  (`tests/components/ui/surface/Surface.test.ts:161-213`): it reads the shipped boost, the three
  named grades and the five calm radii off disk, asserts each rung publishes
  `--glass-blur-tier-radius: var(--glass-blur-<tier>-radius)`, then asserts
  `deep(tier) > plain(tier)` on all five, that the five deeps are sorted ascending, and that they
  equal `[11.75, 15.75, 17.75, 23.5, 27]`.
* `tests/styles/glass-subtlety.test.ts:226-234` amended — the retired token's assertion becomes the
  boost's, plus `--glass-blur-deep-radius` must be **undefined**.

### CURE-8688-5 (A-D3) — DELETE the dead stamps

**11 stamps deleted, not 12** — the order's figure counted one site that does not exist on disk.
`[CORRECTION 2026-08-08: the cure order says "the 12 dead `data-material` stamps"; the enumerated
list is tooltip ×1 · dialog ×1 · popover ×3 · select ×1 · sheet ×1 · dock ×1 · demo
`glass-material.vue` ×2 · `DockStage` ×1 = **11**, and a repo-wide grep after the cut leaves exactly
the music-staff stamp+reader pair plus three comment citations of the deleted grammar. The list is
right; the count was not.]`

`TooltipContent.vue:61` · `DialogContent.vue:194` · `PopoverContent.vue:77/97/118` ·
`SelectContent.vue:83` · `SheetContent.vue:297` · `GlassDock.vue:338` ·
`demo/stories/substrates/glass-material.vue:182/196` · `demo/stories/dock/_frame/DockStage.vue:93`.
`MusicStaff.vue:163` + `music-staff/styles.css:62` — the one live stamp+reader pair — **kept**.

One READER of a deleted stamp had to follow: `tests/components/custom/dock/GlassDock.vt-names.test.ts:30-37`
asserted `data-material === "functional"` on every dock. Amended to assert what the case actually
needs (two docks mounted) plus the attribute's absence.

### CURE-8688-6 (A-D11/B-3) — **BRANCH: EXECUTE J-9** (the fallback route NOT taken)

J-9's clause is fully specified — "rim consumes ≥1 `--rainbow-*` rung ∧ width < 4px" — and both
halves are register-composition work inside #88's own lane idiom (stop re-forking a spectrum, stop
re-forking a ground). Nothing in it needed design adjudication, so the route branch is not taken.

| site | before | after |
|---|---|---|
| `ScrollProgressRim.vue:7-24` | six hard-coded `--section-color-{0,5,4,3,2,7}` indices — the DEMO's per-route identity scale, **0 `--rainbow-*` consumers** | the canonical `--rainbow-{red,orange,yellow,green,blue,indigo,violet}` family in ROYGBIV order — the rim is the register's **third** consumer beside `.btn-rainbow` and the metal sweep |
| `rim/styles.css:60` | `var(--section-color-7)` single-stop fallback | `var(--rainbow-violet)` |
| `rim/styles.css:25` | `--scroll-progress-rim-width: 4px` | **3px** |
| `rim/styles.css:10-12` | "6px dots on a 4px band overflow by 1px per cross edge" | 3px / 1.5px — the ruling-10 ground restated at the shipped figure |

**Measured live** (`/feedback/progress`, the dock rim): consumed rungs resolve
`--rainbow-red oklch(0.636 0.21 25.5)` → `--rainbow-violet oklch(0.684 0.25 327.9)` across seven
stops; token `--scroll-progress-rim-width: 3px`, **measured track `getBoundingClientRect().height`
= 3px**. J-9 **DISCHARGED**; #74 W-RIM-RAINBOW lands with this cut.

Gate folded in beside the lane's others, **zero new files**
(`typed-track-seam.test.ts:351-367`): ≥1 `var(--rainbow-*)` in the rim, **no** `--section-color-`
in either rim file, and the declared width parsed and asserted `< 4`.

### CURE-8688-7 (records)

* **`MIGRATION.md` struck in place, dated `[CORRECTION 2026-08-08: …]`, 7 sites** (the order named
  6; `:155`'s "retained" row named `--progress-track-on-glass`, which retires with the grammar it
  backed, so it could not be left standing): `:143` the emitted-class rename · `:154` the
  born-dead `--glass-progress-track-color` → `--glass-progress-track-background` · `:155` the
  retired fallback · `:159` the "gradient is invalid (color grammar only)" prose · `:170` the added
  classes (+`.track-flow`) · `:177` the manifest's fold list + emitted names · `:602` the
  `variant="default|gradient|liquid"` offer against a deleted variant.
* **`RECORD:275`'s #76 route row AMENDED** — the in-file sites are struck this pass, so what routes
  is the REMAINDER: (a) the emitted-class rename as a consumer-facing DOM-hook break plus the
  net-new `.track-flow`; (b) `--glass-progress-track-color` must appear in the 8.0.0 notes as
  **never usable**, not as a removal; (c) the `DESIGN.md:1189-1330` rows, still documenting the
  deleted `material` axis, the `gradient` variant and `.glass-track-well`.
* **Fence arithmetic corrected**: `RECORD:288-289` shared-dirty `+282 / −108` → **`+282 / −109`**,
  tracked total `+1,195 / −861` → **`+1,195 / −862`**; `PASTE-BLOCKS.md:147` follows.
* **`demo/stories/feedback/progress.vue:209-219`** — the two liquid Progress instances gain
  `aria-label`s ("Liquid fill, default tint" / "Liquid fill, legendre tint"), making `RECORD:337`'s
  "the demo names all of its own" TRUE rather than struck.

### CURE-8688-8 (sweep)

| item | act |
|---|---|
| `scripts/safari-probe.mjs:17` | census regex matched `glass-track-well`, which no longer exists → `/(?:glass-(wash\|…\|control-edge)\|\btrack-well\b)/`, so the π census counts the renamed groove |
| `demo/stories/manifest.ts:587` | "Four semantic material roles, three orthogonal decorations, and the deep, grain, and specular facilities" — every noun deleted at this cut → re-authored to the shipped shape (one 5-rung prominence axis, the glass/veil/opaque decoration, the depth knob) |
| `demo/stories/manifest.ts:901` | named the deleted `gradient` presentation → re-authored (three size rungs, the null-valued indeterminate flow band, vertical + liquid) |
| the mangled comment sites | **12 repaired, not 8** — the find/replace damage ran wider than the order's list: `glass-specular-track.css:6/11/19/26` · `composables/glass/index.ts:2` · `vSpecular.ts:6/30` · `useSpecularTracking.ts:9-10` · `a11y-fallback.css:79` · `property-regs-specular.css:8/53` · `utilities/base.css:23`. Repo-wide grep for `the the ` / `group group` / `single the ` / `any the ` now returns **zero** |
| the PRM vertical arm | `track-flow.css:100-118`. The vertical arm sets `animation-name` at **(0,2,0)**; the PRM bracket set `animation: none` at **(0,1,0)** and a media query adds no specificity — so the SHORTHAND's `animation-name` leg LOST, and the vertical band kept sweeping under reduce while the horizontal one parked. The bracket now names **both** selectors at equal specificity |
| `Surface.vue:50` `deepArmed` | **DROPPED.** It was the fourth silent JS gate of the same class the row deleted three of: `[data-surface="opaque"]` sets `--glass-level: 0` (so the deep composition resolves `blur(0)`) AND `backdrop-filter: none` at the element, and `[data-surface="veil"]` paints its own `--veil-clarity` off `--glass-blur-quiet-radius`, which never reads a bridged rung token. Both withhold the depth **in paint**. G-SM4's fourth case re-pointed from the JS gate to the two cascade sites, plus `deepArmed` must be absent from the source |

### §11 VERIFY (verbatim, dist-demo rebuilt FIRST)

```
$ npm run demo:dist:build
✓ built in 1.53s   — GREEN

$ npx vue-tsc --noEmit
(no output) — exit 0

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  7 failed | 154 passed (161)
      Tests  12 failed | 1529 passed | 5 expected fail (1546)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:1
  — BYTE-IDENTICAL to the required receipt.

$ node scripts/regen-exports.mjs
REGEN (PUBLISH-driven): exportKeys 66/66  jsSubpaths=60  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none)
  >>> EXACT REPRODUCTION: YES
EXIT 0 — fail-closed PASS + fidelity PASS + regen exact.
```

**11 FOREIGN, unchanged from §7's stated baseline** (#40 ×10 — `gate-register` ×3, `pager-dots`
×5, `carousel` ×1, `overfit-structure` ×1; #7 ×1 — `stacked-url-filter`). **The 12th is the same
`gate:boot-graph` modulepreload ceiling, still 61 vs 60, still NOT greened** — the cure round moved
its bytes `476,657 B → 476,562 B` (−95 B) and the chunk count not at all. It stays **ROUTED → #66**.

**Lane suites, N/N per file** (all GREEN):

| file | result |
|---|---|
| `tests/styles/typed-track-seam.test.ts` | **30/30** |
| `tests/styles/track-well-fold.test.ts` | **3/3** |
| `tests/styles/glass-subtlety.test.ts` | **36/36** |
| `tests/components/ui/progress/Progress.test.ts` | **12/12** |
| `tests/components/ui/surface/Surface.test.ts` | **24/24** |
| `tests/components/custom/scroll-progress-rim/ScrollProgressRim.test.ts` | **8/8** |
| `tests/components/custom/timeline/timeline.contract.test.ts` | **22/22** |
| `tests/components/custom/timeline/timeline.partition.test.ts` | **15/15** |
| `tests/components/slider.contract.test.ts` | **7/7** |
| `tests/components/custom/dock/GlassDock.vt-names.test.ts` | **2/2** |
| `tests/components/popover.contract.test.ts` · `tooltip` · `select` · `music-staff` | **8/8 · 7/7 · 6/6 · 15/15** |
| `tests/components/custom/**` (whole tree) | **416/416** (50 files) |

Register gates: `tests/gates/orphan-css-partial.test.ts` **7/7** ·
`tests/gates/token-hygiene.test.ts` **4/4** · `tests/gates/gate-register.test.ts` **17/20**
(the 3 are #40's, the standing foreign state).

**Outside the named battery, stated not hidden:** `tests/public-surface.spec.ts` is **81/83**. Both
failures are the SAME dist-staleness + foreign-tree state recorded above and neither is this cure
round's: (a) the lock still carries `embla-carousel` / `embla-carousel-vue` while a foreign lane's
uncommitted `package.json` edit removes them from `peerDependencies`; (b) the built-artifact
closure compares `src` against a **stale `dist/styles/**`** whose diff spans at least five lanes
(`carousel/styles.css`, `deck/styles/*`, `control-{bit,edge}.css`, `mark.css`, `overlay-plate.css`,
`card-scroll.css`, `field-surfaces.css`) as well as this cut's `track-well.css` move and
`track-flow.css` mint. The library build that refreshes it is #40-blocked.
