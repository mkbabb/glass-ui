# BK #26 · W-SPRING-RETUNE — THE ONE SPRING AUTHORITY — DESIGN SPEC OF RECORD

**seat model: `claude-fable-5`** (independent design seat, owner-ordered parallel prototyping) ·
**HEAD `f7e2d7b7`** · **DOC-SIDE ONLY — zero `src`/`tests` bytes authored; this file and its
`preview/` card are the wave's entire output.** Implementation opens when the tier does; every
`src` path below is an instruction to that seat, not an edit made here.

**Sources consumed in full:** TERMINAL-ROSTER row 26 (`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:176`)
· WAVES:577 (W-SPRING-RETUNE) · MOTION-CANON §0/§1/§7 · IOS27 W-1
(`docs/tranches/IOS27-MICRO/FINAL/FINAL.md:24-31`) · CURES CF-1≡X3 (`CURES.md:17,36`) + K-4
(`CURES.md:125`) · C-4 headline (DESIGN-NOW DC-6) + C-5 name-grave (TR SE-2, DESIGN-NOW `:601`)
· U-39 clock-fence arm (TR:176 ⊕⁴) · MOMENTUM-CENSUS §4 (`execution/2026-08-03-momentum-census/MOMENTUM-CENSUS.md:143-159`)
· BK cursor ⊕¹¹–⊕²³ · disk truth re-read this seat (every figure below carries its site).

