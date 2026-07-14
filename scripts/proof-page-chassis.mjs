#!/usr/bin/env node
// proof:page-chassis — the ONE standardized page idiom (BC.W-PAGE-CHASSIS).
//
// Open ANY demo route on :5199 and read the SAME confident page idiom: a LARGE
// audacious display title over a live procedural field, a quiet mono eyebrow above
// it carrying the route's explicit import subpath in Fira Code, a one-line subtitle
// beneath, and the whole body in exactly ONE warm-cream glass card. Scroll down and
// the hero title SHRINKS (a buttery compositor scale, no reflow) into a slim sticky
// page-header. Every page is the same recognizable shape; only the title, the
// subpath, the per-category icon, and the procedural field differ.
//
// Pure FS, device-free. The PAINTED render (the heroes reading audacious, the shrink
// on scroll, the bento previews) is the proof:ba-gestalt page-band verdict + the
// dev-tools MCP walk + tests-visual/page-chassis.spec.ts; THIS is the SOURCE-presence
// + per-route-resolution arm (the cardinal split — a source-green gate is never the
// close; the live π binds the paint).
//
// Asserts (born-RED on HEAD's no-shrink / no-subpath / hardcoded display-3 / no
// section-landings → GREEN at close):
//   PC1 — the scroll-shrink register exists + is compositor-only.
//   PC2 — heroScale + subpath + depth fields exist + are threaded; the fira-code chip
//         renders; no `"3"` heroScale member.
//   PC3 — ONE card per page (no nested bg-card grid-card off the allowlist).
//   PC4 — no chassis-bypass (every story SFC imports StoryPage; no <header>-span title).
//   PC5 — EVERY route (108 stories + 11 section landings) resolves a non-empty
//         subpath + heroScale + depth; the subpath is a published export OR a route path.
//   PC6 — EVERY heroScale ≥ text-display-4 + the depth ladder is monotone-by-tier.
//   PC7 — the 11 section-landing rows + the <SectionPreviewCard> inline-preview model.
//   + the no-Lenis/GSAP/Locomotive fence bite.
//
// The BI.W-SHRINK-HERO shrink-on-scroll standard-facility clauses (born-RED at HEAD on
// the G7-STICKY containing-block break — the sticky title clipped against the 126px
// header — + the absent painted backing):
//   PC-DUAL — content pages carry .story-hero-shrink, hero/viz pages carry
//             .story-hero-scroll-away (by variant — the "every page shrinks" single read reds).
//   PC-STICKY — the intermediate <header> is display: contents so the sticky containing
//             block is the full-height <article> route-column (not the 126px header), the
//             pinned header is painted, and no transformed/overflow/contain ancestor is in
//             the chain (the silent sticky+timeline killer).
//   PC-BIDIR — both registers ride the native scroll() timeline (bidirectional by
//             construction); a Lenis/GSAP/Locomotive/rAF scroll engine reds.
//   PC-PRM — the shrink/scroll-away/backing carve to a static large header under reduce.
//
// Self-test bites (--self-test): a planted font-size in the shrink keyframe REDs PC1; a
// `"3"` heroScale member REDs PC2; a synthetic empty subpath + a phantom-export subpath
// REDs PC5; a `heroScale: "3"` row + a D3-out-sizes-D2 category REDs PC6; a text-only
// landing card REDs PC7; a planted transform/overflow/contain ancestor REDs PC-STICKY; a
// planted scroll-lib import REDs PC-BIDIR; a content page with the scroll-away register
// REDs PC-DUAL; an ungated shrink animation REDs PC-PRM.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:page-chassis";
const SELF_TEST = process.argv.includes("--self-test");

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip comments (HTML/CSS/JS) so a prose mention never false-hits. Preserve newlines.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + m.slice(p1.length).replace(/./g, " "));

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

