#!/usr/bin/env bash
# mk.sh <out> <cols> <scale> <engine> <tree> <lane:name> ...   (captures of the critic-4 reruns; tree is green or red)
cd "$(dirname "$0")/.."
out=$1; cols=$2; scale=$3; E=$4; T=$5; shift 5
args=()
for x in "$@"; do L=${x%%:*}; n=${x#*:}; args+=("$n=rerun/lane-L$L/out/png/$T-$E-$n.png"); done
python3 sheets/sheet.py "sheets/$out" "$cols" "$scale" "${args[@]}"
