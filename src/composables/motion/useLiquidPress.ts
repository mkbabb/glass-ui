// BB.W-PRESS-UNIFY — useLiquidPress: the ONE interruptible, coupled spring-press.
//
// The library's press across buttons / cards / dock controls was a CSS `:active`
// transition (`.tap-squish:active { scale }` on `--spring-smooth`). A CSS transition
// is a fixed `from→to` re-armed from the CURRENT computed value on every state flip,
// so a rapid re-press (a double-tap, an excited rapid-fire CTA) RESTARTS the scale
// transition from wherever the release happened to be — a visible micro-stutter,
// never the iOS velocity-continuous re-seat where the second press inherits the
// first's momentum. And the press was scale-ONLY: the surface bg/gleam swapped on a
// desynced bezier leg, not the unified squishy-glass beat.
//
// useLiquidPress reconciles both onto ONE driver:
//   • INTERRUPTIBLE — it composes the shipped `useSpringPress` → `useSpring` → kf
//     `SpringProgress`, whose target re-seat is velocity-continuous: a `press()` mid-
//     release re-targets the LIVE `(position, velocity)` so the second press carries
//     the first's momentum (the W-PRESS-UNIFY P2 contract). NO new physics — the
//     interruptible re-seat is the spring's own, reached by re-targeting (not a fixed
//     CSS `:active`).
//   • COUPLED — it feeds the live spring value into `useLiquidFlex` (squish-only,
//     `"linear"` law) for the volume-preserving X/Y reciprocal deform, AND writes the
//     SAME spring value as a 0..1 `--press-t` (or a consumer-named) custom property the
//     surface CSS reads for a sub-perceptual brightness/specular leg — ONE drive, both
//     legs, on the SAME `--spring-snappy`-class clock the spring carries (the §6 /
//     W-MOTION-CANON P3 fade-coupled-to-transform).
//   • PRM-INSTANT — `useSpring`'s `respectReducedMotion` (the kf `SpringProgress` PRM
//     snap) snaps the value to its endpoint with zero in-between transform frames, so
//     under reduce the press FUNCTIONS (the scale arrives, the gesture confirms) with
//     the physics off (the W-MOTION-CANON P6 contract). The wrapper inherits it.
//   • COMPOSITOR-ONLY — `pressStyle` writes `scale` + the `--press-t` custom property
//     only; never a layout property (the W-MOTION-CANON P5 ban `proof:no-layout-
//     animation` enforces). The CSS `.tap-squish` `:active` scale stays the no-JS /
//     SSR floor; the JS reciprocal deform is the ENHANCEMENT over it.
//
// The ≥2-consumer bar (J-inv-10) is on the DEAD primitive `useSpringPress`: it is now
// activated on TWO binaries — Button (direct; the W-BUTTON-GLASS surface, kept inline so
// `proof:button-glass`'s B2 direct-composition assert stays green) + Card (`:pressable`,
// via THIS wrapper, which composes `useSpringPress`). `useLiquidPress` is the canonical
// press wrapper Card consumes + the dock control is the booked third. Keyframes-bearing
// (via `useSpringPress`), so it ships on `/motion` ONLY, never the root barrel (the
// SCC-trap discipline).

import {
    computed,
    watch,
    type CSSProperties,
    type ComputedRef,
    type Ref,
} from "vue";
import { useSpringPress, type UseSpringPressOptions } from "./useSpringPress";
import { useLiquidFlex } from "./useLiquidFlex";
import { effectiveCap } from "./core/writeVelocityWeight";

