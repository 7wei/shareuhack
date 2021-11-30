import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { TYPE } from '../src/theme/index'
import PostBody from '../src/components/Post/PostBody'
import { getPostBySlug } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '../lib/constants'
import { useTranslation } from 'next-i18next'
// import { canonicalLocale } from '../src/utils/index'
import { useRouter } from 'next/router'

export default function About({ post }) {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  // const canonicalUrl = process.env.NEXT_PUBLIC_BASE_URL + '/' + canonicalLocale(locale) + `/posts/${post.slug}`

  return (
    <>
      <Head>
        <title>{CMS_NAME} | About</title>
        <meta name="description" content={t('whatWeDoDescript')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={t('whatWeDoDescript')} />
        <meta property="og:image" content={HOME_OG_IMAGE_URL} />
        {/* <link rel="canonical" href={canonicalUrl} /> */}
      </Head>
      <TYPE.largeHeader>{post.title}</TYPE.largeHeader>
      <PostBody content={post.content} />
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
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      post: {
        ...post,
        content,
      },
    },
  }
}
