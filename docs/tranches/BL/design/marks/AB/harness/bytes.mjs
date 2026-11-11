// The bytes a candidate's entry ships: one entry, built the same way for all three
// (vite lib mode, vue plugin, vue external, default (oxc) minify, glass's CSS targets).
//   node ab/bytes.mjs <entry> <out.json>   (cwd = the worktree)
import { build } from "vite";
import vue from "@vitejs/plugin-vue";
import { readdirSync, readFileSync, statSync, writeFileSync, rmSync } from "node:fs";
import { gzipSync, brotliCompressSync } from "node:zlib";
import { join, resolve } from "node:path";
const [entry, outJson] = process.argv.slice(2);
const { glassCssTarget, glassLightningcss } = await import(resolve("vite.targets.ts")).catch(async () => {
    // vite.targets.ts is TS; read its two values by hand.
    const { Features } = await import("lightningcss");
    return { glassCssTarget: ["chrome120", "edge120", "firefox114", "safari16.4", "ios16.4"], glassLightningcss: { exclude: Features.LightDark } };
});
const dir = resolve("ab/bytes-dist");
rmSync(dir, { recursive: true, force: true });
await build({
    configFile: false, logLevel: "error",
    plugins: [vue()],
    css: { transformer: "lightningcss", lightningcss: glassLightningcss },
    build: {
        outDir: dir, emptyOutDir: true, minify: true, cssMinify: "lightningcss", cssTarget: glassCssTarget, target: "es2022",
        lib: { entry: resolve(entry), formats: ["es"], fileName: "entry" },
        rollupOptions: { external: (id) => id === "vue" || id.startsWith("@vue/") || id.startsWith("@mkbabb/") },
    },
});
const files = {};
let js = 0, css = 0, jsGz = 0, cssGz = 0, jsBr = 0, cssBr = 0;
for (const f of readdirSync(dir)) {
    const b = readFileSync(join(dir, f));
    const g = gzipSync(b, { level: 9 }).length, br = brotliCompressSync(b).length;
    files[f] = { raw: b.length, gzip: g, brotli: br };
    if (f.endsWith(".js")) { js += b.length; jsGz += g; jsBr += br; }
    if (f.endsWith(".css")) { css += b.length; cssGz += g; cssBr += br; }
}
writeFileSync(outJson, JSON.stringify({ entry, files, js, css, jsGz, cssGz, jsBr, cssBr, total: js + css, totalGz: jsGz + cssGz }, null, 1));
console.log(entry, { js, css, jsGz, cssGz });
