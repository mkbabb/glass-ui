# Lens C6 — BH plan critique, bands B4–B7

**Scope:** BH `PLAN.md` bands **B4** (CLAUDE.md delete + redistribution + precepts extraction), **B5** (backbone + build-mechanism + gate/script consolidation), **B6** (reusable prompts), **B7** (consumer-migration asks). Five-axis judgment per band; deep attention to B4's 16-reader redistribution elegance, B5's gate-prune scope, B6's real-value-vs-ceremony, B7's roster fidelity.

**Verdict.** BH bands B4–B7 are the most careful part of the whole BH plan — the census counts spot-verify TRUE on disk (the 16-reader CLAUDE census is exactly right; the B7 roster is internally consistent and source-doc-derived, not hand-listed). But they carry ONE structural miss that is precisely the user's headline complaint. **The tranche whose mandate is de-contrivance restructures the gate machine (2640L `gates.mjs` → 300L runner + manifest) while pruning ZERO of the 360 proof scripts — the ceremony surface (127K lines of gate code, 184 self-test bites, 202 born-RED mints) survives the tranche untouched, and the ONE prune wave (B5d) is DEFERRED past BH.** Worse, the CLAUDE-delete redistribution TRANSPOSES ceremony rather than eliminating it: the 16 CLAUDE-reader clauses are almost entirely doc-PRESENCE assertions ("the canon sentence exists in a doc") that verify nothing functional, and B4/B5c builds a `canon-doc.mjs` resolver + a `docs/canon/` scaffold + `auditCanonHomes()` machinery to keep those assertions alive against a NEW doc tree. The elegant gestalt move — prune the doc-presence clauses, recognize that a disk-generated `structure.md` dissolves the drift-check gates into freshness gates — is available and un-taken. B6 and B7 are sound; B6 is near-complete-as-authored (a cross-repo ask more than a wave) and could fold into B7.

---

## Findings (ranked by severity)

### F1 [MAJOR] — B5 restructures the gate runner but prunes ZERO gates; the #1 user complaint is DEFERRED

The user's verdict names "over contrivance… ceremony gates (360 proof scripts at HEAD)" (SEED-CONTEXT.md axis 3). B5 is the natural — the ONLY — home for the answer, and as specced it does not answer.

**Disk evidence (verified 2026-07-01):**
- `scripts/proof-*.mjs` = **360** scripts; `wc -l` total = **127,269 lines** (avg ~353L/gate).
- **184** scripts carry a self-test bite (`grep -lE "self-?test|synthetic"`); **202** carry a born-RED-then-GREEN mint (`grep -lE "born-?RED"`).
- `scripts/gates.mjs` = 2640L; **~378 gate entries**; CI run-set ≈ 316 gates (177 `["local","ci"]` + 107 `["local","ci","release"]` + 21 `["ci"]` + …).
- Per-wave granularity: the liquid-glass band minted one `proof:X` per mechanism, each with a self-test bite (`proof:glass-accent`, `proof:lensing`, `proof:liquid-reveal`, `proof:press-unify`, `proof:dockmorph-cta`, …). This is the "wave-granularity-as-disease" the seed names, mirrored on the gate axis.

**What B5 actually does (PLAN.md:96–100):**
- B5b (`gate-manifest-extract`): extract table+prose → `gates.manifest.mjs`; gate = **`--list byte-identical` pre/post**. A byte-identical restructure prunes nothing by definition.
- B5c (`gate-rehome`): re-home the 16 CLAUDE-readers + 10 precept-readers onto resolvers. Re-points paths; prunes nothing.
- **B5d (`detector-kit`): DEFER past BH** — "164-script blast radius. Do the closed-wave gate-census subset only" (PLAN.md:100).

So the tranche moves the 2640L monolith into a runner + a manifest and leaves the 360-gate / 127K-line ceremony intact. This is the exact anti-pattern the user named ("missing obvious issues… over contrivance"): rearranging furniture without reducing count. A de-monolith of `gates.mjs` is worth doing, but it is orthogonal to the contrivance the mandate targets.

