# AX.W33 — AX close: gate-fleet + READMEs + overfitting audit + inheritance cross-walk + FINAL

**Band** M · CLOSE · **Severity** major · **dependsOn** AX.W00…AX.W32 + AX.W34…AX.W42 (ENUMERATED —
every prior wave INCLUDING the W42 morph substrate; LAST, HARD-gated terminal) · **Charter** AX.md §3 (the
`### AX.W33` block, re-locate by name — at HEAD `cdcf331` the block is ~line 2092) + the §1 summary row +
the §2 band-M membership + the §2b band-M
precept row + §4 note 12 (publish-currency — the consumer "still broken" findings are a
stale-registry gap the AX cut PUBLISH resolves; all charter cross-refs re-locate by section/note name, never
raw line — line anchors are `eaba94f`-relative and drift at HEAD `cdcf331`) · **Audit** `deep-audit-corpus.json`
slice 31 `aw-plan-delivery-audit` (the CENTRAL slice — F4 the renumbered-thrice never-reached close, F7
the cardinal headless-green/visually-broken gate-philosophy gap, F8 the READMEs-over-a-dead-substrate
currency defect) + slice 7 F0 / 11 F2 / 13 F5 (the aurora/blob README planned→landed-against-LIVE sweep)
+ slice 22 F3 (the `proof-*.mjs`↔package.json meta-gate) + slice 25 F0 / 26 F4 / 27 (the gate-tag-parity
close) · **Constellation** `constellation-analysis-corpus.json` slice 31 `harden:encapsulation-close` F6
(dependsOn-ALL→enumerated + the gate-fleet meta-assertion), F11 (README π-capture run-id + post-dates the
substrate-repair waves), F13 (W24 owns the specific `proof:deck-progress-rail` entry, W33 owns the
FLEET-WIDE meta-gate) + slice 26 `chronic-deferrals` (the chronic-closure / phantom-owner anti-pattern +
the carry-closure BD-G7 gate) + slice 25 `edict-recap-completeness` / slice 27 `precept-alignment` (the
P-inv-28 inheritance-ledger cross-walk + the precepts-pin ι-sweep)

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD on **SIX falsifiable witnesses**, each re-confirmed LIVE at write-time
against `at-dock-convergence @ cdcf331` (HEAD; `eaba94f` was the spec-authoring anchor — the `src` close
machinery is unchanged across the interval, so the witnesses re-confirm verbatim; re-locate by name, never
raw line). (Per the §0 cardinal "re-verify before acting" + the AX.W00
wave-open ritual — the AW close never ran, so the close machinery is provably absent, not stale.)

- **RED witness 1 — `proof:ax-final` does NOT exist (the release close-gate is absent).** `ls
  scripts/proof-ax-final.mjs` → No such file; `grep -c '"proof:ax-final"' package.json` → `0`. The
  identical AW.W33 hole (`scripts/proof-aw-final.mjs` MISSING, slice 31 F4) recurs at AX HEAD: there is no
  aggregate close gate, no `docs/tranches/AX/FINAL.md`, no `docs/tranches/AX/PROGRESS.md` (all three `ls`
  → No such file). *The falsifiable RED: the close gate + FINAL + PROGRESS do not exist; the wave that
  authors them cannot be GREEN until they do. A tranche cannot "ship" without this wave.*

- **RED witness 2 — the `proof-*.mjs`↔package.json meta-gate is RED at HEAD (12 orphan scripts).** A
  fleet-wide sweep (`for f in scripts/proof-*.mjs; do key=proof:$(basename …); grep -q "\"$key\""
  package.json || echo MISSING; done`) finds **12 of 93** `proof-*.mjs` scripts with NO matching `proof:`
  package.json entry — including `proof:deck-progress-rail` (slice 22 F3), `proof:dock-big-dock`,
  `proof:resolution-contract`, `proof:theme-style`, `proof:glass-panel-tiers`, `proof:frostshader-deleted`,
  `proof:dock-controls-split`, `proof:datatable-split`, `proof:composable-return-types`,
  `proof:affordance-contrast`, `proof:consumers-static`, `proof:supports-post-task-wired`. *The falsifiable
  RED: a meta-gate asserting every `scripts/proof-*.mjs` has a matching `proof:*` package.json entry returns
  non-zero (12 misses) at HEAD; the AX gate-fleet (W00's π gates, W21's `proof:no-retired-survivor`, W24's
  `proof:deck-progress-rail`, W25a/W27a's CSS/legacy gates, W41's supplier-edge gates) is partially
  hand-registered.*

- **RED witness 3 — `proof:no-retired-survivor` is authored (W21) but NOT registered.** `grep -c
  no-retired-survivor package.json` → `0`; W21's spec authors `scripts/proof-no-retired-survivor.mjs` with
  its registration explicitly routed to W33 (W21:236 "registration in `gates.mjs` → W33"). *The falsifiable
  RED: the gate the MIGRATION.md-honesty repair depends on is not in the gate fleet at HEAD; W33 registers
  it with correct local/ci/release tags.*

- **RED witness 4 — the four research-backed READMEs describe surfaces that did NOT paint, with stale
  `(planned — AW.Wn)` prose.** `ls src/components/custom/{aurora,goo-blob,dock,constellation}/README.md` →
  all four PRESENT (aurora 634L, goo-blob 413L, dock 288L, constellation 267L; slice 31 F8). But
  `aurora/README.md:312` reads "Palette interpolation is currently linear-sRGB; OKLCh is the next color
  step" (a planned→landed lie — the OKLCh migration is LANDED + gated, §4 note 7 / slice 7 F0);
  `goo-blob/README.md:91/142` document `smoothK 0.28/0.22` vs `types.ts:167` `smoothK 0.12` (slice 11 F2),
  README:120 lists pause/resume in the Exposed table that GooBlob.vue does not expose, README:255-258
  flags shipped iridescence/SSS/rest-pose as "Planned" (slice 13 F5). The READMEs were written from the
  static-bake thumbnails + the wave specs, decoupled from the dead live substrate (slice 31 F8 root). *The
  falsifiable RED: a README-currency assertion (every visual claim cites a live π-lane capture run-id that
  POST-DATES the substrate-repair waves W07/W08/W15/W16/W17; zero `(planned — *)` prose for landed work)
  FAILS at HEAD — the captures do not exist and the planned-prose survives.*

- **RED witness 5 — there is NO inheritance-ledger cross-walk (P-inv-28 zero-deferral close unmet).**
  `docs/tranches/AX/REQUIREMENTS.md §13` (10 chronically-deferred items) + §14 (the AW-plan-vs-delivery
  audit) are PROSE; `ls docs/tranches/AX/archive/` → No such directory. P invariant 28
  (`precepts/instructions/tranche/SPEC.md:191`) retires "deferred to next tranche" as a close-state — every
  item must exit ADDRESSED-at-Wnn / RETIRES-with-rationale / ARCHIVES (with `docs/tranches/AX/archive/<item>.md`).
  *The falsifiable RED: a cross-walk enumerating every §13 + §14 item with its disposition does not exist;
  the close-honesty checklist cannot resolve a disposition for any of the 10 §13 items.*

- **RED witness 6 — there is NO machine-checkable carry-closure gate (the bbnf BD-G7 form).** AX tracks
  deferrals as REQUIREMENTS §13 prose with no `rg`-checkable terminal (digest line 107-108). Every AX wave
  marked "done" must carry a SYSTEM-property gate OR (for cross-repo handoffs) a born-RED PAIRED gate — a
  bare "handed off" tag is NOT a terminal (the chronic-closure meta-invariant; the M1/M2/M3 re-paper class
  the AW READMEs exemplify). *The falsifiable RED: a carry-closure meta-assertion (every AX deferred item is
  closed in a wave OR carries an explicit `{receiver, close-gate}`; W34's `{receiver-wave, close-gate}`
  ledger is the primary input) returns non-zero un-receivered carries at HEAD.*

The HardGate drives all six witnesses RED→GREEN by AUTHORING the close machinery — the registered AX
gate-fleet + `proof:ax-final` + the live-π README sweep + the overfitting audit + the inheritance-ledger
cross-walk + the carry-closure gate + FINAL.md. This is the TERMINAL wave: it is the last to land, it
dependsOn EVERY prior wave (enumerated, not "ALL" — the antidote to the AW.W33 renumber-drift), and a
tranche cannot close without it green.

---

## Goal

Bake the AX close as a concrete HARD-gated terminal wave — every AX gate registered with correct
local/ci/release tags + a meta-asserted fleet, `proof:ax-final` aggregating the close, all four READMEs
swept planned→landed AND re-audited against live π-lane captures that post-date the substrate-repair
waves, the overfitting audit clean + spot-verified, the §13/§14 inheritance-ledger cross-walked to zero
residuals-or-archives (P-inv-28), the carry-closure gate returning zero un-receivered carries, and
FINAL.md reconciling the goal criterion honestly — so a tranche provably cannot "ship" without this wave
green.

---

## Scope (the gestalt fix — the HARD-gated terminal close, no silent deferral, no renumber-drift)

The root cause is the **AW close that never ran** (slice 31 F4 — the close wave renumbered three times
W18→W21→W27→W33 as bands inserted ahead of it, then died on the session-limit halt; the tranche shipped
3.4.0→3.6.0 + batch-1 WITHOUT a formal close — no `proof:aw-final`, no FINAL.md, the gate-fleet
hand-registered, the overfitting audit + π lane + READMEs-vs-live never run). AX absorbs the close as a
CONCRETE wave (not a deferred "close afterthought") with a machine-checkable terminal so it cannot
renumber-drift the AW way. The gestalt is **make the close fail-CLOSED**: every assertion the AW close
made on prose (READMEs "exist", gates "registered", "nothing dropped") becomes a born-RED→GREEN gate.

