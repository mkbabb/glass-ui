# BF.W-CUT — the honest 4.x publish + slides redeploy (USER-DOMAIN-AUTHORIZED, terminal)

**Band 7 · Tier T12 · depends: W-REFLECT (all)**

## The defect / the ask

This is the terminal cut — the irreversible `git tag` + `npm publish` + slides redeploy that ships the BF liquid-glass convergence as a real `@mkbabb/glass-ui` registry line. It closes the tranche (SEED §4 Band 7; DAG T12 — "the honest 4.x publish + slides redeploy — USER-GATED"). It owns the publish-class lessons every prior cut paid for in production:

- **The `--run local`-only close lie (BA → 4.0.0).** [project_glassui_400_published]: "the close must run `--run release` not just `--run local` (a build blocker + 6 gate drifts surfaced only at tag-push)." BB hardened this into `--run full` (BB.W-CLOSE-BATTERY) — the deduped union `local ∪ ci ∪ release` siblings-absent BEFORE the tag.
- **The siblings-absent CI accuracy (BC → 4.1.0).** [project_glassui_410_published]: "the CI-accurate submodule-absent close lesson." A `~/Programming` checkout sees the sibling repos; the CI runner does not. A close run with siblings present greens gates (`proof:resolution`, `proof:phantom-classes`, `proof:consumers:static`) that RED on the clean runner.
- **The park-not-restored incident (2026-06-20; ABSOLUTE).** [feedback_never_park_sibling_repos]: a subagent `mv`'d the 11 constellation repos to `/tmp` to fake a siblings-absent checkout; a TaskStop orphaned them for hours. The foreign-tree fence (inv-26) is LITERAL — the siblings-absent emulation is a FRESH `/tmp` worktree, NEVER a move of `~/Programming`.
- **The cross-repo adopt is THEIR edit (inv-26; SEED §6 precept 8).** slides + speedtest adopt the BF cut on their OWN `^4.x` bump in their OWN repos — BF edits ZERO sibling tree. W-CUT's publish + redeploy are user-domain-authorized; the consumer adopt is documented as a handoff, never executed here.

The deferred census names no D# row directly for the cut (it is the close, not a build) — but it is the wave that VERIFIES the whole census is discharged: every `D1..D32` row must be `BUILD`-landed, `DEFER`-with-live-trigger, or `RETIRE`-with-rationale before the tag (`proof:be-fold-ledger` GREEN is a pre-cut gate, per W-FOLD-LEDGER).

**The standing constraint (binding).** This wave is NEVER autonomous. The publish + the tag-push + the slides redeploy are USER-DOMAIN-AUTHORIZED actions gated behind the user's explicit go (the same mandate BC/BA/AZ closed under: "tranche development only; no implementation until greenlit", and the publish is a further explicit greenlight beyond the build greenlight). The agent AUTHORS the pre-cut checklist + runs the read-only verification; the user fires the irreversible steps (or explicitly delegates each one).

## The mechanism

W-CUT is a SEQUENCE, not a paint — it composes the SHIPPED close infrastructure (`scripts/release.sh`, `.github/workflows/release.yml`, `scripts/gates.mjs --run full`, `scripts/verify-siblings-intact.mjs`, `scripts/proof-close-battery-parity.mjs`), never a new release path. The terminal-cut precedent is BC.W-CUT (`docs/tranches/BC/FINAL.md §6`) — this is its BF analogue, hardened with the BF-specific retirements.

### Phase A — the version decision

The HEAD registry line is `4.1.0` (`package.json:version`). BF ships:

- **A clean-break retirement** (`useLiquidMorph.ts` 462L deleted, `liquid-morph.css` 815L relocated out of `src/styles/glass/` into `demo/`, the `manifest.ts:884` false claim corrected — W-SPIKE-DELETE) — a removal of a NEVER-PUBLISHED symbol (the spike has 0 consumers and was never on a `dist/` subpath), so it is NOT a breaking change to the public surface.
- **Additive library SFCs + composables** (`<DockNowPlaying>`, `<DockStack mode=facets>` fidelity, `useElementBloom`, the wired goo/silhouette/jubilance, the de-shadcn FORM abrogation) — additive + internal-upgrade.
- **`.glass-reveal`/overlay-internal upgrades** (de-shadcn FORM, the iOS capsule fold) — visual upgrades behind unchanged public props (the BB.W-LIQUID-REVEAL precedent: "no public-prop break; the default enter upgrades to liquid glass").

