// proof:suffuse2 — BA.W-SUFFUSE2: the per-category color identity spread within
// proportion. Born-RED, device-free SOURCE arm.
//
// AZ.W-SUFFUSE enrolled the HIGH-LEVERAGE pop subset (the motion category onto
// --motion-accent, the settings eyebrows, the metric glyphs) and explicitly NAMED
// the library-wide breadth to a successor (the ramp painted in TWO places, ~60/90
// stories carried ZERO color events, the content-page title did not dominate). THIS
// wave is that successor's under-spent half: each enrolled CATEGORY now reads its
// ONE --section-color-N identity on the math-paper gold-standard THREE register
// sites (the tinted eyebrow + the accent rail + the focal <IconChip>), the
// content-page <h1> lifts one √φ rung above the section register, and the motion
// band reads ONE coherent generous violet with no warm-red survivor.
//
// THIS DEVICE-FREE SOURCE ARM proves the STRUCTURE; the π arm
// (tests-visual/suffuse2.spec.ts) proves the RENDER (the per-category eyebrow+rail+
// chip resolving to the SAME stop in BOTH modes, the content <h1> font-size above
// the section <h2>, the motion band ONE violet, no rainbow). The implementer must
// NOT treat a green source arm as done — the π readback is the binding close (the
// AZ/P-1 source-green/visually-broken gap).
//
// This arm asserts:
//   W1 — each enrolled category carries its MAPPED --section-color-N on the THREE
//        register sites (a per-page --section-label-accent eyebrow override + a
//        border-l-[3px] rail reading the same stop + at least one
//        <IconChip :section="N"> focal pop), all on the SAME stop. The per-category
//        map is recorded as gate FACTS so a future agent cannot smuggle a fourth hue
//        onto an enrolled page. + the W-ICON-CHIP W4 floor: NO inline template-literal
//        color-mix(in srgb, var(--section-color-${…}) paste survives outside icon-chip/.
//   W2 — the StoryPage content chrome <h1> (the variant==='page' arm) resolves to
//        text-title (the next √φ rung above the section <h2> text-subheading), the
//        W-STAGE-applied literal diff. The assert names the POSITIVE rung step.
//   W3 — every /motion/*.vue page references --motion-accent AND no --viz-fourier/
//        --demo-hue warm-red survives on a motion-page paint channel; the
//        motion-violet stays demo-local (no --motion-accent literal reaches src/styles/).

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:suffuse2";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

const listFiles = (relDir, ext) => {
    const out = [];
    const base = resolve(ROOT, relDir);
    if (!existsSync(base)) return out;
    const walk = (dir) => {
        for (const name of readdirSync(dir)) {
            const p = resolve(dir, name);
            if (statSync(p).isDirectory()) walk(p);
            else if (name.endsWith(ext)) out.push(p.slice(ROOT.length + 1));
        }
    };
    walk(base);
    return out;
};

