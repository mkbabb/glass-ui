# GOLDEN-chronic-fold — the "what keeps getting missed, never again" ledger

**Lane** GOLDEN synthesis (adversarial hardening) · **Mode** PLANNING / audit (no code) ·
**HEAD** `89edffc` (3.8.0 published + convergence W44-W61) · **Verdict** DEFERRED-CHRONIC.

This is the single fold ledger: every chronically-deferred or chronically-missed item surfaced
across the 5 dedicated CHRONIC-* lanes + the 18 band/cross-cutting challenges → its AX receiver
wave → the **institutional fix** (the gate or process that PERMANENTLY closes the recurrence
class, not the one instance). It synthesizes:
`CHRONIC-defer-early.md` (C→V), `CHRONIC-defer-late.md` (AB→AW), `CHRONIC-miss-cardinal.md`,
`CHRONIC-miss-consumer.md`, `CHRONIC-miss-release.md`, and the chronic sections of
`CH-{dock,glass-material,blob,primitives,demo-ia,tabs-motion,aurora,structural,foundational,misc,close-crossrepo}.md`.

---

## THE GESTALT FINDING (the one sentence)

**The project does not have a deferral problem — it has a deferral-CLOSURE problem, and the
closure mechanism that keeps failing is identical across every chronic: a gate or bar that is
satisfiable by a PROXY** (a static attestation instead of a pixel; a section-marker grep instead
of an image; a demo-story instead of a production consumer; a `src+demo` sweep instead of one that
includes `tests/`+siblings; a manifest the release path never verifies; a wave-doc claim no gate
asserts against HEAD). Every chronic below is one species of that single disease. The permanent
close is NOT more ledger discipline — it is making each gate **un-satisfiable by its proxy**,
landed at AUTHORING time, owned by a NON-terminal wave.

The corpus has DIAGNOSED this three times inside AX alone (A-session-soundness, S-cardinal,
soundness-reconcile) and authored excellent SPECS — and that is itself the disease: a diagnosis +
a spec routed to a future wave IS the "deferral with telemetry" pattern. **Every institutional fix
below is currently on paper, unbuilt, and routed to W33 — the LAST wave — the maximal-drift
position.** Five proof scripts named-but-absent at HEAD, live-verified now:
`proof-live-verified-ledger.mjs`, `proof-no-orphaned-wave-claim.mjs`, `proof-carry-closure.mjs`,
`proof-styling-hygiene.mjs`, `proof-glass-card-tiers.mjs` → all `No such file`. Zero `.png`
captures under `audit/`. `tsconfig.test.json` → absent.

---

## THE FOLD LEDGER — every chronic → receiver wave → institutional fix

Severity legend: **🔴 blocker** (fires at the 3.9.0 cut or ships a broken surface) ·
**🟠 high** (recurs every band, compounding) · **🟡 chronic** (recurs every tranche, low-grade).
Slip-count = number of tranches/waves the item has been deferred or missed across.

### CLASS A — the headless-green-over-broken / cardinal-lesson chronic (the master class)

