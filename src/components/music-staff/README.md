# MusicStaff

`MusicStaff` engraves a five-line staff as deterministic SVG geometry, and plays
itself as a loading surface. One user unit is one staff space, so every metric
in the geometry is a literal engraving measure and the score never squashes.

```vue
<script setup lang="ts">
import { MusicStaff, type MusicStaffNoteEvent } from "@mkbabb/glass-ui/music-staff";

const notes: MusicStaffNoteEvent[] = [
    { id: "theme-1", midi: 64, beat: 0, beats: 1 },
    { id: "theme-2", midi: 67, beat: 1, beats: 0.5 },
];
</script>

<template>
    <MusicStaff :notes="notes" label="Score quotation" :progress="0.4" />
    <MusicStaff mode="loading" label="Loading the archive" />
</template>
```

`beat` and `beats` are quarter-note beats — the one timing axis. Rhythm follows
from `beats`: heads, dots, flags, and beams are all derived, never passed.

## Modes

`mode="score"` engraves the notes, scrolls horizontally when it overflows (a
focused overflow box already pages with Arrow, Home, End, and PageUp/PageDown),
and reads `progress` as a clip wipe whose leading edge is the playhead.

`mode="loading"` ignores `notes` and streams one composed phrase past a parked
reading line, player-piano style: indeterminate by construction, with no
resident animation frame or timer. A determinate `progress` inks the rules
behind the reel; `progress` at 1 stops the transport, drops `aria-busy`, and
seals the score with a final barline. The clef is engraved for the composed
motif, so a `clef` prop in loading mode is a DEV-time error, not a re-engraving.

A loading surface is as wide as the engraving the reel can keep inked — five
copies of a four-period reel — and no wider: it grows with `--music-staff-space`
and stops at the width whose every rule carries ink at every instant of the loop.

## Sizing and tokens

```
--music-staff-space        the one size knob (default 0.5rem)
--music-staff-ink          follows the host's foreground by default
--music-staff-accent       the blue-pencil editorial line
--music-staff-folio        cream tint carried into the glass rung
--music-staff-loop-duration
```

None of the five is declared on `.music-staff`: each is read where it is
consumed, with the default as its `var()` fallback. So any of them can be set on
an ancestor — the wrapper idiom the library uses everywhere — and it reaches the
mark. An element declaration would beat that ancestor value, which is why the
component never writes one.

`material="folio"` biases the library's resting glass rung cream through its own
tint seam, at a strength inside the ladder's translucent bound: the folio is
glass carrying a paper hue, not an opaque plate asserting glass, and its grain is
the rung's own. `material="bare"` drops the rung. The ink follows the host's
foreground in both, so the notation reads in either colour mode.

## Accessibility

Score instances are one labelled image whose name carries pitch and rhythm.
Loading instances are a progressbar with `aria-busy`; an indeterminate one omits
`aria-valuenow`, which is the ARIA contract for "unknown". `decorative` removes
the staff from the accessibility tree and from focus.

## MIDI boundary

`noteEventsFromParsedMidi()` accepts the structural result of Tone.js `Midi` or
any other SMF reader and converts ticks to beats once (`ticks / ppq`). Parser
choice, and its version, stay outside the package.

## Out of scope

Key signatures, chord accidental stacking, second-interval notehead offsetting,
multi-voice layout, and page-level line breaking. This is a quotation staff and
a loading surface, not an engraving engine.

Clef, flag, and accidental outlines are hand-authored to SMuFL-conformant
extents; the gates in `tests/components/music-staff.geometry.test.ts` are the
contract they answer to.
