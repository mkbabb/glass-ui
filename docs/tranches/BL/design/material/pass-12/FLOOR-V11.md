# D3 · pass 12 · floor v11: R-32's dark arm, built, and its static half (P11-6.3 step 3)

| field | value |
|---|---|
| seat | D3 pass 12, FLOOR-V11 BUILD. It builds `floor-v11.patch` = `floor-v11a.patch` + R-32 in the dark arm only, and runs the static half: `git apply --check`, DEL, the list under R-34's scope with H11-2's print read under R-26 and R-36, LAW, the census, HOV, the ladder `diff`, the light-byte identity proof and the toolchain. **No browser battery** (the next seat runs it) |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | **HEAD of master at launch, `fec67aff7`** (the H12 bank, docs only): `git diff --stat 1da7eb17b HEAD -- src demo tests …` prints nothing (`setup.log`, `check.log`), so every tree is the published 10.1.0 source plus the named patch. **`release/10.1.1` is NOT merged during pass 12** (P11-5: the merge waits until this pass's floor seat banks) |
| rulings read | `audit/INBOUND.md`, checked at start and at close: the last row is still **O-103a** (Q-14's dark arm reopened as "dim by OKLCH lightness, keep chroma"; the light arm stands). O-102b and O-103 stand. `FORMATION-PROGRESS.md` at close: its newest lines are the owed-cells bank, the 10.1.1 critic-1 bank and the H12 bank. None is a ruling, and no `guarded` refusal fired |
| driver | `FV11-run.sh` (this directory), every phase launched as `~/.claude/guard/guarded [--light] [--timeout N] -- bash FV11-run.sh <phase>`. Static phases ran `--light`; `same` (`--timeout 30`) and `toolchain` (`--timeout 60`) ran heavy, one at a time. Tools: `FV11-model.py` (the paint model the arm was chosen with), `FV11-lightproof.py` (the light-byte proof), `FV11-rekey.py` (the carried rulings, re-keyed by measured offset). Records in `FV11-records/` |
| engines | **No browser of this seat's own.** The only browser was the headless shell that vitest's unit suite launches inside `toolchain`, run heavy. No WebKit lock was taken. Every Playwright WebKit number below is a **model prediction** for the next seat to measure. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| fences | No source edit and no git write in the checkout. The build ran only in `.claude/worktrees/bl/D3/p12/floor11/wt` (cut at HEAD, `node_modules` symlinked, `D3_OUT` and every vite cacheDir inside it). It was removed with `--force` and pruned, and `…/D3/p12/` is gone (`teardown.log`: 0 worktrees naming `D3/p12/floor11`). The checkout's only writes are this directory's files |

Short citations: `REG` = `REGISTRY.md` (`P11-n` its pass-11 part), `H12` = `pass-12/H12.md`, `OWED` = `pass-12/OWED.md`. `rec/x` = `FV11-records/x`.

---

## 0 · In brief

- **Built.** `floor-v11.patch` (89 files, sha1 **`8f838dcf`**) = `floor-v11a.patch` (`08c13d4e`, 88 files) + `FV11-r32.diff` (4 files, +43/−20, sha1 **`a02de136`**). `floor-v11a.patch + FV11-r32.diff = floor-v11.patch` byte for byte (`cmp`, `patch.log`). **`git apply --check` exits 0 at HEAD**, in the worktree and read-only in the checkout (`check.log`). The one new path is `src/styles/glass/focus-veil.css`.
- **The arm.** R-2's dark `--glass-focus-veil-dim` (black at 40 %, a flat mix) becomes `transparent`. The veil's one filter chain now ends in a token, `--glass-focus-veil-tone`. In light it is `saturate(var(--glass-saturate))`, the chain's old bytes. In dark it is `saturate(var(--glass-saturate)) contrast(1.03) brightness(0.8)`. The arm adds no layer, no second blur and no glow, and the census reads 0. §2 gives the reasoning.
- **Light bytes stand.** In the built specimen CSS exactly **5 declarations** differ: 2 dark, the chain pair, and the one new light tone. Resolved against the built tokens, the light veil's `backdrop-filter`, `-webkit-backdrop-filter` and `background` are **identical** on floor v11a and floor v11 (`blur(18px) saturate(1.5)`, `color-mix(in oklab, #1c1917 10%, transparent)`). After hash-name normalisation the only output file whose content moves is the specimen CSS, in both dist and dist-demo (§3).
- **Predicted paint** (the model, calibrated on R-2's measured pairs to ≤ 0.0024 in L; §2.2). **Chromium:**
  - the shell spot `#ec9642 → #cc730c`: |Δh| 1.8°, C ×1.041, ΔL −0.105;
  - frame 1's GL spot `#e87237 → #cc5209`: |Δh| 1.3°, C ×1.044, ΔL −0.090;
  - the dark page `#0b0a09 → #060504`: ΔL −0.0295, so M-9's ≤ −0.02 holds.

  R-32 (i)-(iii) are predicted to PASS. R-2 read ΔL −0.226 / −0.200 and C ×0.830 / 0.827 on the same grounds.
- **A finding the next seats must have: Playwright WebKit cannot read this arm, and no arm the rulings allow could pass R-32 there.** Headless Playwright WebKit paints no `backdrop-filter` (HARNESS.md:133, `lib.mjs:112`). R-2's own WebKit pair is exactly ×0.6 per encoded channel (`#e87237 → #8b4421`), its background alone. A flat background composited source-over pulls every pixel toward one colour, so no background-only arm keeps the spot's chroma while dimming the page by 0.02 (§2.3). On this arm the WebKit cells are predicted to read **no dim**: (i) and (ii) PASS trivially, but (iii) FAILs on the spot and the page, and so does M-9's WebKit dark-veil row. That is an engine fact, not a defect of the arm. Placing it is the agglomerate's or the owner's call (§7). This seat rules nothing.
- **Static, all green:**
  - DEL **PASS 101** under floor v11's own declaration and under floor v10's; the absent root exits 2; the HEAD bite FAILs 89/101.
  - LAW **PASS 91**; census `stacked=0 halo=0 blur=0 open=0` (HEAD `2/2/5/9`); HOV **PASS 58**; LIT the 19 inherited, unchanged from floor v11a.
  - The ladder `diff` from floor v11a to floor v11 prints nothing.
- **The list, under R-34.**
  - The frozen list is still 207 lines. None of R-32's 43 written lines carries a frozen word.
  - Under `FV11-rulings.json` floor v11 reads **PASS (207: 197 true, 10 reported)**, floor v11a's tally exactly. That file is the carried `crit-fv10-rulings.json` with the 16 rulings R-32 moved (glass.css +6, dark-arm.css +7) re-keyed by measured offset.
  - Its plant, floor v11a under the same file, FAILs 16 unread and 16 stale.
  - R-32's own 43 lines and H11-2's 95-line print were read line by line (§4). **Three lines this build wrote were false or overstated when first drafted, and are fixed in this build:** `focus-veil.css:16` ("the five values become the cohort"), `glass.css:83` ("the dark focus veil's `-tone` below dims") and `glass.css:110` (a wrong "so").
- **Toolchain, green on the first run:**
  - `vue-tsc` app 0, library build 0, `vue-tsc` tests 0, dist-demo 0 (built before vitest).
  - vitest `--maxWorkers=2`: **237/237 files, 2318 passed, 10 expected fail, 1 skipped (2329)**, OWED's count exactly. `focus-veil.test.ts` 19/19.
  - Its plant (floor v11's test on floor v11a's R-2 bytes) FAILs exactly the 2 rewritten assertions, 17 pass.
  - No red, so no re-run was owed.

---

## 1 · The build

### 1.1 · The hunks (`FV11-r32.diff`, over floor v11a)

| file | lines (floor v11) | what |
|---|---|---|
| `src/styles/tokens/dark-arm.css` | 289-301 | R-2's comment and declaration replaced: `--glass-focus-veil-dim: transparent;` and `--glass-focus-veil-tone: saturate(var(--glass-saturate)) contrast(1.03) brightness(0.8);`, with the comment saying why and what is predicted |
| `src/styles/glass/focus-veil.css` | 75-76 | the one chain: `blur(var(--glass-focus-veil-blur)) saturate(var(--glass-saturate))` → `blur(var(--glass-focus-veil-blur)) var(--glass-focus-veil-tone)` |
| `src/styles/glass/focus-veil.css` | 16-18, 44-49 | the header's two sentences that named the chain or the cohort's count, rewritten to stay true |
| `src/styles/tokens/glass.css` | 121 | the light `--glass-focus-veil-tone: saturate(var(--glass-saturate));` (the chain's old term, moved into the cohort) |
| `src/styles/tokens/glass.css` | 83-84, 110-115 | the rung-recipe note names the veil's tone; `-dim`'s dark sentence follows the arm; the `-tone` entry |
| `tests/styles/focus-veil.test.ts` | 107, 137, 149-151, 156-163 | the cohort test asserts the light tone and the chain; the dark test asserts `-dim: transparent` and the dark tone. Nothing else in the file moved |

Nothing else changes. The minor does not carry R-2 (P11-3.1) and is untouched.

### 1.2 · Composition and checks (`patch.log`, `check.log`, 20:34:47-20:34:55, load 18.4 → 17.6)

- The worktree held floor v11a (`cmp` against `floor-v11a.patch`). R-32 was written in place, and `floor-v11.patch` was cut as `git diff HEAD --binary`. The delta was cut from the four files' copies with `git diff --no-index`, then re-applied over floor v11a and `cmp`'d against `floor-v11.patch`, which is equal.
- `git apply --check floor-v11.patch` at `fec67aff7` exits 0, both in the worktree and read-only in the checkout. `git apply --check FV11-r32.diff` on floor v11a exits 0.
- The one warning is the trailing whitespace at `floor-v11.patch:1266` ("white app surface (the canonical G2 case …)"). It is inherited from floor v10 (OWED §1.1) and is not this build's. It goes to the landing docs pass.

---

## 2 · The arm's expression, and why

### 2.1 · Why a filter expression, and not relative colour

- **Relative colour syntax** (`oklch(from … l c h)`) transforms a colour the CSS already holds. It never reads the backdrop's pixels. A veil is a single `background` colour over a `backdrop-filter`, so a relative colour can only change the one colour composited over everything, and a flat colour cannot keep chroma (§2.3).
- **Filter functions** are the only per-pixel colour path the target engines paint natively on a backdrop. Chromium and Safari paint every CSS filter function inside `backdrop-filter`. Filter Effects 1 defines `saturate()`, `contrast()` and `brightness()` as matrices and transfers on **encoded sRGB**, clipped after each function. No engine paints a per-pixel OKLCH transform. So the arm is the encoded-sRGB chain that, on the measured grounds, lowers OKLCH L while holding C and h. The battery measures R-32's gates in OKLCH (H12-1).
- **The model is the spec's maths, calibrated** (`FV11-model.py`, `rec/model.log`). It runs R-2 (`saturate(1.5)`, then 40 % black source-over in encoded sRGB). It reproduces Chromium's measured spot `#ec9642 → #99560a` within one 8-bit step (ΔL 0.0000) and the page within ΔL 0.0024. It reproduces Playwright WebKit's spot and page exactly when the chain is left out (`#e87237 → #8b4421`, `#0b0a09 → #070605`). That last match is what shows Playwright WebKit paints the background alone.

### 2.2 · Why this chain and these two values

The arm has three things to hold at once in Chromium: R-32's (i) |Δh| ≤ 3° and (ii) C ≥ 0.95 × raw on the spot, and M-9's row-12 floor (the dark page dims by at least 0.02 in L, which the full battery must keep).

- **A pure scale cannot do it**, before or after `saturate()`. `brightness(K)` after the saturate is the same maths as a black mix at 1 − K. R-2 is exactly `saturate(1.5)` then ×0.6. A scale that dims the page by 0.02 (K ≈ 0.63) leaves the spot about 0.87 of its chroma. A scale that keeps the spot's chroma (K ≥ 0.75) dims the page only −0.0145 (`model.log`, search 2, the `c 1.00` rows). With brightness before saturate, the saturate clips the spot's blue at 0 and turns the hue 4-19° (search 1: no row passes). This is Reg10 P5-0 finding 4 in numbers: no uniform multiplicative dim is ground-relative.
- **`contrast(c)` then `brightness(K)` is a levels map**: slope K·c, intercept K·0.5·(1 − c). With c a little above 1 it lowers the darkest values most, since contrast's own shift is 0.03 × (0.5 − v) at c 1.03, largest at v = 0. It keeps the spread between channels, which carries the chroma, and `brightness` sets the spot's depth. The medium's `saturate(var(--glass-saturate))` stays first and unchanged. It is the one mode-invariant chroma term (`glass.css:71-75`), so the arm adds no second saturate.
- **The values.** In search 2, 11 of 30 (c, K) pairs pass every gate with margin on both Chromium grounds: |Δh| ≤ 3, C× ≥ 0.95, and the page ≤ −0.024 (M-9's 0.02 plus the calibration's 0.0024). Among them **c 1.03, K 0.80**:
  - takes the spot about half of R-2's depth (ΔL −0.105 / −0.090 against −0.226 / −0.200). That is O-103a's "quieter, not brown": the spot stays a saturated orange (`#cc730c`, `#cc5209`).
  - keeps chroma at ×1.04, inside the medium's own saturate, as the light veil does.
  - dims the page −0.0295, which is R-2's −0.022/−0.025 with a 0.0095 margin over M-9.

  A larger c crushes near-black (c 1.10 takes the page to `#000000`). K 0.75 nears H12 §2.3's gamut wall (keeping C whole allows ΔL −0.133 / −0.114).

  The spot's ΔL stays reported, never gated (R-32), and the owner's eye decides it on F-1.
- **Off the spot, model only, reported** (`model.log`, last block). Other hues the aurora can carry hold |Δh| 0.8-5.0° and C ×0.90-1.27 (violet `#8a5cf6` 5.0°, 0.934; blue `#3b82f6` 4.3°, 0.900; teal 3.6°, 0.996). The drift there comes from the medium's existing `saturate(1.5)` clipping, which every rung and the light veil already carry. R-32 gates the spot only, so this is a reading for the critic's eye.

### 2.3 · Playwright WebKit: why no arm can pass R-32 there, and what this one will read

- Playwright WebKit (headless) paints no `backdrop-filter`, neither the blur nor the saturate (HARNESS.md:133; `lib.mjs:112`'s engine label "paint-only: headless paints no backdrop-filter"). R-2's pairs show it: `#e87237 → #8b4421` is (232, 114, 55) × 0.6 to the unit, and the page `#0b0a09 → #070605` likewise.
- What that engine composites is the veil's flat `background`. A flat colour X at α over a pixel P gives (1 − α)·P + α·X, which pulls every ground toward X. Keeping the orange spot's chroma would take an orange X, and that would tint every other ground orange. Dimming the near-neutral page by 0.02 takes X darker than the page at about 37 % α or more, and at that mix the spot keeps about 0.68 of its chroma (R-2's 0.662). So **no background-only arm can pass (ii) together with a real dim in that engine**, and a filter-carried arm is invisible there.
- **Rejected on that account:** a hybrid that keeps a small black background (about 5 %) beside the chain. It would pass Playwright WebKit's (ii) and (iii) by dimming almost nothing there, while Chromium and Safari paint the chain. The WebKit cell would then read a term the arm does not rely on. That is a fallback that hides a failing primary in the engine of record (E-2), and two writers of one dim (P-1).
- **Predicted Playwright WebKit cells on this arm** (`model.log`): the spot `#e87237 → #e87237` and the page `#0b0a09 → #0b0a09`: (i) 0.0° PASS, (ii) ×1.000 PASS, **(iii) ΔL 0.000 FAIL** on both. M-9's WebKit dark-veil rows (dims ≥ 0.02) are predicted to FAIL on both dark grounds under `--gate webkit` (FV6 read them PASS on R-2). Row 12 passes on Chromium in both themes (P2-6.3: "WebKit is informational"). Row 23 needs R-32 in both engines, so §7 places the decision.

---

## 3 · Light-byte identity (`same.log`, `lightproof.log`, `hashnames.log`; 20:40:21-20:40:32, load 16.7 → 16.9; heavy)

Built with `harness/build.mjs --demo` under one label in one session: floor v11a, then floor v11, then floor v11 again.

| build | specimen CSS | dist-demo files | note |
|---|---|---|---|
| floor v11a | 391,121 B **`347288745da7cf97`** | 346 | equals OWED's banked hash; OWED's banked fv11a dist-demo sha256 list vs this session's: **`diff` exit 0** (R-27's tie) |
| floor v11 | 391,252 B **`4f56c2631ab5cdd4`** | 346 | +131 B |
| floor v11 again | `4f56c2631ab5cdd4` | 346 | `diff -rq` dist 0, demo 0: deterministic |

**The proof (`FV11-lightproof.py` over the two built specimen CSS files).**
- It reads all 5,584 (floor v11a) and 5,586 (floor v11) declarations, keyed by their block path, property and occurrence. **5 differ, all classed:**
  - DARK 2: `.dark { --glass-focus-veil-dim }`, `oklab(0% none none / .4)` → `transparent`; `.dark { --glass-focus-veil-tone }`, new.
  - CHAIN 2: `@layer components » .glass-focus-veil { backdrop-filter, -webkit-backdrop-filter }`, `… saturate(var(--glass-saturate))` → `… var(--glass-focus-veil-tone)`.
  - TONE-LIGHT 1: `:root { --glass-focus-veil-tone: saturate(var(--glass-saturate)) }`, new.
  - **0 elsewhere.**
- **Every block that declares a token the chain or background reads** is listed for both trees:
  - `--glass-saturate`, `--glass-focus-veil-blur` and `--glass-blur-floating-radius`: one `:root` declaration each.
  - `--glass-focus-veil-tone`: `:root` and `.dark` (floor v11 only).
  - `--glass-focus-veil-dim`: `:root`, its colour `@supports` block and `.dark`.

  No other scope re-declares any of them, so resolving the tone on `<html>` gives what the veil inherits.
- **Source order on `<html>`.** `:root` and `.dark` have equal specificity, so the later one wins. The light declarations sit at #4184-4186 and the dark ones at #4659-4660, so the dark arm wins in dark and is absent in light.
- **Resolved:**

  | tree | mode | `backdrop-filter` (and the `-webkit-` twin) | `background` |
  |---|---|---|---|
  | floor v11a | light | `blur(18px) saturate(1.5)` | `color-mix(in oklab, #1c1917 10%, transparent)` |
  | floor v11 | light | **`blur(18px) saturate(1.5)`** (=) | **`color-mix(in oklab, #1c1917 10%, transparent)`** (=) |
  | floor v11a | dark | `blur(18px) saturate(1.5)` | `oklab(0% none none / .4)` |
  | floor v11 | dark | `blur(18px) saturate(1.5) contrast(1.03) brightness(.8)` | `transparent` |

  **`LIGHTPROOF PASS`**: the light computed values are identical strings, and the dark ones moved. The first run of the tool resolved the light background through the build's no-`color-mix` fallback (`#1c1917`), because its resolver skipped the colour `@supports` block. Its verdict was the same, but the resolver was wrong. The tool was fixed to read every block on `<html>` in source order, with the colour `@supports` block included, and re-run. This table is the second run.
- **The outputs.** `diff -rq` floor v11a vs floor v11 lists 5 dist files and 221 dist-demo files. Normalising each content-hash suffix, in file names and in every reference inside JS, CSS and HTML, and pairing files by content leaves **1 file differing in each output: `assets/index-*.css`**. Everything else is the same bytes under new hash names (`hashnames.log`).

So the light arm (Q-14 (a)) paints what floor v11a paints by construction: the same computed `backdrop-filter`, `-webkit-backdrop-filter` and `background` on every light veil. The next seat's battery measures it.

---

## 4 · The list, under R-34, R-26 and R-36

### 4.1 · The frozen list (`sweep.log`, 20:36:08, load 23.1)

| run | verdict |
|---|---|
| floor v11, no rulings | `LIST (207 lines to read)`, the same size as floor v11a: none of R-32's lines carries a frozen word |
| floor v11 under the carried `crit-fv10-rulings.json` | `FAIL (16 unread, 16 stale of 207)`: the same 16 lines, moved (glass.css :133-:304 → +6, dark-arm.css :304-:348 → +7) |
| **floor v11 under `FV11-rulings.json`** | **`PASS (207 lines: 197 ruled true, 10 reported)`**, floor v11a's tally |
| plant: floor v11a under `FV11-rulings.json` | `FAIL (16 unread, 16 stale of 207)` |

`FV11-rekey.py` builds `FV11-rulings.json` (sha1 `a287f439`). For each ruling in a file R-32 touched, it asserts that the ruling's `says` is on floor v11a's line, and that the line occurs exactly once, byte-identical, in floor v11's file. It re-keys 16 rulings. Each re-keyed `why` gains one bracketed note naming the move, so its own line citations read as floor v11a's. No verdict and no `why` claim changed. R-34: the 207 are not re-read. The re-key only moves keys.

### 4.2 · R-32's own lines, read (`rec/r32-written-lines.txt`, 43 lines)

| at (floor v11) | reading |
|---|---|
| `dark-arm.css:289-290` | "it dims by lightness and keeps chroma (Q-14's dark arm, O-103a)". It names the ruling the arm builds, and the claim is the arm's predicted paint (§2.2). The battery measures it. **True as a prediction**, and the comment says so at :297 |
| `dark-arm.css:290-292` | carried facts. The light declaration mixes the scrim ink at a tenth (`glass.css:120`). The scrim ink `#1c1917` is L 0.216 and the page `#0b0a09` is L 0.146 (model's OKLab, `FV11-model.py`). The +0.006 is pass 2's measurement (REG P3-1). **True** |
| `dark-arm.css:292-294` | "a flat mix pulls every ground toward black: 40% read the aurora's orange focus spot as brown (C 0.142 -> 0.118, L -0.226)". (1 − α)P + αX for X = black. The numbers are FV6's Chromium spot (H12 §0); "brown" is O-103a's "muddy brown". **True** |
| `dark-arm.css:294-297` | "paints no background and dims inside its one chain". `-dim: transparent` at :300 and the chain at `focus-veil.css:75-76`. "`contrast(1.03)` lowers the near-black page most": contrast's shift is 0.03 × (0.5 − v), largest at v = 0. "`brightness(0.8)` scales the rest": a ×0.8 transfer. **True** |
| `dark-arm.css:297-299` | "Predicted … calibrated on the 40% black's measured pairs (D3 pass 12, FV11-model.py): the dark page L -0.030; the spot keeps its hue within 1.8 deg and its chroma at 1.04x, and drops L 0.090-0.105" (`model.log`: −0.0295; 1.8° / 1.3°; ×1.041 / 1.044; −0.105 / −0.090). **True as a prediction, labelled as one.** If the battery reads otherwise, the next build rewrites this line (R-34) |
| `dark-arm.css:300-301` | the two declarations |
| `glass.css:83-84` | "The focus veil's `-tone` below carries the dark arm's dim in its own chain, from tokens/dark-arm.css: a focus register, not a rung either." The tone token at :121 is the token the dark arm re-declares. **True.** *First draft, fixed in this build:* "The dark focus veil's `-tone` below dims in its own chain". The `-tone` below in this file is the light one, which does not dim, so the line was false |
| `glass.css:109-112` | "The dark page is darker than the scrim ink, so the dark arm … does not mix it: it paints no background and dims in `-tone`, where the dim keeps chroma." **True.** *First draft, fixed in this build:* "…darker than the scrim ink, so the dark arm paints no background". The page being darker is the reason not to mix the scrim ink, not the reason for no background (that is chroma), so the "so" was false |
| `glass.css:113-115` | "`-tone`: the colour half of the veil's one filter chain, after the blur: the medium's `saturate()`, the same term every rung recipe carries. The dark arm adds its lightness dim here." Every rung recipe at `glass.css:85-89` ends `saturate(var(--glass-saturate))`. **True** |
| `glass.css:121` | the light declaration |
| `focus-veil.css:16-18` | "the five values become the `--glass-focus-veil-*` cohort … with the chain's tone (`-tone`) as a sixth". FORM 2's five values are blur, core-x/-y, bloom and dim, and the tone is the sixth. **True.** *The unedited line, which floor v11a carries, became false under this build* ("the five values become the cohort", which has six now). It is rewritten here |
| `focus-veil.css:44-49` | "Plain `blur()` + the tone (…: `saturate()`, and in the dark arm `contrast()` + `brightness()`) under a `mask-image`; no `url()` filter, no engine branch." The arms are per theme, not per engine. The rest of the sentence is reflowed and unchanged. **True** |
| `focus-veil.css:76` | the chain |
| `focus-veil.test.ts:107, 137, 149-151, 156-163` | the test's words match its assertions and the tokens (the toolchain's 19/19, and the plant's 2 FAILs on R-2's bytes). **True** |

### 4.3 · H11-2's neighbourhood print (`rec/neighbourhood-r32.log`: `PRINT (95 lines in 3 files)`)

- **Re-valued:** one declaration of one token, `--glass-focus-veil-dim` (dark), `color-mix(in oklab, #000 40%, transparent)` → `transparent`. There are 0 var() fallbacks to it and 0 alias prose. The new `--glass-focus-veil-tone` is not a re-valued declaration, so the printer does not list it. It is read here by hand.
- **The comment blocks above each declaration** (`dark-arm.css:289-300`, `glass.css:91-115`) are R-32's lines (§4.2), plus the cohort entries `-blur`, `-core-x/-y` and `-bloom` (`glass.css:99-105`). R-32 moves none of those values. **True.**
- **The "bound" and rung sentences** (`dark-arm.css:270-272`, `:321-326`; `glass.css:8-39`, `:122-129`, `:162-164`, `:176-177`, `:247-257`, `:281-282`; `focus-veil.test.ts:136-139`). R-32 re-values no bound, rung or ink token: the ladder `diff` is empty, and the only changed declarations are the 5 in §3. These sentences read as floor v11a's do, and the ones on the frozen list are carried as ruled (§4.1). Under R-34 they are R-32's neighbourhood, read, not the 207 re-read. `focus-veil.test.ts:137`'s "BOUND to the ladder" is the blur token's binding, another sense. **True.**
- **R-36, every consumer of the re-valued token and the new token.** Both are read only by `.glass-focus-veil` (`focus-veil.css:75-77`), and that class has two composers:
  - `src/components/slider/Slider.vue:288` (teleported to `<body>` while a graspable Slider is grasped; engaged while held);
  - `src/components/dialog/ModalOverlay.vue:74` (`props.veil`, passed by `DialogContent` only; the side sheet passes none, `SheetContent.vue:293`).

  Their prose (`ModalOverlay.vue:18-31`, `Slider.vue:275-283`) speaks of geometry and portalling, never of the dim's colour, so no consumer sentence is falsified. In light both paint as before (§3). In dark both take the chain's dim. Tests: `focus-veil.test.ts` (asserted) and `ModalOverlay.test.ts:42-96` (presence only).
- **R-36's "the dark veil darkens" sentences.** Every touched file and every consumer was grepped for prose about the focus veil's dim (`grep -rniE "focus.veil|veil-dim|veil.{0,40}(black|darken|dims|dim )"` over src, demo, tests, docs/canon and DESIGN.md). The only dark-dim sentences are R-32's own (§4.2) and the test's. The ink-veil "dark rung lifts the bare page" class (MS9 §4.3) belongs to `--glass-veil-*`, which R-32 does not touch.

**Count:** 43 written lines read: 43 true, with 2 of them predictions labelled as such, and 0 reported. Three false or overstated lines were found and fixed in this build. 95 printed lines read, 0 false.

---

## 5 · The static checks (`static.log`, 20:35:05-20:35:15, load 16.1 → 15.0, `--light`)

| read | result |
|---|---|
| declaration (`declare-floor-v11.json`, from `floor-v11.patch` with `deletes-floor.json` and `H9-exact-floor.json`) | the gated half is identical to floor v10's banked declaration: 63 names absent and the same declared sets. It differs only in `present` (names still in the tree, listed for the seat, never gated): the word "instead" from `focus-veil.css:17`'s reflowed line, and `--glass-saturate` at one more site (the dark tone) |
| **DEL floor v11** (its own declaration + `floor-v11.patch`) | **PASS (101 gated rows)** |
| DEL floor v11 (floor v10's declaration + `floor-v11.patch`) | PASS (101) |
| DEL floor v11a under floor v11's declaration and patch | PASS (101) |
| DEL absent root | exit 2, `FAIL (nothing read: no text file in scope)` |
| DEL HEAD (bite) | `FAIL (89 of 101 gated rows)` |
| **LAW** | **PASS (91 gated rows)**, re-run at close over the final driver files. It is root-dependent: 90 at H12, plus this seat's driver |
| **census** floor v11 / floor v11a / HEAD | **`stacked=0 halo=0 blur=0 open=0`** / `0 0 0 0` / `2 2 5 9`. **No stacked layer, no halo, no second blur** |
| **HOV** floor v11 | **PASS (58)** |
| LIT floor v11 / floor v11a | `halo=5 near=1 stacked=10 chain=3 open=19`, both, the 19 inherited (P5-5's relays) |
| **ladder `diff`** floor v11a → floor v11 | **prints nothing, exit 0** (bite: HEAD exit 1, 10/14/16/20/22 vs 6/10/12/18/20) |

---

## 6 · Toolchain (`toolchain.log`, 20:43:22-20:44:50, heavy `--timeout 60`, load 13.8 → 11.8)

| step | exit | at |
|---|---|---|
| `vue-tsc --noEmit` (app) | **0** | 20:43:29, load 13.4 |
| `vite build` (library) | **0** | 20:43:35, load 12.9 |
| `vue-tsc --noEmit -p tsconfig.test.json` | **0** | 20:43:43, load 11.9 |
| dist-demo (`demo/vite.demo-dist.config`), before vitest | **0** | 20:43:44, load 11.9 |
| `vitest run --maxWorkers=2` | **0**: **Test Files 237 passed (237); Tests 2318 passed, 10 expected fail, 1 skipped (2329)** | 20:44:49, load 11.8 |
| `vitest run --maxWorkers=2 tests/styles/focus-veil.test.ts` | **0**: 19/19 | 20:44:50 |
| **plant** (`plant.log`, `--light`, jsdom, no browser): floor v11's `focus-veil.test.ts` on floor v11a | **1**: 2 failed, 17 passed. The failures are exactly the cohort test (no `--glass-focus-veil-tone` in `glass.css`) and the dark test (no `-dim: transparent` in `dark-arm.css`) | 20:45:20, load 11.1 |

No red, so nothing was re-run (`reds` was never needed). Row 11 holds on floor v11.

---

## 7 · For the next seats

**The battery seat (P11-6.3 step 3, browser half).**
- Run the full battery on `floor-v11.patch` (`8f838dcf`) in both engines, with every Playwright WebKit capture group under `guarded --exclusive webkit --timeout 60`.
- Run M-9 with `--gate chromium --r32` and `--gate webkit --r32`.
- Bank the F-1 frame as `pass-12/frames-Q14/…-dark-aurora-state-veil-r2-vs-r32.png` on one ground (H12 §2.1), with `--bank`.
- Re-read row 12's dark-signed leg. Its expected values:

| cell | predicted (this seat's model) | the gate |
|---|---|---|
| Chromium dark aurora spot | `#ec9642 → #cc730c` (shell ground) · \|Δh\| 1.8° · C ×1.041 · ΔL −0.105 | R-32 (i)-(iii) PASS |
| Chromium dark page | `#0b0a09 → #060504` · ΔL −0.0295 | M-9 dims ≥ 0.02 PASS; R-32 (iii) PASS |
| Chromium, every light cell | unchanged from floor v11a (§3) | every light row as floor v10 |
| **Playwright WebKit dark spot and page** | **raw = veiled** (the engine paints no `backdrop-filter`) | R-32 (i), (ii) PASS; **(iii) FAIL**; M-9's WebKit dark-veil rows **FAIL** |
| real Safari | UNMEASURED (owner's safaridriver checkbox) | — |

- If Chromium reads otherwise beyond the 8-bit noise, that is a model fault. Bank the reading, and the next build corrects `dark-arm.css:297-299`'s predicted numbers (R-34).
- The two Playwright WebKit FAILs are predicted by an engine fact (§2.3). They are not NOT-REPRODUCED cells; they will reproduce at any load.

**For the critic and the agglomerate, not ruled here.**
- R-32 says row 23 closes when (i)-(iii) PASS "in both engines".
  - With the safaridriver checkbox not granted (O-103), Playwright WebKit is the cell of record. On this arm it reads the veil without its chain, and §2.3 shows that no arm the rulings allow (R-2 alone, no new layer, E-2) could pass R-32 there with a real dim.
  - So row 23 cannot close on that reading alone. It needs one of two things: a ruling that reads Playwright WebKit's R-32 and M-9 dark-veil legs as engine-fact reports (as O-103 does for Safari-only facts), or the checkbox.
  - This is the one item this seat sends up.
- The light arm stands by construction (§3). The 10.2.0 minor is untouched.
- `dark-arm.css:297-299` carries predicted numbers. The critic should read them against the battery's numbers under R-34.

**Landing docs pass:** the inherited trailing whitespace at `floor-v11.patch:1266` (as OWED §1.1).

---

## 8 · Machine law, kept

- Every phase ran through `~/.claude/guard/guarded` as the literal command word. The static phases, the model, the proof re-run, the re-key and the jsdom plant ran `--light`, with no browser. `same` and `toolchain` ran heavy, one at a time, never `--light`. vitest used `--maxWorkers=2`. No guarded refusal, no WebKit lock, no screenshot. The load stayed at 11-27 throughout.
- Nothing is left running. The worktree is removed and pruned, `…/D3/p12/` is gone, the `__pycache__` the model's import left in this directory was deleted, and no background process of this seat remains.
- Every tool, record and rulings file is under `pass-12/`. The scratchpad held only two exploratory grid scripts, whose findings are reproduced by `FV11-model.py`'s own search blocks (search 1: the brightness-before-saturate order; search 2: the chosen family).

## 9 · Records

`FV11-records/`:
- run logs: `phases.log` (every phase with its time and load), `setup.log`, `patch.log`, `check.log`, `declare-floor-v11.{json,log}`, `static.log`, `del-*.log`, `law.log`, `HOV-fv11.log`, `LIT-static-fv11{,a}.log`, `census-fv11{,a}.log`, `census-head.log`, `radii-*.txt`;
- the list: `sweep.log`, `sweep-*.log`, `rekey.log`, `nbhd.log`, `neighbourhood-r32.log`, `neighbourhood-fv11.log`, `r32-written-lines.txt`;
- the builds and the proof: `same.log`, `same-*.sha256`, `same-*-fv11a-fv11.txt`, `css/fv11a.css`, `css/fv11.css`, `lightproof.log`, `hashnames.log`, `model.log`;
- toolchain and plant: `toolchain.log`, `tsc-*.log`, `libbuild.log`, `demobuild.log`, `units.log`, `units-focus-veil.log`, `plant.log`, `plant-focus-veil-on-fv11a.log`;
- `teardown.log`.

The pass-12 files this seat wrote: `floor-v11.patch`, `FV11-r32.diff`, `FV11-rulings.json`, `FV11-run.sh`, `FV11-model.py`, `FV11-lightproof.py`, `FV11-rekey.py` and this file.
