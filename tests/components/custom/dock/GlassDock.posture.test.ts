import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import {
    useDockState,
    type UseDockStateReturn,
} from "@glass/components/dock/composables/useDockState";
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
        // W-I.8 R-2 (RU-3), restated: the dwell counts from the first real move.
        document.querySelector(".state-root")!.dispatchEvent(new MouseEvent("pointermove", { bubbles: true, clientX: 1 + Math.random() * 999, clientY: 10 }));
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

/** A pointer event by type, with the fields the press rule reads (jsdom has none). */
function pointer(type: string, init: { isPrimary?: boolean; pointerType?: string } = {}) {
    const e = new Event(type, { bubbles: true, composed: true });
    Object.assign(e, { isPrimary: init.isPrimary ?? true, pointerType: init.pointerType ?? "mouse" });
    return e;
}

// value.js O-110, critique-6 D-1. A press on the dock holds an environmental expand
// until the press ends. WebKit ends a link drag (`dragstart`) and a right-click
// (`contextmenu`) with no `pointerup`, `pointercancel` or click; the hold must end
// there, or every later focus and hover waits on it. Unresolved, a press lapses at the
// next primary `pointerdown` anywhere.
describe("useDockState — a press that ends without a release", () => {
    function pressed() {
        const s = mountState();
        const root = document.querySelector<HTMLElement>(".state-root")!;
        root.dispatchEvent(pointer("pointerdown"));
        s.handle.onFocusIn();
        expect(s.handle.state.value, "the press holds the focus expand").toBe("collapsed");
        return s;
    }

    for (const end of ["dragstart", "contextmenu"]) {
        it(`ends at ${end}: the deferred focus expands, and a later focus is not deferred`, () => {
            const { handle } = pressed();
            window.dispatchEvent(new Event(end, { bubbles: true }));
            expect(handle.state.value).toBe("hover");
            handle.collapse();
            handle.onFocusIn();
            expect(handle.state.value).toBe("hover");
        });
    }

    it("lapses at a primary pointerdown outside the dock; a later focus expands", () => {
        const { handle } = pressed();
        document.body.dispatchEvent(pointer("pointerdown"));
        expect(handle.state.value, "what the lapsed press deferred lapses with it").toBe("collapsed");
        handle.onFocusIn();
        expect(handle.state.value).toBe("hover");
    });

    it("holds through a non-primary pointerdown (a second finger)", () => {
        const { handle } = pressed();
        document.body.dispatchEvent(pointer("pointerdown", { isPrimary: false, pointerType: "touch" }));
        expect(handle.state.value).toBe("collapsed");
        window.dispatchEvent(pointer("pointercancel"));
        expect(handle.state.value).toBe("hover");
    });
});

// W-I.8 RU-42: G-1 (f) on the unit, where WebKit's finger was only ever dispatched pointer
// events. A tap opens by the clock; a finger then held down on a seat holds the dock past any
// linger; at the lift the linger runs from the lift and starts when the lift's task ends, so the
// tap's own focus on the seat (in that task) cannot cancel it.
// W-I.8 RU-73 (MEASURE-8 H3): the tap's focus is modelled as the tap gives it, a FocusEvent with the
// seat as its target, and the witness runs both with it and with no event (RU-62's quiet return
// reads the event's target). Its two plants (MEASURE-8 m8/plants8.py): the press hold removed (a held
// finger no longer holds: RED at 9 s), and the linger timed from the press (RED: the dock folds at
// the lift). RULINGS-4's plant, the linger scheduled in the pointerup itself, no longer bites under
// RU-62's quiet return and is retired.
describe("useDockState — G-1 (f): a held finger holds, the linger runs from the lift", () => {
    for (const tapFocus of [true, false]) it(`holds while the finger is down and folds one linger after the lift, past the tap's focus (${tapFocus ? "the tap's FocusEvent on the seat" : "no event"})`, () => {
        const { handle } = mountState({ collapseDelay: 1000 });
        const root = document.querySelector<HTMLElement>(".state-root")!;
        const seat = document.createElement("button");
        root.appendChild(seat);
        // The tap that opens: a touch press and lift on the folded face, then its click.
        root.dispatchEvent(pointer("pointerdown", { pointerType: "touch" }));
        root.dispatchEvent(pointer("pointerup", { pointerType: "touch" }));
        handle.onClickCollapsed();
        window.dispatchEvent(new Event("click"));
        vi.advanceTimersByTime(0);
        expect(handle.state.value).toBe("hover");
        // A finger held down on a seat for nine lingers: no fold.
        seat.dispatchEvent(pointer("pointerdown", { pointerType: "touch" }));
        vi.advanceTimersByTime(9000);
        expect(handle.state.value, "a held finger holds").toBe("hover");
        // The lift: its pointerup, the tap's focus in the same task, then its click.
        seat.dispatchEvent(pointer("pointerup", { pointerType: "touch" }));
        if (tapFocus) {
            seat.addEventListener("focusin", (ev) => handle.onFocusIn(ev as FocusEvent), { once: true });
            seat.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
        } else handle.onFocusIn();
        window.dispatchEvent(new Event("click"));
        vi.advanceTimersByTime(0);
        vi.advanceTimersByTime(900);
        expect(handle.state.value, "not before one linger from the lift").toBe("hover");
        vi.advanceTimersByTime(400);
        expect(handle.state.value, "one linger after the lift").toBe("collapsed");
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

    // [W-I.8, RULINGS-6] The `#search` aperture's test is deleted with the slot: no app used it.
});

describe("GlassDock — collapsed-face disclosure contract", () => {
    const reachableFaces = (wrapper: ReturnType<typeof mountDock>) =>
        wrapper
            .findAll(".dock-layer")
            .filter((face) => !face.element.hasAttribute("inert"));

    it("keyboard focus on the summary expands the dock and hands focus to the first seat (O-177)", async () => {
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
        expect(reachableFaces(wrapper)).toHaveLength(1);
        expect(reachableFaces(wrapper)[0]!.element).toBe(summary.element);
        summary.element.focus();
        await nextTick();
        await nextTick();

        expect(wrapper.find(".glass-dock").classes()).toContain("expanded");
        expect(document.activeElement).toBe(wrapper.get("[data-testid='full-first']").element);
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

// [W-I.8, RULINGS-6] useDockSearch's armSearch tests are deleted with the composable: no app used it.
