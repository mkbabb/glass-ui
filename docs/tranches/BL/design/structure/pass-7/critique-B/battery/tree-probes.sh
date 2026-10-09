#!/usr/bin/env bash
# tree-probes.sh <tree> <scratch> · critique-B pass 7 · command-level probes. Written and hashed BEFORE reading
# pass-7/B-kit. Order: this pass's probes (seal exits, peer closure, the two-children SFC split), then pass 6's
# tree-probes.sh from its committed bytes as the regression (which itself runs pass 5's). The route's commands are
# passed in through the environment pass 6 named (SEAL, CASCADE_SNAP, CASCADE_VERIFY, LISTING, BUILD, FD4_REPORT).
set -u
T="$1"; S="$2"; mkdir -p "$S"
HERE="$(cd "$(dirname "$0")" && pwd)"
echo "== crash (S-14 / P6-R3)"; CRIT_TMP="$S" bash "$HERE/crash.sh" "$T"
echo "== peer closure (§P6-8.4)"; node "$HERE/peer-closure.mjs" --root "$T" --out "$S/peer.json"; echo "PEER rc=$?"
if [ "${SKIP_SFC2:-0}" != "1" ]; then echo "== SFC split into two children (FP6-4, S-10)"; bash "$HERE/sfc2.sh" "$T" "$S/sfc2"; fi
if [ "${SKIP_P6:-0}" != "1" ]; then echo "== pass 6 tree-probes (regression)"; CRIT_TMP="$S" bash "$HERE/../../../pass-6/critique-B/battery/tree-probes.sh" "$T" 2>&1 | sed 's/^TPROBE /TPROBE P6:/'; fi
