<template>
  <div class="home">
    <Spinner
      v-if="isLoading"
    ></Spinner>
    
    <div v-else class="items">
      <div class="item" v-for="(video, i) in videos" :key="i">
        <VideoThumbnail
          :video="video"
        ></VideoThumbnail>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 90%;
}

.item {
  flex-basis: 25%;
  display: flex;
}

.item > * {
  flex-basis: 100%;
}
</style>

<script>
import VideoThumbnail from '../components/VideoThumbnail.vue';
import Spinner from '../components/Spinner.vue';
import api from '../api'

export default {
  name: 'Home',

  components: {
    VideoThumbnail,
    Spinner
  },

  data() {
    return {
      isLoading: false,
      videos: [],
    }
  },

  async mounted() {
    this.isLoading = true
    
    try {
      this.videos = await api.homepage()
    } catch (error) {
      alert(error.message)
    } finally {
      this.isLoading = false
    }
  },
}
</script>

