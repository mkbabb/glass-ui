#!/usr/bin/env node
// The site serves THIS build: the hashed asset set the live index.html references
// equals the built dist-demo/index.html's, and every file in dist-demo/assets is
// served as itself (right size, not the HTML fallback with a 200).
//
//   node scripts/check-served.mjs <origin> [--tries N] [--headers]
//
// --headers also asserts the index response carries dist-demo/_headers' CSP and
// `no-transform` (true on Pages; `vite preview` does not read _headers).
// Locally: npm run demo:dist:serve, then node scripts/check-served.mjs http://localhost:5200/ --tries 1
import { readdirSync, readFileSync, statSync } from "node:fs";

const args = process.argv.slice(2);
const origin = new URL(args.find((a) => !a.startsWith("--")) ?? "https://glass.babb.dev/").href;
const flag = (name) => args.indexOf(name);
const tries = flag("--tries") >= 0 ? Number(args[flag("--tries") + 1]) : 12;
const checkHeaders = flag("--headers") >= 0;
const DIST = "dist-demo";

const assets = (html) => new Set([...html.matchAll(/\/assets\/[\w.-]+\.(?:js|css|woff2?)/g)].map((m) => m[0]));
const built = assets(readFileSync(`${DIST}/index.html`, "utf8"));
if (built.size === 0) throw new Error(`${DIST}/index.html references no hashed assets`);
const csp = readFileSync(`${DIST}/_headers`, "utf8").match(/Content-Security-Policy: (.+)/)?.[1].trim();
const files = readdirSync(`${DIST}/assets`);

async function unserved() {
    const missing = [];
    for (let i = 0; i < files.length; i += 16) {
        await Promise.all(
            files.slice(i, i + 16).map(async (f) => {
                try {
                    const r = await fetch(new URL(`assets/${f}`, origin), { cache: "no-store" });
                    const type = r.headers.get("content-type") ?? "";
                    const body = await r.arrayBuffer();
                    if (!r.ok || type.startsWith("text/html") || body.byteLength !== statSync(`${DIST}/assets/${f}`).size)
                        missing.push(`${f} (${r.status} ${type})`);
                } catch (e) {
                    missing.push(`${f} (${e.message})`);
                }
            }),
        );
    }
    return missing;
}

function headerProblems(res) {
    const out = [];
    if (!(res.headers.get("cache-control") ?? "").includes("no-transform")) out.push("no `no-transform` on the index");
    if (res.headers.get("content-security-policy") !== csp) out.push("the index's CSP is not dist-demo/_headers'");
    return out;
}

const same = (a, b) => a.size === b.size && [...a].every((x) => b.has(x));
for (let i = 1; i <= tries; i++) {
    try {
        const res = await fetch(`${origin}?served-check=${Date.now()}`, { cache: "no-store" });
        const served = assets(await res.text());
        if (res.ok && same(built, served)) {
            // The index propagates before the lazy chunks, so each built asset must be
            // served as itself before this passes.
            const missing = await unserved();
            const bad = checkHeaders ? headerProblems(res) : [];
            if (missing.length === 0 && bad.length === 0) {
                console.log(`served-build PASS: ${origin} serves the built asset set (${built.size} in the index, ${files.length} in ${DIST}/assets)${checkHeaders ? ", with the built headers" : ""}`);
                process.exit(0);
            }
            console.log(`try ${i}/${tries}: the index matches; ${missing.length} of ${files.length} assets not served as built (${missing.slice(0, 3).join(", ")}); ${bad.join("; ")}`);
        } else console.log(`try ${i}/${tries}: HTTP ${res.status}, ${served.size} served vs ${built.size} built`);
    } catch (e) {
        console.log(`try ${i}/${tries}: ${e.message}`);
    }
    if (i < tries) await new Promise((r) => setTimeout(r, 10_000));
}
console.error(`::error title=served-build::${origin} does not serve the built asset set`);
process.exit(1);
