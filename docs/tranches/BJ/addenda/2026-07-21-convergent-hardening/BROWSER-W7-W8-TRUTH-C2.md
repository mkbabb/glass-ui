# MATERIAL W7/W8 real-demo browser truth — candidate 2

**Seat:** read-only Browser-skill audit, 2026-07-22 EDT  
**Verdict:** **BROWSER INFRASTRUCTURE RED · ROUTES SOURCE/HTTP-DISCOVERED · ZERO UI ACCEPTANCE EVIDENCE · W7/W8 ACCEPTANCE REMAINS RED**

No product, test, retained-evidence, existing formation, or receipt byte was changed. This report is
the only repository write. It does **not** convert source inspection, an HTTP 200, or a Vite/HMR page
into visual, interaction, accessibility, console, Chromium, Safari, or published-package evidence.

## 1. Exact audit pin

The pre-report snapshot was taken at `2026-07-22T05:04:18Z`:

- repository HEAD: `626540adbe10fd84f47b8365977925a7fbd2e17a` (`master`);
- dirty-worktree digest: `3ab1fd57fe0e15bf64dc24dd0ee90b2489f9b371e7fa084b7a3d8c016a17eadc`;
- dirty census: 76 tracked changed paths, 11 top-level porcelain `??` entries containing 41
  untracked files;
- digest construction:

  ```sh
  { git rev-parse HEAD; git status --porcelain=v1 -z; git diff --binary HEAD --; \
    git ls-files --others --exclude-standard -z | sort -z | xargs -0 shasum -a 256; \
  } | shasum -a 256
  ```

The digest precedes creation of this report, so the report does not self-contaminate its input. The
shared tree was actively dirty; nothing below makes a clean-tree or immutable-candidate claim.

Load-bearing worktree SHA-256 pins at the same audit point:

| Artifact | SHA-256 |
| --- | --- |
| `demo/stories/manifest.ts` | `095fcfd2ac4220a3db54888ae3ff0d33986e65646f55807e9e885d7a9fd1105f` |
| `demo/stories/forms/chip.vue` | `07b9b7d285aad8991d759d17cbe0a1cb749e0799bdbe121616a48e8babb5d967` |
| `demo/stories/navigation/tabs.vue` | `c199ee7f6348239a1337c6dffcaf6df10ad259b03338e7048baac85d0fa00596` |
| `demo/stories/data/tags-input.vue` | `2c5b299eb577d2d22e84e8caddb8cddf95a9785438e87be28860e75dd15dd1d1` |
| `demo/stories/display/badge.vue` | `d5b2f5f6ac54dbb5e28d1bb77b4568270e89c5dd3c3b2c396db31ca8d19bc62a` |
| `src/components/chip/Chip.vue` | `775d42d7914a7bdf424172722b35d42fe2efe9d1737a5eead7689bce5c112df5` |
| `src/components/tabs/SegmentedTabs.vue` | `7827869c8b06821332a6b16656e5a43db5826e41e454f4e74587e3b8cb3d3b6e` |
| `src/components/tabs/styles/segmented.css` | `9c8894616884165605fd5aef3191fc603152e22e21b57f1d3ea0b8d164715559` |
| `src/components/badge/Badge.vue` | `3e6344b91ef1aa4df6b1bf1b15bd1e7ecddc0dba488c4d9b00e316062c229015` |
| `src/styles/glass/glass-atom.css` | `958cd4878de472dcc84fc5b0d85bee349209f7a5193ae6075c4f803a6bf40377` |
| `src/composables/glass/supportsBackdropRefract.ts` | `421c0023251d4830a7c0d879535bd24d8a0dcbebfa445ceb2da37c83812c5a71` |
| `demo/main.ts` | `6e738bbce8ac3a8136996e53d3204cf62932baf53387e830d80e77dd952d9be9` |

## 2. Browser infrastructure record

The assignment named Browser skill path
`.../browser/26.715.52143/skills/control-in-app-browser/SKILL.md`; that version is absent on this host.
The installed fallback was read completely before browser work:

- version: `26.715.71837`;
- skill SHA-256: `80c5a591bb761f7242f480fc4fc6883860f303f3d5a91e5714230c7897ad8a8d`;
- browser client: `26.715.71837/scripts/browser-client.mjs` (present).

`npm run demo:serve` started Vite 8.1.5 at `http://localhost:5199/` and remained listening as PID
`57910`. At `2026-07-22T05:04:04Z`, direct server-health requests returned `200 text/html` for all
four routes listed below. This proves only that the dev server can return the SPA shell.

The required Browser runtime never reached browser selection or documentation. Initial setup, a
minimal runtime check, and two retries after `js_reset` and bounded system-load waits all failed at
the same pre-bootstrap boundary:

