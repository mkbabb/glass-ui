#!/usr/bin/env node
// proof:dock-a11y — BE.W11 — de-shadcn the liquid-dock SEMANTICS.
//
// The W11 a11y debt the liquid-playground prototype shipped:
//   (1) the bloom/fission triggers were `<div role="button" tabindex="0">` (a
//       presentational div faking a button — no native keyboard/role semantics);
//   (2) the bloomed sheet/player content was a labelled role=dialog but the inner
//       island content was BLANKET aria-hidden (a screen reader heard an empty husk),
//       and the non-modal bloom had no aria-live open announcement;
//   (3) no `.focus-ring` on any control (the goo filter:url()/clip-path swallows the UA
//       ring) — the token ring must ride the un-filtered layer;
//   (4) the plates hardcoded `blur(...px)` bypassing `--glass-level` (so
//       prefers-reduced-transparency/prefers-contrast never reached them);
//   (5) the bloom origin stayed keyboard-reachable while invisible (opacity:0 only, no
//       STATE-DRIVEN :inert — the GlassDock precedent).
//
// Device-free SOURCE detector over the SFC (demo/stories/dock/liquid-playground.vue) +
// the CSS (demo/stories/dock/liquid-morph.css). Tags ["local","ci","release"]. The
// RENDERED-DOM proof (the axe-clean a11y tree, the live announcer, the focus ring paint)
// is the orchestrator's π — this gate proves the SOURCE shape born-RED→GREEN.
//
// Run: node scripts/proof-dock-a11y.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-a11y";

const SFC = "demo/stories/dock/liquid-playground.vue";
// BG.W-DEAD-COMPOSABLE-CUT — liquid-morph.css MOVED src/styles/glass/ → demo/stories/dock/
// (the god-module baseline drained; the sheet is demo-only, co-located with its consumer).
const CSS = "demo/stories/dock/liquid-morph.css";

const stripHtml = (s) =>
    s.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));
const stripCss = (s) =>
    s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Isolate the SFC <template> body (so a marker in a <script> string can never satisfy a
// DOM-shape clause), then strip HTML comments. The template contains NESTED
// <template v-if>/<template v-else> tags, so capture from the FIRST <template …> open to
// the LAST </template> close (greedy — the <style> block carries no </template>), not the
// first inner close.
function templateBody(sfc) {
    const open = /<template\b[^>]*>/i.exec(sfc);
    if (!open) return "";
    const lastClose = sfc.lastIndexOf("</template>");
    if (lastClose < 0) return "";
    return stripHtml(sfc.slice(open.index + open[0].length, lastClose));
}

// ── A1 — the bloom/fission triggers are REAL <button>s, NOT <div role="button"> ──
export function detectA1() {
    const violations = [];
    const facts = {};
    const tpl = templateBody(readRel(SFC));
    // the two morph triggers are <button class="liquid-pill ..."> + <button
    // class="liquid-island-host ...">; carry the de-shadcn'd real-button shape.
    facts.pillIsButton =
        /<button\b[\s\S]*?class="liquid-pill\b/.test(tpl) ||
        /<button\b[\s\S]*?:class="\{[^}]*liquid-pill/.test(tpl) ||
        /<button\b[\s\S]*?class="[^"]*\bliquid-pill\b/.test(tpl);
    facts.islandIsButton = /<button\b[\s\S]*?class="[^"]*\bliquid-island-host\b/.test(tpl);
    // NO <div role="button"> survives (the nested-interactive / div-button anti-pattern).
    facts.noDivRoleButton = !/<div\b[^>]*\brole="button"/.test(tpl);
    if (!facts.pillIsButton)
        violations.push("A1: the bloom pill (.liquid-pill) is not a real <button> — a <div role=button> fakes a button (no native keyboard/role); the de-shadcn'd shape is a real <button>");
    if (!facts.islandIsButton)
        violations.push("A1: the fission host (.liquid-island-host) is not a real <button> — the div-button anti-pattern survives");
    if (!facts.noDivRoleButton)
        violations.push("A1: a <div role=\"button\"> survives in the playground template — the presentational-div-faking-a-button anti-pattern is not de-shadcn'd");
    return { violations, facts };
}

