# INBOUND O-133 into 10.1.5 (orchestrator note, 2026-11-04)

From hassio-config-6a, consumer Home Assistant. Every later critic and fix seat of 10.1.5 treats this as IN SCOPE.

**SegmentedTabs leaks its tab z-index into the consumer's stacking context.** `src/components/tabs/styles/segmented.css:268-270`: `.segmented-tab { position: relative; z-index: 10 }` lifts the buttons above the indicator. The SegmentedTabs root forms no stacking context, so when a consumer's host forms none either, the `10` ranks in the page's root context. In Home Assistant the tab strip painted over HA's fixed app header on scroll. The consumer's workaround is `:host { isolation: isolate }`.

Cure: the SegmentedTabs root establishes its own stacking context (`isolation: isolate`), so the tab-over-indicator order stays internal. Use the smallest internal rung that orders tab over indicator, not a bare `10`. Read the indicator's own z first.

Gate, in both engines: a SegmentedTabs inside an unpositioned host, under a `position: fixed; z-index: 1` header that overlaps it on scroll. The header paints over the tabs, which is RED on v10.1.4. Inside the component the tab labels still paint above the indicator in every state: active, hover, press, and the JS indicator mid-glide.
