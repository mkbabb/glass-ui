// TEMP debug — calibrate the W-COHERE π readbacks. Delete before close.
import { test } from "@playwright/test";
import type { Locator } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS } from "./pi-manifest.ts";

test.setTimeout(120_000);

async function grab(l: Locator): Promise<PNG> {
    return PNG.sync.read(await l.screenshot());
}
function srgbToLinear(c8: number): number {
    const c = c8 / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function oklab(r8: number, g8: number, b8: number): [number, number, number] {
    const r = srgbToLinear(r8), g = srgbToLinear(g8), b = srgbToLinear(b8);
    const l = 0.4122214708*r+0.5363325363*g+0.0514459929*b;
    const m = 0.2119034982*r+0.6806995451*g+0.1073969566*b;
    const s = 0.0883024619*r+0.2817188376*g+0.6299787005*b;
    const l_=Math.cbrt(l),m_=Math.cbrt(m),s_=Math.cbrt(s);
    return [0.2104542553*l_+0.793617785*m_-0.0040720468*s_,
            1.9779984951*l_-2.428592205*m_+0.4505937099*s_,
            0.0259040371*l_+0.7827717662*m_-0.808675766*s_];
}
function modalBg(png: PNG): [number,number,number] {
    const {data}=png; const counts=new Map<number,number>();
    for(let i=0;i<data.length;i+=4){const k=((data[i]!>>4)<<8)|((data[i+1]!>>4)<<4)|(data[i+2]!>>4);counts.set(k,(counts.get(k)??0)+1);}
    let best=0,bk=0; for(const[k,c]of counts)if(c>best){best=c;bk=k;}
    return [((bk>>8)&15)*16+8,((bk>>4)&15)*16+8,(bk&15)*16+8];
}

test("debug blob + constellation", async ({ page }) => {
    // Blob — read both at default AND after excited
    await page.goto(PI_TARGETS.blob.path);
    const canvases = page.locator('canvas[data-testid="goo-blob-canvas"]');
    await canvases.first().waitFor({ state: "visible", timeout: 20000 });
    await page.waitForTimeout(800);
    console.log("BLOB canvas count:", await canvases.count());
    const buttons = await page.getByRole("button").allInnerTexts();
    console.log("BUTTONS:", JSON.stringify(buttons.slice(0, 30)));

    async function readBead(label: string) {
        const png = await grab(canvases.first());
        const bg = modalBg(png);
        const {width:w,height:h,data}=png;
        let sa=0,sb=0,sL=0,n=0;
        const x0=Math.floor(w*0.12),x1=Math.ceil(w*0.88),y0=Math.floor(h*0.12),y1=Math.ceil(h*0.88);
        for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){const i=(y*w+x)*4;
            const d=Math.abs(data[i]!-bg[0])+Math.abs(data[i+1]!-bg[1])+Math.abs(data[i+2]!-bg[2]);
            if(d<=110)continue; const[L,a,b]=oklab(data[i]!,data[i+1]!,data[i+2]!);sa+=a;sb+=b;sL+=L;n++;}
        const mA=sa/n,mB=sb/n; const C=Math.hypot(mA,mB); let hue=Math.atan2(mB,mA)*180/Math.PI; if(hue<0)hue+=360;
        console.log(`${label}: dims ${w}x${h} bg=${bg} bodyN=${n} L=${(sL/n).toFixed(3)} C=${C.toFixed(3)} h=${hue.toFixed(1)}`);
    }
    await readBead("blob default(calm)");
    const excitedTab = page.getByRole("tab", { name: /excited/i }).first();
    console.log("excited tab count:", await excitedTab.count());
    if(await excitedTab.count()){await excitedTab.click(); await page.waitForTimeout(1500);}
    await readBead("blob excited");

    // Shadow read on wrapper — quadrant DARK-mass asymmetry (BR vs TL margins).
    const wrapper = page.locator(".goo-blob-wrapper").first();
    const wpng = await grab(wrapper);
    const wbg = modalBg(wpng);
    const {width:ww,height:wh,data:wd}=wpng;
    // Measure the cast-shadow CONTRAST against the bg (mode-agnostic). The cartoon
    // stamp is a HARD high-contrast cast (near-black over cream / near-white over
    // ink). The ambient is a SOFT low-contrast halo. In light mode the cast is
    // DARKER than bg; in dark mode (--shadow-color flips to --foreground=light) it
    // is LIGHTER. So measure |L - bgL| of the cast pixels (the painted pixels OUTSIDE
    // the bead's bright cap — the lower-half region where the shadow lands) and take
    // the PEAK contrast (mean of the top-5% |L-bgL|). Hard stamp → high; ambient → low.
    const wbgL = oklab(wbg[0],wbg[1],wbg[2])[0];
    const contrasts:number[]=[];
    for(let y=Math.floor(wh*0.5);y<wh;y++)for(let x=0;x<ww;x++){const i=(y*ww+x)*4;
        const d=Math.abs(wd[i]!-wbg[0])+Math.abs(wd[i+1]!-wbg[1])+Math.abs(wd[i+2]!-wbg[2]);
        if(d<8)continue;
        const L=oklab(wd[i]!,wd[i+1]!,wd[i+2]!)[0];
        contrasts.push(Math.abs(L-wbgL));
    }
    contrasts.sort((a,b)=>b-a);
    const top5 = contrasts.slice(0, Math.max(1,Math.floor(contrasts.length*0.05)));
    const peakContrast = top5.reduce((s,v)=>s+v,0)/top5.length;
    console.log(`shadow CONTRAST ${ww}x${wh} bgL=${wbgL.toFixed(3)} castN=${contrasts.length} peakContrast(top5%)=${peakContrast.toFixed(3)}`);

    // Constellation recession
    await page.goto(PI_TARGETS.constellation.path);
    const full = page.locator('[data-testid="constellation-recession-full"] canvas').first();
    const dim = page.locator('[data-testid="constellation-recession-dim"] canvas').first();
    await full.waitFor({state:"visible",timeout:20000});
    await page.waitForTimeout(800);
    // Interior-inset summed darkness (exclude the rounded-card corners). At 0.4x
    // alpha the painted pixels are ~0.4x as dark, so the summed interior darkness
    // ratio ~ 0.4. Also report a per-painted-pixel mean intensity.
    function interiorDark(png:PNG,bg:[number,number,number]){const{width:w,height:h,data}=png;
        const x0=Math.floor(w*0.1),x1=Math.ceil(w*0.9),y0=Math.floor(h*0.1),y1=Math.ceil(h*0.9);
        let sum=0,paintedSum=0,paintedN=0;
        for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){const i=(y*w+x)*4;
            const d=Math.abs(data[i]!-bg[0])+Math.abs(data[i+1]!-bg[1])+Math.abs(data[i+2]!-bg[2]);
            sum+=d; if(d>=10){paintedSum+=d;paintedN++;}}
        return {sum,meanPainted:paintedN?paintedSum/paintedN:0,paintedN};
    }
    for(let f=0;f<4;f++){
        const pf=await grab(full),pd=await grab(dim);
        const bf=modalBg(pf),bd=modalBg(pd);
        const idf=interiorDark(pf,bf),idd=interiorDark(pd,bd);
        console.log(`con frame ${f}: SUM full=${idf.sum} dim=${idd.sum} ratio=${(idd.sum/idf.sum).toFixed(3)} | meanPainted full=${idf.meanPainted.toFixed(1)} dim=${idd.meanPainted.toFixed(1)} ratio=${(idd.meanPainted/idf.meanPainted).toFixed(3)} | paintedN full=${idf.paintedN} dim=${idd.paintedN}`);
        await page.waitForTimeout(150);
    }
});
