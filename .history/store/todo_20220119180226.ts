// state
export const state = () => ({
  //TODOリスト
  todoList: [],
})

//mutaions
export const mutations = {
  addTodoList(state: any, payload: any) {
    state.todoList.push(payload)
    console.dir('state.todoList:' + JSON.stringify(state.todoList))
  },
}

export const getters = {
  getTodoList(state: any) {
    return state.todoList
  },
}
