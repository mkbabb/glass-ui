# AX.W25a — CSS god-module gate-extension: born-RED, .css-aware, ci-tagged

**Band** J · ENCAPSULATION · **Severity** major · **dependsOn** AX.W27a *(the gate-tag MODEL —
the at-LEAST-ci `proof:tag-parity` form — is W27a's first act, shared with W25a; §4 note 20/21)*
· **Charter** AX.md §3 (the `### AX.W25a` block, lines 1296-1316) + the §1 summary row (line 133)
+ the §2 band-J membership (lines 188-189) + the §2b band-J precept row (line 222) + §4 note 19
(the gm0 born-RED-first staging, lines 2141-2151) + §4 note 21 (the at-LEAST-ci tag model W25a's
tag matches, lines 2162-2167) · **Audit** `deep-audit-corpus.json` slice `god-modules` (F0 =
gate-collector `.css`-blind + local-only; F1 = tokens.css 1728; F2 = dock.css 1227; F3 =
utilities.css 1119) + slice `tailwind-styling` (F0 = the four-file >500 ceiling break; the
metric-badge/input-bar component-CSS-in-utilities; the floating-panel dead-chain) +
`converge-digest.md` `idiom:value.js` (lines 132-133 — the published-dist `@source "../components"`
deadlink, jointly a glass-ui packaging defect + a consumer `@source`-gap routed to W34).

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD on **two structurally-falsifiable witnesses** that do NOT hold today.
The charter audit baseline is `eaba94f`; the working tree at write-time is `at-dock-convergence`,
and the witnesses were re-measured LIVE (per the §0 cardinal "re-verify before acting"). Both
witnesses are *purely structural* (file-extension reach + line count; published-dist directory
resolution) — exactly the class the precept (`precepts/instructions/README.md:183`) names as the
sole case where a non-runtime artefact gate is sufficient. This wave has **NO visual surface** (the
gate-extension reports violations and the dist `@source` re-point is a packaging fix — no pixels
change), so the VISUAL-TRUTH clause below is the *structural-wave* variant, not a screenshot audit.

- **RED witness 1 (the no-god-module gate is `.css`-BLIND and local-only, so four CSS god-modules
  ship structurally invisible under a green CI).** `scripts/proof-no-god-module.mjs:47` collects
  ONLY `entry.name.endsWith(".ts") || entry.name.endsWith(".vue")` — `.css` files never enter the
  scan, so AV.W13's "largest now 475" was true for TS/Vue ONLY. A live `wc -l` at HEAD finds FOUR
  `.css` god-modules over the `HARD_LIMIT = 500` (`proof-no-god-module.mjs:20`): `tokens.css`
  **1728**, `dock.css` **1227**, `utilities.css` **1119**, `glass.css` **691** — none visible to
  the gate. AND the gate is registered `tags: ["local"]` only (`gates.mjs:336-339`; its own note
  "W6 gates-close folds it into the ci aggregate" describes a fold that never bit), so it does NOT
  run in CI: the TS violation it DOES catch (`useMetaballRenderer.ts` 569, grown from 351 at
  `0b27f01`) shipped silently into the batch-1 integration. *The falsifiable RED: extend the
  collector to accept `.css` and re-tag `["local","ci"]`, and the gate IMMEDIATELY reports the four
  born-RED-CORRECT violations (tokens/dock/utilities/glass) it was structurally blind to — and
  `proof:no-god-module` now appears in the CI aggregate where it was absent (RED — the gate is
  red-by-design the instant it can see `.css`). After W25b (+ W06 for dock) carve the four files,
  the gate goes GREEN (a green intermediate exists ONLY because the gate-extension is its own step;
  §4 note 19).*

- **RED witness 2 (the published `dist/styles/index.css` carries a dead `@source "../components"`
  content-scan directive that resolves to a non-existent dir).** `dist/styles/index.css:145`
  (mirroring `src/styles/index.css:137`) carries `@source "../components"`. From the **published**
  `dist/styles/` location that resolves to `node_modules/@mkbabb/glass-ui/dist/components` — a
  directory that **DOES NOT EXIST** (`ls dist/components` → "No such file or directory"; the dist is
  a flat `dist/*.js` per-subpath chunk set, no `components/` subtree). So glass-ui's OWN
  component-template content-scan scans NOTHING in a consumer's production build (value.js gh-pages
  `production`-condition build confirmed — digest line 132): the library's layout/CVA utility
  classes that a consumer's own templates don't also emit are dropped from the production CSS across
  181 glass-ui mount sites. (In DEV the same directive resolves from `src/styles/` against
  `src/components`, which DOES exist — `ls src/components` → present — so the deadlink is a
  **dist-only** packaging defect masked in development.) *The falsifiable RED: a probe asserting the
  `@source` directive in the BUILT `dist/styles/index.css` resolves to an existing directory FAILS
  at HEAD (`../components` from `dist/styles/` → absent). After: the directive re-points at the real
  dist chunk location and the probe GREENs.*

