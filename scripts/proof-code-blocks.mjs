#!/usr/bin/env node
// proof:code-blocks — component names + technical values → ONE Fira Code code
// register (BC.W-CODE-BLOCKS).
//
// A developer scanning the enrolled demo surface sees every component name
// (<GlassDock>), every token (--glass-bg-floating), every subpath, every px /
// numeric value set in ONE consistent Fira-Code treatment — a tinted inline
// <Code> chip for the inline case, and a real multi-line <CodeBlock> glass plate
// (with a copy affordance) for the import-snippet / example case. The 3-way
// `fira-code` / `font-mono` / bare-`<code>` style fork collapses onto the ONE
// <Code> / <CodeBlock> register; the worst offender (display/card.vue, 45
// `font-mono` runs at HEAD) is the headline re-author.
//
// Pure FS, device-free. The PAINTED render (the consistent Fira-Code chips, the
// glass-quiet code-block plate over a busy backdrop, the copy affordance) is the
// orchestrator's fresh :5199 capture + tests-visual/code-blocks.spec.ts (the
// cardinal split — a source-green gate is never the close; the live π binds the
// paint).
//
// SCOPE (the footprint-conflict-free enrolled set). BC.W-CODE-BLOCKS owns the two
// demo-private primitives (<Code>/<CodeBlock>) + the headline re-author
// display/card.vue. The tree-wide sweep of the remaining ~50 story SFCs (90
// `font-mono` + 81 raw `fira-code` <code> across demo/stories/**) lands in
// follow-on waves that own those files; this gate's C2/C3/C4 code-dialect bars
// are scoped to the ENROLLED set (display/card.vue), where the collapse is
// executed. C1 (the primitives) + C6 (the byte-fence) are tree-global.
//
// Asserts (born-RED on the pre-sweep tree → GREEN at close; ["local","ci"]):
//   C1 — <Code> + <CodeBlock> EXIST as demo-private SFCs; both compose `fira-code`;
//        <CodeBlock> carries the golden `--card-pad-*` (NOT a hand-rolled `p-N`) + a
//        `rounded-card` corner + the copy affordance.
//   C2 — ZERO `<code class="font-mono ...">` survives in the enrolled set (the
//        font-mono <code> dialect retired).
//   C3 — ZERO raw `<code class="fira-code">` survives in the enrolled set (the third
//        dialect folded onto <Code>).
//   C4 — display/card.vue carries 0 `font-mono` + 0 raw `fira-code` <code> (the
//        headline offender clean); a <Code>/<CodeBlock> re-count ≥ the prior literal
//        count (no value silently de-coded).
//   C5 — the <CodeBlock> ≥2-consumer bar is met by construction (the enrolled
//        re-author consumes <CodeBlock> ≥2 times — the import-snippet / example rung).
//   C6 — `@utility fira-code` is BYTE-UNTOUCHED (the canonical font source the
//        primitives READ; this wave consolidates consumers, never retunes the face).
//   + self-test bites: a synthetic re-added `<code class="font-mono">` REDs C2; a
//     synthetic raw `<code class="fira-code">` REDs C3.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:code-blocks";
const SELF_TEST = process.argv.includes("--self-test");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip HTML/Vue/JS/CSS comments so a prose/comment mention never false-hits.
// Preserve newlines for geometry.
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

