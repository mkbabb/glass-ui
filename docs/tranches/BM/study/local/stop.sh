#!/bin/zsh
# Stops the local server started by start.sh, by its recorded PID (the guard takes the tree down with it).
cd "${0:A:h}"
[[ -s logs/serve.pid ]] && kill "$(cat logs/serve.pid)" 2>/dev/null && rm logs/serve.pid && echo stopped
