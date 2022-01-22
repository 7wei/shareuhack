import Head from 'next/head'
import { formattedDate } from '../../src/utils'
import { CMS_NAME, Category, Categories, SubCategory, SubCategories } from '../../lib/constants'
import { getPostBySlug, getAllPostPaths, getCategoryPosts, getPostsBySlugs } from '../../lib/api'
import { Grid, Box, useTheme, Typography } from '@mui/material'
import Link from '../../src/components/Link/Link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EmailShareButton, FacebookShareButton, TwitterShareButton, LineShareButton } from 'react-share'
import FacebookIcon from '@mui/icons-material/Facebook'
import EmailIcon from '@mui/icons-material/Email'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '../../src/components/Post/PostBody'
import CoverImage from '../../src/components/Image/CoverImage'
import markdownToHtml from '../../lib/markdownToHtml'
import InfoCard from '../../src/components/InfoCard/InfoCard'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import Divider from '../../src/components/Divider/Divider'
import Breadcrumbs from '../../src/components/Breadcrumbs/Breadcrumbs'
import { useTranslation } from 'next-i18next'
import PostPreview from '../../src/components/Post/PostPreview'
import CommonStructuredData from '../../src/components/CommonStructuredData'
import { CSSProperties } from '@mui/styles'
// import InstagramPost from '../../src/components/InstagramPost'
import Carousel from '../../src/components/Carousel'
import InstagramIcon from '@mui/icons-material/Instagram'
import Image from 'next/image'

function LineIcon({ style }: { style?: CSSProperties }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        fill: '#000000',
        '& svg:hover': {
          fill: theme.palette.primary.main,
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <svg height="26" viewBox="0 0 48 48" width="26" xmlns="http://www.w3.org/2000/svg" style={style}>
        <path d="m12.5 42h23c3.59 0 6.5-2.91 6.5-6.5v-23c0-3.59-2.91-6.5-6.5-6.5h-23c-3.59 0-6.5 2.91-6.5 6.5v23c0 3.59 2.91 6.5 6.5 6.5z" />
        <path
          d="m37.113 22.417c0-5.865-5.88-10.637-13.107-10.637s-13.108 4.772-13.108 10.637c0 5.258 4.663 9.662 10.962 10.495.427.092 1.008.282 1.155.646.132.331.086.85.042 1.185 0 0-.153.925-.187 1.122-.057.331-.263 1.296 1.135.707 1.399-.589 7.548-4.445 10.298-7.611h-.001c1.901-2.082 2.811-4.197 2.811-6.544zm-18.238 3.49h-2.604c-.379 0-.687-.308-.687-.688v-5.209c0-.379.308-.687.687-.687s.687.308.687.687v4.521h1.917c.379 0 .687.308.687.687 0 .38-.308.689-.687.689zm2.693-.688c0 .379-.308.688-.687.688s-.687-.308-.687-.688v-5.209c0-.379.308-.687.687-.687s.687.308.687.687zm6.27 0c0 .297-.188.559-.47.652-.071.024-.145.036-.218.036-.215 0-.42-.103-.549-.275l-2.669-3.635v3.222c0 .379-.308.688-.688.688-.379 0-.688-.308-.688-.688v-5.209c0-.296.189-.558.47-.652.071-.024.144-.035.218-.035.214 0 .42.103.549.275l2.67 3.635v-3.223c0-.379.309-.687.688-.687s.687.308.687.687zm4.214-3.292c.379 0 .688.308.688.688 0 .379-.308.687-.688.687h-1.917v1.23h1.917c.379 0 .688.308.688.687s-.309.688-.688.688h-2.604c-.378 0-.687-.308-.687-.688v-2.603c0-.001 0-.001 0-.001v-.001-2.601c0-.001 0-.001 0-.002 0-.379.308-.687.687-.687h2.604c.379 0 .688.308.688.687s-.308.687-.688.687h-1.917v1.23h1.917z"
          fill="#fff"
        />
      </svg>
    </Box>
  )
}

