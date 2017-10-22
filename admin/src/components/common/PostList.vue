<template>
  <ul class="post-list reset-list">
    <li class="post-list-item" v-for="(draft, index) in draftList" @click="focus(index)">
      <article class="post-thumb" :class="[draft['draftPublished']?'published':draft['article']?'updated':'',
      {'active':draft['id'] === currentDraftId}]">
        <h3 class="post-title"><a href="javascript:;">{{draft['title']}}</a></h3>
        <h6 class="post-time">{{draft['lastEditTime']}}</h6>
        <p class="post-content" v-cloak="draft['excerpt'] | md2Text">
        </p>
      </article>
    </li>
  </ul>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'draftList',
        'currentDraftId',
        'currentDraftIndex',
        'draftSaved',
        'draftTitleSaved'
      ])
    },
    methods: {
      ...mapActions(['focusOnDraft']),
      focus (index) {
        if (this.draftSaved && this.draftTitleSaved) {
          if (index !== this.currentDraftIndex) {
            this.focusOnDraft(index)
          }
        } else {
          alert('当前文章正在保存中,请稍后重试')
        }
      }
    }

  }
</script>

<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .post-list
    border-top 1px solid $border
  .post-list-item
    cursor pointer
    margin 0 25px
    padding 20px 0
    border-bottom 1px solid $border
  .post-thumb
    padding-left 5px
    &.published
      border-left 2px solid $green
    &.updated
      border-left 2px solid $yellow
    .post-title
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      font-size 16px
      line-height 1.3
      font-weight 400
      margin 0 0 4px
      padding-bottom 0
    &.active
      .post-title
        color $green
    &:hover
      .post-title
        color $green
    .post-content
      color $light
      font-size 12px
      font-weight 400
      line-height 17px
      margin 0
      max-height ( 3 * @line-height )
      overflow hidden
      word-wrap break-word
    .post-time
      color $light
      margin 0 0 6px
  .post-thumb-content
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
</style>
