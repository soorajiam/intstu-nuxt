import { defineStore } from 'pinia'

export const useUserStore = defineStore({
    // unique id of the store across your application
    id: 'user',

    state: () => ({
        isLoggedIn: false,
        user_id: null,
        token: null,
        server_token: null,
        server_user_id: null,
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
        },
        getServerToken: (state) => {
            return state.server_token
        },
        getServerUser: (state) => {
            return state.server_user_id
        }
    },

    actions: {
        login(user_id, token) {
            this.isLoggedIn = true
            this.user_id = user_id
            this.token = token

            //console.log('user_id', user_id)

            localStorage.setItem('user_id', user_id)
            localStorage.setItem('token', token)
        },

        server_login(user_id, token) {
            this.isLoggedIn = true
            this.server_user_id = user_id
            this.server_token = token

            localStorage.setItem('server_user_id', user_id)
            localStorage.setItem('server_token', token)
        },

        logout() {
            this.isLoggedIn = false
            this.user_id = null
            this.token = null
            this.server_user_id = null
            this.server_token = null

            localStorage.removeItem('user_id')
            localStorage.removeItem('token')
            localStorage.removeItem('server_user_id')
            localStorage.removeItem('server_token')


        }
    }
})