<template>
  <VideoInfiniteList
    :videos="videos"
    :loading="isLoading"
    :has-more="hasMore"
    @show-more="showMore"
  ></VideoInfiniteList>
</template>

<style scoped>
</style>

<script>
import api from '../api'
import VideoInfiniteList from '../components/VideoInfiniteList.vue'

export default {
  name: 'SearchResults',

  components: {
    VideoInfiniteList
  },

  data() {
    return {
      isLoading: true,
      hasMore: true,
      videos: [],
    }
  },

  methods: {
    async search(offset = 0, count = 5) {
      this.isLoading = true

      try {
        const result = await api.searchVideos(this.searchTerm, offset, count)

        if (result.length === 0) {
          this.hasMore = false
        }

        this.videos.push(...result)
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
    },

    showMore() {
      this.search(this.videos.length)
    }
  },

  mounted() {
    this.search()
  },

  computed: {
    searchTerm() {
      return this.$route.query.q;
    }
  },

  watch: {
    searchTerm() {
      this.videos = []
      this.search()
    }
  }
}
</script>