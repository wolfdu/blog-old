<template>
  <div class="post">
    <article class="article">
      <header id="header">
        <h1>{{article.title}}</h1>
        <h4>
          {{article.createTime}}
        </h4>
      </header>
      <p v-html="content"></p>
      <div class="fix tag-list">
        <router-link
          v-for="tag in article.tags"
          :to="{name: 'tag', params: {tagId: tag._id}}"
          :key="tag._id"
          class="tag">{{tag.name}}</router-link>
      </div>
      <div class="fix like">
        <span @click="likePost"><i class="fa fa-heart-o fa-3x" v-show="!liked" aria-hidden="true"></i>
          <i class="fa fa-heartbeat fa-3x" v-show="liked" aria-hidden="true"></i> like {{article.like}}</span>
        <span>已被 <i class="fa fa-user-secret fa-2x" aria-hidden="true"></i> 围观 {{article.visits}} 次</span>
      </div>
    </article>
  </div>
</template>

<script>

import articleService from '../service/article.resource'
import {markdown} from '../filters/markdown'
import Sidebar from './common/sidebar/Sidebar.vue'

export default {
  components: {
    Sidebar
  },
  data () {
    return {
      article: {},
      liked: false,
      likedHistory: []
    }
  },
  computed: {
    content: function () {
      return markdown(this.article.content)
    }
  },
  beforeRouteEnter (to, from, next) {
    articleService.getPost(to.query.postId).then(res => {
      if (res.success) {
        next(vm => {
          vm.article = res.data
        })
      }
    }).catch(err => {
      console.log(err)
      alert('网络错误,请刷新重试')
    })
  },
  mounted () {
    this.$nextTick(function () {
      this.initLikedHistory()
      articleService.visit(this.article.id, this.article.visits).catch(err => {
        console.log('visits error')
        console.log(err)
      })
    })
  },
  methods: {
    initLikedHistory () {
      if (localStorage && !localStorage.getItem('likedHistory')) {
        localStorage.setItem('likedHistory', JSON.stringify([]))
      } else {
        this.likedHistory = JSON.parse(localStorage.getItem('likedHistory'))
        this.liked = !!~this.likedHistory.indexOf(this.article.id)
      }
    },
    likePost () {
      let that = this
      if (!that.liked) {
        articleService.like(that.article.id, that.article.like).then(res => {
          if (res.success) {
            that.liked = true
            that.article.like = res.data.like
            that.likedHistory.push(that.article.id)
            localStorage.setItem('likedHistory', JSON.stringify(that.likedHistory))
          }
        }).catch(err => {
          console.log('like error')
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="stylus">
  @import "../stylus/_settings.styl"
  .post
    padding 1em 0 2em
    border-bottom  1px solid $border
    .article
      border  1px solid $border
      padding .5rem 2rem 2rem 2rem

  .tag-list
    margin 30px 0
    .tag
      float left
      transition all 0.3s ease
      margin-right 5px
      display inline-block;
      border 1px solid #c4c4c4
      border-radius 999em
      padding 0 10px
      color #bfbfbf
      line-height 24px
      font-size 12px
      text-decoration none
      margin-bottom 6px
      border-color #bfbfbf
      &:hover
        color rgba(82, 168, 236, 0.6)
        border 1px solid rgba(82, 168, 236, 0.6)
  @media screen and (max-width: 720px)
    .tag-list
      .tag
        margin: 0 5px 5px;
        &+.tag
          margin-left 5px
</style>
