# D5 pass 4 · F5″ · the floor (§P3-8.2 F-10..F-12)

| field | value |
|---|---|
| seat | D5 pass 4, **F5″ FLOOR** (REGISTRY §P3-8.3 wave 1). One patch at HEAD containing F5′ plus F-10, F-11 and F-12 |
| model | `claude-opus-5-5`, asserted from my own system identity |
| HEAD | `c5452885a` (H4's harness commit). `git diff --stat v10.1.0 HEAD -- src tests` prints nothing, so HEAD's `src` is 10.1.0's. Harness at HEAD, unchanged by this seat, scene app sha1 `3c135d6264f8` in every build |
| patch | `F5pp.patch`, 3605 lines, sha1 `baa0f58dc678…`. It **contains F5′** (`../pass-3/F5p.patch`, sha1 `30446ac323e3…`) and applies on its own at HEAD. `git apply --check` passes on the main checkout at `c5452885a` |
| cost | **59 files, +1811/−630** against HEAD (`F5pp/numstat.txt`). Over F5′: **6 files, +209/−3** (`F5pp/numstat-over-F5p.txt`): 3 source files +50/−2, 1 new source file +20, 2 test files +139. F5′ was 55 files +1603/−628 |
| worktree | `.claude/worktrees/bl/D5/p4/F5pp/wt` (detached at HEAD, `node_modules` symlinked; `tests-visual/node_modules` does not exist in the checkout, so nothing to link). HEAD's build came from `git archive HEAD src` into the seat's out dir (`F5pp/logs/build-head-archive.log`). Both are removed before return |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless shell, from `glass-ui/node_modules/playwright`. **Playwright WebKit is not Safari.** Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| INBOUND | `../../../audit/INBOUND.md` re-read at the seat's start: mtime 2026-10-16 06:40, no ruling on Q-1..Q-5, Q-2's S6 line, the safaridriver checkbox or O-74c G-1. Defaults stand: Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a). O-87 binds; F5″ adds no paint, only stops two loops off-screen |
| records | `F5pp/run-f5pp.sh` (stages), `F5pp/tab.mjs` (HEAD against F5″ per cell), `F5pp/tab-{chromium,webkit}.md`, `F5pp/probe/hold-probe.mjs` (F-11's probe cell), `F5pp/logs/`, `F5pp/json/{head,f5pp,f5pp-r1,f5pp-r2}/`; the first F5″ build's reads under `F5pp/{logs/superseded/build1,json/superseded/f5pp-build1}/` (§3) |
| dates | 2026-10-18, 14:13 to 17:55 |

## 0 · In brief

1. **F5″ is complete in both engines.** On HEAD+F5″, build, typecheck, `demo:dist:build` and the full vitest suite pass: **242 files, 2346 passed, 10 expected fail, 1 skipped** (`F5pp/logs/gates.log`, 15:2x, load 19-25). The H4 battery (E-1..E-12) ran on HEAD and on HEAD+F5″ in both engines, plus F-11's probe on both builds in both engines.
2. **F-10 closes CK-16's off-screen cell in both engines.** E-12 `restloop rest-running off-screen`: HEAD FAIL (Skeleton and StatusDot +1001/+1002 ms per second, 4097/4137 px below a 500 px viewport) → F5″ **PASS**, both animations `paused`, Chromium and WebKit. `rest layouts` stays **0.0 layouts/s** in Chromium (WebKit has no counter: UNMEASURED). E-12 is now **PASS 63/63 in Chromium and 62 P / 1 U in WebKit** on F5″.
3. **F-11 cures the secondary-button stick.** Probe `F-11 secondary press`: HEAD FAIL in both engines (a right press holds; in WebKit it is still held after its release and after a primary click elsewhere, C-E3 §0.5 reproduced), F5″ **PASS** in both. `contextmenu ends a pointer hold` FAIL → **PASS** in both. A held touch survives its long press in both engines on F5″ (Chromium fires a `contextmenu` at +1500 ms during the hold; the hold stays).
4. **F-12:** F-5, F-6 and F-9 are carried unchanged. F-5 stays a ruling owed.
5. **One CK-06 counterexample stays open and is not F5″'s:** the toggle's dark `sustain` fails the three-read rule on all three Chromium reads of the final build (×0.91 on 3/3, 1/3 and 2/3 reads; load 16-30), and the accordion's `sustain` reads NOT DRIVEN, as F5′ recorded. F5″ does not touch either member (§2.2).

## 1 · Items

Every before/after is HEAD against HEAD+F5″ on the harness's own app, one battery per engine unless a re-read is named. Loads are the 1-minute averages the witness printed.

### F-10 · Skeleton's and StatusDot's rest loops pause off-screen (CK-16)

- **Hunks** (+50/−2 across three files):
  - `src/components/_shared/useRestLoop.ts` (new, +20): `useRestLoop(host)` returns `useIntersectionPause(host, …).isPaused`, the library's existing off-screen and hidden-document pause (P-3: one source; it already serves the Aurora and the backdrop luminance sampler). The paint reads the flag through the template, so the runtime handed to it has nothing to do. A null host is not observed. It sits in `_shared/` because two families compose it (the colocation edict and the overfit rule).
  - `src/components/skeleton/Skeleton.vue` (+13/−1): the root binds `data-offscreen`; `.skeleton[data-offscreen] { animation-play-state: paused; }` inside `@layer components`.
  - `src/components/status-dot/StatusDot.vue` (+17/−1): only the live pulse is observed (`state === "active" && motion === "full"`), the mark binds `data-offscreen`, and `.feedback-mark[data-state="active"][data-motion][data-offscreen]::after { animation-play-state: paused; }`. The selector repeats the animated arm's: the first build used `.feedback-mark[data-offscreen]::after`, which the animated arm's `animation` shorthand out-ranked, and E-12 caught it in Chromium (§3).
  - The pause holds the loop where it is, so it resumes in phase with no restart jump (D-1), and nothing is added to the paint (O-87). Under reduce nothing runs, as before.
- **Tests:** `tests/components/rest-loop.test.ts` (new, +63): a Skeleton and a live StatusDot mark themselves off-screen and back on the IntersectionObserver's word; a non-live dot is never observed; both sheets carry the pause rule at the out-ranking selector. All three fail with the F-10 hunks removed (run at 14:20, `rest-loop.test.ts` 3 failed of 3).
- **Before/after** (E-12 `restloop`):

| cell | HEAD Chromium | F5″ Chromium | HEAD WebKit | F5″ WebKit |
|---|---|---|---|---|
| rest-running off-screen | FAIL `skeleton-breathe` +1001, `feedback-mark-pulse` +1001 ms/s (load 26.5) | **PASS** both `paused` (load 28.5) | FAIL +1002, +1002 ms/s (load 28.1) | **PASS** both `paused` (load 24.4) |
| rest layouts | PASS 0.0 layouts/s | PASS 0.0 layouts/s | UNMEASURED (no counter) | UNMEASURED (no counter) |

- **Rows moved:** CK-16 (FL-6): both rest carriers stop off-screen in both engines, 0 layouts/s at rest in Chromium. The WebKit layout cell is the engine's limit, not a pass.

### F-11 · `useHold` acquires on the primary button only, and releases on `contextmenu`

- **Hunk** (`src/composables/motion/engage/hold.ts`, +20/−1 over F5′): `onPress` returns on a `pointerdown` whose `button !== 0`; a `contextmenu` on the window ends a pointer hold; it does not end a touch hold (a hold acquired by `touchstart` or a `pointerType: "touch"` press), because a long press fires `contextmenu` with the finger still down and a touch always ends in `pointerup` or `pointercancel`. The header states both. A Control-click on macOS is button 0 and opens the menu; the `contextmenu` release covers it.
- **Tests:** three cells in `tests/components/ui/slider/dock-hold-contract.test.ts` (+76): a secondary or middle press does not acquire; a context menu ends a pointer hold; a context menu does not end a touch hold and the touch's own release does. With the primary-button guard and the touch exemption removed, two of the three fail (run at 14:21).
- **The probe cell** (`F5pp/probe/hold-probe.mjs`, on the harness's `slider` scene, one browser per run, a context per cell; no CK row, as §P3-8.2 says):

| cell | HEAD Chromium (load 19.9) | F5″ Chromium (27.3-28.5) | HEAD WebKit (32.0-34.0) | F5″ WebKit (34.0-35.7) |
|---|---|---|---|---|
| secondary press | **FAIL** held true while pressed; released after its pointerup | **PASS** never held | **FAIL** held true after its release and after a primary click elsewhere (`engaged 2`) | **PASS** never held, nothing engaged |
| contextmenu ends a pointer hold | **FAIL** still held | **PASS** released with the button still down | **FAIL** still held | **PASS** |
| control-click (REPORT) | contextmenu fired; held; released on pointerup | contextmenu fired; never held after it | contextmenu fired; **still held after the release** | contextmenu fired; not held |
| touch long press | PASS held at +200 and +1500 ms; contextmenu 1 during the hold | **PASS** held at +200 and +1500 ms with contextmenu 1; released 300 ms after the touch | PASS; contextmenu 0 | **PASS**; contextmenu 0 |

  The Chromium touch row is why the touch exemption is in the hunk: Chromium fires `contextmenu` during a 1.5 s touch hold, and without the exemption that hold would drop under the finger. E-3's phone arm reads 16 P / 6 F at HEAD and on F5″ in both engines, so no touch hold moved.
- **Rows:** none by charter (§P3-8.2: "a cure with a probe cell beside it"). It removes §P3-7 item 3's class. Real Safari: UNMEASURED (owner's safaridriver checkbox), which includes VoiceOver on a promoted control and the secondary-button stick.

### F-12 · F-5, F-6 and F-9 carried unchanged

- **F-5** (the slider release carry): no hunk. **Ruling owed** (REGISTRY §P3-6). Reads on F5″: E-4 `slider fling carries velocity` PASS in both engines: fling minus still **6.63 px** (Chromium, load 20.5) and **12.10 px** (WebKit, load 26.6) against the 4 px bound; HEAD 0.03 px and 0.04 px. The margin is F5′'s (6.49-6.75 and 12.10 px).
- **F-6** (the Sheet): no D5 edit. E-4's Sheet cells stay UNMEASURED at HEAD and F5″ in both engines (4 U Chromium, 8 U WebKit with the Carousel), until O-74c G-1.
- **F-9** (AUTH-4): unchanged bytes; `tests/styles/engage-floor.test.ts` arms its digest and passes in the full suite.

## 2 · The battery, HEAD and HEAD+F5″, per engine

`node F5pp/tab.mjs --engine <e>` (the full per-cell moves are in `F5pp/tab-chromium.md` and `F5pp/tab-webkit.md`; E-1's 95 adoption and static-inert rows are left out of the list below: none exists at HEAD, which has no declaration). HEAD's E-7 static arm reads the checkout's `src` (HEAD's bytes); F5″'s reads the worktree.

| witness | HEAD Chromium | F5″ Chromium | HEAD WebKit | F5″ WebKit |
|---|---|---|---|---|
| E-1 | FAIL 0 / 4 (28.4) | FAIL 32 P / 62 F / 2 U (19.2 → 14.7) | FAIL 0 / 4 (26.9) | FAIL 32 / 64 (23.3 → 31.8) |
| E-2 | FAIL 70 / 94 / 16 R (32.9 → 31.3) | FAIL **72** / 92 / 16 R (30.5 → 17.6) | FAIL 70 / 94 / 16 R (26.3 → 19.4) | FAIL **72** / 92 / 16 R (31.8 → 30.2) |
| E-3 | FAIL 16 / 6 (30.6) | FAIL 16 / 6 (17.8) | FAIL 16 / 6 (26.9) | FAIL 16 / 6 (30.2) |
| E-4 | FAIL 8 / 6 / 4 U / 1 R (33.9) | **PASS 14 / 0 / 4 U / 1 R** (20.5) | FAIL 6 / 5 / 8 U (21.8) | **PASS 11 / 0 / 8 U** (26.6) |
| E-5 | FAIL 34 / 22 (23.6 → 31.9) | FAIL 31 / 25 (16.2 → 23.7) | FAIL 28 / 16 of 44 read (16.6 → 17.8; 967 s) | FAIL 30 / 26 of 56 (28.2 → 27.4) |
| E-6 | FAIL 4 / 2 / 8 U (34.9) | FAIL 4 / 2 / 8 U (22.4) | FAIL 2 / 2 / 8 U / 2 R (21.9) | FAIL 2 / 2 / 8 U / 2 R (27.4) |
| E-7 | FAIL 3 / 4 (31.4) | FAIL **6 / 1** (19.5) | FAIL 3 / 4 (24.3) | FAIL **6 / 1** (25.8) |
| E-8 | PASS 19 / 0 (29.3) | PASS 19 / 0 (22.2) | FAIL 15 / 4 (19.4; 516 s) | **PASS 19 / 0** (25.6) |
| E-9 | FAIL 50 / 28 / 2 R (23.0) | FAIL 50 / 28 / 2 R (21.3) | FAIL 39 / 27 of 66 read / 2 R (19.6; 536 s) | FAIL **50** / 28 / 2 R (24.9) |
| E-10 | FAIL 1 / 5 / 2 R (23.2) | FAIL **3 / 3** / 2 R (30.1) | FAIL 1 / 5 / 2 R (26.1) | FAIL **3 / 3** / 2 R (23.1) |
| E-11 | UNMEASURED 4 U (26.0) | **PASS 1 / 0 / 3 U** (26.7) | UNMEASURED 4 U (26.5) | **PASS 1 / 0 / 3 U** (20.3) |
| E-12 | FAIL 59 / 4 (31.0) | **PASS 63 / 0** (25.2) | FAIL 58 / 4 / 1 U (25.3) | **PASS 62 / 0 / 1 U** (31.2) |
| F-11 probe | FAIL 1 / 2 / 1 R (19.9) | **PASS 3 / 0 / 1 R** (27.3) | FAIL 1 / 2 / 1 R (34.0) | **PASS 3 / 0 / 1 R** (35.3) |

### 2.1 · What moved, and whose

- **F-10:** E-12 `restloop rest-running off-screen` FAIL → PASS, both engines (§1).
- **F-11:** the probe's two graded cells FAIL → PASS, both engines (§1).
- **F5′, as pass 3 read it, on the H4 harness:** E-2 `switch arrival·ownflush` light and dark (F-7); E-4's sortable and tabs cells and the slider carry (F-2, F-3, F5's release rule); E-7's `data-engaged` and `data-press` writers and the modal veil (F-4, F5); E-8 and E-9 WebKit: the toggle and accordion cells HEAD loses to `ENGINE CLOSED, REPRODUCED 2/2` (PF-1) now read (D4's token hunk inside F5), and E-9 WebKit's Button squish under reduce goes FAIL → PASS (scale range 0.030 → 0.000); E-11's `--spring-dock-settle (fling)`.
- **H4's new cells on F5′'s keyboard engagement:** E-10 `slider2 hand-off singleton fwd|rev` NOT DRIVEN → **PASS** in both engines (max one engaged root per frame over 89-110 frames). E-12 `slider wheel over engaged control` and both `consumer anchor` cells NOT DRIVEN → **PASS** in both engines: on F5″ the keyboard engages in place (×1.000, no top layer), so the box scrolls +30 and the page +0, and the consumer's `position-anchor` is never touched. These are the floor's readings; E's promotion is read on P-E4's build.

