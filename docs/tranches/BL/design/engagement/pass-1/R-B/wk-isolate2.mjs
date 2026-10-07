#!/usr/bin/env node
// R-B · which paint closes the WebKit page on the accordion trigger. On any build: each step is a fresh browser and
// page, a style injected on the trigger with no input at all, then ALIVE or CLOSED 1.5 s later.
//   node wk-isolate2.mjs --build <dir> [--engine webkit]
import { witness, openPage } from "../../harness/lib.mjs";
const STEPS = {
  "control: background red": "background: red",
  "background var(--glass-plate-quiet)": "background: var(--glass-plate-quiet)",
  "background var(--glass-plate-resting)": "background: var(--glass-plate-resting)",
  "background var(--control-surface-bg-hover) (the hover rule's value)": "background: var(--control-surface-bg-hover)",
  "scale 0.97 only": "scale: 0.97",
  "on the Switch root: background var(--control-surface-bg-hover)": null,
};
await witness("R-B wk2", "trigger paint isolation, no input", async ({ E, T, cell, engine }) => {
  for (const [name, css] of Object.entries(STEPS)) {
    let verdict;
    try {
      const sc = css === null ? "switch" : "accordion";
      const sel = css === null ? '[role="switch"]' : ".disclosure-trigger";
      const P = await openPage(E, T, sc);
      await P.page.addStyleTag({ content: `${sel} { ${css ?? "background: var(--control-surface-bg-hover)"} !important; }` });
      await P.page.waitForTimeout(1500);
      verdict = await Promise.race([P.page.evaluate((s) => `ALIVE · computed background ${getComputedStyle(document.querySelector(s)).backgroundColor}`, sel), new Promise((_, r) => setTimeout(() => r(new Error("no answer 10 s")), 10000))]);
    } catch (e) { verdict = `CLOSED (${String(e.message).split("\n")[0].slice(0, 70)})`; }
    cell(`${engine} ${name}`, "REPORT", verdict);
    await E.kill();
  }
});
