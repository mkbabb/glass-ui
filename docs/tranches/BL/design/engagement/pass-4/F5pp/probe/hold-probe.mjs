#!/usr/bin/env node
// F-11's probe cell (D5 pass 4, F5″; REGISTRY §P3-8.2, §P3-7 item 3). Not a witness and not a CK row: a cure with a probe
// cell beside it. On the harness's `slider` scene, one browser per run, a context per cell, all closed in finally (the
// harness's witness wrapper, lib.mjs):
//   secondary press   fine pointer: a right-button press on the thumb, its release, then a primary click on empty page.
//                     PASS when the slider root never reads `data-held` and nothing reads `data-engaged` after the click
//                     (C-E3 §0.5: Playwright WebKit sends pointerdown button 2 and contextmenu and no pointerup; at F5′
//                     the hold stuck with the veil open)
//   contextmenu ends  fine pointer: a primary press on the thumb (held: the precondition, else NOT DRIVEN), then a
//                     `contextmenu` dispatched at the thumb with the button still down. PASS when the hold is gone
//   control-click     REPORT: a Control-held primary press; whether the engine fires contextmenu, and the hold after it
//   touch long press  coarse: a touch held on the thumb, read at +200 ms and +1500 ms (past any long-press timeout) and
//                     300 ms after the touch ends. PASS when held at both reads and released after; the line counts the
//                     contextmenu events the engine fired during the hold
// Real Safari: UNMEASURED (owner's safaridriver checkbox).
//   node hold-probe.mjs --build <dir> --engine chromium|webkit --out <dir>
import { witness, openPage, openTouchPage, center } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";

const ROOT = ".glass-slider", THUMB = '[role="slider"]';
const COUNT = () => { window.__cm = 0; window.addEventListener("contextmenu", () => { window.__cm++; }, true); };
const read = (page) => page.evaluate(([r]) => ({ held: !!document.querySelector(r)?.hasAttribute("data-held"), engaged: document.querySelectorAll("[data-engaged]").length, cm: window.__cm ?? 0 }), [ROOT]);
const s = (r) => `held ${r.held} engaged ${r.engaged} contextmenu ${r.cm}`;

await witness("F-11", "useHold: the primary button only; a contextmenu ends a pointer hold (probe)", async ({ E, T, cell, guard, engine }) => {
  const r1 = await guard("secondary press", async () => {
    const P = await openPage(E, T, "slider");
    try {
      await P.page.evaluate(COUNT);
      const { x, y } = await center(P.page, THUMB);
      await P.page.mouse.move(x, y); await P.page.mouse.down({ button: "right" }); await P.page.waitForTimeout(200);
      const a = await read(P.page);
      await P.page.mouse.up({ button: "right" }); await P.page.waitForTimeout(200);
      const b = await read(P.page);
      await P.page.mouse.click(650, 470); await P.page.waitForTimeout(400);
      const c = await read(P.page);
      return { a, b, c };
    } finally { await P.close(); }
  }, 30000);
  if (r1.crashed) cell("F-11 secondary press", "FAIL", r1.line);
  else cell("F-11 secondary press", !r1.a.held && !r1.b.held && !r1.c.held && !r1.c.engaged ? "PASS" : "FAIL", `pressed: ${s(r1.a)} · released: ${s(r1.b)} · after a primary click elsewhere: ${s(r1.c)}${r1.note ? ` · ${r1.note}` : ""}`);

  const r2 = await guard("contextmenu ends", async () => {
    const P = await openPage(E, T, "slider");
    try {
      await P.page.evaluate(COUNT);
      const { x, y } = await center(P.page, THUMB);
      await P.page.mouse.move(x, y); await P.page.mouse.down(); await P.page.waitForTimeout(200);
      const a = await read(P.page);
      await P.page.evaluate((t) => document.querySelector(t).dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true })), THUMB);
      await P.page.waitForTimeout(200);
      const b = await read(P.page);
      await P.page.mouse.up(); await P.page.waitForTimeout(200);
      return { a, b, c: await read(P.page) };
    } finally { await P.close(); }
  }, 30000);
  if (r2.crashed) cell("F-11 contextmenu ends a pointer hold", "FAIL", r2.line);
  else if (!r2.a.held) cell("F-11 contextmenu ends a pointer hold", "FAIL", `NOT DRIVEN: the primary press did not hold (${s(r2.a)})`);
  else cell("F-11 contextmenu ends a pointer hold", !r2.b.held ? "PASS" : "FAIL", `pressed: ${s(r2.a)} · contextmenu, button still down: ${s(r2.b)} · after the release: ${s(r2.c)}${r2.note ? ` · ${r2.note}` : ""}`);

  const r3 = await guard("control-click", async () => {
    const P = await openPage(E, T, "slider");
    try {
      await P.page.evaluate(COUNT);
      const { x, y } = await center(P.page, THUMB);
      await P.page.mouse.move(x, y); await P.page.keyboard.down("Control"); await P.page.mouse.down(); await P.page.waitForTimeout(200);
      const a = await read(P.page);
      await P.page.mouse.up(); await P.page.keyboard.up("Control"); await P.page.waitForTimeout(300);
      return { a, b: await read(P.page) };
    } finally { await P.close(); }
  }, 30000);
  if (r3.crashed) cell("F-11 control-click", "REPORT", r3.line);
  else cell("F-11 control-click", "REPORT", `Control + primary press: ${s(r3.a)} · after release: ${s(r3.b)}`);

  const r4 = await guard("touch long press", async () => {
    const P = await openTouchPage(E, T, "slider");
    try {
      if (!P.modeOk) return { mode: P.modeLine };
      await P.page.evaluate(COUNT);
      const { x, y } = await center(P.page, THUMB);
      const [a, b] = await P.holdAt(x, y, [200, 1500], () => read(P.page));
      await P.page.waitForTimeout(300);
      return { a, b, c: await read(P.page) };
    } finally { await P.close(); }
  }, 45000);
  if (r4.crashed) cell("F-11 touch long press", "FAIL", r4.line);
  else if (r4.mode) cell("F-11 touch long press", "UNMEASURED", `coarse mode not set: ${r4.mode}`);
  else cell("F-11 touch long press", r4.a.held && r4.b.held && !r4.c.held ? "PASS" : "FAIL", `+200 ms: ${s(r4.a)} · +1500 ms: ${s(r4.b)} · 300 ms after the touch ends: ${s(r4.c)}${r4.note ? ` · ${r4.note}` : ""}`);
}, 600);
