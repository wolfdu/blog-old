<template>
  <div class="post-list">
    <article v-for="post in posts">
      <header>
        <h2><a v-link="'/posts/'+post['_id']">{{post['title']}}</a></h2>
        <h4>
          {{post['createTime']}}
        </h4>
      </header>

      <p v-html="post['excerpt'] | markdown">

      </p>

    </article>
  </div>

</template>
<script>
  import articleService from '../service/articleService'
  export default {
    components: {
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
