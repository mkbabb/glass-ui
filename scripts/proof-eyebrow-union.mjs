#!/usr/bin/env node
// BB.W-EYEBROW-UNION — the ONE mono-caption EYEBROW register gate
// (proof:eyebrow-union).
//
// The born-RED→GREEN device-free SOURCE arm for the eyebrow-vocabulary union. The
// library spoke FOUR dialects of one word — `.section-label` (the canon-by-usage:
// mono · caption · muted · uppercase · tracking-CAPS), `@utility text-mono-caption`
// (the DRIFTED sibling: tracking-WIDER + weight-500 + NO color), `.glass-menu-
// section-label` (re-declared through `--menu-section-*` knobs), and `text-admin-
// label` double-stacked alongside `.section-label` in three demo sites. This wave
// unions them: `text-mono-caption` is the ONE color-agnostic vocabulary (mono ·
// caption · uppercase · tracking-CAPS), `.section-label` COMPOSES it (`@apply
// text-mono-caption` + the muted ink), the menu caption reads the `--menu-section-*`
// knobs that DEFAULT to the SAME tokens (the sanctioned override layer), and the
// three double-stacks collapse to ONE class. `text-admin-label` STAYS a distinct
// fixed-size (0.625rem) sub-control micro register — NOT an eyebrow duplicate, NOT
// folded.
//
// Four falsifiable witnesses (each born-RED at HEAD pre-wave, GREEN at close), plus
// the binding π readback (W-EYEBROW-UNION-DELTA — the four enrolled surfaces resolve
// byte-equal font/size/tracking/transform over a real backdrop, both modes):
//
//   W1 — THE VOCABULARY IS DECLARED ONCE + THE DRIFT IS RECONCILED.
//        `@utility text-mono-caption` carries the eyebrow vocabulary
//        (font-mono · type-caption · uppercase · tracking-CAPS) and `.section-label`
//        COMPOSES it via `@apply text-mono-caption`. NEGATIVE (anti-evasion): the
//        eyebrow tracking is ONE value — NO `--type-tracking-wider` on a mono-caption
//        eyebrow register — and `.section-label` no longer re-declares the
//        font-family/font-size/text-transform/letter-spacing block (it composes).
//        RED at HEAD: text-mono-caption declares tracking-WIDER + weight-500;
//        .section-label re-declares the full block independently.
//   W2 — text-mono-caption NO LONGER CARRIES THE DRIFT.
//        The `@utility text-mono-caption` rule does NOT declare
//        `letter-spacing: var(--type-tracking-wider)` nor `font-weight: 500` — it
//        reads `--type-tracking-caps` and stays color-agnostic. RED at HEAD:
//        utilities.css carries the wider tracking + the 500 weight on text-mono-caption.
//   W3 — THE MENU CAPTION FOLDS ONTO THE CANON TOKENS (override layer intact).
//        The `--menu-section-*` knobs DEFAULT to the canon tokens
//        (`--font-mono` / `--type-caption` / `--muted-foreground` /
//        `--type-tracking-caps`) so the un-overridden `.glass-menu-section-label`
//        resolves byte-equal to the canon, AND menu.css still references
//        `--font-mono` + `--type-caption` + `--border-hairline` + `--menu-section-*`
//        (the proof:menu-glass W2 assert surface stays present). RED at HEAD:
//        (held green by construction — the knobs already default to canon; this
//        clause GUARDS a future drift of the knob defaults off the canon).
//   W4 — THE text-admin-label / section-label DOUBLE-STACK IS COLLAPSED.
//        No demo site carries `text-admin-label` AND `section-label` on the same
//        `class` attr (the two-conflicting-sizes anti-pattern). RED at HEAD:
//        hero.vue / auth-shell.vue / math-paper.vue stack both.
//
// House style mirrors proof-menu-glass.mjs / proof-suffuse.mjs: ESM .mjs,
// comment-strip first (false-witness discipline), a pure exported detector, a
// byte-stable JSON artefact via gate-output, a human summary, process.exit(1) on
// any violation.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip /* *​/ block comments so a witness never matches commented prose. */
function stripBlockComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

