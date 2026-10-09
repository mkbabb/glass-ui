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

T-1 · Chromium 149.0.7827.55
  f1 light #0 button (tile) rung 40.0 · 82.00×75.48 20px→20.00 (÷h/2 0.53) | 141.69×92.97 20px→20.00 (÷h/2 0.43) | 141.69×110.45 20px→20.00 (÷h/2 0.36) · bound root --radius-field = 16.00: missed; root names none
  f1 light coarse #0 button (tile) rung 44.0 · 102.00×75.48 30px→30.00 (÷h/2 0.79) | 161.69×92.97 30px→30.00 (÷h/2 0.65) | 161.69×110.45 30px→30.00 (÷h/2 0.54) · bound root --radius-field = 16.00: missed; root names none
  f1 light --ui-scale 1.25 #0 button (tile) rung 50.0 · 92.00×75.48 25px→25.00 (÷h/2 0.66) | 151.69×92.97 25px→25.00 (÷h/2 0.54) | 151.69×110.45 25px→25.00 (÷h/2 0.45) · bound root --radius-field = 16.00: missed; root names none
  [unmigrated] f1-verbatim light #0 button (tile) rung 40.0 · 82.00×75.48 20px→20.00 (÷h/2 0.53) | 141.69×92.97 20px→20.00 (÷h/2 0.43) | 141.69×110.45 20px→20.00 (÷h/2 0.36) · bound root --radius-field = 16.00: missed; root names none
  [unmigrated] f1-verbatim light coarse #0 button (tile) rung 44.0 · 102.00×75.48 30px→30.00 (÷h/2 0.79) | 161.69×92.97 30px→30.00 (÷h/2 0.65) | 161.69×110.45 30px→30.00 (÷h/2 0.54) · bound root --radius-field = 16.00: missed; root names none
  [unmigrated] f1-verbatim light --ui-scale 1.25 #0 button (tile) rung 50.0 · 92.00×75.48 25px→25.00 (÷h/2 0.66) | 151.69×92.97 25px→25.00 (÷h/2 0.54) | 151.69×110.45 25px→25.00 (÷h/2 0.45) · bound root --radius-field = 16.00: missed; root names none
  v2 light #0 button (tile) rung 26.1 · 460.00×71.41 0px→0.00 (÷h/2 0.00) | 460.00×77.50 0px→0.00 (÷h/2 0.00) | 460.00×91.25 0px→0.00 (÷h/2 0.00) · bound root --radius-field = 16.00: missed; root names none
  v2 light coarse #0 button (tile) rung 26.1 · 460.00×71.41 0px→0.00 (÷h/2 0.00) | 460.00×77.50 0px→0.00 (÷h/2 0.00) | 460.00×91.25 0px→0.00 (÷h/2 0.00) · bound root --radius-field = 16.00: missed; root names none
  v2 light --ui-scale 1.25 #0 button (tile) rung 26.1 · 460.00×71.41 0px→0.00 (÷h/2 0.00) | 460.00×77.50 0px→0.00 (÷h/2 0.00) | 460.00×91.25 0px→0.00 (÷h/2 0.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light #0 button (tile) rung 46.2 · 54.80×46.17 9999px→23.09 (÷h/2 1.00) | 97.92×60.47 9999px→30.23 (÷h/2 1.00) | 97.92×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light #1 button (tile) rung 46.2 · 53.03×46.17 9999px→23.09 (÷h/2 1.00) | 97.92×60.47 9999px→30.23 (÷h/2 1.00) | 97.92×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light #2 button (tile) rung 46.2 · 64.61×46.17 9999px→23.09 (÷h/2 1.00) | 97.92×60.47 9999px→30.23 (÷h/2 1.00) | 97.92×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light #3 button (tile) rung 46.2 · 55.69×46.17 9999px→23.09 (÷h/2 1.00) | 97.92×60.47 9999px→30.23 (÷h/2 1.00) | 97.92×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light coarse #0 button (tile) rung 44.0 · 54.80×46.17 9999px→23.09 (÷h/2 1.00) | 97.92×60.47 9999px→30.23 (÷h/2 1.00) | 97.92×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light coarse #1 button (tile) rung 44.0 · 53.03×46.17 9999px→23.09 (÷h/2 1.00) | 97.92×60.47 9999px→30.23 (÷h/2 1.00) | 97.92×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light coarse #2 button (tile) rung 44.0 · 64.61×46.17 9999px→23.09 (÷h/2 1.00) | 97.92×60.47 9999px→30.23 (÷h/2 1.00) | 97.92×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light coarse #3 button (tile) rung 44.0 · 55.69×46.17 9999px→23.09 (÷h/2 1.00) | 97.92×60.47 9999px→30.23 (÷h/2 1.00) | 97.92×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light --ui-scale 1.25 #0 button (tile) rung 46.2 · 54.80×46.17 9999px→23.09 (÷h/2 1.00) | 97.92×60.47 9999px→30.23 (÷h/2 1.00) | 97.92×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light --ui-scale 1.25 #1 button (tile) rung 46.2 · 53.03×46.17 9999px→23.09 (÷h/2 1.00) | 97.92×60.47 9999px→30.23 (÷h/2 1.00) | 97.92×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light --ui-scale 1.25 #2 button (tile) rung 46.2 · 64.61×46.17 9999px→23.09 (÷h/2 1.00) | 97.92×60.47 9999px→30.23 (÷h/2 1.00) | 97.92×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light --ui-scale 1.25 #3 button (tile) rung 46.2 · 55.69×46.17 9999px→23.09 (÷h/2 1.00) | 97.92×60.47 9999px→30.23 (÷h/2 1.00) | 97.92×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  wrap light #1 Chip pill (control) rung 33.4 · 53.91×33.41 9999px→16.70 (÷h/2 1.00) | 110.00×76.22 9999px→38.11 (÷h/2 1.00) | 110.00×119.03 9999px→55.00 (÷h/2 0.92) · bound rung/2 = 16.70: missed; root names none
  wrap light coarse #1 Chip pill (control) rung 44.0 · 53.91×44.00 9999px→22.00 (÷h/2 1.00) | 110.00×76.22 9999px→38.11 (÷h/2 1.00) | 110.00×119.03 9999px→55.00 (÷h/2 0.92) · bound rung/2 = 22.00: missed; root names none
  wrap light coarse #2 Button (control) rung 44.0 · 110.00×44.00 30px→22.00 (÷h/2 1.00) | 110.00×102.94 30px→30.00 (÷h/2 0.58) | 110.00×178.64 30px→30.00 (÷h/2 0.34) · bound rung/2 = 22.00: missed; root names none
  wrap light --ui-scale 1.25 #1 Chip pill (control) rung 33.4 · 53.91×33.41 9999px→16.70 (÷h/2 1.00) | 110.00×76.22 9999px→38.11 (÷h/2 1.00) | 110.00×119.03 9999px→55.00 (÷h/2 0.92) · bound rung/2 = 16.70: missed; root names none

T-1 · Playwright WebKit 26.5
  f1 light #0 button (tile) rung 40.0 · 82.00×75.48 20px→20.00 (÷h/2 0.53) | 141.69×92.97 20px→20.00 (÷h/2 0.43) | 141.69×110.45 20px→20.00 (÷h/2 0.36) · bound root --radius-field = 16.00: missed; root names none
  f1 light coarse #0 button (tile) rung 44.0 · 102.00×75.48 30px→30.00 (÷h/2 0.79) | 161.69×92.97 30px→30.00 (÷h/2 0.65) | 161.69×110.45 30px→30.00 (÷h/2 0.54) · bound root --radius-field = 16.00: missed; root names none
  f1 light --ui-scale 1.25 #0 button (tile) rung 50.0 · 92.00×75.48 25px→25.00 (÷h/2 0.66) | 151.69×92.97 25px→25.00 (÷h/2 0.54) | 151.69×110.45 25px→25.00 (÷h/2 0.45) · bound root --radius-field = 16.00: missed; root names none
  [unmigrated] f1-verbatim light #0 button (tile) rung 40.0 · 83.00×76.48 20px→20.00 (÷h/2 0.52) | 142.69×93.97 20px→20.00 (÷h/2 0.43) | 142.69×111.45 20px→20.00 (÷h/2 0.36) · bound root --radius-field = 16.00: missed; root names none
  [unmigrated] f1-verbatim light coarse #0 button (tile) rung 44.0 · 103.00×76.48 30px→30.00 (÷h/2 0.78) | 162.69×93.97 30px→30.00 (÷h/2 0.64) | 162.69×111.45 30px→30.00 (÷h/2 0.54) · bound root --radius-field = 16.00: missed; root names none
  [unmigrated] f1-verbatim light --ui-scale 1.25 #0 button (tile) rung 50.0 · 93.00×76.48 25px→25.00 (÷h/2 0.65) | 152.69×93.97 25px→25.00 (÷h/2 0.53) | 152.69×111.45 25px→25.00 (÷h/2 0.45) · bound root --radius-field = 16.00: missed; root names none
  v2 light #0 button (tile) rung 26.1 · 460.00×71.41 0px→0.00 (÷h/2 0.00) | 460.00×77.50 0px→0.00 (÷h/2 0.00) | 460.00×91.25 0px→0.00 (÷h/2 0.00) · bound root --radius-field = 16.00: missed; root names none
  v2 light coarse #0 button (tile) rung 26.1 · 460.00×71.41 0px→0.00 (÷h/2 0.00) | 460.00×77.50 0px→0.00 (÷h/2 0.00) | 460.00×91.25 0px→0.00 (÷h/2 0.00) · bound root --radius-field = 16.00: missed; root names none
  v2 light --ui-scale 1.25 #0 button (tile) rung 26.1 · 460.00×71.41 0px→0.00 (÷h/2 0.00) | 460.00×77.50 0px→0.00 (÷h/2 0.00) | 460.00×91.25 0px→0.00 (÷h/2 0.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light #0 button (tile) rung 46.2 · 54.81×46.17 9999px→23.09 (÷h/2 1.00) | 97.98×60.47 9999px→30.23 (÷h/2 1.00) | 97.98×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light #1 button (tile) rung 46.2 · 53.05×46.17 9999px→23.09 (÷h/2 1.00) | 97.98×60.47 9999px→30.23 (÷h/2 1.00) | 97.98×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light #2 button (tile) rung 46.2 · 64.63×46.17 9999px→23.09 (÷h/2 1.00) | 97.98×60.47 9999px→30.23 (÷h/2 1.00) | 97.98×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light #3 button (tile) rung 46.2 · 55.69×46.17 9999px→23.09 (÷h/2 1.00) | 97.98×60.47 9999px→30.23 (÷h/2 1.00) | 97.98×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light coarse #0 button (tile) rung 44.0 · 54.81×46.17 9999px→23.09 (÷h/2 1.00) | 97.98×60.47 9999px→30.23 (÷h/2 1.00) | 97.98×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light coarse #1 button (tile) rung 44.0 · 53.05×46.17 9999px→23.09 (÷h/2 1.00) | 97.98×60.47 9999px→30.23 (÷h/2 1.00) | 97.98×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light coarse #2 button (tile) rung 44.0 · 64.63×46.17 9999px→23.09 (÷h/2 1.00) | 97.98×60.47 9999px→30.23 (÷h/2 1.00) | 97.98×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light coarse #3 button (tile) rung 44.0 · 55.69×46.17 9999px→23.09 (÷h/2 1.00) | 97.98×60.47 9999px→30.23 (÷h/2 1.00) | 97.98×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light --ui-scale 1.25 #0 button (tile) rung 46.2 · 54.81×46.17 9999px→23.09 (÷h/2 1.00) | 97.98×60.47 9999px→30.23 (÷h/2 1.00) | 97.98×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light --ui-scale 1.25 #1 button (tile) rung 46.2 · 53.05×46.17 9999px→23.09 (÷h/2 1.00) | 97.98×60.47 9999px→30.23 (÷h/2 1.00) | 97.98×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light --ui-scale 1.25 #2 button (tile) rung 46.2 · 64.63×46.17 9999px→23.09 (÷h/2 1.00) | 97.98×60.47 9999px→30.23 (÷h/2 1.00) | 97.98×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  chipcell light --ui-scale 1.25 #3 button (tile) rung 46.2 · 55.69×46.17 9999px→23.09 (÷h/2 1.00) | 97.98×60.47 9999px→30.23 (÷h/2 1.00) | 97.98×74.77 9999px→37.38 (÷h/2 1.00) · bound root --radius-field = 16.00: missed; root names none
  wrap light #1 Chip pill (control) rung 33.4 · 53.91×33.41 9999px→16.70 (÷h/2 1.00) | 110.00×76.22 9999px→38.11 (÷h/2 1.00) | 110.00×119.03 9999px→55.00 (÷h/2 0.92) · bound rung/2 = 16.70: missed; root names none
  wrap light coarse #1 Chip pill (control) rung 44.0 · 53.91×44.00 9999px→22.00 (÷h/2 1.00) | 110.00×76.22 9999px→38.11 (÷h/2 1.00) | 110.00×119.03 9999px→55.00 (÷h/2 0.92) · bound rung/2 = 22.00: missed; root names none
  wrap light coarse #2 Button (control) rung 44.0 · 110.00×44.00 30px→22.00 (÷h/2 1.00) | 110.00×102.88 30px→30.00 (÷h/2 0.58) | 110.00×178.53 30px→30.00 (÷h/2 0.34) · bound rung/2 = 22.00: missed; root names none
  wrap light --ui-scale 1.25 #1 Chip pill (control) rung 33.4 · 53.91×33.41 9999px→16.70 (÷h/2 1.00) | 110.00×76.22 9999px→38.11 (÷h/2 1.00) | 110.00×119.03 9999px→55.00 (÷h/2 0.92) · bound rung/2 = 16.70: missed; root names none

