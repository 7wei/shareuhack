import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Typography, Box, Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { CMS_NAME, Categories } from '../lib/constants'
import { getCategoryPosts } from '../lib/api'
import Divider from '../src/components/Divider/Divider'
import PreviewRow from '../src/components/Post/PreviewRow'

export default function Custom404({ categories }) {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{CMS_NAME} | 404</title>
      </Head>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding="90px 0">
        <Typography variant="h2" component="h1" fontSize={36}>
          抱歉，此頁面不存在
        </Typography>
        <Typography variant="body2" fontSize={16} mt={14} mb={30}>
          我們可能在重新設計網頁時，移除或更新了網址。
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 30,
          }}
        >
          <Button sx={{ fontWeight: 500, fontSize: 18 }} href="/" endIcon={<ArrowForwardIcon fontSize="small" />}>
            Keep Exploring
          </Button>
        </Box>
      </Box>
      {categories.map(({ key, posts, link }) => {
        if (posts.length > 0) {
          return (
            <Box mb="15px" mt="15px" key={key}>
              <Divider />
              <PreviewRow
                category={t(`categories.${key}.title`)}
                description={t(`categories.${key}.description`)}
                posts={posts}
                link={link}
                simple
              />
            </Box>
          )
        }
      })}
    </>
  )
}

export async function getStaticProps({ locale }) {
  const categories = Categories.map(({ key, link }) => {
    const posts = getCategoryPosts(key, ['title', 'coverImage', 'updatedAt', 'excerpt', 'slug'], locale).slice(0, 3)
    return {
      key,
      link,
      posts,
    }
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      categories,
    },
  }
}
