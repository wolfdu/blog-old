<template>
  <div id="app" class="app">
    <background></background>
    <header-nav></header-nav>
    <div class="content">
      <transition name="slide-fade">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <footer-info></footer-info>
  </div>
</template>

<script>
  import HeaderNav from 'components/common/HeaderNav.vue'
  import FooterInfo from 'components/common/Footer.vue'
  import Background from 'components/common/Background.vue'
  export default {
    components: {
      HeaderNav,
      FooterInfo,
      Background
    }
  }
</script>

<style lang="stylus">
  @import "./stylus/_settings.styl"
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

  .app
    height 100%
  .content
    @media screen and (min-width 1200px)
      width 1170px
    @media screen and (min-width 992px) and (max-width 1200px)
      width 970px
    @media screen and (min-width 768px) and (max-width 992px)
      width 750px
    box-sizing border-box
    min-height 100%
    margin ($header-height + $header-padding-vertical * 2) auto 0 auto
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
</style>
