import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import {
    useDockState,
    type UseDockStateReturn,
} from "@glass/components/dock/composables/useDockState";
import { useDockSearch } from "@glass/components/dock/composables/useDockSearch";
import { useDockShellProps } from "@glass/components/dock/composables/useDockShellProps";
import { HOVER_INTENT_MS } from "@glass/components/dock/constants";

/**
 * The dock's POSTURE surface: the one `collapse` member, the FSM it resolves to, and
 * the a11y disclosure contract on the collapsed face.
 *
 * [2026-08-12 · BK #47 W1 SURFACE] This file replaces
 * `GlassDock.interaction-manual.test.ts`. The `interaction="manual"` pole — which
 * suppressed every environmental posture writer at both poles — is STRUCK with its
 * prop, so every manual-only contract (T1–T12, T15a, T16, the H8 manual
 * keyboard-reachability case, the `data-interaction` observability trio) has no
 * subject left to assert. What survives is what was never about that pole: the auto
 * FSM's own floor, the force-pinned pole, the fold that resolves `collapse` into
 * both, and the collapsed-face disclosure/Escape contracts.
 *
 * Each test asserts a STATE OUTCOME across a simulated gesture (never "the guard
 * returned early"). jsdom + fake timers.
 */

// ── useDockState composable harness (the FSM seam under test) ──────────────────
interface StateHarness {
    handle: UseDockStateReturn;
    unmount: () => void;
}

const mounted: Array<{ unmount: () => void }> = [];

