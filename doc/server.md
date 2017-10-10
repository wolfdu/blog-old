# server

server主要为admin和client提供服务，基于koa2实现。

## Login Token

server login 验证流程：

前端登陆`api/token`访问server，验证并创建token

以下几个问题：

1. 跨域请求的问题，解决方案:[koa-cors](https://github.com/evert0n/koa-cors)

2. [token](https://github.com/auth0/node-jsonwebtoken)

3. mongoose

### koa2

async/await 异步函数调用


### node

