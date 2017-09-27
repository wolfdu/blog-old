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

### vue 2.x

> [Vue warn] : You are using the runtime-only build of Vue where the template option is not available. Either pre-compile the templates into render functions, or use the compiler-included build. (found in root instance)

vue使用template后控台异常，[解决方案](https://stackoverflow.com/questions/39488660/vue-js-2-0-not-rendering-anything)

在解决方案中：

    import Vue from 'vue/dist/vue.js'

这样import还是会出现异常，但是在webpack中配置别名就OK了（具体原因后续再分析）。

### vuex 2.x

[vuex官方文档](https://vuex.vuejs.org/zh-cn/core-concepts.html)

在login模块中我首先需要的全局数据就是登陆折后的token。

所以我们需要通过vuex去管理token的状态。

`src/vuex/store.js`中通过state，mutations，actions初始化store。

由于使用单一状态树会导致store中的各个属性变得庞杂，所以这里采用了将store分成module的形式处理。
让每个模块有自己的各种状态和行为。
[vuex-module](https://vuex.vuejs.org/zh-cn/modules.html)

`src/vuex/modules`这里面会定义各个module的store然后统一在index中暴露，最后在store中注册。

#### module-token

[state](https://vuex.vuejs.org/zh-cn/state.html)vuex 是一个独立的state tree只有mutation才能修改

[mutation](https://vuex.vuejs.org/zh-cn/mutations.html)修改store中state唯一方式是提交mutation

每一个mutation都有一个事件类型Type。
我们统一将type维护到了`src/vuex/mutation_types.js`中方便维护。
在token模块中的mutation主要是token的一些操作（新建和删除）

相应的type会有对应的callback函数对状态进行相应的修改，callback函数接受state作为第一个参数。

[actions](https://vuex.vuejs.org/zh-cn/actions.html)区别于mutation，action提交的是mutation
而不是直接修改state。可以包含异步操作。

关于组建绑定的辅助函数可以参见[vuex的API文档](https://vuex.vuejs.org/zh-cn/api.html)

[参考文档](http://www.meckodo.com/#!/article/5886157b6d67c807096f6c8c)


### ES6

[对象扩展运算符](http://es6.ruanyifeng.com/#docs/object#对象的扩展运算符)

[关于模块的export和import](http://es6.ruanyifeng.com/#docs/module)

## server

server主要为admin和client提供服务，基于koa2实现。






