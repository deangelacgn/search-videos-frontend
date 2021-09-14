window.alert = () => {}

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import api from './api'


api.onAuthNeeded(async (tries, error) => {
  void(error)
  if (
    store.state.auth.refresh === null ||
    tries >= 2
  ) {
    store.commit('logout')
    await router.push({ name: 'login' })
    return null
  } else if (tries === 0) {
    return store.state.auth.access
  } else if (tries === 1) {
    const refresh = store.state.auth.refresh
    const { access } = await api.refreshCredentials(refresh)
    store.commit('refresh', access)
    return access
  }
})

window.store = store
window.api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')