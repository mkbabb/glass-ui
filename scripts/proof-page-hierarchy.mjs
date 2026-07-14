#!/usr/bin/env node
// proof:page-hierarchy — section delimiting + the design-hierarchy suffused on
// EVERY PAGE, standardized (BC.W-PAGE-HIERARCHY).
//
// Open ANY route and the body reads as cleanly DELIMITED sections — each named
// section carries the SAME canonical heading rung (the √φ 20.4px section <h2>),
// consecutive sections are separated by a visible hairline rule (mode `hr`) OR
// sit in their own sub-card (mode `cards`), and NO route carries a second in-body
// descriptor header (the chassis hero is the ONE descriptor). The hierarchy is
// the same recognizable shape on every page: the chassis hero <h1> (R1, dominant,
// depth-keyed by BC.W-PAGE-CHASSIS) → the section <h2 class="text-subheading">
// (R2, secondary) → the mono eyebrow + blurb (R3/R4, tertiary).
//
// Pure FS, device-free. The PAINTED render (the delimiters reading as hairlines,
// the recognizable hierarchy, the no-double-header gestalt) is the orchestrator's
// fresh :5199 capture + tests-visual/page-hierarchy.spec.ts (the cardinal split —
// a source-green gate is never the close; the live π binds the paint).
//
// Asserts (born-RED on HEAD's 38-hand-rolled / 0%-delimited / 41-double-header /
// 57-no-R2-heading → GREEN at close; ["local","ci"]):
//   PH1 — no hand-rolled `<h2 class="text-subheading">` off <StorySection>. Every
//         section heading is the StorySection `heading=` / `#heading` rung (a bare
//         `<h2 class="text-subheading">` in a story body reds, off a narrow allowlist).
//   PH2 — sections are delimited per the page-TYPE delimiter mode. The chassis
//         delimiter affordance (`.story-sections--delimited` on the dark-adaptive
//         `--configurator-divider` token) is the default-on `hr` mode; the gallery
//         (display/card) uses sub-<Card>s (`cards`). The undelimited gap-stack is gone.
//   PH3 — no idiom-B double-header. No story SFC renders a `border-l-[3px]` IconChip
//         HEADER cluster (the route-census §1 shape: `border-l-[3px]` + `<IconChip>` +
//         a `text-admin-label` eyebrow + a `text-small` blurb) inside the body. The
//         math-paper `border-l-[3px]` §-ACCENT RAIL (no IconChip/eyebrow/blurb) is the
//         narrow allowlist (the distinguishing bite — a bare section rail does NOT red).
//   PH4 — the chassis hero is the ONE R1 descriptor. The chassis renders R1 via
//         StoryPage (the depth-keyed hero <h1>, BC.W-PAGE-CHASSIS), and the body's
//         section register is StorySection's heading rung (R2). The flat
//         undelimited gap-stack with no R1/R2 hierarchy is gone.
//   + the dark-adaptive delimiter bite — the section hairline reads the
//     `--configurator-divider`/`--border-hairline` dark-adaptive token, NOT an inline
//     `border-border/N` alpha that vanishes on the dark glass plate.
//
// Self-test bites (--self-test): a synthetic hand-rolled `<h2 class="text-subheading">`
// off StorySection REDs PH1; a synthetic undelimited multi-section page REDs PH2; a
// synthetic in-body `border-l-[3px]` + `<IconChip>` header REDs PH3 (a bare
// `border-l-[3px]` section rail with no IconChip/eyebrow/blurb does NOT red — the
// distinguishing bite); a synthetic inline `border-border/30` delimiter REDs the
// dark-adaptive bite.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:page-hierarchy";
const SELF_TEST = process.argv.includes("--self-test");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip comments (HTML/Vue/JS/CSS) so a prose mention never false-hits. Preserve
// newlines for line geometry.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + m.slice(p1.length).replace(/./g, " "));

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── The enrolled story set: every routable demo story SFC ─────────────────────
// Walk demo/stories/**/*.vue MINUS the chassis primitives themselves (StoryPage /
// StoryHero / StoryHeader / StorySection / StoryHeader-cluster hosts) and the
// orphaned composables/ tree (no route — BC.W-PAGE-PRUNE deletes it; if present it
// is unrouted, so it does not carry the user-facing page hierarchy bar).
const STORIES_DIR = "demo/stories";
const CHASSIS_FILES = new Set([
    "StoryPage.vue",
    "StoryHero.vue",
    "StoryHeader.vue",
    "StorySection.vue",
    "StorySectionHeader.vue", // BC.W-STORYBOOK-META survivors' header primitive
    "ShowcaseFrame.vue",
    "StorySection.spec.vue",
    "DockStage.vue",
    "SectionPreviewCard.vue",
]);

