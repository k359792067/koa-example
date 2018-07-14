const Router = require('koa-router')
const router = new Router({
})
  
router.get('/user', async (ctx) => {
  ctx.body = 'hello world'
})
  
module.exports = router
  