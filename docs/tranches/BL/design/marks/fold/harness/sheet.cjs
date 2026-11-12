// node sheet.cjs out.png a.png b.png ... : stack captures top to bottom
const path=require("path");const fs=require("fs");
const {PNG}=require(path.join(path.dirname(require.resolve("playwright-core",{paths:["/Users/mkbabb/Programming/glass-ui/node_modules"]})),"lib/utilsBundle.js"));
const [out,...ins]=process.argv.slice(2);
const ims=ins.map(i=>PNG.sync.read(fs.readFileSync(i)));
const W=Math.max(...ims.map(i=>i.width)),H=ims.reduce((s,i)=>s+i.height+6,0)-6;const o=new PNG({width:W,height:H});
for(let i=0;i<W*H;i++)o.data.set([128,128,128,255],i*4);let y=0;for(const im of ims){PNG.bitblt(im,o,0,0,im.width,im.height,0,y);y+=im.height+6;}
fs.writeFileSync(out,PNG.sync.write(o));
