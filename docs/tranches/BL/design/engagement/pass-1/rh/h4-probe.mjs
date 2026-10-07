#!/usr/bin/env node
// h4-probe.mjs · pass 1, R-H: the measurement behind REGISTRY H-4 (a held touch in WebKit) and behind E-4's touch
// input (H-7's scroll-snap surface). A hand-made page, no library:
//   a box whose :hover paints blue and whose :active paints a red outline, logging its touch and pointer events
//   a scroll-snap strip (four members, mandatory, scroll-snap-stop: always)
// Per engine it prints: the coarse media verdicts; the box's :active, :hover and events 300 ms into a held touch and
// after its release; and the strip's scrollLeft after a touch drag of three 40 px moves released at once (fling) and
// after a 250 ms stop (still).
//   Chromium: Playwright page, CDP Input.dispatchTouchEvent (drag) and Input.synthesizeTapGesture (hold)
//   WebKit:   the harness's wktouch.mjs (Playwright's WebKit build over its own inspector pipe, Input.dispatchTouchEvent),
//             and Playwright's own touchscreen.tap for contrast
// Playwright WebKit is not Safari. It takes the D5 harness lock, so it never overlaps a witness.
//   node h4-probe.mjs
import http from "node:http";
import os from "node:os";
const H = new URL("../../harness/", import.meta.url).pathname;
const { pw, acquireLock, load, browserCensus } = await import(`${H}lib.mjs`);
const { WkTouch } = await import(`${H}wktouch.mjs`);

const html = `<!doctype html><html><head><meta name="viewport" content="width=device-width"><style>
body{margin:0} #s{width:600px;height:160px;margin:20px 40px;display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
#s>div{flex:0 0 100%;height:160px;scroll-snap-align:start;scroll-snap-stop:always;background:#ccc} #s>div+div{background:#aaa}
#b{width:200px;height:80px;margin:20px 40px;background:rgb(200,200,200)} #b:hover{background:rgb(0,0,255)} #b:active{outline:5px solid rgb(255,0,0)}</style></head>
<body><div id="s"><div></div><div></div><div></div><div></div></div><div id="b"></div>
<script>window.log=[];for(const e of ["touchstart","touchend","pointerdown","pointerup","click"])document.getElementById("b").addEventListener(e,(ev)=>log.push(e+(ev.pointerType?":"+ev.pointerType:"")));</script></body></html>`;
const srv = http.createServer((q, r) => { r.writeHead(200, { "content-type": "text/html" }); r.end(html); });
await new Promise((ok) => srv.listen(0, "127.0.0.1", ok));
const url = `http://127.0.0.1:${srv.address().port}/`;
const MEDIA = () => JSON.stringify({ hoverNone: matchMedia("(hover: none)").matches, pointerCoarse: matchMedia("(pointer: coarse)").matches });
const BOX = () => { const b = document.getElementById("b"); return JSON.stringify({ active: b.matches(":active"), hover: b.matches(":hover"), outline: getComputedStyle(b).outlineStyle, events: window.log.join(" ") }); };
const SL = () => Math.round(document.getElementById("s").scrollLeft);
const BX = [140, 260], SX = [500, 100]; // box centre; strip press point
await acquireLock();
console.log(`# h4-probe · ${new Date().toTimeString().slice(0, 8)} · ${os.cpus().length} cpus · ${browserCensus()} · load ${load()} at start`);

// ── Chromium ────────────────────────────────────────────────────────────────────────────────────────
{
  const b = await pw.chromium.launch({ headless: true });
  console.log(`## chromium ${b.version()}`);
  for (const still of [false, true]) {
    const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, hasTouch: true, isMobile: true });
    const p = await ctx.newPage(); await p.goto(url); const cdp = await ctx.newCDPSession(p);
    if (!still) {
      console.log(`media ${await p.evaluate(MEDIA)}`);
      await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: BX[0], y: BX[1] }] }); await p.waitForTimeout(300);
      console.log(`raw CDP touchStart held 300 ms: ${await p.evaluate(BOX)}`);
      await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); await p.waitForTimeout(200);
      const g = cdp.send("Input.synthesizeTapGesture", { x: BX[0], y: BX[1], duration: 850, tapCount: 1, gestureSourceType: "touch" }); await p.waitForTimeout(300);
      console.log(`long-tap gesture held 300 ms:   ${await p.evaluate(BOX)}`); await g;
    }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: SX[0], y: SX[1] }] }); await p.waitForTimeout(120);
    for (let k = 1; k <= 3; k++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: SX[0] - 40 * k, y: SX[1] }] }); await p.waitForTimeout(16); }
    if (still) await p.waitForTimeout(250);
    const at = await p.evaluate(SL); await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    const tr = []; for (let i = 0; i < 8; i++) { await p.waitForTimeout(150); tr.push(await p.evaluate(SL)); }
    console.log(`strip touch drag, ${still ? "still" : "fling"}: scrollLeft at release ${at} → ${tr.join(" ")} · load ${load()}`);
    await ctx.close();
  }
  await b.close();
}
// ── WebKit ──────────────────────────────────────────────────────────────────────────────────────────
{
  const b = await pw.webkit.launch({ headless: true });
  console.log(`## webkit ${b.version()} (Playwright WebKit, not Safari)`);
  const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, hasTouch: true });
  const p = await ctx.newPage(); await p.goto(url);
  console.log(`Playwright page: media ${await p.evaluate(MEDIA)}`);
  await p.touchscreen.tap(BX[0], BX[1]); await p.waitForTimeout(100);
  console.log(`Playwright touchscreen.tap (its only touch input; Input.dispatchTapEvent): ${await p.evaluate(BOX)}`);
  await b.close();
  const W = new WkTouch(pw.webkit.executablePath());
  for (const still of [false, true]) {
    const P = await W.open(url, { vp: { width: 700, height: 500 } });
    if (!still) {
      console.log(`wktouch page: media ${await P.page.evaluate(MEDIA)}`);
      await P.touch("touchStart", BX[0], BX[1]); await P.page.waitForTimeout(300);
      console.log(`Input.dispatchTouchEvent touchStart held 300 ms: ${await P.page.evaluate(BOX)}`);
      await P.touch("touchEnd", BX[0], BX[1]); await P.page.waitForTimeout(200);
      console.log(`after touchEnd:                                  ${await P.page.evaluate(BOX)}`);
    }
    await P.touch("touchStart", SX[0], SX[1]); await P.page.waitForTimeout(120);
    for (let k = 1; k <= 3; k++) { await P.touch("touchMove", SX[0] - 40 * k, SX[1]); await P.page.waitForTimeout(16); }
    if (still) await P.page.waitForTimeout(250);
    const at = await P.page.evaluate(SL); await P.touch("touchEnd", SX[0] - 120, SX[1]);
    const tr = []; for (let i = 0; i < 8; i++) { await P.page.waitForTimeout(150); tr.push(await P.page.evaluate(SL)); }
    console.log(`strip touch drag, ${still ? "still" : "fling"}: scrollLeft at release ${at} → ${tr.join(" ")} · load ${load()}`);
    await P.close();
  }
  await W.kill();
}
console.log(`# load ${load()} at end`);
srv.close(); process.exit(0);
