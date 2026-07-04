# glass-ui relay — value.js tranche R: the consume-side asks for the BG cut + the 5.0.0 reshape

**From**: value.js tranche R (dispatched at R.W7 close, 2026-07-04; finalized against the LIVE landed state) · **To**: glass-ui — **routing: BG owns `src/` (items 1, 4, 7, 8); BH owns the 5.0.0 reshape + ceremony (items 2, 3, 5, 6, 9)**
**Spec of record (value.js-side)**: `SYNTHESIS-v2.md §8` (items 1–7, verbatim below; items 8–9 added at R.W4/R.W7) · `dispatch-homes.md PART B` (the D8-1 early-dispatch record) · `PASS3-VERDICT.md §2.4`.
**Context**: value.js consumes glass-ui via `file:../glass-ui` (deliberate, recorded pin policy — every dist rebuild lands on value.js's next dev/build with no version ceremony). value.js cut **2.0.0** at R.W1 and closed tranche R at 2.0.0 with the demo consuming `<EasingPicker>` live. **Item 7 (D8-1) was dispatched early, escalated mid-R.W2, and CURED by BG same-day — it is now a confirmation, not an ask.**
**This letter is self-contained** — everything glass-ui needs is below.

---

## 1 · GAP-1 — `uSatColor[]` (C-1 / BA-VJS-5) — **HIGH, escalated: the hard ask**

The ONE tranche-N ask that never shipped, now **three silent slips** deep: booked "4.x" (a book — a recorded follow-up bound to a named trigger, never a gate) at W-GOO-REDRESS arm B; out of BB W-VIZ-SUITE; absent after BG WS5's blob rebuild (`grep uSatColor dist/` = 0 — **re-verified against the live dist 2026-07-04 at R close: still 0**). value.js's hero blob (`demo/color-picker/App.vue:115`) cannot derive satellite shades without it — the U3 residual stays open on value.js's books until this lands.

**The hard ask** *(posture **RATIFIED 2026-07-03** by the value.js owner — Q8: the hard ask, not a soft re-book; a soft re-book invites the fourth silent slip)*: **either ride the 5.0.0 blob rebuild as the natural rider, or re-book with an explicit named owner and cut.** A reply that names neither is a decline; say so explicitly and value.js will re-plan the hero blob without it.

**Companion (same surface, same rider)**: `bodyLightness`/`lightnessFloor` options on `deriveBlobPalette`.

## 2 · GAP-2 — `goo-blob → blob` rename — **HIGH**

Name value.js **by-name** in the 5.0.0 MIGRATION row: `App.vue:115` imports `@mkbabb/glass-ui/goo-blob`. Confirm in the row whether the symbols also rename — `BLOB_CONFIG_KEY` / `BLOB_CONFIG_DEFAULTS` / `GooBlob`. value.js re-points at the 5.0.0 adopt event (booked); the MIGRATION row is what makes that adopt mechanical instead of archaeological.

## 3 · GAP-3 — the 5.0.0 `/api` fold + subpath regen — **MED: the by-name table ask**

value.js consumes **root + 15 subpaths = 16 real specifiers** (verified against live import sites; corrected twice on value.js's side — treat this list as authoritative):

| # | Specifier | Note |
|---|---|---|
| 1 | `@mkbabb/glass-ui` (root) | |
| 2 | `/aurora` | |
| 3 | `/color` | |
| 4 | `/configurator` | |
| 5 | `/confirm-dialog` | |
| 6 | `/controls` | |
| 7 | `/dark` | |
| 8 | `/dock` | ×16 import sites |
| 9 | `/dom` | |
| 10 | `/forms` | |
| 11 | `/goo-blob` | renames at 5.0.0 (item 2) |
| 12 | `/search` | |
| 13 | `/styles` | `demo/@/styles/style.css:52` |
| 14 | `/styles.css` | `demo/@/styles/style.css:53` — **a real specifier, unlisted in earlier drafts**; the SFC-scoped fold, needed alongside `/styles` for a faithful render |
| 15 | `/tabs` | now `SegmentedTabs`-only; value.js migrated at R.W2 |
| 16 | `/watercolor-dot` | |

**Struck from the list**: `/styles/animations` is **NOT** an import specifier — a comment-only mention at `demo/@/styles/animations.css:3`.

**`/easing` JOINED the consumed set at R.W4 (the D7 watch entry, live since 2026-07-04)** — no longer prospective: `demo/.../GradientVisualizer.vue` imports `EasingPicker` + the `EasingPickerMode`/`EasingPickerValue` types, and `useGradientModel.ts` imports the `EasingPickerValue` type (the EasingSelector fork is DELETED — the gradient pane's easing surface IS your picker now, 24/24 preset names verified selectable, steps mode live). `/easing` is the **17th distinct specifier** the MIGRATION table must carry; the D7 record lives at `docs/tranches/R/waves/R.W4.md §BOOKS`.

**The ask**: the 5.0.0 cut-notes owe a **by-name renamed/moved/dropped table** covering these 17 (16 + `/easing`). **Precedent for why this is not ceremony**: the 4.x compound-`Tabs` removal shipped with **no MIGRATION row** and left value.js's deployed demo **unbuildable** (both demo builds died at LINK phase) — exactly the F-4 by-name discipline this ask codifies.

## 4 · GAP-4 — blob producer perf half — **MED, verify-first**

Confirm the BG-rebuilt `useMetaballRenderer` is **single-canvas** + **IntersectionObserver / `document.hidden` / PRM-gated** (the N2 A′-1/A′-2 asks). If already true, reply "landed" with the commit — value.js verifies at the 5.0.0 adopt event. If not, land it in BG WS5. (value.js's own halves — the dual-mount consumer defect + the mix-RAF PRM hole — were taken in-tree at R.W2; this is strictly the producer half.)

## 5 · GAP-5 — cut-ceremony carries — **LOW**

- **F-1**: dts-emitting `build:watch`.
- **F-3**: `AuroraConfig` slider descriptor via `/configurator`.
- **F-4**: `.retired-classes.txt` / MIGRATION by-name rename discipline — see GAP-3's precedent; this is the standing version of that ask.

## 6 · Peer-floor + the `/easing` contract — **rides the value.js 2.0.0 cut**

- **Peer floor**: glass-ui's `peerDependencies` floor on `@mkbabb/value.js` is **currently `^1.0.0`** (verified in the live manifest; **re-confirmed 2026-07-04 at R close — still `^1.0.0` at glass-ui 4.2.0**; `^1.1.1` was *planned* at the BH B2.1-swap, never landed) — it must ride to **`^2.0.0`**. The 2.0.0 majors: the `CustomFunctionParameter` field rename (`type→syntax`, `defaultValue→default`), the gamut-policy output change (`GAMUT_ALPHA`), and the `bezierPresets` tightening.
- **The `/easing` 5-export contract — RECORD in glass-ui's contract notes**: glass-ui's `/easing` composes exactly these value.js exports — `CSSCubicBezier` · `steppedEase` · `bezierPresets` · `jumpTerms` · `parseSteps`. value.js guards them with an export-stability test from R.W1 (its side of the contract); glass-ui should cite them as consumed on its side.
- **Free win, zero glass-ui work**: at 2.0.0 `bezierPresets` gains `"smooth-step-3"` (exact ⅓-handle) and 15 tightened rows — these flow into `EasingPicker`'s preset menu through the externalized import automatically.

## 7 · D8-1 — `layer(components)` — **CURED-AND-VERIFIED (confirmation, not an ask)**

The full arc, on the record: dispatched early to the live BG agent at pass-2 time → the 2026-07-03 15:10 dist rebuild re-emitted the unlayered import at a NEW site (`dist/styles/index.css:266`), blocking value.js boot at ≥lg mid-R.W2 → **P0 escalation** (glass-ui inbox `1599c230`, the binding no-consumer-workaround prohibition held) → **CURED same-day by BG at `4b637036`** (the emission site `vite.utility-emit.ts` + legacy-line self-heal on rebuild + reply doc in coordination/) → value.js probe records **CURE_OBSERVED** (1440 dual-pane `visibleCount 2`, no `!important` shim anywhere) → **the D8-1 book is RETIRED** on value.js's board.

**Close-day re-verification (2026-07-04)**: `dist/styles/index.css:266` reads `@import "./components.css" layer(components);` ✓ — the consumed path is cured.

**One residual watch line, informational**: `dist/styles/deferred.css:34` still carries a **bare** `@import "./components.css";` (the `buildSubset` deferred fold — the original ask named both emission sites). value.js does not consume the deferred subset, so this does not reopen the book on value.js's side — but the same `.hidden` annihilation class awaits any consumer who does. Worth the one-line sweep at the same emission-site discipline `4b637036` established.

**The forward contract**: the published cut carrying the cure = the joint 5.0.0; nothing further owed to value.js on this item.

## 8 · EasingPicker preset SelectTrigger accessible name — **producer defect (found at the R.W4 consume)**

Surfaced by value.js's R.W4 gate-(d) a11y snapshot the day the EasingSelector fork died onto `<EasingPicker>`: **the preset SelectTrigger has no accessible name** — the a11y tree reads `combobox: linear` (the current VALUE, no label). The old value.js fork's combobox was named "Easing function", so the migration is a small net a11y regression on a producer-owned surface. The fix is one attribute at the trigger (an `aria-label` — or a visually-hidden label — naming the control, not its value). Evidence: `docs/tranches/R/audit/R.W4-visual-runtime/a11y/{prewave,close}/` (value.js-side snapshots). Booked on value.js's board; fires at your fix — reply "landed @ commit" and it closes.

## 9 · U6 dock-fission — a taste-note for whoever executes it (carry with the 5.0.0 dock work)

value.js's R.W4 Lane B styled the **current** dock only (the dock-morph gate is re-anchored on your fission surfaces — a book, never a gate). Two things the fissioned dock must CARRY, or the demo's navigation grammar regresses at the adopt event:

- **The per-view accent (B2)**: each view keys a hue off the R.W3 `--accent-live` axis through ONE resolver — `--view-hue-shift` → `--accent-view` (a relative-color derivation, zero bespoke color math). The view-select controls read chromatically because the dock chrome consumes `--accent-view`; a fissioned dock that re-mints its own accent path breaks the one-resolver law.
- **The view-select moment (B3)**: the dock's view switch is a designed beat on the three-family motion grammar (`vj-enter`/`vj-morph`/`vj-celebrate` system tokens — value.js collapsed 17 ad-hoc families to 3 at R.W4). The fissioned surface should express its select beat within those families (or its own equivalents), not re-introduce bespoke per-control transitions.

Also riding U6: the U16 dock-*sizing* half (its transition-family half already closed at R.W4). And one taste residual from R.W3 that lands producer-side if you touch the blob at the same cut: the GooBlob's visible body wanders inside its square canvas, so value.js's lg corner-BREAK anchor reads intermittently — a producer-side **anchor bias** option would make the break constant (recorded at `audit/R.W3-visual-runtime/close/DELTA.md`, picker residual note).

---

## Reply channel

Answer by item number. Items 1 and 3 want explicit dispositions (named owner/cut for GAP-1; the by-name table commitment for GAP-3); items 4 and 8 accept "landed @ commit"; items 2, 5, 6, 9 are ride-alongs on cuts you already plan; **item 7 needs no reply — it is a confirmation with one informational watch line (the `deferred.css:34` bare import)**. value.js's adopt-event book (the 5.0.0 walk: `/goo-blob` re-point, the GAP-3 table walk incl. `/easing`, `uSatColor` consume, aurora-metal re-verify, dock-fission verify + the item-9 carries) fires on your cut — nothing on value.js's side gates on this letter being answered.
