#!/usr/bin/env bash
# tree-probes.sh <tree> · critique-B pass 5 · command-level probes. Written and hashed BEFORE reading pass-5/B-kit.
# The route's commands are passed in, never guessed into the battery:
#   SEAL="<route gate on the tree; exit 0 = GREEN>"
#   CASCADE_SNAP="<cmd writing a cascade snapshot of <tree>/dist to \$SNAP>"   (called with SNAP set)
#   CASCADE_VERIFY="<cmd verifying <tree>/dist against \$SNAP under the route's listing; exit 0 = accepted>"
#   LISTING="<path of the route's reorder listing>"
#   BUILD="<build command>" (default: npm run build)
# Each probe prints `TPROBE <id> <item> <PASS|FAIL|INFO> <detail>`.
set -u
T="$1"; cd "$T" || exit 9
HERE="$(cd "$(dirname "$0")" && pwd)"
BUILD="${BUILD:-npm run build}"
LOGD="${CRIT_TMP:-/tmp}"
say() { echo "TPROBE $*"; }

# B-11 · one pin path: --pin and --no-pin refused; npm test carries no off switch
out=$($SEAL --pin /nonexistent/pin.json 2>&1); rc=$?
[ $rc -ne 0 ] && echo "$out" | grep -qiE "unknown|unrecognized|refus|not an option" && say PIN-OPT B-11 PASS "--pin refused rc=$rc" || say PIN-OPT B-11 FAIL "--pin rc=$rc: $(echo "$out" | tail -1 | cut -c1-160)"
out=$($SEAL --no-pin 2>&1); rc=$?
[ $rc -ne 0 ] && echo "$out" | grep -qiE "unknown|unrecognized|refus|not an option" && say NOPIN B-11 PASS "--no-pin refused rc=$rc" || say NOPIN B-11 FAIL "--no-pin rc=$rc: $(echo "$out" | tail -1 | cut -c1-160)"
grep -nE 'no-?pin|SEAL_SKIP|SKIP_SEAL|seal.*skip|skipIf' package.json vitest.config.ts 2>/dev/null | head -5 | sed 's/^/   /'
n=$(git grep -nE 'no-?pin|SKIP_SEAL|SEAL_SKIP' -- 'scripts' 'tests' 'src' 'vitest.config.ts' 'package.json' 2>/dev/null | grep -v '^docs/' | wc -l | tr -d ' ')
say OFFSWITCH B-11 INFO "source lines naming a pin or seal off switch: $n"
git grep -nE 'no-?pin|SKIP_SEAL|SEAL_SKIP' -- 'scripts' 'tests' 'src' 'vitest.config.ts' 'package.json' 2>/dev/null | head -8 | sed 's/^/   /'

# S-09 · the gate writes nothing
before=$(git status --porcelain --untracked-files=all | shasum -a 256); $SEAL >"$LOGD/crit-seal-pure.log" 2>&1; rc1=$?; after=$(git status --porcelain --untracked-files=all | shasum -a 256)
[ "$before" = "$after" ] && say GATE-PURE S-09 PASS "gate rc=$rc1, tree unchanged" || say GATE-PURE S-09 FAIL "gate wrote to the tree"
tail -25 "$LOGD/crit-seal-pure.log" | sed 's/^/   /'

# S-08 / S-03 (P4-R4) · a moved CSS entry's export key targets a real file; no dist CSS file is a pure forwarder
node -e '
const fs=require("fs"),p=require("path");const pk=JSON.parse(fs.readFileSync("package.json","utf8"));
let bad=0,n=0;for(const[k,v]of Object.entries(pk.exports||{})){const t=typeof v==="string"?v:(v.default||v.import||v.style||"");if(!/\.css$/.test(t))continue;n++;
 if(!fs.existsSync(t)){console.log("   MISSING "+k+" -> "+t);bad++}}
const fw=[];(function w(d){if(!fs.existsSync(d))return;for(const e of fs.readdirSync(d,{withFileTypes:true})){const q=p.join(d,e.name);if(e.isDirectory())w(q);else if(q.endsWith(".css")){const s=fs.readFileSync(q,"utf8").replace(/\/\*[\s\S]*?\*\//g,"").trim();if(/^(@import\s+[^;]+;\s*)+$/.test(s))fw.push(q+" "+s.length+"B")}}})("dist");
console.log("TPROBE CSS-DIST S-08/P4-R4 "+(bad||fw.length?"FAIL":"PASS")+" css export keys="+n+" missing="+bad+" pure-@import dist files="+fw.length);fw.slice(0,10).forEach(x=>console.log("   FORWARDER "+x));'

# B-10 / B-S16 · the Playwright program holds every Playwright test file
node "$HERE/pw-program.mjs" --root "$T" --out "$LOGD/crit-pw-program.json" | sed 's/^/   /'
m=$(node -e 'console.log(JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).missing.length)' "$LOGD/crit-pw-program.json" 2>/dev/null || echo "?")
[ "$m" = "0" ] && say PW-PROGRAM B-10 PASS "missing 0" || say PW-PROGRAM B-10 FAIL "missing $m"

# S-10 / B-08 / P5-F3 · cascade plants: acc (risky pair) and out (a reorder outside the listed rung)
if [ -n "${CASCADE_SNAP:-}" ]; then
  export SNAP="$LOGD/crit-snap-migrated"; rm -rf "$SNAP"
  eval "$CASCADE_SNAP" >"$LOGD/crit-snap.log" 2>&1 || say CASCADE-SNAP S-10 FAIL "snapshot rc=$?"
  for mode in acc out; do
    node "$HERE/reorder.mjs" --root "$T" --plant "$mode" --listing "${LISTING:-/dev/null}"; rrc=$?
    if [ $rrc -eq 0 ]; then
      $BUILD >"$LOGD/crit-reorder-$mode-build.log" 2>&1; brc=$?
      out=$(eval "$CASCADE_VERIFY" 2>&1); crc=$?
      echo "$out" > "$LOGD/crit-reorder-$mode-verify.log"
      [ $crc -ne 0 ] && say "REORDER-$mode" S-10/B-08 PASS "build rc=$brc, verify RED rc=$crc: $(echo "$out" | grep -iE 'unlisted|risk|RED' | head -3 | tr '\n' ' ' | cut -c1-300)" \
                     || say "REORDER-$mode" S-10/B-08 FAIL "build rc=$brc, verify accepted rc=0: $(echo "$out" | tail -2 | tr '\n' ' ' | cut -c1-200)"
      node "$HERE/reorder.mjs" --root "$T" --undo "$T/.crit-reorder-undo.json"; rm -f "$T/.crit-reorder-undo.json"
    else say "REORDER-$mode" S-10/B-08 INFO "no candidate (rc=$rrc)"; fi
  done
  $BUILD >"$LOGD/crit-rebuild.log" 2>&1; out=$(eval "$CASCADE_VERIFY" 2>&1); crc=$?
  [ $crc -eq 0 ] && say CASCADE-RESTORE S-10 PASS "restored tree verifies rc=0" || say CASCADE-RESTORE S-10 FAIL "restored tree rc=$crc"
fi

# S-03 (P4-R3) · the ratchet against the committed datum
out=$(npm run -s verify:package 2>&1); rc=$?
say RATCHET S-03/P4-R3 INFO "verify:package rc=$rc: $(echo "$out" | grep -iE 'ratchet|terminal|CLEAN|forbid|shrink' | head -2 | tr '\n' ' ' | cut -c1-200)"
