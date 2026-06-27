# BG-WS7 — Quality · Coverage · Close (SPEC pass 1 — CONVERGED)

> The close ORACLE must read **live paint**, the release TAG must **require** it, and **no deferred item may silently drop**. Build the no-silent-drop machine FIRST, then the live-paint gates, then the a11y/perf/Safari floors + the new-capability census, then the honest re-cut.

Branch `tranche/BG` @ `71e1c641`, src == 4.2.0 (`998136bb`). Every claim re-verified against this HEAD; the five prototype critiques are folded in place; the Safari headline decision is **REVERSED** (it reproduced the green-lie WS7 exists to kill — §0 + §G).

**Convergence status: pass 1 ≈ 73%.** P3 (routing) converges near-clean; P1 (spine) / P2 (probe) / P4 (ledger) converge to a hardened spec with every mustFix folded but three items remain **spec'd-not-build-proven** (the attestation trust-anchor, the predicate live-calibration, the forward-completeness derivation); P5 (Safari) was **falsified** and is re-written — its real-Safari arm is the dominant residual. See §RESIDUAL.

---

## §0 — HEAD GROUND-TRUTH (re-verified @ 71e1c641, with the pass-1 corrections)

| Claim under audit | Verified state @ 71e1c641 |
|---|---|
| `scripts/release.sh` exists | **EXISTS** (`-rwxr-xr-x`, 4134B) — runs `--run full` then `git tag`. The live-arm's home, NOT a net-new file. |
| `proof-ba-gestalt.mjs` BC pointers | **CONFIRMED** L70-73 `REFLECT_DIR/ROSTER/WAVES_DIR/TRANCHE_DIR = docs/tranches/BC/…`; `parseExpect` L205, `evalBand` L219. |
| `reflect-capture-verify.mjs::pngRegionStats` | **CONFIRMED** L251 → `{meanL, meanChroma, meanAlpha}`; `oklabFromRgb` L104 (exported); `surfaceHash` exported L47; `decodePngRgba` L156. |
| `liveArmCiGraceSkip()` | **CONFIRMED** `scripts/gate-output.mjs:89` == `Boolean(process.env.CI)` → exit-0 skip. The inversion target. |
| `useDockContextSilhouette.ts` (0 consumers) | **ABSENT** — already deleted. `proof:dock-context` (L269, release) guards a *missing* mechanism. |
| `useDockFission.ts` | **ABSENT**. `proof:dock-fission` (L209, release) guards a missing mechanism. |
| `useLiquidMorph.ts` + `liquid-morph.css` spike | **PRESENT** 462L + 850L — the live spike, 0 consumers. |
| `useHaptic.ts` published-yet-dead | **PRESENT** 138L; root-barrel + `/api` exports, 0 call-sites. |
| `useCelebrationBurst.ts` / `useBloomUp.ts` | **PRESENT** 261L / 507L. |
| `proof:celebration-burst` release-tagged | **FALSE** — `["local","ci"]`. |
| **The corpus counts the planning prose carried** | **ALL DRIFTING** — disk shows **BE 39 + BF 31 = 70** wave-specs (prose said 69), **AX = 32** rows (prose said 31), **BF DEFERRED-CENSUS = 32 D#** (D1–D32, confirmed). *This drift is the direct evidence for the P4 F0 mandate: counts MUST be DERIVED from disk, never transcribed.* |
| **The 5 release-tagged dead gate ids** | a hand-grep is AMBIGUOUS — both `proof:dock-contextual-layers` (L197) AND `proof:dock-context` (L269) are release-tagged, plus `proof:dock-fission` (L209), `proof:metaball-bridge2` (L233), `proof:bloom-up` (L1315), `proof:liquid-morph` (L1677). *The exact dead-release set MUST be DERIVED by parsing `gates.mjs` registrations+tags (P4 mustFix-2), never from a hand-authored array.* |
| BG ledger / BG reflect roster | **ABSENT** — `docs/tranches/BG/FOLD-LEDGER.*`, `docs/tranches/BG/audit/reflect/` do not exist. |
| `proof:de-shadcn` | script ON DISK, **UNREGISTERED** in gates.mjs + package.json. |
| `--run pi` in the tag path | **ABSENT** — `runPi()` (gates.mjs:2286) is a runner MODE, never in `gatesFor("full")`; release.sh + release.yml run `--run full` only. |

**The corrected dead-gate disposition:** `proof:dock-context`/`proof:dock-contextual-layers` and `proof:dock-fission` are release-tagged gates over **deleted** code — the spike-delete's gate-retire half never ran. A *worse* class than the live-spike, the cleanest spike-delete the ledger will record.

---

## MECHANISM

### A. The spine — how live paint blocks the tag when CI is GPU-less (Prototype 1 · 57% → folded)

The settled architecture (BB.W-CLOSE-BATTERY) is correct and NOT re-litigated: the close runs `gates.mjs --run full` siblings-absent in a fresh `/tmp` worktree before the irreversible tag, and `release.yml` re-runs `--run full` on GPU-less `ubuntu-latest` before `npm publish --provenance`. The single gap: **`--run full` is SOURCE+PAPERWORK; it contains zero live-pixel arm**, and `--run pi` cannot run on `ubuntu-latest` (no GPU).

**The validated load-bearing inversion (Prototype 1 confirmed):** the device-free CI gate is one property — it simply does **NOT** call `liveArmCiGraceSkip()`. That single omission flips *skip-is-pass → absence-is-fail* and severs the tag from a re-stamp/frozen/skip close. Cheap, device-free, proven end-to-end in the prototype.

But the prototype's attestation was **two self-set env vars + a self-asserted `status:'pass'` boolean** — theater a hand-write fakes. The six critique mustFix harden it into an attestation a forgery cannot pass:

