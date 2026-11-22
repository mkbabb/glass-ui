set -u
m9/g.sh chromium 20 'node m9/trace9.mjs 5444 tip-idle --mode idle'
m9/g.sh chromium 10 'node m9/trace9.mjs 5444 tip-layer --mode layer'
m9/g.sh chromium 10 'node m9/trace9.mjs 5444 tip-docks18 --mode docks --n 18'
m9/g.sh chromium 10 'node m9/trace9.mjs 5444 tip-docks10 --mode docks --n 10'
