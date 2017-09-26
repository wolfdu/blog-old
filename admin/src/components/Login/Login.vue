<template>
  <div>
    <header class="banner">
      <img src="../../assets/img/logo.png" class="banner-logo" alt="logo">
    </header>
    <div class="center-box">
      <div class="flash-bar danger" v-if="loginError">登录失败 {{loginErrorMsg}}</div>
      <div class="login-box">
        <div class="login-header">
          <h3>
            博客后台登录
          </h3>
        </div>
        <div class="login-body">
          <input type="text" class="form-control top" placeholder="用户名" v-model="username">
          <input type="password" class="form-control bottom" placeholder="密码" v-model="password" @keyup.13="login">
        </div>
        <div class="login-footer">
          <div class="login-button-Container">
            <button class="btn btn-save btn-block" @click="login">
              登录
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
        username: '',
        password: '',
        loginError: false,
        loginErrorMsg: ''
      }
    },
    methods: {
      ...mapActions([
        'createToken'
      ]),
      login () {
        console.log('i am login')
        let param = {username: this.username, password: this.password}
        this.createToken(param)
          .catch(err => {
            console.log(err)
            this.loginErrorMsg = err.message
            this.loginError = true
          })
      }
    }
  }

</script>

<style lang="stylus">
  @import '../../stylus/_settings.styl'
  .banner
    padding 10px 0
    text-align center
    border-bottom 1px solid #EEE
    margin-bottom 20px
    .banner-logo
      height 35px

  .center-box
    max-width 400px
    margin 0 auto
    padding 32px 15px
    .login-box
      background #fafafa
      border-radius 10px
      box-shadow 0 0px 2px #CCC
      padding 15px
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
</style>
