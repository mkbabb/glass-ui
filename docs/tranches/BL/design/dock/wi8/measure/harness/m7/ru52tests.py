# ru52tests.py: MEASURE-7 step 4, RU-52's restated tests. A fitting run is not a scroll port, so the reserve tests that
# asserted the run clips and holds a focused seat's ring inside its padding box on a run that fits are restated to
# "the end seat's ring paints whole at offset 0": on a dock with `data-run-fits` the run's offset is 0 and the ring
# lies inside every clipping box between the seat and the dock root (the run is not one). A run that does not fit is
# asserted as before. The two helpers carry it, so every test that calls them on a fitting run is restated at once:
# c4 (coarse 390 and desktop), e2 (390, 1440), e3's closing ring check, e4 (390, 1440).
import pathlib, sys
p = pathlib.Path("/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/tests-visual/release-10-1-5.spec.ts")
s = p.read_text()
def rep(old, new):
    global s
    if s.count(old) != 1: sys.exit(f"anchor count {s.count(old)}: {old[:90]!r}")
    s = s.replace(old, new)
REASON = '''    // W-I.8 RU-52, restated: a run whose seats all show is not a scroll port (its overflow is
    // visible under `data-run-fits`), so it neither clips nor scrolls; the shipped promise that a
    // fitting run keeps up to two rings of scroll for the ring is reversed. On a fitting run the
    // end seat's ring paints whole at offset 0: the run's offset is 0 and the ring lies inside
    // every clipping box between the seat and the dock root. A run that does not fit is read as before.
'''
# expectFocusedRingWhole
rep('''        return {
            focusVisible: el.matches(":focus-visible"),
            hover: el.matches(":hover"),
            scale: s,
            width: r.width,
            outline: cs.outlineStyle,
            ink,
            ring,
            clips,
        };
    });
    const cell = `${witness} (${JSON.stringify(read)})`;
    expect(read.focusVisible && read.hover, `${cell}: focused and hovered`).toBe(true);
    await expectHoverScale(page, String(read.scale), cell);
    expect(read.outline, `${cell}: the ring paints`).not.toBe("none");
    expect(read.clips.length, `${cell}: the run clips`).toBeGreaterThan(0);''',
'''        const run = el.closest<HTMLElement>(".dock-run");
        return {
            focusVisible: el.matches(":focus-visible"),
            hover: el.matches(":hover"),
            scale: s,
            width: r.width,
            outline: cs.outlineStyle,
            ink,
            ring,
            clips,
            fits: !!el.closest(".glass-dock")?.hasAttribute("data-run-fits"),
            offset: run ? run.scrollLeft + run.scrollTop : 0,
        };
    });
    const cell = `${witness} (${JSON.stringify(read)})`;
    expect(read.focusVisible && read.hover, `${cell}: focused and hovered`).toBe(true);
    await expectHoverScale(page, String(read.scale), cell);
    expect(read.outline, `${cell}: the ring paints`).not.toBe("none");
''' + REASON + '''    if (read.fits) expect(read.offset, `${cell}: a fitting run rests at offset 0`).toBe(0);
    else expect(read.clips.length, `${cell}: the run clips`).toBeGreaterThan(0);''')
# expectRingInsideRun
rep('''async function expectRingInsideRun(page: Page, witness: string, cell: string): Promise<void> {
    const read = await page.locator(`[data-witness="${witness}"]`).evaluate((el) => {
        const run = el.closest<HTMLElement>(".dock-run")!;
        const cs = getComputedStyle(el);
        const s = cs.scale === "none" ? 1 : Number.parseFloat(cs.scale);
        const ink = (Number.parseFloat(cs.outlineWidth) + Number.parseFloat(cs.outlineOffset)) * s;
        const r = el.getBoundingClientRect();
        const p = run.getBoundingClientRect();
        return {''',
'''async function expectRingInsideRun(page: Page, witness: string, cell: string): Promise<void> {
''' + REASON + '''    const read = await page.locator(`[data-witness="${witness}"]`).evaluate((el) => {
        const run = el.closest<HTMLElement>(".dock-run")!;
        const cs = getComputedStyle(el);
        const s = cs.scale === "none" ? 1 : Number.parseFloat(cs.scale);
        const ink = (Number.parseFloat(cs.outlineWidth) + Number.parseFloat(cs.outlineOffset)) * s;
        const r = el.getBoundingClientRect();
        const fits = !!el.closest(".glass-dock")?.hasAttribute("data-run-fits");
        // On a fitting run the box to stay inside is every clipping box up to the dock root; the run is not one.
        let p = run.getBoundingClientRect();
        let w = run.clientWidth, hgt = run.clientHeight;
        if (fits) {
            p = new DOMRect(-1e6, -1e6, 2e6, 2e6);
            w = 2e6; hgt = 2e6;
            for (let a = el.parentElement; a; a = a.parentElement) {
                const o = getComputedStyle(a);
                if (o.overflowX !== "visible" || o.overflowY !== "visible") {
                    const b = a.getBoundingClientRect();
                    const l = Math.max(p.left, b.left), t = Math.max(p.top, b.top);
                    const rr = Math.min(p.left + w, b.left + a.clientWidth), bb = Math.min(p.top + hgt, b.top + a.clientHeight);
                    p = new DOMRect(l, t, rr - l, bb - t); w = rr - l; hgt = bb - t;
                }
                if (a.classList.contains("glass-dock")) break;
            }
        }
        return {
            fits,
            offset: run.scrollLeft + run.scrollTop,''')
rep('''                r: +(r.right + ink - (p.left + run.clientWidth)).toFixed(2),
                t: +(p.top - (r.top - ink)).toFixed(2),
                b: +(r.bottom + ink - (p.top + run.clientHeight)).toFixed(2),''',
'''                r: +(r.right + ink - (p.left + w)).toFixed(2),
                t: +(p.top - (r.top - ink)).toFixed(2),
                b: +(r.bottom + ink - (p.top + hgt)).toFixed(2),''')
rep('''    expect(read.outline, `${at}: the ring paints`).not.toBe("none");
    for (const [side, past] of Object.entries(read.past)) {
        expect(past, `${at}: ring inside the run (${side})`).toBeLessThanOrEqual(0.5);
    }''',
'''    expect(read.outline, `${at}: the ring paints`).not.toBe("none");
    if (read.fits) expect(read.offset, `${at}: a fitting run rests at offset 0`).toBe(0);
    for (const [side, past] of Object.entries(read.past)) {
        expect(past, `${at}: ring inside ${read.fits ? "every clipping box" : "the run"} (${side})`).toBeLessThanOrEqual(0.5);
    }''')
p.write_text(s)
print("ru52 tests restated")
