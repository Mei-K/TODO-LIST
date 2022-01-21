import Todo from '../pages/todoList.vue'

// state
export const state = () => ({
  todoList: [],
})

//mutaions
export const mutations = {
  addTodoList(state: any, payload: Todo) {
    state.todoList.push(payload)
  },
}
