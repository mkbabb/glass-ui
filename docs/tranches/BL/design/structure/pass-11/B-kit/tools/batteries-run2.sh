#!/usr/bin/env bash
# batteries-run2.sh <built replayed tree> <unbuilt replayed tree> <floor-base tree, built> <scratch> — the second run of the
# four families whose first run (results/p11/*-run1.*) read a defect that was not the kit's verdict: plants-p10 and
# plants-p9 each matched an earlier message by substring (exit 2 as expected; the cured judges' messages now carry the
# old phrase as well), plants-p11 is re-run on the same judges, and fix10 ran with its HERE path one level short
# (tools/repointed/pass-10-fix10.sh, corrected; the diff is in tools/repointed/DIFF.txt).
set -u
T="$1"; U="$2"; BASE="$3"; S="$4"; mkdir -p "$S"
HERE="$(cd "$(dirname "$0")" && pwd)"; KIT="$(dirname "$HERE")"; R="$KIT/results/p11"; B="$R/browser"
load() { sysctl -n vm.loadavg; }
digest() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$KIT/lib/digest.mjs" "$T"; }
fam() { local name="$1"; shift; { echo "$name start $(date -u +%FT%TZ) load $(load)"; "$@"; echo "$name rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/$name.txt" 2>&1; echo "after $name (run 2): $(digest)" >> "$R/digest-after-batteries.txt"; }
fam plants-p11 node "$HERE/plants-p11.mjs" --root "$T" --floor-base "$BASE" --reports "$B" --probe-base "$R/peer-closure-base.json" --out "$R/plants-p11.json"
fam plants-p10 node "$HERE/plants-p10.mjs" --root "$T" --floor-base "$BASE" --reports "$B" --out "$R/plants-p10.json"
fam plants-p9 node "$HERE/plants-p9.mjs" --root "$T" --reports "$B" --out "$R/plants-p9.json"
fam fix10 bash "$HERE/repointed/pass-10-fix10.sh" "$KIT" "$T" "$S/fix10-run2" "$R/critic10"
