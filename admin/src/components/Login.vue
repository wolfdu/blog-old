<template>
  <div>
    <header class="banner">
      <h3 class="title-class">
        Welcome Wolfdu Blog Admin
      </h3>
      <icon id="animation" name="chameleon" class="banner-logo" scale="20"></icon>
    </header>
    <div class="center-box">
      <div class="login-box">
        <div class="login-header">
        </div>
        <div class="login-body">
          <input type="text" class="form-control top" placeholder="Username" v-model="user.username">
          <input type="password" class="form-control bottom" placeholder="Password" v-model="user.password" @keyup.13="login">
        </div>
        <div class="login-footer">
          <div class="login-button-Container">
            <button class="btn btn-save btn-block" @click="login">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'createToken'
      ]),
      login () {
        this.createToken(this.user)
      }
    }
  }

</script>

<style lang="stylus">
  @import '../stylus/_settings.styl'
  .banner
    padding 10px 0
    text-align center
    margin-bottom 20px
    .banner-logo
      height 95px
      width 75px

  .title-class
    padding-top 20px

  .center-box
    max-width 400px
    margin 0 auto
    padding 32px 15px
    .login-box
      background #fafafa
      border 1px solid #ccc
      border-radius 10px
      box-shadow 0 10px 10px #CCC
      padding 15px
      transition all 0.3s ease
      &:hover
        border 1px solid rgba(82, 168, 236, 0.6)
        box-shadow: 0 0 12px rgba(82, 168, 236, 0.6)
      .login-header
        text-align center
        line-height 1.5
        margin 0 0 10px 0
      .login-button-Container
        width 200px
        margin 0 auto

  .flash-bar
    box-sizing border-box
    width 100%
    padding 15px
    color #fff
    border 1px solid transparent
    border-radius: 6px;
    margin-bottom: 10px;
    &.success
      background-color $blue
      border-color $blue
    &.danger
      background-color $red
      border-color $red
    &.info
      background-color $darkGrey
      border-color $darkGrey
      text-align center

  .btn
    cursor pointer
    border 1px solid transparent
    border-radius 3px
    padding 6px 10px
    text-align center
    vertical-align middle
    outline 0
    &.btn-save
      color #fff
      background-color $green
      border-color $green
    &.btn-info
      color #fff
      background-color $grey
      border-color $grey
    &.btn-border
      color $dark
      background-color white
      border-color $grey
      &:hover
        border-color $green
    &.btn-cancel
      color #fff
      background-color $red
      border-color $red
    &.btn-block
      width 100%
      box-sizing border-box

  .form-control
    color $black
    box-sizing border-box
    padding 10px 8px
    width 100%
    height auto
    box-shadow none
    border 1px solid $border
    background-color #fff
    outline 0
    &.top
      border-radius 5px 5px 0 0
      margin-bottom 0
    &.bottom
      border-radius 0 0 5px 5px
      border-top 0
      margin-bottom 20px

  #animation
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