**Why B5 is the right home, and its amended scope.** The B5b manifest extraction is a PREREQUISITE for a prune (once the table is data, a prune is a data edit + a script delete). B5 should own an aggressive gate-prune as a NEW sub-wave (B5e), not defer it:
1. **Collapse per-wave π-presence gates into band-category gates.** The `proof:ba-gestalt` roster (SEED / CLAUDE.md §Build) already proves the model: ONE holistic per-surface acceptance gate replaced N per-mechanism π clauses. Extend it — a `proof:glass-band` / `proof:motion-band` / `proof:dock-band` category gate subsumes the dozen single-mechanism gates each band minted. Target: the ~150 local-π-adjacent + self-test-only gates collapse toward ~1/band.
2. **Prune the 16 doc-presence clauses (see F2) — do it in B5c, not re-home.**
3. **Retire self-test-bite-only gates.** A gate whose payload is "a synthetic planted violation flags + the canon sentence exists" (184 of 360) verifies its own detector, not the product. Where the mechanism is otherwise gate-covered (the π readback, a source-structure gate), the self-test-bite gate is pure ceremony.

Even a conservative pass — the 16 doc-presence clauses + the local-only self-test gates whose mechanism is π-covered — takes the 360 toward ~250 without losing a single behavioral assertion. That is the tranche's mandate, and B5 is the only band positioned to deliver it.

---

### F2 [MAJOR] — The 16 CLAUDE-reader clauses are doc-PRESENCE ceremony; B4/B5c re-homes (transposes) the ceremony instead of pruning it

