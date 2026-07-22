// DockControl selectable/disabled a11y contract (W1-B aria-pressed tri-state +
// W5-C boundary-disabled-stays-focusable). Both cut the ONE `stateAttrs` seat.
//
// This asserts the RENDERED contract — a stale `stateAttrs` binding that silently
// no-ops is caught only by a rendered-attr assertion (the binding-verification
// discipline).
//
// W1-B bite (tri-state): `active` is a THREE-state discriminant — unset ⇒ nav mode
// (NO aria-pressed), `false` ⇒ off-state toggle (aria-pressed="false"), `true` ⇒
// on (aria-pressed="true"). The naive both-states stamp reddens the nav-mode guard;
// the HEAD "only-when-truthy" stamp reddens the off-state announce.
// W5-C bite (focusable-disabled): a disabled button arm keeps `aria-disabled` +
// activation-suppression but drops the NATIVE `disabled` stamp, so a boundary nav
// control stays focusable (PRESENT-but-disabled), never DOM-unreachable.

import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import DockControl from "@glass/components/dock/DockControl.vue";

const slots = { default: () => "icon" };

describe("DockControl — aria-pressed tri-state (W1-B)", () => {
    it("omits aria-pressed entirely in nav mode (active unset)", () => {
        const w = mount(DockControl, { slots });
        expect(w.get("button").attributes("aria-pressed")).toBeUndefined();
    });

    it("announces aria-pressed=\"false\" for an off-state toggle (active: false)", () => {
        const w = mount(DockControl, { props: { active: false }, slots });
        expect(w.get("button").attributes("aria-pressed")).toBe("false");
    });

    it("announces aria-pressed=\"true\" for an on-state toggle (active: true)", () => {
        const w = mount(DockControl, { props: { active: true }, slots });
        expect(w.get("button").attributes("aria-pressed")).toBe("true");
    });

    it("keeps data-active + glass-capsule truthy-gated (present only when on)", () => {
        const on = mount(DockControl, { props: { active: true }, slots });
        const off = mount(DockControl, { props: { active: false }, slots });
        const nav = mount(DockControl, { slots });
        expect(on.get("button").attributes("data-active")).toBe("");
        expect(on.get("button").classes()).toContain("glass-capsule");
        expect(off.get("button").attributes("data-active")).toBeUndefined();
        expect(off.get("button").classes()).not.toContain("glass-capsule");
        expect(nav.get("button").attributes("data-active")).toBeUndefined();
    });
});

describe("DockControl — boundary-disabled stays focusable (W5-C)", () => {
    it("drops the native disabled stamp on the button arm (stays focusable)", () => {
        const w = mount(DockControl, { props: { disabled: true }, slots });
        const btn = w.get("button");
        expect(btn.attributes("disabled")).toBeUndefined();
        expect(btn.attributes("aria-disabled")).toBe("true");
    });

    it("suppresses activation while disabled (no click through)", async () => {
        const onClick = vi.fn();
        const w = mount(DockControl, {
            props: { disabled: true, onClick },
            slots,
        });
        await w.get("button").trigger("click");
        expect(onClick).not.toHaveBeenCalled();
    });

    it("activates normally when enabled", async () => {
        const onClick = vi.fn();
        const w = mount(DockControl, { props: { onClick }, slots });
        await w.get("button").trigger("click");
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
