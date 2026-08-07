// BK #41 W-SORTABLE — the wave's LOCAL close-battery. SEATS +0.
//
// CWT-2 §5's fold ruling is what this file obeys: of the spec's 14 gates, THREE are
// absorbed by shared registers and do not appear here —
//   · G-8 SERIES  → `tests/styles/proportion-register.test.ts` (per-component rows)
//   · G-6 GRIP    → `tests/components/a11y/coarse-target.test.ts` (the A6 seat's arm)
//   · G-14 FROST  → W-FROST's receiver matrix (#22), which owns every
//                   `backdrop-filter` receiver claim in the library; ROUTED, not
//                   built here, and the paired π row travels with it.
// The remaining ELEVEN are tier-2 close-battery cases (§B.5's declared acceptance
// class): they retire green with the wave, they mint no `G-*` seat, and the §B.5
// budget stays exactly 60.
//
// G-5 IS VALID ONLY PAIRED WITH G-2, AND SAYS SO IN ITS OWN TITLE. "No insertion line
// is drawn" greens on a deleted component; it means something only while "the gap
// still opens" is green beside it. The spec ruled this openly rather than shipping the
// grep-gate alone, and the pair lives in one file so neither can be run without the
// other.
//
// WHAT WAS RED AT HEAD (7.0.0), by case, so a reader can re-derive the born-RED census
// rather than trust a count: G-1 the clone inherited the source's own 0.35 fade
// (`SOURCE_DRAGGING_CLASS` stamped in `begin()` BEFORE the clone was taken; equal
// specificity, later rule wins) so the authored lift kit never
// once rendered · G-2 `transformedRows: 0` mid-drag, row tops byte-identical 330ms
// after the drop · G-3 the ghost was destroyed synchronously inside `cleanup()` · G-4
// an empty list was an invisible target that accepted the drop anyway · G-5 a 5px gold
// shimmer bar at ∓2.5px in an 8px gap, 9.4× the indicator rung · G-7 hover ≡ rest
// byte-for-byte, `cursor: auto`, and a 5s shimmer loop at rest · G-9 a stationary tap
// completed a whole transaction ("Dropped …, position 1 of 5") · G-10 the binding
// cache returned a dead `disabled` getter across a remount and the map never evicted ·
// G-11 a consumer `aria-label` was swallowed by the `label` default · G-12 `axis`,
// `dragPosition`, `pointerCaptureActive` and an `isNonZeroRadius` re-export were all
// live with zero consumers, under two filenames that lied · G-13 the keyboard path
// lifted nothing at all (`createGhost` ran only from `beginPointer`).
//
// [2026-08-07 · CURE] Two cases join the file, born-RED against the PRE-CURE bytes and
// carrying the same seats +0 — they are arms of G-3 and G-4, and mint no id. G-3's:
// every cross-list release flew the plate back to the list it had just left (`x = 0`
// against a receiver at `x ≥ 100`), because `commit()` measured the source row while
// `partLeaving` held it at its own resting slot. G-4's: `min-block-size` reaches an
// EMPTY receiver only, so a populated one clipped the row the arrival displaced. The
// `dragController.ts` coordinates this header used to re-type are struck with it —
// `RECORD.md` §1 holds them once, and two copies of a figure is how one goes stale.

import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";

import {
    SortableHandle,
    SortableItem,
    SortableList,
} from "@glass/components/sortable-list";

