import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SearchResults from '../views/SearchResults.vue'
import Watch from '../views/Watch.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Channel from '../views/Channel.vue'
import Upload from '../views/Upload.vue'
import EditVideo from '../views/EditVideo.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: SearchResults
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter(to, from, next) {
      redirectToChannelIfLoggedIn(next)
    }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp,
    beforeEnter(to, from, next) {
      redirectToChannelIfLoggedIn(next)
    }
  },
  {
    path: '/channel/:userId',
    name: 'channel',
    component: Channel
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload,
    beforeEnter(to, from, next) {
      if (store.getters.user === null) {
        next({ name: 'login' })
      } else {
        next()
      }
    }
  },
  {
    path: '/channel/:userId/video/:id',
    name: 'watch',
    component: Watch,
  },
  {
    path: '/channel/:userId/video/:id/edit',
    name: 'edit',
    component: EditVideo
  },
  {
    path: '*',
    beforeEnter(to, from, next) {
      next({ name: 'home' })
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

function redirectToChannelIfLoggedIn(next) {
  const user = store.getters.user

  if (user !== null) {
    next({ name: 'channel', params: { userId: user.id }})
  } else {
    next()
  }
}

export default router
