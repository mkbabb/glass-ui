#!/usr/bin/env bash
# f7.sh <KIT> <replayed tree> <scratch> · critique-B pass 11 · written AFTER the battery hash, disclosed in
# critique-B.md §7. The hashed judges11.sh pre-classified a re-keyed base RERUN and the touched-spec pair's re-keyed base
# in the tally's --base slot as INFO (right-kind alternates) and read them rc=0 GREEN over 8 and 3 base-green keys.
# §P10-6.4 enumerates "a base rerun (raw and re-keyed)" as its own kind for every slot ("each wrong one exits 2") and asks
# F6 "through every wrong-kind --base … path, never 0". This probe makes the reading concrete with F6's failing route
# (one base-green key of the full route flipped to unexpected), and adds the controls:
#   F7-ctl            --base the full re-keyed base, --route the failing route                       expect 1 (RED)
#   F7-base-rerun-N   --base each committed re-keyed base rerun, --route the failing route           F6: never 0
#   F7-base-steps-N   --base each committed touched-spec pair's re-keyed base, --route failing route F6: never 0
#   F7-…-with-reruns  the same, with every committed rerun in its slot as the kit's bar passes them  F6: never 0
# Prints base-green counts, so the reading is visible: a partial base judges only its own keys.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; S="$3"; mkdir -p "$S/f7"; X="$(cd "$S/f7" && pwd)"
TALLY="$K/tools/browser-tally.mjs"; BR="$K/results/p11/browser"
echo "f7 start $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
node -e 'const fs=require("fs");const [b,r,o]=process.argv.slice(1);const B=JSON.parse(fs.readFileSync(b));const g=new Set(B.results.filter(x=>x.status==="expected").map(x=>x.spec+" :: "+x.title));
const R=JSON.parse(fs.readFileSync(r));const i=R.results.findIndex(x=>x.status==="expected"&&g.has(x.spec+" :: "+x.title));R.results[i].status="unexpected";fs.writeFileSync(o,JSON.stringify(R));console.log("flipped: "+R.results[i].spec+" :: "+R.results[i].title.slice(0,70));' "$BR/base-rekeyed.json" "$BR/route.json" "$X/route-fail.json"
RB=(); for f in $(ls "$BR/reruns" | sort); do case "$f" in base-*.rekeyed.json) RB+=(--base-rerun "$BR/reruns/$f");; route-*.json) RB+=(--route-rerun "$BR/reruns/$f");; esac; done
z=0
one() { local id="$1"; shift; node "$TALLY" "$@" > "$X/o.txt" 2>&1; local rc=$?; [ "$id" != F7-ctl ] && [ $rc = 0 ] && z=$((z+1))
  echo "$id rc=$rc :: $(grep -E '^verdict|no verdict' "$X/o.txt" | head -1 | cut -c1-200)"; }
one F7-ctl --base "$BR/base-rekeyed.json" --route "$X/route-fail.json"
one F7-ctl-with-reruns --base "$BR/base-rekeyed.json" --route "$X/route-fail.json" "${RB[@]}"
for f in $(ls "$BR/reruns" | grep -E '^base-.*\.rekeyed\.json$' | sort); do
  one "F7-base-rerun-$f" --base "$BR/reruns/$f" --route "$X/route-fail.json"
  one "F7-base-rerun-$f-with-reruns" --base "$BR/reruns/$f" --route "$X/route-fail.json" "${RB[@]}"; done
for d in $(ls -d "$BR"/p1*-steps | sort); do n=$(basename "$d")
  one "F7-base-steps-$n" --base "$d/base.rekeyed.json" --route "$X/route-fail.json"
  one "F7-base-steps-$n-with-reruns" --base "$d/base.rekeyed.json" --route "$X/route-fail.json" "${RB[@]}"; done
echo "F7 never-0 rows reading 0 (GREEN over the failing route): $z"
echo "f7 end $(date -u +%FT%TZ) load $(sysctl -n vm.loadavg)"
