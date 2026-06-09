# Research-necessity audit — dock

**Lane** dock · **Verdict** REFINE-FROM-EXISTING · **Audited** 2026-06-09 against the working tree
on `at-dock-convergence` (note: the Batch-2 finisher is concurrently writing the dock story surface —
`demo/stories/compositions/dock-with-slider.vue` + the `W-DOCK3-*` PNGs/DELTA exist on the tree while
`PROGRESS.md:72` still says `planned`; those artefacts are marked in-flight below).

The lane question: the user's standing bar is "ios-like springy" (PROMPT-CORPUS #5:35-40) — is the
dock's FEEL settled, or does the iOS-dock-register (magnification? press squish → W-LIQUID?) need a
comparative-reference research pass vs the keyframes.js original?

**Answer: the comparative-reference pass already exists — TWICE — and the two passes CONVERGED.
A third would re-tread a settled corpus.** The remaining feel work is (a) executing already-specced
captures/gate-tightening, (b) one user DECISION (magnification ship/no-ship) whose parameter model is
fully on disk, and (c) consuming W-LIQUID's facility when it lands — W-LIQUID §2 already owns the
squish research lane, so even the one research-shaped item is scheduled elsewhere.

---

## 1. The existing corpus (read in full)

| Artefact | State | What it settles |
|---|---|---|
| `src/components/custom/dock/README.md` (299 ln) | ON DISK, self-declared "SOURCE OF TRUTH" | the animation language (spring two-knob model, interruptibility, one-clock), layering discipline, API, `<Role>Dock` naming, gate table — but STALE on the VT axis (§3 below) |
| `~/Programming/keyframes.js/docs/tranches/C/audit/animation/ios-dock-animation.md` (436 ln) | ON DISK — **the keyframes.js-lineage comparative pass, pass #1** | the FULL six-register iOS dock vocabulary (I.1 magnification w/ cosine falloff + buildui params + the (response 0.15, ζ 1.46) overdamped conversion; I.2 shared-element morph; I.3 genie; I.4 press/lift (0.3, 0.7); I.5 show/hide; I.6 the canonical SwiftUI preset table), MEASURED probes of glass-ui's then-dock (frozen-transition, 3× compression, monotone press), and the Tier-A/B adoption plan |
| `~/Programming/keyframes.js/docs/tranches/B/asks/{glass-ui-dock-convergence,glass-ui-dock-forward}.md` | ON DISK | the convergence record: the keyframes "original" dock FOLDED onto the glass-ui base — `ChromeDock.vue` now imports `@mkbabb/glass-ui/dock` (a thin slot-filler); there is NO divergent original left to compare against |
| `docs/tranches/AY/audit/hardening/H-research-dock-anim.md` (242 ln, 2026-06-09) | ON DISK — **fresh SOTA pass, pass #2** | re-derived the same SOTA (8 citations): spring is SOTA-correct; magnification is the missing capability WITH its impl model (Part 3.4); the residuals — 2-frame arming gap (D1.1), three-hop reveal derivation (D1.2), layout-per-frame on in-flow docks (D3), `inherits:true` vs the W01 note (Part 4) |
| `docs/tranches/AX/research/{dock-facilities-corpus.json, dock-liquidglass-README.md}` | ON DISK | the AX dock research corpus (W-DOC1 edit-site 9 binds the README citation to it) |
| `docs/tranches/AY/audit/hardening/H-dock.md` | read | the red-team: the tautological lockstep gate (HEADLINE), stagger-by-design (D1), two DOCK_SPRING copies (D2), two FLIP engines (D3), rail second-clock (D7), the 8-point convergence criteria |
| `docs/tranches/AY/waves/AY.W-DOCK{1,2,3}.md` | EXECUTED / EXECUTED-with-RG / in-flight | the capture wave (verdict consumed), the gate-impl wave (§0 RE-GROUND records RG1–RG6), the dock+slider wave |
| `docs/tranches/AY/audit/visual/W-DOCK1-DELTA.md` + 12 PNGs | ON DISK, live-verified | **the binding feel measurement**: box↔scalar onset Δ = 0.0 ms in ALL 12 captures; the 36.7–96.2 ms trailing-child trail IS the deliberate stagger — lag captured-ABSENT, chronic DISCHARGED-on-capture |
| `docs/tranches/AY/audit/visual/W-DOCK2-DELTA.md` (0 PNGs) | ON DISK, `live-pending` | HG1–HG7 device-free landed + born-RED-proven; HG6 own-surface capture OWED |
| `docs/tranches/AY/audit/visual/W-DOCK3-DELTA.md` + 8 PNGs | ON DISK — **in-flight** (Batch-2 finisher; PROGRESS row still `planned`) | the keepDockOpen live drag DELTA (held/released × desktop/mobile × light/dark) |
| `docs/tranches/AY/audit/hardening/b2/B2-dock.md` | read | the adversarial re-ground: RG1/RG2 captures OWED (BLOCKING), RG3 537ms budget LOOSE, RG4 phantom cap-rung child, RG5 0.55-fallback + the value.js inflation, RG6 honest W-GOD1 books |
| `docs/tranches/AY/waves/AY.W-LIQUID.md` | OPEN | the Siri squish facility — §2 assigns a DEDICATED research lane; §3.3 names the dock as consumer #2 ("the held/press states gain the capped squish — the iOS dock-icon press register") |
| `~/Programming/keyframes.js/docs/tranches/H/audit/{_SYNTHESIS-dock-perf-modes,a-perf-dock-lag,a-historical-dock}.md` | present | the keyframes-side perf/lag lineage that fed PROMPT-CORPUS #5 |

