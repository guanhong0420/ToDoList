<script>
export default {
    data(){
        return{
            todo:''
        }
    },
    methods: {
        submitHandler(){
          if (!this.todo) return //假如沒內容就return
          this.$store.commit('ADD_TODO',{
              content: this.todo,
              complate: false //剛打進去應該還沒完成
          })
          this.todo= '' //送完清掉
        }
    }
}
</script>

<template src="./template.html"></template> 