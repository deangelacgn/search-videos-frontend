import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state() {
    return {
      auth: authFromLocalStorage()
    }
  },
  getters: {
    user(state) {
      return state.auth.user
    }
  },
  mutations: {
    authFromLocalStorage(state) {
      if (localStorage.getItem('auth') === null) {
        return
      }

      try {
        const data = JSON.parse(localStorage.getItem('auth'))
        state.auth = data
      } catch (error) {
        console.error(error)
      }
    },
    authenticate(state, auth) {
      localStorage.setItem('auth', JSON.stringify(auth))
      state.auth = auth
    },
    refresh(state, access) {
      state.auth.access = access
      localStorage.setItem('auth', JSON.stringify(state.auth))
    },
    logout(state) {
      localStorage.removeItem('auth')

      state.auth = {
        user: null,
        refresh: null,
        access: null,
      }
    }
  },
  actions: {
    async login(context, { username, password }) {
      const result = await api.login(username, password)
      context.commit('authenticate', result)
    },

    async signUp(context, data) {
      const result = await api.signUp(data)
      context.commit('authenticate', result)
    }
  }
})

function authFromLocalStorage() {
  const guest = {
    user: null,
    access: null,
    refresh: null
  }

  if (localStorage.getItem('auth') === null) {
    return guest
  }

  try {
    return JSON.parse(localStorage.getItem('auth'))
  } catch (error) {
    console.error(error)
    return guest
  }
}