import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function useStructuredData() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { locale } = router

  const websiteName = 'Shareuhack'
  const websiteUrl = 'https://www.shareuhack.com'
  const logoUrl = '/assets/brand.png'
  const keywords = 'Shareuhack, lifeHacks'
  const description = t('whatWeDoDescript')

  const structuredDataOrganization = {
    '@type': 'Organization',
    name: websiteName,
    brand: websiteName,
    url: websiteUrl,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
    },
  }

  const structuredDataWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    inLanguage: locale,
    name: websiteName,
    url: websiteUrl,
    about: description,
    description: description,
    keywords: keywords,
  }

  return {
    structuredDataOrganization,
    structuredDataWebsite,
  }
}
