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
        // locale: false,
      },
      {
        source: '/en-US',
        destination: '/en',
        permanent: true,
        locale: false,
      },
      {
        source: '/en-GB',
        destination: '/en',
        permanent: true,
        locale: false,
      },
      {
        source: '/en-SG',
        destination: '/en',
        permanent: true,
        locale: false,
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
        source: '/ja-JP',
        destination: '/ja',
        permanent: true,
        locale: false,
      },
      {
        source: '/ja-JP/posts/:slug',
        destination: '/ja/posts/:slug',
        permanent: true,
      },
    ]
  },
}
