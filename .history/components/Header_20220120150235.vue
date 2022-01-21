<template>
  <v-tabs fixed-tabs background-color="indigo">
    <v-tab to="/">
      <i class="fas fa-home"></i>
      HOME
    </v-tab>

    <v-tab to="/todoList">
      <i class="fas fa-tasks"></i>
      TODO LIST
    </v-tab>

    <v-tab to="/completeList">
      <v-icon>mdi-account-box</v-icon>
      xxxxx
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
