import { Grid, Box } from '@material-ui/core'
import Link from 'next/link'
import StyledLink from '../../src/components/Link/Link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from 'react-share'
import FacebookIcon from '@material-ui/icons/Facebook'
import EmailIcon from '@material-ui/icons/Email'
import TwitterIcon from '@material-ui/icons/Twitter'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '../../src/components/Post/PostBody'
import CoverImage from '../../src/components/Image/CoverImage'
import { getPostBySlug, getAllPosts, getAllPostPaths, getCategoryPosts } from '../../lib/api'
import Head from 'next/head'
import { CMS_NAME, Category, Categories, SubCategory, SubCategories } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import { TYPE } from '../../src/theme/index'
import InfoCard from '../../src/components/InfoCard/InfoCard'
import useBreakpoint from '../../src/hooks/useBreakpoint'
import Divider from '../../src/components/Divider/Divider'
import { formattedDate } from '../../src/utils'
// import Disqus from '../../src/components/Disqus/Disqus'
import Breadcrumbs from '../../src/components/Breadcrumbs/Breadcrumbs'
import { useTranslation } from 'next-i18next'
// import { canonicalLocale } from '../../src/utils/index'
import PostPreview from '../../src/components/Post/PostPreview'
import useStructuredData from '../../src/hooks/useStructuredData'

