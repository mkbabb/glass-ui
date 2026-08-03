# MATERIAL W8 post-landing mechanism critic — candidate 2

**Verdict:** **RED · SOURCE-GREEN / ACCEPTANCE-RED**  
**Critic seat:** Sol x-high, post-landing formation audit only  
**Source landing:** `44621bb4af3a142dbdebb6a7ba6bbefa4dcbcbf7`  
**Close stamp / audited HEAD:** `bb33810cb26debe77436c59df231814693b6fe65`  
**Audit date:** 2026-07-22 EDT

The CSS repair is directionally correct and should not be reverted: the lying `@supports` wrapper is
gone, the blur floor remains outside the latch, and unsupported/error paths normally degrade to blur.
The wave is not honestly closed, however. Its standing gate deliberately never runs the detector or
installer, the installer can preserve a stale unsupported `on` attribute, and the capture recovery can
discard a painted no-backdrop result until a favorable recording appears. The retained latch proof is
a useful current-engine discovery receipt, not a reproducible standing proof of the claimed contract.

## Exact byte pin

The audited W8 slice was clean relative to `bb33810c` even though the shared worktree contained
unrelated foreign changes. Pre-report status digest was
`2d584ca90aace0f3c18684c091b04699e8788be72bdc2679355bfb2e44691a9e`; tracked dirty-patch digest
`67d377b95c2f62d8de0ee553d44acb2cf685d101f3c3c4c9b2b56b3ca43b45c6`; untracked-path digest
`200fd12c574c35bf0469a38495e4d1fee13e14e82982d3180e228a8c371c5f0d`.

| File | SHA-256 |
| --- | --- |
| `src/composables/glass/supportsBackdropRefract.ts` | `6e24147d7d4461b61c08bbd644f7a3284649b1373a5f91742d6595ca37ce4323` |
| `src/composables/glass/index.ts` | `6a7fb10985394ce798888bb7bf65fc5be3320b9bf50ae7173ffa572696ac8eff` |
| `src/styles/glass-refract.css` | `24bd8523ce91cfd89fec33a45dfabda9c7c54d7743c030114a8c0025fb1ee720` |
| `demo/main.ts` | `6e738bbce8ac3a8136996e53d3204cf62932baf53387e830d80e77dd952d9be9` |
| `tests-visual/refract-lens-never-sharper.spec.ts` | `4e529b81bd14a05d77626d414ad2717e705500570b900730c89dcdf4f60e9851` |
| `docs/tranches/BJ/waves/BAND-MATERIAL.md` | `b711a52a85e1cff78f506a1f8317968d53132dff88f3d6b0f13ccaff562be834` |

Evidence hashes: README `4551c3d9…bc9e1`; Chromium report `8cc42b59…0139`; WebKit report
`66ff4a52…51ed1`; discrimination JSON `c925da83…4dd`; Chromium PNG `8076f6b5…df8e`; WebKit PNG
`74b1d011…bf34`.

## Independent probes

- `npx vue-tsc --noEmit --project tsconfig.src.json` — **PASS**.
- `npx playwright test refract-lens-never-sharper.spec.ts --project=webkit
  --project=chromium-headless-new --reporter=line` — **4/4 PASS**, one worker, no runner retries,
  11.5 seconds. This independently confirms the current **unarmed OFF-floor** gate; it does not cure
  the missing armed arms below.
- Both retained PNGs were visually inspected at original resolution. Chromium shows two frosted
  chips, but the corpus retains no quantitative OFF→ON displacement/garnish metric; WebKit's PNG is,
  as its README admits, backdrop-filter-blind.
- A cache-busted Node 26 import of the **real module** with bounded fake DOM/CSS seams traced the
  installer without changing source. SSR returned false and did not throw. Two calls before `body`
  registered two `{ once:true }` listeners, but firing both produced exactly one canvas probe, one
  mount and one removal, leaving the attr absent on a functional negative. The same trace reproduced
  both defects: a preseeded `on` survived honest rejection after the first and second calls; a forced
  `CSS.supports` exception escaped the first call, the second call was suppressed by `armed=true`, and
  the stale `on` remained. Trace result:

  ```json
  {
    "ssr": { "support": false, "armThrew": false },
    "preBody": { "listeners": 2, "listenerOnce": [true, true], "effectiveCanvasProbes": 1, "mounts": 1, "removals": 1, "attr": null },
    "staleFalse": { "afterFirst": "on", "afterSecond": "on" },
    "supportsThrow": { "firstThrow": "forced supports failure", "secondThrow": null, "attr": "on", "effectiveCanvasProbes": 0 }
  }
  ```

