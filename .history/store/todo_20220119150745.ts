// state
export const state = () => ({
  todoList: [],
})

//mutaions
export const mutations = {
  addTodoList(state, payload) {
    state.todoList.push(payload)
  },
}
