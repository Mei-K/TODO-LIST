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
                    <v-text-field label="TODO TITLE" required></v-text-field>
                    <!-- v-text-fieldに記入されている文→ :rules="nameRules" -->
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-textarea name="input-7-1" label="MEMO"></v-textarea>
                  </v-col>

                  <!-- 完了日時選択 -->
                  <v-col cols="12" sm="12" md="6">
                    <div class="error-msg">{{ errorMsgDate }}</div>
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="COMPLETE DATE"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker scrollable>
                        <v-btn text color="primary" @click="modal = false">
                          Cancel
                        </v-btn>
                        <v-btn text color="primary"> OK </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                </v-row>
                <!-- 追加/クリア ボタン -->
                <div class="btn-container">
                  <v-btn elevation="2">Clear</v-btn>
                  <v-btn elevation="2">Add</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
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