// ── A2 — the bloomed content is real (labelled role=dialog + a polite aria-live
//        announcer), NOT a blanket aria-hidden husk ──
export function detectA2() {
    const violations = [];
    const facts = {};
    const tpl = templateBody(readRel(SFC));
    // the sheet + player are labelled dialogs.
    facts.sheetDialog = /class="liquid-sheet"[\s\S]*?role="dialog"/.test(tpl) || /role="dialog"[\s\S]*?class="liquid-sheet"/.test(tpl);
    facts.playerDialog = /class="liquid-player"[\s\S]*?role="dialog"/.test(tpl) || /role="dialog"[\s\S]*?class="liquid-player"/.test(tpl);
    // a polite aria-live open announcer exists.
    facts.liveAnnouncer = /aria-live="polite"/.test(tpl);
    // the island CONTENT layer is NOT blanket aria-hidden (the husk) — the readable text
    // is exposed; only the decorative blob/eq/glyph layers stay hidden.
    facts.contentNotHusk = !/class="liquid-island-content"\s+aria-hidden="true"/.test(tpl) && !/aria-hidden="true"\s+class="liquid-island-content"/.test(tpl);
    // the decorative layers DO stay hidden (the goo blob bridge + the eq bars).
    facts.decorativeHidden =
        /class="dock-fission-bridge[^"]*"\s+aria-hidden="true"/.test(tpl) &&
        /class="liquid-island-eq"\s+aria-hidden="true"/.test(tpl);
    if (!facts.sheetDialog)
        violations.push("A2: the Places sheet is not a labelled role=dialog");
    if (!facts.playerDialog)
        violations.push("A2: the player is not a labelled role=dialog");
    if (!facts.liveAnnouncer)
        violations.push("A2: no polite aria-live open announcer — a non-modal bloom (focus does not auto-trap) must announce its open to a screen reader");
    if (!facts.contentNotHusk)
        violations.push("A2: the island content layer (.liquid-island-content) is blanket aria-hidden — the timer/track text is a husk a screen reader cannot read; only decorative layers (goo blob, eq) stay hidden");
    if (!facts.decorativeHidden)
        violations.push("A2: the decorative goo blob bridge / eq bars are not aria-hidden — only truly decorative layers should be hidden (and they MUST be)");
    return { violations, facts };
}

// ── A3 — every interactive trigger composes `.focus-ring` (the token ring on the
//        un-filtered layer; box-shadow survives the rounded clip) ──
export function detectA3() {
    const violations = [];
    const facts = {};
    const tpl = templateBody(readRel(SFC));
    facts.pillFocusRing = /class="[^"]*\bliquid-pill\b[^"]*\bfocus-ring\b/.test(tpl) || /class="[^"]*\bfocus-ring\b[^"]*\bliquid-pill\b/.test(tpl);
    facts.islandFocusRing = /class="[^"]*\bliquid-island-host\b[^"]*\bfocus-ring\b/.test(tpl) || /class="[^"]*\bfocus-ring\b[^"]*\bliquid-island-host\b/.test(tpl);
    if (!facts.pillFocusRing)
        violations.push("A3: the bloom pill does not compose `.focus-ring` — the UA ring is swallowed by the rounded surface; the token-first ring must be on the trigger");
    if (!facts.islandFocusRing)
        violations.push("A3: the fission host does not compose `.focus-ring` — the goo filter swallows the UA ring; the token ring rides the un-filtered host");
    return { violations, facts };
}

