<template>
  <div class="sidebar">
    <div class="sidebar-contain">
      <hot-posts></hot-posts>
      <tags></tags>
      <div class="fixed-toc"></div>
      <toc v-show="tocVisible"></toc>
    </div>
  </div>
</template>

<script>
  import Tags from './Tags.vue'
  import HotPosts from './HotArticle.vue'
  import Toc from './Toc.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      Tags,
      HotPosts,
      Toc
    },
    computed: {
      ...mapGetters(['tocVisible'])
    }
  }
</script>

<style lang="stylus">
  @import "~src/stylus/_settings.styl"
  .sidebar
    padding 1em 0 2em
    border-bottom 1px solid $border
    -webkit-box-flex 1
    -ms-flex 1 1
    flex 1 1
    padding-left 21.333px
    padding-left 1.5rem
    @media screen and (max-width: 480px)
      &
        display none
    .sidebar-box
      margin-bottom 32px
      margin-bottom 2rem
      background-color hsla(0,0%,100%,.6)
</style>
