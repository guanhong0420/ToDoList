<script>
export default {
    data(){
        return {
           edit : null
        }
    },
    props:{
        index:{
            type: Number,
            required: true
        }
    },
    computed: {
        todo(){
            return this.$store.state.todos[this.index]
        },
        complate:{//打勾後重新整理還在
            get(){
               return this.todo.complete
            },
            set(val){
               this.$store.commit('UPDATA_TODO',{
                   index:this.index,
                   data:{
                       content:this.todo.content,
                       complete:val
                   }
               })
            }
        }   
    },
    methods: {
        destoryHandler(){
            if(confirm(`是否確認刪除 ${this.todo.content} ?`))
            this.$store.commit('REMOVE_TODO',this.index)
        },
        editHandler(){
            this.edit = this.todo.content
        },
        submitHandler(){
            if(!this.edit) return this.destoryHandler()  //如果空的就不存  還刪除
            this.$store.commit('UPDATA_TODO',{
                   index:this.index,
                   data:{
                       content:this.edit,
                       complate:this.todo.complete
                   }
               })
            this.cancelHandler() //呼叫他改完後清空
        },
        cancelHandler(){
            this.edit = null
        }
    }
}
</script>

<template src="./template.html"></template>