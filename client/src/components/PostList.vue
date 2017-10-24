<template>
  <div class="post-list">
    <article-card v-for="post in posts" :article="post"></article-card>
  </div>
</template>
<script>
  import articleService from '../service/articleService'
  import ArticleCard from './common/ArticleCard.vue'

  export default {
    components: {
      ArticleCard
    },
    data () {
      return {
        posts: [],
        totalPage: 0,
        curPage: 1
      }
    },
    beforeRouteEnter (to, from, next) {
      articleService.getPostList({page: 1, limit: 10}).then(res => {
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
    }
  }
</script>