```text
failed to read Node version (status signal: 9 (SIGKILL))
```

The last retry ran after the unrelated test load had cleared and while port 5199 remained healthy, so
this was not adjudicated as a route/server failure. Per the Browser skill, no standalone Playwright,
Computer Use, external browser MCP, `curl`-DOM substitute, or fabricated screenshot fallback was
used.

Consequences:

- browser engine/build: **not obtained**;
- rendered DOM/accessibility tree: **not obtained**;
- trusted pointer/keyboard/touch interactions: **not executed**;
- console/page errors and failed requests: **not observed** (not “zero”);
- desktop and 390×844 layout measurements: **not obtained**;
- PRM emulation: **support could not be discovered and was not attempted**;
- screenshots, videos, timestamped frames, and hashes: **none exist**.

## 3. Route truth — manifest-backed, not guessed

`demo/router.ts` derives `/:category/:story` routes from `demo/stories/manifest.ts`. The manifest
publishes these exact demo routes:

| Route | Manifest witness | Intended live subject | Browser status |
| --- | --- | --- | --- |
| `/forms/chip` | `forms/chip`, manifest lines 542–547 | static, selectable, action, removable; pill/cell/icon geometry | HTTP shell only; UI unobserved |
| `/navigation/tabs` | `navigation/tabs`, lines 696–701 | real `SegmentedTabs`; pill/underline, axes, drag, responsive Select | HTTP shell only; UI unobserved |
| `/data/tags-input` | `data/tags-input`, lines 825–830 | real production TagsInput, including delete receivers | HTTP shell only; UI unobserved |
| `/display/badge` | `display/badge`, manifest display family | production Badge variants/tones/sizes | HTTP shell only; UI unobserved |

`/navigation/tabs` is therefore the actual SegmentedTabs route; no speculative `/tabs` alias or
unsupported selector was used. `/data/tags-input` is an actual demo-published route and must remain
in the W7 live matrix.

## 4. Static fixture facts — constraints, not browser evidence

These source observations define what the resumed browser pass must falsify. They are not substitutes
for live DOM or paint.

1. **Chip receiver exists.** `/forms/chip` authors a production removable Chip named `Fourier` with
   the explicit control name `Remove Fourier filter`. `Chip.vue` renders the removable root as a
   non-interactive `span` plus one nested native `button`; selectable and action modes render buttons.
   The live pass must show that the name, focus order, hit owner, focus ring, and removal really reach
   the browser.
2. **TagsInput receiver exists.** `/data/tags-input` authors Skills, paste-many, and invalid-email
   specimens with production tag deletion controls. This is the routed K4 receiver distinct from
   `.glass-chip__remove`; Chip success cannot satisfy it.
3. **Badge route is insufficient for quiet glass-atom paint.** The authored `/display/badge` story
   mounts production Badges and therefore the base `.badge-atom`, but no Badge specimen passes
   `surface="glass"`. A repository-wide demo search found no glass-surface Badge witness. Thus the
   route can check base Badge availability, but it cannot prove the `.badge-atom--glass glass-capsule
   glass-atom` composition required by the quiet atom arm. Absence of such a live node is a fixture
   gap, not proof that `glass-atom.css` failed to publish.
4. **Two root-latch callers coexist in the audited bytes.** `demo/main.ts:6–13` calls
   `armGlassRefract()` once before application mount. `SegmentedTabs.vue:30–36,154–156` also imports
   it and calls it from `onMounted`, while only the pill indicator at lines 373–389 emits
   `.glass-lens`; underline and responsive-Select-only shapes do not. The demo root call can make the
   later component call idempotently invisible. Therefore a root attribute observed on the tabs page
   alone cannot assign ownership to SegmentedTabs. The resumed pass must first observe latch state on
   a fresh non-tabs route, then navigate to tabs, and report the ownership ambiguity rather than
   attributing a global mutation to whichever component is onscreen.
5. **The tabs route exercises real state variety.** It authors named groups `View mode`, `Priority`,
   `Draggable view mode`, `Account settings`, `Document section`, `Chapter`, `Release review`,
   `History range`, Arabic `عرض المشروع`, and responsive `Project view`. These accessible names—not
   guessed implementation selectors—are the interaction anchors.

## 5. Required resumed Browser matrix

The next Browser-capable run must execute the same matrix at normal desktop `1440×900` and true
viewport `390×844`. It should start console/page/request capture **before** navigation, use role/name
locators or a fresh accessibility snapshot for interactions, and reserve CSS selectors for read-only
measurement after the real node is found.

