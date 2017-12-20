<template>
  <div class="main">
    <div class="post-list-column">
      <div class="list-header">
        <h3 class="page-title">
          <i class="fa fa-linode title-color" aria-hidden="true"></i>文章列表
          <i @click="createDraft" class="fa fa-plus fa-1 post-add" aria-hidden="true"></i>
        </h3>
        <div class="show-by-status">
          <select v-model="selected">
            <option v-for="option in options" v-bind:value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="post-list-container">
        <post-list :showByStatus="selected"></post-list>
      </div>
    </div>
    <article-editor v-if="null !== currentDraftId"></article-editor>
  </div>
</template>

<script>
  import ArticleEditor from 'components/common/ArticleEditor.vue'
  import PostList from 'components/common/PostList.vue'
  import { mapGetters, mapActions } from 'vuex'

  export default{
    data () {
      return {
        selected: 'all',
        options: [
          { text: 'all', value: 'all' },
          { text: 'published', value: 'published' },
          { text: 'draft', value: 'draft' }
        ]
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
      ]),
      showPublished () {
        this.showByStatus = 'published'
      },
      showDraft () {
        this.showByStatus = 'draft'
      },
      showAll () {
        this.showByStatus = 'all'
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../stylus/simplemde.styl'
  @import '../../../stylus/_settings.styl'
  .main
    box-sizing border-box
    height 100%
    width 100%
    display flex
    flex 0 1 auto
  .post-list-column
    margin 0
    padding 0
    border-right 1px solid $border
    height 100%
    min-width 300px
    display grid
    grid-template-rows 90px
    box-sizing: border-box
    .list-header
      display inline-block
      height 90px
    .post-list-container
      overflow auto
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

</style>
