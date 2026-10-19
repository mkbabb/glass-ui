// crit-pipe-truncation.mjs · D3 pass-10 critic: prose-sweep.mjs run 6 times through spawnSync's pipe (the self-test's
// own shape); prints bytes read and whether the tally and verdict lines arrived. Run from harness/ with the sweep's args.
import { spawnSync } from "node:child_process";
const [,, ...args] = process.argv;
for (let i = 0; i < 6; i++) {
  const r = spawnSync(process.execPath, ["prose-sweep.mjs", ...args], { encoding: "utf8", maxBuffer: 64 << 20 });
  const out = r.stdout + r.stderr;
  console.log(i, "exit", r.status, "bytes", out.length, "tally", /ruled=369/.test(out), "last:", JSON.stringify(out.trim().split("\n").pop().slice(0,60)));
}
