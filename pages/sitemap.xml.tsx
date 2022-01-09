// pages/sitemap.xml.js
import { getServerSideSitemap } from 'next-sitemap'
import { getPostSlugs, getPostBySlug } from '../lib/api'

export const getServerSideProps = async (ctx) => {
  const slugs = getPostSlugs()

  const main = [
    {
      loc: process.env.NEXT_PUBLIC_BASE_URL,
      lastmod: new Date('2022-01-09').toISOString(),
    },
    {
      loc: process.env.NEXT_PUBLIC_BASE_URL + '/about',
      lastmod: new Date('2022-01-09').toISOString(),
    },
  ]

  const PostFields = slugs.map((slug) => {
    const post = getPostBySlug(slug, ['updatedAt'], 'zh-TW')

    return {
      loc: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`,
      lastmod: new Date(post.updatedAt).toISOString(),
    }
  })

  const fields = [...main, ...PostFields]

  return getServerSideSitemap(ctx, fields)
}
export default () => {}
