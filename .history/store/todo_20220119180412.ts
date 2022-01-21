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
}

export const getters = {
  /**
   *
   * @param state - ステートオブジェクト
   * @returns
   */
  getTodoList(state: any) {
    return state.todoList
  },
}