T-3 · Chromium 149.0.7827.55
  preset light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.20:1; p95 1.20; items 1/0 204×40
  preset dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.23:1; p95 1.28; items 1/0 204×40
  preset prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  [unmigrated] preset-verbatim light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 248.00 px²; fill 1.09:1; p95 1.22; items 1/0 208×40
  [unmigrated] preset-verbatim dark · carrier ≥3:1 area 233.00 px² (perimeter band 227.75, interior 5.25) vs the bar 248.00 px²; fill 1.06:1; p95 1.14; items 1/0 208×40
  [unmigrated] preset-verbatim prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 248.00 px²; fill 1.07:1; p95 1.07; items 1/0 208×40
  specimen light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.19:1; p95 1.19; items 1/0 207×36
  specimen dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.22:1; p95 1.29; items 1/0 207×36
  specimen prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.00:1; p95 1.00; items 1/0 207×36
  strip light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.49:1; p95 1.50; items 1/0 44×44
  strip prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.13:1; p95 1.13; items 1/0 44×44
  [unmigrated] strip-verbatim light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.49:1; p95 1.50; items 1/0 44×44
  [unmigrated] strip-verbatim prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.13:1; p95 1.13; items 1/0 44×44
  f1 light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 157.00 px²; fill 1.01:1; p95 1.05; items 1/0 82×75
  f1 dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 157.00 px²; fill 1.02:1; p95 1.07; items 1/0 82×75
  f1 prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 157.00 px²; fill 1.00:1; p95 1.00; items 1/0 82×75
  [unmigrated] f1-verbatim dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 157.00 px²; fill 1.02:1; p95 1.41; items 1/0 82×75
  [unmigrated] f1-verbatim forced · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 157.00 px²; fill 1.00:1; p95 1.00; items 1/0 82×75
  v2 light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71
  v2 dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71
  v2 prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71
  [unmigrated] v2-verbatim light · carrier ≥3:1 area 61.50 px² (perimeter band 61.50, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71
  [unmigrated] v2-verbatim dark · carrier ≥3:1 area 61.50 px² (perimeter band 61.50, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71
  [unmigrated] v2-verbatim prt · carrier ≥3:1 area 61.50 px² (perimeter band 61.50, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71
  c1 light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 475.00 px²; fill 1.00:1; p95 1.00; items 1/0 442×33
  c1 dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 475.00 px²; fill 1.00:1; p95 1.00; items 1/0 442×33
  c1 prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 475.00 px²; fill 1.00:1; p95 1.00; items 1/0 442×33
  [unmigrated] c1-verbatim light · carrier ≥3:1 area 17.00 px² (perimeter band 0.00, interior 17.00) vs the bar 475.00 px²; fill 1.23:1; p95 1.24; items 1/0 442×33
  [unmigrated] c1-verbatim dark · carrier ≥3:1 area 22.50 px² (perimeter band 0.00, interior 22.50) vs the bar 475.00 px²; fill 1.17:1; p95 1.16; items 1/0 442×33
  [unmigrated] c1-verbatim prt · carrier ≥3:1 area 22.50 px² (perimeter band 0.00, interior 22.50) vs the bar 475.00 px²; fill 1.03:1; p95 1.02; items 1/0 442×33
  [migrated] c1-migrated light · carrier ≥3:1 area 22.50 px² (perimeter band 0.00, interior 22.50) vs the bar 224.00 px²; fill 1.17:1; p95 1.17; items 1/0 184×40
  [migrated] c1-migrated dark · carrier ≥3:1 area 22.50 px² (perimeter band 0.00, interior 22.50) vs the bar 224.00 px²; fill 1.23:1; p95 1.30; items 1/0 184×40
  [migrated] c1-migrated prt · carrier ≥3:1 area 22.50 px² (perimeter band 0.00, interior 22.50) vs the bar 224.00 px²; fill 1.01:1; p95 1.00; items 1/0 184×40
  preset-invalid light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.21:1; p95 1.21; items 1/0 204×40
  preset-invalid dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.22:1; p95 1.25; items 1/0 204×40
  preset-invalid prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  preset-sibling light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.21:1; p95 1.21; items 1/0 204×40
  preset-sibling dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.22:1; p95 1.25; items 1/0 204×40
  preset-sibling prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  preset-tone-translucent light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.03:1; p95 1.03; items 1/0 204×40
  preset-tone-translucent dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.02:1; p95 1.04; items 1/0 204×40
  preset-tone-translucent prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  preset-tone-unresolvable light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.20:1; p95 1.20; items 1/0 204×40
  preset-tone-unresolvable dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.23:1; p95 1.28; items 1/0 204×40
  preset-tone-unresolvable prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  preset-contents light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.20:1; p95 1.20; items 1/0 204×40
  preset-contents dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.23:1; p95 1.28; items 1/0 204×40
  preset-contents prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  card light · no selected/unselected pair among 4 items (sel -1, unsel -1)
  card dark · no selected/unselected pair among 4 items (sel -1, unsel -1)
  card prt · no selected/unselected pair among 4 items (sel -1, unsel -1)
  chipcell light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 99.00 px²; fill 1.49:1; p95 1.50; items 1/0 53×46 (sizes differ by 1.8 px; cropped to the smaller)
  chipcell prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 99.00 px²; fill 1.13:1; p95 1.13; items 1/0 53×46 (sizes differ by 1.8 px; cropped to the smaller)
  [migrated] specimen-migrated paint containment (light) · selected edge uncontained 2.00 px (top 2.00, right 2.00, bottom 2.00, left 2.00) · under content-visibility: auto 1.00 px (top 1.00, right 1.00, bottom 1.00, left 1.00)
  [migrated] strip-migrated paint containment (light) · selected edge uncontained 2.00 px (top 2.00, right 2.00, bottom 2.00, left 2.00) · under content-visibility: auto 1.00 px (top 1.00, right 1.00, bottom 1.00, left 1.00)
  [migrated] f1-migrated paint containment (light) · selected edge uncontained 2.00 px (top 2.00, right 2.00, bottom 2.00, left 2.00) · under content-visibility: auto 1.00 px (top 1.00, right 1.00, bottom 1.00, left 1.00)

T-3 · Playwright WebKit 26.5
  preset light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.21:1; p95 1.22; items 1/0 204×40
  preset dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.20:1; p95 1.27; items 1/0 204×40
  preset prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  [unmigrated] preset-verbatim light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 248.00 px²; fill 1.10:1; p95 1.22; items 1/0 208×40
  [unmigrated] preset-verbatim dark · carrier ≥3:1 area 217.00 px² (perimeter band 213.50, interior 3.50) vs the bar 248.00 px²; fill 1.07:1; p95 1.13; items 1/0 208×40
  [unmigrated] preset-verbatim prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 248.00 px²; fill 1.07:1; p95 1.08; items 1/0 208×40
  [unmigrated] preset-verbatim forced · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 248.00 px²; fill 1.11:1; p95 1.53; items 1/0 208×40
  specimen light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.21:1; p95 1.22; items 1/0 207×36
  specimen dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.20:1; p95 1.26; items 1/0 207×36
  specimen prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.00:1; p95 1.00; items 1/0 207×36
  strip light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.49:1; p95 1.49; items 1/0 44×44
  strip prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.13:1; p95 1.13; items 1/0 44×44
  [unmigrated] strip-verbatim light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.49:1; p95 1.49; items 1/0 44×44
  [unmigrated] strip-verbatim prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.13:1; p95 1.13; items 1/0 44×44
  [unmigrated] strip-verbatim forced · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.11:1; p95 1.72; items 1/0 44×44
  f1 light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 157.00 px²; fill 1.00:1; p95 1.02; items 1/0 82×75
  f1 dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 157.00 px²; fill 1.01:1; p95 1.07; items 1/0 82×75
  f1 prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 157.00 px²; fill 1.01:1; p95 1.07; items 1/0 82×75
  [unmigrated] f1-verbatim dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 159.00 px²; fill 1.02:1; p95 2.10; items 1/0 83×76
  v2 light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71
  v2 dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71
  v2 prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71
  [unmigrated] v2-verbatim light · carrier ≥3:1 area 65.50 px² (perimeter band 65.50, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71
  [unmigrated] v2-verbatim dark · carrier ≥3:1 area 65.50 px² (perimeter band 65.50, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71
  [unmigrated] v2-verbatim prt (forced level-0 path) · carrier ≥3:1 area 65.50 px² (perimeter band 65.50, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71
  [unmigrated] v2-verbatim forced · carrier ≥3:1 area 43.00 px² (perimeter band 43.00, interior 0.00) vs the bar 531.00 px²; fill 1.00:1; p95 1.00; items 1/0 460×71 (sizes differ by 4.0 px; cropped to the smaller)
  c1 light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 475.00 px²; fill 1.00:1; p95 1.00; items 1/0 442×33
  c1 dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 475.00 px²; fill 1.00:1; p95 1.00; items 1/0 442×33
  c1 prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 475.00 px²; fill 1.00:1; p95 1.00; items 1/0 442×33
  [unmigrated] c1-verbatim light · carrier ≥3:1 area 22.50 px² (perimeter band 0.00, interior 22.50) vs the bar 475.00 px²; fill 1.23:1; p95 1.24; items 1/0 442×33
  [unmigrated] c1-verbatim dark · carrier ≥3:1 area 22.50 px² (perimeter band 0.00, interior 22.50) vs the bar 475.00 px²; fill 1.17:1; p95 1.16; items 1/0 442×33
  [unmigrated] c1-verbatim prt (forced level-0 path) · carrier ≥3:1 area 22.50 px² (perimeter band 0.00, interior 22.50) vs the bar 475.00 px²; fill 1.03:1; p95 1.02; items 1/0 442×33
  [unmigrated] c1-verbatim forced · carrier ≥3:1 area 23.00 px² (perimeter band 0.50, interior 22.50) vs the bar 475.00 px²; fill 1.03:1; p95 1.45; items 1/0 442×33 (sizes differ by 4.0 px; cropped to the smaller)
  [migrated] c1-migrated light · carrier ≥3:1 area 22.50 px² (perimeter band 0.00, interior 22.50) vs the bar 224.00 px²; fill 1.22:1; p95 1.22; items 1/0 184×40
  [migrated] c1-migrated dark · carrier ≥3:1 area 22.50 px² (perimeter band 0.00, interior 22.50) vs the bar 224.00 px²; fill 1.21:1; p95 1.26; items 1/0 184×40
  [migrated] c1-migrated prt (forced level-0 path) · carrier ≥3:1 area 22.50 px² (perimeter band 0.00, interior 22.50) vs the bar 224.00 px²; fill 1.01:1; p95 1.00; items 1/0 184×40
  preset-invalid light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.21:1; p95 1.21; items 1/0 204×40
  preset-invalid dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.21:1; p95 1.24; items 1/0 204×40
  preset-invalid prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  preset-sibling light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.21:1; p95 1.23; items 1/0 204×40
  preset-sibling dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.22:1; p95 1.24; items 1/0 204×40
  preset-sibling prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.01; items 1/0 204×40
  preset-tone-translucent light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.05:1; p95 1.05; items 1/0 204×40
  preset-tone-translucent dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.01:1; p95 1.02; items 1/0 204×40
  preset-tone-translucent prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.01; items 1/0 204×40
  preset-tone-unresolvable light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.21:1; p95 1.23; items 1/0 204×40
  preset-tone-unresolvable dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.20:1; p95 1.27; items 1/0 204×40
  preset-tone-unresolvable prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  preset-contents light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.21:1; p95 1.22; items 1/0 204×40
  preset-contents dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.20:1; p95 1.27; items 1/0 204×40
  preset-contents prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  card light · no selected/unselected pair among 4 items (sel -1, unsel -1)
  card dark · no selected/unselected pair among 4 items (sel -1, unsel -1)
  card prt (forced level-0 path) · no selected/unselected pair among 4 items (sel -1, unsel -1)
  chipcell light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 99.00 px²; fill 1.49:1; p95 1.49; items 1/0 53×46 (sizes differ by 1.8 px; cropped to the smaller)
  chipcell prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 99.00 px²; fill 1.13:1; p95 1.13; items 1/0 53×46 (sizes differ by 1.8 px; cropped to the smaller)

T-4 · Chromium 149.0.7827.55
  [unmigrated] preset-verbatim light sel=none · item 0 (unselected); outline dashed 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] preset-verbatim light sel=1 · item 1 (selected); outline dashed 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] preset-verbatim dark sel=none · item 0 (unselected); outline dashed 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] preset-verbatim dark sel=1 · item 1 (selected); outline dashed 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] preset-verbatim forced sel=none · ring reach (H3-8) · item 0 (unselected); outline dashed 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] preset-verbatim forced sel=1 · ring reach (H3-8) · item 1 (selected); outline dashed 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  specimen light sel=none · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  specimen light sel=1 · item 1 (selected); outline solid 2px offset 2px; painted ring px top 2.00 right 0.00 bottom 2.00 left 2.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  specimen dark sel=none · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  specimen dark sel=1 · item 1 (selected); outline solid 2px offset 2px; painted ring px top 2.00 right 0.00 bottom 2.00 left 2.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  specimen forced sel=none · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  specimen forced sel=1 · ring reach (H3-8) · item 1 (selected); outline solid 2px offset 2px; painted ring px top 2.00 right 0.00 bottom 2.00 left 2.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] specimen-verbatim light sel=none · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] specimen-verbatim light sel=1 · item 1 (selected); outline solid 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] specimen-verbatim dark sel=none · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] specimen-verbatim dark sel=1 · item 1 (selected); outline solid 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] specimen-verbatim forced sel=none · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] specimen-verbatim forced sel=1 · ring reach (H3-8) · item 1 (selected); outline solid 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  f1 light sel=none · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  f1 light sel=1 · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  f1 dark sel=none · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  f1 dark sel=1 · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  f1 forced sel=none · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  f1 forced sel=1 · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] f1-verbatim light sel=none · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] f1-verbatim light sel=1 · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] f1-verbatim dark sel=none · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] f1-verbatim dark sel=1 · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] f1-verbatim forced sel=none · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] f1-verbatim forced sel=1 · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] c1-verbatim light sel=1 · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 0.00 left 2.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] c1-verbatim dark sel=1 · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 0.00 left 2.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] c1-verbatim forced sel=1 · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 0.00 left 2.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  card light sel=none · Tab landed on after, not an item
  card light sel=1 · Tab landed on after, not an item
  card dark sel=none · Tab landed on after, not an item
  card dark sel=1 · Tab landed on after, not an item
  card forced sel=none · ring reach (H3-8) · Tab landed on after, not an item
  card forced sel=1 · ring reach (H3-8) · Tab landed on after, not an item

