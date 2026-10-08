#!/usr/bin/env node
// kbdprobe.mjs · R-D: the radio keyboard commit, light vs dark: focus and data-state of each radio after the Tab entry
// and after ArrowDown, plus the target's --commit-t over 300 ms.  node kbdprobe.mjs <build dir> [chromium|webkit]
const H = new URL("../../harness/", import.meta.url).pathname;
const L = await import(`${H}lib.mjs`);
const [build, engine = "chromium"] = process.argv.slice(2);
await L.acquireLock();
const T = await L.serveTarget({ build }); const E = new L.Engine(engine); await E.browser();
console.log(`# kbdprobe · ${engine} ${E.version} · ${L.browserCensus()} · load ${L.load()} at start`);
for (const theme of ["light", "dark"]) {
  const P = await L.openPage(E, T, "radio", { theme });
  const st = () => P.page.evaluate(() => [...document.querySelectorAll('[role="radio"]')].map((r) => `${r.getAttribute("data-state")}${r === document.activeElement ? "*" : ""} t=${(+getComputedStyle(r).getPropertyValue("--commit-t")).toFixed(2)}`).join(" | "));
  await P.page.focus('[data-sentinel="before"]'); const s0 = await st();
  await P.page.keyboard.press(L.tabKey(engine)); await P.page.waitForTimeout(600); const s1 = await st();
  await P.page.keyboard.press("ArrowDown"); await P.page.waitForTimeout(60); const s2 = await st(); await P.page.waitForTimeout(600); const s3 = await st();
  console.log(`${theme}\n  start   ${s0}\n  Tab     ${s1}\n  +60ms   ${s2}\n  +660ms  ${s3}`);
  // the harness's exact order: sample armed, Tab, sample armed, ArrowDown (no settle wait)
  const Q = await L.openPage(E, T, "radio", { theme }); const SEL = ['[data-e~="target"]', '[data-e~="body"]'];
  const sm = (ms = 800) => Q.page.evaluate(([t, b, ms]) => window.__sample(t, b, ms), [...SEL, ms]);
  await Q.page.focus('[data-sentinel="before"]'); let pr = sm(700); await Q.page.keyboard.press(L.tabKey(engine)); await pr;
  const tgt = await Q.page.evaluate(() => { const t = document.querySelector('[data-e~="target"]'); return `${t?.getAttribute("data-state")} ${t?.getAttribute("value") ?? ""} radios ${document.querySelectorAll('[role="radio"]').length} target-is-2nd ${t === document.querySelectorAll('[role="radio"]')[1]}`; });
  pr = sm(); await Q.page.keyboard.press("ArrowDown"); const fr = await pr;
  console.log(`  harness order: target ${tgt} · after: ${await Q.page.evaluate(() => [...document.querySelectorAll('[role="radio"]')].map((r) => r.getAttribute("data-state") + (r === document.activeElement ? "*" : "")).join(" | "))} · ${L.commitBar(fr).line}`);
  await Q.close();
  await P.close();
}
console.log(`# load ${L.load()} at end`); await E.close(); process.exit(0);
