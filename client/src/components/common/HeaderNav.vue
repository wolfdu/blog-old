<template>
    <header class="top-nav-container">
      <nav class="top-nav">
        <router-link to="/posts" class="vertical-center nav-logo">
          <img src="../../assets/img/logo.png" class="logo vertical-center-content" alt="">
          <span class="brand vertical-center-content">Wolf Du</span>
        </router-link>
        <ul class="nav-link-container">
          <li class="nav-link-item"><router-link to="/posts" class="nav-link">文章</router-link></li>
          <li class="nav-link-item"><a class="nav-link">关于我</a></li>
        </ul>
        <img src="../../assets/img/menu.png" alt="" class="menu-button" @click="asideNavShow = !asideNavShow">
        <div class="nav-mask" :class="[asideNavShow? 'open':'']" @click="asideNavShow = false">
          <aside class="nav-aside" >
            <ul class="nav-aside-list">
              <li ><router-link to="/posts" class="nav-link">文章</router-link></li>
              <li ><a class="nav-link">关于我</a></li>
            </ul>
          </aside>
        </div>
      </nav>
    </header>
</template>

<script>
  export default{
    data () {
      return {
        asideNavShow: false
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/_settings.styl"
  .top-nav-container
  //顶部导航条的垂直长度还是太长了
  //还是让他在正常情况下随页面滚动把
  //只在移动端的时候fixed
    position absolute
    top 0
    right 0
    left 0
    z-index 100
    background #fff
    box-shadow 0 0 4px rgba(0,0,0,0.25)
  //在移动端就让顶部的导航条fixed
    @media screen and (max-width: 480px)
      &
        position fixed
  .top-nav
    max-width  1000px
    margin 0 auto
    height $header-height
    padding $header-padding-vertical 0
    @media screen and (max-width: 480px)
      &
        padding $header-padding-vertical-small 0
  .nav-logo
    display inline-block
    .logo
      margin-right 6px
    @media screen and (max-width: 480px)
      &
        margin-left 10px
  .logo
    width 40px
    height 40px
  .brand
    font-size 1.5em
    color $dark
    font-family $logo-font
    font-weight 500

  .nav-link-container
    float right
    list-style-type none
    margin 0
    padding 0
    @media screen and (max-width: 480px)
      &
        display none
  .nav-link-item
    display inline-block
    margin 0 .6em
  .nav-mask
    position fixed
    z-index 99
    left 100%
    right -100%
    top 0
    bottom 0
    background transparent
    transition right 0.2s ease
    &.open
      left 0
      right 0
  .nav-aside
    position absolute
    display block
    padding ($header-padding-vertical-small * 2 + $header-height + 10px) 30px 20px
    background $grey
    top 0
    right 0
    bottom 0
    width 200px
    box-shadow 0 0 4px rgba(0,0,0,0.25)
    .nav-aside-list
      list-style-type none
      margin 0
      line-height 1.8em
      padding-left 1em
      .nav-link
        line-height 1em
        font-size 14px
        padding-bottom 1px
    &>.nav-aside-list
      padding-left 0

  .nav-link
    height $header-height
    line-height $header-height
    text-decoration none
    color $medium
    padding-bottom 3px
    &:hover, &.router-link-active
      border-bottom 3px solid $green

  .menu-button
    float right
    width w = 24px
    height h = w
    margin-top (($header-height - h)/2)
    margin-right 10px
    @media screen and (min-width: 480px)
      &
        display none
</style>
