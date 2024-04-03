import { useRuntimeConfig } from '#app'

export const useCustomFetch = (url, options = {}) => {
  const config = useRuntimeConfig()
  return $fetch(url, {
    ...options,
    baseURL: "http://127.0.0.1:8001/"
    // baseURL: "https://api.intstu.org/"
  })
}