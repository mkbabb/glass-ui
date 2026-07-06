import { PNG } from "pngjs";
import { readFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
function strip(file){
  const p = PNG.sync.read(readFileSync(OUT+file));
  const {width:W,data}=p; let s=0,n=0;
  for(let y=500;y<1200;y+=2)for(let x=2600;x<2870;x+=2){const i=(y*W+x)*4;s+=0.299*data[i]+0.587*data[i+1]+0.114*data[i+2];n++;}
  return +(s/n).toFixed(1);
}
console.log("page-bg mean lum  safari-dark:", strip("safari-dark-canvas.png"), " safari-light:", strip("safari-light-canvas.png"));
