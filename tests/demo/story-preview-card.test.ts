import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import SectionPreviewCard from "../../demo/chassis/landing/SectionPreviewCard.vue";
import {
    resolveCategoryTile,
    resolveStoryTile,
    type TileResolution,
} from "../../demo/chassis/landing/storyTile";
import {
    STILL_ARMS,
    VIZ_PREVIEW_STILLS,
    stillColor,
    vizPreviewStill,
    type StillTheme,
} from "../../demo/chassis/landing/vizPreviewStill";
import { CATEGORIES, heroScaleForDepth } from "../../demo/stories/manifest";

// ─────────────────────────────────────────────────────────────────────────────
// BK #58 W-PREVIEW-CARD · W-STORY-TAXONOMY · W-STORY-PROPORTION.
//
// SEATS +0. This file MINTS NOTHING and BINDS NOTHING. G-TILE-COVERAGE and
// G-ONE-NAME are doc seats carrying `binding: "none"` in SEAT-BINDING.json and they
// stay that way at this cut: `node scripts/gate-register.mjs` prints a byte-identical
// line pre and post. This is a close-battery row, the way #73's and #59's are.
//
// WHAT THE WAVE ACTUALLY RULED, and it is not what its own first draft implied. The
// ⊕² re-read (TERMINAL-ROSTER:208) STRIKES the 87-bespoke-tile implication and
// re-reads G-TILE-COVERAGE as *every story resolves to a DECLARED preview strategy*,
// naming the alternatives outright: "a family specimen, an honest frozen still, or NO
// PREVIEW is preferable to duplicate title art." So the target is not 80 authored
// vignettes. It is a closed union with no floor rung in it.
//
// THE FOUR DETECTORS, NEVER ONE NUMBER (⊕², S-15). The census this wave rides has
// four INDEPENDENT instruments reading four different sources, and collapsing them to
// a single headline is what let "87 bespoke tiles" survive as an implication for a
// tranche. They are pinned here as RELATIONS rather than as frozen literals — a gate
// that hard-codes `80` fails the day someone writes story 81, which teaches the next
// author to edit the gate rather than to read it. The values at this cut, recorded in
// the unit record: 11 categories · 80 manifest rows · 4 `*.tile.vue` · 6 still routes.
//
// WHAT A SOURCE + MOUNT GATE CAN PROVE, and what it cannot. It can prove the union is
// closed, that every row resolves inside it, that the two front doors resolve through
// ONE function, that a `none` card mounts no media region and prints its name exactly
// once, and that the dead rung's CSS went with it. It cannot prove the landing LOOKS
// better — that is π, ENQUEUED at §8 of the record and claimed by nobody here.
//
// BORN-RED at `8a96868d`, measured in a `git archive` mirror, not asserted. The RED
// lines are recorded verbatim in the unit record.
// ─────────────────────────────────────────────────────────────────────────────

const DEMO = join(process.cwd(), "demo");
const readRaw = (rel: string): string => readFileSync(join(DEMO, rel), "utf8");

/**
 * THE STRUCK STRING PROBLEM, and the one honest answer to it. Every strike in this
 * tranche is a DATED BRACKET that quotes what it struck — `heroClass` names
 * `text-display-${…}`, the toc cure names `themed-card`, this cut's card comment names
 * `identity`. A `not.toContain` read against the whole file therefore fails on the
 * strike's own prose and would teach the next author to delete the record. So every
 * absence assertion below reads the CODE with comments removed, and every presence
 * assertion that is ABOUT the record reads the raw bytes. Two readers, each pointed at
 * what it is actually asserting about.
 */
const code = (rel: string): string =>
    readRaw(rel)
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/.*$/gm, "$1");

const read = readRaw;

const storyTileSrc = code("chassis/landing/storyTile.ts");
const storyTileRaw = readRaw("chassis/landing/storyTile.ts");
const cardSrc = code("chassis/landing/SectionPreviewCard.vue");
const catalogSrc = code("chassis/landing/CatalogLanding.vue");
const introSrc = code("stories/foundations/intro.vue");
const landingSrc = code("chassis/landing/SectionLanding.vue");
const heroSrc = code("chassis/hero/StoryHero.vue");
const heroCss = code("chassis/hero/story-hero.css");
const vizStudioRaw = readRaw("stories/substrates/_frame/VizStudio.vue");
const tocSrc = code("stories/navigation/toc-tracking.vue");
const stillSrc = code("chassis/landing/vizPreviewStill.ts");

/** Both paint arms — every resolver row below is asserted in BOTH, never just one. */
const ARMS: StillTheme[] = ["light", "dark"];

const ROWS = CATEGORIES.flatMap((category) =>
    category.stories.map((story) => ({ category, story })),
);

