#!/usr/bin/env bash
# tree-probes.sh <tree> <scratch> · critique-B pass 8 · command-level probes. Written and hashed BEFORE reading
# pass-8/B-kit. Order: this pass's crash8.sh (every gate phase exits 2), peer-unbuilt.sh (the probe on an unbuilt tree),
# then pass 7's tree-probes.sh from its committed bytes as the regression (crash.sh, peer-closure.mjs, sfc2.sh, and
# pass 6's tree-probes.sh, which runs pass 5's). The route's commands come in through the environment pass 6/7 named
# (SEAL, SEAL_REL, CASCADE_SNAP, CASCADE_VERIFY, LISTING, BUILD, CASCADE_REL, PEER_CMD, KIT).
set -u
T="$1"; S="$2"; mkdir -p "$S"
HERE="$(cd "$(dirname "$0")" && pwd)"
echo "== crash8 (S-14 / P6-R3 / P7-G1: every phase)"; CRIT_TMP="$S" bash "$HERE/crash8.sh" "$T"
echo "== peer probe on an unbuilt tree (P7-G4)"; CRIT_TMP="$S" bash "$HERE/peer-unbuilt.sh" "$T"
if [ "${SKIP_P7:-0}" != "1" ]; then echo "== pass 7 tree-probes (regression)"; CRIT_TMP="$S" bash "$HERE/../../../pass-7/critique-B/battery/tree-probes.sh" "$T" "$S/p7" 2>&1 | sed 's/^/P7:/'; fi
