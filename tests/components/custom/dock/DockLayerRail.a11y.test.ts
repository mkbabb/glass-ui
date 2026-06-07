// AU.W8.4 — the reka-Tabs dock rail APG a11y contract (proof:dock-a11y-contract).
//
// The rail WAS a hand-rolled `<button :aria-pressed>` TOGGLE group; AU.W8
// converts it to a reka-ui Tabs contract (role=tablist/tab + aria-selected +
// roving tabindex + Arrow/Home/End + a travelling indicator). This test asserts
// the RENDERED roles/attributes — NOT just mount success — per the
// glass-ui-binding-verification discipline: a stale reka `:value`/`v-model`
// binding silently no-ops and only a rendered-attr assertion catches it.
//
// Bite-check (AU.W8 hard gate): flip `aria-selected` back to `aria-pressed`
// (in the component or here) → the SELECTED-NOT-PRESSED assertion reddens.

import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";

import GlassDock from "../../../../src/components/custom/dock/GlassDock.vue";
import DockLayerGroup from "../../../../src/components/custom/dock/DockLayerGroup.vue";
import DockLayer from "../../../../src/components/custom/dock/DockLayer.vue";

/**
 * Mount a `<GlassDock>` (so the dock context — keepOpen/release — is provided)
 * wrapping a `<DockLayerGroup>` with two `<DockLayer>` panes. The group's
 * `active` v-model starts at "a".
 */
async function mountRail() {
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

describe("AU.W8.4 — dock rail a11y contract (APG tabs)", () => {
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

    it("4. KEYBOARD — ArrowRight/Home/End move selection (reka APG handler)", async () => {
        const { wrapper } = await mountRail();
        const tabs = wrapper.findAll('[role="tab"]');
        await tabs[0].trigger("focus");
        await tabs[0].trigger("keydown", { key: "ArrowRight" });
        await wrapper.vm.$nextTick();
        const after = wrapper.findAll('[role="tab"]');
        // ArrowRight selects/focuses the next tab (b).
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

    it("7. ARIA-HIDDEN — the inactive .dock-layer-item-host carries aria-hidden=true", async () => {
        const { wrapper } = await mountRail();
        const hosts = wrapper.findAll(".dock-layer-item-host");
        expect(hosts).toHaveLength(2);
        const active = hosts.find((h) => h.classes().includes("is-active"));
        const inactive = hosts.find((h) => !h.classes().includes("is-active"));
        expect(active?.attributes("aria-hidden")).toBeUndefined();
        expect(inactive?.attributes("aria-hidden")).toBe("true");
    });

    it("8. TRAVELLING-INDICATOR — the reka TabsIndicator is composed with the dock class", async () => {
        const { wrapper } = await mountRail();
        // The reka TabsIndicator's rendered DOM element is geometry-gated (it
        // paints only once it can read the active tab's offsetWidth — zero/absent
        // in happy-dom), so assert the COMPONENT is composed with the dock class
        // (the binding-verification target) rather than its conditionally-painted
        // element. The rendered placement is exercised by the slides deck's
        // downstream Playwright dock validation.
        const indicator = wrapper
            .findAllComponents({ name: "TabsIndicator" })
            .find((c) =>
                String(c.props("class") ?? "").includes("dock-layer-tab-indicator"),
            );
        expect(indicator).toBeTruthy();
    });

    /* AW.W3 — the focus-orphan assert (a gate addition against the EXISTING
       `DockLayer.vue:46-67` post-swap focus re-home; NO new component code). When
       a layer swap hides the previously-active pane, a focus that lived inside it
       is orphaned for keyboard/AT users; the shipped `watch(isActive)` orphan
       guard re-homes focus to the revealed active host (`tabindex="-1"`).

       Born-RED witness: revert the `DockLayer.vue` watch → after the swap
       `document.activeElement` stays inside the now-`[inert]` leaving pane (or is
       `body`), never re-homed to the active host. GREEN here proves the shipped
       code bites. Uses real timers so the watch's `await nextTick()` + `.focus()`
       lands. */
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

        const hosts = wrapper.findAll(".dock-layer-item-host");
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
