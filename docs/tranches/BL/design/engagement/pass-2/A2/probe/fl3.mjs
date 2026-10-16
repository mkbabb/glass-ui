// P-A2 probe, CK-13 (FL-3): each recipe's arm under forced colours (Chromium emulation) and reduced transparency
// (Chromium emulation; Playwright WebKit cannot emulate either, the engine's limit). Per scene: the commit seat's
// display and the face's computed fill at rest and 60 ms after a programmatic commit. Closes what it opens.
import { serveTarget, load } from "../../../harness/lib.mjs";
const pw = await import("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs");
const [build, scenes = "switch,checkbox,radio,chip,chipaction,toggle,accordion,button,tabs"] = process.argv.slice(2);
const T = await serveTarget({ build });
const b = await pw.chromium.launch();
try {
  for (const mode of ["forced-colors", "reduced-transparency"]) {
    for (const sc of scenes.split(",")) {
      const ctx = await b.newContext({ viewport: { width: 700, height: 500 } });
      const p = await ctx.newPage(); const cdp = await ctx.newCDPSession(p);
      await cdp.send("Emulation.setEmulatedMedia", { features: [mode === "forced-colors" ? { name: "forced-colors", value: "active" } : { name: "prefers-reduced-transparency", value: "reduce" }] });
      await p.goto(`${T.url}?scene=${sc}`); await p.waitForFunction(() => window.__e?.ready === true);
      const r = await p.evaluate(async (mode) => {
        const m = window.__e.index[window.__e.scene]; const face = document.querySelector(m.face ?? m.target); if (!face) return { err: "no face" };
        const seat = face.querySelector("[data-engage-light]");
        const read = () => { const cs = seat ? getComputedStyle(seat) : getComputedStyle(face, "::after"); return { display: cs.display, op: cs.opacity, bg: cs.backgroundColor.slice(0, 40), fill: getComputedStyle(face).backgroundColor.slice(0, 40) }; };
        const q = matchMedia(mode === "forced-colors" ? "(forced-colors: active)" : "(prefers-reduced-transparency: reduce)").matches;
        const rest = read(); window.__e.commit(); await new Promise((r) => setTimeout(r, 60)); const mid = read();
        return { q, rest, mid, veil: [...document.querySelectorAll(".glass-focus-veil")].length };
      }, mode);
      console.log(`${mode} ${sc} ${JSON.stringify(r)}`);
      await ctx.close();
    }
  }
  console.log(`load ${load()}`);
} catch (e) { console.log("ERR", e.message); } finally { await b.close(); T.close?.(); process.exit(0); }
