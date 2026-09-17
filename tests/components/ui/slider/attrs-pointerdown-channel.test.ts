// A-10 (O-20) — the `$attrs.onPointerdown` CHANNEL, measured instead of guessed.
//
// Three committed docblocks declared the attribute-fallthrough channel dead: that a Vue
// `@pointerdown` template binding on reka's `<SliderRoot>` "arrives as
// `$attrs.onPointerdown` and is DROPPED across the Slot/forwardRef boundary", one of them
// adding that reka's own cached handler "shadows" the merged one. The render disagrees, at
// every pin measured. `SliderRoot.js:149` renders through
// `mergeProps(_ctx.$attrs, { … onPointerdown })`, and `mergeProps` CHAINS `onX` handlers
// rather than overwriting them; `SliderRoot` does set `inheritAttrs: false` (:17), which is
// the docblocks' premise, but it re-merges `$attrs` by hand on that same line, so nothing is
// dropped. The falsehood shipped — `dist/components/dock/composables/useDockHold.d.ts:24` at
// 9.0.0 — and a consumer read it: fourier-analysis hangs its scrub-session opener on exactly
// this channel and it works.
//
// This file is the durable half of the cure. Two arms:
//
//   1. the prose arm — none of the three files may re-assert the dead-channel claim. RED at
//      HEAD 46ab4124 on three files;
//   2. the channel arm — mount the library's own `<Slider>` with an `onPointerdown`
//      fallthrough listener and dispatch a real `pointerdown` on the resolved
//      `[data-slot="slider"]` host. GREEN today by measurement, and it goes RED the day a
//      reka major really does sever the channel, which is the regression the docblocks were
//      guessing at.
//
// What stays true, and is why `useDockHold` keeps native listeners: one acquire path for
// `pointerdown` AND `touchstart`, a window-scoped release that survives reka's
// `setPointerCapture` retarget, and capture-independent instant-on. Those are the reasons;
// a dropped binding never was one.
//
// SEATS +0 — plain vitest, the mount idiom of `dock-hold-contract.test.ts` beside it.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Slider } from "@glass/components/slider";

/** The three files that carried the claim. */
const SITES = [
    "src/components/slider/Slider.vue",
    "src/components/dock/composables/useDockHold.ts",
    "tests/components/ui/slider/dock-hold-contract.test.ts",
] as const;

/** Both spellings of the same falsehood: the drop claim and the shadow claim. */
const DEAD_CHANNEL = /\bDROPPED\b|\bshadows the merged\b/;

describe("the $attrs.onPointerdown channel through reka's SliderRoot", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("is claimed dead by no file in the tree", () => {
        const offenders = SITES.filter((site) =>
            DEAD_CHANNEL.test(readFileSync(join(process.cwd(), site), "utf8")),
        );

        expect(
            offenders,
            "no source may re-assert that the fallthrough listener is dropped or shadowed",
        ).toEqual([]);
    });

    it("lands a fallthrough listener on the resolved slider host", async () => {
        const spy = vi.fn();

        // `onPointerdown` is not a `<Slider>` prop, so it falls through to `$attrs` — the
        // exact path the docblocks called dead, and the one fourier-analysis rides.
        const Host = defineComponent({
            setup() {
                return () =>
                    h(Slider, {
                        "aria-label": "Channel probe",
                        max: 100,
                        modelValue: [42],
                        onPointerdown: spy,
                    });
            },
        });

        const wrapper = mount(Host, { attachTo: document.body });
        await nextTick();

        const host = document.querySelector('[data-slot="slider"]');
        expect(host, "the resolved slider host element exists").not.toBeNull();

        host!.dispatchEvent(
            new PointerEvent("pointerdown", {
                bubbles: true,
                cancelable: true,
                pointerId: 1,
            }),
        );
        await nextTick();

        expect(spy, "the consumer's fallthrough handler ran").toHaveBeenCalledTimes(1);

        wrapper.unmount();
    });
});
