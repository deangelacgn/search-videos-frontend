<template>
  <VideoEdit
    title="Upload Video"
    :loading="isLoading"
    :error="error"
    :video="video"
    :edit-url="true"
    @submit="uploadVideo"
  ></VideoEdit>
</template>

<script>
import { mapGetters } from 'vuex'
import api from '../api'
import VideoEdit from '../components/VideoEdit'

export default {
  name: 'Upload',

  components: {
    VideoEdit
  },

  data() {
    return {
      isLoading: false,
      error: '',
      video: {
        title: '',
        url: '',
        description: '',
        transcript: ''
      }
    }
  },

  methods: {
    async uploadVideo() {
      this.error = ''
      this.isLoading = true

      try {
        const video = await api.uploadVideo(this.user.id, this.video)
        this.$router.push({
          name: 'watch',
          params: { userId: this.user.id, id: video.id }
        })
      } catch (error) {
        console.log(error)
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    }
  },

  computed: {
    ...mapGetters(['user'])
  }
}
</script>