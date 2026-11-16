import { transform } from "lightningcss";
import { build } from "vite";
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
const root = process.argv[2];
const out = {};
let all = "";
for (const f of ["plate", "glyph", "presence"]) {
  const src = readFileSync(`${root}/src/styles/glass/${f}.css`);
  const { code } = transform({ filename: `${f}.css`, code: src, minify: true, targets: { safari: (17 << 16) | (5 << 8) } });
  all += code.toString();
  out[f] = { raw: code.length, gzip: gzipSync(code, { level: 9 }).length };
}
out.threePartials = { raw: Buffer.byteLength(all), gzip: gzipSync(Buffer.from(all), { level: 9 }).length };
const extra = `@media (prefers-reduced-motion:reduce){.plate:before{transition:opacity var(--duration-instant) var(--ease-standard)!important}.presence-enter-active,.presence-leave-active,.presence-swap-enter-active,.presence-swap-leave-active{transition:opacity var(--duration-instant) var(--ease-out)!important}[data-presence]{transition:opacity var(--duration-instant) var(--ease-out),visibility 0s!important}[data-presence]:is([data-absent],[data-state=unchecked]){transition:opacity var(--duration-instant) var(--ease-out),visibility 0s var(--duration-instant)!important}.focus-ring{transition:outline-color var(--duration-instant) var(--ease-standard)!important}}`;
out.reducedRows = { raw: extra.length, gzip: gzipSync(extra, { level: 9 }).length };
for (const [name, entry] of [["presence+follow", "src/composables/motion/presence/index.ts"], ["no-snap", "src/testing/no-snap/index.ts"]]) {
  const r = await build({ configFile: false, logLevel: "silent", build: { write: false, minify: true, target: "safari17", lib: { entry: `${root}/${entry}`, formats: ["es"], fileName: "x" }, rollupOptions: { external: ["vue"] } } });
  const code = Buffer.from(r[0].output[0].code);
  out[name] = { raw: code.length, gzip: gzipSync(code, { level: 9 }).length };
}
console.log(JSON.stringify(out, null, 1));
