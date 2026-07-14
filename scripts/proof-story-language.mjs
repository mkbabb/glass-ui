#!/usr/bin/env node
// proof:story-language — the storybook meta-language strip gate (pure FS — device-free).
//
// A demo VISITOR reads the story-page prose to learn WHAT a component does and
// WHEN to reach for it. They do NOT read it to learn the library's internal
// development history. Per the greenfield-no-meta + writing-style precepts, the
// user-facing storybook copy — AND the dist-published register docs — must carry
// zero internal META-LANGUAGE.
//
// THREE arms, one lexicon:
//   L1 — the RENDERED surface: demo/stories/** rendered prose (template text nodes
//        + copy attributes) + demo/stories/manifest.ts string fields + the demo DATA
//        arrays (the sample data a page renders). Script/style source, HTML comments,
//        and non-copy attributes (a `d=` path, a `class`) are OUT of scope — a
//        component identifier in the render closure is not user-facing copy.
//   L2 — the DIST-published source: the `SPRING_PRESETS` `comment:` fields and the
//        `MOTION_CURVES` `note:` fields ship in the package AND render on
//        /motion/springs. They must carry zero wave-names / engine jargon.
//   L3 — the DATA-narration: /data/timeline sample events must describe a generic
//        domain, never glass-ui's own build history (no "tokens audit" / "cartoon
//        shadow" / "dock flip" / "layer-group" as sample data).
//
// FORBIDDEN lexicon (each named so a violation is actionable):
//   - a tranche/wave/defect code — `\b[A-Z]{1,2}\.W[-\d]` (AX.W58 AND BD.W-ANIM-…);
//   - a bare milestone/round/precept code — `\b[MNPG]\d{1,2}\b` (M11, N6, P7, G4);
//   - the bare word `tranche`;
//   - a `proof:*` gate name;
//   - the "muster <Letter>" engagement code;
//   - a WCAG citation in copy (WCAG 2.2.2 / WCAG-AA / WCAG 1.4.11);
//   - the `kf` sibling-repo codename;
//   - the engine-symbol jargon `ElementMorph` / `springTimingFunction` / `springLinearStops`;
//   - unglossed `PRM` (say "reduced motion");
//   - the named impl-note signatures (ref-counted, provide-inject, inheritAttrs, …).
//
// GREEN forward-refs (a real public name is NOT meta-language): a `--spring-dock`
// token, an `@mkbabb/glass-ui/dock` subpath, a `<DockIconButton>` component name, the
// `P3` colour gamut — none of these match the lexicon, so they stay green by design.

import { readFileSync, readdirSync } from "node:fs";
import { resolve, relative, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const STORIES_DIR = resolve(ROOT, "demo/stories");
const MANIFEST = resolve(ROOT, "demo/stories/manifest.ts");
const SPRING_PRESETS_FILE = resolve(ROOT, "src/composables/motion/springPresets.ts");
const CURVES_FILE = resolve(ROOT, "src/composables/motion/curves.ts");
const TIMELINE_FILE = resolve(ROOT, "demo/stories/data/timeline.vue");

// ── The forbidden lexicon ──────────────────────────────────────────────────────
const PATTERNS = [
    { name: "tranche-code", re: /\b[A-Z]{1,2}\.W[-\d]/ },
    { name: "milestone-code", re: /\b[MNPG]\d{1,2}\b/ },
    { name: "tranche-word", re: /\btranche\b/i },
    { name: "proof-gate-name", re: /\bproof:[a-z][a-z0-9-]+/ },
    { name: "muster-code", re: /\bmuster\s+[A-Z]\b/ },
    { name: "wcag-citation", re: /\bWCAG[\s-]?[\d.]/i },
    { name: "kf-codename", re: /\bkf\b/ },
    { name: "engine-jargon", re: /\b(?:ElementMorph|springTimingFunction|springLinearStops)\b/ },
    { name: "unglossed-prm", re: /\bPRM\b/ },
    {
        name: "impl-note",
        re: /\bref-counted\b|\bprovide[-/]inject\b|\binheritAttrs\b|\bbinary-consumer\b|\boverfitting\b|#collapsed\s+slot|named\s+#collapsed/i,
    },
];

// A real public name that HAPPENS to collide with a lexicon regex stays green.
// `P3` is the display-P3 colour gamut token (never a milestone code in copy).
const GREEN_MATCHES = new Set(["P3"]);

/** Scan a run of user-facing text; return every lexicon hit (green-refs excluded). */
function scanText(text) {
    const hits = [];
    for (const { name, re } of PATTERNS) {
        const m = text.match(re);
        if (m && !GREEN_MATCHES.has(m[0])) hits.push({ pattern: name, match: m[0] });
    }
    return hits;
}

// ── .vue rendered-prose extraction (strip script/style/HTML-comments) ───────────
// Copy attributes whose value is human-readable prose (a `d=`/`class`/`:style` is not).
const COPY_ATTRS =
    /(?:^|\s)(?:blurb|tooltip|label|heading|title|subtitle|eyebrow|description|summary|placeholder|alt|caption|hint|aria-label)="([^"]*)"/g;

