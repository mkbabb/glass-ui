# MATERIAL W1 `31c01d2a` contract critic — Candidate 2

Date: 2026-07-22 EDT  
Seat: independent Sol x-high contract/public-surface critic  
Target commit: `31c01d2ab941597abfe283261ce05c042e1b7d25`  
Target tree: `60aa0d81a925b56280ff17d23a1aa9638a2a0fdd`  
Parent: `8786d2c8c91f289abd3dc7290a4e0b869416b4f0`  
Verdict: **DEFECT — useful source subset; `BJ.W-RADIUS-ROLE`, package-consumer, gate, model-receipt, and FREEZE remain RED.**

The audit is commit-exact. During the audit the shared worktree advanced to HEAD
`dc566e34e7eee612695e099ddc31818cef231b99` / tree
`c76c9f092c0b026f001b0814ebf94740140778a1`; that moving tree is context only. Its pre-report
dirty receipts were status SHA-256 `1ec845ddd32dd3bc72f51f9fe00572cf64420d582f01b06f3895825bbe75aa07`,
tracked-diff SHA-256 `a5fe59a88baaf8a353150fccd543c042c9af94eb09dd101ad241cdda39adf39f`, and
sorted-untracked-list SHA-256 `fd23079ef166479d246ef157b2742c837e0074245c2c477a4b0e6f7cb7f65671`.
No moving-tree byte receives acceptance here.

## Result by surface

| Surface | Verdict | Exact result |
| --- | --- | --- |
| Mechanical internal subset | **PASS** | The exact eight-file diff adds the table, renames the three in-repo readers plus manifest, deletes the two dead k-rungs, repoints SortableList, and dogfoods Button in the InfiniteScroll demo. Exact build and selected tests pass. |
| W1 full mandate | **DEFECT** | Both segmented raw radii and the public floating-search `rounded-none` defect remain. The commit itself routes them away even though W1's Work and born-RED Acceptance own them. |
| Public CSS/token contract | **DEFECT** | `--radius-input` is a published Tailwind theme token with a live first-party consumer. Removing it while the package remains `7.0.0` is not an internal rename. |
| Canon / role truth | **DEFECT** | The new table says token-hygiene enforces role/nesting, but that scanner accepts every `var(...)`; `DESIGN.md` remains a contradictory second table promising `--radius-input`. |
| Gate / mutation strength | **DEFECT** | The exact commit has no dedicated W1 guard. Reintroducing the legacy alias and dead tokens, assigning the wrong role token, and reverting F15 all leave the claimed gates and build green. |
| Package / installed consumer | **DEFECT** | Source tests do not exercise the packed theme or a consumer compile. A direct Tailwind compile proves the old utility disappears in the candidate. |
| Evidence / paint | **HOLD** | The rename/delete are byte-checkable, but the visible segmented, F15, F17, package-consumer, Safari/Chromium, and computed-radius matrix is absent. |
| Model / receipt | **DEFECT** | The moving band prose identifies `claude-opus-4-8`; the Claude receipt ledger has no `31c01d2a` row/tree digest. Under the active law this is historical Opus source-candidate work, not Luna/Sol acceptance. |

## Findings

### 1. W1 was split at its own acceptance boundary

`BAND-MATERIAL.md` W1 §Work owns the two segmented raw-literal repoints and the F17 floating-search
fix in the same wave as the systematic core. Its §Acceptance is GREEN only after:

- `src/components/tabs/styles/segmented.css` no longer carries the `0.3125rem` and `0.25rem`
  radius declarations; and
- `src/components/search/searchVariants.ts` no longer makes the public `floating` variant square.

At the exact commit, segmented lines 169 and 306 remain raw and
`searchVariants.ts:10` remains `floating: "border-none bg-transparent p-0 rounded-none"`. The current
demo no longer mounts `variant="floating"`, so the defect needs a dedicated real receiver; absence
from the demo is not a cure to the exported public variant. The commit's “ROUTED REMAINDER” therefore
describes honest incompleteness, not a W1 close.

`OPEN-1c` and the F17 chrome decision are design judgments. The old Fable-defer posture is
superseded: declared **Sol x-high** must rule them. If either decision remains open, W1 remains HOLD;
the systematic subset cannot be relabeled as the full wave.

### 2. `--radius-input` to `--radius-media` is an 8.0 public clean break

The internal census is true but release-incomplete. Exact `31c01d2a` has zero live in-repo
`var(--radius-input)` reader and correctly emits `--radius-media` through
`dist/styles/theme/radius.css`. However:

- `package.json` remains `@mkbabb/glass-ui@7.0.0` and exports `./styles` / `./styles/theme`;
- the installed registry 7.0.0 theme in `value.js` publishes `--radius-input`;
- `value.js/package.json` declares `@mkbabb/glass-ui:^7.0.0` and its lock resolves the registry
  `glass-ui-7.0.0.tgz`;
- live `value.js/demo/workbenches/gradient/GradientVisualizer/GradientEasingEditor.vue:274` reads
  `var(--radius-input)`; other live source uses the generated `rounded-input` utility; and
