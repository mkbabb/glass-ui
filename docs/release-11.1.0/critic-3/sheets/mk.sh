#!/usr/bin/env bash
# mk.sh <out> <cols> <scale> <engine> <lane:name> ...   (green captures of the critic-3 reruns)
cd "$(dirname "$0")/.."
out=$1; cols=$2; scale=$3; E=$4; shift 4
args=()
for x in "$@"; do L=${x%%:*}; n=${x#*:}; args+=("$n=rerun/lane-L$L/out/png/green-$E-$n.png"); done
python3 sheets/sheet.py "sheets/$out" "$cols" "$scale" "${args[@]}"
