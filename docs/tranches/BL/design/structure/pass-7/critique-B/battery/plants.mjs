// plants.mjs · critique-B pass 7 · the REGISTRY §P6-8.4 plants. Written and hashed BEFORE reading pass-7/B-kit or
// pass-7/B-proto.md. Contract (run-plants.mjs): plants(ctx) -> [{ id, item, expect, mark|marks, contrast?, what, files }
// | { id, item, skip }]. expect: a clause id, "*" (any clause naming the mark), "*?" (record which clause, if any), or
// null (legal control). Every target is discovered on the tree under judgement; nothing is guessed from HEAD paths.
//
//   I7-*   (B-01, §P6-8.3 route · I7)  a CSS @import or <style src> that crosses a door into a module's private sheet.
//          Expected B3, as the pass-2 battery's I7 (pass-2/kit/B-crit/battery.mjs) expected.
//   KF-*   (§P6-8.4 peer class)        a keyframes-bearing name published on ./motion-core. No clause is assumed:
//          "*?" records which clause, if any, reads it. peer-closure.mjs reads the same class without the gate.
//   DT-*   (B-10 / P6-R2, B11)         a door name published for a test reader only. Contrast control DT-CTL-src
//          publishes the same kind of name with a library reader in another unit; the test-only plant is CAUGHT only
//          when a clause names it that does not name the control.
import { dirname, basename } from "node:path";

const noExt = (p) => p.replace(/\.(ts|mts|mjs|js|vue)$/, "");
const vt = 'import { it, expect } from "vitest";\n';

