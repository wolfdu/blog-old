<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="stylus">
  .fade-transition
    transition: opacity .2s ease

  .fade-enter, .fade-leave
    opacity: 0;
</style>
