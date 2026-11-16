# ru55.py: MEASURE-7 step 4, RU-55 (with RU-65): the edits, applied once to the worktree.
#   - a glyph beside a word is sized from the word, 1.5 em, in an icon seat that also holds a word (o1's labelled seat)
#     as in a tab seat, and the tab seat's rule takes the four forms the icon seat's takes;
#   - k3's fixture pins its tab glyphs (`tabglyph=24`, an explicit size on the fixture's own svg), and k3 gains a
#     second cell: the same dock with unsized tab glyphs at a viewport that caps it, the same assertion.
import pathlib, sys
W = pathlib.Path("/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8")
def edit(rel, old, new, count=1):
    p = W / rel; s = p.read_text()
    if old not in s: sys.exit(f"{rel}: anchor not found: {old[:80]!r}")
    p.write_text(s.replace(old, new, count))

edit("src/components/dock/styles/controls/icon-button.css",
'''    .dock-icon-button > :is(svg, img, picture, [data-dock-glyph]) {
        width: var(--dock-control-glyph-size, 1.25rem);
        height: var(--dock-control-glyph-size, 1.25rem);
    }
''',
'''    .dock-icon-button > :is(svg, img, picture, [data-dock-glyph]) {
        width: var(--dock-control-glyph-size, 1.25rem);
        height: var(--dock-control-glyph-size, 1.25rem);
    }

    /* RU-55: a glyph never sizes its seat. In an icon seat that also holds a word (an element
       child that is not a glyph, o1's labelled seat), the glyph is sized from the word, 1.5 em,
       as in a tab seat, so the seat's block extent stays `--dock-control-size` at every share. */
    .dock-icon-button:has(> :not(svg, img, picture, [data-dock-glyph])) > :is(svg, img, picture, [data-dock-glyph]) {
        width: 1.5em;
        height: 1.5em;
        flex-shrink: 0;
    }
''')
edit("src/components/dock/styles/controls/tab-button.css",
'''    /* RU-45: a glyph beside a word is sized from the word, 1.5 em, not from the seat. */
    .dock-tab-button > svg {''',
'''    /* RU-45: a glyph beside a word is sized from the word, 1.5 em, not from the seat. RU-55
       (RU-65): in the four forms the icon seat sizes, a direct svg, img or picture, or any
       direct child marked `data-dock-glyph` (a site's own icon element). */
    .dock-tab-button > :is(svg, img, picture, [data-dock-glyph]) {''')
# k3's fixture: the tab glyphs pinned by the fixture itself
edit("tests-visual/release-10-1-5/harness.ts",
'''        const tab = (label: string, i: number) =>
            h(
                DockControl,
                {
                    shape: "tab",
                    "data-witness": `S${i + 1}`,
                    "aria-current": current === i + 1 ? "page" : undefined,
                },
                () => [glyph(), h("span", label)],
            );''',
'''        // `?tabglyph=<px>`: the tab seats' glyphs carry an explicit size, so a fixture that
        // needs a width does not take it from a glyph default (W-I.8 RU-55, k3).
        const tabGlyph = params.get("tabglyph");
        const tab = (label: string, i: number) =>
            h(
                DockControl,
                {
                    shape: "tab",
                    "data-witness": `S${i + 1}`,
                    "aria-current": current === i + 1 ? "page" : undefined,
                },
                () => [
                    tabGlyph
                        ? h("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", style: `width:${tabGlyph}px;height:${tabGlyph}px;flex-shrink:0` }, [h("circle", { cx: 12, cy: 12, r: 9, fill: "currentColor" })])
                        : glyph(),
                    h("span", label),
                ],
            );''')
edit("tests-visual/release-10-1-5.spec.ts",
'''function k3(): void {
    test("k3 at 320: a capped dock whose seats all show holds the fit law and rests round", async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 800 });
        await openSeats(page, "kinds=tab:Home,icon,icon,tab:Settings");
        const read = await readPlate(page);
        expect(read.w, "the dock is capped by the viewport").toBeGreaterThanOrEqual(316);''',
'''/* W-I.8 RU-55, restated fixture: k3's dock reached the viewport's cap through the icon
   library's default 24 px tab glyph, which no ruling chose; the fixture now pins its own tab
   glyphs at 24 px (`tabglyph=24`), and a second cell reads the same law on the default dock
   (unsized tab glyphs at 1.5 em) at a viewport narrow enough to cap it. The assertion is
   unchanged: the dock is capped by the viewport, then the fit law. */
function k3(width = 320, glyphs = "&tabglyph=24"): void {
    test(`k3 at ${width}${glyphs ? "" : ", unsized tab glyphs"}: a capped dock whose seats all show holds the fit law and rests round`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await openSeats(page, `kinds=tab:Home,icon,icon,tab:Settings${glyphs}`);
        const read = await readPlate(page);
        expect(read.w, "the dock is capped by the viewport").toBeGreaterThanOrEqual(width - 4);''')
p = W / "tests-visual/release-10-1-5.spec.ts"; s = p.read_text()
for old, new in (("    k1();\n    k3();\n});", "    k1();\n    k3();\n    k3(306, \"\");\n});"), ("\nk1();\nk3();\n", "\nk1();\nk3();\nk3(306, \"\");\n")):
    if s.count(old) != 1: sys.exit(f"k3 call anchor: {old!r}")
    s = s.replace(old, new)
p.write_text(s)
print("ru55 applied")
