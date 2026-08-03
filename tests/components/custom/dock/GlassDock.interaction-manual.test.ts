import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import type { Ref } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import DockControl from "@glass/components/dock/DockControl.vue";
import {
    useDockState,
    type UseDockStateReturn,
} from "@glass/components/dock/composables/useDockState";
import { useDockSearch } from "@glass/components/dock/composables/useDockSearch";
import {
    useDockShellProps,
    type DockInteraction,
} from "@glass/components/dock/composables/useDockShellProps";
import { HOVER_INTENT_MS } from "@glass/components/dock/constants";

/**
 * The consumer-owned posture axis (the
 * six-close dock disease). `interaction="manual"` suppresses EVERY internal
 * environmental posture writer (hover / focus / idle timer / outside-click /
 * collapsed-tap) at BOTH poles, leaving only the imperative `expand()` /
 * `collapse()` operative — the consumer owns posture through one reducer.
 *
 * Each test asserts a STATE OUTCOME across a simulated gesture (never "the guard
 * returned early"). jsdom + fake timers. The exhaustive DOM hover/focus/touch
 * suppression + the live mid-hover flip ride the visual-sweep native debt
 *; these unit contracts pin the FSM seam.
 */

// ── useDockState composable harness (the FSM seam under test) ──────────────────
interface StateHarness {
    handle: UseDockStateReturn;
    interaction: Ref<DockInteraction>;
    alwaysExpanded: Ref<boolean>;
    unmount: () => void;
}

const mounted: Array<{ unmount: () => void }> = [];

