# Round 2B (confirmation pass) — accessibility

## Summary

Static a11y audit of src/ + demo shell. Component-library primitives are in good shape: dialog/drawer/sheet lean on reka-ui's focus trap and add thoughtful inert/forceMount + focus-handoff logic (DialogContent.vue), reduced-motion is broadly honored across both CSS (global a11y-overrides.css catch-all + per-component @media brackets) and JS RAF loops (aurora/blob park the loop, springs/typewriter/scroll-reveal snap via respectReducedMotion), focus-visible rings are consistent and survive forced-colors, and no reka wrapper-binding no-ops of the named class were found. The defects concentrate in the DEMO shell's navigation semantics and story heading structure. The most severe: the primary category navigation is exposed as an UNNAMED complementary landmark because its accessible name is placed on a role=generic <div> where browsers drop it — while the secondary story nav is a correctly-named <nav>. Secondary: two story pages skip a heading level (h1→h3), and there is no skip-to-content affordance for keyboard-only users past the two persistent docks.

## Findings (5)

### [major] landmark-name-on-generic-role

**Claim:** The primary category navigation is exposed to AT as an unnamed 'complementary' landmark, not a named 'navigation' landmark — its aria-label is dropped by browsers because it lands on a role=generic element.

**Evidence:** AppShell.vue:174 wraps the primary rail in `<aside class="demo-sidebar-rail" data-shell-region="category-navigation">` — an <aside> that is a direct child of the shell div maps to the COMPLEMENTARY landmark (wrong role for primary nav) and carries NO aria-label. The intended name is set in SidebarDock.vue:114 as `aria-label="Category navigation"` on `<GlassDock>`, but GlassDock renders (GlassDock.vue:289) a bare `<div class="glass-dock" v-bind="$attrs">` with NO role — so `$attrs` deposits aria-label on a role=generic element, where ARIA prohibits name-from-author and Chromium/Firefox drop it from the accessibility tree. Net: landmark navigation surfaces the primary IA as an unnamed complementary region. Contrast BottomDock.vue:88, the secondary story nav, which correctly uses `<nav ... aria-label="Stories in category">`.

**Proposed:** Change the AppShell.vue:174 `<aside>` to `<nav aria-label="Category navigation">` (or add `role="navigation"` + aria-label to the aside) and drop the ineffective aria-label from the GlassDock in SidebarDock.vue:114, since the GlassDock root cannot carry it. This gives the primary nav a proper named navigation landmark, matching BottomDock.

### [minor] skipped-heading-level

**Claim:** Two composition story pages jump from the page h1 straight to h3, skipping h2 (WCAG 1.3.1 / heading-order best practice).

**Evidence:** empty-states.vue:134 renders `<h3 class="text-heading">{{ state.title }}</h3>` for each empty state, but the page has no StorySection (which supplies the h2) — the only ancestor heading is the chassis page h1 (StoryPage.vue emits `<h1>` for the 'page' variant; manifest.ts registers empty-states with no `hero:true`, so it IS the page variant). auth-shell.vue is `hero:true` (manifest.ts:1035) and suppresses the chassis hero h1 via `:hero-title="false"`, leaving its own `<h1 class="text-display">` (auth-shell.vue:87) followed directly by `<h3 class="text-heading">Welcome back</h3>` (auth-shell.vue:120) — again h1→h3 with no h2. (popover.vue:36 similarly uses <h4> inside portaled content.) Round 1 flagged duplicate h1/h2; the residual class is skipped levels.

**Proposed:** Promote the card/state titles to <h2> (or wrap them in a StorySection so the chassis supplies the h2), so the outline increases by one level. These are the demo's own pages, not library API, so the fix is local to the two story files.

### [minor] bypass-blocks-no-skip-link

**Claim:** There is no skip-to-content link; a keyboard-only (non-AT) user must Tab through the whole persistent SidebarDock category rail (and, at the bottom, the BottomDock story-tab strip) before reaching page content on initial load.

**Evidence:** grep for skip/skip-link/#main across demo/shell + demo/chassis returns nothing. AppShell.vue mounts SidebarDock (a category button per CATEGORY, always-expanded) as the first focusable region and BottomDock as a full per-story tab strip, both persistent across routes. WCAG 2.4.1 is partially met for AT via the `<main>` (AppShell.vue:185) and `<nav>` landmarks plus the route-settle focus move to `<main tabindex="-1">`, but a sighted keyboard-only user has no mechanism to bypass the repeated nav blocks on first load.

**Proposed:** Add a visually-hidden 'Skip to content' link as the first focusable element in AppShell that targets the `<main>` (which already has tabindex="-1"). Low-cost, closes the keyboard-only bypass gap.

### [note] redundant-native-disabled-state

**Claim:** DockControl stamps BOTH the native `disabled` attribute and `aria-disabled="true"` on disabled button controls; native disabled dominates (removes focusability), so the aria-disabled is dead and the 'present-but-disabled' boundary control cannot be Tab-focused to surface its tooltip/reason.

**Evidence:** DockControl.vue:99-104 — when `as==="button" && !asChild`, stateAttrs emits `{ disabled: true, "aria-disabled": "true" }` together. BottomDock.vue prev/next use `:disabled="!hasPrev"`/`:disabled="!hasNext"`, so at a category boundary they become natively disabled (unfocusable) while the component doc-comment states the intent is a control that 'stays PRESENT but disabled so the row geometry holds' — but native disabled also removes it from tab order, so a keyboard user can neither focus it nor read its 'Previous story' tooltip.

**Proposed:** Pick one model: for a boundary nav control that should remain discoverable, use aria-disabled="true" + a click/keydown guard (keep it focusable), and drop the native `disabled`; otherwise drop the now-dead `aria-disabled`. Do not emit both.

### [note] nav-keyboard-model-mismatch

**Claim:** SidebarDock's comments describe a 'roving category tablist', but the DOM is a `role="group"` of individually-tabbable buttons with no roving tabindex and no arrow-key navigation — a comment-vs-reality mismatch and a mild keyboard-efficiency gap for the primary nav the charter flagged.

**Evidence:** SidebarDock.vue:71 and :117 comment 'Foundations participates in the roving category tablist ... one tab stop', yet the markup is `<div class="contents" role="group" aria-label="Categories">` (SidebarDock.vue) with each category as a separate DockControl <button> — so every category is its own Tab stop (not one roving stop) and there is no ArrowUp/Down handler anywhere in the dock (grep for roving/tabindex/arrow across dock composables returns only the press-spring keydown, not navigation). This is WCAG-acceptable for a set of buttons but does not match the documented tablist model.

**Proposed:** Either correct the comments to reflect the group-of-buttons reality, or implement true roving tabindex + arrow-key navigation if the tablist model is intended. No functional a11y violation, but the docstring is misleading for maintainers.

