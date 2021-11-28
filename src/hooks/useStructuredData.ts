import Email from '@material-ui/icons/Email'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export default function useStructuredData() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { locale } = router

  const websiteName = 'Shareuhack'
  const websiteUrl = 'https://www.shareuhack.com'
  const logoUrl = '/assets/brand.png'
  const keywords = 'Shareuhack, LifeHacks, LifeHacker'
  const description = t('whatWeDoDescript')
  const email = 'c@shareuhack.com'

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

  const structuredDataOrganization = {
    '@type': 'Organization',
    name: websiteName,
    brand: structuredDataWebsite,
    url: websiteUrl,
    email: email,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
    },
  }

  return {
    structuredDataOrganization,
    structuredDataWebsite,
  }
}
