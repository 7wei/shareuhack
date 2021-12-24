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
    // if (path.includes('zh-MO') || path.includes('zh-HK') || path.includes('en-GB') || path.includes('en-SG')) {
    //   return
    // }

    if (path !== '/' && !path.includes('zh-TW')) {
      return
    }

    return {
      loc: path.replace('/zh-TW', ''), // => this will be exported as http(s)://<config.siteUrl>/<path>
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