T-4 · Playwright WebKit 26.5
  [unmigrated] preset-verbatim light sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline dashed 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] preset-verbatim light sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · item 1 (selected); outline dashed 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] preset-verbatim dark sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline dashed 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] preset-verbatim dark sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · item 1 (selected); outline dashed 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] preset-verbatim forced sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · item 0 (unselected); outline dashed 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] preset-verbatim forced sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · item 1 (selected); outline dashed 1px offset -1px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  specimen light sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  specimen light sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · item 1 (selected); outline solid 2px offset 2px; painted ring px top 2.00 right 0.00 bottom 2.00 left 2.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  specimen dark sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  specimen dark sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · item 1 (selected); outline solid 2px offset 2px; painted ring px top 2.00 right 0.00 bottom 2.00 left 2.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  specimen forced sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  specimen forced sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · item 1 (selected); outline solid 2px offset 2px; painted ring px top 2.00 right 0.00 bottom 2.00 left 2.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] specimen-verbatim light sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] specimen-verbatim light sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · item 1 (selected); outline solid 1.5px offset -1.5px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] specimen-verbatim dark sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] specimen-verbatim dark sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · item 1 (selected); outline solid 1.5px offset -1.5px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] specimen-verbatim forced sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] specimen-verbatim forced sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · item 1 (selected); outline solid 1.5px offset -1.5px; painted ring px top 0.00 right 0.00 bottom 0.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  f1 light sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  f1 light sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  f1 dark sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  f1 dark sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  f1 forced sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  f1 forced sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] f1-verbatim light sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] f1-verbatim light sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] f1-verbatim dark sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] f1-verbatim dark sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] f1-verbatim forced sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] f1-verbatim forced sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 2.00 left 0.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] c1-verbatim light sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 0.00 left 2.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] c1-verbatim dark sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 0.00 left 2.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  [unmigrated] c1-verbatim forced sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · item 0 (unselected); outline solid 2px offset 2px; painted ring px top 2.00 right 2.00 bottom 0.00 left 2.00 (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)
  card light sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · Alt+Tab landed on after, not an item
  card light sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · Alt+Tab landed on after, not an item
  card dark sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · Alt+Tab landed on after, not an item
  card dark sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · Alt+Tab landed on after, not an item
  card forced sel=none (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · Alt+Tab landed on after, not an item
  card forced sel=1 (Option+Tab: Playwright WebKit's Tab skips buttons) · ring reach (H3-8) · Alt+Tab landed on after, not an item

T-5 · Chromium 149.0.7827.55
  strip ARIA (CDP AX tree) · group group · items button · checked ------ · pressed falsetruefalsefalsefalsefalse · selected ------
  strip tab stops · 6 stop(s) between the sentinels, 6 of them items [0 → 1 → 2 → 3 → 4 → 5]
  strip row ArrowRight from #0 · focus 0 → 0 · moved false · checked true
  strip row ArrowLeft from #1 · focus 1 → 1 · moved false · checked true
  strip row ArrowDown from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true
  strip row ArrowUp from #5 (linear step, Q-4 b) · focus 5 → 5 · moved false · checked true
  [unmigrated] strip-verbatim ARIA (CDP AX tree) · group group · items button · checked ------ · pressed falsetruefalsefalsefalsefalse · selected ------
  [unmigrated] strip-verbatim tab stops · 6 stop(s) between the sentinels, 6 of them items [0 → 1 → 2 → 3 → 4 → 5]
  [unmigrated] strip-verbatim row ArrowRight from #0 · focus 0 → 0 · moved false · checked true
  [unmigrated] strip-verbatim row ArrowLeft from #1 · focus 1 → 1 · moved false · checked true
  [unmigrated] strip-verbatim row ArrowDown from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true
  [unmigrated] strip-verbatim row ArrowUp from #5 (linear step, Q-4 b) · focus 5 → 5 · moved false · checked true
  f1 ARIA (CDP AX tree) · group generic · items button · checked ------ · pressed ------ · selected ------
  f1 tab stops · 6 stop(s) between the sentinels, 6 of them items [0 → 1 → 2 → 3 → 4 → 5]
  f1 row ArrowRight from #0 · focus 0 → 0 · moved false · checked true
  f1 row ArrowLeft from #1 · focus 1 → 1 · moved false · checked true
  f1 row ArrowDown from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true
  f1 row ArrowUp from #5 (linear step, Q-4 b) · focus 5 → 5 · moved false · checked false (the click did not focus; focus placed by script)
  [unmigrated] f1-verbatim ARIA (CDP AX tree) · group generic · items button · checked ------ · pressed ------ · selected ------
  [unmigrated] f1-verbatim tab stops · 6 stop(s) between the sentinels, 6 of them items [0 → 1 → 2 → 3 → 4 → 5]
  [unmigrated] f1-verbatim row ArrowRight from #0 · focus 0 → 0 · moved false · checked true
  [unmigrated] f1-verbatim row ArrowLeft from #1 · focus 1 → 1 · moved false · checked false
  [unmigrated] f1-verbatim row ArrowDown from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true
  [unmigrated] f1-verbatim row ArrowUp from #5 (linear step, Q-4 b) · focus 5 → 5 · moved false · checked false (the click did not focus; focus placed by script)
  c1 tab stops · 5 stop(s) between the sentinels, 5 of them items [0 → 1 → 2 → 3 → 4]
  c1 column ArrowRight from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true
  c1 column ArrowLeft from #4 (linear step, Q-4 b) · focus 4 → 4 · moved false · checked true
  c1 column ArrowDown from #0 · focus 0 → 0 · moved false · checked true
  c1 column ArrowUp from #1 · focus 1 → 1 · moved false · checked true
  [unmigrated] c1-verbatim tab stops · 5 stop(s) between the sentinels, 5 of them items [0 → 1 → 2 → 3 → 4]
  [unmigrated] c1-verbatim column ArrowRight from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true
  [unmigrated] c1-verbatim column ArrowLeft from #4 (linear step, Q-4 b) · focus 4 → 4 · moved false · checked true
  [unmigrated] c1-verbatim column ArrowDown from #0 · focus 0 → 0 · moved false · checked true
  [unmigrated] c1-verbatim column ArrowUp from #1 · focus 1 → 1 · moved false · checked true
  card ARIA (CDP AX tree) · group listbox · items generic · checked ---- · pressed ---- · selected ----
  card tab stops · 0 stop(s) between the sentinels, 0 of them items []
  card grid ArrowRight from #0 · focus body → body · moved false · checked false (the click did not focus; focus placed by script)
  card grid ArrowLeft from #1 · focus body → body · moved false · checked false (the click did not focus; focus placed by script)
  card grid ArrowDown from #0 · focus body → body · moved false · checked false (the click did not focus; focus placed by script)
  card grid ArrowUp from #2 · focus body → body · moved false · checked false (the click did not focus; focus placed by script)
  chipcell ARIA (CDP AX tree) · group group · items button · checked ---- · pressed falsetruefalsefalse · selected ----
  chipcell tab stops · 4 stop(s) between the sentinels, 4 of them items [0 → 1 → 2 → 3]
  chipcell row ArrowRight from #0 · focus 0 → 0 · moved false · checked true
  chipcell row ArrowLeft from #1 · focus 1 → 1 · moved false · checked true
  chipcell row ArrowDown from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true
  chipcell row ArrowUp from #3 (linear step, Q-4 b) · focus 3 → 3 · moved false · checked true

T-5 · Playwright WebKit 26.5
  strip ARIA (Playwright aria snapshot + DOM states) · group group · items button · checked ------ · pressed falsetruefalsefalsefalsefalse · selected ------
  strip tab stops · 6 stop(s) between the sentinels, 6 of them items [0 → 1 → 2 → 3 → 4 → 5] (Option+Tab: Playwright WebKit's Tab skips buttons)
  strip row ArrowRight from #0 · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  strip row ArrowLeft from #1 · focus 1 → 1 · moved false · checked true (started by focus + Space: PF-1)
  strip row ArrowDown from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  strip row ArrowUp from #5 (linear step, Q-4 b) · focus 5 → 5 · moved false · checked true (started by focus + Space: PF-1)
  [unmigrated] strip-verbatim ARIA (Playwright aria snapshot + DOM states) · group group · items button · checked ------ · pressed falsetruefalsefalsefalsefalse · selected ------
  [unmigrated] strip-verbatim tab stops · 6 stop(s) between the sentinels, 6 of them items [0 → 1 → 2 → 3 → 4 → 5] (Option+Tab: Playwright WebKit's Tab skips buttons)
  [unmigrated] strip-verbatim row ArrowRight from #0 · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  [unmigrated] strip-verbatim row ArrowLeft from #1 · focus 1 → 1 · moved false · checked true (started by focus + Space: PF-1)
  [unmigrated] strip-verbatim row ArrowDown from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  [unmigrated] strip-verbatim row ArrowUp from #5 (linear step, Q-4 b) · focus 5 → 5 · moved false · checked true (started by focus + Space: PF-1)
  f1 ARIA (Playwright aria snapshot + DOM states) · group button · items button · checked ------ · pressed ------ · selected ------
  f1 tab stops · 6 stop(s) between the sentinels, 6 of them items [0 → 1 → 2 → 3 → 4 → 5] (Option+Tab: Playwright WebKit's Tab skips buttons)
  f1 row ArrowRight from #0 · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  f1 row ArrowLeft from #1 · focus 1 → 1 · moved false · checked true (started by focus + Space: PF-1)
  f1 row ArrowDown from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  f1 row ArrowUp from #5 (linear step, Q-4 b) · focus 5 → 5 · moved false · checked true (started by focus + Space: PF-1)
  [unmigrated] f1-verbatim ARIA (Playwright aria snapshot + DOM states) · group button · items button · checked ------ · pressed ------ · selected ------
  [unmigrated] f1-verbatim tab stops · 6 stop(s) between the sentinels, 6 of them items [0 → 1 → 2 → 3 → 4 → 5] (Option+Tab: Playwright WebKit's Tab skips buttons)
  [unmigrated] f1-verbatim row ArrowRight from #0 · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  [unmigrated] f1-verbatim row ArrowLeft from #1 · focus 1 → 1 · moved false · checked true (started by focus + Space: PF-1)
  [unmigrated] f1-verbatim row ArrowDown from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  [unmigrated] f1-verbatim row ArrowUp from #5 (linear step, Q-4 b) · focus 5 → 5 · moved false · checked true (started by focus + Space: PF-1)
  c1 tab stops · 5 stop(s) between the sentinels, 5 of them items [0 → 1 → 2 → 3 → 4] (Option+Tab: Playwright WebKit's Tab skips buttons)
  c1 column ArrowRight from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  c1 column ArrowLeft from #4 (linear step, Q-4 b) · focus 4 → 4 · moved false · checked true (started by focus + Space: PF-1)
  c1 column ArrowDown from #0 · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  c1 column ArrowUp from #1 · focus 1 → 1 · moved false · checked true (started by focus + Space: PF-1)
  [unmigrated] c1-verbatim tab stops · 5 stop(s) between the sentinels, 5 of them items [0 → 1 → 2 → 3 → 4] (Option+Tab: Playwright WebKit's Tab skips buttons)
  [unmigrated] c1-verbatim column ArrowRight from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  [unmigrated] c1-verbatim column ArrowLeft from #4 (linear step, Q-4 b) · focus 4 → 4 · moved false · checked true (started by focus + Space: PF-1)
  [unmigrated] c1-verbatim column ArrowDown from #0 · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  [unmigrated] c1-verbatim column ArrowUp from #1 · focus 1 → 1 · moved false · checked true (started by focus + Space: PF-1)
  card ARIA (Playwright aria snapshot + DOM states) · group listbox · items heading · checked ---- · pressed ---- · selected ----
  card tab stops · 0 stop(s) between the sentinels, 0 of them items [] (Option+Tab: Playwright WebKit's Tab skips buttons)
  card grid ArrowRight from #0 · focus body → body · moved false · checked false (started by focus + Space: PF-1)
  card grid ArrowLeft from #1 · focus body → body · moved false · checked false (started by focus + Space: PF-1)
  card grid ArrowDown from #0 · focus body → body · moved false · checked false (started by focus + Space: PF-1)
  card grid ArrowUp from #2 · focus body → body · moved false · checked false (started by focus + Space: PF-1)
  chipcell ARIA (Playwright aria snapshot + DOM states) · group group · items button · checked ---- · pressed falsetruefalsefalse · selected ----
  chipcell tab stops · 4 stop(s) between the sentinels, 4 of them items [0 → 1 → 2 → 3] (Option+Tab: Playwright WebKit's Tab skips buttons)
  chipcell row ArrowRight from #0 · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  chipcell row ArrowLeft from #1 · focus 1 → 1 · moved false · checked true (started by focus + Space: PF-1)
  chipcell row ArrowDown from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  chipcell row ArrowUp from #3 (linear step, Q-4 b) · focus 3 → 3 · moved false · checked true (started by focus + Space: PF-1)

T-6 · Chromium 149.0.7827.55
  f1 commit bar, keyboard commit (ArrowRight, pointer never moved) on #-1 · the input committed nothing (no item became selected) · load 41.60 / 32.49 / 29.12
  f1 commit bar, programmatic commit (focus on the sentinel after the group) on #0 · pop peak 1.00 at 7 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 16-307 ms; 97 frames, median 8.30 ms · load 40.11 / 32.33 / 29.08
  f1 commit bar, programmatic commit under a calm observer ([data-reorder] on the scene) on #0 · pop peak 1.00 at 0 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 16-308 ms; 98 frames, median 8.30 ms · load 40.11 / 32.33 / 29.08
  f1 hover light channel (scale pinned, ink hidden) · mean ΔE(OKLab) 0.0007 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.01:1)
  f1 press · scale 1.02×0.96; median frame 8.30 ms, load 38.58 / 32.14 / 29.03
  f1 commit bar, pointer commit (release of the press) on #0 · pop peak 1.02 at 28 ms, trough after it 1.01, settle 1.01 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 10-294 ms; 97 frames, median 8.30 ms · load 38.58 / 32.14 / 29.03
  f1 PRM hover light channel · mean ΔE(OKLab) 0.0007 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.01:1)
  f1 PRT hover light channel (prt) · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)
  [unmigrated] f1-verbatim commit bar, keyboard commit (ArrowRight, pointer never moved) on #-1 · the input committed nothing (no item became selected) · load 35.43 / 31.68 / 28.90
  [unmigrated] f1-verbatim commit bar, programmatic commit (focus on the sentinel after the group) on #0 · pop peak 1.00 at 7 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 16-307 ms; 97 frames, median 8.30 ms · load 35.23 / 31.70 / 28.93
  [unmigrated] f1-verbatim commit bar, programmatic commit under a calm observer ([data-reorder] on the scene) on #0 · pop peak 1.00 at 0 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 13-311 ms; 98 frames, median 8.30 ms · load 35.23 / 31.70 / 28.93
  [unmigrated] f1-verbatim hover light channel (scale pinned, ink hidden) · mean ΔE(OKLab) 0.0045 over the plate interior vs the bar 0.02 (reported: 14.47 % of pixels moved > 10 levels, p95 8.30:1)
  [unmigrated] f1-verbatim commit bar, pointer commit (release of the press) on #0 · pop peak 1.06 at 31 ms, trough after it 1.06, settle 1.06 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 14-297 ms; 97 frames, median 8.30 ms · load 36.81 / 32.08 / 29.08
  [unmigrated] f1-verbatim PRM hover light channel · mean ΔE(OKLab) 0.0045 over the plate interior vs the bar 0.02 (reported: 14.47 % of pixels moved > 10 levels, p95 8.30:1)
  [unmigrated] f1-verbatim PRT hover light channel (prt) · mean ΔE(OKLab) 0.0006 over the plate interior vs the bar 0.02 (reported: 11.33 % of pixels moved > 10 levels, p95 9.47:1)
  card commit bar, keyboard commit (ArrowRight, pointer never moved) on #undefined · keyboard traversal landed on after, not an item · load 30.89 / 31.09 / 28.84
  card commit bar, programmatic commit (focus on the sentinel after the group) on #0 · pop peak 1.00 at 9 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved never; 96 frames, median 8.40 ms · load 30.89 / 31.09 / 28.84
  card commit bar, programmatic commit under a calm observer ([data-reorder] on the scene) on #0 · pop peak 1.00 at 0 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved never; 98 frames, median 8.30 ms · load 31.38 / 31.18 / 28.88
  card hover light channel (scale pinned, ink hidden) · mean ΔE(OKLab) 0.0003 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.01:1)
  card hover scale · 1.00 (none); median frame 8.30 ms, load 32.23 / 31.36 / 28.96
  card press · scale 1.00×1.00; median frame 8.40 ms, load 32.23 / 31.36 / 28.96
  card commit bar, pointer commit (release of the press) on #0 · pop peak 1.00 at 1 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 10-302 ms; 97 frames, median 8.30 ms · load 32.23 / 31.36 / 28.96
  card PRM hover light channel · mean ΔE(OKLab) 0.0003 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.01:1)
  card PRT hover light channel (prt) · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)
  chipcell commit bar, keyboard commit (ArrowRight, pointer never moved) on #-1 · the input committed nothing (no item became selected) · load 39.24 / 32.90 / 29.53
  chipcell commit bar, programmatic commit (focus on the sentinel after the group) on #0 · pop peak 1.09 at 217 ms, trough after it 1.07, settle 1.07 (amplitude ok, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 16-367 ms; 96 frames, median 8.30 ms · load 41.46 / 33.46 / 29.75
  chipcell commit bar, programmatic commit under a calm observer ([data-reorder] on the scene) on #0 · pop peak 1.00 at 9 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 25-392 ms; 96 frames, median 8.30 ms · load 41.46 / 33.46 / 29.75
  chipcell hover light channel (scale pinned, ink hidden) · mean ΔE(OKLab) 0.0001 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)
  chipcell commit bar, pointer commit (release of the press) on #0 · pop peak 1.03 at 206 ms, trough after it 1.01, settle 1.01 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 14-371 ms; 97 frames, median 8.30 ms · load 45.41 / 34.57 / 30.19
  chipcell PRM hover light channel · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)
  chipcell PRT hover light channel (prt) · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)
  [unmigrated] strip-verbatim commit bar, keyboard commit (ArrowRight, pointer never moved) on #-1 · the input committed nothing (no item became selected) · load 56.54 / 38.74 / 31.89
  [unmigrated] strip-verbatim commit bar, programmatic commit (focus on the sentinel after the group) on #0 · pop peak 1.09 at 220 ms, trough after it 1.07, settle 1.07 (amplitude ok, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 20-378 ms; 96 frames, median 8.30 ms · load 56.54 / 38.74 / 31.89
  [unmigrated] strip-verbatim commit bar, programmatic commit under a calm observer ([data-reorder] on the scene) on #0 · pop peak 1.00 at 4 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 20-387 ms; 96 frames, median 8.40 ms · load 55.61 / 38.84 / 31.97
  [unmigrated] strip-verbatim hover light channel (scale pinned, ink hidden) · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)
  [unmigrated] strip-verbatim commit bar, pointer commit (release of the press) on #0 · pop peak 1.03 at 209 ms, trough after it 1.01, settle 1.01 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 12-376 ms; 97 frames, median 8.30 ms · load 55.24 / 39.04 / 32.08
  [unmigrated] strip-verbatim PRM hover light channel · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)
  [unmigrated] strip-verbatim PRT hover light channel (prt) · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)

