#!/usr/bin/env node
// plants.mjs · H9 · the planted libraries every build-level witness pair names, written once (P-3). Until H8 each seat's
// driver carried its own copy of these mutations (pass-8 `run-b8.sh`, the pass-9 critic's `run-crit9.sh`), and its
// restore check (`git diff HEAD`) could not see the patches' new untracked files (`shape.ts`, `_shared/guard.ts`): a
// plant in `shape.ts` printed the clean hash while planted (`D′c9` §1.4). Here a plant is applied to a worktree with a
// restore copy of every file it touches, and the restore is CHECKED: the worktree's `git diff HEAD --binary`, its
// `git status --porcelain --untracked-files=all`, and the sha1 of every untracked file under `src` are read before
// the plant and after the restore, and any difference is exit 2 with the paths. Every apply and restore prints them.
//   node plants.mjs <worktree> apply <name>     plant (refuses a worktree that already holds a plant)
//   node plants.mjs <worktree> restore          write the copies back and check the worktree against its pre-plant state
//   node plants.mjs <worktree> state            print the state line (diff hash, status hash, new files' hashes)
//   node plants.mjs list
// The plants (each a real write a later wave might make, or a deletion of the cure under test):
//   foreign    `.card > .toggle-group { --selection-tile: flush }` in base.css, `@layer components` (B-1, `D′c6` §4.1)
//   var        the same rule written `var(--card-tile, flush)` (L-1, `crit-var-writer`)
//   esc        the same rule with the name CSS-escaped, `--selection\-tile` (L-1b, the pass-9 critic)
//   apply      `.card > .toggle-group { @apply [--selection-tile:flush]; }` in base.css, unlayered (L-1b)
//   static     `style="--selection-tile: plated"` on ToggleGroup.vue's root (L-1, `crit-static-style`)
//   ts         `setProperty("--selection-tile", on ? "flush" : "none")` in a shape.ts helper (L-1, `crit-ts-ternary`)
//   const      the name held in a shape.ts constant and written through it (L-1a, `crit-const-name`)
//   concat     REACHED: a shape.ts helper builds the name (`"--selection-" + "tile"`) and writes `flush`, and
//              ToggleGroup.vue calls it on every group whose parent is a `.card` (the composition FACT's
//              `foreign-ancestor` cells read). No static reader resolves the name; paint is its backstop (H9 (3))
//   unpinned   the pin's `--selection-paint: inherit !important` line deleted (L-3: FACT `paint-item-write` FAILs)
//   weight-step  `font-weight: 600` restored on `.toggle-group__item[data-state="on"]` (O-103e: the L-5 cure deleted;
//              T-4's L-5 falsifier FAILs)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { HARNESS } from "./lib.mjs";

const BS = "src/styles/utilities/base.css", TGV = "src/components/toggle-group/ToggleGroup.vue";
const SHP = "src/components/toggle-group/shape.ts", SH = "src/components/toggle-group/styles.css";
const SHAPE_END = "export type ToggleGroupShape = (typeof TOGGLE_GROUP_SHAPES)[number];";
const append = (text) => (t) => t + text;
const sub = (o, n) => (t) => { if (t.split(o).length !== 2) throw new Error(`anchor not unique (${t.split(o).length - 1}×): ${o.slice(0, 80)}`); return t.replace(o, n); };
const CARD = (decl) => `\n@layer components {\n    .card > .toggle-group {\n        ${decl};\n    }\n}\n`;
export const PLANTS = {
  foreign: { [BS]: append(CARD("--selection-tile: flush")) },
  var: { [BS]: append(CARD("--selection-tile: var(--card-tile, flush)")) },
  esc: { [BS]: append(CARD("--selection\\-tile: flush")) },
  apply: { [BS]: append("\n.card > .toggle-group {\n    @apply [--selection-tile:flush];\n}\n") },
  static: { [TGV]: sub('        :data-size="props.size"', '        :data-size="props.size"\n        style="--selection-tile: plated"') },
  ts: { [SHP]: sub(SHAPE_END, `${SHAPE_END}\nexport const writeTile = (el: HTMLElement, on: boolean) => el.style.setProperty("--selection-tile", on ? "flush" : "none");`) },
  const: { [SHP]: sub(SHAPE_END, `${SHAPE_END}\nexport const TILE_FACT = "--selection-tile";\nexport const writeTile = (el: HTMLElement) => el.style.setProperty(TILE_FACT, "flush");`) },
  concat: {
    [SHP]: sub(SHAPE_END, `${SHAPE_END}\n/** a helper a later wave might add, the name built from parts */\nexport const writeTile = (el: HTMLElement) => el.style.setProperty("--selection-" + "tile", "flush");`),
    [TGV]: (t) => sub('import { TOGGLE_GROUP_SHAPES, type ToggleGroupShape } from "./shape";', 'import { TOGGLE_GROUP_SHAPES, type ToggleGroupShape, writeTile } from "./shape";')(t)
      .replace(/\n<\/script>/, () => '\nwatchEffect(() => {\n    const el = containerRef.value;\n    if (el?.parentElement?.classList.contains("card")) writeTile(el);\n});\n</script>'),
  },
  unpinned: { [SH]: sub("            --selection-paint: inherit !important;\n", "") },
  "weight-step": { [SH]: sub('        --selection-ink: var(--selection-edge);\n    }', '        --selection-ink: var(--selection-edge);\n        font-weight: 600;\n    }') },
};