const DIR = "src/components/sortable-list";
const read = (rel: string): string => readFileSync(`${DIR}/${rel}`, "utf8");
const strip = (s: string): string => s.replace(/\/\*[\s\S]*?\*\//g, "");

interface Item {
    id: string;
    label: string;
}

const ROW_BLOCK = 40;
/** The cross-list bench: two lists of this width, the right one at this inline start. */
const LIST_INLINE = 90;
const RIGHT_START = 100;

/** Declare an element's box. happy-dom lays nothing out, so every rect is stated. */
function box(
    el: HTMLElement,
    left: number,
    top: number,
    width: number,
    height: number,
): void {
    Object.defineProperty(el, "getBoundingClientRect", {
        configurable: true,
        value: () => ({
            left,
            top,
            right: left + width,
            bottom: top + height,
            width,
            height,
            x: left,
            y: top,
        }),
    });
}

function stackRects(rows: HTMLElement[]): void {
    rows.forEach((row, index) => {
        Object.defineProperty(row, "getBoundingClientRect", {
            configurable: true,
            value: () => ({
                left: 0,
                right: 300,
                top: index * ROW_BLOCK,
                bottom: (index + 1) * ROW_BLOCK,
                width: 300,
                height: ROW_BLOCK,
                x: 0,
                y: index * ROW_BLOCK,
            }),
        });
    });
}

function mountList(count = 4, ariaLabel?: string) {
    const items = ref<Item[]>(
        Array.from({ length: count }, (_, i) => ({
            id: `i${i}`,
            label: `Item ${i}`,
        })),
    );
    const wrapper = mount(
        defineComponent({
            components: { SortableHandle, SortableItem, SortableList },
            setup: () => ({ items, ariaLabel }),
            template: `
                <SortableList
                    :items="items"
                    :get-id="item => item.id"
                    :get-label="item => item.label"
                    label="Tasks"
                    v-bind="ariaLabel ? { 'aria-label': ariaLabel } : {}"
                    @reorder="items = $event"
                >
                    <SortableItem v-for="item in items" :key="item.id" :id="item.id">
                        <SortableHandle>grip</SortableHandle>
                        <span>{{ item.label }}</span>
                    </SortableItem>
                </SortableList>
            `,
        }),
        { attachTo: document.body },
    );
    stackRects(wrapper.findAll("li").map((row) => row.element as HTMLElement));
    return { wrapper, items };
}

/** Press the grip of row `index` and travel past the activation slop. */
async function lift(
    wrapper: ReturnType<typeof mountList>["wrapper"],
    index = 0,
    toY = (index + 1) * ROW_BLOCK,
): Promise<void> {
    const rows = wrapper.findAll("li");
    await rows[index]!.get("button").trigger("pointerdown", {
        button: 0,
        pointerId: 7,
        clientX: 10,
        clientY: index * ROW_BLOCK + ROW_BLOCK / 2,
    });
    document.dispatchEvent(
        new PointerEvent("pointermove", {
            pointerId: 7,
            clientX: 10,
            clientY: toY + ROW_BLOCK / 2,
        }),
    );
    await nextTick();
}

/**
 * Two grouped lists side by side, every box declared: the cross-list bench. The right
 * list starts at `RIGHT_START`, so "the plate landed in the receiver" is a claim about
 * disjoint inline ranges and cannot be satisfied by accident.
 */
function mountPair(leftCount: number, rightCount: number) {
    const left = ref<Item[]>(
        Array.from({ length: leftCount }, (_, i) => ({
            id: `l${i}`,
            label: `Left ${i}`,
        })),
    );
    const right = ref<Item[]>(
        Array.from({ length: rightCount }, (_, i) => ({
            id: `r${i}`,
            label: `Right ${i}`,
        })),
    );
    const wrapper = mount(
        defineComponent({
            components: { SortableHandle, SortableItem, SortableList },
            setup: () => ({ left, right }),
            template: `
                <SortableList group="x" label="Left" :items="left"
                    :get-id="i => i.id" :get-label="i => i.label"
                    @reorder="left = $event">
                    <SortableItem v-for="i in left" :key="i.id" :id="i.id">
                        <SortableHandle>g</SortableHandle>
                    </SortableItem>
                </SortableList>
                <SortableList group="x" label="Right" :items="right"
                    :get-id="i => i.id" :get-label="i => i.label"
                    @reorder="right = $event"
                    @insert="(at, item) => right.splice(at, 0, item)">
                    <SortableItem v-for="i in right" :key="i.id" :id="i.id">
                        <SortableHandle>g</SortableHandle>
                    </SortableItem>
                </SortableList>
            `,
        }),
        { attachTo: document.body },
    );

    const lists = wrapper.findAll("ul");
    lists.forEach((list, side) => {
        const start = side === 0 ? 0 : RIGHT_START;
        box(list.element as HTMLElement, start, 0, LIST_INLINE, 200);
        list.findAll("li").forEach((row, index) => {
            box(
                row.element as HTMLElement,
                start,
                index * ROW_BLOCK,
                LIST_INLINE,
                ROW_BLOCK,
            );
        });
    });
    return { wrapper, left, right, lists };
}

/**
 * Run `body` with the reduced-motion query answering true. `flyProgress` carries the
 * family's LOCAL reduced-motion gate — the CSS blanket cannot stop a JS integrator —
 * and under `reduce` the flight writes its ENDPOINT on frame one. That makes the
 * plate's transform the landing rect itself, with no clock to wait on: the gate is
 * the shipped mechanism, not a test hook.
 */
function underReducedMotion(body: () => void): void {
    const real = window.matchMedia;
    Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: (media: string) => ({
            matches: true,
            media,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }),
    });
    try {
        body();
    } finally {
        Object.defineProperty(window, "matchMedia", {
            configurable: true,
            writable: true,
            value: real,
        });
    }
}

