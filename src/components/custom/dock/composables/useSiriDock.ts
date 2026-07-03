// useSiriDock — the Siri-as-a-DOCK-CAPABILITY orchestrator (BG.W-SIRI-DOCK-CAPABILITY).
//
// Siri is a DOCK CAPABILITY, not a subpath component: the glass island lives BESIDE the
// dock via the `.glass-dock-frame`/`#rail` escape (box-inviolate — it never touches the
// dock's own box), it blooms FROM the dock pill, and its "Search or Ask" affordance
// COMPOSES the existing `useDockSearch` pipeline. This composable is the seam that wires
// the three shipped substrates together — it owns NO second engine:
//
//   - the FORM morph rides the ONE `useDockSpring` factory (the band's sole
//     `new SpringProgress` site — BG.W-DOCK-ENGINE-UNIFY). `useSiriDock` NEVER
//     instantiates a `SpringProgress`; it drives a `DockSpring` handle that glides
//     `--siri-island-t` through the four forms' √φ ladder slots (0 dormant → 1
//     responding). The scalar is PRM-jumped by the factory's `respectReducedMotion`.
//
//   - the OPEN bloom rides `useLiquidReveal` (the iOS-27 source-rect ElementMorph — the
//     island materializes FROM the trigger pill's rect, compositor-only, PRM-snap). ONE
//     `ElementMorph`, sampled from the SAME SPRING_PRESETS the `--spring-*` tokens
//     generate from — no hand-rolled bloom.
//
//   - the SEARCH pipeline is the existing `useDockSearch` (the fuzzy matcher + the
//     window + the ToC subsume — ONE pipeline, never re-forked). `useSiriDock` exposes
//     it verbatim when a `dockState` + `items`/`onSearch` source is supplied.
//
// The waveform reads a `level` push-value (0..1) derived from the active form (dormant
// quiet → listening peaks); the demo-private `<SiriWaveform :level>` binds it. `useSiriDock`
// owns NO WebGL — the waveform is demo-private (the capability ships the seam, not the GL).

import { computed, ref, type ComponentPublicInstance, type Ref } from "vue";
import { useDockSpring } from "./useDockSpring";
import { useLiquidReveal } from "../../../../composables/motion/useLiquidReveal";
import { useDockSearch, type UseDockSearchOptions, type UseDockSearchReturn } from "./useDockSearch";
import type { SearchableItem } from "../../search/composables";
import { DOCK_SPRING, SIRI_FORMS, siriFormOf, type SiriForm } from "../constants";

export interface UseSiriDockOptions<T extends SearchableItem = SearchableItem> {
    /**
     * The island surface element — `useLiquidReveal` blooms it FROM the trigger, and the
     * form morph writes `--siri-island-t` onto it (the scalar the island CSS + the
     * `--siri-island-t`-coupled scrim read). A templateRef to the island root element or
     * component (its `.$el` is resolved).
     */
    island: Ref<HTMLElement | ComponentPublicInstance | null>;
    /**
     * The trigger the island blooms FROM — the collapsed dock pill / the "Search or Ask"
     * affordance. Passed straight to `useLiquidReveal` (its binding-verification `.$el`
     * resolver handles a component ref).
     */
    trigger?: Ref<HTMLElement | ComponentPublicInstance | null>;
    /**
     * The Search-or-Ask pipeline source (composes `useDockSearch`). When present the
     * capability threads the EXISTING dock-search seam (fuzzy matcher + window + ToC
     * subsume) — NOT a second search engine. Omit for an island with no search pipeline.
     */
    search?: UseDockSearchOptions<T>;
    /**
     * The starting island-bloom blur radius forwarded to `useLiquidReveal` (the iOS-27
     * decongest). Default 6 (a touch deeper than the dialog default — the island is
     * glass coalescing from the pill).
     */
    blur?: number;
}

