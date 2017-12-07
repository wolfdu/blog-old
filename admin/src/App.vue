<template>
  <div id="app">
    <router-view></router-view>
    <Toaster></Toaster>
  </div>
</template>

<script>
  import Toaster from 'components/common/Toaster.vue'
  import store from './vuex/store'

  export default {
    store,
    components: { Toaster }
  }
</script>

<style lang="stylus">
  .container-with-aside
    margin-left 70px
    height 100%
</style>
