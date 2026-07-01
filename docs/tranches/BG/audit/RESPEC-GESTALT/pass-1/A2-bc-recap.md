# A2 — BC tranche recap (the "BB-disease cure", 96 waves → v4.1.0)

## Verdict

BC is real, shipped work — not a paper tranche. Git tag `v4.1.0` resolves to commit `9c0e06e2`
(98 commits ahead of `v4.0.1`), and `docs/tranches/BC/EXECUTION-PROGRESS.md` documents a full
28-tier build with per-tier live paint captures. **This directly contradicts a claim already
sitting in the BG audit corpus** (`docs/tranches/BG/audit/P-historical-coverage.md:26`: *"BC was
tranche-DEV only, never built (`BC/FINAL.md` line 3: 'zero `src/` edits'). The cure was specced,
not shipped."*) — that lens read `BC/FINAL.md` (a document written at the *end of tranche-development*,
before the user's execution greenlight) and never checked whether the greenlight was later given
and executed. It was. This is a doc-vs-disk contradiction inside the BG audit corpus itself and is
flagged as Finding 1 below — it needs correcting before any downstream BG/BH wave cites it.

On the substance: BC's structural thesis — "gates must measure PAINT, per-wave, not source-mechanism
funneled to one terminal reflect wave" — is sound and was actually implemented (`proof:ba-gestalt`
rewritten as a ci-blocking pixel reader; every wave closes with a captured delta). But the diverse-lens
**challenge→harden** discipline BC pioneered checked plan **coherence** (dangling wave references,
phantom sequencing, name drift) almost exclusively — it did **not** function as a gestalt/visual
quality gate. That job fell to the *live paint capture* step, which caught some real defects
mid-execution (aurora shipped blue/teal against the warm-everywhere fence) but missed others that
only surfaced two tranches later: the BD greenfield audit re-diagnosed BC's own shipped
`GLASS-IDENTITY`/`ADAPTIVE-RECONCILE`/`BUTTON-GLASS-IOS` work as **still reading gray** in the live
gestalt, for a structural reason (no colorful field behind the glass, no defined edge) that BC's
paint gate never checked because it measured chroma-above-floor at the token level, not the
composited-over-real-content gestalt a human eye judges. That is the single most important finding
of this recap: **BC proved you can paint-gate individual tokens/surfaces and still ship "gray glass"
as a whole-page gestalt** — the disease mutated, it did not die.

---

## 1 — Set-out / shipped / deferred

### Set out (per `FINAL.md` §1-2)
96 waves (grown from a 70-wave iter-19 milestone via 4 reopenings — Atlas/de-shadcn, feature-band,
SEARCH-CUSTOM, cross-repo absorb) across 12 bands: Forensics(4) → Verification-transposition(3) →
Glass-identity(7) → Dock(7) → Tabs(3) → Procedural-viz(18) → Page-standardization(9) → Controls(4)
→ Motion-canon(4) → Safari(1) → Storybook-meta(1) → Cross-repo+cut(6) → Performance(3).

### Shipped (verified: `EXECUTION-PROGRESS.md` tiers 0-27, all `DONE`, cut at `9c0e06e2` → `v4.1.0`)
- Band 0: `proof:ba-gestalt` rewritten pixel-reading + ci-blocking (G5-G8), `FOLD-LEDGER.json`
  213-item fold, `paint-arm.mjs` shared color probe.
- Band 1: warm-cream floor (`BLACK-BAR`→`GLASS-IDENTITY`→`ADAPTIVE-RECONCILE`→
  `GLASS-LEGIBILITY-MEASURED`), 130/130 π both projects real-GPU.
- Band 2: `DOCK-ENGINE` rebuild (one engine replacing `dockMorphContext`+`useDockState`+
  `useLayerTransition`+morph-bridge — the dual-FLIP-engine fold BB never did), `DOCK-STACK-RAIL`
  clean-break of the divider-carousel lineage, `COCKPIT`, `CTA-SEAT`.
- Band 3: iOS-27 stadium tabs, liquid pull-morph (`useDragMorph`), eased underline.
- Band 4 (18 waves, the largest): WebGPU-first for all 11 procedural viz; the metaball WGSL
  `var target` reserved-word bug fixed (GooBlob had silently run WebGL2 forever, undetected by BB);
  the picker changed from a synchronous presence-commit to try-WebGPU-then-silently-rebuild-WebGL2.
