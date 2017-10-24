<template>
  <article class="post">
    <header id="header">
      <h1>{{title}}</h1>
      <h4>
        {{createTime}}
      </h4>
    </header>
    <p v-html="md2html(content)"></p>
    <div class="fix tag-list" style="margin: 20px 0;">
      <span class="tag" v-for="tag in tags"><a class="tag-link active">{{tag.name}}</a></span>
    </div>
  </article>
</template>

<script>
  import articleService from '../service/articleService'
  import markdown from '../filters/markdown'

  export default {
    components: {
    },
    data () {
      return {
        'id': '',
        'title': '',
        'createTime': '',
        'content': '',
        'lastEditTime': null,
        'tags': [],
        'nextArticle': null,
        'prevArticle': null
      }
    },
    beforeRouteEnter (to, from, next) {
      articleService.getPost(to.params.postId).then(res => {
        if (res.success) {
          next(vm => {
            vm.id = res.data._id
            vm.title = res.data.title
            vm.createTime = res.data.createTime
            vm.content = res.data.content
            vm.nextArticle = res.data.nextArticle
            vm.prevArticle = res.data.prevArticle
            vm.lastEditTime = res.data.lastEditTime
            vm.tags = res.data.tags
          })
        }
      }).catch(err => {
        console.log(err)
        alert('网络错误,请刷新重试')
      })
    },
    methods: {
      md2html () {
        return markdown
      }
    }
  }
</script>

<style lang="stylus">
  @import "../stylus/_settings.styl"
  .tag-list
    .tag
      float left
      margin-bottom 5px
      a.tag-link
        color $light
        border-bottom 2px solid $light
        &:hover,&.active
          color $green
          border-bottom 2px solid $green
      &+.tag
        margin-left 20px
  @media screen and (max-width: 720px)
    .tag-list
      .tag
        margin: 0 5px 5px;
        &+.tag
          margin-left 5px
</style>