/** The plate's last written top-left, read off the one property the follow channel owns. */
function plateOrigin(plate: HTMLElement): { x: number; y: number } {
    const written = /translate3d\((-?[\d.]+)px,\s*(-?[\d.]+)px/.exec(
        plate.style.transform,
    );
    expect(written, "the plate carries a translate3d").not.toBeNull();
    return { x: Number(written![1]), y: Number(written![2]) };
}

const ghosts = (): HTMLElement[] =>
    Array.from(document.querySelectorAll<HTMLElement>(".sortable-ghost"));

afterEach(() => {
    for (const node of ghosts()) node.remove();
});

describe("G-1 LIFT-SOLE — the ghost is the only copy that paints", () => {
    it("clones BEFORE the source is marked, so the clone cannot inherit the vacancy", async () => {
        const { wrapper } = mountList();
        await lift(wrapper);

        const plate = ghosts()[0];
        expect(plate, "a ghost plate exists mid-drag").toBeDefined();
        const clonedRow = plate!.querySelector(".sortable-ghost__row")!;
        expect(clonedRow.hasAttribute("data-sortable-vacancy")).toBe(false);
        // …and the source IS the vacancy, so exactly one of the two paints.
        expect(
            wrapper.get("li").attributes("data-sortable-vacancy"),
        ).toBeDefined();

        wrapper.unmount();
    });

    it("the ghost carries no id attributes copied off the original", async () => {
        const { wrapper } = mountList();
        await lift(wrapper);
        const plate = ghosts()[0]!;
        expect(plate.querySelectorAll("[id]")).toHaveLength(0);
        expect(plate.querySelector("[data-sortable-id]")).toBeNull();
        wrapper.unmount();
    });
});

describe("G-2 PART — the gap opens, and it opens by one row", () => {
    it("displaces at least one non-clone row by ≥0.5× the row block", async () => {
        const { wrapper } = mountList(4);
        await lift(wrapper, 0, 2 * ROW_BLOCK);

        const rows = wrapper.findAll("li").map((row) => row.element as HTMLElement);
        const displaced = rows
            .slice(1)
            .map((row) => Number(/(-?[\d.]+)px, 0\)/.exec(row.style.transform)?.[1] ?? 0))
            .filter((dy) => Math.abs(dy) >= ROW_BLOCK * 0.5);

        expect(displaced.length).toBeGreaterThanOrEqual(1);
        // the vacancy is exactly one row wide — never a half-open gap
        for (const dy of displaced) expect(Math.abs(dy)).toBe(ROW_BLOCK);
        wrapper.unmount();
    });

    it("the lifted row's own slot travels to the proposed position", async () => {
        const { wrapper } = mountList(4);
        await lift(wrapper, 0, 2 * ROW_BLOCK);
        const source = wrapper.findAll("li")[0]!.element as HTMLElement;
        expect(source.style.transform).toBe(`translate3d(0, ${2 * ROW_BLOCK}px, 0)`);
        wrapper.unmount();
    });

    it("the parting is compositor-only — transform, never a layout property", async () => {
        const { wrapper } = mountList(4);
        await lift(wrapper, 0, 2 * ROW_BLOCK);
        for (const row of wrapper.findAll("li")) {
            const inline = (row.element as HTMLElement).style;
            expect(inline.top).toBe("");
            expect(inline.marginBlockStart).toBe("");
            expect(inline.height).toBe("");
        }
        wrapper.unmount();
    });
});