## 2. As-built vs the corpus (what already LANDED)

- **The spring authority is canonical + directly gated.** `DOCK_SPRING = {response: 0.32,
  dampingFraction: 0.7}` at `dockMorphContext.ts:39` (the iOS control band); `useLayerTransition.ts:45-49`
  carries the mirror + the explicit `BOOKED: AY.W-GOD1` fold marker; `proof:spring-tokens-synced`
  reads the canonical file (B2-dock confirmed born-RED on a ζ retune). HG3 done.
- **Interruptibility — the one genuinely-iOS property — is live-gated** (velocity re-seat through a
  retarget; W-DOCK1 captured the retarget condition at both viewports).
- **The press register is on-doctrine.** `tokens.css:1801` `--dock-press-spring: var(--duration-fast)
  var(--spring-smooth)` (the W-DOCK2 D6 fix landed; the `dock-controls.css:29` comment records the
  removed per-surface re-point). The kf-pass-#1 II.3 finding (monotone-bezier press) is CLOSED.
- **The lockstep chronic is discharged on artefact** (W-DOCK1's 12-capture table) and the gate is no
  longer a tautology (entering-child onset asserted, D1 blind-spot guard, born-RED fixture) —
  B2-dock red-team-confirmed.
- **Rail cohesion landed** (`:indicator="false"` single-indicator; rail off `--dock-motion-resize`);
  persistence honestly BOOKED → W-GOD1.
- **The VT collapse path is RETIRED root-and-branch** (`view-transition.css:47-59` deletion record;
  only the consumer route-morph `view-transition-name` seam survives, `GlassDock.vue:360-372`).
- **Magnification: confirmed ZERO as-built** (`grep -rni 'magnif|proximity' src/components/custom/dock/
  src/styles/dock/ dock-controls.css` → 0 hits) — the one named capability gap.
- **NOT yet landed** (all specced, no research needed): the W-DOCK2 HG6/RG1/RG2 captures; RG3/RG4
  gate-tightening; RG5 source/DELTA nits; the W-GOD1 books (FLIP fold, §F2 first-mount, rail
  persistence); the H-research residuals (arming gap, `inherits:true`) — §5 below.

## 3. README grade — STALE (localized to the animation-language §, the gate table, and 3 cites)

The 299-line README's layering discipline, use-cases, composables table, naming convention, and
best-practices are ACCURATE. The stale residue, all divinable:

1. **The VT morph driver is documented but DELETED.** README "One driver per concern, per engine"
   (≈`:76-89`) lists the "View-Transitions path (native `document.startViewTransition`)" as the
   primary size-morph driver, and "Directional intent" (≈`:91-97`) claims typed VTs
   (`:active-view-transition-type(dock-expand)`). `view-transition.css:47-59` records the AX.W01
   RETIRE: "the `::view-transition-group(.gl-dock-layer)` group + its typed curve fork are DELETED…
   the dock collapse↔expand now morphs off the ONE `--dock-morph-t` spring scalar." The README is the
   self-declared SOURCE OF TRUTH (`:7-9`) describing an abrogated architecture.
2. **The gate table (≈`:287-299`) lists two RETIRED gates and misses ~10 shipped ones.**
   `proof:dock-motion-single-source` + `proof:dock-motion-parity` are absent from `package.json`
   (no script files); missing rows for the shipped `proof:dock-rail-cohesion`, `dock-hold-contract`,
   `dock-unify`, `dock-region-model`, `dock-perfection`, `dock-orchestrator-single`, `dock-clip-reveal`,
   `dock-items-lag-capture`, `dock-lockstep-bornred`, `dock-vocabulary` (`package.json:563-579`).
   The `proof:dock-animation-live` row still says "on both the FLIP and VT paths" (VT retired; the
   gate's binding witness is now the entering-child onset) and the `proof:dock-opacity-lockstep` row
   names the DK7-killed `--dock-motion-resize` token.
3. **The DOCK_SPRING home cite is stale.** README `:37-39` names `composables/useLayerTransition.ts`;
   the canonical authority is `dockMorphContext.ts:39` post-W-DOCK2 (`useLayerTransition.ts:45-46`
   says so itself).
4. **API table:** `shape` row (`:185`) omits `"card"` (`GlassDock.vue:55` is
   `"pill" | "rounded" | "card"`); the grid `layout` prop (`GlassDock.vue:134` `shape="card"
   layout="grid"`) is absent.
5. **CLAUDE.md (adjacent):** the dock-orientation section names `useDockTransition` — no such
   composable exists (`composables/` = dockContext, dockLayerContext, dockMorphContext,
   isTeleportedTarget, useDockHold, useDockState, useLayerTransition).

Routing: W-DOC1's dock row (`AY.W-DOC1.md:161`) currently only ADDS the research-corpus citation —
widen it to carry items 1–4 (or mint a small README-reconcile edit-site in the W-DOCK2 RG batch).

## 4. Verdict — REFINE-FROM-EXISTING; no fresh dock research pass warranted

The question the lane poses — "does the iOS-dock-register need a comparative-reference research pass
vs the keyframes.js original?" — dissolves on four facts:

1. **The comparative pass exists twice and converged.** Pass #1 (keyframes.js C-tranche
   `ios-dock-animation.md`) is precisely the requested artefact: the iOS register researched, the
   glass-ui dock MEASURED against it (probes in its appendix), and a numeric adoption plan. Pass #2
   (`H-research-dock-anim.md`, 2026-06-09) independently re-derived the same SOTA and the same two
   capability gaps (magnification, transform-vs-layout). Two passes agreeing on registers, falloff
   models, AND spring constants is a settled corpus.
2. **There is no "keyframes.js original" left to diff against.** The convergence asks + branch name
   (`at-dock-convergence`) record that the original folded INTO this dock; `ChromeDock.vue` imports
   `@mkbabb/glass-ui/dock`. The lineage is a paper trail, not a living alternative implementation.
3. **The feel substance is measured-settled where it ships.** Spring in the iOS control band,
   velocity-carrying interruption, box↔scalar Δ = 0.0 ms on 12 live captures, press/hover on the §6
   doctrine register, the W45-TUNE three-leg hover. What remains is captures owed + gate looseness
   (RG1–RG4) — execution, not knowledge.
4. **The two feel ADDITIONS are routed, not researchable.** Press squish → `AY.W-LIQUID` carries its
   OWN research lane (§2) and names the dock as a consumer (§3.3) — a dock-side squish research pass
   would duplicate a scheduled lane. Magnification → the parameter model is fully divined (cosine
   falloff over ~110 px, per-icon overdamped interactiveSpring (response ≈ 0.15, ζ ≈ 1.4),
   transform-only, PRM-gated, opt-in variant — kf-pass I.1/III.4 + H-research Part 3.4 agree); what
   is missing is a USER DECISION + a wave spec (net-new capability, ≥2-consumer bar). **Caveat to
   record:** H-research-dock-anim `:42-43` claims the user "names it explicitly (AY.md §0 line 28
   'the magnification')" — AY.md contains NO such text (grep 0), and PROMPT-CORPUS #5 says
   "ios-like springy animations" only. The mandate cite is uncorroborated (the same inflation class
   B2-dock F6 caught on value.js); treat magnification as researcher-PROPOSED pending the user's word.

