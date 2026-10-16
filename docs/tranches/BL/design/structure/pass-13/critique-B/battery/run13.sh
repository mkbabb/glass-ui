#!/usr/bin/env bash
# run13.sh <KIT dir (the worktree's copy)> <built replayed tree> <unbuilt replayed clone> <built floor-base clone>
#          <scratch> <results dir> · critique-B pass 13 · written and hashed BEFORE reading pass-13/B-kit or B-proto.md.
# One sequential process. This seat's families, then every earlier critic's battery as regression, by path:
#   judges13      this seat's KIND x SLOT, F6' (last key), F7, PAIR, DELALL (judges13.sh)
#   extent13      the extent sweep's other rows: rekey, browser-select, peer-closure --base / --floor-base, SEQUENCE.json
#                 absent (extent13.sh)
#   p12-battery   pass 12's hashed run12.sh (c6fdf555…) by path, with its four-argument tree signature: judges12,
#                 browser12 (the browser bar: BW1-BW8, 428/428 through the kit tally and tally12.mjs), and through
#                 run11.sh (317fd849…) every earlier hashed battery: pass 10 (7b7b5303…: every kit judge's every input
#                 missing / non-JSON / {} / [] / another kind / right-schema-wrong-kind → 2; the ./motion-core leak with
#                 each degenerate --base; the PR peer-less / whitespace Peer / no-subpath rows; PC/PCG/PCX), pass 9
#                 (748826fb…), pass 8's plants, the 402-row set (passes 4-7), crash8, tree-probes; p10-post (plants10b
#                 PD-* P9-R1, fix10b P9-R2 MIGRATION, fd4); then pass 11's f7.sh (re-pointed at this kit's browser dir,
#                 diff printed). run12's own route-batt family looks for tools/batteries.sh, which no kit ships since pass
#                 11 (cB12 I-3); this seat runs the route's runner below
#   route-batt    the kit's own committed tools/batteries*.sh (the newest by name), four arguments: built, unbuilt, floor
#                 base, scratch (cB12 I-3); INFO, judged in critique-B.md; the diff it leaves on the kit's results printed
# Each family writes <results>/<name>.txt with start/end load; the code digest is appended to digest-after.txt after every
# family, so a battery that leaves a byte behind shows.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; U="$(cd "$3" && pwd)"; FBT="$(cd "$4" && pwd)"; S="$5"; R="$6"
mkdir -p "$S" "$R"; S="$(cd "$S" && pwd)"; R="$(cd "$R" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"; ST="$HERE/../../.."
load() { sysctl -n vm.loadavg; }
digest() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$T"; }
fam() { local name="$1"; shift; { echo "$name start $(date -u +%FT%TZ) load $(load)"; "$@"; echo "$name rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/$name.txt" 2>&1; echo "after $name: $(digest)" >> "$R/digest-after.txt"; }
h() { (cd "$1" && cat $(ls | sort) | shasum -a 256 | cut -c1-64); }
echo "before: $(digest)" > "$R/digest-after.txt"
echo "battery hashes (sorted cat | sha256): this $(h "$HERE"); p12 $(h "$ST/pass-12/critique-B/battery"); p11 $(h "$ST/pass-11/critique-B/battery"); p10 $(h "$ST/pass-10/critique-B/battery"); p9 $(h "$ST/pass-9/critique-B/battery")" >> "$R/digest-after.txt"
fam judges13 bash "$HERE/judges13.sh" "$K" "$T" "$S"
fam extent13 bash "$HERE/extent13.sh" "$K" "$T" "$U" "$FBT" "$S"
mkdir -p "$R/p12-regress"
fam p12-battery bash "$ST/pass-12/critique-B/battery/run12.sh" "$K" "$T" "$U" "$FBT" "$S/p12" "$R/p12-regress"
routebatt() {
  local RBS; RBS=$(ls "$K"/tools/batteries*.sh 2>/dev/null | sort | tail -1)
  [ -n "$RBS" ] || { echo "no tools/batteries*.sh in the kit"; return 0; }
  echo "route runner ${RBS#$K/}"; sed -n '1,3p' "$RBS"
  bash "$RBS" "$T" "$U" "$FBT" "$S/rb"; echo "route runner rc=$?"
  echo "== the kit's results after the route's runner, against the committed bytes"
  git -C "$T" diff --stat -- "${K#$T/}/results" | tail -40
  git -C "$T" status --porcelain --untracked-files=all -- "${K#$T/}/results" | head -40
}
fam route-batt-INFO routebatt
echo "battery end $(date -u +%FT%TZ) load $(load)" >> "$R/digest-after.txt"
