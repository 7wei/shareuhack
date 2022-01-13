const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/en-US/posts/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/en-GB/posts/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/en-SG/posts/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/ja-JP/posts/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/zh-HK/posts/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
      {
        source: '/zh-TW/categories/:category',
        destination: '/categories/:category',
        permanent: true,
      },
      {
        source: '/zh-TW/about',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/zh-HK/about',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/zh-TW',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en-US',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ja-JP',
        destination: '/',
        permanent: true,
      },
      {
        source: '/ja',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        source: '/zh-HK',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en-GB',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
