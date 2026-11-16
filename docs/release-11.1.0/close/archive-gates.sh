#!/usr/bin/env bash
# The 11.1.0 close: release.yml's checks on a `git archive HEAD` tree (CI's fresh checkout), inside
# the worktree at .cache/close-1110/tree, deleted after. It reads the ratchet's candidate on the
# committed tree.
#   ~/.claude/guard/guarded --timeout 40 -- bash docs/release-11.1.0/close/archive-gates.sh <label>
set -u
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.0
LABEL=$1
L=$WT/docs/release-11.1.0/close/gates-archive-$LABEL
T=$WT/.cache/close-1110/tree
mkdir -p "$L"; : > "$L/gates.txt"
rm -rf "$T"; mkdir -p "$T"
git -C "$WT" archive HEAD | tar -x -C "$T"
ln -s /Users/mkbabb/Programming/glass-ui/node_modules "$T/node_modules"
cd "$T"
git init -q && git add -A && git -c user.email=close@local -c user.name=close commit -qm archive
echo "archive of $(git -C "$WT" rev-parse --short HEAD) $(date '+%F %T')" | tee -a "$L/gates.txt"
gate() { local n=$1; shift; "$@" > "$L/$n.log" 2>&1; echo "$n exit=$? $(date +%T)" | tee -a "$L/gates.txt"; }
gate version bash -c 'test "$(node -p "require(\"./package.json\").version")" = 11.1.0'
gate prepare npm run build
gate typecheck npm run typecheck
gate build npm run build
gate dist-index-dts test -f dist/index.d.ts
gate verify-package npm run verify:package
gate demo-dist npm run demo:dist:build
gate test-ci env CI=true npx vitest run --maxWorkers=2
grep -E "Test Files|Tests " "$L/test-ci.log" | tee -a "$L/gates.txt"
grep -oE "G-BUNDLE-RATCHET[^\n]*|ratchet[^,]*" "$L/verify-package.log" | tail -3 | tee -a "$L/gates.txt"
cd "$WT"; rm -rf "$WT/.cache/close-1110"
echo "done $(date '+%F %T'); tree deleted" | tee -a "$L/gates.txt"
