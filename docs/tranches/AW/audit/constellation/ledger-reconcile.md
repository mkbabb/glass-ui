# ledger-reconcile — the cross-repo ledgers are MOSTLY-RECONCILED but carry one false head (keyframes=4.0.0 not 3.0.0), an undone ADOPT-NOW bump in fourier, and 4 STILL-LIVE name-forward asks AW does not touch

Reconciled the fourier hub ledgers (`ADOPTION-ASKS.md` all rows, `CONSTELLATION.md`,
`PRECEPTS-SYNC.md`, `DOCK-ANIMATION-CONVERGENCE.md`) + `glass-ui/docs/tranches/AV/UNION-COORDINATION.md`
against every sibling's ACTUAL HEAD today (2026-06-07). npm latest verified live:
glass-ui=3.3.0, value.js=0.11.0, keyframes.js=**4.0.0**.

## Findings

1. **The four glass-ui DONE-in-3.2.0/ADOPT-NOW asks are TRUE at glass-ui's source — verified.**
   The §10 re-ground claims hold against glass-ui HEAD: useId VT-name
   (`GlassDock.vue:144` `glass-dock-${useId()}`, `DockLayerGroup.vue:70` `vtId = useId()`,
   :74 `gl-dock-stack-${vtId…}`); `inert` a11y closure (`ConfiguratorLayer.vue:138`
   `:inert="!open || undefined"` + :137 `:aria-hidden="!open"`); `asideSide`
   (`Configurator.vue:85` prop, :101 default `"right"`, :162/:165/:172 the grid-column +
   border-side flip, :146 `asideWidth` band). All shipped, all in 3.3.0.
   Disposition for these 3 glass-ui asks (`glass-ui-dock-vt-name`, `glass-ui-a11y`,
   A-3 `asideSide`): **DONE — STALE-CLOSE the glass-ui side; the consumer-adopt half is STILL-LIVE** (Finding 3).

2. **`keyframes.js` npm latest = 4.0.0 — every ledger that says "keyframes 3.0.0 PUBLISHED" is STALE-HEAD.**
   `CONSTELLATION.md:23/:136`, `UNION-COORDINATION.md:251/:287/:309` all pin keyframes at
   `^3.0.0`. Live `npm view @mkbabb/keyframes.js version` = **4.0.0**. keyframes' OWN
   `package.json:89` already consumes `@mkbabb/glass-ui": "^3.3.0"` and :86 `value.js": "^0.11.0"` —
   so keyframes shipped a MAJOR past the ledger snapshot and already adopted glass-ui 3.3.0.
   The glass-ui peer range `^2.2.0 || ^3.0.0` (`package.json:615`) does NOT admit keyframes 4.x —
   a future fold. Disposition: **STALE-CLOSE** (fourier arm: correct the "3.0.0" head to 4.0.0
   across CONSTELLATION/UNION docs).

3. **fourier's ADOPT-NOW bump is NOT executed — the four "dissolve on the bump" asks are STILL-LIVE on the consumer side.**
   `fourier-analysis/web/package.json:14` is STILL `"@mkbabb/glass-ui": "^3.1.0"` (:15 keyframes
   `^2.2.0`, :18 value.js `^0.10.0`). The §8/§10 ledger says the unblock is "a one-line `^3.1.0`→`^3.2.0`
   bump" — that bump has not landed. Consequently the two a11y keystones are STILL `test.fixme`'d
   (`visualization-ux.spec.ts:110/:133`, `visualization-crud.spec.ts:630`), exactly as the ledger
   booked them pending the bump. Disposition: **STILL-LIVE — fourier-local arm** (NOT glass-ui's;
   inv-16 — fourier executes the bump + un-fixme on its own clean checkout). The bump target is now
   `^3.3.0` (npm latest), not the ledger's frozen `^3.2.0`.

