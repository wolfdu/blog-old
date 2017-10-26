<template>
  <div class="post">
    <article class="article">
      <header id="header">
        <h1>{{article.title}}</h1>
        <h4>
          {{article.createTime}}
        </h4>
      </header>
      <p v-html="md2html()"></p>
      <div class="fix tag-list" style="margin: 20px 0;">
        <span class="tag" v-for="tag in article.tags"><a class="tag-link active">{{tag.name}}</a></span>
      </div>
    </article>
  </div>
</template>

<script>
  import articleService from '../service/articleService'
  import {markdown} from '../filters/markdown'
  import Sidebar from './common/sidebar/Sidebar.vue'

  export default {
    components: {
      Sidebar
    },
    data () {
      return {
        article: {}
      }
    },
    beforeRouteEnter (to, from, next) {
      articleService.getPost(to.params.postId).then(res => {
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
        articleService.visit(this.article.id, this.article.visits).catch(err => {
          console.log(err)
        })
      })
    },
    methods: {
      md2html () {
        return markdown(this.article.content)
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
