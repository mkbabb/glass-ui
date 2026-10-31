#!/usr/bin/env node
// C-E10 diagnostic: the exit under a re-render, per frame: the track's top, the host's running animations, the correction written, whether the mutation observer's re-lay fires.
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, center, f } = await import(`${H}/lib.mjs`);
const THUMB='[data-t="slider-a"] [role="slider"]';
await witness("dbg","exit under a re-render",async({a,E,T,cell,guard})=>{
  const when=a.when??"50"; const r=await guard("x",async()=>{const P=await openPage(E,T,"clipstale");try{
    await P.page.evaluate(()=>{const b=document.querySelector('[data-t="box"]');b.style.position="relative";const q=document.querySelector('[data-t="slider-a"]');const rr=q.getBoundingClientRect(),br=b.getBoundingClientRect();b.scrollTop+=rr.top-(br.top+6);const t0=q.querySelector(".slider-track").getBoundingClientRect().top;b.style.top=`${260-t0}px`;});
    await P.page.waitForTimeout(250);const c=await center(P.page,THUMB);await P.page.mouse.move(c.x,c.y);await P.page.mouse.down();await P.page.waitForTimeout(900);
    await P.page.evaluate(()=>{window.__m=[];new MutationObserver((ms)=>window.__m.push(performance.now())).observe(document.body,{childList:true,subtree:true});window.__f=[];const ch=new MessageChannel();const host=document.querySelector('[data-t="slider-a"] .glass-slider');ch.port1.onmessage=()=>{const l=document.querySelector(".glass-loupe"),t=document.querySelector('[data-t="slider-a"] .slider-track');if(!l)return;const d=t.getBoundingClientRect(),a=l.getBoundingClientRect();window.__f.push({t:performance.now(),tt:d.top,lb:a.bottom,dy:l.style.getPropertyValue("--lens-dy"),op:+getComputedStyle(l).opacity,hostA:host.getAnimations().filter(x=>!x.transitionProperty).length,tr:getComputedStyle(host).translate,eng:host.hasAttribute("data-engaged"),stage:host.hasAttribute("data-engage-stage")});};window.__stop=false;const tick=()=>{ch.port2.postMessage(0);if(!window.__stop)requestAnimationFrame(tick);};requestAnimationFrame(tick);});
    await P.page.waitForTimeout(60);await P.page.mouse.up();await P.page.waitForTimeout(+when);await P.page.evaluate(()=>{const d=document.createElement("div");d.style.height="40px";document.querySelector('[data-t="slider-a"]').before(d);window.__ins=performance.now();});await P.page.waitForTimeout(600);
    return await P.page.evaluate(()=>{window.__stop=true;return{f:window.__f,m:window.__m,ins:window.__ins};});}finally{await P.close();}},60000);
  const z=r.f[0].t; for(const x of r.f) console.log(f(x.t-z,0),"tt",f(x.tt,1),"lb",f(x.lb,1),"pin",f(x.lb-x.tt,1),"dy",x.dy,"op",f(x.op,2),"hostAnim",x.hostA,"tr",x.tr,"eng",x.eng,"stage",x.stage);
  console.log("ins",f(r.ins-z,0),"mutations",r.m.map(t=>f(t-z,0)).join(" "));cell("x","REPORT","done");
});