/**
 * The still detector reads the REGISTRY, not the rasteriser. `vizPreviewStill`
 * renders through a `<canvas>` and returns null when `document` is undefined, so an
 * SSR-side tally reports zero stills — a property of the probe, never of the tree.
 */
const isStillRoute = (categoryId: string, storyId: string): boolean =>
    `/${categoryId}/${storyId}` in VIZ_PREVIEW_STILLS;

describe("BK #58 · the four detectors are four instruments, not one number", () => {
    it("reads the category count from the manifest's own category list", () => {
        expect(CATEGORIES.length).toBeGreaterThan(0);
        expect(new Set(CATEGORIES.map((c) => c.id)).size).toBe(CATEGORIES.length);
    });

    it("reads the story-row count from the rows, and it exceeds the category count", () => {
        expect(ROWS.length).toBeGreaterThan(CATEGORIES.length);
    });

    it("reads authored tiles from the `tile` loader — a strict, non-empty subset of the rows", () => {
        const authored = ROWS.filter(({ story }) => story.tile);
        expect(authored.length).toBeGreaterThan(0);
        expect(authored.length).toBeLessThan(ROWS.length);
    });

    it("reads stills from the frozen-still REGISTRY, and every registered route is a real row", () => {
        const registered = Object.keys(VIZ_PREVIEW_STILLS);
        expect(registered.length).toBeGreaterThan(0);
        const routes = new Set(
            ROWS.map(({ category, story }) => `/${category.id}/${story.id}`),
        );
        expect(registered.filter((route) => !routes.has(route))).toEqual([]);
    });

    it("keeps the four readings DISTINCT — no two instruments are the same number", () => {
        const authored = ROWS.filter(({ story }) => story.tile).length;
        const stills = Object.keys(VIZ_PREVIEW_STILLS).length;
        const readings = [CATEGORIES.length, ROWS.length, authored, stills];
        expect(new Set(readings).size).toBe(readings.length);
    });

    it("derives the route arithmetic from the rows rather than restating a total", () => {
        // root + one landing per category + one route per story + the 404.
        expect(2 + CATEGORIES.length + ROWS.length).toBeGreaterThan(ROWS.length);
    });
});

