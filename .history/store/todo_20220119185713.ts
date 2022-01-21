// state
export const state = () => ({
  //TODOリスト
  todoList: [],
  //完了したTODOリスト
  cplList: [],
})

//mutaions
export const mutations = {
  //TODOリスト
  /**
   *TODOリストに追加する.
   * @param state - ステートオブジェクト
   * @param payload - 追加するTODOオブジェクト
   */
  addTodoList(state: any, payload: any): void {
    state.todoList.push(payload)
    console.dir('state.todoList:' + JSON.stringify(state.todoList))
  },
  /**
   * TODOリストから削除する.
   * @param state -ステートオブジェクト
   * @param payload - 削除するTODOのindex
   */
  deleteTodoList(state: any, payload: number) {
    state.todoList.splice(payload, 1)
  },
  /**
   * 完了リストに追加する.
   * @param state - ステートオブジェクト
   * @param payload - 完了したTODOのindex
   * @remarks 完了したTODOを完了リストに追加してTODOリストからは削除する
   */
  addCplList(state: any, payload: number) {
    state.cplList.push(state.todoList[payload])
    state.todoList.splice(payload, 1)
  },
  //完了リストの方
  deleteCplList(state: any, payload: number) {},
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
