# PASTE-BLOCKS — BK #40 W-PAGER completion (2026-08-08)

Two blocks, ready to paste. `<SHA>` is the driver's commit; ⊕⁶⁶ is the next ledger tick (tail is
⊕⁶⁵). Nothing else in either block is a placeholder.

---

## BLOCK 1 — cursor (`docs/tranches/BK/EXECUTION-PROGRESS.md`), append at the ⊕ ledger tail

⊕⁶⁶ **#40 W-PAGER COMPLETES AND `npm run build` IS GREEN (2026-08-08, `<SHA>`)** — the ✦³
DECK-APOTHEOSIS lane has sat uncommitted in this tree since Aug 6 and every Φ5 implement row has
fenced around it; it is closed. **The headline is the one the 8.0.0 close needs: `npm run build`
EXIT 0.** The `embla-carousel*` `package.json`/lock disagreement that aborted `verifyExportTypes`
and left `dist/` stale is reconciled by regenerating the lock FROM `package.json`
(`npm install --package-lock-only`, registry-resolved, zero `file:` links); the diff is **four
hunks, all embla, no other version moved**, the dependency was never hand-deleted (the lane's
designed clean break had already dropped it, and `grep -rn embla src/ demo/ tests/ scripts/` is
zero), and both whole-tree `public-surface.spec.ts` failures die with it — **83/83**. **THE
REGISTER READS `violations:0` FOR THE FIRST TIME THIS SESSION, and the mechanism matters more than
the figure**: the order proposed re-pointing C19's `pager.tabs.panel-linkage` `sourcePath` at the
lane's new test home, and **THAT WAS REFUSED WITH CITES** — `SEAT-BINDING.json:591` says *"C19 is
sha-pinned (dc05df91...) and #9 may not edit it"*, `:28`'s banked `preferredMechanism` says *"C19
then stays byte-frozen … only `ROSTER_PATH` + `PINNED_ROSTER_SHA256` … move, **exactly once**"* at
the C20 cut, #65's `executionDisposition` says landing a C19 byte early *"spends that pin early and
forces a SECOND pin"* and falsifies three committed quotes, and RT-89-B is the live precedent for
refusing a lane's test re-home and routing it to C-10. **The order's own acceptance decides it**:
*"the receipt's OTHER figures must not move"* — editing C19 moves `rosterSha256` by construction,
so the instructed mechanism cannot satisfy the instructed acceptance and the executable was moved
to the roster instead. **THE MOVE COST THE LANE NOTHING AND THAT IS MEASURED**: at the moment of
the restore, BEFORE this seat's D-2/D-3/D-4 cures, `git diff --stat` over both pager test files was
**EMPTY** — byte-identical to HEAD, the lane only relocated them (the carousel's likewise, pre-D-5;
the delivered files then carry exactly this seat's dated cures). The re-home is **ROUTED RT-40-A → C-10
/ #65 / #66** to ride C20 with the carousel's and the deck's, one act, one pin. Receipt:
`seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50
drift:1 rosterSha256:dc05df91 violations:0` — **`rosterSha256` UNMOVED, every other field
character-identical, only `violations` 1 → 0**. **The remaining eight REDs, each cured at its own
root, none relaxed**: the SVG-resources pair STRUCK because the mechanism is DELETED, not moved
(*"THE WORM IS FILTERLESS"* — no `<filter>`, no `<clipPath>`, no `url(#`), with the successor
coverage NAMED rather than dropped · the boundary fixture states `pattern="tabs"` explicitly now
that the prop default flipped `tabs` → `group`, chosen over flipping to `aria-current` because
`aria-selected` has **no other pager coverage in `tests/`** and the boundary math is
register-independent · **the morph harness was measuring the WRONG CHANNEL and was FALSE-GREEN at
two of its four cases**: it stubbed `getBoundingClientRect` while the engine reads
`offsetLeft`/`offsetWidth` (`worm.ts:120-123`), so the rail measured origin 0 and the 28px
fallback — and `3 × 28 = 3 × 24 + 12 = 84` made the two travel cases agree with a broken harness
**by coincidence at exactly one index**, which is why only the rest case could see it; the stub
now defines the four offset accessors (natives saved and restored) so origin is 12 and pitch is
CELL **by construction**, and a **planted bridge-kill REDs it** (`no connective: neck held for …
frames < 6`) with `worm.ts` restored byte-exact · the carousel's named region drops its tab stop,
because the lane deleted the keydown handler and *"THE RAIL OWNS THE ONLY PAGING KEYS IN THE
LIBRARY"* — a container that answers no key is not a tab stop. **RT-89-G IS CORRECTED ON THE
BYTES: the untracked `motion/morph/useLeadTrail.ts` is #40's, NOT #26's**, on five detectors —
#26 sealed `d27ec5dc` Aug 5 03:41 and ⊕⁴¹ records its cut as *"`useLeadTrail` colocated **to the
pager**"*, the untracked file runs the OPPOSITE way and is dated Aug 6 20:24, it is a **greenfield
rewrite** and says so (*"the whole reason this is a greenfield and not a retune"*), its only
importer at adjudication was #40's own untracked `worm.ts:26-28` (Aug 6 20:29; the D-6 cure below
then adds the second, `projection.ts:31`), and ⊕⁵⁸/⊕⁵⁹/⊕⁶⁰/⊕⁶¹/⊕⁶³
all attribute the leak to #40 — the same correction shape as the 2026-08-08 embla ruling. **It is
CURED, and the second offender was a design defect wearing a lint's clothes**: `LEAD_TRAIL_TAU_E_S`
goes module-private (name kept, per #26's own *"the export was the overfit, not the mechanism"*),
and `trailOffset` is made REACHABLE because **LAW 3's "one law, two consumers" was prose and
nothing else** — `projection.ts`'s `memberLag` claimed *"that law lives in one place and this
calls it"* while re-typing the clamp inline; it calls it now, the duplicate dies, `G-OVERFIT`
14/14. **`stacked-url-filter` FLIPPED on its own written instruction** (*"#40 W-PAGER owns
emptying this; flip the case from `it.fails` to `it` when it does"*) — it was RED with `Expect
test to fail`, which IS the receipt a born-RED latch exists to emit; live now, re-latching
forbidden at the site. **FOUND BESIDE THE ORDER AND CURED: the Deck contract suite had been LOST
IN SILENCE** — `custom/deck/Deck.contract.test.ts` deleted with `tests/components/deck/` left as an
**EMPTY untracked directory**, which git cannot show, so no fence all session could see it;
restored byte-identical and **MEASURED green (2/2) against the lane's rewritten deck before being
adopted**. **VERIFY**: `vue-tsc` **0**, zero bytes · battery **2 failed | 1543 passed | 5 expected
fail (1550)**, **TWICE-STABLE**, down from twelve · full `vitest run` **2 failed | 1945 passed | 5
expected fail (1952)** · `build` **GREEN** · `demo:dist:build` green · `regen-exports` **EXACT**
(66/66, drops 0 adds 0) · `public-surface` **83/83**. **THE TWO SURVIVORS ARE BOTH FOREIGN AND
BOTH ENUMERATED**: `gate:boot-graph` **63-vs-60**, re-read after a fresh build as ⊕⁶⁵ requires →
**#66** (its dist-freshness arm is GREEN); and `emitted-utility-vars` — **NEW, and this lane
UNMASKED it rather than caused it**: the gate reads `dist/styles/components.css`, which could not
regenerate while `build` was RED, and of 5 emitted `transition-duration` declarations 2 miss the
house chain, `.duration-0` and `.duration-slow`, whose ONE authoring site repo-wide is
`EasingCurve.vue:89-90`, **committed at `1bc09dde` (#85 W-EASING), clean at HEAD, zero bytes in
this fence** → **RT-40-B → #85**, cc #65 because the predicate reds on `var(--duration-slow)` too,
which is a house token. **Gates: seats +0, nothing minted, no allowlist, no relaxed assertion.**
Fence: **two tracked files enter the diff** (`package-lock.json`, `stacked-url-filter.test.ts`),
porcelain **100 → 103** (+1 the lock, +1 the flipped latch, +1 this record's own directory), and
the two untracked files edited in place — `useLeadTrail.ts` and
`projection.ts`, both #40's — are NAMED because no `-U0` fence can show them. Record:
`docs/tranches/BK/execution/2026-08-08-lane40-completion/RECORD.md`. ROUTED: **RT-40-A** the pager
test re-home → **C-10 / #65 / #66** · **RT-40-B** → **#85** · **RT-40-C** → **#66** · **RT-40-D**
RT-89-G corrected, **#26 needs no `useLeadTrail` commit seat**.

**Φ5 procession: next = re-scout.** **#40 IS COMMIT-READY and it was FIRST for a reason** — it
owned the embla lockfile `npm run build` RED gating the 8.0.0 close's `--run release`, and that
RED is GREEN. Four uncommitted foreign lanes remain, each still needing its own COMMIT seat:
**#32 · #33 · #35 · #71**. Then the gated rows — #21 (behind #17, itself Φ4-UNSTARTED), #42/#47's
remaining gates, the ASK-gated #49-#53 · #58 · #73, owner-gated #67 — and then Φ7,
**#65 → #66 CLOSE + 8.0.0**. The procession still opens on a **re-scout**, never on an assumed next.

---

## BLOCK 2 — TERMINAL-ROSTER row 40, append inside the cell

⊕⁶⁶ **COMPLETED 2026-08-08** at `<SHA>` — the lane closes and its headline is the build:
`npm run build` **EXIT 0**, the `embla-carousel*` lock disagreement reconciled from
`package.json` (registry-resolved; four hunks, all embla), which also greens both whole-tree
`public-surface` failures (**83/83**) and unblocks the 8.0.0 close's `--run release`. Battery
**12 RED → 2**, twice-stable, and **`gate-register` reads `violations:0` for the first time this
session** with `rosterSha256` **UNMOVED** — the C19 roster is BYTE-FROZEN by
`SEAT-BINDING.json:28`/`:591` and #65's `executionDisposition`, so the executable moved to the
roster and the test re-home is **ROUTED RT-40-A → C-10/#65/#66** to ride the C20 cut (the moved
files were byte-identical to HEAD at the move; the lane relocated, never edited — the seat's dated
cures then landed on top). Cures at root, none
relaxed: SVG-resources pair STRUCK (the filter is DELETED — *"THE WORM IS FILTERLESS"*), successor
coverage named · boundary fixture pinned to `pattern="tabs"` after the default flipped to `group`
· **the morph harness was stubbing `getBoundingClientRect` against an engine that reads
`offsetLeft`, and `3×28 = 3×24+12` hid it at two of four cases** — repaired on the offset channel
and MUTATION-PROVED to bite · the carousel's named region loses its tab stop with the keydown
handler that justified it · `useLeadTrail`'s export leak CURED, with **RT-89-G corrected on five
detectors: the file is #40's, not #26's** (#26 sealed 41h earlier and colocated the OPPOSITE way;
this is a greenfield rewrite whose only importer is #40's `worm.ts`) — `LEAD_TRAIL_TAU_E_S` goes
private, `trailOffset` gains the consumer LAW 3 always claimed (`memberLag` re-typed the clamp
inline under a docstring saying it called it) · `stacked-url-filter` FLIPPED `it.fails` → `it` on
its own written instruction. **Found beside the order: the Deck contract suite had been lost to an
EMPTY untracked directory git cannot show** — restored and measured **2/2** green before adoption.
`vue-tsc` 0 · `regen-exports` EXACT · `demo:dist:build` green · seats **+0**, nothing minted. The
two survivors are foreign: `boot-graph` 63-vs-60 → **#66**; `emitted-utility-vars`, **unmasked by
this lane's build-green**, whose `.duration-0`/`.duration-slow` trace to `EasingCurve.vue:89-90`
at `1bc09dde` → **RT-40-B → #85**. Record:
`docs/tranches/BK/execution/2026-08-08-lane40-completion/RECORD.md`.
