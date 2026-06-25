// proof:storybook-meta — BC.W-STORYBOOK-META: the WHOLE-STORYBOOK design-quality
// SYNTHESIS gate (born-RED → GREEN). The storybook is the SHIPPING proof surface
// (a consumer's first read of glass-ui), so its OWN frontend-design quality is a
// binding acceptance — the user's literal §D ask ("Run a frontend-design plugin
// audit of ALL UI panes" + "DOGFOOD and leverage our own components"), authored as
// prose across BA/BB, landed HERE as a binding whole-storybook oracle.
//
// THIS IS THE SYNTHESIS, NOT A RE-LITIGATION. The per-page Band-5 waves OWN their
// slices (W-PADDING-CANON / W-PAGE-HIERARCHY / W-CODE-BLOCKS / W-PAGE-PRUNE /
// W-HERO-AUDACIOUS). This gate (a) verifies the WHOLE-storybook coherence held
// across all routes, (b) COMPOSES the owning gates for the per-page slices (it
// delegates to proof:code-blocks / proof:card-padding / proof:icon-chip rather
// than re-sweeping a scope the page wave deliberately bounded — the "OWNED gaps
// are COMPOSED, not re-litigated" fence), and (c) lands the cross-page residuals +
// the DOGFOOD-completeness arm no per-page wave owns (the SHELL sweep, the
// <StorySectionHeader> mint, the section-rhythm tokenization).
//
// DEVICE-FREE SOURCE arm — the RENDER (the occlusion clearance, the fontsize floor,
// the stray-hue per-route, the dogfood DOM shape) is proven by the π readback
// tests-visual/storybook-meta.spec.ts (the BINDING close) + the proof:ba-gestalt
// page-band verdict. A green source arm is NOT done; the π + the gestalt roster bind.
//
// THE NINE AXES (each falsifiable; the comment-strip + pure-detector house pattern
// mirroring proof-demo-design.mjs / proof-storybook-complete.mjs):
//
//   M1 — header-idiom collapse. No route carries a hand-rolled idiom-B SECOND
//        header (a `border-l-[3px]` accent rail co-located with an <IconChip> AND a
//        descriptor heading — the double-descriptor body header the per-page waves
//        collapsed). The legitimate non-header `border-l-[3px]` rails (the
//        paper-ink-mark section rail, the timeline phase-detail accent) are NOT
//        headers and do NOT flag (they carry no co-located <IconChip>+heading).
//   M2 — section delimiting. The chassis delimiter affordance is present
//        (StoryPage `.story-sections--delimited` + the `--story-section-delimiter`
//        seam); a story organizing named sections reaches the StorySection heading
//        rung / the <StorySectionHeader> mint, not a raw bypass.
//   M3 — code rung (COMPOSED). The ONE Fira-Code register is the <Code>/<CodeBlock>
//        primitives; the enrolled-route collapse is proof:code-blocks' (the
//        EXEMPLAR cited as the model). This clause COMPOSES proof:code-blocks'
//        verdict (the primitives exist + compose `fira-code` + the enrolled route
//        is clean) — it does NOT re-sweep a scope the code-blocks wave bounded.
//   M4 — padding canon (COMPOSED). Every card resolves the golden ladder — owned by
//        proof:card-padding (extended to the card roster). This clause COMPOSES its
//        verdict + verifies the chassis tokens are present.
//   M5 — occlusion clearance (the source half). The `--dock-content-safe-inset`
//        gutter is reserved on the demo `<main>` scroller (scroll-padding) so the
//        fixed BottomDock cannot occlude content; the chip-graze topology is
//        `chipOverMain:false`. The MEASURED clearance is the π half.
//   M6 — fontsize floor (the source half). No story body/caption copy class
//        resolves below the legible floor (no `text-[Npx]` with N<14 on a body run;
//        no `text-2xs`/sub-caption micro on a body paragraph). The MEASURED
//        computed font-size is the π half.
//   M7 — idiom-adherence (no stray hue). No off-palette color literal in a demo
//        pane — no raw `bg-blue-*`/`text-blue-*`/`bg-teal-*`/`bg-sky-*` Tailwind
//        utility, no teal-on-navy reference. The legitimate hex literals (a
//        useTokenColor FALLBACK, a HandMark brush-color demo, an aurora seed
//        default) are NOT stray artifacts (they are the demo's OWN data, scoped).
//   M8 — glass-panel cap (the source half). No static-wash route mounts > the
//        one-GL-per-route budget (no GL tag added to a foundations/display pane).
//        The concurrent-panel count is the π half.
//   M9 — DOGFOOD-completeness (the composition-source axis, the four sub-arms):
//        M9a raw-triplet census + the NON-REGRESSION RATCHET. The per-page RE-THREAD
//            (raw triplet → <Card>/<ShowcaseFrame>) is W-PAGE-PRUNE/HIERARCHY's owned
//            slice; this wave owns the cross-cutting MEASURE — the census routes to the
//            idiom-audit ledger (each residual routed to its owning band, never silently
//            dropped), and a NEW off-baseline hand-rolled triplet REDS (the
//            anti-gameability floor — the count never grows; the ratchet shrinks as the
//            page bands re-thread).
//        M9b raw-<button> census + the NON-REGRESSION RATCHET (same FIX-vs-MEASURE split;
//            the configurator/control panes are allowlisted; a NEW raw button reds).
//        M9c the SHELL composes shipped controls (the UN-OWNED-until-now sweep —
//            no btn-pill chain, no raw type=checkbox, no raw "Pick a story" card;
//            the <kbd> help chip is the recorded KISS-KEEP). THIS WAVE'S OWN FIX.
//        M9d <StorySectionHeader> exists + composes <IconChip> (no inline-style
//            chip re-paste — proof:icon-chip D4) + <SectionPreviewCard> composes
//            ≥2 primitives (the bento dogfood exemplar). THIS WAVE'S OWN MINT/VERIFY.
//   M10 — the section-rhythm tokens (axis-3). The page whitespace rhythm is
//        tokenized (`--story-page-section-gap`/`-max-inline`/`-header-gap`), not the
//        hand-rolled `gap-10`/`max-w-6xl`/`gap-2` literal on the chassis.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, relative, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:storybook-meta";
const SELF_TEST = process.argv.includes("--self-test") || process.argv.includes("--selftest");

