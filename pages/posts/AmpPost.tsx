import { useAmp } from 'next/amp'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import { Categories } from '../../lib/constants'

export const config = { amp: 'hybrid' }

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}

export default function AmpPost({ post, relatedPosts, categories }: { post: any; relatedPosts: any; categories: any }) {
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
      <div
        style={{
          ['& * img']: {
            width: '100%',
          },
        }}
        dangerouslySetInnerHTML={{ __html: post.ampContent }}
      />
      {post.recommendations && post.recommendations.length > 0 && (
        <>
          <h3>推薦資源</h3>
          <ol>
            {post.recommendations?.map((recommendation, idx) => (
              <li key={idx}>
                <a href={recommendation.link} target="_blank">
                  <p>
                    [{recommendation.src}] {recommendation.title}
                  </p>
                </a>
              </li>
            ))}
          </ol>
        </>
      )}
      {post.references && post.references.length > 0 && (
        <>
          <h3>相關資料</h3>
          <ol>
            {post.references?.map((reference, idx) => (
              <li key={idx}>
                <a href={reference.link} target="_blank">
                  <p>{reference.title}</p>
                </a>
              </li>
            ))}
          </ol>
        </>
      )}
      {relatedPosts && relatedPosts.length > 0 && (
        <>
          <h3>你可能也喜歡</h3>
          <ol>
            {relatedPosts.map((post, idx) => (
              <li key={idx}>
                <a href={process.env.NEXT_PUBLIC_BASE_URL + '/posts/' + post.slug} target="_blank">
                  <p>{post.title}</p>
                </a>
              </li>
            ))}
          </ol>
        </>
      )}
      {categories && categories.length > 0 && (
        <>
          <h3>發現更多</h3>
          <ol>
            {categories.map((category, idx) => (
              <li key={idx}>
                <a href={category.link} target="_blank">
                  <h4>{category.title}</h4>
                </a>
                <p>{category.description}</p>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  )
}
