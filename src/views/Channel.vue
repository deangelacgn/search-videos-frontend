<template>
  <div>
    <Spinner v-if="isLoading"></Spinner>
    <v-card v-else class="mx-auto px-3 py-5" max-width="800">
      <h1>{{ user.first_name }} {{ user.last_name }}</h1>
      <p>{{ user.username }}</p>
      <!--
        <v-form @submit.prevent="channelSearch">
          <v-text-field
            class="search-channel ml-auto"
            append-icon="mdi-magnify"
            label="Search this channel..."
          ></v-text-field>
        </v-form>
      -->
      <VideoInfiniteList
        :videos="videos"
        :loading="showMoreLoading"
        :has-more="hasMore"
        @show-more="showMore"
      ></VideoInfiniteList>
    </v-card>
  </div>
</template>

<style scoped>
.search-channel {
  max-width: 400px;
}
</style>

<script>
import api from '../api'
import Spinner from '../components/Spinner.vue'
import VideoInfiniteList from '../components/VideoInfiniteList.vue'

export default {
  name: 'Channel',

  components: {
    Spinner,
    VideoInfiniteList,
  },

  data() {
    return {
      hasMore: true,
      isLoading: true,
      showMoreLoading: false,
      user: null,
      videos: [],
      search: '',
    }
  },

  async mounted() {
    this.loadChannel()
  },

  computed: {
    userId() {
      return this.$route.params.userId
    }
  },

  watch: {
    userId() {
      this.loadChannel()
    }
  },

  methods: {
    async loadChannel() {
      this.isLoading = true

      try {
        [this.user, this.videos] = await Promise.all([
          api.getUser(this.userId),
          api.getUserVideos(this.userId, 0, 5)
        ])
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
    },

    async showMore() {
      this.showMoreLoading = true

      try {
        const videos = await api.getUserVideos(
          this.userId, this.videos.length, 5
        )

        if (videos.length === 0) {
          this.hasMore = false
        }

        this.videos.push(...videos)
      } catch (error) {
        alert(error.message)
      } finally {
        this.showMoreLoading = false
      }
    },
  }
}
</script>