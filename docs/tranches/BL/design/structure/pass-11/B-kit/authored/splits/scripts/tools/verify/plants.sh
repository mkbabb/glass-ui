#!/bin/zsh
# plants.sh <arm C worktree> <its before snapshot> <out dir> — five plants against the
# zone-scripts rows and tools, each on a fresh reset of the before snapshot; the tree is
# reset again at the end. Each plant prints what caught it.
#   P1  the tests seat re-carves tests/public-surface.spec.ts before row 03 lands: the frozen
#       row stops before writing; the derive finds the probes wherever they now live
#   P2  a chain row edits a statement the split moves (the route's S-14 cure of the ternary in
#       combinedStylesDraw) before row 02: the frozen row stops; the derive moves the cured
#       body and drops the import it no longer reads
#   P3  a new module under a placeholder name (scripts/bundle-checks -> scripts/utils): seal B15
#   P4  an import the split forgot (walk, in critical-path.mjs): bindings.mjs, TS2304
#   P5  a module file pushed over 500 lines: seal B6
W=$1; B=$2; S=$3; V=${0:A:h}; T=${V:h}
mkdir -p $S
reset() { $V/reset.sh $B $W; }
cd $W
echo "== P1 reader re-carved first: tests/public-surface.spec.ts -> tests/zz-carve/public-surface.spec.ts"
reset; mkdir -p tests/zz-carve; mv tests/public-surface.spec.ts tests/zz-carve/public-surface.spec.ts
node $T/apply.mjs --root $W --only 03 > $S/p1-frozen.log 2>&1; echo "  frozen row 03 exit $? ($(grep -m1 -o 'ENOENT[^,]*' $S/p1-frozen.log || head -1 $S/p1-frozen.log)); files written: $(git status --short scripts | grep -c package-verify)"
node $T/author/verify-export-types.mjs --root . | sed 's/^/  derive: /'
echo "  probes re-pointed in the moved file: $(grep -c 'scripts/package-verify/' tests/zz-carve/public-surface.spec.ts); old path left under tests/: $(grep -rl 'scripts/verify-export-types.mjs' tests | wc -l | tr -d ' ')"
rm -rf tests/zz-carve
echo "== P2 a chain row cures the ternary in combinedStylesDraw before row 02"
reset
node -e 'const fs=require("fs"); const p=process.argv[1]; const t=fs.readFileSync(p,"utf8"); const from="        return existsSync(target) ? `\\n${readFileSync(target, \"utf-8\")}\\n` : m;\n"; if (t.split(from).length!==2) throw new Error("anchor"); fs.writeFileSync(p, t.replace(from, "        return `\\n${readFileSync(target, \"utf-8\")}\\n`;\n"));' scripts/profile-bundle.mjs
node $T/apply.mjs --root $W --only 02 2>&1 | head -2 | sed 's/^/  frozen row 02: /'
node $T/author/profile-bundle.mjs --root . | sed 's/^/  derive: /'
grep -n 'return `\\n${readFileSync(target' scripts/bundle-checks/budgets.mjs | sed 's/^/  budgets.mjs:/'
echo "  existsSync reads left in budgets.mjs: $(grep -c existsSync scripts/bundle-checks/budgets.mjs)"
node $T/bindings.mjs --root . scripts/bundle-checks/budgets.mjs scripts/profile-bundle.mjs | sed 's/^/  bindings: /'
echo "== P3 a new module under a placeholder name: scripts/bundle-checks -> scripts/utils (rows 01, 02 applied)"
reset; node $T/apply.mjs --root $W --only 01 >/dev/null; node $T/apply.mjs --root $W --only 02 >/dev/null
mv scripts/bundle-checks scripts/utils; sed -i '' 's#./bundle-checks/index.mjs#./utils/index.mjs#' scripts/profile-bundle.mjs
node scripts/structure/seal/seal.mjs --json $S/p3.json >/dev/null 2>&1; node -e 'const r=require(process.argv[1]); console.log("  seal B15", r.counts.B15, JSON.stringify(r.V.B15))' $S/p3.json
echo "== P4 an import the split forgot: the walk import dropped from critical-path.mjs (rows 01, 02 applied)"
reset; node $T/apply.mjs --root $W --only 01 >/dev/null; node $T/apply.mjs --root $W --only 02 >/dev/null
grep -v 'import { walk } from "./files.mjs";' scripts/bundle-checks/critical-path.mjs > $S/cp.tmp && cp $S/cp.tmp scripts/bundle-checks/critical-path.mjs
node $T/bindings.mjs --root . scripts/bundle-checks/critical-path.mjs | sed 's/^/  bindings: /'
echo "== P5 a module file over 500 lines: 500 comment lines appended to scripts/bundle-checks/budgets.mjs (all rows applied)"
reset; node $T/apply.mjs --root $W >/dev/null
yes "// pad" | head -500 >> scripts/bundle-checks/budgets.mjs
node scripts/structure/seal/seal.mjs --json $S/p5.json >/dev/null 2>&1; node -e 'const r=require(process.argv[1]); console.log("  seal B6", r.counts.B6, JSON.stringify(r.V.B6.filter((x) => x.includes("bundle-checks"))))' $S/p5.json
reset
