import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0];
// GL_RENDERER provenance
const gp = await ctx.newPage();
const rend = await gp.evaluate(()=>{try{const c=document.createElement('canvas');const gl=c.getContext('webgl2');const dbg=gl.getExtension('WEBGL_debug_renderer_info');return gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL);}catch(e){return 'n/a';}});
console.log("GL_RENDERER:", rend);
await gp.close();
const jobs = [["/navigation/carousel","dark"],["/navigation/carousel","light"],["/foundations/paper-texture","dark"],["/data/avatar","dark"],["/foundations/shadows","dark"],["/foundations/typography","dark"],["/feedback/alert","dark"]];
for(const [route,mode] of jobs){
  const p = await ctx.newPage(); await p.setViewportSize({width:1440,height:900});
  await p.goto(`http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`,{waitUntil:"load",timeout:30000});
  const t0=Date.now(); while(Date.now()-t0<15000){ if(await p.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")))break; await p.waitForTimeout(150);} await p.waitForTimeout(400);
  const slug=route.replace(/^\//,"").replace(/\//g,"-");
  await p.screenshot({path:`rerun-chrome/${slug}-chrome-${mode}.png`, fullPage:true});
  console.log("saved", `${slug}-chrome-${mode}.png`);
  await p.close();
}
await b.close();
