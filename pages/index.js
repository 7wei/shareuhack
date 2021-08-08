import { Grid, Box } from '@material-ui/core'
import { getAllPosts, getPostBySlug, getPostsBySlugs, getCategoryPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME, Categories, Category, Routes, HERO_POST_SLUG, HOME_OG_IMAGE_URL } from '../lib/constants'
import InfoCard from '../src/components/InfoCard/InfoCard'
import { TYPE } from 'theme/index'
import Divider from '../src/components/Divider/Divider'
import { formattedDate } from '../src/utils/index'
import HeroPost from '../src/components/Post/HeroPost'
import useBreakpint from '../src/hooks/useBreakpoint'
import Link from '../src/components/Link/Link'
import PreviewRow from '../src/components/Post/PreviewRow'
import Disclosure from '../src/components/Disclosure/Disclosure'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Index({ allPosts, heroPost, relatedPosts, categories, locale }) {
  const { matches } = useBreakpint()

  // const router = useRouter()
  // const { locale } = router
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{CMS_NAME}</title>
        <meta name="description" content={t('whatWeDoDescript')} />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      </Head>
      <Disclosure />
      <Grid container spacing={3}>
        <Grid item sm={3}>
          <InfoCard>
            <TYPE.bold mb="15px">{t('whatWeDo')}</TYPE.bold>
            <TYPE.body>
              {t('whatWeDoDescript')} <br />
              <Link href={Routes.about}>--{t('learnMore')}</Link>
            </TYPE.body>
          </InfoCard>
          {matches && (
            <InfoCard>
              <TYPE.bold mb="15px">{t('howWeDo')}</TYPE.bold>
              <TYPE.body>
                {t('howWeDoDescript')}
                <br />
                <Link href={Routes.about}>--{t('learnMore')}</Link>
              </TYPE.body>
            </InfoCard>
          )}
          <Divider />
          <TYPE.header mt="15px" mb="15px">
            LATEST
          </TYPE.header>
          <Box display="grid" gridGap="8px">
            {allPosts.slice(0, 5).map((post) => (
              <Link key={post.slug} href={`/${locale}/posts/${post.slug}`} underline="none">
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
              <Link key={post.slug} href={`/${locale}/posts/${post.slug}`} underline="none">
                <>
                  <TYPE.bold>{post.title}</TYPE.bold>
                  <TYPE.primary>{formattedDate(post.date)}</TYPE.primary>
                </>
              </Link>
            ))}
          </Box>
          {!matches && (
            <InfoCard>
              <TYPE.bold mb="15px">{t('howWeDo')}</TYPE.bold>
              <TYPE.body>
                {t('howWeDoDescript')}
                <br />
                <Link href={Routes.about}>--{t('learnMore')}</Link>
              </TYPE.body>
            </InfoCard>
          )}
        </Grid>
      </Grid>
      {categories.map(({ key, posts, link }) => {
        if (posts.length > 0) {
          return (
            <Box key={key} mb="15px">
              <Divider primary="true" />
              <PreviewRow category={t(`${key}`)} description={t(`${key}Descript`)} posts={posts} link={link} />
            </Box>
          )
        }
      })}
    </>
  )
}

export async function getStaticProps({ locale }) {
  const allPosts = getAllPosts(['title', 'category', 'date', 'slug', 'author', 'coverImage', 'excerpt'], locale)
  const heroPost = getPostBySlug(HERO_POST_SLUG, ['title', 'slug', 'coverImage', 'excerpt', 'related'], locale)
  console.log('hero')
  console.log(heroPost)
  const relatedPosts = (heroPost.related && getPostsBySlugs(heroPost.related, ['title', 'slug'], locale)) || []
  const categories = Categories.map(({ key, link }) => {
    console.log(key)
    // const category = Object.keys(Category).find((key) => Category[key] === title)
    const posts = getCategoryPosts(key, ['title', 'coverImage', 'date', 'excerpt', 'slug'], locale).slice(0, 3)
    console.log(posts)
    return {
      key,
      link,
      posts,
    }
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      allPosts,
      heroPost,
      relatedPosts,
      categories,
      locale,
    },
  }
}