/** Replace a matched block with as many newlines as it spanned (line-preserving). */
const blankBlock = (m) => "\n".repeat((m.match(/\n/g) || []).length);

/** Strip <script>, <style> and <!-- --> so only the rendered template survives. */
function templateOnly(src) {
    return src
        .replace(/<script[\s\S]*?<\/script>/g, blankBlock)
        .replace(/<style[\s\S]*?<\/style>/g, blankBlock)
        .replace(/<!--[\s\S]*?-->/g, blankBlock);
}

/** The rendered copy of a .vue: [{line, text}] over text nodes + copy attributes. */
function renderedProse(src) {
    const tpl = templateOnly(src).split("\n");
    const out = [];
    for (let i = 0; i < tpl.length; i++) {
        const line = tpl[i];
        // copy-attribute values
        COPY_ATTRS.lastIndex = 0;
        let m;
        while ((m = COPY_ATTRS.exec(line))) out.push({ line: i + 1, text: m[1] });
        // text nodes: drop tags + mustache bindings, keep the between-tag prose
        const textNode = line.replace(/<[^>]*>/g, " ").replace(/\{\{[^}]*\}\}/g, " ");
        if (textNode.trim()) out.push({ line: i + 1, text: textNode });
    }
    return out;
}

// ── JS/TS string-literal extraction (comment-aware — a `//` in a URL is safe) ────
/** Every string literal in a run of JS/TS, as [{line, value}] (comments excluded). */
function stringLiterals(src) {
    const out = [];
    let i = 0;
    let line = 1;
    let mode = "code"; // code | line-comment | block-comment | dq | sq | tpl
    let buf = "";
    let startLine = 1;
    const n = src.length;
    while (i < n) {
        const c = src[i];
        const c2 = src[i + 1];
        if (c === "\n") line++;
        if (mode === "code") {
            if (c === "/" && c2 === "/") { mode = "line-comment"; i += 2; continue; }
            if (c === "/" && c2 === "*") { mode = "block-comment"; i += 2; continue; }
            if (c === '"' || c === "'" || c === "`") {
                mode = c === '"' ? "dq" : c === "'" ? "sq" : "tpl";
                buf = "";
                startLine = line;
                i++;
                continue;
            }
            i++;
            continue;
        }
        if (mode === "line-comment") {
            if (c === "\n") mode = "code";
            i++;
            continue;
        }
        if (mode === "block-comment") {
            if (c === "*" && c2 === "/") { mode = "code"; i += 2; continue; }
            i++;
            continue;
        }
        // inside a string
        const quote = mode === "dq" ? '"' : mode === "sq" ? "'" : "`";
        if (c === "\\") { buf += c + (c2 ?? ""); i += 2; continue; }
        if (c === quote) { out.push({ line: startLine, value: buf }); mode = "code"; i++; continue; }
        buf += c;
        i++;
    }
    return out;
}

/** The `<script>` blocks of a .vue with their absolute start line. */
function scriptBlocks(src) {
    const out = [];
    const openRe = /<script\b[^>]*>/g;
    let m;
    while ((m = openRe.exec(src))) {
        const openEnd = m.index + m[0].length;
        const closeIdx = src.indexOf("</script>", openEnd);
        if (closeIdx < 0) break;
        const content = src.slice(openEnd, closeIdx);
        const startLine = (src.slice(0, openEnd).match(/\n/g) || []).length + 1;
        out.push({ content, startLine });
        openRe.lastIndex = closeIdx + "</script>".length;
    }
    return out;
}

