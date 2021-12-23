const siteUrl = 'https://www.shareuhack.com'

function getPriority(path) {
  if (path === '/' || path === '/zh-TW') {
    return 1.0
  }

  if (path.includes('/zh-TW/posts')) {
    return 0.8
  }

  return 0.7
}

module.exports = {
  siteUrl,
  changefreq: 'daily',
  // priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  alternateRefs: [],
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: getPriority(path),
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  additionalPaths: async (config) => [],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      // {
      //   userAgent: 'test-bot',
      //   allow: ['/path', '/path-2'],
      // },
      // {
      //   userAgent: 'black-listed-bot',
      //   disallow: ['/sub-path-1', '/path-2'],
      // },
    ],
    // additionalSitemaps: [
    //   'https://example.com/my-custom-sitemap-1.xml',
    //   'https://example.com/my-custom-sitemap-2.xml',
    //   'https://example.com/my-custom-sitemap-3.xml',
    // ],
  },
}
