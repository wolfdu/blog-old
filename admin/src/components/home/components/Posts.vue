<template>
  <div>
    <section class="post-list-column">
      <h3 class="page-title">
        <i class="fa fa-linode title-color" aria-hidden="true"></i>文章列表
        <i @click="createDraft" class="fa fa-plus fa-1 post-add" aria-hidden="true"></i>
      </h3>
      <post-list></post-list>
    </section>
    <div class="post-edit">
      <article-editor v-if="null !== currentDraftId"></article-editor>
    </div>
  </div>
</template>

<script>
  import ArticleEditor from 'components/common/ArticleEditor.vue'
  import PostList from 'components/common/PostList.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default{
    data () {
      return {
      }
    },
    components: {
      PostList,
      ArticleEditor
    },
    computed: {
      ...mapGetters([
        'draftSaved',
        'currentDraftId',
        'draftTitleSaved'
      ])
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getAllDraft()
      })
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
  @import '../../../stylus/simplemde.styl'
  @import '../../../stylus/_settings.styl'
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
  .post-edit
    overflow auto
    height 100%

</style>
