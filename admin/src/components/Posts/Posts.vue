<template>
  <div class="container-with-aside">
    <nav-side>
    </nav-side>
    <section class="post-list-column">
      <h3 class="page-title"><i class="icon-wenzhang iconfont"></i> 文章列表  <i class="iconfont icon-jiahao post-add" @click=""></i></h3>
    </section>
    <div class="post-edit">
    </div>
  </div>
</template>

<script>
  import NavSide from '../Common/NavSide.vue'

  export default{
    data () {
      return {
      }
    },
    components: {
      NavSide
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/simplemde.styl'
  @import '../../stylus/_settings.styl'
  .container-with-aside
    margin-left 70px
    height 100%
  .post-list-column
    float left
    border-right 1px solid $border
    height 100%
    width 300px
    overflow-y auto
  .post-add
    cursor pointer
    float right
    margin-right 10px
    margin-top 2px
  .page-title
    color $light
    padding-left 25px
    font-weight 400
  .post-edit
    overflow auto
    height 100%

</style>