- Band 5: 90 hand-rolled headings migrated onto `StorySection`, `HERO-AUDACIOUS` 177px masthead,
  `GRID-SIMPLE`, `PADDING-CANON` φ-ladder made to actually paint.
- Band 6: `RADIO-FIX` (radios literally didn't toggle — root-caused to a stray
  `pointer-events:auto` on a `::before`), `DROPDOWN-FIX`, `CONTROL-SMOOTH`, `COMPLETION-SEAL`.
- Band 7: motion one-clock, press 0.15/0.86 minted.
- Band 10-11: `/deck` subpath, CSS-critical split (47.3% gzip critical), `LIGHTHOUSE` floor
  achieved-not-provisional, `SPEEDTEST-ADOPT`/`FOURIER-ASK`/`ATLAS-ASK` cross-repo asks.
- **Cut:** `v4.1.0` published with npm provenance; full 345-gate close battery ran siblings-absent.

### Deferred / booked (named, per `DEFERRAL-LEDGER.md`, 213-item fold; HELD items only — the
BUILD/MET/RETIRE items above are discharged)
- `ay-w-blob-glass-snell` — Snell-refraction glass-not-enamel for GooBlob: conditionally
  re-decided in `BC.W-GOOBLOB-MEATBALL`, **HELD** (perf/browser conditions never independently
  re-proven; only the fwidth-fix landed, not the refraction upgrade).
- `ay-w-aur-t5-kuwahara` multi-pass anisotropic-Kuwahara: single-pass landed (`BB.W-AUR-KUWAHARA`);
  the FBO multi-pass stayed HELD, later re-booked as `BD.W-AURORA-KUWAHARA-MULTIPASS`.
- `ay-blob-pulse-zeta-bounce` / `ay-blob-flick-pseudopod-copy` — the blob's click reads as a
  flinch not a bounce, and the flick doesn't read as an elastic pseudopod; HELD to
  `BC.W-GOOBLOB-MEATBALL`, and per the surviving `BD.W-BLOB-MOTION-TUNE` wave doc these were
  **still not fixed** by BC's own MEATBALL wave (which fixed the WGSL bug, not the spring tuning).
- `ay-blob-per-satellite-derived-shade` — the GL color-seam fence was explicitly **not widened**;
  stayed booked, still open at BD (`BD.W-GOOBLOB-SQUIRCLE-REFRACT` picks it up).
- `ay-aurora-medium-lazy-chunk-split` — booked to "a fence-widening successor," still open
  (aurora ships one monolithic `FRAGMENT_SRC` with runtime medium dispatch).
- The 23 `ax-reg-held-23` register books (single-consumer / CSS-feature-gated primitives) —
  re-stamped `reStampedAt:"BC"`, still un-graduated.
- `ay-aurora-substrate-live-π` class and the cardinal-lesson meta-chronic were declared **MET** by
  the Band-0 process fix, but see Finding 3 — the *mechanism* (per-wave paint gate) shipped; the
  *result* (a gestalt that reads warm end-to-end) did not, per BD's own re-measurement.

---

## 2 — Quality retrospective: did challenge→harden improve gestalt, or was it process ceremony?

**Finding: it was process ceremony, and BC's own docs say so plainly.** The convergence record in
`FINAL.md §4` tabulates 9 CHALLENGE iterations narrowing BLOCKER/MAJOR counts 7/9 → 0/0. Reading the
actual gap reports:

- `docs/tranches/BC/CHALLENGE-1.md:9-149` — all 7 BLOCKERs and all 9 MAJORs are **plan-coherence**
  defects: a phantom wave name (`BC.W-WGSL-FALLBACK`) cited as a hard sequence dependency by nine
  other wave specs but never itself authored; a self-inconsistent fold-ledger gate (`FOLD-LEDGER F2`
  would red on its own ledger); a `--spring-dock` curve value contradiction between two wave docs;
  a backward cross-band dependency; sequencing inconsistencies. **Zero** of the 16 findings across
  CHALLENGE-1 concern whether a shipped surface will actually *look* like liquid glass, whether a
  color will read warm against a real backdrop, or whether a hover state will feel alive. This is a
  document-graph linter, not a design review.