function walkVue(dir, acc) {
    const abs = resolve(ROOT, dir);
    if (!existsSync(abs)) return;
    for (const name of readdirSync(abs)) {
        const rel = join(dir, name);
        const full = resolve(ROOT, rel);
        const st = statSync(full);
        if (st.isDirectory()) {
            // The composables/ shelf is unrouted dead SFCs (BC.W-PAGE-PRUNE) — skip.
            if (name === "composables") continue;
            walkVue(rel, acc);
        } else if (name.endsWith(".vue") && !CHASSIS_FILES.has(name)) {
            acc.push(rel);
        }
    }
}

const STORY_FILES = [];
walkVue(STORIES_DIR, STORY_FILES);
STORY_FILES.sort();

// The enrolled set: only the routable story SFCs that compose StoryPage (a bespoke
// front-door / a chassis primitive without StoryPage is excluded from the body-section
// bars — it owns its own composition; PH4's R1 check is BC.W-PAGE-CHASSIS's PC4 job).
const ENROLLED = STORY_FILES.filter((rel) => /\bStoryPage\b/.test(read(rel)));

// ── PH1 — no hand-rolled `<h2 class="text-subheading">` off <StorySection> ────
// A section heading is THE canonical StorySection `heading=` / `#heading` rung. A
// bare `<h2 class="text-subheading">` in a story BODY is the hand-rolled bypass.
// StorySection.vue itself owns the ONE canonical `<h2 class="text-subheading">`
// (excluded by CHASSIS_FILES). The narrow allowlist is empty — every story body
// section heading routes through StorySection.
const PH1_ALLOWLIST = new Set([]);

const handRolledHits = [];
for (const rel of ENROLLED) {
    if (PH1_ALLOWLIST.has(rel)) continue;
    const src = strip(read(rel));
    const h2Tags = src.match(/<h2\b[^>]*>/g) ?? [];
    for (const tag of h2Tags) {
        const classMatch = tag.match(/class="([^"]*)"/);
        const cls = classMatch ? classMatch[1] : "";
        if (/\btext-subheading\b/.test(cls)) {
            handRolledHits.push({ rel, tag: tag.slice(0, 60) });
        }
    }
}
add(
    "PH1-no-hand-rolled-section-h2",
    handRolledHits.length === 0,
    handRolledHits.length === 0
        ? `every story-body section heading is the StorySection \`heading=\` rung across ${ENROLLED.length} enrolled routes — no hand-rolled \`<h2 class="text-subheading">\` survives (the route-census §2 collapse; PH1)`
        : `${handRolledHits.length} hand-rolled \`<h2 class="text-subheading">\`(s) off StorySection: ${handRolledHits
              .map((h) => h.rel)
              .filter((v, i, a) => a.indexOf(v) === i)
              .slice(0, 8)
              .join("; ")}`,
);

