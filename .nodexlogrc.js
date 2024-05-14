module.exports = {
  local: {
    stdout: true,
    basePath: 'logs',
    level: 'info'
  },
  // stable: {
  //   basePath: '/home/xiaoju/logs/timerserver/',
  //   level: 'info'
  // },
  online: {
    basePath: '/home/xiaoju/logs/timerserver/',
    level: 'info',
    mongo: false
  }
}
