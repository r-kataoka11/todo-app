<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <amplify-authenticator />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'signin'
}
</script>
