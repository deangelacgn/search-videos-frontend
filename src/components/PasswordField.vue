<template>
  <v-text-field
    v-bind="$attrs"
    v-on="$listeners"
    :type="showPassword ? 'text' : 'password'"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="showPassword = !showPassword"
  ></v-text-field>
</template>

<script>
export default {
  name: 'PasswordField',

  data() {
    return {
      showPassword: false
    }
  }
}
</script>