<template>
  <div id="app">
    <router-view></router-view>
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
  #app
    height 100%
</style>
