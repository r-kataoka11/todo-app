<template>
  <v-card>
    <v-card-title>
      <span v-if="isSetTask" class="headline">タスク修正</span>
      <span v-else class="headline">タスク登録</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="editedTask.title" label="タイトル*" hint="タスクのタイトルを入力してください。" required />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="editedTask.content" label="内容*" hint="タスクの内容を入力してください。" required />
          </v-col>
        </v-row>
      </v-container>
      <small>*がついている項目は必須です。</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="close" color="blue darken-1" text>
        Close
      </v-btn>
      <v-btn @click="save" color="blue darken-1" text>
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
      required: false,
      default: function () {
        return {
          title: '',
          content: ''
        }
      }
    }
  },
  data() {
    return {
      editedTask: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    /**
     * 編集タスクが空かどうか調べる
     * @return 空の場合false
     */
    isSetTask() {
      if (this.task.title !== '' && this.task.content !== '') return true
      return false
    }
  },
  created() {
    // フォーム内容を初期化する
    this.resetData()
  },
  methods: {
    /**
     * dataをリセットする
     */
    resetData() {
      this.editedTask.title = this.task.title
      this.editedTask.content = this.task.content
    },
    /**
     * 閉じるボタン
     */
    close() {
      this.resetData()
      this.$emit('close')
    },
    /**
     * 保存ボタン
     */
    save() {
      const nowDate = new Date()
      this.$emit('save', {
        created_at: Math.floor(nowDate.getTime() / 1000),
        is_completed: false,
        ...this.task,
        ...this.editedTask,
        updated_at: Math.floor(nowDate.getTime() / 1000)
      })

      this.resetData()
    }
  }
}
</script>
