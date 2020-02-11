<template>
  <div id="app">

    <screen1 />
    <screen2 v-if="$store.state.name"  />
  </div>
</template>

<script>
import screen1 from './components/screen1.vue'
import screen2 from './components/screen2.vue'

export default {
  name: 'app',
  components: {
    screen1,screen2
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
