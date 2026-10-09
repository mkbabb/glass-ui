#!/usr/bin/env node
// plants-p7.mjs — pass 7's plant battery (§P6-8.4), run against the migrated tree through the
// landed gate's overlay, the peer-closure probe's overlay and the gate's CLI. Nothing is written
// to the tree. A gate plant passes when exactly the clauses it names go red (a legal plant names
// none); a probe plant when the probe's verdict is the one named; a CLI plant when the exit is.
//   node tools/plants-p7.mjs <migrated tree> <out.json>
// Plants:
//   I7*   a CSS crossing into a module's private sheet, in every form B3 reads: the ./styles
//         aggregate's `@import` after its first real import (I7, as the pass-2 critic re-planted
//         it), at its end, in `url()` form with a layer; the glass kernel door's `@import`
//         (I7c); a unit SFC's `<style src>` and its inline `@import` (I7s, I7i) — B3 (and B8 or
//         B10 where the crossing is also a kernel reading a unit or a second reader); the
//         pass-2 battery's own I7 row, whose import lands inside a comment — none (a comment
//         loads nothing); the aggregate importing a unit's door — none
//   KF*   a keyframes-bearing name published on ./motion-core (useSpring; springProjection, the
//         pass-6 S64 shape) — the probe reads RED; no gate clause owns the class (the probe
//         does); a keyframes-free name added there — the probe reads GREEN
//   TD    a src door name published for a test reader only (the selection door carries
//         EYEGLASS_SPAN_MAX for a colocated tabs test, pass 6's S67 shape) — B11's no-outside-reader
//         line (P6-R2) and the pin row; the same name with a library reader — the pin row only
//   EXIT  the gate's CLI: the clean tree exits 0, a RED overlay 1, an overlay that is not JSON
//         and a refused option 2 (P6-R3)
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const [rootArg, out] = process.argv.slice(2);
const root = resolve(rootArg);
const KIT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SEAL = join(root, "scripts/structure/seal/seal.mjs");
const { seal } = await import(pathToFileURL(SEAL).href);
const read = (p) => readFileSync(join(root, p), "utf8");

const styles = read("src/styles/index.css");
const firstReal = (() => { const m = /^@import[^\n]*\n/m.exec(styles); if (!m) throw new Error("no real @import in src/styles/index.css"); return m.index + m[0].length; })();
const firstAny = (() => { const m = /(@import[^\n]*\n)/.exec(styles); return m.index + m[0].length; })();
const button = read("src/components/button/Button.vue");
const selDoor = read("src/composables/motion/selection/index.ts");
const motionCore = read("src/composables/motion/motion-core.ts");
const PRIVATE = "../components/dock/styles/core.css";

const gatePlants = [
    { id: "I7 ./styles imports a private dock sheet after its first real import", files: { "src/styles/index.css": `${styles.slice(0, firstReal)}@import "${PRIVATE}";\n${styles.slice(firstReal)}` }, expect: ["B3"] },
    { id: "I7e ./styles imports a private dock sheet at its end", files: { "src/styles/index.css": `${styles}@import "${PRIVATE}";\n` }, expect: ["B3"] },
    { id: "I7u ./styles imports it in url() form with a layer", files: { "src/styles/index.css": `${styles}@import url("${PRIVATE}") layer(components);\n` }, expect: ["B3"] },
    { id: "I7c the glass kernel door imports a private dock sheet", files: { "src/styles/glass/index.css": `${read("src/styles/glass/index.css")}@import "../../components/dock/styles/core.css";\n` }, expect: ["B3", "B8", "B10"] },
    { id: "I7s a unit SFC's <style src> reads another unit's private sheet", files: { "src/components/button/Button.vue": `${button}\n<style src="../dock/styles/core.css"></style>\n` }, expect: ["B3", "B10"] },
    { id: "I7i a unit SFC's inline @import reads another unit's private sheet", files: { "src/components/button/Button.vue": `${button}\n<style>\n@import "../dock/styles/core.css";\n</style>\n` }, expect: ["B3", "B10"] },
    { id: "I7-pass2 the pass-2 row's plant: the @import lands inside the header comment", files: { "src/styles/index.css": `${styles.slice(0, firstAny)}@import "${PRIVATE}";\n${styles.slice(firstAny)}` }, expect: [] },
    { id: "I7L ./styles imports the dock's door", files: { "src/styles/index.css": `${styles}@import "../components/dock/index.css";\n` }, expect: [] },
    {
        id: "TD the selection door publishes EYEGLASS_SPAN_MAX for a colocated tabs test (the pass-6 S67 shape)",
        files: {
            "src/composables/motion/selection/index.ts": `${selDoor}export { EYEGLASS_SPAN_MAX } from "./eyeglass";\n`,
            "src/components/tabs/segmented-tabs/__tests__/zq-door-for-test.test.ts": `import { it, expect } from "vitest";\nimport SegmentedTabs from "../SegmentedTabs.vue";\nimport { EYEGLASS_SPAN_MAX } from "../../../../composables/motion/selection";\nit("reads", () => { expect(SegmentedTabs).toBeTruthy(); expect(EYEGLASS_SPAN_MAX).toBe(1.6); });\n`,
        },
        expect: ["B11"],
        lines: (V) => V.B11.filter((l) => l.includes("EYEGLASS_SPAN_MAX")),
        expectLines: ["src/composables/motion/selection/index.ts exports EYEGLASS_SPAN_MAX (no reader outside src/composables/motion/selection)", "src/composables/motion/selection/index.ts +EYEGLASS_SPAN_MAX (not in the pin)"],
    },
    {
        id: "TDL the same name with a library reader: only the pin's reviewed diff",
        files: {
            "src/composables/motion/selection/index.ts": `${selDoor}export { EYEGLASS_SPAN_MAX } from "./eyeglass";\n`,
            "src/components/carousel/zq-reader.ts": `import { EYEGLASS_SPAN_MAX } from "../../composables/motion/selection";\nexport const zqRead = EYEGLASS_SPAN_MAX;\n`,
        },
        expect: ["B11"],
        lines: (V) => V.B11.filter((l) => l.includes("EYEGLASS_SPAN_MAX")),
        expectLines: ["src/composables/motion/selection/index.ts +EYEGLASS_SPAN_MAX (not in the pin)"],
    },
];

