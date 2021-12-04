import { Grid, Box } from '@material-ui/core'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getSubCategoryPosts, getAllSubCategoryPaths } from '../../lib/api'
import { SubCategories, SubCategory, Routes, CMS_NAME, HOME_OG_IMAGE_URL } from '../../lib/constants'
import { TYPE } from '../../src/theme/index'
import PostReview from '../../src/components/Post/PostPreview'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import InfoCard from '../../src/components/InfoCard/InfoCard'
import StyledLink from '../../src/components/Link/Link'
import Link from 'next/link'
import Divider from '../../src/components/Divider/Divider'
// import Disclosure from '../../src/components/Disclosure/Disclosure'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Head from 'next/head'
// import { canonicalLocale } from '../../src/utils/index'

export default function SubCategoryPage({ subCategory, posts }) {
  const { matches } = useBreakpoint()
  const { t } = useTranslation('common')
  const { locale, locales } = useRouter()
  // const url = process.env.NEXT_PUBLIC_BASE_URL + '/' + canonicalLocale(locale) + `/subcategories/${subCategory.key}`

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
          <TYPE.extraLargeHeader as="h1">{t(`subCategories.${subCategory.key}.title`)}</TYPE.extraLargeHeader>
          <TYPE.body>{t(`subCategories.${subCategory.key}.description`)}</TYPE.body>
        </Grid>
        <Grid item sm={3}>
          {!matches && (
            <InfoCard>
              <TYPE.bold mb="15px">{t('whatWeDo')}</TYPE.bold>
              <TYPE.body>
                {t('whatWeDoDescript')}
                <br />
                <Link href={Routes.about} locale={locale} passHref>
                  <StyledLink>--{t('learnMore')}</StyledLink>
                </Link>
              </TYPE.body>
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
