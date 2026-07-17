// The dock rail APG a11y contract (proof:dock-a11y-contract).
//
// The rail carries the APG tabs contract (role=tablist/tab + aria-selected + roving
// tabindex + Arrow/Home/End + a travelling indicator). retired the reka
// `ui/tabs` substrate; the rail is now driven by the library's ONE headless selection
// engine `useSelectionGroup` (roving + role-per-mode ARIA + the ONE traveling-indicator
// writer, Safari-identical). This test asserts the RENDERED roles/attributes — NOT just
// mount success — per the glass-ui-binding-verification discipline: a stale binding
// silently no-ops and only a rendered-attr assertion catches it.
//
// Bite-check (hard gate): flip `aria-selected` back to `aria-pressed`
// (in the component or here) → the SELECTED-NOT-PRESSED assertion reddens.

import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import DockLayerGroup from "@glass/components/dock/DockLayerGroup.vue";
import DockLayer from "@glass/components/dock/DockLayer.vue";

/**
 * Mount a `<GlassDock>` (so the dock context — keepOpen/release — is provided)
 * wrapping a `<DockLayerGroup>` with two `<DockLayer>` panes. The group's
 * `active` v-model starts at "a".
 */
async function mountRail(withThirdFace = false) {
    const active = ref("a");
    const Host = defineComponent({
        setup() {
            return () =>
                h(GlassDock, { startCollapsed: false }, () => [
                    h(
                        DockLayerGroup,
                        {
                            active: active.value,
                            "onUpdate:active": (v: string) => (active.value = v),
                        },
                        () => [
                            h(DockLayer, { id: "a", label: "Assets" }, () =>
                                h("button", { class: "pane-a-btn" }, "in-a"),
                            ),
                            h(DockLayer, { id: "b", label: "Layers" }, () =>
                                h("button", { class: "pane-b-btn" }, "in-b"),
                            ),
                            ...(withThirdFace
                                ? [
                                      h(
                                          DockLayer,
                                          { id: "c", label: "Libraries" },
                                          () =>
                                              h(
                                                  "button",
                                                  { class: "pane-c-btn" },
                                                  "in-c",
                                              ),
                                      ),
                                  ]
                                : []),
                        ],
                    ),
                ]);
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    // Expand the dock so the `.dock-layer--full` (which holds the DockLayerGroup)
    // is interactive; flush so the registered layers (DockLayer onMounted) make
    // `layers.length > 1` and the rail's `v-if` paints.
    const dockVm = wrapper.findComponent(GlassDock).vm as unknown as {
        expand: () => void;
    };
    dockVm.expand();
    await nextTick();
    await nextTick();
    return { wrapper, active };
}

describe("dock rail a11y contract (APG tabs)", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it("1. ROLES — rail is role=tablist with role=tab triggers", async () => {
        const { wrapper } = await mountRail();
        const tablist = wrapper.find('[role="tablist"]');
        expect(tablist.exists()).toBe(true);
        expect(tablist.classes()).toContain("dock-layer-rail");
        const tabs = wrapper.findAll('[role="tab"]');
        expect(tabs).toHaveLength(2);
        for (const t of tabs) expect(t.classes()).toContain("dock-layer-tab");
    });

    it("inherits a vertical dock as a horizontal switcher rail", async () => {
        const active = ref("a");
        const wrapper = mount(defineComponent({
            setup: () => () =>
                h(GlassDock, { orientation: "vertical" }, () =>
                    h(
                        DockLayerGroup,
                        {
                            active: active.value,
                            "onUpdate:active": (value: string) =>
                                (active.value = value),
                        },
                        () => [
                            h(DockLayer, { id: "a", label: "A" }, () => "A"),
                            h(DockLayer, { id: "b", label: "B" }, () => "B"),
                        ],
                    ),
                ),
        }));
        await nextTick();
        await nextTick();

        expect(wrapper.get(".dock-layer-group").classes()).toContain("vertical");
        expect(wrapper.get('[role="tablist"]').attributes("aria-orientation")).toBe(
            "horizontal",
        );
    });

    it("2. SELECTED-NOT-PRESSED — aria-selected on the active tab; NO aria-pressed anywhere", async () => {
        const { wrapper } = await mountRail();
        const tabs = wrapper.findAll('[role="tab"]');
        // Exactly one selected, and it is the first (active = "a").
        const selected = tabs.filter(
            (t) => t.attributes("aria-selected") === "true",
        );
        expect(selected).toHaveLength(1);
        expect(tabs[0].attributes("aria-selected")).toBe("true");
        expect(tabs[1].attributes("aria-selected")).toBe("false");
        // The hand-rolled TOGGLE attr must be GONE from the whole rail.
        expect(wrapper.find('[aria-pressed]').exists()).toBe(false);
    });

    it("3. ROVING-TABINDEX — exactly one tab is the tab stop (0), the others -1", async () => {
        const { wrapper } = await mountRail();
        // reka's RovingFocus seats the tab stop on the active item when focus
        // ENTERS the group (the APG single-tab-stop contract — the group is one
        // stop; arrow keys move WITHIN it). Simulate the Tab-in (focus the active
        // trigger) then assert exactly one `tabindex=0`, the rest `-1`.
        const tabs = wrapper.findAll('[role="tab"]');
        await tabs[0].trigger("focus");
        await wrapper.vm.$nextTick();
        const after = wrapper.findAll('[role="tab"]');
        const zeros = after.filter((t) => t.attributes("tabindex") === "0");
        const negs = after.filter((t) => t.attributes("tabindex") === "-1");
        expect(zeros).toHaveLength(1);
        expect(negs).toHaveLength(after.length - 1);
        // The focused/active tab is the single tab stop.
        expect(after[0].attributes("tabindex")).toBe("0");
        expect(after[0].attributes("aria-selected")).toBe("true");
    });

    it("4. KEYBOARD — ArrowDown/Home/End move selection (reka APG handler)", async () => {
        // The DEFAULT (horizontal-group) rail is a COLUMN of stacked
        // tabs, so reka's orientation is now "vertical" (the rail's visual axis), and
        // the APG keyboard for a vertical tablist is Up/Down (the correct mapping for
        // a column rail). A vertical-group ROW rail uses Left/Right.
        const { wrapper } = await mountRail();
        const tabs = wrapper.findAll('[role="tab"]');
        await tabs[0].trigger("focus");
        await tabs[0].trigger("keydown", { key: "ArrowDown" });
        await wrapper.vm.$nextTick();
        const after = wrapper.findAll('[role="tab"]');
        // ArrowDown selects/focuses the next tab (b).
        expect(after[1].attributes("aria-selected")).toBe("true");
        expect(after[1].attributes("tabindex")).toBe("0");

        await after[1].trigger("keydown", { key: "Home" });
        await wrapper.vm.$nextTick();
        const home = wrapper.findAll('[role="tab"]');
        expect(home[0].attributes("aria-selected")).toBe("true");
    });

    it("5. FOCUS-VISIBLE — rail tab carries the .dock-layer-tab class (the dock.css focus-ring selector)", async () => {
        const { wrapper } = await mountRail();
        // jsdom/happy-dom paint no :focus-visible; assert the structural class the
        // dock.css `.dock-layer-rail [role="tab"]:focus-visible` rule targets.
        const tabs = wrapper.findAll('[role="tab"]');
        expect(tabs.length).toBeGreaterThan(0);
        for (const t of tabs) expect(t.classes()).toContain("dock-layer-tab");
    });

    it("6. KEEP-OPEN — focusing a rail tab calls keepOpen; leaving the rail calls release", async () => {
        const { wrapper } = await mountRail();
        const tablist = wrapper.find('[role="tablist"]');
        const dockVm = wrapper.findComponent(GlassDock).vm as unknown as Record<
            string,
            unknown
        >;

        // focusin on the rail acquires the keep-open token (dock stays expanded).
        await tablist.trigger("focusin");
        expect(dockVm.isHeld).toBe(true);

        // focusout with relatedTarget OUTSIDE the rail releases it.
        const outside = document.createElement("button");
        document.body.appendChild(outside);
        await tablist.trigger("focusout", { relatedTarget: outside });
        expect(dockVm.isHeld).toBe(false);
        outside.remove();
    });

    it("7. ARIA-HIDDEN — the inactive .dock-face carries aria-hidden=true", async () => {
        const { wrapper } = await mountRail();
        const hosts = wrapper.findAll(".dock-face");
        expect(hosts).toHaveLength(2);
        const active = hosts.find((h) => h.classes().includes("is-active"));
        const inactive = hosts.find((h) => !h.classes().includes("is-active"));
        expect(active?.attributes("aria-hidden")).toBeUndefined();
        expect(inactive?.attributes("aria-hidden")).toBe("true");
    });

    it("8. TRAVELLING-INDICATOR — the .dock-layer-tab-indicator rides the ONE selection-indicator writer", async () => {
        const { wrapper } = await mountRail();
        // The reka `ui/tabs` substrate is retired; the rail is driven
        // by the ONE headless selection engine `useSelectionGroup`, and the travelling
        // indicator is a PLAIN `.dock-layer-tab-indicator` element carrying the
        // `useSelectionIndicator` writer's inline style (Safari-identical, no anchor
        // branch). Unlike the geometry-gated reka element, this plain div always renders,
        // so assert the element EXISTS with an inline style attribute (its transform/
        // opacity/size are 0 in happy-dom; the painted placement rides).
        const indicator = wrapper.find(".dock-layer-tab-indicator");
        expect(indicator.exists()).toBe(true);
        expect(indicator.attributes("style")).toBeDefined();
        expect(indicator.attributes("aria-hidden")).toBe("true");
    });

    it("keeps entering and leaving faces co-present until the spring settles", async () => {
        const { wrapper, active } = await mountRail();

        active.value = "b";
        await nextTick();
        await nextTick();

        const crossfade = wrapper.get(".dock-crossfade");
        const entering = wrapper
            .get(".pane-b-btn")
            .element.closest<HTMLElement>(".dock-face")!;
        const leaving = wrapper
            .get(".pane-a-btn")
            .element.closest<HTMLElement>(".dock-face")!;

        expect(crossfade.attributes("data-crossfading")).toBe("");
        expect(entering.classList).toContain("is-active");
        expect(entering.hasAttribute("inert")).toBe(false);
        expect(leaving.classList).toContain("is-leaving");
        expect(leaving.hasAttribute("inert")).toBe(true);

        await vi.advanceTimersByTimeAsync(24);
        const progress = Number.parseFloat(
            entering.style.getPropertyValue("--dock-t"),
        );
        expect(progress).toBeGreaterThan(0);
        expect(progress).toBeLessThan(1);
        expect(leaving.style.getPropertyValue("--dock-t")).toBe(
            entering.style.getPropertyValue("--dock-t"),
        );

        await vi.advanceTimersByTimeAsync(1200);
        expect(crossfade.attributes("data-crossfading")).toBeUndefined();
        expect(wrapper.find(".dock-face.is-leaving").exists()).toBe(false);
        expect(entering.style.getPropertyValue("--dock-t")).toBe("");
        expect(leaving.style.getPropertyValue("--dock-t")).toBe("");
        wrapper.unmount();
    });

    it("preserves the partially entered face across a distinct third switch", async () => {
        const { wrapper, active } = await mountRail(true);

        active.value = "b";
        await nextTick();
        await vi.advanceTimersByTimeAsync(24);
        const paneB = wrapper
            .get(".pane-b-btn")
            .element.closest<HTMLElement>(".dock-face")!;
        const before = Number.parseFloat(paneB.style.getPropertyValue("--dock-t"));
        expect(before).toBeGreaterThan(0);
        expect(before).toBeLessThan(1);

        active.value = "c";
        await nextTick();
        const paneC = wrapper
            .get(".pane-c-btn")
            .element.closest<HTMLElement>(".dock-face")!;
        const leavingT = Number.parseFloat(
            paneB.style.getPropertyValue("--dock-t"),
        );

        expect(paneB.classList).toContain("is-leaving");
        expect(paneC.classList).toContain("is-active");
        expect(1 - leavingT).toBeCloseTo(before, 8);
        expect(paneC.style.getPropertyValue("--dock-t")).toBe("0");

        await vi.advanceTimersByTimeAsync(1200);
        expect(wrapper.find(".dock-face.is-leaving").exists()).toBe(false);
        wrapper.unmount();
    });

    /* The focus-transfer-on-dissolve assert. The post-swap
       focus re-home lives in the ONE crossfade slot
       (`DockCrossfade.transferFocusOnDissolve`): when a layer swap dissolves the
       previously-active face, a focus that lived inside it is orphaned for keyboard/AT
       users; the crossfade slot re-homes focus to the revealed successor host
       (`tabindex="-1"` landing pad) AFTER it is un-inert.

       Born-RED witness: revert `DockCrossfade.transferFocusOnDissolve` → after the swap
       `document.activeElement` stays inside the now-`[inert]` leaving face (or is `body`),
       never re-homed. Uses real timers so the `await nextTick()` + `.focus()` lands. */
    it("9. FOCUS-ORPHAN — focus is re-homed to the revealed active host after a swap", async () => {
        vi.useRealTimers();
        const { wrapper, active } = await mountRail();

        // Focus a control inside the active pane (pane "a").
        const paneABtn = wrapper.find(".pane-a-btn").element as HTMLButtonElement;
        paneABtn.focus();
        expect(document.activeElement).toBe(paneABtn);

        // Swap to pane "b". The prior pane ("a") goes `[inert]` + `aria-hidden`;
        // its focused button is orphaned — the shipped watch must re-home focus
        // to the revealed host ("b").
        active.value = "b";
        await nextTick();
        await nextTick();
        await new Promise((r) => setTimeout(r, 0));
        await nextTick();

        const hosts = wrapper.findAll(".dock-face");
        const activeHost = hosts.find((h) => h.classes().includes("is-active"));
        expect(activeHost).toBeTruthy();
        const activeHostEl = activeHost!.element as HTMLElement;

        // Focus must NOT be orphaned in the now-inert leaving pane.
        const orphaned =
            document.activeElement === null ||
            document.activeElement === document.body ||
            !!document.activeElement?.closest?.("[inert]");
        expect(orphaned).toBe(false);
        // …and it lands on the revealed active host (the tabindex=-1 re-home target).
        expect(document.activeElement).toBe(activeHostEl);
        expect(activeHostEl.getAttribute("tabindex")).toBe("-1");

        wrapper.unmount();
    });
});