The 16-reader census is **exactly right on disk** (I verified all 16 call-sites; the PLAN's number is accurate — the broad `read`-regex misses `proof-handmark.mjs:249` `rd("CLAUDE.md")`, which is the 16th):

```
accent-tone:440 safeRead · close-battery-parity:149 read · claude-structure-sync:74 readFileSync
doc-override-idiom:113 read · doc-consistency:197 readFileSync · dock-rail-realize:258 readRel
dock-unify:656 safeRead · dropdown-fix:419 safeRead · easing-primitive:365 safeRead
handmark:249 rd · on-glass-fg:399 read · phase-palette:335 safeRead · readme-meta-clean:221 read
spa-view:299 safeRead · split-chars:447 safeRead · surface-axis:520 safeRead
```

**But what the clauses ASSERT is the problem.** Reading the actual usage sites, ~14 of the 16 verify that a PROSE SENTENCE EXISTS in the doc — nothing functional:
- `proof-surface-axis.mjs:438` — `new RegExp('<'+component+'\\s+surface\\s*=').test(claudeMd)` — checks the string `<Card surface=` appears in prose.
- `proof-spa-view.mjs:228` — `/SpaView/.test(claudeMd) && /spa-view/.test(claudeMd)` — checks two component-name strings appear.
- `proof-easing-primitive.mjs:270-272` — `/EasingPicker/ && /\/easing/ && /boundary law/i && /value\.?js/i && /keyframes\.?js/i` — checks five phrases appear.
- `proof-dropdown-fix.mjs:255-256` — `/scroll-gutter-stable/ && /scrollbar-gutter:\s*stable/` — checks two token strings appear.
- `proof-phase-palette.mjs:199-200`, `proof-dock-unify.mjs:534-541`, `proof-split-chars.mjs:289` — same shape.

These clauses green when the prose exists and red when it does not; they catch NOTHING about whether the component works. The real assertions (SpaView composes `<KeepAlive>`, the surface axis resolves the glass tier) are the OTHER clauses in the same gates. The claudeMd clause is a "did the wave author write the canon paragraph" ceremony — the self-referential loop the seed names (the gate verifies the doc that documents the gate).

**The plan transposes this, at cost.** B5c re-homes all 16 readers onto `canon-doc.mjs` (`docs/tranches/BH/research/proto/canon-doc.mjs` — RAN, fail-explicit) → `docs/canon/*.md` + colocated READMEs, plus `auditCanonHomes()` to assert every home resolves, plus the `docs/canon/` scaffold (B4b) with a >200-char body floor per home (B4b-content). That is a resolver + a scaffold + an audit function + a body-length gate — all built to keep ~14 prose-presence assertions alive against a new doc. The ceremony is preserved, relocated, and given more machinery.

**GESTALT.** The clean-break move that matches the tranche's own "no legacy, from first principles" bar: in B5c, **DROP the `claudeMd` clause from the ~14 soft-reader gates** (keep every functional clause). A gate should assert behavior/structure, not prose. Once dropped, those 14 gates need no canon home and `canon-doc.mjs`'s cross-cutting map shrinks to the genuinely-needed set. The per-component READMEs (F4) are worth keeping as DRY colocated docs — but do not GATE their prose. This turns "re-home 16 readers + build a resolver + scaffold + audit" into "delete 14 clauses + keep 2 structural readers (F3)."

---

### F3 [MAJOR] — `structure-sync` + `doc-consistency` become TAUTOLOGICAL once `structure.md` is generated from disk; re-homing preserves a vacuous check

The 2 bare-`readFileSync` crashers are the load-bearing readers (they do real drift-checks, not prose-presence). But both dissolve under B4b's own decision.

`proof-claude-structure-sync.mjs:60-101` parses the hand-maintained `§Structure` ASCII tree (`│   │   ├── <name>/`) and diffs the declared custom/ dir set + count against `readdirSync(CUSTOM_DIR)`. It exists because the enumeration was HAND-MAINTAINED and DRIFTED from disk. B4b-skeleton (PLAN.md:88) proposes to **"generate `structure.md` from disk (the same colocated-barrel glob regen-exports uses) so the 5-reader hot file cannot drift."** But if `structure.md` is generated from the same disk glob the gate diffs against, the diff is **tautological** — regenerated-from-disk matches disk by construction, always green. The drift-check's reason to exist evaporates; it collapses to a freshness check ("the committed `structure.md` equals a fresh regen" — the `proof:gen-ci-fresh` pattern the plan already uses for `ci.yml`, PLAN.md:99).

`proof-doc-consistency.mjs:197` (`readFileSync(CLAUDE_MD)`) parses `citedDeps` from a markdown table and cross-checks package.json — the plan's own fold-obligation-1 (PLAN.md:89) flags that this arm parses ONLY a markdown table and goes "permanently vacuous" if `dependencies.md` is authored as prose. That is a second signal that this reader is a doc-vs-disk consistency check whose home is a GENERATED doc, not a re-homed reader.

**GESTALT.** B4b/B5c should recognize the dissolution, not the re-home: (1) generate `structure.md` from disk; (2) replace `proof:claude-structure-sync`'s dir-diff arm with a `proof:gen-fresh`-style "committed == regen" freshness assert (the png-arm already splits to `proof:visual-png-tracked` per PLAN.md:99 — finish the split); (3) point `doc-consistency`'s dep-rot arm at the GENERATED `dependencies.md` table (the plan half-sees this with the TABLE-form acceptance criterion, but stops short of noting the whole arm is a doc-vs-package.json freshness check). Net: the 2 crashers become 1 freshness gate + 1 dep-rot gate over generated docs — no `readFileSync(CLAUDE_MD)` survives, and the checks are honest (a stale regen reds) rather than tautological.

---

### F4 [MINOR] — B4 redistribution: elegant in the colocated-README half, scatter-risk in the docs/canon + docs/design split

The delete-and-redistribute replaces one 941L file with a **4-home doc structure**: `docs/precepts/` (submodule, unchanged) + `docs/design/` (4 docs EXTRACTED from the precepts submodule — design-idioms, motion-canon, tunable-anim, affordance-map; PLAN.md:90) + `docs/canon/` (9 cross-cutting topic docs, `canon-doc.mjs` CANON_HOMES) + colocated `src/**/README.md` (~28 per-component, 22 exist per PLAN.md:89).

- **Elegant:** the per-component READMEs are DRY beside the code — the right home for `component:dock` / `component:easing` contract prose. Colocation is the idiom the whole repo already uses (feature-dir colocation, `proof:colocation`).
- **Defensible:** the `docs/canon/` topic set (structure, dependencies, glass-system, motion-system, conventions, …) is topic-organized, not a scatter — a reader with a topic finds one file.
- **Scatter-risk:** `docs/design/` extraction INVERTS the constellation sharing direction. Those 4 docs currently live in the SHARED `docs/precepts` submodule (constellation-wide); B4c extracts them to glass-ui-local `docs/design/` and asks `mkbabb/precepts` to delete them upstream (PLAN.md:90). If they are genuinely glass-ui-specific (design-idioms.md IS the glass-ui idiom home), the extraction is correct — they were misfiled in the shared submodule. But the plan does not RECORD that judgment, and a constellation repo reading `precepts/…/motion-canon.md` today gets stranded on the delete. The plan is aware of shared-vs-local at the margin (it EXCLUDES the 2 `cross-repo-dev-resolution.md` readers, PLAN.md:90) but does not state the sharing-inversion for the 4 extracted docs.

**GESTALT.** Not a blocker; a plan-doc-edit. B4c should (a) record the per-doc glass-ui-local-vs-constellation judgment for each of the 4 extracted docs, and (b) confirm no other constellation repo reads them before asking precepts to delete (the foreign-tree fence means glass-ui cannot verify this — so the ASK must carry "confirm no sibling consumer" as the precepts-side precondition, not a glass-ui assumption). And the whole redistribution reinforces F2: a 4-home doc tree is more surface to keep gates pointed at — which is why pruning the doc-presence clauses (F2) matters more once the homes multiply.

---

### F5 [MINOR] — B6 prompts are real value, but the wave is near-complete-as-authored and the tranche never wires its OWN restructure to use them

The 3 prompts (`docs/tranches/BH/prompts/{LEGACY-EXCISION 84L, RESTRUCTURE-BACKEND 100L, RESTRUCTURE-FRONTEND 88L}.md` + README) are substantive, NOT ceremony: each is a drop-in *Scope + Non-negotiables* payload for `AGENT_DISPATCH_TEMPLATE.md`, citing the live anti-pattern catalog by name (god-modules, `:deep()`→`:slotted`, the `:global(.dark)` scoped-CSS drop, fail-explicit-vs-befitting, version straddles). This is exactly the encoded-lesson tooling that would have prevented the "poor encapsulation / over contrivance" the user complains of. Real value.

Two observations:
1. **As a WAVE, B6 is near-empty.** The prompts are ALREADY authored (tranche-dev). B6's gate is "prompts exist, cross-linked, cite the binding edicts" (PLAN.md:103) — a trivial gate over done work. The wave's live work is the by-name promotion ask to `mkbabb/precepts`. That is a cross-repo ask — the same KIND as every B7 row.
2. **The tranche builds reusable restructure prompts and does not use them for its own restructure.** B2 (src restructure), B3 (demo restructure), B5a/B5b (build/gate god-module carves) are the exact waves RESTRUCTURE-BACKEND / RESTRUCTURE-FRONTEND are FOR — but no B2/B3/B5 wave spec dispatches its agents VIA these prompts. The dogfooding is missing.

**GESTALT.** (a) Wire it: B6 sequences FIRST (already `[C]`), and every B2/B3/B5a/B5b restructure-wave dispatch cites its matching prompt as the *Scope + Non-negotiables* payload — the tranche proves the prompts by using them. (b) Fold the promotion-ask into B7 (both are by-name precepts asks) so B6 is a "author + dogfood" concurrent task, not a standalone wave with a trivial gate. This drops a wave and closes the dogfood gap.

---

### F6 [MINOR] — B7 roster is sound; note that 2 of the 4 "BH asks" are BG-owned token asks folded in for relay completeness

B7 is the best-built band of the four. Verified on disk: `docs/tranches/BH/coordination/asks-and-consumes.md` (5061L) carries exactly 4 asks with per-ask witness gates, a live-consumer census, disposition notes (the `words/` d6-fork inv-11 note, the B1c zero-ask interims), and the gate is a SOURCE-DOC AUTO-SCAN (`consumer-constellation.md` row-filter ∪ `bg-build-map §G7 U1`), not a hand-list — the anti-drift shape. Both source docs exist (`docs/tranches/BG/execution/consumer-constellation.md`, `docs/tranches/BG/execution/bg-build-map.md`). `proof:crossrepo-asks.mjs` exists (BB-scoped; the plan correctly notes `:bh` is a NEW arm, the BB one is vacuous for BH).

The one observation: rows 3 (atlas `--ring`→`--focus-ring-color`) and 4 (bbnf `--glass-blur-dock` retire) are **token** renames/retires whose born-RED witness is the **BG-owned** `proof:retired-token-consumers` (asks-and-consumes.md:18 records this explicitly). BH's actual NEW `/api` break is **2 asks** (muster, speedtest). Bundling all 4 in one relay doc is correct for completeness, but the plan's "exactly 4 by-name asks" framing slightly overstates BH's own break vector — the 5.0.0 consumer-facing break BH OWNS is the `./api` drop (2 sibling consumers). This is a labeling nuance, not a defect; the roster is complete and the ownership is recorded.

---

## Fold candidates (for the BG/BH tranche plan)

### FC1 — amend-wave B5: ADD an aggressive gate-prune sub-wave (B5e), un-defer the contrivance answer
**Kind:** amend-wave. **Target:** B5 (PLAN.md:96–100). **Gestalt.** B5b's manifest extraction is the prerequisite; make B5 own the prune it enables instead of restructuring around it. Add **B5e-gate-prune [WS12, after B5b]**: (1) collapse per-wave π-presence gates into `proof:{glass,motion,dock,feedback}-band` category gates (extend the `proof:ba-gestalt` roster model that already replaced N per-mechanism π with 1 holistic gate); (2) retire the self-test-bite-only gates whose mechanism is otherwise π/source-covered (184 candidates); (3) delete, don't defer, the closed-tranche gate-census subset B5d scopes. Target the 360 toward ~250 with ZERO behavioral assertion lost. Gate: `--list` count DROPS (the inverse of B5b's byte-identical); a manifest diff enumerates every pruned gate + its subsuming category gate; `--run full` still GREEN. This is the single highest-value amendment for the user's headline complaint.

### FC2 — amend-wave B5c: PRUNE the 14 doc-presence clauses, do not re-home them
**Kind:** amend-wave (prune). **Target:** B5c (PLAN.md:99), F2. **Gestalt.** Of the 16 CLAUDE-readers, ~14 assert only that a canon SENTENCE EXISTS (surface-axis:438, spa-view:228, easing:270, dropdown:255, phase-palette:199, dock-unify:534, split-chars:289, handmark, on-glass-fg, readme-meta-clean, dock-rail-realize, close-battery-parity, doc-override-idiom, accent-tone). DELETE the `claudeMd` clause from each (keep every functional clause). Result: `canon-doc.mjs`'s cross-cutting map + `auditCanonHomes()` + the B4b-content >200-char body floor shrink to the genuinely-load-bearing set. This converts "re-home 16 + build resolver + scaffold + audit" into "delete 14 clauses + handle 2 structural readers (FC3)."

### FC3 — amend-wave B4b/B5c: dissolve structure-sync + doc-consistency into freshness gates over generated docs
**Kind:** amend-wave. **Target:** B4b-skeleton (PLAN.md:88), B5c (PLAN.md:99), F3. **Gestalt.** Generate `structure.md` + `dependencies.md` (table-form) from disk; replace `proof:claude-structure-sync`'s dir-diff with a `committed==regen` freshness assert (the `proof:gen-ci-fresh` pattern), finish the png-arm split to `proof:visual-png-tracked`; point `doc-consistency`'s dep-rot arm at the generated `dependencies.md` table. No `readFileSync(CLAUDE_MD)` survives, and neither check is tautological (a stale regen reds honestly). This is the correct disposition of the 2 crashers — not a re-home.

### FC4 — plan-doc-edit B4c: record the docs/design sharing-inversion judgment
**Kind:** plan-doc-edit. **Target:** B4c (PLAN.md:90), F4. **Gestalt.** For each of the 4 precept→`docs/design` extractions, record the glass-ui-local-vs-constellation-shared judgment, and make "confirm no sibling consumer reads this precept doc" a precondition the precepts-side ASK carries (glass-ui cannot verify it under the foreign-tree fence). Prevents stranding a constellation reader on the upstream delete.

### FC5 — amend-wave/merge B6→B7: wire the prompts into BH's own restructure + fold the promotion-ask
**Kind:** merge-waves + amend-wave. **Target:** B6 (PLAN.md:102-103), B7 (PLAN.md:105-106), F5. **Gestalt.** (a) B2/B3/B5a/B5b restructure-wave dispatches cite their matching `RESTRUCTURE-{BACKEND,FRONTEND}` / `LEGACY-EXCISION` prompt as the *Scope + Non-negotiables* payload — the tranche dogfoods its own reusable tooling. (b) The `mkbabb/precepts` promotion ask folds into the B7 roster (it is the same by-name-precepts-ask kind as row-3/row-4's cross-repo relay). B6 becomes an author-and-dogfood concurrent task, not a standalone wave with a trivial existence gate. Net: one fewer wave, the dogfood gap closed.

### FC6 — plan-doc-edit B7: label BH's OWN break as the 2 `/api` asks; keep the 4-row relay
**Kind:** plan-doc-edit. **Target:** B7 (PLAN.md:106), asks-and-consumes.md, F6. **Gestalt.** Keep the 4-row roster (relay completeness), but state that BH's own 5.0.0 consumer-break vector is the `./api` drop = 2 sibling asks (muster, speedtest); rows 3-4 are BG-owned token asks the relay carries. Minor accuracy edit; the roster and gate are otherwise correct as built.
