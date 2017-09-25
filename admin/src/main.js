// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './stylus/index.styl'
import Vue from 'vue'
import {router} from './router'
import MessageBox from 'vue-msgbox'
import App from './App'

/**
 * router的beforeEach操作之所以放在main里面,而不是把所有与router相关的都放在router.js里面
 * 是因为涉及到循环引用的问题,router引了store,store引了router,
 * 循环引用的话会出现的情况参见:http://es6.ruanyifeng.com/#docs/module#循环加载
 * 导致store在login组件拿到的是个空对象,所以就让router.js提前执行完毕,把router.beforeEach放这了.
 * */

window.alert = MessageBox

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
