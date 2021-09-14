<template>
  <div class="video-infinite-list">
    <div class="items">
      <div class="item" v-for="(video, i) in videos" :key="i">
        <VideoCard
          :video="video"
        ></VideoCard>
      </div>

      <Spinner
        :class="{ 'mt-3': videos.length > 0 }"
        v-if="loading"
      ></Spinner>

      <v-btn
        v-else-if="hasMore && videos.length > 0"
        class="show-more mt-2"
        @click="$emit('show-more')"
      >
        Show More
      </v-btn>

      <p v-else-if="videos.length === 0" class="text-center">
        No results.
      </p>
    </div>
  </div>
</template>

<style scoped>
.video-infinite-list {
  display: flex;
  align-items: center;
  justify-content: center;
}

.items {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  width: 100%;
  max-width: 800px;
}

.show-more {
  align-self: center;
  width: 70%;
}
</style>

<script>
import VideoCard from '../components/VideoCard.vue'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'VideoInfiniteList',

  components: {
    VideoCard,
    Spinner
  },

  props: ['videos', 'loading', 'hasMore'],
}
</script>