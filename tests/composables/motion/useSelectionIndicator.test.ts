/* BK #71 W-EYEGLASS — RT-84O, the dead measure.
 *
 * The engine's first direct coverage, and it exists because the defect it convicts
 * was invisible to every other kind of check. `useSelectionIndicator` measured on
 * mount, on every model change and on every `ResizeObserver` callback, for callers
 * that render no indicator at all — two forced layout reads per pass into a
 * `singleSliderStyle` nothing could paint. `vue-tsc` sees nothing, the contract
 * batteries see nothing (the output is correct; it is merely unread), and a browser
 * shows a control row that works. Only a call count convicts it.
 *
 * SEATS +0 — this claims no §B.5 gate name and lives with the engine's siblings
 * (`useElementMorph.test.ts`), not in `tests/gates/`.
 *
 * THE THIRD CASE IS A REGRESSION ARM AND SAYS SO. Declining to measure is only safe
 * if the decision is revisited when an indicator appears, and `DockLayerGroup` paints
 * its whole switcher behind a `v-if` — so "no element at mount" is transient there,
 * not permanent. It is NOT born-RED (the old engine measured nothing either while the
 * strip was absent, having no buttons to measure); it holds the structural fact the
 * guard leans on — the indicator is a CHILD of the container, so the two can only
 * arrive together and the container watcher already re-measures. A watcher on
 * `indicatorRef` was written into the engine first and struck when this case greened
 * without it; the case is what keeps the strike honest.
 */
import { describe, expect, it, vi } from "vitest";
import { computed, defineComponent, h, nextTick, ref, type Ref } from "vue";
import { mount } from "@vue/test-utils";
import { useSelectionIndicator } from "@glass/composables/motion/morph/useSelectionIndicator";

const OPTIONS = [{ value: "one" }, { value: "two" }, { value: "three" }];

const rect = (left: number, width: number): DOMRect =>
    ({
        x: left,
        y: 0,
        left,
        right: left + width,
        top: 0,
        bottom: 40,
        width,
        height: 40,
        toJSON: () => ({}),
    }) as DOMRect;

/** A `ResizeObserver` that hands its callback back, so the resize path is drivable. */
function captureResizeObserver(): { fire: () => void } {
    const callbacks: ResizeObserverCallback[] = [];
    class CapturingResizeObserver {
        constructor(cb: ResizeObserverCallback) {
            callbacks.push(cb);
        }
        observe = vi.fn();
        unobserve = vi.fn();
        disconnect = vi.fn();
    }
    vi.stubGlobal("ResizeObserver", CapturingResizeObserver);
    return {
        fire() {
            for (const cb of callbacks) {
                cb([], undefined as unknown as ResizeObserver);
            }
        },
    };
}

/**
 * The minimal shape both real consumers have: a container holding three buttons and
 * an indicator node, the indicator nested INSIDE the container exactly as
 * `SegmentedTabs` and `DockLayerGroup` nest theirs. `withIndicator` is the only
 * difference between the mounts below — the engine is called identically. `present`
 * gates the whole strip, which is the `v-if` shape the dock switcher has.
 */
function harness(withIndicator: Ref<boolean>, present: Ref<boolean> = ref(true)) {
    const model = ref<string | undefined>("one");
    const rects: { calls: number } = { calls: 0 };

    const Harness = defineComponent({
        setup(_, { expose }) {
            const containerRef = ref<HTMLElement | null>(null);
            const indicatorRef = ref<HTMLElement | null>(null);
            const buttonRefs = ref<HTMLElement[]>([]);
            const api = useSelectionIndicator({
                containerRef,
                indicatorRef,
                buttonRefs,
                options: computed(() => OPTIONS),
                model,
                activeValues: computed(() => (model.value ? [model.value] : [])),
                vertical: computed(() => false),
            });
            expose({ singleSliderStyle: api.singleSliderStyle });

            const countedRect = (left: number, width: number) => () => {
                rects.calls += 1;
                return rect(left, width);
            };

            return () =>
                !present.value
                    ? h("div")
                    : h(
                          "div",
                          {
                              ref: (el) => {
                                  const node = el as HTMLElement | null;
                                  containerRef.value = node;
                                  if (node)
                                      node.getBoundingClientRect = countedRect(0, 300);
                              },
                          },
                          [
                              withIndicator.value
                                  ? h("div", {
                                        class: "indicator",
                                        ref: (el) => {
                                            indicatorRef.value =
                                                el as HTMLElement | null;
                                        },
                                    })
                                  : null,
                              ...OPTIONS.map((o, i) =>
                                  h("button", {
                                      key: o.value,
                                      ref: (el) => {
                                          const node = el as HTMLElement | null;
                                          if (!node) return;
                                          buttonRefs.value[i] = node;
                                          node.getBoundingClientRect = countedRect(
                                              i * 100,
                                              100,
                                          );
                                      },
                                  }),
                              ),
                          ],
                      );
        },
    });

    return { Harness, model, rects };
}

const settle = async () => {
    await nextTick();
    await nextTick();
    await nextTick();
};

describe("useSelectionIndicator — RT-84O, the measure runs only where it can be painted", () => {
    it("a caller with NO indicator element forces zero layout, mount through resize", async () => {
        const resize = captureResizeObserver();
        const { Harness, model, rects } = harness(ref(false));
        const wrapper = mount(Harness, { attachTo: document.body });
        await settle();

        expect(rects.calls).toBe(0);

        // The two other paths into the measure: a model change and a resize.
        model.value = "three";
        await settle();
        resize.fire();
        await settle();
        expect(rects.calls).toBe(0);

        // And the style it would have written stays at its unpainted rest value,
        // which is what "nothing reads it" means from the other side.
        const style = (
            wrapper.vm as unknown as { singleSliderStyle: Record<string, string> }
        ).singleSliderStyle;
        expect(style.opacity).toBe("0");

        wrapper.unmount();
        vi.unstubAllGlobals();
    });

    it("a caller WITH an indicator element measures exactly as it always did", async () => {
        const resize = captureResizeObserver();
        const { Harness, rects } = harness(ref(true));
        const wrapper = mount(Harness, { attachTo: document.body });
        await settle();

        expect(rects.calls).toBeGreaterThan(0);
        const style = (
            wrapper.vm as unknown as { singleSliderStyle: Record<string, string> }
        ).singleSliderStyle;
        expect(style).toMatchObject({
            width: "100px",
            height: "40px",
            translate: "0px 0px",
            opacity: "1",
        });

        const beforeResize = rects.calls;
        resize.fire();
        await settle();
        expect(rects.calls).toBeGreaterThan(beforeResize);

        wrapper.unmount();
        vi.unstubAllGlobals();
    });

    it("REGRESSION — a strip that arrives LATE is measured on arrival, not skipped for good", async () => {
        const present = ref(false);
        const { Harness, model, rects } = harness(ref(true), present);
        const wrapper = mount(Harness, { attachTo: document.body });
        await settle();
        expect(rects.calls).toBe(0);

        // The `DockLayerGroup` shape: container AND indicator appear in one `v-if`.
        model.value = "two";
        present.value = true;
        await settle();

        expect(rects.calls).toBeGreaterThan(0);
        const style = (
            wrapper.vm as unknown as { singleSliderStyle: Record<string, string> }
        ).singleSliderStyle;
        expect(style).toMatchObject({ translate: "100px 0px", opacity: "1" });

        wrapper.unmount();
    });
});
