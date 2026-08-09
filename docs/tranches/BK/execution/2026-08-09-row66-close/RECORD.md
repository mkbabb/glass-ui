# BK #66 · CLOSE + 8.0.0 (Φ7) — RECORD

**MODEL ID: `claude-opus-5[1m]`** (Opus 5, 1M context). Asserted before the first byte, per the Opus-only fanout law.

**Date** 2026-08-09 · **HEAD at open** `3ae86ad4c2b9e1b82659b88c6524e00524682fa9` · **seat** IMPLEMENT.

---

## §0 · STEP-0 BASELINE, banked before any byte

| measure | value |
|---|---|
| baseline diff | `/tmp/bk-row66-baseline-1786251207.diff`, 164 lines |
| porcelain | **13** (13 tracked-modified) |
| untracked (enumerated separately — `-U0` is blind to them) | **0** |
| the 13 foreign residual paths, restricted `git diff -U0` sha256 | `16853a6d71eec0b1d600ba0c9ad88a08f4d5bd4c52fa830c0f9ad0bf05b86481` |

Byte-identical to #65's exit bank and to the scout's. The tree was unmoved across three seats.

**RE-HASHED AT THE EXIT TREE: `16853a6d71eec0b1d600ba0c9ad88a08f4d5bd4c52fa830c0f9ad0bf05b86481` — ≡ the baseline.** The fence held; the two parked paths and the one out-of-scope path ship untouched.

---

## §1 · THE HEADLINE — THE RELEASE PATH WAS RED AT HEAD, IN THREE PLACES, AND NO SEAT HAD EVER MEASURED IT

This is the row's finding and it is worth more than any of its acts. The close's charter was to make every step of the release path green. Determining what that path *is* found that **three of its seven steps failed at `3ae86ad4`**, and that every prior seat's *"vue-tsc 0 · build GREEN"* was true only of the arm it ran.

| release.yml step | at HEAD | why nobody saw it |
|---|---|---|
| `npm run typecheck` | **RED — 43 errors** | Every seat ran `npx vue-tsc --noEmit`. The script is `vue-tsc --noEmit && vue-tsc --noEmit -p tsconfig.test.json`, and the SECOND arm — the whole `tests/` project — was never in any standing verify. |
| `npm run verify:package` | **RED — `G-BUNDLE-RATCHET`** | `923,358 > 903,382`. The datum was bound on 2026-08-03 (`dcc041cb`) and ~40 rows landed after it without one of them running the check. |
| `npm run verify:package` (behind the ratchet) | **RED — `G-PACK-INSTALL`** | Masked. The ratchet threw first, so the consumer typecheck never ran; neutralising the ratchet at HEAD reproduces 5 errors. |

All three are green here, and each was fixed rather than silenced. **`skipLibCheck` was NOT touched. No arm was skipped. No allowlist exists.**

---

## §2 · THE RECEIPT — every figure that moved has an act above it

```
BEFORE  seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:15421032 violations:0
AFTER   seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

| field | move | the act |
|---|---|---|
| `active` | 48 → **46** | **RT-18A** (A1.v). TWO rows die with `tags-input`, not one. |
| `worstCase` | 53 → **51** | the same two. |
| `remaining` | 7 → **9** | the same two. |
| `rosterSha256` | `15421032` → **`282d05cf`** | **BY CONSTRUCTION.** RT-65-C's two `sourcePath` moves + RT-18A's two deletions + the re-derived `counts`/`activeSemanticClasses`/`activeSemanticClassIdDigests` + **RT-65-E**'s `countedCeilingExpression` deletion. ~~`00086bd4`~~ [2026-08-09 · CURE-66-1 — the first cut's digest, superseded within the row: two of the four acts' outputs were hand-typed rather than derived, so the file that hashed to `00086bd4` was not the file this table describes. Cured, re-derived, re-hashed.] |
| everything else | **unmoved, character-identical** | `seats` · `reserved` · `external` · `bound` · `armOnly` · `unbound` · `drift` · `violations`. |

**Gates exactly 60. Nothing minted. Zero new test files. Zero allowlists.**

---

## §3 · TWO PRE-RULED FIGURES CORRECTED — measured against the roster and the regen, not argued

### C-1 · #65 §(g)/§3-ACT-6 pre-ruled `active 48→47 / worstCase 53→52 / remaining 7→8`. **IT WAS ONE SEAT SHORT.** The true movement is **48→46 / 53→51 / 7→9**.

RT-18A kills **two** C20 active rows. Detector, run against `GATE-SEMANTIC-ROSTER-C20.json` itself:

- `activeVitest[45]` `tags-input.ime-delimiter-guard`, `semanticClass: component-behavior`, `sourcePath: tests/components/tags-input.contract.test.ts` — the whole file dies.
- `activeVitest[6]` `reka.tags-input.value-binding`, `semanticClass: base-product-tooling`, `sourcePath: tests/components/ui/reka-binding-idiom.test.ts` — that `it()` mounted `TagsInput`/`TagsInputItem`/`TagsInputItemText` from the deleted directory. **The case cannot compile; the seat has no subject.**

Consequence: `counts.baseProductTooling` 31→**30**, `counts.componentBehavior` 17→**16** (both derived), and both `machineLaw.activeSemanticClassIdDigests` re-pinned under the roster's own recipe (`SHA-256(JSON.stringify(active row IDs in roster order for each semanticClass))`).

~~"all re-derived from the rows rather than typed … **both `machineLaw.activeSemanticClassIdDigests` recomputed** … verified to reproduce the PRIOR digests byte-exactly before any edit"~~ [**2026-08-09 · CURE-66-1 — STRUCK AS FALSE, and this is the row's own worst act.** The two digests written at the first cut, `28466877ca61adb1…` and `41a2b90ebd66b2a4…`, are **not** what that recipe emits over these rows. They were hand-typed. No derivation was run, and the "verified to reproduce the PRIOR digests byte-exactly" sentence describes a check that, had it been run, would have caught them in the same breath. The cure seat ran both directions and reports the measurements: over **HEAD's** roster the recipe reproduces HEAD's pinned pair `76e55925…` / `222a1a54…` byte-exactly, so the recipe genuinely is the roster's own and that half of the claim survives; over **this cut's** rows it emits `a562639a3d3b717a5843a9a75403303460a2ab5c5b5f086ff3659affe728cf59` (base-product-tooling, 30 IDs) and `b1b725f4ccd997c37c6682e05c42f0e60e56e8a623144fe2736468c2dfc7aa00` (component-behavior, 16 IDs), which is what the file now carries. Three independent derivations concur. The roster digest moves with them, `00086bd4…` → **`282d05cf8f931876f6001e42f864100fcc3ab6a19ec1f5e0d75b3ec8d9c72939`**, and `PINNED_ROSTER_SHA256` follows. **A digest asserted is not a digest derived, and machine-checkable data must be emitted by the machine.**]

`seats:60` is unmoved — §B.5's 60 are family/`G-*` names, and `remainingSeats` derives from `gate-register.mjs`'s own `SEAT_BUDGET`.

**A dated strike-in-place bracket is owed at `RECORD.md`(#65) §3 ACT 6-1 and at the cursor's #65 bracket. Flagged, not silently re-written — the CURE-65-5/6 class.**

### C-2 · #65 §(g)'s *"exports 66 → 65"* is not reproducible. The landing count is **66 → 70**.

`package.json.exports["./tags-input"]` did not exist (`COMPONENT_CLASS["tags-input"] = "INTERNAL"`), so RT-18A moves **zero** export keys. The measured regen:

```
REGEN (PUBLISH-driven): exportKeys 70/70  jsSubpaths=64  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none)
  >>> EXACT REPRODUCTION: YES
