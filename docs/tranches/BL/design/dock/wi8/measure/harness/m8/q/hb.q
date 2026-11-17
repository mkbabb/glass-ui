# MEASURE-8, queue B: the plants on the dev server (5402, reads src/ live), each reverted and the source checked clean
preview webkit 25 ../logs/m8-trig-build-dp.webkit.json node m8/trig8.mjs 5401 build-dp --engine webkit --only select-touch,sheet-touch,popover-touch,menu-touch >> ../logs/m8-hb.log 2>&1
preview chromium 20 ../logs/m8-trig-build-dp.chromium.json node m8/trig8.mjs 5401 build-dp --engine chromium --only select-touch,sheet-touch,popover-touch,menu-touch >> ../logs/m8-hb.log 2>&1
preview chromium 60 ../logs/m8-plate-q10grid.chromium.json node m8/plate8.mjs 5401 q10grid --pages nav,pill,pager,dials,chrome,transport,rail,canvas-tools,corner-controls,action-row,figure-tools --grounds grid --schemes dark,light --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-hb.log 2>&1
preview webkit 20 ../logs/m8-plate-q10gridft.webkit.json node m8/plate8.mjs 5401 q10gridft --engine webkit --pages figure-tools --grounds grid --schemes dark,light --shots ../logs/m8-q10-shots --shotpages nav,pill >> ../logs/m8-hb.log 2>&1
preview chromium 20 ../logs/m8-plate-fission.chromium.json node m8/plate8.mjs 5401 fission --pages fission --grounds daraksha --schemes dark,light --shots ../logs/m8-q10-shots --shotpages fission >> ../logs/m8-hb.log 2>&1
preview chromium 20 ../logs/m8-plate-fission-match.chromium.json node m8/plate8.mjs 5401 fission-match --label match --neck match --pages fission --grounds daraksha --schemes dark,light --shots ../logs/m8-q10-shots --shotpages fission >> ../logs/m8-hb.log 2>&1
preview webkit 25 ../logs/m8-plate-fission.webkit.json node m8/plate8.mjs 5401 fission --engine webkit --pages fission --grounds daraksha --schemes dark,light --shots ../logs/m8-q10-shots --shotpages fission >> ../logs/m8-hb.log 2>&1
preview webkit 25 ../logs/m8-plate-fission-match.webkit.json node m8/plate8.mjs 5401 fission-match --engine webkit --label match --neck match --pages fission --grounds daraksha --schemes dark,light --shots ../logs/m8-q10-shots --shotpages fission >> ../logs/m8-hb.log 2>&1
none raw 25 - VITE_DOCK_HOLD=1 ~/.claude/guard/guarded --timeout 25 -- m8/build8.sh /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8 dist-wi8 > ../logs/m8-build.log 2>&1
preview chromium 20 - node m8/owner9.mjs 5401 ../logs/m8-owner --engine chromium --only q17 >> ../logs/m8-hb.log 2>&1
preview webkit 25 - node m8/owner9.mjs 5401 ../logs/m8-owner --engine webkit --only q17 >> ../logs/m8-hb.log 2>&1
preview gpu 30 ../logs/m8-cost.build2.chromium.json node m8/cost8.mjs 5401 build2 >> ../logs/m8-hb.log 2>&1
dev raw 60 ../logs/m8-plant-g2-facehalf.txt m8/plantrun8.sh g2-facehalf
dev raw 60 ../logs/m8-plant-g4-ghost.txt m8/plantrun8.sh g4-ghost
dev raw 60 ../logs/m8-plant-g8-exempt.txt m8/plantrun8.sh g8-exempt
dev raw 60 ../logs/m8-plant-g8-trigger.txt m8/plantrun8.sh g8-trigger
dev raw 60 ../logs/m8-plant-g11-rest.txt m8/plantrun8.sh g11-rest
dev raw 60 ../logs/m8-plant-g13-tabsvg.txt m8/plantrun8.sh g13-tabsvg
dev raw 80 ../logs/m8-plant-g15-baked.txt m8/plantrun8.sh g15-baked
dev raw 80 ../logs/m8-plant-g15-onestep.txt m8/plantrun8.sh g15-onestep
dev raw 80 ../logs/m8-cost.h9-fitmemory.chromium.json m8/h9.sh
dev raw 40 ../logs/m8-owner/owner9.proto.webkit.json m8/proto14.sh
none raw 120 ../logs/m8-g14plant-zoom.log m8/g14plantrun8.sh