| # | Chronic item | Slip-history (count) | AX receiver | Institutional fix (the permanent close) |
|---|---|---|---|---|
| **A1** 🔴 | **`proof:live-verified-ledger` SPECIFIED but NOT IMPLEMENTED.** `ls scripts/proof-live-verified-ledger.mjs`→absent; `grep live-verified-ledger package.json`→0. The gate the whole tranche exists to build is unbuilt. | AW blowout → W04/W12 integration → round-1 (W09/W05) → round-2 (6 waves) → Q3 live-contradiction → round-3 (W19). **6-deep + a 4-tranche π-lane deferral of the detector.** | **W00-extension (NOT W33)** | LAND IT NOW as a W00-band extension (W00 is the gate-philosophy foundation, already complete). The SOURCE arm must require a **real `.png` on disk** the DELTA references (not a `Screenshot set:` section-marker grep — that proxy is exactly what W01/W02-DELTA.md already exploit). Run it as a **commit-msg / pre-commit hook** on any commit whose message contains `live-verified` or that flips a PROGRESS cell to `live-verified`/`complete`. |
| **A2** 🔴 | **ZERO `audit/visual/` captures exist.** `find docs/tranches/AX/audit -name "*.png"`→0. CAPTURE-PROTOCOL.md exists; nothing was ever captured. Every "live-verified" mark (W45/W52/W53/W56/W57/W59) owes a DELTA. | The capture discipline was WRITTEN at W00 and never executed. Recurs at every convergence roll-up. | **W00-extension + every live wave** | The ledger gate (A1) makes a fresh on-disk capture the ONLY way to mint `live-verified`. Re-author W01/W02-DELTA.md to attach their actual captures OR revert them to `live-pending` — they are currently credited as the protocol's only two passes and they contain no pixels (the baseline over-credits itself by 2). |
| **A3** 🔴 | **W52 is LIVE-CONTRADICTED but still marked `live-verified (DEVELOPED)`.** Q3 (pass-3): hover reads only on click. W52 JSON `liveArmHandoff` itself warns this is the W09 recurrence. Source-incoherent: `hover:scale` is on EXACTLY 2 of 12 button variants — the glass/default variants (the MAXIMAL-glass common case) get NO hover scale. | W09 shipped headless-green over a blooming surface → D19/W52 re-opened it → W52 repeats the false mark. | **W52 re-open (PROGRESS) + W54** | Flip W52 PROGRESS to `live-pending`. Fold the hover-scale onto ALL interactive variants in W54 (the glass-first ROOT) so the common glass button reads on hover, gated by the A1 ledger. |
| **A4** 🟠 | **JSON↔live-truth blind spot: tri-consistency over three un-browser-run ledgers passes.** W15/W16 are `complete` in BOTH PROGRESS and JSON while the blob is live-broken (D4/D5/D7); the JSON was written from a REASONED re-derive ("Could NOT run a real browser"), so a PROGRESS↔JSON consistency gate reads them as AGREEING and passes. | W15 4 solve-cycles, each promising a live audit, none run → W46 minted → W46 unexecuted (cycle 5). | **W46 + the A1 gate (H5 clause)** | A JSON `status: complete`/`GREEN` must itself require a `liveVerifyHandoff.deltaArtefact` field pointing at an existing capture. A reasoned re-derive cannot carry that field, so it cannot read `complete` — it reads `live-pending`, which the tri-consistency gate then correctly surfaces. |
| **A5** 🟡 | **The `live-verified (DEVELOPED)` compound label is the linguistic vehicle of the inflation.** It reads "developed AND verified live" while meaning "developed; live arm owed." | Round-2/3 transmission vector (commits `88a2ec5`/`c72d2ac` "DEVELOPED + live-verified (MCP)"). | **W33 precept (vocabulary clean-break)** | Retire the compound. Legal statuses: `planned`/`in-progress`/`dev-complete`/`live-pending`/`live-verified`, where `live-verified` is GATE-DEFINED (A1: a fresh on-disk capture), never author-asserted. No third "developed-and-claimed" state. Cheapest action; removes the exact phrase the orchestrator reaches for. |

### CLASS B — the orphaned-wave-claim chronic (doc-says-done / tree-says-no)

| # | Chronic item | Slip-history (count) | AX receiver | Institutional fix |
|---|---|---|---|---|
| **B1** 🔴 | **W19 marked `live-verified (DEVELOPED)` while its born-RED witness #1 is STILL RED at HEAD.** `src/components/custom/header-ribbon/` EXISTS, `api/index.ts` imports it, `package.json` exports it (verified live). The F0 header-ribbon excision NEVER landed. | V.W3 `/freshness` wire-claim (doc-said-done, 2-tranche miss) → W19 (live). The "doc-says-done/tree-says-no" class. | **W20** (owns header-ribbon/glass-panel prune) + the A1 gate | `proof:no-orphaned-wave-claim`: a PROGRESS `live-verified`/`DEVELOPED` row whose wave declares a falsifiable RED witness REDs the ledger unless that witness's `proof:*` is GREEN. Fold into the A1 ledger gate (one gate, two bites: DELTA-existence + witness-clearance). Unblock W35 (its prune-publish precondition needs W20 landed). |
| **B2** 🟡 | **MASTER-PLAN asserts ownership the owning wave doc does not encode.** Batch 8 claims "W26 incl. the SegmentedTabs 683-line spillover" — W26's FileBounds table has ZERO `tabs/` entry. Inflation at the plan-roster level. | Same status-inflation class, at the plan layer. | **W26 FileBounds amend** | Add SegmentedTabs.vue (683), GlassDock.vue (534), constellationField.ts (510) to a REAL FileBounds, not a MASTER-PLAN aside. A `proof:no-orphaned-wave-claim` extension that asserts every MASTER-PLAN "incl. X" routes to a wave-doc FileBounds row carrying X. |

### CLASS C — the clean-break-rename-misses-a-consumer chronic (under-SCOPED, not under-tooled)

