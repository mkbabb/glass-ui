<template>
  <TransitionGroup
    name="notification"
    tag="div"
    class="fixed bottom-4 right-4 z-toast flex flex-col gap-2"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="flex items-center gap-3 rounded-panel px-4 py-3 shadow-lg [backdrop-filter:var(--glass-blur-wash)]"
      :class="[
        notificationClasses[notification.type],
        'min-w-[300px] max-w-[500px]'
      ]"
    >
      <component
        :is="notificationIcons[notification.type]"
        class="h-5 w-5 flex-shrink-0"
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
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-vue-next'

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

// Status foregrounds: consume the canonical `--{success,destructive,warning,info}-foreground`
// tokens (declared at tokens.css:254-256, 669-671) instead of baking
// `text-white` light-mode glyph colour. The warning rung is dark-on-amber
// — `--warning-foreground` is `hsl(24 10% 10%)` — so the literal `text-white`
// previously misread against the luminous amber plate.
// (Per audit U.W0.C-a §1.4 / §7.2 / §gap.5.)
const notificationClasses = {
  success: 'bg-success/90 text-success-foreground',
  error: 'bg-destructive/90 text-destructive-foreground',
  warning: 'bg-warning/90 text-warning-foreground',
  info: 'bg-info/90 text-info-foreground',
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
