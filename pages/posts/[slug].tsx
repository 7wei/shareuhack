import Head from 'next/head'
import { formattedDate } from '../../src/utils'
import { CMS_NAME, Category, Categories, SubCategory, SubCategories, NavLinks } from '../../lib/constants'
import { getPostBySlug, getAllPostPaths, getCategoryPosts, getPostsBySlugs } from '../../lib/api'
import { Grid, Box, styled, useTheme, Typography } from '@mui/material'
import Link from '../../src/components/Link/Link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share'
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
import ReactLazyHydrate from 'react-lazy-hydration'

const CategoryCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  height: 160,
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  fontSize: 24,
  fontWeight: 700,
  '&:hover': {
    background: theme.palette.primary.main,
    color: '#FFFFFF',
  },
}))

export default function Post({ post, category, subCategory, relatedPosts }) {
  const router = useRouter()
  const { locale, asPath } = router
  const isDownMd = useBreakpoint('md')
  const url = process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + asPath
  const { t } = useTranslation('common')
  const theme = useTheme()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const Shares = () => {
    return (
      <Box display="flex" gap="10px" justifyContent={isDownMd ? 'center' : 'flex-start'}>
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
        <Typography fontSize={48}>Loading…</Typography>
      ) : (
        <>
          <Head>
            <title>
              {CMS_NAME} | {post.title}
            </title>

            <meta name="description" content={post.description || post.excerpt} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.description || post.excerpt} />
            <meta property="og:image" content={post.ogImage.url} />
            <meta property="og:type" content="article" />

            {post.keywords &&
              post.keywords
                .split(', ')
                .map((keyword) => <meta key={keyword} property="article:tag" content={keyword} />)}

            <script
              dangerouslySetInnerHTML={{
                __html: `(function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
              var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
              f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
              var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
              _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');

              var ml_account = ml('accounts', '3616085', 'z2m5d4m0k5', 'load');`,
              }}
            />
          </Head>
          <CommonStructuredData post={post} category={category} subCategory={subCategory} type="post" />

          {category && subCategory && (
            <Breadcrumbs>
              <Link href={category?.link} locale={locale}>
                {t(`categories.${category?.key}.title`)}
              </Link>
              <Link href={subCategory?.link} locale={locale}>
                {t(`subCategories.${subCategory?.key}.title`)}
              </Link>
            </Breadcrumbs>
          )}

          <Grid container>
            <Grid item md={3} xs={12} sm={12} order={isDownMd ? 1 : 0}>
              <Box mr={isDownMd ? '15px' : '45px'} pt={isDownMd ? '0px' : '15px'}>
                {post.credentials && post.credentials.length > 0 && (
                  <InfoCard title={t('beforewriting')}>
                    <ol>
                      {post.credentials?.map((credential, idx) => (
                        <li key={idx}>{credential}</li>
                      ))}
                    </ol>
                  </InfoCard>
                )}

                {post.recommendations && post.recommendations.length > 0 && (
                  <InfoCard title={t('Recommendations')}>
                    <ol>
                      {post.recommendations?.map((recommendation, idx) => (
                        <li key={idx}>
                          {/* {recommendation.title}
                          <br />
                          <Link
                            href={recommendation.link}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            color={theme.palette.primary.main}
                          >
                            {` → ${recommendation.src}`}
                          </Link> */}
                          <Link
                            href={recommendation.link}
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            color={theme.palette.primary.contrastText}
                          >
                            [{recommendation.src}] {recommendation.title}
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
                            rel="nofollow noopener noreferrer"
                            color={theme.palette.primary.contrastText}
                          >
                            {reference.title}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </InfoCard>
                )}

                <Divider />
                <Typography variant="body1" mt="15px" mb="10px">
                  {t('sharePost')}
                </Typography>
                <Shares />

                {/* <a href="https://www.books.com.tw/exep/assp.php/cwhuang0523/products/0010825895?utm_source=cwhuang0523&utm_medium=ap-books&utm_content=recommend&utm_campaign=ap-202109">
                  <img src="https://ap.books.com.tw/web/apProductStick/0010825895/blue/0/7" />
                </a> */}
              </Box>
            </Grid>
            <Grid item md={9} xs={12} order={isDownMd ? 0 : 1}>
              <Box sx={{ wordWrap: 'break-word' }}>
                <Typography component="h1" fontSize={isDownMd ? 28 : 36} fontWeight={600}>
                  {post.title}
                </Typography>
              </Box>
              <Typography color={theme.palette.text.secondary} mb="15px">
                Updated at {formattedDate(post.date)}
              </Typography>
              <CoverImage
                title={post.title}
                alt={post.excerpt}
                src={post.coverImage}
                height={isDownMd ? 172 : 468}
                width={isDownMd ? 330 : 896}
                priority
              />

              <PostBody content={post.content} />
            </Grid>
          </Grid>
          {/* {isDownMd && (
            <>
              {post.recommendations && post.recommendations.length > 0 && (
                <InfoCard title={t('Recommendations')}>
                  <ol>
                    {post.recommendations?.map((recommendation, idx) => (
                      <li key={idx}>
                        {recommendation.title}
                        <br />
                        <Link href={recommendation.link} target="_blank" rel="nofollow noopener noreferrer">
                          {` → ${recommendation.src}`}
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
                        <Link href={reference.link} target="_blank" rel="nofollow noopener noreferrer">
                          {reference.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </InfoCard>
              )}
            </>
          )} */}
          <ReactLazyHydrate whenVisible>
            <Box pb="30px" maxWidth={580} margin="0 auto">
              <div className="ml-form-embed" data-account="3616085:z2m5d4m0k5" data-form="5089298:o0h6s5"></div>
            </Box>
          </ReactLazyHydrate>
          <ReactLazyHydrate whenVisible>
            <>
              <Divider color={theme.palette.primary.main} />

              <Box mt="30px" mb="30px" padding="0 20px">
                <Typography fontSize={isDownMd ? 28 : 36} fontWeight={500} mb="15px">
                  Related hacks
                </Typography>
                <Grid spacing={15} container>
                  {relatedPosts.map((post) => (
                    <Grid key={post.title} item xs={12} sm={4}>
                      <PostPreview {...post} simple />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box mt="30px" mb="30px" padding="0 20px">
                <Typography fontSize={isDownMd ? 28 : 36} fontWeight={500} mb="30px">
                  Discover More...
                </Typography>
                <Grid spacing={10} container>
                  {NavLinks.map((link, idx) => (
                    <Grid item key={idx} xs={6} sm={3}>
                      <Link href={link.link}>
                        <CategoryCard>{t(`categories.${link.key}.title`)}</CategoryCard>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </>
          </ReactLazyHydrate>
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
      'excerpt',
      'widget',
      'keywords',
      'description',
      'about',
      'faqs',
      'related',
    ],
    locale
  )
  const content = await markdownToHtml(post.content || '')
  const category = Categories.find((category) => category.key === Category[post.category]) || null
  const subCategory = SubCategories.find((subCategory) => subCategory.key === SubCategory[post.subCategory]) || null
  const categoryPosts = category
    ? getCategoryPosts(category.key, ['title', 'coverImage', 'date', 'excerpt', 'slug', 'subCategory'], locale)
    : []
  const relatedPosts =
    post.related && post.related.length > 0
      ? getPostsBySlugs(post.related, ['title', 'coverImage', 'date', 'excerpt', 'slug', 'subCategory'], locale)
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
