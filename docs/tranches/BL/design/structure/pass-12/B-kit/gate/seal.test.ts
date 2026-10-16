// tests/gates/seal.test.ts — the D1-B seal (scripts/structure/seal/; the route's law is
// scripts/structure/seal/law.mjs). One verdict per clause, B0..B18, over the F-1 graph and the
// reviewed pin (scripts/structure/records/seal-pin.json). No off switch: the pin is always
// read, and a clause passes only with zero violations. The gate is read through the floor
// runtime's door, like every other reader of scripts/structure.
import { spawnSync } from "node:child_process";
import { appendFileSync, cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { seal } from "../../scripts/structure/index.mjs";

const ROOT = resolve(__dirname, "../..");
const CLI = "scripts/structure/seal/seal.mjs";
const run = (cli: string, ...args: string[]) => spawnSync(process.execPath, [cli, ...args], { encoding: "utf8" });

describe("seal (route D1-B)", () => {
    const verdict: { counts: Record<string, number>; V: Record<string, string[]> } = seal(ROOT);
    it("has one pin path: the CLI refuses a --pin, and a refusal is no verdict (exit 2)", () => {
        const r = run(resolve(ROOT, CLI), "--root", ROOT, "--pin", "elsewhere.json");
        expect(r.status).toBe(2);
        expect(r.stderr).toContain("unknown option --pin");
    });
    // P6-R3: 0 GREEN, 1 RED, 2 no verdict. A crash is never read as RED: an overlay that is not
    // JSON throws in the run, a record that cannot be written throws after it (2); a planted
    // door crossing is a verdict (1).
    it("exits 2 on a throw in the run or at record write, and 1 on a RED verdict", () => {
        const dir = mkdtempSync(join(tmpdir(), "seal-exit-"));
        try {
            const bad = join(dir, "bad.json");
            writeFileSync(bad, "{ not json");
            const crash = run(resolve(ROOT, CLI), "--root", ROOT, "--overlay", bad);
            expect(crash.status).toBe(2);
            expect(crash.stderr).toContain("seal: no verdict");
            const record = run(resolve(ROOT, CLI), "--root", ROOT, "--json", join(bad, "record.json"));
            expect(record.status).toBe(2);
            expect(record.stderr).toContain("seal: no verdict");
            const red = join(dir, "red.json");
            writeFileSync(red, JSON.stringify({ "demo/zqSealExit.ts": 'import "../src/components/dock/GlassDock.vue";\n' }));
            const verdict = run(resolve(ROOT, CLI), "--root", ROOT, "--overlay", red);
            expect(verdict.status, verdict.stdout.split("\n").filter((l) => l.startsWith("FAIL")).join("\n")).toBe(1);
            expect(verdict.stdout).toContain("FAIL B2 1");
        } finally {
            rmSync(dir, { recursive: true, force: true });
        }
    }, 120_000);
    // S-14 (pass 8): a throw while the gate's modules evaluate is no verdict too. The floor
    // runtime is copied under a root whose package.json does not parse (the floor reads it as it
    // loads), and under one where a floor module throws as it loads.
    it("exits 2 on a throw while the gate's modules evaluate", () => {
        const dir = mkdtempSync(join(tmpdir(), "seal-import-"));
        try {
            const pkg = join(dir, "pkg"), mod = join(dir, "mod");
            for (const r of [pkg, mod]) cpSync(join(ROOT, "scripts/structure"), join(r, "scripts/structure"), { recursive: true });
            writeFileSync(join(pkg, "package.json"), '{ "name": "@mkbabb/glass-ui", BROKEN\n');
            const pkgRun = run(join(pkg, CLI), "--root", ROOT);
            expect(pkgRun.status, pkgRun.stderr).toBe(2);
            expect(pkgRun.stderr).toContain("seal: no verdict");
            writeFileSync(join(mod, "package.json"), readFileSync(join(ROOT, "package.json")));
            appendFileSync(join(mod, "scripts/structure/lib/index.mjs"), '\nthrow new Error("zq: a floor module throws as it loads");\n');
            const modRun = run(join(mod, CLI), "--root", ROOT);
            expect(modRun.status, modRun.stderr).toBe(2);
            expect(modRun.stderr).toContain("zq: a floor module throws as it loads");
        } finally {
            rmSync(dir, { recursive: true, force: true });
        }
    }, 120_000);
    // P7-R1: B18 judges each declared-free entry's names and files arms. A leaf ./motion-core
    // publishes that loads keyframes.js is RED; the same leaf loading only vue is not.
    it("B18 reads a heavy peer behind ./motion-core, and only a heavy one", () => {
        const entry = "src/composables/motion/motion-core.ts";
        const plant = (leaf: string) => ({
            "src/composables/motion/core/zqPeerLeaf.ts": leaf,
            [entry]: `${readFileSync(resolve(ROOT, entry), "utf8")}export { zqPeerLeaf } from "./core/zqPeerLeaf";\n`,
        });
        const red = seal(ROOT, { overlay: plant('import { SmoothProgress } from "@mkbabb/keyframes.js";\nexport const zqPeerLeaf = () => SmoothProgress;\n') });
        expect(red.V.B18.some((l: string) => l.startsWith("./motion-core (declared free of @mkbabb/keyframes.js)")), red.V.B18.join("\n")).toBe(true);
        const green = seal(ROOT, { overlay: plant('import { ref } from "vue";\nexport const zqPeerLeaf = () => ref(0);\n') });
        expect(green.counts.B18, green.V.B18.join("\n")).toBe(0);
    }, 120_000);
    // P8-R3 as ruled (pass 10): a row of the declarations table that names a subpath with an empty
    // or whitespace-only Peer cell, or a peer with no subpath, is no verdict, never "no row".
    it("B18 throws on a declaration row with no peer, and on a peer with no subpath", () => {
        const table = "src/README.md";
        const text = readFileSync(resolve(ROOT, table), "utf8");
        const row = /^( *\S.*?@mkbabb\/glass-ui\/motion-core)( +)(\(none.*)$/m.exec(text);
        expect(row, "the ./motion-core row").not.toBeNull();
        const at = (to: string) => ({ [table]: text.replace(row![0], to) });
        expect(() => seal(ROOT, { overlay: at(row![1]) })).toThrow(/empty Peer cell/);
        expect(() => seal(ROOT, { overlay: at(`${row![1]}${row![2]}   `) })).toThrow(/empty Peer cell/);
        expect(() => seal(ROOT, { overlay: at(`${" ".repeat(row![1].length)}${row![2]}${row![3]}`) })).toThrow(/names a peer but no subpath/);
    }, 120_000);
    // P9-R1 (a, pass 10): B4 counts every value SCC at module grain, parent<->child included. The
    // dock reads its context sub-module through the context's door; a context file that
    // value-reads a dock-root file closes the cycle (RED), and the same read as a type loads
    // nothing (no count).
    it("B4 reads a parent<->child value cycle, and not a type-only reverse edge", () => {
        const plant = (line: string) => ({ "src/components/dock/context/zqUp.ts": `${line}\nexport const zqUp = 1;\n` });
        const red = seal(ROOT, { overlay: plant('import { HOVER_INTENT_MS } from "../constants";\nvoid HOVER_INTENT_MS;') });
        expect(red.V.B4.some((l: string) => l.startsWith("value SCC at module grain") && l.includes("src/components/dock/context")), red.V.B4.join("\n")).toBe(true);
        const green = seal(ROOT, { overlay: plant('import type { DOCK_SPRING } from "../constants";\nexport type ZqUp = typeof DOCK_SPRING;') });
        expect(green.counts.B4, green.V.B4.join("\n")).toBe(0);
    }, 120_000);
    it("judges all nineteen clauses", () => {
        expect(Object.keys(verdict.counts)).toEqual(Array.from({ length: 19 }, (_, i) => `B${i}`));
    });
    for (const clause of Object.keys(verdict.counts)) {
        it(clause, () => {
            expect(verdict.counts[clause], verdict.V[clause].slice(0, 12).join("\n")).toBe(0);
        });
    }
});
