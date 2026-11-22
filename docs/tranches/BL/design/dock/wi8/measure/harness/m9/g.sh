#!/usr/bin/env bash
# g.sh <engine> <minutes> <cmd...>: one browser run of part H under the guard, from the harness directory. chromium: a
# heavy browser run; webkit: `--exclusive webkit` (WebKit 2287, one run machine-wide); gpu: `--cpu-cores 0` (the
# frame-cost cell's GPU lane); node: a run without a browser that is still heavy (a build, a unit run).
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; G=~/.claude/guard/guarded
E="$1"; M="$2"; shift 2
case "$E" in
  webkit) F=(--exclusive webkit);; gpu) F=(--cpu-cores 0);; *) F=();;
esac
cd "$H" && exec "$G" ${F[@]+"${F[@]}"} --timeout "$M" -- sh -c "$*"
