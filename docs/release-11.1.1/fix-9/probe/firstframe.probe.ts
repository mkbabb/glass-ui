// Fix seat 9, item 1's witness: a film started with the spec's own `startFilm` and marked at
// once with `markFilm` holds a frame strictly before its mark. FILMS films a project (60
// unless set) on a plain page; each film whose first frame is not before its mark is a case,
// and the margins (the mark less the first frame's stamp) are counted by whole millisecond.
// The film module is copied in beside this file from the commit under test (run.sh).
import { expect, test } from "@playwright/test";
import { markFilm, startFilm, stopFilm } from "./film";

const FILMS = Number(process.env.FILMS ?? 60);

test("firstframe · a film holds a frame before its mark", async ({ page }, info) => {
    test.setTimeout(FILMS * 1000 + 30_000);
    await page.setContent("<!doctype html><div id='box' style='width:100px;height:100px;background:#888'></div>");
    const cases: { mark: number; first: number }[] = [];
    const margins: Record<string, number> = {};
    for (let i = 0; i < FILMS; i++) {
        await startFilm(page, "#box");
        await markFilm(page);
        const film = await stopFilm(page, 40);
        const first = film.frames[0];
        const margin = film.mark - first.t;
        const bin = margin <= 0 ? "<=0" : margin < 1 ? "<1" : margin < 2 ? "<2" : margin < 4 ? "<4" : ">=4";
        margins[bin] = (margins[bin] ?? 0) + 1;
        if (!(first.t < film.mark)) cases.push({ mark: +film.mark.toFixed(3), first: +first.t.toFixed(3) });
    }
    const at = JSON.stringify({ films: FILMS, cases: cases.slice(0, 8), notBefore: cases.length, margins });
    await info.attach("firstframe", { body: at, contentType: "application/json" });
    expect(cases.length, `every film holds a frame before its mark ${at}`).toBe(0);
});
