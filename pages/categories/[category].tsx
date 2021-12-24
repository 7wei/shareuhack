import { Grid, Box, Typography, useTheme } from '@mui/material'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { Category, Categories, Routes, SubCategories, CMS_NAME, HOME_OG_IMAGE_URL } from '../../lib/constants'
import { getCategoryPosts, getAllCategoryPaths } from '../../lib/api'
import InfoCard from '../../src/components/InfoCard/InfoCard'
import Link from '../../src/components/Link/Link'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import PreviewRow from '../../src/components/Post/PreviewRow'
import Divider from '../../src/components/Divider/Divider'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function CategoryPage({ category, subCategories }) {
  const matches = useBreakpoint()
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const theme = useTheme()

  return (
    <>
      <Head>
        <title>
          {CMS_NAME} | {t(`categories.${category.key}.title`)}
        </title>
        <meta name="description" content={t(`categories.${category.key}.description`)} />
        <meta property="og:title" content={`${CMS_NAME}-${t(`categories.${category.key}.title`)}`} />
        <meta property="og:description" content={t(`categories.${category.key}.description`)} />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      </Head>
      {/* <Disclosure /> */}
      <Grid container>
        <Grid item sm={9}>
          <Typography fontSize={36} fontWeight={700} component="h1">
            {t(`categories.${category.key}.title`)}
          </Typography>
          <Typography fontSize={16}>{t(`categories.${category.key}.description`)}</Typography>
        </Grid>
        <Grid item sm={3}>
          {!matches && (
            <InfoCard title={t('whatWeDo')}>
              <Typography variant="body1">
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
      <Box mt={matches ? '15px' : 0}>
        {subCategories.map((subCategory, idx) => (
          <Box key={idx} mb="15px">
            <Divider primary />
            <PreviewRow
              category={t(`subCategories.${subCategory.key}.title`)}
              description={t(`subCategories.${subCategory.key}.description`)}
              posts={subCategory.posts}
              link={subCategory.link}
            />
          </Box>
        ))}

        {subCategories.length === 0 && (
          <Box height="calc(100vh - 580px)" display="flex" justifyContent="center" alignItems="center">
            <Typography color={theme.palette.primary.main} mb="15px" fontSize={18}>
              {t('stayTuned')}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  )
}

export async function getStaticProps({ params, locale }) {
  const category = Categories.find((category) => category.key === Category[params.category])
  const categoryPosts = getCategoryPosts(
    params.category,
    ['title', 'coverImage', 'date', 'excerpt', 'slug', 'subCategory'],
    locale
  )

  const subCategories = SubCategories.filter((el) => el.category === category.key).map(({ key }) => {
    const posts = categoryPosts.filter((post) => post.subCategory === key)
    const link = `/subcategories/${key}`
    return {
      key,
      posts,
      link,
    }
  })

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      category,
      subCategories,
    },
  }
}

export async function getStaticPaths({ locales }) {
  const paths = getAllCategoryPaths(locales)

  return {
    paths: paths,
    fallback: false,
  }
}
