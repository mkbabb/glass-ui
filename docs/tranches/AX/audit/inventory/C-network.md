# AX Inventory — C-network — the constellation as a whole

**Lane.** The cross-repo NETWORK coherence — glass-ui as both publisher (to consumers) and
consumer (of keyframes/value); the consumer edges (speedtest/slides/words/fourier/bbnf); the
publisher edges (keyframes.js/value.js); bbnf-lang. The contract-v2 dev-resolution, the
publish-gated edges (W34/W35/W41), the `proof:resolution`/`proof:consumers` gates. **This lane
is the GESTALT** — the topology + the publish-cadence DAG + the cross-cutting invariants the
per-edge lanes (C-publishers, C-speedtest, C-slides, C-slides-glassui, C-words-fourier,
W-close-crossrepo) each see only one slice of. Read-only; tranche-development planning only.

**Inventory base (live-verified this audit, 2026-06-08).**
- glass-ui: `at-dock-convergence @ 77c08c5` (past the dispatch `c72d2ac`), **version 3.8.0**,
  npm-latest **3.8.0**.
- keyframes.js: `tranche-i-dev`, npm-latest **4.1.0**.
- value.js: `tranche-f-handoff`, npm-latest **0.11.1**.

---

## §0 — Headline finding (the network gestalt)

**The constellation is in BETTER shape than the AX charter (written against `eaba94f`/3.6.0)
assumed — but it is NOT converged, and the convergence is BLOCKED at exactly ONE node: glass-ui's
own AX close.** Three independent facts compose into the network picture:

1. **The publisher spine is HEALTHY + already converged.** Both upstream publishers
   (keyframes.js 4.1.0, value.js 0.11.1) publish GREEN via CI on a `v*` tag (OIDC provenance).
   The three cross-repo debts the charter feared — keyframes-4's `file:`-link `npm ci` breaker,
   the E2 value-0.11 cap, the `getTimingFunction` export drop — are ALL CLOSED at the publisher
   source. The publisher→glass-ui edge is clean; what remains for W41 is glass-ui-INTERNAL.

2. **Every consumer edge is library-COMPLETE, consumer-NOT-STARTED — and uniformly gated on the
   SAME hinge.** Each consumer (speedtest 3.7.0, slides 3.7.0, words 3.0.0, fourier 3.1.0,
   keyframes pin ~3.5.1, value.js demo file-link, bbnf playground) measures a STALE glass-ui and
   has its adoption leg gated on `(glass-ui AX cut publishes) → (consumer pin-bumps)`. The
   library-side obligations have all SHIPPED at HEAD; the gap is uniformly CURRENCY + RECORDING,
   not structural mis-consumption.

