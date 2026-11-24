#!/bin/bash
# Critic 13: the five commands on the committed tree, one guarded run each, exit codes to
# gates.out; the package npm packs from that build, into this seat's own cache; then item (d):
# the boot-graph gate after a demo source is touched (RED, the line release.sh ran before) and
# after the demo is built (GREEN, release.sh's order now).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
L=$W/docs/release-11.1.1/critic-13/logs
G=~/.claude/guard/guarded
cd $W
step() { local name=$1; shift; local s=$(date +%s); "$@" > $L/gate-$name.log 2>&1; local rc=$?; echo "$(date +%T) $name exit $rc $(( $(date +%s) - s ))s $(git rev-parse --short HEAD) load=$(sysctl -n vm.loadavg)" >> $L/gates.out; }
echo "GATES-START $(date +%T) $(git rev-parse --short HEAD) dirty-tracked=$(git status --short | grep -vc '^??')" >> $L/gates.out
step typecheck $G --light --timeout 15 -- npm run typecheck
step build $G --timeout 20 -- npm run build
step verify-package $G --light --timeout 10 -- npm run verify:package
P=$W/.cache/critic13-pub; rm -rf $P; mkdir -p $P/tip/tgz
step pack $G --light --timeout 10 -- npm pack --ignore-scripts --json --pack-destination $P/tip/tgz
cp $L/gate-pack.log $L/pack-tip.json
step demo-dist-build $G --timeout 20 -- npm run demo:dist:build
CI=true step vitest $G --timeout 30 -- npx vitest run --maxWorkers=2
# item (d): a demo source newer than dist-demo, then the boot-graph gate alone
touch $W/demo/main.ts
CI=true step d-red $G --light --timeout 10 -- npx vitest run tests/gates/boot-graph.test.ts --maxWorkers=2
step d-demo-build $G --timeout 20 -- npm run demo:dist:build
CI=true step d-green $G --light --timeout 10 -- npx vitest run tests/gates/boot-graph.test.ts --maxWorkers=2
echo "GATES-DONE $(date +%T) dirty-tracked=$(git status --short | grep -vc '^??')" >> $L/gates.out
