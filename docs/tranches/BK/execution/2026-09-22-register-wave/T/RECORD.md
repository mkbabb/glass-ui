# Lane T — N-2 (Alert tone-glyph, WCAG 1.4.11 census), N-3 (`darkModeSyncScript` read hardened)

**Seat** implement · **model** `claude-opus-5-5` (asserted from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_a4668a47-faa/agent-ab18a9b0ff15ebed3.jsonl`,
the `"model"` field; found by grepping the workflows tree for `LANE T · rows N-2 (Alert
tone-glyph`, a phrase unique to this prompt — the parent session file is the wrong datum;
matched against `claude-opus-5*` with `&&` before the first repo byte) · **date**
2026-09-22 · **base** `master` @ `695d4925` · **ruling of record**
`docs/tranches/BK/execution/2026-09-22-register-wave/RULINGS.md` §2 N-2, N-3, §3 lane T;
grounds `o20-cure/C2/RECORD.md:340-350` (N-2) and `o20-cure/D/RECORD.md:493-501` (N-3).

## Step-0 baseline

Lane fence at first byte: `src/composables/dark/**`, `tests/composables/dark/**`,
`src/styles/tokens/color-radius.css`, `light-dark.css`, `dark-arm.css` — all CLEAN.
75 foreign paths dirty (Lanes L, X, C), including other `src/styles/**` files that are
Lane L's; none touched.

## N-2 · the Alert tone-glyph and WCAG 1.4.11

### (a) — ratified, recorded

> RULING (a): the Alert glyph is decorative reinforcement — `alert-title`/`alert-description`
> carry the content in `text-card-foreground` — so 1.4.11 does not bind THROUGH Alert.

Recorded as ruled. No byte moves for (a).

### (b) — the census

> RULING (b): the lane CENSUSES every site where either token is the ONLY carrier of a state
> (a status dot, a progress fill, a badge with no text, a validity ring): if any such REQUIRED
> graphical object exists, both tokens drop L on B-7's drop-L-keep-hue recipe until ≥3.0:1 on
> `--card` in BOTH modes, LOCKSTEP across every ramp copy, with §5/§6-style contrast rows in
> the existing token test.

Method: `grep -rnE` over `src/` and `demo/` for `var(--success|--warning)`, every Tailwind
utility spelling (`bg-|text-|border-|ring-|fill-|stroke-|outline-|…-success|warning`),
`--color-success|warning`, and the tone classes that read the tokens
(`.feedback-tone-success|warning`, `tone="success|warning"`, `StatusDot` states `success`,
`online`, `warning`); then every file mentioning `success|warning` at all (40 files) read
for a paint read. Token declarations (`src/styles/tokens/*`) excluded — they are the subject.
Raw hits: `scratchpad/regwave/T-census-raw.txt`.

| # | site | what paints | verdict |
| --- | --- | --- | --- |
| 1 | `src/components/status-dot/StatusDot.vue:142-160` (`success`), `:162-185` (`warning`), `:208-225` (`online`) | the whole mark — the silhouette's fill and edge are `currentColor` = the tone | **REQUIRED** — with `label` the dot is `role="img"` with no visible text beside it (the component's own "a solitary dot names itself" identity); the silhouettes differ by state, but every silhouette is painted in the tone, so it is only seen if the tone contrasts with what it sits on |
| 2 | `demo/stories/data/avatar.vue:114` | `<StatusDot state="online" label="Grace Hopper is online">` in the Avatar status slot | **REQUIRED** — the shipped recipe for #1: no visible status text anywhere in the row |
| 3 | `demo/stories/display/status-dot.vue:53` (warning × three sizes, captioned `sm/md/lg`), `:78-80` (success/warning in a row captioned "Dark · reduced motion"), `:111`, `:115` (all seven states, captioned "Light"/"Dark") | #1 with a caption that does not name the state | **REQUIRED** — the caption names the size or the mode, not the state |
| 4 | `demo/stories/display/status-dot.vue:34`, `:45`, `:73`, `:102`; `demo/stories/display/badge.vue:104` | #1 beside text naming the state (`{{ state }}`, "Service available", "Service is …", the badge label) | decorative — the text carries the state |
| 5 | `src/components/_shared/feedback/feedback-tone.css:95-100` → `src/components/toast/Toast.vue:138-141` | 18% wash, 40% rim, glyph | decorative — the toast title/description carry the message (the same reasoning as (a)) |
| 6 | `feedback-tone.css:95-100` → `src/components/alert/index.ts:81-82` | the glyph only | decorative — ruled at (a) |
| 7 | `src/components/badge/index.ts:59-60` (`bg-success`/`bg-warning` + `-foreground`) | a plate behind slotted text | decorative — Badge renders its slot; the library ships no text-free badge and no demo mounts one empty (`demo/stories/compositions/chassis.vue:32` "shipped", `display/badge.vue` all labelled) |
| 8 | `src/styles/glass/control-surfaces.css:123-125` (`.input-pill:user-valid { border-color: var(--success) }`) | a border colour shift | decorative — the file's own contract at `:113-118`: validity is carried by the error TEXT and its absence, the `:user-valid` border is the supplementary cue; the field's boundary is identified by its own resting border, not by this one |
| 9 | `src/components/metric/styles.css:99-101` (`.metric__delta[data-polarity="up"]`) | text ink | not 1.4.11 — the delta is TEXT (its sign carries direction, `Metric.vue:41,69`); see residue |
| 10 | `demo/stories/motion/springs.vue:508` (`text-success`) | text ink | not 1.4.11 — text ("Byte-exact shipped token"); see residue |
| 11 | `src/styles/theme/bridges.css:139-140,220-221` | the `--color-*` Tailwind bridge | no paint of its own — the route #7 and #10 read through |

No progress fill, no validity ring that carries a state alone, and no text-free badge read
either token. Everything else in the 40-file sweep is the English words "success"/"warning"
(`useClipboard` status names, `EasingPicker.vue:344`, comments) — no token read.

**Verdict: REQUIRED sites exist (#1, instanced at #2 and #3). The retune runs.**

### (b) — the retune

Measured first with this lane's own oklch→linear-sRGB→WCAG script
(`scratchpad/regwave/T-contrast.mjs`, the same formulas and per-channel clamp as
`contrast-computed.test.ts:82-122,236-257`), reproducing C2's figures exactly: light
`--success` 2.13 · `--warning` 1.98 on `--card`; dark arm `--success` 8.14 · `--warning`
7.55 on the dark `--card` — the dark arm already clears and does not move.

The window is two-sided, which is the one thing B-7's ramp did not have: dropping L raises
the card ratio but lowers the warm-ink ratio §1 floors at 4.5 (`--success-foreground` /
`--warning-foreground` sit on these plates in Badge and inside StatusDot's success/warning
marks — `StatusDot.vue:144,164,210` → `--feedback-state-ink`, the check stroke :156-157 and
the warning bar :184). Scan at C and h
fixed: success clears 3.0 on the card at L ≤ 0.625 and keeps 4.5 ink at L ≥ 0.580; warning
3.0 at L ≤ 0.655, 4.5 ink at L ≥ 0.615. The chosen L sits mid-window, so neither floor is on
a cliff edge (B-7's reasoning):

| token (light) | L before → after | on `--card` | warm ink | `--neutral-0` ink |
| --- | --- | --- | --- | --- |
| `--success` `oklch(L 0.192 149.5)` | 0.720 → **0.600** | 2.13 → **3.30** | 7.60 → **4.91** | 2.21 → 3.42 |
| `--warning` `oklch(L 0.165 70.6)` | 0.770 → **0.635** | 1.98 → **3.27** | 8.19 → **4.96** | 2.05 → 3.39 |

Hue and chroma untouched; dark arm untouched; the warm ink still wins both, so the
derived-polarity law (§1 "ink polarity is DERIVED") holds without a flip. `--info` (3.36
light / 5.44 dark) and `--destructive` (4.53 / 4.85) already clear and did not move.

**Edits:**
- `src/styles/tokens/color-radius.css:347-348` — the two light values.
- `src/styles/tokens/light-dark.css:188-189` — the light arm of both pairs, LOCKSTEP.
- `src/styles/tokens/dark-arm.css` — not touched (the dark values clear).
- `src/styles/tokens/color-radius.css` §semantic-foregrounds comment — the four stale
  figures (`7.60`, `8.19`, `2.21`, `2.05`) and the clause "and a contrast defect is not a
  licence to retune them" struck in place ("NO HUE MOVES" stands), one dated bracket `[2026-09-22 · register-wave N-2: …]` with
  the re-derived rows.

The LOCKSTEP set was measured, not assumed: `git grep` for the old literals and for the hue
angles `149.5` / `70.6` outside `docs/tranches` finds exactly the two light copies above (plus
`--rainbow-pastel-green`, an unrelated token that shares the hue); the dark literals live in
`dark-arm.css:175-176` and `light-dark.css:188-189` only.

**Witness** — `tests/styles/contrast-computed.test.ts`, a new `§3b status marks` describe
inside the existing file (rows, not a file): `--{success,warning,info,destructive} clears 3:1
on --card [light|dark]` (8 rows) + one LOCKSTEP row (light-dark's pairs == the two class arms
for success/warning). §5 rows moved with the retune: the four claim strings now read
`success  dark ink 4.91`, `warning  dark ink 4.96`, `white ink 3.42`, `white ink 3.39`, and two
rows join for the bracket's `over --card 3.30` / `over --card 3.27`.
- RED (old bytes, `scratchpad/regwave/T-n2-red.log`): `--success over --card [light] computed
  2.13:1` · `--warning over --card [light] computed 1.98:1` — `Tests 2 failed | 85 passed (87)`.
  The other six §3b rows and the LOCKSTEP row were GREEN before and after by design (info and
  destructive already clear; the lockstep is the fork detector, not evidence of the cure).
  The RED ran on the §3b rows alone; the four §5 claim moves and the two joined rows landed
  with the retune (89 = 87 + 2) and are RED on the old L — `T-n2-red-full.log`, 8 failed (2
  §3b + 6 §5), restored GREEN `T-n2-green-2.log` 89/89.
- GREEN (`scratchpad/regwave/T-n2-green.log`): `Test Files 1 passed (1) · Tests 89 passed (89)`.

**Residue.**
1. `--success` as TEXT ink (census #9 `metric__delta[data-polarity="up"]`, #10
   `springs.vue:508` `text-success`) is WCAG 1.4.3, not 1.4.11: 2.13 before, 3.30 after, both
   under 4.5. The ruling scopes 1.4.11; the retune improves it but does not clear it. Not
   cured, not gated — for the adjudicator.
2. The Toast wash (18% toward the tone) and rim (40%) shift darker with the tone; they are
   composited over glass and are paint measurements, outside this arithmetic table.
3. `--viz-green` / other ramp tokens are unaffected (they alias `--section-color-4`, not the
   tone).

## N-3 · `darkModeSyncScript`'s fail-closed read

> RULING: at 10.0.0 the read hardens: an inner `try` around `getItem` so a throwing accessor
> (privacy mode, sandboxed origin) falls to the `auto`/default arm instead of leaving the
> page unstamped. The emission stays the smallest that honours it; the new sha256 is
> measured … the existing dark-sync test's hash assertion moves (born-RED); the emission
> comment's struck sentence is bracketed, not deleted.

**Measured first** (`npx tsx scratchpad/regwave/T-hash.ts`, the test's own derivation:
`createHash("sha256").update(out).digest("base64")`, `Buffer.byteLength`): all six
emissions reproduce MIGRATION.md's §9.0.0 table to the byte (`T-hash-old.txt`).

**The smallest cure.** Three shapes were counted before a byte moved:
- inner `try{var m=localStorage.getItem(K)}catch(_){}` + the absent test spelled `m==null`
  (a throw leaves the hoisted `m` undefined; `getItem` itself never returns undefined, so
  `==null` is `===null` on every successful read) — **+13 B**;
- `var m=null;try{m=localStorage.getItem(K)}catch(_){}` keeping `m===null` — +21 B;
- splitting the one outer `try` into per-call guards (read, write) — a few bytes smaller
  than today, but it is not the inner `try` the ruling names and it re-shapes lane D's
  write-side cure, which stays. Not taken.
- optional-catch `catch{}` (310 B) weighed and not taken — the outer `try` is lane D's
  `catch(_){}` and one string keeps one idiom.

Taken: the first. The outer `try` is unchanged and still guards the write-back emitted after
the stamp (lane D's order). For the object form a throwing read takes the ABSENT arm —
nothing could be read, so no one has chosen; for every scalar form absent and `auto` are the
one welded arm, so the default falls to `prefers-color-scheme` exactly as the ruling says.

**Edits** — `src/composables/dark/darkModeSyncScript.ts` (line numbers after cure round 1):
- `:47-67` the `defaultDark` TSDoc gains a dated bracket — an unreadable store counts as
  absent (comment only; no emission byte moves);
- `:126-127` the two fallback spellings `m===null` → `m==null`;
- `:160-162` the emission: `try{try{var m=localStorage.getItem(…)}catch(_){}var d=…`;
- `:146-159` the struck sentence stays struck and its O-20 bracket stays; a second dated
  bracket `[2026-09-22 · register-wave N-3 — cured at 10.0.0 …]` follows it (for the default
  the struck "degrades to prefers-color-scheme" is true again);
- `:110-114` a dated bracket on the "BYTE-IDENTICAL across this addition" paragraph: true of
  that addition and of the scalar sentence below it; the 10.0.0 hardening moves every
  emission once, by ruling.

**Witnesses** — `tests/composables/dark/darkModeSyncScript.test.ts` (rows in the existing
file):
1. The host gains `throwOnRead` (a `localStorage` GETTER that throws `SecurityError` — the
   accessor shape, which also denies the write), and one new arm `G-NO-FLASH · a storage that
   THROWS ON READ still stamps — the default arm paints`: default with `prefersDark` true →
   dark/`"dark"`, false → light/`"light"`; the object form `{absent:true, auto:false}` with the
   platform light → its ABSENT arm, dark; `{normalize:true}` → stamped dark, `writes=[]`.
   - RED on the old bytes (`scratchpad/regwave/T-n3-read-red.log`): `AssertionError: expected
     false to be true` on the first assertion (the page unstamped) — `Tests 1 failed | 22
     passed (23)`.
   - GREEN on the cured bytes (`T-n3-hash-red.log`, same run as below): the arm passes.
   - The object-form case, against the object-only mutation `(m==null&&` → `(m===null&&` at
     `:126` (RED, `T-n3-objform-red.log`): `AssertionError: expected false to be true` — `Tests
     1 failed | 22 skipped (23)`; source restored (`cmp` clean), GREEN (`T-n3-objform-green.log`):
     `Test Files 1 passed (1) · Tests 23 passed (23)`.
2. The hash pin `G-NO-FLASH · the DEFAULT emission is byte-identical …` and the SPLIT arm's
   `toContain('((m===null||m==="auto")&&false)')`:
   - RED on the cured bytes before the update (`T-n3-hash-red.log`): `AssertionError: expected
     313 to be 300` · `expected '(function(){try{try{var m=localStorag…' to contain
     '((m===null||m==="auto")&&false)'` — `Tests 2 failed | 21 passed (23)`.
   - Moved: `toBe(313)`, `toBe("MOGEZdbxrYiPCsQApEdoFKYoqnbmCxzBPrGPG/EbfJk=")`,
     `'((m==null||m==="auto")&&false)'`, each with a dated bracket in the test's comment.
   - GREEN (`T-n3-green.log`): `Test Files 1 passed (1) · Tests 23 passed (23)`.

The emissions, old → new (every one moves +13 B; the prefix is shared):

```
darkModeSyncScript()                            300 B sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=  →  313 B sha256-MOGEZdbxrYiPCsQApEdoFKYoqnbmCxzBPrGPG/EbfJk=
{ defaultDark: false }                          229 B sha256-qhpAfju9UAwqj2RfWpOZO9EulLGgZ5V71iPcTGTY3zw=  →  242 B sha256-+kr3+orhvPzjRqodC05PBmZEjiRUYqTQ3bROP1Ul1lc=
{ defaultDark: true }                           228 B sha256-manehYcswRzcI9LxUb8B/PXRoWvHIJReiR2pNGvOG54=  →  241 B sha256-oSg/cCpR7IiOWBMlFDCxzciD09O78RkZ8+FUJxgabrM=
{ queryOverride: true }                         402 B sha256-T/HYS7zqh/wi4E0o0R4IStRZF6TYhOjMFduJeli2HpI=  →  415 B sha256-mQa+YqSIVa3dLg5wzyMtdTGHV27xgeXomarl+4ud3P8=
{ normalize: true }                             361 B sha256-BxbpMykpiKP/WPfTsYpbpPpSCTecT50SMXFVFNrMGrw=  →  374 B sha256-ELJDzNkFORSX8nVSvmrv/vdF/vXsUNcR28MZd/Fz3cA=
{ defaultDark: { absent: false, auto: "os" } }  309 B sha256-viDl5kPSBmJC9frsYXBK0PtoTtTWq4SnpZnkpC5cv4k=  →  322 B sha256-k6c4jJN+Xl68gT4/Up6BGWBY5CCxk0mpavrCzlEkLxY=
```

The new default emission, verbatim:

```
(function(){try{try{var m=localStorage.getItem("vueuse-color-scheme")}catch(_){}var d=m==="dark"||((m==null||m==="auto")&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(_){}})();
```

**Residue.** The two pre-existing items D/RECORD.md lists beside this one (an unrecognised
stored value resolves LIGHT, `:21-26`; `classList.toggle` with `undefined` on an engine
without `matchMedia`) are unchanged — not in N-3's ruling.

## Build

`npm run build` under `scratchpad/build.lock` (acquired, released): `EXIT 0`
(`scratchpad/regwave/T-build.log`). `dist/dark.js` is the 179 B barrel (unchanged from 9.0.0,
179 B); the emitter is now `dist/dark-pONY3x93.js`, **2658 B** (9.0.0's
`dist/dark-CLlmo7dD.js` was 2542 B; the delta also carries lane D's post-9.0.0 O-20 cure).
Imported from `dist/dark.js` and hashed: default `313` B
`MOGEZdbxrYiPCsQApEdoFKYoqnbmCxzBPrGPG/EbfJk=`, `{normalize:true}` `374` B
`ELJDzNkFORSX8nVSvmrv/vdF/vXsUNcR28MZd/Fz3cA=` — the source figures, to the byte.
`dist/styles/tokens/color-radius.css` and `light-dark.css` carry `--success: oklch(0.600 0.192
149.5)` / `--warning: oklch(0.635 0.165 70.6)` (light arm of the pairs likewise).

## Ledger vs RULINGS

Two earlier rulings are superseded here, and RULINGS wins in both as the later ruling; the
third bullet is a reading of RULINGS itself:
- the O-20 LEDGER §CUT-6..8 constraint that the 300 B default stay byte-identical (the reason
  D/RECORD.md:493-501 left the read fail-closed) — RULINGS N-3 moves it at the 10.0.0 major;
- the A11Y W3-A clause in `color-radius.css` ("and a contrast defect is not a licence to
  retune them") — RULINGS N-2 retunes L (hue kept, so "NO HUE MOVES" stands). Struck and
  bracketed, not deleted;
- RULINGS N-3 says the `auto`/default arm; for the object form the lane took the ABSENT arm
  (an unreadable store is no one's choice) — ratified by T adjudication-1, with this bracket
  handed to the driver for RULINGS N-3: [2026-09-22 · T adjudication-1: for the object form
  the "auto/default arm" is the ABSENT arm — an unreadable store is no one's choice; scalar
  forms are one welded arm and unaffected.]

## Battery · typecheck · receipt

- Targeted: `tests/styles/contrast-computed.test.ts` 89/89, `tests/composables/dark/` 23/23.
- Battery (`npx vitest run`, `scratchpad/regwave/T-T-vitest.log`): **Test Files 3 failed | 230
  passed (233) · Tests 8 failed | 2249 passed | 10 expected fail (2267)**. All eight reds are
  outside this fence:
  - `tests/styles/route-motion.test.ts` × 6 — the route grammar in `src/styles/view-transition.css`,
    Lane L's (dirty, in progress);
  - `tests/styles/mark-register.test.ts` "layers the avatar's shape seam only" — `src/components/avatar/styles.css`,
    Lane L's (dirty, in progress);
  - `tests/gates/boot-graph.test.ts` "the dist-demo it measures is NEWER than every source" —
    `dist-demo/index.html` built 2026-09-18, older than any edited source on the shared tree;
    staleness, not a code red — the driver's close battery runs on a fresh demo build.
- `vue-tsc --noEmit -p tsconfig.test.json`: `EXIT 0` (`T-tsc.log`).
- Gate receipt (`node scripts/gate-register.mjs`), before and after:
  `seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2
  unbound:45 drift:0 rosterSha256:282d05cf violations:0` — unchanged.

## Files touched (for the driver's pathspec commit)

```
src/styles/tokens/color-radius.css
src/styles/tokens/light-dark.css
src/composables/dark/darkModeSyncScript.ts
tests/styles/contrast-computed.test.ts
tests/composables/dark/darkModeSyncScript.test.ts
docs/tranches/BK/execution/2026-09-22-register-wave/T/RECORD.md
```

(`dist/` rebuilt under the lock; not a commit path.)

## FOR LANE R

**N-2 — the census** (MIGRATION §10.0.0 paint row + CHANGELOG):

| site | verdict |
| --- | --- |
| `StatusDot` `success`/`online`/`warning` marks (`StatusDot.vue:142-185,208-225`) with `label` — no visible text beside the dot | REQUIRED |
| demo instances: `data/avatar.vue:114`; `display/status-dot.vue:53,78-80,111,115` | REQUIRED |
| StatusDot beside state-naming text (`display/status-dot.vue:34,45,73,102`, `display/badge.vue:104`) | decorative |
| Toast wash/rim/glyph (`feedback-tone.css:95-100` → `Toast.vue:138-141`) | decorative |
| Alert glyph (`alert/index.ts:81-82`) | decorative — RULING (a) |
| Badge `bg-success`/`bg-warning` plates (`badge/index.ts:59-60`) — always carry slotted text | decorative |
| `.input-pill:user-valid` border (`control-surfaces.css:123-125`) | decorative (the error text carries validity) |
| `metric__delta[data-polarity="up"]`, demo `springs.vue:508` | text — 1.4.3, not 1.4.11 |

**N-2 — the retune** (light arm only; hue, chroma and the dark arm untouched; LOCKSTEP
`color-radius.css` + `light-dark.css`):

```
--success  oklch(0.720 0.192 149.5) → oklch(0.600 0.192 149.5)   on --card 2.13 → 3.30   warm ink 7.60 → 4.91
--warning  oklch(0.770 0.165 70.6)  → oklch(0.635 0.165 70.6)    on --card 1.98 → 3.27   warm ink 8.19 → 4.96
dark arm (unchanged): --success 8.14, --warning 7.55 on the dark --card
```

Paint change, non-breaking (B-7 precedent): Badge success/warning plates, StatusDot's inner
marks, StatusDot, the Toast wash/rim and every `text-success`/`text-warning` read go darker in light
mode. Residue for the notes: `--success` as text ink is 3.30 on the card, under 1.4.3's 4.5.

**N-3 — the hash pairs** (MIGRATION §10.0.0 row; README/`./dark` docs; old column = 9.0.0-cured
HEAD, which the §9.0.0 table already prints):

```
darkModeSyncScript()                            300 B sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=  →  313 B sha256-MOGEZdbxrYiPCsQApEdoFKYoqnbmCxzBPrGPG/EbfJk=
{ defaultDark: false }                          229 B sha256-qhpAfju9UAwqj2RfWpOZO9EulLGgZ5V71iPcTGTY3zw=  →  242 B sha256-+kr3+orhvPzjRqodC05PBmZEjiRUYqTQ3bROP1Ul1lc=
{ defaultDark: true }                           228 B sha256-manehYcswRzcI9LxUb8B/PXRoWvHIJReiR2pNGvOG54=  →  241 B sha256-oSg/cCpR7IiOWBMlFDCxzciD09O78RkZ8+FUJxgabrM=
{ queryOverride: true }                         402 B sha256-T/HYS7zqh/wi4E0o0R4IStRZF6TYhOjMFduJeli2HpI=  →  415 B sha256-mQa+YqSIVa3dLg5wzyMtdTGHV27xgeXomarl+4ud3P8=
{ normalize: true }                             361 B sha256-BxbpMykpiKP/WPfTsYpbpPpSCTecT50SMXFVFNrMGrw=  →  374 B sha256-ELJDzNkFORSX8nVSvmrv/vdF/vXsUNcR28MZd/Fz3cA=
{ defaultDark: { absent: false, auto: "os" } }  309 B sha256-viDl5kPSBmJC9frsYXBK0PtoTtTWq4SnpZnkpC5cv4k=  →  322 B sha256-k6c4jJN+Xl68gT4/Up6BGWBY5CCxk0mpavrCzlEkLxY=
```

The published 9.0.0 `{normalize:true}` hash (`Xtel8uEY…`, MIGRATION §9.0.0) also moves to
`ELJDzNkF…`. Every emission moves, so a consumer pinning ANY form under `script-src
'sha256-…'` re-pins at the bump (or hashes the emitted string at build time, the standing
MIGRATION advice). Behaviour change for the notes: a throwing `localStorage` accessor or
`getItem` now stamps the fallback arm (default: `prefers-color-scheme`; object form: its
`absent` arm) instead of leaving `<html>` unstamped. Existing references to the old default
figures that R owns: `CHANGELOG.md:63-64`, `MIGRATION.md:191,250-257`.
`darkModeSyncScript.ts:114` cites MIGRATION §10.0.0 for the pair — the row must land under
that heading (none exists yet; the first heading is `## 9.0.0`). The `./dark` docs line R
carries (the `defaultDark` TSDoc bracket): an UNREADABLE store (a throwing `localStorage`
accessor or `getItem`) counts as ABSENT — the scalar forms fall to their one arm, the object
form to `absent`.

**dist:** `dist/dark.js` 179 B (barrel, = 9.0.0); emitter `dist/dark-pONY3x93.js` 2658 B (9.0.0:
`dark-CLlmo7dD.js` 2542 B).

## Cure round 1

Seat: T cure (Opus), model id `claude-opus-5-5` (own transcript
`subagents/workflows/wf_a4668a47-faa/agent-af5a1ec0d867106f7.jsonl`). Applied
`scratchpad/regwave/T-adjudication-1.json` cureList 1-9 in order; nothing REJECTED existed to
skip. TA-3 and TB-2 were AMEND verdicts: no source byte moved for either, only the RECORD
lines above.

1. `darkModeSyncScript.ts:64-67` — the `defaultDark` TSDoc bracket `[2026-09-22 ·
   register-wave N-3 — an UNREADABLE store … the object form to \`absent\`.]`. Comment only:
   the emitted string, all six hashes and the test pins do not move (dist re-hash below).
   Every line after it shifts +4; the RECORD's N-3 line numbers are updated to match.
2. `darkModeSyncScript.test.ts:411` — "an unknown stored mode" → "an unreadable store".
3. `darkModeSyncScript.test.ts:421-429` — the object-form case is now `{absent:true,
   auto:false}` with `prefersDark:false`, expecting dark/`"dark"` (its comment wraps to two
   lines at the file's width). RED against the object-only mutation `(m==null&&` →
   `(m===null&&` at `:126` (`:122` before item 1's shift): `T-n3-objform-red.log`,
   `AssertionError: expected false to be true` — `Tests 1 failed | 22 skipped (23)`; source
   restored from scratch (`cmp` clean); GREEN `T-n3-objform-green.log` 23/23.
4. `color-radius.css:364-365` — the strike narrowed to the licence clause; "NO HUE MOVES"
   stands unstruck. Bracket and every §5 claim string untouched; no test reads the sentence.
5. Old-bytes run: HEAD bytes of `color-radius.css` + `light-dark.css` in place →
   `T-n2-red-full.log` `Tests 8 failed | 81 passed (89)` (2 §3b + 6 §5, as predicted);
   both restored (`cmp` clean, `git diff --stat` identical before/after) → `T-n2-green-2.log`
   89/89.
6. RECORD (a)-(i) applied above. Beyond the letter: the N-2 Edits bullet's quote of the strike
   is narrowed too (the same TB-3 intent); the N-3 Edits line numbers moved +4; the MIGRATION
   cite is `darkModeSyncScript.ts:114` now (the adjudication's `:110` was pre-shift).
7. Build under `scratchpad/build.lock` (acquired, released): `EXIT 0`
   (`T-cure1-build.log`). `dist/dark.js` 179 B; emitter `dist/dark-pONY3x93.js` 2658 B (same
   name and size — the TSDoc does not reach JS); `dist/composables/dark/darkModeSyncScript.d.ts`
   carries the bracket. Imported from `dist/dark.js`: default 313 B
   `MOGEZdbxrYiPCsQApEdoFKYoqnbmCxzBPrGPG/EbfJk=`, `{normalize:true}` 374 B
   `ELJDzNkFORSX8nVSvmrv/vdF/vXsUNcR28MZd/Fz3cA=` — unchanged.
8. Targeted `contrast-computed.test.ts` + `tests/composables/dark/`: `Test Files 2 passed ·
   Tests 112 passed (112)` (`T-cure1-targeted.log`). `vue-tsc --noEmit -p tsconfig.test.json`
   EXIT 0 (`T-cure1-tsc.log`). Battery (`T-cure1-vitest.log`): `Test Files 4 failed | 229
   passed (233) · Tests 9 failed | 2248 passed | 10 expected fail (2267)`. All nine reds are
   outside this fence: `route-motion.test.ts` × 6 and `mark-register.test.ts` × 1 (Lane L,
   as before); `boot-graph.test.ts` × 1 (stale `dist-demo`, as before);
   `tests/gates/orphan-css-partial.test.ts` "every top-level style rule … sits inside an
   @layer" × 1 — new since the first battery, names `Aurora.vue`, `ConfiguratorLayer.vue`,
   `ConfiguratorRow.vue`, `configurator/styles.css` (another lane's layering work in
   progress; the test file itself is dirty from that lane). Gate receipt
   (`node scripts/gate-register.mjs`): `seats:60 active:46 reserved:5 worstCase:51
   remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf
   violations:0` — unchanged.
9. Files touched: the same five source/test paths + this RECORD (list above unchanged).
