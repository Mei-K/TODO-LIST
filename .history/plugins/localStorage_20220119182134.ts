import createPersistedState from 'vuex-persistedstate'

export default ({ store }: any) => {
  createPersistedState({
    key: 'vuex',
    //pathsの中身は、保存したいstateを記述
    paths: ['todo.todoList'],
    //保存先
    storage: window.localStorage,
  })(store)
}
