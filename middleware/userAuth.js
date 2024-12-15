import { useUserStore } from "~/store/userStore"

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Wrap everything in try/catch to prevent uncaught errors
  try {
    const userStore = useUserStore()

    // If user is already logged in, let them continue
    if (userStore.isLogged) {
      return // Allow navigation to continue
    }

    // Only proceed with token verification on client-side
    if (process.client) {
      const token = userStore.getToken
      const userId = userStore.getUser
      
      if (!token || !userId) {
        return navigateTo('/auth/login')
      }

      const { data: response, error } = await useSsrfetch('auth/verify/', {
        method: 'POST',
        headers: {
          'bearer': token,
          'user-id': userId
        }
      })

      if (error || !response?.success) {
        await userStore.logout() // Clear any invalid session data
        return navigateTo('/auth/login')
      }

      await userStore.login(
        userId,
        token,
        response.data.user.first_name,
        response.data.user.last_name
      )
      return // Continue to requested route
    }

    // Server-side: redirect to login
    return navigateTo('/auth/login')
  } catch (error) {
    console.error('Authentication middleware error:', error)
    return navigateTo('/auth/login')
  }
})