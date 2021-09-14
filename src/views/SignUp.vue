<template>
  <v-card class="mx-auto px-2 pb-2" max-width="500">
    <v-form @submit.prevent="trySignUp" v-model="isFormValid">
      <v-card-title>Sign Up</v-card-title>

      <v-card-text>
        <v-text-field
          label="E-mail"
          name="signup-email"
          v-model="user.email"
          :rules="[rules.required, rules.email]"
        ></v-text-field>

        <v-text-field
          label="Username"
          name="signup-username"
          v-model="user.username"
          :rules="[rules.required]"
        ></v-text-field>

        <PasswordField
          label="Password"
          name="signup-password"
          v-model="user.password"
          :rules="[rules.required]"
        ></PasswordField>

        <PasswordField
          label="Confim password"
          name="signup-passwordconfirm"
          v-model="user.password2"
          :rules="[rules.required, matchPassword]"
        ></PasswordField>

        <v-text-field
          label="First Name"
          name="signup-firstname"
          v-model="user.first_name"
          :rules="[rules.required]"
        ></v-text-field>

        <v-text-field
          label="Last Name"
          name="signup-lastname"
          v-model="user.last_name"
          :rules="[rules.required]"
        ></v-text-field>

        <p class="mt-5">
          <router-link :to="{ name: 'login' }">
            Or log in instead
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
          Sign up
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
      user: {
        email: '',
        username: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
      },

      isFormValid: false,
      isLoading: false,
      error: '',

      rules: {
        required: value => !!value || 'Required',
        email: value =>
          !!value && value.includes('@') || 'Must be a valid e-mail',
        matchPassword:
          value => value === this.password || 'Passwords do not match'
      }
    }
  },

  computed: {
    matchPassword() {
      const message = 'Passwords do not match'
      return this.password === this.passwordConfirm || message
    }
  },

  methods: {
    ...mapActions(['signUp']),

    trySignUp() {
      this.isLoading = true
      this.error = ''

      this.signUp(this.user)
        .then(
          () => this.$router.push({ name: 'home' }),
          error => this.error = error.message,
        )
        .then(() => this.isLoading = false)
    }
  }
}
</script>