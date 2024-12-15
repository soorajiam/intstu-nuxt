<template>
  <div>
    <Toast position="top-right" />
    <NavsDashboardNav />

    <div class="min-h-screen">
      <slot />
    </div>

    <footersDashboard />
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast'
import { useNotificationStore } from '~/store/notificationStore'
import Toast from 'primevue/toast'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'

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
          life: 3000
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