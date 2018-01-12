<template>
  <div :class="['post-toc', 'absolute', {'position-fixed': tocFixed}]"></div>
</template>

<script>
  import 'tocbot/dist/tocbot.css'
  import { mapGetters } from 'vuex'

  export default {
    components: {
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters(['tocVisible', 'tocFixed'])
    }
  }
</script>

<style lang="stylus">

  .post-toc
    height: 100%;
    width: 280px;
    a
      color #2b2b2b
      text-decoration none
    .is-active-link
      font-weight 700
      color #42b983

  .post-toc>.toc-list
    position relative
    overflow hidden
  .position-fixed
    position: fixed !important;
    top: 100px;
  .absolute
    position: absolute;
  .toc-list li
    list-style none

</style>