The HardGate drives both witnesses to GREEN-AT-THE-GATE-LEVEL (the four CSS violations are reported
RED-by-design and CLEARED by W25b/W06, not by W25a; the dist `@source` resolves). W25a does NOT
carve any monolith — it is the gate-extension + re-tag + the dist `@source` fix ONLY, so a green
intermediate exists (§4 note 19: a single combined wave could never pass its own gate until every
carve lands).

---

## Goal

`proof:no-god-module` sees `.css` and runs in CI, reporting the four CSS god-modules
(tokens/dock/utilities/glass) as born-RED-CORRECT violations for W25b/W06 to clear, and the
published `dist/styles/index.css` `@source` directive resolves to a real dist directory so the
library is self-sufficient for content-scan — both proven by precept-valid structural artefacts.

---

## Scope (the gestalt fix — no workaround, no legacy alias)

Two root causes, ONE wave, both structural (slice `god-modules` F0 + digest `idiom:value.js`). The
wave makes the gate HONEST and the dist SELF-SUFFICIENT; it does NOT carve a single monolith (that
is W25b + W06 — the dependsOn ordering guarantees the green intermediate).

**(1) Extend the `proof:no-god-module` collector to scan `.css` — born-RED-CORRECT (F0).** In
`scripts/proof-no-god-module.mjs`, the `collect()` recursion (`:38-53`) is one extension: the file
predicate at `:47` accepts `.ts`/`.vue` only; add `.css` so the four style god-modules enter the
same `HARD_LIMIT = 500` line-bound check the TS/Vue files already pass through. This is a
single-axis collector change — the `lineCount()` (`:55-64`, the `wc -l`-faithful counter), the
`WARN_LIMIT`/`HARD_LIMIT` bands, the artefact emit (`writeGateArtifact`), and the pass/fail exit
(`:130`) are unchanged. The instant the collector accepts `.css`, the gate reports the four
born-RED-CORRECT violations (tokens 1728 / dock 1227 / utilities 1119 / glass 691) — which is
**CORRECT and INTENDED**: born-RED is the staging signal, not a defect (§4 note 19). One caveat to
encode honestly: **glass.css (691) is NOT a length-defect** — the audit is emphatic it has a SINGLE
cohesion axis (§4 note 19; a forced split is contrivance, violating §0 no-contrivance). The gate's
ceiling is mechanical line-count; the COHESION-not-length rationale for single-axis files is a W25b
ADJUDICATION, not a W25a gate-logic exception (do NOT special-case glass.css in the collector — the
gate reports it RED uniformly; W25b decides a minimal `glass/material.css` split lands ONLY if the
gate forces it). Keep the bite live: the gate still fires on any future `.css` past 500.

**(2) Re-tag `proof:no-god-module` `["local","ci"]` so it bites in CI (F0).** In
`scripts/gates.mjs:338`, change `tags: ["local"]` → `tags: ["local","ci"]` so the gate enters the
CI aggregate (the tag selects the aggregates a gate runs in — `gates.mjs:23`). Update the stale note
(`:339`) that promises a never-bitten ci-fold. The tag choice is **`["local","ci"]` NOT
`["local","ci","release"]`** — it matches the **at-LEAST-ci tag MODEL** W27a authors (§4 note 21):
the manifest's real parity claim is local==ci; release is a deliberate subset (only the 2 legacy
gates W27a promotes carry `release`). W25a's `["local","ci"]` is consistent with `proof:tag-parity`
by construction — this is precisely why W25a dependsOn W27a (the MODEL is W27a's first act, shared
with W25a; §3 line 1297). Re-tagging to release would have redded 50 unnamed gates that legitimately
carry no release tag — the W25/W27 internal contradiction note 21 resolves.

