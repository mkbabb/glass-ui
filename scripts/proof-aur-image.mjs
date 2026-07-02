#!/usr/bin/env node
// BG.W-AUR-IMAGE-SOURCE — proof:aur-image, the blurred-image-source arm of proof:viz.
//
// The §3.3 GOLDEN (Direction 3): a photo enters the dual-engine aurora family through ONE
// shared texture-upload primitive + a CONSTRUCTION-TIME program permutation + an in-shader
// bounded zone-blur — the SAME drifting nuclei field that colours the palette program here
// drives the per-fragment BLUR RADIUS, so "a real photo dissolves into the aurora's own
// drift". NEVER a per-fragment `if(uSource)` god-branch, NEVER an ad-hoc per-site upload
// (the gpuweb #4356 premultiply/colorspace/flipY hazard), NEVER a `<BlurredImage>` fork.
//
// A SOURCE/STRUCTURE parse — device-free, on the local + ci + release tag set. The BINDING
// runtime π (the photo visibly dissolves, the blur zones drift like aurora nuclei, both
// engines both modes) + the capture-pair PARITY (chromium-WGSL vs webkit-WGSL of the same
// decoded image within the L7 ΔE bar — the gpuweb #4356 blank-texture class the paint judge
// reds) ride W-REFLECT3 + the proof:ba-gestalt aurora verdict. The device-free structural
// proxy of parity is I4 (both image programs are ONE colour source — no divergent path).
//
// THE SIX FALSIFIABLE WITNESSES:
//   I1 (a) — the SINGLE texture-upload primitive. `textureUpload.ts` owns the decode +
//        BOTH upload legs with the explicit flag set; runtime.ts (WebGL2) + wgpuSetup.ts
//        (WebGPU) route through it. Anti-evasion: NO raw `texImage2D`/
//        `copyExternalImageToTexture` outside the primitive (a planted raw upload REDs).
//   I2 (b) — the CONSTRUCTION-TIME program permutation. `source:"palette"|"image"` picks a
//        SEPARATE compiled program at setup (never a runtime uniform branch); NO `uSource`
//        in any shader body. Self-test bite: a planted `uSource` branch in the image frag REDs.
//   I3 (c) — the BOUNDED 24-tap kernel. A compile-time constant loop bound (3 rings × 8
//        sectors), both backends. Self-test bite: a uniform-driven loop bound REDs.
//   I4 (d, structural proxy) — the vividness FLOOR is source-agnostic + sampled in LINEAR
//        light, and both image programs splice the SAME shared colour chunk (one colour
//        source). The real chromium-vs-webkit capture-pair rides W-REFLECT3.
//   I5 (e) — the PALETTE-default byte-identity. `source` is OPTIONAL (default palette); the
//        palette programs (aurora.frag / aurora.wgsl) declare NO sampler/texture; the image
//        WGPU lane is its OWN 288-byte struct (the 576-byte palette struct untouched). Bite:
//        a planted `sampler2D uImage` in the PALETTE frag REDs.
//   I6 — the deriveAurora scheme/lBand luminance option (ASK-GU-AURORA-SCHEME-LUMA). Bite:
//        reverting to the hardcoded DERIVE_L_BAND (dropping the resolver) REDs.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const AURORA = resolve(ROOT, "src/components/custom/aurora");

const PATHS = {
    upload: resolve(ROOT, "src/composables/glass/textureUpload.ts"),
    // BG.W-AUR-IMAGE-SOURCE — the WebGL2 upload routing was carved off runtime.ts into this
    // leaf (the no-god-module bound); the I1 routing witness FOLLOWS the carve into it.
    imageSource: resolve(AURORA, "composables/auroraImageSource.ts"),
    imageFrag: resolve(AURORA, "constants/shaders/aurora-image.frag.ts"),
    imageWgsl: resolve(AURORA, "constants/shaders/aurora-image.wgsl.ts"),
    frag: resolve(AURORA, "constants/shaders/aurora.frag.ts"),
    wgsl: resolve(AURORA, "constants/shaders/aurora.wgsl.ts"),
    presets: resolve(AURORA, "constants/presets.ts"),
    runtime: resolve(AURORA, "composables/runtime.ts"),
    wgpuSetup: resolve(AURORA, "composables/wgpuSetup.ts"),
    wgpuBridge: resolve(AURORA, "composables/uniformBridgeWGPU.ts"),
    wgpuImageBridge: resolve(AURORA, "composables/uniformBridgeWGPUImage.ts"),
    glSetup: resolve(AURORA, "composables/glSetup.ts"),
    color: resolve(AURORA, "composables/color.ts"),
};