| Surface | Trusted interaction and semantic checks | Paint/state measurements | Reach/overflow checks |
| --- | --- | --- | --- |
| `/forms/chip` | Assert static chips are absent from the control order; inspect selectable `aria-pressed`, disabled state, `Run · 0`, and `Remove Fourier filter`; Tab to the remove button, activate by keyboard, reload, press with pointer, and verify `Fourier` disappears only from its own control | Timestamped rest, hover, keyboard-focus, pointer-down/active, post-click and settled frames; remove-button and parent rectangles; `elementFromPoint` at center/edges; focus-indicator bounds; `--chip-flood-t` and selected pseudo opacity before/after | At both viewports measure root/main scroll widths, wrapping, clipping ancestors, dock occlusion, sequential-focus reveal; do not infer coarse pointer from viewport alone |
| `/data/tags-input` | From the accessibility tree identify the real textbox and delete button names; add by Enter/comma, select/remove by Backspace, paste multiple tags, try a duplicate, focus and click one delete receiver, and exercise invalid email feedback | Rest/hover/focus/active/settle frames for a token and its delete control; painted and hit rectangles; focus visibility; resulting model/count; computed root/token/delete styles | Measure the three fields and deepest delete receiver at 390×844; assert every focus target can be scrolled clear of fixed chrome and no unintended document-inline overflow appears |
| `/display/badge` | Confirm production Badge nodes and their role/text exposure; inventory `data-slot=badge`, `data-surface`, `.badge-atom`, `.glass-atom` after locating by visible labels | Capture representative variant/tone/size rest frames and computed rim/background; explicitly record whether any `surface=glass` atom exists | Check wrapping, line-box/baseline, glyph alignment, and viewport overflow; if no glass atom exists, verdict is **fixture absent**, not W7 paint PASS/FAIL |
| `/navigation/tabs` | Fresh-load a non-tabs route first, record root latch, then navigate through visible demo navigation to Tabs; exercise click, arrow roving, manual Enter/Space commit, disabled skip, vertical axis, drag release, overflow region, RTL, and mobile `Project view` combobox | For pill indicator record root latch, computed `backdrop-filter`, width/height/translate/scale/`--stretch`, active option, animation count and frame timestamps at rest→hover→focus→active/travel→settle; capture the substrate through the lens, not only CSS declarations; for underline verify a hairline with no plate/blur. Report demo-root vs component ownership ambiguity | Desktop and 390×844: document/main overflow, each named group rectangle, history region intentional `scrollWidth > clientWidth`, RTL bounds, focus reveal and chrome occlusion; below 640px confirm only the explicitly responsive `Project view` swaps to a combobox while other specimens remain reachable |

If the selected Browser documentation exposes supported reduced-motion emulation, repeat the Chip and
Tabs selection paths with `prefers-reduced-motion: reduce`: interaction and committed state must remain,
press/drag enrichment must not run, indicator settle must not leave a transient scale, and the emitted
`data-motion`/computed transition state must tell the same story. If the selected browser cannot
emulate PRM, record **unsupported**, never a pass.

For SegmentedTabs refraction specifically, `data-glass-refract="on"` and a computed `url(...)` are
necessary mechanism observations but not sufficient visual proof. A GREEN claim requires a retained,
same-phase structured-substrate frame or frame series showing an observable rim-localized/refraction
delta while the blur floor and label legibility hold. The demo's unconditional root installer also
means this route cannot by itself prove that component-local installation is the correct owner.

## 6. HMR discovery versus acceptance

The server used here is `npm run demo:serve`: it consumes dirty source aliases and HMR CSS, not an
isolated packed package. Had Browser succeeded, those frames would still be **discovery evidence only**.
They could reveal a current receiver defect and guide redress, but could not close either material wave.

Acceptance remains separately bound to an immutable candidate/build or packed consumer, retained raw
artifacts and commands, exact engine/build identity, current Chromium plus accepted Safari/WebKit arm,
and a pinned clean/dirty digest. W7 additionally needs the real removable Chip, routed TagsInput delete,
and a genuine glass Badge atom witness. W8 needs externally observable OFF, real-ON, and false-positive-ON
paint behavior plus unambiguous once-per-application bootstrap ownership; the live demo's duplicate
root/component callers cannot supply that ownership proof.

## 7. Freeze ruling

**Do not count this run as a browser audit PASS, a zero-console PASS, a responsive PASS, or any paint
evidence.** The only greens are route-manifest existence, dev-server availability, and bounded recovery
discipline. The Browser infrastructure is RED, all requested UI observations are unexecuted, the Badge
quiet-atom demo witness is statically absent, and the current dirty HMR tree is not an acceptance
candidate.

Resume from this exact matrix when the Browser runtime can initialize. Do not replace the missing run
with standalone automation or prose inference.
