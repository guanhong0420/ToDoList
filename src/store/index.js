import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LS = {
  load() {
    return JSON.parse(localStorage.getItem('vue-todos') || '[]')//一開始沒東西可能是空陣列
  },
  save(data) {//存什麼要給參數
    localStorage.setItem('vue-todos', JSON.stringify(data))//存在這
  }
}

const filter = {
  all(todos) { 
    return todos //把整包todos丟給你  當然在all裡面就回覆整包
  },
  active(todos) {
    return todos.filter(todo => {
      return !todo.complete
    })
  },
  complete(todos) { 
    return todos.filter(todo => {
      return todo.complete
    })
  }
}


export default new Vuex.Store({
  strict:true,
  state: {
    todos: [
      { content: 'todo-content', complete: false },
      { content: 'todo-content', complete: true  },
      { content: 'todo-content', complete: false }
    ]
  },
  getters: {//可以計算state狀態
    todoIndex(state) {
      //找到router.name把todos丟給他            //箭頭函式本身帶有return功能
      return filter[state.route.name](state.todos).map(todo =>
         state.todos.indexOf(todo)//我需要知道位置才是重點,不是整塊東西
      )
    }
  },
  mutations: { //變更狀態用
    SET_TODOS(state, data) {
      state.todos = data //你讀什麼給我我就什麼
      //save LS
      LS.save(state.todos)
    },
    ADD_TODO(state, data) {//這次功能沒做在後端 所以做在mutations也是可以
      state.todos.push(data) 
      LS.save(state.todos)//丟進去LS下次才有  
    },
    UPDATA_TODO(state, {index,data}) {//要告訴我更新哪個位置和內容
      // state.todos[index] = data 不能直接改陣列資料
      state.todos[index].complete = data.complete
      state.todos[index].content = data.content
      LS.save(state.todos)
    },
    REMOVE_TODO(state, index) {//告訴我刪除哪個位置就好
      state.todos.splice(index, 1)
      LS.save(state.todos)
    }
  },
  actions: { //打API或者讀store資料用,打API需要json檔還有安裝axios
    INIT_TODOS({commit}) {
      //load localstroge(LS)
      commit('SET_TODOS',LS.load())//去把內容讀回來
    }
  },
  modules: {
  }
})