**(3) Fix the DIST `@source` content-scan deadlink so the library is self-sufficient (digest
line 132/133, part 1).** The intent of `@source "../components"` is to make Tailwind's content-scan
reach glass-ui's COMPILED component templates so a consumer's build emits the library's layout/CVA
utility classes. In DEV (`src/styles/index.css:137`) it correctly resolves to `src/components`. But
the SAME relative path ships verbatim into `dist/styles/index.css:145`, where it resolves to a
non-existent `dist/components/`. The gestalt fix re-points the directive at the **real published
chunk location** so the directive is correct IN BOTH trees — the dist chunk set is the flat
`dist/*.js`, so the directive must scan the dist JS (the compiled render functions carrying the
class strings), e.g. `@source "..";` (from `dist/styles/` → `dist/`) which reaches `dist/*.js`, OR a
build-step that rewrites the directive to a dist-correct path on emit. **RATIFY-BEFORE-IMPL** the
exact form (see Open questions / Cadence step 1): the recommended path is a **single directive that
resolves correctly in both the `src/` cascade and the published `dist/` cascade** — the cleanest is
to make `src/styles/index.css` carry a directive whose dist-emitted form lands on `dist/*.js` (a
`@source "../components"` that the build rewrites to `@source ".."`, OR authoring the directive so
its emitted relative path is dist-correct). NO compensating consumer `@source` is added here (that
is the value.js consumer leg, digest part 2, routed to W34) — W25a makes the **library**
self-sufficient; the consumer-side defense-in-depth `@source "...glass-ui/dist"` adoption note is a
W34 annex.

No legacy alias, no second parallel directive, no leaving the dead `../components` line "for back
compat" — one directive, dist-correct, abrogate-before-patch.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `scripts/proof-no-god-module.mjs` | Extend the `collect()` predicate (`:47`) to accept `.css` alongside `.ts`/`.vue`. Update the header comment (`:1-14`) to state the `.css`-aware scope. **NO change to `HARD_LIMIT`/`WARN_LIMIT`/`lineCount`/the exit logic** — the four CSS violations are born-RED-CORRECT, not a gate bug. |
| `scripts/gates.mjs` | Re-tag the `proof:no-god-module` registration (`:338`) `["local"]` → `["local","ci"]`; rewrite the stale note (`:339`) to drop the never-bitten ci-fold promise and state the `.css`-aware + at-least-ci-model scope. |
| `src/styles/index.css` | Re-point the `@source` directive (`:137`) so its **dist-emitted** form resolves to a real `dist/` directory (the exact form is the RATIFY item — Cadence step 1). The DEV resolution against `src/components` must remain correct. |
| `dist/styles/index.css` | Verification target ONLY for the gate probe (the build regenerates it — W25a does NOT hand-edit `dist/`; the `src/styles/index.css` edit + `npm run build` re-emits the corrected directive). |
| `docs/tranches/AX/audit/W25a-css-god-module-gate-extension.json` | **NEW** — the born-RED→GREEN ledger + the dist-`@source` RATIFY record + the four born-RED-CORRECT violation roster handed to W25b/W06. |

**OUT of bounds:** the four CSS monolith CARVES — `tokens.css` §-seam partials + `utilities.css`
component-recipe RELOCATION + the floating-panel dead-chain excise + the `glass-specular-track.css`
→ `glass-material.css` rename (**W25b**); the `dock.css` split into `src/styles/dock/` partials
(**W06**); the TS `useMetaballRenderer.ts` 569 split + the other TS encapsulation (**W26**); the
`proof:tag-parity` at-least-ci meta-assert + the var-in-arbitrary guard gate AUTHORSHIP (**W27a** —
W25a only CONSUMES the tag model, it does not author the parity gate); the consumer-side
`@source "...glass-ui/dist"` adoption note for value.js/words (**W34** — W25a writes NO sibling
source; it routes the consumer leg as an annex); the meta-gate that every `scripts/proof-*.mjs` has
a matching `package.json` entry (**W00** owns the proof↔package.json meta-gate; W25a's re-tag is
consistent with it but does not author it).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W25b (CSS monolith carves) — the dependsOn child.** W25b dependsOn W25a (charter line 1321)
  and CLEARS the four born-RED violations W25a reports. **The shared concern is the four CSS files,
  but DISJOINT BY ROLE:** W25a touches the GATE (`proof-no-god-module.mjs`, `gates.mjs`) + the dist
  `@source` directive (`src/styles/index.css`) — it does NOT touch `tokens.css`/`utilities.css`/
  `glass.css`/the floating-panel chain. W25b touches the FOUR CSS FILES (the carves) — it does NOT
  touch the gate collector or the `@source` directive. The born-RED roster W25a emits in its audit
  json is the EXACT input W25b/W06 carve against. No shared file edit; pure sequence
  (gate-extension → carves).

- **vs W06 (dock storybook consolidation + dock.css split).** W06 splits `dock.css` (1227) into
  `src/styles/dock/` partials and runs `proof:no-god-module` (.css-aware, W25a) over the dock
  partials (charter line 523). **Disjoint by file:** W25a authors the `.css`-aware gate that W06's
  dock partials must pass; W06 owns the `dock.css` carve. W25a's gate is the TOOL; W06 (and W25b) are
  the CLEARERS. W25a does NOT touch `dock.css`.