const STORIES_DIR = resolve(ROOT, "demo/stories");
const APPSHELL = "demo/layout/AppShell.vue";
const STORYPAGE = "demo/stories/StoryPage.vue";
const STORY_SECTION_HEADER = "demo/stories/StorySectionHeader.vue";
const SECTION_PREVIEW_CARD = "demo/stories/SectionPreviewCard.vue";
const STORY_HERO_CSS = "demo/stories/story-hero.css";
const DOCK_NAV_CSS = "demo/layout/dock-nav.css";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip HTML/Vue/JS/CSS comments so a prose mention in a comment is NOT a false
// hit — the whole gate is comment-blind. Preserve newlines for line geometry.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// ── Walk demo/stories/** collecting {relPath: stripped-source} ─────────────────
function loadStorySources() {
    const out = {};
    const walk = (dir) => {
        for (const entry of readdirSync(dir)) {
            const full = resolve(dir, entry);
            const st = statSync(full);
            if (st.isDirectory()) walk(full);
            else if (entry.endsWith(".vue")) out[relative(ROOT, full)] = strip(readFileSync(full, "utf8"));
        }
    };
    walk(STORIES_DIR);
    return out;
}

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── M1 — idiom-B SECOND-header collapse ────────────────────────────────────────
// An idiom-B double-descriptor header is the SHAPE: a `border-l-[3px]` accent rail
// co-located (within the same element block) with an <IconChip> AND a heading. A
// bare `border-l-[3px]` rail (the paper-ink-mark section rail, the timeline accent
// detail) carries no co-located <IconChip> and is NOT a header — it does not flag.
function detectIdiomBHeaders(sources, overrides = {}) {
    const src = { ...sources, ...overrides };
    const offenders = [];
    for (const [path, s] of Object.entries(src)) {
        // Only consider files that have BOTH a border-l-[3px] AND an IconChip; the
        // co-location is the idiom-B shape.
        if (!/border-l-\[3px\]/.test(s) || !/<IconChip\b/.test(s)) continue;
        // Co-located within a 240-char window: the rail + the chip + a heading rung
        // (text-subheading / text-heading / text-title) in the same block.
        const re = /border-l-\[3px\][\s\S]{0,240}<IconChip\b[\s\S]{0,240}(text-subheading|text-heading|text-title)/;
        if (re.test(s)) offenders.push(path);
    }
    return { pass: offenders.length === 0, offenders };
}

// ── M2 — section delimiter chassis affordance present ──────────────────────────
function detectSectionDelimiter() {
    const sp = strip(read(STORYPAGE));
    const css = strip(read(STORY_HERO_CSS));
    const chassisAffordance = /story-sections--delimited/.test(sp);
    const seamRule = /\.story-sections--delimited[\s\S]{0,200}border-top/.test(css);
    return { pass: chassisAffordance && seamRule, chassisAffordance, seamRule };
}

// ── M3 — code rung (COMPOSED proof:code-blocks) ────────────────────────────────
function composeGate(cmd) {
    try {
        execFileSync("node", [resolve(ROOT, `scripts/${cmd}.mjs`)], {
            cwd: ROOT,
            stdio: "ignore",
        });
        return { pass: true, exit: 0 };
    } catch (e) {
        return { pass: false, exit: e.status ?? 1 };
    }
}

// ── M5 — occlusion clearance (the source half: the gutter is reserved) ─────────
function detectOcclusionGutter() {
    const css = strip(read(DOCK_NAV_CSS));
    const safeInset = /--dock-content-safe-inset/.test(css);
    const scrollPad = /scroll-padding-block-start:\s*var\(--dock-content-safe-inset/.test(css);
    return { pass: safeInset && scrollPad, safeInset, scrollPad };
}

// ── M6 — fontsize floor (the source half) ──────────────────────────────────────
// No story BODY copy carries a sub-legible explicit size below the 14px floor. The
// forbidden shape: a `text-[Npx]` with N < 14, or a `text-2xs` micro, on a BODY run.
// EXEMPT (the SANCTIONED micro registers, CLAUDE.md): the uppercase-tracked EYEBROW
// (`text-admin-label` shape — `uppercase` + `tracking-`, a 10px supporting tag, NOT
// body copy) and the viz coordinate ANNOTATION (`text-mono-caption` on an absolute
// overlay — a diagram tick label, not legible prose). The floor binds BODY/caption
// PROSE, never the deliberate micro-label register the design language sanctions.
function detectFontsizeFloor(sources, overrides = {}) {
    const src = { ...sources, ...overrides };
    const offenders = [];
    // A `class="…"` attribute carrying a sub-14px size is the unit we judge. We
    // grab the class string around the size token and exempt the sanctioned shapes.
    // (The size token is `text-[Npx]` (arbitrary px) OR `text-2xs` (the sub-xs micro);
    // no trailing \b — `text-[10px]` ends on `]` which is not a word boundary.)
    const classRe = /class=("|')([^"']*\btext-(?:\[(\d+)px\]|2xs\b)[^"']*)\1/g;
    for (const [path, s] of Object.entries(src)) {
        for (const m of s.matchAll(classRe)) {
            const cls = m[2];
            const px = m[3] ? parseInt(m[3], 10) : 0; // 0 → the text-2xs micro
            const isSubLegible = m[3] ? px < 14 : true;
            if (!isSubLegible) continue;
            // EXEMPT the sanctioned micro registers.
            const isEyebrow = /\buppercase\b/.test(cls) && /\btracking-/.test(cls);
            const isAnnotation = /\btext-mono-caption\b/.test(cls);
            if (isEyebrow || isAnnotation) continue;
            offenders.push(`${path}: ${m[3] ? `text-[${m[3]}px]` : "text-2xs"}`);
        }
    }
    return { pass: offenders.length === 0, offenders };
}

