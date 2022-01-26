<template>
  <v-tabs fixed-tabs background-color="primary">
    <v-tab to="/">
      <i class="fas fa-home"></i>
      HOME
    </v-tab>

    <v-tab to="/todoList">
      <i class="fas fa-tasks"></i>
      TODO LIST
    </v-tab>
  </v-tabs>
</template>

<script>
export default {}
</script>

<style lang="scss">
.v-tabs {
  flex: 0;
  width: 100%;
}
</style>
