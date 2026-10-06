#!/usr/bin/env node
// type-homes.mjs — DERIVE step B-S4f (LAW §8, clause B4): two type cycles between sibling
// modules inside aurora, cured by moving each declaration to the module that owns its meaning.
//   1. runtime/frame <-> runtime/webgl: the uniform table (UNIFORM_NAMES, UniformName,
//      UniformLocations) is the contract of the bridge that uploads by name, so it moves from
//      webgl/glSetup.ts to frame/uniformBridge.ts (B's pass-2 authored cure); glSetup reads it.
//   2. config <-> runtime: ImageInputSource and UploadableImageSource describe what a consumer
//      hands the config (AuroraImageSource is their public alias), so they move from
//      runtime/frame/textureUpload.ts to config/presets.ts; the runtime reads them from config.
// Exact-text row (lib/row.mjs), computed from the tree, frozen and recorded. Run before the
// door step, while the importers still name the files directly.
//   node derive/type-homes.mjs --root <wt> --out frozen/S4f-type-homes.json
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const A = "src/components/aurora";
const files = {};
const get = (f) => (files[f] ??= readFileSync(join(root, f), "utf8"));
function cut(f, from, to) {
    const t = get(f); const i = t.indexOf(from); if (i < 0) throw new Error(`${f}: start not found: ${from.slice(0, 50)}`);
    const j = t.indexOf(to, i); if (j < 0) throw new Error(`${f}: end not found: ${to.slice(0, 50)}`);
    const block = t.slice(i, j + to.length); files[f] = t.slice(0, i) + t.slice(j + to.length); return block;
}
function sub(f, from, to) { const t = get(f); if (t.split(from).length !== 2) throw new Error(`${f}: expected one ${from.slice(0, 60)}`); files[f] = t.replace(from, () => to); }

// 1. the uniform table
const GL = `${A}/runtime/webgl/glSetup.ts`, UB = `${A}/runtime/frame/uniformBridge.ts`, FL = `${A}/runtime/frame/frameLoop.ts`;
const table = cut(GL, "export const UNIFORM_NAMES = [", "export type UniformLocations = Record<UniformName, WebGLUniformLocation | null>;\n\n");
sub(GL, ` * \`UNIFORM_NAMES\` location cache against the fresh \`gl\`.\n *\n * The \`UNIFORM_NAMES\` const-assertion is the single source of truth for the\n * shader-uniform boundary: a NEW uniform name must be added here, and the cache is\n * keyed off it, so a fresh uniform always gets a location slot.`,
    ` * \`UNIFORM_NAMES\` location cache against the fresh \`gl\`.\n *\n * The \`UNIFORM_NAMES\` const-assertion (frame/uniformBridge.ts, beside the bridge that\n * uploads by name) is the single source of truth for the shader-uniform boundary: a NEW\n * uniform name is added there, and the cache is keyed off it, so a fresh uniform always\n * gets a location slot.`);
sub(GL, `import { createUniformBridge } from "../frame/uniformBridge";\n`, `import { createUniformBridge, UNIFORM_NAMES, type UniformLocations } from "../frame/uniformBridge";\n`);
sub(UB, `import type { UniformLocations } from "../webgl/glSetup";\n`, "");
sub(UB, `    type WarpMode,\n} from "../../config/presets";\n`, `    type WarpMode,\n} from "../../config/presets";\n\n/** The shader-uniform boundary: every name the aurora programs declare, one location slot each. */\n${table.trimEnd()}\n`);
sub(FL, `import type { UniformLocations } from "../webgl/glSetup";\n`, `import type { UniformLocations } from "./uniformBridge";\n`);
sub("tests/components/custom/aurora/uniform-packing.test.ts", `import type { UniformLocations } from "@glass/components/aurora/runtime/webgl/glSetup";`, `import type { UniformLocations } from "@glass/components/aurora/runtime/frame/uniformBridge";`);

// 2. the image input types
const TU = `${A}/runtime/frame/textureUpload.ts`, PR = `${A}/config/presets.ts`;
const uploadable = cut(TU, "/**\n * An already-uploadable image source", "    | ImageData;\n\n");
const input = cut(TU, "/**\n * Anything a consumer may hand the axis", "export type ImageInputSource = UploadableImageSource | Blob | string;\n\n");
sub(TU, "/** The shared decode options — the ONE normalised `createImageBitmap` flag set. */", `import type { ImageInputSource, UploadableImageSource } from "../../config/presets";\n\n/** The shared decode options — the ONE normalised \`createImageBitmap\` flag set. */`);
sub(PR, `import type { ImageInputSource } from "../runtime/frame/textureUpload";\n`, `${uploadable}${input.trimEnd()}\n`);
sub(PR, "export type { ImageInputSource };\n", "");
sub(`${A}/runtime/frame/auroraImageSource.ts`, `    uploadImageTextureWebGL2,\n    type UploadableImageSource,\n} from "./textureUpload";\n`, `    uploadImageTextureWebGL2,\n} from "./textureUpload";\nimport type { UploadableImageSource } from "../../config/presets";\n`);
sub(`${A}/runtime/webgpu/wgpuSetup.ts`, `    uploadImageTextureWebGPU,\n    type UploadableImageSource,\n} from "../frame/textureUpload";\n`, `    uploadImageTextureWebGPU,\n} from "../frame/textureUpload";\nimport type { UploadableImageSource } from "../../config/presets";\n`);

const row = makeRow(root, "B-S4f type homes: two aurora sibling type cycles (LAW §8, B4)", files);
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify(applyRow(root, row)));
recordStep(root, { id: "S4f", kind: "row", file, why: "B4: the uniform table moves to the bridge that uploads by name (frame), the image input types to the config that names them; the runtime reads both" });
