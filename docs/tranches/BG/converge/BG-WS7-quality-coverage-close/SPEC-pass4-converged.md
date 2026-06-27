# BG-WS7 — Quality · Coverage · Close (SPEC pass 4 — CONVERGED, the build-and-commit contract)

> The close ORACLE must read **live paint**, the release TAG must **require** it on EVERY publish path, and **no deferred item may silently drop**. Pass 3 converged the design to ≈86%. Pass 4's job is EXECUTION: land each empirical residual on COMMITTED `tranche/BG` disk, registered in `gates.mjs`, green-on-fixed / red-on-broken from a reproduction the building agent did NOT author. This converged spec INHERITS SPEC-pass3-converged.md whole (§J + §K stand), advances §L with the disk-verified frontier, and FOLDS the six pass-4 critiques' mustFix into each wave so the build cannot ship broken a 4th time.
>
> **Honest convergence state:** the DESIGN is converged + hardened here; the EXECUTION is NOT yet on committed disk. Every pass-4 prototype landed `refine`/`reject` against the literal acceptance bar ("on committed `tranche/BG` disk + registered + non-self-authored reproduction"). This spec is the binding build contract the next pass executes against — it does not itself discharge the residuals.

Branch `tranche/BG` @ `71e1c641` (the REAL base — NOT a stale `998136bb`/4.2.0 worktree). src == 4.2.0. Every file:line re-verified against real disk this pass (the table in §DISK-TRUTH).

---

## §DISK-TRUTH — the re-verified facts every wave anchors to (this pass, @ 71e1c641)

| Fact | Verified value | Consequence |
|---|---|---|
| `bg-gestalt-roster.md`, `docs/tranches/BG/waves/`, `audit/reflect/` | **ABSENT** | `proof:ba-gestalt` `["local","ci","release"]` RED-fails `--run full` on `[ROSTER-PRESENT]`; the roster + waves are §J.1-commit-blocking. |
| decoder symbols in `reflect-capture-verify.mjs` (`meanHue\|chromaMax\|lVar\|topBarStrip`) | **0 (UNMODIFIED)** | the decoder extension is UNBUILT; the gate cannot fail broken-4.2.0 for the broken-PIXEL reason. |
| `DESKTOP_FULL_WIDTH` | **`= 1280` (line 58, used 78–81)** | the desktop full-viewport floor; must be confirmed/documented against the pi capture width so the RED fires for broken-paint not narrow-capture. |
| `surface-closure.mjs:161` | `if (existsSync(join(root, sfc))) seeds.add(sfc)` — **silent skip** | the §L.4 routeSeeds HARD-RED is UNWIRED; a typo'd 2-segment story slug vanishes from the watched surface. |
| `proof-ba-gestalt.mjs:94` `REQUIRED_SURFACES` | **PRESENT** (used at 473/637/638) | the BC-specific required-surface const must be PURGED and re-derived from the BG roster routes. |
| `color-mix(in oklab,…,transparent)` in `src/styles` | **exactly 10** (28 files touch `color-mix(in oklab`) | the P4 figure is 10 (NOT the spec's stale "8", NOT the deep-codebase "53"); green-on-clean must NOT RED on any of the 10. |
| AX `DISPOSITION-REGISTER.json` | **`items.length == 31`, `grep "id" == 32`** | the 32nd is the nested `selfTest` id; AX-32-literal is the F0 FIRST self-test bite. |
| BF census | `docs/tranches/BF/audit/DEFERRED-CENSUS.md` (32 D-rows) | the F0 corpus includes the 32 BF D-rows. |
| BC fold-ledger count | **213 items** | `proof-bc-fold-ledger.mjs` stays GREEN @213 after the DRY extraction. |
| `gatesFor("full")` (gates.mjs:2196) | **the DEDUPED `local ∪ ci ∪ release` union** | **the §L.0 thesis is verified-CORRECT**: a `["ci","release"]` gate rides the `git push --tags`→`release.yml --run full` path the maintainer uses. |
| close-battery clause-2 (`:73`) | `releaseSh.match(/scripts\/gates\.mjs\s+--run\s+\w+/)?.[0]` — first-match, **`scripts/` prefix** | once `--run ship` precedes `--run full`, false-REDs; needs `matchAll`. |
| close-battery clause-3 (`:79`) | `releaseYml.match(/gates\.mjs\s+--run\s+\w+/)?.[0]` — first-match, **NO `scripts/` prefix** | the prefix asymmetry: a bare `gates.mjs --run X` is silently scoped differently; anchor consistently. |

---

## GESTALT GOAL

One sentence: **no `@mkbabb/glass-ui` version can be published — on the Mac `release.sh` path OR the `git push --tags`→`release.yml` path — unless a live in-ceremony render of the real demo, captured on a real GPU (`PI_ANGLE=metal`) and judged by structural pixel predicates the building agent did not hand-author, paints correctly AND a CI-verifiable freshness attestation proves that render is current; and every deferred item across BF/AX/BE/BF/in-src is DECIDED in one mechanically-derived ledger with REAL evidence before any of it runs.**

The disease (shipped 3×): source-green ≠ paint-truth, and the live-pixel layer never touched the tag. The cure is four interlocking machines built in this order, every artifact on committed `tranche/BG` disk:

1. **F0 fold-ledger** (Band-0, FIRST) — no item silently drops a 4th time; every row genuinely adjudicated, the producer's own auto-fallback given teeth it cannot defeat.
2. **Band-1 dead-mechanism cut** — DELETE/REHOME/COORDINATE the present-but-dead engines BEFORE the live oracle re-points (so it never certifies them).
3. **Band-2 live-paint oracle** — the decoder + roster + real-GPU PNGs that born-RED on 4.2.0 for the RIGHT (broken-pixel) reason from a NON-self-authored capture, plus routing/field/ship.
4. **The `--run ship` spine + the freshness attestation** — the live capture wired as a HARD precondition of BOTH publish paths, fail-CLOSED, the freshness hash bound to the REAL surface-closure SOURCE bytes.

---

## §L — THE PASS-4 ADVANCEMENTS (hardened with the six critiques' mustFix)

§J + §K stand verbatim. §L is the binding refinement set + the folded mustFix. Every item is anchored to a §DISK-TRUTH fact.

### §L.0 — THE TAG-PUSH BYPASS IS THE #1 STRUCTURAL HOLE; close it FIRST (VERIFIED-CORRECT thesis)

`release.yml:30` `runs-on: ubuntu-latest`, `:55` `node scripts/gates.mjs --run full` ONLY, `:57` `npm publish --provenance`. The maintainer's established path (MEMORY `project_publish_ci_broken`: "push the v* tag, release.yml does the gated provenance publish" — how 4.0.0/BC shipped) is `git tag && git push`, which triggers `release.yml` and **BYPASSES `release.sh`'s ship-block entirely**. **The §DISK-TRUTH `gatesFor("full")` deduped-union fact makes the closure work: a `["ci","release"]` gate is automatically in the `--run full` set release.yml runs.** A Mac-only ship-block does NOT close C-PAINT — Arm B does.

**TWO-ARM cardinal-lesson split (the `proof:live-verified-ledger` precedent transposed to SHIP):**

- **Arm A — the PAINT (Mac-only, by physics).** `release.sh`'s `--run ship` block captures live Metal paint over the BG roster and writes the per-region pixel DIGEST + `webkit.{glass,goo}` verdict + the DERIVED `surfaceHash` into `docs/tranches/BG/SHIP-ATTESTATION.json`, then commits it. CI=SwiftShader cannot paint → `release.sh`-local by necessity.

- **Arm B — the FRESHNESS (CI/anywhere, the bypass-closer).** `proof:ship-attestation` registered **`["ci","release"]`** so `release.yml`'s `--run full` RUNS it on every tag-push publish. RED on **absent** / **stale** / **failed-skip-unverified verdict** (see §L.0-FOLD). Device-free (re-applies `parseExpect`/`evalBand` to the EMBEDDED digest + recomputes a hash). **The ONLY enforcer on the `git push --tags`→`release.yml`→`npm publish` path; without it registered ci/release, C-PAINT is theater.**

**§L.0-FOLD (critiques 1 + 3 mustFix — the proto was a mechanism-proof, not a landing):**

1. **`surfaceHash` binds the REAL `surface-closure.mjs` SOURCE bytes, NOT the BA roster proxy.** The pass-4 proto hashed the BA roster as a stand-in because surface-closure was absent on its 4.2.0 base. On `tranche/BG` the P6 leaf IS present — `surfaceHash = sha256(surface-closure.mjs SOURCE bytes + the transitive paint-closure file list at the captured commit)`. This hash IS Arm B's freshness mechanism (§L.0's "#1 structural hole"); a proxy makes the bypass-closer non-functional.
2. **`proof:ship-attestation` lands in the SAME cut as the close-battery `requireShip` (clause-2).** Punting it leaves the git-push→release.yml path UNGUARDED — C-PAINT stays theater on the real publish path. It is the single highest-leverage deliverable; build it FIRST (before `runShip`/`release.sh`).
3. **Paint-teeth, not just presence.** Arm B re-applies the BG band predicates to the EMBEDDED per-region digest (re-stamp/frozen/skip/stale REDs); a malicious hand-forge is out of the Phase-1 threat model (DROP-WITH-TRIGGER → capture-signing/OIDC).
4. **The GREEN ceremony runs end-to-end** (critique 3 mustFix d): `release.sh` ship-block → `runShip` PASS → attestation committed → porcelain clean → tag reconciles, in a fresh `/tmp` worktree from a NON-self-authored reproduction. The proto exercised ONLY the fail-closed path; the claim of "porcelain clean after a GREEN ceremony" is unsubstantiated until run.
5. **Gitignore + dirty-tree policy (critique 3 mustFix i).** `SHIP-ATTESTATION.json` is committed by Arm A (NOT gitignored). The FAIL-verdict abort path MUST NOT leave porcelain dirty: `runShip`'s skeleton `failShip` + `set -e` mean a partial write must be trap-cleaned-or-stashed so a RED abort leaves the tree clean; the GREEN path commits the attestation and is porcelain-clean.

