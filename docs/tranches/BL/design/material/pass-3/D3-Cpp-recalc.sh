#!/bin/bash
# D3-Cpp-recalc.sh · D3 pass 3, C″ prototype: pass 2's recalc probe (../pass-2/D3-Cp-recalc.mjs, 300 forced recalcs
# per theme) on floor v2, the route unclaimed and the route claimed, in Chromium and Playwright WebKit, floor v2 run
# twice per engine (first and last) to show the noise band. Load is printed beside every run. D3-Cpp-proto.md §6.
#   D3_OUT=<out> bash D3-Cpp-recalc.sh      (needs $D3_OUT/builds/{fv2,cpp}/dist)
set -u
HERE=$(cd "$(dirname "$0")" && pwd)
R="$HERE/../pass-2/D3-Cp-recalc.mjs"
mkdir -p "$D3_OUT/recalc"
for e in chromium webkit; do
  for spec in "fv2" "cpp" "cpp claim=honest" "fv2"; do
    set -- $spec; b=$1; q=${2:-}
    t0=$(date +%T); l0=$(sysctl -n vm.loadavg)
    f="$D3_OUT/recalc/$e-$b-${q:-unclaimed}-$t0.json"
    node "$R" "$D3_OUT/builds/$b/dist" --engine "$e" --n 300 ${q:+--query "$q"} > "$f" 2>&1
    node -e '
      const fs = require("fs"); const s = fs.readFileSync(process.argv[1], "utf8");
      const rows = []; const re = /"theme":\s*"(\w+)"[\s\S]*?"mean":\s*([\d.]+)[\s\S]*?"elements":\s*(\d+)(?:,\s*"cdpRecalcMsPerStep":\s*([\d.]+))?/g;
      let m; while ((m = re.exec(s))) rows.push(`${m[1]} mean ${(+m[2]).toFixed(3)}${m[4] ? " cdp " + (+m[4]).toFixed(3) : ""} el ${m[3]}`);
      console.log(process.argv[2] + " · " + rows.join(" · "));' "$f" "$e $b ${q:-unclaimed} $t0 load [$l0]"
  done
done
