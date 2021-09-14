<template>
  <div class="watch">
    <div class="spinner" v-if="isLoading">
      <v-progress-circular
        indeterminate
        :size=60
      ></v-progress-circular>
    </div>
    <template v-if="video !== null">
      <iframe
        :width="width"
        :height="width * (9 / 16)"
        :src="video.embed_url"
        frameborder="0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <div class="details">
        <h1 class="d-flex align-center">
          {{ video.title }}
          <v-btn
            v-if="user !== null && user.id === video.user.id"
            class="ml-auto"
            :to="{ name: 'edit', params: { userId: user.id, id: video.id } }"
          >
            Edit
          </v-btn>  
        </h1>
        <p class="subtitle">
          {{ video.published_date | date }} - by
          <router-link :to="{ name: 'channel', params: { userId: video.user.id } }">
            {{ video.user.username }}
          </router-link>
        </p>
        <p>{{ video.description }}</p>
      </div>
      <!-- <div class="details"> -->
        <!-- <p>{{ video.transcript }}</p> -->
      <!-- </div> -->
    </template>
  </div>
</template>

<style scoped>
.watch {
  max-width: 800px;
  margin: auto;
}

.spinner {
  display: flex;
  justify-content: center;
}

.details {
  background-color: #0C0C0C;
  padding: 0.5rem;
}

.subtitle {
  font-size: 0.8rem;
  font-weight: 400;
}

iframe {
  background-color: #000;
}

pre {
  font-family: sans-serif;
}
</style>

<script>
import { mapGetters } from 'vuex'
import api from '../api'

export default {
  name: 'Watch',

  filters: {
    date(value) {
      return new Date(value).toLocaleString()
    }
  },

  data() {
    return {
      width: 800,
      isLoading: true,
      video: null,
    }
  },

  async mounted() {
    await this.loadVideo()
  },

  computed: {
    ...mapGetters(['user']),
    userId() {
      return this.$route.params.userId
    },
    videoId() {
      return this.$route.params.id
    }
  },

  watch: {
    async videoId() {
      await this.loadVideo()
    },
    async userId() {
      await this.loadVideo()
    }
  },

  methods: {
    async loadVideo() {
      this.isLoading = true

      try {
        this.video = await api.getVideo(this.userId, this.videoId)
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>