| # | Chronic item | Slip-history (count) | AX receiver | Institutional fix |
|---|---|---|---|---|
| **C1** 🔴 | **`tests/` is out of EVERY typecheck scope.** All 3 tsconfigs `include` src-only. The AV.W14-carved test mirror is a type-unchecked island. `tests/configurator-recursion.spec.ts:49` imports the DELETED `BouncyToggle` (verified live), renders `h(undefined)`, passes 6/6. The strongest dead-ref detector in the repo (the type system) is structurally blind to the tree most likely to carry a stale ref after a clean break. | Slipped AV→AW→AX (3 tranches) since the carve. | **W27a / W33 (smallest-change, highest-leverage)** | Add `tsconfig.test.json` (`extends ./tsconfig.json`, `include ["tests/","src/"]`, `types ["vitest/globals"]`); run it in `typecheck` + CI. Born-RED NOW on `configurator-recursion.spec.ts:49`. This single change makes every future clean-break orphaned test import a RED TS2305 at the wave that causes it. |
| **C2** 🔴 | **No cross-repo "stale-consumer-import" gate.** W53 deleted `BouncyTabs`/`BouncyToggle`/`UnderlineTabs`/`ResponsiveTabs` + the `/responsive-tabs` subpath; speedtest imports the deleted surface in **8 files** (3 hard module-resolution failures on `/responsive-tabs`, the rest silent `undefined`-no-op). `proof:consumers-static` walks siblings for SURFACE-CREEP, not for "does a consumer import a DELETED symbol." No reverse clause. | AP+I bindings → AS.W7 → AW.W3 keepDockOpen → W04 false-zero-consumer → W13 crayon (flagged 4×) → W53. **6 documented recurrences, one named-but-unbuilt fix.** | **W34 (born-RED) + W33 close** | `proof:consumer-staleness`: for each present sibling, grep every `import … from "@mkbabb/glass-ui[/sub]"` and assert each NAMED import resolves against glass-ui's CURRENT public surface (exports keys + each subpath's export set). Born-RED on the 8 speedtest files. Converts the MASTER-PLAN-Batch-9 INTENT into a fail-closed forcing function. |
| **C3** 🟠 | **Wave-local deletion gates copy-forward `["src","demo"]`.** `proof:tabs-unified` clause 10 (`SWEEP_ROOTS=["src","demo"]`) is the THIRD gate (after typecheck + strict-templates) to inherit the hole. Each new deletion gate copies the prior walk-root; the gate built to PROVE the W53 deletion reports 0 survivors because it doesn't look where they live. | The copy-forward propagates the hole into the next clean-break wave. | **W27a + dispatch-template** | Pull `SWEEP_ROOTS` into a shared `DELETION_SWEEP_ROOTS = ["src","demo","tests"]` constant every "no-Identifier-survives" gate imports. Add a `consumer-set-is-grepped` cadence sub-step to AGENT_DISPATCH_TEMPLATE: any deleted/renamed export → grep `src+demo+tests+present-siblings`, EITHER re-point in-wave OR route to a named wave WITH a born-RED cross-repo gate. Makes "ZERO consumers at HEAD" un-assertable without a machine grep. |
| **C4** 🟡 | **Clean-break renames miss sibling WAVE DOCS + the doc-truth count.** W53 BouncyTabs→SegmentedTabs left W38/W47/aurora convergence docs citing BouncyTabs (false born-RED witnesses); `MIGRATION.md` claims metric-cell/stack "RETIRED (AV.W10)" while `src/subpaths/metric-cell.ts`+`metric-stack.ts` EXIST (verified). The W05 `--ease-apple-spring` left 3 speedtest survivors. | L pagination/virtual → AV metric "retired" claim → W05 → W53. 3+ recurrences. | **W27b (commentary sweep) + W34** | The C2 consumer-staleness gate covers code; add to it a doc-witness clause: any wave-doc grep-witness naming a deleted symbol REDs. Reconcile MIGRATION.md retire-claims against HEAD subpaths (the same B1 doc-says-done class at the migration-doc layer). |

### CLASS D — the budget-rebaseline ratchet chronic (a logbook of growth wearing a gate's clothing)

| # | Chronic item | Slip-history (count) | AX receiver | Institutional fix |
|---|---|---|---|---|
| **D1** 🔴 | **The CSS budget is breaching NOW and CI is RED on it.** `gh run list --branch master`→3× failure; the failing step is `gates→profile:budget` (`dist/styles/index.css gzip 144852/140000 = 103.5%`). `profile:budget` is RELEASE-tagged → the 3.9.0 tag fails at `release.yml`. 3.8.0 itself was MANUALLY unblocked (`f2fc614 "unblock the 3.8.0 publish"`). And W54/W55/W56 (MAXIMAL glass-first + adaptive + squircle) will ADD MORE CSS. | F12→I.W6 landed→J/`5baceb5` silently DELETED it→K re-landed→P headroom alert→3.6.0 re-base→3.8.0 manual-unblock. **Poised for a 3rd at 3.9.0.** 12+ rebaseline commits, gzip ceiling +87% never-down. | **A new publish-readiness wave / W33 step-0 (NOT Batch 8)** | The MASTER-PLAN Batch-8 "carve-before-rebaseline" sequencing predates the MAXIMAL-glass decision and assumes a SHRINKING close that is now a GROWING close. MINT the EIGHTH conscious lift, sized to carry glass-first CSS, as the LAST act before the 3.9.0 tag. Add `proof:budget-gate-present` (asserts `profile:budget` exists in package.json AND a workflow runs it) so a later consolidation cannot silently delete it (the J→K regression). Add a DOWN-ratchet obligation after each prune wave (W19/W25/W27) so the budget CAN fall — prove it can bite by tightening it once. |

