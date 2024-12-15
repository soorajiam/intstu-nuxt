import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // Initialize state with more robust checks
  const initializeState = () => {
    if (process.client) {
      const storedUserId = localStorage.getItem('user_id')
      const storedToken = localStorage.getItem('token')
      return {
        isLoggedIn: !!(storedUserId && storedToken),
        user_id: storedUserId,
        token: storedToken,
        first_name: localStorage.getItem('first_name'),
        last_name: localStorage.getItem('last_name')
      }
    }
    return {
      isLoggedIn: false,
      user_id: null,
      token: null,
      first_name: null,
      last_name: null
    }
  }

  const state = initializeState()
  
  const isLoggedIn = ref(state.isLoggedIn)
  const user_id = ref(state.user_id)
  const token = ref(state.token)
  const first_name = ref(state.first_name)
  const last_name = ref(state.last_name)

  // getters
  const isLogged = computed(() => isLoggedIn.value)
  const getUser = computed(() => user_id.value)
  const getToken = computed(() => token.value)
  const getFirstName = computed(() => first_name.value)
  const getLastName = computed(() => last_name.value)

  // actions
  async function login(userId, userToken, firstName, lastName) {
    isLoggedIn.value = true
    user_id.value = userId
    token.value = userToken
    first_name.value = firstName
    last_name.value = lastName

    if (process.client) {
      localStorage.setItem('user_id', userId)
      localStorage.setItem('token', userToken)
      localStorage.setItem('first_name', firstName)
      localStorage.setItem('last_name', lastName)
    }
  }

  function logout() {
    console.log('logout')
    isLoggedIn.value = false
    user_id.value = null
    token.value = null
    first_name.value = null
    last_name.value = null

    if (process.client) {
      localStorage.removeItem('user_id')
      localStorage.removeItem('token')
      localStorage.removeItem('first_name')
      localStorage.removeItem('last_name')
    }
  }

  return {
    // state
    isLoggedIn,
    user_id,
    token,
    first_name,
    last_name,
    // getters
    isLogged,
    getUser,
    getToken,
    getFirstName,
    getLastName,
    // actions
    login,
    logout
  }
})