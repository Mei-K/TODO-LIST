<template>
  <div class="main">
    <div class="page-title"><h1>TODO LIST</h1></div>
    <!-- ページ上部 nav -->
    <div class="top-container">
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on"><i class="fas fa-plus"></i></v-btn>
        </template>

        <template v-slot:default="dialog" class="todo-modal-container">
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
                      <div class="error-msg">{{ errorMsgTitle }}</div>
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
                      <div class="error-msg">{{ errorMsgDate }}</div>
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
    <div class="main-container">
      <!-- TODOカード -->
      <div class="todo-card-container">
        <v-card class="mx-auto" v-for="(todo, i) of getTodoList" v-bind:key="i">
          <div class="close-btn">
            <v-btn icon @click="deleteTodoList(i)">
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
            <v-btn elevation="2" color="btncolor" @click="addCplList(i)"
              >COMPLETE</v-btn
            >
            <!-- <v-spacer></v-spacer> -->

            <v-btn icon @click="show = !show" class="btn-right">
              <v-icon>{{
                show ? 'mdi-chevron-up' : 'mdi-chevron-down'
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text> {{ todo.memo }} </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

//TODOオブジェクト
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
      show: false,

      //TODOのname
      todoTitle: '',
      //TODOのmemo
      todoMemo: '',
      //TODOのdate
      todoDate: '',

      //タイトル未入力エラーメッセージ
      errorMsgTitle: '',
      //目標日未入力エラーメッセージ
      errorMsgDate: '',
      //未入力チェックフラグ
      errorCheck: false,
    }
  },

  methods: {
    /**
     * 入力させたTODOをリストに追加する.
     */
    addTodoList(): void {
      //TODOオブジェクト生成
      const TODO: Todo = {
        name: this.todoTitle,
        memo: this.todoMemo,
        date: this.todoDate,
      }

      //エラー判断関連の初期化
      this.errorMsgTitle = ''
      this.errorMsgDate = ''
      this.errorCheck = false

      //未入力チェック
      if (this.todoTitle === '') {
        this.errorMsgTitle = 'タイトルを入力してください'
        this.errorCheck = true
      }
      if (this.todoDate === '') {
        this.errorMsgDate = '日付を選択してください'
        this.errorCheck = true
      }

      if (this.errorCheck === true) {
        return
      } else {
        this.$store.commit('todo/addTodoList', TODO)
      }
    },

    /**
     * TODOリストから削除する.
     * @param i - 削除するTODOのindex
     */
    deleteTodoList(i: number) {
      this.$store.commit('todo/deleteTodoList', i)
    },

    /**
     * 完了したTODOを完了リストに追加する.
     */
    addCplList(i: number) {
      this.$store.commit('todo/addCplList', i)
    },
  },
  computed: {
    /**
     * TODOリストを取得する.
     */
    getTodoList() {
      this.$store.commit('todo/todoListByDate')
      return this.$store.state.todo.todoList
    },
  },
})
</script>

<style scoped lang="scss">
//ページ上部 ボタンのあるcontainer
.top-container {
  width: 80%;
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

//TODO入力モーダル
.todo-modal-container {
}

//TODOカードのあるcontainer
.todo-card-container {
  width: 85%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin-top: 2.5rem;
  .v-card {
    width: 30%;
    margin-bottom: 2rem;

    @include md {
      width: 48%;
    }

    .close-btn {
      display: flex;
    }
    .v-card__title {
      display: block;
      padding: 0.5rem 0 0 0;
      font-weight: 800;
      font-size: 2rem;
      @include md {
        font-size: size 1.5rem;
        font-weight: 600;
      }
    }
    .v-card__subtitle {
      padding-top: 1.5rem;
      font-size: 1rem;
      font-weight: 400;
      color: red;
      @include md {
        font-size: size 0.8rem;
      }
      &strong {
        font-weight: 600;
        @include md {
          font-size: size 0.8rem;
        }
      }
    }

    .v-card__actions {
      width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;

      .v-btn {
        margin: 0 auto;
      }
    }
  }
}
</style>
