<template>
  <div class="post">
    <article class="article">
      <p v-html="content"></p>
    </article>
  </div>
</template>
<script>
  import aboutService from 'service/about.resource'
  import {markdown} from '../filters/markdown'

  export default{
    data () {
      return {
        about: {}
      }
    },
    computed: {
      content: function () {
        return markdown(this.about.content)
      }
    },
    beforeRouteEnter (to, from, next) {
      aboutService.getAbout().then(res => {
        if (res.success) {
          next(vm => {
            vm.about = res.data
          })
        }
      }).catch(err => {
        console.log(err)
        alert('网络错误,请刷新重试')
      })
    }
  }
</script>
<style lang="stylus">
  .post
    padding 1em 0 2em
    border-bottom  1px solid $border
    .article
      border  1px solid $border
      background-color hsla(0,0%,100%,.6)
      padding .5rem 2rem 2rem 2rem

  pre
    position relative
    background-color $codebg
    padding .8em .8em .4em
    line-height 1.1em
    border-radius $radius
    code
      overflow-x auto
      display block
      padding 1.2em 1.4em
      line-height 1.5em
      margin 0
      color $code
      border-radius 0
      white-space pre
      &.lang-html, &.lang-js, &.lang-bash, &.lang-css, &.lang-java
        &:after
          position absolute
          top 0
          right 0
          color #ccc
          text-align right
          font-size .75em
          padding 5px 10px 0
          line-height 15px
          height 15px
          font-weight 600
      &.lang-html:after
        content 'HTML'
      &.lang-js:after
        content 'JS'
      &.lang-bash:after
        content 'Shell'
      &.lang-css:after
        content 'CSS'
      &.lang-java:after
        content 'Java'
</style>
