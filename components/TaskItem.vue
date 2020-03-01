<template>
  <v-list-item>
    <v-list-item-action>
      <v-btn @click="taskCompleted" icon>
        <v-icon>{{ computedStatus }}</v-icon>
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
  computed: {
    /**
     * タスクの完了状態によってアイコンを変更
     */
    computedStatus() {
      return this.task.is_completed ? 'radio_button_checked' : 'radio_button_unchecked'
    }
  },
  methods: {
    /**
     * タスクの完了・未完了更新
     */
    taskCompleted() {
      const nowDate = new Date()
      const data = {
        ...this.task,
        is_completed: !this.task.is_completed,
        updated_at: Math.floor(nowDate.getTime() / 1000)
      }
      this.$store.dispatch('tasks/updateTask', data)
    },
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
      this.$store.dispatch('tasks/updateTask', data)
      this.closeDialog()
    },
    /*
     * クリックしたタスクを削除する
     */
    deleteTask() {
      this.$store.dispatch('tasks/deleteTask', { id: this.task.id })
    }
  }
}
</script>
