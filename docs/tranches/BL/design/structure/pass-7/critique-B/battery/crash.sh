#!/usr/bin/env bash
# crash.sh <tree> · critique-B pass 7 · S-14 / P6-R3: the gate's own exit. Written and hashed BEFORE reading
# pass-7/B-kit. P6-R3 (a): 0 GREEN, 1 RED, 2 an uncaught throw. Each case restores what it touched byte for byte
# (copies under $CRIT_TMP) and checks the restore with a sha256 of the touched file.
# Prints `CRASH <id> <PASS|FAIL|INFO> rc=<n> expect=<n> :: <first stderr line>`.
set -u
T="$1"; cd "$T" || exit 9
SEAL="${SEAL_REL:-scripts/structure/seal/seal.mjs}"
TMP="${CRIT_TMP:-/tmp}/crash7.$$"; mkdir -p "$TMP"
run() { node "$SEAL" --root "${1:-.}" --json "$TMP/v.json" >"$TMP/out.log" 2>"$TMP/err.log"; echo $?; }
first() { (grep -v '^\s*$' "$TMP/err.log"; grep -v '^\s*$' "$TMP/out.log") | grep -iE 'error|throw|cannot|no |missing|invalid|unexpected|ENOENT|crash' | head -1 | cut -c1-200; }
say() { local id="$1" rc="$2" exp="$3" kind="${4:-}"; if [ "$kind" = info ]; then echo "CRASH $id INFO rc=$rc :: $(first)";
  elif [ "$rc" = "$exp" ]; then echo "CRASH $id PASS rc=$rc expect=$exp :: $(first)"; else echo "CRASH $id FAIL rc=$rc expect=$exp :: $(first)"; fi; }
sha() { shasum -a 256 "$1" | cut -c1-16; }

# C0 · GREEN tree
say C0-green "$(run .)" 0
# C1 · RED: a placeholder split name beside GlassDock (B15, pass-6 PH6 shape)
D=$(dirname "$(find src -name GlassDock.vue -not -path '*/__tests__/*' | head -1)")
echo 'export const zq7CrashRed = 1;' > "$D/bs11.ts"; say C1-red "$(run .)" 1; rm -f "$D/bs11.ts"
# C2 · a floor record missing: the opaque ledger moved aside (pass-6 critic's P6-F3 probe read exit 1 here)
L=$(find scripts -name opaque-ledger.json -not -path '*/node_modules/*' | head -1)
if [ -n "$L" ]; then h=$(sha "$L"); cp "$L" "$TMP/ledger"; rm "$L"; say C2-ledger "$(run .)" 2; cp "$TMP/ledger" "$L"; [ "$(sha "$L")" = "$h" ] || echo "CRASH C2 RESTORE-FAIL"; else echo "CRASH C2-ledger INFO no opaque-ledger.json on the tree"; fi
# C3 · package.json is not JSON
h=$(sha package.json); cp package.json "$TMP/pkg"; printf '{ "name": "@mkbabb/glass-ui", BROKEN\n' > package.json
say C3-pkgjson "$(run .)" 2; cp "$TMP/pkg" package.json; [ "$(sha package.json)" = "$h" ] || echo "CRASH C3 RESTORE-FAIL"
# C4 · --root names no directory
say C4-noroot "$(run "$TMP/does-not-exist")" 2
# C5 · --json cannot be written (a path under a regular file)
node "$SEAL" --root . --json "$T/package.json/v.json" >"$TMP/out.log" 2>"$TMP/err.log"; say C5-jsonpath "$?" 2
# C6 · a source file that does not parse (a verdict or a crash: recorded, not judged)
D2=$(dirname "$(find src -name Chip.vue -not -path '*/__tests__/*' | head -1)")
printf 'export const = ;\nimport {\n' > "$D2/zq7Unparsable.ts"; say C6-unparsable "$(run .)" - info; rm -f "$D2/zq7Unparsable.ts"
# C7 · GREEN again after every case
say C7-green-again "$(run .)" 0
rm -rf "$TMP"
