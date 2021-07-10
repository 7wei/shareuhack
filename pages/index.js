import { Grid, Link, Box } from '@material-ui/core'
import { getAllPosts, getPostBySlug, getPostsBySlugs } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import InfoCard from '../src/components/Card/InfoCard'
import { TYPE } from 'theme/index'
import Divider from '../src/components/Divider/Divider'
import { formattedDate } from '../src/utils/index'
import HeroPost from '../src/components/Post/HeroPost'

export default function Index({ allPosts, heroPost, relatedPosts }) {
  return (
    <>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>
      <Grid container spacing={3}>
        <Grid item sm={3}>
          <InfoCard>
            <TYPE.bold mb="15px">What we do...</TYPE.bold>
            <TYPE.body>
              我們熱衷於研究、分享並實際測試實用的知識、生活密技，幫助你效率的做好每件事，成為LifeHacker！ <br />
              <Link href="#">了解更多</Link>
            </TYPE.body>
          </InfoCard>
          <Divider />
          <TYPE.header mt="15px" mb="15px">
            LATEST
          </TYPE.header>
          <Box display="grid" gridGap="8px">
            {allPosts.slice(0, 5).map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <TYPE.bold>{post.title}</TYPE.bold>
                <TYPE.primary>{formattedDate(post.date)}</TYPE.primary>
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
          <Box display="grid" gridGap="8px">
            {allPosts.slice(0, 5).map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <TYPE.bold>{post.title}</TYPE.bold>
                <TYPE.primary>{formattedDate(post.date)}</TYPE.primary>
              </Link>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt'])
  const heroPost = getPostBySlug('what-is-lifehacker', ['title', 'slug', 'coverImage', 'excerpt', 'related'])
  const relatedPosts = getPostsBySlugs(heroPost.related, ['title', 'slug'])

  console.log(relatedPosts)

  return {
    props: { allPosts, heroPost, relatedPosts },
  }
}
