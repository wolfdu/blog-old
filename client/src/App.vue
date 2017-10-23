<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
    <div class="article-card">
      <div class="container">
        <div class="date">
          <div class="detail">
            <span class="date-detail">23</span>
            <span class="date-detail">October</span>
            <span class="date-detail">2017</span>
          </div>
          <div class="author">
            <span><i class="fa fa-meh-o fa-1" aria-hidden="true"></i>WolfDu</span>
          </div>
        </div>
        <div class="content">
          <h2 class="title"><a>blog admin</a></h2>
          <p>人生如寄，似水流年 如河驶流，往而不返 最惧无常，独遭斯疾著作权归作者所有。</p>
          <div class="info">
            <div class="left">
              <span class="tags"><a>nodeJs</a></span>
            </div>
            <div class="right">
              <span class="article-tag">
                <i class="fa fa-eye fa-1" aria-hidden="true"></i>
                <span>400</span>
              </span>
              <span class="article-tag">
                <i class="fa fa-heartbeat fa-1" aria-hidden="true"></i>
                <span>300</span>
              </span>
              <span class="article-tag">
                <i class="fa fa-commenting-o fa-flip-horizontal fa-1" aria-hidden="true"></i>
                <span>200</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <header-nav></header-nav>
    <main class="content">
      <router-view
        transition="fade"
        transition-mode="out-in"
        keep-alive
      >
      </router-view>
    </main>
    <footer class="copyright">
      Copyrights
    </footer>
  </div>
</template>

<script>
  import HeaderNav from 'components/common/HeaderNav.vue'
  export default {
    components: {
      HeaderNav
    }
  }
</script>

<style lang="stylus">
  .article-card
    width 653px
    height 138px
    display inline-block
    padding 1rem
    margin-bottom 2rem
    background-color hsla(0,0%,100%,.6)
    border 1px solid #ccc
    margin-left 100px
    box-shadow: 0 10px 10px #CCC
    transition all 0.3s ease
    a
      &:hover
        text-decoration underline
    &:hover
      border 1px solid rgba(82, 168, 236, 0.6)
      box-shadow: 0 0 12px rgba(82, 168, 236, 0.6)
    .container
      display -webkit-box
      display -ms-flexbox
      display flex
      .content
        -webkit-box-flex 1
        -ms-flex 1
        flex 1
        padding 0 35px 0 20px
        .title
          margin 0
          font-family Raleway
          font-size 20px
          font-style normal
          font-weight 400
          letter-spacing 1px
          text-transform uppercase
          margin-bottom 1rem
          transition all 0.6s ease
          &:hover
            transform translate(15px,0)
        .info
          display -webkit-box
          display -ms-flexbox
          display flex
          -webkit-box-pack justify
          -ms-flex-pack justify
          justify-content space-between
          font-size 14px
          color #222
          margin-top 1rem
          padding-top .5rem
          border-top 1px solid #ebebeb
          span
            margin 0 4px
        .left
          height 2em
          line-height 2rem
          .tags a
            transition all 0.3s ease
            margin-right 5px
            display inline-block;
            border 1px solid #c4c4c4
            border-radius 999em
            padding 0 10px
            color #bfbfbf
            line-height 24px
            font-size 12px
            text-decoration none
            margin 0 1px
            margin-bottom 6px
            &:hover
              color rgba(82, 168, 236, 0.6)
              border 1px solid rgba(82, 168, 236, 0.6)
        .right
          height 2em
          line-height 2rem
      .date
        -webkit-box-flex 0
        -ms-flex 0 0 70px
        flex 0 0 70px
        .author
          border-right 1px solid #ebebeb
          margin-top 1rem
          padding-top 2rem
          i
            margin-right 10px
        .detail
          padding 0 20px
          border-right 1px solid #ebebeb
          .date-detail
            display block
<style lang="stylus">
  @import "./stylus/_settings.styl"
  .fade-transition
    transition: opacity .2s ease
  .fade-enter, .fade-leave
    opacity: 0;
  .content
    max-width  850px
    box-sizing border-box
    margin ($header-height + $header-padding-vertical * 2)  auto 0
    padding: 0 1.4em;
    @media screen and (max-width: 480px)
      &
        margin ($header-height + $header-padding-vertical-small * 2)  auto 0
    img
      max-width 100%
    span.light
      color $light
    span.info
      font-size .85em
      display inline-block
      vertical-align middle
      width 280px
      margin-left 20px
    h1
      margin .8em 0
      font-size 2em
    h2
      margin .8em 0
      padding-bottom 0
      border-bottom none
      a
        color $dark
        &:hover
          border-bottom 2px solid $green
    h3
      margin 3em 0 1.2em
      position relative
      &:before
        content "#"
        color $green
        position absolute
        left -0.7em
        top -2px
        font-size 1.2em
        font-weight bold
    h4
      color $light
      margin 1.2em 0
    .post-list, .post
      padding 1em 0 2em
      border-bottom 1px solid $border
    .post
      h2
        margin 2em 0 0.8em;
        padding-bottom 0.7em
        border-bottom 1px solid #ddd
    figure, p, ul, ol
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
        color #525252
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

  .copyright
    color $light
    font-size 1em
    text-align center
    padding 0 20px 30px
    margin-top 30px
</style>
