module.exports = {
  env: 'development',
  debug: true,
  mongoConfig: {
    url: 'mongodb://localhost:27017/blog-dev',
    opts: {
      user: '',
      pass: ''
    }
  },
  'jwt': {
    'cert': 'blog-dev'
  }
}
