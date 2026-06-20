# BD.W-ARIA-ORIENTATION-GUARD

## 1 · Band + goal

**Band 1 — ARIA conformance (the cut defect).** The single net-new SFC wave the 4.1.0 cut owes.

**Goal:** Make `aria-orientation` role-conditional on `SegmentedTabs` — emit it ONLY when the strip renders `role="tablist"` (the `underline` variant), OMIT it on the `role="group"` `pill` DEFAULT — so the strip stops shipping a WAI-ARIA-prohibited attribute on every default render. This is the ONLY BD wave authorized to touch `SegmentedTabs.vue` (BC.W-TABS-IOS declared it CSS-only and fenced the SFC). It discharges kf-O ASK#2 RE-OPEN and unblocks kf's `O.W12` S1-suppression deletion.

---

## 2 · Starting state — the exact on-disk reality (verified by reading)

All file:line citations below were read at HEAD (`9c0e06e2`, the BC 4.1.0 cut).

### The defect site

`src/components/custom/tabs/SegmentedTabs.vue` — the tab-strip container element:
```
:405:        :role="isUnderline ? 'tablist' : 'group'"            ← role IS conditional (correct)
:406:        :aria-orientation="isVertical ? 'vertical' : 'horizontal'"   ← UNCONDITIONAL (the defect)
```
The role is already correctly role-per-variant; the `aria-orientation` is bound to the orientation axis with NO `isUnderline` gate. On the DEFAULT pill strip (`role="group"`), the attribute is therefore emitted on a role that does not support it.

### The supporting computed state (verified)
- `:141` — `const isUnderline = computed(() => props.variant === "underline");`
- `:142` — `const isVertical = computed(() => props.orientation === "vertical");`
- `:114-122` — `withDefaults(defineProps<…>(), { variant: "pill", orientation: "horizontal", responsive: false, draggable: true })` — so the **default render is `variant="pill"` → `role="group"`** carrying the prohibited attr.

### The in-repo CORRECT precedents (verified — the exact idiom to copy)
- `src/components/custom/pager-dots/PagerDots.vue:124` — `:aria-orientation="pattern === 'group' ? undefined : orientation"` (drops the attr on the group-role strip, keeps it on tablist). The canonical fix shape.
- `src/components/custom/dock/DockSeparator.vue:78` — `:aria-orientation="ariaOrientation"` (a `role="separator"` element — separator IS on the allow-list, a legitimate emit).
- `src/components/ui/separator/Separator.vue:54` — `:aria-orientation="isVertical ? 'vertical' : 'horizontal'"` (unconditional, but the host is `role="separator"` — **also on the allow-list, NOT a defect**; do not touch it).

### WAI-ARIA §6.3 allow-list (verified against the inbound doc + MDN)
`aria-orientation` is supported **Used-in** {scrollbar, select, separator, slider, **tablist**, toolbar} and **Inherits-into** {listbox, menu, menubar, radiogroup, tree, treegrid}. **`group` is in NEITHER** (it inherits from `section`/`structure`). A real axis value on a prohibited role is still an ARIA-conformance violation — a checker flags it.

### The gate state — a key correction to the SEED premise

The CANDIDATE-WAVES sketch and `KF-BC.md:41` both describe `proof:tabs-ios` T4 as **"a content-hash assert"** that **"byte-fences the SFC."** **THIS IS NOT WHAT THE GATE DOES.** Verified by reading `scripts/proof-tabs-ios.mjs` end-to-end + `grep -n "createHash|content-hash|sha256|aria-orientation"` → **zero hits**:
- T4 = `detectEngineFence` (`:194-250`) is a **marker-presence + constant-band** fence, NOT a content-hash. It asserts:
  - the SFC string CONTAINS `/aria-pressed/`, `/aria-selected/`, the roving-tabindex wiring (`/rovingTabindex\s*\(/` + `:tabindex="rovingTabindex`), the `@keydown="onStripKeydown"` marker (`:201-208`);
  - the squish-cap `DEFAULT_INDICATOR_MAX_STRETCH` const == `--tab-indicator-max-stretch` token, both in `[1.0, 1.2]` (`:218-237`);
  - `INDICATOR_RELEASE_AT_ARRIVAL == 0.82` + `--tab-indicator-duration: var(--spring-snappy-duration)` (`:238-243`);
  - the three engine files exist (`:245-248`).