export function plants(ctx) {
    const { find, findAll, exists, read, rel, all } = ctx;
    const P = [];
    const add = (o) => P.push(o);
    const skip = (id, item, why) => P.push({ id, item, skip: why });
    const spec = (from, to) => { let r = noExt(rel(from, to)); if (r.endsWith("/index")) r = r.slice(0, -6) || "."; return r; };
    const cssRel = (from, to) => rel(from, to);
    // insert an @import after the last top-level @import, else after leading @charset/@layer statements, else at top
    const withImport = (text, line) => {
        const L = text.split("\n");
        let at = -1;
        L.forEach((l, i) => { if (/^@import\b/.test(l)) at = i; });
        if (at < 0) { at = -1; for (let i = 0; i < L.length; i++) { if (/^(@charset|@layer [^{]*;)/.test(L[i]) || /^\s*(\/\*.*\*\/)?\s*$/.test(L[i])) at = i; else break; } }
        L.splice(at + 1, 0, line);
        return L.join("\n");
    };

    // ============ 1 · I7: a CSS read that crosses a door into a module's private sheet (expect B3) ============
    const css = all.filter((p) => p.startsWith("src/") && p.endsWith(".css") && !p.includes("__tests__"));
    const unitSheets = (u) => css.filter((p) => p.includes(`/components/${u}/`) && basename(p) !== "index.css");
    const dockSheets = unitSheets("dock");
    const DS = dockSheets.find((p) => basename(p) === "core.css") ?? dockSheets.find((p) => basename(p) === "shape.css") ?? dockSheets[0];
    const SS = unitSheets("slider")[0] ?? unitSheets("timeline")[0];
    const KAGG = exists("src/styles/index.css") ? "src/styles/index.css" : css.find((p) => /^src\/styles\/[^/]+\.css$/.test(p) && /@import/.test(read(p)));
    const KLEAF = ["src/styles/view-transition.css", "src/styles/accessibility.css"].find(exists)
        ?? css.find((p) => /^src\/styles\/[^/]+\.css$/.test(p) && p !== KAGG && !/@import/.test(read(p)));
    const KGLASS = css.find((p) => p === "src/styles/glass/index.css") ?? css.find((p) => /^src\/styles\/glass\/[^/]+\.css$/.test(p));
    const CHIPS = unitSheets("chip")[0];
    if (!DS) skip("I7-*", "B-01", "no private dock sheet on the tree");
    else {
        const m = basename(DS);
        if (KAGG) add({ id: "I7-agg", item: "B-01 (I7)", expect: "B3", mark: m, what: `the style kernel aggregate ${KAGG} @imports dock's private ${DS}`,
            files: { [KAGG]: withImport(read(KAGG), `@import "${cssRel(KAGG, DS)}";`) } });
        if (KAGG) add({ id: "I7-agg-url", item: "B-01 (I7)", expect: "B3", mark: m, what: `the aggregate @imports url("…${m}")`,
            files: { [KAGG]: withImport(read(KAGG), `@import url("${cssRel(KAGG, DS)}");`) } });
        if (KAGG) add({ id: "I7-agg-layer", item: "B-01 (I7)", expect: "B3", mark: m, what: `the aggregate @imports …${m} layer(components)`,
            files: { [KAGG]: withImport(read(KAGG), `@import "${cssRel(KAGG, DS)}" layer(components);`) } });
        if (KGLASS) add({ id: "I7-glass", item: "B-01 (I7)", expect: "B3", mark: m, what: `the glass kernel sheet ${KGLASS} @imports …${m}`,
            files: { [KGLASS]: withImport(read(KGLASS), `@import "${cssRel(KGLASS, DS)}";`) } });
        if (CHIPS) add({ id: "I7-unit", item: "B-01 (I7)", expect: "B3", mark: m, what: `chip's sheet ${CHIPS} @imports dock's private …${m}`,
            files: { [CHIPS]: withImport(read(CHIPS), `@import "${cssRel(CHIPS, DS)}";`) } });
        // <style src> crossing: a second style block on chip's component reading dock's private sheet
        const CHIPV = (() => { try { return find("Chip.vue"); } catch { return null; } })();
        if (CHIPV) add({ id: "I7-stylesrc", item: "B-01 (I7)", expect: "B3", mark: m, what: `Chip.vue gains <style src> of dock's private …${m}`,
            files: { [CHIPV]: `${read(CHIPV)}\n<style src="${cssRel(CHIPV, DS)}"></style>\n` } });
        // legal control: a dock sheet reads another dock sheet inside its own unit
        const own = dockSheets.filter((p) => p !== DS && !read(p).includes(basename(DS)));
        const A = own.find((p) => !/@import/.test(read(p))) ?? own[0];
        if (A) add({ id: "I7-CTL-own", item: "B-01 control", expect: null, mark: m, what: `legal: dock's ${A} @imports dock's own …${m}`,
            files: { [A]: withImport(read(A), `@import "${cssRel(A, DS)}";`) } });
    }
    if (SS && KLEAF) add({ id: "I7-leaf", item: "B-01 (I7b)", expect: "B3", mark: basename(SS), what: `kernel leaf ${KLEAF} @imports ${SS}`,
        files: { [KLEAF]: withImport(read(KLEAF), `@import "${cssRel(KLEAF, SS)}";`) } });
    else skip("I7-leaf", "B-01", `kernel leaf ${KLEAF} or private unit sheet ${SS} missing`);

    // ============ 2 · KF: a keyframes-bearing name published on ./motion-core ============
    const KF_IMPORT = /^\s*import\s+(?!type\b)[^;]*from\s*["']@mkbabb\/keyframes\.js["']/m;
    let MC = null;
    try { const raf = find("useRAFLoop.ts"); const d = `${dirname(raf)}/index.ts`; if (exists(d) && /useRAFLoop/.test(read(d))) MC = d; } catch { /* none */ }
    if (!MC) skip("KF-*", "peer class", "no motion-core door found beside useRAFLoop.ts");
    else {
        const MCD = dirname(MC);
        add({ id: "KF-new", item: "peer class (§P6-8.4)", expect: "*?", mark: "zq7KfLeak", what: `a new leaf importing @mkbabb/keyframes.js, exported on the motion-core door ${MC}`,
            files: { [`${MCD}/zq7KfLeak.ts`]: 'import * as zq7Kf from "@mkbabb/keyframes.js";\nexport const zq7KfLeak = (): unknown => zq7Kf;\n',
                [MC]: `${read(MC)}export * from "./zq7KfLeak";\n` } });
        const raf = find("useRAFLoop.ts");
        add({ id: "KF-leaf", item: "peer class (§P6-8.4)", expect: "*?", marks: ["useRAFLoop", "zq7KfLeaf"], what: `an existing motion-core leaf ${raf} gains a value import of @mkbabb/keyframes.js (no new name)`,
            files: { [raf]: `import * as zq7KfLeaf from "@mkbabb/keyframes.js";\nvoid zq7KfLeaf;\n${read(raf)}` } });
        add({ id: "KF-deep", item: "peer class (§P6-8.4)", expect: "*?", marks: ["zq7KfDeep", "useRAFLoop"], what: "a motion-core leaf imports a new sibling that imports @mkbabb/keyframes.js (transitive)",
            files: { [`${MCD}/zq7KfDeep.ts`]: 'import * as zq7KfD from "@mkbabb/keyframes.js";\nexport const zq7KfDeep = (): unknown => zq7KfD;\n',
                [raf]: `import { zq7KfDeep } from "./zq7KfDeep";\nvoid zq7KfDeep;\n${read(raf)}` } });
        // an existing keyframes-bearing hook re-exported on the motion-core door
        const bearing = all.filter((p) => p.startsWith("src/") && /\/useSpring\.ts$/.test(p) && !p.includes("__tests__"))
            .find((p) => KF_IMPORT.test(read(p)));
        if (bearing) add({ id: "KF-existing", item: "peer class (§P6-8.4)", expect: "*?", mark: "useSpring", what: `the motion-core door re-exports the keyframes-bearing useSpring (${bearing})`,
            files: { [MC]: `${read(MC)}export { useSpring } from "${spec(MC, bearing)}";\n` } });
        else skip("KF-existing", "peer class", "no keyframes-bearing useSpring.ts found");
    }

    // ============ 3 · DT: a door name published for a test reader only (P6-R2, B11) ============
    let CHIP = null, SLIDER = null;
    try { CHIP = dirname(find("Chip.vue")); SLIDER = dirname(find("Slider.vue")); } catch { /* none */ }
    const CD = CHIP && exists(`${CHIP}/index.ts`) ? `${CHIP}/index.ts` : null;
    if (!CD || !SLIDER) skip("DT-*", "B-10", "no chip door or slider unit");
    else {
        const priv = { [`${CHIP}/zq7TestOnly.ts`]: "export const zq7TestOnly = 7;\n", [CD]: `${read(CD)}export { zq7TestOnly } from "./zq7TestOnly";\n` };
        const useIn = (f) => `import { zq7TestOnly } from "${spec(f, CD)}";\n`;
        const ctlF = `${SLIDER}/zq7TestOnlyUse.ts`;
        add({ id: "DT-CTL-src", item: "B-10 control (P6-R2)", expect: "*?", mark: "zq7TestOnly", what: "control: the same new chip door name read by a library file in slider",
            files: { ...priv, [ctlF]: `${useIn(ctlF)}export const zq7TestOnlyUse = (): number => zq7TestOnly + 1;\n` } });
        const t1 = `${SLIDER}/__tests__/zq7TestOnlyReader.test.ts`;
        add({ id: "DT-xunit-test", item: "B-10 (P6-R2)", expect: "*", contrast: "DT-CTL-src", mark: "zq7TestOnly", what: "a chip door name whose one reader is a test in slider's slot",
            files: { ...priv, [t1]: `${vt}${useIn(t1)}it("reads", () => expect(zq7TestOnly).toBe(7));\n` } });
        const t2 = `${CHIP}/__tests__/zq7TestOnlyOwn.test.ts`;
        add({ id: "DT-own-test", item: "B-10 (P6-R2)", expect: "*", contrast: "DT-CTL-src", mark: "zq7TestOnly", what: "a chip door name whose one reader is chip's own colocated test, through the door",
            files: { ...priv, [t2]: `${vt}${useIn(t2)}it("reads", () => expect(zq7TestOnly).toBe(7));\n` } });
        const tdirs = all.filter((p) => p.startsWith("tests/") && /\.test\.ts$/.test(p)).map(dirname);
        const td = tdirs.sort((a, b) => tdirs.filter((x) => x === b).length - tdirs.filter((x) => x === a).length)[0] ?? "tests";
        const t3 = `${td}/zq7TestOnlyHarness.test.ts`;
        add({ id: "DT-harness-test", item: "B-10 (P6-R2)", expect: "*", contrast: "DT-CTL-src", mark: "zq7TestOnly", what: "a chip door name whose one reader is a harness test through the public subpath",
            files: { ...priv, [t3]: `${vt}import { zq7TestOnly } from "@mkbabb/glass-ui/chip";\nit("reads", () => expect(zq7TestOnly).toBe(7));\n` } });
        add({ id: "DT-noreader", item: "B-10 (B11)", expect: "*", contrast: "DT-CTL-src", mark: "zq7TestOnly", what: "a chip door name with no reader at all",
            files: { ...priv } });
        // the P6-R2 shape itself: one eyeglass name back on the morph door, read by a test in the tabs unit
        let morphDoor = null; try { const em = find("useElementMorph.ts"); if (exists(`${dirname(em)}/index.ts`)) morphDoor = `${dirname(em)}/index.ts`; } catch { /* none */ }
        const eyeSrc = all.filter((p) => p.startsWith("src/") && /\.ts$/.test(p) && !p.includes("__tests__")).find((p) => /export\s+const\s+EYEGLASS_SPAN_MAX\b/.test(read(p)));
        const TABS = (() => { try { return dirname(find("Tabs.vue")); } catch { return null; } })();
        if (morphDoor && eyeSrc && TABS && !/EYEGLASS_SPAN_MAX/.test(read(morphDoor))) {
            const t4 = `${TABS}/__tests__/zq7EyeReader.test.ts`;
            add({ id: "DT-eyeglass", item: "B-10 (P6-R2 regression)", expect: "*", contrast: "DT-CTL-src", mark: "EYEGLASS_SPAN_MAX", what: `EYEGLASS_SPAN_MAX re-published on ${morphDoor} for a tabs test`,
                files: { [morphDoor]: `${read(morphDoor)}export { EYEGLASS_SPAN_MAX } from "${spec(morphDoor, eyeSrc)}";\n`,
                    [t4]: `${vt}import { EYEGLASS_SPAN_MAX } from "${spec(t4, morphDoor)}";\nit("reads", () => expect(EYEGLASS_SPAN_MAX).toBeGreaterThan(0));\n` } });
        } else skip("DT-eyeglass", "B-10", `morph door ${morphDoor}, eyeglass source ${eyeSrc}, tabs ${TABS}, or the name already on the door`);
    }
    return P;
}