function mountState(
    opts: {
        initialExpanded?: boolean;
        alwaysExpanded?: boolean;
        collapseDelay?: number;
    } = {},
): StateHarness {
    const alwaysExpanded = ref<boolean>(opts.alwaysExpanded ?? false);
    let handle!: UseDockStateReturn;
    const Host = defineComponent({
        setup() {
            const rootEl = ref<HTMLElement | null>(null);
            handle = useDockState({
                rootEl,
                alwaysExpanded,
                initialExpanded: opts.initialExpanded ?? false,
                ...(opts.collapseDelay === undefined
                    ? {}
                    : { collapseDelay: opts.collapseDelay }),
            });
            return () => h("div", { ref: rootEl, class: "state-root" });
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    const h0 = { unmount: () => wrapper.unmount() };
    mounted.push(h0);
    return { handle, unmount: h0.unmount };
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
    for (const m of mounted.splice(0)) m.unmount();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("useDockState — the auto FSM floor", () => {
    it("hover-expand fires after the intent dwell", () => {
        const { handle } = mountState();
        handle.onMouseEnter();
        vi.advanceTimersByTime(HOVER_INTENT_MS + 20);
        expect(handle.state.value).toBe("hover");
    });

    it("idle-collapse fires on the one collapse window", () => {
        const { handle } = mountState({ initialExpanded: true });
        handle.onMouseLeave();
        vi.runAllTimers();
        expect(handle.expanded.value).toBe(false);
    });

    it("alwaysExpanded force-pins and suppresses every environmental writer", () => {
        const { handle } = mountState({ alwaysExpanded: true });
        expect(handle.state.value).toBe("pinned");
        handle.onMouseLeave();
        handle.onClickCollapsed();
        vi.runAllTimers();
        expect(handle.state.value).toBe("pinned");
        // The imperative pair is a no-op under the force-pin.
        handle.collapse();
        expect(handle.state.value).toBe("pinned");
    });
});

describe("useDockShellProps — `collapse` folds the two retired posture props", () => {
    it("`false` is the force-pinned pole and never starts collapsed", () => {
        const shell = useDockShellProps({ collapse: false });
        expect(shell.alwaysExpanded.value).toBe(true);
        expect(shell.startCollapsed.value).toBe(false);
    });

    it('`"closed"` is collapsible and mounts collapsed', () => {
        const shell = useDockShellProps({ collapse: "closed" });
        expect(shell.alwaysExpanded.value).toBe(false);
        expect(shell.startCollapsed.value).toBe(true);
    });

    it('`"open"` is collapsible and mounts expanded', () => {
        const shell = useDockShellProps({ collapse: "open" });
        expect(shell.alwaysExpanded.value).toBe(false);
        expect(shell.startCollapsed.value).toBe(false);
    });

    it('defaults to `"closed"`', () => {
        const shell = useDockShellProps({});
        expect(shell.alwaysExpanded.value).toBe(false);
        expect(shell.startCollapsed.value).toBe(true);
    });
});

// ── GlassDock integration: the emitted surface + the a11y disclosure contract ──
function mountDock(
    props: Record<string, unknown>,
    slots: Record<string, () => unknown> = {},
) {
    const wrapper = mount(GlassDock, {
        props: { ...props },
        slots,
        attachTo: document.body,
    });
    mounted.push({ unmount: () => wrapper.unmount() });
    return wrapper;
}

describe("GlassDock — the W1 six-prop surface is what the root emits", () => {
    it("stamps NONE of the seven struck props' hooks", () => {
        // The falsifier for the cut: restore any struck prop's emission and one of
        // these flips. `data-size`/`data-interaction`/`data-search` were prop-driven
        // attributes; `layout-*` and the position registers were prop-driven classes.
        const root = mountDock({}).get(".glass-dock");
        expect(root.attributes("data-size")).toBeUndefined();
        expect(root.attributes("data-interaction")).toBeUndefined();
        expect(root.attributes("data-search")).toBeUndefined();
        const classes = root.classes();
        expect(classes).not.toContain("layout-linear");
        expect(classes).not.toContain("layout-grid");
        expect(classes).not.toContain("dock-inline");
        expect(classes).not.toContain("dock-sticky");
        expect(classes).not.toContain("dock-overflow-wrap");
    });

    it("keeps the six survivors observable on the root", () => {
        const root = mountDock({
            collapse: false,
            shape: "card",
            orientation: "vertical",
            fitContent: true,
            backdropMode: "static",
        }).get(".glass-dock");
        expect(root.classes()).toEqual(
            expect.arrayContaining([
                "vertical",
                "shape-card",
                "fit-content",
                "always-expanded",
                "pinned",
            ]),
        );
        expect(root.attributes("data-backdrop-mode")).toBe("static");

        /* [2026-08-10 · BK #47 W1 CURE] …and the SAME root with `collapse` ABSENT is
           the OTHER pole. This is the falsifier for the boolean-cast trap: because
           `DockCollapse` admits `false`, the macro compiles `type: [Boolean, String]`
           and Vue casts an absent value to `false` unless the SFC declares the
           default — so an unprop'd dock silently mounted force-pinned. The
           useDockShellProps seat above cannot see it (it is called with a plain
           object and never goes through prop resolution); only a MOUNTED dock can.
           Drop `collapse: "closed"` from GlassDock.vue's withDefaults and this flips. */
        const bare = mountDock({}).get(".glass-dock");
        expect(bare.classes()).toContain("collapsed");
        expect(bare.classes()).not.toContain("always-expanded");
        expect(bare.classes()).not.toContain("pinned");
    });

    it("the `#search` aperture IS the opt-in — authored renders it, absent does not", () => {
        expect(mountDock({}).find(".dock-search-field").exists()).toBe(false);
        const withSlot = mountDock(
            { collapse: false },
            { search: () => h("input", { "data-testid": "field" }) },
        );
        expect(withSlot.find(".dock-search-field").exists()).toBe(true);
        expect(withSlot.find("[data-testid='field']").exists()).toBe(true);
    });
});

describe("GlassDock — collapsed-face disclosure contract", () => {
    const reachableFaces = (wrapper: ReturnType<typeof mountDock>) =>
        wrapper
            .findAll(".dock-layer")
            .filter((face) => !face.element.hasAttribute("inert"));

    it("focuses the summary without expanding and keeps exactly one face reachable", async () => {
        const wrapper = mountDock(
            { collapse: "closed" },
            {
                default: () => h("button", { "data-testid": "full-first" }, "Home"),
                collapsed: () => h("span", { "data-testid": "summary-content" }, "More"),
            },
        );
        const summary = wrapper.get<HTMLDivElement>(".dock-layer--summary");
        const full = wrapper.get(".dock-layer--full");

        expect(summary.element.tagName).toBe("DIV");
        expect(summary.attributes()).toMatchObject({
            role: "button",
            tabindex: "0",
            "aria-label": "Expand dock",
            "aria-expanded": "false",
        });
        expect(summary.attributes("aria-controls")).toBe(full.attributes("id"));
        expect(full.attributes("inert")).toBe("");
        summary.element.focus();
        await nextTick();

        expect(document.activeElement).toBe(summary.element);
        expect(wrapper.find(".glass-dock").classes()).toContain("collapsed");
        expect(reachableFaces(wrapper)).toHaveLength(1);
        expect(reachableFaces(wrapper)[0]!.element).toBe(summary.element);
    });

    it.each(["Enter", " "])(
        "%s pins and focuses the first full-face descendant after seating",
        async (key) => {
            const wrapper = mountDock(
                { collapse: "closed" },
                {
                    default: () => h("button", { "data-testid": "full-first" }, "Home"),
                    collapsed: () => h("span", "More"),
                },
            );
            const summary = wrapper.get<HTMLDivElement>(".dock-layer--summary");
            const event = new KeyboardEvent("keydown", {
                key,
                bubbles: true,
                cancelable: true,
            });
            summary.element.dispatchEvent(event);
            await nextTick();
            await nextTick();

            const full = wrapper.get(".dock-layer--full");
            expect(event.defaultPrevented).toBe(true);
            expect(full.attributes("inert")).toBeUndefined();
            expect(summary.attributes("inert")).toBe("");
            expect(document.activeElement).toBe(
                wrapper.get<HTMLButtonElement>("[data-testid='full-first']").element,
            );
            expect(reachableFaces(wrapper)).toHaveLength(1);
            expect(reachableFaces(wrapper)[0]!.element).toBe(full.element);
        },
    );

    /* [2026-08-10 · BK #47 W1 CURE] The four Escape cases state `collapse: "open"`
       and not `{}`. Escape→collapse needs a dock that is EXPANDED **and**
       COLLAPSIBLE, and that is exactly one pole of the member: `"closed"` mounts
       collapsed (nothing to dismiss), `false` is force-pinned (nothing CAN dismiss),
       and `{}` is whatever the default resolves to — which is not a precondition a
       test may leave to a default it does not own. Authored as `{}` these read a
       force-pinned dock (the boolean-cast defect cured in GlassDock.vue this seat),
       so three RED-ed against a dock that cannot collapse and the fourth — "leaves
       the dock expanded" — was FALSE-GREEN: a pinned dock trivially stays expanded
       and proves nothing about the dismissable-layer veto it names. */
    it("Escape collapses the full face and restores focus to the seated summary", async () => {
        const wrapper = mountDock(
            { collapse: "open" },
            {
                default: () => h("button", { "data-testid": "full-first" }, "Home"),
                collapsed: () => h("span", "More"),
            },
        );
        const full = wrapper.get(".dock-layer--full");
        const first = wrapper.get<HTMLButtonElement>("[data-testid='full-first']");
        first.element.focus();
        const event = new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
            cancelable: true,
        });
        first.element.dispatchEvent(event);
        await nextTick();
        await nextTick();

        const summary = wrapper.get<HTMLDivElement>(".dock-layer--summary");
        // The dock does NOT preventDefault: reka's DismissableLayer reads the flag on a
        // window-level bubble and would be suppressed by it.
        expect(event.defaultPrevented).toBe(false);
        expect(full.attributes("inert")).toBe("");
        expect(summary.attributes("inert")).toBeUndefined();
        expect(document.activeElement).toBe(summary.element);
        expect(reachableFaces(wrapper)).toHaveLength(1);
        expect(reachableFaces(wrapper)[0]!.element).toBe(summary.element);
    });

    it("Escape inside an OPEN hosted layer leaves the dock expanded — the layer owns the dismiss", async () => {
        const wrapper = mountDock(
            { collapse: "open" },
            {
                default: () =>
                    // reka's own DismissableLayer marker — the primitive that owns
                    // Escape→dismiss stamps `data-dismissable-layer` alongside its state.
                    h("div", { "data-dismissable-layer": "", "data-state": "open" }, [
                        h("button", { "data-testid": "in-layer" }, "Item"),
                    ]),
                collapsed: () => h("span", "More"),
            },
        );
        const full = wrapper.get(".dock-layer--full");
        const inLayer = wrapper.get<HTMLButtonElement>("[data-testid='in-layer']");
        inLayer.element.focus();
        inLayer.element.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                bubbles: true,
                cancelable: true,
            }),
        );
        await nextTick();
        await nextTick();

        expect(full.attributes("inert")).toBeUndefined();
        expect(
            wrapper.get<HTMLDivElement>(".dock-layer--summary").attributes("inert"),
        ).toBe("");
    });

    it("an OPEN ACCORDION in the pane does NOT eat Escape — it owns no dismiss, so the dock collapses", async () => {
        const wrapper = mountDock(
            { collapse: "open" },
            {
                // reka stamps `data-state="open"` on Accordion/Collapsible content too,
                // but neither handles Escape. Only the DismissableLayer marker earns the
                // veto — a bare open-state ancestor must not swallow the collapse.
                default: () =>
                    h("div", { "data-state": "open" }, [
                        h("button", { "data-testid": "in-accordion" }, "Item"),
                    ]),
                collapsed: () => h("span", "More"),
            },
        );
        const full = wrapper.get(".dock-layer--full");
        const inAccordion = wrapper.get<HTMLButtonElement>(
            "[data-testid='in-accordion']",
        );
        inAccordion.element.focus();
        inAccordion.element.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                bubbles: true,
                cancelable: true,
            }),
        );
        await nextTick();
        await nextTick();

        expect(full.attributes("inert")).toBe("");
        expect(
            wrapper.get<HTMLDivElement>(".dock-layer--summary").attributes("inert"),
        ).toBeUndefined();
    });

    it("a dock HOSTED INSIDE an open dismissable layer still collapses — the match is bounded by the full face", async () => {
        // The unbounded `closest()` walked past the dock root: a dock inside an open
        // Dialog matched the DIALOG's layer and could never Escape-collapse.
        const host = document.createElement("div");
        host.setAttribute("data-dismissable-layer", "");
        host.setAttribute("data-state", "open");
        document.body.appendChild(host);
        const wrapper = mount(GlassDock, {
            props: { collapse: "open" },
            slots: {
                default: () => h("button", { "data-testid": "full-first" }, "Home"),
                collapsed: () => h("span", "More"),
            },
            attachTo: host,
        });
        mounted.push({
            unmount: () => {
                wrapper.unmount();
                host.remove();
            },
        });

        const full = wrapper.get(".dock-layer--full");
        const first = wrapper.get<HTMLButtonElement>("[data-testid='full-first']");
        first.element.focus();
        first.element.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                bubbles: true,
                cancelable: true,
            }),
        );
        await nextTick();
        await nextTick();

        expect(full.attributes("inert")).toBe("");
        expect(
            wrapper.get<HTMLDivElement>(".dock-layer--summary").attributes("inert"),
        ).toBeUndefined();
    });
});

