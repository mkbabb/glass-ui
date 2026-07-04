// Confirm the WebKit collapsed REST: collapse the dock, wait a long settle, and
// re-measure — is [data-morphing] dropped and the box a 1:1 circle, or a frozen sliver?
import { webkit } from "playwright-core";
const MODE = process.argv[2] || "light";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await webkit.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent("/dock/overview")}&mode=${MODE}`, { waitUntil: "load" });
for (let i = 0; i < 120; i++) { if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break; await sleep(100); }
const idx = await page.evaluate(() => { const docks=[...document.querySelectorAll(".glass-dock")]; for(let i=0;i<docks.length;i++){const d=docks[i];if(d.querySelector(".dock-persistent")&&!d.classList.contains("vertical")&&d.getBoundingClientRect().width<300)return i;} return -1; });
async function meas(){ return page.evaluate((i)=>{ const d=[...document.querySelectorAll(".glass-dock")][i]; const r=d.getBoundingClientRect(); const cs=getComputedStyle(d); return {w:+r.width.toFixed(2),h:+r.height.toFixed(2),aspect:+(r.width/r.height).toFixed(4),morphing:d.getAttribute("data-morphing"),collapsed:d.classList.contains("collapsed"),rootScale:cs.scale}; },idx); }
const c=await page.evaluate((i)=>{const d=[...document.querySelectorAll(".glass-dock")][i];const r=d.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};},idx);
await page.mouse.move(c.x,c.y); await sleep(60); await page.mouse.move(30,860);
// wait for collapse then long settle
for(let i=0;i<90;i++){const m=await meas(); if(m.w<120){break;} await sleep(60);}
// sample rest over 3s
const marks=[];
for(let i=0;i<12;i++){ await sleep(250); marks.push(await meas()); }
console.log("mode="+MODE);
for(const m of marks) console.log(JSON.stringify(m));
await page.close(); await browser.close();
