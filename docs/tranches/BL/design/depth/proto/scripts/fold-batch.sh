#!/bin/sh
# The fold's readings for one engine, inside one guarded call (WebKit: launch only via
# guarded --exclusive webkit -- sh fold-batch.sh webkit). Each node process is one
# browser; cells are new contexts.
E=$1
if [ "$E" = chromium ]; then
  node fold.mjs $E 1440x900,1440x900:dark,390x844:coarse,390x844:coarse:dark --query "card=1&fill=1" --shots
  node fold.mjs $E 360x780,768x1024,1024x768,1920x1080,360x780:dark,1920x1080:dark --query "card=1&fill=1"
  node fold.mjs $E 1440x900,390x844:coarse --query "t1=Glass&t2=UI" --tag glassui --shots
  node fold.mjs $E 1440x900 --query "fill=bare" --tag fillbare
  node fold.mjs $E 1440x900,1440x900:dark,390x844:coarse --query "surface=veil" --tag veil
  node fold.mjs $E 1440x900,1440x900:dark,390x844:coarse --query "surface=glass" --tag glass
  node fold.mjs $E 1440x900 --query "shadow=1" --tag shadow --shots
  node fold.mjs $E 1440x900:dark --query "blob=default" --tag stockblob
  node measure.mjs $E 1440x900,390x844:coarse,1440x900:dark --tag fold --strips
  node measure.mjs $E 1440x900:reduce,390x844:coarse:reduce,1440x900:mask --tag fold
else
  # light only: every dark cell crashes Playwright WebKit on the demo (PROTOTYPE.md)
  for c in 1440x900 390x844:coarse 360x780 1920x1080; do node fold.mjs $E $c --query "card=1&fill=1" --shots || echo "CRASH $c"; done
  node fold.mjs $E 1440x900 --query "t1=Glass&t2=UI" --tag glassui || echo CRASH
  node fold.mjs $E 1440x900 --query "fill=bare" --tag fillbare || echo CRASH
  node fold.mjs $E 1440x900 --query "surface=glass" --tag glass || echo CRASH
  for c in 1440x900 390x844:coarse; do node measure.mjs $E $c --tag fold --strips || echo "CRASH $c"; done
  for c in 1440x900:reduce 1440x900:mask; do node measure.mjs $E $c --tag fold || echo "CRASH $c"; done
fi
