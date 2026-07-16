// v-specular — the tier-root moving-specular AUTO-ARM (BB.W-LIQUIDHOVER).
//
// This directive is the GLEAM-TRACK primitive of the affordance vocabulary
// (`docs/precepts/affordance-map.md`, BC.W-AFFORDANCE-MAP — the closed five-primitive
// set: hover-lift · gleam-track · press-squish · drag-morph · focus-ring). It feeds the
// host `--mouse-x/y` write; the `.glass-material::before` recipe maps it onto the typed
// `--specular-x/y` channel and reads the `--glass-specular-intensity-{rest,hover,active}`
// rungs — so the gleam WAKES on hover (intensity rest 0 → hover) and ILLUMINATES under
// the touch-point on press (→ active), the iOS-27 touch-illumination coupled to the
// PRESS-SQUISH leg. The position-tracked write rides `--ease-standard` (motion-canon §6
// "Position-tracked → --ease-standard"). One delivery, no second engine (the proportion
// fence — `proof:affordance-map` reds a forked gleam writer).
//
// The interactive-glass tier's pointer-following gleam is a PROPERTY OF THE TIER,
// not a per-consumer opt-in. This dependency-free `ObjectDirective` (the `vReveal`
// playbook) attaches the rAF-coalesced `pointermove` position write to its host on
// `mounted` and tears it down on `unmounted` — so an ordinary glass Button
// / `<DockControl>` control follows the pointer with ZERO
// `useSpecularTracking` call site, no `:style`/`@pointermove` pair.
//
// SINGLE-SOURCE: the directive does NOT re-implement the rAF/PRM/coordinate write —
// it WRAPS `createSpecularWriter`, the SAME core `useSpecularTracking` composes for
// the Vue `:style`-ref case (Card's prop-gated `specular` opt-in). The composable is
// the `:style`-ref delivery; this directive is the zero-wiring tier-root delivery —
// ONE position-write source, TWO deliveries. A consumer with a NET-NEW interactive
// glass surface auto-arms it with `v-specular` (the ≥2-consumer generality bar met by
// the in-library Button + dock consumers at birth).
//
// The write lands on the directive HOST — the element that owns the material
// `::before` gleam. Apply `v-specular` on the same node the `.glass-material` /
// `glass-specular-track` / `.dock-*` `::before` paints on (the §Triumvirate
// host-geometry rule: the `--mouse-x/y` host write must be the gleam-painting box,
// not an unrelated ancestor).
//
// PRM-aware by construction (the wrapped core reads the cached `matchMedia` gate +
// skips the write under reduce — the CSS bracket pins the catch-light static at the
// centred 50% fallback). `vue` is type-only, so the directive carries no runtime
// dependency and is root-barrel safe.
import type { DirectiveBinding, ObjectDirective } from "vue";
import { createSpecularWriter, type SpecularWriter } from "./useSpecularTracking";

// One writer per host element (a directive instance has no scope, so we key the
// writer + listener off the element to dispose them on unmount).
const writers = new WeakMap<HTMLElement, SpecularWriter>();

// `v-specular` (default, no value) or `v-specular="true"` arms the gleam;
// `v-specular="false"` is the inert opt-out (a non-glass `solid`/`link` button has
// no `::before` to gleam, so the host write would be wasted listener work). A
// reactive value flips on `updated` — the writer attaches/detaches in lockstep.
function armed(binding: DirectiveBinding<boolean | undefined>): boolean {
    return binding.value !== false;
}

function attach(el: HTMLElement): void {
    if (writers.has(el)) return;
    const writer = createSpecularWriter((x, y) => {
        // Direct host write — the recipe inherits `--mouse-x/y` down to the
        // `::before` and maps it onto the typed `--specular-*` channel.
        el.style.setProperty("--mouse-x", `${x.toFixed(2)}%`);
        el.style.setProperty("--mouse-y", `${y.toFixed(2)}%`);
    });
    el.addEventListener("pointermove", writer.onPointerMove);
    writers.set(el, writer);
}

function detach(el: HTMLElement): void {
    const writer = writers.get(el);
    if (!writer) return;
    el.removeEventListener("pointermove", writer.onPointerMove);
    writer.dispose();
    writers.delete(el);
}

function mounted(
    el: HTMLElement,
    binding: DirectiveBinding<boolean | undefined>,
): void {
    if (armed(binding)) attach(el);
}

function updated(
    el: HTMLElement,
    binding: DirectiveBinding<boolean | undefined>,
): void {
    if (armed(binding)) attach(el);
    else detach(el);
}

export const vSpecular: ObjectDirective<HTMLElement, boolean | undefined> = {
    mounted,
    updated,
    unmounted: detach,
};
