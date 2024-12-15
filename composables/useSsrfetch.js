import { useAsyncData } from '#app'
import { useUserStore } from '~/store/userStore'

export const useSsrfetch = (url, options = {}) => {
  const baseURL = import.meta.env.VITE_ROOT_API
  const userStore = useUserStore()

  // Create a new headers object by merging the provided headers with defaults
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),  // Spread provided headers if they exist
  }

  // Add auth headers if user is logged in
  if (userStore.isLogged) {
    headers['bearer'] = userStore.getToken
    headers['user-id'] = userStore.getUser
  }

  // Use Nuxt's useAsyncData with proper fetch call
  return useAsyncData(url, () => 
    $fetch(url, {
      baseURL,
      ...options,
      headers,
    })
  )
}
