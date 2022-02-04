<template>
  <div id="app">
    <!-- <HelloWorld/> -->  
    <AppNavbar />
    <GamePlay />
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import GamePlay from './components/GamePlay.vue'
import AppNavbar from './components/AppNavbar.vue'

export default {
  name: 'App',
  components: {
    HelloWorld, GamePlay, AppNavbar
  },
  mounted() {
    document.title = 'Vue-Mazing!'
  }
}
</script>

<style>
  
</style>
