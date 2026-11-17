#!/usr/bin/env node
// Serve a built dist-demo through Cloudflare Pages' own asset handler and assert the
// asset-miss contract (docs/release-infra/asset-miss.md). No wrangler, no account, no
// network beyond fetching the handler's source once from GitHub at a pinned commit.
//
//   node docs/release-infra/asset-miss/emulate.mjs <dist-dir> <cache-dir>
//
// <cache-dir> holds the downloaded source and its bundle; it is a cache, not a record.
// The handler is packages/pages-shared/asset-server/handler.ts ("used internally to
// power Wrangler and Cloudflare Pages", its README). It runs here with no preservation
// cache and no early hints (no `caches`), plain content (no encodings) and `_headers`
// parsed by the small reader below, which covers the syntax demo/_headers uses.
// Production's notFound() looks a miss up in the preservation cache before its 404
// walk; that cache holds only URLs an earlier deployment served as files, and the
// misses asked for here are names no deployment served.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const SHA = "5f05841d4d4a4a67fee5ddc0150309b5ed782069"; // cloudflare/workers-sdk main, 2026-11-17
const SOURCES = [
    "packages/pages-shared/asset-server/handler.ts",
    "packages/pages-shared/asset-server/responses.ts",
    "packages/pages-shared/asset-server/metadata.ts",
    "packages/workers-shared/asset-worker/src/utils/rules-engine.ts",
];
const REPO = resolve(dirname(new URL(import.meta.url).pathname), "../../..");

const [distArg, cacheArg] = process.argv.slice(2);
if (!distArg || !cacheArg) throw new Error("usage: emulate.mjs <dist-dir> <cache-dir>");
const dist = resolve(distArg);
const src = join(resolve(cacheArg), SHA);

async function handlerModule() {
    const bundle = join(src, "handler.mjs");
    if (!existsSync(bundle)) {
        for (const path of SOURCES) {
            const res = await fetch(`https://raw.githubusercontent.com/cloudflare/workers-sdk/${SHA}/${path}`);
            if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
            mkdirSync(dirname(join(src, path)), { recursive: true });
            writeFileSync(join(src, path), await res.text());
        }
        // rules-engine imports the Workers asset handler for one constant the Pages handler never reads.
        writeFileSync(join(src, "packages/workers-shared/asset-worker/src/handler.ts"), "export const REDIRECTS_VERSION = 1;\n");
        const { rolldown } = await import(createRequire(join(REPO, "package.json")).resolve("rolldown"));
        const build = await rolldown({
            input: join(src, SOURCES[0]),
            resolve: { alias: { "@cloudflare/workers-shared": join(src, "packages/workers-shared") } },
        });
        await build.write({ file: bundle, format: "esm" });
    }
    return import(pathToFileURL(bundle).href);
}

/** `_headers` as the handler's metadata: `{ [pattern]: { set, unset } }` in file order. */
function headerRules(text) {
    const rules = {};
    let rule;
    for (const line of text.split("\n")) {
        const t = line.trim();
        if (!t || t.startsWith("#")) continue;
        if (!/^\s/.test(line)) rule = rules[t] = { set: {}, unset: [] };
        else if (t.startsWith("!")) rule.unset.push(t.slice(1).trim());
        else {
            const i = t.indexOf(":");
            const [name, value] = [t.slice(0, i).trim(), t.slice(i + 1).trim()];
            rule.set[name] = rule.set[name] ? `${rule.set[name]}, ${value}` : value;
        }
    }
    return rules;
}

const TYPES = { html: "text/html; charset=utf-8", js: "application/javascript", css: "text/css; charset=utf-8", woff2: "font/woff2" };
const CONTROL = new Set(["/_headers", "/_redirects", "/_routes.json", "/_worker.js"]);
const headersFile = readFileSync(join(dist, "_headers"), "utf8");
const csp = headersFile.match(/Content-Security-Policy: (.+)/)?.[1].trim();
const { generateHandler } = await handlerModule();

async function serve(path) {
    const errors = [];
    const res = await generateHandler({
        request: new Request(`https://glass.babb.dev${path}`),
        metadata: { headers: { version: 2, rules: headerRules(headersFile) } },
        logError: (e) => errors.push(e),
        findAssetEntryForPath: async (p) => {
            const file = join(dist, p);
            return !CONTROL.has(p) && existsSync(file) && statSync(file).isFile() ? p : null;
        },
        getAssetKey: (entry) => entry,
        negotiateContent: () => ({ encoding: null }),
        fetchAsset: async (key) => ({
            body: new Blob([readFileSync(join(dist, key))]).stream(),
            contentType: TYPES[key.split(".").pop()] ?? "application/octet-stream",
        }),
    });
    await res.arrayBuffer();
    if (errors.length) throw errors[0];
    const h = (name) => res.headers.get(name) ?? "";
    return { status: res.status, type: h("content-type"), cache: h("cache-control"), csp: h("content-security-policy"), location: h("location") };
}

// Every client route: `/`, each `/<section>` and `/<section>/<story>` from the manifest, and the catch-all.
const routes = ["/"];
for (const section of readdirSync(join(REPO, "demo/stories"))) {
    const file = join(REPO, "demo/stories", section, "routes.ts");
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8");
    const id = text.match(/\bid: "([^"]+)"/)[1];
    routes.push(`/${id}`, ...[...text.matchAll(/\{ id: "([^"]+)"/g)].map((m) => `/${id}/${m[1]}`));
}
routes.push("/no/such/route");

const assets = readdirSync(join(dist, "assets"));
const pick = (ext) => assets.find((f) => f.endsWith(`.${ext}`) && f !== "404.html");
const cases = [
    ...routes.map((path) => ({ path, kind: "route" })),
    ...["js", "css", "woff2"].map((ext) => ({ path: `/assets/${pick(ext)}`, kind: "hit" })),
    ...["/assets/served-check-miss.js", "/assets/nope-Zz9.css", "/assets/"].map((path) => ({ path, kind: "miss" })),
    ...["/index.html", "/assets/404.html", "/assets/404"].map((path) => ({ path, kind: "info" })),
];

const expect = {
    route: (r) => r.status === 200 && r.type.startsWith("text/html") && !r.cache.includes("immutable") && r.csp === csp,
    hit: (r) => r.status === 200 && !r.type.startsWith("text/html") && r.cache.includes("immutable") && r.csp === csp,
    miss: (r) => r.status === 404 && r.cache === "no-store",
    info: () => true,
};
let failed = 0;
const seen = new Map();
for (const { path, kind } of cases) {
    const r = await serve(path);
    const ok = expect[kind](r);
    if (!ok) failed++;
    const row = `${kind.padEnd(5)} ${String(r.status).padEnd(3)} ${r.type.padEnd(24)} cache-control: ${r.cache || "-"}${r.location ? ` -> ${r.location}` : ""}${r.csp === csp ? " +csp" : ""}`;
    // Routes repeat one shape; print each distinct shape once, with its count.
    if (kind === "route" && ok) seen.set(row, (seen.get(row) ?? 0) + 1);
    else console.log(`${ok ? "ok  " : "FAIL"} ${row}  ${path}`);
}
for (const [row, n] of seen) console.log(`ok   ${row}  (${n} client routes)`);
console.log(failed ? `asset-miss contract FAILS: ${failed} of ${cases.length}` : `asset-miss contract holds: ${cases.length} requests (${routes.length} client routes)`);
process.exit(failed ? 1 : 0);
