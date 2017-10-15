<template>
  <div class="container-with-aside">
    <nav-side>
    </nav-side>
    <section class="post-list-column">
      <h3 class="page-title"><icon name="posts-gray" class="iconfont" scale="2"></icon>文章列表  <i @click="createDraft"><icon name="plus" class="iconfont post-add" scale="2"></icon></i></h3>
      <post-list></post-list>
    </section>
    <div class="post-edit">
    </div>
  </div>
</template>

<script>
  import NavSide from '../Common/NavSide.vue'
  import PostList from '../Common/PostList.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default{
    data () {
      return {
      }
    },
    components: {
      NavSide,
      PostList
    },
    computed: {
      ...mapGetters([
        'draftSaved',
        'currentDraftId',
        'draftTitleSaved'
      ])
    },
    methods: {
      ...mapActions([
        'createDraft',
        'getAllDraft'
      ])
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
    .iconfont
      font-size 22px
      display inline
  .post-edit
    overflow auto
    height 100%

</style>
