// Lane L4 consumer-bundler witness for the file delivery (O-173 G2, O-163): a consumer
// whose entry CSS is `@import "@mkbabb/glass-ui/styles/font-files"`, built by Vite with
// the package resolved to <package-root> (its `exports` map, read here). Reports the
// consumer's emitted entry CSS bytes, its data-URI count and the font files Vite copied.
//   node consumer.mjs <package-root> <out-json>
import { build } from "vite";
import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const [pkgRoot, outJson] = process.argv.slice(2);
const pkg = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf8"));
const target = pkg.exports["./styles/font-files"];
const reading = { pkgRoot, version: pkg.version, exportTarget: target ?? null };
const outDir = join(dirname(outJson), `consumer-dist-${pkg.version}-${Date.now()}`);
try {
    if (!target) throw new Error('package.json exports has no "./styles/font-files"');
    await build({
        root: join(here, "consumer"),
        logLevel: "warn",
        configFile: false,
        resolve: { alias: [{ find: /^@mkbabb\/glass-ui\/styles\/font-files$/, replacement: resolve(pkgRoot, target) }] },
        build: { outDir, emptyOutDir: true, assetsInlineLimit: 0 },
    });
    const assets = readdirSync(join(outDir, "assets"));
    const css = assets.filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(outDir, "assets", f), "utf8"));
    reading.entryCssBytes = css.reduce((n, s) => n + Buffer.byteLength(s), 0);
    reading.dataUris = css.reduce((n, s) => n + (s.match(/url\(\s*["']?data:/g) ?? []).length, 0);
    reading.fontFiles = assets.filter((f) => f.endsWith(".woff2")).map((f) => ({ name: f, bytes: statSync(join(outDir, "assets", f)).size }));
    reading.cssFontUrls = css.flatMap((s) => s.match(/url\([^)]*\.woff2[^)]*\)/g) ?? []);
    reading.pass = reading.dataUris === 0 && reading.fontFiles.length >= 6 && reading.cssFontUrls.length >= 6;
} catch (e) {
    reading.error = String(e.message ?? e).split("\n")[0];
    reading.pass = false;
} finally {
    if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
}
writeFileSync(outJson, JSON.stringify(reading, null, 1));
console.log(JSON.stringify(reading));
process.exitCode = reading.pass ? 0 : 1;
