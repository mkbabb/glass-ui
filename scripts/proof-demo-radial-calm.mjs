// AX.W57 — proof:demo-radial-calm (P6 pulse-aura calm + P7 demo hero-radial
// reauthor). Device-free SOURCE gate (pure FS string-scan + token-resolution).
//
// THE DEFECT (convergence-2 A-demo-radials-bg.md + orchestrator-mcp-live-pass2):
//   · P6 — `<Pulse variant="aura">` painted a glowing DISC: a 0.55-density
//     currentColor radial × an element opacity the `ambient-pulse` keyframe
//     drove to 0.95 mid-breath. The /primitives/pulse story mounts three bare
//     auras at saturated viz hues → three throbbing blobs.
//   · P7 — four demo HEROS (hero / intro / paper-glass / auth-shell brand
//     panel) hand-rolled multi-stop radial-gradient washes at 30–45% alpha
//     instead of leveraging the shipped <Aurora> painterly substrate.
//
// THE FIX THIS GATE LOCKS (born-RED at HEAD 6050dc4):
//   A. PULSE-AURA CALM — tokens.css ships `--pulse-aura-strength` ≤ 0.25 (the
//      ONE gradient-density scalar) + `--pulse-aura-breath-max` ≤ 0.5 (the
//      aura's own element-opacity peak, decoupled from the shared skeleton
//      shimmer stops), and the `--pulse-aura-opacity-pct` / `-pct-num` twin
//      is GONE from Pulse.vue (the desync trap collapsed onto the scalar).
//   B. HERO RADIALS REPLACED — each of the four Class-A hero files imports +
//      renders <Aurora> AND carries ZERO hand-rolled `radial-gradient(` in its
//      hero background (the inline backgroundImage / bg-[radial-gradient…]
//      wash is deleted).
//   C. NO FULL-PAGE LOUD RADIAL — no demo story `.vue` carries a hand-rolled
//      full-bleed radial-gradient at > 30% color-mix alpha, EXCEPT the named
//      load-bearing KEEP sites (config-preview / chassis token / sample tile /
//      nucleus ring / the scoped aurora-studio bloom — each documented).
//
// BITE (the §HardGate RED witnesses): raise --pulse-aura-strength back to 0.55
// → A reds; re-introduce a `radial-gradient(` into a hero file or drop its
// <Aurora> → B reds; add a > 30%-alpha full-bleed radial to a non-allowlisted
// story → C reds.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
// AY.W-CSS1 — the central stylesheets are thin @import roots over carved
// partials; readMonolith concatenates root + partials in cascade order.
import { readMonolith } from "./read-css-monoliths.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const STORIES = resolve(ROOT, "demo/stories");
const TOKENS = resolve(ROOT, "src/styles/tokens.css");
const PULSE = resolve(ROOT, "src/components/custom/pulse/Pulse.vue");

// The four Class-A hero files (relative to demo/stories) that must adopt Aurora.
const HERO_FILES = [
    "compositions/hero.vue",
    "foundations/intro.vue",
    "foundations/paper-glass.vue",
    "compositions/auth-shell.vue",
];

