import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import Script from 'next/script'

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
  const logoUrl = 'https://www.shareuhack.com/assets/brand/shareuhack.png'
  const keywords = 'Shareuhack, LifeHacks, LifeHacker'
  const description = t('whatWeDoDescript')
  const email = 'c@shareuhack.com'

  const structuredDataWebsite = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      inLanguage: locale || 'en-US',
      name: websiteName,
      url: websiteUrl,
      about: 'This website shares lifehacks for the real life.',
      description: description,
      keywords,
    }
  }, [locale])

  const structuredDataOrganization = useMemo(() => {
    if (!structuredDataWebsite) return null

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
  }, [structuredDataWebsite])

  const structuredDataPost = useMemo(() => {
    if (!post) {
      return null
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: post.title + '| Shareuhack',
      name: post.title + '| Shareuhack',
      articleBody: post.content.replace(/<[^>]*>/g, ''),
      about: post.about,
      image: post.coverImage,
      datePublished: post.date,
      dateModified: post.date,
      articleSection: t(`subCategories.${subCategory?.key}.title`),
      keywords: post.keywords,
      backstory: post?.credentials?.join(','),
      author: structuredDataOrganization,
      publisher: structuredDataOrganization,
      url: process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + `/posts/${post.slug}`,
      description: post.excerpt,
    }
  }, [post, subCategory, locale])

  const structuredDataBreadcrumb = useMemo(() => {
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
  }, [post, category, subCategory, locale])

  const structuredDataFaq = useMemo(() => {
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
  }, [post])

  return (
    <>
      <Script type="application/ld+json">{JSON.stringify(structuredDataOrganization)}</Script>
      <Script type="application/ld+json">{JSON.stringify(structuredDataWebsite)}</Script>
      {type === 'post' && structuredDataPost && (
        <Script type="application/ld+json">{JSON.stringify(structuredDataPost)}</Script>
      )}
      {type === 'post' && structuredDataBreadcrumb && (
        <Script type="application/ld+json">{JSON.stringify(structuredDataBreadcrumb)}</Script>
      )}
      {type === 'post' && structuredDataFaq && (
        <Script type="application/ld+json">{JSON.stringify(structuredDataFaq)}</Script>
      )}
    </>
  )
}
