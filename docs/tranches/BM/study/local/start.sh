#!/bin/zsh
# Builds www/ and starts the local server for a day under the guard (ports 4415 and 4416 are in
# ~/.claude/guard/keep-ports). Stop it with ./stop.sh. Logs: logs/serve.log.
set -e
cd "${0:A:h}"
mkdir -p logs tls
~/.claude/guard/guarded --light -- node build.mjs
if [[ ! -s tls/cert.pem ]]; then
  ip=$(ipconfig getifaddr en0 || echo 127.0.0.1)
  /opt/homebrew/bin/openssl req -x509 -newkey rsa:2048 -nodes -days 397 -keyout tls/key.pem -out tls/cert.pem \
    -subj "/CN=$(scutil --get LocalHostName).local" \
    -addext "subjectAltName=DNS:localhost,DNS:$(scutil --get LocalHostName).local,IP:127.0.0.1,IP:$ip" 2>/dev/null
fi
GUARD_ALLOW_LONG=1 nohup ~/.claude/guard/guarded --light --timeout 1440 -- /usr/bin/python3 -u serve.py >> logs/serve.log 2>&1 &
echo $! > logs/serve.pid
