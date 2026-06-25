# Pass-D AURORA — FIRST-PRINCIPLES deep-challenge (RUTHLESS / ADVERSARIAL / CODE-GROUNDED)

**Lane** BD viz Pass-D · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Bar** the 5-point bar (NECESSITY · CORRECTNESS · SOTA · NOT-OVERFIT · WORKS) RE-OPENED at a deeper
level than the planning-fold. Every finding traced to the ACTUAL HEAD source, not the doc's claim. ·
**Substrate-read in full** `src/components/custom/aurora/constants/shaders/{aurora.frag.ts, aurora.wgsl.ts,
aurora-mediums.wgsl.ts, mediums.glsl.ts, flow.glsl.ts}`, `composables/{uniformBridge.ts,
uniformBridgeWGPU.ts, useAurora.ts}`, `constants/presets.ts`, `scripts/{proof-aur-kuwahara.mjs,
proof-gpu-substrate-single.mjs}`, `docs/tranches/BB/audit/gpu-parity-table.md` ·
**Extends + SHARPENS** `critique/metallic-aurora.md` (I do NOT repeat its 9 sections; I VERIFY its hardest
claims against the code and surface what it MISSED — chiefly a live FALSE-GREEN gate).

> **HARDEST FINDING UP FRONT — a shipped FALSE-GREEN gate falsifies the suite's parity story.**
> `proof:aur-kuwahara` asserts (W3, line 210) `aurora.wgsl.ts` is "BYTE-UNTOUCHED … the WGSL primary has
> NO medium dispatch, so a kuwahara config on WebGPU degrades to the smooth core." **This is FALSE at
> HEAD.** `aurora.wgsl.ts:39` imports `AURORA_MEDIUMS_WGSL` and `:295` splices it into the shader; the
> spliced `aurora-mediums.wgsl.ts:224` DEFINES `fn mediumKuwahara(...)` and `:300-311` `applyMedium`
> DISPATCHES `mediumKuwahara` for `medium == 3 || 5 || 6 || 7`. The gate's W3 regex
> (`/mediumKuwahara|fn\s+\w*[Kk]uwahara/`, line 210) scans ONLY the literal file `aurora.wgsl.ts` — which
> no longer holds the body (it lives in the spliced module the gate never reads) — so `w3WgslUntouched`
> computes `true` and the gate passes GREEN over a now-false claim. This is the exact "asserts must FOLLOW
> the composition into the carved/spliced leaf" class the codebase elsewhere enforces (`proof:webgl-substrate-single`
> clause e). It was true when written (BB.W-AUR-KUWAHARA), then BC.W-VIZ-AURORA T4 added the WGSL mediums
> splice and the gate's literal-file regex silently went stale. **CLAUDE.md line 755 carries the same now-false
> sentence.** Any BD metal-wave that cites "the WGSL byte-untouched / degrade-to-smooth precedent" is building
> on a lie the gate is asleep on.

---

## 1. CORRECTNESS — the metal BRDF: streak(T·H)+N·H is the right FAMILY but `N` is computed-then-thrown-away, and the catch-light input is on the wrong side of the fence

### 1a. Does the height-normal `N` even EXIST in a procedural fragment field? — YES, it's ALREADY computed, then DISCARDED. (sharpens metallic-aurora §1A)

