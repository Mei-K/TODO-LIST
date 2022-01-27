import createPersistedState from 'vuex-persistedstate'

export default ({ store }: any) => {
  createPersistedState({
    key: 'vuex',
    //pathsの中身は、保存したstateを記述
    paths: ['todo.todoList', 'todo.cplList'],
    //保存先  ローカルなら: window.localStorage / sessionStorage
    storage: window.localStorage,
  })(store)
}
