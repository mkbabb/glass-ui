# Tranche AO — PATH-FORWARD synthesis

The 6-lane AO.W0 audit (ALPHA prompt-coverage · BETA deferral-inventory · GAMMA empirical-state · DELTA transpositions · EPSILON keystone · OMEGA cross-repo) over the post-AN glass-ui state (2.1.0, HEAD `4869b74`). This synthesis is the binding basis for the AO plan.

## § The one load-bearing fact

glass-ui opens AO against a **clean ledger**. ALPHA: 0 unaddressed, 0 survivors across the AM→AN arc; the precept canon HELD; and the consumer that drives everything — muster's H tranche — surfaces **no glass-ui primitive gap** (its multi-voter keystone composes already-shipped 2.1.0 primitives or is muster-bespoke; H is muster-only). EPSILON's cross-suite survey finds **no ≥2-consumer pattern that clears the substrate-promotion gate** (the inline-edit shapes diverge; LabeledSlider is minor-additive) — promoting one would be the overfit trap the precepts forbid. The two AN ARCHIVED-on-2-consumer items stay correctly gated; H creates no second consumer for either.

So AO is not consumer-gap-driven and not primitive-promotion-driven. The audit's real finding is internal: **the library carries three stale self-descriptions, and one live legacy alias.** AO makes glass-ui's self-knowledge true and the source pristine — the precise no-workaround, no-legacy, elegance/simplicity work the directive calls for, landed in the ideal window (a clean ledger, before the next feature tranche).

## § Thesis

**AN closed the consumer-gap shape. AO closes the self-measurement shape** — glass-ui's budget gate measures what consumers actually draw, its build matches its real toolchain, its last legacy alias deletes, and its CSS cascade consolidates against a re-based, honest ceiling.

The headline is the measurement-truth + CSS-architecture pass; the hygiene (delete the inv-47 alias, retire the dead heap prefix, resync the stale doc, fix the dist-wipe footgun) rides the same close and funds the headline. The organizing insight from DELTA is that the apparent CSS crisis was never real — it was a blind gate — so AO's first move is to make the measurement honest, and only then re-base and consolidate against reality.

## § The five resolved findings

1. **The budget gate is blind to half the stylesheet — and that is the real headline.** DELTA D1: `profile:budget` measures `dist/glass-ui.css` (the Vite-extracted SFC-scoped component CSS, 7805 gzip) and reports 90.2% of an 8650-gzip ceiling. But the consumer never imports that file in isolation — `@import "@mkbabb/glass-ui/styles"` resolves to `dist/styles/index.css` (the token cascade, ~2441 gzip) which `@import`s the SFC bundle via the AN.W1 fold; the real combined consumer draw is ~10.2 KiB gzip. **A regression in the cascade arm (tokens / theme / utilities) never moves the gated number at all.** The "845 B of slack crisis" GAMMA surfaced is a mis-measurement, not a crunch. AO.W2 fixes the gate to measure the real consumer artifact + AO.W3 re-bases the ceiling against it. This is the gestalt move: a gate that does not measure what ships is a false witness — the same class of blindness the muster H.W3 critical-path-gate had (it walked the src-closure, not the built-chunk graph). The library and its consumer carried the same gate-blindness; both close at the cause.

2. **The dist-wipe footgun causes the blindness.** DELTA D2: `vite.iter.config.ts` omits `publishStyleAssets()` and Vite's `emptyOutDir` defaults true, so every `iter-build` (hence every `profile:budget`) wipes `dist/` and never recreates `dist/styles` / the fold — which is exactly why the orchestrator had to re-run the canonical build last at AN.W7 and muster G.W3. The clean fix is to share `publishStyleAssets()` across both configs (iter-build = canonical-minus-dts) or give iter-build its own `dist-iter/` outDir. AO.W2 closes the footgun so the gate can measure the real `dist/styles` artifact.

3. **The 8 GB heap prefix is dead weight for a toolchain that no longer exists.** GAMMA + DELTA D3: CLAUDE.md §Build describes the build as `vite-plugin-dts` → api-extractor per-entry with a ~6.7 GB RSS peak requiring `--max-old-space-size=8192`. But at HEAD the dts emit is out-of-band via `vue-tsc --project tsconfig.build.json` (api-extractor + vite-plugin-dts are GONE from deps); the build is ~6.9 s and both arms peak < 740 MB RSS — far under Node's ~4 GB default. The prefix is dead weight at 4 sites (package.json ×2, release.sh:81, release.yml:31) and the §Build paragraph is stale. AO.W2 drops the prefix + resyncs the doc to the real toolchain.

4. **One live inv-47 / L-inv-4 violation deletes.** BETA: `src/composables/motion/useSpringOrchestrator.ts` is a live `@deprecated` back-compat export alias (`useSpringOrchestrator = useNumericTransition`), kept as a "one-minor courtesy" at AL.W9-δ — a window now stale (the rename predates 2.0.0; the lib is at 2.1.0) with zero external consumers (EPSILON confirmed across the whole constellation; only 3 demo-private sites + 2 shim test cases reference it). It violates the no-backwards-compat-alias invariant. AO.W2 deletes the shim + the `export *`, migrates the 3 demo sites + 2 tests to `useNumericTransition`, and scrubs the "retires at v3.0" comments. Clean break, no replacement alias.

5. **AO is glass-ui-internal-first; the version bump exercises changesets.** OMEGA: the consumer perimeter is healthy (no demand forcing a change); AO needs no cross-repo source move. Deleting a public export (`useSpringOrchestrator`) is a breaking change, so AO's version bump is the natural occasion for the **first real changeset-driven release** — the `.changeset/` machinery landed at G.W5 but every publish to date was a manual `npm publish`. AO routes its bump through `changeset add` → `changeset version` → tag, exercising the path (the publish leg is user-domain). The version is the W1/W4 decision; the default is **3.0.0** (the alias-removal break, the first changeset-driven major) — safe to cascade because the removed alias has zero consumers, so nothing downstream breaks on the bump.

