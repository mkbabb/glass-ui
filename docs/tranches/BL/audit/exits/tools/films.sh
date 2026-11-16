#!/usr/bin/env bash
# films.sh: the strips TABLE.md cites (Chromium, one browser per strip).
#   ~/.claude/guard/guarded --timeout 20 -- ./films.sh
cd "$(dirname "$0")"
node films.mjs 11.0.2 phone dock-select pick 10
node films.mjs 11.0.2 phone dock-select outside 10
node films.mjs 11.0.2 phone dock-dropdown pick 8
node films.mjs 11.0.2 phone sheet-detented close 12
node films.mjs 11.0.2 phone expandable-container exit 6
node films.mjs 11.0.2 phone command-dialog escape 8
RM=1 node films.mjs 11.0.2 phone dialog escape 6
RM=1 node films.mjs 11.0.2 phone select pick 6