```
┌─ PHASE 1 · the CLOSE MACHINE (a real Mac w/ GPU + a real WebKit) ──────────┐
│  scripts/release.sh  (existing ceremony, EXTENDED — sequencing in §A.5):    │
│   1. fresh /tmp worktree (siblings + precepts-submodule absent)             │
│   2. gates.mjs --run full              (the deduped union — unchanged)       │
│   3. gates.mjs --run ship   ← NEW live arm (serves BUILT dist, §A.4):        │
│        a. vite preview over the BUILT dist on :5199 (NOT the dev demo —      │
│           the dist carries the -webkit- prefix pair, §G mustFix-5)           │
│        b. --run pi   (the enrolled tests-visual specs, served-app sentinel)  │
│        c. the live-paint gates (routing / field / previews / uniform-blur)   │
│        d. proof:ba-gestalt FRESH IN-PROCESS: serve → screenshot the roster   │
│           routes AT HEAD → pixel-read in ONE process (NO committed PNGs)      │
│        e. the WebKit paint subset on the close machine's real WebKit         │
│           (glass plates · goo · lens) → a webkit verdict (§G)                │
│        f. for EACH roster surface compute the per-region pixel-stats DIGEST   │
│           {meanL, meanChroma, meanHue, edgeCastFraction, topBarStrip,        │
│            cornerClip, glassyByBleed} via pngRegionStats and EMBED it in     │
│           SHIP-ATTESTATION.json (the device-free re-verifiable evidence)     │
│   4. commit SHIP-ATTESTATION.json   (§A.5 ordering)                          │
│   5. release.sh re-runs --run full on the now-clean tree                     │
│   6. the user gate · git tag · push                                          │
└─────────────────────────────────────────────────────────────────────────────┘
┌─ PHASE 2 · release.yml CI (device-free provenance publish) ────────────────┐
│   gates.mjs --run full                                                       │
│   proof:ship-attestation  ← NEW release-tagged, device-free, NO grace-skip:  │
│     • SHIP-ATTESTATION.json EXISTS  (absent → RED, not skip)                 │
│     • recompute the DERIVED paint-source hash at HEAD === attestation hash   │
│     • RE-APPLY the BG predicates to the EMBEDDED pixel DIGEST (mustFix-1):    │
│         every surface's {meanHue, chromaCeiling, edgeCast, topBarStrip,      │
│         cornerClip, glassyByBleed} re-passes the SAME band grammar the live  │
│         arm used — status is RE-DERIVED here, never read as a boolean        │
│     • webkit.glass==pass AND webkit.goo==pass  (mustFix-6 / §G)              │
│     • authoredBy (git author/committer of the wave commit) ≠ runnerIdentity  │
│       (an orchestrator-injected token the wave process cannot write)         │
│     • the attestation path is NOT inside the DERIVED paint-source closure    │
│       (the self-reference guard, mustFix-5)                                   │
│   npm publish --provenance                                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**§A.1 · The embedded pixel DIGEST is the trust spine (mustFix-1 + mustFix-3).** `status:'pass'` is NEVER self-asserted. `--run ship` writes, per roster surface, the full pixel-stats digest (`meanL/meanChroma/meanHue/edgeCastFraction/topBarStrip/cornerClip/glassyByBleed` from `pngRegionStats`). `proof:ship-attestation` at CI **re-applies the BG predicate band grammar to that digest** and re-derives the verdict device-free. A forged JSON cannot carry digest numbers that pass the re-applied predicates without a real shoot — so a hand-written attestation that skipped serve+shoot REDs because its made-up numbers either fail the bands or fail the hash. This single mechanism is both mustFix-1 (re-verifiable evidence) AND mustFix-3 (`--run ship` absence is detectable at CI). The committed-PNG path is NOT retired until this digest path re-runs the predicates downstream (the critique's explicit retention bar).

**§A.2 · The trust anchor is DERIVED, not self-set (mustFix-2).** `authoredBy` is derived from the wave commit's git author/committer metadata (read at `--run ship` time, recorded). `runnerIdentity` binds to something the building agent cannot set — the orchestrator-injected close token (or, in Phase 2, the OIDC/sigstore identity `release.yml` already carries for `--provenance`). `proof:ship-attestation` REDs when `authoredBy === runnerIdentity`. A self-test bite proves a same-identity attestation REDs. If the orchestrator cannot inject a write-fenced token at build time, the field is DROPPED rather than shipped as an always-pass check (the critique's "theater or anchor" fork) — and that drop is itself a ledger row with a trigger.

**§A.3 · Content-hash, not commit-SHA (unchanged, validated).** An attestation committed in the to-be-tagged commit cannot record its own commit SHA; it binds to the **transitive paint-source hash** — the SAME `surfaceHash` derivation the roster freshness uses (ONE leaf, DRY). `proof:ship-attestation` recomputes that hash at HEAD; a drift means a paint source changed after the served run → RED. This is `surfaceHash` *elevated to a release precondition* and *inverted* (skip-at-release REDs).

**§A.4 · The ship arm serves the BUILT dist (mustFix-5 / §G).** `--run ship`'s `vite preview` serves the built `dist`, NOT the unprefixed dev demo, so the build-injected `-webkit-backdrop-filter` pair is the surface under test on the WebKit subset. Recorded in §G.

**§A.5 · The dirty-tree sequencing is SPECIFIED and proven (mustFix-4).** `--run ship` dirties the tree (writes `SHIP-ATTESTATION.json`); `release.sh` checks `git status --porcelain` clean before tag. The order is: `--run full` (clean) → `--run ship` (writes attestation) → **commit the attestation** → `release.sh` re-runs `--run full` on the now-clean tree → user gate → tag. A self-test proves the ordering does not deadlock (the attestation-write is followed by a commit that re-cleans the tree before the porcelain check). The spine is NOT "proven end-to-end" until this release.sh/release.yml wiring lands — it is a BUILD deliverable of this wave, not a deferred integration.

**§A.6 · The self-reference guard (mustFix-5).** A self-test bite asserts `SHIP-ATTESTATION.json`'s own path is NEVER inside any surface's DERIVED paint-source closure — so W-GESTALT-ROSTER-RE-POINT's per-route surface-path derivation cannot enroll a path that reaches the attestation and freeze its own hash (the chicken-and-egg).

### B. The probe vocabulary — reading the defects, one decoder leaf (Prototype 2 · 44% → folded)

`reflect-capture-verify.mjs::pngRegionStats` today returns `{meanL, meanChroma, meanAlpha}` over one fractional box — a warm-cream-vs-grey test. It cannot express a single BG defect. **The prototype's decoder math is validated-good** — pure, single-source (`oklabFromRgb` L104, `decodePngRgba` L156, no new color-math), and the "no parser change needed" correction is verified-correct: `parseExpect` keys on `^(\w+)` and `evalBand` reads `stats[p.key]` generically, so the band grammar already accepts `meanHue`/`edgeCastFraction`/etc. Extend the ONE decoder with five structural predicates + the routing predicate:

| Predicate | Math | Catches | Target / band |
|---|---|---|---|
| `meanHue=lo..hi` | OKLab `atan2(b,a)` degrees | metallic / red / violet cast | warm-amber **40–95°** (foreground 56–68°, aurora warmFieldHue [25,95]); dark top-bar `--primary` H318° REDs |
| `chromaCeiling<=v` | `hypot(a,b)` upper bound | over-saturated cast (the missing bound) | page-FIELD region ≈ **0.08–0.10**; metallic radials 0.115–0.155 REDs |
| `edgeCastFraction` | thin band OUTSIDE a plate's bbox vs body, fraction of pixels with the R≫G≈B≈0 signature | `--cartoon-ink` red drop-shadow `rgb(49,0,0)` gamut-clip | clean < 0.02; the synthetic `rgb(49,0,0)` cast reads 1.0 |
| `topBarStrip` | y=0..3px content-width strip coverage | the `.demo-scroll-progress` invalid-`scroll()` full-width hairline | terminal `scaleX(0)` < 0.05; a full-width line reads 1.0 |
| `cornerClip` | sample at the rounded corner | the dock pill / card un-clipped corner wedge | corner reads FIELD, not an opaque rect / saturated wedge |
| `glassyByBleed` | variance/structure over a known-busy backdrop | "warm-TRANSLUCENT" un-testable via α (always 1 on opaque screenshots) | busy backdrop structure bleeds through, NOT an alpha test |

**§B.1 · The 11/11 synthetic self-test bites PASS (validated).** Every predicate fires on a known violator AND passes a clean control: `meanHue` REDS maroon H23.7°/teal H195° while the grey-floor passes; `chromaCeiling` REDS C0.152; `edgeCast` fraction 1.0 on `rgb(49,0,0)` vs <0.02 clean; `topBarStrip` 1.0 full-width vs <0.05. Each predicate ships its born-RED self-test bite (synthetic red-cast / metallic / top-bar / hard-rect PNG MUST RED).

**§B.2 · The unconverged frontier — born-RED on REAL 4.2.0 paint, not synthetic (mustFix / OPEN RISK #2).** The prototype proved the predicates fire on *synthetic* violators. The binding deliverable is the **falsification against actual live 4.2.0 screenshots**: serve the 4.2.0 dist, capture the dock/field/shell/routing surfaces, pixel-read them, and confirm the real numbers cross the bands (`--cartoon-ink` rgb(49,0,0) at the dock edge; the metallic field C 0.115–0.155 > 0.10 ceiling; foreground H 56–68°; the top-bar strip present). If a real screenshot's red cast does NOT exceed the chroma ceiling, or the hue math is mis-calibrated against real pixels, the gate is theater — so the bands are CALIBRATED from the live read, not hand-set. This live-calibration is the W-PAINT-IS-THE-GATE build's acceptance bar and the largest single residual on this wave (pass-2).

### C. The roster — BG-dated + surface-paths DERIVED (end self-certification · Prototype 2+6)

Re-point `proof-ba-gestalt.mjs:70-73` BC→BG and mint `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` enumerating every shipped 4.2.0 surface (dock cast · V↔H morph · page field/aurora · category landing previews · scroll-shrink card · configurator drawer · hero · routing). The decisive change: **surface-paths are DERIVED from each route's transitive paint-source set** (walk the router → SFC `<script>/<template>/<style>` imports → the `@import` CSS graph → the shader leaves), **not author-declared**. A route file *outside* a surface's declared surface-paths **REDs**. This closes the self-cert hole that made `paper.css` (the metallic field), `AppShell.vue`/`router.ts` (routing freeze), and `SectionLanding.vue` (dead previews) invisible to G7 auto-revoke — and kills the absurd current scope where `aurora` hashes `src/subpaths/aurora.ts` (a 1-line `export *` barrel) and `dock` hashes the `dock.css` `@import`-root (byte-stable when `dock/morph.css` changes). The committed-PNG roster path is **RETIRED** (clean break — the live in-process capture is the only path) **once §A.1's digest re-applies the predicates downstream** (the retention bar). The derivation leaf is shared with §A.6's self-reference guard (the attestation path is excluded from the closure).

### D. The no-silent-drop machine — Band-0 wave-1, built FIRST (Prototype 4 · 55% → folded)

**The prototype is verified-honest** (worktree `wf_c3a025d6-d56-13`, GREEN bare + 8/8 self-test bites flag, claims true; the source corpora exist with the claimed shapes). The transpose is clean: cloning `proof-bc-fold-ledger.mjs`'s `runChecks(loaded-objects)` shape made the 8-bite self-test trivial, and the five corpus shapes collapse to one schema because disposition-vocabulary normalization is an AUTHORING concern. **But the prototype seeded 5 rows against a ~134-item corpus and called the gap "execution scale" — the critique's load-bearing reject of that framing.** The forward-completeness clause is the design element, not a row-population chore. Clone into `proof-bg-deferred-ledger.mjs` over `docs/tranches/BG/FOLD-LEDGER.{json,md}`, each row carrying a **DECIDED disposition** ∈ `{BUILD, RETIRE, MET, HELD, SUPERSEDED}`:

- every **BF DEFERRED-CENSUS** D1–D32 row,
- every **AX DISPOSITION-REGISTER** row (DERIVED count — disk shows 32, prose said 31),
- every **in-src book** (the `CONSUME(`/`BOOKED:`/`successor` markers across `src/`),
- every **BE.W-\*** + **BF.W-\*** wave-id (DERIVED count — disk shows 70, prose said 69) with a **per-wave parity clause**: a LANDED row names NO build wave (it is the shipped surface a paint wave re-verifies — re-running its stale born-RED spec is forbidden, it would re-mint a shipped engine); a NEVER-BUILT row names a real BG wave or RETIRE.

**Gate clauses** (`["local","ci","release"]`):
- **F0 · forward corpus-completeness (mustFix-1, THE load-bearing addition).** DERIVE the expected id-set from the live on-disk corpora — `bfCensusIds()` over `BF/audit/DEFERRED-CENSUS.md`, `axRegisterIds()` over `AX/audit/DISPOSITION-REGISTER.json`, `waveSpecExists()` walked over every `BE/waves/*.md` + `BF/waves/*.md`, **plus the grep-derived in-src discovery pass** (mustFix-3: scan `src/` for `CONSUME(`/`BOOKED:`/`successor` markers, each hit a REQUIRED row). RED if any derived id has no ledger row. `expectedCount` is a DERIVED invariant (`= |derived corpus|`), NEVER a hand-authored number. Without F0 a 5-of-134 ledger greens and the no-silent-drop guarantee is theater.
- **F1** doc⟷JSON completeness+count · **F1b** band/source DERIVED from the on-disk header not transcribed; **the IN-SRC `sourceRef` is `file#marker-text` (grep the marker presence), NOT `file:LINE`** (mustFix-4 — line numbers drift; a `file:LINE` anchor false-REDs on unrelated edits).
- **F2** decided-destination soundness (a `resolvedBy` naming no real `docs/tranches/BG/waves/<id>.md` REDs — the phantom-dest floor).
- **F3** no-undecided / no-`book` / no-re-stamp-only.
- **F4** HELD needs rationale+trigger.
- **F5** requirement-traceability (exactly one row per source item).
- **F6 · the meta-clause (mustFix-2).** No `release`-tagged gate may lock a <2-live-consumer src mechanism — and **the gate→symbol map is DERIVED by parsing `gates.mjs` registrations+tags**, NOT a hand-authored `releaseGateMechanisms` array. Enroll and check ALL real dead release gates the parse finds (dock-fission · dock-context/dock-contextual-layers · bloom-up · liquid-morph · metaball-bridge2 — §0 records the ambiguity the parse resolves). A dead gate must not be hideable by omission from a self-declared list.
- **F7** self-test bites (the 8 validated + new bites for F0 corpus-derivation and F6 gate-parse).

This is the literal cure for D11 (the disposition machine deferred a 4th time) and it must NOT itself defer. The "execution scale" framing is RETIRED: F0 IS the wave.

### E. The dead-mechanism reckoning — atomic delete+gate-retire, decide-don't-rebook

Per J-inv-10 (substrate ships with ≥2 consumers or is RETIRED-with-rationale) and BB.W-NDA-DECIDE (decide build/retire/meet, never re-book). **Each mechanism delete and its gate-retire are ONE atomic diff** (a delete that reds its own gate is forbidden; a gate-retire that orphans nothing is forbidden):

- **Pure-dead, no other workstream needs it → DELETE clean:** `useLiquidMorph.ts` (462L) + `liquid-morph.css` (850L demo-content mis-placed in `src/styles/`); the dead-token pins (`--corner-k-soft/-sharp`, `--corner-shape-card/-pill`, the 3 `--spring-timeline-*` CSS twins, all 0 `var()` reads) + the `proof:squircle-language`/`proof:no-dead-token` clauses pinning them; the `selectableChipVariants.ts` alias shim (a self-admitted back-compat rename the no-legacy law forbids).
- **Gate-over-ABSENT mechanism → DELETE the gate:** the `dock-context`/`dock-fission` registrations (their engines are already gone — §0); the exact set is the F6 gate-parse output.
- **Landed-but-unwired → DECIDE wire-or-retire (NEVER blind-delete — risk #6):** `useHaptic` (published-yet-dead → RETIRE, drop the root-barrel + `/api` exports); `useCelebrationBurst` (0 call-sites → wire to ≥2 OR fold into CompletionSeal); `useBloomUp` / `metaball-bridge` (WS2/WS6 compose the fission/bloom/goo LOOP SHAPE, box-inviolate → the ledger records the wiring wave; the gate moves off `release` until the consumer lands). The 4-engine ElementMorph+`springTimingFunction` DRY collapse (`useBloomUp`/`useLiquidReveal`/`useDockCtaReceive`/`useLiquidMorph` re-fork the rAF loop while the published kf `flipShared` is imported-and-never-called) is recorded as a **DECIDED ledger disposition** pointing at a coordinated FLIP-ONE wave — WS7 names the gestalt, it does not unilaterally rewrite engines WS2/WS6 are actively building on (risk #6).
- **The meta-gate (F6 above):** a SOURCE-PRESENCE assert over a symbol with <2 live `(`-call-sites (real call-sites, NOT keyword greps — the phantom-evidence class) on a `release` gate REDs.
- **`proof:de-shadcn`** (authored-but-unregistered): a ledger row → register-or-delete, destination WS4/WS10. WS7 only floors the disposition.

### F. The AX register re-stamp (Prototype 4 rider)

Flip the BC-stamped rows to `"BG"` **in place** (no delete — L-inv-8; the DERIVED count drives the loop, not a hand number), re-evaluate every `min-consumers n:2` trigger against the present constellation, graduate any that crossed ≥2, verify the 2 pending flips (`css-relative-color`→BB.W-DARK-INK-WARM landed; `styles-critical-split`→BC.W-CSS-CRITICAL). A re-stamp-WITHOUT-decide REDs (the BB.W-NDA-DECIDE terminal-lock). The genuine republish/Baseline-gated DEFERs (kf snap/Oscillator, value.js `/color`, deep-glass-20px, lens-chroma, concentric-radius) carry by-name with a trigger — foreign-tree fence, no speculative build.

### G. Safari parity — a tag precondition, the lens decision REVERSED (Prototype 5 · 38% → FALSIFIED, re-written)

**THE HEADLINE DECISION WAS FALSIFIED.** Prototype 5 claimed "WebKit 26.4 reports `CSS.supports → TRUE`, APPLIES the full lens, bug 245510 appears FIXED in Safari / directive satisfied." This is **the exact green-lie WS7 exists to kill, reproduced at the gate built to kill it.** The ground truth (authoritative WebKit tracker, 2026-06-12): **bug 245510 is OPEN (status NEW, Safari-broken).** Playwright's bundled WebKit is a WebKit-trunk **non-Apple-backend** build (Playwright #31017) that diverges from real Safari on exactly `backdrop-filter` / `var()` / SVG-filter — so its `CSS.supports → TRUE` is the **proxy bug**, not a Safari fact. Every "renders equivalent to Chromium / appears FIXED / directive satisfied" claim is **DELETED**.

The corrected Safari mechanism (the seven mustFix folded):

- **G.1 · Playwright WebKit is a PROXY, not Safari (mustFix-2).** Scope the `webkit` Playwright project to its established role: **CI wiring + no-flash + WebGL-degrade proxy** (the existing `safari-webgl.spec` split). It MUST NOT certify the lens-redesign decision or the C-SAFARI directive. The proto's infra (it renders the full stack on Mac/Metal — glass plates, WebGL2 goo, WebGL2 aurora — clean console) is real and reusable for THIS scoped role.
- **G.2 · The REAL-Safari render arm (mustFix-3, the binding truth).** Add a real-Safari arm on the Mac close machine — `safaridriver`/WebDriver against real Safari 26, OR a documented manual real-Safari capture — for the BINDING `backdrop-filter` / glass / lens truth. A Playwright `webkit` project **cannot drive real Safari**. Without this arm, `proof:safari-parity` is structurally a proxy gate and cannot be a tag precondition. This arm runs INSIDE the Phase-1 ship arm (§A.e) and writes the `webkit:{glass, goo, lens}` verdict into `SHIP-ATTESTATION.json`; `proof:ship-attestation` requires `webkit.glass==pass AND webkit.goo==pass` (mustFix-6 / §A.2). **This real-Safari arm is the dominant pass-1 residual** (can safaridriver run deterministically in the close ceremony? — build-prove in pass 2).
- **G.3 · The base-glass blast radius on REAL Safari (mustFix-4).** The whole ladder is `backdrop-filter: var(--glass-blur-*)` and MDN compat #25914 says real Safari 18 cannot resolve CSS variables in `-webkit-backdrop-filter`. **Assert every `.glass-*` tier paints a non-`none`, blur-bearing computed `backdrop-filter` on real Safari** (the `toMatch(/blur\(/)` structural assert — run on real Safari, not the proxy). If it fails, that is a **WS3 glass fix** (resolve `var()` to a literal in the shipped `-webkit-` arm), recorded as a ledger row — NOT something this gate waves through.
- **G.4 · Serve the BUILT dist (mustFix-5 / §A.4).** The ship arm serves `vite preview` over the BUILT dist (which carries the build-injected `-webkit-backdrop-filter` pair), NOT the unprefixed dev demo, so the Safari-prefix path is the surface under test. Recorded here AND in §A.4.
- **G.5 · The lens 'non-broken' assertion is STRUCTURAL, not luminance (mustFix-6).** A `backdrop-filter` computing to `none` (the DDR-LENS-BAKE silent-vanish) or a plate that lost its blur reads as the backdrop and would PASS a `meanLum/stdev` band (the prototype's own learning: stdev can't distinguish clean-blur from no-plate). The lens test asserts the computed `backdrop-filter` **contains `blur(` on BOTH paths** (and `url(` on the supporting path) — a structural computed-value check.
- **G.6 · The lens DECISION, reversed (mustFix-1).** `.glass-lens` uses `backdrop-filter: url(#glass-refract)`, `@supports`-gated. On REAL Safari `CSS.supports('backdrop-filter','url(#…)')` returns FALSE (bug 245510 OPEN), so the lens **degrades to plain blur** — the `@supports` base is intact (G.5 asserts `blur(` paints). The DECISION: **lens-degrades-on-Safari = accepted enhancement-not-fallback**, documented as a binding constraint in `CONSTRAINTS.md` (§H). This is NOT "no fallback violated" — the directive's "no fallbacks" bar is met by the base glass + goo painting fully; the *refraction enhancement* degrading gracefully on an engine that cannot support `backdrop-filter:url()` is the Newly-Available + feature-detect discipline, not a fallback. The goo metaball is provably WebKit-safe (`GooFilter` uses regular `filter:url()`, not `backdrop-filter:url()`).
- **G.7 · The SOURCE predicates (the config-scan arm, kept):** every `filter:url()`/`backdrop-filter:url()` is regular `filter:url()` OR `@supports`-gated with a non-goo floor; every 0-alpha gradient stop is explicit `oklch(L C H / 0)` (WebKit premultiply-toward-black); the route transition is engine-agnostic CSS, NOT `startViewTransition`; the squircle has a `clip-path` floor under `@supports not (corner-shape:…)`; `light-dark()` carries no inset-shadow fragment; goo rides WebGPU (Safari 26) or the WebGL2 fallback; no context-lost flash on background→foreground+resize.

**G.8 · Do NOT let "directive satisfied" propagate into BG.W-CUT (mustFix-7).** The falsified headline is quarantined: the CUT requires the real-Safari `webkit.glass==pass AND webkit.goo==pass` verdict from G.2, with the lens recorded as enhancement-degrades-gracefully (G.6) — never a Playwright-WebKit "appears FIXED."

### H. The constraint manifest + lighthouse re-pin

Mint `docs/tranches/BG/CONSTRAINTS.md` enumerating the six binding cross-engine constraints (PRM fade-keeps/transform-drops · ONE-live-GL-per-route + offscreen-park + no forever-CSS-compositor-layer · **the Safari fence set incl. the G.6 lens-degrades-gracefully decision + the G.3 var()-in-`-webkit-backdrop-filter` constraint** · CLS≈0 / no-layout-animation · focus-trap-via-FocusScope+inert+Esc-on-focusable / roving-tabindex / 44px coarse floor / presentational-dock-root · warm-chroma-floor / no-gray / no-red-ink) + the iOS-26 numeric ceilings (blur ≤40px mobile/≤60px desktop, ≤4 compositing layers/route, one-primary-glass-sheet-per-view, specular ≤6px, 4.5:1 after the adaptive darken). Machine-lock via `proof:constraint-manifest` reading the LIVE resolved tokens — a token drift past a ceiling REDs. Re-pin `scripts/lighthouse/floor.baseline.json` via `--rebaseline` **ONLY after the WS1–WS6 fixes land** (re-pin at the achieved number, never a lowered bar) and promote `proof:lighthouse` into the ship arm so perf gates the tag.

### I. The new-capability census — build-or-defer, decided not forgotten

`docs/tranches/BG/audit/DS-COMPLETENESS-census.md` carries a build-or-defer verdict per candidate against the ≥2-consumer bar:

- **BG.W-DATE-CALENDAR** — reka-ui ships the full headless Calendar/DatePicker/DateField/RangeCalendar set (dep `@internationalized/date`); the glass-skin wrap is the existing shadcn-pattern, fork-free. Verdict **BUILD-IF-CONSUMER else DEFER-with-trigger** (the iOS roll-wheel reuses `useDragMorph` spring-snap detent).
- **BG.W-CHART-FAMILY** — reka ships no charts; a line/bar/area family is heavy net-new SVG against the no-runtime-dep identity; data-viz is already covered by the procedural suite + MetricStack/InstrumentChassis + the `--chart-*` phase-bus; zero constellation consumer at HEAD. Verdict **DEFER-with-trigger** (record the verdict; do not speculatively build).
- **BG.W-DS-COMPLETE** — the meta-census: Kbd/Breadcrumb/Stepper/TreeView/AspectRatio earn keep-candidacy; Resizable/ScrollArea/FileUpload/Rating/Menubar/OTP/Pagination(retired) CENSUSED build-or-defer, each with recorded rationale (J-inv-10 no-speculative-substrate). NOT a build mandate — the artifact is the verdict, and every verdict is a FOLD-LEDGER row.

---

## FILES TOUCHED

**New:**
- `scripts/proof-bg-deferred-ledger.mjs` (F0–F7 incl. the forward-completeness + gate-parse + in-src grep), `docs/tranches/BG/FOLD-LEDGER.{json,md}`
- `scripts/proof-ship-attestation.mjs` (re-applies the embedded digest predicates + hash + webkit verdict + author≠runner + self-reference guard), the `--run ship` dispatch in `scripts/gates.mjs`
- `scripts/proof-route-navigates.mjs`, `tests-visual/route-navigates.spec.ts`
- `scripts/proof-field-aurora.mjs`, `scripts/proof-previews-render.mjs`, `scripts/proof-uniform-blur.mjs` (+ their `tests-visual/*.spec.ts` live π)
- `docs/tranches/BG/audit/reflect/bg-gestalt-roster.md` + the per-surface `.md` headers
- `scripts/proof-constraint-manifest.mjs`, `docs/tranches/BG/CONSTRAINTS.md`
- `scripts/proof-safari-parity.mjs` (the SOURCE-scan arm), the real-Safari close-machine arm (safaridriver/WebDriver), the SCOPED-proxy webkit specs
- `docs/tranches/BG/audit/DS-COMPLETENESS-census.md`
- `docs/tranches/BG/waves/BG.W-*.md` (one per wave)

**Modified:**
- `scripts/reflect-capture-verify.mjs` (the predicate vocabulary — ONE decoder leaf; the digest emitter for §A.1)
- `scripts/proof-ba-gestalt.mjs` (BC→BG re-point, DERIVED surface-paths, live in-process capture, the new predicates; the committed-PNG path retired ONLY after the §A.1 digest re-applies downstream)
- `scripts/release.sh` (the `--run ship` step + the §A.5 attestation-commit sequencing before the tag), `.github/workflows/release.yml` (the `proof:ship-attestation` step before publish)
- `scripts/gates.mjs` (register the new gates; dead-gate downgrade/delete per the F6 parse; `--run ship`)
- `scripts/gate-output.mjs` (the ship-attestation gate deliberately does NOT import `liveArmCiGraceSkip` — the inversion)
- `package.json` (the new `proof:*` scripts; register `proof:de-shadcn` IF the WS4/WS10 disposition is register)
- `scripts/lighthouse/floor.baseline.json` (`--rebaseline` post-fix), `proof:lighthouse` tag promotion
- `docs/tranches/AX/audit/DISPOSITION-REGISTER.json` (re-stamp in place, DERIVED-count-driven)
- `tests-visual/playwright.config.ts` (webkit testMatch SCOPED to the proxy role)

**Deleted (clean break, registry-probed):**
- `src/composables/motion/useLiquidMorph.ts`, `src/styles/glass/liquid-morph.css`
- `src/components/custom/selectable-chip/selectableChipVariants.ts` (alias shim)
- the dead tokens in `radius.css`/`scheme-spring.css` + their pinning gate clauses
- the dead-engine gate registrations the F6 parse identifies (engines already gone)
- `CLAUDE.md` — drop the `useHaptic` exports if RETIRED; reconcile the per-mechanism notes; the no-god-module ratchet claim made true again

---

## THE BG.W-* WAVE BREAKDOWN

**Band 0 — the no-silent-drop machine (zero-pixel, FIRST):**
- **BG.W-DEFERRED-LEDGER** — `BG/FOLD-LEDGER.{json,md}` + `proof:bg-deferred-ledger` (**F0 forward-completeness DERIVED + F1–F7**), seeded from the BF census + AX register + in-src grep + BE/BF wave-specs. The 4th-drop guard. `expectedCount` is a DERIVED invariant. *(Prototype 4, hardened: F0 is the wave, not a row-population chore.)*
- **BG.W-BE-BF-LEDGER** — the 70-wave (DERIVED) parity rider (LANDED-names-no-build / NEVER-BUILT-names-a-wave-or-RETIRE; re-running a LANDED spec forbidden).
- **BG.W-DISPOSITION-RESTAMP** — the BC-stamped AX rows BC→BG in place (DERIVED-count loop), every n:2 trigger re-evaluated, the 2 pending flips verified; re-stamp-without-decide REDs.

**Band 1 — the dead-mechanism reckoning (atomic delete+gate-retire pairs, BEFORE the oracle re-points):**
- **BG.W-SPIKE-DELETE** — delete `useLiquidMorph.ts` + `liquid-morph.css` + the alias shim + the dead tokens + their pin-clauses; un-grandfather the no-god-module ratchet; the engine delete and its gate-retire in ONE diff.
- **BG.W-JUBILANCE-DECIDE** — RETIRE `useHaptic` (drop exports); DECIDE `useCelebrationBurst` (wire-≥2 or fold into CompletionSeal); record the FLIP-ONE DRY collapse as a coordinated disposition; NEVER blind-delete a WS2/WS6-needed engine.
- **BG.W-DEAD-GATE-SWEEP** — **the F6 gate→symbol map DERIVED by parsing gates.mjs** downgrades the release-tagged dead gates off `release` until a real ≥2-consumer binding π exists; delete the gate-over-absent registrations; harden the phantom-consumer-evidence class (real `(`-call-sites, not greps); register-or-delete `proof:de-shadcn`; fix the 3 stale scripts (viz-dotflow over-broad grep, concentric rename, handmark CLAUDE.md-in-flux dependency).

**Band 2 — the live-paint oracle (born-RED on 4.2.0):**
- **BG.W-PAINT-IS-THE-GATE** *(umbrella)* — the predicate vocabulary in `reflect-capture-verify.mjs` (hue/chromaCeiling/edge/top-bar/corner-clip/bleed) + self-test bites + **the live-calibration born-RED against actual 4.2.0 captures** (§B.2, the acceptance bar). *(Prototype 2, validated math; live-read residual.)*
- **BG.W-GESTALT-ROSTER-RE-POINT** *(≡ W-GESTALT-REPOINT)* — BC→BG re-point, BG-dated roster, DERIVED surface-paths (+ the §A.6 self-reference exclusion), born-RED, retire the committed-PNG path after the §A.1 digest re-applies downstream. *(Prototype 2 + 6.)*
- **BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION** — `--run ship` + `SHIP-ATTESTATION.json` (**embedded pixel digest, §A.1**) + `proof:ship-attestation` (**re-applies the digest predicates + hash + webkit verdict + author≠runner anchor + self-reference guard**) + the skip-REDs inversion; **the §A.5 dirty-tree sequencing wired + proven**; reconcile `release.sh`/`release.yml`. *(Prototype 1 — the spine; the 6 mustFix folded.)*
- **BG.W-GATE-ROUTING-LIVE** — `proof:route-navigates` (CI-headless DOM, `release`-tagged): ≥6 cross-category hops, old-gone + single-child `<main>` + new-heading. **Folded:** heading detector restricted to `h1, h2, .story-hero-title` (not blanket `[data-testid]`); **poll-for-stability** (no fixed 1800/500ms — wait until `.fade-slide-enter/leave-active` count==0 AND articleCount stable across N reads); nav primitive hardened (route-table-derived hop targets + SidebarDock RouterLink-click fallback, distinguishing dispatch-failure from genuine-no-nav); the self-test bite extended to the hop-assertion (a `page.setContent` stranded-heading fixture MUST flag oldGone, a clean-detach fixture MUST pass); `reducedMotion:'no-preference'` pinned explicitly. **The release-teeth are BLOCKED-ON BG.W-SHIP-DISCIPLINE** (the served-demo provisioning is the spine's; without it this gate SKIPs on CI). *(Prototype 3 · 82% — confirmed: hop1=2, hop2+=3 articles permanently; the FIRST TWO routes strand.)*
- **BG.W-GATE-FIELD-AURORA** — field reads warm-amber ≤ chroma-ceiling (no metallic/conic/red); SOURCE arm retires `paper.css` conic/feTurbulence onto one shared offscreen-paused shell aurora.
- **BG.W-GATE-PREVIEWS-RENDER** — every category landing card paints content-bearing live variance (no frozen still).
- **BG.W-GATE-UNIFORM-BLUR** — region-pHash/variance across dock==card==button backdrop-filter (a half-blurred plate the mean misses REDs).

**Band 3 — a11y / perf / Safari floors:**
- **BG.W-SAFARI-PARITY-GATE** — **the real-Safari close-machine arm (G.2) is the binding truth; the Playwright webkit project SCOPED to proxy (G.1)**; base-glass `var()`-in-`-webkit-backdrop-filter` structural assert on real Safari (G.3); BUILT-dist serve (G.4); structural lens-`blur(`-on-both-paths assert (G.5); **the lens DECISION reversed — degrades-gracefully = enhancement-not-fallback, documented (G.6)**; the webkit verdict in the attestation. *(Prototype 5 · 38% FALSIFIED — re-written; the dominant residual.)*
- **BG.W-CONSTRAINT-MANIFEST** — `CONSTRAINTS.md` (incl. the G.6 lens decision + G.3 var() constraint) + `proof:constraint-manifest` over live tokens; the iOS-26 ceilings; lighthouse re-pin + tag promotion.

**Band 4 — new-capability census:**
- **BG.W-DATE-CALENDAR** — verdict BUILD-IF-CONSUMER else DEFER-with-trigger (a FOLD-LEDGER row).
- **BG.W-CHART-FAMILY** — verdict DEFER-with-trigger (a FOLD-LEDGER row).
- **BG.W-DS-COMPLETE** — the census artifact with per-family verdict, each a FOLD-LEDGER row.

**Band 5 — the honest re-cut (LAST):**
- **BG.W-CUT** *(supersedes BE/BF.W-CUT — the 4.2.0 cut they gated shipped broken)* — the tag fires only after the ship arm passes against the served BUILT-dist demo over the BG roster with the widened predicates, run siblings-AND-precepts-submodule-absent, with the FOLD-LEDGER F0 witness + the **real-Safari `webkit.glass/goo==pass` verdict (G.2/G.8, never the Playwright-WebKit "appears FIXED")** + the user gate.

---

## THE ACCEPTANCE / REAL-PAINT-π BAR

**Born-RED on the shipped 4.2.0 tree (MUST fail the current broken UX — against ACTUAL live captures, §B.2):**
- `proof:ba-gestalt` FAILS over the live-captured dock (red cast > chroma ceiling, edge-cast detected), field (metallic hue/chroma > ceiling), shell (top-bar strip present), routing (article count ≠ 1) — the bands CALIBRATED from the live read, not synthetic.
- `proof:route-navigates` FAILS (old `<article>` coexists; hop1=2, hop2+=3 articles permanently — the confirmed real defect).
- `proof:bg-deferred-ledger` FAILS (the **DERIVED** corpus is UN-DECIDED until each row lands; a 5-of-N ledger REDs via F0).
- `proof:ship-attestation` FAILS (no served run / no fresh attestation / digest predicates fail / webkit verdict absent).
- `proof:safari-parity` paints the **REAL-Safari** surface and reports the lens verdict as degrades-gracefully (NOT "fixed").

**GREEN only when** routing navigates · field paints warm aurora ≤ ceiling · previews render live · cast/strip/clip are gone · hero paints · every DERIVED deferred item is DECIDED · every release gate (DERIVED from the gate-parse) locks a ≥2-consumer mechanism · **real Safari** paints glass+goo (lens degrades-gracefully, documented) · the constraint manifest holds · lighthouse re-pinned at the achieved number.

**The binding π is the IN-PROCESS served BUILT-dist capture at HEAD**, produced by the reproduction the building agent did not author, with the per-region pixel DIGEST embedded in `SHIP-ATTESTATION.json` and re-verified device-free at CI by re-applying the band grammar. The committed-PNG path is retired once that downstream re-application lands.

---

## FOLDED DEFERRED ITEMS (the ledger seed — counts DERIVED, §0)

| Source corpus | DERIVED count @ HEAD | Disposition home |
|---|---|---|
| BF DEFERRED-CENSUS D1–D32 | 32 (confirmed) | each → a BG wave (D2/D30 spike→SPIKE-DELETE; D6 ba-gestalt→ROSTER-RE-POINT; D7 Safari→SAFARI-PARITY; D9 phantom-evidence→DEAD-GATE-SWEEP; D11 ledger→DEFERRED-LEDGER; D12/D13→JUBILANCE-DECIDE; D32 release-tags→DEAD-GATE-SWEEP) |
| AX DISPOSITION-REGISTER | 32 on disk (prose said 31 — DERIVE) | BG.W-DISPOSITION-RESTAMP (re-stamp+decide; 2 pending flips verified) |
| in-src books (`CONSUME(`/`BOOKED:`/`successor`) | grep-DERIVED (the F0 discovery pass) | the ledger (DEFER-with-trigger, by-name, foreign-tree fence) |
| BE.W-\* + BF.W-\* wave-ids | 70 on disk (prose said 69 — DERIVE) | BG.W-BE-BF-LEDGER (LANDED/NEVER-BUILT parity) |
| no-god-module GRANDFATHERED | DERIVED from the ratchet baseline | SPIKE-DELETE un-grandfathers the dead 2; the live >500 (GlassDock.vue 711, createCanvasLifecycle.ts 695, …) → ledger rows, colocation-split by owning workstream |
| `proof:de-shadcn` orphan | 1 | ledger → register-or-delete (WS4/WS10) |

---

## OPEN RISKS (post-fold)

1. **The attestation trust-anchor wiring (mustFix-2, §A.2) — spec'd-not-build-proven.** `runnerIdentity` must bind to an orchestrator-injected write-fenced token (or the Phase-2 OIDC identity). If no such token exists at build time, the field is DROPPED (with a ledger trigger) rather than shipped as an always-pass check. **Falsifier:** a self-test bite proving a same-identity attestation REDs, run end-to-end.
2. **The predicate live-calibration (mustFix / §B.2) — the largest single residual.** The synthetic 11/11 bites pass; the bands must be confirmed against ACTUAL 4.2.0 pixel reads (`--cartoon-ink` rgb(49,0,0) at the dock edge; metallic C 0.115–0.155 > 0.10; foreground H 56–68°). **Falsifier:** born-RED reproduced on a real served capture, not a synthetic PNG.
3. **The real-Safari close-machine arm (§G.2) — the dominant residual.** `safaridriver`/WebDriver against real Safari 26 must run deterministically in the close ceremony (or a documented manual capture stands in). Playwright WebKit is a proxy only. **Falsifier:** a real-Safari `backdrop-filter` computed-value read on the close machine that REDs when var() fails to resolve (G.3) and the webkit verdict written to the attestation.
4. **The dirty-tree sequencing (mustFix-4, §A.5) — must be wired, not asserted.** `--run ship` → commit attestation → `release.sh(--run full re-validates clean)` → tag must not deadlock the porcelain check. **Falsifier:** the ordering run end-to-end on the close machine.
5. **The FLIP-ONE DRY collapse vs the box-inviolate engines (risk #6).** Folding the 4 morph engines onto kf `flipShared` is the right gestalt but touches engines WS2/WS6 are actively building on. WS7 records it as a DECIDED disposition pointing at a coordinated wave, NOT a unilateral rewrite.
6. **Sequencing.** Band 1 (dead-mechanism reckoning) lands BEFORE Band 2 (the oracle re-point) so the new live oracle never certifies code about to be deleted. The Band-2 gates are born-RED and only close after WS1–WS6 paint; BG.W-CUT is last and gates on all of it.

---

## RESIDUAL (the unconverged frontier → next pass)

Pass-1 folded every critique mustFix and reversed the falsified Safari decision. Three items are **spec'd-concretely-but-not-build-proven** and one is **calibration-owed**, capping convergence at ≈73%:

- **The predicate live-calibration (P2 · 44%)** — born-RED demonstrated against actual 4.2.0 served captures, bands calibrated from the live pixel read (not synthetic). *Highest-leverage residual.*
- **The real-Safari arm (P5 · 38% falsified)** — build-prove `safaridriver` (or a documented manual capture) runs in the close ceremony and writes a binding webkit verdict; confirm the base-glass var()-in-`-webkit-backdrop-filter` reality on real Safari (a potential WS3 fix to ledger). *Dominant residual — the falsified headline must not propagate.*
- **The attestation trust-anchor (P1 · 57%, mustFix-2)** — wire a real `runnerIdentity` anchor (orchestrator token / OIDC) with the same-identity-REDs self-test, OR drop the field with a ledger trigger.
- **The §A.5 sequencing wiring (P1, mustFix-4)** — release.sh/release.yml integration run end-to-end (the spine is not "proven end-to-end" until this lands).
- **The F0 forward-completeness derivation (P4 · 55%)** — implement + prove the DERIVED corpus (bfCensusIds/axRegisterIds/waveSpecExists/in-src-grep run FORWARD) so a 5-of-N ledger REDs; this is a build deliverable, not a row-population chore.
