const path = require('path')
module.exports = {
  pm2: process.env.NODE_ENV === 'production', // 如果使用 pm2 -i 方式启动的 node 进程需要设置次为 true
  appenders: {
    errorLogger: { // 错误日志
      'type': 'file',
      'filename': path.resolve(__dirname, '../logs/error/error.log'),
      'maxLogSize': 1024 * 520,
      'backups': 8
    },

    resLogger: { // 响应日志
      'type': 'file',
      'filename': path.resolve(__dirname, '../logs/response/response.log'),
      'maxLogSize': 1024 * 1024 * 2,
      'backups': 8
    }
  },
  categories: {
    default: {
      appenders: ['resLogger'],
      level: 'info'
    },
    error: {
      appenders: ['errorLogger', 'resLogger'],
      level: 'error'
    }
  }
}
