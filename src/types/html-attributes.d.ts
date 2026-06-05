// Global type augmentation — `data-*` attributes are universally valid on every
// HTML/SVG element (the HTML custom-data-attribute contract), but Vue 3.5's
// `HTMLAttributes`/`SVGAttributes` omit the `data-${string}` index signature. With
// AU.W3's `vueCompilerOptions.checkUnknownProps` keystone, that omission makes
// strict-templates wrongly reject a valid `data-state="open"` on a native `<div>`.
//
// Declaring the index signature here states the TRUE FACT — `data-*` is allowed,
// library-wide — instead of enumerating each native-element site or suppressing it
// per-line (the AU inv-P1 idiomatic-root rule: no `@ts-expect-error`). The genuine
// strict-templates signal (a BOGUS prop on a glass-ui COMPONENT, e.g.
// `<GlassDock bogus-prop>`) is unaffected: component prop checking does not consult
// `HTMLAttributes`, so this augmentation cannot mask a real unknown-prop bug.
import "@vue/runtime-dom";

declare module "@vue/runtime-dom" {
    interface HTMLAttributes {
        [key: `data-${string}`]: unknown;
        // Newer platform attributes not yet in Vue 3.5's `HTMLAttributes` (the
        // Popover/Invoker-Commands/Interest APIs + dialog `closedby`). Valid on
        // native elements; declared so strict-templates accepts them.
        popover?: string | boolean;
        popovertarget?: string;
        popovertargetaction?: string;
        commandfor?: string;
        command?: string;
        closedby?: string;
        interestfor?: string;
    }
    interface SVGAttributes {
        [key: `data-${string}`]: unknown;
    }
}

// `data-*` and `aria-*` attributes fall through ANY Vue component to its rendered
// root (the `$attrs` contract). `ComponentCustomProps` is Vue's designated global
// extension point for props every component accepts — declaring the two prefixes
// here states that fall-through fact, so strict-templates accepts a legitimate
// `<Button aria-label="…">` / `<Primitive :data-size="…">` while still rejecting a
// genuine BOGUS prop (`<GlassDock bogus-prop>` — not `data-`/`aria-` prefixed —
// stays a RED typecheck, the keystone's whole point). Element-SPECIFIC attributes
// (`type`/`disabled`/`placeholder`/…) are deliberately NOT blanket-allowed here —
// those are completed on the specific wrapper's `defineProps` (the genuine signal).
declare module "@vue/runtime-core" {
    interface ComponentCustomProps {
        // Volar checks component attributes in BOTH the kebab (`:data-x` dynamic)
        // and camelCased (`data-testid` → `dataTestid`) forms depending on context,
        // so cover both prefixes. `aria-*` is kept kebab by Volar.
        [key: `data-${string}`]: unknown;
        [key: `data${string}`]: unknown;
        [key: `aria-${string}`]: unknown;
        // The HTML GLOBAL attributes — valid on every element, so they fall
        // through any component to its root. Declaring them here states that
        // universal fact. Element-SPECIFIC attributes (`type`/`disabled`/
        // `placeholder`/`checked`/`required`/`inputmode`) are deliberately NOT
        // here — those are completed on the specific wrapper's `defineProps`
        // (the genuine strict-templates signal: `<Card disabled>` stays RED).
        id?: string;
        title?: string;
        role?: string;
        tabindex?: number | string;
        lang?: string;
        dir?: string;
        hidden?: boolean | "" | "hidden" | "until-found";
        slot?: string;
        draggable?: boolean | "true" | "false";
        spellcheck?: boolean | "true" | "false";
        contenteditable?: boolean | "true" | "false" | "plaintext-only" | "inherit";
        translate?: "yes" | "no";
        enterkeyhint?: string;
        popover?: string | boolean;
        popovertarget?: string;
        commandfor?: string;
    }
}

export {};
