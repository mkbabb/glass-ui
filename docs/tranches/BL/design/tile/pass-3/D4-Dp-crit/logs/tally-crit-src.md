harness 9fd4983bc6b9

| witness | engine | verdict | tally | load at start / end | harness |
|---|---|---|---|---|---|
| CANON | Chromium 149.0.7827.55 | PASS | 3/3 gating cells pass [library 3/3] | 257.45 / 184.00 / 160.50 → 253.49 / 184.40 / 160.78 | 9fd4983bc6b9 |
| CANON | Playwright WebKit 26.5 | PASS | 3/3 gating cells pass [library 3/3] | 249.53 / 190.45 / 163.81 → 250.93 / 191.72 / 164.42 | 9fd4983bc6b9 |
| T-1 | Chromium 149.0.7827.55 | FAIL | 20/42 gating cells pass, 12 unmeasured [migrated 15/15 · library 5/27 · unmigrated 3/6] | 98.71 / 133.59 / 153.84 → 102.89 / 121.85 / 145.41 | 9fd4983bc6b9 |
| T-1 | Playwright WebKit 26.5 | FAIL | 23/45 gating cells pass, 12 unmeasured [migrated 18/18 · library 5/27 · unmigrated 3/6] | 98.98 / 120.73 / 144.87 → 92.12 / 110.43 / 137.93 | 9fd4983bc6b9 |
| T-2 | Chromium 149.0.7827.55 | PASS | 40/40 gating cells pass [library 40/40] | 92.91 / 110.29 / 137.72 → 89.27 / 105.45 / 133.29 | 9fd4983bc6b9 |
| T-2 | Playwright WebKit 26.5 | PASS | 40/40 gating cells pass [library 40/40] | 89.25 / 105.18 / 133.03 → 101.90 / 105.07 / 131.04 | 9fd4983bc6b9 |
| T-3 | Chromium 149.0.7827.55 | FAIL | 42/85 gating cells pass, 12 unmeasured [library 2/39 · unmigrated 12/48 · migrated 40/43] | 106.08 / 105.88 / 131.02 → 116.64 / 110.05 / 122.78 | 9fd4983bc6b9 |
| T-3 | Playwright WebKit 26.5 | FAIL | 42/85 gating cells pass, 12 unmeasured [library 2/39 · unmigrated 9/48 · migrated 40/43] | 112.83 / 109.37 / 122.47 → 128.58 / 114.84 / 120.83 | 9fd4983bc6b9 |
| T-4 | Chromium 149.0.7827.55 | FAIL | 36/54 gating cells pass [library 12/30 · unmigrated 3/24 · migrated 24/24] | 124.69 / 114.44 / 120.62 → 150.07 / 134.22 / 128.54 | 9fd4983bc6b9 |
| T-4 | Playwright WebKit 26.5 | FAIL | 36/54 gating cells pass [library 12/30 · unmigrated 3/24 · migrated 24/24] | 147.14 / 134.67 / 128.84 → 131.53 / 139.64 / 132.67 | 9fd4983bc6b9 |
| T-5 | Chromium 149.0.7827.55 | FAIL | 87/116 gating cells pass [library 49/78 · unmigrated 20/37 · migrated 38/38] | 149.82 / 143.54 / 134.25 → 153.33 / 138.31 / 133.60 | 9fd4983bc6b9 |
| T-5 | Playwright WebKit 26.5 | FAIL | 87/116 gating cells pass [library 49/78 · unmigrated 20/37 · migrated 38/38] | 162.36 / 141.19 / 134.71 → 142.39 / 138.82 / 134.74 | 9fd4983bc6b9 |
| T-6 | Chromium 149.0.7827.55 | FAIL | 64/88 gating cells pass [library 31/55 · unmigrated 34/48 · migrated 33/33] | 141.35 / 138.69 / 134.74 → 176.88 / 165.26 / 150.98 | 9fd4983bc6b9 |
| T-6 | Playwright WebKit 26.5 | FAIL | 64/88 gating cells pass [library 31/55 · unmigrated 34/48 · migrated 33/33] | 174.61 / 165.42 / 151.30 → 186.16 / 162.61 / 153.06 | 9fd4983bc6b9 |
| T-7 | Chromium 149.0.7827.55 | PASS | 24/24 gating cells pass [unmigrated 4/32 · migrated 24/24] | 185.85 / 163.73 / 153.63 → 149.38 / 156.81 / 152.29 | 9fd4983bc6b9 |
| T-7 | Playwright WebKit 26.5 | PASS | 24/24 gating cells pass [unmigrated 4/32 · migrated 24/24] | 141.79 / 154.96 / 151.68 → 153.52 / 155.37 / 152.14 | 9fd4983bc6b9 |
| T-8 | Chromium 149.0.7827.55 + Playwright WebKit 26.5 | FAIL | 27/39 gating cells pass, 13 unmeasured [migrated 27/27 · library 0/12] | 154.77 / 155.52 / 152.23 → 129.15 / 142.22 / 147.18 | 9fd4983bc6b9 |
| W-A | Chromium 149.0.7827.55 | FAIL | 5/9 gating cells pass [library 5/9] | 121.83 / 139.53 / 146.07 → 114.00 / 137.27 / 145.19 | 9fd4983bc6b9 |
| W-A | Playwright WebKit 26.5 | FAIL | 5/9 gating cells pass [library 5/9] | 107.12 / 135.02 / 144.30 → 104.62 / 134.04 / 143.90 | 9fd4983bc6b9 |
| W-B | Chromium 149.0.7827.55 | FAIL | 9/25 gating cells pass [library 9/25] | 105.66 / 133.27 / 143.51 → 99.09 / 128.37 / 141.21 | 9fd4983bc6b9 |
| W-B | Playwright WebKit 26.5 | FAIL | 9/25 gating cells pass [library 9/25] | 96.92 / 127.43 / 140.81 → 84.90 / 121.32 / 138.06 | 9fd4983bc6b9 |
| W-C | Chromium 149.0.7827.55 | FAIL | 0/8 gating cells pass [library 0/8] | 84.90 / 121.32 / 138.06 → 83.11 / 119.11 / 136.97 | 9fd4983bc6b9 |
| W-C | Playwright WebKit 26.5 | FAIL | 0/8 gating cells pass [library 0/8] | 129.27 / 126.63 / 139.07 → 147.03 / 130.65 / 140.28 | 9fd4983bc6b9 |
| W-D | Chromium 149.0.7827.55 | PASS | 8/8 gating cells pass [library 8/8] | 166.36 / 135.68 / 141.90 → 189.21 / 142.24 / 144.14 | 9fd4983bc6b9 |
| W-D | Playwright WebKit 26.5 | PASS | 8/8 gating cells pass [library 8/8] | 235.67 / 159.10 / 150.21 → 242.42 / 161.77 / 151.20 | 9fd4983bc6b9 |
| W-E | Chromium 149.0.7827.55 | FAIL | 1/3 gating cells pass [library 1/3] | 242.08 / 164.33 / 152.23 → 232.77 / 168.74 / 154.19 | 9fd4983bc6b9 |
| W-E | Playwright WebKit 26.5 | FAIL | 1/3 gating cells pass [library 1/3] | 269.01 / 182.06 / 159.39 → 275.26 / 184.80 / 160.49 | 9fd4983bc6b9 |
