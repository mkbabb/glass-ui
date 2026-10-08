#!/usr/bin/env bash
# sfc-relist.sh <replayed tree> <scratch dir> · critique-B pass 6 · written after the hash, not part of it.
# The hashed tree-probes.sh transcribed its SFC-keep listing from the NO-listing verify, which prints `content changed`
# and no UNLISTED line, so its listed run carried scopes and an empty rung (a battery procedure defect). This is the
# procedure the floor states (FLOOR-P6 §4.2): verify with `scopes` only, transcribe the UNLISTED rules with the floor
# seat's pass-6/tools/listing.mjs, verify with the full listing. Value mode re-uses the keep listing (the reviewer
# listed the move, not the value). Exactly the commands run on 2026-10-08 for RESULTS.md §3.
set -u
T="$1"; S="$2"; cd "$T" || exit 9
HERE="$(cd "$(dirname "$0")" && pwd)"; B="$HERE/../.."
V() { node scripts/structure/cascade.mjs verify --root . --baseline "$S/crit6-snap-sfc" --dist dist "$@"; }
npx vite build > "$S/b0.log" 2>&1 && node scripts/structure/cascade.mjs snapshot --root . --dist dist --out "$S/crit6-snap-sfc"
node "$B/critique-B/battery/sfc-split.mjs" --root . --mode keep | grep '^SCOPES ' | sed 's/^SCOPES //' > "$S/scopes-only.json"
npx vite build > "$S/b-keep.log" 2>&1; echo "build $?"
V > "$S/v-none.log" 2>&1; echo "none rc $?"
V --reorders "$S/scopes-only.json" > "$S/v-scopes.log" 2>&1; echo "scopes-only rc $?"
node "$B/tools/listing.mjs" "$S/v-scopes.log" "$S/scopes-only.json" "$S/listing-keep.json" "critic plant: SFC split"
V --reorders "$S/listing-keep.json" > "$S/v-listed.log" 2>&1; echo "listed rc $?"
node "$B/critique-B/battery/sfc-split.mjs" --root . --undo .crit-sfc-undo.json; rm -f .crit-sfc-undo.json
node "$B/critique-B/battery/sfc-split.mjs" --root . --mode value > /dev/null && npx vite build > "$S/b-value.log" 2>&1
V --reorders "$S/listing-keep.json" > "$S/v-value.log" 2>&1; echo "value-listed rc $?"
node "$B/critique-B/battery/sfc-split.mjs" --root . --undo .crit-sfc-undo.json; rm -f .crit-sfc-undo.json
npx vite build > "$S/b-restore.log" 2>&1; echo '{}' > "$S/empty.json"; V --reorders "$S/empty.json" > /dev/null 2>&1; echo "restore rc $?"
grep -hE '^(SCOPE|UNLISTED)|"verdict"' "$S/v-none.log" "$S/v-scopes.log" "$S/v-listed.log" "$S/v-value.log"
