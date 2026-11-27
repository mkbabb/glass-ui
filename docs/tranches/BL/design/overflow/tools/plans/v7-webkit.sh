#!/usr/bin/env bash
# v7-webkit.sh: round 3's WebKit readings in one run under the WebKit lock: v7.mjs over
# the base, v6 and v7 (sizes, computed styles, wheel pans; WebKit takes no touch input),
# then round3.mjs over the base and v7 (the rings, the glide, the shortcut). Each script
# serves its own previews and stops them.
#   ~/.claude/guard/guarded --exclusive webkit --timeout 60 -- tools/plans/v7-webkit.sh
set -uo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
# R3_ONLY=1 runs the round3.mjs half alone. round3.sh reads the builds named after `--`.
[ -n "${R3_ONLY:-}" ] || OVF_TREE=r3b "$HERE/v7.sh" webkit v7 dist-base:5394 dist-cure6:5395 dist-cure7:5396
OVF_TREE=r3b "$HERE/round3.sh" webkit round3-v7 dist-base:5394 dist-cure7:5396 -- base:5394 v7:5396
