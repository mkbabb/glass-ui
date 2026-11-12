#!/bin/zsh
# 10.1.5 fix 13, T1: c13b's collapse start at 332 (WebKit 2287, coarse) per src variant. Each variant is a
# patch under fix-13/variants/<name>.patch applied to the working src for its run and reverted after;
# `tip` runs the working src as is. Rows bank to fix-13/t1-<variant>-webkit.json.
#   ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- zsh docs/release-10.1.5/scripts/t1-fix-13.sh tip v1 ...
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-13; mkdir -p $L
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5363}
for v in $@; do
  p=$L/variants/$v.patch
  if [[ $v != tip ]]; then git apply $p || { echo "$v: patch failed" | tee -a $L/runs.txt; continue; }; fi
  sleep 2
  C13B_ARMS=tip C13B_LABEL=$v C13B_STAGES=${STAGES:-332} C13B_N=${N:-24} C13B_OUT=$WT/$L/t1-$v.json \
    npx playwright test -c tests-visual/release-10-1-5-critic-13.config.ts --project=webkit release-10-1-5-critic-13.spec.ts --grep "c13b" --workers=1 > $L/t1-$v.log 2>&1
  rc=$?
  [[ $v != tip ]] && git apply -R $p
  echo "$(date +%H:%M) $v rc=$rc load=$(sysctl -n vm.loadavg) $(git status --short src | tr '\n' ' ')" | tee -a $L/runs.txt
done
