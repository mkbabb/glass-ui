# BD.W-AURORA-KUWAHARA-MULTIPASS

## (1) Band + goal

**Band 3 — Procedural viz parity + GL-fence tails. RISK: USER-HINGE — may be declined.**

Re-surface (NOT auto-build) the LITERAL multi-pass anisotropic-Kuwahara FBO pipeline (external render-target + Gaussian-smoothed multi-tap structure tensor + an FBO-resolve pass) as a quality uplift over the single-pass procedural Kuwahara BC landed. Surface with the live aurora in hand + the user call; build ONLY on a user greenlight, else re-stamp DECIDED-HOLD with the user verdict (terminal, not a re-book).

## (2) Starting state — the exact on-disk reality

`src/components/custom/aurora/constants/shaders/aurora-mediums.wgsl.ts` (VERIFIED): the SINGLE-PASS procedural Kuwahara port landed at BC.W-VIZ-AURORA T4 — `mediumKuwahara` (lines 18-25) is "THE KEYSTONE (Kyprianidis 2010, the SOFT polynomial-weighted anisotropic-Kuwahara; aurora is a PROCEDURAL field so no FBO — the operator runs over sampleBase over an elliptical kernel oriented along the structure tensor, 4 rings × 8 angular taps = 32 procedural samples, 8 OVERLAPPING sectors blended SOFT by 1/(1+var^q) → no 8-spoke pinwheel by construction)." The two `fwidth`-class drift sites in the GLSL twin (AA-edge + structure-tensor variance) are NOT in this single-pass procedural form (no rasterized texture), so no `fwidth` is needed (lines 22-25). NO FBO, NO external render-target, NO multi-tap Gaussian-smoothed tensor.

The decision: `BC.W-VIZ-AURORA.md` Folds `bb-aur-kuwahara-multipass-fbo` (VERIFIED) — "**DECIDED — HOLD (out of scope, honest):** the single-pass procedural anisotropic-Kuwahara (no FBO) is the BC port (T4); the literal multi-pass FBO pipeline (external render-target + Gaussian-smoothed multi-tap tensor + FBO-resolve) stays a separate future capability with its own consumer + substrate decision — NOT folded here. The single-pass finish is sufficient for the procedural field."

CLAUDE.md §W-AUR-KUWAHARA confirms: "THE LITERAL multi-pass FBO pipeline … stays a SEPARATE future capability with its own consumer + substrate decision — NOT a re-book of this finish." FOLD-LEDGER routes it `→BD.W-AURORA-KUWAHARA-MULTIPASS` as a USER-HINGE (`ay-w-aur-t5-kuwahara` — NEXT-TRANCHE, never user-decided).

The invariant-8 constraint: the single-pass runs over the EXISTING one-draw/one-shader loop, so `proof:offscreen-pause` (PRM-freeze + offscreen-park) is untouched (CLAUDE.md §W-AUR-KUWAHARA). A NEW FBO ping-pong pass would add a second render-target — the new FBO must NOT break invariant 8 (the one-loop/offscreen-pause discipline).

## (3) The build — DECISION-FIRST, conditional

**This is a DECISION wave, not an auto-build.** The single-pass is SUFFICIENT per BC; the multi-pass FBO is the un-decided quality CEILING.

**Step 1 — surface the live aurora + the cost (the user call).** With the BC live aurora in hand, surface to the user:
- the single-pass procedural Kuwahara read (32 procedural samples, the soft no-pinwheel finish) — what ships at HEAD;
- the multi-pass FBO read (the literal Kyprianidis pipeline: render base to FBO → Gaussian-smooth the multi-tap structure tensor in a second pass → resolve the anisotropic Kuwahara over the smoothed tensor in a third pass) — the quality ceiling, with the per-frame cost (an FBO ping-pong = N extra full-screen passes + the texture-sample-bound structure tensor);
- the substrate cost: the FBO pipeline needs an offscreen render-target + a multi-pass dispatch the current one-draw substrate does not have — its OWN substrate decision (`createCanvasLifecycle` is single-draw; an FBO chain is a substrate change).

**Step 2a — IF the user greenlights BUILD:** land the FBO pipeline (the offscreen render-target + the Gaussian-smoothed multi-tap structure tensor + the FBO-resolve), GATED on:
- **invariant-8 preservation** — the new FBO passes ride the EXISTING demand-driven loop's `arm()`/`suspend()`/PRM-freeze (offscreen-park still parks the whole chain; PRM still paints one static frame then parks — the FBO passes are not a second uncontrolled rAF);
- **the GL-shader fence** — `aurora.frag.ts` byte-untouched; the multi-pass is a NEW pipeline (a new shader stage), not an edit to the fallback;
- **its OWN consumer + substrate decision** recorded (the FBO chain is a substrate capability, not just a medium — the ≥2-consumer bar applies to the new FBO substrate).

