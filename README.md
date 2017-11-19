# blog

技术栈：
 * koa v2.x
 * vue v2.x全家桶
 * mongodb by mongoose


关于整个项目结构
整个项目分为两个前端子项目admin,blog和一个后台server，都是相互独立的项目。

## admin
初始账号：admin
密码：password
blog的后台管理，功能类似于印象笔记，会对草稿进行实时的保存。后面可能会加上数据监控，备忘录，任务表这些东西。

![admin](http://oyf26dx0a.bkt.clouddn.com/image/blog/new-blog/admin.jpg)

当草稿修改满意后可以点击发布，将文章发布到blog进行展示。

admin主要使用vue全家桶，系统学习了一下vuex，受益颇多。但是感觉现在项目中的处理过程还有一些复杂，找机会重构一波👹

md编辑器用[simplemde](https://github.com/sparksuite/simplemde-markdown-editor)实现。

## blog
blog前端展示也就，功能相对admin就比较简单。

![](http://oyf26dx0a.bkt.clouddn.com/image/blog/new-blog/blog-page.jpg)

由于功能比较简单就只使用了vue并没有用全家桶。
比较花时间的是样式调整和学习，这里沿用了Chuck安利的[stylus](http://stylus-lang.com/)

## server

server 为admin和blog提供接口，采用[restful](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)风格。
admin的建权使用了[jwt](https://github.com/auth0/node-jsonwebtoken)实现了token建权。

## 开发

    npm install

    // 要先启动mongodb，再启动server
    npm run dev-server

    // run admin
    npm run dev-admin

    // run client
    npm run dev-client