The W-DESHADCN-SWEEP exact-6 named-chip-radius sweep + any retired-with-alias surface is a MIGRATION.md row, NOT necessarily a major. The version is a **MINOR** (`4.2.0`) IF the public surface is additive + internal-upgrade only (the expected case — the spike is unpublished, the FORM abrogations are token-internal), or a **MAJOR** (`5.0.0`) IFF a published subpath/export/prop is RETIRED with no alias (a clean break on the PUBLIC surface — e.g. a `surface=clear` or `--glass-bg-sheet` consumer-facing rename in W-CONSUMER-BAND that a registry consumer reads). The semver decision is the user's, recorded in `FINAL.md §version-decision` with the per-surface evidence (the `MIGRATION.md` rows are the witness: an additive row → minor, a clean-break-on-public-surface row → major). The default expectation, given the spike is unpublished and the FORM work is token-internal, is **`4.2.0` (minor)** — but the cut DEFERS to the W-DESHADCN-SWEEP / W-CONSUMER-BAND MIGRATION rows for the final call.

### Phase B — the MIGRATION.md rows (the no-legacy ledger)

Every retired/relocated/renamed surface gets a `MIGRATION.md` row in the house format (the `popover-animate → .glass-reveal` precedent at MIGRATION.md tail — before/after snippet + the degrade fall). The BF rows:

- **`useLiquidMorph` (RETIRED — clean break, no alias; W-SPIKE-DELETE / D2 / D30).** A 0-consumer 462L spike never on a `dist/` subpath. The row records: it was NEVER published (no consumer migrates), `useDockFission` is the wired n-ary split engine, `useLiquidReveal`/`useElementBloom` is the FLIP spine. NO alias, NO re-export shim.
- **`liquid-morph.css` (RELOCATED out of `src/styles/glass/` → `demo/`; W-SPIKE-DELETE / D2).** 815L of demo-content CSS that rode the LIBRARY cascade. The row records: it never shipped in `/styles` as a load-bearing rung (verify against `dist/glass-ui.css`), so no consumer reads it; it is demo-private now. If ANY byte of it WAS reaching `/styles`, the row carries the consumer re-point.
- **Each W-DESHADCN-SWEEP FORM abrogation** that changes a consumer-visible class/token (the exact-6 named-chip-radius sweep `selectableChip`/`toggle-chip`/`MetricBadge` …) — one row each, before/after, no alias.
- **Each W-CONSUMER-BAND surface** (`DockNowPlaying`/`GlassChip`/`GlassControl`, the `--glass-fill-tint`/`surface=clear`/`--glass-bg-sheet` wiring, the Sheet/Drawer `--glass-opacity-sheet` re-wire) that touches a consumer-facing token name.

### Phase C — the pre-cut verification (read-only; agent-runnable)

The agent runs, in order, with NO irreversible step:

