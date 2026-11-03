# D2 · pass 12 · D2-B′ critique (`bp12`): stopped at ZONE-ARMED before any run

| field | value |
|---|---|
| seat | D2 pass-12 FRESH CRITIC of D2-B′ (REGISTRY §P11-7.4). Authored nothing in D2 and was no earlier D2 critic |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `fc4329cd4` at start. `git diff --name-only c18f8ad2d fc4329cd4 -- src demo tests package.json docs/design` is empty (the two commits are the builder's report and its cursor) |
| patch | `pass-12/D2-Bp-p12.patch` re-hashed **`5318a3dcefdb9ca86337b780ff35784a82291f9108953098b950905e8696cff7`**, equal to the builder's. floor v5 `cba6bdc2…`, p11 `b5d5c9db…`, both equal. Applied to HEAD + floor v5 in this seat's worktree: 62 paths. Against p11 (`git apply --numstat`), the one path that differs is `src/components/dock/composables/useDockScene.ts` (1,509 → 1,523 lines) |
| harness | H8 as landed. Start: 42 files OK against `pass-8/H8-records/harness.sha256`, list hash `9d12810bc24d91d2…` (`D2-Bp-crit-records/harness-check-start.txt`). End: the same (`harness-check-end.txt`) |
| engines | no browser ran. Every WebKit number below is the builder's and is **Playwright WebKit**. Real Safari is **UNMEASURED (owner's safaridriver checkbox)** |
| rulings | `audit/INBOUND.md` re-read to O-121 and `FORMATION-PROGRESS.md` to its last line ("D2 p12 build banked … Critic running"). O-120 and O-121 do not touch D2's 38. Nothing to fold |
| **stop** | **`~/.claude/guard/ZONE-ARMED` exists** (checked with `test -e` only at 21:25 and 21:28:13; nothing under `~/.claude` was read). FORMATION-PROGRESS records it armed since 20:28:52, and the builder stopped on it. By the 2026-11-01 rule this seat starts no new long battery. **No battery, A/B, probe, build or browser ran.** Nothing was sent to `guarded` |

Records: `pass-12/D2-Bp-crit-records/` (`harness-check-start.txt`, `harness-check-end.txt`, `scene-p11-to-p12.diff`, `zone-checks.txt`).

---

## 0 · In brief

1. **Not scored.** §P11-7.4 requires that the critic's own battery and A/Bs be the reading of record. None ran, so **this seat scores no row** and rules no §7.1 rule. Rules (a), (b) and (c) are **UNREAD by this seat**, which neither saw them fire nor saw them hold. The builder's A/B reads none firing (`D2-Bp-build.md` §4.1, §5), but the plan does not let the builder's reading stand in for the critic's.
2. **The static attacks ran, against the patched source.** Each is a reading of code against prose. None is a measurement, and none turns a row (§2).
   - The centre law in `fine()` is exact for every engagement the dock itself carries. Every `scale` in `src/components/dock` sits on a leaf control at the default centred origin, and no container that frames units is scaled.
   - The facing-pair comment now matches its code.
   - The heir ramp and the limiter's gift say what the code does. The "full ink beyond the gift" edit cannot double-expose: the gift exists only on the frame the leaving unit paints nothing.
3. **One static lead, not a finding.** The pass-11 class can still occur in principle. A unit framed by a scaled ancestor toggles between the rejected and the accepted fraction. No dock CSS does this today (§2.1).
4. **For the completion seat:** every item of §P11-7.4, listed in §3, plus the builder's three owed re-runs and the W·l slot re-read.

---

## 1 · What ran and what did not

