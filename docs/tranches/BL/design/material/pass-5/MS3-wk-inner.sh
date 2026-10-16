#!/usr/bin/env bash
# MS3-wk-inner.sh · every Playwright WebKit phase of the minor v3 under ONE `guarded --exclusive webkit` admission:
#   ~/.claude/guard/guarded --timeout 90 --exclusive webkit -- bash MS3-wk-inner.sh
P5=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/material/pass-5
export MS3_INNER=1 ENG=webkit MS3_ENG=webkit MS3_SEARCH=w01ref
for p in battery-wk head-cells search island glance; do bash $P5/MS3-run.sh $p 2>&1 | tee -a $P5/MS3-records/phase-$p-webkit.log; done