export default function Post({ post, category, subCategory, relatedPosts }) {
  const router = useRouter()
  const { locale, asPath } = router
  const isDownMd = useBreakpoint('md')
  const url = process.env.NEXT_PUBLIC_BASE_URL + asPath
  const { t } = useTranslation('common')
  const theme = useTheme()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const Shares = () => {
    const theme = useTheme()

    return (
      <Box display="flex" gap="10px" alignItems="center" justifyContent={isDownMd ? 'center' : 'flex-start'}>
        <EmailShareButton
          subject={`Shareuhack: ${post.title}`}
          body={`Shareuhack: ${post.title}`}
          separator=" --- "
          url={url}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <EmailIcon
            fontSize="medium"
            sx={{
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          />
        </EmailShareButton>
        <LineShareButton
          url={url}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <LineIcon />
        </LineShareButton>
        <FacebookShareButton
          url={url}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FacebookIcon
            fontSize="medium"
            sx={{
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TwitterIcon
            fontSize="medium"
            sx={{
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          />
        </TwitterShareButton>
      </Box>
    )
  }

  return (
    <>
      {router.isFallback ? (
        <Typography fontSize={48}>Loading…</Typography>
      ) : (
        <>
          <Head>
            <title>
              {CMS_NAME} | {post.title}
            </title>

            <meta name="description" content={post.description || post.excerpt} />
            <meta name="keywords" content={post.keywords} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.description || post.excerpt} />
            <meta property="og:image" content={post.ogImage.url} />
            <meta property="og:type" content="article" />
            <meta property="twitter:title" content={post.title} />
            <meta property="twitter:description" content={post.description || post.excerpt} />
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:image" content={post.ogImage.url} />
            <meta property="twitter:image:alt" content={post.title} />

            <meta property="article:section" content={t(`categories.${category?.key}.title`)} />
            {post.keywords &&
              post.keywords !== '' &&
              post.keywords
                .split(', ')
                .map((keyword) => <meta key={keyword} property="article:tag" content={keyword} />)}
          </Head>
          <CommonStructuredData post={post} category={category} subCategory={subCategory} type="post" />
          {category && subCategory && (
            <Breadcrumbs>
              <Link href={category?.link} locale={locale} title={t(`categories.${category?.key}.title`)} type="nav">
                {t(`categories.${category?.key}.title`)}
              </Link>
              <Link
                href={subCategory?.link}
                locale={locale}
                title={t(`subCategories.${subCategory?.key}.title`)}
                type="nav"
              >
                {t(`subCategories.${subCategory?.key}.title`)}
              </Link>
            </Breadcrumbs>
          )}
          <Typography component="h1" variant="h1" mt={8} sx={{ wordWrap: 'break-word' }}>
            {post.title}
          </Typography>
          <Typography color={theme.palette.text.secondary} mt="15px" mb="15px">
            Updated at {formattedDate(post.updatedAt)}
          </Typography>
          <CoverImage
            title={post.title}
            alt={post.excerpt}
            src={post.coverImage}
            height={isDownMd ? 172 : 627}
            width={isDownMd ? 330 : 1200}
            priority
          />

          <Grid spacing={isDownMd ? 15 : 30} container sx={{ mt: { xs: 0, md: 30 }, mb: 30 }}>
            <Grid item md={2} xs={12}>
              {post.credentials && post.credentials.length > 0 && (
                <>
                  <Divider primary />
                  <InfoCard title={t('beforewriting')}>
                    <ol>
                      {post.credentials?.map((credential, idx) => (
                        <li key={idx}>
                          <Typography variant="body1">{credential}</Typography>
                        </li>
                      ))}
                    </ol>
                  </InfoCard>
                </>
              )}
              <Shares />
            </Grid>
            <Grid item md={8} xs={12}>
              <PostBody content={post.content} />
              {post.slideUrls && post.slideUrls.length > 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 30,
                    mb: 30,
                    position: 'relative',
                  }}
                >
                  {post.instagramUrl && (
                    <Box
                      sx={{
                        position: 'absolute',
                        zIndex: 1,
                        top: 12,
                      }}
                    >
                      <Link
                        href={post.instagramUrl}
                        title={`Instagram-${post.title}`}
                        target="_blank"
                        type="external"
                        color="#000000"
                      >
                        <Box width="103px" height="29px" position="relative">
                          <Image src="/assets/icons/instagram.png" layout="fill" />
                        </Box>
                      </Link>
                    </Box>
                  )}
                  <Carousel urls={post.slideUrls} size={isDownMd ? 360 : 480} />
                  <Link
                    href={post.instagramUrl}
                    title={`Instagram-${post.title}`}
                    target="_blank"
                    type="external"
                    color="#000000"
                    disableUnderline
                  >
                    <Box display="flex" alignItems="center" gap={6} mt={3}>
                      <Typography>View on</Typography>
                      <InstagramIcon />
                    </Box>
                  </Link>
                </Box>
              )}

              <Box display="flex" alignItems="center" gap={15}>
                <Typography variant="body1" mt="15px" mb="10px">
                  {t('sharePost')}
                </Typography>
                <Shares />
              </Box>

              {/* {post.instagramId && (
                <>
                  <Divider />
                  <Box width="100%" display="flex" justifyContent="center" pt={15}>
                    <InstagramPost instagramId={post.instagramId} maxWidth={isDownMd ? 390 : 300} />
                  </Box>
                </>
              )} */}
            </Grid>
            <Grid item md={2} xs={12} display="flex" flexDirection="column" justifyContent="flex-end">
              <Divider primary />
              {post.recommendations && post.recommendations.length > 0 && (
                <InfoCard title={t('Recommendations')}>
                  <ol>
                    {post.recommendations?.map((recommendation, idx) => (
                      <li key={idx}>
                        <Link
                          href={recommendation.link}
                          target="_blank"
                          rel="sponsored"
                          color={theme.palette.text.primary}
                          title={recommendation.title}
                          type="affiliate"
                        >
                          <Typography variant="body1" mb={12}>
                            [{recommendation.src}] {recommendation.title}
                          </Typography>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </InfoCard>
              )}
              {post.references && post.references.length > 0 && (
                <InfoCard title={t('References')}>
                  <ol>
                    {post.references?.map((reference, idx) => (
                      <li key={idx}>
                        <Link
                          href={reference.link}
                          target="_blank"
                          // rel="nofollow noopener noreferrer"
                          color={theme.palette.text.primary}
                          title={reference.title}
                          type="external"
                        >
                          <Typography variant="body1" mb={12}>
                            {reference.title}
                          </Typography>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </InfoCard>
              )}
            </Grid>
          </Grid>

          <Divider primary />
          <Grid container spacing={30}>
            <Grid item xs={12} md={9}>
              {/* <Divider primary /> */}

              <Typography mb="15px" variant="h6" mt={30}>
                Related hacks
              </Typography>
              <Grid spacing={30} container>
                {relatedPosts.map((post) => (
                  <Grid key={post.title} item xs={12} sm={4}>
                    <PostPreview {...post} simple />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              {/* <Divider primary /> */}
              <Typography mb="15px" variant="h6" mt={30}>
                Discover More
              </Typography>
              <Grid spacing={24} container>
                {Categories.filter((el) => el.key !== category?.key).map((link, idx) => (
                  <Grid item key={idx} xs={12}>
                    <Link href={link.link} title={t(`categories.${link.key}.title`)} type="nav">
                      <Typography variant="h6">{t(`categories.${link.key}.title`)}</Typography>
                    </Link>
                    <Typography mt={6} variant="body1">
                      {t(`categories.${link.key}.description`)}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export async function getStaticProps({ params, locale }) {
  const post = getPostBySlug(
    params.slug,
    [
      'title',
      'publishedAt',
      'updatedAt',
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
      'excerpt',
      'widget',
      'keywords',
      'description',
      'about',
      'faqs',
      'related',
      'slideUrls',
      'instagramUrl',
    ],
    locale
  )
  const content = await markdownToHtml(post.content || '')
  const category = Categories.find((category) => category.key === Category[post.category]) || null
  const subCategory = SubCategories.find((subCategory) => subCategory.key === SubCategory[post.subCategory]) || null
  const categoryPosts = category
    ? getCategoryPosts(category.key, ['title', 'coverImage', 'updatedAt', 'excerpt', 'slug', 'subCategory'], locale)
    : []
  const relatedPosts =
    post.related && post.related.length > 0
      ? getPostsBySlugs(post.related, ['title', 'coverImage', 'updatedAt', 'excerpt', 'slug', 'subCategory'], locale)
      : categoryPosts.filter((el) => el.slug !== post.slug)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      post: {
        ...post,
        content,
      },
      category,
      subCategory,
      relatedPosts,
    },
  }
}

export async function getStaticPaths({ locales }) {
  const paths = getAllPostPaths(locales)

  return {
    paths,
    fallback: false,
  }
}
