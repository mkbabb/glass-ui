#!/usr/bin/env node
// BC.W-SPLIT-CHARS — the per-glyph split partner gate (proof:split-chars).
//
// The born-RED→GREEN device-free SOURCE arm for the JS partner the shipped
// `.char-stagger` CSS recipe (`typography/utilities.css:155-159`) has been waiting
// for: `useCharStagger` (the split composable — mints `.char` spans + the
// `--char-index`/`--char-total` customs the recipe reads) + `<SplitChars>` (the
// component face) + the MANDATORY accessible full-text label (the load-bearing
// a11y fact, FOURIER-INBOUND #6: `aria-label` on the wrapper + `aria-hidden` on
// every glyph, so AT hears the word ONCE, not the spell-out). Engine-free →
// `/motion-core` + the root barrel (the `vReveal` precedent).
//
// The BINDING painted truth is the π readback (the W-SPLIT-CHARS-DELTA capture on
// the demo hero story — the staggered entrance + the AT-label readback). This gate
// is the no-device CI half (a source-green/visually-broken gap is the close-class
// both halves kill).
//
// House style mirrors proof-accent-tone.mjs / proof-icon-chip.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation + a self-test bite per clause.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    _cliPaths = {
        ROOT,
        USE_CHAR_STAGGER: resolve(ROOT, "src/composables/motion/useCharStagger.ts"),
        MOTION_CORE_INDEX: resolve(ROOT, "src/composables/motion/core/index.ts"),
        ROOT_BARREL: resolve(ROOT, "src/index.ts"),
        API_INDEX: resolve(ROOT, "src/api/index.ts"),
        SPLIT_DIR: resolve(ROOT, "src/components/custom/split-chars"),
        SPLIT_CHARS_VUE: resolve(
            ROOT,
            "src/components/custom/split-chars/SplitChars.vue",
        ),
        CHAR_STAGGER_CSS: resolve(ROOT, "src/styles/typography/utilities.css"),
        CONSUMER_EVIDENCE: resolve(ROOT, "docs/consumer-evidence/split-chars.md"),
        ARTIFACT: gateArtifactPath("GLASS_UI_SPLIT_CHARS_ARTIFACT", "BC-split-chars"),
    };
    return _cliPaths;
}

// ── comment-strip (the false-witness discipline) ─────────────────────────────
function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < (text?.length ?? 0)) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = text.length;
            result += blankRange(text, i, end);
            i = end;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < (text?.length ?? 0)) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}
const stripAll = (t) => stripHtmlComments(stripBlockComments(t ?? ""));

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

// The two heavy peers the `/motion-core` engine-free leaf bar forbids.
const HEAVY_PEERS = ["@mkbabb/keyframes.js", "@vueuse/core"];

// ── the pure detector ────────────────────────────────────────────────────────
/**
 * Pure over the read sources. Each witness pushes a falsifiable violation string.
 * `sources` carries the comment-STRIPPED file bodies + the disk facts.
 */
