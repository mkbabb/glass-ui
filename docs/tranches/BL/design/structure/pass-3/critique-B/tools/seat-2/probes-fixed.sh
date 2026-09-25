#!/usr/bin/env bash
# critique-B seat 2 · tree probes, MECHANICAL FIX of battery/seat-2/probes.sh written after the hash.
# The only change: line 25's case pattern takes a leading "(" (bash cannot parse a bare "pat)" inside $( )).
# Every probe and expectation is byte-identical to the hashed battery. `diff` against it shows the one line.
# usage: probes-fixed.sh <checkout> <replayed tree>
set -u
CO="$1"; T="$2"
P3="docs/tranches/BL/design/structure/pass-3"
say() { printf '%s\t%s\t%s\n' "$1" "$2" "$3"; }
cnt() { wc -l | tr -d ' '; }

# S-01 committed artifacts
say S-01 kit-files-tracked "$(git -C "$CO" ls-tree -r --name-only b602a59b -- "$P3/B-kit" | cnt)"
say S-01 proto-tracked "$(git -C "$CO" ls-tree -r --name-only b602a59b -- "$P3/B-proto.md" | cnt)"
say S-01 kit-dirty-now "$(git -C "$CO" status --porcelain -- "$P3/B-kit" "$P3/B-proto.md" | cnt)"
say S-01 kit-changed-since-b602 "$(git -C "$CO" diff --name-only b602a59b HEAD -- "$P3/B-kit" "$P3/B-proto.md" | cnt)"
say S-01 pass2-kit-tracked "$(git -C "$CO" ls-tree -r --name-only b602a59b -- docs/tranches/BL/design/structure/pass-2/kit | cnt)"

# S-02 the 7 hooks stay global
for h in useClipboard useDragVelocity useRAFLoop useYieldToMain useScrollChrome useScrollProgress useRoutePointer; do
  say S-02 "hook:$h" "$(cd "$T" && find src -name "$h.ts" -not -path '*/node_modules/*' | tr '\n' ' ')"
done

# S-03 R3: kind slots over 12 direct files
over=$(cd "$T" && find src demo scripts tests tests-visual -type d \( -name composables -o -name styles -o -name __tests__ \) -not -path '*/node_modules/*' 2>/dev/null | while read -r d; do
  case "$d" in (src/composables|src/styles|demo/styles|tests/styles) continue;; esac
  n=$(find "$d" -maxdepth 1 -type f | wc -l | tr -d ' '); [ "$n" -gt 12 ] && echo "$d:$n"; done | tr '\n' ' ')
say S-03 R3-slots-over-12 "${over:-none}"
# R4/R5 export keys
say S-03 R5-aurora-config-key "$(cd "$T" && node -e 'const p=require("./package.json");console.log(Object.keys(p.exports).includes("./aurora-config"))')"
# R6 @source globs that can reach __tests__ without a negation in the same file
say S-03 R6-source-lines "$(cd "$T" && grep -rn --include='*.css' -E '^\s*@source' src demo 2>/dev/null | cnt)"
say S-03 R6-source-not-tests "$(cd "$T" && grep -rn --include='*.css' -E '^\s*@source\s+not.*__tests__' src demo 2>/dev/null | cnt)"
# R7
for f in springProjection.ts useScrollScene.ts; do say S-03 "R7:$f" "$(cd "$T" && find src -name "$f" | tr '\n' ' ')"; done

# S-08 style doors, dist names, empty dirs
for f in src/styles/glass/index.css src/styles/theme/index.css src/styles/glass.css src/styles/theme.css; do say S-08 "exists:$f" "$([ -e "$T/$f" ] && echo yes || echo no)"; done
say S-08 empty-dirs "$(cd "$T" && find src scripts demo tests tests-visual -type d -empty -not -path '*/node_modules/*' 2>/dev/null | tr '\n' ' ')"

# S-11 floor home, docs references
say S-11 docs-refs "$(cd "$T" && grep -rln 'docs/tranches' package.json scripts src tests vite*.ts vitest*.ts 2>/dev/null | tr '\n' ' ')"
say S-11 tsconfig-build "$([ -e "$T/tsconfig.build.json" ] && echo present || echo absent)"

