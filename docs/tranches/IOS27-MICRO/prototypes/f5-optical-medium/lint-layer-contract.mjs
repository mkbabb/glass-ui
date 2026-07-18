#!/usr/bin/env node
// lint-layer-contract.mjs — the F5 layer-contract lint, static half (G8c).
// verified-model: claude-fable-5 (system-context model ID, verbatim). Pass-2 cure seat, 2026-07-18.
//
// SPEC-F5 §1 names the layer contract "enumerated, lintable"; this artifact is the
// named lint. Two halves, one contract:
//   · THIS FILE — static: parses the prototype's CSS + markup and asserts every
//     declarable clause of the contract (no computed style needed, runs in node,
//     CI-able). Exit 1 on any failure.
//   · IN-PAGE — window.f5LintLayerContract() (defined in index.html): the computed-
//     style half (real getComputedStyle, the rogue-writer throw test). The re-verify
//     seat runs it on both engines (reverify-queue.md §F5).
//
// The contract linted (SPEC-F5 §1, pass-2 revision):
//   1. REGION ROOT is effect-free under the FULL backdrop-root enumeration
//      (filter-effects-2): filter, backdrop-filter, opacity<1, mask, clip-path,
//      mix-blend-mode, isolation:isolate, contain:paint, will-change of any.
//   2. PLANE ORDER in DOM: body planes → light → content.
//   3. LIGHT layer: aria-hidden, pointer-events none, contain layout paint,
//      isolation isolate, exactly ONE plus-lighter composite, zero backdrop sampling.
//   4. COMPOSITOR FENCE: the default goo anatomy carries NO filter declaration
//      (the SVG-filter merge lives only on the .svg-arm duel selector).
//   5. TWO-TIER: tier-marked control and container elements exist and declare
//      distinct surfaces (distinct background/backdrop-filter token sets).
//   6. ONE WRITER: the medium claim mechanism (claimMediumWriter + data-writer)
//      is present and every medium write routes through the claimed writer.
//
// Usage: node lint-layer-contract.mjs [path-to-index.html]
// Self-falsification: node lint-layer-contract.mjs --self-test
//   (mutates a copy — strips isolation, adds a root filter, arms a default goo
//    filter — and REQUIRES the lint to fail on it; a lint that cannot fail is
//    not a gate.)

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const selfTest = process.argv.includes("--self-test");
const htmlPath = process.argv[2] && !process.argv[2].startsWith("--")
    ? process.argv[2]
    : join(here, "index.html");

const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "");