1. **`node scripts/verify-siblings-intact.mjs`** — the standing tripwire (BEFORE). REDs if any real repo sits in `/tmp/sibling-park`/`/tmp/sibling-stash` or a named constellation sibling is missing from `~/Programming`. This MUST pass before any siblings-absent emulation begins.
2. **The FULL close-battery siblings-absent in a FRESH `/tmp` worktree** — the BB.W-CLOSE-BATTERY discipline, the LITERAL foreign-tree-safe form: `git worktree add /tmp/bf-cut-verify <BF-HEAD-SHA>` then run `node scripts/gates.mjs --run full` INSIDE `/tmp/bf-cut-verify` (the absence comes from the fresh checkout having no siblings linked — NEVER from moving `~/Programming`). `proof:close-battery-parity` asserts release.sh + release.yml both run `--run full` (the deduped union); this re-runs that union on the actual clean-checkout tree the CI runner sees. Sibling + detected-Playwright gates skip-by-policy (the clean-runner union IS the CI-accurate battery).
3. **The binding-π + gestalt close-proof** — the anti-disease invariant (DAG §"Anti-disease invariant"): the cut is NOT closeable on green source gates alone. Confirm (a) every BF `proof:*` source gate GREEN, (b) every `tests-visual/<wave>.spec.ts` π authored + GREEN on chromium AND webkit (the W-SAFARI-CAPTURE webkit project), (c) every `proof:ba-gestalt` BF-roster row flipped PASS on a FRESH whole-page both-mode `:5199` capture (W-REFLECT, surface-hash freshness floor — never `reducedMotion`). `proof:ba-gestalt` operative-PASS is the binding close oracle (its REFLECT_DIR/ROSTER/WAVES_DIR must already be re-pointed onto the BF tree by W-GESTALT-WIRE — the cut verifies, it does not re-point).
4. **`proof:be-fold-ledger` GREEN** — every census D# row discharged (BUILD-landed / DEFER-with-live-trigger / RETIRE-with-rationale); no silent drop, no phantom-destination wave.
5. **`npm run build` + `npm run verify-export-types`** — the subpath publication binary (every `package.json` exports entry resolves + its dts publishes); a fresh `dist/` smoke check on `dist/index.d.ts`.
6. **`node scripts/verify-siblings-intact.mjs`** — the tripwire AFTER (the park-not-restored sentinel: run before AND after any close-battery; if a sibling looks "missing" check `/tmp/*park*/*stash*`). Then `git worktree remove /tmp/bf-cut-verify` (clean up the throwaway — it is a glass-ui worktree in `/tmp`, the ONE place a move is allowed).

### Phase D — the user-gated handoff (the irreversible steps)

The agent STOPS here and hands the user a checklist; each step is fired by the user (or explicitly delegated):

1. **Bump `package.json.version`** to the Phase-A decided version + write `FINAL.md` (the per-wave-citation close doc + the version-decision evidence + the residuals table, the BC FINAL.md §6 shape) + a `CHANGELOG`/changeset entry (the `## 4.2.0` heading the `proof:*-final` STAGED-OR-CUT clause reads).
2. **Commit + merge to `master`** — the no-out-of-band-lineage invariant (inv-11): the publish MUST originate from a commit that is an ANCESTOR of `master` (the d6-fork lesson — a publish from `prototype/liquid-dock` directly would strand consumers on a parallel registry line). The branch FF-merges to `master` (the BC pattern: "BB FF-merged to master").
3. **`bash scripts/release.sh v4.2.0`** — verifies the clean tree + the version match, re-runs `gates.mjs --run full`, smoke-checks `dist/index.d.ts`, cuts the annotated tag. (release.sh runs the union one more time on the real tree as the last guard before the tag.)
4. **`git push origin v4.2.0` + `git push origin master`** — the tag push fires `.github/workflows/release.yml` (the gated provenance path: `actions/checkout fetch-depth:0` → `npm ci` → tag↔version assert → `gates.mjs --run full` → `npm publish --access public --provenance` with the OIDC id-token + the `NPM_TOKEN` secret). [project_publish_ci_broken]: glass-ui release.yml is FULLY GREEN — the CI does the gated provenance publish; the user pushes the tag, CI publishes. NO local `npm publish` (the provenance attests the build to this repo/workflow).
5. **Verify the registry line** — `npm view @mkbabb/glass-ui versions/dist-tags` shows `4.2.0` published with provenance; `proof:lineage-probe` (the registry-consumer probe) confirms the mainline lineage.
6. **The slides redeploy (USER-DOMAIN; THEIR repo).** slides adopts on its OWN `^4.x` bump in `~/Programming/slides` (THEIR edit — the foreign-tree fence; BF touches zero sibling tree). The handoff documents: bump `@mkbabb/glass-ui` to `^4.2.0` in slides, adopt the new dock-liquid surfaces (`<DockNowPlaying>`, the wired bloom/fission/silhouette), retire any slides-local interim fork, `npm run build` + deploy to slides.friday.institute (CF Pages, the [project_slides_repo] deploy path), live-validate on the real device. speedtest likewise bumps `^4.x` and adopts on ITS schedule. NEITHER is executed here — both are named handoffs.

