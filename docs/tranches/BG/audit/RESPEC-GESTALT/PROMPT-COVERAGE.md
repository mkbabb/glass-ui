# PROMPT-COVERAGE — the ALL-prompts / standing-mandate coverage matrix

**Deliverable 3 of 3, RESPEC-GESTALT audit (Lane DEV-D).** "Recap ALL of our prompts and requests
hitherto and ensure they've been addressed." Consolidated from A8 + the DIRECTIVE-LEDGER (94 canonical
directives) + SYNTHESIS-PASS1. Each row: mandate (verbatim/near) → where addressed (wave / commit /
gate, POST-restructure ids where applicable) → VERIFIED on disk? → gap + its fold. Disk-verified
2026-07-01, HEAD `306c3059`.

**How to read the ROW-level baseline:** `docs/tranches/BG/DIRECTIVE-LEDGER.md` already deduplicates
~1517 raw utterances into **94 canonical directives**, each mapped to one of 7 workstreams or an
explicit RETIRE, status judged against live-broken 4.2.0 (not a planning self-report). That machinery
is SOUND and not re-litigated. A8's job — and this matrix — is the DIFFERENT altitude: the mandates
that **post-date or sit OUTSIDE** that corpus (the ledger froze 06-25), the standing memory-edicts, and
the freshest process directive. **The coverage MATRIX is ~complete; the coverage ENFORCEMENT of the
newest + most-aesthetic mandates was missing** and is now folded.

---

## 1. Process / design-routing mandates (the freshest — the CRITICAL gaps)

| # | mandate (verbatim/near) | addressed by | verified on disk? | gap → fold |
|---|---|---|---|---|
| 1 | **Fable/DesignSync (2026-07-01):** *"Any and all frontend DESIGN work is done by FABLE instances via the frontend-design MCP; DesignSync syncs surfaces to a claude.ai/design project for card-based gestalt review, incrementally. Opus/sonnet fan-out for mechanical audit/build only. Every VISUAL wave names its Fable design arm + its DesignSync review surface."* | **`W-FABLE-DESIGN-ARM`** (F8) + a per-wave schema edit (every WS1–WS6 wave declares `fableArm` + `designSyncSurface`) | **NO — absent everywhere** (`grep Fable\|DesignSync` across all 4 folded plans = 0/0/0/0/0; `/design-sync` skill not in the running roster; DesignSync unprovisioned) | **CRITICAL (GF3/A8-F1).** Fold GA-3: schema edit + WS7 process wave stands up the skill/surface + makes "DesignSync returned a PASS gestalt verdict from Fable, not the building agent" a close precondition for every visual wave. Plan must NAME the Fable arm per visual wave even if tooling stands up in-flight. Without it the plan re-runs the exact opus-fanout-built-visuals pattern the user judged disastrous |
| 2 | **"This tranche set is the PERFECTION of the last set"** (2026-07-01) — the bar for every wave is the whole-product GESTALT, not local correctness | the entire amended plan shape (COLLAPSE 194→~50+14; the 3 root waves GA-1/GA-2/GA-3); acceptance-language in the gestalt review (GA-9) | **PARTIAL** — the SHAPE encodes it; the binding acceptance path was the missing piece (rows 1, 3) | Fold: the gestalt-cohesion axis becomes the acceptance LANGUAGE of `proof:ba-gestalt` + the DesignSync review (GA-9), not per-mechanism gates |
| 3 | **Band-0 aesthetic EDICTS enforced as edicts** — the 8/12 laws of animation UNIVERSAL, CARTOON + 1940s-technicolor punch, ARISTOTELIAN √φ proportion in all things | prose exists (`DESIGN.md:17/82/115/121-136`, `--ease-cartoon-punch`, `--motion-weight`, the 12-laws table) + per-mechanism gates (`proof-liquid-*`, `proof-card-cartoon-consumers`) | **NO gestalt path** — `ls scripts` for `aristotel\|technicolor\|proportion\|anticipat\|follow-through` = only the narrow cartoon-consumer census; no gate/wave asks "is proportion √φ? does the driver carry anticipation/follow-through? does it read technicolor-punch or flat?" | **MAJOR (GF15/A8-F2).** Fold GA-9: transpose the edicts INTO the gestalt review — each enrolled surface owes an explicit per-surface VERDICT on 3 axes (√φ-proportion-consistent · driver carries the animation laws · reads as technicolor cartoon-punch). Do NOT mint N mechanical gates (the ceremony disease). Also resolves `proof:ba-gestalt`-excluded-from-release at the same seam. The aristotelian machine half rides `W-ARISTOTELIAN-PROPORTION` (DEFERRAL-LEDGER §D5) |
| 4 | **NOT an implementation phase — tranche development only, from first principles, long-horizon multi-tranche refinement** | the whole RESPEC-GESTALT audit (spec-augmented design only, zero src edits) | **YES** | none — this deliverable IS the compliance |
| 5 | **Audit freeze** — RESPEC-GESTALT is the LAST audit; build resumes immediately after the fold | SYNTHESIS ruling #8 (C7-FC6); an audit:build commit-ratio ceiling goes in §E | **YES (ruling)** | Fold: encode the ratio ceiling in `EXECUTION-PLAN §E` |

