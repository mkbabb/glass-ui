#!/usr/bin/env node
// proof:story-code-register — the ONE highlighted code register (BI.W-CODEBLOCK).
//
// UF-F3 / FAM-8: "If we're to have these code sections, they should be properly
// sized (horizontally and vertically), syntax highlighted with highlight.js and a
// theme, and fully standardized to be in every page." At HEAD the demo carried a
// mono <CodeBlock> with ZERO highlighting adopted 1/150, and TWO pages hand-rolled
// a raw `<pre class="fira-code">` code block (containers/configurator.vue,
// feedback/toaster.vue). This gate is born-RED on that tree and GREEN once the two
// offenders fold onto <CodeBlock>, the lazy highlight.js runtime is wired, and the
// warm-crayon theme lands.
//
// Pure FS, device-free. The BINDING close is the paint — the warm-crayon render,
// the CLS-0 raw→highlighted swap, and the G3 crayon-contrast OKLab readback ride
// tests-visual/code-blocks.spec.ts + the π batch (#92). A source-green gate is
// never the close (the cardinal split).
//
// Asserts (born-RED on the pre-fold tree → GREEN at close; ["local","ci"]):
//   C1 — <CodeBlock> is the ONLY block code register: ZERO raw `<pre …fira-code…>`
//        code blocks survive across demo/stories, off the legit-mono classifier
//        (a `<pre data-mono-content>` opt-out = terminal output / font specimen /
//        ascii, NOT a code block).
//   C2 — the two named offenders (containers/configurator.vue,
//        feedback/toaster.vue) fold onto <CodeBlock>: no raw <pre fira-code>, a
//        <CodeBlock> present.
//   C3 — highlight is wired: useCodeHighlight lazy-imports highlight.js core +
//        grammars; <CodeBlock> consumes it; hljs-house-theme.css maps `.hljs-*` →
//        `var(--code-*)`; <CodeBlock> imports the theme.
//   C4 — the crayons read WARM tokens (`--code-*` → `--section-color-*`/`--viz-*`/
//        `--foreground`/`--on-glass-muted-strong`), never a GitHub hex literal;
//        a plain `.dark` arm, ZERO `light-dark(` (the per-mode discipline).
//   C5 — the sizing model: `white-space:pre` (never `pre-wrap`), `max-inline-size:
//        42rem`, the <FadingScroll axis="x"> port (overflow-x:auto + edge cue).
//   + 7 self-test bites (--self-test): a planted raw <pre fira-code> reds C1/C2; a
//     planted GitHub-hex crayon reds C4; a planted `light-dark(` reds C4; a planted
//     `pre-wrap` reds C5; a stripped FadingScroll reds C5; a legit
//     `<pre data-mono-content>` greens (the distinguishing bite).

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:story-code-register";
const SELF_TEST = process.argv.includes("--self-test");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip HTML/JS/CSS comments so a prose/comment mention never false-hits.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(
            /(^|[^:])\/\/[^\n]*/g,
            (m, p1) => p1 + m.slice(p1.length).replace(/./g, " "),
        );

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── The block-level classifier ────────────────────────────────────────────────
// A `<pre …class="…fira-code…">` is a raw CODE-BLOCK offender UNLESS the same
// `<pre>` carries a `data-mono-content` opt-out (terminal output / font specimen /
// ascii — legit mono that is NOT source code). The bar is the BLOCK register (the
// `<pre>` element), distinct from the inline `<code class="fira-code">` chip.
const preFiraRe = /<pre\b[^>]*\bclass="[^"]*\bfira-code\b[^"]*"[^>]*>/g;
const isLegitMono = (openTag) => /\bdata-mono-content\b/.test(openTag);

// Walk demo/stories/**/*.vue.
function walkVue(dir) {
    const out = [];
    for (const entry of readdirSync(resolve(ROOT, dir), { withFileTypes: true })) {
        const rel = join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walkVue(rel));
        else if (entry.name.endsWith(".vue")) out.push(rel);
    }
    return out;
}

const STORY_FILES = existsSync(resolve(ROOT, "demo/stories"))
    ? walkVue("demo/stories")
    : [];

