set -u
m9/g.sh chromium 30 'node m9/frames9.mjs 5444 plant-g2-lane --engine chromium --cell w-persist --scheme light'
m9/g.sh webkit 30 'node m9/frames9.mjs 5444 plant-g2-lane --engine webkit --cell w-persist --scheme light'
