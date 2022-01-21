<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      centered
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab to="/">
        HOME
        <v-icon>mdi-phone</v-icon>
      </v-tab>

      <v-tab to="/todoList">
        TODO LIST
        <v-icon>mdi-heart</v-icon>
      </v-tab>

      <v-tab to="/completeList">
        xxxxxxx
        <v-icon>mdi-account-box</v-icon>
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {}
</script>

<style></style>
