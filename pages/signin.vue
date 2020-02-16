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
import { AmplifyEventBus } from 'aws-amplify-vue'
export default {
  layout: 'signin',
  created() {
    // ログインが必要な場合ログイン画面に繊維
    AmplifyEventBus.$on('authState', (info) => {
      if (info === 'signedIn') {
        this.$router.push('/')
      } else if (info === 'signedOut') {
        this.$router.push('/signin')
      }
    })
  }
}
</script>