- **vs W27a (legacy gate-hardening — the gate-tag MODEL author).** W25a dependsOn W27a because the
  **at-LEAST-ci tag MODEL** (the `proof:tag-parity` meta-assert form) is W27a's first act, shared
  with W25a (§3 line 1297; §4 note 20). **Disjoint by ownership:** W27a AUTHORS `proof:tag-parity`
  (the at-least-ci meta-assertion) + promotes the 2 legacy gates to release + authors the
  var-in-arbitrary guard. W25a CONSUMES the model — it tags `proof:no-god-module` `["local","ci"]`
  CONSISTENT with the parity claim, so W27a's `proof:tag-parity` does not red W25a's choice. They
  share `scripts/gates.mjs` as an edit surface (W25a re-tags ONE entry; W27a re-tags TWO different
  entries + adds the parity gate) — **coordinate so the two gates.mjs edits are disjoint registration
  rows** (W25a: `proof:no-god-module`; W27a: `proof:fail-explicit` + `proof:no-legacy-commentary`),
  no overlapping line. The gate-tag MODEL DECISION (the shared first act) is recorded ONCE — W27a
  authors it; W25a references the recorded decision.

- **vs W00 (the π visual-runtime lane + the proof↔package.json meta-gate).** W00 authors the
  meta-gate that every `scripts/proof-*.mjs` has a matching `proof:*` package.json entry (charter
  line 280). `proof:no-god-module` ALREADY has its `package.json:619` entry — W25a's re-tag is in
  `gates.mjs` (the aggregate-membership manifest), NOT `package.json`, so it does not collide with
  W00's meta-gate. **Disjoint by file:** W00 owns the meta-gate authorship + the π workspace; W25a's
  re-tag is consistent with the meta-gate. W25a is STRUCTURAL (no π-lane consumer — it has no visual
  surface), so unlike W22/W20/W23/W24 it does NOT author a π-lane assertion.

- **vs W34 (cross-constellation consumer-adoption receiver).** The dist `@source` deadlink is
  **jointly** a glass-ui packaging defect (W25a fixes the LIBRARY side — the dist directive resolves)
  AND a consumer `@source`-directive gap (value.js + words lack the binding
  `@source "...glass-ui/dist"` per CLAUDE.md). **Disjoint by repo:** W25a fixes the in-repo dist
  directive; W34 receives the value.js + words consumer-`@source` adoption notes (digest line 133
  part 2, line 203). W25a writes NO sibling source — it routes the consumer leg as a named annex.
  The library fix (W25a) and the consumer defense-in-depth (W34) are independent: even after the
  dist fix, the consumer `@source` is the documented binding requirement, so both land.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

The implement and gate-author arms COLLAPSE here — this wave's deliverable IS the gate change, so
the gate-author and implementer are the same role. The actual count is **2** (1 implement+gate +
1 adversarial-verify), well under the AX ≤6-implementation / ≤7-read-only ceiling.

- **Implement + gate-author (≤1 agent — the gate-extension is the implementation).** Extends the
  `collect()` predicate in `proof-no-god-module.mjs` to accept `.css`; re-tags `proof:no-god-module`
  `["local","ci"]` in `gates.mjs` + rewrites the stale note; re-points the `src/styles/index.css`
  `@source` directive to the dist-correct form (after Cadence step 1 RATIFY); runs the gate locally
  to CONFIRM it now reports exactly the four expected CSS violations (tokens/dock/utilities/glass) +
  the one pre-existing TS violation (useMetaballRenderer 569) — five total RED, all born-RED-CORRECT;
  runs `npm run build` to re-emit `dist/styles/index.css` with the corrected `@source`; confirms the
  dist `@source`-resolves probe GREENs. `vue-tsc --noEmit` + the existing gate fleet at every
  interval (the gate change must not red an UNRELATED gate). Records the born-RED roster in the audit
  json for W25b/W06.