## The gate — `proof:bf-cut` (born-RED → GREEN)

A DEVICE-FREE meta-gate (the `proof:close-battery-parity`/`proof:ba-final` idiom — imports nothing it cannot read statically; `local`-tagged, the meta-gate-cannot-be-in-the-set-it-walks precedent; promoted to the close set by the BF cut itself, the STAGED-OR-CUT pattern). Born-RED on the authoring tree (C1 RED: `FINAL.md` absent; C5 RED: no version bump / changeset staged). Clauses:

- **C1 FINAL-EXISTS + per-wave-citation.** `docs/tranches/BF/FINAL.md` exists, cites every BF wave, carries the version-decision evidence block + the residuals table. (RED: FINAL absent — the authoring-tree state.)
- **C2 THE-GESTALT-BAR.** `proof:ba-gestalt` reports operative-PASS over the BF roster (REFLECT_DIR/ROSTER/WAVES_DIR on the BF tree) — the close CANNOT assert a surface PASS the gestalt gate marks FAIL (the BA inv-4 structural fix). (RED: roster still FAIL / pointing at BC.)
- **C3 FULL-BATTERY-SIBLINGS-ABSENT.** `proof:close-battery-parity` GREEN — release.sh + release.yml both run `gates.mjs --run full` (the deduped union); a synthetic `--run local`-only close path MUST be flagged (the inherited self-test bite). (RED: a narrowed battery.)
- **C4 NO-OUT-OF-BAND-LINEAGE.** The cut path asserts the publish originates from a `master`-ancestor commit (the release.yml `push.tags` + the merge-to-master step recorded); a `prototype/liquid-dock`-direct publish reds (inv-11, the d6-fork class). (RED: no master-merge step.)
- **C5 STAGED-OR-CUT.** Either `package.json.version` is still `4.1.0` WITH a staged changeset + a `## <next>` CHANGELOG heading (the staging window), OR the version is bumped + the changeset consumed + the tag exists (the cut done). The silent-bump (version moved with no changeset/CHANGELOG) REDs. (RED on the authoring tree: version 4.1.0, no changeset — the pre-cut state.)
- **C6 FOLD-LEDGER-DISCHARGED.** `proof:be-fold-ledger` GREEN — every census D# row decided, no phantom destination. (RED: a silent-drop row.)
- **C7 SIBLING-FENCE.** `verify-siblings-intact.mjs` is named as a pre/post-cut step in the FINAL checklist AND no `mv ~/Programming/<sibling>` form appears in any BF cut script (the foreign-tree fence, machine-asserted by a source-scan of the cut path — the LITERAL inv-26). (RED: a sibling-move form in the cut path.)
- **C8 CLEAN-TREE.** The cut tree is clean off a `docs/precepts` allowlist (the release.sh `git status --porcelain` guard mirrored).

**Self-test bites** (un-skippable every run): (a) a synthetic `--run local`-only close-path string MUST flag C3; (b) a synthetic `git push` from a non-master branch MUST flag C4; (c) a synthetic `mv ~/Programming/slides /tmp/park` form in the cut path MUST flag C7; (d) a synthetic silent version bump (4.1.0 → 4.2.0 with no changeset) MUST flag C5; (e) a synthetic phantom-destination fold row MUST flag C6 (via the proof:be-fold-ledger composition).

**What REDS on the pre-fix tree:** C1 (no FINAL.md), C5 (no version bump / changeset), C2 (the gestalt roster un-flipped until W-REFLECT), C6 (until W-FOLD-LEDGER discharges every row) — the gate is born-RED and goes GREEN only when the whole tranche is closed + the cut staged.

## The binding π — none (the cut paints ZERO pixels; the BB.W-NDA-DECIDE / BB.W-CLOSE-BATTERY precedent)

