#!/usr/bin/env bash
# tree-probes.sh <tree> · command-level probes. Written and hashed before reading the pass-4 kit.
# The route's commands are passed in, never guessed into the battery:
#   SEAL="<command that runs the route's gate on the tree, exit 0 = GREEN>"
#   CASCADE="<command that judges the built cascade against the base, exit 0 = identical/accepted>"
#   BUILD="<build command>" (default: npm run build)
# Each probe prints `TPROBE <id> <item> <PASS|FAIL|INFO> <detail>`.
set -u
T="$1"; cd "$T" || exit 9
BUILD="${BUILD:-npm run build}"
say() { echo "TPROBE $*"; }

# B-11 · one pin path: the gate refuses an alternate pin, refuses --no-pin, and names one pin file
out=$($SEAL --pin /nonexistent/pin.json 2>&1); rc=$?
if [ $rc -ne 0 ] && echo "$out" | grep -qiE "unknown|unrecognized|refus|no such option|not an option"; then say PIN-OPT B-11 PASS "--pin refused rc=$rc"
elif [ $rc -ne 0 ]; then say PIN-OPT B-11 INFO "--pin rc=$rc (failed, reason: $(echo "$out" | tail -1 | cut -c1-160))"
else say PIN-OPT B-11 FAIL "--pin accepted rc=0"; fi
out=$($SEAL --no-pin 2>&1); rc=$?
[ $rc -ne 0 ] && say NOPIN B-11 PASS "--no-pin rc=$rc: $(echo "$out" | tail -1 | cut -c1-160)" || say NOPIN B-11 FAIL "--no-pin accepted"
out=$(npm test -- --no-pin 2>&1 | tail -3); say NPMNOPIN B-11 INFO "npm test -- --no-pin tail: $(echo "$out" | tr '\n' ' ' | cut -c1-200)"
pins=$(git ls-files | grep -E 'pin[^/]*\.json$' | grep -v '^docs/tranches/BL/design/structure/pass-[1-3]/' | tr '\n' ' ')
say PIN-FILES B-11 INFO "tracked pin-like files: $pins"
# a second pin path: an env or alternate file the gate would read instead of its record
out=$(SURFACE_PIN=/nonexistent/pin.json PIN=/nonexistent/pin.json $SEAL 2>&1); rc=$?
say PIN-ENV B-11 INFO "gate with PIN env set rc=$rc"

# S-09 · the gate is deterministic and writes nothing
before=$(git status --porcelain | shasum -a 256); $SEAL >/dev/null 2>&1; rc1=$?; after=$(git status --porcelain | shasum -a 256)
[ "$before" = "$after" ] && say GATE-PURE S-09 PASS "gate rc=$rc1, tree unchanged" || say GATE-PURE S-09 FAIL "gate wrote to the tree"

# B-08 / P4-F7 · the cascade plant: reorder, build, judge; must be RED; then undo and rebuild
node "$(dirname "$0")/reorder.mjs" --root "$T"; rrc=$?
if [ $rrc -eq 0 ]; then
  $BUILD >/tmp/.crit-b-reorder-build.log 2>&1; brc=$?
  out=$($CASCADE 2>&1); crc=$?
  [ $crc -ne 0 ] && say REORDER B-08/S-10 PASS "build rc=$brc, cascade RED rc=$crc: $(echo "$out" | grep -iE 'risk|reorder|RED' | head -3 | tr '\n' ' ' | cut -c1-300)" \
                  || say REORDER B-08/S-10 FAIL "build rc=$brc, cascade GREEN on a property-sharing reorder"
  node "$(dirname "$0")/reorder.mjs" --root "$T" --undo "$T/.reorder-undo.json"; rm -f "$T/.reorder-undo.json"; $BUILD >/dev/null 2>&1
else say REORDER B-08/S-10 INFO "no @import-order pair to swap on this tree (rc=$rrc)"; fi
