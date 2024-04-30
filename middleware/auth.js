import { useUserStore } from "~/store/userStore"

const userStore = useUserStore()

export default defineNuxtRouteMiddleware((to, from) => {
    // isAuthenticated() is an example method verifying if a user is authenticated
    if(process.client){
      //console.log('middle ware', userStore.isLogged)
      if (userStore.isLogged === false) {
        return navigateTo('/auth/login/')
      }
    }
  })