#!/usr/bin/env node
// proof:hero-audacious — BC.W-HERO-AUDACIOUS: the herostudios-grade audacious-type
// hero pages, per-category icons, each DISTINCT (not a duplicated grey-card grid).
//
// The system owns a √φ display ladder peaking at 352px; almost none of it reached a
// hero (deferral/herostudios.md — the hero <h1> capped at text-display-3 ~68px, the
// front door at text-display-4 ~86px; the redirect cards rendered ZERO icons over a
// flat grey slab; every hero read identical — one wired palette, no per-category map).
// This wave APPLIES the existing SYSTEM (demo-private, zero src/ paint): the front
// door + the 11 section landings reach the audacious display rung, each category gets
// a DISTINCT {icon, sectionHue, heroPalette, bgKind} from the ONE CATEGORY_HERO map,
// the redirect cards compose the shipped <IconChip> (NO re-paste) + an inline non-text
// preview + the Fira-Code subpath chip, and the per-category hue is the ONE color event
// (chip + eyebrow ONLY — the title + body stay warm ink, the herostudios restraint).
//
// SEVEN falsifiable device-free SOURCE witnesses (each born-RED on HEAD's starved/
// iconless/identical heroes → GREEN at close), + a per-clause self-test bite + the
// binding π readback (tests-visual/hero-audacious.spec.ts — the orchestrator's live
// capture: the font-size ≥160px / hasSvgIcon / hue-spread bars pixel-read on :5199):
//
//   HA1 — THE AUDACIOUS RUNG REACHES THE HEROES. The manifest front-door hero
//         resolves heroScale="mega" (the D0 root) and the substrate marquee heroes
//         resolve ≥"5"; the front-door intro.vue hand-authored hero <h1> reads
//         `text-display-mega`; NO hero <h1> is pinned at the retired `text-display-3`.
//   HA2 — THE REDIRECT CARDS COMPOSE THE SHIPPED <IconChip>. intro.vue + SectionLanding
//         render <SectionPreviewCard> with `:icon` + `:section`, and SectionPreviewCard
//         composes the shipped <IconChip> (imported from custom/icon-chip) — NO inline
//         `:style` chip re-paste (the proof:icon-chip D4 anti-fork bite).
//   HA3 — THE CATEGORY_HERO MAP BINDS ≥3 DISTINCT PALETTES. category-hero.ts exists
//         with 11 categories, each {icon, sectionHue, heroPalette, bgKind}; ≥3 DISTINCT
//         per-category sectionHues resolve. The map composes the section-color leaf
//         derivation (sectionColorToHeroPalette → cssToOklch; no re-rolled OKLCh math).
//   HA4 — THE ONE-COLOR-EVENT RESTRAINT HOLDS. The hero/landing/card SFCs carry NO
//         body `<p>`/title tinted off a `--section-color`/`--viz`/`--chart`/gold token
//         (the per-category hue is the IconChip + eyebrow ONLY); proof:suffuse d1-d3 is
//         the binding harness (run separately). The negative-predicate guard.
//   HA5 — THE 11 SECTION LANDINGS REACH D1 + BIND THE PER-CATEGORY DESCRIPTOR. The
//         manifest sectionLanding resolves heroScale: "hero" / depth: "D1" (the LARGEST
//         per-band rung), and SectionLanding.vue composes the CATEGORY_HERO {icon,
//         sectionHue} + the section-root subpath chip + the bento <SectionPreviewCard>
//         grid. A synthetic landing below D1 reds.
//   HA6 — THE INLINE LIVE MINI-PREVIEW (the user-mandate "not a text link"). Every
//         <SectionPreviewCard> consumer (intro + SectionLanding) passes a `#preview`
//         slot rendering a real element (NOT a text-only link), and the card's
//         `.section-preview-card-preview` is `pointer-events: none` + `inert` (the
//         one-GL budget — a live-GL target's preview is a single-paint still).
//   HA7 — THE SUBPATH CHIP. Every <SectionPreviewCard> renders the route subpath in a
//         `.fira-code` chip (the SectionPreviewCard `subpath` source), and every
//         consumer passes `:subpath`. Born-RED: HEAD showed title+blurb only.
//
// House style mirrors proof-grid-simple.mjs: ESM .mjs, comment-strip first (the
// false-witness discipline), a pure exported detector, a byte-stable JSON artefact via
// gate-output, a human summary, process.exit(1) on any violation, + the per-clause
// self-test bites run from `run()`.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

