// extra-plants.mjs · critique-B pass 7 · written AFTER the battery hash and after the hashed run; not part of the hash.
// The hashed DT-* plants published on chip's door, which is an ENTRY door (./chip): B11's no-outside-reader rule is
// LAW §5's rule for INTERNAL doors, so on an entry door every arm read only the pin line (SAME-AS-CTL) and the
// hashed DT-eyeglass SKIPPED (it looked for Tabs.vue; tabs has no Tabs.vue). These re-issue the plant on the internal
// door P6-R2 is about, the selection door (composables/motion/selection/index.ts, where eyeglass.ts lives after S71),
// with the same contrast control. Same contract as battery/plants.mjs.
const vt = 'import { it, expect } from "vitest";\n';
export function plants(ctx) {
    const { exists, read, rel } = ctx;
    const P = [];
    const D = "src/composables/motion/selection/index.ts", T = "src/components/tabs";
    if (!exists(D) || !exists(`${T}/index.ts`)) return [{ id: "XDT-*", item: "B-10", skip: "no selection door or tabs unit" }];
    const spec = (from) => rel(from, D).replace(/\/index\.ts$/, "").replace(/\.ts$/, "");
    const door = { [D]: `${read(D)}export { EYEGLASS_SPAN_MAX } from "./eyeglass";\n` };
    const use = (f) => `import { EYEGLASS_SPAN_MAX } from "${spec(f)}";\n`;
    const c = `${T}/zq7EyeUse.ts`;
    P.push({ id: "XDT-CTL-lib", item: "B-10 control (P6-R2)", expect: "*?", mark: "EYEGLASS_SPAN_MAX", what: "control: EYEGLASS_SPAN_MAX on the selection door, read by a library file in tabs",
        files: { ...door, [c]: `${use(c)}export const zq7EyeUse = (): number => EYEGLASS_SPAN_MAX * 2;\n` } });
    const t1 = `${T}/__tests__/zq7EyeReader.test.ts`;
    P.push({ id: "XDT-tabs-test", item: "B-10 (P6-R2)", expect: "*", contrast: "XDT-CTL-lib", mark: "EYEGLASS_SPAN_MAX", what: "EYEGLASS_SPAN_MAX on the selection door, its one outside reader a test in tabs' slot (the S67 shape)",
        files: { ...door, [t1]: `${vt}${use(t1)}it("reads", () => expect(EYEGLASS_SPAN_MAX).toBeGreaterThan(1));\n` } });
    const t2 = "src/components/slider/__tests__/zq7EyeSlider.test.ts";
    P.push({ id: "XDT-slider-test", item: "B-10 (P6-R2)", expect: "*", contrast: "XDT-CTL-lib", mark: "EYEGLASS_SPAN_MAX", what: "the same name, its one outside reader a test in slider's slot",
        files: { ...door, [t2]: `${vt}${use(t2)}it("reads", () => expect(EYEGLASS_SPAN_MAX).toBeGreaterThan(1));\n` } });
    P.push({ id: "XDT-noreader", item: "B-10 (B11)", expect: "*", contrast: "XDT-CTL-lib", mark: "EYEGLASS_SPAN_MAX", what: "the same name on the selection door with no outside reader",
        files: { ...door } });
    return P;
}
