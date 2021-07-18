import { Grid, Box } from '@material-ui/core'
import { getSubCategoryPosts } from '../../lib/api'
import { SubCategories, SubCategory, Routes, CMS_NAME, HOME_OG_IMAGE_URL } from '../../lib/constants'
import { TYPE } from '../../src/theme/index'
import PostReview from '../../src/components/Post/PostPreview'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import InfoCard from '../../src/components/InfoCard/InfoCard'
import Link from '../../src/components/Link/Link'
import Divider from '../../src/components/Divider/Divider'
import Disclosure from '../../src/components/Disclosure/Disclosure'
import Head from 'next/head'

export default function SubCategoryPage({ subCategory, posts }) {
  const { matches } = useBreakpoint()

  return (
    <>
      <title>
        {CMS_NAME} | {subCategory.title}
      </title>
      <meta name="description" content={subCategory.description} />
      <meta property="og:description" content={subCategory.description} />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      <Disclosure />
      <Grid container>
        <Grid item sm={9}>
          <TYPE.extraLargeHeader>{subCategory.title}</TYPE.extraLargeHeader>
          <TYPE.body>{subCategory.description}</TYPE.body>
        </Grid>
        <Grid item sm={3}>
          {!matches && (
            <InfoCard>
              <TYPE.bold mb="15px">WHAT WE DO</TYPE.bold>
              <TYPE.body>
                我們熱衷於研究、分享並實際測試實用的知識、生活密技，幫助你效率的做好每件事，成為LifeHacker！
                <br />
                <Link href={Routes.about}>--了解更多</Link>
              </TYPE.body>
            </InfoCard>
          )}
        </Grid>
      </Grid>
      <Divider primary />
      <Box mt="15px" mb="15px">
        <Grid container>
          {posts.map((post) => (
            <Grid item sm={4}>
              <PostReview {...post} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export async function getStaticProps({ params }) {
  const subCategory = SubCategories.filter((subCategory) => subCategory.title === SubCategory[params.subCategory])[0]
  const posts = getSubCategoryPosts(params.subCategory, ['title', 'date', 'excerpt', 'slug', 'coverImage']) || []
  return {
    props: {
      subCategory,
      posts,
    },
  }
}

export async function getStaticPaths() {
  const subCategories = Object.keys(SubCategory)

  return {
    paths: subCategories.map((subCategory) => {
      return {
        params: {
          subCategory,
        },
      }
    }),
    fallback: false,
  }
}