/** The `comment:` / `note:` field VALUES of a TS module (the dist-published docs). */
function fieldValues(src, fields) {
    const out = [];
    const re = new RegExp(`(?:^|[^.\\w])(${fields.join("|")})\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "g");
    let m;
    while ((m = re.exec(src))) {
        const line = (src.slice(0, m.index).match(/\n/g) || []).length + 1;
        out.push({ line, field: m[1], value: m[2] });
    }
    return out;
}

// ── L3: the /data/timeline self-referential-domain blocklist ────────────────────
const TIMELINE_SELF_REF = [
    { name: "tokens-audit", re: /tokens?\s+audit/i },
    { name: "cartoon-shadow", re: /cartoon\s+shadow/i },
    { name: "dock-flip", re: /dock\s+flip/i },
    { name: "layer-group", re: /layer[-\s]?group/i },
    { name: "turbulence-underpaint", re: /turbulence\s+underpaint/i },
    { name: "consumers-rebase", re: /consumers?\s+rebase/i },
];

/** Recursively collect every demo/stories `*.vue` file. */
function storyFiles(dir) {
    const out = [];
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, ent.name);
        if (ent.isDirectory()) out.push(...storyFiles(p));
        else if (ent.name.endsWith(".vue")) out.push(p);
    }
    return out.sort();
}

export function detect() {
    const violations = [];
    const facts = { storyFiles: 0, arms: {} };

    // ── L1a — rendered prose across every story page ──
    const files = storyFiles(STORIES_DIR);
    facts.storyFiles = files.length;
    let l1aHits = 0;
    for (const abs of files) {
        const rel = relative(ROOT, abs);
        const src = readFileSync(abs, "utf8");
        for (const { line, text } of renderedProse(src)) {
            for (const h of scanText(text)) {
                l1aHits++;
                violations.push(
                    `L1 ${rel}:${line} — ${h.pattern} "${h.match}" :: ${text.trim().slice(0, 140)}`,
                );
            }
        }
    }

    // ── L1b — manifest string fields ──
    let l1bHits = 0;
    const manifestSrc = readFileSync(MANIFEST, "utf8");
    for (const { line, value } of stringLiterals(manifestSrc)) {
        for (const h of scanText(value)) {
            l1bHits++;
            violations.push(
                `L1 demo/stories/manifest.ts:${line} — ${h.pattern} "${h.match}" :: ${value.trim().slice(0, 140)}`,
            );
        }
    }

    // ── L1c — demo DATA arrays (script string literals) ──
    let l1cHits = 0;
    for (const abs of files) {
        const rel = relative(ROOT, abs);
        const src = readFileSync(abs, "utf8");
        for (const { content, startLine } of scriptBlocks(src)) {
            for (const { line, value } of stringLiterals(content)) {
                for (const h of scanText(value)) {
                    l1cHits++;
                    violations.push(
                        `L1 ${rel}:${startLine + line - 1} — ${h.pattern} "${h.match}" (data) :: ${value.trim().slice(0, 120)}`,
                    );
                }
            }
        }
    }

    // ── L2 — the dist-published register docs (comment: / note: values) ──
    let l2Hits = 0;
    for (const [file, fields] of [
        [SPRING_PRESETS_FILE, ["comment"]],
        [CURVES_FILE, ["note"]],
    ]) {
        const rel = relative(ROOT, file);
        const src = readFileSync(file, "utf8");
        for (const { line, field, value } of fieldValues(src, fields)) {
            for (const h of scanText(value)) {
                l2Hits++;
                violations.push(
                    `L2 ${rel}:${line} — ${field}: ${h.pattern} "${h.match}" (dist-published) :: ${value.trim().slice(0, 120)}`,
                );
            }
        }
    }

    // ── L3 — the /data/timeline sample data is a generic domain ──
    let l3Hits = 0;
    const timelineSrc = readFileSync(TIMELINE_FILE, "utf8");
    for (const { content, startLine } of scriptBlocks(timelineSrc)) {
        for (const { line, value } of stringLiterals(content)) {
            for (const { name, re } of TIMELINE_SELF_REF) {
                if (re.test(value)) {
                    l3Hits++;
                    violations.push(
                        `L3 demo/stories/data/timeline.vue:${startLine + line - 1} — self-referential "${name}" :: ${value.trim().slice(0, 120)}`,
                    );
                }
            }
        }
    }

    facts.arms = { l1aHits, l1bHits, l1cHits, l2Hits, l3Hits };

    // ── Self-test bites (the anti-de-fang floor: RED/GREEN split) ──
    const bites = selfTest();
    facts.selfTests = bites;
    for (const [k, ok] of Object.entries(bites)) {
        if (!ok)
            violations.push(
                `SELF-TEST: the \`${k}\` bite BROKE — the detector no longer distinguishes its planted fixture`,
            );
    }

    return { facts, violations };
}

