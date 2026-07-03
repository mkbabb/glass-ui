#!/usr/bin/env node
// proof:dock-consumer-fence — BG.W-DOCK-CONSUMER-FENCE — the dock never leaks its
// internal-part CSS onto consumer elements, and never fakes a global DOM gesture to
// dismiss third-party overlays (born-RED on HEAD → GREEN on the fix).
//
// TWO verified dns-analysis consumer-integration bugs this fence closes:
//
//   BUG 1 — the consumer-namespace leak. The dock stylesheets shipped BARE
//   `.dock-layer`-family selectors (`.dock-layer:not(.is-active):not(.is-leaving)
//   { visibility: hidden; pointer-events: none }`, `.dock-layer:not(.is-active)
//   { position: absolute; inset: 0 }`, …). A consumer element carrying a
//   COINCIDENTAL `.dock-layer` / `.dock-layers` / `.dock-layer-item-host` class
//   (e.g. a bespoke `GlassDock.vue` predating glass-ui) inherited the library's
//   HIDE/reposition rules and VANISHED (no error, no warning). The fix anchors every
//   internal-part rule under the dock ROOT identity at ZERO specificity cost —
//   `:where(.glass-dock, .dock-layer-group) .dock-layer{,-item-host,-rail,-tab,…}` —
//   so a bare consumer `.dock-layer` outside a dock is never matched (byte-identical
//   library paint: `:where()` is 0,0,0 → same cascade + source order). Rules keyed on
//   the ROOTS themselves (`.glass-dock` / `.dock-layer-group`) stay bare — a consumer
//   colliding on the COMPONENT-IDENTITY class is the consumer's call, out of scope.
//
//   BUG 2 — the synthetic global dismissal. `useDockState.dismissOpenOverlays()` fired
//   a SYNTHETIC `document.body.dispatchEvent(new PointerEvent("pointerdown"))` on
//   collapse ("let open portals run their normal outside dismissal"). reka-ui's
//   `DismissableLayer` reads any document pointerdown as an OUTSIDE interaction, so the
//   body-target fake closed EVERY open dismissable layer — including a Dialog / Select
//   / Popover whose TRIGGER is a dock CHILD (the repro: a Select opened inside a
//   dock-anchored Dialog dismissed the whole Dialog on first click). Deleted (clean
//   break): reka's own outside-dismiss covers real click-away; the `keepOpen` token
//   machinery covers the held-overlay timer case. No fake gesture survives.
//
// WHAT IT MEASURES — three device-free clauses + a self-test:
//
//   C1 — NO bare internal `.dock-layer`-family rule. Every style rule in the dock CSS
//        partials whose SUBJECT references an internal `.dock-layer`-family PART
//        (`.dock-layer`, `.dock-layers`, `.dock-layer-item-host`, `.dock-layer-stack`,
//        `.dock-layer-rail`, `.dock-layer-tab`, `.dock-layer-tab-indicator`) AND that
//        declares a real PAINT/LAYOUT property (a non-`--custom`, non-`@apply`-less
//        mutation) MUST carry a GUARANTEED dock-root ancestor. Custom-property-only
//        registers (e.g. the `--dock-motion-*` `:where()` token block) paint nothing on
//        a bare consumer element → EXEMPT. Roots (`.glass-dock`/`.dock-layer-group`)
//        stay bare.
//
//   C2 — NO synthetic global pointer/mouse gesture in `src/components/custom/dock/**`.
//        A `.dispatchEvent(new (Pointer|Mouse|Touch)Event(` anywhere in the dock
//        component tree is the forbidden workaround class (a faked user gesture that
//        reaches into third-party dismissable layers). GREP-FENCE → RED.
//
//   C3 — the relay REGRESSION shapes (device-free fixtures reproducing the two
//        dns-analysis failure shapes):
//          shape 1 (Bug 1): a synthetic consumer `<div class="dock-layer">` OUTSIDE any
//          dock must resolve VISIBLE + STATIC — i.e. NONE of the collected internal-part
//          HIDE (`visibility:hidden`/`opacity:0`/`pointer-events:none`/`display:none`)
//          or REPOSITION (`position:absolute|fixed` + `inset`/edge) rules may match a
//          bare `.dock-layer` element (no dock-root ancestor). Encodes the relay's own
//          suggested regression test.
//          shape 2 (Bug 2): the synthetic-pointerdown mechanism is DEFINITION-ABSENT —
//          `dismissOpenOverlays` + the `document.body`/`document` pointerdown dispatch
//          are gone from `useDockState.ts` (the C2 fence covers the whole tree; this is
//          the named-site assertion).
//
//   SELF-TEST — the detectors MUST bite their planted pre-fix fixtures (born-RED proof):
//        a bare `.dock-layer { visibility: hidden }` reds C1; an anchored
//        `:where(.glass-dock) .dock-layer { visibility: hidden }` passes; a
//        custom-prop-only `.dock-layer { --x: 1 }` is exempt; a body pointerdown
//        dispatch reds C2; clean source passes.
//
// Run: node scripts/proof-dock-consumer-fence.mjs

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-consumer-fence";

