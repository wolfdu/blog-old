<template>
  <section :class="{ 'editor-active': !draftSaved}" >
    <div :class="{ 'title-active': !draftTitleSaved}">
      <input type="text" class="form-control big only-border-bottom" :value="draftTitle" @input="updateTitle">
    </div>
    <div class="clearfix">
      <div class="half-container">
        <icon name="tag" class="iconfont" scale="2" style="margin-right:5px"></icon>
        <span class="tag" v-for="tag in tags">{{tag['name']}}
          <i class="icon-chacha iconfont delete-tag" @click="deleteTag(tag.id)"></i></span>
        <div class="tag active">
          <span v-show="!tagInput" @click="addTag()" >+</span>
          <input type="text" class="tag-input" v-show="tagInput" v-model="tagNew" placeholder="使用回车键提交" @keyup.13="submitTag">
          <ul class="search-list reset-list" v-if="tagInput" v-show="tagsToAdd.length">
            <li class="search-item" @click="submitTag(tag['name'])" v-for="tag in tagsToAdd">{{tag['name']}}</li>
          </ul>
        </div>
      </div>
      <div class="half-container">
        <button type="button" class="btn btn-save r" @click="publish">发布文章</button>
        <button type="button" class="btn btn-border r" v-show="articleIdOfPost === null" @click="deletePost">删除草稿</button>
      </div>
    </div>
    <textarea id="editor" style="opacity: 0"></textarea>
  </section>
</template>

<script>
  import SimpleMDE from 'simplemde'
  import {marked} from '../../filters/md2Text'
  import { mapGetters, mapActions } from 'vuex'
  import debounce from 'lodash/debounce'

  const updateTitle = debounce(function (draftTitle) {
    this.submitDraftTitle(draftTitle).then(() => {
      this.saveDraftTitle()
    }).catch(err => {
      console.log(err)
      alert('网络错误,标题保存失败')
    })
  }, 500)

  let smde
  export default{
    data () {
      return {
        // 用以标识 是切换文章导致的codemirror的change事件还是 手工输入引起的change事件
        // 切换文章引起的change事件则没必要对内容和title进行保存
        change: true,
        draftPublished: '',
        tags: [],
        tagsToAdd: [],
        tagNew: '',
        tagInput: false
      }
    },
    computed: {
      ...mapGetters([
        'draftSaved',
        'draftTitleSaved',
        'draftTitle'
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
      })
    },
    beforeDestroy () {
      smde.toTextArea()
      let editor = document.getElementById('editor')
      editor.outerHTML = editor.outerHTML
    },
    watch: {
    },
    methods: {
      ...mapActions([
        'editDraftTitle',
        'submitDraftTitle',
        'saveDraftTitle'
      ]),
      updateTitle (e) {
        this.editDraftTitle()
        updateTitle.call(this, e.target.value)
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .title-active
    .big
      border 1px solid $yellow
  .big
    transition border 0.5s
    padding 13px 20px 13px 30px
    font-size 26px
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

    code, pre
      font-family $code-font
      font-size $code-font-size
      background-color $codebg
      -webkit-font-smoothing initial
      -moz-osx-font-smoothing initial

    code
      color #e96900
      padding 3px 5px
      margin 0 2px
      border-radius 2px
      white-space nowrap

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
        color #525252
        border-radius 0
        white-space pre
        &.lang-html, &.lang-javascript, &.lang-bash, &.lang-css, &.lang-java
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
        &.lang-javascript:after
          content 'JS'
        &.lang-bash:after
          content 'Shell'
        &.lang-css:after
          content 'CSS'
        &.lang-java:after
          content 'Java'
</style>