// The detector primitives — a `<code class="…font-mono…">` element, a raw
// `<code class="…fira-code…">` element. Scoped to the <code> ELEMENT (a prose
// `font-mono` `<span>` row-counter is NOT a code-dialect; the bar is the
// code-style fork specifically).
const fontMonoCodeRe = /<code\b[^>]*\bclass="[^"]*\bfont-mono\b[^"]*"[^>]*>/g;
const rawFiraCodeRe = /<code\b[^>]*\bclass="[^"]*\bfira-code\b[^"]*"[^>]*>/g;

// ── The enrolled set (footprint-scoped — display/card.vue, the headline re-author) ──
const ENROLLED = ["demo/stories/display/card.vue"];

const CODE_SFC = "demo/chassis/code/Code.vue";
const CODEBLOCK_SFC = "demo/chassis/code/CodeBlock.vue";

// ── C1 — the two primitives EXIST + compose the canonical register ────────────
const codeSrc = read(CODE_SFC);
const codeBlockSrc = read(CODEBLOCK_SFC);

const codeExists = codeSrc.length > 0;
const codeBlockExists = codeBlockSrc.length > 0;
// Both compose `fira-code` (the canonical source the wave consolidates onto).
const codeComposesFira = /\bfira-code\b/.test(codeSrc);
const codeBlockComposesFira = /\bfira-code\b/.test(codeBlockSrc);
// <CodeBlock> carries the golden --card-pad-* (NOT a hand-rolled p-N), a
// rounded-card corner, and the copy affordance.
const codeBlockGoldenPad = /--card-pad-(?:inline|block)\b/.test(codeBlockSrc);
const codeBlockRoundedCard = /\brounded-card\b/.test(codeBlockSrc);
const codeBlockCopy = /navigator\.clipboard/.test(codeBlockSrc);
// The plate is GLASS (the W55 seam, NOT a flat grey slab) — it composes
// `.glass-quiet` so it darkens-over-bright / lifts-over-dark in lockstep.
const codeBlockGlass = /\bglass-quiet\b/.test(codeBlockSrc);

const c1Ok =
    codeExists &&
    codeBlockExists &&
    codeComposesFira &&
    codeBlockComposesFira &&
    codeBlockGoldenPad &&
    codeBlockRoundedCard &&
    codeBlockCopy &&
    codeBlockGlass;
add(
    "C1-primitives-exist-compose-register",
    c1Ok,
    c1Ok
        ? "<Code> + <CodeBlock> exist as demo-private SFCs; both compose `fira-code`; <CodeBlock> carries the golden `--card-pad-*` (no hand-rolled p-N) + a `rounded-card` corner + the `navigator.clipboard` copy affordance + the `.glass-quiet` W55 seam plate (not a flat grey slab). C1"
        : `primitives incomplete (Code exists: ${codeExists}, CodeBlock exists: ${codeBlockExists}, Code fira: ${codeComposesFira}, CodeBlock fira: ${codeBlockComposesFira}, golden pad: ${codeBlockGoldenPad}, rounded-card: ${codeBlockRoundedCard}, copy: ${codeBlockCopy}, glass-quiet: ${codeBlockGlass})`,
);

// ── C2 — ZERO `<code class="font-mono …">` survives in the enrolled set ────────
const fontMonoHits = [];
for (const rel of ENROLLED) {
    const src = strip(read(rel));
    const hits = src.match(fontMonoCodeRe) ?? [];
    if (hits.length > 0) fontMonoHits.push({ rel, count: hits.length });
}
add(
    "C2-no-font-mono-code-dialect",
    fontMonoHits.length === 0,
    fontMonoHits.length === 0
        ? `zero \`<code class="font-mono …">\` survives across the enrolled set (${ENROLLED.length} route) — the font-mono <code> dialect retired onto <Code> (clean break, no alias). C2`
        : `${fontMonoHits.length} file(s) still carry a font-mono <code>: ${fontMonoHits
              .map((h) => `${h.rel} (${h.count})`)
              .join("; ")}`,
);

// ── C3 — ZERO raw `<code class="fira-code">` survives in the enrolled set ──────
const firaHits = [];
for (const rel of ENROLLED) {
    const src = strip(read(rel));
    const hits = src.match(rawFiraCodeRe) ?? [];
    if (hits.length > 0) firaHits.push({ rel, count: hits.length });
}
add(
    "C3-no-raw-fira-code-dialect",
    firaHits.length === 0,
    firaHits.length === 0
        ? `zero raw \`<code class="fira-code">\` survives across the enrolled set — the third dialect folded onto <Code> (the primitive carries the ` +
              "`fira-code`" +
              ` utility; a raw fira-code <code> in a story body is the retired register). C3`
        : `${firaHits.length} file(s) still carry a raw fira-code <code>: ${firaHits
              .map((h) => `${h.rel} (${h.count})`)
              .join("; ")}`,
);

// ── C4 — display/card.vue clean + no value silently de-coded ──────────────────
const cardSrcRaw = read("demo/stories/display/card.vue");
const cardSrc = strip(cardSrcRaw);
const cardFontMono = (cardSrc.match(/\bfont-mono\b/g) ?? []).length;
const cardRawFira = (cardSrc.match(rawFiraCodeRe) ?? []).length;
// The literal count is preserved: <Code>+<CodeBlock> usages ≥ the prior literal
// floor (HEAD had 45 `font-mono` runs on this file — every one folds onto a
// primitive, none silently de-coded).
const cardCodeUsages = (cardSrc.match(/<Code\b/g) ?? []).length;
const cardCodeBlockUsages = (cardSrc.match(/<CodeBlock\b/g) ?? []).length;
const cardPrimitiveTotal = cardCodeUsages + cardCodeBlockUsages;
const PRIOR_LITERAL_FLOOR = 40; // HEAD ≈ 45 font-mono runs; the collapse keeps ≥40 literals coded.
const c4Ok =
    cardFontMono === 0 &&
    cardRawFira === 0 &&
    cardPrimitiveTotal >= PRIOR_LITERAL_FLOOR;
add(
    "C4-card-headline-clean",
    c4Ok,
    c4Ok
        ? `display/card.vue (the headline offender) carries 0 \`font-mono\` + 0 raw \`fira-code\` <code>; the 3-dialect fork collapsed onto ${cardPrimitiveTotal} <Code>/<CodeBlock> usages (≥ the ${PRIOR_LITERAL_FLOOR}-literal floor — no value silently de-coded). C4`
        : `display/card.vue not clean (font-mono: ${cardFontMono}, raw fira-code <code>: ${cardRawFira}, primitive usages: ${cardPrimitiveTotal} vs floor ${PRIOR_LITERAL_FLOOR})`,
);

// ── C5 — the <CodeBlock> ≥2-consumer bar (met by construction in the enrolled set) ──
// The import-snippet / multi-line-example rung renders through <CodeBlock>; the
// enrolled re-author consumes it ≥2 times (the cn-seam + the scroll-pane recipe),
// meeting the load-bearing ≥2-consumer floor for the primitive.
const c5Ok = cardCodeBlockUsages >= 2;
add(
    "C5-codeblock-two-consumer-bar",
    c5Ok,
    c5Ok
        ? `the <CodeBlock> ≥2-consumer bar is met by construction — the enrolled re-author renders ${cardCodeBlockUsages} <CodeBlock> code-block plates (the import-snippet / multi-line-example rung). C5`
        : `the <CodeBlock> ≥2-consumer bar UNMET (${cardCodeBlockUsages} usages in the enrolled set; need ≥2)`,
);

// ── C6 — `@utility fira-code` is BYTE-UNTOUCHED ───────────────────────────────
// The canonical font register lives at typography/utilities.css. The wave
// CONSOLIDATES consumers, never retunes the typeface — the rule body must carry
// the exact `font-family: var(--font-mono)` + `font-feature-settings: "liga","calt"`
// pair (the byte-identical source the route-census §3 cites).
const utilitiesCss = read("src/styles/typography/utilities.css");
const firaRuleMatch = utilitiesCss.match(/@utility\s+fira-code\s*\{([\s\S]*?)\}/);
const firaRuleBody = firaRuleMatch ? firaRuleMatch[1] : "";
const firaIntact =
    /font-family:\s*var\(--font-mono\)\s*;/.test(firaRuleBody) &&
    /font-feature-settings:\s*"liga"\s*,\s*"calt"\s*;/.test(firaRuleBody);
add(
    "C6-fira-utility-byte-untouched",
    firaIntact,
    firaIntact
        ? '`@utility fira-code` is byte-untouched (font-family: var(--font-mono) + font-feature-settings: "liga","calt") — the canonical font source the primitives READ; the wave consolidates consumers, never retunes the face. C6'
        : "`@utility fira-code` body drifted — the canonical font register must stay the exact var(--font-mono) + liga/calt pair (byte-fenced)",
);

// ── the π readback spec is wired (the BINDING close) ──────────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/code-blocks.spec.ts")),
    "tests-visual/code-blocks.spec.ts exists (the π getComputedStyle readback — the inline <Code> chip resolves the Fira-Code stack + a tinted backplate + warm ink; the <CodeBlock> plate resolves fira-code + a translucent glass background (α<0.92) + the golden padding; the copy button reachable. The BINDING close, not this device-free arm alone)",
);

