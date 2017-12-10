<template>
  <div class="sidebar-box">
    <div class="tags-box">
      <h5 class="title">
        <i class="fa fa-free-code-camp fa-2" aria-hidden="true"></i>热门文章
      </h5>
      <div class="articles">
        <hot-article-card v-for="article in articles" :article="article" :key="article.id"></hot-article-card>
      </div>
    </div>
  </div>
</template>

<script>
  import articleService from 'src/service/article.resource'
  import HotArticleCard from './HotArticleCard.vue'

  const LIMIT = 6
  export default {
    components: {
      HotArticleCard
    },
    data () {
      return {
        articles: []
      }
    },
    mounted () {
      this.$nextTick(function () {
        articleService.getPostList({page: 0, limit: LIMIT}).then(res => {
          if (res.success) {
            this.articles = res.data.articles
          }
        }).catch(err => {
          console.log(err)
          alert('网络错误,请刷新重试')
        })
      })
    }
  }
</script>

<style lang="stylus">
  .sidebar-box
    width 100%
    display inline-block
    margin-bottom 2rem
    background-color hsla(0,0%,100%,.6)
    border 1px solid #ccc
    box-shadow: 0 10px 10px #CCC
    transition all 0.3s ease
    &:hover
      border 1px solid rgba(82, 168, 236, 0.6)
      box-shadow: 0 0 12px rgba(82, 168, 236, 0.6)
    .tags-box
      padding .5rem
      h5
        margin 0
        border-bottom .1px solid #ebebeb
        padding-bottom .3rem
        i
          margin-right .2rem
  .articles a
    transition all 0.3s ease
    margin-right 5px
    display inline-block;
    font-size 13px
    text-decoration none
    color #010101

</style>
