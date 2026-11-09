#!/usr/bin/env bash
# 11.0.0 release close — the release.yml steps in CI order, then release.sh's own steps.
# One guarded call per step, one at a time. prepublishOnly (typecheck && build && npm test)
# runs as its three parts so vitest keeps --maxWorkers=2.
cd "$(dirname "$0")/../../.."
D=docs/release-11.0.0/close
G=~/.claude/guard/guarded
S=$D/gates-summary.txt
: > "$S"
echo "HEAD $(git rev-parse --short HEAD) $(date +%F' '%T)" >> "$S"
dfgate() { local a; a=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}'); echo "  df avail ${a}G" >> "$S"; [ "$a" -ge 6 ] || { echo "DISK STOP before $1" >> "$S"; exit 9; }; }
run() { local name=$1; shift; dfgate "$name"; "$@" > "$D/$name.log" 2>&1; echo "$name exit $? $(date +%T)" >> "$S"; }
run tag-vs-package bash -c 'test "11.0.0" = "$(node -p "require(\"./package.json\").version")"'
run yml-typecheck $G --timeout 20 -- npm run typecheck
run yml-build $G --timeout 20 -- npm run build
run yml-verify-package $G --timeout 30 -- npm run verify:package
run yml-demo-dist-build $G --timeout 20 -- npm run demo:dist:build
run yml-test $G --timeout 40 -- npx vitest run --maxWorkers=2
run yml-test-ci env CI=true $G --timeout 40 -- npx vitest run --maxWorkers=2
run sh-prepublish-typecheck $G --timeout 20 -- npm run typecheck
run sh-prepublish-build $G --timeout 20 -- npm run build
run sh-prepublish-test $G --timeout 40 -- npx vitest run --maxWorkers=2
run sh-verify-package $G --timeout 30 -- npm run verify:package
test -f dist/index.d.ts; echo "dist-index-dts exit $?" >> "$S"
echo DONE >> "$S"
