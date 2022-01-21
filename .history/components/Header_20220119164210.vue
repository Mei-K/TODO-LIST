<template>
  <v-tabs fixed-tabs background-color="indigo">
    <v-tab to="/">
      HOME
      <i class="fas fa-home"></i>
    </v-tab>

    <v-tab to="/todoList">
      TODO LIST
      <i class="fas fa-tasks"></i>
    </v-tab>

    <v-tab to="/completeList">
      xxxxx
      <v-icon>mdi-account-box</v-icon>
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