- Glass `DESIGN.md:371` still promises `--radius-input` as the input token.

The direct Tailwind consumer probe makes the break executable rather than hypothetical:

| Theme input | `rounded-input` | `rounded-media` | `rounded-card` |
| --- | ---: | ---: | ---: |
| installed registry Glass 7.0.0 | true | false | true |
| exact `31c01d2a` built theme | **false** | true | true |

Therefore the accepted no-alias clean break must land with the explicit 8.0 CSS-token ledger and
migration, a fresh ship-time consumer census, value.js-owned source/lock migration, and computed
radius plus 390/1440 paint proof. A compatibility alias would contradict the ruled clean break; a
silent 7.x deletion would contradict the published package contract.

### 3. The stated enforcement does not exist in the exact commit

The new `radius.css` table states that `BJ.W-STATIC-HYGIENE token-hygiene` enforces that every radius
uses a rung and that a card/pill never nests in the wrong role. The actual scanner only rejects a raw
length and explicitly treats **any value containing `var(` as on-ladder**. It cannot tell
`--radius-media` from `--radius-pill`, cannot validate nesting, and excludes the theme source where
dead or legacy tokens are declared. `token-graph.test.ts` only checks that listed public tokens have
a definition and that the alias graph is acyclic; it checks neither negative vocabulary nor
reachability.

An isolated mutation of the exact tree performed all of the following together:

1. restored `--radius-input`;
2. restored `--corner-k-soft` and `--corner-k-sharp`;
3. changed `.command__input` from `--radius-media` to the wrong `--radius-pill`; and
4. reverted the F15 library Button to the raw `rounded-md` `<button>`.

`token-hygiene` plus `token-graph` still reported **5 pass + 1 expected fail**, and the full package
build still passed. That is a born-RED detector failure for four claims in the commit.

The later moving-tree `tests/styles/radius-role-canon.test.ts` (SHA-256
`f8d62aa9bd0b4a396fa77b8667c18a56303a82fe175caa5a1b5eec4b9f4af26d`) passes 9/9, but it is
untracked and absent from the exact commit. Even if landed, it does not pin F15, either segmented
site, F17, the public 7→8 package diff, value.js, the canon-table text, or general nesting/role
correctness. It is a useful narrow follow-up, not exact-commit credit.

### 4. The “single source” canon is already contradicted

The commit calls the new `radius.css` comment table the single role canon, yet exact-tree
`DESIGN.md:359-375` remains a second radius table and says `--radius-input` exists, equals 8px, and
serves Inputs. The actual base `--radius` is 0.625rem (10px at 16px), so the old table is stale in
both name and value. A clean-break commit cannot claim canon convergence while first-party design
truth directs consumers to the deleted contract.

There is also an unresolved semantic edge inside the new table: `.command__input` is a real
`RekaComboboxInput`, and its default CSS is borderless and transparent. Its radius currently has no
default painted plate to demonstrate “media/tile” semantics. Sol should either affirm the future
override contract with a real painted receiver or delete/repoint the inert declaration; counting the
word “input” as a proved media consumer is not sufficient role evidence.

### 5. Source-green is not packed-consumer green

The exact build is healthy and the published style copier includes
`dist/styles/theme/radius.css`; `npm pack --dry-run` reports 887 files and includes that asset. But the
component bundle `dist/glass-ui.css` contains three **reads** of `--radius-media` and no declaration;
the definition arrives through the separate exported theme/style chain. This makes an installed
consumer fixture essential. The current tests read source files and do not prove:

- the packed `./styles` import defines the new token before component CSS uses it;
- Tailwind generates the intended new utility and intentionally drops the old one only at 8.0;
- CSS overrides at the consumer root still retune Avatar/Skeleton/Command as designed; or
- the migrated value.js receiver resolves a non-empty, role-correct computed radius.

The build is a valid mechanical proof, not a package-consumer acceptance proof.

### 6. Model and receipt truth keep the candidate non-accepting

The moving W1 §BUILD prose identifies the builder as `claude-opus-4-8`, and the commit body calls the
name ruling an “opus systematic reconcile.” Preserve that historical fact. The dedicated Claude
receipt ledger, however, still stops at pre-split inputs and contains no `31c01d2a` commit/tree/model
receipt. Under the active Candidate-2 law, bounded redress is **Luna x-high** and design/public-contract
judgment is **Sol x-high**. Consequently:

- `31c01d2a` may remain a source candidate;
- the missing receipt and tree digest must be appended by the implementation owner;
- Sol must rule `--radius-media`, OPEN-1c, F17, and the Command edge;
- Luna must perform any bounded redress against that written contract; and
- two exact-byte Sol critics plus the package/paint evidence must pass before W1/DONE or FREEZE.

## Required born-RED closure

1. **Exact W1 contract gate:** pin absence of `--radius-input`, absence and zero references of both
   dead k-rungs, the three decided role mappings, SortableList, the library Button import/render, both
   segmented decisions, and the F17 public variant decision. Each individual reverse mutation must
   RED.
