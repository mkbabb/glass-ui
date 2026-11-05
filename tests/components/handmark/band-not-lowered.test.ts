// U/B8 N-1 (atlas REPORT-B7E §6, MO-05): the /demand highlighter painted black in Chromium and WebKit.
// HandMark's band is `--hm-band: light-dark(…)` in its SFC sheet, and the library build lowered it to
// lightningcss's polyfill, whose two variables nothing defines, so the band resolved to an invalid
// value and the fill fell to black. This runs every SFC sheet that uses `light-dark()` through
// lightningcss exactly as the build does (the build's targets and options) and refuses the polyfill.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { transform } from "lightningcss";
import { describe, expect, it } from "vitest";
import { glassCssTarget, glassLightningcss } from "../../../vite.targets";

const ROOT = resolve(__dirname, "../../../src/components");
function vueFiles(dir: string): string[] {
    return readdirSync(dir).flatMap((f) => {
        const p = join(dir, f);
        return statSync(p).isDirectory() ? vueFiles(p) : p.endsWith(".vue") ? [p] : [];
    });
}
/** `chrome120` → lightningcss's target encoding (major << 16 | minor << 8). */
function targets(list: string[]): Record<string, number> {
    const names: Record<string, string> = { chrome: "chrome", edge: "edge", firefox: "firefox", safari: "safari", ios: "ios_saf" };
    const out: Record<string, number> = {};
    for (const t of list) {
        const m = t.match(/^([a-z]+)(\d+)(?:\.(\d+))?$/)!;
        out[names[m[1]]] = (Number(m[2]) << 16) | (Number(m[3] ?? 0) << 8);
    }
    return out;
}
const styleBlocks = (sfc: string) => [...sfc.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]);

describe("the library build never lowers light-dark()", () => {
    const sheets = vueFiles(ROOT).flatMap((f) =>
        styleBlocks(readFileSync(f, "utf8"))
            .filter((css) => /(^|[^-\w])light-dark\(/.test(css.replace(/\/\*[\s\S]*?\*\//g, "")))
            .map((css) => ({ file: f.replace(`${ROOT}/`, ""), css })),
    );

    it("finds the HandMark band among the SFC sheets that use it", () => {
        expect(sheets.map((s) => s.file)).toContain("handmark/HandMark.vue");
    });

    it("emits light-dark() native, never the lightningcss polyfill, for every such sheet", () => {
        for (const { file, css } of sheets) {
            const out = transform({
                filename: file,
                code: Buffer.from(css),
                minify: true,
                targets: targets(glassCssTarget),
                ...glassLightningcss,
            }).code.toString();
            expect(out, file).not.toMatch(/--lightningcss-(light|dark)/);
            expect(out, file).toMatch(/light-dark\(/);
        }
    });
});
