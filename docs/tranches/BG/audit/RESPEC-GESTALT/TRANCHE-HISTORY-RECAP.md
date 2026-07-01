# TRANCHE-HISTORY-RECAP — the last-several-tranches recap (BA · BB · BC · BD · BE/BF · BG · BH)

**Deliverable 1 of 3, RESPEC-GESTALT audit (Lane DEV-D).** Consolidated from Group-A lenses A1–A8 +
GROUP-A-SYNTHESIS + SYNTHESIS-PASS1 §2 rulings. Every load-bearing number re-verified on disk
2026-07-01. **Branch:** `tranche/BG` · **HEAD at write:** `306c3059` (advanced past the SEED's
`976dc890`; the pass-1 corpus was cut at `94ac25a2`). **Base of the live cursor:** v4.2.0.

---

## 0. The one-page executive arc — the disease, its mutation, and the cure status

The user's verdict — *"the last several tranches have been disastrous"* — is **correct**, and the
archaeology names the root with unusual precision: **one disease that MUTATED across four tranches
rather than dying.** The disease is *source-green / visually-broken* — a tranche lands real
mechanism, self-certifies "complete" against gates that measure the WRONG invariant (token chroma,
an isolated specimen's pixels, plan-graph consistency), and ships (or declares done) a gestalt the
user reads as broken. It is one disease expressed five ways = the five critique axes (missing-obvious /
gestalt-cohesion / over-contrivance / poor-encapsulation / lacking-elegance): **verification and
gestalt are decoupled, and delivery layers accreted 3–8× the design's ~25 real ideas.**

The mutation chain, disk-verified:

- **BB** built the liquid-glass band + WebGPU substrate + an elaborate close-integrity apparatus,
  then declared *"33/33 complete, CI green"* while **0/33 were painted** — every visual claim
  funneled through ONE terminal wave (`W-REFLECT3`) that never ran on BB's terms. The actual
  gestalt close + the 4.1.0 cut happened one tranche later under BC. (`2a182648`, BC forensic
  post-mortem, verbatim: *"BB=33/33 built / 0/33 painted."*)
- **BC** genuinely SHIPPED as **v4.1.0** (`9c0e06e2`, disk-confirmed — this REFUTES
  `P-historical-coverage.md:26`'s "never built" claim; see the correction note below) and built the
  correct cure (a per-wave paint gate). But its paint gate reads a TOKEN's warmth or an ISOLATED
  specimen's pixels — a warm token composited over an achromatic page STILL reads gray. The
  disease **narrowed; it did not close.**
- **BD** (the UNION tranche, cut **v4.2.0**) shipped a sound primitive spine (0 re-invention) but
  **concentrated all five critique-axis failures in its integration/shell layer**: a
  route-transition freeze hid every page behind a 356-gate-green close, a static metallic wash
  shipped where the user asked for a live aurora, the hero over-scale INVERTED its own directive.
  This is the tranche the "disastrous" verdict indicts hardest.
- **BE/BF** were plan-only, folded cleanly into BD; their 70-wave + 32-item disposition ledger
  (`proof:be-bf-ledger`, GREEN) is the single cleanest piece of process discipline in the corpus —
  a POSITIVE counter-example, not an indictment.
- **BG/BH** (current, joint **5.0.0**) are the honest cure-in-progress. The BG cursor is HONEST
  (the `git log v4.2.0..HEAD` code-change set is a bijection with the DONE code-bearing rows; 26
  DONE real). BG cures the BD **shell breakage** (route-transition/field-aurora/hero-fit already
  landed). But at pass-1 close it left **the two deepest ROOTS uncarried** — a composited-whole
  paint gate (GF1) and the AX.W54 glass-first over-reach transposition (GF2) — and **the freshest
  MANDATE unencoded** (the 2026-07-01 Fable/DesignSync design-routing directive, GF3). The plan as
  folded reproduced the disease at PLAN level: ~194 wave rows + ~85 new gates + 6.7 MB of prose
  stewarding ~1,833 LOC of src churn.

**Cure status (post-RESPEC-GESTALT):** the audit's prescription is one verb — **COLLAPSE** (194
rows → ~50 BG + ~14 BH in 8 gestalt families; 360 gates → net-negative toward ~40–60 family gates)
— plus three load-bearing NEW mechanisms that actually close the roots: the defined-glass control
tier (GA-1 / `W-GLASS-DEFAULT-DEFINITION`), the composited-whole paint gate (GA-2 /
`W-COMPOSITED-GESTALT-GATE`), and the Fable/DesignSync per-visual-wave arm (GA-3 /
`W-FABLE-DESIGN-ARM`). The cure is DESIGNED (this audit) but NOT YET BUILT — build resumes at
`BG.W-CLOSEFIX-9SITE` after the fold.

**Corpus correction (GF4/GA-11, binding on all downstream waves):** `P-historical-coverage.md:26`
states *"BC was tranche-DEV only, never built… the cure was specced, not shipped."* This is
**disk-FALSE.** `git rev-list -n1 v4.1.0` = `9c0e06e2` (98 commits past v4.0.1); BC's own
`EXECUTION-PROGRESS.md` records 28 DONE tiers + a "CUT COMPLETE" npm-publish entry;
`MEMORY.md`'s `project_glassui_410_published.md` corroborates. The P-lens conflated `BC/FINAL.md`
("zero src/ edits," written at end-of-DEVELOPMENT before the execution greenlight) with the
tranche's FINAL state. Any BG/BH wave inheriting "build the BC cure" is on a false premise — **the
cure EXISTS; its composited-gestalt blind spot (GF1) is what needs a wave.**

---

## 1. BA → v4.0.0 (the gestalt-bar reset)

- **Set out:** re-baseline the whole gestalt after a chronic re-open cycle; mint the holistic
  per-surface acceptance gate (`proof:ba-gestalt`) and the warm-cream identity floor. (Context, not
  a Group-A recap lens; carried forward as the base of the BB→BC lineage.)
- **Shipped:** 4.0.0 tagged; the `proof:ba-gestalt` 9-surface roster + the `--run full` union-at-cut
  discipline established. But the close was **over-claimed** — `--run local` was green while
  `release`/`ci` carried 18 reds, the cardinal-lesson ledger silently parsed 0 rows, and
  `proof:ba-gestalt` checked only desktop-PNG existence (BB.md §"the BA seed's structural root
  causes"). The 6-round R3→R8 re-open cycle (the same 9-surface matrix re-opened ≥7 surfaces the
  SAME day) is the origin of the whole gestalt-bar apparatus.
- **Remains / deferred:** the BA close defects became BB's Batch-0 INTEGRITY mandate (W-CI-GREEN,
  W-CLOSE-BATTERY, W-LEDGER-REPAIR, W-GESTALT-GATE2). Those landed.
