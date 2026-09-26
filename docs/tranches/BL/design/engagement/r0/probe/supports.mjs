// D5 r0: engine support for the mechanisms the families lean on (Chromium and Playwright WebKit; not Safari).
import { pw } from "./serve.mjs";
for (const e of ["chromium", "webkit"]) { const b = await pw[e].launch(); const pg = await b.newPage(); await pg.setContent("<div id=x></div>");
  const r = await pg.evaluate(() => ({
    "linear() easing": CSS.supports("transition-timing-function", "linear(0, 1.1 50%, 1)"),
    ":has()": CSS.supports("selector(:has(a))"),
    "@property (registerProperty)": typeof CSS.registerProperty === "function",
    "anchor-name": CSS.supports("anchor-name", "--a"),
    "position-anchor": CSS.supports("position-anchor", "--a"),
    "popover attr": "popover" in HTMLElement.prototype,
    "transition-behavior allow-discrete": CSS.supports("transition-behavior", "allow-discrete"),
    "interpolate-size": CSS.supports("interpolate-size", "allow-keywords"),
    "animation-timeline scroll()": CSS.supports("animation-timeline", "scroll()"),
    "@starting-style (CSSStartingStyleRule)": typeof window.CSSStartingStyleRule === "function",
    "WAAPI composite add": (() => { try { const a = document.getElementById("x").animate([{ scale: "1" }, { scale: "1.1" }], { duration: 10, composite: "add" }); const ok = a.effect.composite === "add"; a.cancel(); return ok; } catch { return false; } })(),
    "if() in a property": CSS.supports("scale", "if(style(--x: 1): 1.1; else: 1)"),
    "sibling-index()": CSS.supports("scale", "calc(1 + sibling-index() * 0.01)"),
  }));
  console.log(e, (await b.version()), JSON.stringify(r)); await b.close(); }
