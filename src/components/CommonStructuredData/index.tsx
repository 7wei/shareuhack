import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

interface Props {
  post?: any
  category?: any
  subCategory?: any
  type: 'home' | 'post'
}

export default function CommonStructuredData(props: Props) {
  const { post, category, subCategory, type } = props
  const { t } = useTranslation('common')
  const { locale } = useRouter()

  const websiteName = 'Shareuhack'
  const websiteUrl = 'https://www.shareuhack.com'
  const logoUrl = '/assets/brand.png'
  const keywords = 'Shareuhack, LifeHacks, LifeHacker'
  const description = t('whatWeDoDescript')
  const email = 'c@shareuhack.com'

  const structuredDataWebsite = useCallback(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      inLanguage: locale || 'en-US',
      name: websiteName,
      url: websiteUrl,
      about: description,
      description: description,
      keywords,
    }
  }, [])

  const structuredDataOrganization = useCallback(() => {
    return {
      '@type': 'Organization',
      name: websiteName,
      brand: structuredDataWebsite,
      url: websiteUrl,
      email,
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
      },
    }
  }, [])

  const structuredDataPost = useCallback(() => {
    if (!post) {
      return null
    }

    return {
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
  }, [])

  const structuredDataBreadcrumb = useCallback(() => {
    if (!post || !category || !subCategory) {
      return null
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t(`categories.${category?.key}.title`),
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
  }, [])

  const structuredDataFaq = useCallback(() => {
    if (!post?.faqs) {
      return null
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map(({ question, answer }: { question: string; answer: string }) => {
        return {
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        }
      }),
    }
  }, [])

  return (
    <Head>
      <script id="structured-data-Organization" className="structured-data" type="application/ld+json">
        {JSON.stringify(structuredDataOrganization())}
      </script>
      <script id="structured-data-Website" className="structured-data" type="application/ld+json">
        {JSON.stringify(structuredDataWebsite())}
      </script>
      {type === 'post' && (
        <script id="structured-data-BlogPosting" className="structured-data" type="application/ld+json">
          {JSON.stringify(structuredDataPost())}
        </script>
      )}
      {type === 'post' && (
        <script id="structured-data-BreadcrumbList" className="structured-data" type="application/ld+json">
          {JSON.stringify(structuredDataBreadcrumb())}
        </script>
      )}
      {type === 'post' && post.faqs && (
        <script id="structured-data-FAQ" className="structured-data" type="application/ld+json">
          {JSON.stringify(structuredDataFaq())}
        </script>
      )}
    </Head>
  )
}
