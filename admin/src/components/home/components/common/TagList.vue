<template>
    <div class="tags">
        <h3 class="page-title" style="margin-bottom:0" v-if="null === tagActive">
          <i class="fa fa-tags fa-2 title-color" aria-hidden="true"></i>根据标签搜索文章
        </h3>
        <ul class="clearfix reset-list tag-list" v-if="null !== tagActive">
          <li class="tag active">
            <span v-show="!editing">{{tagActive['name']}}</span>
            <i class="fa fa-reply fa-1 iconfont" v-show="!editing" @click="blurTag()"></i>
            <i class="fa fa-pencil-square-o fa-1 iconfont"
               aria-hidden="true"
               @click="editTag()"
               v-show="!editing"></i>
            <i class="fa fa-times fa-1 iconfont"
               style="vertical-align: 1px;"
               @click="deleteTag(tagActive)"
               v-show="!editing"></i>
            <input type="text"
                   class="tag-input"
                   v-if="editing"
                   v-model="newName"
                   placeholder="回车键提交"
                   @keyup.13="saveTag(newName)">
          </li>
        </ul>
        <ul class="clearfix reset-list tag-list" v-show="(tags.length !== 1 || tagActive == null)">
          <li class="tag" v-for="(tag, index) in tags"  v-show="tag !== tagActive">
            <span @click="searchTag(tag, index)">{{tag['name']}}</span>
          </li>
        </ul>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import tagsApi from 'service/tag.resource'

  export default{
    data () {
      return {
        tagActive: null,
        editing: false,
        index: null,
        newName: null
      }
    },
    computed: {
      ...mapGetters([
        'tags'
      ])
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getAllTags()
      })
    },
    methods: {
      ...mapActions([
        'getAllTags',
        'getAllPost',
        'modifyTag'
      ]),
      searchTag (tag, index) {
        this.tagActive = tag
        this.index = index
        this.getAllPost({tag: tag.id})
      },
      blurTag () {
        this.tagActive = null
        this.getAllPost()
      },
      editTag () {
        this.editing = true
      },
      saveTag (newName) {
        if (!newName || newName === this.tagActive.name) {
          this.editing = false
        } else {
          const tagId = this.tagActive.id
          this.tagActive = null
          this.modifyTag({tagId: tagId, newName: newName, index: this.index})
          this.editing = false
          this.newName = null
        }
      },
      deleteTag (tag) {
        tagsApi.deleteTag(tag.id).then(res => {
          if (res.success) {
            let content = '删除成功'
            let type = 'success'
            this.showMsg({content, type})
          }
        }, res => {
          this.showMsg({content: res.error_message || '网络错误，修改标签失败'})
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../../stylus/simplemde.styl'
  @import '../../../../stylus/_settings.styl'
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
  .tag-list
    padding 15px 0
    margin 0 25px
    &+&
      border-top 1px solid $border
</style>
