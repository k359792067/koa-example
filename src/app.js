const Koa = require('koa')
const router = require('./middleware/router')
const logger = require('./middleware/logger')
const jwtRefresh = require('./middleware/jwt-refresh')
const serve = require('koa-static')
const cors = require('@koa/cors')
const jwt = require('koa-jwt')
const koaBody = require('koa-body')
const jwtConfig = require('../config/jwt.config')
const path = require('path')
const app = new Koa()

// try-catch 中间件
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if( process.env.NODE_ENV == 'development' ) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
    ctx.throw(err.status || 500, err.message, {
      expose: true
    })
  }
})

// 日志中间件
app.use(logger())

// 静态资源加载中间件
app.use(serve(path.dirname(__dirname) + '/dist'))

// 跨域中间件
app.use(cors({
  credentials: true,
  exposeHeaders: ['authorization']
}))

// jwt刷新
app.use(jwtRefresh())

// jwt中间件
app.use(jwt({
  secret: jwtConfig.secret
}).unless({
  path: jwtConfig.unlessPath
}))

// http请求解析中间件
app.use(koaBody({
  multipart: true
}))

// 路由中间件
app.use(router.routes(), router.allowedMethods())

module.exports = app