T-6 · Playwright WebKit 26.5
  f1 commit bar, keyboard commit (ArrowRight, pointer never moved) on #-1 · the input committed nothing (no item became selected) · load 66.82 / 50.40 / 38.14
  f1 commit bar, programmatic commit (focus on the sentinel after the group) on #0 · pop peak 1.00 at 8 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 17-314 ms; 79 frames, median 10.00 ms · load 66.82 / 50.40 / 38.14
  f1 commit bar, programmatic commit under a calm observer ([data-reorder] on the scene) on #0 · pop peak 1.00 at 0 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 7-307 ms; 81 frames, median 10.00 ms · load 65.39 / 50.37 / 38.21
  f1 hover light channel (scale pinned, ink hidden) · mean ΔE(OKLab) 0.0005 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.01:1)
  f1 press · scale 1.02×0.96; median frame 10.00 ms, load 64.24 / 50.38 / 38.28
  f1 commit bar, pointer commit (release of the press) on #0 · pop peak 1.02 at 25 ms, trough after it 1.01, settle 1.01 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 12-310 ms; 80 frames, median 10.00 ms · load 64.24 / 50.38 / 38.28
  f1 PRM hover light channel · mean ΔE(OKLab) 0.0005 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.01:1)
  f1 PRT hover light channel (prt (forced level-0 path)) · mean ΔE(OKLab) 0.0038 over the plate interior vs the bar 0.02 (reported: 2.34 % of pixels moved > 10 levels, p95 1.06:1)
  [unmigrated] f1-verbatim commit bar, keyboard commit (ArrowRight, pointer never moved) on #-1 · the input committed nothing (no item became selected) · load 64.08 / 50.81 / 38.58
  [unmigrated] f1-verbatim commit bar, programmatic commit (focus on the sentinel after the group) on #0 · pop peak 1.00 at 17 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 26-313 ms; 78 frames, median 10.00 ms · load 65.92 / 51.41 / 38.86
  [unmigrated] f1-verbatim commit bar, programmatic commit under a calm observer ([data-reorder] on the scene) on #0 · pop peak 1.00 at 0 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 25-328 ms; 78 frames, median 10.00 ms · load 65.92 / 51.41 / 38.86
  [unmigrated] f1-verbatim hover light channel (scale pinned, ink hidden) · mean ΔE(OKLab) 0.0049 over the plate interior vs the bar 0.02 (reported: 16.57 % of pixels moved > 10 levels, p95 12.98:1)
  [unmigrated] f1-verbatim commit bar, pointer commit (release of the press) on #0 · pop peak 1.06 at 34 ms, trough after it 1.06, settle 1.06 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 12-310 ms; 79 frames, median 10.00 ms · load 64.73 / 51.63 / 39.08
  [unmigrated] f1-verbatim PRM hover light channel · mean ΔE(OKLab) 0.0050 over the plate interior vs the bar 0.02 (reported: 16.58 % of pixels moved > 10 levels, p95 12.98:1)
  [unmigrated] f1-verbatim PRT hover light channel (prt (forced level-0 path)) · mean ΔE(OKLab) 0.0049 over the plate interior vs the bar 0.02 (reported: 15.60 % of pixels moved > 10 levels, p95 15.49:1)
  card commit bar, keyboard commit (ArrowRight, pointer never moved) on #undefined · keyboard traversal landed on after, not an item · load 57.68 / 51.22 / 39.37
  card commit bar, programmatic commit (focus on the sentinel after the group) on #0 · pop peak 1.00 at 7 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved never; 79 frames, median 10.00 ms · load 59.39 / 51.68 / 39.60
  card commit bar, programmatic commit under a calm observer ([data-reorder] on the scene) on #0 · pop peak 1.00 at 0 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved never; 79 frames, median 10.00 ms · load 59.39 / 51.68 / 39.60
  card hover light channel (scale pinned, ink hidden) · mean ΔE(OKLab) 0.0003 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.01:1)
  card hover scale · 1.00 (none); median frame 10.00 ms, load 57.44 / 51.40 / 39.57
  card press · scale 1.00×1.00; median frame 10.00 ms, load 57.44 / 51.40 / 39.57
  card commit bar, pointer commit (release of the press) on #0 · pop peak 1.00 at 5 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 16-270 ms; 79 frames, median 10.00 ms · load 57.44 / 51.40 / 39.57
  card PRM hover light channel · mean ΔE(OKLab) 0.0003 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.01:1)
  card PRT hover light channel (prt (forced level-0 path)) · mean ΔE(OKLab) 0.0025 over the plate interior vs the bar 0.02 (reported: 0.17 % of pixels moved > 10 levels, p95 1.04:1)
  chipcell commit bar, keyboard commit (ArrowRight, pointer never moved) on #-1 · the input committed nothing (no item became selected) · load 60.39 / 52.36 / 40.12
  chipcell commit bar, programmatic commit (focus on the sentinel after the group) on #0 · pop peak 1.09 at 224 ms, trough after it 1.07, settle 1.07 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 16-366 ms; 78 frames, median 10.00 ms · load 60.39 / 52.36 / 40.12
  chipcell commit bar, programmatic commit under a calm observer ([data-reorder] on the scene) on #0 · pop peak 1.00 at 7 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 18-388 ms; 79 frames, median 10.00 ms · load 64.12 / 53.27 / 40.51
  chipcell hover light channel (scale pinned, ink hidden) · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)
  chipcell commit bar, pointer commit (release of the press) on #0 · pop peak 1.02 at 212 ms, trough after it 1.01, settle 1.01 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 15-366 ms; 79 frames, median 10.00 ms · load 64.43 / 53.51 / 40.68
  chipcell PRM hover light channel · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)
  chipcell PRT hover light channel (prt (forced level-0 path)) · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)
  [unmigrated] strip-verbatim commit bar, keyboard commit (ArrowRight, pointer never moved) on #-1 · the input committed nothing (no item became selected) · load 61.62 / 53.84 / 41.23
  [unmigrated] strip-verbatim commit bar, programmatic commit (focus on the sentinel after the group) on #0 · pop peak 1.09 at 223 ms, trough after it 1.07, settle 1.07 (amplitude ok, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 20-378 ms; 79 frames, median 10.00 ms · load 61.17 / 53.87 / 41.32
  [unmigrated] strip-verbatim commit bar, programmatic commit under a calm observer ([data-reorder] on the scene) on #0 · pop peak 1.00 at 6 ms, trough after it 1.00, settle 1.00 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 15-372 ms; 79 frames, median 10.00 ms · load 61.17 / 53.87 / 41.32
  [unmigrated] strip-verbatim hover light channel (scale pinned, ink hidden) · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)
  [unmigrated] strip-verbatim commit bar, pointer commit (release of the press) on #0 · pop peak 1.02 at 219 ms, trough after it 1.01, settle 1.01 (amplitude < 0.015, no bounce); body travel 0.00 px, overshoot 0.00 px; paint moved 15-371 ms; 80 frames, median 10.00 ms · load 62.12 / 54.32 / 41.63
  [unmigrated] strip-verbatim PRM hover light channel · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)
  [unmigrated] strip-verbatim PRT hover light channel (prt (forced level-0 path)) · mean ΔE(OKLab) 0.0000 over the plate interior vs the bar 0.02 (reported: 0.00 % of pixels moved > 10 levels, p95 1.00:1)