const ARTIFACT = gateArtifactPath("GLASS_UI_AUR_IMAGE_ARTIFACT", "BG-W-AUR-IMAGE-SOURCE");

function read(p) {
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}

// A raw GPU texture upload of an image — the hazard the shared primitive exists to own.
const RAW_UPLOAD_RE = /\b(texImage2D|copyExternalImageToTexture)\s*\(/;

function detect(f) {
    const violations = [];
    const facts = {};

    // ── I1 (a) — the SINGLE texture-upload primitive ─────────────────────────────
    facts.i1PrimitiveExists =
        /export function uploadImageTextureWebGL2/.test(f.upload) &&
        /export function uploadImageTextureWebGPU/.test(f.upload) &&
        /export function decodeImageBitmap/.test(f.upload);
    facts.i1DecodeContract =
        /premultiplyAlpha:\s*"none"/.test(f.upload) &&
        /colorSpaceConversion:\s*"none"/.test(f.upload);
    facts.i1GlFlags =
        /UNPACK_PREMULTIPLY_ALPHA_WEBGL,\s*false/.test(f.upload) &&
        /UNPACK_COLORSPACE_CONVERSION_WEBGL,\s*gl\.NONE/.test(f.upload) &&
        /UNPACK_FLIP_Y_WEBGL,\s*false/.test(f.upload);
    facts.i1WgpuFlags =
        /premultipliedAlpha:\s*false/.test(f.upload) &&
        /flipY:\s*false/.test(f.upload);
    // The upload leg lives ONLY in the primitive — the aurora composables COMPOSE it. The
    // WebGL2 routing carved to the auroraImageSource leaf (the reader-follows-the-carve
    // precedent); the runtime composes that leaf; the WGPU setup composes the primitive.
    facts.i1LeafRoutes =
        /uploadImageTextureWebGL2/.test(f.imageSource) &&
        /textureUpload/.test(f.imageSource);
    facts.i1RuntimeComposesLeaf =
        /armWebGL2ImageTexture/.test(f.runtime) &&
        /createAuroraImageCoordinator/.test(f.runtime) &&
        /auroraImageSource/.test(f.runtime);
    facts.i1WgpuRoutes =
        /uploadImageTextureWebGPU/.test(f.wgpuSetup) &&
        /textureUpload/.test(f.wgpuSetup);
    // Anti-evasion: the raw upload NEVER appears outside the primitive (a bypass hazard).
    facts.i1NoRawUploadRuntime = !RAW_UPLOAD_RE.test(f.runtime);
    facts.i1NoRawUploadImageSource = !RAW_UPLOAD_RE.test(f.imageSource);
    facts.i1NoRawUploadWgpuSetup = !RAW_UPLOAD_RE.test(f.wgpuSetup);
    if (!facts.i1PrimitiveExists)
        violations.push("I1 — textureUpload.ts does not export the decode + both upload legs (the ONE shared primitive)");
    if (!facts.i1DecodeContract)
        violations.push('I1 — the shared decode contract (premultiplyAlpha:"none" + colorSpaceConversion:"none") is absent (the gpuweb #4356 normalisation)');
    if (!facts.i1GlFlags)
        violations.push("I1 — the WebGL2 leg does not declare the explicit UNPACK flags (PREMULTIPLY/COLORSPACE/FLIP_Y — the cross-engine parity contract)");
    if (!facts.i1WgpuFlags)
        violations.push("I1 — the WebGPU leg does not declare premultipliedAlpha:false + flipY:false (the WebGL2 twin — the cross-engine parity contract)");
    if (!facts.i1LeafRoutes || !facts.i1RuntimeComposesLeaf || !facts.i1WgpuRoutes)
        violations.push("I1 — a backend does not route its image upload through the shared textureUpload primitive (the WebGL2 leaf composes it + the runtime composes the leaf; the WGPU setup composes it directly)");
    if (!facts.i1NoRawUploadRuntime || !facts.i1NoRawUploadImageSource || !facts.i1NoRawUploadWgpuSetup)
        violations.push("I1 — a raw texImage2D/copyExternalImageToTexture appears OUTSIDE the shared primitive (the per-site upload hazard the primitive exists to own)");

    // ── I2 (b) — the CONSTRUCTION-TIME program permutation ───────────────────────
    facts.i2SourceUnion = /"palette"\s*\|\s*"image"/.test(f.presets);
    // WebGL2: the fragment source is PICKED at construction, not a runtime uniform branch.
    facts.i2ConstructionPickGl =
        /IMAGE_FRAGMENT_SRC\s*:\s*FRAGMENT_SRC/.test(f.runtime) &&
        /config\.source === "image"/.test(f.runtime);
    // WebGPU: a SEPARATE pipeline is built when source === "image".
    facts.i2ConstructionPickWgpu =
        /getConfig\(\)\.source === "image"/.test(f.wgpuSetup) &&
        /setupImageWGPU\(/.test(f.wgpuSetup) &&
        /AURORA_IMAGE_WGSL/.test(f.wgpuSetup);
    // NO uSource runtime branch in ANY shader body (image OR palette, both backends).
    facts.i2NoUSourceImageFrag = !/uSource/.test(f.imageFrag);
    facts.i2NoUSourceImageWgsl = !/uSource/.test(f.imageWgsl);
    facts.i2NoUSourcePaletteFrag = !/uSource/.test(f.frag);
    facts.i2NoUSourcePaletteWgsl = !/uSource/.test(f.wgsl);
    if (!facts.i2SourceUnion)
        violations.push('I2 — the AuroraSource union is not "palette" | "image"');
    if (!facts.i2ConstructionPickGl)
        violations.push("I2 — the WebGL2 setup does not pick IMAGE_FRAGMENT_SRC vs FRAGMENT_SRC at construction off config.source (a construction-time program permutation, NOT a runtime branch)");
    if (!facts.i2ConstructionPickWgpu)
        violations.push("I2 — the WebGPU setup does not build a SEPARATE image pipeline (AURORA_IMAGE_WGSL via setupImageWGPU) off getConfig().source");
    if (!facts.i2NoUSourceImageFrag || !facts.i2NoUSourceImageWgsl || !facts.i2NoUSourcePaletteFrag || !facts.i2NoUSourcePaletteWgsl)
        violations.push("I2 — a shader body carries a `uSource` uniform (a per-fragment if(uSource) god-branch — the source axis MUST be a construction-time program permutation)");

    // ── I3 (c) — the BOUNDED 24-tap kernel (compile-time constant loop bound) ─────
    const ringsGl = (f.imageFrag.match(/IMAGE_BLUR_RINGS\s*=\s*(\d+)/) || [])[1];
    const sectorsGl = (f.imageFrag.match(/IMAGE_BLUR_SECTORS\s*=\s*(\d+)/) || [])[1];
    const ringsWgsl = (f.imageWgsl.match(/IMAGE_BLUR_RINGS_WGSL\s*=\s*(\d+)/) || [])[1];
    const sectorsWgsl = (f.imageWgsl.match(/IMAGE_BLUR_SECTORS_WGSL\s*=\s*(\d+)/) || [])[1];
    facts.i3Taps = ringsGl && sectorsGl ? Number(ringsGl) * Number(sectorsGl) : 0;
    facts.i3TapsBounded = facts.i3Taps > 0 && facts.i3Taps <= 32;
    facts.i3BackendsAgree =
        ringsGl && ringsGl === ringsWgsl && sectorsGl && sectorsGl === sectorsWgsl;
    // The blur loop bound is the #define'd CONSTANT, NOT a uniform (a dynamic bound is forbidden).
    facts.i3LoopConstGl =
        /for\s*\(int ring = 1; ring <= BLUR_RINGS;/.test(f.imageFrag) &&
        /for\s*\(int s = 0; s < BLUR_SECTORS;/.test(f.imageFrag);
    facts.i3LoopConstWgsl =
        /for\s*\(var ring = 1; ring <= BLUR_RINGS;/.test(f.imageWgsl) &&
        /for\s*\(var s = 0; s < BLUR_SECTORS;/.test(f.imageWgsl);
    if (!facts.i3TapsBounded)
        violations.push("I3 — the zone-blur kernel is not a bounded fixed-tap kernel (3 rings × 8 = 24 compile-time-constant taps)");
    if (!facts.i3BackendsAgree)
        violations.push("I3 — the GLSL and WGSL kernel geometry disagree (the fixed-tap bound must be identical across backends)");
    if (!facts.i3LoopConstGl || !facts.i3LoopConstWgsl)
        violations.push("I3 — the blur loop bound is not the #define'd constant (BLUR_RINGS/BLUR_SECTORS) — a uniform-driven / dynamic loop bound is forbidden (Safari-safe compile-time bound)");

    // ── I4 (d, structural proxy) — one colour source + linear-light + vividness floor ─
    facts.i4VividnessGl = /vividnessFloor\(/.test(f.imageFrag);
    facts.i4VividnessWgsl = /vividnessFloor\(/.test(f.imageWgsl);
    facts.i4LinearGl = /srgbToLinear\(/.test(f.imageFrag) && /linearToSrgb\(/.test(f.imageFrag);
    facts.i4LinearWgsl = /srgbToLinear\(/.test(f.imageWgsl) && /linearToSrgb\(/.test(f.imageWgsl);
    facts.i4SharedChunkGl =
        /procedural-color\.glsl/.test(f.imageFrag) &&
        /OETF_GLSL/.test(f.imageFrag) &&
        /OKLCH_MATRICES_GLSL/.test(f.imageFrag);
    facts.i4SharedChunkWgsl =
        /procedural-color\.wgsl/.test(f.imageWgsl) &&
        /OETF_WGSL/.test(f.imageWgsl) &&
        /OKLCH_MATRICES_WGSL/.test(f.imageWgsl);
    if (!facts.i4VividnessGl || !facts.i4VividnessWgsl)
        violations.push("I4 — the source-agnostic vividness floor is absent from an image program (a washed-out photo must bloom to transmission-fit)");
    if (!facts.i4LinearGl || !facts.i4LinearWgsl)
        violations.push("I4 — an image program does not sample in LINEAR light (srgbToLinear) + close the OETF (linearToSrgb)");
    if (!facts.i4SharedChunkGl || !facts.i4SharedChunkWgsl)
        violations.push("I4 — an image program does not splice the SHARED procedural-color chunk (the ONE colour source across backends — the device-free parity proxy)");

    // ── I5 (e) — the PALETTE-default byte-identity ───────────────────────────────
    facts.i5SourceOptional = /source\?:\s*AuroraSource/.test(f.presets);
    // The palette programs declare NO image sampler/texture (byte-untouched).
    facts.i5PaletteFragClean = !/sampler2D\s+uImage/.test(f.frag) && !/\buImage\b/.test(f.frag);
    facts.i5PaletteWgslClean = !/texture_2d/.test(f.wgsl) && !/imgTex/.test(f.wgsl);
    // The image WGPU lane is its OWN 288-byte struct; the palette struct stays 576.
    facts.i5WgpuBytes576 = /AURORA_WGPU_UNIFORM_BYTES\s*=\s*576\b/.test(f.wgpuBridge);
    facts.i5ImageBytes288 = /AURORA_IMAGE_WGPU_UNIFORM_BYTES\s*=\s*288\b/.test(f.wgpuImageBridge);
    // The image uniforms are ADDITIVE null-location lane entries on the shared cache.
    facts.i5ImageUniformsAdditive =
        /"uImage"/.test(f.glSetup) &&
        /"uBlurMin"/.test(f.glSetup) &&
        /"uBlurMax"/.test(f.glSetup);
    if (!facts.i5SourceOptional)
        violations.push("I5 — AuroraConfig.source is not OPTIONAL (the palette default must be byte-identical — source omitted = palette)");
    if (!facts.i5PaletteFragClean)
        violations.push("I5 — the PALETTE aurora.frag.ts declares an image sampler/uImage (the palette program must be byte-untouched — the image lane is a SEPARATE program)");
    if (!facts.i5PaletteWgslClean)
        violations.push("I5 — the PALETTE aurora.wgsl.ts declares a texture_2d/imgTex binding (the palette program must be byte-untouched)");
    if (!facts.i5WgpuBytes576)
        violations.push("I5 — AURORA_WGPU_UNIFORM_BYTES drifted off 576 (the palette struct must be untouched — the image lane rides its OWN separate struct)");
    if (!facts.i5ImageBytes288)
        violations.push("I5 — AURORA_IMAGE_WGPU_UNIFORM_BYTES is not 288 (the image program's OWN uniform struct, disjoint from the palette 576)");
    if (!facts.i5ImageUniformsAdditive)
        violations.push("I5 — the image uniform lane (uImage/uBlurMin/uBlurMax) is not enrolled in the shared UNIFORM_NAMES cache (additive null-location on the palette program)");

    // ── I6 — the deriveAurora scheme/lBand luminance option (ASK-GU-AURORA-SCHEME-LUMA) ─
    facts.i6SchemeOption = /scheme\?:\s*"light"\s*\|\s*"dark"/.test(f.color);
    facts.i6LBandOption = /lBand\?:\s*readonly \[number, number\]/.test(f.color);
    facts.i6DarkBandExists = /DERIVE_L_BAND_DARK/.test(f.color);
    facts.i6ResolverConsumed = /resolveDeriveLBand\(lBand, scheme\)/.test(f.color);
    const lightBand = f.color.match(/DERIVE_L_BAND:\s*readonly \[number, number\]\s*=\s*\[\s*([\d.]+)\s*,\s*([\d.]+)\s*\]/);
    const darkBand = f.color.match(/DERIVE_L_BAND_DARK:\s*readonly \[number, number\]\s*=\s*\[\s*([\d.]+)\s*,\s*([\d.]+)\s*\]/);
    facts.i6DarkIsLuminousDark =
        !!lightBand &&
        !!darkBand &&
        Number(darkBand[2]) < Number(lightBand[2]) &&
        Number(darkBand[1]) < Number(lightBand[1]);
    if (!facts.i6SchemeOption || !facts.i6LBandOption)
        violations.push("I6 — DeriveAuroraOptions is missing the scheme/lBand luminance option (ASK-GU-AURORA-SCHEME-LUMA)");
    if (!facts.i6DarkBandExists || !facts.i6DarkIsLuminousDark)
        violations.push("I6 — DERIVE_L_BAND_DARK is absent or not a luminous-dark shift (deeper base AND lower apex than the light band)");
    if (!facts.i6ResolverConsumed)
        violations.push("I6 — deriveAurora does not consume resolveDeriveLBand(lBand, scheme) (the option is parsed-and-dropped, not acted on — the load-bearing half)");

    return { violations, facts };
}

function main() {
    const files = {
        upload: read(PATHS.upload),
        imageSource: read(PATHS.imageSource),
        imageFrag: read(PATHS.imageFrag),
        imageWgsl: read(PATHS.imageWgsl),
        frag: read(PATHS.frag),
        wgsl: read(PATHS.wgsl),
        presets: read(PATHS.presets),
        runtime: read(PATHS.runtime),
        wgpuSetup: read(PATHS.wgpuSetup),
        wgpuBridge: read(PATHS.wgpuBridge),
        wgpuImageBridge: read(PATHS.wgpuImageBridge),
        glSetup: read(PATHS.glSetup),
        color: read(PATHS.color),
    };

    const { violations, facts } = detect(files);

    // ── Self-test bites (the anti-evasion floor) — each planted regression MUST flag ──
    const bites = [];

    // Bite 1 (I1) — a raw texImage2D upload planted in runtime.ts (outside the primitive) REDs.
    {
        const bad = files.runtime.replace(
            /imageCoord\.ensureDecoded\(config\);/,
            "imageCoord.ensureDecoded(config); /* evade */ void ((gl) => gl.texImage2D());",
        );
        const r = detect({ ...files, runtime: bad });
        bites.push({ name: "I1 raw-upload-outside-primitive reds", reds: r.violations.some((v) => v.startsWith("I1")) });
    }
    // Bite 2 (I2) — a planted uSource branch in the image frag REDs (the god-branch forbidden).
    {
        const bad = files.imageFrag.replace(
            /uniform float uVividness;/,
            "uniform float uVividness;\nuniform int uSource;",
        );
        const r = detect({ ...files, imageFrag: bad });
        bites.push({ name: "I2 uSource-god-branch reds", reds: r.violations.some((v) => v.startsWith("I2")) });
    }
    // Bite 3 (I3) — a uniform-driven blur loop bound REDs the bounded-tap witness.
    {
        const bad = files.imageFrag.replace(
            /for\s*\(int s = 0; s < BLUR_SECTORS;/,
            "for (int s = 0; s < uBlurTaps;",
        );
        const r = detect({ ...files, imageFrag: bad });
        bites.push({ name: "I3 dynamic-loop-bound reds", reds: r.violations.some((v) => v.startsWith("I3")) });
    }
    // Bite 4 (I5) — a sampler planted in the PALETTE aurora.frag.ts REDs the byte-identity clause.
    {
        const bad = files.frag.replace(
            /uniform float uTime;/,
            "uniform float uTime;\nuniform sampler2D uImage;",
        );
        const r = detect({ ...files, frag: bad });
        bites.push({ name: "I5 palette-sampler-leak reds", reds: r.violations.some((v) => v.startsWith("I5")) });
    }
    // Bite 5 (I5) — a palette-struct byte drift (576 → 592) REDs.
    {
        const bad = files.wgpuBridge.replace(/AURORA_WGPU_UNIFORM_BYTES = 576/, "AURORA_WGPU_UNIFORM_BYTES = 592");
        const r = detect({ ...files, wgpuBridge: bad });
        bites.push({ name: "I5 palette-struct-drift reds", reds: r.violations.some((v) => v.startsWith("I5")) });
    }
    // Bite 6 (I6) — reverting deriveAurora to the hardcoded band (dropping the resolver) REDs.
    {
        const bad = files.color.replace(/resolveDeriveLBand\(lBand, scheme\)/, "DERIVE_L_BAND");
        const r = detect({ ...files, color: bad });
        bites.push({ name: "I6 resolver-dropped reds", reds: r.violations.some((v) => v.startsWith("I6")) });
    }

    facts.selfTest = bites;
    // The capture-pair parity clause (d) — the binding chromium-WGSL vs webkit-WGSL rendered
    // pair rides W-REFLECT3 + proof:ba-gestalt; the device-free proxy is I4.
    facts.dParityRidesJudge = true;
    const biteFailures = bites.filter((b) => !b.reds).map((b) => b.name);
    for (const nm of biteFailures) {
        violations.push(`SELF-TEST — the bite "${nm}" did NOT flag (the detector cannot prove it catches the regression it forbids)`);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:aur-image",
        facts,
        violations,
    });

    if (violations.length) {
        console.error("[proof:aur-image] FAIL\n  - " + violations.join("\n  - "));
        process.exit(1);
    }
    console.log(
        "[proof:aur-image] PASS — the blurred-image source rides ONE shared texture-upload primitive (both backends, the explicit cross-engine flag set); source is a CONSTRUCTION-TIME program permutation (no uSource branch); the zone blur is a bounded fixed 24-tap kernel; both image programs are ONE colour source; the palette default is byte-identical; the deriveAurora scheme/lBand luminance option is acted-on",
    );
}

main();