The Mac-only-release friction is EXPLICIT + intentional, recorded as a DECISION in `CONSTRAINTS.md` (§L.6), not a surprise: every release whose captured surfaces' SOURCE changed needs a fresh `release.sh --run ship` ceremony before the tag, because Arm B REDs a stale digest.

### §L.0b — clause-3 is FULL-ONLY by design; RATIFY, do NOT revert (critique 3 mustFix g)

The §L.7 wording "both clauses ship∧full" CONTRADICTS the §L.0 fact that `release.yml` is SwiftShader and runs `--run full` ONLY (it CANNOT run `--run ship` — no Metal in CI). **Reconcile: clause-2 (release.sh) requires `ship ∧ full`; clause-3 (release.yml) requires `full` ONLY and must NEVER demand `--run ship`** (it would fail-close every CI publish). The `matchAll` fix applies to BOTH for the first-match bug, but the REQUIRED set differs by file. A `RATIFIED:` note in `proof-close-battery-parity.mjs` + `CONSTRAINTS.md` prevents a future agent "fixing" clause-3 to require ship.

### §L.1 — The field/metallic born-RED is the CHROMA-CEILING (de-risks WS1 coupling) + the content-vs-field fix

The reference research is decisive: **the broken-4.2.0 metallic field is a CHROMA defect, not a hue defect.** `paper.css:167-180` brown slab resolves OKLab C≈0.108–0.128 at H≈35–67° — WARM-hued, SAME family as the cream `--card`. Therefore:

- **hue-band CANNOT catch the metallic** (in-band warm) → `meanHue` is a chroma-gated CONTENT guard, never the field born-RED.
- **corner-variance CANNOT separate brown-slab from calm-aurora** (the slab has conic + radials + drift + grain → it ALSO has corner stdev) → `pngFieldVariance` demotes to a SECONDARY anti-FROZEN liveness check that fires ONLY after WS1 confirms a LIVE aurora.
- **the robust design-AGNOSTIC discriminator is the meanChroma CEILING.** Calm fixed field C ≤ ~0.05 (`--card` 0.0147; calm warm aurora over glass ~0.03–0.05); metallic slab ~0.12. The ceiling lands at the MEASURED ~0.06–0.08, INSENSITIVE to WS1's aurora-vs-wash choice.

**Card-chroma recalibration (verified):** HEAD `--card = hsl(30 85% 96%)` → C=0.0147 H=70.9° — DOUBLED vs the CLAUDE.md `hsl(36 48% 97%)` (C=0.0062). Pin the band to the HEAD token, MEASURED — never the stale CLAUDE.md figure. The warm-cream band spans the near-neutral card (C~0.015) AND a calm chromatic field (C~0.03–0.05) in OKLab hue [56°,76°], BOTH modes (dark `--card` L~0.28, dark page L=0.146).

**§L.1-FOLD (critique 2 mustFix — calibrate from REAL pairs, solve the false positive, DRY the fold):**