W-CUT is a register/publish operation, not a visual wave — it changes ZERO paint (the surfaces it ships were already painted-true + gestalt-verified by their OWN waves + W-REFLECT). Per BB inv-4 ("the gestalt bar binds VISUAL waves; this is a register-disposition flip + a doc reconcile + a lock gate, zero pixels"), there is **NO `tests-visual/bf-cut.spec.ts`** and **NO own `proof:ba-gestalt` row**. The binding paint truth is the WHOLE BF roster flipped GREEN by W-REFLECT on fresh both-mode `:5199` captures (chromium + the W-SAFARI-CAPTURE webkit project) — the cut VERIFIES that roster is operative-PASS (C2), it does not re-earn a pixel.

## The gestalt row

W-CUT contributes NO new gestalt-roster surface (zero pixels). Its gestalt obligation is the META requirement: the cut is blocked until EVERY BF-roster row is PASS on a fresh whole-page both-mode `:5199` capture (W-REFLECT, surface-hash freshness floor, never `reducedMotion`), across the dock-hallmark surfaces (the bloom dock, the fission now-playing split, the contextual silhouette, the V↔H morph, the rail facets, the grow-on-event, the de-shadcn FORM, the consumer band). C2 (`proof:ba-gestalt` operative-PASS) is that obligation made machine-checkable — a single FAIL row blocks the tag.

## Fences

- **NEVER autonomous (the standing publish constraint, ABSOLUTE).** The publish, the tag-push, the merge-to-master, and the slides redeploy are USER-DOMAIN-AUTHORIZED. The agent runs the read-only Phase-C verification + authors the Phase-D checklist + STOPS. No agent fires `git tag` / `git push` / `npm publish` / a deploy without the user's explicit per-step go.
- **The foreign-tree fence is LITERAL (inv-26; the park-not-restored ABSOLUTE).** The siblings-absent emulation is a FRESH `/tmp` glass-ui worktree, NEVER a `mv`/`rm`/move of ANY `~/Programming/<sibling>` tree. `verify-siblings-intact.mjs` runs before AND after. slides + speedtest adopt on THEIR `^4.x` bump in THEIR repos — BF edits zero sibling tree.
- **No-legacy / clean break (SEED §6 precept 1).** The spike is DELETED (no alias, no re-export shim, not parked); every retired surface is a MIGRATION.md clean-break row, never a back-compat dual-read.
- **No out-of-band lineage publish (inv-11).** The publish MUST originate from a `master`-ancestor commit through the gated `release.sh`/`release.yml` provenance path — never a `prototype/liquid-dock`-direct publish (the d6-fork stranding class).
- **No source-green close (SEED §6 precept 4; the anti-disease invariant).** The cut is NOT closeable on green source gates alone — it requires the binding π GREEN on chromium + webkit + every gestalt-roster row PASS on fresh captures (C2). A source-green + π-absent cut is the close-class lie BF exists to kill.
- **Presets-in-consumers (SEED §6 precept 7).** The slides album palette / app-specific hues stay in slides; the library ships its own warm-cream identity defaults. The redeploy adopts the library default; the consumer keeps its presets.
- **The anti-pattern this must not become:** a "ship it" cut that greens the gate battery WITH siblings present (the BA `--run local` lie — the gates that RED on the clean CI runner sail past), or that tags from the prototype branch (the d6 stranding), or that an agent fires without the user's explicit publish greenlight (the standing autonomy fence). Each is machine-fenced (C3/C4/C7) + checklist-gated.

## Disposition links

W-CUT does not BUILD a census row — it is the VERIFICATION gate that the WHOLE census is discharged before the tag. It transitively closes the tranche by asserting (via C6 / `proof:be-fold-ledger`) that every BUILD row landed (D1-D23, D29, D31, D32), every DEFER-with-trigger carries a live re-entry condition (D24 album-Metal, D25 teardrop-budget, D26 album-shade, D28 useLayerTransition-fold), the single DEFER (D27 kf-snap-option) is parked with its next-cut trigger, and the RETIRE (D30 useLiquidMorph orphan, via D2/W-SPIKE-DELETE) is gone. The cut's own discipline (the `--run full` siblings-absent close, the foreign-tree-safe `/tmp` worktree, the master-ancestor provenance publish) is the BB.W-CLOSE-BATTERY + the park-not-restored sentinel + the inv-11 lineage gate, composed — never a new release path.
