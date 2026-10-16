// P-A2 probe: what CK-02's light model composites on a face (its layers and descendants), per scene; Chromium.
import { serveTarget, openPage, Engine, load } from "../../../harness/lib.mjs";
const [build, scenes, theme = "light"] = process.argv.slice(2);
const T = await serveTarget({ build });
const E = new Engine("chromium");
try {
  for (const sc of scenes.split(",")) {
    const P = await openPage(E, T, sc, { theme });
    const r = await P.page.evaluate(() => {
      const m = window.__e.index[window.__e.scene]; const face = document.querySelector(m.face ?? m.target);
      const d = [...face.querySelectorAll("*")].slice(0, 12).map((k) => { const c = getComputedStyle(k); return `${k.tagName.toLowerCase()}.${[...k.classList].join(".").slice(0, 40)} bg=${c.backgroundColor} op=${c.opacity}`; });
      const a = getComputedStyle(face, "::after"); return { light: window.__light(face, true), after: `${a.content} bg=${a.backgroundColor} op=${a.opacity}`, d };
    });
    console.log(sc, theme, JSON.stringify(r.light), "\n  ::after", r.after, "\n  " + r.d.join("\n  "));
    await P.close();
  }
  console.log(`load ${load()}`);
} finally { await E.kill?.(); process.exit(0); }