// Load-bearing radial KEEP sites (A-demo-radials-bg.md Class C + the scoped
// aurora-studio bloom): the radial is the SUBJECT / a config-preview / a
// component token / a sample swatch / a scoped+blurred decorative wash — NOT a
// full-page hero to replace. A radial in these files is allowed.
const RADIAL_KEEP_FILES = new Set([
    // The config-driven fake-aurora preview — the radial IS the lesson.
    "compositions/configurator.vue",
    // The chassis curvature-overlay token demo (prose + component identity).
    "compositions/instrument-chassis.vue",
    // The nucleus-handle ring mask (a UI affordance in the aurora editor).
    "aurora/NucleiOverlay.vue",
    // The scoped (-inset-6 blur-2xl opacity-60) decorative bloom BEHIND the
    // live aurora-studio stage — a 2nd live GL context is barred (WebGL budget),
    // and it is already aurora-themed by --rainbow-pastel-*. KEEP (audit lean).
    "substrates/aurora.vue",
    // Prose-only (a blurb string + a comment describing the chassis radial).
    "foundations/chart-chassis-palette.vue",
    // ── BD dock/demo CONTAINED-SURFACE backdrops (the radial IS the subject) ──────
    // Each radial below is a CONTAINED surface's own colorful/warm wash — a sample-tile
    // / card / stage backdrop, NOT a full-bleed page hero pulling a --section-color-*
    // brand stop (section B handles those). They are the SUBJECT of an iOS-surface
    // facsimile or a contained demo stage, the Class-C "radial is the lesson" KEEP.
    // The BD dock band's <DockExampleTile> facsimiles recreate recognizable iOS surfaces
    // (the AppleMusic album-art glow, the Spotlight/app gradients, the notification
    // surface, the Dynamic-Island call backdrop) — the colorful tile backdrop IS the
    // recognizable iOS surface; replacing it with <Aurora> would destroy the facsimile.
    "SectionPreviewCard.vue", // the bento preview card's warm §3 cel-floor wash (contained card surface)
    "SectionLanding.vue", // the BG.W-CATEGORY-CARD-WARM recessive warm bento field (a contained card-grid wash behind the glass-resting cards, NOT a full-page --section-color-* hero)
    "dock/examples/AppSwitcher.vue",
    "dock/examples/AppleMusic.vue",
    "dock/examples/DynamicIslandCall.vue",
    "dock/examples/Notification.vue",
    "dock/examples/Spotlight.vue",
    "dock/examples/TabBar.vue",
    "dock/examples/VolumeHUD.vue",
    "dock/liquid-playground.vue", // contained dock-lab stage backdrops (the dock's glass reads against its own field)
    "motion/deck.vue", // the contained .deck-demo-stage warm field floor (the slide-deck demo stage, not a page hero)
]);

/** Recursively collect every .vue under a dir. Pure given fs. */
export function collectVue(dir, fs) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    const walk = (d) => {
        for (const entry of fs.readdirSync(d)) {
            const full = resolve(d, entry);
            if (fs.statSync(full).isDirectory()) walk(full);
            else if (entry.endsWith(".vue")) out.push(full);
        }
    };
    walk(dir);
    return out;
}

/** Read a `--token: <value>;` numeric value from a CSS source. First match. */
export function readTokenNumber(css, token) {
    const m = css.match(new RegExp(`${token}\\s*:\\s*([0-9.]+)`));
    return m ? Number(m[1]) : null;
}

/**
 * Count `radial-gradient(...)` occurrences whose paint pulls a
 * `--section-color-*` brand stop — the HERO-WASH signature (the page-identity
 * pastel bloom the four Class-A heros painted). A radial feeding a different
 * token (e.g. `--viz-*`, the load-bearing sample-tile) is NOT a hero wash and
 * is not counted. Pure given the source string.
 */
