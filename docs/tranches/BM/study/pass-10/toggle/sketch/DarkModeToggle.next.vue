<!-- BM pass 10 (DESIGN §9; O-428, ships in 11.2.0): the toggle's glyph, a design sketch over
     `src/components/dark-mode-toggle/DarkModeToggle.vue` (master), not library source. The script is
     unchanged except that `useLiquidPress` goes: the button is a `.plate` (W-B.17, 11.2.0), and its glyph
     carries the press's verb, so the plate answers as a fill alone (R-3) and its held tone waits for the
     glyph to land (choice 19 B's third rule). Only the template's svg changes, shown here.
     A sun of glass's palette: a disc of radius 6.5 and eight round rays from 8.5 to 10.5. Dark: the rays
     draw in under the disc (scale 0.5 about the centre), and a night disc of radius 5.75, inside the mask,
     slides 12.7 units from beyond the upper right to carve the crescent. The id is per instance.
     Amended by the final fold (A10-1, B10-1): the night is filled black inside its mask. A luminance mask cuts
     only under black, and a night that inherited the glyph's colour left 63 % (Chromium) to 86 % (Playwright
     WebKit) of the disc where the crescent's bite should be; with the black fill the bite is the ground exactly
     in both engines (critique-B-check-*.json). The mask keeps its own colours under forced colours (the css).
     A10-2: the button is a plate that answers hover and focus as a fill alone. Its glyph is its one on-mark and
     its press's answer, so the plate takes no on fill from `aria-pressed`, no press tone and no shrink: one
     attribute the plate reads (BL's W-B.17 row), not a toggle-named selector. -->
<template>
    <button
        ref="button"
        type="button"
        :class="cn('dark-mode-toggle-button plate', attrs.class as string | undefined)"
        :data-size="props.size"
        v-bind="forwardedAttrs"
        @click="toggleDark"
    >
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <mask :id="nightId" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#fff" />
                <circle class="toggle-night" data-allow-motion cx="15.5" cy="8.5" r="5.75" fill="#000" />
            </mask>
            <g :mask="`url(#${nightId})`">
                <path class="toggle-rays" data-allow-motion d="M20.5 12h2M18 18l1.4 1.4M12 20.5v2M6 18l-1.4 1.4M3.5 12h-2M6 6 4.6 4.6M12 3.5v-2M18 6l1.4-1.4" />
                <circle cx="12" cy="12" r="6.5" />
            </g>
        </svg>
    </button>
</template>