## 5. Divined refinements (no research needed; corpus + code suffice)

1. **Execute the OWED W-DOCK2 captures (RG1/RG2, BLOCKING).** Own-surface light+dark frame-series
   PNGs on the real `/dock/overview` dock + a persisted GREEN run of `proof:dock-animation-live`
   (`.cache/gates/AX-dock-animation-live.json` is status `fail` against the synthetic fixture).
   Already routed: `EXECUTION-DAG.md:89` binds W-DOCK2-RG1 into W-COHERE G4.
2. **RG4 — exercise the cap-rung ceiling against a real child.** The capture dock
   (`demo/stories/dock/overview.vue:284-297`) has exactly 5 `.dock-layer--full` children; the CSS cap
   is `nth-child(n+6)` (`layers.css:280-282`). Add a 6th child or re-derive the budget on the real
   last-child onset `step×4 = 0.32`.
3. **RG3 — tighten `LOCKSTEP_BUDGET_MS`** (`proof-dock-animation-live.mjs:116`, ≈537 ms) toward the
   CAPTURED onset number + ε once RG1's real capture lands (a 150–400 ms regression currently sails
   through; the captured worst case is 96.2 ms).
4. **RG5a — reconcile the stagger-window fallback.** `layers.css:235` still declares
   `var(--dock-stagger-window-size, 0.55)` vs the shipped `shell.css:51` value `0.4` (verified live
   at HEAD) — match or strip the fallback.