1. **CALIBRATE the chroma ceiling from REAL broken-vs-fixed demo Metal pairs, NOT synthetic.** The synthetic metallic 0.085–0.097 underran the predicted real 0.108–0.128 and the calm-max→metallic-min gap at 0.07 was only ~0.035. Pin the threshold + record the margin + derivation in `DEFECT-LOCALIZATION-MAP.md`; choose 0.06 ONLY after measuring a real calm aurora-over-glass max (it may exceed the synthetic 0.05). Capture from the throwaway `vite --port 5199` worktree or the pinned `998136bb` build.
2. **SOLVE the content-vs-field false positive (proto's #1 caveat — a sibling read C=0.074 from rainbow CONTENT → false RED).** Define + commit per-surface field-probe regions in `bg-gestalt-roster.md` that target the `PaperBackdrop` BACKDROP band (the gutter/field strip), NEVER content. Add a `chromaMax` content-vs-field disambiguator bite + validate the probed band is FIELD (not chroma~0 white margin, not chroma-rich content).
3. **DRY the fold into the EXISTING grammar.** The chroma-CEILING field born-RED folds into the roster expect-cell grammar (`meanChroma <= 0.07`) — `evalBand` already supports `<=` and reads `stats[p.key]`, so it needs **no decoder change beyond the new `chromaMax` field**. `measurementValid` folds into the EXISTING null-return degenerate-read fence (`reflect-capture-verify.mjs:567`) wired to the ACTUAL FAIL path (not just an exported pure helper). Mint ONLY the genuinely-new-shaped helpers: `topDelta` (two-region L-delta) + `hueBandGuard` (chroma-gated hue).
4. **The Metal field-π is the SYMPTOM (local-only); `proof:field-aurora`'s SOURCE arm (§L.2) is the device-free CI/release born-RED.** Both build this pass; the proto addressed only the Metal half.

### §L.2 — `proof:field-aurora` SOURCE arm counts SIMULTANEOUS field painters (device-free, the tag-blocker)

Verified 3-stack: `AppShell.vue:360` UNCONDITIONAL `<PaperBackdrop field … class="fixed inset-0 -z-10" />` (every route) + `StoryHero.vue:267/274/283` per-route `<Aurora>`/`<Constellation>`/`<FourierField>` (MUTUALLY EXCLUSIVE — one kind per route) + `DockStage.vue:59` `<Aurora class="dock-stage-field">`. The SOURCE arm counts **field systems that can SIMULTANEOUSLY paint the route root**: "≥1 unconditional shell field" + "≥1 route-reachable field" ⇒ RED. A naive grep over StoryHero's 3 branches OVER-counts (exclusive). Device-free, deterministic, born-RED at HEAD, CI/release-able — **the SOURCE arm is the CI/release tag-blocker; the Metal symptom-π is local-only and cannot block tag-push** (critique 2 mustFix). Coordinate the field=aurora-vs-wash decision with WS1 BEFORE pinning the corner-variance secondary.

### §L.3 — The top-bar-strip predicate is L-delta-PRIMARY both modes

The D5 hairline (`AppShell.vue:393 .demo-scroll-progress` + `scroll-driven.css:45` invalid `scroll(--demo-main-progress block)` → `animation-timeline: auto` → `scaleX(1)` full-width 2px @ op0.85). `topDelta` = |meanL(top-strip) − meanL(row-just-below)|, PRIMARY both modes:
- LIGHT: warm-ink near-black bar L=0.216 over warm page L~0.95 → topDelta ≈ 0.73.
- DARK: legendre-violet bar (`dark-arm.css:92` `--primary` oklch(0.739 0.134 318)) L=0.739 over near-black page L=0.146 → topDelta ≈ 0.59, PLUS chroma-spike (0.135 vs ~0.006) PLUS hue-out-of-warm-band (318° magenta).

`topDelta` is PRIMARY both modes (a pure-chroma predicate misses the light near-black bar); chroma-spike + hue-out-of-band are dark CORROBORATORS. Threshold MEASURED from the broken-vs-fixed Metal pair, recorded in `DEFECT-LOCALIZATION-MAP.md` (resolves the 0.069-vs-0.16 pass-1/pass-2 contradiction — measure `topDelta`, not an absolute).

### §L.4 — The routeSeeds HARD-RED gap, wired onto the REAL P6 leaf (critique 4 mustFix)

Verified `surface-closure.mjs:153-167`: `routeSeeds()` matches `/cat` or `/cat/story` and **silently skips** a 2-segment `/cat/story` resolving to no SFC (line 161 `if (existsSync(...)) seeds.add`). The §C″ HARD-RED demands a route file OUTSIDE the derived closure RED. **Reconcile onto the REAL transitive-closure leaf already on disk (`isPaintSource`/`resolvePaintEdge`/`collectPaintClosure`), NOT the proto's minimal `{seeds,hardReds}` reconstruction.** The discriminator: a cell token matching the 2-segment `/cat/story` pattern whose SFC does NOT exist on disk is a HARD-RED **surfaced at route-RESOLUTION as a `[ROUTE-RESOLVES]` violation in `proof-ba-gestalt`** (NOT a closure-emptiness guard — `SHELL_SEED` always makes the closure non-empty, defeating an emptiness check). A 1-segment `/cat`→`SectionLanding` stays fine; free prose WITHOUT the slash-pattern produces no match (the legit "the shell BottomDock" case). Self-test plants `/dock/typoo` (HARD-RED) + "the shell BottomDock" (GREEN). The token regex `/[a-z0-9-]+(?:/[a-z0-9-]+)?` naturally stops at whitespace/`;`/`(` and lowercase-excludes PascalCase helper SFCs (the proto's cleanest validated piece).

### §L.5 — Band-1 "dead deletes" are ENTANGLED — three verified shapes

