import { Grid, Box, Typography, Button } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getSubCategoryPosts, getAllSubCategoryPaths } from '../../lib/api'
import { SubCategories, SubCategory, Routes, CMS_NAME, HOME_OG_IMAGE_URL } from '../../lib/constants'
import PostReview from '../../src/components/Post/PostPreview'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import InfoCard from '../../src/components/InfoCard/InfoCard'
import Link from '../../src/components/Link/Link'
import Divider from '../../src/components/Divider/Divider'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function SubCategoryPage({ subCategory, posts }) {
  const isDownMd = useBreakpoint('md')
  const { t } = useTranslation('common')
  const { locale, locales } = useRouter()

  return (
    <>
      <Head>
        <title>
          {CMS_NAME} | {t(`subCategories.${subCategory.key}.title`)}
        </title>
        <meta name="robots" content="noindex" />
        <meta name="description" content={t(`subCategories.${subCategory.key}.description`)} />
        <meta property="og:title" content={`${CMS_NAME}-${t(`subCategories.${subCategory.key}.title`)}`} />
        <meta property="og:description" content={t(`subCategories.${subCategory.key}.description`)} />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      </Head>
      {/* <Disclosure /> */}
      <Grid container>
        <Grid item sm={9} mb={isDownMd ? 15 : 0}>
          <Typography fontSize={36} fontWeight={700} component="h1">
            {t(`subCategories.${subCategory.key}.title`)}
          </Typography>
          <Typography variant="body1">{t(`subCategories.${subCategory.key}.description`)}</Typography>
        </Grid>
        <Grid item sm={3}>
          {!isDownMd && (
            <InfoCard title={t('whatWeDo')}>
              <Typography fontWeight={500}>
                {t('whatWeDoDescript')}
                <br />
                <Link href={Routes.about} locale={locale}>
                  --{t('learnMore')}
                </Link>
              </Typography>
            </InfoCard>
          )}
        </Grid>
      </Grid>
      <Divider primary />
      <Box mt="15px" mb="15px">
        <Grid spacing={15} container>
          {posts.map((post, idx) => (
            <Grid key={idx} item sm={4}>
              <PostReview {...post} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: {
            xs: 'center',
            md: 'flex-start',
          },
          mt: 60,
          mb: 60,
        }}
      >
        <Button color="primary" variant="contained" sx={{ fontWeight: 500, fontSize: 18 }} href="/">
          Explore More
        </Button>
      </Box>
    </>
  )
}

export async function getStaticProps({ params, locale }) {
  const subCategory = SubCategories.filter((subCategory) => subCategory.key === SubCategory[params.subCategory])[0]
  const posts =
    getSubCategoryPosts(params.subCategory, ['title', 'date', 'excerpt', 'slug', 'coverImage'], locale) || []
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      subCategory,
      posts,
    },
  }
}

export async function getStaticPaths({ locales }) {
  const paths = getAllSubCategoryPaths(locales)

  return {
    paths,
    fallback: false,
  }
}
