// O-32 §3.3—the manual-override exemption is an opt-in attribute in the producer's own
// data-* vocabulary. A pointerdown inside [data-toc-id] or [data-sidebar-follow-exempt]
// leaves following live; any other pointerdown in the nav suspends it. No consumer class
// name is matched.
//
// happy-dom has no layout, so the nav's clientHeight/scrollHeight and the target item's
// offsetTop are stubbed; the damped follow then moves nav.scrollTop off 0 within a few
// frames when following is live, and leaves it at 0 when it is suspended.

import { nextTick, ref } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import { useSidebarFollow } from "@glass/composables/sidebar/useSidebarFollow";
import { mountComposable } from "../../utils/mountComposable";

function stub(el: HTMLElement, key: string, value: number): void {
    Object.defineProperty(el, key, { configurable: true, get: () => value });
}

function fixture(pressed: (nav: HTMLElement) => HTMLElement) {
    const nav = document.createElement("nav");
    stub(nav, "clientHeight", 100);
    stub(nav, "scrollHeight", 2000);
    const far = document.createElement("a");
    far.setAttribute("data-toc-id", "far");
    stub(far, "offsetTop", 1000);
    stub(far, "offsetHeight", 20);
    nav.appendChild(far);
    const control = pressed(nav);
    nav.appendChild(control);
    document.body.appendChild(nav);

    const sidebarEl = ref<HTMLElement | null>(nav);
    const activeId = ref<string | null>(null);
    const mounted = mountComposable(() => useSidebarFollow({ sidebarEl, activeId }));
    return { nav, control, activeId, ...mounted };
}

async function frames(n: number): Promise<void> {
    for (let i = 0; i < n; i++) {
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    }
}

async function pressThenActivate(pressed: (nav: HTMLElement) => HTMLElement) {
    const f = fixture(pressed);
    await nextTick();
    f.control.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    f.activeId.value = "far";
    await nextTick();
    await nextTick();
    await frames(8);
    const scrollTop = f.nav.scrollTop;
    f.unmount();
    return scrollTop;
}

describe("useSidebarFollow — the manual-override exemption", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("keeps following after a press on a [data-sidebar-follow-exempt] control", async () => {
        const scrollTop = await pressThenActivate(() => {
            const button = document.createElement("button");
            button.setAttribute("data-sidebar-follow-exempt", "");
            button.appendChild(document.createElement("span"));
            return button;
        });
        expect(scrollTop).toBeGreaterThan(0);
    });

    it("keeps following after a press on a [data-toc-id] item", async () => {
        const scrollTop = await pressThenActivate(() => {
            const item = document.createElement("a");
            item.setAttribute("data-toc-id", "near");
            return item;
        });
        expect(scrollTop).toBeGreaterThan(0);
    });

    it("suspends following after a press on an unmarked control", async () => {
        const scrollTop = await pressThenActivate(() => document.createElement("button"));
        expect(scrollTop).toBe(0);
    });

    it("matches no consumer class name — a .sidebar-top-btn press suspends", async () => {
        const scrollTop = await pressThenActivate(() => {
            const button = document.createElement("button");
            button.className = "sidebar-top-btn";
            return button;
        });
        expect(scrollTop).toBe(0);
    });
});