const results = [];
const clean = seal(root, {});
const cleanCounts = clean.counts;
for (const p of gatePlants) {
    let r, error = null;
    try { r = seal(root, { overlay: p.files }); } catch (e) { error = e.message; }
    const red = r ? Object.keys(r.counts).filter((k) => r.counts[k] > (cleanCounts[k] ?? 0)) : [];
    let ok = !error && red.length === p.expect.length && p.expect.every((k) => red.includes(k));
    let lines;
    if (ok && p.lines) { lines = p.lines(r.V); ok = lines.length === p.expectLines.length && p.expectLines.every((l) => lines.includes(l)); }
    results.push({ kind: "gate", id: p.id, expect: p.expect, red, ok, ...(lines ? { lines } : {}), ...(error ? { error } : {}), b3: r ? r.V.B3 : null });
    console.log(`${ok ? "PASS" : "FAIL"} ${p.id}: expect [${p.expect.join(",")}] red [${red.join(",")}]${error ? ` error ${error}` : ""}`);
}

// the probe's plants: an overlay on ./motion-core's entry source
const PROBE = join(KIT, "tools/peer-closure.mjs");
const BASE = join(KIT, "results/p7/peer-closure-base.json");
const tmp = mkdtempSync(join(tmpdir(), "p7-plants-"));
try {
    const probePlants = [
        { id: "KF ./motion-core publishes useSpring (keyframes-bearing)", files: { "src/composables/motion/motion-core.ts": `${motionCore}export { useSpring } from "./spring";\n` }, expect: "RED" },
        { id: "KF6 ./motion-core publishes springProjection (the pass-6 S64 shape)", files: { "src/composables/motion/motion-core.ts": `${motionCore}export { springProjection } from "./spring";\n` }, expect: "RED" },
        { id: "KFL ./motion-core publishes a keyframes-free name (springPreset)", files: { "src/composables/motion/motion-core.ts": `${motionCore}export { springPreset } from "./spring/springPresets";\n` }, expect: "GREEN" },
    ];
    for (const p of probePlants) {
        const ov = join(tmp, "overlay.json");
        writeFileSync(ov, JSON.stringify(p.files));
        const run = spawnSync(process.execPath, [PROBE, "--root", root, "--base", BASE, "--overlay", ov], { encoding: "utf8", maxBuffer: 1 << 26 });
        const verdict = /peer-closure: (GREEN|RED)/.exec(run.stdout)?.[1] ?? `exit ${run.status}`;
        const ok = verdict === p.expect && run.status === (p.expect === "GREEN" ? 0 : 1);
        const broken = run.stdout.split("\n").filter((l) => l.startsWith("BROKEN"));
        results.push({ kind: "probe", id: p.id, expect: p.expect, verdict, exit: run.status, ok, broken });
        console.log(`${ok ? "PASS" : "FAIL"} ${p.id}: expect ${p.expect} read ${verdict} (exit ${run.status})${broken.length ? ` · ${broken.join(" · ").slice(0, 220)}` : ""}`);
    }
    // the gate's own exit (P6-R3): 0 GREEN, 1 RED, 2 no verdict
    const bad = join(tmp, "bad.json"), red = join(tmp, "red.json");
    writeFileSync(bad, "{ not json");
    writeFileSync(red, JSON.stringify({ "demo/zqSealExit.ts": 'import "../src/components/dock/GlassDock.vue";\n' }));
    const cli = [
        { id: "EXIT the clean tree", args: [], expect: 0 },
        { id: "EXIT a RED overlay (a demo import of a private file)", args: ["--overlay", red], expect: 1 },
        { id: "EXIT an overlay that is not JSON (a crash)", args: ["--overlay", bad], expect: 2 },
        { id: "EXIT a refused option (--pin)", args: ["--pin", "x.json"], expect: 2 },
    ];
    for (const c of cli) {
        const run = spawnSync(process.execPath, [SEAL, "--root", root, ...c.args], { encoding: "utf8", maxBuffer: 1 << 26 });
        const ok = run.status === c.expect;
        results.push({ kind: "cli", id: c.id, expect: c.expect, exit: run.status, ok, stderr: run.stderr.split("\n")[0] });
        console.log(`${ok ? "PASS" : "FAIL"} ${c.id}: expect exit ${c.expect} read ${run.status}${run.stderr ? ` · ${run.stderr.split("\n")[0].slice(0, 120)}` : ""}`);
    }
} finally { rmSync(tmp, { recursive: true, force: true }); }

const summary = { clean: cleanCounts, plants: results.length, passed: results.filter((r) => r.ok).length, results };
writeFileSync(out, `${JSON.stringify(summary, null, 1)}\n`);
console.log(`battery ${summary.passed}/${summary.plants}`);
process.exitCode = summary.passed === summary.plants ? 0 : 1;
