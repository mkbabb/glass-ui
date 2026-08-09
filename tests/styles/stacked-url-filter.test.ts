import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import postcss from "postcss";
import { describe, expect, it } from "vitest";

// The BK row #7 UNIT CASE (SE-7 — no gate seat). TWO independent invariants:
//
//   1. THE DOCK FENCE — the #7→#47 (GF-DOCK) design fence, NOT an arm of
//      G-NO-STACKED-URL-FILTER (the roster re-scope drops "dock" from that gate).
//      Zero `filter` declarations under src/components/dock/**/*.css outside a named
//      allowlist. Whole-directory, so `@media`-nested rules, attribute selectors and
//      non-root subjects are all covered without resolving one selector.
//
//   2. THE STACKED CASE — G-NO-STACKED-URL-FILTER's own invariant: NO file paints
//      `filter: url(#…)` alongside a `backdrop-filter` lens of its own (the
//      SIGABRT-class composite), detected as file-local CO-OCCURRENCE rather than DOM
//      ancestry — see the case body. ~~Latched BORN-RED via the house `it.fails` idiom
//      (tests/gates/token-hygiene.test.ts:131 precedent) — #40 W-PAGER owns the flip.~~
//      [2026-08-08 · #40 W-PAGER completion · STRUCK IN PLACE] FLIPPED. The latch was
//      born-RED on `PagerDots.vue:493` and #40 emptied it by DELETING the mechanism,
//      not by relocating it: the worm is filterless — no `<filter>`, no `<clipPath>`,
//      no `url(#…)` anywhere in the component — so the population is empty in `src/`
//      and the case is a LIVE assertion. `it.fails` here would now be the inverted
//      form: a green latch over a held invariant reports RED forever.
//
// Both read AUTHORED CSS only. The JS inline blur channel (useElementMorph.ts,
// useLiquidReveal.ts, useDockCtaReceive.ts) is structurally invisible here and is owned
// by the motion rows.

const root = join(process.cwd(), "src");

const files = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const path = join(dir, entry.name);
        return entry.isDirectory() ? files(path) : [path];
    });

// Executable CSS: a `.css` file whole, or an SFC's `<style>` blocks (line-anchored so a
// `<style>` MENTION inside a doc comment is not parsed as CSS).
const styleBlocks = (file: string, source: string): string[] =>
    file.endsWith(".css")
        ? [source]
        : Array.from(
              source.matchAll(/^\s*<style\b[^>]*>([\s\S]*?)<\/style\s*>/gim),
              (match) => match[1],
          );

const walkFilters = (
    file: string,
    source: string,
    visit: (decl: postcss.Declaration) => void,
): void => {
    for (const css of styleBlocks(file, source))
        postcss.parse(css, { from: file }).walkDecls(/^(?:-webkit-)?filter$/, visit);
};

