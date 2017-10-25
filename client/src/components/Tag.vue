<template>
  <div class="post-list">
    <h3>tag:{{tagName}}</h3>
    <article-card v-for="post in posts" :article="post" :key="post.id"></article-card>
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
        tagName: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      articleService.getPostList({page: 1, limit: 10, tagId: to.params.tagId}).then(res => {
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
    beforeRouteUpdate (to, from, next) {
      articleService.getPostList({page: 1, limit: 10, tagId: to.params.tagId}).then(res => {
        if (res.success) {
          this.posts = res.data.articles
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
