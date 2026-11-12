#!/bin/zsh
# critic round 2: the keyboard-modality tab ring probe in WebKit 2287, branch then the
# v10.1.4 copy. Run from tests-visual under guarded --exclusive webkit.
set -u
L=../docs/release-10.1.5/critic-2
npx playwright test -c release-10-1-5-critic-2.config.ts --project=webkit release-10-1-5-critic-2.spec.ts --grep "tab ring kbd" --workers=1 > $L/run-webkit-kbd.log 2>&1; echo "branch exit=$?" >> $L/run-webkit-kbd.log
CRITIC_ARM=v1014 npx playwright test -c release-10-1-5-critic-2.config.ts --project=webkit release-10-1-5-critic-2.spec.ts --grep "tab ring kbd" --workers=1 >> $L/run-webkit-kbd.log 2>&1; echo "v1014 exit=$?" >> $L/run-webkit-kbd.log
