#!/bin/zsh
# Rebuilds the archaeology corpus (owner-utterance stream) from raw session transcripts.
# Deterministic; re-run after any wall into $OUT, then shard: claude files >200K → split -l 60;
# codex files → cat | sort | split -l 220. The workflow (wf/archaeology.wf.js) reads the shards.
setopt null_glob
OUT=${1:?usage: extract-archaeology.sh <outdir>}
mkdir -p "$OUT/claude" "$OUT/codex"

# Claude sessions — glass-ui project + the docs-tranches-* satellite project dirs
for d in /Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui \
         /Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui-docs-tranches-*; do
  tag=$(basename "$d" | sed 's/-Users-mkbabb-Programming-//')
  for f in "$d"/*.jsonl; do
    [ -s "$f" ] || continue
    b=$(basename "$f" .jsonl)
    jq -c 'select(.type=="user" and .isMeta != true) | . as $e | (.message.content // empty)
      | (if type=="string" then [.] else [.[]? | select(type=="object" and .type=="text") | .text] end)
      | .[] | select(length>2) | select(startswith("<")|not) | select(startswith("Caveat:")|not)
      | {t:($e.timestamp//"?"), x:.}' "$f" 2>/dev/null > "$OUT/claude/${tag}__${b}.jsonl"
    imgs=$(grep -c '"type":"image"' "$f" 2>/dev/null || true)
    echo "{\"session\":\"${tag}__${b}\",\"imageRefs\":${imgs:-0}}" >> "$OUT/claude/_image-census.jsonl"
  done
done

# Codex sessions — glass-ui-relevant only (cwd recorded in the head of each rollout)
for f in $(find /Users/mkbabb/.codex/sessions/2026 -name '*.jsonl' -type f 2>/dev/null); do
  head -c 16384 "$f" | grep -q 'glass-ui' || continue
  b=$(basename "$f" .jsonl)
  jq -c 'select((.payload.role=="user") or (.payload.type=="user_message") or (.type=="message" and .role=="user"))
    | {t:(.timestamp//"?"), x:([.. | objects | select(.type?=="input_text" or .type?=="text") | .text] | join("\n"))}
    | select(.x|length>2) | select(.x|startswith("<")|not)' "$f" 2>/dev/null > "$OUT/codex/${b}.jsonl"
done
find "$OUT" -size 0 -delete
echo "claude msgs: $(cat "$OUT"/claude/*__*.jsonl 2>/dev/null | wc -l) · codex msgs: $(cat "$OUT"/codex/*.jsonl 2>/dev/null | wc -l)"
