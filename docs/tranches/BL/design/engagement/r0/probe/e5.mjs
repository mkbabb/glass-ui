// E-5 (touch rows, W-I.3 §3 item 3): under (hover: none) a held touch must answer through a PRESS rung, not a leaked hover rung.
// Press-only change = props that change under a long-tap gesture (Chromium Input.synthesizeTapGesture, read at 350 ms)
// MINUS props that change under hover alone (fine pointer, mouse over, no press). Pass: |Δscale| ≥ 0.01 or ≥ 1 press-only prop.
// Why a gesture: a raw CDP touchStart hold never sets :active in headless Chromium (measured: :active false on all 7 scenes,
// and a planted :active rule stayed RED), and a mouse press in a touch context reads hover and focus paint as "press".
// Playwright WebKit has no held-touch input: its E-5 cells are UNMEASURED.
// node e5.mjs <dist> [--plant]
import os from "node:os"; import { serve, pw } from "./serve.mjs";
const dist = process.argv[2]; const PLANT = process.argv.includes("--plant"); const L = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
const T = { accordion: ".disclosure-trigger", tabs: ".segmented-tab:nth-of-type(3)", toggle: '[data-t="item-b"]', chip: ".glass-chip", button: ".button", switch: '[role="switch"]', checkbox: '[role="checkbox"]' };
const PROPS = ["background-color", "background-image", "box-shadow", "color", "border-top-color", "opacity", "filter", "outline-style"];
const snap = (pg, sel) => pg.evaluate(([t, props]) => { const e = document.querySelector(t), r = e.getBoundingClientRect(), cs = getComputedStyle(e), b = getComputedStyle(e, "::before");
  const o = { scale: r.width / e.offsetWidth }; for (const p of props) o[p] = cs.getPropertyValue(p); o["::before opacity"] = b.opacity; o["::before background-image"] = b.backgroundImage; return o; }, [sel, PROPS]);
const diff = (a, z) => Object.keys(a).filter((k) => k !== "scale" && a[k] !== z[k]);
const s = await serve(dist); const b = await pw.chromium.launch(); let bad = 0;
for (const [sc, sel] of Object.entries(T)) {
  const plant = async (pg) => { if (PLANT) await pg.addStyleTag({ content: `.disclosure-trigger:active{scale:.96}` }); await pg.waitForTimeout(400); };
  let ctx = await b.newContext({ viewport: { width: 700, height: 500 } }); let pg = await ctx.newPage(); await pg.goto(`${s.url}?scene=${sc}`); await pg.waitForFunction(() => window.__ready); await plant(pg);
  let bx = await pg.locator(sel).first().boundingBox(); const h0 = await snap(pg, sel); await pg.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2); await pg.waitForTimeout(500); const h1 = await snap(pg, sel); await ctx.close();
  const H = new Set(diff(h0, h1));
  ctx = await b.newContext({ viewport: { width: 700, height: 500 }, hasTouch: true, isMobile: true }); pg = await ctx.newPage(); await pg.goto(`${s.url}?scene=${sc}`); await pg.waitForFunction(() => window.__ready); await plant(pg);
  const mq = await pg.evaluate(() => matchMedia("(hover: none)").matches && matchMedia("(pointer: coarse)").matches);
  bx = await pg.locator(sel).first().boundingBox(); const cdp = await ctx.newCDPSession(pg); const p0 = await snap(pg, sel);
  const g = cdp.send("Input.synthesizeTapGesture", { x: bx.x + bx.width / 2, y: bx.y + bx.height / 2, duration: 900, tapCount: 1, gestureSourceType: "touch" }); await pg.waitForTimeout(350);
  const p1 = await snap(pg, sel); const act = await pg.evaluate((t) => document.querySelector(t).matches(":active"), sel); await g; await ctx.close();
  const Pd = diff(p0, p1), only = Pd.filter((k) => !H.has(k)), ds = p1.scale - p0.scale;
  const pass = mq && (Math.abs(ds) >= 0.01 || only.length > 0); if (!pass) bad++;
  console.log(`${pass ? "PASS" : "FAIL"} E-5 chromium ${sc} · (hover:none, pointer:coarse) ${mq} · :active ${act} · Δscale ${ds.toFixed(3)} · touch-changed [${Pd.join(", ")}] · hover-changed [${[...H].join(", ")}] · press-only [${only.join(", ")}] · load ${L()}`);
}
await b.close(); s.close(); console.log(`VERDICT e5 ${PLANT ? "PLANT" : "HEAD"}: ${bad} failing`); process.exit(bad ? 1 : 0);
