#!/usr/bin/env bash
# xnew.sh <KIT (worktree copy)> <scratch> · critique-B pass 12 · written AFTER the battery hash, disclosed in
# critique-B.md §7. The hashed X-NEW row renamed the route's FIRST spec, which holds no base-green key (its results are
# base-red), so it judged nothing. This re-plants it on a spec that holds base-green keys: the full route with every
# result of F6's spec (expandable-container.visual.ts, 8 results) moved under a path no base report holds. Expect RED
# (the spec's base-green keys absent; the renamed spec has no base origin and is judged for nothing): never 0.
# Also X-SKIP-CTL: the full base with F6's spec all "skipped" against the PASSING route, to show the reading is the
# base-green set shrinking (424 keys), not a coverage pass.
set -u
K="$(cd "$1" && pwd)"; mkdir -p "$2/xnew"; X="$(cd "$2/xnew" && pwd)"; BR="$K/results/p12/browser"; TALLY="$K/tools/browser-tally.mjs"
RB=(); for f in $(ls "$BR/reruns" | sort); do case "$f" in base-*.rekeyed.json) RB+=(--base-rerun "$BR/reruns/$f");; route-*.json) RB+=(--route-rerun "$BR/reruns/$f");; esac; done
echo "xnew start $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
node -e 'const fs=require("fs");const [br,x]=process.argv.slice(1);const R=JSON.parse(fs.readFileSync(br+"/route.json"));const s="src/components/expandable-container/__tests__/expandable-container.visual.ts";let n=0;for(const r of R.results)if(r.spec===s){r.spec=s.replace(/\.visual\.ts$/,"-renamed.visual.ts");n++}fs.writeFileSync(x+"/x-new2.json",JSON.stringify(R));console.log("renamed "+n+" results of "+s);
const B=JSON.parse(fs.readFileSync(br+"/base-rekeyed.json"));for(const r of B.results)if(r.spec===s)r.status="skipped";fs.writeFileSync(x+"/x-skip.json",JSON.stringify(B));' "$BR" "$X"
node "$TALLY" --base "$BR/base-rekeyed.json" --route "$X/x-new2.json" "${RB[@]}" > "$X/o1.txt" 2>&1; rc=$?
echo "X-NEW2 rc=$rc expect never-0 $([ $rc != 0 ] && echo PASS || echo FAIL) :: $(grep -E '^verdict|no verdict' "$X/o1.txt" | head -1 | cut -c1-200)"; grep -E '^extent' "$X/o1.txt" | cut -c1-260
node "$TALLY" --base "$X/x-skip.json" --route "$BR/route.json" "${RB[@]}" > "$X/o2.txt" 2>&1; rc=$?
echo "X-SKIP-CTL rc=$rc INFO :: $(grep -E '^verdict|no verdict' "$X/o2.txt" | head -1 | cut -c1-200)"
echo "xnew end $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
