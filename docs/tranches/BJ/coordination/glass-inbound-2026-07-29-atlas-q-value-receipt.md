# glass ← Atlas Q + value.js · 2026-07-29 · single post-graph inbound receipt

**Actual model:** `gpt-5.6-sol`, xhigh.  
**Glass boundary:** `9c43b5d78f4560aaf3ec7f1495c8f569a7748b81`
(`9c43b5d7`, `feat(BK/graph-v3): land the typed pre-source dependency and ownership instrument`).  
**Posture:** receipt and routing only. No product source changed here. No wave,
roster row, gate seat, registry, or control plane is added; every accepted item
is an acceptance/release/consumer rider on an existing owner.

The boundary matters: graph-v3 is the landed pre-source instrument, not a new
execution phase. This receipt consumes the packets after that commit and does
not claim that later BK product cuts have landed.

## Source pins and provenance

The four Atlas records were read whole at their exact paths:

| Atlas record | SHA-256 |
|---|---|
| `CODEX-GLASS-OUTBOUND-2026-07-29.md` | `13f49dbea0343026ec5156518bad5ff53f55e44ef5deafd9145ad7a1708416c5` |
| `CODEX-INDEPENDENT-AUDIT-HANDOFF-2026-07-29.md` | `d60d693b6f0ec3a04446f66a9a713bb3fb29ee26cbeae7da8c25dd5cfed60cde` |
| `CODEX-EVIDENCE-REGISTER-2026-07-29.md` | `ace5c7f09953c63ccbdf16d3dcdbb886a2813ea2e39b398af42955450492eceb` |
| `CODEX-WAVE-ADDENDUM-2026-07-29.md` | `4c2ee164162f4564f9d612725e545f244ba9b89338e4a14cd7d48b6a14512ef6` |

Their common directory is
`/Users/mkbabb/Programming/.p-totality/sci/atlas/docs/tranches/Q/audit/2026-07-24-perfection/`;
the Atlas worktree pin observed for this receipt is `0ff0395b`.

The value.js record
`/Users/mkbabb/Programming/value.js/docs/tranches/V/megatranche/coordination/GLASS-UI-COMMUNIQUE-2026-07-29.md`
was read whole at value HEAD `d19da6d3`; its SHA-256 is
`966610766adc8b2c70a212d39304bb1730a47ab231b6b27c5ef18a5c53e447f4`.
Its O-19 31/31 receipt remains authoritative and is not reopened.

BK `PLAN.md`, `EXECUTION-PROGRESS.md`, the consolidated
`INBOUND-2026-07-29.md`, and the existing Atlas/O-19 receipts were also read
whole. Their Fable/Opus labels remain historical actual provenance; this new
receipt does not relabel them. The O-19 heading-only `30/30` typo is corrected
separately to match its already-authoritative terminal `31/31` statement.

## Existing evidence at the graph boundary

- Glass 7's source cut is commit `490cc46e`
  (`feat(BI): land the Glass 7 component, motion, material, and public-surface cut`),
  contained by tag `v7.0.0`.
- `src/components/dropdown-menu/DropdownMenuContent.vue:28-43,67-87` owns
  `inheritAttrs: false`, `useAttrs()`, content-node forwarding, and the
  close-auto-focus relay.
  `src/components/drawer/DrawerContent.vue:41-48,94-106,180-185` owns portaled
  attribute forwarding and trigger-focus restoration when the retained closing
  presence would otherwise strand focus.
- `tests/components/dropdown-menu.contract.test.ts:98-119` proves one portaled
  menu and focus return after execution.
  `tests/components/custom/drawer/Drawer.motion-lifecycle.test.ts:190-240`
  proves Escape close, inert closing presence, teardown, and trigger-focus
  restoration; the same file's consumer `data-*` selectors exercise attribute
  arrival on the content node.
- Fresh receipt verification at `9c43b5d7`:
  `npx vitest run tests/components/dropdown-menu.contract.test.ts
  tests/components/custom/drawer/Drawer.motion-lifecycle.test.ts` →
  **2 files passed, 20 tests passed**.
- Atlas's independent browser evidence found the twelve Glass workbench
  category routes at desktop and phone widths with headings, no horizontal
  overflow, and no console warnings/errors. That evidence exonerates
  reachability; it leaves the specified hierarchy/information-density work.
- The standing BK finite-family evidence remains the TR#64 ledger, including
  distinct declaration-cleared and idiom-cleared proofs. Glass has no
  `components.json`, no `src/**/ui` tree, and no source `cva`/`clsx` import;
  `data-slot`, Reka, Tailwind, and rounded utilities are not by themselves
  shadcn residue.

## Complete root routing

