module.exports = {
  mongoConfig: {
    url: 'mongodb://localhost:27017/blog-production',
    opts: {
      user: '',
      pass: ''
    }
  },
  app: {
    port: 3001
  },
  'jwt': {
    'cert': 'blog-product'
  }
}