// ── A4 — the plates route blur through the COMPOSED --glass-blur-floating (the
//        --glass-level a11y bracket reaches), NEVER a hardcoded blur(...px) bypass ──
export function detectA4() {
    const violations = [];
    const facts = { hardcodedBlurLegs: [] };
    const css = stripCss(readRel(CSS));
    // every backdrop-filter on a liquid plate reads var(--glass-blur-floating) (composed
    // with --glass-level); a hardcoded `blur(<n>px)` literal in a backdrop-filter bypasses
    // the a11y bracket.
    const re = /(?:-webkit-)?backdrop-filter:\s*([^;]+);/gi;
    let m;
    while ((m = re.exec(css)) !== null) {
        const value = m[1];
        if (/blur\(\s*[\d.]+px/.test(value)) {
            const line = css.slice(0, m.index).split("\n").length;
            facts.hardcodedBlurLegs.push(`liquid-morph.css:${line} — ${value.trim().slice(0, 56)}`);
        }
    }
    facts.composedBlurUsed = /backdrop-filter:\s*var\(\s*--glass-blur-floating\s*\)/.test(css);
    if (facts.hardcodedBlurLegs.length > 0)
        violations.push(`A4: ${facts.hardcodedBlurLegs.length} hardcoded blur(<n>px) backdrop-filter leg(s) bypass --glass-level (the a11y brackets cannot reach): ${facts.hardcodedBlurLegs.join(" · ")}`);
    if (!facts.composedBlurUsed)
        violations.push("A4: no plate reads the COMPOSED var(--glass-blur-floating) — the blur must route through --glass-level so prefers-reduced-transparency (level 0 → blur(0)) reaches");
    return { violations, facts };
}

// ── A5 — the bloom origin is STATE-DRIVEN :inert (the GlassDock precedent) — not merely
//        opacity:0 (which leaves it keyboard-reachable while invisible) ──
export function detectA5() {
    const violations = [];
    const facts = {};
    const tpl = templateBody(readRel(SFC));
    // the pill carries :inert keyed off the open state.
    facts.pillInert = /<button\b[\s\S]*?:inert="open\b/.test(tpl);
    if (!facts.pillInert)
        violations.push("A5: the bloom-origin pill is not STATE-DRIVEN :inert (`:inert=\"open || undefined\"`) — opacity:0 alone leaves it in the tab order while invisible (the GlassDock :inert precedent)");
    return { violations, facts };
}

// ── self-test bites (the anti-de-fang floor) ──
function selfTest() {
    const divButton = `<div role="button" tabindex="0" class="liquid-pill">x</div>`;
    const realButton = `<button type="button" class="liquid-pill focus-ring">x</button>`;
    const husk = `<div class="liquid-island-content" aria-hidden="true">x</div>`;
    const readable = `<div class="liquid-island-content">x</div>`;
    const hardBlur = `.x { backdrop-filter: blur(13px) saturate(1.4); }`;
    const composedBlur = `.x { backdrop-filter: var(--glass-blur-floating); }`;

    const noDivBtn = (s) => !/<div\b[^>]*\brole="button"/.test(s);
    const isButton = (s) => /<button\b[\s\S]*?class="[^"]*\bliquid-pill\b/.test(s);
    const notHusk = (s) => !/class="liquid-island-content"\s+aria-hidden="true"/.test(s);
    const focusRing = (s) => /\bfocus-ring\b/.test(s);
    const hasHardBlur = (s) => /backdrop-filter:\s*[^;]*blur\(\s*[\d.]+px/.test(s);

    return {
        // a div-button reds A1 (noDivRoleButton false), a real button passes
        a1Bites: noDivBtn(divButton) === false && noDivBtn(realButton) === true && isButton(realButton) === true,
        // a husk reds A2 (contentNotHusk false), a readable layer passes
        a2Bites: notHusk(husk) === false && notHusk(readable) === true,
        // a real button without focus-ring would red A3; with it passes
        a3Bites: focusRing(`<button class="liquid-pill">x</button>`) === false && focusRing(realButton) === true,
        // a hardcoded blur leg reds A4; the composed token passes
        a4Bites: hasHardBlur(hardBlur) === true && hasHardBlur(composedBlur) === false,
    };
}

export function detect() {
    const sfc = readRel(SFC);
    const css = readRel(CSS);
    if (!sfc) return { violations: [`A0: ${SFC} not found`], facts: {} };
    if (!css) return { violations: [`A0: ${CSS} not found`], facts: {} };
    const a1 = detectA1();
    const a2 = detectA2();
    const a3 = detectA3();
    const a4 = detectA4();
    const a5 = detectA5();
    const bites = selfTest();
    const biteViolations = [];
    for (const [k, ok] of Object.entries(bites)) {
        if (!ok)
            biteViolations.push(`SELF-TEST: the \`${k}\` bite BROKE — the detector no longer distinguishes its planted fixture`);
    }
    const violations = [
        ...a1.violations,
        ...a2.violations,
        ...a3.violations,
        ...a4.violations,
        ...a5.violations,
        ...biteViolations,
    ];
    return {
        violations,
        facts: { a1: a1.facts, a2: a2.facts, a3: a3.facts, a4: a4.facts, a5: a5.facts, selfTests: bites },
    };
}

function run() {
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_A11Y_ARTIFACT", "BE-dock-a11y");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-a11y",
        command: COMMAND,
        note: "BE.W11 device-free SOURCE arm — the liquid-dock SEMANTICS de-shadcn'd: A1 real <button> triggers (no div role=button) · A2 the bloomed content is labelled role=dialog + a polite aria-live announcer (NOT an aria-hidden husk; only decorative layers hidden) · A3 .focus-ring on every trigger (the un-filtered layer) · A4 the plates route blur through the COMPOSED --glass-blur-floating (the --glass-level a11y brackets reach; no hardcoded blur(...px) bypass) · A5 the bloom origin is STATE-DRIVEN :inert. The RENDERED-DOM proof (axe-clean tree, live announcer, focus paint) is the orchestrator's π.",
        facts,
        violations,
    });
    console.log(`proof:dock-a11y — ${status.toUpperCase()}`);
    console.log(`  A1 pill-button=${facts.a1?.pillIsButton} island-button=${facts.a1?.islandIsButton} no-div-role-button=${facts.a1?.noDivRoleButton}`);
    console.log(`  A2 sheet-dialog=${facts.a2?.sheetDialog} player-dialog=${facts.a2?.playerDialog} live-announcer=${facts.a2?.liveAnnouncer} content-not-husk=${facts.a2?.contentNotHusk} decorative-hidden=${facts.a2?.decorativeHidden}`);
    console.log(`  A3 pill-focus-ring=${facts.a3?.pillFocusRing} island-focus-ring=${facts.a3?.islandFocusRing}`);
    console.log(`  A4 composed-blur=${facts.a4?.composedBlurUsed} hardcoded-blur-legs=${facts.a4?.hardcodedBlurLegs?.length}`);
    console.log(`  A5 pill-inert=${facts.a5?.pillInert}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
