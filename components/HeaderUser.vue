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
        >
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>
          {{ UserName }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item class="user-menu-item">
          <amplify-sign-out class="signout-button" />
        </v-list-item>
      </v-list>
    </v-menu>
  </v-layout>
</template>

<style>
  .user-menu-item {
    justify-content: center;
  }
  .signout-button * {
    margin: 0;
  }
</style>

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
