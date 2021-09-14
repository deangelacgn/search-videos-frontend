<template>
  <form style="width: 100%" @submit="formSubmitted">
    <v-autocomplete
      class="search"
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="searchTerm"
      color="white"
      hide-no-data
      hide-selected
      label="Search videos"
      item-value="text"
      placeholder="Start typing to search"
      solo
    ></v-autocomplete>
  </form>
</template>

<style scoped>
.search {
  margin: 28px 2rem 0 2rem !important
}
</style>

<script>
import api from '../api'

export default {
  name: 'VideoSearchBar',

  data() {
    const text = (this.$route.query.q || '').trim();

    return {
      isLoading: false,
      items: text ? [{ text }] : [],
      model: text || null,
      searchTerm: text || null,
    }
  },

  mounted() {
    // this.model = this.$route.query.q
  },

  watch: {
    model(value) {
      this.searchVideos(value)
    },

    async searchTerm(value) {
      if (this.isLoading || !value) {
        return
      }

      this.items = []
      this.isLoading = true

      try {
        this.items = await api.autocomplete(value)
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
    },
  },

  methods: {
    formSubmitted(event) {
      event.preventDefault()
      this.searchVideos(this.searchTerm)
    },

    searchVideos(term) {
      this.$router.push({ name: 'search', query: { q: term } });
    }
  }
}
</script>