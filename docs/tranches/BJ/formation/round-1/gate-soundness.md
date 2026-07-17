# Round 1 — gate soundness (?)

## Summary

The enforced gate surface is ~1032 vitest assertions across 193 files/248 describes — roughly 20x the user-mandated 40-60, and it is dominated by exact-literal mirror gates that fail on legitimate design retunes rather than regressions (the exact contrived class ruled out). Compounding this, the entire 171-spec / 557-test "fail-CLOSED" π visual suite — including the one genuinely sound pixel gate — runs in NO automated gate; CI and release execute vitest + build + verify:package only. My census supports collapsing to ~45-55 invariant gates: keep token-graph, verify:package export resolution, the root public-surface lock, the reka-binding render canary, cross-package type parity, the per-component behavioral contract cores, a handful of style ordering/graph invariants, and the wired-up substrate-paints-color pixel floor; kill the magic-literal mirrors, the self-mirror spring gate, the demo-fixture pins, the 6 zero-assertion specs, and the orphaned canon-doc machinery.

## Findings (8)

### [major] pin-implementation-literal

**Claim:** The enforced style/demo suite is dominated by exact magic-literal assertions that mirror the CSS/config source, so any legitimate design retune fails them without indicating a regression — the contrived class the user ruled out.

**Evidence:** tests/styles/glass-subtlety.test.ts:63-66,80-87 (blur px pinned to 7/11/1/16px/17px); tests/components/ui/dialog/graded-backdrop.test.ts:126-141 (--glass-halo-blur:20px, --glass-halo-core:13rem, --glass-halo-bloom:7rem, blur(calc(34px))); tests/demo/aurora-stage-affordance.test.ts:101-102 (every preset amplitude pinned to 0.45); tests/demo/springs-story.test.ts:59-64 (--preview-start:1.5rem etc.); tests/styles/typography.test.ts:15 (0.7861513777574233 literal, redundant with the 1/√φ relationship at line 13); tests/styles/radius-dialog-bind.test.ts:63,68,102,110 (terminal 1rem/12px literals, redundant with the bind-graph checks at 57-62,72-73). A retune of any of these design values reds a green gate with no regression.

**Proposed:** fold-into-<style-invariant-collapse> — replace each exact-literal head with the underlying relationship it guards (ordering floating>quiet already exists at glass-subtlety:89-92; dialog-radius==card-radius at radius-dialog-bind:57-62; amplitude in (0, cap] & swirl===true), delete the literal mirrors; nets the style/demo gate count from dozens to a handful.

### [major] unwired-gate-non-execution

**Claim:** The 171-spec / 557-test tests-visual suite — self-described 'fail-CLOSED π visual-runtime' and containing the only sound pixel-readback gate — executes in no automated gate; CI and release run vitest + build + verify:package only, so a black/broken live render passes every enforced gate.

**Evidence:** .github/workflows/ci.yml:20-23 (npm ci; typecheck; npm test; build) and release.yml:28-35 run only typecheck/build/verify:package/test(=vitest per package.json:532); the visual suite lives in the separate tests-visual workspace (package.json:13-15) with its own playwright runner (tests-visual/package.json), invoked by no CI step and only by release.sh:23-32 as a manual 'human pre-tag paint review'. tests-visual/substrate-paints-color.spec.ts:135-228 is a real non-black+coverage pixel gate but never runs in CI; playwright.config.ts:47-50 claims 'fail-CLOSED' while nothing executes it.

**Proposed:** build — wire the small sound subset (substrate-paints-color aurora non-black + blob coverage-band) into a CI job as invariant pixel gates; retire the 'fail-CLOSED' framing from any spec that no gate runs.

### [major] mirror-implementation-self-fixture

**Claim:** springProjection asserts the generated spring-token CSS equals the output of springProjection() — the same function that emits the CSS — so it mirrors the implementation and cannot fail on a generator bug (only on a manual hand-edit of the generated file).

**Evidence:** tests/composables/motion/springProjection.test.ts:24-32 iterates SPRING_PRESETS, computes projection=springProjection(row), then asserts tokens.contains(`--spring-${row.name}: ${projection.stops}`); scripts/regen-spring-tokens.mjs generates scheme-spring.css from the same springProjection, so both sides of the equality share the source of truth. The peak/stops cross-check at 34-44 is defended in-comment but both values derive from the one springProjection call.

**Proposed:** retire the byte-equality assertion (a lint that flags hand-edits of generated files is the honest guard); keep only an independent physical invariant (peak>=1, settle within a bound) if one can be derived without re-calling the generator.

