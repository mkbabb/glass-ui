# PASS-1 RESEARCH — FRICTION-HISTORY MINING (lens: friction-history)

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD (verified):** `4c761b64` (the fold tip; zero new src/demo since) · **pkg:** 4.2.0 → cut 5.0.0
**Scope:** the FIRST pass of the COHERENCE audit. Establish the friction-history baseline: mine the full A→BG audit corpus for every named recurring-failure class, then verdict each against the post-fold BG wave plan (150 rows; 44 DONE, 130 PENDING, 7 PAINT-PENDING).
**Method:** read SEED-CONTEXT + AMENDED-WAVE-PLAN + FINAL §2/§10; mined the canonical chronic taxonomy (`AX/audit/hardening/GOLDEN-chronic-fold.md` classes A-J + the 5 CHRONIC-* lanes), the BB/BC incident ledger (`BD.W-LESSONS-BB-BC-BACKFILL.md`), the AT chronic-fold ledger, the LESSONS-LEARNED ledger, and the project MEMORY trap-set; verified the 3 BG workflow scripts, `.claude/settings.local.json`, `package.json` floors, the C18 harness, and the cursor on disk.

`node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (run at open; siblings intact).

---

## 0. THE ONE-SENTENCE BASELINE

The project does not have a deferral problem — it has a deferral-CLOSURE problem (GOLDEN-chronic-fold's gestalt finding): **every chronic is one species of "a gate satisfiable by a PROXY."** The BG plan has internalized this lesson harder than any prior tranche (the 7 gap-waves are LITERALLY the proxy-killers: live-paint ba-gestalt, derived-not-hand-authored roster, ship-attestation, --strict-freshness, --run full siblings-absent). The residual repeat-risk is therefore NOT the design — it is (a) the ONE process surface the hardening did not reach (the decoupled paint workflow `bg-paint.wf.js`, which is both un-null-guarded AND structurally adjacent to the cured BB single-terminal-reflect disease), (b) the glass-ui-SPECIFIC token/binding traps that ride the heavy WS3/WS6/WS8/WS9 token waves below the meta-gate radar, and (c) the ★★★ C-SAFARI chronic which the plan honestly owns as the dominant cut-risk bound to an on-device leg.

---

## 1. THE COMPLETE FRICTION TAXONOMY (canonical classes + repeat-risk verdict)

Three families: **META/CLOSE chronics (A-J, the canonical GOLDEN ledger)**, **glass-ui-SPECIFIC paint/token traps**, and **PROCESS/orchestration friction**. Each: definition → slip-history → institutional fix landed → **BG repeat-risk** (the specific wave + why).

### FAMILY I — the canonical close/meta chronics (GOLDEN A-J)

**A · headless-green-over-visually-broken (the CARDINAL master class).**
Slip: recurred across C→V→AX→BB→BC→BD→BE→BF→[BG] — diagnosed 3× inside AX alone. A gate greens device-free while the real paint is broken. The BB instance (single-terminal-reflect: 48 waves funneled π to one W-REFLECT3 the stop cut; 65 DELTAs, 0 verdicts flipped) is the worst incident in project history.
Fix landed: per-wave paint-at-own-close (`gestalt-first-capture.md` P1-P5); `proof:ba-gestalt` reads LIVE paint (G7 source-hash auto-revoke, G8 deferral-assertion ban); the dual-engine NON-authoring judge; `proof:live-verified-ledger` + `--strict-freshness`.
**BG repeat-risk: MODERATE (general) / HIGH (the C-SAFARI sub-instance).** General class is well-cured: `BG.W-PAINT-IS-THE-GATE` makes ba-gestalt read pixels; every [P] wave is paint-gated; the tag is COUPLED to ba-gestalt 0/10 (§1.1 fence). BUT two live exposures: (1) **C-SAFARI ★★★** (4-tranche chronic BE/BF/BD/[BG]) bound to the on-device Metal/Safari leg by design — `BG.W-GLASS-BACKDROP-SAMPLE`/`BG.W-SAFARI-PARITY-GATE`/`BG.W-CUT`; the named fallback ladder (full→drapery-dropped→flat-blur) bounds the worst case but the FULL-shader renderability under WebKit's ~2s compile ceiling is a genuine unknown. (2) the decoupled paint workflow re-creates a paint-concentration point — see §2.1 (the single most important NEW finding this pass).

**B · orphaned-wave-claim (doc-says-done / tree-says-no).**
Slip: V `/freshness` wire-claim → AX W19 header-ribbon → recurs at every convergence roll-up.
Fix: `proof:no-orphaned-wave-claim` (a `live-verified`/DONE row whose wave declares a falsifiable RED witness reds unless the witness's gate is GREEN).
**BG repeat-risk: LOW-MODERATE.** The cursor is honest at the row level (44 DONE verified, ZERO restart per §10.1). One LIVE instance of the class IN the plan itself: the AMENDED-WAVE-PLAN header + FINAL §10 say `HEAD 6369ad6e`, but the actual fold tip is `4c761b64` (6369ad6e is 2 commits back). A stale HEAD-pointer in the binding plan doc is the exact doc-says-X/tree-says-Y shape — cosmetic, but it is the class, in the re-spec's own header. Watch: every Band-0 ledger wave (`BG.W-DEFERRED-LEDGER`/`BG.W-BE-BF-LEDGER`/`BG.W-DISPOSITION-RESTAMP`) is a claim-reconciliation surface; each must assert against HEAD, not against report faith.

**C · clean-break-rename-misses-a-consumer (under-SCOPED, not under-tooled).**
Slip: 6+ recurrences (AP bindings → AS.W7 → AW keepDockOpen → W04 false-zero → W53 BouncyTabs → speedtest 8 files). The strongest dead-ref detector (the type system) was blind to `tests/`+siblings.
Fix: `tsconfig.test.json` in typecheck; `proof:consumer-staleness` reverse cross-repo gate; `DELETION_SWEEP_ROOTS=["src","demo","tests"]`.
**BG repeat-risk: MODERATE.** BG is dense with clean-break deletes/renames: `BG.W-CHIP-ALIAS-KILL` (`selectableChipVariants`→`ChipVariants`), `BG.W-DEAD-TOKEN-SWEEP`, `BG.W-DOCK-CUT` (delete `useDockContextSilhouette` 551L), `BG.W-VIZ-SUBSTRATE-DELETE` (≥13 files, ≥2500 LOC), `BG.W-DEAD-COMPOSABLE-CUT`, `BG.W-SPIKE-DELETE`, the BH 5.0.0 export reshape (subpaths-delete + /api-fold), the WS10 deshadcn token-replaces. EACH is a clean break the MEMORY warns "silently no-op." Mitigation present: the consumer-constellation census (`consumer-constellation.md`) + the foreign-tree by-name asks; BUT the BG plan does not explicitly re-assert the `tsconfig.test.json`/`proof:consumer-staleness`/`DELETION_SWEEP_ROOTS` discipline is wired for the BG-era deletes — a PASS-2 drill should confirm each delete wave greps src+demo+tests+present-siblings, not just src.

**D · budget-rebaseline ratchet (a logbook of growth wearing a gate's clothing).**
Slip: F12→I→J(deleted)→K→P alert→3.6.0→3.8.0 manual-unblock — 12+ rebaseline commits, ceiling +87% never-down.
Fix: `proof:budget-gate-present` + a DOWN-ratchet obligation after prune waves; the conscious-lift-as-last-pre-tag-act.
**BG repeat-risk: MODERATE.** BG ADDS CSS (WS8 glass-deep/refraction, WS3 glass standardization, WS9 paper-suffuse, WS6 siri) AND PRUNES (WS5 viz-substrate-delete budget re-pin DOWN, the carves). `BG.W-CONSTRAINT-MANIFEST` notes a lighthouse re-pin; the aurora budget already lifted to gzip 50000 (kuwahara). The plan does name the down-ratchet (VIZ-SUBSTRATE-DELETE re-pins DOWN). Risk: an un-tracked NET lift at the cut (the WS8 refraction shader + the siri WebGL leaf are new GL chunks). The kf-5.1.0 / value-1.1.1 bumps also move the dep graph.

**E · ci.yml↔manifest drift (a detector permitted to run RED).**
Slip: P heap-bump → W00 "5 drifts" → 14 → 20, climbing every band.
Fix: `gates.mjs --emit-ci` codegen + `proof:gen-ci-fresh` (drift becomes IMPOSSIBLE, not merely detected); `verify-ci` in the RELEASE set.
**BG repeat-risk: LOW (the structural fix is in place).** R3 (`proof:gen-ci-fresh` RED — `glass-idiom-factor` ci-tagged but ci.yml un-regen'd) is a LIVE symptom the 9-site close-fix clears via `gates:emit-ci` regen. The residual: BG registers MANY new ci-tagged gates (close-sweep, gestalt-cursor-parity, field-aurora, route-navigates, safari-parity, category-card-warm→ci, …); EACH must re-run the emit. The codegen + `proof:gen-ci-fresh` catch a stale ci.yml at the cut — so a miss is detected, not shipped. Watch: the integrator (bg-bh-execute INTEGRATE step) applies `gatesRegistration` rows into gates.mjs but the plan must ensure the emit-ci regen runs per-wave or at WS7 close, else `proof:gen-ci-fresh` reds the cut (acceptable — caught).

**F · BOOK/ARCHIVE/NAMED-FORWARD re-label (named, not closed).**
Slip: native-drawer BOOK'd 6× though the ≥2-consumer trigger was MET at AT.
Fix: `proof:disposition-live` (a BOOK item carries forward ONLY if a gate re-evaluates its trigger each close); the founding-chronic terminal-decide (BB.W-NDA-DECIDE).
**BG repeat-risk: LOW.** `BG.W-DISPOSITION-RESTAMP` re-evaluates 31 BC→BG dispositions in place (n:2 re-eval; re-stamp-without-decide REDs); the RE-STAMP-DISCHARGE clause (from BB.W-DISPOSITION-RESTAMP) is live. The Band-0 ledger machine (`BG.W-DEFERRED-LEDGER`/`-BE-BF-LEDGER`) is the no-silent-drop forcing function. This class is well-defended. Watch: the WS5 "booked" rows (`-VIZ-SUBSTRATE-DELETE2`, `createFragmentGLPass`) + the WS2 `BG.W-DOCK-FISSION-WIRE` DECIDE (wire ≥2 real or retire) must hit `proof:disposition-live`, not re-book.

**G · structural / god-module / legacy-commentary (gate blind + local-only).**
Slip: `.ts/.vue`-only `proof:no-god-module` since AV; CSS-blind; metaball grew 351→690; legacy commentary 3→6.
Fix: extend gate to `.css` + `["local","ci"]`; `--rebaseline >5%-stale` self-check; RATCHET drain to ∅; promote `proof:no-legacy-commentary` to ci/release.
**BG repeat-risk: MODERATE.** R1 is a LIVE symptom (`ladder.css`=527, `shell.css`=510 both >500, neither in RATCHET). G4's 9-site carve clears them — but the plan EXPLICITLY anticipates re-grow: "If WS3 re-grows ladder/shell past 500, a re-carve is owed within WS3" (a VERBAL commitment, backed by `proof:no-god-module` now CSS-aware so it reds at the re-growing wave's landing). WS4 carries ~8 carve waves (CANVAS-LIFECYCLE 695L, AMBIENT-HISTOGRAM 542L, TABS-KEYBOARD 512L, …); WS2 DOCK-DECOMPOSE (711L); WS3 adds glass CSS; WS8 adds glass-deep+refraction CSS; WS9 adds paper CSS — all into files the gate now watches. The class is caught-at-authoring but the SEQUENCING is fragile (a wave that grows a carved leaf reds its own landing → fix-loop churn). The RATCHET==∅ doctrine is a close precondition (`BG.W-COHERENCE-CENSUS`).

**H · close-never-runs / provenance (the LAST wave is the FIRST risk).**
Slip: AW close died on the session-limit halt; AX W33 un-started+mis-versioned; 3.8.0 from branch-tip.
Fix: master-ancestry guard; `proof:close-battery-parity` (--run full union); `proof:ship-attestation` (fail-closed tag-push bypass-closer); the non-terminal-wave placement of load-bearing gates.
**BG repeat-risk: LOW (the most-hardened class — it IS the user's stated low-confidence target the 7 gaps cure).** `BG.W-CUT` fires LAST after `--run ship` siblings+precepts-absent + F0 + real-Safari + user gate; `BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION` is fail-CLOSED. The §1.1 fence couples verification+release. Residual = C-SAFARI (CLASS A), not the close machinery itself. NOTE: the close machinery's RUN depends on the orchestration engine surviving to the cut — see §2 (the session-limit exposure in bg-paint.wf.js is the path by which CLASS H could re-bite via CLASS A's paint chokepoint).

**I · user-directive-contradicts-spec (the ask keeps getting re-deferred).**
Slip: fourier "execute NOW" re-deferred; D1 configurator "springy" narrowed to idiom-only.
Fix: `proof:user-ask-routed` (every pass-N defect id → a wave FileBounds covering ALL its sub-asks).
**BG repeat-risk: LOW-MODERATE.** The D1-D14 defect→wave map (§3) is explicit + paint-gated (13/14). The user's "liquid-weight universal" directive (MEMORY: ALL motion carries inertia/bounce/liquid-glass) is owned by `BG.W-12-LAWS-UNIVERSAL` (cross-cutting) — a broad directive routed to ONE cross-cutting wave is the I2-shape risk (a sub-ask could be silently narrowed). The goo-morph pager/deck-dots "worm between states" directive (MEMORY: "remember this always") — is it routed? `BG.W-DOCK-FISSION-WIRE` DRYs the goo bridge onto ONE GooFilter; the pager/deck goo-morph is not visibly a BG wave (it may be BD/BH scope). PASS-2 should confirm the goo-morph-between-pager-states directive has a wave owner.

**J · capability-without-adoption (the overfit inversion).**
Slip: ≥2-consumer bar satisfiable by a DEMO story (L demo-stuffed-close).
Fix: split the bar PRODUCTION-vs-DEMO; a shipped capability with <2 production sites is a born-RED overfit candidate.
**BG repeat-risk: MODERATE.** BG MINTS new primitives (`BG.W-SIRI-ISLAND`/`-WAVEFORM`, `BG.W-GLASS-REFRACT-WEBGL`, `useDockSpring`, `useFlip`). The ≥2-consumer bar must be PRODUCTION (the demo exerciser does not count). `useDockSpring` has ≥2 (the 5 dock SpringProgress sites fold onto it). `useFlip` has reveal/cta/bloom presets (≥2). SiriIsland is a headline WS6 surface (the G2 roster enrolls it). `useGpuSubstrate`/the viz suite already carry consumer-evidence docs. The class is defended by the ≥2-consumer fences + `proof:disposition-live` — but the NEW siri/glass-refract primitives are the live overfit-candidates to watch (G2 already names SiriIsland the orphan-decision).

### FAMILY II — the glass-ui-SPECIFIC paint/token traps (below the meta-gate radar)

**K · the substitution-vs-inheritance trap / the dead-knob bug.**
Slip: 3rd-4th recurrence (AX.W55 → AZ dock-scale re-declare → BB dark-arm hardcode). A CSS `var()` substitutes at its DECLARING element; a `:root`-composed derived token does NOT re-compose on a descendant/ancestor override → the override is a dead knob. CLAUDE.md canonizes it ("the recurring trap, recorded") in 5+ places.
Fix (per-instance, no single gate): the registered-INHERITING-`@property` + read-at-the-element discipline (the `--dock-local-scale`/`--dock-morph-t` pattern); the re-declare-on-the-scope idiom; `proof:ui-scale` `dock-coarse-redeclares-scale` witness (AZ).
**BG repeat-risk: MODERATE-HIGH — the single biggest glass-ui-specific exposure.** BG mints/re-threads MANY substitution-shaped tokens: `@property --siri-island-t` (WS6 GLASS-BLUR-ENGAGE/SIRI-ISLAND — the descend-scrim couples filter:blur on the scalar), `--glass-depth`/`--glass-btn-press-t` (WS8 GLASS-LIQUID-TRANSITION reads the press spring `.value` as a second reader), `--glass-key-direction` (WS9 GU-1 — azimuth derives from it; WS8 bevel + WS9 grain read it), `--dock-surface-blur: var(--glass-blur-resting)` (G4 — the dock-blur PEER, a pre-substituted seam exactly like the AZ `--glass-bg-dock` that bit), the WS3 `--glass-plate-tinted` declared-ONCE + `--glass-tint-bias-*` clamp + the GLASS-BLUR-PEER resolved-radius lock ("override the PRIMITIVE not the composite"). The @property-registered tokens (`--siri-island-t`) are SAFE IF registered `inherits:true` + read at the element (the correct pattern) — but the build-map does NOT explicitly state the substitution discipline for the new siri/glass-key tokens. The `--dock-surface-blur` peer is the highest risk: it is a pre-substituted derived token (the exact shape that bit on `--glass-bg-dock` at AZ — a descendant override of `--glass-blur-resting` would NOT re-resolve `--dock-surface-blur` baked at its declaring scope). **No single gate catches the dead-knob class** — it is per-instance + the live-π under coarse/scope emulation is the only catcher. PASS-2 should confirm WS3/WS6/WS8/WS9 each carry the re-declare-on-scope discipline + a scope-override π.

**L · reka-ui binding silent no-op (stale prop/emit bindings).**
Slip: `:pressed`, `v-model:search-term`, `tag=` silently no-op; vue-tsc + units MISS them; only e2e catches. MEMORY: "sweep on version bumps."
Fix: none mechanical (the e2e/paint-π is the only catcher); the binding-verification discipline on version bumps.
**BG repeat-risk: MODERATE.** BG bumps kf ^5.0.0→^5.1.0 (the `KeyframesScrollTimeline`/`KeyframesAnimation` ambient-collision renames + DragOptions.snap/Oscillator) AND value.js. AND heavily re-touches reka bindings: `BG.W-SHEET-INSET-ROOT` (configurator Sheet data-slot/data-side mint), `BG.W-DESHADCN-MATERIAL` (grouped Select elevation + Switch material), `BG.W-SPECIMEN-PER-STORY` (REAL Select/Slider per card), `BG.W-DESHADCN-TOKEN-REPLACE` (ToastClose→destructive). A stale reka binding from the kf/value bump or a deshadcn re-wire would device-free-green and only the dual-engine paint-π catches it. The dual-engine paint protocol IS the backstop (it is e2e) — but there is NO DEDICATED binding-sweep gate on the version bumps. The MEMORY directive ("sweep on version bumps") is not visibly a BG wave.

**M · the live-π oklab paint-arm / grey-separates-by-L-not-chroma.**
Slip: device-free gates pass while live-π false-FAILS because getComputedStyle returns `oklab()` for oklab tokens; grey separates by L not chroma. MEMORY: paint-arm.mjs parses oklab now; run live-π per band.
Fix: `reflect-capture-verify.mjs` parses oklab; the chroma-sensitive measure.
**BG repeat-risk: LOW.** The tooling fix landed. BG's no-gray/AA waves (`BG.W-CARTOON-INK-GAMUT`, `-DOCK-LEGIBILITY-RECAL`, `BG.W-GATE-FIELD-AURORA`) read oklab; G6's leaf gains `pngMedianRgbStddev` (a chroma-sensitivity measure, not L-only). Watch: the field-aurora-aa gate must measure CHROMA over the composited plate, not L — the plan's `pngMedianRgbStddev` is the right shape; a regression to L-only would re-open M.

**N · light-dark() inset-shadow trap + complete-hsl() double-wrap + scoped :global() drop + :slotted-vs-:deep.**
Slip: (N1) inset-shadow fragments inside `light-dark()` compute the WHOLE box-shadow to `none` → plain per-mode arms only. (N2) `hsl(var(--token))` double-wraps a complete-hsl token → never paints (A5-1 modal scrim). (N3) Vue scoped `:global(.dark) .x` silently DROPS from emitted CSS (3rd recurrence 2026-06-11). (N4) `:deep([data-slot])` sledgehammer vs bare `> [data-slot]` 2-of-3-lanes-dead vs the correct `:slotted([data-slot])` (BB.W-SCROLL-CARD).
Fix: canonized idioms (plain per-mode pair; `color-mix(in srgb, var(--token) N%, transparent)`; plain-ancestor `.dark .x`; `:slotted()`); the box-shadow getImageData π.
**BG repeat-risk: LOW-MODERATE.** (N1) WS3 `BG.W-CARTOON-INK-GAMUT` pins `--cartoon-ink` both modes (plain per-mode — correct) + a box-shadow getImageData π; WS8 glass-deep dark arm + WS9 paper light-dark are the watch surfaces. (N3) the SFC-CSS waves (`BG.W-SFC-CSS-PARTIAL-SWEEP`, WS11 `BG.W-SECTION-TYPEWRITER-FADEUP` demo-private scoped CSS, WS9 paper SFC) are the scoped-:global risk; `BG.W-SCROLL-SHRINK-UNIFY` correctly externalizes to GLOBAL `card-scroll.css` (avoids the trap). (N4) `BG.W-SCROLL-SHRINK-UNIFY` + WS11 page-API touch slotted content. The dual-mode dual-engine paint-π catches N1/N3 (a dark-mode capture surfaces a dropped `.dark` rule or a collapsed shadow). Device-free gates miss them.

### FAMILY III — the process / orchestration friction

**P · the rate wall (`parallel()` over >3 → real 429s).**
Slip: a workflow silently dies; fixed via `batched(items,3,fn)`.
**BG repeat-risk: LOW.** `bg-bh-execute.wf.js` caps the build batch at 3 (`composeBatch`: `if (batch.length === 3) break`); the in-cycle paint judge is DECOUPLED (`paintWaves = []`). `bg-paint.wf.js` caps at 2 (browser-heavy). `develop-execution-plan.wf.js` (one-shot, already run) uses `parallel(mapThunks)` with ≤3 thunks each. NO un-batched `parallel()` over >3 found. CLEAN.

**Q · the session-limit crash (an agent returns `null`; an un-guarded script crashes on `null.field`).**
Slip: fixed via null-guards + `resumeFromRunId`.
**BG repeat-risk: MODERATE — a CONCRETE live gap (see §2.1).** `bg-bh-execute.wf.js` IS hardened (build `.catch(()=>({w,r:null,error:true}))`, integrate `.catch(()=>null)` + `(integ && integ.results)||[]`, DAG-loader `if(!loaded||!loaded.waves)`, STEP-0.5 already-done guard). BUT `bg-paint.wf.js` has FOUR un-guarded `agent()` calls whose results are dereferenced: line 40 `pp = await agent(...)` then `pp.waves[0]`/`pp.waves` (no `.catch`); line 43 `pipe = await agent(...)` then `pipe.chromeOk` (no `.catch`); line 51 the paint judge inside `batched(...,2,w=>agent(...))` has NO `.catch` (a single agent throw rejects `parallel` → `batched` throws → workflow crash; the `.filter(Boolean)` only filters RETURNED nulls, not thrown rejections); line 54 the synth agent (last, returned). The decoupled paint workflow is the LONGEST-running, most-likely-to-hit-a-session-wall workflow (it drives real Chrome.app + Safari.app per wave) — and it is the ONE workflow that did NOT get the null-guard hardening bg-bh-execute received.

**R · the foreign-tree catastrophe (a subagent mv'd 11 sibling repos to /tmp).**
Slip: orphaned for hours; the deny-backstop hard-blocks `mv`/`rm -rf`/`rmdir` against `~/Programming`.
**BG repeat-risk: LOW-MODERATE — the prose fence is durable; the permission backstop is NOT.** All 3 workflows carry the FENCE prose (foreign-tree + verify-siblings-intact tripwire); `verify-siblings-intact.mjs` is TRACKED (durable). BUT `.claude/settings.local.json` (the `bypassPermissions` + deny-list backstop) is GITIGNORED (`git check-ignore` confirms) — an UNTRACKED local file. A fresh checkout / new worktree / settings reset loses it. AND the deny patterns are LITERAL-prefix globs (`Bash(mv ~/Programming/*)`, `Bash(rm -rf ~/Programming/*)`, …): they catch the exact `mv ~/Programming/slides …` form (the precise catastrophe shape) but NOT evasions — `cd ~/Programming && mv slides /tmp`, `find ~/Programming -delete`, `git -C ~/Programming/sibling clean -fdx`, a node `fs.rmSync`, or a variable path. The DURABLE protections are the prose fence + the tripwire + the worktrees-at-`.claude/worktrees` mandate; the deny-list is a narrow, lose-able belt-and-suspenders. The seed's question ("could a future session regress it via settings.local.json overwritten?") → YES, it is untracked.

**S · the dependency-floor miscalculation (`^1.2.0` would exclude npm-latest).**
Slip: corrected to value.js `^1.1.1`.
**BG repeat-risk: LOW (corrected + verified clean).** value.js floor `^1.0.0`→`^1.1.1` (admits npm-latest; keyframes' `^1.2.0 ⊆ ^1.1.1`). kf `^5.0.0`→`^5.1.0` — VERIFIED published (`npm view @mkbabb/keyframes.js version` → `5.1.0`), so the `DragOptions.snap`/`Oscillator` CONSUME is NOT floor-ahead-of-latest (the exact error value.js `^1.2.0` was). WS9 drops the dead `perfect-freehand ^1.2.3`. The 5 stale `^1.2.0` strings in the G6 spike are flagged for reconcile. CLEAN — the only watch is that the cut-time CONSUME confirms kf 5.1.0 is still latest at tag.

**T · the submodule mistake (`docs/precepts` is a submodule; a canon-home placed INSIDE it silently won't persist at a siblings-absent close).**
Slip: nearly placed a canon-home in the submodule; a fresh `/tmp` worktree does not recurse submodules → the doc is ABSENT → the gate reds at the exact close it locks.
Fix: home canon in PARENT-TRACKED docs (`docs/tranches/BG/canon/`).
**BG repeat-risk: LOW (corrected, one-home discipline).** G3 + G5 both moved canon homes OUT of the submodule (`close-disease-sweep.md`, the build-and-gates / consumer-wiring / glass-system canon homes) into parent-tracked `docs/tranches/BG/canon/`. The BD lessons-backfill IS a deliberate submodule commit (orchestrator-owned, pointer-bump). Watch: any NEW canon-home decision in the 130 PENDING waves must check submodule membership (the WS10 deshadcn CANON fold, WS9 paper canon, WS12 census).

**U · wrong-uniform / wrong-anchor (C-SAFARI keyed to invented `uDispersion` not ship `uChromatic`; a born-RED gate anchored to the WRONG commit).**
Slip: the spike invented `uDispersion`; a gate anchored to `cb8ecdfc` (post-fix) instead of `b3d65eec~1` (pre-fix).
Fix: re-point the fence to the ship `uChromatic`; anchor born-RED gates to the verified pre-fix BROKEN commit (`ebf6e45b` = `b3d65eec~1`).
**BG repeat-risk: LOW-MODERATE (corrected for the known instances; the class is wide).** G1 re-points `proof:glass-refract-fence` to `uChromatic` (the §1.5 K2 fence is BINDING on `uChromatic`, NOT `uDispersion`). G6 anchors F-AA-LIVE at `ebf6e45b`. The CLASS is "any gate/spec keyed to an invented/wrong identifier across 150 waves" — the two known instances are fixed, but the WS8 refraction shader (`glassShader.wgsl` Tier-2, the 5 `sampleBG` sites, `uChromatic` 0.20-0.30 @ uRef=1) + the WS6 siri shaders are the surfaces where a new invented-uniform/wrong-anchor could recur. PASS-2 should spot-check every born-RED gate's anchor commit + every shader-fence uniform name against the SHIPPED `glass-field-shaders.json`.

---

## 2. THE NEW FINDINGS THIS PASS SURFACED (not in the seed list)

### 2.1 ★ THE DECOUPLED-PAINT ENGINE IS STRUCTURALLY ADJACENT TO THE CURED BB SINGLE-TERMINAL-REFLECT DISEASE (high-value)

`bg-bh-execute.wf.js:204` DECOUPLES the in-cycle paint judge: `const paintWaves = []` with the comment "PAINT DECOUPLED: the build lands [P] waves [paint-pending] device-free; a dedicated paint workflow runs the dual-engine/C-SAFARI capture + flips them DONE." Paint is moved to a SEPARATE workflow (`bg-paint.wf.js`) that sweeps ALL accrued PAINT-PENDING waves.

This is the SAME SHAPE as the BB disease the project canonized as its worst incident (48 waves funneled π to ONE terminal run; the stop cut it; 0 verdicts flipped) — paint deferred out of the per-wave close into a single later run. The MITIGATIONS that make it SOFTER than BB (and arguably acceptable):
- the cursor row stays **PAINT-PENDING** (honest — NOT `complete`/DONE; the BB disease closed `complete` on source-green). A stop leaves the wave visibly un-verified.
- the TAG is COUPLED to `proof:ba-gestalt` 0/10 (§1.1 non-negotiable fence) — a cut paint sweep can't ship the band (the tag won't fire with PAINT-PENDING/un-flipped gestalt verdicts).
So the failure mode is a STALL (build can't reach the cut), not a ships-broken (the BB outcome). That is strictly better than BB.

The RESIDUAL RISK: `bg-paint.wf.js` re-creates a paint-CONCENTRATION chokepoint (the exact structural feature gestalt-first-capture P1-P5 forbids — "no terminal reflect wave to funnel verification into"), AND it is the un-null-guarded workflow (§2.2). A repeated session-limit crash of the paint sweep stalls the entire visual close. The gestalt-first PRECEPT says paint verifies at the wave's OWN close; the BG engine instead lands [P] device-free and batches paint into a separate sweep — a deliberate "keep build cycles fast" trade that re-introduces the concentration the precept exists to prevent. **This is the most important coherence finding for PASS-2 to adjudicate:** is the PAINT-PENDING-honest-cursor + tag-coupled-fence sufficient to call the decoupling safe, or does it violate the gestalt-first precept the project's own LESSONS-LEARNED Entry-1 canonizes?

### 2.2 ★ `bg-paint.wf.js` HAS FOUR UN-GUARDED `agent()` DEREFS (the session-limit class, live)

Detailed in §1.Q. The decoupled paint workflow — the longest-running, most-session-wall-exposed workflow (real Chrome.app + Safari.app per wave, the C-SAFARI ★★★ surface) — is the ONE workflow that did NOT get the null-guard hardening `bg-bh-execute.wf.js` received. `pp.waves`/`pipe.chromeOk` deref a possibly-null agent return; the line-51 paint judge throw rejects the whole `batched` group. A session-limit return-null or throw mid-sweep crashes it. Resume is cursor-based (passing waves already committed DONE), so re-running recovers — but a crash-loop on the paint sweep is exactly the CLASS-H "close-never-runs" failure reached via the CLASS-A paint chokepoint. FIX (mechanical, one-line each): `pp = (await agent(...).catch(()=>null)) || {waves:[]}`; `pipe = (await agent(...).catch(()=>null)) || {chromeOk:false,safariOk:false,blocker:'agent-null'}`; line 51 `agent(...).catch(()=>null)` inside the map.

### 2.3 the deny-backstop is GITIGNORED + literal-prefix-narrow (the foreign-tree class, §1.R)

`.claude/settings.local.json` is untracked (lose-able on checkout/reset) and the deny patterns catch only literal `mv`/`rm`/`rmdir ~/Programming/*` prefixes (not `cd && mv`, `find -delete`, `git clean`, node fs). The durable protection is the FENCE prose + the TRACKED `verify-siblings-intact.mjs` tripwire — adequate, but the permission backstop should not be relied on as the primary fence.

### 2.4 the HEAD-numeral in the binding plan trails the actual tip (CLASS-B shape, in the re-spec itself)

AMENDED-WAVE-PLAN + FINAL §10 declare `HEAD 6369ad6e`; `git rev-parse` → `4c761b64` (6369ad6e is 2 commits back, behind the fab5b7a1 + 4c761b64 fold commits). Cosmetic, but it is the doc-says-X/tree-says-Y class in the plan's own header. The cursor itself is honest (44 DONE verified).

---

## 3. REPEAT-RISK SUMMARY (verdict per class)

| Class | Name | Recurs-risk | The BG wave(s) that could repeat it + why |
|---|---|---|---|
| A | headless-green / cardinal | MOD (gen) / **HIGH (C-SAFARI)** | C-SAFARI ★★★ bound to on-device Metal (WS8 BACKDROP-SAMPLE / WS7 SAFARI-PARITY / WS-CUT); the decoupled-paint chokepoint (§2.1) |
| B | orphaned-wave-claim | LOW-MOD | Band-0 ledger waves; the live HEAD-numeral drift in the plan header (§2.4) |
| C | clean-break-misses-consumer | **MOD** | CHIP-ALIAS-KILL, DEAD-TOKEN-SWEEP, DOCK-CUT, VIZ-SUBSTRATE-DELETE, DEAD-COMPOSABLE-CUT, the BH /api-fold — each a clean break; confirm tests+siblings grep wired |
| D | budget-rebaseline ratchet | MOD | WS8 refraction+siri GL chunks ADD; WS5 re-pins DOWN; net lift at cut |
| E | ci.yml drift | LOW | emit-ci codegen in place; R3 live; each new ci-gate must regen (caught by gen-ci-fresh) |
| F | BOOK/re-label | LOW | DISPOSITION-RESTAMP + Band-0 ledger defend it; WS5 booked rows + DOCK-FISSION DECIDE |
| G | god-module / legacy-commentary | **MOD** | R1 live (ladder 527 / shell 510); WS2/WS3/WS4/WS8/WS9 add CSS into watched leaves; re-grow caught at authoring but churny |
| H | close-never-runs / provenance | LOW | most-hardened (the 7 gaps cure it); residual = C-SAFARI + the paint-engine stall path (§2.2) |
| I | user-directive-vs-spec | LOW-MOD | 12-LAWS-UNIVERSAL (broad→one wave); confirm goo-morph-pager directive has an owner |
| J | capability-without-adoption | MOD | SIRI-ISLAND/-WAVEFORM, GLASS-REFRACT-WEBGL, useDockSpring/useFlip — new primitives; ≥2 PRODUCTION bar |
| K | **substitution / dead-knob** | **MOD-HIGH** | `--siri-island-t` (WS6), `--glass-depth`/`--glass-btn-press-t` (WS8), `--glass-key-direction` (WS9), `--dock-surface-blur` peer (G4), `--glass-plate-tinted`/`--glass-tint-bias` (WS3); no single gate — per-instance scope-override π |
| L | reka binding silent no-op | MOD | kf 5.1.0 + value bumps; SHEET-INSET-ROOT, DESHADCN-MATERIAL, SPECIMEN-PER-STORY; paint-π is the only catcher, no dedicated bump-sweep gate |
| M | live-π oklab / grey-by-L | LOW | tooling fixed; field-aurora-aa must measure chroma not L (pngMedianRgbStddev — right shape) |
| N | light-dark/hsl/scoped-global/slotted | LOW-MOD | WS8 glass-deep dark, WS9 paper light-dark; WS4/WS9/WS11 scoped SFC CSS; dual-mode paint catches |
| P | rate wall | LOW | clean — all batched ≤3 (build) / ≤2 (paint) |
| Q | **session-limit null-crash** | **MOD (live gap)** | `bg-paint.wf.js` 4 un-guarded agent derefs (§2.2) — the one un-hardened workflow |
| R | foreign-tree | LOW-MOD | deny-backstop gitignored + literal-narrow (§2.3); prose fence + tripwire durable |
| S | dep-floor | LOW | corrected (value ^1.1.1, kf 5.1.0 verified published) |
| T | submodule | LOW | corrected (canon homes parent-tracked); watch new canon-home decisions |
| U | wrong-uniform/anchor | LOW-MOD | G1/G6 corrected (uChromatic/ebf6e45b); spot-check WS8/WS6 shader uniforms vs shipped JSON |

---

## 4. PASS-1 BASELINE VERDICT + WHAT PASS-2 SHOULD DRILL

**Baseline:** the BG plan is the most friction-aware tranche in the corpus — the 7 gap-waves ARE the canonical proxy-killers (CLASS A/B/E/F/H institutional fixes, landed or specified). The CLOSE-MACHINE chronics (E/F/H) and the dep/submodule/uniform corrections (S/T/U) are well-defended. The repeat-risk is concentrated in THREE under-reached surfaces:

1. **The ★★★ C-SAFARI chronic (CLASS A)** — honestly owned as the dominant cut-risk, bound to the on-device Metal/Safari leg; the fallback ladder bounds the worst case but the FULL-shader renderability is a genuine unknown. This is the plan's own #1 residual.
2. **The orchestration session-limit gap (CLASS Q) + the decoupled-paint-chokepoint (CLASS A, §2.1/§2.2)** — `bg-paint.wf.js` is un-null-guarded AND re-creates a paint-concentration point structurally adjacent to the cured BB disease. The mitigations (honest PAINT-PENDING cursor + tag-coupled fence) make it a STALL not a ships-broken, but it deserves explicit adjudication against the gestalt-first precept.
3. **The glass-ui-specific token/binding traps (CLASS K/L)** — the substitution/dead-knob class (MOD-HIGH) rides the WS3/WS6/WS8/WS9 new-token waves with NO single catching gate; the reka-binding-no-op class rides the kf/value bumps + the deshadcn/sheet re-wires with only the paint-π as backstop.

**PASS-2 drill targets:**
- Confirm each clean-break delete wave (CLASS C) greps `src+demo+tests+present-siblings`, not just src (the `tsconfig.test.json`/`proof:consumer-staleness` discipline wired for BG-era deletes).
- Confirm the new-token waves (WS3/6/8/9) carry the registered-inheriting-@property + read-at-element + re-declare-on-scope discipline + a scope-override π (CLASS K — the highest glass-ui-specific exposure).
- Confirm a binding-verification sweep exists on the kf 5.1.0 / value bumps (CLASS L — MEMORY "sweep on version bumps"); if not, name the wave.
- Adjudicate the decoupled-paint engine vs the gestalt-first precept (§2.1) + fix the `bg-paint.wf.js` null-guards (§2.2).
- Confirm the goo-morph-between-pager/deck-states directive (MEMORY "remember this always") has a BG/BH wave owner (CLASS I).
- Spot-check every born-RED gate anchor commit + every shader-fence uniform name vs the shipped `glass-field-shaders.json` (CLASS U).
- Track the budget net-lift at the cut (CLASS D) — the WS8/WS6 GL chunks vs the WS5 DOWN-ratchet.

**Coherence note:** no contradiction was found between the AMENDED-WAVE-PLAN and FINAL §10 (they agree on the 7 gaps, the corrections, the sequencing) beyond the cosmetic HEAD-numeral drift (§2.4). The DAG + build order are internally consistent. The friction-history baseline is established; the repeat-risks above are the surface PASS-2 should harden against.
