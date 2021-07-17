import { TYPE } from '../src/theme/index'
import PostBody from '../src/components/Post/PostBody'
import { getPostBySlug } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'

export default function About({ post }) {
  return (
    <>
      <TYPE.largeHeader>關於Shareuhack</TYPE.largeHeader>
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