**DesignSync state, recorded honestly:** `list_projects` this seat returns ONE writable project
("CSP Solver — Pencil UI" — unrelated). No glass-ui design-system project exists; minting one
from an independent parallel seat while row #22 runs its own would be the duplication disease.
The design artifact banks doc-side beside this spec (`preview/springs.html`, self-contained,
theme-aware, the six curves computed from the table's own arithmetic) — the row-91 precedent
(records in-repo at `execution/2026-08-03-row91-design/`). A remote project, if wanted, is a
lead-level act at the tier open.

---

## §0 · CHARTER AND JURISDICTION

This wave makes glass-ui's spring register a single, honest, six-row authority. Its
jurisdiction is exactly: the preset table, the generators that emit from it, the tokens they
emit, every consumer of a doomed name, and the clock each spring rides. It does NOT own reveal
geometry (#89), the engagement ladder (#27), material tokens (#22/#68), or dock component files
(#47). One owner per file per cut; every boundary is keyed in §8.

**The three laws this spec is built on** (cited, never restated — MOTION-CANON §0):

- **LAW 0 (overshoot visibility):** a row's peak ships iff `M = exp(−ζπ/√(1−ζ²)) > B`, the
  settle band. There is no tiny-rebound region — a spring bounces visibly (ζ ≤ 0.62), lands
  dead (ζ ≥ 0.78), or ships a late tick, the worst read of the three.
- **LAW 0b (amplitude band):** the settle band is a property of the job's amplitude —
  small-amplitude rows generate over `B = 2%`, large-amplitude rows over `B = 0.5%`.
- **EXIT ASYMMETRY (§7):** `EXIT = 0.6 × ENTRY`, floored 120 ms, ceilinged 250 ms, fade-led,
  bezier, never a spring — except a gesture-released exit, which is a spring inheriting the
  throw.

---

## §1 · THE TABLE — eight rows become six

The design decision of record. Names are the six ruled names (TR#26 clause ii; the `transient`
name-grave holds per C-5 — that name appears in this spec only as a grave marker):

| row | response | ζ | band | predicted settle | predicted peak | THE ONE JOB |
|---|---|---|---|---|---|---|
| `press` | 0.20 | 0.80 | 0.02 | 0.12 s | monotone | the touch answer — hover glide, tap squish, release, end-stop return |
| `present` | 0.22 | 1.00 | 0.02 | 0.20 s | monotone | the anchored materialization — every overlay/menu/plate/orb birth |
| `dock` | **0.30** | **0.88** | 0.02 | 0.21 s | monotone | the coordinated travel — member FLIP, selection lens, indicator glide |
| `panel` | 0.40 | 0.71 | **0.005** | 0.45 s | **+4.2% mid-clock (≈63% — see the correction below)** | the fired deploy — the long axis of an anisotropic stroke, the extent morph |
| `bloom` | 0.42 | 0.90 | **0.005** | 0.37 s | monotone | the room-sized growth — a surface expanding to fill a sheet or a screen |
| `world` | **0.48** | 1.00 | **0.005** | 0.57 s | monotone | the world's recession — under-layer travel on recede/recover, scroll choreography |

Every settle/peak figure above is a PREDICTION the generator confirms or refutes — the solver
already reproduces the shipped generator (MOTION-CANON §0 validation: dock 0.219 s vs file
0.22 s ✓, gentle 0.761 s vs 0.76 s ✓, orb-drop 0.204 s vs 0.2 s ✓; re-solved independently
this seat: press 0.120 · present 0.205 · dock 0.215 · panel 0.447/+4.1% · bloom 0.368 · world
0.570 · dock-at-disk 0.218 · gentle-at-disk 0.762 — every cell inside the canon's brackets).
**One correction of record, stated not laundered:** the canon's "peak at 53% of clock" for
`panel` does not survive re-derivation — the analytic first peak is `t = π/ω_d ≈ 0.284 s`,
≈ 63% of the 0.45 s clock (this seat's numeric solve agrees). Still a MID-clock rebound, still
the cure for the late tick; the generator's emission is the figure of record and the mirror
prints it, never the prose. Exactly one row rebounds,
and it is the fired deploy: the measured corpus ceiling is +4.7% on a clip edge; `bouncy`'s
+9.5% sat above the entire corpus — our error, not the exemplars'.

**Per-row dispositions:**

- **`press` — pair unchanged, register text struck (C-4, the one-row headline).** At ζ = 0.80,
  M = 1.5% < B = 2%: the "subtle rebound" at `springPresets.ts:120` and the "tiny alive
  rebound" at `:50-51` are lies the table's own emission refutes (`scheme-spring.css:37`
  documents `+0.0%`). Fix = delete the claim, never the damping. A press's liveliness is the
  volume-preserving squish and `press-drain` (55/120 ms, shipped in `engageEnvelopes.ts:19,60`)
  — the light, not a geometry bounce.
- **`present` — renamed from `orb-drop` (owner-reversible in one word), absorbs the entrance
  job.** `orb-drop` has zero consumers beyond its own emission (3 hits, all register/manifest);
  its curve is the corpus's strongest agreement (two independent measurements at ≈0.22,
  ζ ≈ 0.9–1.0: front-loaded attack, monotone decay, dead landing). The `transient` grave holds.
- **`dock` — RETUNED (0.35, 0.82) → (0.30, 0.88).** The ✦ roster byte is quoted and
  adjudicated against: disk at HEAD reads `response: 0.35, dampingFraction: 0.82`
  (`springPresets.ts:110-111` — verified this seat; never trust a remembered 0.30). Three
  independent brackets — fusion 250–350 ms (0.30–0.35, ζ 0.85–1.0), eyeglass lens 150–250 ms
  (≈0.30, ζ ≈ 0.85), pulldown pill 300–400 ms (≈0.35, ζ 0.9–1.0) — and the shipped ζ 0.82 sits
  below every one. New pair: response at the measurement centre, damping inside all three. Net
  clock 0.22 s → 0.21 s: faster attack, deader landing, same money. `DOCK_SPRING`
  (`dock/constants.ts:12-13`) derives via `springPreset("dock")` — zero dock-file edits.
  This supersedes IOS27 W-1's landed 0.30→0.35 with measurement grounds; #61's T1/T9 doc rows
  hand-true to THIS wave's shipped values.
- **`panel` — pair unchanged, band → 0.5%, absorbs `bouncy`'s surviving riders.** The band
  change moves the emitted clock 0.38 s → 0.45 s against the measured 475 ms and the peak from
  63% to 53% of clock — the mid-clock rebound the frames show, killing the late tick.
- **`bloom` — NEW.** The one empty cell in (response, ζ) space: long response AND high damping.
  Music-sheet measured ~350–400 ms rise, no visible overshoot at 10 fps. Without it, `panel`
  puts 38 px of wobble on a room-sized plate. First rider named in §4 (G-SPRING-ONE-JOB
  forbids a riderless row from birth).
- **`world` — renamed from `gentle`, retuned 0.82 → 0.48, ζ stays exactly 1.00.** `gentle`
  named a tone; `world` names a job a gate can check. Its riders are all substrate motion
  (`scroll-choreography.css`, `useScrollScene.ts`) — the exemplar backdrop recede measures
  ~500–600 ms front-loaded; 0.48 at ζ 1.0 predicts 0.57 s, inside the band; the shipped 0.82
  predicted 0.761 s, outside it. The ζ = 1.0 fence now has a reason: a world that overshoots
  reads as an earthquake.

**Register comment strings** (the ONE string each doc-table and the mirror derive from; no
numerals beyond what the emission verifies):

```
press   — "A responsive press that lands dead. The rebound is the squish, and the
           light is the acknowledgement."
present — "The anchored materialization — a menu, plate, toast, or orb born from its
           anchor: front-loaded attack, monotone decay, dead landing."
dock    — "The coordinated travel — member FLIP, the selection lens, indicator glide:
           fast attack, dead landing."
panel   — "The fired deploy — the long axis of an anisotropic stroke, the extent
           morph; the one row whose rebound is intrinsic, arriving mid-clock."
bloom   — "The room-sized growth — a surface expanding to fill a sheet or a screen:
           big, patient, dead-landing."
world   — "The world's recession — under-layer travel and scroll choreography,
           critically damped; an overshooting world reads as an earthquake."
```

**Type surface** (`springPresets.ts`):

```ts
export type SpringPresetName = "press" | "present" | "dock" | "panel" | "bloom" | "world";
export interface SpringPresetRow {
    readonly name: SpringPresetName;
    readonly response: number;
    readonly dampingFraction: number;
    /** LAW 0b — the settle band the emitted linear() and -settle clock normalize over. */
    readonly settleBand: 0.02 | 0.005;
    readonly comment: string;
}
```

---

## §2 · THE EXCEPTION LEDGER — per-primitive registers, closed and named

The ONE-authority law admits exactly one legal out-of-table form: a documented per-primitive
register (the `springPresets.ts:142-147` postscript seam). This wave formalizes that postscript
into a closed ledger; a new entry requires a design-seat ruling, never a drive-by literal.

| entry | pair | grounds |
|---|---|---|
| ScrubberTimeline head/fill/press legs | local, documented | pre-existing seam, unchanged |
| blob `onPinchSnap` pulse | ω18 / ζ0.35 | an impulse response, not a transition register; kept with the spring authority by DESIGN-NOW §gf-blob (`:100,:148`) |
| pager worm lead + trail | 0.68 / ζ0.64 · τ 0.27 s | colocated with its sole consumer at §5's strike; a rAF integrator under the keyframes-free fence; retune (if any) is #39/#47's design cell WITH capture, never this cut's |

Everything else with a `(response, ζ)` outside the table is a defect the clock-fence arm (§6)
or the register grep (§7) catches.

---

## §3 · THE EXECUTION SEQUENCE — six acts, delete-first

**Act 0 — CF-1≡X3 delete-first (adopted clause i).** Land #18's `completion-seal` delete
BEFORE the table cut, so `bouncy`'s only component rider dies free: delete
`src/components/completion-seal/` whole (CompletionSeal.vue · composables · constants.ts ·
styles.css · index.ts · README.md), its `@property` rows in
`tokens/property-regs-specular.css:~70-85` (the seal-scoped `--seal-*` registers — verify
scope by grep before the cut), its manifest/story/test references, and its export rows. The
relay is #18's mechanics, cited not restated: completion-seal → atlas (`atlas completion.ts` +
`DashboardHero.vue`; TR#18 ⊕⁴, REQUIRED class). Corrected arithmetic rides the adoption:
scroll-progress-rim and configurator SURVIVE at terminal, so `snappy`'s re-home is ~10 site
classes, not 8.

**Act 1 — the table cut** (`src/composables/motion/spring/springPresets.ts`). Six rows of §1,
`settleBand` field, the comment strings verbatim, the §2 exception ledger as the postscript.
Clean break: no legacy names, no aliases, no deprecation shims.

**Act 2 — the generators.**

- `scripts/regen-spring-tokens.mjs` + `springProjection.ts`: feed `settleBand` to BOTH the
  `linear()` normalization horizon and the numeric `-settle` solve (the `|1−x|` last-exit band
  becomes the row's own, not the 0.02 constant), preserving curve/clock parity by
  construction.
- Emit, per row, alongside the existing `-settle`/`-duration` pair, the exit reader
  (MOTION-CANON §7, with the RULE's floor/ceiling made explicit in the generator — the canon's
  implementation line omits the clamp its own rule states; this spec rules the clamp IN):

  ```css
  --spring-<name>-exit-duration:
      calc(clamp(0.12s, var(--spring-<name>-settle) * 0.6, 0.25s) * var(--motion-tempo));
  ```

  Resolved at tempo 1: press 0.12 s · present 0.12 s · dock 0.126 s · panel 0.25 s (ceilinged
  from 0.27) · bloom 0.222 s · world 0.25 s (ceilinged from 0.342) — every exit proportionate
  to its own entry, the 0.15 s one-size literal dead.
- Re-run → `scheme-spring.css` re-emits: 6 curves, 6 `-settle`, 6 `-duration`, 6
  `-exit-duration`; the mirror header regenerates from the table (register prose from
  `comment`, figures from the projection — G-SPRING-HONEST's mechanism). The generator stays
  idempotent (second run = zero diff).

**Act 3 — the rider sweep.** Census this seat (`rg -c 'spring-<name>'` over `src`+`demo`,
occurrences): smooth 43 · snappy 83 · bouncy 25 · gentle 8 · orb-drop 3. The executing seat
RE-RUNS this census at its cut (the detector is the law; the counts are this seat's evidence).
Re-home by CLASS, not by site list:

| class | old | new | witness sites |
|---|---|---|---|
| interactive scale legs (`--transition-liquid-spatial`) | smooth | **press** (`--transition-liquid-spatial: var(--spring-press)`) | `scheme-spring.css:187`, `utilities/base.css` `.button`/`.tap-squish` scale legs → `var(--spring-press-duration) var(--transition-liquid-spatial)` (canon edit 6; restores the CSS_t90 == JS_t90 parity the doc-block claims) |
| entrances, anchored (menu/toast/@theme animates) | smooth/snappy/bouncy | **present** | `motion-registers.css:61-62` (K-4) · `literals.css:19-21` fade-in/scale-in/slide-up → `--spring-present-duration` + `--spring-present` · `view-transition.css:41-42` + `scroll-tokens.css:90` `--vt-ease` → `var(--spring-present)` · `liquid-enter.css:121` fallback |
| entrances, fired overlay (dialog/sheet/popover) | snappy | **panel** | `motion-registers.css:53-54` (K-4: the codex-measured +2.5%/ζ≈0.70-0.75 empty-shell arrival; the Sixth Ecoute's SMOOTH-not-sharp popover spring) · `DialogContent.vue:314` mount |
| travel / indicator / extent | snappy | **dock** | `layer-group.css:287-289` · tab indicator alias · `useElementMorph.ts:121` + `useDragMorph.ts:177` defaults · `useDockCtaReceive` default |
| celebration geometry | bouncy | **panel** (+4.2%, the measured ceiling); ceremony → the light channel (`engageEnvelopes`) | `useLiquidReveal`/`useDockCtaReceive` emphatic variants; completion-seal's died at Act 0 |
| room-sized reveal | snappy/bouncy | **bloom** | `useLiquidReveal` default (§4) |
| substrate / scroll | gentle | **world** | `scroll-choreography.css:66` `--ease-scroll-spring` · `useScrollScene.ts` prose |
| hint / annotation | — | stays **bezier** | `enter-tooltip` on `--ease-out-expo`/`--duration-fast` — an annotation has no mass (K-4; both prior arms refuted) |

Type seams re-authored in the same act:
`ElementMorphPreset = Extract<SpringPresetName, "dock" | "panel">` (canon edit 7) ·
`useLiquidReveal` preset union → `"bloom" | "panel"` (default `bloom`) ·
`useDockCtaReceive` → `"dock" | "panel"` (default `dock`) ·
`useSpringMount`: the local four-name `SpringPreset` type and `MOUNT_PRESETS` list DIE; it
takes `Extract<SpringPresetName, "present" | "panel" | "bloom">` (the three materialization
amplitudes), default `panel`; `DialogContent.vue` passes `"panel"`.

K-4 register re-points (`tokens/motion-registers.css` — #26 executes the re-point; #89 owns
the later hint/menu/panel role restructure):

```css
--enter-overlay-spring: var(--spring-panel);
--enter-overlay-clock:  var(--spring-panel-duration);
--enter-menu-spring:    var(--spring-present);
--enter-menu-clock:     var(--spring-present-duration);
/* enter-tooltip: unchanged — bezier, --duration-fast */
--exit-overlay-duration: var(--spring-panel-exit-duration);  /* the 0.15s literal DIES */
```

The file's "mid-duration decision" prose re-rules: the ~0.3 s mid-settle register died with
`smooth`; a press-adjacent consumer composes `press` (0.12 s tap) + `dock` (0.21 s
mid-settle). The stale `utilities/base.css:~181` "ζ=0.86" block deletes with its row.

Tailwind-first bridge set (`theme/bridges.css`): `--ease-spring-smooth/-snappy/-bouncy/-gentle`
and the vague `--ease-spring` (both sites, incl. `scheme-spring.css:212`) DIE; the @theme
bridge set becomes exactly the six rows (`--ease-spring-press` exists; mint
`-present/-dock/-panel/-bloom/-world` in the same block). `tokens/manifest.ts:45` restates the
six names.

**Act 4 — the `useLeadTrail` strike (§5).**

**Act 5 — the canon re-emit.** After #78's LAND (Φ4 precedes Φ5 by phase; the body + emitter
are committed at `docs/tranches/BJ/audits/2026-07-28-claude-resume/salvage/W-DESIGN-CANON-APOTHEOSIS/`),
run `node scripts/regen-design-canon.mjs` so `DESIGN.md`'s spring blocks re-emit the six-row
table, then `--check` → exit 0. This also discharges L-4/DOC-4 (DESIGN.md's spring table wrong
on all four ζ, all three overshoots) by regeneration, never by hand-truing.

**Act 6 — acceptance (§7) + the owed paint rows (§9).**

---

## §4 · G-SPRING-ONE-JOB — every row ≥ 1 rider, no job owned twice

First riders at the cut, named so no row is born violating its own gate:

| row | first riders |
|---|---|
| `press` | `.button`/`.tap-squish` scale legs · `useSpringPress`/`useLiquidPress` · `DockControl.vue:131` |
| `present` | `--enter-menu-spring` · the three `literals.css` @theme animates · `--vt-ease` |
| `dock` | the dock morph (`DOCK_SPRING`) · layer-group indicator · `useElementMorph`/`useDragMorph` defaults |
| `panel` | `--enter-overlay-spring` · Dialog mount · celebration variants |
| `bloom` | `useLiquidReveal` default (the source-rect → room-sized surface bloom — exactly "a surface expanding to fill a sheet or a screen"; demo witness `demo/stories/motion/reveal.vue:41`) |
| `world` | `--ease-scroll-spring` + the `scroll-choreography.css` cascade · `useScrollScene` |

No job is owned twice: touch=press, birth=present, travel=dock, deploy=panel, growth=bloom,
recession=world; annotations are bezier and own nothing.

---

## §5 · THE `useLeadTrail` DISPOSITION — RULED: strike the public artefact, colocate the engine

The census verdict (MOMENTUM-CENSUS §4) stands re-verified this seat: one real consumer
(`pager-dots/composables/usePagerWorm.ts:19,167`), zero dock hits, root + core-barrel exports.
The named second consumer was not reached; the forbidden third outcome is leaving the
one-consumer root export standing. The disjunction resolves:

**DEFAULT RULED — STRIKE-AT-#26, the strike limb, executed as colocation:**

1. MOVE `src/composables/motion/morph/useLeadTrail.ts` →
   `src/components/pager-dots/composables/useLeadTrail.ts` (the BI colocation law: a private
   component engine lives with its component).
2. DELETE the re-exports at `src/index.ts:509,513` and
   `src/composables/motion/core/index.ts:50` — clean break, no alias, no deprecation window.
3. Re-point the one import in `usePagerWorm.ts:19`; update the module header's pager-worm
   rationale in place; re-point the `scheme-spring.css:193` and `demo/stories/motion/deck.vue:11`
   comments (or strike them where the regen owns the line).
4. The lead pair (0.68/ζ0.64, τ 0.27 s) stays byte-identical, entered in the §2 exception
   ledger. NO feel retune in this cut — a felt change to the shipped worm without a paired
   capture is the exact live-verify inflation; the retune question (dock-row derivation vs the
   pager-owned pair) is #39/#47's design cell with its capture.

**Grounds:** (i) the census's own disjunction — strike here with the export removed in the same
cut; (ii) the overfitting law — the artefact survived on the weakest limb (exported, one
consumer); after colocation it is a private component helper, the strongest; (iii) the
ONE-authority law — a root-exported spring literal outside the table is a second authority in
miniature; a colocated engine in the exception ledger is not; (iv) #47 GF-DOCK is UNSTARTED and
owns dock files — pre-wiring the dock from this wave would cross the one-owner fence.

**Revival path, owner-reversible in one word:** #47's dock-worm (the goo-morph edict makes the
worm grammar the dock's) re-promotes the module to `motion/morph` with the dock as the earned
second consumer — or consumes the #67 W-2 spine-conductor kernel (`useLiquidSpine` subsumes
Draggable/SpringProgress/useLeadTrail per SPEC-SPINE-CONDUCTOR), whichever ITS spec rules.

---

## §6 · THE CLOCK-FENCE ARM (U-39) — a spring owns its own clock

**The invariant (an ARM on G-SPRING-ONE-JOB, §B.5 amended, seats +0):** a `--spring-<name>`
timing function may appear in a `transition`/`animation` ONLY paired with its own
`--spring-<name>-duration` or `--spring-<name>-exit-duration` clock. A bezier may ride any
duration token. A spring on a foreign clock replays its curve over the wrong span — the
measured ~5× t90 compression class.

**Born-RED census at HEAD (6 sites), re-authored in Act 3:**

| site | at HEAD | re-authored |
|---|---|---|
| `dock/styles/layer-group.css:287-289` | width/height/translate `var(--duration-fast) var(--spring-snappy)` ×3 | `var(--spring-dock-duration) var(--spring-dock)` — indicator travel is dock's job |
| `configurator/ConfiguratorLayer.vue:207` | grid-template-rows `var(--duration-fast) var(--spring-snappy)` | `var(--spring-dock-duration) var(--spring-dock)` — a disclosure is coordinated extent under pointer intent, not a fired deploy (ruled; owner-reversible to `panel`) |
| `theme/literals.css:19-21` | fade-in/scale-in/slide-up `var(--duration-normal) var(--spring-smooth)` | `var(--spring-present-duration) var(--spring-present)` |
| `theme/literals.css:22` | dock-in `var(--duration-panel) var(--spring-snappy)` | `var(--spring-dock-duration) var(--spring-dock)` |

(`--animate-tooltip-in` at `:18` is legal as-is: bezier on `--duration-fast`.)

The preset deletion forces the re-authoring; the arm is the invariant that survives it.
Detector: extend the existing spring mirror/sync gate with a declaration scan — any
declaration whose timing-function resolves a `--spring-<n>` must contain `--spring-<n>-` in
its duration slot; RED on the six sites at HEAD, GREEN at the cut, bites forever.

---

## §7 · GATES AND ACCEPTANCE — all seated, zero mints

| check | assertion | state |
|---|---|---|
| **G-SPRING-HONEST** (WAVES:577, seated) | a register text mentions rebound iff `M > B` for its own row; presets regenerate from the table, never hand-edited | RED at HEAD (4 rows); GREEN = only `panel`'s text may say rebound |
| **G-SPRING-ONE-JOB** (WAVES:577, seated) | no two rows own one job; every row ≥ 1 rider (§4) | RED at HEAD (`orb-drop`/`panel` zero CSS consumers; smooth/press + snappy/dock duplicate) |
| └ clock-fence ARM (U-39) | §6's invariant; the 6-site census | born-RED, GREEN at cut |
| regen idempotence | `node scripts/regen-spring-tokens.mjs` twice → second run zero diff; mirror gate green | |
| canon | `node scripts/regen-design-canon.mjs --check` → exit 0 after the re-emit (Act 5) | |
| name-grave (C-5) | `rg '\-\-spring-(smooth|snappy|bouncy|gentle|orb-drop)\b' src demo` → 0 · `rg 'springPreset\((["\x27])(smooth|snappy|bouncy|gentle|orb-drop)\1\)' src demo` → 0 · `rg '\-\-spring-transient|"transient"' src` → 0 | the fence is on register FORMS — English prose ("too-bouncy masthead") and non-register identifiers are out of scope, keeping the gate finite |
| types | `vue-tsc` clean; `SpringPresetName` is exactly the six names; unit suite green (`springProjection`/`springTokenMirror` tests re-true against the six rows + `settleBand`) | |
| demo/table parity (#85 X19 edge) | the `EasingCurve` extraction lands with-or-before this cut so `/motion/springs` never shows 8 rows against a 6-row table; the demo table derives from `SPRING_PRESETS` length, never a hardcoded count | sequencing check, named |

**LOC honesty:** strongly net-negative — the completion-seal component (~6 files) + two whole
preset rows + four bridge aliases + the mid-duration prose die; the additions are 6 exit
readers, one `settleBand` field, one new row (`bloom`), and the exception ledger. The spec
deletes more boldly than it adds.

---

## §8 · KEYED SEAMS — what this wave does NOT touch, and who does

| item | owner | key |
|---|---|---|
| `--enter-overlay-scale` 0.94→0.85, `--enter-menu-scale` 0.96→0.85 (canon edit 5) | **#89 W-OVERLAY** | geometry, not spring; #26 touches only spring/clock lines in `motion-registers.css` |
| `reveal.css` fade-led exit keyframe percentages (canon §7 "also fix") | **#89** | #26 supplies the `-exit-duration` vocabulary; reveal reads the re-pointed token with zero edits |
| `--glass-halo-blur` 20px→11px (canon edit 1-list item 8) | **#22/#68 material band** | CONTESTED ON DISK: `tokens/glass.css:231-237` now argues 18-20 px as the sweet spot ("11 reads too close to the modal's own plate") — a post-canon defense the material row must adjudicate; not spring jurisdiction |
| engagement ladder, `engageEnvelope` wiring, suffusion | **#27** (after #26) | press-drain is cited here as press's liveliness channel, not rewired |
| dock component files, worm feel retune | **#47 / #39** | §5's revival path |
| `useLiquidSpine` kernel | **#67 W-2** | subsumption path only |
| route grammar consumers of `world`/`bloom` | **#29 / #30** (after #26) | they consume the six names |
| the hint/menu/panel `data-reveal` role restructure | **#89** | #26 re-points springs under the CURRENT register names |

**Cross-wave rulings this authority makes now** (the one-spring-authority speaking, so no
downstream wave re-opens a pair):

- **GF-FOURIER (#53) substrate-travel binds `springPreset("world")`** — (0.48, ζ 1.00)
  satisfies the lane's consumed ζ ≥ 0.82 invariant (G-FF-CLOCK); the job IS the world's:
  substrate travel. DESIGN-NOW S3's "whatever pair the ONE spring authority lands" is hereby
  landed.
- **The blob ω18/ζ0.35 pulse row is KEPT** (§2) — the exception the spring authority owns.
- **IOS27 W-1 is SUBSUMED**: its register landing is on disk; its owed dock-register-delta
  capture folds into §9's dock π pair (superseded values); its T1/T9/T5 doc seams hand-true at
  #61 to this wave's shipped bytes.

---

## §9 · THE FELT CHANGES + THE OWED PAINT HALF

What a human feels after this wave — each row a named paired capture OWED to **#10 π-SUITE**
(the singleton browser seat; this seat is doc-side by hard wall, so the paint half is owed,
never claimed — the live-verify law):

| π row | pre → post |
|---|---|
| π-SPRING-DOCK | dock expand/collapse at 3 frame samples: faster attack, deader landing (0.35/0.82 → 0.30/0.88); replaces IOS27 W-1's owed `dock-register-delta.md` |
| π-SPRING-OVERLAY | dialog/popover enter: snappy's late tick → panel's mid-clock rebound (+4.2%, ≈63% of clock per §1's correction); exit 0.15 s flat → 0.25 s fade-led proportionate |
| π-SPRING-MENU | menu enter: smooth 0.35 s → present 0.20 s dead landing |
| π-SPRING-WORLD | scroll recede: gentle 0.76 s → world 0.57 s inside the measured band |
| π-SPRING-WORM | pager worm: byte-identical physics post-colocation (a no-change cell — the honesty control) |

---

## §10 · THE DELETIONS LEDGER — one table, everything that dies

| dies | site |
|---|---|
| `completion-seal` component, whole (+ its `--seal-*` @property rows, manifest/story/test refs) | Act 0; relay = #18's atlas row |
| preset rows `smooth` `snappy` `bouncy` `gentle`; the `orb-drop` name | `springPresets.ts` |
| their 4 curves + 4 `-settle` + 4 `-duration` tokens (`orb-drop`'s rename in place) | `scheme-spring.css` (regenerated) |
| the `press` rebound claim (C-4) + header "tiny alive rebound" + the RE-TUNE note | `springPresets.ts:50-51,120` · `scheme-spring.css:37,44-48` (regenerated) |
| `--exit-overlay-duration: 0.15s` literal | `motion-registers.css:75` |
| `--ease-spring` (both sites) + `--ease-spring-smooth/-snappy/-bouncy/-gentle` | `scheme-spring.css:212` · `bridges.css:340-343,353` |
| `useSpringMount`'s local `SpringPreset` type + `MOUNT_PRESETS` | `useSpringMount.ts:38,44` |
| the stale "ζ=0.86" prose block | `utilities/base.css:~181` |
| the "mid-duration decision" smooth prose (re-ruled press+dock) | `motion-registers.css:41-50` |
| `useLeadTrail` root + core-barrel exports; the `morph/` module seat | `src/index.ts:509,513` · `motion/core/index.ts:50` (§5) |
| DESIGN.md's stale spring figures | regenerated at Act 5, never hand-trued |

*Authored complete this seat; the wave implements when the tier opens. The table is the
authority; the generator is its voice; nothing downstream states a pair again.*
