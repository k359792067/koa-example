module.exports = {
  secret: 'secret',
  unlessPath: [
    /^\/api\/user/,
  ],
  // 距token过期时间不足多少秒则刷新token
  timeToExpire: 60 * 60 * 6
}
  