/** Recursively gather *.vue files under a dir. */
function gatherVue(dir, out = []) {
    let entries;
    try {
        entries = readdirSync(dir);
    } catch {
        return out;
    }
    for (const e of entries) {
        const abs = resolve(dir, e);
        let st;
        try {
            st = statSync(abs);
        } catch {
            continue;
        }
        if (st.isDirectory()) {
            if (e === "node_modules" || e === ".cache" || e === "dist") continue;
            gatherVue(abs, out);
        } else if (e.endsWith(".vue")) {
            out.push(abs);
        }
    }
    return out;
}

/**
 * Pure detector — given the source strings, return { facts, violations }.
 */
export function detectEyebrowUnion(sources) {
    const { utilitiesCss, menuCss, demoVue } = sources;
    const facts = {};
    const violations = [];

    const util = stripBlockComments(utilitiesCss);
    const menu = stripBlockComments(menuCss);

    // ── W1 — the vocabulary is declared ONCE + .section-label composes it ──────
    // The @utility text-mono-caption block (the canonical vocabulary).
    const monoCaptionBlock =
        util.match(/@utility\s+text-mono-caption\s*\{[^}]*\}/)?.[0] ?? "";
    const sectionLabelBlock =
        util.match(/\.section-label\s*\{[^}]*\}/)?.[0] ?? "";

    facts.w1 = {};
    facts.w1.monoCaptionHasVocab =
        /font-family:\s*var\(--font-mono\)/.test(monoCaptionBlock) &&
        /font-size:\s*var\(--type-caption\)/.test(monoCaptionBlock) &&
        /text-transform:\s*uppercase/.test(monoCaptionBlock) &&
        /letter-spacing:\s*var\(--type-tracking-caps\)/.test(monoCaptionBlock);
    facts.w1.sectionComposes = /@apply\s+text-mono-caption/.test(
        sectionLabelBlock,
    );
    // .section-label must NOT re-declare the full block (it composes).
    facts.w1.sectionReDeclares =
        /font-family:\s*var\(--font-mono\)/.test(sectionLabelBlock) &&
        /font-size:\s*var\(--type-caption\)/.test(sectionLabelBlock) &&
        /letter-spacing:/.test(sectionLabelBlock);

    if (!facts.w1.monoCaptionHasVocab) {
        violations.push(
            "W1: @utility text-mono-caption must carry the eyebrow vocabulary (font-mono + type-caption + uppercase + tracking-CAPS) as the ONE declaration",
        );
    }
    if (!facts.w1.sectionComposes) {
        violations.push(
            "W1: .section-label must COMPOSE the vocabulary via `@apply text-mono-caption` (not re-declare it)",
        );
    }
    if (facts.w1.sectionReDeclares) {
        violations.push(
            "W1: .section-label still re-declares the font-mono/type-caption/letter-spacing block independently — fold onto `@apply text-mono-caption`",
        );
    }

    // ── W2 — text-mono-caption no longer carries the drift ─────────────────────
    facts.w2 = {};
    facts.w2.noWiderTracking =
        !/letter-spacing:\s*var\(--type-tracking-wider\)/.test(monoCaptionBlock);
    facts.w2.noWeight500 = !/font-weight:\s*500/.test(monoCaptionBlock);
    facts.w2.readsCapsTracking = /letter-spacing:\s*var\(--type-tracking-caps\)/.test(
        monoCaptionBlock,
    );
    if (!facts.w2.noWiderTracking) {
        violations.push(
            "W2: text-mono-caption still declares `--type-tracking-wider` (the drift) — reconcile to `--type-tracking-caps`",
        );
    }
    if (!facts.w2.noWeight500) {
        violations.push(
            "W2: text-mono-caption still declares `font-weight: 500` (the drift) — drop it (a per-use choice via inline font-medium)",
        );
    }
    if (!facts.w2.readsCapsTracking) {
        violations.push(
            "W2: text-mono-caption must read `--type-tracking-caps` (the canon tracking)",
        );
    }

    // ── W3 — the menu caption knobs default to the canon tokens ────────────────
    facts.w3 = {};
    facts.w3.knobFontDefaultsCanon = /--menu-section-font:\s*var\(--font-mono\)/.test(
        menu,
    );
    facts.w3.knobSizeDefaultsCanon = /--menu-section-size:\s*var\(--type-caption\)/.test(
        menu,
    );
    facts.w3.knobColorDefaultsCanon =
        /--menu-section-color:\s*var\(--muted-foreground\)/.test(menu);
    facts.w3.knobTrackingDefaultsCanon =
        /--menu-section-tracking:\s*var\(--type-tracking-caps\)/.test(menu);
    // proof:menu-glass W2 surface: the four tokens must stay referenced in menu.css
    facts.w3.menuGlassW2Surface =
        /--font-mono/.test(menu) &&
        /--type-caption/.test(menu) &&
        /--border-hairline/.test(menu) &&
        /--menu-section-/.test(menu);
    if (
        !(
            facts.w3.knobFontDefaultsCanon &&
            facts.w3.knobSizeDefaultsCanon &&
            facts.w3.knobColorDefaultsCanon &&
            facts.w3.knobTrackingDefaultsCanon
        )
    ) {
        violations.push(
            "W3: the --menu-section-* knobs must DEFAULT to the canon tokens (font-mono/type-caption/muted-foreground/type-tracking-caps) so the un-overridden menu caption resolves byte-equal to the canon",
        );
    }
    if (!facts.w3.menuGlassW2Surface) {
        violations.push(
            "W3: menu.css must still reference --font-mono + --type-caption + --border-hairline + --menu-section-* (the proof:menu-glass W2 assert surface)",
        );
    }

    // ── W4 — the text-admin-label / section-label double-stack is collapsed ────
    facts.w4 = {};
    const doubleStacks = [];
    for (const { path, raw } of demoVue) {
        // any class attr carrying BOTH the BARE `text-admin-label` and the BARE
        // `section-label` token (the conflicting caption-vs-micro size stack). The
        // `section-label--tinted` accent MODIFIER (color-only, no size) is NOT the
        // bare base — a `section-label--tinted text-admin-label` micro-tinted
        // eyebrow carries no size conflict, so tokens are matched EXACTLY (split
        // on whitespace), never by substring (`section-label--tinted` ≠
        // `section-label`).
        const classAttrs = raw.match(/class="[^"]*"/g) ?? [];
        for (const c of classAttrs) {
            const tokens = new Set(
                c
                    .replace(/^class="/, "")
                    .replace(/"$/, "")
                    .split(/\s+/),
            );
            if (tokens.has("text-admin-label") && tokens.has("section-label")) {
                doubleStacks.push(path.slice(ROOT.length + 1));
            }
        }
    }
    facts.w4.doubleStacks = doubleStacks;
    facts.w4.collapsed = doubleStacks.length === 0;
    if (!facts.w4.collapsed) {
        violations.push(
            `W4: ${doubleStacks.length} demo site(s) still stack text-admin-label AND section-label on one class attr (${[
                ...new Set(doubleStacks),
            ].join(", ")}) — collapse to ONE class`,
        );
    }

    return { facts, violations };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_EYEBROW_UNION_ARTIFACT",
        "BB-eyebrow-union",
    );
    const utilitiesCss = safeRead(
        resolve(ROOT, "src/styles/typography/utilities.css"),
    );
    const menuCss = safeRead(resolve(ROOT, "src/styles/menu.css"));
    const demoVue = gatherVue(resolve(ROOT, "demo")).map((p) => ({
        path: p,
        raw: safeRead(p),
    }));

    const { facts, violations } = detectEyebrowUnion({
        utilitiesCss,
        menuCss,
        demoVue,
    });

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:eyebrow-union",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:eyebrow-union — the ONE mono-caption EYEBROW register (BB.W-EYEBROW-UNION)",
    );
    console.log(
        `  W1 vocab declared once+compose: ${yn(
            facts.w1.monoCaptionHasVocab &&
                facts.w1.sectionComposes &&
                !facts.w1.sectionReDeclares,
        )}`,
    );
    console.log(
        `  W2 text-mono-caption no drift : ${yn(
            facts.w2.noWiderTracking &&
                facts.w2.noWeight500 &&
                facts.w2.readsCapsTracking,
        )}`,
    );
    console.log(
        `  W3 menu knobs default to canon: ${yn(
            facts.w3.knobFontDefaultsCanon &&
                facts.w3.knobSizeDefaultsCanon &&
                facts.w3.knobColorDefaultsCanon &&
                facts.w3.knobTrackingDefaultsCanon &&
                facts.w3.menuGlassW2Surface,
        )}`,
    );
    console.log(
        `  W4 double-stack collapsed     : ${yn(facts.w4.collapsed)}  (${facts
            .w4.doubleStacks.length} remaining)`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(
            ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