// ── M7 — idiom-adherence (no stray off-palette HUE) ────────────────────────────
// The forbidden stray hue is a raw Tailwind off-palette COLOR UTILITY — bg-blue-*,
// text-blue-*, bg-teal-*, bg-sky-*, bg-indigo-*, bg-cyan-* (the "WTF blue" + the
// teal-on-navy reference). The library identity is warm-cream + --section-color-* +
// --viz-* + --chart-*; a raw Tailwind chromatic block is the stray artifact. A hex
// literal is NOT scanned here — those are the demo's OWN data (a HandMark brush
// color, a useTokenColor fallback, an aurora seed) and are NOT stray utilities.
const STRAY_UTIL_RE = /\b(?:bg|text|border|fill|stroke|from|to|via)-(?:blue|teal|sky|indigo|cyan|navy)-\d{2,3}\b/;
function detectStrayHue(sources, overrides = {}) {
    const src = { ...sources, ...overrides };
    const offenders = [];
    for (const [path, s] of Object.entries(src)) {
        const m = s.match(STRAY_UTIL_RE);
        if (m) offenders.push(`${path}: ${m[0]}`);
    }
    return { pass: offenders.length === 0, offenders };
}

// ── M8 — glass-panel cap (the source half: no GL added to a static-wash pane) ──
const GL_TAGS = /<(Aurora|Constellation|FourierField|GooBlob|DotFlowField|Concentric)\b/;
// BD.W-PAGE-BACKGROUND / display-buttons Pass-E top-move #1 PROMOTED display/buttons off
// the static-wash list: it is the sanctioned GLASS-SHOWCASE route now — its glass specimens
// stage over ONE shared aurora field (glass over flat cream is invisible-by-construction;
// the colorful field is MANDATORY for a glass demo). The one-GL budget holds (ONE <Aurora>,
// live-verified ONE canvas). The FOUNDATIONS panes stay paper static-wash by design.
const STATIC_WASH_PANES = [
    "demo/stories/foundations/typography.vue",
    "demo/stories/foundations/colors.vue",
    "demo/stories/foundations/icons.vue",
    "demo/stories/foundations/radii.vue",
    "demo/stories/foundations/shadows.vue",
    "demo/stories/foundations/surface-tints.vue",
];
function detectGlassPanelCap(sources, overrides = {}) {
    const src = { ...sources, ...overrides };
    const offenders = STATIC_WASH_PANES.filter((p) => GL_TAGS.test(src[p] ?? ""));
    return { pass: offenders.length === 0, offenders };
}