4. **A third fourier a11y keystone (`AnimationControls dropdown-open`, `visualization-ux.spec.ts:192`)
   is fixme'd but is NOT a glass-ui ask — it is fourier's own component.** :188-190 attributes it to
   the same `^2→^3` bump sweep. It rides the bump but is fourier-local; no glass-ui row covers it,
   and none should (inv-15 — no glass-ui consumer for a fourier-internal dropdown). Disposition:
   **STILL-LIVE — fourier-local** (no glass-ui wave).

5. **A-1 (`ConfiguratorLayer` machined-groove inter-row divider) is STILL-LIVE — but the ledger row
   omits that a PARTIAL flat-hairline opt-in already shipped.** A `dividers?: boolean` prop EXISTS
   (`ConfiguratorLayer.vue:53`) and applies a FLAT `[&>*+*]:border-t border-border/30` (:148-149).
   The A-1 ask is specifically the `.instrument-rail` TWIN-LINE machined groove (top catch-light +
   bottom under-shadow, `instrument-chassis.css:8`) — that richer treatment is genuinely absent (no
   configurator groove CSS; `grep -rln configurator src/styles/` → only tokens.css). So the ledger's
   "A-1 absent at 3.2.0" claim is CORRECT for the machined groove, but the row should note the flat
   `dividers` opt-in shipped (it changes the scope from "add a divider" to "upgrade the divider to
   the groove"). Disposition: **STILL-LIVE → FOLD-INTO-WAVE** (glass-ui successor; the AW glass-atoms
   waves W22-26 are the natural home, or a configurator-polish slice — see Wave-forming input).

6. **A-2 (`label`/`sub` → typography ladder) is STILL-LIVE and TRUE-absent.** `ConfiguratorLayer.vue:112`
   still binds magic literals `text-small font-semibold` (note: AS/FINAL.md:154 says `text-sm` — the
   actual class is `text-small`, a minor doc drift) and :117 `text-micro font-mono` — no ladder rung,
   no section-title token. Disposition: **STILL-LIVE → FOLD-INTO-WAVE** (glass-ui successor; AW
   has no named configurator-typography wave — candidate to fold into W22-26 atoms or a polish slice).

7. **value.js name-forward (D5/UNION §4) is STILL-LIVE — the local blob/watercolor copies persist.**
   `value.js/demo/@/components/custom/goo-blob/` and `…/watercolor-dot/` BOTH still exist at HEAD.
   value.js `package.json:69-70` still pins `glass-ui": "file:../glass-ui"` + `keyframes.js": "file:../keyframes.js"`
   (the cascade-vjs `file:`→`^published` ask, ADOPTION-ASKS row, is also UNDONE — :102
   `unplugin-vue-markdown": "^29.2.0"` not the booked `^32.0.0`, :106 vite already `^8.0.13`).
   Disposition: **STILL-LIVE — value.js-M arm** (the M.W7 blob-extirpation onto `/goo-blob` +
   `/watercolor-dot` + injected ColorResolver; gated on the glass-ui 3.3.0 demo-dep bump, which the
   `file:` link partially satisfies but the SemVer-pin migration does not). cascade-vjs also STILL-LIVE.

8. **keyframes name-forward (`/keyboard` full surface, UNION §4) is STILL-LIVE.** keyframes demo
   (`AnimationControlsGroup.vue:142`) imports ONLY `registerShortcut` from `@mkbabb/glass-ui/keyboard`
   — `formatCombo`/`useRegisteredShortcuts` are not adopted (grep across demo found only
   `registerShortcut`). Matches UNION §4's "keyframes demo currently uses only `registerShortcut`."
   Disposition: **STILL-LIVE — keyframes arm** (non-blocking demo polish; not a glass-ui write).