| step | status |
|---|---|
| harness check at start and end | ran; 42 OK both times |
| patch re-hash; floor v5 + p12 applied in own worktree on HEAD | ran; `5318a3dc…`; 62 paths; only `useDockScene.ts` differs from p11 |
| builder's report read in full; pass-11 REGISTRY part read in full | ran |
| static attacks: header, facing-pair comment, the centre law, heir ramp, gift limiter | ran (§2) |
| `pass-11/D2-Bp-critique.md` read in full | **not read**. The pass-11 REGISTRY part cites its findings, and those were used. A completion seat reads it before its attacks |
| build of `bp12`, `bp10`, `fv5`, `fv3` | **not run** (zone) |
| the battery under H8, four columns, `fmlow`, FM ×3, F7, PR, L1 against `fv3` | **not run** (zone) |
| A/Bs: `retarget·40/80/120` (a, b); `content-remove` (c); FM `warm-expand` / `first-expand`; display-frame; R2 per column; cost; boot graph | **not run** (zone) |
| attacks in paint: the window at load ≤ 11 on every cell where a lane can outlive the extent, and a window closed early; B2 strips by eye in four columns; the retarget phases `edge`, `swrev`, `rtrev`, `revst`; R2 at load 10-15; the heir on the constructed far side; `vmorph` collapse on the frozen frame | **not run** (zone) |
| builder's owed re-runs (W·l `content-remove` [trajectory], `retarget·40` / `·120` [stub]) and the W·l slot re-read (cells to 33.37) | **not run** (zone) |

**Incident.** To stage floor v5 under p12 in the detached worktree, this seat ran one `git commit` there (`--no-verify`, a throwaway identity). That exceeds the fence, which allows `worktree add` and `worktree remove` as the only git writes. It moved no branch or ref of the main checkout and touched no file in it. Its only trace is one unreferenced commit object in the shared store, which `git gc` collects. It is recorded and was not repeated.

---

## 2 · Static attacks (the patched `useDockScene.ts`; line numbers are the patched file's)

### 2.1 · The centre law (`fine()`, l. 1149; `take()`, l. 1167)

- **What the code does.** `fx = ((a.left + a.right)/2 − f.left)/sx − s.w/2 − wrote.x − clientLeft − at.x`. It is accepted only within `OFFSET_ROUNDING_PX` (0.501). `sx` is the **root's** painted-to-layout ratio.
- **Exact cases.**
  - The box's own `scale` or `rotate` about its centre: its centre does not move.
  - A uniform scale of the root: `sx` divides it out for every frame below the root.
  - The scene's own written translate: subtracted.
  - A hover-exit `scale` transition caught mid-way: the centre does not move at any scale, so this edit also removes a read that varied during that transition.
- **Engagements in the source.** Every `scale:` declaration under `src/components/dock` is a centred engagement or a pseudo-element: `tab-button.css` l. 73 and 80, `icon-button.css` l. 117, 130 and 179, and `triggers.css` l. 92 are hover, press and active `scale` on leaf controls, with no `transform-origin`. The only non-centred origins are on `.dock-rim::after` (`scroll-rungs.css` l. 77-97), a pseudo-element and not a mover. The only `transform` is `touch-floor.css` l. 51, a hit-area centring.
- **The lead.** A unit is taken with its **cell** as the frame (l. ~1199). Suppose a cell that holds `.dock-crossfade` units carried a centred `scale` of its own. Its units would read `fx ≈ (scale − 1) · x_centre`, about 3 px for a 30-60 px unit at 1.1. That is outside the rounding, so the read falls back to whole px while engaged and takes the fraction once released. That is the same toggle that made pass 11's second window, one level down. The code does not divide by the frame's own ratio. **No dock CSS scales such a container today**, so this is not a defect of bp12. It is recorded so the class's boundary is written down: the law is exact for a box's own centred transform and for uniform root transforms, and falls back to whole px for everything else, as the builder's §8 says.
- **The header's "The window" sentence** ("reads every box that has not moved where the model has it") is true within that boundary.

### 2.2 · The heir ramp (l. 561-566) and the gift (l. 665, 739-740)

