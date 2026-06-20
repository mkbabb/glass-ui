# BD FOLD-LEDGER — the no-silent-drop ledger

Every deferred item, cross-repo ask, and challenge-thread surfaced by the 12 BD audit findings, each mapped to a DECIDED disposition. NOTHING dropped. A disposition is one of: **→BD.W-<id>** (a BD wave builds/decides it), **HELD-trigger** (a tracked hold with its named un-MET trigger), or **RETIRE-rationale** (retired-with-rationale into the fold). A fold is a disposition FLIP in place; no row is deleted (L-inv-8).

The machine-readable companion is the BD.W-FOLD-LEDGER.json wave (band 9). This .md is the human-readable map.

---

## Class A — Glass material quality-uplift books

| Item | Origin | Disposition | Trigger / rationale |
|---|---|---|---|
| Deep-glass full 20px / saturate-1.8 push | T6 / BC.W-GLASS-LEGIBILITY-MEASURED | **→BD.W-DEEP-GLASS-20PX** | profile:budget per-frame cost clears; else re-stamp HELD (the recorded conservative fall — the full 20px stays booked if the budget bites). |
| Chromatic-aberration RGB-split lens rim (--glass-lens-chroma) | T2 / BB.W-LENSING | **→BD.W-GLASS-LENS-CHROMA** | RE-DECIDE first (confirm no BC.W-GLASS-LEGIBILITY-MEASURED verdict closed it); if still booked + perf clears (3 SVG passes), ships; else HELD with the perf number. |

## Class B — Procedural-viz GL-fence tails + the parity debt

| Item | Origin | Disposition | Trigger / rationale |
|---|---|---|---|
| Real-Metal-GPU cross-backend parity readback (all 5 viz) | W-REFLECT3 deferral / FINAL.md:23 / bb-w-reflect3 | **→BD.W-VIZ-PARITY-METAL** | The binding live readback (structural-proxy ΔE 0.0 is NOT proof). Runs on real hardware; the ΔE bar (mean≤2.0/p99≤5.0) verified. THE single biggest owed item. |
| Aurora WGSL per-dab Starry-Night stroke cascade | T4 / phantom-w-aurora-wgpu-mediums | **→BD.W-AURORA-WGSL-STROKES** | A vangogh hero on WebGPU-only Safari gets the Kuwahara stand-in, not the per-dab read. GL-fence: .frag byte-untouched, WGSL matched in lockstep. |
| Aurora WGSL warpMode==3 (curl) branch | curl-fbm.md:59-61 | **→BD.W-AURORA-WGSL-CURL** | The CURL_FBM_WGSL chunk already ships (paper-grid consumer) — a mechanical splice closing the cross-backend warp-mode gap. |
| Multi-pass anisotropic-Kuwahara FBO pipeline (USER-HINGE) | ay-w-aur-t5-kuwahara | **→BD.W-AURORA-KUWAHARA-MULTIPASS** | USER-HINGE — surface with the live aurora; the user may DECLINE (single-pass is sufficient). If declined, re-stamp DECIDED-HOLD with the user verdict (terminal, not a re-book). Needs its OWN consumer + substrate decision. |
| Goo per-satellite derived-shade color (uSatColor) | BA-VJS-5 / T15 / ay-blob-per-satellite-derived-shade | **→BD.W-GOOBLOB-SAT-SHADE** | The conditional trigger FIRES — BD.W-AURORA-WGSL-STROKES + BD.W-GOOBLOB-SQUIRCLE-REFRACT re-touch the shader anyway, sanctioning the GL-color-seam widen. Reads value.js OKLCh. |
| Goo dome-Z squircle ⁴√ switch | RESEARCH.md:150-153 | **→BD.W-GOOBLOB-SQUIRCLE-REFRACT (arm 1)** | Unconditional + cheap (a shader re-touch coupled with sat-shade). |
| Goo uBackdrop Snell refraction | ay-w-blob-glass-snell / az-blob-ubackdrop-conditions-unmet | **→BD.W-GOOBLOB-SQUIRCLE-REFRACT (arm 2, conditional)** | The live blob is on a rebuilt floor — re-test the frame budget. If it clears, the portable WebGL2 uBackdrop sampler ships (NOT a DOM-sampling API); else re-stamp HELD with the budget number. |
| Goo click pulse-zeta underdamp tune | ay-blob-pulse-zeta-bounce | **→BD.W-BLOB-MOTION-TUNE (arm 1)** | A one-constant tune on the working blob (now in hand). |
| Goo flick-pseudopod stretch-axis read | ay-blob-flick-pseudopod-copy | **→BD.W-BLOB-MOTION-TUNE (arm 2)** | Either make the stretch axis read OR honest-down the demo copy on the live walk (a recorded either-or, not a re-book). |
| Fourier/constellation GPU compute neighbor-bin | W-FOURIER-GPU / W-CONSTELLATION-GPU / gpu-parity-table | **→BD.W-VIZ-COMPUTE-DENSITY (GATED)** | Ships ONLY if a real dense-count (N≫256) / ≥2-binary consumer fires; else re-stamp HELD (the all-pairs scan handles count=64 — building blind is overfit substrate, J-inv-10). |
| .frag/.glsl WebGL2-fallback retirement | PROCEDURAL-SUITE.md:104-105 | **→BD.W-VIZ-FALLBACK-RETIRE-WATCH (WATCH)** | Re-affirm the fence HOLDS (the ~5-10% non-WebGPU tail has not closed); proof:gpu-substrate-single clause B blocks a premature strand. Re-check the Baseline number; re-stamp HELD. NO delete. |
| watercolor-dot WebGPU migration | PROC risk | **RETIRE-rationale** | PERMANENTLY OUT — mounts ZERO drawing context; a GPU context for one decorative dot regresses the ~8-context-per-page cap. The canonical "mark NOT to migrate, with the reason" case. Never a wave. |

