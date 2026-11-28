versions: chromium-base 149.0.7827.55, chromium-cure 149.0.7827.55, webkit-base 26.5, webkit-cure 26.5

### Verdicts

| cell | Chromium base | Chromium cure | WebKit base | WebKit cure |
| --- | --- | --- | --- | --- |
| sticky-1440 | RED | GREEN | RED | GREEN |
| sticky-390 | RED | GREEN | RED | GREEN |
| fit-1440 | RED | GREEN | RED | GREEN |
| cards-table-390 | RED | GREEN | RED | GREEN |
| cards-grid-390 | RED | GREEN | RED | GREEN |
| vcards-390 | RED | GREEN | RED | GREEN |
| vcards-shrink-390 | RED | RED | RED | RED |
| dialog-1440 | RED | GREEN | RED | GREEN |
| dialog-390 | RED | GREEN | RED | GREEN |
| dialog-heavy-1440 | RED | GREEN | RED | GREEN |
| dialog-heavy-390 | RED | GREEN | RED | GREEN |
| dialog-deep-1440 | GREEN | GREEN | RED | GREEN |
| dialog-rm-1440 | GREEN | GREEN | GREEN | GREEN |

### Sticky (after 1,500 down and 800 across)

| run | cell | table px | viewport top / left | host top | page y | head top | corner top, left | row's first cell left | on top: head, column | ground α head, column (rest) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| chromium-base | sticky-1440 | 2897 | 0 / 800 | 1500 | 0 | -1500.0 | -1500.0, -800.0 | -800.0 | false, false | 0, 0 (rgba(0, 0, 0, 0)) |
| chromium-base | sticky-390 | 2897 | 0 / 800 | 1500 | 0 | -1500.0 | -1500.0, -800.0 | -800.0 | false, false | 0, 0 (rgba(0, 0, 0, 0)) |
| chromium-cure | sticky-1440 | 2897 | 1500 / 800 | 0 | 0 | 0.0 | 0.0, 0.0 | 0.0 | true, true | 1, 1 (rgba(0, 0, 0, 0)) |
| chromium-cure | sticky-390 | 2897 | 1500 / 800 | 0 | 0 | 0.0 | 0.0, 0.0 | 0.0 | true, true | 1, 1 (rgba(0, 0, 0, 0)) |
| webkit-base | sticky-1440 | 2897 | 0 / 800 | 1500 | 0 | -1500.0 | -1500.0, -800.0 | -800.0 | false, false | 0, 0 (rgba(0, 0, 0, 0)) |
| webkit-base | sticky-390 | 2897 | 0 / 800 | 1500 | 0 | -1500.0 | -1500.0, -800.0 | -800.0 | false, false | 0, 0 (rgba(0, 0, 0, 0)) |
| webkit-cure | sticky-1440 | 2897 | 1500 / 800 | 0 | 0 | 0.0 | 0.0, 0.0 | 0.0 | true, true | 1, 1 (rgba(0, 0, 0, 0)) |
| webkit-cure | sticky-390 | 2897 | 1500 / 800 | 0 | 0 | 0.0 | 0.0, 0.0 | 0.0 | true, true | 1, 1 (rgba(0, 0, 0, 0)) |

### Fit at 1440 (1,202 px region)

| run | header columns | expected | client / scroll width | folded |
| --- | --- | --- | --- | --- |
| chromium-base | 20 | 7 | 1202 / 2897 | none reported |
| chromium-cure | 7 | 7 | 1202 / 1202 | m7 m8 m9 m10 m11 m12 m13 m14 m15 m16 m17 m18 m19 |
| webkit-base | 20 | 7 | 1202 / 2897 | none reported |
| webkit-cure | 7 | 7 | 1202 / 1202 | m7 m8 m9 m10 m11 m12 m13 m14 m15 m16 m17 m18 m19 |

### Cards at 390 (344 px region)