**(1) Register every AX gate with correct local/ci/release tags + run the fleet meta-assertion (slice
22 F3; constellation slice 31 F6/F13; §4 notes 19-21).** Register in `scripts/gates.mjs` every new AX
gate authored across the tranche — the π lane (W00 `proof:substrate-paints-color`,
`proof:dock-animation-live` fail-CLOSED, `proof:aurora-webgpu-render`, `proof:offscreen-pause`), the dock
band (W04 wrap-reflow, W05 `proof:spring-tokens-synced` widened + the `--ease-apple-spring` sweep, W06
`proof:storybook-ia`/`proof:no-orphan-demo-route`), the graphics gates (W07/W08/W09), W21's
`proof:no-retired-survivor` (RED witness 3 — authored W21, REGISTERED here), W24's
`proof:deck-progress-rail` (W24 owns the SPECIFIC entry — slice 31 F13; W33 does NOT re-register it),
W25a's `.css`-aware `proof:no-god-module`, W27a's `proof:tag-parity` + `proof:fail-explicit`/
`proof:no-legacy-commentary` release-promotion + `proof:var-in-arbitrary-guard`, W36's `proof:forced-colors`,
W37's `proof:canvas2d-lifecycle`/`proof:text-highlight`, W38's `proof:configurator-glass-atoms`, W39's
`proof:lighthouse-demo`, W40's re-baselined `proof:demo-dock-nav`/`proof:animation-coherence`/
`proof:design-md-current`/`proof:naming-consistency`, W41's `proof:build-watch-dts`/
`proof:peer-devdep-parity`/`proof:peer-conformance`, W42's `proof:morph-substrate-single` (the unified
liquid-morph substrate's one-driver-per-axis / 3-state-lifecycle π gate — registered here so the morph
substrate cannot escape the fleet meta-assert). Apply the **at-LEAST-ci tag model** (§4 note 21 / slice
31 F6 / slice 26 F4): the manifest's real parity claim is `local==ci`, with `release` a deliberate subset;
the meta-assertion is "every non-sibling static `src/`-scan gate carries at LEAST `ci`", with the 2 legacy
gates (`fail-explicit`/`no-legacy-commentary`) + the 2 legacy-lane gates W27a names tagged
`['local','ci','release']` as the documented exception. Then run TWO meta-gates: (a) the
**proof-script↔manifest meta-gate** (RED witness 2 — every `scripts/proof-*.mjs` has a matching `proof:*`
package.json entry; 12 orphans GREEN→0); (b) the **tag-parity probe** (`gates.mjs --verify-ci` passes;
`gatesFor("release")` non-empty). W27a is the tag-MODEL author shared with W25a; W33 RUNS the fleet-wide
meta-assert as a close concern (NOT re-deciding the model — slice 31 F13 ownership split).

**(2) Author `proof:ax-final` — the aggregate release gate (modeled on `proof:au-final`).** Mirror
`scripts/proof-au-final.mjs` (release-only, NOT ci; DEV-meta — greens once FINAL + the changeset exist;
no born-RED@HEAD beyond the missing-file witness). It asserts, on a CLEAN tree at the tag boundary:
(a) **FINAL-EXISTS** — `docs/tranches/AX/FINAL.md` exists AND cites a green run per wave via the gate-fleet
regex `${w}\b[\s\S]{0,200}(run|actions|green)` over the ENUMERATED wave id list `W00..W42` (incl. W25a/
W25b/W27a/W27b AND W42 — the morph substrate's `proof:morph-substrate-single` is covered) — drop a wave's
"green" → RED; (b) **GATE-FLEET-REGISTERED** — the proof-script↔manifest
meta-gate returns ZERO orphans + tag-parity passes; (c) **PRIOR-CLOSE-META-ASSERT** — `proof:ax-final`
asserts the prior close-gate machinery existed (the antidote to AW's silent renumber-drift — a close that
cannot prove its own predecessor existed is the loose binding §4 / slice 31 F6 names; constellation digest
line 126 "make proof:ax-final meta-assert the prior close gate existed"); (d) **ZERO-ORPHANS** — the
overfitting audit md exists + records the zero-orphan verdict + the spot-verification result;
(e) **INHERITANCE-LEDGER-CLOSED** — the §13/§14 cross-walk shows zero residuals-or-archives;
(f) **CARRY-CLOSURE** — the carry-closure gate returns zero un-receivered carries;
(g) **CLEAN-TREE** — `git status --porcelain` carries ONLY the pre-existing USER-DOMAIN dirt allowlist (the
`docs/precepts` submodule pointer + the tranche-F `W5-aurora-profile.json` snapshot + `W1-runtime-smoke.json`
+ `W9-consumers.json` — the four entries the gitStatus shows; any OTHER dirty entry → RED, inv-θ);
(h) **STAGED-NOT-PUBLISHED** — a `.changeset/*.md` exists AND `package.json` version is still the pre-cut
line (the changeset stages the bump; `changeset version` is USER-DOMAIN). DEV-meta: the publish itself is
USER-DOMAIN (changeset → push `v*` tag → `release.yml` gated provenance per MEMORY `project_publish_ci_broken`).

**(3) Sweep all four READMEs planned→landed AND re-audit against the LIVE π-lane (slice 7 F0 / 11 F2 / 13
F5 / 31 F8; constellation slice 31 F11).** The READMEs EXIST (RED witness 4) — this is a CURRENCY sweep,
NOT authorship. Two passes: (a) **planned→landed editorial pass** keyed off the registered proof gates:
every `(planned — AW.Wn)` / "currently linear-sRGB" / "next color step" line whose gate is in package.json
becomes a "landed, gated by `proof:X`" line; correct every stale default (goo-blob `smoothK` 0.28/0.22 →
the reconciled 0.12; the `defineExpose` table → the actual exposed surface after W16 lands pause/resume);
re-point the stale source line refs. (b) **live π-capture re-audit** — each README visual claim CITES a
live π-lane capture RUN-ID, and the capture MUST POST-DATE the substrate-repair waves (aurora W07, blob
W08/W15/W16, constellation W17) so the figure shows a PAINTING substrate, not a dead one (constellation
slice 31 F11 — closes the "doc written from the static-bake thumbnail over a maxChannel=0 canvas" root). The
π-lane screenshots BECOME the README figures (treat the README as a visual-truth artefact). Adopt fourier's
before/after + ARCHIVE-not-delete screenshot discipline (digest line 33 fold). All four follow the
**canonical-readme-shape** (`precepts/canonical-readme-shape.md`).

**(4) Run the overfitting audit with the spot-verification gate (the §0 / `audits/overfitting-audit.md`
canonical close angle).** Run the read-only overfitting audit (every `src/` artefact has ≥2 sites OR is
exported OR is a private demo helper). Per the **audit-verdict spot-verification gate**
(`SPEC.md:269-293`): before retiring any `delete-unused`/`library-orphan`/`inline-and-remove` candidate,
spot-verify (a) every cited item EXISTS at its path, (b) every rg count re-runs verbatim accurately, (c)
every "zero consumers" claim resolves the composable name through ALL re-export aliases. Fold the carried
census items: the slides `SlideNutrition` orphan-with-live-import + the `mulberry32`/`menuItemVariants` dup
census (digest line 170 fold — these are slides-repo, recorded in the §4 ledger reconciliation, not a
glass-ui prune); the `value.js` / `goo-blob` PRNG dup that dies with the W08/W14/W17 adoptions. Record the
spot-verification result inline alongside the audit verdict.

**(5) Inheritance-ledger cross-walk — P-inv-28 zero-deferral close (slice 25/27; constellation slice 26;
digest line 343-344).** Enumerate EVERY REQUIREMENTS **§11 + §13 (10) + §14** item (the cross-walk EXTENDS to
§11 per AX.md §4 note 29 — §11.4 brittle-selector/reactivity → W26/W25b, §11.5 library-optimum/gaps-glass-ui-vs-slides
→ W34/§16.3 — so §11 is no longer implicit-only at close) and assign each:
ADDRESSED-at-Wnn (cite the wave + its green gate) / RETIRES-with-rationale / ARCHIVES (write
`docs/tranches/AX/archive/<item>.md` with permanent-out-of-scope justification). "Deferred to next tranche"
is NOT an acceptable close-state. **Confirm at open whether AX is user-bound zero-deferral** (RATIFY-BEFORE-IMPL
— if not bound, deferrals still need a same-tranche named destination per SPEC.md §Close; the likely
disposition is zero-deferral, matching the §16.4 "NOTHING DEFERRED OR DROPPED" mandate AX inherits). The
§13 cross-walk: W19-prune→W28/W29; band-G W29/W30/W32→W38/W23/W39; W33-close→THIS wave; the README deficit
→ THIS wave (3); the `card-lift` var-in-arbitrary non-emit→W25a/W27a; consumer adoptions→W34/W35; slides
H→W30-W32; the headless-green gap→W00. FINAL's hard-gate checklist includes the zero-residuals-or-archives
declaration.

**(6) Carry-closure gate — the bbnf BD-G7 form (constellation slice 26; digest line 107-108).** Author a
machine-checkable carry-closure gate: every AX deferred item (REQUIREMENTS §13/§16.4) is closed in an AX
wave OR carries an explicit `{receiver, close-gate}` carry-tag; the gate (bbnf BD-G7 form — a documented
`rg` over the ledger returns zero un-receivered items IS the gate) asserts ZERO un-receivered carries. The
primary input is **W34's `{receiver-wave, close-gate}` consumer-adoption ledger** (W34 is the §16.4 zero-loss
forcing-function the W33 carry-closure gate reads). Apply the **chronic-closure meta-invariant**: every wave
marked "done" carries a SYSTEM-property gate OR (cross-repo) a born-RED PAIRED gate. NAME the
**phantom-owner re-defer anti-pattern** in FINAL.md (a wave declares itself "the home", ships the sliver,
books the deep half to a next wave the next tranche descopes — the M1/M2/M3 re-paper class) so AX's own 44
waves cannot re-defer the aurora/blob/dock READMEs the AW way.