T-7 · Chromium 149.0.7827.55
  [unmigrated] preset-verbatim vs its stripped twin · rest · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px; outline-style: none → dashed; outline-width: 3px → 1px; outline-color: rgb(112, 89, 66) → rgba(0, 0, 0, 0); outline-offset: 0px → -1px; background-color: rgba(0, 0, 0, 0) → rgb(251, 250, 248); border-top-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0); border-right-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0); border-bottom-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0); border-left-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0)
  [unmigrated] preset-verbatim vs its stripped twin · on · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px; outline-style: none → dashed; outline-width: 3px → 1px; outline-color: oklch(0.216114 0.00613456 55.9893) → color(srgb 0.493698 0.351392 0.798991 / 0.65); outline-offset: 0px → -1px; background-color: oklab(0.216114 0.00343135 0.00508514 / 0.12) → color(srgb 0.945064 0.930072 0.958664); background-image: linear-gradient(color(srgb 0.20397 0.148263 0.0829736 / 0... → none; box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, color(srg... → none; border-top-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0); border-right-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0); border-bottom-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0); border-left-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0)
  [unmigrated] preset-verbatim on content ink · rgb(28, 25, 23) 400 / rgb(112, 89, 66) 600 → rgb(28, 25, 23) 400 / rgb(112, 89, 66) 500
  [unmigrated] preset-verbatim vs its stripped twin · focus · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px; outline-style: solid → dashed; outline-width: 2px → 1px; outline-color: oklab(0.216114 0.00343135 0.00508514 / 0.48) → color(srgb 0.493698 0.351392 0.798991 / 0.65); outline-offset: 2px → -1px; background-color: oklab(0.216114 0.00343135 0.00508514 / 0.12) → color(srgb 0.945064 0.930072 0.958664); background-image: linear-gradient(color(srgb 0.20397 0.148263 0.0829736 / 0... → none; box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, color(srg... → none; border-top-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0); border-right-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0); border-bottom-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0); border-left-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0)
  [unmigrated] preset-verbatim focus content ink · rgb(28, 25, 23) 400 / rgb(112, 89, 66) 600 → rgb(28, 25, 23) 400 / rgb(112, 89, 66) 500
  [unmigrated] preset-verbatim vs its stripped twin · hover · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px; outline-style: none → dashed; outline-width: 3px → 1px; outline-color: rgb(112, 89, 66) → color(srgb 0.493698 0.351392 0.798991 / 0.35); outline-offset: 0px → -1px; background-color: rgba(0, 0, 0, 0) → color(srgb 0.954877 0.942652 0.962136); background-image: linear-gradient(color(srgb 0.109804 0.0980391 0.090196 / ... → none; border-top-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0); border-right-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0); border-bottom-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0); border-left-color: color(srgb 0.109804 0.0980392 0.0901961 / 0.14) → rgba(0, 0, 0, 0)
  [unmigrated] specimen-verbatim vs its stripped twin · rest · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px
  [unmigrated] specimen-verbatim vs its stripped twin · on · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px; outline-style: none → solid; outline-width: 3px → 1px; outline-color: oklch(0.216114 0.00613456 55.9893) → rgb(28, 25, 23); outline-offset: 0px → -1px; background-color: oklab(0.216114 0.00343135 0.00508514 / 0.12) → rgba(0, 0, 0, 0)
  [unmigrated] specimen-verbatim on content ink · oklch(0.216114 0.00613456 55.9893) 600 / rgb(112, 89, 66) 600 → oklch(0.216114 0.00613456 55.9893) 600 / rgb(28, 25, 23) 600
  [unmigrated] specimen-verbatim vs its stripped twin · focus · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px; outline-width: 2px → 1px; outline-color: oklab(0.216114 0.00343135 0.00508514 / 0.48) → rgb(28, 25, 23); outline-offset: 2px → -1px; background-color: oklab(0.216114 0.00343135 0.00508514 / 0.12) → rgba(0, 0, 0, 0)
  [unmigrated] specimen-verbatim focus content ink · oklch(0.216114 0.00613456 55.9893) 600 / rgb(112, 89, 66) 600 → oklch(0.216114 0.00613456 55.9893) 600 / rgb(28, 25, 23) 600
  [unmigrated] specimen-verbatim vs its stripped twin · hover · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px
  [unmigrated] specimen-verbatim hover content ink · rgb(112, 89, 66) 500 / rgb(112, 89, 66) 500 → rgb(112, 89, 66) 500 / rgb(28, 25, 23) 500
  [unmigrated] strip-verbatim on content ink · rgb(91, 70, 51) 400 / rgb(91, 70, 51) 400 → rgb(91, 70, 51) 400 / rgb(28, 25, 23) 600
  [unmigrated] strip-verbatim hover content ink · rgb(91, 70, 51) 400 / rgb(91, 70, 51) 400 → rgb(91, 70, 51) 400 / rgb(28, 25, 23) 400
  [unmigrated] f1-verbatim vs its stripped twin · rest · background-color: oklab(0.673443 0.0210928 0.0746619 / 0.244) → rgb(253, 245, 236); border-top-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-right-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-bottom-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-left-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23)
  [unmigrated] f1-verbatim vs its stripped twin · on · background-color: oklab(0.673443 0.0210928 0.0746619 / 0.244) → rgb(253, 245, 236); box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, color(srg... → color(srgb 0.844106 0.201539 0.216977 / 0.15) 0px 0px 0px...; border-top-color: rgba(0, 0, 0, 0) → oklch(0.58 0.2 25); border-right-color: rgba(0, 0, 0, 0) → oklch(0.58 0.2 25); border-bottom-color: rgba(0, 0, 0, 0) → oklch(0.58 0.2 25); border-left-color: rgba(0, 0, 0, 0) → oklch(0.58 0.2 25)
  [unmigrated] f1-verbatim on content ink · rgb(28, 25, 23) 500 / rgb(91, 70, 51) 500 → rgb(28, 25, 23) 500 / oklch(0.58 0.2 25) 600
  [unmigrated] f1-verbatim vs its stripped twin · focus · background-color: oklab(0.673443 0.0210928 0.0746619 / 0.244) → rgb(253, 245, 236); border-top-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-right-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-bottom-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-left-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23)
  [unmigrated] f1-verbatim vs its stripped twin · hover · background-color: oklab(0.673443 0.0210928 0.0746619 / 0.244) → rgb(253, 245, 236); border-top-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-right-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-bottom-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-left-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23)
  [unmigrated] v2-verbatim vs its stripped twin · rest · border-top-left-radius: 0px → 16px; border-top-right-radius: 0px → 16px; border-bottom-right-radius: 0px → 16px; border-bottom-left-radius: 0px → 16px
  [unmigrated] v2-verbatim vs its stripped twin · on · border-top-left-radius: 0px → 16px; border-top-right-radius: 0px → 16px; border-bottom-right-radius: 0px → 16px; border-bottom-left-radius: 0px → 16px; box-shadow: none → rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0p...
  [unmigrated] v2-verbatim vs its stripped twin · focus · border-top-left-radius: 0px → 16px; border-top-right-radius: 0px → 16px; border-bottom-right-radius: 0px → 16px; border-bottom-left-radius: 0px → 16px; outline-style: auto → none; box-shadow: none → rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0p...
  [unmigrated] v2-verbatim vs its stripped twin · hover · border-top-left-radius: 0px → 16px; border-top-right-radius: 0px → 16px; border-bottom-right-radius: 0px → 16px; border-bottom-left-radius: 0px → 16px
  [unmigrated] c1-verbatim vs its stripped twin · rest · border-top-left-radius: 0px → 6px; border-top-right-radius: 0px → 6px; border-bottom-right-radius: 0px → 6px; border-bottom-left-radius: 0px → 6px
  [unmigrated] c1-verbatim vs its stripped twin · on · border-top-left-radius: 0px → 6px; border-top-right-radius: 0px → 6px; border-bottom-right-radius: 0px → 6px; border-bottom-left-radius: 0px → 6px; background-color: rgba(0, 0, 0, 0) → rgb(246, 243, 239)
  [unmigrated] c1-verbatim vs its stripped twin · focus · border-top-left-radius: 0px → 6px; border-top-right-radius: 0px → 6px; border-bottom-right-radius: 0px → 6px; border-bottom-left-radius: 0px → 6px; outline-style: auto → solid; outline-width: 1px → 2px; outline-color: rgb(0, 95, 204) → oklab(0.216114 0.00343135 0.00508514 / 0.48); outline-offset: 0px → 2px
  [unmigrated] c1-verbatim vs its stripped twin · hover · border-top-left-radius: 0px → 6px; border-top-right-radius: 0px → 6px; border-bottom-right-radius: 0px → 6px; border-bottom-left-radius: 0px → 6px; background-color: rgba(0, 0, 0, 0) → rgb(246, 243, 239)

