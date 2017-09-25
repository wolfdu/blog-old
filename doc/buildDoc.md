# build doc

> 用于记录blog搭建过程和遇到的坑。

整体分为3个部分：

1. client--前端为blog展示博
2. admin--前端为blog管理平台
3. server--后端，为client和admin提供接口服务

## 1. 使用[vue-cli](https://github.com/vuejs/vue-cli)初始化vue工程

所这里初始化前端项目，使用了vue-cli，让后改造了一下搭建了两个前端vue的框架。

这里主要是修改刚刚生成文件中相关配置具体修改如下：

client/build/webpack.base.conf.js

*  webpack基础陪着的entry配置，配置为对应的入口起点为
*  这里还需要配置开发阶段的entry
*  修改template文件路径
*  dev-server下静态文件路径
*  修改package文件下打包命令和对应的启动命令

## Login

### node

[__dirname](http://nodejs.cn/api/modules.html#modules_dirname)当前模块的文件夹名称。

[path.resolve([...paths])](http://nodejs.cn/api/path.html#path_path_resolve_paths)
方法会把一个路径或路径片段的序列解析为一个绝对路径。

### windows

解决端口占用情况：

1. netstat -aon|findstr "8181" ；查看占用端口的进程号
2. tasklist|findstr "8181" ；根据进程号查找进程：node.exe
3. taskkill /f /t /im node.exe ；ok干掉进程即可

### vue 2.X

> [Vue warn] : You are using the runtime-only build of Vue where the template option is not available. Either pre-compile the templates into render functions, or use the compiler-included build. (found in root instance)

vue使用template后控台异常，[解决方案](https://stackoverflow.com/questions/39488660/vue-js-2-0-not-rendering-anything)

在解决方案中：

    import Vue from 'vue/dist/vue.js'

这样import还是会出现异常，但是在webpack中配置别名就OK了（具体原因后续再分析）。

### vuex




