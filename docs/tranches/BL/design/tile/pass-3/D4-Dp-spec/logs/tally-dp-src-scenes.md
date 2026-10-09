harness 9fd4983bc6b9

| witness | engine | verdict | tally | load at start / end | harness |
|---|---|---|---|---|---|
| CANON | Chromium 149.0.7827.55 | PASS | 3/3 gating cells pass [library 3/3] | 526.42 / 251.05 / 130.17 → 540.56 / 258.55 / 133.53 | 9fd4983bc6b9 |
| CANON | Playwright WebKit 26.5 | PASS | 3/3 gating cells pass [library 3/3] | 532.57 / 275.99 / 142.74 → 532.57 / 275.99 / 142.74 | 9fd4983bc6b9 |
| T-1 | Chromium 149.0.7827.55 | FAIL | 20/42 gating cells pass, 12 unmeasured [migrated 15/15 · library 5/27 · unmigrated 3/6] | 21.39 / 23.47 / 25.38 → 20.08 / 22.45 / 24.81 | 9fd4983bc6b9 |
| T-1 | Playwright WebKit 26.5 | FAIL | 23/45 gating cells pass, 12 unmeasured [migrated 18/18 · library 5/27 · unmigrated 3/6] | 20.08 / 22.45 / 24.81 → 38.19 / 28.79 / 27.08 | 9fd4983bc6b9 |
| T-2 | Chromium 149.0.7827.55 | PASS | 40/40 gating cells pass [library 40/40] | 34.44 / 29.67 / 27.55 → 34.97 / 30.34 / 27.89 | 9fd4983bc6b9 |
| T-2 | Playwright WebKit 26.5 | PASS | 40/40 gating cells pass [library 40/40] | 34.78 / 30.54 / 28.01 → 42.14 / 33.13 / 29.09 | 9fd4983bc6b9 |
| T-3 | Chromium 149.0.7827.55 | FAIL | 39/85 gating cells pass, 12 unmeasured [library 2/39 · unmigrated 12/48 · migrated 37/43] | 42.14 / 33.13 / 29.09 → 24.73 / 29.41 / 28.41 | 9fd4983bc6b9 |
| T-3 | Playwright WebKit 26.5 | FAIL | 42/85 gating cells pass, 12 unmeasured [library 2/39 · unmigrated 9/48 · migrated 40/43] | 24.73 / 29.41 / 28.41 → 20.84 / 26.45 / 27.47 | 9fd4983bc6b9 |
| T-4 | Chromium 149.0.7827.55 | FAIL | 36/54 gating cells pass [library 12/30 · unmigrated 3/24 · migrated 24/24] | 20.84 / 26.45 / 27.47 → 16.80 / 23.76 / 26.32 | 9fd4983bc6b9 |
| T-4 | Playwright WebKit 26.5 | FAIL | 36/54 gating cells pass [library 12/30 · unmigrated 3/24 · migrated 24/24] | 16.80 / 23.76 / 26.32 → 21.92 / 23.91 / 26.08 | 9fd4983bc6b9 |
| T-5 | Chromium 149.0.7827.55 | FAIL | 87/116 gating cells pass [library 49/78 · unmigrated 20/37 · migrated 38/38] | 21.92 / 23.91 / 26.08 → 26.81 / 25.12 / 26.30 | 9fd4983bc6b9 |
| T-5 | Playwright WebKit 26.5 | FAIL | 87/116 gating cells pass [library 49/78 · unmigrated 20/37 · migrated 38/38] | 26.81 / 25.12 / 26.30 → 31.61 / 27.68 / 27.20 | 9fd4983bc6b9 |
| T-6 | Chromium 149.0.7827.55 | FAIL | 64/88 gating cells pass [library 31/55 · unmigrated 34/48 · migrated 33/33] | 31.61 / 27.68 / 27.20 → 46.83 / 39.43 / 32.66 | 9fd4983bc6b9 |
| T-6 | Playwright WebKit 26.5 | FAIL | 64/88 gating cells pass [library 31/55 · unmigrated 34/48 · migrated 33/33] | 48.45 / 39.89 / 32.86 → 69.29 / 57.23 / 43.41 | 9fd4983bc6b9 |
| T-7 | Chromium 149.0.7827.55 | PASS | 24/24 gating cells pass [unmigrated 4/32 · migrated 24/24] | 67.91 / 57.14 / 43.46 → 64.25 / 58.01 / 44.85 | 9fd4983bc6b9 |
| T-7 | Playwright WebKit 26.5 | PASS | 24/24 gating cells pass [unmigrated 4/32 · migrated 24/24] | 64.71 / 58.21 / 45.00 → 70.51 / 61.51 / 47.36 | 9fd4983bc6b9 |
| T-8 | Chromium 149.0.7827.55 + Playwright WebKit 26.5 | FAIL | 27/39 gating cells pass, 13 unmeasured [migrated 27/27 · library 0/12] | 77.28 / 63.06 / 47.99 → 90.48 / 70.98 / 52.62 | 9fd4983bc6b9 |
| W-A | Chromium 149.0.7827.55 | FAIL | 5/9 gating cells pass [library 5/9] | 91.96 / 71.96 / 53.18 → 88.49 / 71.86 / 53.36 | 9fd4983bc6b9 |
| W-A | Playwright WebKit 26.5 | FAIL | 5/9 gating cells pass [library 5/9] | 91.57 / 72.78 / 53.80 → 91.29 / 73.03 / 54.00 | 9fd4983bc6b9 |
| W-B | Chromium 149.0.7827.55 | FAIL | 9/25 gating cells pass [library 9/25] | 89.34 / 72.93 / 54.07 → 98.44 / 77.06 / 56.44 | 9fd4983bc6b9 |
| W-B | Playwright WebKit 26.5 | FAIL | 9/25 gating cells pass [library 9/25] | 115.15 / 81.88 / 58.52 → 199.45 / 106.26 / 68.32 | 9fd4983bc6b9 |
| W-C | Chromium 149.0.7827.55 | FAIL | 0/8 gating cells pass [library 0/8] | 208.14 / 109.61 / 69.72 → 235.86 / 120.58 / 74.33 | 9fd4983bc6b9 |
| W-C | Playwright WebKit 26.5 | FAIL | 0/8 gating cells pass [library 0/8] | 235.87 / 124.30 / 76.19 → 229.22 / 126.55 / 77.55 | 9fd4983bc6b9 |
| W-D | Chromium 149.0.7827.55 | PASS | 8/8 gating cells pass [library 8/8] | 300.08 / 144.93 / 84.63 → 378.12 / 166.81 / 93.11 | 9fd4983bc6b9 |
| W-D | Playwright WebKit 26.5 | PASS | 8/8 gating cells pass [library 8/8] | 429.63 / 188.49 / 102.12 → 451.36 / 197.00 / 105.63 | 9fd4983bc6b9 |
| W-E | Chromium 149.0.7827.55 | FAIL | 1/3 gating cells pass [library 1/3] | 468.39 / 204.75 / 108.90 → 473.42 / 214.66 / 113.55 | 9fd4983bc6b9 |
| W-E | Playwright WebKit 26.5 | FAIL | 1/3 gating cells pass [library 1/3] | 455.31 / 219.39 / 116.42 → 492.85 / 235.20 / 123.23 | 9fd4983bc6b9 |