// ── useDockSearch: the armSearch reroute ───────────────────────────────────────
function mountSearch() {
    let dock!: UseDockStateReturn;
    let search!: ReturnType<typeof useDockSearch>;
    const Host = defineComponent({
        setup() {
            const rootEl = ref<HTMLElement | null>(null);
            dock = useDockState({ rootEl });
            search = useDockSearch({ dockState: dock, items: () => [] });
            return () => h("div", { ref: rootEl });
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    mounted.push({ unmount: () => wrapper.unmount() });
    return { dock, search };
}

describe("useDockSearch — armSearch opens via the imperative expand() (H5)", () => {
    it("armSearch writes the FREE hover pole, not the pinned collapsed-tap pole", () => {
        const { dock, search } = mountSearch();
        search.armSearch();
        expect(dock.expanded.value).toBe(true);
        expect(dock.state.value).toBe("hover");
    });

    it("disarmSearch grace-collapses back to the pill (the latent-bug fix)", () => {
        const { dock, search } = mountSearch();
        search.armSearch();
        expect(dock.state.value).toBe("hover");
        search.disarmSearch();
        // The grace-collapse guards state==="hover"; expand() (not onClickCollapsed→
        // "pinned") makes the documented "returns to a compact PERSISTENT bar" fire.
        vi.runAllTimers();
        expect(dock.expanded.value).toBe(false);
    });
});
