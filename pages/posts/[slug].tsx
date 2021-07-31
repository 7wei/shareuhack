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
import { CMS_NAME, Category, Categories, SubCategory, SubCategories } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { TYPE } from '../../src/theme/index'
import InfoCard from '../../src/components/InfoCard/InfoCard'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import Divider from '../../src/components/Divider/Divider'
import { formattedDate } from '../../src/utils'
import Disqus from '../../src/components/Disqus/Disqus'
import Breadcrumbs from '../../src/components/Breadcrumbs/Breadcrumbs'

export default function Post({ post, morePosts, preview, category, subCategory }) {
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
          {category && subCategory && (
            <Breadcrumbs>
              <Link href={category?.link}>{category?.title}</Link>
              <Link href={subCategory?.link}>{subCategory?.title}</Link>
            </Breadcrumbs>
          )}

          <TYPE.largeHeader mt={category && subCategory ? 0 : '15px'} as="h2">
            {post.title}
          </TYPE.largeHeader>
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

              {!matches && (
                <>
                  <TYPE.primary mt="48px">如果你對這篇文章有任何建議，歡迎分享你的hack！</TYPE.primary>
                  <Disqus {...post} />
                </>
              )}
            </Grid>
          </Grid>
          {matches && (
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
              <TYPE.primary mt="20px">如果你對這篇文章有任何建議，歡迎分享你的hack！</TYPE.primary>
              <Disqus {...post} />

              {/*
              <Shares />
              <TYPE.body mt="5px" mb="10px" textAlign="center">
                分享這篇文章
              </TYPE.body> */}
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
    'category',
    'subCategory',
  ])
  const content = await markdownToHtml(post.content || '')
  const category = Categories.find((category) => category.title === Category[post.category]) || null
  const subCategory = SubCategories.find((subCategory) => subCategory.title === SubCategory[post.subCategory]) || null

  return {
    props: {
      post: {
        ...post,
        content,
      },
      category: category,
      subCategory: subCategory,
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
