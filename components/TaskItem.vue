<template>
  <v-list-item>
    <v-list-item-action>
      <v-btn icon>
        <v-icon>radio_button_unchecked</v-icon>
      </v-btn>
    </v-list-item-action>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-list-item-content v-on="on">
          <v-list-item-title>{{ task.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ task.content }}</v-list-item-subtitle>
        </v-list-item-content>
      </template>
      <TaskEditor :task="task" @save="updateTask" @close="closeDialog" />
    </v-dialog>
    <v-list-item-action>
      <v-btn @click="deleteTask" icon>
        <v-icon>delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { updateTodo, deleteTodo } from '@/src/graphql/mutations'
import TaskEditor from '~/components/TaskEditor'
export default {
  components: { TaskEditor },
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    dialog: false
  }),
  methods: {
    /*
     * ダイアログを閉じる
     */
    closeDialog() {
      this.dialog = false
    },
    /**
     * タスク内容を更新する
     */
    updateTask(data) {
      API.graphql(graphqlOperation(updateTodo, { input: data }))
      this.closeDialog()
    },
    /*
     * クリックしたタスクを削除する
     */
    deleteTask() {
      API.graphql(graphqlOperation(deleteTodo, {
        input: {
          id: this.task.id
        }
      }))
    }
  }
}
</script>