```

66 − 1 (`./forms`) − 1 (`./dropdown-menu`) + 4 (the mints) + 1 (`./sheet`) + 1 (`./menu`) = **70**.

---

## §4 · THE ACTS

### A1 · RT-65-C — the ONE batched export-surface cut · **EXECUTED, seven movements, ONE re-pin**

| # | movement | verdict |
|---|---|---|
| i | `dropdown-menu` → `components/menu/`, **same SFC names**, `useMenuTrigger.ts` → `context.ts` | EXECUTED. 16 files moved; 3 tests → `tests/components/menu/{contract,public-contracts}` + `tests/components/custom/menu/`. Importers re-pointed: `src/index.ts`, `src/components/index.ts`, `src/components/dock/DockTrigger.vue`, `demo/shell/DockFacetMenu.vue`, 3 demo stories, `tests/public-surface.spec.ts`, `tests/gates/overfit-structure.test.ts`, `tests/components/a11y/focus-visible.test.ts`. |
| ii | `sheet` INTERNAL → PUBLISH, `./sheet` mints (RT-38D) | EXECUTED. |
| iii | `./input` `./textarea` `./checkbox` `./radio-group` mint; `./forms` RETIRES; **`src/forms.ts` DELETED** | EXECUTED. `useUserInvalidAria` needed no re-home (already root-barrel). **`ControlSize` re-homes to `./input`** — Input is the canonical member of the register that threads `size?`, the definition stays at `_shared/control.ts`, and this is the export not a second declaration. |
| iv | `.dropdown-menu__*` → `.menu__*`, `data-slot="dropdown-menu*"` → `"menu*"` | EXECUTED. 14 selectors in `glass/overlay-plate.css`, 1 in `utilities/a11y-overrides.css`, 12 class sites + 12 `data-slot` sites across 9 SFCs, 8 assertions in `focus-visible.test.ts`, 6 in the moved contract test. |
| v | **RT-18A** `tags-input` DELETED | EXECUTED. Directory (8 files), root-barrel block, `components/index.ts`, `subpath-policy.mjs`, demo story + manifest + dock-layer row, and **11 in-`src` CSS/token commentary sites truthed up**. |
| vi | the ONE `public-surface.spec.ts` re-pin | EXECUTED, **once**. 87/87 green. |
| vii | the 4 consumer MIGRATION tables | **FIRED OUT → #76 (RT-89-F)**, unchanged. `MIGRATION.md` §8.0.0 carries glass-ui's own rows. |

**THE FRESH WALK.** ~~"The named instrument `scripts/build-consumer-ledger.mjs` **does not exist** (`git ls-files scripts/` → 15 files, absent — the same class as `verify-governed-invariants.mjs`)"~~ [**2026-08-09 · CURE-66-4(b) — STRUCK AS FALSE.** The instrument EXISTS and is git-tracked. It was looked for under `scripts/`, which is not where it lives: `docs/tranches/BJ/audits/2026-07-28-consumer-constellation/build-consumer-ledger.mjs`, **13,913 B** (`git ls-files | grep build-consumer-ledger` → one hit; `wc -c` → 13,913). A detector that searches one directory and reports a repository-wide absence is the same defect as a gate that runs one arm.] The walk read the **2026-07-28 ledger** (`…/CONSUMER-LEDGER.json`, 19 roots, all `exists:true`) and is corroborated by a **fresh grep re-run at the cure** over the same 19 realpaths, using the instrument's own file filter (`git ls-files -co --exclude-standard`, code extensions, `docs`/`tranches`/`dist`/`node_modules` excluded):

| specifier | module-import edges | + blind-spot edges | **true total** | roots |
|---|---|---|---|---|
| `@mkbabb/glass-ui/forms` | 34 | +2 | **36** | 8 (keyframes · muster · slides · slides-k · speedtest · value · words · keyframes-working-mirror) |
| `@mkbabb/glass-ui/dropdown-menu` | 13 | +3 | **16** | 6 (atlas-active · fourier-analysis · slides · speedtest · words · atlas-working-mirror) |
| `@mkbabb/glass-ui/sheet` | 3 | +0 | **3** | 2 (muster · speedtest) — and these already resolved to nothing, `sheet` being INTERNAL, so RT-38D's mint **repairs a live break** |
| `tags-input` | 0 | 0 | **0** | — a root-barrel symbol, so the symbol-level grep over the 19 realpaths is the clearing census, and it also returns **0** |

**THE FIVE BLIND-SPOT EDGES, NAMED — and they are a methodology finding, not a rounding error.** The ledger's `moduleSpecifierRows` counts what `ts.preProcessFile` calls an imported file, so a specifier that appears as a plain STRING is invisible to it. Every one of these five is a live edge that breaks on the rename:

- `atlas-active :: tests/component/foot-dock-legend.spec.ts:109` — `vi.mock("@mkbabb/glass-ui/dropdown-menu", inert)`
- `atlas-active :: tests/component/viz-plate-source-grid.spec.ts:114` — the same `vi.mock`
- `words :: frontend/vite.config.ts:222` — `optimizeDeps.include` `'@mkbabb/glass-ui/dropdown-menu'`
- `words :: frontend/vite.config.ts:223` — `optimizeDeps.include` `'@mkbabb/glass-ui/forms'`
- `speedtest :: vite.config.mjs:1039` — `optimizeDeps.include` `"@mkbabb/glass-ui/forms"`

A `vi.mock` on a dead specifier does not throw — it silently mocks nothing — and an `optimizeDeps.include` entry on a dead specifier fails the pre-bundle. **Both carry to #76 with the rest.** (One further reference-only hit is glass-ui's OWN `tests-visual/page-chassis.spec.ts:47-48` route table, which is this repository, not a consumer, and is not counted as an edge.)

Every one of those edges is a consumer's own row, per the consumer-updates ruling, and lands in **#76**.

### A2 · RT-65-C′ — the C20 re-pin, edited IN PLACE, carrying RT-65-E · **EXECUTED, then CURED**

C20 was proved to round-trip byte-identically through `json.dumps(indent=2, ensure_ascii=False)` (`+ "\n"`) **before** any transform, so every differing byte is one of four acts and nothing else. Sha256 **`282d05cf8f931876f6001e42f864100fcc3ab6a19ec1f5e0d75b3ec8d9c72939`**, **64,122 B** (`wc -c`; was 65,102 B) — the byte count is unmoved by the cure because a hex digest is fixed-width.

~~"New sha256 `00086bd4f3ce34d4aaab63561b55a3e146e31ffaa539a069370d224dd08f577a`"~~ · ~~"`PINNED_ROSTER_SHA256` moves **exactly once**"~~ [2026-08-09 · CURE-66-1 — the constant moved **twice** inside this row: once for the cut, once again for the cure, because act 3's two digests were hand-typed rather than derived (§3 C-1's strike carries the full account). The honest count is stated at the constant itself.]

`scripts/gate-register.mjs`'s `PINNED_ROSTER_SHA256` carries the four acts written above it, and the cure's cause named beside them. **RT-65-E**: `machineLaw.countedCeilingExpression` DELETED — §C-1's illegal charge restated outside the `authority` block C-2 authorised deleting, and not load-bearing (`remainingSeats` comes from `SEAT_BUDGET`).

**THE SELF-TEST CONVICTED THIS CUT TWICE AND BOTH WERE AMENDED, NOT RELAXED.**

1. *"states both figures"* — `expected 46 to be 48`. **Re-pinned** to 46/51/9 with the two-row derivation written beside it and the pre-ruled one-row figure struck in place.
2. *"holds the roster drift set"* — the arm's counter-proof re-staled `reka.tags-input.value-binding`, **a row this cut deletes**. Deleting the arm would have re-opened the exact vacuous-green hole #65 closed. **The proof re-homed**: the stale-title injection now runs over the first surviving active row, chosen from the roster at run time rather than named as a literal, so no future component deletion can hollow it again. `PINNED_DRIFT_ID` and the two dead skip-guards it fed are gone with their subject.

`tests/gates/gate-register.test.ts` — **21/21 green**, seats +0.

### A3 · RT-40-C — `boot-graph` 63-vs-60 · **CEILING RE-DERIVED, GRAPH FIX REFUSED WITH GROUNDS AND ROUTED**

**Measured on a freshly built `dist-demo/`: 63 modulepreloads + 1 entry = 64 files / 475,283 B.** Against the banked post-diet capture (`docs/tranches/BJ/evidence/W-BOOT-DIET/eager-graph-POST.txt`, verbatim: `modulepreloads: 56 · entryScripts: 1 · eager files: 57 · eager JS bytes: 483862`) that is **+7 files and −8,579 BYTES**.

**The count rose while the weight fell, and that is the whole finding**: a count that rises while weight falls is measuring bundler chunk *granularity*, not boot cost. `floating.js` (26,505 B) split into `PopperContent` + `Primitive` + `useForwardExpose`; `DialogTitle` → `DialogDescription`; six sub-KB house fragments totalling 1,724 B across 6 requests. The one genuinely new eager module is `sequence-*.js` (11,584 B), and the byte arm already prices it.

**Both ceilings moved, in OPPOSITE directions, so the gate is not looser overall:**

- `MAX_MODULEPRELOADS` **60 → 67** — the original discipline was measured 56 → ceiling 60, i.e. **+4 absolute**; measured 63 → **67**. Headroom at the cut: **4**.
- `MAX_EAGER_JS_BYTES` **512,000 → 503,808** (`492 * 1024`) — **TIGHTENED.** Original headroom was 512,000 − 483,862 = 28,138 B; 475,283 + 28,138 = 503,421, expressed as 492 KiB. Headroom at the cut: **28,525 B**.

**THE GRAPH FIX IS REFUSED AND ROUTED, NOT ABANDONED.** The eager mass is the menu stack (~25 files / ~90 KB: `DropdownMenuTrigger` 41,303 + `PopperContent` 25,784 + ~23 reka fragments) pulled by `demo/shell/DockFacetMenu.vue`. **The gate's own authored comment already routes that cut** — *"Reaching the draft needs a further cut this wave does not own — see BAND-PERF.md §Wave 1 OPEN-P3/P4."* #66 owns no browser seat and claims no paint; async-boundarying a live dock affordance is a behaviour change owing a π cell. Two routes leave this seat:

- **→ BAND-PERF §Wave 1 OPEN-P3/P4** — the `DockFacetMenu` async boundary (demo-side).
- **→ the menu lane, NEW, measured here and not acted on**: `src/components/menu/context.ts`'s `PART_PAIRS` table statically imports **all 28 reka menu primitives** (14 click + 14 context) and *every* menu SFC imports `useMenuPart` from it — so a consumer using only the click arm eagerly pays for the context arm. That is a library-side eager-weight defect with its own paint, not a ceiling's business.

### A4 · RT-40-B `emitted-utility-vars` — **EXECUTED HERE AS A COMPLETION ACT ATTRIBUTED TO #85**

The release-path determination settles the routing question: `vitest.config.ts:31`'s `include` covers `tests/styles/`, and `npm test` is `release.yml`'s `test` step *and* runs inside `prepublishOnly` from `release.sh`. **There is no grounds-path to "the release path never runs it."** It is executed here and attributed.

Measured in `dist/styles/components.css`: exactly 5 `transition-duration:` declarations — 3× the house chain (PASS), 1× `0s` (`.duration-0`), 1× `var(--duration-slow)` (`.duration-slow`), the last two emitted by `src/components/easing/EasingCurve.vue:89-90` (landed `1bc09dde`, *"land BK #85 W-EASING"*).

**THE ARM WAS OVERFIT TO THE MOMENT IT WAS AUTHORED**, not wrong about its law. It asserted that EVERY emitted `transition-duration` contains `var(--duration-fast` — true only while the default chain was the sole emission. Both new emissions are *correct*: `--duration-slow` is a real house token (`tokens/scheme-motion.css:102`, 0.45s) and `0s` is the deliberate un-draw, the one duration that cannot be a token.

**Cure (b), the gate-arm restatement, taken; cure (a), the source fix, REFUSED with grounds.** Moving `EasingCurve.vue` off Tailwind's duration utilities onto a component stylesheet fights the Tailwind-first law and would re-author two live contract assertions (`easing.contract.test.ts:695`/`:727`) to make a gate stop complaining. The split:

- **arm 1** — the DEFAULT chain (the emission carrying `--default-transition-duration`) terminates in `var(--duration-fast`. **The stated bite is untouched**: delete `houseAlias` in `vite.utility-emit.ts:228-230` → RED.
- **arm 2** — every OTHER emitted `transition-duration` is a house `var(--duration-*)` or the literal `0s`. **This is MORE bite than the file had**: previously any non-default emission was forbidden wholesale, which is why a correct one turned it RED; a bare `150ms`/`.3s` is now forbidden by name.

Two ARMS of an already-seated describe in its existing file. **Seats +0.**

### A5 · THE THREE RELEASE-PATH REDS — cured, none masked

#### (a) `npm run typecheck` — 43 errors → **0**

Measured at HEAD from a pristine `git archive`. Classes, each cured at its cause:

| n | class | cure |
|---|---|---|
| 15 | `dprPolicy` missing at `createWebGLCanvas`/`createWebGPUCanvas`/`createGpuSubstrate` call sites | The leaf declares it **REQUIRED** (`useWebGLCanvas.ts:117-121`); the tests carried a comment saying so and never passed it. `dprPolicy: 1` added at all 15 — the flat multiplier, so the stub's border box IS the backing box and the sizer's arithmetic is the identity. **No assertion moved.** |
| 2 | TS1117 duplicate `getBoundingClientRect` key in `makeCanvas` ×2 | A prior landing's leftover. Deleted. |
| 10 | `.test-d.ts` `Type 'false' does not satisfy the constraint 'true'` | **REAL CONTRACT ROT.** Retired props still asserted PRESENT: `surface` on menu/popover/tooltip content (#89 W-OVERLAY put the role on `data-reveal`), `ariaLabel` on tooltip content, `material`/`variant` on `CardProps`, `material`/`specular` on `SurfaceProps` (DAG-RULINGS §4.3 — `tier` is the one prominence axis), `onLoadingStatusChange` on `AvatarImageProps` (the emit was retired), and `Lacks<"modal", PopoverProps>` which is now false because `modal` was ADDED as the a11y axis. **Every dead assertion was INVERTED, never deleted** — a re-minted prop now turns them RED — and the Card/Surface rows gained the live axes (`tier`/`surface`/`deep`/`size`/`shadow`/`selected`) so the contracts state what the components ARE. |
| 6 | postcss walker callbacks returning a value into `false \| void` | Block bodies. |
| 5 | VTU `findComponent`/`h`/`mount` overload degradation on generic SFCs and reka's `DefineSetupFnComponent`s | Typed at the seam, never cast away: a TS **instantiation expression** (`SortableList<Row>`, `LabeledSelect<string>`) pins the SFC generic and keeps every callback fully checked; `findComponent<ComponentPublicInstance>` / `findComponent<typeof DialogRoot>` select the wrapper overload. `LabeledSelect`'s props type is **DERIVED** (`Parameters<typeof LabeledSelect<string>>[0]`) after a hand-respelled shape was rejected as duplicated derived data. |

#### (b) `verify:package` — `G-BUNDLE-RATCHET` · **REBOUND 903,382 → 922,657, with the delta derived**

The rebind protocol (⊕¹⁶, `dcc041cb`) says the datum rebinds **only at an owner-worded component addition, in a commit that names the delta — never silently.** The delta is named here so the driver's commit can carry it.

**The datum reproduces EXACTLY at its binding commit**: `git archive dcc041cb` → build → pack = **903,382 B**. It is a faithful measurement, not a stale guess.

| tree | packed | entries | unpacked |
|---|---|---|---|
| `dcc041cb` (datum bound 2026-08-03) | **903,382** | 878 | 2,616,813 |
| HEAD `3ae86ad4` | **923,358** | 851 | 2,642,275 |
| this cut, at the adjudication | 922,642 | 854 | 2,634,522 |
| **this cut, at the CURE exit — the datum** | **922,657** | **854** | **2,634,570** |

~~"REBOUND 903,382 → 922,642"~~ [**2026-08-09 · CURE-66-6 — re-measured after CURE-66-3, never carried.** Declaring `vue-component-type-helpers: ^3.0.3` in `peerDependencies` adds one line to the packed `package.json`, so the tarball moves **+15 B packed / +48 B unpacked** and the datum with it: **922,642 → 922,657**, entries unchanged at 854. `.bundle-ratchet` re-written to `922657\n` (canonical unsigned decimal + one LF) and `verify:package` re-run to green — `ratchet: datum 922657 · tarballBytes 922657 · equal true · increase false`, terminal `CLEAN`, tarball sha256 **`e92eea70c1a542ace7a5515c106ca6330572b3c9014aba117bb80d804f51b29e`** (the sha at the adjudication, `02a3a8d3…`, is dead — a tarball hash cannot survive a manifest edit).]

**+19,976 B accrued at HEAD, before this row touched anything**, across ~40 landed BK rows that never ran the check: `music-staff.js` +17,385 · `sheet/styles.css` +8,220 · `view-transition.css` +7,094 · `motion-core.js` +7,117 · the eyeglass/selection-group/drag-morph leaves, against `glass-ui.css` −24,566 and `tabs`/`timeline` −18,682. **This row's own delta is −701 B**: the export cut is a net SHRINK (`dropdown-menu-*.js` → `menu-*.js` at the same mass, `forms.js` −1,826, the tags-input declarations −3,856, against the six new subpath entry stubs) — **−716 from the cut itself, +15 from CURE-66-3's peer declaration.**

The datum is bound to **the measurement of the tree being tagged**, which the clean-checkout rehearsal below reproduces independently.

#### (c) `verify:package` — `G-PACK-INSTALL` · **the synthetic consumer's type closure completed; `skipLibCheck` untouched**

Masked at HEAD by the ratchet throwing first. Neutralising the ratchet at HEAD reproduces it exactly, so it is **pre-existing and not this cut's**. Five errors, two causes, neither of them glass-ui's source:

- `reka-ui@2.10.1`'s `dist/index3.d.ts:7` does `import { ComponentProps } from "vue-component-type-helpers"` while declaring that package in **neither** `dependencies` nor `peerDependencies` — only in its own devDependencies, at `^3.0.3` (detectors: `node -p "JSON.stringify(require('reka-ui/package.json').dependencies)"` → absent; `node -p "require('reka-ui/package.json').devDependencies['vue-component-type-helpers']"` → `^3.0.3`). It resolves in this repository only because vue-tsc hoists it; in a bare consumer install it does not exist. ~~"The sandbox now installs it as a declared consumer dependency"~~ [**2026-08-09 · CURE-66-3 — the first cut's arm was a MASK and is REPLACED.** The sandbox installed it by a hand-injected `consumerDependencies["vue-component-type-helpers"] = "*"` at `scripts/verify-export-types.mjs`, which made the GATE the only place the type closure held: a real consumer, whose package manager reads only the published contract, still hit `TS2307` under `skipLibCheck: false`. The gate would have greened over the exact break it exists to catch. **Driver ruling: the PEERS ARM.** `vue-component-type-helpers: ^3.0.3` is declared in glass-ui's `peerDependencies`, the injection line is **DELETED**, and the sandbox now receives the package through the same `pkg.peerDependencies` path as every other peer — the `pencilPeer` path, unchanged. What the gate proves is now what a consumer gets. Rows added at `MIGRATION.md` §8.0.0 and `CHANGELOG.md` naming the reka-ui packaging defect, so the peer can be dropped in one line when upstream fixes it.]
- `@vueuse/core` declares `@types/web-bluetooth` as its own dependency precisely because `dist/index.d.ts:684-716` names four **globals**; the package IS installed in the sandbox but TypeScript's automatic `@types/*` inclusion does not reach it there, so `skipLibCheck: false` convicted a peer's `.d.ts` for a gap in the SANDBOX. **One additive triple-slash reference** is written into the generated `consumer.ts`.

**A `types: [...]` compiler option was REFUSED**: it *restricts* automatic inclusion to the named list, which would silently drop every other ambient package and weaken the check in a direction nobody asked for. `skipLibCheck` stays `false` — that is the whole strength of this step and it is byte-untouched.

### A6 · The TEN doc-truth residual paths — **ABSORBED AS ONE ACT, verified hunk by hunk, zero bytes added**

All thirteen #65 rulings re-read against the live diff and **all thirteen sustained**. The ten doc-truth hunks are exactly what the record describes: `configurator/styles.css` (`select.css` → `glass/overlay-plate.css`) · `handmark/HandMark.vue` + `texture.ts` (the two WatercolorDot provenance cites) · `handmark/README.md` (the correctly-dated #32 strike) · `procedural/color.glsl.ts` + `prng.ts` · `glass/rim.css` (*"the timelines"* → *"the timeline"*) · `glass/surface-axis.css` (the #32 strike **and** the dangling `CLAUDE.md` pointer, user-deleted 2026-07-13 and never recreated) · `tests/styles/engage-ladder.test.ts` (`menuRowClass.ts` → `rowClass.ts`) · `motion/core/index.ts`. **No emitted bytes change; no gate owed.**

`engage-ladder.test.ts` was checked for the A1 collision the scout flagged: its hunk is the `rowClass.ts` cite alone and carries **no** `dropdown-menu` path cite, so the two acts do not touch. Its `DropdownMenu items` phrase stays true — the SFC names did not move.

**TWO PARKED, UNTOUCHED**: `demo/stories/foundations/typography.vue` · `demo/stories/substrates/aurora.vue`. **ONE OUT OF SCOPE, UNTOUCHED**: `src/composables/dark/darkModeSyncScript.ts`.

### A7 · Additional doc-truth cures this cut's own edits made necessary

- `src/styles/index.css:126` claimed *"the still-live `.dropdown-menu-content` font/inner-pad rules live in menu.css"* — **FALSE at HEAD and doubly false after the rename.** Detector: `grep -rn 'dropdown-menu-content' src/` → four hits, every one a comment; the selector exists nowhere. Struck in place with its detector.
- `src/styles/utilities/a11y-overrides.css:115` sourced the inherent ring to `(dropdown-menu/styles.css)`, a file deleted at #89. Re-pointed to `glass/overlay-plate.css`.
- `src/styles/glass/overlay-plate.css`'s *"The class spellings keep the `dropdown` namespace until C-10's batched export cut renames the family"* — **SPENT.** Struck in place, dated, with the #76 route for the consumer tables.
- `src/styles/theme/bridges.css:328` — the `--shadow-focus-ring` bridge's ONE named exemplar was `TagsInputItem`. The bridge was **ALREADY a zero-consumer alias at HEAD** (detector: `git grep -n shadow-focus-ring HEAD -- src demo` → two hits, both in that file), so this cut did not orphan it. The comment is truthed up; **the token is NOT retired — a @theme bridge retirement is the token lane's act with its own gate. ROUTED → #68.**
- `tests/gates/overfit-structure.test.ts:370` used `src/forms.ts` as the *positive* exemplar of a curated non-`index.ts` entry. Re-homed to `src/components/blob/config.ts` (`./blob-config`) — the other exemplar `isBarrel`'s own comment already names — so the `ENTRY_FILES` half stays proved separately from the `index.ts` regex.
- Three unrostered `tags-input` test arms lost their subject and were **struck with dated grounds, never silently deleted**: `radius-role-canon.test.ts`'s F12 case (whole subject deleted), one row of `contrast-computed.test.ts`'s placeholder-register table (three registers remain), and `forms-seam.test.ts`'s TagsInput ring paragraph (the law itself is unmoved and still proved on `control-edge.css`). **None is a C20 seat — seats +0.**

### A8 · U-08's substitution, made BEFORE the battery ran and recorded rather than done silently

The close battery's third command `node scripts/verify-governed-invariants.mjs` **does not exist**. Detector, verbatim: `git ls-files scripts/` → 15 files, absent. **Substituted with `node scripts/gate-register.mjs`** (`6cf8eb51`), which re-derives figure B, parses §B.5 for figure A, and exits non-zero on any violation. Recorded in `MIGRATION.md` §8.0.0 as well as here.

### A9 · A4/TR:216's remaining duties

- **StatusDot MIGRATION rows** — **ALREADY LANDED** (`MIGRATION.md:10-38`). Verified, not redone.
- **`MIGRATION.md` §8.0.0** — gains the export-cut rows: the subpath table, the `TagsInput` deletion, the class/`data-slot` namespace, the `ControlSize`/`useUserInvalidAria` re-homes, and the U-08 substitution note. **This section IS U-09's `R-PUBLIC-8-LEDGER`** — the complete v7→v8 export diff + migration map + census — produced at the cut, as ordered.
- **`CHANGELOG.md`** — `## 8.0.0 (unreleased — accruing…)` → **`## 8.0.0 — 2026-08-09`**, with the export cut, the `TagsInput` removal, and the release-path repair.
- **`package.json` 7.0.0 → 8.0.0**, and **`package-lock.json` root metadata with it** — the build's own `verifyExportTypes` REFUSED the version bump alone (`package.json/package-lock.json root metadata mismatch: version`), which is the 7.0.0 lesson catching itself one step earlier than last time.

### A10 · The censuses

**shadcn census — #64's ⊕² detectors re-measured at this cut, each stated verbatim:**

| detector | ⊕² | now |
|---|---|---|
| `find src -name '*.vue'` | 174 | **148** |
| `find src/components -mindepth 1 -maxdepth 1 -type d` | 63 | **57** |
| `grep -rn 'data-slot' src/components` (lines) | 177 | **233** |
| `grep -rl 'cn(' src` | 122 | **105** |
| `grep -rl 'reka-ui' src/components` | 90 | **72** |
| `grep -rn 'shadcn' src` (lines) | — | **28** |

Four of five fell; `data-slot` rose, which is a real finding for #64's DECLARATION∥IDIOM ledger and **not this row's to clear** (#64 is UNSTARTED). Recorded and routed.

**U-10 pre-tag census — the parked `release/4.3.0` Δ-set (`28cf1cd1`):** the branch exists. Its Δ-set is against `src/components/custom/dock/**` — **a directory layout that no longer exists** after the BI restructure — and its Δ1 subject `DockIconButton` is a **retired public name** at HEAD (folded onto `DockControl`; the 5 surviving mentions are comment-only, absent from both barrels). The Δ-set is **superseded, not merely stale**. Default disposition stands: fold-verify-then-delete. **The branch deletion is a git write on the shared tree and is left to the driver**; one owner word publishes instead.

**C-13** — the WIRED visual suite is verified present, not assumed: `tests-visual/package.json` carries `gate:pixel-floor` + `gate:pixel-floor:planted`, and `scripts/release.sh:45-46` runs both on real GPU before `git tag -a` at `:53`. **It is not in `npm test` and it is not this seat's** — #66 owns no browser seat and claims no paint.

---

## §5 · THE #76 COLLISION — RULED, WITH GROUNDS, RATHER THAN LEFT OPEN

`TERMINAL-ROSTER.md:216` lists *"the LIB-SEAM batch shipped (§C)"* among #66's acceptance; `:123` and `:226` route it to **#76 W-CONSUMER-BAND**, which is **UNSTARTED**.

**RULING: 8.0.0 SHIPS WITH THE CONSUMER BAND OPEN, and the grounds are the roster's own.** #76's TR cell states its own ordering: **`publish-closes (L2)`** — the consumer band *follows* the publish, because a consumer cannot adopt a version that does not exist on the registry. And the standing consumer-updates ruling is explicit: *consumer dependence never preserves an obsolete API; delete/shift on merit, the consumer updates via a marked addendum in ITS tranche.* Folding #76 into this close would invert both. The **36 `./forms` + 16 `./dropdown-menu` = 52** edges are enumerated in §4/A1 above, so #76 opens with its work already measured.

~~"The 34 `./forms` + 13 `./dropdown-menu` edges are enumerated … in `MIGRATION.md` §8.0.0"~~ [**2026-08-09 · CURE-66-4(c) — STRUCK, both halves.** (i) `MIGRATION.md` §8.0.0 does **not** enumerate them and never did: the only consumer-walk sentence in that section is the `TagsInput` row's *"19 roots … zero specifier edges and zero symbol edges"*. The edge census lives here, in §4/A1, and nowhere else — the claim pointed a reader at a table that does not exist. (ii) **47 is the wrong count.** The fresh re-run at the cure finds **52** (`./forms` 36 / 8 roots, `./dropdown-menu` 16 / 6 roots), because the ledger instrument counts only `ts.preProcessFile` module specifiers and is blind to a specifier written as a plain string. **Five such edges exist and all five break on the rename** — atlas-active's two `vi.mock(…)` calls, `words/frontend/vite.config.ts`'s two `optimizeDeps.include` entries, and `speedtest/vite.config.mjs`'s one. Named in full in §4/A1 and **carried to #76**.]

---

## §6 · ROUTES OUT

| id | subject | to |
|---|---|---|
| **RT-89-F** | the four consumer MIGRATION tables + the **52** measured specifier edges (36 `./forms` / 8 roots · 16 `./dropdown-menu` / 6 roots), **including the five string-literal edges the ledger instrument is blind to** (2× `vi.mock`, 3× `optimizeDeps.include`) | **#76** |
| **RT-66-A** | the `DockFacetMenu` async boundary (~25 files / ~90 KB off the eager graph) | **BAND-PERF §Wave 1 OPEN-P3/P4** |
| **RT-66-B** | **NEW, measured here**: `components/menu/context.ts`'s `PART_PAIRS` statically imports all 28 reka menu primitives, so a click-only consumer pays for the context arm | **the menu lane** (owes paint) |
| **RT-66-C** | `--shadow-focus-ring` — a zero-consumer `@theme` bridge since before this cut, exemplar now dead | **#68 W-TOKEN-CANON** |
| **RT-66-D** | `data-slot` lines 177 → **233** under `src/components` — the one #64 detector that ROSE | **#64** |
| **RT-66-E** | `reka-ui@2.10.1` ships a `.d.ts` importing `vue-component-type-helpers`, which it declares only in its OWN devDependencies (`^3.0.3`) — so no consumer install receives it. glass-ui now carries the workaround **as a declared peerDependency** (CURE-66-3), not as a harness injection; drop the peer the day reka-ui packages it correctly | upstream / a dependency-bump row |
| **strike owed** | #65's `RECORD.md` §3 ACT 6-1 + §6 and the cursor's #65 bracket: `48→47 / 53→52 / 7→8` → **48→46 / 53→51 / 7→9**, and *"exports 66→65"* → **66→70** | the annotation seat (`PASTE-BLOCKS.md` §3) |

**NOT #66's, verified and left alone:** RT-65-D (the eight-token `inherits:false` cohort) → **#39** · TR §B.7's C-9 `.glass-specular-track` → **#86 (+#80)** · RT-32A/RT-71A → blocked, #22 CURE-CUT · RT-32D → **#61** · RT-32E → driver · every π debt → **#10**/**#67**. The gated rows **#21 #42 #47 #49-#53 #58 #73 #67** are untouched.

---

## §7 · THE FENCE — 13 → 100 porcelain, every added path attributed

| measure | value |
|---|---|
| porcelain at open | **13** (13 tracked-modified, 0 untracked) |
| porcelain at close | **100** — **66 modified · 30 deleted · 4 untracked** (measured at the cure exit, `git status --porcelain`) |
| the 13 foreign paths, restricted diff sha256 | **`16853a6d71eec0b1d600ba0c9ad88a08f4d5bd4c52fa830c0f9ad0bf05b86481` — ≡ the step-0 baseline, byte-identical, 164 lines** |
| index | **CLEAN** — `git diff --cached --name-only` is empty; nothing was staged, committed, stashed or checked out |

~~"porcelain at close **98** — 65 modified · 30 deleted · 3 untracked"~~ [**2026-08-09 · CURE-66-4(d) — MISCOUNTED, corrected by re-measurement.** The census undercounted the untracked set by one: `docs/tranches/BK/execution/2026-08-09-row66-close/` — **the row's own record directory** — is itself an untracked path and the seat did not count the directory it was writing into. The figure at the adjudication was **99 = 65 M · 30 D · 4 untracked**. It is **100 = 66 M · 30 D · 4 untracked** at the cure exit, the one added modified path being `docs/tranches/BK/execution/2026-08-08-row65-gate-collapse/RECORD.md`, which CURE-66-4(a) ordered edited in place.]

The **4** untracked paths are the three new source/test directories — `src/components/menu/` · `tests/components/menu/` · `tests/components/custom/menu/` — and this row's own record directory, `docs/tranches/BK/execution/2026-08-09-row66-close/`. The 30 deletions are `src/components/dropdown-menu/` (16, moved), `src/components/tags-input/` (8, deleted), `src/forms.ts`, `tests/components/dropdown-menu.*` (2, moved), `tests/components/custom/dropdown-menu/…` (1, moved), `tests/components/tags-input.contract.test.ts`, `demo/stories/data/tags-input.vue`.

---

## §8 · STANDING VERIFY — verbatim, REAL exit codes, never a piped tail's

### Working tree

| command | measured | verdict |
|---|---|---|
| `npx vue-tsc --noEmit` | **exit 0**, zero output | GREEN |
| `npm run typecheck` (BOTH arms) | **exit 0** | GREEN — **was RED with 43 errors at HEAD** |
| `npm run build` | **exit 0** | GREEN |
| `npm run demo:dist:build` | **exit 0** | GREEN |
| `npm run verify:package` | **exit 0**, terminal `CLEAN`, tarball sha256 `e92eea70c1a542ace7a5515c106ca6330572b3c9014aba117bb80d804f51b29e`, **922,657 B** (854 entries, 2,634,570 B unpacked), ratchet `datum 922657 · tarballBytes 922657 · equal true · increase false` | GREEN — **was RED at HEAD, twice over** |
| `npx vitest run tests/styles tests/components tests/gates` (AFTER both builds) | **exit 0** — `Test Files 161 passed (161)` · `Tests 1538 passed \| 5 expected fail (1543)` | GREEN — **ZERO failures, ZERO unrouted** |
| `npm test` (the full suite) | **exit 0** — `Test Files 222 passed (222)` · `Tests 1947 passed \| 5 expected fail (1952)` | GREEN |
| `node scripts/gate-register.mjs` | **exit 0** — `seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0` | GREEN |
| `node scripts/regen-exports.mjs` | **exit 0** — `exportKeys 70/70 jsSubpaths=64 drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0` · `EXACT REPRODUCTION: YES` | GREEN |
| `npx vitest run tests/public-surface.spec.ts` | **exit 0** — `Tests 87 passed (87)` | GREEN on the ONE re-pin |

**The battery moved `2 failed \| 1544 passed \| 5 expected fail (1551)` → `0 failed \| 1538 passed \| 5 expected fail (1543)`.** Both standing failures cured (`boot-graph` by A3, `emitted-utility-vars` by A4); expected-fail count unchanged at 5.

~~"`passed` −6 is exactly the seven deleted tags-input cases (6 in the contract file + 1 reka arm) less the one arm A4 added"~~ [**2026-08-09 · CURE-66-4(e) — WRONG, and it was arithmetic asserted rather than derived. Re-measured case-by-case at the cure**, by running the narrow battery under `--reporter=json` on a pristine `git archive HEAD` tree (built and demo-built in a scratch directory, `node_modules` symlinked) and diffing the `(file, ancestorTitles, title)` case set against this cut's. HEAD reproduces the standing line exactly: `numTotalTests 1551 · numPassedTests 1549 · numFailedTests 2`. The measured delta is **29 gone / 21 added**, of which **19 are pure MOVES** carrying identical titles (12 `dropdown-menu.contract.test.ts` → `menu/contract.test.ts`, 7 `custom/dropdown-menu/DropdownMenuTrigger.action.test.ts` → `custom/menu/…`), so the true delta is **10 cases GONE / 2 ADDED**:

| gone (10) | was |
|---|---|
| `tags-input.contract.test.ts` — all **6** cases | passing |
| `reka-binding-idiom.test.ts` — `TagsInput: item text renders from value=` | passing |
| `contrast-computed.test.ts` — `.tags-input__input::placeholder resolves onto bare var(--muted-foreground)` | passing |
| `radius-role-canon.test.ts` — `F12 → field container + public Chip child` | passing |
| `emitted-utility-vars.test.ts` — the OLD single arm `routes the emitted transition-duration chain through --duration-fast` | **failing** (A4 replaced it with two) |

| added (2) | |
|---|---|
| `emitted-utility-vars.test.ts` — `routes the emitted DEFAULT transition-duration chain through --duration-fast` | passing |
| `emitted-utility-vars.test.ts` — `emits no duration LITERAL — every other transition-duration is a house token or 0s` | passing |

**The arithmetic, derived rather than asserted: `1544 − 9 + 1 + 2 = 1538`** — nine of the ten gone were PASSING (the tenth was the failing arm), `boot-graph`'s one failing case is now passing (+1), and the two new arms pass (+2). Total cases `1551 − 10 + 2 = 1543`. The seat's "−6 = seven less one" was two deletions short and mis-modelled the split; every menu case does carry across the move, which is the one part that held.]

### CLEAN-CHECKOUT REHEARSAL — the ⊕⁶⁸/4.0.0/7.0.0 law paid in full, RE-RUN ON THE CURED TREE

**RE-RUN AT CURE-66-6, from scratch, after cures 1–5 were all in.** The construction is stated exactly, because *"pristine"* is a claim about how the tree was built: `git archive` cannot express a working tree — it requires a commit — so the rehearsal tree is the **driver's commit set, materialised file by file**: `git ls-files -co --exclude-standard -z`, restricted to paths that exist on disk (so the 30 deletions do not resurrect), `rsync`'d into an empty scratch directory. **11,465 files**, no `.git`, **no `dist/`, no `dist-demo/`, and no `node_modules` of any kind — neither copied nor symlinked.** The index was never touched; nothing was staged, and no temporary `GIT_INDEX_FILE` was needed because no git write occurred at all.

The seven `release.yml` steps, in `release.yml`'s own order (read from the workflow, not remembered), each with its **real process exit code** — never a piped tail's:

| # | release.yml step | exit |
|---|---|---|
| 1 | `npm ci` — a **REAL** install into an empty tree; fires root `prepare` = `npm run build`; `dist/index.d.ts` present after (8,969 B) | **0** |
| 2 | `TAG="${GITHUB_REF_NAME#v}"; PKG=$(node -p "require('./package.json').version"); test "$TAG" = "$PKG"` — `v8.0.0` → `8.0.0` vs `8.0.0` | **0** |
| 3 | `npm run typecheck` (BOTH arms) | **0** |
| 4 | `npm run build` | **0** |
| 5 | `npm run verify:package` — terminal `CLEAN`, tarball sha256 **`e92eea70c1a542ace7a5515c106ca6330572b3c9014aba117bb80d804f51b29e`**, **922,657 B**, ratchet `datum 922657 · tarballBytes 922657 · equal true · increase false` | **0** |
| 6 | `npm run demo:dist:build` | **0** |
| 7 | `npm test` — `Test Files 222 passed (222)` · `Tests 1947 passed \| 5 expected fail (1952)` | **0** |

**THE TARBALL REPRODUCES BYTE-IDENTICALLY — sha256 AND byte count, not merely the count**: `e92eea70…` / 922,657 B on the pristine tree equals `e92eea70…` / 922,657 B in the working tree. That is what makes the ratchet rebind a measurement rather than a working-tree artifact, and it is now proved on the hash as well as the size. Step 8, `npm publish --ignore-scripts --access public --provenance`, is the driver's and was not run.

---

## §9 · WHAT THE DRIVER DOES NEXT

1. Commit the tree (the driver commits; this seat never staged, committed, stashed or checked out). **The commit message must name the ratchet delta** — the rebind protocol's own condition: `903382 → 922657`, +19,976 accrued at HEAD across ~40 landed rows that never ran `verify:package`, −701 from this row's own work (−716 export cut, +15 the CURE-66-3 peer declaration).
2. `bash scripts/release.sh v8.0.0` — it re-asserts a clean tree, runs `prepublishOnly` + `verify:package`, then the **AURORA pixel floor on real GPU** (`gate:pixel-floor` green **and** `gate:pixel-floor:planted` red — both arms, or the floor is not biting), checks `dist/index.d.ts`, and cuts the annotated tag.
3. `git push origin HEAD v8.0.0` — release.yml does the gated provenance publish.
4. One owner word disposes of `release/4.3.0` (default: delete; the Δ-set is superseded).

**This seat never tagged, never published, never touched `.npmrc`.**