# B-08 accent-tone
say B-08 accent-tone "$(cd "$T" && find src -name 'accent-tone.css' | tr '\n' ' ')"
say B-08 accent-tone-importers "$(cd "$T" && grep -rln --include='*.css' --include='*.vue' --include='*.ts' 'accent-tone.css' src | tr '\n' ' ')"

# B-09 style kernel
sov=$(cd "$T" && find src/styles -type d | while read -r d; do n=$(find "$d" -maxdepth 1 -type f | wc -l | tr -d ' '); [ "$n" -gt 12 ] && echo "$d:$n"; done | tr '\n' ' ')
say B-09 styles-dirs-over-12 "${sov:-none}"
say B-09 styles-files-over-500 "$(cd "$T" && find src/styles -type f -exec wc -l {} + | awk '$2!="total" && $1>500{print $2":"$1}' | tr '\n' ' ')"

# B-10 step outcomes
say B-10 S7-SelectionValue "$(cd "$T" && grep -rln 'export.*\bSelectionValue\b' src --include='*.ts' | tr '\n' ' ')"
say B-10 S7-useSelectionGroup "$(cd "$T" && find src -name 'useSelectionGroup.ts' | tr '\n' ' ')"
say B-10 S11-src-files-over-500 "$(cd "$T" && find src -type f \( -name '*.ts' -o -name '*.vue' -o -name '*.css' \) -not -name 'index.ts' -exec wc -l {} + | awk '$2!="total" && $1>500' | cnt)"
say B-10 S11-src-index-ts-lines "$(wc -l < "$T/src/index.ts" | tr -d ' ')"
say B-10 S14-manifest "$(cd "$T" && find demo -name 'manifest*.ts' -exec wc -l {} + | tr '\n' ' ')"
dov=$(cd "$T" && find demo src scripts tests tests-visual -type d -not -path '*/node_modules/*' -not -path '*/.cache*' 2>/dev/null | while read -r d; do n=$(find "$d" -maxdepth 1 -type f | wc -l | tr -d ' '); [ "$n" -gt 12 ] && echo "$d:$n"; done | tr '\n' ' ')
say B-10 dirs-over-12-all-zones "${dov:-none}"
say B-10 S15-scripts-lib-door "$([ -e "$T/scripts/lib/index.mjs" ] && echo yes || echo no)"
say B-10 S15-scripts-over-500 "$(cd "$T" && find scripts -type f \( -name '*.mjs' -o -name '*.ts' -o -name '*.sh' \) -exec wc -l {} + | awk '$2!="total" && $1>500{print $2":"$1}' | tr '\n' ' ')"
say B-10 S13-tests-slots "$(cd "$T" && find src scripts demo -type d -name __tests__ | cnt)"
say B-10 S16-tests-visual-top "$(find "$T/tests-visual" -maxdepth 1 -type f | cnt)"
say B-10 all-zones-files-over-500 "$(cd "$T" && find src demo scripts tests tests-visual -type f \( -name '*.ts' -o -name '*.vue' -o -name '*.mjs' -o -name '*.css' \) -not -path '*/node_modules/*' -not -path '*/.cache/*' -exec wc -l {} + | awk '$2!="total" && $1>500{print $2":"$1}' | tr '\n' ' ')"

# B-11
say B-11 no-pin-in-package-json "$(grep -c -- '--no-pin' "$T/package.json")"

# B-12 doors
say B-12 index-doors "$(cd "$T" && find src scripts -type f \( -name 'index.ts' -o -name 'index.mjs' -o -name 'index.css' \) -not -path '*/node_modules/*' | cnt)"
say B-12 index-door-bytes "$(cd "$T" && find src scripts -type f \( -name 'index.ts' -o -name 'index.mjs' -o -name 'index.css' \) -not -path '*/node_modules/*' -exec cat {} + | wc -c | tr -d ' ')"
