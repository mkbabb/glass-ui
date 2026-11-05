// U/B7d M1 · O-7. Every Button reads its shape. The read ran in the post-flush of the mount,
// where the patch has just changed the DOM, so each Button forced a synchronous layout: on
// sci's /usf-integrity phone scroll walk, 92 ms of `getBoundingClientRect` inside Vue's flush,
// as each figure's corner dock mounted its buttons. A ResizeObserver delivers an initial
// observation for every element it starts observing, after layout and before paint, so the
// first read now happens there and the shape is still set before the first frame paints.
import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import { createApp } from "vue";
import { useBarShape } from "@glass/components/_shared/shape/useBarShape";

let deliver: (() => void) | null = null;
class ManualResizeObserver {
    constructor(private readonly callback: ResizeObserverCallback) {}
    observe() {
        deliver = () => this.callback([], this as unknown as ResizeObserver);
    }
    disconnect() {}
}

afterEach(() => {
    vi.unstubAllGlobals();
    deliver = null;
});

function mount(width: number) {
    vi.stubGlobal("ResizeObserver", ManualResizeObserver);
    const el = ref<HTMLElement | null>(null);
    let shape!: ReturnType<typeof useBarShape>;
    const reads = { n: 0 };
    const host = document.createElement("div");
    document.body.append(host);
    const app = createApp(
        defineComponent({
            setup() {
                shape = useBarShape(el);
                return () =>
                    h("button", {
                        ref: (node) => {
                            const b = node as HTMLElement | null;
                            if (b && !b.dataset.spied) {
                                b.dataset.spied = "";
                                b.getBoundingClientRect = () => {
                                    reads.n++;
                                    return { width, height: 40 } as DOMRect;
                                };
                            }
                            el.value = b;
                        },
                    });
            },
        }),
    );
    app.mount(host);
    return { shape: () => shape.value, reads, unmount: () => (app.unmount(), host.remove()) };
}

describe("useBarShape", () => {
    it("does not read layout while the mount flushes", async () => {
        const run = mount(400);
        await nextTick();
        expect(run.reads.n).toBe(0);
        run.unmount();
    });

    it("reads on the observer's first delivery and sets the shape there", async () => {
        const run = mount(400);
        await nextTick();
        expect(deliver).not.toBeNull();
        deliver!();
        expect(run.reads.n).toBe(1);
        expect(run.shape()).toBe("bar");
        run.unmount();
    });

    it("a control on its rung stays a stadium", async () => {
        const run = mount(120);
        await nextTick();
        deliver!();
        expect(run.shape()).toBeUndefined();
        run.unmount();
    });
});
