#!/usr/bin/env bash
# mk5.sh <out> <cols> <scale> <dir> <prefix> <name> ...   one sheet from <dir>/<prefix><name>.png
cd "$(dirname "$0")/.."
out=$1; cols=$2; scale=$3; dir=$4; pre=$5; shift 5
args=(); for n in "$@"; do args+=("$n=$dir/$pre$n.png"); done
python3 sheets/sheet.py "sheets/$out" "$cols" "$scale" "${args[@]}"
