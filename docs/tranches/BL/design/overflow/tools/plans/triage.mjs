#!/usr/bin/env node
// triage.mjs > triage.json: roots for the readings the sweep could not place by its
// breakers alone. Base tree only (5391). Each job lists the descendants that reach past
// the named box's edges, with their width, transform and white-space.
const LONG = "Quarterly enrollment by district and program, all years";
const over = (sel) =>
    `eval:(()=>{const box=document.querySelector(${JSON.stringify(sel)});if(!box)return 'none';const R=box.getBoundingClientRect();const out=[];for(const e of box.querySelectorAll('*')){const r=e.getBoundingClientRect();if(!r.width)continue;const o=Math.max(R.left-r.left,r.right-R.right);if(o>1){const cs=getComputedStyle(e);out.push({el:e.tagName.toLowerCase()+'.'+[...e.classList].slice(0,3).join('.'),o:Math.round(o*10)/10,w:Math.round(r.width*10)/10,tr:cs.transform==='none'?cs.translate:cs.transform.slice(0,40),ws:cs.whiteSpace,pos:cs.position})}}return {boxW:Math.round(R.width),n:out.length,top:out.slice(0,6)}})()`;
const setText = (sel, i, text) =>
    `eval:(()=>{const e=document.querySelectorAll(${JSON.stringify(sel)})[${i}];if(!e)return 'none';const w=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let t,best=null;while((t=w.nextNode()))if(t.textContent.trim().length>1&&(!best||t.textContent.length>best.textContent.length))best=t;if(best)best.textContent=${JSON.stringify(text)};return 'ok'})()`;

const jobs = [
    { name: "T dock trigger content (File menu trigger)", cell: "390t-light", url: "/dock/chrome", do: [over("main .dock-trigger.dock-dropdown-trigger")], sel: ["main .dock-trigger.dock-dropdown-trigger", "main .dock-trigger.dock-dropdown-trigger > *"] },
    { name: "T dock trigger content (File menu trigger) 1440", cell: "1440-light", url: "/dock/chrome", do: [over("main .dock-trigger.dock-dropdown-trigger")], sel: ["main .dock-trigger.dock-dropdown-trigger", "main .dock-trigger.dock-dropdown-trigger > *"] },
    { name: "T alert stage", cell: "390t-light", url: "/feedback/alert", do: ["wait:1500", over("main .alert-stage")], sel: ["main .alert-stage", "main .alert-stage [data-slot=alert]"] },
    { name: "T tabs variant items under a long label", cell: "390t-light", url: "/navigation/tabs", do: [setText(".story-variant-items [role=tab]", 0, LONG), "wait:600", over(".story-variant-items")], sel: [".story-variant-items", ".story-variant-items > *"] },
    { name: "T menu checkbox indicator", cell: "390t-light", url: "/containers/dropdown-menu", do: ["tap:main [data-slot=menu-trigger]", "wait:1200", over("[data-slot=menu-checkbox-item] .menu__indicator")], sel: ["[data-slot=menu-checkbox-item] .menu__indicator", "[data-slot=menu-checkbox-item] .menu__indicator > *"] },
];
process.stdout.write(JSON.stringify(jobs.map((j) => ({ ...j, tree: "base", port: 5391 })), null, 1));
