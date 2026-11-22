// Fix seat 10, item 1's witness: a page that reloads in the middle of a film. The film is
// started on the exits harness with the spec's own `startFilm` and marked, then a
// tsconfig.json is written under the checkout's `.cache`, which the demo server watches:
// Vite 8 reloads every page it serves when it sees a tsconfig.json added, changed or
// removed anywhere it watches (`reloadOnTsconfigChange`). That is what critic 9's plant
// tree did to the exits gate. The probe counts the page's main-frame navigations itself,
// then asks that `stopFilm` fail by name and name the reload. The film module is copied
// in beside this file from the commit under test (run.sh).
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { markFilm, startFilm, stopFilm } from "./film";

const ROUNDS = Number(process.env.ROUNDS ?? 5);
const dir = new URL("../../.cache/fix10-reload/", import.meta.url).pathname;

test.afterAll(() => rmSync(dir, { recursive: true, force: true }));

test("lost · a film the page loses mid-way fails by name", async ({ page }, info) => {
    test.setTimeout(ROUNDS * 10_000 + 30_000);
    let navigations = 0;
    page.on("framenavigated", (frame) => {
        if (frame === page.mainFrame()) navigations++;
    });
    mkdirSync(dir, { recursive: true });
    const rounds: { reloaded: number; error: string }[] = [];
    for (let i = 0; i < ROUNDS; i++) {
        await page.goto("/tests-visual/release-11-1-1/exits-harness.html");
        await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
        await page.waitForTimeout(400);
        await startFilm(page, '[data-testid="x-expand"]');
        await markFilm(page);
        const before = navigations;
        writeFileSync(`${dir}tsconfig.json`, `${JSON.stringify({ round: i })}\n`);
        const error = await stopFilm(page, 1500).then(
            () => "",
            (e: Error) => e.message.split("\n")[0].slice(0, 600),
        );
        rounds.push({ reloaded: navigations - before, error });
    }
    const at = JSON.stringify(rounds);
    await info.attach("lost", { body: at, contentType: "application/json" });
    for (const r of rounds) {
        expect(r.reloaded, `the write reloaded the page ${at}`).toBeGreaterThan(0);
        expect(r.error, `the lost film fails by name and names the reload ${at}`).toMatch(
            /^the page lost its film: it navigated or reloaded .*"navigations":\["\+\d+ ms http:\/\/localhost:\d+\/tests-visual\/release-11-1-1\/exits-harness\.html"/,
        );
    }
});
