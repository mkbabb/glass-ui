# S-conv2 — Convergence-2 outcomes (W53–W59) inventory

Read-only step-back inventory. HEAD `88a2ec5` (`at-dock-convergence`, 3.8.0 + conv-1
W44/W45 + conv-2 W53/W56/W57/W58/W59/W19). Lane scope: the pass-2 net-new + augment
waves — the glass-first-class / adaptive-glass / squircle band and the prune/tabs/slider/
demo-language strip. What remains of the G / DK(layer) / T / P asks routed into this band.

The convergence-2 disposition lives in `convergence2/CONVERGENCE-PLAN-2.md` +
`A-tranche-wave-audit.md`; the asks in `USER-DEFECTS-2026-06-08-pass2.md`. The pass-2
headline: **glass FIRST-CLASS / default, the squircle pivot, the Apple-SOTA liquid/squishy
idiom** — research→harden→plan→author triumvirates iterated to convergence.

---

## Status matrix (lane waves)

| Wave | Title | Folds | Source state @HEAD | Gate | Live |
|---|---|---|---|---|---|
| W53 | tabs-unify (SegmentedTabs) | T1/T2/T3/T4 | INTEGRATED | proof:tabs-unified PASS (π arm ran: glided=true squished=true) | DONE (live-verified) |
| W56 | squircle-design-language | G3 (foundational) | INTEGRATED | proof:squircle-language PASS | DONE (live-verified) |
| W57 | demo-radial + pulse-calm | P6/P7 | INTEGRATED | proof:demo-radial-calm PASS | DONE (table) / pi-pending (JSON) — DISCREPANCY |
| W58 | storybook-language-strip | P10/P11 | INTEGRATED | **proof:story-language FAIL (1 hit — REGRESSED)** | n/a (no π arm) |
| W59 | slider-redesign | G1/G3 | INTEGRATED | proof:slider-two-only PASS | DONE (live-verified) |
| W19 | primitive-prune-A (+conv P1/P2/P3/P4) | P1/P2/P3/P4 | **PARTIAL — header-ribbon F0 NOT done** | gates PASS for the done set | DONE for the done set |
| W54 | glass-first-class (--glass-level) | G1 | NOT-STARTED (research complete) | none | — |
| W55 | adaptive-glass-legibility | G2 | NOT-STARTED (research complete; seam present) | none (`proof:adaptive-glass` planned) | — |

---

## DONE (integrated + live-verified)

### W53 tabs-unify — DONE
The five-artefact tabs surface collapsed onto ONE `SegmentedTabs.vue` + `useTabIndicator.ts`.
Verified at source: `src/components/custom/tabs/` carries `SegmentedTabs.vue` + `composables/`
+ `index.ts` only; `BouncyToggle`/`BouncyTabs`/`UnderlineTabs`/`useBouncySlider` + the
`responsive-tabs/` dir + `subpaths/responsive-tabs.ts` are GONE. `proof:tabs-unified` PASS,
and its fail-CLOSED π LIVE arm actually RAN on the device (`glided=true, squished=true`) —
not the befitting-silent SKIP. The `--tab-indicator-max-stretch: 1.08` squish atom, the
ARIA-role-per-variant (underline=tablist, segmented/pill=group), the `--spring-snappy` glide
+ the de-ringed `animatePress` all land. CLAUDE.md already carries the `### SegmentedTabs`
contract section. This is the cleanest close in the lane.

### W56 squircle-design-language — DONE (foundational)
The corner-SHAPE token axis. `theme.css` mints 10 `--corner-k-*`/`--corner-shape-*` tokens
(squircle:2/soft:1.7/sharp:2.4 + card/pill/panel:round + bigdock:superellipse). The card/
button/pill squircle is RE-HOMED off (policy inversion corrected); the big-dock reads
`var(--corner-shape-bigdock)` under `@supports (corner-shape: superellipse(2))`; the clip-path
fallback REJECTION is recorded. `proof:squircle-language` PASS (5 source asserts; bite-proven).
The π cornerShape readback is orchestrator-driven; the JSON `liveVerdict` says
"pending-re-probe" but the PROGRESS table marks it `live-verified (DEVELOPED)` — treat the
table as the authority (the dock band live pass would have exercised the big-dock shape).
**W42's dock-morph reads this band — the cross-ref is recorded, W42 still unplanned.**