describe("G-3 SETTLE — the drop is a landing, not a teleport", () => {
    it("the ghost outlives pointerup instead of being destroyed inside cleanup", async () => {
        const { wrapper } = mountList(4);
        await lift(wrapper, 0, 2 * ROW_BLOCK);
        expect(ghosts()).toHaveLength(1);

        document.dispatchEvent(new PointerEvent("pointerup", { pointerId: 7 }));
        await nextTick();

        expect(ghosts(), "the ghost is still flying after the pointer is gone")
            .toHaveLength(1);
        wrapper.unmount();
    });

    it("a cancel returns the ghost rather than deleting it mid-air", async () => {
        const { wrapper } = mountList(4);
        await lift(wrapper, 0, 2 * ROW_BLOCK);
        document.dispatchEvent(new PointerEvent("pointercancel", { pointerId: 7 }));
        await nextTick();
        expect(ghosts()).toHaveLength(1);
        wrapper.unmount();
    });

    // A CROSS-LIST release lands in the RECEIVER's gap. `partLeaving` closes the source
    // list behind the subject and therefore leaves the source row at its OWN resting
    // slot, so measuring it at commit flew every cross-list drop back to the list the
    // row had just left — the plate travelling AWAY from where the item actually went.
    // The endpoint is the receiver's to answer, because the receiver owns the gap.
    it("a cross-list release flies to the RECEIVER's gap, not the source's slot", async () => {
        const { wrapper, lists } = mountPair(2, 2);

        await lists[0]!.get("button").trigger("pointerdown", {
            button: 0,
            pointerId: 21,
            clientX: 10,
            clientY: 10,
        });
        document.dispatchEvent(
            new PointerEvent("pointermove", {
                pointerId: 21,
                clientX: RIGHT_START + 50,
                clientY: 50,
            }),
        );
        await nextTick();

        const receiver = lists[1]!.element as HTMLElement;
        expect(receiver.getAttribute("data-sortable-armed"), "the receiver armed").toBe(
            "",
        );

        underReducedMotion(() => {
            document.dispatchEvent(new PointerEvent("pointerup", { pointerId: 21 }));
        });
        await nextTick();

        const landing = plateOrigin(ghosts()[0]!);
        const target = receiver.getBoundingClientRect();
        expect(landing.x).toBeGreaterThanOrEqual(target.left);
        expect(landing.x).toBeLessThanOrEqual(target.right);
        expect(landing.y).toBeGreaterThanOrEqual(target.top);
        expect(landing.y).toBeLessThanOrEqual(target.bottom);
        // …and at the gap the receiver actually opened, not merely somewhere inside it:
        // the pointer sat past row 0's midpoint, so the subject rests at row 1's slot.
        expect(landing.y).toBe(ROW_BLOCK);

        wrapper.unmount();
    });
});

