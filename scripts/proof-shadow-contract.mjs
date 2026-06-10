#!/usr/bin/env node
// AV.W4.A — the shadow-cartoon override-contract LOCK (proof:shadow-contract).
//
// `--shadow-cartoon-{sm,md,lg}` ships canonical at HEAD as glass-ui's OWN
// identity tokens. The directive ("shadow-cartoon-lg is to ship") is satisfied
// library-side; this gate does NOT re-author the value — it LOCKS the chain so
// a consumer can retint the cartoon shadow by OVERRIDING the `:root` token and
// have every `.shadow-cartoon-*` utility + `cartoon-surface` site re-resolve,
// rather than re-declaring a dead local orphan that never paints (the
// f-w6-idiom anti-pattern: a deck's `--shadow-cartoon-lg: 7px 7px` local
// re-declaration that sits OFF the cascade path glass-ui's utilities read).
//
// The canonical chain (verified against HEAD; the spec's :563/:568 line refs
// are pre-W14 drift — the gate matches by TOKEN not line number):
//
//   tokens.css   declares the raw `--shadow-cartoon-lg` value
//                + the `--cartoon-shadow-lg: var(--shadow-cartoon-lg)` alias
//   theme.css    @theme bridges `--shadow-cartoon-lg: var(--cartoon-shadow-lg)`
//   utilities.css `.shadow-cartoon-lg { box-shadow: var(--shadow-cartoon-lg) }`
//   cards.css    `cartoon-surface` hover consumes `var(--shadow-cartoon-lg)`
//
// THREE asserts:
//   1. CHAIN-INTACT  — all four chain links exist (comment-stripped).
//   2. OVERRIDE-RESOLVES (the bite) — the `.shadow-cartoon-lg` utility AND the
//      `cartoon-surface` consumer read the token through `var(--shadow-cartoon-lg)`
//      (NOT a hardcoded box-shadow literal), so a `:root` override re-resolves
//      them. Hardcode the utility to a literal → RED.
//   3. DARK-ARM-ALLOWED — the `.dark` arm legitimately re-resolves the cartoon
//      shadow (its `--shadow-color` → `--foreground` flips under `.dark`, so the
//      `color-mix(... var(--shadow-color) ...)` cartoon-shadow tokens are
//      token-adaptive by construction). The gate ALLOWS the `.dark` block's
//      `--shadow-cartoon*` / `--shadow-color` / `--foreground` re-declarations —
//      they are token re-resolutions, NOT dead orphans, and must not false-RED.
//
// House style mirrors proof-dock-opacity-lockstep.mjs: ESM .mjs, comment-strip
// first (false-witness discipline), a pure exported detector, a byte-stable JSON
// artefact via gate-output, a human summary, process.exit(1) on any violation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        TOKENS_CSS: resolve(ROOT, "src/styles/tokens.css"),
        THEME_CSS: resolve(ROOT, "src/styles/theme.css"),
        UTILITIES_CSS: resolve(ROOT, "src/styles/utilities.css"),
        CARDS_CSS: resolve(ROOT, "src/styles/cards.css"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_SHADOW_CONTRACT_ARTIFACT",
            "AV-shadow-contract",
        ),
    };
    return _cliPaths;
}

function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}

function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Find the `{ … }` body of the first rule whose selector matches `selectorRe`.
// Brace-balanced so a nested `&:hover { … }` inside the utility body is captured.
function matchRuleBody(css, selectorRe) {
    const m = css.match(selectorRe);
    if (!m) return null;
    const open = css.indexOf("{", m.index);
    if (open === -1) return null;
    let depth = 0;
    for (let i = open; i < css.length; i++) {
        if (css[i] === "{") depth++;
        else if (css[i] === "}") {
            depth--;
            if (depth === 0) return css.slice(open + 1, i);
        }
    }
    return null;
}