## Class C — kf / value.js republish-gated consumes (foreign-tree fenced)

| Item | Origin | Disposition | Trigger / rationale |
|---|---|---|---|
| kf Oscillator/waveformValue loop-clock consume | T5 / INFORM-1 / asks-and-consumes.md:18 | **→BD.W-KF-OSCILLATOR-CONSUME (BOOKED)** | kf republishes the LIGHT Oscillator past 4.3.0. Interim (de-synced sine/uTime) is KEEP-until-republish. NO peer-spine widen. NO build until it fires. |
| kf Draggable snap/bounds/rubberBand consume | asks-and-consumes.md:20 / useDragMorph.ts:281 CONSUME marker | **→BD.W-KF-DRAGSNAP-CONSUME (BOOKED)** | kf republishes the snap/bounds/rubberBand DragOptions. Interim (reset+decayRest+spring.target re-roll) works on 4.3.0 today. The rubberBand overscroll is the deferred-polish leg. |
| value.js /color subpath footprint-shrink (7 import sites) | INFORM-4(b) / KF-BC INFORM-4 | **→BD.W-VALUEJS-COLOR-SUBPATH (BOOKED)** | value.js O publishes the /color subpath in 0.14.x+. The peer (^0.13.0 \|\| ^1.0.0) is already forward-compatible. NO build against a non-existent subpath. |

## Class D — Cross-repo sibling adopt sweep (sibling-owned, by-name asks)

| Item | Origin | Disposition | Trigger / rationale |
|---|---|---|---|
| SPEEDTEST-ADOPT (5-interim consume-and-delete + ^4.x bump) | EXECUTION-PROGRESS Tier 28 / SPEEDTEST-BC.md | **→BD.W-CROSSREPO-ADOPT-SWEEP** | Sibling-owned; glass-ui drives by-name + verifies a REAL install+typecheck on speedtest. The ?aurora=css/App.vue/register.css interims delete on the bump. File-Bounds gate reds any ../speedtest write-path. |
| ATLAS-ASK (^3.12.0 d6-strand → ^4.x + eight-needs delete) | EXECUTION-PROGRESS Tier 28 / ATLAS-BC.md | **→BD.W-CROSSREPO-ADOPT-SWEEP** | Sibling-owned. The GlassPanel retire is HELD-FOLDED green until the Atlas's 3 SFCs (HoverCard.vue:44,420 · AuroraVeilStage.vue:30,72 · GalleryView.vue:13,175) consume-and-delete `<GlassPanel>` AND the registry-consumer probe re-confirms ZERO live external consumers (the green-handshake; a silent prune forbidden — the AY-retire-then-AZ-restore defense). |
| FOURIER-ASK (^4.0.0 → ^4.x + phantom-classes Q.W4 patch) | EXECUTION-PROGRESS Tier 28 / FOURIER-BC.md | **→BD.W-CROSSREPO-ADOPT-SWEEP** | Sibling-owned. The un-applied phantom-classes patch lands in fourier on its bump. |
| Slides 3.13.0→4.x adopt (1 pin + 2 edits) + production redeploy | mem-slides-production-held-down / mem-slides-fc-honesty-unpushed | **→BD.W-SLIDES-REDEPLOY (HELD — user-gated)** | The terminal, irreversible-public, user-gated H-DEPLOY step. The adopt lands in the slides tree; the redeploy waits on the explicit user greenlight after a live-paint gestalt PASS. Never auto-push. |
| FourierField-ROOT hero warm-lean (the ONE glass-ui-side slides red) | mem-fourierfield-root-hero-warm-lean / R5-11 | **→BD.W-SLIDES-REDEPLOY (in-repo arm) — VERIFY against HEAD** | The fix is glass-ui FourierField-ROOT (an in-repo wave, not a slides edit). VERIFY it has not already been discharged by the BC viz band; if owed, it is a small glass-ui fix gating the slides redeploy. |