function mountState(
    opts: {
        interaction?: DockInteraction;
        initialExpanded?: boolean;
        alwaysExpanded?: boolean;
        collapseDelay?: number;
    } = {},
): StateHarness {
    const interaction = ref<DockInteraction>(opts.interaction ?? "auto");
    const alwaysExpanded = ref<boolean>(opts.alwaysExpanded ?? false);
    let handle!: UseDockStateReturn;
    const Host = defineComponent({
        setup() {
            const rootEl = ref<HTMLElement | null>(null);
            handle = useDockState({
                rootEl,
                interaction,
                alwaysExpanded,
                initialExpanded: opts.initialExpanded ?? false,
                collapseDelay: opts.collapseDelay ?? 3600,
            });
            return () => h("div", { ref: rootEl, class: "state-root" });
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    const h0 = { unmount: () => wrapper.unmount() };
    mounted.push(h0);
    return { handle, interaction, alwaysExpanded, unmount: h0.unmount };
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
    for (const m of mounted.splice(0)) m.unmount();
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("useDockState — manual suppresses every environmental writer at both poles", () => {
    it("T1 · hover: onMouseEnter + dwell flush stays collapsed", () => {
        const { handle } = mountState({ interaction: "manual" });
        expect(handle.expanded.value).toBe(false);
        handle.onMouseEnter();
        vi.advanceTimersByTime(HOVER_INTENT_MS + 20);
        expect(handle.state.value).toBe("collapsed");
    });

    it("T2 · focus: onFocusIn stays collapsed", () => {
        const { handle } = mountState({ interaction: "manual" });
        handle.onFocusIn();
        expect(handle.state.value).toBe("collapsed");
    });

    it("T3 · idle/leave: onMouseLeave + collapseDelay flush stays expanded", () => {
        const { handle } = mountState({
            interaction: "manual",
            initialExpanded: true,
        });
        expect(handle.expanded.value).toBe(true);
        handle.onMouseLeave();
        vi.runAllTimers();
        expect(handle.expanded.value).toBe(true);
    });

    it("T4 · focusout: onFocusOut to outside + flush stays expanded", () => {
        const { handle } = mountState({
            interaction: "manual",
            initialExpanded: true,
        });
        // A focusout whose relatedTarget is a detached (outside) node — in auto this
        // schedules a collapse; in manual it is suppressed.
        const outside = document.createElement("button");
        document.body.appendChild(outside);
        handle.onFocusOut({
            currentTarget: document.createElement("div"),
            relatedTarget: outside,
        } as unknown as FocusEvent);
        vi.runAllTimers();
        expect(handle.expanded.value).toBe(true);
        outside.remove();
    });

    it("T5 · outside-click: a document pointerdown outside the root stays expanded", async () => {
        const { handle } = mountState({
            interaction: "manual",
            initialExpanded: true,
        });
        // Flush the rAF-deferred click-away install, then fire a real outside pointerdown.
        vi.runAllTimers();
        await nextTick();
        document.body.dispatchEvent(
            new PointerEvent("pointerdown", { bubbles: true, cancelable: true }),
        );
        await nextTick();
        expect(handle.expanded.value).toBe(true);
    });

    it("T6 · collapsed-tap: onClickCollapsed stays collapsed (no pin)", () => {
        const { handle } = mountState({ interaction: "manual" });
        handle.onClickCollapsed();
        expect(handle.state.value).toBe("collapsed");
        expect(handle.isPinned.value).toBe(false);
    });
});

describe("useDockState — manual keeps the imperative pair operative (free pole)", () => {
    it("T7 · expand() then collapse() move both poles", () => {
        const { handle } = mountState({ interaction: "manual" });
        handle.expand();
        expect(handle.expanded.value).toBe(true);
        // Manual writes the "hover" pole (not "pinned"), so it is a FREE pole.
        expect(handle.state.value).toBe("hover");
        expect(handle.isPinned.value).toBe(false);
        handle.collapse();
        expect(handle.expanded.value).toBe(false);
        expect(handle.state.value).toBe("collapsed");
    });
});

describe("useDockState — runtime flip & stale-timer freeze", () => {
    it("T8 · auto idle timer armed, flip→manual before delay, flush → stays expanded", async () => {
        const { handle, interaction } = mountState({
            interaction: "auto",
            initialExpanded: true,
        });
        // Arm the direct idle-collapse timer (its setTimeout callback writes
        // state="collapsed" with NO fire-time re-guard — the load-bearing invariant).
        handle.onMouseLeave();
        interaction.value = "manual";
        await nextTick(); // let the flip watch fire clearTimer()
        vi.runAllTimers();
        expect(handle.expanded.value).toBe(true);
    });

    it("T9 · auto hover-intent dwell pending, flip→manual, flush → stays collapsed", async () => {
        const { handle, interaction } = mountState({ interaction: "auto" });
        handle.onMouseEnter(); // dwell timer armed
        interaction.value = "manual";
        await nextTick(); // flip watch clears the dwell
        vi.advanceTimersByTime(HOVER_INTENT_MS + 20);
        expect(handle.state.value).toBe("collapsed");
    });

    it("T10 · manual→auto re-arms the FSM; the pole is preserved", async () => {
        const { handle, interaction } = mountState({ interaction: "manual" });
        expect(handle.expanded.value).toBe(false); // pole preserved across flips
        interaction.value = "auto";
        await nextTick();
        handle.onMouseEnter();
        vi.advanceTimersByTime(HOVER_INTENT_MS + 20);
        expect(handle.state.value).toBe("hover");
    });

    it("T11 · manual: keepOpen()/release() leave posture unchanged", () => {
        const { handle } = mountState({
            interaction: "manual",
            initialExpanded: true,
        });
        handle.keepOpen();
        handle.release();
        vi.runAllTimers();
        expect(handle.expanded.value).toBe(true);
    });

    it("T16 · auto release-grace armed, flip→manual, flush → stays expanded", async () => {
        const { handle, interaction } = mountState({
            interaction: "auto",
            initialExpanded: true,
        });
        handle.keepOpen();
        handle.release(); // arms the grace timer (shared collapseTimer handle)
        interaction.value = "manual";
        await nextTick(); // flip watch clears the shared timer
        vi.runAllTimers();
        expect(handle.expanded.value).toBe(true);
    });
});

describe("useDockState — auto-mode regression floor (the seam did not move the poles)", () => {
    it("auto hover-expand still fires (T14 anchor)", () => {
        const { handle } = mountState({ interaction: "auto" });
        handle.onMouseEnter();
        vi.advanceTimersByTime(HOVER_INTENT_MS + 20);
        expect(handle.state.value).toBe("hover");
    });

    it("auto idle-collapse still fires (T14 anchor)", () => {
        const { handle } = mountState({
            interaction: "auto",
            initialExpanded: true,
        });
        handle.onMouseLeave();
        vi.runAllTimers();
        expect(handle.expanded.value).toBe(false);
    });

    it("T13 · alwaysExpanded force-pins and suppresses the environmental writers", () => {
        const { handle } = mountState({ alwaysExpanded: true });
        expect(handle.state.value).toBe("pinned");
        handle.onMouseLeave();
        handle.onClickCollapsed();
        vi.runAllTimers();
        expect(handle.state.value).toBe("pinned");
        // The imperative pair is a no-op under the force-pin (unlike manual).
        handle.collapse();
        expect(handle.state.value).toBe("pinned");
    });
});

describe("useDockShellProps — the alwaysExpanded+manual dead combination is killed at resolution (T17)", () => {
    it("resolves interaction to auto on an always-expanded dock", () => {
        const shell = useDockShellProps({ alwaysExpanded: true, interaction: "manual" });
        expect(shell.interaction.value).toBe("auto");
    });

    it("resolves an explicit manual on a collapsible dock", () => {
        expect(useDockShellProps({ interaction: "manual" }).interaction.value).toBe(
            "manual",
        );
    });

    it("defaults to auto", () => {
        expect(useDockShellProps({}).interaction.value).toBe("auto");
    });

    it("layout=grid (auto-implied alwaysExpanded) also resolves to auto", () => {
        expect(
            useDockShellProps({ layout: "grid", interaction: "manual" }).interaction
                .value,
        ).toBe("auto");
    });
});

// ── GlassDock integration: observability + the a11y disclosure contract ────────
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

describe("GlassDock — data-interaction observability", () => {
    it("stamps data-interaction=manual on a manual collapsible dock", () => {
        const root = mountDock({ interaction: "manual", startCollapsed: true }).get(
            ".glass-dock",
        );
        expect(root.attributes("data-interaction")).toBe("manual");
    });

    it("omits data-interaction in auto (byte-identical to before)", () => {
        const root = mountDock({ startCollapsed: true }).get(".glass-dock");
        expect(root.attributes("data-interaction")).toBeUndefined();
    });

    it("T17 · always-expanded + manual → no stamp, force-pinned", () => {
        const root = mountDock({ alwaysExpanded: true, interaction: "manual" }).get(
            ".glass-dock",
        );
        expect(root.attributes("data-interaction")).toBeUndefined();
        expect(root.classes()).toContain("always-expanded");
        expect(root.classes()).toContain("pinned");
    });
});

describe("GlassDock — manual + collapsed keyboard-reachability contract (H8)", () => {
    it("the inert full pane is unreachable; a #persistent disclosure is reachable", () => {
        const wrapper = mountDock(
            { interaction: "manual", startCollapsed: true },
            {
                persistent: () =>
                    h(
                        DockControl,
                        { "aria-label": "Open", "data-testid": "disclosure" },
                        () => "▸",
                    ),
                default: () =>
                    h(
                        DockControl,
                        { "aria-label": "Home", "data-testid": "in-full" },
                        () => "H",
                    ),
            },
        );
        // Collapsed: the full pane (its controls) is :inert → keyboard-unreachable.
        const full = wrapper.get(".dock-layer--full");
        expect(full.attributes("inert")).toBe("");
        const inFull = wrapper.get("[data-testid='in-full']").element;
        expect(inFull.closest("[inert]")).toBe(full.element);

        // The #persistent disclosure sits in a never-inert slot → reachable in both poles.
        const disclosure = wrapper.get("[data-testid='disclosure']").element;
        expect(disclosure.closest("[inert]")).toBeNull();
    });
});

describe("GlassDock — auto collapsed-face disclosure contract", () => {
    const reachableFaces = (wrapper: ReturnType<typeof mountDock>) =>
        wrapper.findAll(".dock-layer").filter((face) => !face.element.hasAttribute("inert"));

    it("focuses the summary without expanding and keeps exactly one face reachable", async () => {
        const wrapper = mountDock(
            { startCollapsed: true },
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

    it.each(["Enter", " "]) (
        "%s pins and focuses the first full-face descendant after seating",
        async (key) => {
            const wrapper = mountDock(
                { startCollapsed: true },
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

    it("Escape collapses the full face and restores focus to the seated summary", async () => {
        const wrapper = mountDock(
            {},
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
            {},
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
            {},
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
function mountSearch(interaction: DockInteraction, collapseDelay = 3600) {
    let dock!: UseDockStateReturn;
    let search!: ReturnType<typeof useDockSearch>;
    const Host = defineComponent({
        setup() {
            const rootEl = ref<HTMLElement | null>(null);
            dock = useDockState({ rootEl, interaction, collapseDelay });
            search = useDockSearch({ dockState: dock, items: () => [] });
            return () => h("div", { ref: rootEl });
        },
    });
    const wrapper = mount(Host, { attachTo: document.body });
    mounted.push({ unmount: () => wrapper.unmount() });
    return { dock, search };
}

describe("useDockSearch — armSearch opens via the imperative expand() (H5)", () => {
    it("T15a · manual: armSearch expands the dock (operative in manual)", () => {
        const { dock, search } = mountSearch("manual");
        search.armSearch();
        expect(dock.expanded.value).toBe(true);
        // expand() writes the FREE "hover" pole — not the pinned collapsed-tap pole.
        expect(dock.state.value).toBe("hover");
    });

    it("T15b · auto: disarmSearch grace-collapses back to the pill (the latent-bug fix)", () => {
        const { dock, search } = mountSearch("auto");
        search.armSearch();
        expect(dock.state.value).toBe("hover");
        search.disarmSearch();
        // The grace-collapse guards state==="hover"; expand() (not onClickCollapsed→
        // "pinned") makes the documented "returns to a compact PERSISTENT bar" fire.
        vi.runAllTimers();
        expect(dock.expanded.value).toBe(false);
    });
});
