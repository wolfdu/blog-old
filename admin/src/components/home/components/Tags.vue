<template>
  <div class="tags-edit">
    <div class="tags-list-column">
      <tag-list></tag-list>
      <post-list></post-list>
    </div>
    <post-editor></post-editor>
  </div>
</template>

<script>
import TagList from './common/TagList.vue'
import PostList from './common/PostList.vue'
import PostEditor from './common/PostEditor.vue'

export default{
  components: {
    TagList,
    PostList,
    PostEditor
  }
}
</script>

<style lang="stylus">
  @import '../../../stylus/_settings.styl'
  .tags-edit
    box-sizing border-box
    height 100%
    width 100%
    display flex
    flex 0 1 auto

  .tags-list-column
    margin 0
    padding 0
    border-right 1px solid $border
    height 100%
    min-width 300px
    width 300px
    display grid
    grid-template-rows 150px
    box-sizing: border-box

</style>