describe("G-4 RECEIVE — a receiving list is a visible target, empty OR populated", () => {
    it("arms, and sizes its vacancy to the subject it is about to accept", async () => {
        const wrapper = mount(
            defineComponent({
                components: { SortableHandle, SortableItem, SortableList },
                setup: () => ({
                    left: ref<Item[]>([{ id: "a", label: "Alpha" }]),
                    right: ref<Item[]>([]),
                }),
                template: `
                    <SortableList group="b" label="L" :items="left"
                        :get-id="i => i.id" :get-label="i => i.label"
                        @reorder="left = $event">
                        <SortableItem v-for="i in left" :key="i.id" :id="i.id">
                            <SortableHandle>g</SortableHandle>
                        </SortableItem>
                    </SortableList>
                    <SortableList group="b" label="R" :items="right"
                        :get-id="i => i.id" :get-label="i => i.label"
                        @reorder="right = $event" @insert="() => {}">
                        <SortableItem v-for="i in right" :key="i.id" :id="i.id">
                            <SortableHandle>g</SortableHandle>
                        </SortableItem>
                    </SortableList>
                `,
            }),
            { attachTo: document.body },
        );

        const lists = wrapper.findAll("ul");
        stackRects([lists[0]!.get("li").element as HTMLElement]);
        Object.defineProperty(lists[0]!.element, "getBoundingClientRect", {
            value: () => ({ left: 0, right: 90, top: 0, bottom: 100, width: 90, height: 100 }),
        });
        Object.defineProperty(lists[1]!.element, "getBoundingClientRect", {
            value: () => ({ left: 100, right: 200, top: 0, bottom: 100, width: 100, height: 100 }),
        });

        await lists[0]!.get("button").trigger("pointerdown", {
            button: 0,
            pointerId: 3,
            clientX: 10,
            clientY: 10,
        });
        document.dispatchEvent(
            new PointerEvent("pointermove", { pointerId: 3, clientX: 150, clientY: 50 }),
        );
        await nextTick();

        const receiver = lists[1]!.element as HTMLElement;
        expect(receiver.getAttribute("data-sortable-armed")).toBe("");
        expect(receiver.style.getPropertyValue("--sortable-vacancy-block")).toBe(
            `${ROW_BLOCK}px`,
        );

        document.dispatchEvent(new PointerEvent("pointerup", { pointerId: 3 }));
        await nextTick();
        expect(receiver.getAttribute("data-sortable-armed")).toBeNull();

        wrapper.unmount();
    });

    it("the armed state is a stylesheet fact, not a promise — fill and min-block", () => {
        const css = strip(read("styles.css"));
        expect(css).toMatch(
            /\.sortable-list\[data-sortable-armed\]\s*\{[^}]*var\(--fill-selected\)/,
        );
        expect(css).toMatch(/min-block-size:\s*var\(--sortable-vacancy-block/);
    });

    // A POPULATED receiver is the other half of D4, and `min-block-size` cannot reach
    // it: the list is ALREADY taller than one pitch, so the floor is inert and the row
    // the arrival displaces meets the plate's own `overflow: clip`. The armed list has
    // to OPEN a pitch of block room. happy-dom lays nothing out, so the room is
    // asserted where it is authored (π-41 carries the painted cell); the runtime half
    // — a populated receiver arms and parts — is asserted live beside it.
    it("a POPULATED receiver opens block room, so the displaced row is not clipped", async () => {
        const { wrapper, lists } = mountPair(1, 2);

        await lists[0]!.get("button").trigger("pointerdown", {
            button: 0,
            pointerId: 23,
            clientX: 10,
            clientY: 10,
        });
        document.dispatchEvent(
            new PointerEvent("pointermove", {
                pointerId: 23,
                clientX: RIGHT_START + 50,
                clientY: 10,
            }),
        );
        await nextTick();

        const receiver = lists[1]!.element as HTMLElement;
        expect(receiver.getAttribute("data-sortable-armed")).toBe("");
        expect(receiver.style.getPropertyValue("--sortable-vacancy-block")).toBe(
            `${ROW_BLOCK}px`,
        );
        const parted = lists[1]!
            .findAll("li")
            .map((row) => (row.element as HTMLElement).style.transform);
        expect(parted, "every row at or after the gap travels one pitch").toEqual([
            `translate3d(0, ${ROW_BLOCK}px, 0)`,
            `translate3d(0, ${ROW_BLOCK}px, 0)`,
        ]);

        const css = strip(read("styles.css"));
        const armed = /\.sortable-list\[data-sortable-armed\]\s*\{([^}]*)\}/.exec(css);
        expect(armed, "the armed receiver has a rule of its own").not.toBeNull();
        expect(
            armed![1],
            "the armed receiver opens a pitch of block room",
        ).toMatch(/padding-block-end:\s*var\(--sortable-vacancy-block/);
        // …and the room ARRIVES on the same curve the rows travel on, rather than
        // snapping open under them.
        expect(css).toMatch(
            /transition:[^;]*padding-block-end var\(--spring-dock-duration\) var\(--spring-dock\)/,
        );

        wrapper.unmount();
    });
});

describe("G-5 NO-LINE — nothing is drawn (valid ONLY paired with G-2 above)", () => {
    it("inserts no pseudo-element, keeps no drop classes, spends no gold", () => {
        const css = strip(read("styles.css"));
        expect(css).not.toMatch(/::before/);
        expect(css).not.toMatch(/::after/);
        expect(css).not.toMatch(/is-sortable-drop-/);
        expect(css).not.toMatch(/--color-gold/);
        expect(css).not.toMatch(/animation:\s*shimmer/);
    });

    it("the class contract is gone from the source too, with no alias left behind", () => {
        // LIVE BYTES ONLY — the archaeology note that explains why a class died is
        // prose, and prose is not a shipped rule.
        const all = readdirSync(DIR)
            .filter((f) => !f.endsWith(".md"))
            .map((f) => strip(read(f)))
            .join("\n");
        for (const dead of [
            "sortable-drag-ghost",
            "is-sortable-dragging",
            "is-sortable-drop-above",
            "is-sortable-drop-below",
            "computeDropClasses",
            "flagsFor",
        ]) {
            expect(all, `${dead} survives`).not.toContain(dead);
        }
    });
});

describe("G-7 REST — the row is alive standing still, and runs no loop doing it", () => {
    it("hover answers the pointer, and only inside (hover: hover)", () => {
        const css = strip(read("styles.css"));
        const hoverBlock = css.match(
            /@media \(hover: hover\)\s*\{\s*\.sortable-item:hover\s*\{([\s\S]*?)\}/,
        );
        expect(hoverBlock, "a pointer-guarded row hover exists").not.toBeNull();
        expect(hoverBlock![1]).toMatch(/background-color:/);
        // a bare `:hover` would fire on a coarse pointer's tap and stick, so the ONLY
        // occurrence in the file is the one inside the guard
        expect(css.match(/\.sortable-item:hover/g)).toHaveLength(1);
    });

    it("the grip reads grabbable BEFORE the grab — composed, never forked", () => {
        expect(read("SortableHandle.vue")).toContain("glass-drag-grabbable");
        // the cursor is the shared register's, so the component authors none
        expect(strip(read("styles.css"))).not.toMatch(/cursor:\s*grab/);
    });

    it("nothing animates at rest — breath is a floor, not a loop", () => {
        const css = strip(read("styles.css"));
        expect(css).not.toMatch(/animation-name:/);
        expect(css).not.toMatch(/@keyframes/);
        expect(css).not.toMatch(/animation:\s*(?!none)/);
    });
});

describe("G-9 GUARD — a gesture earns the transaction before it speaks", () => {
    it("a stationary tap announces nothing and emits nothing", async () => {
        const { wrapper } = mountList(3);
        const handle = wrapper.get("li button");
        await handle.trigger("pointerdown", {
            button: 0,
            pointerId: 9,
            clientX: 10,
            clientY: 10,
        });
        document.dispatchEvent(new PointerEvent("pointerup", { pointerId: 9 }));
        await nextTick();

        expect(wrapper.get("[aria-live]").text()).toBe("");
        expect(wrapper.findComponent(SortableList).emitted("reorder")).toBeUndefined();
        expect(ghosts()).toHaveLength(0);
        wrapper.unmount();
    });

    it("a sub-slop wobble is still a tap — the threshold is travel, not motion", async () => {
        const { wrapper } = mountList(3);
        await wrapper.get("li button").trigger("pointerdown", {
            button: 0,
            pointerId: 11,
            clientX: 10,
            clientY: 10,
        });
        document.dispatchEvent(
            new PointerEvent("pointermove", { pointerId: 11, clientX: 14, clientY: 13 }),
        );
        await nextTick();
        expect(wrapper.get("[aria-live]").text()).toBe("");
        expect(ghosts()).toHaveLength(0);
        wrapper.unmount();
    });

    it("crossing the slop is what opens the transaction", async () => {
        const { wrapper } = mountList(3);
        await lift(wrapper, 0, ROW_BLOCK);
        expect(wrapper.get("[aria-live]").text()).toContain("Lifted Item 0");
        wrapper.unmount();
    });
});

describe("G-10 FRESH — a registration is never reused across a remount", () => {
    it("a row that comes back disabled IS disabled, in the DOM and in aria", async () => {
        const items = ref<Item[]>([{ id: "x", label: "Ex" }]);
        const locked = ref(false);
        const wrapper = mount(
            defineComponent({
                components: { SortableHandle, SortableItem, SortableList },
                setup: () => ({ items, locked }),
                template: `
                    <SortableList :items="items" :get-id="i => i.id"
                        :get-label="i => i.label" @reorder="items = $event">
                        <SortableItem v-for="i in items" :key="i.id + String(locked)"
                            :id="i.id" :disabled="locked">
                            <SortableHandle>g</SortableHandle>
                        </SortableItem>
                    </SortableList>
                `,
            }),
            { attachTo: document.body },
        );

        expect(wrapper.get("button").attributes("disabled")).toBeUndefined();
        locked.value = true;
        await nextTick();

        const row = wrapper.get("li");
        expect(row.attributes("aria-disabled")).toBe("true");
        expect(
            (wrapper.get("button").element as HTMLButtonElement).disabled,
            "aria and the button agree",
        ).toBe(true);
        wrapper.unmount();
    });

    it("no binding cache survives in the source — the eviction is real", () => {
        const source = strip(read("useSortable.ts"));
        expect(source).not.toMatch(/bindings\.get/);
        expect(source).not.toMatch(/if \(cached\) return cached/);
        expect(source).toMatch(/release:/);
        expect(strip(read("SortableItem.vue"))).toMatch(/onUnmounted\(binding\.release\)/);
    });
});

describe("G-11 ARIA — the consumer's label survives to the list", () => {
    it("an author aria-label wins over the transaction's own name", () => {
        const { wrapper } = mountList(2, "Sprint backlog");
        expect(wrapper.get("ul").attributes("aria-label")).toBe("Sprint backlog");
        wrapper.unmount();
    });

    it("and the prop is still the fallback when no attribute is given", () => {
        const { wrapper } = mountList(2);
        expect(wrapper.get("ul").attributes("aria-label")).toBe("Tasks");
        wrapper.unmount();
    });
});

describe("G-12 SURFACE — the dead ceremony is gone and the names stopped lying", () => {
    it("axis, dragPosition, pointerCaptureActive and the re-export are all absent", () => {
        const all = readdirSync(DIR)
            .filter((f) => !f.endsWith(".md"))
            .map((f) => strip(read(f)))
            .join("\n");
        for (const dead of ["dragPosition", "pointerCaptureActive", "isNonZeroRadius"]) {
            expect(all, `${dead} survives`).not.toContain(dead);
        }
        // `axis` as a prop/option name, not as the word inside a comment
        expect(all).not.toMatch(/\baxis[?]?:\s*("x"|Axis|string)/);
    });

    it("the composables/ pen is gone and no filename lies about its contents", () => {
        expect(existsSync(`${DIR}/composables`)).toBe(false);
        for (const liar of ["transitionTiming.ts", "touchGate.ts", "ghostRenderer.ts"]) {
            expect(existsSync(`${DIR}/${liar}`), `${liar} survives`).toBe(false);
        }
        // and what replaced them says what it holds
        for (const honest of ["drag.ts", "ghost.ts", "resolve.ts", "motion.ts"]) {
            expect(existsSync(`${DIR}/${honest}`), `${honest} missing`).toBe(true);
        }
    });

    it("ONE css lane — no SFC in the family authors a style block of its own", () => {
        for (const sfc of ["SortableList.vue", "SortableItem.vue", "SortableHandle.vue"]) {
            const body = read(sfc);
            expect(body, `${sfc} authors CSS`).not.toMatch(/<style(?![^>]*\bsrc=)/);
        }
        expect(read("SortableList.vue")).toContain('<style src="./styles.css">');
    });

    it("every spring is bound BY NAME — no response, damping or clock is typed", () => {
        const js = ["drag.ts", "ghost.ts", "motion.ts", "resolve.ts", "useSortable.ts"]
            .map((f) => strip(read(f)))
            .join("\n");
        expect(js).toMatch(/springPreset\("(press|dock|world)"\)/);
        // the three values that have circulated for one name, and the swell
        for (const literal of ["0.35", "0.82", "0.30", "0.88", "1.04"]) {
            expect(js, `a spring literal (${literal}) is typed in JS`).not.toContain(
                literal,
            );
        }
        const css = strip(read("styles.css"));
        expect(css).toMatch(/var\(--spring-dock-duration\)\s+var\(--spring-dock\)/);
        expect(css).toMatch(/var\(--spring-press-duration\)\s+var\(--spring-press\)/);
    });
});

describe("G-13 KEYS — the keyboard lift lifts something", () => {
    it("the focused row carries the promotion IN PLACE, with no clone", async () => {
        const { wrapper } = mountList(3);
        const handle = wrapper.get("li button");
        (handle.element as HTMLButtonElement).focus();
        await handle.trigger("keydown", { key: " " });

        const row = wrapper.get("li");
        expect(row.attributes("data-sortable-lifted")).toBe("");
        expect(row.classes()).toContain("glass-floating");
        expect(ghosts(), "a keyboard lift makes no clone").toHaveLength(0);
        wrapper.unmount();
    });

    it("the promotion is released when the transaction ends", async () => {
        const { wrapper } = mountList(3);
        const handle = wrapper.get("li button");
        await handle.trigger("keydown", { key: " " });
        await handle.trigger("keydown", { key: "Escape" });

        const row = wrapper.get("li");
        expect(row.attributes("data-sortable-lifted")).toBeUndefined();
        expect(row.classes()).not.toContain("glass-floating");
        wrapper.unmount();
    });

    it("the keyboard path parts the rows exactly as the pointer path does", async () => {
        const { wrapper } = mountList(4);
        const handle = wrapper.get("li button");
        await handle.trigger("keydown", { key: " " });
        await handle.trigger("keydown", { key: "End" });

        const rows = wrapper.findAll("li").map((row) => row.element as HTMLElement);
        expect(rows[0]!.style.transform).toBe(`translate3d(0, ${3 * ROW_BLOCK}px, 0)`);
        expect(rows[1]!.style.transform).toBe(`translate3d(0, ${-ROW_BLOCK}px, 0)`);
        wrapper.unmount();
    });
});
