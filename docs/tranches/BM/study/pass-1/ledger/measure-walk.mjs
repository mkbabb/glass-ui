// BM pass 1: gz bytes of the luminance stack walk alone (backdropLuminanceSample.ts:203-279 with its
// header), cut into static-walk.measure.ts, every import external. Standalone gzip -9.
import { rolldown } from "rolldown";
import { gzipSync } from "node:zlib";
const file = new URL("./static-walk.measure.ts", import.meta.url).pathname;
const b = await rolldown({ input: file, external: (id) => id.startsWith("ext-"), logLevel: "silent" });
const { output } = await b.generate({ format: "es", minify: true });
await b.close();
const code = output[0].code;
console.log(JSON.stringify({ name: "luminance stack walk alone (resolveBackdropRgba, resolveUnderlayRgb, sampleStatic)", raw: code.length, gz: gzipSync(Buffer.from(code), { level: 9 }).length }));
