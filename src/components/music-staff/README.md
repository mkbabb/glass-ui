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
behind the reel; `progress` at 1 pauses the transport and seals the score with a
final barline.

## Sizing and tokens

```
--music-staff-space        the one size knob (default 0.5rem)
--music-staff-ink
--music-staff-accent       the blue-pencil editorial line
--music-staff-folio        cream tint injected into the glass rung
--music-staff-loop-duration
```

`material="folio"` tints the library's resting glass rung cream through its own
tint seam. `material="bare"` inherits the host surface's ink and mode.

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
