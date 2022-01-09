import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PostBody from '../src/components/Post/PostBody'
import { getAbout } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants'
import { useTranslation } from 'next-i18next'
import { Button, Box, Grid } from '@mui/material'
import CoverImage from '../src/components/Image/CoverImage'
import useBreakpoint from '../src/hooks/useBreakpoint'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function About({ about }) {
  const { t } = useTranslation('common')
  const isDownMd = useBreakpoint('md')

  return (
    <>
      <Head>
        <title>{CMS_NAME} | About</title>
        <meta name="description" content={t('whatWeDoDescript')} />
        <meta property="og:title" content={'Shareuhack| About Us'} />
        <meta property="og:description" content={t('whatWeDoDescript')} />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      </Head>
      <Grid container justifyContent="center">
        <Grid xs={12} md={8} item>
          {/* <Typography component="h1" variant="h1">
            {post.title}
          </Typography> */}
          <CoverImage
            title={about.title}
            alt={'Shareuhack| hacks for real life'}
            src={about.coverImage}
            height={isDownMd ? 172 : 627}
            width={isDownMd ? 330 : 1200}
            priority
          />
          <PostBody content={about.content} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 30,
            }}
          >
            <Button sx={{ fontWeight: 500, fontSize: 18 }} href="/" endIcon={<ArrowForwardIcon fontSize="small" />}>
              Start Exploring
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export async function getStaticProps({ locale }) {
  const about = getAbout(['title', 'updatedAt', 'excerpt', 'coverImage', 'content'], locale)
  const content = await markdownToHtml(about.content || '')

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      about: {
        ...about,
        content,
      },
    },
  }
}