### W59 slider-redesign — DONE
The integrated-cylinder glass standard + the track-height squircle spectrum. `Slider.vue`
re-authored: `.slider-range` is a W52-material glass pill, `.slider-thumb` is the slim leading
cap (`--radius-pill`, `height:100%`, scaleX press squish), the spectrum thumb is the
track-height squircle via `--corner-shape-thumb` (minted in theme.css on the W56 k-band, 1
hit confirmed). `proof:slider-two-only` PASS (reconciled to 4 clauses: KEYSET + ORPHAN-SCAN
kept, ROUNDED-KNOB→CYLINDER-CAP, +SQUIRCLE-SPECTRUM; bite-proven). EXACTLY-TWO cardinality
kept; `keepDockOpen` + `.focus-ring` preserved. Consumes W52+W56 cleanly.

---

## DONE-WITH-DISCREPANCY

### W57 demo-radial + pulse-calm — table=DONE, JSON=pi-pending
Source INTEGRATED: `--pulse-aura-strength` + `--pulse-aura-breath-{min,max}` minted (2 hits),
the desync twin collapsed, `demo/stories/aurora-hero.ts` present, the four Class-A heros
(hero/intro/paper-glass/auth-shell) re-authored onto `<Aurora>`. `proof:demo-radial-calm`
PASS. **STATUS CONFLICT:** PROGRESS.md marks W57 `live-verified (DEVELOPED)`; the JSON
`status` is `dev-complete-source-green-pi-pending` and `piLiveArm.status` =
`handed-to-orchestrator`. The π checks (pulse opacity ≤0.42 not 0.95, the four heros drift
legibly, no-GL parity, no 2nd GL context) are NOT recorded as executed in the JSON. **Either
the orchestrator ran the live pass and did not back-fill the JSON, or the table is ahead of
truth.** RECONCILE: re-confirm the π pulse/hero pass live, then update the JSON
`piLiveArm`/`liveVerdict`, OR demote the table to pi-pending. This is the cardinal-lesson
trap (a `complete` table row over an unrecorded live arm) — exactly the W09/W05 class the
convergence flagged.

---

## REGRESSED (re-open into this tranche)

### W58 storybook-language-strip — proof:story-language now RED (was GREEN)
W58 shipped DEV-COMPLETE with the gate GREEN (148 SFCs, 0 hits). **At HEAD `88a2ec5` the gate
FAILS with 1 hit:**

```
x demo/stories/navigation/dock.vue:86 — tranche-code "AX.W45"
  <!-- AX.W45 — Home is a PERSISTENT control: authored ONCE in … -->
```

The W45 dock band lane (commits `56db9e0`/`88a2ec5`) re-authored `navigation/dock.vue` and
re-introduced a tranche-code comment — undoing W58's strip on that file. This is a
**cross-wave regression**: W58's whole thesis is that the gate keeps the language stripped,
and the immediately-subsequent dock-band commit punched a hole. FOLD-INTO-TRANCHE: strip the
`AX.W45` comment from `dock.vue:86` (a one-line `<!-- comment -->` removal) → gate GREEN. The
deeper lesson: any wave touching `demo/stories/**` after W58 must run `proof:story-language`
before close (the W45 lane did not). The gate is `local`-tagged (not in the CI aggregate yet)
so it did not fail a CI run — that's the W33/band-close ci.yml-drift backlog the convergence
already owns.

---

## PARTIAL

### W19 primitive-prune-A — F0 (header-ribbon) NOT done
The convergence-2 fold (P2/P3/P4) is DONE: `glyph-face`, `disco-glyph`, `glass-carousel` dirs
are all GONE; the `glyph-face`↔`disco-glyph` DI coupling severed; `useTokenColor` correctly
KEPT (≥2-consumer bar holds via the constellation hero). The commit `509aed8` confirms this
("excise glass-carousel + disco-glyph + glyph-face; keep useTokenColor").

