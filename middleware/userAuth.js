import { useUserStore } from "~/store/userStore"




export default defineNuxtRouteMiddleware((to, _from) => {
  const userStore = useUserStore()

  if (!userStore.isLoggedIn) {
    return navigateTo('/auth/login')
  }
})