// The dock CSS partials C1 scans (the whole dock cascade + the root dock.css).
const DOCK_CSS_FILES = [
    "src/styles/dock.css",
    ...(existsSync(resolve(ROOT, "src/styles/dock"))
        ? readdirSync(resolve(ROOT, "src/styles/dock"))
              .filter((n) => n.endsWith(".css"))
              .sort()
              .map((n) => `src/styles/dock/${n}`)
        : []),
];
const DOCK_COMPONENT_DIR = "src/components/custom/dock";
const DOCK_STATE_REL = `${DOCK_COMPONENT_DIR}/composables/useDockState.ts`;

// Dock ROOT identity classes — a rule keyed on one of these is the component identity
// (out of scope; a consumer colliding on it is the consumer's call). They also anchor
// the internal-part descendant rules.
const ROOTS = new Set(["glass-dock", "glass-dock-frame", "dock-layer-group"]);

// An INTERNAL `.dock-layer`-family PART class token: starts with "dock-layer" (or is
// exactly "dock-layers") but is NOT the DockLayerGroup root "dock-layer-group".
const isInternalPartToken = (t) =>
    (t === "dock-layers" || t.startsWith("dock-layer")) && t !== "dock-layer-group";

const stripCssComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const stripTsComments = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + " ".repeat(Math.max(0, m.length - p1.length)));

const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// ── CSS helpers ─────────────────────────────────────────────────────────────────
// Extract class tokens from a selector chunk.
const classTokens = (chunk) => {
    const out = [];
    const re = /\.([A-Za-z0-9_-]+)/g;
    let m;
    while ((m = re.exec(chunk))) out.push(m[1]);
    return out;
};

// Split a complex selector into compounds by top-level combinators, keeping
// parenthesised/bracketed groups intact.
function compoundsOf(sel) {
    const out = [];
    let depth = 0;
    let cur = "";
    for (let i = 0; i < sel.length; i++) {
        const c = sel[i];
        if (c === "(" || c === "[") depth++;
        else if (c === ")" || c === "]") depth--;
        if (depth === 0 && (c === ">" || c === "+" || c === "~")) {
            if (cur.trim()) out.push(cur.trim());
            cur = "";
            continue;
        }
        if (depth === 0 && /\s/.test(c)) {
            if (cur.trim()) out.push(cur.trim());
            cur = "";
            continue;
        }
        cur += c;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
}

// Split a selector LIST on top-level commas.
function splitSelectorList(list) {
    const out = [];
    let depth = 0;
    let cur = "";
    for (const c of list) {
        if (c === "(" || c === "[") depth++;
        else if (c === ")" || c === "]") depth--;
        if (c === "," && depth === 0) {
            out.push(cur.trim());
            cur = "";
        } else cur += c;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
}

// A compound is a GUARANTEED dock-root anchor iff it carries a required root class
// (a bare `.glass-dock` etc), OR it is a `:where()`/`:is()` whose ENTIRE class list is
// a subset of the ROOTS (a pure-root OR-list still guarantees a dock root ancestor).
function isGuaranteedRootCompound(compound) {
    // bare/required root class present (outside any :where/:is/:not)?
    const bareOuter = compound
        .replace(/:(?:where|is|not)\([^)]*\)/g, "") // drop pseudo-fn contents
        .match(/\.([A-Za-z0-9_-]+)/g);
    if (bareOuter && bareOuter.some((c) => ROOTS.has(c.slice(1)))) return true;
    // a leading :where(...) / :is(...) whose members are ALL roots
    const wm = compound.match(/^:(?:where|is)\(([^)]*)\)$/);
    if (wm) {
        const members = splitSelectorList(wm[1]);
        if (members.length > 0 && members.every((mem) => {
            const toks = classTokens(mem);
            return toks.length > 0 && toks.every((t) => ROOTS.has(t));
        }))
            return true;
    }
    return false;
}