**BUT the wave doc's ORIGINAL F0 — header-ribbon excision — is NOT done.**
`src/components/custom/header-ribbon/` STILL EXISTS; `header-ribbon` is still referenced in
`package.json` (the `./header-ribbon` export) + `src/api/index.ts` (the `HeaderRibbon*` type
re-export). The conv-2 prunes lane explicitly scoped header-ribbon OUT ("Header-ribbon is out
of THIS lane's scope … owned separately"). So W19's F0 is an **orphaned deferral** — the wave
doc claims it, the integrated work skipped it. This is gated cross-repo: header-ribbon's only
real consumer is keyframes.js `EditorShell.vue` (constellation `result[11]`), so the publish
of the prune is W35-gated (keyframes migrates off HeaderRibbon first). **FOLD-INTO-TRANCHE:**
either (a) execute the in-repo F0 excision now and gate the PUBLISH on W35, or (b) formally
re-route F0 to a header-ribbon-specific wave with the W35 dependency recorded. Right now it is
silently un-owned — the no-silent-deferral precept is at risk.

---

## NOT-STARTED (research complete, no wave doc, no code)

### W54 glass-first-class (G1) — `--glass-level` scalar + opaque escape
PLANNED. Research COMPLETE: `R-glass-default.md` + `A-glass-tokens.md` + `A-glass-leverage.md`.
The SOTA verdict is sharp and NON-naive: **G1 is NOT "glass everywhere."** Apple HIG +
glass-ui's own `no-glass-on-glass` discipline already say glass is the NAVIGATION-layer
default (dock/popover/dropdown/dialog/sheet already glass). The gap is three-fold: (i)
DOCUMENT glass-as-navigation-default as deliberate canon; (ii) audit the nav/overlay band for
surfaces that default opaque but should be glass; (iii) mint ONE `--glass-level` `@property`
multiplier (default 1) threaded through BOTH ladders (opacity + blur) at their single sites +
a first-class `opaque`/`solid` named escape variant (the a11y opaque drop already exists under
`prefers-reduced-transparency` — promote it to a design choice). NO wave doc, NO `--glass-level`
token at HEAD (grep NONE). dependsOn W52 (landed). FOUNDATIONAL per CONVERGENCE-PLAN-2
sequencing (W56+W54 are the token axes landed first) — yet W56 shipped and W54 did not, so the
"foundational-first" sequencing partially broke.

### W55 adaptive-glass-legibility (G2) — iOS-27 backdrop-luminance darken
PLANNED. Research COMPLETE: `R-ios27-adaptive-glass.md` + `A-glass-over-light.md`. **The
substrate is ALREADY IN PLACE** — `tokens.css:838-839` ships `--glass-tint-source: var(--card)`
+ `--glass-tint-strength: 0%` and all five `.glass-*` rungs already mix
`color-mix(in oklab, <rung bg>, var(--glass-tint-source) var(--glass-tint-strength))`
(glass.css:220-380). So the AW-era seam W55 needs is live and byte-identical-at-default. The
NET-NEW is: a `--glass-backdrop-luma` declarative bucket via `@container style()`; the bright
bucket lifts `--glass-tint-strength` to a bounded AA floor (≤~18-24%) + re-points
`--glass-tint-source` to warm-ink — the darken-over-light move, ZERO new compositing.
`contrast-color()` `@supports`-gated. A `proof:adaptive-glass` gate (W00 harness, 4.5:1 over
white). **The A-audit surfaced ONE finding the SOTA lane missed: the dock surface does NOT
thread the `--glass-tint-*` seam, so the adaptive hook must reach `dock.css` directly** — this
is load-bearing for the dock-over-light readability that G2 names. dependsOn W52+W00 (both
landed). NO wave doc, NO `--glass-backdrop-luma` at HEAD. This is the G2 user-named defect
("glass dock over VERY LIGHT materials is unreadable") — still UNADDRESSED.

---

## DEFERRED items that must FOLD INTO this tranche

1. **W58 RE-OPEN — strip `AX.W45` from `dock.vue:86`** → `proof:story-language` GREEN. The W45
   dock-band lane regressed W58's strip. One-line comment removal. (cross-wave regression)
2. **W19 F0 header-ribbon excision** — un-owned deferral. Execute in-repo + gate publish on
   W35, OR formally re-route to a dedicated wave. (no-silent-deferral risk)
3. **W57 π live arm reconcile** — back-fill the JSON `piLiveArm`/`liveVerdict` with the executed
   pulse/hero readback, OR demote the PROGRESS table from `live-verified` to pi-pending.
   (cardinal-lesson / status-truth)
4. **W54 glass-first-class** — author the wave doc + mint `--glass-level` + the opaque escape.
   The foundational token axis that did NOT land beside W56. (the G1 HEADLINE)
5. **W55 adaptive-glass-legibility** — author the wave doc + mint `--glass-backdrop-luma` + the
   `@container style()` lift + thread the dock seam. The G2 user-named unreadable-dock defect.
6. **W56 + W59 π cornerShape readback back-fill** — both JSONs say `pending-re-probe`; the
   table says live-verified. Reconcile the JSON evidence with the table (back-fill or demote).

---

## GAPS vs the plan / unaddressed asks

- **The G band is HALF-LANDED.** Of G1/G2/G3, only G3 (W56 squircle) + the G1/G3-on-the-slider
  (W59) shipped. G1 (W54 glass-level) + G2 (W55 adaptive-dock) — the two the user named most
  forcefully ("why is the default NOT glass", "glass dock over light is unreadable") — are
  research-complete but UN-IMPLEMENTED. The pass-2 HEADLINE (glass first-class) is the least
  finished part of the lane.
- **Foundational-sequencing partially broke.** CONVERGENCE-PLAN-2 §Sequencing puts W56+W54 as
  the foundational token axes "landed FIRST" so downstream waves consume them. W56 landed; W54
  did not — so any consumer expecting `--glass-level` has no axis to read.
- **W36 coordination (forced-colors × W54/W55 opaque path)** — A-tranche-wave-audit §4 routes
  "W36 ← coordinate the opaque a11y path with W54/W55." W36 is still `planned`; the opaque
  escape (W54) + the adaptive darken (W55) + the forced-colors skin (W36) must share ONE opaque
  path, not three. Un-coordinated while W54/W55 are unwritten.
- **The `proof:story-language` gate is local-only (not in CI aggregate).** That is why the W45
  regression did not red a CI run. The ci.yml-drift backlog (W33/band-close) owns wiring the
  π-and-language gates into CI — until then these gates are post-hoc, not preventive.
- **P5 (Apple-glass carousel)** routed to W23 augment, NOT this lane — but worth flagging it is
  still `planned` and is the same liquid/squish idiom as W53's squish atom (the shared
  `useSquish` overfitting-flag the W53 doc names — W53 is the first consumer; a 2nd consumer
  (carousel) would justify extracting it).