// Classify every `<pre fira-code>` across the story tree.
function classifyBlockOffenders(files) {
    const offenders = [];
    const legit = [];
    for (const rel of files) {
        const src = strip(read(rel));
        const hits = src.match(preFiraRe) ?? [];
        for (const tag of hits) {
            (isLegitMono(tag) ? legit : offenders).push({ rel, tag });
        }
    }
    return { offenders, legit };
}

// ── C1 — zero raw <pre fira-code> code blocks survive (classifier-scoped) ──────
const { offenders, legit } = classifyBlockOffenders(STORY_FILES);
add(
    "C1-codeblock-only-block-register",
    offenders.length === 0,
    offenders.length === 0
        ? `zero raw \`<pre …fira-code…>\` code blocks survive across ${STORY_FILES.length} story SFC(s) — <CodeBlock> is the ONLY block code register (${legit.length} legit \`data-mono-content\` <pre> opt-out(s) off the bar). C1`
        : `${offenders.length} raw <pre fira-code> code-block offender(s): ${offenders
              .map((o) => o.rel)
              .join(", ")}`,
);

// ── C2 — the two named offenders folded onto <CodeBlock> ──────────────────────
const NAMED_OFFENDERS = [
    "demo/stories/containers/configurator.vue",
    "demo/stories/feedback/toaster.vue",
];
const foldFailures = [];
for (const rel of NAMED_OFFENDERS) {
    const src = strip(read(rel));
    const stillRaw = (src.match(preFiraRe) ?? []).filter(
        (t) => !isLegitMono(t),
    ).length;
    const hasCodeBlock = /<CodeBlock\b/.test(src);
    if (stillRaw > 0 || !hasCodeBlock)
        foldFailures.push({ rel, stillRaw, hasCodeBlock });
}
add(
    "C2-named-offenders-folded",
    foldFailures.length === 0,
    foldFailures.length === 0
        ? `both named offenders folded onto <CodeBlock> (configurator.vue + toaster.vue: 0 raw <pre fira-code>, a <CodeBlock> present). C2`
        : `fold incomplete: ${foldFailures
              .map((f) => `${f.rel} (raw:${f.stillRaw}, CodeBlock:${f.hasCodeBlock})`)
              .join("; ")}`,
);

// ── C3 — the lazy highlight.js runtime + theme are wired ──────────────────────
const HL = "demo/chassis/code/useCodeHighlight.ts";
const THEME = "demo/chassis/code/hljs-house-theme.css";
const CB = "demo/chassis/code/CodeBlock.vue";
const hlSrc = read(HL);
const themeSrc = read(THEME);
const cbSrc = read(CB);

