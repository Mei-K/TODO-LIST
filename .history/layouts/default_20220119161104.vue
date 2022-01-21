<template>
  <v-app>
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
          xxxxx
          <v-icon>mdi-account-box</v-icon>
        </v-tab>
      </v-tabs>
    </v-card>

    <Nuxt />
  </v-app>
</template>

<script>
export default {}
</script>