The prior critique said "`N` does not exist meaningfully in a 2D procedural field." Half-right, and the code makes the real story sharper: `structureTensorField` (`mediums.glsl.ts:52-53`) computes the Sobel luma gradient **`Gx, Gy` — that IS the screen-space height-field normal** (the field's luma = the apparent height; `(Gx, Gy)` is its gradient). The comment at `:32-35` says so verbatim. So `N` is not absent — it is computed every fragment for the tensor and then **THROWN AWAY**: the function returns `vec3(dir, A)` (line 91), keeping only the tangent + coherence, discarding the gradient that a metal crest/valley specular needs.

Consequence for the metal wave: the §2 Kajiya-Kay form `pow(sinTH, s)` (purely `T·H`) genuinely lacks the crest term — confirmed. But the FIX is cheap and grounded: either re-return `vec3(dir.x, dir.y, A)` + a packed gradient, OR re-tap a 2-sample central difference (the spec's §3.3 mentions this but never reconciles that the same taps are ALREADY paid one function up). A metal wave that does NOT thread `N` out of the existing Sobel will either (i) re-pay 8 luma taps it already computed (waste), or (ii) ship the tinted-tensor-map failure the prior critique names. **Neither the spec nor the gate forces the `N`-reuse.** That is the load-bearing CORRECTNESS gap and it is un-gated.

### 1b. The catch-light input lives on the WRONG side of the WGSL fence — VERIFIED, and worse than the spec admits

`uLightDir` is WebGL2-ONLY (`uniformBridge.ts:285,291` `gl.uniform3f(U.uLightDir,...)`; `glSetup.ts:59`). I read the WGPU struct offsets 0–576 in full (`uniformBridgeWGPU.ts:10-27` + `:42-67`): there is **NO `uLightDir` lane** — `cursor` (off 64), `uCursorStrength`/`uCursorRadius` (scalars3.y/z off 56/60), but no light vector. So a WGSL metal catch-light "riding the existing movable `uLightDir`" has no substrate on the Safari path. metallic-aurora §2 nailed this; I add the deeper consequence: the WGSL primary ALREADY degrades the entire `uLightDir`-bearing stroke cascade — `aurora-mediums.wgsl.ts:308` routes oil/vangogh/oil-pastel(3/5/6) into `mediumKuwahara`, which carries NO relight. **The light direction has never crossed to WGSL because the code that consumes it never crossed either.** The honest KISS fix the prior critique names (cursor-as-light from `uCursor`, which DOES exist in the WGPU pack) is the only one that avoids a struct-layout change — but note `uCursor` is a 2D screen-position, not a 3D light direction, so "cursor-as-light" needs a synthesized z (e.g. `normalize(vec3(uCursor - p, k))`), which is fine but is NEW math nobody has specced.

### 1c. The sparkle determinism — VERIFIED as a boil trap, and the gate can't see it

Both `hash21` bodies are algebraically identical (`aurora.frag.ts:161` ≡ `aurora.wgsl.ts:94-98`). The prior critique's "advance the PHASE not the POSITION" is correct. I add: the **W3 self-test "no-pinwheel orientation-histogram"** the kuwahara gate uses is a SHADER-FREE proxy — there is no device-free way for any proof gate to distinguish "twinkle-in-place" from "boiling noise field" without a real-GPU temporal capture. So if the metal wave ships the boil, NO device-free gate catches it; only a live π over ≥2 frames does — and that rides the deferred W-REFLECT capture (§2 below). The determinism risk is real AND un-gated at the device-free tier.

---

## 2. CORRECTNESS/WORKS — the ΔE≤2 parity bar is a luminance-mean proxy, and the suite already ships a STRUCTURAL parity violation the table calls `verified`

### 2a. The gate's ΔE is `{mean:0,p99:0}` structural-proxy, demoted to enrollment — VERIFIED in code

`proof-gpu-substrate-single.mjs:55-57,208-221`: a row with no `realGpu` readback carries `structuralProxyOnly:true` and the `{mean:0,p99:0}` ΔE is "DEMOTED to enrollment … NOT yet paint-proven; rides BC.W-WEBGPU-EVERYWHERE/W-REFLECT." The aurora row (`gpu-parity-table.md:33-46`) is `status:"verified"` with `deltaE {mean:0,p99:0}` — i.e. "verified" here means "the CPU color-seam evaluated against ITSELF is identical," NOT "Metal and ANGLE paint within ΔE 2." So the metal wave's "mean ΔE≤2.0/p99≤5.0" headline is, at the device-free gate, a regex+luminance check, exactly as metallic-aurora §4A established. CONFIRMED.

### 2b. THE DEEPER FINDING — the aurora row is `verified` while oil/vangogh/curl ALREADY DIVERGE structurally between backends

This is what metallic-aurora UNDER-stated. The `verified` aurora row covers the WHOLE aurora viz, but at HEAD the two backends do NOT render the same thing for three configs:

- **oil/vangogh/oil-pastel:** GLSL frag renders the full per-dab stroke cascade; WGSL renders `mediumKuwahara` (`aurora-mediums.wgsl.ts:308`). The **van-Gogh HERO** — the suite's named flagship medium — reads as KUWAHARA on Safari and STARRY-NIGHT-STROKES on Chrome. That is a gross, visible divergence, not a sub-pixel one.
- **curl warp:** GLSL frag has `uWarpMode == 3` curl (`aurora.frag.ts:290`, the Bridson `curlFBM`); the WGSL warp dispatch (`aurora.wgsl.ts:174-184`) handles only warpMode 0/1/2 — `warpMode==3` falls through to plain fbm. A `warpMode:"curl"` config silently degrades to a DIFFERENT flow on Safari.

CLAUDE.md documents these as intentional degrades ("a kuwahara config on WebGPU degrades… the WGSL warp falls through to fbm"). Fine — BUT the parity table calls the aurora row `verified` with ΔE 0, and the `{mean:0,p99:0}` proxy is computed over the SHARED COLOR SEAM ONLY (OETF+OKLCh+ramp+tonemap), which is genuinely identical — it never evaluates the MEDIUM or the WARP. **So the gate's "verified" is structurally blind to the exact divergences the BD metal wave's "FULL lockstep no-degrade" headline is supposed to be DIFFERENT from.** The metal wave inherits a parity-fence that is already leaking on three configs and a gate that cannot see the leak. Before adding a 4th medium under a "no-degrade" banner, the wave must reconcile: is the metal medium ACTUALLY ported to WGSL (real lockstep), or is it the 4th silent-degrade joining oil/vangogh/curl? The spec claims the former; the precedent it cites is the latter.

---

## 3. SOTA — the medium pool is a GRAB-BAG, not a coherent register (NECESSITY fails at the pool level)

Trace the on-disk pool against the BD-claimed pool. HEAD `MEDIUM_ID` (`uniformBridge.ts:42-49`) + the `AuroraMedium` union (`presets.ts:61-76`): smooth · pastel · watercolor · oil · crayon · vangogh · oil-pastel · kuwahara — **8 mediums, STOPPING at kuwahara:7.** No satin, no burst, no metal, no metal-gradient, no prism on disk. The BD roster's "metal==10/metal-gradient==11" (VIZ-FINAL-ROSTER:32) assumes satin==8/burst==9 landed; they are PHANTOM (metallic-aurora §8.3 — CONFIRMED against the union). So at HEAD metal must slot **8/9**, and the `satisfies Record<AuroraMedium,number>` will force it.

The deeper NECESSITY question the BD plan never asks: **is an 8→12-member medium pool coherent or a kitchen-sink?** The shipped 8 already split into TWO incoherent families: (a) genuine paint physics (oil/vangogh/oil-pastel/crayon/watercolor — anisotropic-tooth/stroke-cascade) and (b) a single post-process operator (kuwahara — an image filter, not a medium). Adding metal/satin/prism/metal-gradient grows family (b) into a "shader-effects menu" with no organizing principle. There is no design doctrine in the tree that says WHICH effects belong in the `medium` enum vs a separate axis. The `medium` enum is becoming the dumping ground for every cool fragment trick — that is the OPPOSITE of the "fewer-sharper-primitives" SOTA bar. **A coherent pool needs a SPLIT axis: `medium` (the paint substance) vs `finish`/`post` (the operator: kuwahara, metal-sheen, prism).** kuwahara is already mis-filed as a `medium` (it's a post-filter that re-samples the SAME field). Metal would be the second mis-file. The grab-bag is real and pre-existing; the BD waves AMPLIFY it without naming it.

---

## 4. NOT-OVERFIT — the metal wave's 2nd consumer IS the D7 disease (NECESSITY ≥2-bar fails)

metallic-aurora §7 established this; I confirm it from the census. The metal spec's consumer #2 is "the iOS-27 flow-field-background / `W-AUR-ALBUM` album-reactive metallic field" — and `generalize-no-hardcoded.md` lists `W-AUR-ALBUM`/`proof:aur-album`/`albumPalette.ts`/`aurora-album` as TIER-A D7 offenders (rows A13-A16) that must be RENAMED and born-RED on `proof:no-hardcoded-ref`. So the metal medium has ONE honest consumer (a demo preset). The "two surfaces by construction" is circular: it leans on an un-landed, D7-condemned, named-after-an-app register. **The ≥2-bar is NOT met with a generalized consumer.** A generalized 2nd consumer (a `<Aurora medium="metal">` backdrop behind ANY content surface, named without album/iOS-27/now-playing) is constructable — but it is not what the spec wrote.

---

## 5. CORRECTNESS — W-AUR-INTERACT is a real domain-warp, NOT a pure parameter dial (the ONE place the spec is BETTER than its critique feared)

The cursor swirl is genuine interactivity, not a slider. `aurora.frag.ts:300-318` (and the WGSL twin `aurora.wgsl.ts:187-201`, byte-faithful) rotates the field coordinate around `uCursor` with a Gaussian radial falloff (`exp(-d²/(r²·0.45))`), a max ~120° rotation, plus a slight gravity pinch toward the cursor — this WARPS the underlying color field so bands sweep around the pointer. That is a real spatial interaction present on BOTH backends (the rare config where WGSL does NOT degrade). So `W-AUR-INTERACT` building on the cursor field has a sound substrate. **The risk is scope, not substance:** `interactivity-config.md §0` already CUT `useVizInteraction`/`W-VIZ-INTERACTION-SPINE` as a re-fork-in-disguise (the facade is a `role="img"` + a `v-bind` bag once you strip the shipped `usePointerVelocityField` + `useVizKeyboard`). So `W-AUR-INTERACT` should compose `usePointerVelocityField` (shipped, 9 consumers) + `useVizKeyboard` (the one genuine new wave) DIRECTLY — never through the cut facade. If `W-AUR-INTERACT` re-introduces an aurora-local interaction wrapper, it is the disease. As scoped to "compose the two shipped/new primitives + drive the existing cursor swirl," it is real and minimal.

---

## 6. VERDICT (5-point bar, per wave)

| wave | NEC | CORRECT | SOTA | NOT-OVERFIT | WORKS | net |
|---|---|---|---|---|---|---|
| W-AUR-METAL (10/11) | ✗ (1 honest consumer; #2 is D7) | ⚠ (N thrown away; light on wrong side of fence; sparkle boils) | ⚠ (grows the grab-bag pool, no medium/finish split) | ✗ (consumer #2 = W-AUR-ALBUM disease) | ✗ (WGSL catch-light substrate absent; "no-degrade" un-deliverable as scoped) | **NOT BUILD-READY — re-scope** |
| W-AUR-INTERACT | ✓ (0 viz keyboard at HEAD) | ✓ (cursor swirl real on both backends) | ✓ (compose shipped field + keyboard) | ✓ if named generic | ✓ | **BUILD — compose directly, never via the cut facade** |
| kuwahara medium (shipped) | ✓ | ✓ (single-pass, no FBO — verified) | ⚠ (mis-filed as `medium`, is a post-filter) | ✓ | ⚠ (**gate false-GREEN: WGSL is NOT untouched**) | **SHIPPED but the gate LIES — fix proof:aur-kuwahara W3 to follow the splice** |
| curl-warp (shipped) | ✓ | ✓ (Bridson curl, GLSL) | ✓ | ✓ | ⚠ (WGSL silently degrades to fbm — documented, but compounds the no-lockstep story) | **SHIPPED, degrade-honest** |
| W-AURORA-WGSL parity | ✓ | ⚠ (color seam only) | ⚠ | ✓ | ✗ (ΔE 0 proxy is blind to medium/warp divergence; oil/vangogh/curl already diverge under a `verified` row) | **the parity STORY is weaker than the table claims** |

**The single hardest fix:** make `proof:aur-kuwahara` W3 (and any BD parity gate) scan the SPLICED `aurora-mediums.wgsl.ts`, not just the literal `aurora.wgsl.ts` — and reconcile CLAUDE.md line 755 ("the WGSL primary has no medium dispatch / degrades to smooth"), which is now FALSE. Until then the suite's whole "WGSL byte-untouched / degrade-to-smooth" parity narrative — the precedent the metal wave cites for "FULL lockstep" — rests on a gate that went stale and a doc that lies.

---

## Sources
- HEAD shaders: `aurora.frag.ts:103,128-130,161,290-318`, `aurora.wgsl.ts:39,94-98,163-201,295,343-345`, `aurora-mediums.wgsl.ts:224,295-311`, `mediums.glsl.ts:32-35,40-91,401-470`, `flow.glsl.ts`
- bridges: `uniformBridge.ts:42-49 (MEDIUM_ID stops at kuwahara:7),285,291 (uLightDir WebGL2-only)`, `uniformBridgeWGPU.ts:10-27,42-67 (struct — NO uLightDir lane, cursor at off 64)`, `presets.ts:61-76 (union — no satin/burst/metal)`
- gates: `scripts/proof-aur-kuwahara.mjs:45,206-220 (W3 regex scans ONLY aurora.wgsl.ts — the false-green)`, `scripts/proof-gpu-substrate-single.mjs:55-57,208-221 (ΔE structural-proxy demoted to enrollment)`
- table/doc: `docs/tranches/BB/audit/gpu-parity-table.md:33-46 (aurora verified ΔE 0)`, `CLAUDE.md:755 (the now-false "WGSL byte-untouched / degrades to smooth")`
- cross-critiques: `critique/metallic-aurora.md` (verified + sharpened), `critique/interactivity-config.md §0-1`, `critique/generalize-no-hardcoded.md A13-A16`, `critique/field-engine.md §4`
