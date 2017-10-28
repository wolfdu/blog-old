<template>
  <div class="container-with-aside">
    <nav-side></nav-side>
    <div class="ovh">
      <editor></editor>
    </div>
  </div>
</template>
<style lang="stylus">
</style>
<script>
  import NavSide from './common/NavSide.vue'
  import Editor from './common/Editor.vue'

  export default {
    components: {
      NavSide,
      Editor
    },
    data () {
      return {
      }
    }
  }
</script>
