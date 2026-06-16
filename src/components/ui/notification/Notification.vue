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
.notification-enter-active,
.notification-leave-active {
  transition:
    opacity var(--duration-normal) var(--ease-standard),
    transform var(--duration-normal) var(--ease-standard);
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.notification-move {
  transition: transform var(--duration-normal) var(--ease-standard);
}
</style>