9. **D8 (devDependency keyframes harmonize) is UNDONE at the `at-dock-convergence` HEAD.** glass-ui
   `package.json:615` peer = `^2.2.0 || ^3.0.0` but :646 devDependency = `^2.2.0` (not harmonized).
   This is an AV.W0 item per UNION D8 — AV (3.3.0) was supposed to harmonize it, but the branch HEAD
   still shows the split. The lockfile (`package-lock.json:318/:341`) resolves keyframes 2.2.0 +
   value.js 0.10.0 — so cascade-gui (the lockfile-regen ask) is ALSO still relevant if glass-ui
   re-pins to the published peers. Disposition: **STILL-LIVE — glass-ui arm**; D8 is a candidate
   AW.W0-style hygiene fold (devDep should be `^2.2.0 || ^3.0.0`, or widened to admit keyframes 4.x).

10. **The deploy/CI/Mongo/route asks (Asks 1-7, inv-22-color, csp-solver routes, words-spa) are
    OUT-OF-SCOPE for any glass-ui or AW wave.** These are maintainer-owned deploy-spine / backend
    asks against speedtest/words/muster/value.js-palette-api — none touch a glass-ui surface or a
    glass-ui consumer-adoption path. Verified they remain in the §4 stale-watch table (OPEN,
    re-affirmed G.W8). Disposition: **STILL-LIVE — sibling maintainer arms** (no glass-ui/AW edge);
    listed here only to confirm they are NOT AW adoption-wave inputs.

11. **The two value.js cohort asks + the P5-phantom are correctly terminal.** `valuejs-J-atomdiff` +
    `valuejs-J-publish` are DONE-in-sibling (the ledger flip is corroborated by keyframes already
    on value.js `^0.11.0` and value.js npm=0.11.0). `glass-ui-P5-inner-rounding` is correctly
    KILLED-AS-PHANTOM — verified `Configurator.vue:130` owns the radius at the container clip
    (`rounded-panel … overflow-hidden`) and `ConfiguratorLayer.vue:92` documents the deliberate
    no-per-section-radius decision. Disposition: **DONE / KILLED — no action** (do not re-book P5).

## Wave-forming input

