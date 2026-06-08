# AX.W27a — Legacy gate-hardening: barrel scrub + tag-parity + var-in-arbitrary guard

**Band** J · ENCAPSULATION · **Severity** major · **Mode** tranche-development (this doc is the wave SPEC; no `src`/`scripts`/`demo` edits, no impl, no commit, no git in this session)

**dependsOn** AX.W00 *(the gate-tag MODEL decision is W27a's first act, shared with W25a — §4 note 20)*

The cardinal root-cause this wave closes is **gate-WIRING, not gate-LOGIC** (slice `legacy-excision` VERDICT): two pure-static `src/`-scan gates that the manifest's own header promises run identically local==ci==release are tagged `["local"]` only, so a gate that *exists* never runs *where it gates* — the gate-coverage transposition of the AX cardinal headless-green/visually-broken failure class. W27a is the small, mechanical, born-RED-clearing half of the old W27 (the large 878-ref full-tree sweep is W27b — §4 note 20). It does FOUR coupled things: scrub the 3 barrel tranche-letter refs (turns `proof:no-legacy-commentary` GREEN), promote the 2 mis-tagged legacy gates to release-parity, author the at-LEAST-ci `proof:tag-parity` meta-assert, and root-cause the Tailwind-v4 var-in-arbitrary content-scan-non-emit CLASS with a build-artifact guard gate.

---

## State

**Born-RED — the gates must fail (or be absent) at HEAD before this wave runs.** Four falsifiable RED witnesses, all reproducible at HEAD `eaba94f` on branch `at-dock-convergence`:

1. **`proof:no-legacy-commentary` is RED at HEAD** — 3 tranche-letter refs leaked into the two PRODUCTION re-export barrels:
   - `src/index.ts:130` — `// Custom composites — deck-position rail (AW.W16; a one-prop :value styling …`
   - `src/api/index.ts:157` — `// AW.W16 — DeckProgress, the deck-position rail wrapper (root barrel, no subpath).`
   - `src/api/index.ts:209` — `// so a consumer types its overlay against the node set + scale (AW.W17).`

   Witness: `node scripts/proof-no-legacy-commentary.mjs` reports 3 violations (EXIT≠0). They landed in commit `a62c76f` (AW W16 DeckProgress rail) and shipped because the gate is tagged `["local"]` only.

2. **The 2 legacy-lane gates are MIS-TAGGED `["local"]`** — `scripts/gates.mjs:332` (`proof:fail-explicit`) and `scripts/gates.mjs:344` (`proof:no-legacy-commentary`) both carry `tags: ["local"]`. Witness: `grep -c 'tags: \["local"\]' scripts/gates.mjs` = **5** total (3 are legitimately-sibling-walking gates; these 2 are the exception). Both are pure static `src/` scans, identical in cost/dependency to the 74 ci-bearing static gates. The manifest header (`scripts/gates.mjs:15`, `// So local == ci == release is STRUCTURAL, not coincidental.`) is therefore FALSE for exactly the legacy-excision lane — the one lane §0 puts at the top of the mandate. A future silent-swallow or barrel-archaeology regressor ships GREEN through CI + release.

3. **`proof:tag-parity` does not exist** — there is no `scripts/proof-tag-parity.mjs` and no `proof:tag-parity` package.json entry. Witness: `ls scripts/ | grep tag-parity` returns nothing; `grep -rl 'proof:tag-parity' scripts/` is empty. Nothing structurally prevents the next author from minting another `["local"]`-only static gate (the exact authoring miss that landed witnesses 1+2).

4. **`proof:no-dead-arbitrary` does not exist; ≥1 dead var-in-arbitrary class is LIVE in src/** — `src/components/ui/carousel/CarouselDots.vue:68-69` carries `scale-[var(--scale-hover)]`, the Tailwind-v4 var-in-arbitrary class that emits NO CSS rule (`--scale-hover` IS a defined token at `src/styles/tokens.css:1035`, so the class *looks* live but the content-scanner cannot statically bucket the arbitrary `scale-[var(--…)]` form → zero emitted rule → the "active emphasis" never paints). Witness: no `scripts/proof-no-dead-arbitrary.mjs`; the carousel class has no corresponding rule in the built `dist/glass-ui.css`. The carousel instance (W23) + the card-lift instance (W20) are SYMPTOMS of a class the user explicitly wants ROOT-CAUSED (§13 "root-cause not inline"; digest line 124) — but no AX wave authors the tree-wide sweep + guard gate. W27a is its home.

**The wave is born-RED-correct on all four**: scrub clears 1, the tag promote clears 2, the new meta-assert closes 3 by construction, and the new guard gate closes 4 (after the carousel/card excisions land in W23/W20 — see Disjointness).

---

## Goal

**This wave succeeds if, when work ends, the legacy-excision gate lane is structurally honest — the 3 barrel refs are scrubbed (no `\b[A-Z]{1,2}\.W\d` / `tranche` / `vN.N.N` archaeology in either production barrel body), `proof:fail-explicit` + `proof:no-legacy-commentary` run at local==ci==release as the named release-parity exception, a born-GREEN `proof:tag-parity` meta-assert proves every non-sibling static `src/`-scan gate carries at-LEAST the ci tag (so the next `["local"]`-only legacy gate fails at authoring), and a build-artifact `proof:no-dead-arbitrary` gate fails on a var-in-arbitrary class that emits no CSS** — all four RED witnesses flip GREEN, the W25/W27 internal tag-model contradiction is resolved by the at-LEAST-ci form, and the gate-coverage transposition of the AX cardinal failure class is closed for the legacy lane without redding the 50 unnamed static gates the old "ci+release on every static gate" framing would have flagged.

---

## Scope (the gestalt fix — gate-WIRING root-cause, not symptom patches)

Four coupled, small, mechanical moves — sequenced so the gate is GREEN at every intermediate (no born-RED-that-stays-RED), per the no-quick-fix / one-path / abrogate-before-patch edicts:

### 1. Barrel scrub (clears witness 1)
Rewrite the 3 refs at `src/api/index.ts:157`, `src/api/index.ts:209`, `src/index.ts:130` as **live-scope prose with the tranche letter deleted** — the DeckProgress/Constellation comments restate what the symbol IS, not when it landed. The archaeology, if any reader wants it, lives in `CHANGELOG.md` per the gate's own documented contract (`scripts/proof-no-legacy-commentary.mjs` header: "the audit trail lives in CHANGELOG.md"). This is the no-legacy-code edict: delete the version-history-in-artifact, do not hide it behind a different phrasing that still names a tranche. (KISS — 3 comment lines; NOT the 878-ref tree-wide sweep, which is W27b's whole body.)

### 2. Promote EXACTLY the 2 mis-tagged legacy gates to release-parity (clears witness 2)
In `scripts/gates.mjs`, change `proof:fail-explicit` (line 332) and `proof:no-legacy-commentary` (line 344) from `tags: ["local"]` to `tags: ["local", "ci", "release"]`. **ONLY these 2.** The audit justified promoting exactly these (the 2 of 5 local-only gates that are pure static `src/` scans with no sibling dependency); it did NOT mandate `["local","ci","release"]` on all 71 static gates — that prior "ci+release on every static gate" framing (the old W27) is the internal contradiction this wave RESOLVES, because it would have flagged W25a's own deliberate `["local","ci"]` choice and redded the ~50 unnamed gates that carry only `["local","ci"]` by design (only 21 carry release; §4 note 21). The 2 legacy gates become the **named release-parity exception**, recorded in their gate-entry `note`.

### 3. Author the at-LEAST-ci `proof:tag-parity` meta-assert (closes witness 3 by construction)
A NEW `scripts/proof-tag-parity.mjs` + `proof:tag-parity` package.json entry + gates.mjs registration. The meta-assertion is the **at-LEAST-ci form**: every non-sibling static `src/`-scan gate MUST carry at least the `ci` tag (so a future `["local"]`-only legacy gate fails the parity probe at authoring time). The manifest's real STRUCTURAL parity claim is local==ci (the 3 sibling-walking gates are the legitimate local-only carve-out the probe ALLOW-LISTS by name); `release` is a deliberate SUBSET (21 gates), not a parity floor. So the probe asserts: (a) `local ⊆ ci` for every non-sibling static gate, and (b) the 3 named sibling-walking gates are the ONLY permitted `local`-only entries. It does NOT assert `ci == release`. This is the model the **gate-tag MODEL decision** (W27a's first act, shared with W25a) ratifies; W25a's `proof:no-god-module` `["local","ci"]` tag matches it.

### 4. Root-cause the var-in-arbitrary content-scan-non-emit CLASS + author the build-artifact guard gate (closes witness 4)
A tree-wide content-scan-non-emit SWEEP (the §13 "root-cause, not inline" mandate) plus a NEW `scripts/proof-no-dead-arbitrary.mjs` + `proof:no-dead-arbitrary` gate. **The gate closes on a BUILD ARTIFACT, never on grep** (precept SPEC.md §Hard Gates — "grep found a source string for runtime behaviour" is an INVALID hard gate): build the CSS, enumerate every `<prop>-[var(--…)]` arbitrary class string in the compiled `src/` templates, and assert each one has a corresponding emitted rule in the built `dist/*.css` (or is a Tailwind-recognised arbitrary-property form that DOES emit, e.g. `h-[var(--carousel-nav-size)]` / `w-[var(--reka-popover-trigger-width)]` — these DO emit and MUST NOT be false-flagged). The gate FAILS on a dead class like `scale-[var(--scale-hover)]` that emits zero CSS. The carousel (W23) + card (W20) instances are EXCISED in their own waves; W27a authors the CLASS sweep + the guard so the class cannot recur — it does NOT excise those instances itself (Disjointness).

**NO workaround / NO legacy.** No "deprecated gate-tag alias", no commented-out old tag, no grep-only guard masquerading as a runtime gate, no special-case carve for any gate beyond the 3 named sibling-walking exceptions. The barrel archaeology is DELETED, not rephrased-with-letter. The dead arbitrary class's ROOT is gated, not its two known instances papered over.

### RATIFY-BEFORE-IMPL decisions (the charter flagged these for the wave to ratify)

- **[RATIFY-BEFORE-IMPL] The gate-tag MODEL is the at-LEAST-ci form (recommended; §4 note 21).** W27a's first act (shared with W25a) is to ratify that the manifest's STRUCTURAL parity is `local ⊆ ci` (NOT `ci == release`), that `release` is a deliberate 21-gate subset, and that the 3 sibling-walking gates are the named `local`-only carve-out. **Recommended path: ADOPT the at-LEAST-ci model.** The alternative (ci+release on every static gate) is REJECTED — it reds 50 unnamed gates and self-contradicts W25a's own `["local","ci"]` choice. This decision is load-bearing for both W27a (step 3) and W25a (its no-god-module tag), so it MUST be ratified before either implements.
- **[RATIFY-BEFORE-IMPL] `proof:no-dead-arbitrary` is a BUILD-artifact gate, not a grep gate (recommended).** Ratify that the guard gate compiles the CSS and asserts rule-emission, because a grep-only gate for this runtime-behaviour CLASS is an INVALID hard gate (SPEC.md §Hard Gates). **Recommended path: build-and-assert-emission.** Confirm at open that the build pipeline can expose the compiled per-template CSS to the gate (it can — `dist/glass-ui.css` is the bundle the gate reads).

---

## FileBounds

The EXACT files this wave may touch (for parallel-dispatch disjointness):

**Edit:**
- `src/api/index.ts` — scrub lines 157 + 209 (barrel comment bodies ONLY; no symbol/export change)
- `src/index.ts` — scrub line 130 (barrel comment body ONLY; no symbol/export change)
- `scripts/gates.mjs` — change the 2 legacy gate-entry tags (lines 332, 344) to `["local","ci","release"]` + update their `note`; register `proof:tag-parity` + `proof:no-dead-arbitrary` entries

**Create:**
- `scripts/proof-tag-parity.mjs` — the at-LEAST-ci meta-assert
- `scripts/proof-no-dead-arbitrary.mjs` — the build-artifact var-in-arbitrary guard
- `tests/scripts/proof-tag-parity.test.ts` *(IF a gate self-test is authored — mirrors `tests/scripts/`, NOT `scripts/__tests__/`; the scripts/ test-boundary policy itself is W27b, so this wave's self-tests, if any, already land in the `tests/` tree)*
- `tests/scripts/proof-no-dead-arbitrary.test.ts` *(same boundary)*

**Edit (gate registration only):**
- `package.json` — add the `proof:tag-parity` + `proof:no-dead-arbitrary` script entries; add their CI invocation per the gate-set wiring
- `.github/workflows/ci.yml` *(or the CI gate-set source)* — pick up the 2 promoted gates + the 2 new gates per the `tags` resolution (verify, do not hand-list)

**Do NOT touch:** `scripts/proof-no-legacy-commentary.mjs` TARGETS array (the 2→full-tree generalization is W27b); `src/components/ui/carousel/CarouselDots.vue` (the dead-class EXCISION is W23 — W27a only authors the CLASS gate); the card-lift instance (W20); `src/components/ui/_shared/useStalePropWarning.ts` + `Card.vue` (the Card stale-prop finalize is W27b); `scripts/__tests__/*.test.ts` (the scripts/ test-boundary relocation is W27b); `scripts/proof-fail-explicit.mjs` body (the LOGIC is sound — only its TAG is wrong); any `dist/styles/index.css` `@source` deadlink (W25a); the other 50 `["local","ci"]` gate entries (NOT promoted).

---

## Disjointness

W27a is a J-band ENCAPSULATION sibling of W25a, W25b, W26, W27b. The shared surfaces + how to avoid collision:

- **vs W27b (full-tree commentary sweep + Card stale-prop + scripts/ test-boundary)** — the dominant disjointness. W27b `dependsOn AX.W27a`, so it runs AFTER. W27a touches ONLY the 3 barrel refs (in `src/api/index.ts` + `src/index.ts`) and does NOT touch `scripts/proof-no-legacy-commentary.mjs`'s TARGETS array. W27b generalizes that gate to the full src/+scripts/ walk and does the 878-ref scrub. **Collision avoidance:** W27a's barrel scrub must land FIRST and turn the 2-file gate GREEN; W27b then widens the gate's scope and scrubs the rest. The two never edit the same comment line (W27a owns the 3 barrel lines; W27b owns everything else). W27a's gate-tag model is the contract W27b's full-tree gate inherits.

- **vs W25a (CSS god-module gate-extension)** — `W25a dependsOn AX.W27a` (the gate-tag MODEL precedes). Both edit `scripts/gates.mjs` and both author a NEW gate. **Collision avoidance:** W27a lands the gate-tag MODEL + the 2 tag promotions + 2 new gate registrations; W25a then re-tags `proof:no-god-module` to `["local","ci"]` per the model W27a ratified and registers its own gate. They touch DIFFERENT gate entries in `gates.mjs` (W27a: fail-explicit/no-legacy-commentary + the 2 new entries; W25a: no-god-module). The dist `@source` deadlink fix is W25a's, NOT W27a's. Dispatch W27a strictly before W25a.

- **vs W23 (carousel indicator re-author)** — W23 EXCISES the `scale-[var(--scale-hover)]` instance in `CarouselDots.vue`. W27a authors the `proof:no-dead-arbitrary` CLASS gate but does NOT touch `CarouselDots.vue`. **Collision avoidance:** the gate must tolerate the carousel instance still being present at W27a-close IF W23 has not yet run (the gate ships born-RED on the live symptom and goes GREEN once W23 + W20 excise the two instances), OR W27a sequences after W23/W20 so the gate is born-GREEN. **Recommended:** the guard gate ships ABLE to flag the live symptom (born-RED-tolerant); its GREEN close is reached when W23+W20 land — record this cross-wave dependency in the gate `note`. W27a never edits the carousel/card SFCs.

- **vs W20 (primitive fix — card toggles)** — same pattern as W23: W20 excises the card-lift dead-class instance; W27a authors the gate. No shared file edit.

- **vs W26 (TS god-module + state encapsulation)** — disjoint file sets entirely (W26: useMetaballRenderer/GlassRenderer/sidebar/keyboard-registry splits). No `gates.mjs` collision beyond W26 registering its own split-gates per the W27a tag model.

---

## Triumvirate

Per WAVE_SPEC §3a, the implement / adversarially-verify / gate-author split (≤6 implementation agents — this wave needs 2; ≤7 read-only audit lanes):

- **Implementer (1 agent).** Lands the 4 scope moves: scrub 3 barrel refs; promote 2 gate tags + update notes; author `proof:tag-parity.mjs` (at-LEAST-ci, with the 3-named-sibling allow-list); author `proof:no-dead-arbitrary.mjs` (build-artifact emission assertion); register both in `gates.mjs` + `package.json` + CI. Runs typecheck + the full gate set at every interval.
- **Adversarial verifier (1 read-only audit lane).** Falsifies each gate: (a) re-inject `// AW.W16` into a barrel → `proof:no-legacy-commentary` must RED through CI now (not just local); (b) mint a throwaway `["local"]`-only static gate → `proof:tag-parity` must RED; (c) confirm `proof:tag-parity` does NOT red the 3 legitimate sibling-walking gates and does NOT demand `ci==release`; (d) author a dead `opacity-[var(--foo)]` class in a fixture template + a live `w-[var(--bar)]` → `proof:no-dead-arbitrary` must RED on the dead one and GREEN on the live one (no false-positive on the recognised arbitrary-property forms). Verifies the gate closes on a BUILD artifact, not grep.
- **Gate-author (folded into implementer + ratified by the verifier).** The 2 new `proof:*.mjs` ARE the wave's deliverable; the gate-author role is the design of their assertion shape (at-LEAST-ci semantics; build-artifact emission probe) ratified against the precept SPEC.md §Hard Gates valid-form list before impl.

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (work AROUND a roadblock with an idiomatic gestalt fix rather than stall; the §6.2 decision tree bounds halt-vs-work-around) — by reference, not restated. This wave's §3a auto-triggers (HALT the failing unit + dispatch the research→plan-augment→redress triumvirate, never stall): an out-of-FileBounds reveal — any need to generalize the `proof:no-legacy-commentary` TARGETS array to the full tree (→ **W27b**), EXCISE the `CarouselDots.vue` dead class (→ **W23** — W27a only authors the var-in-arbitrary CLASS gate), finalize the Card stale-prop shim or relocate the `scripts/__tests__/` self-tests (→ **W27b**), touch the dist `@source` deadlink (→ **W25a**), or promote any of the OTHER 50 `["local","ci"]` gates (only the 2 mis-tagged legacy gates are in scope) — is a scope-reveal → halt + triumvirate, do NOT absorb. Non-local hard-gate failure: if any of the 4 gates cannot be made born-RED→GREEN (e.g. the build pipeline cannot expose per-template compiled CSS to `proof:no-dead-arbitrary`), HALT and re-dispatch the full triumvirate with the RATIFY-BEFORE-IMPL build-artifact decision re-opened — NOT the failing unit alone; if `proof:tag-parity` reds a LEGITIMATE sibling-walking gate (a non-local false-positive on one of the 3 named `local`-only carve-outs), escalate the allow-list shape rather than hand-suppressing the gate. Third diagnostic-loop iteration: if `proof:no-dead-arbitrary` still false-positives on a recognised arbitrary-property form (`opacity-[var(--foo)]` vs a live `w-[var(--bar)]`) after three refinements of the build-artifact emission probe, dispatch research+plan+redress rather than a fourth pattern tweak. §5.3 / RATIFY-BEFORE-IMPL reaching un-ratified: the at-LEAST-ci tag MODEL (shared with W25a — `local ⊆ ci`, NOT `ci == release`) or the BUILD-artifact (not grep) form of `proof:no-dead-arbitrary` reaching impl un-ratified → §6.2 Class-3 HALT-AND-RATIFY (the tag-model is load-bearing for W27a step 3 AND W25a's no-god-module tag; it MUST be ratified before either implements — do NOT self-ratify a `ci==release` form that reds 50 unnamed gates).

---

## HardGate

**The gate set — born-RED → GREEN:**

1. **`proof:no-legacy-commentary`** — flips RED→GREEN at HEAD via the barrel scrub; PROMOTED to `["local","ci","release"]` so it bites in CI + release (was local-only). Bite: re-inject one `M.W2` ref into either barrel → RED through CI.
2. **`proof:fail-explicit`** — already GREEN; PROMOTED to `["local","ci","release"]` (the LOGIC is unchanged, only the tag). Bite: strip a befitting `// fail-explicit:` sentinel or re-inject `?? reactive(BLOB_CONFIG_DEFAULTS)` → RED through CI.
3. **`proof:tag-parity`** (NEW, born-GREEN-by-construction after the 2 promotions) — at-LEAST-ci meta-assert: every non-sibling static `src/`-scan gate carries ≥ the `ci` tag; the 3 named sibling-walking gates are the ONLY permitted `local`-only entries; does NOT assert `ci==release`. Bite: mint a `["local"]`-only static gate → RED.
4. **`proof:no-dead-arbitrary`** (NEW, build-artifact) — compiles the CSS, asserts every `<prop>-[var(--…)]` arbitrary class in the `src/` templates has an emitted rule in `dist/*.css` (tolerating the Tailwind-recognised arbitrary-property forms that DO emit). Bite: a dead `scale-[var(--…)]` class emitting zero CSS → RED. GREEN-close reached when W23+W20 excise the two live instances (cross-wave dependency recorded in the gate note).

All four are **precept-valid artefact forms** (SPEC.md §Hard Gates): deletion proof (barrel scrub), test/manifest-parity output (tag-parity), build output + rule-emission assertion (no-dead-arbitrary) — NONE is grep-only-for-runtime-behaviour.

**MANDATORY VISUAL-TRUTH gate (the AX.W00 cardinal clause — non-negotiable, NOT a headless proof alone).** W27a is a structural gate-hardening wave with **no new visual surface of its own** — but the AX.W00 cardinal clause is non-negotiable, and this wave's `proof:no-dead-arbitrary` gate makes a CLAIM about a LIVE visual behaviour (a var-in-arbitrary class that *should* paint emphasis but emits no CSS). The visual-truth close is therefore: **a live π-lane Playwright + frontend-design audit that PROVES the gate's emission claim against real pixels** — (a) navigate to the carousel-indicator surface and the card-toggle surface on a real device, capture the rendered state of the dead `scale-[var(--scale-hover)]` class, and confirm the gate's RED verdict matches the LIVE no-paint (the dead class produces no visible scale/emphasis — the gate is not lying); (b) after the barrel scrub + tag promotions, run the full demo route matrix through the π lane and confirm **ZERO visual regression** — a comment-only scrub + a gate-tag change must paint pixel-identical to HEAD (the paired-π BEFORE/AFTER + `DELTA` per the AX.W00 compare-at-close protocol must show an EMPTY delta on every route). **The wave closes on this live audit, never on the headless gate set alone** — a green tag-parity gate over a CI config that does not actually pick up the promoted gates, or a `proof:no-dead-arbitrary` whose emission-claim is decoupled from what the device paints, is exactly the headless-green/structurally-broken class AX exists to close. Concretely: prove (i) the promoted gates RUN in the live CI invocation (not just locally), and (ii) the dead-class gate's verdict is grounded in a real readback, not a source-string match.

---

## Cadence (sub-steps, in order — load-bearing: model first, scrub, promote, then author the two gates)

0. **RATIFY-BEFORE-IMPL** the two flagged decisions (the at-LEAST-ci tag MODEL — shared with W25a; the build-artifact form of `proof:no-dead-arbitrary`). This is W27a's first act and gates everything below + W25a.
1. **Barrel scrub** — rewrite the 3 refs as tranche-letter-free live-scope prose; run `node scripts/proof-no-legacy-commentary.mjs` → GREEN (still local-only at this step).
2. **Tag promote** — change the 2 legacy gate tags to `["local","ci","release"]` + update their notes (name the release-parity exception); verify CI now picks them up.
3. **Author `proof:tag-parity`** — at-LEAST-ci meta-assert + the 3-named-sibling allow-list; register in `gates.mjs` + `package.json`; born-GREEN by construction (because step 2 already promoted the 2 legacy gates, no static gate is now wrongly local-only).
4. **Sweep + author `proof:no-dead-arbitrary`** — enumerate the tree-wide var-in-arbitrary class instances; author the build-artifact emission gate (tolerating recognised arbitrary-property forms); register it; record the W23/W20 GREEN-close cross-wave dependency in the note.
5. **Adversarial falsification** (verifier lane) — the four bite-tests above.
6. **VISUAL-TRUTH π-lane close** — the live audit + empty-DELTA proof + the dead-class readback grounding.

---

## Artefacts

The audit json + evidence this wave emits (into `docs/tranches/AX/audit/`):

- `W27a-gate-hardening.json` — per-gate `{ id, beforeTags, afterTags, beforeState (RED/GREEN/ABSENT), afterState, witnessCommand, witnessOutput }` for all four gates; the barrel-scrub diff (3 refs before/after); the `proof:tag-parity` allow-list (the 3 named sibling-walking gates + the 2 named release-parity exceptions); the `proof:no-dead-arbitrary` sweep census (every `<prop>-[var(--…)]` class found, with emit/non-emit verdict + the dist rule it resolves to).
- `W27a-pi-visual-truth.json` (or the π-lane capture set) — the paired-π BEFORE/AFTER `DELTA` over the demo route matrix (must be EMPTY), plus the carousel/card dead-class readback that grounds the `proof:no-dead-arbitrary` verdict in real pixels.
- The two new gate scripts' self-test fixtures (the dead-vs-live arbitrary-class fixture; the throwaway-local-gate fixture) live under `tests/scripts/` as the falsifiable bite-evidence.

---

## CommitPlan (one conventional-commit per sub-step — authored here; NO commit in this session)

1. `chore(legacy): scrub the 3 barrel tranche-letter refs (api/index + index) — proof:no-legacy-commentary RED→GREEN`
2. `chore(gates): promote proof:fail-explicit + proof:no-legacy-commentary to ci+release parity (the 2 named legacy-lane exceptions)`
3. `feat(gates): proof:tag-parity — at-LEAST-ci meta-assert (every non-sibling static src-scan gate carries ≥ ci; 3 named sibling carve-outs)`
4. `feat(gates): proof:no-dead-arbitrary — build-artifact guard on the Tailwind-v4 var-in-arbitrary content-scan-non-emit class`
5. `test(scripts): bite-fixtures for tag-parity + no-dead-arbitrary (dead-vs-live arbitrary class; throwaway local-only gate)`
6. `docs(AX): W27a gate-hardening + π-visual-truth audit artefacts`

---

## Dependencies

- **dependsOn AX.W00** *(the gate-tag MODEL decision is W27a's first act, shared with W25a)*. W00 stands up the fail-CLOSED π visual-runtime lane that this wave's MANDATORY VISUAL-TRUTH close depends on — without the π lane there is no machinery to prove the empty-DELTA non-regression or to ground the `proof:no-dead-arbitrary` emission claim in real pixels. The gate-tag MODEL (the at-LEAST-ci form) is decided HERE and is a precondition of W25a.
- **Hard predecessor of AX.W25a** — `W25a dependsOn AX.W27a` because the gate-tag MODEL precedes the W25a `proof:no-god-module` `["local","ci"]` tagging choice (§4 note 20). Dispatch W27a strictly before W25a.
- **Hard predecessor of AX.W27b** — `W27b dependsOn AX.W27a`; the barrel scrub + the gate-tag model are the contract W27b's full-tree generalization inherits.
- **Soft sequencing with AX.W23 + AX.W20** — `proof:no-dead-arbitrary` reaches its GREEN close only after W23 (carousel `scale-[var(--scale-hover)]` excision) and W20 (card-lift instance excision) land. W27a authors the gate able to flag the live symptom (born-RED-tolerant); the GREEN-close cross-wave dependency is recorded in the gate note. W27a does NOT block on W23/W20 for authoring — only for the gate's terminal GREEN.

---

## Archaeology

The git commits / prior-tranche lineage the audit cited as evidence:

- **`a62c76f`** — `feat(tranche-AW): W16 (rail)` — landed the 3 tranche-letter barrel refs (DeckProgress `:value` wrapper); the origin of RED witness 1. The refs shipped GREEN through CI because the gate was local-only.
- **`8036370`** — `feat(tranche-AV): structural waves W2 + W12 + W3 + W15` — AV.W12 authored BOTH `proof:fail-explicit` and `proof:no-legacy-commentary` `["local"]`-only and never promoted them, despite minting the very header (`gates.mjs:15` "local == ci == release is STRUCTURAL, not coincidental") the tags violate. The origin of RED witness 2 — the cardinal gate-WIRING-not-gate-LOGIC root cause.
- **`scripts/proof-no-legacy-commentary.mjs:31`** — `TARGETS = ["src/api/index.ts", "src/index.ts"]` — the 2-file barrel scope AV.W12 deliberately undersized; W27a works WITHIN this scope (the 3 refs), W27b generalizes it.
- **AV.W12 manifest premise** (`scripts/gates.mjs:15`) — the local==ci==release STRUCTURAL parity claim that is FALSE for exactly the legacy lane; this wave restores it for that lane via the at-LEAST-ci model.
- **§13 "root-cause, not inline"** (digest line 124-125; `converge-digest.md`) — the systemic var-in-arbitrary content-scan-non-emit CLASS mandate with no home until routed to W27a; the carousel (W23) + card (W20) are named symptoms.
- **slice `legacy-excision` VERDICT** (`deep-audit-corpus.json`) — "THE CARDINAL ROOT CAUSE is gate-WIRING, not gate-LOGIC … a gate that exists but does not run where it gates is no gate at all" — the precise gestalt this wave closes. The NOT-FINDINGS (moveBeforeSafe/postTask/execCommand fallbacks, createStrictContext DI, GlassDialogNative/BouncyTabs shims) are verified BEFITTING and explicitly out of scope.

**Live re-diagnosis BEFORE the fix (the W00 wave-open ritual).** At wave-open, re-run all four RED witnesses against live HEAD `eaba94f` (do not trust this spec's snapshot): `node scripts/proof-no-legacy-commentary.mjs` (expect 3 violations); `grep -c 'tags: \["local"\]' scripts/gates.mjs` (expect 5); `ls scripts/ | grep -E 'tag-parity|no-dead-arbitrary'` (expect empty); and a build-and-inspect of `dist/*.css` for the carousel `scale-[var(--scale-hover)]` rule (expect absent). Record the live re-diagnosis in §Archaeology of the close artefact.

---

## PreceptAlignment

This wave is pursuant to `docs/precepts/` (pinned `63240e6`); the J·ENCAPSULATION band binds the following (per §2b), with the specific clause + the precept-valid artefact form:

- **Gates close on evidence — `instructions/tranche/SPEC.md §Hard Gates`** (the BINDING precept for this wave). Valid forms: build/test output, deletion proof, manifest reconciliation. INVALID: "grep found a source string for runtime behaviour". → `proof:no-dead-arbitrary` is therefore a BUILD-artifact emission gate, never a grep; `proof:tag-parity` is a manifest-parity assertion; the barrel scrub is a deletion proof. This is the load-bearing constraint W27a must NOT violate.
- **No legacy code — `instructions/README.md §Edicts`** ("Delete dead code. Do not rename it, hide it behind a feature flag, or leave commented remnants."). → the 3 barrel refs are DELETED (rewritten tranche-letter-free), not rephrased-with-letter; the archaeology goes to `CHANGELOG.md` per the gate contract. Reinforced by MEMORY `greenfield no meta` (no version-history / migration language in any artifact).
- **No silent deferrals — `instructions/README.md §Edicts`** ("Planned work lands, is formally retired with rationale, or moves to a same-tranche named destination."). → the var-in-arbitrary CLASS sweep is ROOT-CAUSED here (the §13 mandate had no home); it is NOT deferred. The GREEN-close cross-wave dependency on W23/W20 is a NAMED same-tranche destination, recorded in the gate note — not a silent defer.
- **One path / abrogate before patch — `instructions/README.md §Edicts`** ("Two orthogonal codepaths … collapse to one"; "ask 'can we delete?' before 'can we patch?'"). → the legacy-lane gates are made structurally honest by ONE tag model (the at-LEAST-ci form), not a per-gate special-case; the old "ci+release on every static gate" framing (the orthogonal second codepath that self-contradicts W25a) is ABROGATED, not patched around.
- **No overfitting — `instructions/README.md §Edicts`** ("must have a current consumer and evidence"). → `proof:tag-parity` + `proof:no-dead-arbitrary` each have ≥2 current bite-witnesses (the 2 promoted gates; the carousel+card dead instances) — they gate a live class, not a speculative one. ONLY the 2 mis-tagged gates are promoted (not all 71 static gates) — the audit's evidence-bound scope, no overfit promotion.
- **Documentation-is-part-of-the-change** (§2b J-band). → the gate `note` fields are updated to name the release-parity exception + the W23/W20 GREEN-close dependency; the close artefact reconciles every witness before/after.
- **π visual-runtime lane — `SPEC.md §π` / AX.W00** (constellation-wide, binding even on a structural wave). → the MANDATORY VISUAL-TRUTH clause: the empty-DELTA non-regression proof + the dead-class real-pixel readback that grounds `proof:no-dead-arbitrary`. A structural wave is NOT exempt from the cardinal clause; its visual-truth obligation is to prove ZERO regression + that its emission-claim matches what the device paints.

**Must-not-violate, restated:** do NOT author `proof:no-dead-arbitrary` as a grep gate (invalid hard-gate form); do NOT promote any gate beyond the 2 named legacy exceptions (overfit / self-contradicts the at-LEAST-ci model); do NOT rephrase the barrel archaeology with a different tranche-letter form (no-legacy-code); do NOT defer the var-in-arbitrary CLASS to a future tranche (no-silent-deferrals); do NOT widen `proof:no-legacy-commentary`'s TARGETS here (that is W27b's named scope — one-path, no scope-creep).
