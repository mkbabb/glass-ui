// BM pass 8: builds pages/P8-present.html from P8-present.src.html by inlining the photograph the page already
// carries (R3's, a data: URI) in place of __PHOTO__. Run: node docs/tranches/BM/study/pass-8/bud/build-page.mjs
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname), OUT = path.resolve(HERE, "../../pages/P8-present.html");
const photo = readFileSync(OUT, "utf8").match(/url\("(data:[^"]+)"\)/)[1];
const src = readFileSync(path.join(HERE, "P8-present.src.html"), "utf8");
if (!src.includes("__PHOTO__")) throw new Error("no __PHOTO__ in the source");
writeFileSync(OUT, src.replace("__PHOTO__", photo));
console.log("pages/P8-present.html", Buffer.byteLength(src.replace("__PHOTO__", photo)), "bytes");
