import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Grid, Box, Typography, useTheme } from '@mui/material'
import { getAllPosts } from '../lib/api'
import { CMS_NAME, OG_IMAGE_URL } from '../lib/constants'
import useBreakpint from '../src/hooks/useBreakpoint'
import InstaPost from '../src/components/InstaPost'

export default function InstaHack({ instaPosts, locale }) {
  const isDownMd = useBreakpint('md')

  const { t } = useTranslation('common')
  const theme = useTheme()

  return (
    <>
      <Head>
        <title>{CMS_NAME} | InstaHack</title>
        <meta name="description" content={t('whatWeDoDescript')} />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${CMS_NAME} | InstaHack`} />
        <meta property="og:description" content={t('whatWeDoDescript')} />
        <meta property="twitter:title" content={`${CMS_NAME} | InstaHack`} />
        <meta property="twitter:description" content={t('whatWeDoDescript')} />
        <meta property="twitter:card" content="summary" />
      </Head>
      <Grid container spacing={30} mt={24}>
        {instaPosts.map((post) => (
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" flexDirection="column">
              <InstaPost
                slideUrls={post.slideUrls}
                title={post.title}
                instagramUrl={post.instagramUrl}
                width={360}
                height={360}
                showInstagram
              />
              {/* <Typography variant="h3" mb={14} mt={18}>
                {post.title}
              </Typography>
              <Typography variant="body2" mb={16}>
                {post.excerpt}
              </Typography> */}
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export async function getStaticProps({ locale }) {
  const allPosts = getAllPosts(['title', 'slideUrls', 'instagramUrl', 'excerpt'], locale)
  const instaPosts = allPosts.filter((el) => el?.slideUrls?.length > 0)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      instaPosts,
      locale,
    },
  }
}
