# AV/G audit digest — the 4 audit streams condensed (for the authoring fleet)

Sources: Workflow A (32-agent deep tranche audit), Workflow B (32-agent aurora+blob spec), Workflow C (6-agent keyframes), live-validation (dev-server walk). The SOTA-research crosswalk (14-agent) folds in when it lands — leave a `## SOTA crosswalk (folded)` placeholder where a wave wants it.

---

## Stream A — deep tranche audit (the path forward)

**Verdict:** the session's AU+F work is **overwhelmingly idiomatic-gestalt (27/31 lanes)**. NO landed defect needs re-architecture. AV/G transpose only hygiene + the deferred-fold ledger.

**Transpose targets (hygiene, not defects):**
- `scheduleAfterFirstPaint` inline in useAurora (L74-107, Aurora-only) → extract `useIdleSchedule(task, timeout)` (two-rAF+setTimeout Safari fallback + cancel). [AV]
- 33 one-line subpath barrels at `src/` top level → `src/subpaths/` metadir (batch-resolve in vite.library.ts, zero runtime delta). [AV]
- orphaned top-level composables → domain sub-trees (`reactive/`, `platform/`). [AV]
- dock provide/inject boilerplate → `createDockContext<T>()` factory (−30-40 LOC). [AV]
- `src/api.ts` barrel MISSING (other 70 subpaths have one) + `/api` header tally drift (literal 32 type + 1 const block, not the claimed 70/67+3). [AV doc-currency]
- CLAUDE.md styles block omits `drawer.css`, `instrument-rail.css`, `fonts.css`. [AV doc-currency]

**shadow-cartoon-lg (user directive "it ships"):** glass-ui's `--shadow-cartoon-lg` ALREADY ships canonical — `tokens.css:563 → theme.css:295 → utilities.css:638 → cards.css:46`. The directive is SATISFIED library-side. AV action: document the consumer-overridable token contract (decks parametrize via override, NOT re-declaration). G action: reconcile the slides side onto the canonical token per the directive (the `feedback-coder/theme.css:127` `--shadow-cartoon-lg: 7px 7px` is a dead local re-declaration; reconcile to consume glass-ui's token, or — if the user wants the deck literally shipping shadow-cartoon-lg — wire it to the @theme token, NOT a dead orphan).

**DEFERRED-FOLD LEDGER:**
- FOLD-AV: useCountup/v-reveal (slides DeckNav 1 real + demo → ≥2; AT-disjoint, open now); Card cartoon dark-arm lift (7 liftable, FG.W-card-badge); useIdleSchedule (if 2nd consumer).
- AV-GATED: Drawer `:native`/GlassNativeDrawer (muster live-behind FIRM, 2nd native consumer UNMET → author IFF cleared, else KEEP-BOOK).
- KEEP-BOOK (trigger named): anchor-positioning (reka no per-content yield), `<Role>Dock` base (keyframes D.W5 = E1b conditional), proof:webgl-golden (headless WebGL2 runner debt), text-box-trim (AS→AT→AU 3-tranche chronic, 0 SFC consumers).
- FOLD-G: F.W-dock-consume pin-bump (gated on 3.3.0 npm), F-01 close-hack retire (→ Dialog showClose, shipped AU.W9), feedback-coder shadow orphan reconcile, constellation RAF-park → useRAFLoop/useIntersectionPause, drawAnomaly skin extract.
- KEEP-BOOK-G: FG.W-deck (/deck lift, ≥2 UNMET — _fixture dev-only; unblock = AV demo Deck story), useCanvas2D (Canvas2D≠WebGL, 2nd consumer gate).

**PROMPT-COVERAGE:** every engagement ask DONE (dock-motion, splits, defineModel, strict-templates, idiom-lift, vueuse-free, Fraunces, /color, useWebGLCanvas, blob trio, a11y sites, W9 folds, slides progress/few-dollars/pptx/squish/XRAY/constellation/11→6, keyframes LIGHT). OPEN-FOLDs: mid-range 700-1000px tablet band (G decide), /deck consumer #2 (AV demo story), doc-currency (AV.W0), slides CLAUDE.md (G.W0).

**A's AV plan (6 waves; aurora-fix is ADDED ahead of these as the user-mandated headline):** W0 formalize+doc-currency · W1 motion-composables · W2 shadow-contract+supply · W3 Drawer-native+Card-cartoon · W4 transpositions · W5 gate-hardening+close.

**Cross-repo post-3.3.0:** single hinge E1 (glass-ui 3.3.0→npm, USER-DOMAIN) fans to keyframes D.W5 (dock rename) ∥ slides G.W1 (pin-bump+deploy) ∥ muster/speedtest. value.js 0.11.0 (M tranche) publishes first (the ^0.11.0 peer). E1b `<Role>Dock` reciprocal conditional. AV.W0-W1 are AT-disjoint, open before the publish.

---

## Stream B — aurora + blob spec (the AURORA FIX headline)

