<template>
  <v-row justify="center" no-gutters>
    <v-col cols="12" sm="8" md="8">
      <v-list>
        <TaskItem v-for="task in tasks" :key="task.taskid" :task="task" />
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
import { API, graphqlOperation } from 'aws-amplify'
import { listTodos } from '@/src/graphql/queries'
import { createTodo } from '@/src/graphql/mutations'
import { onCreateTodo, onUpdateTodo, onDeleteTodo } from '@/src/graphql/subscriptions'
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
  async asyncData() {
    const taskData = await API.graphql(graphqlOperation(listTodos))
    return {
      tasks: taskData.data.listTodos.items
    }
  },
  created() {
    this.subscribe()
  },
  methods: {
    /**
     * 非同期で更新情報を取得
     */
    subscribe() {
      API.graphql(graphqlOperation(onCreateTodo)).subscribe({
        next: (eventData) => {
          this.tasks.push(eventData.value.data.onCreateTodo)
        }
      })
      API.graphql(graphqlOperation(onUpdateTodo)).subscribe({
        next: (eventData) => {
          const updatedTask = eventData.value.data.onUpdateTodo
          this.tasks.some((value, idx) => {
            if (value.id === updatedTask.id) Object.assign(this.tasks[idx], updatedTask)
          })
        }
      })
      API.graphql(graphqlOperation(onDeleteTodo)).subscribe({
        next: (eventData) => {
          const deletedTask = eventData.value.data.onDeleteTodo
          this.tasks.some((value, idx) => {
            if (value.id === deletedTask.id) this.tasks.splice(idx, 1)
          })
        }
      })
    },
    /**
     * タスクを新規登録する
     */
    createTask(data) {
      API.graphql(graphqlOperation(createTodo, { input: data }))
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