---

## Gestalt path forward (planning, not code)

1. **Close the easy regressions FIRST (status-truth hygiene).** Strip the `AX.W45` comment from
   `dock.vue:86` (W58 re-open) and re-run `proof:story-language`. Back-fill the W57/W56/W59 π
   JSON evidence (or demote the PROGRESS rows) so the table and the JSONs agree — the
   cardinal-lesson discipline demands the two never diverge. These are hours, not a wave.

2. **Resolve the W19 F0 ownership cleanly.** header-ribbon is the one un-owned deferral. The
   gestalt: do the in-repo excision now (it is a mechanical dir+export+api+demo strike, the
   wave doc already enumerates every site), record the PUBLISH as W35-gated (keyframes off
   HeaderRibbon), and close W19 honestly. No legacy alias, no rehome — the clean break the
   precept demands. Do NOT leave it as a phantom F0 the wave doc claims but HEAD does not honor.

3. **Author the G-band twins (W54 + W55) as ONE coordinated triumvirate pair, not two
   incremental patches.** They share the `--glass-tint-*` seam and the opaque path:
   - W54 mints `--glass-level` (the level multiplier) + the `opaque` escape variant. The
     gestalt is the two-axis Apple model (level + opaque), NOT glass-everywhere — the research
     is explicit and must not be naively over-applied (re-breaking W52 legibility is the named
     trap). Document glass-as-navigation-default as canon.
   - W55 mints `--glass-backdrop-luma` (the `@container style()` adaptive bucket) on top of the
     EXISTING `--glass-tint-*` seam (zero new compositing), AND threads the dock surface (the
     A-audit's missed finding — the dock does not read the tint seam today). The G2
     unreadable-dock defect is the live close criterion (π readback, 4.5:1 over white).
   - Coordinate the opaque path with W36 (forced-colors) so ONE opaque escape serves a11y,
     adaptive, and forced-colors — three consumers of one path, the no-overfitting bar met.
   Sequence: W54 (the level axis + opaque) lands first as the foundational token; W55 reads
   the same opaque/tint vocabulary for the adaptive darken. Both close on the LIVE dock-over-
   light + glass-character audit via chrome-devtools-mcp — never a headless gate (the cardinal
   lesson; the substrate is in place but the live truth over a white speedtest grid is the
   only proof that counts).

4. **Re-verify-live the suspect-complete lane closes.** W53 already ran its π arm (trust it).
   W56/W57/W59 carry orchestrator-driven π arms whose JSON evidence is thin — fold them into
   the next live pass so the band's `live-verified` rows are backed by recorded readbacks, not
   table assertions. This is the convergence soundness discipline: "complete" never collapses
   to headless-green, and a table row is not a substitute for a captured π artefact.

5. **Flag the `useSquish` extraction candidate (do not act yet).** W53's travel-squish + W59's
   press-squish + W23's planned carousel squish are the same volume-preserving physics. W53 is
   the first consumer; when W23 (P5) lands the carousel squish, the 2nd consumer justifies
   extracting a shared `useSquish`/`--*-max-stretch` family. Recorded as a future-fold, not a
   this-tranche action (the overfitting bar is not yet met).