- **Adversarially-verify (≤1 read-only lane).** Re-runs both RED witnesses against the patched tree:
  (a) confirms `proof:no-god-module` reports EXACTLY the four CSS + one TS violations (not more, not
  fewer — a fifth CSS file creeping over 500 or a count drift is caught); (b) confirms the gate now
  carries `["local","ci"]` in `gates.mjs` and would RUN in the CI aggregate (not just local); (c)
  confirms the built `dist/styles/index.css` `@source` resolves to a real dir (`test -d` the
  resolved target from `dist/styles/`); (d) confirms `npm run build` re-emits the corrected directive
  (the dist is not hand-edited — it regenerates). ADVERSARIAL twists: **(i)** tries to make the gate
  "pass" by special-casing glass.css to skip the `.css` scan — confirms the collector treats all
  `.css` uniformly (born-RED on glass.css too; the cohesion-not-length rationale is W25b's
  adjudication, NOT a W25a gate exception) so a silent glass.css exemption is rejected; **(ii)**
  confirms the gate STILL bites a future `.ts`/`.vue` past 500 (the `.css` extension is additive, not
  a replacement — a one-character predicate regression that dropped `.vue` would pass the four-CSS
  assertion but break the TS bite); **(iii)** confirms the dist `@source` fix did NOT break the DEV
  cascade (the `src/styles/index.css` directive still resolves to `src/components` in a dev build —
  the dist-correct rewrite must not red the dev content-scan); **(iv)** confirms re-tagging to
  release was NOT done (a `["local","ci","release"]` tag would red `proof:tag-parity` per the
  at-least-ci model — the named exception is the 2 legacy gates ONLY).

- **(No separate gate-author arm.)** The wave's product is the gate change itself; there is no
  downstream assertion to author beyond the gate. W27a authors `proof:tag-parity` (the meta-assert
  W25a's tag must satisfy); W00 authors the proof↔package.json meta-gate — both are sibling-owned.

---

## HardGate (born-RED→GREEN + the VISUAL-TRUTH clause for a structural wave)

**Headless / structural gates — born-RED→GREEN.** Every gate here is a precept-valid STRUCTURAL
artefact — a build-output / file-extension-reach / line-count / directory-resolution / deletion
proof. Per `precepts/instructions/README.md:183` ("Grep-only checks are supplementary **unless the
target is purely structural**") the no-god-module ceiling and the dist-`@source` resolution ARE
purely-structural targets, so a non-runtime artefact is sufficient and correct for this wave (this is
the textbook case the precept carves out — NOT the AW headless-green gap, which was a runtime-truth
failure; a god-module ceiling has no runtime behaviour to mis-measure).

1. **`proof:no-god-module` (.css-aware, ci-tagged) reports the 4 expected born-RED CSS violations —
   a file-extension-reach + line-count artefact.** After the collector accepts `.css`, the gate exit
   is RED (`exit 1`) listing tokens.css 1728 / dock.css 1227 / utilities.css 1119 / glass.css 691
   (+ the pre-existing useMetaballRenderer.ts 569). **Born-RED-CORRECT** — this RED is the staging
   signal W25b/W06 clear, not a defect. The GREEN end-state is W25b+W06's responsibility (the green
   intermediate exists precisely because W25a is the gate-extension step alone). W25a's own
   close-criterion is: the gate REPORTS exactly the four expected violations (the roster matches the
   audit), and the four are the ONLY new entries the `.css` extension surfaces.
2. **`proof:no-god-module` carries `["local","ci"]` in `gates.mjs` — a manifest/config artefact.**
   The gate enters the CI aggregate (was `["local"]`-only). **Born-RED** if the registration still
   reads `["local"]`; GREEN after. Consistent with W27a's at-LEAST-ci `proof:tag-parity` model (NOT
   `release` — the named exception is the 2 legacy gates).
3. **A dist `@source`-resolves probe — a directory-resolution artefact.** Asserts the `@source`
   directive in the BUILT `dist/styles/index.css` resolves (from `dist/styles/`) to an EXISTING
   directory in the published dist tree. **Born-RED** at HEAD (`../components` → `dist/components`
   absent); GREEN after the `src/styles/index.css` re-point + `npm run build` re-emit. A
   build-output + directory-existence artefact (NOT a grep-for-string).
4. **`npm run build` GREEN + the corrected directive re-emits into `dist/`.** The build regenerates
   `dist/styles/index.css` with the dist-correct `@source`; no dangling `@source` to a missing dir
   ships. A build artefact — the canary that the `src/` edit produces a self-sufficient dist.
5. **`vue-tsc --noEmit` GREEN** — the gate/config edits touch no TypeScript public surface (the
   build-cleanliness canary; confirms no collateral breakage).

These are build / config-manifest / directory-resolution / line-count artefacts — the precept-valid
forms (`precepts/instructions/README.md:170-183`; `TRANCHE-AND-WAVE-SPEC.md:40-41,165`) for a purely
structural target.