## § Coverage proof

ALPHA: 13 DELIVERED / 0 UNADDRESSED across the AM→AN arc; the precept canon (the 9 memory feedbacks + the standing invariants) HELD over the AN window — agent git-discipline held, no backwards-compat slip in the AN work, no greenfield-voice breach. The chronic candidates (the 2 AN ARCHIVED items) stay correctly gated. No survivor forces AO; AO is elective internal-correctness work landed in a clean window — which the directive explicitly authorizes ("refine the glass-ui tranche").

## § Wave shape (Shape: 5-wave self-measurement-truth tranche; dev/impl boundary at W1|W2)

| Wave | Title | Phase |
|---|---|---|
| AO.W0 | 6-lane audit + path-forward synthesis | DEV (this) |
| AO.W1 | Design slice — gate-truth + CSS re-base + cascade-consolidation + legacy-purge + changeset-release | DEV (boundary) |
| AO.W2 | Self-measurement truth + legacy purge (D1 gate measures real artifact · D2 iter-build dist-wipe fix · D3 drop heap prefix + resync §Build · delete the inv-47 alias) | IMPL |
| AO.W3 | CSS budget re-base + cascade consolidation (D4 re-base ceiling against real draw · D5 per-subpath enforcement · D6 cascade dedup / @theme+@utility consolidation for genuine headroom) | IMPL |
| AO.W4 | Close ceremony + first changeset-driven release (π/ι + overfitting + AO.FINAL + the changeset version bump [default 3.0.0] + the watched-conditions ledger) | IMPL (LAST) |

DAG — W0 first; W1 after W0; W2 is the truth-foundation (W3's re-base depends on the gate measuring reality); W3 the headline architectural pass; W4 closes + exercises changesets. W2's four items are file-disjoint enough to parallelize (gate/build config vs the motion-alias deletion).

Named-forward (not AO waves): the 2 AN ARCHIVED-on-2-consumer items (reorder recipe, dock panel-host) — passive watch, LAND when a second consumer materialises. The inline-edit primitive (bbnf-buddy `EditableNumber` + words `EditableField`) — a WATCHED convergence condition (2 divergent shapes today; promotes when they converge). `LabeledSlider` numeric-readout — a minor-additive option for a later tranche if a third consumer wants it. The dts-build 8 GB upstream root-cause (vite-plugin-dts incremental rollup) is moot — the toolchain already moved off api-extractor, so AO simply drops the now-pointless prefix rather than waiting on upstream.

## § Cross-repo posture

AO is **glass-ui-internal-first**. The one cross-repo-shaped exercise is the first changeset-driven release (staged locally; the publish leg user-domain). The user-domain perimeter items (OMEGA): push glass-ui's 72 held commits to `origin` (a provenance/backup liability — npm 2.1.0 is live and consumed, but the source for it is single-copy local until pushed; one `git push` reconciles it); seed the `NPM_TOKEN` repo secret to activate the never-run `release.yml`; commit + push the precepts submodule's 3 dirty files (the dev-iteration doc + canonical-readme-shape + inv-30 amendment) + bump glass-ui's gitlink. These need the user's GitHub push authority; they are surfaced, not absorbed into AO source waves.

## § Brittleness

AO declares ZERO brittleness windows. The gate/build-config fixes are revertible; the cascade consolidation is CSS-dedup verified against `proof:theme` + a visual π re-probe; the alias deletion is a clean break with zero external consumers (the only "irreversible" is the npm publish of the new version, an enabling property — consumers pin at leisure since nothing they use is removed). No rename (inv 43). The 4 motion primitives + the visual canon are the regression bar throughout.

## § Amendment — speedtest AQ consumer-request fold (post-W0)

This synthesis's §The-one-load-bearing-fact ("clean ledger; 0 unaddressed; no consumer-surfaced primitive gap") was true as of the audit's basis commit `4869b74` — it ran **before speedtest tranche AQ existed**. AQ's 10-lane cohort subsequently handed AO five consumer-driven R0-glass items (`CONSUMER-REQUEST-speedtest-AQ.md`; authoritative spec `speedtest/docs/tranches/AQ/R0-GLASS-COORDINATION.md`). AO owns the disposition and FOLDS all five:

- **R0G-1 Aurora demand-driven render loop** + **R0G-2 InstrumentChassis breakpoint child-reserve** — perf/correctness transpositions of existing primitives the consumer cannot fix idiomatically (the loop + the child layout live in the primitives). The AO ethos exactly (elegance/simplicity/performance of existing surface).
- **R0G-3 `useIdleReady`** — 5 consumer sites; **clears J inv 10 / L inv 8** (≥2-consumer substrate-promotion gate). This is the consumer-gap the W0 audit read as empty because AQ had not surfaced it. EPSILON's "no ≥2-consumer pattern clears the gate" is amended for this one composable.
- **R0G-4 `Toaster` `position`** + **R0G-5 `--surface-public-data-panel` token** — additive API/cascade completeness; no breaking change; `proof:theme`-gated.

None invents unjustified substrate; all are additive and ride the planned 3.0.0 alias-removal break. The fold extends the internal-first thesis rather than contradicting it — the headline stays self-measurement-truth + CSS-architecture; the consumer items are a parallel correctness/promotion track (AO.W3) that the CSS re-base (AO.W4) then measures against. Wave shape grows 5→6; the publish leg stays user-domain (now outward-facing for the consumer items too — confirm-first).