- There is **NO `aria-orientation` clause anywhere** in `proof-tabs-ios.mjs` (grep clean) — the orientation-absence is unproven, exactly as ASK-1′-GATE states (`KF-O-ARIA-CORRECTION.md:48-51`).

**Consequence for the build (load-bearing):** the one-attribute SFC edit touches **none** of T4's checked markers — it does not remove `aria-pressed`/`aria-selected`/roving/keydown, does not move a constant, does not delete a file. So **T4 stays GREEN by construction**; there is **no content-hash to re-snapshot.** The SEED's "re-snapshot the T4 content-hash in lockstep" coupling does not apply — the real lockstep arm is a **DOC reconcile** of the over-claimed "content-hash"/"byte-fence" language in `KF-BC.md:41,132` (which mis-describes a marker fence as a hash fence), not a hash re-bake. This correction is recorded here so the orchestrator does not chase a non-existent hash snapshot.

### The cross-repo intake (verified on disk)
- `docs/tranches/BC/inbound/KF-O-ARIA-CORRECTION.md` — the authoritative ASK-1′ + ASK-1′-GATE (re-verified at HEAD `c93d0b88` per the doc, the live line being `:401` in kf's mirror / `:406` in our HEAD; both name the same unconditional emit).
- `docs/tranches/BC/coordination/KF-BC.md:33-43,132` — the "CONFIRMED EMITTED" answer this wave re-opens (it recorded a **value** disposition for a **role** problem — the misidentification).
- `docs/tranches/BC/inbound/KF-INBOUND.md` — present.
- kf's `proof:glassui-aria-ask` is **content-aware** (mounts the published `pill`, asserts `role=group` carries `aria-orientation === null`), so a version bump alone does NOT discharge it — the SFC fix MUST ship in a published cut.

---

## 3 · The build — precisely what changes

**ONE attribute binding edit, the PagerDots idiom transplanted.** `src/components/custom/tabs/SegmentedTabs.vue:406`:

```diff
-        :aria-orientation="isVertical ? 'vertical' : 'horizontal'"
+        :aria-orientation="isUnderline ? (isVertical ? 'vertical' : 'horizontal') : undefined"
```

Vue drops an `undefined`-bound attribute from the rendered element, so:
- `variant="underline"` → `role="tablist"` → keeps `aria-orientation` = `vertical`/`horizontal` (permitted ✓).
- `variant="pill"` (DEFAULT) → `role="group"` → emits NO `aria-orientation` (the prohibited attr gone ✓).

**What this is NOT (the fences against over-reach):**
- **NOT a role change.** Do not route `group → radiogroup`. The pill is DELIBERATELY `role="group"` + `aria-pressed` (the ToggleGroup-shaped surface, `:399-401` comment) — routing it to a select-one radiogroup is BB.W-CONTROL-TOKENS's ToggleGroup scope, a different semantic, NOT this wave's. The pill is a single-select-by-convention toggle strip, correctly group/pressed.
- **NOT a value rewrite.** The vertical/horizontal derivation is correct on the underline arm; it is only the EMISSION CONDITION that changes.
- **NOT a `Separator.vue` / `DockSeparator.vue` edit.** Those are `role="separator"` hosts — separator is on the allow-list, their unconditional emit is correct. Leave them byte-untouched.

**Idiom + gestalt:** the fix uses the EXACT shape the repo's own `PagerDots.vue:124` already ships (role-keyed `undefined` drop), so the library speaks ONE aria-orientation discipline — emit-iff-on-an-allow-listed-role. No new pattern is introduced.

**Fences respected:** foreign-tree (zero sibling edits — kf deletes its own S1 band-aids on consume); GL-shader byte-fence (N/A — pure template attr); profile:budget (N/A — one attribute, zero CSS/JS-weight delta); warm-cream identity (N/A — no paint); one-GL-per-route (N/A); presets-in-consumers (N/A); substitution-vs-inheritance (N/A — not a token edit). The SFC is the ONLY src file touched.

---

## 4 · The gate — born-RED → GREEN proof design

**`proof:aria-orientation`** — a net-new device-free SFC-source gate (registered in `gates.mjs` + `package.json` the `proof:tabs-ios` way: a `node scripts/proof-aria-orientation.mjs` cmd, tags `["local","ci","release"]` since it is a device-free source detector). A separate gate is cleaner than a 6th T-clause in `proof-tabs-ios.mjs` because the orientation concern is orthogonal to the iOS-material concern T1–T5 cover, and a separate gate lets kf's content-aware cross-gate reference a single named glass-ui assertion. (Either home is acceptable; the gate-arm shape below is the binding content.)

**Detector mechanism (device-free, the `proof-tabs-ios.mjs` comment-strip + marker house pattern):** read `src/components/custom/tabs/SegmentedTabs.vue`, locate the `:aria-orientation=` binding on the strip container, and parse its expression.

**Clauses (each born-RED at HEAD `:406`'s unconditional form):**
- **A1 — the guard is role-conditional.** The `:aria-orientation` binding expression MUST be gated on `isUnderline` (matches `/:aria-orientation="isUnderline\s*\?/`), i.e. the underline-only ternary that yields `undefined` on the else arm. RED on HEAD (the expression is `isVertical ? … : …`, no `isUnderline` gate). GREEN at the fix.
- **A2 — the `undefined` drop on the group arm.** The binding's ELSE arm MUST resolve to `undefined` (the attr-drop), asserted structurally (the expression's final token is `undefined`, not a `'horizontal'` string literal). RED on HEAD (else arm is a string). GREEN at the fix. (A1+A2 together pin the exact PagerDots shape, not merely "some conditional".)
- **A3 — the FENCE: the underline arm KEEPS the axis value.** The TRUE arm of the `isUnderline` ternary MUST still carry the `isVertical ? 'vertical' : 'horizontal'` derivation — an over-cut that drops orientation on the underline/tablist strip too (a legitimate emit) reds. This prevents the "fix by deleting the attribute entirely" anti-pattern (the tablist strip is owed its orientation).
- **A4 — the role stays role-per-variant.** Assert `:role="isUnderline ? 'tablist' : 'group'"` is byte-present — proves the fix did NOT silently route the pill to a different role to "make orientation legal" (the no-role-laundering fence; pairs with §3's NOT-a-role-change).

**Self-test bite (planted defect that MUST red):**
- a synthetic SFC string re-introducing the unconditional `:aria-orientation="isVertical ? 'vertical' : 'horizontal'"` MUST red A1+A2 (the regression a future refactor could ship);
- a synthetic SFC dropping the attribute on BOTH arms (`:aria-orientation="undefined"`) MUST red A3 (the over-cut);
- the good fixed shape MUST pass all four clauses (the positive bite).

**Born-RED proof:** at HEAD, A1 + A2 red (the emit is unconditional). At the build, all four pass. The self-test fails the gate if any planted bite stops biting (the anti-de-fang floor, the `proof-tabs-ios.mjs:selfTest()` precedent).

**The lockstep arm (DOC reconcile — NOT a hash re-snapshot):**
- `proof:tabs-ios` T4 stays GREEN by construction (the edit touches none of its markers — verified in §2). NO `proof-tabs-ios.mjs` edit is required; in particular there is **no content-hash to re-snapshot** (the SEED/`KF-BC.md` "content-hash" language is a mis-description of a marker fence — corrected in §2).
- The over-claim in `docs/tranches/BC/coordination/KF-BC.md:41,132` ("a content-hash assert over those files", "byte-fenced") is reconciled to the accurate "marker-presence + constant-band fence" at the close arm (so the next reader is not misled into chasing a phantom hash).

---

## 5 · Paint verification — the π readback (BC anti-disease law)

This is a **zero-pixel-delta wave** — dropping an invisible ARIA attribute changes ZERO painted pixels. Per the W-PRUNE-CONSOLIDATE / W-NDA-DECIDE precedent (a change that paints nothing earns no `proof:ba-gestalt` verdict), **this wave does NOT take a `proof:ba-gestalt` verdict** — the binding truth is an ATTRIBUTE readback, not a pixel diff.

**The binding verification is an attribute-readback π** (a Playwright `getAttribute` arm, NOT a screenshot diff), at `/navigation/tabs`, both modes:
- **(a) the defect-closing assertion** — mount/locate `SegmentedTabs variant="pill"` (the default), assert the `role="group"` container's `getAttribute('aria-orientation') === null` (the WAI-ARIA-prohibited attr is GONE). This is the exact assertion kf's `proof:glassui-aria-ask` runs against the published cut — the bilateral lock.
- **(b) the fence assertion** — mount/locate `SegmentedTabs variant="underline"`, assert the `role="tablist"` container `getAttribute('aria-orientation')` is present AND equals `'horizontal'` (or `'vertical'` on a vertical mount) — the legitimate emit is preserved.

This is a NEW arm on `tests-visual/tabs-std.spec.ts` (the existing /navigation/tabs π home), OR a small dedicated `tests-visual/aria-orientation.spec.ts` — either is acceptable; the attribute-readback (not pixel) is the binding shape. Tagged `["local"]` with the `liveArmCiGraceSkip()` grace-skip (the device-free `proof:aria-orientation` gate is the CI-side proof; the local readback proves the rendered DOM). Both modes are asserted because the attribute is mode-invariant — a regression in either mode reds.

**The BC anti-disease law observed:** there is NO source-green close — the device-free gate proves the SOURCE shape, the attribute-readback π proves the RENDERED DOM (a stale reka binding that silently no-ops the `:aria-orientation` undefined-drop would pass the source gate but red the readback — the `feedback_glass_ui_binding_verification` MEMORY class). No "rides W-REFLECT3" deferral (forbidden); the readback runs at this wave's close. (Note: because there is no proof:ba-gestalt verdict, G7/G8's pixel-capture machinery does not apply — the attribute readback is the terminal binding proof.)

---

## 6 · Fences + risks — what must NOT break

- **The byte-fence reconciliation (load-bearing).** `proof:tabs-ios` T4 must stay GREEN — verified it will (the edit touches none of `aria-pressed`/`aria-selected`/roving/keydown/the engine constants/the engine files). If a future T4 IS ever upgraded to a true content-hash, THAT snapshot would need re-baking — but at HEAD there is no hash, so no re-snapshot. The orchestrator must NOT introduce a phantom hash re-snapshot step (the SEED's language is corrected in §2).
- **The role stays `group` on the pill (no laundering).** Do NOT "fix" the conformance by promoting the pill to `radiogroup`/`tablist` — that changes the announced semantic (group+pressed → select-one), is BB.W-CONTROL-TOKENS's ToggleGroup scope, and would break the deliberate pill-is-a-toggle-strip contract. A4 guards this.
- **The underline arm keeps its orientation (no over-cut).** A3 guards against the "delete the attribute wholesale" mis-fix — the tablist strip IS owed `aria-orientation` (it is on the allow-list). The fix is role-CONDITIONAL, not role-blind deletion.
- **Separator family untouched.** `Separator.vue:54` + `DockSeparator.vue:78` emit `aria-orientation` on `role="separator"` (allow-listed). They are NOT defects and stay byte-untouched.
- **Foreign-tree fence (inv-26).** glass-ui edits ZERO sibling tree. kf deletes its OWN `SpringSidebar.vue:43` (+ re-verifies `AnimationControls.vue:72`) S1 suppression on its `^4.x` re-pin against the cut that ships this guard. The by-name ask is the only channel.
- **The cut-version stamp is required (the kf consume condition).** kf's `proof:glassui-aria-ask` is content-aware — it discharges ONLY when the SFC fix lands in a PUBLISHED cut, not on a version bump alone. So this wave's discharge is gated on the BD 4.x cut shipping (`BD.W-CUT`); the wave records the shipping version at close for kf to re-pin on.
- **Close-arm reconcile (the ledger lockstep).** At close: re-open `KF-BC.md` ASK#2 from "CONFIRMED EMITTED" → the role-conditional-guard disposition + the shipping version; correct the "content-hash/byte-fenced" over-claim to "marker-presence fence"; reconcile `asks-and-consumes` in lockstep so kf re-pins + deletes its S1 band-aids. (kf edits its OWN tree for the band-aid deletes; glass-ui only updates its own coordination docs.)
- **Risk — low.** A one-attribute, PagerDots-idiom-identical, zero-paint, single-file edit with a born-RED device-free gate + an attribute-readback π + a self-test bite. The only subtlety is the SEED/KF-BC content-hash mis-description, corrected here.
