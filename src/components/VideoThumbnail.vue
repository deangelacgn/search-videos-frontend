<template>
  <router-link
    class="video"
    :to="{ name: 'watch', params: { userId: video.user.id, id: video.id } }"
  >
    <div class="inner">
      <div class="unclickable">
        <iframe
          width="200"
          height="150"
          :src="video.embed_url"
          frameborder="0"        
        ></iframe>
      </div>
      <h3 class="mt-2">{{ video.title }}</h3>
      <p class="subtitle mb-0">{{ video.published_date | date }}</p>
      <p class="subtitle">by {{ video.user.username }}</p>
    </div>
  </router-link>
</template>

<style scoped>
.inner {
  position: relative;
}

.unclickable {
  display: flex;
  justify-content: center;
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

.video {
  display: block;

  margin: 1rem 0.25rem;
  padding: 0.5rem 0.8rem;

  color: inherit;
  text-decoration: inherit;
  width: fit-content;

  font-weight: bold;
  background-color: #0C0C0C;
}

.inner {
  display: flex;
  flex-direction: column;
}

img {
  align-self: center;
}

.subtitle {
  font-size: 0.8rem;
  font-weight: 400;
}

.video:hover {
  background-color: #111;
}

.video:visited {
  color: #AAA;
}
</style>

<script>
export default {
  name: 'VideoThumbnail',

  props: ['video'],

  filters: {
    date(value) {
      return new Date(value).toLocaleString()
    }
  }
}
</script>