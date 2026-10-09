#!/usr/bin/env node
// norm.mjs <verify:package stdout> — the evidence JSON (the output's last line) with what a
// run cannot hold still normalized: the temporary pack/consumer directories and npm's
// install timing. Two runs of the same package on the same tree then print the same bytes.
import { readFileSync } from "node:fs";

const j = JSON.parse(readFileSync(process.argv[2], "utf8").trim().split("\n").pop());
const s = JSON.stringify(j, (k, v) =>
    typeof v === "string"
        ? v.replace(/\/[^"\s]*glass-ui-(pack|consumer)-[A-Za-z0-9]+/g, "<tmp-$1>").replace(/added \d+ packages in [\d.]+m?s/g, "added N packages in T")
        : v,
);
const o = JSON.parse(s);
if (o.install) o.install.install.stdout = o.install.install.stdout.replace(/in [\d.]+m?s/, "in T");
console.log(JSON.stringify(o, null, 1));
