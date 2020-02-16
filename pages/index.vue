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
      <v-list two-line>
        <v-list-tile>
          <v-list-tile-action>
            <v-btn icon>
              <v-icon>radio_button_unchecked</v-icon>
            </v-btn>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>テスト</v-list-tile-title>
            <v-list-tile-subtitle>テストです。</v-list-tile-subtitle>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon>
              <v-icon>delete</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-flex>
    <v-btn
      class="mx-2"
      fab
      dark
      fixed
      right
      bottom
      color="indigo"
    >
      <v-icon dark>
        playlist_add
      </v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import { Auth } from 'aws-amplify'

export default {
  middleware: 'auth',
  async asyncData() {
    // ログイン中のユーザー名を取得する
    const user = await Auth.currentAuthenticatedUser()
    return {
      UserName: user.attributes.email
    }
  }
}
</script>