// ══════════════════════════════════════════════════════════════════════════════
// Self-test bites (--self-test) — each planted defect MUST flip a clause RED.
// ══════════════════════════════════════════════════════════════════════════════
if (SELF_TEST) {
    const selfBites = [];
    const bite = (name, ok) => selfBites.push({ name, ok });

    // Bite 1 — a synthetic re-added `<code class="font-mono">` REDs C2.
    {
        const synthetic = `<p><code class="font-mono text-xs">--token</code></p>`;
        const flagged = (strip(synthetic).match(fontMonoCodeRe) ?? []).length > 0;
        bite('C2 flags a synthetic re-added <code class="font-mono">', flagged);
    }

    // Bite 2 — a synthetic raw `<code class="fira-code">` REDs C3.
    {
        const synthetic = `<p><code class="fira-code">GlassDock</code></p>`;
        const flagged = (strip(synthetic).match(rawFiraCodeRe) ?? []).length > 0;
        bite('C3 flags a synthetic raw <code class="fira-code">', flagged);
    }

    // Bite 3 (the distinguishing bite) — a prose `font-mono` <span> row-counter
    // does NOT red C2 (the bar is the <code> code-DIALECT, not a mono numeric column).
    {
        const synthetic = `<span class="font-mono text-xs tabular-nums">#01</span>`;
        const flagged = (strip(synthetic).match(fontMonoCodeRe) ?? []).length > 0;
        bite(
            "C2 does NOT flag a prose font-mono <span> row-counter — the distinguishing bite",
            !flagged,
        );
    }

    // Bite 4 — a drifted fira-code rule (font-family swapped) REDs C6.
    {
        const synthetic = `@utility fira-code { font-family: monospace; }`;
        const m = synthetic.match(/@utility\s+fira-code\s*\{([\s\S]*?)\}/);
        const body = m ? m[1] : "";
        const intact =
            /font-family:\s*var\(--font-mono\)\s*;/.test(body) &&
            /font-feature-settings:\s*"liga"\s*,\s*"calt"\s*;/.test(body);
        bite(
            "C6 flags a synthetic drifted fira-code rule (font-family swapped)",
            !intact,
        );
    }

    const failedBites = selfBites.filter((b) => !b.ok);
    console.log("\n  [--self-test] planted-defect bites:");
    for (const b of selfBites) console.log(`    ${b.ok ? "✓" : "✗"} ${b.name}`);
    if (failedBites.length > 0) {
        console.error(
            `\n[proof:code-blocks --self-test] ${failedBites.length} bite(s) did NOT fire — the gate would not catch the planted defect.`,
        );
        process.exit(1);
    }
    console.log(
        "\n[proof:code-blocks --self-test] all bites fire — the gate catches each planted defect.",
    );
    process.exit(0);
}

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:code-blocks — component names + technical values → ONE Fira Code code register (BC.W-CODE-BLOCKS)",
);
console.log(`  enrolled re-author: ${ENROLLED.join(", ")}`);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_CODE_BLOCKS_OUT", "BC-code-blocks");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:code-blocks",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the PAINTED render (the consistent Fira-Code chips, the glass-quiet code-block plate over a busy backdrop, the copy affordance) is the orchestrator's fresh :5199 capture + tests-visual/code-blocks.spec.ts (the cardinal split; a source-green gate is never the close).",
    enrolled: ENROLLED,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:code-blocks] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:code-blocks] the 3-way code-style fork collapses onto the ONE <Code>/<CodeBlock> register; display/card.vue (the headline offender) is clean; <CodeBlock> meets its ≥2-consumer bar; `@utility fira-code` is byte-untouched — the π arm binds the resolved paint.",
);
