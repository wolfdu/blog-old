<template>
  <div class="post">
    <article class="article">
      <header id="header">
        <h1>{{article.title}}</h1>
        <p>
          Posted by: <a class="author-brand" href="https://github.com/wolfdu" target="_blank">WolfDu</a> {{article.lastEditTime}}
        </p>
      </header>
      <p v-html="content"></p>
      <div class="fix tag-list">
        <router-link
          v-for="tag in article.tags"
          :to="{name: 'tag', query: {tagId: tag.id, tagName: tag.name}}"
          :key="tag.id"
          class="tag">{{tag.name}}</router-link>
      </div>
      <div class="fix like">
        <span @click="likePost" class="like-span"><i class="fa fa-heart-o fa-hover fa-2x" v-show="!liked" aria-hidden="true"></i>
          <i class="fa fa-heartbeat fa-x" v-show="liked" aria-hidden="true"></i> like {{article.like}}</span>
        <span class="like-span"> <i class="fa fa-user-secret fa-x" aria-hidden="true"></i> 围观 {{article.visits}} 次</span>
        <span v-show="false"> <i class="fa fa-commenting fa-x" aria-hidden="true"></i> 条评论</span>
      </div>
      <div id="gitment"></div>
    </article>
    <div v-show="top" class="post-toc toc-right absolute position-fixed"></div>
  </div>
</template>

<script>
  import articleService from 'service/article.resource'
  import {markdown} from 'src/filters/markdown'
  import 'gitment/style/default.css'
  import Gitment from 'gitment'
  import {getGitmentInfo} from 'src/utils/gitmentInfo'
  import {getTocOption} from 'src/utils/tocUtil'
  import tocbot from 'tocbot'
  import 'tocbot/dist/tocbot.css'

  let gitment = null
  export default {
    components: {
    },
    data () {
      return {
        article: {},
        liked: false,
        likedHistory: [],
        top: false
      }
    },
    computed: {
      content: function () {
        return markdown(this.article.content)
      }
    },
    created () {
      window.addEventListener('scroll', () => {
        if (!this.top && document.querySelector('.post-toc')) {
          this.top = this.tocVisible()
          if (this.top) {
            this.initToc()
          }
        }
      })
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
    beforeRouteLeave (to, from, next) {
      this.initTop()
      next()
    },
    beforeRouteUpdate (to, from, next) {
      articleService.getPost(to.query.postId).then(res => {
        if (res.success) {
          this.initTop()
          this.article = res.data
          next()
        }
      }).catch(err => {
        console.log(err)
        alert('网络错误,请刷新重试')
      })
    },
    mounted: function () {
      this.$nextTick(function () {
        this.initToc()
      })
    },
    activated () {
      gitment = new Gitment(getGitmentInfo())
      gitment.render(document.getElementById('gitment'))
      this.$nextTick(function () {
        document.title = `${this.article.title} | WolfDu后山`
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
      },
      tocVisible () {
        return window.scrollY > 380
      },
      initTop () {
        this.top = false
      },
      initToc () {
        tocbot.init(getTocOption())
      }
    }
  }
</script>

<style lang="stylus">
  @import "~src/stylus/_settings.styl"
  .post
    padding 1em 0 2em
    border-bottom  1px solid $border
    .article
      border  1px solid $border
      background-color hsla(0,0%,100%,.6)
      padding .5rem 2rem 2rem 2rem
      .author-brand
        color $dark
        font-family $logo-font
        font-weight 500
  table td,th
    border 1px solid #ddd
    padding 5px

  .post-toc
    height: 100%;
    width: 280px;
    @media screen and (max-width: 1500px)
      transform: translateX(0);
      display none
    a
      color #2b2b2b
      text-decoration none
    .is-active-link
      font-weight 700
      color #42b983

  .post-toc>.toc-list
    position relative
    overflow hidden
  .toc-right
    transform: translateX(100%);
    left: -180px;
    @media screen and (max-width: 1700px)
      transform: translateX(0);
      left: 60px;
    @media screen and (max-width: 1600px)
      transform: translateX(0);
      left: 18px;
  .position-fixed
    position: fixed !important;
    top: 100px;
  .absolute
    position: absolute;
  .toc-list li
    list-style none

  h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
    display: block;
    content: " ";
    height: 60px;
    margin-top: -60px;
    visibility: hidden;
  }


  .gitment-comment-header
    background-color #f7f7f8

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

  .like-span
    padding-right 30px

  .fa-hover
    &:hover
      color $green
</style>
