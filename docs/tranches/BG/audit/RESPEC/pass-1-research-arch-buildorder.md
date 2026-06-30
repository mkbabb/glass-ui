# PASS-1 RESEARCH — ARCHITECTURE / CONVERGENCE-CEILING / BUILD-ORDER

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `9dfe285c` · **Base:** `master` (`998136bb`, 121 commits behind) · **pkg:** `4.2.0` (cut target 5.0.0)
**Lens:** the DEPENDENCY GRAPH + build-ORDER soundness given what WS1/WS3 taught; the convergence CEILING; keep/amend/restart per WORKSTREAM; is the joint BG+BH interleave still the right cut shape.
**Method:** read FINAL.md §8 (build order) + `bg-build-map.md` (the wave-by-wave order + critical path) + `bh-interleave-map.md`; cross-read the 6 sibling PASS-1 reports (cursor-truth / clobber / code-vs-spec / gate-reality / paint-integrity / bh-restructure) to avoid re-deriving the per-row landed-band verification they own; VALIDATE the load-bearing dependency EDGES against live code (the over-500 reds, the WS8 cross-WS marker, the glass-deep survival, the WS2 5→1 SpringProgress target, useDockSpring absence). siblings-intact exit 0 (before). READ-ONLY; wrote only this file.

---

## 0. BOTTOM LINE

**The dependency graph is ACYCLIC, the edges are REAL, and the build ORDER is structurally SOUND — KEEP it.** Every gating edge the spec names resolves against live code: WS1 ROUTE-TRANSITION is the widest fan-out (gates all SPA paint-verify); WS1 FIELD-AURORA already laid the `[data-glass-field-canvas]` marker WS8 BACKDROP-SAMPLE needs (the "named cross-WS gap" is partially de-risked at HEAD); WS3 owns the blur/cast/clip register with WS2 as peer-consumer; WS2 UNIFY's 5→1 `SpringProgress` convergence target is exactly 5 sites today and `useDockSpring` is correctly absent (WS6 SIRI-ISLAND born-RED until it lands). **ZERO RESTART candidates at the workstream level** — the spec corpus is first-principles and internally consistent, matching all four code-touching siblings.

**The build-order RISK is not the graph — it is the SCHEDULE of the convergence ceiling.** Three structural sequencing hazards, all AMEND-the-order (none is a spec defect):