- **No NEW glass-ui WAVE is created by the ledger reconcile.** The only glass-ui-owned still-live
  ledger asks are A-1, A-2 (configurator polish) and D8 (devDep hygiene). AW already plans the
  GLASS ATOMS reform (W22-26) and a dock/spring/token canon — A-1/A-2 should be **folded as a small
  configurator-polish slice** (or into W22-26's cross-primitive sweep), NOT a standalone wave:
  - **A-1 scope** (file bounds: `src/components/custom/configurator/ConfiguratorLayer.vue:94/:148`
    + a new `src/styles/configurator.css` or fold into an atoms sheet): UPGRADE the existing flat
    `dividers` opt-in to the `.instrument-rail` twin-line machined groove (port the catch-light +
    under-shadow recipe from `instrument-chassis.css:54`-band; reuse `--surface-tint-*`). Note: the
    flat hairline ALREADY ships — scope is groove-upgrade, not net-new divider. Budget precondition:
    `index.css` at 99.5% per AS/FINAL.md:152 — needs a budget rebase first (the AV cut already
    re-baselined per `bea3f99`; re-check headroom).
  - **A-2 scope** (file bound: `ConfiguratorLayer.vue:112/:117`): swap magic literals
    `text-small font-semibold` / `text-micro font-mono` → typography-ladder rungs at the component
    root. ≈0 net CSS (rungs ship). Gate sketch: a visual-diff gate (restyles EVERY configurator
    label across all consumers) — wire to the AW Lighthouse/visual-baseline instruments (W32).
  - **D8 scope** (file bound: `glass-ui/package.json:646`): harmonize devDep to
    `^2.2.0 || ^3.0.0` (or widen peer+dev to admit keyframes 4.x, given keyframes npm=4.0.0).
    Gate: `proof:color-acyclic` + a dev/downstream version-parity check. Belongs at an AW.W0-style
    hygiene front.

- **Sequencing edges (the fourier/sibling arms apply, NOT glass-ui):**
  - fourier ADOPT-NOW bump `^3.1.0`→`^3.3.0` (Finding 3) is the HARD predecessor of un-fixme'ing the
    3 a11y keystones + enabling DEC-2 `asideSide`. Sequenced on glass-ui 3.3.0 (PUBLISHED — no wait).
  - value.js-M blob-extirpation (Finding 7) is sequenced on glass-ui 3.3.0 demo-dep + the
    cascade-vjs `file:`→`^3.3.0` SemVer migration. Both fourier and value.js bump to **3.3.0**, not
    the ledger's frozen `^3.2.0` — the ledger's bump-target string is stale by one minor.
  - **CRITICAL adoption note for ALL consumers that mount GlassDock** (per the AW context): 3.3.0
    carries the KNOWN dock-collapse regression (width-morph freezes on first expand); the fix is
    AW.W1 → 3.4.0. So the fourier/value.js/keyframes/slides bumps that the ledger sequences on
    "3.3.0" should land on **3.4.0** if they mount the simple two-layer collapsing dock. keyframes
    is ALREADY on `^3.3.0` (`package.json:89`) — flag for the keyframes arm.

## Anti-findings (verified FINE / already done)

- **glass-ui's own source-side dock-vt-name + a11y-inert + asideSide are DONE and shipped in 3.3.0**
  (Finding 1) — glass-ui owes nothing further on these three; only consumer-adopt remains.
- **value.js cohort asks (atomdiff + publish) + the [P0] public-view filter are DONE-in-sibling**
  (Finding 11) — value.js npm=0.11.0, keyframes already consumes value.js `^0.11.0`; corroborated.
- **`glass-ui-P5-inner-rounding` is correctly KILLED-AS-PHANTOM** (Finding 11) — container-owned by
  design; verified `Configurator.vue:130`. Do NOT re-book.
- **The §10 re-ground verdicts are accurate against glass-ui HEAD** — every glass-ui file:line the
  ledger cites (GlassDock useId, ConfiguratorLayer inert, Configurator asideSide) verified present.
- **PRECEPTS-SYNC: glass-ui + value.js BOOKED (dirty precepts submodule)** — glass-ui's
  `docs/precepts` is indeed dirty (git status shows `m docs/precepts`), consistent with the booking;
  no fourier lever; correct.
- **The deploy/CI/route/Mongo asks (Asks 1-7) are correctly NOT glass-ui/AW inputs** (Finding 10).

## Summary

Ledger reconcile against all HEADs (2026-06-07; npm: glass-ui=3.3.0, value.js=0.11.0,
keyframes=4.0.0). Verdict: the §10 re-ground is ACCURATE at glass-ui's SOURCE — useId VT-name,
`inert` a11y, and `asideSide` are all shipped in 3.3.0 (STALE-CLOSE the glass-ui side). But the
CONSUMER half is STILL-LIVE: fourier's pin is still `^3.1.0` (ADOPT-NOW bump undone; 3 a11y
keystones still `test.fixme`'d), value.js still carries local goo-blob/watercolor copies +
`file:` pins, and keyframes' demo uses only `registerShortcut`. One FALSE-HEAD: every doc says
"keyframes 3.0.0" — npm latest is 4.0.0, and keyframes already consumes glass-ui `^3.3.0`. Two
glass-ui-owned asks survive: A-1 (machined-groove divider — note a FLAT `dividers` opt-in already
shipped, so scope is groove-UPGRADE) + A-2 (label→ladder), both FOLD-INTO a small AW configurator-
polish slice, NOT a new wave; plus D8 devDep harmonize (still split at HEAD). Consumer-bump targets
in the ledger say `^3.2.0` — stale; real target is `^3.4.0` for any GlassDock-mounting consumer
(3.3.0 dock-collapse regression). All deploy/CI/Mongo/route asks (Asks 1-7) are sibling-maintainer
arms, NOT AW inputs. No new glass-ui wave is created by ledger reconcile.

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/ledger-reconcile.md
