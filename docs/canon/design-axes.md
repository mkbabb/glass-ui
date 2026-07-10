# Design axes (canon home)

The library binds these axes at v1.0 (L close) and forward:

1. **Token-first.** Every visual behaviour is a CSS custom property; no consumer edits
   library source for styling.
2. **Component over CSS class.** Interactive elements bundle the four-state contract
   (standard / hover / active / disabled); static patterns are CSS classes.
3. **Visual-load-bearing-ness (J invariant 10).** Substrate-without-consumer is binary at
   every close; a primitive ships only when it has ≥ 2 consumers, OR it is formally
   retired with rationale. A published custom package / flat subpath / root-barrel
   composable with < 2 non-self consumers must carry a `docs/consumer-evidence/<x>.md`
   doc (machine-locked by `proof:consumer-evidence-live` + `proof:component-orphan`).
4. **No tranche-letter shadow execution.** Work cohorts spanning ≥ 1 release ship under a
   `docs/tranches/<LETTER>/` plan folder.
5. **Hardened agent git clause.** Agents NEVER stage / commit / stash / checkout / reset /
   restore. Read-only git only; the orchestrator owns the index.
6. **vueuse-FREE root barrel (L.W1).** The root barrel re-exports no symbol whose
   implementation imports `@vueuse/core`. The 4 vueuse-bearing surfaces reach consumers via
   flat subpaths: `/forms` (Input/Textarea/Combobox\*), `/dark` (useGlobalDark),
   `/keyboard` (the shortcuts registry), `/carousel` (useCarousel + Carousel\*). This is
   the canonical SCC-trap closure shape for downstream Rollup `manualChunks` consumers.
7. **Subpath publication is binary (L.W0 Lane III).** `scripts/release.sh` runs a
   `node -e 'import(...)'` + tsc consumer-probe for every published subpath before
   `git tag`. Closes the silent-miss class.
8. **Migration guide is binding.** The library ships `MIGRATION.md` documenting each
   canonical migration path. **No legacy aliases** — a rename is a clean break with a
   MIGRATION row, never a back-compat alias.
9. **No out-of-band lineage publish (BA invariant 11).** Every `@mkbabb/glass-ui` registry
   publish MUST originate from a commit that is an ANCESTOR of `master`'s next cut, through
   the gated `release.sh`/`release.yml` provenance path. A publish from a divergent
   fork/feature branch is FORBIDDEN — it strands `^x`/`npm update` consumers across the
   bifurcation (the `feat/d6-library-3.10` fork-lineage class). The prune/disposition
   gates carry a registry-consumer probe (machine-locked by `proof:lineage-probe`): before
   retiring any public symbol/subpath the census probes the registry + the known-consumer
   constellation, and a published-but-off-mainline export forces a NAMED fold/subsume/
   migration line, never a silent prune.
