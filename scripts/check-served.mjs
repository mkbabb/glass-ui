#!/usr/bin/env node
// The site serves THIS build: the hashed asset set the live index.html references
// equals the built dist-demo/index.html's, every hashed file in dist-demo/assets is
// served as itself (right size, not the HTML fallback with a 200), and a deep link
// answers the built index.
//
//   node scripts/check-served.mjs <origin> [--tries N] [--headers]
//
// --headers also asserts what only Pages does (`vite preview` reads no _headers and
// has no nearest-404.html walk): the index carries dist-demo/_headers' CSP and
// `no-transform`, a hashed asset carries `immutable`, and a path under /assets/ that
// matches no file answers 404 with `no-store` (docs/release-infra/asset-miss.md).
//
// Each asset that is not served as built is named by its mode. `html-for-js` is a
// script answered 200 text/html: the SPA index, served by an edge that did not have
// the chunk. Cloudflare caches by extension, so that answer can stay at an edge; the
// line carries its cf-cache-status and age. A 404 is not cached and clears on a later
// try. The budget (12 tries, 10 s apart) covers propagation; a cached `html-for-js`
// does not clear in any budget and needs a purge of the URLs it names.
//
// Locally: npm run demo:dist:serve, then node scripts/check-served.mjs http://localhost:5200/ --tries 1
import { readdirSync, readFileSync, statSync } from "node:fs";
import { pathToFileURL } from "node:url";

const DIST = "dist-demo";

export const assetsIn = (html) =>
    new Set([...html.matchAll(/\/assets\/[\w.-]+\.(?:js|css|woff2?)/g)].map((m) => m[0]));
const same = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));
const cacheControl = (res) => res.headers.get("cache-control") ?? "";

/** Why a built asset's response is not the built file, or null when it is. */
export function assetMode(file, res, bytes, builtBytes) {
    if (!res.ok) return `HTTP ${res.status}`;
    if ((res.headers.get("content-type") ?? "").startsWith("text/html")) return `html-for-${file.split(".").pop()}`;
    if (bytes !== builtBytes) return `size ${bytes}/${builtBytes}`;
    return null;
}

/** One clause per mode: `html-for-js 3 (a.js HIT age 657, ...)`. */
export function summarize(unserved) {
    const byMode = Map.groupBy(unserved, (u) => u.mode);
    return [...byMode]
        .map(([mode, us]) => `${mode} ${us.length} (${us.slice(0, 3).map((u) => [u.file, u.cache].filter(Boolean).join(" ")).join(", ")})`)
        .join("; ");
}

/** The Pages-only contract: the index's headers, a hit's `immutable`, a miss's 404 + `no-store`. */
export function headerProblems({ index, asset, miss }, csp) {
    const out = [];
    if (!cacheControl(index).includes("no-transform")) out.push("no `no-transform` on the index");
    if (index.headers.get("content-security-policy") !== csp) out.push("the index's CSP is not dist-demo/_headers'");
    if (!cacheControl(asset).includes("immutable")) out.push(`a hashed asset is not \`immutable\` (${cacheControl(asset) || "no Cache-Control"})`);
    if (miss.status !== 404) out.push(`a miss under /assets/ answered ${miss.status}, not 404`);
    if (!/\bno-store\b/.test(cacheControl(miss)) || cacheControl(miss).includes("immutable"))
        out.push(`a miss under /assets/ is cacheable (${cacheControl(miss) || "no Cache-Control"})`);
    return out;
}

/** A client route the server has never heard of answers the built index with a 200. */
export function deepLinkProblem(res, html, built) {
    const type = res.headers.get("content-type") ?? "";
    if (res.status !== 200 || !type.startsWith("text/html")) return `a deep link answered ${res.status} ${type}`;
    if (!same(built, assetsIn(html))) return "a deep link does not answer the built index";
    return null;
}

