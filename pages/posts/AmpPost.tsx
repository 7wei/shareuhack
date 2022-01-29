import { useAmp } from 'next/amp'
import useBreakpoint from '../../src/hooks/useBreakpoint'

export const config = { amp: 'hybrid' }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export default function AmpPost({ post }: { post: any }) {
  const isDownMd = useBreakpoint('md')
  const isAmp = useAmp()

  if (!post) {
    return null
  }

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
      <h1>{post.title}</h1>
      {isAmp && (
        <amp-img
          title={post.title}
          alt={post.excerpt}
          src={post.coverImage}
          height={isDownMd ? 172 : 627}
          width={isDownMd ? 330 : 1200}
          layout={'responsive'}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: post.content.slice(0, 500) + '......' }} />

      <a href={'/posts/' + post.slug}>點此繼續閱讀</a>
    </div>
  )
}
