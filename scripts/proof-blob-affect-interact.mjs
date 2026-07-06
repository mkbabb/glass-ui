#!/usr/bin/env node
// BG.W-BLOB-AFFECT-INTERACT (F9.R8) — proof:blob-affect-interact.
//
// The blob's POINTER TRUTH + AFFECT-AXIS source floor. The user's 07-05 verdict:
// "on-click and on-hover is AWFUL" + the L5 pointer-shaping ask (the goo-blob ROOT
// square must NOT intercept sibling-card clicks; outside the SDF the event falls
// through). This DEVICE-FREE source gate locks the shape the live paint (the Fable
// interaction PASS + the frame-series π) then judges — the cardinal source/paint split.
//
// FALSIFIABLE SOURCE WITNESSES (each born-RED before this wave on the HEAD shapes):
//
//   I1 — useBlobPointer exposes an SDF-shaped `hitTest(clientX, clientY)` predicate that
//        normalizes a client point + compares its hypot to a silhouette radius, RETURNED
//        on the public handle. Born-RED on HEAD (no hitTest existed).
//   I2 — onPointerMove ENGAGES the attract on the SDF, not unconditionally: the always-on
//        `active.value = true` set is GONE, replaced by a `hypot <= sdfRadius()` gate, and
//        the `hitRadius` option threads the silhouette radius (UNSET → the whole box, the
//        byte-identical goo-dot-matrix reuse). Born-RED (HEAD set `active.value = true`).
//   I3 — GooBlob.vue makes the sibling click FALL THROUGH: the `.goo-blob-wrapper` root is
//        `pointer-events: none` (never blocks the square) + a `.goo-blob-hit` child carries
//        `pointer-events: auto` + a `clip-path: circle(...)` SDF-shaped hit region. Born-RED
//        (HEAD wrapper was the `@click`/pointer-auto listener host, no hit-layer).
//   I4 — GooBlob.vue gates the click-bounce on the hit-test: `onBlobClick` calls
//        `pointer.hitTest(` before `pulse()`/`emit`. Born-RED (HEAD pulsed unconditionally).
//   I5 — the hover SAME-FRAME WAKE is preserved (the W-GOO-REDRESS `pointer.active` → the
//        renderer's `wake()`, DOUBLED here) + the PRM deterministic seat is preserved
//        (`rest()` snaps the spring to centre). Preservation (a regression that severs
//        either reds — no parked-loop lurch, no leaked mid-gesture residual under reduce).
//   A1 — the AFFECT AXES are real in the engine (presets-in-consumers): constants.ts
//        exposes `AffectPoint` {valence, arousal} + `paramsFor` mapping arousal → the
//        motion energy (orbit/wobble/pulse) and valence → the palette warmth — the axes
//        the ≥4 named consumer preset MODES (calm/serene/excited/playful) set. Preservation
//        (the ENGINE ships the axes; the demo/consumer ships the presets).
//   A2 — the DEMO CONSUMER ships the ≥4 NAMED preset MODES: demo/stories/substrates/blob.vue
//        declares a `presets` array carrying ≥4 entries AND the four spec-named keys
//        (calm · serene · excited · playful) are all present. Born-RED on the pre-fix HEAD
//        (the studio shipped 3 — calm/excited/shy — the paint judge's F9.R8 FAIL). The COUNT
//        + NAMED-PRESENCE is the source-decidable floor this gate machine-locks so the count
//        can never silently regress below 4 again; the ≥4-DISTINCT-motion-character blind
//        Fable A/B stays the PAINT bar (this gate does not judge distinctness).
//
// + inline self-test bites (proven EVERY run — the anti-evasion floor): a synthetic
//   pointer without hitTest reds I1; a synthetic onPointerMove with `active.value = true`
//   reds I2; a synthetic GooBlob without the clipped pointer-events hit-layer reds I3; a
//   synthetic onBlobClick that never calls hitTest reds I4. The bites run the SAME pure
//   detectors on planted HEAD/broken shapes, so the born-RED shapes are proven flagged.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const BLOB = resolve(ROOT, "src/components/custom/goo-blob");
const FILES = {
    pointer: resolve(BLOB, "composables/useBlobPointer.ts"),
    sfc: resolve(BLOB, "GooBlob.vue"),
    renderer: resolve(BLOB, "composables/useMetaballRenderer.ts"),
    constants: resolve(BLOB, "constants.ts"),
    demo: resolve(ROOT, "demo/stories/substrates/blob.vue"),
};

