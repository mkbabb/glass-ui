#!/usr/bin/env node
// fc.mjs · C-CP, CK-13: under forced colours (Chromium emulation) and reduced transparency (Chromium emulated media
// feature), what the commit seat, the [data-press] fill and the slider's focus veil compute. One line per scene × mode.
//   node fc.mjs --build <dir> --label <l>
import { Engine, serveTarget, openPage, acquireLock, load, parseArgs } from "../../../harness/lib.mjs";
const a = parseArgs(); await acquireLock(); const T = await serveTarget({ build: a.build }); const E = new Engine("chromium"); await E.browser();
const SC = { switch: ['[role="switch"]', '[role="switch"] [data-engage-light]', null], accordion: [".disclosure-trigger", ".disclosure-trigger", "::after"], button: [".button", ".button", "::after"], slider: ['[role="slider"]', ".glass-focus-veil", null] };
try {
  for (const mode of ["none", "forced-colors", "reduced-transparency"]) for (const [scene, [tgt, seat, ps]] of Object.entries(SC)) {
    const P = await openPage(E, T, scene, { theme: "light" });
    const cdp = await P.ctx.newCDPSession(P.page);
    const features = mode === "forced-colors" ? [{ name: "forced-colors", value: "active" }] : mode === "reduced-transparency" ? [{ name: "prefers-reduced-transparency", value: "reduce" }] : [];
    await cdp.send("Emulation.setEmulatedMedia", { features });
    await P.page.waitForTimeout(200);
    const box = await P.page.locator(tgt).first().boundingBox();
    await P.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await P.page.mouse.down(); await P.page.waitForTimeout(450);
    const r = await P.page.evaluate(({ tgt, seat, ps, mode }) => {
      const m = mode === "forced-colors" ? matchMedia("(forced-colors: active)").matches : mode === "reduced-transparency" ? matchMedia("(prefers-reduced-transparency: reduce)").matches : true;
      const s = document.querySelector(seat); const cs = s ? getComputedStyle(s, ps) : null;
      const host = document.querySelector(tgt); const pressEl = host?.closest("[data-press]") ?? document.querySelector("[data-press]");
      const pc = pressEl ? getComputedStyle(pressEl) : null;
      return { applied: m, seat: s ? `display ${cs.display} · opacity ${cs.opacity} · bg ${cs.backgroundColor} · backdrop ${cs.backdropFilter}` : "absent", press: pressEl ? `[data-press=${pressEl.getAttribute("data-press")}] bg ${pc.backgroundColor} · scale ${pc.scale}` : "no [data-press] while held" };
    }, { tgt, seat, ps, mode });
    await P.page.mouse.up();
    console.log(`  ${a.label} ${mode.padEnd(21)} ${scene.padEnd(9)} · media applied ${r.applied} · seat ${r.seat} · ${r.press} · load ${load()}`);
    await P.close();
  }
} finally { await E.close(); T.close(); }