async function main(args) {
    const origin = new URL(args.find((a) => !a.startsWith("--")) ?? "https://glass.babb.dev/").href;
    const flag = (name) => args.indexOf(name);
    const tries = flag("--tries") >= 0 ? Number(args[flag("--tries") + 1]) : 12;
    const checkHeaders = flag("--headers") >= 0;

    const built = assetsIn(readFileSync(`${DIST}/index.html`, "utf8"));
    if (built.size === 0) throw new Error(`${DIST}/index.html references no hashed assets`);
    const csp = readFileSync(`${DIST}/_headers`, "utf8").match(/Content-Security-Policy: (.+)/)?.[1].trim();
    // assets/404.html is the miss page, not a hashed asset: Pages answers it at /assets/404.
    const files = readdirSync(`${DIST}/assets`).filter((f) => f !== "404.html");
    const get = (path) => fetch(new URL(path, origin), { cache: "no-store" });

    async function unservedAssets() {
        const unserved = [];
        for (let i = 0; i < files.length; i += 16) {
            await Promise.all(
                files.slice(i, i + 16).map(async (file) => {
                    try {
                        const r = await get(`assets/${file}`);
                        const bytes = (await r.arrayBuffer()).byteLength;
                        const mode = assetMode(file, r, bytes, statSync(`${DIST}/assets/${file}`).size);
                        if (!mode) return;
                        const status = r.headers.get("cf-cache-status");
                        const age = r.headers.get("age");
                        unserved.push({ file, mode, cache: status ? `${status}${age ? ` age ${age}` : ""}` : "" });
                    } catch (e) {
                        unserved.push({ file, mode: "error", cache: e.message });
                    }
                }),
            );
        }
        return unserved;
    }

    async function siteProblems(index) {
        const deep = await get(`served-check/${Date.now()}`);
        const problems = [deepLinkProblem(deep, await deep.text(), built)].filter(Boolean);
        if (!checkHeaders) return problems;
        const asset = await get(`assets/${files.find((f) => f.endsWith(".js"))}`);
        const miss = await get(`assets/served-check-miss-${Date.now()}.js`);
        await Promise.all([asset.arrayBuffer(), miss.arrayBuffer()]);
        return [...problems, ...headerProblems({ index, asset, miss }, csp)];
    }

    let last = [];
    for (let i = 1; i <= tries; i++) {
        try {
            const res = await get(`?served-check=${Date.now()}`);
            const served = assetsIn(await res.text());
            if (res.ok && same(built, served)) {
                // The index propagates before the lazy chunks, so each built asset must be
                // served as itself before this passes.
                last = await unservedAssets();
                const problems = await siteProblems(res);
                if (last.length === 0 && problems.length === 0) {
                    console.log(`served-build PASS: ${origin} serves the built asset set (${built.size} in the index, ${files.length} in ${DIST}/assets) and a deep link${checkHeaders ? ", with the built headers, an immutable hit and a 404 no-store miss" : ""}`);
                    process.exit(0);
                }
                const assets = last.length ? `${last.length} of ${files.length} assets not served as built: ${summarize(last)}` : "every asset served as built";
                console.log(`try ${i}/${tries}: the index matches; ${assets}${problems.length ? `; ${problems.join("; ")}` : ""}`);
            } else console.log(`try ${i}/${tries}: HTTP ${res.status}, ${served.size} served vs ${built.size} built`);
        } catch (e) {
            console.log(`try ${i}/${tries}: ${e.message}`);
        }
        if (i < tries) await new Promise((r) => setTimeout(r, 10_000));
    }
    const stuck = last.filter((u) => u.mode === "html-for-js");
    if (stuck.length > 0)
        console.error(`::error title=html-for-js::${stuck.length} script(s) answered 200 text/html, the SPA index: ${summarize(stuck)}. Cloudflare caches by extension, so an edge that holds this answer keeps it until purged: purge these URLs (docs/release-infra/asset-miss.md).`);
    console.error(`::error title=served-build::${origin} does not serve this build as built`);
    process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main(process.argv.slice(2));
