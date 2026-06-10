// TEMP debug — measure shadow contrast in BOTH modes. Delete before close.
import { test } from "@playwright/test";
import type { Locator } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS } from "./pi-manifest.ts";

test.setTimeout(120_000);
async function grab(l: Locator): Promise<PNG> { return PNG.sync.read(await l.screenshot()); }
function srgbToLinear(c8: number): number { const c=c8/255; return c<=0.04045?c/12.92:((c+0.055)/1.055)**2.4; }
function oklabL(r8:number,g8:number,b8:number):number{const r=srgbToLinear(r8),g=srgbToLinear(g8),b=srgbToLinear(b8);
  const l=0.4122214708*r+0.5363325363*g+0.0514459929*b,m=0.2119034982*r+0.6806995451*g+0.1073969566*b,s=0.0883024619*r+0.2817188376*g+0.6299787005*b;
  return 0.2104542553*Math.cbrt(l)+0.793617785*Math.cbrt(m)-0.0040720468*Math.cbrt(s);}
function modalBg(png: PNG): [number,number,number] { const{data}=png; const counts=new Map<number,number>();
  for(let i=0;i<data.length;i+=4){const k=((data[i]!>>4)<<8)|((data[i+1]!>>4)<<4)|(data[i+2]!>>4);counts.set(k,(counts.get(k)??0)+1);}
  let best=0,bk=0; for(const[k,c]of counts)if(c>best){best=c;bk=k;} return [((bk>>8)&15)*16+8,((bk>>4)&15)*16+8,(bk&15)*16+8]; }

for (const scheme of ["light","dark"] as const) {
  test.describe(`shadow ${scheme}`, () => {
    test.use({ colorScheme: scheme });
    test(`measure ${scheme}`, async ({ page }) => {
      await page.goto(PI_TARGETS.blob.path);
      const wrapper = page.locator(".goo-blob-wrapper").first();
      await wrapper.waitFor({ state: "visible", timeout: 20000 });
      await page.waitForTimeout(800);
      const png = await grab(wrapper);
      const bg = modalBg(png);
      const bgL = oklabL(bg[0],bg[1],bg[2]);
      const { width:w, height:h, data } = png;
      const contrasts:number[]=[]; const allDark:number[]=[];
      for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4;
        const d=Math.abs(data[i]!-bg[0])+Math.abs(data[i+1]!-bg[1])+Math.abs(data[i+2]!-bg[2]);
        if(d<8)continue; const L=oklabL(data[i]!,data[i+1]!,data[i+2]!);
        contrasts.push(Math.abs(L-bgL)); allDark.push(L);}
      contrasts.sort((a,b)=>b-a);
      const top5=contrasts.slice(0,Math.max(1,Math.floor(contrasts.length*0.05)));
      const peak=top5.reduce((s,v)=>s+v,0)/top5.length;
      console.log(`SHADOW ${scheme}: ${w}x${h} bg=${bg} bgL=${bgL.toFixed(3)} castN=${contrasts.length} peakContrast(top5%)=${peak.toFixed(3)}`);
    });
  });
}
