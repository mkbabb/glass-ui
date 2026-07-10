// useSectionReveal — the demo-private, scroll-settle-reactive section reveal
// (BG.W-SECTION-TYPEWRITER-FADEUP).
//
// The per-glyph `.story-section__heading` entrance (`gl-char-rise`) cannot ride
// a native `view()` timeline — a view-timeline animates ONE property span per
// element, not a per-CHARACTER stagger — so the heading reveal is JS-gated: an
// IntersectionObserver arms the entrance as the heading crosses into view, and
// the SplitChars glyphs rise on the `--char-stagger-step` cascade. The BODY
// sibling rides the native `.scroll-cascade` `view()` timeline (a disjoint
// register); the two fire congruently.
//
// This is a FRESH demo-private mechanism (off every barrel) — NOT an overload of
// the public-but-unused `vScrollRevealOnce`, which stays untouched. Demo-private
// means no "correct for any consumer" contract and no proof:motion-presets
// no-regression burden.
//
// # The strand-proof — F5/reload restoration
//
// In-app navigation is ALWAYS top:0 (the router discards savedPosition; AppShell
// forces scrollTo({top:0})), so the only live strand is the BROWSER-NATIVE
// F5/reload restoration of `<main>.scrollTop`, which writes scrollTop with NO
// guaranteed scroll event and can land in an ADVERSE order (restoration fires
// AFTER mount/route-settle on a true reload where no route-change event runs).
// The sweep therefore fires on FOUR hooks — the last two are load-bearing for F5:
//   (i)   the THROTTLED container `scroll` listener (native-smooth + user scroll);
//   (ii)  the RAW container `scrollend` (Baseline Chrome 114+ / Safari 18.2+ —
//         fires after BOTH smooth AND instant programmatic scrollTop writes, so a
//         dropped trailing throttle edge cannot strand the final rest position);
//   (iii) a single-rAF-after-route-settle fallback (in-app nav, once per route);
//   (iv)  a BOUNDED post-mount re-sweep (two rAFs) so a restoration that lands
//         after the listeners attach but with no scroll/route event still reveals
//         every already-passed section (the F5 adverse-order close).
//
// # FOUC
//
// `register` sets `data-reveal-armed` SYNCHRONOUSLY in the section's onMounted
// (pre-paint), so the INVERTED CSS floor
// (`[data-reveal-armed] … :not([data-revealed]) .char { opacity: 0 }`) hides the
// glyphs before the first paint — no visible-then-hidden flash. No-IO / no-JS /
// no-provider → the floor never engages → the heading is VISIBLE (the safe
// degrade; the reveal is a progressive enhancement, never a load-bearing hide).

import { onMounted, onScopeDispose, type InjectionKey } from "vue";

/** The register a StorySection injects + calls on mount with its heading node. */
export type SectionRegister = (el: HTMLElement) => void;

/** The provide/inject key — the PAGE provides ONE register; every descendant
 *  StorySection injects it (the ONE-shared-observer singleton, not N). */
export const SECTION_REVEAL_KEY: InjectionKey<SectionRegister> =
    Symbol("storySectionReveal");

/** A tiny leading+trailing throttle (no throttle util exists in demo/). The
 *  trailing edge guarantees the final rest position is swept even if the last
 *  `scroll` event lands inside a throttle window. */
function throttle<A extends unknown[]>(
    fn: (...args: A) => void,
    ms: number,
): (...args: A) => void {
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args: A) => {
        const now = Date.now();
        const remaining = ms - (now - last);
        if (remaining <= 0) {
            if (timer !== null) {
                clearTimeout(timer);
                timer = null;
            }
            last = now;
            fn(...args);
        } else if (timer === null) {
            timer = setTimeout(() => {
                last = Date.now();
                timer = null;
                fn(...args);
            }, remaining);
        }
    };
}

/**
 * The ONE observer + ONE pair of scroller listeners per PAGE. Call it ONCE in the
 * page chassis, `provide(SECTION_REVEAL_KEY, register)`, and forward `onRouteSettle`
 * to the route-change watcher. Each StorySection injects `register` and calls it
 * on its own mount — the per-call model does NOT create N observers / N listeners.
 */
export function useSectionReveal(getRoot: () => HTMLElement | null): {
    register: SectionRegister;
    onRouteSettle: () => void;
} {
    const pending = new Set<HTMLElement>();
    let io: IntersectionObserver | null = null;
    let root: HTMLElement | null = null;

    const reveal = (c: HTMLElement): void => {
        c.setAttribute("data-revealed", "");
        io?.unobserve(c);
        pending.delete(c);
        if (!pending.size) detach();
    };

    // Unthrottled — scrollend / route-settle / mount-resweep. Reveals every
    // pending section whose bottom has scrolled ABOVE the scroller top (the IO
    // owns sections coming INTO view; this owns sections a jump-scroll passed).
    const sweepRaw = (): void => {
        if (!root) return;
        const top = root.getBoundingClientRect().top;
        for (const c of [...pending])
            if (c.getBoundingClientRect().bottom <= top) reveal(c);
    };
    const sweep = throttle(sweepRaw, 100); // throttled — scroll

    function detach(): void {
        root?.removeEventListener("scroll", sweep);
        root?.removeEventListener("scrollend", sweepRaw);
    }

    const register: SectionRegister = (el) => {
        root ??= getRoot();
        // No-IO floor → VISIBLE (the reveal is progressive enhancement).
        if (
            typeof window === "undefined" ||
            !("IntersectionObserver" in window) ||
            !root
        ) {
            el.setAttribute("data-revealed", "");
            return;
        }
        // INVERTED floor: armed → hide-until-revealed, set SYNCHRONOUSLY
        // (pre-paint) so no glyph flashes in before the reveal claims it.
        el.setAttribute("data-reveal-armed", "");
        io ??= new IntersectionObserver(
            (entries) =>
                entries.forEach(
                    (e) =>
                        e.isIntersecting && reveal(e.target as HTMLElement),
                ),
            { root, threshold: 0.15 },
        );
        pending.add(el);
        io.observe(el);
    };

    const onRouteSettle = (): void => {
        requestAnimationFrame(sweepRaw); // hook (iii)
    };

    onMounted(() => {
        root ??= getRoot();
        root?.addEventListener("scroll", sweep, { passive: true }); // (i)
        root?.addEventListener("scrollend", sweepRaw, { passive: true }); // (ii)
        // (iv) bounded mount re-sweep — the F5 adverse-order close.
        requestAnimationFrame(sweepRaw);
        requestAnimationFrame(() => requestAnimationFrame(sweepRaw));
    });

    onScopeDispose(() => {
        detach();
        io?.disconnect();
        io = null;
        pending.clear();
    });

    return { register, onRouteSettle };
}
