<template>
  <div class="main">
    <!-- TODOリスト表示部分 -->
    <div class="main-container">
      <!-- コルクボード -->
      <div class="cork-board">
        <div class="ribbon"><h1>TODO LIST</h1></div>
        <!-- ページ上部 nav -->
        <div class="top-container">
          <ul class="btn-container">
            <v-dialog transition="dialog-bottom-transition" max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <li>
                  <v-btn v-bind="attrs" v-on="on" class="nav-btn">
                    <i class="fas fa-plus"></i>
                    <span class="balloon-text">ADD<br />TODO</span>
                  </v-btn>
                </li>
              </template>

              <template v-slot:default="dialog">
                <v-card class="todo-modal-container">
                  <v-toolbar>
                    <span class="modal-title">
                      <i class="far fa-edit"></i> TODO
                    </span>
                  </v-toolbar>
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
              <v-btn to="/completeList" class="nav-btn">
                <i class="fas fa-check"></i>
                <span class="balloon-text">COMPLETE<br />LIST</span>
              </v-btn>
            </li>
          </ul>
        </div>
        <!-- top-container 終了 -->
        <!-- TODOカード ・container-->
        <div class="todo-card-container">
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
              <v-btn elevation="2" @click="addCplList(i)" class="cpl-btn">
                <i class="fas fa-check"></i>COMPLETE
              </v-btn>
              <!-- <v-spacer></v-spacer> -->

              <v-btn icon @click="show = !show" class="memo-btn">
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
        <!-- page button -->
        <!-- <div class="paging-container">
          <v-pagination
            v-model="page"
            :length="getNumOfPagesByTodo"
            circle
            @input="getPageIndex"
          ></v-pagination>
        </div> -->
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
      //ページングのdefault表示のページは1
      page: 1,

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
    /**
     * TODOリストのページ数にあった要素を表示する.
     * @param pageIndex -clickされたページ数
     */
    getPageIndex(pageIndex: number) {
      this.$store.commit('todo/pagingTodoList', pageIndex)
    },
  },
  computed: {
    /**
     * TODOリストを取得する.
     * @returns - TODOリスト一覧
     */
    getTodoList() {
      this.$store.commit('todo/todoListByDate')

      return this.$store.getters['todo/getTodoList']
      // return this.$store.getters['todo/getPageTodoList']
    },

    // /**
    //  * ページ数を取得する. 6/1page
    //  * @returns ページ数
    //  */
    // getNumOfPagesByTodo(): number {
    //   return this.$store.getters['todo/getNumOfPagesByTodo']
    // },
  },
  // created() {
  //   //デフォルトで1ページ目のTODO６個を表示
  //   this.getPageIndex(this.page)
  // },
})
</script>

<style scoped lang="scss">
//TODO入力モーダル

.todo-modal-container {
  // .v-dialog {
  //   @include sm {
  //     width: 70%;
  //     margin: 0;
  //   }
  // }
  // @include sm {
  //   width: 70%;
  //   margin: 0;
  // }
  .row {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
  }

  .v-toolbar {
    height: 0;
    background-color: #c97586;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .v-card__actions {
    width: 65%;
    justify-content: space-evenly;
    margin: 0 auto;
    padding-bottom: 1.5rem;
    .v-btn {
      color: $light-brown;
      font-size: 1.2rem;
    }
  }
}
.modal-title {
  font-size: 2rem;
  font-weight: 700;
  color: $chairo;
  margin: 0 auto;
  @include sm {
    font-size: 1.5rem;
    font-weight: 600;
  }
}
.error-msg {
  color: $aka;
}

//コルクボード
.cork-board {
  width: 90%;
  min-height: 85vh;
  // height: 85vh;
  border: 20px solid #8d6745;
  background: url('/corkboard.png') repeat;
  margin: 2.5rem auto;
  @include sm {
    width: 95%;
    height: auto;
    border: 16px solid #8d6745;
  }
}

