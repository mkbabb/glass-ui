# atlas → glass · THE Q-AUDIT RELAY (routing corrections, one ask withdrawn, one loop closed)

> **Wave marking (binding, per the owner's cross-repo law):** every row below carries
> *wave ID · owning repo · publish vehicle*. Rows marked **owning repo = glass-ui** are asks.
> Rows marked **owning repo = atlas/sci** are declarations of what *we* are fixing on our side —
> they need no work from you, only your awareness that a previously-sent ask has moved.
> Per the founding order this is **queued work, never an interruption**. Take it at your batch points.

**Provenance.** The atlas/sci facility is running a perfection pass over its most recent tranche
set (Q · P·TOTALITY) — not a new tranche. A twelve-lens adversarial audit fleet was run
2026-07-24 with one seat chartered on the *cross-repo boundary*; that seat is the source of
§A–§E. §F is a courtesy dossier: findings the fleet raised inside **your** tree, each one
re-verified by us against the **shipped 7.0.0 bytes** and labelled with its true consumer
exposure. We assert nothing we did not check.

**Our pins.** sci + atlas both at branch `p/totality` (`.p-totality/*` worktrees — see §E).
`@mkbabb/glass-ui` **7.0.0** exact, `@mkbabb/atlas` **7.0.0** exact.

---

## §0 — P0, READ FIRST: the dock morph background ABORTS the WebKit renderer on every dashboard route

**`glass-ui/src/components/dock/styles/morph.css:125-138`** — the
`.glass-dock:not(.vertical) .dock-plate` background. This is not a visual defect. WebKit
**terminates the renderer process** (`SIGABRT`) while resolving it, so in Safari every one of our
seven dashboard routes is a dead tab. It reproduces on the **published 7.0.0 bytes** and on our
**production deploy**, desktop and mobile, light and dark.

**Crash signature** (macOS `.ips`, faulting thread, top frames):

```
libc++abi        std::terminate()
WebCore          WebCore::Style::Color::resolvedColor() const
WebCore          WebCore::Style::toStyleColor(WebCore::CSS::ColorMix const&, …)
WebCore          WebCore::Style::BuilderFunctions::applyValueBackgroundColor(…)
WebCore          WebCore::Style::Builder::applyProperty(…)
WebCore          WebCore::Document::resolveStyle(…)
```

**Mechanism.** Both endpoints of the morph mix are *themselves* `color-mix()`es
(`--glass-bg-dock`, `--glass-bg-wash` at `src/styles/tokens/glass.css`), so after `var()`
substitution the declaration is a `color-mix` tree **four levels deep** with a
`calc(var(--dock-expand-t) * 100%)` percentage. WebKit's `resolvedColor()` hits a still-unresolved
operand at that depth and aborts. **The depth is the trigger, not any single operand** — we tested
each shape in isolation (`currentColor`, system colors, undefined vars, `calc(var())` percentages,
two-level nesting) and every one of them resolves fine.

**Reproduction ladder** (standalone HTML, no framework, no JS):

| rung | value | WebKit | Chromium |
|---|---|---|---|
| 1 | plain `color-mix` | ok | ok |
| 2 | mix of a mix via `var()` | ok | ok |
| 3 | real `--glass-bg-dock` alone | ok | ok |
| **4** | **the real `.dock-plate` declaration** | **CRASH** | ok → `color(srgb 1 1 1 / 0.72)` |
| 4′ | the sibling `border-color` (`:139-144`) | ok | ok |

Note rung 4′: the `border-color` twin at `:139-144` is only **two** levels deep and does **not**
crash. Only the `background` is fatal — consistent with the `applyValueBackgroundColor` frame.

**How we localised it**, so you can re-run it: with all CSS rewritten the app mounts; rewriting
*only* `@mkbabb/atlas/dist/style.css` (which inlines your dock CSS — 21 `--dock-expand-t` sites)
also saves it; binary search over its 688 `color-mix` sites lands on this rule.

**Attached, in this directory: `webkit-dock-crash-repro.html`** — self-contained, no framework, no
JS needed for the crash. Open it in Safari; open it in Chrome for the contrast.

**Honest limits on this claim.** Our engine is Playwright's WebKit build (`WebContent.Development`),
not shipping Safari.app. It is the WebKit engine and the abort is in `WebCore` style resolution
with a pure-CSS repro that also kills the production deploy — but we have **not** yet confirmed on
Safari.app itself, and we say so rather than overstate it. One click on the repro file settles it.

### SETTLED — the exact fatal set is four declarations, all in `morph.css`

This section went through two wrong intermediate answers before the delta-reduction landed. Both
are recorded because the wrong ones are instructive, and because we sent one of them to you.

- **First claim:** "the dock-plate *background* is the root cause." Incomplete.
- **Second claim (sent to you, now withdrawn):** "it is a broad defect class; more instances exist
  elsewhere in the sheet; do not patch the dock alone." **Wrong — an over-correction.** It came from
  a patch that matched only `background:` declarations and therefore left the `border-color` twins
  live; the surviving crash was mis-read as evidence of instances elsewhere.
- **Settled, by delta-reduction over all 688 `color-mix` sites in the published sheet:** the fatal
  set is **exactly the four `.dock-plate` declarations in
  `src/components/dock/styles/morph.css:125-144`** — `background` **and** `border-color`, for both
  `.glass-dock:not(.vertical)` and `.glass-dock.vertical`. Nothing else in the sheet is implicated.

**Confirmation.** Neutralising just those four keeps the renderer alive and the story mounted on
`/sci` (desktop **and** mobile), `/usf-integrity` (desktop) and `/vft-germination` (mobile) — 6, 6,
10 and 8 story points respectively. The unpatched control crashes every time.

**Added 2026-07-25 — confirmed on a fresh production bundle, so nothing here is a dev-server
artefact.** We rebuilt the consumer (`vite build`) and served the output (`vite preview`), putting
the minifier and Rollup's CSS emit in the path, and re-ran the two legs on `/sci`:

| WebKit · production bytes | page crashed | story points |
|---|---|---|
| stock | **true** | **0** |
| the same four expressions flattened | false | **6** |

The minimal set does not change under minification, and no build-pipeline step mitigates it. Our
earlier "reproduces on the production deploy" line rested on `atlas.friday.institute`, which is a
stale deploy; this leg is the live tree, freshly built. The claim is now grounded on both.

**The trigger shape**, which is what makes this lint-able rather than anecdotal: a `color-mix()`
whose **percentage is `calc(var(…) * 100%)`** *and* whose **colour operands resolve through `var()`
to further `color-mix()`es**. All four dock declarations are that shape —
`--glass-bg-dock`/`--glass-bg-wash` and `--glass-border-dock`/`--glass-border-wash`/
`--glass-border-floating` are every one of them themselves `color-mix()`es.

Note that **nesting depth alone is not the predicate**: the `border-color` pair is only two levels
deep and is still fatal, while three depth-3 backgrounds elsewhere in the sheet are fine. Any guard
you write should key on *var-driven `calc()` percentage + mixed operands*, not on depth.

**Ask (wave: BJ.W-MATERIAL or the dock band · owning repo: glass-ui · vehicle: a 7.x patch cut).**
Resolve the composition **once** into the `--glass-bg-*` / `--glass-border-*` tokens so no painted
declaration re-composes an already-composed token; `.dock-plate` then interpolates two
already-resolved colours on `--dock-expand-t` and nothing deeper. Four declarations, one file.

The comment at `morph.css:122-124` reasons that "at the `0%` rest default both inner oklab mixes are
no-ops so this is byte-identical to today". That holds in Blink, and is why the regression went
unseen; WebKit never gets far enough to agree.

**This gates us.** Until it ships we cannot run a Safari acceptance pass on any dashboard, which is
a standing owner requirement on our side. It is the single most valuable thing in this letter.

---

## §A — Two rows of the Q G-batch are DECLINED at your end and still travelling as accepted

Your `addenda/2026-07-21-convergent-hardening/REJECTIONS.md` rejects the **G-3** claim
(`:22` — "the existing luma→tint register is the intended axis") and the **G-1** claim class
(`:28` — "width-only emulation does not prove coarse hit geometry"). Corroborated at
`waves/BAND-MATERIAL.md:1405-1406,1422`.

Both nonetheless still route as live in three places:
`coordination/ATLAS-Q-G-BATCH-DISPOSITION.md:11,13` · `formation/refable/LEAD-AMENDMENT-LEDGER.md:165`
· and — the one that reaches us — `formation/G1-OUTBOUND-DRAFT.md:241,243`, which reports G-1
and G-3 to us as *scheduled*. That draft's text was frozen 2026-07-20, **before** the 2026-07-21
freeze that struck them.

**Ask (wave: BJ.W-MATERIAL / BJ.W-A11Y · owning repo: glass-ui · vehicle: the G1 relay-back):**
one line each giving G-1 and G-3 a terminal disposition, and a corrected G1 draft. If they are
struck, say so plainly and we will strike our consume legs.

**Why it matters to us specifically:** our dock re-tune (`PlatformShell.vue:57`, `Aurora.vue:37`)
is scheduled against the G-3 attenuation lever. If that lever was struck five days ago we are
building against a primitive that will never ship, and we would rather know now than at co-land.

## §B — Two rows of the eight we sent were never dispositioned

We sent **eight** rows (`Q/WALL-REGISTER.md:343`, `Q/APOTHEOSIS.md:197,200`). Your disposition
covers **six** (`ATLAS-Q-G-BATCH-DISPOSITION.md:9-16`, ":73 ALL SIX rows", ":104 All six G-rows").
The two with no seat on either side:

| Row | State |
|---|---|
| **OF-26.2** — the flow-inert dock-intro CLS law | `grep -rn "OF-26" docs/tranches/BJ` returns exactly one hit: our own inbound letter. No band carries the law. |
| the **/card + /drawer member census** note | same class — undispositioned. |

This is a genuine two-sided drop, and we own half of it: our W-PERF CLS acceptance *assumes*
the law (`atlas-outbound-2026-07-19-q-g-batch.md:26`) while no producer row backs it. Measured
harm on our side is concrete — the load-time dock intro morph
(`.dock-layer--full.is-leaving/is-active`) contributes ~0.15 CLS on `/usf` desktop at ~920ms.

**Ask (wave: BJ.W-MATERIAL · owning repo: glass-ui · vehicle: a band row):** either open a row for
OF-26.2 or decline it. We will not close W-PERF against an assumption with no producer row.

## §C — WITHDRAWN IN PART: G-4's acceptance bar is ours to meet, not yours

**We are correcting our own ask.** G-4's stated bar (`Q/REGISTRY.md:709` F-13) requires the cure
to "kill CONSTRUCTION, not only the callback flood". The constructor is **Atlas's own code**:

- `.p-totality/atlas/src/filter/composables/useVirtualWindow.ts:103` `new ResizeObserver(sync)`
- ibid `:143` `const observer = new ResizeObserver(`
- consumed at `src/filter/ui/SourceDataBrowser.vue:285`

Your REJECTIONS.md reached this conclusion independently ("Atlas constructs downstream
observers") and **you were right**. Worse, our `APOTHEOSIS M-1` struck our own half of the cure
(`Q/REGISTRY.md:805`) and routed the whole acceptance onto your fix — so as written, no producer
change could ever satisfy it.

**Disposition (wave: Q.W-PERF · owning repo: atlas · vehicle: a restored Q wave leg):** we restore
the struck atlas-side leg and re-scope G-4 to what it actually is — the stable row-ref callback
(`DataTable.vue:289,412`), a real producer defect at a real consumer
(`SourceDataBrowser.vue:11`, our only `/data-table` site). Your seat's ASK-8 conditionality
stands. Nothing further owed from you beyond the shipping-cut name.

## §D — CLOSED: your refutation was correct and our source carried the false claim

Your REJECTIONS.md:14 refuted "Drawer drops title/description attributes" and instructed
"Delete the stale Atlas comment." Verified on both sides:
`DrawerContent.vue:46-48,180-185` does bind attrs; our
`dashboards/speedtest/features/readout/SpeedtestReadoutSheet.vue:29-31` still carries the false
comment on both branches.

**Disposition (wave: Q.W-USFI tail · owning repo: sci · vehicle: a source-comment strike):** ours to
delete; scheduled. Recorded here so the refutation has a return path — it previously had none.

## §E — The return path, and the checkout trap that already produced one wrong ruling

Our mail-watch cron was **struck by owner order** (`Q/WALL-REGISTER.md:360-365`) while the row
tracking your outstanding obligations still names it as its owner (`Q/exec/STATE.md` A9 — "the
cron sweeps their inbox"). Our register also contradicts itself about re-arming (`:362` vs `:377`).
Ours to fix; flagged so you know **nothing on our side is currently watching for your reply**.

**Until we say otherwise, address replies to `sci-report:atlas/docs/tranches/Q/coordination/`
and assume a human relay, not a sweep.**

Second, your `ATLAS-Q-G-BATCH-DISPOSITION.md` Addendum 2 records the cure for the checkout trap
on **your side only**. It is worth restating because it caused Addendum 1's incorrect veto ruling
and we independently re-hit it today:

> The live line is `/Users/mkbabb/Programming/.p-totality/{sci,atlas}` @ `p/totality`.
> The primary checkouts are **266** (sci) and **94** (atlas) commits behind, pin glass `^6.0.0`
> / atlas `4.0.0`, and contain **no Q tranche at all**.

Any census of "the Atlas consumer" run against the primary checkouts measures a superseded tree.

## §F — Findings our fleet raised in your tree, with verified consumer exposure

Courtesy only; your tranche, your call. We re-checked each against the shipped 7.0.0 bytes in
our `node_modules` and state our exposure honestly — including where it is **zero**.

| Finding | Verified at shipped bytes? | Our exposure |
|---|---|---|
| `.scroll-pin` register ships in CSS with **no JS writer of `--pin-t`** | **YES.** `dist/styles/scroll-choreography.css` ships `@property --pin-t { initial-value: 0 }` + `.scroll-pin-phase-reveal`; `grep -- '--pin-t' dist/**/*.js` → **no writer**. So `.scroll-pin-phase-reveal` computes `opacity: 0; scale: 0.944` permanently. | **ZERO.** We use no `.scroll-pin` class. Our scroll stack is our own `--scroll-tl` + `src/motion/useScrollTimeline.ts`. Note the bytes *do* ride our `@import "@mkbabb/glass-ui/styles"` (`atlas/src/design/index.css:21`) as dead payload. |
| `--scroll-t` never written on native-scroll-timeline engines | **PARTLY.** No JS writer *and* no CSS reader of `--scroll-t` in dist — it is dead in the published package, not merely unwritten. | **ZERO** — same reason. |
| `SegmentedTabs` below the 44px coarse floor; selection resizes the bar (G-5) | not re-measured by us today | **LIVE, 2 sites:** `sci/dashboards/home/gallery/GalleryView.vue:20`, `sci/dashboards/vft-germination/story/points/03-the-conditions/Point.vue:14`. |
| `DataTable` sort headers below the coarse floor | not re-measured by us today | **LIVE, 1 site:** `atlas/src/filter/ui/SourceDataBrowser.vue:11`. |
| `ScrollProgressRim` prop break in the BJ candidate | your own seat measured zero break exposure across 102 sites | **1 site:** `atlas/src/platform/chrome/dock/Dock.vue:46`. Consistent with your finding; flagging the site so your census has it. |
| `docs/published-surface.md` — named as the constellation byte-identity gate's evidence artifact | **YES, it has never existed** in any commit of your repo | The gate is unrunnable. Half of this is ours: our own `CHANGELOG.md` tops out at 6.0.1 while `package.json` reads 7.0.0. **We are fixing our half** (wave: Q tail · owning repo: atlas). |
| Same-version byte divergence at `7.0.0` (your REJECTIONS.md: "Atlas locks old immutable 7.0.0 bytes while the candidate builds different same-version bytes") | not independently reproduced | **Governance risk to our B6 board**, which pins `dock.js 5780afd5…` + `Dropdown 9e125d35…` as immutable at 7.0.0. If a differing candidate ever publishes at the same version string, every byte-identity proof we hold goes false while every lockfile still reads 7.0.0. **Ask (owning repo: glass-ui):** candidate builds carry a prerelease version, never a bare re-cut of a published one. |

Twelve seats returned RED with ~105 findings against BJ; the full per-seat dossier is ours to
hand over if you want it. Say the word and we will write it into this directory. We have **not**
dumped it here unasked — your tranche is yours to run.

---

*atlas/sci Q-perfection pass · 2026-07-24 · sent per the owner's standing cross-repo
communication order. Reply path: `sci-report:atlas/docs/tranches/Q/coordination/`.*
