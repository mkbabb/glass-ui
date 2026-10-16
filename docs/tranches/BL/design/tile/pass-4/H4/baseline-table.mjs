#!/usr/bin/env node
// baseline-table.mjs · renders H4.md §3 from logs/base-*.log: per witness, HEAD and HEAD + floor v2, Chromium and
// Playwright WebKit, the gating tally and the 1-min load at the run's start. Chromium reads come from the battery log
// (run.mjs), WebKit reads from one log per witness; dist and attack-dist cells from their own logs.
//   node baseline-table.mjs [logs dir]
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2] ?? path.join(path.dirname(new URL(import.meta.url).pathname), "logs");
const rd = (f) => (fs.existsSync(path.join(dir, f)) ? fs.readFileSync(path.join(dir, f), "utf8") : null);
const IDS = ["T-1", "T-2", "T-3", "T-4", "T-5", "T-6", "T-7", "T-8", "W-A", "W-B", "W-C", "W-D", "W-E", "CANON", "FACT", "ATTACK", "CORNER", "REPORT"];
const short = (t) => t?.replace(/ gating cells pass/, "").replace(/, (\d+) unmeasured/, " (+$1 unmeasured)") ?? "—";
const fromBattery = (X, id) => {
  const t = rd(`base-${X}-battery-src-chromium.log`);
  const m = t?.match(new RegExp(`^${id.replace("-", "\\-")}\\s+chromium exit \\d+.*?· ${id} (?:PASS|FAIL) · (.+?) · \\d+ s, load at start ([\\d.]+)`, "m"));
  return m ? `${short(m[1].trim())} @${m[2]}` : "—";
};
const fromLog = (f, id) => {
  const t = rd(f);
  if (!t) return "—";
  const m = t.match(new RegExp(`^${id} (?:PASS|FAIL) · (.+)$`, "m"));
  const load = (t.match(/load \{ ([\d.]+)/) ?? [])[1] ?? "?";
  return m ? `${short(m[1].trim())} @${load}` : `no verdict (${(t.match(/^exit \d+/m) ?? ["?"])[0]})`;
};
console.log("| witness | build | HEAD · Chromium | HEAD · Playwright WebKit | HEAD + floor v2 · Chromium | HEAD + floor v2 · Playwright WebKit |");
console.log("|---|---|---|---|---|---|");
for (const id of IDS) {
  const atk = ["FACT", "ATTACK", "CORNER"].includes(id);
  const cells = ["head", "f2"].flatMap((X) => id === "T-8"
    ? [fromLog(`base-${X}-src-T-8-both.log`, "T-8"), "(same run)"]
    : [fromBattery(X, id), fromLog(`base-${X}-src-${id}-webkit.log`, id)]);
  console.log(`| ${id} | ${atk ? "attack src" : "src"} | ${cells.join(" | ")} |`);
}
const DIST = [["T-2", "dist", "t2-one-line-stadium"], ["T-5", "dist", "t5-one-of-n-keys"], ["W-E", "dist", "we-one-line"],
  ["FACT", "atkdist", "fact-split"], ["ATTACK", "atkdist", "attack"], ["CORNER", "atkdist", "corner-refusal"], ["ATTACK", "atkdev", "attack"]];
for (const [id, kind, file] of DIST) {
  const cells = ["head", "f2"].flatMap((X) => ["chromium", "webkit"].map((e) => fromLog(`base-${X}-${kind}-${file}-${e}.log`, id)));
  console.log(`| ${id} | ${{ dist: "dist", atkdist: "attack dist", atkdev: "attack src-dev" }[kind]} | ${cells.join(" | ")} |`);
}
console.log("\n`@` the 1-min load at the run's start.");