5. **RG5b — strike the fabricated value.js justification** from `W-DOCK2-DELTA.md` HG4 (≈`:169-173`)
   and soften the same "external consumer" claim in the `useLayerTransition.ts:36-45` BOOK comment —
   the book stands on W-GOD1-carve grounds alone.
6. **README reconcile (§3 items 1–4)** — delete/rewrite the VT-driver + typed-VT sections per
   `view-transition.css:47-59`; fix the gate table (−2 retired, ~+10 shipped, 2 stale descriptions);
   re-point the DOCK_SPRING cite to `dockMorphContext.ts:39`; add `"card"` + the grid `layout` prop.
   Route into W-DOC1's dock row (currently citation-only, `AY.W-DOC1.md:161`).
7. **CLAUDE.md — replace the nonexistent `useDockTransition`** (dock-orientation section) with the
   real `dockMorphContext` / `useLayerTransition` names.
8. **Reconcile `@property --dock-morph-t` `inherits: true`** (`src/styles/dock.css:61-65`) against the
   W01 SOTA note's own `inherits:false`-plus-inheriting-`--dock-expand-t`-alias design
   (H-research-dock-anim Part 4): on a `layout="grid"` big-dock the inheriting animated property
   forces a per-frame recalc on every descendant. One-line + a verify; the alias already exists
   (`layers.css:77-79` per the research note).
9. **Close the 2-frame arming gap** (H-research-dock-anim D1.1 / Part 3.1): in
   `dockMorphContext.ts:268-341` `onSwap`, write the spring's first frame synchronously in the same
   T1 rAF after `armTarget` (or measure synchronously at T0) so first visible motion lands on the
   gesture frame. The W-DOCK1 box onsets (26–34 ms post-gesture) are consistent with the ~2-frame
   pre-hold; verify the delta shrinks in the RG1 re-capture. The fix model is already written in
   the corpus — implementation + measurement, not research.
10. **Magnification — surface the DECISION, not a research pass.** If the user greenlights, the spec
    writes itself from the two convergent sources (kf `ios-dock-animation.md` I.1/III.4 +
    `H-research-dock-anim.md` Part 1.B/3.4): cosine-falloff over ~110 px, per-icon overdamped spring
    (response ≈ 0.15, ζ ≈ 1.4), `transform: scale()` only, PRM-gated, opt-in `magnify` variant (not
    the default dock). Also correct the uncorroborated "AY.md §0 line 28" user-mandate cite wherever
    it propagates.
11. **Press squish — consume, don't research.** W-LIQUID §2 owns the Siri-register research lane;
    §3.3 already names the dock's held/press squish as a facility consumer. The dock lane's only
    obligation is the integration site (the `dock-controls.css` press register re-points onto
    `useLiquidFlex` when it lands). Optional micro-check divinable from kf I.6's preset table: the
    press settle window (`--duration-fast` × `--spring-smooth`) vs the reference 0.42 s ≈ response×1.4
    window — a token tune if the live feel reads clipped, recorded against the doctrine.
12. **W-DOCK3 in-flight reconcile.** `PROGRESS.md:72` says `planned` while `W-DOCK3-DELTA.md` + 8
    own-surface PNGs + `demo/stories/compositions/dock-with-slider.vue` exist on the tree (Batch-2
    finisher concurrent). Flip the row + run `proof:live-verified-ledger:ay` once the finisher
    commits; verify the CLAUDE.md Slider-section pointer now resolves.

## 6. Genuine research gaps

None for this lane. The only research-shaped open item in the dock's orbit — the Siri liquid-glass
deformation model (flex drive, volume-preservation bands, material-continuity) — is ALREADY ASSIGNED
to the dedicated W-LIQUID research lane (`AY.W-LIQUID.md §2`); duplicating it here would be churn.
Magnification ship/no-ship is a user decision over an already-converged parameter model; the budget
tightening resolves on the RG1 captured number; the FLIP fold + rail persistence are booked
engineering (W-GOD1), not literature questions.
