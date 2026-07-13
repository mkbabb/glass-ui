<template>
  <TransitionGroup data-slot="notification"
    name="notification"
    tag="div"
    class="fixed bottom-4 right-4 z-toast flex flex-col gap-2"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="glass-floating feedback-tone flex items-center gap-3 rounded-panel px-4 py-3 text-foreground"
      :class="[
        toneClasses[notification.type],
        'min-w-[300px] max-w-[500px]'
      ]"
    >
      <component
        :is="notificationIcons[notification.type]"
        class="feedback-tone-glyph h-5 w-5 flex-shrink-0"
      />
      <p class="flex-1 text-sm font-medium">
        {{ notification.message }}
      </p>
      <button
        @click="$emit('remove', notification.id)"
        class="rounded-button p-1 transition-colors hover:bg-white/10"
      >
        <X class="h-4 w-4" />
      </button>
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { CheckCircle, XCircle, AlertCircle, Info, X } from "@lucide/vue"

interface Notification {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
  duration?: number
}

defineProps<{
  notifications: Notification[]
}>()

defineEmits<{
  remove: [id: string]
}>()

// BA.W-FEEDBACK-TONE — tone rides ON glass. The prior `bg-<tone>/90` per-type map was
// the SECOND of three independent tone maps — a near-opaque (α 0.9, above the ~0.92
// translucency floor) slab over the `glass-floating` base (the R8-13b flat-green
// defect). It is DELETED. The `type` now maps onto the SAME `.feedback-tone-<name>`
// register Toast consumes (the three-maps-into-one collapse; `error` IS the destructive
// tone) — a tinted-glass wash + tone-keyed rim + full-chroma glyph, the backdrop
// showing through. The body `<p>` stays `--foreground` (legibility); the glyph carries
// the tone via `.feedback-tone-glyph`.
const toneClasses = {
  success: 'feedback-tone-success',
  error: 'feedback-tone-destructive',
  warning: 'feedback-tone-warning',
  info: 'feedback-tone-info',
}

const notificationIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}
</script>

<style scoped>
/* BI.W-REGISTER-TABLE — the notification MATERIALIZES via the `enter-transient`
   register (the CENTER-SEED materialize bloom, MOTION-LADDER M5): scale-from
   --enter-transient-scale, decongest-blur, fade, on the gentle transient spring — the
   SAME register the Toast rides via `.glass-reveal[data-reveal="transient"]`. A
   `<TransitionGroup>` list is NOT a reka-portal data-state surface, so it composes the
   register TOKENS directly in a Vue-<Transition> recipe (ONE register, two binding
   forms). The prior slide-in-from-right is RETIRED (clean break, no alias). The SPATIAL
   scale leg rides the transient spring, the EFFECTS opacity/filter legs the no-overshoot
   --ease-out (the W-MOTION-CANON split); the exit rides the tight --exit-transient clock. */
.notification-enter-active {
  transition:
    opacity var(--enter-transient-clock) var(--ease-out),
    scale var(--enter-transient-clock) var(--enter-transient-spring),
    filter var(--enter-transient-clock) var(--ease-out);
}

.notification-leave-active {
  transition:
    opacity var(--exit-transient-duration) var(--exit-curve),
    scale var(--exit-transient-duration) var(--exit-curve),
    filter var(--exit-transient-duration) var(--exit-curve);
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  scale: var(--enter-transient-scale);
  filter: blur(var(--enter-transient-blur));
}

/* The FLIP reorder (a new notification pushes the stack down) rides the transient
   spring — the same weighty settle as the bloom (SPATIAL transform → spring). */
.notification-move {
  transition: transform var(--enter-transient-clock) var(--enter-transient-spring);
}
</style>
