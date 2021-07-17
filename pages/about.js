import Head from 'next/head'
import { TYPE } from '../src/theme/index'
import PostBody from '../src/components/Post/PostBody'
import { getPostBySlug } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'
import { CMS_NAME } from '../lib/constants'

export default function About({ post }) {
  return (
    <>
      <Head>
        <title>{CMS_NAME} | About</title>
      </Head>
      <TYPE.largeHeader>{post.title}</TYPE.largeHeader>
      <PostBody content={post.content} />
    </>
  )
}

export async function getStaticProps() {
  const post = getPostBySlug('about-us', [
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
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}
