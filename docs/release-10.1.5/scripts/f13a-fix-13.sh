#!/bin/zsh
# 10.1.5 fix 13: f13a (T1 diagnostic) per src variant, WebKit 2287.  guarded --exclusive webkit -- zsh this variant...
set -u
WT=${0:A:h:h:h:h}
cd $WT
L=docs/release-10.1.5/fix-13; mkdir -p $L
export GLASS_UI_DEMO_PORT=${GLASS_UI_DEMO_PORT:-5363}
PROJ=${PROJ:-webkit}
for v in $@; do
  p=$L/variants/${v%%+*}.patch
  for q in ${(s:+:)v}; do [[ $q != tip ]] && { git apply $L/variants/$q.patch || { echo "$v: $q failed" | tee -a $L/runs.txt; git checkout -- src; continue 2; }; }; done
  sleep 2
  F13A_LABEL=$v F13A_N=${N:-24} npx playwright test -c tests-visual/release-10-1-5-fix-13.config.ts --project=$PROJ release-10-1-5-fix-13.spec.ts --grep "f13a" --workers=1 > $L/f13a-$v-$PROJ.log 2>&1
  rc=$?
  git checkout -- src
  echo "$(date +%H:%M) f13a $v $PROJ rc=$rc load=$(sysctl -n vm.loadavg) $(git status --short src | tr '\n' ' ')" | tee -a $L/runs.txt
done
