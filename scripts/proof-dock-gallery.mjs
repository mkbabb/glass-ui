#!/usr/bin/env node
// proof:dock-gallery — BE.W-LIQUID-MORPH / audit §W10 — the dock-gallery RE-HOST onto the
// real library primitives + the ONE demo chassis (born-RED at HEAD → GREEN at the wave).
//
// THE DEFECT THIS LOCKS (audit §W10). The 7 gallery tiles were CSS-transition FACSIMILES
// that used NONE of the engine: each re-pasted the tile chassis (bg/stage/caption/label/
// hint), the glass-plate triplet, AND an `--ex-spring: cubic-bezier(0.34, 1.32, 0.5, 1)`
// overshoot bezier 5-10× (a 2nd motion authority off the shipped `--spring-*` register,
// the overshoot y>1 mis-applied to EFFECTS legs). The "Dynamic Island · Call" tile did NOT
// split — it grew DOWNWARD (the opposite of the reference). The route had no live field
// (the "one GL per route" comment named 2 contexts that did not exist).
//
// THE GESTALT FIX (the W10 re-host):
//   • ONE <DockExampleTile> demo chassis factors the bg slot + caption + the SHIPPED
//     --spring-* register (NO bespoke overshoot bezier re-minted) + the PRM block ONCE.
//   • Every example COMPOSES a real engine — useBloomUp / useDockFission — so the demo is
//     a CONSUMER of the vocabulary, never a re-fork.
//   • The Dynamic Island Call is an ACTUAL fission (useDockFission), not a downward grow.
//   • ONE shared <DockStage> aurora + ONE <DockGooFilter> mount for the route.
//   • The example/tile <style> blocks animate ZERO layout property (the compositor-only
//     floor, demo-scoped — the down-payment on the W11 proof:no-layout-animation widening).
//
// Device-free SOURCE arm (tags ["local","ci"]). The BINDING painted truth — each tile
// morphs on the real engine over the live field, both modes — is the W-GESTALT-ROSTER-BE
// gallery π rows (no source-green close).
//
// FIVE FALSIFIABLE WITNESSES (each born-RED at HEAD — the facsimile gallery):
//   G1 — THE ONE CHASSIS exists + is composed. DockExampleTile.vue exists, declares the
//        SHIPPED --spring-* register (not a bespoke cubic-bezier overshoot), exposes the
//        [data-glass-field] stage + the PRM block; the gallery + every example COMPOSE it
//        (the duplication is dead — no example re-declares the bg/stage/caption chassis).
//   G2 — EVERY EXAMPLE COMPOSES A REAL ENGINE. Each examples/*.vue imports useBloomUp OR
//        useDockFission (from the shipped library path) — a CSS-only facsimile reds.
//   G3 — THE CALL IS AN ACTUAL FISSION. DynamicIslandCall.vue composes useDockFission +
//        DOCK_SPLIT_SIGNATURES + registerPiece + the .dock-fission-bridge/.dock-fission-
//        piece recipe — a downward-grow facsimile (no fission import) reds.
//   G4 — COMPOSITOR-ONLY (demo-scoped). No example/tile <style> animates a LAYOUT property
//        (a `transition: <reflow-prop>` / a `@keyframes` step writing a reflow prop). The
//        facsimile's max-block-size/-webkit-line-clamp/inline-size transitions red.
//   G5 — ONE SHARED FIELD + ONE GOO FILTER + NO BESPOKE SPRING. The gallery mounts exactly
//        ONE <DockStage> + ONE <DockGooFilter>; NO example re-mints `--ex-spring:
//        cubic-bezier(...)` (the shipped register is the only motion authority).
//
// + a self-test (each planted facsimile pattern MUST flag).
//
// Run: node scripts/proof-dock-gallery.mjs

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-gallery";

const GALLERY = "demo/stories/dock/dock-gallery.vue";
const CHASSIS = "demo/stories/dock/DockExampleTile.vue";
const CALL = "demo/stories/dock/examples/DynamicIslandCall.vue";
const EXAMPLES_DIR = "demo/stories/dock/examples";

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip comments + (for an SFC) keep only the <style> region(s). A demo example's morph
// logic is JS; its layout-animation risk is the <style> block. The G4 scan masks
// everything outside <style> so a `<template>` `transition` mention or a JS string never
// false-flags.
const stripCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
function styleBlocks(sfc) {
    const out = [];
    const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let m;
    while ((m = re.exec(sfc))) out.push(m[1]);
    return stripCss(out.join("\n"));
}

