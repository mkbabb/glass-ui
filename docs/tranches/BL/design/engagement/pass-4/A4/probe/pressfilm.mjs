// P-A4 probe (not a witness): the held touch's press wash, filmed. E-5's sustain reads the press-only properties at
// +200 ms and +1200 ms; this films the same hold every ~25 ms so the wash's clock can be read against the hold
// (CK-06, C-A3 §4 item 3: toggle and accordion share one press wash). Each read prints the painted colour and the
// flags A (`:active`), H (`:hover`), P (the door's press mark on the target or an ancestor). One browser per run, a touch page per cell,
// every page and the browser closed in finally.
//   node pressfilm.mjs --build <dir> [--engine chromium|webkit] [--scenes toggle,accordion] [--prm]
import { parseArgs, serveTarget, Engine, openTouchPage, center, load } from "../../../harness/lib.mjs";
const a = parseArgs();
const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
const scenes = String(a.scenes ?? "toggle,accordion").split(",");
const SEL = { tabs: ".segmented-tab:nth-of-type(3)" };
// where the press paints: the control bit presses on its face, every other member on its target
const PAINT = { switch: ".control-bit__face", checkbox: ".control-bit__face", radio: ".control-bit__face" };
const times = Array.from({ length: 51 }, (_, k) => k * 25);
console.log(`# pressfilm engine ${E.name} load ${load()} at start · scenes ${scenes.join(",")}${a.prm ? " PRM" : ""}`);
try {
  for (const sc of scenes) for (const theme of ["light", "dark"]) for (let rep = 1; rep <= 3; rep++) {
    const Q = await openTouchPage(E, T, sc, { theme, prm: !!a.prm });
    try {
      const sel = SEL[sc] ?? '[data-e~="target"]';
      await Q.page.waitForTimeout(250);
      const c = await center(Q.page, sel);
      const rd = () => Q.page.evaluate(([s, ps]) => { const e = document.querySelector(s); const pe = ps ? e.querySelector(ps) ?? document.querySelector(ps) : e; const cs = getComputedStyle(pe); return `${cs.backgroundColor}${e.matches(":active") ? " A" : ""}${e.matches(":hover") ? " H" : ""}${e.closest("[data-press]") || e.hasAttribute("data-press") ? " P" : ""}`; }, [sel, PAINT[sc] ?? null]);
      const rest = await rd();
      const xs = await Q.holdAt(c.x, c.y, times, rd);
      const runs = []; let prev = null;
      xs.forEach((v, k) => { if (v !== prev) runs.push(`+${times[k]} ${v}`); prev = v; });
      console.log(`  REPORT ${sc} ${theme} hold ${rep} · rest ${rest} · ${runs.join(" | ")} · load ${load()}`);
    } finally { await Q.close(); }
  }
} finally { await E.close(); T.close(); }
