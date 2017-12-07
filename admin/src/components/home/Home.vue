<template>
    <div class="container-with-aside">
      <nav-side></nav-side>
      <router-view></router-view>
    </div>
</template>

<script>
  import NavSide from './components/NavSide.vue'

  export default {
    components: { NavSide }
  }
</script>

<style lang="stylus">
  .container-with-aside
    margin-left 70px
    height 100%
</style>