## Adjudication

| ID | Status | Finding | Smallest existing-owner redress |
| --- | --- | --- | --- |
| M8-01 | **PASS** | `glass-refract.css:95-113` places only the composite behind `:root[data-glass-refract="on"]`; the un-gated blur base remains available. Restoring the old lying `@supports` reproduces the born-RED WebKit sharpness failure. | Keep these source bytes. |
| M8-02 | **PASS** | `supportsBackdropRefract.ts:101-109` is honesty-ordered for normal native behavior: absent CSS/document, honest parse rejection, always-true shim rejection, then the bounded private raster proxy. The proxy mount is removed in `finally`; its own canvas/readback exceptions fail OFF. | Keep the fail-closed ordering and private 4×4 readback boundary. |
| M8-03 | **PASS** | `demo/main.ts:6-13` installs once at the real root bootstrap, and the export is reachable through the glass and root barrels. The no-emit source typecheck is green. | Keep the single bootstrap rather than per-component forks. |
| M8-04 | **DEFECT** | The standing gate is **latch-insensitive by construction**. Its own comments at `tests-visual/refract-lens-never-sharper.spec.ts:31-35,400-403` say it never arms; the HARNESS contains no installer. Therefore forcing the detector false, deleting the installer, deleting the latched composite, or making the detector falsely positive on WebKit does not change the gate: the lens stays at the blur base and passes. The claim at `supportsBackdropRefract.ts:30-35` / `BAND-MATERIAL.md:841-845` that this gate keeps the proxy honest “forever” is false. | Extend this existing paint gate into explicit OFF, shipped-functional-ON, and forced-false-positive-ON arms on the same shipped CSS. Chromium functional ON must run the real exported detector/installer and show attr + blur floor + quantified garnish. Forced ON on current WebKit must RED because the real backdrop composite drops. Deleting the selector or installer and forcing proxy true must each bite. |
| M8-05 | **DEFECT** | `armGlassRefract()` does not establish its documented **iff**. At `:121-126` it sets `armed=true` and only adds `on` for a positive; it never removes a pre-existing `data-glass-refract="on"`. SSR markup, HMR, a prior bundle, or consumer-authored stale state can therefore leave an unsupported WebKit session ON permanently. | In the one installer owner, reconcile the root attribute on first effective install: positive sets exactly `on`; every negative/exception path removes it. Born-RED: seed `on`, force honest rejection and functional negative, call once and repeatedly, and require attr absent plus blur-only paint. |
| M8-06 | **DEFECT** | The detector is not fully exception→OFF. Only `probeCanvasFilterRaster()` is caught. Either native/stubbed `CSS.supports` call at `:105/:107` can throw after the installer has already set `armed=true`, leaking an exception and preventing recovery while a stale attr remains possible. | Make the whole decision total/fail-closed, not only the canvas body. Mutation: `CSS.supports` throws on the claim arm and on the garbage arm; no exception escapes, no attr remains, and one effective install is recorded. |
| M8-07 | **DEFECT** | The proxy is valid only as a **currently correlated proxy**, not “the SAME capability” or direct paint proof. Production uses a data-URI SVG in `backdrop-filter`; the detector uses a same-document fragment SVG in Canvas2D `filter`. Those differ by rendering pipeline and URL form. Worse, `:61-63` uses the fixed document-global id `gl-refract-probe`; a consumer collision can make the readback resolve a foreign filter and return a false positive or false negative. | Keep the conservative proxy but state its scope honestly, use a collision-proof per-invocation id, and let the armed real-backdrop gate—not prose—police future divergence. Born-RED: preseed same-id identity and force-red filters before calling the detector; neither may control the result, and the probe must leave no node behind. |
| M8-08 | **DEFECT** | The “blind capture” policy can reroll a real rendering failure. At `tests-visual/...:312` any painted scene whose blur twin is sharp (`twin/background > 0.5`) returns `null`; `:326-334` retries up to four times. The observer cannot distinguish a blind screencast from an intermittent engine/product failure to paint `backdrop-filter`. A mutation that omits backdrop paint for attempts 1–3 and paints on attempt 4 passes, contradicting the NEVER invariant and README lines 72-78. | Retry only a recording in which the bare scene itself never painted. Once the scene paints, a missing blur twin is a loud RED, not a recapture. Retain attempt counts and distributions. The delayed/omitted-filter mutation must fail on the first painted sharp-twin capture. |
| M8-09 | **DEFECT** | The implemented explicit bootstrap contradicts the wave's “zero API change / consumers untouched / no MIGRATION row” at `BAND-MATERIAL.md:846-847,897-901,920`. Existing CSS-only `.glass-lens`, `Button :liquid`, and SegmentedTabs consumers that upgrade without calling the new API silently lose refraction on Chromium. The additive export is new; its invocation is now required to preserve prior visual behavior. | Choose one honest contract in the existing owner. The smallest landed-shape cure is to ratify the explicit root installer, document/export it as required bootstrap, add a migration/consumer census, and update every first-party root. Otherwise name and prove a genuinely side-effect-safe automatic installation path. “Honored in spirit” is not a contract. |
| M8-10 | **HOLD** | The external trace confirms SSR safety and one effective probe/mount/removal across two pre-body calls, despite two once-listeners. Those properties still have no retained product test, and DOM-ready/post-ready idempotence, functional positive, package-emitted export and real-DOM leakage remain unproved. The same trace makes stale/throw failures deterministic. | Add the direct lifecycle matrix already specified by `IMPLEMENTATION-ASKS-C2.md` I-3, including one effective probe across repeated pre/post-ready calls and an emitted-package import. |
| M8-11 | **HOLD** | `latch-discrimination.json` is an 18-line conclusion, not a replayable machine receipt: it has no command, script, browser build, timestamp, commit/tree digest, raw pixels, energies, or attempt count. The PNGs have no paired quantified refraction DELTA. The README's “Chromium 26/26” and ~10% threshold story is not backed by retained per-run distributions. | Retain the exact probe script/fixture and raw report, engine versions, command, source SHA, dirty digest, OFF→ON edge/displacement metric, video frame manifest, and every recapture attempt/reason. Computed `url(...)` proves cascade selection, not paint. |
| M8-12 | **HOLD** | Source typechecking passes and the root barrel reaches the export, but no retained package build/`verify:package` receipt proves the new public function survives emitted exports and consumer tree-shaking. | Bank one clean candidate package build, export verification, and minimal installed-consumer bootstrap proof after the installer contract is adjudicated. |

