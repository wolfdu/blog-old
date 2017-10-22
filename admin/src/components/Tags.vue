<template>
  <div class="container-with-aside">
    <nav-side>
    </nav-side>
    <section class="post-list-column">
      <h3 class="page-title" style="margin-bottom:0" v-if="null === tagActive">
        <i class="fa fa-tags fa-2" aria-hidden="true"></i>根据标签搜索文章
      </h3>
      <ul class="clearfix reset-list tag-list" v-if="null !== tagActive">
        <li class="tag active">
          <span v-show="!tagActive['editing']">{{tagActive['name']}}</span>
          <i class="fa fa-reply fa-1 iconfont" v-show="!tagActive['editing']" @click="blurTag(tagActive.id)"></i>
          <i class="fa fa-pencil-square-o fa-1 iconfont"
             aria-hidden="true"
             @click="modifyTag(tagActive)"
             v-show="!tagActive['editing']"></i>
          <i class="fa fa-times fa-1 iconfont"
             style="vertical-align: 1px;"
             @click="deleteTag(tagActive)"
             v-show="!tagActive['editing']"></i>
          <input type="text"
                 class="tag-input"
                 v-if="tagActive['editing']"
                 v-model="tagActive['newName']"
                 placeholder="回车键提交"
                 @keyup.13="saveTag(tagActive)">
        </li>
      </ul>
      <ul class="clearfix reset-list tag-list" v-show="(tags.length !== 1 || tagActive == null)">
        <li class="tag" v-for="tag in tags"  v-show="tag !== tagActive">
          <span @click="searchTag(tag)" v-show="!tag['editing']">{{tag['name']}}</span>
        </li>
      </ul>
      <post-list></post-list>
    </section>
    <div class="post-edit">
      <article-editor v-if="null !== currentDraftId"></article-editor>
    </div>
  </div>
</template>

<script>
import NavSide from './common/NavSide.vue'
import ArticleEditor from './common/ArticleEditor.vue'
import PostList from './common/PostList.vue'
import { mapGetters, mapActions } from 'vuex'
import tagsService from '../service/tag/tagService'

export default{
  data () {
    return {
      tagActive: null,
      tags: []
    }
  },
  computed: {
    ...mapGetters([
      'currentDraftId'
    ])
  },
  components: {
    NavSide,
    ArticleEditor,
    PostList
  },
  beforeRouteEnter (to, from, next) {
    tagsService.getAllTags().then(res => {
      if (res.success) {
        for (let i of res.data) {
          i.newName = ''
          i.editing = false
        }
      }
      next(vm => {
        vm.tags = res.data
        vm.getAllDraft().catch(err => {
          vm.error = err.toString()
        })
      })
    })
  },
  methods: {
    ...mapActions([
      'getAllDraft'
    ]),
    searchTag (tag) {
      this.tagActive = tag
      this.getAllDraft(tag.id).catch(err => {
        this.error = err.toString()
      })
    },
    blurTag (tagId) {
      this.tagActive = null
      this.getAllDraft(tagId).catch(err => {
        this.error = err.toString()
      })
    },
    modifyTag (tag) {
      tag.newName = tag.name
      tag.editing = true
    },
    saveTag (tag) {
      if (!tag.name || tag.newName === tag.name) {
        tag.editing = false
      } else {
        tagsService.modifyTag(tag.id, tag.newName).then(res => {
          if (res.success) {
            tag.name = tag.newName
            tag.editing = false
          } else {
            alert('已有同名标签')
          }
        }).catch(err => {
          console.error(err)
          alert('网络错误，修改标签失败')
        })
      }
    },
    deleteTag (tag) {
      tagsService.deleteTag(tag.id).then(res => {
        if (res.success) {
          alert('删除成功')
        }
      }).catch(err => {
        console.error(err)
        alert('网络错误，修改标签失败')
      })
    }
  }
}
</script>

<style lang="stylus">
  @import '../stylus/simplemde.styl'
  @import '../stylus/_settings.styl'
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
  .tag-list
    padding 15px 0
    margin 0 25px
    &+&
      border-top 1px solid $border
</style>
