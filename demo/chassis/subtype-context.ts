// The demo page-FIELD context.
//
// StoryPage provides its manifest-declared background (the warm field every demo
// floats over) so a nested demo can read "what field am I over?" WITHOUT mounting a
// second GL context (the one-GL-per-route budget). The value is `undefined` outside a
// StoryPage. Demo-private — NOT a library export.

import type { ComputedRef, InjectionKey } from "vue";
import type { StoryBackground } from "./hero/aurora-hero";

export const DEMO_FIELD_KEY: InjectionKey<
    ComputedRef<StoryBackground | undefined>
> = Symbol("glass-ui:demo-field");
