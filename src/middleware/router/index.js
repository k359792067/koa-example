const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

const router = new Router({
  prefix: '/api'
})

/**
 * 扫描目录，挂载路由
 */
const addRoutes = () => {
  const routesUrl = path.join(__dirname, '../../routes')
  // 同步方法无所谓的，因为是在服务器跑起来之前就完成映射，不会有任何性能影响
  const routesDir = fs.readdirSync(routesUrl)
  routesDir.forEach((filename) => {
    const routerModel = require(path.join(routesUrl, filename))
    router.use(routerModel.routes(), routerModel.allowedMethods())
  })
}
addRoutes()

module.exports = router
