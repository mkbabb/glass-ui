set -u
m9/g.sh chromium 30 'node m9/face9.mjs 5444 cand-face --engine chromium'
m9/g.sh webkit 30 'node m9/face9.mjs 5444 cand-face --engine webkit'
