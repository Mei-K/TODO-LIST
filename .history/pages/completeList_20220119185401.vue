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
    }
  },

  methods: {
    /**
     * 入力させたTODOをリストに追加する.
     */
    addCplList(i: number) {
      this.$store.commit('todo/addCplList', i)
    },
    /**
     * 完了TODOリストから削除する.
     * @param i - 削除するTODOのindex
     */
    deleteTodoList(i: number) {
      this.$store.commit('todo/deleteTodoList', i)
    },
  },
  computed: {
    /**
     * 完了TODOリストを取得する.
     */
    getTodoList() {
      return this.$store.state.todo.cplList
    },
  },
})
</script>

<style scoped lang="scss">
//ページ上部 ボタンのあるcontainer
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
  }
}
</style>
