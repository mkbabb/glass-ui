#!/bin/zsh
# The 11.1.1 third close: wait while the lid is closed (AppleClamshellState Yes), polling every 60 s,
# then print the time the lid read open. A timing read starts only after this returns.
set -u
while ioreg -r -k AppleClamshellState -d 1 | grep -q '"AppleClamshellState" = Yes'; do sleep 60; done
echo "$(date '+%F %T') lid open; kern.sleeptime $(sysctl -n kern.sleeptime | grep -oE 'sec = [0-9]+' | head -1)"