3. **The single convergence blocker is glass-ui's own close, and it has TWO sub-blockers.** (a)
   The W19/W20 PRUNE is INCOMPLETE in glass-ui (header-ribbon/glass-panel/useTokenColor/
   glass-carousel still in the tree + subpath-exported despite W19's "DEVELOPED" status) — so the
   W35 keyframes-migration DAG cannot even begin, and its predecessor is unmet. (b) The W34 §16
   receiver + the publish-currency hinge are UNWRITTEN (`CONSTELLATION.md` is the narrow W17 band-E
   stub, the W34 ledger json does not exist) — so the network has no single coordination ledger.

The network's convergence is a STRICT SEQUENTIAL DAG rooted at glass-ui's AX close. Nothing
downstream greens until glass-ui publishes the AX cut from a provenance-clean (`master`-sourced)
line. **glass-ui is the constellation's keystone, and the keystone is unset.**

---

## §1 — The constellation topology (the network graph)

Two edge classes meet AT glass-ui. glass-ui is the ONLY node that is both publisher AND consumer.

```
   PUBLISHER SPINE (glass-ui is the consumer)          CONSUMER FAN-OUT (glass-ui is the publisher)
   ─────────────────────────────────────────          ──────────────────────────────────────────────
   value.js ──(peer/devDep)──┐                                ┌──► speedtest      (pin ^3.7.0, inst 3.7.0)
   (0.11.1, sink)            │                                ├──► slides         (pin ^3.7.0, inst 3.7.0)
                            ▼                                 ├──► words          (pin ^3.0.0, inst 3.0.0)
   keyframes.js ─(peer/devDep)─► glass-ui ──(npm dist)──┤    ├──► fourier        (pin ^3.1.0, inst 3.1.0)
   (4.1.0, value^0.11.1)        (3.8.0, 77c08c5)              ├──► keyframes.js   (optionalDep ~3.5.1, demo-only)
                                                              ├──► value.js       (demo file:../glass-ui)
                                                              └──► bbnf-playground (declared range; proof:consumers scan)
```

**The edges, by direction + nature:**

| Edge | Direction | Nature | State |
|---|---|---|---|
| value.js → glass-ui | upstream publisher | peer `^0.10.0\|\|^0.11.0` + devDep `^0.10.0` | publisher 0.11.1 published; glass-ui devDep LAGS at floor `^0.10.0` (W41 item 2) |
| keyframes.js → glass-ui | upstream publisher | peer `^2.2.0\|\|^3.0.0\|\|^4.0.0` + devDep `^2.2.0` | publisher 4.1.0; devDep LAGS at floor `^2.2.0` (W41 gated bump) |
| glass-ui → speedtest | consumer | reader-only (inv-16); subpath imports | 3.7.0 installed; R-CONSUME bump pending; W53 tabs + apple-spring break latent |
| glass-ui → slides | consumer + `/deck` reservation | subpath imports; fourier-field/constellation/deck-progress consume | 3.7.0; L-band (W30-W32) NOT-STARTED; fourier-field consumed |
| glass-ui → words | consumer | broad base-component (142 sites); 0 new-idiom adoption | 3.0.0 (BROKEN pre-3.4.0 dock); publish-currency gap |
| glass-ui → fourier | consumer | DOCK+Configurator+Slider HEAVY | 3.1.0; prime dock-band live-validation target; holds 4 shipped fixes hostage |
| glass-ui → keyframes.js | consumer (demo-only) | optionalDep; EditorShell+EasingCurveCanvas import prune-targets | ~3.5.1; W35 migration BLOCKED on glass-ui prune |
| glass-ui → value.js | consumer (demo-only) | `file:../glass-ui` link; useLayerTransition/blob/watercolor forks | tranche M is the executor (M.W1/W3/W5/W7) |
| glass-ui → bbnf-playground | consumer | dock+slider+dialog+tooltip dogfood | declared range; dock prop-migration leg (W04) |

**bbnf-lang's two roles.** bbnf-lang is (a) a glass-ui consumer via its `playground/` (one of the
4 repos `proof:consumers:static` scans — confirmed: the gate scans `speedtest`, `fourier-analysis`,
`words`, `bbnf-lang`), and (b) the SOURCE of the carry-ledger discipline (the BD-G7 carry-tag form,
`rg -n 'BD->B[A-Z]' returns zero IS the gate`) that W34's chronic-closure meta-invariant adopts.
The charter's per-consumer census does NOT enumerate a bbnf-lang idiom leg (it cites bbnf-buddy +
bbnf-playground, which are distinct repos) — bbnf-lang is a methodology-provider + a static-scan
consumer, not an idiom-census subject. (Confirm at W34: is `bbnf-lang/playground` a real
new-idiom-adoption leg or only a retired-subpath-clean static-scan node? The static gate scans it;
the idiom census does not name it — a small GAP to reconcile.)

---

## §2 — The publish-cadence DAG (the convergence sequence)

The network converges along ONE sequential DAG. Every consumer leg is at the TAIL; glass-ui's close
is the ROOT. The order is forced by contract-v2 (consumers dev-resolve the BUILT `dist/` of the
PUBLISHED line — a stale `dist/` cannot mislead them, so nothing greens until the publish lands).

