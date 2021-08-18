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
import Disclosure from '../../src/components/Disclosure/Disclosure'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function SubCategoryPage({ subCategory, posts }) {
  const { matches } = useBreakpoint()
  const { t } = useTranslation('common')
  const { t: subCategoryTrans } = useTranslation('subCategory')
  const { locale, locales } = useRouter()

  return (
    <>
      <Head>
        <title>
          {CMS_NAME} | {subCategoryTrans(`${subCategory.key}`)}
        </title>
        <meta name="description" content={subCategoryTrans(`${subCategory.key}Descript`)} />
        <meta property="og:title" content={`${CMS_NAME}- ${subCategoryTrans(subCategory.key)}`} />
        <meta property="og:description" content={subCategoryTrans(`${subCategory.key}Descript`)} />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
        {locales.map((locale) => (
          <link
            rel="alternate"
            hrefLang={locale}
            href={process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + `/subcategories/${subCategory.key}`}
          />
        ))}
      </Head>
      {/* <Disclosure /> */}
      <Grid container>
        <Grid item sm={9}>
          <TYPE.extraLargeHeader>{subCategoryTrans(subCategory.key)}</TYPE.extraLargeHeader>
          <TYPE.body>{subCategoryTrans(`${subCategory.key}Descript`)}</TYPE.body>
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

export async function getStaticProps({ params, locale }) {
  const subCategory = SubCategories.filter((subCategory) => subCategory.key === SubCategory[params.subCategory])[0]
  const posts =
    getSubCategoryPosts(params.subCategory, ['title', 'date', 'excerpt', 'slug', 'coverImage'], locale) || []
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'subCategory', 'footer'])),
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