// The reflow (layout-triggering) property set — mirrors proof-no-layout-animation's
// REFLOW_PROPS so the demo-scoped floor matches the library floor.
const REFLOW_PROPS = [
    "padding", "margin", "font-size",
    "width", "min-width", "max-width",
    "inline-size", "min-inline-size", "max-inline-size",
    "height", "min-height", "max-height",
    "block-size", "min-block-size", "max-block-size",
    "top", "left", "right", "bottom", "inset",
    "grid-template", "grid-auto", "flex-basis", "line-height",
    "border-width", "gap", "row-gap", "column-gap",
    "-webkit-line-clamp", "line-clamp",
];
const isReflowProp = (prop) => {
    const p = prop.toLowerCase();
    if (/^border(-(top|right|bottom|left|block|inline))?-color$/.test(p)) return false;
    if (/^border(-(top|right|bottom|left|block|inline))?-style$/.test(p)) return false;
    return REFLOW_PROPS.some((r) => p === r || p.startsWith(`${r}-`));
};

/**
 * Scan a stripped CSS body for a `transition`/`transition-property` leg whose property is
 * a reflow trigger. Returns the offending property names. We read each `transition:`/
 * `transition-property:` declaration value and check its leading property tokens.
 */
function layoutTransitions(css) {
    const hits = [];
    // transition-property: <props>;
    for (const m of css.matchAll(/transition-property\s*:\s*([^;}]+)[;}]/gi)) {
        for (const tok of m[1].split(",")) {
            const p = tok.trim().split(/\s+/)[0];
            if (p && p !== "all" && isReflowProp(p)) hits.push(p);
            if (p === "all") hits.push("all");
        }
    }
    // transition: <prop> <dur> ...; (shorthand — the first token of each comma group)
    for (const m of css.matchAll(/(?<!-)\btransition\s*:\s*([^;}]+)[;}]/gi)) {
        for (const group of m[1].split(",")) {
            const p = group.trim().split(/\s+/)[0];
            if (p && p !== "all" && isReflowProp(p)) hits.push(p);
            if (p === "all") hits.push("all");
        }
    }
    return hits;
}

/** Scan @keyframes blocks for a step writing a reflow property. */
function layoutKeyframes(css) {
    const hits = [];
    for (const kf of css.matchAll(/@keyframes\s+[\w-]+\s*\{([\s\S]*?)\}\s*\}/gi)) {
        const body = kf[0];
        for (const decl of body.matchAll(/([a-z-]+)\s*:/gi)) {
            const p = decl[1].toLowerCase();
            // skip the keyframe selectors (from/to/N%) + transition (handled above)
            if (isReflowProp(p)) hits.push(p);
        }
    }
    return hits;
}

const fails = [];

