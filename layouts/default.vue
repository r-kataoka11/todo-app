<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-row align="center">
        <v-col cols="3">
          <v-toolbar-title v-text="title" />
        </v-col>
        <v-col cols="6">
          <SearchForm />
        </v-col>
        <v-col cols="3">
          <HeaderUser />
        </v-col>
      </v-row>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import SearchForm from '~/components/SearchForm'
import HeaderUser from '~/components/HeaderUser'
export default {
  components: { SearchForm, HeaderUser },
  data() {
    return {
      clipped: false,
      fixed: false,
      items: [
        {
          icon: 'apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'bubble_chart',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Todo'
    }
  },
  created() {
    // Vuetifyのテーマをダークに設定
    this.$vuetify.theme.dark = true

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