// ── M9a — raw-triplet census + the NON-REGRESSION ratchet (the MEASURE) ─────────
// A raw `rounded-card` + `border` + (`bg-card`|`shadow-cartoon`) triplet in a story
// body bypasses <Card>/<ShowcaseFrame>. The NARROW allowlist: ShowcaseFrame.vue (it
// DEFINES the triplet), SectionPreviewCard.vue (the chassis card SHELL it mints).
//
// THE FIX vs MEASURE split (the band-5 boundary, spec fences). The per-page
// RE-THREAD (raw triplet → <Card>/<ShowcaseFrame>) is W-PAGE-PRUNE/W-PAGE-HIERARCHY's
// owned slice; this wave OWNS the cross-cutting MEASURE. The residual census is the
// idiom-audit ledger's input (docs/tranches/BC/audit/storybook-meta/idiom-audit.md)
// — each residual ROUTED to its owning page band, never silently dropped (SYNTHESIS
// #20). The gate is the NON-REGRESSION ratchet: a NEW off-allowlist hand-rolled
// triplet (above the recorded census baseline) REDS — the anti-gameability floor a
// future agent cannot smuggle a fresh card-bypass past. The recorded baseline shrinks
// as the page bands re-thread; it never grows.
const M9A_ALLOWLIST = new Set([
    "demo/stories/ShowcaseFrame.vue", // DEFINES the triplet (its reason to exist)
    "demo/stories/SectionPreviewCard.vue", // the chassis card SHELL mint
]);
const TRIPLET_RE = /rounded-card[^"'`]*\bborder\b[^"'`]*\b(?:bg-card|shadow-cartoon)\b/;
// The recorded census baseline (the page-band-owned residual set, routed in the
// idiom-audit ledger). A NEW off-baseline triplet reds; the count never grows.
const M9A_BASELINE = new Set([
    "demo/stories/aurora/PresetPickerRow.vue",
    "demo/stories/data/avatar.vue",
    "demo/stories/data/data-table.vue",
    "demo/stories/data/infinite-scroll.vue",
    "demo/stories/data/metric-cell.vue",
    "demo/stories/data/metric-stack.vue",
    "demo/stories/data/search.vue",
    "demo/stories/data/sortable-list.vue",
    "demo/stories/data/table.vue",
    "demo/stories/data/timeline-continuous.vue",
    "demo/stories/data/timeline-segmented.vue",
    "demo/stories/data/timeline.vue",
    "demo/stories/data/virtual-section.vue",
    "demo/stories/display/metric-badge.vue",
    "demo/stories/display/pulse.vue",
    "demo/stories/display/section.vue",
    "demo/stories/forms/label.vue",
    "demo/stories/forms/multi-select.vue",
    "demo/stories/foundations/motion.vue",
    "demo/stories/foundations/paper-glass.vue",
    "demo/stories/foundations/shadows.vue",
    "demo/stories/motion/handmark.vue",
    "demo/stories/motion/typewriter.vue",
    "demo/stories/navigation/header-ribbon.vue",
]);
function detectRawTriplet(sources, overrides = {}, { allowlist = M9A_ALLOWLIST, baseline = M9A_BASELINE } = {}) {
    const src = { ...sources, ...overrides };
    const census = [];
    const regressions = [];
    for (const [path, s] of Object.entries(src)) {
        if (allowlist.has(path)) continue;
        if (TRIPLET_RE.test(s)) {
            census.push(path);
            if (!baseline.has(path)) regressions.push(path); // a NEW hand-roll
        }
    }
    // PASS = no NEW off-baseline triplet (the ratchet). The census routes to the
    // idiom-audit ledger; the regressions block.
    return { pass: regressions.length === 0, census, regressions };
}

// ── M9b — raw-<button> census + the NON-REGRESSION ratchet (the MEASURE) ───────
// A raw `<button>` on a platform whose flagship is the glass <Button>. The NARROW
// allowlist (the spec): a configurator/control-pane raw control that needs no glass
// register. As with M9a the per-page FIX is the page bands' slice; this is the
// MEASURE + the non-regression ratchet (a NEW off-baseline raw button reds). The
// census routes to the idiom-audit ledger.
const M9B_ALLOWLIST = new Set([
    // the configurator/control panes that hand-roll a bare control by design.
    "demo/stories/aurora/OklchStopRow.vue",
    "demo/stories/aurora/PresetPickerRow.vue",
    "demo/stories/motion/curve-gallery.vue",
    "demo/stories/motion/springs.vue",
    "demo/stories/motion/scroll-system.vue",
    "demo/stories/foundations/css-utilities.vue", // the scale-on-hover demo buttons
    "demo/stories/display/buttons.vue", // the button pane demonstrates raw vs <Button>
    "demo/stories/CodeBlock.vue", // the copy-affordance button (the chassis primitive)
    // BD configurator — the preset-tile gallery selector is a bespoke configurator
    // control (a `data-preset-tile` glass-capsule + glass-capsule-hover + focus-ring +
    // aria-pressed thumbnail tile, the proof:configurator-glass-atoms primitive), a
    // hand-rolled bare control by design — the same class as the aurora configurator
    // control panes already allowlisted above.
    "demo/stories/compositions/configurator.vue",
]);
const M9B_BASELINE = new Set([
    "demo/stories/compositions/instrument-chassis.vue",
    "demo/stories/containers/expandable-container.vue",
    "demo/stories/containers/hover-card.vue",
    "demo/stories/data/infinite-scroll.vue",
    "demo/stories/data/timeline-continuous.vue",
    "demo/stories/data/timeline-segmented.vue",
    "demo/stories/data/virtual-section.vue",
    "demo/stories/dock/layers.vue",
    "demo/stories/dock/overview.vue",
    // BC.W-DOCK-SEARCH — the dock-search exerciser's collapsed-pill search TRIGGER is
    // a bespoke dock affordance (a custom `cursor: text` morph trigger that opens the
    // search field aperture, NOT a glass <Button> case — converting it would change
    // its dock-morph semantics). A dock-band control pane, recorded as a residual on
    // the idiom-audit ledger (the dock/overview · dock/layers control-pane precedent).
    "demo/stories/dock/dock-search.vue",
    // BD dock band — the iOS-surface FACSIMILE example tiles + the liquid-playground
    // lab. Each example recreates a recognizable iOS surface (AppleMusic transport,
    // Notification Reply/Dismiss, Spotlight field, TabBar island chips, AppSwitcher
    // tiles, VolumeHUD) whose controls are BESPOKE iOS UI elements carrying their own
    // facsimile classes (nt-act / sp-field / tb-island-chip) — converting them to the
    // generic glass <Button> would destroy the facsimile. The liquid-playground lab's
    // real <button>s are the de-shadcn'd semantic affordances (a real <button>, not a
    // <div> faking one). Same dock-band bespoke-affordance class as dock/overview ·
    // dock/layers · dock/dock-search above; recorded residuals on the idiom-audit ledger.
    "demo/stories/dock/examples/AppSwitcher.vue",
    "demo/stories/dock/examples/AppleMusic.vue",
    "demo/stories/dock/examples/Notification.vue",
    "demo/stories/dock/examples/Spotlight.vue",
    "demo/stories/dock/examples/TabBar.vue",
    "demo/stories/dock/examples/VolumeHUD.vue",
    "demo/stories/dock/liquid-playground.vue",
    "demo/stories/forms/combobox.vue",
    "demo/stories/foundations/shadows.vue",
    "demo/stories/navigation/toc-tracking.vue",
    "demo/stories/substrates/blob.vue",
    "demo/stories/substrates/goo-dot.vue",
]);
function detectRawButton(sources, overrides = {}, { allowlist = M9B_ALLOWLIST, baseline = M9B_BASELINE } = {}) {
    const src = { ...sources, ...overrides };
    const census = [];
    const regressions = [];
    for (const [path, s] of Object.entries(src)) {
        if (allowlist.has(path)) continue;
        if (/<button\b/.test(s)) {
            census.push(path);
            if (!baseline.has(path)) regressions.push(path);
        }
    }
    return { pass: regressions.length === 0, census, regressions };
}

// ── M9c — the SHELL composes shipped controls ──────────────────────────────────
function detectShellDogfood(overrides = {}) {
    const s = "appshell" in overrides ? strip(overrides.appshell) : strip(read(APPSHELL));
    // NO btn-pill raw chain (the morph toggle composes <Button>).
    const noBtnPill = !/\bbtn-pill\b/.test(s);
    // NO raw <input type="checkbox"> (the liquid-preview toggle composes <Switch>).
    const noRawCheckbox = !/<input[^>]*type=["']checkbox["']/.test(s);
    // NO raw "Pick a story" rounded-[…] border bg-background/40 empty-state card
    // (it composes <Card>). The detectable signature: a `bg-background/40` paired
    // with `rounded-[` on a div.
    const noRawEmptyCard = !/rounded-\[[^\]]*\][^>]*\bborder\b[^>]*bg-background\/40/.test(s);
    // POSITIVE: the SHELL imports the shipped controls.
    const importsButton = /import\s*\{[^}]*\bButton\b[^}]*\}\s*from\s*["'][^"']*\/button["']/.test(s);
    const importsSwitch = /import\s*\{[^}]*\bSwitch\b[^}]*\}\s*from\s*["'][^"']*\/switch["']/.test(s);
    const importsCard = /import\s*\{[^}]*\bCard\b[^}]*\}\s*from\s*["'][^"']*\/card["']/.test(s);
    return {
        pass:
            noBtnPill &&
            noRawCheckbox &&
            noRawEmptyCard &&
            importsButton &&
            importsSwitch &&
            importsCard,
        noBtnPill,
        noRawCheckbox,
        noRawEmptyCard,
        importsButton,
        importsSwitch,
        importsCard,
    };
}