| inbound root | disposition on existing owners only | exact acceptance carried forward |
|---|---|---|
| Atlas: preserve and ship Glass 7 `DropdownMenuContent` attribute forwarding plus Drawer focus restoration | **#89 / #39 / #31 / #65 / #66 / #76** — overlay source contract / Drawer merge cut / a11y and focus contract / one batched pin / release-build close / Atlas adoption | Preserve the boundary source behavior. Add/retain a regression proving an arbitrary dropdown attribute lands on content, not Teleport, and the existing Drawer close-focus proof. The release artifact must contain both repairs; Atlas must adopt it and reproduce neither the extraneous-attribute warning nor the focus regression. Existing tests are evidence, not premature release/adoption closure. |
| Atlas: workbench editorial hierarchy in cut 6 | **#56 / #58 / #59** — truthful demo receiver / preview-story chassis / desktop-phone layout probes | A preview renders a truthful component state or is removed; one visible title owns it; controls and copy recede until the primitive is read first. Re-run the twelve-route desktop/phone review. Build no new preview framework. |
| Atlas: finite eight-family shadcn abrogation | **#64 / #65 / #66 / #76** — finite declaration∥idiom ledger / batched pin / close-time census and release / consumer migration | For each of the eight standing families, rule ontology, copied default recipe, wrapper topology, token dialect, and accidental public boundary against source plus consumer evidence. Delete only proved residue; keep Reka/Tailwind where they provide the tested substrate. No mass rename, replacement wrapper system, alias, or shim. |
| value.js: Dock keyboard/roving rider | **#47 / #31** — GF-DOCK interaction cut / a11y keyboard and reachability contract | Keyboard-only traversal is collapsed → disclosure → expanded controls → collapsed. While collapsed, every full-face descendant is inert and sequentially unreachable; expansion makes the full face reachable before focus transfer. Exactly one face is reachable per frame, with no focus target outside the visible aperture. |
| value.js: consumer-painted indicator rider | **#84 / #32 / #71 / #26 / #55 / #76** — indicator slot / twin orientations / eyeglass grammar / single spring authority / watercolor relocation / value adoption | Producer semantics stay paint-agnostic. The slot owns state, orientation, keyboard, and grab/settle motion; the consumer child owns paint only, with no role or pointer handling. Both orientations must produce identical semantic and motion receipts with plain geometric and value-watercolor children. No `WatercolorDot` or `WatercolorSwatch` symbol returns to Glass. |

These five routes are the whole accepted Glass root payload. They add **zero**
owners and do not advance any cut's implementation, evidence, or close state.
value.js's five-second resting collapse remains consumer composition
(`collapse-delay=5000`), and its resting navigation discoverability remains
value-owned; InstrumentChassis stays deleted.

## Atlas-owned rejections — no Glass booking

| excluded finding | owner-preserving disposition |
|---|---|
| BEAD lacks a page `h1`, starts with a number before naming the report, and its clickable provider `li` lacks native button/Enter/Space behavior | Atlas BEAD route/semantics work. No #31 Glass expansion. |
| Phone “Source & method” controls measure about `123 × 15.95px` (the packet's approximately 16px handles) without a larger hit area | Atlas consumer control work, carried by its existing F-M5/control owner. No Glass coarse-target finding is inferred. |
| Conditional `ReadoutSheet` states omit an accessible title | Atlas `ReadoutSheet` consumer/title owner. Glass `CommandDialog` and workbench title contracts were observed correct. |
| W-REPROOF, W-D6, W-PORTAL/W-DATA/W-THEME, SWEEP, B-eta/B-theta, and the wider Q control plane | Atlas Q only. The addendum is Atlas's formation plan and creates no Glass authority. |
| The apparent SCI failure at `:5198` | Discarded audit-server configuration artifact. The valid preview evidence is the clean `:5199` run. |
| Forty-pixel phone dock controls observed under fine-pointer emulation | Not a coarse-pointer defect. Glass already carries the 44px coarse-pointer rule; the fine-pointer 40px observation opens no Glass booking. |

## Closure

The packets are consumed once at the `9c43b5d7` boundary. No resend, cron,
watcher, parallel register, or duplicate receipt is warranted. Future evidence
lands on the mapped cuts and the single release/adoption path; this receipt
itself authorizes no product mutation, consumer edit, repin, publish, or state
transition.

## Post-round-4 constellation boundary

The authoritative receiver `/Users/mkbabb/Programming/.p-totality/sci` on
`p/totality` resolves signed `@mkbabb/glass-ui@7.0.0` with
`@mkbabb/value.js@4.0.0`. Typecheck, 255 tests, the production build, and nine
routes at `1280x720` plus `390x844` are green. There is no Glass root blocker,
no dirty-master adoption, and no new owner. The deletion/consolidation/
smallest-public-surface law folds into existing `#1/#2/#56/#58/#59/#61/#65/#66/#76`.
Ordinary tests and internal-browser visual proof remain at their existing
browser owners. One public-surface-close boundary reply still owes a signed
successor tuple or explicit no-release, exact changed subpaths/migrations, and
the root remainder. This section adds no receipt, owner, or state transition.
