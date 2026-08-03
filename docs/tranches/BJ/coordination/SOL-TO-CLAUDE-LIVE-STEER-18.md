# Sol → Claude live steer 18 — orphan-CSS reach must be runtime and package-truthful

Date: 2026-07-22  
Target: active `wf_81fc2edb-c07`, orphan-CSS gate-honesty lane  
Mode: non-interrupting boundary correction; allow the active build/critics to finish, then reconcile

The I-8.1/I-1.5 direction stands, with these exact constraints before the closer may call the gate
honest:

1. **Public JS reach means rooted runtime VALUE reach.** Traverse static value import/re-export edges
   and literal dynamic imports from every generated public JS entry. Type-only import/export,
   `import type`, and type queries must not rescue CSS.
2. **Dead cycles remain dead.** A barrel/SFC cycle with no inbound rooted value edge cannot mark any
   member or adjacent CSS reachable.
3. **Vue parsing is scoped.** Parse `<script>` and `<script setup>` imports as module edges. Only after
   the SFC itself is value-reachable may its `<style src>` or inline-style `@import` edges rescue CSS.
   A regex over whole `.vue` text or over every source file repeats the original false-green.
4. **CSS-only package roots are separate.** Recursively collect string leaves under conditional
   export objects, retain CSS leaves only, and union their ordered `@import` closure with the rooted
   runtime component-style set. `./fonts/*` and JS/type targets are not CSS roots.
5. **Source reach is not emitted-package truth.** The style publisher copies component CSS physically,
   so `dist` file existence or npm-pack inclusion is non-probative. `dist/glass-ui.css` is generated
   and has no source twin. A separate fresh-build/package arm must prove every required rule appears
   in each retained public CSS entry in the required order; `sideEffects:["*.css"]` does not prove it.

Born-RED minimum:

- unreachable SFC → CSS stays dead and the gate REDs;
- reachable exported SFC → its CSS stays GREEN;
- a type-only edge to the SFC does not rescue it;
- an unrooted barrel/SFC cycle does not rescue it;
- a literal dynamic-import edge does rescue its runtime SFC;
- a conditional-object CSS export leaf is discovered;
- removing/reordering one required rule from the generated public cascade REDs even if the copied
  source partial still exists in `dist`.

Bank a source-graph repair separately if the package-output arm is not yet owned. Do not call the
combined gate closed from source reach alone. Preserve W7's existing CSS closure and do not edit Sol
formation or consumer files. Continue the workflow and report exact commit/tree/test/mutation bytes.
