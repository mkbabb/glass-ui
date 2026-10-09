#!/bin/zsh
# floor-v2/probes/bundle.sh · the bundle datum (R-9, PF-4) of one built worktree, by the ratchet's own measure.
#   zsh bundle.sh <worktree> <label>
# The worktree must have a fresh `dist/` (harness/libbuild.mjs). Prints, on one line:
#   unpacked   npm pack's unpackedSize: the UNPACKED CONTENT byte total G-BUNDLE-RATCHET measures
#              (scripts/verify-export-types.mjs:932-940), every packed file (dist, README, MIGRATION.md, …)
#   files      npm pack's entryCount
#   dist       the bytes and file count of dist/ alone (FLOOR v1's measure)
#   js-gz9     the sum of `gzip -9 -c` over every dist/**/*.js (FLOOR v1's measure)
# npm pack runs with --dry-run and --ignore-scripts: nothing is written, no lifecycle script runs.
set -e
wt=$1; label=$2
cd $wt
json=$(npm pack --dry-run --json --ignore-scripts --silent 2>/dev/null)
unpacked=$(print -r -- $json | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const m=JSON.parse(s)[0];console.log(m.unpackedSize+" "+m.entryCount)})')
distb=$(find dist -type f -print0 | xargs -0 stat -f %z | awk '{s+=$1} END {print s}')
distn=$(find dist -type f | wc -l | tr -d ' ')
jsgz=$(find dist -type f -name '*.js' -print0 | xargs -0 -n1 sh -c 'gzip -9 -c "$0" | wc -c' | awk '{s+=$1} END {print s}')
echo "$label · unpacked ${unpacked% *} B · files ${unpacked#* } · dist $distb B in $distn files · js-gz9 $jsgz B · ratchet datum $(cat .bundle-ratchet) · load $(sysctl -n vm.loadavg)"
