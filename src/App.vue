<template>
  <v-app>
    <v-app-bar app dark>
      <router-link class="link" :to="{ name: 'home' }">
        <v-icon large color="blue">mdi-television-classic</v-icon>
      </router-link>

      <VideoSearchBar></VideoSearchBar>
      <UserIcon></UserIcon>
    </v-app-bar>

    <v-main class="main">
      <router-view/>
    </v-main>
  </v-app>
</template>

<style scoped>
.link {
  color: inherit;
  text-decoration: inherit;
}

.main {
  margin-top: 1rem;
  margin-bottom: 4rem;
}
</style>

<script>
import VideoSearchBar from './components/VideoSearchBar.vue'
import UserIcon from './components/UserIcon.vue'

export default {
  name: 'App',

  components: {
    VideoSearchBar,
    UserIcon
  },
}
</script>
