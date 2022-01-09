// pages/sitemap.xml.js
import { getServerSideSitemap } from 'next-sitemap'
import { getPostSlugs, getPostBySlug } from '../lib/api'
import { Categories } from '../lib/constants'

export const getServerSideProps = async (ctx) => {
  const slugs = getPostSlugs()

  const main = [
    {
      loc: process.env.NEXT_PUBLIC_BASE_URL,
    },
    {
      loc: process.env.NEXT_PUBLIC_BASE_URL + '/about',
    },
  ]

  const categories = Categories.map((category) => {
    return {
      loc: process.env.NEXT_PUBLIC_BASE_URL + category.link,
    }
  })

  const posts = slugs.map((slug) => {
    const post = getPostBySlug(slug, ['updatedAt'], 'zh-TW')

    return {
      loc: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`,
      lastmod: new Date(post.updatedAt).toISOString(),
    }
  })

  const fields = [...main, ...categories, ...posts]

  return getServerSideSitemap(ctx, fields)
}
export default () => {}
