<template>
  <div class="post-list">
    <article-card v-for="post in posts" :article="post" :key="post.id"></article-card>
    <div class="loading">
      <button type="button" class="btn btn-border" @click="readMore">
        <i class="fa fa-btc" aria-hidden="true" v-show="iconStatus === 'noMore'"></i>
        <i class="fa fa-spinner fa-pulse fa-fw" v-show="iconStatus === 'loading'"></i>
        <span class="sr-only">Loading...</span>
        <i class="fa fa-hand-lizard-o fa-flip-horizontal" aria-hidden="true" v-show="iconStatus === 'getMore'"></i>
        {{readMoreInfo}}
      </button>
    </div>
  </div>
</template>

<script>
  import articleService from '../service/article.resource'
  import ArticleCard from './common/ArticleCard.vue'

  const LIMIT = 10
  export default {
    components: {
      ArticleCard
    },
    data () {
      return {
        posts: [],
        curPage: 1,
        iconStatus: 'getMore',
        readMoreInfo: 'read more'
      }
    },
    beforeRouteEnter (to, from, next) {
      articleService.getPostList({page: 1, limit: LIMIT}).then(res => {
        if (res.success) {
          next(vm => {
            vm.posts = res.data.articles
          })
        }
      }).catch(err => {
        console.log(err)
        alert('网络错误,请刷新重试')
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
              that.readMoreInfo = '余额不足^_^'
            } else {
              that.iconStatus = 'getMore'
            }
          }
        }).catch(err => {
          console.log(err)
          alert('网络错误,请刷新重试')
        })
      }
    }
  }
</script>

<style lang="stylus">
  .loading
    width 100%
    display inline-block
    background-color rgb(238, 238, 238)
    text-align center
    button
      text-shadow 0 1px 0 #fff
      box-shadow inset 0 1px 0 rgba(255,255,255,0.2)
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
</style>
