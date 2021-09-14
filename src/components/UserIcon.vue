<template>
  <div class="button d-flex justify-center align-center">
    <div class="icon-container pa-1">
      <img
        class="icon"
        src="../assets/guest.jpg"
        width="48"
        height="48"
      >
    </div>
    <v-card v-if="!user" class="menu pa-3">
      <p>You are not logged in</p>
      <v-btn class="w-100 mb-2" :to="{ name: 'login' }">
        Log in
      </v-btn>
      <v-btn class="w-100" :to="{ name: 'sign-up' }">
        Sign up
      </v-btn>
    </v-card>
    <v-card v-else class="menu pa-3">
      <p class="mb-0">{{ user.first_name }} {{ user.last_name }}</p>
      <p class="subtitle">{{ user.username }}</p>
      <v-btn class="w-100 mb-2" :to="{ name: 'channel', params: { userId: user.id } }">
        View Channel
      </v-btn>
      <v-btn class="w-100 mb-2" :to="{ name: 'upload' }">
        Upload a Video
      </v-btn>
      <v-btn class="w-100" @click="doLogout">
        Log Out
      </v-btn>
    </v-card>
  </div>
</template>

<style scoped>
.icon {
  border-radius: 1000px;
}

.button {
  cursor: pointer;
}

.icon-container:hover {
  background-color: #444;
}

.button:not(:hover) .menu {
  display: none;
}

.menu {
  position: absolute;
  top: 100%;
  right: 0;
}

.subtitle {
  font-size: 0.8rem;
  font-weight: 400;
}

.w-100 {
  display: flex;
  width: 100%;
}
</style>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'UserIcon',
  // props: ['user'],

  computed: {
    ...mapGetters(['user'])
  },
  
  methods: {
    ...mapMutations(['logout']),

    doLogout() {
      this.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>