```
[0] value.js publishes (the sink)                                    ── DONE (0.11.1 on npm)
        │
[1] glass-ui bumps value peer/devDep ^0.10.0 → ^0.11.0 (W41 item 2)  ── NOT-STARTED (devDep at floor)
        │
[2] glass-ui FINISHES the W19/W20 prune (header-ribbon/glass-panel    ── NOT-STARTED (prune INCOMPLETE;
        │   /token-color/glass-carousel excision)                          W19 "DEVELOPED" is OVER-CLAIMED)
        │
[3] keyframes migrates EditorShell→local-chrome + EasingCurveCanvas   ── BLOCKED on [2]
        │   →<Card surface="glass"> (W35 migrate gates GREEN)              (W35 cross-repo gates absent both sides)
        │
[4] glass-ui CLOSES AX (W33: gate-fleet, ci.yml drift, proof:ax-final, ── NOT-STARTED (proof:ax-final absent,
        │   carry-closure, README live-currency, inheritance ledger)       FINAL.md absent, 11 orphans, ci.yml 20-gate drift)
        │
[5] at-dock-convergence → master merge + provenance-clean re-tag       ── NOT-STARTED (3.8.0 published from a
        │   (the slides provenance-rule keystone)                          branch-tip, NOT master — slides rule VIOLATED)
        │
[6] glass-ui PUBLISHES the AX cut (W41 dts-watch hinge keeps dist fresh)── 3.8.0 published, but pre-close + branch-tip
        │
[7] CONSUMER FAN-OUT (each gated on [6], sibling-executed, post-publish):
        ├── speedtest R-CONSUME (bump + W53 tabs + apple-spring re-point)── NOT-STARTED (latent-broken at next cut)
        ├── slides L-band (bump + W30-W32 + deploy + prod-validate)      ── NOT-STARTED (the §21 leg-2 hinge)
        ├── words leg (bump = dock un-break; @source; Fraunces adjudicate)── NOT-STARTED (DROPPED, §16.4 refold)
        ├── fourier leg (bump unblocks 4 fixes; .cartoon-card; live-val) ── NOT-STARTED (prime dock validator)
        ├── keyframes consume-bump (~3.5.1 → AX; specular="off" tidy-up) ── COSMETIC (kf green on 3.5.1, NO urgency)
        └── value.js M.W7 (consume AX cut; cut value v1.0.0)             ── PLANNING (tranche M, awaits AX cut)
```

**Critical DAG observations:**
- **[0] is DONE** — the publisher sink already published. The spine is unblocked at the top.
- **[2] is the true blocker** — the W19/W20 prune INCOMPLETE state is the headline divergence
  (W-close-crossrepo §reality + C-publishers §D both flag it). It blocks W35 [3] AND the prune
  publish. **W19's PROGRESS status "live-verified (DEVELOPED)" is a status-inflation** — at HEAD,
  only disco-glyph + glyph-face were struck (per `c72d2ac`); header-ribbon/glass-panel/token-color/
  glass-carousel survive in the tree + exported. The W33 close-honesty checklist MUST catch this.
