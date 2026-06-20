#!/usr/bin/env node
// AV.W16 TW8 — the tailwind-v4-idiom gate (proof:tailwind-v4-idiom).
//
// EXTENDS proof:design-idiom-localization (the W8b gate that flags only the
// `text-[var]`/`shadow-[var]` arbitrary wraps). W8b closed the first
// arbitrary-wrap class; W16 closes the registered-NAMESPACE wrap, the
// deprecated `theme()`-function, the container-query-context, and the
// `@theme` scale-completeness classes the W8b sweep left.
//
// FOUR asserts (the wave hard gate §6):
//   (a) no-theme()        — zero `theme(colors.…)` function-syntax sites under
//                           src/ (TW6 — the deprecated v3 function form). The
//                           bridges exist (`var(--secondary)`/`var(--primary)`);
//                           `theme()` is "not idiomatic v4" (tailwindlabs #16116).
//   (b) no-registered-bare-var — no `<utility>-[var(--x)]` arbitrary wrap in an
//                           SFC class string where a `--z`/`--radius`/`--duration`/
//                           `--ease` REGISTERED-namespace bridge resolves the
//                           named utility (TW4 — e.g. `z-[var(--z-dock)]` →
//                           `z-dock`, `ease-[var(--ease-standard)]` → `ease-standard`).
//                           An explicit allowlist EXEMPTS the sanctioned sites.
//   (c) container-context — the dock + chassis roots declare a `@container`
//                           context (`container:`/`container-type`) AND read it
//                           via `@container` size variants (TW3 — portable into a
//                           narrow host, not viewport-coupled).
//   (d) @theme completeness — every member of the canonical SCALE families
//                           (duration, ease/spring, glass-blur-radius, the named
//                           shadow rungs) in tokens.css has a theme.css bridge OR
//                           is on the listed raw-var holdout allowlist (TW1
//                           corollary — one bridge per scale primitive, the
//                           single override point).
//
// House style mirrors proof-design-idiom-localization.mjs / proof-dock-opacity-
// lockstep.mjs: ESM .mjs, comment-strip first (a commented wrap is never a
// witness), pure exported detectors, a byte-stable JSON artefact via gate-output,
// a human summary, process.exit(1) on any violation.
//
// KEPT OFF the flag list (the sanctioned-site allowlist, wave §8 / §29):
//   - the compound `transition-[…]` property lists (sanctioned single-site per
//     the v4 transition-property docs — a property list, not a var wrap);
//   - the slider `[--slider-track-height:…]` DECLARATIONS (the only way to SET a
//     `--var` in a class — the declare-vs-consume distinction; the `:` form is
//     never matched by the consume-wrap regex);
//   - the state-axis CHOREOGRAPHY constants (`--scale-press`, `--scale-hover`,
//     `--lift`, `--max-width-input`) consumed as raw `var()` inside recipes —
//     correct, there is no `--scale-*` bridge utility use case.

import { readdirSync, readFileSync } from "node:fs";
import { readMonolith } from "./read-css-monoliths.mjs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SRC = resolve(ROOT, "src");
const COMPONENTS = resolve(SRC, "components");
const STYLES = resolve(SRC, "styles");

// ── (b) the registered-namespace wrap detector ─────────────────────────────
// `<utility>-[var(--<ns>…)]` where <ns> ∈ {z, radius, duration, ease}. These
// have a `--<ns>-*`/`--radius-*` bridge in theme.css that mints the named
// utility (`z-dock`, `rounded-card`, `duration-normal`, `ease-standard`), so the
// arbitrary wrap is the non-idiomatic form. The leading `[a-z-]+-` is the
// Tailwind utility prefix (`z-`, `duration-`, `ease-`, `rounded-` …).
const REGISTERED_WRAP_RE = /\b[a-z-]+-\[var\(--(?:z|radius|duration|ease)-[a-z0-9-]+\)\]/g;

// Allowlist for assert (b): {file, line, var, rationale}. A NEW unjustified
// registered-namespace wrap that is NOT here still reddens.
const WRAP_ALLOWLIST = [];