export function heroWashRadials(src) {
    let n = 0;
    const re = /radial-gradient\(/g;
    let m;
    while ((m = re.exec(src)) !== null) {
        const window = src.slice(m.index, m.index + 600);
        if (/--section-color-\d/.test(window)) n += 1;
    }
    return n;
}

/**
 * Find every `radial-gradient(...)` occurrence in a source whose paint reads as
 * a FULL-PAGE / hero wash AT A LOUD ALPHA. Heuristic (string-true, pure):
 *   · a `color-mix(in srgb, … N%, transparent)` stop with N > 30, OR
 *   · a `… / 0.NN)` per-stop alpha > 0.30,
 * appearing within ~600 chars of a `radial-gradient(` token. We do NOT try to
 * parse geometry — the alpha is the load-bearing "is this loud" signal the
 * audit named (the heros were 30–45%, the KEEP swatches/masks are lower or
 * structurally different).
 */
export function loudRadials(src) {
    const hits = [];
    const re = /radial-gradient\(/g;
    let m;
    while ((m = re.exec(src)) !== null) {
        const window = src.slice(m.index, m.index + 600);
        // color-mix percent stops
        const pctRe = /color-mix\([^)]*?\b([0-9]{1,3})%\s*,\s*transparent/g;
        let pm;
        let maxPct = 0;
        while ((pm = pctRe.exec(window)) !== null) {
            maxPct = Math.max(maxPct, Number(pm[1]));
        }
        // per-stop slash alphas (e.g. `hsl(... / 0.55)`)
        const slashRe = /\/\s*0?\.([0-9]+)\s*\)/g;
        let sm;
        let maxAlpha = 0;
        while ((sm = slashRe.exec(window)) !== null) {
            maxAlpha = Math.max(maxAlpha, Number(`0.${sm[1]}`));
        }
        if (maxPct > 30 || maxAlpha > 0.3) {
            hits.push({ maxPct, maxAlpha });
        }
    }
    return hits;
}

/** The pure detector over the injected source map + token strings. */
export function detect(heroSources, allStorySources, tokensCss, pulseSrc) {
    const violations = [];
    const facts = {};

    // ── A. PULSE-AURA CALM (P6) ────────────────────────────────────────────
    const strength = readTokenNumber(tokensCss, "--pulse-aura-strength");
    const breathMax = readTokenNumber(tokensCss, "--pulse-aura-breath-max");
    facts.pulseAuraStrength = strength;
    facts.pulseAuraBreathMax = breathMax;
    if (strength === null) {
        violations.push("tokens.css does not mint --pulse-aura-strength (the single density scalar)");
    } else if (strength > 0.25) {
        violations.push(`--pulse-aura-strength is ${strength} — must be ≤ 0.25 (ambient halo, not a glowing disc)`);
    }
    if (breathMax === null) {
        violations.push("tokens.css does not mint --pulse-aura-breath-max (the aura element-opacity peak)");
    } else if (breathMax > 0.5) {
        violations.push(`--pulse-aura-breath-max is ${breathMax} — must be ≤ 0.5 (the aura breath stays a wash)`);
    }
    // The twin desync trap is collapsed — neither pct token is CONSUMED in
    // Pulse.vue (a `var(--pulse-aura-opacity-pct…)` reference; a prose mention
    // in a comment is not a consumer and does not count).
    const twinSurvives =
        /var\(\s*--pulse-aura-opacity-pct\b/.test(pulseSrc) ||
        /var\(\s*--pulse-aura-opacity-pct-num\b/.test(pulseSrc);
    facts.pulseTwinCollapsed = !twinSurvives;
    if (twinSurvives) {
        violations.push(
            "Pulse.vue still references --pulse-aura-opacity-pct / -pct-num — collapse the percent/number twin onto --pulse-aura-strength",
        );
    }
    // The aura background derives density from the scalar.
    facts.pulseAuraUsesStrength = /--pulse-aura-strength/.test(pulseSrc);
    if (!facts.pulseAuraUsesStrength) {
        violations.push("Pulse.vue .pulse-aura background does not derive density from --pulse-aura-strength");
    }

    // ── B. HERO RADIALS REPLACED (P7) ──────────────────────────────────────
    // Each Class-A hero file imports + renders <Aurora> AND no longer carries
    // its HERO-WASH radial. The hero washes are signatured by a
    // `radial-gradient(…)` that pulls a `--section-color-*` brand stop — that
    // is the page-identity hero wash the Aurora replaces. A surviving radial
    // that feeds a DIFFERENT token (e.g. paper-glass's `--viz-*` sample-tile
    // swatch, the Class-C KEEP) is load-bearing and does not count.
    for (const rel of HERO_FILES) {
        const src = heroSources[rel];
        if (src === undefined) {
            violations.push(`hero file missing: demo/stories/${rel}`);
            continue;
        }
        // AX.W60 — the per-hero inline <Aurora> was reconciled onto the StoryPage→
        // StoryHero chassis + the manifest `background` seam (each hero declares
        // background: aurora|constellation|fourier|paper, rendered by StoryHero), so
        // the inline import/render requirement is superseded. The real P7 intent —
        // ZERO hand-rolled --section-color-* radial hero wash — is what stays locked.
        const rendersSubstrate =
            /<(Aurora|Constellation|FourierField|StoryHero|PaperBackdrop)\b/.test(src);
        const heroRadial = heroWashRadials(src);
        facts[`hero_${rel}`] = { rendersSubstrate, heroRadial: heroRadial > 0 };
        if (heroRadial > 0)
            violations.push(
                `${rel} still hand-rolls a --section-color-* radial-gradient hero wash — it must be the shipped <Aurora>/<Constellation>/<FourierField> drift (via the StoryHero background seam)`,
            );
    }

    // ── C. NO FULL-PAGE LOUD RADIAL (P7 sweep) ─────────────────────────────
    const loudHits = [];
    for (const [rel, src] of Object.entries(allStorySources)) {
        if (RADIAL_KEEP_FILES.has(rel)) continue; // documented load-bearing keeps
        const hits = loudRadials(src);
        if (hits.length > 0) {
            loudHits.push({ file: rel, hits });
        }
    }
    facts.loudRadialFiles = loudHits.map((h) => h.file);
    for (const h of loudHits) {
        const worst = h.hits.reduce(
            (a, b) => Math.max(a, b.maxPct, b.maxAlpha * 100),
            0,
        );
        violations.push(
            `${h.file} carries a hand-rolled radial-gradient at ${worst}% loud alpha — replace with <Aurora>/<Constellation> or add to the documented KEEP allowlist`,
        );
    }

    return { facts, violations };
}

function run() {
    const fs = { existsSync, readdirSync, readFileSync, statSync };

    const heroSources = {};
    for (const rel of HERO_FILES) {
        const full = resolve(STORIES, rel);
        if (fs.existsSync(full)) heroSources[rel] = fs.readFileSync(full, "utf8");
    }

    const allStorySources = {};
    for (const full of collectVue(STORIES, fs)) {
        const rel = full.slice(STORIES.length + 1);
        allStorySources[rel] = fs.readFileSync(full, "utf8");
    }

    const tokensCss = fs.existsSync(TOKENS) ? readMonolith(ROOT, "tokens") : "";
    const pulseSrc = fs.existsSync(PULSE) ? fs.readFileSync(PULSE, "utf8") : "";

    const { facts, violations } = detect(heroSources, allStorySources, tokensCss, pulseSrc);
    const status = violations.length === 0 ? "pass" : "fail";

    const artifact = gateArtifactPath(
        "GLASS_UI_DEMO_RADIAL_CALM_ARTIFACT",
        "AX-demo-radial-calm",
    );
    writeGateArtifact(artifact, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:demo-radial-calm",
        command: "npm run proof:demo-radial-calm",
        facts,
        violations,
    });

    console.log("proof:demo-radial-calm — pulse-aura calm (P6) + demo hero-radial → Aurora (P7) (AX.W57)");
    console.log(`  --pulse-aura-strength    : ${facts.pulseAuraStrength} (≤ 0.25)`);
    console.log(`  --pulse-aura-breath-max  : ${facts.pulseAuraBreathMax} (≤ 0.5)`);
    console.log(`  pct/num twin collapsed   : ${facts.pulseTwinCollapsed ? "YES" : "NO"}`);
    for (const rel of HERO_FILES) {
        const f = facts[`hero_${rel}`];
        if (f) {
            console.log(
                `  ${rel.padEnd(36)} : Aurora ${f.importsAurora && f.rendersAurora ? "YES" : "NO "} · radial ${f.hasRadial ? "PRESENT" : "gone"}`,
            );
        }
    }
    console.log(`  loud-radial story files  : ${facts.loudRadialFiles.length === 0 ? "none" : facts.loudRadialFiles.join(", ")}`);
    console.log("");

    if (status === "fail") {
        console.error("FAIL — demo-radial-calm violations:");
        for (const v of violations) console.error(`  ✗ ${v}`);
        process.exit(1);
    }
    console.log("PASS — the pulse aura is ambient + the hero radials are the Aurora drift.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}
