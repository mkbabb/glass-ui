// v-reveal — a dependency-free declarative entrance-choreography directive.
//
// It sets two hooks the consumer's own CSS keyframes read:
//   data-reveal  — `"fade"` when used with the `:fade` arg, else `""` (the
//                  default rise entrance). The CSS selects the entrance variant
//                  off this attribute.
//   --d          — the stagger STEP index (a unitless custom property). The CSS
//                  multiplies it by a per-step delay so siblings cascade.
//
// Usage:
//   v-reveal="1"        → rise entrance, step 1
//   v-reveal:fade="6"   → fade entrance, step 6
//
// The directive is a pure DOM writer — `vue` is type-only, so it carries no
// runtime dependency and is root-barrel safe. The consumer owns the CSS that
// reacts to `[data-reveal]` / `--d` (e.g. gating the animation under an
// active-region selector); this directive only writes the hooks.
import type { DirectiveBinding, ObjectDirective } from "vue";

function apply(el: HTMLElement, binding: DirectiveBinding<number>): void {
    el.setAttribute("data-reveal", binding.arg === "fade" ? "fade" : "");
    el.style.setProperty("--d", String(binding.value ?? 0));
}

export const vReveal: ObjectDirective<HTMLElement, number> = {
    mounted: apply,
    updated: apply,
};