// ── (d) the canonical SCALE families (the bridgeable primitives) ────────────
// Each family: the tokens.css declaration prefix that enumerates its members,
// and the holdout allowlist of members consumed only as raw var() inside a
// recipe (no per-element utility use case — the choreography/composite tokens).
const SCALE_FAMILIES = [
    {
        name: "duration",
        // --duration-* in tokens.css → bridged by a DEDICATED
        // `--transition-duration-*: var(--duration-X)` row in theme.css. The
        // bridgeRe anchors to that declaration form (NOT a stray var() reference
        // inside an --animate-* composite, which would false-PASS a dropped row).
        tokenRe: /^\s*(--duration-[a-z-]+)\s*:/gm,
        bridgeRe: /^\s*--transition-duration-[a-z-]+\s*:\s*var\((--duration-[a-z-]+)\)/gm,
        // The shimmer-tempo durations are consumed ONLY inside the `--animate-shimmer*`
        // composites (theme.css plain @theme block) — they set the keyframe loop
        // tempo, not a per-element `duration-shimmer` utility. No standalone bridge.
        //
        // --duration-metal (BB.W-METAL-SHIMMER) is the SAME holdout register: the
        // slow 6s metal-family clock is consumed ONLY inside the `--animate-metal`
        // composite (theme/literals.css) + the `animation: metal-shimmer-sweep
        // var(--duration-metal) …` shorthand in utilities/metal.css — it sets the
        // metal sweep loop tempo, never a per-element `duration-metal` utility, so
        // there is no standalone `--transition-duration-metal` bridge use case (the
        // exact --duration-shimmer pattern).
        holdout: ["--duration-shimmer", "--duration-shimmer-fast", "--duration-metal"],
    },
    {
        name: "ease/spring",
        // --motion-ease-* + --spring-* → bridged by a DEDICATED `--ease-*: var(--X)`
        // row in theme.css (anchored to the declaration, not a composite reference).
        tokenRe: /^\s*(--(?:motion-ease|spring)-[a-z-]+)\s*:/gm,
        bridgeRe: /^\s*--ease-[a-z-]+\s*:\s*var\((--(?:motion-ease|spring)-[a-z-]+)\)/gm,
        // --spring-dock is the dock FLIP choreography constant — consumed as raw
        // var(--spring-dock) inside the dock motion recipes (proof:dock-motion-*),
        // no per-element `ease-spring-dock` utility use case. --spring-deck
        // (BC.W-DECK) is the matching deck-slide choreography ALIAS
        // (`--spring-deck: var(--spring-smooth)`) — consumed as a raw
        // var(--spring-deck) read in the deck slide-transition recipe + the
        // useDeckSpring JS half, never a per-element `ease-spring-deck` utility, so
        // it is the same raw-var register as --spring-dock (the curve register has
        // its own --ease-spring-smooth bridge through the donor).
        //
        // The six --spring-<name>-duration tokens (BA.W-GLASS-CAL Unit 3 + the
        // BC.W-SPRING-EASE press clock — the per-spring SETTLE clock, GENERATED in
        // regen-spring-tokens.mjs from the SPRING_PRESETS (response, ζ) table) are
        // the matching holdout: each is consumed ONLY as a raw
        // `var(--spring-<name>-duration)` read paired with its `--spring-<name>`
        // curve inside a `transition`/`animation` shorthand (transitions.css,
        // dock.css, view-transition.css, animations.css) + the JS press path
        // (useSpringPress reads --spring-press-duration) + the
        // `--tab-indicator-duration` vocabulary — never a per-element
        // `duration-spring-smooth` Tailwind utility, so there is no `--ease-*`/
        // duration bridge use case (the same raw-var register as --spring-dock).
        holdout: [
            "--spring-dock",
            "--spring-deck",
            "--spring-smooth-duration",
            "--spring-snappy-duration",
            "--spring-bouncy-duration",
            "--spring-gentle-duration",
            "--spring-dock-duration",
            "--spring-press-duration",
        ],
    },
    {
        name: "glass-blur-radius",
        // --glass-blur-*-radius → bridged by a DEDICATED `--blur-*: var(--…-radius)`
        // row in theme.css.
        tokenRe: /^\s*(--glass-blur-[a-z-]+-radius)\s*:/gm,
        bridgeRe: /^\s*--blur-[a-z-]+\s*:\s*var\((--glass-blur-[a-z-]+-radius)\)/gm,
        // The deep-tier radii (BB.W-DEEP-GLASS) are the holdout register: the calm
        // ladder rungs (wash/quiet/resting/floating/overlay/dock) bridge to
        // `--blur-glass-*` per-element utilities, but the OPT-IN deep tier is reached
        // via the `.glass-deep` TOKEN-SUBSTITUTION decoration (it re-points
        // --glass-blur-floating: var(--glass-blur-deep) locally) + the `--glass-blur-deep`
        // `blur(var(--glass-blur-deep-active-radius))` filter composite — never a
        // per-element `blur-glass-deep` Tailwind utility, so there is no standalone
        // `--blur-*` bridge use case (--glass-blur-deep-active-radius is the
        // scalar-lerp endpoint consumed only inside the --glass-blur-deep filter +
        // its dark-arm twin in dark-arm.css).
        holdout: ["--glass-blur-deep-radius", "--glass-blur-deep-active-radius"],
    },
];

