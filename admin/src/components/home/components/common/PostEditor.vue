<template>
  <section :class="{ 'editor-active': !postSaved}" >
    <div :class="{ 'title-active': !postTitleSaved}">
      <input type="text" class="form-control big only-border-bottom" :value="postTitle" @input="updateTitle">
    </div>
    <div>
      <div class="half-container">
        <i class="fa fa-tags fa-2" aria-hidden="true" style="margin-right:5px"></i>
        <span class="tag" v-for="tag in postTags">{{tag['name']}}
          <i class="fa fa-times fa-1 iconfont delete-tag" @click="deletePostTag(tag.id)"></i>
        </span>
        <div class="tag active">
          <span v-show="!tagInput" @click="addTag" ><i class="fa fa-plus fa-1" aria-hidden="true"></i></span>
          <input type="text" class="tag-input" v-show="tagInput" v-model="tagNew" placeholder="回车键提交" @keyup.13="submitTag">
          <ul class="search-list reset-list" v-if="tagInput" v-show="tagsToAdd.length">
            <li class="search-item" v-for="tag in tagsToAdd" v-bind="tag" @click="submitTag">{{tag['name']}}</li>
          </ul>
        </div>
      </div>
      <div class="half-container">
        <button type="button" class="btn btn-save r" @click="publish">发布文章</button>
        <button type="button" class="btn btn-border r" v-show="articleId === null" @click="deletePost">删除草稿</button>
      </div>
    </div>
    <textarea id="editor" style="opacity: 0"></textarea>
  </section>
</template>

<script>
  import SimpleMDE from 'simplemde'
  import {marked} from '../../../../filters/md2Text'
  import { mapGetters, mapActions } from 'vuex'
  import debounce from 'lodash/debounce'
  import trim from 'lodash/trim'
  import tagsApi from 'service/tag.resource'

  const debounceTitleEdit = debounce(function (draftTitle) {
    this.submitPostTitle(draftTitle)
  }, 1000)

  const debouncePostEdit = debounce(function (content) {
    this.submitPostContent(content)
  }, 1000)

  let smde

  export default{
    data () {
      return {
        articleId: null,
        draftPublished: '',
        tagsToAdd: [],
        tagNew: '',
        tagInput: false,
        postLoaded: false
      }
    },
    computed: {
      ...mapGetters([
        'post',
        'postSaved',
        'postTitleSaved',
        'postId',
        'postTitle',
        'postTags'
      ])
    },
    mounted () {
      this.$nextTick(function () {
        smde = new SimpleMDE({
          autoDownloadFontAwesome: false,
          element: document.getElementById('editor'),
          previewRender: function (plainText) {
            return marked(plainText) // Returns HTML from a custom parser
          },
          spellChecker: false
        })
        smde.codemirror.on('change', () => {
          if (!this.postLoaded) {
            this.postLoaded = true
          } else {
            if (this.postSaved) {
              this.editPost()
            }
            debouncePostEdit.call(this, smde.value())
          }
        })
      })
    },
    destroyed () { // 切换router时reset postId 重新渲染editor内容
      this.resetPostId()
    },
    watch: {
      tagNew (val) {
        this.searchTags(val)
      },
      postId () {
        this.postLoaded = false
        this.articleId = this.post.article
        this.$nextTick(function () {
          smde.value(this.post.content)
        })
      }
    },
    methods: {
      ...mapActions([
        'getPost',
        'editPostTitle',
        'submitPostTitle',
        'addPostTag',
        'deletePostTag',
        'publish',
        'editPost',
        'submitPostContent',
        'deletePost',
        'resetPostId',
        'showMsg'
      ]),
      updateTitle (e) {
        let title = e.target.value
        this.editPostTitle(title)
        debounceTitleEdit.call(this, title)
      },
      addTag () {
        this.tagInput = true
        this.tagNew = ''
        this.searchTags('')
      },
      searchTags (val) {
        tagsApi.searchTagsByWord(val).then(res => {
          if (res.success) {
            this.tagsToAdd = res.data
          }
        })
      },
      submitTag (e) {
        const val = e.type === 'click' ? e.target.innerText : e.target.value
        let tag = trim(val)
        this.tagInput = false
        if (tag) {
          this.tagNew = ''
          tagsApi.createTag(tag).then(res => {
            if (res.success) {
              let tagId = res.data.id
              this.addPostTag(tagId)
            }
          }, res => {
            this.showMsg({content: res.error_message || '网络错误,增加标签失败'})
          })
        }
      }
    },
    beforeDestroy () {
      smde.toTextArea()
      smde = null
    }
  }
