// state
export const state = () => ({
  //TODOリスト
  todoList: [],
  //完了したTODOリスト
  cplList: [],
})

//mutaions
export const mutations = {
  /**
   *TODOリストに追加する.
   * @param state - ステートオブジェクト
   * @param payload - 追加するTODOオブジェクト
   */
  addTodoList(state: any, payload: any): void {
    state.todoList.push(payload)
    console.dir('state.todoList:' + JSON.stringify(state.todoList))
  },

  deleteTodoList(state: any, payload: any) {
    state.todoList.splice(payload, 1)
  },
}

export const getters = {
  /**
   * TODOリスト一覧を取得する.
   * @param state - ステートオブジェクト
   * @returns - TODOリスト一覧
   */
  // getTodoList(state: any) {
  //   return state.todoList
  // },
}
