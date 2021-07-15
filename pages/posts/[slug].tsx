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
import InfoCard from '../../src/components/Card/InfoCard'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import Divider from '../../src/components/Divider/Divider'

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
        <EmailShareButton subject={post.title} body={`Shareuhack: ${post.title}`} separator=" --- " url={url}>
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
              {post.title} | {CMS_NAME}
            </title>
            <meta property="og:image" content={post.ogImage.url} />
          </Head>
          <CoverImage title={post.title} src={post.coverImage} height={620} width={1240} />
          <TYPE.largeHeader mt="15px">{post.title}</TYPE.largeHeader>
          <TYPE.primary mb="15px">UPDATED AT {post.date}</TYPE.primary>
          <Grid container>
            <Grid item sm={3} xs={12}>
              <Box mr={matches ? '0px' : '45px'} pt={matches ? '0px' : '15px'}>
                {post.credentials && (
                  <InfoCard>
                    <TYPE.bold mb="5px">撰寫這篇文章前...</TYPE.bold>
                    <ol>
                      {post.credentials.map((credential) => (
                        <li>{credential}</li>
                      ))}
                    </ol>
                  </InfoCard>
                )}
                {!matches && (
                  <>
                    <InfoCard>
                      <TYPE.bold mb="5px">推薦資源</TYPE.bold>
                      <ol>
                        {post.recommendations.map((recommendation) => (
                          <li>
                            <Link href={recommendation.link}>{recommendation.title}</Link>
                          </li>
                        ))}
                      </ol>
                    </InfoCard>

                    <InfoCard>
                      <TYPE.bold mb="5px">相關資源</TYPE.bold>
                      <ol>
                        {post.references.map((reference) => (
                          <li>
                            <Link href={reference.link}>{reference.title}</Link>
                          </li>
                        ))}
                      </ol>
                    </InfoCard>

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
                  {post.recommendations.map((recommendation) => (
                    <li>
                      <Link href={recommendation.link}>{recommendation.title}</Link>
                    </li>
                  ))}
                </ol>
              </InfoCard>

              <InfoCard>
                <TYPE.bold mb="5px">相關資源</TYPE.bold>
                <ol>
                  {post.references.map((reference) => (
                    <li>
                      <Link href={reference.link}>{reference.title}</Link>
                    </li>
                  ))}
                </ol>
              </InfoCard>

              <Shares />
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