/**
 * The pure detector. Takes the four comment-stripped CSS sources, returns
 * {facts, violations}. The three asserts run over the stripped text.
 */
export function detectShadowContract({ tokensCss, themeCss, utilitiesCss, cardsCss }) {
    const violations = [];
    const facts = {};

    // ── 1. CHAIN-INTACT ──────────────────────────────────────────────────
    // tokens.css declares the raw value + the alias.
    const tokensDeclaresRaw = /--shadow-cartoon-lg\s*:\s*-?\d/.test(tokensCss);
    const tokensDeclaresAlias =
        /--cartoon-shadow-lg\s*:\s*var\(\s*--shadow-cartoon-lg\s*\)/.test(tokensCss);
    facts.tokensDeclaresRaw = tokensDeclaresRaw;
    facts.tokensDeclaresAlias = tokensDeclaresAlias;
    if (!tokensDeclaresRaw)
        violations.push(
            "tokens.css does not declare the raw `--shadow-cartoon-lg` value (chain link 1 broken)",
        );
    if (!tokensDeclaresAlias)
        violations.push(
            "tokens.css does not declare the `--cartoon-shadow-lg: var(--shadow-cartoon-lg)` alias (chain link 1b broken)",
        );

    // theme.css @theme bridges the token off the alias.
    const themeBridges =
        /--shadow-cartoon-lg\s*:\s*var\(\s*--cartoon-shadow-lg\s*\)/.test(themeCss);
    facts.themeBridges = themeBridges;
    if (!themeBridges)
        violations.push(
            "theme.css @theme does not bridge `--shadow-cartoon-lg: var(--cartoon-shadow-lg)` (chain link 2 broken — the namespace bridge a Tailwind `shadow-cartoon-lg` utility resolves through)",
        );

    // ── 2. OVERRIDE-RESOLVES (the bite) ──────────────────────────────────
    // The `.shadow-cartoon-lg` utility must read `var(--shadow-cartoon-lg)`
    // (NOT a hardcoded literal) so a `:root` override re-resolves it.
    const utilBody = matchRuleBody(utilitiesCss, /\.shadow-cartoon-lg\s*\{/);
    facts.utilityFound = utilBody !== null;
    if (utilBody === null) {
        violations.push(
            "utilities.css: the `.shadow-cartoon-lg` utility rule is missing (chain link 3 broken)",
        );
    } else {
        const boxShadow = utilBody.match(/box-shadow\s*:\s*([^;]+);/);
        const value = boxShadow ? boxShadow[1].replace(/\s+/g, " ").trim() : null;
        facts.utilityBoxShadow = value;
        if (!value) {
            violations.push("the `.shadow-cartoon-lg` utility declares no `box-shadow`");
        } else if (!/var\(\s*--shadow-cartoon-lg\s*\)/.test(value)) {
            violations.push(
                "the `.shadow-cartoon-lg` utility must read `var(--shadow-cartoon-lg)` " +
                    "(NOT a hardcoded literal — a `:root` override would not re-resolve a literal): " +
                    value,
            );
        }
    }

    // The `cartoon-surface` consumer (hover) must read `var(--shadow-cartoon-lg)`.
    const cartoonBody = matchRuleBody(cardsCss, /@utility\s+cartoon-surface\s*\{/);
    facts.cartoonSurfaceFound = cartoonBody !== null;
    if (cartoonBody === null) {
        violations.push(
            "cards.css: the `@utility cartoon-surface` rule is missing (chain link 4 broken)",
        );
    } else {
        const consumesLg = /var\(\s*--shadow-cartoon-lg\s*\)/.test(cartoonBody);
        facts.cartoonConsumesLg = consumesLg;
        if (!consumesLg) {
            violations.push(
                "cards.css `cartoon-surface` must consume `var(--shadow-cartoon-lg)` on hover (chain link 4 broken — the consumer reads a literal, so a `:root` override would not re-tint the hover-lift)",
            );
        }
    }

    // ── 3. DARK-ARM-ALLOWED ──────────────────────────────────────────────
    // The `.dark` arm re-resolution is a LEGITIMATE token re-declaration, NOT a
    // dead orphan. The cartoon-shadow tokens read `color-mix(... var(--shadow-color))`
    // and `--shadow-color → --foreground` flips under `.dark` — so the cartoon
    // shadow is token-adaptive by construction. We ASSERT the adaptive seam is
    // present (the `--shadow-color` indirection) so the gate documents WHY the
    // dark arm is allowlisted, rather than blindly waving it through.
    const shadowColorIndirection =
        /--shadow-color\s*:\s*var\(\s*--foreground\s*\)/.test(tokensCss);
    const lgRidesShadowColor =
        /--shadow-cartoon-lg\s*:[\s\S]*?var\(\s*--shadow-color\s*\)/.test(tokensCss);
    facts.shadowColorIndirection = shadowColorIndirection;
    facts.lgRidesShadowColor = lgRidesShadowColor;
    if (!shadowColorIndirection) {
        violations.push(
            "the dark-arm adaptivity seam is broken: `--shadow-color: var(--foreground)` is missing — the cartoon shadow can no longer flip under `.dark` by construction",
        );
    }
    if (!lgRidesShadowColor) {
        violations.push(
            "the `--shadow-cartoon-lg` value no longer rides `var(--shadow-color)` — it would need a hardcoded `.dark` re-declaration to stay adaptive (the light literal would leak into dark)",
        );
    }

    facts.chainIntact =
        tokensDeclaresRaw &&
        tokensDeclaresAlias &&
        themeBridges &&
        facts.utilityFound &&
        facts.cartoonSurfaceFound;
    facts.overrideResolves =
        /var\(\s*--shadow-cartoon-lg\s*\)/.test(facts.utilityBoxShadow ?? "") &&
        facts.cartoonConsumesLg === true;

    return { facts, violations };
}

export function detectSource(sources) {
    return detectShadowContract({
        tokensCss: stripBlockComments(sources.tokensCss ?? ""),
        themeCss: stripBlockComments(sources.themeCss ?? ""),
        utilitiesCss: stripBlockComments(sources.utilitiesCss ?? ""),
        cardsCss: stripBlockComments(sources.cardsCss ?? ""),
    });
}

function run() {
    const { ROOT, THEME_CSS, CARDS_CSS, ARTIFACT } = cliPaths();
    // AY.W-CSS1 — tokens.css/utilities.css became thin @import roots over carved
    // partials; readMonolith concatenates root + partials in cascade order so the
    // cartoon-shadow chain scan resolves post-carve (read-dock-css.mjs precedent).
    const { facts, violations } = detectSource({
        tokensCss: readMonolith(ROOT, "tokens"),
        themeCss: readFileSync(THEME_CSS, "utf8"),
        utilitiesCss: readMonolith(ROOT, "utilities"),
        cardsCss: readFileSync(CARDS_CSS, "utf8"),
    });
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "contract",
        command: "npm run proof:shadow-contract",
        facts,
        violations,
    });

    console.log(
        "proof:shadow-contract — the --shadow-cartoon-lg override-contract lock (AV.W4)",
    );
    console.log(`  chain intact (4 links)    : ${facts.chainIntact ? "YES" : "NO"}`);
    console.log(`  utility box-shadow        : ${facts.utilityBoxShadow ?? "(missing)"}`);
    console.log(
        `  cartoon-surface reads lg  : ${facts.cartoonConsumesLg ? "YES" : "NO"}`,
    );
    console.log(
        `  override-resolves (bite)  : ${facts.overrideResolves ? "YES" : "NO"}`,
    );
    console.log(
        `  dark-arm adaptive seam    : ${
            facts.shadowColorIndirection && facts.lgRidesShadowColor ? "YES" : "NO"
        }`,
    );
    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