export default function Post({ post, morePosts, preview, category, subCategory, relatedPosts }) {
  const router = useRouter()
  const { locale, locales } = router
  const { matches } = useBreakpoint()
  const url = process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + `/posts/${post.slug}`
  // const canonicalUrl = process.env.NEXT_PUBLIC_BASE_URL + '/' + canonicalLocale(locale) + `/posts/${post.slug}`
  const { t } = useTranslation('common')
  const { structuredDataOrganization } = useStructuredData()

  const structuredDataPost = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    articleBody: post.content.replace(/<[^>]*>/g, ''),
    about: post.about,
    image: post.coverImage,
    datePublished: post.date,
    articleSection: t(`subCategories.${subCategory?.key}.title`),
    keywords: post.keywords,
    backstory: post?.credentials?.join(','),
    author: structuredDataOrganization,
    publisher: structuredDataOrganization,
  }

  const structuredDataBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t(category?.key),
        item: process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + category?.link,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t(`subCategories.${subCategory?.key}.title`),
        item: process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + subCategory?.link,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
      },
    ],
  }

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
            <meta name="description" content={post.description ?? post.excerpt} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.description ?? post.excerpt} />
            <meta property="og:image" content={post.ogImage.url} />
            <script id="structured-data-BreadcrumbList" className="structured-data" type="application/ld+json">
              {JSON.stringify(structuredDataBreadcrumb)}
            </script>
            <script id="structured-data-BlogPosting" className="structured-data" type="application/ld+json">
              {JSON.stringify(structuredDataPost)}
            </script>

            {locales.map((locale) => (
              <link
                key={locale}
                rel="alternate"
                hrefLang={locale}
                href={process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + `/posts/${post.slug}`}
              />
            ))}
            {/* <link rel="canonical" href={canonicalUrl} /> */}
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
          <CoverImage title={post.title} alt={post.excerpt} src={post.coverImage} height={627} width={1200} />
          {category && subCategory && (
            <Breadcrumbs>
              <Link href={category?.link} locale={locale} passHref>
                <StyledLink>{t(`categories.${category?.key}.title`)}</StyledLink>
              </Link>
              <Link href={subCategory?.link} locale={locale} passHref>
                <StyledLink>{t(`subCategories.${subCategory?.key}.title`)}</StyledLink>
              </Link>
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
                    <TYPE.bold mb="5px">{t('beforewriting')}</TYPE.bold>
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
                        <TYPE.bold mb="5px">{t('Recommendations')}</TYPE.bold>
                        <ol>
                          {post.recommendations?.map((recommendation, idx) => (
                            <li key={idx}>
                              {recommendation.title}
                              <br />
                              <Link href={recommendation.link} passHref>
                                <StyledLink
                                  target="_blank"
                                  rel="nofollow noopener noreferrer"
                                >{` → ${recommendation.src}`}</StyledLink>
                              </Link>
                            </li>
                          ))}
                        </ol>
                      </InfoCard>
                    )}

                    {post.references && post.references.length > 0 && (
                      <InfoCard>
                        <TYPE.bold mb="5px">{t('References')}</TYPE.bold>
                        <ol>
                          {post.references?.map((reference, idx) => (
                            <li key={idx}>
                              <Link href={reference.link} passHref>
                                <StyledLink target="_blank" rel="nofollow noopener noreferrer">
                                  {reference.title}
                                </StyledLink>
                              </Link>
                            </li>
                          ))}
                        </ol>
                      </InfoCard>
                    )}

                    <Divider />
                    <TYPE.body mt="15px" mb="10px">
                      {t('sharePost')}
                    </TYPE.body>
                    <Shares />
                  </>
                )}
                {/* <a href="https://www.books.com.tw/exep/assp.php/cwhuang0523/products/0010825895?utm_source=cwhuang0523&utm_medium=ap-books&utm_content=recommend&utm_campaign=ap-202109">
                  <img src="https://ap.books.com.tw/web/apProductStick/0010825895/blue/0/7" />
                </a> */}
              </Box>
            </Grid>
            <Grid item sm={9}>
              <PostBody content={post.content} />

              {!matches && (
                <>
                  {/* <TYPE.primary mt="48px">Welcome to share your hack！</TYPE.primary>
                  <Disqus {...post} /> */}
                </>
              )}
            </Grid>
          </Grid>
          {matches && (
            <>
              {post.recommendations && post.recommendations.length > 0 && (
                <InfoCard>
                  <TYPE.bold mb="5px">{t('Recommendations')}</TYPE.bold>
                  <ol>
                    {post.recommendations?.map((recommendation, idx) => (
                      <li key={idx}>
                        {recommendation.title}
                        <br />
                        <Link href={recommendation.link} passHref>
                          <StyledLink
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                          >{` → ${recommendation.src}`}</StyledLink>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </InfoCard>
              )}

              {post.references && post.references.length > 0 && (
                <InfoCard>
                  <TYPE.bold mb="5px">{t('References')}</TYPE.bold>
                  <ol>
                    {post.references?.map((reference, idx) => (
                      <li key={idx}>
                        <Link href={reference.link} passHref>
                          <StyledLink target="_blank" rel="nofollow noopener noreferrer">
                            {reference.title}
                          </StyledLink>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </InfoCard>
              )}
              {/* <TYPE.primary mt="20px">Welcome to share your hack！</TYPE.primary>
              <Disqus {...post} /> */}

              {/*
              <Shares />
              <TYPE.body mt="5px" mb="10px" textAlign="center">
                分享這篇文章
              </TYPE.body> */}

              {/* )} */}
            </>
          )}
          <Box pb="30px" maxWidth="540px" margin="0 auto">
            <div className="ml-form-embed" data-account="3616085:z2m5d4m0k5" data-form="5089298:o0h6s5"></div>
          </Box>
          <Divider primary />

          <Box mt="30px" mb="30px" padding="0 20px">
            <TYPE.largeHeader marginBottom="15px">More hacks</TYPE.largeHeader>
            <Grid spacing={3} container>
              {relatedPosts.map((post) => (
                <Grid key={post.title} item xs={12} sm={4}>
                  <PostPreview {...post} simple />
                </Grid>
              ))}
            </Grid>
          </Box>
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
    ],
    locale
  )
  const content = await markdownToHtml(post.content || '')
  const category = Categories.find((category) => category.key === Category[post.category]) || null
  const subCategory = SubCategories.find((subCategory) => subCategory.key === SubCategory[post.subCategory]) || null
  const categoryPosts = category
    ? getCategoryPosts(category.key, ['title', 'coverImage', 'date', 'excerpt', 'slug', 'subCategory'], locale)
    : []
  const relatedPosts = categoryPosts.filter((el) => el.slug !== post.slug)

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      post: {
        ...post,
        content,
      },
      category: category,
      subCategory: subCategory,
      relatedPosts: relatedPosts,
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
