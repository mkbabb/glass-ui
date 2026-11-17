import { describe, expect, it } from "vitest";
import {
    assetMode,
    assetsIn,
    deepLinkProblem,
    headerProblems,
    summarize,
} from "../../scripts/check-served.mjs";

const res = (status: number, headers: Record<string, string> = {}, body = "") =>
    new Response(status === 304 ? null : body, { status, headers });

const INDEX = '<script type="module" src="/assets/index-Ab1.js"></script><link rel="stylesheet" href="/assets/index-Cd2.css">';
const CSP = "default-src 'self'";
const IMMUTABLE = "public, max-age=31536000, immutable, no-transform";

describe("assetMode", () => {
    it("names a script answered 200 text/html as html-for-js", () => {
        const r = res(200, { "content-type": "text/html; charset=utf-8", "cache-control": IMMUTABLE });
        expect(assetMode("checks-B6psvwuG.js", r, 8050, 1234)).toBe("html-for-js");
    });

    it("names the other extensions after themselves", () => {
        const html = { "content-type": "text/html; charset=utf-8" };
        expect(assetMode("index-Cd2.css", res(200, html), 10, 10)).toBe("html-for-css");
        expect(assetMode("fira-code-latin-CHoedHDv.woff2", res(200, html), 10, 10)).toBe("html-for-woff2");
    });

    it("reports a 404 by its status, even with an HTML body", () => {
        const r = res(404, { "content-type": "text/html", "cache-control": "no-store" });
        expect(assetMode("chip-Ccgx14rN.js", r, 70, 1234)).toBe("HTTP 404");
    });

    it("reports a short body by its sizes", () => {
        const r = res(200, { "content-type": "application/javascript" });
        expect(assetMode("nav-Baf9xD9D.js", r, 100, 1234)).toBe("size 100/1234");
    });

    it("passes the built file", () => {
        const r = res(200, { "content-type": "application/javascript" });
        expect(assetMode("nav-Baf9xD9D.js", r, 1234, 1234)).toBeNull();
    });
});

describe("summarize", () => {
    it("groups by mode and carries the edge cache state", () => {
        const line = summarize([
            { file: "checks-B6psvwuG.js", mode: "html-for-js", cache: "HIT age 657" },
            { file: "chip-Ccgx14rN.js", mode: "html-for-js", cache: "MISS" },
            { file: "a.js", mode: "HTTP 404", cache: "" },
        ]);
        expect(line).toBe("html-for-js 2 (checks-B6psvwuG.js HIT age 657, chip-Ccgx14rN.js MISS); HTTP 404 1 (a.js)");
    });
});

describe("headerProblems", () => {
    const index = res(200, { "cache-control": "no-cache, no-transform", "content-security-policy": CSP });
    const asset = res(200, { "cache-control": IMMUTABLE });
    const miss = res(404, { "cache-control": "no-store", "content-type": "text/html" });

    it("passes the fixed contract: immutable hit, 404 no-store miss", () => {
        expect(headerProblems({ index, asset, miss }, CSP)).toEqual([]);
    });

    it("fails today's miss: the SPA index with a 200 and immutable", () => {
        const today = res(200, { "cache-control": IMMUTABLE, "content-type": "text/html; charset=utf-8" });
        expect(headerProblems({ index, asset, miss: today }, CSP)).toEqual([
            "a miss under /assets/ answered 200, not 404",
            `a miss under /assets/ is cacheable (${IMMUTABLE})`,
        ]);
    });

    it("fails a 404 that kept the immutable rule", () => {
        const kept = res(404, { "cache-control": IMMUTABLE });
        expect(headerProblems({ index, asset, miss: kept }, CSP)).toEqual([`a miss under /assets/ is cacheable (${IMMUTABLE})`]);
    });

    it("passes a second request for the miss that the edge did not cache", () => {
        const again = res(404, { "cache-control": "no-store", "cf-cache-status": "MISS" });
        expect(headerProblems({ index, asset, miss, missAgain: again }, CSP)).toEqual([]);
        const dynamic = res(404, { "cache-control": "no-store", "cf-cache-status": "DYNAMIC" });
        expect(headerProblems({ index, asset, miss, missAgain: dynamic }, CSP)).toEqual([]);
    });

    it("fails a miss the edge answered from its cache the second time", () => {
        const hit = res(404, { "cache-control": "no-store", "cf-cache-status": "HIT", age: "3" });
        expect(headerProblems({ index, asset, miss, missAgain: hit }, CSP)).toEqual([
            "the edge cached a miss under /assets/ (cf-cache-status HIT on the second request): a zone Cache Rule overrides `no-store`",
        ]);
    });

    it("fails a hit that lost immutable", () => {
        const plain = res(200, { "cache-control": "public, max-age=0, must-revalidate" });
        expect(headerProblems({ index, asset: plain, miss }, CSP)).toEqual([
            "a hashed asset is not `immutable` (public, max-age=0, must-revalidate)",
        ]);
    });

    it("keeps the index checks", () => {
        const bare = res(200, { "content-security-policy": "default-src *" });
        expect(headerProblems({ index: bare, asset, miss }, CSP)).toEqual([
            "no `no-transform` on the index",
            "the index's CSP is not dist-demo/_headers'",
        ]);
    });
});

describe("deepLinkProblem", () => {
    const built = assetsIn(INDEX);

    it("passes the built index at a 200", () => {
        expect(deepLinkProblem(res(200, { "content-type": "text/html; charset=utf-8" }), INDEX, built)).toBeNull();
    });

    it("fails a 404 at a client route", () => {
        expect(deepLinkProblem(res(404, { "content-type": "text/html" }), INDEX, built)).toBe("a deep link answered 404 text/html");
    });

    it("fails an older index", () => {
        const older = INDEX.replace("index-Ab1.js", "index-Zz9.js");
        expect(deepLinkProblem(res(200, { "content-type": "text/html" }), older, built)).toBe("a deep link does not answer the built index");
    });
});
