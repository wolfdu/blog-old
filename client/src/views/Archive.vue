<template>
  <div class="archive-tree">
    <div class="archive-contain">
      <i class="fa fa-rocket" aria-hidden="true">  已经写了{{postsCount}}篇日志: “不积跬步，无以至千里”</i>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <span>{{getDateDetail(post.createTime)}} --
          <h2 class="title"><router-link :to="{name: 'post', query: {postId: post.id}}">{{post.title}}</router-link></h2></span>
        </li>
      </ul>
      <div class="archive-loading">
        <button type="button" class="btn btn-border" @click="readMore">
          <i class="fa fa-anchor" aria-hidden="true" v-show="iconStatus === 'noMore'"></i>
          <i class="fa fa-spinner fa-pulse fa-fw" v-show="iconStatus === 'loading'"></i>
          <span class="sr-only">Loading...</span>
          <i class="fa fa-hand-lizard-o fa-flip-horizontal" aria-hidden="true" v-show="iconStatus === 'getMore'"></i>
          {{readMoreInfo}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import articleService from '../service/article.resource'

  const LIMIT = 25
  export default {
    components: {
    },
    data () {
      return {
        postsCount: 0,
        posts: [],
        curPage: 1,
        iconStatus: 'getMore',
        readMoreInfo: 'Time roaming'
      }
    },
    beforeRouteEnter (to, from, next) {
      articleService.getPostCount().then(res => {
        if (res.success) {
          next(vm => {
            vm.postsCount = res.data.count
            articleService.getPostList({page: 1, limit: LIMIT}).then(res => {
              if (res.success) {
                vm.posts = res.data.articles
              }
            }).catch(err => {
              console.log(err)
              alert('网络错误,请刷新重试')
            })
          })
        }
      })
    },
    methods: {
      readMore () {
        let that = this
        that.curPage++
        that.iconStatus = 'loading'
        articleService.getPostList({page: that.curPage, limit: LIMIT}).then(res => {
          if (res.success) {
            let articles = res.data.articles
            that.posts = [...that.posts, ...articles]
            if (articles.length < LIMIT) {
              that.iconStatus = 'noMore'
              that.readMoreInfo = '到底了老铁z.Z'
            } else {
              that.iconStatus = 'getMore'
            }
          }
        }).catch(err => {
          console.log(err)
          alert('网络错误,请刷新重试')
        })
      },
      getDateDetail (dateStr) {
        return dateStr.substring(0, 10)
      }
    }
  }
</script>

<style lang="stylus" scoped="">
  .archive-tree
    padding 1em 0 2em
    .archive-contain
      border  1px solid $border
      background-color hsla(0,0%,100%,.6)
      padding 2rem
  .archive-loading
    width 100%
    display inline-block
    button
      padding 5px 10px
      font-size 12px
      line-height 1.5
      border-radius 3px
      color #333
      background-color #fff
      border-color #ccc
      display inline-block
      text-align center
      vertical-align middle
      touch-action manipulation
      cursor pointer
  span
    display -webkit-inline-box
  .title
    margin 0
    font-family Raleway
    font-size 15px
    font-style normal
    font-weight 400
    letter-spacing 1px
    text-transform uppercase
    margin-left .5rem
    margin-bottom .5rem
    transition all 0.6s ease
    &:hover
      transform translate(15px,0)
</style>
