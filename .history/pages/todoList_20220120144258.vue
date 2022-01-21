<template>
  <div class="main">
    <!-- TODOリスト表示部分 -->
    <div class="main-container">
      <!-- コルクボード -->
      <div class="cork-board">
        <div class="ribbon"><h1>TODO LIST</h1></div>
        <!-- ページ上部 nav -->
        <div class="top-container">
          <ul>
            <v-dialog transition="dialog-bottom-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <li>
                  <v-btn v-bind="attrs" v-on="on"
                    ><i class="fas fa-plus"></i
                  ></v-btn>
                </li>
              </template>

              <template v-slot:default="dialog">
                <v-card class="todo-modal-container">
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
                                <v-btn
                                  text
                                  color="primary"
                                  @click="modal = false"
                                >
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
                  <v-card-actions>
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                    <v-btn text @click="addTodoList()">OK</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
            <li>
              <v-btn to="/completeList"><i class="fas fa-check"></i></v-btn>
            </li>
          </ul>
        </div>
        <!-- top-container 終了 -->
        <!-- TODOカード ・container-->
        <div class="todo-card-container">
          <!-- <div class="cork-board"> -->
          <v-card
            class="mx-auto"
            v-for="(todo, i) of getTodoList"
            v-bind:key="i"
          >
            <span class="masking-tape"></span>
            <div class="close-btn">
              <v-btn icon @click="deleteTodoList(i)">
                <i class="fas fa-times"></i>
              </v-btn>
            </div>
            <div>
              <v-card-title> {{ todo.name }} </v-card-title>
              <v-card-subtitle
                >by
                <strong> {{ todo.date }}</strong>
              </v-card-subtitle>
            </div>
            <v-card-actions>
              <v-btn elevation="2" color="btncolor" @click="addCplList(i)"
                ><i class="fas fa-check"></i>COMPLETE</v-btn
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
          <!-- </div> -->
        </div>
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
      // errorCheck: false,
    }
  },

  methods: {
    /**
     * 未入力エラーを判断する.
     * @returns エラーの有無 true:未入力あり / false:未入力なし
     */
    errorCheck(): boolean {
      let errorFlag = false

      //未入力チェック
      if (this.todoTitle === '') {
        this.errorMsgTitle = 'タイトルを入力してください'
        errorFlag = true
      } else {
        this.errorMsgTitle = ''
      }

      if (this.todoDate === '') {
        this.errorMsgDate = '日付を選択してください'
        errorFlag = true
      } else {
        this.errorMsgDate = ''
      }

      return errorFlag
    },

    /**
     * 入力させたTODOをリストに追加する.
     */
    addTodoList(): void {
      //未入力エラーがあると処理ストップ
      if (this.errorCheck() === true) {
        return
      }
      //TODOオブジェクト生成
      const TODO: Todo = {
        name: this.todoTitle,
        memo: this.todoMemo,
        date: this.todoDate,
      }
      this.$store.commit('todo/addTodoList', TODO)
      this.todoTitle = ''
      this.todoMemo = ''
      this.todoDate = ''
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
     * @returns - TODOリスト一覧
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
  .row {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }

  .v-card__actions {
    width: 65%;
    justify-content: space-evenly;
    margin: 0 auto;
  }
}

//コルクボード
.cork-board {
  width: 90%;
  min-height: 80vh;
  border: 20px solid #8d6745;
  background: url('/corkboard.png') repeat;
  margin: 2.5rem auto;
}

//リボン

.ribbon {
  width: 35%;
  margin: 1rem auto 0;
  position: relative;
  background-color: rgba(203, 64, 66, 0.9);
  color: #fff;
  line-height: 4rem;
  text-align: center;
}
.ribbon:after,
.ribbon:before {
  display: block;
  content: '';
  position: absolute;
  top: 0;
  border-top: 2rem solid rgba(203, 64, 66, 0.9);
  border-bottom: 2rem solid rgba(203, 64, 66, 0.9);
  border-right: 2rem solid transparent;
  border-left: 2rem solid transparent;
}
.ribbon:after {
  left: -2rem;
}
.ribbon:before {
  right: -2rem;
}

//TODOカードのあるcontainer
.todo-card-container {
  display: flex;
  flex-wrap: wrap;
  text-align: center;

  padding: 1.5rem 2rem 0;

  .v-card {
    width: 28%;
    padding: 0.6rem 0 2rem;
    margin-bottom: 2rem;
    position: relative;
    box-sizing: border-box;
    height: fit-content;

    @include md {
      width: 48%;
    }

    .masking-tape {
      position: absolute;
      top: -1em;
      left: 30%;
      width: 100px;
      height: 30px;
      background-image: linear-gradient(
        -45deg,
        rgba(203, 64, 66, 0.4) 25%,
        transparent 25%,
        transparent 50%,
        rgba(203, 64, 66, 0.4) 50%,
        rgba(203, 64, 66, 0.4) 75%,
        transparent 75%,
        transparent 100%
      );
      background-size: 20px 20px;
      background-size: 20px 20px;
      background-position: 0 0, 20px 20px;
      background-repeat: repeat;
      border-left: 2px dotted rgba(0, 0, 0, 0.1);
      border-right: 2px dotted rgba(0, 0, 0, 0.1);
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      padding: 0.25em 2em;
      background-color: white;
      transform: rotate(-4deg);
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
