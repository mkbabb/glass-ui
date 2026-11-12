#!/bin/zsh
# 10.1.5 release close: A/B of one spec's cells by title, branch then v10.1.4, N repeats, in one engine;
# each arm its own guarded call (WebKit 2287 under --exclusive webkit); a refusal stops (exit 3).
#   zsh docs/release-10.1.5/scripts/close-ab.sh <name> ch|co|wk <spec> <grep> <repeat>
set -u
WT=${0:A:h:h:h:h}
cd $WT
S=docs/release-10.1.5/scripts; L=docs/release-10.1.5/close/ab; G=~/.claude/guard/guarded; B=.cache/close/v1014
mkdir -p $L
NAME=$1; E=$2; SPEC=$3; GREP=$4; N=$5
case $E in
  ch) CFG=tests-visual/playwright.config.ts; P=chromium-headless-new; X=(); PB=5311; PV=5312;;
  co) CFG=tests-visual/playwright.config.ts; P=coarse-touch; X=(); PB=5311; PV=5312;;
  wk) CFG=tests-visual/webkit-2287.config.ts; P=webkit; X=(--exclusive webkit); PB=5313; PV=5314;;
esac
for arm in branch v1014; do
  tag=$NAME-$arm-$E; tree=.; port=$PB; [[ $arm == v1014 ]] && { tree=$B; port=$PV; }
  $G $X --timeout 45 -- zsh $S/close-cell.sh $tag $tree $port $CFG $P $SPEC "$GREP" $N > $L/$tag.guard.log 2>&1
  if grep -q REFUSED $L/$tag.guard.log; then echo "$(date '+%F %T') STOP: refused at $tag" | tee -a $L/ab.txt; exit 3; fi
done
