#!/bin/sh
# p3-tree-plants.sh <before|after> <scratch dir> [plant id…] — the tree half of the P3 floor
# battery. Each plant gets a fresh linked worktree at $BASE and the floor chain of its arm:
#   before  $BASE with its own floor and its own rows (HEAD's f3, f4, m02, m03, f9)
#   after   $BASE + the P3 floor (the checkout's), cut by the P3 chain (…, fd6, fd7, fd11)
# then runs the plant's commands and prints one verdict line per plant: CAUGHT when the
# floor under test did what the P3 item requires, MISSED when it did not. Every command and
# its output go to <scratch>/<arm>/<plant>.log; the verdict lines go to stdout.
# Plants: F2 F5a F5b F5c F5d F6 F7b F7c F8a F8b F8d F9 (default: all).
set -u
ARM=$1; OUT=$2; shift 2
REPO=$(git -C "$(dirname "$0")" rev-parse --show-toplevel)
P3=$REPO/docs/tranches/BL/design/structure/pass-3
FL=docs/tranches/BL/design/structure/floor
LISTS=$P3/plants/lists
BASE=${BASE:-a54b64d6}
PLANTS=${*:-F2 F5a F5b F5c F5d F6 F7b F7c F8a F8b F8d F9}
mkdir -p "$OUT/$ARM"
WT=$OUT/$ARM/wt

say() { printf '%s\n' "$*" >> "$LOG"; }
run() { say "\$ $*"; ( "$@" ) >> "$LOG" 2>&1; rc=$?; say "[exit $rc]"; return $rc; }
verdict() { printf '%-7s %-5s %s\n' "$1" "$2" "$3"; say "VERDICT $1 $2 — $3"; }
list() { if [ "$ARM" = before ] && [ -f "$LISTS/$1.before.json" ]; then echo "$LISTS/$1.before.json"; else echo "$LISTS/$1.json"; fi; }

cut_tree() {
    if [ "$ARM" = before ]; then
        run "$P3/tools/fresh.sh" "$WT" --at "$BASE"
        run node "$WT/$FL/rows/apply.mjs" --root "$WT"
        FT=$WT/$FL
    else
        run "$P3/tools/fresh.sh" "$WT" --floor --at "$BASE"
        run node "$REPO/$FL/rows/apply.mjs" --root "$WT"
        FT=$WT/scripts/structure
    fi
}
digest() { node -e 'const [f,r]=process.argv.slice(1);Promise.all([import(f+"/lib/move.mjs"),import(f+"/lib/tree.mjs")]).then(([m,t])=>console.log(m.treeDigest(r,t.openTree(r).files)))' "$1" "$WT"; }

