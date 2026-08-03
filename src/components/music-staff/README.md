# MusicStaff

`MusicStaff` renders a bounded five-line quotation as deterministic SVG geometry.
It is a display primitive for archive previews, score citations, playback ribbons,
and finite loading moments. It is not a page-layout or full engraving engine.

```vue
<script setup lang="ts">
import { MusicStaff, type MusicStaffNoteEvent } from "@mkbabb/glass-ui/music-staff";

const notes: MusicStaffNoteEvent[] = [
    { id: "theme-1", midi: 64, start: 0, duration: 1 },
    { id: "theme-2", midi: 67, start: 1, duration: 0.5 },
];
</script>

<template>
    <MusicStaff :notes="notes" label="Verified score quotation" :progress="0.4" />
</template>
```

## MIDI boundary

The component accepts MIDI-derived notes and keeps parser choice outside the
package. `noteEventsFromParsedMidi()` accepts the structural result produced by
Tone.js `Midi` or another SMF reader. `noteEventsFromMidi(bytes, parse)` is the
same adapter with an explicit parser function:

```ts
import { Midi } from "@tonejs/midi";
import { noteEventsFromMidi } from "@mkbabb/glass-ui/music-staff";

const notes = noteEventsFromMidi(bytes, (source) => new Midi(source));
```

This keeps an audio application's chosen parser and version out of glass-ui's
root graph. Tracks, ticks, PPQ, velocity, and chromatic spelling survive the
adapter.

## Motion and material

`phase="enter"` draws the five rules, then physically inks clef and note paths.
`phase="rest"` is still. `phase="exit"` performs a short fade-led departure.
There is no resident animation-frame loop. Reduced motion seats the complete
notation immediately.

The default `material="folio"` uses the library's warm cream glass and paper
tokens. `material="bare"` leaves the containing surface to the consumer. The
following public tokens tune magnitude without widening the prop surface:

- `--music-staff-ink`
- `--music-staff-accent`
- `--music-staff-folio`
- `--music-staff-rule-duration`
- `--music-staff-symbol-duration`
- `--music-staff-exit-duration`
- `--music-staff-rule-stagger`

Informative instances expose one image label with a bounded pitch summary.
Arrow keys page an overflowing staff; Home and End move to either edge.
Decorative instances remove focus and are hidden from assistive technology.

## Consumer and release boundary

Scaena currently has three local consumers of its compatibility component:
the work ribbon, blind-adjudication court, and score-quotation atelier. This
package extraction does not make those imports resolve to sibling source.
Scaena remains pinned to `@mkbabb/glass-ui@7.0.0`; it can consume this component
only after a normal glass-ui release includes the `/music-staff` export. Until
then its local component remains the runtime truth.
