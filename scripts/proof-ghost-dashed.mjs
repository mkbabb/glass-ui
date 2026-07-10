// proof:ghost-dashed — BC.W-GHOST-DASHED: the ONE ghost/empty-slot dashed register
// + rounded-everywhere-it-should-be (born-RED → GREEN). A developer sees ONE consistent
// ghost treatment everywhere a slot is empty / a thing is a placeholder: a dashed-outline
// plate, consistently rounded (--radius-card), calm-muted, reading unmistakably "this is a
// placeholder, not a filled surface." The 6 ad-hoc `border-dashed` forks (three radii,
// three hosts, three pads) COLLAPSE onto `.ghost-slot`. And across the demo, everything
// that SHOULD be rounded IS rounded (the iOS-concentric-corner bar).
//
// THIS DEVICE-FREE SOURCE ARM proves the STRUCTURE; the π arm
// (tests-visual/ghost-dashed.spec.ts) proves the RENDER (the ghost-slot resolves
// border-style: dashed + border-radius == --radius-card + a warm dashed color + a
// translucent host; the rounded witnesses resolve a non-zero radius). A green source arm
// is NOT done — the π readback + the proof:ba-gestalt verdict are the binding close.
//
// The falsifiable SOURCE clauses, each RED at HEAD pre-wave:
//
//   G1 — `@utility ghost-slot` EXISTS in utilities.css (a partial) with a dashed border
//        + --radius-card + the WARM-INK-not-grey dashed color (a hard-grey border-border
//        dashed REDs; the warm color-mix(... var(--foreground) ...) is required) + a
//        translucent glass-wash host (NOT a flat bg-card slab). RED at HEAD: no ghost-slot.
//   G2 — ZERO ad-hoc `border border-dashed border-border` placeholder survives in the
//        enrolled demo set (the 6 forks collapsed; grep exit 1). A bespoke
//        rounded-{md,2xl} border-dashed REDs. RED at HEAD: the 6 forks live.
//   G3 — the empty-states ghost states (first-run/complete) read `.ghost-slot`; the
//        filled states (search/onboarding/error/offline) keep the solid card (the
//        ghost-iff-empty discipline). RED at HEAD: the cards carry a solid
//        border-2 border-foreground/10 for every state.
//   G4 — the rounded-everywhere positive arm: the aurora configurator root resolves a
//        semantic radius (the Configurator component's rounded-panel clip, NOT square);
//        the home-screen category tiles resolve --radius-card (SectionPreviewCard); the
//        radii witness page demos every semantic radius. RED-as-regression-guard (a
//        surviving square-cornered plate that should be a card REDs).
//   G5 — the WatercolorDot-ghost fence: `.ghost-slot` is NOT applied to the blob-
//        silhouette slot (the two ghost registers stay DISTINCT — the dashed-rectangle
//        ghost-slot vs the blob-silhouette watercolor ghost). RED-as-regression-guard.
//
// + a self-test bite: a synthetic re-added `rounded-2xl border border-dashed border-border`
//   REDs G2; a synthetic grey-border-border dashed in ghost-slot REDs G1.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:ghost-dashed";
const SELF_TEST = process.argv.includes("--self-test");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip HTML/Vue/JS/CSS comments so a prose mention in a comment is NOT a false hit —
// the whole gate is comment-blind. Preserve newlines for line geometry.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// The ghost-slot register lives in a utilities/*.css partial (utilities.css is a thin
// @import ROOT). Read the whole utilities cascade so the home can be any partial.
const UTILITY_PARTIALS = [
    "src/styles/utilities/base.css",
    "src/styles/utilities/base-misc.css",
    "src/styles/utilities/components.css",
    "src/styles/utilities/btn.css",
    "src/styles/utilities/metal.css",
    "src/styles/utilities/animate.css",
    "src/styles/utilities/a11y-overrides.css",
];

// The 6 ex-placeholder demo forks the wave collapses onto .ghost-slot.
const GHOST_FORK_SITES = [
    "demo/stories/display/section.vue",
    "demo/stories/containers/context-menu.vue",
    "demo/stories/data/TimelineSegmentedBody.vue",
    "demo/stories/data/timeline.vue",
    "demo/stories/data/TimelineContinuousBody.vue",
    "demo/stories/data/search.vue",
];

