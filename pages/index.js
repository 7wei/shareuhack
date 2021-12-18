import { useRouter } from 'next/router'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Grid, Box, styled, Typography, useTheme } from '@mui/material'
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

export default function Index({ allPosts, hotPosts, heroPost, relatedPosts, categories, locale }) {
  const { matches } = useBreakpint()

  const router = useRouter()
  const { locales } = router
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
        {locales.map((locale, idx) => (
          <link key={idx} rel="alternate" hrefLang={locale} href={process.env.NEXT_PUBLIC_BASE_URL + '/' + locale} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_BASE_URL} />
        {/* <link rel="canonical" href={url} /> */}
      </Head>
      <CommonStructuredData />
      {/* <Disclosure /> */}
      <Grid container spacing={15}>
        <Grid item sm={3}>
          <InfoCard title={t('whatWeDo')}>
            <Typography variant="body1">
              {t('whatWeDoDescript')} <br />
              <Link href={Routes.about} locale={locale}>
                --{t('learnMore')}
              </Link>
            </Typography>
          </InfoCard>
          {matches && (
            <InfoCard title={t('howWeDo')}>
              <Typography variant="body1">
                {t('howWeDoDescript')}
                <br />
                <Link href={Routes.about} locale={locale}>
                  --{t('learnMore')}
                </Link>
              </Typography>
            </InfoCard>
          )}
          <Divider />
          <Typography variant="h4" mt="15px" mb="15px">
            {t('latest')}
          </Typography>
          <Box display="flex" gap={8} flexDirection="column" sx={{ wordWrap: 'break-word' }}>
            {allPosts.slice(0, 5).map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                locale={locale}
                underline="none"
                color={theme.palette.text.primary}
              >
                <Typography fontWeight={500}>{post.title}</Typography>
                <Typography color={theme.palette.primary.main}>{formattedDate(post.date)}</Typography>
              </Link>
            ))}
          </Box>
        </Grid>
        <Grid item sm={6}>
          <HeroPost {...heroPost} relatedPosts={relatedPosts} />
        </Grid>
        <Grid item sm={3}>
          <Divider />
          <Typography variant="h4" mt="15px" mb="15px">
            {t('hottest')}
          </Typography>
          <Box display="grid" gap="8px" mb="15px" sx={{ wordWrap: 'break-word' }}>
            {hotPosts.slice(0, 5).map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                locale={locale}
                underline="none"
                color={theme.palette.text.primary}
              >
                <Typography fontWeight={500}>{post.title}</Typography>
                <Typography variant="body1" color={theme.palette.primary.main}>
                  {formattedDate(post.date)}
                </Typography>
              </Link>
            ))}
          </Box>
          {!matches && (
            <InfoCard title={t('howWeDo')}>
              <Typography variant="body1">
                {t('howWeDoDescript')}
                <br />
                <Link href={Routes.about} locale={locale}>
                  --{t('learnMore')}
                </Link>
              </Typography>
            </InfoCard>
          )}
        </Grid>
      </Grid>
      {categories.map(({ key, posts, link }) => {
        if (posts.length > 0) {
          return (
            <Box key={key} mb="15px">
              <Divider primary="true" />
              <PreviewRow
                category={t(`categories.${key}.title`)}
                description={t(`categories.${key}.description`)}
                posts={posts}
                link={link}
              />
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
