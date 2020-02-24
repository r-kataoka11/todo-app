<template>
  <v-layout
    justify-center
  >
    <v-text-field
      v-model="searchText"
      label="検索"
      single-line
      dense
      solo
      solo-flat
      enclosed="true"
      is-booted="true"
      rounded="true"
      prepend-inner-icon="search"
      align-end
      hide-details
    />
  </v-layout>
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
