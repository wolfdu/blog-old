'use strict'
const Koa = require('koa')
const loggerAsync = require('./middleware/logger-async')
const bodyParser = require('koa-bodyparser')
// const fs = require('fs')
const app = new Koa()

app.use(loggerAsync())
app.use(bodyParser())

app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    // get request form
    let html = `
    <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
     `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    // post request get form data by koa-bodyParser
    let postData = ctx.request.body
    ctx.body = postData
  } else {
    ctx.body = `<h1>404！！！ o(╯□╰)o</h1>`
  }
})

app.listen(3000, () => {
  console.log('[demo] start-quick is starting at port 3000')
})

