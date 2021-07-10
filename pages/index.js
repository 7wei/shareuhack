import { Grid, Link, Box } from '@material-ui/core'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import InfoCard from '../src/components/InfoCard'
import { TYPE } from 'theme/index'
import Divider from '../src/components/Divider/Divider'
import { formattedDate } from '../src/utils/index'

export default function Index({ allPosts }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
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
          <TYPE.header mt="15px">最新文章</TYPE.header>
          <Box display="grid" gridGap="8px">
            {allPosts.slice(0, 5).map((post) => (
              <Link href={`/posts/${post.slug}`}>
                <TYPE.bold>{post.title}</TYPE.bold>
                <TYPE.primary>{formattedDate(post.date)}</TYPE.primary>
              </Link>
            ))}
          </Box>
        </Grid>
        <Grid item sm={6}>
          B
        </Grid>
        <Grid item sm={3}>
          C
        </Grid>
      </Grid>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt'])

  return {
    props: { allPosts },
  }
}