1. **WS3-as-spine landed the EASY HALF FIRST.** Only the field-independent / token-collapse rows landed (3.1/3.6/3.7); the BLOCKING convergence-CEILING rows — **3.3 GLASS-CLIP-DISCIPLINE (Safari-26 Job-B sign-off, the spec's literal "convergence CEILING (BLOCKING)") + 3.4 SAFARI-BLUR-LITERAL** — and the WS1-field-gated chromatic rows (3.5/3.8/3.9/3.10) are entirely PENDING. WS8/WS12 read this spine. The deep-morphism band is specced to build on a spine whose hardest rows are unbought.

2. **C-SAFARI (the ★★★ 3-wave chronic) is scheduled STRUCTURALLY LATE (WS8, phase 13) — on top of ~9 workstreams.** The single item most likely to miss a 4th time sits at the far end of the longest chain. WS8's own `W-REFRACT-WEBGL` ("build-INDEPENDENT, lands in src/ NOW") + `W-GLASS-SUFFUSE-UNIVERSAL` ("field-independent, lands NOW") are EXTRACTABLE as an EARLY feasibility spike — the deep-glass Safari refraction divergence should be proven (or the raster-fallback escape engaged) at the FRONT, not discovered after the stack commits.

3. **The glass token cascade is the recurring clobber hot-file, and the carve discipline lands AFTER the bands that grow it.** `ladder.css` (527) + `shell.css` (510) are ALREADY over the 500-line bound (live close reds); every remaining WS3/WS8/WS9/WS10/WS12 wave grows these files further, and the WS4 carve/colocation discipline is scheduled AFTER WS8/WS9. The close-battery reds will COMPOUND across the whole deep-morphism band unless a cascade carve (or an explicit ratchet re-pin) moves EARLIER.

**The joint BG+BH interleave cut shape is RIGHT for a 5.0.0 major** (the export break + CLAUDE.md delete belong in the major), but the BH restructure's center of mass is `[WS12]` — a back-loaded serial tail stacked on the biggest paint risk. AMEND the SCHEDULE (incremental doc-redistribute as each WS lands), not the shape.

---

## 1. THE DEPENDENCY GRAPH (validated against live code)

The build order `WS1 → WS3 → WS2 → WS5 → WS6 → WS4 → WS7` (core) → `WS8 → WS9 → WS10 → WS11` (deep-morphism) → `WS12` (capstone) is a real DAG. Every edge below was checked against HEAD:

```
WS7·PAINT-IS-THE-GATE ─────────────────────────────────────────► (tag-blocker, builds FIRST) [LANDED, born-RED]
        │
WS1·ROUTE-TRANSITION ──► gates ALL SPA-nav paint-verify (the WIDEST fan-out, every downstream π) [LANDED]
        │
WS1·FIELD-AURORA ──► exposes [data-glass-field-canvas] on the live shell-aurora ctx ──┐ [LANDED; marker present AppShell:328]
        │                                                                              │
WS3 (owns unified blur/cast/clip register) ──► WS2 PEER-consumes the blur seam        │
        │   ├─ 3.1/3.6/3.7 EASY HALF [LANDED, paint-pending]                          │
        │   └─ 3.3/3.4 SAFARI CEILING + 3.5/3.8/3.9/3.10 chromatic [PENDING] ◄── the unbought half
        │                                                                              │
WS2·DOCK-MORPH-UNIFY ──► useDockSpring (5 SpringProgress → 1) ──► WS6·SIRI-ISLAND (HARD, born-RED till it lands)
        │
WS5 (viz) ──► WS4 CANVAS-LIFECYCLE-LEAVES / UNIFORM-LAYOUT carves (re-measure POST-WS5)
        │
WS4 ──► W0 DESHADCN-SWEEP ──► WS10 ci arms (strict W0 precondition)
        │   └─ scroll-shrink HARD-deps WS1; the WS1+WS4 integration branch ──► gates WS11 wholesale
        │
WS8·GLASS-BACKDROP-SAMPLE (keystone) ◄── WS1 shell-aurora ctx + the marker (cross-WS gap, satisfied at HEAD)
        │
WS9·GU-1 --glass-key-direction token (lands FIRST) ──► WS8 bevel + WS12 A6 spine BOTH read it
        │
WS10·DESHADCN (after WS4-W0) → WS11·STORY-PAGE-API (on the WS1+WS4 integration branch) → WS12 (480-capture, post-integration)
        │
WS7·CUT (the tag fires LAST, --run ship over the served roster)
```

**Edge-validation evidence (live code):**

| Claimed edge | Verified at HEAD | Verdict |
|---|---|---|
| WS8 BACKDROP-SAMPLE needs WS1's `[data-glass-field-canvas]` marker | `demo/layout/AppShell.vue:328` carries it; `useGlassBackdropLuminance.ts:231` reads it | **gap ALREADY satisfied by landed WS1** |
| WS2 UNIFY collapses 5 `SpringProgress` → 1 `useDockSpring` | exactly **5** `new SpringProgress` in `dock/` (dockMorphContext / useDockItemDrag / useDockOrientationMorph / useLayerTransition / useDockFission); `useDockSpring` ABSENT | **target confirmed; WS6 correctly born-RED** |
| WS3 3.6 demoted default Button off `glass-deep` (forward-clobber risk to WS8) | `button/index.ts`: bare `default` demoted; `primary-audacious`/`:liquid` KEEP `glass-deep` (line 101); `glass/deep.css` + `tokens/glass-deep.css` INTACT; Card.vue still composes it | **deep tier SURVIVES — WS8 edge is a sign-off, not a re-open (severity ↓ from sibling)** |
| WS3 spine grows the glass cascade past the bound | `ladder.css` **527**, `shell.css` **510**, `api/index.ts` **505** (the 3rd self-resolves at BH B2.2) | **2 live god-module reds confirmed** |
| WS1/WS3 actually landed (FINAL.md "nothing on disk" now false) | `git diff --stat master..HEAD -- src/` = 29 files, +933/−870 | **landed; the frontier moved** |

The DAG is acyclic and the edges are load-bearing-correct. **KEEP the build order.**

---

## 2. THE CONVERGENCE CEILING — the load-bearing build-order finding

The spec's own self-assessed convergence caps (WS8 72% · WS9 64% · WS3 "M4a 88%" · WS12 72%) are all pinned to ONE residual: **C-SAFARI** — the real-Metal-Safari.app deep-glass capture by a non-authoring agent. Three facts make this a SCHEDULING risk, not just a hard problem:

### 2a. The WS3 spine is half-bought, and the unbought half is the BLOCKING half
The build-map's WS3 section itself flags 3.3 GLASS-CLIP-DISCIPLINE as "**Safari-26 Job-B sign-off is the convergence CEILING (BLOCKING)**". What landed (3.1 CARTOON-INK / 3.6 BLUR-PEER / 3.7 IDIOM-FACTOR) is the field-INDEPENDENT, device-free-greenable cheap half. What's PENDING is:
- **3.3 GLASS-CLIP-DISCIPLINE** — the Safari-26 Job-B `contain:paint` clip sign-off (BLOCKING; WS8 W-SUFFUSE consumes its clip host).
- **3.4 SAFARI-BLUR-LITERAL** — the `-webkit-backdrop-filter` resolved-literal (88% converged, paint-pending).
- **3.5 GLASS-TINT-UNIFY** + **3.8/3.9/3.10** — WS1-field-gated chromatic rows (the iridescence is field × saturate).

WS8 glass-deep + WS12 coherence read the UNIFIED blur/tint/specular spine. Building the apotheosis on a spine whose Safari-ceiling + chromatic rows are unbought inverts the dependency. The paint-integrity sibling said it precisely: "their paint must clear before the deep-glass bands build on them."

### 2b. C-SAFARI is built LAST but should be PROVEN FIRST (the de-risk inversion)
WS8 is phase 13 of 14. The deep-glass refraction (`backdrop-filter: url(#glass-refract)` SVG `feDisplacementMap`) is the highest cross-engine divergence class in the whole tranche, and it has ZERO paint coverage (paint-integrity sibling risk #2 ★★★). If the Metal-Safari refraction diverges or reads flat, **everything built on top re-opens.** Yet two WS8 waves are explicitly extractable EARLY:
- `BG.W-GLASS-REFRACT-WEBGL` — "**build-INDEPENDENT, LANDS in `src/`**" — the dual-stack shader + the M6 WGSL-shape gate + the real-WebKit-2287 fixture-field π. No upstream dep.
- `BG.W-GLASS-SUFFUSE-UNIVERSAL` — "**field-INDEPENDENT, lands NOW**" — the Tier-0 bevel floor + a committed real-Metal-Safari at-rest capture.

**AMEND the order: front-load a C-SAFARI feasibility SPIKE.** Run `W-GLASS-REFRACT-WEBGL`'s real-WebKit fixture-field π + a `W-GLASS-SUFFUSE-UNIVERSAL` at-rest Metal-Safari capture EARLY (immediately after WS3's 3.3/3.4 Safari rows land, BEFORE WS5/WS6/WS4 invest ~50 waves). If the refraction reads correct cross-engine → the ceiling is bought and the stack is safe. If it diverges → engage the named escape (the WS9 raster-fallback precedent / the `BE.W-LENS-SAFARI` booked successor / `backdrop-filter:url()` is Safari-IMPOSSIBLE per WS7's DROP-WITH-TRIGGER register) at the FRONT, re-scoping WS8 before the investment, not after. The spec already separates the field-independent WS8 waves precisely so this spike is possible — the AMEND is to USE that separation as a scheduling lever.

### 2c. WS7's live-render gates are the net that makes the ceiling enforceable — and they land late by NECESSITY
The 5 live-render gates (`proof:route-navigates` / `proof:field-aurora` / `proof:previews-render` / `proof:uniform-blur` / `proof:safari-parity`) are ABSENT (WS7 phase-12, PENDING). The gate-reality sibling is right that until they land the keystone is author-captured-paint and the source-green/visually-broken gap is re-openable. They land LATE CORRECTLY (they probe surfaces that must exist first) — KEEP that order — but the binding consequence for the cut is: **the cut MUST NOT precede WS7 phase-12 + the W-REFLECT3 gestalt-flip.** This is the one non-negotiable ordering fence the paint-debt structure imposes.

---

## 3. THE RECURRING DISEASE AS A BUILD-ORDER HAZARD (the carve-order inversion)

The "wave greens its OWN gate, leaves a sibling close-gate RED" disease has recurred 3× and is LIVE at HEAD (4 reds: `no-god-module`, `no-dead-token`, `gen-ci-fresh`, `tag-parity` — per the clobber sibling, two are distinct `gates.mjs` clobbers). For the BUILD-ORDER lens the load-bearing point is the HOT FILE + the carve SCHEDULE:

- **The glass token cascade (`glass.css`/`ladder.css`/`shell.css`/`dark-arm.css`) is the recurring clobber surface.** ladder.css (527) + shell.css (510) are already over-bound. The remaining WS3 rows touch `material.css`/`surfaces.css`/`ladder.css`/`glass-fx.css`; WS8 W-SUFFUSE touches `material.css`/`rim.css`/`glass-fx.css`/`dock/shell.css`; WS9 GRAIN-REAL re-engineers `paper.css` + re-points `cards.css`/`ladder.css`/`dock/shell.css`. **Every deep-morphism wave grows the files that are already RED.**
- **The carve/colocation discipline (WS4 leaf-carves + WS3 IDIOM-FACTOR DRY) is scheduled AFTER WS8/WS9 grow these files.** This is an ORDER INVERSION: the files become harder to carve the longer the carve waits, and each over-500 growth re-reds the close.

**AMEND: move a glass-cascade carve (or an EXPLICIT ratchet re-pin with rationale) to BEFORE the WS8/WS9 deep-morphism band, and adopt a STANDING per-wave sibling-gate sweep** (`proof:no-god-module` + `proof:no-dead-token` + `proof:gen-ci-fresh` + `proof:tag-parity` run before any cascade-touching wave flips paint-pending). This is the process amendment all five siblings independently converge on; the build-order specific addition is *sequence the carve before, not after, the growth.*

---

## 4. THE JOINT BG+BH INTERLEAVE — right SHAPE, back-loaded SCHEDULE

The interleave DAG is acyclic and the `[C]`/`[WSn]`/`[WS12]` partition correctly serializes every hot-file collision (`src/index.ts`, `gates.mjs`, `CLAUDE.md`, dock/viz/glass god-modules are all BH-no-touch until `[WS12]`). The `[C]` band is LANDED + sound (siblings). Two genuine concurrent grazes (`vite.library.ts` B1-W1 × WS6; `ui/carousel/CarouselContent.vue` B2.4a × WS10) are correctly flagged for file-level checkpoints.

**The structural concern (AMEND, not RESTART): the BH center-of-mass is `[WS12]`.** B2.1-swap (subpaths-delete) · B2.2 (/api-fold) · B2.3 · B2.6 · B4b-content · B5b · B5c · B4f · B7 ALL stack after the full ~110-wave BG build AND the WS12 480-capture capstone (the biggest paint risk). B4f (CLAUDE.md hard-delete) is the absolute-last act with a strict `B4b-content → B5c → B4f` chain. The bh-restructure sibling found B4b-content is ~15% done, `auditCanonHomes()` is existence-only AND RED (instrument-chassis home absent), and the CLAUDE-reader census is stale (plan "16" vs disk ~18 hard readers). **A slip in B4b-content stalls the entire tail — the cut is one long pole, not a flush close.**

**AMEND the SCHEDULE (not the cut shape):**
- The cut SHAPE is correct: the `./api` drop (1 key, 203-symbol re-home, 2 by-name sibling asks) + the CLAUDE.md delete are clean-break 5.0.0 moves that belong in the major. KEEP.
- Convert the post-WS12 BH tail from a monolithic block to an INCREMENTAL per-WS doc-redistribute: the per-component canon prose has natural edges (glass + READMEs after WS3/WS8, handmark after WS9, de-shadcn after WS10, RATCHET after WS12). Author each canon home as its WS lands, so B4b-content is ~done by the time WS12 closes, leaving only B5c gate-rehome + B4f delete as the genuine tail.
- Prerequisites the sibling named (carry forward): re-census the readers to the exact ~18 + enumerate each asserted token → home; make `auditCanonHomes()` content-real (non-empty + contract-token-present) BEFORE B5c re-points any gate; confirm the BG-WS5 viz-subpath consumer migration (slides consumes `/constellation` + `/fourier-field`) is owned, or it falls through the BH-B7/BG-WS5 seam.

---

## 5. KEEP / AMEND / RESTART — per workstream (the triage)

| WS | State at HEAD | Disposition | Why (build-order lens) |
|----|--------------|-------------|------------------------|
| **WS1** Shell/Routing/Field | LANDED (paint-verified) | **keep-verified** | The linchpin, correctly first; widest fan-out; marker for WS8 already laid. Siblings confirm honest paint. |
| **WS3** Glass standardization | PARTIAL (easy half) | **half-baked** | Spec sound, but the BLOCKING Safari-ceiling rows (3.3/3.4) + chromatic rows unbuilt; landed half introduced 2 live close reds + a dead-token orphan chain. KEEP specs, AMEND order: build the Safari ceiling + sweep the reds before declaring the spine done. |
| **WS2** Dock convergence | UNBUILT | **keep** | 5→1 SpringProgress target validated; useDockSpring correctly born-RED gates WS6; spec sound; correctly after WS3. |
| **WS5** Viz refinement | UNBUILT | **keep** | Sound; correctly before WS4 canvas carves. (Confirm it owns the viz-subpath/slides consumer migration — the BH-B7 seam.) |
| **WS6** Siri capabilities | UNBUILT | **keep** | Correctly gated behind WS2 useDockSpring; field-independent W-GLASS-BLUR-ENGAGE lands first. |
| **WS4** Components/Demo/Encap | UNBUILT | **keep** | Sound; W0 DESHADCN-SWEEP correctly precedes WS10; the canvas carves correctly re-measure post-WS5. |
| **WS7** Quality/Coverage/Close | PARTIAL (Stage-0/Band-0 landed) | **amend** | Ground-freeze keep-verified; the 5 live-render gates (phase-12) are the LARGE pending net that makes the defects ship-green-impossible — correct to land late, but the cut MUST NOT precede them + W-REFLECT3. |
| **WS8** Glass-deep | UNBUILT | **amend** | KEEP spec; AMEND order — front-load the C-SAFARI feasibility spike (W-REFRACT-WEBGL + W-SUFFUSE at-rest Metal capture) BEFORE the WS5/WS6/WS4 investment. The deep tier survives 3.6, so the forward edge is a sign-off, not a re-open. |
| **WS9** Paper-deep | UNBUILT | **keep** | GU-1 token-first edge correct (WS8 bevel + WS12 A6 read it). Risk noted: the mechanism was user-rejected once — the raster-fallback escape is the named hedge. |
| **WS10** De-shadcn | UNBUILT | **keep** | Strictly after WS4-W0; the R2 grouped-Select WebKit-dark separation is the load-bearing residual (real-Safari). |
| **WS11** Storybook facility | UNBUILT | **keep** | Hard-gates on the WS1+WS4 integration branch (satisfied by construction as the branch accretes); a genuine serial tail, cannot be pulled early. |
| **WS12** Coherence capstone | UNBUILT | **keep** | LAST; the 480-capture dual-engine verdict is structurally post-integration. Correct. |
| **BH [C]** concurrent-safe | LANDED | **keep-verified** | Disk-verified; @glass codemod clean (250 targets resolve); regen mechanism proven. |
| **BH [WS12]** restructure tail | UNBUILT | **amend** | KEEP the cut shape (clean-break major); AMEND the schedule — incremental doc-redistribute, content-real auditCanonHomes, re-census 18 readers, author canon homes as each WS lands. |

**No RESTART candidates** at the workstream level — matching all four code-touching siblings. The user's low confidence is explained by (a) the live 4-red close battery, (b) the 80%-unflipped gestalt oracle (paint debt = the whole bulk), and (c) the FIELD-AURORA proof that device-free-green ≠ correct — NOT by bad specs. The architecture is sound; the SEQUENCE of the ceiling + the carve + the BH tail is what needs amendment.

---

## 6. RISKS AT THE 5.0.0 CUT (architecture / build-order lens)

1. **★★★ C-SAFARI is built LAST on the longest chain.** The single likeliest miss (3-wave chronic) sits at phase 13 atop ~9 workstreams; a divergence re-opens everything built on it. Mitigation: front-load the feasibility spike (§2b). The spec ALREADY separated the field-independent WS8 waves to make this possible — failing to use that lever is the risk.
2. **★★★ The WS3 spine is half-bought.** WS8/WS12 read the unified blur/tint/specular register; the BLOCKING Safari-ceiling rows (3.3/3.4) + chromatic rows are PENDING. Building deep-glass on the easy-half spine inverts the dependency.
3. **★★ The glass-cascade carve order is inverted.** ladder.css (527) + shell.css (510) over-bound NOW; WS8/WS9 grow them further BEFORE the WS4 carve discipline runs. The close reds compound across the deep-morphism band. Move a carve / ratchet re-pin earlier.
4. **★★ The BH restructure tail is back-loaded onto the biggest paint risk.** B4b-content → B5c → B4f post-WS12; a slip stalls the irreversible CLAUDE.md delete. Incremental redistribute + the content-real auditCanonHomes prerequisite.
5. **★★ The cut MUST NOT precede WS7 phase-12 + W-REFLECT3.** The live-render gates + the gestalt-flip are the only net for the field-composited-AA class (FIELD-AURORA shipped device-free-green at 1.04:1). A cut before them reproduces the BD source-green/visually-broken close.
6. **★ The forward-clobber edge (3.6 → WS8 deep tier) is LOW severity but unsigned.** The deep tier survives; record the deep-tier contract (which surfaces keep it) before WS8 builds, so WS8 does not assume the demoted default Button is deep.
7. **★ The integration branch IS tranche/BG accreting** — WS11/WS12 cannot be pulled early or parallelized; the serial tail is real and bounds the wall-clock floor of the whole tranche.

---

## 7. EVIDENCE INDEX (all read-only)
- `verify-siblings-intact --quiet` → exit 0 (before).
- FINAL.md §1/§8/§9; `bg-build-map.md` (WS1/WS3/WS2/WS6/WS8/WS9 sections + the critical-path §); `bh-interleave-map.md` §1-§6.
- 6 sibling PASS-1 reports cross-read (cursor-truth, clobber, code-vs-spec, gate-reality, paint-integrity, bh-restructure).
- `wc -l`: ladder.css 527 · shell.css 510 · api/index.ts 505 · GlassDock.vue 711.
- `grep data-glass-field-canvas` → AppShell.vue:328 + useGlassBackdropLuminance.ts:231 (marker present).
- `grep "new SpringProgress" src/components/custom/dock/` → 5 sites; `grep useDockSpring src/` → empty.
- `grep glass-deep button/index.ts` → default demoted, `:liquid`/audacious keep it; `glass/deep.css`+`tokens/glass-deep.css` intact.
- `git diff --stat master..HEAD -- src/` → 29 files, +933/−870.