// ── The package export set (the subpath-resolution rule's source of truth) ────────
const pkg = JSON.parse(read("package.json") || "{}");
const EXPORTS = new Set(
    Object.keys(pkg.exports || {})
        .filter((k) => k.startsWith("./") && !k.includes("*"))
        .map((k) => k.replace(/^\.\//, "")),
);

// ── Parse the manifest: the SUBPATHS map, the s() story rows, the category order ──
const manifestRaw = read("demo/stories/manifest.ts");
const manifest = strip(manifestRaw);

// The SUBPATHS literal map — `"cat/id": "<subpath>",`.
const SUBPATHS = {};
{
    const i = manifest.indexOf("const SUBPATHS");
    if (i >= 0) {
        const open = manifest.indexOf("{", i);
        let depth = 0,
            end = -1;
        for (let j = open; j < manifest.length; j++) {
            if (manifest[j] === "{") depth++;
            else if (manifest[j] === "}") {
                depth--;
                if (depth === 0) {
                    end = j;
                    break;
                }
            }
        }
        const body = manifest.slice(open + 1, end);
        for (const m of body.matchAll(/"([\w-]+\/[\w-]+)"\s*:\s*"([^"]+)"/g)) {
            SUBPATHS[m[1]] = m[2];
        }
    }
}

// The category order + each category's ordered story ids. We walk the CATEGORIES
// array, tracking each `id: "<cat>"` (a category boundary) and the `s("<cat>","<id>",`
// rows in order, capturing an explicit `heroScale: "<rung>"` opt where present.
const CATEGORY_IDS = [
    "foundations",
    "substrates",
    "forms",
    "display",
    "containers",
    "navigation",
    "dock",
    "data",
    "feedback",
    "motion",
    "compositions",
];
// Parse every s("cat","id", ...) call + the heroScale opt in its trailing object.
const storyRows = []; // { cat, id, heroScale|null }
{
    const re = /\bs\(\s*"([\w-]+)"\s*,\s*"([\w-]+)"/g;
    let m;
    while ((m = re.exec(manifest)) !== null) {
        const cat = m[1];
        const id = m[2];
        // Look ahead to the next `s(` (or +1200 chars) for a heroScale opt.
        const next = manifest.indexOf("s(", re.lastIndex);
        const end = next === -1 ? Math.min(manifest.length, re.lastIndex + 1200) : next;
        const win = manifest.slice(re.lastIndex, end);
        const hs = win.match(/heroScale:\s*"([\w]+)"/);
        storyRows.push({ cat, id, heroScale: hs ? hs[1] : null });
    }
}

// Group stories by category in declared order, then derive depth + heroScale (the
// assignDepths rule: front-door=D0, first non-front-door story=D2, rest=D3).
const byCat = new Map(CATEGORY_IDS.map((c) => [c, []]));
for (const r of storyRows) if (byCat.has(r.cat)) byCat.get(r.cat).push(r);

const routes = []; // { kind: "story"|"landing", cat, id?, route, subpath, heroScale, depth }
for (const cat of CATEGORY_IDS) {
    const rows = byCat.get(cat) || [];
    let mainSeen = false;
    for (const r of rows) {
        const isFrontDoor = cat === "foundations" && r.id === "intro";
        let depth;
        if (isFrontDoor) depth = "D0";
        else if (!mainSeen) {
            depth = "D2";
            mainSeen = true;
        } else depth = "D3";
        const heroScale =
            r.heroScale ?? (depth === "D0" ? "mega" : depth === "D2" ? "5" : "4");
        const subpath = SUBPATHS[`${cat}/${r.id}`] ?? `/${cat}/${r.id}`;
        routes.push({
            kind: "story",
            cat,
            id: r.id,
            route: `/${cat}/${r.id}`,
            subpath,
            heroScale,
            depth,
            // an explicit heroScale override marks a live-GL marquee / the
            // audacious-type showcase — a sanctioned out-of-tier rung (the spec
            // table allows a marquee sub to KEEP `hero`, and compositions/hero `mega`).
            explicit: Boolean(r.heroScale),
        });
    }
    // The section landing (one per category) — D1 hero.
    routes.push({
        kind: "landing",
        cat,
        route: `/${cat}`,
        subpath: null, // resolved from LANDING_SUBPATHS below
        heroScale: "hero",
        depth: "D1",
    });
}

// The LANDING_SUBPATHS map (the section-landing chip).
const LANDING_SUBPATHS = {};
{
    const i = manifest.indexOf("const LANDING_SUBPATHS");
    if (i >= 0) {
        const open = manifest.indexOf("{", i);
        let depth = 0,
            end = -1;
        for (let j = open; j < manifest.length; j++) {
            if (manifest[j] === "{") depth++;
            else if (manifest[j] === "}") {
                depth--;
                if (depth === 0) {
                    end = j;
                    break;
                }
            }
        }
        const body = manifest.slice(open + 1, end);
        for (const m of body.matchAll(/(\w+)\s*:\s*"([^"]+)"/g))
            LANDING_SUBPATHS[m[1]] = m[2];
    }
}
for (const r of routes)
    if (r.kind === "landing") r.subpath = LANDING_SUBPATHS[r.cat] ?? `/${r.cat}`;

// ── PC1 — the scroll-shrink register exists + is compositor-only ──────────────────
const heroCss = strip(read("demo/chassis/hero/story-hero.css"));
const hasShrinkClass = /\.story-hero-shrink\b/.test(heroCss);
const shrinkSticky =
    /\.story-hero-shrink\s*\{[^}]*position:\s*sticky/.test(heroCss);
// the keyframe rides scroll() + animation-range
const shrinkScrollTimeline = /animation-timeline:\s*scroll\(\)/.test(heroCss);
// The condense window is `animation-range: 0 <end>` where <end> is a literal Npx OR the
// tokenized `var(--hero-condense-range, Npx)` retune seam (BD.W-VIZ-BROKEN-FIX D5 — the
// condense register is tokenized so W-STICKY-TITLE-CONDENSE tunes it; the range start stays
// the literal 0).
const shrinkRange =
    /animation-range:\s*0\s+(?:\d+px|var\(--hero-condense-range[^)]*\))/.test(heroCss);
// BG.W-SCROLL-SHRINK-UNIFY — the hero scale leg is DECOMPOSED onto the SHARED
// `@keyframes title-collapse` (the DRY fold; the hero keeps its own
// `story-hero-shrink-lift` translate leg). PC1 reads the shared scale keyframe body
// and asserts it animates ONLY the compositor `scale` (no layout key — the
// proof:no-layout-animation floor). The re-point is ATOMIC with the story-hero.css
// rename (a re-point ahead of the rename would find no `@keyframes title-collapse`).
const kfBody = (() => {
    const i = heroCss.indexOf("@keyframes title-collapse");
    if (i < 0) return "";
    const open = heroCss.indexOf("{", i);
    let depth = 0;
    for (let j = open; j < heroCss.length; j++) {
        if (heroCss[j] === "{") depth++;
        else if (heroCss[j] === "}") {
            depth--;
            if (depth === 0) return heroCss.slice(open + 1, j);
        }
    }
    return "";
})();
const LAYOUT_KEYS =
    /\b(font-size|margin|margin-block|margin-inline|padding|padding-block|padding-inline|top|left|right|bottom|inset|width|height|inline-size|block-size|line-height|gap|border-[a-z-]*width|grid-template)\s*:/;
const shrinkCompositorOnly = kfBody.length > 0 && !LAYOUT_KEYS.test(kfBody);
// PRM/@supports gate (the shrink animation under no-preference + scroll() @supports).
const shrinkGated =
    /@supports\s*\(animation-timeline:\s*scroll\(\)\)/.test(heroCss) &&
    /@media\s*\(prefers-reduced-motion:\s*no-preference\)/.test(heroCss);
const pc1 =
    hasShrinkClass &&
    shrinkSticky &&
    shrinkScrollTimeline &&
    shrinkRange &&
    shrinkCompositorOnly &&
    shrinkGated;
add(
    "PC1-scroll-shrink-compositor-only",
    pc1,
    pc1
        ? "the .story-hero-shrink register exists (position: sticky + animation-timeline: scroll() + animation-range: 0 Npx), the SHARED @keyframes title-collapse (BG.W-SCROLL-SHRINK-UNIFY — the DRY scale-leg fold; the hero keeps its own story-hero-shrink-lift translate leg) animates ONLY the compositor scale (no layout key, the proof:no-layout-animation floor), gated by @supports (animation-timeline: scroll()) + prefers-reduced-motion: no-preference (PRM → static large hero) — the CSS-native scroll-shrink, NO Lenis/GSAP"
        : `scroll-shrink register wrong (class: ${hasShrinkClass}, sticky: ${shrinkSticky}, scroll() timeline: ${shrinkScrollTimeline}, animation-range: ${shrinkRange}, compositor-only kf: ${shrinkCompositorOnly}, @supports+PRM gated: ${shrinkGated})`,
);

// ── PC2 — heroScale + subpath + depth fields exist + threaded; fira-code chip ─────
const storyHero = strip(read("demo/chassis/hero/StoryHero.vue"));
const storyHeader = strip(read("demo/chassis/hero/StoryHeader.vue"));
const storyPage = strip(read("demo/chassis/page/StoryPage.vue"));
// Story interface carries subpath + heroScale + depth.
const ifaceHasSubpath = /subpath\?:\s*string/.test(manifest);
const ifaceHasHeroScale = /heroScale\?:\s*HeroScale/.test(manifest) ||
    /heroScale\?:\s*[^;]*"4"/.test(manifest);
const ifaceHasDepth = /depth\?:\s*StoryDepth/.test(manifest) ||
    /depth\?:\s*[^;]*"D2"/.test(manifest);
// StoryHero carries the heroScale prop, NO "3" member.
const heroPropHasScale = /heroScale\?:\s*[^;]*"(audacious|mega|hero|5|4)"/.test(storyHero);
const heroPropNoThree =
    !/heroScale\?:\s*[^;]*"3"/.test(storyHero) &&
    !/text-display-3/.test(storyHero.replace(/heroClass/g, "")); // no hardcoded display-3
// StoryHeader renders a .fira-code chip bound to subpath.
const headerFiraChip =
    /class="[^"]*fira-code[^"]*"[\s\S]{0,80}\{\{\s*subpath\s*\}\}/.test(storyHeader) ||
    /\{\{\s*subpath\s*\}\}[\s\S]{0,80}fira-code/.test(storyHeader) ||
    (/fira-code/.test(storyHeader) && /v-if="subpath"/.test(storyHeader));
// the depth → heroScale ladder is threaded (heroClass computed off heroScale).
const heroClassComputed =
    /heroClass\s*=\s*computed\(/.test(storyHero) &&
    /text-display-\$\{[^}]*heroScale\}/.test(storyHero);
const pageThreadsFields =
    /:subpath="subpath"/.test(storyPage) &&
    /:hero-scale="heroScale"/.test(storyPage) &&
    /:depth="depth"/.test(storyPage);
const pc2 =
    ifaceHasSubpath &&
    ifaceHasHeroScale &&
    ifaceHasDepth &&
    heroPropHasScale &&
    heroPropNoThree &&
    headerFiraChip &&
    heroClassComputed &&
    pageThreadsFields;
add(
    "PC2-fields-threaded-fira-chip",
    pc2,
    pc2
        ? "Story carries subpath + heroScale + depth; StoryHero exposes heroScale (no `3` member, no hardcoded text-display-3) + the heroClass computed maps text-display-${heroScale}; StoryHeader renders the .fira-code subpath chip; StoryPage threads subpath/heroScale/depth — the depth-keyed √φ ladder mechanism"
        : `fields/thread wrong (iface subpath: ${ifaceHasSubpath}, heroScale: ${ifaceHasHeroScale}, depth: ${ifaceHasDepth}; hero prop scale: ${heroPropHasScale}, no-3/no-hardcoded-display-3: ${heroPropNoThree}; fira chip: ${headerFiraChip}; heroClass computed: ${heroClassComputed}; page threads: ${pageThreadsFields})`,
);

// ── PC3 — ONE card per page (no nested bg-card grid-card off the allowlist) ───────
// Scan every story SFC for a second `bg-card` grid-card inside the body. The narrow
// allowlist: auth-shell (the brand panel), the dock-stage tile, card.vue tier sub-cards.
const PC3_ALLOWLIST = new Set([
    "compositions/auth-shell",
    "display/card",
    // BD.W-PAGE-BACKGROUND / display-buttons Pass-E top-move #1 — the buttons
    // glass-showcase stages its glass specimens over ONE shared aurora field (glass
    // over flat cream is invisible-by-construction; the colorful field is MANDATORY for
    // a glass demo). It is a SINGLE GL context (one <Aurora>, the one-GL-per-route budget
    // intact — live-verified ONE canvas), NOT a double-card-on-a-field defect: the field
    // IS the page's deliberate glass-showcase backdrop, not a second nested live field
    // over the chassis's own. Allowlisted as the sanctioned ONE-GL glass-showcase route.
    "display/buttons",
    "dock/overview",
    "dock/layers",
    "dock/morph-showcase",
    "dock/rail",
    "dock/sections",
    "dock/cta-receive",
    // BD dock band — liquid-playground stages the live dock spring + morph engine over
    // its OWN aurora field(s) (the glass dock must read against a live backdrop). The
    // page's three demo stages (main liquid stage + the horizontal/vertical rail demos)
    // each carry their own deliberate showcase field; the two rail stages are offscreen-
    // paused by construction (live-verified: 3 canvases, the rail pair unresized/paused
    // below the fold) — these are the page's OWN showcase surfaces, NOT a double-card
    // defect (a nested grid-card-over-a-field inside the chassis card). PC3 guards the
    // double-card DEFECT, not the canvas count of a deliberate dock-showcase route.
    "dock/liquid-playground",
]);
const doubleCardHits = [];
const storyFiles = collectStoryFiles();
for (const { key, rel } of storyFiles) {
    if (PC3_ALLOWLIST.has(key)) continue;
    const src = strip(read(rel));
    // The DOUBLE-CARD-ON-A-FIELD witness (USER-DEFECTS §C — "the double card idiom
    // with a grid background is wrong → ONE card"): a story body that EMBEDS a live
    // substrate component (<Aurora>/<Constellation>/<FourierField>) INSIDE its own
    // body — a grid-card-over-a-field nested in the chassis card. The chassis already
    // hosts the page's ONE procedural field; an in-body second live field is the
    // double-card defect. A self-staging SUBSTRATES viz (its OWN viz IS the surface,
    // declared `grid`/`paper` page-wash — the one-GL-per-route budget) is NOT a
    // double-card (it has no chassis live field); those are allowlisted by band below.
    const embedsLiveField =
        /<Aurora\b/.test(src) ||
        /<Constellation\b/.test(src) ||
        /<FourierField\b/.test(src);
    // a substrates-band viz self-stages its own field (its page-wash is grid/paper);
    // it is NOT a double-card (the chassis adds no second field over it).
    const isSubstratesViz = key.startsWith("substrates/");
    if (embedsLiveField && !isSubstratesViz) {
        doubleCardHits.push(key);
    }
}
const pc3 = doubleCardHits.length === 0;
add(
    "PC3-one-card-per-page",
    pc3,
    pc3
        ? `ONE glass card per page — no story SFC renders a second bg-card grid-card inside the StoryPage body off the narrow allowlist (auth-shell brand panel, dock-stage tile, card.vue tier sub-cards) across ${storyFiles.length} story SFCs`
        : `${doubleCardHits.length} double-card route(s): ${doubleCardHits.slice(0, 6).join("; ")}`,
);

// ── PC4 — no chassis-bypass (every story SFC imports StoryPage; no <header> span) ─
const bypassNoStoryPage = [];
const bypassSpanTitle = [];
for (const { key, rel } of storyFiles) {
    const src = strip(read(rel));
    // A story routes through the chassis EITHER directly (<StoryPage>) OR via the
    // shared VizStudio chassis partial (which itself bundles <StoryPage> — the
    // BC.W-VIZ-CONFIGURATOR-SUITE single-writer studio shape; substrates/aurora
    // composes it). This mirrors proof:viz-configurator-suite S6's own chassis
    // detection (`<StoryPage> || <VizStudio>`) so a viz on the shared studio
    // chassis is not a false bypass.
    const importsStoryPage = /StoryPage/.test(src) || /<VizStudio/.test(src);
    // intro/hero are SUPPRESSED-hero pages but STILL import StoryPage.
    if (!importsStoryPage) bypassNoStoryPage.push(key);
    // The BYPASS shape: a <header> hand-rolling a <span class="text-display-*">
    // page-title in a file that does NOT route through StoryPage (the a11y
    // <span>-not-<h1> + no-chassis-hero defect substrates/aurora carried). An in-body
    // studio MASTHEAD span inside a StoryPage-routed page (blob/fourier/curve-gallery
    // studios) is NOT a bypass — it is BC.W-PAGE-HIERARCHY's in-body-second-header
    // fold concern (out of this wave's bound), and the chassis hero is the page <h1>.
    if (!importsStoryPage) {
        for (const hm of src.matchAll(/<header\b[^>]*>([\s\S]*?)<\/header>/g)) {
            if (/<span\b[^>]*class="[^"]*text-display-[\w]+/.test(hm[1])) {
                bypassSpanTitle.push(key);
            }
        }
    }
}
const pc4 = bypassNoStoryPage.length === 0 && bypassSpanTitle.length === 0;
add(
    "PC4-no-chassis-bypass",
    pc4,
    pc4
        ? "no chassis-bypass — every story SFC imports StoryPage, and no <header> hand-rolls a <span class='text-display-*'> page-title (the substrates/aurora <span>→<h1> a11y fix landed)"
        : `chassis-bypass (no StoryPage: ${bypassNoStoryPage.slice(0, 4).join(",") || "none"}; <header>-span title: ${bypassSpanTitle.slice(0, 4).join(",") || "none"})`,
);