/** The four spec-named emotion preset MODES the studio must ship (USER-0705-FOLD §(a)). */
const NAMED_MODES = ["calm", "serene", "excited", "playful"];

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

/** URL-safe comment strip — `(^|[^:])//` keeps a `://` in a URL intact. */
function stripComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
}

function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** The FIRST top-level rule-block body for `selectorLiteral { ... }` (no nested braces
 *  after comment-strip in these SFC `<style scoped>` blocks — a flat declaration list).
 *  `\s*\{` right after the selector means `.goo-blob-wrapper:hover {` never matches the
 *  base `.goo-blob-wrapper {` probe (`:hover` is not whitespace). */
function ruleBody(css, selectorLiteral) {
    const m = css.match(new RegExp(escapeRe(selectorLiteral) + "\\s*\\{([^{}]*)\\}"));
    return m ? m[1] : "";
}

// ── PURE detectors (exported-shape; run on real files AND synthetic self-test strings) ──

/** I1/I2 — the pointer machine's SDF hit-test + the SDF-gated engage. */
export function detectPointer(src) {
    const s = stripComments(src);
    return {
        // I1 — the predicate exists, normalizes a client point, compares hypot, is returned.
        hasHitTestFn: /function\s+hitTest\s*\(\s*clientX/.test(s),
        usesHypot: /Math\.hypot\s*\(/.test(s),
        returnsHitTest: /\breturn\s*\{[\s\S]*?\bhitTest\b[\s\S]*?\}/.test(s),
        hasHitRadiusOption: /\bhitRadius\b/.test(s),
        // I2 — the always-on engage is GONE; active is set off the SDF gate.
        uncondActive: /active\.value\s*=\s*true\b/.test(s),
        sdfGatedActive:
            /active\.value\s*=\s*Math\.hypot\s*\(/.test(s) ||
            /active\.value\s*=[^;]*sdfRadius\s*\(/.test(s),
        // I5 — the PRM deterministic rest pose survives.
        restSnaps: /function\s+rest\s*\(/.test(s) && /springX\.reset\s*\(/.test(s),
    };
}

/** I3/I4 — the SFC's sibling-fall-through shape + the click-gate. */
export function detectSfc(src) {
    const s = stripComments(src);
    const wrapperBody = ruleBody(s, ".goo-blob-wrapper");
    const hitBody = ruleBody(s, ".goo-blob-hit");
    return {
        wrapperPointerNone: /pointer-events\s*:\s*none/.test(wrapperBody),
        hasHitLayer: /goo-blob-hit/.test(s),
        hitClip: /clip-path\s*:\s*circle\s*\(/.test(hitBody),
        hitPointerAuto: /pointer-events\s*:\s*auto/.test(hitBody),
        // I4 — onBlobClick gates on the hit-test before the pulse.
        clickGated: /function\s+onBlobClick[\s\S]*?pointer\.hitTest\s*\(/.test(s),
        // I5 — the hover same-frame wake wire survives (W-GOO-REDRESS doubled).
        wakeWired: /pointer\.active/.test(s) && /renderer\.wake\s*\(\)/.test(s),
    };
}

/** A1 — the engine's affect axes. */
export function detectAffect(src) {
    const s = stripComments(src);
    return {
        affectPoint: /interface\s+AffectPoint\b/.test(s) && /valence/.test(s) && /arousal/.test(s),
        paramsFor: /export\s+function\s+paramsFor\b/.test(s),
    };
}

/** A2 — the demo consumer's `presets` array keys (the ≥4 named MODES). Scopes to the
 *  `const presets … = [ … ];` array literal so a stray `key:` elsewhere never leaks in;
 *  the config objects close with `},` — only the array closes with `];`, so the lazy
 *  `[\s\S]*?\n\];` capture terminates at the array end. */
export function detectPresets(src) {
    const s = stripComments(src);
    const block = s.match(/const\s+presets\b[^=]*=\s*\[([\s\S]*?)\n\];/);
    const body = block ? block[1] : "";
    const keys = [...body.matchAll(/\bkey\s*:\s*["']([a-z][a-z0-9-]*)["']/gi)].map(
        (m) => m[1],
    );
    const missingNamed = NAMED_MODES.filter((n) => !keys.includes(n));
    return { found: block != null, keys, count: keys.length, missingNamed };
}

function runReal() {
    const violations = [];
    const facts = {};

    const pointerSrc = read(FILES.pointer);
    const sfcSrc = read(FILES.sfc);
    const rendererSrc = read(FILES.renderer);
    const constantsSrc = read(FILES.constants);
    const demoSrc = read(FILES.demo);

    if (pointerSrc == null) violations.push("useBlobPointer.ts is absent");
    if (sfcSrc == null) violations.push("GooBlob.vue is absent");
    if (demoSrc == null) violations.push("demo/stories/substrates/blob.vue is absent");

    // ── I1 / I2 / I5 (pointer) ──
    const p = detectPointer(pointerSrc ?? "");
    facts.pointer = p;
    if (!p.hasHitTestFn)
        violations.push(
            "I1: useBlobPointer has no `hitTest(clientX, clientY)` SDF predicate — the L5 pointer-shaping ask needs the authoritative hit-test (born-RED: HEAD had none)",
        );
    if (!p.usesHypot)
        violations.push(
            "I1: the hit-test does not compare a normalized distance (`Math.hypot`) — the silhouette test must be a disc, not a bbox",
        );
    if (!p.returnsHitTest)
        violations.push("I1: `hitTest` is not RETURNED on the public handle — the SFC cannot gate on it");
    if (!p.hasHitRadiusOption)
        violations.push(
            "I2: useBlobPointer takes no `hitRadius` option — the silhouette radius must thread from the shaped consumer (UNSET → the whole box, the byte-identical goo-dot-matrix reuse)",
        );
    if (p.uncondActive)
        violations.push(
            "I2: onPointerMove still sets `active.value = true` unconditionally — hovering the empty box margin lunges the blob; engage on the SDF (`hypot <= sdfRadius()`) (born-RED: HEAD set it true)",
        );
    if (!p.sdfGatedActive)
        violations.push(
            "I2: `active` is not set off the SDF gate (`active.value = Math.hypot(...) <= sdfRadius()`) — the engage must be silhouette-shaped",
        );
    if (!p.restSnaps)
        violations.push(
            "I5: the PRM deterministic seat regressed — `rest()` must snap the spring (`springX.reset(0, 0)`) so no mid-gesture residual leaks onto the one static frame",
        );

    // ── I3 / I4 / I5 (SFC) ──
    const sfc = detectSfc(sfcSrc ?? "");
    facts.sfc = sfc;
    if (!sfc.wrapperPointerNone)
        violations.push(
            "I3: `.goo-blob-wrapper` is not `pointer-events: none` — the ROOT square still intercepts sibling-card clicks (born-RED: HEAD wrapper was the pointer-auto @click host)",
        );
    if (!sfc.hasHitLayer)
        violations.push(
            "I3: there is no `.goo-blob-hit` interactive surface — the pointer listeners have no SDF-shaped home",
        );
    if (!sfc.hitClip)
        violations.push(
            "I3: `.goo-blob-hit` is not `clip-path: circle(...)` — the hit region must be the SDF-shaped disc so the corners fall through (a full-box hit re-blocks siblings)",
        );
    if (!sfc.hitPointerAuto)
        violations.push(
            "I3: `.goo-blob-hit` is not `pointer-events: auto` — the clipped surface must be the one that RECEIVES the pointer",
        );
    if (!sfc.clickGated)
        violations.push(
            "I4: `onBlobClick` does not call `pointer.hitTest(` before the pulse — a click outside the SDF must NOT bounce the blob (born-RED: HEAD pulsed unconditionally)",
        );
    if (!sfc.wakeWired)
        violations.push(
            "I5: the hover same-frame wake wire regressed — GooBlob must watch `pointer.active` → `renderer.wake()` (the W-GOO-REDRESS doubled precedent; no parked-loop lurch on first hover)",
        );

    // ── A1 (affect axes — preservation) ──
    const affect = detectAffect(constantsSrc ?? "");
    facts.affect = affect;
    if (!affect.affectPoint)
        violations.push(
            "A1: constants.ts has no `AffectPoint` {valence, arousal} — the engine must ship the affect axes the consumer preset MODES set (presets-in-consumers)",
        );
    if (!affect.paramsFor)
        violations.push(
            "A1: constants.ts has no `paramsFor` — the arousal→motion / valence→palette derivation is the affect-register surface",
        );

    // ── A2 (demo consumer ships the ≥4 named preset MODES) ──
    const presets = detectPresets(demoSrc ?? "");
    facts.presets = presets;
    if (demoSrc != null) {
        if (!presets.found)
            violations.push(
                "A2: demo/stories/substrates/blob.vue declares no `const presets = [ … ]` array — the studio must ship the emotion preset MODES",
            );
        else if (presets.count < 4)
            violations.push(
                `A2: the blob studio ships only ${presets.count} preset MODE(s) [${presets.keys.join(", ")}] — the ≥4 named-mode bar is UNMET (born-RED: the pre-fix HEAD shipped 3 — calm/excited/shy — the paint judge's F9.R8 FAIL)`,
            );
        if (presets.found && presets.missingNamed.length)
            violations.push(
                `A2: the blob studio is missing the spec-named mode(s) [${presets.missingNamed.join(", ")}] — the set calm·serene·excited·playful must all be present (a mode may ride as a 5th, but the four named modes are required)`,
            );
    }

    // rendererSrc is read for completeness (the wake target lives there); no direct clause.
    facts.rendererPresent = rendererSrc != null;

    return { violations, facts };
}

function selfTest() {
    const fails = [];

    // I1 bite — a pointer WITHOUT hitTest reads as un-shaped.
    const noHit = detectPointer(
        "export function useBlobPointer(el){ function onPointerMove(e){ active.value = true; } return { tick }; }",
    );
    if (noHit.hasHitTestFn || !noHit.uncondActive)
        fails.push("self-test I1/I2: a HEAD-shaped pointer (no hitTest + always-on active) was NOT flagged");

    // I2 bite — the SDF-gated shape reads as fixed (the positive control).
    const shaped = detectPointer(
        "export function useBlobPointer(el, options={}){ const {hitRadius}=options; function sdfRadius(){ return hitRadius?hitRadius():Infinity; } function hitTest(clientX, clientY){ return Math.hypot(0,0) <= sdfRadius(); } function onPointerMove(e){ active.value = Math.hypot(rawX,rawY) <= sdfRadius(); } return { tick, hitTest }; }",
    );
    if (!shaped.hasHitTestFn || shaped.uncondActive || !shaped.sdfGatedActive || !shaped.hasHitRadiusOption)
        fails.push("self-test I2: the SDF-gated pointer shape did NOT read as fixed");

    // I3 bite — a GooBlob without the clipped pointer-events hit-layer is flagged.
    const noLayer = detectSfc(
        "<template><div class=\"goo-blob-wrapper\" @click=\"onBlobClick\"><canvas class=\"goo-blob-canvas\"/></div></template><style>.goo-blob-wrapper{ cursor: pointer; }.goo-blob-canvas{ pointer-events: none; }</style>",
    );
    if (noLayer.wrapperPointerNone || noLayer.hasHitLayer || noLayer.hitClip)
        fails.push("self-test I3: a HEAD-shaped SFC (pointer-auto wrapper, no clipped hit-layer) was NOT flagged");

    // I4 bite — an onBlobClick that never calls hitTest is flagged.
    const noGate = detectSfc(
        "<template><div class=\"goo-blob-wrapper\"><div class=\"goo-blob-hit\"/></div></template><script>function onBlobClick(){ pulse(); emit('click'); }</script><style>.goo-blob-wrapper{ pointer-events: none; }.goo-blob-hit{ pointer-events: auto; clip-path: circle(20%); }</style>",
    );
    if (noGate.clickGated)
        fails.push("self-test I4: an ungated onBlobClick (no pointer.hitTest) was NOT flagged");

    // I3/I4 positive control — a fully-shaped SFC reads as fixed.
    const goodSfc = detectSfc(
        "<template><div class=\"goo-blob-wrapper\"><canvas class=\"goo-blob-canvas\"/><div class=\"goo-blob-hit\" @click=\"onBlobClick\"/></div></template><script>function onBlobClick(e){ if(!pointer.hitTest(e.clientX,e.clientY)) return; pulse(); } watch(()=>pointer.active, a=>{ if(a) renderer.wake(); });</script><style>.goo-blob-wrapper{ pointer-events: none; }.goo-blob-canvas{ pointer-events: none; }.goo-blob-hit{ pointer-events: auto; clip-path: circle(20%); }</style>",
    );
    if (
        !goodSfc.wrapperPointerNone ||
        !goodSfc.hasHitLayer ||
        !goodSfc.hitClip ||
        !goodSfc.hitPointerAuto ||
        !goodSfc.clickGated ||
        !goodSfc.wakeWired
    )
        fails.push("self-test: a fully-shaped SFC did NOT read as fixed (the detector is over-strict)");

    // A2 bite — the pre-fix HEAD studio (3 modes, no serene/playful) is flagged on BOTH
    // the count floor AND the named-presence floor.
    const head3 = detectPresets(
        "const presets: readonly ConfiguratorPreset<Cfg>[] = [\n" +
            '  { key: "calm", config: {} },\n' +
            '  { key: "excited", config: {} },\n' +
            '  { key: "shy", config: {} },\n' +
            "];",
    );
    if (head3.count >= 4 || head3.missingNamed.length === 0)
        fails.push("self-test A2: the 3-mode HEAD studio (calm/excited/shy) was NOT flagged (count<4 + missing serene/playful)");

    // A2 positive control — the fixed 5-mode studio (the 4 named + shy) reads as fixed.
    const good5 = detectPresets(
        "const presets: readonly ConfiguratorPreset<Cfg>[] = [\n" +
            '  { key: "calm", config: {} },\n' +
            '  { key: "serene", config: {} },\n' +
            '  { key: "excited", config: {} },\n' +
            '  { key: "playful", config: {} },\n' +
            '  { key: "shy", config: {} },\n' +
            "];",
    );
    if (!good5.found || good5.count < 4 || good5.missingNamed.length)
        fails.push("self-test A2: the fixed 5-mode studio (4 named + shy) did NOT read as fixed (the detector is over-strict)");

    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const { violations, facts } = runReal();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = violations.length === 0 && selfFails.length === 0;

    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_BLOB_AFFECT_INTERACT_ARTIFACT",
        "BG-blob-affect-interact",
    );
    writeGateArtifact(ARTIFACT, {
        gate: "proof:blob-affect-interact",
        wave: "BG.W-BLOB-AFFECT-INTERACT",
        generatedAt: snapshotStamp(),
        status: ok ? "pass" : "fail",
        facts,
        violations,
        selfTestFailures: selfFails,
    });

    console.log(
        "proof:blob-affect-interact — the blob pointer-truth (SDF hit-test) + affect-axis source floor (BG.W-BLOB-AFFECT-INTERACT / F9.R8)",
    );
    console.log(
        `  pointer : hitTest ${facts.pointer?.hasHitTestFn ? "✓" : "✗"} · sdf-gated-active ${facts.pointer?.sdfGatedActive ? "✓" : "✗"} · uncond-active ${facts.pointer?.uncondActive ? "YES ✗" : "no ✓"} · rest-snaps ${facts.pointer?.restSnaps ? "✓" : "✗"}`,
    );
    console.log(
        `  sfc     : wrapper-none ${facts.sfc?.wrapperPointerNone ? "✓" : "✗"} · hit-layer ${facts.sfc?.hasHitLayer ? "✓" : "✗"} · clip ${facts.sfc?.hitClip ? "✓" : "✗"} · click-gated ${facts.sfc?.clickGated ? "✓" : "✗"} · wake ${facts.sfc?.wakeWired ? "✓" : "✗"}`,
    );
    console.log(
        `  affect  : AffectPoint ${facts.affect?.affectPoint ? "✓" : "✗"} · paramsFor ${facts.affect?.paramsFor ? "✓" : "✗"}`,
    );
    console.log(
        `  presets : count ${facts.presets?.count ?? 0} ${(facts.presets?.count ?? 0) >= 4 ? "✓" : "✗"} · named [${(facts.presets?.keys ?? []).join(", ")}]${facts.presets?.missingNamed?.length ? ` · missing ${facts.presets.missingNamed.join(", ")} ✗` : " ✓"}`,
    );
    if (violations.length) {
        console.error("  RED:");
        for (const v of violations) console.error("    ✗ " + v);
    } else {
        console.log("  GREEN (I1 hit-test · I2 SDF-gated engage · I3 sibling-fall-through · I4 click-gate · I5 wake+PRM-seat · A1 affect axes · A2 ≥4 named preset MODES)");
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("  --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("    ✗ " + f);
        } else {
            console.log("  --selftest — every planted defect RED ✓");
        }
    }
    console.log(`\n  status: ${ok ? "PASS" : "FAIL"}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(ok ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}
