<template>
  <div class="main">
    TODO LIST

    <v-form v-model="valid">
      <!-- モーダルの -->
      <v-col cols="auto">
        <v-dialog transition="dialog-bottom-transition" max-width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" to="/cplTodoList" class="pc-display">
              履歴</v-btn
            >
            <v-btn color="primary" v-bind="attrs" v-on="on">
              <i class="fas fa-plus"></i>
            </v-btn>
          </template>

          <template>
            <v-card>
              <v-toolbar color="error">TODO </v-toolbar>
              <v-card-text>
                <!-- <v-container> -->
                <v-row>
                  <v-col cols="12" md="6">
                    <div class="error-msg">{{ errorMsgName }}</div>
                    <v-text-field
                      v-model="todo.name"
                      label="TODO TITLE"
                      required
                    ></v-text-field>
                    <!-- v-text-fieldに記入されている文→ :rules="nameRules" -->
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-textarea
                      name="input-7-1"
                      label="MEMO"
                      v-model="todo.memo"
                    ></v-textarea>
                  </v-col>

                  <!-- 完了日時選択 -->
                  <v-col cols="12" sm="12" md="6">
                    <div class="error-msg">{{ errorMsgDate }}</div>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="todo.date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="todo.date"
                          label="COMPLETE DATE"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="todo.date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog.save(todo.date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
                <!-- 追加/クリア ボタン -->
                <div class="btn-container">
                  <v-btn elevation="2" color="btnclear" v-on:click="clearTodo()"
                    >Clear</v-btn
                  >
                  <v-btn
                    elevation="2"
                    color="btncolor"
                    v-on:click="addTodoList()"
                    >Add</v-btn
                  >
                </div>
                <!-- </v-container> -->
              </v-card-text>
              <!-- <v-card-actions class="justify-end">
                  <v-btn text @click="dialog.value = false">Close</v-btn>
                </v-card-actions> -->
            </v-card>
          </template>
        </v-dialog>
      </v-col>
      <!-- TODO入力欄 -->
      <div class="page-container">
        <!-- ーーーーーーTODO入力らんーーーーーーー -->

        <!-- <v-container> -->
        <!-- <div class="title"><h2>TODO LIST</h2></div> -->

        <!-- やることが0の時 -->
        <!-- <div v-if="getTodoCount === 0">やることがありません</div> -->
        <!-- TODOリスト -->
        <!-- <div v-for="(todo, i) of getTodoList" v-bind:key="todo.i"> -->
        <!-- <div> -->
        <!-- todolist: {{ todo.name }}*{{ todo.memo }}*{{ todo.date }} -->
        <!-- </div> -->
        <!-- <v-btn elevation="2" color="error" v-on:click="deleteTodo(i)" -->
        <!-- >delete</v-btn -->
        <!-- > -->
        <!-- </div> -->
        <!-- </v-container> -->
        <v-container class="div-card">
          <div class="title"><h2>TODO LIST</h2></div>

          <!-- やることが0の時 -->
          <div v-if="getTodoCount === 0">やることがありません</div>

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
                  >TIME LIMIT <br />
                  <strong> {{ todo.date }}</strong>
                </v-card-subtitle>
              </div>
              <v-card-actions>
                <v-btn
                  elevation="2"
                  color="btncolor"
                  v-on:click="addCplTodoList(i)"
                  >COMPLETE</v-btn
                >

                <!-- <v-spacer></v-spacer> -->

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
    </v-form>
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
      name: '',
      memo: '',
      date: '',
    }
  },

  methods: {},
})
</script>

<style></style>
