# O.W4 Lane C — `useToast` disposition decision

**Verdict**: KEEP-with-rationale (Path A).
**Source under review**: `src/components/ui/toast/use-toast.ts`.
**Cross-reference**: Rγ §"top 3 service-boundary inconsistencies" item 1; Rδ §DI-patterns overlap.

## Context

`use-toast.ts` ships a module-scope `ref<ToasterToast[]>([])` plus a
`toastTimeouts: Map<string, ReturnType<typeof setTimeout>>`. The
`useToast()` composable returns a `computed` over the module-scope queue
plus three imperative dispatchers (`toast`, `dismiss`, mutators wired
through a private `dispatch()` reducer).

Every call site to `useToast()` in any component anywhere in the process
shares the same queue. There is no `<Toaster>` root, no `provide()`, no
injection — the queue lives in module scope.

## Path A — KEEP-with-rationale (RECOMMENDED, EXECUTED)

- **shadcn-vue parity**: the shadcn-vue reference implementation uses
  exactly this module-scope-queue shape. Consumers migrating from
  shadcn-vue retain a drop-in compatible API — `import { useToast } from
  "@mkbabb/glass-ui"` matches `import { useToast } from "@/components/ui/
  toast/use-toast"` semantically. This is high-value migration ergonomics.
- **Rδ verification**: no DI-able alternative is cleaner. The toast queue
  is a process-singleton concern (a single user, one screen, one queue);
  injecting it via a `<Toaster>` context buys nothing because the
  `<Toaster>` root is also a process-singleton in practice (consumers
  mount one).
- **Canonical pattern documentation**: per Lane C Fix 3, this shape is
  formalized as the "module-scope process-singleton registries" canonical
  pattern in DESIGN.md alongside `gateRegistry`, sortable `instances`,
  and typewriter `activeTimers`.
- **No source change**: `use-toast.ts` is unchanged at O.W4 close. The
  disposition is doc-only.

## Path B — REFACTOR to DI (NOT EXECUTED; flagged for orchestrator)

Provide a Toaster context via the `<Toaster>` root + `useToast()` injects:

```ts
// Sketch (not implemented):
const ToastQueueKey: InjectionKey<ToastQueue> = Symbol("ToastQueue");

// In <Toaster> setup:
const queue = createToastQueue();
provide(ToastQueueKey, queue);

// In useToast():
function useToast() {
  const queue = inject(ToastQueueKey);
  if (!queue) throw new Error("[useToast] called outside <Toaster> root");
  return queue.facade;
}
```

### Costs of Path B

1. **Breaks shadcn-vue migration path**: consumers' existing call sites
   need a `<Toaster>` mounting check or wrapping; this is a SEMVER-MAJOR
   shape change.
2. **`toast()` standalone function**: the current `use-toast.ts` exports
   a bare `toast(props)` callable (no composable required, no component
   tree). Path B requires either (a) demoting `toast()` to a method on
   the injected facade or (b) routing the bare callable through a
   module-scope ref to the injected queue — re-introducing the
   process-singleton dependency Path B claims to eliminate.
3. **Zero observable benefit at the constellation cohort**: no consumer
   reports queue-state divergence; no test exercises multi-library-copy
   scenarios.

### When Path B becomes warranted

- A consumer ships two glass-ui versions side-by-side and reports queue
  divergence (multi-library-copy edge case).
- A test scenario requires per-suite queue isolation that
  `vi.resetModules()` cannot satisfy.
- A SEMVER-MAJOR cut is on the calendar AND shadcn-vue parity is
  formally retired.

None of these apply at O.W4 close.

## Decision

**KEEP**. Document the pattern as canonical (DESIGN.md "Module-scope
process-singleton registries"). No source change to `use-toast.ts`.

## Orchestrator authorization

User authorization NOT needed for Path A (no source-shape change).
If Path B becomes warranted at a future tranche, the orchestrator
authorizes via an explicit Lane brief — semver-major cut required.

## Cross-cutting alignment

This decision aligns with three other module-scope registries already in
service:

| Subsystem | Registry | Scope assumption |
|---|---|---|
| touch-gate | `gateRegistry` | one library copy / process |
| sortable | `instances` | one library copy / process |
| typewriter | `activeTimers` | one library copy / process |
| useToast | `toasts` + `toastTimeouts` | one library copy / process |

All four are canonical per the new DESIGN.md section.
