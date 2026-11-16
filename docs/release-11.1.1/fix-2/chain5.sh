#!/bin/bash
# Re-reads after the reversal and curve witnesses changed mid-chain: chromium-phone.
R=$(dirname $0)/run.sh
$R branch chromium-phone tipA2-chromium-phone "(form|glass|exit|routes) · " release-11-1-1.spec
$R branch chromium-phone tipB2-chromium-phone "(reverse|tooltip|expand|leave) · " release-11-1-1.spec
$R red chromium-phone redA2-chromium-phone "exit · " release-11-1-1.spec
$R red chromium-phone redB2-chromium-phone "reverse · " release-11-1-1.spec
echo CHAIN5-DONE >> $(dirname $0)/logs/runs.out
