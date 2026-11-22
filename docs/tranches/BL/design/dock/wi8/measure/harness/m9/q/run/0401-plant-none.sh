set -u
m9/g.sh chromium 30 'node m9/rail9.mjs 5444 tip --engine chromium'
m9/g.sh webkit 30 'node m9/rail9.mjs 5444 tip --engine webkit'