// A planted violation must RED; a legit forward-ref must stay GREEN.
function selfTest() {
    const hit = (t) => scanText(t).length > 0;

    // L1 — a planted tranche code / milestone code in copy reds; clean copy passes.
    const l1BadTranche = "The dock morph (AX.W99) settles on the snappy spring.";
    const l1BadHyphen = "The tab pill loupe travel (BD.W-TABS-FACTOR) rides the eyeglass register.";
    const l1BadMilestone = "The tempo axis (M11 / N6) co-scales the clocks (the P7 coherence).";
    const l1BadKf = "Composes the kf Draggable substrate.";
    const l1Good = "Grab the indicator and pull it — the pill follows your finger and flings to the nearest tab.";

    // L2 — a planted BD.W-… in a comment: value reds; a clean register doc passes.
    const l2BadComment = `comment: "PRESS register — the interactive tap. BD.W-ANIM-IOS27-TUNE",`;
    const l2GoodComment = `comment: "The press register — the interactive tap: a hair of inertial carry with a tiny alive rebound.",`;
    const l2Scan = (s) => {
        const fv = fieldValues(s, ["comment"]);
        return fv.some((f) => scanText(f.value).length > 0);
    };

    // L3 — a planted self-referential timeline event reds; a generic one passes.
    const l3Bad = `label: "Kickoff", body: "Tokens audit begins."`;
    const l3Good = `label: "Kickoff", body: "Research and discovery."`;
    const l3Scan = (s) => TIMELINE_SELF_REF.some(({ re }) => re.test(s));

    // GREEN forward-refs — a token, a subpath, a component, the P3 gamut all pass.
    const greenToken = "Read the `--spring-dock` token to time the morph.";
    const greenSubpath = "Import from `@mkbabb/glass-ui/dock`.";
    const greenComponent = "Compose `<DockIconButton>` inside the dock.";
    const greenGamut = "The swatch is authored in the Display P3 gamut.";

    return {
        l1TrancheBite: hit(l1BadTranche) === true && hit(l1Good) === false,
        l1HyphenBite: hit(l1BadHyphen) === true, // the .W-NAME form the old .W\d pattern missed
        l1MilestoneBite: hit(l1BadMilestone) === true,
        l1KfBite: hit(l1BadKf) === true,
        l2Bite: l2Scan(l2BadComment) === true && l2Scan(l2GoodComment) === false,
        l3Bite: l3Scan(l3Bad) === true && l3Scan(l3Good) === false,
        greenTokenBite: hit(greenToken) === false,
        greenSubpathBite: hit(greenSubpath) === false,
        greenComponentBite: hit(greenComponent) === false,
        greenGamutBite: hit(greenGamut) === false,
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_STORY_LANGUAGE_ARTIFACT", "AX-story-language");
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:story-language",
        facts,
        violations,
    });

    console.log("proof:story-language — the storybook + dist carry zero internal meta-language");
    console.log(`  story SFCs scanned : ${facts.storyFiles}`);
    console.log(
        `  arm hits : L1a-prose ${facts.arms.l1aHits} · L1b-manifest ${facts.arms.l1bHits} · L1c-data ${facts.arms.l1cHits} · L2-dist ${facts.arms.l2Hits} · L3-timeline ${facts.arms.l3Hits}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