### CLASS E — the ci.yml↔manifest drift chronic (a detector permitted to run RED)

| # | Chronic item | Slip-history (count) | AX receiver | Institutional fix |
|---|---|---|---|---|
| **E1** 🔴 | **20 ci-tagged gates MISSING from ci.yml; CI is RED on its own self-check.** `gates:verify-ci` exits 1 (correctly fail-closed) and IS the last step in ci.yml → CI on master is RED on the parity check right now. `gates.mjs --list ci`=90 gates; ci.yml runs 71. The manifest grew 19 ci-tagged AX gates (W23/W37/W45/W52/W53/W59), none mirrored into the YAML. | P heap-bump (`ci.yml` but not `package.json`) → W00 "5 drifts" → convergence "14" → "15" → "20". **Climbing every band; deferred W00→band-close→W33 (3×).** The W-close inventory's claim that verify-ci is "fail-OPEN exits 0" is itself FALSE (it exits 1, wired into CI). | **W33 — but wire NOW, not at the LAST wave** | The drift is structural because ci.yml is a HAND-MAINTAINED second source. CLEAN-BREAK: (a) `gates.mjs --emit-ci` codegen that WRITES the YAML step block from the ci-tagged set, with `proof:gen-ci-fresh` asserting the committed YAML byte-matches the regen (drift becomes IMPOSSIBLE, not merely detected); OR (b) collapse ci.yml to ONE step `gates.mjs --run ci`. Promote `gates:verify-ci` from RED-tolerated to fail-closed AND add it to the RELEASE set so a drifted ci.yml refuses to publish. A detector permitted to stay RED is a deferral with telemetry. |
| **E2** 🔴 | **`proof:styling-hygiene` + `proof:glass-card-tiers` are ci-tagged gates whose scripts DO NOT EXIST.** `npm run proof:styling-hygiene` crashes MODULE_NOT_FOUND. `proof:gate-script-parity` PASSES green only because the breach is hard-coded onto `KNOWN_DANGLING` and the gate was never added as a ci.yml STEP (two bugs cancel). The day someone "fixes" the E1 drift by mirroring all 20 gates, CI crashes hard. The deadlock is baked in. | MIA since AW.W20 / AW.W12 — 2 prior tranches, "owner-owed," never authored; the parity meta-gate that should force the fix AMNESTIES it. | **W33 / W41 — clean break, no amnesty** | Either WRITE the two scripts (the AW.W20/W12 owners) or DELETE the package.json registration + gates.mjs row + the KNOWN_DANGLING baseline entry. A "known-dangling baseline" surviving two tranches is a fail-OPEN in disguise; the precept is fail-EXPLICIT = FIX or DELETE, never perpetually allowlist. |

### CLASS F — the BOOK / ARCHIVE / NAMED-FORWARD re-label chronic (named, not closed)

