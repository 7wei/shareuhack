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
        destination: '/en',
        permanent: true,
      },
      {
        source: '/ja-JP',
        destination: '/ja',
        permanent: true,
      },
      {
        source: '/en-US/posts/:slug',
        destination: '/en/posts/:slug',
        permanent: true,
      },
      {
        source: '/en-GB/posts/:slug',
        destination: '/en/posts/:slug',
        permanent: true,
      },
      {
        source: '/en-SG/posts/:slug',
        destination: '/en/posts/:slug',
        permanent: true,
      },
      {
        source: '/ja-JP/posts/:slug',
        destination: '/ja/posts/:slug',
        permanent: true,
      },
    ]
  },
}