- `CHALLENGE-9.md` (the final convergence) records literally 3 duplicate-token typos as the sole
  residual. The process converged on **internal consistency of the plan text**, which is a real and
  useful property (BB's disease was partly *incoherent* plans), but it is orthogonal to "does this
  read as one designed product."
- The actual gestalt verification happened **later, per-wave, during execution** — the live paint
  captures at each tier (`EXECUTION-PROGRESS.md` tiers 3-6, 14-17) — not during the challenge/harden
  development-phase loop. That is the correct place for it to happen, but it means "diverse-lens
  challenge→harden" as a *development-phase* ritual was solving a different problem (plan soundness)
  than the one the user's mandate names (gestalt cohesion, elegance, contrivance). Conflating the two
  in tranche retrospectives ("19 iterations, 0 gaps, CONVERGED") reads as more design rigor than it
  actually delivered.
- The one place challenge/harden *did* catch a live-defect-shaped gap ahead of build:
  `CHALLENGE-1.md:56` ("USER-DEFECTS §C 'Buttons don't work' has NO wave that DIAGNOSES root cause")
  — this is a genuine coverage gap catch, and it is the exception that proves the rule: it's a
  *ledger-completeness* catch (a named user defect with no covering wave), not a design-quality
  judgment about a wave that already had a covering plan.

**Conclusion:** challenge→harden is a legitimate and valuable QA discipline for **plan-graph
soundness** (no orphan references, no contradictions, no phantom waves) — the exact class of defect
that made BB's plan unbuildable. It is not, and was never positioned as, a gestalt-quality
discipline. The gestalt-quality discipline BC actually shipped was the **paint gate at execution
time** (`proof:ba-gestalt` pixel reads + captured deltas). That mechanism is the real cure for BB's
disease. The 19-iteration convergence ceremony is orthogonal, and future tranche retrospectives
should stop citing "N challenge iterations, 0 gaps" as evidence of design quality — it is evidence
of plan-document hygiene only.

---

## 3 — BC-shipped features that later needed re-work (the mutation, not death, of the disease)

This is the load-bearing finding for the RESPEC-GESTALT mandate: BC's paint gate demonstrably
narrowed the disease (surface-level chroma/pixel checks now block a truly grey slab) but did **not**
close the gap the user's verdict describes ("mis-consideration of gestalt cohesion... lacking of
elegance"). Evidence, each item BC believed done, later reopened:

1. **`BUTTON-GLASS-IOS` / `GLASS-IDENTITY` / `ADAPTIVE-RECONCILE` (Band 1) — buttons and glass
   surfaces still read as flat gray pills in the live gestalt.**
   `docs/tranches/BD/greenfield/buttons/GOLDEN.md:9-20` measures the **shipped BC state** live
   (`:5173`, post-BC) and finds: default Button rest fill resolves `oklab chroma 0.0138` — "**<0.02
   → NEAR-GRAY** — the user's 'not glassy' is THIS (same disease as the tabs capsule 0.0128)."
   Root cause named at line 12: `--glass-tint-strength` is `0%` at `:root` — "the warm-admit seam is
   DORMANT at rest." BC's `proof:glass-identity`/`proof:glass-cal` gates were measuring the *token*
   chroma (which is warm) and never composited the *rest-state* paint a user actually sees. This is
   the textbook "gate measures the wrong invariant" failure — exactly the class BC's Band 0 thesis
   claimed to close, recurring one layer down.
2. **`GLASS-IDENTITY`/`ADAPTIVE-RECONCILE` (glass material generally) — the plate is warm but the
   whole-page gestalt still reads gray.** `docs/tranches/BD/greenfield/glass-material/GOLDEN.md:9-25`:
   "The refine triumvirate... is landed in HEAD, and all three [BD greenfield] lenses independently
   re-measured the same thing: **the plate is now warm, and the surface still reads gray**." The
   diagnosis: leg (a) warm-the-plate landed (BC's actual work); legs (b) "a colorful field behind
   every glass surface" and (c) "a defined-edge floor" were **named load-bearing and then HELD** —
   i.e., BC's own plan *knew* the fix was 3-legged and shipped 1 of 3, then closed the wave green.
   `/foundations/intro field count — 0 fields, 24 glass` is the live measurement: not one of 24 glass
   surfaces on that route has a colorful backdrop to transmit, so warming the token cannot produce a
   warm gestalt (a transmissive material with nothing behind it composites to whatever the flat page
   is — here `--neutral-0` at OKLab hue 84.6°, "flat, near-achromatic, yellow-green").
3. **`GOOBLOB-MEATBALL` (Band 4) — the WGSL compile bug was fixed, the *feel* was not.**
   BC's own `DEFERRAL-LEDGER.md` rows `ay-blob-pulse-zeta-bounce` and `ay-blob-flick-pseudopod-copy`
   were explicitly routed to `BC.W-GOOBLOB-MEATBALL` for a decision. The wave's actual shipped
   change (per `EXECUTION-PROGRESS.md` tier 17) was "the WGSL fwidth-in-non-uniform-control-flow fix"
   — a real and necessary rendering-correctness fix, but not a spring/motion tune. `BD.W-BLOB-MOTION-TUNE`
   exists as a later wave specifically because the bounce/pseudopod motion complaints were never
   addressed, only the compile bug that was blocking them from being visible at all.
4. **Aurora shipped off-fence mid-tranche and needed a same-tranche re-run.** `EXECUTION-PROGRESS.md:41`:
   "aurora PALETTE is blue/teal (lib default h220/200) → warm-cream warmth folded into the
   TEAL-NAVY-PURGE re-run; aurora gestalt verdict HELD to re-capture." This is the single instance
   where BC's own paint-capture step (not the challenge/harden loop) *did* catch a real
   warm-everywhere-fence violation before the cut — a genuine positive result for the paint-gate
   thesis — but it also shows how close the process came to shipping a violation of the identity's
   most basic invariant (warm, not blue-teal) and required an unplanned mid-execution correction,
   not something the 19-iteration plan-hardening loop anticipated.
5. **`DESHADCN`/component canon drift.** `docs/tranches/BD/waves/BD.W-BC-COMPONENT-CANON.md:16-24`
   found BC's own wave docs cited two gate names that do not exist on disk (`proof:separator` should
   be `proof:separator-fix`; `proof:padding-canon` should be `proof:card-padding`) — small, but a
   direct instance of the "do not invent a gate" caveat BC's own `CANDIDATE-WAVES.md` discipline
   named, violated inside BC's own shipped wave docs, undetected by the 19-iteration challenge loop
   because that loop checks wave-graph structure, not gate-name-resolves-on-disk.

**Pattern across all five:** BC's paint gate correctly answers "is this pixel non-gray in isolation"
and "does this token resolve to a warm hue," but does not and structurally cannot answer "does this
compose into a gestalt the user reads as liquid glass" — because that judgment requires composing
the surface over its *real* backdrop/context, which several BC gates never did (they read the token
or an isolated specimen, not the live composited route). This is precisely the class of defect the
RESPEC-GESTALT mandate names as "missing obvious issues... gestalt cohesion."

---

## 4 — Findings, ranked by severity

**F1 (BLOCKER-class, corpus-integrity).** `docs/tranches/BG/audit/P-historical-coverage.md:26` makes
a false claim on disk: "BC was tranche-DEV only, never built... The cure was specced, not shipped."
This is refuted by: `git tag` (`v4.1.0` exists), `git log -1 v4.1.0` (`9c0e06e2`, 98 commits past
`v4.0.1`), `docs/tranches/BC/EXECUTION-PROGRESS.md` (28 tiers, all `DONE`, with a "CUT COMPLETE
(2026-06-20)" entry recording the npm publish), and `MEMORY.md`'s own
`project_glassui_410_published.md` fact ("the BC tranche LIVE on npm"). The lens conflated
`BC/FINAL.md` (written at end-of-tranche-*development*, correctly stating "zero src/ edits" as of
*that* document's timestamp) with the tranche's final state after the user later greenlit execution.
**Any BG/BH wave that inherits P-historical-coverage's "BC never shipped" framing is building on a
false premise** — it should instead treat BC as SHIPPED (v4.1.0) with the specific residuals named
in §1/§3 above, not as an unbuilt cure.

**F2 (MAJOR, gestalt).** The glass-material warm-floor fix (BC Band 1, `GLASS-IDENTITY` +
`ADAPTIVE-RECONCILE`) is a partial fix that BC's own gates certified complete. Two of the three
named legs of the real fix (a colorful field behind glass; a defined edge) were explicitly deferred
and are still open two tranches later. Any BG/BH wave touching glass tokens again should read
`docs/tranches/BD/greenfield/glass-material/GOLDEN.md` in full before re-touching chroma tokens —
the diagnosis there is structural (glass is a *relationship*, not a color) and re-litigating leg (a)
would be pure waste.

**F3 (MAJOR, gestalt).** Default/glass Button hover states shipped in BC (`BUTTON-GLASS-IOS`) still
measure as near-gray at rest per BD's live re-measurement (`chroma 0.0138`, same defect class as the
tabs capsule). The root cause (`--glass-tint-strength: 0%` at rest) is a single dormant token —
cheap to fix, but BC's `proof:glass-identity`/`proof:button-glass` gates did not catch it because
they check token-level warmth, not rest-state composited paint.

**F4 (MINOR, process).** The "diverse-lens challenge→harden" discipline, as practiced in BC, is a
plan-graph linter (dangling references, phantom waves, sequencing contradictions), not a
gestalt-quality review. It should not be cited in future tranche retrospectives as evidence of
design-quality rigor; it is evidence of plan-document hygiene. If a BG/BH wave wants a genuine
gestalt-quality challenge loop, it needs a distinct mechanism — e.g., a live-paint diff against a
named aesthetic reference, not a text-consistency pass.

**F5 (MINOR, deferred-item hygiene).** Several BC-era HELD items (blob Snell refraction, blob
pulse/flick motion tuning, per-satellite derived shade, aurora medium lazy-chunk split, the 23
register-held primitives) are still open at BD/BG. None of these are BLOCKER-severity — they were
correctly HELD-with-rationale, not silently dropped — but the current BG cursor should confirm each
still has an honest owner rather than being silently orphaned a third time.

---

## 5 — Fold candidates for the BG/BH tranche plan

1. **plan-doc-edit — correct `P-historical-coverage.md`'s BC characterization.**
   *Kind:* plan-doc-edit. *Detail:* Amend `docs/tranches/BG/audit/P-historical-coverage.md:26` (the
   table row and the surrounding prose at lines 33-35) to state BC EXECUTED and shipped as v4.1.0
   (commit `9c0e06e2`), with the residual gap being *not* "never built" but "built a per-wave paint
   gate that catches isolated-surface grayness, but does not catch whole-route/composited-gestalt
   grayness" (per F2/F3 above). This is a correctness fix to the audit corpus itself, cheap, and
   prevents a downstream wave from re-deriving "build the BC cure" as if it doesn't exist — the cure
   exists; its blind spot is what needs a new wave, not a re-build.

2. **new-wave — a genuine composited-gestalt paint gate (the actual missing BC-generation cure).**
   *Kind:* new-wave. *Detail:* The gestalt approach: rather than another isolated-surface pixel
   reader (`proof:ba-gestalt`'s existing shape), add a gate that captures a **real route** (not a
   synthetic specimen) at rest, with no injected ancestor override, and asserts the *dominant hue
   family* of the composited screenshot region is warm (not merely that some named token resolves
   warm). This directly targets the F2/F3 failure mode: a warm token composited over an achromatic
   page still reads gray. The mechanism should reuse the existing `paint-arm.mjs` shared color-math
   probe (no new color math) but change *what* it samples — a real route screenshot region, not a
   single element's computed style. This is the idiomatic architectural transposition: BC already
   built the "measure paint not source" thesis; this wave completes it by measuring the *composited
   whole*, not the isolated part, closing the exact gap the greenfield audit found by hand.

3. **defer-honest — the blob motion-feel residuals (pulse-bounce, flick-pseudopod, per-satellite shade).**
   *Kind:* defer-honest. *Detail:* These three items have ridden HELD status since AY, through BC,
   and are picked up by name in BD wave docs (`BD.W-BLOB-MOTION-TUNE`, `BD.W-GOOBLOB-SQUIRCLE-REFRACT`).
   Confirm in the current BG/BH plan which wave (if any) currently owns them; if none, either fold
   them into a small, cheap wave (they are named as "a one-constant underdamp tune on the live
   engine" — genuinely small) or explicitly re-HELD with a fresh, honest trigger rather than letting
   them silently vanish a third time.

4. **amend-wave — if a BG/BH wave re-touches glass/button material, cite the BD greenfield GOLDEN
   docs as the starting diagnosis, not BC's Band-1 waves.** *Kind:* amend-wave. *Detail:* Any wave
   currently planned to "fix glass warmth" or "fix button glassiness" in the BG/BH cursor should be
   checked against `docs/tranches/BD/greenfield/{buttons,glass-material}/GOLDEN.md` — those documents
   already contain a converged 3-lens diagnosis (the `.glass-capsule` extraction, the `paper-field`
   plenum, the `--glass-key` cel-light). If BG/BH independently re-diagnoses this from scratch, that
   is duplicated analysis; if the BD GOLDEN docs were never executed, this is the actual remaining
   work-item, and should be represented as such (a BUILD of an already-designed golden, not a fresh
   design pass).