for PLANT in $PLANTS; do
    LOG=$OUT/$ARM/$PLANT.log; : > "$LOG"
    say "# $PLANT · arm $ARM · base $BASE · $(date -u +%FT%TZ)"
    cut_tree
    cd "$WT" || exit 2
    case $PLANT in
    F2)
        run node "$FT/move.mjs" "$(list f2-coupling)" --root "$WT"; rc=$?
        if [ $rc -ne 0 ] && grep -q "FD-2 CO-CYCLIC" "$LOG"; then verdict CAUGHT F2 "the coupling move is refused by FD-2 before a write"; else verdict MISSED F2 "the coupling move exit $rc, no FD-2 stop"; fi ;;
    F5a)
        if run node "$FT/move.mjs" "$(list f5a-glass-door)" --root "$WT" && run npx vitest run tests/styles/glass-subtlety.test.ts; then verdict CAUGHT F5a "glass.css → glass/index.css applied, its test green"; else verdict MISSED F5a "glass.css → glass/index.css refused or its test red"; fi ;;
    F5b)
        if run node "$FT/move.mjs" "$(list f5b-cwd-join)" --root "$WT" && run npx vitest run overlay-plate-available-height; then verdict CAUGHT F5b "the cwd-rooted join moved, its test green"; else verdict MISSED F5b "the cwd-rooted join refused (residue) or its test red"; fi ;;
    F5c)
        run node "$FT/move.mjs" "$(list f5c-prune)" --root "$WT"; rc=$?
        if [ $rc -eq 0 ] && [ ! -d tests/components/_shared ]; then verdict CAUGHT F5c "the emptied parent dir is pruned"; else verdict MISSED F5c "exit $rc; tests/components/_shared $( [ -d tests/components/_shared ] && echo 'left behind, empty' || echo gone)"; fi ;;
    F5d)
        run npx vite build >/dev/null
        run node "$FT/cascade.mjs" snapshot --root "$WT" --dist "$WT/dist" --out "$OUT/$ARM/F5d-base" --sha "$BASE"
        ok=1
        run node "$FT/move.mjs" "$(list f5d-theme-door)" --root "$WT" || ok=0
        run npx vite build || ok=0
        run node "$FT/entries.mjs" check --root "$WT" || ok=0
        run test -f dist/styles/theme.css || ok=0
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/$ARM/F5d-base" --dist "$WT/dist" || ok=0
        run node "$FT/surface.mjs" check --root "$WT" || ok=0
        if [ $ok = 1 ]; then verdict CAUGHT F5d "theme.css → theme/index.css: build, entries check, dist/styles/theme.css, cascade GREEN, surface pin"; else verdict MISSED F5d "theme.css → theme/index.css broke build, entries, the dist name, the cascade or the pin"; fi ;;
    F6)
        d1=$(digest "$FT"); say "digest after chain 1: $d1"
        if [ "$ARM" = before ]; then run node "$WT/$FL/rows/apply.mjs" --root "$WT"; rc=$?; else run node "$REPO/$FL/rows/apply.mjs" --root "$WT"; rc=$?; fi
        d2=$(digest "$FT"); say "digest after chain 2: $d2"
        if [ $rc -eq 0 ] && [ "$d1" = "$d2" ]; then verdict CAUGHT F6 "the whole chain replays as a no-op (digest ${d1%${d1#????????????}})"; else verdict MISSED F6 "the replay exit $rc; digest $( [ "$d1" = "$d2" ] && echo equal || echo changed)"; fi ;;
    F7b)
        run npx vite build >/dev/null
        run node "$FT/cascade.mjs" snapshot --root "$WT" --dist "$WT/dist" --out "$OUT/$ARM/F7b-base" --sha "$BASE"
        rm -rf "$OUT/$ARM/F7b-hash" "$OUT/$ARM/F7b-name"; cp -R dist "$OUT/$ARM/F7b-hash"; cp -R dist "$OUT/$ARM/F7b-name"
        # a pure move re-hashes a scoped SFC's keyframes; a real change renames the keyframes
        grep -rl "skeleton-breathe-0d5ebb1f" "$OUT/$ARM/F7b-hash" | while read -r f; do sed -i '' 's/skeleton-breathe-0d5ebb1f/skeleton-breathe-deadbeef/g' "$f"; done
        grep -rl "skeleton-breathe-0d5ebb1f" "$OUT/$ARM/F7b-name" | while read -r f; do sed -i '' 's/skeleton-breathe-0d5ebb1f/skeleton-inhale-0d5ebb1f/g' "$f"; done
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/$ARM/F7b-base" --dist "$OUT/$ARM/F7b-hash"; h=$?
        run node "$FT/cascade.mjs" verify --root "$WT" --baseline "$OUT/$ARM/F7b-base" --dist "$OUT/$ARM/F7b-name"; n=$?
        if [ $h -eq 0 ] && [ $n -ne 0 ]; then verdict CAUGHT F7b "a re-hashed scoped keyframe reads GREEN, a renamed one RED"; else verdict MISSED F7b "re-hash exit $h (want 0), rename exit $n (want 1)"; fi ;;
    F7c)
        B=$OUT/$ARM/wt-base
        if [ "$ARM" = before ]; then run "$P3/tools/fresh.sh" "$B" --at "$BASE"; run node "$B/$FL/rows/apply.mjs" --root "$B"; else run "$P3/tools/fresh.sh" "$B" --floor --at "$BASE"; run node "$REPO/$FL/rows/apply.mjs" --root "$B"; fi
        run node "$FT/move.mjs" "$(list f5a-glass-door)" --root "$WT"
        p=1; [ -f "$FT/classify.mjs" ] && { run node "$FT/classify.mjs" --base "$B" --root "$WT" --moves "$(list f5a-glass-door)"; p=$?; }
        printf '\n.zz-smuggled { color: red; }\n' >> src/styles/glass/index.css; say "appended .zz-smuggled to src/styles/glass/index.css"
        run node "$FT/graph.mjs" --root "$WT" --quiet; g=$?
        if [ -f "$FT/classify.mjs" ]; then
            : > "$OUT/$ARM/F7c.cls"; say "\$ node $FT/classify.mjs --base $B --root $WT --moves $(list f5a-glass-door)"
            node "$FT/classify.mjs" --base "$B" --root "$WT" --moves "$(list f5a-glass-door)" > "$OUT/$ARM/F7c.cls" 2>&1; c=$?; cat "$OUT/$ARM/F7c.cls" >> "$LOG"; say "[exit $c]"
            u=$(grep -c "^UNCLASSIFIED" "$OUT/$ARM/F7c.cls")
            if [ $p -eq 0 ] && [ $c -ne 0 ] && [ "$u" = 1 ] && grep -q "UNCLASSIFIED src/styles/glass/index.css" "$OUT/$ARM/F7c.cls"; then verdict CAUGHT F7c "the pure move classifies PASS; the smuggled rule makes the moved sheet the one UNCLASSIFIED file (graph exit $g)"; else verdict MISSED F7c "pure move exit $p (want 0); smuggled exit $c with $u unclassified (want 1: the sheet)"; fi
        else verdict MISSED F7c "no classifier on this floor; F-2's image check and the graph (exit $g) pass the smuggled rule"; fi
        git -C "$REPO" worktree remove --force "$B" ;;
    F8a)
        n=0; for d in $(find src/components src/composables src/styles -type d -not -name __tests__); do mkdir -p "$d/__tests__"; printf 'import { expect, it } from "vitest";\nit("probe", () => expect(1).toBe(1));\n' > "$d/__tests__/probe.test.ts"; n=$((n+1)); done; say "probe tests in $n src dirs"
        if run npx vitest run tests/components/easing.contract.test.ts tests/components/sortable-list/battery.test.ts; then verdict CAUGHT F8a "with a __tests__ slot in $n src dirs, easing.contract and the sortable-list battery pass"; else verdict MISSED F8a "with a __tests__ slot in $n src dirs, the walkers fail (EISDIR)"; fi ;;
    F8b)
        mkdir -p src/components/chip/__tests__
        printf 'import { expect, it } from "vitest";\nimport { Chip } from "..";\nit("chip is exported", () => expect(Chip).toBeTruthy());\n' > src/components/chip/__tests__/chip.test.ts
        ok=1
        run node "$FT/graph.mjs" --root "$WT" --quiet || ok=0
        run npx vitest run src/components/chip/__tests__/chip.test.ts || ok=0
        run npx vite build || ok=0
        run sh -c "! find dist -path '*__tests__*' | grep -q ." || ok=0
        run npx vue-tsc --noEmit || ok=0
        if [ $ok = 1 ]; then verdict CAUGHT F8b "the first colocated test: graph clean, collected and green, absent from dist, lib typecheck clean"; else verdict MISSED F8b "the first colocated test trips the graph, is not collected, ships, or fails typecheck"; fi ;;
    F8d)
        n=$(grep -rl "docs/tranches/BL/design/structure" vite*.ts vitest.config.ts tests scripts 2>/dev/null | wc -l | tr -d ' '); say "readers of the docs floor outside docs/: $n"; grep -rl "docs/tranches/BL/design/structure" vite*.ts vitest.config.ts tests scripts >> "$LOG" 2>/dev/null
        run npx vite build >/dev/null
        run npx vitest run tests/gates/floor.test.ts; g=$?
        if [ "$n" = 0 ] && [ $g -eq 0 ]; then verdict CAUGHT F8d "no build or gate reader names docs/; the floor gates run from scripts/structure under npm test"; else verdict MISSED F8d "$n reader file(s) import the floor from docs/ (floor.test exit $g)"; fi ;;
    F9)
        # two runs of the π pixel floor at once, as two seats would issue them
        T0=$(date +%s)
        if [ "$ARM" = before ]; then
            ( cd tests-visual && say "run A start $(date +%s)" && npx playwright test substrate-paints-color.spec.ts --project=chromium-headless-new > "$OUT/$ARM/F9-a.log" 2>&1; echo "A end $(date +%s) exit $?" >> "$LOG" ) &
            sleep 3
            ( cd tests-visual && say "run B start $(date +%s)" && npx playwright test substrate-paints-color.spec.ts --project=chromium-headless-new > "$OUT/$ARM/F9-b.log" 2>&1; echo "B end $(date +%s) exit $?" >> "$LOG" ) &
            wait
            sa=$(grep "run A start" "$LOG" | awk '{print $4}'); ea=$(grep "^A end" "$LOG" | awk '{print $3}'); sb=$(grep "run B start" "$LOG" | awk '{print $4}')
            if [ "$sb" -ge "$ea" ]; then verdict CAUGHT F9 "the two runs did not overlap"; else verdict MISSED F9 "the two browser runs overlapped (A ${sa}-${ea}, B from ${sb}); no seat serializes them"; fi
        else
            ( node "$REPO/$FL/browser.mjs" --root "$WT" --out "$OUT/$ARM/F9-a.json" > "$OUT/$ARM/F9-a.log" 2>&1; echo "A exit $?" >> "$LOG" ) &
            sleep 3
            ( node "$REPO/$FL/browser.mjs" --root "$WT" --out "$OUT/$ARM/F9-b.json" > "$OUT/$ARM/F9-b.log" 2>&1; echo "B exit $?" >> "$LOG" ) &
            wait
            cat "$OUT/$ARM/F9-a.log" "$OUT/$ARM/F9-b.log" | grep "browser-seat" >> "$LOG"
            # serialized: B takes the seat only after A has released it (the seat's own log stamps)
            ea=$(grep -h "GREEN\|RED" "$OUT/$ARM/F9-a.log" | grep "browser-seat" | tail -1 | sed 's/^\[browser-seat \([^]]*\)\].*/\1/')
            sb=$(grep -h "seat acquired" "$OUT/$ARM/F9-b.log" | sed 's/^\[browser-seat \([^]]*\)\].*/\1/')
            va=$(node -p 'require(process.argv[1]).verdict' "$OUT/$ARM/F9-a.json"); vb=$(node -p 'require(process.argv[1]).verdict' "$OUT/$ARM/F9-b.json")
            wb=$(node -p 'require(process.argv[1]).waitedS' "$OUT/$ARM/F9-b.json")
            say "A finished $ea ($va); B acquired $sb after waiting ${wb}s ($vb)"
            if node -e 'process.exit(Date.parse(process.argv[2]) >= Date.parse(process.argv[1]) ? 0 : 1)' "$ea" "$sb" && [ "$va" = GREEN ] && [ "$vb" = GREEN ]; then verdict CAUGHT F9 "B waited ${wb}s and took the seat at $sb, after A finished at $ea; both GREEN from their own servers"; else verdict MISSED F9 "A finished $ea, B acquired $sb ($va / $vb)"; fi
        fi
        say "wall $(( $(date +%s) - T0 ))s" ;;
    esac
    cd "$OUT" || exit 2
    git -C "$REPO" worktree remove --force "$WT" >> "$LOG" 2>&1
done