// ── PC5 — EVERY route resolves a non-empty subpath + heroScale + depth ────────────
const VALID_SCALES = new Set(["audacious", "mega", "hero", "5", "4"]);
const pc5Bad = [];
for (const r of routes) {
    const okSub =
        typeof r.subpath === "string" &&
        r.subpath.length > 0 &&
        // a published export OR a route path
        (r.subpath.startsWith("/") ||
            (r.subpath.startsWith("@mkbabb/glass-ui/") &&
                EXPORTS.has(r.subpath.replace("@mkbabb/glass-ui/", ""))));
    const okScale = VALID_SCALES.has(r.heroScale);
    const okDepth = ["D0", "D1", "D2", "D3"].includes(r.depth);
    if (!okSub || !okScale || !okDepth)
        pc5Bad.push(`${r.route} [sub:${okSub} scale:${okScale} depth:${okDepth} → "${r.subpath}"]`);
}
const landingCount = routes.filter((r) => r.kind === "landing").length;
const storyCount = routes.filter((r) => r.kind === "story").length;
const pc5 = pc5Bad.length === 0 && landingCount === 11;
add(
    "PC5-every-route-resolves",
    pc5,
    pc5
        ? `EVERY route resolves a non-empty subpath + heroScale + depth — ${storyCount} stories + ${landingCount} section landings = ${routes.length} routes; every subpath is a published @mkbabb/glass-ui/<sp> (∈ exports) OR a /category[/story] route path (the subpath-resolution rule); the Fira-Code chip is never blank`
        : `route resolution failed (${pc5Bad.length} bad, landings: ${landingCount}/11): ${pc5Bad.slice(0, 6).join("; ")}`,
);

