// critique-B seat 2 · kit adapter, written AFTER the battery hash (see ../../BATTERY-HASH.txt).
// It maps the battery's two calls onto the replayed tree's own landed tools. It changes no plant and no expectation.
//   gate(tree): node <tree>/scripts/structure/seal/seal.mjs --root <tree> --json <tmp>  (B-kit LAW, "The gate")
//   move(tree, from, to): node <tree>/scripts/structure/move.mjs <list> --root <tree> --dry  (the floor F-2 CLI;
//     --dry because FD-2 refuses at preflight, before anything is written)
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

export async function gate(tree) {
  const out = join(mkdtempSync(join(tmpdir(), "seal-")), "seal.json");
  const r = spawnSync("node", [join(tree, "scripts/structure/seal/seal.mjs"), "--root", tree, "--json", out], { encoding: "utf8", maxBuffer: 1 << 28 });
  let V = {};
  try { V = JSON.parse(readFileSync(out, "utf8")).V; } catch { V = { CRASH: [String(r.stderr).slice(-600)] }; }
  const lines = [];
  for (const [clause, list] of Object.entries(V)) for (const text of list) lines.push({ clause, text: String(text) });
  return { exit: r.status, lines };
}

export async function move(tree, from, to) {
  const list = join(mkdtempSync(join(tmpdir(), "mv-")), "list.json");
  writeFileSync(list, JSON.stringify({ moves: [{ from, to }] }));
  const r = spawnSync("node", [join(tree, "scripts/structure/move.mjs"), list, "--root", tree, "--dry"], { encoding: "utf8", maxBuffer: 1 << 28 });
  return { exit: r.status, out: `${r.stdout}\n${r.stderr}` };
}
