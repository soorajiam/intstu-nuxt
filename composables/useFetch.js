// import { useFetch } from 'nuxt/app'
import { useRuntimeConfig } from '#app'

export const useAPIFetch = (url, options = {}) => {


  // Optionally, retrieve a baseURL from runtime config if it's defined there
  // const baseURL = 'http://127.0.0.1:8000/'
  const baseURL = import.meta.env.VITE_ROOT_API

  // Use Nuxt 3's useFetch with the provided URL, options, and the baseURL
  const { data, error, pending, refresh } = useFetch(baseURL + url, {
    ...options,
    baseURL: baseURL // this line is technically redundant if you're concatenating baseURL with url
  })

  // Return the reactive properties from useFetch along with any additional custom logic you might want to include
  return { data, error, pending, refresh }
}
