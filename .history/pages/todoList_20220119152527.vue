<template>
  <div class="main">TODO LIST</div>
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
      name: '',
      memo: '',
      date: '',
    }
  },

  methods: {},
})
</script>

<style></style>