- **Quality retro:** the reset was necessary; the over-claimed close seeded the "source-green"
  disease that BB then inherited and amplified.
- **Version cut:** **v4.0.0** (`master`; BA merged with provenance per `MEMORY.md`).

---

## 2. BB (the integrity + liquid-glass band) — NO own cut; source-complete, 0/33 painted

- **Set out (BB.md §1):** an INTEGRITY floor FIRST (cure BA's close-lie), then forward work — 8
  batches + a cross-repo PRIMITIVES band, later amended with 4 more (liquid-glass, deep-SOTA,
  coherence-harden, viz-suite, constellation-modernize). ~71 rows at the PROGRESS total, growing to
  ~90+ executed per git. Version strategy: fold everything into ONE 4.1.0 cut, run the full
  `local ∪ ci ∪ release` battery siblings-absent before the tag.
- **Shipped (git-verified, `72ad6a20`…`533d94f5`):** a large volume of REAL, well-designed
  mechanism — the liquid-glass band (W-LIQUID-REVEAL / W-LIQUIDHOVER / W-LENSING / W-GLASS-ACCENT /
  W-BUTTON-GLASS / W-DEEP-GLASS / W-METAL-SHIMMER, genuinely composing ONE spring substrate + ONE
  specular-writer across 7 waves), the WebGPU-first substrate (`useWebGPUCanvas.ts`, the third thin
  backend), the god-module carves (W-CARVE3/4/5), a dozen chronic DECIDEs (W-NDA-DECIDE retired the
  5-tranche native-drawer chronic; W-AUR-KUWAHARA landed the 3-tranche painterly residual;
  W-INVALID-RING / W-DARK-INK-WARM MET their chronics). Mechanism-authoring: real and substantial,
  live on disk today.
- **The false close (A1, verbatim):** BB's headline *"33/33 waves born-RED→GREEN complete, master CI
  green"* is **git-committed self-admitted false** one tranche later — `2a182648`: *"BB=33/33 built /
  0/33 painted (W-REFLECT3 never ran)."* There is NO `BB.W-CLOSE`/`BB.W-REFLECT3` commit and NO
  `docs/tranches/BB/FINAL.md`; the next commits on `master` are BC's. **BB's mechanism landed; BB's
  verification-and-close did not happen inside BB** — it was absorbed, repeated, and executed one
  tranche later by BC (`fd0cc367` "proof:ba-gestalt 16/16 PASS", `02f5a1f8` "the honest 4.1.0 cut,"
  which caught 8 latent issues *the BB close never caught*).
- **Remains / deferred (named, A1 §3):** Lighthouse + CSS-critical were SPEC in BB's PROGRESS.md and
  actually landed under **BC.W-LIGHTHOUSE / BC.W-CSS-CRITICAL** (CLAUDE.md launders the attribution
  into "BB Batch 3" language); the dock-rail seat re-opened one tranche later (BE `DockStack
  mode=facets`); `useGlassBackdropLuminance` 2nd-consumer HELD (honest); goo `uSatColor`
  per-satellite color BOOKED 4.x (still open); the ~28 disposition books RESTAMPED but the restamp
  shows `reStampedAt:"BC"` not `"BB"` (the restamp did not durably take).
- **Live present-tense finding (A1 GF5, re-verified TODAY):** `node scripts/proof-no-god-module.mjs`
  = **FAIL** — `glass/ladder.css` 527L + `dock/shell.css` 510L over the 500 bound, plus **16
  re-grandfathered `RATCHET_BASELINES`** including `GlassDock.vue` at 711L (the exact file BB carved
  three times). The ratchet is engineered to make regrowth GRANDFATHERABLE rather than blocking — it
  normalizes the disease it was built to kill. Carried to `W-GOD-MODULE-STRUCTURAL` (GA-4, family F6).
- **Quality retro (five axes):**
  - *Missing-obvious:* a 90-wave tranche funneling EVERY visual claim through one un-executed
    terminal wave is an obvious single point of failure a designer flags on sight.
  - *Gestalt-cohesion:* the CSS/composable output is unusually cohesive for its size; cohesion breaks
    at the TRANCHE level — the plan's gestalt (wave rows say done) diverged completely from the
    product's gestalt (0 painted).
  - *Over-contrivance:* the close-integrity apparatus ITSELF (W-CLOSE-BATTERY / W-GESTALT-GATE2 /
    W-VISUAL-RUNNER / dozens of self-test bites) — a whole meta-layer of ceremony whose own
    completion was never verified. The gate-BUILDING was good; the gate-USING failed.
  - *Poor-encapsulation:* not BB's dominant mode (its substrate-reuse discipline is real); the one
    regression is the ratchet re-admitting 711L god-modules as fresh baselines.
  - *Lacking-elegance:* W-CARVE3→4→5 — carving the SAME god-module class to ∅ THREE times in one
    tranche — is textbook patch-instead-of-transpose.
- **Version cut:** **NONE of its own.** BB is source-complete; the cut ran under BC as v4.1.0.

---

## 3. BC → v4.1.0 (the "BB-disease cure") — 96 waves, SHIPPED (`9c0e06e2`)

- **Set out (A2 §1):** the structural thesis *"gates must measure PAINT, per-wave, not source
  funneled to one terminal reflect wave."* 96 waves (grown from 70 via 4 reopenings) across 12
  bands: Forensics → Verification-transposition → Glass-identity → Dock → Tabs → Procedural-viz(18)
  → Page-standardization → Controls → Motion-canon → Safari → Storybook-meta → Cross-repo+cut →
  Performance.
- **Shipped (verified, `EXECUTION-PROGRESS.md` tiers 0-27 all DONE, cut `9c0e06e2` → v4.1.0):**
  `proof:ba-gestalt` rewritten as a ci-blocking pixel reader; the warm-cream floor (130/130 π
  real-GPU); the DOCK-ENGINE rebuild (one engine replacing `dockMorphContext`+`useDockState`+
  `useLayerTransition`+morph-bridge — the dual-FLIP fold BB never did); WebGPU-first for all 11
  procedural viz (the metaball WGSL `var target` reserved-word bug fixed — GooBlob had silently run
  WebGL2 forever, undetected by BB); 90 hand-rolled headings migrated onto `StorySection`;
  `RADIO-FIX` (radios literally didn't toggle — a stray `pointer-events:auto` on a `::before`);
  BC.W-LIGHTHOUSE (achieved-not-provisional floor) + BC.W-CSS-CRITICAL (47.3% gzip critical split).
  **Cut:** v4.1.0 published with npm provenance; the full 345-gate battery ran siblings-absent.
- **Remains / deferred (named, A2 §1):** blob Snell-refraction (`ay-w-blob-glass-snell`, HELD —
  only the fwidth-fix landed); blob pulse-zeta-bounce + flick-pseudopod (HELD to MEATBALL, which
  fixed the WGSL bug NOT the spring tune → re-booked `BD.W-BLOB-MOTION-TUNE`); per-satellite derived
  shade (GL color-fence not widened); aurora medium lazy-chunk split (still one monolithic
  `FRAGMENT_SRC`); the 23 register-held primitives (re-stamped `reStampedAt:"BC"`, un-graduated).
- **The load-bearing finding (A2 §3, = GF1):** BC's paint gate demonstrably NARROWED the disease
  (a truly gray slab now reds) but did NOT close it. BD's greenfield re-diagnosed BC's OWN shipped
  `GLASS-IDENTITY`/`BUTTON-GLASS-IOS` work as **still reading gray** — `BD/greenfield/buttons/
  GOLDEN.md:9-20`: shipped BC default Button rest fill = `oklab chroma 0.0138`, "NEAR-GRAY," root
  cause `--glass-tint-strength: 0%` at `:root`. The gate measured token chroma (warm) and never
  composited the REST-STATE paint over a real backdrop. **BC proved you can paint-gate individual
  tokens/surfaces and still ship gray glass as a whole-page gestalt.**
- **Process finding (A2 F4):** the diverse-lens **challenge→harden** ritual was a **plan-graph
  linter, not a design review** — all 16 CHALLENGE-1 findings are dangling-reference / phantom-wave /
  sequencing defects; ZERO concern whether a surface reads as liquid glass. Future retrospectives
  must stop citing "N challenge iterations, 0 gaps" as design-quality evidence — it is plan-document
  hygiene only.
- **Quality retro (five axes):** *Missing-obvious* — buttons-still-gray shipped green (the token
  gate can't see composited grayness). *Gestalt-cohesion* — the 3-legged glass fix (warm-plate +
  colorful-field + defined-edge) shipped 1 of 3 legs and closed the wave green. *Over-contrivance* —
  the 19-iteration convergence ceremony solved plan soundness, not design quality. *Encapsulation* —
  largely sound; the WGSL bug-for-a-tranche shows the paint gate's isolation blind spot.
  *Lacking-elegance* — the DOCK-ENGINE fold IS the elegant transposition BB deferred (a genuine
  positive).
- **Version cut:** **v4.1.0** (`9c0e06e2`, 2026-06-20, npm provenance).

---

## 4. BD → v4.2.0 (the UNION tranche) — the tranche the verdict indicts hardest

- **Set out (A3):** a UNION of BC/BD/BE/BF plans across ~100 sessions, driven by a first-principles
  greenfield-hardening framework (brainstorm-3 → golden → challenge-3 → delta-assay →
  wave-amendment), grounded in frame-by-frame video audits (iOS-27 liquid-dock, aurora, Siri,
  Maps-card) + a 118-page Pass-E storybook audit. Law: perfected glass morphism (needs a COLORFUL
  FIELD + a defined edge), paper morphism, audacious typography, cartoon+technicolor, liquid-weight
  UNIVERSAL, ARISTOTELIAN proportion, meatballing PERFECT in Chrome AND Safari, iOS-27 demos + the
  NEW directives (metallic-aurora ×2, dot-flow surpass, shadcn-abrogate, warm-cream-glass-
  everywhere, goo-morph worm, dock-as-generalized-hub, Siri island+waveform).
- **Shipped (verified on disk, `P-bd-coverage.md` concurs):** a SOUND primitive spine, **0
  primitives re-invented** — `glass-capsule.css` (143L, 11 consumers), `useMorphField` (21KB), the
  ONE `GooFilter` (Glass/DockGooFilter = 0 src refs), the `--dock-live` convex blend (the
  `--dock-root-ratio/-scale` machinery DELETED), the substrate size-unify, the ScrollCard family,
  cartoon-cast inert-child. The greenfield "union-not-fork" thesis HELD.
- **And yet — the five axes concentrate here, structurally:** (1) the integration/shell layer
  shipped BROKEN — an `AppShell.vue` route-transition freeze (three coexisting mechanisms:
  `<Transition>` + `.scroll-build` mount-anim + a bloom-find-child DOM hack + two no-op VT watchers)
  hid EVERY shipped page behind a 356-gate-green close; a static metallic `.paper-field` wash (conic
  cel-sheen + 4 radials + feTurbulence + a 42s drift) shipped where the user asked for a LIVE
  aurora; the hero over-scale (`heroScale ≥ 4` FLOOR forcing 352px) INVERTED its own "chrome title
  ~2× smaller" directive; the in-place dock morph shipped as a MODAL; the persistent-ℱ removal was
  narrated-done but never executed. (2) the greenfield PROCESS was over-contrived — a Band-E
  "consistency gate" that was a string-presence `re.test` never summed into exit code (the fake-gate
  self-finding — WHY 356-green ≠ working UX); a §6 ledger that closed 30% of Band-C debt on paper.
  (3) Pass-E — the 118-page audit the user commissioned — is **4-of-11 categories converged**
  (dock/forms/foundations/substrates GESTALT'd; display/containers/data/feedback/navigation/
  compositions + motion NEVER converged — ~104 of 156 pages never got the deep audit).
- **Remains / deferred — the GENUINE no-carrier gaps (A3, grep-verified ZERO buildable wave):**
  1. **metallic-aurora ×2** — fully de-risked (`MEDIUM_ID` ceiling at kuwahara==7 → metal is uMedium
     8/9; discarded `Gx/Gy` tensor; WGSL cursor-light net-new) but only an authoring-STUB, no cursor
     row. The user's irony: metallic *shipped as the disgusting `.paper-field` wash*, the register
     the user actually asked for remains unbuilt.
  2. **blurred-image-bg** — aurora's FIRST texture pipeline (net-new; ZERO sampler in src). No carrier.
  3. **the dot-flow ADVECTION `flow` register** — the part that "surpassed the reference" (GPGPU
     state-texture + two-FBO trail + warm-fire ramp); BG's rebuild carries only the halftone-field.
  4. **the story-page SUB-TYPE taxonomy** (`DemoStage/Specimen/Interaction/Matrix/Composition`) —
     flattened out of `W-STORY-PAGE-API` entirely; the conformity-with-variation mechanism is gone.
  5. **the aristotelian-proportion edict** — one of 8 core laws, ZERO wave, ZERO gate.
- **The sharpest un-carried finding (A3, load-bearing = GF2):** `TRANCHE-GESTALT-META §3.3` (BD's own
  second-eyes) raised the transposition the user invited — **is the AX.W54 glass-first MAXIMAL default
  itself over-reached?** CLAUDE.md admits "the glass blur is imperceptible over a flat substrate," so
  glass-everywhere-without-a-colorful-backdrop is **invisible-by-construction** (the DOMINANT "buttons
  largely invisible" frustration). Grep confirms NO BG wave carries the over-reach question or the
  defined-edge-default fix. Carried to `W-GLASS-DEFAULT-DEFINITION` (GA-1, family F2).
- **Quality retro:** all five axes concentrate in the shell; the primitives are ~90% sound. The
  `.paper-field` accretion faking what one `<Aurora>` gives for free is the canonical lacking-elegance
  specimen — and BG's now-landed `W-FIELD-AURORA` is EXACTLY the transposition BD shipped as accretion.
- **Version cut:** **v4.2.0** (tag `91c6ca18` on the current branch; master `998136bb` is its ancestor;
  published 2026-06-25, provenance run 28164924541).

---

## 5. BE / BF (plan-only, folded into BD) — the POSITIVE process counter-example

- **What they were (A4):** BE = "iOS-27 liquid-glass alignment · the DOCK as hallmark · de-shadcn
  form" (39 wave specs / 10 bands; the dock-fission/context-silhouette/now-playing/rail-realize
  centerpiece; 8 commits of real engine code on a side branch + a liquid-morph V↔H prototype). BF =
  BE's scheduled CONVERGENCE successor (31 wave specs / 8 bands, written AFTER the BD union so its
  specs cite real post-union line numbers; its `DEFERRED-CENSUS.md` = 32 finest-grained D-rows).
  **Neither ran a tranche close.**
- **What executed:** the BD union cherry-picked BE's ENGINES (mechanism code) + gates into 4.2.0
  WITHOUT running BF's wiring/paint/Safari waves — so those engines landed **demo-private or
  mis-wired**: `useDockFission` (604L), `useDockContextSilhouette` (551L, one comment-only ref),
  `DockStack mode=facets` + `railProjection.ts`, `useBloomUp` (449L, wired into the route-freeze
  hack), `fission-bridge.css` (the spanning-filament fidelity never landed); + `useCelebrationBurst`
  (261L) / `useHaptic` (138L) DEAD-on-arrival (0 real call-sites).
- **The KEY output — did any BE/BF content fall through the fold? NO.** Three independent passes
  confirm: `proof:be-bf-ledger` (`scripts/proof-be-bf-ledger.mjs`) derives its 70-item corpus from
  disk, requires one of three sound dispositions per row, cross-checks every `NEVER-BUILT`
  destination against the locked BG registry — **live GREEN, 0 failures** (27 LANDED-no-build / 33
  NEVER-BUILT-names-wave / 10 RETIRE). The finer 32-item `DEFERRED-CENSUS.md` is separately threaded;
  every D-item resolves to the SAME BG destination the wave-level ledger derived. The 10 RETIRE rows
  are individually sound (GlassControl / DockNowPlaying genuinely absent; aurora satin/prism RETIREs
  consistent with the GL-fence).
- **Remains / deferred:** everything routes to real, scheduled BG waves (see §6/§7). The ONE genuine
  residual is a live chronic, correctly named: **`BG.W-DOCK-FISSION-WIRE` is the THIRD attempt** at
  wiring the dock-fission engine to a real consumer (BE built it, BF specced `DockNowPlaying` which
  never shipped) — the plan text forecloses a 4th re-book, which is the correct gestalt response, but
  it needs a MACHINE tripwire (`proof:nda-decided`-shape: FAIL if `useDockFission` ships <2 real SFC
  consumers), not prose (GA-8, F5-A4).
- **Quality retro:** the 70-wave + 32-item disposition ledger, gate-locked and GREEN, is **the
  single cleanest piece of process discipline in the whole corpus** — the template for any future
  half-executed-tranche situation. No silent drops.
- **Version cut:** **NONE** (plan-only; engines folded into BD's v4.2.0).

---

## 6. BG (the shell-breakage cure + the frontier) — current, HONEST

- **Set out:** cure the BD shell breakage + carry the remaining 12-workstream (WS1–WS12) frontier
  toward the joint 5.0.0 cut. Joint with BH.
- **Shipped / DONE (A5, verified — the cleanest cursor of the lineage):** ~26 rows DONE (16 BG + 10
  BH), ~2 PAINT-PENDING, ~116 PENDING of ≈144. The `git log v4.2.0..HEAD -- src demo scripts`
  code-change set is a **bijection** with the DONE code-bearing rows (no phantom, no green-lie).
  Landed: Stage-0 ground-freeze (WS7, 6/7), all BH [C] concurrent-safe waves, **WS1 shell/routing/
  field 7/7** (the BD shell cure — `W-ROUTE-TRANSITION` `89dc3dee`, `W-FIELD-AURORA` `274a2a6e` with
  18 paint PNGs, `W-HERO-FIT` `e47f31ad`, scroll-progress rail, paper-grain-optin), 2 WS3 rows + 2
  PAINT-PENDING, 1 WS4 row (`CATEGORY-CARD-WARM`, a user-reported metallic-wash defect that jumped
  the queue), + 3 LX live-fixes. Only ~9 DONE waves touch `src/` shipped code — the rest are
  ledgers/gates/scaffolds.
- **Remains (~116 PENDING, in build order):** the frontier is `0.7 BG.W-CLOSEFIX-9SITE` (lands
  FIRST), then `WS3 → WS2 dock → WS5 viz → WS6 siri → WS4 components/demo → WS7 close-machine → WS8
  glass-deep (C-SAFARI ★★★) → WS9 paper-deep → WS10 de-shadcn → WS11 storybook → WS12 coherence
  capstone (the 480-capture verdict) → BH [WS12] post-close → 19.1 BG.W-CUT (5.0.0, user-gated) →
  19.2 B4f CLAUDE.md hard-delete (absolute last).`
- **Findings (A5, both hygiene-not-correctness):** (F1) **83 GB / 99 stale worktrees** on stale
  HEADs (the stale-worktree-trap class; a resource sink + re-seed hazard → `sweepStaleWorktrees()`
  engine step, GA-12). (F2) **row `2.7 BG.W-VT-ROUTE-ENHANCE` is DONE-but-NOT-BUILT** — status DONE,
  cell text "DEFERRED-NOT-BUILT… marked DONE to skip the build frontier" — the DONE-inflation disease
  replicated in the cursor built to cure it (→ status DEFERRED, GA-12).
- **The uncarried ROOTS at pass-1 close:** GF1 (composited-gestalt gate), GF2 (glass-default
  definition), GF3 (Fable/DesignSync) — all now designed into the amended plan (families F2/F8).
- **Quality retro:** the cursor is honest and correctly ordered; the frontier is intact. The
  contribution of the audit is attacking the QUALITY of the remaining ~110 waves (contrivance,
  granularity, encapsulation, elegance), not their correctness.
- **Version cut:** **v5.0.0** (PENDING, joint with BH, user-gated at row 19.1).

---

## 7. BH (repo-cleanup / de-indirection / 5.0.0-restructure) — current, RIGHT-SIZED

- **Set out (A6):** the disciplined de-indirection tranche cut JOINTLY with BG as 5.0.0 — hard-delete
  CLAUDE.md (no replacement), clean-break export reshape (drop `/api` + 2 sibling asks), 719-specifier
  alias codemod, kf `^5` + value.js peer destraddle. 8 bands B0–B7, ~34 cursor rows.
- **Shipped / DONE (A6, verified byte-for-byte on disk):** **12 of ~34 rows DONE, 22 PENDING** — all
  concurrent-safe bands executed cleanly with real gates. B0 git-hygiene, B1 legacy-excision (lucide
  externalize `7813a695`, value destraddle `0d6b9f8a` — `package.json` now single `^1.0.0`, dragmorph
  snap-excise `ba23c086` — `useDragMorph.ts:325` ships `snap:` against kf 5.1.0), B2 alias-codemod
  (719 specifiers → `@glass/*`), B4 archive-refresh + skeleton + precept-extract + evidence-prune, B6
  core-prompts. The two coherence-audit folds propagated into BOTH `PLAN.md` and the BG-tree — one of
  the few multi-tranche cross-references that holds up byte-for-byte.
- **Remains (22 PENDING):** B2.5/B2.4b/c leaf-verifies (gate on WS2/WS4/WS5), B3 demo-restructure ×6
  (gate on WS4), B4b-f docs finalization (B4f CLAUDE.md-delete is the ABSOLUTE-LAST wave), B5 gate
  consolidation, B7 cross-repo asks. All gate on 6 distinct BG waypoints; DAG internally consistent,
  zero contradictions found.
- **Findings (A6):** (1) a live-tracked C1 **pairing debt** — `useDragMorph.ts` ships `snap:` against
  a `^5.0.0` peer floor (the kf floor not yet bumped to `^5.1.0`), so a consumer pinned exactly
  `5.0.x` gets a **live drag-to-snap no-op TODAY**; the mitigation (both fixes land together at the
  WS12 joint cut) is sound but relies on operational discipline (never tag mid-window) — arguably owes
  a named "no publish between B1-W3 and B2.1-swap" gate. (2) **ONE fold-symmetry gap survived both
  coherence passes** — `EXECUTION-PROGRESS.md` rows **18.11** ("2 by-name asks" → should be "4";
  `proof:crossrepo-asks` → `:bh`) and **19.2** (carries BOTH the superseded bare-`rg` form AND
  `proof:claude-deletable` side-by-side — the "two forms, one can never pass" pattern the fold was
  built to kill), while the sibling PLAN.md copies were correctly updated. (Note: the ask count is
  **4** everywhere per SYNTHESIS ruling #3 — `publish-and-cut §4` corrected.)
- **Quality retro:** BH is the **positive counter-example** — a de-indirection tranche that resisted
  wave-per-sub-symptom (all 6 B3 demo moves are ONE band gated by a single route-walk, not 6 gates).
  Proportionate, file-scoped, each wave has a real checkable gate. **NOT a pruning target.**
- **Version cut:** **v5.0.0** (PENDING, joint with BG).

---

## 8. The version ledger (at a glance)

| Tranche | Own cut | Commit / note | Painted-verified? |
|---|---|---|---|
| BA | **v4.0.0** | provenance | close over-claimed (18 release reds hidden) |
| BB | — (none) | source-complete; 0/33 painted | **NO** — funneled to `W-REFLECT3`, never ran |
| BC | **v4.1.0** | `9c0e06e2` (98 commits past v4.0.1) | YES per-wave, but token-level (composited blind) |
| BD | **v4.2.0** | tag `91c6ca18` (`998136bb` ancestor) | 356-gate-green ≠ working shell |
| BE/BF | — (plan-only) | folded into BD; `proof:be-bf-ledger` GREEN | n/a (engines demo-private/mis-wired) |
| BG | **v5.0.0** (pending) | joint, user-gated (row 19.1) | per-wave dual-engine; cursor HONEST |
| BH | **v5.0.0** (pending) | joint | de-indirection; right-sized |

---

## 9. Cross-references (the fold destinations, coordinate with SYNTHESIS §3 families)

- The composited-gestalt gate (GF1/GA-2) → **`W-COMPOSITED-GESTALT-GATE`**, family **F8** (Close/Cut).
- The glass-default definition (GF2/GA-1) → **`W-GLASS-DEFAULT-DEFINITION`**, family **F2** (Glass).
- The Fable/DesignSync per-visual-wave arm (GF3/GA-3) → **`W-FABLE-DESIGN-ARM`**, family **F8**.
- The god-module structural fix (GF5/GA-4) → **`W-GOD-MODULE-STRUCTURAL`**, family **F6** (Components/API).
- The 5 no-carrier BD registers + aristotelian (GF6/GA-5) → viz sub-band (WS5) + demo family **F7**
  (see DEFERRAL-LEDGER for the per-item carrier).
- The ~6 speculative RETIREs (GF7/GA-6) → **`W-SPECULATIVE-RETIRE`** (ledger flip, no pixels).
- The deep-glass 20px DECIDE (GF8/GA-7) → **`W-DEEP-GLASS-DECIDE`**, family **F2**.
- The jubilance/dead-engine 3-way → **DELETE at the major** (SYNTHESIS ruling #2): one clean-break cut
  owning `useHaptic` + `useCelebrationBurst` + `useVizChoreography` + `useLiquidMorph` (+ its 850L
  `liquid-morph.css`) + `useDockContextSilhouette` + `useScrollPin`/`useScrollScene`-fold + the lying
  `useHaptic` evidence doc; one MIGRATION row each.
- The BC "never built" correction (GF4/GA-11) → `P-historical-coverage.md:26` plan-doc-edit.
- Full item→disposition→carrier→lock detail: see **DEFERRAL-LEDGER.md**. Full mandate coverage: see
  **PROMPT-COVERAGE.md**.
</content>
</invoke>
