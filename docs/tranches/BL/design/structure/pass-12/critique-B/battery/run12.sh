#!/usr/bin/env bash
# run12.sh <KIT dir (the worktree's copy)> <built replayed tree> <unbuilt replayed tree> <built floor-base tree> <scratch>
#          <results dir> · critique-B pass 12 · written and hashed BEFORE reading pass-12/B-kit or pass-12/B-proto.md.
# One sequential process. This battery's families, then every earlier critic's battery as regression, by path from
# committed bytes (never copied, except where a hard-coded kit path must be re-pointed: the copy is in scratch and its
# diff is printed):
#   judges12      §P11-6.4's plants: KIND x EXTENT in tally's four slots and rekey's base, F6 through every row, F7's ten
#                 rows, the touched-spec pairs on their own and F6's analogue, DEL, MAP, INFO extents (judges12.sh)
#   browser12     the browser bar through the cured tally and this seat's reader (browser12.sh, tally12.mjs)
#   p11-battery   pass 11's hashed run11.sh (317fd849…) by path: judges11 (KIND 16 kinds, F6, FLAG, DUP), floor-landed,
#                 browser11, and through it pass 10's run10.sh (7b7b5303…: judges10 missing/non-JSON/wrong-schema/
#                 right-schema-wrong-kind on every judge input, the ./motion-core leak with each degenerate --base, the
#                 PR peer-less / whitespace Peer / no-subpath rows, PC/PCG/PCX plants, migration10, browser10), which runs
#                 pass 9's run-battery.sh (748826fb…: pass 8's plants, the 402-row set carrying passes 4-7, crash8,
#                 tree-probes 5-7); then p10-post (plants10b PD-* P9-R1, fix10b P9-R2 MIGRATION, fd4 re-pointed)
#   p11-post      pass 11's post-hash tools by path: tools/f7.sh (its kit path results/p11/browser re-pointed to this kit's
#                 committed browser dir when it differs; diff printed)
#   route-batt    the kit's own committed tools/batteries.sh with the four-argument signature §P11-6.4 names (built,
#                 unbuilt, floor base, scratch); it writes into the worktree's copy of the kit, and the diff of its
#                 outputs against the committed ones is printed (INFO: its claims are the route's)
# Each family writes <results>/<name>.txt with start/end load; the code digest is appended to digest-after.txt after every
# family, so a battery that leaves a byte behind shows.
set -u
K="$(cd "$1" && pwd)"; T="$(cd "$2" && pwd)"; U="$(cd "$3" && pwd)"; FBT="$(cd "$4" && pwd)"; S="$5"; R="$6"
mkdir -p "$S" "$R"; S="$(cd "$S" && pwd)"; R="$(cd "$R" && pwd)"
HERE="$(cd "$(dirname "$0")" && pwd)"; ST="$HERE/../../.."; P11="$ST/pass-11/critique-B"
load() { sysctl -n vm.loadavg; }
digest() { node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`digest ${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$T"; }
fam() { local name="$1"; shift; { echo "$name start $(date -u +%FT%TZ) load $(load)"; "$@"; echo "$name rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/$name.txt" 2>&1; echo "after $name: $(digest)" >> "$R/digest-after.txt"; }
export CRIT_TMP="$S" KIT="$K"
echo "before: $(digest)" > "$R/digest-after.txt"
echo "battery hashes (sorted cat | sha256): this $(cd "$HERE" && cat $(ls | sort) | shasum -a 256 | cut -c1-16); p11 $(cd "$P11/battery" && cat $(ls | sort) | shasum -a 256 | cut -c1-16); p10 $(cd "$ST/pass-10/critique-B/battery" && cat $(ls | sort) | shasum -a 256 | cut -c1-16); p9 $(cd "$ST/pass-9/critique-B/battery" && cat $(ls | sort) | shasum -a 256 | cut -c1-16)" >> "$R/digest-after.txt"
fam judges12 bash "$HERE/judges12.sh" "$K" "$T" "$S"
fam browser12 bash "$HERE/browser12.sh" "$K" "$T" "$FBT" "$S"
mkdir -p "$R/p11-regress"
fam p11-battery bash "$P11/battery/run11.sh" "$K" "$T" "$S/p11" "$R/p11-regress"
p11post() {
  local BRK; BRK="$(dirname "$(find "$K/results" -name route.json -path '*browser*' -not -path '*steps*' -not -path '*-p9*' | sort | tail -1)")"
  mkdir -p "$S/p11post"
  if [ "$BRK" = "$K/results/p11/browser" ]; then echo "f7.sh by path (kit holds results/p11/browser)"; bash "$P11/tools/f7.sh" "$K" "$T" "$S/p11post"
  else sed "s#BR=\"\$K/results/p11/browser\"#BR=\"$BRK\"#" "$P11/tools/f7.sh" > "$S/p11post/f7.sh"; diff "$P11/tools/f7.sh" "$S/p11post/f7.sh"
    bash "$S/p11post/f7.sh" "$K" "$T" "$S/p11post"; fi
}
fam p11-post p11post
routebatt() {
  [ -f "$K/tools/batteries.sh" ] || { echo "no tools/batteries.sh in the kit"; return 0; }
  sed -n '1,4p' "$K/tools/batteries.sh"
  bash "$K/tools/batteries.sh" "$T" "$U" "$FBT" "$S/rb"; echo "batteries.sh rc=$?"
  echo "== route results rewritten by the route's battery, against the committed bytes (git diff --stat, the worktree's kit)"
  git -C "$T" diff --stat -- "${K#$T/}/results" | tail -40
  git -C "$T" status --porcelain --untracked-files=all -- "${K#$T/}/results" | head -40
}
fam route-batt-INFO routebatt
echo "battery end $(date -u +%FT%TZ) load $(load)" >> "$R/digest-after.txt"