const lazyCoreImport = /import\(\s*["']highlight\.js\/lib\/core["']\s*\)/.test(hlSrc);
const grammarImports = (
    hlSrc.match(/import\(\s*["']highlight\.js\/lib\/languages\/[a-z]+["']\s*\)/g) ?? []
).length;
const cbUsesHighlight = /useCodeHighlight\s*\(/.test(cbSrc);
const cbImportsTheme = /hljs-house-theme\.css/.test(cbSrc);
const themeMapsHljs =
    /\.hljs-\w+/.test(themeSrc) && /var\(--code-\w+\)/.test(themeSrc);
const c3Ok =
    lazyCoreImport &&
    grammarImports >= 3 &&
    cbUsesHighlight &&
    cbImportsTheme &&
    themeMapsHljs;
add(
    "C3-highlight-wired",
    c3Ok,
    c3Ok
        ? `useCodeHighlight lazy-imports highlight.js core + ${grammarImports} grammar(s); <CodeBlock> consumes it + imports hljs-house-theme.css; the theme maps \`.hljs-*\` → \`var(--code-*)\`. C3 (the CLS-0 raw→highlighted swap is the π bind)`
        : `highlight wiring incomplete (lazy core import: ${lazyCoreImport}, grammars: ${grammarImports}, CodeBlock consumes: ${cbUsesHighlight}, imports theme: ${cbImportsTheme}, theme maps .hljs-*: ${themeMapsHljs})`,
);

// ── C4 — the crayons read WARM tokens, never GitHub literals; plain .dark arm ──
// Every `--code-*` crayon must resolve to a warm demo token; no hex/rgb()/hsl()
// LITERAL color anywhere in the theme's color declarations; a plain `.dark` arm;
// zero `light-dark(`.
// Analyze the DECLARATIONS only (comments stripped — a prose mention of
// `light-dark()` or a hex in a comment is not a baked literal).
const themeCode = strip(themeSrc);
const codeTokenDefs = themeCode.match(/--code-\w+\s*:\s*[^;]+;/g) ?? [];
const WARM_TOKEN_RE =
    /var\(--(?:section-color-\d+|viz-[\w-]+|foreground|on-glass-muted-strong|muted-foreground[\w-]*)\)/;
const nonWarmCrayons = codeTokenDefs.filter((d) => !WARM_TOKEN_RE.test(d));
// A GitHub-style hex literal (or a raw rgb()/hsl() color) inside a color/crayon
// declaration is forbidden — the crayons READ tokens, never bake a literal.
const hexLiteral = /#[0-9a-fA-F]{3,8}\b/.test(themeCode);
const hasDarkArm = /\.dark\s+\.story-code-block\b/.test(themeCode);
const usesLightDark = /light-dark\s*\(/.test(themeCode);
const c4Ok =
    codeTokenDefs.length >= 5 &&
    nonWarmCrayons.length === 0 &&
    !hexLiteral &&
    hasDarkArm &&
    !usesLightDark;
add(
    "C4-warm-crayons-no-literal",
    c4Ok,
    c4Ok
        ? `${codeTokenDefs.length} \`--code-*\` crayons all read warm tokens (\`--section-color-*\`/\`--viz-*\`/\`--foreground\`/\`--on-glass-muted-strong\`); zero GitHub-hex literal; a plain \`.dark\` arm, zero \`light-dark(\`. C4 (the AA≥4.5/APCA≥60 contrast is the paint-arm π bind)`
        : `crayon-token discipline broken (crayons:${codeTokenDefs.length}, non-warm:${nonWarmCrayons.length} [${nonWarmCrayons.join(" | ")}], hex-literal:${hexLiteral}, .dark arm:${hasDarkArm}, light-dark:${usesLightDark})`,
);

// ── C5 — the sizing model ─────────────────────────────────────────────────────
const wsPre = /white-space:\s*pre\b(?!-wrap)/.test(cbSrc);
const wsPreWrap = /white-space:\s*pre-wrap\b/.test(cbSrc);
const max42 = /max-inline-size:\s*42rem\b/.test(cbSrc);
const fadingScroll =
    /<FadingScroll\b[^>]*\baxis="x"/.test(cbSrc) &&
    /from\s+["']@glass\/components\/custom\/fading-scroll["']/.test(cbSrc);
const c5Ok = wsPre && !wsPreWrap && max42 && fadingScroll;
add(
    "C5-sizing-model",
    c5Ok,
    c5Ok
        ? `the sizing model lands: \`white-space:pre\` (no \`pre-wrap\`), \`max-inline-size:42rem\`, a \`<FadingScroll axis="x">\` port (overflow-x:auto + the edge cue). C5`
        : `sizing model incomplete (white-space:pre:${wsPre}, no pre-wrap:${!wsPreWrap}, max-inline-size 42rem:${max42}, FadingScroll axis="x":${fadingScroll})`,
);

// ── the π readback spec is wired (the BINDING close) ──────────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/code-blocks.spec.ts")),
    "tests-visual/code-blocks.spec.ts exists (the π getComputedStyle readback — the warm-crayon render, the CLS-0 raw→highlighted swap, the G3 crayon-contrast OKLab readback; the BINDING close, not this device-free arm alone)",
);

// ══════════════════════════════════════════════════════════════════════════════
// Self-test bites (--self-test) — each planted defect MUST flip a clause RED.
// ══════════════════════════════════════════════════════════════════════════════
if (SELF_TEST) {
    const selfBites = [];
    const bite = (name, ok) => selfBites.push({ name, ok });

    // Bite 1 — a planted raw <pre fira-code> code block reds C1.
    {
        const synth = `<pre class="fira-code text-sm"><code>const x = 1;</code></pre>`;
        const hits = (strip(synth).match(preFiraRe) ?? []).filter(
            (t) => !isLegitMono(t),
        );
        bite("C1 flags a planted raw <pre fira-code> code block", hits.length > 0);
    }

    // Bite 2 — the C2 offender detector fires on a planted raw <pre fira-code>.
    {
        const synth = `<pre class="fira-code"><code>x</code></pre>`;
        const stillRaw = (strip(synth).match(preFiraRe) ?? []).filter(
            (t) => !isLegitMono(t),
        ).length;
        bite("C2 flags a planted raw <pre fira-code> in a named offender", stillRaw > 0);
    }

    // Bite 3 — a legit `<pre data-mono-content fira-code>` GREENS (distinguishing).
    {
        const synth = `<pre data-mono-content class="fira-code">$ npm run build\n  ✓ done</pre>`;
        const hits = (strip(synth).match(preFiraRe) ?? []).filter(
            (t) => !isLegitMono(t),
        );
        bite(
            "C1 does NOT flag a legit `<pre data-mono-content>` terminal block — the distinguishing bite",
            hits.length === 0,
        );
    }

    // Bite 4 — a planted GitHub-hex crayon reds C4.
    {
        const synth = `.story-code-block { --code-keyword: #c678dd; }`;
        const flagged = /#[0-9a-fA-F]{3,8}\b/.test(synth);
        bite("C4 flags a planted GitHub-hex crayon literal", flagged);
    }

    // Bite 5 — a planted `light-dark(` reds C4 (the per-mode discipline).
    {
        const synth = `.story-code-block { --code-string: light-dark(green, lime); }`;
        const flagged = /light-dark\s*\(/.test(synth);
        bite("C4 flags a planted `light-dark(` (per-mode discipline)", flagged);
    }

    // Bite 6 — a planted `white-space: pre-wrap` reds C5.
    {
        const synth = `.story-code-block-pre { white-space: pre-wrap; }`;
        const flagged = /white-space:\s*pre-wrap\b/.test(synth);
        bite("C5 flags a planted `white-space: pre-wrap`", flagged);
    }

    // Bite 7 — a stripped FadingScroll reds C5.
    {
        const synth = `<pre class="story-code-block-pre fira-code"></pre>`;
        const hasFS =
            /<FadingScroll\b[^>]*\baxis="x"/.test(synth) &&
            /from\s+["']@glass\/components\/custom\/fading-scroll["']/.test(synth);
        bite("C5 flags a stripped FadingScroll port", !hasFS);
    }

    const failedBites = selfBites.filter((b) => !b.ok);
    console.log("\n  [--self-test] planted-defect bites:");
    for (const b of selfBites) console.log(`    ${b.ok ? "✓" : "✗"} ${b.name}`);
    if (failedBites.length > 0) {
        console.error(
            `\n[proof:story-code-register --self-test] ${failedBites.length} bite(s) did NOT fire.`,
        );
        process.exit(1);
    }
    console.log(
        "\n[proof:story-code-register --self-test] all 7 bites fire — the gate catches each planted defect.",
    );
    process.exit(0);
}

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:story-code-register — the ONE highlighted code register (BI.W-CODEBLOCK)",
);
console.log(`  story SFCs scanned: ${STORY_FILES.length}`);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath(
    "GATE_STORY_CODE_REGISTER_OUT",
    "BI-story-code-register",
);
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:story-code-register",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the warm-crayon render, the CLS-0 raw→highlighted swap, and the G3 crayon-contrast OKLab readback are tests-visual/code-blocks.spec.ts + the π batch (the cardinal split).",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:story-code-register] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:story-code-register] <CodeBlock> is the ONE highlighted code register; the two raw offenders folded; the lazy highlight.js runtime + warm-crayon theme + sizing model land — the π arm binds the resolved paint.",
);
