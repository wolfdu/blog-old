<template>
  <aside class="sidebar">
    <icon id="sidebar-logo" name="chameleon" class="sidebar-logo" scale="20"></icon>
    <nav class="aside-nav">
      <ul class="aside-nav-list">
        <li class="aside-nav-item"><a class="aside-nav-button" ><icon name="posts" class="iconfont" scale="3"></icon></a>  </li>
        <li class="aside-nav-item"><a class="aside-nav-button" ><icon name="tag" class="iconfont" scale="3"></icon></a> </li>
        <li class="aside-nav-item"><a class="aside-nav-button" ><icon name="evil" class="iconfont" scale="3"></icon></a> </li>
      </ul>
    </nav>
    <nav class="aside-menu">
      <ul class="aside-nav-list">
        <li class="aside-nav-item"><a class="aside-nav-button" @click="signOut"><icon name="signOut" class="iconfont" scale="3"></icon> </a></li>
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
        this.deleteToken(this.$router)
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .sidebar
    box-sizing border-box
    border-right 1px solid $border
    background-color #f8f8f8
    text-align center
    position fixed
    height 100%
    width 70px
    padding 12px 12px 24px 12px
    left 0
    top 0
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
    padding 0
    padding-top 10px
    border 1px solid $border
    border-radius 50%
    color $green
    &.active
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
