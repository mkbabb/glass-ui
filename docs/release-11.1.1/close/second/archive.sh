#!/usr/bin/env bash
# The 11.1.1 second close: on one `git archive HEAD` tree inside the worktree
# (.cache/close-1111b/tree, deleted after), release.yml's checks in its order, then
# scripts/release.sh's browser half (test:browser and the three pixel-floor legs), then the pack
# and every entry's gzipped import closure against the published 11.0.2 and 11.1.0.
# The archive takes what release.yml's sparse checkout takes (every top-level path but docs/, and
# the docs files its list names, read from the workflow). node_modules is per-entry symlinks into
# the worktree's, with the tree's own tests-visual workspace link, so vite's caches stay in the tree.
#   ~/.claude/guard/guarded --timeout 60 -- bash docs/release-11.1.1/close/second/archive.sh <label>
set -u
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1
LABEL=$1
L=$WT/docs/release-11.1.1/close/second/gates-archive-$LABEL
T=$WT/.cache/close-1111b/tree
NM=$WT/node_modules
PUB=$WT/.cache/critic12-pub
mkdir -p "$L"; : > "$L/gates.txt"
rm -rf "$WT/.cache/close-1111b"; mkdir -p "$T/node_modules/@mkbabb"
DOCS=$(awk '/sparse-checkout: \|/{f=1;next} f&&/^ *- uses/{f=0} f' "$WT/.github/workflows/release.yml" | sed 's/^ *//' | grep '^/docs/.' | sed 's#^/##')
git -C "$WT" archive HEAD -- . ':(exclude)docs' | tar -x -C "$T"
git -C "$WT" archive HEAD -- $DOCS | tar -x -C "$T"
for e in "$NM"/* "$NM"/.bin; do n=$(basename "$e"); [[ $n = @mkbabb || $n = .vite ]] && continue; ln -s "$e" "$T/node_modules/$n"; done
for e in "$NM"/@mkbabb/*; do n=$(basename "$e"); [[ $n = glass-ui-tests-visual ]] && continue; ln -s "$e" "$T/node_modules/@mkbabb/$n"; done
ln -s ../../tests-visual "$T/node_modules/@mkbabb/glass-ui-tests-visual"
cd "$T"
git init -q && git add -A && git -c user.email=close@local -c user.name=close commit -qm archive
echo "archive of $(git -C "$WT" rev-parse --short HEAD) $(date '+%F %T') load $(sysctl -n vm.loadavg) files $(git ls-files | wc -l | tr -d ' ') docs $(git ls-files docs | wc -l | tr -d ' ')" | tee -a "$L/gates.txt"
gate() { local n=$1; shift; local s=$(date +%s); "$@" > "$L/$n.log" 2>&1; echo "$n exit=$? $(( $(date +%s) - s ))s $(date +%T) load $(sysctl -n vm.loadavg | tr -d '{}')" | tee -a "$L/gates.txt"; }
# release.yml, in its order (npm ci's prepare is the build).
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
# scripts/release.sh's browser half, in its order, on the tree's own demo server.
export GLASS_UI_DEMO_PORT=5351 GLASS_UI_DEMO_URL=http://localhost:5351
gate test-browser npm run test:browser -- --maxWorkers=2
gate pixel-floor npm -w tests-visual run gate:pixel-floor
cp tests-visual/.cache/pi-report-green.json "$L/pi-report-green.json" 2>/dev/null
gate pixel-floor-planted npm -w tests-visual run gate:pixel-floor:planted
cp tests-visual/.cache/pi-report-planted.json "$L/pi-report-planted.json" 2>/dev/null
gate pixel-floor-planted-flood npm -w tests-visual run gate:pixel-floor:planted:flood
cp tests-visual/.cache/pi-report-flood.json "$L/pi-report-flood.json" 2>/dev/null
grep -hE "Test Files|Tests " "$L/test-browser.log" | tee -a "$L/gates.txt"
grep -hE "pixel-floor gate|PLANTED|self-test" "$L"/pixel-floor*.log | tee -a "$L/gates.txt"
unset GLASS_UI_DEMO_PORT GLASS_UI_DEMO_URL
mkdir -p "$WT/.cache/close-1111b/pack"
gate pack npm pack --ignore-scripts --json --pack-destination "$WT/.cache/close-1111b/pack"
cp "$L/pack.log" "$L/pack.json"
tar -xzf "$WT/.cache/close-1111b/pack/"*.tgz -C "$WT/.cache/close-1111b/pack"
echo "unpacked $(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"))[0].unpackedSize)' "$L/pack.json") ratchet $(cat .bundle-ratchet)" | tee -a "$L/gates.txt"
python3 -I "$WT/docs/release-11.1.1/critic-6/sizes.py" "$PUB/reg-11.0.2/x/package" "$PUB/reg-11.1.0/x/package" "$WT/.cache/close-1111b/pack/package" > "$L/sizes.txt" 2>&1
echo "sizes exit=$? $(head -1 "$L/sizes.txt")" | tee -a "$L/gates.txt"
cd "$WT"; rm -rf "$WT/.cache/close-1111b"
echo "done $(date '+%F %T'); tree deleted" | tee -a "$L/gates.txt"