chromium-base cards-table-390: chromium AX tree (CDP Accessibility.getFullAXTree): role none, name null, ignored true, rows 0, header [], first row []
chromium-base cards-grid-390: chromium AX tree (CDP Accessibility.getFullAXTree): role none, name null, ignored true, rows 0, header [], first row []
chromium-cure cards-table-390: chromium AX tree (CDP Accessibility.getFullAXTree): role table, name "Schools by district", ignored false, rows 7, header [columnheader columnheader columnheader columnheader columnheader], first row [rowheader "District 1", cell "East", cell "74", cell "111", cell "148"]
chromium-cure cards-grid-390: chromium AX tree (CDP Accessibility.getFullAXTree): role grid, name "Schools by district", ignored false, rows 7, header [columnheader columnheader columnheader columnheader columnheader], first row [rowheader "District 1", gridcell "East", gridcell "74", gridcell "111", gridcell "148"]
webkit-base cards-table-390: Playwright ARIA snapshot (WebKit's own tree is not reachable from Playwright): - text: District 1 / - term: Region / - definition: East / - term: Students / - definition: "74" / - term: Funded / - definition: "111" / - term: Share / - definition: "148" / - text: District 2
webkit-base cards-grid-390: Playwright ARIA snapshot (WebKit's own tree is not reachable from Playwright): - text: District 1 / - term: Region / - definition: East / - term: Students / - definition: "74" / - term: Funded / - definition: "111" / - term: Share / - definition: "148" / - text: District 2
webkit-cure cards-table-390: Playwright ARIA snapshot (WebKit's own tree is not reachable from Playwright): - table "Schools by district": /   - caption: Schools by district /   - rowgroup: /     - row "District Region Students Funded Share": /       - columnheader "District" /       - columnheader "Region" /       - columnheader "Students" /       - columnheader "Funded" /       - columnheader "Share" /   - rowgroup:
webkit-cure cards-grid-390: Playwright ARIA snapshot (WebKit's own tree is not reachable from Playwright): - grid "Schools by district": /   - caption: Schools by district /   - rowgroup: /     - row "District Region Students Funded Share": /       - columnheader "District" /       - columnheader "Region" /       - columnheader "Students" /       - columnheader "Funded" /       - columnheader "Share" /   - rowgroup:

### Virtualized cards at 390 (344 x 600 host, 300 rows, atlas's useVirtualWindow)

| run | cell | viewport is the cards | list flex | list block / total | scroll height | scrollTop after a 4,000 wheel | host scrollTop | mounted (rows) | gap min / max | overlaps |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| chromium-base | vcards-390 | false | — | — / 15000.0 | 600 | 0.0 | 0 | 0 (null–null) | — / — | 0, 0 |
| chromium-base | vcards-shrink-390 | false | — | — / 15000.0 | 600 | 0.0 | 0 | 0 (null–null) | — / — | 0, 0 |
| chromium-cure | vcards-390 | true | 0 0 auto | 32850.0 / 32850.0 | 32850 | 4000.0 | 0 | 5 (8–12) | 8.0 / 8.0 | 0, 0 |
| chromium-cure | vcards-shrink-390 | true | 0 1 auto | 600.0 / 32850.0 | 3912 | 1632.0 | 0 | 6 (3–8) | 8.0 / 8.0 | 0, 0 |
| webkit-base | vcards-390 | false | — | — / 15000.0 | 600 | 0.0 | 0 | 0 (null–null) | — / — | 0, 0 |
| webkit-base | vcards-shrink-390 | false | — | — / 15000.0 | 600 | 0.0 | 0 | 0 (null–null) | — / — | 0, 0 |
| webkit-cure | vcards-390 | true | 0 0 auto | 32850.0 / 32850.0 | 32850 | 4000.0 | 0 | 5 (8–12) | 8.0 / 8.0 | 0, 0 |
| webkit-cure | vcards-shrink-390 | true | 0 1 auto | 600.0 / 32850.0 | 3912 | 1632.0 | 0 | 6 (3–8) | 8.0 / 8.0 | 0, 0 |

### Dialog

Bounds (one 60 Hz frame of each clock, share of the travel): {"panel":0.11850675437018166,"present":0.17120451403157322,"panelExit":0.07615388831339359,"presentExit":0.105722028736988,"panelReduced":0.09516661252312542,"presentReduced":0.105722028736988}

| run | cell | row | mount: centre of travel, opacity | first painted | last painted: centre, opacity | open rebound w, h px | close monotone | worst step open (over, ms, centre px, width px, opacity) | worst step close | frames over 34 ms open, close | longest frame open, close | entrance: frames, ms | frames open, close |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| chromium-base | dialog-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.024 | 0.0, 0.0 | true | 1.982, 8.4, 0, 8.79, 0.3432 | 0.979, 25.8, 0, 2.7, 0.1055 | 7, 6 | 91.7, 83.3 | 17, 376 | 64, 14 |
| chromium-base | dialog-390 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.058 | 0.0, 0.0 | true | 1.954, 8.2, 0, 5.92, 0.3384 | 0.972, 8.3, 0, 1.83, 0.1047 | 0, 0 | 33.7, 17.2 | 27, 300 | 108, 18 |
| chromium-base | dialog-heavy-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.023 | 0.0, 0.0 | true | 1.495, 7.7, 0, 16.16, 0.259 | 0.979, 16.4, 0, 6.58, 0.1055 | 8, 7 | 167.3, 158.9 | 9, 425 | 49, 14 |
| chromium-base | dialog-heavy-390 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.024 | 0.0, 0.0 | true | 1.424, 8.7, 0, 3.63, 0.2466 | 0.981, 7.4, 0, 1.55, 0.1057 | 2, 1 | 116.5, 116.7 | 15, 383 | 98, 16 |
| chromium-base | dialog-deep-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.023 | 0.0, 0.0 | true | 0.507, 8.3, 0, 2.25, 0.0878 | 0.978, 58.4, 0, 2.7, 0.1054 | 6, 7 | 75, 75 | 21, 375 | 79, 14 |
| chromium-base | dialog-rm-1440 | present | 1.000, 0.000 | 1.000, 0.000 | 1.000, 0.054 | 0.0, 0.0 | true | 0.953, 33.1, 0, 0, 0.1026 | 0.981, 50, 0, 0, 0.1057 | 3, 4 | 49.7, 50 | 18, 334 | 98, 13 |
| chromium-cure | dialog-1440 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.003, 0.003 | 14.7, 3.8 | true | 0.900, 9.1, 75.59, 37.75, 0.1072 | 0.991, 15.7, 53.68, 26.81, 0.0762 | 21, 7 | 92.4, 74.9 | 47, 1583 | 60, 18 |
| chromium-cure | dialog-390 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.004, 0.004 | 7.9, 3.8 | true | 0.633, 8.4, 22.53, 14.45, 0.076 | 0.969, 8.4, 22.35, 14.33, 0.0754 | 0, 0 | 24.7, 17.5 | 44, 475 | 103, 28 |
| chromium-cure | dialog-heavy-1440 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.048, 0.048 | 45.8, 33.2 | true | 0.972, 8.3, 81.47, 125.75, 0.1156 | 0.994, 16.7, 53.68, 82.86, 0.0762 | 40, 8 | 183.8, 162.5 | 49, 3321 | 74, 17 |
| chromium-cure | dialog-heavy-390 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.002, 0.002 | 5.6, 30.8 | true | 0.809, 8.2, 28.82, 13.03, 0.0973 | 0.920, 9.2, 21.23, 9.6, 0.0716 | 2, 1 | 125.6, 125.5 | 39, 717 | 77, 28 |
| chromium-cure | dialog-deep-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.018 | 0.0, 0.0 | true | 0.556, 8.3, 0, 2.46, 0.0963 | 0.981, 66.7, 0, 2.71, 0.1057 | 11, 4 | 75.4, 66.7 | 27, 591 | 39, 14 |
| chromium-cure | dialog-rm-1440 | present | 1.000, 0.000 | 1.000, 0.000 | 1.000, 0.059 | 0.0, 0.0 | true | 0.851, 41.7, 0, 0, 0.0917 | 0.882, 40.8, 0, 0, 0.095 | 4, 5 | 49.4, 74.6 | 20, 325 | 99, 14 |
| webkit-base | dialog-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.008 | 0.0, 0.0 | true | 1.021, 17, 0, 4.53, 0.1769 | 0.972, 17, 0, 2.68, 0.1047 | 0, 0 | 19, 19 | 19, 310 | 62, 13 |
| webkit-base | dialog-390 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.069 | 0.0, 0.0 | true | 1.010, 17, 0, 3.06, 0.1749 | 0.972, 16, 0, 1.83, 0.1047 | 0, 0 | 19, 18 | 18, 300 | 61, 12 |
| webkit-base | dialog-heavy-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.059 | 0.0, 0.0 | true | 1.191, 3, 0, 12.87, 0.2062 | 0.974, 16, 0, 6.55, 0.1049 | 2, 1 | 126, 131 | 12, 363 | 59, 14 |
| webkit-base | dialog-heavy-390 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.036 | 0.0, 0.0 | true | 0.984, 4, 0, 2.51, 0.1705 | 0.978, 16, 0, 1.55, 0.1054 | 2, 1 | 136, 121 | 13, 362 | 59, 14 |
| webkit-base | dialog-deep-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.013 | 0.0, 0.0 | true | 1.066, 16, 0, 4.73, 0.1847 | 0.975, 17, 0, 2.69, 0.1051 | 0, 0 | 19, 21 | 18, 300 | 60, 14 |
| webkit-base | dialog-rm-1440 | present | 1.000, 0.000 | 1.000, 0.000 | 1.000, 0.015 | 0.0, 0.0 | true | 0.967, 16, 0, 0, 0.1041 | 0.981, 17, 0, 0, 0.1056 | 0, 0 | 19, 19 | 13, 213 | 62, 13 |
| webkit-cure | dialog-1440 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.023, 0.023 | 14.7, 3.8 | true | 0.972, 16, 81.69, 40.81, 0.1159 | 0.990, 16, 53.65, 26.8, 0.0761 | 0, 0 | 18, 19 | 42, 682 | 63, 17 |
| webkit-cure | dialog-390 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.027, 0.027 | 8.0, 3.9 | true | 0.979, 16, 34.88, 22.36, 0.1177 | 0.978, 16, 22.56, 14.46, 0.0761 | 0, 0 | 19, 18 | 30, 489 | 63, 17 |
| webkit-cure | dialog-heavy-1440 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.008, 0.008 | 45.8, 33.2 | true | 0.990, 105, 83.01, 128.13, 0.1178 | 0.994, 17, 53.68, 82.86, 0.0762 | 2, 1 | 127, 131 | 47, 921 | 59, 18 |
| webkit-cure | dialog-heavy-390 | panel | 0.000, 0.000 | 0.030, 0.030 | 0.031, 0.031 | 5.6, 30.8 | true | 0.986, 16, 35.13, 15.88, 0.1185 | 0.977, 18, 22.54, 10.19, 0.0761 | 2, 1 | 132, 122 | 32, 684 | 58, 18 |
| webkit-cure | dialog-deep-1440 | present | 1.000, 0.000 | 1.000, 0.083 | 1.000, 0.049 | 0.0, 0.0 | true | 0.962, 17, 0, 4.26, 0.1666 | 0.972, 10, 0, 2.68, 0.1047 | 0, 0 | 21, 26 | 20, 319 | 61, 13 |
| webkit-cure | dialog-rm-1440 | present | 1.000, 0.000 | 1.000, 0.000 | 1.000, 0.032 | 0.0, 0.0 | true | 0.881, 11, 0, 0, 0.095 | 0.883, 3, 0, 0, 0.0951 | 0, 0 | 26, 32 | 15, 239 | 65, 16 |

### The step across each long frame (heavy cells)

- chromium-base dialog-heavy-1440: long tasks at 71 ms (90 ms), 216 ms (120 ms), 1154 ms (120 ms). Open: 58 ms: 0.0, 8.4, 0.134, 0.774; 49 ms: 0.0, 2.1, 0.033, 0.191; 100 ms: 0.0, 0.5, 0.007, 0.045; 99 ms: 0.0, 0.0, 0.001, 0.006; 167 ms: 0.0, 0.0, 0.000, 0.000; 99 ms: 0.0, 0.0, 0.000, 0.000; 76 ms: 0.0, 0.0, 0.000, 0.000; 67 ms: 0.0, 0.0, 0.000, 0.000. Close: 159 ms: 0.0, 4.9, 0.079, 0.733; 100 ms: 0.0, 6.1, 0.099, 0.919; 133 ms: 0.0, 6.5, 0.103, 0.956; 67 ms: 0.0, 6.6, 0.105, 0.975; 134 ms: 0.0, 6.4, 0.103, 0.956; 125 ms: 0.0, 5.6, 0.089, 0.826; 67 ms: 0.0, 4.8, 0.076, 0.706.
- chromium-base dialog-heavy-390: long tasks at 72 ms (90 ms), 218 ms (120 ms), 1139 ms (120 ms). Open: 100 ms: 0.0, 2.1, 0.140, 0.808; 117 ms: 0.0, 0.1, 0.004, 0.033. Close: 117 ms: 0.0, 1.4, 0.095, 0.882.
- chromium-cure dialog-heavy-1440: long tasks at 68 ms (90 ms), 214 ms (120 ms), 4187 ms (120 ms). Open: 91 ms: 68.5, 105.8, 0.097, 0.817; 184 ms: 59.0, 91.1, 0.084, 0.704; 100 ms: 49.0, 75.8, 0.070, 0.586; 129 ms: 30.5, 47.1, 0.043, 0.364; 117 ms: 22.7, 35.0, 0.032, 0.270; 92 ms: 13.1, 20.1, 0.000, 0.156; 133 ms: 8.1, 12.5, 0.000, 0.097; 67 ms: 4.2, 6.4, 0.000, 0.050; 67 ms: 1.3, 2.0, 0.000, 0.016; 66 ms: 1.6, 2.4, 0.000, 0.019; 92 ms: 2.7, 4.2, 0.000, 0.032; 125 ms: 3.3, 5.0, 0.000, 0.039; 75 ms: 3.5, 5.4, 0.000, 0.042; 101 ms: 3.4, 5.3, 0.000, 0.041; 142 ms: 3.1, 4.7, 0.000, 0.037; 75 ms: 2.7, 4.2, 0.000, 0.032; 92 ms: 2.1, 3.2, 0.000, 0.025; 133 ms: 1.6, 2.6, 0.000, 0.020; 66 ms: 1.3, 2.0, 0.000, 0.016; 83 ms: 0.9, 1.3, 0.000, 0.010; 133 ms: 0.6, 0.8, 0.001, 0.008; 67 ms: 0.3, 0.6, 0.000, 0.005; 100 ms: 0.1, 0.2, 0.000, 0.002; 133 ms: 0.1, 0.0, 0.000, 0.001; 67 ms: 0.1, 0.1, 0.000, 0.002; 91 ms: 0.2, 0.2, 0.001, 0.008; 134 ms: 0.1, 0.2, 0.000, 0.002; 66 ms: 0.1, 0.2, 0.000, 0.002; 91 ms: 0.1, 0.2, 0.000, 0.002; 134 ms: 0.1, 0.2, 0.000, 0.002; 67 ms: 0.1, 0.2, 0.001, 0.008; 83 ms: 0.1, 0.1, 0.000, 0.001; 117 ms: 0.1, 0.1, 0.000, 0.001; 67 ms: 0.1, 0.1, 0.000, 0.001; 83 ms: 0.0, 0.0, 0.000, 0.000; 121 ms: 0.0, 0.1, 0.000, 0.001; 67 ms: 0.0, 0.1, 0.000, 0.001; 59 ms: 0.0, 0.0, 0.000, 0.000; 58 ms: 0.0, 0.0, 0.000, 0.000; 59 ms: 0.0, 0.0, 0.000, 0.000. Close: 163 ms: 38.1, 58.9, 0.054, 0.707; 75 ms: 45.2, 69.8, 0.064, 0.837; 133 ms: 50.9, 78.4, 0.072, 0.941; 66 ms: 52.4, 81.0, 0.075, 0.972; 100 ms: 53.7, 82.8, 0.076, 0.993; 100 ms: 52.4, 80.9, 0.075, 0.971; 83 ms: 48.3, 74.6, 0.068, 0.895; 75 ms: 40.6, 62.6, 0.058, 0.751.
- chromium-cure dialog-heavy-390: long tasks at 68 ms (90 ms), 214 ms (120 ms), 1136 ms (120 ms). Open: 83 ms: 28.8, 13.0, 0.097, 0.809; 126 ms: 12.9, 5.8, 0.044, 0.365. Close: 126 ms: 18.8, 8.5, 0.064, 0.819.
- webkit-base dialog-heavy-1440: long tasks at 94 ms (90 ms), 239 ms (120 ms), 1161 ms (120 ms). Open: 102 ms: 0.0, 12.8, 0.206, 1.189; 126 ms: 0.0, 0.4, 0.007, 0.040. Close: 131 ms: 0.0, 5.4, 0.085, 0.789.
- webkit-base dialog-heavy-390: long tasks at 93 ms (90 ms), 238 ms (120 ms), 1159 ms (120 ms). Open: 94 ms: 0.0, 2.5, 0.170, 0.981; 136 ms: 0.0, 0.1, 0.008, 0.046. Close: 121 ms: 0.0, 1.4, 0.096, 0.891.
- webkit-cure dialog-heavy-1440: long tasks at 88 ms (90 ms), 229 ms (120 ms), 1150 ms (120 ms). Open: 105 ms: 78.3, 120.9, 0.112, 0.934; 127 ms: 45.8, 70.8, 0.065, 0.547. Close: 131 ms: 40.6, 62.8, 0.058, 0.753.
- webkit-cure dialog-heavy-390: long tasks at 88 ms (90 ms), 230 ms (120 ms), 1152 ms (120 ms). Open: 95 ms: 30.8, 14.0, 0.104, 0.865; 132 ms: 17.4, 7.9, 0.059, 0.490. Close: 122 ms: 18.9, 8.6, 0.063, 0.820.
