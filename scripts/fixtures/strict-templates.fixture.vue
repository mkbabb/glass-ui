<script setup lang="ts">
// AU.W3 — proof:strict-templates FIXTURE.
//
// Deliberately passes a BOGUS prop to a glass-ui component. With the
// `vueCompilerOptions.checkUnknownProps` keystone, the unknown prop MUST be a
// typecheck error — `proof:strict-templates` runs vue-tsc over THIS fixture (via
// its own tsconfig) and asserts the diagnostic is emitted. `bogus-prop-does-not-exist`
// is not a `data-*`/`aria-*`/global attribute, so it is the genuine silent-no-op
// class the keystone closes (the AS.W7 dock-bug class), not a fall-through attr.
//
// This file lives under scripts/ — OUTSIDE the main tsconfig include (src/+demo/) —
// so it never breaks `npm run typecheck`. It is only ever compiled by the gate's
// dedicated fixture tsconfig.
import { GlassDock } from "../../src/components/custom/dock";
</script>

<template>
    <GlassDock bogus-prop-does-not-exist="x" />
</template>
