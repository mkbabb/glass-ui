import fs from "node:fs"; import { PNG } from "pngjs";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-rebuild-paint";
// Canvas region in the 2880x1800 Safari full: the rounded viz rect.
// Conservative interior box well inside the canvas (avoid frame/text).
const BOX = { x: 560, y: 420, w: 1900, h: 760 };
for (const mode of ["light","dark"]) {
  const png = PNG.sync.read(fs.readFileSync(`${OUT}/safari-${mode}-full.png`));
  const { width:W, data } = png;
  let sum=0,n=0,p=[],colored=0,warm=0,teal=0;
  const NB=20, cols=new Array(NB).fill(0), colN=new Array(NB).fill(0);
  for (let y=BOX.y;y<BOX.y+BOX.h;y++){
    for (let x=BOX.x;x<BOX.x+BOX.w;x++){
      const i=(y*W+x)*4; const r=data[i],g=data[i+1],b=data[i+2];
      const l=0.2126*r+0.7152*g+0.0722*b; sum+=l;n++;p.push(l);
      const ci=Math.min(NB-1,Math.floor((x-BOX.x)/(BOX.w/NB))); cols[ci]+=l; colN[ci]++;
      if(Math.max(r,g,b)-Math.min(r,g,b)>16){colored++; if(r>=b)warm++; else teal++;}
    }
  }
  p.sort((a,b)=>a-b);
  const mean=sum/n;
  // crop the canvas box out for a visual
  const crop=new PNG({width:BOX.w,height:BOX.h});
  for(let y=0;y<BOX.h;y++)for(let x=0;x<BOX.w;x++){const s=((y+BOX.y)*W+(x+BOX.x))*4,d=(y*BOX.w+x)*4;crop.data[d]=data[s];crop.data[d+1]=data[s+1];crop.data[d+2]=data[s+2];crop.data[d+3]=255;}
  fs.writeFileSync(`${OUT}/safari-${mode}-canvas.png`, PNG.sync.write(crop));
  console.log(`[safari-${mode}] mean=${mean.toFixed(1)} p99=${p[Math.floor(n*0.99)]} max=${p[n-1].toFixed(1)} coloredPct=${(100*colored/n).toFixed(2)} warm%=${colored?Math.round(100*warm/colored):0} teal%=${colored?Math.round(100*teal/colored):0} colProfile=${JSON.stringify(cols.map((s,i)=>Math.round(s/colN[i])))}`);
}
