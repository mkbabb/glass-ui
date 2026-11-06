#!/usr/bin/env bash
# Critique 4: atlas 1d933b8's own vue-tsc against the packed 11.0.0 tarball, plus a
# negative control. $1 = the smoke dir holding the tarball; $2 = a scratch overlay dir.
set -uo pipefail
ATLAS=~/Programming/.u-build/atlas-rc
TGZ=$(ls "$1"/mkbabb-glass-ui-11.0.0.tgz)
O="$2"; rm -rf "$O"; mkdir -p "$O/node_modules/@mkbabb"
cd "$ATLAS" && for f in *; do [ "$f" = node_modules ] || [ "$f" = dist ] || cp -R "$f" "$O/"; done
for d in "$ATLAS"/node_modules/* "$ATLAS"/node_modules/.bin; do b=$(basename "$d"); [ "$b" = "@mkbabb" ] && continue; ln -s "$d" "$O/node_modules/$b"; done
for d in "$ATLAS"/node_modules/@mkbabb/*; do b=$(basename "$d"); [ "$b" = "glass-ui" ] && continue; ln -s "$d" "$O/node_modules/@mkbabb/$b"; done
mkdir -p "$O/node_modules/@mkbabb/glass-ui" && tar -xzf "$TGZ" -C "$O/node_modules/@mkbabb/glass-ui" --strip-components=1
grep '"version"' "$O/node_modules/@mkbabb/glass-ui/package.json"
cd "$O" && ./node_modules/.bin/vue-tsc --noEmit -p tsconfig.json; echo "vue-tsc exit $?"
printf 'import { DockTrigger } from "@mkbabb/glass-ui/dock";\nexport default DockTrigger;\n' > src/zz-negative.ts
./node_modules/.bin/vue-tsc --noEmit -p tsconfig.json; echo "negative control exit $?"