// ── M9d — <StorySectionHeader> exists + composes IconChip; <SectionPreviewCard> ──
function detectDogfoodMints(overrides = {}) {
    const ssh = "ssh" in overrides ? strip(overrides.ssh) : strip(read(STORY_SECTION_HEADER));
    const spc = "spc" in overrides ? strip(overrides.spc) : strip(read(SECTION_PREVIEW_CARD));
    const sshExists = ssh.length > 0;
    // composes the shipped <IconChip> (the import + the tag), NO inline-style chip
    // re-paste (proof:icon-chip D4: a `:style` with a `color-mix(… transparent` chip
    // backplate is the re-paste shape the component must NOT carry).
    const sshComposesIconChip = /<IconChip\b/.test(ssh) && /import\s*\{[^}]*\bIconChip\b/.test(ssh);
    const sshNoChipRePaste = !/:style=[^>]*color-mix\([^)]*transparent[^)]*\)[^>]*(?:backplate|icon-chip|chip)/i.test(ssh);
    // <SectionPreviewCard> exists + composes ≥2 primitives (the IconChip POP + the
    // fira-code subpath chip / a glass card surface — the bento exemplar).
    const spcExists = spc.length > 0;
    const spcComposesIconChip = /<IconChip\b/.test(spc);
    const spcSecondPrimitive = /fira-code/.test(spc) || /glass-resting|glass-quiet|<Card\b/.test(spc);
    const spcTwoPrimitives = spcComposesIconChip && spcSecondPrimitive;
    return {
        pass:
            sshExists &&
            sshComposesIconChip &&
            sshNoChipRePaste &&
            spcExists &&
            spcTwoPrimitives,
        sshExists,
        sshComposesIconChip,
        sshNoChipRePaste,
        spcExists,
        spcTwoPrimitives,
    };
}

// ── M10 — the section-rhythm tokens (axis-3) ───────────────────────────────────
function detectRhythmTokens() {
    const css = strip(read(STORY_HERO_CSS));
    const sp = strip(read(STORYPAGE));
    const tokensMinted =
        /--story-page-section-gap\s*:/.test(css) &&
        /--story-page-max-inline\s*:/.test(css) &&
        /--story-page-header-gap\s*:/.test(css);
    // the chassis READS the tokens (no hand-rolled gap-10/max-w-6xl literal survives).
    const readsGap = /var\(--story-page-section-gap\)/.test(sp);
    const readsMax = /var\(--story-page-max-inline\)/.test(sp);
    const noGap10 = !/\bgap-10\b/.test(sp);
    const noMaxW6xl = !/\bmax-w-6xl\b/.test(sp);
    return {
        pass: tokensMinted && readsGap && readsMax && noGap10 && noMaxW6xl,
        tokensMinted,
        readsGap,
        readsMax,
        noGap10,
        noMaxW6xl,
    };
}

