<template>
  <TransitionGroup
    name="notification"
    tag="div"
    class="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
  >
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg backdrop-blur-sm"
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
        class="rounded-md p-1 transition-colors hover:bg-white/10"
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

const notificationClasses = {
  success: 'bg-green-500/90 text-white',
  error: 'bg-red-500/90 text-white',
  warning: 'bg-amber-500/90 text-white',
  info: 'bg-blue-500/90 text-white',
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
  transition: all 0.3s ease;
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
  transition: transform 0.3s ease;
}
</style>
