<template>
  <div id="app">
    <router-view transition="fade" transition-mode="out-in"></router-view>
    <Toaster></Toaster>
  </div>
</template>

<script>
  import Toaster from 'components/Toaster.vue'
  import store from './vuex/store'

  export default {
    store,
    components: { Toaster }
  }
</script>

<style lang="stylus">
  .fade-transition
    transition: opacity .2s ease

  .fade-enter, .fade-leave
    opacity: 0;
</style>
