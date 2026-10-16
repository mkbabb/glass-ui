SERVED MODEL: claude-opus-5-5

# value.js (for keyframes.js) → glass-ui (BK; BL) · O-95 · 2026-10-15 · POPOVER-ANCHOR: 10.1.0 `./popover` exports no anchor part and `Popover` takes no anchor prop

**Mirror for glass to land:** `docs/tranches/BK/coordination/valuejs-outbound-2026-10-15-popover-anchor.md` (value.js writes no byte in the glass tree).

**From:** KF.W13X `.esc2` (ESC-dock-1, ruled at COHESION §0er: "Share becomes a plain menuitem that closes the menu and opens the share surface as its own popover anchored to the @mbabb trigger"); its residual "a glass `PopoverAnchor` export is an ADOPT-AT-LANDING note for the relays"; the RESUME 1 Close R-4; COHESION §0fa item 8. Filed by KF.W13X `.rel2`.

## The site
`@mkbabb/glass-ui@10.1.0`, installed in keyframes (⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩ → `10.1.0`):
- `dist/popover.js` → `export { t as Popover, n as PopoverContent, e as PopoverTrigger }`. No anchor part.
- glass source at `b06cacc35` (version `10.1.0`): `src/components/popover/index.ts` exports `Popover`, `PopoverTrigger`, `PopoverContent` and their types, and nothing else. ⟨`git grep -n PopoverAnchor -- src/components/popover`⟩ → 0.
- glass's `Popover` click arm is reka's `PopoverRoot` (its typings say so), so reka's `PopoverAnchor` is the seam the primitive already places against. glass does not re-export it.

**Consumer site (keyframes `c761d639`):**
- `demo/app/dock/menu/SharePopover.vue:133` `import { PopoverAnchor } from "reka-ui";` beside `:137` `import { Popover, PopoverContent } from "@mkbabb/glass-ui/popover";`
- `:19` `<PopoverAnchor v-if="anchor" :reference="anchor" as-child />` inside the glass `Popover`. The surface has no trigger of its own. It opens from `MbabbMenu`'s Share row (`demo/app/dock/menu/MbabbMenu.vue:254`, `<SharePopover v-model:open="shareOpen" :anchor="mbabbTrigger?.$el" :side-offset="shareOffset" … />`) and places against the @mbabb trigger.

This is the only reka import a keyframes consumer makes beside a glass primitive for the popover. It reaches past the design system for a part the primitive already uses.

## Ask (10.2.0)
One of these two, glass's choice:
1. **`PopoverAnchor` exported from `./popover`** (reka's part, re-exported with its `reference` and `as-child` props as they are), so a consumer can place a trigger-less popover against any element.
2. **An `anchor` prop on glass `Popover`** (an element or a virtual reference), which renders the anchor internally.

Either form must keep reka's custom-anchor behaviour: with an anchor mounted, the content places against it instead of a trigger, and closing returns focus to the anchor unless the close came from an outside interaction.

## Consumer posture
No copied producer selector, no wrapper, no deep import into `dist/`. The direct reka import stays as it is until glass publishes the seam. Then it is ADOPT-AT-LANDING: at that repin `SharePopover.vue` imports the anchor from `@mkbabb/glass-ui/popover`, or passes `anchor` to `Popover`, and the `reka-ui` import line is deleted. KFA-114, UIA-KF-056 and UIA-KF-140 stay CURED (`a36b1b01`); only the import's home moves.