// ── The self-test bites (anti-evasion) — each sabotage REDs its clause ──────────
function selfTest(sources) {
    let flagged = 0;
    const sab = (label, result) => {
        if (!result.pass) flagged++;
        else throw new Error(`[proof:storybook-meta self-test] the bite FAILED to flag: ${label}`);
    };
    // M1: a planted idiom-B border-l-[3px] + IconChip + heading reds.
    sab(
        "M1 idiom-B header re-planted",
        detectIdiomBHeaders(sources, {
            "demo/stories/__plant.vue": `<div class="border-l-[3px]"><IconChip :icon="x" /><h2 class="text-subheading">Planted</h2></div>`,
        }),
    );
    // M6: a planted text-[10px] body run reds.
    sab(
        "M6 sub-legible text-[10px]",
        detectFontsizeFloor(sources, { "demo/stories/__plant.vue": `<p class="text-[10px]">tiny</p>` }),
    );
    // M7: a planted bg-blue-500 stray hue reds.
    sab(
        "M7 stray bg-blue-500",
        detectStrayHue(sources, { "demo/stories/__plant.vue": `<div class="bg-blue-500">stray</div>` }),
    );
    // M8: a planted Aurora on a static-wash pane reds.
    sab(
        "M8 GL-on-static-wash",
        detectGlassPanelCap(sources, {
            "demo/stories/foundations/typography.vue": `text-display-mega <Aurora :config="x" />`,
        }),
    );
    // M9a: a NEW off-baseline raw triplet reds the non-regression ratchet; an
    // allowlisted host AND a baseline-recorded residual do NOT (the distinguishing bites).
    sab(
        "M9a NEW off-baseline raw triplet (the regression ratchet)",
        detectRawTriplet(sources, {
            "demo/stories/__plant.vue": `<div class="rounded-card border bg-card">plate</div>`,
        }),
    );
    {
        // distinguishing bites over an otherwise-clean source:
        const cleanBase = Object.fromEntries(Object.entries(sources).map(([k]) => [k, ""]));
        // (i) an ALLOWLISTED host carrying the triplet stays GREEN (the def is exempt).
        const exempt = detectRawTriplet(cleanBase, {
            "demo/stories/ShowcaseFrame.vue": `<div class="rounded-card border bg-card">DEF</div>`,
        });
        // (ii) a BASELINE-recorded residual stays GREEN (it routes to the ledger, not a regression).
        const baselineResidual = detectRawTriplet(cleanBase, {
            "demo/stories/data/avatar.vue": `<div class="rounded-card border bg-card">x</div>`,
        });
        // (iii) a NEW off-baseline triplet REDS (the regression).
        const regression = detectRawTriplet(cleanBase, {
            "demo/stories/__new.vue": `<div class="rounded-card border bg-card">x</div>`,
        });
        if (exempt.pass && baselineResidual.pass && !regression.pass) flagged++;
        else
            throw new Error(
                "[proof:storybook-meta self-test] M9a ratchet bite failed — allowlist+baseline must stay GREEN while a NEW off-baseline triplet reds",
            );
    }
    // M9b: a NEW off-baseline raw <button> reds the ratchet; an allowlisted control
    // pane does NOT.
    sab(
        "M9b NEW off-baseline raw <button> (the regression ratchet)",
        detectRawButton(sources, {
            "demo/stories/__plant.vue": `<button>raw</button>`,
        }),
    );
    {
        const cleanBase = Object.fromEntries(Object.entries(sources).map(([k]) => [k, ""]));
        const exemptControl = detectRawButton(cleanBase, {
            "demo/stories/motion/springs.vue": `<button>control</button>`,
        });
        const regression = detectRawButton(cleanBase, {
            "demo/stories/__new.vue": `<button>x</button>`,
        });
        if (exemptControl.pass && !regression.pass) flagged++;
        else
            throw new Error(
                "[proof:storybook-meta self-test] M9b ratchet bite failed — an allowlisted control pane must stay GREEN while a NEW off-baseline raw <button> reds",
            );
    }
    // M9c: a planted btn-pill chain in the SHELL reds; the <kbd> chip does NOT.
    sab(
        "M9c btn-pill chain in SHELL",
        detectShellDogfood({ appshell: `<button class="btn-pill">x</button>` }),
    );
    // M9c KISS-allowlist bite: a SHELL with the shipped controls + a <kbd> font-mono
    // chip does NOT flag (the kbd is the recorded KISS-KEEP — only the controls matter).
    {
        const r = detectShellDogfood({
            appshell: `
                import { Button } from "../../src/components/ui/button";
                import { Switch } from "../../src/components/ui/switch";
                import { Card } from "../../src/components/ui/card";
                <Button>x</Button><Switch /><Card />
                <kbd class="font-mono text-xs">K</kbd>`,
        });
        if (r.pass) flagged++;
        else throw new Error("[proof:storybook-meta self-test] M9c flagged the KISS-KEEP <kbd> chip");
    }
    // M9d: a StorySectionHeader bypassing IconChip (an inline chip paste) reds.
    sab(
        "M9d StorySectionHeader without IconChip",
        detectDogfoodMints({ ssh: `<div class="border-l-[3px]">no chip here</div>`, spc: read(SECTION_PREVIEW_CARD) }),
    );
    return flagged;
}

// ── Run ─────────────────────────────────────────────────────────────────────────
const sources = loadStorySources();
const selfTestCount = selfTest(sources);

