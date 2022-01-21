<template>
  <div class="main">
    <div class="page-title"><h1>TODO LIST</h1></div>
    <!-- ページ上部 nav -->
    <div class="top-container">
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on"><i class="fas fa-plus"></i></v-btn>
        </template>

        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar color="primary"
              ><i class="far fa-edit"></i>TODO</v-toolbar
            >
            <!-- TODO入力欄 -->
            <v-card-text>
              <v-form>
                <v-container>
                  <!-- TODO title -->
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="todoTitle"
                        label="TITLE"
                        clearable
                      ></v-text-field>
                    </v-col>

                    <!-- TODO memo -->
                    <v-col cols="12" sm="6">
                      <v-textarea
                        name="input-7-1"
                        label="MEMO"
                        clearable
                        v-model="todoMemo"
                      ></v-textarea>
                    </v-col>

                    <!-- TODO Date -->
                    <v-col cols="12" sm="6">
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="todoDate"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="todoDate"
                            label="COMPLETE DATE"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="todoDate" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(todoDate)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
              <v-btn text @click="addTodoList()">OK</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <v-btn to="/completeList"><i class="fas fa-check"></i></v-btn>
    </div>
    <!-- top-container 終了 -->

    <!-- TODOリスト表示部分 -->
    <div class="main-container"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Todo = {
  name: string
  memo: string
  date: string
}
export default Vue.extend({
  data() {
    return {
      //モーダルの設定
      modal: false,

      //TODOのname
      todoTitle: '',
      //TODOのmemo
      todoMemo: '',
      //TODOのdate
      todoDate: '',
    }
  },

  methods: {
    addTodoList(): void {
      const TODO: Todo = {
        name: this.todoTitle,
        memo: this.todoMemo,
        date: this.todoDate,
      }
      this.$store.commit('todo/addTodoList', TODO)
    },
  },
})
</script>

<style scoped lang="scss">
.top-container {
  width: 85%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  align-items: center;
  text-align: center;

  .v-btn {
    min-width: 0;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    border-radius: 50%;
    font-size: 1.4rem;
  }
}
</style>
