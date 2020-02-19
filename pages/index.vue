<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-list two-line>
        <TaskItem v-for="task in tasks" :key="task.taskid" :task="task" />
      </v-list>
    </v-flex>
    <v-btn
      @click="addTask"
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
  </v-layout>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { listTodos } from '@/src/graphql/queries'
import { createTodo } from '@/src/graphql/mutations'
import TaskItem from '~/components/TaskItem'
const crypto = require('crypto')
export default {
  middleware: 'auth',
  components: { TaskItem },
  async asyncData() {
    const taskData = await API.graphql(graphqlOperation(listTodos))
    return {
      tasks: taskData.data.listTodos.items
    }
  },
  methods: {
    addTask() {
      const nowDate = new Date()
      API.graphql(graphqlOperation(createTodo, {
        input: {
          taskid: crypto.randomBytes(10).toString('hex'),
          title: 'テスト',
          content: 'テストです',
          is_completed: false,
          created_at: Math.floor(nowDate.getTime() / 1000),
          updated_at: Math.floor(nowDate.getTime() / 1000)
        }
      }))
    }
  }
}
</script>
