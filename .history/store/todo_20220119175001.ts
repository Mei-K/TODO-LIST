// state
export const state = () => ({
  todoList: [],
})

//mutaions
export const mutations = {
  addTodoList(state: any, payload: any) {
    state.todoList.push(payload)
    console.dir('state.todoList:' + JSON.stringify(state.todoList))
  },
}

export const getters = {}
