#!/usr/bin/env bash
# tree-probes.sh <tree> · critique-B pass 6 · command-level probes. Written and hashed BEFORE reading pass-6/B-kit.
# The route's commands are passed in, never guessed into the battery:
#   SEAL="<route gate on the tree; exit 0 = GREEN>"
#   CASCADE_SNAP="<cmd writing a cascade snapshot of <tree>/dist to \$SNAP>"                 (called with SNAP set)
#   CASCADE_VERIFY="<cmd verifying <tree>/dist against \$SNAP; listing read from \$LIST>"    (LIST may be /dev/null-ish)
#   LISTING="<the route's own reorder listing>" (for pass 5's regression probes)
#   BUILD="<build command>" (default: npm run build)
# Prints `TPROBE <id> <item> <PASS|FAIL|INFO> <detail>`.
set -u
T="$1"; cd "$T" || exit 9
HERE="$(cd "$(dirname "$0")" && pwd)"
P5="$HERE/../../../pass-5/critique-B/battery"
BUILD="${BUILD:-npm run build}"
LOGD="${CRIT_TMP:-/tmp}"
say() { echo "TPROBE $*"; }

# ---- regression: pass 5's command probes (PIN-OPT, NOPIN, OFFSWITCH, GATE-PURE, CSS-DIST, PW-PROGRAM, REORDER acc/out,
#      CASCADE-RESTORE, RATCHET), run from pass 5's committed bytes
if [ "${SKIP_P5:-0}" != "1" ]; then
  LIST="${LISTING:-}" CASCADE_VERIFY="${CASCADE_VERIFY:-}" bash "$P5/tree-probes.sh" "$T" 2>&1 | sed 's/^TPROBE /TPROBE P5:/'
fi

# ---- S-10 · P6-F1: an SFC style split on a component the route did not split
if [ -n "${CASCADE_SNAP:-}" ] && [ "${SKIP_SFC:-0}" != "1" ]; then
  $BUILD >"$LOGD/crit6-build0.log" 2>&1 || say SFC-BASE S-10 FAIL "base build rc=$?"
  export SNAP="$LOGD/crit6-snap-sfc"; rm -rf "$SNAP"
  eval "$CASCADE_SNAP" >"$LOGD/crit6-snap.log" 2>&1 || say SFC-SNAP S-10 FAIL "snapshot rc=$?"
  echo '{}' > "$LOGD/crit6-empty-listing.json"   # amendment 1: the restore verify reads it even when no split ran
  for mode in keep value; do
    out=$(node "$HERE/sfc-split.mjs" --root "$T" --mode "$mode"); src=$?
    echo "$out" | sed 's/^/   /'
    if [ $src -ne 0 ]; then say "SFC-$mode" S-10 INFO "no candidate rc=$src"; continue; fi
    echo "$out" | grep '^SCOPES ' | sed 's/^SCOPES //' > "$LOGD/crit6-scopes.json"
    $BUILD >"$LOGD/crit6-build-$mode.log" 2>&1; brc=$?
    export LIST="$LOGD/crit6-empty-listing.json"; echo '{}' > "$LIST"
    v0=$(eval "$CASCADE_VERIFY" 2>&1); r0=$?; echo "$v0" > "$LOGD/crit6-verify-$mode-unlisted.log"
    # the listing a route would write: scopes + every UNLISTED rule (transcribed, as P5-F3's procedure says)
    node -e '
      const fs=require("fs");const [v,s,o]=process.argv.slice(1);const by=new Map();
      for(const l of fs.readFileSync(v,"utf8").split("\n")){const m=/^UNLISTED (\S+) (.*)$/.exec(l);if(m)(by.get(m[1])??by.set(m[1],[]).get(m[1])).push(JSON.parse(m[2]));}
      const {scopes}=JSON.parse(fs.readFileSync(s,"utf8"));
      fs.writeFileSync(o,JSON.stringify({scopes,reorders:[...by].map(([entry,moved])=>({entry,moved,reason:"critic plant: SFC split"}))},null,1));
      console.log("listing "+scopes.length+" scope(s), "+[...by].map(([e,m])=>e+" "+m.length).join(", "));' \
      "$LOGD/crit6-verify-$mode-unlisted.log" "$LOGD/crit6-scopes.json" "$LOGD/crit6-listing-$mode.json" | sed 's/^/   /'
    # a value-mode listing is the keep-mode one when present (the reviewer listed the move, not the value)
    if [ "$mode" = "value" ] && [ -f "$LOGD/crit6-listing-keep.json" ]; then export LIST="$LOGD/crit6-listing-keep.json"; else export LIST="$LOGD/crit6-listing-$mode.json"; fi
    v1=$(eval "$CASCADE_VERIFY" 2>&1); r1=$?; echo "$v1" > "$LOGD/crit6-verify-$mode-listed.log"
    grep -E '^(SCOPE|SCOPE-REFUSED|RISK|COVERED)' "$LOGD/crit6-verify-$mode-listed.log" | head -6 | sed 's/^/   /'
    vv=$(grep -o '"verdict": "[^"]*"' "$LOGD/crit6-verify-$mode-listed.log" | sort | uniq -c | tr '\n' ' ' | cut -c1-300)
    if [ "$mode" = keep ]; then
      [ $r0 -ne 0 ] && [ $r1 -eq 0 ] && say SFC-keep S-10 PASS "build rc=$brc; unlisted RED rc=$r0, listed GREEN rc=$r1" \
                                     || say SFC-keep S-10 FAIL "build rc=$brc; unlisted rc=$r0, listed rc=$r1 :: $vv"
    else
      [ $r1 -ne 0 ] && echo "$v1" | grep -q 'content changed' && say SFC-value S-10 PASS "build rc=$brc; listed rc=$r1 content changed" \
                                     || say SFC-value S-10 FAIL "build rc=$brc; listed rc=$r1 :: $vv"
    fi
    node "$HERE/sfc-split.mjs" --root "$T" --undo "$T/.crit-sfc-undo.json"; rm -f "$T/.crit-sfc-undo.json"
  done
  $BUILD >"$LOGD/crit6-rebuild.log" 2>&1; export LIST="$LOGD/crit6-empty-listing.json"
  v=$(eval "$CASCADE_VERIFY" 2>&1); r=$?
  [ $r -eq 0 ] && say SFC-RESTORE S-10 PASS "restored tree verifies against its own snapshot" || say SFC-RESTORE S-10 FAIL "rc=$r"
fi

# ---- S-10 · P6-F2: FD-4's coverage arm counts the carved readback spec; a spec moved out from under it fails loud
node "$HERE/fd4-probe.mjs" --root "$T" ${FD4_REPORT:+--report "$FD4_REPORT"} 2>&1 | sed 's/^/   /'
[ "${PIPESTATUS[0]}" = 0 ] && say FD4 S-10 PASS "arms A, G, G2, U as expected" || say FD4 S-10 FAIL "see arms above"

# ---- census (gate-independent)
node "$HERE/probes.mjs" --root "$T" --out "$LOGD/crit6-probes.json" | grep -E '^PROBE|^   ' | head -400