**(7) inv-26 ADOPTION-ASKS hub reconcile (digest line 66 W33-fold; charter §3 fold e — AU-W0 never
authored it).** Reconcile the speedtest DDR-AS-RC-2/3 ask bundle landed-or-still-open: DockIconButton
coarse-pointer 44px floor (DDR-AS-RC-3 → W19/W06), MetricBadge icon, CompletionSeal/GoldHeadline/CheckDraw
family, ContinuousTimeline check-centring + marker-opt-out, LabeledField for/id (C13-regressed). Each is a
speedtest consumer ask AX must confirm ADDRESSED (route to its wave) or RETIRES (rationale) — the inv-26 hub
the prior tranche never built.

**(8) ι integrity-sweep + the precepts-pin re-sync (charter §3 fold g; digest line 78 W33-fold).** Run the
ι close-ceremony lane (`SPEC.md:199-214`): `git reflog --since=<AX-open>` for agent-attributed mutating ops
(stash/unauthorized-commit/branch-reset → zero is the hard-gate component); `scripts/audit-stash-list.mjs`
(present at HEAD) against the primary repo + every worktree (any agent-attributed stash → close-blocker);
the `git log --since=<AX-open> -- 'docs/precepts/'` walk for unexpected submodule changes. **Bump the
precepts submodule pin past `63240e6`** to the "Before/after + compare-at-close" commit IF owed (the
gitStatus shows `m docs/precepts` dirty at open — confirm the pin re-sync, RATIFY-BEFORE-IMPL: bump only to
a real precepts commit, never a phantom). Sweep configurator `asideSide`/`asideWidth` docs-currency (digest
line 78). Namespace-partition any new numbered precept out of the 28-33 band (collides with fourier
tranche-local invariants — digest line 33).

**(9) Transcribe the surviving multi-tranche KEEP-BOOK ledger + record the standing user-GO carries
(digest line 126 + line 66 W33-folds).** Transcribe into FINAL the surviving KEEP-BOOK ledger items with
their triggers (text-box-trim, the GlassNativeDrawer/`Drawer :native` ≥2-consumer ASK routed to W20,
anchor-positioning, role-typed Dock base) — these are WATCH-with-trigger carries, not dropped. Record the
standing USER-DOMAIN carries (record-only, never act): the 6-tranche cred-consolidate user gate (record,
never move files); the speedtest deploy freeze + ~550-commit unpushed delta as a standing user-GO; the
keyframes.js 3.0.0 baseline-drift reconcile carry; the worktree-hygiene/baseline-drift/vitest-load-flake
constellation-wide process notes. The value.js peer-bump reconciles at the W41 publish hinge.

**(10) Write FINAL.md + PROGRESS.md (the close-honesty terminal).** Author `docs/tranches/AX/FINAL.md` per
`SPEC.md:188-267`: it cites commits + artefacts, reconciles the GOAL criterion honestly (closes
`complete_with_misses` with the goal-miss explicit if ANY goal is unmet — e.g. a consumer-adoption leg that
the AX publish has not yet enabled, or a WebGPU-painterly-parity that DELETE-branched per §4 note 14 — NOT
`complete`), runs the Close-Honesty Checklist (every claim grounded in PROGRESS/artefact; every gate-MET
has a resolving evidence path; every status word matches the latest run; every cross-tranche debt names its
destination). `docs/tranches/AX/PROGRESS.md` matches reality. Re-run the **AW.W31 coherence re-audit
confirmation** (charter §3 fold f) — `proof:animation-coherence`/`design-md-current`/`naming-consistency`
re-ran against the AX-REBUILT motion surfaces in W40; W33 CONFIRMS the W40 re-run is green (W40 owns the
re-run; W33 confirms it in the close).

**(11) §24 SHARED-STATE lineage-merge + the 3.8.0 cut + post-publish prod-validation (REQUIREMENTS §24;
HARDENING §F.1/§F.2; the publish keystone).** Before the changeset cut, VERIFY-PRESENT-OR-MERGE the 3.7.0
source deltas onto the AX line — the **fourier-field** addition, the **useCanvas2D** lift, and the
**constellation-fix** (the three deltas that landed between the 3.6.0 cut and the 3.7.0 line). At HEAD
`cdcf331` these are VERIFIED ALREADY PRESENT on `at-dock-convergence` (the intervening commits are
AX-docs + fourier-field; the `src` baseline carries them) — so the step is a verify-present assertion in the
common case, and a forward-merge ONLY if a re-diagnosis finds a delta missing (a satisfied witness →
scope-collapse, never a re-do, per the §F.3 satisfied-witness branch). Then cut **3.8.0**: stage the
`.changeset/*.md` (the bump from 3.7.0 → 3.8.0; `changeset version` rides the publish), and after the
publish + the slides merge-to-main → `deploy-pages.yml`, run the post-publish prod-validation — `npm view
@mkbabb/glass-ui version` == 3.8.0 + `https://slides.friday.institute` → HTTP 200 on the CUSTOM domain with
the AX-deck content marker + the pptx-200 links (per the Dependencies post-publish prod-validation bullet +
§F.2). FINAL reconciles the three legs (npm-live + slides-live + content-marker); any unmet leg →
`complete_with_misses` with the leg explicit.

This wave touches NO `src/` component code, NO shader, NO style cascade beyond the README markdown — it is
the gate-fleet + close-machinery authorship wave. It is the LAST wave to land (the terminal); every other
wave is its dependsOn (enumerated).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

W33 is close-machinery authorship + README currency. It writes NO `src/` component/shader/style code.

