<template>
  <div class="main">
    <!-- TODOリスト表示部分 -->
    <div class="main-container">
      <!-- コルクボード -->
      <div class="cork-board">
        <div class="ribbon"><h1>COMPLETE LIST</h1></div>
        <!-- ページ上部 nav -->
        <div class="top-container">
          <ul class="btn-container">
            <li>
              <v-btn to="/todoList" class="nav-btn balloonoya"
                ><i class="fas fa-list-ul"></i>
                <span class="balloon">TODO<br />LIST</span>
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
            v-bind:key="todo.i"
          >
            <span class="masking-tape"></span>
            <div class="close-btn">
              <v-btn icon v-on:click="deleteCplTodo(i)">
                <i class="fas fa-times"></i>
              </v-btn>
            </div>
            <div>
              <v-card-title> {{ todo.name }} </v-card-title>
              <v-card-subtitle
                >by
                <strong> {{ todo.date }} </strong>
              </v-card-subtitle>
            </div>
            <v-card-actions>
              <v-btn
                elevation="2"
                v-on:click="returnTodoList(i)"
                class="return-btn"
              >
                RETURN
              </v-btn>
              <v-btn icon @click="show = !show" class="memo-btn">
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
        <!-- ページングボタン -->
        <!-- <div class="paging-container">
          <v-pagination
            v-model="page"
            :length="getNumOfPagesByCplList"
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
      show: false,
      //ページングのdefault表示のページは1
      page: 1,
    }
  },

  methods: {
    /**
     * 完了TODOリストから削除する.
     * @param i - 削除するTODOのindex
     */
    deleteCplTodo(i: number) {
      this.$store.commit('todo/deleteCplList', i)
    },
    returnTodoList(i: number) {
      this.$store.commit('todo/returnTodoList', i)
    },
    /**
     * 完了リストのページ数にあった要素を表示する.
     * @param pageIndex -clickされたページ数
     */
    getPageIndex(pageIndex: number) {
      this.$store.commit('todo/pagingCplList', pageIndex)
    },
  },
  computed: {
    /**
     * 完了TODOリストを取得する.
     */
    getTodoList() {
      return this.$store.getters['todo/getCplList']
      // return this.$store.getters['todo/getPageCplList']
    },
    /**
     * ページ数を取得する. 6/1page
     * @returns ページ数
     */
    // getNumOfPagesByCplList(): number {
    //   return this.$store.getters['todo/getNumOfPagesByCplList']
    // },
  },

  // created() {
  //   //デフォルトで1ページ目のTODO６個を表示
  //   this.getPageIndex(this.page)
  // },
})
</script>

<style scoped lang="scss">
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
  background-color: $kiiro;
  color: #fff;
  line-height: 4rem;
  text-align: center;

  @include md {
    width: 45%;

    h1 {
      font-size: 1.5rem;
    }
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
  border-top: 2rem solid $kiiro;
  border-bottom: 2rem solid $kiiro;
  border-right: 2rem solid transparent;
  border-left: 2rem solid transparent;

  @include sm {
    border-top: 1rem solid $kiiro;
    border-bottom: 1rem solid $kiiro;
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

//ボタンhover
.balloonoya {
  position: relative; /* 指定した分だけ相対的に移動 */
}
.balloonoya:hover .balloon {
  display: inline; /* インライン要素として表示 */
}
.balloon {
  position: absolute; /* 親要素を基準 */
  display: none; /* 要素を非表示 */
  padding: 2px; /* テキストの前後の余白 */
  background-color: rgba(255, 255, 255, 0.6); /* 背景色（透明度） */
  width: 9rem; /* 吹き出し全体の幅 */
  // right: 0%; /* 表示位置 */
  // top: 100%; /* 表示位置 */
  top: 145%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 1rem; /* 表示位置 */
  font-size: 1rem; /* 文字サイズ */

  // :after {
  //   border-bottom: 12px solid rgba(255, 255, 255, 0.62); /* 吹き出し口の高さ・色 */
  //   border-left: 10px solid transparent; /* 吹き出し口の幅１／２ */
  //   border-right: 10px solid transparent; /* 吹き出し口の幅１／２ */
  //   top: -12px; /* 吹き出し口の位置調整 */
  //   left: 5%; /* 吹き出し口の横位置 */
  //   content: ''; /* コンテンツの挿入 */
  //   position: absolute; /* 親要素を基準 */
  // }
}

//TODOカードのあるcontainer
.todo-card-container {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  padding: 1.5rem 2rem 0;

  @include sm {
    padding: 0.5rem 0.2rem 0;
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
      top: -1em;
      left: 30%;
      width: 100px;
      height: 30px;
      background-image: radial-gradient($yellow-clear 30%, transparent 30%),
        radial-gradient($yellow-clear 30%, transparent 30%);
      background-size: 16px 16px;
      background-position: 0 0, 8px 8px;
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
      font-weight: 400;
      color: $aka;
      @include md {
        font-size: size 0.8rem;
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
          // margin: 0;
        }
      }
      .return-btn {
        color: $shiro;
        background-color: $momo;
        @include sm {
          padding: 0.1rem;
        }
      }
    }
  }
}
</style>