| witness | engine | scene | arm | gating pass / measured | unmeasured |
|---|---|---|---|---|---|
| CANON | chromium | canon | library | 3/3 |  |
| CANON | webkit | canon | library | 3/3 |  |
| T-1 | chromium | preset | library | 0/0 | 3 |
| T-1 | chromium | preset-verbatim | unmigrated | 0/0 | 3 |
| T-1 | chromium | preset-migrated | migrated | 3/3 |  |
| T-1 | chromium | specimen | library | 0/0 | 3 |
| T-1 | chromium | specimen-verbatim | unmigrated | 0/0 | 3 |
| T-1 | chromium | specimen-migrated | migrated | 3/3 |  |
| T-1 | chromium | f1 | library | 0/3 |  |
| T-1 | chromium | f1-verbatim | unmigrated | 0/3 |  |
| T-1 | chromium | f1-migrated | migrated | 3/3 |  |
| T-1 | chromium | v2 | library | 0/3 |  |
| T-1 | chromium | v2-verbatim | unmigrated | 3/3 |  |
| T-1 | chromium | v2-migrated | migrated | 3/3 |  |
| T-1 | chromium | preset-contents | library | 0/0 | 3 |
| T-1 | chromium | preset-contents-migrated | migrated | 3/3 |  |
| T-1 | chromium | card | library | 3/3 |  |
| T-1 | chromium | chipcell | library | 0/12 |  |
| T-1 | chromium | wrap | library | 2/6 | 3 |
| T-1 | chromium | strip-verbatim | unmigrated | 0/0 | 3 |
| T-1 | webkit | preset | library | 0/0 | 3 |
| T-1 | webkit | preset-verbatim | unmigrated | 0/0 | 3 |
| T-1 | webkit | preset-migrated | migrated | 3/3 |  |
| T-1 | webkit | specimen | library | 0/0 | 3 |
| T-1 | webkit | specimen-verbatim | unmigrated | 0/0 | 3 |
| T-1 | webkit | specimen-migrated | migrated | 6/6 |  |
| T-1 | webkit | f1 | library | 0/3 |  |
| T-1 | webkit | f1-verbatim | unmigrated | 0/3 |  |
| T-1 | webkit | f1-migrated | migrated | 3/3 |  |
| T-1 | webkit | v2 | library | 0/3 |  |
| T-1 | webkit | v2-verbatim | unmigrated | 3/3 |  |
| T-1 | webkit | v2-migrated | migrated | 3/3 |  |
| T-1 | webkit | preset-contents | library | 0/0 | 3 |
| T-1 | webkit | preset-contents-migrated | migrated | 3/3 |  |
| T-1 | webkit | card | library | 3/3 |  |
| T-1 | webkit | chipcell | library | 0/12 |  |
| T-1 | webkit | wrap | library | 2/6 | 3 |
| T-1 | webkit | strip-verbatim | unmigrated | 0/0 | 3 |
| T-2 | chromium | single | library | 7/7 |  |
| T-2 | chromium | vertical | library | 7/7 |  |
| T-2 | chromium | tabs | library | 7/7 |  |
| T-2 | chromium | pill-icon | library | 6/6 |  |
| T-2 | chromium | pill-badge | library | 6/6 |  |
| T-2 | chromium | family-d-undeclared | library | 7/7 |  |
| T-2 | webkit | single | library | 7/7 |  |
| T-2 | webkit | vertical | library | 7/7 |  |
| T-2 | webkit | tabs | library | 7/7 |  |
| T-2 | webkit | pill-icon | library | 6/6 |  |
| T-2 | webkit | pill-badge | library | 6/6 |  |
| T-2 | webkit | family-d-undeclared | library | 7/7 |  |
| T-3 | chromium | preset | library | 0/3 | 1 |
| T-3 | chromium | preset-verbatim | unmigrated | 1/4 |  |
| T-3 | chromium | preset-migrated | migrated | 4/4 |  |
| T-3 | chromium | specimen | library | 0/3 | 1 |
| T-3 | chromium | specimen-verbatim | unmigrated | 4/4 |  |
| T-3 | chromium | specimen-migrated | migrated | 3/4 |  |
| T-3 | chromium | strip | library | 1/3 | 1 |
| T-3 | chromium | strip-verbatim | unmigrated | 2/4 |  |
| T-3 | chromium | strip-migrated | migrated | 3/4 |  |
| T-3 | chromium | f1 | library | 0/3 | 1 |
| T-3 | chromium | f1-verbatim | unmigrated | 2/4 |  |
| T-3 | chromium | f1-migrated | migrated | 3/4 |  |
| T-3 | chromium | v2 | library | 0/3 | 1 |
| T-3 | chromium | v2-verbatim | unmigrated | 1/4 |  |
| T-3 | chromium | v2-migrated | migrated | 4/4 |  |
| T-3 | chromium | c1 | library | 0/3 |  |
| T-3 | chromium | c1-verbatim | unmigrated | 1/4 |  |
| T-3 | chromium | c1-migrated | migrated | 0/3 |  |
| T-3 | chromium | preset-invalid | library | 0/3 | 1 |
| T-3 | chromium | preset-invalid-migrated | migrated | 4/4 |  |
| T-3 | chromium | preset-sibling | library | 0/3 | 1 |
| T-3 | chromium | preset-sibling-migrated | migrated | 4/4 |  |
| T-3 | chromium | preset-tone-translucent | library | 0/3 | 1 |
| T-3 | chromium | preset-tone-translucent-migrated | migrated | 4/4 |  |
| T-3 | chromium | preset-tone-unresolvable | library | 0/3 | 1 |
| T-3 | chromium | preset-tone-unresolvable-migrated | migrated | 4/4 |  |
| T-3 | chromium | preset-contents | library | 0/3 | 1 |
| T-3 | chromium | preset-contents-migrated | migrated | 4/4 |  |
| T-3 | chromium | card | library | 0/3 | 1 |
| T-3 | chromium | chipcell | library | 1/3 | 1 |
| T-3 | webkit | preset | library | 0/3 | 1 |
| T-3 | webkit | preset-verbatim | unmigrated | 0/4 |  |
| T-3 | webkit | preset-migrated | migrated | 4/4 |  |
| T-3 | webkit | specimen | library | 0/3 | 1 |
| T-3 | webkit | specimen-verbatim | unmigrated | 4/4 |  |
| T-3 | webkit | specimen-migrated | migrated | 4/4 |  |
| T-3 | webkit | strip | library | 1/3 | 1 |
| T-3 | webkit | strip-verbatim | unmigrated | 1/4 |  |
| T-3 | webkit | strip-migrated | migrated | 4/4 |  |
| T-3 | webkit | f1 | library | 0/3 | 1 |
| T-3 | webkit | f1-verbatim | unmigrated | 3/4 |  |
| T-3 | webkit | f1-migrated | migrated | 4/4 |  |
| T-3 | webkit | v2 | library | 0/3 | 1 |
| T-3 | webkit | v2-verbatim | unmigrated | 0/4 |  |
| T-3 | webkit | v2-migrated | migrated | 4/4 |  |
| T-3 | webkit | c1 | library | 0/3 |  |
| T-3 | webkit | c1-verbatim | unmigrated | 0/4 |  |
| T-3 | webkit | c1-migrated | migrated | 0/3 |  |
| T-3 | webkit | preset-invalid | library | 0/3 | 1 |
| T-3 | webkit | preset-invalid-migrated | migrated | 4/4 |  |
| T-3 | webkit | preset-sibling | library | 0/3 | 1 |
| T-3 | webkit | preset-sibling-migrated | migrated | 4/4 |  |
| T-3 | webkit | preset-tone-translucent | library | 0/3 | 1 |
| T-3 | webkit | preset-tone-translucent-migrated | migrated | 4/4 |  |
| T-3 | webkit | preset-tone-unresolvable | library | 0/3 | 1 |
| T-3 | webkit | preset-tone-unresolvable-migrated | migrated | 4/4 |  |
| T-3 | webkit | preset-contents | library | 0/3 | 1 |
| T-3 | webkit | preset-contents-migrated | migrated | 4/4 |  |
| T-3 | webkit | card | library | 0/3 | 1 |
| T-3 | webkit | chipcell | library | 1/3 | 1 |
| T-4 | chromium | preset | library | 6/6 |  |
| T-4 | chromium | preset-verbatim | unmigrated | 0/6 |  |
| T-4 | chromium | preset-migrated | migrated | 6/6 |  |
| T-4 | chromium | specimen | library | 0/6 |  |
| T-4 | chromium | specimen-verbatim | unmigrated | 0/6 |  |
| T-4 | chromium | specimen-migrated | migrated | 6/6 |  |
| T-4 | chromium | f1 | library | 0/6 |  |
| T-4 | chromium | f1-verbatim | unmigrated | 0/6 |  |
| T-4 | chromium | f1-migrated | migrated | 6/6 |  |
| T-4 | chromium | c1 | library | 6/6 |  |
| T-4 | chromium | c1-verbatim | unmigrated | 3/6 |  |
| T-4 | chromium | c1-migrated | migrated | 6/6 |  |
| T-4 | chromium | card | library | 0/6 |  |
| T-4 | webkit | preset | library | 6/6 |  |
| T-4 | webkit | preset-verbatim | unmigrated | 0/6 |  |
| T-4 | webkit | preset-migrated | migrated | 6/6 |  |
| T-4 | webkit | specimen | library | 0/6 |  |
| T-4 | webkit | specimen-verbatim | unmigrated | 0/6 |  |
| T-4 | webkit | specimen-migrated | migrated | 6/6 |  |
| T-4 | webkit | f1 | library | 0/6 |  |
| T-4 | webkit | f1-verbatim | unmigrated | 0/6 |  |
| T-4 | webkit | f1-migrated | migrated | 6/6 |  |
| T-4 | webkit | c1 | library | 6/6 |  |
| T-4 | webkit | c1-verbatim | unmigrated | 3/6 |  |
| T-4 | webkit | c1-migrated | migrated | 6/6 |  |
| T-4 | webkit | card | library | 0/6 |  |
| T-5 | chromium | preset | library | 9/9 |  |
| T-5 | chromium | preset-verbatim | unmigrated | 8/8 |  |
| T-5 | chromium | preset-migrated | migrated | 6/6 |  |
| T-5 | chromium | specimen | library | 6/6 |  |
| T-5 | chromium | specimen-verbatim | unmigrated | 8/8 |  |
| T-5 | chromium | specimen-migrated | migrated | 6/6 |  |
| T-5 | chromium | strip | library | 0/6 |  |
| T-5 | chromium | strip-verbatim | unmigrated | 0/6 |  |
| T-5 | chromium | strip-migrated | migrated | 6/6 |  |
| T-5 | chromium | f1 | library | 0/6 |  |
| T-5 | chromium | f1-verbatim | unmigrated | 0/6 |  |
| T-5 | chromium | f1-migrated | migrated | 6/6 |  |
| T-5 | chromium | v2 | library | 2/2 |  |
| T-5 | chromium | v2-verbatim | unmigrated | 3/3 |  |
| T-5 | chromium | v2-migrated | migrated | 2/2 |  |
| T-5 | chromium | c1 | library | 1/6 |  |
| T-5 | chromium | c1-verbatim | unmigrated | 1/6 |  |
| T-5 | chromium | c1-migrated | migrated | 6/6 |  |
| T-5 | chromium | preset-contents | library | 6/6 |  |
| T-5 | chromium | preset-contents-migrated | migrated | 6/6 |  |
| T-5 | chromium | preset-input | library | 1/1 |  |
| T-5 | chromium | preset-consumer-aria | library | 6/6 |  |
| T-5 | chromium | single | library | 6/6 |  |
| T-5 | chromium | vertical | library | 6/6 |  |
| T-5 | chromium | tabs | library | 6/6 |  |
| T-5 | chromium | card | library | 0/6 |  |
| T-5 | chromium | chipcell | library | 0/6 |  |
| T-5 | webkit | preset | library | 9/9 |  |
| T-5 | webkit | preset-verbatim | unmigrated | 8/8 |  |
| T-5 | webkit | preset-migrated | migrated | 6/6 |  |
| T-5 | webkit | specimen | library | 6/6 |  |
| T-5 | webkit | specimen-verbatim | unmigrated | 8/8 |  |
| T-5 | webkit | specimen-migrated | migrated | 6/6 |  |
| T-5 | webkit | strip | library | 0/6 |  |
| T-5 | webkit | strip-verbatim | unmigrated | 0/6 |  |
| T-5 | webkit | strip-migrated | migrated | 6/6 |  |
| T-5 | webkit | f1 | library | 0/6 |  |
| T-5 | webkit | f1-verbatim | unmigrated | 0/6 |  |
| T-5 | webkit | f1-migrated | migrated | 6/6 |  |
| T-5 | webkit | v2 | library | 2/2 |  |
| T-5 | webkit | v2-verbatim | unmigrated | 3/3 |  |
| T-5 | webkit | v2-migrated | migrated | 2/2 |  |
| T-5 | webkit | c1 | library | 1/6 |  |
| T-5 | webkit | c1-verbatim | unmigrated | 1/6 |  |
| T-5 | webkit | c1-migrated | migrated | 6/6 |  |
| T-5 | webkit | preset-contents | library | 6/6 |  |
| T-5 | webkit | preset-contents-migrated | migrated | 6/6 |  |
| T-5 | webkit | preset-input | library | 1/1 |  |
| T-5 | webkit | preset-consumer-aria | library | 6/6 |  |
| T-5 | webkit | single | library | 6/6 |  |
| T-5 | webkit | vertical | library | 6/6 |  |
| T-5 | webkit | tabs | library | 6/6 |  |
| T-5 | webkit | card | library | 0/6 |  |
| T-5 | webkit | chipcell | library | 0/6 |  |
| T-6 | chromium | preset | library | 11/11 |  |
| T-6 | chromium | preset-verbatim | unmigrated | 12/12 |  |
| T-6 | chromium | preset-migrated | migrated | 11/11 |  |
| T-6 | chromium | specimen | library | 11/11 |  |
| T-6 | chromium | specimen-verbatim | unmigrated | 12/12 |  |
| T-6 | chromium | specimen-migrated | migrated | 11/11 |  |
| T-6 | chromium | f1 | library | 3/11 |  |
| T-6 | chromium | f1-verbatim | unmigrated | 5/12 |  |
| T-6 | chromium | f1-migrated | migrated | 11/11 |  |
| T-6 | chromium | card | library | 2/11 |  |
| T-6 | chromium | chipcell | library | 4/11 |  |
| T-6 | chromium | strip-verbatim | unmigrated | 5/12 |  |
| T-6 | webkit | preset | library | 11/11 |  |
| T-6 | webkit | preset-verbatim | unmigrated | 12/12 |  |
| T-6 | webkit | preset-migrated | migrated | 11/11 |  |
| T-6 | webkit | specimen | library | 11/11 |  |
| T-6 | webkit | specimen-verbatim | unmigrated | 12/12 |  |
| T-6 | webkit | specimen-migrated | migrated | 11/11 |  |
| T-6 | webkit | f1 | library | 3/11 |  |
| T-6 | webkit | f1-verbatim | unmigrated | 5/12 |  |
| T-6 | webkit | f1-migrated | migrated | 11/11 |  |
| T-6 | webkit | card | library | 2/11 |  |
| T-6 | webkit | chipcell | library | 4/11 |  |
| T-6 | webkit | strip-verbatim | unmigrated | 5/12 |  |
| T-7 | chromium | preset | unmigrated | 0/6 |  |
| T-7 | chromium | preset | migrated | 4/4 |  |
| T-7 | chromium | specimen | unmigrated | 0/7 |  |
| T-7 | chromium | specimen | migrated | 4/4 |  |
| T-7 | chromium | strip | unmigrated | 4/6 |  |
| T-7 | chromium | strip | migrated | 4/4 |  |
| T-7 | chromium | f1 | unmigrated | 0/5 |  |
| T-7 | chromium | f1 | migrated | 4/4 |  |
| T-7 | chromium | v2 | unmigrated | 0/4 |  |
| T-7 | chromium | v2 | migrated | 4/4 |  |
| T-7 | chromium | c1 | unmigrated | 0/4 |  |
| T-7 | chromium | c1 | migrated | 4/4 |  |
| T-7 | webkit | preset | unmigrated | 0/6 |  |
| T-7 | webkit | preset | migrated | 4/4 |  |
| T-7 | webkit | specimen | unmigrated | 0/7 |  |
| T-7 | webkit | specimen | migrated | 4/4 |  |
| T-7 | webkit | strip | unmigrated | 4/6 |  |
| T-7 | webkit | strip | migrated | 4/4 |  |
| T-7 | webkit | f1 | unmigrated | 0/5 |  |
| T-7 | webkit | f1 | migrated | 4/4 |  |
| T-7 | webkit | v2 | unmigrated | 0/4 |  |
| T-7 | webkit | v2 | migrated | 4/4 |  |
| T-7 | webkit | c1 | unmigrated | 0/4 |  |
| T-7 | webkit | c1 | migrated | 4/4 |  |
| T-8 | both | preset | library | 0/6 | 6 |
| T-8 | both | preset-migrated | migrated | 12/12 |  |
| T-8 | both | specimen | library | 0/6 | 6 |
| T-8 | both | specimen-migrated | migrated | 15/15 |  |
| T-8 | both | (run) | library | 0/0 | 1 |
| W-A | chromium | wrap | library | 5/9 |  |
| W-A | webkit | wrap | library | 5/9 |  |
| W-B | chromium | (run) | library | 8/13 |  |
| W-B | chromium | preset | library | 0/4 |  |
| W-B | chromium | specimen | library | 0/4 |  |
| W-B | chromium | strip | library | 1/4 |  |
| W-B | webkit | (run) | library | 8/13 |  |
| W-B | webkit | preset | library | 0/4 |  |
| W-B | webkit | specimen | library | 0/4 |  |
| W-B | webkit | strip | library | 1/4 |  |
| W-C | chromium | (run) | library | 0/5 |  |
| W-C | chromium | card | library | 0/3 |  |
| W-C | webkit | (run) | library | 0/5 |  |
| W-C | webkit | card | library | 0/3 |  |
| W-D | chromium | family-d | library | 4/4 |  |
| W-D | chromium | family-d-undeclared | library | 4/4 |  |
| W-D | webkit | family-d | library | 4/4 |  |
| W-D | webkit | family-d-undeclared | library | 4/4 |  |
| W-E | chromium | preset | library | 1/1 |  |
| W-E | chromium | specimen | library | 0/1 |  |
| W-E | chromium | strip | library | 0/1 |  |
| W-E | webkit | preset | library | 1/1 |  |
| W-E | webkit | specimen | library | 0/1 |  |
| W-E | webkit | strip | library | 0/1 |  |
