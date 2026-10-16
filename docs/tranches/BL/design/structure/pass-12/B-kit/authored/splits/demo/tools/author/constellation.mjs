#!/usr/bin/env node
// author/constellation.mjs — AUTHOR-SIDE (B-S11, zone demo): split
// demo/stories/substrates/constellation.vue (514 lines). The three `drawOverlay` painters
// (the static focal, the warp focal, the pinned anomaly) move to `constellation/overlays.ts`
// as painter builders that take their colour as a getter, so each still reads the token's
// live value on every frame. Their bodies move verbatim except for that one read. The story
// keeps the tokens, the refs, the pi-lane seams and the template.
//
//   node author/constellation.mjs --root <tree>
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { importsFor, open, rebuild } from "./lib.mjs";

const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const REL = "demo/stories/substrates/constellation.vue";
const src = open(root, REL);
const { L, at, range } = src;

const ARROW = "    () => (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => {";
// [const, the token ref it reads, builder, builder doc]
const PAINTERS = [
    ["drawFocal", "primary", "focalPainter", "node[0]'s pulse ring, steady halo and core dot: the static-focal skin."],
    ["drawWarpFocal", "accent", "warpFocalPainter", "The focal mark at the engine's spring-eased warp position (`field.warp`)."],
    ["drawPinnedAnomaly", "accent", "pinnedAnomalyPainter", "The anomaly recipe pinned to the engine-held node: rings, halo, core and a dashed callout."],
].map(([name, ref, builder, doc]) => {
    const a = at(`const ${name} = computed(`);
    if (L[a] !== ARROW) throw new Error(`${name}: no painter arrow`);
    let b = a + 2;
    while (!(L[b - 1] === "    }," && L[b] === ");")) if (++b > L.length) throw new Error(`${name}: no close`);
    return { name, ref, builder, doc, a, b: b + 1, body: range(a + 2, b - 1) };
});

const out = ["// The story's drawOverlay painters. Each builder takes its colour as a getter, so a", "// painter reads the token's live value on every frame (a dark flip re-resolves it)."];
const defs = ["", "type Painter = (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => void;"];
for (const p of PAINTERS) {
    const body = p.body.map((r) => r.split(`${p.ref}.value`).join("color()"));
    if (body.join("\n").includes(".value")) throw new Error(`${p.name}: a second reactive read`);
    defs.push("", `/** ${p.doc} */`, `export function ${p.builder}(color: () => string): Painter {`, "    return (ctx, field, now) => {", ...body, "    };", "}");
}
const DIR = "demo/stories/substrates/constellation";
mkdirSync(join(root, DIR), { recursive: true });
writeFileSync(join(root, DIR, "overlays.ts"), [...out, ...importsFor(src, defs.join("\n"), DIR), ...defs, ""].join("\n"));

const put = {};
for (const p of PAINTERS) put[p.a] = [`const ${p.name} = computed(() => ${p.builder}(() => ${p.ref}.value));`];
writeFileSync(
    join(root, REL),
    rebuild(src, {
        cuts: PAINTERS.map((p) => [p.a, p.b]),
        put,
        addImports: ['import { focalPainter, pinnedAnomalyPainter, warpFocalPainter } from "./constellation/overlays";'],
        moved: PAINTERS.map((p) => p.body.join("\n")).join("\n"),
    }),
);
console.log("constellation split");
