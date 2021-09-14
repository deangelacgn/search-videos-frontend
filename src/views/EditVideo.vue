<template>
  <Spinner v-if="isLoading"></Spinner>
  <VideoEdit
    v-else-if="video !== null"
    title="Upload Video"
    :loading="uploadIsLoading"
    :error="error"
    :video="video"
    :edit-url="false"
    @submit="editVideo"
  ></VideoEdit>
  <div v-else></div>
</template>

<script>
import Spinner from '../components/Spinner.vue'
import VideoEdit from '../components/VideoEdit.vue'
import api from '../api'
import { mapGetters } from 'vuex'

export default {
  name: 'EditVideo',

  components: {
    Spinner,
    VideoEdit
  },

  data() {
    return {
      isLoading: true,
      uploadIsLoading: false,
      error: '',
      video: null
    }
  },

  async mounted() {
    await this.loadVideo()
  },

  methods: {
    async loadVideo() {
      this.isLoading = true

      try {
        const video = await api.getVideo(this.userId, this.videoId)

        if (video.user.id !== this.user.id) {
          this.$router.push({
            name: 'watch',
            params: { userId: video.user.id, id: video.id }
          })
        } else {
          this.video = video
        }
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
    },

    async editVideo() {
      this.error = ''
      this.uploadIsLoading = true

      try {
        await api.editVideo(this.user.id, this.video)
        this.$router.push({
          name: 'watch',
          params: { userId: this.user.id, id: this.video.id }
        })
      } catch (error) {
        this.error = error.message
      } finally {
        this.uploadIsLoading = false
      }
    }
  },

  computed: {
    ...mapGetters(['user']),

    videoId() {
      return this.$route.params.id
    },

    userId() {
      return this.$route.params.userId
    }
  },

  watch: {
    async videoId() {
      await this.loadVideo()
    },

    async userId() {
      await this.loadVideo()
    }
  }
}
</script>