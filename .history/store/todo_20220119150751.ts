// state
export const state = () => ({
  todoList: [],
})

//mutaions
export const mutations = {
  addTodoList(state: any, payload) {
    state.todoList.push(payload)
  },
}
