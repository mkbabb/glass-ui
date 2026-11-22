#!/usr/bin/env bash
# The 11.1.1 close (the 11.1.0 close's method): release.yml's checks on a `git archive HEAD`
# tree, inside the worktree at .cache/close-1111/tree, deleted after. The archive takes the
# paths release.yml's sparse checkout takes (every top-level path but docs/, and the docs
# files its list names), read from the workflow itself. It reads the ratchet's candidate on
# the committed tree, then packs the build and measures every entry's gzipped import closure
# against the published 11.0.2 and 11.1.0 (critic 6's sizes.py).
#   ~/.claude/guard/guarded --timeout 45 -- bash docs/release-11.1.1/close/archive-gates.sh <label>
set -u
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
LABEL=$1
L=$WT/docs/release-11.1.1/close/gates-archive-$LABEL
T=$WT/.cache/close-1111/tree
PUB=$WT/.cache/critic12-pub
mkdir -p "$L"; : > "$L/gates.txt"
rm -rf "$WT/.cache/close-1111"; mkdir -p "$T"
DOCS=$(awk '/sparse-checkout: \|/{f=1;next} f&&/^ *- uses/{f=0} f' "$WT/.github/workflows/release.yml" | sed 's/^ *//' | grep '^/docs/.' | sed 's#^/##')
git -C "$WT" archive HEAD -- . ':(exclude)docs' | tar -x -C "$T"
git -C "$WT" archive HEAD -- $DOCS | tar -x -C "$T"
ln -s "$WT/node_modules" "$T/node_modules"
cd "$T"
git init -q && git add -A && git -c user.email=close@local -c user.name=close commit -qm archive
echo "archive of $(git -C "$WT" rev-parse --short HEAD) $(date '+%F %T') load $(sysctl -n vm.loadavg) files $(git ls-files | wc -l | tr -d ' ') docs $(git ls-files docs | wc -l | tr -d ' ')" | tee -a "$L/gates.txt"
gate() { local n=$1; shift; local s=$(date +%s); "$@" > "$L/$n.log" 2>&1; echo "$n exit=$? $(( $(date +%s) - s ))s $(date +%T)" | tee -a "$L/gates.txt"; }
gate version bash -c 'test "$(node -p "require(\"./package.json\").version")" = 11.1.1'
gate dist-tag node scripts/dist-tag.mjs 11.1.1 11.1.0
gate prepare npm run build
gate typecheck npm run typecheck
gate build npm run build
gate dist-index-dts test -f dist/index.d.ts
gate verify-package npm run verify:package
gate demo-dist npm run demo:dist:build
gate test-ci env CI=true npx vitest run --maxWorkers=2
echo "dist-tag: $(cat "$L/dist-tag.log")" | tee -a "$L/gates.txt"
grep -E "Test Files|Tests " "$L/test-ci.log" | tee -a "$L/gates.txt"
grep -E "G-BUNDLE-RATCHET|CLEAN|unpacked" "$L/verify-package.log" | tail -4 | tee -a "$L/gates.txt"
mkdir -p "$WT/.cache/close-1111/pack"
gate pack npm pack --ignore-scripts --json --pack-destination "$WT/.cache/close-1111/pack"
cp "$L/pack.log" "$L/pack.json"
tar -xzf "$WT/.cache/close-1111/pack/"*.tgz -C "$WT/.cache/close-1111/pack"
echo "unpacked $(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"))[0].unpackedSize)' "$L/pack.json") ratchet $(cat .bundle-ratchet)" | tee -a "$L/gates.txt"
python3 -I "$WT/docs/release-11.1.1/critic-6/sizes.py" "$PUB/reg-11.0.2/x/package" "$PUB/reg-11.1.0/x/package" "$WT/.cache/close-1111/pack/package" > "$L/sizes.txt" 2>&1
echo "sizes exit=$? $(head -1 "$L/sizes.txt")" | tee -a "$L/gates.txt"
cd "$WT"; rm -rf "$WT/.cache/close-1111"
echo "done $(date '+%F %T'); tree deleted" | tee -a "$L/gates.txt"