**VISUAL-TRUTH clause (structural-wave variant — per AX.W00's NON-NEGOTIABLE close discipline).**
This wave has **NO visual surface** — the gate-extension changes no pixels, and the dist `@source`
re-point changes which utility classes a CONSUMER'S build emits, not glass-ui's own demo render. Per
the charter (`### AX.W25a`, line 1316: "NO visual surface — structural"), the AX.W00 VISUAL-TRUTH
mandate is satisfied here by its STRUCTURAL analogue, NOT a screenshot audit: **the live-effect proof
is a CONSUMER content-scan readback.** The binding close evidence is a captured demonstration that a
consumer build (the value.js gh-pages `production`-condition build, or a minimal reproduction) which
imports `@mkbabb/glass-ui/styles` and adds NO compensating `@source` of its own EMITS glass-ui's
layout/CVA utility classes (e.g. `h-full`, `shrink-0`, `text-destructive-foreground`, `rounded-pill`)
in its production CSS AFTER the dist `@source` fix, where it dropped them BEFORE — a paired
BEFORE/AFTER capture of the emitted-CSS class-presence (the W00 paired-π protocol, applied to the
content-scan output rather than a pixel readback). The wave does **NOT** close on the
file-extension/line-count gate alone — the consumer content-scan readback (the real downstream effect
the deadlink silently broke across 181 mount sites) is the binding close criterion, captured under
`docs/tranches/AX/audit/`. This is the structural-target case the precept (line 183) and AX.W00
explicitly permit: a runtime PIXEL readback is not the relevant truth axis for a content-scan
packaging fix; the relevant truth axis is the emitted-CSS class set, which the readback captures.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open) + RATIFY the dist `@source` form.** Re-confirm both RED
   witnesses against HEAD live: `wc -l` the four CSS files (>500); `proof:no-god-module` does NOT
   list them (`.css`-blind); `gates.mjs:338` reads `["local"]`; `ls dist/components` → absent;
   `dist/styles/index.css:145` carries `@source "../components"`. **RATIFY the exact dist-correct
   `@source` form** (the recommended path: a single directive whose dist-emitted relative path
   resolves to a real `dist/` dir while the dev resolution against `src/components` stays correct —
   the build-rewrite-on-emit or a both-trees-correct relative path) and record it in the audit json.
   Do NOT trust the audit's word — re-prove.
2. **Extend the collector to scan `.css` (F0).** `proof-no-god-module.mjs:47` predicate +-`.css`;
   update the header comment. Run `proof:no-god-module` → confirm it now reports the four CSS + one
   TS violations (RED, born-RED-CORRECT). Confirm the `.ts`/`.vue` bite still fires (a synthetic
   501-line `.vue` still reds).