2. **Role/nesting bite:** a mutation that changes a mapped consumer to a different valid
   `var(--radius-*)` must RED; the gate may not equate “uses a var” with “uses the right role.”
3. **Canon truth:** the authoritative design table and token manifest must agree with the CSS source;
   restoring the deleted public name or stale value in either must RED.
4. **8.0 installed-package fixture:** compile the packed candidate next to installed 7.0.0, prove the
   deliberate `rounded-input`→`rounded-media` delta, and fail a mutation that ships the deletion under
   a 7.x identity or omits the migration ledger.
5. **Consumer co-landing:** migrate value.js source and lock; record old/new computed radius plus
   390×844 and 1440×900 rest/focus captures. A missing/unresolved custom property must RED.
6. **Visible W1 matrix:** Safari and Chromium before/after for SortableList, segmented variants, F15,
   a dedicated floating-search receiver, F12/F45/F48, and the media consumers. Source-only grep is not
   paint acceptance.
7. **Provenance:** append the implementation receipt with commit, exact tree/digests, historical Opus
   model ID, conflicts/remainder, then run declared Luna redress and two declared Sol exact-byte
   critics.

## Reproduction ledger

All commit tests/builds ran in an isolated archive of tree `60aa0d81…` with the workspace dependency
runtime linked read-only; the shared product tree was not modified.

| Probe | Result | Evidence SHA-256 |
| --- | --- | --- |
| `vitest run token-hygiene token-graph drag-ring-radius radius-dialog-bind segmented-tabs` | 5 files; 36 pass; 1 expected fail | log `f672fb86b5b22977a1448640373b21f2210c0f7e78179e6920a3c587f904e6fb` |
| `npm run build` | Vite build + 67 declaration entries PASS | log `e04e54251290a0c462ab5d4acfb4ccb5ccc3ec47ad5e97704dca9d04d92b28c9` |
| exact `dist/glass-ui.css` | built; three token reads, no theme declaration | `c5ef8e5b33cb12eb6a1c3b5621d5b7a3622f301056ba62919df07cbfe1847bc4` |
| exact `dist/styles/theme/radius.css` | includes `--radius-media`, excludes old/dead names | `fa15efb14faef96bd22a6ec1e972cfd8b110a36a12a7cf6e0f29d669dc819b6b` |
| exact source token-hygiene test | source scanner/companion pin | `51985cad36950fe31760fa51429fafa9c7c115057dc077eaae5bfc3624ab4113` |
| exact source token-graph test | definitions + alias-cycle only | `8f00878b689a6862a8af5d1fe91da5f75449de0fdf6959d78492ff6f255a67ae` |
| four-arm contract mutation, same two gates | 5 pass; 1 expected fail | log `3cc0c46f451463fc82b6274310486cd9b604d6058e6f3c6b15a2cbf26be0ad9b` |
| same mutation, full build | PASS | log `ee3c12d9d192e2b78e3ca42fb8925664e0666f6ccc5011bc0faddbdef6a70a26` |
| installed 7.0.0 Tailwind utility probe | input=true, media=false, card=true | `1e00b938b3cbb8c4bc18d1af543f6a651a42a81352bd82245d4cadf4c461c1e1` |
| exact candidate Tailwind utility probe | input=false, media=true, card=true | `3db4041ef0efdb9ab431ff1eb88a0dfbb410effed84fe8b746272241600e8f81` |
| installed value.js Glass radius theme | old token + both dead k-rungs | `e1fe54bcee269262e32cccfd401c1880196873345a57323771535c9d038765d5` |
| value.js lock | registry Glass 7.0.0 | `26e03976bb05d94ba5602b9fd7c0e8ac44a75a63fbd0a05419dc6ff9c4dbc5de` |
| live value.js direct-token receiver | `var(--radius-input)` | `59a3c2db2179192fa383a56523738d8bd58ebd53001f90ca1fe5bd3725a79c0d` |

Commands:

```sh
git show --no-ext-diff --no-renames 31c01d2ab941597abfe283261ce05c042e1b7d25
git grep -n -e radius-input -e radius-media -e corner-k-soft -e corner-k-sharp \
  31c01d2ab941597abfe283261ce05c042e1b7d25
git archive 31c01d2ab941597abfe283261ce05c042e1b7d25 | tar -x -C <isolated-dir>
vitest run tests/gates/token-hygiene.test.ts tests/styles/token-graph.test.ts \
  tests/composables/sortable/drag-ring-radius.test.ts \
  tests/styles/radius-dialog-bind.test.ts \
  tests/components/custom/tabs/segmented-tabs.test.ts
npm run build
npm pack --dry-run --json
rg -n --hidden --glob '!node_modules/**' --glob '!dist/**' -- '--radius-input|rounded-input' \
  /Users/mkbabb/Programming/value.js
```

Terminal ruling: preserve `31c01d2a` as a mechanically sound partial source candidate. Do not call
MATERIAL W1 landed/DONE, do not freeze it, do not publish the deletion under 7.x, and do not let the
expected-RED residue latch or the untracked narrow guard substitute for the missing role, package,
consumer, paint, model, and full-wave proofs.
