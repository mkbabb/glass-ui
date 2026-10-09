harness 9fd4983bc6b9

| witness | engine | verdict | tally | load at start / end | harness |
|---|---|---|---|---|---|
| CANON | Chromium 149.0.7827.55 | PASS | 3/3 gating cells pass [library 3/3] | 154.65 / 217.78 / 274.11 → 156.36 / 217.08 / 273.53 | 9fd4983bc6b9 |
| CANON | Playwright WebKit 26.5 | PASS | 3/3 gating cells pass [library 3/3] | 154.01 / 215.59 / 272.67 → 153.45 / 214.45 / 271.94 | 9fd4983bc6b9 |
| T-1 | Chromium 149.0.7827.55 | FAIL | 20/42 gating cells pass, 12 unmeasured [migrated 15/15 · library 5/27 · unmigrated 3/6] | 194.17 / 211.44 / 321.19 → 188.88 / 207.97 / 307.34 | 9fd4983bc6b9 |
| T-1 | Playwright WebKit 26.5 | FAIL | 23/45 gating cells pass, 12 unmeasured [migrated 18/18 · library 5/27 · unmigrated 3/6] | 181.06 / 204.88 / 303.92 → 213.96 / 206.45 / 293.86 | 9fd4983bc6b9 |
| T-2 | Chromium 149.0.7827.55 | PASS | 40/40 gating cells pass [library 40/40] | 210.20 / 205.79 / 293.12 → 241.78 / 215.07 / 291.57 | 9fd4983bc6b9 |
| T-2 | Playwright WebKit 26.5 | PASS | 40/40 gating cells pass [library 40/40] | 251.05 / 218.95 / 291.18 → 278.44 / 231.61 / 291.76 | 9fd4983bc6b9 |
| T-3 | Chromium 149.0.7827.55 | FAIL | 42/85 gating cells pass, 12 unmeasured [library 2/39 · unmigrated 12/48 · migrated 40/43] | 275.12 / 231.70 / 291.44 → 375.46 / 391.44 / 353.14 | 9fd4983bc6b9 |
| T-3 | Playwright WebKit 26.5 | FAIL | 42/85 gating cells pass, 12 unmeasured [library 2/39 · unmigrated 9/48 · migrated 40/43] | 355.63 / 385.83 / 352.01 → 322.10 / 343.19 / 341.07 | 9fd4983bc6b9 |
| T-4 | Chromium 149.0.7827.55 | FAIL | 36/54 gating cells pass [library 12/30 · unmigrated 3/24 · migrated 24/24] | 321.70 / 342.76 / 340.93 → 476.72 / 413.26 / 371.91 | 9fd4983bc6b9 |
| T-4 | Playwright WebKit 26.5 | FAIL | 36/54 gating cells pass [library 12/30 · unmigrated 3/24 · migrated 24/24] | 500.27 / 438.18 / 389.09 → 477.05 / 450.80 / 400.94 | 9fd4983bc6b9 |
| T-5 | Chromium 149.0.7827.55 | FAIL | 87/116 gating cells pass [library 49/78 · unmigrated 20/37 · migrated 38/38] | 477.61 / 451.35 / 401.43 → 292.99 / 393.93 / 386.20 | 9fd4983bc6b9 |
| T-5 | Playwright WebKit 26.5 | FAIL | 87/116 gating cells pass [library 49/78 · unmigrated 20/37 · migrated 38/38] | 268.79 / 380.07 / 381.42 → 262.72 / 345.54 / 367.71 | 9fd4983bc6b9 |
| T-6 | Chromium 149.0.7827.55 | FAIL | 64/88 gating cells pass [library 31/55 · unmigrated 34/48 · migrated 33/33] | 261.70 / 343.95 / 367.02 → 272.89 / 300.89 / 337.48 | 9fd4983bc6b9 |
| T-6 | Playwright WebKit 26.5 | FAIL | 64/88 gating cells pass [library 31/55 · unmigrated 34/48 · migrated 33/33] | 278.73 / 300.79 / 336.80 → 342.72 / 303.56 / 323.22 | 9fd4983bc6b9 |
| T-7 | Chromium 149.0.7827.55 | PASS | 24/24 gating cells pass [unmigrated 4/32 · migrated 24/24] | 342.72 / 303.56 / 323.22 → 304.89 / 301.39 / 320.80 | 9fd4983bc6b9 |
| T-7 | Playwright WebKit 26.5 | PASS | 24/24 gating cells pass [unmigrated 4/32 · migrated 24/24] | 281.36 / 296.46 / 318.59 → 262.53 / 287.08 / 313.27 | 9fd4983bc6b9 |
| T-8 | Chromium 149.0.7827.55 + Playwright WebKit 26.5 | FAIL | 27/39 gating cells pass, 13 unmeasured [migrated 27/27 · library 0/12] | 264.82 / 286.77 / 312.85 → 250.13 / 275.47 / 305.84 | 9fd4983bc6b9 |
| W-A | Chromium 149.0.7827.55 | FAIL | 5/9 gating cells pass [library 5/9] | 250.51 / 274.30 / 304.89 → 254.71 / 274.77 / 304.88 | 9fd4983bc6b9 |
| W-A | Playwright WebKit 26.5 | FAIL | 5/9 gating cells pass [library 5/9] | 246.79 / 271.26 / 302.74 → 243.53 / 270.18 / 302.17 | 9fd4983bc6b9 |
| W-B | Chromium 149.0.7827.55 | FAIL | 9/25 gating cells pass [library 9/25] | 238.60 / 268.72 / 301.47 → 200.82 / 255.19 / 295.00 | 9fd4983bc6b9 |
| W-B | Playwright WebKit 26.5 | FAIL | 9/25 gating cells pass [library 9/25] | 188.02 / 250.70 / 292.95 → 174.44 / 240.29 / 287.44 | 9fd4983bc6b9 |
| W-C | Chromium 149.0.7827.55 | FAIL | 0/8 gating cells pass [library 0/8] | 174.40 / 239.19 / 286.78 → 179.95 / 238.21 / 285.87 | 9fd4983bc6b9 |
| W-C | Playwright WebKit 26.5 | FAIL | 0/8 gating cells pass [library 0/8] | 174.28 / 235.06 / 284.20 → 171.05 / 233.38 / 283.32 | 9fd4983bc6b9 |
| W-D | Chromium 149.0.7827.55 | PASS | 8/8 gating cells pass [library 8/8] | 174.81 / 233.13 / 282.93 → 172.82 / 231.75 / 282.15 | 9fd4983bc6b9 |
| W-D | Playwright WebKit 26.5 | PASS | 8/8 gating cells pass [library 8/8] | 168.99 / 229.97 / 281.23 → 167.15 / 228.58 / 280.44 | 9fd4983bc6b9 |
| W-E | Chromium 149.0.7827.55 | FAIL | 1/3 gating cells pass [library 1/3] | 165.14 / 227.14 / 279.63 → 160.75 / 224.14 / 277.95 | 9fd4983bc6b9 |
| W-E | Playwright WebKit 26.5 | FAIL | 1/3 gating cells pass [library 1/3] | 159.44 / 220.81 / 275.82 → 158.28 / 219.55 / 275.06 | 9fd4983bc6b9 |