// ── (d′) named-shadow bridge integrity ──────────────────────────────────────
// The shadow namespace is mixed: a `-shadow` substring appears both in the
// utility RUNGS theme.css bridges (`--card-shadow`, `--glass-shadow-quiet`, …)
// AND in dozens of internal recipe tokens (`--shadow-color`, `--shadow-uniform`,
// `--glass-under-shadow-*`, the composed-into-a-rung shadows). A forward
// completeness regex over `-shadow` over-matches the recipe internals and
// false-REDs. The MEANINGFUL, unambiguous shadow assert is bridge-INTEGRITY:
// every `--shadow-*:` bridge theme.css authors resolves to a token that EXISTS
// in tokens.css (a dangling bridge — a `shadow-*` utility pointing at a
// non-existent token — is the real failure mode the @theme completeness clause
// guards for shadows). The forward direction is left to the cleanly-namespaced
// scales above (duration/ease/blur) where it is unambiguous.
function detectShadowBridgeIntegrity(tokensCss, themeCss) {
    const violations = [];
    // The set of all tokens.css declarations (any name), for the existence check.
    const declared = new Set();
    for (const m of tokensCss.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gm)) declared.add(m[1]);
    // theme.css shadow bridges: `--shadow-<rung>: var(--<token>)`.
    const bridges = [];
    for (const m of themeCss.matchAll(/^\s*--shadow-[a-z0-9-]+\s*:\s*var\((--[a-z0-9-]+)\)/gm)) {
        bridges.push(m[1]);
    }
    const dangling = bridges.filter((t) => !declared.has(t));
    for (const t of dangling) {
        violations.push(
            `@theme completeness [named-shadow]: theme.css shadow bridge → ${t} resolves to no tokens.css declaration (dangling bridge)`,
        );
    }
    return {
        familyFact: { family: "named-shadow", bridges: bridges.length, dangling: dangling.length },
        violations,
    };
}

// ── (c) the container-context asserts ───────────────────────────────────────
const CONTAINER_CONTEXT = [
    {
        // AX.W06 — dock.css was carved into dock/{shell,morph,density,…}.css, so
        // read the dock CSS FAMILY (the @import root + its partials). The dock's
        // `dock` inline-size container is OPT-IN via the GlassDock `containerName`
        // prop (AW.W1 removed the always-on CSS default that broke shrink-to-fit),
        // so the CONTEXT is component-provided (GlassDock.vue) — the family carries
        // the `@container dock(…)` VARIANTS (density.css), which is the TW3 idiom
        // evidence the gate locks. `contextInComponent` points at the prop binding.
        file: "src/styles/dock.css",
        family: ["src/styles/dock/shell.css", "src/styles/dock/density.css", "src/styles/dock/morph.css"],
        contextInComponent: "src/components/custom/dock/GlassDock.vue",
        contextRe: /container:\s*dock\s*\/\s*inline-size|container-type:\s*inline-size|container(?:Name|-name)/,
        variantRe: /@container\s+dock\s*\(/,
    },
    {
        file: "src/styles/instrument-chassis.css",
        contextRe: /container:\s*chassis\s*\/\s*inline-size|container-type:\s*inline-size/,
        variantRe: /@container\s+chassis\s*\(/,
    },
];

// ── shared: comment-strip (HTML + JS/CSS block + line) ──────────────────────
function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}
function stripComments(text) {
    let result = "";
    let i = 0;
    const n = text.length;
    while (i < n) {
        if (text[i] === "<" && text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? n : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
            continue;
        }
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? n : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
            continue;
        }
        if (text[i] === "/" && text[i + 1] === "/") {
            let end = text.indexOf("\n", i + 2);
            if (end === -1) end = n;
            result += blankRange(text, i, end);
            i = end;
            continue;
        }
        result += text[i];
        i++;
    }
    return result;
}

