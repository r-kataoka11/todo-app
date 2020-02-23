<template>
  <v-input>
    <v-text-field v-model="searchText" label="検索" single-line />
  </v-input>
</template>

<script>
export default {
  computed: {
    searchText: {
      get() {
        return this.$store.state.search.searchText
      },
      set(text) {
        this.$store.commit('search/setText', text)
      }
    }
  }
}
</script>
