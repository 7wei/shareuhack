// pages/sitemap.xml.js
import { getAllPosts } from '../lib/api'
import { Categories } from '../lib/constants'

const Sitemap = () => {}
export const getServerSideProps = async ({ res }) => {
  const posts = getAllPosts(['slug', 'updatedAt', 'coverImage', 'title'], 'zh-TW').sort((post1, post2) =>
    post1.updatedAt > post2.updatedAt ? -1 : 1
  )

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <url>
      <loc>https://www.shareuhack.com</loc>
    </url>
    <url>
      <loc>https://www.shareuhack.com/about</loc>
      <lastmod>2022-01-23</lastmod>
    </url>
    ${Categories.map((category) => {
      return `
        <url>
          <loc>${process.env.NEXT_PUBLIC_BASE_URL + category.link}</loc>
        </url>
      `
    }).join('')}
    ${posts
      .map((post) => {
        return `
          <url>
            <loc>${process.env.NEXT_PUBLIC_BASE_URL + '/posts/' + post.slug}</loc>
            <lastmod>${post.updatedAt}</lastmod>
            <image:image>
              <image:loc>${process.env.NEXT_PUBLIC_BASE_URL + post.coverImage}</image:loc>
              <image:title>${post.title}</image:title>
            </image:image>
          </url>
        `
      })
      .join('')}
  </urlset>
`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default Sitemap
