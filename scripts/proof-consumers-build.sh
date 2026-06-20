#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
PARENT="$(dirname "$ROOT")"
# AS.W2 inv-θ — the consumer set + the absent-sibling policy come from the ONE
# membership source (scripts/constellation.mjs), never a hardcoded bash array.
# The build set is the APP consumers (CONSUMERS minus self minus the publishers
# keyframes/value); each line is `<id>\t<dir>`. Absent siblings skip-by-policy.
# Portable read-loop (NOT `mapfile` — a bash-4 builtin absent on macOS's stock
# bash 3.2; AZ.W-GATES runner-truth: the gate must run identically on the dev
# Mac and the CI runner).
CONSUMER_ROWS=()
while IFS= read -r __row; do
    [ -n "$__row" ] && CONSUMER_ROWS+=("$__row")
done < <(node -e '
import("'"$ROOT"'/scripts/constellation.mjs").then((m) => {
  const pub = new Set(m.PUBLISHERS.map((p) => p.id));
  for (const c of m.CONSUMERS) {
    if (c.self || pub.has(c.id)) continue;
    console.log(`${c.id}\t${c.dir}`);
  }
});
')
# AS.W2 inv-θ — pure output: the default artefact lands in the gitignored cache;
# the env override still points it at a committed path for a deliberate snapshot.
ARTIFACT="${GLASS_UI_CONSUMERS_BUILD_ARTIFACT:-$ROOT/.cache/gates/W1-consumers-build.json}"

mkdir -p "$(dirname "$ARTIFACT")"

status=0
first=1
{
    printf '{\n'
    printf '  "consumers": [\n'
} > "$ARTIFACT"

for row in "${CONSUMER_ROWS[@]}"; do
    consumer="${row%%$'\t'*}"
    consumer_dir="${row#*$'\t'}"
    start="$(date +%s)"
    rc=0
    state="pass"

    echo
    echo "[$consumer] npm run build"
    echo "path: $consumer_dir"

    if [[ ! -d "$consumer_dir" ]]; then
        # Absent sibling — SKIP-by-policy (the registry-default; the gates.mjs
        # "skipped-by-policy when no sibling is present — never a hard failure
        # on a clean runner" contract + the proof:consumers:static skipSibling
        # precedent). A clean CI/release checkout (release.yml --run full) has
        # no sibling app repos; the gate cannot build what is not present, and
        # an absent consumer is not a glass-ui regression — it is the expected
        # clean-runner state. (Prior latent bug: this set rc=127 and FAILED,
        # contradicting line-9's documented policy; the BC clean siblings-absent
        # --run full surfaced it.)
        echo "[$consumer] SKIP: absent sibling (registry-default policy)"
        state="skip"
    elif (cd "$consumer_dir" && npm run build); then
        echo "[$consumer] PASS"
    else
        rc=$?
        echo "[$consumer] FAIL: npm run build exited $rc"
        state="fail"
    fi

    duration="$(( $(date +%s) - start ))"
    if [[ "$state" == "fail" ]]; then
        status=1
    fi

    if [[ "$first" -eq 0 ]]; then
        printf ',\n' >> "$ARTIFACT"
    fi
    first=0
    {
        printf '    {\n'
        printf '      "consumer": "%s",\n' "$consumer"
        printf '      "path": "%s",\n' "$consumer_dir"
        printf '      "command": "npm run build",\n'
        printf '      "status": "%s",\n' "$state"
        printf '      "exitCode": %s,\n' "$rc"
        printf '      "durationSeconds": %s\n' "$duration"
        printf '    }'
    } >> "$ARTIFACT"
done

{
    printf '\n  ]\n'
    printf '}\n'
} >> "$ARTIFACT"

echo
echo "Consumer build artifact: $ARTIFACT"
exit "$status"