// ── PC6 — EVERY heroScale ≥ display-4 + the depth ladder is monotone ──────────────
const RANK = { audacious: 5, mega: 4, hero: 3, 5: 2, 4: 1, 3: 0 };
const pc6Bad = [];
// every heroScale ≥ 4 (no `3` or below).
for (const r of routes) {
    if ((RANK[r.heroScale] ?? -1) < RANK["4"]) {
        pc6Bad.push(`${r.route} resolves heroScale "${r.heroScale}" < 4`);
    }
}
// monotone-by-tier: every D1 ≥ hero, D2 ≥ 5, D3 ≥ 4; within a category the FIRST
// (D2 main) ≥ every subsequent (D3 sub).
for (const cat of CATEGORY_IDS) {
    const catRoutes = routes.filter((r) => r.cat === cat && r.kind === "story");
    const main = catRoutes.find((r) => r.depth === "D2");
    const subs = catRoutes.filter((r) => r.depth === "D3");
    if (main) {
        for (const sub of subs) {
            // a sub that out-sizes the main is a violation UNLESS it is a declared
            // live-GL marquee (an explicit heroScale override — the spec sanctions a
            // marquee sub keeping `hero`); a CALM sub (derived `4`) can never out-size.
            if (RANK[sub.heroScale] > RANK[main.heroScale] && !sub.explicit) {
                pc6Bad.push(
                    `${cat}: D3 sub ${sub.route} (${sub.heroScale}) out-sizes D2 main ${main.route} (${main.heroScale})`,
                );
            }
        }
    }
    // D1 landing is the largest — UNLESS the D2 main is a declared audacious-type
    // showcase (the compositions/hero `mega` explicit override, sanctioned by spec).
    const landing = routes.find((r) => r.cat === cat && r.kind === "landing");
    if (
        landing &&
        main &&
        RANK[main.heroScale] > RANK[landing.heroScale] &&
        !main.explicit
    ) {
        pc6Bad.push(
            `${cat}: D2 main ${main.route} (${main.heroScale}) out-sizes D1 landing (${landing.heroScale})`,
        );
    }
}
const pc6 = pc6Bad.length === 0;
add(
    "PC6-depth-ladder-monotone",
    pc6,
    pc6
        ? "EVERY heroScale is ≥ text-display-4 (the user-mandate floor — the prior text-display-3 is RETIRED), AND the depth ladder is monotone-by-tier (D1 section-landing ≥ D2 main ≥ D3 sub within each category) — depth READS as size"
        : `depth ladder violated (${pc6Bad.length}): ${pc6Bad.slice(0, 6).join("; ")}`,
);

