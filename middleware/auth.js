import { useUserStore } from "~/store/userStore"




export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()
  const localePath = useLocalePath()

  if (!user.value) {
    return navigateTo(localePath('/login'))
  }
})