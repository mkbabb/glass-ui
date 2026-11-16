// Critic 3: does a var() fallback of `revert-layer` hand an unset --collapsible-gap back
// to a consumer's padding in an earlier cascade layer? Plain CSS, no library, no server.
//   node cure-check.mjs <chromium|webkit> <out-dir>
import { chromium, webkit } from "playwright";
import { existsSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
const [engineName, outDir] = process.argv.slice(2);
const wk = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
const browser = await (engineName === "webkit" ? webkit : chromium).launch(engineName === "webkit" && existsSync(wk) ? { executablePath: wk } : {});
let out;
try {
    const context = await browser.newContext({ viewport: { width: 390, height: 600 } });
    try {
        const page = await context.newPage();
        await page.setContent(`<!doctype html><style>
@layer base, components;
@layer base { .pad { padding: 16px } }
@layer components {
  :where(.built) { padding-block-start: var(--gap, 0px) }
  :where(.candidate) { padding-block-start: var(--gap, revert-layer) }
}
.plain { padding: 16px }
</style>
<div id="built-base" class="built pad">x</div>
<div id="built-base-gap" class="built pad" style="--gap: 12px">x</div>
<div id="candidate-base" class="candidate pad">x</div>
<div id="candidate-base-gap" class="candidate pad" style="--gap: 12px">x</div>
<div id="candidate-none" class="candidate">x</div>
<div id="candidate-none-gap" class="candidate" style="--gap: 12px">x</div>
<div id="candidate-plain-gap" class="candidate plain" style="--gap: 12px">x</div>`);
        out = await page.evaluate(() => Object.fromEntries([...document.querySelectorAll("div")].map((d) => [d.id, getComputedStyle(d).paddingTop])));
    } finally { await context.close(); }
} finally { await browser.close(); }
writeFileSync(join(outDir, `cure-check-${engineName}.json`), JSON.stringify(out, null, 2));
console.log(engineName, JSON.stringify(out));