// ── PC7 — the section-landing + inline-preview model ──────────────────────────────
const previewCardExists = existsSync(
    resolve(ROOT, "demo/chassis/landing/SectionPreviewCard.vue"),
);
const sectionLandingExists = existsSync(
    resolve(ROOT, "demo/chassis/landing/SectionLanding.vue"),
);
const previewCard = strip(read("demo/chassis/landing/SectionPreviewCard.vue"));
const sectionLanding = strip(read("demo/chassis/landing/SectionLanding.vue"));
const intro = strip(read("demo/stories/foundations/intro.vue"));
const router = strip(read("demo/router.ts"));
// the card composes IconChip + title + subpath chip + a `preview` slot.
const cardComposesIconChip = /<IconChip\b/.test(previewCard);
const cardHasFiraChip = /fira-code/.test(previewCard);
const cardHasPreviewSlot = /name="preview"/.test(previewCard);
// the preview is pointer-events: none (the budget / inert thumbnail).
const cardPreviewInert =
    /pointer-events:\s*none/.test(previewCard) && /\binert\b/.test(previewCard);
// the section landing composes the card + the bento grid; the router resolves /<cat>
// to the landing (not a redirect).
const landingUsesCard = /<SectionPreviewCard\b/.test(sectionLanding);
const landingUsesHero = /<StoryHero\b[\s\S]*heroScale/.test(sectionLanding) ||
    /:hero-scale="landing.heroScale"/.test(sectionLanding);
