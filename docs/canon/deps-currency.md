# Dependency currency

Runtime packages are peers with one supported major each; do not add `||` straddles,
aliases, bundled duplicates, or hidden fallbacks.

| package | role | current floor |
| --- | --- | --- |
| `vue` | framework | `^3.5` |
| `reka-ui` | headless primitives | `^2.0` |
| `@vueuse/core` | optional dark and event utilities | `^14.0` |
| `tailwindcss` | utility CSS | `^4.0` |
| `embla-carousel-vue` | optional carousel substrate | `^8.0` |
| `@lucide/vue` | icons | `^1.16.0` |
| `tw-animate-css` | optional overlay animation utilities | `^1.2.5` |
| `@mkbabb/keyframes.js` | optional motion runtime | `^6.0.0` |
| `@mkbabb/value.js` | optional color and easing capabilities | `^4.0.0` |
| `@mkbabb/pencil-boil` | optional hand-mark geometry | `^0.9.2` |

The package manifest is the version authority. Review upstream APIs and packed consumer
behavior before moving a floor. Use SemVer: patch for compatible fixes, minor for
compatible features, and major only for an actual public break.

Glass UI no longer carries a `components.json` shadcn scaffold or a shadcn dependency.
New primitives should begin from their semantic and accessibility requirements, then be
authored into the existing Glass ownership and material system.
