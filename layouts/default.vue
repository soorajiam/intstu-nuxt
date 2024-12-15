// frontend/layouts/default.vue
<template>
  <div>
  <NavbarPublic />
  <Toast />
    <slot />
    <HomeNewsletter />
    <HomeFooter />
  </div>
</template>

<script lang="ts" setup>
import { useNotificationStore } from '~/store/notificationStore'
import { storeToRefs } from 'pinia'
import { watch, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const notificationStore = useNotificationStore()
const toast = useToast()
const { message, type, show } = storeToRefs(notificationStore)

onMounted(() => {
  watch(
    show,
    (newValue) => {
      if (newValue) {
        toast.add({
          severity: type.value,
          summary: type.value.charAt(0).toUpperCase() + type.value.slice(1),
          detail: message.value,
          life: 3000,
          styleClass: 'custom-toast-message'
        })
        
        setTimeout(() => {
          notificationStore.clearNotification()
        }, 100)
      }
    },
    { immediate: true }
  )
})
</script>

<style>
.p-toast {
  opacity: 1 !important;
}

.p-toast-message {
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.p-toast-message-success {
  background-color: #EDF7ED !important;
  border-left: 6px solid #4CAF50 !important;
  color: #1E4620 !important;
}

.p-toast-message-info {
  background-color: #E3F2FD !important;
  border-left: 6px solid #2196F3 !important;
  color: #0D47A1 !important;
}

.p-toast-message-warn {
  background-color: #FFF3E0 !important;
  border-left: 6px solid #FF9800 !important;
  color: #E65100 !important;
}

.p-toast-message-error {
  background-color: #FFEBEE !important;
  border-left: 6px solid #F44336 !important;
  color: #B71C1C !important;
}

.p-toast-icon-close {
  color: currentColor !important;
  opacity: 0.7;
}

.p-toast-icon-close:hover {
  opacity: 1;
}

.p-toast-message-content {
  padding: 1rem;
  display: flex;
  align-items: center;
}

.p-toast-message-text {
  margin-left: 1rem;
}

.p-toast-summary {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.p-toast-detail {
  margin: 0;
}
</style>