// ── G1 — the ONE chassis exists + is composed ───────────────────────────────────────
function detectG1() {
    const v = [];
    const facts = {};
    const chassis = readRel(CHASSIS);
    facts.exists = chassis.length > 0;
    if (!facts.exists) {
        v.push(`G1: ${CHASSIS} does not exist — the duplicated tile chassis was never factored`);
        return { violations: v, facts };
    }
    const css = styleBlocks(chassis);
    // declares the SHIPPED spring register (not a bespoke overshoot bezier).
    facts.shippedSpring = /--ex-spring\s*:\s*var\(\s*--spring-/.test(css);
    facts.noBespokeBezierInChassis = !/--ex-spring\s*:\s*cubic-bezier/.test(css);
    // the [data-glass-field] stage + the PRM block live ONCE here.
    facts.field = /data-glass-field/.test(chassis);
    facts.prm = /prefers-reduced-motion\s*:\s*reduce/.test(css);
    // the gallery composes the chassis (via the examples) — every example imports it.
    if (!facts.shippedSpring)
        v.push("G1: DockExampleTile does not declare --ex-spring off the SHIPPED --spring-* register (a bespoke cubic-bezier overshoot would be a 2nd motion authority)");
    if (!facts.noBespokeBezierInChassis)
        v.push("G1: DockExampleTile re-mints --ex-spring as a cubic-bezier(...) overshoot — the gallery must read the shipped --spring-* register");
    if (!facts.field)
        v.push("G1: DockExampleTile does not expose the [data-glass-field] stage (the bloom's 4th color channel field)");
    if (!facts.prm)
        v.push("G1: DockExampleTile does not declare the PRM block ONCE (every example would have to re-declare it)");
    return { violations: v, facts };
}

// ── G2 — every example composes a real engine ────────────────────────────────────────
const ENGINE_IMPORT = /(useBloomUp|useDockFission)/;
function listExamples() {
    const dir = resolve(ROOT, EXAMPLES_DIR);
    if (!existsSync(dir)) return [];
    return readdirSync(dir)
        .filter((f) => f.endsWith(".vue"))
        .map((f) => `${EXAMPLES_DIR}/${f}`);
}
function detectG2() {
    const v = [];
    const facts = { examples: [], composed: 0 };
    const examples = listExamples();
    facts.count = examples.length;
    for (const ex of examples) {
        const src = readRel(ex);
        // the engine must be IMPORTED (a script reference, not a comment) — strip JS comments.
        const js = src
            .replace(/<style[\s\S]*?<\/style>/gi, "")
            .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
            .replace(/\/\/[^\n]*/g, "");
        const composes =
            /import\s*\{[^}]*\b(useBloomUp|useDockFission)\b/.test(js) ||
            /from\s*["'][^"']*(useBloomUp|composables)["']/.test(js) && ENGINE_IMPORT.test(js);
        // also require it to COMPOSE the chassis (no example re-pastes the tile chassis).
        const usesChassis = /DockExampleTile/.test(js);
        facts.examples.push({ ex, composes, usesChassis });
        if (composes) facts.composed++;
        if (!composes)
            v.push(`G2: ${ex} does not COMPOSE a real engine (useBloomUp/useDockFission) — a CSS-transition facsimile`);
        if (!usesChassis)
            v.push(`G2: ${ex} does not compose <DockExampleTile> — it re-pastes the tile chassis`);
    }
    if (examples.length < 7)
        v.push(`G2: only ${examples.length} example(s) found (expected the 7 gallery surfaces)`);
    return { violations: v, facts };
}

// ── G3 — the Call is an ACTUAL fission ───────────────────────────────────────────────
function detectG3() {
    const v = [];
    const facts = {};
    const src = readRel(CALL);
    facts.exists = src.length > 0;
    if (!facts.exists) {
        v.push(`G3: ${CALL} does not exist — the Dynamic Island Call tile was not re-hosted`);
        return { violations: v, facts };
    }
    const js = src.replace(/<style[\s\S]*?<\/style>/gi, "");
    facts.fission = /useDockFission/.test(js);
    facts.signature = /DOCK_SPLIT_SIGNATURES/.test(js);
    facts.registerPiece = /registerPiece/.test(js);
    facts.bridgeRecipe = /dock-fission-bridge/.test(src) && /dock-fission-piece/.test(src);
    if (!facts.fission)
        v.push("G3: DynamicIslandCall does not compose useDockFission — it is a downward-grow facsimile, not an ACTUAL split");
    if (!facts.signature)
        v.push("G3: DynamicIslandCall does not read a DOCK_SPLIT_SIGNATURES descriptor (the per-context goo signature)");
    if (!facts.registerPiece)
        v.push("G3: DynamicIslandCall does not register fission PIECES (registerPiece) — the two halves never detach");
    if (!facts.bridgeRecipe)
        v.push("G3: DynamicIslandCall does not host the library .dock-fission-bridge/.dock-fission-piece goo recipe");
    return { violations: v, facts };
}

// ── G4 — compositor-only (demo-scoped) ───────────────────────────────────────────────
function detectG4() {
    const v = [];
    const facts = { scanned: [] };
    const files = [CHASSIS, GALLERY, ...listExamples()];
    for (const f of files) {
        const css = styleBlocks(readRel(f));
        if (!css.trim()) continue;
        const tHits = layoutTransitions(css);
        const kHits = layoutKeyframes(css);
        facts.scanned.push({ f, transitionLayout: tHits, keyframeLayout: kHits });
        for (const p of tHits)
            v.push(`G4: ${f} animates a LAYOUT property via transition: \`${p}\` (the per-frame reflow storm — compositor-only floor)`);
        for (const p of kHits)
            v.push(`G4: ${f} animates a LAYOUT property in @keyframes: \`${p}\` (compositor-only floor)`);
    }
    return { violations: v, facts };
}

// ── G5 — one shared field + one goo filter + no bespoke spring ───────────────────────
function detectG5() {
    const v = [];
    const facts = {};
    const gallery = readRel(GALLERY);
    // scope to the <template> region (so a <script> JS-comment mention of the tag never
    // counts), then strip HTML comments (so a template comment mention never counts).
    const tplMatch = gallery.match(/<template[^>]*>([\s\S]*?)<\/template>/i);
    const tpl = (tplMatch ? tplMatch[1] : "").replace(/<!--[\s\S]*?-->/g, "");
    // count OPENING tags only (a `</DockStage>` close must not double-count).
    facts.dockStageCount = (tpl.match(/<DockStage(?=[\s/>])/g) || []).length;
    facts.gooFilterCount = (tpl.match(/<DockGooFilter(?=[\s/>])/g) || []).length;
    // no example re-mints --ex-spring: cubic-bezier(...) — the shipped register is the
    // only motion authority across the gallery.
    const bespoke = [];
    for (const f of [CHASSIS, GALLERY, ...listExamples()]) {
        const css = styleBlocks(readRel(f));
        if (/--ex-spring\s*:\s*cubic-bezier/.test(css)) bespoke.push(f);
    }
    facts.bespokeSpringFiles = bespoke;
    if (facts.dockStageCount !== 1)
        v.push(`G5: the gallery mounts ${facts.dockStageCount} <DockStage> (expected exactly ONE shared aurora field for the route)`);
    if (facts.gooFilterCount !== 1)
        v.push(`G5: the gallery mounts ${facts.gooFilterCount} <DockGooFilter> (expected exactly ONE goo <filter> mount for the route)`);
    for (const f of bespoke)
        v.push(`G5: ${f} re-mints --ex-spring: cubic-bezier(...) — a 2nd motion authority off the shipped --spring-* register`);
    return { violations: v, facts };
}

// ── Self-test — each planted facsimile pattern MUST flag ─────────────────────────────
function selfTest() {
    const out = [];
    // (a) a layout transition is caught by layoutTransitions.
    const facsimileCss = `.x { transition: max-block-size 0.5s ease, opacity 0.3s; }`;
    if (layoutTransitions(stripCss(facsimileCss)).length === 0)
        out.push("[SELF-TEST] a `transition: max-block-size` facsimile did NOT flag (the demo-scoped compositor detector is broken)");
    // (b) a `transition: all` is caught.
    if (!layoutTransitions(".y { transition: all 0.4s; }").includes("all"))
        out.push("[SELF-TEST] a `transition: all` did NOT flag (the un-scopable-all bite is broken)");
    // (c) a -webkit-line-clamp transition is caught.
    if (layoutTransitions(".z { transition: -webkit-line-clamp 0.4s; }").length === 0)
        out.push("[SELF-TEST] a `transition: -webkit-line-clamp` facsimile did NOT flag");
    // (d) a compositor-only transition does NOT flag (no false positive).
    if (layoutTransitions(".ok { transition: transform 0.3s var(--ex-spring), opacity 0.2s; }").length !== 0)
        out.push("[SELF-TEST] a compositor-only `transition: transform, opacity` FALSE-flagged (the partition is wrong)");
    // (e) a @keyframes writing a layout prop is caught.
    if (layoutKeyframes("@keyframes grow { from { width: 0; } to { width: 100%; } }").length === 0)
        out.push("[SELF-TEST] a `@keyframes { width }` layout animation did NOT flag");
    // (f) a compositor @keyframes does NOT flag.
    if (layoutKeyframes("@keyframes pulse { from { transform: scale(1); } to { transform: scale(1.1); } }").length !== 0)
        out.push("[SELF-TEST] a compositor `@keyframes { transform }` FALSE-flagged");
    return out;
}

// ── Run ──────────────────────────────────────────────────────────────────────────────
const results = { G1: detectG1(), G2: detectG2(), G3: detectG3(), G4: detectG4(), G5: detectG5() };
for (const [k, r] of Object.entries(results)) {
    for (const msg of r.violations) fails.push(msg);
    void k;
}
const st = selfTest();
for (const msg of st) fails.push(msg);

const stamp = snapshotStamp();
writeGateArtifact(
    gateArtifactPath("GLASS_UI_DOCK_GALLERY_ARTIFACT", "BE-dock-gallery"),
    {
        command: COMMAND,
        stamp,
        pass: fails.length === 0,
        facts: Object.fromEntries(Object.entries(results).map(([k, r]) => [k, r.facts])),
        fails,
    },
);

if (fails.length) {
    console.error("proof:dock-gallery — FAIL");
    for (const f of fails) console.error("  " + f);
    process.exit(1);
}
console.log(
    "proof:dock-gallery — PASS (G1 ONE chassis composed + shipped-spring · G2 every example composes a real engine · G3 the Call is an ACTUAL fission · G4 compositor-only demo-scoped · G5 ONE field + ONE goo filter + no bespoke spring · self-test bites fired)",
);
