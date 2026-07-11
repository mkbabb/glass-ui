import { PNG } from "pngjs";
import { readFileSync, writeFileSync } from "node:fs";
// args: in out x y w h
const [,, inp, outp, x, y, w, h] = process.argv;
const src = PNG.sync.read(readFileSync(inp));
const X=+x,Y=+y,W=+w,H=+h;
const dst = new PNG({ width: W, height: H });
for (let j=0;j<H;j++){
  for (let i=0;i<W;i++){
    const si = ((Y+j)*src.width + (X+i))*4;
    const di = (j*W + i)*4;
    dst.data[di]=src.data[si]; dst.data[di+1]=src.data[si+1];
    dst.data[di+2]=src.data[si+2]; dst.data[di+3]=src.data[si+3];
  }
}
writeFileSync(outp, PNG.sync.write(dst));
console.log("wrote", outp, W+"x"+H);