export interface UseLiquidPressOptions extends UseSpringPressOptions {
    /**
     * The uniform press SHRINK depth — the contraction the press scale reaches at
     * `t=1` (the iOS uniform shrink the reciprocal squish deforms AROUND). The X axis
     * reads `shrink·stretch`, the Y axis `shrink/stretch` (the volume preserved on the
     * travel axis). Default 0.03 (the button `--scale-press-btn` 0.97 magnitude — the
     * JS path AGREES with the CSS `.tap-squish active:scale` floor). A calmer surface
     * (the dock control's no-overshoot tap register) passes a smaller depth.
     */
    shrinkDepth?: number;
    /**
     * The LOW reciprocal-squish cap handed to `useLiquidFlex` (the +N% elongation along
     * the travel axis). Default 1.04 (a button has no size span — the deform is a
     * lively settle, never a taffy-pull). Kept LOW by the liquid register.
     */
    maxStretch?: number;
    /**
     * The custom-property NAME the live press value (0..1) is written under, for the
     * surface CSS to read for the coupled brightness/specular leg. Default
     * `"--press-t"`. Button passes `"--glass-btn-press-t"` (the W-BUTTON-GLASS drive
     * the gleam already reads); the dock control passes `"--dock-press-t"`.
     */
    pressVar?: string;
    /**
     * BG.W-MOTION-SPINE — the press-tower collapse toggle. `true` (default) is the coupled
     * squishy register: `useLiquidFlex`'s volume-preserving X/Y reciprocal deform rides the
     * spring value (the Card `:pressable` register). `false` is the BARE mode — the press
     * drive (`pressVar`) + a UNIFORM shrink `scale`, no reciprocal deform, no `--flex-vel`
     * (the calmer no-overshoot register a dock control rides). ONE wrapper, two registers —
     * so `useSpringPress`-alone is no longer a second public press face for one behaviour.
     */
    squish?: boolean;
    /**
     * Below this travel threshold the inline `scale` is OMITTED from `pressStyle` so the
     * surface's at-rest CVA/utility transforms (a hover `scale`) win unimpeded; the JS
     * reciprocal scale wins ONLY while the press is engaged (the single-source press,
     * then yields back to the cascade as it settles). Default 0.001.
     */
    engageThreshold?: number;
    /**
     * BD.W-MOTION-WEIGHT — the pressed element (the host the consumer binds
     * `pressStyle` on), so the press cap is derived SITE-LOCALLY off the live
     * `--motion-weight` read at THAT element (the spike-corrected mechanism): the
     * shipped `maxStretch` cap at rest weight 0.618 (byte-identical feel), 1.0 at
     * weight 0 (the observer/PRM fence). When omitted, the cap is the static
     * `maxStretch` (the no-element fallback — still correct at rest weight, the
     * universal coupling is just not weight-scaled for that surface). The press is
     * the GENTLE register — a button has no size span, so the weight-coupled cap is a
     * lively settle, never a taffy-pull.
     */
    el?: Ref<HTMLElement | null>;
}

export interface UseLiquidPressReturn {
    /** The live spring press value (0 released → 1 pressed, with the spring overshoot). */
    value: Readonly<Ref<number>>;
    /** Drive the press to 1 (call on `pointerdown`). Interruptible — re-targets the live spring. */
    press: () => void;
    /** Release the press to 0 (call on `pointerup`/`cancel`/`leave`). */
    release: () => void;
    /** Pointer handlers ready to spread onto an element (the `useSpringPress` ergonomics). */
    handlers: {
        onPointerdown: () => void;
        onPointerup: () => void;
        onPointercancel: () => void;
        onPointerleave: () => void;
    };
    /**
     * The coupled press style — the ONE `:style` object a consumer binds. Carries the
     * reciprocal X/Y `scale` (engaged only past `engageThreshold`) AND the `pressVar`
     * 0..1 drive scalar the surface CSS reads for the brightness/specular leg.
     * Compositor-only (`scale` + a custom property — never a layout property).
     */
    pressStyle: ComputedRef<CSSProperties>;
}

/**
 * The ONE interruptible, coupled spring-press. Composes `useSpringPress` (the spring
 * driver, PRM-aware) + `useLiquidFlex` (the volume-preserving reciprocal squish) and
 * exposes a single `pressStyle` object + the pointer `handlers`.
 *
 * @example
 * ```vue
 * <script setup>
 * const press = useLiquidPress()
 * </script>
 * <template>
 *   <button v-bind="press.handlers" :style="press.pressStyle" />
 * </template>
 * ```
 */
