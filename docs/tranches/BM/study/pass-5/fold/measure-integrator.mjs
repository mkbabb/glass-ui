// BM pass 5, fold of pass 4's critique A4-6: the gzipped bytes of wi8's fold integrator, which the capsule window
// would replace. wi8's `useDockBody.ts` (bl/dock/wi8) is read from git, never checked out; it is bundled alone with
// rolldown, minified, every import outside it external, and gzip -9'd standalone (pass 1's method, measure.mjs), so
// each figure is an upper bound on the saving inside a site's bundle. Two cuts:
//   whole     the composable entire (the carrier, the content window, the seats' exchange and fit, the integrator)
//   plate     the part the window replaces: `write()`'s plate inset and radius writes and the regions' clip-path
//             writes (`clipTo`, the lane boundaries), with `currentRadius`; cut by line range and minified alone.
// Run from the glass-ui checkout: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-5/fold/measure-integrator.mjs
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync, mkdirSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { rolldown } from "rolldown";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO = "/Users/mkbabb/Programming/glass-ui";
const REF = "bl/dock/wi8";
const FILE = "src/components/dock/composables/useDockBody.ts";
const src = execFileSync("git", ["-C", REPO, "show", `${REF}:${FILE}`], { encoding: "utf8" });
const sha = execFileSync("git", ["-C", REPO, "rev-parse", "--short", REF], { encoding: "utf8" }).trim();
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;
const tmp = mkdtempSync(path.join(HERE, ".tmp-"));
async function min(code, name) {
  const dir = path.join(tmp, name); mkdirSync(dir, { recursive: true });
  const p = path.join(dir, "entry.ts"); writeFileSync(p, code);
  const b = await rolldown({ input: p, external: (id) => id !== p, logLevel: "silent" });
  const { output } = await b.generate({ format: "esm", minify: true });
  await b.close();
  return output[0].code;
}
try {
  const lines = src.split("\n");
  const find = (re, from = 0) => lines.findIndex((l, i) => i >= from && re.test(l));
  const wStart = find(/^    function write\(\): void \{/);
  const wEnd = find(/^    function rest\(\): void \{/, wStart);
  const rStart = find(/^    function currentRadius\(/);
  const rEnd = find(/^    function start\(/, rStart);
  const plate = [...lines.slice(rStart, rEnd), ...lines.slice(wStart, wEnd)].join("\n");
  // Stand-alone shell so the cut parses: its free names become parameters of one exported function.
  const shell = `export function cut(o:any,root:any,painted:any,layout:any,u:any,e:any,eq:any,lastPosture:any,postureTravel:any,regions:any,flip:any,clamp01:any,writeExpandT:any,DOCK_SPRING:any){\n${plate}\nreturn [write,currentRadius];}`;
  const whole = await min(src, "whole");
  const cutMin = await min(shell, "plate");
  const out = {
    at: new Date().toISOString(), ref: `${REF}@${sha}`, file: FILE, lines: lines.length,
    whole: { minified: whole.length, gz: gz(whole) },
    plate: { lines: `${rStart + 1}-${rEnd} and ${wStart + 1}-${wEnd}`, minified: cutMin.length, gz: gz(cutMin) },
  };
  writeFileSync(path.join(HERE, "measure-integrator.json"), JSON.stringify(out, null, 1));
  console.log(JSON.stringify(out));
} finally { rmSync(tmp, { recursive: true, force: true }); }