export function detectSplitChars(sources) {
    const violations = [];
    const facts = {};

    const useCharStagger = sources.useCharStagger ?? "";
    const motionCore = sources.motionCore ?? "";
    const rootBarrel = sources.rootBarrel ?? "";
    const api = sources.apiIndex ?? "";
    const splitVue = sources.splitVue ?? "";
    const charStaggerCss = sources.charStaggerCss ?? "";
    const consumerEvidence = sources.consumerEvidence ?? "";

    // ── SP1 — the partner exists ONCE on /motion-core + engine-free ──
    const exportsComposable = /export\s+function\s+useCharStagger\b/.test(
        useCharStagger,
    );
    const reExported =
        /export\s*\*\s*from\s*["']\.\.\/useCharStagger["']/.test(motionCore) ||
        /export\s*\{[^}]*\buseCharStagger\b[^}]*\}\s*from\s*["']\.\.\/useCharStagger["']/.test(
            motionCore,
        );
    const heavyPeers = HEAVY_PEERS.filter((peer) =>
        new RegExp(
            `from\\s*["']${peer.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`,
        ).test(useCharStagger),
    );
    facts.sp1 = { exportsComposable, reExported, heavyPeers };
    if (!exportsComposable)
        violations.push(
            "SP1: `useCharStagger` is not exported from composables/motion/useCharStagger.ts",
        );
    if (!reExported)
        violations.push(
            "SP1: useCharStagger is not re-exported from the /motion-core barrel (motion/core/index.ts)",
        );
    if (heavyPeers.length)
        violations.push(
            `SP1: useCharStagger imports heavy peer(s) (${heavyPeers.join(", ")}) — the /motion-core engine-free leaf bar forbids them`,
        );

    // ── SP2 — the accessible label is MANDATORY (the load-bearing a11y fact) ──
    // useCharStagger SETS aria-label to the full text AND aria-hidden on every span.
    const setsAriaLabel = /setAttribute\(\s*["']aria-label["']/.test(useCharStagger);
    const setsAriaHidden = /setAttribute\(\s*["']aria-hidden["']/.test(useCharStagger);
    // <SplitChars> REQUIRES the `text` prop (the label source) + binds aria-label.
    const requiresTextProp =
        /\btext\s*:\s*string\b/.test(splitVue) && !/\btext\?\s*:/.test(splitVue);
    const vueBindsAriaLabel = /(?::aria-label|aria-label)\s*=/.test(splitVue);
    facts.sp2 = { setsAriaLabel, setsAriaHidden, requiresTextProp, vueBindsAriaLabel };
    if (!setsAriaLabel)
        violations.push(
            "SP2: useCharStagger does not SET `aria-label` to the full text (the AT label is dropped — the spell-out regression)",
        );
    if (!setsAriaHidden)
        violations.push(
            "SP2: useCharStagger does not set `aria-hidden` on the glyph spans (the spans spell the word to AT)",
        );
    if (!requiresTextProp)
        violations.push(
            "SP2: <SplitChars> does not REQUIRE the `text` prop (the single label source must be mandatory, not optional)",
        );
    if (!vueBindsAriaLabel)
        violations.push(
            "SP2: <SplitChars> does not bind `aria-label` on its wrapper (the label is not carried)",
        );

    // ── SP3 — the --char-index/--char-total customs are written ──
    const writesCharIndex = /setProperty\(\s*["']--char-index["']/.test(useCharStagger);
    const writesCharTotal = /setProperty\(\s*["']--char-total["']/.test(useCharStagger);
    // the .char class is the recipe's selector — the spans MUST carry it.
    const mintsCharClass =
        /\bclassName\s*=\s*["']char["']/.test(useCharStagger) ||
        /classList\.add\(\s*["']char["']/.test(useCharStagger);
    facts.sp3 = { writesCharIndex, writesCharTotal, mintsCharClass };
    if (!writesCharIndex)
        violations.push(
            "SP3: useCharStagger does not write `--char-index` on the glyph spans (the recipe's per-glyph custom is absent)",
        );
    if (!writesCharTotal)
        violations.push(
            "SP3: useCharStagger does not write `--char-total` on the wrapper (the missing companion custom)",
        );
    if (!mintsCharClass)
        violations.push(
            "SP3: useCharStagger does not mint the `.char` class the shipped recipe selects (`.char-stagger > .char`)",
        );

    // ── SP4 — no second split + the CSS recipe is consumed not re-authored ──
    // The shipped recipe is UNTOUCHED (the canonical 30ms-delay --char-index form
    // on the --spring-smooth clock) + no parallel stagger recipe is minted.
    const recipePresent = /\.char-stagger\s*>\s*\.char\s*\{/.test(charStaggerCss);
    const recipeReadsCharIndex = /var\(--char-index/.test(charStaggerCss);
    const recipeRidesSpringClock = /var\(--spring-smooth-duration\)/.test(
        charStaggerCss,
    );
    // a second per-glyph stagger recipe authored OUTSIDE the shipped CSS (e.g. a
    // `.char` animation-delay rule re-minted in the composable file or the SFC) reds.
    const parallelRecipe =
        /\.char-stagger\s*>\s*\.char\s*\{/.test(useCharStagger) ||
        /\.char-stagger\s*>\s*\.char\s*\{/.test(splitVue) ||
        /@keyframes\s+[\w-]*char-stagger/.test(splitVue);
    facts.sp4 = {
        recipePresent,
        recipeReadsCharIndex,
        recipeRidesSpringClock,
        parallelRecipe,
    };
    if (!recipePresent)
        violations.push(
            "SP4: the shipped `.char-stagger > .char` recipe is missing from typography/utilities.css (the partner has no recipe to feed)",
        );
    if (!recipeReadsCharIndex)
        violations.push(
            "SP4: the shipped recipe no longer reads `--char-index` (the recipe was altered)",
        );
    if (!recipeRidesSpringClock)
        violations.push(
            "SP4: the shipped recipe no longer rides `--spring-smooth-duration` (the per-spring clock — P4 was broken)",
        );
    if (parallelRecipe)
        violations.push(
            "SP4: a SECOND per-glyph stagger recipe was minted (the partner mints spans, it does NOT re-author the CSS recipe)",
        );

    // ── SP5 — the ≥2-consumer record ──
    const evidencePresent = consumerEvidence.length > 0;
    const namesDemoConsumer =
        /demo\/stories\/motion\/split-chars\.vue|demo hero story/i.test(
            consumerEvidence,
        );
    const namesHeroConstruction =
        /StoryHeader|StoryHero|every hero|by construction/i.test(consumerEvidence);
    const namesFourierConsume = /fourier/i.test(consumerEvidence);
    facts.sp5 = {
        evidencePresent,
        namesDemoConsumer,
        namesHeroConstruction,
        namesFourierConsume,
    };
    if (!evidencePresent)
        violations.push(
            "SP5: docs/consumer-evidence/split-chars.md is absent (the ≥2-consumer record)",
        );
    else {
        if (!namesDemoConsumer)
            violations.push(
                "SP5: the consumer-evidence does not name the demo hero story consumer",
            );
        if (!namesHeroConstruction)
            violations.push(
                "SP5: the consumer-evidence does not name the per-tranche hero construction (StoryHeader/StoryHero)",
            );
        if (!namesFourierConsume)
            violations.push(
                "SP5: the consumer-evidence does not name the cross-repo fourier consume",
            );
    }

    // ── SP6 — the new colocation dir + the structure/publish gates ──
    const dirFiles = sources.splitDirFiles ?? [];
    const needFiles = ["SplitChars.vue", "index.ts", "README.md"];
    const missingDirFiles = needFiles.filter((f) => !dirFiles.includes(f));
    // <SplitChars> rides the root barrel + /motion-core's component re-export (the
    // publish-choice resolved — engine-free → root-barrel-safe like vReveal). NO new
    // subpath (proof:subpath-enumeration unchanged).
    const ridesRootBarrel =
        /export\s*\*\s*from\s*["']\.\/components\/custom\/split-chars["']/.test(
            rootBarrel,
        );
    // /api publishes the option + return types on the discovery surface.
    const apiPublishes =
        /UseCharStaggerOptions/.test(api) && /UseCharStaggerReturn/.test(api);
    // (BH.B5e: the SP6 structure-enumeration sub-check — the `- split-chars/` bullet
    // in the generated docs/canon/structure.md — DROPPED; proof:claude-structure-sync
    // owns the hard regen-freshness gate over structure.md. The functional dir/barrel/
    // api clauses are kept.)
    facts.sp6 = {
        dirFiles,
        missingDirFiles,
        ridesRootBarrel,
        apiPublishes,
    };
    if (missingDirFiles.length)
        violations.push(
            `SP6: the split-chars colocation dir is missing file(s): ${missingDirFiles.join(", ")}`,
        );
    if (!ridesRootBarrel)
        violations.push(
            "SP6: <SplitChars> is not re-exported from the root barrel (src/index.ts → ./components/custom/split-chars)",
        );
    if (!apiPublishes)
        violations.push(
            "SP6: /api does not publish UseCharStaggerOptions + UseCharStaggerReturn",
        );

    return { facts, violations };
}

// ── the self-test (a planted bite per clause MUST flag) ──────────────────────
function selfTest() {
    const fails = [];
    const base = {
        useCharStagger: `import { ref, toValue } from "vue";
export function useCharStagger(target, opts = {}) {
  function split() {
    const el = toValue(target);
    const span = el.ownerDocument.createElement("span");
    span.className = "char";
    span.style.setProperty("--char-index", String(index));
    span.setAttribute("aria-hidden", "true");
    el.style.setProperty("--char-total", String(index));
    el.setAttribute("aria-label", full);
  }
}`,
        motionCore: `export * from "../useCharStagger";`,
        rootBarrel: `export * from "./components/custom/split-chars";`,
        apiIndex: `export type { UseCharStaggerOptions, UseCharStaggerReturn } from "x";`,
        splitVue: `const props = withDefaults(defineProps<{ text: string; by?: "char"; }>(), { by: "char" });
<Primitive :aria-label="props.text" />`,
        charStaggerCss: `.char-stagger > .char {
  animation: fade-in var(--spring-smooth-duration) var(--spring-smooth, ease) backwards;
  animation-delay: calc(var(--char-index, 0) * 30ms);
}`,
        consumerEvidence: `demo/stories/motion/split-chars.vue — the demo hero story; StoryHeader every hero by construction; the cross-repo fourier consume.`,
        splitDirFiles: ["SplitChars.vue", "index.ts", "README.md"],
    };
    const clean = detectSplitChars(base);
    if (clean.violations.length)
        fails.push(`BASE should be clean, got: ${clean.violations.join(" | ")}`);

    // SP1 bite — a planted heavy-peer import.
    const sp1 = detectSplitChars({
        ...base,
        useCharStagger:
            base.useCharStagger + `\nimport { useResizeObserver } from "@vueuse/core";`,
    });
    if (!sp1.violations.some((v) => v.startsWith("SP1")))
        fails.push("SP1 bite (heavy-peer import) did not flag");
    // SP1 bite — not re-exported from /motion-core.
    const sp1b = detectSplitChars({
        ...base,
        motionCore: `export * from "../vReveal";`,
    });
    if (!sp1b.violations.some((v) => v.includes("/motion-core")))
        fails.push("SP1 bite (no re-export) did not flag");
    // SP2 bite — a split path that omits the aria-label.
    const sp2 = detectSplitChars({
        ...base,
        useCharStagger: base.useCharStagger.replace(
            /el\.setAttribute\("aria-label", full\);/,
            "",
        ),
    });
    if (!sp2.violations.some((v) => v.startsWith("SP2")))
        fails.push("SP2 bite (no aria-label) did not flag");
    // SP2 bite — a <SplitChars> with an OPTIONAL text prop.
    const sp2b = detectSplitChars({
        ...base,
        splitVue: `const props = withDefaults(defineProps<{ text?: string; }>(), {});
<Primitive :aria-label="props.text" />`,
    });
    if (!sp2b.violations.some((v) => v.includes("`text` prop")))
        fails.push("SP2 bite (optional text prop) did not flag");
    // SP3 bite — a split missing --char-index.
    const sp3 = detectSplitChars({
        ...base,
        useCharStagger: base.useCharStagger.replace(
            /span\.style\.setProperty\("--char-index", String\(index\)\);/,
            "",
        ),
    });
    if (!sp3.violations.some((v) => v.startsWith("SP3")))
        fails.push("SP3 bite (no --char-index) did not flag");
    // SP4 bite — a planted second .char-stagger recipe in the SFC.
    const sp4 = detectSplitChars({
        ...base,
        splitVue: base.splitVue + `\n.char-stagger > .char { animation-delay: 99ms; }`,
    });
    if (!sp4.violations.some((v) => v.startsWith("SP4")))
        fails.push("SP4 bite (parallel recipe) did not flag");
    // SP4 bite — the shipped recipe loses the spring clock.
    const sp4b = detectSplitChars({
        ...base,
        charStaggerCss: base.charStaggerCss.replace(
            "var(--spring-smooth-duration)",
            "300ms",
        ),
    });
    if (!sp4b.violations.some((v) => v.includes("--spring-smooth-duration")))
        fails.push("SP4 bite (spring clock) did not flag");
    // SP5 bite — the consumer-evidence drops the fourier consume.
    const sp5 = detectSplitChars({
        ...base,
        consumerEvidence: `demo/stories/motion/split-chars.vue — the demo hero story; StoryHeader every hero by construction.`,
    });
    if (!sp5.violations.some((v) => v.startsWith("SP5")))
        fails.push("SP5 bite (no fourier consume) did not flag");
    // SP6 bite — missing README.
    const sp6b = detectSplitChars({
        ...base,
        splitDirFiles: ["SplitChars.vue", "index.ts"],
    });
    if (!sp6b.violations.some((v) => v.startsWith("SP6")))
        fails.push("SP6 bite (missing README) did not flag");

    return fails;
}

function run() {
    const p = cliPaths();
    const dirFiles = existsSync(p.SPLIT_DIR)
        ? readdirSync(p.SPLIT_DIR).filter((n) =>
              statSync(resolve(p.SPLIT_DIR, n)).isFile(),
          )
        : [];
    const sources = {
        useCharStagger: stripBlockComments(safeRead(p.USE_CHAR_STAGGER)),
        motionCore: stripBlockComments(safeRead(p.MOTION_CORE_INDEX)),
        rootBarrel: stripBlockComments(safeRead(p.ROOT_BARREL)),
        apiIndex: stripBlockComments(safeRead(p.API_INDEX)),
        splitVue: stripAll(safeRead(p.SPLIT_CHARS_VUE)),
        charStaggerCss: stripBlockComments(safeRead(p.CHAR_STAGGER_CSS)),
        consumerEvidence: safeRead(p.CONSUMER_EVIDENCE),
        splitDirFiles: dirFiles,
    };

    const { facts, violations } = detectSplitChars(sources);
    const selfTestFails = selfTest();
    for (const f of selfTestFails) violations.push(`SELF-TEST: ${f}`);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(p.ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:split-chars",
        facts,
        violations,
    });

    console.log(
        "proof:split-chars — the per-glyph split partner (useCharStagger + <SplitChars>) with the accessible full-text label (BC.W-SPLIT-CHARS)",
    );
    console.log(
        `  SP1 partner on /motion-core + engine-free (heavy peers=${facts.sp1.heavyPeers.length}): ${facts.sp1.exportsComposable && facts.sp1.reExported && facts.sp1.heavyPeers.length === 0 ? "✓" : "✗"}`,
    );
    console.log(
        `  SP2 accessible label mandatory (aria-label+aria-hidden, text prop required): ${facts.sp2.setsAriaLabel && facts.sp2.setsAriaHidden && facts.sp2.requiresTextProp && facts.sp2.vueBindsAriaLabel ? "✓" : "✗"}`,
    );
    console.log(
        `  SP3 --char-index/--char-total customs written: ${facts.sp3.writesCharIndex && facts.sp3.writesCharTotal && facts.sp3.mintsCharClass ? "✓" : "✗"}`,
    );
    console.log(
        `  SP4 no second split, recipe consumed not re-authored: ${facts.sp4.recipePresent && facts.sp4.recipeReadsCharIndex && facts.sp4.recipeRidesSpringClock && !facts.sp4.parallelRecipe ? "✓" : "✗"}`,
    );
    console.log(
        `  SP5 ≥2-consumer record (demo hero + hero construction + fourier): ${facts.sp5.evidencePresent && facts.sp5.namesDemoConsumer && facts.sp5.namesHeroConstruction && facts.sp5.namesFourierConsume ? "✓" : "✗"}`,
    );
    console.log(
        `  SP6 colocation dir + root barrel + api: ${facts.sp6.missingDirFiles.length === 0 && facts.sp6.ridesRootBarrel && facts.sp6.apiPublishes ? "✓" : "✗"}`,
    );
    console.log(
        `  self-test bites: ${selfTestFails.length === 0 ? "all flag ✓" : "BROKEN — " + selfTestFails.join("; ")}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${p.ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
