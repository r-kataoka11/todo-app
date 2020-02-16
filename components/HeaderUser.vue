<template>
  <v-layout
    column
    justify-center
    align-end
  >
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          color="primary"
          dark
          text
          flat
        >
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>
          <v-btn-content>
            {{ UserName }}
          </v-btn-content>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <amplify-sign-out />
        </v-list-item>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<script>
import { Auth } from 'aws-amplify'
export default {
  data() {
    return {
      UserName: ''
    }
  },
  mounted() {
    // ログイン中のユーザー名を取得する
    Auth.currentAuthenticatedUser().then((result) => { this.UserName = result.attributes.email })
  }
}
</script>
