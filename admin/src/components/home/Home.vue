<template>
    <div class="home">
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
  .home
    height 100%
    width 100%
    display flex
    box-sizing border-box
</style>