T-7 · Playwright WebKit 26.5
  [unmigrated] preset-verbatim vs its stripped twin · rest · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px; outline-style: none → dashed; outline-width: 3px → 1px; outline-color: rgb(112, 89, 66) → rgba(0, 0, 0, 0); outline-offset: 0px → -1px; background-color: rgba(0, 0, 0, 0) → rgb(251, 250, 248); border-top-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0); border-right-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0); border-bottom-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0); border-left-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0)
  [unmigrated] preset-verbatim vs its stripped twin · on · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px; outline-style: none → dashed; outline-width: 3px → 1px; outline-color: oklch(0.216115 0.006126 56.043385) → color(srgb 0.493741 0.35136 0.798941 / 0.65); outline-offset: 0px → -1px; background-color: oklab(0.216115 0.003422 0.005081 / 0.12) → color(srgb 0.945068 0.93007 0.95866); background-image: linear-gradient(color(srgb 0.203993 0.148252 0.08296 / 0.... → none; box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, color(srg... → none; border-top-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0); border-right-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0); border-bottom-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0); border-left-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0)
  [unmigrated] preset-verbatim on content ink · rgb(28, 25, 23) 400 / rgb(112, 89, 66) 600 → rgb(28, 25, 23) 400 / rgb(112, 89, 66) 500
  [unmigrated] preset-verbatim vs its stripped twin · focus · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px; outline-style: solid → dashed; outline-width: 2px → 1px; outline-color: oklab(0.216115 0.003422 0.005081 / 0.48) → color(srgb 0.493741 0.35136 0.798941 / 0.65); outline-offset: 2px → -1px; background-color: oklab(0.216115 0.003422 0.005081 / 0.12) → color(srgb 0.945068 0.93007 0.95866); background-image: linear-gradient(color(srgb 0.203993 0.148252 0.08296 / 0.... → none; box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, color(srg... → none; border-top-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0); border-right-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0); border-bottom-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0); border-left-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0)
  [unmigrated] preset-verbatim focus content ink · rgb(28, 25, 23) 400 / rgb(112, 89, 66) 600 → rgb(28, 25, 23) 400 / rgb(112, 89, 66) 500
  [unmigrated] preset-verbatim vs its stripped twin · hover · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px; outline-style: none → dashed; outline-width: 3px → 1px; outline-color: rgb(112, 89, 66) → color(srgb 0.493741 0.35136 0.798941 / 0.35); outline-offset: 0px → -1px; background-color: rgba(0, 0, 0, 0) → color(srgb 0.954879 0.94265 0.962133); background-image: linear-gradient(color(srgb 0.109804 0.098039 0.090196 / 0... → none; border-top-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0); border-right-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0); border-bottom-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0); border-left-color: color(srgb 0.109804 0.098039 0.090196 / 0.14) → rgba(0, 0, 0, 0)
  [unmigrated] specimen-verbatim vs its stripped twin · rest · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px
  [unmigrated] specimen-verbatim vs its stripped twin · on · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px; outline-style: none → solid; outline-width: 3px → 1.5px; outline-color: oklch(0.216115 0.006126 56.043385) → rgb(28, 25, 23); outline-offset: 0px → -1.5px; background-color: oklab(0.216115 0.003422 0.005081 / 0.12) → rgba(0, 0, 0, 0)
  [unmigrated] specimen-verbatim on content ink · oklch(0.216115 0.006126 56.043385) 600 / rgb(112, 89, 66) 600 → oklch(0.216115 0.006126 56.043385) 600 / rgb(28, 25, 23) 600
  [unmigrated] specimen-verbatim vs its stripped twin · focus · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px; outline-width: 2px → 1.5px; outline-color: oklab(0.216115 0.003422 0.005081 / 0.48) → rgb(28, 25, 23); outline-offset: 2px → -1.5px; background-color: oklab(0.216115 0.003422 0.005081 / 0.12) → rgba(0, 0, 0, 0)
  [unmigrated] specimen-verbatim focus content ink · oklch(0.216115 0.006126 56.043385) 600 / rgb(112, 89, 66) 600 → oklch(0.216115 0.006126 56.043385) 600 / rgb(28, 25, 23) 600
  [unmigrated] specimen-verbatim vs its stripped twin · hover · border-top-left-radius: 9999px → 16px; border-top-right-radius: 9999px → 16px; border-bottom-right-radius: 9999px → 16px; border-bottom-left-radius: 9999px → 16px
  [unmigrated] specimen-verbatim hover content ink · rgb(112, 89, 66) 500 / rgb(112, 89, 66) 500 → rgb(112, 89, 66) 500 / rgb(28, 25, 23) 500
  [unmigrated] strip-verbatim on content ink · rgb(91, 70, 51) 400 / rgb(91, 70, 51) 400 → rgb(91, 70, 51) 400 / rgb(28, 25, 23) 600
  [unmigrated] strip-verbatim hover content ink · rgb(91, 70, 51) 400 / rgb(91, 70, 51) 400 → rgb(91, 70, 51) 400 / rgb(28, 25, 23) 400
  [unmigrated] f1-verbatim vs its stripped twin · rest · background-color: oklab(0.673443 0.021093 0.074662 / 0.244) → rgb(253, 245, 236); border-top-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-right-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-bottom-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-left-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23)
  [unmigrated] f1-verbatim vs its stripped twin · on · background-color: oklab(0.673443 0.021093 0.074662 / 0.244) → rgb(253, 245, 236); box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, color(srg... → color(srgb 0.844149 0.201489 0.216932 / 0.15) 0px 0px 0px...; border-top-color: rgba(0, 0, 0, 0) → oklch(0.58 0.2 25); border-right-color: rgba(0, 0, 0, 0) → oklch(0.58 0.2 25); border-bottom-color: rgba(0, 0, 0, 0) → oklch(0.58 0.2 25); border-left-color: rgba(0, 0, 0, 0) → oklch(0.58 0.2 25)
  [unmigrated] f1-verbatim on content ink · rgb(28, 25, 23) 500 / rgb(91, 70, 51) 500 → rgb(28, 25, 23) 500 / oklch(0.58 0.2 25) 600
  [unmigrated] f1-verbatim vs its stripped twin · focus · background-color: oklab(0.673443 0.021093 0.074662 / 0.244) → rgb(253, 245, 236); border-top-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-right-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-bottom-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-left-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23)
  [unmigrated] f1-verbatim vs its stripped twin · hover · background-color: oklab(0.673443 0.021093 0.074662 / 0.244) → rgb(253, 245, 236); border-top-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-right-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-bottom-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23); border-left-color: rgba(0, 0, 0, 0) → rgb(28, 25, 23)
  [unmigrated] v2-verbatim vs its stripped twin · rest · border-top-left-radius: 0px → 16px; border-top-right-radius: 0px → 16px; border-bottom-right-radius: 0px → 16px; border-bottom-left-radius: 0px → 16px
  [unmigrated] v2-verbatim vs its stripped twin · on · border-top-left-radius: 0px → 16px; border-top-right-radius: 0px → 16px; border-bottom-right-radius: 0px → 16px; border-bottom-left-radius: 0px → 16px; box-shadow: none → rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0p...
  [unmigrated] v2-verbatim vs its stripped twin · focus · border-top-left-radius: 0px → 16px; border-top-right-radius: 0px → 16px; border-bottom-right-radius: 0px → 16px; border-bottom-left-radius: 0px → 16px; outline-style: auto → none; box-shadow: none → rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0p...
  [unmigrated] v2-verbatim vs its stripped twin · hover · border-top-left-radius: 0px → 16px; border-top-right-radius: 0px → 16px; border-bottom-right-radius: 0px → 16px; border-bottom-left-radius: 0px → 16px
  [unmigrated] c1-verbatim vs its stripped twin · rest · border-top-left-radius: 0px → 6px; border-top-right-radius: 0px → 6px; border-bottom-right-radius: 0px → 6px; border-bottom-left-radius: 0px → 6px
  [unmigrated] c1-verbatim vs its stripped twin · on · border-top-left-radius: 0px → 6px; border-top-right-radius: 0px → 6px; border-bottom-right-radius: 0px → 6px; border-bottom-left-radius: 0px → 6px; background-color: rgba(0, 0, 0, 0) → rgb(246, 243, 239)
  [unmigrated] c1-verbatim vs its stripped twin · focus · border-top-left-radius: 0px → 6px; border-top-right-radius: 0px → 6px; border-bottom-right-radius: 0px → 6px; border-bottom-left-radius: 0px → 6px; outline-style: auto → solid; outline-width: 3px → 2px; outline-color: rgb(28, 25, 23) → oklab(0.216115 0.003422 0.005081 / 0.48); outline-offset: 0px → 2px
  [unmigrated] c1-verbatim vs its stripped twin · hover · border-top-left-radius: 0px → 6px; border-top-right-radius: 0px → 6px; border-bottom-right-radius: 0px → 6px; border-bottom-left-radius: 0px → 6px; background-color: rgba(0, 0, 0, 0) → rgb(246, 243, 239)

