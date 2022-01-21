<template>
  <div class="main">
    <div class="page2-form">
      <div class="nav-container">
        <v-btn color="primary" to="/page1"> TODO LIST</v-btn>
      </div>
      <div class="page-container">
        <v-container class="div-card">
          <div class="title"><h2>COMPLETE LIST</h2></div>

          <div class="todo-card-container">
            <v-card
              class="mx-auto"
              v-for="(todo, i) of getTodoList"
              v-bind:key="todo.i"
            >
              <div class="close-btn">
                <v-btn icon v-on:click="deleteTodo(i)">
                  <i class="fas fa-times"></i>
                </v-btn>
              </div>
              <div>
                <v-card-title> {{ todo.name }} </v-card-title>
                <v-card-subtitle
                  >TIME LIMIT
                  <strong> {{ todo.date }} </strong>
                </v-card-subtitle>
              </div>
              <v-card-actions>
                <v-btn
                  elevation="2"
                  color="error"
                  v-on:click="returnTodoList(i)"
                  >RETURN</v-btn
                >

                <v-btn icon @click="show = !show">
                  <v-icon>{{
                    show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                  }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show">
                  <v-divider></v-divider>

                  <v-card-text>
                    {{ todo.memo }}
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </div>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