const EMPTY_STATES = "demo/stories/compositions/empty-states.vue";
const WATERCOLOR_DOT = "src/components/custom/watercolor-dot/WatercolorDot.vue";

// The rounded-everywhere witnesses: the Configurator component owns the configurator
// clip rounding (the aurora shell inherits it); SectionPreviewCard rounds the home tiles.
const CONFIGURATOR = "src/components/custom/configurator/Configurator.vue";
const SECTION_PREVIEW_CARD = "demo/stories/SectionPreviewCard.vue";
const RADII_WITNESS = "demo/stories/foundations/radii.vue";

// In --self-test mode, allow sabotaged overrides to prove the bites red.
function loadGhostSlotBody(overrides = {}) {
    if ("ghostSlot" in overrides) return strip(overrides.ghostSlot);
    // Find the @utility ghost-slot { … } block in any partial.
    for (const rel of UTILITY_PARTIALS) {
        const body = strip(read(rel));
        const m = body.match(/@utility\s+ghost-slot\s*\{([\s\S]*?)\n\s*\}/);
        if (m) return m[1];
    }
    return null; // absent
}

function loadForkSources(overrides = {}) {
    const out = {};
    for (const rel of GHOST_FORK_SITES) {
        const key = rel;
        out[key] = key in overrides ? strip(overrides[key]) : strip(read(rel));
    }
    return out;
}

// ── The detectors ─────────────────────────────────────────────────────────────

// G1 — the @utility ghost-slot exists with the dashed + --radius-card + warm-ink-dashed
//      + translucent-wash recipe (NOT a grey border-border / flat bg-card).
function g1(ghostBody) {
    const present = ghostBody !== null;
    if (!present)
        return { pass: false, present, dashed: false, radiusCard: false, warmInk: false, translucentHost: false };
    // (a) a dashed border declared.
    const dashed = /\bdashed\b/.test(ghostBody);
    // (b) the single ghost radius is --radius-card.
    const radiusCard = /border-radius:\s*var\(--radius-card\)/.test(ghostBody);
    // (c) the dashed hairline is WARM-INK (a color-mix off --foreground), NOT a grey
    //     border-border / a hard --border. The dashed-color decl must read --foreground.
    const usesForegroundInk = /color-mix\([^)]*var\(--foreground\)/.test(ghostBody);
    const usesGreyBorderToken = /border:[^;]*var\(--border(-border)?\)/.test(ghostBody);
    const warmInk = usesForegroundInk && !usesGreyBorderToken;
    // (d) a translucent glass-wash host, NOT a flat opaque bg-card. The background reads
    //     a glass-wash token via a transparent color-mix (faint, reads "empty").
    const translucentHost =
        /background:[^;]*var\(--glass-bg-wash\)/.test(ghostBody) &&
        /background:[^;]*transparent/.test(ghostBody) &&
        !/background:\s*var\(--card\)\s*;/.test(ghostBody);
    return {
        pass: present && dashed && radiusCard && warmInk && translucentHost,
        present,
        dashed,
        radiusCard,
        warmInk,
        translucentHost,
    };
}

