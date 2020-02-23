import { API, graphqlOperation } from 'aws-amplify'
import { listTodos } from '@/src/graphql/queries'

export const state = () => ({
  items: []
})

export const mutations = {
  /**
   * タスク一覧をセットする
   * @param {Object} taskList タスク一覧
   */
  setItems(state, taskList) {
    state.items = [...taskList]
  },
  /**
   * タスクを追加する
   * @param {Object} task タスク（1件）
   */
  add(state, task) {
    state.items.push(task)
  },
  /**
   * タスクを削除する
   * @param {String} id 削除するID（DynamoDB）
   */
  remove(state, id) {
    state.items.some((value, idx) => {
      if (value.id === id) state.items.splice(idx, 1)
    })
  },
  /**
   * タスクの内容を更新する
   * @param {Object} task マージするタスク（1件）
   */
  update(state, task) {
    state.items.some((value, idx) => {
      if (value.id === task.id) Object.assign(state.items[idx], task)
    })
  }
}

export const actions = {
  /**
   * タスク一覧を取得
   */
  async getTaskItem({ commit }) {
    const taskData = await API.graphql(graphqlOperation(listTodos))
    commit('setItems', taskData.data.listTodos.items)
  },
  /**
   * タスクを追加する
   * @param {Object} task タスク（1件）
   */
  addTask({ commit }, task) {
    commit('add', task)
  },
  /**
   * タスクを削除する
   * @param {String} id 削除するID（DynamoDB）
   */
  removeTask({ commit }, id) {
    commit('remove', id)
  },
  /**
   * タスクの内容を更新する
   * @param {Object} task マージするタスク（1件）
   */
  updateTask({ commit }, task) {
    commit('update', task)
  }
}
