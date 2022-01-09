// pages/sitemap.xml.js
import { getServerSideSitemap } from 'next-sitemap'
import { getPostSlugs, getPostBySlug } from '../lib/api'

export const getServerSideProps = async (ctx) => {
  const slugs = getPostSlugs()

  const fields = slugs.map((slug) => {
    const post = getPostBySlug(slug, ['date'], 'zh-TW')

    return {
      loc: `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`,
      lastmod: new Date(post.date).toISOString(),
    }
  })

  return getServerSideSitemap(ctx, fields)
}
export default () => {}
