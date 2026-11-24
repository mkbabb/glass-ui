#!/usr/bin/env bash
# run-all.sh: the fold's browser runs, one at a time, each through the guard.
set -u
cd "$(dirname "$0")/../.."
G=~/.claude/guard/guarded
$G --timeout 20 -- node tools/root/witness.mjs chromium tools/root/witness-chromium-11.1.2-cure.json cure; echo "witness chromium cure rc=$?"
$G --timeout 20 -- node tools/root/trace-frames.mjs tools/root/trace-cure-x4.json cure 8 4; echo "trace rc=$?"
$G --exclusive webkit --timeout 40 -- node tools/root/witness.mjs webkit tools/root/witness-webkit-11.1.2.json base,cure; echo "witness webkit rc=$?"
