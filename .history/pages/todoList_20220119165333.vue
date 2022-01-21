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
            <v-toolbar color="primary" dark>Opening from the bottom</v-toolbar>
            <!-- TODO入力欄 -->
            <v-card-text>
              <v-form>
                <v-container>
                  <!-- TODO title -->
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="message1"
                        label="Regular"
                        clearable
                      ></v-text-field>
                    </v-col>

                    <!-- TODO memo -->
                    <v-col></v-col>

                    <!-- TODO Date -->
                    <v-col></v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="dialog.value = false">Close</v-btn>
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
      //TODOのname
      todoTitle: '',
      //TODOのmemo
      todoMemo: '',
      //TODOのdate
      todoDate: '',
    }
  },

  methods: {},
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
