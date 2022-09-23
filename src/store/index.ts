import { createStore } from 'vuex'
import AuthService from '@/services/Auth'
import UserService from '@/services/User'
import { IUser } from '@/models/IUser'
import axios from 'axios'

export default createStore({
  state: {
    isAuth: false,
    user: {} as IUser,
  },
  getters: {
    USERS: (state) => state.user,
  },
  mutations: {
    setAuth(state, payload: boolean) {
      state.isAuth = payload
    },
    setUser(state, payload: IUser) {
      state.user = payload
    },
  },
  actions: {
    // eslint-disable-next-line consistent-return
    async login({ commit }, payload: { email: string; password: string }) {
      try {
        const response = await AuthService.login(payload.email, payload.password)
        localStorage.setItem('token', response.data.accessesToken)
        commit('setAuth', true)
        commit('setUser', response.data.user)
        return response
      } catch (e) {
        return e
      }
    },
    // eslint-disable-next-line consistent-return
    async registration({ commit }, payload: { email: string; password: string }) {
      try {
        const response = await AuthService.registration(payload.email, payload.password)
        localStorage.setItem('token', response.data.accessesToken)
        commit('setAuth', true)
        commit('setUser', response.data.user)
        return response
      } catch (e) {
        return e
      }
    },
    // eslint-disable-next-line consistent-return
    async logout({ commit }) {
      try {
        const response = await AuthService.logout()
        localStorage.removeItem('token')
        commit('setAuth', false)
        commit('setUser', {} as IUser)
        return response
      } catch (e) {
        console.log(e)
      }
    },

    // eslint-disable-next-line consistent-return
    async checkAuth({ commit }) {
      try {
        const response = await axios.get(`http://localhost:8000/api/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessesToken)
        commit('setAuth', true)
        commit('setUser', response.data.user)
        return response
      } catch (e) {
        return e
      }
    },

    async getUsers({ commit }) {
      const response = await UserService.fetchUsers()
      return response
    },
  },
  modules: {},
})
