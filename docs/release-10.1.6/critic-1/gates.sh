#!/bin/zsh
# 10.1.6 critic 1: version, then release.yml's order (the build `npm ci` runs as `prepare`,
# typecheck, build, verify:package) on the `git archive HEAD` tree (.cache/r1016c/tip),
# which stands for CI's fresh checkout. `dist` is removed first.
#   ~/.claude/guard/guarded --timeout 45 -- zsh docs/release-10.1.6/critic-1/gates.sh
set -u
WT=${0:A:h:h:h:h}
L=$WT/docs/release-10.1.6/critic-1/out/gates
mkdir -p $L; : > $L/gates.txt
cd $WT/.cache/r1016c/tip
echo "tree $PWD head $(git -C $WT rev-parse --short HEAD) $(date '+%F %T')" | tee -a $L/gates.txt
gate() { local n=$1; shift; "$@" > $L/$n.log 2>&1; echo "$n exit=$?" | tee -a $L/gates.txt; }
gate version zsh -c 'test "$(node -p "require(\"./package.json\").version")" = 10.1.6'
rm -rf dist
gate prepare npm run build
gate typecheck npm run typecheck
gate build npm run build
gate verify-package npm run verify:package
echo "gates done $(date '+%F %T')" | tee -a $L/gates.txt
