import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Grid, Box, Typography, useTheme } from '@mui/material'
import { getAllPosts, getPostBySlug, getPostsBySlugs, getCategoryPosts, getHotPosts } from '../lib/api'
import { CMS_NAME, Categories, Routes, HERO_POST_SLUG, HOME_OG_IMAGE_URL } from '../lib/constants'
import InfoCard from '../src/components/InfoCard/InfoCard'
import Divider from '../src/components/Divider/Divider'
import { formattedDate } from '../src/utils/index'
import HeroPost from '../src/components/Post/HeroPost'
import useBreakpint from '../src/hooks/useBreakpoint'
import Link from '../src/components/Link/Link'
import PreviewRow from '../src/components/Post/PreviewRow'
import CommonStructuredData from '../src/components/CommonStructuredData'
import ReactLazyHydrate from 'react-lazy-hydration'

export default function Index({ allPosts, hotPosts, heroPost, relatedPosts, categories, locale }) {
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
        <meta property="og:title" content={`${CMS_NAME} | ${t('pageTitle')}`} />
        <meta property="og:description" content={t('whatWeDoDescript')} />
      </Head>
      <CommonStructuredData type="home" />
      <Grid container spacing={{ lg: 30, xl: 35 }}>
        <Grid item sm={3} order={isDownMd ? 1 : 0}>
          {!isDownMd && (
            <InfoCard
              title={t('whatWeDo')}
              content={t('whatWeDoDescript')}
              link={Routes.about}
              linkText={`--${t('learnMore')}`}
            />
          )}
          <Divider primary />
          <Typography variant="h6" color="primary" mt="15px" mb="15px" component="h2">
            {t('latest')}
          </Typography>
          <Box display="flex" gap={8} flexDirection="column" sx={{ wordWrap: 'break-word' }}>
            {allPosts.slice(0, 5).map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} locale={locale} color={theme.palette.text.primary}>
                <Typography component="h3" variant="h6">
                  {post.title}
                </Typography>
                <Typography color={theme.palette.text.secondary} variant="body2">
                  {formattedDate(post.date)}
                </Typography>
              </Link>
            ))}
          </Box>
        </Grid>
        <Grid item sm={6} order={isDownMd ? 0 : 1}>
          {isDownMd && (
            <InfoCard link={Routes.about} content={t('whatWeDoDescript')} linkText={`--${t('learnMore')}`} />
          )}
          <HeroPost {...heroPost} relatedPosts={relatedPosts} />
        </Grid>
        <Grid item sm={3} order={2}>
          <Divider primary />
          <Typography variant="h6" mt="15px" mb="15px" component="h1" color="primary">
            {t('hottest')}
          </Typography>
          <Box display="grid" gap="8px" mb="15px" sx={{ wordWrap: 'break-word' }}>
            {hotPosts.slice(0, 5).map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`} locale={locale} color={theme.palette.text.primary}>
                <Typography component="h3" variant="h6">
                  {post.title}
                </Typography>
                <Typography variant="body2" color={theme.palette.text.secondary}>
                  {formattedDate(post.date)}
                </Typography>
              </Link>
            ))}
          </Box>
          {!isDownMd && (
            <>
              <Divider primary />
              <InfoCard
                title={t('howWeDo')}
                content={t('howWeDoDescript')}
                link={Routes.about}
                linkText={`--${t('learnMore')}`}
                bgColor="transparent"
              />
            </>
          )}
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
  const allPosts = getAllPosts(['title', 'category', 'date', 'slug', 'author', 'coverImage', 'excerpt'], locale)
  const heroPost = getPostBySlug(HERO_POST_SLUG, ['title', 'slug', 'coverImage', 'excerpt', 'related'], locale)
  const hotPosts = getHotPosts(['title', 'category', 'date', 'slug', 'author', 'coverImage', 'excerpt'], locale)
  const relatedPosts = (heroPost.related && getPostsBySlugs(heroPost.related, ['title', 'slug'], locale)) || []
  const categories = Categories.map(({ key, link }) => {
    // const category = Object.keys(Category).find((key) => Category[key] === title)
    const posts = getCategoryPosts(key, ['title', 'coverImage', 'date', 'excerpt', 'slug'], locale).slice(0, 3)
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
