import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Grid, Box, Typography, useTheme } from '@mui/material'
import { getAllPosts, getPostBySlug, getPostsBySlugs, getCategoryPosts, getHotPosts, getAbout } from '../lib/api'
import { CMS_NAME, Categories, HOME_OG_IMAGE_URL, Routes } from '../lib/constants'
import Divider from '../src/components/Divider/Divider'
import { formattedDate } from '../src/utils/index'
import HeroPost from '../src/components/Post/HeroPost'
import useBreakpint from '../src/hooks/useBreakpoint'
import Link from '../src/components/Link/Link'
import PreviewRow from '../src/components/Post/PreviewRow'
import CommonStructuredData from '../src/components/CommonStructuredData'
import ReactLazyHydrate from 'react-lazy-hydration'
import InfoCard from '../src/components/InfoCard/InfoCard'

export default function Index({ allPosts, hotPosts, heroPost, categories, locale }) {
  const isDownMd = useBreakpint('md')

  const { t } = useTranslation('common')
  const theme = useTheme()

  return (
    <>
      <Head>
        <title>
          {CMS_NAME} | {t('pageTitle')}
        </title>
        <meta name="description" content={t('whatWeDoDescript')} />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${CMS_NAME}|${t('pageTitle')}`} />
        <meta property="og:description" content={t('whatWeDoDescript')} />
        <meta property="twitter:title" content={`${CMS_NAME}|${t('pageTitle')}`} />
        <meta property="twitter:description" content={t('whatWeDoDescript')} />
        <meta property="twitter:card" content="summary" />
      </Head>
      <CommonStructuredData type="home" />
      <Grid container spacing={{ xs: 15, lg: 30, xl: 35 }} mb={48} pt={15}>
        <Grid item xs={12} md={9}>
          <HeroPost {...heroPost} />
        </Grid>

        <Grid item xs={12} md={3}>
          <Divider primary />
          <Typography variant={isDownMd ? 'h5' : 'h6'} color="primary" mt="15px" mb="15px" component="h2">
            {t('latest')}
          </Typography>
          <Box display="flex" gap={16} flexDirection="column" sx={{ wordWrap: 'break-word' }}>
            {allPosts.slice(0, 5).map((post, idx) => (
              <Box key={idx}>
                <Link key={post.slug} href={`/posts/${post.slug}`} locale={locale} color={theme.palette.text.primary}>
                  <Typography component="h3" variant="h6" lineHeight={1.2}>
                    {post.title}
                  </Typography>
                </Link>
                <Typography color={theme.palette.text.secondary} variant="body2" mt={5}>
                  {formattedDate(post.updatedAt)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Divider primary />
          <Typography variant="h5" mt="15px" mb="15px" color="primary">
            {t('hottest')}
          </Typography>
          <Grid container spacing={24} sx={{ wordWrap: 'break-word' }}>
            {hotPosts.slice(0, 5).map((post, idx) => (
              <Grid key={idx} item xs={12} md={6}>
                <Link key={post.slug} href={`/posts/${post.slug}`} locale={locale} color={theme.palette.text.primary}>
                  <Typography component="h3" variant="h3">
                    {post.title}
                  </Typography>
                </Link>
                <Typography variant="body2" color={theme.palette.text.secondary} mt={6}>
                  {formattedDate(post.updatedAt)}
                </Typography>
                <Box
                  mr="10px"
                  mt="8px"
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Typography variant="body1">{post.excerpt}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Divider primary />
          <InfoCard
            title={t('whatWeDo')}
            link={Routes.about}
            linkText={`${t('learnMore')}`}
            content={t('whatWeDoDescript')}
          ></InfoCard>
        </Grid>
      </Grid>
      {categories.map(({ key, posts, link }) => {
        if (posts.length > 0) {
          return (
            <ReactLazyHydrate key={key} whenVisible>
              <Box mb="15px" mt="15px">
                <Divider color="#00000020" />
                <PreviewRow
                  category={t(`categories.${key}.title`)}
                  description={t(`categories.${key}.description`)}
                  posts={posts}
                  link={link}
                  simple
                />
              </Box>
            </ReactLazyHydrate>
          )
        }
      })}
    </>
  )
}

export async function getStaticProps({ locale }) {
  const allPosts = getAllPosts(
    ['title', 'category', 'publishedAt', 'updatedAt', 'slug', 'author', 'coverImage', 'excerpt'],
    locale
  )

  const heroPost = getAbout(['title', 'updatedAt', 'excerpt', 'coverImage', 'ogImage'], locale)
  // const heroPost = getPostBySlug(HERO_POST_SLUG, ['title', 'slug', 'coverImage', 'excerpt', 'related'], locale)
  const hotPosts = getHotPosts(['title', 'category', 'updatedAt', 'slug', 'author', 'coverImage', 'excerpt'], locale)
  const relatedPosts = (heroPost.related && getPostsBySlugs(heroPost.related, ['title', 'slug'], locale)) || []
  const categories = Categories.map(({ key, link }) => {
    const posts = getCategoryPosts(key, ['title', 'coverImage', 'updatedAt', 'excerpt', 'slug'], locale).slice(0, 3)
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
      hotPosts,
    },
  }
}
