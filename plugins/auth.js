import { useUserStore } from '~/store/userStore'

export default defineNuxtPlugin(async (nuxtApp) => {
  const userStore = useUserStore()

  // Check auth status on app initialization
  if (process.client) {
    const token = userStore.getToken
    const userId = userStore.getUser
    console.log('Auth plugin is running')
    if (token && userId && !userStore.isLogged) {
      try {
        // Verify token with backend using useSsrfetch composable
        const { data: response, error } = await useSsrfetch('auth/verify/', {
          method: 'POST',
          headers: {
            'bearer': `${token}`,
            'user-id': `${userId}`
          }
        })
        
        if (error) {
          console.error('Auth plugin verification failed:', error.value)
          await navigateTo('/auth/login')
          return
        }

        // Log the response to debug
        console.log('Auth plugin verify response:', response)

        // Check if response exists and has success flag
        if (response?.success === true) {
          await userStore.login(
            userId,
            token,
            response.data.user.first_name,
            response.data.user.last_name
          )
          return
        } else {
          console.warn('Auth plugin verification failed: Invalid response', response)
          await navigateTo('/auth/login')
        }
      } catch (error) {
        console.error('Session restoration failed:', error)
        await navigateTo('/auth/login')
      }
    }
   
   
  }
})