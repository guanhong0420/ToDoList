<template>
  <div id="app">
    <div id="nav">
      <div id="title">My ToDoList</div>
      <router-link to="/all">全部</router-link> |
      <router-link to="/active">未完成</router-link>|
      <router-link to="/complete">已完成</router-link>
    </div>
    <TodoInput />
    <div id="list">
      <TodoListItem  v-for="index in todoIndex" :key="index"  :index="index"/>
                <!--key讓vue知道是不同組件例如:動畫.. 後面index是真的資料-->
    </div>
  </div>
</template>

<script>
import TodoInput from '@/components/TodoInput/index.vue'//@代表src底下目錄
import TodoListItem from '@/components/TodoListItem/index.vue'
export default {
  components:{
    TodoInput,
    TodoListItem
  },
  computed: {
    todoIndex(){
      return this.$store.getters['todoIndex']
    }
  },
  mounted() {
    this.$store.dispatch('INIT_TODOS')
  }
}
</script>

<style src="@/components/TodoInput/style.css"></style>
