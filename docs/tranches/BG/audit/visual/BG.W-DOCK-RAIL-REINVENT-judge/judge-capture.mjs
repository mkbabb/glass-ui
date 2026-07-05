// Fresh non-authoring judge capture for BG.W-DOCK-RAIL-REINVENT.
// Covers the SHELL docks (/dock/overview: SidebarDock vertical + BottomDock horizontal)
// + the story docks (/dock/rail, /dock/liquid-playground). Chrome CDP leg.
// Measures: containment@rest, box-INVIOLATE (dock dW/dH rest->fanned), asymmetric-golden
// overhang ratio, compositor-only channels (getAnimations), wrap. Screens rest+fanned.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DOCK-RAIL-REINVENT-judge";
const CDP = "http://localhost:9477";
const ROUTES = [
  { route:"/dock/overview", slug:"overview" },
  { route:"/dock/rail", slug:"rail" },
  { route:"/dock/liquid-playground", slug:"lp" },
];
const MODES = ["light","dark"];
const round = (r)=>({x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1),l:+r.left.toFixed(1),t:+r.top.toFixed(1),rr:+r.right.toFixed(1),b:+r.bottom.toFixed(1)});

const browser = await chromium.connectOverCDP(CDP);
const all = [];
for (const {route,slug} of ROUTES){
  for (const mode of MODES){
    const ctx = await browser.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2, colorScheme:mode });
    const page = await ctx.newPage();
    const url = "http://localhost:5200/?capture="+encodeURIComponent(route)+"&mode="+mode;
    await page.goto(url,{waitUntil:"load",timeout:30000});
    try { await page.waitForFunction(()=>document.documentElement.hasAttribute("data-capture-ready"),{timeout:25000}); } catch(e){}
    await page.waitForTimeout(1100);

    const badge = await page.evaluate(()=>{ const b=document.getElementById("gl-capture-engine-badge"); return b?b.textContent:"NO-BADGE"; });
    // full-viewport rest screenshot
    const full = `${OUT}/judge-chrome-${slug}-${mode}-full.png`;
    await page.screenshot({path:full, fullPage:false});

    // enumerate stacks; measure rest containment
    const rest = await page.evaluate(()=>{
      const round=(r)=>({x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1),l:+r.left.toFixed(1),t:+r.top.toFixed(1),rr:+r.right.toFixed(1),b:+r.bottom.toFixed(1)});
      const stacks=Array.from(document.querySelectorAll(".dock-stack"));
      return stacks.map((s,i)=>{
        s.setAttribute("data-jidx",String(i));
        const frame=s.closest(".glass-dock-frame");
        const dock=frame?frame.querySelector(".glass-dock"):s.closest(".glass-dock");
        const cs=getComputedStyle(s);
        const members=Array.from(s.querySelectorAll(".dock-stack-member"));
        let ml=Infinity,mt=Infinity,mr=-Infinity,mb=-Infinity;
        for(const m of members){const r=m.getBoundingClientRect(); ml=Math.min(ml,r.left);mt=Math.min(mt,r.top);mr=Math.max(mr,r.right);mb=Math.max(mb,r.bottom);}
        const memberUnion=(members.length&&isFinite(ml))?{l:+ml.toFixed(1),t:+mt.toFixed(1),rr:+mr.toFixed(1),b:+mb.toFixed(1)}:null;
        return {
          idx:i, testid:s.getAttribute("data-testid"), orientation:s.getAttribute("data-orientation"),
          modeAttr:s.getAttribute("data-mode"), cls:s.className, wrapAttr:s.hasAttribute("data-wrap"),
          overhang:cs.getPropertyValue("--dock-rail-overhang").trim(),
          overhangMinor:cs.getPropertyValue("--dock-rail-overhang-minor").trim(),
          golden:cs.getPropertyValue("--dock-rail-golden").trim(),
          hairline:cs.getPropertyValue("--dock-rail-hairline").trim(),
          memberCount:members.length,
          stackBox:round(s.getBoundingClientRect()),
          dockBox:dock?round(dock.getBoundingClientRect()):null,
          memberUnionRest:memberUnion,
          hasFrame:!!frame,
        };
      });
    });

    const perStack=[];
    for(let i=0;i<rest.length;i++){
      const sel=`.dock-stack[data-jidx="${i}"]`;
      // fan via pointerenter (hover-intent) + focus
      await page.evaluate((s)=>{const n=document.querySelector(s); if(n){n.dispatchEvent(new PointerEvent("pointerenter",{bubbles:false})); const core=n.querySelector("button,[tabindex]"); if(core&&core.focus)core.focus();}},sel);
      await page.waitForTimeout(650);
      const fanned = await page.evaluate((s)=>{
        const round=(r)=>({x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1),l:+r.left.toFixed(1),t:+r.top.toFixed(1),rr:+r.right.toFixed(1),b:+r.bottom.toFixed(1)});
        const n=document.querySelector(s);
        const frame=n.closest(".glass-dock-frame");
        const dock=frame?frame.querySelector(".glass-dock"):n.closest(".glass-dock");
        const isExpanded=n.classList.contains("is-expanded");
        const members=Array.from(n.querySelectorAll(".dock-stack-member"));
        let ml=Infinity,mt=Infinity,mr=-Infinity,mb=-Infinity;
        const memberBoxes=[];
        for(const m of members){const r=m.getBoundingClientRect(); memberBoxes.push({w:+r.width.toFixed(1),h:+r.height.toFixed(1),l:+r.left.toFixed(1),t:+r.top.toFixed(1)}); const st=getComputedStyle(m); if(parseFloat(st.opacity)<0.02)continue; ml=Math.min(ml,r.left);mt=Math.min(mt,r.top);mr=Math.max(mr,r.right);mb=Math.max(mb,r.bottom);}
        const memberUnion=(members.length&&isFinite(ml))?{l:+ml.toFixed(1),t:+mt.toFixed(1),rr:+mr.toFixed(1),b:+mb.toFixed(1)}:null;
        // rows for wrap detection: distinct top-bands of visible members
        const tops=members.filter(m=>parseFloat(getComputedStyle(m).opacity)>=0.02).map(m=>Math.round(m.getBoundingClientRect().top/8)*8);
        const lefts=members.filter(m=>parseFloat(getComputedStyle(m).opacity)>=0.02).map(m=>Math.round(m.getBoundingClientRect().left/8)*8);
        const distinctTops=[...new Set(tops)].length, distinctLefts=[...new Set(lefts)].length;
        // getAnimations across subtree
        let anims=[];
        try{ const sub=[n,...n.querySelectorAll("*")]; for(const el of sub){ for(const a of (el.getAnimations?el.getAnimations():[])){ let props=[]; try{ if(a.effect&&a.effect.getKeyframes){const kf=a.effect.getKeyframes(); const ks=new Set(); for(const k of kf)for(const p of Object.keys(k))if(!["offset","computedOffset","easing","composite"].includes(p))ks.add(p); props=[...ks];}}catch(e){} anims.push({type:a.constructor.name,timeline:a.timeline?a.timeline.constructor.name:null,props}); }}}catch(e){anims=[{error:String(e)}];}
        return { isExpanded, memberCount:members.length, visibleMembers:members.filter(m=>parseFloat(getComputedStyle(m).opacity)>=0.02).length, memberBoxes, memberUnion, distinctTops, distinctLefts, stackBox:round(n.getBoundingClientRect()), dockBox:dock?round(dock.getBoundingClientRect()):null, anims };
      },sel);
      const shot=`${OUT}/judge-chrome-${slug}-${mode}-s${i}-fanned.png`;
      await page.screenshot({path:shot, fullPage:false});
      // collapse
      await page.evaluate((s)=>{const n=document.querySelector(s); if(n){n.dispatchEvent(new PointerEvent("pointerleave",{bubbles:false})); const core=n.querySelector("button,[tabindex]"); if(core&&core.blur)core.blur();}},sel);
      await page.waitForTimeout(350);
      perStack.push({idx:i, testid:rest[i]?.testid, fanned, shot});
    }
    all.push({route,slug,mode,badge,full,rest,perStack});
    console.log(JSON.stringify({route,mode,badge:badge.replace(/\n/g," | "),stacks:rest.length,summary:perStack.map(p=>({idx:p.idx,tid:p.testid,exp:p.fanned?.isExpanded,vis:p.fanned?.visibleMembers,of:p.fanned?.memberCount}))}));
    await ctx.close();
  }
}
await browser.close();
writeFileSync(`${OUT}/judge-interaction-probe.json`, JSON.stringify(all,null,2));
console.log("WROTE judge-interaction-probe.json");
