# BB.W-DOC-FRESHEN — the stale consumer-wiring anti-idiom killed + the README↔CLAUDE.md token-override example made canon-correct + gated

**Name**: W-DOC-FRESHEN - the docs stop teaching the anti-idiom
**Opens after**: Batch 6 open (runs ‖ W-PRECEPT-SYNC ‖ W-NDA-DECIDE ‖ W-AUR-KUWAHARA ‖ W-DELTA-RESHOOT — doc-disjoint bounds; the registry single-owner rule: this wave OWNS `CLAUDE.md`'s Consumer-wiring CSS example + `README.md`'s, and MINTS the example-correctness gate. It does NOT touch the dock README gate-table rows — those are W-CI-GREEN's bound, Batch 0; see Do-NOT-touch). Best landed AFTER W-CI-GREEN's `readme-meta-clean` dock-table sync so the broadened gate reads a green base.
**Agents**: 1 (a focused doc + small-gate wave — the CLAUDE.md/README.md example correction + the born-RED example-parity gate; no source/component edit)
**Hard gate**: `proof:doc-override-idiom` (born-RED) — the Consumer-wiring CSS override example in CLAUDE.md AND README.md overrides the consumer-tunable `--glass-blur-resting-radius` PRIMITIVE (not the COMPOSED `--glass-blur-resting`), the two examples are byte-identical (no second drifting copy), the cited blur value matches the SHIPPED `glass.css` primitive (not the pre-cal `12px`), and the example is now under the gate's read so it can never drift to the composed-token anti-idiom again; + `proof:readme-meta-clean` stays GREEN (this wave does not re-red the dock-table sync W-CI-GREEN owns).
**Status**: SPEC

## Goal criterion

The library's docs stop teaching consumers to FIGHT the W-GLASS-CAL machinery. The `## Consumer wiring` CSS example in CLAUDE.md (`CLAUDE.md:649-653`) and its twin in the public `README.md` (`README.md:61-63`) both show `--glass-blur-resting: blur(12px)` as the way to retune a glass surface. This is the anti-idiom on TWO axes:

1. **It overrides the COMPOSED token.** At HEAD `--glass-blur-resting` is a generated composite — `blur(calc(var(--glass-blur-resting-radius) * var(--glass-level))) saturate(1.05)` (`glass.css:76`) — that threads the `--glass-level` opacity knob (AX.W54) AND the `saturate(1.05)` luminosity companion. A consumer who follows the example and writes `--glass-blur-resting: blur(12px)` DESTROYS both: the surface stops responding to `--glass-level` (the maximal-default opacity axis the whole library rides) and loses its saturate companion. The CONSUMER-TUNABLE knob is the `--glass-blur-resting-radius` PRIMITIVE (`glass.css:45`); overriding it re-tunes the blur while preserving the `* --glass-level` thread + the saturate leg — the exact discipline CLAUDE.md's own "The radius axis ONLY" recipe header records (`glass.css:40`), and the same substitution-vs-redeclaration lesson the dock-scale / glass-tint seams teach (override the PRIMITIVE the composite reads, never the composite).

2. **The value is the PRE-CAL value.** `12px` is the `glass-blur-resting-radius` HEAD value RECORDED in `proof-glass-cal.mjs:61`'s `PRE_WAVE_RADII` as the value BEFORE BA.W-GLASS-CAL dialed the ladder back ~15-20%. The shipped value is `10px` (`glass.css:45`). So the example doc'ed a number the library itself dialed AWAY — a consumer copying it reverts the cal.

After this wave: both examples override `--glass-blur-resting-radius` at the shipped value, the two copies are byte-identical (no third drift), the example sits under a born-RED gate that REDS on a re-introduction of the composed-token override OR a copy-divergence, and a "shared surface-decoration axis"-adjacent canon line in CLAUDE.md records the override-the-primitive rule for the consumer (so the next agent does not re-paste the anti-idiom). The dock README gate-table sync (`proof:readme-meta-clean`'s one live violation) is W-CI-GREEN's — this wave keeps it green, never duplicates it.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the BB.md Batch-6 charge (`BB.md:80` — "the CLAUDE.md stale examples (the `--glass-blur-resting` anti-idiom) + the README gate tables") cross-referenced to the audit lanes L01·L10, NOT a blind re-diagnose. Before touching a byte the agent re-greps each anchor below at HEAD (`f3c4170e` at this authoring) and confirms (a) the composed-vs-primitive token shape still holds and (b) the dock-README gate-table drift is W-CI-GREEN's single-owned fix (so this wave does not collide on `dock/README.md`). If a cite has drifted (a sibling Batch wave re-tuned the blur recipe, W-CI-GREEN already landed the dock rows), the agent records the drift in PROGRESS and re-locates the mechanism — it does NOT re-invent the fix.

Grounding findings (re-verified at BB HEAD this authoring):

- **The composed token shape** — `--glass-blur-resting` is the generated composite, `--glass-blur-resting-radius` is the primitive (`glass.css:45,76`); the dark arm mirrors it with its own saturate/brightness companion (`dark-arm.css:216`). The consumer-tunable axis is the `-radius` primitive — the composite is generated, never hand-set.
- **The two stale example copies** — `CLAUDE.md:649-653` (`/* then override tokens locally */` block) and `README.md:61-63` (`/* override tokens locally for your project */` block) both show `--glass-blur-resting: blur(12px)`. The `--glass-opacity-resting: 0.82` line ABOVE it is a LEGITIMATE override (the bg recipe reads `--glass-opacity-resting` as an INPUT through `--glass-level`, `glass.css:139` — overriding the opacity knob still works); only the BLUR line is the anti-idiom. The opacity line may stay or be re-pointed to the shipped `0.65` for accuracy — see Scope 1's note.
- **The pre-cal provenance** — `proof-glass-cal.mjs:61` records `glass-blur-resting-radius: 12` as the pre-wave HEAD baseline; the gate is GREEN reading the shipped dialed-back `10` (`node scripts/proof-glass-cal.mjs` → `resting=10`). The doc's `12px` is the reverted-cal number.
- **The gate-table drift is single-owned by W-CI-GREEN** — `proof:readme-meta-clean` has EXACTLY ONE live violation at HEAD (`dock/README.md gate table missing shipped gate(s): proof:dock-sections, proof:dock-morph-insitu, proof:dock-plate-clearance`), and W-CI-GREEN scope 2 + its `dock/README.md` file bound own that exact append. This wave does NOT touch those rows.
- **The CLAUDE.md/README.md example is GATE-FREE** — no gate reads the consumer-wiring CSS block for token-override correctness (a `grep` of `scripts/` for `glass-blur-resting`/`Consumer wiring`/`override tokens` returns only `proof-glass-cal.mjs`/`proof-dark-material.mjs`, which read the SOURCE recipe, never the doc example). So the anti-idiom shipped under zero machine check — this wave mints the first.

RE-GROUND command set (run all; confirm each mechanism):

```
# 1. The composed-vs-primitive token shape (the override discipline)
sed -n '40,46p'   src/styles/tokens/glass.css          # the "radius axis ONLY" recipe header + the --glass-blur-resting-radius: 10px primitive
sed -n '75,77p'   src/styles/tokens/glass.css          # --glass-blur-resting: blur(calc(--glass-blur-resting-radius * --glass-level)) saturate(1.05)  ← composed
sed -n '216,216p' src/styles/tokens/dark-arm.css       # the dark composite (own saturate/brightness)

# 2. The two stale example copies (the anti-idiom, twice)
sed -n '642,654p' CLAUDE.md                            # the Consumer-wiring CSS example
sed -n '55,64p'   README.md                            # the README twin

# 3. The pre-cal provenance (12 → 10)
sed -n '58,64p'   scripts/proof-glass-cal.mjs          # PRE_WAVE_RADII.glass-blur-resting-radius == 12 (the reverted-cal number)
node scripts/proof-glass-cal.mjs                       # GREEN: resting=10 (the shipped dialed-back value)

# 4. The gate-table drift is W-CI-GREEN's single-owned fix (DO NOT collide)
node scripts/proof-readme-meta-clean.mjs               # ONE violation: the dock-table 3 missing gates (W-CI-GREEN scope 2)
grep -n 'dock/README.md\|readme-meta-clean' docs/tranches/BB/waves/BB.W-CI-GREEN.md   # confirm the single-owner

# 5. The example is gate-free (the anti-idiom shipped unchecked)
grep -rln 'glass-blur-resting\|Consumer wiring\|override tokens' scripts/   # only the SOURCE-reading cal/dark gates, NOT the doc example
```

Captures / authority cross-references:
- `BB.md:80` (the Batch-6 charge) + `BB.md §3` (the L01·L10 lane sources) + `BB.md §1` Batch 6 (decide-don't-rebook, the doc-sync discipline).
- `docs/precepts/design-idioms.md` (W-PRECEPT-SYNC's bound — the BINDING idiom home; the override-the-primitive discipline is recorded there as the canonical idiom, NOT re-minted here; coordination note in Do-NOT-touch).
- CLAUDE.md's own "substitution-vs-inheritance" lessons (the dock-scale `--dock-scale` re-declare trap, the glass-tint `--glass-bg-dock` pre-substituted trap) — the SAME discipline this doc example violated: override the primitive the composite reads, never the composite.

## The defect table (file:line — RE-GREP at HEAD)

| # | site | file:line (the cause at HEAD) | the mechanism | fix-class |
|---|---|---|---|---|
| 1 | CLAUDE.md consumer-wiring blur override | `CLAUDE.md:652` (`--glass-blur-resting: blur(12px);`) | overrides the COMPOSED token (kills `* --glass-level` + `saturate(1.05)`) AND cites the pre-cal `12px`; the tunable knob is `--glass-blur-resting-radius` at `10px` | **doc-prose (the anti-idiom)** |
| 2 | README.md consumer-wiring blur override | `README.md:63` (`--glass-blur-resting: blur(12px);`) | the byte-identical anti-idiom in the PUBLIC-facing README — the worse copy (consumers read it first) | **doc-prose (the anti-idiom)** |
| 3 | the example is gate-free | no `scripts/*` reads the consumer-wiring CSS block | the anti-idiom shipped under ZERO machine check across ≥4 tranches; a re-paste recurs unflagged | **mint the gate teeth** |
| 4 | the two copies can drift | CLAUDE.md vs README.md (independently authored) | two hand-maintained copies of the SAME canonical example — a fix to one leaves the other stale (the doc-drift class) | **example-parity (gated)** |

## Scope

Gestalt, not a string-swap: the docs teach the CORRECT override idiom (the primitive, at the shipped value), the two copies are unified into ONE canonical form, and a born-RED gate makes the anti-idiom structurally non-recurring. NO new component, NO source recipe edit, NO backwards-compat alias (the docs are corrected in place, not annotated with a "was 12px" provenance line — greenfield doc, the value.js no-meta rule).

1. **Re-point the CLAUDE.md consumer-wiring CSS example onto the `-radius` primitive at the shipped value.** `CLAUDE.md:652` `--glass-blur-resting: blur(12px);` → `--glass-blur-resting-radius: 10px;` (the primitive the composite reads, at the SHIPPED `glass.css:45` value). A one-line clarifying comment in the CSS block records WHY it is the `-radius` primitive (`/* the consumer-tunable radius primitive — the composed --glass-blur-resting threads --glass-level + saturate, never override it directly */`), short, in the example's register. The `--glass-opacity-resting: 0.82` line ABOVE it is a LEGITIMATE override (the bg recipe reads it as an input through `--glass-level`); KEEP it as the demonstration that opacity IS a direct-override knob (the example then teaches BOTH idioms — a direct-input knob `--glass-opacity-resting`, and a composite-feeding primitive `--glass-blur-resting-radius` — which is pedagogically richer than two of the same). Re-grep the shipped `glass.css:45` value at edit-time; if a sibling Batch wave re-tuned it off 10, use the re-grepped HEAD value (the gate reads the source, so the example must match HEAD).

2. **Apply the identical correction to the README.md twin.** `README.md:63` gets the SAME edit — `--glass-blur-resting-radius: <shipped-value>px;` + the same clarifying comment — so the two examples are byte-identical (the parity the gate asserts). The README is the public-facing copy a consumer reads FIRST; it is the higher-priority fix of the two. (The README's opacity line is already `0.82` matching CLAUDE.md — keep it in lockstep.)

3. **Mint `proof:doc-override-idiom` (born-RED) — the first machine check over the consumer-wiring example.** A pure-detector gate (`scripts/proof-doc-override-idiom.mjs`, the comment-strip + source-read house pattern) that reads the Consumer-wiring CSS example out of BOTH `CLAUDE.md` and `README.md` and asserts: (a) the example overrides `--glass-blur-resting-radius` (the primitive), NOT the bare `--glass-blur-resting` composite — a `--glass-blur-resting:` direct-override in the example block REDS (the anti-idiom guard); (b) the cited radius value MATCHES the SHIPPED `glass.css` `--glass-blur-resting-radius` value READ LIVE (so the gate cannot itself go stale — it re-reads the source, never a hardcoded number — the same discipline `readme-meta-clean`'s DOC-SYNC clauses use); (c) the two example blocks are byte-identical for the override lines (the parity guard — a fix to one copy that leaves the other stale REDS). The gate is registered in `package.json` + `scripts/gates.mjs` (tagged `["local","ci"]` — it is a static doc-read, headless-safe, no Playwright) and stays consistent under `proof:gate-script-parity` / `proof:gate-manifest-sound`. **Self-test bite**: the detector REDs on the pre-wave tree (the bare `--glass-blur-resting: blur(12px)` form) AND on a synthetic copy-divergence fixture (one file `10px`, the other `12px`) AND on a synthetic stale-value fixture (the example cites a radius the source moved off) — three falsifiable reds, GREEN only when both copies override the primitive at the live-read source value.

4. **Record the override-the-primitive consumer canon (CLAUDE.md, one line).** Under the Consumer-wiring section (or the adaptive-glass `--glass-level` canon it neighbors), one recorded sentence names the rule: a consumer retunes a glass surface's blur by overriding the `--glass-blur-*-radius` PRIMITIVE (which the composite `--glass-blur-*` reads through `* --glass-level` + its saturate companion), NEVER the composed `--glass-blur-*` directly — the substitution-vs-redeclaration discipline the dock-scale + glass-tint seams already teach, now stated for the consumer-facing blur axis. This is the canon line `proof:doc-override-idiom`'s prose-presence arm asserts (so the rule is recorded, not just the example corrected). It does NOT re-author the design-idioms.md idiom home (W-PRECEPT-SYNC's bound) — it records the CONSUMER-facing override rule in CLAUDE.md, the consumer's doc.

## Triumvirate Dispatch

- **The override-the-primitive idiom is a design-idioms.md concern, not a CLAUDE.md one** — if the agent finds the canonical override discipline genuinely belongs in `docs/precepts/design-idioms.md` (the BINDING idiom home) rather than a CLAUDE.md consumer-facing line, that is a seam-ownership question with W-PRECEPT-SYNC (which owns design-idioms.md this batch). Coordinate: the CONSUMER-facing "override the primitive" rule is CLAUDE.md's (the consumer reads CLAUDE.md / the README); the LIBRARY-author idiom (why the composite is generated) is design-idioms.md's. If the line wants to live in both, W-PRECEPT-SYNC owns the design-idioms.md half — book it there, do not write design-idioms.md from this wave.
- **The gate's source-read reveals the recipe shape moved** — if `proof:doc-override-idiom`'s live-read of `glass.css` for the `--glass-blur-resting-radius` value finds the recipe shape itself changed (a sibling Batch wave re-factored the composite, the primitive renamed), that is a scope-reveal: the example must teach the NEW shape. Re-grep the recipe at HEAD; if the primitive name/shape genuinely moved, update the example to the shipped shape AND the gate's parse to read it — do NOT pin the gate to a stale token name (the gate must follow the source, never freeze it).
- **The dock-README gate-table rows are not green when this wave lands** — if W-CI-GREEN's `readme-meta-clean` dock-table sync has NOT landed when this wave runs (the `proof:readme-meta-clean` base is still RED on the 3 dock gates), this wave's hard-gate clause "`readme-meta-clean` stays GREEN" cannot pass on a base it does not own. Coordinate the sequence: this wave lands AFTER W-CI-GREEN (the Opens-after note), OR — if the orchestrator runs them in parallel — this wave's gate clause asserts only that THIS wave does not ADD a new `readme-meta-clean` violation (the dock-table reds are W-CI-GREEN's, pre-existing, not this wave's regression). Do NOT fix the dock-table rows here to force the base green (that is W-CI-GREEN's single-owned bound — a double-write collision).
- **Diagnostic loop halt** — if `proof:doc-override-idiom` reds after the two example corrections and three iterations have not isolated whether the failure is the byte-parity arm (a whitespace/comment divergence between the two copies), the live-source-read arm (the gate parses a different `glass.css` value than the example shows), or the anti-idiom arm (a residual `--glass-blur-resting:` composite-override line in the block), halt and triumvirate (the suspect is the parity normalization — the two copies' comments/indentation must normalize to byte-equal on the override lines the gate compares).

## File Bounds

| File | Access |
|---|---|
| `CLAUDE.md` | modify (re-point the Consumer-wiring `--glass-blur-resting` override → `--glass-blur-resting-radius` at the shipped value + the clarifying comment + the override-the-primitive consumer canon line — scopes 1, 4) |
| `README.md` | modify (the byte-identical twin correction — scope 2) |
| `scripts/proof-doc-override-idiom.mjs` | create (the born-RED gate — scope 3) |
| `package.json` | modify (register `proof:doc-override-idiom` + add to `proof:all`/the parity aggregate) |
| `scripts/gates.mjs` | modify (register the gate ROW in the registry, tagged `["local","ci"]`) |
| `docs/tranches/BB/audit/visual/W-DOC-FRESHEN-DELTA.md` | create (the before/after example diff + the born-RED→GREEN gate log + the three self-test fixture reds) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge row + the anti-idiom-killed ledger) |

Do NOT touch:
- **`src/components/custom/dock/README.md`** — the dock gate-table rows (`proof:dock-sections`/`proof:dock-morph-insitu`/`proof:dock-plate-clearance`) are **W-CI-GREEN's single-owned bound** (its scope 2, Batch 0). This wave keeps `proof:readme-meta-clean` GREEN but does NOT write the dock README (a double-write collision). The charge's "+ README gate tables" is satisfied by COORDINATING with W-CI-GREEN (the dock-table sync) + BROADENING the doc-check to the consumer-wiring example (the net-new gate), NOT by re-doing W-CI-GREEN's append.
- **`src/styles/tokens/glass.css` + the `--glass-blur-*` recipe** — the SOURCE recipe is correct (the composite generated, the primitive tunable); this wave corrects the DOC example to match it, never the source. The blur radii are W-GLASS-CAL's landed bound (frozen); this wave reads them, never re-tunes them.
- **`scripts/proof-glass-cal.mjs` + `proof-readme-meta-clean.mjs`** — W-GLASS-CAL's source gate + W-CI-GREEN's README gate. This wave's gate (`proof:doc-override-idiom`) is NET-NEW (the consumer-wiring example check), not an extension of either; both stay green after this wave's registration.
- **`docs/precepts/design-idioms.md`** — **W-PRECEPT-SYNC owns the BINDING idiom home** this batch. The override-the-primitive LIBRARY-author idiom (if it wants a home there) is W-PRECEPT-SYNC's; this wave records only the CONSUMER-facing rule in CLAUDE.md (the consumer's doc). Coordination, not a double-write.
- **The standing fences** — no library token gains a demo/ppmycota hue (the example uses only the shipped `--glass-*` knobs); the GL shader internals are untouched (this is a CSS-token doc fix); the slides/value.js/kf foreign trees are untouched.

## Hard Gate

`proof:doc-override-idiom` (born-RED at HEAD, driven GREEN by the wave) — four falsifiable witnesses, each red on the pre-wave tree, plus the `readme-meta-clean` no-regression clause:

1. **W1 — the example overrides the PRIMITIVE, not the composite.** The Consumer-wiring CSS example in BOTH `CLAUDE.md` and `README.md` overrides `--glass-blur-resting-radius` (the tunable primitive); a bare `--glass-blur-resting:` direct-override line in the example block REDS (the anti-idiom guard). RED at HEAD: both files show `--glass-blur-resting: blur(12px);` (the composite override). Assert shape: the example block parse finds `--glass-blur-resting-radius:` AND finds NO bare `--glass-blur-resting:` direct override.
2. **W2 — the cited value matches the SHIPPED source, live-read.** The radius value in the example equals the `--glass-blur-resting-radius` value read LIVE from `src/styles/tokens/glass.css` (not a hardcoded gate number — the gate re-reads the source so it cannot itself go stale). RED at HEAD: the example cites `12px`, the source ships `10px`. **Bite (anti-stale-gate)**: a synthetic fixture moving the source to `9px` while the example still shows `10px` REDS — the gate follows the source, never freezes a number.
3. **W3 — the two copies are byte-identical on the override lines.** The CLAUDE.md and README.md example override lines normalize to byte-equal (the parity guard — a fix to one copy that leaves the other stale REDS). RED-equivalent: a synthetic divergence fixture (one file `10px`, the other `12px`) REDS. Assert shape: the normalized override-line set from both files is identical.
4. **W4 — the consumer canon line is recorded.** CLAUDE.md carries the override-the-primitive consumer rule (one recorded sentence naming "override the `--glass-blur-*-radius` primitive, never the composed `--glass-blur-*`"). RED at HEAD: no such line. Assert shape: the canon sentence is present in CLAUDE.md prose (a presence grep on the rule's signature phrasing).

5. **W5 — `readme-meta-clean` no-regression.** `node scripts/proof-readme-meta-clean.mjs` is no WORSE after this wave than before (this wave adds ZERO new README-meta violation; it touches CLAUDE.md prose + the gate scripts, not the four component READMEs `readme-meta-clean` scans, except the CLAUDE.md DOC-SYNC clauses which this wave's canon line must not trip — re-grep the CLAUDE.md clauses at `proof-readme-meta-clean.mjs:215-228` and confirm the new canon line does not introduce a phantom-composable/removed-gate token they flag). RED-equivalent: vacuously the pre-wave state (the one dock-table violation, W-CI-GREEN's); W5 is the REGRESSION guard — it reds if this wave's CLAUDE.md edit introduces a `readme-meta-clean` DOC-SYNC violation.

**The DELTA capture (this is a DOC/HARNESS wave, not a visual one):** `docs/tranches/BB/audit/visual/W-DOC-FRESHEN-DELTA.md` records (a) the before/after diff of BOTH example blocks (the `blur(12px)` composite-override → the `--glass-blur-resting-radius: 10px` primitive-override, with the AZ-form freshness header: capture date, HEAD sha); (b) the born-RED→GREEN `proof:doc-override-idiom` log; (c) the three self-test fixture reds (the composite-override fixture, the copy-divergence fixture, the stale-value fixture — each proving the gate bites); (d) the `gate-script-parity` + `gate-manifest-sound` + `readme-meta-clean` GREEN-at-close logs. There is NO `proof:ba-gestalt` requirement — this wave paints ZERO pixels (it corrects doc prose + mints a static-read gate); the binding truth is the gate's born-RED→GREEN + the no-regression of the sibling doc gates. The cardinal lesson holds in the doc register: the binding evidence is the captured before/after diff + the gate log with a freshness header, not a close-message claim.

## Format And Lint Cadence

`node scripts/proof-doc-override-idiom.mjs` born-RED before the example edits (proof it fails at HEAD on the `blur(12px)` form), GREEN at close; `npm run proof:gate-script-parity` + `npm run proof:gate-manifest-sound` after the `package.json`/`gates.mjs` registration (the harness must stay sound); `node scripts/proof-readme-meta-clean.mjs` after the CLAUDE.md canon-line edit (confirm no new DOC-SYNC violation); `node scripts/proof-glass-cal.mjs` re-run (confirm the source recipe is untouched — this wave reads it, never edits it); `git diff --check` before close. No `npm run build`/`typecheck` needed (no source/component edit — doc + gate-script only).

## Verification Artefacts

- `docs/tranches/BB/audit/visual/W-DOC-FRESHEN-DELTA.md` — the before/after example diff (freshness header) + the born-RED→GREEN gate log + the three self-test fixture reds + the sibling-gate no-regression logs.
- The `proof:doc-override-idiom` JSON artefact (born-RED `blur(12px)`-composite-override log → GREEN primitive-override-at-shipped-value log).
- The `gate-script-parity` + `gate-manifest-sound` GREEN-at-close outputs (the new gate registered, the harness sound).
- The `readme-meta-clean` no-regression output (the dock-table violation is W-CI-GREEN's, unchanged; no new CLAUDE.md DOC-SYNC violation from the canon line).

## Commit Plan

- doc commit: `docs: kill the glass-blur-resting composite-override anti-idiom — override the -radius primitive at the shipped value (CLAUDE.md + README.md) (BB.W-DOC-FRESHEN)` — names the two example corrections + the consumer canon line in the body.
- gate commit: `test(doc): proof:doc-override-idiom born-RED→GREEN — the consumer-wiring example overrides the primitive, copies byte-parity, value live-read from source + parity registration (BB.W-DOC-FRESHEN)` — names the four witnesses + the three self-test fixtures.
- status commit: the `W-DOC-FRESHEN-DELTA.md` + the BB PROGRESS row (the anti-idiom-killed ledger).

## Dependencies

- **Depends on**: nothing structurally. Best landed AFTER W-CI-GREEN (Batch 0) so the `readme-meta-clean` dock-table base is green and this wave's W5 no-regression clause reads a clean base; but it can run parallel (W5 then asserts only that THIS wave adds no new violation — the pre-existing dock-table reds are W-CI-GREEN's, not this wave's regression). It reads (never edits) the W-GLASS-CAL landed `--glass-blur-*-radius` source values.
- **Blocks**: nothing — it is a terminal doc/gate-hardening wave in Batch 6 (decide-don't-rebook). The new `proof:doc-override-idiom` gate runs in the W-CLOSE-BATTERY full set at the 4.1.0 close (the example can never drift back to the anti-idiom).

## Named successors

- **W-PRECEPT-SYNC (Batch 6, parallel)** — owns `docs/precepts/design-idioms.md` (the BINDING idiom home). If the LIBRARY-author override-the-primitive idiom (the rationale for why the composite is generated) wants a home in the idiom corpus alongside this wave's CONSUMER-facing CLAUDE.md line, W-PRECEPT-SYNC records it there. This wave records only the consumer rule; the idiom-home half is booked to W-PRECEPT-SYNC (coordination, not a double-write).
- **W-CI-GREEN (Batch 0)** — owns the dock README gate-table sync (the one live `readme-meta-clean` violation). This wave's W5 no-regression clause depends on that sync being landed (or asserts only no-new-violation if parallel). No file written by both.
- **W-CLOSE-BATTERY (Batch 0) / W-REFLECT3 (Batch 7)** — the full-set close run that executes `proof:doc-override-idiom` (this wave's net-new gate) at the 4.1.0 cut, so the corrected example is locked under the close battery.