export interface UseSiriDockReturn<T extends SearchableItem = SearchableItem> {
    /** The active form (the state the `--siri-island-t` scalar glides toward). */
    form: Ref<SiriForm>;
    /** The waveform push-level (0..1) for the active form — the `<SiriWaveform :level>` bind. */
    level: Ref<number>;
    /** The `role="status"` live announcement for the active form. */
    liveMessage: Ref<string>;
    /** Set the form and glide `--siri-island-t` to its slot on the ONE dock spring. */
    setForm: (next: SiriForm) => void;
    /** Bloom the island open FROM the trigger (listening) — the iOS-27 source-rect reveal. */
    engage: () => void;
    /** Advance to the thinking form (the shimmer settle). */
    think: () => void;
    /** Advance to the responding form (the wide panel). */
    respond: () => void;
    /** Return to the dormant pill (conceal the bloom; glide the scalar to 0). */
    dismiss: () => void;
    /** True while the island is engaged (any non-dormant form). */
    isEngaged: Ref<boolean>;
    /** The composed `useDockSearch` handle (null when no `search` source is supplied). */
    search: UseDockSearchReturn<T> | null;
}

/**
 * The Siri dock-capability seam. Composes `useDockSpring` (the form morph), `useLiquidReveal`
 * (the source-rect bloom), and `useDockSearch` (the Search-or-Ask pipeline) — ONE of each,
 * no second engine.
 *
 * @example
 * ```ts
 * const siri = useSiriDock({ island: islandRef, trigger: pillRef, search: { dockState, items } });
 * siri.engage();   // pill blooms into the listening orb; the waveform lights up
 * siri.respond();  // glides to the responding panel
 * siri.dismiss();  // back to the dormant "Search or ask" pill
 * ```
 */
export function useSiriDock<T extends SearchableItem = SearchableItem>(
    options: UseSiriDockOptions<T>,
): UseSiriDockReturn<T> {
    const form = ref<SiriForm>("dormant");

    // The ONE dock spring handle — the band's sole `new SpringProgress` factory. The Siri
    // island reuses the byte-frozen DOCK_SPRING clock (no new spring register); the scalar
    // glides through the four form slots, PRM-jumped by the factory's respectReducedMotion.
    const spring = useDockSpring({
        response: DOCK_SPRING.response,
        dampingFraction: DOCK_SPRING.dampingFraction,
    });

    // The source-rect bloom — the island materializes FROM the trigger pill (iOS-27).
    const { reveal, conceal } = useLiquidReveal(options.island, {
        trigger: options.trigger,
        preset: "bouncy",
        blur: options.blur ?? 6,
    });

    // The Search-or-Ask pipeline — the EXISTING dock-search seam (ONE pipeline), threaded
    // only when a source is supplied. Never a second matcher/window.
    const search: UseDockSearchReturn<T> | null = options.search
        ? useDockSearch<T>(options.search)
        : null;

    function islandEl(): HTMLElement | null {
        const v = options.island.value;
        if (!v) return null;
        if (v instanceof HTMLElement) return v;
        const el = (v as ComponentPublicInstance).$el;
        return el instanceof HTMLElement ? el : null;
    }

    function glideToSlot(fromSlot: number, toSlot: number): void {
        const el = islandEl();
        if (!el) return;
        spring.playTo(fromSlot, toSlot, {
            onFrame: (value) => {
                el.style.setProperty("--siri-island-t", value.toFixed(4));
            },
            onSettle: () => {
                el.style.setProperty("--siri-island-t", toSlot.toFixed(4));
            },
        });
    }

    function setForm(next: SiriForm): void {
        const fromSlot = siriFormOf(form.value).slot;
        const toSlot = siriFormOf(next).slot;
        form.value = next;
        glideToSlot(fromSlot, toSlot);
    }

    function engage(): void {
        // The bloom fires on the FIRST engage (dormant → listening) — the island coalesces
        // from the pill; subsequent form advances glide on the scalar only.
        if (form.value === "dormant") reveal();
        setForm("listening");
    }

    function think(): void {
        setForm("thinking");
    }

    function respond(): void {
        setForm("responding");
    }

    function dismiss(): void {
        conceal();
        setForm("dormant");
    }

    const level = computed<number>(() => siriFormOf(form.value).level);
    const liveMessage = computed<string>(() => siriFormOf(form.value).label);
    const isEngaged = computed<boolean>(() => form.value !== "dormant");

    return {
        form,
        // computed refs are read-only Refs — expose the underlying Ref shape.
        level: level as unknown as Ref<number>,
        liveMessage: liveMessage as unknown as Ref<string>,
        setForm,
        engage,
        think,
        respond,
        dismiss,
        isEngaged: isEngaged as unknown as Ref<boolean>,
        search,
    };
}
