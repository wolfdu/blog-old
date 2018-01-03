<template>
  <div class="post-list">
    <ul class="reset-list">
      <li class="post-list-item" v-for="(post, index) in postList" @click="focusOnPost(post.id, index)">
          <article class="post-thumb"
                   :class="[post['draftPublished'] ? 'published': post['article'] ? 'updated' : '',
                   {'active':post['id'] === postId}]">
            <h3 class="post-title">{{post['title']}}</h3>
            <h6 class="post-time">{{post['lastEditTime']}}</h6>
            <p class="post-content">{{post['excerpt']}}</p>
          </article>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'postList',
        'postId'
      ])
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getAllPost({postType: 'draft'})
      })
    },
    methods: {
      ...mapActions([
        'getAllPost',
        'getPost'
      ]),
      focusOnPost (postId, index) {
        this.getPost({postId, index})
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../../stylus/simplemde.styl'
  @import '../../../../stylus/_settings.styl'
  .post-list
    overflow auto
    ul
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
</style>