// Parse a CSS string into flat style rules { selectorList, block } (brace-matched).
// At-rule preludes (@layer/@media/@supports/@container) are transparent — their bodies
// are scanned for nested style rules; @apply/declarations inside blocks are kept raw.
function parseRules(css) {
    const rules = [];
    let i = 0;
    let prelude = "";
    const findMatch = (open) => {
        let d = 1;
        let j = open + 1;
        for (; j < css.length; j++) {
            if (css[j] === "{") d++;
            else if (css[j] === "}") {
                d--;
                if (d === 0) return j;
            }
        }
        return css.length;
    };
    while (i < css.length) {
        const c = css[i];
        if (c === "{") {
            const sel = prelude.trim();
            const close = findMatch(i);
            const body = css.slice(i + 1, close);
            if (sel.startsWith("@")) {
                // at-rule: recurse into its body for nested style rules
                for (const r of parseRules(body)) rules.push(r);
            } else if (sel) {
                rules.push({ selectorList: sel, block: body });
            }
            prelude = "";
            i = close + 1;
            continue;
        }
        if (c === "}" || c === ";") {
            prelude = "";
            i++;
            continue;
        }
        prelude += c;
        i++;
    }
    return rules;
}

// The DIRECT (non-nested) declaration text of a rule block — everything up to the first
// nested `{` (these dock rules are flat, so this is the whole block in practice).
function directDeclText(block) {
    const brace = block.indexOf("{");
    return brace === -1 ? block : block.slice(0, brace);
}