</script>

<style lang="stylus">
  @import '../../../../stylus/_settings.styl'
  section
    height 100%
    width 100%
    flex 0 1 auto
    display grid
    grid-template-rows 60px 60px 50px
  .big
    transition border 0.5s
    padding 13px 20px 13px 30px
    font-size 26px
  .title-active
    .big
      border 1px solid $yellow
      outline none
  .only-border-bottom
    border 1px solid transparent
    border-bottom 1px solid $border
  .half-container
    float left
    box-sizing border-box
    width 50%
    padding 15px
    .btn+.btn
      margin-right 20px
  .tag
    position relative
    display inline-block
    padding 3px 0
    font-size 14px
    color $light
    border-bottom 2px solid $light
    margin-top 5px
    margin-right 20px
    .iconfont
      display none
    &:hover
      color $green
      border-bottom 2px solid $green
      .iconfont
        display inline
    &.active
      color $green
      border-bottom 2px solid $green
      position relative
  .search-list
    position absolute
    top 25px
    left -6px
    z-index 100
    width 100%
    padding 5px
    background white
    border: 1px solid $border
    border-radius 4px
    box-shadow 0 6px 12px rgba(0,0,0,.03)
  .search-item
    color $light
    padding-left 4px
    &:hover
      color  $green
    &+&
      padding-top 10px
  .delete-tag
    display none
    position absolute
    right -8px
    top -3px
    font-size 12px
  .tag-input
    border none
    background transparent
    color $green
    font-size 14px
    outline 0
  .editor-toolbar
    border-left 0
  .editor-active
    .CodeMirror
      border 1px solid $yellow
  .CodeMirror
    transition border 0.5s
    border-left 1px solid transparent
    overflow-x hidden
  .CodeMirror-sided
    box-sizing border-box
  .editor-preview,
  .editor-preview-side
    background white
    padding: 0.2em 1.4em 0;
    font-family $body-font
    font-size $body-font-size
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color $medium

    a
      text-decoration none
      color $medium

    :focus
      outline 0

    img
      border none

    h1, h2, h3, h4, strong
      font-weight 600
      color $dark

    em
      color $light

    p
      word-spacing 0.05em

    img
      max-width 100%
    span.light
      color $light
    span.info
      font-size .85em
      display inline-block
      vertical-align middle
      width 280px
      margin-left 20px
    h1
      margin 0 0 .5em
    h2
      margin: 2em 0 0.8em;
      padding-bottom: 0.7em;
      border-bottom: 1px solid #ddd;
      a
        color $dark
        &:hover
          border-bottom 2px solid $green
    h3
      margin 3em 0 1.2em
      position relative
      &:before
        content "#"
        color $green
        position absolute
        left -0.7em
        top -2px
        font-size 1.2em
        font-weight bold
    h4
      color $light
      margin 1.2em 0
    figure, p, ul, ol
      margin 1.2em 0
    p, ul, ol
      line-height 1.6em
    ul, ol
      padding-left 1.5em
    a
      color $green
      font-weight 600
    blockquote
      margin 2em 0
      padding-left 20px
      border-left 4px solid $green
      p
        font-weight 600
        margin-left 0
    iframe
      margin 1em 0
    p.tip
      padding 12px 24px 12px 30px
      margin 2em 0
      border-left 4px solid $red
      background-color $codebg
      position relative
      border-bottom-right-radius $radius
      border-top-right-radius $radius
      &:before
        position absolute
        top 14px
        left -12px
        background-color $red
        color #fff
        content "!"
        width 20px
        height 20px
        border-radius 100%
        text-align center
        line-height 20px
        font-weight bold
        font-family $logo-font
        font-size 14px
    figure, p
      margin-left 0
    code
      color #cb7832
    pre
      position relative
      background-color $codebg
      padding .8em .8em .4em
      line-height 1.1em
      border-radius $radius
      code
        overflow-x auto
        display block
        padding 1.2em 1.4em
        line-height 1.5em
        margin 0
        color $code
        border-radius 0
        white-space pre
        &.lang-html, &.lang-js, &.lang-bash, &.lang-css, &.lang-java
          &:after
            position absolute
            top 0
            right 0
            color #ccc
            text-align right
            font-size .75em
            padding 5px 10px 0
            line-height 15px
            height 15px
            font-weight 600
        &.lang-html:after
          content 'HTML'
        &.lang-js:after
          content 'JS'
        &.lang-bash:after
          content 'Shell'
        &.lang-css:after
          content 'CSS'
        &.lang-java:after
          content 'Java'
</style>
