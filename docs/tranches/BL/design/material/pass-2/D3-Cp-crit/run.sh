#!/bin/sh
# D3 pass 2 · C′ critic: the critic's own probes, run after the route's full battery (claimed) has captured.
# Every probe is Chromium-gated; WebKit rows are Playwright WebKit (information). Load is printed beside each step.
#   D3_OUT=<scratch>/out sh run.sh <route-specimen-dist> <head-specimen-dist> <route-demo> <head-demo>
set -u
DIST="$1"; HEAD="$2"; RDEMO="$3"; HDEMO="$4"
P=$(cd "$(dirname "$0")" && pwd); H="$P/../../harness"; C="$D3_OUT/caps"
ld() { echo "   load $(sysctl -n vm.loadavg) · $(date +%T)"; }
cap() { name="$1"; shift; rm -rf "$C/cr-$name"; node "$H/capture.mjs" "$DIST" --out "$C/cr-$name" --quiet "$@"; }
wit() { echo "== $1 · $2 · $3"; node "$H/$2.mjs" "$C/cr-$1" --cells "$3" ${4:-} | tail -${5:-1}; ld; }

# 1 · the second on-glass register (item 7: capsule / feedback-tone scope kinds) on thinned content plates.
#     claimed against unclaimed: the delta is C′'s.
for q in "claim=honest" ""; do n=strong-${q:-unclaimed}; n=$(echo $n | tr '=' '-')
  if [ -n "$q" ]; then cap $n --engines chromium,webkit --grounds aurora,aurora50,black,stripes,paper --scenes ladder --inject "$P/strongink.css" --query $q
  else cap $n --engines chromium,webkit --grounds aurora,aurora50,black,stripes,paper --scenes ladder --inject "$P/strongink.css"; fi
  wit $n m2-text-contrast "^chromium (light|dark) "
  wit $n m2-text-contrast "^webkit (light|dark) " "--gate webkit"
done

# 2 · library paint (`--secondary`) inside a page claim
cap interposed --engines chromium --grounds paper --scenes ladder,dialog --inject "$P/interposed.css" --query claim=honest
wit interposed m2-text-contrast "^chromium (light|dark) paper ladder"

# 3 · a colour retune of --foreground (stale reach); M-4 reads |ΔL|
cap fgretune --engines chromium --grounds paper,aurora,black --scenes ladder --inject "$P/fgretune.css" --query claim=honest
wit fgretune m4-dock-register "^chromium (light|dark) " "--verbose" 40
wit fgretune m2-text-contrast "^chromium (light|dark) "

# 4 · PF-11: the static publication against 90 s of the moving field (M-2m with --motion-ms 90000)
# 90 s exhausted the 4 GB heap (screencast frames retained); 60 s with a larger heap is what ran
name=drift; rm -rf "$C/cr-drift"; node --max-old-space-size=24000 "$H/capture.mjs" "$DIST" --out "$C/cr-drift" --quiet --engines chromium --grounds aurora --scenes ladder --motion --motion-ms 60000 --query claim=honest
wit drift m2-motion "^chromium " "" 12

# 5 · Q-7 (b): is a dead field arm loud? as built, publication reset, and the "css" arm (software raster)
for th in light dark; do
  node "$P/silence.mjs" "$DIST" --theme $th
  node "$P/silence.mjs" "$DIST" --theme $th --inject "$P/nopub.css"
done
node "$P/silence.mjs" "$DIST" --theme light --software
ld

# 6 · the owner glance (H-13), as defined and over the claimed c1 content
G="$D3_OUT/glance"; mkdir -p "$G"
node "$H/glance.mjs" --base "$HEAD" --route "$DIST" --out "$G" --name cpc --story-base "$HDEMO" --story-route "$RDEMO" --require-delta | tail -12; ld
node "$H/glance.mjs" --base "$HEAD" --route "$DIST" --out "$G" --name cpc-claimed --ground aurora --ids wash,quiet,resting --route-query claim=honest --require-delta | tail -12; ld
