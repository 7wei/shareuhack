import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PostBody from '../src/components/Post/PostBody'
import { getPostBySlug } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Box } from '@mui/material'

export default function About({ post }) {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{CMS_NAME} | About</title>
        <meta name="description" content={t('whatWeDoDescript')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={t('whatWeDoDescript')} />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      </Head>
      <Typography component="h1" fontSize={36} fontWeight={500}>
        {post.title}
      </Typography>
      <PostBody content={post.content} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: {
            xs: 'center',
            md: 'flex-start',
          },
          mt: 30,
          mb: 60,
        }}
      >
        <Button color="primary" variant="contained" sx={{ fontWeight: 500, fontSize: 18 }} href="/">
          Start Exploring
        </Button>
      </Box>
    </>
  )
}

export async function getStaticProps({ locale }) {
  const post = getPostBySlug(
    'about-us',
    [
      'title',
      'date',
      'slug',
      'author',
      'content',
      'ogImage',
      'coverImage',
      'credentials',
      'recommendations',
      'references',
    ],
    locale
  )
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      post: {
        ...post,
        content,
      },
    },
  }
}
