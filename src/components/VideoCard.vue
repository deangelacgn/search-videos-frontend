<template>
  <router-link
    class="video-card"
    :to="{ name: 'watch', params: { userId: video.user.id, id: video.id } }"
  >
    <div class="unclickable">
      <iframe
        class="image"
        width="200"
        height="150"
        :src="video.embed_url"
        frameborder="0"
      ></iframe>
    </div>
    <div class="video-info">
      <h2 class="title">{{ video.title }}</h2>
      <p class="subtitle">{{ video.published_date | date }} - by {{ video.user.username }}</p>
      <p class="description">{{ video.description }}</p>
    </div>
  </router-link>
</template>

<style scoped>
.video-card {
  position: relative;
}

.unclickable::after {
  position: absolute;
  display: block;
  content: ' ';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.video-card {
  color: inherit;
  text-decoration: inherit;

  display: flex;

  border-radius: 4px;
  background-color: #0C0C0C;
  margin: 0.5rem 0;
  padding: 1rem;
}

.video-card:hover {
  background-color: #111;
}

.image {
  margin-right: 1rem;
}

.subtitle {
  font-size: 0.8rem;
  font-weight: 400;
}

p {
  margin-bottom: 0.5rem;
}
</style>

<script>
export default {
  name: 'VideoCard',
  props: ['video'],

  filters: {
    date(value) {
      return new Date(value).toLocaleString()
    }
  }
}
</script>