<template>
  <div class="post-list">
    <h2><i class="fa fa-tag fa-1x" aria-hidden="true"></i> {{tagName}}</h2>
    <article-card v-for="post in posts" :article="post" :key="post.id"></article-card>
  </div>
</template>
<script>
  import articleService from '../service/article.resource'
  import ArticleCard from './common/ArticleCard.vue'

  export default {
    components: {
      ArticleCard
    },
    data () {
      return {
        posts: [],
        tagName: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      articleService.getPostList({page: 1, limit: 10, tagId: to.query.tagId}).then(res => {
        if (res.success) {
          next(vm => {
            vm.tagName = to.query.tagName
            vm.posts = res.data.articles
          })
        }
      }).catch(err => {
        console.error(err)
        alert('网络错误,请刷新重试')
      })
    },
    beforeRouteUpdate (to, from, next) {
      articleService.getPostList({page: 1, limit: 10, tagId: to.query.tagId}).then(res => {
        if (res.success) {
          this.tagName = to.query.tagName
          this.posts = res.data.articles
          next()
        }
      }).catch(err => {
        console.error(err)
        alert('网络错误,请刷新重试')
      })
    },
    methods: {
    }
  }
</script>