function cssRules(html) {
    const style = stripComments(
        [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join("\n"));
    const rules = [];
    // flat + one-level-@ block extraction (the prototype nests at most once)
    const re = /([^{};@]+)\{([^{}]*)\}/g;
    let m;
    while ((m = re.exec(style))) rules.push({ sel: m[1].trim(), body: m[2] });
    return rules;
}
const declared = (body, prop) =>
    new RegExp(`(^|[;\\s])${prop.replace(/[-]/g, "\\-")}\\s*:`).test(body);

function lint(html) {
    const failures = [];
    const no = (cond, msg) => { if (!cond) failures.push(msg); };
    const rules = cssRules(html);
    const bodiesFor = (sel) => rules.filter((r) => r.sel.split(",").some((s) => s.trim() === sel)).map((r) => r.body);

    // 1. region root effect-free (full backdrop-root enumeration)
    const root = bodiesFor(".tabbar-region").join(";");
    no(root.length > 0, ".tabbar-region rule missing");
    for (const p of ["filter", "backdrop-filter", "-webkit-backdrop-filter", "opacity",
        "mask", "mask-image", "clip-path", "mix-blend-mode", "isolation", "will-change"]) {
        no(!declared(root, p), `region root declares ${p} (backdrop-root trigger class)`);
    }
    no(!/contain\s*:[^;]*paint/.test(root), "region root declares contain:paint (backdrop-root trigger)");

    // 2. plane order in markup
    const region = html.match(/<div class="tabbar-region"[\s\S]*?<\/nav>\s*<\/div>/)?.[0] ?? "";
    no(region.length > 0, "region markup not found");
    const order = ["bar-body", "capsule", "lens-light", 'nav class="tabs"'];
    let last = -1;
    for (const k of order) {
        const i = region.indexOf(k);
        no(i > last, `plane order broken at ${k} (body → light → content violated)`);
        last = i;
    }

    // 3. light layer contract
    no(/class="lens-light"\s+aria-hidden="true"/.test(region), "light layer not aria-hidden in markup");
    const light = bodiesFor(".lens-light").join(";");
    no(/pointer-events\s*:\s*none/.test(light), "light layer lacks pointer-events:none");
    no(/contain\s*:\s*layout\s+paint/.test(light), "light layer lacks contain: layout paint");
    no(/isolation\s*:\s*isolate/.test(light), "light layer lacks isolation:isolate (G8a)");
    no(/mix-blend-mode\s*:\s*plus-lighter/.test(light), "light layer lacks the plus-lighter composite");
    no(!declared(light, "backdrop-filter"), "light layer declares backdrop sampling");
    // exactly ONE composite: no blend declarations on light children
    for (const sel of [".lens-wash", ".goo", ".lens-bloom", ".lbody", ".lneck"]) {
        no(!bodiesFor(sel).some((b) => declared(b, "mix-blend-mode")),
            `${sel} carries its own blend (one-composite rule)`);
    }

    // 4. compositor fence: default goo (bare .goo selector) declares no filter
    no(!bodiesFor(".goo").some((b) => declared(b, "filter")),
        "compositor fence breached: the DEFAULT goo anatomy declares filter (SVG hot path)");
    no(bodiesFor(".goo.svg-arm").some((b) => /filter\s*:\s*url\(/.test(b)),
        "the svg-arm duel selector is missing (the duel cannot run)");

    // 5. two-tier distinctness (declared surfaces differ)
    no(/data-tier="container"/.test(html) && /data-tier="control"/.test(html),
        "tier markers missing (two-tier lint has nothing to bind)");
    const bar = bodiesFor(".bar-body").join(";"), cap = bodiesFor(".capsule").join(";");
    const bgOf = (b) => b.match(/background\s*:\s*([^;]+)/)?.[1]?.trim();
    const bfOf = (b) => b.match(/(?:^|[;\s])backdrop-filter\s*:\s*([^;]+)/)?.[1]?.trim();
    no(bgOf(bar) !== bgOf(cap) || bfOf(bar) !== bfOf(cap),
        "control tier declares the container's exact surface (two-tier rule dead)");

    // 6. one-writer mechanism present and routed
    no(/function claimMediumWriter/.test(html), "claimMediumWriter missing (one-writer contract unenforced)");
    no(/dataset\.writer/.test(html), "medium writer claim not durable (no data-writer)");
    no(/const ccWriter = claimMediumWriter/.test(html), "the cc medium is not claimed");
    const scriptBody = html.match(/<script>([\s\S]*)<\/script>/)?.[1] ?? "";
    const rawWrites = [...scriptBody.matchAll(/ccMedium\.style\.opacity|ccMedium\.classList\.(add|remove)/g)];
    no(rawWrites.length === 0,
        `medium written outside the claimed writer (${rawWrites.length} raw write(s))`);

    return { pass: failures.length === 0, failures };
}

function run(label, html, expectPass) {
    const { pass, failures } = lint(html);
    const verdict = pass === expectPass ? "OK" : "LINT-DEFECT";
    console.log(`[${verdict}] ${label}: pass=${pass} (expected ${expectPass}); failures=${failures.length}`);
    for (const f of failures) console.log(`    - ${f}`);
    return pass === expectPass;
}

const html = readFileSync(htmlPath, "utf8");
let ok;
if (selfTest) {
    // the lint must FAIL on a mutated page — a check that cannot fail is not a gate
    const broken = html
        .replace("isolation: isolate;", "")                                    // strip G8a
        .replace(".tabbar-region {", ".tabbar-region { filter: blur(1px);")    // effectful root
        .replace(".goo {\n    position: absolute; inset: 0;",
            ".goo {\n    position: absolute; inset: 0; filter: url(#f5-goo);") // breach the fence
        .replace("const ccWriter = claimMediumWriter(ccMedium, \"cc-controller\");",
            "const ccWriter = { opacity(v){ccMedium.style.opacity=String(v)}, mode(){} };"); // unclaimed writes
    ok = run("clean page", html, true) & run("mutated page (must fail)", broken, false);
} else {
    ok = run(htmlPath, html, true);
}
process.exit(ok ? 0 : 1);
