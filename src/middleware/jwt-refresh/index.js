const jwt = require('jsonwebtoken')
const jwtConfig = require('../../../config/jwt.config')

function refreshToken (ctx) {
  if (ctx.state.user) {
    const now = Math.floor(Date.now() / 1000)
    const timeToExpire = (ctx.state.user.exp - now)
    let newToken
    // 距离token过期时间不足6小时则刷新token
    if (timeToExpire < jwtConfig.timeToExpire) {
      delete ctx.state.user.exp.exp
      delete ctx.state.user.exp.iat
      newToken = jwt.sign(ctx.state.user, jwtConfig.secret, {
        expiresIn: '1d'
      })
      ctx.set({
        'authorization': `Bearer ${newToken}`
      })
    }
  }
}

function checkUnlessPath (path) {
  let flag = true
  for (var i = 0; i < jwtConfig.unlessPath.length; i++) {
    if (!new RegExp(jwtConfig.unlessPath[i]).test(path)) {
      continue
    } else {
      flag = false
      break
    }
  }
  return flag
}

module.exports = function () {
  return async function (ctx, next) {
    await next()
    if (checkUnlessPath(ctx.originalUrl)) {
      refreshToken(ctx)
    }
  }
}