- **[5] is a network-invariant violation already in flight** — 3.8.0 was published from
  `at-dock-convergence` (a branch tip), NOT `master`. The slides standing rule ("only pin a
  main-sourced publish") is structurally VIOLATED for the whole consumer fan-out. The
  `at-dock-convergence → master` merge + a provenance-clean re-tag is a HARD predecessor of every
  honest consumer re-pin — surfaced by C-slides §8 + C-slides-glassui §5, this is a NETWORK-LEVEL
  keystone the per-consumer lanes each glimpse but only the network lane names as a single blocker.
- **The fan-out [7] is embarrassingly parallel** once [6] lands — every consumer leg is
  independent, sibling-executed, and idempotent against the published cut.

---

## §3 — The three publish-gated waves (W34/W35/W41) — network roles

The three band-N waves are the network's coordination machinery. Each owns a DISJOINT slice; together
they are the constellation's convergence apparatus.

| Wave | Role in the network | Writes | Reality at HEAD |
|---|---|---|---|
| **W34** | the §16 RECEIVER HUB — records every consumer leg + every glass-ui-debt routing; the carry-closure forcing-function | `coordination/CONSTELLATION.md` (§16 bands) + `audit/W34-*.json` (ABSENT) | **PARTIAL (stub)** — CONSTELLATION.md is the W17 band-E stub; the §16 receiver bands + the ledger json + the per-consumer census are UNWRITTEN. 2 inbound `from-*` notes filed |
| **W35** | the keyframes prune-migration DAG — migrate-before-prune so the W19/W20 prune publishes safely | migration annexes + CONSTELLATION.md band-N | **NOT-STARTED + BLOCKED on [2]** — the in-glass-ui prune is incomplete, so W35's predecessor is unmet; cross-repo gates absent both sides |
| **W41** | the glass-ui-OWNED supplier-edge — the dts-watch contract-v2 keystone every consumer dev-resolves through | `package.json` + `scripts/` + CONSTELLATION.md band-N supplier subsection | **NOT-STARTED (impl)** but **RE-SCOPED smaller** — 3 of 4 charter items CLOSED at publisher; real residue = dts-watch arm + peer-devdep parity + `proof:peer-conformance` re-pin/register + forward export-stability gate |

**The W41 re-scope is the network's most important charter-staleness correction.** The charter's W41
feared 4 supplier-edge debts; C-publishers re-measured them LIVE against the publisher source and
found 3 CLOSED:
- **3a (keyframes-4 file:-link)** — RESOLVED. keyframes declares `@mkbabb/glass-ui: ~3.5.1` as a
  registry-range `optionalDependency`, NOT a `file:` link; `files:["dist"]` (glass-ui not in tarball).
  The 4.0.1 republish handoff is NO LONGER NEEDED — DROP it.
- **3b (E2 value-0.11 cap)** — RESOLVED at keyframes 4.1.0 (bumped its value dep to `^0.11.1`); a
  consumer holding glass-ui aurora + keyframes-4.1 resolves a single value 0.11.x. Cap GONE.
- **4 (getTimingFunction drop)** — symptom MOOT (restored in keyframes 4.x); the FORWARD
  export-stability gate is still owed as protection, distinct from the moot symptom.

What HOLDS (glass-ui-internal, W41-owned): the `build:watch` dts arm (LIVE-CONFIRMED JS-only:
`"build:watch": "vite build --watch"` with no `emit-types`), the peer↔devdep parity (LIVE-CONFIRMED:
devDep `keyframes ^2.2.0`/`value ^0.10.0` vs peer `^2.2.0||^3.0.0||^4.0.0`/`^0.10.0||^0.11.0`), and
the `proof:peer-conformance` orphan — which carries TWO staleness bugs INSIDE it (pins keyframes
4.0.0 but latest is 4.1.0; its "non-resolvable" dual-instance prose is TRUE for 4.0.0, FALSE for 4.1.0).

---

## §4 — Contract-v2 dev-resolution health (the network's resolution invariant)

contract-v2 (`docs/precepts/cross-repo-dev-resolution.md` invariant-30) is the network's binding
resolution model: every consumer dev-resolves the BUILT `dist/`, dev and prod alike; every
`@mkbabb/*` publisher runs `build:watch` to keep `dist/` fresh while a consumer's dev server is up.

**Network health of contract-v2:**
- **The dts-freshness keystone is BROKEN at BOTH publisher edges.** glass-ui's `build:watch` is
  JS-only (W41 item 1); value.js's `build:watch` is ALSO JS-only (`vite build --mode production
  --watch`, no dts arm). So a consumer dev-resolving either publisher's `dist/*.d.ts` while its
  watch runs gets STALE types. This is the ROOT CAUSE of value.js's 75 TS7016 stale-dist-typecheck
  class (K.W2). **The fix is two-sided:** W41 is glass-ui's arm; value.js's own M.W1 is its arm
  ("make build:watch dts-emit, §2.3 freshness parity"). The network needs BOTH for the dts-freshness
  keystone to hold across the constellation — W34/CONSTELLATION.md must record value.js's M.W1 as the
  sibling-session executor of the value-side arm so the keystone is met on BOTH publisher edges.
- **The `development` export condition is GONE everywhere** (value.js dropped it in `4c8c532`;
  glass-ui's exports are contract-v2-shaped `{types,import,default}`). This half of contract-v2 is
  CLEAN across the network.
- **`proof:resolution` (the fail-closed resolution gate) is GREEN at glass-ui** (`proof:resolution`
  + `verify-export-types` confirm the subpath publication surface intact).
- **`proof:consumers:static` scans 4 consumer repos** (speedtest/fourier/words/bbnf-lang) for live
  retired-subpath imports. LIVE state: it RED-flags ONLY speedtest's `/responsive-tabs` (the W53
  retirement) — words/fourier carry zero live retired-subpath sites; the network's retired-subpath
  hygiene is GOOD except the one publish-gated speedtest leg.

**The network's contract-v2 gap is the dts arm at the two publishers — a two-repo coordinated fix,
recorded but not landed.**

---

## §5 — DONE / PARTIAL / NOT-STARTED / AT-RISK (network-level)

**DONE (network-converged, verified this audit):**
- Publisher spine top: value.js 0.11.1 + keyframes.js 4.1.0 both published GREEN via CI/provenance.
- The 3 feared keyframes/value supplier-edge debts (file:-link, E2 cap, getTimingFunction) CLOSED
  at the publisher source.
- contract-v2 export-shape (`{types,import,default}`, no `development` key) clean across the network.
- `proof:resolution` + `verify-export-types` GREEN; subpath surface intact.
- Retired-subpath consumer hygiene GOOD (only speedtest `/responsive-tabs` flagged, publish-gated).
- keyframes is FULLY GREEN + NOT BLOCKED on ~3.5.1 (its 3.8.0 consume is COSMETIC, no urgency).

**PARTIAL:**
- W34 §16 receiver — `CONSTELLATION.md` is the W17 band-E stub; 2 inbound notes filed; the ledger
  json + the per-consumer census bands are unwritten.
- W41 — re-scoped smaller; `proof:peer-conformance` exists but untagged-orphan with stale 4.0.0 pins.
- Contract-v2 dts arm — broken at both publisher edges; both fixes recorded (W41 + value M.W1), neither landed.
- value.js W34 leg — fully SPEC'd as tranche M (M.W1/W3/W5/W7), but M is planning-only awaiting the AX cut.

**NOT-STARTED:**
- The W19/W20 prune completion (the [2] blocker — header-ribbon/glass-panel/token-color/glass-carousel
  still in tree + exported despite W19 "DEVELOPED").
- W35 keyframes-migration DAG (BLOCKED on the prune).
- W41 dts-watch arm + parity gate + export-stability gate + `proof:peer-conformance` re-pin/register.
- glass-ui value peer/devDep bump `^0.10.0 → ^0.11.0`.
- The entire consumer fan-out [7] (publish-gated: speedtest R-CONSUME, slides L-band, words/fourier
  legs, value M.W7).
- The `at-dock-convergence → master` merge + provenance-clean re-tag.

**AT-RISK:**
- **Network provenance integrity** — 3.8.0 published from a branch-tip violates the slides
  provenance rule for the WHOLE fan-out; every consumer re-pins against a non-master-sourced line.
- **Status-inflation cascade** — W19 "DEVELOPED" over-claim means downstream waves (W35, W33 close)
  assume a prune that has not landed. The cardinal-lesson class at the NETWORK level.
- **The cardinal lesson binds the publisher edges too** — keyframes' tranche I is the constellation's
  THIRD independent re-discovery of "N green gates over a broken product" (after glass-ui AW + slides
  H). The W34/W35/W41 close must NOT re-launder a green claim: keyframes' B7 + value's M.W7 + every
  consumer leg close on a LIVE consume against the PUBLISHED AX cut, never a headless cross-repo grep.

---

## §6 — DEFERRED items that must FOLD INTO this tranche (network-level)

1. **The two inbound handoff notes must fold into the W34 §16 receiver** —
   `from-keyframes-W8-specular-consume-edge.md` (kf = COSMETIC 3.8.0 consume-bump leg, NO urgency,
   green on ~3.5.1) + `from-speedtest-AV-routed-asks.md` (vt.ready swallow → motion micro-wave/W34;
   demandPark/CompletionSeal → W34/blob substrate; 3 a11y asks → W39/W21). The present
   `CONSTELLATION.md` is the W17 band-E stub, NOT the §16 receiver — confirmed.
2. **value.js's M.W1 build:watch dts-emit (the value-side keystone arm)** — record in CONSTELLATION.md
   so the contract-v2 dts-freshness keystone is met on BOTH publisher edges, not just glass-ui's.
3. **value.js M's publish-spine ordering** (value first → glass-ui value-peer bump → value demo
   consume → v1.0.0) — record as the value.js leg's sequence; it gates the [1] devDep bump.
4. **The `proof:peer-conformance` 4.0.0→4.1.0 re-pin + ci/release registration** — fold into W41
   (the gate is stale against the 4.1.0 publisher reality the AX cut now ships against).
5. **The keyframes B7 specular two-sided consume-edge** — record as a PUBLISH-HINGE leg in W34
   (glass-ui publishes `specular="off"` default at the AX cut; keyframes bumps + rides it).
6. **The slides K-branch re-seed** (the user-flagged 5/6/7 redesign, stranded on a stale 11-slide
   base) + the J-tranche fourier-intensity cross-repo hinge (J.W1/W2 ↔ AX W43) — slides-repo-owned
   but coordinated; record the cross-repo coupling in CONSTELLATION.md.
7. **The `at-dock-convergence → master` merge as the network provenance keystone** — record as the
   sequenced predecessor of every consumer re-pin (W33 close + the merge unblock the whole fan-out).

---

## §7 — GAPS / plan divergences (network-level)

1. **No single network coordination ledger exists.** `CONSTELLATION.md` is the W17 band-E stub; the
   per-consumer HEAD/branch/`git status --porcelain` table for the 8-9 repos (the
   sibling-baseline-capture ritual) is unwritten; the §16.3 idiom census + the carry-tag tables are
   unwritten. The NETWORK has no machine-checkable carry-closure assertion — the W33 close's primary
   input (W34's ledger) does not exist.

2. **The W41 charter is STALE on 3 of its 4 items.** Re-scope to the glass-ui-internal residue
   (dts-watch + parity + peer-conformance re-pin/register + forward export-stability), DROP the
   keyframes-4 republish handoff (closed), keep the E2 reasoning as the gate's encoded invariant.

3. **The W35 dock-spring baseline is stale (`^3.4.0` vs live `~3.5.1`).** The wave doc measures
   +16.3% against `^3.4.0`; keyframes is on `~3.5.1` (retune published) — the dock-spring leg is a
   clean 3.5.1→AX bump, and keyframes' own `proof:dock-morph-settled` (ceil +6%, floor ≥3.5.1) is
   the consumer gate, NOT a re-fix.

4. **The W19/W20 prune incompleteness is a network-blocking status-inflation.** W19 "DEVELOPED" but
   header-ribbon/glass-panel/token-color/glass-carousel survive. W35's precondition is unmet. The
   prune publish cannot land until BOTH the glass-ui excision AND the keyframes migration green. The
   W33 close-honesty checklist must catch this — it is the single most consequential network gap.

5. **The provenance-rule violation is structural + network-wide.** 3.8.0 is a branch-tip publish.
   Every consumer re-pin (slides explicitly, all others implicitly) violates "only pin a
   main-sourced publish" until `at-dock-convergence → master` + a provenance-clean re-tag. The per-
   consumer lanes each see it; only the network lane names it as ONE blocker on the whole fan-out.

6. **bbnf-lang's dual role is under-reconciled.** It is a `proof:consumers:static` scan node AND the
   carry-ledger discipline source, but the §16 idiom census names bbnf-BUDDY + bbnf-PLAYGROUND, not
   bbnf-lang. Reconcile at W34: is `bbnf-lang/playground` a real idiom-adoption leg or only a
   retired-subpath-clean static node? (The static gate scans it; the census does not name it.)

7. **The MEMORY `project_publish_ci_broken` "keyframes publish-local" claim is STALE** (flagged in
   its own 2026-06-07 update; re-confirmed). keyframes 4.0.0 + 4.1.0 both shipped via CI/provenance.
   All three repos (glass-ui/keyframes/value) now publish via CI on a `v*` tag — ONE model. The
   memory should be updated at close.

---

## §8 — The gestalt PATH FORWARD (network-level, planning not code)

The network is a strict sequential DAG rooted at glass-ui's close. The path is SET THE KEYSTONE,
THEN FAN OUT — and the keystone has a precise internal order.

**Phase 1 — set the glass-ui keystone (the network root):**
1. **W41 FIRST among the close band** (dependsOn only W00) — re-derive `build:watch` to co-run
   `emit-types --watch` (the contract-v2 dts-freshness keystone EVERY consumer dev-resolves through);
   bump value peer/devDep `^0.10.0 → ^0.11.0` (representative-point, source-safe); re-pin
   `proof:peer-conformance` 4.0.0→4.1.0 + register it ci/release; author the FORWARD
   export-stability gate; author `proof:build-watch-dts` + `proof:peer-devdep-parity`. RE-SCOPE to
   drop the closed keyframes-4 republish. Land it early so the fan-out resolves against a fresh-dts,
   parity-correct publisher.
2. **W34 the §16 receiver** — re-author `CONSTELLATION.md` as the TRUE per-consumer ledger (the
   sibling-baseline-capture table for all repos + the §16.3 idiom census + the BD-G7 carry-tag
   tables), keeping the W17 band-E seam as a §-section. Fold the 2 inbound notes. Author the
   `audit/W34-*.json` born-RED ledger + the carry-closure meta-assertion (the W33 input). Record the
   value.js leg as tranche M's executor (gated on the AX cut), the keyframes leg as the W35 migration
   + the COSMETIC consume-bump, and the publish-currency hinge for every "still broken" finding.
3. **Finish the W19/W20 prune** (the [2] blocker) — actually excise header-ribbon/glass-panel/
   token-color/glass-carousel; correct the W19 "DEVELOPED" status-inflation. THEN author the W35
   keyframes migration annexes + the born-RED `proof:off-headerribbon`/`proof:off-glasspanel` gates;
   the keyframes session migrates + greens; THEN the prune publishes.
4. **W33 close + the provenance keystone** — register the late-wave fleet, drive the 11 orphans → 0,
   fix the ci.yml 20-gate drift (fail-CLOSED), author `proof:ax-final` + `proof:carry-closure` +
   `proof:prod-validation`, sweep the 4 READMEs against LIVE π captures, the inheritance cross-walk,
   the overfitting audit, the ι-sweep. **Merge `at-dock-convergence → master` + cut a provenance-clean
   re-tag** — the network keystone that unblocks every honest consumer re-pin.

**Phase 2 — fan out (each leg sibling-executed, post-publish, idempotent against the AX cut):**
5. **speedtest R-CONSUME** — bump + W53 tabs migration (5 SFC + 1 test stub + ledger) + apple-spring
   re-point (design call: exit → `--ease-out`, not a bouncy spring) + un-exclude the responsive-tabs
   a11y carve-out. LIVE-audit every migrated tab strip (binding-verification — reka mis-binds no-op).
6. **slides L-band** — bump 3.7.0→3.8.0; re-ground W30/W32 to the live HEAD (`1461683`, J committed);
   forward-cut `tranche/AX-slides`; verify the constellation lattice live (the leak is already fixed —
   VERIFY, never re-fix); W31 content + W32 motion-adoption (`vReveal`/`useCountup`/DeckProgress);
   merge → deploy → prod-validate (the §21 leg-2). Re-seed the K-branch onto live main + execute.
7. **words leg** — bump (the dock un-break); fix the 5 `hsl(var())` never-paint sites; add `@source`;
   ADJUDICATE Fraunces (presets-in-consumers — the consumer's right, NOT an auto-strip); sweep the
   `manual` stale prop (binding-verification). Refold the DROPPED leg per §16.4.
8. **fourier leg** — bump (unblocks 4 shipped fixes); `.cartoon-card` → `<Card surface="cartoon">`;
   the LabeledSlider feature-gap → W21 (NOT a fork-deletion — fourier already migrated its
   slider/timeline shadows to glass-scrubber; correct the stale slice-12 record). fourier is the PRIME
   live-validation target for the AX dock band (W01-W06) + Configurator + graphics.
9. **keyframes consume-bump** — COSMETIC: bump + `specular="off"` tidy-up (removes the inert
   `.glass-specular-track` class already painting nothing). NO urgency — keyframes is green on ~3.5.1.
10. **value.js M.W7** — tranche M consumes the AX cut + cuts value v1.0.0 (the demo's blob/dock/
    watercolor forks retire onto the published glass-ui native surfaces).

**Cardinal-lesson discipline (binds the whole network).** Every consumer leg + both publisher edges
close on a LIVE consume against the PUBLISHED AX cut — never a headless cross-repo grep over a local
working tree, never a re-laundered green claim. Three independent constellation re-discoveries
(glass-ui AW, slides H, keyframes I) of "green gates over a broken product" make this a NETWORK
failure class, not a per-repo accident. The publish-currency findings (Card specular / VT swallow /
useGlobalDark / deriveAurora / the dock un-break / fourier's 4 fixes) are recorded as a PUBLISH
HINGE, NOT re-routed as code defects to re-fix — they are AT HEAD, absent only from the consumers'
stale resolved `dist/`. The corrective is the keystone publish + the pin bumps, in that order.
