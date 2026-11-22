set -u
m9/g.sh gpu 10 'node m9/trace9.mjs 5474 m9m-docks18 --mode docks --n 18'
m9/g.sh gpu 10 'node m9/trace9.mjs 5474 m9m-docks10 --mode docks --n 10'
m9/g.sh chromium 20 'node m9/trace9.mjs 5474 m9m-idle --mode idle'
m9/g.sh chromium 10 'node s9/idle9.mjs 5474 m9m'