---

## 2. Design-language mandates (SEED-CONTEXT §"Design language," non-negotiable)

| # | mandate | addressed by | verified? | gap → fold |
|---|---|---|---|---|
| 6 | **Liquid-glass / iOS-26-27 transmissive material** | the glass band (BB) + the F2 Glass family (`W-GLASS-REGISTER-UNIFY`/`W-GLASS-DEFAULT-DEFINITION`/`W-DEEP-GLASS-DECIDE`) | **PARTIAL** — material real, but glass-over-flat reads gray (GF1) + the maximal default is over-reached (GF2) | Fold GA-1 (`W-GLASS-DEFAULT-DEFINITION`) + GA-7 (`W-DEEP-GLASS-DECIDE`, ends the 5-tranche 16px-vs-Apple-20px gap) |
| 7 | **Warm-everywhere / no-gray (warm-amber, chroma floor)** | `proof:no-gray` + the BA warm-cream floor + BC glass-identity | **PARTIAL** — token warm, COMPOSITED still gray (GF1) | Fold GA-2 (`W-COMPOSITED-GESTALT-GATE`) — measure the composited whole, not the token |
| 8 | **W-DARK-MATERIAL luminous-dark (never charcoal)** | BA.W-DARK-MATERIAL (6 mechanisms) + BB.W-DARK-INK-WARM | **YES** (durable on disk) | none — protected set |
| 9 | **Compositor-only motion + PRM-carved** | `proof:no-layout-animation` (extended BB.W-MOTION-CANON) | **YES** | none — true-positive gate, protected |
| 10 | **Liquid-weight UNIVERSAL (inertia/weight/bounce on ALL motion)** | `W-LIQUID-WEIGHT-DEFAULT` (F5, GD-FOLD-4 — the TRANSITION-register default inversion: spatial legs inherit the spring-derived `linear()`, `.motion-calm` is the explicit opt-out) + the D4 `Motion` prop axis (`full\|reduced\|off`) | **PARTIAL** — `DESIGN.md:115` refines it to "universal on DRIVERS not every pixel" (thoughtful, POSITIVE per A8); BUT the flagship cohesion defect is un-closed: the **disclosure chevron paints in 3 registers** (Select spring-clock, Configurator wrong-clock, Accordion a FLAT `transition-transform duration-200` — verified `AccordionTrigger.vue:35`) and `proof:spring-ease` cannot even SEE the Tailwind-utility form (C2 F6) | Fold GD-FOLD-4 (default inversion + a Fable storybook sweep as its gate) + **`W-DISCLOSURE-ROTATE`** (FC-B8, one shared disclosure register) + extend the abrupt-spatial detector to see the Tailwind-utility form. The universal-ENTRANCE (`v-liquid-enter`) is a successor seed (ruling #6) |
| 11 | **spring-iff-spatial / bezier-iff-effect** | BB.W-MOTION-CANON P1 (`motion-canon.md`) | **YES** | none — protected (`SPRING_PRESETS` + per-spring clocks + SPATIAL/EFFECTS split) |
| 12 | **Tailwind v4 token-first** | J-invariant; every visual behaviour a CSS custom property | **YES** | none |
| 13 | **Clean breaks, NO legacy aliases** | the no-legacy law (`feedback_no_backwards_compat`); 5.0.0 major | **PARTIAL** — the DELETE cluster (DEFERRAL §A) + the `goo-blob→blob` rename (row 24) still owe | Fold: `W-DEAD-CUT` (ruling #2) + the BH export reshape (`/api` drop) discharge it at the major |
| 14 | **≥2-consumer bar / presets-in-consumers** | J-inv-10; the FOLD-LEDGER machine | **PARTIAL** — failing INWARD: the library holds ~6 speculative registers (dead spec-debt) on a "wants-it-someday" trigger | Fold GA-6 (`W-SPECULATIVE-RETIRE`, DEFERRAL §B) — the honest end of the inward failure |

---

## 3. The R-round + video-spec mandates (BD's directive corpus)

| # | mandate | addressed by | verified? | gap → fold |
|---|---|---|---|---|
| 15 | **Route-transition freeze fix** (every page hidden) | `BG.W-ROUTE-TRANSITION` (DONE `89dc3dee`) | **YES on disk** (`.route-enter` present, `.scroll-build` retired, `DEFAULT_PARALLAX=0`) | none |
| 16 | **Aurora-not-wash** (metallic `.paper-field` → live field) | `BG.W-FIELD-AURORA` (DONE `274a2a6e`, 18 paint PNGs) | **YES** | none — the elegant transposition BD shipped as accretion |
| 17 | **Hero over-scale fix** (chrome title ~2× smaller + dividing rule; the directive INVERTED) | `BG.W-HERO-FIT` (DONE `e47f31ad`) | **YES** | none |
| 18 | **Persistent-ℱ removal** (narrated-done, never executed in BD) | `BG.W-DOCK-PERSISTENT-CUT` (WS2) | **PENDING** | in-frontier; family F3 |
| 19 | **In-place dock morph** (BD shipped a MODAL; kill the crossfade facsimile) | `BG.W-DOCK-INPLACE-MORPH` (row 4.10, the HARDER BG directive) | **PENDING** | in-frontier; PROTECTED (4.10 preserve, ruling #4) |
| 20 | **shadcn-abrogate + iOS-27-suffuse** (a fleet analyzing EVERY element) | the `BG.W-DESHADCN-*` family (WS10) → collapse to ONE concern (F6) | **PENDING** | Fold: de-shadcn as ONE concern (F6), not a 5-wave family |
| 21 | **Siri island + waveform** (AUGMENT the dock, NOT a new component) | Siri as a DOCK CAPABILITY through the existing `.glass-dock-frame`/`#rail` escape (ruling #4) + ONE `proof:siri` family gate (4 arms) | **PARTIAL** — WS6 currently mints a net-new `SiriIsland` component family + a net-new WebGL viz + 4 gates (C2 F2/F3), contradicting "augment not new" | Fold ruling #4 / C2-FC2/FC3: no new published subpath, no `api/` entry; `SiriWaveform` demo-private until a real 2nd consumer (the `useGlassBackdropLuminance` precedent); 4 gates → ONE `proof:siri` |
| 22 | **dot-flow surpass-a-reference** | `BG.W-DOTFLOW-REBUILD` (AMEND to carry the advection `flow` register) | **PENDING + no-carrier residue** — the rebuild is halftone-field ONLY; the advection register (the part that surpassed) fell out | Fold DEFERRAL §D3 — AMEND to carry advection/trail-FBO/warm-fire |
| 23 | **goo-morph Google-deck-worm** (pager/deck dots morph between states — "remember this always") | `usePagerWorm.ts` + `useCarouselWorm.ts` + `morph-field.css` | **YES on disk (POSITIVE, A8)** | none — the specific ask is built |
| 24 | **`goo-blob → blob` clean-break rename** (named no-legacy debt) | scheduled into the BH restructure export reshape | **NO on disk** (`src/components/custom/goo-blob/` still, no `blob/`) | **MINOR (GF16/A8-F5).** Fold FC5 — a WS5 clean-break at 5.0.0 (renames free at a major) |
| 25 | **metallic-aurora ×2 / blurred-image-bg / aristotelian / story-sub-types** (BD greenfield, de-risked, no carrier) | `W-AUR-METAL-FINISH` · `W-AUR-IMAGE-SOURCE` · `W-ARISTOTELIAN-PROPORTION` · `W-STORY-PAGE-API` (AMEND) | **NO carrier at pass-1** | Fold DEFERRAL §D (GA-5) — the user's EXPLICIT fold mandate; five registers get real carriers |
| 26 | **iOS-27 canon** (dock as hallmark, stadium tabs, deep glass, cockpit) | BC/BD dock band + WS2 (protected near-verbatim, the model band) | **YES (band sound)** | none — WS2 preserved; protect 4.10 |
| 27 | **Chrome AND Safari (meatballing + liquid PERFECT)** | `BG.W-SAFARI-PARITY-GATE` (a BUILD wave) + C-SAFARI scoped (Tier-1 WebGL2 floor primary; FBO keystone re-opened as a small seam or drop-with-trigger, ruling / F2) | **PARTIAL** — the correctness gate is a BUILD wave; only the Metal-box p50 NUMBER defers (honest, KEEP-BOOKED) | Fold: C-SAFARI scoped honestly (SYNTHESIS §3 F2) |

---

## 4. Anti-amnesia / process-discipline mandates

| # | mandate | addressed by | verified? | gap → fold |
|---|---|---|---|---|
| 28 | **"Recap ALL prompts and ensure addressed / no silent drop"** | the `DIRECTIVE-LEDGER` (94 directives) + this matrix | **PARTIAL** — the ledger froze 06-25, so it CANNOT have mapped the 07-01 Fable directive; its own binding rule ("no silent drop… binding input to every workstream") is self-violated | **MODERATE (GF16/A8-F4).** Fold FC4 — re-stamp the ledger to 07-01 with a `§Process-Edicts` block (Fable/DesignSync routing + edict-gestalt-enforcement as explicit rows) |
| 29 | **Binding-verification sweep on version bumps** (stale reka prop/emit no-ops) | `proof:binding-sweep` (`FINAL.md:633` → G7) + the 480-capture dual-engine both-modes sweep | **YES (POSITIVE, A8)** — triggered exactly by the 5.0.0 kf-`^5` bump + `/api` reshape | none |
| 30 | **Gestalt-over-incremental / architectural transpositions over patches** | the whole COLLAPSE prescription + the 3 root waves (transpositions, not patches) | **YES (shape)** | none — the audit's core verb |
| 31 | **Delineate chronically-deferred items + fold them** | the DEFERRAL-LEDGER (this audit) + `FOLD-LEDGER.json` (135 rows, GREEN) | **YES** | see DEFERRAL-LEDGER.md §A–§H |
| 32 | **No quick solutions / no workarounds / idiomatic** | the amended plan's "gestalt approach, not a patch" per wave | **YES (discipline)** | none |
| 33 | **BC "never built" corpus correction** | `P-historical-coverage.md:26` plan-doc-edit (GA-11) | **NO — still disk-FALSE** (v4.1.0 = `9c0e06e2` refutes it) | Fold GA-11 — correct before any downstream wave cites it |
| 34 | **jubilance/dead-engine cleanup** ("wire ≥2 or delete per overfitting law") | **DELETE at the major** (SYNTHESIS ruling #2, supersedes the "demote" middle) | **PARTIAL** — the cursor mis-states it 3 ways (KEEP a false-consumer `useCelebrationBurst`, a lying `useHaptic` evidence doc, a triple-listed cut) | Fold ruling #2 / C2-FC1/FC4 — ONE `W-DEAD-CUT` owning the whole clean break (DEFERRAL §A) |
| 35 | **Fission-wire "no re-book a 4th time"** (BE built, BF specced, BG owns) | `BG.W-DOCK-FISSION-WIRE` + a machine tripwire (GA-8) | **PARTIAL** — prose guard exists; no machine fence | Fold GA-8 — `proof:nda-decided`-shape: FAIL if `useDockFission` ships <2 real SFC consumers |
| 36 | **Complete the commissioned 118-page Pass-E audit** | `BG.W-PAGE-COMPONENT-AUDIT` (AMEND to add a per-category convergence pass, GA-10) | **NO** — 4-of-11 categories converged; 17.6 is a capture-VERIFY of the roster, not a re-audit of the 7 missing (display/containers/data/feedback/navigation/compositions + motion) | Fold GA-10 — ~104 of 156 pages never got the deep audit; add the 3-context+synthesis+gestalt engine batched-3 over the 7 |

---

## 5. Hygiene / corpus-integrity mandates (bounded, downstream-safe)

| # | mandate | addressed by | verified? | gap → fold |
|---|---|---|---|---|
| 37 | **DONE means built (no DONE-inflation)** | GA-12 — status `2.7` DONE→DEFERRED + add DEFERRED/BOOKED to the frontier-skip-set | **NO** — `2.7 BG.W-VT-ROUTE-ENHANCE` is DONE-but-NOT-BUILT ("marked DONE to skip the build frontier") | Fold GA-12 — the DONE-inflation disease replicated in the cursor built to cure it |
| 38 | **Coherence fold symmetry** (both trees) | GA-12 — fix `EXECUTION-PROGRESS.md` rows 18.11 ("2"→"4" asks; `proof:crossrepo-asks`→`:bh`) + 19.2 (delete the bare-`rg` clause) | **NO** — both rows carry the pre-fold stale literals the fold targeted elsewhere (the "two forms, one can never pass" pattern in the cursor built to kill it) | Fold GA-12 — mirror the already-correct PLAN.md copies |
| 39 | **Worktree hygiene (step-0 reset deletes, not re-seeds)** | GA-12 — `sweepStaleWorktrees()` engine step + `verify-worktrees-fresh.mjs` tripwire | **NO** — 83 GB / 99 stale worktrees on stale HEADs | Fold GA-12 — kills F1 permanently (the stale-worktree-trap class) |
| 40 | **god-module ratchet (no god modules)** | `W-GOD-MODULE-STRUCTURAL` (F6, GA-4) | **NO — RED at HEAD** (`proof:no-god-module` FAIL: ladder.css 527L, shell.css 510L, 16 grandfathered incl. GlassDock.vue 711L) | Fold GA-4 — decompose the dock ONCE + harden the ratchet contract (drain over infinite re-baseline; shader-exemption preserved) |
| 41 | **pointer-physics "the ONE field"** | fold or defer-honest (C2-FC6) | **NO** — 3 pointer-velocity impls coexist (`usePointerVelocityField` + `cursorModel` + `useBlobPointer`); CLAUDE.md books the fold as "successor IFF byte-faithful" that never lands | Fold: `W-MOTION-SPINE` (F5) fold OR honest-defer with a real trigger (C2 FC6) — not a silent aspirational "ONE" through another tranche |
| 42 | **BOOKED detector completeness** | GA-12 — forbid bare-word `BOOKED` in src + add the `.css` arm | **NO** — detector sees 2 of 8 markers (bare-word blind, `.css` blind) | Fold GA-12 / DEFERRAL §G |

---

## 6. Coverage attestation

**~complete matrix, enforcement-gaps folded.** The ROW-level directive mapping (94 canonical) is sound
and covers the historical corpus. This matrix ADDS the enforcement of the newest + most-aesthetic
mandates: the Fable/DesignSync CRITICAL gap (row 1, GA-3), the Band-0 edict acceptance path (row 3,
GA-9), the 3-way dead-engine DELETE (row 34, ruling #2), the 5 no-carrier BD registers (row 25, GA-5),
the composited-gestalt + glass-default roots (rows 6/7, GA-1/GA-2), and the hygiene set (rows 33/37-42,
GA-11/GA-12). **Every UNADDRESSED row names its fold.** POSITIVE verifications recorded for fairness:
binding-sweep scheduled (row 29), goo-morph worm built (row 23), liquid-weight scoped-with-nuance (row
10, driver-vs-observer). The only mandate whose MECHANISM may be unprovisioned (not just unplanned) is
Fable/DesignSync (row 1) — the plan must NAME the Fable arm per visual wave even if the `/design-sync`
tooling stands up in-flight.
</content>
