// state
export const state = () => ({
  todoList: [],
})

//mutaions
export const mutations = {
  addTodoList(state: any, payload: any) {
    state.todoList.push(payload)
  },
}
