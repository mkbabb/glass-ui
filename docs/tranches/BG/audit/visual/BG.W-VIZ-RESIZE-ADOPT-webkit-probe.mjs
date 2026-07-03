// BG.W-VIZ-RESIZE-ADOPT — WebKit-engine computational backing-store probe (second engine for the
// computational dual-engine claim; the real-Safari PIXEL truth is the system-WebKit wkshot snapshots).
// Same uniform-crisp backing==round(gBCR × effectiveDpr) assertion as the Chrome leg, over WebKit.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { webkit } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-VIZ-RESIZE-ADOPT-paint";
const ROUTES = ["/substrates/aurora","/substrates/blob","/substrates/concentric","/substrates/constellation","/substrates/dot-flow-field","/substrates/dot-matrix","/substrates/fourier-field","/substrates/goo-dot","/substrates/paper-grid"];
const MODES = ["light","dark"];

function backingVerdict(c, winDpr) {
    const { w, h, cssW, cssH } = c;
    if (cssW < 4 || cssH < 4) return { skip: true };
    if (w < 4 || h < 4) return { pass: false, reason: `zero-backing ${w}x${h}` };
    const dW = w / cssW, dH = h / cssH;
    const uniform = Math.abs(dW - dH) < 0.02, d = dW;
    const inCap = d >= 0.98 && d <= winDpr + 0.02;
    const crispW = Math.abs(w - Math.round(cssW * d)) <= 0.5;
    const crispH = Math.abs(h - Math.round(cssH * d)) <= 0.5;
    return { pass: uniform && inCap && crispW && crispH, effDpr: +d.toFixed(3), uniform, inCap, crispW, crispH };
}

const results = { fresh: [], spaNav: [] };
const browser = await webkit.launch();

// PASS A — fresh boot per route
for (const route of ROUTES) for (const mode of MODES) {
    const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme:mode });
    const page = await ctx.newPage();
    let err=null, cinfo=null;
    try {
        await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`, { waitUntil:"load", timeout:30000 });
        await page.waitForFunction(()=>document.documentElement.hasAttribute("data-capture-ready"), { timeout:25000 });
        await page.waitForTimeout(1500);
        cinfo = await page.evaluate(()=>{
            const winDpr=window.devicePixelRatio;
            const canvases=Array.from(document.querySelectorAll("canvas")).map(c=>{const b=c.getBoundingClientRect();return{w:c.width,h:c.height,cssW:+b.width.toFixed(2),cssH:+b.height.toFixed(2)};});
            return { winDpr, canvasCount:canvases.length, canvases };
        });
        for (const c of cinfo.canvases) c.verdict=backingVerdict(c,cinfo.winDpr);
    } catch(e){ err=e.message; }
    const sub=(cinfo?.canvases||[]).filter(c=>!c.verdict?.skip);
    const allPass=sub.length>0 && sub.every(c=>c.verdict?.pass);
    results.fresh.push({ route, mode, err, winDpr:cinfo?.winDpr, canvasCount:cinfo?.canvasCount, allPass, canvases:cinfo?.canvases });
    console.log(`[wk fresh] ${route} ${mode}: ${err?"ERR "+err:(allPass?"PASS":"FAIL")} | ${sub.map(c=>`${c.w}x${c.h}<-${c.cssW}x${c.cssH}(d${c.verdict.effDpr}${c.verdict.pass?"":"!"})`).join(" ")}`);
    await ctx.close();
}

// PASS B — SPA-nav sequence (one page, router.push across all routes)
for (const mode of MODES) {
    const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme:mode });
    const page = await ctx.newPage();
    await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(ROUTES[0])}&mode=${mode}`, { waitUntil:"load", timeout:30000 });
    await page.waitForFunction(()=>document.documentElement.hasAttribute("data-capture-ready"), { timeout:25000 });
    await page.waitForTimeout(1200);
    for (let i=0;i<ROUTES.length;i++){
        if (i>0){
            await page.evaluate(async(r)=>{const router=document.querySelector("#app")?.__vue_app__?.config?.globalProperties?.$router; if(router){await router.push(r);} }, ROUTES[i]);
            await page.waitForTimeout(1600);
        }
        const cinfo = await page.evaluate(()=>{
            const winDpr=window.devicePixelRatio;
            const canvases=Array.from(document.querySelectorAll("canvas")).map(c=>{const b=c.getBoundingClientRect();return{w:c.width,h:c.height,cssW:+b.width.toFixed(2),cssH:+b.height.toFixed(2)};});
            const route=document.querySelector("#app")?.__vue_app__?.config?.globalProperties?.$router?.currentRoute?.value?.fullPath??null;
            return { winDpr, canvasCount:canvases.length, canvases, route };
        });
        for (const c of cinfo.canvases) c.verdict=backingVerdict(c,cinfo.winDpr);
        const sub=cinfo.canvases.filter(c=>!c.verdict?.skip);
        const allPass=sub.length>0 && sub.every(c=>c.verdict?.pass);
        results.spaNav.push({ order:i, route:ROUTES[i], currentRoute:cinfo.route, mode, canvasCount:cinfo.canvasCount, allPass, canvases:cinfo.canvases });
        console.log(`[wk spa ${mode} #${i}] ->${ROUTES[i]} now=${cinfo.route}: ${allPass?"PASS":"FAIL"} | ${sub.map(c=>`${c.w}x${c.h}<-${c.cssW}x${c.cssH}(d${c.verdict.effDpr}${c.verdict.pass?"":"!"})`).join(" ")}`);
    }
    await ctx.close();
}

writeFileSync(`${OUT}/webkit-results-vrz.json`, JSON.stringify(results,null,2));
const ff=results.fresh.filter(r=>!r.allPass||r.err).length, sf=results.spaNav.filter(r=>!r.allPass).length;
console.log(`\nWROTE webkit-results-vrz.json | fresh FAIL=${ff}/${results.fresh.length} | spaNav FAIL=${sf}/${results.spaNav.length}`);
await browser.close();
