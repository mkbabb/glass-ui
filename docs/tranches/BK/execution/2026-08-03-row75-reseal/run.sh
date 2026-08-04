#!/bin/bash
# Row #75 adjudicator matrix — runs the verbatim on-disk hook command against input classes.
# Expectations: FAILOPEN = rc 0 + empty stdout; BLOCK = rc 0 + the block JSON line; CLEAN = rc 0 + empty stdout.
set -u
D="$(cd "$(dirname "$0")" && pwd)"
CMD_FILE="$D/hook.cmd"
BLOCK_LINE='{"decision":"block","reason":"Continue. Inspect the durable workflow journal first; resume the unfinished run from its recorded run ID; redeploy only missing seats; crons remain disabled."}'

pass=0; fail=0
run_case() {
  local name="$1" expect="$2" input_file="$3"
  local out rc
  out=$(/bin/bash "$CMD_FILE" < "$input_file" 2>/dev/null); rc=$?
  local verdict="FAIL"
  case "$expect" in
    FAILOPEN|CLEAN) [ "$rc" -eq 0 ] && [ -z "$out" ] && verdict="PASS" ;;
    BLOCK)          [ "$rc" -eq 0 ] && [ "$out" = "$BLOCK_LINE" ] && verdict="PASS" ;;
  esac
  if [ "$verdict" = PASS ]; then pass=$((pass+1)); else fail=$((fail+1)); fi
  printf '%-24s expect=%-8s rc=%-3s out_bytes=%-4s %s\n' "$name" "$expect" "$rc" "${#out}" "$verdict"
}

mk() { printf '%s' "$2" > "$D/in-$1"; echo "$D/in-$1"; }

run_case empty        FAILOPEN "$(mk empty '')"
run_case whitespace   FAILOPEN "$(mk ws '   ')"
run_case tab-newline  FAILOPEN "$(printf ' \t\n\n' > "$D/in-tnl"; echo "$D/in-tnl")"
run_case malformed    FAILOPEN "$(mk mal '{nope')"
run_case missing-key  BLOCK    "$(mk mk '{}')"
run_case false        BLOCK    "$(mk false '{"stop_hook_active":false}')"
run_case true         CLEAN    "$(mk true '{"stop_hook_active":true}')"
run_case string-true  FAILOPEN "$(mk strtrue '{"stop_hook_active":"true"}')"
run_case number-1     FAILOPEN "$(mk num1 '{"stop_hook_active":1}')"
run_case null-value   FAILOPEN "$(mk nullv '{"stop_hook_active":null}')"
run_case json-array   FAILOPEN "$(mk arr '[]')"
run_case json-string  FAILOPEN "$(mk jstr '"hello"')"
run_case json-number  FAILOPEN "$(mk jnum '42')"
run_case json-null    FAILOPEN "$(mk jnull 'null')"
printf '<?xml version="1.0"?><plist version="1.0"><dict><key>stop_hook_active</key><false/></dict></plist>' > "$D/in-xml"
run_case xml-plist    FAILOPEN "$D/in-xml"
printf '{ stop_hook_active = 0; }' > "$D/in-ostep"
run_case openstep     FAILOPEN "$D/in-ostep"
head -c 64 /dev/urandom > "$D/in-bin"
run_case binary       FAILOPEN "$D/in-bin"

# parser-missing: probe PATH dir with cat+printf only, invoke bash absolutely
PROBE="$D/probe-bin"; mkdir -p "$PROBE"
ln -sf /bin/cat "$PROBE/cat"; ln -sf /usr/bin/printf "$PROBE/printf" 2>/dev/null
for exp_in in "mk:missing-key" "false:false"; do
  f="${exp_in%%:*}"; label="${exp_in##*:}"
  out=$(env PATH="$PROBE" /bin/bash "$CMD_FILE" < "$D/in-$f" 2>/dev/null); rc=$?
  v="FAIL"; [ "$rc" -eq 0 ] && [ -z "$out" ] && v="PASS"
  if [ "$v" = PASS ]; then pass=$((pass+1)); else fail=$((fail+1)); fi
  printf '%-24s expect=%-8s rc=%-3s out_bytes=%-4s %s\n' "jq-missing($label)" FAILOPEN "$rc" "${#out}" "$v"
done

# idempotency: two block invocations byte-identical
o1=$(/bin/bash "$CMD_FILE" < "$D/in-false"); o2=$(/bin/bash "$CMD_FILE" < "$D/in-false")
if [ "$o1" = "$o2" ] && [ "$o1" = "$BLOCK_LINE" ]; then
  pass=$((pass+1)); echo "idempotent-repeat        expect=SAME     PASS"
else
  fail=$((fail+1)); echo "idempotent-repeat        expect=SAME     FAIL"
fi

echo "SUMMARY pass=$pass fail=$fail"