function walk(dir, exts) {
    const out = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const full = resolve(dir, entry.name);
        if (entry.isDirectory()) out.push(...walk(full, exts));
        else if (entry.isFile() && exts.some((e) => entry.name.endsWith(e))) out.push(full);
    }
    return out;
}

function lineOf(text, offset) {
    let line = 1;
    for (let i = 0; i < offset && i < text.length; i++) if (text[i] === "\n") line++;
    return line;
}

function rel(file) {
    return file.slice(ROOT.length + 1);
}

// ── (a) no-theme() detector ─────────────────────────────────────────────────
const THEME_FN_RE = /\btheme\(\s*colors\./g;
export function detectThemeFn(entries) {
    const violations = [];
    let hits = 0;
    for (const { rel: r, src } of entries) {
        THEME_FN_RE.lastIndex = 0;
        for (const m of src.matchAll(THEME_FN_RE)) {
            hits++;
            violations.push(
                `${r}:${lineOf(src, m.index)}: deprecated theme(colors.…) function — use var(--color-…) (the @theme bridge resolves it)`,
            );
        }
    }
    return { hits, violations };
}

// ── (b) registered-namespace-wrap detector ──────────────────────────────────
export function detectRegisteredWrap(entries) {
    const violations = [];
    let hits = 0;
    let allowlisted = 0;
    for (const { rel: r, src } of entries) {
        REGISTERED_WRAP_RE.lastIndex = 0;
        for (const m of src.matchAll(REGISTERED_WRAP_RE)) {
            const line = lineOf(src, m.index);
            const allowed = WRAP_ALLOWLIST.some(
                (a) => a.file === r && a.line === line && m[0].includes(a.var),
            );
            if (allowed) {
                allowlisted++;
                continue;
            }
            hits++;
            violations.push(
                `${r}:${line}: registered-namespace wrap \`${m[0]}\` — use the named @theme utility (the --z/--radius/--duration/--ease bridge resolves it)`,
            );
        }
    }
    return { hits, allowlisted, violations };
}

// ── (d) @theme completeness ─────────────────────────────────────────────────
export function detectCompleteness(tokensCss, themeCss) {
    const violations = [];
    const familyFacts = [];
    for (const fam of SCALE_FAMILIES) {
        const members = new Set();
        fam.tokenRe.lastIndex = 0;
        for (const m of tokensCss.matchAll(fam.tokenRe)) members.add(m[1]);
        const bridged = new Set();
        fam.bridgeRe.lastIndex = 0;
        for (const m of themeCss.matchAll(fam.bridgeRe)) bridged.add(m[1]);
        const holdout = new Set(fam.holdout);
        const missing = [...members].filter((t) => !bridged.has(t) && !holdout.has(t));
        familyFacts.push({
            family: fam.name,
            members: members.size,
            bridged: [...members].filter((t) => bridged.has(t)).length,
            holdout: [...members].filter((t) => holdout.has(t)).length,
            missing: missing.length,
        });
        for (const t of missing) {
            violations.push(
                `@theme completeness [${fam.name}]: ${t} has no theme.css bridge and is not on the holdout allowlist`,
            );
        }
        // A holdout entry that is no longer a real token is stale bookkeeping.
        for (const h of fam.holdout) {
            if (!members.has(h)) {
                violations.push(
                    `@theme completeness [${fam.name}]: holdout ${h} is not a declared token (stale allowlist entry)`,
                );
            }
        }
    }
    return { familyFacts, violations };
}

// ── (c) container-context ───────────────────────────────────────────────────
export function detectContainerContext(readFile) {
    const violations = [];
    const facts = [];
    for (const { file, family, contextInComponent, contextRe, variantRe } of CONTAINER_CONTEXT) {
        // Read the file + any carved partials (AX.W06) + the component that may
        // set the container via a prop (opt-in context, AW.W1) — concatenated.
        const sources = [file, ...(family ?? []), contextInComponent].filter(Boolean);
        const text = sources.map((f) => readFile(resolve(ROOT, f)) ?? "").join("\n");
        const hasContext = contextRe.test(text);
        const hasVariant = variantRe.test(text);
        facts.push({ file, hasContext, hasVariant });
        if (!hasContext) violations.push(`${file}: missing @container CONTEXT (container-type / container: name / containerName prop) — TW3`);
        if (!hasVariant) violations.push(`${file}: declares no @container <name>(…) size variant — TW3`);
    }
    return { facts, violations };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_TAILWIND_V4_IDIOM_ARTIFACT",
        "W16-tailwind-v4-idiom",
    );

    // (a) no-theme() — scan all of src/ (.vue/.ts/.css), comment-stripped.
    const srcEntries = walk(SRC, [".vue", ".ts", ".css"]).map((f) => ({
        rel: rel(f),
        src: stripComments(readFileSync(f, "utf8")),
    }));
    const themeFn = detectThemeFn(srcEntries);

    // (b) registered-namespace wrap — SFC class strings only (.vue/.ts under
    // components/), comment-stripped (mirrors the W8b component scope).
    const sfcEntries = walk(COMPONENTS, [".vue", ".ts"]).map((f) => ({
        rel: rel(f),
        src: stripComments(readFileSync(f, "utf8")),
    }));
    const registeredWrap = detectRegisteredWrap(sfcEntries);

    // (c) container-context.
    const container = detectContainerContext((f) => {
        try {
            return readFileSync(f, "utf8");
        } catch {
            return "";
        }
    });

    // (d) @theme completeness — the cleanly-namespaced scales (forward
    // completeness) + the shadow bridge-integrity check (the mixed namespace).
    // AY.W-CSS1 — tokens.css became a thin @import root over carved partials;
    // readMonolith concatenates root + partials so the bridge-integrity scan
    // resolves every tokens.css declaration (the --cartoon-shadow-* rungs now
    // live in tokens/shadow.css).
    const tokensCss = readMonolith(ROOT, "tokens");
    // AZ.W-CARVE — theme.css became a thin @import root over theme/*.css
    // partials (radius/bridges/literals/dark); readMonolith concatenates root +
    // partials in cascade order so the @theme-completeness + shadow-bridge scan
    // resolves every @theme/@theme-inline declaration (the bridges now live in
    // theme/bridges.css, the radius primitives in theme/radius.css).
    const themeCss = readMonolith(ROOT, "theme");
    const completeness = detectCompleteness(tokensCss, themeCss);
    const shadow = detectShadowBridgeIntegrity(tokensCss, themeCss);
    completeness.familyFacts.push(shadow.familyFact);
    completeness.violations.push(...shadow.violations);

    const violations = [
        ...themeFn.violations,
        ...registeredWrap.violations,
        ...container.violations,
        ...completeness.violations,
    ];
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:tailwind-v4-idiom",
        extends: "proof:design-idiom-localization",
        facts: {
            srcScanned: srcEntries.length,
            sfcScanned: sfcEntries.length,
            themeFnHits: themeFn.hits,
            registeredWrapHits: registeredWrap.hits,
            registeredWrapAllowlisted: registeredWrap.allowlisted,
            containerContext: container.facts,
            scaleCompleteness: completeness.familyFacts,
        },
        violations,
    });

    console.log(
        "proof:tailwind-v4-idiom — modern v4 cohesion (no theme(), no registered-bare-var, container context, @theme scale completeness) — extends proof:design-idiom-localization (AV.W16)",
    );
    console.log(`  src files scanned    : ${srcEntries.length}`);
    console.log(`  sfc files scanned    : ${sfcEntries.length}`);
    console.log(`  (a) theme() hits     : ${themeFn.hits}`);
    console.log(`  (b) reg-wrap hits    : ${registeredWrap.hits} (allowlisted ${registeredWrap.allowlisted})`);
    console.log(`  (c) container ctx    : ${container.facts.map((f) => `${f.file.split("/").pop()}=${f.hasContext && f.hasVariant ? "ok" : "MISSING"}`).join(", ")}`);
    console.log(`  (d) scale families   : ${completeness.familyFacts.map((f) => f.dangling === undefined ? `${f.family}(${f.bridged}/${f.members} bridged, ${f.holdout} holdout, ${f.missing} missing)` : `${f.family}(${f.bridges} bridges, ${f.dangling} dangling)`).join(", ")}`);
    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${rel(ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
