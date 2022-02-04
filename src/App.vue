<template>
  <div id="app">
    <!-- <HelloWorld/> -->
    <GamePlay />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import GamePlay from './components/GamePlay.vue'

export default {
  name: 'App',
  components: {
    HelloWorld, GamePlay
  },
  mounted() {
    document.title = 'Vue-Mazing!'
  }
}
</script>

<style>
</style>
