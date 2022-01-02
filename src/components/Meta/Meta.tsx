import Head from 'next/head'

import { useRouter } from 'next/router'

const localeWhiteList = ['zh-TW', 'en-US', 'ja-JP', 'zh-CN']

export default function Meta() {
  const { locale, locales, asPath } = useRouter()
  const canonicalUrl = process.env.NEXT_PUBLIC_BASE_URL + asPath

  return (
    <Head>
      {locale && !localeWhiteList.includes(locale) && <meta name="robots" content="noindex" />}
      <link rel="shortcut icon" href="/assets/favicon.ico" />
      {locales
        ?.filter((el) => el !== 'zh-TW')
        .map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + asPath}
          />
        ))}

      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="article:publisher" content="https://www.facebook.com/shareuhack" />
      <meta property="og:site_name" content="Shareuhack" />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_BASE_URL + '/' + locale + asPath} />
    </Head>
  )
}
