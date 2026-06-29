// Grain intensity — per-patch luminance std-dev (calm grain = low std). Also reports
// mean warm OKLCh. Reads a PNG, patches in 2x coords.
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { PNG } = require("pngjs");
function lin(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4);}
function lum(R,G,B){return 0.2126*lin(R)+0.7152*lin(G)+0.0722*lin(B);}
const pngPath = process.argv[2];
const patches = JSON.parse(process.argv[3]);
const png = PNG.sync.read(fs.readFileSync(pngPath));
const out=[];
for(const p of patches){
  const ls=[]; let rs=0,gs=0,bs=0,n=0;
  for(let y=p.y;y<p.y+p.h&&y<png.height;y++)for(let x=p.x;x<p.x+p.w&&x<png.width;x++){
    const i=(png.width*y+x)<<2; const R=png.data[i],G=png.data[i+1],B=png.data[i+2];
    rs+=R;gs+=G;bs+=B;ls.push(lum(R,G,B));n++;
  }
  const mean=ls.reduce((a,b)=>a+b,0)/n;
  const std=Math.sqrt(ls.reduce((a,b)=>a+(b-mean)**2,0)/n);
  // also rgb channel std as 8-bit
  out.push({name:p.name, meanRGB:[Math.round(rs/n),Math.round(gs/n),Math.round(bs/n)], lumMean:+mean.toFixed(4), lumStd:+std.toFixed(4), lumStdPct:+(std/mean*100).toFixed(1)});
}
console.log(JSON.stringify(out,null,2));
