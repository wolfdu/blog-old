<template>
    <div class="sidebar">
      <div class="sidebar-contain">
        <hot-article></hot-article>
        <tags></tags>
      </div>
    </div>
</template>

<script>
  import Tags from './Tags.vue'
  import HotArticle from './HotArticle.vue'

  export default {
    components: {
      Tags,
      HotArticle
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/_settings.styl"
  .sidebar
    padding 1em 0 2em
    border-bottom 1px solid $border
    -webkit-box-flex 1
    -ms-flex 1 1 28.4%
    flex 1 1 28.4%
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
