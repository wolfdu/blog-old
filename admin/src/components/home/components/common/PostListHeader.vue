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
            { text: 'draft', value: 'draft' },
            { text: 'published', value: 'published' },
            { text: 'all', value: 'all' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'postId'
      ])
    },
    methods: {
      ...mapActions([
        'getAllPost',
        'createPost'
      ]),
      changePostType (postType) {
        this.getAllPost({postType})
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../../../stylus/simplemde.styl'
  @import '../../../../stylus/_settings.styl'
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

</style>
