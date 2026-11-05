import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

/* atlas U/B7 F6 (B7-G8): the aurora WebGL and WebGPU engines are separate dynamic
   imports. On 10.1.1 `runtime.ts` imported both setups statically, so `dist/aurora.js`
   (203 KB) carried every GLSL and WGSL program on any page that mounted an Aurora,
   including the "css" substrate that never arms a GPU. */

const runtime = readFileSync(
    resolve(process.cwd(), "src/components/aurora/composables/runtime.ts"),
    "utf8",
).replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");

describe("aurora engine split", () => {
    for (const setup of ["./glSetup", "./wgpuSetup"]) {
        it(`loads ${setup} only through import()`, () => {
            const staticValueImport = new RegExp(`^import\\s+(?!type\\b)[^;]*from\\s+"${setup}";`, "m");
            expect(runtime).not.toMatch(staticValueImport);
            expect(runtime).toContain(`import("${setup}")`);
        });
    }

    it("hands the loader to the substrate as prepare", () => {
        expect(runtime).toMatch(/^\s*prepare,$/m);
    });
});