| File | Edit |
|------|------|
| `scripts/gates.mjs` | **MODIFY** — register every new AX gate (the π lane, dock, graphics, W21 `proof:no-retired-survivor`, W25a/W27a/W36/W37/W38/W39/W40/W41/W42 gates — incl. W42's `proof:morph-substrate-single` morph-substrate gate) with the at-LEAST-ci tag model + the 2 legacy gates as the `['local','ci','release']` exception. (DISJOINT from W27a, which AUTHORS the tag-MODEL + the tag-parity probe + promotes the 2 legacy gates; W33 REGISTERS the rest of the fleet against that model + runs the fleet-wide meta-assert. Coordinate the gate-array region.) |
| `scripts/proof-ax-final.mjs` | **NEW** — the aggregate close gate (modeled on `proof-au-final.mjs`); release-only, NOT ci. The 8 assertions (FINAL-EXISTS / GATE-FLEET-REGISTERED / PRIOR-CLOSE-META-ASSERT / ZERO-ORPHANS / INHERITANCE-LEDGER-CLOSED / CARRY-CLOSURE / CLEAN-TREE / STAGED-NOT-PUBLISHED). |
| `scripts/proof-gate-fleet-registered.mjs` | **NEW** — the proof-script↔manifest meta-gate (every `scripts/proof-*.mjs` has a matching `proof:*` package.json entry; 12 orphans → 0) + the fleet-wide tag-parity meta-assert (at-LEAST-ci). |
| `scripts/proof-carry-closure.mjs` | **NEW** — the bbnf BD-G7-form carry-closure gate (every AX deferred item closed-in-a-wave OR `{receiver, close-gate}`-tagged; zero un-receivered carries; reads W34's ledger as input). |
| `scripts/proof-prod-validation.mjs` | **NEW** — the post-publish §21 end-state gate (HardGate 8): asserts `npm view @mkbabb/glass-ui version` == **3.8.0** + `https://slides.friday.institute` → HTTP 200 on the CUSTOM domain + the AX-deck content marker + the pptx-200 links. Release-only, run at the live end-state (after the publish + the slides deploy fire). The §24 lineage-merge verify-present (the 3.7.0 fourier-field/useCanvas2D/constellation-fix deltas) is the changeset precondition. |
| `package.json` | **MODIFY** — register the `scripts` entries for `proof:ax-final`, `proof:gate-fleet-registered`, `proof:carry-closure`, `proof:no-retired-survivor` (W21-authored), and any other orphaned `proof:*` keys for the 12 RED-witness-2 scripts. Add a `.changeset/*.md` (stages the 3.7.0 → **3.8.0** bump; `changeset version` rides the publish). Register `proof:prod-validation` (HardGate 8 — the post-publish `npm view == 3.8.0` + slides-live HTTP-200 + content-marker assertion), release-only, run at the live end-state. NO `exports` change (the `proof:deck-progress-rail` `scripts` entry + the `./deck-progress` export are W24's — slice 31 F13). |
| `src/components/custom/aurora/README.md` | **MODIFY** — planned→landed sweep (the `:312` linear-sRGB/`next color step` lie → "landed, gated by `proof:X`") + live π-capture run-id citations post-dating W07. |
| `src/components/custom/goo-blob/README.md` | **MODIFY** — planned→landed sweep (correct `smoothK` 0.28/0.22→0.12; fix the `defineExpose` pause/resume table; flip iridescence/SSS/rest-pose "Planned"→shipped) + π-capture run-ids post-dating W08/W15/W16. |
| `src/components/custom/dock/README.md` | **MODIFY** — currency sweep against the W01-W06 rebuilt dock + π-capture run-ids. |
| `src/components/custom/constellation/README.md` | **MODIFY** — currency sweep against the W17 abstracted constellation + π-capture run-ids post-dating W17. |
| `docs/tranches/AX/FINAL.md` | **NEW** — the close report (commits + artefacts + goal reconciliation + the phantom-owner anti-pattern naming + the KEEP-BOOK ledger transcription + the standing user-GO carries). |
| `docs/tranches/AX/PROGRESS.md` | **NEW** — matches reality (per-wave green-run citations). |
| `docs/tranches/AX/archive/<item>.md` | **NEW (per ARCHIVED item)** — the P-inv-28 permanent-out-of-scope justifications. |
| `docs/tranches/AX/audit/W33-close-gate-fleet-readmes-overfitting-inheritance-final.json` | **NEW** — the born-RED ledger (the 6 witnesses + live measurements), the inheritance-ledger cross-walk table (§13/§14 → disposition), the overfitting audit verdict + spot-verification, the inv-26 ADOPTION-ASKS reconcile, the ι-sweep result, the carry-closure ledger, the §24 lineage-merge verify-present result (the 3.7.0 fourier-field/useCanvas2D/constellation-fix deltas), and the post-publish prod-validation result (npm `version == 3.8.0` + slides-live HTTP-200 + content-marker + pptx-200). |
| `docs/tranches/AX/waves/AX.W33-close-gate-fleet-readmes-overfitting-inheritance-final.md` | This spec. |
| `docs/precepts` (submodule pointer) | **MODIFY (pin re-sync ONLY, RATIFY-BEFORE-IMPL)** — bump the pin past `63240e6` to a REAL "Before/after + compare-at-close" commit IF owed; never a phantom bump. |

**OUT of bounds (owned by NAMED waves, NOT W33):** the `proof:deck-progress-rail` `scripts` entry + the
`./deck-progress` export (W24 — slice 31 F13); the `proof:no-god-module` `.css` extension + the dist
`@source` deadlink fix (W25a); the tag-MODEL decision + the tag-parity probe authorship + the 2-legacy-gate
promotion (W27a); the `proof:no-retired-survivor` SCRIPT authorship (W21 — W33 only REGISTERS it); the
AW.W31 coherence-gate RE-RUN (W40 — W33 only CONFIRMS it green); the W41 supplier-edge gates' authorship
(W41 — W33 REGISTERS them in the fleet meta-assert); every `src/` component/shader/style edit (the library
waves W01-W41). W33 writes NO consumer source + NO sibling annex (W34/W35 own the cross-repo legs).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W27a (the tag-MODEL + tag-parity probe author).** W27a AUTHORS the at-LEAST-ci tag model, the
  `proof:tag-parity` meta-assert, and promotes the 2 legacy gates (`fail-explicit`/`no-legacy-commentary`)
  to `['local','ci','release']` — the MODEL decision is W27a's first act, shared with W25a (§4 notes 20-21).
  W33 REGISTERS the rest of the AX gate fleet AGAINST that model + RUNS the fleet-wide meta-assert as a close
  concern. **Disjoint by phase:** W27a decides the model + lands the 2-gate exception mid-tranche; W33
  registers the terminal fleet + asserts completeness at close. Both edit `scripts/gates.mjs` — coordinate
  so W27a owns the tag-MODEL region + the legacy-gate tags, W33 appends the late-wave gate registrations.
  W33 must NOT re-decide the tag model (it consumes W27a's at-LEAST-ci form).

- **vs W24 (the deck-progress-rail gate owner).** W24 OWNS registering the SPECIFIC
  `proof:deck-progress-rail` `scripts` entry + the `./deck-progress` export (slice 31 F13 — "W24 registers
  the specific entry; W33 authors the FLEET-WIDE meta-gate"). **Disjoint by gate:** W33's
  proof-script↔manifest meta-gate ASSERTS that `proof:deck-progress-rail` is registered (it is W24's
  registration the meta-gate checks), but W33 does NOT add the `proof:deck-progress-rail` entry itself. A
  double-registration would be the collision; W33's meta-gate is the consumer of W24's act.

- **vs W21 (the no-retired-survivor SCRIPT author).** W21 AUTHORS `scripts/proof-no-retired-survivor.mjs`
  with its `gates.mjs` registration explicitly routed to W33 (W21:236). **Disjoint by act:** W21 writes the
  script; W33 registers it in `gates.mjs` + the `package.json` `scripts` key with correct tags. W33 must NOT
  re-author the script logic (it only registers + tags).

- **vs W40 (the AW.W31 coherence re-RUN owner).** W40 RE-RUNS
  `proof:animation-coherence`/`design-md-current`/`naming-consistency` against the AX-rebuilt motion
  surfaces. **Disjoint by act:** W40 owns the re-run + the rebuilt-surface remediation; W33 only CONFIRMS
  the W40 re-run is green in FINAL (charter §3 fold f). W33 must NOT re-author the coherence gates.

- **vs W34 (the §16 carry-closure ledger INPUT).** W34 authors the `{receiver-wave, close-gate}`
  consumer-adoption ledger + specifies the carry-closure meta-assertion. **Disjoint by ownership:** W34
  SPECIFIES the carry-closure assertion (its ledger is the input); W33 RUNS it at tranche close
  (`proof:carry-closure` reads W34's ledger). W33 must NOT re-author W34's ledger; it consumes it as the
  carry-closure gate's primary input.

- **vs W41 (the supplier-edge gate authors).** W41 AUTHORS `proof:build-watch-dts`/`proof:peer-devdep-parity`/
  `proof:peer-conformance`. **Disjoint by act:** W41 writes those gates + the `src/`/`package.json`
  build-watch edit; W33 REGISTERS them in the fleet meta-assert + cites them in `proof:ax-final`. W33 touches
  no `package.json` build script (the `build:watch` dts arm is W41's).

- **vs the substrate-repair waves (W07/W08/W15/W16/W17).** Each PAINTS a surface; W33's README sweep CITES
  the π-lane captures those waves' close produced. **Disjoint by repo + edit-class:** W07-W17 write
  `src/`/shaders; W33 writes the README markdown citing their π captures. W33 must NOT re-fix a substrate (it
  re-audits the README against the LIVE surface those waves restored).

---

## Triumvirate (implement / adversarially-verify / gate-author split)

The actual glass-ui-side count is **4** (1 gate-fleet + close-machinery author, 1 README-currency author, 1
adversarial-verify lane, 1 gate-author for the 4 net-new close gates), under the AX ≤6-implementation /
≤7-read-only ceiling (NOT the REQUIREMENTS "32-agent" literal — the 32-agent deep-audit + converge already
RAN read-only; their output is this charter, slice 31 the central input).

- **Gate-fleet + close-machinery author (≤1 agent).** Registers every late-wave AX gate in `gates.mjs`
  against W27a's at-LEAST-ci model; registers `proof:no-retired-survivor` (W21) + the 12 RED-witness-2
  orphan keys in `package.json`; authors the inheritance-ledger cross-walk (§13/§14 → ADDRESSED/RETIRES/
  ARCHIVES with the `archive/<item>.md` files); runs the inv-26 ADOPTION-ASKS reconcile + the ι-sweep
  (`audit-stash-list.mjs` + the reflog + the precepts-`git log` walk) + the precepts-pin re-sync; transcribes
  the KEEP-BOOK ledger + the standing user-GO carries; writes FINAL.md + PROGRESS.md.

- **README-currency author (≤1 agent).** Sweeps all four READMEs planned→landed (keyed off the registered
  gates) + cites the live π-lane capture run-ids that POST-DATE the substrate-repair waves; runs the
  overfitting audit + the spot-verification gate (every cited retire-candidate EXISTS + the rg count
  re-runs verbatim + the "zero consumers" resolves through ALL re-export aliases). Touches only the README
  markdown + the audit json.

- **Adversarially-verify (≤1 read-only lane).** Re-runs the 6 RED witnesses against HEAD: (a) confirms
  `proof:ax-final`/FINAL/PROGRESS absent; (b) re-runs the proof-script↔manifest sweep (confirms 12 orphans);
  (c) confirms `proof:no-retired-survivor` unregistered; (d) confirms the README planned-prose + stale
  defaults live at HEAD; (e) confirms no inheritance-ledger cross-walk / `archive/` dir; (f) confirms no
  carry-closure gate. ADVERSARIAL twists: **(i)** confirms the README π captures POST-DATE the
  substrate-repair waves (a README citing a pre-W07 capture shows a maxChannel=0 canvas — slice 31 F8/F11);
  **(ii)** confirms `proof:ax-final` PRIOR-CLOSE-META-ASSERT actually bites (the antidote to renumber-drift
  — a close that cannot prove its predecessor existed is the AW failure); **(iii)** confirms the
  dependsOn is ENUMERATED W00…W42 (not "ALL"), and that the FINAL gate-fleet regex covers EVERY enumerated
  wave id incl. W25a/W25b/W27a/W27b AND W42 — a missing id silently exempts a wave from the close (the W42
  morph substrate is the canonical at-risk id this twist guards; slice 31 F6 / F4);
  **(iv)** confirms the inheritance-ledger has zero "deferred to next tranche" dispositions (P-inv-28);
  **(v)** confirms the carry-closure gate reads W34's ledger (not a stale copy) and returns zero
  un-receivered carries; **(vi)** confirms the publish-currency findings (§4 note 12 — Card specular / VT
  swallow / `useGlobalDark` / `deriveAurora`) are recorded as a publish hinge, NOT re-routed as code
  defects to re-fix; **(vii)** confirms the overfitting spot-verification caught any hallucinated
  retire-candidate (a non-existent flagged item is an integrity-sweep blocker — SPEC.md:286).

- **Gate-author (≤1 agent — 4 net-new close gates).** Authors `scripts/proof-ax-final.mjs` (modeled on
  `proof-au-final.mjs`), `scripts/proof-gate-fleet-registered.mjs` (the proof-script↔manifest meta-gate +
  tag-parity), `scripts/proof-carry-closure.mjs` (the bbnf BD-G7 form), and `scripts/proof-prod-validation.mjs`
  (HardGate 8 — the post-publish `npm view == 3.8.0` + slides-live HTTP-200 + AX-deck content-marker +
  pptx-200 §21 end-state gate). The first three are precept-valid static artefacts
  (build/test/document-reconciliation — NOT grep-only-for-runtime; these are close-machinery / manifest
  artefacts, the legitimate static-gate form per SPEC.md §Hard Gates); `proof:prod-validation` is the
  live-end-state RE-CHECK (registry + HTTP probe, not a runtime-behaviour grep). The VISUAL-TRUTH axis lives
  in the README π-capture re-audit + the FINAL goal reconciliation + the prod-validation live probe (see
  HardGate).

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):**
The wave-agnostic authorization grant is by-reference — AX.md §6.1 (the canonical autonomous-resilience clause) +
§6.2 (the halt-vs-work-around decision tree) + §6.3 (the cross-session clobber ritual — load-bearing on the
post-publish prod-validation leg). The implementing agent works AROUND a roadblock with an idiomatic gestalt fix
in-FileBounds rather than stall; it spawns a tangent triumvirate (research→plan-augment carrying `## Exact
Wave-Amendment Text`→redress; caps 20/15/30) on a scope-reveal, a non-local gate failure, or a 3rd
diagnostic-loop iteration; it escalates ONLY on a §21 held-invariant breach or a §6.2 Class-3/4 user-gate. **The
wave-specific §3a auto-triggers (authored from this wave's FileBounds + HardGate):** (1) an edit reveal OUTSIDE
this close wave's FileBounds — a `src/` component/shader/style defect the README-currency sweep surfaces (owned by
a named library wave W01-W41, NEVER re-fixed here), or a gate-registration that belongs to a NAMED owner (W24's
`proof:deck-progress-rail`, W25a's `.css` god-module extension, W27a's tag-MODEL, W21's `proof:no-retired-survivor`
SCRIPT) the fleet meta-assert must only REGISTER/CONFIRM, not author; (2) `proof:gate-fleet-registered` fails
NON-LOCALLY — a `scripts/proof-*.mjs` lacks its `proof:*` package.json entry (the 12-orphans→0 meta-gate reds), or
the `proof:ax-final` PRIOR-CLOSE-META-ASSERT cannot prove its predecessor, or the FINAL gate-fleet regex does NOT
cover EVERY enumerated wave id W00…W42 (a missing id — W42's `proof:morph-substrate-single` is the canonical
at-risk — silently exempts a wave from the close); (3) the 3rd diagnostic-loop iteration on `proof:prod-validation`
— `npm view @mkbabb/glass-ui version` ≠ 3.8.0, the slides custom domain ≠ HTTP 200 / missing the AX-deck content
marker / dead pptx-200 links (the §21 end-state RE-CHECK that gates the `complete` vs `complete_with_misses`
FINAL); (4) the inheritance-ledger cross-walk surfaces a §13/§14 (or §11) item with NO ADDRESSED/RETIRES/ARCHIVES
disposition, or the carry-closure gate reads a stale W34 ledger / an un-receivered carry (P-inv-28 zero-deferral);
(5) the overfitting spot-verification catches a hallucinated retire-candidate (a flagged item that does not exist
— an integrity-sweep blocker per SPEC.md:286). **The `docs/precepts` pin re-sync is a §6.2 Class-3/held-invariant
boundary** — RATIFY-BEFORE-IMPL, a REAL "Before/after + compare-at-close" commit only, NEVER a phantom bump, and
NEVER staged into the AX drive (the §21 held invariant forbids touching `docs/precepts/`). The `npm view`/HTTP
prod-validation re-check runs at the LIVE end-state; a genuine publish/deploy credential the close chain needs is
the only Class-4 user-gate. This is the LAST, HARD-gated terminal wave — a non-local failure here HALTS the close,
never silently downgrades it.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH clause)

**Close-machinery gates — born-RED→GREEN (precept-valid build/manifest/document-reconciliation artefacts;
SPEC.md:96-104 accepted forms — NOT grep-only-for-runtime, this is the close-machinery / overfitting /
inheritance-ledger axis, the legitimate static-gate form).**

1. **`proof:gate-fleet-registered` — born-RED → GREEN (the proof-script↔manifest meta-gate + tag-parity).**
   Asserts every `scripts/proof-*.mjs` has a matching `proof:*` package.json entry (12 orphans → 0) AND the
   at-LEAST-ci tag-parity meta-assert passes (`gates.mjs --verify-ci` + non-empty release set + the 2 legacy
   gates as the documented `['local','ci','release']` exception). **Born-RED** (12 orphan scripts incl.
   `proof:deck-progress-rail`/`proof:no-retired-survivor` at HEAD); GREEN after registration.

2. **`proof:no-retired-survivor` REGISTERED — born-RED → GREEN.** The W21-authored gate is in `gates.mjs` +
   `package.json` with correct local/ci tags and runs green. **Born-RED** (`grep -c no-retired-survivor
   package.json` → 0 at HEAD); GREEN after W33 registers it.

3. **`proof:carry-closure` — born-RED → GREEN (the bbnf BD-G7 form).** A documented `rg` over the inheritance
   ledger + W34's `{receiver-wave, close-gate}` ledger returns ZERO un-receivered AX deferred items (every
   §13/§16.4 item closed-in-a-wave OR `{receiver, close-gate}`-tagged; no bare "handed off" terminal).
   **Born-RED** (no carry-closure gate at HEAD; un-receivered §13 items exist as prose); GREEN after the
   cross-walk + the routing complete.

4. **The inheritance-ledger cross-walk shows ZERO residuals-or-archives (P-inv-28) — born-RED → GREEN.**
   Every REQUIREMENTS §13 + §14 item carries an ADDRESSED-at-Wnn / RETIRES-with-rationale / ARCHIVES
   disposition; zero "deferred to next tranche". **Born-RED** (no cross-walk + no `archive/` dir at HEAD);
   GREEN after authorship.

5. **The overfitting audit is clean + spot-verified — born-RED → GREEN.** The audit md exists, records the
   zero-orphan verdict, and the spot-verification result (every retire-candidate EXISTS + rg re-runs verbatim
   + zero-consumer resolves through all aliases) is recorded inline. **Born-RED** (no AX overfitting audit at
   HEAD — the AW one never ran, slice 31 F4); GREEN after the audit + spot-verify.

6. **`proof:ax-final` — born-RED → GREEN (the aggregate release gate).** All 8 assertions pass on a clean
   tree (FINAL-EXISTS with the enumerated-wave green-run regex / GATE-FLEET-REGISTERED / PRIOR-CLOSE-META-ASSERT
   / ZERO-ORPHANS / INHERITANCE-LEDGER-CLOSED / CARRY-CLOSURE / CLEAN-TREE / STAGED-NOT-PUBLISHED). **Born-RED**
   (the script does not exist + FINAL does not exist at HEAD); GREEN once the close machinery + FINAL + the
   changeset land. (Release-only, NOT ci — DEV-meta; the publish is USER-DOMAIN.)

7. **ι integrity-sweep returns ZERO unauthorized mutations + ZERO unexpected precept changes — born-RED →
   GREEN.** `git reflog --since=<AX-open>` shows zero agent-attributed stash/unauthorized-commit/branch-reset;
   `audit-stash-list.mjs` returns zero agent-attributed stash entries; the `git log --since -- docs/precepts/`
   walk shows only the AUTHORIZED pin re-sync. **Born-RED** (the sweep has not run at HEAD); GREEN after the
   close-ceremony ι lane.

8. **Post-publish prod-validation — the §21 end-state acceptance gate (born-RED → GREEN at the live
   end-state).** After the publish + the slides merge-to-main → `deploy-pages.yml`: `npm view
   @mkbabb/glass-ui version` == **3.8.0** (the published cut on the registry, NOT the local `package.json`);
   `https://slides.friday.institute` → HTTP 200 on the CUSTOM domain (not a `*.pages.dev` preview) AND the
   served HTML carries the AX-deck content marker (the deck title / a known AX slide id — proving the live
   build is the AX rebuild, not a stale cache); the slides pptx export links resolve 200 (the W32 pptx-200
   assertion). **Born-RED** (npm `latest` is 3.7.0 + the AX deck is not yet live at HEAD); GREEN at the
   published-and-deployed end-state. FINAL closes `complete` only if all three legs (npm-live + slides-live +
   content-marker) hold, else `complete_with_misses` with the unmet leg explicit. (The publish itself rides
   the changeset → `v3.8.0` tag → `release.yml` provenance, pre-authorized per §0b; this gate is the
   live-product RE-CHECK after it, the §21 cardinal "audited GREEN against the live product".)

**VISUAL-TRUTH clause (the NON-NEGOTIABLE AX.W00 close discipline — appearance/interaction axis, NOT a
headless proof alone).** W33's own deliverables are close-machinery (gates, FINAL, ledgers) — but the wave
is the GUARANTOR of the tranche's visual truth, so its VISUAL-TRUTH obligation is REAL, in two forms:
- **(a) The four READMEs are visual-truth artefacts.** Every README figure is a LIVE π-lane capture (a real
  device readback of the painting substrate), and every README visual claim CITES a capture RUN-ID that
  POST-DATES the substrate-repair waves (aurora W07, blob W08/W15/W16, constellation W17). A README sweep
  that cites a pre-repair static-bake thumbnail (the maxChannel=0 canvas root, slice 31 F8/F11) FAILS the
  clause. The π lane is executed for the README capture pass — a live frontend-design audit confirms each
  README screenshot reads as the surface the prose describes (aurora paints color, the blob is a contained
  lit droplet, the dock morphs as one continuous iOS spring, the constellation web is visible against its
  background). This is the structural close of the AW failure (READMEs describing surfaces that never paint).
- **(b) FINAL reconciles the LIVE-AUDITED state of every visual wave.** FINAL.md cites the live-audited state
  of every wave (each visual wave's own π-lane close audit) and reconciles the goal criterion against it —
  closing `complete_with_misses` (with the goal-miss explicit) if ANY visual goal is unmet against the live
  product, NEVER `complete` on a headless-green fleet. The cardinal AX governing precept — "NOTHING is 'done'
  until audited GREEN against the live product" — IS this wave's close criterion.

The wave does NOT close on the headless gates alone: the README π-capture re-audit + the FINAL live-state
reconciliation are the appearance/interaction axis that makes the close fail-CLOSED against the AW lesson.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open) + the 6 RED witnesses.** Re-confirm at HEAD: `proof:ax-final`/
   FINAL/PROGRESS absent (1); the proof-script↔manifest sweep returns 12 orphans (2); `proof:no-retired-survivor`
   unregistered (3); the README planned-prose + stale defaults live (4); no inheritance cross-walk / `archive/`
   (5); no carry-closure gate (6). RATIFY-BEFORE-IMPL: confirm AX is user-bound zero-deferral (likely YES per
   §16.4); confirm the precepts-pin re-sync target is a REAL commit. Do NOT re-fix the publish-currency
   findings (§4 note 12 — they are AT HEAD; the corrective is the publish hinge).
2. **Register the gate fleet (incl. W42's `proof:morph-substrate-single`) + the 12 orphan keys + author the
   4 net-new gates.** Register every late-wave AX gate in `gates.mjs` against W27a's at-LEAST-ci model
   (including W42's `proof:morph-substrate-single` morph-substrate gate); register `proof:no-retired-survivor`
   (W21) + the 12 RED-witness-2 `proof:*` keys in `package.json`. Author `proof-gate-fleet-registered.mjs`
   (meta-gate + tag-parity), `proof-carry-closure.mjs` (BD-G7), `proof-ax-final.mjs` (the 8 assertions,
   modeled on `proof-au-final.mjs`), `proof-prod-validation.mjs` (the post-publish §21 end-state gate). Run
   the meta-gate → 0 orphans.
3. **Sweep the four READMEs planned→landed + the live π-capture re-audit.** Editorial pass keyed off the
   registered gates (the aurora linear-sRGB lie, the goo-blob `smoothK`/`defineExpose`/Planned-sections);
   execute the π lane for the README capture pass (captures post-dating W07/W08/W15/W16/W17); cite the run-ids;
   run the live frontend-design audit per README.
4. **Run the overfitting audit + the spot-verification gate.** Read-only overfitting audit; spot-verify the
   top retire candidates (EXISTS + rg-verbatim + alias-resolved); record the verdict + spot-verify inline.
   Fold the slides SlideNutrition/mulberry32/menuItemVariants dup census into the §4 ledger (recorded, not
   pruned — slides-repo).
5. **Author the inheritance-ledger cross-walk + the inv-26 ADOPTION-ASKS reconcile.** Enumerate §13 (10) +
   §14 → ADDRESSED-at-Wnn / RETIRES / ARCHIVES (`archive/<item>.md`); reconcile the speedtest DDR-AS-RC-2/3
   ask bundle landed-or-still-open. Confirm zero "deferred to next tranche".
6. **Run the carry-closure gate + the chronic-closure discipline.** `proof:carry-closure` reads W34's ledger
   + the inheritance cross-walk → zero un-receivered carries. Name the phantom-owner re-defer anti-pattern.
7. **Run the ι integrity-sweep + the precepts-pin re-sync.** `audit-stash-list.mjs` + the reflog walk + the
   `git log -- docs/precepts/` walk; bump the precepts pin past `63240e6` IF owed; transcribe the KEEP-BOOK
   ledger + the standing user-GO carries.
8. **§24 lineage-merge verify-present + write FINAL.md + PROGRESS.md + confirm the W40 coherence re-run;
   run `proof:ax-final`.** VERIFY-PRESENT the 3.7.0 source deltas (fourier-field / useCanvas2D /
   constellation-fix) on the AX line — present at HEAD `cdcf331`; forward-merge ONLY if a re-diagnosis finds
   one missing (satisfied-witness → scope-collapse). FINAL cites commits + artefacts, reconciles the goal
   criterion honestly (`complete_with_misses` if any goal unmet), runs the Close-Honesty Checklist, confirms
   W40's `animation-coherence`/`design-md-current`/`naming-consistency` green. Add the `.changeset/*.md` (the
   3.7.0 → **3.8.0** bump). Run `proof:ax-final` on a clean tree → GREEN (STAGED-NOT-PUBLISHED at the gate
   boundary).
9. **Publish + post-publish prod-validation (the §21 end-state).** Ride the changeset → push `v3.8.0` tag →
   `release.yml` OIDC-provenance publish (pre-authorized per §0b). After the publish + the slides merge-to-main
   → `deploy-pages.yml` fire, assert the live end-state: `npm view @mkbabb/glass-ui version` == **3.8.0** +
   `https://slides.friday.institute` → HTTP 200 on the CUSTOM domain with the AX-deck content marker + the
   pptx-200 links. FINAL reconciles the three legs; any unmet → `complete_with_misses` with the leg explicit.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W33-close-gate-fleet-readmes-overfitting-inheritance-final.json` — the born-RED
  ledger (the 6 witnesses with live measurements: the 12 orphan proof scripts, the absent close files, the
  README stale-prose line refs), the inheritance-ledger cross-walk table (§13/§14 item → disposition + wave
  + gate), the overfitting audit verdict + the spot-verification result, the inv-26 ADOPTION-ASKS reconcile
  table, the ι-sweep result (reflog + stash + precepts-walk), the carry-closure ledger (zero un-receivered),
  the KEEP-BOOK transcription + the standing user-GO carries.
- `scripts/proof-ax-final.mjs` + its `gate-output` JSON artefact — the 8-assertion aggregate close gate.
- `scripts/proof-gate-fleet-registered.mjs` + `scripts/proof-carry-closure.mjs` + their artefacts.
- `scripts/proof-prod-validation.mjs` + its `gate-output` JSON — the post-publish §21 end-state gate (npm
  `version == 3.8.0` + slides-live HTTP-200 + the AX-deck content marker + the pptx-200 links), recording
  the §24 lineage-merge verify-present result (the 3.7.0 fourier-field/useCanvas2D/constellation-fix deltas).
- The four `src/components/custom/{aurora,goo-blob,dock,constellation}/README.md` swept planned→landed with
  live π-lane capture run-id citations (the captures themselves archived per fourier's before/after
  discipline).
- `docs/tranches/AX/FINAL.md` (commits + artefacts + goal reconciliation + the phantom-owner anti-pattern +
  the KEEP-BOOK ledger + the standing user-GO carries) + `docs/tranches/AX/PROGRESS.md`.
- `docs/tranches/AX/archive/<item>.md` (per ARCHIVED §13/§14 item — the P-inv-28 permanent-out-of-scope
  justifications).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `docs(AX.W33): born-RED baseline — proof:ax-final/FINAL/PROGRESS absent, 12 orphan proof scripts, no-retired-survivor unregistered, READMEs stale, no inheritance cross-walk / carry-closure gate (slice 31 F4/F7/F8 + 22 F3 + 25/26/27)`
2. `chore(gates): register the AX gate fleet + the 12 orphan proof:* keys + author proof:gate-fleet-registered / proof:carry-closure / proof:ax-final (at-LEAST-ci tag model per W27a; register no-retired-survivor per W21; deck-progress-rail stays W24's)`
3. `docs(readme): sweep aurora/goo-blob/dock/constellation READMEs planned→landed + cite live π-lane captures post-dating the substrate-repair waves (slice 7 F0 / 11 F2 / 13 F5 / 31 F8 + constellation F11)`
4. `docs(AX.W33): overfitting audit clean + spot-verified (every retire-candidate EXISTS + rg-verbatim + alias-resolved); SlideNutrition/mulberry32 dup census recorded in §4 ledger`
5. `docs(AX.W33): inheritance-ledger cross-walk (§13/§14 → ADDRESSED/RETIRES/ARCHIVES, zero deferred-to-next-tranche, P-inv-28) + the inv-26 ADOPTION-ASKS reconcile + archive/<item>.md`
6. `docs(AX.W33): carry-closure gate green (zero un-receivered carries; reads W34 ledger) + name the phantom-owner re-defer anti-pattern + the chronic-closure meta-invariant`
7. `chore(close): ι integrity-sweep (zero unauthorized git mutations + stash + the precepts-pin re-sync past 63240e6) + transcribe the KEEP-BOOK ledger + the standing user-GO carries`
8. `docs(AX): FINAL.md + PROGRESS.md — goal reconciled (complete_with_misses if any goal unmet) + W40 coherence re-run confirmed; §24 lineage verify-present (3.7.0 fourier-field/useCanvas2D/constellation-fix deltas) + .changeset 3.7.0→3.8.0; proof:ax-final GREEN on a clean tree (STAGED-NOT-PUBLISHED)`
9. `chore(release): glass-ui 3.8.0 — the AX cut (changeset → v3.8.0 tag → release.yml provenance); post-publish prod-validation (npm view == 3.8.0 + slides.friday.institute 200 + AX-deck content marker + pptx-200)`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash/
checkout per the hardened agent git clause. The precepts-pin re-sync is the ONE authorized submodule
mutation, recorded by ι. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00…AX.W32 + AX.W34…AX.W42 — ENUMERATED, every prior wave INCLUDING the W42 morph substrate (the
  charter `### AX.W33` block — re-locate by name; at HEAD `cdcf331` ~line 2092).** W33 is the TERMINAL wave.
  The dependsOn is ENUMERATED (not "ALL") precisely because a literal
  "ALL" is the loose binding that let AW.W33 renumber-drift (W18→W21→W27→W33, never reached — slice 31 F4 /
  constellation F6). The enumeration is the antidote: the `proof:ax-final` FINAL-EXISTS regex iterates the
  EXPLICIT id list `W00, W01, …, W25a, W25b, …, W27a, W27b, …, W41, W42`, so a wave silently dropped from the
  list is a RED — the W42 morph substrate (`proof:morph-substrate-single`) is the exact id this enumeration
  was extended to keep covered (the W33-drops-W42 contradiction the close exists to prevent, applied to W42
  itself). The substrate-repair waves (W07/W08/W15/W16/W17) MUST be in the list so the README
  live-currency provably runs against PAINTING substrates (constellation F11). The dock/graphics/primitive/
  encapsulation/cross-repo waves MUST be in the list so the gate-fleet meta-assert covers their gates.
- **Why the close cannot run earlier:** the README live-π re-audit needs the substrates to paint (W07/W08/
  W15/W16/W17); the gate-fleet meta-assert needs every gate authored (W00-W42, incl. W42's
  `proof:morph-substrate-single`); the W40 coherence re-run
  must have run against the AX-rebuilt surfaces; the carry-closure gate reads W34's complete ledger; the
  inheritance cross-walk needs every §13 item's wave to have landed. W33 is the LAST to land — the terminal,
  HARD-gated.
- **Routes (not blocks): the publish hinge (the AX cut = 3.8.0).** W33 stages + drives the close to the
  PUBLISHED end-state. The AX cut version is **3.8.0** — the line is at 3.7.0 (npm `latest`, local
  `package.json`) at HEAD `cdcf331`, so the AX bump is `3.7.0 → 3.8.0`. The publish rides the changeset →
  push `v*` tag → `release.yml` OIDC-provenance path (MEMORY `project_publish_ci_broken` — `release.yml`
  FULLY GREEN for glass-ui; the 3.2.0/3.7.0 runs are the proof) and is PRE-AUTHORIZED per the §0b EXECUTION
  MANDATE (NOT user-gated within AX). The W34/W35 consumer-adoption legs + the value.js peer-bump (W41) all
  gate on that publish — W33's `proof:ax-final` STAGED-NOT-PUBLISHED assertion confirms the cut is staged at
  the gate boundary, and the §F.1/§F.2 **post-publish prod-validation** (below) confirms it shipped.
- **Post-publish prod-validation (the §21 end-state acceptance gate; HARDENING §F.1 step 4 / §F.2).** After
  the publish + the merge-to-main → `deploy-pages.yml` fire, W33 asserts the live end-state, NOT just the
  staged tree: (a) `npm view @mkbabb/glass-ui version` == **3.8.0** (the published cut resolved on the
  registry, not the local `package.json`); (b) `https://slides.friday.institute` → HTTP **200** on the
  CUSTOM domain (not a `*.pages.dev` preview) AND serves the AX-rebuilt til-briefing deck — a **content
  marker** in the served HTML (the deck title / a known AX-deck slide id) confirms the AX build is live, not
  a stale cache; (c) the slides pptx export links resolve 200 (the W32 pptx-200 assertion). These ride the
  W33/W32 close per HARDENING §F.1; FINAL reconciles `complete` only if all three legs (npm-live + slides-live
  + content-marker) hold, else `complete_with_misses` with the unmet leg explicit.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited as evidence)

- **The AW close that never ran (slice 31 F4 — the central lineage).** `git log --all | grep -iE
  'W29|W30|W32|W33'` → only the planning commit `293a84b` ("Band G — the new-scope waves (W28-W32) + close
  to W33"); `scripts/proof-aw-final.mjs` MISSING; no `docs/tranches/AW/FINAL.md` / `PROGRESS.md` (both `ls`
  → No such file). The close renumbered W18→W21→W27→W33 as bands inserted ahead, then died on the
  session-limit halt (MEMORY `project_aw_session_limit_halt` — "REMAINING: … band-G, W33"). The tranche
  shipped 3.4.0→3.6.0 + batch-1 @ `eaba94f` WITHOUT a formal close — the cardinal lineage AX absorbs.
- **`scripts/proof-au-final.mjs` (the MODEL for `proof:ax-final`).** The AU close meta-gate (release-only,
  NOT ci; the 5 assertions FINAL-EXISTS / CLEAN-TREE / MATRIX-COHERENT / ZERO-ORPHANS /
  STAGED-NOT-PUBLISHED; the per-wave green-run regex `${w}\b[\s\S]{0,200}(run|actions|green)`; the CLEAN-TREE
  allowlist) — the proven close-gate house pattern W33's `proof:ax-final` extends with the
  PRIOR-CLOSE-META-ASSERT + INHERITANCE-LEDGER-CLOSED + CARRY-CLOSURE assertions. Commit lineage: the AU
  3.3.0 cut (`afdc485` "retire proof:au-final from the release set", `e9c4ffc` "glass-ui 3.3.0 — the AU+AV
  cut").
- **The 12 orphan proof scripts (RED witness 2; slice 22 F3).** `scripts/proof-deck-progress-rail.mjs` PASSES
  standalone but `npm run proof:deck-progress-rail` does not resolve (the `scripts` entry never landed — "a
  casualty of the AW batch-1 integration"); the git dual W16 commit pairs (`a497b1e`/`763b7ed`,
  `a62c76f`/`50b2926`) around the `eaba94f` batch reconcile. The other 11 orphans
  (`proof:dock-big-dock`/`proof:resolution-contract`/`proof:theme-style`/…) are the same hand-registration
  drift class the fleet meta-gate locks.
- **The README-over-a-dead-substrate lineage (slice 31 F8 + 7 F0 + 11 F2 + 13 F5).**
  `aurora/README.md:312-330` (stale "currently linear-sRGB / planned AW.W5") contradicted by
  `composition.glsl.ts:14-29` (OKLab interp LANDED) + `aurora.frag.ts:334-365` (OKLCh saturation landed);
  `goo-blob/README.md:91/142` (`smoothK 0.28/0.22`) vs `types.ts:167` (`smoothK 0.12`); README:120
  (pause/resume in the Exposed table not in `GooBlob.vue:148`); README:255-258 (iridescence/SSS "Planned"
  but shipped in commits `953fdf4`/`365a2e5`); README:296 (composed rest pose "Planned" but shipped in
  `useBlobPointer.rest()`). The READMEs were written from the static-bake thumbnails over the
  maxChannel=0 live canvas — the same headless-green root the π lane closes.
- **The renumber-drift antidote (constellation slice 31 F6; slice 31 NOTES).** AX.md (the `### AX.W33`
  block — re-locate by name; at HEAD `cdcf331` ~line 2092) dependsOn
  ENUMERATED `AX.W00…AX.W32 + AX.W34…AX.W42`; slice 31's proposed AX.W33 dependsOn was a sparse 10-ID list
  (the audit's pre-renumber IDs `AX.W1, AX.W2, AX.W3, AX.W8, AX.W26-W31`); the gate-fleet meta-assertion is
  the machine check the word "ALL" lacked. Slice 31 NOTES: "Do NOT let the close wave renumber-drift the way
  AW.W33 did … fix it at the tail with hard depends-on EVERY wave."
- **The P-inv-28 zero-deferral lineage (digest line 343-344).** P invariant 28 (LESSONS-LEARNED 2026-05-16,
  codified `SPEC.md:191`) retired the "deferral with named-destination" close-path; AX inherits the §13
  ~10-item DEFERRED ledger + the §14 AW-plan-vs-delivery audit. The cross-walk is the structural close.
- **The chronic-closure / carry-ledger lineage (constellation slice 26; digest line 10-11, 107-108).**
  keyframes' M1/M2/M3 re-paper class (`H/audit/_SYNTHESIS-deferred-ledger.md` §0/§1/§2 — four chronics
  "exited" on PAPER via issue-close-masquerade / scope-narrow / column-migrate) + bbnf-lang's BD-G7
  carry-ledger (`BC/audit/W6-bd-carry-contract.md` — `rg -n 'BD->B[A-Z]'` returns zero IS the gate) — the
  discipline W33 adopts so AX's 44 waves cannot re-defer the READMEs the AW way.
- **The ι-sweep + precepts-pin lineage.** `scripts/audit-stash-list.mjs` present at HEAD (the tooling-side
  stash enforcement, SPEC.md:207-214); the precepts submodule pinned `63240e6` (`git -C docs/precepts
  rev-parse` confirmed); the gitStatus shows `m docs/precepts` dirty at open — the pin re-sync target the
  ι-walk authorizes (RATIFY-BEFORE-IMPL).

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-M binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **P invariant 28 — zero-deferral close** (`precepts/instructions/tranche/SPEC.md:191` — "In a
  zero-deferral tranche, every item LANDS, RETIRES with rationale, or ARCHIVES with permanent-out-of-scope
  justification — 'deferred to next tranche' is not an acceptable close-state"). W33's inheritance-ledger
  cross-walk IS this precept: every §13/§14 item exits ADDRESSED-at-Wnn / RETIRES / ARCHIVES
  (`archive/<item>.md`). MUST NOT close any item "deferred to next tranche" (confirm zero-deferral binding at
  open — RATIFY-BEFORE-IMPL).

- **The goal + completion criterion paired at every unit + the close-honesty checklist** (`SPEC.md:188-267`
  — the goal criterion satisfied OR `complete_with_misses` with the goal-miss explicit; every FINAL claim
  grounded in PROGRESS/artefact; every gate-MET evidence path resolves; every status word matches the latest
  run). FINAL.md reconciles the GOAL (the cardinal "NOTHING is 'done' until audited GREEN against the live
  product") honestly. MUST NOT close `complete` if any visual goal is unmet against the live product (the AW
  failure — a green headless fleet over a black canvas).

- **The π visual-runtime lane — binding for every tranche that ships visual changes** (`SPEC.md:216-251`).
  The README figures are live π-lane captures (≥3 viewports, the painting-substrate readback); the FINAL
  goal reconciliation cites each visual wave's live-audited state. MUST NOT cite a static-bake thumbnail / a
  pre-substrate-repair capture for a visual README claim (the slice 31 F8/F11 root). If browser automation
  is unavailable, the π lane runs at the build-verification floor with the tooling reason recorded + a named
  re-probe obligation (the tooling-contingency clause) — but the README currency claim is then provisional.

- **The ι integrity-sweep — a binding close-ceremony step** (`SPEC.md:199-214` — `git reflog` for
  agent-attributed mutating ops; `audit-stash-list.mjs`; the `git log -- docs/precepts/` walk). MUST return
  zero unauthorized git mutations + zero agent-attributed stash + zero unexpected precept changes (the ONE
  authorized precept mutation is the pin re-sync). The hardened agent git clause (`AGENT_DISPATCH_TEMPLATE.md`)
  — agents NEVER stage/commit/stash/checkout; the orchestrator owns the index.

- **The audit-verdict spot-verification gate** (`SPEC.md:269-293`). Before retiring any overfitting-audit
  candidate: (a) every cited item EXISTS, (b) every rg count re-runs verbatim, (c) every "zero consumers"
  resolves the composable name through ALL re-export aliases. MUST NOT prune a hallucinated / under-counted
  candidate (an integrity-sweep blocker). The spot-verification result is recorded inline.

- **The canonical-readme-shape** (`precepts/canonical-readme-shape.md`). All four READMEs follow the shape
  (the one-sentence product description, Install/Usage/Documentation/Contributing/License sections). MUST NOT
  drift the README shape during the planned→landed sweep.

- **Gates close on evidence (no grep-only-for-runtime-behaviour) + the at-LEAST-ci tag model** (`SPEC.md`
  §Hard Gates; §4 notes 19-21). W33's gates are build/manifest/document-reconciliation artefacts
  (precept-valid static-gate forms — close machinery, NOT runtime behaviour); the runtime/visual axis is the
  README π-capture + the FINAL live-state reconciliation. The gate-fleet meta-assert uses the at-LEAST-ci
  model (W27a's authorship; the 2 legacy gates the documented release-parity exception). MUST NOT re-decide
  the tag model (consume W27a's form) + MUST NOT register `proof:deck-progress-rail` (W24's act — slice 31
  F13).

- **The chronic-closure meta-invariant + no-silent-deferrals** (`precepts/instructions/README.md:25-27`;
  the digest hist:keyframes M1/M2/M3 + the BD-G7 carry-ledger form). Every AX wave marked "done" carries a
  SYSTEM-property gate OR (cross-repo) a born-RED PAIRED gate; the carry-closure gate returns zero
  un-receivered carries. MUST NOT declare any item "done" on a bare "handed off" tag; MUST name the
  phantom-owner re-defer anti-pattern in FINAL.

- **cross-repo-dev-resolution contract-v2 / publish-currency** (`docs/precepts/cross-repo-dev-resolution.md`
  invariant 30; §4 note 12). The publish-currency findings (Card specular pointer-wiring, the VT
  `.ready`-swallow, `useGlobalDark({initialValue})`, `deriveAurora`/`resolveAtoms`) are AT HEAD but NOT in
  what a consumer dev-resolves — a publish-currency gap, recorded with the publish hinge (the W41 dts-watch +
  the W33/W34/W35 pin-bump) as the restoration gate. MUST NOT re-route a publish-currency finding as a code
  defect to re-fix (verify against HEAD, then publish).

---

## Hardening amendment (golden pass) — 2026-06-09

The golden hand-challenge (`GOLDEN.md` §B/§C, `audit/hardening/CHRONIC-miss-release.md`,
`CH-close-crossrepo.md`) RE-VERSIONED the close band. Two structural moves: (1) the **soundness gate battery
MOVED to Batch −1** (lands FIRST, the single highest-leverage move — was mis-placed here at the W33-last
terminal); (2) the **publish leg RE-VERSIONED 3.8.0 → 3.9.0** (3.8.0 already shipped — the W33 body says
3.8.0 throughout, a version-drift the close cannot pass its own `proof:ax-final` FINAL gate with). The
amendment also re-sizes the budget rebaseline as the LAST pre-tag act and folds `gates:verify-ci` into the
release set. The close-machinery authorship (the gate-fleet meta-assert, `proof:ax-final`, the README
sweep, the overfitting audit, the inheritance cross-walk, the carry-closure gate, FINAL) — the body above —
is UNCHANGED; the amendment re-pins the SEQUENCE + the VERSION + the budget/CI-parity ownership.

**(A) The soundness battery is Batch −1, NOT a W33 rider.** Per GOLDEN §B, the five soundness gates that
make the chronics IMPOSSIBLE land FIRST, before any glass/dock/page wave: (1) `proof:live-verified-ledger`
(the commit-time hook — any `live-verified` claim or PROGRESS-cell flip MUST attach an on-disk `.png` DELTA;
the SOURCE arm rejects prose/section-markers; retire the `(DEVELOPED)` compound label); (2)
`tsconfig.test.json` (extends tsconfig, includes `[tests/, src/]`) folded into `typecheck` + CI (catches the
stale-import class); (3) `proof:consumer-staleness` (the reverse cross-repo gate — grep every present
sibling's `@mkbabb/glass-ui[/sub]` imports, assert each resolves against the CURRENT surface; the speedtest
`responsive-tabs` 3-site break is a born-RED witness here); (4) `gates:verify-ci` via `gates.mjs --emit-ci`
+ `proof:gen-ci-fresh` byte-match (kill the ci.yml hand-mirror drift — a drifted ci.yml refuses to publish);
(5) `proof:disposition-live` (a BOOK/ARCHIVED item carries forward ONLY if a gate re-evaluates its named
trigger each close). **W33's role re the battery:** W33 no longer AUTHORS these as close riders — it CONFIRMS
they exist and are green at the terminal (the meta-assert reads them as part of the fleet). The `proof:ax-final`
GATE-FLEET-REGISTERED assertion must include the Batch −1 five.

**(B) RE-VERSION the entire publish leg 3.8.0 → 3.9.0.** Every "cut 3.8.0 / npm view == 3.8.0" in §Scope
fold 11, the FileBounds `proof-prod-validation.mjs` row, the `proof:ax-final` STAGED-NOT-PUBLISHED bump
target, HardGate 8, and the Cadence/CommitPlan publish steps are WRONG — 3.8.0 already shipped (from
`c075467` on master). The close cuts **3.9.0**: the `.changeset/*.md` stages the bump from the current line
→ **3.9.0**; `proof:prod-validation` asserts `npm view @mkbabb/glass-ui version == 3.9.0` (not 3.8.0) +
`slides.friday.institute` HTTP-200 + the AX-deck content marker + pptx-200. PROGRESS + MASTER-PLAN already
say 3.9.0; the W33 body did not get the memo. Provenance: the 3.9.0 tag MUST sit on master — re-merge
`at-dock-convergence → master` and re-tag FROM master (master is currently behind HEAD; the "resolved going
forward" claim is a PROGRESS-vs-reality inflation). Add a `release.yml`/`release.sh` master-ancestry guard
(`git merge-base --is-ancestor $SHA origin/master`) so a branch-tip tag cannot publish (the 3.8.0
branch-tip-cut class structurally closed, not FF-luck-resolved).

**(C) The 8th budget rebaseline is the LAST pre-tag act, sized for glass-first CSS + a DOWN-ratchet.** Per
GOLDEN §C Batch 9 + `CHRONIC-miss-release.md` C4: the CSS budget is BREACHING NOW (`dist/styles/index.css`
gzip 144852 / 140000 = 103.5%; the `f2fc614` "unblock the 3.8.0 publish" commit manually unblocked past it),
and W54 (MAXIMAL glass-first) + W55 (adaptive-glass) + W56 (squircle) will ADD MORE CSS. The MASTER-PLAN
Batch 8 sequences "W27a/b carves BEFORE the budget rebaseline" — but the close band must own the EIGHTH
conscious lift as the **LAST act before the 3.9.0 tag**, sized to carry the glass-first + adaptive-glass +
squircle CSS that lands across the tranche (not a Batch-8 rebaseline that the later glass waves re-breach).
Two obligations: (i) `proof:budget-gate-present` (the budget gate is registered + release-tagged + GREEN
before the tag); (ii) a DOWN-ratchet obligation at the close — after the W19/W25/W27 prune+carve waves free
CSS headroom, the ceiling RE-TIGHTENS to the new real draw + headroom, so the budget can FALL, not only
rise (a budget that only ever rises is a growth logbook wearing a gate's clothing — prove it can bite by
tightening it once). The rebaseline is a SINGLE atomic pre-tag commit, NOT a mid-tranche Batch-8 lift the
glass waves invalidate.

**(D) `gates:verify-ci` (or the codegen-fresh check) is in the RELEASE set.** Per GOLDEN G-5 + §B item 4 +
`CHRONIC-miss-release.md` C1/C2: `gates:verify-ci` exits 1 at HEAD (20 ci-tagged gates missing from ci.yml)
but the RELEASE path never runs it — `gates.mjs --list release` does not include it, so `release.sh` +
`release.yml` publish over a 20-gate-drifted ci.yml. The clean-break fix is the Batch −1 `gates.mjs --emit-ci`
codegen + `proof:gen-ci-fresh` byte-match (drift becomes IMPOSSIBLE, not merely detected) — and EITHER the
codegen-fresh check OR `gates:verify-ci` is added to the `release` tag in the manifest so the release path
REFUSES to publish while ci.yml has drifted. W33's `proof:ax-final` GATE-FLEET-REGISTERED assertion + the
fleet meta-assert CONFIRM the ci-parity gate is release-tagged and green. Also resolve the two dangling
ci-tagged scripts (`proof:styling-hygiene` MIA since AW.W20, `proof:glass-card-tiers` MIA since AW.W12) —
FIX or DELETE (clean break, no `KNOWN_DANGLING` amnesty; a known-dangling baseline surviving two tranches is
a fail-open in disguise).

**(E) Orphan-script count correction + the `av-final` dangling lineage.** The §State RED witness 2 says "12
orphan scripts" — the live sweep at HEAD returns **11** (`proof:deck-progress-rail` was registered by W24
since the spec froze): `affordance-contrast, composable-return-types, consumers-static, datatable-split,
dock-big-dock, dock-controls-split, frostshader-deleted, glass-panel-tiers, resolution-contract,
supports-post-task-wired, theme-style`. Re-ground witness 2 to 11 (else it births a false witness). And
`proof:ax-final`'s PRIOR-CLOSE-META-ASSERT points at a BROKEN lineage — `gates.mjs` says "AV is the
successor (`proof:av-final` is its close gate)" but `proof:av-final` never existed (the AU→AV→AX close-gate
chain is broken). W33 must reconcile the dangling `av-final` reference (point the meta-assert at the real
`proof:au-final` predecessor, or document the AV non-close), not assert against a phantom.

**Net:** the close-machinery authorship is unchanged. The amendment moves the soundness battery to Batch −1
(W33 confirms, does not author it), re-versions the publish leg to 3.9.0 with a master-ancestry guard, makes
the 8th budget rebaseline the LAST pre-tag act with a down-ratchet + `proof:budget-gate-present`, folds the
ci-parity gate into the release set (codegen-fresh, clean-break the ci.yml mirror), and corrects the
orphan-count (11) + the dangling `av-final` lineage. The terminal still cannot close `complete` over a RED
CI / a breaching budget / an un-captured DELTA — `complete_with_misses` with the unmet leg explicit
otherwise.
