import { useUserStore } from "~/store/userStore"




export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()

  if (!user.value) {
    return navigateTo('/auth/login')
  }
})