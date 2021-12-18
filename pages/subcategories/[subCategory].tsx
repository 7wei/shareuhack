import { Grid, Box, Typography } from '@mui/material'
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
  const matches = useBreakpoint()
  const { t } = useTranslation('common')
  const { locale, locales } = useRouter()

  return (
    <>
      <Head>
        <title>
          {CMS_NAME} | {t(`subCategories.${subCategory.key}.title`)}
        </title>
        <meta name="description" content={t(`subCategories.${subCategory.key}.description`)} />
        <meta property="og:title" content={`${CMS_NAME}-${t(`subCategories.${subCategory.key}.title`)}`} />
        <meta property="og:description" content={t(`subCategories.${subCategory.key}.description`)} />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
        {locales.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + `/subcategories/${subCategory.key}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={process.env.NEXT_PUBLIC_BASE_URL + `/subcategories/${subCategory.key}`}
        />
        {/* <link rel="canonical" href={url} /> */}
      </Head>
      {/* <Disclosure /> */}
      <Grid container>
        <Grid item sm={9}>
          <Typography variant="h1">{t(`subCategories.${subCategory.key}.title`)}</Typography>
          <Typography variant="body1">{t(`subCategories.${subCategory.key}.description`)}</Typography>
        </Grid>
        <Grid item sm={3}>
          {!matches && (
            <InfoCard>
              <Typography fontWeight={500} mb="15px">
                {t('whatWeDo')}
              </Typography>
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
        <Grid spacing={3} container>
          {posts.map((post, idx) => (
            <Grid key={idx} item sm={4}>
              <PostReview {...post} />
            </Grid>
          ))}
        </Grid>
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
