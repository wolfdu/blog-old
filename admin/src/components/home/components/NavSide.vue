<template>
  <aside class="sidebar">
    <icon id="sidebar-logo" name="chameleon" class="sidebar-logo" scale="20"></icon>
    <nav class="aside-nav">
      <ul class="aside-nav-list">
        <li class="aside-nav-item"><router-link to="/dashboard" class="aside-nav-button">
          <i name="posts" class="fa fa-tachometer fa-2x" aria-hidden="true"></i>
        </router-link></li>
        <li class="aside-nav-item"><router-link to="/posts" class="aside-nav-button">
          <i name="posts" class="fa fa-linode fa-2x" aria-hidden="true"></i>
        </router-link></li>
        <li class="aside-nav-item"><router-link to="/tags" class="aside-nav-button">
          <i name="tag" class="fa fa-tags fa-2x" aria-hidden="true"></i>
        </router-link></li>
        <li class="aside-nav-item"><router-link to="/about" class="aside-nav-button">
          <i name="about" class="fa fa-user-secret fa-2x" aria-hidden="true"></i>
        </router-link></li>
        <li class="aside-nav-item"><a class="aside-nav-button" @click="signOut">
          <i name="signOut" class="fa fa-sign-out fa-2x fa-flip-horizontal" aria-hidden="true"></i>
        </a></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
  import {mapActions} from 'vuex'

  export default{
    methods: {
      ...mapActions([
        'deleteToken'
      ]),
      signOut () {
        this.deleteToken()
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../stylus/_settings.styl'
  .sidebar
    box-sizing border-box
    border-right 1px solid $border
    background-color #f8f8f8
    text-align center
    height 100%
    width 70px
    padding 12px 12px 24px 12px
    .aside-nav
      margin-top 30px
  .sidebar-logo
    margin-top 5px
    width 36px
  .aside-nav
    border-top 1px solid $border
  .aside-nav-list
    list-style none
    padding 0
  .aside-nav-item
    padding 20px 0
  .aside-nav-button
    cursor pointer
    display inline-block
    box-sizing border-box
    width 45px
    height 45px
    background #fff
    padding-top 7px
    border 1px solid $border
    border-radius 50%
    color $green
    &.router-link-active
      border 1px solid $green
    &:hover
      color white
      background $green
      border 1px solid $green
    .iconfont
      font-size 22px
      display inline
  .aside-menu
    position absolute
    width 100%
    left 0
    bottom 0

  #sidebar-logo
    animation changeColor 5s infinite linear

  @keyframes changeColor
    0%
      color red
    20%
      color yellow
    40%
      color blue
    60%
      color green
    80%
      color purple
    100%
      color gold
</style>
