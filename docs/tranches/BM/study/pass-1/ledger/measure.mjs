// BM pass 1: gzipped bytes of each candidate removal (and the analogues of the additions).
// CSS: rules cut from the 11.1.0 dist that the sites load (hassio-config's installed copy, the
// published tarball). JS: each module group bundled alone from glass-ui master src with rolldown,
// minified, every import outside the group external. Standalone gzip -9: it overstates the saving
// inside a larger gzip stream a little, so every figure is an upper bound on the entry delta.
// Usage (from the glass-ui checkout): node <this> > ledger.json
import { readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { rolldown } from "rolldown";

const DIST = "/Users/mkbabb/Programming/hassio-config/frontend/node_modules/@mkbabb/glass-ui/dist";
const SRC = "/Users/mkbabb/Programming/glass-ui/src";
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;

// Split minified CSS into blocks: [{prelude, body, children}] with balanced braces.
function blocks(css) {
  const out = []; let i = 0;
  while (i < css.length) {
    const open = css.indexOf("{", i); if (open < 0) break;
    const prelude = css.slice(i, open).trim(); let depth = 1, j = open + 1;
    while (j < css.length && depth) { if (css[j] === "{") depth++; else if (css[j] === "}") depth--; j++; }
    const body = css.slice(open + 1, j - 1);
    const nested = /^@(layer|media|supports|container)/.test(prelude) || (!prelude.startsWith("@") && /\{/.test(body) && /[&@]/.test(body));
    out.push({ prelude, body, children: /^@(layer|media|supports|container)/.test(prelude) ? blocks(body) : null });
    i = j;
  }
  return out;
}
function pick(css, test) {
  const walk = (bs) => bs.map((b) => {
    if (b.children) { const inner = walk(b.children); return inner ? `${b.prelude}{${inner}}` : ""; }
    return test(b.prelude, b.body) ? `${b.prelude}{${b.body}}` : "";
  }).join("");
  return walk(blocks(css));
}
const css = (f) => readFileSync(path.join(DIST, f), "utf8");
const CSS = [
  ["specular catch-light (track file + material rules)", () => css("styles/glass-specular-track.css") + pick(css("styles/glass/material.css"), (p, b) => /specular/.test(p + b))],
  ["grasp register (grasp.css)", () => css("styles/glass/grasp.css")],
  ["focus veil (focus-veil.css)", () => css("styles/glass/focus-veil.css")],
  ["slider loupe rules", () => pick(css("components/slider/styles.css"), (p) => /loupe/.test(p))],
  ["capsule's own blur inside the track", () => ".glass-capsule{-webkit-backdrop-filter:var(--glass-blur-floating);backdrop-filter:var(--glass-blur-floating)}"],
  ["menu clip-path strip (grow/recede keyframes + rules)", () => pick(css("styles/animations.css"), (p) => /glass-menu-(grow|recede)/.test(p)) + pick(css("styles/glass/reveal.css"), (p, b) => /glass-menu-(grow|recede)/.test(b))],
  ["run mark rules (run.css)", () => pick(css("components/dock/styles/run.css"), (p) => /dock-run-mark/.test(p))],
  ["scroll-chrome (whole file, for scale)", () => css("styles/scroll-chrome.css")],
];

const GROUPS = [
  ["luminance clamp (composable + sampler + math)", ["composables/glass/useGlassBackdropLuminance.ts", "composables/glass/backdropLuminanceSample.ts", "composables/glass/backdropSampleMath.ts"]],
  ["luminance static walk (sampler alone)", ["composables/glass/backdropLuminanceSample.ts"]],
  ["useLiquidReveal", ["composables/motion/reveal/useLiquidReveal.ts"]],
  ["useDockCtaReceive", ["composables/motion/morph/useDockCtaReceive.ts"]],
  ["useDragVelocity", ["composables/dom/useDragVelocity.ts"]],
  ["useDockRunMark (the run mark's writer)", ["components/dock/composables/useDockRunMark.ts"]],
  ["useSelectionIndicator (the strip indicator's writer)", ["composables/motion/morph/useSelectionIndicator.ts"]],
  ["useSpringMount", ["composables/motion/spring/useSpringMount.ts"]],
  ["useDragMorph (the follow and snap)", ["composables/motion/morph/useDragMorph.ts"]],
];
async function bundle(files) {
  const own = new Set(files.map((f) => path.join(SRC, f)));
  const entry = path.join(SRC, files[0]);
  const virt = "\0bm-entry";
  const b = await rolldown({
    input: virt, logLevel: "silent",
    plugins: [{ name: "v", resolveId: (id) => (id === virt ? id : null), load: (id) => (id === virt ? files.map((f) => `export * from ${JSON.stringify(path.join(SRC, f))};`).join("\n") : null) }],
    external: (id, importer) => {
      if (id === virt || own.has(id)) return false;
      if (!id.startsWith(".")) return !own.has(id);
      const abs = path.resolve(path.dirname(importer || entry), id);
      return ![abs, abs + ".ts", path.join(abs, "index.ts")].some((p) => own.has(p));
    },
  });
  const { output } = await b.generate({ format: "es", minify: true });
  await b.close();
  return output.filter((o) => o.type === "chunk").map((o) => o.code).join("\n");
}

const rows = [];
for (const [name, get] of CSS) { const s = get(); rows.push({ kind: "css", name, raw: s.length, gz: gz(s) }); }
for (const [name, files] of GROUPS) { const s = await bundle(files); rows.push({ kind: "js", name, files, raw: s.length, gz: gz(s) }); }
console.log(JSON.stringify({ at: new Date().toISOString(), dist: "11.1.0 (hassio-config/frontend node_modules)", src: "glass-ui master", rows }, null, 1));
