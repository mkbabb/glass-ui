#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
PARENT="$(dirname "$ROOT")"
# AS.W2 inv-θ — the consumer set + the absent-sibling policy come from the ONE
# membership source (scripts/constellation.mjs), never a hardcoded bash array.
# The build set is the APP consumers (CONSUMERS minus self minus the publishers
# keyframes/value); each line is `<id>\t<dir>`. Absent siblings skip-by-policy.
mapfile -t CONSUMER_ROWS < <(node -e '
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

    echo
    echo "[$consumer] npm run build"
    echo "path: $consumer_dir"

    if [[ ! -d "$consumer_dir" ]]; then
        echo "[$consumer] FAIL: missing consumer directory"
        rc=127
    elif (cd "$consumer_dir" && npm run build); then
        echo "[$consumer] PASS"
    else
        rc=$?
        echo "[$consumer] FAIL: npm run build exited $rc"
    fi

    duration="$(( $(date +%s) - start ))"
    if [[ "$rc" -ne 0 ]]; then
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
        printf '      "status": "%s",\n' "$([[ "$rc" -eq 0 ]] && echo pass || echo fail)"
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
