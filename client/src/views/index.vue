<template>
  <div class="main">
    <div class="page-contain">
      <transition name="slide-fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <sidebar></sidebar>
  </div>
</template>

<script>
  import Sidebar from 'components/common/sidebar/index.vue'

  export default {
    components: {
      Sidebar
    }
  }
</script>

<style lang="stylus">
  @import "../stylus/_settings.styl"
  .slide-fade-enter-active {
    transition: all 2s ease
  }
  .slide-fade-leave-active {
    transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px)
    opacity: 0
  }
  .main
    display -webkit-box
    display -ms-flexbox
    display flex
    .page-contain
      -webkit-box-flex 1
      -ms-flex 1 1 71.6%
      flex 1 1 71.6%
      max-width 71.6%
      @media screen and (max-width: 480px)
        &
          -ms-flex 1 1 100%
          flex 1 1 100%
          max-width 100%
    .post-list, .post .archive-tree
      padding 1em 0 2em
      border-bottom 1px solid $border
    .post
      h2
        margin 2em 0 0.8em;
        padding-bottom 0.7em
        border-bottom 1px solid #ddd
    figure, p, ul
      margin 1.2em 0
    p
      word-spacing 0.05em
    p, ul, ol
      line-height 1.6em
    ul, ol
      padding-left 1.5em
    a
      color $green
      font-weight 600
    blockquote
      margin 2em 0
      padding-left 20px
      border-left 4px solid $green
      p
        font-weight 600
        margin-left 0
    iframe
      margin 1em 0
    p.tip
      padding 12px 24px 12px 30px
      margin 2em 0
      border-left 4px solid $red
      background-color $codebg
      position relative
      border-bottom-right-radius $radius
      border-top-right-radius $radius
      &:before
        position absolute
        top 14px
        left -12px
        background-color $red
        color #fff
        content "!"
        width 20px
        height 20px
        border-radius 100%
        text-align center
        line-height 20px
        font-weight bold
        font-family $logo-font
        font-size 14px
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
