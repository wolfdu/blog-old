# blog

技术栈：
 * koa v2.x
 * vue v2.x全家桶
 * MongoDB by mongoos


#### *关于整个项目结构*
整个项目分为两个前端子项目admin,blog和一个后台server，都是相互独立的项目。

## admin
blog的后台管理，功能类似于印象笔记，会对草稿进行实时的保存。

![](http://oyf26dx0a.bkt.clouddn.com/image/blog/new-blog/Selection_002.jpg)

当草稿修改满意后可以点击发布，将文章发到blog展示。

使用vue全家桶，系统学习了一下vuex，受益颇多。但是感觉现在项目中的处理过程还有一些复杂，找机会重构一波👹

md编辑器用[simplemde](https://github.com/sparksuite/simplemde-markdown-editor)实现。

## blog
blog前端展示，功能相对admin就比较简单，有待以后开坑填坑🤥。

## server

 server 采用[restful](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)风格主要为admin和blog提供接口。

 admin的建权使用了[jwt](https://github.com/auth0/node-jsonwebtoken)实现了token建权。