// ONE hop, same file: `--custom-prop: …` (CSS or JS style object) and `const id = …`.
const bindings = (source: string): Map<string, string> =>
    new Map(
        Array.from(
            source.matchAll(
                /(?:["']?(--[\w-]+)["']?\s*:|\bconst\s+([A-Za-z_$][\w$]*)\s*=)([^;\n]*)/g,
            ),
        ).map((match) => [match[1] ?? match[2], match[3].replace(/[,;]\s*$/, "").trim()]),
    );

const paintsUrlFilter = (file: string, source: string): boolean => {
    const hops = bindings(source);
    let hit = false;
    walkFilters(file, source, ({ value }) => {
        const name = value.match(/var\(\s*(--[\w-]+)/)?.[1];
        const hop = hops.get(name ?? "") ?? "";
        const alias = hop.match(/^([A-Za-z_$][\w$]*)$/)?.[1];
        hit ||= /url\(\s*["']?#/.test(value + hop + (hops.get(alias ?? "") ?? ""));
    });
    return hit;
};

// Class tokens the file's own MARKUP puts on an element — the ancestry channel.
const markupClasses = (source: string): Set<string> =>
    new Set(
        Array.from(source.matchAll(/\bclass\s*=\s*(["'])([\s\S]*?)\1/g)).flatMap(
            (match) => match[2].match(/[\w-]+/g) ?? [],
        ),
    );

const sources = files(root)
    .filter((file) => /\.(?:css|vue)$/.test(file))
    .sort()
    .map((file) => ({ file, source: readFileSync(file, "utf8") }));

// Every class that declares `backdrop-filter` ANYWHERE in src/ — derived, never pinned.
const backdropClasses = new Set<string>();
for (const { file, source } of sources)
    for (const css of styleBlocks(file, source))
        postcss
            .parse(css, { from: file })
            .walkDecls(/^(?:-webkit-)?backdrop-filter$/, (decl) => {
                const rule = decl.parent as postcss.Rule;
                for (const selector of rule?.selectors ?? [])
                    for (const found of selector.match(/\.[\w-]+/g) ?? [])
                        backdropClasses.add(found.slice(1));
            });

describe("stacked url() filter — the row #7 unit case", () => {
    // The one live dock filter: the icon-button press DARKEN leg, routed to #47 (its
    // same-element `filter` + `backdrop-filter` is a different class from the
    // ancestor backdrop-root the fence forbids; GF-DOCK adjudicates it).
    const DOCK_FILTER_ALLOWLIST = ["components/dock/styles/controls/icon-button.css"];

    it("the dock CSS declares no filter outside the named allowlist", () => {
        const offenders: string[] = [];
        for (const file of files(join(root, "components/dock")).filter((path) =>
            path.endsWith(".css"),
        ))
            walkFilters(file, readFileSync(file, "utf8"), (decl) => {
                const path = relative(root, file);
                if (!DOCK_FILTER_ALLOWLIST.includes(path))
                    offenders.push(`${path}: ${decl.prop}: ${decl.value}`);
            });

        expect(offenders).toEqual([]);
    });

    // FLIPPED 2026-08-08 at #40 W-PAGER's completion — the born-RED `it.fails` latch REDDED
    // the moment the invariant held, which is the receipt it was built to emit. LIVE now:
    // this reds if any file re-introduces the stacked composite. Do not re-latch it.
    it(
        "no file paints filter: url(#…) co-occurring with its own backdrop-filter lens — HELD since #40 W-PAGER emptied PagerDots.vue",
        () => {
            // STACKED = the file paints a url() filter in its AUTHORED CSS AND its own
            // markup names a class that declares `backdrop-filter` somewhere in src/.
            // That is FILE-LOCAL CO-OCCURRENCE, not DOM ancestry — the predicate never
            // proves the filtered element sits under the backdrop element, which is why a
            // RELOCATION of the worm layer inside the same SFC would never have emptied
            // it. Nothing was relocated: the filter is deleted.
            // SVG `filter="url(#…)"` PRESENTATION ATTRIBUTES (HandMark.vue:299) are not
            // authored CSS — postcss reads declarations only and never sees them, so the
            // exclusion is structural, not a regex carve. It is NOT an exclusion on
            // compositing grounds: a presentation attribute IS the CSS `filter` property
            // (author origin, zero specificity) and composites exactly like one.
            const stacked = sources
                .filter(
                    ({ file, source }) =>
                        paintsUrlFilter(file, source) &&
                        [...markupClasses(source)].some((token) =>
                            backdropClasses.has(token),
                        ),
                )
                .map(({ file }) => relative(root, file));

            expect(
                stacked,
                "STACKED filter: url(#…) co-occurring with a backdrop lens — the SIGABRT-class composite. The last inhabitant was PagerDots.vue:493 (the goo filter on `.pager-worm-layer` beside the same SFC's `.glass-pager-ring` backdrop lens), emptied at #40 W-PAGER by deleting the filter. Delete the url() filter or move the lens out of the file; do not re-latch this case.",
            ).toEqual([]);
        },
    );
});
