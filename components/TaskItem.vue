<template>
  <v-list-tile>
    <v-list-tile-action>
      <v-btn icon>
        <v-icon>radio_button_unchecked</v-icon>
      </v-btn>
    </v-list-tile-action>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-list-tile-content v-on="on">
          <v-list-tile-title>{{ task.title }}</v-list-tile-title>
          <v-list-tile-subtitle>{{ task.content }}</v-list-tile-subtitle>
        </v-list-tile-content>
      </template>
      <TaskEditor @updated="closeDialog" />
    </v-dialog>
    <v-list-tile-action>
      <v-btn @click="deleteTask" icon>
        <v-icon>delete</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { deleteTodo } from '@/src/graphql/mutations'
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