// M1
const m1 = detectIdiomBHeaders(sources);
add(
    "m1-header-idiom-collapse",
    m1.pass,
    m1.pass
        ? "no route carries a hand-rolled idiom-B SECOND header (a `border-l-[3px]` rail co-located with an <IconChip> AND a descriptor heading); the per-page waves collapsed the 41 double-descriptor headers onto the chassis hero (the bare paper-ink-mark / timeline accent rails are NOT headers and do not flag)"
        : `idiom-B second header(s) survive: ${m1.offenders.join(", ")} — collapse onto the chassis hero / <StorySectionHeader>`,
);

// M2
const m2 = detectSectionDelimiter();
add(
    "m2-section-delimiting",
    m2.pass,
    m2.pass
        ? "the chassis section-delimiter affordance is present (StoryPage `.story-sections--delimited` + the `--configurator-divider` border-top seam) so named sections read as cleanly delimited storybook-wide"
        : `the section-delimiter chassis is incomplete (chassis-affordance=${m2.chassisAffordance} seam-rule=${m2.seamRule})`,
);

// M3 (COMPOSED proof:code-blocks)
const m3 = composeGate("proof-code-blocks");
add(
    "m3-code-rung-composed",
    m3.pass,
    m3.pass
        ? "the ONE Fira-Code code register holds — proof:code-blocks (the EXEMPLAR) is GREEN: the <Code>/<CodeBlock> primitives exist + compose `fira-code` + the enrolled route is clean (this clause COMPOSES the owning gate, never re-sweeps its bounded scope)"
        : `proof:code-blocks (the composed owning gate) is RED (exit ${m3.exit}) — the code-register collapse is the page wave's slice; run \`npm run proof:code-blocks\` for the detail`,
);

// M4 (COMPOSED proof:card-padding)
const m4 = composeGate("proof-card-padding");
add(
    "m4-padding-canon-composed",
    m4.pass,
    m4.pass
        ? "the golden padding ladder holds storybook-wide — proof:card-padding is GREEN (the card roster resolves `--card-pad-inline`/`-block`/`-section-gap`; an ad-hoc `p-N` off the roster reds it). This clause COMPOSES the owning gate."
        : `proof:card-padding (the composed owning gate) is RED (exit ${m4.exit}) — run \`npm run proof:card-padding\` for the detail`,
);

// M5
const m5 = detectOcclusionGutter();
add(
    "m5-occlusion-gutter-source",
    m5.pass,
    m5.pass
        ? "the `--dock-content-safe-inset` gutter is reserved on the demo `<main>` scroller (scroll-padding-block-start) so the fixed BottomDock cannot occlude content; the MEASURED per-route clearance is the π half (tests-visual/storybook-meta.spec.ts)"
        : `the occlusion gutter source is incomplete (safe-inset=${m5.safeInset} scroll-pad=${m5.scrollPad})`,
);

// M6
const m6 = detectFontsizeFloor(sources);
add(
    "m6-fontsize-floor-source",
    m6.pass,
    m6.pass
        ? "no story body/caption run carries a sub-legible explicit size (no `text-[Npx]` with N<14, no `text-2xs` micro); the MEASURED computed font-size floor is the π half"
        : `sub-legible copy survives: ${m6.offenders.join(", ")} — no body/caption below the 14px legible floor`,
);

// M7
const m7 = detectStrayHue(sources);
add(
    "m7-no-stray-hue",
    m7.pass,
    m7.pass
        ? "no off-palette stray HUE utility in any demo pane (no raw `bg-blue-*`/`text-blue-*`/`bg-teal-*`/`bg-sky-*` Tailwind chromatic block, no teal-on-navy reference) — the warm-cream + --section-color-* + --viz-* + --chart-* identity holds (the demo's own hex data — a HandMark brush color, a useTokenColor fallback, an aurora seed — is scoped, not a stray utility)"
        : `stray off-palette hue(s): ${m7.offenders.join(", ")} — the "WTF blue" artifact, re-point onto the identity palette`,
);

// M8
const m8 = detectGlassPanelCap(sources);
add(
    "m8-glass-panel-cap-source",
    m8.pass,
    m8.pass
        ? "no static-wash route mounts a GL context off-budget (the foundations/display panes are paper static-wash by design — the one-GL-per-route + ≤3-active-panel awwwards budget); the concurrent-panel count is the π half"
        : `GL context added to a static-wash route: ${m8.offenders.join(", ")} — the one-GL-per-route budget`,
);

// M9a (the census MEASURE + the non-regression ratchet)
const m9a = detectRawTriplet(sources);
add(
    "m9a-raw-triplet-measure",
    m9a.pass,
    m9a.pass
        ? `no NEW off-baseline raw \`rounded-card border bg-card\`/\`shadow-cartoon\` triplet (the non-regression ratchet holds — ${m9a.census.length} census residuals routed to the idiom-audit ledger for the page-band RE-THREAD onto <Card>/<ShowcaseFrame>; a NEW hand-rolled card-bypass past the recorded baseline would red). The per-page FIX is W-PAGE-PRUNE/HIERARCHY's slice; this is the cross-cutting MEASURE.`
        : `NEW off-baseline raw triplet(s) (a fresh card-bypass smuggled in): ${m9a.regressions.join(", ")} — compose <Card>/<ShowcaseFrame> (the ratchet never grows)`,
);