//リボン タイトル
.ribbon {
  width: 40%;
  margin: 1rem auto 0;
  position: relative;
  background-color: rgba(203, 64, 66, 1);
  color: #fff;
  line-height: 4rem;
  text-align: center;
  @include md {
    width: 45%;
  }
  @include sm {
    width: 45%;

    line-height: 2rem;
    h1 {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
}
.ribbon:after,
.ribbon:before {
  display: block;
  content: '';
  position: absolute;
  top: 0;
  border-top: 2rem solid rgba(203, 64, 66, 1);
  border-bottom: 2rem solid rgba(203, 64, 66, 1);
  border-right: 2rem solid transparent;
  border-left: 2rem solid transparent;

  @include sm {
    border-top: 1rem solid rgba(203, 64, 66, 1);
    border-bottom: 1rem solid rgba(203, 64, 66, 1);
    border-right: 1rem solid transparent;
    border-left: 1rem solid transparent;
  }
}
.ribbon:after {
  left: -2rem;
  @include sm {
    left: -1rem;
  }
}
.ribbon:before {
  right: -2rem;
  @include sm {
    right: -1rem;
  }
}

//ページ上部 ボタンのあるcontainer
.top-container {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  align-items: center;
  text-align: center;
  @include sm {
    width: 100%;
  }
  .nav-btn {
    color: $chairo;
    background-color: $shiro;
    //マウスhoverで文字が出る
    position: relative;
    :hover .balloon-text {
      display: inline; /* インライン要素として表示 */
    }
    .balloon-text {
      position: absolute; /* 親要素を基準 */
      display: none; /* 要素を非表示 */
      padding: 0.2rem; /* テキストの前後の余白 */
      background-color: rgba(255, 255, 255, 0.6); /* 背景色（透明度） */
      width: 4rem; /* 全体の幅 */
      top: 145%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-top: 1rem; /* 表示位置 */
      font-size: 0.8rem; /* 文字サイズ */
      line-height: 1;
      align-items: center;
      text-align: center;
    }
  }
  .v-btn {
    min-width: 0;
    width: 3.2rem;
    height: 3.2rem;
    padding: 0;
    border-radius: 50%;
    font-size: 1.8rem;

    @include sm {
      width: 2.4rem;
      height: 2.4rem;
      font-size: 1.35rem;
    }
  }
  .btn-container {
    display: flex;
    list-style: none;
    padding: 0;
    li:last-child {
      margin-left: 2rem;

      @include sm {
        margin-left: 1rem;
      }
    }
  }
}

//TODOカードのあるcontainer
.todo-card-container {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  padding: 1.5rem 2rem 0;

  @include sm {
    padding: 1rem 0.2rem 0;
  }

  .v-card {
    width: 28%;
    padding: 0.5rem 0;
    margin-bottom: 2rem;
    position: relative;
    box-sizing: border-box;
    height: fit-content;

    @include md {
      width: 48%;
    }
    //マスキングテープ風
    .masking-tape {
      position: absolute;
      top: -1rem;
      left: 30%;
      width: 100px;
      height: 30px;
      background-image: linear-gradient(
        -45deg,
        $momo-clear 25%,
        transparent 25%,
        transparent 50%,
        $momo-clear 50%,
        $momo-clear 75%,
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
      background-color: $shiro;
      transform: rotate(-4deg);

      @include sm {
        top: -0.8rem;
        left: 25%;
        width: 72px;
        height: 24px;
      }
    }

    .close-btn {
      display: flex;
      width: 98%;
      margin: 0 auto;
      .fas {
        color: $brown-clear;
        font-size: 2.5rem;

        @include sm {
          font-size: 1.4rem;
        }
      }
    }
    .v-card__title {
      display: block;
      padding: 0.5rem 0 0 0;
      font-weight: 800;
      font-size: 2rem;
      color: $light-brown;
      // color: #432f2f;

      @include md {
        font-size: size 1.5rem;
        font-weight: 600;
      }
      @include sm {
        font-size: 1.2rem;
        font-weight: 600;
      }
    }
    .v-card__subtitle {
      padding-top: 1.5rem;
      font-size: 1rem;
      font-weight: 500;
      color: $aka;
      @include md {
        font-size: 0.8rem;
      }
      @include sm {
        font-size: 0.7rem;
        padding: 0.5rem 0;
      }
      strong {
        font-size: 1.2rem;
        font-weight: 800;

        @include md {
          font-size: 0.8rem;
        }
      }
    }

    .v-card__actions {
      width: 100%;
      margin: 0 auto;
      padding: 0;
      display: flex;
      justify-content: center;

      .v-btn {
        margin: 0 0 0 auto;

        @include sm {
          font-size: 0.7rem;
          font-weight: 500;
        }
      }
      .memo-btn {
        margin: 0 0 0 25%;
        @include sm {
          margin: 0;
        }
      }
      .cpl-btn {
        color: $shiro;
        background-color: $kiiro;

        @include sm {
          padding: 0.1rem;
        }
      }
    }
  }
}
</style>
