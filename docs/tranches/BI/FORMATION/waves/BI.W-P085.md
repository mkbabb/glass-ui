# BI.W-P085 — BorderProgress retirement

**Status:** DONE

The broad `BorderProgress` family is absent from source, exports, package projections, stories,
and tests, with no alias. Stale production-source references to its implementation have been
removed.

`Progress` and `Slider` retain optional decorative marks. The separately public,
minimal `ScrollProgressRim` remains focused on aggregate or segmented perimeter progress; its
overlay now paints above the glass material pseudo-layer so the band is not occluded.

Verification owner: public/export discovery, focused Progress/Slider/ScrollProgressRim tests,
both typechecks, and the native browser specimen when the in-app browser runtime is available.
