#!/usr/bin/env bash
# crash8.sh <tree> · critique-B pass 8 · S-14 / P6-R3 / P7-G1: "a throw in every phase the gate passes through ...
# Each exits 2" (REGISTRY §P7-6.4). Written and hashed BEFORE reading pass-8/B-kit. Every case restores what it
# touched byte for byte (copies under $CRIT_TMP) and checks the restore with a sha256 of the touched file.
# Phases: module evaluation (a non-JSON package.json; a missing package.json; a module-scope throw planted in EVERY
# module the gate loads, gate-modules.mjs; an unhandled rejection at module scope), main() (ledger missing, --root
# absent, an unparsable source recorded), record write (--json under a regular file, --json into a read-only dir).
# Prints `CRASH <id> <PASS|FAIL|INFO> rc=<n> expect=<n> :: <first stderr line>` and a summary line.
set -u
T="$1"; cd "$T" || exit 9
HERE="$(cd "$(dirname "$0")" && pwd)"
SEAL="${SEAL_REL:-scripts/structure/seal/seal.mjs}"
TMP="${CRIT_TMP:-/tmp}/crash8.$$"; mkdir -p "$TMP"
run() { node "$SEAL" --root "${1:-.}" --json "${2:-$TMP/v.json}" >"$TMP/out.log" 2>"$TMP/err.log"; echo $?; }
first() { (grep -v '^\s*$' "$TMP/err.log"; grep -v '^\s*$' "$TMP/out.log") | grep -iE 'error|throw|cannot|no |missing|invalid|unexpected|ENOENT|EACCES|crash|zq8' | head -1 | cut -c1-200; }
P=0; F=0
say() { local id="$1" rc="$2" exp="$3" kind="${4:-}"; if [ "$kind" = info ]; then echo "CRASH $id INFO rc=$rc :: $(first)";
  elif [ "$rc" = "$exp" ]; then P=$((P+1)); echo "CRASH $id PASS rc=$rc expect=$exp :: $(first)"; else F=$((F+1)); echo "CRASH $id FAIL rc=$rc expect=$exp :: $(first)"; fi; }
sha() { shasum -a 256 "$1" | cut -c1-16; }
restore() { cp "$2" "$1"; [ "$(sha "$1")" = "$3" ] || echo "CRASH RESTORE-FAIL $1"; }

say C0-green "$(run .)" 0
# ---- RED (1): a placeholder split name beside GlassDock (B15)
D=$(dirname "$(find src -name GlassDock.vue -not -path '*/__tests__/*' | head -1)")
echo 'export const zq8CrashRed = 1;' > "$D/bs11.ts"; say C1-red "$(run .)" 1; rm -f "$D/bs11.ts"
# ---- module evaluation
h=$(sha package.json); cp package.json "$TMP/pkg"
printf '{ "name": "@mkbabb/glass-ui", BROKEN\n' > package.json; say M1-pkg-not-json "$(run .)" 2; restore package.json "$TMP/pkg" "$h"
rm package.json; say M2-pkg-missing "$(run .)" 2; restore package.json "$TMP/pkg" "$h"
: > package.json; say M3-pkg-empty "$(run .)" 2; restore package.json "$TMP/pkg" "$h"
i=0
for m in $(node "$HERE/gate-modules.mjs" . "$SEAL"); do
  i=$((i+1)); hm=$(sha "$m"); cp "$m" "$TMP/mod"
  node -e 'const fs=require("fs");const f=process.argv[1];let t=fs.readFileSync(f,"utf8");let sb="";if(t.startsWith("#!")){const n=t.indexOf("\n");sb=t.slice(0,n+1);t=t.slice(n+1);}fs.writeFileSync(f,sb+"throw new Error(\"zq8 module-scope throw in "+f+"\");\n"+t);' "$m"
  if [ "$m" = "$SEAL" ]; then say "M4.$i-throw:$m" "$(run .)" 2 info; else say "M4.$i-throw:$m" "$(run .)" 2; fi
  restore "$m" "$TMP/mod" "$hm"
done
echo "CRASH M4 modules planted: $i"
# an unhandled rejection at module scope of the second module the gate loads (a floor module, not the CLI)
m2=$(node "$HERE/gate-modules.mjs" . "$SEAL" | sed -n 2p)
if [ -n "$m2" ]; then hm=$(sha "$m2"); cp "$m2" "$TMP/mod2"
  node -e 'const fs=require("fs");const f=process.argv[1];const t=fs.readFileSync(f,"utf8");fs.writeFileSync(f,t+"\nPromise.reject(new Error(\"zq8 unhandled rejection in "+f+"\"));\n");' "$m2"
  say "M5-unhandled-rejection:$m2" "$(run .)" 2; restore "$m2" "$TMP/mod2" "$hm"
  node -e 'const fs=require("fs");const f=process.argv[1];const t=fs.readFileSync(f,"utf8");fs.writeFileSync(f,t+"\nsetTimeout(() => { throw new Error(\"zq8 deferred throw in "+f+"\"); }, 0);\n");' "$m2"
  say "M6-deferred-throw:$m2" "$(run .)" 2; restore "$m2" "$TMP/mod2" "$hm"
fi
# ---- main()
L=$(find scripts -name opaque-ledger.json -not -path '*/node_modules/*' | head -1)
if [ -n "$L" ]; then h=$(sha "$L"); cp "$L" "$TMP/ledger"; rm "$L"; say R1-ledger-missing "$(run .)" 2; restore "$L" "$TMP/ledger" "$h"; else echo "CRASH R1 INFO no opaque-ledger.json on the tree"; fi
if [ -n "$L" ]; then h=$(sha "$L"); cp "$L" "$TMP/ledger"; printf '{"broken":' > "$L"; say R2-ledger-not-json "$(run .)" 2; restore "$L" "$TMP/ledger" "$h"; fi
say R3-noroot "$(run "$TMP/does-not-exist")" 2
D2=$(dirname "$(find src -name Chip.vue -not -path '*/__tests__/*' | head -1)")
printf 'export const = ;\nimport {\n' > "$D2/zq8Unparsable.ts"; say R4-unparsable "$(run .)" - info; rm -f "$D2/zq8Unparsable.ts"
# ---- record write
say W1-json-under-file "$(run . "$T/package.json/v.json")" 2
mkdir -p "$TMP/ro"; chmod 555 "$TMP/ro"; say W2-json-readonly-dir "$(run . "$TMP/ro/v.json")" 2; chmod 755 "$TMP/ro"
say C9-green-again "$(run .)" 0
echo "CRASH SUMMARY pass=$P fail=$F"
rm -rf "$TMP"
