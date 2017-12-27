<template>
  <div class="posts-edit">
    <div class="post-list-column">
      <post-list-header></post-list-header>
      <post-list></post-list>
    </div>
    <post-editor></post-editor>
  </div>
</template>

<script>
  import PostEditor from './common/PostEditor.vue'
  import PostList from './common/PostList.vue'
  import PostListHeader from './common/PostListHeader.vue'

  export default{
    components: {
      PostListHeader,
      PostList,
      PostEditor
    }
  }
</script>

<style lang="stylus">
  @import '../../../stylus/simplemde.styl'
  @import '../../../stylus/_settings.styl'
  .post-list-column
    margin 0
    padding 0
    border-right 1px solid $border
    height 100%
    min-width 300px
    width 300px
    display grid
    grid-template-rows 90px
    box-sizing: border-box

  .show-by-status
    box-sizing border-box
    display flex
    flex-direction row-reverse
    select
      border-radius 3px
      margin 3px
  .post-add
    cursor pointer
    float right
    margin-right 10px
    margin-top 2px
    color #42b983
  .title-color
    color #42b983
  .page-title
    color $light
    padding-left 25px
    font-weight 400
    .iconfont
      font-size 22px
      display inline

  .posts-edit
    box-sizing border-box
    height 100%
    width 100%
    display flex
    flex 0 1 auto

</style>
