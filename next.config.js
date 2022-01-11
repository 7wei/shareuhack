const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  reactStrictMode: true,
  async redirects() {
    return [
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
        source: '/zh-HK',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en-GB',
        destination: '/',
        permanent: true,
      },
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
    ]
  },
}