export function useLiquidPress(
    options: UseLiquidPressOptions = {},
): UseLiquidPressReturn {
    const shrinkDepth = options.shrinkDepth ?? 0.03;
    const maxStretch = options.maxStretch ?? 1.04;
    const pressVar = options.pressVar ?? "--press-t";
    const engageThreshold = options.engageThreshold ?? 0.001;
    // BG.W-MOTION-SPINE — the press-tower collapse: squish ON (default) is the coupled
    // reciprocal deform; OFF is the bare uniform-shrink press (the calmer register). The
    // toggle is what lets THIS wrapper serve BOTH press registers, so `useSpringPress`
    // stops being a second public press face for one behaviour.
    const squishOn = options.squish !== false;

    // The spring press driver — interruptible by construction (the kf SpringProgress
    // target re-seat carries velocity), PRM-aware (respectReducedMotion snaps the value).
    const press = useSpringPress({
        response: options.response,
        dampingFraction: options.dampingFraction,
        initial: options.initial,
        initialVelocity: options.initialVelocity,
        settleThreshold: options.settleThreshold,
        velocitySettleThreshold: options.velocitySettleThreshold,
        respectReducedMotion: options.respectReducedMotion,
        onValue: options.onValue,
    });

    // The volume-preserving reciprocal squish — SQUISH-ONLY (a press surface has no size
    // span), so it reads the spring value as the `"linear"`-law travel fraction, capped
    // LOW. The SAME drive calls carry the release (no free-running timer — the M5
    // determinism `useLiquidFlex` documents). Built ONLY on the squishy register — the bare
    // mode (`squish: false`) presses on a uniform shrink alone (the calmer register).
    const squish = squishOn
        ? useLiquidFlex({
              from: 0,
              to: 1,
              axis: "width",
              // BD.W-MOTION-WEIGHT — the cap is weight-coupled SITE-LOCALLY: `effectiveCap`
              // reads the live `--motion-weight` off the pressed element and returns the
              // `maxStretch` cap at rest 0.618, 1.0 at weight 0 (the observer/PRM fence). No
              // element → the static cap (still correct at rest weight). The reciprocal
              // squish is the GENTLE press register.
              maxStretch: () => effectiveCap(options.el?.value ?? null, maxStretch),
              squishLaw: "linear",
          })
        : null;

    // Feed the live spring value as the squish travel via a WATCH (the side-effect site —
    // NOT inside a computed getter, which would mutate `useLiquidFlex`'s travel ref during
    // render). `flush: 'sync'` so the squish tracks the spring frame-for-frame.
    if (squish) {
        watch(() => press.value.value, (t) => squish.squish(t), {
            immediate: true,
            flush: "sync",
        });
    }

    const pressStyle = computed<CSSProperties>(() => {
        const t = press.value.value;
        // The reciprocal stretch (squishy register) or a flat 1 (bare mode — a uniform
        // shrink, no reciprocal deform).
        const stretch = squish ? squish.stretch.value : 1;
        // The uniform press shrink couples WITH the reciprocal squish: X reads
        // `shrink·stretch`, Y reads `shrink/stretch` (volume preserved on the travel
        // axis). The shrink rides the consumer's press-scale magnitude (default 0.03 →
        // 0.97 at full press) so the JS path AGREES with the CSS `.tap-squish` floor — the
        // JS is the ENHANCEMENT (the reciprocal deform), not a competing shrink.
        const shrink = 1 - t * shrinkDepth;
        const scaleX = (shrink * stretch).toFixed(4);
        const scaleY = (shrink / stretch).toFixed(4);
        const style: CSSProperties = {
            // The ONE press drive scalar the coupled brightness/specular leg reads. The
            // var NAME is consumer-chosen so a surface routes it onto its own gleam token.
            [pressVar]: t.toFixed(4),
        } as CSSProperties;
        // BD.W-MOTION-WEIGHT (§2c) — the saturating press velocity term, emitted (squishy
        // register only) so the surface CSS can ride the local `--motion-weight` boost. 0 at
        // rest; self-extinguishing as the spring settles. A pure projection of the term
        // `useLiquidFlex` already computes.
        if (squish) {
            (style as Record<string, string>)["--flex-vel"] =
                squish.flexVel.value.toFixed(4);
        }
        // Emit the JS reciprocal `scale` ONLY while the press is engaged (past the
        // sub-perceptual threshold) — at rest the inline `scale` is OMITTED so the
        // surface's hover/rest transforms win unimpeded. The inline value wins over a CVA
        // `active:scale-*` utility while pressed (the single-source press), then yields
        // back to the cascade as it settles — no desync, no double-apply.
        if (t > engageThreshold) {
            style.scale = `${scaleX} ${scaleY}`;
        }
        return style;
    });

    return {
        value: press.value,
        press: press.press,
        release: press.release,
        handlers: press.handlers,
        pressStyle,
    };
}