### [minor] vacuous-no-assertion

**Claim:** Six tests-visual '.spec.ts' files contain zero expect()/assert calls — they navigate and screenshot but assert nothing, so they are green by construction under the suite's testMatch and pad the gate count with un-failable gates.

**Evidence:** grep of expect(|assert over tests-visual/*.spec.ts returns 0 for: _cohere-capture.spec.ts, _cohere-debug.spec.ts, _cohere-shadow-debug.spec.ts, _fix-glassui-dark-capture.spec.ts, _prim-polish-capture.spec.ts, _wdelta0-capture.spec.ts; all are matched by playwright.config.ts:46 testMatch:'*.spec.ts'. A capture producer that asserts nothing cannot fail on any regression.

**Proposed:** retire — move capture-only producers out of the *.spec.ts glob (rename to *.capture.mjs or a scripts/ producer) so they stop registering as passing gates; they are dev artifacts, not gates.

### [minor] unwired-gate-non-execution

**Claim:** scripts/lib/canon-doc.mjs — a well-built anti-scaffold gate library (present/content-real floors to block green-over-stub) — is imported by no test and no package.json gate, so its enforcement never runs.

**Evidence:** grep 'canon-doc' across tests/ returns no importer; package.json:515-534 has no script invoking it; the only references are self-references within scripts/. auditCanonHomes/CONTENT_MIN_CHARS (canon-doc.mjs:1-90) therefore never execute against a real close.

**Proposed:** build or retire — either wire auditCanonHomes into the vitest suite as a single doc-integrity gate (it is invariant-worthy) or delete the dead machinery; leaving it unwired is gate theater.

### [minor] testing-the-tooling-fixture-mirror

**Claim:** profile-bundle-value-js.test.ts exercises the profile:bundle dev report generator against a hand-built fixture whose accepted/rejected allowlist mirrors the tool's own classification table — it validates the reporting tool, not the shipped library, against its own coded expectation.

**Evidence:** tests/scripts/profile-bundle-value-js.test.ts:48-80 builds a temp package (lines 8-22), imports scripts/profile-bundle.mjs (line 32), and asserts facts.accepted/rejected equal the same accepted[]/rejected[] arrays the fixture fed in (51-79). The gate passes iff the tool classifies the fixture the way the tool is written to; no library regression can red it.

**Proposed:** retire from the gate suite — profile:bundle is a dev report generator (package.json:530), not a shipped contract; its self-test is out of scope for the invariant-gate collapse.

### [note] redundant-surface-snapshot

**Claim:** Per-component surface-lock heads duplicate the single root/subpath public-surface lock, multiplying change-detector gates that all red together on any intentional export edit.

**Evidence:** tests/components/slider.contract.test.ts:8-10 asserts Object.keys(SliderSurface).toEqual(['Slider']) while tests/public-surface.spec.ts:514-519 already asserts the exact per-subpath surface via exactSubpathRuntimeSurfaces, and :492-494 the exact root surface; the same lock is re-encoded in dozens of *.contract.test.ts files.

**Proposed:** fold-into-<public-surface-lock> — keep the one authoritative surface census in public-surface.spec.ts; drop the duplicate Object.keys heads from the component contract tests (leave their behavioral bodies).

### [note] gate-count-overshoot

**Claim:** The enforced vitest gate surface is ~20x the user-mandated 40-60 invariant gates, so the collapse is quantitatively unmet even before the vacuous/overfit kills.

**Evidence:** vitest suite = 1032 it/test blocks across 248 describe blocks in 193 files (grep counts); tests-visual adds 557 more (unenforced). MEMORY mandate: collapse to ~40-60 invariant gates. Census-supported keeps cluster to roughly 45-55: token-graph.test.ts, verify-export-types.mjs, public-surface root+subpath lock, reka-binding-idiom canary, public-contracts.test-d cross-package parity, the ~component behavioral contract cores (minus the Object.keys heads), the style ordering/graph invariants (glass-subtlety:89-92, radius bind-graph, typography 1/√φ relationship, token-graph cycle), and the wired-up substrate-paints-color pixel floors.

**Proposed:** fold-into-<gate-collapse> — adopt the keep-list above as the ~45-55 invariant set; the kills in this report (literal mirrors, self-mirror spring, demo pins, zero-assert specs, tooling self-test, orphan canon-doc, duplicate surface heads) are the delta that lands the count in-band.