3. **Re-tag `["local","ci"]` (F0).** `gates.mjs:338` + rewrite the note. Confirm the gate enters the
   CI aggregate (the tag-selector picks it up) and is consistent with the at-least-ci model (NOT
   release — coordinate with W27a's `proof:tag-parity` so the tag does not red parity).
4. **Re-point the dist `@source` directive (digest 132/133 part 1).** `src/styles/index.css:137` →
   the ratified dist-correct form. `npm run build` → re-emit `dist/styles/index.css`. Confirm the
   built directive resolves to an existing dir from `dist/styles/`, AND the dev cascade still
   resolves against `src/components`.
5. **Gate probe + VISUAL-TRUTH structural readback.** Author/run the dist-`@source`-resolves probe.
   Capture the consumer content-scan BEFORE/AFTER class-presence readback (the structural-wave
   VISUAL-TRUTH evidence). Hand the four born-RED-CORRECT CSS-violation roster to W25b/W06 via the
   audit json. Route the value.js + words consumer-`@source` adoption notes to W34. Write
   `audit/W25a-…json` to its born-RED→staged-GREEN state.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W25a-css-god-module-gate-extension.json` — the born-RED→GREEN ledger: the
  two RED witnesses (gate `.css`-blind + local-only; dist `@source` deadlink), the **dist-`@source`
  RATIFY record** (the chosen directive form + the dev/dist dual-resolution proof), the
  **four-violation born-RED-CORRECT roster** (tokens 1728 / dock 1227 / utilities 1119 / glass 691,
  with the glass.css cohesion-not-length flag handed to W25b as an ADJUDICATION item) handed to
  W25b/W06, the gate-tag change (`["local"]` → `["local","ci"]`) + its at-least-ci-model consistency
  with W27a, and the post-fix dist `@source` resolution measurement.
- The gate-output artefact `AV-no-god-module` (the existing `writeGateArtifact` emit from
  `proof-no-god-module.mjs`) now listing the five violations — the machine evidence the gate sees
  `.css`.
- The post-build `dist/styles/index.css` proof: the `@source` directive resolves from `dist/styles/`
  to a real dir; the BEFORE (`../components` → absent) / AFTER (resolves) delta.
- The **consumer content-scan BEFORE/AFTER** capture (the structural-wave VISUAL-TRUTH evidence): a
  minimal/value.js production build's emitted-CSS class-presence for glass-ui's layout/CVA utilities,
  dropped BEFORE the dist fix, emitted AFTER — captured under `docs/tranches/AX/audit/`.
- A consumer-adoption NOTE annex (routed to W34, NOT executed here): value.js + words add the binding
  `@source "...node_modules/@mkbabb/glass-ui/dist";` directive (depth-adjusted) per CLAUDE.md, as
  defense-in-depth even after the library dist fix.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(gates): W25a born-RED baseline — no-god-module is .css-blind + local-only (4 CSS god-modules invisible); dist @source resolves to a missing dir; RATIFY the dist-correct directive form (AX.W25a)`
2. `feat(gates): extend proof:no-god-module to scan .css — born-RED-CORRECT on tokens/dock/utilities/glass for W25b/W06 to clear (AX.W25a F0)`
3. `chore(gates): re-tag proof:no-god-module ['local','ci'] so it bites in CI — consistent with the at-LEAST-ci tag model (AX.W25a F0)`
4. `fix(styles): re-point the dist @source content-scan directive to the real dist chunk location — the library is self-sufficient for content-scan (AX.W25a)`
5. `chore(AX.W25a): audit ledger — four born-RED-CORRECT CSS-violation roster to W25b/W06 + consumer @source annex to W34`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/
stash per the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W27a (legacy gate-hardening — the gate-tag MODEL author) — the binding dependsOn.** The
  charter `### AX.W25a` block (line 1297) lists `dependsOn AX.W27a *(gate-tag MODEL precedes)*`,
  and §4 note 20 states the gate-tag MODEL decision "PRECEDES both W25a and W27a — it is W27a's
  first act, shared with W25a." W27a authors the **at-LEAST-ci `proof:tag-parity`** meta-assertion
  (the manifest's real parity claim is local==ci; release is a deliberate subset). W25a's re-tag of
  `proof:no-god-module` to `["local","ci"]` (NOT release) must be CONSISTENT with that parity claim,
  else `proof:tag-parity` would red W25a's own tag choice (§4 note 21 — the W25/W27 internal
  contradiction the at-least-ci model resolves). So W25a CONSUMES the model W27a authors; the shared
  first act (the MODEL decision) is recorded once by W27a.
- **TRANSITIVE — AX.W00 (the π visual-runtime lane + the proof↔package.json meta-gate).** Not a
  direct charter dependsOn for W25a (its only listed dependsOn is W27a), but W27a dependsOn W00, so
  W25a inherits W00 transitively. W00 owns the meta-gate that every `proof-*.mjs` has a matching
  `package.json` entry (`proof:no-god-module` already has `package.json:619` — W25a's `gates.mjs`
  re-tag is consistent with it). W25a authors NO π-lane assertion (it is structural, no visual
  surface), so the dependency is the meta-gate consistency, not a π-lane home.
- **Downstream:** **AX.W25b** dependsOn W25a (charter line 1321) — the CSS monolith carves CLEAR the
  four born-RED violations W25a reports (tokens §-seam partials, utilities relocation, glass.css
  cohesion-not-length adjudication). **AX.W06** runs the W25a `.css`-aware gate over the dock
  partials (charter line 523) — the dock.css split CLEARS the dock 1227 violation. **AX.W34**
  receives the value.js + words consumer-`@source` adoption annex (the §16 receiver — the consumer
  side of the jointly-owned content-scan defect).

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`0b27f01`** (AV, the W13 commit) — `useMetaballRenderer.ts` was **351 lines** here, under the
  500 limit (`git show 0b27f01:.../useMetaballRenderer.ts | wc -l = 351`). It grew to **569** across
  the W9/W10/W11 goo-blob feature waves (`d14cd9a` etc.) — and because `proof:no-god-module` was
  `tags: ["local"]` only, CI never ran the gate and the TS regression shipped silently into the
  batch-1 integration. This is the concrete witness that the LOCAL-only tag is the gate-wiring defect
  W25a's `["local","ci"]` re-tag corrects.
- **AV.W13** (the `proof:no-god-module` gate provenance) — the gate was born-RED at open
  (`aurora.frag.ts` was 819 lines; `proof-no-god-module.mjs:4-8`) and the decomposition cleared it.
  Its claim "largest now 475" was true for `.ts`/`.vue` ONLY (`proof-no-god-module.mjs:47`
  `.ts`/`.vue`-only collector) — the four CSS god-modules were never in scope. W25a corrects the
  structural blindness the AV.W13 close inadvertently institutionalized.
- **AU.W8b.3** (`dock-controls.css` carve, 486 lines, locked by `proof-dock-controls-split.mjs`) —
  the PROVEN house carve pattern (a sibling `.css` in the same `@layer`, `@import`ed in cascade
  order) the audit names as the template W25b/W06 carve with. W25a's gate-extension makes the
  ceiling that pattern relieves VISIBLE; the carve itself is W25b/W06.
- **The dist `@source` line** (`dist/styles/index.css:145` = `src/styles/index.css:137`,
  `@source "../components"`) — the value.js gh-pages `production`-condition build (digest line 132)
  is the field witness that the directive resolves to a non-existent `dist/components/` and silently
  drops glass-ui's utility classes across 181 mount sites. This is the CLAUDE.md-documented
  content-scan silent-failure class (the `@source`/`tw-animate-css`-missing family) confirmed in a
  real consumer.
- **HEAD `eaba94f`** (charter audit baseline; working tree `at-dock-convergence`) — the gate ships
  GREEN-in-CI absence over four CSS god-modules + one TS regression; the dist `@source` deadlink
  ships in the published 3.6.0 line. Both are structural defects masked by a gate that cannot see
  `.css` and a directive that resolves only in dev.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-J binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **no-god-modules + splits-use-directory-modules** (`precepts/instructions/README.md:105-114`: "**No
  god modules.** … Split by concern, name by behaviour, never by namespace position." + "**Splits use
  directory modules.** `hir/mod.rs` plus children, not flat siblings"). W25a makes the no-god-module
  RULE ENFORCEABLE over `.css` — the four style monoliths (tokens 1728 / dock 1227 / utilities 1119 /
  glass 691) were structurally invisible; the gate-extension is the precept becoming
  machine-checkable for CSS. W25a does NOT carve (that is W25b/W06, which use the
  directory-module form — `src/styles/tokens/`, `src/styles/dock/` — per the precept); W25a's job is
  to make the ceiling VISIBLE so the carves have a gate to clear. MUST NOT special-case any `.css`
  file out of the scan (the cohesion-not-length glass.css call is a W25b ADJUDICATION, not a gate
  exemption — a silent collector exemption would re-mint the structural blindness this wave fixes).
- **gates-close-on-evidence — and the purely-structural carve-out** (`precepts/instructions/README.md:13`
  "Gates close on evidence: … deletion proof" + `:170-183` the artefact forms + the binding clause at
  `:183` "Grep-only checks are supplementary **unless the target is purely structural**";
  `TRANCHE-AND-WAVE-SPEC.md:40-41,165`). The no-god-module ceiling and the dist-`@source` resolution
  are PURELY STRUCTURAL targets (file-extension reach, line count, directory existence) — so a
  non-runtime artefact gate is precept-VALID here, the explicit case the precept carves out. This is
  why W25a legitimately closes on a structural gate (with the consumer content-scan readback as the
  VISUAL-TRUTH analogue) and is NOT the AW headless-green gap (which was a RUNTIME-truth failure on a
  visual surface — a god-module ceiling has no runtime behaviour to mis-measure). MUST NOT downgrade a
  runtime-bearing assertion to a grep — but the targets here ARE structural, so the gate form is
  correct.
- **abrogate-before-patch / one-path** (`precepts/instructions/README.md:17-22`: "**Abrogate before
  patch.** … deletion plus replacement is often shorter total." + "**One path.** Two orthogonal
  codepaths … Collapse to one"). The dist `@source` deadlink is fixed by RE-POINTING the ONE directive
  to a dist-correct form — NOT by adding a second parallel directive or leaving the dead
  `../components` line "for compat." One directive, dist-correct, dev-correct. MUST NOT ship a second
  `@source` line or a back-compat dead path.
- **documentation-is-part-of-the-change** (`precepts/instructions/README.md:132-138`: "Spec, design,
  and `PROGRESS` docs update in the same wave as the architectural change … Doc drift is uncommitted
  work."). The stale `gates.mjs:339` note ("W6 gates-close folds it into the ci aggregate" — a fold
  that never bit) is rewritten IN THE SAME WAVE as the re-tag, and the `proof-no-god-module.mjs` header
  comment is updated to state the `.css`-aware scope. MUST NOT leave a note that contradicts the
  gate's actual tag/scope.
- **no-overfitting / substrate-with-consumer** (`precepts/README.md:10-12`: "No overfitting. A …
  process rule needs a current consumer and evidence."). The gate-extension has an immediate consumer
  — the four CSS god-modules it reports for W25b/W06 to clear (born-RED-CORRECT). The dist `@source`
  fix has 181 consumer mount sites (the value.js field witness). Neither is speculative substrate.
  MUST NOT extend the gate to a file class with no over-limit member (the `.css` extension has four
  real RED members — the evidence basis).
