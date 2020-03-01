<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" sm="8" md="8">
      <v-list>
        <TaskItem v-for="task in taskList" :key="task.taskid" :task="task" />
      </v-list>
      <v-dialog v-model="addDialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
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
        </template>
        <TaskEditor @save="createTask" @close="closeCreateDialog" />
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import TaskItem from '~/components/TaskItem'
import TaskEditor from '~/components/TaskEditor'
export default {
  middleware: 'auth',
  components: { TaskItem, TaskEditor },
  data() {
    return {
      addDialog: false
    }
  },
  computed: {
    taskList() {
      // 検索キーワードがある場合、タイトルと本文にキーワードが含まれているタスクだけを絞り込んで表示する
      if (this.$store.state.search.searchText !== '') {
        const items = this.$store.state.tasks.items
        return items.filter((element) => {
          return ~element.title.indexOf(this.$store.state.search.searchText) || ~element.content.indexOf(this.$store.state.search.searchText)
        })
      }

      return this.$store.state.tasks.items
    }
  },
  created() {
    this.$store.dispatch('tasks/getTaskItem')
    this.$store.dispatch('tasks/getTaskChange')
  },
  methods: {
    /**
     * タスクを新規登録する
     */
    createTask(data) {
      this.$store.dispatch('tasks/createTask', data)
      this.closeCreateDialog()
    },
    /**
     * タスク新規登録ダイアログを閉じる
     */
    closeCreateDialog() {
      this.addDialog = false
    }
  }
}
</script>
