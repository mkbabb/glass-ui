#!/bin/bash
# H5-selftest-rest.sh (entry 2 of the H5 seat): the self-test groups the cut-off entry left unrun in Playwright WebKit,
# then the expectations the entry-2 cure to lib.mjs q4Blocked touches (W3 pass/bandclose/seatsettle, W6
# pass/bandclose/slowclock), both engines. One guarded run at a time (H5-selftest.sh).
set -u
OUT=$1; H=$(cd "$(dirname "$0")" && pwd)
bash "$H/H5-selftest.sh" "$OUT" webkit W4+W5+W6 W7+W8+R6 ST+FM+R5 CF+L1
bash "$H/H5-selftest.sh" "$OUT" webkit W3:pass,bandclose,seatsettle
bash "$H/H5-selftest.sh" "$OUT" chromium W3:pass,bandclose,seatsettle W6:pass,bandclose,slowclock
echo "REST-DONE $(date)" >> "$H/H5-records/selftest-rest-done.txt"
