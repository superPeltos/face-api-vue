<template>
    <div class="screen">
        Votre nom est : {{name}}
        <input id="name" type="text" v-model="name">
        <button @click="increment">+</button>
    </div>
</template>

<script>
  export default {
    name: 'screen1',
    data: function () {
      return {
        name: null,
      }
    },
    methods: {
      increment() {
        this.$store.dispatch("setName", {
          name: 'test'
        });
        console.log(this.$store.state.name);
      }
    }
  }
</script>

