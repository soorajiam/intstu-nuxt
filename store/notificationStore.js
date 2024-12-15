import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const message = ref('')
  const type = ref('info') // success, info, warn, error  
  const show = ref(false)

  const showNotification = (msg, notifType = 'info') => {
    message.value = msg
    type.value = notifType
    show.value = true

    console.log('showNotification : ', msg, notifType, show.value)
  }

  const clearNotification = () => {
    message.value = ''
    type.value = 'info'
    show.value = false
  }

  // Convenience methods for different notification types
  const success = (msg) => {
    showNotification(msg, 'success')
  }

  const error = (msg) => {
    showNotification(msg, 'error')
  }

  const warning = (msg) => {
    showNotification(msg, 'warn')
  }

  const info = (msg) => {
    showNotification(msg, 'info')
  }

  return {
    message,
    type,
    show,
    showNotification,
    clearNotification,
    success,
    error,
    warning,
    info
  }
})
