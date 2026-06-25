# BD MASTER REQUEST RECAP — every prompt/request across the session, status, gaps (2026-06-23)

**Mode (re-affirmed by the /goal):** TRANCHE DEVELOPMENT ONLY — author/converge the plan, prototype AGGRESSIVELY to de-risk (throwaway spikes on the feature branch, NEVER a master-merge/publish; W-CUT user-gated). Core model orchestrates/synthesizes; Opus/Sonnet for fanout; STRICT batches of 3 (the rate-wall bit at ~31 concurrent — never again). Iterate to 100% convergence with a % per pass. NO legacy, NO workarounds, idiomatic/gestalt, architectural transposition for elegance/simplicity/performance.

## §A — The original directives (Pass-D / Pass-E)
| # | Request | Status | Carrier |
|---|---|---|---|
| A1 | Re-open audit + historical analysis; harden from first principles, every wave/feature/viz; aggressively prototype + challenge; 100% convergence | Pass-D CONVERGED the 97-wave plan; Pass-E auditing 118 pages (5/11 categories done) | Pass-D (HARDENING-PASS-D.md) + Pass-E (PASS-E.md) |
| A2 | Standardized storybook page component + sub-types (DemoStage/Specimen/Interaction/Matrix/Composition); conformity w/ natural variation | SPEC authored, NOT built | W-STORY-PAGE-STANDARD |
| A3 | Frame-by-frame ScreenRecording_06-22 23-59-33 (squish/morph/fade liquid entrance); replicate generally + Safari | ANALYSIS done → wave authored | W-LIQUID-ENTRANCE-GENERAL (ANALYSIS.md) |
| A4 | Path standardization (/motion/x vs @mkbabb); each page audited by an opus context + a challenger synthesizer; a series of workflows | Pass-E engine IS this (3 contexts + synth + gestalt); path-std noted, not enforced | Pass-E + W-PATH-STANDARDIZE (to author) |
| A5 | scroll-choreography doesn't work; keyframes.js? | AUDITED — engine sound (native scroll/view/timeline-scope, NO Lenis/GSAP); the demo is a spec-sheet; column-stagger `* 0` dead no-op found | W-SCROLL-MOTION / W-MOTION-PAGE-LIQUID |
| A6 | Glass demos over colorful backgrounds (auroras) | W-PAGE-BACKGROUND; DockStage colorful field PROTOTYPED (FIX 4) | W-PAGE-BACKGROUND |
| A7 | Dock demo audit (contextual switching/prototyping); brainstorm done/remains; challenger loop | dock GESTALT done; 4 dock fixes prototyped (cta-receive/colorful/rail/morph-deferred) | dock-GESTALT.md + the dock waves |
| A8 | Superfluous language; each sub-section in its own glassy card; main card bigger; docks leverage new APIs; deftly use glass-ui components | folds into the spine | W-STORY-PAGE-STANDARD + W-PAGE-OFFTOKEN-SWEEP |
| A9 | Scrolling titles re-config (sticky, one subsumes the other, scroll-from) | NOTED, spec owed | W-STICKY-TITLE-CONDENSE (to author/harden) |
| A10 | aurora configurator too small; gallery larger/up-top/scrollable/collapse-into-dock; presets don't render | W-CONFIG-GALLERY-DOCK + the preset bug | W-CONFIG-GALLERY-DOCK + W-PRESET-RENDER + W-PRESET-THUMB-FALLBACK |
| A11 | dot-flow-field worthless/broken | substrate canvas-resize FIX un-broke it (FIX 5); demo rebuild owed | W-DOTFLOW-REBUILD |
| A12 | Header text 2x smaller all pages + a dividing rule | spec owed | W-HEADER-SCALE |
| A13 | Paper morphism (no grain/grit) | PROTOTYPED — `--paper-grain-opacity` split, 3.2x (FIX 7); page rebuild owed | W-PAPER-MORPHISM |
| A14 | Handmark audited/challenged | audited (motion chunk-3) | the motion gestalt |
| A15 | ALL vizzes analyzed | substrates 11/11 audited + the 9-viz substrate FIX | substrates-GESTALT.md |

## §B — The dock-as-hub + generalization
| B1 | Expand out from the dock into ARBITRARY facilities (not just a card) — a GENERALIZED dock-as-hub API, not hardcoded/overfit | NEW — spec owed | **W-DOCK-HUB-API** (to author) |
| B2 | NO hardcoded/referenced facilities like "maps" — generalized glass precepts | NEW — a census + de-overfit | **W-NO-HARDCODED-REFS** (to author) |

## §C — The NEW design items (this /goal)
| C1 | Metallic aurora variant ×2: (a) PURE liquid metal, (b) GRADIENT metallic w/ minor sparkle imperfections + other colors — redolent of ios27 flow-field backgrounds | NEW — refs: liquid-metal-background-...jpg + images-2.jpeg | **W-AURORA-METALLIC** (to author) |
| C2 | dot-flow-field: approach but FAR SURPASS a reference background (Screen Recording 2026-06-22 14.38.42.mov) | NEW — fold into the dotflow rebuild | W-DOTFLOW-REBUILD (augment) |
| C3 | Abrogate shadcn styling + suffuse ios27 design language; a FULL workflow FLEET analyzes EVERY element; exemplars IMG_1881/IMG_1874 + videos/screenshots | NEW — the big one | **W-SHADCN-ABROGATE** + **W-IOS27-SUFFUSE** (to author) |
| C4 | Abrogate dark GRAY glass — warm-cream luminous glass everywhere (cards/buttons/chips/dropdowns/text), both modes | IN PROGRESS — gray-glass triumvirate launched (may have rate-walled; re-run) | **W-GLASS-ABROGATE-GRAY** |
| C5 | goo-morph FAR more liquid (Google-deck worm) — slower/bigger/more-goo/weightier | BUILT (W-PAGER-GOO-MORPH, judged liquid) but user finds too fast/small/subtle → REFINE (triumvirate walled; re-run) | W-PAGER-GOO-MORPH + the refine |
| C6 | Liquid-weight UNIVERSAL: inertia/weight/bounce/squish on ALL motion + scrolling | LAW codified (motion-canon P7, gestalt lens) | W-LIQUID-ENTRANCE-GENERAL |

