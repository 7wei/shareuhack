import { Grid, Box } from '@material-ui/core'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { Category, Categories, Routes, SubCategories, CMS_NAME, HOME_OG_IMAGE_URL } from '../../lib/constants'
import { TYPE } from '../../src/theme/index'
import { getCategoryPosts, getAllCategoryPaths } from '../../lib/api'
import InfoCard from '../../src/components/InfoCard/InfoCard'
import StyledLink from '../../src/components/Link/Link'
import Link from 'next/link'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import PreviewRow from '../../src/components/Post/PreviewRow'
import Divider from '../../src/components/Divider/Divider'
import Disclosure from '../../src/components/Disclosure/Disclosure'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function CategoryPage({ category, subCategories }) {
  const { matches } = useBreakpoint()
  const { t } = useTranslation('common')
  const { t: subCategoryTrans } = useTranslation('subCategory')
  const { locale, locales } = useRouter()
  const url = process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + `/categories/${category.key}`

  return (
    <>
      <Head>
        <title>
          {CMS_NAME} | {t(`${category.key}`)}
        </title>
        <meta name="description" content={t(`${category.key}Descript`)} />
        <meta property="og:title" content={`${CMS_NAME}- ${t(`${category.key}`)}`} />
        <meta property="og:description" content={t(`${category.key}Descript`)} />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
        {locales.map((locale) => (
          <link
            rel="alternate"
            hrefLang={locale}
            href={process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + `/categories/${category.key}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_BASE_URL} />
        <link rel="canonical" href={url} />
      </Head>
      {/* <Disclosure /> */}
      <Grid container>
        <Grid item sm={9}>
          <TYPE.extraLargeHeader>{category.title}</TYPE.extraLargeHeader>
          <TYPE.body>{t(`${category.key}Descript`)}</TYPE.body>
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
      <Box mt={matches ? '15px' : 0}>
        {subCategories.map((subCategory) => (
          <Box key={subCategory.title} mb="15px">
            <Divider primary />
            <PreviewRow
              category={subCategoryTrans(subCategory.key)}
              description={subCategoryTrans(`${subCategory.key}Descript`)}
              posts={subCategory.posts}
              link={subCategory.link}
            />
          </Box>
        ))}

        {subCategories.length === 0 && (
          <Box height="calc(100vh - 580px)" display="flex" justifyContent="center" alignItems="center">
            <TYPE.primary mb="15px" fontSize={18}>
              {t('stayTuned')}
            </TYPE.primary>
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
      ...(await serverSideTranslations(locale, ['common', 'subCategory', 'footer'])),
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
