#!/usr/bin/env node
// R-B · WebKit page-close isolation on the accordion trigger (PF-1 and the prototype). Each step on a fresh page; a
// step is ALIVE when the page still answers an evaluate 1.5 s later.
//   node wk-isolate.mjs --build <dir> [--engine webkit]
import { witness, openPage, center } from "../../harness/lib.mjs";
const alive = async (P) => { try { await Promise.race([P.page.evaluate(() => 1), new Promise((_, r) => setTimeout(() => r(new Error("no answer 10 s")), 10000))]); return "ALIVE"; } catch (e) { return `CLOSED (${String(e.message).slice(0, 60)})`; } };
await witness("R-B wk", "accordion trigger page-close isolation", async ({ E, T, cell, engine }) => {
  const steps = {
    "programmatic commit (no input)": async (P) => { await P.page.evaluate(() => window.__e.commit()); },
    "focus only": async (P) => { await P.page.focus(".disclosure-trigger"); },
    "Space down (press, no commit)": async (P) => { await P.page.focus(".disclosure-trigger"); await P.page.keyboard.down("Space"); },
    "Enter (press + commit)": async (P) => { await P.page.focus(".disclosure-trigger"); await P.page.keyboard.press("Enter"); },
    "pointer move onto trigger": async (P) => { const c = await center(P.page, ".disclosure-trigger"); await P.page.mouse.move(c.x, c.y); },
  };
  for (const [name, fn] of Object.entries(steps)) {
    let P;
    try { P = await openPage(E, T, "accordion"); await fn(P); await P.page.waitForTimeout(1500); cell(`${engine} ${name}`, "REPORT", await alive(P)); }
    catch (e) { cell(`${engine} ${name}`, "REPORT", `CLOSED (${String(e.message).slice(0, 80)})`); await E.kill(); }
    finally { try { await P?.close(); } catch {} }
  }
});
