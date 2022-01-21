<template>
  <div class="main">
    <h1>TODO LIST</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
interface Todo {
  todo: {
    name: string
    memo: string
    date: string
  }
}
export default Vue.extend({
  data() {
    return {
      //TODOのname
      todoTitle: '',
      //TODOのmemo
      todoMemo: '',
      //TODOのdate
      todoDate: '',
    }
  },

  methods: {},
})
</script>

<style></style>
