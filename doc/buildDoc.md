# build doc

> 用于记录blog搭建过程和遇到的坑。

整体分为3个部分：

1. client--前端为blog展示博
2. admin--前端为blog管理平台
3. server--后端，为client和admin提供接口服务

## 1. 使用[vue-cli](https://github.com/vuejs/vue-cli)初始化vue工程

所这里初始化前端项目，使用了vue-cli，让后改造了一下搭建了两个前端vue的框架。

这里主要是修改刚刚生成文件中相关配置具体修改如下：

admin/build/webpack.base.conf.js

  webpack的entry配置，配置为对应的入口起点




