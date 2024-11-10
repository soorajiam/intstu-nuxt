import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: process.client ? !!localStorage.getItem('user_id') : false,
        user_id: process.client ? localStorage.getItem('user_id') || null : null,
        token: process.client ? localStorage.getItem('token') || null : null,
        first_name: process.client ? localStorage.getItem('first_name') || null : null,
        last_name: process.client ? localStorage.getItem('last_name') || null : null
    }),

    getters: {
        isLogged: (state) => state.isLoggedIn,
        getUser: (state) => state.user_id,
        getToken: (state) => state.token,
        getFirstName: (state) => state.first_name,
        getLastName: (state) => state.last_name
    },

    actions: {
        login(userId, userToken, firstName, lastName) {
            this.isLoggedIn = true
            this.user_id = userId
            this.token = userToken
            this.first_name = firstName
            this.last_name = lastName

            if (process.client) {
                localStorage.setItem('user_id', userId)
                localStorage.setItem('token', userToken)
                localStorage.setItem('first_name', firstName)
                localStorage.setItem('last_name', lastName)
            }
        },

        logout() {
            this.isLoggedIn = false
            this.user_id = null
            this.token = null
            this.first_name = null
            this.last_name = null

            if (process.client) {
                localStorage.removeItem('user_id')
                localStorage.removeItem('token')
                localStorage.removeItem('first_name')
                localStorage.removeItem('last_name')
            }
        }
    }
})