T-8 · Chromium 149.0.7827.55 + Playwright WebKit 26.5
  Chromium T-3 preset light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.20:1; p95 1.20; items 1/0 204×40
  Chromium T-3 preset dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.23:1; p95 1.28; items 1/0 204×40
  Chromium T-3 preset prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  Chromium T-3 specimen light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.19:1; p95 1.19; items 1/0 207×36
  Chromium T-3 specimen dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.22:1; p95 1.29; items 1/0 207×36
  Chromium T-3 specimen prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.00:1; p95 1.00; items 1/0 207×36
  Playwright WebKit T-3 preset light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.21:1; p95 1.23; items 1/0 204×40
  Playwright WebKit T-3 preset dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.20:1; p95 1.27; items 1/0 204×40
  Playwright WebKit T-3 preset prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  Playwright WebKit T-3 specimen light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.21:1; p95 1.22; items 1/0 207×36
  Playwright WebKit T-3 specimen dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.20:1; p95 1.26; items 1/0 207×36
  Playwright WebKit T-3 specimen prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.00:1; p95 1.00; items 1/0 207×36

W-A · Chromium 149.0.7827.55
  wrap light Chip pill · 53.91×33.41 9999px→16.70 (÷h/2 1.00) | 110.00×76.22 9999px→38.11 (÷h/2 1.00) | 110.00×119.03 9999px→55.00 (÷h/2 0.92) · one line at h/2 true, unchanged by lines false (Δ 38.30 px)
  wrap light coarse Chip pill · 53.91×44.00 9999px→22.00 (÷h/2 1.00) | 110.00×76.22 9999px→38.11 (÷h/2 1.00) | 110.00×119.03 9999px→55.00 (÷h/2 0.92) · one line at h/2 true, unchanged by lines false (Δ 33.00 px)
  wrap light coarse Button · 110.00×44.00 30px→22.00 (÷h/2 1.00) | 110.00×102.94 30px→30.00 (÷h/2 0.58) | 110.00×178.64 30px→30.00 (÷h/2 0.34) · one line at h/2 true, unchanged by lines false (Δ 8.00 px)
  wrap light --ui-scale 1.25 Chip pill · 53.91×33.41 9999px→16.70 (÷h/2 1.00) | 110.00×76.22 9999px→38.11 (÷h/2 1.00) | 110.00×119.03 9999px→55.00 (÷h/2 0.92) · one line at h/2 true, unchanged by lines false (Δ 38.30 px)