## Class E — kf-O ASK#2 ARIA re-open (the cut defect)

| Item | Origin | Disposition | Trigger / rationale |
|---|---|---|---|
| SegmentedTabs aria-orientation prohibited on role=group (ASK#2 RE-OPEN) | KF-O-ARIA-CORRECTION.md ASK-1′ | **→BD.W-ARIA-ORIENTATION-GUARD** | The genuine undischarged defect. The recorded KF-BC "CONFIRMED EMITTED" is a value-vs-role misidentification. Net-new SFC wave (BC.W-TABS-IOS byte-fenced the SFC). |
| The proof:tabs-ios orientation-absence clause (ASK-1′-GATE) | KF-O-ARIA-CORRECTION.md ASK-1′-GATE | **→BD.W-ARIA-ORIENTATION-GUARD (gate arm)** | Born-RED on HEAD (no orientation clause); GREEN at the fix + a self-test bite. |
| KF-BC.md:41,132 "content-hash"/"byte-fenced" over-claim reconcile | the cross-gate coupling | **→BD.W-ARIA-ORIENTATION-GUARD (lockstep arm)** | There is NO content-hash to re-snapshot — `proof:tabs-ios` T4 is a marker-presence + constant-band fence (`detectEngineFence`, NOT `createHash`; grep `createHash`/`content-hash`/`sha256` in `scripts/proof-tabs-ios.mjs` = ZERO), so the one-attribute SFC edit leaves T4 GREEN by construction. The lockstep arm is the DOC reconcile of KF-BC's over-claimed "content-hash"/"byte-fenced" language to the accurate "marker-presence fence". |
| KF-BC ASK#2 row reconcile + asks-and-consumes lockstep | KF-O checklist item 3 | **→BD.W-ARIA-ORIENTATION-GUARD (close arm)** | Re-open ASK#2 from "CONFIRMED EMITTED" to the role-conditional-guard disposition + the shipping version; reconcile the ledger so kf re-pins + deletes its S1 band-aids (kf edits its OWN tree). |

## Class F — Demo PAGES modernization (first + second half)

| Item | Origin | Disposition | Trigger / rationale |
|---|---|---|---|
| 36-file hand-rolled page-identity header paste | PA-a / storybook-dogfood GAP-2 | **→BD.W-PAGE-HEADER-FOLD** | Fold onto StorySectionHeader (heading-optional) or a StoryPageHeader sibling; PH3-safe (no body page-title `<h2>`). (36 verified: the inline `<header borderLeft>`+IconChip+span set, `grep -rl 'borderLeft:' demo/stories/` = 36; the `section-label--tinted` span grep returns 37 but the +1 is `compositions/settings.vue`'s settings-group labels — no header, no IconChip — NOT a page-identity paste.) |
| Off-token text-white/text-zinc over viz fills (6 sites) | PA-a | **→BD.W-PAGE-OFFTOKEN-SWEEP** | Re-point to text-foreground; identity-restoring, not a new color event. |
| Token-tour raw swatch/table triplets (radii/shadows/section/pulse/motion/separator) | PA-a / ShowcaseFrame docstring | **→BD.W-TOKEN-TOUR-GLASS** | Compose ShowcaseFrame/`<Card>` + consume the BC glass band (deep-glass/lensing/glass-accent), GL-free over the static wash. |
| navigation/toc-tracking .themed-card + raw bg-primary/10 ToC chrome | PA-a / BA.W-MENU-GLASS | **→BD.W-TOC-MENU-GLASS** | Re-point onto `.glass-menu-row` + `--on-glass-muted`; retire `.themed-card` (clean break). |
| Residual forms/dialog hand-rolled card wrappers | PA-a | **→BD.W-FORMS-CARD-FOLD** | Fold onto `<Card>`/ShowcaseFrame; dialog.vue:122's raw rounded-2xl → --radius-card. |
| Data-band M9A raw-triplet baseline (12 stories) | PA-b / idiom-audit §2 M9a | **→BD.W-DATA-BAND-GLASS** | Drain to ∅; tier=field/resting per opaque-atom-allowlist; drained files LEAVE M9A_BASELINE. |
| Data-band raw text-admin-label section headers (6 stories) | PA-b / GAP-6 / az-hierarchy-library-wide | **→BD.W-DATA-BAND-HEADINGS** | Migrate onto `<StorySection heading>`; extend the enrolled set. |
| StorySectionHeader dead mint (0 adopters) | PA-b / idiom-audit §1 / PA-a orphan | **→BD.W-PAGE-HEADER-FOLD** (was →BD.W-SECTION-HEADER-THREAD, RETIRED) | The dead-mint cure folds into BD.W-PAGE-HEADER-FOLD: its 36 folded page-identity headers ARE the ≥2 real adopters, and its M9e-3 owns the existence-only → ≥2-real-adopters M9d gate-widen + the 0/1-adopter self-test bite (J-inv-10 substrate-without-consumer). See the THREAD RETIRE-rationale row below. |
| BD.W-SECTION-HEADER-THREAD (the candidate wave itself) | PA-b candidate | **RETIRE-rationale → folded into BD.W-PAGE-HEADER-FOLD** | DISK TRUTH (VERIFIED by reading): the EXACTLY 2 files it claimed as DISTINCT in-body IconChip-led section headers — `data/data-table.vue:159-178` + `data/table.vue:51-70` — carry ONLY their page-identity header (first child of `<StoryPage>`, eyebrow-only, no `<h2>`; the heading "Repositories" at `data-table.vue:185` is a SEPARATE `<StorySection heading>`). They ARE 2 of PAGE-HEADER-FOLD's 36 — there is NO distinct in-body IconChip-led section-header set on disk (settings.vue's 4 spans are plain settings-group labels — no header, no IconChip, the 37th `section-label--tinted` span grep match but NOT in PAGE-HEADER-FOLD's 36-file inline-borderLeft paste set; progress.vue's 2nd span is a BorderProgress caption — neither IconChip-led). The "disjoint paste-set" premise is physically false; the two waves double-claimed the same 2 DOM nodes with contradictory heading-absent (PAGE-HEADER-FOLD M9e-4) vs heading-present (THREAD M9d) gate arms. RETIRED — the wave-spec file is deleted (count 44→43), its ≥2-adopter gate-widen + self-test fold into PAGE-HEADER-FOLD's M9e-3, the dead-mint cure is discharged ONCE with 36 real adopters. No silent drop (this row records it). |
| Data-band zero --section-color-9 identity event (12 stories) | PA-b / ba-icon-pops-w60-breadth / az-suffuse-library-wide | **→BD.W-DATA-SUFFUSE** | Thread the ONE color event per surface (proportion fence; proof:suffuse d1-d3 green). |
| M9A regex escapes (scrolling-text rounded-md, tags-input shadow-cartoon-sm) | PA-b | **→BD.W-MISSED-SLAB-CENSUS** | Re-thread + widen TRIPLET_RE to catch the variants (the anti-gameability hole). |
| Data-band M9B raw-button baseline (4 stories) | PA-b / idiom-audit §2 M9b | **→BD.W-DATA-RAW-BUTTONS** | Re-thread onto glass `<Button>`; drained files LEAVE M9B_BASELINE. |

## Class G — Precept canon (the BC cut lessons + the home-map drift)

| Item | Origin | Disposition | Trigger / rationale |
|---|---|---|---|
| CI-accurate close discipline (full battery, siblings+submodule absent) | PRE / commits 9c0e06e2/ae3e64e5/a021439a | **→BD.W-CLOSE-DISCIPLINE-CANON** | Canonize in SPEC.md §Close + LESSONS; names the gate/ceremony seam (Q-chron-3). |
| 3 close-time bug classes (recursion guard / submodule-skip / volatile-tracked-artefact) | PRE | **→BD.W-CLOSE-DISCIPLINE-CANON** | Recorded as the all-green-cut surface the mid-tranche battery never reaches. |
| Absent-submodule skip-by-policy convention (6 gates) | PRE / commit 9c0e06e2 | **→BD.W-SUBMODULE-SKIP-POLICY** | Canonize as a gate-authoring rule; narrow-clause-only (every non-submodule clause keeps biting). |
| liveArmCiGraceSkip π-arm CI-grace-skip (27 gates) | PRE / commit a021439a | **→BD.W-LIVE-ARM-CI-GRACE-CANON** | Canonize the gate-side grace-skip mechanism; narrow-arm (live real-browser arm only). |
| design-idioms §3 home-map drift (5 unhomed registers) | PRE | **→BD.W-HOMEMAP-RESYNC** | Add the §3 rows + widen proof:precept-current W2 to non-top-level partials (a BUILD). |
| precepts README stale index (P1-P6, omits 3 precepts) | PRE | **→BD.W-PRECEPTS-README-FRESHEN** | Freshen + (optional) proof:precepts-index gate. |
| LESSONS-LEARNED stops at AY (zero BB/BC) | PRE | **→BD.W-LESSONS-BB-BC-BACKFILL** | Backfill the BB deferral-disease + the BC cut-bug classes (Source/Failure/Rule/Check). |

## Class H — CLAUDE.md coherence (count drift + contradiction + missing canon)

| Item | Origin | Disposition | Trigger / rationale |
|---|---|---|---|
| ui/ "42 dirs" (disk 43) + "68/76/72 subpaths" (disk 89) + "9/8 sub-trees" (disk 11) | CMD | **→BD.W-DOC-COUNT-SYNC** | Re-sync + extend proof:claude-structure-sync to ui/+subpath+composables (DERIVED, not frozen). The JS-subpath count is the gate-canonical 89 (`proof:subpath-enumeration` `jsSubpathExports()`: 96 export keys − 1 `./` root − 6 CSS/font = 89). |
| /virtual RETIRED-vs-reshipped contradiction + /pager mismatch | CMD | **→BD.W-VIRTUAL-RESHIP-RECONCILE** | Reconcile :422 with :196 + the live ./virtual; correct :144 /pager → /pager-dots. |
| BC.W-DESHADCN governing-principle canon (zero CLAUDE.md presence) | CMD | **→BD.W-DESHADCN-CANON** | Add the reka=behavior/glass-ui=material invariant + proof:no-shadcn-default lock. |
| BC per-component canon (SELECTION-CARD/GLASS-IDENTITY/DIALOG-GLASS/TABS-IOS/CODE-BLOCKS/GHOST-DASHED/SEPARATOR-FIX/RADIO-FIX/CONTROL-SMOOTH/PADDING-CANON) | CMD | **→BD.W-BC-COMPONENT-CANON** | Add the per-component notes; VERIFY each gate name on disk (the proof:separator caveat — do not invent a gate). |
| BC.W-BUTTON-GLASS-IOS modify directive un-applied + metric-hover note | CMD | **→BD.W-BUTTON-GLASS-IOS-NOTE** | Update the press/blur registers (0.25/0.7 → 0.15/0.86; 8→floating); VERIFY against the shipped Button.vue. |
| 77-of-96 BC waves unmentioned (most legit no-ops) | CMD | **HELD — no-op (the no-op IS the recorded outcome)** | The legitimate no-ops carry no new canon; only the named waves (Class H above) owe a note. No re-book — the no-op is terminal. |

## Class I — The standing fold-machine arms

| Item | Origin | Disposition | Trigger / rationale |
|---|---|---|---|
| 28 DISPOSITION-REGISTER min-consumers-n:2 watches (reStampedAt BC) | DF / BB.W-DISPOSITION-RESTAMP | **→BD.W-DISPOSITION-RESTAMP** | Re-stamp reStampedAt:"BD" in-place; graduate any that crossed ≥2; no-delete fence (L-inv-8). Re-check the CSS-feature Baseline books (cross-document-vt/directional-view-transition). |
| AY weak-keeps (sortable-list, typewriter) | DF / ay-weak-keeps | **→BD.W-WEAK-KEEP-REGRADE** | Re-grade at the BD overfitting audit; cross the ≥2-bar or retire-with-rationale. |
| watercolor-dot KEEP-EVIDENCED (0 external call-sites) | DF / ay-watercolor-dot-evidence-keep | **→BD.W-WEAK-KEEP-REGRADE (HELD-evidenced)** | The evidence doc stands; re-grade only if value.js blob repatriation ships (the named trigger). |
| The BD no-silent-drop close-union | DF | **→BD.W-FOLD-LEDGER** | The ledger itself + proof:bd-fold-ledger (items == expectedCount, every item terminal). |
| The BD close oracle (grow + re-point proof:ba-gestalt → the BD tree) | DF / the BC roster-CLOSED handoff | **→BD.W-GESTALT-ROSTER-GROW** | The BD close oracle: grow + re-point proof:ba-gestalt to the BD tree so the BC anti-disease law is enforceable for BD repaints (the BB roster-never-grew disease, killed one tranche on). Mints the BD roster + the 16 per-surface freshness records, re-points the 4 gate consts (REFLECT_DIR/ROSTER/WAVES_DIR/TRANCHE_DIR) BC→BD, re-labels G6 BC→BD; the closed BC record stays read-only. Every band-2/3/4/5 per-wave verdict + W-CUT's terminal gestalt depend on it. |
| The terminal user-gated 4.x cut | PvE/CRA/DF | **→BD.W-CUT** | The CI-accurate close battery + the live-paint gestalt PASS gate it; user-domain version + publish. |

## Class J — Challenge-threads / resolved-do-not-reopen (the anti-stale-reopen fence)

| Item | Origin | Disposition | Trigger / rationale |
|---|---|---|---|
| aria-palette HELD verdict (Tier-16a) | DF risk | **RESOLVED — DO NOT re-open** | Discharged at Tier-16b (TEAL-NAVY-PURGE warmed blue→amber). Verify the live warm-cream paint; do NOT re-book from the stale 16a note. |
| The 213-item BC fold (99 BUILD/46 MET/65 HELD/2 RETIRE/1 SUPERSEDED) | DF | **CARRIED — the BC ledger is the prior-art** | Almost nothing silently owed; the BD residual is the HELD/BOOKED long-tail above. The closed BC items are not re-opened. |
| BB single-terminal-reflect disease | DF / PRE / PROC | **CURED at BC — carried as the binding LAW** | The "rides W-REFLECT3" pattern is FORBIDDEN (proof:ba-gestalt G8); every BD visual wave is per-wave paint-verified. Canonized as a precept (gestalt-first-capture.md) + backfilled into LESSONS (BD.W-LESSONS-BB-BC-BACKFILL). |
| The 6 CHALLENGE/CHALLENGE-REOPEN threads (BC corpus) | BC findings | **CLOSED at BC (2-consecutive-clean) — not re-opened** | The BC tranche converged on 2-consecutive-clean across 6 diverse lenses; the challenge threads are terminal. BD opens fresh on the residual, not the closed BC challenges. |

---

## No-silent-drop attestation

Every candidate-wave from the 12 findings is dispositioned above, AND every BD wave-file on disk (43, VERIFIED `ls docs/tranches/BD/waves/*.md | wc -l` = 43) carries a ledger row — including the close-oracle infra wave BD.W-GESTALT-ROSTER-GROW (Class I), which the band-2/3/4/5 per-wave verdicts + W-CUT depend on (its own §2:25 records this exact disposition). The one RETIRED candidate (BD.W-SECTION-HEADER-THREAD — disk-proven double-claim of the same 2 page-identity headers, folded into BD.W-PAGE-HEADER-FOLD) carries its Class-F RETIRE-rationale row above and has NO surviving wave-spec file (count 44→43); the no-delete fence (L-inv-8) applies to LEDGER rows, not to a candidate wave-spec retired-with-rationale into another wave — the row stays, the spec file is folded. The PvE BD.W-SUCCESSOR-AND-DOC-RESIDUE umbrella decomposed into Classes G/H/I (canon + doc + fold-machine) rather than a single wave. The two DF compute bookings (constellation/fourier) merged into one GATED wave (Class B). The CMD "77-of-96 unmentioned" is a recorded no-op (Class H, terminal). Nothing from any finding's candidateWaves[] or risks[] is unaccounted-for: the risks become the per-wave FENCES in CANDIDATE-WAVES.md and the disciplines in SEED.md §"binding disciplines carried forward".