// Comment-blind: strip HTML/Vue/JS/CSS comments so a prose mention never false-hits.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ═══════════════════════════════════════════════════════════════════════════
// The per-category identity MAP (recorded as gate FACTS — the binding assignment).
// Each enrolled category gets ONE --section-color-N stop, routed through THREE
// register sites: the eyebrow (--section-label-accent), the rail (border-l-[3px]),
// and the focal <IconChip :section="N">. A future agent cannot smuggle a fourth hue
// onto an enrolled page — the gate asserts each page reads its category's MAPPED stop.
// ═══════════════════════════════════════════════════════════════════════════
const CATEGORY_MAP = [
    {
        category: "forms",
        stop: 3, // teal-class (the cool stop)
        pages: [
            "demo/stories/forms/checks.vue",
            "demo/stories/forms/inputs.vue",
            "demo/stories/forms/select.vue",
            "demo/stories/forms/textarea.vue",
            "demo/stories/forms/label.vue",
            "demo/stories/forms/slider.vue",
            "demo/stories/forms/toggle.vue",
            "demo/stories/forms/toggle-chip.vue",
            "demo/stories/forms/number-field.vue",
            "demo/stories/forms/combobox.vue",
            "demo/stories/forms/multi-select.vue",
        ],
    },
    {
        category: "containers",
        stop: 2, // blue (a stable cool stop, distinct from forms teal)
        pages: [
            "demo/stories/containers/accordion.vue",
            "demo/stories/containers/collapsible.vue",
            "demo/stories/containers/command.vue",
            "demo/stories/containers/context-menu.vue",
            "demo/stories/containers/dialog.vue",
            "demo/stories/containers/drawer.vue",
            "demo/stories/containers/dropdown-menu.vue",
            "demo/stories/containers/expandable-container.vue",
            "demo/stories/containers/hover-card.vue",
            "demo/stories/containers/hover-popover.vue",
            "demo/stories/containers/popover.vue",
            "demo/stories/containers/sheet.vue",
            "demo/stories/containers/tooltip.vue",
        ],
    },
    {
        category: "data",
        stop: 9, // ledger-slate
        pages: ["demo/stories/data/table.vue", "demo/stories/data/data-table.vue"],
    },
    {
        category: "display",
        stop: 5, // amber (the loud-pill badge teaching register)
        pages: ["demo/stories/display/badge.vue"],
    },
    {
        category: "navigation",
        stop: 12, // indigo
        pages: [
            "demo/stories/navigation/tabs.vue",
            "demo/stories/navigation/header-ribbon.vue",
            "demo/stories/navigation/carousel.vue",
        ],
    },
    {
        // BB.W-SUFFUSE3 (a) — the feedback band's ONE coherent --section-color-8
        // ruby (warm-status) identity, distinct from data-9 / navigation-12; the
        // warm-status read for a status/notification band. The three-site register
        // (tinted eyebrow + border-l-[3px] rail + <IconChip :section>) on the
        // FEEDBACK_STOP=8 const, the same gold standard as every other category.
        category: "feedback",
        stop: 8, // ruby (warm-status)
        pages: [
            "demo/stories/feedback/alert.vue",
            "demo/stories/feedback/toast.vue",
            "demo/stories/feedback/notification.vue",
            "demo/stories/feedback/progress.vue",
            "demo/stories/feedback/skeleton.vue",
            "demo/stories/feedback/confirm-dialog.vue",
        ],
    },
];

// ── W1 — each enrolled category carries its MAPPED stop on the THREE sites ────
// For EACH page in EACH category, assert (a) a per-page --section-label-accent
// keyed to the MAPPED --section-color-N, (b) a border-l-[3px] rail, and (c) a
// <IconChip :section="N"> on the SAME stop. A page tinting the eyebrow but not the
// rail, or using a different stop per site, FAILS — the identity must be COHERENT.
const w1Breaches = [];
for (const { category, stop, pages } of CATEGORY_MAP) {
    for (const rel of pages) {
        const src = strip(read(rel));
        if (!src) {
            w1Breaches.push(`${rel}: file empty/missing`);
            continue;
        }
        // (a) the eyebrow override keyed to the MAPPED stop. The stories drive it
        //     off a per-file `<CAT>_STOP = N` const through a template literal
        //     (`--section-color-${FORMS_STOP}`), so accept either the literal stop
        //     OR a const that resolves to the MAPPED stop in the same file.
        const constResolvesToStop = new RegExp(
            `(?:STOP|_STOP)\\s*=\\s*${stop}\\b`,
        ).test(src);
        const accentLiteral = new RegExp(
            `--section-label-accent['"\\s]*:[^;,}"]*--section-color-${stop}\\b`,
        ).test(src);
        const accentViaConst =
            /--section-label-accent['"\s]*:[^;,}"]*--section-color-\$\{[A-Z_]+\}/.test(
                src,
            ) && constResolvesToStop;
        const hasAccent = accentLiteral || accentViaConst;
        // (b) the border-l-[3px] section-accent rail.
        const hasRail = /border-l-\[3px\]/.test(src);
        // (c) the focal IconChip on the MAPPED stop (numeric prop OR a const that
        //     resolves to the stop — accept :section="N" or :section="CONST").
        const chipNumericRe = new RegExp(
            `<IconChip[^>]*:section=["'](?:${stop}|[A-Z_]+)["']`,
        );
        const hasChip =
            chipNumericRe.test(src) &&
            // the const, if used, must be the MAPPED stop (the FORMS_STOP=3 etc.
            // decl in the same file).
            (new RegExp(`<IconChip[^>]*:section=["']${stop}["']`).test(src) ||
                new RegExp(`(?:STOP|_STOP)\\s*=\\s*${stop}\\b`).test(src));
        // The eyebrow must compose .section-label--tinted (the coherent register).
        const hasTintedEyebrow = /section-label--tinted/.test(src);
        if (!hasAccent || !hasRail || !hasChip || !hasTintedEyebrow) {
            w1Breaches.push(
                `${rel} [${category}/stop-${stop}]: accent:${hasAccent} rail:${hasRail} chip:${hasChip} tinted-eyebrow:${hasTintedEyebrow}`,
            );
        }
    }
}
add(
    "w1-per-category-three-site-identity",
    w1Breaches.length === 0,
    w1Breaches.length === 0
        ? `each enrolled category (forms→3, containers→2, data→9, display→5, navigation→12, feedback→8) carries its ONE --section-color-N on the THREE register sites (tinted eyebrow + border-l-[3px] rail + <IconChip :section> focal pop) on the SAME stop across ${CATEGORY_MAP.reduce((n, c) => n + c.pages.length, 0)} pages — the math-paper gold standard, the per-category MAP recorded as gate facts`
        : `${w1Breaches.length} per-category identity breach(es): ${w1Breaches.slice(0, 8).join("; ")}`,
);