// Does the block declare a real PAINT/LAYOUT property (a non-`--custom` mutation)?
// A block that ONLY declares custom properties (`--x: …`) paints nothing on a bare
// consumer element → EXEMPT from the anchor requirement.
function declaresPaint(block) {
    const decls = directDeclText(block);
    if (/@apply\b/.test(decls)) return true; // @apply is a paint mutation
    // any `name: value` where name does not start with `--`
    const re = /(^|[;{])\s*([A-Za-z-][A-Za-z0-9-]*)\s*:/g;
    let m;
    while ((m = re.exec(decls))) {
        if (!m[2].startsWith("--")) return true;
    }
    return false;
}

const HIDE_RE = /(?:^|[;{\s])(visibility\s*:\s*hidden|opacity\s*:\s*0(?:\s*;|\s*$|[^.\d])|pointer-events\s*:\s*none|display\s*:\s*none)/;
const REPOSITION_RE = /(?:^|[;{\s])position\s*:\s*(?:absolute|fixed)/;

// Classify ONE complex selector against the `.dock-layer`-family fence.
export function classifySelector(sel, block) {
    const compounds = compoundsOf(sel);
    if (compounds.length === 0) return null;
    const allTokens = compounds.flatMap(classTokens);
    // A rule is IN SCOPE iff it references an internal `.dock-layer`-family PART anywhere
    // (a rule keyed ONLY on roots/other classes — `.dock-layer-group`, `.dock-separator`
    // — is out of scope: the component-identity is the consumer's call).
    const referencesInternalPart = allTokens.some(isInternalPartToken);
    if (!referencesInternalPart) return null;
    // LEFTMOST-ANCHORED (the structural discipline the fix applies): the FIRST compound of
    // the complex selector is a GUARANTEED dock-root anchor, so the whole descendant chain
    // can only match inside a real dock. This is the `carries :where(.glass-dock)-ancestry`
    // bar — it catches ancestor-leak vectors (`.dock-layer-rail … svg`) too.
    const leftmostAnchored = isGuaranteedRootCompound(compounds[0]);
    // SUBJECT-ANCHORED (the concrete sentinel model, C3): the matched (rightmost) element
    // requires a dock-root ancestor, so a bare consumer element can never BE the subject.
    const subject = compounds[compounds.length - 1];
    const subjectIsInternalPart = classTokens(subject).some(isInternalPartToken);
    const subjectSelfRoot = classTokens(subject).some((t) => ROOTS.has(t));
    const subjectAnchored =
        subjectSelfRoot || compounds.slice(0, -1).some((a) => isGuaranteedRootCompound(a));
    const declBlock = directDeclText(block);
    return {
        selector: sel.replace(/\s+/g, " ").trim(),
        referencesInternalPart,
        leftmostAnchored,
        subjectIsInternalPart,
        subjectAnchored,
        paints: declaresPaint(block),
        hides: HIDE_RE.test(declBlock),
        repositions:
            REPOSITION_RE.test(declBlock) &&
            /(?:^|[;{\s])inset\s*:|(?:^|[;{\s])(?:top|left|right|bottom)\s*:/.test(declBlock),
    };
}

// Collect every in-scope `.dock-layer`-family rule across the dock CSS.
export function collectInternalPartRules(files) {
    const collected = [];
    for (const rel of files) {
        const css = stripCssComments(readRel(rel));
        if (!css) continue;
        for (const { selectorList, block } of parseRules(css)) {
            for (const sel of splitSelectorList(selectorList)) {
                const c = classifySelector(sel, block);
                if (c) collected.push({ file: rel, ...c });
            }
        }
    }
    return collected;
}

// ── C1 — no bare internal-part paint/layout rule (the LEFTMOST-ANCHOR discipline) ─
export function detectC1(collected) {
    const violations = [];
    for (const r of collected) {
        if (!r.paints) continue; // custom-property-only register (e.g. --dock-motion-*) → exempt
        if (r.leftmostAnchored) continue;
        violations.push(
            `C1: ${r.file} — internal-part selector \`${r.selector}\` declares a paint/layout property but its LEFTMOST compound is not a dock-root anchor (a coincidental consumer \`.dock-layer\`-family element would be mutated). Prepend \`:where(.glass-dock, .dock-layer-group)\`.`,
        );
    }
    return {
        violations,
        facts: {
            total: collected.length,
            paintRules: collected.filter((r) => r.paints).length,
            unanchoredPaint: violations.length,
        },
    };
}

// ── C2 — no synthetic global pointer/mouse gesture in the dock component tree ────
const SYNTH_DISPATCH_RE = /\.dispatchEvent\s*\(\s*new\s+(?:Pointer|Mouse|Touch)Event\b/;
function walkFiles(dirRel, exts) {
    const abs = resolve(ROOT, dirRel);
    const out = [];
    if (!existsSync(abs)) return out;
    const rec = (d) => {
        for (const name of readdirSync(d)) {
            const p = join(d, name);
            const st = statSync(p);
            if (st.isDirectory()) rec(p);
            else if (exts.some((e) => name.endsWith(e))) out.push(p);
        }
    };
    rec(abs);
    return out;
}
export function detectC2() {
    const violations = [];
    const files = walkFiles(DOCK_COMPONENT_DIR, [".ts", ".vue", ".tsx"]);
    let scanned = 0;
    for (const abs of files) {
        scanned++;
        const src = stripTsComments(readFileSync(abs, "utf8"));
        if (SYNTH_DISPATCH_RE.test(src)) {
            const rel = abs.slice(ROOT.length + 1);
            violations.push(
                `C2: ${rel} synthesizes a global pointer/mouse gesture (\`.dispatchEvent(new PointerEvent/MouseEvent(…)\`) — the forbidden workaround that reaches into third-party dismissable layers. Own the dock's OWN state; never fake a DOM gesture.`,
            );
        }
    }
    return { violations, facts: { scanned } };
}

// ── C3 — the relay regression shapes ────────────────────────────────────────────
export function detectC3(collected) {
    const violations = [];
    // shape 1 — the sentinel `<div class="dock-layer">` outside a dock stays visible+static.
    // A rule can match the bare sentinel iff its SUBJECT is an internal `.dock-layer`-family
    // part with NO required dock-root ancestor; if that rule HIDES/repositions, the sentinel
    // vanishes (the reported leak). (`:not(.is-active)`/`:not(.is-leaving)` are satisfied by a
    // bare div, so those SUBJECT rules DO match it — the exact HEAD leak vector.)
    const leakers = collected.filter(
        (r) => r.subjectIsInternalPart && !r.subjectAnchored && (r.hides || r.repositions),
    );
    for (const r of leakers) {
        violations.push(
            `C3(shape1): ${r.file} — \`${r.selector}\` would HIDE/reposition a bare consumer \`.dock-layer\` sentinel (the reported dns-analysis leak: consumer UI vanished). It must require a dock-root ancestor.`,
        );
    }
    const facts = { shape1Leakers: leakers.length };

    // shape 2 — the synthetic-pointerdown mechanism is definition-absent from useDockState.
    const stateSrc = stripTsComments(readRel(DOCK_STATE_REL));
    facts.stateExists = stateSrc.length > 0;
    facts.hasDismissFn = /\bdismissOpenOverlays\b/.test(stateSrc);
    facts.hasBodyPointerDispatch =
        /document(?:\.body)?\s*\.dispatchEvent\s*\(\s*new\s+PointerEvent/.test(stateSrc);
    if (facts.hasDismissFn)
        violations.push(
            `C3(shape2): ${DOCK_STATE_REL} still defines/calls \`dismissOpenOverlays\` — the synthetic-body-pointerdown dismissal must be DELETED (clean break).`,
        );
    if (facts.hasBodyPointerDispatch)
        violations.push(
            `C3(shape2): ${DOCK_STATE_REL} still dispatches a synthetic \`PointerEvent\` on document/body — the repro mechanism survives.`,
        );
    return { violations, facts };
}

// ── self-test — the detectors bite their planted pre-fix fixtures ────────────────
function selfTest() {
    const failures = [];

    // C1 bite — a bare hide rule reds.
    const bareHide = collectRulesFromString(
        ".dock-layer:not(.is-active):not(.is-leaving) { opacity: 0; visibility: hidden; pointer-events: none; }",
    );
    if (detectC1(bareHide).violations.length === 0)
        failures.push("C1 self-test BROKE — a bare `.dock-layer:not(...)` hide rule did not red");
    // C1 positive — anchored passes.
    const anchoredHide = collectRulesFromString(
        ":where(.glass-dock, .dock-layer-group) .dock-layer:not(.is-active):not(.is-leaving) { opacity: 0; visibility: hidden; pointer-events: none; }",
    );
    if (detectC1(anchoredHide).violations.length !== 0)
        failures.push("C1 self-test BROKE — an anchored `:where(.glass-dock, .dock-layer-group) .dock-layer` hide rule red falsely");
    // C1 exemption — a custom-prop-only register on a bare internal part is exempt.
    const tokenOnly = collectRulesFromString(
        ".dock-layer-stack { --dock-motion-fast: 1ms; }",
    );
    if (detectC1(tokenOnly).violations.length !== 0)
        failures.push("C1 self-test BROKE — a custom-property-only `.dock-layer-stack` register was not exempt");
    // C1 — a bare `:where(.dock-layer, .foo)` OR-list SUBJECT still reds (leaks onto .dock-layer).
    const whereSubject = collectRulesFromString(
        ":where(.dock-layer, .foo) { visibility: hidden; }",
    );
    if (detectC1(whereSubject).violations.length === 0)
        failures.push("C1 self-test BROKE — a `:where(.dock-layer, .foo)` OR-list subject hide rule did not red");

    // C3 shape1 bite — the sentinel matcher flags the bare hide rule.
    if (detectC3(bareHide).facts.shape1Leakers === 0)
        failures.push("C3 self-test BROKE — the sentinel matcher did not flag a bare hide rule as a leaker");
    if (detectC3(anchoredHide).facts.shape1Leakers !== 0)
        failures.push("C3 self-test BROKE — the sentinel matcher flagged an anchored hide rule");

    // C2 bite — a body pointerdown dispatch reds (string detector).
    const dirty = ` document.body.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true })); `;
    if (!SYNTH_DISPATCH_RE.test(dirty))
        failures.push("C2 self-test BROKE — a synthetic body PointerEvent dispatch was not detected");
    const clean = ` element.addEventListener("pointerdown", handler); root.setAttribute("data-morphing",""); `;
    if (SYNTH_DISPATCH_RE.test(clean))
        failures.push("C2 self-test BROKE — a clean pointerdown LISTENER was falsely flagged as a dispatch");

    return failures;
}

// helper for self-test — collect in-scope rules from an inline CSS string.
function collectRulesFromString(css) {
    const stripped = stripCssComments(css);
    const collected = [];
    for (const { selectorList, block } of parseRules(stripped)) {
        for (const sel of splitSelectorList(selectorList)) {
            const c = classifySelector(sel, block);
            if (c) collected.push({ file: "<self-test>", ...c });
        }
    }
    return collected;
}

// ── compose ─────────────────────────────────────────────────────────────────────
export function detect() {
    const collected = collectInternalPartRules(DOCK_CSS_FILES);
    const c1 = detectC1(collected);
    const c2 = detectC2();
    const c3 = detectC3(collected);
    const selfTestFailures = selfTest();
    const violations = [
        ...c1.violations,
        ...c2.violations,
        ...c3.violations,
        ...selfTestFailures.map((f) => `SELF-TEST: ${f}`),
    ];
    return {
        violations,
        facts: {
            filesScanned: DOCK_CSS_FILES,
            c1: c1.facts,
            c2: c2.facts,
            c3: c3.facts,
            selfTestFailures,
        },
    };
}

function run() {
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_CONSUMER_FENCE_ARTIFACT", "BG-dock-consumer-fence");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-consumer-fence",
        command: COMMAND,
        note: "BG.W-DOCK-CONSUMER-FENCE device-free SOURCE arm (C1 every internal .dock-layer-family paint/layout rule carries a dock-root :where(.glass-dock, .dock-layer-group) ancestor — the consumer-namespace-leak fix; custom-property-only registers are exempt · C2 no synthetic global PointerEvent/MouseEvent dispatch in the dock component tree — the third-party-overlay-dismissal fix · C3 the relay regression shapes: a bare consumer .dock-layer sentinel stays visible+static, and the synthetic dismissOpenOverlays mechanism is definition-absent). Born-RED on HEAD (both bugs present) → GREEN on the fix. Two verified dns-analysis consumer-integration bugs.",
        facts,
        violations,
    });
    console.log(`proof:dock-consumer-fence — ${status.toUpperCase()}`);
    console.log(`  C1 internal-part rules: total=${facts.c1.total} paintRules=${facts.c1.paintRules} unanchored=${facts.c1.unanchoredPaint}`);
    console.log(`  C2 dock component files scanned: ${facts.c2.scanned}`);
    console.log(`  C3 shape1 sentinel leakers: ${facts.c3.shape1Leakers} · shape2 dismissOpenOverlays=${facts.c3.hasDismissFn} bodyDispatch=${facts.c3.hasBodyPointerDispatch}`);
    console.log(`  self-test failures: ${facts.selfTestFailures.length}`);
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
