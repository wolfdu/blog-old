<template>
  <div class="post-list-column">
    <div class="list-header">
      <h3 class="page-title">
        <i class="fa fa-linode title-color" aria-hidden="true"></i>文章列表
        <i class="fa fa-plus fa-1 post-add" aria-hidden="true" @click="createPost"></i>
      </h3>
      <div class="show-by-status">
        <select v-model="postType.selected" @change="changePostType(postType.selected)">
          <option v-for="option in postType.items" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
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
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data () {
      return {
        postType: {
          selected: 'draft',
          items: [
            { text: 'all', value: 'all' },
            { text: 'published', value: 'published' },
            { text: 'draft', value: 'draft' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'postList',
        'postId'
      ])
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getAllPost()
      })
    },
    watch: {
      postList () {
      }
    },
    methods: {
      ...mapActions([
        'getAllPost',
        'createPost',
        'getPost',
        'showMsg'
      ]),
      changePostType (postType) {
        this.getAllPost({postType})
      },
      focusOnPost (postId, index) {
        this.getPost({postId, index})
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../../stylus/simplemde.styl'
  @import '../../../../stylus/_settings.styl'
  .post-list-column
    margin 0
    padding 0
    border-right 1px solid $border
    height 100%
    max-width 300px
    display grid
    grid-template-rows 90px
    box-sizing: border-box
    .list-header
      display inline-block
      height 90px
      .post-add
        cursor pointer
        float right
        margin-right 10px
        margin-top 2px
        color #42b983

  .page-title
    color $light
    padding-left 25px
    font-weight 400
    .iconfont
      font-size 22px
      display inline

  .show-by-status
    box-sizing border-box
    display flex
    flex-direction row-reverse
    select
      border-radius 3px
      margin 3px

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
