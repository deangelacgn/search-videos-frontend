<template>
  <v-card class="mx-auto px-2 pb-2" max-width="500">
    <v-form @submit.prevent="tryLogin" v-model="isFormValid">
      <v-card-title>Login</v-card-title>

      <v-card-text>
        <v-text-field
          label="Username"
          name="login-username"
          v-model="username"
          :rules="[rules.required]"
        ></v-text-field>

        <PasswordField
          label="Password"
          name="login-password"
          v-model="password"
          :rules="[rules.required]"
        ></PasswordField>

        <p class="mt-5">
          <router-link :to="{ name: 'sign-up' }">
            Or sign up instead
          </router-link>
        </p>

        <p class="text-center red--text" v-if="error">
          {{ error }}
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          type="submit"
          color="blue darken-3"
          large
          :loading="isLoading"
          :disabled="!isFormValid"
        >
          Log in
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<style scoped>
p:last-child {
  margin-bottom: 0;
}
</style>

<script>
import { mapActions } from 'vuex'
import PasswordField from '../components/PasswordField.vue'

export default {
  name: 'Login',

  components: {
    PasswordField
  },

  data() {
    return {
      username: '',
      password: '',
      isFormValid: false,
      isLoading: false,
      error: '',

      rules: {
        required: value => !!value || 'Required'
      }
    }
  },

  methods: {
    ...mapActions(['login']),

    tryLogin() {
      this.isLoading = true
      this.error = ''

      this.login({
        username: this.username,
        password: this.password
      })
        .then(
          () => this.$router.push({ name: 'home' }),
          error => this.error = error.message,
        )
        .then(() => this.isLoading = false)
    }
  }
}
</script>