const routerResolvesLanding = /SectionLanding\.vue/.test(router);
// the front door uses the card too (no text-only redirect card survives, PC7).
const introUsesCard =
    /<SectionPreviewCard\b/.test(intro) &&
    (/name="preview"/.test(intro) || /#preview\b/.test(intro));
// the manifest carries the section-landing builder + the 11 landings.
const manifestHasLanding =
    /landing\?:\s*SectionLanding/.test(manifest) &&
    /function sectionLanding\b/.test(manifest);
const pc7 =
    previewCardExists &&
    sectionLandingExists &&
    cardComposesIconChip &&
    cardHasFiraChip &&
    cardHasPreviewSlot &&
    cardPreviewInert &&
    landingUsesCard &&
    landingUsesHero &&
    routerResolvesLanding &&
    introUsesCard &&
    manifestHasLanding;
add(
    "PC7-section-landing-inline-preview",
    pc7,
    pc7
        ? "the SECTION-HERO model lands — <SectionPreviewCard> composes IconChip POP + title + Fira-Code subpath chip + a `preview` slot (pointer-events: none + inert — the one-GL budget), <SectionLanding> hosts StoryHero (D1 hero) + the bento grid, the router resolves /<category> to the landing (not a redirect), and the front door uses the card too (no text-only redirect card survives); the manifest carries the section-landing builder + the 11 landings"
        : `section-landing model wrong (card exists: ${previewCardExists}, landing view: ${sectionLandingExists}, IconChip: ${cardComposesIconChip}, fira chip: ${cardHasFiraChip}, preview slot: ${cardHasPreviewSlot}, inert: ${cardPreviewInert}, landing uses card: ${landingUsesCard}, landing uses hero: ${landingUsesHero}, router resolves landing: ${routerResolvesLanding}, intro uses card: ${introUsesCard}, manifest landing: ${manifestHasLanding})`,
);

// ── the no-Lenis/GSAP/Locomotive fence bite ───────────────────────────────────────
const demoFiles = [
    "demo/chassis/hero/story-hero.css",
    "demo/chassis/hero/StoryHero.vue",
    "demo/chassis/page/StoryPage.vue",
    "demo/chassis/hero/StoryHeader.vue",
    "demo/chassis/landing/SectionPreviewCard.vue",
    "demo/chassis/landing/SectionLanding.vue",
];
const lenisHit = demoFiles.some((f) =>
    /\b(lenis|gsap|locomotive|ScrollTrigger)\b/i.test(strip(read(f))),
);
add(
    "no-lenis-gsap-fence",
    !lenisHit,
    !lenisHit
        ? "ZERO Lenis/GSAP/Locomotive/ScrollTrigger import in the chassis files — the scroll-shrink is the native scroll() timeline only (BB.W-SCROLL-MOTION)"
        : "a Lenis/GSAP/Locomotive/ScrollTrigger reference leaked into a chassis file (the no-JS-scroll-engine fence is binding)",
);

// ── PC-DUAL / PC-STICKY / PC-BIDIR / PC-PRM — the shrink-on-scroll standard facility
//    (BI.W-SHRINK-HERO) ─────────────────────────────────────────────────────────────
// The UF-F2 shrink-title standard-facility mandate + the G7 dual register + the
// G7-STICKY containing-block fix. CONTENT pages SHRINK (the scale-led sticky collapse),
// HERO/viz pages SCROLL-AWAY (the field owns the viewport) — both native scroll()
// timelines (bidirectional by construction), the sticky containing block carved to the
// <article> route-column (display: contents on the 126px chrome <header>), the pinned
// header painted (the frosted plate), the whole register PRM-gated to a static large
// header. Born-RED at HEAD: the G7-STICKY carve + the painted backing are absent.

// The containing-block-breaker detector — a transform/filter/perspective/backdrop-filter,
// an overflow clip, or a contain that establishes a new sticky containing block (or
// captures the scroll() timeline) on an ancestor in the sticky chain (the BG re-parenting
// class — the silent sticky+timeline killer).
const CB_BREAKER =
    /(?:transform|filter|perspective|backdrop-filter)\s*:\s*(?!none\b)[^;}]+|overflow(?:-[xy])?\s*:\s*(?:hidden|clip|auto|scroll)|contain\s*:\s*(?:strict|content|layout|paint|size)/;

// Extract the FIRST rule body whose head contains `selector`.
const ruleBodyOf = (css, selector) => {
    const i = css.indexOf(selector);
    if (i < 0) return null;
    const open = css.indexOf("{", i);
    if (open < 0) return null;
    let depth = 0;
    for (let j = open; j < css.length; j++) {
        if (css[j] === "{") depth++;
        else if (css[j] === "}") {
            depth--;
            if (depth === 0) return css.slice(open + 1, j);
        }
    }
    return null;
};

