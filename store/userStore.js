import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    // unique id of the store across your application
    id: 'user',

    state: () => ({
        isLoggedIn: false,
        user_id: null,
        token: null
    }),

    getters: {
        isLogged: (state) => {
            return state.isLoggedIn
        },
        getUser: (state) => {
            return state.user_id
        },
        getToken: (state) => {
            return state.token
        }
    },

    actions: {
        login(user_id, token) {
            this.isLoggedIn = true
            this.user_id = user_id
            this.token = token

            console.log('user_id', user_id)

            localStorage.setItem('user_id', user_id)
            localStorage.setItem('token', token)
        },

        logout() {
            this.isLoggedIn = false
            this.user_id = null
            this.token = null

            localStorage.removeItem('user_id')
            localStorage.removeItem('token')
        }
    }
})