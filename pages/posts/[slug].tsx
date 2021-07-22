import { Grid, Box, Link } from '@material-ui/core'
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share'
import FacebookIcon from '@material-ui/icons/Facebook'
import EmailIcon from '@material-ui/icons/Email'
import TwitterIcon from '@material-ui/icons/Twitter'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '../../src/components/Post/PostBody'
import CoverImage from '../../src/components/Image/CoverImage'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { TYPE } from '../../src/theme/index'
import InfoCard from '../../src/components/InfoCard/InfoCard'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import Divider from '../../src/components/Divider/Divider'
import { formattedDate } from '../../src/utils'

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  const { matches } = useBreakpoint()
  const url = process.env.NEXT_PUBLIC_BASE_URL + router.asPath

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const Shares = () => {
    return (
      <Box display="flex" gridColumnGap="10px" justifyContent={matches ? 'center' : 'flex-start'}>
        <EmailShareButton
          subject={`Shareuhack: ${post.title}`}
          body={`Shareuhack: ${post.title}`}
          separator=" --- "
          url={url}
        >
          <EmailIcon fontSize="large" />
        </EmailShareButton>
        <FacebookShareButton url={url}>
          <FacebookIcon fontSize="large" />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon fontSize="large" />
        </TwitterShareButton>
      </Box>
    )
  }

  return (
    <>
      {router.isFallback ? (
        <TYPE.largeHeader>Loading…</TYPE.largeHeader>
      ) : (
        <>
          <Head>
            <title>
              {CMS_NAME} | {post.title}
            </title>
            <meta name="description" content={post.excerpt} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="og:image" content={post.ogImage.url} />
          </Head>
          <CoverImage title={post.title} src={post.coverImage} height={627} width={1200} />
          <TYPE.largeHeader mt="15px">{post.title}</TYPE.largeHeader>
          <TYPE.primary mb="15px">Updated at {formattedDate(post.date)}</TYPE.primary>
          <Grid container>
            <Grid item sm={3} xs={12}>
              <Box mr={matches ? '0px' : '45px'} pt={matches ? '0px' : '15px'}>
                {post.credentials && post.credentials.length > 0 && (
                  <InfoCard>
                    <TYPE.bold mb="5px">我們撰寫這篇文章前</TYPE.bold>
                    <ol>
                      {post.credentials?.map((credential, idx) => (
                        <li key={idx}>{credential}</li>
                      ))}
                    </ol>
                  </InfoCard>
                )}
                {!matches && (
                  <>
                    {post.recommendations && post.recommendations.length > 0 && (
                      <InfoCard>
                        <TYPE.bold mb="5px">推薦資源</TYPE.bold>
                        <ol>
                          {post.recommendations?.map((recommendation, idx) => (
                            <li key={idx}>
                              <Link href={recommendation.link}>{recommendation.title}</Link>
                            </li>
                          ))}
                        </ol>
                      </InfoCard>
                    )}

                    {post.references && post.references.length > 0 && (
                      <InfoCard>
                        <TYPE.bold mb="5px">相關資源</TYPE.bold>
                        <ol>
                          {post.references?.map((reference, idx) => (
                            <li key={idx}>
                              <Link href={reference.link}>{reference.title}</Link>
                            </li>
                          ))}
                        </ol>
                      </InfoCard>
                    )}

                    <Divider />
                    <TYPE.body mt="15px" mb="10px">
                      分享這篇文章
                    </TYPE.body>
                    <Shares />
                  </>
                )}
              </Box>
            </Grid>
            <Grid item sm={9}>
              <PostBody content={post.content} />
            </Grid>
          </Grid>
          {matches && (
            <>
              <InfoCard>
                <TYPE.bold mb="5px">推薦資源</TYPE.bold>
                <ol>
                  {post.recommendations?.map((recommendation, idx) => (
                    <li key={idx}>
                      <Link href={recommendation.link}>{recommendation.title}</Link>
                    </li>
                  ))}
                </ol>
              </InfoCard>

              <InfoCard>
                <TYPE.bold mb="5px">相關資源</TYPE.bold>
                <ol>
                  {post.references?.map((reference, idx) => (
                    <li key={idx}>
                      <Link href={reference.link}>{reference.title}</Link>
                    </li>
                  ))}
                </ol>
              </InfoCard>

              <Shares />
              <TYPE.body mt="5px" mb="10px" textAlign="center">
                分享這篇文章
              </TYPE.body>
            </>
          )}
        </>
      )}
    </>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
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

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