**Step 2b — IF the user DECLINES (the likely default):** re-stamp `bb-aur-kuwahara-multipass-fbo` DECIDED-HOLD with the user verdict recorded (a TERMINAL disposition — "the single-pass is sufficient; the multi-pass FBO is declined as a quality ceiling not worth the substrate cost"), NOT a re-book. The row carries the user-decision as its terminal rationale; a future need re-enters through a NEW FBO-substrate consumer trigger, never a re-opened multi-pass-Kuwahara book.

## (4) The gate — born-RED → GREEN (conditional)

**IF BUILD — `proof:aurora-kuwahara-multipass` (new):**
- **K1 FBO pipeline present** — the multi-pass FBO render-target + the Gaussian-smoothed multi-tap tensor + the resolve pass exist; born-RED on HEAD (single-pass only, no FBO).
- **K2 invariant-8 preserved** — `proof:offscreen-pause` stays GREEN (the new FBO passes ride the demand loop; PRM-freeze + offscreen-park reach them); a synthetic FBO pass with its OWN uncontrolled rAF reds.
- **K3 GL-fence held** — `aurora.frag.ts` content-hash unchanged.
- **Self-test bite** — a synthetic FBO pass outside the demand loop reds K2.

**IF DECLINE — `proof:nda-decided`-shaped terminal lock:** the `bb-aur-kuwahara-multipass-fbo` row stays terminally HELD with the user-verdict rationale + the named FBO-substrate-consumer re-entry trigger; a synthetic re-book (the row flipping back to an un-decided book without a new trigger) reds (the anti-re-book floor). No new build gate.

## (5) Paint verification

**IF BUILD** (the IF-BUILD arm inherits the band-3 paint-enforcement discipline — the dedicated π + the surface-hash re-stamp, since a multi-pass FBO pipeline edits the aurora shaders the BD.W-GESTALT-ROSTER-GROW step 2 viz-shader widen enumerates):

1. **The dedicated feature-localized π — `tests-visual/aurora-kuwahara-multipass.spec.ts` (the no-PINWHEEL orientation-histogram readback, the binding feature witness; a whole-region OKLab mean is paint-blind to the 8-spoke pinwheel artefact).** The literal multi-pass FBO Kuwahara must STILL show NO 8-spoke pinwheel — the readback builds the orientation histogram over the field and asserts the angular distribution is SMOOTH (no 8 discrete spokes — the multi-tap Gaussian smoothing is the anti-pinwheel mechanism), and reads as a sharper/cleaner painterly finish than the single-pass procedural Kuwahara (the quality-uplift the build claims). Both modes × desktop. (This is the SAME no-pinwheel orientation-histogram metric `proof:aur-kuwahara`'s π carries — re-pointed at the multi-pass output.)
2. **The cross-backend PARITY arm** (if the multi-pass ships on both backends) via `BD.W-VIZ-PARITY-METAL`'s machinery — at least ONE real-GPU backend pair captured (MINOR-2's cap). The multi-pass FBO read vs the single-pass, both on real GPU; the offscreen-park + PRM-freeze still hold (the FBO chain parks — invariant 8).
3. **The `proof:ba-gestalt` aurora verdict on the fresh capture** — the whole-surface gestalt pass. **The surface-hash re-stamp (named here, IF-BUILD):** the multi-pass pipeline edits the aurora WGSL/shader stage (a NEW pipeline, the `.frag` byte-untouched — §3 step 2a), DRIFTING the `aurora.md` + `viz-procedural.md` BD freshness records' surface-hash (those enumerate the aurora shaders per BD.W-GESTALT-ROSTER-GROW step 2), so G7 auto-revokes the aurora/viz-procedural PASS until this wave re-captures + re-pixel-reads AND **re-stamps the `aurora.md` + `viz-procedural.md` surface-hash headers** at close.

**IF DECLINE** (the likely default): device-free — the terminal-HOLD disposition is recorded; no paint, no dedicated π, no surface-hash re-stamp (the shaders are byte-untouched, so no freshness record drifts). The recorded user verdict IS the artefact.

## (6) Fences + risks

- **USER-HINGE** — this wave does NOT auto-build; the user call gates it. The likely outcome is DECLINE (the single-pass is sufficient per BC) — a re-stamp with the user verdict, NOT a re-book.
- **invariant-8 (one-loop / offscreen-pause)** — the cardinal risk: an FBO ping-pong that adds a second uncontrolled render loop breaks `proof:offscreen-pause`. The FBO passes MUST ride the demand loop.
- **GL-shader fence** — `aurora.frag.ts` byte-untouched in BOTH outcomes.
- **The FBO is a SUBSTRATE decision, not a medium** — it needs its own consumer + substrate decision (the ≥2-consumer bar on the FBO capability), NOT a folded-into-the-medium build. Do NOT silently extend `createCanvasLifecycle` to a multi-pass chain without that decision.
- **Profile:budget** — the multi-pass FBO is materially more expensive than the single-pass (texture-sample-bound vs 32 procedural samples); the cost is the user-call input, not a silent over-spend.