W-A · Playwright WebKit 26.5
  wrap light Chip pill · 53.91×33.41 9999px→16.70 (÷h/2 1.00) | 110.00×76.22 9999px→38.11 (÷h/2 1.00) | 110.00×119.03 9999px→55.00 (÷h/2 0.92) · one line at h/2 true, unchanged by lines false (Δ 38.30 px)
  wrap light coarse Chip pill · 53.91×44.00 9999px→22.00 (÷h/2 1.00) | 110.00×76.22 9999px→38.11 (÷h/2 1.00) | 110.00×119.03 9999px→55.00 (÷h/2 0.92) · one line at h/2 true, unchanged by lines false (Δ 33.00 px)
  wrap light coarse Button · 110.00×44.00 30px→22.00 (÷h/2 1.00) | 110.00×102.88 30px→30.00 (÷h/2 0.58) | 110.00×178.53 30px→30.00 (÷h/2 0.34) · one line at h/2 true, unchanged by lines false (Δ 8.00 px)
  wrap light --ui-scale 1.25 Chip pill · 53.91×33.41 9999px→16.70 (÷h/2 1.00) | 110.00×76.22 9999px→38.11 (÷h/2 1.00) | 110.00×119.03 9999px→55.00 (÷h/2 0.92) · one line at h/2 true, unchanged by lines false (Δ 38.30 px)

W-B · Chromium 149.0.7827.55
  exports · RED by absence: no ChoiceGroup/ChoiceCard in the bundle (exports seen: [none])
  preset · 0 multi-line items · slots [] · roles [] (CDP AX tree) · used corner  · tab stops 1
  specimen · 8 multi-line items · slots [toggle-group-item] · roles [radio] (CDP AX tree) · used corner 18.00 · tab stops 1
  strip · 6 multi-line items · slots [] · roles [button] (CDP AX tree) · used corner 22.00 · tab stops 6
  strip arrows row ArrowRight from #0 · focus 0 → 0 · moved false · checked true
  strip arrows row ArrowLeft from #1 · focus 1 → 1 · moved false · checked true
  strip arrows row ArrowDown from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true
  strip arrows row ArrowUp from #5 (linear step, Q-4 b) · focus 5 → 5 · moved false · checked true
  contract T-3 preset light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.20:1; p95 1.20; items 1/0 204×40
  contract T-3 preset dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.23:1; p95 1.28; items 1/0 204×40
  contract T-3 preset prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.00; items 1/0 204×40
  contract T-3 specimen light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.19:1; p95 1.19; items 1/0 207×36
  contract T-3 specimen dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.22:1; p95 1.29; items 1/0 207×36
  contract T-3 specimen prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.00:1; p95 1.00; items 1/0 207×36
  contract T-3 strip light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.49:1; p95 1.50; items 1/0 44×44
  contract T-3 strip prt · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.13:1; p95 1.13; items 1/0 44×44

W-B · Playwright WebKit 26.5
  exports · RED by absence: no ChoiceGroup/ChoiceCard in the bundle (exports seen: [none])
  preset · 0 multi-line items · slots [] · roles [] (Playwright aria snapshot + DOM states) · used corner  · tab stops 1
  specimen · 8 multi-line items · slots [toggle-group-item] · roles [radio] (Playwright aria snapshot + DOM states) · used corner 18.00 · tab stops 1
  strip · 6 multi-line items · slots [] · roles [button] (Playwright aria snapshot + DOM states) · used corner 22.00 · tab stops 6
  strip arrows row ArrowRight from #0 · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  strip arrows row ArrowLeft from #1 · focus 1 → 1 · moved false · checked true (started by focus + Space: PF-1)
  strip arrows row ArrowDown from #0 (linear step, Q-4 b) · focus 0 → 0 · moved false · checked true (started by focus + Space: PF-1)
  strip arrows row ArrowUp from #5 (linear step, Q-4 b) · focus 5 → 5 · moved false · checked true (started by focus + Space: PF-1)
  contract T-3 preset light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.21:1; p95 1.22; items 1/0 204×40
  contract T-3 preset dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.20:1; p95 1.27; items 1/0 204×40
  contract T-3 preset prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 244.00 px²; fill 1.00:1; p95 1.01; items 1/0 204×40
  contract T-3 specimen light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.21:1; p95 1.22; items 1/0 207×36
  contract T-3 specimen dark · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.20:1; p95 1.26; items 1/0 207×36
  contract T-3 specimen prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 243.00 px²; fill 1.00:1; p95 1.00; items 1/0 207×36
  contract T-3 strip light · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.49:1; p95 1.49; items 1/0 44×44
  contract T-3 strip prt (forced level-0 path) · carrier ≥3:1 area 0.00 px² (perimeter band 0.00, interior 0.00) vs the bar 88.00 px²; fill 1.13:1; p95 1.13; items 1/0 44×44

W-C · Chromium 149.0.7827.55
  exports · RED by absence: no SelectionGroup/SelectionItem in the bundle (exports seen: [none])
  card · group listbox · items generic (CDP AX tree) · tab stops 0
  card stamp values at rest (role/aria-checked/tabindex, * = group-stamped; selected #-1) · null/null/null null/null/null null/null/null null/null/null
  card grid ArrowRight from #0 · focus body → body · moved false · checked false (the click did not focus; focus placed by script)
  card grid ArrowLeft from #1 · focus body → body · moved false · checked false (the click did not focus; focus placed by script)
  card grid ArrowDown from #0 · focus body → body · moved false · checked false (the click did not focus; focus placed by script)
  card grid ArrowUp from #2 · focus body → body · moved false · checked false (the click did not focus; focus placed by script)
  card stamp values after the arrow commits (selected #-1) · null/null/null null/null/null null/null/null null/null/null

W-C · Playwright WebKit 26.5
  exports · RED by absence: no SelectionGroup/SelectionItem in the bundle (exports seen: [none])
  card · group listbox · items heading (Playwright aria snapshot + DOM states) · tab stops 0
  card stamp values at rest (role/aria-checked/tabindex, * = group-stamped; selected #-1) · null/null/null null/null/null null/null/null null/null/null
  card grid ArrowRight from #0 · focus body → body · moved false · checked false (started by focus + Space: PF-1)
  card grid ArrowLeft from #1 · focus body → body · moved false · checked false (started by focus + Space: PF-1)
  card grid ArrowDown from #0 · focus body → body · moved false · checked false (started by focus + Space: PF-1)
  card grid ArrowUp from #2 · focus body → body · moved false · checked false (started by focus + Space: PF-1)
  card stamp values after the arrow commits (selected #-1) · null/null/null null/null/null null/null/null null/null/null

W-E · Chromium 149.0.7827.55
  specimen · 8 items · 8 not one line · e.g. 36.00 px tall at rung 36.00 (1.00 rungs), 3 rows
  strip · 6 items · 6 not one line · e.g. 44.00 px tall at rung 44.00 (1.00 rungs), 2 rows

W-E · Playwright WebKit 26.5
  specimen · 8 items · 8 not one line · e.g. 36.00 px tall at rung 36.00 (1.00 rungs), 3 rows
  strip · 6 items · 6 not one line · e.g. 44.00 px tall at rung 44.00 (1.00 rungs), 2 rows