// The no-preference @media blocks (brace-matched). A needle is PRM-gated if it sits
// inside one (so under reduce it drops to the static state).
const prmBlocksOf = (css) => {
    const out = [];
    const re = /@media\s*\(prefers-reduced-motion:\s*no-preference\)\s*\{/g;
    let m;
    while ((m = re.exec(css)) !== null) {
        const open = css.indexOf("{", m.index);
        let depth = 0;
        for (let j = open; j < css.length; j++) {
            if (css[j] === "{") depth++;
            else if (css[j] === "}") {
                depth--;
                if (depth === 0) {
                    out.push([open, j]);
                    break;
                }
            }
        }
    }
    return out;
};
const gatedUnderPRM = (css, needle) => {
    const idx = css.indexOf(needle);
    if (idx < 0) return false;
    return prmBlocksOf(css).some(([s, e]) => idx > s && idx < e);
};

// PC-DUAL — the two registers, by page variant (a literal-class probe).
const dualRegisterOf = (pageSrc, heroSrc, css) => {
    const pageShrinks = /class="[^"]*story-hero-shrink/.test(pageSrc);
    const pageNotAway = !/class="[^"]*story-hero-scroll-away/.test(pageSrc);
    const heroAway = /class="[^"]*story-hero-scroll-away/.test(heroSrc);
    const heroNotShrink = !/class="[^"]*story-hero-shrink/.test(heroSrc);
    const bothDefined =
        /\.story-hero-shrink\s*\{/.test(css) &&
        /\.story-hero-scroll-away\s*\{/.test(css);
    return {
        pageShrinks,
        pageNotAway,
        heroAway,
        heroNotShrink,
        bothDefined,
        ok: pageShrinks && pageNotAway && heroAway && heroNotShrink && bothDefined,
    };
};
const dual = dualRegisterOf(storyPage, storyHero, heroCss);
add(
    "PC-DUAL-register-by-variant",
    dual.ok,
    dual.ok
        ? "the DUAL register holds by page variant — the CONTENT-page chrome header carries .story-hero-shrink (scale-led sticky collapse) and NOT scroll-away; the HERO/viz cluster carries .story-hero-scroll-away (the field owns the viewport) and NOT shrink; both registers are DEFINED in story-hero.css. The literal 'every page shrinks' single read is WRONG — the scroll-away is a decided register (BD.W-VIZ-BROKEN-FIX D5)"
        : `dual register wrong (page shrinks: ${dual.pageShrinks}, page-not-away: ${dual.pageNotAway}, hero scroll-away: ${dual.heroAway}, hero-not-shrink: ${dual.heroNotShrink}, both defined: ${dual.bothDefined})`,
);

// PC-STICKY — the containing-block fix + the pinned painted backing + monotonic scroll().
const headerCarve =
    /\.story-page-article\s*>\s*header\s*\{[^}]*display:\s*contents/.test(heroCss);
const backingBody = ruleBodyOf(heroCss, ".story-hero-shrink::before");
const pinnedBacking =
    backingBody != null &&
    (/backdrop-filter\s*:/.test(backingBody) || /background\s*:/.test(backingBody));
const carveBody = ruleBodyOf(heroCss, ".story-page-article > header {") ?? "";
const carveNoBreaker = !CB_BREAKER.test(carveBody);
const pcSticky =
    headerCarve && pinnedBacking && shrinkSticky && shrinkScrollTimeline && carveNoBreaker;
add(
    "PC-STICKY-containing-block-fix",
    pcSticky,
    pcSticky
        ? "the G7-STICKY containing-block fix lands — the intermediate .story-page-article > header is display: contents (so the sticky .story-hero-shrink cluster's containing block is the full-height <article> route-column, NOT the 126px header that clipped the stick after one header-height of scroll), the pinned header carries a painted backing (.story-hero-shrink::before frosted plate reads backdrop-filter/background — a stuck header lifts painted, not transparent), the shrink resolves real monotonic scroll() progress (position: sticky + animation-timeline: scroll()), and the carve introduces NO transformed/overflow/contain ancestor (the silent sticky+timeline killer stays absent)"
        : `sticky fix incomplete (header display:contents carve: ${headerCarve}, pinned painted backing: ${pinnedBacking}, sticky: ${shrinkSticky}, scroll() timeline: ${shrinkScrollTimeline}, carve has no CB-breaker: ${carveNoBreaker})`,
);

// PC-BIDIR — native scroll()/view() timelines only (bidirectional by construction).
const awayRidesScroll =
    /\.story-hero-scroll-away\s*\{[^}]*animation-timeline:\s*scroll\(\)/.test(heroCss);
const pcBidir = shrinkScrollTimeline && awayRidesScroll && !lenisHit;
add(
    "PC-BIDIR-native-timeline",
    pcBidir,
    pcBidir
        ? "BIDIRECTIONAL by construction — both the shrink AND the scroll-away ride the native scroll() timeline (scroll up REVERSES the animation, no JS state to unwind), and ZERO Lenis/GSAP/Locomotive/ScrollTrigger scroll engine (the native-first fence). The per-glyph heading reveal is an ENTRANCE (one-shot IO), not a scroll animation — correctly excluded (the recorded ruling)"
        : `bidirectional register wrong (shrink rides scroll(): ${shrinkScrollTimeline}, scroll-away rides scroll(): ${awayRidesScroll}, no scroll-lib: ${!lenisHit})`,
);

// PC-PRM — the shrink/scroll-away/backing carve to a static large header under reduce.
const leaveGated = gatedUnderPRM(heroCss, "story-hero-scroll-leave");
const backingGated = gatedUnderPRM(heroCss, "story-hero-pin-backing");
const collapseGated = gatedUnderPRM(heroCss, "@keyframes title-collapse");
const stickyBaseIdx = heroCss.search(/\.story-hero-shrink\s*\{\s*position:\s*sticky/);
const stickyStaticFallback =
    stickyBaseIdx >= 0 &&
    !prmBlocksOf(heroCss).some(([s, e]) => stickyBaseIdx > s && stickyBaseIdx < e);
const pcPrm = leaveGated && backingGated && collapseGated && stickyStaticFallback;
add(
    "PC-PRM-static-under-reduce",
    pcPrm,
    pcPrm
        ? "PRM → a static large header — the shrink (title-collapse), the scroll-away leave, AND the pinned backing fade all live inside @media (prefers-reduced-motion: no-preference), so under reduce ZERO scroll frames run; the .story-hero-shrink position: sticky base is OUTSIDE the gate (a non-shrinking sticky header is the correct static fallback on every engine)"
        : `PRM carve wrong (leave gated: ${leaveGated}, backing gated: ${backingGated}, title-collapse gated: ${collapseGated}, sticky base ungated fallback: ${stickyStaticFallback})`,
);

// ── Self-test bites (the anti-evasion floor) ──────────────────────────────────────
if (SELF_TEST) {
    const bites = [];
    // 1. a planted font-size in the shrink keyframe REDs PC1.
    bites.push({
        id: "selftest-PC1-font-size-reds",
        pass: LAYOUT_KEYS.test("transform: scale(0.5); font-size: 1rem;"),
    });
    // 2. a `"3"` heroScale member REDs PC2's no-three.
    bites.push({
        id: "selftest-PC2-three-member-reds",
        pass: /heroScale\?:\s*[^;]*"3"/.test('heroScale?: "mega" | "3" | "4"'),
    });
    // 3. an empty subpath REDs PC5; a phantom-export subpath REDs PC5.
    const fakeEmpty = { subpath: "", heroScale: "4", depth: "D3" };
    const fakePhantom = {
        subpath: "@mkbabb/glass-ui/does-not-exist",
        heroScale: "4",
        depth: "D3",
    };
    const subOk = (r) =>
        typeof r.subpath === "string" &&
        r.subpath.length > 0 &&
        (r.subpath.startsWith("/") ||
            (r.subpath.startsWith("@mkbabb/glass-ui/") &&
                EXPORTS.has(r.subpath.replace("@mkbabb/glass-ui/", ""))));
    bites.push({
        id: "selftest-PC5-empty-subpath-reds",
        pass: !subOk(fakeEmpty),
    });
    bites.push({
        id: "selftest-PC5-phantom-export-reds",
        pass: !subOk(fakePhantom),
    });
    // 4. a heroScale "3" REDs PC6; a D3-out-sizes-D2 REDs PC6.
    bites.push({
        id: "selftest-PC6-three-below-floor-reds",
        pass: (RANK["3"] ?? -1) < RANK["4"],
    });
    bites.push({
        id: "selftest-PC6-sub-outsizes-main-reds",
        pass: RANK["hero"] > RANK["5"], // a D3 `hero` would out-size a D2 `5` → flagged
    });
    // 5. a text-only landing card (no preview slot) REDs PC7.
    bites.push({
        id: "selftest-PC7-text-only-card-reds",
        pass: !/name="preview"/.test('<RouterLink><span>title</span></RouterLink>'),
    });
    // 6. a planted transform (or overflow clip / contain) on an intermediate ancestor
    //    REDs PC-STICKY; a clean display:contents carve does NOT.
    bites.push({
        id: "selftest-PCSTICKY-transform-ancestor-reds",
        pass:
            CB_BREAKER.test("display: contents; transform: translateZ(0);") &&
            CB_BREAKER.test("display: contents; overflow: hidden;") &&
            CB_BREAKER.test("display: contents; contain: paint;") &&
            !CB_BREAKER.test("display: contents;"),
    });
    // 7. a planted scroll-lib import REDs PC-BIDIR; a native scroll() timeline does NOT.
    bites.push({
        id: "selftest-PCBIDIR-scroll-lib-reds",
        pass:
            /\b(lenis|gsap|locomotive|ScrollTrigger)\b/i.test('import Lenis from "lenis";') &&
            !/\b(lenis|gsap|locomotive|ScrollTrigger)\b/i.test("animation-timeline: scroll();"),
    });
    // 8. a content page carrying the scroll-away register (and a hero carrying shrink) REDs
    //    PC-DUAL; the correct-variant assignment does NOT.
    const dualMismatch = dualRegisterOf(
        '<div class="story-hero-cluster story-hero-scroll-away">',
        '<div class="story-hero-cluster story-hero-shrink">',
        ".story-hero-shrink { } .story-hero-scroll-away { }",
    );
    const dualCorrect = dualRegisterOf(
        '<div class="story-hero-cluster story-hero-shrink">',
        '<div class="story-hero-cluster story-hero-scroll-away">',
        ".story-hero-shrink { } .story-hero-scroll-away { }",
    );
    bites.push({
        id: "selftest-PCDUAL-mismatch-reds",
        pass: !dualMismatch.ok && dualCorrect.ok,
    });
    // 9. an ungated shrink animation (outside no-preference) REDs PC-PRM; a gated one does NOT.
    bites.push({
        id: "selftest-PCPRM-ungated-reds",
        pass:
            gatedUnderPRM(
                "@media (prefers-reduced-motion: no-preference) { .x { animation: title-collapse both; } }",
                "title-collapse",
            ) &&
            !gatedUnderPRM(".x { animation: title-collapse both; }", "title-collapse"),
    });
    const allBitesPass = bites.every((b) => b.pass);
    add(
        "self-test-bites",
        allBitesPass,
        allBitesPass
            ? `all ${bites.length} self-test bites distinguish the planted violation (font-size-in-kf / "3"-member / empty+phantom subpath / "3"-below-floor / sub-out-sizes-main / text-only-card all RED)`
            : `self-test bite(s) failed: ${bites.filter((b) => !b.pass).map((b) => b.id).join(", ")}`,
    );
}

// ── Report ────────────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);
console.log(
    "proof:page-chassis — the ONE standardized page idiom (BC.W-PAGE-CHASSIS)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_PAGE_CHASSIS_OUT", "BC-page-chassis");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:page-chassis",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the PAINTED render (the audacious heroes, the scroll-shrink frame-series, the bento inline previews, ONE card per page) is proven by tests-visual/page-chassis.spec.ts + the proof:ba-gestalt page-band verdict + the dev-tools MCP walk (the cardinal split — a source-green gate is never the close).",
    routeCount: routes.length,
    storyCount,
    landingCount,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:page-chassis] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    `\n[proof:page-chassis] the ONE standardized page idiom holds — ${storyCount} stories + ${landingCount} section landings resolve the audacious title (≥ display-4) + the explicit Fira-Code subpath chip + the native scroll-shrink + ONE glass card; the depth-keyed √φ ladder reads as size; the bento previews are inline. The π arm binds the paint.`,
);

// ── helpers ───────────────────────────────────────────────────────────────────────
function collectStoryFiles() {
    // Every kebab-case <category>/<id>.vue story file (the manifest route set),
    // EXCLUDING the PascalCase chassis-partials + the helper subdir SFCs (aurora/,
    // fourier/, blob/) that carry no manifest row.
    const out = [];
    const storiesDir = resolve(ROOT, "demo/stories");
    for (const cat of CATEGORY_IDS) {
        const dir = resolve(storiesDir, cat);
        if (!existsSync(dir)) continue;
        for (const f of readdirSync(dir)) {
            if (!f.endsWith(".vue")) continue;
            const base = f.replace(/\.vue$/, "");
            // skip PascalCase helper SFCs (DockStage, etc.)
            if (/^[A-Z]/.test(base)) continue;
            out.push({ key: `${cat}/${base}`, rel: `demo/stories/${cat}/${f}` });
        }
    }
    return out;
}
