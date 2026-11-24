| cell | gesture | hand→picture px | release→rest ms | picture: biggest step / back-steps (largest) | strip scroll: back-steps (largest) | content lag max / max one-frame change (% of member width) | frames >25 ms | commit ms | page scroll calls |
|---|---|---|---|---|---|---|---|---|---|
| atlas.pager.1440 chromium | next | – | 244 | 56.6 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 16.8) | 26.3 (0→1) | 2 (2 instant); first at 4.8 ms, strip at 0 px |
| atlas.pager.1440 chromium | prev | – | 221.5 | 60.5 / 0 (0) | – (0) | 0 / 0 | 0 (max 10.2) | 9.1 (1→0) | 2 (2 instant); first at 3.7 ms, strip at 808 px |
| atlas.pager.1440 chromium | dot | – | 218.9 | 113.0 / 0 (0) | – (0) | 0 / 0 | 0 (max 10.3) | 8.5 (0→2) | 2 (2 instant); first at 4.1 ms, strip at 0 px |
| atlas.pager.1440 (traced) chromium | next | – | 217.7 | 55.8 / 0 (0) | – (0) | 0 / 0 | 0 (max 16.4) | 25.6 (0→1) | 2 (2 instant); first at 4.3 ms, strip at 0 px |
| atlas.pager.1440 (traced) chromium | prev | – | 212 | 57.0 / 0 (0) | – (0) | 0 / 0 | 0 (max 10.3) | 8.5 (1→0) | 2 (2 instant); first at 3.8 ms, strip at 808 px |
| atlas.pager.1440 (traced) chromium | dot | – | 212.9 | 135.8 / 0 (0) | – (0) | 0 / 0 | 0 (max 10.3) | 7.9 (0→2) | 2 (2 instant); first at 3.7 ms, strip at 0 px |
| atlas.pager.390 chromium | next | – | 275.6 | 30.6 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | 63.5 (0→1) | 2 (2 instant); first at 57.9 ms, strip at 0 px |
| atlas.pager.390 chromium | prev | – | 275.8 | 31.7 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.1) | 62.3 (1→0) | 2 (2 instant); first at 56.1 ms, strip at 390 px |
| atlas.pager.390 chromium | dot | – | 276.1 | 53.9 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.2) | 64.7 (0→2) | 2 (2 instant); first at 59.4 ms, strip at 0 px |
| atlas.touch.1440 chromium | swipe | -435→-414 | 849.8 | 315.7 / 27 (315.7) | 5 (320) | 8 / 8 | 0 (max 10.3) | 351.2 (0→1) | 2 (2 instant); first at 344.5 ms, strip at 475 px |
| atlas.touch.1440 chromium | flick | -130→-138 | 966.7 | 317.3 / 25 (317.3) | 5 (322) | 8 / 8 | 0 (max 10.3) | 244.8 (1→2) | 2 (2 instant); first at 236.1 ms, strip at 1281 px |
| atlas.touch.1440 chromium | carry | -621→-810 | – | – / – (0) | 1 (145) | 8 / 6.8 | 0 (max 16.4) | 586.4 (2→3) | 2 (2 instant); first at 574.9 ms, strip at 2084 px |
| atlas.touch.390 chromium | swipe | -200→-184 | 750.2 | 153.4 / 11 (153.4) | 5 (155) | 8 / 8 | 0 (max 17.4) | 380.8 (0→1) | 2 (2 instant); first at 372.9 ms, strip at 229 px |
| atlas.touch.390 chromium | flick | -130→-128 | 792.3 | 149.0 / 13 (149.0) | 5 (152) | 8 / 8 | 0 (max 10.3) | 203.8 (1→2) | 2 (2 instant); first at 195.4 ms, strip at 620 px |
| atlas.touch.390 chromium | carry | -286→-390 | – | – / – (0) | 1 (40) | 7.7 / 7.1 | 0 (max 10.3) | 661.6 (2→3) | 2 (2 instant); first at 648.3 ms, strip at 1014 px |
| atlas.touch.390 (traced) chromium | swipe | -200→-185 | 766.7 | 151.8 / 11 (151.8) | 5 (154) | 8 / 8 | 0 (max 10.2) | 371.6 (0→1) | 2 (2 instant); first at 363.8 ms, strip at 229 px |
| atlas.touch.390 (traced) chromium | flick | -130→-127 | 440.3 | 151.8 / 3 (151.8) | 3 (154) | 8 / 8 | 0 (max 10.1) | 187.6 (1→2) | 2 (2 instant); first at 179.6 ms, strip at 619 px |
| atlas.touch.390 (traced) chromium | carry | -286→-390 | – | – / – (0) | 1 (40) | 8 / 8 | 0 (max 24.1) | 624.6 (2→3) | 2 (2 instant); first at 614.4 ms, strip at 1014 px |
| atlas.wheel.1440 chromium | wheel | – | 183.3 | 351.6 / 1 (351.6) | 1 (355) | 8 / 8 | 0 (max 10.3) | 427.5 (0→1) | 2 (2 instant); first at 418.9 ms, strip at 460 px |
| atlas.wheel.390 chromium | wheel | – | 225.8 | 156.3 / 1 (156.3) | 1 (158) | 8 / 8 | 0 (max 10.3) | 260.5 (0→1) | 2 (2 instant); first at 253.1 ms, strip at 234 px |
| atlas.wheelraw.1440 chromium | wheel | – | 158.6 | 28.9 / 2 (24.1) | 47 (43) | 8 / 15 | 0 (max 16.6) | none | 0 |
| atlas.wheelraw.390 chromium | wheel | – | 192.2 | 14.9 / 2 (5.0) | 49 (21) | 8 / 11.5 | 0 (max 10.3) | none | 0 |
| daraksha.drag.1440 chromium | swipe | -197→-189 | 689.8 | 25.3 / 0 (0) | – (0) | – / – | 0 (max 17.3) | 352.9 (0→1) | 0 |
| daraksha.drag.1440 chromium | flick | -130→-122 | 690.6 | 24.2 / 0 (0) | – (0) | – / – | 0 (max 16.6) | 104.4 (1→2) | 0 |
| daraksha.drag.1440 chromium | carry | -281→-273 | 690.4 | 25.8 / 0 (0) | – (0) | – / – | 0 (max 10.4) | 922 (2→3) | 0 |
| daraksha.drag.1440 webkit | swipe | -197→-189 | 797 | 43.5 / 0 (0) | – (0) | – / – | 0 (max 22) | 348 (0→1) | 0 |
| daraksha.drag.1440 webkit | flick | -130→-122 | 799 | 43.1 / 0 (0) | – (0) | – / – | 0 (max 25) | 129 (1→2) | 0 |
| daraksha.drag.1440 webkit | carry | -281→-273 | 933 | 83.8 / 0 (0) | – (0) | – / – | 61 (max 40) | 940 (2→3) | 0 |
| daraksha.drag.390 chromium | swipe | -183→-175 | 688.4 | 13.9 / 0 (0) | – (0) | – / – | 0 (max 16.4) | 353.8 (0→1) | 0 |
| daraksha.drag.390 chromium | flick | -130→-122 | 699.8 | 14.4 / 0 (0) | – (0) | – / – | 0 (max 16.6) | 101 (1→2) | 0 |
| daraksha.drag.390 chromium | carry | -261→-253 | 695.6 | 13.0 / 0 (0) | – (0) | – / – | 0 (max 10.3) | none | 0 |
| daraksha.drag.390 webkit | swipe | -183→-175 | 797 | 56.2 / 0 (0) | – (0) | – / – | 57 (max 40) | 345 (0→1) | 0 |
| daraksha.drag.390 webkit | flick | -130→-122 | 900 | 48.9 / 0 (0) | – (0) | – / – | 52 (max 35) | 105 (1→2) | 0 |
| daraksha.drag.390 webkit | carry | -261→-253 | 800 | 48.9 / 0 (0) | – (0) | – / – | 70 (max 35) | none | 0 |
| daraksha.pager.1440 chromium | next | – | 238.8 | 7.2 / 0 (0) | – (0) | – / – | 0 (max 10.3) | 13.6 (0→1) | 0 |
| daraksha.pager.1440 chromium | prev | – | 177.6 | 6.8 / 0 (0) | – (0) | – / – | 0 (max 15.8) | 11 (1→0) | 0 |
| daraksha.pager.1440 chromium | dot | – | 245.5 | 7 / 0 (0) | – (0) | – / – | 0 (max 17.7) | 19.5 (0→2) | 0 |
| daraksha.pager.1440 webkit | next | – | 400 | 24.0 / 0 (0) | – (0) | – / – | 46 (max 34) | 31 (0→1) | 0 |
| daraksha.pager.1440 webkit | prev | – | 200 | 24.0 / 0 (0) | – (0) | – / – | 40 (max 37) | 14 (1→0) | 0 |
| daraksha.pager.1440 webkit | dot | – | 397 | 23.7 / 0 (0) | – (0) | – / – | 42 (max 35) | 13 (0→2) | 0 |
| daraksha.pager.390 chromium | next | – | 205.8 | 1.9 / 0 (0) | – (0) | – / – | 0 (max 10.3) | 12.2 (0→1) | 0 |
| daraksha.pager.390 chromium | prev | – | 109.8 | 2.2 / 0 (0) | – (0) | – / – | 0 (max 10.1) | 11.5 (1→0) | 0 |
| daraksha.pager.390 chromium | dot | – | 275.6 | 2.1 / 0 (0) | – (0) | – / – | 0 (max 10.3) | 92.2 (0→2) | 0 |
| daraksha.pager.390 webkit | next | – | 334 | 6.5 / 0 (0) | – (0) | – / – | 52 (max 34) | 32 (0→1) | 0 |
| daraksha.pager.390 webkit | prev | – | 167 | 6.5 / 0 (0) | – (0) | – / – | 47 (max 35) | 13 (1→0) | 0 |
| daraksha.pager.390 webkit | dot | – | 366 | 6.5 / 0 (0) | – (0) | – / – | 49 (max 35) | 29 (0→2) | 0 |
| daraksha.touch.1440 chromium | swipe | -197→-189 | 781.7 | 24.6 / 0 (0) | – (0) | – / – | 1 (max 367.4) | 745.4 (0→1) | 0 |
| daraksha.touch.1440 chromium | flick | -130→-122 | 782 | 24.6 / 0 (0) | – (0) | – / – | 1 (max 182.4) | 316.3 (1→2) | 0 |
| daraksha.touch.1440 chromium | carry | -281→-273 | 791 | 22.9 / 0 (0) | – (0) | – / – | 0 (max 16.6) | 966 (2→3) | 0 |
| daraksha.touch.1440 (traced) chromium | swipe | -197→-189 | 732.7 | 23.2 / 0 (0) | – (0) | – / – | 0 (max 10.3) | 375.4 (0→1) | 0 |
| daraksha.touch.1440 (traced) chromium | flick | -130→-122 | 693 | 25.5 / 0 (0) | – (0) | – / – | 0 (max 10.3) | 106.1 (1→2) | 0 |
| daraksha.touch.1440 (traced) chromium | carry | -281→-273 | 700.1 | 25.9 / 0 (0) | – (0) | – / – | 0 (max 10.3) | 939.6 (2→3) | 0 |
| daraksha.touch.390 chromium | swipe | -183→-175 | 681.4 | 14.2 / 0 (0) | – (0) | – / – | 0 (max 10.4) | 376.1 (0→1) | 0 |
| daraksha.touch.390 chromium | flick | -130→-122 | 683.9 | 13.2 / 0 (0) | – (0) | – / – | 0 (max 10.2) | 131.2 (1→2) | 0 |
| daraksha.touch.390 chromium | carry | -261→-253 | 681.2 | 13.1 / 0 (0) | – (0) | – / – | 0 (max 10.3) | none | 0 |
| daraksha.wheel.1440 chromium | wheel | – | – | – / – (0) | – (0) | – / – | 0 (max 10.3) | none | 0 |
| daraksha.wheel.1440 webkit | wheel | – | – | – / – (0) | – (0) | – / – | 60 (max 34) | none | 0 |
| daraksha.wheel.390 chromium | wheel | – | – | – / – (0) | – (0) | – / – | 0 (max 10.3) | none | 0 |
| daraksha.wheel.390 webkit | wheel | – | – | – / – (0) | – (0) | – / – | 59 (max 35) | none | 0 |
| demo.pager.1440 chromium | next | – | 171.4 | 22 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 16.7) | 24.8 (0→1) | 1 (1 smooth); first at 3.7 ms, strip at 0 px |
| demo.pager.1440 chromium | prev | – | 175.3 | 22 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.4) | 7.8 (1→0) | 1 (1 smooth); first at 3.5 ms, strip at 121 px |
| demo.pager.1440 webkit | next | – | 133 | 36 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 19) | 16 (0→1) | 1 (1 smooth); first at 8 ms, strip at 0 px |
| demo.pager.1440 webkit | prev | – | 48 | 3 / 1 (3) | 1 (3) | 0 / 0 | 0 (max 18) | 23 (1→0); 54 (0→1) | 2 (2 smooth); first at 20 ms, strip at 121 px |
| demo.pager.390 chromium | next | – | 324.6 | 33 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | 66.5 (0→1) | 1 (1 smooth); first at 61.7 ms, strip at 0 px |
| demo.pager.390 chromium | prev | – | 309.2 | 34 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.2) | 63.3 (1→0) | 1 (1 smooth); first at 57.6 ms, strip at 254 px |
| demo.pager.390 webkit | next | – | 251 | 48 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 22) | 41 (0→1) | 1 (1 smooth); first at 36 ms, strip at 0 px |
| demo.pager.390 webkit | prev | – | 199 | 47 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 19) | 12 (1→0) | 1 (1 smooth); first at 9 ms, strip at 254 px |
| demo.touch.1440 chromium | swipe | -171→-154 | 200.4 | 22.9 / 2 (8.0) | 0 (0) | 8 / 8 | 0 (max 10.4) | 374.2 (0→1) | 1 (1 smooth); first at 365.1 ms, strip at 192 px |
| demo.touch.1440 chromium | flick | -130→-132 | 233.5 | 23.9 / 4 (9.0) | 0 (0) | 8 / 7.8 | 0 (max 10.4) | 179.9 (1→2) | 1 (1 smooth); first at 171.1 ms, strip at 516 px |
| demo.touch.1440 chromium | carry | -244→-323 | – | – / – (0) | 0 (0) | 8 / 6.7 | 0 (max 10.3) | 627.9 (2→3) | 1 (1 smooth); first at 616.8 ms, strip at 841 px |
| demo.touch.390 chromium | swipe | -205→-187 | 208.4 | 26.2 / 4 (10.0) | 0 (0) | 8 / 8 | 0 (max 10.1) | 354.3 (0→1) | 1 (1 smooth); first at 345.7 ms, strip at 216 px |
| demo.touch.390 chromium | flick | -130→-128 | 257.8 | 26.9 / 3 (8.0) | 0 (0) | 8 / 7.8 | 0 (max 10.3) | 187.8 (1→2) | 1 (1 smooth); first at 180.1 ms, strip at 592 px |
| demo.touch.390 chromium | carry | -293→-380 | – | – / – (0) | 0 (0) | 8 / 7.1 | 0 (max 10.4) | 592.1 (2→3) | 1 (1 smooth); first at 580.3 ms, strip at 974 px |
| demo.wheel.1440 chromium | wheel | – | 175.6 | 21.9 / 2 (14) | 0 (0) | 8 / 8 | 0 (max 10.4) | 222.5 (0→1) | 1 (1 smooth); first at 213.6 ms, strip at 189 px |
| demo.wheel.1440 webkit | wheel | – | 385 | 35.9 / 0 (0) | 5 (2) | 8 / 5.6 | 0 (max 19) | 800 (0→1) | 1 (1 smooth); first at 783 ms, strip at 190 px |
| demo.wheel.390 chromium | wheel | – | 150 | 24.9 / 2 (15.7) | 0 (0) | 8 / 8 | 0 (max 10.3) | 225 (0→1) | 1 (1 smooth); first at 213.1 ms, strip at 220 px |
| demo.wheel.390 webkit | wheel | – | 468 | 35.9 / 2 (10.4) | 5 (25) | 8 / 5.7 | 0 (max 19) | 817 (0→1) | 1 (1 smooth); first at 800 ms, strip at 215 px |
| hero-canvas.pager.1440 chromium | next | – | 567.9 | 75.8 / 4 (16.6) | 0 (0) | 8 / 2 | 0 (max 18.1) | 30.3 (0→1) | 1 (1 smooth); first at 6.3 ms, strip at 0 px |
| hero-canvas.pager.1440 chromium | prev | – | 529.7 | 69.8 / 9 (15.0) | 0 (0) | 8 / 1.9 | 0 (max 10.1) | 11.7 (1→0) | 1 (1 smooth); first at 5.3 ms, strip at 1054 px |
| hero-canvas.pager.1440 chromium | dot | – | – | – / – (0) | – (0) | 0.4 / 0 | 0 (max 10.3) | none | 0 |
| hero-canvas.pager.1440 webkit | next | – | 236 | 260.3 / 0 (0) | 0 (0) | 8 / 8 | 0 (max 24) | 34 (0→1) | 1 (1 smooth); first at 16 ms, strip at 0 px |
| hero-canvas.pager.1440 webkit | prev | – | 239 | 192.5 / 0 (0) | 0 (0) | 8 / 7.7 | 0 (max 19) | 30 (1→0) | 1 (1 smooth); first at 11 ms, strip at 1054 px |
| hero-canvas.pager.1440 webkit | dot | – | – | – / – (0) | – (0) | 2 / 0 | 0 (max 23) | none | 0 |
| hero-canvas.pager.390 chromium | next | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10.3) | none | 0 |
| hero-canvas.pager.390 chromium | prev | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10.2) | none | 0 |
| hero-canvas.pager.390 chromium | dot | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10.2) | none | 0 |
| hero-canvas.touch.1440 chromium | swipe | -562→-534 | 509.5 | 82.8 / 4 (27.9) | 2 (3) | 8 / 8 | 0 (max 17.6) | 375.1 (0→1) | 1 (1 smooth); first at 365.9 ms, strip at 613 px |
| hero-canvas.touch.1440 chromium | flick | -130→-144 | 484.4 | 77.9 / 4 (33.6) | 0 (0) | 8 / 7.9 | 0 (max 16.7) | 250.5 (1→2) | 1 (1 smooth); first at 241.3 ms, strip at 1631 px |
| hero-canvas.touch.1440 chromium | carry | -803→-1035 | – | – / – (0) | 2 (17) | 8 / 11.4 | 0 (max 18.1) | 541.2 (2→3) | 1 (1 smooth); first at 530.7 ms, strip at 2658 px |
| hero-canvas.touch.390 chromium | swipe | -218→-201 | 384.2 | 45.9 / 4 (15.0) | 2 (2) | 8 / 8 | 0 (max 18) | 407.9 (0→1) | 1 (1 smooth); first at 390.8 ms, strip at 250 px |
| hero-canvas.touch.390 chromium | flick | -130→-131 | 300.3 | 29.6 / 2 (14.0) | 0 (0) | 8 / 7.8 | 0 (max 17.4) | 207.8 (1→2) | 1 (1 smooth); first at 200.3 ms, strip at 670 px |
| hero-canvas.touch.390 chromium | carry | -312→-422 | – | – / – (0) | 0 (0) | 8 / 7 | 0 (max 18.5) | 626.6 (2→3) | 1 (1 smooth); first at 615.6 ms, strip at 1092 px |
| hero-canvas.touch.390 (traced) chromium | swipe | -218→-201 | 317.5 | 32.9 / 3 (14.0) | 2 (1) | 8 / 8 | 0 (max 17) | 397.3 (0→1) | 1 (1 smooth); first at 391.8 ms, strip at 251 px |
| hero-canvas.touch.390 (traced) chromium | flick | -130→-128 | 302.1 | 41.9 / 5 (38.9) | 0 (0) | 8 / 7.8 | 0 (max 16.7) | 213.7 (1→2) | 1 (1 smooth); first at 204.7 ms, strip at 675 px |
| hero-canvas.touch.390 (traced) chromium | carry | -312→-424 | – | – / – (0) | 0 (0) | 8 / 6.7 | 0 (max 17.2) | 625.7 (2→3) | 1 (1 smooth); first at 616 ms, strip at 1092 px |
| hero-canvas.wheel.1440 chromium | wheel | – | 308.3 | 80.8 / 5 (18.0) | 0 (0) | 8 / 7.7 | 0 (max 16.9) | 540.1 (0→1) | 1 (1 smooth); first at 532.5 ms, strip at 588 px |
| hero-canvas.wheel.1440 webkit | wheel | – | 511 | 107.7 / 0 (0) | 6 (27) | 8 / 16 | 2 (max 38) | 912 (0→1) | 1 (1 smooth); first at 884 ms, strip at 594 px |
| hero-canvas.wheel.390 chromium | wheel | – | 224.5 | 40.9 / 2 (9.8) | 0 (0) | 8 / 8 | 0 (max 16.8) | 274.8 (0→1) | 1 (1 smooth); first at 266.6 ms, strip at 247 px |
| hero-canvas-active.pager.1440 chromium | next | – | 539.7 | 72.8 / 6 (17.1) | 0 (0) | 8 / 2.5 | 0 (max 16.7) | 25.2 (0→1) | 1 (1 smooth); first at 4.4 ms, strip at 0 px |
| hero-canvas-active.pager.1440 chromium | prev | – | 526.7 | 75.8 / 11 (18.9) | 0 (0) | 8 / 1.6 | 0 (max 10.3) | 8.8 (1→0) | 1 (1 smooth); first at 4 ms, strip at 1054 px |
| hero-canvas-active.pager.1440 chromium | dot | – | – | – / – (0) | – (0) | 0.6 / 0 | 0 (max 10.2) | none | 0 |
| hero-canvas-active.pager.390 chromium | next | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10.1) | none | 0 |
| hero-canvas-active.pager.390 chromium | prev | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10.2) | none | 0 |
| hero-canvas-active.pager.390 chromium | dot | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10.2) | none | 0 |
| hero-canvas-active.touch.1440 chromium | swipe | -562→-534 | 491.6 | 76.9 / 7 (21.4) | 2 (1) | 8 / 8 | 0 (max 10.3) | 372.5 (0→1) | 1 (1 smooth); first at 363.7 ms, strip at 613 px |
| hero-canvas-active.touch.1440 chromium | flick | -130→-153 | 592.1 | 77.1 / 7 (15.9) | 2 (1) | 8 / 7.9 | 0 (max 10.3) | 244.4 (1→2) | 1 (1 smooth); first at 237.2 ms, strip at 1636 px |
| hero-canvas-active.touch.1440 chromium | carry | -803→-1034 | – | – / – (0) | 0 (0) | 8 / 6.5 | 0 (max 10.3) | 545.6 (2→3) | 1 (1 smooth); first at 533.9 ms, strip at 2657 px |
| hero-canvas-active.touch.390 chromium | swipe | -218→-202 | 301.5 | 27.2 / 3 (14.9) | 2 (1) | 8 / 8 | 0 (max 10.4) | 398.7 (0→1) | 1 (1 smooth); first at 388.6 ms, strip at 250 px |
| hero-canvas-active.touch.390 chromium | flick | -130→-130 | 292.9 | 28.2 / 5 (19.3) | 0 (0) | 8 / 7.8 | 0 (max 10.1) | 217.4 (1→2) | 1 (1 smooth); first at 209 ms, strip at 677 px |
| hero-canvas-active.touch.390 chromium | carry | -312→-424 | – | – / – (0) | 0 (0) | 8 / 7.1 | 0 (max 10.2) | 628.9 (2→3) | 1 (1 smooth); first at 615.4 ms, strip at 1092 px |
| hero-none.pager.1440 chromium | next | – | 540.2 | 74.8 / 6 (20.1) | 0 (0) | 8 / 2.4 | 0 (max 17.6) | 25.1 (0→1) | 1 (1 smooth); first at 4 ms, strip at 0 px |
| hero-none.pager.1440 chromium | prev | – | 543.4 | 68.8 / 3 (14.0) | 0 (0) | 8 / 2.1 | 0 (max 10.3) | 10.5 (1→0) | 1 (1 smooth); first at 4 ms, strip at 1054 px |
| hero-none.pager.1440 chromium | dot | – | – | – / – (0) | – (0) | 0.3 / 0 | 0 (max 10.3) | none | 0 |
| hero-none.pager.1440 webkit | next | – | 238 | 184.5 / 0 (0) | 1 (17) | 8 / 8 | 0 (max 19) | 15 (0→1) | 1 (1 smooth); first at 10 ms, strip at 0 px |
| hero-none.pager.1440 webkit | prev | – | 246 | 190.5 / 1 (50.6) | 0 (0) | 8 / 7.9 | 0 (max 18) | 24 (1→0) | 1 (1 smooth); first at 16 ms, strip at 1036 px |
| hero-none.pager.1440 webkit | dot | – | – | – / – (0) | – (0) | 6.1 / 0 | 0 (max 19) | none | 0 |
| hero-none.pager.390 chromium | next | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10.2) | none | 0 |
| hero-none.pager.390 chromium | prev | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10.3) | none | 0 |
| hero-none.pager.390 chromium | dot | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 9.9) | none | 0 |
| hero-none.pager.390 webkit | next | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 18) | none | 0 |
| hero-none.pager.390 webkit | prev | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 17) | none | 0 |
| hero-none.pager.390 webkit | dot | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 17) | none | 0 |
| hero-none.touch.1440 chromium | swipe | -562→-533 | 492.8 | 76.9 / 5 (18.9) | 2 (1) | 8 / 8 | 0 (max 10.4) | 356.3 (0→1) | 1 (1 smooth); first at 347 ms, strip at 612 px |
| hero-none.touch.1440 chromium | flick | -130→-143 | 601 | 76.6 / 5 (20.9) | 2 (1) | 8 / 7.9 | 0 (max 10.4) | 246.9 (1→2) | 1 (1 smooth); first at 238 ms, strip at 1632 px |
| hero-none.touch.1440 chromium | carry | -803→-1034 | – | – / – (0) | 0 (0) | 8 / 6.6 | 0 (max 10.2) | 538.9 (2→3) | 1 (1 smooth); first at 527 ms, strip at 2657 px |
| hero-none.touch.390 chromium | swipe | -218→-202 | 300.8 | 28.5 / 5 (7.8) | 2 (1) | 8 / 8 | 0 (max 10.3) | 373.9 (0→1) | 1 (1 smooth); first at 365.2 ms, strip at 250 px |
| hero-none.touch.390 chromium | flick | -130→-129 | 292.6 | 28.6 / 7 (10.1) | 0 (0) | 8 / 7.8 | 0 (max 10.4) | 212.7 (1→2) | 1 (1 smooth); first at 204.4 ms, strip at 676 px |
| hero-none.touch.390 chromium | carry | -312→-425 | – | – / – (0) | 0 (0) | 8 / 7 | 0 (max 16.7) | 625.2 (2→3) | 1 (1 smooth); first at 613.9 ms, strip at 1092 px |
| hero-none.touch.390 (traced) chromium | swipe | -218→-202 | 307.3 | 31.9 / 5 (8.2) | 2 (1) | 8 / 8 | 0 (max 10.3) | 367.4 (0→1) | 1 (1 smooth); first at 361.4 ms, strip at 250 px |
| hero-none.touch.390 (traced) chromium | flick | -130→-129 | 291.8 | 28.6 / 2 (10.0) | 0 (0) | 8 / 7.8 | 0 (max 10.2) | 195.6 (1→2) | 1 (1 smooth); first at 187.9 ms, strip at 676 px |
| hero-none.touch.390 (traced) chromium | carry | -312→-422 | – | – / – (0) | 0 (0) | 8 / 7.9 | 0 (max 16.6) | 590.4 (2→3) | 1 (1 smooth); first at 578.2 ms, strip at 1092 px |
| hero-none.wheel.1440 chromium | wheel | – | 297.9 | 43.9 / 6 (14.3) | 0 (0) | 8 / 6.7 | 0 (max 10.2) | 535.5 (0→1) | 1 (1 smooth); first at 526.6 ms, strip at 592 px |
| hero-none.wheel.1440 webkit | wheel | – | 518 | 83.8 / 2 (63.8) | 7 (42) | 8 / 10.7 | 0 (max 20) | 903 (0→1) | 1 (1 smooth); first at 884 ms, strip at 603 px |
| hero-none.wheel.390 chromium | wheel | – | 208.6 | 28.5 / 2 (7.9) | 0 (0) | 8 / 8 | 0 (max 10.4) | 270.1 (0→1) | 1 (1 smooth); first at 260.7 ms, strip at 247 px |
| hero-none.wheel.390 webkit | wheel | – | 485 | 37.9 / 4 (32.9) | 7 (24) | 8 / 10 | 0 (max 18) | 835 (0→1) | 1 (1 smooth); first at 817 ms, strip at 253 px |
| hero-none.wheelraw.1440 chromium | wheel | – | 140.8 | 39.4 / 1 (17.0) | 49 (57) | 8 / 16 | 0 (max 10.1) | none | 0 |
| hero-none.wheelraw.390 chromium | wheel | – | 165.9 | 18.2 / 1 (3.0) | 47 (21) | 8 / 12.4 | 0 (max 10.4) | none | 0 |
| hero-none-bare.touch.1440 chromium | swipe | -562→-615 | 691 | 18 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.2) | none | 0 |
| hero-none-bare.touch.1440 chromium | flick | -130→-231 | 823.6 | 33 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | none | 0 |
| hero-none-bare.touch.1440 chromium | carry | -803→-798 | 158.7 | 23 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.4) | none | 0 |
| hero-none-bare.touch.390 chromium | swipe | -218→-232 | 549.1 | 8 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | none | 0 |
| hero-none-bare.touch.390 chromium | flick | -130→-159 | 615.4 | 12 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | none | 0 |
| hero-none-bare.touch.390 chromium | carry | -312→-301 | 189.9 | 10 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | none | 0 |
| hero-none-bare.touch.390 (traced) chromium | swipe | -218→-230 | 551.2 | 10 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 18.3) | none | 0 |
| hero-none-bare.touch.390 (traced) chromium | flick | -130→-127 | 616.4 | 33 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.4) | none | 0 |
| hero-none-bare.touch.390 (traced) chromium | carry | -312→-295 | 183.1 | 11 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 17.7) | none | 0 |
| hero-none-bare.wheel.1440 chromium | wheel | – | 68.1 | 55 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | none | 0 |
| hero-none-bare.wheel.1440 webkit | wheel | – | 751 | 33 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 20) | none | 0 |
| hero-none-bare.wheel.390 chromium | wheel | – | 115.5 | 16 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | none | 0 |
| hero-none-bare.wheel.390 webkit | wheel | – | 600 | 17 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 20) | none | 0 |
| hero-none-flat.touch.1440 chromium | swipe | -562→-608 | 343.7 | 43 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.4) | 355.8 (0→1) | 1 (1 smooth); first at 346.2 ms, strip at 608 px |
| hero-none-flat.touch.1440 chromium | flick | -130→-229 | 459 | 45 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.4) | 260.2 (1→2) | 1 (1 smooth); first at 250.1 ms, strip at 1635 px |
| hero-none-flat.touch.1440 chromium | carry | -803→-1036 | – | – / – (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | 557.4 (2→3) | 1 (1 smooth); first at 545.2 ms, strip at 2659 px |
| hero-none-flat.touch.390 chromium | swipe | -218→-232 | 234.5 | 30 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | 368.3 (0→1) | 1 (1 smooth); first at 359 ms, strip at 247 px |
| hero-none-flat.touch.390 chromium | flick | -130→-160 | 292.2 | 31 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | 215.8 (1→2) | 1 (1 smooth); first at 207.3 ms, strip at 670 px |
| hero-none-flat.touch.390 chromium | carry | -312→-422 | – | – / – (0) | 0 (0) | 0 / 0 | 0 (max 10.2) | 639.3 (2→3) | 1 (1 smooth); first at 628.4 ms, strip at 1093 px |
| hero-none-flat.touch.390 (traced) chromium | swipe | -218→-233 | 232.3 | 25 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | 372.9 (0→1) | 1 (1 smooth); first at 365.3 ms, strip at 249 px |
| hero-none-flat.touch.390 (traced) chromium | flick | -130→-161 | 292.7 | 25 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | 196.5 (1→2) | 1 (1 smooth); first at 188.7 ms, strip at 672 px |
| hero-none-flat.touch.390 (traced) chromium | carry | -312→-422 | – | – / – (0) | 0 (0) | 0 / 0 | 0 (max 18.1) | 620.8 (2→3) | 1 (1 smooth); first at 604.6 ms, strip at 1102 px |
| hero-none-flat.wheel.1440 chromium | wheel | – | 299.3 | 44 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.3) | 535.2 (0→1) | 1 (1 smooth); first at 526.3 ms, strip at 591 px |
| hero-none-flat.wheel.1440 webkit | wheel | – | 503 | 86 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 21) | 485 (0→1); 900 (1→2) | 2 (2 smooth); first at 466 ms, strip at 586 px |
| hero-none-flat.wheel.390 chromium | wheel | – | 207.3 | 28 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 10.4) | 278.5 (0→1) | 1 (1 smooth); first at 269.2 ms, strip at 247 px |
| hero-none-flat.wheel.390 webkit | wheel | – | 272 | 36 / 0 (0) | 0 (0) | 0 / 0 | 0 (max 24) | 683 (0→1) | 1 (1 smooth); first at 664 ms, strip at 250 px |
| hero-svg.pager.1440 chromium | next | – | 605.6 | 132.7 / 18 (37.2) | 0 (0) | 8 / 4.6 | 1 (max 41.7) | 61 (0→1) | 1 (1 smooth); first at 26.7 ms, strip at 0 px |
| hero-svg.pager.1440 chromium | prev | – | 565.1 | 129.7 / 13 (42.2) | 0 (0) | 8 / 6 | 0 (max 25) | 41.2 (1→0) | 1 (1 smooth); first at 25.7 ms, strip at 1054 px |
| hero-svg.pager.1440 chromium | dot | – | – | – / – (0) | – (0) | 0.5 / 0 | 0 (max 17.7) | none | 0 |
| hero-svg.pager.390 chromium | next | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 18.2) | none | 0 |
| hero-svg.pager.390 chromium | prev | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 18.3) | none | 0 |
| hero-svg.pager.390 chromium | dot | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 18.3) | none | 0 |
| hero-svg.touch.1440 chromium | swipe | -562→-716 | 73.1 | 323.7 / 0 (0) | 0 (0) | 8 / 8 | 29 (max 41.6) | 1168.5 (0→1) | 1 (1 smooth); first at 1133.6 ms, strip at 611 px |
| hero-svg.touch.1440 chromium | flick | -130→-200 | 987 | 101.7 / 5 (81.7) | 3 (37) | 8 / 8.3 | 22 (max 33.3) | 468.6 (1→2) | 1 (1 smooth); first at 444.1 ms, strip at 1639 px |
| hero-svg.touch.1440 chromium | carry | -803→-1075 | 186.9 | 13.3 / 1 (3.7) | 3 (39) | 8 / 9.4 | 29 (max 34.9) | 1662.8 (2→3) | 1 (1 smooth); first at 1641.5 ms, strip at 2669 px |
| hero-svg.touch.390 chromium | swipe | -218→-218 | 343.4 | 49.9 / 1 (4.5) | 1 (2) | 8 / 6.2 | 14 (max 33.4) | 950.3 (0→1) | 1 (1 smooth); first at 924 ms, strip at 249 px |
| hero-svg.touch.390 chromium | flick | -130→-114 | 183.3 | 37.9 / 1 (37.9) | 1 (6) | 8 / 7.7 | 13 (max 41.5) | none | 0 |
| hero-svg.touch.390 chromium | carry | -312→-424 | 151.2 | 3.2 / 1 (2) | 1 (1) | 8 / 4.1 | 32 (max 41.7) | 1779.5 (1→2) | 1 (1 smooth); first at 1749.9 ms, strip at 674 px |
| hero-svg.touch.390 (traced) chromium | swipe | -218→-214 | 425 | 51.9 / 1 (1.6) | 1 (1) | 8 / 6.2 | 7 (max 34.1) | 809.5 (0→1) | 1 (1 smooth); first at 798 ms, strip at 261 px |
| hero-svg.touch.390 (traced) chromium | flick | -130→-130 | 473.9 | 41.9 / 3 (41.9) | 1 (1) | 8 / 7.8 | 1 (max 25.1) | 333.6 (1→2) | 1 (1 smooth); first at 325 ms, strip at 680 px |
| hero-svg.touch.390 (traced) chromium | carry | -312→-421 | 133.5 | 2.4 / 1 (1.6) | 3 (12) | 8 / 12.1 | 1 (max 25.3) | 1066.6 (2→3) | 1 (1 smooth); first at 1058.9 ms, strip at 1096 px |
| hero-svg.wheel.1440 chromium | wheel | – | 53.2 | 275.3 / 0 (0) | 0 (0) | 8 / 6.9 | 1 (max 25.7) | 572.9 (0→1) | 1 (1 smooth); first at 555.7 ms, strip at 592 px |
| hero-svg.wheel.390 chromium | wheel | – | 121.1 | 40.9 / 2 (40.9) | 0 (0) | 8 / 8 | 2 (max 25.1) | 316.5 (0→1) | 1 (1 smooth); first at 297.7 ms, strip at 247 px |
| hero-svg-active.pager.1440 chromium | next | – | 549.7 | 68.8 / 8 (18.9) | 0 (0) | 8 / 2 | 0 (max 25) | 28.5 (0→1) | 1 (1 smooth); first at 4.4 ms, strip at 0 px |
| hero-svg-active.pager.1440 chromium | prev | – | 549.3 | 81.8 / 7 (19.1) | 0 (0) | 8 / 3.2 | 0 (max 10.4) | 10.5 (1→0) | 1 (1 smooth); first at 4.4 ms, strip at 1054 px |
| hero-svg-active.pager.1440 chromium | dot | – | – | – / – (0) | – (0) | 0.4 / 0 | 0 (max 10.1) | none | 0 |
| hero-svg-active.pager.390 chromium | next | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10.3) | none | 0 |
| hero-svg-active.pager.390 chromium | prev | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10.2) | none | 0 |
| hero-svg-active.pager.390 chromium | dot | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 9.8) | none | 0 |
| hero-svg-active.touch.1440 chromium | swipe | -562→-534 | 463.8 | 76.9 / 3 (8.8) | 2 (1) | 8 / 8 | 0 (max 16.7) | 374.8 (0→1) | 1 (1 smooth); first at 366.4 ms, strip at 613 px |
| hero-svg-active.touch.1440 chromium | flick | -130→-142 | 613.7 | 76.9 / 4 (45.9) | 2 (3) | 8 / 7.9 | 0 (max 17.3) | 251.6 (1→2) | 1 (1 smooth); first at 244.5 ms, strip at 1631 px |
| hero-svg-active.touch.1440 chromium | carry | -803→-1033 | – | – / – (0) | 0 (0) | 8 / 6.8 | 0 (max 24.9) | 545.7 (2→3) | 1 (1 smooth); first at 540.2 ms, strip at 2658 px |
| hero-svg-active.touch.390 chromium | swipe | -218→-202 | 363.8 | 52.9 / 4 (15.2) | 2 (2) | 8 / 8 | 0 (max 17.4) | 399.6 (0→1) | 1 (1 smooth); first at 390.9 ms, strip at 250 px |
| hero-svg-active.touch.390 chromium | flick | -130→-129 | 430.9 | 45.9 / 4 (12.7) | 2 (2) | 8 / 7.8 | 0 (max 17.4) | 213.6 (1→2) | 1 (1 smooth); first at 205.1 ms, strip at 676 px |
| hero-svg-active.touch.390 chromium | carry | -312→-420 | – | – / – (0) | 0 (0) | 8 / 6 | 0 (max 16.8) | 628.7 (2→3) | 1 (1 smooth); first at 623.1 ms, strip at 1092 px |
| hero-webp.pager.1440 chromium | next | – | 537.3 | 68.8 / 10 (18.1) | 0 (0) | 8 / 2.1 | 0 (max 16.7) | 27.5 (0→1) | 1 (1 smooth); first at 4.7 ms, strip at 0 px |
| hero-webp.pager.1440 chromium | prev | – | 535.6 | 67.8 / 7 (15.6) | 0 (0) | 8 / 2.4 | 0 (max 10.3) | 9.9 (1→0) | 1 (1 smooth); first at 5.4 ms, strip at 1054 px |
| hero-webp.pager.1440 chromium | dot | – | – | – / – (0) | – (0) | 0.2 / 0 | 0 (max 10.2) | none | 0 |
| hero-webp.pager.1440 webkit | next | – | 215 | 194.5 / 0 (0) | 0 (0) | 8 / 8 | 0 (max 18) | 13 (0→1) | 1 (1 smooth); first at 7 ms, strip at 0 px |
| hero-webp.pager.1440 webkit | prev | – | 252 | 186.5 / 2 (59.0) | 0 (0) | 8 / 7.8 | 0 (max 18) | 21 (1→0) | 1 (1 smooth); first at 6 ms, strip at 1054 px |
| hero-webp.pager.1440 webkit | dot | – | – | – / – (0) | – (0) | 6.5 / 0 | 0 (max 19) | none | 0 |
| hero-webp.pager.390 chromium | next | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10.3) | none | 0 |
| hero-webp.pager.390 chromium | prev | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10.4) | none | 0 |
| hero-webp.pager.390 chromium | dot | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 10) | none | 0 |
| hero-webp.pager.390 webkit | next | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 21) | none | 0 |
| hero-webp.pager.390 webkit | prev | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 23) | none | 0 |
| hero-webp.pager.390 webkit | dot | – | – | – / – (0) | – (0) | 0 / 0 | 0 (max 18) | none | 0 |
| hero-webp.touch.1440 chromium | swipe | -562→-534 | 509.1 | 76.9 / 9 (20.9) | 1 (1) | 8 / 8 | 0 (max 10) | 357.2 (0→1) | 1 (1 smooth); first at 348.4 ms, strip at 613 px |
| hero-webp.touch.1440 chromium | flick | -130→-140 | 642.6 | 76.7 / 11 (20.5) | 1 (2) | 8 / 7.9 | 0 (max 10.3) | 253 (1→2) | 1 (1 smooth); first at 244.2 ms, strip at 1625 px |
| hero-webp.touch.1440 chromium | carry | -803→-1044 | 157.6 | 4.4 / 5 (4.4) | 1 (1) | 8 / 6.9 | 0 (max 16.1) | 562.5 (2→3) | 1 (1 smooth); first at 550 ms, strip at 2664 px |
| hero-webp.touch.390 chromium | swipe | -218→-203 | 374.8 | 29.9 / 3 (7.9) | 1 (1) | 8 / 8 | 0 (max 10.1) | 371.9 (0→1) | 1 (1 smooth); first at 363 ms, strip at 251 px |
| hero-webp.touch.390 chromium | flick | -130→-127 | 434 | 28.5 / 5 (9.1) | 1 (1) | 8 / 7.8 | 0 (max 10.4) | 218.2 (1→2) | 1 (1 smooth); first at 209.5 ms, strip at 674 px |
| hero-webp.touch.390 chromium | carry | -312→-421 | 140.4 | 2.8 / 1 (1) | 1 (1) | 8 / 6.4 | 0 (max 10.4) | 640.9 (2→3) | 1 (1 smooth); first at 629 ms, strip at 1095 px |
| hero-webp.touch.390 (traced) chromium | swipe | -218→-202 | 367.5 | 28.7 / 5 (11.0) | 1 (1) | 8 / 8 | 0 (max 10.4) | 374.3 (0→1) | 1 (1 smooth); first at 368 ms, strip at 251 px |
| hero-webp.touch.390 (traced) chromium | flick | -130→-127 | 433.2 | 29.9 / 3 (7.6) | 1 (1) | 8 / 7.8 | 0 (max 10.2) | 192.2 (1→2) | 1 (1 smooth); first at 184.7 ms, strip at 674 px |
| hero-webp.touch.390 (traced) chromium | carry | -312→-417 | 141.9 | 6.4 / 1 (1.0) | 1 (1) | 8 / 7.9 | 0 (max 10.2) | 611.5 (2→3) | 1 (1 smooth); first at 601.4 ms, strip at 1095 px |
| hero-webp.wheel.1440 chromium | wheel | – | 309.7 | 44.9 / 3 (18.9) | 2 (2) | 8 / 8 | 0 (max 10.3) | 533.4 (0→1) | 1 (1 smooth); first at 524.9 ms, strip at 591 px |
| hero-webp.wheel.1440 webkit | wheel | – | 525 | 81.8 / 2 (70.8) | 7 (41) | 8 / 10 | 0 (max 23) | 902 (0→1) | 1 (1 smooth); first at 883 ms, strip at 602 px |
| hero-webp.wheel.390 chromium | wheel | – | 209.1 | 27.9 / 2 (15.0) | 0 (0) | 8 / 8 | 0 (max 10.2) | 268.6 (0→1) | 1 (1 smooth); first at 259.4 ms, strip at 248 px |
| hero-webp.wheel.390 webkit | wheel | – | 486 | 35.9 / 2 (9.0) | 7 (23) | 8 / 9.9 | 0 (max 18) | 836 (0→1) | 1 (1 smooth); first at 818 ms, strip at 253 px |