/** Strip <!-- --> + /* *​/ + // comments so a Vue/TS witness never matches prose. */
function stripComments(src) {
    return src
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

function safeRead(p) {
    try {
        return readFileSync(p, "utf8");
    } catch {
        return "";
    }
}

// A body `<p>`/run carrying a section/viz/chart/gold COLOR tint (the one-color-event
// violation — the body must stay warm ink). A `color:`/`fill`/`stroke`/`background`/
// `text-(--section…)` channel reaching a `--section-color`/`--viz`/`--chart`/`--color-gold`
// token on a paragraph or value run. We scope to the `<p …>`/body register: the IconChip
// + the eyebrow LEGITIMATELY carry the hue, so the gate flags a tint on a `<p>` / a
// `text-display`/title element, never the chip/eyebrow.
const BODY_TINT_RE =
    /<p[^>]*\b(?:class|style)="[^"]*(?:--section-color|--viz-|--chart-|--color-gold|text-\(--section)/i;

/**
 * Pure detector — given the source strings, return { facts, violations }.
 */
export function detectHeroAudacious(sources) {
    const {
        manifestTs,
        introVue,
        sectionLandingVue,
        sectionPreviewCardVue,
        categoryHeroTs,
        auroraHeroTs,
        storyHeroVue,
        storyPageVue,
    } = sources;
    const facts = {};
    const violations = [];

    const manifest = stripComments(manifestTs);
    const intro = stripComments(introVue);
    const landing = stripComments(sectionLandingVue);
    const card = stripComments(sectionPreviewCardVue);
    const catHero = stripComments(categoryHeroTs);
    const auroraHero = stripComments(auroraHeroTs);
    const hero = stripComments(storyHeroVue);
    const page = stripComments(storyPageVue);

    // ── HA1 — the audacious rung reaches the heroes ─────────────────────────────
    facts.ha1 = {};
    // The front-door hand-authored hero <h1> reads the audacious mega rung.
    facts.ha1.frontDoorMega = /text-display-mega\b/.test(intro);
    // The manifest front-door row resolves heroScale "mega" (the D0 root — assignDepths
    // floors D0 → "mega").
    facts.ha1.manifestD0Mega =
        /depth\s*===\s*"D0"\s*\?\s*"mega"/.test(manifest) ||
        /heroScale\s*=\s*\n?\s*depth\s*===\s*"D0"\s*\?\s*"mega"/.test(manifest);
    // The substrate marquee mains keep the largest sub-rung — at least 4 explicit
    // `heroScale: "hero"` rows in the manifest (aurora/blob/constellation/fourier/…).
    const heroScaleHeroRows = (manifest.match(/heroScale:\s*"hero"/g) || []).length;
    facts.ha1.marqueeHeroRows = heroScaleHeroRows;
    facts.ha1.marqueeHeroEnough = heroScaleHeroRows >= 4;
    // The chassis renders the hero <h1> off the per-route `heroScale` rung (no hardcoded
    // `text-display-3` literal survives on a hero <h1> in StoryHero/StoryPage/intro).
    facts.ha1.chassisRungIsDynamic =
        /text-display-\$\{(?:props\.)?heroScale\}/.test(hero) &&
        /text-display-\$\{heroScale\}/.test(page);
    facts.ha1.noPinnedDisplay3 =
        !/\btext-display-3\b/.test(hero) &&
        !/\btext-display-3\b/.test(page) &&
        !/\btext-display-3\b/.test(intro);

    if (!facts.ha1.frontDoorMega)
        violations.push(
            "HA1: the front-door intro.vue hero <h1> must read `text-display-mega` (the D0 audacious root — 177px peak; the retired text-display-4 starved it)",
        );
    if (!facts.ha1.manifestD0Mega)
        violations.push(
            "HA1: the manifest must resolve the D0 front-door hero to heroScale=\"mega\" (the depth-keyed ladder root)",
        );
    if (!facts.ha1.marqueeHeroEnough)
        violations.push(
            `HA1: too few marquee heroScale:"hero" rows (${heroScaleHeroRows} < 4) — the substrate marquee mains must keep the largest sub-rung`,
        );
    if (!facts.ha1.chassisRungIsDynamic)
        violations.push(
            "HA1: the chassis hero <h1> must render off the per-route `text-display-${heroScale}` rung (StoryHero + StoryPage), never a hardcoded literal",
        );
    if (!facts.ha1.noPinnedDisplay3)
        violations.push(
            "HA1: a hero <h1> still pins the retired `text-display-3` rung — every hero resolves ≥ text-display-4",
        );

    // ── HA2 — the redirect cards compose the shipped <IconChip> ─────────────────
    facts.ha2 = {};
    // SectionPreviewCard composes the shipped IconChip (imported from custom/icon-chip).
    facts.ha2.cardImportsIconChip =
        /import\s*\{\s*IconChip\s*\}\s*from\s*['"][^'"]*custom\/icon-chip['"]/.test(
            card,
        );
    facts.ha2.cardRendersIconChip = /<IconChip\b/.test(card);
    // The consumers pass `:icon` + `:section` to the card (the per-category POP).
    facts.ha2.introPassesIcon =
        /<SectionPreviewCard[\s\S]*?:icon=/.test(intro) &&
        /<SectionPreviewCard[\s\S]*?:section=/.test(intro);
    facts.ha2.landingPassesIcon =
        /<SectionPreviewCard[\s\S]*?:icon=/.test(landing) &&
        /<SectionPreviewCard[\s\S]*?:section=/.test(landing);
    // NO inline `:style` chip re-paste — a hand-rolled `color-mix(… --section-color …
    // 25%, transparent)` backplate in a consumer (the D4 anti-fork; the IconChip owns
    // the recipe). We flag an inline backplate color-mix in intro/landing.
    const INLINE_CHIP_REPASTE =
        /:style="[^"]*color-mix\([^"]*--section-color[^"]*(?:25|40)%/.test(intro) ||
        /:style="[^"]*color-mix\([^"]*--section-color[^"]*(?:25|40)%/.test(landing);
    facts.ha2.noInlineRepaste = !INLINE_CHIP_REPASTE;

    if (!(facts.ha2.cardImportsIconChip && facts.ha2.cardRendersIconChip))
        violations.push(
            "HA2: <SectionPreviewCard> must import + render the shipped <IconChip> from custom/icon-chip (the ONE icon-chip recipe — never a re-paste)",
        );
    if (!facts.ha2.introPassesIcon)
        violations.push(
            "HA2: intro.vue must pass `:icon` + `:section` to every <SectionPreviewCard> (the per-category POP — HEAD rendered no icon)",
        );
    if (!facts.ha2.landingPassesIcon)
        violations.push(
            "HA2: SectionLanding.vue must pass `:icon` + `:section` to every <SectionPreviewCard>",
        );
    if (!facts.ha2.noInlineRepaste)
        violations.push(
            "HA2: a consumer inline `:style` color-mix chip backplate re-paste survives — compose the shipped <IconChip>, never re-paste the recipe (D4 anti-fork)",
        );

    // ── HA3 — the CATEGORY_HERO map binds ≥3 distinct palettes ──────────────────
    facts.ha3 = {};
    facts.ha3.mapExists = /export const CATEGORY_HERO\s*[:=]/.test(catHero);
    // Count the per-category descriptor blocks — each names {icon, sectionHue,
    // heroPalette, bgKind}. Count the sectionHue entries + extract the distinct hues.
    const sectionHueVals = [...catHero.matchAll(/sectionHue:\s*(\d+)/g)].map((m) =>
        Number(m[1]),
    );
    facts.ha3.categoryCount = sectionHueVals.length;
    facts.ha3.distinctHues = new Set(sectionHueVals).size;
    facts.ha3.elevenCategories = sectionHueVals.length === 11;
    facts.ha3.atLeast3Distinct = facts.ha3.distinctHues >= 3;
    // Each descriptor carries the four fields.
    facts.ha3.bindsIcon = (catHero.match(/icon:\s*\w+/g) || []).length >= 11;
    facts.ha3.bindsHeroPalette = (catHero.match(/heroPalette:\s*"/g) || []).length >= 11;
    facts.ha3.bindsBgKind = (catHero.match(/bgKind:\s*"/g) || []).length >= 11;
    // The palette is DERIVED from the section-color leaf (no re-rolled OKLCh math):
    // aurora-hero composes `cssToOklch` in `sectionColorToHeroPalette`.
    facts.ha3.derivesFromLeaf =
        /export function sectionColorToHeroPalette/.test(auroraHero) &&
        /cssToOklch\(/.test(auroraHero) &&
        /from\s+['"][^'"]*composables\/color['"]/.test(auroraHero);

    if (!facts.ha3.mapExists)
        violations.push(
            "HA3: category-hero.ts must export the `CATEGORY_HERO` map (the per-category distinctness source)",
        );
    if (!facts.ha3.elevenCategories)
        violations.push(
            `HA3: the CATEGORY_HERO map must bind all 11 categories (${sectionHueVals.length} sectionHue entries found)`,
        );
    if (!facts.ha3.atLeast3Distinct)
        violations.push(
            `HA3: the map must bind ≥3 DISTINCT per-category sectionHues (${facts.ha3.distinctHues} distinct — HEAD wired ONE palette)`,
        );
    if (!(facts.ha3.bindsIcon && facts.ha3.bindsHeroPalette && facts.ha3.bindsBgKind))
        violations.push(
            "HA3: each CATEGORY_HERO descriptor must bind {icon, sectionHue, heroPalette, bgKind} for all 11 categories",
        );
    if (!facts.ha3.derivesFromLeaf)
        violations.push(
            "HA3: `sectionColorToHeroPalette` must compose the `/color` leaf `cssToOklch` (no re-rolled OKLCh math — proof:single-color-core holds)",
        );

    // ── HA4 — the one-color-event restraint holds ───────────────────────────────
    facts.ha4 = {};
    // No body `<p>` / title run carries a section/viz/chart/gold COLOR tint in the
    // hero authoring surfaces (the per-category hue is the IconChip + eyebrow ONLY).
    facts.ha4.introBodyInk = !BODY_TINT_RE.test(intro);
    facts.ha4.landingBodyInk = !BODY_TINT_RE.test(landing);
    // The title rung itself is NOT color-tinted (the display <h1> reads `text-foreground`,
    // never a `--section-color`). Check the front-door hero <h1> carries `text-foreground`.
    facts.ha4.titleStaysInk =
        /text-display-mega[^"]*text-foreground|text-foreground[^"]*text-display-mega/.test(
            intro,
        );

    if (!facts.ha4.introBodyInk)
        violations.push(
            "HA4: intro.vue carries a body `<p>` tinted off a --section-color/--viz/--chart/--color-gold token — the body stays warm ink (one-color-event restraint; proof:suffuse d1)",
        );
    if (!facts.ha4.landingBodyInk)
        violations.push(
            "HA4: SectionLanding.vue carries a body run tinted off a section/viz/chart/gold token — the body stays warm ink",
        );
    if (!facts.ha4.titleStaysInk)
        violations.push(
            "HA4: the front-door audacious hero <h1> must read `text-foreground` (the title stays warm ink — the hue lives in the chip + eyebrow ONLY)",
        );

    // ── HA5 — the 11 section landings reach D1 + bind the per-category descriptor ─
    facts.ha5 = {};
    // The manifest sectionLanding resolves heroScale: "hero" / depth: "D1".
    facts.ha5.landingHeroScale = /heroScale:\s*"hero"/.test(manifest);
    facts.ha5.landingDepthD1 =
        /sectionLanding\([\s\S]*?depth:\s*"D1"/.test(manifest) ||
        /depth:\s*"D1"/.test(manifest);
    // SectionLanding.vue composes the CATEGORY_HERO {icon, sectionHue} (via categoryHero).
    facts.ha5.landingReadsCategoryHero =
        /from\s+['"]\.\/category-hero['"]/.test(landing) &&
        /categoryHero\(/.test(landing);
    // … renders the bento <SectionPreviewCard> grid + the section-root subpath chip.
    facts.ha5.landingRendersGrid = /<SectionPreviewCard\b/.test(landing);
    facts.ha5.landingRendersSubpath = /:subpath=/.test(landing);
    // The router renders the SectionLanding for the /<category> route (the D1 hero) —
    // the StoryHero at variant="hero" with the landing's heroScale.
    facts.ha5.landingIsHeroVariant =
        /<StoryHero[\s\S]*?variant="hero"/.test(landing) &&
        /:hero-scale="landing\.heroScale"/.test(landing);

    if (!facts.ha5.landingHeroScale)
        violations.push(
            "HA5: the manifest sectionLanding must resolve heroScale: \"hero\" (the D1 LARGEST per-band rung)",
        );
    if (!facts.ha5.landingDepthD1)
        violations.push(
            "HA5: the manifest sectionLanding must resolve depth: \"D1\"",
        );
    if (!facts.ha5.landingReadsCategoryHero)
        violations.push(
            "HA5: SectionLanding.vue must read the CATEGORY_HERO descriptor (the per-category {icon, sectionHue})",
        );
    if (!(facts.ha5.landingRendersGrid && facts.ha5.landingRendersSubpath))
        violations.push(
            "HA5: SectionLanding.vue must render the bento <SectionPreviewCard> grid + the section-root subpath chip",
        );
    if (!facts.ha5.landingIsHeroVariant)
        violations.push(
            "HA5: SectionLanding.vue must render the D1 StoryHero (variant=\"hero\" + :hero-scale=\"landing.heroScale\")",
        );

    // ── HA6 — the inline live mini-preview (not a text link) ────────────────────
    facts.ha6 = {};
    // SectionPreviewCard renders the `#preview` slot as a bounded inert element.
    facts.ha6.cardHasPreviewSlot = /<slot\s+name="preview"/.test(card);
    facts.ha6.previewInert = /section-preview-card-preview/.test(card) && /\binert\b/.test(card);
    // The preview is pointer-events: none (the one-GL budget — a thumbnail, not a click
    // target / a second running context).
    facts.ha6.previewPointerNone =
        /\.section-preview-card-preview\s*\{[^}]*pointer-events:\s*none/.test(card);
    // Both consumers pass a `#preview` slot rendering a REAL element (not a text-only link).
    facts.ha6.introPassesPreview = /<template\s+#preview>/.test(intro);
    facts.ha6.landingPassesPreview = /<template\s+#preview>/.test(landing);

    if (!facts.ha6.cardHasPreviewSlot)
        violations.push(
            "HA6: <SectionPreviewCard> must render a `#preview` slot (the inline non-text mini-preview)",
        );
    if (!facts.ha6.previewInert)
        violations.push(
            "HA6: the preview must be `inert` (a thumbnail, not interactive)",
        );
    if (!facts.ha6.previewPointerNone)
        violations.push(
            "HA6: the `.section-preview-card-preview` must be `pointer-events: none` (the one-GL budget — the whole card is the link)",
        );
    if (!(facts.ha6.introPassesPreview && facts.ha6.landingPassesPreview))
        violations.push(
            "HA6: every consumer (intro + SectionLanding) must pass a `#preview` slot rendering a real element — NOT a text-only link",
        );

    // ── HA7 — the subpath chip ──────────────────────────────────────────────────
    facts.ha7 = {};
    // SectionPreviewCard renders the subpath in a `.fira-code` chip.
    facts.ha7.cardRendersFiraCode =
        /fira-code[^>]*section-preview-card-subpath|class="fira-code/.test(card) &&
        /\{\{\s*subpath\s*\}\}/.test(card);
    // Both consumers pass `:subpath`.
    facts.ha7.introPassesSubpath = /:subpath=/.test(intro);
    facts.ha7.landingPassesSubpath = /:subpath=/.test(landing);

    if (!facts.ha7.cardRendersFiraCode)
        violations.push(
            "HA7: <SectionPreviewCard> must render the route subpath in a `.fira-code` chip (HEAD showed title+blurb only)",
        );
    if (!(facts.ha7.introPassesSubpath && facts.ha7.landingPassesSubpath))
        violations.push(
            "HA7: every consumer (intro + SectionLanding) must pass `:subpath` to the card",
        );

    return { facts, violations };
}

// ── The per-clause self-test bites: a synthetic GOOD corpus, each mutated to a
//    planted violation, asserted to RED its clause through the PURE detector. ──────
function selfTest() {
    const goodManifest = `
        function assignDepths(categories) {
            for (const cat of categories) {
                if (!story.heroScale) {
                    story.heroScale = depth === "D0" ? "mega" : depth === "D2" ? "5" : "4";
                }
            }
        }
        const a = { heroScale: "hero" }; const b = { heroScale: "hero" };
        const c = { heroScale: "hero" }; const d = { heroScale: "hero" };
        function sectionLanding(cat) { return { heroScale: "hero", depth: "D1" }; }
    `;
    const goodIntro = `
        import { categoryHero } from "../category-hero";
        <h1 class="text-display-mega mb-8 text-foreground">Title</h1>
        <SectionPreviewCard :to="x" :icon="cat.icon" :section="cat.section" :subpath="cat.subpath">
          <template #preview><div class="intro-cat-thumb"><Comp /></div></template>
        </SectionPreviewCard>
    `;
    const goodLanding = `
        import { categoryHero } from "./category-hero";
        const hero = computed(() => categoryHero(id));
        <StoryHero variant="hero" :hero-scale="landing.heroScale">
          <SectionPreviewCard :icon="sectionIcon" :section="sectionHue" :subpath="story.subpath">
            <template #preview><div class="section-preview-thumb"><Comp /></div></template>
          </SectionPreviewCard>
        </StoryHero>
    `;
    const goodCard = `
        import { IconChip } from "../../src/components/custom/icon-chip";
        <IconChip v-if="icon" :icon="icon" :section="section" />
        <code class="fira-code section-preview-card-subpath">{{ subpath }}</code>
        <div class="section-preview-card-preview" inert aria-hidden="true"><slot name="preview" /></div>
        .section-preview-card-preview { pointer-events: none; }
    `;
    const goodCatHero = `
        export const CATEGORY_HERO = {
            foundations: { icon: Compass, sectionHue: 7, heroPalette: "cat-foundations", bgKind: "paper" },
            substrates: { icon: Droplet, sectionHue: 3, heroPalette: "cat-substrates", bgKind: "aurora" },
            forms: { icon: FormInput, sectionHue: 2, heroPalette: "cat-forms", bgKind: "grid" },
            display: { icon: Shapes, sectionHue: 5, heroPalette: "cat-display", bgKind: "paper" },
            containers: { icon: Boxes, sectionHue: 9, heroPalette: "cat-containers", bgKind: "grid" },
            navigation: { icon: Navigation, sectionHue: 11, heroPalette: "cat-navigation", bgKind: "aurora" },
            dock: { icon: PanelBottom, sectionHue: 6, heroPalette: "cat-dock", bgKind: "grid" },
            data: { icon: Database, sectionHue: 1, heroPalette: "cat-data", bgKind: "grid" },
            feedback: { icon: Bell, sectionHue: 8, heroPalette: "cat-feedback", bgKind: "paper" },
            motion: { icon: Sparkles, sectionHue: 12, heroPalette: "cat-motion", bgKind: "constellation" },
            compositions: { icon: LayoutDashboard, sectionHue: 4, heroPalette: "cat-compositions", bgKind: "grid" },
        };
    `;
    const goodAuroraHero = `
        import { cssToOklch } from "../../src/composables/color";
        export function sectionColorToHeroPalette(n) { const { h, C } = cssToOklch(css); return []; }
    `;
    const goodHero = `<h1 :class="cn('story-hero-title', \`text-display-\${props.heroScale}\`)">{{ title }}</h1>`;
    const goodPage = `<h1 :class="cn('story-hero-title', \`text-display-\${heroScale}\`)">{{ title }}</h1>`;

    const base = {
        manifestTs: goodManifest,
        introVue: goodIntro,
        sectionLandingVue: goodLanding,
        sectionPreviewCardVue: goodCard,
        categoryHeroTs: goodCatHero,
        auroraHeroTs: goodAuroraHero,
        storyHeroVue: goodHero,
        storyPageVue: goodPage,
    };

    const baseRun = detectHeroAudacious(base);
    const bites = [];

    // Bite HA1 — a front-door pinned `text-display-3` (no mega) reds HA1.
    bites.push({
        name: "HA1: front-door pinned text-display-3",
        red: detectHeroAudacious({
            ...base,
            introVue: goodIntro.replace("text-display-mega", "text-display-3"),
        }).violations.some((v) => v.startsWith("HA1")),
    });
    // Bite HA1b — a hardcoded `text-display-3` literal in the chassis reds HA1.
    bites.push({
        name: "HA1: chassis hardcoded text-display-3",
        red: detectHeroAudacious({
            ...base,
            storyHeroVue: '<h1 class="story-hero-title text-display-3">{{ title }}</h1>',
        }).violations.some((v) => v.startsWith("HA1")),
    });
    // Bite HA2 — the card not importing IconChip reds HA2.
    bites.push({
        name: "HA2: card without IconChip import",
        red: detectHeroAudacious({
            ...base,
            sectionPreviewCardVue: goodCard.replace(
                'import { IconChip } from "../../src/components/custom/icon-chip";',
                "",
            ),
        }).violations.some((v) => v.startsWith("HA2")),
    });
    // Bite HA2b — an inline chip re-paste in a consumer reds HA2.
    bites.push({
        name: "HA2: inline chip re-paste",
        red: detectHeroAudacious({
            ...base,
            introVue:
                goodIntro +
                '\n<div :style="background: color-mix(in srgb, var(--section-color-7) 25%, transparent)" />',
        }).violations.some((v) => v.startsWith("HA2")),
    });
    // Bite HA3 — a map with <3 distinct hues reds HA3.
    bites.push({
        name: "HA3: <3 distinct hues",
        red: detectHeroAudacious({
            ...base,
            categoryHeroTs: goodCatHero.replace(/sectionHue:\s*\d+/g, "sectionHue: 7"),
        }).violations.some((v) => v.startsWith("HA3")),
    });
    // Bite HA3b — the derivation not composing cssToOklch reds HA3.
    bites.push({
        name: "HA3: derivation without cssToOklch",
        red: detectHeroAudacious({
            ...base,
            auroraHeroTs: goodAuroraHero.replace(/cssToOklch\([^)]*\)/g, "rawHue()"),
        }).violations.some((v) => v.startsWith("HA3")),
    });
    // Bite HA4 — a body <p> tinted off a --section-color reds HA4.
    bites.push({
        name: "HA4: body <p> section-color tint",
        red: detectHeroAudacious({
            ...base,
            introVue:
                goodIntro +
                '\n<p style="color: var(--section-color-7)">tinted body</p>',
        }).violations.some((v) => v.startsWith("HA4")),
    });
    // Bite HA5 — the landing not at D1 reds HA5.
    bites.push({
        name: "HA5: landing below D1",
        red: detectHeroAudacious({
            ...base,
            manifestTs: goodManifest.replace(
                'return { heroScale: "hero", depth: "D1" };',
                'return { heroScale: "4", depth: "D3" };',
            ),
        }).violations.some((v) => v.startsWith("HA5")),
    });
    // Bite HA6 — a preview without pointer-events: none reds HA6.
    bites.push({
        name: "HA6: preview not pointer-events: none",
        red: detectHeroAudacious({
            ...base,
            sectionPreviewCardVue: goodCard.replace(
                ".section-preview-card-preview { pointer-events: none; }",
                ".section-preview-card-preview { display: grid; }",
            ),
        }).violations.some((v) => v.startsWith("HA6")),
    });
    // Bite HA6b — a consumer with no #preview slot reds HA6.
    bites.push({
        name: "HA6: consumer with no #preview slot",
        red: detectHeroAudacious({
            ...base,
            introVue: goodIntro.replace(/<template #preview>[\s\S]*?<\/template>/, ""),
        }).violations.some((v) => v.startsWith("HA6")),
    });
    // Bite HA7 — the card without a .fira-code subpath chip reds HA7.
    bites.push({
        name: "HA7: card without fira-code subpath chip",
        red: detectHeroAudacious({
            ...base,
            sectionPreviewCardVue: goodCard.replace(
                '<code class="fira-code section-preview-card-subpath">{{ subpath }}</code>',
                "",
            ),
        }).violations.some((v) => v.startsWith("HA7")),
    });

    return { baseGreen: baseRun.violations.length === 0, baseRun, bites };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_HERO_AUDACIOUS_ARTIFACT",
        "BC-hero-audacious",
    );
    const sources = {
        manifestTs: safeRead(resolve(ROOT, "demo/stories/manifest.ts")),
        introVue: safeRead(resolve(ROOT, "demo/stories/foundations/intro.vue")),
        sectionLandingVue: safeRead(resolve(ROOT, "demo/stories/SectionLanding.vue")),
        sectionPreviewCardVue: safeRead(
            resolve(ROOT, "demo/stories/SectionPreviewCard.vue"),
        ),
        categoryHeroTs: safeRead(resolve(ROOT, "demo/stories/category-hero.ts")),
        auroraHeroTs: safeRead(resolve(ROOT, "demo/stories/aurora-hero.ts")),
        storyHeroVue: safeRead(resolve(ROOT, "demo/stories/StoryHero.vue")),
        storyPageVue: safeRead(resolve(ROOT, "demo/stories/StoryPage.vue")),
    };

    const { facts, violations } = detectHeroAudacious(sources);

    // The per-clause self-test bites — each planted violation MUST red its clause.
    const { baseGreen, baseRun, bites } = selfTest();
    const biteFailures = [];
    if (!baseGreen) {
        biteFailures.push("the synthetic GOOD corpus did not pass the detector");
        if (process.env.HERO_AUDACIOUS_DEBUG)
            console.error("BASE CORPUS VIOLATIONS:", baseRun.violations);
    }
    for (const b of bites) if (!b.red) biteFailures.push(b.name);
    facts.selfTest = {
        baseGreen,
        bites: bites.map((b) => ({ name: b.name, red: b.red })),
        allRed: biteFailures.length === 0,
    };
    if (biteFailures.length > 0)
        violations.push(
            `SELF-TEST: bite(s) did not RED their clause: ${biteFailures.join("; ")}`,
        );

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:hero-audacious",
        note: "SOURCE arm only — the captured-paint truth (the front-door <h1> ≥160px @≥1440px; each section landing <h1> ≥220px out-sizing its band's D2/D3; each <SectionPreviewCard> hasSvgIcon + a .fira-code chip + a non-empty inert preview + the hover-lift; ≥3 distinct per-category hues; the landing mounts ≤1 live-GL context) is tests-visual/hero-audacious.spec.ts (the π arm, orchestrator-driven), never this gate alone. Couples proof:customizability-census C4 (flipped GREEN by the chassis heroScale axis) + proof:suffuse d1-d3 (the one-color-event harness).",
        facts,
        violations,
    });

    const yn = (b) => (b ? "YES" : "NO");
    console.log(
        "proof:hero-audacious — the herostudios audacious-type heroes, per-category icons, each DISTINCT (BC.W-HERO-AUDACIOUS)",
    );
    console.log(
        `  HA1 audacious rung reaches heroes : ${yn(
            facts.ha1.frontDoorMega &&
                facts.ha1.manifestD0Mega &&
                facts.ha1.marqueeHeroEnough &&
                facts.ha1.chassisRungIsDynamic &&
                facts.ha1.noPinnedDisplay3,
        )}  (${facts.ha1.marqueeHeroRows} marquee hero rows)`,
    );
    console.log(
        `  HA2 redirect cards compose IconChip: ${yn(
            facts.ha2.cardImportsIconChip &&
                facts.ha2.cardRendersIconChip &&
                facts.ha2.introPassesIcon &&
                facts.ha2.landingPassesIcon &&
                facts.ha2.noInlineRepaste,
        )}`,
    );
    console.log(
        `  HA3 CATEGORY_HERO ≥3 distinct      : ${yn(
            facts.ha3.mapExists &&
                facts.ha3.elevenCategories &&
                facts.ha3.atLeast3Distinct &&
                facts.ha3.bindsIcon &&
                facts.ha3.bindsHeroPalette &&
                facts.ha3.bindsBgKind &&
                facts.ha3.derivesFromLeaf,
        )}  (${facts.ha3.categoryCount} cats / ${facts.ha3.distinctHues} distinct hues)`,
    );
    console.log(
        `  HA4 one-color-event restraint      : ${yn(
            facts.ha4.introBodyInk &&
                facts.ha4.landingBodyInk &&
                facts.ha4.titleStaysInk,
        )}`,
    );
    console.log(
        `  HA5 11 section landings reach D1   : ${yn(
            facts.ha5.landingHeroScale &&
                facts.ha5.landingDepthD1 &&
                facts.ha5.landingReadsCategoryHero &&
                facts.ha5.landingRendersGrid &&
                facts.ha5.landingRendersSubpath &&
                facts.ha5.landingIsHeroVariant,
        )}`,
    );
    console.log(
        `  HA6 inline live mini-preview       : ${yn(
            facts.ha6.cardHasPreviewSlot &&
                facts.ha6.previewInert &&
                facts.ha6.previewPointerNone &&
                facts.ha6.introPassesPreview &&
                facts.ha6.landingPassesPreview,
        )}`,
    );
    console.log(
        `  HA7 subpath chip                   : ${yn(
            facts.ha7.cardRendersFiraCode &&
                facts.ha7.introPassesSubpath &&
                facts.ha7.landingPassesSubpath,
        )}`,
    );
    console.log(
        `  self-test bites all RED            : ${yn(facts.selfTest.allRed)}  (${
            facts.selfTest.bites.length
        } bites)`,
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
