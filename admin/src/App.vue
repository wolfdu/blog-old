<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from './vuex/store'
  import {deleteToken} from './vuex/actions/token'

  export default {
    store,
    vuex: {
      actions: {
        deleteToken
      }
    }
  }
</script>

<style lang="stylus">
  .fade-transition
    transition: opacity .2s ease
  .fade-enter, .fade-leave
    opacity: 0;
</style>