- **`useDockContextSilhouette.ts` (551L, 0 real imports — only a COMMENT at `AppSwitcher.vue:3`) IS the Siri context-switch state-machine** (`proof:dock-context@269` frames it as the fission+bloom engine; `DynamicIslandCall.vue`/`AppSwitcher.vue` are WS6 C-SIRI surfaces). → a **DECIDED coordinated-WS6 FOLD-LEDGER row** (dest a coordinated `BG.W-*` shared with WS6), NOT a unilateral WS7 delete. Resolves to RETIRE at WS6's close if no live consumer, recorded NOT cut. `proof:dock-context` rides the same DECIDED row.
- **`useMorphField()` is NOT dead** — `MORPH_SIGNATURES` (56-161) has 5 src consumers (`useGooMorph.ts`, `GooFilter.vue`, `useDockFission.ts`, `core/index.ts`, `src/index.ts`). → a **gut-and-rehome refactor** (extract the ~100L `MORPH_SIGNATURES` to `morphSignatures.ts`, re-point the 5 consumers + `src/index.ts:242`, delete the ~307L dead body + handle + dead public exports), ONE diff. `vue-tsc` GREEN is the falsifier.
- **`useHaptic.ts` (6325B) + `proof-haptic.mjs` are PRESENT** (the gate is real, NOT a phantom — the "ABSENT" tranche-history claim is the stale path-typo class). → **adjudicate with a REAL `useHaptic(`-call-site grep**; if zero real binary consumers (J-inv-10; the gate's H5 ≥2-via-consumer-evidence-DOC must be VERIFIED against call-sites), RETIRE-with-rationale + drop `src/index.ts:285` + `api/index.ts:370` exports (clean break). Correct the stale "ABSENT" verdict.

KEEP (verified LIVE): `useBloomUp` (9), `useDockFission` (4), `useCelebrationBurst` (2). `selectableChipVariants.ts` (pure alias) deletes clean. `liquid-morph.css` (850L, demo-only) rehomes to `demo/stories/dock/`. `useLiquidMorph.ts` deletes.

### §L.6 — Safari: LAND the gate, resolve P4 honestly, DRY the strip, anchor P1 (critique 6 mustFix)

1. **LAND IT.** Commit `scripts/proof-safari-parity.mjs` to `tranche/BG`, register in `gates.mjs` (after `proof:safari-webgl`, tags `["local","ci","release"]` matching the sibling), add the npm script, commit the green-on-clean (EXIT 0) + red-on-broken (planted `backdrop-filter: url(#…)` → P1 FAIL) run outputs to disk. The artifact does NOT exist in the working tree — closure requires committed + registered + proven.
2. **RESOLVE P4 honestly — NO phantom re-scope.** The shipped 4.2.0 tree has legit bare-`transparent` gradient soft-fade sites; modern Safari (CSS Color 4) premultiplies alpha in ALL spaces. Choose ONE, with WS1/orchestrator RATIFICATION (the proto's un-ratified re-scope is forbidden):
   - **(a)** implement the literal §L.6 P4 — match gradient-with-bare-`transparent`-stop, enumerate EVERY matched site as a DERIVED-at-BUILD fact list (NOT a hardcoded "8"/"36" allowlist), RED ONLY a planted truly-broken case, NEVER RED the 10 single-mix sites; OR
   - **(b)** DROP P4 with a recorded rationale in `CONSTRAINTS.md` (if the team agrees Safari premultiplies the sRGB→transparent fade cleanly — the proto's own empirical finding). Do NOT re-scope to a non-sRGB-gradient trap that matches 0 sites and whose real-Safari validity is unproven.
3. **FIX the count: exactly 10** `color-mix(in oklab,…,transparent)` sites in `src/styles` (§DISK-TRUTH) — NOT 53, NOT a phantom. Green-on-clean enumerates the 10 + never REDs them.
4. **P3 landmine:** `glass-fx.css:137 --glass-edge-light-dark: inset 0 0 0 0.75px hsl(0 0% 100% / 0.22)` is a token NAMED `…-light-dark` with an inset VALUE, NOT a `light-dark()` FUNCTION; ~10 `light-dark(...inset...)` occurrences are explanatory COMMENTS. P3 `stripComments` FIRST, then match the `light-dark(` FUNCTION with `inset` INSIDE the parens — never the token name nor a comment.
5. **DRY: import `stripComments` from the canonical `scripts/lib/critical-path-walk.mjs:22`** (offset-preserving, exported, already house-used) — NOT the peer gate's private regex copy. Lift `stripCssComments` into the shared lib if a CSS-specific variant is needed (avoid gate↔gate coupling + the two-stripComments duplication).
6. **VERIFY + COMMIT P1 anchoring:** P1 matches ONLY `backdrop-filter: url()` and NEVER the REGULAR `filter: url()` goo/fission sites (`morph-field.css`, `fission-bridge.css:27`, `liquid-morph.css`, `morph-bridge.css` — all Safari-correct, MUST NOT RED). Commit the green-on-clean run enumerating those regular-filter sites as untouched.
7. **STATE the floor honestly in `BG.W-SAFARI-PARITY-GATE.md`:** this gate is the SOURCE-arm floor ONLY and does NOT discharge C-SAFARI's real-paint demand (DROP-WITH-TRIGGER via safaridriver-or-DROP). A CSS grep cannot certify glass+goo+liquid PAINT on Safari.
8. **CONSTRAINTS.md** records: var()-resolution GREEN version-26.4-scoped; `@container style(--glass-backdrop: light)` landmine triggers only Safari <18 (the WS3 literal-bake trigger); `backdrop-filter: url()` Safari-IMPOSSIBLE (bug 245510 OPEN, re-confirmed) → the lens is `@supports`-gated PE (already correct at `glass-refract.css:106`); goo/fission/pager-worm paint via REGULAR `filter: url()` (already correct); the Mac-only-release decision (§L.0); the `≤18` WS3-bake trigger; the Safari-PAINT DROP-WITH-TRIGGER.
9. **safaridriver-or-DROP** — attempt `sudo safaridriver --enable` + Allow-Remote-Automation end-to-end; if blocked non-interactively (realistic — AllowRemoteAutomation UNSET at HEAD), the Safari PAINT verdict is DROP-WITH-TRIGGER + the SOURCE arm only, NEVER a self-cert screenshot.

### §L.7 — The close-battery: matchAll BOTH clauses, prefix-anchor, clause-5 structural self-test

Verified `proof-close-battery-parity.mjs:73` (clause-2, `scripts/` prefix) + `:79` (clause-3, NO prefix) BOTH use `.match()?.[0]` first-match. Once `--run ship` precedes `--run full`, BOTH false-RED. Fix BOTH with `matchAll` requiring the REQUIRED set per file (§L.0b: clause-2 ⇒ `ship ∧ full`; clause-3 ⇒ `full` only, NEVER ship). Anchor the prefix consistently so a bare `gates.mjs --run X` is not silently dropped. Upgrade clause-5 from source-presence to the §J.7 structural self-test: **synthesize a short-circuit at the gate's `test` entry and assert it REDs as a SUBPROCESS** (the `proof:strict-freshness-armed` precedent), NOT 5 string-fed detector bites.

### §L.8 — The demo serve port + demo:dist scripts land BEFORE the ship-block demands them

`package.json` has only `dev=>vite` (defaults :5173); `runPi`/`runShip` assume `:5199` via `GLASS_UI_DEMO_URL ?? :5199` and fail-CLOSE on an empty/foreign port. `demo:dist:build` is absent (`set -euo pipefail` aborts `release.sh`). LANDING ORDER: land `demo:dist:build` + a serve recipe binding `:5199` explicitly (`vite --port 5199`; `vite preview --port 5200` for demo-dist) + `runShip()` + `proof:ship-attestation` FIRST; the `release.sh` ship-block + the close-battery `--run ship` requirement land LAST (born-RED→GREEN against a real ceremony).

### §L.9 — The born-RED ground-freeze precedes WS1/WS3 integration (RISK 3 sequencing)

The born-RED needs broken-4.2.0 PAINT, but WS1 routing/field + WS3 gray/blur land on the SAME branch. **Capture + COMMIT the Metal born-RED PNGs at `71e1c641` (or shoot from the pinned `998136bb` 4.2.0 build) BEFORE any sibling-WS fix integrates.** Persist as committed `DEFECT-LOCALIZATION-MAP` fixtures with measured `meanChroma`/`topDelta` margins. **The cream/grey/synthetic fixture is FORBIDDEN as the born-RED (§J circular ban) — the born-RED MUST be a real demo render the building agent did NOT author.** Confirm `chromium-headless-new` emits exactly 1280-wide desktop captures (else relax/document `DESKTOP_FULL_WIDTH=1280` at `reflect-capture-verify.mjs:58` so the RED fires for broken-paint, not narrow-capture). Bring up the demo via `vite --port 5199` (NOT :5173) after `npm i` in the throwaway worktree.

### §L.10 — The Metal born-RED is on REAL non-self-authored paint, not the prototype's controlled page (critique 2 + 4 mustFix)

The pass-4 PAINT proto was a MECHANISM proof (extend `pngRegionStats` in-place, one loop, additive fields, chroma-ceiling de-risked on REAL Metal M5 Max with confirmed `UNMASKED_RENDERER`, NOT SwiftShader). **The execution residual:** replace the self-authored controlled-page born-RED with a NON-self-authored capture of the real 4.2.0 demo on Metal (`--use-gl=angle` via `runPi`), persist the committed PNG + measured margins. Until that capture exists the gate is circular. Prove `proof:ba-gestalt` born-REDs on it for the broken-PIXEL reason (top-bar D5 `topDelta` ≥ measured; field `meanChroma` ≥ measured ceiling). The all-PASS-re-shot-broken-UX regression bite STILL REDs (BD 77-re-point shortcut blocked).

### §L.11 — F0 gets TEETH the producer's auto-fallback cannot defeat (critique 5 mustFix)

The F0 DRY extraction is VERIFIED-GENUINE (`fold-ledger-core.mjs` holds `extractDocIds`/`deriveBand`/`waveSpecExists`/`clausesHit` ONCE; BC refactored via 4 one-line closures, GREEN @213 with all 7 bites; BG GREEN @136). But the producer's auto-fallback BLANKET-ROUTES the 23 BFD-BUILD rows to one catch-all with an identical templated string (`proof-bg-deferred-ledger.mjs:320`) — the BB.W-NDA-DECIDE chronic the gate exists to prevent. The mustFix:

1. **Genuinely adjudicate the 23 BUILD rows** — route each to its CORRECT charter-matched `BG.W-*` wave (a component BUILD → a build/coordination wave, NEVER `BG.W-DEAD-GATE-SWEEP` which is retire/sweep), with ROW-SPECIFIC evidence. Kill the identical templated string at `:320`.
2. **Three teeth clauses + self-test bites each:**
   - **(a) charter-match** — a BUILD disposition must resolve to a wave whose spec charter is BUILD/coordination, not RETIRE/SWEEP; extend to MET/RETIRE/SUPERSEDED (each disposition's dest charter must match).
   - **(b) templated-evidence detector** — REJECT N rows sharing an identical evidence SKELETON AND the placeholder phrase ("per-WS-coordinated destination is the Band-0 build's refinement") — NOT an 8-token literal-exact list (evaded by any sentence); a structural skeleton-match.
   - **(c) destination-concentration ceiling** — 24-rows→one-home REDs.
3. **Fix the gates.mjs note: 9-bite self-test** (the gate flags 9; the note says "8" — spec pass4 mandates 9 and calls count-string drift a defect class). The 9 bites: AX-31-vs-32 FIRST, G5 de-shadcn-not-a-false-orphan, G6 no-clone-on-planted-clone, disjoint-namespace, F0-scoped no-orphan, + the 3 new teeth + the count assert.
4. **Re-run born-RED on a NON-self-authored reproduction** — a synthetic blanket-route + templated-evidence ledger MUST RED (it currently passes); proving the new clauses bite.
5. **DERIVED corpus 136** = AX 31 + BF 32 + BE 39 + BF 31 (waves) + in-src CONSUME/BOOKED. Disjoint-namespace assert (`expectedCount === Σ`). F0-scoped no-orphan (the de-shadcn committed-untracked file must NOT RED). `file#KIND#slug` ids, canonical `CONSUME(...)`/`BOOKED:` grammar scoped to `.ts`/`.vue` (`border-progress/README.md:37` EXCLUDED).

---

## MECHANISM (the build order, §K + §L folded)

**Band 0 (no-silent-drop, FIRST):**
- **§J.1 commit** the dangling scaffolding (`surface-closure.mjs` + the BG-re-pointed `proof-ba-gestalt.mjs` + `critical-path-walk.mjs`) in ONE diff INCLUDING `bg-gestalt-roster.md` (else `proof:ba-gestalt` RED-fails `--run full`/CI on `[ROSTER-PRESENT]`), the §L.4 routeSeeds HARD-RED reconciled onto the REAL P6 leaf, the REQUIRED_SURFACES purge (re-derive from BG roster routes), and the decoder extension IN-PLACE. A fresh-clone import check is the acceptance bite.
- **§K.5 + §L.11:** extract `fold-ledger-core.mjs`, refactor BC onto it (GREEN @213, no clone), build `proof-bg-deferred-ledger.mjs` with the three teeth clauses (charter-match / templated-evidence / concentration-ceiling), DERIVED corpus 136, AX 31-vs-32 first-bite, register Band-0 `["local","ci","release"]`, emit the GENUINELY-adjudicated `FOLD-LEDGER.{json,md}` (every row BUILD/RETIRE/MET/COORDINATED with a `(`-call-site grep + a charter-matched destination-sound `BG.W-*` spec — NEVER blanket-DEFER, NEVER a 23-rows→one-home route).

**Band 1 (dead-mechanism cut, BEFORE Band 2):**
- §L.5: `useMorphField` gut-and-rehome (5-site, `morphSignatures.ts`); `useHaptic` RETIRE (real-grep adjudicated) + drop exports; `selectableChipVariants.ts` alias delete; `liquid-morph.css` 850→demo rehome; `useLiquidMorph.ts` delete. `useDockContextSilhouette` + `proof:dock-context` = a DECIDED **coordinated-WS6** row. KEEP bloom-up/dock-fission/celebration-burst/metaball-bridge2. F6 gate→symbol map by IMPORTing `gates.mjs` `GATES` behind `isMain`.

**Band 2 (live-paint oracle, born-RED on a NON-self-authored reproduction):**
- §K.1: prove `runPi()` GREEN via the REAL codepath on a passing per-mechanism spec, BOTH projects (`chromium-headless-new` + `coarse-touch`), served on `:5199`. Commit the `UNMASKED_RENDERER` falsifier as the `runShip` anti-SwiftShader seed.
- §K.2 + §L.1/§L.3/§L.9/§L.10: decoder extension (meanHue/chromaMax/lVar in `pngRegionStats`'s loop + 3 region helpers + 3 guards, ONE decoder reusing `oklabFromRgb`, 15 bites incl. 2 negative null/NaN rejects) + `DEFECT-LOCALIZATION-MAP.md` (MEASURED chroma-ceiling ~0.06–0.08 + `topDelta` margins from broken-vs-fixed Metal) + persisted NON-self-authored real-GPU PNGs → `proof:ba-gestalt` born-REDs on a 4.2.0 Metal reproduction. Field SYMPTOM-π = chroma-ceiling folded into the EXISTING `<=` expect-cell grammar; corner-variance SECONDARY anti-frozen (WS1-coordinated). Fix the `DESKTOP_FULL_WIDTH` floor + the selfTest 9-vs-15 bite-count string.
- §L.2: `proof:field-aurora` device-free SOURCE arm (SIMULTANEOUS-painter count, the CI/release tag-blocker) + the Metal symptom-π (local-only).
- §K.3: `proof:route-navigates` (`main > article` direct-child scope, real `--duration-fast=0.2s` leave, orphan-grace, real green-on-fixed N=20==100%, old-page-gone + single-child `<main>` + new-heading over ≥6 hops, CI-headless DOM, committed + registered Band-2 `["ci","release"]`). Couple to `main > article`.
- §K.4 + §L.0/§L.0b/§L.7/§L.8: the ship spine — `proof:ship-attestation` `["ci","release"]` FIRST (surfaceHash bound to REAL surface-closure SOURCE bytes, paint-teeth + freshness), `runShip()` fail-CLOSED (Mac-only dispatch, :5199 guard, served-app sentinel, skeleton exits non-zero / writes FAIL verdict), `demo:dist:build`/serve scripts, `matchAll` BOTH close-battery clauses + prefix-anchor (clause-2 ⇒ ship∧full, clause-3 ⇒ full-only RATIFIED) + clause-5 structural self-test, `release.sh` ship-block LAST. Run the GREEN ceremony end-to-end in a fresh `/tmp` worktree (siblings+precepts-absent, porcelain clean after, tag reconciles).

**Band 3 (floors):**
- §K.6 + §L.6: `proof-safari-parity.mjs` committed + registered Band-3 `["local","ci","release"]`, green-on-clean against the RE-MEASURED 10-site P4 set (resolution (a) or (b), ratified) + the P3 light-dark-token landmine, `stripComments` imported from the canonical shared lib, P1 anchored to `backdrop-filter:url()` only; `demo/vite.demo-dist.config.ts` (HONEST hybrid header — dist `/styles` cascade + src component JS + src SFC scoped CSS, exercised once on Chromium :5200); `CONSTRAINTS.md` (var()-resolution GREEN version-26.4-scoped + ≤18 WS3-bake trigger + Safari-PAINT DROP-WITH-TRIGGER + Mac-only-release decision + GL↔flash coupling); `proof:constraint-manifest`. safaridriver-or-DROP. Promote `proof:lighthouse` (`["local"]`→+release) + `proof:no-layout-animation` (`["ci"]`→+release); re-pin `floor.baseline.json` at the BG-achieved number (median-of-N) ONLY after WS1–WS6 land.

**Band 4 (census):** §L.10/census — DATE-CALENDAR (reka-ui BUILD) / CHART-FAMILY (token-SVG BUILD) / DS-COMPLETE (build-or-defer verdicts), each a genuinely-adjudicated FOLD-LEDGER row.

**Band 5 (honest re-cut, LAST):** BG.W-CUT — the tag fires only after `--run ship` passes over the served BG roster, siblings+precepts-absent, with the F0 witness + the real-Safari `webkit.glass/goo==pass` (safaridriver-or-DROP) + the user gate. Closes the BD P10a tail.

---

## FILES TOUCHED (the committed-disk deliverable set)

**Band-0 commit (§J.1, FIRST):** `scripts/lib/surface-closure.mjs` (untrack→commit, + the routeSeeds HARD-RED arm §L.4 onto the REAL P6 leaf) · `scripts/proof-ba-gestalt.mjs` (commit; PURGE `REQUIRED_SURFACES` L94 + all BC comments — re-derive from BG roster routes) · `scripts/lib/critical-path-walk.mjs` (commit) · `scripts/reflect-capture-verify.mjs` (decoder extension IN-PLACE) · `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` (10 surfaces, routes cells → REAL 4.2.0 route files, per-surface `<surface>.md` hash records surface-paths DERIVED, BG-dated, one prose-only cross-repo row, per-surface field-probe regions §L.1).

**Band-0 F0:** `scripts/lib/fold-ledger-core.mjs` (NEW, extracted) · `scripts/proof-bc-fold-ledger.mjs` (refactor onto core, GREEN @213) · `scripts/proof-bg-deferred-ledger.mjs` (NEW, three teeth + 9-bite self-test) · `docs/tranches/BG/FOLD-LEDGER.{json,md}` (NEW, genuinely adjudicated) · `gates.mjs` (register Band-0, note says 9-bite) · `package.json`.

**Band-1:** `src/composables/motion/morphSignatures.ts` (NEW) + 5 re-points + `useMorphField.ts` gut · `useHaptic.ts` delete + `src/index.ts:285`/`api/index.ts:370` export drops · `selectableChipVariants.ts` delete + 2 re-points · `liquid-morph.css` move + `demo.css:125`/`dock.css:59`/`critical-partition.mjs:174` re-points · `useLiquidMorph.ts` delete · `gates.mjs` (coordinated-WS6 `proof:dock-context` row) · ratchet rows.

**Band-2:** `scripts/proof-field-aurora.mjs` (NEW, SOURCE arm + Metal symptom-π) · `scripts/proof-route-navigates.mjs` (NEW) · `scripts/proof-ship-attestation.mjs` (NEW, FIRST, surfaceHash→source bytes) · `scripts/lib/gl-renderer-probe.mjs` (NEW, UNMASKED_RENDERER) · `scripts/gates.mjs` (`runShip()` dispatch Mac-only fail-CLOSED; register the 4 gates; ship-attestation `["ci","release"]`) · `scripts/proof-close-battery-parity.mjs` (matchAll BOTH + prefix-anchor + clause-3 RATIFIED full-only + clause-5 structural) · `docs/tranches/BG/DEFECT-LOCALIZATION-MAP.md` (NEW, measured margins + derivation) · `docs/tranches/BG/audit/reflect/*-{light,dark}-desktop-full.png` (Metal born-RED, NON-self-authored, committed) · `package.json` (demo:dist:build/serve, the 4 proof scripts).

**Band-2 release.sh:** `scripts/release.sh` (ship-block before L60 porcelain) — LAST.

**Band-3:** `scripts/proof-safari-parity.mjs` (NEW, P4 resolved (a)/(b) ratified) · `demo/vite.demo-dist.config.ts` (NEW) · `docs/tranches/BG/CONSTRAINTS.md` (NEW) · `scripts/proof-constraint-manifest.mjs` (NEW) · `gates.mjs` (register Band-3; promote lighthouse + no-layout-animation release) · `scripts/lighthouse/floor.baseline.json` (re-pin, after WS1-6) · `package.json`.

**Band-4:** `src/components/custom/chart/*` (NEW) · `src/components/custom/calendar/*` (reka-ui) · `docs/tranches/BG/DS-COMPLETENESS-census.md` (NEW) · FOLD-LEDGER rows.

**All waves:** `docs/tranches/BG/waves/BG.W-*.md` (the dir does not exist — create each; the F0 destination-soundness clause REDs on a phantom dest).

---

## THE BG.W-* WAVE BREAKDOWN (each carries its validated mechanism + real-paint-π bar + folded deferred items)

**Band 0:**
- **BG.W-DEFERRED-LEDGER** (§K.5+§L.11) — DRY `fold-ledger-core.mjs` (VERIFIED-GENUINE: BC GREEN @213, BG @136), three teeth (charter-match / templated-evidence-skeleton / concentration-ceiling), DERIVED corpus 136, AX 31-vs-32 first-bite, disjoint-namespace assert, F0-scoped no-orphan, `CONSUME(...)`/`BOOKED:` `.ts`/`.vue`-scoped grammar, `file#KIND#slug`, 9-bite self-test. **π bar:** born-RED on the UN-DECIDED corpus + the AX-32-literal / non-canonical-book / blanket-route / templated-evidence / concentration self-tests; GREEN when every derived id is DECIDED with REAL row-specific evidence routed to a charter-matched wave; the entangled Band-1 rows carry their REAL shapes (silhouette=COORDINATED-WS6, useMorphField=gut, useHaptic=RETIRE-real-grep). Re-run born-RED on a synthetic blanket-route ledger — it MUST RED.
- **BG.W-BE-BF-LEDGER** — 70-wave parity (39 BE + 31 BF; LANDED-no-build / NEVER-BUILT-names-a-wave-or-RETIRE).
- **BG.W-DISPOSITION-RESTAMP** — 31 BC→BG in place (DERIVED-count loop), n:2 re-eval, the 2 pending flips (`css-relative-color`→BB.W-DARK-INK-WARM, `styles-critical-split`→**BB**.W-CSS-CRITICAL with the BC-phantom F2 catch). Re-stamp-without-decide REDs.

**Band 1:**
- **BG.W-SPIKE-DELETE** — `useLiquidMorph` 462L delete + `useMorphField` gut-and-rehome (`morphSignatures.ts` + 5 re-points) + `selectableChipVariants` alias delete + `liquid-morph.css` 850L demo-rehome, atomic file+gate+ratchet diffs; `vue-tsc` GREEN the falsifier.
- **BG.W-JUBILANCE-DECIDE** — RETIRE `useHaptic` (real-grep adjudicated; `proof-haptic.mjs` EXISTS so the gate is real — DECIDE the gate's fate WITH the mechanism) + drop exports; DECIDE `useCelebrationBurst` (KEEP, 2 consumers); record FLIP-ONE as a DECIDED coordinated-wave row.
- **BG.W-DEAD-GATE-SWEEP** — F6 gate→symbol map by IMPORT; `proof:dock-context` = COORDINATED-WS6 row (NOT a unilateral delete); KEEP dock-fission/bloom-up/metaball-bridge2 (live); the de-shadcn destination RECORDED (WS4/BG.W-DESHADCN-SWEEP), NOT homed in WS7. **This wave is a RETIRE/SWEEP charter — no BUILD row may route here (the F0 charter-match clause).**

**Band 2:**
- **BG.W-PAINT-IS-THE-GATE** (§K.1+§K.2+§L.1/§L.3/§L.9/§L.10) — the `runPi()` instrument proven via the REAL codepath (BOTH projects); the decoder extension IN-PLACE (chroma-gate folded into `<=` grammar, measurement-validity wired to the FAIL path at `:567`, `topDelta`+`hueBandGuard` the only new helpers) + the per-surface field-probe regions (content-vs-field false-positive solved) + `DEFECT-LOCALIZATION-MAP` (MEASURED chroma-ceiling + topDelta + derivation) + persisted NON-self-authored real-GPU PNGs. **π bar:** `proof:ba-gestalt` born-REDs on a 4.2.0 Metal reproduction the agent did NOT author (top-bar D5 `topDelta` ≥ measured; field meanChroma-CEILING ≥ measured from a real broken-vs-fixed pair); the all-PASS-re-shot-broken-UX regression bite STILL REDs; the content rainbow does NOT false-RED; `DESKTOP_FULL_WIDTH` documented; selfTest count string honest (15 incl. 2 negative rejects).
- **BG.W-GESTALT-ROSTER-RE-POINT** (§C″+§K.2.4+§L.4) — surface-paths DERIVED from route files (routeSeeds HARD-RED reconciled onto the REAL P6 leaf, surfaced as `[ROUTE-RESOLVES]`), the roster `.md` shipped (10 surfaces, routes→real files, BG-dated, one prose-only cross-repo GREEN row), per-surface field-probe regions, the REQUIRED_SURFACES purge, over-revoke disclosure, PNG↔hash scope boundary stated. Self-test: `/dock/typoo` RED + "the shell BottomDock" GREEN.
- **BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION** (§K.4+§L.0/§L.0b/§L.7/§L.8) — `proof:ship-attestation` **`["ci","release"]`** FIRST (the tag-push bypass-closer; surfaceHash bound to REAL surface-closure SOURCE bytes; paint-teeth re-applying band predicates to the embedded digest + freshness recompute), fail-CLOSED `runShip()`, `matchAll` BOTH close-battery clauses + prefix-anchor (clause-3 RATIFIED full-only) + clause-5 structural self-test, `demo:dist` scripts, the GREEN ceremony RUN end-to-end in a fresh `/tmp` worktree (porcelain clean after, gitignore policy decided, FAIL-abort trap-cleaned), forgery-overclaim DROP-WITH-TRIGGER. **π bar:** `--run full` REDs in CI-shape on absent/stale `SHIP-ATTESTATION.json`; the GREEN ceremony's attestation is committed-and-clean; a re-stamp/frozen/skip digest REDs.
- **BG.W-GATE-ROUTING-LIVE** (§K.3) — `main > article` scope, 0.2s real `--duration-fast` leave, real-nav variant + `startViewTransition` resolution (same-category hops), old-page-gone + single-child `<main>` + new-heading over ≥6 hops, real green-on-fixed N=20==100%, committed + registered Band-2 `["ci","release"]`, CI-headless DOM.
- **BG.W-GATE-FIELD-AURORA** (§L.1/§L.2/§K.7) — device-free SOURCE arm (SIMULTANEOUS-painter count, 3-stack born-RED, the CI/release tag-blocker) + chroma-ceiling Metal symptom-π (design-agnostic, local-only) + corner-variance SECONDARY anti-frozen (WS1-coordinated, fires only on a confirmed live aurora). Coordinate field=aurora-vs-wash with WS1 before pinning the corner-variance.
- **BG.W-GATE-PREVIEWS-RENDER** · **BG.W-GATE-UNIFORM-BLUR**.

**Band 3:**
- **BG.W-SAFARI-PARITY-GATE** (§K.6+§L.6) — LANDED + registered Band-3 `["local","ci","release"]`; green-on-clean re-proven against the `glass-fx.css:137` light-dark-token + the 10 oklab single-mixes (enumerated); P4 resolved (a)/(b) WITH ratification (no phantom re-scope); `stripComments` from the canonical shared lib; P1 anchored to `backdrop-filter:url()` only (regular `filter:url()` goo/fission MUST NOT RED); honest demo-dist hybrid header exercised once; safaridriver-or-DROP ladder; the SOURCE-arm-floor-only honesty statement; var()-resolution GREEN version-scoped; PAINT claims quarantined (DROP-WITH-TRIGGER).
- **BG.W-CONSTRAINT-MANIFEST** — `CONSTRAINTS.md` (six binding constraints + Safari version matrix + ≤18 trigger + Mac-only-release decision §L.0 + GL↔flash coupling + iOS-26 a11y ceilings) + `proof:constraint-manifest` over live tokens; lighthouse re-pin + no-layout-animation→release promotion.

**Band 4:** **BG.W-DATE-CALENDAR** (reka-ui BUILD) · **BG.W-CHART-FAMILY** (token-SVG BUILD) · **BG.W-DS-COMPLETE** — each a genuinely-adjudicated FOLD-LEDGER row with a build-or-defer verdict.

**Band 5:** **BG.W-CUT** — the tag fires only after `--run ship` passes over the served BG roster, siblings+precepts-absent, with the F0 witness + the real-Safari `webkit.glass/goo==pass` + the user gate; closes the BD P10a tail. The falsified "appears FIXED"/"lens APPLIES" must NOT propagate into the CUT.

---

## THE ACCEPTANCE / REAL-PAINT-π BAR

**Each residual closes ONLY when the artifact is on COMMITTED `tranche/BG` disk AND registered in `gates.mjs` AND the gate runs green-on-fixed / red-on-broken from a reproduction the building agent did NOT author** (§K.0). NOTHING is on the real tree at HEAD — that is the literal frontier.

**The tag-push closure is the primary acceptance fact (§L.0, VERIFIED-CORRECT thesis):** `proof:ship-attestation` registered `["ci","release"]`; `node scripts/gates.mjs --run full` REDs (CI-shape, no Mac) when `SHIP-ATTESTATION.json` is absent OR its embedded `surfaceHash` !== HEAD-recomputed-over-`surface-closure.mjs`-SOURCE-bytes. The ONLY device-free enforcer on the `git push --tags`→`release.yml`→`npm publish` path.

**Born-RED on the shipped 4.2.0 tree:**
- `proof:field-aurora` SOURCE arm FAILS (≥1 shell field + ≥1 route field, SIMULTANEOUS, device-free, CI-able) · `proof:ba-gestalt` top-bar D5 (`topDelta` ≥ MEASURED) + the Metal field meanChroma-CEILING (≥ MEASURED ~0.06–0.08 from a REAL broken-vs-fixed pair) — NOT `meanHue` (the field is hue-warm; hue is a chroma-gated content guard with the measurement-validity bite); the content rainbow does NOT false-RED (per-surface field-probe regions).
- `proof:route-navigates` FAILS via `max(main > article) > 1` during the 0.2s window (N=20 pass-rate==0%) + the survivor-identity; the nested-`<article>` fixture must NOT false-RED.
- `proof:bg-deferred-ledger` FAILS (DERIVED corpus UN-DECIDED; AX-`32`-literal, non-canonical-book, blanket-route, templated-evidence, concentration, selfTest-fixture, phantom-`D99` self-tests RED).
- `proof:ship-attestation` FAILS (no served run / digest predicates fail / `webkit` verdict absent / `runShip()` skeleton FAIL-verdict / stale surfaceHash).
- `proof:close-battery-parity` FAILS (release.sh has no `--run ship` / first-match-bug-fixed-but-ship-absent, clause-2 ship∧full + clause-3 full-only).
- `proof:safari-parity` FAILS RED-on-broken (planted `backdrop-filter: url(#glass-goo)` → P1 FAIL bug-245510) but GREEN-on-clean against the live landmines (P3 token + the 10 oklab single-mixes + the regular `filter:url()` goo/fission sites).

**GREEN only when** the field paints ONE field system (SOURCE arm) + the corner-variance matches WS1's committed live aurora on Metal + meanChroma stays below the measured ceiling · the top-bar hairline is gone (`topDelta` collapses) · routing keeps single-`main > article` coexistence + the destination-heading survivor over ≥6 hops (N=20 100% on fixed) · every DERIVED deferred item is genuinely DECIDED with REAL evidence routed to a charter-matched wave · every `release` gate locks a ≥2-consumer mechanism · real Safari resolves var() to literal blur (version recorded) + safaridriver-OR-DROP certifies glass+goo paint (lens degrades-gracefully) · `--run ship` runs end-to-end in `/tmp` with porcelain clean after + the tag reconciles + `proof:ship-attestation` GREENs on the fresh digest · constraint manifest holds · lighthouse re-pinned at the achieved number.

**The binding π is the IN-PROCESS served-demo capture at HEAD on Metal** (SRC demo for paint, demo-dist for Safari), the per-region pixel DIGEST embedded in `SHIP-ATTESTATION.json`, re-verified device-free at CI by re-applying the band grammar + the surfaceHash freshness recompute. The bounded trust: re-stamp/frozen/skip/stale REDs; malicious hand-forge is out of the Phase-1 threat model (DROP-WITH-TRIGGER).

---

## FOLDED DEFERRED ITEMS (the DROP-WITH-TRIGGER + DECIDED register, into the F0 ledger)

- **C-PAINT forgery-beyond-re-stamp** → DROP-WITH-TRIGGER (surfaceHash over SOURCE bytes catches re-stamp/frozen/skip/stale — the 3× chronic — not a malicious hand-forge; re-enable at capture-signing/OIDC-capture-identity).
- **Phase-1 `authoredBy≠runnerIdentity`** → DROP-WITH-TRIGGER (no orchestrator write-fenced token on the Mac close; re-enable Phase-2 with OIDC).
- **Safari PAINT certification** → safaridriver-end-to-end IF the close-machine enable is proven this pass, ELSE DROP-WITH-TRIGGER (webkit.glass/goo ride the SOURCE arm only; a documented-manual screenshot is audit evidence, never the gate GREEN). C-SAFARI is NOT discharged by the source-arm gate.
- **Safari ≤18 var()-bake** → WS3 literal-bake trigger (a 26.4 GREEN does not cover ≤18; recorded in CONSTRAINTS.md). `@container style()` landmine triggers only Safari <18.
- **Safari backdrop-refraction lens** → Safari-IMPOSSIBLE via `backdrop-filter: url()` (bug 245510 OPEN); the `@supports` gate keeps the THIN Chromium enhancement; the cross-browser re-architecture is a booked WS8 glass-deep wave, NOT a WS7 fallback.
- **P4 disposition** → resolution (a) literal-detector-with-DERIVED-allowlist OR (b) DROP-with-CONSTRAINTS.md-rationale, RATIFIED by WS1/orchestrator — NOT a phantom re-scope.
- **edge-cast / metallic-chroma-mean as cast / field-HUE-as-cast** → DECIDED-phantom-with-trigger (the source-read over-claims; bites stay armed; the metallic born-RED is the chroma-CEILING, not the cast).
- **FLIP-ONE** (useBloomUp/useLiquidReveal/useDockCtaReceive/useCelebrationBurst re-fork ElementMorph+springTimingFunction while kf `flipShared` is imported-and-ignored) → DECIDED coordinated-wave (named, WS2/WS6 build on these engines).
- **useDockContextSilhouette + proof:dock-context** → DECIDED COORDINATED-WS6 (the Siri context-switch state-machine; resolves to RETIRE at WS6's close if no live consumer, recorded NOT unilaterally cut).
- **proof-de-shadcn destination** → WS4 / BG.W-DESHADCN-SWEEP (recorded, NOT homed in WS7; F0 no-orphan must not RED on the committed-untracked file).
- **The Mac-only-release friction** → DECIDED (not deferred): a CI-only / tag-push of a surface-changed HEAD cannot pass `--run full` without a fresh Mac `--run ship` ceremony; recorded in CONSTRAINTS.md (§L.0).

---

## RESIDUAL GAPS (the unconverged frontier — what pass 4 execution still owes)

1. **NOTHING is on committed `tranche/BG` disk.** The §J.1 scaffolding is still dangling (`surface-closure.mjs` `??`, `proof-ba-gestalt.mjs`/`critical-path-walk.mjs` ` M`); every NEW gate is ABSENT; the decoder is UNMODIFIED; the roster + waves dir + FOLD-LEDGER + CONSTRAINTS + DEFECT-LOCALIZATION-MAP + SHIP-ATTESTATION are ABSENT. The acceptance bar is committed disk — this is the dominant residual.
2. **The NON-self-authored Metal born-RED capture does not exist.** Every born-RED to date is a self-authored controlled page (FORBIDDEN). The real 4.2.0 demo Metal capture + the MEASURED chroma-ceiling/topDelta margins from a real broken-vs-fixed pair are owed before the gate is non-circular.
3. **`proof:ship-attestation` is not built/registered** — the tag-push bypass-closer (the #1 structural hole) is theater until it lands `["ci","release"]` with surfaceHash bound to REAL source bytes, in the SAME cut as clause-2.
4. **The GREEN ship ceremony has not run end-to-end** — only the fail-closed path was exercised; the porcelain-clean-after + tag-reconcile + gitignore policy claims are unsubstantiated.
5. **F0's three teeth + the genuine 23-row adjudication are unbuilt** — the producer's blanket-route auto-fallback still reproduces the BB.W-NDA-DECIDE chronic; the charter-match / templated-evidence / concentration clauses + the 9-bite count fix + the non-self-authored born-RED re-run are owed.
6. **Safari gate unlanded; P4 unratified** — `proof-safari-parity.mjs` is not in the tree; the P4 (a)/(b) decision needs WS1/orchestrator ratification; C-SAFARI real-paint stays DROP-WITH-TRIGGER (safaridriver enable unproven).
7. **WS1/WS3 coordination open** — field=aurora-vs-wash (corner-variance secondary) + the dark/gray/blur fixes land on the shared branch; the born-RED ground must freeze first (§L.9).
8. **Band-4 census BUILDs (chart/calendar) are post-close coverage** — specified with verdicts, not yet built.

---

## OPEN RISKS (post-pass-4)

1. **The tag-push bypass closure (§L.0) is the single highest-leverage deliverable** — VERIFIED-CORRECT thesis (`gatesFor("full")` is the deduped union). Falsifier: `--run full` GREENs in CI-shape with an absent/stale `SHIP-ATTESTATION.json`.
2. **The chroma-ceiling must discriminate metallic from calm on REAL Metal** — pin from a real broken-vs-fixed pair, NOT synthetic. Falsifier: a calm WS1 field reads ≥ ceiling, or the slab reads < it, on a real capture; or rainbow content false-REDs the field probe.
3. **`--run ship` end-to-end is unproven + load-bearing.** Falsifier: a deadlock (porcelain dirty after), a green skeleton, a :5173 fail-close, the tag not reconciling, or a dirty FAIL-abort.
4. **The born-RED ground evaporates on the shared branch (§L.9).** Falsifier: the broken Metal PNGs are not committed before integration.
5. **Band-1 entanglement (§L.5).** Falsifier: a WS6 demo breaks (silhouette), or `vue-tsc` REDs on a dangling `MORPH_SIGNATURES` import (useMorphField), or a useHaptic RETIRE without a real call-site grep.
6. **Safari real-paint stays DROP-WITH-TRIGGER.** Falsifier: a safaridriver session creates end-to-end after the documented enable; absent that, the SOURCE arm is the honest ceiling.
7. **The P4 re-measure (§L.6).** Falsifier: green-on-clean REDs any verified-legitimate `color-mix(in oklab,…,transparent)` site (the 10).
8. **F0 adjudication-vs-restamp + blanket-route teeth (§K.5/§L.11).** Falsifier: a synthetic blanket-route + templated-evidence ledger passes the gate.
9. **Band 1 before Band 2; BG.W-CUT last** (sequencing, unchanged).