const RESTORE = ".h9-plant-restore";
const sha1 = (b) => createHash("sha1").update(b).digest("hex");
/** the worktree as git sees it, plus every untracked file under src by content (the patches' new files among them) */
export function state(wt) {
  const git = (args) => execFileSync("git", ["-C", wt, ...args], { encoding: "buffer", maxBuffer: 512 << 20 });
  const status = git(["status", "--porcelain", "--untracked-files=all"]).toString().split("\n").filter((l) => l && !l.includes(RESTORE) && !l.includes(".vite-cache/") && !l.includes(".glass-generation")).join("\n");
  const untracked = git(["ls-files", "--others", "--exclude-standard", "--", "src"]).toString().split("\n").filter(Boolean).sort();
  return { diff: sha1(git(["diff", "HEAD", "--binary"])).slice(0, 12), status: sha1(status).slice(0, 12), statusText: status, files: Object.fromEntries(untracked.map((r) => [r, sha1(fs.readFileSync(path.join(wt, r))).slice(0, 8)])) };
}
export const stateLine = (s) => `git diff HEAD ${s.diff} · status ${s.status} · new files ${Object.entries(s.files).map(([f, h]) => `${path.basename(f)} ${h}`).join(", ") || "(none)"}`;

export function apply(wt, name) {
  const plant = PLANTS[name];
  if (!plant) throw new Error(`no plant ${name}: one of ${Object.keys(PLANTS).join(", ")}`);
  const rd = path.join(wt, RESTORE);
  if (fs.existsSync(rd)) throw new Error(`${wt} already holds a plant (${RESTORE} exists): restore it first`);
  const before = state(wt);
  const next = Object.fromEntries(Object.entries(plant).map(([rel, fn]) => [rel, fn(fs.readFileSync(path.join(wt, rel), "utf8"))])); // every anchor checked before anything is written
  fs.mkdirSync(rd);
  const man = {};
  Object.keys(plant).forEach((rel, k) => { fs.copyFileSync(path.join(wt, rel), path.join(rd, `f${k}`)); man[rel] = `f${k}`; });
  fs.writeFileSync(path.join(rd, "manifest.json"), JSON.stringify({ name, before, files: man }, null, 1));
  for (const [rel, text] of Object.entries(next)) fs.writeFileSync(path.join(wt, rel), text);
  return { before, after: state(wt), files: Object.keys(plant) };
}
export function restore(wt) {
  const rd = path.join(wt, RESTORE), mf = path.join(rd, "manifest.json");
  if (!fs.existsSync(mf)) throw new Error(`${wt} holds no plant to restore`);
  const man = JSON.parse(fs.readFileSync(mf, "utf8"));
  for (const [rel, copy] of Object.entries(man.files)) fs.copyFileSync(path.join(rd, copy), path.join(wt, rel));
  fs.rmSync(rd, { recursive: true, force: true });
  const after = state(wt), b = man.before;
  const bad = [];
  if (after.diff !== b.diff) bad.push(`git diff HEAD ${b.diff} → ${after.diff}`);
  if (after.status !== b.status) bad.push(`status ${b.status} → ${after.status}`);
  for (const f of new Set([...Object.keys(b.files), ...Object.keys(after.files)])) if (b.files[f] !== after.files[f]) bad.push(`${f} ${b.files[f] ?? "(absent)"} → ${after.files[f] ?? "(absent)"}`);
  return { name: man.name, before: b, after, bad };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [wtArg, verb, name] = process.argv.slice(2);
  try {
    if (wtArg === "list") { for (const k of Object.keys(PLANTS)) console.log(k); process.exit(0); }
    const wt = path.resolve(wtArg ?? "");
    if (!fs.existsSync(path.join(wt, "src"))) throw new Error(`${wt} is no worktree with src`);
    if (verb === "apply") {
      const r = apply(wt, name);
      console.log(`PLANT ${name} applied (${r.files.join(", ")}) · before ${stateLine(r.before)} · planted ${stateLine(r.after)} · harness ${HARNESS.rev} ${HARNESS.hash}`);
    } else if (verb === "restore") {
      const r = restore(wt);
      console.log(`PLANT ${r.name} restored · before ${stateLine(r.before)} · after ${stateLine(r.after)} · ${r.bad.length ? `MISMATCH: ${r.bad.join("; ")}` : "equal"} · harness ${HARNESS.rev} ${HARNESS.hash}`);
      process.exit(r.bad.length ? 2 : 0);
    } else if (verb === "state") console.log(`STATE ${stateLine(state(wt))} · harness ${HARNESS.rev} ${HARNESS.hash}`);
    else throw new Error("usage: plants.mjs <worktree> apply <name> | restore | state; plants.mjs list");
  } catch (e) { console.error(`PLANT HARNESS ERROR ${e.message ?? e}`); process.exit(2); }
}