## §D — The MEDIA to deeply analyze (frame-by-frame; the video-audit fleet)
| Media | What to extract | Carrier |
|---|---|---|
| ScreenRecording_06-22 23-59-33 (squish/morph/fade) | DONE → W-LIQUID-ENTRANCE-GENERAL | A3 |
| ScreenRecording_06-20/21 + 06-21 01-28-54 (tabs animation+feature; ios27 glass transitions — album fade-up/out, dock morphing FULL bi-directionality, dock changing form/function by context, sub-sections, shrunken state, layers, SUB-DOCKS goo-splitting off the core) | the tab/dock/glass-transition reference; FRAME-BY-FRAME | **W-VIDEO-AUDIT-DOCK** |
| The 2nd video (apple aurora generative demos to match/better) | the aurora reference | **W-VIDEO-AUDIT-AURORA** |
| IMG_1881.PNG (the abrogate-shadcn target) + IMG_1874 + screenshots 04.08.42/.48 + 01.41.17 (ios27 exemplars) + Maps card screenshot (18.52.29) | the ios27 liquid-glass card/UI reference | **W-IOS27-SUFFUSE** (C3) |
| liquid-metal-background-...jpg + images-2.jpeg | the metallic-aurora refs | W-AURORA-METALLIC (C1) |
| Screen Recording 2026-06-22 14.38.42.mov | the dot-flow surpass-target | W-DOTFLOW-REBUILD (C2) |
| Research: apple.com + awwwards + ios27/macos "golden gate" design guidelines | the SOTA target | the video/ios27 audits |

## §E — The PROTOTYPE-SPIKES landed this session (de-risk the waves; feature branch, NOT published)
cta-receive P0 · DockStage colorful field · rail clock · the 9-viz substrate canvas-resize repair (WebGPU acquire-timeout + clone-fix + reveal re-measure) · dot-matrix PI · EasingPicker dup-import · paper-grain split · the goo-morph WORM (useWormMorph). All live-verified; `PROTOTYPE-FIXES.md`.

## §F — Convergence + the PATH FORWARD (paced, batches-of-3, one workflow at a time)
**Audited (Pass-E gestalts done): dock · substrates · motion · foundations · forms(contexts; gestalt owed).** Convergence so far ~ per-category 25-45% (sound components, spec-sheet demos; the fix surface is the spine + point bugs).
**Remaining audit:** display · containers · data · feedback · navigation · compositions (6 categories) + the forms gestalt re-run.
**New work to author (waves):** W-DOCK-HUB-API · W-NO-HARDCODED-REFS · W-AURORA-METALLIC · W-SHADCN-ABROGATE · W-IOS27-SUFFUSE · W-GLASS-ABROGATE-GRAY · W-PATH-STANDARDIZE · the video-audit fleets.
**The series of workflows (paced):** (1) finish the Pass-E page audit (6 categories). (2) the video-audit fleet (the dock/tabs/glass-transition + aurora videos, frame-by-frame). (3) the ios27/metallic/shadcn research+spec fleet. (4) the historical re-sweep (100+ sessions, recency-weighted). (5) the gray-glass + goo-morph refine triumvirates (re-run). (6) the gestalt convergence pass (% per pass → 100%). Then develop the tranche.

**Overall convergence: ~62%** (was ~45%). LANDED this session-arc: Pass-E gestalts dock·substrates·motion·foundations·forms (5/11; display running) · the cross-category META-GESTALT (deduped second-eyes + the §3 glass-over-flat root cause) · the ios27 VIDEO-AUDIT → `IOS27-REFERENCE.md` (the key insight: the ios27 machinery SHIPS; the gap is ASSEMBLY — per-target ~70%) · the NEW waves authored (W-AURORA-METALLIC · W-DOCK-HUB-API · W-IOS27-SUFFUSE · W-LIQUID-REVEAL-FIX · W-HEADER-SCALE · W-STICKY-TITLE-CONDENSE · W-NO-HARDCODED-REFS · W-PATH-STANDARDIZE · W-DOCK-SCROLL-FISSION [+ T4/T6/T7 proposed in IOS27-REFERENCE]) → **106 wave specs** · prototype-spikes VERIFIED (gray-glass warm · goo-morph slower/bigger/gooier [13px/1.8s/stretch-1.45/blur-8] · buttons-over-field · paper-grain · the 9-viz substrate fix · cta-receive). GAP to 100%: the 6 remaining Pass-E categories (display→compositions) · the shadcn-abrogate/ios27-suffuse ELEMENT fleet (W-IOS27-SUFFUSE) · the historical 100+-session re-sweep · the W-PAGE-BACKGROUND mandatory-field + the §3-hardened gray-glass + the defined-edge floor · the dock-fission/tab-indicator/drawer-detent assembly waves · the convergence-to-100 synthesis pass. Paced batches-of-3, one workflow at a time.