**AURORA OETF DEFECT (CORRECTNESS, user-mandated "fix aurora") — conclusively located:**
- `aurora.frag.ts:817` outputs `fragColor = vec4(col * uAlpha, uAlpha)` in **linear sRGB without the sRGB OETF** → ~2.2× too dark (linear 0.5 displays as ~0.215).
- The palette is baked to linear sRGB (`color.ts:50-54` oklchToLinear; `DESIGN.md:150` documents it); the whole shader (palette interp, nuclei field, mediums, saturate3, ACES tonemap, grain — `:793-817`) operates in linear; output never applies the OETF.
- The blob does it RIGHT: `metaball.frag.ts:277-278` applies `linearToSrgb()` (defined `:132-137`, value.js gamma-2.4 transfer: slope 12.92, transition 0.04045/12.92) before output.
- **THE FIX (idiomatic, copy the blob's path):** add `linearToSrgb()` to aurora.frag.ts (copy from metaball.frag.ts:132-137) + insert `col = linearToSrgb(col);` before `:817` + re-bake all 11 presets (Sky/Dawn/Meadow/Deliberative/Day9/Oil-Impasto/Oil-Gestural/Oil-VanGogh/Crayon-Sunset/Crayon-Rainbow/Crayon-Ocean) via profile-aurora.mjs + update DESIGN.md §7 + re-bless every aurora snapshot.
- **GATE:** the `proof:blob-space-gamma` gate (flipsToLinear=yes AND hasOetf=true) currently covers the blob ONLY → extend to aurora as `proof:aurora-space-gamma` (or widen the existing gate to both shaders). Add a shader-equivalence test (linear→gamma output matches expected sRGB within float tolerance).

**AURORA QUALITY GAPS (vs the blob's W7 SOTA):**
- Missing fwidth-based stroke AA: aurora uses fixed smoothstep bands (`:493-494,:509-510,:554-558`, 0.88-1.02 unit range) that don't scale with zoom/DPR → strokes alias/blur. Adopt `float aa = max(fwidth(d), 1e-6); alpha = 1.0 - smoothstep(-aa, aa, d);` (blob `metaball.frag.ts:252-255`).
- FBM rotated-octave banding prevention: ALREADY correct (aurora `:124,:128` mat2(0.8,0.6,-0.6,0.8) matches blob FBM_ROT) — no change.
- smin: aurora uses Gaussian softmax (`:206-234`), NOT Quilez smin. Gaussian is ACCEPTABLE for aurora's atmospheric aesthetic — KEEP (note the choice; do not force the blob's smin).
- per-pixel color perturbation: absent in aurora (preset-authored only). The blob has OKLCh-space fbm perturbation (`metaball.frag.ts:262-275`). LOW priority feature gap, not correctness.

**AURORA↔BLOB CONVERGENCE (the headline transposition):** aurora + goo-blob both ride useWebGLCanvas, both bake OKLCh→linear, both need the OETF, both use rotated-octave FBM, both use the Ottosson OKLCh matrices. Converge the duplicated shader math onto a SHARED procedural-shader color/noise GLSL chunk (the `linearToSrgb` OETF + the FBM rotated-octave + the OKLCh↔OKLab matrices + smin) that both shaders `#include`/inline from one source — deletes the duplication + guarantees the OETF can never again diverge between them (the root of this very bug). Plus: converge both onto the injected ColorResolver seam (the /color leaf). This is the AV blob-converge wave.

**Blob itself:** correct at HEAD (W7). Minor refinements only. The glsl-port relocation to __tests__ (the SB-1 fix) left the color story coherent.

---

## Stream C — keyframes.js (the value.js-free folds for AV)

- keyframes D+E delivered the engine transposition (zero-alloc AnimationGroup, tick→advanceTo, FrameCompiler split, honest pause/resume). Published 3.0.0. LIGHT barrel value.js-free.
- **E.W10 shipped a NEW value.js-free ORCHESTRATION TIER on the LIGHT barrel: `stagger`, `flip`/`flipShared`, `drag`/`decay`, `Sequence`, `animate()`** — glass-ui AV can ADOPT these (the dock, the timeline, useStaggerReveal could consume stagger/flip; the motion composables could consume Sequence). value.js-free → root-barrel-safe.
- **E.W9 modern-platform adoption: @property registry, live PRM listener, native CSS Color L4 interp, native ScrollTimeline/ViewTimeline additive bridge** — aligns with glass-ui's scroll-driven + VT work; AV could consume the native-scroll bridge.
- The dock driver seam is correct (SpringProgress.play, one solver build+runtime, peer ^2.2.0||^3.0.0). No seam risk.
- D.W5 (dock rename TopDock→ChromeDock etc. + `<Role>Dock` E1b) is GATED on glass-ui 3.3.0 publish; keyframes heartbeat b5gt704vz auto-resumes. AV cross-repo: ship the publish, the rename follows.
- **Highest-value AV fold:** adopt the keyframes LIGHT orchestration tier (stagger/flip/Sequence) into glass-ui's motion composables (useStaggerReveal, the new useCountup/v-reveal) — value.js-free, one solver, deletes any hand-rolled stagger/sequence in glass-ui.

---

## Stream live-validation (LV-1 — fold into G)

Both apps run clean (slides :5174 + gu-demo :5176). F.W1 lock affordance + DeckGate glass + the 6-slide deck-rework all confirmed LIVE; 0 console errors. **LV-1 (NEW): all 6 slide components emit the Vue `markRaw` perf warning — `deck.ts`'s `content.slides[].component` are made deeply reactive.** Fold: `markRaw` the slide component refs (or shallowRef the manifest) — idiomatic KISS perf fix the snapshot tests never surface. → G.W0.

The aurora canvas renders live (WebGL2 armed) — the OETF darkening is code-confirmed (Stream B).