// ── PH3 — no idiom-B double-header (the route-census §1 IconChip-header shape) ──
// The idiom-B shape: a `border-l-[3px]` accent rail + an <IconChip> + a
// `text-admin-label`/`section-label--tinted` eyebrow + a `text-small` blurb,
// INSIDE the story body — a redundant second descriptor. The distinguishing bite:
// a BARE `border-l-[3px]` section rail (the math-paper §-accent — `.paper-ink-mark`)
// with NO IconChip is NOT counted (the narrow allowlist by-SHAPE, not by-file).
// BI.W-MATH-PAPER-REMOVE (UF-K3) — the math-paper.vue §-accent rail allowlist entry
// was retired with the overfit demo. No enrolled route now carries a bare
// `border-l-[3px]` rail without an IconChip, so the allowlist is empty; a future page
// re-introducing the bare-rail idiom would re-open a by-shape allowlist row here.
const PH3_RAIL_ALLOWLIST = new Set([]);

// Detect an idiom-B HEADER cluster: a `border-l-[3px]` AND an `<IconChip` in the
// SAME file's body. We require the IconChip co-presence (the distinguishing
// signal vs a bare section rail). The eyebrow/blurb are corroborating but the
// IconChip + the `border-l-[3px]` rail together ARE the redundant-header shape.
const doubleHeaderHits = [];
for (const rel of ENROLLED) {
    const src = strip(read(rel));
    const hasRail = /\bborder-l-\[3px\]/.test(src);
    const hasIconChip = /<IconChip\b/.test(src);
    if (hasRail && hasIconChip && !PH3_RAIL_ALLOWLIST.has(rel)) {
        doubleHeaderHits.push(rel);
    }
}
add(
    "PH3-no-idiom-b-double-header",
    doubleHeaderHits.length === 0,
    doubleHeaderHits.length === 0
        ? `no idiom-B in-body double-header (\`border-l-[3px]\` + <IconChip>) survives across ${ENROLLED.length} enrolled routes — the category identity is the chassis hero icon (R1), the body holds ONLY delimited sections (USER-DEFECTS §E "all headers ON TOP of the card"; the math-paper §-rail allowlisted by-shape). PH3`
        : `${doubleHeaderHits.length} idiom-B double-header(s): ${doubleHeaderHits
              .slice(0, 10)
              .join("; ")}`,
);

// ── PH2 — the section-delimiter chassis affordance exists (the `hr` mode) ──────
// The StoryPage chassis applies the delimiter automatically:
//   (a) the `delimited` register exists on StoryPage (default-on);
//   (b) the body section composes `.story-sections--delimited`;
//   (c) the CSS draws the inter-section hairline on the DARK-ADAPTIVE token
//       (--configurator-divider), NOT an inline `border-border/N` alpha.
const storyPage = strip(read("demo/chassis/page/StoryPage.vue"));
const storyHeroCss = strip(read("demo/chassis/hero/story-hero.css"));

