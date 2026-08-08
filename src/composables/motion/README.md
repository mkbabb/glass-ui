# Motion ownership

`@mkbabb/glass-ui/motion` publishes Glass-owned Vue bindings and the semantic
spring register. It does not republish the keyframes.js engine.

```ts
import {
    SPRING_PRESETS,
    springPreset,
    useSpring,
    useLiquidPress,
    useElementMorph,
} from "@mkbabb/glass-ui/motion";
```

Engine primitives come directly from their authority:

```ts
import { NumericAnimation, SpringProgress } from "@mkbabb/keyframes.js";

const preset = springPreset("dock");
const spring = new SpringProgress(preset);
```

There is intentionally no CSS-token-to-JavaScript curve table. CSS recipes read
their `--spring-*` and `--ease-*` tokens; JavaScript consumers read
`SPRING_PRESETS` or import an upstream callable directly.

`@mkbabb/glass-ui/motion-core` contains the engine-free helpers. The published
`@mkbabb/glass-ui/easing` family is the separate authoring boundary: `EasingCurve`
displays a curve and `EasingPicker` authors one, both accessible Vue chrome, while
value.js owns their curve math.

Source leaves are grouped by mechanism under `spring/`, `scroll/`, `number/`,
`reveal/`, `pointer/`, `morph/`, and `core/`. Those directories are internal;
consumers use the two package entries above.

## Motion law

- Spatial motion uses a named spring and its matching
  `--spring-<name>-duration`.
- Effects motion uses `--ease-*`.
- Enters couple spatial motion with a fade; exits never overshoot.
- Reduced motion keeps meaning and final state while dropping spatial travel.

The live `/motion/curve-gallery` route is a Glass motion lab: it exercises the
real preset table, direct keyframes.js playback, the shipped overlay transition
register, and the `/easing` authoring components without mirroring either
upstream catalogue.
