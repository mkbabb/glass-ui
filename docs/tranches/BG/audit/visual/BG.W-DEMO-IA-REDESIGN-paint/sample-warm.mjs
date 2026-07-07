import { PNG } from "pngjs";
import fs from "fs";
const OUT = "docs/tranches/BG/audit/visual/BG.W-DEMO-IA-REDESIGN-paint";
function hue(R,G,B){const mx=Math.max(R,G,B),mn=Math.min(R,G,B);let h=0;if(mx!==mn){const d=mx-mn;if(mx===R)h=((G-B)/d)%6;else if(mx===G)h=(B-R)/d+2;else h=(R-G)/d+4;h*=60;if(h<0)h+=360;}return {h:Math.round(h),sat:mx===0?0:Math.round((mx-mn)/mx*100)};}
function sampleRegion(png, x0,y0,x1,y1){
  let R=0,G=0,B=0,n=0;
  for(let y=y0;y<y1;y+=3)for(let x=x0;x<x1;x+=3){const i=(png.width*y+x)<<2;R+=png.data[i];G+=png.data[i+1];B+=png.data[i+2];n++;}
  R=Math.round(R/n);G=Math.round(G/n);B=Math.round(B/n);
  return {rgb:[R,G,B],...hue(R,G,B)};
}
for (const f of ["chrome_cap_dock_overview_light.png","chrome_cap_dock_overview_dark.png"]) {
  const png = PNG.sync.read(fs.readFileSync(`${OUT}/${f}`));
  // sample the coral field region behind the first dock card (avoid badge top-left)
  const s1 = sampleRegion(png, 200, 320, 600, 440);   // left field band under card top
  const s2 = sampleRegion(png, 900, 320, 1350, 440);  // right field band
  const warm1 = (s1.h<70||s1.h>330), warm2 = (s2.h<70||s2.h>330);
  console.log(`${f}`);
  console.log(`  fieldL: rgb=${s1.rgb} hue=${s1.h} sat=${s1.sat} warm=${warm1}`);
  console.log(`  fieldR: rgb=${s2.rgb} hue=${s2.h} sat=${s2.sat} warm=${warm2}`);
}