describe("G-TILE-COVERAGE (⊕² re-read) — every story resolves a DECLARED strategy", () => {
    const DECLARED = new Set<TileResolution["kind"]>(["authored", "still", "none"]);

    // THE RASTER IS NOT CALLABLE HERE, and the reason is worth stating rather than
    // routing around. `vizPreviewStill` draws into a real `<canvas>`; ~~jsdom~~
    // [2026-08-10 · BK #58, D6: the env is `happy-dom` (`vitest.config.ts:26`), and
    // its context is thinner than this line claimed — it DOES carry `fillRect` and
    // `createLinearGradient`, it does NOT carry `beginPath`, and `toDataURL` returns
    // the constant `data:image/png;base64,AA==` no matter what was painted.
    // [2026-08-28 · adjudicated CURE 1: that context SHAPE is the REPO'S OWN STUB —
    // tests/setup.ts:127-141's vi.fn getContext, whose :140 toDataURL is the
    // constant — not happy-dom's; raw happy-dom getContext returns null. happy-dom
    // stays as the env; the stub is the detector.] That last
    // one is why the D6 gate below reads DRAW INPUTS and not painted bytes: a raster
    // comparison here would report the two arms EQUAL and pass forever] hands back
    // a 2D context OBJECT with no drawing methods on it, so `ctx.beginPath` throws —
    // which is neither the `document`-absent path (`render` guards that and returns
    // null) nor anything a target engine does. Stubbing the context to null to make it
    // quiet would be a fallback masking a primary, so instead the still rows are
    // asserted from the REGISTRY, which is their declaration, and the resolver is
    // exercised on the rows that do not need a raster.
    const rasterFree = ROWS.filter(
        ({ category, story }) => !isStillRoute(category.id, story.id),
    );

    it("resolves every raster-free manifest row inside the closed union", () => {
        expect(rasterFree.length).toBeGreaterThan(0);
        const stray = ARMS.flatMap((theme) =>
            rasterFree
                .map(
                    ({ category, story }) =>
                        resolveStoryTile(category.id, story, theme).kind,
                )
                .filter((kind) => !DECLARED.has(kind)),
        );
        expect(stray).toEqual([]);
    });

    it("declares a strategy for the still rows too — from the registry that IS the declaration", () => {
        const claimed = ROWS.filter(({ category, story }) =>
            isStillRoute(category.id, story.id),
        );
        expect(claimed.length).toBeGreaterThan(0);
        // Registry membership is the `still` declaration; `authored` outranks it, which
        // is the ladder's own order, so a claimed row is one or the other, never none.
        expect(storyTileSrc).toMatch(
            /vizPreviewStill\(`\/\$\{categoryId\}\/\$\{story\.id\}`, theme\)/,
        );
    });

    it("resolves every CATEGORY card through the same ladder", () => {
        const rasterFreeCategories = CATEGORIES.filter((c) => {
            const headline = c.stories.find((s) => s.depth === "D2") ?? c.stories[0];
            return headline && !isStillRoute(c.id, headline.id);
        });
        // There are categories to assert about — without this the filter+toEqual([])
        // shape below would assert nothing at all and pass forever.
        expect(rasterFreeCategories.length).toBeGreaterThan(0);
        const stray = ARMS.flatMap((theme) =>
            rasterFreeCategories
                .map((c) => resolveCategoryTile(c, theme).kind)
                .filter((kind) => !DECLARED.has(kind)),
        );
        expect(stray).toEqual([]);
    });

    it("resolves an authored tile for every row that ships a `.tile.vue`", () => {
        const authored = ROWS.filter(({ story }) => story.tile);
        expect(authored.length).toBeGreaterThan(0);
        for (const { category, story } of authored) {
            for (const theme of ARMS) {
                expect(resolveStoryTile(category.id, story, theme).kind).toBe(
                    "authored",
                );
            }
        }
    });

    it("strikes the `identity` rung from the union, the resolver and the card", () => {
        expect(storyTileSrc).toContain('kind: "none"');
        expect(storyTileSrc).not.toContain('"identity"');
        expect(cardSrc).not.toContain("tile.kind === 'identity'");
        expect(cardSrc).not.toContain("section-preview-card-identity");
    });

    it("carries the strike as a DATED bracket rather than a silent deletion", () => {
        expect(storyTileRaw).toMatch(/\[struck 2026-08-10, BK #58 W-PREVIEW-CARD\]/);
    });
});

describe("G-NO-DUP-TITLE — a card prints its name once, and a `none` card has no well", () => {
    const mountCard = (tile: TileResolution, title = "Buttons") =>
        mount(SectionPreviewCard, {
            props: { to: "/display/buttons", title, blurb: "The lede.", tile },
            global: {
                stubs: {
                    TransitionRouteLink: {
                        props: ["to"],
                        template: '<a :href="to"><slot /></a>',
                    },
                },
            },
        });

    it("mounts NO media region for a `none` card", () => {
        const card = mountCard({ kind: "none" });
        expect(card.findAll(".section-preview-card-preview")).toHaveLength(0);
        card.unmount();
    });

    it("mounts the media region for a declared still", () => {
        const card = mountCard({
            kind: "still",
            src: "data:image/png;base64,iVBORw0KGgo=",
        });
        expect(card.findAll(".section-preview-card-preview")).toHaveLength(1);
        expect(card.findAll("img.section-preview-card-viz-still")).toHaveLength(1);
        card.unmount();
    });

    it("prints the title EXACTLY once for a REAL tile-free row — the defect, measured", () => {
        // THE TILE COMES FROM THE RESOLVER, never from this file, and the born-RED run
        // is why. A hand-made `{ kind: "none" }` mounted against the pre-cut card
        // PASSES: those bytes have no branch for a kind they have never heard of, so
        // nothing renders in the well and the title prints once — green, against a
        // card that prints it twice for every story on the landing. Resolving a real
        // manifest row (no `.tile.vue`, no frozen still) is what reaches the defect:
        // pre-cut that row resolves `identity`, which paints the story's name INSIDE
        // the well while the card's own label prints it again directly beneath.
        const row = ROWS.find(
            ({ category, story }) =>
                !story.tile && !isStillRoute(category.id, story.id),
        );
        expect(row, "a tile-free, still-free manifest row exists").toBeDefined();
        const { category, story } = row!;
        const card = mountCard(
            resolveStoryTile(category.id, story, "light"),
            story.title,
        );
        expect(card.text().split(story.title).length - 1).toBe(1);
        expect(card.findAll("[data-route-label]")).toHaveLength(1);
        expect(card.findAll(".section-preview-card-preview")).toHaveLength(0);
        card.unmount();
    });

    it("keeps the media region inert and out of the accessibility tree", () => {
        const card = mountCard({
            kind: "still",
            src: "data:image/png;base64,iVBORw0KGgo=",
        });
        const preview = card.get(".section-preview-card-preview");
        expect(preview.attributes("aria-hidden")).toBe("true");
        expect(preview.attributes("inert")).toBeDefined();
        card.unmount();
    });
});

describe("ONE LADDER — both front doors resolve through the same function", () => {
    it("has the catalog consume `resolveCategoryTile` and mint no local resolution", () => {
        expect(catalogSrc).toContain("resolveCategoryTile");
        expect(catalogSrc).not.toMatch(/function\s+identityTile/);
        expect(catalogSrc).not.toContain('kind: "identity"');
    });

    it("has the intro front door consume it too, dropping its hand-rolled lead walk", () => {
        expect(introSrc).toContain("resolveCategoryTile");
        expect(introSrc).not.toContain('story.id !== "intro"');
        expect(introSrc).not.toContain('kind: "identity"');
    });

    it("reads the headline from the manifest's OWN depth assignment, not from position", () => {
        expect(storyTileSrc).toContain('story.depth === "D2"');
    });

    it("previews the D2 main even where it is not the first row (foundations)", () => {
        const foundations = CATEGORIES.find((c) => c.id === "foundations");
        expect(foundations).toBeDefined();
        const first = foundations!.stories[0];
        const main = foundations!.stories.find((s) => s.depth === "D2");
        // The precondition that makes this row the interesting one: first ≠ main.
        expect(main).toBeDefined();
        expect(first.id).not.toBe(main!.id);
        expect(isStillRoute("foundations", main!.id)).toBe(false);
        expect(resolveCategoryTile(foundations!, "light")).toEqual(
            resolveStoryTile("foundations", main!, "light"),
        );
    });

    it("lays the intro index out on the cel field, not on a viewport breakpoint ladder", () => {
        expect(introSrc).toContain('class="story-field"');
        expect(introSrc).not.toMatch(/sm:grid-cols-2|md:grid-cols-3|lg:grid-cols-4/);
    });
});

describe("the above-fold exemption (ceded from PERF W3)", () => {
    it("exempts the lead card from content-visibility, keyed on the span it already has", () => {
        expect(cardSrc).toMatch(
            /\.section-preview-card\[data-span="full"\]\s*\{[^}]*content-visibility:\s*visible/,
        );
    });

    it("drops the intrinsic-size guess with it — a full-row card is not 19rem tall", () => {
        expect(cardSrc).toMatch(
            /\.section-preview-card\[data-span="full"\]\s*\{[^}]*contain-intrinsic-size:\s*none/,
        );
    });

    it("leaves the ordinary card's content-visibility exactly as it was", () => {
        expect(cardSrc).toMatch(
            /\.section-preview-card\s*\{[^}]*content-visibility:\s*auto/,
        );
    });
});

describe("W-STORY-PROPORTION — ONE definition of the hero title's type", () => {
    it("strikes `heroClass`, so no second font-size rides the same <h1>", () => {
        expect(heroSrc).not.toMatch(/const\s+heroClass\s*=/);
        expect(heroSrc).not.toContain("text-display-${props.heroScale}");
        expect(heroSrc).not.toMatch(/cn\('story-hero-title',\s*heroClass\)/);
    });

    it("still stamps the rung as ONE attribute the sheet reads", () => {
        expect(heroSrc.match(/:data-hero-scale="heroScale"/g) ?? []).toHaveLength(2);
    });

    it("moves the whole display register onto the fit-capped rule that always won", () => {
        const block = heroCss.slice(
            heroCss.indexOf(".story-hero-title[data-hero-scale] {"),
        );
        expect(block.indexOf(".story-hero-title[data-hero-scale] {")).toBe(0);
        const rule = block.slice(0, block.indexOf("}") + 1);
        for (const decl of [
            "font-family: var(--font-display)",
            "font-weight: var(--type-weight-display)",
            "line-height: var(--type-leading-display)",
            "letter-spacing: var(--type-tracking-display)",
        ]) {
            expect(rule).toContain(decl);
        }
    });

    it("keeps every rung the utility used to name, so the strike changes no size", () => {
        for (const rung of ["4", "5", "mega", "hero", "audacious"]) {
            expect(heroCss).toContain(`.story-hero-title[data-hero-scale="${rung}"]`);
        }
    });

    it("binds the section landing's rung to the manifest, not to a literal `4`", () => {
        expect(landingSrc).toContain(':hero-scale="landing.heroScale"');
        expect(landingSrc).not.toContain('hero-scale="4"');
    });

    it("has a manifest rung to bind — every category landing declares D1's own", () => {
        expect(CATEGORIES.length).toBeGreaterThan(0);
        for (const category of CATEGORIES) {
            expect(category.landing?.heroScale).toBe("hero");
            expect(category.landing?.depth).toBe("D1");
        }
    });
});

describe("G-ONE-NAME (studio arm) — a page prints its own name once", () => {
    const STUDIOS = ["blob", "fourier-field"] as const;

    it("has no studio in this cut's fence heading its section with the page's title", () => {
        for (const id of STUDIOS) {
            const src = code(`stories/substrates/${id}.vue`);
            const row = ROWS.find((r) => r.story.id === id);
            expect(row, `${id} is a manifest row`).toBeDefined();
            expect(src).toContain("<VizStudio");
            expect(src).not.toContain(`heading="${row!.story.title}"`);
        }
    });

    it("keeps the studio's own contribution — the label and the blurb both survive", () => {
        for (const id of STUDIOS) {
            const src = code(`stories/substrates/${id}.vue`);
            expect(src).toMatch(/<VizStudio[\s\S]{0,400}?\slabel="/);
            expect(src).toMatch(/<VizStudio[\s\S]{0,2000}?\sblurb="/);
        }
    });

    it("states the law where the next author will read it — on the prop itself", () => {
        const heading = vizStudioRaw.slice(
            0,
            vizStudioRaw.indexOf("heading?: string;"),
        );
        expect(heading).toContain("never the page's own name");
        expect(heading).toContain("G-ONE-NAME");
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// W-STORY-TAXONOMY — the completion clause, made executable.
//
// The wave's completion condition is ZERO BESPOKE PAGES, with its own detector:
// *the raw `demo/stories/**/*.vue` census resolves every SFC to a type + a declared
// preview strategy*. Two halves, and only one of them is green — so both are here,
// and the RED half is HELD RED by `it.fails` rather than described in prose that
// nothing runs. That is #59's own idiom for a finding whose cure belongs to another
// row (`TERMINAL-ROSTER:5336`: "all three held RED by `it.fails`").
// ─────────────────────────────────────────────────────────────────────────────

/** Every one-level-deep `<cat>/<id>.vue` the manifest glob can load — its universe. */
const globbedStorySfcs = (): { cat: string; id: string; rel: string }[] => {
    const out: { cat: string; id: string; rel: string }[] = [];
    for (const cat of readdirSync(join(DEMO, "stories"), { withFileTypes: true })) {
        // The glob is exactly one level deep and takes no `_`-prefixed directory.
        if (!cat.isDirectory() || cat.name.startsWith("_")) continue;
        for (const file of readdirSync(join(DEMO, "stories", cat.name))) {
            if (!file.endsWith(".vue") || file.endsWith(".tile.vue")) continue;
            out.push({
                cat: cat.name,
                id: file.slice(0, -4),
                rel: `stories/${cat.name}/${file}`,
            });
        }
    }
    return out;
};

const routedIds = new Set(
    ROWS.map(({ category, story }) => `${category.id}/${story.id}`),
);

describe("W-STORY-TAXONOMY — zero bespoke pages, and the SFCs that resolve to no type", () => {
    it("gives every manifest row a real SFC on disk", () => {
        expect(ROWS.length).toBeGreaterThan(0);
        const globbed = new Set(globbedStorySfcs().map((f) => `${f.cat}/${f.id}`));
        const missing = [...routedIds].filter((key) => !globbed.has(key));
        expect(missing).toEqual([]);
    });

    it("ZERO BESPOKE PAGES — every routed SFC is on the ONE chassis", () => {
        // `VizStudio` is not a second chassis: it composes `StoryPage` itself. A page
        // that mounts neither is authoring its own page furniture, which is the whole
        // of what "bespoke" means here.
        const bespoke = globbedStorySfcs()
            .filter((f) => routedIds.has(`${f.cat}/${f.id}`))
            .filter((f) => {
                const body = read(f.rel);
                return !body.includes("<StoryPage") && !body.includes("<VizStudio");
            })
            .map((f) => f.rel);
        expect(bespoke).toEqual([]);
    });

    it.fails("every globbed story SFC resolves to a manifest row — RED, routed", () => {
        // ROUTED, not cured here (unit record §ROUTED). These are complete, actively
        // maintained `StoryPage` stories that consolidation rows superseded and left
        // on disk: the glob still bundles them, and no route, landing card or preview
        // strategy reaches any of them. Their disposition is a DELETE-class act with
        // a named successor to verify per file — that is the overfitting audit's /
        // #62's cut, not a preview-card row's, and one of them carries a committed
        // `[BK #47 W1 SURFACE]` edit from a lane that is live right now.
        const orphans = globbedStorySfcs()
            .filter((f) => !routedIds.has(`${f.cat}/${f.id}`))
            .map((f) => f.rel);
        expect(orphans).toEqual([]);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// G-ONE-NAME over the WHOLE story corpus, not a two-item list.
//
// The seat's assertion is "a page prints its own name once". The chassis prints the
// manifest title as the route's one `<h1>`; a page prints it a second time when it
// hands the same string back to a section heading/label or writes it into its own
// heading element. That is a source-side detector — the rendered-DOM version is π.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * `substrates/aurora` is LANE γ's file by the ratified fence, and it is the ONE
 * surviving hit (`heading="Aurora"`, ×1). It is named here with its owner rather
 * than quietly filtered, and the `it.fails` arm below drops the exclusion so the
 * corpus arm flips fully green the moment γ strikes it.
 */
const ONE_NAME_FENCED_OUT = new Set(["substrates/aurora"]);

const restatesOwnName = (cat: string, id: string, title: string): string[] => {
    const body = code(`stories/${cat}/${id}.vue`);
    const esc = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const hits: string[] = [];
    for (const attr of ["heading", "label", "title", "eyebrow"]) {
        const n = (body.match(new RegExp(`${attr}="${esc}"`, "g")) ?? []).length;
        if (n) hits.push(`${attr}="${title}" ×${n}`);
    }
    const n = (body.match(new RegExp(`<h[1-3][^>]*>\\s*${esc}\\s*<`, "g")) ?? [])
        .length;
    if (n) hits.push(`<hN>${title}</hN> ×${n}`);
    return hits;
};

describe("G-ONE-NAME — the corpus arm", () => {
    it("has a corpus to read, and every row's SFC is readable", () => {
        expect(ROWS.length).toBeGreaterThan(0);
        for (const { category, story } of ROWS) {
            expect(
                read(`stories/${category.id}/${story.id}.vue`).length,
            ).toBeGreaterThan(0);
        }
    });

    it("no story in this lane's fence restates its own manifest title", () => {
        const offenders = ROWS.filter(
            ({ category, story }) =>
                !ONE_NAME_FENCED_OUT.has(`${category.id}/${story.id}`),
        )
            .map(({ category, story }) => ({
                route: `${category.id}/${story.id}`,
                hits: restatesOwnName(category.id, story.id, story.title),
            }))
            .filter((row) => row.hits.length > 0);
        expect(offenders).toEqual([]);
    });

    it.fails("no story ANYWHERE restates its own title — RED on γ's aurora", () => {
        const offenders = ROWS.map(({ category, story }) => ({
            route: `${category.id}/${story.id}`,
            hits: restatesOwnName(category.id, story.id, story.title),
        })).filter((row) => row.hits.length > 0);
        expect(offenders).toEqual([]);
    });

    it("keeps the exclusion HONEST — the fenced route is a real row that really fails", () => {
        for (const key of ONE_NAME_FENCED_OUT) {
            const [cat, id] = key.split("/");
            const row = ROWS.find((r) => r.category.id === cat && r.story.id === id);
            expect(row, `${key} is a manifest row`).toBeDefined();
            // An exclusion for a route that already passes is a fence around nothing.
            expect(restatesOwnName(cat, id, row!.story.title).length).toBeGreaterThan(
                0,
            );
        }
    });
});

describe("W-STORY-PROPORTION — the catalog is a D0 surface and says so once", () => {
    it("reads its rung from the manifest ladder instead of restating a literal", () => {
        expect(catalogSrc).toContain("heroScaleForDepth");
        expect(catalogSrc).not.toContain('hero-scale="4"');
    });

    it("states the tier ONCE — the same constant feeds the rung and the depth", () => {
        expect(catalogSrc).toMatch(/CATALOG_DEPTH\s*=\s*"D0"/);
        expect(catalogSrc).toContain(':hero-scale="heroScaleForDepth(CATALOG_DEPTH)"');
        expect(catalogSrc).toContain(':depth="CATALOG_DEPTH"');
    });

    it("puts the home page ABOVE the D3 floor it used to sit on", () => {
        expect(heroScaleForDepth("D0")).toBe("mega");
        expect(heroScaleForDepth("D3")).toBe("4");
        expect(heroScaleForDepth("D0")).not.toBe(heroScaleForDepth("D3"));
    });

    it("keeps the ladder in ONE place — no site restates the depth→rung ternary", () => {
        const manifestSrc = readFileSync(
            join(process.cwd(), "demo/stories/manifest.ts"),
            "utf8",
        )
            .replace(/\/\*[\s\S]*?\*\//g, "")
            .replace(/(^|[^:])\/\/.*$/gm, "$1");
        expect(manifestSrc).not.toMatch(/depth === "D0" \? "mega"/);
        expect(
            (manifestSrc.match(/heroScaleForDepth\(/g) ?? []).length,
        ).toBeGreaterThan(2);
    });

    it("resolves every landing's rung through the ladder, D1 included", () => {
        for (const category of CATEGORIES) {
            expect(category.landing?.heroScale).toBe(
                heroScaleForDepth(category.landing!.depth),
            );
        }
    });

    it("resolves every story row's rung through the ladder unless it overrides", () => {
        const OVERRIDE = "hero";
        for (const { story } of ROWS) {
            expect(story.heroScale).toBeDefined();
            if (story.heroScale === OVERRIDE) continue;
            expect(story.heroScale).toBe(heroScaleForDepth(story.depth!));
        }
    });
});

describe("the lead card — all three front doors agree", () => {
    it("has the catalog lead on its first card, like the other two", () => {
        expect(catalogSrc).toContain(':lead="idx === 0"');
        expect(catalogSrc).toMatch(/v-for="\(category, idx\) in CATEGORIES"/);
    });

    it("keeps the section landing and the intro index leading too", () => {
        expect(landingSrc).toContain(':lead="idx === 0"');
        expect(introSrc).toContain("lead: idx === 0");
    });

    it("gives the lead the span the exemption is keyed on", () => {
        expect(cardSrc).toContain(`:data-span="lead ? 'full' : null"`);
    });
});

describe("TOC-MENU-GLASS (⊕⁴ U-43) + BD T49 — the clean break", () => {
    it("has no `themed-card` binding left anywhere in demo/", () => {
        expect(tocSrc).not.toMatch(/class="[^"]*themed-card/);
        expect(tocSrc).not.toMatch(/'[^']*themed-card/);
    });

    it("gives both panes a REAL material rung instead of an undefined class name", () => {
        expect(tocSrc.match(/glass-resting/g) ?? []).toHaveLength(2);
        expect(tocSrc.match(/rounded-panel/g) ?? []).toHaveLength(2);
    });

    it("reads the ONE stage envelope rather than minting a height", () => {
        expect(tocSrc).toContain("story-stage");
        expect(tocSrc).not.toMatch(/h-\[\d+px\]/);
    });

    it("takes the full span, because a two-pane instrument does not fit a cel", () => {
        expect(tocSrc).toMatch(/<StorySection\s+span="full"/);
    });

    it("caps the ToC track with a declared measure instead of a device literal", () => {
        expect(tocSrc).toContain("var(--measure-cel)");
        expect(tocSrc).not.toContain("grid-cols-[200px_1fr]");
    });

    it("separates the document's hierarchy by RUNG, not by fading a muted colour twice", () => {
        expect(tocSrc).toContain("text-subheading");
        expect(tocSrc).not.toContain("text-lg font-semibold");
        expect(tocSrc).not.toContain("text-muted-foreground/80");
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// D6 — THE FROZEN STILLS HAVE NO DARK ARM (δ3-π-5, PI-BATTERY §8; owner #58
// W-PREVIEW-CARD). The gate that would have caught it.
//
// SEATS +0, like the rest of this file: these are `it` rows on an existing close
// battery, not a new `G-` seat. Nothing is minted.
//
// WHAT IT READS AND WHY. The defect was that `theme` was not an input to the raster
// at all, so the only honest unit-level detector is the DRAW INPUTS — the arm table,
// the paint primitive's output, and the call sites that feed it. Painted bytes are
// NOT available here (see the note above: `toDataURL` is the REPO'S OWN setup stub
// — tests/setup.ts:140 — constant by construction,
// so a raster diff would report the arms identical and go green on the bug). The
// pixel claim is π's, and it is ENQUEUED as π-RERUN-D6 in this unit's PI-QUEUE.
//
// BORN-RED against the uncured bytes in a `git archive` mirror of 87464122, where
// the module exports no `STILL_ARMS`, no `stillColor` and no `StillTheme`. The RED
// lines are recorded verbatim in the unit record.
// ─────────────────────────────────────────────────────────────────────────────

describe("D6 · the frozen still carries a dark arm", () => {
    // Read INSIDE the rows, never destructured at collect time: against the uncured
    // bytes `STILL_ARMS` does not exist, and a collect-time read would take the whole
    // suite down as one un-attributed error instead of reporting which laws broke.
    const arm = (theme: StillTheme) => STILL_ARMS[theme];

    /** Every authored lightness stop, read from the generators that actually ask for it. */
    const stops = [
        ...stillSrc.matchAll(/stillColor\(\s*arm,\s*[^,]+,\s*(\d+(?:\.\d+)?)\s*[,)]/g),
    ].map((m) => Number(m[1]));

    it("declares two arms, and no field of one is the other's", () => {
        const [light, dark] = [arm("light"), arm("dark")];
        expect(stops.length).toBeGreaterThan(0);
        expect(light.sat).not.toBe(dark.sat);
        expect(light.ground).not.toBe(dark.ground);
        expect(light.mark).not.toBe(dark.mark);
        expect(light.specular).not.toBe(dark.specular);
    });

    it("inverts the ramp's polarity — light grounds ABOVE its marks, dark BELOW", () => {
        const [light, dark] = [arm("light"), arm("dark")];
        // The whole cure in one relation: in light the ground is the brightest thing
        // and the marks are ink on it; in dark the ground is the darkest thing and
        // the marks LIFT off it. A raster that merely darkened uniformly would keep
        // `ground > mark` in both arms and fail here.
        expect(light.ground).toBeGreaterThan(light.mark);
        expect(dark.ground).toBeLessThan(dark.mark);
    });

    it("puts the ENTIRE dark arm below the light arm's ground — no cream slab survives", () => {
        const [light, dark] = [arm("light"), arm("dark")];
        // The measured defect was an L≈0.93 slab on an L 0.34–0.57 page. Both dark
        // ends sitting under the light ground is the arm-level statement of that.
        expect(dark.ground).toBeLessThan(light.mark);
        expect(dark.mark).toBeLessThan(light.ground);
    });

    it("holds chroma in the dark band instead of collapsing to charcoal", () => {
        const [light, dark] = [arm("light"), arm("dark")];
        // hsl saturation is relative to lightness, so the dark arm must ask for MORE
        // of it to paint the same ember. This is the discipline aurora-hero names.
        expect(dark.sat).toBeGreaterThan(light.sat);
    });

    it("anchors the light arm on the ramp the generators actually author", () => {
        const light = arm("light");
        // If a generator ever asks for a stop outside `[mark, ground]`, the arm's
        // endpoints are a fiction and the dark map extrapolates past its own band.
        expect(Math.max(...stops)).toBe(light.ground);
        expect(Math.min(...stops)).toBe(light.mark);
    });

    it("keeps the LIGHT arm an exact identity — the cure moves no light byte", () => {
        const light = arm("light");
        expect(stops.length).toBeGreaterThan(0);
        for (const l of stops) {
            expect(stillColor(light, 40, l, 0.5)).toBe(`hsla(40, 48%, ${l}%, 0.5)`);
        }
    });

    it("lets NO authored lightness escape theming", () => {
        const [light, dark] = [arm("light"), arm("dark")];
        expect(stops.length).toBeGreaterThan(0);
        // Every stop the generators ask for must paint differently in the two arms.
        // This tally catches a `stillColor` call whose lightness is NON-LITERAL
        // (parsed stops < call tally). An ADDED literal colour moves neither side —
        // that class is the raw-hsla census row below. [2026-08-28 · adjudicated
        // CURE 2: the prior comment claimed this row caught the smuggled literal.]
        expect(stops.length).toBe((stillSrc.match(/stillColor\(arm,/g) ?? []).length);
        for (const l of stops) {
            expect(stillColor(dark, 40, l, 0.5)).not.toBe(
                stillColor(light, 40, l, 0.5),
            );
        }
    });

    it("pins the raw hsla() census to the two authored paint sites", () => {
        // [2026-08-28 · adjudicated CURE 2, the strengthen arm] Exactly TWO raw
        // `hsla(` sites are authored in the generator — the `stillColor` template
        // and the white specular. Any smuggled literal colour is a THIRD and REDs
        // this pin by arithmetic; a replacement literal is caught by the anchors
        // and stops rows. Closes the added-literal escape the tally row cannot see.
        expect((stillSrc.match(/hsla\(/g) ?? []).length).toBe(2);
    });

    it("keeps the specular streak WHITE and moves only its strength", () => {
        const [light, dark] = [arm("light"), arm("dark")];
        // The one off-ramp paint: a specular highlight is light-source coloured, so
        // it does not invert with the ground — it only softens against a dark plate.
        expect(stillSrc).toContain("hsla(0, 0%, 100%, ${arm.specular})");
        expect(dark.specular).toBeLessThan(light.specular);
    });

    it("requires a theme at the boundary — there is no default arm to inherit", () => {
        // Arity is the detector: a `theme: StillTheme = "light"` default would drop
        // it to 1 and silently re-introduce D6 at every un-migrated call site.
        expect(vizPreviewStill.length).toBe(2);
    });

    it("carries the arm in the MEMO KEY, so a flip cannot be served the wrong raster", () => {
        // Keying on the route alone is the defect restated: whichever theme asked
        // first would freeze the answer for both.
        expect(stillSrc).toContain("const key = `${theme}|${route}`");
        expect(stillSrc).toContain(
            "function render(spec: VizStillSpec, theme: StillTheme)",
        );
    });

    it("re-resolves on the FLIP at every landing that shows a still, not only on mount", () => {
        // The reactive read is what makes the second arm reach the page at all. All
        // three front doors resolve the ladder, so all three must track the theme.
        for (const src of [landingSrc, catalogSrc, introSrc]) {
            expect(src).toContain("useGlobalDark");
            expect(src).toContain("stillTheme");
        }
        expect(landingSrc).toContain(
            'resolveStoryTile(category.value?.id ?? "", story, stillTheme.value)',
        );
        expect(catalogSrc).toContain("resolveCategoryTile(category, stillTheme)");
        expect(introSrc).toContain("resolveCategoryTile(c, stillTheme.value)");
    });

    it("cures by REPAINTING, never by scrimming a light raster", () => {
        // A theme-conditional overlay on the still would hide a wrong-theme paint
        // rather than replace it — the masking-fallback class, refused by house law.
        expect(cardSrc).not.toMatch(/\.dark[^{]*section-preview-card-viz-still/);
        expect(cardSrc).not.toMatch(/section-preview-card-viz-still[^}]*\bfilter:/);
        expect(cardSrc).not.toMatch(/section-preview-card-viz-still::(?:after|before)/);
    });
});
