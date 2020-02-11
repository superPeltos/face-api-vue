<template>
  <div class="hello">
    <button @click="increment">+</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    increment(){
      console.log(this.$store.state.count);
      this.$store.commit("increment")
    }
  }
}
</script>

