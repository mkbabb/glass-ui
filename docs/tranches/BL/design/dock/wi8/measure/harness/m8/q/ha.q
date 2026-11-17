# MEASURE-8, queue A: the readings on the current build (preview 5401, dist-wi8) and on v11.0.2's page (base 5403).
# H4 G-11: cost8's phase marks and the two frames after each trigger (GPU lane), the rest clause in WebKit
preview gpu 30 ../logs/m8-cost.build.chromium.json node m8/cost8.mjs 5401 build >> ../logs/m8-ha.log 2>&1
preview webkit 20 ../logs/m8-cost.build.webkit.json node m8/cost8.mjs 5401 build --engine webkit >> ../logs/m8-ha.log 2>&1
# H5 G-15: ink8's base on v11.0.2's page, then the build against it (WebKit with the Grid seat's crop)
base chromium 40 ../logs/m8-ink-base.chromium.json node m8/ink8.mjs 5403 base >> ../logs/m8-ha.log 2>&1
base webkit 50 ../logs/m8-ink-base.webkit.json node m8/ink8.mjs 5403 base --engine webkit >> ../logs/m8-ha.log 2>&1
preview chromium 40 ../logs/m8-ink-build.chromium.json node m8/ink8.mjs 5401 build --base ../logs/m8-ink-base.chromium.json >> ../logs/m8-ha.log 2>&1
preview webkit 50 ../logs/m8-ink-build.webkit.json node m8/ink8.mjs 5401 build --engine webkit --base ../logs/m8-ink-base.webkit.json --crop >> ../logs/m8-ha.log 2>&1
# H6 + Q10: the grid ground per rung, both schemes; the warm field in dark (every page) and light (nav, pill); daraksha's ground (nav, pill)
preview chromium 60 ../logs/m8-plate-q10grid.chromium.json node m8/plate8.mjs 5401 q10grid --pages nav,pill,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools --grounds grid --schemes dark,light --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
preview chromium 50 ../logs/m8-plate-q10field.chromium.json node m8/plate8.mjs 5401 q10field --pages nav,pill,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools --grounds field --schemes dark --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
preview chromium 20 ../logs/m8-plate-q10fieldl.chromium.json node m8/plate8.mjs 5401 q10fieldl --pages nav,pill --grounds field --schemes light --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
preview chromium 25 ../logs/m8-plate-q10dar.chromium.json node m8/plate8.mjs 5401 q10dar --pages nav,pill --grounds daraksha --schemes dark,light --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
preview webkit 80 ../logs/m8-plate-q10grid.webkit.json node m8/plate8.mjs 5401 q10grid --engine webkit --pages nav,pill,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools --grounds grid --schemes dark,light --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
preview webkit 60 ../logs/m8-plate-q10field.webkit.json node m8/plate8.mjs 5401 q10field --engine webkit --pages nav,pill,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools --grounds field --schemes dark --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
preview webkit 25 ../logs/m8-plate-q10fieldl.webkit.json node m8/plate8.mjs 5401 q10fieldl --engine webkit --pages nav,pill --grounds field --schemes light --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
preview webkit 30 ../logs/m8-plate-q10dar.webkit.json node m8/plate8.mjs 5401 q10dar --engine webkit --pages nav,pill --grounds daraksha --schemes dark,light --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
# today's dock on v11.0.2's own build (RU-69's row): the grid (every page), the field in dark (every page), nav and pill on the field in light and on daraksha's ground
base chromium 30 ../logs/m8-plate-q10today-grid.chromium.json node m8/plate8.mjs 5403 q10today-grid --label today --rungs today --pages nav,pill,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools --grounds grid --schemes dark,light --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
base chromium 20 ../logs/m8-plate-q10today-field.chromium.json node m8/plate8.mjs 5403 q10today-field --label today --rungs today --pages nav,pill,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools --grounds field --schemes dark --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
base chromium 15 ../logs/m8-plate-q10today-more.chromium.json node m8/plate8.mjs 5403 q10today-more --label today --rungs today --pages nav,pill --grounds field,daraksha --schemes dark,light --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
base webkit 40 ../logs/m8-plate-q10today-grid.webkit.json node m8/plate8.mjs 5403 q10today-grid --engine webkit --label today --rungs today --pages nav,pill,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools --grounds grid --schemes dark,light --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
base webkit 25 ../logs/m8-plate-q10today-field.webkit.json node m8/plate8.mjs 5403 q10today-field --engine webkit --label today --rungs today --pages nav,pill,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools --grounds field --schemes dark --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
base webkit 20 ../logs/m8-plate-q10today-more.webkit.json node m8/plate8.mjs 5403 q10today-more --engine webkit --label today --rungs today --pages nav,pill --grounds field,daraksha --schemes dark,light --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-ha.log 2>&1
# H7 slides's wash row; H8 daraksha's fission in both schemes, with and without the matching-plate recipe
preview chromium 15 ../logs/m8-plate-wash.chromium.json node m8/plate8.mjs 5401 wash --pages wash --grounds field --schemes light,dark --rungs 1,0.7 --shots ../logs/m8-q10-shots --shotpages wash >> ../logs/m8-ha.log 2>&1
preview webkit 20 ../logs/m8-plate-wash.webkit.json node m8/plate8.mjs 5401 wash --engine webkit --pages wash --grounds field --schemes light,dark --rungs 1,0.7 --shots ../logs/m8-q10-shots --shotpages wash >> ../logs/m8-ha.log 2>&1
preview chromium 20 ../logs/m8-plate-fission.chromium.json node m8/plate8.mjs 5401 fission --pages fission --grounds daraksha --schemes dark,light --shots ../logs/m8-q10-shots --shotpages fission >> ../logs/m8-ha.log 2>&1
preview chromium 20 ../logs/m8-plate-fission-match.chromium.json node m8/plate8.mjs 5401 fission-match --label match --neck match --pages fission --grounds daraksha --schemes dark,light --shots ../logs/m8-q10-shots --shotpages fission >> ../logs/m8-ha.log 2>&1
preview webkit 25 ../logs/m8-plate-fission.webkit.json node m8/plate8.mjs 5401 fission --engine webkit --pages fission --grounds daraksha --schemes dark,light --shots ../logs/m8-q10-shots --shotpages fission >> ../logs/m8-ha.log 2>&1
preview webkit 25 ../logs/m8-plate-fission-match.webkit.json node m8/plate8.mjs 5401 fission-match --engine webkit --label match --neck match --pages fission --grounds daraksha --schemes dark,light --shots ../logs/m8-q10-shots --shotpages fission >> ../logs/m8-ha.log 2>&1
# H7 owner frames and readings
preview chromium 30 ../logs/m8-owner/owner9.build.chromium.json node m8/owner9.mjs 5401 ../logs/m8-owner --engine chromium >> ../logs/m8-ha.log 2>&1
preview webkit 40 ../logs/m8-owner/owner9.build.webkit.json node m8/owner9.mjs 5401 ../logs/m8-owner --engine webkit >> ../logs/m8-ha.log 2>&1
# the atlas cell; H10 O-386; H12 the census
preview chromium 15 ../logs/m8-atlas-build.chromium.json node m8/atlas8.mjs 5401 build >> ../logs/m8-ha.log 2>&1
preview webkit 20 ../logs/m8-atlas-build.webkit.json node m8/atlas8.mjs 5401 build --engine webkit >> ../logs/m8-ha.log 2>&1
preview chromium 15 ../logs/m8-cross-build.chromium.json node m8/cross8.mjs 5401 build >> ../logs/m8-ha.log 2>&1
preview webkit 20 ../logs/m8-cross-build.webkit.json node m8/cross8.mjs 5401 build --engine webkit >> ../logs/m8-ha.log 2>&1
preview chromium 15 ../logs/m8-census-build.chromium.json node m8/census8.mjs 5401 build >> ../logs/m8-ha.log 2>&1
preview webkit 20 ../logs/m8-census-build.webkit.json node m8/census8.mjs 5401 build --engine webkit >> ../logs/m8-ha.log 2>&1
preview chromium 15 ../logs/m8-g13-build.chromium.json env LOG_TAG=build node m8/g13.mjs 5401 --engine chromium >> ../logs/m8-ha.log 2>&1
preview webkit 20 ../logs/m8-g13-build.webkit.json env LOG_TAG=build node m8/g13.mjs 5401 --engine webkit >> ../logs/m8-ha.log 2>&1
