<template>
  <v-card class="mx-auto px-2 pb-2" max-width="700">
    <v-form @submit.prevent="$emit('submit', video)" v-model="isFormValid">
      <v-card-title>{{ title }}</v-card-title>

      <v-card-text>
        <v-text-field
          label="Title"
          name="video-title"
          v-model="video.title"
          :rules="[rules.required]"
        ></v-text-field>

        <v-text-field
          label="TED or YouTube URL"
          name="video-url"
          v-model="video.url"
          :rules="[rules.required, rules.isUrl]"
          :disabled="!editUrl"
        ></v-text-field>

        <v-textarea
          label="Description"
          name="video-description"
          outlined
          v-model="video.description"
          :rules="[rules.required]"
        ></v-textarea>

        <v-textarea
          label="Transcript"
          name="video-description"
          outlined
          v-model="video.transcript"
          :rules="[rules.required]"
        ></v-textarea>

        <p class="text-center red--text" v-if="error">
          {{ error }}
        </p>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            type="submit"
            color="blue darken-3"
            large
            :loading="loading"
            :disabled="!isFormValid"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'VideoEdit',

  props: ['title', 'loading', 'error', 'video', 'edit-url'],

  data() {
    return {
      isFormValid: true,
      rules: {
        required: value => !!value || 'Required',
        isUrl: value =>
          value.startsWith('http://') ||
          value.startsWith('https://') ||
          'Must be a valid URL'
      }
    }
  },
}
</script>