// W1 anti-evasion — NO inline template-literal color-mix paste survives outside
// icon-chip/ (the W-ICON-CHIP W4 complete-consolidation floor).
const PASTE_RE = /color-mix\(in srgb, var\(--section-color-\$\{/;
const pasteHits = [];
for (const rel of listFiles("demo", ".vue")) {
    if (rel.includes("icon-chip")) continue;
    if (PASTE_RE.test(read(rel))) pasteHits.push(rel);
}
for (const rel of listFiles("src/components/custom", ".vue")) {
    if (rel.includes("icon-chip")) continue;
    if (PASTE_RE.test(read(rel))) pasteHits.push(rel);
}
add(
    "w1-no-inline-chip-paste",
    pasteHits.length === 0,
    pasteHits.length === 0
        ? `NO inline color-mix(in srgb, var(--section-color-${"${…}"}) chip-backplate template-literal paste survives outside icon-chip/ — the focal pop is the <IconChip> primitive, never a re-paste (the W-ICON-CHIP W4 floor holds)`
        : `${pasteHits.length} inline chip-paste re-introduction(s): ${pasteHits.join("; ")}`,
);

// ── W2 — the content-page chrome <h1> is one √φ rung above the section register ─
// The StoryPage chrome <h1> (the content-page arm) resolves to text-title
// (32.9px) — strictly ABOVE the section <h2> text-subheading (20.4px). The assert
// names the POSITIVE rung (text-title/text-display-1), NOT merely ≠ text-heading
// (a regress to text-subheading is also ≠ text-heading but moves the WRONG way).
// BB.W-HIERARCHY2 restructured the chrome header into the ordered eyebrow→title→blurb
// cluster: the `variant === 'page'` guard moved from the <h1>'s compound condition
// onto the wrapping `<header v-if="variant === 'page'">`, leaving the <h1 v-if="title">
// at text-title INSIDE that page-only header. The assert verifies BOTH facts with
// equal rigor — the content-page header is gated to variant==='page' AND its <h1> is
// at the one-rung-above grade (a regress to a lower rung still reds).
const storyPage = strip(read("demo/stories/StoryPage.vue"));
const contentHeaderOk = /<header\b[^>]*v-if="variant === 'page'"/.test(storyPage);
const h1RungOk =
    contentHeaderOk &&
    /<h1\b[^>]*v-if="title"[^>]*class="[^"]*\btext-(title|display-1)\b/.test(
        storyPage,
    );
add(
    "w2-content-h1-one-rung-above-section",
    h1RungOk,
    h1RungOk
        ? "the StoryPage content chrome <h1> (variant==='page') resolves to text-title (32.9px, φ^(3/2)) — the next √φ rung ABOVE the section <h2> text-subheading (20.4px); the display ladder GRADES instead of cliffing (the W-STAGE-applied literal diff, HS-2)"
        : "the StoryPage content <h1> is NOT at text-title/text-display-1 (the one-rung-above-section grade did not land — W-STAGE's literal-diff block missing or the rung regressed)",
);

// ── W3 — the motion band reads ONE coherent violet, no warm-red survivor ──────
const motionPages = listFiles("demo/stories/motion", ".vue");
const motionMissingAccent = motionPages.filter(
    (rel) => !/--motion-accent/.test(strip(read(rel))),
);
add(
    "w3-motion-band-reads-accent",
    motionMissingAccent.length === 0,
    motionMissingAccent.length === 0
        ? `every /motion/*.vue page references --motion-accent (the demo-local violet) across ${motionPages.length} pages — the band reads ONE coherent generous violet`
        : `${motionMissingAccent.length} motion page(s) carry NO --motion-accent: ${motionMissingAccent.join("; ")}`,
);

// The negative predicate — no --viz-fourier/--demo-hue warm-red on a motion-page
// paint channel (color/background/fill/stroke or the Tailwind arbitrary forms +
// the near-black primary plot ink), the channel-swap-evasion guard.
const RED_CHANNEL_RE =
    /(?:color:|background(?:-color)?:|fill:|stroke:|backgroundColor)\s*[^;"}]*var\(--viz-fourier\)|(?:text|bg|fill|stroke)-\[var\(--viz-fourier\)\]|var\(--demo-hue|stroke-\[var\(--primary\)\]|fill-\[var\(--primary\)\]/;
const motionRedHits = motionPages.filter((rel) =>
    RED_CHANNEL_RE.test(strip(read(rel))),
);
add(
    "w3-no-warm-red-on-motion",
    motionRedHits.length === 0,
    motionRedHits.length === 0
        ? `NO --viz-fourier/--demo-hue/stroke-[--primary] warm-red survives on a motion-page paint channel (color/background/fill/stroke + the Tailwind arbitrary forms) across ${motionPages.length} pages — the channel-swap-evasion guard`
        : `${motionRedHits.length} motion page(s) still spend warm-red: ${motionRedHits.join("; ")}`,
);

// The motion-violet stays DEMO-LOCAL — no --motion-accent literal reaches src/styles/
// (the ppmycota HARD fence, BA scope fence).
const libStyleFiles = listFiles("src/styles", ".css");
const motionAccentInLib = libStyleFiles.filter((rel) =>
    /--motion-accent\s*:/.test(read(rel)),
);
add(
    "w3-motion-violet-demo-local",
    motionAccentInLib.length === 0,
    motionAccentInLib.length === 0
        ? "no --motion-accent value is DECLARED in any library file (src/styles/) — the motion-violet rides the demo-local --viz-legendre twin at demo/demo.css, the ppmycota HARD fence"
        : `--motion-accent leaked into ${motionAccentInLib.length} library file(s): ${motionAccentInLib.join("; ")}`,
);

// ── (z) the π readback spec is wired (the BINDING close) ──────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/suffuse2.spec.ts")),
    "tests-visual/suffuse2.spec.ts exists (the π getComputedStyle readback: the per-category eyebrow+rail+chip stop identity in BOTH modes, the content <h1> font-size above the section <h2>, the motion band ONE violet, the ≤1-event-family d3 — the BINDING close)",
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
console.log(
    "proof:suffuse2 — the per-category color identity spread within proportion (BA.W-SUFFUSE2)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_SUFFUSE2_OUT", "BA-suffuse2");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:suffuse2",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the RESOLVED per-category eyebrow+rail+chip stop identity (both modes), the content <h1> rung grade, and the motion band ONE-violet are proven by tests-visual/suffuse2.spec.ts (the π getComputedStyle readback — the binding close) + the proof:ba-gestalt verdict, never this gate alone.",
    categoryMap: CATEGORY_MAP,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:suffuse2] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:suffuse2] the color identity reads on EVERY enrolled category (icons=rose, forms=teal, containers=blue, data=slate, display=amber, navigation=indigo, feedback=ruby, motion=violet) — each its ONE event on the three register sites, the content title dominates, the motion band sings ONE violet. The π arm binds the resolved render.",
);
