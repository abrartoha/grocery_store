<script>

import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'


export default {
  components: {
    'nav-comp': Nav,
    'footer-comp': Footer,
  },
}  
    
</script>

<template>
  <nav-comp/>
  <router-view></router-view>
  <footer-comp/>
</template>

<style scoped>
</style>