### 2.2 · E-5: the open CK-06 cells, read three times

- **Accordion `sustain` light and dark:** HEAD PASS 3/3 (Chromium; reads ×1.00 to ×36.05 on the sticky `:hover` wash) → F5″ NOT DRIVEN 3/3. This is F5′'s finding (`../pass-3/F5p.md` §0.6): F5's `(hover: hover)` guard removes the leaked hover, and the accordion owes a press-only property (A's `disclosed` recipe). In WebKit HEAD loses the toggle and accordion to PF-1 (12 cells unread, as in H4 §3) and F5″ reads them: NOT DRIVEN.
- **Toggle `sustain` dark, Chromium:** HEAD PASS 3/3 (×24.32 on HEAD's dark wash, 0.191). On F5″ the dark wash reads 1.574-1.732 (D4's token hunk inside F5) and sags ×0.91 on at least one read in **every** battery of the final build: the battery (3 of 3 reads, load 16.2 → 23.7), re-read r1 (1 of 3, load 17.0 → 22.7) and re-read r2 (2 of 3, load 22.9 → 30.1) (`F5pp/logs/f5pp-r{1,2}-chromium-E-5.log`). It is reproduced across three batteries, not a load artefact, and is the §P2-7 item 14 class C-A3 §0.4 tied to the shared press wash's clock. The first F5″ build passed it once (1 read ×0.97, two rising from 0). F5″ edits neither member; the cure is §P3-8.1's CK-06 item for P-A4.
- The H4 three-read rule read HEAD's accordion light as 2 of 3 at 13:2x (H4 §3); this seat's HEAD battery read it 3 of 3 (×1.00 on read 3 at load 23.6-31.9). The cell is a HEAD green on leaked hover either way.

## 3 · The first F5″ build (superseded)

The first build used `.feedback-mark[data-offscreen]::after` for StatusDot's pause. Its Chromium battery (`F5pp/logs/superseded/build1/`, 14:47-15:05, load 17.7-38.6) read E-12 `rest-running off-screen` FAIL with the Skeleton paused and the StatusDot pulse still advancing +1001 ms/s: the animated arm's selector (`[data-state="active"][data-motion]`, two more attributes) out-ranks the pause rule, and its `animation` shorthand resets `animation-play-state`. The unit test had read only the stylesheet text and passed. The cure repeats the animated arm's selector; the unit test now pins that selector, with a comment naming the cause. Every other cell of the first build matched the final build's except E-5's toggle dark sustain (§2.2). The final build's gates and both engines' batteries are the record.

A first HEAD build (`F5pp/logs/superseded/build-head.log`) came from reversing the patch in the worktree. Its `git diff HEAD --stat` printed one file with 167 deletions: `dock/composables/useDockHold.ts`, which the reverse apply did not restore. It was never read; HEAD was rebuilt from `git archive HEAD src` (658 files, `useDockHold.ts` present, F5′'s `engage/hold.ts` absent), and that build is every HEAD reading here.

## 4 · Fences and the machine

- **Nothing in the checkout's tracked source changed, and no git write ran there.** The patch was made, built and tested in the seat worktree; `git add -N` ran in the worktree's own index, so new files enter `git diff` (as F5′ did), and `worktree remove` discards it. `git apply --check` and `git archive` are reads. Writes in the checkout: only `docs/tranches/BL/design/engagement/pass-4/F5pp.patch`, `F5pp.md` and `F5pp/`.
- Sibling repositories untouched; vitest reads `@mkbabb/keyframes.js` and `value.js` through `node_modules`, read only. No `~/.claude` read.
- **Every build, test and browser run went through `guarded`.** Chromium: one `guarded --timeout 90` per witness; the gates' build, demo build and vitest heavy, typecheck and targeted single-file vitest `--light` (no browser). **WebKit: one `guarded --exclusive webkit --timeout 90` admission for every WebKit stage** (both probes, the F5″ battery, the HEAD battery): queued 15:48:28, admitted 16:37:43 (49 min wait, load 35.3), released 17:40:31 (load 17.9), `guarded exit 0` (`F5pp/logs/wk-admission.log`). No WebKit browser reached the 60-navigation cap, and no page close occurred outside PF-1's known HEAD cells. No zone refusal. Headless shell, no GPU arguments, one browser per witness, a context per cell, closed in `finally` (the harness's wrapper and the probe's).
- **Process slip, mine.** While queued for the WebKit lock I started the two Chromium E-5 re-reads (16:28). When the admission arrived at 16:37 the first re-read was still waiting on the D5 harness lock, which serialises witness processes, so no two browsers ran; I stopped it (TaskStop) to keep one heavy run per seat. It produced no figure. Both re-reads ran again after the release (17:40-17:48).
- Load averages: gates 19-36; Chromium HEAD 20-36; Chromium F5″ 15-31; WebKit 16.6-35.7. No defect in this report was seen only under load.
- Nothing is left running. The worktree and `.claude/worktrees/bl/D5/p4/F5pp/out` are removed before return.

## 5 · Open

- **Real Safari:** every cell UNMEASURED (owner's safaridriver checkbox).
- **F-5:** the ruling owed (REGISTRY §P3-6).
- **F-6:** the Sheet cells UNMEASURED until O-74c G-1.
- **CK-06:** the toggle's dark sustain (×0.91, three batteries) and the accordion's press-only property are A's (§2.2).
- **CK-16 in WebKit:** layouts at rest have no counter in this engine; the cell is UNMEASURED, not passed.
- **CK-08 `data-held`:** `GlassDock.vue` writes it; D2's, stated as in F5′.
