export const state = () => ({
  searchText: ''
})

export const mutations = {
  /**
   * 検索文字列を登録する
   * @param {String} text 更新するテキスト
   */
  setText(state, text) {
    state.searchText = text
  }
}
