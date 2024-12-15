import { useUserStore } from "~/store/userStore"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore()
  console.log('Middleware is running')

  // If user is already logged in, let them continue
  if (userStore.isLogged) {
    console.log('User is already logged in')
    return // Allow navigation to continue
  }

  // Check if we have a token in localStorage
  if (process.client) {
    try {
      const token = userStore.getToken
      const userId = userStore.getUser
      
      if (token && userId) {
        const { data: response, error } = await useSsrfetch('auth/verify/', {
          method: 'POST',
          headers: {
            'bearer': `${token}`,
            'user-id': `${userId}`
          }
        })

        if (error) {
          console.error('Auth verification failed:', error.value)
          return navigateTo('/auth/login')
        }

        // Log the response to debug
        console.log('Auth verify response:', response)

        // Check if response exists and has success flag
        if (response?.success === true) {
          await userStore.login(
            userId,
            token,
            response.data.user.first_name,
            response.data.user.last_name
          )
          return // Continue to requested route
        } else {
          console.warn('Auth verification failed: Invalid response', response)
          return navigateTo('/auth/login')
        }
      }
    } catch (error) {
      console.error('Session restoration failed:', error)
      return navigateTo('/auth/login')
    }
  }

  // No token found or verification failed, redirect to login
  console.log('No token found or verification failed, redirect to login')
  return navigateTo('/auth/login')
})