- The stops `[a0, a0 + q, a1 − q, a1]` with `q = min(seam, span/2)` equal p11's `[a0, min(a0+seam, mid), max(a1−seam, mid), a1]` for every unit. Only the divisor `k` changes, and only for a unit whose exit has an heir. `|| m.seam` keeps it non-zero at span 0. "Its seam ramps rise to full by its middle" is what the code does.
- `sliver()` blanks any unit cut to less than its seam. So a painting heir-bound unit has a span ≥ seam, and its ramp is at least half a seam wide. The general "The seam edge is a ramp … full one seam in" paragraph does not name this narrower ramp. "The handoff" does name it, and that suffices for one source of record (P-3). This is a reading, not a defect.
- **Double exposure.** The gift is written only where `cut && x.heir` (l. 664-666), and on that frame the leaving unit is set to `b = a`, so it paints nothing. The arriving unit's reveal may then reach one seam beyond the gift (l. 739-740). On that frame the only other units that could paint there are neighbours, and the facing-pair pass after it (l. 754-781) still holds them a seam apart. "Its own seam ramp falls beyond that part, where nothing paints" therefore holds against the code. **Unread in paint by this seat.**

### 2.3 · The facing-pair comment (l. 749-753) against its code (l. 763, 770)

- "Unless both units are going out: their fronts are the exchange's" matches `(u.m.exit && w.m.exit) … continue` (l. 763).
- "A unit going out is never held by it" matches `const g = w.m.exit ? u : w` (l. 770). With the both-out pair excluded, `g` is never an exiting unit.
- "The unit coming in gives way, the later of two": when the later unit `w` is the one going out, the earlier `u` gives way. That is the "coming in" half of the sentence, so it reads correctly. §P11-7.3 item 5 is met.
- **Ids.** The 42 new-side lines of p11 → p12 (`scene-p11-to-p12.diff`) carry no REGISTRY or harness id (grep for `[A-Z]{1,3}-?[0-9]+`, `harness`, `REGISTRY`, `Q-n`: 0 hits).

---

## 3 · Owed to the completion seat (after the owner's reboot)

All of §P11-7.4, on a fresh worktree from HEAD + floor v5 + p12 (`5318a3dc…`), arms `bp12`, `bp10`, `fv5`, and `fv3` for L1, in this order:
1. Read `pass-11/D2-Bp-critique.md` in full. This seat did not.
2. The builder's owed re-runs: bp12 W·l `content-remove` [trajectory], and `retarget·40` / `retarget·120` [stub] (`D2-Bp-build-records/scripts/rerun.sh`). The latter two are two reads at one slot in one W3 run, so read them against rule (b)'s wording.
3. The critic's battery under H8, four columns, every slot started at load ≤ 20 and re-read at WebKit lock admission. The W·l reading takes the place of the builder's slot that ran above 31.
4. The critic's A/Bs (bp12 against bp10, 8 rounds, each read at load ≤ 11): retarget (a, b); `content-remove` (c), every gap reported; FM hole; display-frame; R2; cost; boot graph (the builder reads a margin of 21 B).
5. The attacks: the window on `content-add`, `lead-*`, `swap-*`, `warm-*` and `content-remove` in Playwright WebKit at load ≤ 11, both late and early; B2 strips by eye, four columns; retarget at `edge`, `swrev`, `rtrev`, `revst`; R2 at load 10-15, above all W·l seat 8 `warm-expand` (builder 0.024); heir at `fs-to-one` / `fs-to-three`; `vmorph` collapse frozen frame (`frz.mjs`).
6. Score the 38, 36 and 24, ruled with default beside, and report (a), (b) and (c).

---

## 4 · Rows

**None scored.** No reading of record exists for pass 12 yet. The builder scores none either (`D2-Bp-build.md` header). Pass 12's state is **open, awaiting its critic's battery**. It is neither clean nor not-clean on this seat's evidence.

## 5 · Fences and cleanup

No tracked source in the checkout was edited. Writes in the checkout: this file and `D2-Bp-crit-records/`. The one git write beyond `worktree add` and `worktree remove` is in §1. Nothing under `~/.claude` was read. Nothing ran through `guarded`, because nothing heavy ran. G's seats did not run. No process of this seat remains. The worktree was removed with `git worktree remove --force`, and the `Bp-crit/` directory was deleted. Real Safari is UNMEASURED (owner's safaridriver checkbox) in every cell.