## Born-RED closure matrix

The following mutations are the minimum bite set; each targets an existing W8 owner rather than
minting a new wave:

1. **OFF floor:** restore the lying `@supports` declaration or move the blur base inside the latch →
   WebKit video reads sharper than its blur twin.
2. **Functional ON:** omit `armGlassRefract`, force its detector false, or delete the latched selector
   → Chromium fails attr/refraction-garnish DELTA even though the OFF-floor comparison would pass.
3. **False-positive ON:** force root `on` on WebKit while retaining its accept-and-drop backdrop path →
   the same standing paint invariant REDs.
4. **Stale state:** preseed root `on`, return false/throw → the installer must remove it and remain OFF.
5. **Collision:** preseed `#gl-refract-probe` identity/force-red filters → neither may steer the result.
6. **Capture honesty:** paint the bare scene but omit/delay backdrop paint on the first capture → fail
   immediately; do not recapture until a favorable render.
7. **Installer contract:** exercise a built CSS-only consumer without bootstrap and a migrated consumer
   with bootstrap → the former is explicitly documented as blur-only, the latter proves the retained
   lens behavior.

## Candidate-2 freeze ruling

**BLOCK any candidate-2 freeze that carries W8 as `LANDED`, gate-GREEN, or DONE.** Candidate 2 may
freeze these source bytes only if its normative addendum explicitly reopens W8 as
**SOURCE-GREEN / ACCEPTANCE-RED**, strikes the “standing gate keeps the proxy honest forever” and
“zero API change” claims, and binds M8-04 through M8-12 to the existing MATERIAL W8 owner. A complete
W8 close requires the three armed paint arms, stale/exception/collision lifecycle tests, non-favorable
capture policy, honest installer migration, replayable evidence, and two post-redress Sol x-high
critics. No source revert, engine-specific skin, second refraction mechanism, or consumer-local shim is
warranted.
