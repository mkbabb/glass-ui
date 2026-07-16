# BI.W-P118 — PagerDots

**Status:** DONE

## Shipped contract

`PagerDots` is the shared page-position and direct-navigation control for carousel and deck consumers.

- Page count, current page, direct pointer selection, roving focus, keyboard travel, dynamic counts, and zero-count state are covered.
- The active worm is velocity-bounded and owns its SVG filter and clip path inside each instance.
- SVG resource IDs are stable for an instance, unique across concurrent instances, and removed on unmount.
- No document-global Goo facility or Carousel-specific dot implementation remains.
- Fractional inputs normalize to an integral semantic page before selection or keyboard travel.

## Evidence

`tests/components/pager-dots.contract.test.ts` covers concurrent instances, rerender, remount, dynamic boundaries, zero count, and integral keyboard selection. The navigation story exercises the public component directly.
