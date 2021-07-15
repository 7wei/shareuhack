import { Grid, Box } from '@material-ui/core'
import { getAllPosts, getPostBySlug, getPostsBySlugs, getCategoryPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME, Categories, Routes } from '../lib/constants'
import InfoCard from '../src/components/InfoCard.tsx/InfoCard'
import { TYPE } from 'theme/index'
import Divider from '../src/components/Divider/Divider'
import { formattedDate } from '../src/utils/index'
import HeroPost from '../src/components/Post/HeroPost'
import PostPreview from '../src/components/Post/PostPreview'
import useBreakpint from '../src/hooks/useBreakpoint'
import Link from '../src/components/Link/Link'
import PreviewRow from '../src/components/Post/PreviewRow'

export default function Index({ allPosts, heroPost, relatedPosts, categories }) {
  const { matches } = useBreakpint()
  return (
    <>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Grid container spacing={3}>
        <Grid item sm={3}>
          <InfoCard>
            <TYPE.bold mb="15px">WHAT WE DO</TYPE.bold>
            <TYPE.body>
              我們熱衷於研究、分享並實際測試實用的知識、生活密技，幫助你效率的做好每件事，成為LifeHacker！ <br />
              <Link href={Routes.about}>--了解更多</Link>
            </TYPE.body>
          </InfoCard>
          {matches && (
            <InfoCard>
              <TYPE.bold mb="15px">HOW WE DO</TYPE.bold>
              <TYPE.body>
                每篇文章，我們都會做足功課，包括大量閱讀文章、實際觀看課程、專家訪談等等，確保我們產出的內容，是與時俱進的
                <br />
                <Link href={Routes.about}>--了解更多</Link>
              </TYPE.body>
            </InfoCard>
          )}
          <Divider />
          <TYPE.header mt="15px" mb="15px">
            LATEST
          </TYPE.header>
          <Box display="grid" gridGap="8px">
            {allPosts.slice(0, 5).map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} underline="none">
                <>
                  <TYPE.bold>{post.title}</TYPE.bold>
                  <TYPE.primary>{formattedDate(post.date)}</TYPE.primary>
                </>
              </Link>
            ))}
          </Box>
        </Grid>
        <Grid item sm={6}>
          <HeroPost {...heroPost} relatedPosts={relatedPosts} />
        </Grid>
        <Grid item sm={3}>
          <Divider />
          <TYPE.header mt="15px" mb="15px">
            HOTTEST
          </TYPE.header>
          <Box display="grid" gridGap="8px" mb="15px">
            {allPosts.slice(0, 5).map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} underline="none">
                <>
                  <TYPE.bold>{post.title}</TYPE.bold>
                  <TYPE.primary>{formattedDate(post.date)}</TYPE.primary>
                </>
              </Link>
            ))}
          </Box>
          {!matches && (
            <InfoCard>
              <TYPE.bold mb="15px">HOW WE DO</TYPE.bold>
              <TYPE.body>
                每篇文章，我們都會做足功課，包括大量閱讀文章、實際觀看課程、專家訪談等等，確保我們產出的內容，是與時俱進的
                <br />
                <Link href={Routes.about}>--了解更多</Link>
              </TYPE.body>
            </InfoCard>
          )}
        </Grid>
      </Grid>
      {categories.map(({ title, description, posts, link }) => (
        <Box key={title} mb="15px">
          <Divider primary="true" />
          <PreviewRow category={title} description={description} posts={posts} link={link} />
        </Box>
      ))}
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'category', 'date', 'slug', 'author', 'coverImage', 'excerpt'])
  const heroPost = getPostBySlug('what-is-lifehacker', ['title', 'slug', 'coverImage', 'excerpt', 'related'])
  const relatedPosts = getPostsBySlugs(heroPost.related, ['title', 'slug'])
  const categories = Categories.map(({ title, description, link }) => {
    const posts = getCategoryPosts(title, ['title', 'coverImage', 'date', 'excerpt', 'slug']).slice(0, 3)
    return {
      title,
      description,
      posts,
      link,
    }
  })

  return {
    props: { allPosts, heroPost, relatedPosts, categories },
  }
}