| # | Chronic item | Slip-history (count) | AX receiver | Institutional fix |
|---|---|---|---|---|
| **F1** 🟠 | **Native-drawer / `GlassNativeDrawer` BOOK'd 6×.** The ≥2-consumer bar (the FORCING function for a build) was MET at AT ("≥2 firm: muster+speedtest") and the item was BOOK'd anyway, 5 tranches running. Between AU and AW the canonical ask FELL OFF the glass-ui ledger entirely (the AS ledger never carried the muster-K full spec). | AQ→AR→AS→AT→AU→AW→AX.W20 (now a "RATIFY-BEFORE-IMPL" arm that can still resolve to "BOOK again"). | **W20 (ratify-gate, ban a 7th BOOK)** | Remove the "BOOK again" exit. W20 either ships the `popover="manual"` + scroll-snap `GlassNativeDrawer` OR writes a refutation that DELETES the ask from every consumer's owe-ledger. `proof:disposition-live`: a BOOK / ARCHIVED-on-2-consumer-gate item may carry forward ONLY if a gate re-evaluates its named trigger each close — for ≥2-consumer triggers, grep the constellation and FAIL the close if the trigger is MET but the item is still BOOK'd. |
| **F2** 🟡 | **AN's ARCHIVED-on-2-consumer-gate dispositions (panel-host, interruptible reorder) are write-once-watch-never.** Across 9 tranches the realisation condition was NEVER re-evaluated. One item (reorder) now dies as COLLATERAL of an unrelated metric-stack prune — proving the ARCHIVE was never load-bearing. | AN.W5/W6 → AO…AW (never re-checked) → AX (margin notes only). | **W29 + the F1 `proof:disposition-live` gate** | Same gate as F1 — the disposition is FALSIFIABLE by a machine-checked trigger or it is forbidden. A prose realisation-condition no gate reads is a silent defer with paperwork. |
| **F3** 🟡 | **`proof:phantom-classes` pending-handoff runs RED for 4 tranches behind `PROOF_PHANTOM_ALLOW_PENDING=1`** against fourier-analysis — a repo with NO `@mkbabb/glass-ui` dependency at the probed path (per OMEGA's grep). Held green only by the runner-environment accident (repo absent on CI). | AO→AP→AR→AS, re-declared "consumer-domain not our defect" every tranche. | **W27a / W33** | Either the Q.W4 patch lands (close the RED) OR the gate's consumer-sweep excludes repos that don't import glass-ui (delete the RED). A 4-tranche escape-hatched RED is a deferral-with-telemetry, not a passing gate. |
| **F4** 🟡 | **`proof:webgl-golden` deferred whose named-trigger the PRIOR tranche asserted ALREADY-MET.** AT: "promote the EXISTING `profile-aurora.mjs` harness" (5-min rename). AU deferred it citing the ABSENCE of that harness. One of the two close-records is false about the mechanical state of the file. The blob shipped to AW visually-broken next tranche — the exact class a pixel-golden guards. | AT planned-to-promote → AU deferred-as-only-gate → AX un-promoted. | **W46 / W00** | Promote the existing harness onto the blob (W46 is the live blob BLOCKER) OR formally retire the gate name recording that `proof:substrate-paints-color` (AX.W00) subsumes it. A deferred gate whose trigger the prior tranche asserted already-met is a contradiction the close must resolve. |

### CLASS G — the structural / god-module / legacy-commentary chronic (gate blind + local-only)

| # | Chronic item | Slip-history (count) | AX receiver | Institutional fix |
|---|---|---|---|---|
| **G1** 🟠 | **4 TS/Vue god-modules OVER 500, 3 owned by NO carve wave.** Live: useMetaballRenderer 690, SegmentedTabs 683, GlassDock 534, constellationField 510. `proof:no-god-module` is STILL `.ts/.vue`-only (CSS-blind) AND `["local"]`-tagged (never in CI). 6 CSS god-modules invisible (tokens 1983, dock 1639, utilities 1154, glass 795, dock-controls 531, theme 514 — 2 of which crossed 500 into NO roster). Every owned target grew 7-22% past its doc count; W26's "sole TS violation" premise is now FOUR. | `.ts/.vue`-only + local-only since AV.W13; metaball grew 351→569→690 across AV→AW→AX with no CI pressure. W25a is the fix, `planned` since the charter, never run. | **W25a (extend gate to .css + CI) FIRST + W26/W06 FileBounds re-baseline** | Run W25a's `.css` extension + `["local","ci"]` promote FIRST in the band (gated behind nothing — W00 is complete). Re-baseline EVERY carve-roster line count against HEAD (replace every `eaba94f` count with live `wc -l`). Add the 3 unowned TS/Vue + 2 unowned CSS files to real FileBounds. Add `proof:no-god-module --rebaseline` that diffs the live roster against doc-recorded counts and FAILS if any is stale by >5% — makes "the carve plan is seeded at a stale base" a machine-caught condition. |
| **G2** 🟠 | **Legacy-commentary count DOUBLED 3→6 and the gate is `["local"]`-only.** Live: `api/index.ts:309`, `index.ts:127`, `index.ts:170` etc. NEW leaks from `complete` waves (W17 `api/index.ts:216`, W37 `api/index.ts:295/309`+`index.ts:170`) landed tranche-archaeology in the PRODUCTION barrel through CI unchallenged. The I-era `recovery-diary-scrub` CI guard scoped `src/` only and the leaks recur through the un-scoped door (demo SFCs, public barrels). | G/H/I (24→25 leaks, I "closed" with a scoped guard) → K/L carry → AX W58 (49 SFCs) + W27b (still planned). **Fourth sweep.** | **W27a (scrub all 6 + promote gate to ci/release) — run FIRST** | Scrub all 6 (not the 3 the doc names — undercounts by half). Promote `proof:no-legacy-commentary` to `["local","ci","release"]` BEFORE the next dock/blob wave or the count climbs to 8. Widen the I-era guard scope to demo SFCs + the public barrels (the un-scoped door). |
| **G3** 🟡 | **Doc-count drift (CLAUDE.md subpath/component numerals) absorbed-inline EVERY tranche, never structurally closed.** No gate fails on a stale count. 16 tranches caught it by hand; none made it un-recurrable. | I=4, J=2, K=7… Q (2 stale numerals) — immortal. | **W27a / W33** | A machine-checkable doc-count gate: assert CLAUDE.md/README subpath count == `package.json` exports count == dir count. The only structural way to stop the absorb-loop. |

### CLASS H — the close-never-runs / provenance chronic (the LAST wave is the FIRST risk)

| # | Chronic item | Slip-history (count) | AX receiver | Institutional fix |
|---|---|---|---|---|
| **H1** 🔴 | **W33 close machinery is 100% UN-STARTED + MIS-VERSIONED.** `proof-ax-final.mjs`, `FINAL.md`, `proof-carry-closure.mjs`, `proof-gate-fleet-registered.mjs`, `proof-prod-validation.mjs` all ABSENT at HEAD. The publish leg targets **3.8.0** which ALREADY SHIPPED — the close as-specced cannot cut a new version. `proof:au-final` points at `proof:av-final` which never existed (broken close-gate lineage). | AW close died on the session-limit halt (no `proof:aw-final`, no FINAL, no PROGRESS). AX W33 un-started + mis-versioned. **Slip 2 (AW never ran; AX un-started).** | **W33 — RE-VERSION 3.8.0→3.9.0 throughout + reconcile the dangling av-final lineage** | The close is the LAST thing and the thing most at risk of never running. Move the load-bearing gates (live-verified-ledger A1, carry-closure, no-orphaned-wave-claim B1) to NON-terminal waves. `proof:carry-closure` reconciles the dangling `av-final` reference, not just authors `ax-final`. |
| **H2** 🔴 | **The §16 receiver `CONSTELLATION.md` COLLIDES with an existing file.** W34's RED witness "CONSTELLATION.md does NOT exist" is FALSE — it exists as the W17→W30/W31 slides-adoption handoff. If W34 rewrites it, it clobbers a live cross-repo seam record; if it appends, the file contradicts its own title. Nobody owns the reconcile. AND W34's idiom census is STALE: 3 of 4 cross-repo handoffs (kf `file:`-link, E2 value-cap, getTimingFunction) already CLOSED at the publisher — re-authoring from the charter re-launders 3 closed handoffs as open born-RED carries. | The "phantom-owner re-defer" anti-pattern W33 is supposed to NAME, recurring on W33's own input. | **W34 amendment (RATIFY before driving)** | Adjudicate the collision IN WRITING: rename the W17 file to `CONSTELLATION-band-E.md` and author the §16 receiver as canonical, OR give the receiver a distinct name + re-point `proof:carry-closure`'s input path. RE-GROUND the census to the live PUBLISHED sibling state (kf 4.1.0, value 0.11.1) and DROP the 3 closed handoffs. A wave born-RED on a SATISFIED witness greens trivially and certifies nothing. |
| **H3** 🟠 | **Provenance: nothing enforces the tag sits on master.** `release.sh`/`release.yml` fire on any `v*` ref; neither asserts the tag is a master ancestor. 3.8.0 published from branch-tip (FF'd after the fact). MASTER-PLAN "resolved going forward" is a PROGRESS-vs-reality inflation — master is 3 commits behind HEAD now. | Latent, fires on every branch-tip cut + every time HEAD advances past the last merge. | **W41 / W33** | Add `git merge-base --is-ancestor $GITHUB_SHA origin/master` to release.yml + release.sh. A branch-tip tag fails the publish, forcing merge-then-tag. Closes the class structurally, not "resolved by FF luck." Re-merge `at-dock-convergence→master` + re-tag from master for 3.9.0. |
| **H4** 🟠 | **`proof:peer-conformance` is orphaned AND stale-pinned.** 0 hits in gates.mjs (runs NOWHERE), pinned `keyframes 4.0.0` while published is 4.1.0. Registering it as-is gates against a phantom version. The release-gate-unblock patch recurs at every cut after a quiet period (`f2fc614`, `e903c73`, `bb4e79b`). | W41 charter is half-stale; the gate is a dead scaffold + a live mis-pin. | **W41 (re-pin BEFORE registering)** | Re-pin `proof-peer-conformance.mjs:32` 4.0.0→4.1.0, strike the false "non-resolvable" prose, THEN register ci/release. Run a dry-cut PROTOTYPE (`gates.mjs --run release` on a clean tree) NOW so the inevitable release-pressure scramble becomes a calm pre-fix. A release is "ready" only on a captured GREEN `--run release`, not a passing `proof:all`. |

### CLASS I — the user-directive-contradicts-spec chronic (the ask keeps getting re-deferred)

| # | Chronic item | Slip-history (count) | AX receiver | Institutional fix |
|---|---|---|---|---|
| **I1** 🟠 | **The fourier SOTA "execute NOW" directive (the ONE bolded process directive in pass-3) is RE-DEFERRED to mid-tranche** behind a `planned` W14 that may excise WebGPU. A direct user-directive ↔ spec contradiction. | pass3:20,38 "pull up + execute NOW"; W43 spec re-defers it. | **W43 (pull up to Batch 1, as MASTER-PLAN already sequences)** | Honor the directive: execute W43 in Batch 1, decouple from the `planned` W14 WebGPU decision (FourierField.vue already exists at HEAD; the W60 fourier-hero is unblocked today). Record the decoupling as a clean break, not a silent re-defer. |
| **I2** 🟠 | **D1's "faster, smoother, springy" configurator ask slipped through TWO planning passes narrowed to the idiom half.** The user asked for SPEED+SPRING (pass-3); convergence D1.md captured only "not idiomatic"; W38 inherited only that. | pass-3 ask → D1.md (idiom only) → W38 (idiom only). 2 passes un-owned. | **W38 (re-broaden scope)** | Re-add the motion half to W38: the configurator/settings animate faster + springier on the governed `--spring-*` register. The user-ask-decomposition must be machine-checked against the wave that claims to own it (a `proof:user-ask-routed` clause: every pass-N defect id maps to a wave FileBounds that covers ALL its sub-asks). |
| **I3** 🟡 | **The dead WebGPU scaffold + `device.lost`-freeze-to-black** shipped through AW non-close AND 3.8.0 AND remains at AX HEAD; W14 (the named fix) is NOT-STARTED. A precept-banned dead scaffold + a real production bug, multi-tranche. | Dead since AW.W7c; the freeze bug born AW.W7b. | **W14 (decide: parity or EXCISE — clean break)** | Per the no-dead-scaffold precept: W14 either lands WebGPU painterly parity OR EXCISES `painterly.wgsl.ts`+`wake.wgsl.ts` and fixes the device-loss path. No third "keep the dead scaffold" state. |
| **I4** 🟡 | **D12 chassis-retire "REMOVE confirmed" is a 3-wave serial chain (W21→W28→W29) all `planned`, cross-repo-gated, at risk of slipping past the AX close.** | The `_DECISION.md` predates AX (AV/AW blocked on the ≥2-consumer wall); now AV→AW→AX. | **W28→W29 (sequence as a hard close predecessor)** | Name the chassis-retire as a close-blocking predecessor with the C2 consumer-staleness gate covering the 28 edit-sites, so the cross-repo prune cannot be "forgotten" at the close. |

### CLASS J — the capability-without-adoption chronic (the overfit inversion)

| # | Chronic item | Slip-history (count) | AX receiver | Institutional fix |
|---|---|---|---|---|
| **J1** 🟡 | **The ≥2-consumer bar was satisfiable by a DEMO STORY** — L wired DiscoGlyph/DockGroup/InstrumentChassis into demo stories to clear the floor; all re-opened at AX for actual retirement. Inversely, W45 shipped `#persistent`/`--dock-icon-glyph` capability the demo adopts on 1 dock — the SITES are on paper but the demand-side adoption is skipped (live-dead capability). | P silent-additions → K flagged → L demo-stuffed-close → AX retire. The bar never proved PRODUCTION load-bearing-ness. | **W19/W28/W29 + the overfitting-audit precept amendment** | Split the ≥2-consumer bar into PRODUCTION vs DEMO: a demo story does NOT count toward the floor; a primitive ships with ≥2 PRODUCTION consumers OR is retired. The demand-side mirror: a SHIPPED capability with <2 production adoption sites is a born-RED overfit candidate at the FINAL watch-list. |

---

## THE INSTITUTIONAL-FIX ROLL-UP (the "never again" gates, by leverage)

The whole ledger collapses to **8 institutional fixes** that, landed, close the recurrence CLASSES
permanently. Ordered by leverage (closes-the-most-chronics first):

1. **`proof:live-verified-ledger` as a W00-extension, run at every wave-landing commit, requiring an
   on-disk `.png`** (closes A1/A2/A3/A4/A5 + B1/B2 via the witness-clearance clause). The single
   highest-leverage move — it makes `live-verified` un-mintable without a fresh pixel, at AUTHORING
   time, by the actor who currently skips it. NOT at W33.
2. **`tsconfig.test.json` in typecheck + `proof:consumer-staleness` reverse cross-repo gate** (closes
   C1/C2/C4 + I4-sites). The strongest dead-ref detector pointed at the two trees the class lands in.
3. **Kill the ci.yml mirror — GENERATE it (`gates.mjs --emit-ci` + `proof:gen-ci-fresh`), put
   `verify-ci` in the RELEASE set** (closes E1; unblocks the green CI the publish needs). Drift
   becomes impossible, not merely detected.
4. **FIX-or-DELETE the dangling gates + a publish-readiness wave that drives CI GREEN before the
   3.9.0 tag** (closes E2/D1/H1/H4): write/delete styling-hygiene+glass-card-tiers, re-pin
   peer-conformance, the 8th conscious budget lift as the LAST pre-tag act with `proof:budget-gate-present`,
   re-version W33 to 3.9.0, master-ancestry guard.
5. **`proof:disposition-live` — a BOOK/ARCHIVE item carries forward ONLY if a gate re-evaluates its
   trigger each close** (closes F1/F2/F4; bans the 7th native-drawer BOOK). A prose realisation
   condition no gate reads is a silent defer with paperwork.
6. **Run W25a/W27a FIRST + re-baseline every carve roster against HEAD + a `--rebaseline >5%-stale`
   self-check** (closes G1/G2/G3). The structural debt grows faster than the close band absorbs it
   precisely because the carve is gated behind the waves that grow it.
7. **A `proof:user-ask-routed` clause: every pass-N defect id maps to a wave FileBounds covering ALL
   its sub-asks** (closes I1/I2; catches the directive↔spec contradictions). Plus adjudicate the
   H2 CONSTELLATION.md collision + re-ground W34/W35/W41 to live sibling state before they drive.
8. **Retire the `(DEVELOPED)` compound label + the re-label escape hatches (consumer-territory /
   permanent-archive / handoff)** (closes A5/F3): a deferral closes ONLY by doing it, deleting the
   artefact, or a PERMANENT-DEFER whose restoration-trigger a GATE asserts unreachable (not prose).

**The deeper "never again" principle for the FINAL:** the close precept must read — *no gate may be
satisfiable by a proxy of the thing it gates.* Every chronic in this ledger is one proxy: a static
attestation for a pixel, a section-marker for an image, a demo for a production consumer, a
`src+demo` sweep for `tests/`+siblings, a manifest the release never verifies, a wave-doc claim no
gate asserts against HEAD, a prose realisation-condition no gate re-reads. Make each gate
un-satisfiable by its proxy, land it at authoring time, own it on a non-terminal wave — and the
deferral-closure disease the corpus has carried since tranche C is cured, not renamed.

---

## VERIFICATION TRAIL (live at HEAD `89edffc`, 2026-06-09)

- `find docs/tranches/AX/audit -name "*.png"` → **0** (A2).
- `ls scripts/proof-{live-verified-ledger,no-orphaned-wave-claim,carry-closure,styling-hygiene,glass-card-tiers}.mjs` → **all No such file** (A1/B1/H1/E2).
- `ls -d src/components/custom/header-ribbon` → **exists** (B1, W19 orphan).
- `grep -n BouncyToggle tests/configurator-recursion.spec.ts` → `:49 import …; :268 h(BouncyToggle,…)` (C1, live dead import).
- `ls tsconfig.test.json` → **No such file** (C1, tests out of typecheck).
- `grep -c responsive-tabs package.json` → **0** (C2, subpath retired; 8 speedtest files armed to break).
- `node scripts/proof-no-god-module.mjs` → **4 OVER**: useMetaballRenderer 690, SegmentedTabs 683, GlassDock 534, constellationField 510 (G1).
- `node scripts/proof-no-legacy-commentary.mjs` → **FAIL**: `api/index.ts:309`, `index.ts:127`, `index.ts:170` (G2, 6 violations).
- `npm run gates:verify-ci` → exits 1, MISSING-from-ci.yml list (E1, 20-gate drift).
- `gh run list --branch master` (per CH-close-crossrepo) → 3× failure on `gates→profile:budget` 103.5% gzip (D1, CI RED on the release-tagged budget gate).
- Sources: `CHRONIC-defer-early.md`, `CHRONIC-defer-late.md`, `CHRONIC-miss-cardinal.md`, `CHRONIC-miss-consumer.md`, `CHRONIC-miss-release.md`, `CH-close-crossrepo.md`, `CH-structural.md`, `CH-foundational.md`, `CH-{dock,blob,glass-material,primitives,demo-ia,tabs-motion,aurora,misc}.md`.