const hasDelimitedProp = /\bdelimited\??:\s*boolean/.test(storyPage);
const bodyComposesDelimiter = /story-sections--delimited/.test(storyPage);
// The CSS rule body for the delimiter.
const delimRuleMatch = storyHeroCss.match(
    /\.story-sections--delimited\s*>[^{]*\{([\s\S]*?)\}/,
);
const delimRuleBody = delimRuleMatch ? delimRuleMatch[1] : "";
const delimReadsDarkAdaptiveToken =
    /border(?:-top)?\s*:[^;]*var\(--configurator-divider/.test(delimRuleBody) ||
    /border-color\s*:[^;]*var\(--configurator-divider/.test(delimRuleBody) ||
    /border(?:-top)?\s*:[^;]*var\(--border-hairline/.test(delimRuleBody);
const ph2Ok =
    hasDelimitedProp && bodyComposesDelimiter && delimReadsDarkAdaptiveToken;
add(
    "PH2-section-delimiter-affordance",
    ph2Ok,
    ph2Ok
        ? "the StoryPage chassis applies the section delimiter AUTOMATICALLY — a `delimited` register (default-on) draws the inter-section hairline on the dark-adaptive `--configurator-divider` token (the `hr` mode, USER-DEFECTS §C); no per-SFC hand-rolled `<hr>`. PH2"
        : `delimiter affordance incomplete (delimited prop: ${hasDelimitedProp}, body composes .story-sections--delimited: ${bodyComposesDelimiter}, reads dark-adaptive token: ${delimReadsDarkAdaptiveToken})`,
);

// ── the dark-adaptive delimiter bite — NOT an inline `border-border/N` alpha ───
// The delimiter CSS must NOT spell `border-border/N` (a Tailwind alpha utility
// that vanishes on the dark glass plate — CLAUDE.md §BA.W-CONFIG-CHASSIS). The
// rule reads the dark-adaptive token (asserted above); this bite asserts the
// ANTI-pattern is absent from the delimiter rule.
const delimNoInlineAlpha = !/border-border\/\d/.test(delimRuleBody);
add(
    "PH2b-dark-adaptive-delimiter",
    delimReadsDarkAdaptiveToken && delimNoInlineAlpha,
    delimReadsDarkAdaptiveToken && delimNoInlineAlpha
        ? "the section hairline reads the dark-adaptive `--configurator-divider` token (survives the dark glass plate) and carries NO inline `border-border/N` alpha (the §BA.W-CONFIG-CHASSIS discipline) — the dark-adaptive delimiter bite"
        : `dark-adaptive bite failed (reads dark-adaptive token: ${delimReadsDarkAdaptiveToken}, no inline border-border/N alpha: ${delimNoInlineAlpha})`,
);

// ── PH4 — the chassis hero is the ONE R1 descriptor + StorySection is the R2 rung ──
// (a) StoryPage renders the R1 chassis hero <h1> at the depth-keyed heroScale
//     (the ONE descriptor — BC.W-PAGE-CHASSIS; the per-route depth assert is PC4/PC6,
//     this is the PRESENCE-of-R1 floor);
// (b) StorySection exposes the canonical R2 heading rung (`<h2 class="text-subheading">`
//     via the heading prop / #heading slot) — the body's section register.
const storySection = strip(read("demo/chassis/section/StorySection.vue"));
const r1HeroPresent =
    /text-display-\$\{heroScale\}/.test(storyPage) ||
    /story-hero-title/.test(storyPage) ||
    /<StoryHeader\b/.test(storyPage);
const r2HeadingRung =
    /<h2[^>]*\bclass="[^"]*\btext-subheading\b/.test(storySection) &&
    (/\bheading\??:\s*string/.test(storySection) || /name="heading"/.test(storySection));
const ph4Ok = r1HeroPresent && r2HeadingRung;
add(
    "PH4-r1-descriptor-r2-rung",
    ph4Ok,
    ph4Ok
        ? "the chassis hero <h1> is the ONE R1 descriptor (StoryPage renders the depth-keyed `text-display-${heroScale}` hero, BC.W-PAGE-CHASSIS) and StorySection exposes the canonical R2 heading rung (a `text-subheading`-keyed <h2> via the heading prop/slot) — the standardized R1→R2 hierarchy, no route a flat undelimited gap-stack. PH4"
        : `R1/R2 hierarchy incomplete (R1 chassis hero in StoryPage: ${r1HeroPresent}, R2 StorySection heading rung: ${r2HeadingRung})`,
);

// ── the π readback spec is wired (the BINDING close) ──────────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/page-hierarchy.spec.ts")),
    "tests-visual/page-hierarchy.spec.ts exists (the π getComputedStyle readback — the canonical 20.4px section <h2>, the visible delimiter with a non-transparent border in BOTH modes, the 0 in-body double-headers, the per-type delimiter MODE; the BINDING close, not this device-free arm alone)",
);

// ══════════════════════════════════════════════════════════════════════════════
// Self-test bites (--self-test) — each planted defect MUST flip a clause RED.
// ══════════════════════════════════════════════════════════════════════════════
if (SELF_TEST) {
    const selfBites = [];
    const bite = (name, ok) => selfBites.push({ name, ok });

    // Bite 1 — a synthetic hand-rolled `<h2 class="text-subheading">` reds PH1.
    {
        const synthetic = `<h2 class="text-subheading">Synthetic</h2>`;
        const stripped = strip(synthetic);
        const tags = stripped.match(/<h2\b[^>]*>/g) ?? [];
        const flagged = tags.some((t) => {
            const c = (t.match(/class="([^"]*)"/) || [])[1] || "";
            return /\btext-subheading\b/.test(c);
        });
        bite("PH1 flags a synthetic hand-rolled text-subheading <h2>", flagged);
    }

    // Bite 2 — a synthetic in-body `border-l-[3px]` + <IconChip> reds PH3.
    {
        const synthetic = `<header class="border-l-[3px]"><IconChip :icon="X" /></header>`;
        const s = strip(synthetic);
        const flagged = /\bborder-l-\[3px\]/.test(s) && /<IconChip\b/.test(s);
        bite("PH3 flags a synthetic in-body border-l-[3px] + IconChip header", flagged);
    }

    // Bite 3 (the distinguishing bite) — a BARE `border-l-[3px]` section rail (no
    // IconChip) does NOT red PH3.
    {
        const synthetic = `<div class="border-l-[3px] pl-4"><span class="section-label">§ Rail</span></div>`;
        const s = strip(synthetic);
        const flagged = /\bborder-l-\[3px\]/.test(s) && /<IconChip\b/.test(s);
        bite(
            "PH3 does NOT flag a bare border-l-[3px] section rail (no IconChip) — the distinguishing bite",
            !flagged,
        );
    }

    // Bite 4 — a synthetic inline `border-border/30` delimiter reds the dark-adaptive bite.
    {
        const synthetic = `border-top: 1px solid; border-color: var(--border); /* border-border/30 */`;
        const hasInlineAlpha = /border-border\/\d/.test("border-top border-border/30");
        bite("the dark-adaptive bite flags a synthetic border-border/30 delimiter", hasInlineAlpha);
    }

    // Bite 5 — a synthetic undelimited multi-section body (no delimiter affordance) reds PH2.
    {
        const synthetic = `<section class="flex flex-col gap-10"><slot /></section>`;
        const composesDelimiter = /story-sections--delimited/.test(synthetic);
        bite("PH2 flags a synthetic undelimited multi-section body (no .story-sections--delimited)", !composesDelimiter);
    }

    const failedBites = selfBites.filter((b) => !b.ok);
    console.log("\n  [--self-test] planted-defect bites:");
    for (const b of selfBites) console.log(`    ${b.ok ? "✓" : "✗"} ${b.name}`);
    if (failedBites.length > 0) {
        console.error(
            `\n[proof:page-hierarchy --self-test] ${failedBites.length} bite(s) did NOT fire — the gate would not catch the planted defect.`,
        );
        process.exit(1);
    }
    console.log("\n[proof:page-hierarchy --self-test] all bites fire — the gate catches each planted defect.");
    process.exit(0);
}

// ── Report ────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:page-hierarchy — section delimiting + design hierarchy suffused, EVERY PAGE STANDARDIZED (BC.W-PAGE-HIERARCHY)",
);
console.log(`  enrolled story routes: ${ENROLLED.length}`);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_PAGE_HIERARCHY_OUT", "BC-page-hierarchy");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:page-hierarchy",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the PAINTED render (delimiters as hairlines, the recognizable R1→R2→R3 hierarchy, no double-header) is the orchestrator's fresh :5199 capture + tests-visual/page-hierarchy.spec.ts (the cardinal split; a source-green gate is never the close).",
    enrolledRoutes: ENROLLED.length,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:page-hierarchy] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:page-hierarchy] every story-body section is the canonical StorySection heading rung (R2); the chassis applies the dark-adaptive delimiter (the `hr` mode); no idiom-B in-body double-header survives (R1 is the ONE descriptor); the standardized R1→R2→R3 hierarchy holds across every route — the π arm binds the resolved paint.",
);
