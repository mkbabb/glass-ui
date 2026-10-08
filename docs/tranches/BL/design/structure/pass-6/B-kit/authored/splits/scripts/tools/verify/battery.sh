#!/bin/zsh
# battery.sh <arm> <worktree after the rows> <before snapshot> <out dir> — the zone-scripts
# split's verification, as run for results.txt. The worktree is a linked worktree (never the
# main checkout); outputs and logs go to <out dir>.
#   - line counts of every output; bindings.mjs (no unbound name, no unused import)
#   - build, typecheck (both vue-tsc programs), demo build; the floor gates; bounds; the seal
#   - comment-census: ten modes, the before copy and the after CLI, byte for byte
#   - profile-bundle: the before copy and the after program on the same dist, measure and
#     --enforce, the JSON profile, the markdown table and stdout byte for byte
#   - verify:package: the CLI verdict before and after; then the full pack + install + three
#     type-resolution modes with `.bundle-ratchet` pinned, in this scratch tree only, to the
#     byte count the CLI measured, and the evidence compared after norm.mjs; the datum is
#     restored and `git status` shows it clean
#   - vitest: the whole suite, and the suites that read the split files
# The before copies run from inside the tree (scripts/zz-before-*.mjs) so they resolve the
# same root and node_modules, and are removed after.
A=$1; W=$2; B=$3; S=$4; T=${0:A:h:h}
mkdir -p $S; cd $W
echo "== arm $A battery ($(date +%H:%M:%S), $(uptime | sed 's/.*load/load/'))"
OUTS=(scripts/comment-census.mjs scripts/profile-bundle.mjs scripts/verify-export-types.mjs scripts/comments/*.mjs scripts/bundle-checks/*.mjs scripts/package-verify/*.mjs)
wc -l $OUTS | sort -rn | awk '{printf "%s %s; ", $1, $2} END {print ""}'
node $T/bindings.mjs --root . $OUTS | tail -1
npm run build >$S/$A-build.log 2>&1; echo "build exit $?"
npm run typecheck >$S/$A-tc.log 2>&1; echo "typecheck (vue-tsc, both programs) exit $?"
npm run demo:dist:build >$S/$A-demo.log 2>&1; echo "demo build exit $?"
node scripts/structure/gates.mjs 2>&1 | cut -c1-90
node scripts/structure/bounds.mjs > $S/$A-bounds.txt 2>&1; node -e 'const t=require("fs").readFileSync(process.argv[1],"utf8"); const j=JSON.parse(t.slice(0,t.lastIndexOf("}")+1)); console.log("bounds", JSON.stringify({dirsOver:j.dirsOver, filesOver:j.filesOver}))' $S/$A-bounds.txt; echo "bounds scripts-zone files over 500: $(grep -c '^FILE .* scripts/' $S/$A-bounds.txt)"
if [ -f scripts/structure/seal/seal.mjs ]; then node scripts/structure/seal/seal.mjs --json $S/seal$A-after.json >/dev/null 2>&1; node -e 'console.log("seal", JSON.stringify(require(process.argv[1]).counts))' $S/seal$A-after.json; fi
for flags in "" "--json" "--json --per-file --prose --dead --audit-interp" "--prose" "--per-file" "--audit-interp" "--dead" "--root demo" "--rev HEAD --json" "--root tests --json"; do a=$(node $B/scripts/comment-census.mjs ${=flags} 2>&1 | shasum | cut -c1-12); b=$(node scripts/comment-census.mjs ${=flags} 2>&1 | shasum | cut -c1-12); echo "comment-census [$flags] $([ $a = $b ] && echo "SAME $a" || echo "DIFF $a $b")"; done
mkdir -p $S/pb$A; cp $B/scripts/profile-bundle.mjs scripts/zz-before-profile.mjs
for v in before after; do P=scripts/profile-bundle.mjs; [ $v = before ] && P=scripts/zz-before-profile.mjs; for mode in "" "--enforce"; do GLASS_UI_BUNDLE_ARTIFACT=$S/pb$A/$v$mode.json GLASS_UI_SUBPATH_TABLE=$S/pb$A/$v$mode.md node $P --skip-build ${=mode} > $S/pb$A/$v$mode.out 2>&1; echo "profile-bundle $v [$mode] exit $?"; done; done
rm scripts/zz-before-profile.mjs
for f in .json .md .out --enforce.json --enforce.md --enforce.out; do sed "s#$S/pb$A/before#X#g" $S/pb$A/before$f > $S/pb$A/b.tmp; sed "s#$S/pb$A/after#X#g" $S/pb$A/after$f > $S/pb$A/a.tmp; cmp -s $S/pb$A/b.tmp $S/pb$A/a.tmp && echo "profile-bundle $f SAME" || echo "profile-bundle $f DIFF"; done
cp $B/scripts/verify-export-types.mjs scripts/zz-before-vet.mjs
node scripts/zz-before-vet.mjs > $S/$A-vp-before.out 2>&1; echo "verify:package before exit $? $(grep -m1 '^Error' $S/$A-vp-before.out)"
node scripts/verify-export-types.mjs > $S/$A-vp-after.out 2>&1; echo "verify:package after exit $? $(grep -m1 '^Error' $S/$A-vp-after.out)"
BYTES=$(grep -m1 '^Error' $S/$A-vp-after.out | sed -E 's/.*: ([0-9]+) [<>] ([0-9]+).*/\1/')
cp .bundle-ratchet $S/$A-ratchet.keep; printf '%s\n' "$BYTES" > .bundle-ratchet
node scripts/zz-before-vet.mjs > $S/$A-vp-before-full.out 2>&1; echo "verify:package full before (datum $BYTES) exit $?"
node scripts/verify-export-types.mjs > $S/$A-vp-after-full.out 2>&1; echo "verify:package full after (datum $BYTES) exit $?"
cp $S/$A-ratchet.keep .bundle-ratchet; rm scripts/zz-before-vet.mjs
node $T/verify/norm.mjs $S/$A-vp-before-full.out > $S/$A-vp-b.json; node $T/verify/norm.mjs $S/$A-vp-after-full.out > $S/$A-vp-a.json; cmp -s $S/$A-vp-b.json $S/$A-vp-a.json && echo "verify:package full evidence SAME (normalized temp paths and npm timing)" || echo "verify:package full evidence DIFF"
node -e 'const o=require(process.argv[1]); console.log("  evidence", JSON.stringify({claims:o.claims, declarations:o.declarations, css:o.css, roster:o.roster, packBytes:o.pack.bytes, types:o.install.types.map(t=>t.mode+":"+t.exit).join(" "), runtimeExit:o.install.artifact.runtimeExit, fonts:o.install.artifact.fonts.length}))' $S/$A-vp-a.json
git status --short .bundle-ratchet
npx vitest run --reporter=json --outputFile=$S/$A-vitest.json >/dev/null 2>&1; echo "vitest exit $?"
node -e 'const r=require(process.argv[1]); console.log("vitest", JSON.stringify({files:r.numTotalTestSuites, tests:r.numTotalTests, passed:r.numPassedTests, failed:r.numFailedTests, skipped:r.numPendingTests})); for (const f of r.testResults) for (const a of f.assertionResults) if (a.status==="failed") console.log("  FAIL", f.name.slice(process.cwd().length+1), "::", a.fullName.slice(0,110)); for (const f of r.testResults) if (/comment-ratio|profile-bundle-value|public-surface|seal.test|floor.test/.test(f.name)) console.log("  ", f.name.slice(process.cwd().length+1), f.assertionResults.filter(a=>a.status==="passed").length+"/"+f.assertionResults.length)' $S/$A-vitest.json
echo "== arm $A done $(date +%H:%M:%S)"