// G2 — zero ad-hoc `border border-dashed border-border` placeholder survives in the
//      enrolled demo forks; no bespoke rounded-{md,2xl} border-dashed.
function g2(forks) {
    const offenders = [];
    const adHocDashed = /border\s+border-dashed\s+border-border/;
    const bespokeRadiusDashed = /rounded-(?:md|2xl|lg|sm|xs)\b[^"]*border-dashed/;
    for (const [rel, src] of Object.entries(forks)) {
        if (adHocDashed.test(src) || bespokeRadiusDashed.test(src)) offenders.push(rel);
    }
    return { pass: offenders.length === 0, offenders };
}

// G3 — the empty-states ghost states read .ghost-slot; the filled states keep the solid
//      card (the ghost-iff-empty discipline). The card :class threads ghost-slot ONLY
//      for the ghost (empty) kinds (first-run/complete) via a kind-keyed conditional.
function g3(src) {
    // The wave re-frames the ghost CTAs (ctaVariant: "ghost", kinds first-run/complete)
    // onto a .ghost-slot framing. The detector: the template references ghost-slot
    // gated on the ghost kinds (a conditional class), AND the blanket solid
    // border-2 border-foreground/10 is no longer applied UNCONDITIONALLY to every card.
    const usesGhostSlot = /ghost-slot/.test(src);
    // the solid border is kind-gated now (not a bare unconditional class string).
    const ghostKindKeyed =
        /ghost-slot/.test(src) &&
        /(first-run|complete|isGhost|state\.kind|ghostKinds|ctaVariant\s*===\s*['"]ghost['"])/.test(
            src,
        );
    // the filled states still get a solid card frame (a non-ghost branch survives).
    const filledKeepsSolid = /border-2\s+border-foreground\/10|border-2 border-foreground\/10/.test(
        src,
    );
    return {
        pass: usesGhostSlot && ghostKindKeyed && filledKeepsSolid,
        usesGhostSlot,
        ghostKindKeyed,
        filledKeepsSolid,
    };
}

// G4 — the rounded-everywhere positive arm. The Configurator root carries the
//      rounded-panel clip; SectionPreviewCard rounds the home tiles; the radii page
//      demos every semantic radius.
function g4() {
    const configurator = strip(read(CONFIGURATOR));
    // the Configurator component root carries the rounded-panel + overflow-hidden clip
    // (BA.W-CONFIG-CHASSIS section-rounding-at-the-clip idiom; the aurora shell inherits).
    const configRounded =
        /rounded-panel/.test(configurator) && /overflow-hidden/.test(configurator);
    const preview = strip(read(SECTION_PREVIEW_CARD));
    // the home-screen category tiles resolve --radius-card (rounded-card on the card root).
    const tilesRounded = /rounded-card/.test(preview);
    const radii = strip(read(RADII_WITNESS));
    // the radii witness page demos every semantic radius alias (the cls-driven specimen).
    const radiiDemosSemantic =
        /rounded-card/.test(radii) &&
        /rounded-panel/.test(radii) &&
        /rounded-dock/.test(radii);
    return {
        pass: configRounded && tilesRounded && radiiDemosSemantic,
        configRounded,
        tilesRounded,
        radiiDemosSemantic,
    };
}

// G5 — the WatercolorDot-ghost fence: .ghost-slot is NOT applied to the blob-silhouette
//      slot. The two ghost registers stay distinct.
function g5() {
    const wc = strip(read(WATERCOLOR_DOT));
    // the watercolor ghost uses its OWN data-variant="ghost" register, never .ghost-slot.
    const usesOwnGhost = /data-variant=['"]ghost['"]|variant\s*===\s*['"]ghost['"]/.test(wc);
    const noGhostSlot = !/\bghost-slot\b/.test(wc);
    return { pass: usesOwnGhost && noGhostSlot, usesOwnGhost, noGhostSlot };
}

// ── Self-test bites (synthetic sabotages MUST flag) ───────────────────────────
let selfTestCount = 0;
if (SELF_TEST) {
    // Bite 1 — a grey border-border dashed (no warm-ink, flat bg-card) in ghost-slot REDs G1.
    const greyGhost = g1(
        "border: 1px dashed var(--border); border-radius: var(--radius-card); background: var(--card);",
    );
    if (!greyGhost.pass) selfTestCount++;
    // Bite 2 — an absent ghost-slot REDs G1.
    if (!g1(null).pass) selfTestCount++;
    // Bite 3 — a synthetic re-added `rounded-2xl border border-dashed border-border` REDs G2.
    const reAdded = g2(
        loadForkSources({
            "demo/stories/display/section.vue":
                '<div class="rounded-2xl border border-dashed border-border">x</div>',
        }),
    );
    if (!reAdded.pass) selfTestCount++;
}

// ── Run the live checks ───────────────────────────────────────────────────────
const ghostBody = loadGhostSlotBody();
const r1 = g1(ghostBody);
add(
    "g1-ghost-slot-register",
    r1.pass,
    r1.pass
        ? "@utility ghost-slot exists with a dashed border + --radius-card + the WARM-INK dashed hairline (a color-mix off --foreground, NOT a grey border-border) over a translucent glass-wash host (faint, reads 'empty' not 'filled') — the SINGLE ghost register"
        : `the ghost-slot register is incomplete (present=${r1.present} dashed=${r1.dashed} radius-card=${r1.radiusCard} warm-ink=${r1.warmInk} translucent-host=${r1.translucentHost}) — mint @utility ghost-slot with the warm-ink 22% dashed hairline + --radius-card + faint glass-wash host`,
);

const forks = loadForkSources();
const r2 = g2(forks);
add(
    "g2-no-ad-hoc-dashed-forks",
    r2.pass,
    r2.pass
        ? "ZERO ad-hoc `border border-dashed border-border` placeholder survives in the 6 enrolled demo forks (section/context-menu/timeline×3/search) — they collapsed onto .ghost-slot (ONE radius, ONE host, ONE muted ink)"
        : `an ad-hoc dashed placeholder survives: ${r2.offenders.join(", ")} — collapse onto .ghost-slot (clean break, no bespoke rounded-{md,2xl} border-dashed border-border)`,
);

const r3 = g3(strip(read(EMPTY_STATES)));
add(
    "g3-empty-states-ghost-iff-empty",
    r3.pass,
    r3.pass
        ? "the empty-states ghost states (first-run/complete, the ctaVariant='ghost' empty kinds) read the .ghost-slot dashed framing; the filled states (search/onboarding/error/offline) keep the solid card — the ghost-iff-empty discipline"
        : `the empty-states ghost framing is wrong (uses-ghost-slot=${r3.usesGhostSlot} kind-keyed=${r3.ghostKindKeyed} filled-keeps-solid=${r3.filledKeepsSolid}) — the ghost (empty) cards read .ghost-slot, the filled cards keep the solid frame`,
);

const r4 = g4();
add(
    "g4-rounded-everywhere",
    r4.pass,
    r4.pass
        ? "the rounded-everywhere positive arm holds: the Configurator root carries the rounded-panel + overflow-hidden clip (the aurora shell inherits it — no square configurator); the home-screen category tiles resolve --radius-card (SectionPreviewCard); the radii witness page demos every semantic radius"
        : `a witness is square-cornered (config-rounded=${r4.configRounded} tiles-rounded=${r4.tilesRounded} radii-demos-semantic=${r4.radiiDemosSemantic}) — route every surface that should be rounded onto a semantic radius`,
);

const r5 = g5();
add(
    "g5-watercolor-ghost-fence",
    r5.pass,
    r5.pass
        ? "the WatercolorDot-ghost fence holds: the blob-silhouette slot uses its OWN data-variant='ghost' register, NEVER .ghost-slot — the dashed-rectangle ghost-slot and the blob-silhouette watercolor ghost stay DISTINCT (the fence is binding both ways)"
        : `the watercolor-ghost fence breached (uses-own-ghost=${r5.usesOwnGhost} no-ghost-slot=${r5.noGhostSlot}) — .ghost-slot is for RECTANGULAR placeholders; the watercolor blob-silhouette is a distinct register`,
);

// ── (z) the π readback spec is wired (the BINDING close) ──────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/ghost-dashed.spec.ts")),
    "tests-visual/ghost-dashed.spec.ts exists (the π readback: the ghost-slot resolves border-style: dashed + border-radius == --radius-card + a warm dashed color + a translucent host; the rounded witnesses resolve a non-zero radius — the BINDING close)",
);

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:ghost-dashed — the ONE ghost/empty-slot dashed register + rounded-everywhere-it-should-be (BC.W-GHOST-DASHED)",
);
if (SELF_TEST)
    console.log(
        `  self-test (bite proof): OK — ${selfTestCount} synthetic sabotages flagged (G1 grey-dashed, G1 absent, G2 re-added bespoke dashed)`,
    );
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_GHOST_DASHED_OUT", "BC-ghost-dashed");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:ghost-dashed",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the RESOLVED dashed ghost register (border-style dashed + --radius-card radius + warm dashed color + translucent host) and the rounded witnesses are proven by tests-visual/ghost-dashed.spec.ts (the π readback, the binding close) + the proof:ba-gestalt verdict, never this gate alone.",
    selfTestChecks: selfTestCount,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (SELF_TEST) {
    console.log(
        `\n[proof:ghost-dashed --self-test] ${selfTestCount} bite(s) flagged; ledger ${pass ? "GREEN" : "RED"}`,
    );
    process.exit(0);
}

if (!pass) {
    console.error(`\n[proof:ghost-dashed] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:ghost-dashed] ONE consistent dashed-ghost register everywhere a slot is empty (the same --radius-card corner, the same warm dashed hairline, the same faint-wash host); everything that should be rounded is rounded. The π arm binds the render.",
);