// M9b (the census MEASURE + the non-regression ratchet)
const m9b = detectRawButton(sources);
add(
    "m9b-raw-button-measure",
    m9b.pass,
    m9b.pass
        ? `no NEW off-baseline raw <button> (the non-regression ratchet holds — ${m9b.census.length} census residuals routed to the idiom-audit ledger for the page-band RE-THREAD onto the glass <Button>; the configurator/control panes are allowlisted). A NEW hand-rolled raw button past the baseline would red.`
        : `NEW off-baseline raw <button>(s): ${m9b.regressions.join(", ")} — compose the glass <Button> (the ratchet never grows)`,
);

// M9c
const m9c = detectShellDogfood();
add(
    "m9c-shell-dogfood",
    m9c.pass,
    m9c.pass
        ? "the demo SHELL (AppShell.vue) composes the shipped controls — the morph toggle is <Button> (no btn-pill chain), the liquid-preview toggle is <Switch> (no raw type=checkbox), the empty state is <Card> (no raw bg-background/40 div); the <kbd> help chip is the recorded KISS-KEEP. The highest-visibility dogfood miss (the SHELL frames every route), UN-OWNED until now"
        : `the SHELL hand-rolls a shipped control (no-btn-pill=${m9c.noBtnPill} no-raw-checkbox=${m9c.noRawCheckbox} no-raw-empty-card=${m9c.noRawEmptyCard} imports-Button=${m9c.importsButton} imports-Switch=${m9c.importsSwitch} imports-Card=${m9c.importsCard})`,
);

// M9d
const m9d = detectDogfoodMints();
add(
    "m9d-dogfood-mints",
    m9d.pass,
    m9d.pass
        ? "<StorySectionHeader> exists + composes the shipped <IconChip> (the import + the tag, NO inline-style chip re-paste — proof:icon-chip D4); <SectionPreviewCard> composes ≥2 primitives (the IconChip POP + the fira-code subpath chip / glass card surface — the bento dogfood exemplar). The 42nd-paste preventer minted; the survivors' home"
        : `the dogfood mints are incomplete (ssh-exists=${m9d.sshExists} ssh-composes-iconchip=${m9d.sshComposesIconChip} ssh-no-repaste=${m9d.sshNoChipRePaste} spc-exists=${m9d.spcExists} spc-two-primitives=${m9d.spcTwoPrimitives})`,
);

// M10
const m10 = detectRhythmTokens();
add(
    "m10-section-rhythm-tokens",
    m10.pass,
    m10.pass
        ? "the page whitespace rhythm is tokenized (`--story-page-section-gap`/`-max-inline`/`-header-gap` minted in story-hero.css; the chassis READS them) — clean break, no `gap-10`/`max-w-6xl` literal survives on the chassis (axis-3 — every page breathes the SAME measured rhythm, the herostudios generous-whitespace bar)"
        : `the section-rhythm tokenization is incomplete (tokens-minted=${m10.tokensMinted} reads-gap=${m10.readsGap} reads-max=${m10.readsMax} no-gap-10=${m10.noGap10} no-max-w-6xl=${m10.noMaxW6xl})`,
);

// ── (z) the π readback spec is wired (the BINDING close) ───────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/storybook-meta.spec.ts")),
    "tests-visual/storybook-meta.spec.ts exists (the π readback: the occlusion-clearance sweep, the fontsize-floor sweep, the stray-hue sweep, the dogfood-render sweep — the SHELL controls resolve as <Button>/<Switch> markup, the section headers compose <StorySectionHeader> — both modes. The BINDING close, not this device-free arm alone)",
);

// ── Report ──────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

console.log(
    "proof:storybook-meta — the WHOLE-STORYBOOK frontend-design quality SYNTHESIS (padding · spacing · occlusion · fontsize · idiom-adherence · DOGFOOD-completeness): the storybook IS the proof surface (BC.W-STORYBOOK-META)",
);
console.log(
    `  self-test (bite proof): OK — ${selfTestCount} synthetic sabotages flagged (M1 idiom-B, M6 sub-legible, M7 stray-blue, M8 GL-on-static-wash, M9a ratchet+exempt+baseline, M9b ratchet+exempt, M9c btn-pill+KISS-keep, M9d no-IconChip)`,
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const ARTIFACT = gateArtifactPath("GLASS_UI_STORYBOOK_META_ARTIFACT", "BC-storybook-meta");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:storybook-meta",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the RENDER (occlusion clearance, fontsize floor, stray-hue, the dogfood DOM shape) is proven by tests-visual/storybook-meta.spec.ts (the π readback, the BINDING close) + the proof:ba-gestalt page-band verdict, never this gate alone. M3/M4 COMPOSE proof:code-blocks/proof:card-padding (the owned slices, not re-litigated).",
    selfTestChecks: selfTestCount,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (SELF_TEST) {
    console.log(`\n[proof:storybook-meta --self-test] ${selfTestCount} bite(s) flagged; ledger ${pass ? "GREEN" : "RED"}`);
    process.exit(0);
}

if (!pass) {
    console.error(`\n[proof:storybook-meta] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:storybook-meta] the storybook-as-artifact passes the frontend-design quality bar — one header idiom, delimited sections, the ONE Fira-Code register, the golden padding ladder, the occlusion gutter, the legible floor, no stray hue, the one-GL budget, AND the dogfood-completeness (the SHELL composes shipped controls, the <StorySectionHeader> mint + the <SectionPreviewCard> bento). The π arm + the proof:ba-gestalt page-band verdict bind the render.",
);

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    // run-guard already executed inline above (top-level run); nothing else.
}
